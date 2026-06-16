/**
 * Turso Cloud Database Sync Module
 * ظٹظˆظپط± ظˆط¸ط§ط¦ظپ ط§ظ„ظ…ط²ط§ظ…ظ†ط© ظ…ط¹ ظ‚ط§ط¹ط¯ط© ط§ظ„ط¨ظٹط§ظ†ط§طھ ط§ظ„ط³ط­ط§ط¨ظٹط© Turso
 */

const fs = require('fs');
const path = require('path');

let tursoClient = null;
let isConnected = false;
let syncEnabled = false;
let cloudMode = false; // true = ط§ظ„ط³ط­ط§ط¨ط©طŒ false = ط§ظ„ظ…ط­ظ„ظٹط©
let localDb = null; // ظ…ط±ط¬ط¹ ظ„ظ‚ط§ط¹ط¯ط© ط§ظ„ط¨ظٹط§ظ†ط§طھ ط§ظ„ظ…ط­ظ„ظٹط©
let debugBlockLocalDb = false; // ظˆط¶ط¹ ط§ظ„طھطµط­ظٹط­: ط­ط¸ط± ظ‚ط§ط¹ط¯ط© ط§ظ„ط¨ظٹط§ظ†ط§طھ ط§ظ„ظ…ط­ظ„ظٹط©

// ==================== ظ†ط¸ط§ظ… Cache ط§ظ„ظ…ط±ظƒط²ظٹ ظ„ظ„ط£ط¯ط§ط، ====================
const dataCache = {
  accounts: { data: null, timestamp: 0, ttl: 60000 }, // 60 ط«ط§ظ†ظٹط©
  accountsFlat: { data: null, timestamp: 0, ttl: 60000 },
  accountsStats: { data: null, timestamp: 0, ttl: 20000 },
  invoiceSettings: { data: null, timestamp: 0, ttl: 300000 },
  branches: { data: null, timestamp: 0, ttl: 60000 },
  customers: { data: null, timestamp: 0, ttl: 60000 },
  suppliers: { data: null, timestamp: 0, ttl: 60000 },
  users: { data: null, timestamp: 0, ttl: 60000 },
  customersStats: { data: null, timestamp: 0, ttl: 20000 },
  suppliersStats: { data: null, timestamp: 0, ttl: 20000 },
  customersDebt: { data: null, timestamp: 0, ttl: 15000 },
  suppliersDebt: { data: null, timestamp: 0, ttl: 15000 },
  defaultBoxes: { data: null, timestamp: 0, ttl: 300000 }, // 5 ط¯ظ‚ط§ط¦ظ‚
  karats: { data: null, timestamp: 0, ttl: 300000 }
};

const cloudQueryResultCache = new Map();
const inFlightCloudQueries = new Map();
const CLOUD_QUERY_RESULT_TTL_MS = 400;
let cloudQueryCacheEpoch = 0;

function buildCloudQueryCacheKey(kind, sql, params = []) {
  let serializedParams = '[]';
  try {
    serializedParams = JSON.stringify(Array.isArray(params) ? params : [params]);
  } catch (_) {
    serializedParams = String(params);
  }
  return `${kind}::${String(sql || '').trim()}::${serializedParams}`;
}

function readCloudQueryResultCache(key) {
  const entry = cloudQueryResultCache.get(key);
  if (!entry) return { hit: false, value: null };
  if ((Date.now() - Number(entry.timestamp || 0)) >= CLOUD_QUERY_RESULT_TTL_MS) {
    cloudQueryResultCache.delete(key);
    return { hit: false, value: null };
  }
  return { hit: true, value: entry.value };
}

function writeCloudQueryResultCache(key, value) {
  cloudQueryResultCache.set(key, { value, timestamp: Date.now() });
  if (cloudQueryResultCache.size > 500) {
    const oldestKey = cloudQueryResultCache.keys().next().value;
    if (oldestKey) {
      cloudQueryResultCache.delete(oldestKey);
    }
  }
}

function invalidateCloudQueryCaches() {
  cloudQueryCacheEpoch += 1;
  cloudQueryResultCache.clear();
  inFlightCloudQueries.clear();
}

async function executeCloudRead(kind, sql, params, executor) {
  const cacheKey = buildCloudQueryCacheKey(kind, sql, params);
  const cached = readCloudQueryResultCache(cacheKey);
  if (cached.hit) {
    return cached.value;
  }
  if (inFlightCloudQueries.has(cacheKey)) {
    return inFlightCloudQueries.get(cacheKey);
  }

  const epochAtStart = cloudQueryCacheEpoch;
  const promise = (async () => {
    const value = await executor();
    if (epochAtStart === cloudQueryCacheEpoch) {
      writeCloudQueryResultCache(cacheKey, value);
    }
    return value;
  })();

  inFlightCloudQueries.set(cacheKey, promise);
  promise.finally(() => {
    if (inFlightCloudQueries.get(cacheKey) === promise) {
      inFlightCloudQueries.delete(cacheKey);
    }
  });
  return promise;
}

let cloudSyncInFlight = false;
let cloudSyncInFlightLabel = null;

function isCloudSyncInProgress() {
  return cloudSyncInFlight;
}

async function runCloudSyncExclusive(syncLabel, executor) {
  if (cloudSyncInFlight) {
    console.log(`[TursoSync] Skipping ${syncLabel} - cloud sync already in progress (${cloudSyncInFlightLabel || 'unknown'})`);
    return { success: false, skipped: true, reason: 'sync_in_progress', message: 'Cloud sync already running' };
  }

  cloudSyncInFlight = true;
  cloudSyncInFlightLabel = syncLabel;
  try {
    return await executor();
  } finally {
    cloudSyncInFlight = false;
    cloudSyncInFlightLabel = null;
  }
}

function isCacheValid(key) {
  const cache = dataCache[key];
  if (!cache || !cache.data) return false;
  return (Date.now() - cache.timestamp) < cache.ttl;
}

function setCache(key, data) {
  if (dataCache[key]) {
    dataCache[key].data = data;
    dataCache[key].timestamp = Date.now();
  }
}

function getCache(key) {
  if (isCacheValid(key)) {
    console.log(`[TursoSync] Cache HIT: ${key}`);
    return dataCache[key].data;
  }
  return null;
}

function invalidateCache(key) {
  if (key) {
    if (dataCache[key]) {
      dataCache[key].data = null;
      dataCache[key].timestamp = 0;
    }
  } else {
    // Invalidate all
    Object.keys(dataCache).forEach(k => {
      dataCache[k].data = null;
      dataCache[k].timestamp = 0;
    });
  }
  invalidateCloudQueryCaches();
}

// ==================== ظ†ظ‡ط§ظٹط© ظ†ط¸ط§ظ… Cache ====================

// Get app data directory (same strategy as main.js portable mode)
function getDataDir() {
  let appBaseDir = __dirname;
  try {
    const { app } = require('electron');
    if (app && app.isPackaged) {
      // In production keep data beside the EXE (portable behavior)
      appBaseDir = path.dirname(app.getPath('exe'));
    }
  } catch (_) {
    // Fallback to current directory when electron app is unavailable
  }

  const dataDir = path.join(appBaseDir, 'data');
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
  } catch (_) {
    // Read operations can still fail gracefully in callers
  }

  return dataDir;
}

// Load cloud database settings
function loadCloudDbConfig() {
  try {
    const configPath = path.join(getDataDir(), 'cloud-db-config.json');
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      
      // Also try to load token from separate secure file
      const tokenPath = path.join(getDataDir(), 'cloud-db-token.json');
      if (fs.existsSync(tokenPath)) {
        const tokenData = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
        config.token = tokenData.token;
      }
      
      return config;
    }
  } catch (e) {
    console.error('[TursoSync] Error loading config:', e.message);
  }
  return null;
}

// Save token securely
function saveCloudDbToken(token) {
  try {
    const tokenPath = path.join(getDataDir(), 'cloud-db-token.json');
    fs.writeFileSync(tokenPath, JSON.stringify({ token, savedAt: new Date().toISOString() }), 'utf8');
    return true;
  } catch (e) {
    console.error('[TursoSync] Error saving token:', e.message);
    return false;
  }
 }

 const CLOUD_MIGRATIONS_VERSION = 7;

 function shouldRunCloudMigrations(config = {}) {
  return config.cloudMigrationVersion !== CLOUD_MIGRATIONS_VERSION || config.cloudMigrationUrl !== config.url;
 }

 function saveCloudMigrationState(url, version) {
  try {
    const configPath = path.join(getDataDir(), 'cloud-db-config.json');
    let config = {};
    if (fs.existsSync(configPath)) {
      config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    }
    config.cloudMigrationVersion = version;
    config.cloudMigrationUrl = url || null;
    config.cloudMigrationCheckedAt = new Date().toISOString();
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
  } catch (e) {
    console.error('[TursoSync] Error saving cloud migration state:', e.message);
  }
 }

 async function executeCloudMigration(sql, label) {
  try {
    await tursoClient.execute(sql);
    console.log(`[TursoSync] ${label}: migrated`);
  } catch (e) {
    const message = String(e?.message || e || '');
    const normalized = message.toLowerCase();
    if (
      normalized.includes('duplicate column name') ||
      normalized.includes('already exists') ||
      normalized.includes('duplicate')
    ) {
      console.log(`[TursoSync] ${label}: exists`);
      return;
    }
    if (normalized.includes('no such table')) {
      console.log(`[TursoSync] ${label}: skipped (${message})`);
      return;
    }
    console.log(`[TursoSync] ${label}: ${message}`);
  }
 }

 async function runCloudMigrations() {
  const migrations = [
    [`CREATE TABLE IF NOT EXISTS branches (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      name_en TEXT,
      address TEXT,
      phone TEXT,
      company_name TEXT,
      company_name_en TEXT,
      company_address TEXT,
      company_address_en TEXT,
      company_tax TEXT,
      company_phone TEXT,
      company_email TEXT,
      company_website TEXT,
      company_logo TEXT,
      company_logo_base64 TEXT,
      invoice_settings_json TEXT,
      currency_settings_json TEXT,
      active INTEGER DEFAULT 1,
      is_main INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT
    )`, 'branches.table'],
    [`CREATE TABLE IF NOT EXISTS user_branches (
      user_id INTEGER NOT NULL,
      branch_id INTEGER NOT NULL,
      is_default INTEGER DEFAULT 0,
      can_login INTEGER DEFAULT 1,
      read_only INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      PRIMARY KEY (user_id, branch_id)
    )`, 'user_branches.table'],
    [`CREATE TABLE IF NOT EXISTS customer_branches (
      customer_id INTEGER NOT NULL,
      branch_id INTEGER NOT NULL,
      created_at TEXT NOT NULL,
      PRIMARY KEY (customer_id, branch_id)
    )`, 'customer_branches.table'],
    [`CREATE TABLE IF NOT EXISTS supplier_branches (
      supplier_id INTEGER NOT NULL,
      branch_id INTEGER NOT NULL,
      created_at TEXT NOT NULL,
      PRIMARY KEY (supplier_id, branch_id)
    )`, 'supplier_branches.table'],
    [`CREATE TABLE IF NOT EXISTS user_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sender_user_id INTEGER NOT NULL,
      recipient_user_id INTEGER NOT NULL,
      message_text TEXT NOT NULL,
      message_type TEXT DEFAULT 'text',
      delivery_status TEXT DEFAULT 'sent',
      read_at TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )`, 'user_messages.table'],
    ['CREATE INDEX IF NOT EXISTS idx_user_messages_sender_recipient_created ON user_messages(sender_user_id, recipient_user_id, created_at)', 'user_messages.sender_recipient_created'],
    ['CREATE INDEX IF NOT EXISTS idx_user_messages_recipient_read_created ON user_messages(recipient_user_id, read_at, created_at)', 'user_messages.recipient_read_created'],
    ['ALTER TABLE customers ADD COLUMN tax_no TEXT', 'customers.tax_no'],
    ['ALTER TABLE customers ADD COLUMN category TEXT', 'customers.category'],
    ['ALTER TABLE customers ADD COLUMN updated_at TEXT', 'customers.updated_at'],
    ["ALTER TABLE customers ADD COLUMN access_scope TEXT DEFAULT 'single'", 'customers.access_scope'],
    ['ALTER TABLE suppliers ADD COLUMN tax_no TEXT', 'suppliers.tax_no'],
    ['ALTER TABLE suppliers ADD COLUMN category TEXT', 'suppliers.category'],
    ['ALTER TABLE suppliers ADD COLUMN updated_at TEXT', 'suppliers.updated_at'],
    ["ALTER TABLE suppliers ADD COLUMN access_scope TEXT DEFAULT 'single'", 'suppliers.access_scope'],
    ['ALTER TABLE customers ADD COLUMN email TEXT', 'customers.email'],
    ['ALTER TABLE suppliers ADD COLUMN email TEXT', 'suppliers.email'],
    ['ALTER TABLE customers ADD COLUMN account_id INTEGER REFERENCES accounts(id)', 'customers.account_id'],
    ['ALTER TABLE suppliers ADD COLUMN account_id INTEGER REFERENCES accounts(id)', 'suppliers.account_id'],
    ['ALTER TABLE customers ADD COLUMN sale_ounce_sub_enabled INTEGER DEFAULT 0', 'customers.sale_ounce_sub_enabled'],
    ['ALTER TABLE customers ADD COLUMN purchase_ounce_add REAL DEFAULT 0', 'customers.purchase_ounce_add'],
    ['ALTER TABLE customers ADD COLUMN purchase_ounce_add_enabled INTEGER DEFAULT 0', 'customers.purchase_ounce_add_enabled'],
    ['ALTER TABLE customers ADD COLUMN purchase_ounce_sub REAL DEFAULT 0', 'customers.purchase_ounce_sub'],
    ['ALTER TABLE customers ADD COLUMN purchase_ounce_sub_enabled INTEGER DEFAULT 0', 'customers.purchase_ounce_sub_enabled'],
    ['ALTER TABLE suppliers ADD COLUMN tax_no TEXT', 'suppliers.tax_no'],
    ['ALTER TABLE suppliers ADD COLUMN category TEXT', 'suppliers.category'],
    ['ALTER TABLE suppliers ADD COLUMN updated_at TEXT', 'suppliers.updated_at'],
    ['ALTER TABLE suppliers ADD COLUMN email TEXT', 'suppliers.email'],
    ['ALTER TABLE suppliers ADD COLUMN account_id INTEGER', 'suppliers.account_id'],
    ['ALTER TABLE suppliers ADD COLUMN branch_id INTEGER DEFAULT 1', 'suppliers.branch_id'],
    ['ALTER TABLE suppliers ADD COLUMN sale_ounce_add REAL DEFAULT 0', 'suppliers.sale_ounce_add'],
    ['ALTER TABLE suppliers ADD COLUMN sale_ounce_add_enabled INTEGER DEFAULT 0', 'suppliers.sale_ounce_add_enabled'],
    ['ALTER TABLE suppliers ADD COLUMN sale_ounce_sub REAL DEFAULT 0', 'suppliers.sale_ounce_sub'],
    ['ALTER TABLE suppliers ADD COLUMN sale_ounce_sub_enabled INTEGER DEFAULT 0', 'suppliers.sale_ounce_sub_enabled'],
    ['ALTER TABLE suppliers ADD COLUMN purchase_ounce_add REAL DEFAULT 0', 'suppliers.purchase_ounce_add'],
    ['ALTER TABLE suppliers ADD COLUMN purchase_ounce_add_enabled INTEGER DEFAULT 0', 'suppliers.purchase_ounce_add_enabled'],
    ['ALTER TABLE suppliers ADD COLUMN purchase_ounce_sub REAL DEFAULT 0', 'suppliers.purchase_ounce_sub'],
    ['ALTER TABLE suppliers ADD COLUMN purchase_ounce_sub_enabled INTEGER DEFAULT 0', 'suppliers.purchase_ounce_sub_enabled'],
    ['ALTER TABLE categories ADD COLUMN type TEXT DEFAULT \'both\'', 'categories.type'],
    ['ALTER TABLE accounts ADD COLUMN code TEXT', 'accounts.code'],
    ['ALTER TABLE accounts ADD COLUMN name_en TEXT', 'accounts.name_en'],
    ['ALTER TABLE accounts ADD COLUMN parent_id INTEGER DEFAULT NULL', 'accounts.parent_id'],
    ['ALTER TABLE accounts ADD COLUMN account_type TEXT', 'accounts.account_type'],
    ['ALTER TABLE accounts ADD COLUMN nature TEXT DEFAULT \'debit\'', 'accounts.nature'],
    ['ALTER TABLE accounts ADD COLUMN level INTEGER DEFAULT 1', 'accounts.level'],
    ['ALTER TABLE accounts ADD COLUMN is_parent INTEGER DEFAULT 0', 'accounts.is_parent'],
    ['ALTER TABLE accounts ADD COLUMN is_system INTEGER DEFAULT 0', 'accounts.is_system'],
    ['ALTER TABLE accounts ADD COLUMN description TEXT', 'accounts.description'],
    ['ALTER TABLE accounts ADD COLUMN debt_limit REAL DEFAULT 0', 'accounts.debt_limit'],
    ['ALTER TABLE accounts ADD COLUMN branch_id INTEGER', 'accounts.branch_id'],
    ['ALTER TABLE company ADD COLUMN logo_base64 TEXT', 'company.logo_base64'],
    ['ALTER TABLE company ADD COLUMN phone TEXT', 'company.phone'],
    ['ALTER TABLE company ADD COLUMN email TEXT', 'company.email'],
    ['ALTER TABLE company ADD COLUMN website TEXT', 'company.website'],
    ['ALTER TABLE company ADD COLUMN name_en TEXT', 'company.name_en'],
    ['ALTER TABLE company ADD COLUMN address_en TEXT', 'company.address_en'],
    ['ALTER TABLE users ADD COLUMN password_hint TEXT', 'users.password_hint'],
    ['ALTER TABLE branches ADD COLUMN name_en TEXT', 'branches.name_en'],
    ['ALTER TABLE branches ADD COLUMN address TEXT', 'branches.address'],
    ['ALTER TABLE branches ADD COLUMN phone TEXT', 'branches.phone'],
    ['ALTER TABLE branches ADD COLUMN company_name TEXT', 'branches.company_name'],
    ['ALTER TABLE branches ADD COLUMN company_name_en TEXT', 'branches.company_name_en'],
    ['ALTER TABLE branches ADD COLUMN company_address TEXT', 'branches.company_address'],
    ['ALTER TABLE branches ADD COLUMN company_address_en TEXT', 'branches.company_address_en'],
    ['ALTER TABLE branches ADD COLUMN company_tax TEXT', 'branches.company_tax'],
    ['ALTER TABLE branches ADD COLUMN company_phone TEXT', 'branches.company_phone'],
    ['ALTER TABLE branches ADD COLUMN company_email TEXT', 'branches.company_email'],
    ['ALTER TABLE branches ADD COLUMN company_website TEXT', 'branches.company_website'],
    ['ALTER TABLE branches ADD COLUMN company_logo TEXT', 'branches.company_logo'],
    ['ALTER TABLE branches ADD COLUMN company_logo_base64 TEXT', 'branches.company_logo_base64'],
    ['ALTER TABLE branches ADD COLUMN invoice_settings_json TEXT', 'branches.invoice_settings_json'],
    ['ALTER TABLE branches ADD COLUMN currency_settings_json TEXT', 'branches.currency_settings_json'],
    ['ALTER TABLE branches ADD COLUMN active INTEGER DEFAULT 1', 'branches.active'],
    ['ALTER TABLE branches ADD COLUMN is_main INTEGER DEFAULT 0', 'branches.is_main'],
    ['ALTER TABLE branches ADD COLUMN created_at TEXT', 'branches.created_at'],
    ['ALTER TABLE branches ADD COLUMN updated_at TEXT', 'branches.updated_at'],
    ['ALTER TABLE user_branches ADD COLUMN is_default INTEGER DEFAULT 0', 'user_branches.is_default'],
    ['ALTER TABLE user_branches ADD COLUMN can_login INTEGER DEFAULT 1', 'user_branches.can_login'],
    ['ALTER TABLE user_branches ADD COLUMN read_only INTEGER DEFAULT 0', 'user_branches.read_only'],
    ['ALTER TABLE user_branches ADD COLUMN created_at TEXT', 'user_branches.created_at'],
    ['ALTER TABLE vouchers ADD COLUMN created_by INTEGER', 'vouchers.created_by'],
    ['ALTER TABLE vouchers ADD COLUMN created_at TEXT', 'vouchers.created_at'],
    ['ALTER TABLE vouchers ADD COLUMN updated_by INTEGER', 'vouchers.updated_by'],
    ['ALTER TABLE vouchers ADD COLUMN updated_at TEXT', 'vouchers.updated_at'],
    ['ALTER TABLE vouchers ADD COLUMN silver_account_id INTEGER', 'vouchers.silver_account_id'],
    ['ALTER TABLE vouchers ADD COLUMN branch_id INTEGER DEFAULT 1', 'vouchers.branch_id'],
    ['ALTER TABLE receipts ADD COLUMN created_by INTEGER', 'receipts.created_by'],
    ['ALTER TABLE receipts ADD COLUMN created_at TEXT', 'receipts.created_at'],
    ['ALTER TABLE receipts ADD COLUMN updated_by INTEGER', 'receipts.updated_by'],
    ['ALTER TABLE receipts ADD COLUMN updated_at TEXT', 'receipts.updated_at'],
    ['ALTER TABLE receipts ADD COLUMN silver_account_id INTEGER', 'receipts.silver_account_id'],
    ['ALTER TABLE receipts ADD COLUMN branch_id INTEGER DEFAULT 1', 'receipts.branch_id'],
    ['ALTER TABLE openings ADD COLUMN created_by INTEGER', 'openings.created_by'],
    ['ALTER TABLE openings ADD COLUMN created_at TEXT', 'openings.created_at'],
    ['ALTER TABLE openings ADD COLUMN updated_by INTEGER', 'openings.updated_by'],
    ['ALTER TABLE openings ADD COLUMN updated_at TEXT', 'openings.updated_at'],
    ['ALTER TABLE openings ADD COLUMN branch_id INTEGER DEFAULT 1', 'openings.branch_id'],
    ['ALTER TABLE journal_entries ADD COLUMN time TEXT', 'journal_entries.time'],
    ['ALTER TABLE journal_entries ADD COLUMN created_by INTEGER', 'journal_entries.created_by'],
    ['ALTER TABLE journal_entries ADD COLUMN updated_by INTEGER', 'journal_entries.updated_by'],
    ['ALTER TABLE journal_entries ADD COLUMN updated_at TEXT', 'journal_entries.updated_at'],
    ['ALTER TABLE journal_entries ADD COLUMN source_type TEXT DEFAULT \'manual\'', 'journal_entries.source_type'],
    ['ALTER TABLE journal_entries ADD COLUMN source_id INTEGER', 'journal_entries.source_id'],
    ['ALTER TABLE journal_entries ADD COLUMN is_auto INTEGER DEFAULT 0', 'journal_entries.is_auto'],
    ['ALTER TABLE journal_entries ADD COLUMN manual_number INTEGER', 'journal_entries.manual_number'],
    ['ALTER TABLE journal_entries ADD COLUMN branch_id INTEGER DEFAULT 1', 'journal_entries.branch_id'],
    ['ALTER TABLE gold_items ADD COLUMN section TEXT DEFAULT \'mashghulat\'', 'gold_items.section'],
    ['ALTER TABLE gold_items ADD COLUMN purity REAL DEFAULT 0', 'gold_items.purity'],
    ['ALTER TABLE invoice_settings ADD COLUMN goldMultiplier REAL DEFAULT 0.12056', 'invoice_settings.goldMultiplier'],
    ['ALTER TABLE invoice_settings ADD COLUMN gold2Multiplier REAL DEFAULT 0.120555', 'invoice_settings.gold2Multiplier'],
    ['ALTER TABLE invoice_settings ADD COLUMN customMultiplier REAL DEFAULT 1', 'invoice_settings.customMultiplier'],
    ['ALTER TABLE tax_declarations ADD COLUMN expenses_total REAL DEFAULT 0', 'tax_declarations.expenses_total'],
    ['ALTER TABLE tax_declarations ADD COLUMN expenses_tax REAL DEFAULT 0', 'tax_declarations.expenses_tax'],
    ['ALTER TABLE tax_declarations ADD COLUMN sales_zero_amount REAL DEFAULT 0', 'tax_declarations.sales_zero_amount'],
    ['ALTER TABLE tax_declarations ADD COLUMN purchases_zero_amount REAL DEFAULT 0', 'tax_declarations.purchases_zero_amount'],
    ['ALTER TABLE tax_declarations ADD COLUMN branch_id INTEGER DEFAULT 1', 'tax_declarations.branch_id'],
    ['ALTER TABLE sales_invoices ADD COLUMN branch_id INTEGER DEFAULT 1', 'sales_invoices.branch_id'],
    ['ALTER TABLE purchase_invoices ADD COLUMN branch_id INTEGER DEFAULT 1', 'purchase_invoices.branch_id'],
    ['ALTER TABLE orders ADD COLUMN addition REAL DEFAULT 0', 'orders.addition'],
    ['ALTER TABLE orders ADD COLUMN karat TEXT', 'orders.karat'],
    ['ALTER TABLE orders ADD COLUMN dollar_price REAL DEFAULT 0', 'orders.dollar_price'],
    ['ALTER TABLE orders ADD COLUMN price_per_gram REAL DEFAULT 0', 'orders.price_per_gram'],
    ['ALTER TABLE orders ADD COLUMN execution_date TEXT', 'orders.execution_date'],
    ['ALTER TABLE orders ADD COLUMN execution_time TEXT', 'orders.execution_time'],
    ['ALTER TABLE orders ADD COLUMN execute_on_mt5 INTEGER DEFAULT 0', 'orders.execute_on_mt5'],
    ['ALTER TABLE orders ADD COLUMN mt5_order_ticket TEXT', 'orders.mt5_order_ticket'],
    ['ALTER TABLE orders ADD COLUMN mt5_deal_ticket TEXT', 'orders.mt5_deal_ticket'],
    ['ALTER TABLE orders ADD COLUMN mt5_symbol TEXT', 'orders.mt5_symbol'],
    ['ALTER TABLE orders ADD COLUMN mt5_volume REAL', 'orders.mt5_volume'],
    ['ALTER TABLE orders ADD COLUMN mt5_price REAL', 'orders.mt5_price'],
    ['ALTER TABLE orders ADD COLUMN mt5_retcode INTEGER', 'orders.mt5_retcode'],
    ['ALTER TABLE orders ADD COLUMN mt5_error TEXT', 'orders.mt5_error'],
    ['ALTER TABLE orders ADD COLUMN branch_id INTEGER DEFAULT 1', 'orders.branch_id'],
    ['ALTER TABLE default_boxes ADD COLUMN branch_id INTEGER DEFAULT 1', 'default_boxes.branch_id'],
  ];

   for (const [sql, label] of migrations) {
     await executeCloudMigration(sql, label);
   }

  await executeCloudMigration('DROP TABLE IF EXISTS default_boxes_v2', 'default_boxes_v2.drop');
  await executeCloudMigration(`
    CREATE TABLE default_boxes_v2 (
      branch_id INTEGER NOT NULL,
      box_type TEXT NOT NULL,
      account_id INTEGER,
      PRIMARY KEY (branch_id, box_type)
    )
  `, 'default_boxes_v2.create');
  await executeCloudMigration(`
    INSERT OR IGNORE INTO default_boxes_v2 (branch_id, box_type, account_id)
    SELECT COALESCE(branch_id, 1), box_type, account_id
    FROM default_boxes
  `, 'default_boxes_v2.copy');
  await executeCloudMigration('DROP TABLE IF EXISTS default_boxes', 'default_boxes.drop');
  await executeCloudMigration('ALTER TABLE default_boxes_v2 RENAME TO default_boxes', 'default_boxes.rename');
  await executeCloudMigration("UPDATE customers SET access_scope = 'single' WHERE access_scope IS NULL OR TRIM(access_scope) = ''", 'customers.access_scope.backfill');
  await executeCloudMigration("UPDATE suppliers SET access_scope = 'single' WHERE access_scope IS NULL OR TRIM(access_scope) = ''", 'suppliers.access_scope.backfill');
  await executeCloudMigration(`
    INSERT OR IGNORE INTO customer_branches (customer_id, branch_id, created_at)
    SELECT id, COALESCE(NULLIF(branch_id, 0), 1), COALESCE(updated_at, created_at, CURRENT_TIMESTAMP)
    FROM customers
    WHERE COALESCE(access_scope, 'single') <> 'all'
  `, 'customer_branches.backfill');
  await executeCloudMigration(`
    INSERT OR IGNORE INTO supplier_branches (supplier_id, branch_id, created_at)
    SELECT id, COALESCE(NULLIF(branch_id, 0), 1), COALESCE(updated_at, created_at, CURRENT_TIMESTAMP)
    FROM suppliers
    WHERE COALESCE(access_scope, 'single') <> 'all'
  `, 'supplier_branches.backfill');
}

// Initialize Turso client
async function initTursoClient() {
  try {
    const config = loadCloudDbConfig();
    if (!config || !config.url) {
      console.log('[TursoSync] No cloud database configured');
      return false;
    }

    // Load token from localStorage via IPC or config
    const token = config.token;
    if (!token) {
      console.log('[TursoSync] No token found');
      return false;
    }

    const { createClient } = require('@libsql/client');
    tursoClient = createClient({
      url: config.url,
      authToken: token
    });

    // Test connection
    await tursoClient.execute('SELECT 1');
    isConnected = true;
    syncEnabled = true;

    if (shouldRunCloudMigrations(config)) {
      await runCloudMigrations();
      saveCloudMigrationState(config.url, CLOUD_MIGRATIONS_VERSION);
    } else {
      console.log('[TursoSync] Cloud migrations already up to date - skipped');
    }
    
    // طھط­ظ…ظٹظ„ ظˆط¶ط¹ ط§ظ„ط³ط­ط§ط¨ط© ط§ظ„ظ…ط­ظپظˆط¸
    cloudMode = loadCloudModeFromConfig();
    
    console.log('[TursoSync] Connected to Turso cloud database');
    console.log('[TursoSync] Cloud mode:', cloudMode ? 'ENABLED' : 'DISABLED');
    return true;

  } catch (error) {
    console.error('[TursoSync] Connection failed:', error.message);
    isConnected = false;
    syncEnabled = false;
    return false;
  }
}

// Check if sync is enabled and connected
function isSyncEnabled() {
  return syncEnabled && isConnected && tursoClient !== null;
}

// ===== ظˆط¶ط¹ ط§ظ„طھطµط­ظٹط­: ط­ط¸ط± ظ‚ط§ط¹ط¯ط© ط§ظ„ط¨ظٹط§ظ†ط§طھ ط§ظ„ظ…ط­ظ„ظٹط© =====
function setDebugBlockLocalDb(enabled) {
  debugBlockLocalDb = !!enabled;
  console.log('[TursoSync] Debug block local DB:', debugBlockLocalDb ? 'ENABLED' : 'DISABLED');
}

function getDebugBlockLocalDb() {
  return debugBlockLocalDb;
}

// Execute query on Turso (with error handling)
async function executeOnTurso(sql, params = []) {
  if (!isSyncEnabled()) {
    return { success: false, error: 'Turso sync not enabled' };
  }

  try {
    const result = await tursoClient.execute({
      sql: sql,
      args: params
    });

    return { success: true, result };
  } catch (error) {
    console.error('[TursoSync] Query error:', error.message);
    return { success: false, error: error.message };
  }
}

// Sync a single record to Turso
async function syncRecord(tableName, operation, data, localId = null) {
  if (!isSyncEnabled()) return { success: false, skipped: true };

  try {
    let sql, params;

    switch (operation) {
      case 'INSERT':
        const columns = Object.keys(data).join(', ');
        const placeholders = Object.keys(data).map(() => '?').join(', ');
        sql = `INSERT OR REPLACE INTO ${tableName} (${columns}) VALUES (${placeholders})`;
        params = Object.values(data);
        break;

      case 'UPDATE':
        const setClause = Object.keys(data).filter(k => k !== 'id').map(k => `${k} = ?`).join(', ');
        sql = `UPDATE ${tableName} SET ${setClause} WHERE id = ?`;
        params = [...Object.values(data).filter((v, i) => Object.keys(data)[i] !== 'id'), data.id || localId];
        break;

      case 'DELETE':
        sql = `DELETE FROM ${tableName} WHERE id = ?`;
        params = [localId || data.id];
        break;

      default:
        return { success: false, error: 'Unknown operation' };
    }

    return await executeOnTurso(sql, params);

  } catch (error) {
    console.error('[TursoSync] Sync error:', error.message);
    return { success: false, error: error.message };
  }
}

// Sync voucher with all lines
async function syncVoucher(voucher, lines, operation = 'INSERT') {
  if (!isSyncEnabled()) return { success: false, skipped: true };

  try {
    // Sync voucher header
    await syncRecord('vouchers', operation, voucher);

    // Sync voucher lines (delete old first if updating)
    if (operation === 'UPDATE' || operation === 'INSERT') {
      await executeOnTurso('DELETE FROM voucher_lines WHERE voucher_id = ?', [voucher.id]);
      for (const line of lines) {
        await syncRecord('voucher_lines', 'INSERT', { ...line, voucher_id: voucher.id });
      }
    }

    if (operation === 'DELETE') {
      await executeOnTurso('DELETE FROM voucher_lines WHERE voucher_id = ?', [voucher.id]);
      await executeOnTurso('DELETE FROM vouchers WHERE id = ?', [voucher.id]);
    }

    return { success: true };
  } catch (error) {
    console.error('[TursoSync] Voucher sync error:', error.message);
    return { success: false, error: error.message };
  }
}

// Sync receipt with all lines
async function syncReceipt(receipt, lines, operation = 'INSERT') {
  if (!isSyncEnabled()) return { success: false, skipped: true };

  try {
    // Sync receipt header
    await syncRecord('receipts', operation, receipt);

    // Sync receipt lines
    if (operation === 'UPDATE' || operation === 'INSERT') {
      await executeOnTurso('DELETE FROM receipt_lines WHERE receipt_id = ?', [receipt.id]);
      for (const line of lines) {
        await syncRecord('receipt_lines', 'INSERT', { ...line, receipt_id: receipt.id });
      }
    }

    if (operation === 'DELETE') {
      await executeOnTurso('DELETE FROM receipt_lines WHERE receipt_id = ?', [receipt.id]);
      await executeOnTurso('DELETE FROM receipts WHERE id = ?', [receipt.id]);
    }

    return { success: true };
  } catch (error) {
    console.error('[TursoSync] Receipt sync error:', error.message);
    return { success: false, error: error.message };
  }
}

// Sync sales invoice with details
async function syncSalesInvoice(invoice, details, operation = 'INSERT') {
  if (!isSyncEnabled()) return { success: false, skipped: true };

  try {
    await syncRecord('sales_invoices', operation, invoice);

    if (operation === 'UPDATE' || operation === 'INSERT') {
      await executeOnTurso('DELETE FROM sales_invoice_details WHERE invoice_id = ?', [invoice.id]);
      for (const detail of details) {
        await syncRecord('sales_invoice_details', 'INSERT', { ...detail, invoice_id: invoice.id });
      }
    }

    if (operation === 'DELETE') {
      await executeOnTurso('DELETE FROM sales_invoice_details WHERE invoice_id = ?', [invoice.id]);
      await executeOnTurso('DELETE FROM sales_invoices WHERE id = ?', [invoice.id]);
    }

    return { success: true };
  } catch (error) {
    console.error('[TursoSync] Sales invoice sync error:', error.message);
    return { success: false, error: error.message };
  }
}

// Sync purchase invoice with details
async function syncPurchaseInvoice(invoice, details, operation = 'INSERT') {
  if (!isSyncEnabled()) return { success: false, skipped: true };

  try {
    await syncRecord('purchase_invoices', operation, invoice);

    if (operation === 'UPDATE' || operation === 'INSERT') {
      await executeOnTurso('DELETE FROM purchase_invoice_details WHERE invoice_id = ?', [invoice.id]);
      for (const detail of details) {
        await syncRecord('purchase_invoice_details', 'INSERT', { ...detail, invoice_id: invoice.id });
      }
    }

    if (operation === 'DELETE') {
      await executeOnTurso('DELETE FROM purchase_invoice_details WHERE invoice_id = ?', [invoice.id]);
      await executeOnTurso('DELETE FROM purchase_invoices WHERE id = ?', [invoice.id]);
    }

    return { success: true };
  } catch (error) {
    console.error('[TursoSync] Purchase invoice sync error:', error.message);
    return { success: false, error: error.message };
  }
}

// Sync journal entry with lines
async function syncJournalEntry(entry, lines, operation = 'INSERT') {
  if (!isSyncEnabled()) return { success: false, skipped: true };

  try {
    await syncRecord('journal_entries', operation, entry);

    if (operation === 'UPDATE' || operation === 'INSERT') {
      await executeOnTurso('DELETE FROM journal_entry_lines WHERE entry_id = ?', [entry.id]);
      for (const line of lines) {
        await syncRecord('journal_entry_lines', 'INSERT', { ...line, entry_id: entry.id });
      }
    }

    if (operation === 'DELETE') {
      await executeOnTurso('DELETE FROM journal_entry_lines WHERE entry_id = ?', [entry.id]);
      await executeOnTurso('DELETE FROM journal_entries WHERE id = ?', [entry.id]);
    }

    return { success: true };
  } catch (error) {
    console.error('[TursoSync] Journal entry sync error:', error.message);
    return { success: false, error: error.message };
  }
}

// Sync customer
async function syncCustomer(customer, operation = 'INSERT') {
  return await syncRecord('customers', operation, customer, customer.id);
}

// Sync supplier
async function syncSupplier(supplier, operation = 'INSERT') {
  return await syncRecord('suppliers', operation, supplier, supplier.id);
}

// Sync account
async function syncAccount(account, operation = 'INSERT') {
  return await syncRecord('accounts', operation, account, account.id);
}

// Sync user
async function syncUser(user, operation = 'INSERT') {
  return await syncRecord('users', operation, user, user.id);
}

// Sync permission
async function syncPermission(permission, operation = 'INSERT') {
  return await syncRecord('permissions', operation, permission, permission.id);
}

// Sync user permission
async function syncUserPermission(userPermission, operation = 'INSERT') {
  return await syncRecord('user_permissions', operation, userPermission);
}

// Sync opening balance with lines
async function syncOpening(opening, lines, operation = 'INSERT') {
  if (!isSyncEnabled()) return { success: false, skipped: true };

  try {
    await syncRecord('openings', operation, opening);

    if (operation === 'UPDATE' || operation === 'INSERT') {
      await executeOnTurso('DELETE FROM opening_lines WHERE opening_id = ?', [opening.id]);
      for (const line of lines) {
        await syncRecord('opening_lines', 'INSERT', { ...line, opening_id: opening.id });
      }
    }

    if (operation === 'DELETE') {
      await executeOnTurso('DELETE FROM opening_lines WHERE opening_id = ?', [opening.id]);
      await executeOnTurso('DELETE FROM openings WHERE id = ?', [opening.id]);
    }

    return { success: true };
  } catch (error) {
    console.error('[TursoSync] Opening sync error:', error.message);
    return { success: false, error: error.message };
  }
}

// Sync journal entry with lines (updated for journal_lines table name)
async function syncJournal(entry, lines, operation = 'INSERT') {
  if (!isSyncEnabled()) return { success: false, skipped: true };

  try {
    await syncRecord('journal_entries', operation, entry);

    if (operation === 'UPDATE' || operation === 'INSERT') {
      await executeOnTurso('DELETE FROM journal_lines WHERE journal_id = ?', [entry.id]);
      for (const line of lines) {
        await syncRecord('journal_lines', 'INSERT', { ...line, journal_id: entry.id });
      }
    }

    if (operation === 'DELETE') {
      await executeOnTurso('DELETE FROM journal_lines WHERE journal_id = ?', [entry.id]);
      await executeOnTurso('DELETE FROM journal_entries WHERE id = ?', [entry.id]);
    }

    return { success: true };
  } catch (error) {
    console.error('[TursoSync] Journal sync error:', error.message);
    return { success: false, error: error.message };
  }
}

// Sync gold items
async function syncGoldItem(item, operation = 'INSERT') {
  return await syncRecord('gold_items', operation, item, item.id);
}

// Sync gold karats
async function syncGoldKarat(karat, operation = 'INSERT') {
  return await syncRecord('gold_karats', operation, karat, karat.id);
}

// Sync orders
async function syncOrder(order, operation = 'INSERT') {
  return await syncRecord('orders', operation, order, order.id);
}

// Sync company info
async function syncCompany(company, operation = 'INSERT') {
  return await syncRecord('company', operation, company, company.id);
}

// Sync currencies
async function syncCurrency(currency, operation = 'INSERT') {
  return await syncRecord('currencies', operation, currency, currency.id);
}

// Sync account types
async function syncAccountType(accountType, operation = 'INSERT') {
  return await syncRecord('account_types', operation, accountType, accountType.id);
}

// All tables to sync
const ALL_TABLES = [
  'company', 'currencies', 'account_types', 'branches', 'accounts',
  'customers', 'suppliers', 'customer_branches', 'supplier_branches', 'categories',
  'users', 'user_branches', 'user_messages', 'permissions', 'user_permissions',
  'gold_items', 'gold_karats',
  'vouchers', 'voucher_lines', 'receipts', 'receipt_lines',
  'sales_invoices', 'sales_invoice_details',
  'purchase_invoices', 'purchase_invoice_details',
  'journal_entries', 'journal_lines',
  'openings', 'opening_lines',
  'orders', 'default_boxes', 'tax_declarations', 'invoice_settings'
];

const BRANCH_LOCAL_NUMBER_CONFLICT_TABLES = new Map([
  ['vouchers', { touchColumn: 'updated_at', sortColumns: ['created_at', 'updated_at'] }],
  ['receipts', { touchColumn: 'updated_at', sortColumns: ['created_at', 'updated_at'] }],
  ['openings', { touchColumn: 'updated_at', sortColumns: ['created_at', 'updated_at'] }],
  ['sales_invoices', { touchColumn: 'modified_at', sortColumns: ['created_at', 'modified_at'] }],
  ['purchase_invoices', { touchColumn: 'modified_at', sortColumns: ['created_at', 'modified_at'] }],
  ['orders', { touchColumn: 'modified_at', sortColumns: ['created_at', 'modified_at'] }]
]);

function normalizePositiveSyncNumber(value, fallback = 0) {
  const numericValue = Number(value || 0);
  if (Number.isFinite(numericValue) && numericValue > 0) {
    return Math.trunc(numericValue);
  }
  return fallback;
}

function compareBranchLocalConflictRows(left, right, sortColumns = []) {
  const leftNumber = normalizePositiveSyncNumber(left?.branch_local_number, 0);
  const rightNumber = normalizePositiveSyncNumber(right?.branch_local_number, 0);

  if (leftNumber > 0 && rightNumber > 0 && leftNumber !== rightNumber) {
    return leftNumber - rightNumber;
  }
  if (leftNumber > 0 && rightNumber <= 0) {
    return -1;
  }
  if (rightNumber > 0 && leftNumber <= 0) {
    return 1;
  }

  for (const column of Array.isArray(sortColumns) ? sortColumns : []) {
    const leftValue = String(left?.[column] || '');
    const rightValue = String(right?.[column] || '');
    if (leftValue !== rightValue) {
      return leftValue.localeCompare(rightValue);
    }
  }

  const leftId = normalizePositiveSyncNumber(left?.id, Number.MAX_SAFE_INTEGER);
  const rightId = normalizePositiveSyncNumber(right?.id, Number.MAX_SAFE_INTEGER);
  return leftId - rightId;
}

async function reconcileCloudBranchLocalNumberConflicts(tableName) {
  const meta = BRANCH_LOCAL_NUMBER_CONFLICT_TABLES.get(tableName);
  if (!meta || !tursoClient) {
    return null;
  }

  const result = await tursoClient.execute(`SELECT * FROM ${tableName}`);
  const rows = (result.rows || []).map((row) => ({ ...row }));
  if (!rows.length) {
    return rows;
  }

  if (!Object.prototype.hasOwnProperty.call(rows[0], 'branch_local_number')) {
    return rows;
  }

  const touchColumn = meta.touchColumn && Object.prototype.hasOwnProperty.call(rows[0], meta.touchColumn)
    ? meta.touchColumn
    : null;
  const rowsByBranch = new Map();

  for (const row of rows) {
    const branchId = normalizePositiveSyncNumber(row?.branch_id, 1) || 1;
    if (!rowsByBranch.has(branchId)) {
      rowsByBranch.set(branchId, []);
    }
    rowsByBranch.get(branchId).push(row);
  }

  const updates = [];

  for (const [branchId, branchRows] of rowsByBranch.entries()) {
    const usedNumbers = new Set();
    let maxNumber = 0;
    const rowsNeedingRepair = [];
    const sortedRows = [...branchRows].sort((left, right) => compareBranchLocalConflictRows(left, right, meta.sortColumns));

    for (const row of sortedRows) {
      const currentNumber = normalizePositiveSyncNumber(row?.branch_local_number, 0);
      if (currentNumber > 0 && !usedNumbers.has(currentNumber)) {
        usedNumbers.add(currentNumber);
        if (currentNumber > maxNumber) {
          maxNumber = currentNumber;
        }
        continue;
      }

      if (currentNumber > maxNumber) {
        maxNumber = currentNumber;
      }
      rowsNeedingRepair.push(row);
    }

    for (const row of rowsNeedingRepair) {
      const rowId = normalizePositiveSyncNumber(row?.id, 0);
      if (!rowId) {
        continue;
      }

      let nextNumber = maxNumber;
      do {
        nextNumber += 1;
      } while (usedNumbers.has(nextNumber));

      usedNumbers.add(nextNumber);
      maxNumber = nextNumber;
      row.branch_local_number = nextNumber;

      if (touchColumn) {
        row[touchColumn] = new Date().toISOString();
      }

      updates.push({
        id: rowId,
        branchId,
        branchLocalNumber: nextNumber,
        touchValue: touchColumn ? row[touchColumn] : null
      });
    }
  }

  if (!updates.length) {
    return rows;
  }

  for (const update of updates) {
    const args = [update.branchLocalNumber];
    let sql = `UPDATE ${tableName} SET branch_local_number = ?`;
    if (touchColumn) {
      sql += `, ${touchColumn} = ?`;
      args.push(update.touchValue);
    }
    sql += ' WHERE id = ?';
    args.push(update.id);
    await tursoClient.execute({ sql, args });
  }

  console.log(`[TursoSync] Repaired ${updates.length} branch-local numbering conflict(s) in ${tableName}`);
  return rows;
}

async function fetchCloudRowsForPull(tableName, options = {}) {
  if (options.repairBranchLocalNumbers === true) {
    const repairedRows = await reconcileCloudBranchLocalNumberConflicts(tableName);
    if (Array.isArray(repairedRows)) {
      return repairedRows;
    }
  }

  const result = await tursoClient.execute(`SELECT * FROM ${tableName}`);
  return result.rows || [];
}

function isLocalDbEffectivelyEmpty(localDb) {
  if (!localDb) return true;
  for (const table of ALL_TABLES) {
    try {
      const row = localDb.prepare(`SELECT COUNT(*) AS count FROM ${table}`).get();
      if (Number(row?.count || 0) > 0) {
        return false;
      }
    } catch (_) {}
  }
  return true;
}

function replaceLocalTableRows(localDb, tableName, rows = []) {
  localDb.pragma('foreign_keys = OFF');
  try {
    withLocalTransaction(localDb, () => {
      localDb.prepare(`DELETE FROM ${tableName}`).run();
      if (!Array.isArray(rows) || !rows.length) {
        return;
      }
      const columns = Object.keys(rows[0] || {});
      if (!columns.length) {
        return;
      }
      const placeholders = columns.map(() => '?').join(', ');
      const insertStmt = localDb.prepare(`INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`);
      for (const row of rows) {
        insertStmt.run(...columns.map((column) => row[column]));
      }
    });
  } finally {
    localDb.pragma('foreign_keys = ON');
  }
}

function replaceAllLocalTablesRows(localDb, tablesRows = new Map(), orderedTables = ALL_TABLES) {
  const reverseTables = [...orderedTables].reverse();
  localDb.pragma('foreign_keys = OFF');
  try {
    withLocalTransaction(localDb, () => {
      for (const tableName of reverseTables) {
        if (!tablesRows.has(tableName)) continue;
        localDb.prepare(`DELETE FROM ${tableName}`).run();
      }

      for (const tableName of orderedTables) {
        if (!tablesRows.has(tableName)) continue;
        const rows = tablesRows.get(tableName) || [];
        if (!Array.isArray(rows) || !rows.length) {
          continue;
        }
        const columns = Object.keys(rows[0] || {});
        if (!columns.length) {
          continue;
        }
        const placeholders = columns.map(() => '?').join(', ');
        const insertStmt = localDb.prepare(`INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`);
        for (const row of rows) {
          insertStmt.run(...columns.map((column) => row[column]));
        }
      }
    });
  } finally {
    localDb.pragma('foreign_keys = ON');
  }
}

function buildInsertOrReplaceStatement(tableName, row = {}) {
  const columns = Object.keys(row || {});
  const placeholders = columns.map(() => '?').join(', ');
  return {
    sql: `INSERT OR REPLACE INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`,
    values: columns.map((column) => row[column])
  };
}

function withLocalTransaction(localDb, work) {
  if (!localDb || typeof localDb.transaction !== 'function') {
    return work();
  }
  const transaction = localDb.transaction(work);
  return transaction();
}

function upsertLocalRows(localDb, tableName, rows = []) {
  if (!localDb || !Array.isArray(rows) || !rows.length) {
    return 0;
  }
  const columns = Object.keys(rows[0] || {});
  if (!columns.length) {
    return 0;
  }

  let appliedChanges = 0;
  const placeholders = columns.map(() => '?').join(', ');
  const statement = localDb.prepare(`INSERT OR REPLACE INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`);
  withLocalTransaction(localDb, () => {
    for (const row of rows) {
      try {
        statement.run(...columns.map((column) => row[column]));
        appliedChanges += 1;
      } catch (insertErr) {
        console.log(`[TursoSync] Skip row in ${tableName}: ${insertErr.message}`);
      }
    }
  });
  return appliedChanges;
}

function splitIntoChunks(values = [], chunkSize = 200) {
  const normalizedChunkSize = Math.max(1, Number(chunkSize) || 1);
  const chunks = [];
  for (let index = 0; index < values.length; index += normalizedChunkSize) {
    chunks.push(values.slice(index, index + normalizedChunkSize));
  }
  return chunks;
}

async function fetchCloudRowsByIds(tableName, ids = []) {
  const normalizedIds = Array.from(new Set(
    (Array.isArray(ids) ? ids : [])
      .filter((id) => id !== null && id !== undefined && String(id) !== '')
  ));
  if (!normalizedIds.length) {
    return [];
  }
  const rows = [];
  for (const idChunk of splitIntoChunks(normalizedIds, 200)) {
    const placeholders = idChunk.map(() => '?').join(', ');
    const result = await tursoClient.execute({
      sql: `SELECT * FROM ${tableName} WHERE id IN (${placeholders})`,
      args: idChunk
    });
    rows.push(...(result.rows || []));
  }
  return rows;
}

let lastSyncTimestamp = null;

async function getLastSyncTimestamp() {
  try {
    if (lastSyncTimestamp) {
      return lastSyncTimestamp;
    }
    const configPath = path.join(getDataDir(), 'cloud-db-last-sync.json');
    if (fs.existsSync(configPath)) {
      const data = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      lastSyncTimestamp = data?.lastSync || null;
      return lastSyncTimestamp;
    }
  } catch (e) {
    console.error('[TursoSync] Error reading last sync:', e.message);
  }
  return null;
 }

function saveLastSyncTimestamp() {
  try {
    const configPath = path.join(getDataDir(), 'cloud-db-last-sync.json');
    const timestamp = new Date().toISOString();
    fs.writeFileSync(configPath, JSON.stringify({ lastSync: timestamp }), 'utf8');
    lastSyncTimestamp = timestamp;
    return timestamp;
  } catch (e) {
    console.error('[TursoSync] Error saving last sync:', e.message);
    return null;
  }
 }

// Full database sync (download from cloud)
async function pullFromCloudCore(localDb) {
  if (!isSyncEnabled()) return { success: false, error: 'Turso not connected' };

  try {
    const tables = ALL_TABLES;
    const details = [];
    const cloudRowsByTable = new Map();

    for (const table of tables) {
      try {
        const rows = await fetchCloudRowsForPull(table, { repairBranchLocalNumbers: true });
        cloudRowsByTable.set(table, rows);
        details.push({ table, count: rows.length || 0, status: 'success' });
      } catch (tableError) {
        console.log(`[TursoSync] Skipping table ${table}: ${tableError.message}`);
        details.push({ table, count: 0, status: 'error', error: tableError.message });
      }
    }

    replaceAllLocalTablesRows(localDb, cloudRowsByTable, tables);

    const successfulTables = details.filter((item) => item?.status === 'success');
    const totalChanges = successfulTables.reduce((sum, item) => sum + Number(item?.count || 0), 0);

    saveLastSyncTimestamp();
    return {
      success: true,
      message: 'Pull completed',
      details,
      changes: totalChanges,
      changedTables: successfulTables.map((item) => item.table),
      latestRows: {},
    };
  } catch (error) {
    console.error('[TursoSync] Pull error:', error.message);
    return { success: false, error: error.message };
  }
}

async function pushToCloud(localDb) {
  if (!isSyncEnabled()) return { success: false, error: 'Turso not connected' };

  try {
    const tables = ALL_TABLES;
    const reverseTables = [...tables].reverse();
    const localRowsByTable = new Map();

    for (const table of tables) {
      try {
        const rows = localDb.prepare(`SELECT * FROM ${table}`).all();
        localRowsByTable.set(table, rows);
      } catch (tableError) {
        console.log(`[TursoSync] Skipping local table ${table}: ${tableError.message}`);
      }
    }

    await tursoClient.execute('PRAGMA foreign_keys = OFF');
    try {
      for (const table of reverseTables) {
        if (!localRowsByTable.has(table)) continue;
        await tursoClient.execute(`DELETE FROM ${table}`);
      }

      for (const table of tables) {
        if (!localRowsByTable.has(table)) continue;
        const rows = localRowsByTable.get(table) || [];

        for (const row of rows) {
          const columns = Object.keys(row);
          const placeholders = columns.map(() => '?').join(', ');
          const sql = `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`;
          await tursoClient.execute({ sql, args: Object.values(row) });
        }
      }
    } finally {
      try {
        await tursoClient.execute('PRAGMA foreign_keys = ON');
      } catch (_) {}
    }

    saveLastSyncTimestamp();
    return { success: true, message: 'Push completed' };
  } catch (error) {
    console.error('[TursoSync] Push error:', error.message);
    return { success: false, error: error.message };
  }
 }

// Pull incremental changes from cloud (only new/updated records)
async function pullIncrementalFromCloudCore(localDb, options = {}) {
  if (!isSyncEnabled()) return { success: false, error: 'Turso not connected' };

  try {
    const lastSync = await getLastSyncTimestamp();
    const localDbIsEmpty = isLocalDbEffectivelyEmpty(localDb);
    if (localDbIsEmpty) {
      const fullPullResult = await pullFromCloudCore(localDb);
      const successfulTables = Array.isArray(fullPullResult?.details)
        ? fullPullResult.details.filter((item) => item?.status === 'success')
        : [];
      return {
        success: !!fullPullResult?.success,
        changes: successfulTables.reduce((sum, item) => sum + Number(item?.count || 0), 0),
        changedTables: successfulTables.map((item) => item.table),
        latestRows: {},
        message: 'Initial full pull completed',
        details: fullPullResult?.details || [],
      };
    }
    let totalChanges = 0;
    const changedTables = new Set();
    const latestRows = {};
    const normalizeRowsForCompare = (rows = []) => rows.map((row) => {
      const normalized = {};
      Object.keys(row || {}).sort().forEach((key) => {
        normalized[key] = row[key] ?? null;
      });
      return normalized;
    }).sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));

    // Tables with created_at/updated_at for incremental sync
    const tablesWithTimestamp = [
      { name: 'branches', timeCol: 'COALESCE(updated_at, created_at)' },
      { name: 'customers', timeCol: 'COALESCE(updated_at, created_at)' },
      { name: 'suppliers', timeCol: 'COALESCE(updated_at, created_at)' },
      { name: 'vouchers', timeCol: 'COALESCE(updated_at, created_at)' },
      { name: 'receipts', timeCol: 'COALESCE(updated_at, created_at)' },
      { name: 'sales_invoices', timeCol: 'COALESCE(modified_at, created_at)' },
      { name: 'purchase_invoices', timeCol: 'COALESCE(modified_at, created_at)' },
      { name: 'journal_entries', timeCol: 'COALESCE(updated_at, created_at)' },
      { name: 'openings', timeCol: 'COALESCE(updated_at, created_at)' },
      { name: 'orders', timeCol: 'COALESCE(modified_at, created_at)' },
      { name: 'gold_items', timeCol: 'COALESCE(updated_at, created_at)' },
      { name: 'gold_karats', timeCol: 'COALESCE(updated_at, created_at)' },
      { name: 'invoice_settings', timeCol: 'COALESCE(updated_at, created_at)' }
    ];

    for (const tableInfo of tablesWithTimestamp) {
      try {
        if (options.repairBranchLocalNumbers) {
          await reconcileCloudBranchLocalNumberConflicts(tableInfo.name);
        }
        let sql = `SELECT * FROM ${tableInfo.name}`;
        let args = [];
        
        if (lastSync) {
          sql += ` WHERE ${tableInfo.timeCol} > ?`;
          args = [lastSync];
        }

        const result = await tursoClient.execute({ sql, args });
        
        if (result.rows && result.rows.length > 0) {
          changedTables.add(tableInfo.name);
          latestRows[tableInfo.name] = result.rows.slice(-20).map((row) => ({ ...row }));
          totalChanges += upsertLocalRows(localDb, tableInfo.name, result.rows);
        }

        const cloudIdRows = await tursoClient.execute(`SELECT id FROM ${tableInfo.name}`);
        const cloudIds = new Set((cloudIdRows.rows || []).map((row) => String(row?.id ?? '')));
        const localIdRows = localDb.prepare(`SELECT id FROM ${tableInfo.name}`).all();
        const localIds = new Set((localIdRows || []).map((row) => String(row?.id ?? '')));
        const idsMissingLocally = Array.from(cloudIds).filter((id) => id && !localIds.has(id));

        if (idsMissingLocally.length) {
          const missingRows = await fetchCloudRowsByIds(tableInfo.name, idsMissingLocally);
          if (missingRows.length) {
            changedTables.add(tableInfo.name);
            latestRows[tableInfo.name] = [
              ...(Array.isArray(latestRows[tableInfo.name]) ? latestRows[tableInfo.name] : []),
              ...missingRows.slice(-20).map((row) => ({ ...row }))
            ].slice(-20);
            totalChanges += upsertLocalRows(localDb, tableInfo.name, missingRows);
          }
        }

        const idsToDelete = localIdRows
          .map((row) => row?.id)
          .filter((id) => id !== null && id !== undefined)
          .filter((id) => !cloudIds.has(String(id)));

        if (idsToDelete.length) {
          changedTables.add(tableInfo.name);
          const deleteStmt = localDb.prepare(`DELETE FROM ${tableInfo.name} WHERE id = ?`);
          for (const id of idsToDelete) {
            try {
              deleteStmt.run(id);
              totalChanges++;
            } catch (deleteErr) {
              console.log(`[TursoSync] Skip delete in ${tableInfo.name}: ${deleteErr.message}`);
            }
          }
        }
      } catch (tableError) {
        console.log(`[TursoSync] Skipping table ${tableInfo.name}: ${tableError.message}`);
      }
    }

    if (options.includeAuxiliaryTables) {
      const referenceTables = [
        'company',
        'branches',
        'accounts',
        'customer_branches',
        'supplier_branches',
        'users',
        'user_branches',
        'user_messages',
        'currencies',
        'account_types',
        'categories',
        'permissions',
        'user_permissions',
        'default_boxes',
        'tax_declarations'
      ];

      for (const tableName of referenceTables) {
        try {
          const result = await tursoClient.execute(`SELECT * FROM ${tableName}`);
          const cloudRows = result.rows || [];
          const localRows = localDb.prepare(`SELECT * FROM ${tableName}`).all();
          const sameContent = JSON.stringify(normalizeRowsForCompare(localRows)) === JSON.stringify(normalizeRowsForCompare(cloudRows));
          if (sameContent) {
            continue;
          }

          changedTables.add(tableName);
          latestRows[tableName] = cloudRows.slice(-20).map((row) => ({ ...row }));
          replaceLocalTableRows(localDb, tableName, cloudRows);

          totalChanges += Math.max(cloudRows.length, localRows.length, 1);
        } catch (tableError) {
          console.log(`[TursoSync] Skipping reference table ${tableName}: ${tableError.message}`);
        }
      }

      // Also sync related lines tables (voucher_lines, receipt_lines, etc.)
      const linesTables = [
        { name: 'voucher_lines', parentTable: 'vouchers', parentCol: 'voucher_id' },
        { name: 'receipt_lines', parentTable: 'receipts', parentCol: 'receipt_id' },
        { name: 'journal_lines', parentTable: 'journal_entries', parentCol: 'journal_id' },
        { name: 'opening_lines', parentTable: 'openings', parentCol: 'opening_id' },
        { name: 'sales_invoice_details', parentTable: 'sales_invoices', parentCol: 'invoice_id' },
        { name: 'purchase_invoice_details', parentTable: 'purchase_invoices', parentCol: 'invoice_id' }
      ];

      for (const lineTable of linesTables) {
        try {
          const result = await tursoClient.execute(`SELECT * FROM ${lineTable.name}`);
          const cloudRows = result.rows || [];
          const localRows = localDb.prepare(`SELECT * FROM ${lineTable.name}`).all();
          const sameContent = JSON.stringify(normalizeRowsForCompare(localRows)) === JSON.stringify(normalizeRowsForCompare(cloudRows));
          if (sameContent) {
            continue;
          }

          changedTables.add(lineTable.name);
          replaceLocalTableRows(localDb, lineTable.name, cloudRows);

          totalChanges += Math.max(cloudRows.length, localRows.length, 1);
        } catch (tableError) {
          console.log(`[TursoSync] Skipping lines table ${lineTable.name}: ${tableError.message}`);
        }
      }
    }

    // Save sync timestamp
    saveLastSyncTimestamp();

    // Invalidate in-memory caches for changed domains
    const cacheByTable = {
      branches: ['branches'],
      customers: ['customers', 'customersStats', 'customersDebt'],
      suppliers: ['suppliers', 'suppliersStats', 'suppliersDebt'],
      customer_branches: ['customers', 'customersStats', 'customersDebt'],
      supplier_branches: ['suppliers', 'suppliersStats', 'suppliersDebt'],
      accounts: ['accounts', 'defaultBoxes'],
      user_branches: ['users'],
    };
    changedTables.forEach((tableName) => {
      const keys = cacheByTable[tableName];
      if (Array.isArray(keys)) {
        keys.forEach((k) => invalidateCache(k));
      }
    });

    return {
      success: true,
      changes: totalChanges,
      changedTables: Array.from(changedTables),
      latestRows,
      message: 'Incremental pull completed',
    };
  } catch (error) {
    console.error('[TursoSync] Incremental pull error:', error.message);
    return { success: false, error: error.message };
  }
}

async function pullFromCloud(localDb) {
  return await runCloudSyncExclusive('full pull', () => pullFromCloudCore(localDb));
}

async function pullIncrementalFromCloud(localDb, options = {}) {
  return await runCloudSyncExclusive('incremental pull', () => pullIncrementalFromCloudCore(localDb, options));
}

// Start periodic sync (every N seconds)
let syncIntervalId = null;

function startPeriodicSync(dbRef, intervalSeconds = 30, onChanges = null, options = {}) {
  if (!isCloudMode()) {
    console.log('[TursoSync] Periodic sync NOT started - LOCAL mode');
    return false;
  }

  const useFullSync = options?.fullSync === true;

  if (syncIntervalId) {
    clearInterval(syncIntervalId);
  }

  syncIntervalId = setInterval(async () => {
    if (isSyncEnabled() && isCloudMode()) {
      try {
        const activeLocalDb = localDb || dbRef;
        const result = useFullSync
          ? await pullFromCloud(activeLocalDb)
          : await pullIncrementalFromCloud(activeLocalDb, options);
        console.log(`[TursoSync] Periodic ${useFullSync ? 'full' : 'incremental'} sync result: changes=${result?.changes || 0}, tables=${JSON.stringify(result?.changedTables || [])}`);
        if (Number(result?.changes || 0) > 0 && typeof onChanges === 'function') {
          try {
            onChanges(result);
          } catch (cbErr) {
            console.error('[TursoSync] onChanges callback error:', cbErr.message);
          }
        }
      } catch (e) {
        console.error('[TursoSync] Periodic sync error:', e.message);
      }
    }
  }, intervalSeconds * 1000);

  console.log(`[TursoSync] Periodic ${useFullSync ? 'full' : 'incremental'} sync started (every ${intervalSeconds}s)`);
  return true;
}

function stopPeriodicSync() {
  if (syncIntervalId) {
    clearInterval(syncIntervalId);
    syncIntervalId = null;
    console.log('[TursoSync] Periodic sync stopped');
  }
  return true;
}

function disconnect() {
  stopPeriodicSync();
  tursoClient = null;
  isConnected = false;
  syncEnabled = false;
  invalidateCache();
  invalidateCloudQueryCaches();
  console.log('[TursoSync] Disconnected from Turso');
  return true;
}

// Export functions
module.exports = {
  initTursoClient,
  isSyncEnabled,
  executeOnTurso,
  syncRecord,
  syncVoucher,
  syncReceipt,
  syncSalesInvoice,
  syncPurchaseInvoice,
  syncJournalEntry,
  syncJournal,
  syncCustomer,
  syncSupplier,
  syncAccount,
  syncUser,
  syncPermission,
  syncUserPermission,
  syncOpening,
  syncGoldItem,
  syncGoldKarat,
  syncOrder,
  syncCompany,
  syncCurrency,
  syncAccountType,
  getLastSyncTimestamp,
  saveLastSyncTimestamp,
  pullFromCloud,
  pushToCloud,
  pullIncrementalFromCloud,
  startPeriodicSync,
  stopPeriodicSync,
  disconnect,
  ALL_TABLES,
  // ظ†ط¸ط§ظ… ط§ظ„طھط¨ط¯ظٹظ„ ط¨ظٹظ† ط§ظ„ظ…ط­ظ„ظٹ ظˆط§ظ„ط³ط­ط§ط¨ظٹ
  setCloudMode,
  isCloudMode,
  getSavedCloudMode,
  setLocalDb,
  query,
  queryOne,
  queryAll,
  run,
  getClient,
  // ظˆط¶ط¹ ط§ظ„طھطµط­ظٹط­
  setDebugBlockLocalDb,
  getDebugBlockLocalDb,
  // ظ†ط¸ط§ظ… Cache
  getCache,
  setCache,
  invalidateCache,
  isCacheValid,
  isCloudSyncInProgress
};

// ==================== ظ†ط¸ط§ظ… ط§ظ„طھط¨ط¯ظٹظ„ ط¨ظٹظ† ط§ظ„ظ…ط­ظ„ظٹ ظˆط§ظ„ط³ط­ط§ط¨ظٹ ====================

// طھط¹ظٹظٹظ† ظˆط¶ط¹ ط§ظ„ط³ط­ط§ط¨ط©
function setCloudMode(enabled) {
  // ط­ظپط¸ ظ…ط§ ط·ظ„ط¨ظ‡ ط§ظ„ظ…ط³طھط®ط¯ظ… ط£ظˆظ„ط§ظ‹
  saveCloudModeConfig(enabled);
  // طھط¹ظٹظٹظ† ط§ظ„ظˆط¶ط¹ ط§ظ„ظپط¹ظ„ظٹ (ظٹط¹طھظ…ط¯ ط¹ظ„ظ‰ ط§ظ„ط§طھطµط§ظ„)
  cloudMode = enabled && isConnected;
  // ظ…ط³ط­ ط§ظ„ظ€ cache ط¹ظ†ط¯ طھط¨ط¯ظٹظ„ ط§ظ„ظˆط¶ط¹ ظ„طھط¬ظ†ط¨ ط¨ظٹط§ظ†ط§طھ ظ‚ط¯ظٹظ…ط©
  invalidateCache();
  console.log('[TursoSync] Cloud mode:', cloudMode ? 'ENABLED' : 'DISABLED', '(cache cleared)');
  return cloudMode;
}

// ط§ظ„طھط­ظ‚ظ‚ ظ…ظ† ظˆط¶ط¹ ط§ظ„ط³ط­ط§ط¨ط©
function isCloudMode() {
  return cloudMode && isConnected && tursoClient !== null;
}

// ط§ظ„ط­طµظˆظ„ ط¹ظ„ظ‰ ظˆط¶ط¹ ط§ظ„ط³ط­ط§ط¨ط© ط§ظ„ظ…ط­ظپظˆط¸ (ظ…ط§ ط·ظ„ط¨ظ‡ ط§ظ„ظ…ط³طھط®ط¯ظ…)
function getSavedCloudMode() {
  return loadCloudModeFromConfig();
}

// طھط¹ظٹظٹظ† ظ…ط±ط¬ط¹ ظ‚ط§ط¹ط¯ط© ط§ظ„ط¨ظٹط§ظ†ط§طھ ط§ظ„ظ…ط­ظ„ظٹط©
function setLocalDb(db) {
  localDb = db;
}

// ط§ظ„ط­طµظˆظ„ ط¹ظ„ظ‰ ط§ظ„ظ€ client ط§ظ„ظ†ط´ط·
function getClient() {
  return isCloudMode() ? tursoClient : localDb;
}

// ط­ظپط¸ ظˆط¶ط¹ ط§ظ„ط³ط­ط§ط¨ط© ظپظٹ ط§ظ„ط¥ط¹ط¯ط§ط¯ط§طھ
function saveCloudModeConfig(enabled) {
  try {
    const configPath = path.join(getDataDir(), 'cloud-db-config.json');
    let config = {};
    if (fs.existsSync(configPath)) {
      config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    }
    config.cloudMode = enabled;
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
  } catch (e) {
    console.error('[TursoSync] Error saving cloud mode:', e.message);
  }
}

// طھط­ظ…ظٹظ„ ظˆط¶ط¹ ط§ظ„ط³ط­ط§ط¨ط© ظ…ظ† ط§ظ„ط¥ط¹ط¯ط§ط¯ط§طھ
function loadCloudModeFromConfig() {
  try {
    const configPath = path.join(getDataDir(), 'cloud-db-config.json');
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      return config.cloudMode === true;
    }
  } catch (e) {}
  return false;
}

// ==================== ط¯ظˆط§ظ„ ط§ظ„ط§ط³طھط¹ظ„ط§ظ… ط§ظ„ظ…ظˆط­ط¯ط© ====================

// ط§ط³طھط¹ظ„ط§ظ… ظٹظڈط±ط¬ط¹ طµظپ ظˆط§ط­ط¯
async function queryOne(sql, params = []) {
  if (isCloudMode()) {
    try {
      return await executeCloudRead('one', sql, params, async () => {
        const result = await tursoClient.execute({ sql, args: params });
        return result.rows && result.rows.length > 0 ? result.rows[0] : null;
      });
    } catch (error) {
      console.error('[TursoSync] queryOne error:', error.message);
      throw error;
    }
  } else {
    if (debugBlockLocalDb) {
      console.error('[TursoSync DEBUG] â‌Œ BLOCKED: queryOne attempted on LOCAL DB:', sql.substring(0, 100));
      throw new Error('DEBUG_BLOCK: Local DB access blocked - enable cloud mode');
    }
    if (!localDb) {
      throw new Error('LOCAL_DB_NOT_SET: ظ‚ط§ط¹ط¯ط© ط§ظ„ط¨ظٹط§ظ†ط§طھ ط§ظ„ظ…ط­ظ„ظٹط© ط؛ظٹط± ظ…طھطµظ„ط©');
    }
    return localDb.prepare(sql).get(...params);
  }
}

// ط§ط³طھط¹ظ„ط§ظ… ظٹظڈط±ط¬ط¹ ط¬ظ…ظٹط¹ ط§ظ„طµظپظˆظپ
async function queryAll(sql, params = []) {
  if (isCloudMode()) {
    try {
      return await executeCloudRead('all', sql, params, async () => {
        const result = await tursoClient.execute({ sql, args: params });
        return result.rows || [];
      });
    } catch (error) {
      console.error('[TursoSync] queryAll error:', error.message);
      throw error;
    }
  } else {
    if (debugBlockLocalDb) {
      console.error('[TursoSync DEBUG] â‌Œ BLOCKED: queryAll attempted on LOCAL DB:', sql.substring(0, 100));
      throw new Error('DEBUG_BLOCK: Local DB access blocked - enable cloud mode');
    }
    if (!localDb) {
      throw new Error('LOCAL_DB_NOT_SET: ظ‚ط§ط¹ط¯ط© ط§ظ„ط¨ظٹط§ظ†ط§طھ ط§ظ„ظ…ط­ظ„ظٹط© ط؛ظٹط± ظ…طھطµظ„ط©');
    }
    return localDb.prepare(sql).all(...params);
  }
}

// ط§ط³طھط¹ظ„ط§ظ… ط¹ط§ظ… (SELECT)
async function query(sql, params = []) {
  return await queryAll(sql, params);
}

// طھظ†ظپظٹط° ط£ظ…ط± (INSERT/UPDATE/DELETE)
async function run(sql, params = []) {
  if (isCloudMode()) {
    try {
      const result = await tursoClient.execute({ sql, args: params });
      invalidateCloudQueryCaches();
      return { 
        changes: result.rowsAffected || 0, 
        lastInsertRowid: result.lastInsertRowid ? Number(result.lastInsertRowid) : 0 
      };
    } catch (error) {
      console.error('[TursoSync] run CLOUD error:', error.message, '| SQL:', sql.substring(0, 100));
      throw error;
    }
  } else {
    if (debugBlockLocalDb) {
      console.error('[TursoSync DEBUG] â‌Œ BLOCKED: run attempted on LOCAL DB:', sql.substring(0, 100));
      throw new Error('DEBUG_BLOCK: Local DB access blocked - enable cloud mode');
    }
    if (!localDb) {
      throw new Error('LOCAL_DB_NOT_SET: ظ‚ط§ط¹ط¯ط© ط§ظ„ط¨ظٹط§ظ†ط§طھ ط§ظ„ظ…ط­ظ„ظٹط© ط؛ظٹط± ظ…طھطµظ„ط©');
    }
    const stmt = localDb.prepare(sql);
    const info = stmt.run(...params);
    return { changes: info.changes, lastInsertRowid: info.lastInsertRowid };
  }
}


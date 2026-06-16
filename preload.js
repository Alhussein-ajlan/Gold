const { contextBridge, ipcRenderer } = require('electron');

const BRANCH_SCOPED_CHANNELS = new Set([
  'get-company-info',
  'save-company-info',
  'pick-company-logo',
  'get-invoice-settings',
  'save-invoice-settings',
  'get-currency-settings',
  'save-currency-settings',
  'reports:get-statement-optimized',
  'reports:get-quick-statement',
  'reports:get-center-totals',
  'reports:get-trial-balance',
  'reports:get-income-statement',
  'reports:get-balance-sheet',
  'reports:get-general-ledger',
  'reports:get-category-inventory',
  'get-all-entity-balances',
  'tax-report-get-data',
  'movement-get-entity-name',
  'movement-sales-summary',
  'movement-purchases-summary',
  'movement-receipts-summary',
  'movement-vouchers-summary',
  'movement-journals-summary',
  'movement-document-details',
  'sales-purchase-movement-list',
  'tax-declaration-next-number',
  'tax-declaration-generate-summary',
  'tax-declarations-list',
  'tax-declaration-save',
  'tax-declaration-delete',
  'list-journal-entries',
  'list-all-journal-entries',
  'get-journal-entry',
  'get-customers-stats',
  'get-customers-debt',
  'get-suppliers-stats',
  'get-suppliers-debt',
  'get-open-positions',
  'get-accounts-stats',
  'get-customers',
  'get-suppliers',
  'get-accounts',
  'get-accounts-flat',
  'get-account-children',
  'get-next-account-code',
  'get-account-by-code',
  'get-default-boxes',
  'set-default-box',
  'get-next-journal-id',
  'voucher-next-id',
  'voucher-list',
  'voucher-get',
  'voucher-add',
  'voucher-update',
  'voucher-remove',
  'receipt-next-id',
  'receipt-list',
  'receipt-get',
  'receipt-add',
  'receipt-update',
  'receipt-remove',
  'opening-next-id',
  'opening-list',
  'opening-get',
  'opening-add',
  'opening-update',
  'opening-remove',
  'sales-invoice-next-id',
  'sales-invoice-list',
  'sales-invoice-get',
  'sales-invoice-add',
  'sales-invoice-update',
  'sales-invoice-remove',
  'sales-invoice-check-ref',
  'purchase-invoice-next-id',
  'purchase-invoice-list',
  'purchase-invoice-get',
  'purchase-invoice-add',
  'purchase-invoice-update',
  'purchase-invoice-remove',
  'purchase-invoice-check-ref',
  'orders-list',
  'orders-get',
  'orders-add',
  'orders-update',
  'orders-delete',
  'orders-update-status',
  'orders-complete-local',
  'orders-process-local-pending',
  'orders-execute-mt5',
  'add-customer',
  'update-customer',
  'delete-customer',
  'add-supplier',
  'update-supplier',
  'delete-supplier',
  'add-account',
  'update-account',
  'delete-account',
  'add-journal-entry',
  'update-journal-entry',
  'delete-journal-entry',
  'open-doc-window',
  'open-invoice-window',
  'open-document-window',
]);

const BRANCH_SCOPED_CLOUD_TABLES = new Set([
  'accounts',
  'customers',
  'suppliers',
  'customer_branches',
  'supplier_branches',
  'default_boxes',
  'receipts',
  'vouchers',
  'openings',
  'journal_entries',
  'sales_invoices',
  'purchase_invoices',
  'orders',
  'tax_declarations',
]);

const CURRENT_BRANCH_SCOPE_KEY = 'branchScope';

function getCurrentBranchIdFromStorage() {
  try {
    const raw = window.localStorage.getItem('currentBranch');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const normalized = Number(parsed?.id || parsed?.branch_id || parsed?.branchId || 0) || 0;
    return normalized > 0 ? normalized : null;
  } catch (_) {
    return null;
  }
}

function getCurrentBranchIdFromUrl() {
  try {
    const params = new URLSearchParams(window.location.search || '');
    const normalized = Number(
      params.get('branchId') || params.get('branch_id') || params.get('selectedBranchId') || 0
    ) || 0;
    return normalized > 0 ? normalized : null;
  } catch (_) {
    return null;
  }
}

function getCurrentBranchId() {
  return getCurrentBranchIdFromUrl() || getCurrentBranchIdFromStorage();
}

function getCurrentBranchScopeFromStorage() {
  try {
    const raw = window.localStorage.getItem(CURRENT_BRANCH_SCOPE_KEY);
    if (!raw) return 'branch';
    const parsed = JSON.parse(raw);
    return String(parsed?.mode || parsed?.scope || parsed?.value || '').trim().toLowerCase() === 'all' ? 'all' : 'branch';
  } catch (_) {
    return 'branch';
  }
}

function getCurrentBranchScopeFromUrl() {
  try {
    const params = new URLSearchParams(window.location.search || '');
    return String(params.get('branchScope') || params.get('branch_scope') || '').trim().toLowerCase() === 'all' ? 'all' : null;
  } catch (_) {
    return null;
  }
}

function getCurrentBranchScope() {
  return getCurrentBranchScopeFromUrl() || getCurrentBranchScopeFromStorage();
}

function normalizeAllowedBranchIds(values = []) {
  const list = Array.isArray(values) ? values : String(values || '').split(',');
  const unique = new Set();
  list.forEach((value) => {
    const normalized = Number(value || 0) || 0;
    if (Number.isFinite(normalized) && normalized > 0) {
      unique.add(normalized);
    }
  });
  return Array.from(unique);
}

function getAllowedBranchIdsFromUrl() {
  try {
    const params = new URLSearchParams(window.location.search || '');
    return normalizeAllowedBranchIds(params.get('allowedBranchIds') || params.get('allowed_branch_ids') || '');
  } catch (_) {
    return [];
  }
}

function getAllowedBranchIdsFromStorage() {
  try {
    const scopeRaw = window.localStorage.getItem(CURRENT_BRANCH_SCOPE_KEY);
    if (scopeRaw) {
      const scopeParsed = JSON.parse(scopeRaw);
      const scopeAllowedBranchIds = normalizeAllowedBranchIds(
        Array.isArray(scopeParsed?.allowedBranchIds)
          ? scopeParsed.allowedBranchIds
          : (Array.isArray(scopeParsed?.allowed_branch_ids) ? scopeParsed.allowed_branch_ids : [])
      );
      if (scopeAllowedBranchIds.length) {
        return scopeAllowedBranchIds;
      }
    }
    const raw = window.localStorage.getItem('currentUser');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return normalizeAllowedBranchIds(Array.isArray(parsed?.allowed_branch_ids) ? parsed.allowed_branch_ids : []);
  } catch (_) {
    return [];
  }
}

function getAllowedBranchIds() {
  const urlAllowedBranchIds = getAllowedBranchIdsFromUrl();
  if (urlAllowedBranchIds.length) {
    return urlAllowedBranchIds;
  }
  return getAllowedBranchIdsFromStorage();
}

function attachBranchContext(data) {
  const branchId = getCurrentBranchId();
  const branchScope = getCurrentBranchScope();
  const allowedBranchIds = getAllowedBranchIds();
  if (!branchId && branchScope !== 'all' && !allowedBranchIds.length) {
    return data;
  }

  if (data == null) {
    const payload = branchId
      ? { branchId, selectedBranchId: branchId, branchScope }
      : { branchScope };
    if (allowedBranchIds.length) {
      payload.allowedBranchIds = allowedBranchIds;
    }
    return payload;
  }

  if (typeof data === 'object' && !Array.isArray(data)) {
    const payload = {
      ...data,
      branchScope: data.branchScope || data.branch_scope || branchScope,
    };
    const existingAllowedBranchIds = normalizeAllowedBranchIds(
      Array.isArray(data.allowedBranchIds)
        ? data.allowedBranchIds
        : (Array.isArray(data.allowed_branch_ids) ? data.allowed_branch_ids : [])
    );
    if (!existingAllowedBranchIds.length && allowedBranchIds.length) {
      payload.allowedBranchIds = allowedBranchIds;
    }
    const hasExplicitBranchId = Object.prototype.hasOwnProperty.call(data, 'branchId')
      || Object.prototype.hasOwnProperty.call(data, 'branch_id')
      || Object.prototype.hasOwnProperty.call(data, 'selectedBranchId');
    if (hasExplicitBranchId || !branchId) {
      return payload;
    }
    return {
      ...payload,
      branchId,
      selectedBranchId: branchId,
    };
  }

  return {
    id: data,
    branchId,
    selectedBranchId: branchId,
    branchScope,
    ...(allowedBranchIds.length ? { allowedBranchIds } : {}),
  };
}

function shouldDeliverCloudPayload(payload) {
  const tables = Array.isArray(payload?.tables)
    ? payload.tables.map(table => String(table || '').trim().toLowerCase()).filter(Boolean)
    : [];
  const hasBranchScopedTable = tables.some(table => BRANCH_SCOPED_CLOUD_TABLES.has(table));
  const hasNonBranchScopedTable = tables.some(table => !BRANCH_SCOPED_CLOUD_TABLES.has(table));
  if (!hasBranchScopedTable || hasNonBranchScopedTable) {
    return true;
  }
  const currentBranchScope = getCurrentBranchScope();
  const allowedBranchIds = getAllowedBranchIds();
  const currentBranchId = getCurrentBranchId();
  const payloadBranchId = Number(payload?.branchId || payload?.branch_id || 0) || 0;
  if (currentBranchScope === 'all') {
    if (!payloadBranchId || !allowedBranchIds.length) {
      return true;
    }
    return allowedBranchIds.includes(payloadBranchId);
  }
  if (!currentBranchId || !payloadBranchId) {
    return true;
  }
  return payloadBranchId === currentBranchId;
}

function invokeAppChannel(channel, data) {
  if (BRANCH_SCOPED_CHANNELS.has(channel)) {
    return ipcRenderer.invoke(channel, attachBranchContext(data));
  }
  return ipcRenderer.invoke(channel, data);
}

contextBridge.exposeInMainWorld('db', {
  getCustomers: (options) => invokeAppChannel('get-customers', options),
  addCustomer: (customer) => invokeAppChannel('add-customer', customer),
  deleteCustomer: (id) => invokeAppChannel('delete-customer', id),
  updateCustomer: (customer) => invokeAppChannel('update-customer', customer),
  getNextCustomerId: () => ipcRenderer.invoke('get-next-customer-id'),
  getNextSupplierId: () => ipcRenderer.invoke('get-next-supplier-id'),
  getCustomersStats: (payload) => invokeAppChannel('get-customers-stats', payload),
  getCustomersDebt: (payload) => invokeAppChannel('get-customers-debt', payload),
  getSuppliersDebt: (payload) => invokeAppChannel('get-suppliers-debt', payload),
  getOpenPositions: (payload) => invokeAppChannel('get-open-positions', payload),
});

// Voucher APIs
contextBridge.exposeInMainWorld('voucher', {
  list: (options) => invokeAppChannel('voucher-list', options),
  get: (id) => invokeAppChannel('voucher-get', id),
  add: (payload) => invokeAppChannel('voucher-add', payload),
  update: (payload) => invokeAppChannel('voucher-update', payload),
  remove: (id) => invokeAppChannel('voucher-remove', id),
  getNextId: (payload) => invokeAppChannel('voucher-next-id', payload),
});

contextBridge.exposeInMainWorld('suppliers', {
  getSuppliers: (options) => invokeAppChannel('get-suppliers', options),
  addSupplier: (supplier) => invokeAppChannel('add-supplier', supplier),
  updateSupplier: (supplier) => invokeAppChannel('update-supplier', supplier),
  deleteSupplier: (id) => invokeAppChannel('delete-supplier', id),
  getSuppliersStats: (payload) => invokeAppChannel('get-suppliers-stats', payload),
});

contextBridge.exposeInMainWorld('api', {
  // Generic invoke and on methods
  invoke: (channel, data) => invokeAppChannel(channel, data),
  on: (channel, callback) => ipcRenderer.on(channel, (event, ...args) => {
    if (channel === 'cloud-data-updated' && !shouldDeliverCloudPayload(args[0])) {
      return;
    }
    callback(...args);
  }),
  // Existing methods
  sendLoginSuccess: () => ipcRenderer.send('login-success'),
  exportDb: () => ipcRenderer.invoke('export-db'),
  importDb: () => ipcRenderer.invoke('import-db'),
  getDbInfo: () => ipcRenderer.invoke('get-db-info'),
  // New selective export/import APIs
  selectExportPath: () => ipcRenderer.invoke('select-export-path'),
  selectImportFile: () => ipcRenderer.invoke('select-import-file'),
  exportTableData: (params) => ipcRenderer.invoke('export-table-data', params),
  importTableData: (params) => ipcRenderer.invoke('import-table-data', params),
  openDocWindow: (payload) => invokeAppChannel('open-doc-window', payload),
  // Open external URL in default browser
  openExternal: (url) => ipcRenderer.invoke('open-external-url', url),
  // Copy image to clipboard (base64 PNG data)
  copyImageToClipboard: (base64Data) => ipcRenderer.invoke('copy-image-to-clipboard', base64Data),
  generateQRCodeDataUrl: (payload) => ipcRenderer.invoke('generate-qrcode-data-url', payload),
  // Database connection APIs
  selectDatabasePath: () => ipcRenderer.invoke('select-database-path'),
  connectToDatabase: (dbPath) => ipcRenderer.invoke('connect-to-database', dbPath),
  getCurrentDbPath: () => ipcRenderer.invoke('get-current-db-path'),
  saveDbPath: (dbPath) => ipcRenderer.invoke('save-db-path', dbPath),
  checkIfCloudStorage: () => ipcRenderer.invoke('check-if-cloud-storage'),
  // Backup APIs
  createManualBackup: () => ipcRenderer.invoke('create-manual-backup'),
  getBackupList: () => ipcRenderer.invoke('get-backup-list'),
  saveBackupSettings: (settings) => ipcRenderer.invoke('save-backup-settings', settings),
  getBackupSettings: () => ipcRenderer.invoke('get-backup-settings'),
  openBackupFolder: () => ipcRenderer.invoke('open-backup-folder'),
  // Company info
  getCompanyInfo: (options) => invokeAppChannel('get-company-info', options),
  saveCompanyInfo: (company) => invokeAppChannel('save-company-info', company),
  pickCompanyLogo: (options) => invokeAppChannel('pick-company-logo', options),
  getInvoiceSettings: (options) => invokeAppChannel('get-invoice-settings', options),
  saveInvoiceSettings: (payload) => invokeAppChannel('save-invoice-settings', payload),
  getCurrencySettings: (options) => invokeAppChannel('get-currency-settings', options),
  saveCurrencySettings: (payload) => invokeAppChannel('save-currency-settings', payload),
  getTaxDeclarationNextNumber: (payload) => invokeAppChannel('tax-declaration-next-number', payload),
  generateTaxDeclarationSummary: (payload) => invokeAppChannel('tax-declaration-generate-summary', payload),
  listTaxDeclarations: (options) => invokeAppChannel('tax-declarations-list', options),
  saveTaxDeclaration: (payload) => invokeAppChannel('tax-declaration-save', payload),
  deleteTaxDeclaration: (id) => invokeAppChannel('tax-declaration-delete', id),
  getMovementEntityName: (payload) => invokeAppChannel('movement-get-entity-name', payload),
  getMovementSalesSummary: (payload) => invokeAppChannel('movement-sales-summary', payload),
  getMovementPurchasesSummary: (payload) => invokeAppChannel('movement-purchases-summary', payload),
  getMovementReceiptsSummary: (payload) => invokeAppChannel('movement-receipts-summary', payload),
  getMovementVouchersSummary: (payload) => invokeAppChannel('movement-vouchers-summary', payload),
  getMovementJournalsSummary: (payload) => invokeAppChannel('movement-journals-summary', payload),
  getMovementDocumentDetails: (payload) => invokeAppChannel('movement-document-details', payload),
  onImportDbReply: (callback) => ipcRenderer.on('import-db-reply', (event, ...args) => callback(...args)),
  onExportDbReply: (callback) => ipcRenderer.on('export-db-reply', (event, ...args) => callback(...args)),
  // List APIs for journal
  listCustomers: (options) => invokeAppChannel('get-customers', options),
  listSuppliers: (options) => invokeAppChannel('get-suppliers', options),
  listAccounts: (options) => invokeAppChannel('get-accounts', options),
  // Account Types APIs
  getAccountTypes: () => ipcRenderer.invoke('get-account-types'),
  addAccountType: (accountType) => ipcRenderer.invoke('add-account-type', accountType),
  updateAccountType: (accountType) => ipcRenderer.invoke('update-account-type', accountType),
  deleteAccountType: (id) => ipcRenderer.invoke('delete-account-type', id),
  // Categories APIs
  getCategories: (options) => ipcRenderer.invoke('get-categories', options),
  addCategory: (category) => ipcRenderer.invoke('add-category', category),
  deleteCategory: (id) => ipcRenderer.invoke('delete-category', id),
  getCustomers: (options) => invokeAppChannel('get-customers', options),
  getSuppliers: (options) => invokeAppChannel('get-suppliers', options),
  // Cloud Database APIs (Turso)
  testCloudDbConnection: (params) => ipcRenderer.invoke('test-cloud-db-connection', params),
  saveCloudDbSettings: (params) => ipcRenderer.invoke('save-cloud-db-settings', params),
  getCloudDbSettings: () => ipcRenderer.invoke('get-cloud-db-settings'),
  getAutoSyncSettings: () => ipcRenderer.invoke('get-auto-sync-settings'),
  getCloudSyncStatus: () => ipcRenderer.invoke('get-cloud-sync-status'),
  getCloudPresenceStatus: (payload) => ipcRenderer.invoke('get-cloud-presence-status', payload),
  syncCloudDb: (params) => ipcRenderer.invoke('sync-cloud-db', params),
  pullFromCloud: () => ipcRenderer.invoke('pull-from-cloud'),
  fullPullFromCloud: () => ipcRenderer.invoke('full-pull-from-cloud'),
  pushToCloud: () => ipcRenderer.invoke('push-to-cloud'),
  clearCloudPresence: () => ipcRenderer.invoke('clear-cloud-presence'),
  startPeriodicSync: (payload) => ipcRenderer.invoke('start-periodic-sync', payload),
  stopPeriodicSync: (payload) => ipcRenderer.invoke('stop-periodic-sync', payload),
  // Cloud Mode Toggle APIs
  setCloudMode: (enabled) => ipcRenderer.invoke('set-cloud-mode', enabled),
  getCloudMode: () => ipcRenderer.invoke('get-cloud-mode'),
  getDeviceId: () => ipcRenderer.invoke('get-device-id'),
  // Notification Settings APIs
  getNotificationSettings: (payload) => ipcRenderer.invoke('get-notification-settings', payload),
  saveNotificationSettings: (payload) => ipcRenderer.invoke('save-notification-settings', payload),
  // Debug Mode APIs
  setDebugBlockLocalDb: (enabled) => ipcRenderer.invoke('setDebugBlockLocalDb', enabled),
  getDebugBlockLocalDb: () => ipcRenderer.invoke('getDebugBlockLocalDb'),
  // Upload to Cloud APIs
  getUploadTableCounts: () => ipcRenderer.invoke('get-upload-table-counts'),
  uploadLocalToCloud: () => ipcRenderer.invoke('upload-local-to-cloud'),
  uploadTableToCloud: (tableName) => ipcRenderer.invoke('upload-table-to-cloud', tableName),
  compareLocalCloudDb: () => ipcRenderer.invoke('compare-local-cloud-db'),
});

// Print/Preview helper
contextBridge.exposeInMainWorld('openPreview', (html) => ipcRenderer.invoke('open-preview-html', html));

// Electron IPC helper for opening windows
contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send: (channel, data) => {
      // Whitelist channels that are allowed
      const validChannels = ['open-statement-window'];
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, attachBranchContext(data));
      }
    }
  }
});

// Settings & MT5 helpers
contextBridge.exposeInMainWorld('sys', {
  getDbStats: () => ipcRenderer.invoke('get-db-stats'),
  getXauUsdPrice: () => ipcRenderer.invoke('get-xau-usd-price'),
  mt5Reconnect: () => ipcRenderer.invoke('mt5-reconnect'),
  listMt5PendingOrders: () => ipcRenderer.invoke('mt5-list-pending-orders'),
  listMt5OpenPositions: () => ipcRenderer.invoke('mt5-list-open-positions'),
});

// Receipt APIs
contextBridge.exposeInMainWorld('receipt', {
  list: (options) => invokeAppChannel('receipt-list', options),
  get: (id) => invokeAppChannel('receipt-get', id),
  add: (payload) => invokeAppChannel('receipt-add', payload),
  update: (payload) => invokeAppChannel('receipt-update', payload),
  remove: (id) => invokeAppChannel('receipt-remove', id),
  getNextId: (payload) => invokeAppChannel('receipt-next-id', payload),
});

// Accounts APIs (Chart of Accounts - Hierarchical)
contextBridge.exposeInMainWorld('accounts', {
  getAccounts: (options) => invokeAppChannel('get-accounts', options),
  getAccountsFlat: (options) => invokeAppChannel('get-accounts-flat', options),
  getAccountChildren: (parentId) => invokeAppChannel('get-account-children', parentId),
  addAccount: (account) => invokeAppChannel('add-account', account),
  updateAccount: (account) => invokeAppChannel('update-account', account),
  deleteAccount: (id) => invokeAppChannel('delete-account', id),
  getAccountsStats: (payload) => invokeAppChannel('get-accounts-stats', payload),
  getNextAccountId: () => ipcRenderer.invoke('get-next-account-id'),
  getNextAccountCode: (parentCode) => invokeAppChannel('get-next-account-code', parentCode),
  getAccountByCode: (code) => invokeAppChannel('get-account-by-code', code),
  getCashBoxesBalance: () => ipcRenderer.invoke('get-cash-boxes-balance'),
  // Default Boxes APIs
  getDefaultBoxes: (options) => invokeAppChannel('get-default-boxes', options),
  setDefaultBox: (boxTypeOrPayload, accountId, branchId) => {
    if (boxTypeOrPayload && typeof boxTypeOrPayload === 'object') {
      return invokeAppChannel('set-default-box', boxTypeOrPayload);
    }
    return invokeAppChannel('set-default-box', { boxType: boxTypeOrPayload, accountId, branchId });
  },
});

// Opening Balances APIs
contextBridge.exposeInMainWorld('opening', {
  list: (options) => invokeAppChannel('opening-list', options),
  get: (id) => invokeAppChannel('opening-get', id),
  add: (payload) => invokeAppChannel('opening-add', payload),
  update: (payload) => invokeAppChannel('opening-update', payload),
  remove: (id) => invokeAppChannel('opening-remove', id),
  getNextId: (payload) => invokeAppChannel('opening-next-id', payload),
});

// Users APIs - تمت الإضافة لواجهات برمجية إدارة المستخدمين
contextBridge.exposeInMainWorld('users', {
  getUsers: (viewerUserId) => ipcRenderer.invoke('get-users', viewerUserId),
  addUser: (user) => ipcRenderer.invoke('add-user', user),
  updateUser: (user) => ipcRenderer.invoke('update-user', user),
  deleteUser: (id) => ipcRenderer.invoke('delete-user', id),
  getUserBranches: (userId) => ipcRenderer.invoke('get-user-branches', userId),
  setUserBranches: (payload) => ipcRenderer.invoke('set-user-branches', payload),
  authenticateUser: (credentials) => ipcRenderer.invoke('authenticate-user', credentials),
  getPasswordHint: (username) => ipcRenderer.invoke('get-password-hint', username),
  verifyUserPassword: (userId, password) => ipcRenderer.invoke('verify-user-password', { userId, password }),
});

contextBridge.exposeInMainWorld('branches', {
  getBranches: (options) => ipcRenderer.invoke('get-branches', options),
  addBranch: (branch) => ipcRenderer.invoke('add-branch', branch),
  updateBranch: (branch) => ipcRenderer.invoke('update-branch', branch),
  deleteBranch: (id) => ipcRenderer.invoke('delete-branch', id),
  setCurrentBranchSession: (branchId) => ipcRenderer.invoke('set-current-branch-session', { branchId }),
});

// Permissions APIs - واجهات برمجية لإدارة الصلاحيات
contextBridge.exposeInMainWorld('permissions', {
  getPermissions: () => ipcRenderer.invoke('get-permissions'),
  getPermissionsByCategory: () => ipcRenderer.invoke('get-permissions-by-category'),
  getUserPermissions: (userId) => ipcRenderer.invoke('get-user-permissions', userId),
  checkUserPermission: (userId, permissionName) => ipcRenderer.invoke('check-user-permission', userId, permissionName),
  setUserPermissions: (userId, permissionIds) => ipcRenderer.invoke('set-user-permissions', userId, permissionIds),
  grantPermission: (userId, permissionId) => ipcRenderer.invoke('grant-user-permission', userId, permissionId),
  revokePermission: (userId, permissionId) => ipcRenderer.invoke('revoke-user-permission', userId, permissionId),
  createPermission: (permData) => ipcRenderer.invoke('create-permission', permData),
  removeDuplicatePermissions: () => ipcRenderer.invoke('remove-duplicate-permissions'),
});

contextBridge.exposeInMainWorld('messaging', {
  listContacts: (payload) => ipcRenderer.invoke('messaging-list-contacts', payload),
  getThread: (payload) => ipcRenderer.invoke('messaging-get-thread', payload),
  sendMessage: (payload) => ipcRenderer.invoke('messaging-send', payload),
  markRead: (payload) => ipcRenderer.invoke('messaging-mark-read', payload),
});

// Journal Entries APIs - واجهات برمجية للقيود اليومية
contextBridge.exposeInMainWorld('journal', {
  listJournalEntries: (options) => invokeAppChannel('list-journal-entries', options),
  listAllJournalEntries: (options) => invokeAppChannel('list-all-journal-entries', options),
  getJournalEntry: (id) => invokeAppChannel('get-journal-entry', id),
  addJournalEntry: (data) => invokeAppChannel('add-journal-entry', data),
  updateJournalEntry: (data) => invokeAppChannel('update-journal-entry', data),
  deleteJournalEntry: (id) => invokeAppChannel('delete-journal-entry', id),
  getNextId: (payload) => invokeAppChannel('get-next-journal-id', payload),
  getAutoJournal: (sourceType, sourceId) => ipcRenderer.invoke('get-auto-journal', sourceType, attachBranchContext(sourceId)),
});

// Sales Invoice APIs - واجهات برمجية لفواتير البيع
contextBridge.exposeInMainWorld('salesInvoice', {
  list: (options) => invokeAppChannel('sales-invoice-list', options),
  get: (id) => invokeAppChannel('sales-invoice-get', id),
  add: (payload) => invokeAppChannel('sales-invoice-add', payload),
  update: (payload) => invokeAppChannel('sales-invoice-update', payload),
  remove: (id) => invokeAppChannel('sales-invoice-remove', id),
  getNextId: (payload) => invokeAppChannel('sales-invoice-next-id', payload),
  checkRef: (ref_no, exclude_id) => invokeAppChannel('sales-invoice-check-ref', { ref_no, exclude_id }),
});

// Purchase Invoice APIs - واجهات برمجية لفواتير الشراء
contextBridge.exposeInMainWorld('purchaseInvoice', {
  list: (options) => invokeAppChannel('purchase-invoice-list', options),
  get: (id) => invokeAppChannel('purchase-invoice-get', id),
  add: (payload) => invokeAppChannel('purchase-invoice-add', payload),
  update: (payload) => invokeAppChannel('purchase-invoice-update', payload),
  remove: (id) => invokeAppChannel('purchase-invoice-remove', id),
  getNextId: (payload) => invokeAppChannel('purchase-invoice-next-id', payload),
  checkRef: (ref_no, exclude_id) => invokeAppChannel('purchase-invoice-check-ref', { ref_no, exclude_id }),
});

// Orders APIs - واجهات برمجية للأوردرات
contextBridge.exposeInMainWorld('orders', {
  list: (options) => invokeAppChannel('orders-list', options),
  get: (id) => invokeAppChannel('orders-get', id),
  add: (payload) => invokeAppChannel('orders-add', payload),
  update: (payload) => invokeAppChannel('orders-update', payload),
  remove: (id) => invokeAppChannel('orders-delete', id),
  updateStatus: (payload) => invokeAppChannel('orders-update-status', payload),
  completeLocal: (payload) => invokeAppChannel('orders-complete-local', payload),
  processLocalPending: (payload) => invokeAppChannel('orders-process-local-pending', payload),
  executeMt5: (payload) => invokeAppChannel('orders-execute-mt5', payload),
});

// Sales & Purchase Movement APIs - واجهات برمجية لحركة المبيعات والمشتريات
contextBridge.exposeInMainWorld('salesPurchaseMovement', {
  list: (payload) => invokeAppChannel('sales-purchase-movement-list', payload),
});

// License APIs - واجهات برمجية للتراخيص
contextBridge.exposeInMainWorld('license', {
  getAppLogo: () => ipcRenderer.invoke('get-app-logo'),
  getMachineId: () => ipcRenderer.invoke('license-get-machine-id'),
  checkStatus: () => ipcRenderer.invoke('license-check-status'),
  activate: (code) => ipcRenderer.invoke('license-activate', code),
  proceed: () => ipcRenderer.send('license-proceed'),
  generateCode: (machineId, type) => ipcRenderer.invoke('generate-license-code', machineId, type),
  verifyDevPassword: (password) => ipcRenderer.invoke('verify-dev-password', password),
  getLicenseHistory: () => ipcRenderer.invoke('get-license-history'),
  saveLicenseToHistory: (licenseData) => ipcRenderer.invoke('save-license-to-history', licenseData),
});

// Gold Items APIs - واجهات برمجية لأصناف المشغولات
contextBridge.exposeInMainWorld('goldItems', {
  list: () => ipcRenderer.invoke('get-gold-items'),
  save: (item) => ipcRenderer.invoke('save-gold-item', item),
  remove: (id) => ipcRenderer.invoke('delete-gold-item', id),
  getNextId: () => ipcRenderer.invoke('gold-item-next-id'),
});

// Gold Karats APIs - واجهات برمجية للعيارات والنقاوة
contextBridge.exposeInMainWorld('goldKarats', {
  list: () => ipcRenderer.invoke('get-gold-karats'),
  getPurity: (karat, section) => ipcRenderer.invoke('get-karat-purity', { karat, section }),
  updatePurity: (karat, section, purity) => ipcRenderer.invoke('update-karat-purity', { karat, section, purity }),
});

contextBridge.exposeInMainWorld('assistant', {
  getProviderSettings: () => ipcRenderer.invoke('assistant-get-provider-settings'),
  saveProviderSettings: (settings) => ipcRenderer.invoke('assistant-save-provider-settings', settings),
  testProvider: (settings) => ipcRenderer.invoke('assistant-test-provider', settings),
  chat: (payload) => ipcRenderer.invoke('assistant-chat', payload),
});

// Database Error Recovery APIs - واجهات برمجية لاستعادة قاعدة البيانات
contextBridge.exposeInMainWorld('dbRecovery', {
  createNew: () => ipcRenderer.invoke('db:create-new'),
  listBackups: () => ipcRenderer.invoke('db:list-backups'),
  restoreBackup: (backupPath) => ipcRenderer.invoke('db:restore-backup', backupPath),
  retry: () => ipcRenderer.invoke('db:retry'),
  connect: (dbPath) => ipcRenderer.invoke('db:connect', dbPath),
  browse: () => ipcRenderer.invoke('db:browse'),
});

// WhatsApp Reports APIs
contextBridge.exposeInMainWorld('waReports', {
  getSettings: () => ipcRenderer.invoke('wa:get-settings'),
  saveSettings: (payload) => ipcRenderer.invoke('wa:save-settings', payload),
  getStatus: () => ipcRenderer.invoke('wa:get-status'),
  startConnection: () => ipcRenderer.invoke('wa:start-connection'),
  disconnect: () => ipcRenderer.invoke('wa:disconnect'),
  sendStatements: (payload) => ipcRenderer.invoke('wa:send-statements', payload),
});

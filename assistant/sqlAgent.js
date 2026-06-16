const { normalizeArabic, containsAny } = require('./intentClassifier');
const { hasColumn, loadSchema } = require('./schemaLoader');
const { buildFocusEntityState, buildTopicContextState, normalizeConversationState } = require('./conversationUtils');
const { normalizeQueryPlan, buildToolRequestsFromActions, normalizeDocumentType } = require('./assistantContracts');

const COUNT_QUERIES = [
  { table: 'customers', label: 'العملاء', keywords: ['العملاء', 'عميل', 'العميل', 'عملاء'] },
  { table: 'suppliers', label: 'الموردين', keywords: ['الموردين', 'الموردون', 'مورد', 'المورد'] },
  { table: 'accounts', label: 'الحسابات', keywords: ['الحسابات', 'الحساب', 'دليل الحسابات'] },
  { table: 'users', label: 'المستخدمين', keywords: ['المستخدمين', 'المستخدمون', 'مستخدم', 'المستخدم'] },
  { table: 'sales_invoices', label: 'فواتير البيع', keywords: ['فواتير البيع', 'فاتورة بيع', 'فواتير المبيعات', 'مبيعات'] },
  { table: 'purchase_invoices', label: 'فواتير الشراء', keywords: ['فواتير الشراء', 'فاتورة شراء', 'مشتريات'] },
  { table: 'receipts', label: 'سندات القبض', keywords: ['سندات القبض', 'سند قبض', 'القبض'] },
  { table: 'vouchers', label: 'سندات الصرف', keywords: ['سندات الصرف', 'سند صرف', 'الصرف'] },
  { table: 'orders', label: 'الطلبات', keywords: ['الطلبات', 'طلبات', 'اوردرات', 'الأوردرات'] },
  { table: 'journal_entries', label: 'قيود اليومية', keywords: ['القيود', 'قيود اليومية', 'اليومية'] },
];

const GROUP_COUNT_QUERIES = [
  {
    label: 'الفواتير',
    keywords: ['الفواتير', 'فواتير', 'كل الفواتير'],
    tables: [
      { table: 'sales_invoices', label: 'فواتير البيع' },
      { table: 'purchase_invoices', label: 'فواتير الشراء' },
    ],
  },
  {
    label: 'السندات',
    keywords: ['السندات', 'سندات', 'كل السندات'],
    tables: [
      { table: 'receipts', label: 'سندات القبض' },
      { table: 'vouchers', label: 'سندات الصرف' },
    ],
  },
  {
    label: 'المستندات',
    keywords: ['المستندات', 'العمليات', 'الوثائق'],
    tables: [
      { table: 'sales_invoices', label: 'فواتير البيع' },
      { table: 'purchase_invoices', label: 'فواتير الشراء' },
      { table: 'receipts', label: 'سندات القبض' },
      { table: 'vouchers', label: 'سندات الصرف' },
      { table: 'orders', label: 'الطلبات' },
    ],
  },
];

const ENTITY_DEFINITIONS = [
  {
    kind: 'customer',
    table: 'customers',
    label: 'العميل',
    pluralLabel: 'العملاء',
    keywords: ['عميل', 'العميل', 'العملاء', 'عملاء', 'زبون', 'الزبون'],
    lookupColumns: ['id', 'name', 'phone', 'tax_no'],
    preferredColumns: ['id', 'name', 'phone', 'tax_no', 'region', 'email', 'account_id', 'branch_id', 'access_scope'],
  },
  {
    kind: 'supplier',
    table: 'suppliers',
    label: 'المورد',
    pluralLabel: 'الموردين',
    keywords: ['مورد', 'المورد', 'الموردين', 'موردين', 'الموردون'],
    lookupColumns: ['id', 'name', 'phone', 'tax_no'],
    preferredColumns: ['id', 'name', 'phone', 'tax_no', 'region', 'account_id', 'branch_id', 'access_scope'],
  },
  {
    kind: 'account',
    table: 'accounts',
    label: 'الحساب',
    pluralLabel: 'الحسابات',
    keywords: ['حساب', 'الحساب', 'الحسابات', 'دليل الحسابات'],
    lookupColumns: ['id', 'code', 'account_number', 'name', 'name_en'],
    preferredColumns: ['id', 'code', 'account_number', 'name', 'name_en', 'parent_id', 'account_type', 'nature', 'is_parent', 'branch_id', 'is_system'],
  },
  {
    kind: 'user',
    table: 'users',
    label: 'المستخدم',
    pluralLabel: 'المستخدمين',
    keywords: ['مستخدم', 'المستخدم', 'المستخدمين', 'يوزر', 'users', 'user'],
    lookupColumns: ['id', 'username', 'full_name', 'full_name_en', 'name'],
    preferredColumns: ['id', 'username', 'full_name', 'full_name_en', 'name', 'branch_id'],
  },
];

const DOCUMENT_DEFINITIONS = [
  {
    table: 'sales_invoices',
    label: 'فاتورة البيع',
    pluralLabel: 'فواتير البيع',
    keywords: ['فاتورة بيع', 'فواتير البيع', 'المبيعات'],
    entityTable: 'customers',
    relationColumns: ['customer_id'],
    dateColumns: ['date', 'created_at'],
    numberColumns: ['branch_local_number', 'id', 'ref_no'],
    amountColumns: ['total', 'net_total', 'amount'],
    preferredColumns: ['id', 'branch_local_number', 'date', 'ref_no', 'customer_id', 'customer_name', 'branch_id'],
  },
  {
    table: 'purchase_invoices',
    label: 'فاتورة الشراء',
    pluralLabel: 'فواتير الشراء',
    keywords: ['فاتورة شراء', 'فواتير الشراء', 'المشتريات'],
    entityTable: 'suppliers',
    relationColumns: ['supplier_id'],
    dateColumns: ['date', 'created_at'],
    numberColumns: ['branch_local_number', 'id', 'ref_no'],
    amountColumns: ['total', 'net_total', 'amount'],
    preferredColumns: ['id', 'branch_local_number', 'date', 'ref_no', 'supplier_id', 'customer_name', 'branch_id'],
  },
  {
    table: 'orders',
    label: 'الطلب',
    pluralLabel: 'الطلبات',
    keywords: ['طلب', 'الطلب', 'طلبات', 'الطلبات', 'اوردر', 'أوردر'],
    entityTable: 'customers',
    relationColumns: ['customer_id'],
    dateColumns: ['created_date', 'execution_date', 'completion_date', 'created_at'],
    numberColumns: ['branch_local_number', 'id'],
    amountColumns: ['weight', 'ounce', 'price_per_gram'],
    preferredColumns: ['id', 'branch_local_number', 'created_date', 'execution_date', 'customer_id', 'customer_name', 'branch_id'],
  },
  {
    table: 'receipts',
    label: 'سند القبض',
    pluralLabel: 'سندات القبض',
    keywords: ['سند قبض', 'سندات القبض', 'القبض'],
    entityTable: 'customers',
    relationColumns: ['customer_id'],
    dateColumns: ['date', 'created_at'],
    numberColumns: ['branch_local_number', 'id'],
    amountColumns: ['amount', 'total'],
    preferredColumns: ['id', 'branch_local_number', 'date', 'customer_id', 'branch_id'],
  },
  {
    table: 'vouchers',
    label: 'سند الصرف',
    pluralLabel: 'سندات الصرف',
    keywords: ['سند صرف', 'سندات الصرف', 'الصرف'],
    entityTable: 'suppliers',
    relationColumns: ['supplier_id'],
    dateColumns: ['date', 'created_at'],
    numberColumns: ['branch_local_number', 'id'],
    amountColumns: ['amount', 'total'],
    preferredColumns: ['id', 'branch_local_number', 'date', 'supplier_id', 'branch_id'],
  },
];

const DOCUMENT_TYPE_BY_TABLE = {
  sales_invoices: 'sales_invoice',
  purchase_invoices: 'purchase_invoice',
  orders: 'order',
  receipts: 'receipt',
  vouchers: 'voucher',
};

const BALANCE_COLUMN_GROUPS = {
  balance: ['balance', 'cash_balance'],
  debit: ['debit', 'cash_debit'],
  credit: ['credit', 'cash_credit'],
  goldBalance: ['gold_balance'],
  goldDebit: ['gold_debit'],
  goldCredit: ['gold_credit'],
};

const JOURNAL_BALANCE_ENTITY_FIELDS = {
  customers: 'customer_id',
  suppliers: 'supplier_id',
  accounts: 'account_id',
};

const ENTITY_LOOKUP_STOP_WORDS = new Set([
  'عن', 'من', 'الى', 'إلى', 'على', 'في', 'هل', 'كم', 'عدد', 'اجمالي', 'إجمالي', 'مجموع',
  'رصيد', 'ارصده', 'أرصدة', 'كشف', 'حساب', 'اخر', 'آخر', 'احدث', 'أحدث', 'متى', 'تاريخ', 'رقم', 'رقمه',
  'اسم', 'الاسم', 'هذا', 'هذه', 'ذلك', 'تبع', 'تابع', 'خاص', 'ب', 'ال',
]);

const DEBTOR_BALANCE_WORDS = ['مدين', 'المدين', 'مدينين', 'المدينين', 'مدينون', 'المدينون'];
const CREDITOR_BALANCE_WORDS = ['دائن', 'الدائن', 'دائنين', 'الدائنين', 'دائنون', 'الدائنون', 'داين', 'الداين', 'داينين', 'الداينين', 'داينون', 'الداينون'];
const ACCOUNT_GROUP_HINT_WORDS = ['ارصده', 'أرصدة', 'رصيد', 'التابعه', 'التابعة', 'تابعه', 'تابعة', 'فرعيه', 'فرعية', 'الفرعيه', 'الفرعية', 'الحسابات التابعة', 'الحسابات التابعه', 'تابعين', 'التابعين', 'ابناء', 'أبناء', 'الابناء', 'الأبناء'];
const BALANCE_INTENT_WORDS = ['رصيد', 'ارصده', 'أرصدة', 'مدين', 'دائن', 'له', 'لها', 'عليه', 'عليها', 'كشف حساب'];
const BRANCH_SCOPE_ALL_WORDS = ['كل الفروع', 'جميع الفروع', 'all branches', 'كلها'];
const BRANCH_SCOPE_EXPANSION_WORDS = ['اكثر من فرع', 'أكثر من فرع', 'عدة فروع', 'وسعها', 'وسع', 'وسعه', 'وسع النطاق', 'وسّعها', 'وسّع'];
const BRANCH_SCOPE_CONFIRM_WORDS = ['نعم', 'ايوه', 'أيوه', 'اي', 'أجل', 'اكمل', 'أكمل', 'كمل', 'كمّل'];

const BOX_TYPE_LABELS = {
  cash: 'صندوق النقد',
  gold: 'صندوق الذهب',
  worked_gold: 'صندوق المشغول',
  silver: 'صندوق الفضة',
  diamond: 'صندوق الألماس',
};

const BOX_TYPE_PARENT_CODES = {
  cash: '111',
  gold: '1121',
  worked_gold: '1122',
  silver: '1123',
  diamond: '1124',
};

const BOX_TYPE_FALLBACK_CODES = {
  cash: '1111',
  gold: '11211',
  worked_gold: '11221',
  silver: '11231',
  diamond: '11241',
};

function quoteIdentifier(name = '') {
  return `"${String(name || '').replace(/"/g, '""')}"`;
}

function formatGroupedBreakdown(parts = []) {
  return (parts || [])
    .map((item) => `${item.label}: ${Number(item.total || 0)}`)
    .join('، ');
}

function extractFirstNumber(text = '') {
  const match = String(text || '').match(/\d+/);
  return match ? Number(match[0]) : null;
}

function normalizePositiveId(value = null, fallback = null) {
  const numericValue = Number(value || 0);
  if (Number.isFinite(numericValue) && numericValue > 0) {
    return numericValue;
  }
  const fallbackValue = Number(fallback || 0);
  return Number.isFinite(fallbackValue) && fallbackValue > 0 ? fallbackValue : null;
}

function normalizeBranchIdList(values = []) {
  if (!Array.isArray(values)) {
    return [];
  }
  return Array.from(new Set(values
    .map((value) => normalizePositiveId(value, null))
    .filter((value) => Number.isFinite(value) && value > 0)));
}

function resolveEntityDefinition(normalizedText = '') {
  return ENTITY_DEFINITIONS.find((item) => containsAny(normalizedText, item.keywords.map((keyword) => normalizeArabic(keyword)))) || null;
}

function resolveDocumentDefinition(normalizedText = '') {
  return DOCUMENT_DEFINITIONS.find((item) => containsAny(normalizedText, item.keywords.map((keyword) => normalizeArabic(keyword)))) || null;
}

function runScalarCount(db, tableName, schema = null, options = {}) {
  const branchFilter = schema ? buildTableBranchWhereClause(schema, tableName, 't', options.branchIds, options.mainBranchId) : null;
  const whereSql = branchFilter ? ` WHERE ${branchFilter.sql}` : '';
  const params = branchFilter ? branchFilter.params : [];
  const row = db.prepare(`SELECT COUNT(*) AS total FROM ${quoteIdentifier(tableName)} t${whereSql}`).get(...params);
  return Number(row?.total || 0);
}

function runGroupedCount(db, schema, items = [], options = {}) {
  const parts = items
    .filter((item) => hasTable(schema, item.table))
    .map((item) => ({
      table: item.table,
      label: item.label,
      total: runScalarCount(db, item.table, schema, options),
    }));

  return {
    total: parts.reduce((sum, item) => sum + Number(item.total || 0), 0),
    parts,
  };
}

function getAssistantBranchContext(context = {}) {
  const currentUser = context?.currentUser || {};
  const currentBranch = context?.currentBranch || {};
  const branchScope = context?.branchScope || {};
  const allowedBranchIds = normalizeBranchIdList(
    Array.isArray(branchScope?.allowedBranchIds)
      ? branchScope.allowedBranchIds
      : (Array.isArray(currentUser?.allowed_branch_ids) ? currentUser.allowed_branch_ids : [])
  );
  const branchId = normalizePositiveId(
    branchScope?.branchId || branchScope?.branch_id || currentBranch?.id || currentUser?.branch_id || currentUser?.default_branch_id,
    allowedBranchIds[0] || 1
  ) || 1;
  return {
    mode: String(branchScope?.mode || branchScope?.scope || '').trim().toLowerCase() === 'all' && allowedBranchIds.length > 1 ? 'all' : 'branch',
    branchId,
    allowedBranchIds,
    currentBranchCode: String(currentBranch?.code || '').trim(),
    currentBranchName: String(currentBranch?.name || '').trim(),
    mainBranchId: branchId,
  };
}

function getBranchLabel(branchContext = {}) {
  const parts = [];
  const primaryBranchName = String(branchContext.requestedBranchName || branchContext.currentBranchName || '').trim();
  const primaryBranchCode = String(branchContext.requestedBranchCode || branchContext.currentBranchCode || '').trim();
  const primaryBranchId = normalizePositiveId(branchContext.requestedBranchId, branchContext.branchId);
  if (primaryBranchName) {
    parts.push(primaryBranchName);
  }
  if (primaryBranchCode) {
    parts.push(`(${primaryBranchCode})`);
  }
  if (!parts.length && primaryBranchId) {
    parts.push(`رقم ${primaryBranchId}`);
  }
  return parts.join(' ').trim();
}

function getAccessibleBranchRows(db, schema, branchContext = {}) {
  const branchIds = getAuthorizedBranchIds(branchContext);
  if (!db || !branchIds.length || !hasTable(schema, 'branches') || !hasColumn(schema, 'branches', 'id')) {
    return [];
  }
  const selectedColumns = getExistingColumns(schema, 'branches', ['id', 'code', 'name', 'name_en']);
  const selectSql = (selectedColumns.length ? selectedColumns : ['id'])
    .map((columnName) => quoteIdentifier(columnName))
    .join(', ');
  const placeholders = branchIds.map(() => '?').join(', ');
  const rows = db.prepare(`SELECT ${selectSql} FROM ${quoteIdentifier('branches')} WHERE ${quoteIdentifier('id')} IN (${placeholders})`).all(...branchIds) || [];
  const rowById = new Map(rows.map((row) => [Number(row?.id || 0), row]));
  return branchIds.map((branchId) => rowById.get(branchId)).filter(Boolean);
}

function getAllBranchRows(db, schema) {
  if (!db || !hasTable(schema, 'branches') || !hasColumn(schema, 'branches', 'id')) {
    return [];
  }
  const selectedColumns = getExistingColumns(schema, 'branches', ['id', 'code', 'name', 'name_en']);
  const selectSql = (selectedColumns.length ? selectedColumns : ['id'])
    .map((columnName) => quoteIdentifier(columnName))
    .join(', ');
  return db.prepare(`SELECT ${selectSql} FROM ${quoteIdentifier('branches')} ORDER BY ${quoteIdentifier('id')} ASC`).all() || [];
}

function getAuthorizedBranchIds(branchContext = {}) {
  const allowedBranchIds = normalizeBranchIdList(branchContext.allowedBranchIds);
  if (allowedBranchIds.length) {
    return allowedBranchIds;
  }
  return normalizeBranchIdList([branchContext.branchId || branchContext.mainBranchId]);
}

function isBranchAuthorizedForContext(branchId = null, branchContext = {}) {
  const safeBranchId = normalizePositiveId(branchId, null);
  if (!safeBranchId) {
    return false;
  }
  return getAuthorizedBranchIds(branchContext).includes(safeBranchId);
}

function getBranchMatchTerms(row = {}) {
  const values = [row?.name, row?.name_en, row?.code]
    .map((value) => normalizeArabic(String(value || '').trim()))
    .filter(Boolean);
  return Array.from(new Set(values.flatMap((value) => [`فرع ${value}`, `${value} فقط`, `فرع ${value} فقط`, `branch ${value}`, `${value} only`, `branch ${value} only`])));
}

function findExplicitRequestedBranch(normalizedText = '', branchRows = []) {
  const safeText = String(normalizedText || '').trim();
  if (!safeText || !containsAny(safeText, ['فرع', 'الفروع', 'branch', 'فقط', 'only'])) {
    return null;
  }
  let bestMatch = null;
  (branchRows || []).forEach((row) => {
    getBranchMatchTerms(row).forEach((term) => {
      if (!term || !safeText.includes(term)) {
        return;
      }
      if (!bestMatch || term.length > bestMatch.term.length) {
        bestMatch = { row, term };
      }
    });
  });
  return bestMatch?.row || null;
}

function getRequestedBranchTermTokens(branchQueryContext = {}) {
  return [
    branchQueryContext.requestedBranchName,
    branchQueryContext.requestedBranchCode,
    branchQueryContext.unauthorizedRequestedBranchName,
    branchQueryContext.unauthorizedRequestedBranchCode,
  ]
    .map((value) => normalizeArabic(String(value || '').trim()))
    .filter(Boolean)
    .map((value) => value.split(/\s+/).filter(Boolean))
    .filter((tokens) => tokens.length);
}

function normalizeBranchFilterComparableToken(token = '') {
  return normalizeArabic(token).replace(/^و/, '').replace(/^ب/, '');
}

function stripExplicitBranchFilterText(rawText = '', branchQueryContext = {}) {
  const safeText = String(rawText || '').trim();
  if (!safeText || !branchQueryContext?.hasExplicitBranchFilter) {
    return safeText;
  }
  const rawTokens = safeText.split(/\s+/).filter(Boolean);
  if (!rawTokens.length) {
    return safeText;
  }
  const comparableTokens = rawTokens.map((token) => normalizeBranchFilterComparableToken(token));
  const branchTermTokens = getRequestedBranchTermTokens(branchQueryContext);
  const candidatePatterns = branchTermTokens.flatMap((termTokens) => ([
    ['فرع', ...termTokens, 'فقط'],
    ['فرع', ...termTokens],
    [...termTokens, 'فقط'],
    ['branch', ...termTokens, 'only'],
    ['branch', ...termTokens],
    [...termTokens, 'only'],
  ].map((pattern) => pattern.map((token) => normalizeBranchFilterComparableToken(token)))));
  let bestMatch = null;
  candidatePatterns.forEach((patternTokens) => {
    if (!patternTokens.length || patternTokens.length > comparableTokens.length) {
      return;
    }
    for (let startIndex = 0; startIndex <= comparableTokens.length - patternTokens.length; startIndex += 1) {
      const matched = patternTokens.every((token, offset) => comparableTokens[startIndex + offset] === token);
      if (!matched) {
        continue;
      }
      if (!bestMatch
        || patternTokens.length > bestMatch.length
        || (patternTokens.length === bestMatch.length && startIndex > bestMatch.startIndex)) {
        bestMatch = { startIndex, length: patternTokens.length };
      }
    }
  });
  if (!bestMatch) {
    return safeText;
  }
  return rawTokens.filter((token, index) => index < bestMatch.startIndex || index >= (bestMatch.startIndex + bestMatch.length)).join(' ').trim();
}

function hasExplicitAllBranchesRequest(normalizedText = '') {
  return containsAny(normalizedText, [...BRANCH_SCOPE_ALL_WORDS, ...BRANCH_SCOPE_EXPANSION_WORDS]);
}

function getEffectiveBranchQueryContext(normalizedText = '', context = {}) {
  const baseContext = getAssistantBranchContext(context);
  const db = context?.db || null;
  const schema = context?.schema || (db ? loadSchema(db) : null);
  const explicitRequestedBranch = db && schema
    ? findExplicitRequestedBranch(normalizedText, getAllBranchRows(db, schema))
    : null;
  const explicitRequestedBranchId = normalizePositiveId(explicitRequestedBranch?.id, null);
  const requestedBranchAuthorized = explicitRequestedBranchId ? isBranchAuthorizedForContext(explicitRequestedBranchId, baseContext) : false;
  const requestedBranchId = requestedBranchAuthorized ? explicitRequestedBranchId : null;
  const unauthorizedRequestedBranchId = requestedBranchAuthorized ? null : explicitRequestedBranchId;
  const forcedAll = String(context?.assistantBranchOverride || '').trim().toLowerCase() === 'all';
  const explicitAllRequested = !requestedBranchId && baseContext.allowedBranchIds.length > 1 && hasExplicitAllBranchesRequest(normalizedText);
  const isAllBranches = !requestedBranchId && baseContext.allowedBranchIds.length > 1 && (forcedAll || baseContext.mode === 'all' || explicitAllRequested);
  const branchIds = requestedBranchId
    ? normalizeBranchIdList([requestedBranchId])
    : (isAllBranches
      ? normalizeBranchIdList(baseContext.allowedBranchIds)
      : normalizeBranchIdList([baseContext.branchId]));
  return {
    ...baseContext,
    mainBranchId: requestedBranchId || baseContext.mainBranchId,
    isAllBranches,
    branchIds: branchIds.length ? branchIds : [baseContext.mainBranchId],
    explicitAllRequested,
    canPromptExpansion: baseContext.allowedBranchIds.length > 1 && !isAllBranches && !requestedBranchId && !unauthorizedRequestedBranchId,
    hasExplicitBranchFilter: !!requestedBranchId,
    requestedBranchId,
    requestedBranchCode: requestedBranchAuthorized ? String(explicitRequestedBranch?.code || '').trim() : '',
    requestedBranchName: requestedBranchAuthorized ? String(explicitRequestedBranch?.name || explicitRequestedBranch?.name_en || '').trim() : '',
    hasUnauthorizedRequestedBranch: !!unauthorizedRequestedBranchId,
    unauthorizedRequestedBranchId,
    unauthorizedRequestedBranchCode: unauthorizedRequestedBranchId ? String(explicitRequestedBranch?.code || '').trim() : '',
    unauthorizedRequestedBranchName: unauthorizedRequestedBranchId ? String(explicitRequestedBranch?.name || explicitRequestedBranch?.name_en || '').trim() : '',
  };
}

function getBranchQueryOptions(branchQueryContext = {}) {
  return {
    branchIds: normalizeBranchIdList(branchQueryContext.branchIds),
    mainBranchId: normalizePositiveId(branchQueryContext.mainBranchId, branchQueryContext.branchId) || 1,
  };
}

function getLatestUserMessageText(history = []) {
  if (!Array.isArray(history)) {
    return '';
  }
  for (let index = history.length - 1; index >= 0; index -= 1) {
    const turn = history[index];
    if (!turn || turn.role !== 'user') {
      continue;
    }
    const text = String(turn.text || turn.content || '').trim();
    if (text) {
      return text;
    }
  }
  return '';
}

function getPreviousUserMessageText(history = [], currentMessage = '') {
  if (!Array.isArray(history)) {
    return '';
  }
  const normalizedCurrentMessage = normalizeArabic(currentMessage);
  let skippedCurrent = false;
  for (let index = history.length - 1; index >= 0; index -= 1) {
    const turn = history[index];
    if (!turn || turn.role !== 'user') {
      continue;
    }
    const text = String(turn.text || turn.content || '').trim();
    if (!text) {
      continue;
    }
    if (!skippedCurrent && normalizeArabic(text) === normalizedCurrentMessage) {
      skippedCurrent = true;
      continue;
    }
    return text;
  }
  return '';
}

function getConversationHistory(context = {}) {
  if (Array.isArray(context?.history)) {
    return context.history;
  }
  if (Array.isArray(context?.messages)) {
    return context.messages;
  }
  if (Array.isArray(context?.conversationHistory)) {
    return context.conversationHistory;
  }
  return [];
}

function isBranchScopeExpansionFollowUp(normalizedText = '', context = {}, branchContext = null) {
  const conversationState = normalizeConversationState(context.conversationState || {});
  const topicContext = conversationState?.topicContext || {};
  const effectiveBranchContext = branchContext || getAssistantBranchContext(context);
  if (conversationState?.lastRoute !== 'database') {
    return false;
  }
  if (String(topicContext?.kind || '').trim() !== 'branch_scope_prompt') {
    return false;
  }
  if (effectiveBranchContext.allowedBranchIds.length <= 1) {
    return false;
  }
  return containsAny(normalizedText, [...BRANCH_SCOPE_CONFIRM_WORDS, ...BRANCH_SCOPE_ALL_WORDS, ...BRANCH_SCOPE_EXPANSION_WORDS]);
}

function buildCoalescedBranchWhereClause(columnExpression, branchIds = [], mainBranchId = null) {
  const fallbackBranchId = normalizePositiveId(mainBranchId, 1) || 1;
  const effectiveBranchIds = normalizeBranchIdList(branchIds).length ? normalizeBranchIdList(branchIds) : [fallbackBranchId];
  const placeholders = effectiveBranchIds.map(() => '?').join(', ');
  return {
    sql: `COALESCE(${columnExpression}, ?) IN (${placeholders})`,
    params: [fallbackBranchId, ...effectiveBranchIds],
  };
}

function buildSystemOrBranchWhereClause(alias, branchIds = [], mainBranchId = null) {
  const safeAlias = String(alias || '').trim();
  const fallbackBranchId = normalizePositiveId(mainBranchId, 1) || 1;
  const effectiveBranchIds = normalizeBranchIdList(branchIds).length ? normalizeBranchIdList(branchIds) : [fallbackBranchId];
  const placeholders = effectiveBranchIds.map(() => '?').join(', ');
  return {
    sql: `(COALESCE(${safeAlias}.${quoteIdentifier('is_system')}, 0) = 1 OR COALESCE(${safeAlias}.${quoteIdentifier('is_parent')}, 0) = 1 OR ${safeAlias}.${quoteIdentifier('branch_id')} IS NULL OR ${safeAlias}.${quoteIdentifier('branch_id')} IN (${placeholders}))`,
    params: effectiveBranchIds,
  };
}

function normalizePartyAccessScope(value, fallback = 'single') {
  const normalized = String(value || '').trim().toLowerCase();
  if (normalized === 'single' || normalized === 'multiple' || normalized === 'all') {
    return normalized;
  }
  if (normalized === 'multi') {
    return 'multiple';
  }
  if (normalized === 'branch' || normalized === 'selected') {
    return 'single';
  }
  return fallback;
}

function getPartyBranchAssignmentsTableByTable(tableName = '') {
  if (tableName === 'suppliers') {
    return 'supplier_branches';
  }
  if (tableName === 'customers') {
    return 'customer_branches';
  }
  return '';
}

function getPartyBranchAssignmentsOwnerFieldByTable(tableName = '') {
  if (tableName === 'suppliers') {
    return 'supplier_id';
  }
  if (tableName === 'customers') {
    return 'customer_id';
  }
  return '';
}

function buildPartyBranchAccessWhereClauseByTable(tableName = '', alias = '', branchIds = [], mainBranchId = null) {
  const safeAlias = String(alias || '').trim() || String(tableName || '').trim();
  const assignmentsTable = getPartyBranchAssignmentsTableByTable(tableName);
  const ownerField = getPartyBranchAssignmentsOwnerFieldByTable(tableName);
  if (!assignmentsTable || !ownerField || !safeAlias) {
    return null;
  }
  const fallbackBranchId = normalizePositiveId(mainBranchId, 1) || 1;
  const effectiveBranchIds = normalizeBranchIdList(branchIds).length ? normalizeBranchIdList(branchIds) : [fallbackBranchId];
  const placeholders = effectiveBranchIds.map(() => '?').join(', ');
  return {
    sql: `(
      COALESCE(${safeAlias}.${quoteIdentifier('access_scope')}, 'single') = 'all'
      OR EXISTS (
        SELECT 1
        FROM ${quoteIdentifier(assignmentsTable)} access_map
        WHERE access_map.${quoteIdentifier(ownerField)} = ${safeAlias}.${quoteIdentifier('id')}
          AND access_map.${quoteIdentifier('branch_id')} IN (${placeholders})
      )
      OR (
        NOT EXISTS (
          SELECT 1
          FROM ${quoteIdentifier(assignmentsTable)} access_fallback
          WHERE access_fallback.${quoteIdentifier(ownerField)} = ${safeAlias}.${quoteIdentifier('id')}
        )
        AND COALESCE(${safeAlias}.${quoteIdentifier('branch_id')}, ${fallbackBranchId}) IN (${placeholders})
      )
    )`,
    params: [...effectiveBranchIds, ...effectiveBranchIds],
  };
}

function buildTableBranchWhereClause(schema, tableName = '', alias = '', branchIds = [], mainBranchId = null) {
  if (!hasTable(schema, tableName)) {
    return null;
  }
  const safeAlias = String(alias || tableName || '').trim();
  if (!safeAlias) {
    return null;
  }
  if (tableName === 'customers' || tableName === 'suppliers') {
    return buildPartyBranchAccessWhereClauseByTable(tableName, safeAlias, branchIds, mainBranchId);
  }
  if (tableName === 'accounts' && hasColumn(schema, tableName, 'branch_id')) {
    return buildSystemOrBranchWhereClause(safeAlias, branchIds, mainBranchId);
  }
  if (hasColumn(schema, tableName, 'branch_id')) {
    return buildCoalescedBranchWhereClause(`${safeAlias}.${quoteIdentifier('branch_id')}`, branchIds, mainBranchId);
  }
  return null;
}

function buildFilteredJournalLinesSource(schema, options = {}, alias = 'jl') {
  const safeAlias = String(alias || 'jl').trim() || 'jl';
  const branchIds = normalizeBranchIdList(options.branchIds);
  const mainBranchId = normalizePositiveId(options.mainBranchId, 1) || 1;
  if (!hasTable(schema, 'journal_lines')) {
    return {
      sql: `${quoteIdentifier('journal_lines')} ${safeAlias}`,
      params: [],
    };
  }
  const canFilterByJournalEntries = branchIds.length
    && hasTable(schema, 'journal_entries')
    && hasColumn(schema, 'journal_entries', 'id')
    && hasColumn(schema, 'journal_entries', 'branch_id')
    && hasColumn(schema, 'journal_lines', 'journal_id');
  if (!canFilterByJournalEntries) {
    return {
      sql: `${quoteIdentifier('journal_lines')} ${safeAlias}`,
      params: [],
    };
  }
  const branchFilter = buildCoalescedBranchWhereClause(`je.${quoteIdentifier('branch_id')}`, branchIds, mainBranchId);
  return {
    sql: `(SELECT jl.* FROM ${quoteIdentifier('journal_lines')} jl INNER JOIN ${quoteIdentifier('journal_entries')} je ON je.${quoteIdentifier('id')} = jl.${quoteIdentifier('journal_id')} WHERE ${branchFilter.sql}) ${safeAlias}`,
    params: branchFilter.params,
  };
}

function buildBranchScopePromptState() {
  return buildTopicContextState({
    kind: 'branch_scope_prompt',
    subject: 'database_branch_scope',
    label: 'توسيع نطاق الفروع',
    source: 'database',
    valueText: 'pending_confirmation',
    hints: ['database', 'branch-scope', 'all-branches'],
  });
}

function buildBranchScopeNoteLines(branchQueryContext = {}, options = {}) {
  if (!options.branchSensitive) {
    return [];
  }
  const branchLabel = getBranchLabel(branchQueryContext);
  if (branchQueryContext.isAllBranches && branchQueryContext.allowedBranchIds.length > 1) {
    return [`تم تنفيذ هذا الاستعلام على كل الفروع المخول لها (${branchQueryContext.allowedBranchIds.length}).`];
  }
  if (branchQueryContext.hasExplicitBranchFilter) {
    return [branchLabel ? `تم تنفيذ هذا الاستعلام على الفرع المطلوب فقط: ${branchLabel}.` : 'تم تنفيذ هذا الاستعلام على الفرع المطلوب فقط.'];
  }
  if (branchQueryContext.canPromptExpansion) {
    return [
      branchLabel ? `تم تنفيذ هذا الاستعلام على الفرع الحالي فقط: ${branchLabel}.` : 'تم تنفيذ هذا الاستعلام على الفرع الحالي فقط.',
      'إذا أردت أوسّعه إلى كل الفروع المخول لها فأرسل: نعم أو اكتب كل الفروع.',
    ];
  }
  return [];
}

function finalizeBranchAwareDatabaseResponse(payload = {}, branchQueryContext = {}, options = {}) {
  const branchSensitive = !!options.branchSensitive;
  const scopeLines = buildBranchScopeNoteLines(branchQueryContext, { branchSensitive });
  const replyText = String(payload.reply || '').trim();
  const conversationState = payload.conversationState && typeof payload.conversationState === 'object' && !Array.isArray(payload.conversationState)
    ? { ...payload.conversationState }
    : {};
  if (branchSensitive) {
    if (branchQueryContext.canPromptExpansion) {
      Object.assign(conversationState, buildBranchScopePromptState());
    } else {
      conversationState.topicContext = null;
    }
    conversationState.lastRoute = 'database';
  }
  return buildDatabaseResponse({
    ...payload,
    reply: scopeLines.length ? [replyText, scopeLines.join('\n')].filter(Boolean).join('\n\n') : replyText,
    conversationState: branchSensitive ? conversationState : payload.conversationState,
  });
}

function getEntityDefinitionByTable(tableName = '') {
  return ENTITY_DEFINITIONS.find((item) => item.table === tableName) || null;
}

function getEntityDefinitionByKind(kind = '') {
  return ENTITY_DEFINITIONS.find((item) => item.kind === kind) || null;
}

function getDocumentTypeByTable(tableName = '') {
  return DOCUMENT_TYPE_BY_TABLE[String(tableName || '').trim()] || '';
}

function getDocumentDefinitionByType(documentType = '') {
  const normalizedType = normalizeDocumentType(documentType);
  if (!normalizedType) {
    return null;
  }
  return DOCUMENT_DEFINITIONS.find((item) => getDocumentTypeByTable(item.table) === normalizedType) || null;
}

function getTableDisplayLabel(tableName = '') {
  const countQuery = COUNT_QUERIES.find((item) => item.table === tableName);
  if (countQuery?.label) {
    return countQuery.label;
  }
  const entityDefinition = getEntityDefinitionByTable(tableName);
  if (entityDefinition?.pluralLabel) {
    return entityDefinition.pluralLabel;
  }
  const documentDefinition = DOCUMENT_DEFINITIONS.find((item) => item.table === tableName);
  if (documentDefinition?.pluralLabel) {
    return documentDefinition.pluralLabel;
  }
  return String(tableName || '').trim();
}

function isBranchSensitiveTable(schema, tableName = '') {
  return !!buildTableBranchWhereClause(schema, tableName, 'scope_probe', [1], 1);
}

function isJournalBranchSensitive(schema) {
  if (!schema || !hasTable(schema, 'journal_lines')) {
    return false;
  }
  if (hasColumn(schema, 'journal_lines', 'branch_id')) {
    return true;
  }
  return hasTable(schema, 'journal_entries')
    && hasColumn(schema, 'journal_entries', 'id')
    && hasColumn(schema, 'journal_entries', 'branch_id')
    && hasColumn(schema, 'journal_lines', 'journal_id');
}

function hasTable(schema, tableName = '') {
  if (!schema || !Array.isArray(schema.tables)) {
    return false;
  }
  return schema.tables.some((table) => String(table?.name || '').trim() === String(tableName || '').trim());
}

function getExistingColumns(schema, tableName, columns = []) {
  return (columns || []).filter((columnName) => hasColumn(schema, tableName, columnName));
}

function findRowById(db, schema, tableName = '', rowId = 0, columns = [], options = {}) {
  const safeRowId = normalizePositiveId(rowId, null);
  if (!db || !hasTable(schema, tableName) || !safeRowId || !hasColumn(schema, tableName, 'id')) {
    return null;
  }
  const selectedColumns = getExistingColumns(schema, tableName, columns);
  const selectSql = (selectedColumns.length ? selectedColumns : ['id'])
    .map((columnName) => `t.${quoteIdentifier(columnName)}`)
    .join(', ');
  const branchFilter = buildTableBranchWhereClause(schema, tableName, 't', options.branchIds, options.mainBranchId);
  const whereParts = [`t.${quoteIdentifier('id')} = ?`];
  const params = [safeRowId];
  if (branchFilter) {
    whereParts.push(branchFilter.sql);
    params.push(...branchFilter.params);
  }
  return db.prepare(`SELECT ${selectSql} FROM ${quoteIdentifier(tableName)} t WHERE ${whereParts.join(' AND ')} LIMIT 1`).get(...params) || null;
}

function findLatestRow(db, schema, tableName = '', columns = [], options = {}) {
  if (!db || !hasTable(schema, tableName)) {
    return null;
  }
  const selectedColumns = getExistingColumns(schema, tableName, columns);
  const selectSql = (selectedColumns.length ? selectedColumns : ['id'])
    .map((columnName) => `t.${quoteIdentifier(columnName)}`)
    .join(', ');
  const orderColumn = pickFirstExistingColumn(schema, tableName, ['created_at', 'date', 'created_date', 'execution_date', 'branch_local_number', 'id']);
  if (!orderColumn) {
    return null;
  }
  const branchFilter = buildTableBranchWhereClause(schema, tableName, 't', options.branchIds, options.mainBranchId);
  const whereSql = branchFilter ? ` WHERE ${branchFilter.sql}` : '';
  const params = branchFilter ? branchFilter.params : [];
  return db.prepare(`SELECT ${selectSql} FROM ${quoteIdentifier(tableName)} t${whereSql} ORDER BY t.${quoteIdentifier(orderColumn)} DESC LIMIT 1`).get(...params) || null;
}

function formatRowDetails(row = {}, columns = []) {
  return (columns || [])
    .map((columnName) => {
      const value = row?.[columnName];
      if (value === undefined || value === null || String(value).trim() === '') {
        return '';
      }
      return `${columnName}: ${value}`;
    })
    .filter(Boolean)
    .join('، ');
}

function buildStatementActionBranchParams(branchQueryContext = {}) {
  const branchIds = normalizeBranchIdList(branchQueryContext.branchIds);
  const branchId = normalizePositiveId(branchQueryContext.branchId, null);
  if (!branchIds.length && !branchId) {
    return {};
  }
  return {
    branchId: branchQueryContext.isAllBranches ? null : (branchIds[0] || branchId),
    branch_id: branchQueryContext.isAllBranches ? null : (branchIds[0] || branchId),
    branchScope: branchQueryContext.isAllBranches ? 'all' : 'branch',
    branch_scope: branchQueryContext.isAllBranches ? 'all' : 'branch',
    allowedBranchIds: branchIds,
    allowed_branch_ids: branchIds,
  };
}

function buildDatabaseResponse(payload = {}) {
  const actionTools = buildToolRequestsFromActions(payload.actions || []);
  const explicitTools = Array.isArray(payload.tools) ? payload.tools : [];
  const tools = [...explicitTools, ...actionTools].reduce((acc, item) => {
    const key = JSON.stringify(item);
    if (!acc.seen.has(key)) {
      acc.seen.add(key);
      acc.items.push(item);
    }
    return acc;
  }, { seen: new Set(), items: [] }).items;
  const response = {
    route: 'database',
    reply: String(payload.reply || '').trim(),
    actions: Array.isArray(payload.actions) ? payload.actions : [],
    tools,
  };
  if (payload.data !== undefined) {
    response.data = payload.data;
  }
  if (payload.conversationState) {
    response.conversationState = payload.conversationState;
  }
  if (payload.queryPlan) {
    response.queryPlan = normalizeQueryPlan(payload.queryPlan);
  }
  return response;
}

function buildAggregatePartyQueryPlan(definition = null, options = {}) {
  if (!definition) {
    return null;
  }
  return normalizeQueryPlan({
    kind: 'aggregate_party_balances',
    entityType: definition.kind,
    balanceSide: options.wantsDebtorsOnly ? 'debtors' : options.wantsCreditorsOnly ? 'creditors' : 'all',
    includeCount: options.includeCount !== false,
    source: options.source || 'local_safe_plan',
  });
}

function buildCountQueryPlan(tableName = '', options = {}) {
  const definition = getEntityDefinitionByTable(tableName);
  return normalizeQueryPlan({
    kind: 'count_records',
    table: tableName,
    entityType: definition?.kind || '',
    source: options.source || 'local_safe_plan',
  });
}

function buildGroupedCountQueryPlan(groupedMatch = null, options = {}) {
  if (!groupedMatch) {
    return null;
  }
  return normalizeQueryPlan({
    kind: 'grouped_count',
    scope: groupedMatch.label || '',
    tables: (groupedMatch.tables || []).map((item) => item.table).filter(Boolean),
    source: options.source || 'local_safe_plan',
  });
}

function buildEntityBalanceQueryPlan(definition = null, row = {}, options = {}) {
  if (!definition) {
    return null;
  }
  return normalizeQueryPlan({
    kind: options.statement ? 'entity_statement' : 'entity_balance',
    entityType: definition.kind,
    entityName: getEntityDisplayName(row, definition),
    recordId: Number(row?.id || 0),
    source: options.source || 'local_safe_plan',
  });
}

function buildLatestDocumentQueryPlan(documentDefinition = null, focusEntity = null, options = {}) {
  if (!documentDefinition) {
    return null;
  }
  const focusEntityDefinition = getEntityDefinitionByTable(focusEntity?.table || '');
  return normalizeQueryPlan({
    kind: 'latest_related_document',
    documentType: getDocumentTypeByTable(documentDefinition.table),
    entityType: focusEntityDefinition?.kind || '',
    entityName: focusEntity?.name || '',
    recordId: Number(focusEntity?.id || 0),
    source: options.source || 'local_safe_plan',
  });
}

function buildBoxBalancesQueryPlan(normalizedText = '', options = {}) {
  const requestedTypes = getRequestedBoxTypes(normalizedText);
  return normalizeQueryPlan({
    kind: 'box_balances',
    boxType: requestedTypes.length === 1 ? requestedTypes[0] : '',
    source: options.source || 'local_safe_plan',
  });
}

function buildSchemaTablesQueryPlan(options = {}) {
  return normalizeQueryPlan({
    kind: 'list_schema_tables',
    source: options.source || 'local_safe_plan',
  });
}

function resolveEntityDefinitionFromQueryPlan(queryPlan = null) {
  if (!queryPlan) {
    return null;
  }
  return getEntityDefinitionByKind(queryPlan.entityType || '') || getEntityDefinitionByTable(queryPlan.table || '') || null;
}

function resolveEntityTargetFromQueryPlan(queryPlan = null, db, schema, definition = null, options = {}) {
  if (!queryPlan || !db || !schema || !definition) {
    return { definition, row: null, matches: [], searchTerm: '', requestedId: null, resolutionIssue: null };
  }
  const branchQueryContext = options.branchQueryContext || {};
  const recordId = Number(queryPlan.recordId || 0);
  if (branchQueryContext.hasUnauthorizedRequestedBranch && Number.isFinite(recordId) && recordId > 0) {
    return {
      definition,
      row: null,
      matches: [],
      searchTerm: '',
      requestedId: recordId,
      resolutionIssue: buildUnauthorizedRequestedBranchResolutionIssue(db, schema, definition, branchQueryContext),
    };
  }
  if (Number.isFinite(recordId) && recordId > 0) {
    const row = findRowById(db, schema, definition.table, recordId, getEntityDetailColumns(schema, definition), options);
    return {
      definition,
      row,
      matches: [],
      searchTerm: '',
      requestedId: recordId,
      resolutionIssue: row ? null : diagnoseEntityTargetScopeIssue(db, schema, definition, { recordId }, options),
    };
  }
  const searchTerm = stripExplicitBranchFilterText(String(queryPlan.entityName || '').trim(), options.branchQueryContext || {});
  if (!searchTerm) {
    return { definition, row: null, matches: [], searchTerm: '', requestedId: null, resolutionIssue: null };
  }
  if (branchQueryContext.hasUnauthorizedRequestedBranch) {
    return {
      definition,
      row: null,
      matches: [],
      searchTerm,
      requestedId: null,
      resolutionIssue: buildUnauthorizedRequestedBranchResolutionIssue(db, schema, definition, branchQueryContext),
    };
  }
  const rows = findRowsByLookup(db, schema, definition, searchTerm, 5, options);
  const resolved = resolveLookupMatch(rows, definition, searchTerm);
  return {
    definition,
    row: resolved.row,
    matches: resolved.matches,
    searchTerm,
    requestedId: null,
    resolutionIssue: (!resolved.row && !resolved.matches.length)
      ? diagnoseEntityTargetScopeIssue(db, schema, definition, { searchTerm }, options)
      : null,
  };
}

function pickFirstExistingColumn(schema, tableName, candidates = []) {
  return candidates.find((columnName) => hasColumn(schema, tableName, columnName)) || null;
}

function getUnionColumns(schema, tableName, groups = []) {
  const ordered = [];
  groups.flat().forEach((columnName) => {
    if (hasColumn(schema, tableName, columnName) && !ordered.includes(columnName)) {
      ordered.push(columnName);
    }
  });
  return ordered;
}

function getEntityDetailColumns(schema, definition) {
  return getUnionColumns(schema, definition.table, [
    definition.preferredColumns || [],
    definition.lookupColumns || [],
    BALANCE_COLUMN_GROUPS.balance,
    BALANCE_COLUMN_GROUPS.debit,
    BALANCE_COLUMN_GROUPS.credit,
    BALANCE_COLUMN_GROUPS.goldBalance,
    BALANCE_COLUMN_GROUPS.goldDebit,
    BALANCE_COLUMN_GROUPS.goldCredit,
  ]);
}

function getFirstRowValue(row = {}, candidates = []) {
  for (const columnName of candidates) {
    const value = row[columnName];
    if (value !== undefined && value !== null && String(value).trim() !== '') {
      return value;
    }
  }
  return null;
}

function getEntityDisplayName(row = {}, definition = null) {
  const fallbackColumns = definition?.table === 'users'
    ? ['full_name', 'full_name_en', 'username', 'name']
    : ['name', 'name_en', 'full_name', 'full_name_en', 'account_number', 'code', 'username', 'phone', 'mobile'];
  const value = getFirstRowValue(row, fallbackColumns);
  return value !== null ? String(value).trim() : '';
}

function formatEntityReference(definition = null, row = {}, options = {}) {
  const label = definition?.label || 'العنصر';
  const resolvedId = normalizePositiveId(options.id ?? row?.id, null);
  const displayName = String(options.displayName || getEntityDisplayName(row, definition) || '').trim();
  if (displayName && resolvedId) {
    return `${label} ${displayName} (رقم ${resolvedId})`;
  }
  if (displayName) {
    return `${label} ${displayName}`;
  }
  if (resolvedId) {
    return `${label} رقم ${resolvedId}`;
  }
  return label;
}

function getBranchDisplayName(row = {}) {
  const name = String(row?.name || row?.name_en || '').trim();
  const code = String(row?.code || '').trim();
  if (name && code) {
    return `${name} (${code})`;
  }
  if (name || code) {
    return name || code;
  }
  const branchId = normalizePositiveId(row?.id, null);
  return branchId ? `الفرع رقم ${branchId}` : '';
}

function formatBranchLabels(branchRows = [], fallbackBranchIds = []) {
  const labels = (branchRows || []).map((row) => getBranchDisplayName(row)).filter(Boolean);
  if (labels.length === 1) {
    return labels[0];
  }
  if (labels.length === 2) {
    return labels.join(' و ');
  }
  if (labels.length > 2) {
    return `${labels.slice(0, 2).join('، ')} وغيرها`;
  }
  const branchIds = normalizeBranchIdList(fallbackBranchIds);
  if (branchIds.length === 1) {
    return `الفرع رقم ${branchIds[0]}`;
  }
  if (branchIds.length > 1) {
    return `فروع أخرى (${branchIds.length})`;
  }
  return '';
}

function getBranchRowsByIds(db, schema, branchIds = []) {
  const safeBranchIds = normalizeBranchIdList(branchIds);
  if (!db || !safeBranchIds.length || !hasTable(schema, 'branches') || !hasColumn(schema, 'branches', 'id')) {
    return [];
  }
  const selectedColumns = getExistingColumns(schema, 'branches', ['id', 'code', 'name', 'name_en']);
  const selectSql = (selectedColumns.length ? selectedColumns : ['id'])
    .map((columnName) => quoteIdentifier(columnName))
    .join(', ');
  const placeholders = safeBranchIds.map(() => '?').join(', ');
  const rows = db.prepare(`SELECT ${selectSql} FROM ${quoteIdentifier('branches')} WHERE ${quoteIdentifier('id')} IN (${placeholders})`).all(...safeBranchIds) || [];
  const rowById = new Map(rows.map((row) => [Number(row?.id || 0), row]));
  return safeBranchIds.map((branchId) => rowById.get(branchId)).filter(Boolean);
}

function getEntityAssignedBranchIds(db, schema, definition = null, row = {}) {
  const directBranchIds = normalizeBranchIdList([row?.branch_id]);
  if (!definition || !row?.id) {
    return directBranchIds;
  }
  const assignmentsTable = getPartyBranchAssignmentsTableByTable(definition.table);
  const ownerField = getPartyBranchAssignmentsOwnerFieldByTable(definition.table);
  if (!assignmentsTable || !ownerField || !hasTable(schema, assignmentsTable) || !hasColumn(schema, assignmentsTable, ownerField) || !hasColumn(schema, assignmentsTable, 'branch_id')) {
    return directBranchIds;
  }
  const assignmentRows = db.prepare(`SELECT ${quoteIdentifier('branch_id')} AS branch_id FROM ${quoteIdentifier(assignmentsTable)} WHERE ${quoteIdentifier(ownerField)} = ?`).all(Number(row.id)) || [];
  return normalizeBranchIdList([...directBranchIds, ...assignmentRows.map((item) => item?.branch_id)]);
}

function buildEntityResolutionIssue(db, schema, definition = null, row = null, matches = [], branchQueryContext = {}, options = {}) {
  const sampleRow = row || ((Array.isArray(matches) ? matches : []).find((item) => item && item.id)) || null;
  const authorizedBranchIds = getAuthorizedBranchIds(branchQueryContext);
  const requestedBranchIds = options.requestedBranchIds !== undefined
    ? normalizeBranchIdList(options.requestedBranchIds)
    : normalizeBranchIdList(branchQueryContext.branchIds);
  const scopeMode = String(options.scopeMode || (branchQueryContext.hasExplicitBranchFilter ? 'requested_branch' : 'current_branch')).trim() || 'current_branch';
  const includeBranchDetails = options.includeBranchDetails !== false;
  const branchIds = sampleRow && includeBranchDetails
    ? getEntityAssignedBranchIds(db, schema, definition, sampleRow).filter((branchId) => {
      if (scopeMode === 'unauthorized_branch') {
        return !authorizedBranchIds.includes(branchId);
      }
      return !authorizedBranchIds.length || authorizedBranchIds.includes(branchId);
    })
    : [];
  return {
    type: 'branch_scope',
    row: row || null,
    matches: Array.isArray(matches) ? matches : [],
    branchIds,
    branchRows: sampleRow && includeBranchDetails ? getBranchRowsByIds(db, schema, branchIds) : [],
    scopeMode,
    requestedBranchIds,
    requestedBranchRows: requestedBranchIds.length ? getBranchRowsByIds(db, schema, requestedBranchIds) : [],
  };
}

function buildUnauthorizedRequestedBranchResolutionIssue(db, schema, definition = null, branchQueryContext = {}) {
  return buildEntityResolutionIssue(db, schema, definition, null, [], branchQueryContext, {
    scopeMode: 'unauthorized_requested_branch',
    includeBranchDetails: false,
    requestedBranchIds: branchQueryContext.unauthorizedRequestedBranchId ? [branchQueryContext.unauthorizedRequestedBranchId] : [],
  });
}

function diagnoseEntityTargetScopeIssue(db, schema, definition = null, lookup = {}, options = {}) {
  const branchQueryContext = options.branchQueryContext || {};
  if (!definition) {
    return null;
  }
  const requestedId = normalizePositiveId(lookup.recordId || lookup.requestedId || lookup.id, null);
  const searchTerm = String(lookup.searchTerm || '').trim();
  const authorizedBranchIds = getAuthorizedBranchIds(branchQueryContext);
  const allBranchRows = getAllBranchRows(db, schema);
  const allBranchIds = normalizeBranchIdList(allBranchRows.map((row) => row?.id));
  const mainBranchId = normalizePositiveId(options.mainBranchId, branchQueryContext.mainBranchId || branchQueryContext.branchId) || 1;

  if (branchQueryContext.hasUnauthorizedRequestedBranch) {
    return buildUnauthorizedRequestedBranchResolutionIssue(db, schema, definition, branchQueryContext);
  }

  const resolveWithBranchIds = (branchIds = []) => {
    if (!branchIds.length) {
      return { row: null, matches: [] };
    }
    const diagnosticOptions = {
      ...options,
      branchIds,
      mainBranchId,
    };
    if (requestedId) {
      const row = findRowById(db, schema, definition.table, requestedId, getEntityDetailColumns(schema, definition), diagnosticOptions);
      return { row, matches: row ? [row] : [] };
    }
    if (!searchTerm) {
      return { row: null, matches: [] };
    }
    const rows = findRowsByLookup(db, schema, definition, searchTerm, 5, diagnosticOptions);
    const resolved = resolveLookupMatch(rows, definition, searchTerm);
    return { row: resolved.row, matches: resolved.matches };
  };

  const authorizedMatch = resolveWithBranchIds(authorizedBranchIds);
  if (authorizedMatch.row || authorizedMatch.matches.length) {
    return buildEntityResolutionIssue(db, schema, definition, authorizedMatch.row, authorizedMatch.matches, branchQueryContext);
  }

  if (!allBranchIds.length || !allBranchIds.some((branchId) => !authorizedBranchIds.includes(branchId))) {
    return null;
  }

  const unrestrictedMatch = resolveWithBranchIds(allBranchIds);
  if (!unrestrictedMatch.row && !unrestrictedMatch.matches.length) {
    return null;
  }

  return buildEntityResolutionIssue(db, schema, definition, unrestrictedMatch.row, unrestrictedMatch.matches, branchQueryContext, {
    scopeMode: 'unauthorized_branch',
    includeBranchDetails: false,
  });
}

function buildBranchScopeExpansionActions(branchQueryContext = {}) {
  if (!branchQueryContext.canPromptExpansion) {
    return [];
  }
  return [{ type: 'submit_message', message: 'كل الفروع', label: 'كل الفروع' }];
}

function isPromptableBranchScopeIssue(resolutionIssue = {}) {
  return resolutionIssue?.type === 'branch_scope' && String(resolutionIssue?.scopeMode || '').trim() === 'current_branch';
}

function isVisibleBranchScopeIssue(resolutionIssue = {}) {
  return resolutionIssue?.type === 'branch_scope' && ['current_branch', 'requested_branch'].includes(String(resolutionIssue?.scopeMode || '').trim());
}

function formatRestrictedEntitySubject(definition = null, entityTarget = {}) {
  const safeDefinition = definition || entityTarget?.definition || null;
  if (!safeDefinition) {
    return 'السجل المطلوب';
  }
  if (entityTarget?.requestedId !== null && entityTarget?.requestedId !== undefined) {
    return `${safeDefinition.label} رقم ${entityTarget.requestedId}`;
  }
  if (entityTarget?.searchTerm) {
    return `${safeDefinition.label} المطلوب`;
  }
  return `بيانات ${safeDefinition.label}`;
}

function formatUnauthorizedBranchAccessReply(branchQueryContext = {}, options = {}) {
  const requestedBranchRows = branchQueryContext.unauthorizedRequestedBranchId
    ? [{
      id: branchQueryContext.unauthorizedRequestedBranchId,
      code: branchQueryContext.unauthorizedRequestedBranchCode,
      name: branchQueryContext.unauthorizedRequestedBranchName,
    }]
    : [];
  const requestedBranchLabel = formatBranchLabels(requestedBranchRows, [branchQueryContext.unauthorizedRequestedBranchId]);
  const subjectLabel = String(options.subjectLabel || 'هذا الطلب').trim() || 'هذا الطلب';
  const accessHint = String(options.accessHint || 'إذا كنت بحاجة إلى الاطلاع على بيانات هذا الفرع، فيرجى مراجعة مسؤول النظام لتحديث الصلاحيات الممنوحة لك.').trim();
  const lines = [requestedBranchLabel
    ? `لا أستطيع تنفيذ ${subjectLabel} على ${requestedBranchLabel} لأن هذا الفرع ليس ضمن الفروع المخول لك الوصول إليها.`
    : `لا أستطيع تنفيذ ${subjectLabel} لأن الفرع المطلوب ليس ضمن الفروع المخول لك الوصول إليها.`,
  'حفاظًا على صلاحيات الوصول، لن أعرض أي أرصدة أو تفاصيل مرتبطة بهذا الفرع.'];
  if (accessHint) {
    lines.push(accessHint);
  }
  return lines.join(' ');
}

function formatEntityTargetMissReply(definition = null, entityTarget = {}, options = {}) {
  const safeDefinition = definition || entityTarget?.definition || null;
  if (!safeDefinition) {
    return '';
  }
  const resolutionIssue = entityTarget?.resolutionIssue || null;
  if (resolutionIssue?.type === 'branch_scope') {
    const issueMatches = Array.isArray(resolutionIssue.matches) ? resolutionIssue.matches : [];
    const requestedBranchLabel = formatBranchLabels(resolutionIssue.requestedBranchRows, resolutionIssue.requestedBranchIds);
    const accessHint = String(options.accessHint || 'إذا كنت بحاجة إلى الاطلاع على بيانات هذا الفرع، فيرجى مراجعة مسؤول النظام لتحديث الصلاحيات الممنوحة لك.').trim();
    if (resolutionIssue.scopeMode === 'unauthorized_requested_branch') {
      const lines = [requestedBranchLabel
        ? `تعذر تزويدك ببيانات ${formatRestrictedEntitySubject(safeDefinition, entityTarget)} لأن الفرع المطلوب ${requestedBranchLabel} ليس ضمن الفروع المخول لك الوصول إليها.`
        : `تعذر تزويدك ببيانات ${formatRestrictedEntitySubject(safeDefinition, entityTarget)} لأن الفرع المطلوب ليس ضمن الفروع المخول لك الوصول إليها.`,
      'حفاظًا على صلاحيات الوصول، لا يمكنني عرض الرصيد أو التفاصيل المرتبطة بهذا الفرع.'];
      if (accessHint) {
        lines.push(accessHint);
      }
      return lines.join(' ');
    }
    if (resolutionIssue.scopeMode === 'unauthorized_branch') {
      const lines = [issueMatches.length > 1
        ? `وجدت أكثر من ${safeDefinition.label} مطابق للاسم المطلوب، لكن جميع المطابقات تقع خارج الفروع المخول لك بها.`
        : `تحققت من ${formatRestrictedEntitySubject(safeDefinition, entityTarget)}، واتضح أنه مرتبط بفرع غير مخول لك بالوصول إليه.`,
      'حفاظًا على صلاحيات الوصول، لا يمكنني عرض الرصيد أو التفاصيل المرتبطة بهذا السجل ضمن جلستك الحالية.'];
      if (accessHint) {
        lines.push(accessHint);
      }
      return lines.join(' ');
    }
    if (!resolutionIssue.row && issueMatches.length > 1) {
      const lines = [resolutionIssue.scopeMode === 'requested_branch'
        ? `وجدت أكثر من ${safeDefinition.label} مطابق لكنه ليس ضمن الفرع المحدد الذي طلبته.`
        : `وجدت أكثر من ${safeDefinition.label} مطابق خارج نطاق الفرع الحالي: ${formatEntityChoices(issueMatches, safeDefinition)}.`];
      if (resolutionIssue.scopeMode === 'requested_branch' && requestedBranchLabel) {
        lines.push(`الفرع المطلوب: ${requestedBranchLabel}.`);
        lines.push(`المطابقات المتاحة: ${formatEntityChoices(issueMatches, safeDefinition)}.`);
      }
      const scopeHint = String(options.scopeHint || '').trim();
      if (scopeHint) {
        lines.push(scopeHint);
      }
      return lines.join(' ');
    }
    const issueRow = resolutionIssue.row || issueMatches[0] || {};
    const entityReference = formatEntityReference(safeDefinition, issueRow, { id: entityTarget?.requestedId ?? issueRow?.id });
    const relatedBranchesLabel = formatBranchLabels(resolutionIssue.branchRows, resolutionIssue.branchIds);
    const lines = [resolutionIssue.scopeMode === 'requested_branch'
      ? `${entityReference} موجود، لكنه غير موجود ضمن الفرع المحدد الذي طلبته.`
      : `${entityReference} موجود، لكنه خارج نطاق الفرع الحالي.`];
    if (resolutionIssue.scopeMode === 'requested_branch' && requestedBranchLabel) {
      lines.push(`الفرع المطلوب: ${requestedBranchLabel}.`);
    }
    if (relatedBranchesLabel) {
      lines.push(`وهو مرتبط بـ ${relatedBranchesLabel}.`);
    } else {
      lines.push('وهو مرتبط بفرع آخر ضمن الصلاحيات المخول لك بها.');
    }
    const scopeHint = String(options.scopeHint || '').trim();
    if (scopeHint) {
      lines.push(scopeHint);
    }
    return lines.join(' ');
  }
  if (entityTarget?.searchTerm) {
    const lines = [`تحققت في قاعدة البيانات الحالية ولم أجد أي ${safeDefinition.label} مطابق لعبارة "${entityTarget.searchTerm}".`];
    const missingHint = String(options.missingHint || '').trim();
    if (missingHint) {
      lines.push(missingHint);
    }
    return lines.join(' ');
  }
  if (entityTarget?.requestedId !== null && entityTarget?.requestedId !== undefined) {
    const lines = [`تحققت في قاعدة البيانات الحالية ولم أجد ${safeDefinition.label} رقم ${entityTarget.requestedId}.`];
    const missingHint = String(options.missingHint || '').trim();
    if (missingHint) {
      lines.push(missingHint);
    }
    return lines.join(' ');
  }
  return `اذكر اسم ${safeDefinition.label} أو رقمه حتى أستطيع إرجاع البيانات الدقيقة من قاعدة البيانات.`;
}

function extractLookupTerm(rawText = '', definition = null, options = {}) {
  if (!definition) return '';
  const cleanedText = stripExplicitBranchFilterText(rawText, options.branchQueryContext || {});
  const rawTokens = String(cleanedText || '').trim().split(/\s+/).filter(Boolean);
  if (!rawTokens.length) return '';
  const normalizedTokens = rawTokens.map((token) => normalizeArabic(token));
  const normalizedKeywords = (definition.keywords || []).map((keyword) => normalizeArabic(keyword));
  let startIndex = -1;
  normalizedTokens.forEach((token, index) => {
    if (normalizedKeywords.some((keyword) => token === keyword || keyword.split(' ').includes(token) || token === keyword.replace(/^ال/, ''))) {
      startIndex = index;
    }
  });
  const sourceTokens = startIndex >= 0 ? rawTokens.slice(startIndex + 1) : rawTokens;
  const filtered = sourceTokens.filter((token) => {
    const normalizedToken = normalizeArabic(token);
    const normalizedWithoutWaw = normalizedToken.replace(/^و/, '');
    return normalizedToken.length >= 2
      && !ENTITY_LOOKUP_STOP_WORDS.has(normalizedToken)
      && !ENTITY_LOOKUP_STOP_WORDS.has(normalizedWithoutWaw);
  });
  return filtered.slice(0, 4).join(' ').trim();
}

function findRowsByLookup(db, schema, definition, searchTerm = '', limit = 5, options = {}) {
  if (!definition || !searchTerm || !hasTable(schema, definition.table)) {
    return [];
  }
  const lookupColumns = getUnionColumns(schema, definition.table, [definition.lookupColumns || []]);
  if (!lookupColumns.length) {
    return [];
  }
  const detailColumns = getEntityDetailColumns(schema, definition);
  const selectSql = detailColumns.map((columnName) => `t.${quoteIdentifier(columnName)}`).join(', ');
  const conditions = lookupColumns.map((columnName) => `LOWER(CAST(t.${quoteIdentifier(columnName)} AS TEXT)) LIKE LOWER(?)`).join(' OR ');
  const params = lookupColumns.map(() => `%${searchTerm}%`);
  const branchFilter = buildTableBranchWhereClause(schema, definition.table, 't', options.branchIds, options.mainBranchId);
  const whereParts = [`(${conditions})`];
  if (branchFilter) {
    whereParts.push(branchFilter.sql);
    params.push(...branchFilter.params);
  }
  return db.prepare(`SELECT ${selectSql} FROM ${quoteIdentifier(definition.table)} t WHERE ${whereParts.join(' AND ')} LIMIT ${Number(limit)}`).all(...params) || [];
}

function scoreLookupRow(row = {}, definition = null, searchTerm = '') {
  const loweredSearch = String(searchTerm || '').trim().toLowerCase();
  if (!definition || !loweredSearch) return 0;
  return (definition.lookupColumns || []).reduce((sum, columnName) => {
    const value = String(row[columnName] || '').trim().toLowerCase();
    if (!value) return sum;
    if (value === loweredSearch) return sum + 100;
    if (value.startsWith(loweredSearch)) return sum + 50;
    if (value.includes(loweredSearch)) return sum + 20;
    return sum;
  }, 0);
}

function resolveLookupMatch(rows = [], definition = null, searchTerm = '') {
  if (!rows.length) {
    return { row: null, matches: [] };
  }
  const scored = rows
    .map((row) => ({ row, score: scoreLookupRow(row, definition, searchTerm) }))
    .sort((a, b) => b.score - a.score);
  if (rows.length === 1) {
    return { row: rows[0], matches: rows };
  }
  if ((scored[0]?.score || 0) >= 100 && (scored[1]?.score || 0) < 100) {
    return { row: scored[0].row, matches: rows };
  }
  return { row: null, matches: scored.map((item) => item.row) };
}

function formatEntityChoices(matches = [], definition = null) {
  return matches
    .slice(0, 5)
    .map((row) => {
      const name = getEntityDisplayName(row, definition) || `${definition?.label || 'العنصر'} ${row.id}`;
      return `${name} (id: ${row.id})`;
    })
    .join('، ');
}

function formatBalanceSummary(row = {}, schema, definition = null) {
  const tableName = definition?.table || '';
  const balanceColumns = getUnionColumns(schema, tableName, [BALANCE_COLUMN_GROUPS.balance]);
  const debitColumns = getUnionColumns(schema, tableName, [BALANCE_COLUMN_GROUPS.debit]);
  const creditColumns = getUnionColumns(schema, tableName, [BALANCE_COLUMN_GROUPS.credit]);
  const goldBalanceColumns = getUnionColumns(schema, tableName, [BALANCE_COLUMN_GROUPS.goldBalance]);
  const goldDebitColumns = getUnionColumns(schema, tableName, [BALANCE_COLUMN_GROUPS.goldDebit]);
  const goldCreditColumns = getUnionColumns(schema, tableName, [BALANCE_COLUMN_GROUPS.goldCredit]);

  const balance = getFirstRowValue(row, balanceColumns);
  const debit = getFirstRowValue(row, debitColumns);
  const credit = getFirstRowValue(row, creditColumns);
  const goldBalance = getFirstRowValue(row, goldBalanceColumns);
  const goldDebit = getFirstRowValue(row, goldDebitColumns);
  const goldCredit = getFirstRowValue(row, goldCreditColumns);
  const hasAnyValue = [balance, debit, credit, goldBalance, goldDebit, goldCredit].some((value) => value !== null && value !== undefined);
  if (!hasAnyValue) {
    return [];
  }

  const cashValue = balance !== null
    ? Number(balance || 0)
    : Number((Number(debit || 0) - Number(credit || 0)).toFixed(2));
  const goldValue = goldBalance !== null
    ? Number(goldBalance || 0)
    : Number((Number(goldDebit || 0) - Number(goldCredit || 0)).toFixed(3));

  return formatSingleEntityBalanceLines({
    cash: cashValue,
    gold: goldValue,
    silver: 0,
    goldBaseKarat: 21,
    silverBaseKarat: 999,
  }, definition, { includeZero: true });
}

function formatNumericValue(value = 0, precision = 2, options = {}) {
  const number = Number(value || 0);
  if (!Number.isFinite(number)) {
    return '0';
  }
  const safePrecision = Number.isFinite(Number(precision)) && Number(precision) >= 0
    ? Number(precision)
    : 2;
  const rounded = Number(number.toFixed(safePrecision));
  const normalizedNumber = Object.is(rounded, -0) ? 0 : rounded;
  return normalizedNumber.toLocaleString('en-US', {
    minimumFractionDigits: options.keepTrailingZeros ? safePrecision : 0,
    maximumFractionDigits: safePrecision,
    useGrouping: options.useGrouping === true,
  });
}

function getSingleEntityBalanceDirection(value = 0, definition = null) {
  const numericValue = Number(value || 0);
  if (Math.abs(numericValue) <= 0.0001) {
    return '';
  }
  if (definition?.kind === 'account') {
    return numericValue >= 0 ? 'مدين' : 'دائن';
  }
  return numericValue >= 0 ? 'عليه' : 'له';
}

function formatSingleEntityBalanceLines(values = {}, definition = null, options = {}) {
  const includeZero = options.includeZero !== false;
  const cashValue = Number(values.cash || 0);
  const goldValue = Number(values.gold || 0);
  const silverValue = Number(values.silver || 0);
  const goldBaseKarat = Number(values.goldBaseKarat || 21) || 21;
  const silverBaseKarat = Number(values.silverBaseKarat || 999) || 999;

  const lines = [];
  const numberOptions = { useGrouping: true };

  function pushLine(icon, label, value, precision, suffix = '') {
    if (!includeZero && Math.abs(value) <= 0.0001) {
      return;
    }
    const direction = getSingleEntityBalanceDirection(value, definition);
    const directionText = direction ? ` ${direction}` : '';
    const formattedValue = formatNumericValue(Math.abs(value), precision, numberOptions);
    const trailingText = suffix ? ` ${suffix}` : '';
    lines.push(`${icon} ${label}${directionText}: ${formattedValue}${trailingText}`);
  }

  pushLine('💵', 'النقد', cashValue, 2, 'ريال سعودي');
  pushLine('🟡', 'الذهب', goldValue, 3, `عيار (${goldBaseKarat})`);
  pushLine('⚪', 'الفضة', silverValue, 3, `عيار (${silverBaseKarat})`);

  if (lines.length === 1) {
    lines.push('ℹ️ لا توجد أرصدة حالياً');
  }
  return lines.length ? lines : ['ℹ️ لا توجد أرصدة حالياً'];
}

function getJournalBalanceField(definition = null) {
  return definition?.table ? (JOURNAL_BALANCE_ENTITY_FIELDS[definition.table] || '') : '';
}

function findEntityJournalBalance(db, schema, definition = null, rowId = 0, options = {}) {
  const entityField = getJournalBalanceField(definition);
  const safeRowId = Number(rowId);
  const safeGoldBaseKarat = Number(options.goldBaseKarat || 21) > 0 ? Number(options.goldBaseKarat || 21) : 21;
  if (!entityField || !Number.isFinite(safeRowId) || safeRowId <= 0) {
    return null;
  }
  if (!hasTable(schema, 'journal_lines') || !hasColumn(schema, 'journal_lines', entityField)) {
    return null;
  }

  const journalSource = buildFilteredJournalLinesSource(schema, options, 'jl');

  const row = db.prepare(`
    SELECT
      ROUND(COALESCE(SUM(CASE
        WHEN jl.currency_type IS NULL OR jl.currency_type = '' OR jl.currency_type LIKE '%ريال%'
          THEN jl.debit
        ELSE 0
      END), 0), 2) AS cash_debit,
      ROUND(COALESCE(SUM(CASE
        WHEN jl.currency_type IS NULL OR jl.currency_type = '' OR jl.currency_type LIKE '%ريال%'
          THEN jl.credit
        ELSE 0
      END), 0), 2) AS cash_credit,
      ROUND(COALESCE(SUM(CASE
        WHEN (jl.currency_type LIKE '%ذهب%' OR jl.currency_type LIKE '%gold%')
          AND CAST(COALESCE(NULLIF(jl.karat,''), '0') AS INTEGER) NOT IN (999,925,900,800)
          THEN jl.debit * (CAST(COALESCE(NULLIF(jl.karat,''), '21') AS REAL) / ${safeGoldBaseKarat})
        ELSE 0
      END), 0), 3) AS gold_debit,
      ROUND(COALESCE(SUM(CASE
        WHEN (jl.currency_type LIKE '%ذهب%' OR jl.currency_type LIKE '%gold%')
          AND CAST(COALESCE(NULLIF(jl.karat,''), '0') AS INTEGER) NOT IN (999,925,900,800)
          THEN jl.credit * (CAST(COALESCE(NULLIF(jl.karat,''), '21') AS REAL) / ${safeGoldBaseKarat})
        ELSE 0
      END), 0), 3) AS gold_credit,
      ROUND(COALESCE(SUM(CASE
        WHEN jl.currency_type LIKE '%فضة%' OR jl.currency_type LIKE '%silver%'
          THEN jl.debit * (CAST(COALESCE(NULLIF(jl.karat,''), '999') AS REAL) / 999)
        WHEN (jl.currency_type LIKE '%ذهب%' OR jl.currency_type LIKE '%gold%')
          AND CAST(COALESCE(NULLIF(jl.karat,''), '0') AS INTEGER) IN (999,925,900,800)
          THEN jl.debit * (CAST(COALESCE(NULLIF(jl.karat,''), '999') AS REAL) / 999)
        ELSE 0
      END), 0), 3) AS silver_debit,
      ROUND(COALESCE(SUM(CASE
        WHEN jl.currency_type LIKE '%فضة%' OR jl.currency_type LIKE '%silver%'
          THEN jl.credit * (CAST(COALESCE(NULLIF(jl.karat,''), '999') AS REAL) / 999)
        WHEN (jl.currency_type LIKE '%ذهب%' OR jl.currency_type LIKE '%gold%')
          AND CAST(COALESCE(NULLIF(jl.karat,''), '0') AS INTEGER) IN (999,925,900,800)
          THEN jl.credit * (CAST(COALESCE(NULLIF(jl.karat,''), '999') AS REAL) / 999)
        ELSE 0
      END), 0), 3) AS silver_credit
    FROM ${journalSource.sql}
    WHERE ${quoteIdentifier(entityField)} = ?
  `).get(...journalSource.params, safeRowId) || null;

  if (!row) {
    return null;
  }

  const cashDebit = Number(row.cash_debit || 0);
  const cashCredit = Number(row.cash_credit || 0);
  const goldDebit = Number(row.gold_debit || 0);
  const goldCredit = Number(row.gold_credit || 0);
  const silverDebit = Number(row.silver_debit || 0);
  const silverCredit = Number(row.silver_credit || 0);

  return {
    cashDebit,
    cashCredit,
    cashBalance: Number((cashDebit - cashCredit).toFixed(2)),
    goldDebit,
    goldCredit,
    goldBalance: Number((goldDebit - goldCredit).toFixed(3)),
    silverDebit,
    silverCredit,
    silverBalance: Number((silverDebit - silverCredit).toFixed(3)),
    goldBaseKarat: safeGoldBaseKarat,
    silverBaseKarat: 999,
  };
}

function formatComputedBalanceSummary(balance = null, definition = null) {
  if (!balance) {
    return [];
  }

  return formatSingleEntityBalanceLines({
    cash: Number(balance.cashBalance || 0),
    gold: Number(balance.goldBalance || 0),
    silver: Number(balance.silverBalance || 0),
    goldBaseKarat: Number(balance.goldBaseKarat || 21) || 21,
    silverBaseKarat: Number(balance.silverBaseKarat || 999) || 999,
  }, definition, { includeZero: true });
}

function formatSingleEntityBalanceReply(definition = null, displayName = '', balanceLines = [], options = {}) {
  if (!definition) {
    return '';
  }

  const lines = [`📊 رصيد ${definition.label} ${displayName} حالياً:`];
  lines.push(...((Array.isArray(balanceLines) && balanceLines.length) ? balanceLines : ['ℹ️ لا توجد أرصدة حالياً']));

  const followHints = Array.isArray(options.followHints)
    ? options.followHints.map((item) => String(item || '').trim()).filter(Boolean)
    : [];

  if (followHints.length) {
    lines.push('');
    followHints.forEach((hint) => {
      lines.push(hint);
    });
  }

  return lines.join('\n');
}

function canUseAccountHierarchy(schema) {
  return hasTable(schema, 'accounts') && hasColumn(schema, 'accounts', 'id') && hasColumn(schema, 'accounts', 'parent_id');
}

function compareAccountHierarchyRows(left = {}, right = {}) {
  const leftKey = String(left.code || left.account_number || left.name || left.name_en || left.id || '').trim();
  const rightKey = String(right.code || right.account_number || right.name || right.name_en || right.id || '').trim();
  return leftKey.localeCompare(rightKey, 'ar', { numeric: true, sensitivity: 'base' });
}

function getDescendantAccountRows(db, schema, parentRow = {}, options = {}) {
  const parentId = Number(parentRow?.id || 0);
  if (!parentId || !canUseAccountHierarchy(schema)) {
    return [];
  }

  const columns = getUnionColumns(schema, 'accounts', [['id', 'parent_id', 'name', 'name_en', 'code', 'account_number', 'is_parent', 'level']]);
  if (!columns.length) {
    return [];
  }

  const selectSql = columns.map((columnName) => quoteIdentifier(columnName)).join(', ');
  const branchFilter = buildTableBranchWhereClause(schema, 'accounts', 'a', options.branchIds, options.mainBranchId);
  const whereSql = branchFilter ? ` WHERE ${branchFilter.sql}` : '';
  const params = branchFilter ? branchFilter.params : [];
  const allRows = db.prepare(`SELECT ${selectSql} FROM ${quoteIdentifier('accounts')} a${whereSql}`).all(...params) || [];
  const childrenByParent = new Map();
  allRows.forEach((row) => {
    const key = Number(row?.parent_id || 0);
    if (!key) {
      return;
    }
    if (!childrenByParent.has(key)) {
      childrenByParent.set(key, []);
    }
    childrenByParent.get(key).push(row);
  });
  childrenByParent.forEach((rows) => rows.sort(compareAccountHierarchyRows));

  const descendants = [];
  const visited = new Set();
  const walk = (currentParentId, relativeLevel) => {
    const children = childrenByParent.get(Number(currentParentId || 0)) || [];
    children.forEach((row) => {
      const rowId = Number(row?.id || 0);
      if (!rowId || visited.has(rowId)) {
        return;
      }
      visited.add(rowId);
      descendants.push({ ...row, relativeLevel });
      walk(rowId, relativeLevel + 1);
    });
  };

  walk(parentId, 1);
  return descendants;
}

function getAccountBalanceRowsByIds(db, schema, accountRows = [], options = {}) {
  const safeGoldBaseKarat = Number(options.goldBaseKarat || 21) > 0 ? Number(options.goldBaseKarat || 21) : 21;
  const orderedRows = Array.isArray(accountRows) ? accountRows : [];
  const ids = orderedRows
    .map((row) => Number(row?.id || 0))
    .filter((value, index, list) => Number.isFinite(value) && value > 0 && list.indexOf(value) === index);

  if (!ids.length) {
    return [];
  }

  if (!hasTable(schema, 'journal_lines') || !hasColumn(schema, 'journal_lines', 'account_id')) {
    return orderedRows.map((row) => ({
      ...row,
      cash_balance: 0,
      gold_balance: 0,
      silver_balance: 0,
    }));
  }

  const placeholders = ids.map(() => '?').join(', ');
  const journalSource = buildFilteredJournalLinesSource(schema, options, 'jl');
  const balanceRows = db.prepare(`
    SELECT
      jl.${quoteIdentifier('account_id')} AS id,
      ROUND(
        COALESCE(SUM(CASE WHEN jl.currency_type IS NULL OR jl.currency_type = '' OR jl.currency_type LIKE '%ريال%'
          THEN jl.debit
        ELSE 0
      END), 0) -
        COALESCE(SUM(CASE WHEN jl.currency_type IS NULL OR jl.currency_type = '' OR jl.currency_type LIKE '%ريال%'
          THEN jl.credit
        ELSE 0
      END), 0),
        2
      ) AS cash_balance,
      ROUND(
        COALESCE(SUM(CASE
          WHEN (jl.currency_type LIKE '%ذهب%' OR jl.currency_type LIKE '%gold%')
            AND CAST(COALESCE(NULLIF(jl.karat,''), '0') AS INTEGER) NOT IN (999,925,900,800)
            THEN jl.debit * (CAST(COALESCE(NULLIF(jl.karat,''), '21') AS REAL) / ${safeGoldBaseKarat})
          ELSE 0
        END), 0) -
        COALESCE(SUM(CASE
          WHEN (jl.currency_type LIKE '%ذهب%' OR jl.currency_type LIKE '%gold%')
            AND CAST(COALESCE(NULLIF(jl.karat,''), '0') AS INTEGER) NOT IN (999,925,900,800)
            THEN jl.credit * (CAST(COALESCE(NULLIF(jl.karat,''), '21') AS REAL) / ${safeGoldBaseKarat})
          ELSE 0
        END), 0),
        3
      ) AS gold_balance,
      ROUND(
        COALESCE(SUM(CASE
          WHEN jl.currency_type LIKE '%فضة%' OR jl.currency_type LIKE '%silver%'
            THEN jl.debit * (CAST(COALESCE(NULLIF(jl.karat,''), '999') AS REAL) / 999)
          WHEN (jl.currency_type LIKE '%ذهب%' OR jl.currency_type LIKE '%gold%')
            AND CAST(COALESCE(NULLIF(jl.karat,''), '0') AS INTEGER) IN (999,925,900,800)
            THEN jl.debit * (CAST(COALESCE(NULLIF(jl.karat,''), '999') AS REAL) / 999)
          ELSE 0
        END), 0) -
        COALESCE(SUM(CASE
          WHEN jl.currency_type LIKE '%فضة%' OR jl.currency_type LIKE '%silver%'
            THEN jl.credit * (CAST(COALESCE(NULLIF(jl.karat,''), '999') AS REAL) / 999)
          WHEN (jl.currency_type LIKE '%ذهب%' OR jl.currency_type LIKE '%gold%')
            AND CAST(COALESCE(NULLIF(jl.karat,''), '0') AS INTEGER) IN (999,925,900,800)
            THEN jl.credit * (CAST(COALESCE(NULLIF(jl.karat,''), '999') AS REAL) / 999)
          ELSE 0
        END), 0),
        3
      ) AS silver_balance
    FROM ${journalSource.sql}
    WHERE jl.${quoteIdentifier('account_id')} IN (${placeholders})
    GROUP BY jl.${quoteIdentifier('account_id')}
  `).all(...journalSource.params, ...ids) || [];
  const balanceMap = new Map(balanceRows.map((row) => [Number(row?.id || 0), row]));

  return orderedRows.map((row) => {
    const balance = balanceMap.get(Number(row?.id || 0)) || {};
    return {
      ...row,
      cash_balance: Number(balance.cash_balance || 0),
      gold_balance: Number(balance.gold_balance || 0),
      silver_balance: Number(balance.silver_balance || 0),
    };
  });
}

function shouldTryImplicitAccountHierarchyLookup(normalizedText = '', definition = null, conversationState = {}) {
  if (definition?.kind === 'account') {
    return true;
  }
  if (definition && definition.kind !== 'account') {
    return false;
  }
  if (conversationState?.focusEntity?.table === 'accounts' && containsAny(normalizedText, [...ACCOUNT_GROUP_HINT_WORDS, ...BALANCE_INTENT_WORDS])) {
    return true;
  }
  return containsAny(normalizedText, ACCOUNT_GROUP_HINT_WORDS);
}

function shouldAnswerWithAccountHierarchy(normalizedText = '', parentRow = {}, descendants = []) {
  if (!parentRow || !Array.isArray(descendants) || !descendants.length) {
    return false;
  }
  const hasChildren = Number(parentRow?.is_parent || 0) === 1 || descendants.length > 0;
  if (!hasChildren) {
    return false;
  }
  return containsAny(normalizedText, [...ACCOUNT_GROUP_HINT_WORDS, ...BALANCE_INTENT_WORDS]);
}

function formatAccountGroupMemberLabel(row = {}, index = 0) {
  const definition = getEntityDefinitionByKind('account');
  const name = getEntityDisplayName(row, definition) || `الحساب ${row.id}`;
  const code = String(getFirstRowValue(row, ['code', 'account_number']) || '').trim();
  const relativeLevel = Math.max(1, Number(row?.relativeLevel || 1));
  const indent = relativeLevel > 1 ? `${'— '.repeat(relativeLevel - 1)}` : '';
  return `${index + 1}) ${indent}${code ? `${name} (${code})` : name}`;
}

function formatAccountHierarchyBalanceReply(parentRow = {}, descendantRows = [], summary = null) {
  const definition = getEntityDefinitionByKind('account');
  if (!definition || !Array.isArray(descendantRows) || !descendantRows.length) {
    return '';
  }

  const parentName = getEntityDisplayName(parentRow, definition) || `الحساب ${parentRow?.id || ''}`;
  const parentCode = String(getFirstRowValue(parentRow, ['code', 'account_number']) || '').trim();
  const parentLabel = parentCode ? `${parentName} (${parentCode})` : parentName;
  const lines = [
    `📚 أرصدة الحسابات التابعة للحساب الأب ${parentLabel}:`,
    `👥 عدد الحسابات التابعة: ${formatNumericValue(descendantRows.length, 0, { useGrouping: true })}`,
  ];

  if (summary) {
    lines.push(`📈 المدينة: ${formatNumericValue(Number(summary.debtorCount || 0), 0, { useGrouping: true })} | الدائنة: ${formatNumericValue(Number(summary.creditorCount || 0), 0, { useGrouping: true })}`);
  }

  descendantRows.forEach((row, index) => {
    lines.push('');
    lines.push(formatAccountGroupMemberLabel(row, index));
    lines.push(...formatSingleEntityBalanceLines({
      cash: Number(row.cash_balance || 0),
      gold: Number(row.gold_balance || 0),
      silver: Number(row.silver_balance || 0),
      goldBaseKarat: 21,
      silverBaseKarat: 999,
    }, definition, { includeZero: true }));
  });

  if (summary) {
    lines.push('');
    lines.push('⚖️ إجمالي المجموعة:');
    lines.push(...formatSingleEntityBalanceLines({
      cash: Number(summary.net?.cash || 0),
      gold: Number(summary.net?.gold || 0),
      silver: Number(summary.net?.silver || 0),
      goldBaseKarat: 21,
      silverBaseKarat: 999,
    }, definition, { includeZero: true }));
  }

  lines.push('');
  lines.push('إذا أردت أستطيع أيضاً فتح كشف حساب أي حساب منها إذا ذكرت اسمه أو رقمه.');
  return lines.join('\n');
}

function getPartyBalanceRowsFromJournal(db, schema, definition = null, options = {}) {
  const entityField = getJournalBalanceField(definition);
  const safeGoldBaseKarat = Number(options.goldBaseKarat || 21) > 0 ? Number(options.goldBaseKarat || 21) : 21;
  if (!definition?.table || !entityField || !hasTable(schema, definition.table) || !hasTable(schema, 'journal_lines') || !hasColumn(schema, 'journal_lines', entityField)) {
    return [];
  }

  const nameColumn = pickFirstExistingColumn(schema, definition.table, [...(definition.lookupColumns || []), ...(definition.preferredColumns || []), 'name', 'name_en']);
  if (!nameColumn) {
    return [];
  }

  const entityBranchFilter = buildTableBranchWhereClause(schema, definition.table, 'e', options.branchIds, options.mainBranchId);
  const entityWhereSql = entityBranchFilter ? ` WHERE ${entityBranchFilter.sql}` : '';
  const journalSource = buildFilteredJournalLinesSource(schema, options, 'jl');

  return db.prepare(`
    SELECT
      e.${quoteIdentifier('id')} AS id,
      e.${quoteIdentifier(nameColumn)} AS name,
      ROUND(
        COALESCE(SUM(CASE WHEN jl.currency_type IS NULL OR jl.currency_type = '' OR jl.currency_type LIKE '%ريال%' THEN jl.debit ELSE 0 END), 0) -
        COALESCE(SUM(CASE WHEN jl.currency_type IS NULL OR jl.currency_type = '' OR jl.currency_type LIKE '%ريال%' THEN jl.credit ELSE 0 END), 0),
        2
      ) AS cash_balance,
      ROUND(
        COALESCE(SUM(CASE
          WHEN (jl.currency_type LIKE '%ذهب%' OR jl.currency_type LIKE '%gold%')
            AND CAST(COALESCE(NULLIF(jl.karat,''), '0') AS INTEGER) NOT IN (999,925,900,800)
            THEN jl.debit * (CAST(COALESCE(NULLIF(jl.karat,''), '21') AS REAL) / ${safeGoldBaseKarat})
          ELSE 0
        END), 0) -
        COALESCE(SUM(CASE
          WHEN (jl.currency_type LIKE '%ذهب%' OR jl.currency_type LIKE '%gold%')
            AND CAST(COALESCE(NULLIF(jl.karat,''), '0') AS INTEGER) NOT IN (999,925,900,800)
            THEN jl.credit * (CAST(COALESCE(NULLIF(jl.karat,''), '21') AS REAL) / ${safeGoldBaseKarat})
          ELSE 0
        END), 0),
        3
      ) AS gold_balance,
      ROUND(
        COALESCE(SUM(CASE
          WHEN jl.currency_type LIKE '%فضة%' OR jl.currency_type LIKE '%silver%'
            THEN jl.debit * (CAST(COALESCE(NULLIF(jl.karat,''), '999') AS REAL) / 999)
          WHEN (jl.currency_type LIKE '%ذهب%' OR jl.currency_type LIKE '%gold%')
            AND CAST(COALESCE(NULLIF(jl.karat,''), '0') AS INTEGER) IN (999,925,900,800)
            THEN jl.debit * (CAST(COALESCE(NULLIF(jl.karat,''), '999') AS REAL) / 999)
          ELSE 0
        END), 0) -
        COALESCE(SUM(CASE
          WHEN jl.currency_type LIKE '%فضة%' OR jl.currency_type LIKE '%silver%'
            THEN jl.credit * (CAST(COALESCE(NULLIF(jl.karat,''), '999') AS REAL) / 999)
          WHEN (jl.currency_type LIKE '%ذهب%' OR jl.currency_type LIKE '%gold%')
            AND CAST(COALESCE(NULLIF(jl.karat,''), '0') AS INTEGER) IN (999,925,900,800)
            THEN jl.credit * (CAST(COALESCE(NULLIF(jl.karat,''), '999') AS REAL) / 999)
          ELSE 0
        END), 0),
        3
      ) AS silver_balance
    FROM ${quoteIdentifier(definition.table)} e
    LEFT JOIN ${journalSource.sql} ON jl.${quoteIdentifier(entityField)} = e.${quoteIdentifier('id')}
    ${entityWhereSql}
    GROUP BY e.${quoteIdentifier('id')}, e.${quoteIdentifier(nameColumn)}
    ORDER BY e.${quoteIdentifier('id')} DESC
  `).all(...journalSource.params, ...(entityBranchFilter ? entityBranchFilter.params : [])) || [];
}

 function canComputePartyBalanceFromJournal(schema, definition = null) {
   const entityField = getJournalBalanceField(definition);
   return !!definition?.table
     && !!entityField
     && hasTable(schema, definition.table)
     && hasTable(schema, 'journal_lines')
     && hasColumn(schema, 'journal_lines', entityField);
 }

function buildSignedBalanceSummary(rows = []) {
  return (rows || []).reduce((acc, row) => {
    const cash = Number(row?.cash_balance || 0);
    const gold = Number(row?.gold_balance || 0);
    const silver = Number(row?.silver_balance || 0);
    const hasDebtorBalance = cash > 0.0001 || gold > 0.0001 || silver > 0.0001;
    const hasCreditorBalance = cash < -0.0001 || gold < -0.0001 || silver < -0.0001;

    acc.net.cash += cash;
    acc.net.gold += gold;
    acc.net.silver += silver;

    if (cash >= 0) acc.debtors.cash += cash;
    else acc.creditors.cash += Math.abs(cash);

    if (gold >= 0) acc.debtors.gold += gold;
    else acc.creditors.gold += Math.abs(gold);

    if (silver >= 0) acc.debtors.silver += silver;
    else acc.creditors.silver += Math.abs(silver);

    if (hasDebtorBalance) acc.debtorCount += 1;
    if (hasCreditorBalance) acc.creditorCount += 1;

    return acc;
  }, {
    debtors: { cash: 0, gold: 0, silver: 0 },
    creditors: { cash: 0, gold: 0, silver: 0 },
    net: { cash: 0, gold: 0, silver: 0 },
    debtorCount: 0,
    creditorCount: 0,
  });
}

function formatAggregateCurrencyLines(values = {}, options = {}) {
  const lines = [];
  const includeZero = !!options.includeZero;
  const cashValue = Number(values.cash || 0);
  const goldValue = Number(values.gold || 0);
  const silverValue = Number(values.silver || 0);
  const numberOptions = { useGrouping: true };

  if (includeZero || Math.abs(cashValue) > 0.0001) {
    lines.push(`💵 النقد: ${formatNumericValue(cashValue, 2, numberOptions)}`);
  }
  if (includeZero || Math.abs(goldValue) > 0.0001) {
    lines.push(`🟡 ذهب مكافئ عيار (21): ${formatNumericValue(goldValue, 3, numberOptions)}`);
  }
  if (includeZero || Math.abs(silverValue) > 0.0001) {
    lines.push(`⚪ فضة مكافئة عيار (999): ${formatNumericValue(silverValue, 3, numberOptions)}`);
  }

  return lines.length ? lines : ['ℹ️ لا توجد أرصدة حالياً'];
}

function buildAggregateSectionLines(title = '', count = 0, values = {}, options = {}) {
  const lines = [];
  if (title) {
    lines.push(title);
  }
  if (options.includeCount !== false) {
    lines.push(`👥 العدد: ${formatNumericValue(count, 0, { useGrouping: true })}`);
  }
  return [...lines, ...formatAggregateCurrencyLines(values, { includeZero: options.includeZero })];
}

function formatAggregatePartyBalanceReply(definition = null, summary = null, options = {}) {
  if (!definition || !summary) {
    return '';
  }

  const wantsDebtorsOnly = !!options.wantsDebtorsOnly;
  const wantsCreditorsOnly = !!options.wantsCreditorsOnly;
  const pluralLabel = definition.pluralLabel || definition.label;

  if (wantsDebtorsOnly && !wantsCreditorsOnly) {
    return [
      `📊 إجمالي أرصدة ${pluralLabel} المدينين حالياً:`,
      ...buildAggregateSectionLines('', Number(summary.debtorCount || 0), summary.debtors, { includeZero: true }),
    ].join('\n');
  }

  if (wantsCreditorsOnly && !wantsDebtorsOnly) {
    return [
      `📊 إجمالي أرصدة ${pluralLabel} الدائنين حالياً:`,
      ...buildAggregateSectionLines('', Number(summary.creditorCount || 0), summary.creditors, { includeZero: true }),
    ].join('\n');
  }

  return [
    `📊 إجمالي أرصدة ${pluralLabel} حالياً:`,
    ...buildAggregateSectionLines('🟢 المدينون', Number(summary.debtorCount || 0), summary.debtors, { includeZero: true }),
    '',
    ...buildAggregateSectionLines('🔴 الدائنون', Number(summary.creditorCount || 0), summary.creditors, { includeZero: true }),
    '',
    '⚖️ صافي الأرصدة',
    ...formatAggregateCurrencyLines(summary.net, { includeZero: true }),
  ].join('\n');
}

function getRequestedBoxTypes(normalizedText = '') {
  const types = [];
  if (containsAny(normalizedText, ['نقد', 'نقدي', 'ريال', 'كاش', 'cash'])) types.push('cash');
  if (containsAny(normalizedText, ['ذهب', 'gold']) && !containsAny(normalizedText, ['مشغول', 'worked'])) types.push('gold');
  if (containsAny(normalizedText, ['مشغول', 'worked'])) types.push('worked_gold');
  if (containsAny(normalizedText, ['فضه', 'فضة', 'silver'])) types.push('silver');
  if (containsAny(normalizedText, ['الماس', 'ألماس', 'احجار', 'أحجار', 'diamond'])) types.push('diamond');
  return Array.from(new Set(types));
}

function getBoxTargets(db, schema, options = {}) {
  if (!hasTable(schema, 'accounts')) {
    return [];
  }

  const rows = [];
  const seenAccountIds = new Set();
  const accountBranchFilter = buildTableBranchWhereClause(schema, 'accounts', 'a', options.branchIds, options.mainBranchId);
  const accountWhereSql = accountBranchFilter ? ` WHERE ${accountBranchFilter.sql}` : '';
  const accountWhereParams = accountBranchFilter ? accountBranchFilter.params : [];
  const accountRows = hasColumn(schema, 'accounts', 'id') && hasColumn(schema, 'accounts', 'code')
    ? db.prepare(`SELECT a.id, a.parent_id, a.name, a.code FROM ${quoteIdentifier('accounts')} a${accountWhereSql}`).all(...accountWhereParams) || []
    : [];
  const accountRowById = new Map(accountRows.map((row) => [Number(row?.id || 0), row]));
  const accountRowByCode = new Map(accountRows.map((row) => [String(row?.code || '').trim(), row]));

  const addTargetRow = (boxType, row) => {
    const accountId = Number(row?.id || 0) || 0;
    if (!accountId || seenAccountIds.has(accountId)) {
      return;
    }
    seenAccountIds.add(accountId);
    rows.push({
      boxType,
      accountId,
      name: String(row?.name || '').trim() || BOX_TYPE_LABELS[boxType] || '',
      code: String(row?.code || '').trim(),
    });
  };

  if (canUseAccountHierarchy(schema) && accountRowByCode.size) {
    Object.entries(BOX_TYPE_PARENT_CODES).forEach(([boxType, parentCode]) => {
      const parentRow = accountRowByCode.get(parentCode);
      if (!parentRow) {
        return;
      }
      const descendants = getDescendantAccountRows(db, schema, parentRow, options);
      descendants.forEach((row) => addTargetRow(boxType, row));
    });
  }

  if (hasTable(schema, 'default_boxes') && hasColumn(schema, 'default_boxes', 'box_type') && hasColumn(schema, 'default_boxes', 'account_id')) {
    const defaultRows = db.prepare(`
      SELECT box_type, account_id
      FROM ${quoteIdentifier('default_boxes')}
    `).all() || [];
    defaultRows.forEach((row) => {
      const boxType = String(row?.box_type || '').trim();
      const accountId = Number(row?.account_id || 0) || 0;
      if (!boxType || !accountId) {
        return;
      }
      const accountRow = accountRowById.get(accountId) || null;
      if (accountRow) {
        addTargetRow(boxType, accountRow);
      }
    });
  }

  Object.entries(BOX_TYPE_FALLBACK_CODES).forEach(([boxType, code]) => {
    if (rows.some((row) => row.boxType === boxType && row.accountId > 0)) {
      return;
    }
    const row = accountRowByCode.get(String(code || '').trim())
      || db.prepare(`SELECT a.id, a.name, a.code FROM ${quoteIdentifier('accounts')} a WHERE a.${quoteIdentifier('code')} = ?${accountBranchFilter ? ` AND ${accountBranchFilter.sql}` : ''} LIMIT 1`).get(code, ...accountWhereParams);
    if (row?.id) {
      addTargetRow(boxType, row);
    }
  });

  rows.sort((left, right) => {
    const order = { cash: 0, gold: 1, worked_gold: 2, silver: 3, diamond: 4 };
    const leftOrder = Object.prototype.hasOwnProperty.call(order, left.boxType) ? order[left.boxType] : 99;
    const rightOrder = Object.prototype.hasOwnProperty.call(order, right.boxType) ? order[right.boxType] : 99;
    if (leftOrder !== rightOrder) {
      return leftOrder - rightOrder;
    }
    return String(left.code || '').localeCompare(String(right.code || ''), 'ar', { numeric: true, sensitivity: 'base' });
  });

  return rows.filter((row) => row.accountId > 0);
}

function getAccountBalanceRows(db, schema, accountIds = [], options = {}) {
  const safeAccountIds = Array.from(new Set((accountIds || []).map((value) => Number(value || 0)).filter((value) => value > 0)));
  const safeGoldBaseKarat = Number(options.goldBaseKarat || 21) > 0 ? Number(options.goldBaseKarat || 21) : 21;
  if (!safeAccountIds.length) {
    return [];
  }

  const placeholders = safeAccountIds.map(() => '?').join(', ');
  const journalSource = buildFilteredJournalLinesSource(schema, options, 'jl');
  return db.prepare(`
    SELECT
      a.${quoteIdentifier('id')} AS id,
      a.${quoteIdentifier('name')} AS name,
      a.${quoteIdentifier('code')} AS code,
      ROUND(
        COALESCE(SUM(CASE WHEN jl.currency_type IS NULL OR jl.currency_type = '' OR jl.currency_type LIKE '%ريال%' THEN jl.debit ELSE 0 END), 0) -
        COALESCE(SUM(CASE WHEN jl.currency_type IS NULL OR jl.currency_type = '' OR jl.currency_type LIKE '%ريال%' THEN jl.credit ELSE 0 END), 0),
        2
      ) AS cash_balance,
      ROUND(
        COALESCE(SUM(CASE
          WHEN (jl.currency_type LIKE '%ذهب%' OR jl.currency_type LIKE '%gold%')
            AND CAST(COALESCE(NULLIF(jl.karat,''), '0') AS INTEGER) NOT IN (999,925,900,800)
            THEN jl.debit * (CAST(COALESCE(NULLIF(jl.karat,''), '21') AS REAL) / ${safeGoldBaseKarat})
          ELSE 0
        END), 0) -
        COALESCE(SUM(CASE
          WHEN (jl.currency_type LIKE '%ذهب%' OR jl.currency_type LIKE '%gold%')
            AND CAST(COALESCE(NULLIF(jl.karat,''), '0') AS INTEGER) NOT IN (999,925,900,800)
            THEN jl.credit * (CAST(COALESCE(NULLIF(jl.karat,''), '21') AS REAL) / ${safeGoldBaseKarat})
          ELSE 0
        END), 0),
        3
      ) AS gold_balance,
      ROUND(
        COALESCE(SUM(CASE
          WHEN jl.currency_type LIKE '%فضة%' OR jl.currency_type LIKE '%silver%'
            THEN jl.debit * (CAST(COALESCE(NULLIF(jl.karat,''), '999') AS REAL) / 999)
          WHEN (jl.currency_type LIKE '%ذهب%' OR jl.currency_type LIKE '%gold%')
            AND CAST(COALESCE(NULLIF(jl.karat,''), '0') AS INTEGER) IN (999,925,900,800)
            THEN jl.debit * (CAST(COALESCE(NULLIF(jl.karat,''), '999') AS REAL) / 999)
          ELSE 0
        END), 0) -
        COALESCE(SUM(CASE
          WHEN jl.currency_type LIKE '%فضة%' OR jl.currency_type LIKE '%silver%'
            THEN jl.credit * (CAST(COALESCE(NULLIF(jl.karat,''), '999') AS REAL) / 999)
          WHEN (jl.currency_type LIKE '%ذهب%' OR jl.currency_type LIKE '%gold%')
            AND CAST(COALESCE(NULLIF(jl.karat,''), '0') AS INTEGER) IN (999,925,900,800)
            THEN jl.credit * (CAST(COALESCE(NULLIF(jl.karat,''), '999') AS REAL) / 999)
          ELSE 0
        END), 0),
        3
      ) AS silver_balance
    FROM ${quoteIdentifier('accounts')} a
    LEFT JOIN ${journalSource.sql} ON jl.${quoteIdentifier('account_id')} = a.${quoteIdentifier('id')}
    WHERE a.${quoteIdentifier('id')} IN (${placeholders})
    GROUP BY a.${quoteIdentifier('id')}, a.${quoteIdentifier('name')}, a.${quoteIdentifier('code')}
    ORDER BY a.${quoteIdentifier('id')} ASC
  `).all(...journalSource.params, ...safeAccountIds) || [];
}

function getBoxBalanceRows(db, schema, normalizedText = '', options = {}) {
  if (!hasTable(schema, 'journal_lines') || !hasColumn(schema, 'journal_lines', 'account_id')) {
    return [];
  }
  const targets = getBoxTargets(db, schema, options);
  const requestedTypes = getRequestedBoxTypes(normalizedText);
  const filteredTargets = requestedTypes.length
    ? targets.filter((target) => requestedTypes.includes(target.boxType))
    : targets;
  if (!filteredTargets.length) {
    return [];
  }

  const accountRows = getAccountBalanceRows(db, schema, filteredTargets.map((target) => target.accountId), options);
  const rowMap = new Map(accountRows.map((row) => [Number(row.id || 0), row]));
  return filteredTargets.map((target) => {
    const row = rowMap.get(target.accountId) || {};
    return {
      boxType: target.boxType,
      accountId: target.accountId,
      name: target.name || BOX_TYPE_LABELS[target.boxType] || `الصندوق ${target.accountId}`,
      code: target.code || BOX_TYPE_FALLBACK_CODES[target.boxType] || '',
      cashBalance: Number(row.cash_balance || 0),
      goldBalance: Number(row.gold_balance || 0),
      silverBalance: Number(row.silver_balance || 0),
    };
  });
}

function formatSingleBoxBalance(row = {}) {
  const header = `📦 ${row.name || BOX_TYPE_LABELS[row.boxType] || 'الصندوق'}${row.code ? ` (${row.code})` : ''}`;
  const lines = [header];
  const numberOptions = { useGrouping: true };

  function formatLine(icon, label, value, precision, suffix = '') {
    const numericValue = Number(value || 0);
    const direction = numericValue >= 0 ? 'عليه' : 'له';
    const formattedValue = formatNumericValue(Math.abs(numericValue), precision, numberOptions);
    const trailing = suffix ? ` ${suffix}` : '';
    lines.push(`${icon} ${label} ${direction}: ${formattedValue}${trailing}`);
  }

  formatLine('💵', 'النقد', row.cashBalance, 2, 'ريال سعودي');
  formatLine('🟡', 'الذهب', row.goldBalance, 3, `عيار (${row.goldBaseKarat || 21})`);
  formatLine('⚪', 'الفضة', row.silverBalance, 3, `عيار (${row.silverBaseKarat || 999})`);

  if (lines.length === 1) {
    lines.push('ℹ️ الرصيد متعادل');
  }
  return lines.join('\n');
}

function formatBoxBalanceReply(rows = []) {
  if (!rows.length) {
    return '';
  }
  return rows.map((row) => formatSingleBoxBalance(row)).join('\n\n');
}

function buildEntityFocusState(definition = null, row = {}) {
  if (!definition || !row?.id) {
    return { focusEntity: null };
  }
  return buildFocusEntityState({
    table: definition.table,
    id: Number(row.id),
    label: definition.label,
    name: getEntityDisplayName(row, definition),
  });
}

function getStatementReferencePayload(definition = null, row = {}) {
  if (!definition || !row?.id) {
    return { refId: null, realId: null };
  }
  if (String(definition.kind || '') === 'account') {
    const accountRef = getFirstRowValue(row, ['code', 'account_number']);
    return {
      refId: accountRef !== null ? String(accountRef).trim() : String(row.id),
      realId: Number(row.id),
    };
  }
  return {
    refId: String(row.id).trim(),
    realId: null,
  };
}

function buildOpenEntityStatementAction(definition = null, row = {}, options = {}) {
  if (!definition || !row?.id || !['customer', 'supplier', 'account'].includes(String(definition.kind || ''))) {
    return null;
  }

  const statementReference = getStatementReferencePayload(definition, row);
  if (!statementReference.refId) {
    return null;
  }

  const displayName = getEntityDisplayName(row, definition) || `رقم ${row.id}`;
  return {
    type: 'open_tab',
    tabId: 'tab-reports',
    label: `كشف حساب ${definition.label} ${displayName}`,
    screenParams: {
      ...buildStatementActionBranchParams(options.branchQueryContext || {}),
      reportType: 'statement',
      entityType: definition.kind,
      refId: statementReference.refId,
      realId: statementReference.realId,
      autoLoad: true,
    },
  };
}

function resolveEntityTarget(message = '', normalizedText = '', db, schema, definition = null, conversationState = {}, options = {}) {
  const focusedDefinition = getEntityDefinitionByTable(conversationState?.focusEntity?.table || '');
  const rowId = extractFirstNumber(normalizedText);
  const targetDefinition = definition || focusedDefinition;
  const branchQueryContext = options.branchQueryContext || {};
  const hasFocusedPronounFollowup = conversationState?.focusEntity?.id
    && containsAny(normalizedText, ['له', 'لها', 'عليه', 'عليها', 'هذا', 'هذه', 'هذي', 'ذلك']);
  if (!targetDefinition) {
    return { definition: null, row: null, matches: [], searchTerm: '', requestedId: null, resolutionIssue: null };
  }

  if (rowId !== null) {
    if (branchQueryContext.hasUnauthorizedRequestedBranch) {
      return {
        definition: targetDefinition,
        row: null,
        matches: [],
        searchTerm: '',
        requestedId: rowId,
        resolutionIssue: buildUnauthorizedRequestedBranchResolutionIssue(db, schema, targetDefinition, branchQueryContext),
      };
    }
    const detailColumns = getEntityDetailColumns(schema, targetDefinition);
    const row = findRowById(db, schema, targetDefinition.table, rowId, detailColumns, options);
    if (row) {
      return { definition: targetDefinition, row, matches: [], searchTerm: '', requestedId: rowId, resolutionIssue: null };
    }
    const numericSearchTerm = String(rowId).trim();
    if (targetDefinition.kind === 'account') {
      const rows = numericSearchTerm ? findRowsByLookup(db, schema, targetDefinition, numericSearchTerm, 5, options) : [];
      const resolved = resolveLookupMatch(rows, targetDefinition, numericSearchTerm);
      if (resolved.row || resolved.matches.length) {
        return { definition: targetDefinition, row: resolved.row, matches: resolved.matches, searchTerm: numericSearchTerm, requestedId: rowId, resolutionIssue: null };
      }
    }
    let resolutionIssue = diagnoseEntityTargetScopeIssue(db, schema, targetDefinition, { recordId: rowId }, options);
    if (!resolutionIssue && targetDefinition.kind === 'account') {
      resolutionIssue = diagnoseEntityTargetScopeIssue(db, schema, targetDefinition, { searchTerm: numericSearchTerm }, options);
    }
    return { definition: targetDefinition, row: null, matches: [], searchTerm: '', requestedId: rowId, resolutionIssue };
  }

  if (hasFocusedPronounFollowup && (!definition || conversationState.focusEntity.table === targetDefinition.table)) {
    if (branchQueryContext.hasUnauthorizedRequestedBranch) {
      return {
        definition: targetDefinition,
        row: null,
        matches: [],
        searchTerm: '',
        requestedId: normalizePositiveId(conversationState?.focusEntity?.id, null),
        resolutionIssue: buildUnauthorizedRequestedBranchResolutionIssue(db, schema, targetDefinition, branchQueryContext),
      };
    }
    const row = findRowById(db, schema, conversationState.focusEntity.table, conversationState.focusEntity.id, getEntityDetailColumns(schema, targetDefinition), options);
    return { definition: targetDefinition, row, matches: [], searchTerm: '', requestedId: null, resolutionIssue: null };
  }

  const searchTerm = extractLookupTerm(message, targetDefinition, options);
  if (searchTerm) {
    if (branchQueryContext.hasUnauthorizedRequestedBranch) {
      return {
        definition: targetDefinition,
        row: null,
        matches: [],
        searchTerm,
        requestedId: null,
        resolutionIssue: buildUnauthorizedRequestedBranchResolutionIssue(db, schema, targetDefinition, branchQueryContext),
      };
    }
    const rows = findRowsByLookup(db, schema, targetDefinition, searchTerm, 5, options);
    const resolved = resolveLookupMatch(rows, targetDefinition, searchTerm);
    const resolutionIssue = !resolved.row && !resolved.matches.length
      ? diagnoseEntityTargetScopeIssue(db, schema, targetDefinition, { searchTerm }, options)
      : null;
    return { definition: targetDefinition, row: resolved.row, matches: resolved.matches, searchTerm, requestedId: null, resolutionIssue };
  }

  if (conversationState?.focusEntity?.id && (!definition || conversationState.focusEntity.table === definition.table)) {
    if (branchQueryContext.hasUnauthorizedRequestedBranch) {
      return {
        definition: targetDefinition,
        row: null,
        matches: [],
        searchTerm: '',
        requestedId: normalizePositiveId(conversationState?.focusEntity?.id, null),
        resolutionIssue: buildUnauthorizedRequestedBranchResolutionIssue(db, schema, targetDefinition, branchQueryContext),
      };
    }
    const row = findRowById(db, schema, conversationState.focusEntity.table, conversationState.focusEntity.id, getEntityDetailColumns(schema, targetDefinition), options);
    return { definition: targetDefinition, row, matches: [], searchTerm: '', requestedId: null, resolutionIssue: null };
  }

  return { definition: targetDefinition, row: null, matches: [], searchTerm: '', requestedId: null, resolutionIssue: null };
}

function resolveDocumentDefinitionForContext(normalizedText = '', focusDefinition = null) {
  const explicit = resolveDocumentDefinition(normalizedText);
  if (explicit) {
    return explicit;
  }
  if (containsAny(normalizedText, ['فاتوره', 'فاتورة', 'فواتير'])) {
    if (focusDefinition?.table === 'customers') {
      return DOCUMENT_DEFINITIONS.find((item) => item.table === 'sales_invoices') || null;
    }
    if (focusDefinition?.table === 'suppliers') {
      return DOCUMENT_DEFINITIONS.find((item) => item.table === 'purchase_invoices') || null;
    }
  }
  return null;
}

function findLatestRelatedDocument(db, schema, documentDefinition, focusEntity = null, options = {}) {
  if (!documentDefinition || !focusEntity || documentDefinition.entityTable !== focusEntity.table || !hasTable(schema, documentDefinition.table)) {
    return null;
  }
  const relationColumn = pickFirstExistingColumn(schema, documentDefinition.table, documentDefinition.relationColumns || []);
  const orderColumn = pickFirstExistingColumn(schema, documentDefinition.table, [...(documentDefinition.dateColumns || []), 'id']);
  if (!relationColumn || !orderColumn) {
    return null;
  }
  const selectColumns = getUnionColumns(schema, documentDefinition.table, [
    documentDefinition.preferredColumns || [],
    documentDefinition.relationColumns || [],
    documentDefinition.dateColumns || [],
    documentDefinition.numberColumns || [],
    documentDefinition.amountColumns || [],
  ]);
  const selectSql = selectColumns.map((columnName) => `t.${quoteIdentifier(columnName)}`).join(', ');
  const branchFilter = buildTableBranchWhereClause(schema, documentDefinition.table, 't', options.branchIds, options.mainBranchId);
  const whereParts = [`t.${quoteIdentifier(relationColumn)} = ?`];
  const params = [Number(focusEntity.id)];
  if (branchFilter) {
    whereParts.push(branchFilter.sql);
    params.push(...branchFilter.params);
  }
  return db.prepare(`SELECT ${selectSql} FROM ${quoteIdentifier(documentDefinition.table)} t WHERE ${whereParts.join(' AND ')} ORDER BY t.${quoteIdentifier(orderColumn)} DESC LIMIT 1`).get(...params) || null;
}

function formatLatestDocumentReply(documentDefinition, row = {}, focusEntity = null) {
  const dateValue = getFirstRowValue(row, documentDefinition.dateColumns || []);
  const numberValue = getFirstRowValue(row, documentDefinition.numberColumns || []);
  const amountValue = getFirstRowValue(row, documentDefinition.amountColumns || []);
  const entityName = focusEntity?.name ? ` لـ ${focusEntity.label} ${focusEntity.name}` : '';
  const parts = [];
  if (dateValue !== null) parts.push(`بتاريخ ${dateValue}`);
  if (numberValue !== null) parts.push(`رقمها ${numberValue}`);
  if (amountValue !== null) parts.push(`وإجماليها ${amountValue}`);
  return parts.length
    ? `آخر ${documentDefinition.label}${entityName} كانت ${parts.join('، ')}.`
    : `وجدت آخر ${documentDefinition.label}${entityName} لكن دون تفاصيل كافية للعرض.`;
}

function shouldHandleAsSpecificEntityQuestion(message = '', normalizedText = '', definition = null, conversationState = {}, options = {}) {
  if (!definition) {
    return false;
  }
  if (extractFirstNumber(normalizedText) !== null) {
    return true;
  }
  if (extractLookupTerm(message, definition, options)) {
    return true;
  }
  if (conversationState?.focusEntity?.id && conversationState.focusEntity.table === definition.table && containsAny(normalizedText, ['له', 'لها', 'عليه', 'عليها', 'رصيد', 'حساب', 'مديونيه', 'مديونية', 'اخر', 'آخر', 'متى', 'تاريخ'])) {
    return true;
  }
  if (containsAny(normalizedText, ['رصيد', 'حساب', 'مديونيه', 'مديونية', 'له', 'لها', 'عليه', 'عليها'])) {
    return true;
  }
  return false;
}

function answerDatabase(message = '', context = {}) {
  const rawMessage = String(message || '').trim();
  const rawNormalizedText = normalizeArabic(rawMessage);
  const db = context.db;
  if (!db) {
    return buildDatabaseResponse({
      reply: 'طبقة قاعدة البيانات غير جاهزة حالياً داخل جلسة المساعد.',
      actions: [],
      queryPlan: normalizeQueryPlan(context.intentHint?.queryPlan || null),
    });
  }

  const schema = loadSchema(db);
  const conversationState = normalizeConversationState(context.conversationState || {});
  const conversationHistory = getConversationHistory(context);
  const shouldExpandBranchScope = isBranchScopeExpansionFollowUp(rawNormalizedText, context);
  const effectiveMessage = shouldExpandBranchScope
    ? (getPreviousUserMessageText(conversationHistory, rawMessage) || rawMessage)
    : rawMessage;
  const normalizedText = normalizeArabic(effectiveMessage);
  const effectiveContext = shouldExpandBranchScope ? { ...context, assistantBranchOverride: 'all' } : context;
  const branchQueryContext = getEffectiveBranchQueryContext(normalizedText, { ...effectiveContext, db, schema });
  const branchOptions = {
    ...getBranchQueryOptions(branchQueryContext),
    branchQueryContext,
  };
  const isTableScoped = (tableName = '') => isBranchSensitiveTable(schema, tableName);
  const isEntityScoped = (definition = null) => isTableScoped(definition?.table || '');
  const journalBranchSensitive = isJournalBranchSensitive(schema);
  const finalizeResponse = (payload = {}, options = {}) => finalizeBranchAwareDatabaseResponse(payload, branchQueryContext, {
    branchSensitive: !!options.branchSensitive,
  });
  const hintedQueryPlan = normalizeQueryPlan(context.intentHint?.queryPlan || null);
  const hintedEntityDefinition = resolveEntityDefinitionFromQueryPlan(hintedQueryPlan);
  const explicitEntityDefinition = resolveEntityDefinition(normalizedText) || hintedEntityDefinition;
  const focusedEntityDefinition = getEntityDefinitionByTable(conversationState?.focusEntity?.table || '');
  const aggregatePartyDefinition = explicitEntityDefinition && ['customer', 'supplier'].includes(explicitEntityDefinition.kind)
    ? explicitEntityDefinition
    : null;
  const shouldTryAccountHierarchy = shouldTryImplicitAccountHierarchyLookup(normalizedText, explicitEntityDefinition, conversationState);
  const accountHierarchyDefinition = shouldTryAccountHierarchy
    ? (explicitEntityDefinition?.kind === 'account' ? explicitEntityDefinition : getEntityDefinitionByKind('account'))
    : null;
  const queryPlanSource = hintedQueryPlan?.source || (shouldExpandBranchScope ? 'conversation_follow_up' : 'intent_hint');

  const wantsAggregateFromHint = hintedQueryPlan?.kind === 'aggregate_party_balances' && aggregatePartyDefinition;
  const wantsAggregateFromText = aggregatePartyDefinition
    && extractFirstNumber(normalizedText) === null
    && !extractLookupTerm(effectiveMessage, aggregatePartyDefinition, branchOptions)
    && containsAny(normalizedText, ['اجمالي', 'إجمالي', 'مجموع', 'ارصده', 'أرصدة', ...DEBTOR_BALANCE_WORDS, ...CREDITOR_BALANCE_WORDS]);

  if (branchQueryContext.hasUnauthorizedRequestedBranch && (wantsAggregateFromHint || wantsAggregateFromText) && aggregatePartyDefinition) {
    return buildDatabaseResponse({
      reply: formatUnauthorizedBranchAccessReply(branchQueryContext, { subjectLabel: `استعلام أرصدة ${aggregatePartyDefinition.pluralLabel || aggregatePartyDefinition.label}` }),
      actions: [],
      conversationState: { lastRoute: 'database' },
      queryPlan: buildAggregatePartyQueryPlan(aggregatePartyDefinition, {
        source: wantsAggregateFromHint ? queryPlanSource : 'local_safe_plan',
      }),
    });
  }

  if ((wantsAggregateFromHint || wantsAggregateFromText) && canComputePartyBalanceFromJournal(schema, aggregatePartyDefinition)) {
    const partyRows = getPartyBalanceRowsFromJournal(db, schema, aggregatePartyDefinition, branchOptions);
    const summary = buildSignedBalanceSummary(partyRows);
    const wantsDebtorsOnly = wantsAggregateFromHint
      ? hintedQueryPlan?.balanceSide === 'debtors'
      : (containsAny(normalizedText, DEBTOR_BALANCE_WORDS) && !containsAny(normalizedText, CREDITOR_BALANCE_WORDS));
    const wantsCreditorsOnly = wantsAggregateFromHint
      ? hintedQueryPlan?.balanceSide === 'creditors'
      : (containsAny(normalizedText, CREDITOR_BALANCE_WORDS) && !containsAny(normalizedText, DEBTOR_BALANCE_WORDS));
    return finalizeResponse({
      reply: formatAggregatePartyBalanceReply(aggregatePartyDefinition, summary, { wantsDebtorsOnly, wantsCreditorsOnly }),
      actions: [],
      data: { table: aggregatePartyDefinition.table, summary },
      conversationState: { lastRoute: 'database' },
      queryPlan: buildAggregatePartyQueryPlan(aggregatePartyDefinition, {
        wantsDebtorsOnly,
        wantsCreditorsOnly,
        source: wantsAggregateFromHint ? queryPlanSource : 'local_safe_plan',
      }),
    }, { branchSensitive: isEntityScoped(aggregatePartyDefinition) || journalBranchSensitive });
  }

  const wantsBoxBalances = hintedQueryPlan?.kind === 'box_balances'
    || (containsAny(normalizedText, ['صندوق', 'الصندوق', 'الصناديق', 'box', 'boxes']) && containsAny(normalizedText, ['رصيد', 'ارصده', 'أرصدة', 'اجمالي', 'إجمالي', 'مجموع']));
  if (branchQueryContext.hasUnauthorizedRequestedBranch && wantsBoxBalances) {
    return buildDatabaseResponse({
      reply: formatUnauthorizedBranchAccessReply(branchQueryContext, { subjectLabel: 'استعلام أرصدة الصناديق' }),
      actions: [],
      conversationState: { lastRoute: 'database' },
      queryPlan: buildBoxBalancesQueryPlan(normalizedText, { source: hintedQueryPlan?.kind === 'box_balances' ? queryPlanSource : 'local_safe_plan' }),
    });
  }
  if (wantsBoxBalances) {
    const boxRows = getBoxBalanceRows(db, schema, normalizedText, branchOptions);
    if (boxRows.length) {
      return finalizeResponse({
        reply: formatBoxBalanceReply(boxRows),
        actions: [],
        data: { boxes: boxRows },
        conversationState: { lastRoute: 'database' },
        queryPlan: buildBoxBalancesQueryPlan(normalizedText, { source: hintedQueryPlan?.kind === 'box_balances' ? queryPlanSource : 'local_safe_plan' }),
      }, { branchSensitive: isTableScoped('accounts') || journalBranchSensitive });
    }
  }

  const wantsSchemaTables = hintedQueryPlan?.kind === 'list_schema_tables' || containsAny(normalizedText, ['الجداول', 'السكيما', 'schema', 'tables']);
  if (wantsSchemaTables) {
    const tableNames = (schema.tables || []).map((table) => table.name).slice(0, 18);
    return buildDatabaseResponse({
      reply: tableNames.length ? `الجداول المفهرسة حالياً تشمل: ${tableNames.join('، ')}.` : 'لم أتمكن من قراءة جداول قاعدة البيانات حالياً.',
      actions: [],
      data: { tables: tableNames },
      queryPlan: buildSchemaTablesQueryPlan({ source: hintedQueryPlan?.kind === 'list_schema_tables' ? queryPlanSource : 'local_safe_plan' }),
    });
  }

  const wantsCount = hintedQueryPlan?.kind === 'count_records' || containsAny(normalizedText, ['كم عدد', 'عدد', 'اجمالي', 'إجمالي', 'مجموع', 'count']);
  if (wantsCount && !shouldHandleAsSpecificEntityQuestion(effectiveMessage, normalizedText, explicitEntityDefinition, conversationState, branchOptions)) {
    const hintedCountTable = hintedQueryPlan?.table || hintedEntityDefinition?.table || '';
    const matched = COUNT_QUERIES.find((item) => item.table === hintedCountTable)
      || COUNT_QUERIES.find((item) => containsAny(normalizedText, item.keywords.map((keyword) => normalizeArabic(keyword))));
    if (branchQueryContext.hasUnauthorizedRequestedBranch && matched && hasTable(schema, matched.table) && isTableScoped(matched.table)) {
      return buildDatabaseResponse({
        reply: formatUnauthorizedBranchAccessReply(branchQueryContext, { subjectLabel: `استعلام عدد ${matched.label}` }),
        actions: [],
        conversationState: { lastRoute: 'database' },
        queryPlan: buildCountQueryPlan(matched.table, { source: hintedQueryPlan?.kind === 'count_records' ? queryPlanSource : 'local_safe_plan' }),
      });
    }
    if (matched && hasTable(schema, matched.table)) {
      const total = runScalarCount(db, matched.table, schema, branchOptions);
      return finalizeResponse({
        reply: `إجمالي ${matched.label} الحالي هو ${total}.`,
        actions: [],
        data: { total, table: matched.table },
        queryPlan: buildCountQueryPlan(matched.table, { source: hintedQueryPlan?.kind === 'count_records' ? queryPlanSource : 'local_safe_plan' }),
      }, { branchSensitive: isTableScoped(matched.table) });
    }

    const groupedTables = Array.isArray(hintedQueryPlan?.tables) && hintedQueryPlan.tables.length
      ? hintedQueryPlan.tables.map((table) => ({ table, label: getTableDisplayLabel(table) }))
      : null;
    const groupedMatch = GROUP_COUNT_QUERIES.find((item) => containsAny(normalizedText, item.keywords.map((keyword) => normalizeArabic(keyword))));
    const groupedItems = groupedTables || groupedMatch?.tables || [];
    if (branchQueryContext.hasUnauthorizedRequestedBranch && groupedItems.length && groupedItems.some((item) => isTableScoped(item.table))) {
      const groupedLabel = groupedMatch?.label || hintedQueryPlan?.scope || 'السجلات المطلوبة';
      return buildDatabaseResponse({
        reply: formatUnauthorizedBranchAccessReply(branchQueryContext, { subjectLabel: `استعلام عدد ${groupedLabel}` }),
        actions: [],
        conversationState: { lastRoute: 'database' },
        queryPlan: buildGroupedCountQueryPlan(groupedMatch || { label: groupedLabel, tables: groupedItems }, {
          source: groupedTables ? queryPlanSource : 'local_safe_plan',
        }),
      });
    }
    if (groupedItems.length) {
      const grouped = runGroupedCount(db, schema, groupedItems, branchOptions);
      if (grouped.parts.length) {
        const groupedLabel = groupedMatch?.label || hintedQueryPlan?.scope || 'السجلات المطلوبة';
        return finalizeResponse({
          reply: grouped.parts.length > 1
            ? `إجمالي ${groupedLabel} الحالي هو ${grouped.total} (${formatGroupedBreakdown(grouped.parts)}).`
            : `إجمالي ${groupedLabel} الحالي هو ${grouped.total}.`,
          actions: [],
          data: { total: grouped.total, parts: grouped.parts },
          queryPlan: buildGroupedCountQueryPlan(groupedMatch || { label: groupedLabel, tables: groupedItems }, {
            source: groupedTables ? queryPlanSource : 'local_safe_plan',
          }),
        }, { branchSensitive: groupedItems.some((item) => isTableScoped(item.table)) });
      }
    }

    if (containsAny(normalizedText, ['الفواتير', 'فواتير', 'السندات', 'سندات', 'الطلبات', 'اوردرات', 'الأوردرات'])) {
      return buildDatabaseResponse({
        reply: 'فهمت أنك تسأل عن عدّ مستندات من قاعدة البيانات، لكن هذا النوع لم يكن مربوطاً بهذه الصيغة سابقاً. ربطت الآن دعم الفواتير والسندات العامة، وإذا استمر نفس السؤال بلا نتيجة فهناك حاجة لمراجعة أسماء الجداول الفعلية داخل قاعدة البيانات لهذه البيئة.',
        actions: [],
        queryPlan: groupedTables ? normalizeQueryPlan({ ...hintedQueryPlan, kind: 'grouped_count' }) : buildGroupedCountQueryPlan(groupedMatch, { source: 'local_safe_plan' }),
      });
    }
  }

  const hintedAccountTarget = accountHierarchyDefinition
    ? resolveEntityTargetFromQueryPlan(hintedQueryPlan, db, schema, accountHierarchyDefinition, branchOptions)
    : { definition: null, row: null, matches: [], searchTerm: '', requestedId: null, resolutionIssue: null };
  const accountHierarchyTarget = accountHierarchyDefinition
    ? ((hintedAccountTarget.row || hintedAccountTarget.matches?.length || hintedAccountTarget.searchTerm || hintedAccountTarget.resolutionIssue?.type === 'branch_scope')
      ? hintedAccountTarget
      : resolveEntityTarget(effectiveMessage, normalizedText, db, schema, accountHierarchyDefinition, conversationState, branchOptions))
    : { definition: null, row: null, matches: [], searchTerm: '', requestedId: null, resolutionIssue: null };

  if (accountHierarchyTarget.definition && accountHierarchyTarget.matches?.length > 1 && !accountHierarchyTarget.row && shouldTryAccountHierarchy) {
    return finalizeResponse({
      reply: `وجدت أكثر من حساب أب مطابق: ${formatEntityChoices(accountHierarchyTarget.matches, accountHierarchyTarget.definition)}. اذكر الاسم بشكل أدق أو اذكر الرقم.`,
      actions: [],
      conversationState: { lastRoute: 'database' },
      queryPlan: buildEntityBalanceQueryPlan(accountHierarchyTarget.definition, {}, {
        source: hintedAccountTarget.searchTerm ? queryPlanSource : 'local_safe_plan',
      }),
    }, { branchSensitive: isEntityScoped(accountHierarchyTarget.definition) });
  }

  if (accountHierarchyTarget.definition && !accountHierarchyTarget.row && (accountHierarchyTarget.searchTerm || accountHierarchyTarget.requestedId !== null) && shouldTryAccountHierarchy) {
    return finalizeResponse({
      reply: formatEntityTargetMissReply(accountHierarchyTarget.definition, accountHierarchyTarget),
      actions: isPromptableBranchScopeIssue(accountHierarchyTarget.resolutionIssue) ? buildBranchScopeExpansionActions(branchQueryContext) : [],
      conversationState: { lastRoute: 'database' },
      queryPlan: buildEntityBalanceQueryPlan(accountHierarchyTarget.definition, {}, {
        source: (hintedAccountTarget.searchTerm || hintedAccountTarget.requestedId !== null) ? queryPlanSource : 'local_safe_plan',
      }),
    }, { branchSensitive: isVisibleBranchScopeIssue(accountHierarchyTarget.resolutionIssue) });
  }

  if (accountHierarchyTarget.definition && accountHierarchyTarget.row) {
    const descendantAccounts = getDescendantAccountRows(db, schema, accountHierarchyTarget.row, branchOptions);
    if (shouldAnswerWithAccountHierarchy(normalizedText, accountHierarchyTarget.row, descendantAccounts)) {
      const descendantBalances = getAccountBalanceRowsByIds(db, schema, descendantAccounts, branchOptions);
      const summary = buildSignedBalanceSummary(descendantBalances);
      return finalizeResponse({
        reply: formatAccountHierarchyBalanceReply(accountHierarchyTarget.row, descendantBalances, summary),
        actions: [],
        data: {
          table: accountHierarchyTarget.definition.table,
          row: accountHierarchyTarget.row,
          children: descendantBalances,
          summary,
        },
        conversationState: { ...buildEntityFocusState(accountHierarchyTarget.definition, accountHierarchyTarget.row), lastRoute: 'database' },
        queryPlan: buildEntityBalanceQueryPlan(accountHierarchyTarget.definition, accountHierarchyTarget.row, {
          source: hintedAccountTarget.row ? queryPlanSource : 'local_safe_plan',
        }),
      }, { branchSensitive: isEntityScoped(accountHierarchyTarget.definition) || journalBranchSensitive });
    }
  }

  const hintedEntityTarget = resolveEntityTargetFromQueryPlan(hintedQueryPlan, db, schema, explicitEntityDefinition, branchOptions);
  const entityTarget = (hintedEntityTarget.row || hintedEntityTarget.matches?.length || hintedEntityTarget.searchTerm || hintedEntityTarget.resolutionIssue?.type === 'branch_scope')
    ? hintedEntityTarget
    : resolveEntityTarget(effectiveMessage, normalizedText, db, schema, explicitEntityDefinition, conversationState, branchOptions);

  if (entityTarget.definition && entityTarget.matches?.length > 1 && !entityTarget.row) {
    return finalizeResponse({
      reply: `وجدت أكثر من ${entityTarget.definition.label} مطابق: ${formatEntityChoices(entityTarget.matches, entityTarget.definition)}. اذكر الاسم بشكل أدق أو اذكر الرقم.`,
      actions: [],
      conversationState: { lastRoute: 'database' },
      queryPlan: buildEntityBalanceQueryPlan(entityTarget.definition, {}, {
        statement: hintedQueryPlan?.kind === 'entity_statement',
        source: hintedEntityTarget.searchTerm ? queryPlanSource : 'local_safe_plan',
      }),
    }, { branchSensitive: isEntityScoped(entityTarget.definition) });
  }

  if (entityTarget.definition && !entityTarget.row && (entityTarget.searchTerm || entityTarget.requestedId !== null)) {
    return finalizeResponse({
      reply: formatEntityTargetMissReply(entityTarget.definition, entityTarget),
      actions: isPromptableBranchScopeIssue(entityTarget.resolutionIssue) ? buildBranchScopeExpansionActions(branchQueryContext) : [],
      conversationState: { lastRoute: 'database' },
      queryPlan: buildEntityBalanceQueryPlan(entityTarget.definition, {}, {
        statement: hintedQueryPlan?.kind === 'entity_statement',
        source: (hintedEntityTarget.searchTerm || hintedEntityTarget.requestedId !== null) ? queryPlanSource : 'local_safe_plan',
      }),
    }, { branchSensitive: isVisibleBranchScopeIssue(entityTarget.resolutionIssue) });
  }

  const wantsLatest = hintedQueryPlan?.kind === 'latest_related_document' || containsAny(normalizedText, ['اخر', 'آخر', 'احدث', 'أحدث', 'latest', 'last', 'متى', 'تاريخ']);
  const documentDefinition = getDocumentDefinitionByType(hintedQueryPlan?.documentType || '') || resolveDocumentDefinitionForContext(normalizedText, entityTarget.definition || focusedEntityDefinition);
  if (branchQueryContext.hasUnauthorizedRequestedBranch && wantsLatest && documentDefinition) {
    const focusState = entityTarget.row ? buildEntityFocusState(entityTarget.definition, entityTarget.row) : buildFocusEntityState(conversationState.focusEntity);
    return buildDatabaseResponse({
      reply: formatUnauthorizedBranchAccessReply(branchQueryContext, { subjectLabel: `استعلام ${documentDefinition.label}` }),
      actions: [],
      conversationState: { lastRoute: 'database' },
      queryPlan: buildLatestDocumentQueryPlan(documentDefinition, focusState.focusEntity, {
        source: hintedQueryPlan?.kind === 'latest_related_document' ? queryPlanSource : 'local_safe_plan',
      }),
    });
  }
  if (wantsLatest && documentDefinition) {
    const focusState = entityTarget.row ? buildEntityFocusState(entityTarget.definition, entityTarget.row) : buildFocusEntityState(conversationState.focusEntity);
    const relatedRow = focusState?.focusEntity ? findLatestRelatedDocument(db, schema, documentDefinition, focusState.focusEntity, branchOptions) : null;
    const row = relatedRow || findLatestRow(db, schema, documentDefinition.table, getUnionColumns(schema, documentDefinition.table, [
      documentDefinition.preferredColumns || [],
      documentDefinition.dateColumns || [],
      documentDefinition.numberColumns || [],
      documentDefinition.amountColumns || [],
    ]), branchOptions);
    if (row) {
      return finalizeResponse({
        reply: relatedRow
          ? formatLatestDocumentReply(documentDefinition, row, focusState.focusEntity)
          : `آخر سجل في ${documentDefinition.pluralLabel}: ${formatRowDetails(row, getExistingColumns(schema, documentDefinition.table, documentDefinition.preferredColumns))}.`,
        actions: [],
        data: { table: documentDefinition.table, row },
        conversationState: { ...focusState, lastRoute: 'database' },
        queryPlan: buildLatestDocumentQueryPlan(documentDefinition, focusState.focusEntity, {
          source: hintedQueryPlan?.kind === 'latest_related_document' ? queryPlanSource : 'local_safe_plan',
        }),
      }, { branchSensitive: isTableScoped(documentDefinition.table) || isTableScoped(focusState?.focusEntity?.table || '') });
    }
  }

  if (entityTarget.definition && entityTarget.row) {
    if (containsAny(normalizedText, ['هل يوجد', 'هل موجود', 'موجود', 'exists'])) {
      const openStatementAction = buildOpenEntityStatementAction(entityTarget.definition, entityTarget.row, { branchQueryContext });
      return finalizeResponse({
        reply: `نعم، ${entityTarget.definition.label} ${getEntityDisplayName(entityTarget.row, entityTarget.definition) || `رقم ${entityTarget.row.id}`} موجود في قاعدة البيانات.`,
        actions: openStatementAction ? [openStatementAction] : [],
        conversationState: { ...buildEntityFocusState(entityTarget.definition, entityTarget.row), lastRoute: 'database' },
        queryPlan: buildEntityBalanceQueryPlan(entityTarget.definition, entityTarget.row, {
          source: hintedEntityTarget.row ? queryPlanSource : 'local_safe_plan',
        }),
      }, { branchSensitive: isEntityScoped(entityTarget.definition) });
    }

    const computedBalance = findEntityJournalBalance(db, schema, entityTarget.definition, entityTarget.row.id, branchOptions);
    const balanceSummary = formatComputedBalanceSummary(computedBalance, entityTarget.definition).length
      ? formatComputedBalanceSummary(computedBalance, entityTarget.definition)
      : formatBalanceSummary(entityTarget.row, schema, entityTarget.definition);
    const displayName = getEntityDisplayName(entityTarget.row, entityTarget.definition) || `رقم ${entityTarget.row.id}`;
    const detailColumns = getEntityDetailColumns(schema, entityTarget.definition);
    const detailText = formatRowDetails(entityTarget.row, detailColumns);
    const wantsStatementFromHint = hintedQueryPlan?.kind === 'entity_statement';
    const wantsBalanceFromHint = hintedQueryPlan?.kind === 'entity_balance' || wantsStatementFromHint;
    const wantsBalance = wantsBalanceFromHint || containsAny(normalizedText, ['رصيد', 'حساب', 'مديونيه', 'مديونية', 'مدين', 'دائن', 'له', 'عليه', 'كشف حساب']);
    const wantsEntityDetails = !wantsBalanceFromHint && (containsAny(normalizedText, ['تفاصيل', 'بيانات', 'معلومات', 'اسم', 'رقم']) || !wantsLatest);
    const wantsStatement = wantsStatementFromHint || containsAny(normalizedText, ['كشف حساب']);
    const openStatementAction = buildOpenEntityStatementAction(entityTarget.definition, entityTarget.row, { branchQueryContext });

    if (wantsBalance && balanceSummary.length) {
      const followHints = [];
      if (entityTarget.definition.kind === 'customer' || entityTarget.definition.kind === 'supplier') {
        followHints.push('إذا أردت أستطيع أيضاً إخبارك بآخر فاتورة مرتبطة به.');
      }
      if (openStatementAction) {
        followHints.push(wantsStatement
          ? 'يمكنني فتح كشف الحساب المحدد الآن مباشرة من زر الإجراء.'
          : 'ويمكنني فتح كشف حسابه الآن مباشرة في شاشة التقارير.');
      }
      return finalizeResponse({
        reply: formatSingleEntityBalanceReply(entityTarget.definition, displayName, balanceSummary, { followHints }),
        actions: openStatementAction ? [openStatementAction] : [],
        data: { table: entityTarget.definition.table, row: entityTarget.row, balances: computedBalance },
        conversationState: { ...buildEntityFocusState(entityTarget.definition, entityTarget.row), lastRoute: 'database' },
        queryPlan: buildEntityBalanceQueryPlan(entityTarget.definition, entityTarget.row, {
          statement: wantsStatement,
          source: hintedEntityTarget.row ? queryPlanSource : 'local_safe_plan',
        }),
      }, { branchSensitive: isEntityScoped(entityTarget.definition) || journalBranchSensitive });
    }

    if (wantsEntityDetails) {
      return finalizeResponse({
        reply: `بيانات ${entityTarget.definition.label} ${displayName}: ${detailText}.`,
        actions: openStatementAction ? [openStatementAction] : [],
        data: { table: entityTarget.definition.table, row: entityTarget.row },
        conversationState: { ...buildEntityFocusState(entityTarget.definition, entityTarget.row), lastRoute: 'database' },
        queryPlan: buildEntityBalanceQueryPlan(entityTarget.definition, entityTarget.row, {
          source: hintedEntityTarget.row ? queryPlanSource : 'local_safe_plan',
        }),
      }, { branchSensitive: isEntityScoped(entityTarget.definition) });
    }
  }

  if (branchQueryContext.hasUnauthorizedRequestedBranch && explicitEntityDefinition && !entityTarget.row && !entityTarget.searchTerm && !conversationState?.focusEntity?.id) {
    return buildDatabaseResponse({
      reply: formatUnauthorizedBranchAccessReply(branchQueryContext, { subjectLabel: `طلب بيانات ${explicitEntityDefinition.label}` }),
      actions: [],
      conversationState: { lastRoute: 'database' },
      queryPlan: buildEntityBalanceQueryPlan(explicitEntityDefinition, {}, {
        statement: hintedQueryPlan?.kind === 'entity_statement',
        source: hintedEntityDefinition ? queryPlanSource : 'local_safe_plan',
      }),
    });
  }

  if (explicitEntityDefinition && !entityTarget.row && !entityTarget.searchTerm && !conversationState?.focusEntity?.id) {
    return finalizeResponse({
      reply: `اذكر اسم ${explicitEntityDefinition.label} أو رقمه حتى أستطيع إرجاع البيانات الدقيقة من قاعدة البيانات.`,
      actions: [],
      conversationState: { lastRoute: 'database' },
      queryPlan: buildEntityBalanceQueryPlan(explicitEntityDefinition, {}, {
        statement: hintedQueryPlan?.kind === 'entity_statement',
        source: hintedEntityDefinition ? queryPlanSource : 'local_safe_plan',
      }),
    }, { branchSensitive: isEntityScoped(explicitEntityDefinition) });
  }

  if (branchQueryContext.hasUnauthorizedRequestedBranch && containsAny(normalizedText, ['كشف حساب', 'رصيد', 'حركه', 'الحركه', 'تقرير', 'تقارير', 'استعلام'])) {
    return buildDatabaseResponse({
      reply: formatUnauthorizedBranchAccessReply(branchQueryContext, { subjectLabel: 'هذا الاستعلام' }),
      actions: [],
      conversationState: { lastRoute: 'database' },
      queryPlan: hintedQueryPlan || normalizeQueryPlan({
        kind: 'entity_statement',
        entityType: explicitEntityDefinition?.kind || '',
        source: hintedQueryPlan ? queryPlanSource : 'local_safe_plan',
      }),
    });
  }

  if (containsAny(normalizedText, ['كشف حساب', 'رصيد', 'حركه', 'الحركه', 'تقرير', 'تقارير', 'استعلام'])) {
    return buildDatabaseResponse({
      reply: 'هذا الطلب ينتمي لمسار التقارير والاستعلامات. بنيت الآن طبقة آمنة للعدّ، تفاصيل بعض الكيانات، وآخر السجلات الرئيسية، أما الكشوفات والأرصدة التفصيلية فسيتم توسيعها بقوالب آمنة مخصصة دون السماح بـ SQL الحر.',
      actions: [{ type: 'open_tab', tabId: 'tab-reports', label: 'التقارير' }],
      conversationState: { lastRoute: 'database' },
      queryPlan: hintedQueryPlan || normalizeQueryPlan({
        kind: 'entity_statement',
        entityType: explicitEntityDefinition?.kind || '',
        source: hintedQueryPlan ? queryPlanSource : 'local_safe_plan',
      }),
    });
  }

  return null;
}

module.exports = {
  answerDatabase,
  COUNT_QUERIES,
  // Helpers exported for advanced routing (e.g. statement export via aiAgent)
  getEntityDefinitionByTable,
  getEntityDefinitionByKind,
  getEffectiveBranchQueryContext,
  resolveEntityTarget,
  resolveEntityDefinition,
  resolveEntityTargetFromDb: (message = '', normalizedText = '', db, definition = null, conversationState = {}, context = {}) => {
    if (!db || !definition) {
      return { definition: null, row: null, matches: [], searchTerm: '', requestedId: null, resolutionIssue: null };
    }
    const schema = loadSchema(db);
    const effectiveNormalizedText = String(normalizedText || normalizeArabic(message)).trim();
    const branchQueryContext = getEffectiveBranchQueryContext(effectiveNormalizedText, { ...context, db, schema });
    const branchOptions = {
      ...getBranchQueryOptions(branchQueryContext),
      branchQueryContext,
    };
    return resolveEntityTarget(message, effectiveNormalizedText, db, schema, definition, conversationState, branchOptions);
  },
  getEntityDisplayName,
  formatEntityChoices,
  formatEntityTargetMissReply,
};

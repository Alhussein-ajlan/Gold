// ===============================================
// Chart of Accounts - Professional Tree View
// شجرة الحسابات - تصميم احترافي
// With Translation System (i18n)
// ===============================================

// ========== Translation System ==========
const COA_TRANSLATIONS = {
  ar: {
    // Page
    pageTitle: 'شجرة الحسابات',
    pageSubtitle: 'Chart of Accounts',
    
    // Header actions
    searchPlaceholder: 'بحث عن حساب...',
    expandAll: 'توسيع الكل',
    collapseAll: 'طي الكل',
    refresh: 'تحديث',
    addAccount: 'إضافة حساب',
    
    // Stats
    assets: 'الأصول',
    liabilities: 'الخصوم',
    equity: 'حقوق الملكية',
    revenue: 'الإيرادات',
    expenses: 'المصروفات',
    
    // Tree panel
    accounts: 'الحسابات',
    accountCount: '{count} حساب',
    loading: 'جاري التحميل...',
    
    // Details panel
    accountDetails: 'تفاصيل الحساب',
    selectAccount: 'اختر حساباً لعرض تفاصيله',
    accountType: 'نوع الحساب',
    nature: 'الطبيعة',
    level: 'المستوى',
    parentAccount: 'الحساب الأب',
    branch: 'الفرع',
    balance: 'الرصيد',
    status: 'الحالة',
    edit: 'تعديل',
    addChild: 'إضافة فرعي',
    delete: 'حذف',
    
    // Account types
    typeAsset: 'أصول',
    typeLiability: 'خصوم',
    typeEquity: 'حقوق ملكية',
    typeRevenue: 'إيرادات',
    typeExpense: 'مصروفات',
    
    // Nature
    debit: 'مدين',
    credit: 'دائن',
    
    // Status
    active: 'نشط',
    inactive: 'غير نشط',
    
    // Badges
    system: 'نظام',
    parent: 'رئيسي',
    shared: 'مشترك',
    shareAcrossBranches: 'مشترك بين جميع الفروع',
    noParent: 'بدون أب',
    
    // Modal - Add/Edit
    addNewAccount: 'إضافة حساب جديد',
    editAccount: 'تعديل الحساب',
    accountCode: 'رمز الحساب',
    parentAccountSelect: 'الحساب الأب',
    mainAccount: '-- حساب رئيسي --',
    nameAr: 'اسم الحساب (عربي)',
    nameEn: 'اسم الحساب (إنجليزي)',
    type: 'نوع الحساب',
    natureForm: 'الطبيعة',
    description: 'الوصف',
    isParent: 'حساب رئيسي (له فروع)',
    isActive: 'نشط',
    cancel: 'إلغاء',
    save: 'حفظ',
    
    // Delete modal
    confirmDelete: 'تأكيد الحذف',
    deleteWarning: 'هل أنت متأكد من حذف هذا الحساب؟',
    
    // Toast messages
    accountAdded: 'تم إضافة الحساب بنجاح',
    accountUpdated: 'تم تحديث الحساب بنجاح',
    accountDeleted: 'تم حذف الحساب بنجاح',
    errorOccurred: 'حدث خطأ',
    cannotDeleteParent: 'لا يمكن حذف حساب له فروع',
    cannotDeleteSystem: 'لا يمكن حذف حساب نظام',
    codeRequired: 'رمز الحساب مطلوب',
    nameRequired: 'اسم الحساب مطلوب',
    codeExists: 'رمز الحساب موجود مسبقاً',
    loadError: 'فشل في تحميل الحسابات',
    connectionError: 'فشل في الاتصال بقاعدة البيانات',
    
    // Last update
    lastUpdate: 'آخر تحديث',
  },
  en: {
    // Page
    pageTitle: 'Chart of Accounts',
    pageSubtitle: 'شجرة الحسابات',
    
    // Header actions
    searchPlaceholder: 'Search for account...',
    expandAll: 'Expand All',
    collapseAll: 'Collapse All',
    refresh: 'Refresh',
    addAccount: 'Add Account',
    
    // Stats
    assets: 'Assets',
    liabilities: 'Liabilities',
    equity: 'Equity',
    revenue: 'Revenue',
    expenses: 'Expenses',
    
    // Tree panel
    accounts: 'Accounts',
    accountCount: '{count} accounts',
    loading: 'Loading...',
    
    // Details panel
    accountDetails: 'Account Details',
    selectAccount: 'Select an account to view details',
    accountType: 'Account Type',
    nature: 'Nature',
    level: 'Level',
    parentAccount: 'Parent Account',
    branch: 'Branch',
    balance: 'Balance',
    status: 'Status',
    edit: 'Edit',
    addChild: 'Add Child',
    delete: 'Delete',
    
    // Account types
    typeAsset: 'Asset',
    typeLiability: 'Liability',
    typeEquity: 'Equity',
    typeRevenue: 'Revenue',
    typeExpense: 'Expense',
    
    // Nature
    debit: 'Debit',
    credit: 'Credit',
    
    // Status
    active: 'Active',
    inactive: 'Inactive',
    
    // Badges
    system: 'System',
    parent: 'Parent',
    shared: 'Shared',
    shareAcrossBranches: 'Shared across all branches',
    noParent: 'No Parent',
    
    // Modal - Add/Edit
    addNewAccount: 'Add New Account',
    editAccount: 'Edit Account',
    accountCode: 'Account Code',
    parentAccountSelect: 'Parent Account',
    mainAccount: '-- Main Account --',
    nameAr: 'Account Name (Arabic)',
    nameEn: 'Account Name (English)',
    type: 'Account Type',
    natureForm: 'Nature',
    description: 'Description',
    isParent: 'Parent Account (has children)',
    isActive: 'Active',
    cancel: 'Cancel',
    save: 'Save',
    
    // Delete modal
    confirmDelete: 'Confirm Delete',
    deleteWarning: 'Are you sure you want to delete this account?',
    
    // Toast messages
    accountAdded: 'Account added successfully',
    accountUpdated: 'Account updated successfully',
    accountDeleted: 'Account deleted successfully',
    errorOccurred: 'An error occurred',
    cannotDeleteParent: 'Cannot delete account with children',
    cannotDeleteSystem: 'Cannot delete system account',
    codeRequired: 'Account code is required',
    nameRequired: 'Account name is required',
    codeExists: 'Account code already exists',
    loadError: 'Failed to load accounts',
    connectionError: 'Failed to connect to database',
    
    // Last update
    lastUpdate: 'Last update',
  }
};

// Translation helper functions
function getLang() {
  try {
    return localStorage.getItem('uiLang') === 'en' ? 'en' : 'ar';
  } catch(_) {
    return 'ar';
  }
}

function t(key) {
  const lang = getLang();
  return COA_TRANSLATIONS[lang]?.[key] || COA_TRANSLATIONS['ar'][key] || key;
}

// ========== Global State ==========
let allAccounts = [];
let selectedAccount = null;
let editMode = false;
let expandedNodes = new Set();
let defaultBoxes = { cash: null, gold: null, worked_gold: null, silver: null, diamond: null }; // الصناديق الافتراضية

// Box type detection based on parent code prefix
// صناديق النقد: تحت 111 (مثل 1111, 1112, 1113, 1114)
// صناديق الذهب: تحت 1121 (مثل 11211, 11212, ...)
// صناديق المشغول: تحت 1122 (مثل 11221, 11222, ...)
// صناديق الفضة: تحت 1123 (مثل 11231, 11232, ...)
// صناديق الألماس: تحت 1124 (مثل 11241, 11242, ...)

// Account type configuration
const ACCOUNT_TYPES = {
  asset: { icon: 'fa-building-columns', class: 'asset' },
  liability: { icon: 'fa-hand-holding-dollar', class: 'liability' },
  equity: { icon: 'fa-landmark', class: 'equity' },
  revenue: { icon: 'fa-arrow-trend-up', class: 'revenue' },
  expense: { icon: 'fa-arrow-trend-down', class: 'expense' }
};

// ========== DOM Elements ==========
const elements = {};

function initElements() {
  elements.searchInput = document.getElementById('searchInput');
  elements.clearSearch = document.getElementById('clearSearch');
  elements.btnExpandAll = document.getElementById('btnExpandAll');
  elements.btnCollapseAll = document.getElementById('btnCollapseAll');
  elements.btnRefresh = document.getElementById('btnRefresh');
  elements.btnAddAccount = document.getElementById('btnAddAccount');
  elements.accountsTree = document.getElementById('accountsTree');
  elements.loadingIndicator = document.getElementById('loadingIndicator');
  elements.accountCount = document.getElementById('accountCount');
  elements.noSelection = document.getElementById('noSelection');
  elements.accountDetails = document.getElementById('accountDetails');
  elements.toastWrap = document.getElementById('toastWrap');
  
  // Last update bar
  elements.lastUpdateLabel = document.getElementById('lastUpdateLabel');
  elements.lastUpdateTime = document.getElementById('lastUpdateTime');
  
  // Stats
  elements.statAssetsValue = document.getElementById('statAssetsValue');
  elements.statLiabilitiesValue = document.getElementById('statLiabilitiesValue');
  elements.statEquityValue = document.getElementById('statEquityValue');
  elements.statRevenueValue = document.getElementById('statRevenueValue');
  elements.statExpensesValue = document.getElementById('statExpensesValue');
  
  // Detail elements
  elements.detailIcon = document.getElementById('detailIcon');
  elements.detailName = document.getElementById('detailName');
  elements.detailNameEn = document.getElementById('detailNameEn');
  elements.detailCode = document.getElementById('detailCode');
  elements.detailType = document.getElementById('detailType');
  elements.detailNature = document.getElementById('detailNature');
  elements.detailLevel = document.getElementById('detailLevel');
  elements.detailParent = document.getElementById('detailParent');
  elements.detailBranch = document.getElementById('detailBranch');
  elements.detailBalance = document.getElementById('detailBalance');
  elements.detailStatus = document.getElementById('detailStatus');
  
  // Detail action buttons
  elements.btnEditAccount = document.getElementById('btnEditAccount');
  elements.btnAddChild = document.getElementById('btnAddChild');
  elements.btnDeleteAccount = document.getElementById('btnDeleteAccount');

  // Modal elements
  elements.accountModal = document.getElementById('accountModal');
  elements.modalTitle = document.getElementById('modalTitle');
  elements.modalClose = document.getElementById('modalClose');
  elements.accountForm = document.getElementById('accountForm');
  elements.accountCode = document.getElementById('accountCode');
  elements.parentAccount = document.getElementById('parentAccount');
  elements.accountName = document.getElementById('accountName');
  elements.accountNameEn = document.getElementById('accountNameEn');
  elements.accountType = document.getElementById('accountType');
  elements.accountNature = document.getElementById('accountNature');
  elements.accountDescription = document.getElementById('accountDescription');
  elements.isParent = document.getElementById('isParent');
  elements.shareAcrossBranches = document.getElementById('shareAcrossBranches');
  elements.isActive = document.getElementById('isActive');
  elements.btnCancel = document.getElementById('btnCancel');
  elements.btnSave = document.getElementById('btnSave');
  
  elements.deleteModal = document.getElementById('deleteModal');
  elements.deleteModalClose = document.getElementById('deleteModalClose');
  elements.deleteAccountName = document.getElementById('deleteAccountName');
  elements.deleteCancel = document.getElementById('deleteCancel');
  elements.deleteConfirm = document.getElementById('deleteConfirm');
}

// ========== Apply Translations ==========
function applyTranslations() {
  const lang = getLang();
  const isRtl = lang === 'ar';
  
  document.documentElement.lang = lang;
  document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  document.body.dir = isRtl ? 'rtl' : 'ltr';
  
  // Helper function
  const setText = (id, key) => {
    const el = document.getElementById(id);
    if (el) el.textContent = t(key);
  };
  
  const setPlaceholder = (id, key) => {
    const el = document.getElementById(id);
    if (el) el.placeholder = t(key);
  };
  
  const setTitle = (id, key) => {
    const el = document.getElementById(id);
    if (el) el.title = t(key);
  };
  
  // Page title
  setText('pageTitle', 'pageTitle');
  setText('pageSubtitle', 'pageSubtitle');
  
  // Header actions
  setPlaceholder('searchInput', 'searchPlaceholder');
  setTitle('btnExpandAll', 'expandAll');
  setTitle('btnCollapseAll', 'collapseAll');
  setTitle('btnRefresh', 'refresh');
  setText('btnAddAccountText', 'addAccount');
  
  // Stats labels
  setText('statAssetsLabel', 'assets');
  setText('statLiabilitiesLabel', 'liabilities');
  setText('statEquityLabel', 'equity');
  setText('statRevenueLabel', 'revenue');
  setText('statExpensesLabel', 'expenses');
  
  // Tree panel
  setText('treePanelTitle', 'accounts');
  setText('loadingText', 'loading');
  
  // Details panel
  setText('detailsPanelTitle', 'accountDetails');
  setText('noSelectionText', 'selectAccount');
  setText('labelAccountType', 'accountType');
  setText('labelNature', 'nature');
  setText('labelLevel', 'level');
  setText('labelParent', 'parentAccount');
  setText('labelBranch', 'branch');
  setText('labelBalance', 'balance');
  setText('labelStatus', 'status');
  setText('btnEditText', 'edit');
  setText('btnAddChildText', 'addChild');
  setText('btnDeleteText', 'delete');
  
  // Modal - Add/Edit
  setText('labelCode', 'accountCode');
  setText('labelParentAccount', 'parentAccountSelect');
  setText('labelNameAr', 'nameAr');
  setText('labelNameEn', 'nameEn');
  setText('labelType', 'type');
  setText('labelNatureForm', 'natureForm');
  setText('labelDescription', 'description');
  setText('labelIsParent', 'isParent');
  setText('labelShareAcrossBranches', 'shareAcrossBranches');
  setText('labelIsActive', 'isActive');
  setText('btnCancelText', 'cancel');
  setText('btnSaveText', 'save');
  
  // Delete modal
  setText('deleteModalTitle', 'confirmDelete');
  setText('deleteWarningText', 'deleteWarning');
  setText('deleteCancelText', 'cancel');
  setText('deleteConfirmText', 'delete');
  
  // Last update bar
  setText('lastUpdateLabel', 'lastUpdate');
  
  // Account type options
  const typeSelect = document.getElementById('accountType');
  if (typeSelect) {
    typeSelect.innerHTML = `
      <option value="asset">${t('typeAsset')}</option>
      <option value="liability">${t('typeLiability')}</option>
      <option value="equity">${t('typeEquity')}</option>
      <option value="revenue">${t('typeRevenue')}</option>
      <option value="expense">${t('typeExpense')}</option>
    `;
  }
  
  // Nature options
  const natureSelect = document.getElementById('accountNature');
  if (natureSelect) {
    natureSelect.innerHTML = `
      <option value="debit">${t('debit')}</option>
      <option value="credit">${t('credit')}</option>
    `;
  }
}

// ========== Wait for API ==========
async function waitForAccountsAPI(maxTries = 30, delayMs = 100) {
  for (let i = 0; i < maxTries; i++) {
    if (window.accounts && typeof window.accounts.getAccounts === 'function') {
      return true;
    }
    await new Promise(r => setTimeout(r, delayMs));
  }
  return false;
}

// ========== Initialize ==========
async function init() {
  initElements();
  applyTheme();
  applyTranslations();
  
  const apiReady = await waitForAccountsAPI();
  if (!apiReady) {
    showToast('error', t('connectionError'));
    showLoading(false);
    return;
  }
  
  setupEventListeners();
  await loadDefaultBoxes(); // تحميل الصناديق الافتراضية
  await loadAccounts();
}

// ========== Load Default Boxes ==========
async function loadDefaultBoxes() {
  try {
    const result = await window.accounts.getDefaultBoxes();
    if (result.success && result.data) {
      defaultBoxes = {
        cash: result.data.cash?.account_id || null,
        gold: result.data.gold?.account_id || null,
        worked_gold: result.data.worked_gold?.account_id || null,
        silver: result.data.silver?.account_id || null,
        diamond: result.data.diamond?.account_id || null
      };
    }
  } catch (error) {
    // Error loading default boxes
  }
}

// ========== Get Box Type for Account ==========
function getBoxType(account) {
  if (!account || !account.code) return null;
  const code = String(account.code);
  // صناديق النقد: تبدأ بـ 111 وليست الأب 111 نفسه
  if (code.startsWith('111') && code.length > 3) return 'cash';
  // صناديق الذهب: تبدأ بـ 1121 وليست الأب 1121 نفسه
  if (code.startsWith('1121') && code.length > 4) return 'gold';
  // صناديق المشغول: تبدأ بـ 1122 وليست الأب 1122 نفسه
  if (code.startsWith('1122') && code.length > 4) return 'worked_gold';
  // صناديق الفضة: تبدأ بـ 1123 وليست الأب 1123 نفسه
  if (code.startsWith('1123') && code.length > 4) return 'silver';
  // صناديق الألماس والأحجار: تبدأ بـ 1124 وليست الأب 1124 نفسه
  if (code.startsWith('1124') && code.length > 4) return 'diamond';
  return null;
}

// ========== Check if Account is Default Box ==========
function isDefaultBox(account) {
  if (!account) return false;
  const boxType = getBoxType(account);
  if (!boxType) return false;
  return defaultBoxes[boxType] === account.id;
}

// ========== Set Default Box ==========
async function setDefaultBox(account) {
  const boxType = getBoxType(account);
  if (!boxType) return;
  
  // فحص إذا كان الحساب غير نشط
  let wasActivated = false;
  if (account.active === 0) {
    // عرض موديول تأكيد تنشيط الحساب
    let confirmed = false;
    if (window.showActivateAccountConfirm) {
      confirmed = await window.showActivateAccountConfirm(account.name);
    } else {
      confirmed = confirm(`الحساب "${account.name}" غير نشط. هل تريد تنشيطه وتعيينه كصندوق افتراضي؟`);
    }
    
    if (!confirmed) return;
    
    // تنشيط الحساب أولاً
    try {
      const activateResult = await window.accounts.updateAccount({
        id: account.id,
        active: 1
      });
      if (!activateResult.success) {
        showToast('error', 'فشل تنشيط الحساب');
        return;
      }
      // تحديث الحساب محلياً
      account.active = 1;
      wasActivated = true;
    } catch (e) {
      showToast('error', 'فشل تنشيط الحساب');
      return;
    }
  }
  
  try {
    const result = await window.accounts.setDefaultBox(boxType, account.id);
    if (result.success) {
      defaultBoxes[boxType] = account.id;
      renderTree(elements.searchInput?.value || '');
      if (wasActivated) {
        showToast('success', `تم تنشيط وتعيين "${account.name}" كصندوق افتراضي`);
      } else {
        showToast('success', `تم تعيين "${account.name}" كصندوق افتراضي`);
      }
    } else {
      showToast('error', result.error || 'حدث خطأ');
    }
  } catch (error) {
    showToast('error', 'حدث خطأ في تعيين الصندوق الافتراضي');
  }
}

// ========== Theme ==========
function applyTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }
}

function getStoredCurrentBranchContext() {
  try {
    const runtimeBranch = window.currentBranchContext;
    const runtimeBranchId = Number(runtimeBranch?.id || runtimeBranch?.branch_id || runtimeBranch?.branchId || 0) || 0;
    if (runtimeBranchId > 0) {
      return runtimeBranch;
    }
  } catch (_) {
  }
  try {
    const raw = localStorage.getItem('currentBranch');
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

function getCurrentAccountBranchId() {
  try {
    const scopedBranchId = Number(window.currentBranchScopeContext?.branchId || window.currentBranchScopeContext?.branch_id || 0) || 0;
    if (scopedBranchId > 0) {
      return scopedBranchId;
    }
  } catch (_) {
  }
  const currentBranch = getStoredCurrentBranchContext();
  const branchId = Number(currentBranch?.id || currentBranch?.branch_id || currentBranch?.branchId || 0) || 0;
  return branchId > 0 ? branchId : null;
}

function getSelectedParentAccount() {
  const parentId = Number(elements.parentAccount?.value || 0) || 0;
  if (!parentId) {
    return null;
  }
  return allAccounts.find((account) => account.id === parentId) || null;
}

function isAccountSharedAcrossBranches(account = {}) {
  return Number(account?.is_system || 0) === 1
    || Number(account?.is_parent || 0) === 1
    || Number(account?.is_shared_across_branches || 0) === 1
    || account?.branch_id === null
    || account?.branch_id === undefined;
}

function getAccountTreeBranchText(account = {}) {
  if (!account || isAccountSharedAcrossBranches(account) || Number(account?.is_parent || 0) === 1) {
    return '';
  }
  const branchCode = String(account?.branch_code || '').trim();
  const branchName = String(account?.branch_name || '').trim();
  if (branchCode && branchName) {
    return `${branchCode} - ${branchName}`;
  }
  return branchName || branchCode || '';
}

function getAccountDetailsBranchText(account = {}) {
  if (!account || isAccountSharedAcrossBranches(account)) {
    return t('shareAcrossBranches');
  }
  return getAccountTreeBranchText(account) || String(account?.branch_id || '').trim() || t('shareAcrossBranches');
}

function updateShareAcrossBranchesControl() {
  const control = elements.shareAcrossBranches;
  if (!control) {
    return;
  }
  const parent = getSelectedParentAccount();
  const editingAccount = editMode ? selectedAccount : null;
  const editingHasChildren = editingAccount ? allAccounts.some((account) => account.parent_id === editingAccount.id) : false;
  const forceShared = Boolean(elements.isParent?.checked)
    || editingHasChildren
    || Number(editingAccount?.is_system || 0) === 1;
  const parentForcesBranchSpecific = parent && !isAccountSharedAcrossBranches(parent);

  if (forceShared) {
    control.checked = true;
  } else if (parentForcesBranchSpecific) {
    control.checked = false;
  }

  control.disabled = forceShared || parentForcesBranchSpecific;
  const label = control.closest('.checkbox-label');
  if (label) {
    label.style.opacity = control.disabled ? '0.65' : '1';
    label.style.cursor = control.disabled ? 'not-allowed' : 'pointer';
  }
}

function resolveAccountBranchSelection() {
  const selectedParent = getSelectedParentAccount();
  if (elements.isParent?.checked) {
    return { includeBranchId: true, branchId: null };
  }
  if (elements.shareAcrossBranches?.checked) {
    return { includeBranchId: true, branchId: null };
  }
  if (selectedParent && !isAccountSharedAcrossBranches(selectedParent)) {
    return { includeBranchId: true, branchId: selectedParent.branch_id ?? null };
  }
  if (editMode && selectedAccount && !isAccountSharedAcrossBranches(selectedAccount)) {
    return { includeBranchId: true, branchId: selectedAccount.branch_id ?? null };
  }
  const currentBranchId = getCurrentAccountBranchId();
  if (currentBranchId) {
    return { includeBranchId: true, branchId: currentBranchId };
  }
  return { includeBranchId: false, branchId: null };
}

// ========== Event Listeners ==========
function setupEventListeners() {
  // Search
  elements.searchInput?.addEventListener('input', handleSearch);
  elements.clearSearch?.addEventListener('click', clearSearch);
  
  // Tree actions
  elements.btnExpandAll?.addEventListener('click', expandAll);
  elements.btnCollapseAll?.addEventListener('click', collapseAll);
  elements.btnRefresh?.addEventListener('click', () => loadAccounts());
  elements.btnAddAccount?.addEventListener('click', () => openAddModal());
  
  // Detail actions
  elements.btnEditAccount?.addEventListener('click', () => openEditModal());
  elements.btnAddChild?.addEventListener('click', () => openAddChildModal());
  elements.btnDeleteAccount?.addEventListener('click', () => openDeleteModal());
  
  // Modal
  elements.modalClose?.addEventListener('click', closeModal);
  elements.btnCancel?.addEventListener('click', closeModal);
  elements.btnSave?.addEventListener('click', saveAccount);
  elements.accountModal?.addEventListener('click', (e) => {
    if (e.target === elements.accountModal) closeModal();
  });
  
  // Parent account change - auto set type and nature
  elements.parentAccount?.addEventListener('change', handleParentChange);
  elements.isParent?.addEventListener('change', updateShareAcrossBranchesControl);
  
  // Delete modal
  elements.deleteModalClose?.addEventListener('click', closeDeleteModal);
  elements.deleteCancel?.addEventListener('click', closeDeleteModal);
  elements.deleteConfirm?.addEventListener('click', confirmDelete);
  elements.deleteModal?.addEventListener('click', (e) => {
    if (e.target === elements.deleteModal) closeDeleteModal();
  });
}

// ========== Load Accounts ==========
async function loadAccounts() {
  showLoading(true);
  
  try {
    const result = await window.accounts.getAccounts();
    if (result.success) {
      allAccounts = result.data || [];
      renderTree();
      updateStats();
      updateAccountCount();
      updateLastUpdateTime();
      
      if (selectedAccount) {
        const updated = allAccounts.find(a => a.id === selectedAccount.id);
        if (updated) {
          selectAccount(updated);
        } else {
          clearSelection();
        }
      }
    } else {
      showToast('error', t('loadError'));
    }
  } catch (error) {
    console.error('Error loading accounts:', error);
    showToast('error', t('loadError'));
  }
  
  showLoading(false);
}

// ========== Render Tree ==========
function renderTree(searchTerm = '') {
  if (!elements.accountsTree) return;
  
  const rootAccounts = allAccounts.filter(a => !a.parent_id);
  rootAccounts.sort((a, b) => (a.code || '').localeCompare(b.code || ''));
  
  elements.accountsTree.innerHTML = '';
  
  rootAccounts.forEach(account => {
    const item = createTreeItem(account, searchTerm);
    if (item) elements.accountsTree.appendChild(item);
  });
}

function createTreeItem(account, searchTerm = '') {
  const children = allAccounts.filter(a => a.parent_id === account.id);
  children.sort((a, b) => (a.code || '').localeCompare(b.code || ''));
  
  const hasChildren = children.length > 0;
  const isExpanded = expandedNodes.has(account.id);
  const isSelected = selectedAccount?.id === account.id;
  const typeConfig = ACCOUNT_TYPES[account.account_type] || ACCOUNT_TYPES.asset;
  
  // Search filter
  const matchesSearch = !searchTerm || 
    (account.name && account.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (account.name_en && account.name_en.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (account.code && account.code.includes(searchTerm));
  
  const childrenMatch = children.some(child => {
    const childMatches = (child.name && child.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (child.name_en && child.name_en.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (child.code && child.code.includes(searchTerm));
    return childMatches || hasMatchingDescendants(child, searchTerm);
  });
  
  if (searchTerm && !matchesSearch && !childrenMatch) {
    return null;
  }
  
  const li = document.createElement('li');
  li.className = 'tree-item';
  li.dataset.id = account.id;
  
  // Node
  const node = document.createElement('div');
  node.className = `tree-node${isSelected ? ' selected' : ''}`;
  
  // Toggle
  const toggle = document.createElement('span');
  toggle.className = `tree-toggle${isExpanded ? ' expanded' : ''}${!hasChildren ? ' hidden' : ''}`;
  toggle.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleNode(account.id);
  });
  
  // Icon
  const icon = document.createElement('span');
  icon.className = `tree-icon ${typeConfig.class}`;
  icon.innerHTML = `<i class="fa-solid ${typeConfig.icon}"></i>`;
  
  // Info
  const info = document.createElement('div');
  info.className = 'tree-info';
  
  const name = document.createElement('div');
  name.className = 'tree-name';
  
  const nameText = searchTerm ? highlightText(account.name, searchTerm) : account.name;
  const codeText = searchTerm ? highlightText(account.code, searchTerm) : account.code;
  
  name.innerHTML = `<span class="tree-code">${codeText}</span> ${nameText}`;
  
  // Badges
  if (account.is_system) {
    name.innerHTML += `<span class="tree-badge system">${t('system')}</span>`;
  }
  if (account.is_parent) {
    name.innerHTML += `<span class="tree-badge parent">${t('parent')}</span>`;
  }
  if (!account.is_system && account.is_shared_across_branches) {
    name.innerHTML += `<span class="tree-badge shared">${t('shared')}</span>`;
  }
  
  const meta = document.createElement('div');
  meta.className = 'tree-meta';
  const englishName = String(account.name_en || '').trim();
  const branchText = getAccountTreeBranchText(account);
  if (englishName) {
    const englishMeta = document.createElement('span');
    englishMeta.textContent = englishName;
    meta.appendChild(englishMeta);
  }
  if (branchText) {
    const branchMeta = document.createElement('span');
    branchMeta.className = 'tree-meta-branch';
    const branchIcon = document.createElement('i');
    branchIcon.className = 'fa-solid fa-code-branch';
    const branchLabel = document.createElement('span');
    branchLabel.textContent = branchText;
    branchMeta.appendChild(branchIcon);
    branchMeta.appendChild(branchLabel);
    meta.appendChild(branchMeta);
  }
  
  info.appendChild(name);
  if (englishName || branchText) {
    info.appendChild(meta);
  }
  
  node.appendChild(toggle);
  node.appendChild(icon);
  node.appendChild(info);
  
  // إضافة النجمة للصناديق فقط
  const boxType = getBoxType(account);
  if (boxType) {
    const isDefault = isDefaultBox(account);
    const star = document.createElement('span');
    star.className = `default-star${isDefault ? ' active' : ''}`;
    star.innerHTML = isDefault ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i>';
    star.title = isDefault ? 'الصندوق الافتراضي' : 'تعيين كصندوق افتراضي';
    star.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!isDefault) {
        setDefaultBox(account);
      }
    });
    node.appendChild(star);
  }
  
  node.addEventListener('click', () => selectAccount(account));
  
  li.appendChild(node);
  
  // Children
  if (hasChildren) {
    const childrenUl = document.createElement('ul');
    childrenUl.className = `tree-children${isExpanded || (searchTerm && childrenMatch) ? ' expanded' : ''}`;
    
    children.forEach(child => {
      const childItem = createTreeItem(child, searchTerm);
      if (childItem) childrenUl.appendChild(childItem);
    });
    
    li.appendChild(childrenUl);
  }
  
  return li;
}

function hasMatchingDescendants(account, searchTerm) {
  const children = allAccounts.filter(a => a.parent_id === account.id);
  return children.some(child => {
    const matches = (child.name && child.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (child.name_en && child.name_en.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (child.code && child.code.includes(searchTerm));
    return matches || hasMatchingDescendants(child, searchTerm);
  });
}

function highlightText(text, searchTerm) {
  if (!text || !searchTerm) return text || '';
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<span class="highlight">$1</span>');
}

// ========== Tree Actions ==========
function toggleNode(accountId) {
  if (expandedNodes.has(accountId)) {
    expandedNodes.delete(accountId);
  } else {
    expandedNodes.add(accountId);
  }
  renderTree(elements.searchInput?.value || '');
}

function expandAll() {
  allAccounts.forEach(a => {
    if (a.is_parent || allAccounts.some(c => c.parent_id === a.id)) {
      expandedNodes.add(a.id);
    }
  });
  renderTree(elements.searchInput?.value || '');
}

function collapseAll() {
  expandedNodes.clear();
  renderTree(elements.searchInput?.value || '');
}

// ========== Search ==========
function handleSearch(e) {
  const searchTerm = e.target.value.trim();
  if (searchTerm) {
    expandAll();
  }
  renderTree(searchTerm);
}

function clearSearch() {
  if (elements.searchInput) {
    elements.searchInput.value = '';
    renderTree();
  }
}

// ========== Selection ==========
function selectAccount(account) {
  selectedAccount = account;
  
  // Update tree selection
  document.querySelectorAll('.tree-node').forEach(node => {
    node.classList.remove('selected');
  });
  
  const selectedNode = document.querySelector(`.tree-item[data-id="${account.id}"] > .tree-node`);
  if (selectedNode) {
    selectedNode.classList.add('selected');
  }
  
  // Show details
  showAccountDetails(account);
}

function clearSelection() {
  selectedAccount = null;
  elements.noSelection.style.display = 'flex';
  elements.accountDetails.style.display = 'none';
}

function showAccountDetails(account) {
  elements.noSelection.style.display = 'none';
  elements.accountDetails.style.display = 'block';
  
  const typeConfig = ACCOUNT_TYPES[account.account_type] || ACCOUNT_TYPES.asset;
  
  // Icon
  elements.detailIcon.className = `detail-icon ${typeConfig.class}`;
  elements.detailIcon.innerHTML = `<i class="fa-solid ${typeConfig.icon}"></i>`;
  
  // Info
  elements.detailName.textContent = account.name;
  elements.detailNameEn.textContent = account.name_en || '';
  elements.detailCode.textContent = account.code;
  
  // Details
  const typeKey = `type${account.account_type.charAt(0).toUpperCase() + account.account_type.slice(1)}`;
  elements.detailType.textContent = t(typeKey);
  elements.detailNature.textContent = account.nature === 'debit' ? t('debit') : t('credit');
  elements.detailLevel.textContent = account.level || 1;
  
  const parent = allAccounts.find(a => a.id === account.parent_id);
  elements.detailParent.textContent = parent ? `${parent.code} - ${parent.name}` : t('noParent');
  elements.detailBranch.textContent = getAccountDetailsBranchText(account);
  
  elements.detailBalance.textContent = formatNumber(account.balance || 0);
  elements.detailStatus.textContent = account.active ? t('active') : t('inactive');
  
  // Disable delete for system accounts or accounts with children
  const hasChildren = allAccounts.some(a => a.parent_id === account.id);
  elements.btnDeleteAccount.disabled = account.is_system || hasChildren;
  elements.btnDeleteAccount.style.opacity = (account.is_system || hasChildren) ? '0.5' : '1';
}

// ========== Stats ==========
function updateStats() {
  const stats = {
    asset: 0,
    liability: 0,
    equity: 0,
    revenue: 0,
    expense: 0
  };
  
  allAccounts.forEach(a => {
    if (stats.hasOwnProperty(a.account_type)) {
      stats[a.account_type]++;
    }
  });
  
  elements.statAssetsValue.textContent = stats.asset;
  elements.statLiabilitiesValue.textContent = stats.liability;
  elements.statEquityValue.textContent = stats.equity;
  elements.statRevenueValue.textContent = stats.revenue;
  elements.statExpensesValue.textContent = stats.expense;
}

function updateAccountCount() {
  const count = allAccounts.length;
  elements.accountCount.textContent = t('accountCount').replace('{count}', count);
}

// ========== Modal Functions ==========
function openAddModal(parentId = null) {
  editMode = false;
  elements.modalTitle.innerHTML = `<i class="fa-solid fa-plus-circle"></i> ${t('addNewAccount')}`;
  elements.accountForm.reset();
  elements.isActive.checked = true;
  if (elements.shareAcrossBranches) {
    elements.shareAcrossBranches.checked = false;
  }
  
  updateParentDropdown();
  
  if (parentId) {
    elements.parentAccount.value = parentId;
    handleParentChange();
  } else {
    updateShareAcrossBranchesControl();
  }
  
  elements.accountModal.classList.add('active');
}

function openEditModal() {
  if (!selectedAccount) return;
  
  editMode = true;
  elements.modalTitle.innerHTML = `<i class="fa-solid fa-pen"></i> ${t('editAccount')}`;
  
  updateParentDropdown(selectedAccount.id);
  
  elements.accountCode.value = selectedAccount.code || '';
  elements.parentAccount.value = selectedAccount.parent_id || '';
  elements.accountName.value = selectedAccount.name || '';
  elements.accountNameEn.value = selectedAccount.name_en || '';
  elements.accountType.value = selectedAccount.account_type || 'asset';
  elements.accountNature.value = selectedAccount.nature || 'debit';
  elements.accountDescription.value = selectedAccount.description || '';
  elements.isParent.checked = selectedAccount.is_parent === 1;
  if (elements.shareAcrossBranches) {
    elements.shareAcrossBranches.checked = isAccountSharedAcrossBranches(selectedAccount);
  }
  elements.isActive.checked = selectedAccount.active === 1;
  updateShareAcrossBranchesControl();
  
  elements.accountModal.classList.add('active');
}

function openAddChildModal() {
  if (!selectedAccount) return;
  openAddModal(selectedAccount.id);
}

function closeModal() {
  elements.accountModal.classList.remove('active');
}

function updateParentDropdown(excludeId = null) {
  const sortedAccounts = [...allAccounts].sort((a, b) => (a.code || '').localeCompare(b.code || ''));
  let options = `<option value="">${t('mainAccount')}</option>`;
  
  sortedAccounts.forEach(acc => {
    if (excludeId && acc.id === excludeId) return;
    const indent = '─'.repeat((acc.level || 1) - 1);
    const prefix = indent ? indent + ' ' : '';
    options += `<option value="${acc.id}">${prefix}${acc.code || acc.id} - ${acc.name}</option>`;
  });
  
  elements.parentAccount.innerHTML = options;
}

function handleParentChange() {
  const parentId = elements.parentAccount.value;
  if (parentId) {
    const parent = allAccounts.find(a => a.id === parseInt(parentId));
    if (parent) {
      elements.accountType.value = parent.account_type || 'asset';
      elements.accountNature.value = parent.nature || 'debit';
    }
  }
  updateShareAcrossBranchesControl();
}

async function saveAccount() {
  const code = elements.accountCode.value.trim();
  const name = elements.accountName.value.trim();
  
  if (!code) {
    showToast('error', t('codeRequired'));
    return;
  }
  
  if (!name) {
    showToast('error', t('nameRequired'));
    return;
  }
  
  const branchSelection = resolveAccountBranchSelection();
  const accountData = {
    code,
    name,
    name_en: elements.accountNameEn.value.trim() || null,
    parent_id: elements.parentAccount.value ? parseInt(elements.parentAccount.value) : null,
    account_type: elements.accountType.value,
    nature: elements.accountNature.value,
    description: elements.accountDescription.value.trim() || null,
    is_parent: elements.isParent.checked ? 1 : 0,
    active: elements.isActive.checked ? 1 : 0
  };
  if (branchSelection.includeBranchId) {
    accountData.branch_id = branchSelection.branchId;
  }
  
  try {
    let result;
    if (editMode && selectedAccount) {
      const confirmFn = window.confirmEditWithPassword || window.parent?.confirmEditWithPassword || window.top?.confirmEditWithPassword;
      if (confirmFn) {
        try {
          const confirmed = await confirmFn();
          if (!confirmed) return;
        } catch (e) {
          if (e.message !== 'cancelled') {
          }
          return;
        }
      }
      accountData.id = selectedAccount.id;
      result = await window.accounts.updateAccount(accountData);
    } else {
      result = await window.accounts.addAccount(accountData);
    }
    
    if (result.success) {
      showToast('success', editMode ? t('accountUpdated') : t('accountAdded'));
      closeModal();
      await loadAccounts();
      
      if (result.id) {
        const newAccount = allAccounts.find(a => a.id === result.id);
        if (newAccount) selectAccount(newAccount);
      }
    } else {
      showToast('error', result.error || t('errorOccurred'));
    }
  } catch (error) {
    showToast('error', t('errorOccurred'));
  }
}

// ========== Delete Modal ==========
function openDeleteModal() {
  if (!selectedAccount) return;
  
  const hasChildren = allAccounts.some(a => a.parent_id === selectedAccount.id);
  if (hasChildren) {
    showToast('error', t('cannotDeleteParent'));
    return;
  }
  
  if (selectedAccount.is_system) {
    showToast('error', t('cannotDeleteSystem'));
    return;
  }
  
  closeDeleteModal();
  confirmDelete();
}

function closeDeleteModal() {
  elements.deleteModal.classList.remove('active');
}

async function confirmDelete() {
  if (!selectedAccount) return;
  
  try {
    const confirmFn = window.confirmDeleteWithPassword || window.parent?.confirmDeleteWithPassword || window.top?.confirmDeleteWithPassword;
    if (confirmFn) {
      try {
        const confirmed = await confirmFn();
        if (!confirmed) return;
      } catch (e) {
        if (e.message !== 'cancelled') {
        }
        return;
      }
    }
    const result = await window.accounts.deleteAccount(selectedAccount.id);
    
    if (result.success) {
      showToast('success', t('accountDeleted'));
      closeDeleteModal();
      clearSelection();
      await loadAccounts();
    } else {
      showToast('error', result.error || t('errorOccurred'));
    }
  } catch (error) {
    showToast('error', t('errorOccurred'));
  }
}

// ========== Utilities ==========
function showLoading(show) {
  if (elements.loadingIndicator) {
    elements.loadingIndicator.style.display = show ? 'flex' : 'none';
  }
  if (elements.accountsTree) {
    elements.accountsTree.style.display = show ? 'none' : 'block';
  }
}

function showToast(type = 'success', message = '') {
  const wrap = elements.toastWrap;
  if (!wrap) {
    try { 
      if (window.showAlert) showAlert(message || (type === 'error' ? t('errorOccurred') : t('accountAdded')), type); 
    } catch(_) { }
    return;
  }
  
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.textContent = message || (type === 'error' ? t('errorOccurred') : t('accountAdded'));
  wrap.appendChild(el);
  
  setTimeout(() => { el.classList.add('show'); }, 10);
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, 300);
  }, 3000);
}

function formatNumber(num) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num || 0);
}

// ========== Last Update Time ==========
function updateLastUpdateTime() {
  const now = new Date();
  const lang = getLang();
  
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  };
  
  const formattedTime = now.toLocaleString(lang === 'ar' ? 'ar-SA' : 'en-US', options);
  
  if (elements.lastUpdateTime) {
    elements.lastUpdateTime.textContent = formattedTime;
  }
}

// ========== Start ==========
document.addEventListener('DOMContentLoaded', init);

if (window.api && typeof window.api.on === 'function') {
  window.api.on('cloud-data-updated', async (payload) => {
    const tables = Array.isArray(payload?.tables) ? payload.tables : [];
    if (tables.includes('accounts')) {
      await loadAccounts();
      return;
    }
    if (tables.includes('default_boxes')) {
      await loadDefaultBoxes();
      renderTree(elements.searchInput?.value || '');
    }
  });
}

window.addEventListener('message', async (event) => {
  if (event?.data?.type !== 'cloud-data-updated') {
    return;
  }
  const payload = event.data.payload || {};
  const tables = Array.isArray(payload?.tables) ? payload.tables : [];
  if (tables.includes('accounts')) {
    await loadAccounts();
    return;
  }
  if (tables.includes('default_boxes')) {
    await loadDefaultBoxes();
    renderTree(elements.searchInput?.value || '');
  }
});

﻿// Users Management Screen

// ===== Translation System =====
const USERS_TRANSLATIONS = {
  ar: {
    pageTitle: 'المستخدمون',
    newUser: 'مستخدم جديد',
    initPermissions: 'تهيئة الصلاحيات',
    totalUsers: 'إجمالي المستخدمين',
    usersAddedThisMonth: 'مستخدمين تم إضافتهم هذا الشهر',
    activeUsers: 'المستخدمون النشطون',
    active: 'نشطون',
    inactive: 'غير نشطون',
    administrators: 'المديرون',
    admins: 'مديرون',
    users: 'مستخدمون',
    usersList: 'قائمة المستخدمين',
    tableMyInfo: 'معلوماتي',
    searchPlaceholder: 'بحث عن مستخدم...',
    refresh: 'تحديث',
    exportExcel: 'تصدير Excel',
    exportPdf: 'PDF',
    id: 'المعرف',
    username: 'اسم المستخدم',
    fullName: 'الاسم الكامل',
    role: 'الدور',
    branchesLabel: 'الفروع',
    activeStatus: 'نشط',
    createdDate: 'تاريخ الإنشاء',
    lastLogin: 'آخر دخول',
    actions: 'الإجراءات',
    status: 'الحالة',
    admin: 'مدير',
    user: 'مستخدم',
    default: 'افتراضي',
    edit: 'تعديل',
    permissions: 'الصلاحيات',
    delete: 'حذف',
    addUser: 'إضافة مستخدم',
    editUser: 'تعديل مستخدم',
    editSelf: 'تعديل معلوماتي',
    editDefaultAdmin: 'تعديل مستخدم افتراضي',
    close: 'إغلاق',
    usernameLabel: 'اسم المستخدم',
    usernamePlaceholder: 'مثال: user1',
    fullNameLabel: 'الاسم الكامل',
    fullNamePlaceholder: 'الاسم الكامل',
    passwordLabel: 'كلمة المرور',
    passwordPlaceholder: 'كلمة المرور',
    passwordHint: 'اترك فارغاً للإبقاء على كلمة المرور الحالية',
    passwordReminderLabel: 'تذكير كلمة المرور',
    passwordReminderPlaceholder: 'مثال: اسم مدينتي + تاريخ ميلادي',
    roleLabel: 'الدور',
    activeLabel: 'نشط',
    branchesAssignmentsLabel: 'الفروع المسموح بها',
    branchesAssignmentsHint: 'حدد الفروع التي يمكن للمستخدم العمل بها واختر الفرع الافتراضي',
    defaultBranchLabel: 'الافتراضي',
    canLoginLabel: 'يمكنه تسجيل الدخول',
    readOnlyLabel: 'قراءة فقط',
    cancel: 'إلغاء',
    save: 'حفظ',
    confirmDelete: 'تأكيد الحذف',
    confirmDeleteMsg: 'هل أنت متأكد من أنك تريد حذف هذا المستخدم؟',
    yesDelete: 'نعم، احذف',
    cancelAction: 'إلغاء الأمر',
    managePermissions: 'إدارة صلاحيات المستخدم',
    loading: 'جاري التحميل...',
    savePermissions: 'حفظ الصلاحيات',
    initPermissionsTitle: 'تهيئة نظام الصلاحيات الشامل',
    initPermissionsDesc: 'سيتم إضافة جميع الصلاحيات للنظام تلقائياً',
    startInit: 'ابدأ التهيئة',
    removeDuplicates: 'إزالة التكرار',
    totalPermissions: 'إجمالي الصلاحيات',
    added: 'تمت الإضافة',
    categories: 'الفئات',
    loadUsersFailed: 'فشل تحميل المستخدمين',
    loadBranchesFailed: 'فشل تحميل الفروع',
    loadDataError: 'خطأ في تحميل البيانات',
    updateSuccess: 'تم التحديث بنجاح',
    addSuccess: 'تم الإضافة بنجاح',
    operationFailed: 'فشلت العملية',
    saveError: 'خطأ في الحفظ',
    branchesRequired: 'يجب اختيار فرع واحد على الأقل',
    defaultBranchRequired: 'يجب اختيار فرع افتراضي',
    noBranchesAvailable: 'لا توجد فروع متاحة',
    noBranchesAssigned: 'بدون فروع',
    branchSummaryCount: '{count} فروع',
    defaultBranchPrefix: 'الافتراضي: {name}',
    currentBranchBadge: 'الحالي',
    mainBranchBadge: 'رئيسي',
    noDeletePermission: 'ليس لديك صلاحية حذف المستخدمين',
    deleteSuccess: 'تم الحذف بنجاح',
    deleteFailed: 'فشل الحذف',
    deleteError: 'خطأ في الحذف',
    noAddPermission: 'ليس لديك صلاحية إضافة مستخدمين',
    noEditPermission: 'ليس لديك صلاحية تعديل المستخدمين',
    noInitPermission: 'ليس لديك صلاحية تهيئة الصلاحيات',
    apiNotAvailable: 'يرجى إعادة تشغيل التطبيق',
    cleanupSuccess: 'تم حذف {count} صلاحية وتنظيف النظام',
    cleanupDone: 'تم التنظيف',
    initSuccess: 'تمت إضافة {count} صلاحية جديدة بنجاح!',
    initDone: 'تمت التهيئة بنجاح',
    initFailed: 'فشلت تهيئة الصلاحيات',
    noExportPermission: 'ليس لديك صلاحية التصدير',
    printWindowFailed: 'فشل فتح نافذة الطباعة',
    noPermissionsPermission: 'ليس لديك صلاحية إدارة الصلاحيات',
    noValidPermissions: 'لم يتم تحديد أي صلاحيات صالحة. يرجى تهيئة النظام أولاً',
    permissionsSaveSuccess: 'تم حفظ {count} صلاحية بنجاح',
    permissionsSaveFailed: 'فشل حفظ الصلاحيات',
    permissionsSaveError: 'خطأ في حفظ الصلاحيات',
    printDate: 'تاريخ الطباعة',
    print: 'طباعة',
    yes: 'نعم',
    no: 'لا',
    activeYes: 'نشط',
    activeNo: 'غير نشط',
    permTemplateLabel: 'قالب:',
    permTemplateSelect: 'اختر قالب',
    permSelectAll: 'تحديد الكل',
    permClearAll: 'مسح الكل',
    permScreensHeader: 'الشاشات',
    permSearchPlaceholder: 'بحث عن شاشة...',
    permissionsLoadFailed: 'فشل تحميل الصلاحيات',
    permissionsLoadError: 'خطأ في تحميل الصلاحيات',
    noDefinedPermissions: 'لا توجد صلاحيات معرفة',
    permCategories: {
      customers: 'العملاء', suppliers: 'الموردين', accounts: 'الحسابات',
      vouchers: 'سندات الصرف', receipts: 'سندات القبض', journal: 'القيود اليومية',
      sales_invoices: 'فواتير البيع', purchase_invoices: 'فواتير الشراء',
      opening: 'الأرصدة الافتتاحية', movement: 'الحركة',
      sales_purchase_movement: 'حركة المبيعات والمشتريات', orders: 'الأوردرات',
      reports: 'التقارير', tax_declaration: 'الإقرار الضريبي', gold_items: 'أصناف العيارات', branches: 'الفروع', users: 'المستخدمين', settings: 'الإعدادات', cloud_settings: 'إعدادات السحابة', dashboard: 'لوحة التحكم', whatsapp_reports: 'واتساب للأعمال'
    },
    permActions: {
      view: 'عرض', add: 'إضافة', edit: 'تعديل', delete: 'حذف', export: 'تصدير',
      print: 'طباعة', complete: 'إكمال', manage_permissions: 'إدارة الصلاحيات',
      backup: 'نسخ احتياطي', restore: 'استعادة', view_statistics: 'عرض الإحصائيات',
      view_statement: 'كشف الحساب', view_trial_balance: 'ميزان المراجعة',
      view_quick_statement: 'كشف حساب سريع', view_category_report: 'تقرير حسب الأصناف', view_tax_report: 'تقرير الضرائب',
      view_tax_declaration: 'الإقرار الضريبي',
      view_income_statement: 'قائمة الدخل', view_balance_sheet: 'الميزانية العمومية',
      save_draft: 'حفظ كمسودة', submit: 'تقديم', generate: 'إنشاء',
      sync: 'مزامنة', upload: 'رفع', local_connect: 'اتصال محلي',
      connect: 'ربط/فصل', send: 'إرسال'
    },
    roleTemplates: { admin: 'مدير', accountant: 'محاسب', cashier: 'أمين الصندوق', viewer: 'مشاهد' }
  },
  en: {
    pageTitle: 'Users',
    newUser: 'New User',
    initPermissions: 'Init Permissions',
    totalUsers: 'Total Users',
    usersAddedThisMonth: 'users added this month',
    activeUsers: 'Active Users',
    active: 'Active',
    inactive: 'Inactive',
    administrators: 'Administrators',
    admins: 'Admins',
    users: 'Users',
    usersList: 'Users List',
    tableMyInfo: 'My Info',
    searchPlaceholder: 'Search for user...',
    refresh: 'Refresh',
    exportExcel: 'Export Excel',
    exportPdf: 'PDF',
    id: 'ID',
    username: 'Username',
    fullName: 'Full Name',
    role: 'Role',
    branchesLabel: 'Branches',
    activeStatus: 'Active',
    createdDate: 'Created Date',
    lastLogin: 'Last Login',
    actions: 'Actions',
    status: 'Status',
    admin: 'Admin',
    user: 'User',
    default: 'Default',
    edit: 'Edit',
    permissions: 'Permissions',
    delete: 'Delete',
    addUser: 'Add User',
    editUser: 'Edit User',
    editSelf: 'Edit My Info',
    editDefaultAdmin: 'Edit Default User',
    close: 'Close',
    usernameLabel: 'Username',
    usernamePlaceholder: 'e.g. user1',
    fullNameLabel: 'Full Name',
    fullNamePlaceholder: 'Full Name',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Password',
    passwordHint: 'Leave empty to keep current password',
    passwordReminderLabel: 'Password Reminder',
    passwordReminderPlaceholder: 'e.g. My city + birthdate',
    roleLabel: 'Role',
    activeLabel: 'Active',
    branchesAssignmentsLabel: 'Allowed Branches',
    branchesAssignmentsHint: 'Choose the branches this user can work in and mark the default branch',
    defaultBranchLabel: 'Default',
    canLoginLabel: 'Can log in',
    readOnlyLabel: 'Read only',
    cancel: 'Cancel',
    save: 'Save',
    confirmDelete: 'Confirm Delete',
    confirmDeleteMsg: 'Are you sure you want to delete this user?',
    yesDelete: 'Yes, Delete',
    cancelAction: 'Cancel',
    managePermissions: 'Manage User Permissions',
    loading: 'Loading...',
    savePermissions: 'Save Permissions',
    initPermissionsTitle: 'Initialize Permissions System',
    initPermissionsDesc: 'All permissions will be added automatically',
    startInit: 'Start Init',
    removeDuplicates: 'Remove Duplicates',
    totalPermissions: 'Total Permissions',
    added: 'Added',
    categories: 'Categories',
    loadUsersFailed: 'Failed to load users',
    loadBranchesFailed: 'Failed to load branches',
    loadDataError: 'Error loading data',
    updateSuccess: 'Updated successfully',
    addSuccess: 'Added successfully',
    operationFailed: 'Operation failed',
    saveError: 'Error saving',
    branchesRequired: 'At least one branch must be selected',
    defaultBranchRequired: 'A default branch must be selected',
    noBranchesAvailable: 'No branches available',
    noBranchesAssigned: 'No branches assigned',
    branchSummaryCount: '{count} branches',
    defaultBranchPrefix: 'Default: {name}',
    currentBranchBadge: 'Current',
    mainBranchBadge: 'Main',
    noDeletePermission: 'You do not have permission to delete users',
    deleteSuccess: 'Deleted successfully',
    deleteFailed: 'Delete failed',
    deleteError: 'Error deleting',
    noAddPermission: 'You do not have permission to add users',
    noEditPermission: 'You do not have permission to edit users',
    noInitPermission: 'You do not have permission to initialize permissions',
    apiNotAvailable: 'Please restart the app',
    cleanupSuccess: 'Deleted {count} permissions and cleaned system',
    cleanupDone: 'Cleanup Done',
    initSuccess: 'Successfully added {count} new permissions!',
    initDone: 'Initialization Complete',
    initFailed: 'Permissions initialization failed',
    noExportPermission: 'You do not have permission to export',
    printWindowFailed: 'Failed to open print window',
    noPermissionsPermission: 'You do not have permission to manage permissions',
    noValidPermissions: 'No valid permissions selected. Please initialize first',
    permissionsSaveSuccess: 'Successfully saved {count} permissions',
    permissionsSaveFailed: 'Failed to save permissions',
    permissionsSaveError: 'Error saving permissions',
    printDate: 'Print Date',
    print: 'Print',
    yes: 'Yes',
    no: 'No',
    activeYes: 'Active',
    activeNo: 'Inactive',
    permTemplateLabel: 'Template:',
    permTemplateSelect: 'Select template',
    permSelectAll: 'Select All',
    permClearAll: 'Clear All',
    permScreensHeader: 'Screens',
    permSearchPlaceholder: 'Search screens...',
    permissionsLoadFailed: 'Failed to load permissions',
    permissionsLoadError: 'Error loading permissions',
    noDefinedPermissions: 'No permissions defined',
    permCategories: {
      customers: 'Customers', suppliers: 'Suppliers', accounts: 'Accounts',
      vouchers: 'Payment Vouchers', receipts: 'Receipt Vouchers', journal: 'Journal Entries',
      sales_invoices: 'Sales Invoices', purchase_invoices: 'Purchase Invoices',
      opening: 'Opening Balances', movement: 'Movement',
      sales_purchase_movement: 'Sales & Purchase Movement', orders: 'Orders',
      reports: 'Reports', tax_declaration: 'Tax Declaration', gold_items: 'Gold Items', branches: 'Branches', users: 'Users', settings: 'Settings', cloud_settings: 'Cloud Settings', dashboard: 'Dashboard', whatsapp_reports: 'WhatsApp Business'
    },
    permActions: {
      view: 'View', add: 'Add', edit: 'Edit', delete: 'Delete', export: 'Export',
      print: 'Print', complete: 'Complete', manage_permissions: 'Manage Permissions',
      backup: 'Backup', restore: 'Restore', view_statistics: 'View Statistics',
      view_statement: 'Account Statement', view_trial_balance: 'Trial Balance',
      view_quick_statement: 'Quick Statement', view_category_report: 'Category Report', view_tax_report: 'Tax Report',
      view_tax_declaration: 'Tax Declaration',
      view_income_statement: 'Income Statement', view_balance_sheet: 'Balance Sheet',
      save_draft: 'Save Draft', submit: 'Submit', generate: 'Generate',
      sync: 'Sync', upload: 'Upload', local_connect: 'Local Connect',
      connect: 'Connect/Disconnect', send: 'Send'
    },
    roleTemplates: { admin: 'Admin', accountant: 'Accountant', cashier: 'Cashier', viewer: 'Viewer' }
  }
};

// Get UI language
function getUsersLang() {
  return localStorage.getItem('uiLang') || 'ar';
}

// Translation helper
function tUsers(key) {
  const lang = getUsersLang();
  const keys = key.split('.');
  let val = USERS_TRANSLATIONS[lang];
  for (const k of keys) {
    if (val && typeof val === 'object') val = val[k];
    else return key;
  }
  return val || USERS_TRANSLATIONS.ar[key] || key;
}

function formatUsersText(key, params = {}) {
  let value = String(tUsers(key) || '');
  Object.entries(params).forEach(([paramKey, paramValue]) => {
    value = value.replace(`{${paramKey}}`, String(paramValue ?? ''));
  });
  return value;
}

// Apply translations to HTML
function applyUsersTranslations() {
  const lang = getUsersLang();
  const isEn = lang === 'en';
  const t = USERS_TRANSLATIONS[lang];
  
  // Update HTML lang and dir
  document.documentElement.lang = lang;
  document.documentElement.dir = isEn ? 'ltr' : 'rtl';
  document.title = t.pageTitle;
  
  // Apply to all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = tUsers(key);
    if (val && val !== key) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = val;
      } else {
        el.textContent = val;
      }
    }
  });
  
  // Apply to title attributes
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    const val = tUsers(key);
    if (val && val !== key) el.title = val;
  });
}

// Helper: Get current user ID
function getCurrentUserId() {
  try {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const user = JSON.parse(userData);
      return user.id || null;
    }
  } catch (e) {
    
  }
  return null;
}

function getStoredCurrentBranch() {
  try {
    const raw = localStorage.getItem('currentBranch');
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function escapeUsersHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

(async function(){
  'use strict';

  // ✅ Initialize screen permissions
  if (window.ScreenPermissions) {
    await window.ScreenPermissions.init();
  }

  // Toast notification system (match other screens)
  function showToast(type, message) {
    let wrap = document.getElementById('toastWrap');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.id = 'toastWrap';
      wrap.className = 'toast-wrap';
      wrap.style.cssText = 'position:fixed;left:14px;bottom:14px;display:grid;gap:8px;z-index:99999';
      document.body.appendChild(wrap);
    }
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.style.cssText = `
      min-width: 260px;
      max-width: 520px;
      border: 2px solid var(--border);
      border-radius: 14px;
      padding: 10px 14px;
      background: var(--card);
      color: var(--text);
      box-shadow: 0 10px 26px rgba(0,0,0,.20);
      display: flex;
      align-items: center;
      gap: 10px;
      animation: toastIn .2s ease forwards;
      transition: opacity .18s ease, transform .18s ease;
      border-color: ${type === 'success' ? 'var(--success)' : 'var(--error)'};
      box-shadow: 0 0 0 6px ${type === 'success' ? 'color-mix(in oklab, var(--success) 15%, transparent)' : 'color-mix(in oklab, var(--error) 15%, transparent)'};
    `;
    
    const icon = type === 'success' 
      ? '<i class="fa-regular fa-circle-check" style="font-size:16px"></i>' 
      : '<i class="fa-regular fa-circle-xmark" style="font-size:16px"></i>';
    
    toast.innerHTML = `${icon}<span>${message}</span>`;
    wrap.appendChild(toast);
    
    const timeout = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(6px)';
      setTimeout(() => toast.remove(), 180);
    }, 3500);
    
    // Add keyframes if not exists
    if (!document.getElementById('toast-keyframes')) {
      const style = document.createElement('style');
      style.id = 'toast-keyframes';
      style.textContent = '@keyframes toastIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}';
      document.head.appendChild(style);
    }
  }

  // Format date for display (Gregorian DD/MM/YYYY)
  function formatDate(dateStr) {
    if (!dateStr) return '—';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' });
    } catch {
      return dateStr;
    }
  }

  // Format datetime for display (Gregorian DD/MM/YYYY HH:MM)
  function formatDateTime(dateStr) {
    if (!dateStr) return '—';
    try {
      const date = new Date(dateStr);
      return date.toLocaleString('en-GB', { 
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit'
      });
    } catch {
      return dateStr;
    }
  }

  // Elements
  const btnNewUser = document.getElementById('btnNewUser');
  const btnRefreshUsers = document.getElementById('btnRefreshUsers');
  const usersSearch = document.getElementById('usersSearch');
  const tbody = document.querySelector('.table tbody');
  const modal = document.getElementById('newUserModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalClose = document.getElementById('modalClose');
  const modalCancel = document.getElementById('modalCancel');
  const modalSave = document.getElementById('modalSave');
  const modalForm = document.getElementById('newUserForm');
  const errorEl = document.getElementById('nu_error');
  const branchesField = document.getElementById('nuBranchesField');
  const branchesContainer = document.getElementById('nu_branchesContainer');
  const branchesErrorEl = document.getElementById('nu_branches_error');
  const confirmModal = document.getElementById('confirmDelModal');
  const confirmDelClose = document.getElementById('confirmDelClose');
  const confirmDelNo = document.getElementById('confirmDelNo');
  const confirmDelYes = document.getElementById('confirmDelYes');
  const confirmDelMsg = document.getElementById('confirmDelMsg');
  const togglePassword = document.getElementById('togglePassword');
  const pwdInput = document.getElementById('nu_password');
  const pwdRequiredMark = document.getElementById('pwdRequiredMark');
  const pwdHint = document.getElementById('pwdHint');

  let allUsers = [];
  let allBranches = [];
  let editingUser = null;
  let userToDelete = null;
  let currentUser = null;
  let currentBranch = getStoredCurrentBranch();

  function hasUsersPermission(permissionName) {
    return window.ScreenPermissions && window.ScreenPermissions.has(permissionName);
  }

  function isCurrentUserAdmin() {
    return String(currentUser?.role || '').trim().toLowerCase() === 'admin';
  }

  // Load current user from localStorage
  try {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      currentUser = JSON.parse(userData);
    } else {
      
    }
  } catch (e) {
    
  }

  function getBranchDisplayName(branch) {
    const lang = getUsersLang();
    const arName = String(branch?.name || '').trim();
    const enName = String(branch?.name_en || '').trim();
    return lang === 'en' ? (enName || arName || `#${branch?.id || ''}`) : (arName || enName || `#${branch?.id || ''}`);
  }

  function getBranchById(branchId) {
    const normalized = Number(branchId || 0);
    return allBranches.find(branch => Number(branch?.id || 0) === normalized) || null;
  }

  async function loadBranchesCatalog(forceFresh = false, silent = false) {
    if (!window.branches || !window.branches.getBranches) {
      allBranches = [];
      return allBranches;
    }

    try {
      const result = await window.branches.getBranches({ forceFresh, activeOnly: false });
      if (result && result.success && Array.isArray(result.data)) {
        allBranches = result.data;
        return allBranches;
      }
      if (!silent) {
        showToast('error', result?.error || tUsers('loadBranchesFailed'));
      }
    } catch (error) {
      if (!silent) {
        showToast('error', tUsers('loadBranchesFailed'));
      }
    }

    allBranches = [];
    return allBranches;
  }

  function setBranchesFieldVisible(visible) {
    if (branchesField) {
      branchesField.style.display = visible ? '' : 'none';
    }
    if (!visible && branchesErrorEl) {
      branchesErrorEl.textContent = '';
    }
  }

  function refreshBranchAssignmentState() {
    if (!branchesContainer) return;

    const items = Array.from(branchesContainer.querySelectorAll('.branch-access-item'));
    items.forEach(item => {
      const assignToggle = item.querySelector('.branch-assign-toggle');
      const defaultRadio = item.querySelector('.branch-default-radio');
      const loginToggle = item.querySelector('.branch-login-toggle');
      const readOnlyToggle = item.querySelector('.branch-read-only-toggle');
      const isSelected = Boolean(assignToggle?.checked);

      item.classList.toggle('is-selected', isSelected);

      if (defaultRadio) {
        defaultRadio.disabled = !isSelected;
        if (!isSelected) {
          defaultRadio.checked = false;
        }
      }

      if (loginToggle) {
        loginToggle.disabled = !isSelected;
        if (!isSelected) {
          loginToggle.checked = false;
        }
      }

      if (readOnlyToggle) {
        readOnlyToggle.disabled = !isSelected;
        if (!isSelected) {
          readOnlyToggle.checked = false;
        }
      }

      if (defaultRadio?.checked) {
        if (assignToggle) assignToggle.checked = true;
        if (loginToggle) loginToggle.checked = true;
        item.classList.add('is-selected');
      }
    });

    const selectedItems = items.filter(item => item.querySelector('.branch-assign-toggle')?.checked);
    const selectedDefault = selectedItems.find(item => item.querySelector('.branch-default-radio')?.checked);
    if (!selectedDefault && selectedItems[0]) {
      const radio = selectedItems[0].querySelector('.branch-default-radio');
      const login = selectedItems[0].querySelector('.branch-login-toggle');
      if (radio) radio.checked = true;
      if (login) login.checked = true;
      selectedItems[0].classList.add('is-selected');
    }

    if (branchesErrorEl) {
      branchesErrorEl.textContent = '';
    }
  }

  function bindBranchAssignmentEvents() {
    if (!branchesContainer) return;

    branchesContainer.querySelectorAll('.branch-access-item').forEach(item => {
      const assignToggle = item.querySelector('.branch-assign-toggle');
      const defaultRadio = item.querySelector('.branch-default-radio');
      const loginToggle = item.querySelector('.branch-login-toggle');
      const readOnlyToggle = item.querySelector('.branch-read-only-toggle');

      assignToggle?.addEventListener('change', () => {
        refreshBranchAssignmentState();
      });

      defaultRadio?.addEventListener('change', () => {
        if (defaultRadio.checked) {
          if (assignToggle) assignToggle.checked = true;
          if (loginToggle) loginToggle.checked = true;
        }
        refreshBranchAssignmentState();
      });

      loginToggle?.addEventListener('change', () => {
        if (loginToggle.checked && assignToggle) {
          assignToggle.checked = true;
        }
        refreshBranchAssignmentState();
      });

      readOnlyToggle?.addEventListener('change', () => {
        if (readOnlyToggle.checked && assignToggle) {
          assignToggle.checked = true;
        }
        refreshBranchAssignmentState();
      });
    });
  }

  function renderBranchAssignments(assignments = []) {
    if (!branchesContainer) return;

    setBranchesFieldVisible(true);
    branchesContainer.innerHTML = '';

    if (!Array.isArray(allBranches) || allBranches.length === 0) {
      branchesContainer.innerHTML = `<div class="branch-access-empty">${escapeUsersHtml(tUsers('noBranchesAvailable'))}</div>`;
      return;
    }

    const normalizedAssignments = Array.isArray(assignments)
      ? assignments.map(branch => ({
          branch_id: Number(branch?.branch_id || branch?.id || 0),
          is_default: Number(branch?.is_default || 0),
          can_login: Number(branch?.can_login ?? 1),
          read_only: Number(branch?.read_only || 0),
        })).filter(branch => branch.branch_id > 0)
      : [];

    const assignmentMap = new Map(normalizedAssignments.map(branch => [branch.branch_id, branch]));
    const selectedIds = normalizedAssignments.length
      ? normalizedAssignments.map(branch => branch.branch_id)
      : [Number(currentBranch?.id || 0) || Number(allBranches.find(branch => Number(branch?.is_main || 0) === 1)?.id || 0) || Number(allBranches[0]?.id || 0)].filter(Boolean);
    const selectedSet = new Set(selectedIds);
    const defaultBranchId = Number(normalizedAssignments.find(branch => branch.is_default === 1)?.branch_id || selectedIds[0] || 0);

    branchesContainer.innerHTML = allBranches.map(branch => {
      const branchId = Number(branch?.id || 0);
      const isSelected = selectedSet.has(branchId);
      const isDefault = branchId === defaultBranchId;
      const canLogin = assignmentMap.has(branchId)
        ? Number(assignmentMap.get(branchId)?.can_login ?? 1) === 1
        : isSelected;
      const isReadOnly = assignmentMap.has(branchId)
        ? Number(assignmentMap.get(branchId)?.read_only || 0) === 1
        : false;
      const isCurrentBranch = Number(currentBranch?.id || 0) === branchId;
      const isMainBranch = Number(branch?.is_main || 0) === 1;

      return `
        <div class="branch-access-item ${isSelected ? 'is-selected' : ''}" data-branch-id="${branchId}">
          <label class="branch-access-main">
            <input type="checkbox" class="branch-assign-toggle" ${isSelected ? 'checked' : ''}>
            <span class="branch-access-text">
              <span class="branch-access-name">
                ${escapeUsersHtml(getBranchDisplayName(branch))}
                ${isCurrentBranch ? `<span class="branch-pill">${escapeUsersHtml(tUsers('currentBranchBadge'))}</span>` : ''}
                ${isMainBranch ? `<span class="branch-pill">${escapeUsersHtml(tUsers('mainBranchBadge'))}</span>` : ''}
              </span>
              <span class="branch-access-meta">
                <span>${escapeUsersHtml(String(branch?.code || `#${branchId}`))}</span>
              </span>
            </span>
          </label>
          <div class="branch-access-actions">
            <label>
              <input type="radio" name="nu_default_branch" class="branch-default-radio" value="${branchId}" ${isDefault ? 'checked' : ''}>
              <span>${escapeUsersHtml(tUsers('defaultBranchLabel'))}</span>
            </label>
            <label>
              <input type="checkbox" class="branch-login-toggle" value="${branchId}" ${canLogin ? 'checked' : ''}>
              <span>${escapeUsersHtml(tUsers('canLoginLabel'))}</span>
            </label>
            <label>
              <input type="checkbox" class="branch-read-only-toggle" value="${branchId}" ${isReadOnly ? 'checked' : ''}>
              <span>${escapeUsersHtml(tUsers('readOnlyLabel'))}</span>
            </label>
          </div>
        </div>
      `;
    }).join('');

    bindBranchAssignmentEvents();
    refreshBranchAssignmentState();
  }

  async function prepareBranchAssignments(user = null) {
    await loadBranchesCatalog(false, true);

    let assignments = [];
    if (user?.id && window.users && window.users.getUserBranches) {
      try {
        const result = await window.users.getUserBranches(user.id);
        if (result && result.success && Array.isArray(result.data)) {
          assignments = result.data;
        } else if (result && !result.success) {
          showToast('error', result.error || tUsers('loadBranchesFailed'));
        }
      } catch (error) {
        showToast('error', tUsers('loadBranchesFailed'));
      }
    }

    renderBranchAssignments(assignments);
  }

  function collectBranchAssignments() {
    if (!branchesField || branchesField.style.display === 'none') {
      return null;
    }

    const items = Array.from(branchesContainer?.querySelectorAll('.branch-access-item') || []);
    const selectedItems = items.filter(item => item.querySelector('.branch-assign-toggle')?.checked);
    if (!selectedItems.length) {
      if (branchesErrorEl) {
        branchesErrorEl.textContent = tUsers('branchesRequired');
      }
      return null;
    }

    let defaultBranchId = Number(selectedItems.find(item => item.querySelector('.branch-default-radio')?.checked)?.dataset?.branchId || 0);
    if (!defaultBranchId) {
      defaultBranchId = Number(selectedItems[0]?.dataset?.branchId || 0);
    }
    if (!defaultBranchId) {
      if (branchesErrorEl) {
        branchesErrorEl.textContent = tUsers('defaultBranchRequired');
      }
      return null;
    }

    const branchIds = [];
    const canLoginByBranch = {};
    const readOnlyByBranch = {};
    selectedItems.forEach(item => {
      const branchId = Number(item.dataset.branchId || 0);
      if (!branchId) return;
      branchIds.push(branchId);
      const loginToggle = item.querySelector('.branch-login-toggle');
      const readOnlyToggle = item.querySelector('.branch-read-only-toggle');
      canLoginByBranch[branchId] = (branchId === defaultBranchId || loginToggle?.checked) ? 1 : 0;
      readOnlyByBranch[branchId] = readOnlyToggle?.checked ? 1 : 0;
    });

    if (branchesErrorEl) {
      branchesErrorEl.textContent = '';
    }

    return {
      branch_ids: branchIds,
      default_branch_id: defaultBranchId,
      can_login_by_branch: canLoginByBranch,
      read_only_by_branch: readOnlyByBranch,
    };
  }

  function buildBranchSummary(user) {
    const branchCount = Number(user?.branch_count || 0);
    if (!branchCount) {
      return `<div class="branch-summary"><strong>${escapeUsersHtml(tUsers('noBranchesAssigned'))}</strong><small>${escapeUsersHtml(formatUsersText('branchSummaryCount', { count: 0 }))}</small></div>`;
    }

    const defaultBranch = getBranchById(user?.default_branch_id);
    const defaultBranchName = defaultBranch ? getBranchDisplayName(defaultBranch) : tUsers('noBranchesAssigned');
    return `
      <div class="branch-summary">
        <strong>${escapeUsersHtml(formatUsersText('defaultBranchPrefix', { name: defaultBranchName }))}</strong>
        <small>${escapeUsersHtml(formatUsersText('branchSummaryCount', { count: branchCount }))}</small>
      </div>
    `;
  }

  // Toggle password visibility
  if (togglePassword && pwdInput) {
    togglePassword.addEventListener('click', () => {
      const type = pwdInput.getAttribute('type') === 'password' ? 'text' : 'password';
      pwdInput.setAttribute('type', type);
      togglePassword.querySelector('i').className = type === 'password' ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash';
    });
  }

  // Open modal
  async function openModal(user = null) {
    editingUser = user;
    modalForm.reset();
    errorEl.textContent = '';
    if (branchesErrorEl) {
      branchesErrorEl.textContent = '';
    }
    setBranchesFieldVisible(true);

    if (user) {
      const baseEditTitle = tUsers('editUser');
      const hasEditPermission = hasUsersPermission('users_edit');
      const isSelf = currentUser && user.id === currentUser.id;
      const isAdminUser = isCurrentUserAdmin();
      modalTitle.textContent = baseEditTitle;
      document.getElementById('nu_id').value = user.id;
      document.getElementById('nu_username').value = user.username;
      document.getElementById('nu_fullname').value = user.full_name;
      document.getElementById('nu_hint').value = user.password_hint || '';
      document.getElementById('nu_role').value = user.role;
      document.getElementById('nu_active').checked = user.active === 1;
      pwdInput.value = '';
      pwdInput.removeAttribute('required');
      pwdRequiredMark.style.display = 'none';
      pwdHint.style.display = 'block';
      
      // Protect default admin user
      const isDefaultAdmin = user.username === 'Smart Accountant';
      
      if (!isAdminUser && isSelf && hasEditPermission) {
        modalTitle.textContent = tUsers('editSelf');
        document.getElementById('nu_username').setAttribute('disabled', 'disabled');
        document.getElementById('nu_fullname').setAttribute('disabled', 'disabled');
        document.getElementById('nu_role').setAttribute('disabled', 'disabled');
        document.getElementById('nu_active').setAttribute('disabled', 'disabled');
        pwdHint.textContent = 'يمكنك تغيير كلمة المرور والتلميح فقط';
        setBranchesFieldVisible(false);
      } else if (isDefaultAdmin) {
        // Protect default admin: cannot change role or deactivate
        modalTitle.textContent = tUsers('editDefaultAdmin');
        document.getElementById('nu_username').removeAttribute('disabled');
        document.getElementById('nu_fullname').removeAttribute('disabled');
        document.getElementById('nu_role').setAttribute('disabled', 'disabled');
        document.getElementById('nu_active').setAttribute('disabled', 'disabled');
        pwdHint.textContent = 'ملاحظة: لا يمكن تغيير الدور أو تعطيل المستخدم الافتراضي';
      } else if (hasEditPermission) {
        // Enable all fields for users with edit permission
        document.getElementById('nu_username').removeAttribute('disabled');
        document.getElementById('nu_fullname').removeAttribute('disabled');
        document.getElementById('nu_role').removeAttribute('disabled');
        document.getElementById('nu_active').removeAttribute('disabled');
      } else if (!isSelf) {
        // No permission to edit other users
        if (window.ScreenPermissions) {
          window.ScreenPermissions.check('users_edit', tUsers('editUser'));
        }
        return;
      }

      if (isAdminUser) {
        await prepareBranchAssignments(user);
      }
    } else {
      if (window.ScreenPermissions && !window.ScreenPermissions.check('users_add', tUsers('addUser'))) {
        return;
      }
      modalTitle.textContent = tUsers('addUser');
      document.getElementById('nu_id').value = '';
      document.getElementById('nu_active').checked = true;
      pwdInput.setAttribute('required', 'required');
      pwdRequiredMark.style.display = 'inline';
      pwdHint.style.display = 'none';
      
      // Enable all fields for new user
      document.getElementById('nu_username').removeAttribute('disabled');
      document.getElementById('nu_fullname').removeAttribute('disabled');
      document.getElementById('nu_role').removeAttribute('disabled');
      document.getElementById('nu_active').removeAttribute('disabled');
      await prepareBranchAssignments();
    }
    
    modal.setAttribute('aria-hidden', 'false');
  }

  // Close modal
  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    editingUser = null;
  }

  // Load users
  async function loadUsers() {
    try {
      currentBranch = getStoredCurrentBranch();
      await loadBranchesCatalog(false, true);
      const requestPayload = (!isCurrentUserAdmin() && currentUser?.id)
        ? { viewerUserId: currentUser.id }
        : {};
      const result = await window.users.getUsers(requestPayload);
      if (result.success) {
        let users = result.data || [];
        
        if (!isCurrentUserAdmin() && currentUser) {
          users = users.filter(u => u.id === currentUser.id);
        }
        
        allUsers = users;
        updateStats();
        renderUsers(allUsers);
        
        // Hide/show UI elements based on role
        applyUIRestrictions();
      } else {
        showToast('error', result.error || tUsers('loadUsersFailed'));
      }
    } catch (error) {
      showToast('error', tUsers('loadDataError'));
      
    }
  }
  
  // Apply UI restrictions based on user role
  function applyUIRestrictions() {
    const isAdminUser = isCurrentUserAdmin();
    const canAddUsers = hasUsersPermission('users_add');
    const canExportUsers = hasUsersPermission('users_export');
    const btnInitPermissions = document.getElementById('btnInitPermissions');

    if ((!isAdminUser || !canAddUsers) && btnNewUser) {
      btnNewUser.style.display = 'none';
    }

    if (!isAdminUser) {
      // Hide statistics cards for limited users
      const totalUsersCard = document.getElementById('totalUsersCard');
      const activeUsersCard = document.getElementById('activeUsersCard');
      const adminCard = document.querySelector('.card.form-card:nth-child(3)');
      if (totalUsersCard) totalUsersCard.style.display = 'none';
      if (activeUsersCard) activeUsersCard.style.display = 'none';
      if (adminCard) adminCard.style.display = 'none';
      if (btnInitPermissions) btnInitPermissions.style.display = 'none';

      // Update table header
      const tableHead = document.querySelector('.table-head h3');
      if (tableHead) tableHead.textContent = tUsers('tableMyInfo');
    }

    if (!canExportUsers) {
      if (document.getElementById('btnExportExcel')) {
        document.getElementById('btnExportExcel').style.display = 'none';
      }
      if (document.getElementById('btnExportPdf')) {
        document.getElementById('btnExportPdf').style.display = 'none';
      }
    }
  }

  // Update statistics
  function updateStats() {
    const total = allUsers.length;
    const active = allUsers.filter(u => u.active === 1).length;
    const inactive = total - active;
    const admins = allUsers.filter(u => u.role === 'admin').length;
    const regular = total - admins;
    
    const now = new Date();
    const thisMonth = allUsers.filter(u => {
      const created = new Date(u.created_at);
      return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
    }).length;
    
    document.getElementById('totalUsersValue').textContent = total;
    document.getElementById('totalUsersMonth').textContent = `${thisMonth} ${tUsers('usersAddedThisMonth')}`;
    document.getElementById('activeUsersValue').textContent = active;
    document.getElementById('inactiveUsersValue').textContent = inactive;
    document.getElementById('adminUsersValue').textContent = admins;
    document.getElementById('regularUsersValue').textContent = regular;
    
    const monthBar = document.getElementById('monthBar');
    if (monthBar) {
      const percentage = total > 0 ? (thisMonth / total) * 100 : 0;
      monthBar.style.width = percentage + '%';
    }
  }

  // Render users table
  function renderUsers(users) {
    tbody.innerHTML = '';
    
    if (users.length === 0) {
      tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;padding:20px;color:var(--subtle)">لا توجد بيانات</td></tr>';
      return;
    }
    
    users.forEach(user => {
      const tr = document.createElement('tr');
      
      // Protect default admin user
      const isDefaultAdmin = user.username === 'Smart Accountant';
      const isAdminUser = isCurrentUserAdmin();
      const isSelf = currentUser && user.id === currentUser.id;
      
      const canManagePermissions = isAdminUser && hasUsersPermission('users_manage_permissions');
      const canDeleteUsers = isAdminUser && hasUsersPermission('users_delete');
      const canEditUsers = isAdminUser && hasUsersPermission('users_edit');
      const canEditSelf = !isAdminUser && isSelf && hasUsersPermission('users_edit');
      const canToggleActive = canEditUsers && !isDefaultAdmin;
      const showEditBtn = canEditUsers || (canEditSelf && hasUsersPermission('users_edit'));
      const showPermissionsBtn = canManagePermissions;
      const showDeleteBtn = canDeleteUsers && !isDefaultAdmin; // Cannot delete default admin
      const editTitle = !isAdminUser && isSelf ? 'تعديل كلمة المرور والتلميح' : (canEditUsers ? 'تعديل' : 'تعديل كلمة المرور');
      const branchSummary = buildBranchSummary(user);
      
      tr.innerHTML = `
        <td>${user.id}</td>
        <td>${user.username}${isDefaultAdmin ? ' <span class="badge" style="background:#00a99d;color:white;font-size:10px;padding:2px 6px">افتراضي</span>' : ''}</td>
        <td>${user.full_name}</td>
        <td><span class="badge role-${user.role}">${user.role === 'admin' ? 'مدير' : 'مستخدم'}</span></td>
        <td>${branchSummary}</td>
        <td>
          ${canToggleActive ? `
            <label class="switch">
              <input type="checkbox" ${user.active === 1 ? 'checked' : ''} data-id="${user.id}" class="toggle-active">
              <span class="slider"></span>
            </label>
          ` : (user.active === 1 ? '<span class="badge success">نشط</span>' : '<span class="badge">غير نشط</span>')}
        </td>
        <td>${formatDate(user.created_at)}</td>
        <td>${formatDateTime(user.last_login)}</td>
        <td>
          <div class="row">
            ${showPermissionsBtn ? `
              <button class="icon-btn act-permissions" title="إدارة الصلاحيات" data-id="${user.id}" style="color: #6366f1">
                <i class="fa-solid fa-key"></i>
              </button>
            ` : ''}
            ${showEditBtn ? `
              <button class="icon-btn act-edit" title="${editTitle}" data-id="${user.id}">
                <i class="fa-solid fa-pen"></i>
              </button>
            ` : ''}
            ${showDeleteBtn ? `
              <button class="icon-btn act-delete" title="حذف" data-id="${user.id}">
                <i class="fa-solid fa-xmark"></i>
              </button>
            ` : ''}
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
    
    // Attach event listeners
    tbody.querySelectorAll('.act-permissions').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        const user = allUsers.find(u => u.id === id);
        if (user) openPermissionsModal(user);
      });
    });
    
    tbody.querySelectorAll('.act-edit').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        const user = allUsers.find(u => u.id === id);
        if (!user) return;
        if (!hasUsersPermission('users_edit')) {
          if (window.ScreenPermissions) {
            window.ScreenPermissions.check('users_edit', tUsers('editUser'));
          } else {
            showToast('error', tUsers('operationFailed'));
          }
          return;
        }
        openModal(user);
      });
    });
    
    tbody.querySelectorAll('.act-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        const user = allUsers.find(u => u.id === id);
        if (user) openDeleteConfirm(user);
      });
    });
    
    tbody.querySelectorAll('.toggle-active').forEach(checkbox => {
      checkbox.addEventListener('change', async (e) => {
        const id = parseInt(e.target.getAttribute('data-id'));
        const user = allUsers.find(u => u.id === id);
        if (user) {
          user.active = e.target.checked ? 1 : 0;
          await saveUser(user);
        }
      });
    });
  }

  // Search users
  if (usersSearch) {
    usersSearch.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (!query) {
        renderUsers(allUsers);
        return;
      }
      
      const filtered = allUsers.filter(user => 
        user.username.toLowerCase().includes(query) ||
        user.full_name.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query) ||
        String(getBranchDisplayName(getBranchById(user.default_branch_id) || {})).toLowerCase().includes(query) ||
        String(user.id).includes(query)
      );
      renderUsers(filtered);
    });
  }

  // Save user
  async function saveUser(userData) {
    // ✅ فحص دقيق للصلاحية: نعتمد على userData.id
    const isActualEdit = userData.id && Number.isFinite(parseInt(userData.id, 10));
    const isSelfEdit = isActualEdit && currentUser && Number(userData.id) === Number(currentUser.id);
    const isAdminUser = isCurrentUserAdmin();
    
    if (isActualEdit) {
      // تعديل مستخدم موجود - يحتاج صلاحية تعديل
      if (window.ScreenPermissions && !window.ScreenPermissions.check('users_edit', 'تعديل مستخدم')) {
        return;
      }

      if (!isAdminUser && !isSelfEdit) {
        showToast('error', 'يمكنك تعديل حسابك فقط');
        return;
      }
      
      // طلب تأكيد كلمة المرور للتعديل
      const confirmFn = window.confirmEditWithPassword || window.parent?.confirmEditWithPassword || window.top?.confirmEditWithPassword;
      if (confirmFn) {
        try {
          const confirmed = await confirmFn();
          if (!confirmed) return;
        } catch (e) {
          if (e.message !== 'cancelled') {
            // Silent error handling
          }
          return;
        }
      }
    } else {
      // إضافة مستخدم جديد - يحتاج صلاحية إضافة
      if (window.ScreenPermissions && !window.ScreenPermissions.check('users_add', 'إضافة مستخدم')) {
        return;
      }
    }

    // Add user tracking
    const trackingUserId = getCurrentUserId();
    if (isActualEdit) {
      userData.updated_by = trackingUserId;
    } else {
      userData.created_by = trackingUserId;
    }

    try {
      let result;
      if (userData.id) {
        result = await window.users.updateUser(userData);
      } else {
        result = await window.users.addUser(userData);
      }
      
      if (result.success) {
        showToast('success', userData.id ? tUsers('updateSuccess') : tUsers('addSuccess'));
        await loadUsers();
        if (!userData.id || modal.getAttribute('aria-hidden') === 'false') {
          closeModal();
        }
      } else {
        showToast('error', result.error || tUsers('operationFailed'));
        errorEl.textContent = result.error || tUsers('operationFailed');
      }
    } catch (error) {
      showToast('error', tUsers('saveError'));
      errorEl.textContent = tUsers('saveError');
      
    }
  }

  // Form submit
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  }

  if (modalSave) {
    modalSave.addEventListener('click', async () => {
      errorEl.textContent = '';
      
      const id = document.getElementById('nu_id').value;
      const password = document.getElementById('nu_password').value.trim();
      const hint = document.getElementById('nu_hint').value.trim();
      
      const hasEditPermission = hasUsersPermission('users_edit');
      const isSelf = currentUser && id && parseInt(id) === currentUser.id;
      const isAdminUser = isCurrentUserAdmin();

      if (!hasEditPermission && id) {
        if (window.ScreenPermissions) {
          window.ScreenPermissions.check('users_edit', tUsers('editUser'));
        } else if (window.PermissionDeniedModal && typeof window.PermissionDeniedModal.show === 'function') {
          window.PermissionDeniedModal.show(tUsers('noEditPermission'));
        } else {
          errorEl.textContent = tUsers('noEditPermission');
        }
        return;
      }

      if (branchesErrorEl) {
        branchesErrorEl.textContent = '';
      }

      // Non-admin users can edit only their own password and hint
      if (!isAdminUser && isSelf) {
        const originalHint = String(editingUser?.password_hint || '');
        if (!password && hint === originalHint) {
          errorEl.textContent = 'الرجاء تعديل كلمة المرور أو التلميح';
          return;
        }
        
        const userData = {
          id: parseInt(id),
          username: currentUser.username,
          full_name: currentUser.full_name,
          role: currentUser.role,
          active: currentUser.active,
          password_hint: hint
        };

        if (password) {
          userData.password = password;
        }
        
        await saveUser(userData);
        return;
      }
      
      // Admin can edit everything
      const username = document.getElementById('nu_username').value.trim();
      const fullname = document.getElementById('nu_fullname').value.trim();
      const role = document.getElementById('nu_role').value;
      const active = document.getElementById('nu_active').checked ? 1 : 0;
      
      if (!username || !fullname) {
        errorEl.textContent = 'الرجاء ملء جميع الحقول المطلوبة';
        return;
      }
      
      if (!id && !password) {
        errorEl.textContent = 'كلمة المرور مطلوبة';
        return;
      }

      const branchAssignments = collectBranchAssignments();
      if (!branchAssignments) {
        return;
      }
      
      const userData = {
        username,
        full_name: fullname,
        password_hint: hint,
        role,
        active,
        ...branchAssignments
      };
      
      if (password) {
        userData.password = password;
      }
      
      if (id) {
        userData.id = parseInt(id);
      }
      
      await saveUser(userData);
    });
  }

  // Delete confirmation
  function openDeleteConfirm(user) {
    if (window.ScreenPermissions && !window.ScreenPermissions.check('users_delete', tUsers('delete'))) {
      return;
    }
    
    userToDelete = user;
    confirmDelMsg.textContent = `${tUsers('confirmDeleteMsg')} (${user.username})`;
    confirmModal.setAttribute('aria-hidden', 'false');
  }

  function closeDeleteConfirm() {
    confirmModal.setAttribute('aria-hidden', 'true');
    userToDelete = null;
  }

  async function deleteUser() {
    if (!userToDelete) return;

    if (window.ScreenPermissions && !window.ScreenPermissions.has('users_delete')) {
      window.ScreenPermissions.check('users_delete', tUsers('delete'));
      closeDeleteConfirm();
      return;
    }
    
    // طلب تأكيد كلمة المرور للحذف
    const confirmFn = window.confirmDeleteWithPassword || window.parent?.confirmDeleteWithPassword || window.top?.confirmDeleteWithPassword;
    if (confirmFn) {
      try {
        const confirmed = await confirmFn();
        if (!confirmed) {
          closeDeleteConfirm();
          return;
        }
      } catch (e) {
        if (e.message !== 'cancelled') {
          // Silent error handling
        }
        closeDeleteConfirm();
        return;
      }
    }
    
    try {
      const result = await window.users.deleteUser(userToDelete.id);
      if (result.success) {
        showToast('success', tUsers('deleteSuccess'));
        await loadUsers();
        closeDeleteConfirm();
      } else {
        showToast('error', result.error || tUsers('deleteFailed'));
      }
    } catch (error) {
      showToast('error', tUsers('deleteError'));
      
    }
  }

  // Event listeners
  if (btnNewUser) {
    btnNewUser.addEventListener('click', () => {
      if (window.ScreenPermissions && !window.ScreenPermissions.check('users_add', tUsers('addUser'))) {
        return;
      }
      openModal();
    });
  }
  
  // Initialize Permissions button
  const btnInitPermissions = document.getElementById('btnInitPermissions');
  const initPermissionsModal = document.getElementById('initPermissionsModal');
  const initPermModalClose = document.getElementById('initPermModalClose');
  const initPermModalCancel = document.getElementById('initPermModalCancel');
  const initPermBtn = document.getElementById('initPermBtn');
  const initLog = document.getElementById('initLog');
  const initStats = document.getElementById('initStats');
  
  if (btnInitPermissions) {
    btnInitPermissions.addEventListener('click', () => {
      if (window.ScreenPermissions && !window.ScreenPermissions.check('users_manage_permissions', tUsers('managePermissions'))) {
        return;
      }
      // Open init permissions modal
      openInitPermissionsModal();
    });
  }
  
  function openInitPermissionsModal() {
    if (initPermissionsModal) {
      initPermissionsModal.setAttribute('aria-hidden', 'false');
      // Clear log
      if (initLog) initLog.innerHTML = '';
      if (initStats) initStats.style.display = 'none';
      if (initPermBtn) {
        initPermBtn.disabled = false;
        initPermBtn.textContent = '🔄 ' + tUsers('startInit');
        initPermBtn.style.background = '';
      }
    }
  }
  
  function closeInitPermissionsModal() {
    if (initPermissionsModal) {
      initPermissionsModal.setAttribute('aria-hidden', 'true');
    }
  }
  
  if (initPermModalClose) initPermModalClose.addEventListener('click', closeInitPermissionsModal);
  if (initPermModalCancel) initPermModalCancel.addEventListener('click', closeInitPermissionsModal);
  
  // Initialize permissions functionality
  if (initPermBtn) {
    initPermBtn.addEventListener('click', async () => {
      await initializeAllPermissions();
    });
  }
  
  // Remove duplicates functionality
  const removeDuplicatesBtn = document.getElementById('removeDuplicatesBtn');
  if (removeDuplicatesBtn) {
    removeDuplicatesBtn.addEventListener('click', async () => {
      await removeDuplicatePermissions();
    });
  }
  
  async function removeDuplicatePermissions() {
    const btn = removeDuplicatesBtn;
    
    if (!window.permissions || !window.permissions.removeDuplicatePermissions) {
      logInit('❌ ' + tUsers('apiNotAvailable'), 'error');
      showToast('error', tUsers('apiNotAvailable'));
      return;
    }
    
    btn.disabled = true;
    btn.textContent = '⏳ جاري التنظيف...';
    
    logInit('🧹 بدء تنظيف الصلاحيات المكررة والقديمة', 'info');
    logInit('📋 سيتم الاحتفاظ فقط بالصلاحيات الموحدة (مثل: customers_view)', 'info');
    logInit('🗑️ سيتم حذف الصلاحيات القديمة (مثل: عرض قائمة العملاء)', 'warning');
    
    try {
      const result = await window.permissions.removeDuplicatePermissions();
      
      if (result.success) {
        resetPermissionsCatalogCache();
        await ensurePermissionsCatalogLoaded(true);
        logInit('═'.repeat(50), 'info');
        logInit(`✅ تم التنظيف بنجاح!`, 'success');
        logInit(`🗑️ تم حذف: ${result.removed} صلاحية`, 'success');
        logInit(`📊 الصلاحيات المتبقية: ${result.after}`, 'info');
        logInit(`✅ الآن لا يوجد تكرار - كل صلاحية مرة واحدة فقط`, 'success');
        
        btn.textContent = '✅ تم التنظيف';
        btn.style.background = 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)';
        
        showToast('success', tUsers('cleanupSuccess').replace('{count}', result.removed));
        
        // Re-enable after 3 seconds
        setTimeout(() => {
          btn.disabled = false;
          btn.textContent = '🧹 إزالة التكرار';
          btn.style.background = 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)';
        }, 3000);
      } else {
        logInit(`❌ فشل: ${result.error}`, 'error');
        btn.textContent = '❌ فشلت الإزالة';
        btn.disabled = false;
      }
    } catch (error) {
      logInit(`❌ خطأ: ${error.message}`, 'error');
      btn.textContent = '❌ خطأ';
      btn.disabled = false;
    }
  }
  
  async function initializeAllPermissions() {
    const btn = initPermBtn;
    const stats = initStats;
    const log = initLog;
    
    btn.disabled = true;
    btn.textContent = '⏳ جاري التهيئة...';
    stats.style.display = 'grid';
    
    logInit('🚀 بدء تهيئة نظام الصلاحيات الشامل', 'info');
    
    let totalAdded = 0;
    let totalSkipped = 0;
    
    try {
      for (const [category, categoryInfo] of Object.entries(PERMISSIONS_STRUCTURE)) {
        logInit(`📦 معالجة فئة: ${categoryInfo.name}`, 'info');
        
        for (const perm of categoryInfo.permissions) {
          const code = `${category}_${perm}`;  // perm is the action string
          const actionName = ACTION_NAMES[perm] || perm;
          const description = `${actionName} ${categoryInfo.name}`;
          
          try {
            const result = await window.permissions.createPermission({
              code: code,
              category: category,
              action: perm,
              description: description
            });
            
            if (result.success) {
              logInit(`  ✅ تمت الإضافة: ${description}`, 'success');
              totalAdded++;
            } else {
              if (result.error && result.error.includes('UNIQUE')) {
                logInit(`  ⏭️ موجود مسبقاً: ${description}`, 'warning');
                totalSkipped++;
              } else {
                logInit(`  ❌ خطأ: ${description} - ${result.error}`, 'error');
              }
            }
          } catch (err) {
            logInit(`  ❌ استثناء: ${description} - ${err.message}`, 'error');
          }
        }
      }
      
      // Update stats
      document.getElementById('totalCount').textContent = totalAdded + totalSkipped;
      document.getElementById('addedCount').textContent = totalAdded;
      document.getElementById('categoriesCount').textContent = Object.keys(PERMISSIONS_STRUCTURE).length;
      resetPermissionsCatalogCache();
      await ensurePermissionsCatalogLoaded(true);
      
      logInit('', 'info');
      logInit('═'.repeat(50), 'info');
      logInit('✅ اكتملت تهيئة نظام الصلاحيات بنجاح!', 'success');
      logInit('═'.repeat(50), 'info');
      logInit(`📊 الإحصائيات:`, 'info');
      logInit(`   • صلاحيات جديدة: ${totalAdded}`, 'success');
      logInit(`   • صلاحيات موجودة: ${totalSkipped}`, 'warning');
      logInit(`   • الإجمالي: ${totalAdded + totalSkipped}`, 'info');
      logInit(`   • الفئات: ${Object.keys(PERMISSIONS_STRUCTURE).length}`, 'info');
      
      btn.textContent = '✅ ' + tUsers('initDone');
      btn.style.background = 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)';
      
      showToast('success', tUsers('initSuccess').replace('{count}', totalAdded));
      
    } catch (error) {
      logInit(`❌ خطأ فادح: ${error.message}`, 'error');
      btn.textContent = '❌ ' + tUsers('initFailed');
      btn.style.background = 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)';
      showToast('error', tUsers('initFailed'));
    }
  }
  
  function logInit(message, type = 'info') {
    if (!initLog) return;
    const item = document.createElement('div');
    item.style.cssText = 'padding:5px 0;border-bottom:1px solid var(--border);';
    
    let color = 'var(--text)';
    if (type === 'success') color = 'var(--success)';
    else if (type === 'error') color = 'var(--error)';
    else if (type === 'warning') color = '#f39c12';
    else if (type === 'info') color = 'var(--primary)';
    
    item.style.color = color;
    item.textContent = `${new Date().toLocaleTimeString('ar-SA')} | ${message}`;
    initLog.appendChild(item);
    initLog.scrollTop = initLog.scrollHeight;
  }
  if (btnRefreshUsers) btnRefreshUsers.addEventListener('click', loadUsers);
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalCancel) modalCancel.addEventListener('click', closeModal);
  if (modal) {
    const backdrop = modal.querySelector('.modal-backdrop');
    if (backdrop) backdrop.addEventListener('click', (e) => {
      if (e.target.hasAttribute('data-close')) closeModal();
    });
  }
  
  if (confirmDelClose) confirmDelClose.addEventListener('click', closeDeleteConfirm);
  if (confirmDelNo) confirmDelNo.addEventListener('click', closeDeleteConfirm);
  if (confirmDelYes) confirmDelYes.addEventListener('click', deleteUser);
  if (confirmModal) {
    const backdrop = confirmModal.querySelector('.modal-backdrop');
    if (backdrop) backdrop.addEventListener('click', (e) => {
      if (e.target.hasAttribute('data-close')) closeDeleteConfirm();
    });
  }

  // Export functionality
  const btnExportExcel = document.getElementById('btnExportExcel');
  const btnExportPdf = document.getElementById('btnExportPdf');
  
  if (btnExportExcel) {
    btnExportExcel.addEventListener('click', () => {
      if (window.ScreenPermissions && !window.ScreenPermissions.check('users_export', tUsers('exportExcel'))) {
        return;
      }
      const t = USERS_TRANSLATIONS[getUsersLang()];
      // Simple Excel export
      const data = allUsers.map(u => ({
        [t.id]: u.id,
        [t.username]: u.username,
        [t.fullName]: u.full_name,
        [t.role]: u.role === 'admin' ? t.admin : t.user,
        [t.branchesLabel]: formatUsersText('defaultBranchPrefix', {
          name: getBranchDisplayName(getBranchById(u.default_branch_id) || {})
        }) + ' - ' + formatUsersText('branchSummaryCount', { count: Number(u.branch_count || 0) }),
        [t.activeStatus]: u.active === 1 ? t.yes : t.no,
        [t.createdDate]: formatDate(u.created_at),
      }));
      
      // Convert to Excel-compatible HTML
      const headers = Object.keys(data[0] || {});
      let html = '<table><thead><tr>';
      headers.forEach(h => html += `<th>${h}</th>`);
      html += '</tr></thead><tbody>';
      data.forEach(row => {
        html += '<tr>';
        headers.forEach(h => html += `<td>${row[h]}</td>`);
        html += '</tr>';
      });
      html += '</tbody></table>';
      
      const blob = new Blob(['\ufeff' + html], { type: 'application/vnd.ms-excel;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'users.xls';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        URL.revokeObjectURL(url);
        a.remove();
      }, 0);
    });
  }

  if (btnExportPdf) {
    btnExportPdf.addEventListener('click', () => {
      if (window.ScreenPermissions && !window.ScreenPermissions.check('users_export', tUsers('exportPdf'))) {
        return;
      }
      const lang = getUsersLang();
      const isEn = lang === 'en';
      const t = USERS_TRANSLATIONS[lang];
      
      // Build HTML content for PDF
      const now = new Date().toLocaleString(isEn ? 'en-GB' : 'ar-SA', { 
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit'
      });
      let html = `
        <!DOCTYPE html>
        <html lang="${lang}" dir="${isEn ? 'ltr' : 'rtl'}">
        <head>
          <meta charset="UTF-8">
          <title>${t.usersList}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Arial', 'Tahoma', sans-serif; padding: 30px; background: white; color: #000; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #00a99d; padding-bottom: 15px; }
            .header h1 { font-size: 28px; color: #00a99d; margin-bottom: 8px; }
            .header .date { font-size: 14px; color: #666; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 10px; text-align: ${isEn ? 'left' : 'right'}; }
            th { background: #00a99d; color: white; font-weight: 600; }
            tr:nth-child(even) { background: #f9f9f9; }
            .badge { display: inline-block; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; }
            .badge.admin { background: #fff3cd; color: #856404; }
            .badge.user { background: #d1ecf1; color: #0c5460; }
            .badge.active { background: #d4edda; color: #155724; }
            .badge.inactive { background: #f8d7da; color: #721c24; }
            @media print {
              body { padding: 10px; }
              .no-print { display: none; }
            }
            .print-button{position:fixed;bottom:30px;left:30px;background:linear-gradient(135deg,#00897B 0%,#00695C 100%);color:white;border:none;padding:15px 30px;border-radius:50px;font-size:16px;font-weight:700;cursor:pointer;box-shadow:0 4px 20px rgba(0,137,123,0.4);transition:all 0.3s;z-index:1000;display:inline-flex;align-items:center;gap:8px}
            .print-button:hover{transform:translateY(-2px);box-shadow:0 6px 30px rgba(0,137,123,0.5)}
            .print-button i{font-style:normal}
          </style>
        </head>
        <body><main>
          <h1>${t.usersList}</h1>
          <div class="date">${t.printDate}: ${now}</div>
          <table>
            <thead>
              <tr>
                <th>${t.id}</th>
                <th>${t.username}</th>
                <th>${t.fullName}</th>
                <th>${t.role}</th>
                <th>${t.branchesLabel}</th>
                <th>${t.status}</th>
                <th>${t.createdDate}</th>
                <th>${t.lastLogin}</th>
              </tr>
            </thead>
            <tbody>
      `;
      
      allUsers.forEach(user => {
        html += `
          <tr>
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.full_name}</td>
            <td><span class="badge ${user.role === 'admin' ? 'admin' : 'user'}">${user.role === 'admin' ? t.admin : t.user}</span></td>
            <td>${formatUsersText('defaultBranchPrefix', { name: getBranchDisplayName(getBranchById(user.default_branch_id) || {}) })}<br>${formatUsersText('branchSummaryCount', { count: Number(user.branch_count || 0) })}</td>
            <td><span class="badge ${user.active === 1 ? 'active' : 'inactive'}">${user.active === 1 ? t.activeYes : t.activeNo}</span></td>
            <td>${formatDate(user.created_at)}</td>
            <td>${formatDateTime(user.last_login)}</td>
          </tr>
        `;
      });
      
      html += `
            </tbody>
          </table>
          <button class="print-button no-print" onclick="window.print()"><i>🖨️</i>${t.print}</button>
          <script>
            window.onload = function() {
              setTimeout(() => window.print(), 500);
            };
          </script>
        </body>
        </html>
      `;
      
      // Open in new window for printing
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(html);
        printWindow.document.close();
      } else {
        showToast('error', tUsers('printWindowFailed'));
      }
    });
  }

  // ===== Permissions Management =====
  
  const permModal = document.getElementById('permissionsModal');
  const permModalClose = document.getElementById('permModalClose');
  const permModalCancel = document.getElementById('permModalCancel');
  const permModalSave = document.getElementById('permModalSave');
  const permModalTitle = document.getElementById('permModalTitle');
  const permissionsContainer = document.getElementById('permissionsContainer');
  const permUserIdInput = document.getElementById('perm_user_id');
  
  let currentPermUser = null;
  let allPermissions = {};
  let userPermissionIds = [];
  let currentCategoryKey = null; // الشاشة/الفئة الحالية المعروضة في الجهة اليسرى
  let permissionsCatalogLoadedAt = 0;
  let permissionsCatalogInFlight = null;
  const PERMISSIONS_CATALOG_TTL_MS = 60000;

  function resetPermissionsCatalogCache() {
    allPermissions = {};
    permissionsCatalogLoadedAt = 0;
    permissionsCatalogInFlight = null;
  }

  async function ensurePermissionsCatalogLoaded(force = false) {
    const hasCatalog = allPermissions && Object.keys(allPermissions).length > 0;
    const isFresh = (Date.now() - permissionsCatalogLoadedAt) < PERMISSIONS_CATALOG_TTL_MS;

    if (!force && hasCatalog && isFresh) {
      return { success: true, data: allPermissions };
    }

    if (permissionsCatalogInFlight) {
      return permissionsCatalogInFlight;
    }

    permissionsCatalogInFlight = (async () => {
      const permsResult = await window.permissions.getPermissionsByCategory();
      if (permsResult && permsResult.success && permsResult.data) {
        allPermissions = permsResult.data;
        permissionsCatalogLoadedAt = Date.now();
      }
      return permsResult;
    })();

    try {
      return await permissionsCatalogInFlight;
    } finally {
      permissionsCatalogInFlight = null;
    }
  }
  
  // Comprehensive permissions structure with all screens
  const PERMISSIONS_STRUCTURE = {
    customers: {
      name: 'العملاء',
      icon: '<i class="fa-solid fa-user-tie"></i>',
      permissions: ['view', 'add', 'edit', 'delete', 'export']
    },
    suppliers: {
      name: 'الموردين',
      icon: '<i class="fa-solid fa-truck-field"></i>',
      permissions: ['view', 'add', 'edit', 'delete', 'export']
    },
    accounts: {
      name: 'الحسابات',
      icon: '<i class="fa-solid fa-building-columns"></i>',
      permissions: ['view', 'add', 'edit', 'delete', 'export']
    },
    vouchers: {
      name: 'سندات الصرف',
      icon: '<i class="fa-solid fa-money-bill-transfer"></i>',
      permissions: ['view', 'add', 'edit', 'delete', 'print', 'export']
    },
    receipts: {
      name: 'سندات القبض',
      icon: '<i class="fa-solid fa-hand-holding-dollar"></i>',
      permissions: ['view', 'add', 'edit', 'delete', 'print', 'export']
    },
    journal: {
      name: 'القيود اليومية',
      icon: '<i class="fa-solid fa-book"></i>',
      permissions: ['view', 'add', 'edit', 'delete', 'print', 'export']
    },
    sales_invoices: {
      name: 'فواتير البيع',
      icon: '<i class="fa-solid fa-file-invoice-dollar"></i>',
      permissions: ['view', 'add', 'edit', 'delete', 'print', 'export']
    },
    purchase_invoices: {
      name: 'فواتير الشراء',
      icon: '<i class="fa-solid fa-cart-shopping"></i>',
      permissions: ['view', 'add', 'edit', 'delete', 'print', 'export']
    },
    opening: {
      name: 'الأرصدة الافتتاحية',
      icon: '<i class="fa-solid fa-calculator"></i>',
      permissions: ['view', 'add', 'edit', 'delete']
    },
    movement: {
      name: 'الحركة',
      icon: '<i class="fa-solid fa-list-check"></i>',
      permissions: ['view', 'print']
    },
    sales_purchase_movement: {
      name: 'حركة المبيعات والمشتريات',
      icon: '<i class="fa-solid fa-arrow-right-arrow-left"></i>',
      permissions: ['view', 'export']
    },
    orders: {
      name: 'الأوردرات',
      icon: '<i class="fa-solid fa-clipboard-list"></i>',
      permissions: ['view', 'add', 'edit', 'delete', 'complete', 'export']
    },
    reports: {
      name: 'التقارير',
      icon: '<i class="fa-solid fa-chart-pie"></i>',
      permissions: ['view_statement', 'view_trial_balance', 'view_quick_statement', 'view_category_report', 'view_tax_report', 'view_income_statement', 'view_balance_sheet', 'export']
    },
    tax_declaration: {
      name: 'الإقرار الضريبي',
      icon: '<i class="fa-solid fa-file-invoice"></i>',
      permissions: ['view', 'generate', 'save_draft', 'submit', 'print', 'export', 'delete']
    },
    gold_items: {
      name: 'أصناف العيارات',
      icon: '<i class="fa-solid fa-gem"></i>',
      permissions: ['view', 'add', 'edit', 'delete', 'export']
    },
    branches: {
      name: 'الفروع',
      icon: '<i class="fa-solid fa-code-branch"></i>',
      permissions: ['view', 'add', 'edit', 'delete']
    },
    users: {
      name: 'المستخدمين',
      icon: '<i class="fa-solid fa-users-gear"></i>',
      permissions: ['view', 'add', 'edit', 'delete', 'manage_permissions']
    },
    settings: {
      name: 'الإعدادات',
      icon: '<i class="fa-solid fa-gear"></i>',
      permissions: ['view', 'edit', 'backup', 'restore']
    },
    cloud_settings: {
      name: 'إعدادات السحابة',
      icon: '<i class="fa-solid fa-cloud"></i>',
      permissions: ['view', 'edit', 'sync', 'upload', 'local_connect']
    },
    dashboard: {
      name: 'لوحة التحكم',
      icon: '<i class="fa-solid fa-gauge-high"></i>',
      permissions: ['view', 'view_statistics']
    },
    open_positions: {
      name: 'المراكز المفتوحة',
      icon: '<i class="fa-solid fa-scale-unbalanced"></i>',
      permissions: ['view', 'export']
    },
    whatsapp_reports: {
      name: 'واتساب للأعمال',
      icon: '<i class="fa-brands fa-whatsapp"></i>',
      permissions: ['view', 'connect', 'edit', 'send']
    }
  };

  // Action names in Arabic - Updated to match database
  const ACTION_NAMES = {
    view: 'عرض',
    add: 'إضافة',
    edit: 'تعديل',
    delete: 'حذف',
    export: 'تصدير',
    print: 'طباعة',
    complete: 'إكمال',
    manage_permissions: 'إدارة الصلاحيات',
    backup: 'نسخ احتياطي',
    restore: 'استعادة',
    view_statistics: 'عرض الإحصائيات',
    view_statement: 'كشف الحساب',
    view_trial_balance: 'ميزان المراجعة',
    view_quick_statement: 'كشف حساب سريع',
    view_category_report: 'تقرير حسب الأصناف',
    view_tax_report: 'تقرير الضرائب',
    view_tax_declaration: 'الإقرار الضريبي',
    view_income_statement: 'قائمة الدخل',
    view_balance_sheet: 'الميزانية العمومية',
    save_draft: 'حفظ كمسودة',
    submit: 'تقديم',
    generate: 'إنشاء',
    sync: 'مزامنة',
    upload: 'رفع',
    local_connect: 'اتصال محلي',
    connect: 'ربط/فصل',
    send: 'إرسال',
    // Enhanced action names for better display
    orders_view: 'عرض الأوردرات',
    orders_add: 'إضافة أوردر',
    orders_edit: 'تعديل أوردر',
    orders_delete: 'حذف أوردر',
    orders_complete: 'إكمال أوردر',
    orders_export: 'تصدير الأوردرات',
    cloud_settings_view: 'عرض إعدادات السحابة',
    cloud_settings_edit: 'تعديل إعدادات السحابة',
    cloud_settings_sync: 'مزامنة السحابة',
    cloud_settings_upload: 'رفع قاعدة البيانات للسحابة',
    cloud_settings_local_connect: 'الاتصال بقاعدة البيانات المحلية',
    whatsapp_reports_view: 'عرض واتساب للأعمال',
    whatsapp_reports_connect: 'ربط/فصل واتساب',
    whatsapp_reports_edit: 'تعديل إعدادات واتساب',
    whatsapp_reports_send: 'إرسال رسائل واتساب'
  };
  
  // Legacy support
  const categoryNames = {
    customers: 'العملاء',
    suppliers: 'الموردين',
    accounts: 'الحسابات',
    vouchers: 'سندات الصرف',
    receipts: 'سندات القبض',
    journal: 'القيود اليومية',
    sales_invoices: 'فواتير البيع',
    purchase_invoices: 'فواتير الشراء',
    opening: 'الأرصدة الافتتاحية',
    movement: 'الحركة',
    sales_purchase_movement: 'حركة المبيعات والمشتريات',
    orders: 'الأوردرات',
    reports: 'التقارير',
    gold_items: 'أصناف العيارات',
    users: 'المستخدمين',
    settings: 'الإعدادات',
    cloud_settings: 'إعدادات السحابة',
    dashboard: 'لوحة التحكم',
    open_positions: 'المراكز المفتوحة',
    whatsapp_reports: 'واتساب للأعمال'
  };
  
  // Icon classes per action (for permissions UI only)
  const ACTION_ICON_CLASSES = {
    view: 'fa-regular fa-eye',
    add: 'fa-solid fa-plus',
    edit: 'fa-solid fa-pen',
    delete: 'fa-regular fa-trash-can',
    export: 'fa-solid fa-file-export',
    print: 'fa-solid fa-print',
    complete: 'fa-solid fa-check-double',
    manage_permissions: 'fa-solid fa-key',
    backup: 'fa-solid fa-database',
    restore: 'fa-solid fa-rotate-left',
    sync: 'fa-solid fa-arrows-rotate',
    upload: 'fa-solid fa-cloud-arrow-up',
    local_connect: 'fa-solid fa-hard-drive',
    view_statistics: 'fa-solid fa-chart-line',
    view_statement: 'fa-regular fa-file-lines',
    view_trial_balance: 'fa-solid fa-scale-balanced',
    view_quick_statement: 'fa-solid fa-gauge-high',
    view_category_report: 'fa-solid fa-layer-group',
    view_tax_report: 'fa-solid fa-file-invoice-dollar',
    view_tax_declaration: 'fa-solid fa-file-contract',
    view_income_statement: 'fa-solid fa-chart-column',
    view_balance_sheet: 'fa-solid fa-building-columns',
    connect: 'fa-solid fa-link',
    send: 'fa-solid fa-paper-plane'
  };

  // Role-based templates (UI only - helper to تعبئة الصلاحيات بسرعة)
  const ROLE_TEMPLATES = {
    admin: {
      label: 'مدير',
      applyAll: true
    },
    accountant: {
      label: 'محاسب',
      categories: {
        customers: ['view', 'add', 'edit'],
        suppliers: ['view', 'add', 'edit'],
        accounts: ['view'],
        sales_invoices: ['view', 'add', 'edit', 'delete', 'print', 'export'],
        purchase_invoices: ['view', 'add', 'edit', 'delete', 'print', 'export'],
        vouchers: ['view', 'add', 'edit', 'delete', 'print'],
        receipts: ['view', 'add', 'edit', 'delete', 'print'],
        journal: ['view', 'add', 'edit', 'delete', 'print', 'export'],
        opening: ['view', 'add', 'edit', 'delete'],
        sales_purchase_movement: ['view', 'export'],
        reports: ['view_statement', 'view_trial_balance', 'view_quick_statement', 'view_category_report', 'view_tax_report', 'view_tax_declaration', 'view_income_statement', 'view_balance_sheet', 'export'],
        dashboard: ['view', 'view_statistics']
      }
    },
    cashier: {
      label: 'أمين الصندوق',
      categories: {
        sales_invoices: ['view', 'add', 'edit', 'print'],
        vouchers: ['view', 'add', 'edit', 'print'],
        receipts: ['view', 'add', 'edit', 'print'],
        reports: ['view_statement'],
        dashboard: ['view']
      }
    },
    viewer: {
      label: 'مشاهد',
      categories: {
        reports: ['view_statement', 'view_trial_balance', 'view_quick_statement', 'view_category_report', 'view_tax_report', 'view_tax_declaration', 'view_income_statement', 'view_balance_sheet', 'export'],
        dashboard: ['view', 'view_statistics']
      }
    }
  };

  async function openPermissionsModal(user) {
    if (window.ScreenPermissions && !window.ScreenPermissions.check('users_manage_permissions', tUsers('managePermissions'))) {
      return;
    }
    
    currentPermUser = user;
    permUserIdInput.value = user.id;
    const lang = getUsersLang();
    const displayName = lang === 'en' ? (user.username || user.full_name) : (user.full_name || user.username);
    permModalTitle.textContent = `${tUsers('managePermissions')}: ${displayName}`;
    
    // Show modal
    permModal.setAttribute('aria-hidden', 'false');
    
    // Load permissions
    loadPermissions(user.id, { forceCatalogRefresh: true });
  }
  
  function closePermissionsModal() {
    permModal.setAttribute('aria-hidden', 'true');
    currentPermUser = null;
    // Don't clear userPermissionIds here - keep them cached
    // userPermissionIds = [];
  }
  
  async function loadPermissions(userId, options = {}) {
    try {
      permissionsContainer.innerHTML = `<p style="text-align:center;color:var(--subtle)">${tUsers('loading')}</p>`;
      const forceCatalogRefresh = Boolean(options?.forceCatalogRefresh);

      // Load permissions catalog and user permissions in parallel
      const [permsResult, userPermsResult] = await Promise.all([
        ensurePermissionsCatalogLoaded(forceCatalogRefresh),
        window.permissions.getUserPermissions(userId)
      ]);

      if (!permsResult.success) {
        
        permissionsContainer.innerHTML = `<p style="text-align:center;color:var(--error)">${tUsers('permissionsLoadFailed')}</p>`;
        return;
      }
      
      if (userPermsResult.success && userPermsResult.data) {
        // Extract permission IDs
        // API returns: {id, name, display_name, category, description}
        // We need the 'id' field which is the permission ID
        userPermissionIds = userPermsResult.data.map(p => {
          const permId = parseInt(p.id); // Use p.id directly from API
          return permId;
        }).filter(id => !isNaN(id));
      } else {
        userPermissionIds = [];
      }
      
      // Render permissions by category
      renderPermissions();
    } catch (error) {
      
      permissionsContainer.innerHTML = `<p style="text-align:center;color:var(--error)">${tUsers('permissionsLoadError')}</p>`;
    }
  }
  
  function renderPermissions() {
    const categories = Object.keys(PERMISSIONS_STRUCTURE);
    if (!categories.length) {
      permissionsContainer.innerHTML = `<p style="text-align:center;color:var(--error)">${tUsers('noDefinedPermissions')}</p>`;
      return;
    }
    // إذا لم يكن هناك فئة محددة حاليًا، اختر الأولى
    if (!currentCategoryKey || !PERMISSIONS_STRUCTURE[currentCategoryKey]) {
      currentCategoryKey = categories[0];
    }
    
    const screensMeta = [];
    const lang = getUsersLang();
    const t = USERS_TRANSLATIONS[lang] || USERS_TRANSLATIONS.ar;
    
    let html = `
      <div class="perm-toolbar">
        <div class="perm-toolbar-section">
          <span class="perm-toolbar-label">${t.permTemplateLabel || 'قالب:'}</span>
          <select id="permRoleTemplate" class="perm-role-select">
            <option value="">${t.permTemplateSelect || 'اختر قالب'}</option>
            <option value="admin">${(t.roleTemplates && t.roleTemplates.admin) || 'مدير'}</option>
            <option value="accountant">${(t.roleTemplates && t.roleTemplates.accountant) || 'محاسب'}</option>
            <option value="cashier">${(t.roleTemplates && t.roleTemplates.cashier) || 'أمين الصندوق'}</option>
            <option value="viewer">${(t.roleTemplates && t.roleTemplates.viewer) || 'مشاهد'}</option>
          </select>
        </div>
        <div class="perm-toolbar-actions">
          <button type="button" id="permSelectAllBtn" class="perm-toolbar-btn">${t.permSelectAll || 'تحديد الكل'}</button>
          <button type="button" id="permClearAllBtn" class="perm-toolbar-btn secondary">${t.permClearAll || 'مسح الكل'}</button>
        </div>
      </div>
      <div class="perm-layout">
        <div class="perm-left">
    `;
    
    // إنشاء كروت الصلاحيات لكل شاشة (فئة)
    categories.forEach(category => {
      const categoryInfo = PERMISSIONS_STRUCTURE[category];
      const perms = allPermissions[category] || [];
      const isActive = category === currentCategoryKey;
      let totalPerms = 0;
      let grantedPerms = 0;
      const categoryLabel = (t.permCategories && t.permCategories[category]) || categoryInfo.name;
      
      html += `
        <div class="perm-category ${isActive ? 'active' : ''}" data-category="${category}">
          <div class="perm-category-header">
            <span class="perm-category-icon">${categoryInfo.icon}</span>
            <h4 class="perm-category-title">${categoryLabel}</h4>
            <label class="perm-select-all-label">
              <input type="checkbox" class="select-all-category" data-category="${category}">
              <span>${t.permSelectAll || 'تحديد الكل'}</span>
            </label>
          </div>
          <div class="perm-category-grid">
      `;
      
      // Show permissions from DB if available, otherwise from structure
      if (perms.length > 0) {
        // Use DB permissions
        perms.forEach(perm => {
          const permId = parseInt(perm.id);
          const isChecked = userPermissionIds.some(userId => parseInt(userId) === permId);
          
          const permName = perm.name || '';
          let actionKey = permName.replace(category + '_', '');
          if (actionKey === permName) {
            actionKey = permName.split('_').pop();
          }
          
          const actionsMap = t.permActions || {};
          let actionName = actionsMap[actionKey] || ACTION_NAMES[permName] || ACTION_NAMES[actionKey] || perm.display_name;
          if (!actionName) {
            const fallback = permName.split('_').pop();
            actionName = actionsMap[fallback] || ACTION_NAMES[fallback] || perm.display_name || perm.name;
          }

          if (lang === 'en') {
            const hasArabic = /[\u0600-\u06FF]/.test(actionName || '') || /[\u0600-\u06FF]/.test(permName || '');
            if (hasArabic) {
              const p = (permName || '').toLowerCase();
              let guessedKey = null;

              if (p.includes('عرض')) guessedKey = 'view';
              else if (p.includes('إضافة')) guessedKey = 'add';
              else if (p.includes('تعديل')) guessedKey = 'edit';
              else if (p.includes('حذف')) guessedKey = 'delete';
              else if (p.includes('تصدير')) guessedKey = 'export';
              else if (p.includes('طباعة')) guessedKey = 'print';
              else if (p.includes('صلاحيات')) guessedKey = 'manage_permissions';
              else if (p.includes('نسخ احتياطي') || p.includes('النسخ الاحتياطي')) guessedKey = 'backup';
              else if (p.includes('استعادة')) guessedKey = 'restore';
              else if (p.includes('كشف')) guessedKey = 'view_statement';

              if (guessedKey) {
                actionKey = guessedKey;
                actionName = actionsMap[guessedKey] || ACTION_NAMES[guessedKey] || actionName;
              }
            }
          }

          let description = '';
          if (lang === 'en') {
            description = `${actionName} ${categoryLabel}`;
          } else {
            description = perm.description || `${actionName} ${categoryLabel}`;
          }
          
          html += createPermissionItem(perm.id, actionName, description, isChecked, category, actionKey);
          totalPerms++;
          if (isChecked) grantedPerms++;
        });
      } else if (Array.isArray(categoryInfo.permissions)) {
        // Use structure permissions as fallback
        categoryInfo.permissions.forEach(action => {
          const actionsMap = t.permActions || {};
          const actionName = actionsMap[action] || ACTION_NAMES[action] || action;
          const permKey = `${category}_${action}`;
          html += createPermissionItem(permKey, actionName, `${actionName} ${categoryLabel}`, false, category, action);
          totalPerms++;
        });
      }
      
      
      html += `
          </div>
        </div>
      `;
      
      screensMeta.push({
        category,
        name: categoryLabel,
        icon: categoryInfo.icon,
        total: totalPerms,
        granted: grantedPerms
      });
    });
    
    // إغلاق الجهة اليسرى وبدء بناء قائمة الشاشات في الجهة اليمنى
    html += `
        </div>
        <div class="perm-right">
          <div class="screen-list-header">
            <span style="display:flex;align-items:center;gap:6px;font-size:13px;color:var(--subtle);">
              <i class="fa-solid fa-list" style="font-size:13px;"></i>
              <span>${t.permScreensHeader || 'الشاشات'}</span>
            </span>
          </div>
          <div class="screen-list-search">
            <input type="search" id="permScreenSearch" placeholder="${t.permSearchPlaceholder || 'بحث عن شاشة...'}" aria-label="${t.permSearchPlaceholder || 'بحث عن شاشة...'}">
          </div>
          <div class="screen-list" id="permScreenList">
    `;
    
    screensMeta.forEach(meta => {
      const activeClass = meta.category === currentCategoryKey ? ' active' : '';
      const totalLabel = meta.total ? `${meta.granted}/${meta.total}` : '0/0';
      html += `
        <button type="button" class="screen-item${activeClass}" data-category="${meta.category}">
          <div class="screen-item-main">
            <span class="screen-item-icon">${meta.icon}</span>
            <span class="screen-item-name">${meta.name}</span>
          </div>
          <div class="screen-item-badge">${totalLabel}</div>
        </button>
      `;
    });
    
    html += `
          </div>
        </div>
      </div>
    `;
    
    permissionsContainer.innerHTML = html;
    
    // Add event listeners
    attachPermissionEventListeners();
  }
  
  function getIconForAction(actionKey) {
    // محاولة إيجاد الأيقونة بطرق متعددة
    if (ACTION_ICON_CLASSES[actionKey]) return ACTION_ICON_CLASSES[actionKey];
    
    // جرب آخر جزء من المفتاح
    const lastPart = actionKey.split('_').pop();
    if (ACTION_ICON_CLASSES[lastPart]) return ACTION_ICON_CLASSES[lastPart];
    
    // أيقونات افتراضية حسب نوع الإجراء
    if (actionKey.includes('view') || actionKey.includes('عرض')) return 'fa-regular fa-eye';
    if (actionKey.includes('add') || actionKey.includes('إضافة')) return 'fa-solid fa-plus';
    if (actionKey.includes('edit') || actionKey.includes('تعديل')) return 'fa-solid fa-pen';
    if (actionKey.includes('delete') || actionKey.includes('حذف')) return 'fa-regular fa-trash-can';
    if (actionKey.includes('export') || actionKey.includes('تصدير')) return 'fa-solid fa-file-export';
    if (actionKey.includes('print') || actionKey.includes('طباعة')) return 'fa-solid fa-print';
    if (actionKey.includes('statement') || actionKey.includes('كشف')) return 'fa-regular fa-file-lines';
    if (actionKey.includes('balance')) return 'fa-solid fa-scale-balanced';
    if (actionKey.includes('backup')) return 'fa-solid fa-database';
    if (actionKey.includes('restore')) return 'fa-solid fa-rotate-left';
    if (actionKey.includes('permission')) return 'fa-solid fa-key';
    if (actionKey.includes('statistic')) return 'fa-solid fa-chart-line';
    if (actionKey.includes('complete')) return 'fa-solid fa-check-double';
    
    return 'fa-solid fa-circle-check';
  }
  
  function createPermissionItem(id, name, description, isChecked, category, actionKey) {
    const iconClass = getIconForAction(actionKey);
    const actionClass = actionKey ? ` action-${actionKey}` : '';
    return `
      <label class="perm-item" data-category="${category}" style="cursor:pointer;">
        <input type="checkbox" class="perm-checkbox" data-id="${id}" ${isChecked ? 'checked' : ''}>
        <span class="perm-icon${actionClass}"><i class="${iconClass}"></i></span>
        <div>
          <div class="perm-name">${name}</div>
          ${description && description !== name ? `<div class="perm-desc">${description}</div>` : ''}
        </div>
      </label>
    `;
  }
  
  function attachPermissionEventListeners() {
    // Select all category checkboxes
    document.querySelectorAll('.select-all-category').forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        const category = this.dataset.category;
        const isChecked = this.checked;
        document.querySelectorAll(`.perm-item[data-category="${category}"] .perm-checkbox`).forEach(cb => {
          cb.checked = isChecked;
        });
      });
    });
    
    // Individual permission checkboxes
    document.querySelectorAll('.perm-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        const category = this.closest('.perm-item').dataset.category;
        updateSelectAllState(category);
      });
    });
    
    // Update select-all states
    Object.keys(PERMISSIONS_STRUCTURE).forEach(category => {
      updateSelectAllState(category);
    });
    
    const selectAllBtn = document.getElementById('permSelectAllBtn');
    if (selectAllBtn) {
      selectAllBtn.addEventListener('click', () => {
        // تحديد كل الصلاحيات في الفئة الحالية فقط
        if (!currentCategoryKey) return;
        document.querySelectorAll(`.perm-category[data-category="${currentCategoryKey}"] .perm-checkbox`).forEach(cb => {
          cb.checked = true;
        });
        updateSelectAllState(currentCategoryKey);
      });
    }
    
    const clearAllBtn = document.getElementById('permClearAllBtn');
    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', () => {
        // مسح كل الصلاحيات في الفئة الحالية فقط
        if (!currentCategoryKey) return;
        document.querySelectorAll(`.perm-category[data-category="${currentCategoryKey}"] .perm-checkbox`).forEach(cb => {
          cb.checked = false;
        });
        updateSelectAllState(currentCategoryKey);
      });
    }
    
    const templateSelect = document.getElementById('permRoleTemplate');
    if (templateSelect) {
      templateSelect.addEventListener('change', (e) => {
        const key = e.target.value;
        if (!key) return;
        applyPermissionTemplate(key);
      });
    }
    
    // التنقل بين الشاشات في الجهة اليمنى
    document.querySelectorAll('.screen-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.dataset.category;
        if (!category || !PERMISSIONS_STRUCTURE[category]) return;
        currentCategoryKey = category;
        
        document.querySelectorAll('.screen-item').forEach(b => {
          b.classList.toggle('active', b === btn);
        });
        document.querySelectorAll('.perm-category').forEach(catEl => {
          catEl.classList.toggle('active', catEl.dataset.category === category);
        });
      });
    });
    
    // بحث داخل قائمة الشاشات
    const screenSearch = document.getElementById('permScreenSearch');
    if (screenSearch) {
      screenSearch.addEventListener('input', (e) => {
        const q = e.target.value.trim().toLowerCase();
        document.querySelectorAll('.screen-item').forEach(btn => {
          const name = btn.querySelector('.screen-item-name')?.textContent.toLowerCase() || '';
          btn.style.display = !q || name.includes(q) ? '' : 'none';
        });
      });
    }
  }
  
  function updateSelectAllState(category) {
    const allCheckboxes = document.querySelectorAll(`.perm-item[data-category="${category}"] .perm-checkbox`);
    const checkedCheckboxes = Array.from(allCheckboxes).filter(cb => cb.checked);
    const selectAllCheckbox = document.querySelector(`.select-all-category[data-category="${category}"]`);
    
    if (selectAllCheckbox) {
      selectAllCheckbox.checked = checkedCheckboxes.length === allCheckboxes.length;
      selectAllCheckbox.indeterminate = checkedCheckboxes.length > 0 && checkedCheckboxes.length < allCheckboxes.length;
    }
  }
  
  function updateCategorySelectAll(categoryContainer) {
    if (!categoryContainer) return;
    const selectAllCb = categoryContainer.querySelector('.select-all-category');
    if (!selectAllCb) return;
    
    const allCheckboxes = categoryContainer.querySelectorAll('.perm-checkbox');
    const checkedCount = categoryContainer.querySelectorAll('.perm-checkbox:checked').length;
    
    selectAllCb.checked = checkedCount === allCheckboxes.length;
    selectAllCb.indeterminate = checkedCount > 0 && checkedCount < allCheckboxes.length;
  }
  
  function findPermissionByAction(perms, category, action) {
    if (!Array.isArray(perms)) return null;
    return perms.find(p => {
      if (!p) return false;
      const actionField = p.action || '';
      const name = p.name || '';
      if (actionField && actionField === action) return true;
      if (name === `${category}_${action}`) return true;
      const last = name.split('_').pop();
      return last === action;
    }) || null;
  }
  
  function applyPermissionTemplate(templateKey) {
    const template = ROLE_TEMPLATES[templateKey];
    if (!template) return;
    
    // ابدأ من حالة فارغة
    document.querySelectorAll('.perm-checkbox').forEach(cb => {
      cb.checked = false;
    });
    
    if (template.applyAll) {
      document.querySelectorAll('.perm-checkbox').forEach(cb => {
        cb.checked = true;
      });
    } else if (template.categories) {
      Object.entries(template.categories).forEach(([category, actions]) => {
        const perms = allPermissions[category] || [];
        actions.forEach(action => {
          const perm = findPermissionByAction(perms, category, action);
          if (!perm) return;
          const cb = document.querySelector(`.perm-checkbox[data-id="${perm.id}"]`);
          if (cb) cb.checked = true;
        });
      });
    }
    
    Object.keys(PERMISSIONS_STRUCTURE).forEach(updateSelectAllState);
  }

  function findPermissionIdByCode(code) {
    const target = typeof code === 'string' ? code.trim() : '';
    if (!target) return null;
    const groups = allPermissions || {};
    for (const perms of Object.values(groups)) {
      if (!Array.isArray(perms)) continue;
      for (const p of perms) {
        const name = (p?.name || '').trim();
        if (name === target) {
          const id = parseInt(p?.id);
          return isNaN(id) ? null : id;
        }
      }
    }
    return null;
  }

  function parsePermissionCode(perm) {
    if (!perm || typeof perm !== 'string') return { category: null, action: null };
    const p = perm.trim();
    if (!p) return { category: null, action: null };

    if (p.includes('.')) {
      const parts = p.split('.');
      const category = parts[0] || null;
      const action = parts.slice(1).join('.') || null;
      return { category, action };
    }

    const categories = Object.keys(PERMISSIONS_STRUCTURE);
    for (const cat of categories) {
      if (p.startsWith(cat + '_')) {
        return { category: cat, action: p.slice(cat.length + 1) };
      }
    }

    return { category: null, action: null };
  }

  async function resolvePermissionIdFromDataId(dataId) {
    const raw = typeof dataId === 'string' ? dataId.trim() : '';
    if (!raw) return null;

    if (/^\d+$/.test(raw)) {
      const numericId = parseInt(raw);
      return isNaN(numericId) ? null : numericId;
    }

    const existingId = findPermissionIdByCode(raw);
    if (existingId !== null) return existingId;

    const parsed = parsePermissionCode(raw);
    if (!parsed.category || !parsed.action) return null;

    const categoryInfo = PERMISSIONS_STRUCTURE[parsed.category];
    const actionName = ACTION_NAMES[raw] || ACTION_NAMES[parsed.action] || parsed.action;
    const categoryName = categoryInfo?.name || categoryNames[parsed.category] || parsed.category;
    const description = `${actionName} ${categoryName}`;

    if (!window.permissions || !window.permissions.createPermission) {
      return null;
    }

    const createResult = await window.permissions.createPermission({
      code: raw,
      category: parsed.category,
      action: parsed.action,
      description: description
    });

    if (createResult?.success) {
      const createdId = parseInt(createResult.id);
      if (!isNaN(createdId)) {
        if (!allPermissions[parsed.category]) {
          allPermissions[parsed.category] = [];
        }
        allPermissions[parsed.category].push({
          id: createdId,
          name: raw,
          display_name: description,
          category: parsed.category,
          description: description,
          action: parsed.action
        });
        return createdId;
      }
    }

    if (createResult?.error && String(createResult.error).includes('UNIQUE')) {
      try {
        const permsResult = await window.permissions.getPermissionsByCategory();
        if (permsResult?.success) {
          allPermissions = permsResult.data || allPermissions;
        }
      } catch (_) {
      }
      const idAfterRefresh = findPermissionIdByCode(raw);
      if (idAfterRefresh !== null) return idAfterRefresh;
    }

    return null;
  }
  
  async function savePermissions() {
    if (!currentPermUser) {
      
      return;
    }
    
    try {
      const selectedIdsSet = new Set();

      const checkedBoxes = Array.from(document.querySelectorAll('.perm-checkbox:checked'));
      for (const cb of checkedBoxes) {
        const rawId = cb.getAttribute('data-id');
        const wasNumeric = /^\d+$/.test((rawId || '').trim());
        const resolvedId = await resolvePermissionIdFromDataId(rawId);
        if (resolvedId !== null) {
          selectedIdsSet.add(resolvedId);
          if (!wasNumeric) {
            cb.setAttribute('data-id', String(resolvedId));
          }
        }
      }

      const selectedIds = Array.from(selectedIdsSet);
      
      // If no valid permissions found, show message
      if (selectedIds.length === 0) {
        showToast('error', tUsers('noValidPermissions'));
        
        return;
      }
      
      const result = await window.permissions.setUserPermissions(currentPermUser.id, selectedIds);
      
      if (result.success) {
        showToast('success', tUsers('permissionsSaveSuccess').replace('{count}', selectedIds.length));
        
        // Update the cached permission IDs
        userPermissionIds = [...selectedIds];
        
        // If saving permissions for current user, reload their permissions
        const currentUserData = JSON.parse(localStorage.getItem('currentUser') || '{}');
        if (currentUserData.id === currentPermUser.id) {
          // Reload permissions for current user
          try {
            const userPermsResult = await window.permissions.getUserPermissions(currentPermUser.id);
            if (userPermsResult.success && userPermsResult.data) {
              window.userPermissions = userPermsResult.data.map(p => p.name);
            }
          } catch (error) {
            // Silent error handling
          }
        }
        
        closePermissionsModal();
      } else {
        
        showToast('error', result.error || tUsers('permissionsSaveFailed'));
      }
    } catch (error) {
      
      showToast('error', tUsers('permissionsSaveError') + ': ' + error.message);
    }
  }
  
  // Event listeners for permissions modal
  if (permModalClose) permModalClose.addEventListener('click', closePermissionsModal);
  if (permModalCancel) permModalCancel.addEventListener('click', closePermissionsModal);
  if (permModalSave) permModalSave.addEventListener('click', savePermissions);
  if (permModal) {
    const backdrop = permModal.querySelector('.modal-backdrop');
    if (backdrop) backdrop.addEventListener('click', (e) => {
      if (e.target.hasAttribute('data-close')) closePermissionsModal();
    });
  }
  
  // Initial load - wait for APIs to be bridged from parent
  function initializeWhenReady() {
    if (!window.users || !window.branches) {
      setTimeout(initializeWhenReady, 100);
      return;
    }
    // Apply translations on load
    applyUsersTranslations();
    loadUsers();
    ensurePermissionsCatalogLoaded().catch(() => {});
  }

  if (window.api && typeof window.api.on === 'function') {
    window.api.on('cloud-data-updated', (payload) => {
      const tables = Array.isArray(payload?.tables) ? payload.tables : [];
      if (tables.includes('users') || tables.includes('branches') || tables.includes('user_branches')) {
        loadUsers();
      }
    });
  }

  window.addEventListener('message', (event) => {
    if (event?.data?.type !== 'cloud-data-updated') {
      return;
    }
    const payload = event.data.payload || {};
    const tables = Array.isArray(payload?.tables) ? payload.tables : [];
    if (tables.includes('users') || tables.includes('branches') || tables.includes('user_branches')) {
      loadUsers();
    }
  });
  
  // Start initialization
  initializeWhenReady();
})();

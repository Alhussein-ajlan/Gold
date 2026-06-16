// ========== Translation System ==========
const SUP_TRANSLATIONS = {
  ar: {
    // Page title
    pageTitle: 'الموردين',
    
    // Toolbar buttons
    btnNewSupplier: 'مورد جديد',
    btnRefresh: 'تحديث',
    btnExportExcel: 'تصدير Excel',
    btnExportPdf: 'PDF',
    
    // Stats cards
    totalSuppliers: 'إجمالي الموردين',
    suppliersAddedThisMonth: '{count} موردين تم إضافتهم هذا الشهر',
    suppliersAddedThisWeek: '{count} موردين تم إضافتهم هذا الأسبوع',
    activeSuppliers: 'الموردون النشطون',
    active: 'نشطون',
    inactive: 'غير نشطون',
    suppliersDebt: 'مديونية الموردين',
    debtors: 'مديونون بـ',
    creditors: 'دائنون بـ',
    riyal: 'ريال',
    pureGold: 'ذهب صافي',
    goldKarat: 'ذهب عيار',
    
    // Karat selector
    karat24: 'عيار 24 صافي',
    karat22: 'عيار 22',
    karat21: 'عيار 21',
    karat18: 'عيار 18',
    
    // Table
    suppliersList: 'قائمة الموردين',
    searchPlaceholder: 'بحث عن مورد...',
    thSupplierId: 'رقم المورد',
    thSupplierName: 'اسم المورد',
    thTaxNo: 'الرقم الضريبي',
    thPhone: 'رقم الهاتف',
    thEmail: 'البريد الإلكتروني',
    thRegion: 'المنطقة',
    thActive: 'نشط',
    thDate: 'التاريخ',
    thDebtLimit: 'سقف المديونية',
    thActions: 'الإجراءات',
    noSuppliers: 'لا يوجد موردين',
    yes: 'نعم',
    no: 'لا',
    
    // Modal - Add/Edit Supplier
    addSupplier: 'إضافة مورد',
    editSupplier: 'تعديل مورد',
    newSupplier: 'مورد جديد',
    basicInfo: 'البيانات الأساسية',
    contactClassification: 'التواصل والتصنيف',
    ounceSettings: 'إعدادات الأونصة والسقف',
    
    // Form fields
    supplierId: 'رقم المورد',
    supplierIdPlaceholder: 'مثال: 2004',
    supplierName: 'اسم المورد',
    supplierNamePlaceholder: 'اسم المورد',
    taxNo: 'الرقم الضريبي',
    taxNoPlaceholder: 'مثال: 311242003700003',
    phone: 'رقم الهاتف',
    phonePlaceholder: 'مثال: 9665XXXXXXXX',
    email: 'البريد الإلكتروني',
    emailPlaceholder: 'مثال: name@example.com',
    region: 'المنطقة',
    regionPlaceholder: 'مثال: الرياض',
    classification: 'التصنيف',
    noClassification: 'بدون تصنيف',
    manageCategories: 'إدارة التصنيفات',
    date: 'التاريخ',
    branchAccess: 'صلاحية الفروع',
    branch: 'الفرع',
    allowedBranches: 'الفروع المسموح بها',
    accessSingleBranch: 'فرع واحد',
    accessMultipleBranches: 'عدة فروع',
    accessAllBranches: 'كل الفروع',
    allBranches: 'كل الفروع',
    accessAllHint: 'سيكون هذا المورد متاحًا في كل الفروع المسموح بها لك.',
    branchRequired: 'يرجى اختيار الفرع.',
    atLeastOneBranchRequired: 'يرجى اختيار فرع واحد على الأقل.',
    branchPickerTitle: 'تحديد الفروع',
    branchPickerSelectAll: 'تحديد الكل',
    branchPickerClearAll: 'مسح الكل',
    branchPickerDone: 'تم',
    branchPickerSearchPlaceholder: 'ابحث عن فرع أو كود الفرع',
    branchPickerTriggerTitleEmpty: 'اختيار الفروع',
    branchPickerTriggerHintEmpty: 'اضغط لفتح نافذة اختيار الفروع',
    branchPickerTriggerTitleSingle: 'الفرع المحدد',
    branchPickerTriggerTitleMultiple: 'ينتمي إلى هذه الفروع',
    branchPickerSelectedTitle: 'الفروع المحددة',
    branchPickerSelectedHint: 'هذه الفروع التي ستنتمي إليها بطاقة المورد.',
    branchPickerEmpty: 'لم يتم تحديد أي فرع بعد.',
    branchPickerNoResults: 'لا توجد فروع مطابقة لعبارة البحث',
    branchPickerMultipleHint: 'يمكنك اختيار فرع واحد أو عدة فروع من النافذة المنبثقة.',
    branchPickerRemoveBranch: 'إزالة الفرع',
    
    // Ounce settings
    saleOunce: 'أونصة البيع',
    purchaseOunce: 'أونصة الشراء',
    ozAdd: 'زيادة',
    ozSub: 'نقص',
    ozEnabled: 'تفعيل',
    debtLimit: 'سقف المديونية',
    debtLimitPlaceholder: 'مثال: 10000',
    
    // Buttons
    btnCancel: 'إلغاء',
    btnSave: 'حفظ',
    btnSaveChanges: 'حفظ التعديلات',
    btnClose: 'إغلاق',
    btnEdit: 'تعديل',
    btnDelete: 'حذف',
    btnOk: 'موافق',
    btnDone: 'تم',
    btnAdd: 'إضافة',
    
    // Confirm delete modal
    confirmDeleteTitle: 'تأكيد الحذف',
    confirmDeleteMessage: 'هل أنت متأكد من أنك تريد حذف هذا المورد؟',
    confirmDeleteSupplier: 'هل أنت متأكد من أنك تريد حذف المورد "{name}"؟',
    confirmYes: 'نعم، احذف',
    confirmNo: 'إلغاء الأمر',
    
    // Categories modal
    categoriesManagement: 'إدارة التصنيفات',
    availableCategories: 'التصنيفات المتاحة',
    addNewCategory: 'إضافة تصنيف جديد',
    categoryNamePlaceholder: 'اسم التصنيف (مثال: البطحاء)',
    noCategories: 'لا توجد تصنيفات بعد. أضف تصنيفاً جديداً.',
    loadingCategories: 'جاري التحميل...',
    connectionError: 'خطأ في الاتصال',
    loadingError: 'خطأ في التحميل',
    enterCategoryName: 'يرجى إدخال اسم التصنيف',
    addFailed: 'فشل الإضافة',
    errorOccurred: 'حدث خطأ',
    deleteCategoryTitle: 'تأكيد الحذف',
    deleteCategoryMessage: 'هل تريد حذف هذا التصنيف؟',
    
    // Delete error modal
    deleteFailed: 'فشل الحذف',
    cannotDeleteSupplier: 'لا يمكن حذف هذا المورد',
    hasLinkedRecords: 'يوجد سجلات مرتبطة بهذا المورد',
    problemDetails: 'تفاصيل المشكلة:',
    tipLabel: 'نصيحة:',
    deleteTip: 'لحذف هذا المورد، يجب عليك أولاً حذف أو تعديل جميع السجلات المرتبطة به.',
    supplierLinkedDetails: 'المورد مرتبط بسجلات في (سندات القبض، سندات الصرف، القيود اليومية، الأرصدة الافتتاحية، فواتير الشراء، أو الأوردرات). يجب حذف السجلات المرتبطة أولاً قبل حذف المورد.',
    
    // Validation messages
    supplierNameRequired: 'اسم المورد مطلوب.',
    saveFailed: 'فشل الحفظ:',
    unknownError: 'غير معروف',
    
    // Export/Print
    printTitle: 'قائمة الموردين',
    printPreview: 'معاينة - قائمة الموردين',
    printButton: 'طباعة',
    
    // Toggle status
    toggleStatus: 'تبديل الحالة'
  },
  en: {
    // Page title
    pageTitle: 'Suppliers',
    
    // Toolbar buttons
    btnNewSupplier: 'New Supplier',
    btnRefresh: 'Refresh',
    btnExportExcel: 'Export Excel',
    btnExportPdf: 'PDF',
    
    // Stats cards
    totalSuppliers: 'Total Suppliers',
    suppliersAddedThisMonth: '{count} suppliers added this month',
    suppliersAddedThisWeek: '{count} suppliers added this week',
    activeSuppliers: 'Active Suppliers',
    active: 'Active',
    inactive: 'Inactive',
    suppliersDebt: 'Suppliers Debt',
    debtors: 'Debtors',
    creditors: 'Creditors',
    riyal: 'Riyal',
    pureGold: 'Pure Gold',
    goldKarat: 'Gold Karat',
    
    // Karat selector
    karat24: '24K Pure',
    karat22: '22K',
    karat21: '21K',
    karat18: '18K',
    
    // Table
    suppliersList: 'Suppliers List',
    searchPlaceholder: 'Search for supplier...',
    thSupplierId: 'Supplier ID',
    thSupplierName: 'Supplier Name',
    thTaxNo: 'Tax Number',
    thPhone: 'Phone',
    thEmail: 'Email',
    thRegion: 'Region',
    thActive: 'Active',
    thDate: 'Date',
    thDebtLimit: 'Debt Limit',
    thActions: 'Actions',
    noSuppliers: 'No suppliers to display.',
    yes: 'Yes',
    no: 'No',
    
    // Modal - Add/Edit Supplier
    addSupplier: 'Add Supplier',
    editSupplier: 'Edit Supplier',
    newSupplier: 'New Supplier',
    basicInfo: 'Basic Information',
    contactClassification: 'Contact & Classification',
    ounceSettings: 'Ounce Settings & Limits',
    
    // Form fields
    supplierId: 'Supplier ID',
    supplierIdPlaceholder: 'e.g.: 2004',
    supplierName: 'Supplier Name',
    supplierNamePlaceholder: 'Supplier Name',
    taxNo: 'Tax Number',
    taxNoPlaceholder: 'e.g.: 311242003700003',
    phone: 'Phone Number',
    phonePlaceholder: 'e.g.: 9665XXXXXXXX',
    email: 'Email',
    emailPlaceholder: 'e.g.: name@example.com',
    region: 'Region',
    regionPlaceholder: 'e.g.: Riyadh',
    classification: 'Classification',
    noClassification: 'No Classification',
    manageCategories: 'Manage Categories',
    date: 'Date',
    branchAccess: 'Branch Access',
    branch: 'Branch',
    allowedBranches: 'Allowed Branches',
    accessSingleBranch: 'Single Branch',
    accessMultipleBranches: 'Multiple Branches',
    accessAllBranches: 'All Branches',
    allBranches: 'All Branches',
    accessAllHint: 'This supplier will be available in all branches you are allowed to access.',
    branchRequired: 'Please select a branch.',
    atLeastOneBranchRequired: 'Please select at least one branch.',
    branchPickerTitle: 'Choose Branches',
    branchPickerSelectAll: 'Select All',
    branchPickerClearAll: 'Clear All',
    branchPickerDone: 'Done',
    branchPickerSearchPlaceholder: 'Search by branch name or code',
    branchPickerTriggerTitleEmpty: 'Choose branches',
    branchPickerTriggerHintEmpty: 'Click to open the branch picker',
    branchPickerTriggerTitleSingle: 'Selected branch',
    branchPickerTriggerTitleMultiple: 'Assigned to these branches',
    branchPickerSelectedTitle: 'Selected branches',
    branchPickerSelectedHint: 'These are the branches this supplier card will belong to.',
    branchPickerEmpty: 'No branches selected yet.',
    branchPickerNoResults: 'No branches match your search',
    branchPickerMultipleHint: 'You can select one or more branches from the popup panel.',
    branchPickerRemoveBranch: 'Remove branch',
    
    // Ounce settings
    saleOunce: 'Sale Ounce',
    purchaseOunce: 'Purchase Ounce',
    ozAdd: 'Add',
    ozSub: 'Sub',
    ozEnabled: 'Enable',
    debtLimit: 'Debt Limit',
    debtLimitPlaceholder: 'e.g.: 10000',
    
    // Buttons
    btnCancel: 'Cancel',
    btnSave: 'Save',
    btnSaveChanges: 'Save Changes',
    btnClose: 'Close',
    btnEdit: 'Edit',
    btnDelete: 'Delete',
    btnOk: 'OK',
    btnDone: 'Done',
    btnAdd: 'Add',
    
    // Confirm delete modal
    confirmDeleteTitle: 'Confirm Delete',
    confirmDeleteMessage: 'Are you sure you want to delete this supplier?',
    confirmDeleteSupplier: 'Are you sure you want to delete supplier "{name}"?',
    confirmYes: 'Yes, Delete',
    confirmNo: 'Cancel',
    
    // Categories modal
    categoriesManagement: 'Manage Categories',
    availableCategories: 'Available Categories',
    addNewCategory: 'Add New Category',
    categoryNamePlaceholder: 'Category name (e.g.: Downtown)',
    noCategories: 'No categories yet. Add a new category.',
    loadingCategories: 'Loading...',
    connectionError: 'Connection Error',
    loadingError: 'Loading Error',
    enterCategoryName: 'Please enter category name',
    addFailed: 'Add Failed',
    errorOccurred: 'Error Occurred',
    deleteCategoryTitle: 'Confirm Delete',
    deleteCategoryMessage: 'Do you want to delete this category?',
    
    // Delete error modal
    deleteFailed: 'Delete Failed',
    cannotDeleteSupplier: 'Cannot delete this supplier',
    hasLinkedRecords: 'There are records linked to this supplier',
    problemDetails: 'Problem Details:',
    tipLabel: 'Tip:',
    deleteTip: 'To delete this supplier, you must first delete or modify all related records.',
    supplierLinkedDetails: 'This supplier is linked to records in (receipts, payments, journal entries, opening balances, purchase invoices, or orders). You must delete the linked records first before deleting the supplier.',
    
    // Validation messages
    supplierNameRequired: 'Supplier name is required.',
    saveFailed: 'Save failed:',
    unknownError: 'Unknown',
    
    // Export/Print
    printTitle: 'Suppliers List',
    printPreview: 'Preview - Suppliers List',
    printButton: 'Print',
    
    // Toggle status
    toggleStatus: 'Toggle Status'
  }
};

// Translation helper functions
function getSuppliersLang() {
  try {
    return localStorage.getItem('uiLang') === 'en' ? 'en' : 'ar';
  } catch (e) {
    return 'ar';
  }
}

function tSup(key) {
  const lang = getSuppliersLang();
  return SUP_TRANSLATIONS[lang]?.[key] || SUP_TRANSLATIONS['ar']?.[key] || key;
}

// Apply static translations to UI elements
function applySuppliersStaticTexts() {
  const lang = getSuppliersLang();
  const isRtl = lang === 'ar';
  const dir = isRtl ? 'rtl' : 'ltr';
  
  // Set document direction
  document.documentElement.lang = lang;
  document.documentElement.dir = dir;
  document.body.dir = dir;
  
  // Helper to set text content
  const setText = (id, key) => {
    const el = document.getElementById(id);
    if (el) el.textContent = tSup(key);
  };
  
  // Helper to set text with icon
  const setTextWithIcon = (id, key, iconClass, iconColor) => {
    const el = document.getElementById(id);
    if (el) {
      el.innerHTML = `<i class="${iconClass}" style="margin-inline-end:8px;color:${iconColor}"></i>${tSup(key)}`;
    }
  };
  
  // Helper to set placeholder
  const setPlaceholder = (id, key) => {
    const el = document.getElementById(id);
    if (el) el.placeholder = tSup(key);
  };
  
  // Toolbar
  setText('btnNewSupplierText', 'btnNewSupplier');
  
  // Stats cards
  setText('totalSuppliersTitle', 'totalSuppliers');
  setText('activeSuppliersTitle', 'activeSuppliers');
  setText('activeLabel', 'active');
  setText('inactiveLabel', 'inactive');
  setText('suppliersDebtTitle', 'suppliersDebt');
  
  // Karat selector
  const karat24 = document.getElementById('karat24Opt');
  const karat22 = document.getElementById('karat22Opt');
  const karat21 = document.getElementById('karat21Opt');
  const karat18 = document.getElementById('karat18Opt');
  if (karat24) karat24.textContent = tSup('karat24');
  if (karat22) karat22.textContent = tSup('karat22');
  if (karat21) karat21.textContent = tSup('karat21');
  if (karat18) karat18.textContent = tSup('karat18');
  
  // Table section
  setText('suppliersListTitle', 'suppliersList');
  setPlaceholder('suppliersSearch', 'searchPlaceholder');
  
  // Table headers with alignment
  const tableTextAlign = isRtl ? 'right' : 'left';
  const setHeaderText = (id, key) => {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = tSup(key);
      el.style.textAlign = tableTextAlign;
    }
  };
  setHeaderText('th_supplierId', 'thSupplierId');
  setHeaderText('th_supplierName', 'thSupplierName');
  setHeaderText('th_taxNo', 'thTaxNo');
  setHeaderText('th_phone', 'thPhone');
  setHeaderText('th_email', 'thEmail');
  setHeaderText('th_region', 'thRegion');
  setHeaderText('th_active', 'thActive');
  setHeaderText('th_date', 'thDate');
  setHeaderText('th_debtLimit', 'thDebtLimit');
  setHeaderText('th_actions', 'thActions');
  
  // Modal title
  setText('modalTitle', 'addSupplier');
  
  // Button tooltips
  const btnRefresh = document.getElementById('btnRefreshSup');
  const btnExcel = document.getElementById('btnExportSup');
  const btnPdf = document.getElementById('btnExportSupPdf');
  if (btnRefresh) btnRefresh.title = tSup('btnRefresh');
  if (btnExcel) btnExcel.title = tSup('btnExportExcel');
  if (btnPdf) btnPdf.title = tSup('btnExportPdf');
  
  // Modal - Add/Edit Supplier (with icons)
  setTextWithIcon('basicInfoHeader', 'basicInfo', 'fa-solid fa-user-circle', '#3b82f6');
  setTextWithIcon('contactHeader', 'contactClassification', 'fa-solid fa-address-book', '#8b5cf6');
  setTextWithIcon('ounceSettingsHeader', 'ounceSettings', 'fa-solid fa-sliders', '#f59e0b');
  
  // Form fields
  setText('field_supplierId', 'supplierId');
  setText('field_supplierName', 'supplierName');
  setText('field_taxNo', 'taxNo');
  setText('field_phone', 'phone');
  setText('field_email', 'email');
  setText('field_region', 'region');
  setText('field_classification', 'classification');
  setText('field_branchAccess', 'branchAccess');
  setText('field_branchSingle', 'branch');
  setText('field_branchMulti', 'allowedBranches');
  setText('field_date', 'date');
  setText('ns_branch_picker_title', 'branchPickerTitle');
  setText('ns_branch_multi_select_all', 'branchPickerSelectAll');
  setText('ns_branch_multi_clear', 'branchPickerClearAll');
  setText('ns_branch_picker_done_text', 'branchPickerDone');
  setPlaceholder('ns_branch_multi_search', 'branchPickerSearchPlaceholder');
  const branchPickerCloseEl = document.getElementById('ns_branch_picker_modal_close');
  if (branchPickerCloseEl) branchPickerCloseEl.setAttribute('aria-label', tSup('btnClose'));
  const branchScopeEl = document.getElementById('ns_branch_scope');
  if (branchScopeEl) {
    const singleOption = branchScopeEl.querySelector('option[value="single"]');
    const multipleOption = branchScopeEl.querySelector('option[value="multiple"]');
    const allOption = branchScopeEl.querySelector('option[value="all"]');
    if (singleOption) singleOption.textContent = tSup('accessSingleBranch');
    if (multipleOption) multipleOption.textContent = tSup('accessMultipleBranches');
    if (allOption) allOption.textContent = tSup('accessAllBranches');
  }
  if (typeof window.updateSupplierBranchScopeControls === 'function') {
    window.updateSupplierBranchScopeControls();
  }
  
  // Ounce settings
  setText('saleOunceHeader', 'saleOunce');
  setText('purchaseOunceHeader', 'purchaseOunce');
  setText('debtLimitHeader', 'debtLimit');
  
  // Ounce labels
  setText('sale_oz_add_label', 'ozAdd');
  setText('sale_oz_sub_label', 'ozSub');
  setText('sale_oz_add_enabled_label', 'ozEnabled');
  setText('sale_oz_sub_enabled_label', 'ozEnabled');
  setText('purchase_oz_add_label', 'ozAdd');
  setText('purchase_oz_sub_label', 'ozSub');
  setText('purchase_oz_add_enabled_label', 'ozEnabled');
  setText('purchase_oz_sub_enabled_label', 'ozEnabled');
  
  // Modal buttons
  setText('modalCancelText', 'btnCancel');
  setText('modalSaveText', 'btnSave');
  
  // Confirm delete modal
  setText('confirmDelTitle', 'confirmDeleteTitle');
  setText('confirmSupDelYesText', 'confirmYes');
  setText('confirmSupDelNoText', 'confirmNo');
  
  // Categories modal
  setText('categoriesModalTitle', 'categoriesManagement');
  setText('availableCategoriesTitle', 'availableCategories');
  setText('addNewCategoryTitle', 'addNewCategory');
  setPlaceholder('newCategoryName', 'categoryNamePlaceholder');
  setText('btnAddCategoryText', 'btnAdd');
  setText('categoriesModalDoneText', 'btnDone');
  
  // Delete category modal
  setText('deleteCategoryModalTitle', 'deleteCategoryTitle');
  setText('deleteCategoryMsg', 'deleteCategoryMessage');
  setText('deleteCategoryCancelText', 'btnCancel');
  setText('deleteCategoryConfirmText', 'btnDelete');
  
  // Input placeholders
  setPlaceholder('ns_id', 'supplierIdPlaceholder');
  setPlaceholder('ns_name', 'supplierNamePlaceholder');
  setPlaceholder('ns_tax', 'taxNoPlaceholder');
  setPlaceholder('ns_phone', 'phonePlaceholder');
  setPlaceholder('ns_email', 'emailPlaceholder');
  setPlaceholder('ns_region', 'regionPlaceholder');
  setPlaceholder('ns_debt', 'debtLimitPlaceholder');
  
  // No classification option
  const categorySelect = document.getElementById('ns_category');
  if (categorySelect && categorySelect.options.length > 0) {
    categorySelect.options[0].textContent = tSup('noClassification');
  }
  
  // Manage categories button title
  const btnManageCat = document.getElementById('btnManageCategories');
  if (btnManageCat) btnManageCat.title = tSup('manageCategories');
}

// Store previous values for animation
let prevCashDebt = 0;
let prevGoldDebt = 0;

// Animate number counter - حركة العداد للأرقام
function animateValue(element, start, end, duration = 600) {
  if (!element) return;
  
  const range = end - start;
  const increment = range / (duration / 16); // 60 FPS
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
      current = end;
      clearInterval(timer);
    }
    
    const nf = new Intl.NumberFormat('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
    element.textContent = nf.format(Math.abs(current));
  }, 16);
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

function getCurrentUserDisplayName() {
  try {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const user = JSON.parse(userData);
      return String(user?.fullNameAr || user?.full_name || user?.fullNameEn || user?.name || user?.username || '').trim();
    }
  } catch (_) {}
  return '';
}

// Show detailed error modal for delete failures
function showDeleteErrorModal(response) {
  const lang = getSuppliersLang();
  const isRtl = lang === 'ar';
  const borderSide = isRtl ? 'border-right' : 'border-left';
  
  let errorModal = document.getElementById('deleteErrorModal');
  if (!errorModal) {
    errorModal = document.createElement('div');
    errorModal.id = 'deleteErrorModal';
    errorModal.className = 'modal';
    errorModal.setAttribute('aria-hidden', 'true');
    errorModal.setAttribute('role', 'dialog');
    errorModal.setAttribute('aria-modal', 'true');
    errorModal.innerHTML = `
      <div class="modal-backdrop" data-close></div>
      <div class="modal-dialog" role="document" style="max-width:500px">
        <div class="modal-header" style="background:linear-gradient(135deg, #ef5350 0%, #e53935 100%); color:white; padding:16px 20px">
          <h3 style="margin:0; display:flex; align-items:center; gap:10px; font-size:18px">
            <i class="fa-solid fa-triangle-exclamation" style="font-size:24px"></i>
            <span id="deleteErrorTitle">${tSup('deleteFailed')}</span>
          </h3>
          <button class="icon-btn" id="deleteErrorClose" aria-label="${tSup('btnClose')}" style="color:white">
            <i class="fa-regular fa-circle-xmark"></i>
          </button>
        </div>
        <div class="modal-body" style="padding:24px 20px">
          <div id="deleteErrorContent"></div>
        </div>
        <div class="modal-footer" style="padding:12px 20px">
          <button class="btn primary" id="deleteErrorOk" style="width:100%; background:linear-gradient(135deg, var(--primary), var(--primary-600)); border:none; display:flex; align-items:center; justify-content:center; gap:8px">
            <i class="fa-regular fa-circle-check"></i> <span>${tSup('btnOk')}</span>
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(errorModal);
    
    const closeBtn = errorModal.querySelector('#deleteErrorClose');
    const okBtn = errorModal.querySelector('#deleteErrorOk');
    const backdrop = errorModal.querySelector('.modal-backdrop');
    
    function closeErrorModal() {
      errorModal.setAttribute('aria-hidden', 'true');
    }
    
    closeBtn.addEventListener('click', closeErrorModal);
    okBtn.addEventListener('click', closeErrorModal);
    backdrop.addEventListener('click', closeErrorModal);
  }
  
  // Update title and button for current language
  const titleEl = errorModal.querySelector('#deleteErrorTitle');
  if (titleEl) titleEl.textContent = tSup('deleteFailed');
  const okBtnSpan = errorModal.querySelector('#deleteErrorOk span');
  if (okBtnSpan) okBtnSpan.textContent = tSup('btnOk');
  
  // Translation mapping for common database response texts
  const errorTranslations = {
    'لا يمكن حذف هذا المورد': tSup('cannotDeleteSupplier'),
    'تعذّر حذف المورد': tSup('cannotDeleteSupplier'),
    'يوجد سجلات مرتبطة بهذا المورد': tSup('hasLinkedRecords'),
  };
  
  // Details translation mapping
  const detailsTranslations = {
    'المورد مرتبط بسجلات في (سندات القبض، سندات الصرف، القيود اليومية، الأرصدة الافتتاحية، فواتير الشراء، أو الأوردرات). يجب حذف السجلات المرتبطة أولاً قبل حذف المورد.': tSup('supplierLinkedDetails'),
  };
  
  const translateText = (text) => {
    if (!text) return '';
    return errorTranslations[text] || text;
  };
  
  const translateDetails = (text) => {
    if (!text) return '';
    return detailsTranslations[text] || text;
  };
  
  const content = errorModal.querySelector('#deleteErrorContent');
  const error = response && response.error ? translateText(response.error) : tSup('cannotDeleteSupplier');
  const reason = response && response.reason ? translateText(response.reason) : '';
  const details = response && response.details ? translateDetails(response.details) : '';
  
  let html = `
    <div style="text-align:center; margin-bottom:20px">
      <div style="width:80px; height:80px; background:linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%); border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 16px">
        <i class="fa-solid fa-ban" style="font-size:40px; color:#ef5350"></i>
      </div>
      <h4 style="margin:0 0 8px 0; font-size:20px; color:var(--text); font-weight:700">${error}</h4>
  `;
  
  if (reason) {
    html += `<p style="margin:0; font-size:16px; color:var(--error); font-weight:600">${reason}</p>`;
  }
  
  html += `</div>`;
  
  if (details) {
    html += `
      <div style="background:var(--bg-muted); ${borderSide}:4px solid var(--error); padding:16px; border-radius:8px; margin-bottom:12px">
        <div style="display:flex; align-items:start; gap:12px">
          <i class="fa-solid fa-circle-info" style="color:var(--error); font-size:20px; margin-top:2px"></i>
          <div style="flex:1">
            <h5 style="margin:0 0 8px 0; font-size:14px; font-weight:700; color:var(--text)">${tSup('problemDetails')}</h5>
            <p style="margin:0; font-size:14px; line-height:1.6; color:var(--text)">${details}</p>
          </div>
        </div>
      </div>
    `;
  }
  
  html += `
    <div style="background:#fff3cd; border:1px solid #ffc107; border-radius:8px; padding:12px; display:flex; align-items:start; gap:10px">
      <i class="fa-solid fa-lightbulb" style="color:#f57c00; font-size:18px; margin-top:2px"></i>
      <div style="flex:1">
        <p style="margin:0; font-size:13px; color:#856404; line-height:1.5">
          <strong>${tSup('tipLabel')}</strong> ${tSup('deleteTip')}
        </p>
      </div>
    </div>
  `;
  
  content.innerHTML = html;
  errorModal.setAttribute('aria-hidden', 'false');
}

document.addEventListener('DOMContentLoaded', async () => {
  // ✅ Apply translations
  applySuppliersStaticTexts();
  
  // ✅ Initialize screen permissions
  if (window.ScreenPermissions) {
    await window.ScreenPermissions.init();
  }

  const tbody = document.querySelector('#suppliers-grid tbody');
  const totalEl = document.getElementById('totalSuppliersValue');
  const btnNew = document.getElementById('btnNewSupplier');
  const modal = document.getElementById('newSupplierModal');
  const mClose = document.getElementById('supModalClose');
  const mCancel = document.getElementById('supModalCancel');
  const mSave = document.getElementById('supModalSave');
  const nsError = document.getElementById('ns_error');
  const search = document.getElementById('suppliersSearch');
  const btnRefresh = document.getElementById('btnRefreshSup');
  const btnExportXls = document.getElementById('btnExportSup');
  const btnExportPdf = document.getElementById('btnExportSupPdf');
  let cache = [];
  let suppliersRealtimeTimer = null;
  let suppliersRefreshInFlight = false;
  let suppliersCloudModeActive = false;
  let isEditMode = false;
  let editingId = null;
  let editingBranchId = null;
  let supplierSaveInFlight = false;

  function getStoredCurrentBranchContext() {
    try {
      const raw = localStorage.getItem('currentBranch');
      return raw ? JSON.parse(raw) : null;
    } catch (_) {
      return null;
    }
  }

  function getStoredBranchScopeState() {
    try {
      const raw = localStorage.getItem('branchScope');
      const parsed = raw ? JSON.parse(raw) : {};
      const currentBranch = getStoredCurrentBranchContext();
      const allowedBranchIds = normalizeSupplierBranchIdList(
        Array.isArray(parsed?.allowedBranchIds)
          ? parsed.allowedBranchIds
          : (Array.isArray(parsed?.allowed_branch_ids) ? parsed.allowed_branch_ids : [])
      );
      return {
        mode: String(parsed?.mode || parsed?.scope || '').trim().toLowerCase() === 'all' ? 'all' : 'branch',
        branchId: Number(parsed?.branchId || parsed?.branch_id || currentBranch?.id || 0) || null,
        allowedBranchIds,
      };
    } catch (_) {
      const currentBranch = getStoredCurrentBranchContext();
      return {
        mode: 'branch',
        branchId: Number(currentBranch?.id || 0) || null,
        allowedBranchIds: [],
      };
    }
  }

  function isAllBranchesMode() {
    return getStoredBranchScopeState().mode === 'all';
  }

  function getWritableSupplierBranchId() {
    const currentBranch = getStoredCurrentBranchContext();
    const scopeState = getStoredBranchScopeState();
    return Number(currentBranch?.id || scopeState.branchId || 0) || null;
  }

  function getSupplierRecordBranchId(supplier) {
    return Number(supplier?.effective_branch_id || supplier?.branch_id || getWritableSupplierBranchId() || 0) || null;
  }

  function normalizeSupplierBranchIdList(values = []) {
    if (!Array.isArray(values)) {
      return [];
    }
    const unique = new Set();
    values.forEach((value) => {
      const normalized = Number(value || 0) || 0;
      if (normalized > 0) {
        unique.add(normalized);
      }
    });
    return Array.from(unique);
  }

  function getStoredCurrentUser() {
    try {
      const raw = localStorage.getItem('currentUser');
      return raw ? JSON.parse(raw) : null;
    } catch (_) {
      return null;
    }
  }

  function getAllowedBranchIdsFromStoredUser() {
    try {
      const scopeState = getStoredBranchScopeState();
      const runtimeAllowedBranchIds = normalizeSupplierBranchIdList(
        Array.isArray(window.currentBranchScopeContext?.allowedBranchIds)
          ? window.currentBranchScopeContext.allowedBranchIds
          : (Array.isArray(window.currentBranchScopeContext?.allowed_branch_ids) ? window.currentBranchScopeContext.allowed_branch_ids : [])
      );
      const currentUser = getStoredCurrentUser();
      const values = normalizeSupplierBranchIdList(Array.isArray(currentUser?.allowed_branch_ids) ? currentUser.allowed_branch_ids : []);
      const merged = normalizeSupplierBranchIdList([
        ...runtimeAllowedBranchIds,
        ...normalizeSupplierBranchIdList(scopeState?.allowedBranchIds),
        ...values,
      ]);
      if (merged.length) {
        return merged;
      }
    } catch (_) {
    }
    const fallbackBranchId = Number(getStoredCurrentBranchContext()?.id || getWritableSupplierBranchId() || 0) || null;
    return fallbackBranchId ? [fallbackBranchId] : [];
  }

  function escapeSupplierBranchHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function parseBranchIdsCsv(value) {
    return normalizeSupplierBranchIdList(
      String(value || '')
        .split(',')
        .map(part => Number(String(part || '').trim() || 0))
    );
  }

  let supplierBranchOptionsCache = [];
  let supplierBranchPickerSelectedIds = [];
  let supplierBranchPickerQuery = '';
  let supplierBranchPickerOpen = false;

  async function loadAvailableSupplierBranches(forceFresh = false) {
    const allowedBranchIds = getAllowedBranchIdsFromStoredUser();
    if (window.branches && typeof window.branches.getBranches === 'function') {
      const result = await window.branches.getBranches(forceFresh ? { activeOnly: true, forceFresh: true } : { activeOnly: true });
      const rows = result?.success && Array.isArray(result.data) ? result.data : [];
      supplierBranchOptionsCache = rows
        .map(branch => ({
          ...branch,
          id: Number(branch?.id || 0) || 0,
          code: String(branch?.code || '').trim(),
          name: String(branch?.name || '').trim(),
        }))
        .filter(branch => branch.id > 0 && (!allowedBranchIds.length || allowedBranchIds.includes(branch.id)));
    }
    if (!supplierBranchOptionsCache.length) {
      const currentBranch = getStoredCurrentBranchContext();
      const fallbackId = Number(currentBranch?.id || getWritableSupplierBranchId() || 0) || null;
      supplierBranchOptionsCache = fallbackId ? [{
        id: fallbackId,
        code: String(currentBranch?.code || '').trim(),
        name: String(currentBranch?.name || '').trim(),
      }] : [];
    }
    return supplierBranchOptionsCache;
  }

  function getSupplierAccessMode(supplier) {
    const rawMode = String(supplier?.access_scope || '').trim().toLowerCase();
    if (rawMode === 'all') return 'all';
    const branchCount = Number(supplier?.branch_count || 0) || 0;
    const selectedBranchIds = parseBranchIdsCsv(supplier?.branch_ids_csv);
    if (rawMode === 'multiple' || branchCount > 1 || selectedBranchIds.length > 1) {
      return 'multiple';
    }
    return 'single';
  }

  function getSupplierBranchLabel(supplier) {
    const accessMode = getSupplierAccessMode(supplier);
    if (accessMode === 'all') {
      return tSup('allBranches');
    }
    if (accessMode === 'multiple') {
      const codes = String(supplier?.branch_codes || '').trim();
      const names = String(supplier?.branch_names || '').trim();
      return codes || names || '';
    }
    const code = String(supplier?.branch_code || '').trim();
    const name = String(supplier?.branch_name || '').trim();
    if (code && name) return `${code} - ${name}`;
    return name || code || '';
  }

  function getSupplierDisplayName(supplier) {
    const branchLabel = isAllBranchesMode() ? getSupplierBranchLabel(supplier) : '';
    return branchLabel ? `${supplier?.name || ''} (${branchLabel})` : (supplier?.name || '');
  }

  function getSupplierBranchPickerRefs() {
    return {
      pickerEl: document.getElementById('ns_branch_picker'),
      scopeEl: document.getElementById('ns_branch_scope'),
      singleEl: document.getElementById('ns_branch_single'),
      triggerEl: document.getElementById('ns_branch_picker_trigger'),
      modalEl: document.getElementById('ns_branch_picker_modal'),
      modalCloseEl: document.getElementById('ns_branch_picker_modal_close'),
      titleEl: document.getElementById('ns_branch_picker_title'),
      listEl: document.getElementById('ns_branch_multi_list'),
      summaryEl: document.getElementById('ns_branch_multi_summary'),
      selectedEl: document.getElementById('ns_branch_multi_selected'),
      searchEl: document.getElementById('ns_branch_multi_search'),
      selectAllBtn: document.getElementById('ns_branch_multi_select_all'),
      clearBtn: document.getElementById('ns_branch_multi_clear'),
      doneBtn: document.getElementById('ns_branch_picker_done'),
    };
  }

  function getSupplierBranchLabelText(branch) {
    const code = String(branch?.code || '').trim();
    const name = String(branch?.name || '').trim();
    return code && name ? `${code} - ${name}` : (name || code || String(branch?.id || ''));
  }

  function getSupplierBranchMetaText(branch) {
    if (Number(branch?.is_main || 0) === 1) {
      return 'الفرع الرئيسي';
    }
    const address = String(branch?.address || '').trim();
    if (address) {
      return address;
    }
    const phone = String(branch?.phone || '').trim();
    if (phone) {
      return `هاتف: ${phone}`;
    }
    const altName = String(branch?.name_en || '').trim();
    return altName || 'فرع متاح للاستخدام';
  }

  function getSupplierBranchPreviewText(branches = []) {
    const previewLabels = branches.slice(0, 2).map((branch) => {
      const name = String(branch?.name || branch?.name_en || '').trim();
      const code = String(branch?.code || '').trim();
      if (name && code) {
        return `${name} (${code})`;
      }
      return name || code || `#${branch?.id || ''}`;
    }).filter(Boolean);
    const hiddenCount = Math.max(branches.length - previewLabels.length, 0);
    const separator = getSuppliersLang() === 'en' ? ', ' : '، ';
    return `${previewLabels.join(separator)}${hiddenCount ? ` +${hiddenCount}` : ''}`.trim();
  }

  function getOrderedSupplierBranchIds(values = supplierBranchPickerSelectedIds) {
    const selectedSet = new Set(normalizeSupplierBranchIdList(values));
    return supplierBranchOptionsCache
      .map(branch => Number(branch?.id || 0) || 0)
      .filter(id => id > 0 && selectedSet.has(id));
  }

  function setSupplierBranchPickerOpen(isOpen) {
    const { pickerEl, triggerEl, modalEl, searchEl } = getSupplierBranchPickerRefs();
    supplierBranchPickerOpen = !!isOpen;
    if (pickerEl) {
      pickerEl.dataset.open = supplierBranchPickerOpen ? 'true' : 'false';
    }
    if (triggerEl) {
      triggerEl.setAttribute('aria-expanded', supplierBranchPickerOpen ? 'true' : 'false');
    }
    if (modalEl) {
      modalEl.setAttribute('aria-hidden', supplierBranchPickerOpen ? 'false' : 'true');
    }
    if (supplierBranchPickerOpen && searchEl) {
      setTimeout(() => searchEl.focus(), 0);
    }
  }

  function renderSupplierBranchPicker() {
    const { pickerEl, listEl, summaryEl, selectedEl, searchEl, selectAllBtn, clearBtn } = getSupplierBranchPickerRefs();
    if (!pickerEl || !listEl || !summaryEl || !selectedEl) {
      return;
    }

    supplierBranchPickerSelectedIds = getOrderedSupplierBranchIds(supplierBranchPickerSelectedIds);
    const totalCount = supplierBranchOptionsCache.length;
    const selectedBranches = supplierBranchOptionsCache.filter(branch => supplierBranchPickerSelectedIds.includes(branch.id));
    const summaryTitle = selectedBranches.length
      ? (selectedBranches.length === 1 ? tSup('branchPickerTriggerTitleSingle') : tSup('branchPickerTriggerTitleMultiple'))
      : tSup('branchPickerTriggerTitleEmpty');
    const summaryText = selectedBranches.length
      ? getSupplierBranchPreviewText(selectedBranches)
      : tSup('branchPickerTriggerHintEmpty');
    const query = String(supplierBranchPickerQuery || '').trim().toLowerCase();
    const visibleBranches = supplierBranchOptionsCache.filter((branch) => {
      if (!query) return true;
      const haystack = [
        branch?.id,
        branch?.code,
        branch?.name,
        branch?.name_en,
        branch?.address,
        branch?.phone,
      ].map(value => String(value || '').toLowerCase()).join(' ');
      return haystack.includes(query);
    });

    if (searchEl && searchEl.value !== supplierBranchPickerQuery) {
      searchEl.value = supplierBranchPickerQuery;
    }

    summaryEl.innerHTML = `
      <span class="branch-picker-summary-icon" aria-hidden="true"><i class="fa-solid fa-code-branch"></i></span>
      <div class="branch-picker-summary-copy">
        <strong>${escapeSupplierBranchHtml(summaryTitle)}</strong>
        <span class="branch-picker-summary-preview">${escapeSupplierBranchHtml(summaryText)}</span>
      </div>
      <span class="branch-picker-count">${supplierBranchPickerSelectedIds.length}</span>
    `;

    selectedEl.innerHTML = selectedBranches.length
      ? `
          <div class="branch-picker-selected-head">
            <div class="branch-picker-selected-copy">
              <strong>${escapeSupplierBranchHtml(tSup('branchPickerSelectedTitle'))}</strong>
              <span>${escapeSupplierBranchHtml(tSup('branchPickerSelectedHint'))}</span>
            </div>
            <span class="branch-picker-selected-badge">${selectedBranches.length}</span>
          </div>
          <div class="branch-picker-selected-chips">
            ${selectedBranches.map((branch) => `
              <button type="button" class="branch-picker-chip" data-branch-remove="${branch.id}" title="${escapeSupplierBranchHtml(tSup('branchPickerRemoveBranch'))}: ${escapeSupplierBranchHtml(getSupplierBranchLabelText(branch))}">
                <span class="branch-picker-chip-code">${escapeSupplierBranchHtml(String(branch?.code || `#${branch.id}`))}</span>
                <span class="branch-picker-chip-name">${escapeSupplierBranchHtml(String(branch?.name || branch?.name_en || `فرع ${branch.id}`))}</span>
                <i class="fa-solid fa-xmark" aria-hidden="true"></i>
              </button>
            `).join('')}
          </div>
        `
      : `<div class="branch-picker-empty-inline">${escapeSupplierBranchHtml(tSup('branchPickerEmpty'))}</div>`;

    listEl.innerHTML = visibleBranches.length
      ? visibleBranches.map((branch) => {
          const selected = supplierBranchPickerSelectedIds.includes(branch.id);
          const branchName = String(branch?.name || branch?.name_en || `فرع ${branch.id}`);
          const branchCode = String(branch?.code || `#${branch.id}`);
          return `
            <label class="branch-picker-option ${selected ? 'is-selected' : ''}" data-branch-id="${branch.id}">
              <input type="checkbox" class="ns-branch-multi-item" value="${branch.id}" ${selected ? 'checked' : ''}>
              <span class="branch-picker-option-check"><i class="fa-solid fa-check" aria-hidden="true"></i></span>
              <span class="branch-picker-option-body">
                <span class="branch-picker-option-head">
                  <span class="branch-picker-option-name">${escapeSupplierBranchHtml(branchName)}</span>
                  <span class="branch-picker-option-code">${escapeSupplierBranchHtml(branchCode)}</span>
                </span>
                <span class="branch-picker-option-meta">${escapeSupplierBranchHtml(getSupplierBranchMetaText(branch))}</span>
              </span>
            </label>
          `;
        }).join('')
      : `
          <div class="branch-picker-empty-state">
            <i class="fa-solid fa-magnifying-glass-location" aria-hidden="true"></i>
            <span>${escapeSupplierBranchHtml(tSup('branchPickerNoResults'))}</span>
          </div>
        `;

    if (selectAllBtn) {
      selectAllBtn.disabled = totalCount === 0 || supplierBranchPickerSelectedIds.length === totalCount;
    }
    if (clearBtn) {
      clearBtn.disabled = supplierBranchPickerSelectedIds.length === 0;
    }
    pickerEl.dataset.hasSelection = supplierBranchPickerSelectedIds.length ? 'true' : 'false';
    pickerEl.dataset.open = supplierBranchPickerOpen ? 'true' : 'false';
  }

  function updateSupplierBranchScopeControls() {
    const { pickerEl, scopeEl, singleEl } = getSupplierBranchPickerRefs();
    const singleWrap = document.getElementById('ns_branch_single_wrap');
    const multiWrap = document.getElementById('ns_branch_multi_wrap');
    const hintEl = document.getElementById('ns_branch_hint');
    const availableCount = supplierBranchOptionsCache.length;
    let mode = String(scopeEl?.value || 'single').trim().toLowerCase();
    if (!['single', 'multiple', 'all'].includes(mode)) mode = 'single';
    if (availableCount <= 1) {
      mode = 'single';
      if (scopeEl) scopeEl.disabled = true;
    } else if (scopeEl) {
      scopeEl.disabled = false;
    }
    if (scopeEl) {
      scopeEl.value = mode;
      Array.from(scopeEl.options).forEach(option => {
        if (option.value === 'multiple' || option.value === 'all') {
          option.disabled = availableCount <= 1;
        }
      });
    }
    if (mode === 'single') {
      const singleBranchId = Number(singleEl?.value || supplierBranchPickerSelectedIds[0] || supplierBranchOptionsCache[0]?.id || 0) || null;
      supplierBranchPickerSelectedIds = singleBranchId ? [singleBranchId] : [];
      if (singleEl && singleBranchId) {
        singleEl.value = String(singleBranchId);
      }
    } else if (mode === 'multiple') {
      if (!supplierBranchPickerSelectedIds.length) {
        const fallbackBranchId = Number(singleEl?.value || supplierBranchOptionsCache[0]?.id || 0) || null;
        supplierBranchPickerSelectedIds = fallbackBranchId ? [fallbackBranchId] : [];
      }
      supplierBranchPickerSelectedIds = getOrderedSupplierBranchIds(supplierBranchPickerSelectedIds);
      if (singleEl && supplierBranchPickerSelectedIds.length) {
        singleEl.value = String(supplierBranchPickerSelectedIds[0]);
      }
    }
    if (pickerEl) {
      pickerEl.dataset.mode = mode;
    }
    if (mode !== 'multiple') {
      setSupplierBranchPickerOpen(false);
    }
    if (singleWrap) singleWrap.style.display = mode === 'single' ? '' : 'none';
    if (multiWrap) multiWrap.style.display = mode === 'multiple' ? '' : 'none';
    if (hintEl) {
      const text = mode === 'all'
        ? tSup('accessAllHint')
        : (mode === 'multiple' ? tSup('branchPickerMultipleHint') : '');
      hintEl.textContent = text;
      hintEl.style.display = text ? 'block' : 'none';
    }
    renderSupplierBranchPicker();
  }
  window.updateSupplierBranchScopeControls = updateSupplierBranchScopeControls;

  async function populateSupplierBranchAccessControls(options = {}) {
    const supplier = options?.supplier || null;
    await loadAvailableSupplierBranches(!!options?.forceFresh);
    const { scopeEl, singleEl, listEl, searchEl } = getSupplierBranchPickerRefs();
    if (!scopeEl || !singleEl || !listEl) return;

    singleEl.innerHTML = supplierBranchOptionsCache.map(branch => `
      <option value="${branch.id}">${escapeSupplierBranchHtml(getSupplierBranchLabelText(branch))}</option>
    `).join('');

    const availableBranchIds = supplierBranchOptionsCache.map(branch => Number(branch?.id || 0)).filter(id => id > 0);
    const requestedSelectedBranchIds = supplier
      ? (parseBranchIdsCsv(supplier?.branch_ids_csv).length
          ? parseBranchIdsCsv(supplier?.branch_ids_csv)
          : (getSupplierRecordBranchId(supplier) ? [getSupplierRecordBranchId(supplier)] : []))
      : (getWritableSupplierBranchId() ? [getWritableSupplierBranchId()] : (supplierBranchOptionsCache[0] ? [supplierBranchOptionsCache[0].id] : []));
    const selectedBranchIds = normalizeSupplierBranchIdList(requestedSelectedBranchIds).filter(id => availableBranchIds.includes(id));
    const mode = supplier ? getSupplierAccessMode(supplier) : 'single';
    scopeEl.value = mode;
    const primaryBranchId = selectedBranchIds[0] || supplierBranchOptionsCache[0]?.id || '';
    singleEl.value = String(primaryBranchId || '');
    supplierBranchPickerSelectedIds = selectedBranchIds.length
      ? getOrderedSupplierBranchIds(selectedBranchIds)
      : (primaryBranchId ? [Number(primaryBranchId)] : []);
    supplierBranchPickerQuery = '';
    if (searchEl) {
      searchEl.value = '';
    }
    updateSupplierBranchScopeControls();
  }

  function buildSupplierBranchAccessPayload() {
    const { scopeEl, singleEl } = getSupplierBranchPickerRefs();
    const availableBranchIds = supplierBranchOptionsCache.map(branch => Number(branch?.id || 0)).filter(id => Number.isFinite(id) && id > 0);
    let mode = String(scopeEl?.value || 'single').trim().toLowerCase();
    if (!['single', 'multiple', 'all'].includes(mode)) mode = 'single';
    if (availableBranchIds.length <= 1) {
      mode = 'single';
    }
    if (mode === 'all') {
      return {
        accessScope: 'all',
        branchId: Number(singleEl?.value || availableBranchIds[0] || getWritableSupplierBranchId() || 0) || null,
        branchIds: [],
      };
    }
    const branchIds = mode === 'multiple'
      ? getOrderedSupplierBranchIds(supplierBranchPickerSelectedIds).filter(id => availableBranchIds.includes(id))
      : [Number(singleEl?.value || 0)].filter(id => Number.isFinite(id) && id > 0);
    if (mode === 'single' && !branchIds.length) {
      throw new Error(tSup('branchRequired'));
    }
    if (mode === 'multiple' && !branchIds.length) {
      throw new Error(tSup('atLeastOneBranchRequired'));
    }
    return {
      accessScope: mode,
      branchId: branchIds[0] || Number(singleEl?.value || availableBranchIds[0] || getWritableSupplierBranchId() || 0) || null,
      branchIds,
    };
  }

  function formatDate(v){ const d = new Date(v); return isNaN(d) ? '' : d.toLocaleDateString('en-GB'); }
  const nf = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
  function parseDecimal(val){
    if (val===undefined || val===null) return 0;
    const s = String(val).trim().replace(/\s+/g,'').replace(/٬/g,'').replace(/,/g,''); // إزالة فواصل الآلاف
    const n = parseFloat(s);
    return isNaN(n) ? 0 : n;
  }
  function formatDecimal(val){
    const n = typeof val === 'number' ? val : parseDecimal(val);
    return nf.format(n);
  }

  // Wait for suppliers API to be injected from shell (iframe timing)
  async function waitForSuppliers(maxTries=25, delayMs=120){
    for (let i=0;i<maxTries;i++){
      if (window.suppliers && typeof window.suppliers.getSuppliers === 'function') return true;
      await new Promise(r=>setTimeout(r, delayMs));
    }
    return false;
  }

  async function load(options = {}){
    const forceFresh = !!options.forceFresh;
    if (!window.suppliers || !window.suppliers.getSuppliers) {
      const ok = await waitForSuppliers();
      if (!ok) return;
    }
    const res = await window.suppliers.getSuppliers(forceFresh ? { forceFresh: true } : undefined);
    if (!res.success) return;
    const rows = res.data || [];
    cache = rows;
    if (totalEl) totalEl.textContent = rows.length;
    const act = rows.filter(r=>!!r.active).length;
    const inact = rows.length - act;
    const aEl = document.getElementById('activeSuppliersValue');
    const iEl = document.getElementById('inactiveSuppliersValue');
    if (aEl) aEl.textContent = act;
    if (iEl) iEl.textContent = inact;

    // Render immediately for fast perceived response
    render(rows);

    // Stats month/week
    try{
      if (window.suppliers && window.suppliers.getSuppliersStats){
        const s = await window.suppliers.getSuppliersStats();
        if (s && s.success){
          const m = document.getElementById('suppliersMonth');
          const w = document.getElementById('suppliersWeek');
          const mb = document.getElementById('supMonthBar');
          const wb = document.getElementById('supWeekBar');
          if (m) m.textContent = tSup('suppliersAddedThisMonth').replace('{count}', s.month);
          if (w) w.textContent = tSup('suppliersAddedThisWeek').replace('{count}', s.week);
          const total = s.total || rows.length || 1;
          if (mb) mb.style.width = Math.min(100, Math.round((s.month/total)*100)) + '%';
          if (wb) wb.style.width = Math.min(100, Math.round((s.week/total)*100)) + '%';
          if (totalEl) totalEl.textContent = s.total;
        }
      }
    }catch(_){ }

    // Load debt info in background without blocking table display
    loadSuppliersDebt().catch(() => {});
  }

  async function refreshSuppliersRealtime() {
    if (suppliersRefreshInFlight) return;
    suppliersRefreshInFlight = true;
    try {
      await load({ forceFresh: true });
      applyCurrentFilter();
    } finally {
      suppliersRefreshInFlight = false;
    }
  }

  async function refreshSuppliersCloudModeState() {
    try {
      const api = window.api || window.cloudDatabase || window.parent?.api || window.top?.api;
      if (api && typeof api.getCloudMode === 'function') {
        const result = await api.getCloudMode();
        suppliersCloudModeActive = !!(result && result.success && result.activeMode === true);
        return suppliersCloudModeActive;
      }
    } catch (_) {}
    suppliersCloudModeActive = false;
    return false;
  }

  async function setupSuppliersRealtime() {
    await refreshSuppliersCloudModeState();
    if (suppliersRealtimeTimer) {
      clearInterval(suppliersRealtimeTimer);
      suppliersRealtimeTimer = null;
    }
    if (!suppliersCloudModeActive) {
      suppliersRealtimeTimer = setInterval(() => {
        refreshSuppliersRealtime();
      }, 15000);
    }
  }

  // Load suppliers debt - تحميل مديونية الموردين
  async function loadSuppliersDebt() {
    try {
        if (window.db && window.db.getSuppliersDebt){
            const result = await window.db.getSuppliersDebt();
            if (result && result.success){
                const nfEn = new Intl.NumberFormat('en-US', { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                });
                
                // Get selected karat from combobox
                const karatSelector = document.getElementById('suppliersKaratSelector');
                const selectedKarat = karatSelector ? parseFloat(karatSelector.value) : 21;
                
                const cashEl = document.getElementById('suppliersDebtCash');
                const goldEl = document.getElementById('suppliersDebtGold');
                
                // Gold balance is in karat 21, convert to selected karat
                const goldBalance21 = parseFloat(result.gold || 0);
                const goldBalanceConverted = goldBalance21 * (21 / selectedKarat);
                
                if (cashEl) {
                    const balance = parseFloat(result.cash || 0);
                    // balance موجب = المورد مدين (عليهم - يدفعون لنا)
                    // balance سالب = المورد دائن (لهم - ندفع لهم)
                    const statusLabel = balance > 0 ? tSup('debtors') + ' ' : balance < 0 ? tSup('creditors') + ' ' : '';
                    const statusColor = balance > 0 ? '#f44336' : balance < 0 ? '#4caf50' : '#666';
                    
                    cashEl.innerHTML = `<span style="color:${statusColor}">${statusLabel}<span class="animated-number">0.00</span></span> <span style="color:#666; font-size:13px">${tSup('riyal')}</span>`;
                    
                    // Animate number
                    setTimeout(() => {
                        const numberSpan = cashEl.querySelector('.animated-number');
                        animateValue(numberSpan, prevCashDebt, Math.abs(balance));
                        prevCashDebt = Math.abs(balance);
                    }, 16);
                }
                
                if (goldEl) {
                    // balance موجب = المورد مدين (عليهم - يدفعون لنا)
                    // balance سالب = المورد دائن (لهم - ندفع لهم)
                    const statusLabel = goldBalanceConverted > 0 ? tSup('debtors') + ' ' : goldBalanceConverted < 0 ? tSup('creditors') + ' ' : '';
                    const statusColor = goldBalanceConverted > 0 ? '#f44336' : goldBalanceConverted < 0 ? '#4caf50' : '#666';
                    
                    const karatLabel = selectedKarat === 24 ? tSup('pureGold') : `${tSup('goldKarat')} ${selectedKarat}`;
                    goldEl.innerHTML = `<span style="color:${statusColor}">${statusLabel}<span class="animated-number">0.00</span></span> <span style="color:#666; font-size:13px">${karatLabel}</span>`;
                    
                    // Animate number
                    setTimeout(() => {
                        const numberSpan = goldEl.querySelector('.animated-number');
                        animateValue(numberSpan, prevGoldDebt, Math.abs(goldBalanceConverted));
                        prevGoldDebt = Math.abs(goldBalanceConverted);
                    }, 16);
                }
            }
        }
    } catch(err) {
        
    }
  }

  function render(rows){
    if (!tbody) return;
    tbody.innerHTML = '';
    if (!rows.length){ tbody.innerHTML = `<tr><td colspan="10" style="text-align:center;padding:16px">${tSup('noSuppliers')}</td></tr>`; return; }
    const lang = getSuppliersLang();
    const textAlign = lang === 'ar' ? 'right' : 'left';
    const editTitle = tSup('btnEdit');
    const deleteTitle = tSup('btnDelete');
    const toggleTitle = tSup('toggleStatus');
    const showBranchLabel = isAllBranchesMode();
    for (const s of rows){
      const branchLabel = showBranchLabel ? getSupplierBranchLabel(s) : '';
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="text-align:${textAlign}">${s.id}</td>
        <td style="text-align:${textAlign}">${s.name}${branchLabel ? `<div style="font-size:11px;color:var(--subtle);margin-top:4px">${branchLabel}</div>` : ''}</td>
        <td style="text-align:${textAlign}">${s.tax_no||''}</td>
        <td style="text-align:${textAlign}">${s.phone||''}</td>
        <td style="text-align:${textAlign}">${s.email||''}</td>
        <td style="text-align:${textAlign}">${s.region||''}</td>
        <td style="text-align:center">
          <label class="switch" title="${toggleTitle}">
            <input type="checkbox" ${s.active? 'checked': ''} disabled>
            <span class="slider"></span>
          </label>
        </td>
        <td style="text-align:${textAlign}">${formatDate(s.created_at)}</td>
        <td style="text-align:${textAlign}">${formatDecimal(s.debt_limit)}</td>
        <td class="row" style="text-align:center">
          <button class="icon-btn act-edit" title="${editTitle}" data-id="${s.id}"><i class="fa-solid fa-pen"></i></button>
          <button class="icon-btn act-delete" title="${deleteTitle}" data-id="${s.id}"><i class="fa-solid fa-xmark"></i></button>
        </td>`;
      tbody.appendChild(tr);
    }
  }

  function openModal(){ modal.setAttribute('aria-hidden','false'); }
  function closeModal(force = false){
    if (supplierSaveInFlight && !force) return;
    modal.setAttribute('aria-hidden','true');
    document.getElementById('newSupplierForm')?.reset();
    if (nsError) nsError.textContent = '';
    isEditMode = false;
    editingId = null;
    editingBranchId = null;
    supplierBranchPickerQuery = '';
    setSupplierBranchPickerOpen(false);
  }

  if (btnNew) btnNew.addEventListener('click', async () => {
    isEditMode = false; editingId = null; editingBranchId = null;
    document.getElementById('newSupplierForm')?.reset();
    if (nsError) nsError.textContent = '';
    // Reset modal title and subtitle
    const modalTitle = document.getElementById('modalTitle');
    const modalSaveText = document.getElementById('modalSaveText');
    const supplierSubtitle = document.getElementById('supplierHeaderSubtitle');
    if (modalTitle) modalTitle.textContent = tSup('addSupplier');
    if (modalSaveText) modalSaveText.textContent = tSup('btnSave');
    if (supplierSubtitle) supplierSubtitle.textContent = tSup('newSupplier');
    // Clear fields
    const idEl = document.getElementById('ns_id'); if (idEl) idEl.value = '';
    const nameEl = document.getElementById('ns_name'); if (nameEl) nameEl.value = '';
    const taxEl = document.getElementById('ns_tax'); if (taxEl) taxEl.value = '';
    const phoneEl = document.getElementById('ns_phone'); if (phoneEl) phoneEl.value = '';
    const emailEl = document.getElementById('ns_email'); if (emailEl) emailEl.value = '';
    const regionEl = document.getElementById('ns_region'); if (regionEl) regionEl.value = '';
    const categoryEl = document.getElementById('ns_category'); if (categoryEl) categoryEl.value = '';
    const debtEl = document.getElementById('ns_debt'); if (debtEl) debtEl.value = '';
    const activeEl = document.getElementById('ns_active'); if (activeEl) activeEl.checked = true;
    // مسح حقول إعدادات الأونصة
    const saleOzAdd = document.getElementById('ns_sale_oz_add'); if (saleOzAdd) saleOzAdd.value = '';
    const saleOzAddEnabled = document.getElementById('ns_sale_oz_add_enabled'); if (saleOzAddEnabled) saleOzAddEnabled.checked = false;
    const saleOzSub = document.getElementById('ns_sale_oz_sub'); if (saleOzSub) saleOzSub.value = '';
    const saleOzSubEnabled = document.getElementById('ns_sale_oz_sub_enabled'); if (saleOzSubEnabled) saleOzSubEnabled.checked = false;
    const purchaseOzAdd = document.getElementById('ns_purchase_oz_add'); if (purchaseOzAdd) purchaseOzAdd.value = '';
    const purchaseOzAddEnabled = document.getElementById('ns_purchase_oz_add_enabled'); if (purchaseOzAddEnabled) purchaseOzAddEnabled.checked = false;
    const purchaseOzSub = document.getElementById('ns_purchase_oz_sub'); if (purchaseOzSub) purchaseOzSub.value = '';
    const purchaseOzSubEnabled = document.getElementById('ns_purchase_oz_sub_enabled'); if (purchaseOzSubEnabled) purchaseOzSubEnabled.checked = false;
    if (window.db && window.db.getNextSupplierId){
      const r = await window.db.getNextSupplierId();
      if (r && r.success) document.getElementById('ns_id').value = r.nextId;
    }
    // Use local date (not UTC) to avoid showing yesterday's date
    const d = new Date();
    document.getElementById('ns_date').value = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
    // تحميل التصنيفات عند فتح المودال
    if (typeof loadCategoryOptions === 'function') {
      await loadCategoryOptions();
    }
    await populateSupplierBranchAccessControls();
    openModal();
  });
  
  // Add digit-only validation for tax_no and phone
  const taxNoInput = document.getElementById('ns_tax');
  const phoneInput = document.getElementById('ns_phone');
  const supplierBranchScopeEl = document.getElementById('ns_branch_scope');
  const supplierBranchSingleEl = document.getElementById('ns_branch_single');
  const supplierBranchPickerEl = document.getElementById('ns_branch_picker');
  const supplierBranchPickerTriggerEl = document.getElementById('ns_branch_picker_trigger');
  const supplierBranchPickerModalEl = document.getElementById('ns_branch_picker_modal');
  const supplierBranchPickerModalCloseEl = document.getElementById('ns_branch_picker_modal_close');
  const supplierBranchPickerDoneEl = document.getElementById('ns_branch_picker_done');
  const supplierBranchMultiSearchEl = document.getElementById('ns_branch_multi_search');
  const supplierBranchMultiListEl = document.getElementById('ns_branch_multi_list');
  const supplierBranchSelectedEl = document.getElementById('ns_branch_multi_selected');
  const supplierBranchSelectAllBtn = document.getElementById('ns_branch_multi_select_all');
  const supplierBranchClearBtn = document.getElementById('ns_branch_multi_clear');
  
  function enforceDigitsOnly(e) {
      // Allow: backspace, delete, tab, escape, enter
      if ([8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
          // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
          (e.keyCode === 65 && e.ctrlKey === true) ||
          (e.keyCode === 67 && e.ctrlKey === true) ||
          (e.keyCode === 86 && e.ctrlKey === true) ||
          (e.keyCode === 88 && e.ctrlKey === true) ||
          // Allow: home, end, left, right
          (e.keyCode >= 35 && e.keyCode <= 39)) {
          return;
      }
      // Ensure that it is a number and stop the keypress
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
          e.preventDefault();
      }
  }
  
  function cleanNonDigits(e) {
      e.target.value = e.target.value.replace(/\D/g, '');
  }
  
  if (taxNoInput) {
      taxNoInput.addEventListener('keydown', enforceDigitsOnly);
      taxNoInput.addEventListener('input', cleanNonDigits);
  }
  
  if (phoneInput) {
      phoneInput.addEventListener('keydown', enforceDigitsOnly);
      phoneInput.addEventListener('input', cleanNonDigits);
  }
  if (supplierBranchScopeEl) {
    supplierBranchScopeEl.addEventListener('change', updateSupplierBranchScopeControls);
  }
  if (supplierBranchPickerTriggerEl) {
    supplierBranchPickerTriggerEl.addEventListener('click', () => {
      setSupplierBranchPickerOpen(true);
      renderSupplierBranchPicker();
    });
  }
  if (supplierBranchPickerModalCloseEl) {
    supplierBranchPickerModalCloseEl.addEventListener('click', () => {
      setSupplierBranchPickerOpen(false);
      renderSupplierBranchPicker();
    });
  }
  if (supplierBranchPickerDoneEl) {
    supplierBranchPickerDoneEl.addEventListener('click', () => {
      setSupplierBranchPickerOpen(false);
      renderSupplierBranchPicker();
    });
  }
  if (supplierBranchSingleEl) {
    supplierBranchSingleEl.addEventListener('change', () => {
      const selectedBranchId = Number(supplierBranchSingleEl.value || 0) || null;
      supplierBranchPickerSelectedIds = selectedBranchId ? [selectedBranchId] : [];
      renderSupplierBranchPicker();
    });
  }
  if (supplierBranchMultiSearchEl) {
    supplierBranchMultiSearchEl.addEventListener('input', (event) => {
      supplierBranchPickerQuery = String(event?.target?.value || '');
      renderSupplierBranchPicker();
    });
  }
  if (supplierBranchMultiListEl) {
    supplierBranchMultiListEl.addEventListener('change', (event) => {
      const input = event?.target;
      if (!(input instanceof HTMLInputElement) || !input.classList.contains('ns-branch-multi-item')) {
        return;
      }
      const branchId = Number(input.value || 0) || null;
      if (!branchId) {
        return;
      }
      const selectedSet = new Set(getOrderedSupplierBranchIds(supplierBranchPickerSelectedIds));
      if (input.checked) {
        selectedSet.add(branchId);
      } else {
        selectedSet.delete(branchId);
      }
      supplierBranchPickerSelectedIds = getOrderedSupplierBranchIds(Array.from(selectedSet));
      if (supplierBranchSingleEl && supplierBranchPickerSelectedIds.length) {
        supplierBranchSingleEl.value = String(supplierBranchPickerSelectedIds[0]);
      }
      renderSupplierBranchPicker();
    });
  }
  if (supplierBranchSelectedEl) {
    supplierBranchSelectedEl.addEventListener('click', (event) => {
      const removeBtn = event?.target?.closest('[data-branch-remove]');
      if (!removeBtn) {
        return;
      }
      const branchId = Number(removeBtn.getAttribute('data-branch-remove') || 0) || null;
      if (!branchId) {
        return;
      }
      supplierBranchPickerSelectedIds = supplierBranchPickerSelectedIds.filter(id => id !== branchId);
      if (supplierBranchSingleEl) {
        supplierBranchSingleEl.value = String(supplierBranchPickerSelectedIds[0] || supplierBranchOptionsCache[0]?.id || '');
      }
      renderSupplierBranchPicker();
    });
  }
  if (supplierBranchSelectAllBtn) {
    supplierBranchSelectAllBtn.addEventListener('click', () => {
      supplierBranchPickerSelectedIds = supplierBranchOptionsCache.map(branch => Number(branch?.id || 0)).filter(id => id > 0);
      if (supplierBranchSingleEl && supplierBranchPickerSelectedIds.length) {
        supplierBranchSingleEl.value = String(supplierBranchPickerSelectedIds[0]);
      }
      renderSupplierBranchPicker();
    });
  }
  if (supplierBranchClearBtn) {
    supplierBranchClearBtn.addEventListener('click', () => {
      supplierBranchPickerSelectedIds = [];
      renderSupplierBranchPicker();
    });
  }
  if (supplierBranchPickerModalEl) {
    const branchPickerBackdrop = supplierBranchPickerModalEl.querySelector('.modal-backdrop');
    if (branchPickerBackdrop) {
      branchPickerBackdrop.addEventListener('click', () => {
        setSupplierBranchPickerOpen(false);
        renderSupplierBranchPicker();
      });
    }
  }
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && supplierBranchPickerOpen) {
      setSupplierBranchPickerOpen(false);
      renderSupplierBranchPicker();
    }
  });
  if (mClose) mClose.addEventListener('click', closeModal);
  if (mCancel) mCancel.addEventListener('click', closeModal);
  if (mSave) mSave.addEventListener('click', async () => {
    if (supplierSaveInFlight) return;
    supplierSaveInFlight = true;
    mSave.disabled = true;
    try {
      const name = document.getElementById('ns_name').value.trim();
      if (!name) { nsError.textContent = tSup('supplierNameRequired'); return; }
      nsError.textContent = '';

      // ✅ فحص دقيق للصلاحية: نعتمد على editingId
      const isActualEdit = editingId && Number.isFinite(parseInt(editingId, 10));
      
      // Validate tax number FIRST
      const taxNo = document.getElementById('ns_tax')?.value.trim() || '';
      if (taxNo && taxNo.length !== 15) {
        nsError.textContent = 'الرقم الضريبي يجب أن يكون 15 رقماً أو فارغاً';
        return;
      }
      if (taxNo && !/^\d+$/.test(taxNo)) {
        nsError.textContent = 'الرقم الضريبي يجب أن يحتوي على أرقام فقط';
        return;
      }

      // Validate phone number (only digits)
      const phone = document.getElementById('ns_phone').value.trim();
      if (phone && !/^\d+$/.test(phone)) {
        nsError.textContent = 'رقم الهاتف يجب أن يحتوي على أرقام فقط';
        return;
      }

      // After validation passes, check permissions and password
      if (isActualEdit) {
        // تعديل مورد موجود - يحتاج صلاحية تعديل
        if (window.ScreenPermissions && !window.ScreenPermissions.check('suppliers_edit', 'تعديل مورد')) {
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
              // Error occurred
            }
            return;
          }
        }
      } else {
        // إضافة مورد جديد - يحتاج صلاحية إضافة
        if (window.ScreenPermissions && !window.ScreenPermissions.check('suppliers_add', 'إضافة مورد')) {
          return;
        }
      }

      const currentUserId = getCurrentUserId();
      let supplierBranchAccess;
      try {
        supplierBranchAccess = buildSupplierBranchAccessPayload();
      } catch (branchError) {
        nsError.textContent = branchError?.message || tSup('branchRequired');
        return;
      }
      
      const payload = {
        id: parseInt(document.getElementById('ns_id')?.value || '', 10) || undefined,
        name,
        tax_no: taxNo,
        phone: phone,
        email: document.getElementById('ns_email')?.value.trim() || '',
        region: document.getElementById('ns_region').value.trim(),
        category: document.getElementById('ns_category')?.value.trim() || '',
        active: document.getElementById('ns_active').checked ? 1 : 0,
        created_at: document.getElementById('ns_date').value || (()=>{ const d=new Date(); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); })(),
        debt_limit: parseDecimal(document.getElementById('ns_debt').value),
        sale_ounce_add: parseFloat(document.getElementById('ns_sale_oz_add')?.value) || 0,
        sale_ounce_add_enabled: document.getElementById('ns_sale_oz_add_enabled')?.checked ? 1 : 0,
        sale_ounce_sub: parseFloat(document.getElementById('ns_sale_oz_sub')?.value) || 0,
        sale_ounce_sub_enabled: document.getElementById('ns_sale_oz_sub_enabled')?.checked ? 1 : 0,
        purchase_ounce_add: parseFloat(document.getElementById('ns_purchase_oz_add')?.value) || 0,
        purchase_ounce_add_enabled: document.getElementById('ns_purchase_oz_add_enabled')?.checked ? 1 : 0,
        purchase_ounce_sub: parseFloat(document.getElementById('ns_purchase_oz_sub')?.value) || 0,
        purchase_ounce_sub_enabled: document.getElementById('ns_purchase_oz_sub_enabled')?.checked ? 1 : 0
      };
      
      // Add user tracking
      if (isActualEdit) {
        payload.updated_by = currentUserId;
      } else {
        payload.created_by = currentUserId;
      }
      const requestBranchId = isActualEdit
        ? (Number(editingBranchId || 0) || supplierBranchAccess?.branchId || null)
        : (supplierBranchAccess?.branchId || null);
      if (requestBranchId) {
        payload.branchId = requestBranchId;
        payload.selectedBranchId = requestBranchId;
      }
      payload.accessScope = supplierBranchAccess?.accessScope || 'single';
      payload.branchIds = Array.isArray(supplierBranchAccess?.branchIds) ? supplierBranchAccess.branchIds : [];
      
      if (!payload.name) return;
      let res;
      if (isActualEdit && window.suppliers && window.suppliers.updateSupplier){
        res = await window.suppliers.updateSupplier({ ...payload, id: editingId });
      } else if (window.suppliers && window.suppliers.addSupplier){
        res = await window.suppliers.addSupplier(payload);
      }
      if (res && res.success){
        if (!isActualEdit && Number(res.id) > 0) {
          try {
            window.parent?.postMessage({
              type: 'daily-ops-notification',
              entityType: 'suppliers',
              documentId: Number(res.id),
              userName: getCurrentUserDisplayName(),
              action: 'insert',
            }, '*');
          } catch (_) {}
        }
        closeModal(true);
        await load();
        applyCurrentFilter();
      }
    } finally {
      supplierSaveInFlight = false;
      mSave.disabled = false;
    }
  });

  const debounce = (fn,ms=250)=>{ let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a),ms); }; };
  // دالة لإعادة تطبيق البحث النشط
  function applyCurrentFilter(){
    const q = search?.value?.trim()?.toLowerCase() || '';
    if (!q){ render(cache); return; }
    const rows = cache.filter(s => [s.id, s.name, s.tax_no, s.phone, s.region, s.branch_name, s.branch_code, s.branch_names, s.branch_codes].some(v => (v!==undefined&&v!==null&&String(v).toLowerCase().includes(q))));
    render(rows);
  }
  if (search) search.addEventListener('input', debounce(async (e)=>{
    const q = e.target.value.trim().toLowerCase();
    if (!q){ render(cache); return; }
    const rows = cache.filter(s => [s.id, s.name, s.tax_no, s.phone, s.region, s.branch_name, s.branch_code, s.branch_names, s.branch_codes].some(v => (v!==undefined&&v!==null&&String(v).toLowerCase().includes(q))));
    render(rows);
  },300));

  // Refresh button
  if (btnRefresh) btnRefresh.addEventListener('click', ()=>{ if (search) search.value=''; load({ forceFresh: true }); });

  // Enforce digits-only for inputs marked with data-digits-only (phone, tax)
  document.addEventListener('input', (e)=>{
    const t = e.target;
    if (!(t instanceof HTMLInputElement)) return;
    if (t.hasAttribute('data-digits-only')){
      const cur = t.value || '';
      const cleaned = cur.replace(/\D+/g,'');
      if (cur !== cleaned) t.value = cleaned;
    }
  });

  // Sortable headers
  const tableHead = document.querySelector('#suppliers-grid thead');
  let sortState = { key: 'id', dir: 'asc' };
  function sortRows(key){
    sortState.dir = (sortState.key === key && sortState.dir === 'asc') ? 'desc' : 'asc';
    sortState.key = key;
    const rows = [...(cache||[])];
    rows.sort((a,b)=>{
      const av = a[key]; const bv = b[key];
      if (av==null && bv==null) return 0;
      if (av==null) return 1;
      if (bv==null) return -1;
      if (key==='id' || key==='debt_limit') return (sortState.dir==='asc' ? (Number(av)-Number(bv)) : (Number(bv)-Number(av)));
      return (String(av).localeCompare(String(bv), 'ar')) * (sortState.dir==='asc'?1:-1);
    });
    render(rows);
  }
  if (tableHead){
    const map = ['id','name','tax_no','phone','region','active','created_at','debt_limit'];
    tableHead.addEventListener('click', (e)=>{
      const th = e.target.closest('th');
      if (!th) return;
      const idx = Array.from(th.parentElement.children).indexOf(th);
      const key = map[idx];
      if (!key) return;
      sortRows(key);
    });
  }

  // Confirm delete modal
  function confirmDeleteSup(msg){
    return new Promise(resolve => {
      const modal = document.getElementById('confirmSupDelModal');
      const m = document.getElementById('confirmSupDelMsg');
      const y = document.getElementById('confirmSupDelYes');
      const n = document.getElementById('confirmSupDelNo');
      const c = document.getElementById('confirmSupDelClose');
      const close = ()=>{ modal.setAttribute('aria-hidden','true'); cleanup(); };
      const cleanup = ()=>{ y.removeEventListener('click',onY); n.removeEventListener('click',onN); c.removeEventListener('click',onN); modal.querySelector('.modal-backdrop').removeEventListener('click',onN); };
      const onY = ()=>{ resolve(true); close(); };
      const onN = ()=>{ resolve(false); close(); };
      if (m) m.textContent = msg || tSup('confirmDeleteMessage');
      y.addEventListener('click',onY); n.addEventListener('click',onN); c.addEventListener('click',onN); modal.querySelector('.modal-backdrop').addEventListener('click',onN);
      modal.setAttribute('aria-hidden','false');
    });
  }

  // Actions: edit/delete
  if (tbody){
    tbody.addEventListener('click', async (e)=>{
      const del = e.target.closest('.act-delete');
      const edit = e.target.closest('.act-edit');
      if (del){
        const id = parseInt(del.dataset.id,10);
        const item = cache.find(s => s.id === id);
        const name = item?.name || del.closest('tr')?.children?.[1]?.textContent || '';
        
        // ✅ Check delete permission BEFORE opening confirmation modal
        if (window.ScreenPermissions && !window.ScreenPermissions.check('suppliers_delete', 'حذف مورد')) {
          return;
        }
        
        const ok = await confirmDeleteSup(tSup('confirmDeleteSupplier').replace('{name}', name));
        if (!ok) return;
        
        // طلب تأكيد كلمة المرور للحذف
        const confirmFn = window.confirmDeleteWithPassword || window.parent?.confirmDeleteWithPassword || window.top?.confirmDeleteWithPassword;
        if (confirmFn) {
          try {
            const confirmed = await confirmFn();
            if (!confirmed) return;
          } catch (e) {
            if (e.message !== 'cancelled') {
              // Error occurred
            }
            return;
          }
        }
        
        if (window.suppliers && window.suppliers.deleteSupplier){
          const r = await window.suppliers.deleteSupplier({
            id,
            branchId: getSupplierRecordBranchId(item),
            actorUserId: getCurrentUserId(),
            actorName: getCurrentUserDisplayName(),
          });
          if (r && r.success){ 
            await load(); 
            applyCurrentFilter(); 
          } else {
            showDeleteErrorModal(r);
          }
        }
      } else if (edit){
        const id = parseInt(edit.dataset.id,10);
        const item = cache.find(s => s.id === id);
        if (!item) return;
        isEditMode = true; editingId = id; editingBranchId = getSupplierRecordBranchId(item);
        // Set edit mode title and subtitle
        const modalTitle = document.getElementById('modalTitle');
        const modalSaveText = document.getElementById('modalSaveText');
        const supplierSubtitle = document.getElementById('supplierHeaderSubtitle');
        if (modalTitle) modalTitle.textContent = tSup('editSupplier');
        if (modalSaveText) modalSaveText.textContent = tSup('btnSaveChanges');
        if (supplierSubtitle) supplierSubtitle.textContent = item.name || '';
        document.getElementById('ns_id').value = item.id;
        document.getElementById('ns_name').value = item.name || '';
        document.getElementById('ns_tax').value = item.tax_no || '';
        document.getElementById('ns_phone').value = item.phone || '';
        document.getElementById('ns_email').value = item.email || '';
        document.getElementById('ns_region').value = item.region || '';
        // تحميل التصنيفات ثم تعيين القيمة
        if (typeof loadCategoryOptions === 'function') {
          await loadCategoryOptions();
        }
        document.getElementById('ns_category').value = item.category || '';
        await populateSupplierBranchAccessControls({ supplier: item });
        document.getElementById('ns_active').checked = !!item.active;
        document.getElementById('ns_date').value = item.created_at || '';
        document.getElementById('ns_debt').value = item.debt_limit !== undefined && item.debt_limit !== null ? formatDecimal(item.debt_limit) : '';
        // تحميل إعدادات الأونصة
        document.getElementById('ns_sale_oz_add').value = item.sale_ounce_add || '';
        document.getElementById('ns_sale_oz_add_enabled').checked = !!item.sale_ounce_add_enabled;
        document.getElementById('ns_sale_oz_sub').value = item.sale_ounce_sub || '';
        document.getElementById('ns_sale_oz_sub_enabled').checked = !!item.sale_ounce_sub_enabled;
        document.getElementById('ns_purchase_oz_add').value = item.purchase_ounce_add || '';
        document.getElementById('ns_purchase_oz_add_enabled').checked = !!item.purchase_ounce_add_enabled;
        document.getElementById('ns_purchase_oz_sub').value = item.purchase_ounce_sub || '';
        document.getElementById('ns_purchase_oz_sub_enabled').checked = !!item.purchase_ounce_sub_enabled;
        openModal();
      }
    });
  }

  // Export Excel (.xls) with borders
  function exportXls(){
    // Check export permission
    if (window.ScreenPermissions && !window.ScreenPermissions.check('suppliers_export', 'تصدير الموردين')) {
      return;
    }
    
    const rows = cache || [];
    const yesText = tSup('yes');
    const noText = tSup('no');
    const headers = [tSup('thSupplierId'), tSup('thSupplierName'), tSup('thTaxNo'), tSup('thPhone'), tSup('thRegion'), tSup('thActive'), tSup('thDate'), tSup('thDebtLimit')];
    const htmlRows = rows.map(s => `
      <tr>
        <td>${s.id ?? ''}</td>
        <td>${getSupplierDisplayName(s)}</td>
        <td>${s.tax_no ?? ''}</td>
        <td>${s.phone ?? ''}</td>
        <td>${s.region ?? ''}</td>
        <td>${s.active ? yesText : noText}</td>
        <td>${formatDate(s.created_at)}</td>
        <td>${s.debt_limit !== undefined && s.debt_limit !== null ? formatDecimal(s.debt_limit) : ''}</td>
      </tr>
    `).join('');
    const xlsHtml = `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><style>table{border-collapse:collapse}th,td{border:1px solid #444;padding:6px;text-align:right;white-space:nowrap}thead th{background:#eaeaea}</style></head><body><table><thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${htmlRows}</tbody></table></body></html>`;
    const blob = new Blob(['\ufeff' + xlsHtml], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'suppliers.xls'; document.body.appendChild(a); a.click(); setTimeout(()=>{URL.revokeObjectURL(url); a.remove();},0);
  }
  if (btnExportXls) btnExportXls.addEventListener('click', exportXls);

  // Export PDF preview
  function normalizeFileUrl(p){ if(!p) return ''; return p.startsWith('file://') ? p : 'file:///' + String(p).replace(/\\/g,'/'); }
  function buildCompanyHeader(c){
    const logoUrl = (c && c.logoData) ? c.logoData : (c && c.logo ? (normalizeFileUrl(c.logo) + '?v=' + Date.now()) : '');
    const nameAr = c?.name || '';
    const nameEn = c?.name_en || nameAr;
    const tax = c?.tax || '';
    const now = new Date();
    const dtAr = now.toLocaleString('ar-EG', { hour12: false });
    const dtEn = now.toLocaleString('en-GB', { hour12: false });
    return `
      <section class="comp-header" style="display:flex;align-items:flex-start;justify-content:space-between;padding:16px;background:#f9f9f9;border-bottom:3px solid #000;margin-bottom:12px;gap:16px">
        <div class="comp-col" style="flex:1;border:2px solid #333;padding:12px;background:#fff;border-radius:6px">
          <div class="line" style="margin:4px 0;font-size:13px"><strong>اسم الشركة:</strong> ${nameAr}</div>
          <div class="line" style="margin:4px 0;font-size:13px"><strong>الرقم الضريبي:</strong> ${tax}</div>
          <div class="line" style="margin:4px 0;font-size:13px"><strong>التاريخ والوقت:</strong> ${dtAr}</div>
        </div>
        <div class="comp-logo" style="width:120px;height:120px;border:2px solid #333;border-radius:6px;overflow:hidden;display:flex;align-items:center;justify-content:center;background:#fff;flex-shrink:0">${logoUrl ? `<img src="${logoUrl}" alt="logo" style="width:100%;height:100%;object-fit:contain">` : '<div class="logo-fallback" style="width:100%;height:100%;background:#f0f0f0"></div>'}</div>
        <div class="comp-col ltr" style="flex:1;direction:ltr;text-align:left;border:2px solid #333;padding:12px;background:#fff;border-radius:6px">
          <div class="line" style="margin:4px 0;font-size:13px"><strong>Company Name:</strong> ${nameEn}</div>
          <div class="line" style="margin:4px 0;font-size:13px"><strong>Tax Number:</strong> ${tax}</div>
          <div class="line" style="margin:4px 0;font-size:13px"><strong>Date & Time:</strong> ${dtEn}</div>
        </div>
      </section>`;
  }

  async function exportPdf(){
    // Check export permission
    if (window.ScreenPermissions && !window.ScreenPermissions.check('suppliers_export', 'تصدير الموردين')) {
      return;
    }
    
    const lang = getSuppliersLang();
    const isRtl = lang === 'ar';
    const dir = isRtl ? 'rtl' : 'ltr';
    const textAlign = isRtl ? 'right' : 'left';
    const yesText = tSup('yes');
    const noText = tSup('no');
    
    const rows = cache || [];
    const htmlRows = rows.map(s => `
      <tr>
        <td>${s.id ?? ''}</td>
        <td>${getSupplierDisplayName(s)}</td>
        <td>${s.tax_no ?? ''}</td>
        <td>${s.phone ?? ''}</td>
        <td>${s.region ?? ''}</td>
        <td>${s.active ? yesText : noText}</td>
        <td>${formatDate(s.created_at)}</td>
        <td>${s.debt_limit !== undefined && s.debt_limit !== null ? formatDecimal(s.debt_limit) : ''}</td>
      </tr>
    `).join('');
    // load company info
    let company = {};
    try{ if (window.api && window.api.getCompanyInfo){ const r = await window.api.getCompanyInfo(); if (r && r.success) company = r.company || {}; } }catch(_){ }
    const headerHTML = buildCompanyHeader(company);
    const docHtml = `<!doctype html><html lang="${lang}" dir="${dir}"><head><meta charset="utf-8"><title>${tSup('printPreview')}</title><style>
      body{font-family:Cairo,Arial,sans-serif;margin:0}
      header{position:sticky;top:0;background:#f5f5f5;border-bottom:1px solid #ccc;padding:10px;display:flex;justify-content:space-between;align-items:center}
      main{padding:20px}
      button{padding:8px 14px;border-radius:10px;border:1px solid #0aa99d;background:linear-gradient(135deg,#00a99d,#008f85);color:#fff;cursor:pointer}
      button:hover{filter:brightness(1.05)}
      table{width:100%;border-collapse:collapse}
      th,td{border:1px solid #999;padding:6px;text-align:${textAlign};font-size:12px}
      thead th{background:#eee}
      .comp-header{display:grid;justify-items:center;gap:10px;margin:0 0 14px 0}
      .comp-logo{width:88px;height:88px;border-radius:50%;overflow:hidden;border:1px solid #ccc;background:#fafafa;display:grid;place-items:center}
      .comp-logo img{width:100%;height:100%;object-fit:cover}
      .comp-cols{display:grid;grid-template-columns:1fr 1fr;gap:12px;max-width:720px;width:100%}
      .comp-col{font-size:12px}
      .comp-col.ltr{direction:ltr;text-align:left}
      .comp-col .line{margin:2px 0}
      .print-button{position:fixed;bottom:30px;${isRtl ? 'left' : 'right'}:30px;background:linear-gradient(135deg,#00897B 0%,#00695C 100%);color:white;border:none;padding:15px 30px;border-radius:50px;font-size:16px;font-weight:700;cursor:pointer;box-shadow:0 4px 20px rgba(0,137,123,0.4);transition:all 0.3s;z-index:1000;display:inline-flex;align-items:center;gap:8px}
      .print-button:hover{transform:translateY(-2px);box-shadow:0 6px 30px rgba(0,137,123,0.5)}
      .print-button i{font-style:normal}
      @media print{ .no-print{display:none !important} body{margin:10mm} }
    </style></head><body><main>
      ${headerHTML}
      <h2 style="text-align:center;margin:0 0 12px 0">${tSup('printTitle')}</h2>
      <table><thead><tr><th>${tSup('thSupplierId')}</th><th>${tSup('thSupplierName')}</th><th>${tSup('thTaxNo')}</th><th>${tSup('thPhone')}</th><th>${tSup('thRegion')}</th><th>${tSup('thActive')}</th><th>${tSup('thDate')}</th><th>${tSup('thDebtLimit')}</th></tr></thead><tbody>${htmlRows}</tbody></table>
    </main><button class="print-button no-print" onclick="window.print()"><i>🖨️</i>${tSup('printButton')}</button></body></html>`;
    if (window.openPreview) window.openPreview(docHtml); else {
      const w = window.open('', '_blank'); if (!w) return; w.document.open(); w.document.write(docHtml); w.document.close(); w.focus();
    }
  }
  if (btnExportPdf) btnExportPdf.addEventListener('click', exportPdf);

  (async()=>{
    await waitForSuppliers();
    await load({ forceFresh: true });
    await setupSuppliersRealtime();
  })();

  if (window.api && typeof window.api.on === 'function') {
    window.api.on('cloud-data-updated', (payload) => {
      const tables = Array.isArray(payload?.tables) ? payload.tables : [];
      if (tables.includes('suppliers') || tables.includes('supplier_branches')) {
        refreshSuppliersRealtime();
      }
    });
  }

  window.addEventListener('message', (event) => {
    if (event?.data?.type === 'db-mode-changed') {
      setupSuppliersRealtime();
      return;
    }
    if (event?.data?.type === 'branch-scope-changed') {
      refreshSuppliersRealtime();
      return;
    }
    if (event?.data?.type === 'cloud-data-updated') {
      const payload = event.data.payload || {};
      const tables = Array.isArray(payload?.tables) ? payload.tables : [];
      if (tables.includes('suppliers') || tables.includes('supplier_branches')) {
        refreshSuppliersRealtime();
      }
    }
  });

  window.addEventListener('focus', async () => {
    await setupSuppliersRealtime();
    refreshSuppliersRealtime();
  });

  window.addEventListener('beforeunload', () => {
    if (suppliersRealtimeTimer) {
      clearInterval(suppliersRealtimeTimer);
      suppliersRealtimeTimer = null;
    }
  });

  // Format input for supplier debt limit field
  const nsDebt = document.getElementById('ns_debt');
  if (nsDebt){
    nsDebt.addEventListener('focus', ()=>{
      const n = parseDecimal(nsDebt.value);
      if (!isNaN(n)) nsDebt.value = String(n).replace(/\./g,'.');
    });
    nsDebt.addEventListener('blur', ()=>{
      const n = parseDecimal(nsDebt.value);
      nsDebt.value = formatDecimal(n);
    });
    nsDebt.addEventListener('input', (e)=>{
      let v = e.target.value; v = v.replace(/[^0-9.,٬]/g,'');      e.target.value = v;
    });
  }

  // Karat selector event listener
  const suppliersKaratSelector = document.getElementById('suppliersKaratSelector');
  if (suppliersKaratSelector) {
    suppliersKaratSelector.addEventListener('change', () => {
      loadSuppliersDebt(); // Reload with new karat
    });
  }

  // ===== إدارة التصنيفات =====
  const categoriesModal = document.getElementById('categoriesModal');
  const btnManageCategories = document.getElementById('btnManageCategories');
  const categoriesModalClose = document.getElementById('categoriesModalClose');
  const categoriesModalDone = document.getElementById('categoriesModalDone');
  const categoriesList = document.getElementById('categoriesList');
  const newCategoryName = document.getElementById('newCategoryName');
  const btnAddCategory = document.getElementById('btnAddCategory');
  const categoryError = document.getElementById('categoryError');
  const categorySelect = document.getElementById('ns_category');

  function openCategoriesModal() {
    if (categoriesModal) categoriesModal.setAttribute('aria-hidden', 'false');
    loadCategoriesList();
  }

  function closeCategoriesModal() {
    if (categoriesModal) categoriesModal.setAttribute('aria-hidden', 'true');
    loadCategoryOptions();
  }

  async function loadCategoriesList() {
    if (!categoriesList) return;
    categoriesList.innerHTML = '<p style="text-align:center;color:var(--subtle)">جاري التحميل...</p>';
    
    try {
      if (!window.api || !window.api.invoke) {
        categoriesList.innerHTML = '<p style="text-align:center;color:var(--error)">خطأ في الاتصال</p>';
        return;
      }
      const result = await window.api.invoke('get-categories', { type: 'supplier' });
      if (result && result.success && Array.isArray(result.data)) {
        if (result.data.length === 0) {
          categoriesList.innerHTML = '<p style="text-align:center;color:var(--subtle)">لا توجد تصنيفات بعد. أضف تصنيفاً جديداً.</p>';
          return;
        }
        categoriesList.innerHTML = result.data.map(cat => `
          <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:var(--card);border:1px solid var(--border);border-radius:10px">
            <div style="display:flex;align-items:center;gap:10px">
              <i class="fa-solid fa-tag" style="color:var(--primary)"></i>
              <span style="font-weight:600">${cat.name}</span>
            </div>
            <button type="button" class="icon-btn delete-category-btn" data-id="${cat.id}" title="حذف" style="color:#ef4444">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        `).join('');

        categoriesList.querySelectorAll('.delete-category-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id, 10);
            const name = btn.closest('div').querySelector('span')?.textContent || '';
            showDeleteCategoryConfirm(id, name);
          });
        });
      }
    } catch (err) {
      categoriesList.innerHTML = '<p style="text-align:center;color:var(--error)">خطأ في التحميل</p>';
    }
  }

  async function loadCategoryOptions() {
    if (!categorySelect) return;
    const currentValue = categorySelect.value;
    categorySelect.innerHTML = '<option value="">بدون تصنيف</option>';
    
    try {
      if (!window.api || !window.api.invoke) return;
      const result = await window.api.invoke('get-categories', { type: 'supplier' });
      if (result && result.success && Array.isArray(result.data)) {
        result.data.forEach(cat => {
          const opt = document.createElement('option');
          opt.value = cat.name;
          opt.textContent = cat.name;
          categorySelect.appendChild(opt);
        });
        if (currentValue) categorySelect.value = currentValue;
      }
    } catch (err) {}
  }

  if (btnManageCategories) {
    btnManageCategories.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openCategoriesModal();
    });
  }
  if (categoriesModalClose) {
    categoriesModalClose.addEventListener('click', closeCategoriesModal);
  }
  if (categoriesModalDone) {
    categoriesModalDone.addEventListener('click', closeCategoriesModal);
  }
  if (categoriesModal) {
    const backdrop = categoriesModal.querySelector('.modal-backdrop');
    if (backdrop) backdrop.addEventListener('click', closeCategoriesModal);
  }

  if (btnAddCategory) {
    btnAddCategory.addEventListener('click', async () => {
      const name = newCategoryName?.value.trim();
      if (!name) {
        if (categoryError) {
          categoryError.textContent = 'يرجى إدخال اسم التصنيف';
          categoryError.style.display = 'block';
        }
        return;
      }
      if (categoryError) categoryError.style.display = 'none';
      
      try {
        const res = await window.api.invoke('add-category', { name, type: 'supplier' });
        if (res && res.success) {
          newCategoryName.value = '';
          loadCategoriesList();
        } else {
          if (categoryError) {
            categoryError.textContent = res?.error || 'فشل الإضافة';
            categoryError.style.display = 'block';
          }
        }
      } catch (err) {
        if (categoryError) {
          categoryError.textContent = 'حدث خطأ';
          categoryError.style.display = 'block';
        }
      }
    });
  }

  loadCategoryOptions();

  // ===== مودال تأكيد حذف التصنيف =====
  const deleteCategoryModal = document.getElementById('deleteCategoryModal');
  const deleteCategoryName = document.getElementById('deleteCategoryName');
  const deleteCategoryConfirm = document.getElementById('deleteCategoryConfirm');
  const deleteCategoryCancel = document.getElementById('deleteCategoryCancel');
  const deleteCategoryModalClose = document.getElementById('deleteCategoryModalClose');
  let pendingDeleteCategoryId = null;

  function showDeleteCategoryConfirm(id, name) {
    pendingDeleteCategoryId = id;
    if (deleteCategoryName) deleteCategoryName.textContent = `"${name}"`;
    if (deleteCategoryModal) deleteCategoryModal.setAttribute('aria-hidden', 'false');
  }

  function closeDeleteCategoryModal() {
    if (deleteCategoryModal) deleteCategoryModal.setAttribute('aria-hidden', 'true');
    pendingDeleteCategoryId = null;
  }

  if (deleteCategoryConfirm) {
    deleteCategoryConfirm.addEventListener('click', async () => {
      if (!pendingDeleteCategoryId) return;
      const res = await window.api.invoke('delete-category', { id: pendingDeleteCategoryId, type: 'supplier' });
      closeDeleteCategoryModal();
      if (res && res.success) {
        loadCategoriesList();
      }
    });
  }

  if (deleteCategoryCancel) deleteCategoryCancel.addEventListener('click', closeDeleteCategoryModal);
  if (deleteCategoryModalClose) deleteCategoryModalClose.addEventListener('click', closeDeleteCategoryModal);
  if (deleteCategoryModal) {
    const backdrop = deleteCategoryModal.querySelector('.modal-backdrop');
    if (backdrop) backdrop.addEventListener('click', closeDeleteCategoryModal);
  }
});

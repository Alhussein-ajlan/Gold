 // Removed external PDF libs; we will use printable HTML instead

// ========== Translation System ==========
const CUST_TRANSLATIONS = {
  ar: {
    // Page title
    pageTitle: 'العملاء',
    
    // Toolbar buttons
    btnNewCustomer: 'عميل جديد',
    btnRefresh: 'تحديث',
    btnExportExcel: 'تصدير Excel',
    btnExportPdf: 'PDF',
    
    // Stats cards
    totalCustomers: 'إجمالي العملاء',
    customersAddedThisMonth: '{count} عملاء تم إضافتهم هذا الشهر',
    customersAddedThisWeek: '{count} عملاء تم إضافتهم هذا الأسبوع',
    activeCustomers: 'العملاء النشطون',
    active: 'نشطون',
    inactive: 'غير نشطون',
    customersDebt: 'مديونية العملاء',
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
    customersList: 'قائمة العملاء',
    searchPlaceholder: 'بحث عن عميل...',
    thCustomerId: 'رقم العميل',
    thCustomerName: 'اسم العميل',
    thTaxNo: 'الرقم الضريبي',
    thPhone: 'رقم الهاتف',
    thEmail: 'البريد الإلكتروني',
    thRegion: 'المنطقة',
    thActive: 'نشط',
    thDate: 'التاريخ',
    thDebtLimit: 'سقف المديونية',
    thActions: 'الإجراءات',
    noCustomers: 'لا يوجد عملاء لعرضهم.',
    yes: 'نعم',
    no: 'لا',
    
    // Modal - Add/Edit Customer
    addCustomer: 'إضافة عميل',
    editCustomer: 'تعديل عميل',
    newCustomer: 'عميل جديد',
    basicInfo: 'البيانات الأساسية',
    contactClassification: 'التواصل والتصنيف',
    ounceSettings: 'إعدادات الأونصة والسقف',
    
    // Form fields
    customerId: 'رقم العميل',
    customerIdPlaceholder: 'مثال: 1004',
    customerName: 'اسم العميل',
    customerNamePlaceholder: 'اسم العميل',
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
    accessAllHint: 'سيكون هذا العميل متاحًا في كل الفروع المسموح بها لك.',
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
    branchPickerSelectedHint: 'هذه الفروع التي ستنتمي إليها بطاقة العميل.',
    branchPickerEmpty: 'لم يتم تحديد أي فرع بعد.',
    branchPickerNoResults: 'لا توجد فروع مطابقة لعبارة البحث',
    branchPickerMultipleHint: 'يمكنك اختيار فرع واحد أو عدة فروع من النافذة المنبثقة.',
    branchPickerRemoveBranch: 'إزالة الفرع',
    
    // Ounce settings
    saleOunce: 'أونصة البيع',
    purchaseOunce: 'أونصة الشراء',
    addition: 'زيادة',
    subtraction: 'نقص',
    enable: 'تفعيل',
    ozAdd: 'زيادة',
    ozSub: 'نقص',
    ozEnabled: 'تفعيل',
    debtLimit: 'سقف المديونية',
    debtLimitPlaceholder: 'مثال: 5000',
    
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
    confirmDeleteMessage: 'هل أنت متأكد من أنك تريد حذف هذا العميل؟',
    confirmDeleteCustomer: 'هل أنت متأكد من أنك تريد حذف العميل "{name}"؟',
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
    cannotDeleteCustomer: 'لا يمكن حذف هذا العميل',
    hasLinkedRecords: 'يوجد سجلات مرتبطة بهذا العميل',
    problemDetails: 'تفاصيل المشكلة:',
    tipLabel: 'نصيحة:',
    deleteTip: 'لحذف هذا العميل، يجب عليك أولاً حذف أو تعديل جميع السجلات المرتبطة به.',
    customerLinkedDetails: 'العميل مرتبط بسجلات في (سندات القبض، سندات الصرف، القيود اليومية، الأرصدة الافتتاحية، فواتير البيع، أو الأوردرات). يجب حذف السجلات المرتبطة أولاً قبل حذف العميل.',
    
    // Toast messages
    toastSaved: 'تم الحفظ بنجاح',
    toastDeleted: 'تم الحذف بنجاح',
    toastError: 'حدث خطأ',
    toastCustomerAdded: 'تم إضافة العميل بنجاح',
    toastCustomerUpdated: 'تم تحديث العميل بنجاح',
    
    // Validation messages
    validationRequired: 'هذا الحقل مطلوب',
    validationInvalidEmail: 'البريد الإلكتروني غير صالح',
    validationInvalidPhone: 'رقم الهاتف غير صالح',
    customerNameRequired: 'اسم العميل مطلوب.',
    saveFailed: 'فشل الحفظ:',
    unknownError: 'غير معروف',
    
    // Export/Print
    printTitle: 'قائمة العملاء',
    printPreview: 'معاينة - قائمة العملاء',
    printButton: 'طباعة',
    companyName: 'اسم الشركة:',
    taxNumber: 'الرقم الضريبي:',
    dateTime: 'التاريخ والوقت:',
    previewError: 'تعذّر فتح نافذة المعاينة.',
    
    // Toggle status
    toggleStatus: 'تبديل الحالة'
  },
  en: {
    // Page title
    pageTitle: 'Customers',
    
    // Toolbar buttons
    btnNewCustomer: 'New Customer',
    btnRefresh: 'Refresh',
    btnExportExcel: 'Export Excel',
    btnExportPdf: 'PDF',
    
    // Stats cards
    totalCustomers: 'Total Customers',
    customersAddedThisMonth: '{count} customers added this month',
    customersAddedThisWeek: '{count} customers added this week',
    activeCustomers: 'Active Customers',
    active: 'Active',
    inactive: 'Inactive',
    customersDebt: 'Customers Debt',
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
    customersList: 'Customers List',
    searchPlaceholder: 'Search for customer...',
    thCustomerId: 'Customer ID',
    thCustomerName: 'Customer Name',
    thTaxNo: 'Tax Number',
    thPhone: 'Phone',
    thEmail: 'Email',
    thRegion: 'Region',
    thActive: 'Active',
    thDate: 'Date',
    thDebtLimit: 'Debt Limit',
    thActions: 'Actions',
    noCustomers: 'No customers to display.',
    yes: 'Yes',
    no: 'No',
    
    // Modal - Add/Edit Customer
    addCustomer: 'Add Customer',
    editCustomer: 'Edit Customer',
    newCustomer: 'New Customer',
    basicInfo: 'Basic Information',
    contactClassification: 'Contact & Classification',
    ounceSettings: 'Ounce Settings & Limits',
    
    // Form fields
    customerId: 'Customer ID',
    customerIdPlaceholder: 'e.g.: 1004',
    customerName: 'Customer Name',
    customerNamePlaceholder: 'Customer Name',
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
    accessAllHint: 'This customer will be available in all branches you are allowed to access.',
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
    branchPickerSelectedHint: 'These are the branches this customer card will belong to.',
    branchPickerEmpty: 'No branches selected yet.',
    branchPickerNoResults: 'No branches match your search',
    branchPickerMultipleHint: 'You can select one or more branches from the popup panel.',
    branchPickerRemoveBranch: 'Remove branch',
    
    // Ounce settings
    saleOunce: 'Sale Ounce',
    purchaseOunce: 'Purchase Ounce',
    addition: 'Add',
    subtraction: 'Subtraction',
    enable: 'Enable',
    ozAdd: 'Add',
    ozSub: 'Sub',
    ozEnabled: 'Enable',
    debtLimit: 'Debt Limit',
    debtLimitPlaceholder: 'e.g.: 5000',
    
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
    confirmDeleteMessage: 'Are you sure you want to delete this customer?',
    confirmDeleteCustomer: 'Are you sure you want to delete customer "{name}"?',
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
    cannotDeleteCustomer: 'Cannot delete this customer',
    hasLinkedRecords: 'There are records linked to this customer',
    problemDetails: 'Problem Details:',
    tipLabel: 'Tip:',
    deleteTip: 'To delete this customer, you must first delete or modify all related records.',
    customerLinkedDetails: 'This customer is linked to records in (receipts, payments, journal entries, opening balances, sales invoices, or orders). You must delete the linked records first before deleting the customer.',
    
    // Toast messages
    toastSaved: 'Saved successfully',
    toastDeleted: 'Deleted successfully',
    toastError: 'An error occurred',
    toastCustomerAdded: 'Customer added successfully',
    toastCustomerUpdated: 'Customer updated successfully',
    
    // Validation messages
    validationRequired: 'This field is required',
    validationInvalidEmail: 'Invalid email address',
    validationInvalidPhone: 'Invalid phone number',
    customerNameRequired: 'Customer name is required.',
    saveFailed: 'Save failed:',
    unknownError: 'Unknown',
    
    // Export/Print
    printTitle: 'Customers List',
    printPreview: 'Preview - Customers List',
    printButton: 'Print',
    companyName: 'Company Name:',
    taxNumber: 'Tax Number:',
    dateTime: 'Date & Time:',
    previewError: 'Could not open preview window.',
    
    // Toggle status
    toggleStatus: 'Toggle Status'
  }
};

// Translation helper functions
function getCustomersLang() {
  try {
    return localStorage.getItem('uiLang') === 'en' ? 'en' : 'ar';
  } catch(_) {
    return 'ar';
  }
}

function tCust(key) {
  const lang = getCustomersLang();
  return CUST_TRANSLATIONS[lang]?.[key] || CUST_TRANSLATIONS['ar'][key] || key;
}

// Apply translations to static text elements
function applyCustomersStaticTexts() {
  const lang = getCustomersLang();
  const isRtl = lang === 'ar';
  const dir = isRtl ? 'rtl' : 'ltr';
  
  // Set document direction
  document.documentElement.lang = lang;
  document.documentElement.dir = dir;
  document.body.dir = dir;
  
  // Set table header alignment based on direction
  const tableHeaders = document.querySelectorAll('#customersTable th, #customersTable td');
  tableHeaders.forEach(th => {
    th.style.textAlign = isRtl ? 'right' : 'left';
  });
  
  // Helper to set text content
  const setText = (id, key) => {
    const el = document.getElementById(id);
    if (el) el.textContent = tCust(key);
  };
  
  // Helper to set text with icon (preserves icon element)
  const setTextWithIcon = (id, key, iconClass, iconColor) => {
    const el = document.getElementById(id);
    if (el) {
      el.innerHTML = `<i class="${iconClass}" style="margin-inline-end:8px;color:${iconColor}"></i>${tCust(key)}`;
    }
  };
  
  // Helper to set placeholder
  const setPlaceholder = (id, key) => {
    const el = document.getElementById(id);
    if (el) el.placeholder = tCust(key);
  };
  
  // Toolbar
  setText('btnNewCustomerText', 'btnNewCustomer');
  
  // Stats cards
  setText('totalCustomersTitle', 'totalCustomers');
  setText('activeCustomersTitle', 'activeCustomers');
  setText('activeLabel', 'active');
  setText('inactiveLabel', 'inactive');
  setText('customersDebtTitle', 'customersDebt');
  
  // Karat selector
  const karat24 = document.getElementById('karat24Opt');
  const karat22 = document.getElementById('karat22Opt');
  const karat21 = document.getElementById('karat21Opt');
  const karat18 = document.getElementById('karat18Opt');
  if (karat24) karat24.textContent = tCust('karat24');
  if (karat22) karat22.textContent = tCust('karat22');
  if (karat21) karat21.textContent = tCust('karat21');
  if (karat18) karat18.textContent = tCust('karat18');
  
  // Table section
  setText('customersListTitle', 'customersList');
  setPlaceholder('customersSearch', 'searchPlaceholder');
  
  // Table headers with alignment
  const tableTextAlign = isRtl ? 'right' : 'left';
  const setHeaderText = (id, key) => {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = tCust(key);
      el.style.textAlign = tableTextAlign;
    }
  };
  setHeaderText('th_customerId', 'thCustomerId');
  setHeaderText('th_customerName', 'thCustomerName');
  setHeaderText('th_taxNo', 'thTaxNo');
  setHeaderText('th_phone', 'thPhone');
  setHeaderText('th_email', 'thEmail');
  setHeaderText('th_region', 'thRegion');
  setHeaderText('th_active', 'thActive');
  setHeaderText('th_date', 'thDate');
  setHeaderText('th_debtLimit', 'thDebtLimit');
  setHeaderText('th_actions', 'thActions');
  
  // Modal title (Add Customer)
  setText('modalTitle', 'addCustomer');
  
  // Button tooltips
  const btnRefresh = document.getElementById('btnRefreshCustomers');
  const btnExcel = document.getElementById('btnExportExcel');
  const btnPdf = document.getElementById('btnExportPdf');
  if (btnRefresh) btnRefresh.title = tCust('btnRefresh');
  if (btnExcel) btnExcel.title = tCust('btnExportExcel');
  if (btnPdf) btnPdf.title = tCust('btnExportPdf');
  
  // Modal - Add/Edit Customer (with icons)
  setTextWithIcon('basicInfoHeader', 'basicInfo', 'fa-solid fa-user-circle', '#3b82f6');
  setTextWithIcon('contactHeader', 'contactClassification', 'fa-solid fa-address-book', '#8b5cf6');
  setTextWithIcon('ounceSettingsHeader', 'ounceSettings', 'fa-solid fa-sliders', '#f59e0b');
  
  // Form fields
  setText('field_customerId', 'customerId');
  setText('field_customerName', 'customerName');
  setText('field_taxNo', 'taxNo');
  setText('field_phone', 'phone');
  setText('field_email', 'email');
  setText('field_region', 'region');
  setText('field_classification', 'classification');
  setText('field_branchAccess', 'branchAccess');
  setText('field_branchSingle', 'branch');
  setText('field_branchMulti', 'allowedBranches');
  setText('field_date', 'date');
  setText('nc_branch_picker_title', 'branchPickerTitle');
  setText('nc_branch_multi_select_all', 'branchPickerSelectAll');
  setText('nc_branch_multi_clear', 'branchPickerClearAll');
  setText('nc_branch_picker_done_text', 'branchPickerDone');
  setPlaceholder('nc_branch_multi_search', 'branchPickerSearchPlaceholder');
  const branchPickerCloseEl = document.getElementById('nc_branch_picker_modal_close');
  if (branchPickerCloseEl) branchPickerCloseEl.setAttribute('aria-label', tCust('btnClose'));
  const branchScopeEl = document.getElementById('nc_branch_scope');
  if (branchScopeEl) {
    const singleOption = branchScopeEl.querySelector('option[value="single"]');
    const multipleOption = branchScopeEl.querySelector('option[value="multiple"]');
    const allOption = branchScopeEl.querySelector('option[value="all"]');
    if (singleOption) singleOption.textContent = tCust('accessSingleBranch');
    if (multipleOption) multipleOption.textContent = tCust('accessMultipleBranches');
    if (allOption) allOption.textContent = tCust('accessAllBranches');
  }
  if (typeof window.updateCustomerBranchScopeControls === 'function') {
    window.updateCustomerBranchScopeControls();
  }
  
  // Ounce settings
  setText('saleOunceHeader', 'saleOunce');
  setText('purchaseOunceHeader', 'purchaseOunce');
  setText('debtLimitHeader', 'debtLimit');
  
  // Ounce labels (زيادة/نقص/تفعيل)
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
  setText('confirmDelYesText', 'confirmYes');
  setText('confirmDelNoText', 'confirmNo');
  
  // Input placeholders
  const ncId = document.getElementById('nc_id');
  const ncName = document.getElementById('nc_name');
  const ncTax = document.getElementById('nc_tax');
  const ncPhone = document.getElementById('nc_phone');
  const ncEmail = document.getElementById('nc_email');
  const ncRegion = document.getElementById('nc_region');
  const ncDebt = document.getElementById('nc_debt');
  
  if (ncId) ncId.placeholder = tCust('customerIdPlaceholder');
  if (ncName) ncName.placeholder = tCust('customerNamePlaceholder');
  if (ncTax) ncTax.placeholder = tCust('taxNoPlaceholder');
  if (ncPhone) ncPhone.placeholder = tCust('phonePlaceholder');
  if (ncEmail) ncEmail.placeholder = tCust('emailPlaceholder');
  if (ncRegion) ncRegion.placeholder = tCust('regionPlaceholder');
  if (ncDebt) ncDebt.placeholder = tCust('debtLimitPlaceholder');
  
  // Category select first option
  const ncCategory = document.getElementById('nc_category');
  if (ncCategory && ncCategory.options.length > 0) {
    ncCategory.options[0].textContent = tCust('noClassification');
  }
  
  // Categories modal
  setText('categoriesModalTitle', 'categoriesManagement');
  setText('availableCategoriesLabel', 'availableCategories');
  setText('addNewCategoryLabel', 'addNewCategory');
  setText('btnAddCategoryText', 'btnAdd');
  setText('categoriesModalDoneText', 'btnDone');
  
  // Delete category modal
  setText('deleteCategoryMsg', 'deleteCategoryMessage');
  setText('deleteCategoryCancelText', 'btnCancel');
  setText('deleteCategoryConfirmText', 'btnDelete');
  
  // Category name placeholder
  const newCatInput = document.getElementById('newCategoryName');
  if (newCatInput) newCatInput.placeholder = tCust('categoryNamePlaceholder');
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
  const lang = getCustomersLang();
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
            <span id="deleteErrorTitle">${tCust('deleteFailed')}</span>
          </h3>
          <button class="icon-btn" id="deleteErrorClose" aria-label="${tCust('btnClose')}" style="color:white">
            <i class="fa-regular fa-circle-xmark"></i>
          </button>
        </div>
        <div class="modal-body" style="padding:24px 20px">
          <div id="deleteErrorContent"></div>
        </div>
        <div class="modal-footer" style="padding:12px 20px">
          <button class="btn primary" id="deleteErrorOk" style="width:100%; background:linear-gradient(135deg, var(--primary), var(--primary-600)); border:none; display:flex; align-items:center; justify-content:center; gap:8px">
            <i class="fa-regular fa-circle-check"></i> <span>${tCust('btnOk')}</span>
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
  if (titleEl) titleEl.textContent = tCust('deleteFailed');
  const okBtnSpan = errorModal.querySelector('#deleteErrorOk span');
  if (okBtnSpan) okBtnSpan.textContent = tCust('btnOk');
  
  // Translation mapping for common database response texts
  const errorTranslations = {
    'لا يمكن حذف هذا العميل': tCust('cannotDeleteCustomer'),
    'تعذّر حذف العميل': tCust('cannotDeleteCustomer'),
    'يوجد سجلات مرتبطة بهذا العميل': tCust('hasLinkedRecords'),
  };
  
  // Details translation mapping
  const detailsTranslations = {
    'العميل مرتبط بسجلات في (سندات القبض، سندات الصرف، القيود اليومية، الأرصدة الافتتاحية، فواتير البيع، أو الأوردرات). يجب حذف السجلات المرتبطة أولاً قبل حذف العميل.': tCust('customerLinkedDetails'),
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
  const error = response && response.error ? translateText(response.error) : tCust('cannotDeleteCustomer');
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
            <h5 style="margin:0 0 8px 0; font-size:14px; font-weight:700; color:var(--text)">${tCust('problemDetails')}</h5>
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
          <strong>${tCust('tipLabel')}</strong> ${tCust('deleteTip')}
        </p>
      </div>
    </div>
  `;
  
  content.innerHTML = html;
  errorModal.setAttribute('aria-hidden', 'false');
}

document.addEventListener('DOMContentLoaded', async () => {
    // ✅ Apply translations
    applyCustomersStaticTexts();
    
    // ✅ Initialize screen permissions
    if (window.ScreenPermissions) {
        await window.ScreenPermissions.init();
    }

    // --- Tab Switching Logic ---
    const tabs = document.querySelectorAll('.sidebar .tab');
    const panels = document.querySelectorAll('.tab-panels .panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Deactivate all tabs and panels
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            // Activate the clicked tab and its corresponding panel
            tab.classList.add('active');
            const targetPanelId = tab.getAttribute('aria-controls');
            const targetPanel = document.getElementById(targetPanelId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }

    // Enforce digits-only for inputs marked with data-digits-only
    document.addEventListener('input', (e)=>{
        const t = e.target;
        if (!(t instanceof HTMLInputElement)) return;
        if (t.hasAttribute('data-digits-only')){
            const cur = t.value || '';
            const cleaned = cur.replace(/\D+/g,'');
            if (cur !== cleaned) t.value = cleaned;
        }
    });
        });
    });

    // Theme: rely on global theme-loader.js (localStorage.appTheme)
    try {
        if (window.loadAppTheme) {
            window.loadAppTheme();
        }
    } catch (e) {}

    // --- Logout Logic ---
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // In a real app, you would clear tokens and notify the main process
            window.location.href = '../login/index.html'; // Simple redirect for now
        });
    }

    // Clear customer table on load (since we have no DB connection)
    // --- Customer Data Logic ---
    const customerTbody = document.querySelector('#customers-grid .table tbody');
    let customersCache = [];
    const CUSTOMER_KNOWN_IDS_KEY = 'customersKnownIds_v1';
    let customersRealtimeTimer = null;
    let customersRefreshInFlight = false;
    let customersCloudModeActive = false;

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
            const allowedBranchIds = normalizeCustomerBranchIdList(
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

    function getWritableCustomerBranchId() {
        const currentBranch = getStoredCurrentBranchContext();
        const scopeState = getStoredBranchScopeState();
        return Number(currentBranch?.id || scopeState.branchId || 0) || null;
    }

    function getCustomerRecordBranchId(customer) {
        return Number(customer?.effective_branch_id || customer?.branch_id || getWritableCustomerBranchId() || 0) || null;
    }

    function normalizeCustomerBranchIdList(values = []) {
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
            const runtimeAllowedBranchIds = normalizeCustomerBranchIdList(
                Array.isArray(window.currentBranchScopeContext?.allowedBranchIds)
                    ? window.currentBranchScopeContext.allowedBranchIds
                    : (Array.isArray(window.currentBranchScopeContext?.allowed_branch_ids) ? window.currentBranchScopeContext.allowed_branch_ids : [])
            );
            const currentUser = getStoredCurrentUser();
            const values = normalizeCustomerBranchIdList(Array.isArray(currentUser?.allowed_branch_ids) ? currentUser.allowed_branch_ids : []);
            const merged = normalizeCustomerBranchIdList([
                ...runtimeAllowedBranchIds,
                ...normalizeCustomerBranchIdList(scopeState?.allowedBranchIds),
                ...values,
            ]);
            if (merged.length) {
                return merged;
            }
        } catch (_) {
        }
        const fallbackBranchId = Number(getStoredCurrentBranchContext()?.id || getWritableCustomerBranchId() || 0) || null;
        return fallbackBranchId ? [fallbackBranchId] : [];
    }

    function escapeCustomerBranchHtml(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function parseBranchIdsCsv(value) {
        return normalizeCustomerBranchIdList(
            String(value || '')
                .split(',')
                .map(part => Number(String(part || '').trim() || 0))
        );
    }

    let customerBranchOptionsCache = [];
    let customerBranchPickerSelectedIds = [];
    let customerBranchPickerQuery = '';
    let customerBranchPickerOpen = false;

    async function loadAvailableCustomerBranches(forceFresh = false) {
        const allowedBranchIds = getAllowedBranchIdsFromStoredUser();
        if (window.branches && typeof window.branches.getBranches === 'function') {
            const result = await window.branches.getBranches(forceFresh ? { activeOnly: true, forceFresh: true } : { activeOnly: true });
            const rows = result?.success && Array.isArray(result.data) ? result.data : [];
            customerBranchOptionsCache = rows
                .map(branch => ({
                    ...branch,
                    id: Number(branch?.id || 0) || 0,
                    code: String(branch?.code || '').trim(),
                    name: String(branch?.name || '').trim(),
                }))
                .filter(branch => branch.id > 0 && (!allowedBranchIds.length || allowedBranchIds.includes(branch.id)));
        }
        if (!customerBranchOptionsCache.length) {
            const currentBranch = getStoredCurrentBranchContext();
            const fallbackId = Number(currentBranch?.id || getWritableCustomerBranchId() || 0) || null;
            customerBranchOptionsCache = fallbackId ? [{
                id: fallbackId,
                code: String(currentBranch?.code || '').trim(),
                name: String(currentBranch?.name || '').trim(),
            }] : [];
        }
        return customerBranchOptionsCache;
    }

    function getCustomerAccessMode(customer) {
        const rawMode = String(customer?.access_scope || '').trim().toLowerCase();
        if (rawMode === 'all') return 'all';
        const branchCount = Number(customer?.branch_count || 0) || 0;
        const selectedBranchIds = parseBranchIdsCsv(customer?.branch_ids_csv);
        if (rawMode === 'multiple' || branchCount > 1 || selectedBranchIds.length > 1) {
            return 'multiple';
        }
        return 'single';
    }

    function getCustomerBranchLabel(customer) {
        const accessMode = getCustomerAccessMode(customer);
        if (accessMode === 'all') {
            return tCust('allBranches');
        }
        if (accessMode === 'multiple') {
            const codes = String(customer?.branch_codes || '').trim();
            const names = String(customer?.branch_names || '').trim();
            return codes || names || '';
        }
        const code = String(customer?.branch_code || '').trim();
        const name = String(customer?.branch_name || '').trim();
        if (code && name) return `${code} - ${name}`;
        return name || code || '';
    }

    function getCustomerDisplayName(customer) {
        const branchLabel = isAllBranchesMode() ? getCustomerBranchLabel(customer) : '';
        return branchLabel ? `${customer?.name || ''} (${branchLabel})` : (customer?.name || '');
    }

    function getCustomerBranchPickerRefs() {
        return {
            pickerEl: document.getElementById('nc_branch_picker'),
            scopeEl: document.getElementById('nc_branch_scope'),
            singleEl: document.getElementById('nc_branch_single'),
            triggerEl: document.getElementById('nc_branch_picker_trigger'),
            modalEl: document.getElementById('nc_branch_picker_modal'),
            modalCloseEl: document.getElementById('nc_branch_picker_modal_close'),
            titleEl: document.getElementById('nc_branch_picker_title'),
            listEl: document.getElementById('nc_branch_multi_list'),
            summaryEl: document.getElementById('nc_branch_multi_summary'),
            selectedEl: document.getElementById('nc_branch_multi_selected'),
            searchEl: document.getElementById('nc_branch_multi_search'),
            selectAllBtn: document.getElementById('nc_branch_multi_select_all'),
            clearBtn: document.getElementById('nc_branch_multi_clear'),
            doneBtn: document.getElementById('nc_branch_picker_done'),
        };
    }

    function getCustomerBranchLabelText(branch) {
        const code = String(branch?.code || '').trim();
        const name = String(branch?.name || '').trim();
        return code && name ? `${code} - ${name}` : (name || code || String(branch?.id || ''));
    }

    function getCustomerBranchMetaText(branch) {
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

    function getCustomerBranchPreviewText(branches = []) {
        const previewLabels = branches.slice(0, 2).map((branch) => {
            const name = String(branch?.name || branch?.name_en || '').trim();
            const code = String(branch?.code || '').trim();
            if (name && code) {
                return `${name} (${code})`;
            }
            return name || code || `#${branch?.id || ''}`;
        }).filter(Boolean);
        const hiddenCount = Math.max(branches.length - previewLabels.length, 0);
        const separator = getCustomersLang() === 'en' ? ', ' : '، ';
        return `${previewLabels.join(separator)}${hiddenCount ? ` +${hiddenCount}` : ''}`.trim();
    }

    function getOrderedCustomerBranchIds(values = customerBranchPickerSelectedIds) {
        const selectedSet = new Set(normalizeCustomerBranchIdList(values));
        return customerBranchOptionsCache
            .map(branch => Number(branch?.id || 0) || 0)
            .filter(id => id > 0 && selectedSet.has(id));
    }

    function setCustomerBranchPickerOpen(isOpen) {
        const { pickerEl, triggerEl, modalEl, searchEl } = getCustomerBranchPickerRefs();
        customerBranchPickerOpen = !!isOpen;
        if (pickerEl) {
            pickerEl.dataset.open = customerBranchPickerOpen ? 'true' : 'false';
        }
        if (triggerEl) {
            triggerEl.setAttribute('aria-expanded', customerBranchPickerOpen ? 'true' : 'false');
        }
        if (modalEl) {
            modalEl.setAttribute('aria-hidden', customerBranchPickerOpen ? 'false' : 'true');
        }
        if (customerBranchPickerOpen && searchEl) {
            setTimeout(() => searchEl.focus(), 0);
        }
    }

    function renderCustomerBranchPicker() {
        const { pickerEl, listEl, summaryEl, selectedEl, searchEl, selectAllBtn, clearBtn } = getCustomerBranchPickerRefs();
        if (!pickerEl || !listEl || !summaryEl || !selectedEl) {
            return;
        }

        customerBranchPickerSelectedIds = getOrderedCustomerBranchIds(customerBranchPickerSelectedIds);
        const totalCount = customerBranchOptionsCache.length;
        const selectedBranches = customerBranchOptionsCache.filter(branch => customerBranchPickerSelectedIds.includes(branch.id));
        const summaryTitle = selectedBranches.length
            ? (selectedBranches.length === 1 ? tCust('branchPickerTriggerTitleSingle') : tCust('branchPickerTriggerTitleMultiple'))
            : tCust('branchPickerTriggerTitleEmpty');
        const summaryText = selectedBranches.length
            ? getCustomerBranchPreviewText(selectedBranches)
            : tCust('branchPickerTriggerHintEmpty');
        const query = String(customerBranchPickerQuery || '').trim().toLowerCase();
        const visibleBranches = customerBranchOptionsCache.filter((branch) => {
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

        if (searchEl && searchEl.value !== customerBranchPickerQuery) {
            searchEl.value = customerBranchPickerQuery;
        }

        summaryEl.innerHTML = `
            <span class="branch-picker-summary-icon" aria-hidden="true"><i class="fa-solid fa-code-branch"></i></span>
            <div class="branch-picker-summary-copy">
                <strong>${escapeCustomerBranchHtml(summaryTitle)}</strong>
                <span class="branch-picker-summary-preview">${escapeCustomerBranchHtml(summaryText)}</span>
            </div>
            <span class="branch-picker-count">${customerBranchPickerSelectedIds.length}</span>
        `;

        selectedEl.innerHTML = selectedBranches.length
            ? `
                <div class="branch-picker-selected-head">
                    <div class="branch-picker-selected-copy">
                        <strong>${escapeCustomerBranchHtml(tCust('branchPickerSelectedTitle'))}</strong>
                        <span>${escapeCustomerBranchHtml(tCust('branchPickerSelectedHint'))}</span>
                    </div>
                    <span class="branch-picker-selected-badge">${selectedBranches.length}</span>
                </div>
                <div class="branch-picker-selected-chips">
                    ${selectedBranches.map((branch) => `
                        <button type="button" class="branch-picker-chip" data-branch-remove="${branch.id}" title="${escapeCustomerBranchHtml(tCust('branchPickerRemoveBranch'))}: ${escapeCustomerBranchHtml(getCustomerBranchLabelText(branch))}">
                            <span class="branch-picker-chip-code">${escapeCustomerBranchHtml(String(branch?.code || `#${branch.id}`))}</span>
                            <span class="branch-picker-chip-name">${escapeCustomerBranchHtml(String(branch?.name || branch?.name_en || `فرع ${branch.id}`))}</span>
                            <i class="fa-solid fa-xmark" aria-hidden="true"></i>
                        </button>
                    `).join('')}
                </div>
            `
            : `<div class="branch-picker-empty-inline">${escapeCustomerBranchHtml(tCust('branchPickerEmpty'))}</div>`;

        listEl.innerHTML = visibleBranches.length
            ? visibleBranches.map((branch) => {
                const selected = customerBranchPickerSelectedIds.includes(branch.id);
                const branchName = String(branch?.name || branch?.name_en || `فرع ${branch.id}`);
                const branchCode = String(branch?.code || `#${branch.id}`);
                return `
                    <label class="branch-picker-option ${selected ? 'is-selected' : ''}" data-branch-id="${branch.id}">
                        <input type="checkbox" class="nc-branch-multi-item" value="${branch.id}" ${selected ? 'checked' : ''}>
                        <span class="branch-picker-option-check"><i class="fa-solid fa-check" aria-hidden="true"></i></span>
                        <span class="branch-picker-option-body">
                            <span class="branch-picker-option-head">
                                <span class="branch-picker-option-name">${escapeCustomerBranchHtml(branchName)}</span>
                                <span class="branch-picker-option-code">${escapeCustomerBranchHtml(branchCode)}</span>
                            </span>
                            <span class="branch-picker-option-meta">${escapeCustomerBranchHtml(getCustomerBranchMetaText(branch))}</span>
                        </span>
                    </label>
                `;
            }).join('')
            : `
                <div class="branch-picker-empty-state">
                    <i class="fa-solid fa-magnifying-glass-location" aria-hidden="true"></i>
                    <span>${escapeCustomerBranchHtml(tCust('branchPickerNoResults'))}</span>
                </div>
            `;

        if (selectAllBtn) {
            selectAllBtn.disabled = totalCount === 0 || customerBranchPickerSelectedIds.length === totalCount;
        }
        if (clearBtn) {
            clearBtn.disabled = customerBranchPickerSelectedIds.length === 0;
        }
        pickerEl.dataset.hasSelection = customerBranchPickerSelectedIds.length ? 'true' : 'false';
        pickerEl.dataset.open = customerBranchPickerOpen ? 'true' : 'false';
    }

    function updateCustomerBranchScopeControls() {
        const { pickerEl, scopeEl, singleEl } = getCustomerBranchPickerRefs();
        const singleWrap = document.getElementById('nc_branch_single_wrap');
        const multiWrap = document.getElementById('nc_branch_multi_wrap');
        const hintEl = document.getElementById('nc_branch_hint');
        const availableCount = customerBranchOptionsCache.length;
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
            const singleBranchId = Number(singleEl?.value || customerBranchPickerSelectedIds[0] || customerBranchOptionsCache[0]?.id || 0) || null;
            customerBranchPickerSelectedIds = singleBranchId ? [singleBranchId] : [];
            if (singleEl && singleBranchId) {
                singleEl.value = String(singleBranchId);
            }
        } else if (mode === 'multiple') {
            if (!customerBranchPickerSelectedIds.length) {
                const fallbackBranchId = Number(singleEl?.value || customerBranchOptionsCache[0]?.id || 0) || null;
                customerBranchPickerSelectedIds = fallbackBranchId ? [fallbackBranchId] : [];
            }
            customerBranchPickerSelectedIds = getOrderedCustomerBranchIds(customerBranchPickerSelectedIds);
            if (singleEl && customerBranchPickerSelectedIds.length) {
                singleEl.value = String(customerBranchPickerSelectedIds[0]);
            }
        }
        if (pickerEl) {
            pickerEl.dataset.mode = mode;
        }
        if (mode !== 'multiple') {
            setCustomerBranchPickerOpen(false);
        }
        if (singleWrap) singleWrap.style.display = mode === 'single' ? '' : 'none';
        if (multiWrap) multiWrap.style.display = mode === 'multiple' ? '' : 'none';
        if (hintEl) {
            const text = mode === 'all'
                ? tCust('accessAllHint')
                : (mode === 'multiple' ? tCust('branchPickerMultipleHint') : '');
            hintEl.textContent = text;
            hintEl.style.display = text ? 'block' : 'none';
        }
        renderCustomerBranchPicker();
    }
    window.updateCustomerBranchScopeControls = updateCustomerBranchScopeControls;

    async function populateCustomerBranchAccessControls(options = {}) {
        const customer = options?.customer || null;
        await loadAvailableCustomerBranches(!!options?.forceFresh);
        const { scopeEl, singleEl, listEl, searchEl } = getCustomerBranchPickerRefs();
        if (!scopeEl || !singleEl || !listEl) return;

        singleEl.innerHTML = customerBranchOptionsCache.map(branch => `
            <option value="${branch.id}">${escapeCustomerBranchHtml(getCustomerBranchLabelText(branch))}</option>
        `).join('');

        const availableBranchIds = customerBranchOptionsCache.map(branch => Number(branch?.id || 0)).filter(id => id > 0);
        const requestedSelectedBranchIds = customer
            ? (parseBranchIdsCsv(customer?.branch_ids_csv).length
                ? parseBranchIdsCsv(customer?.branch_ids_csv)
                : (getCustomerRecordBranchId(customer) ? [getCustomerRecordBranchId(customer)] : []))
            : (getWritableCustomerBranchId() ? [getWritableCustomerBranchId()] : (customerBranchOptionsCache[0] ? [customerBranchOptionsCache[0].id] : []));
        const selectedBranchIds = normalizeCustomerBranchIdList(requestedSelectedBranchIds).filter(id => availableBranchIds.includes(id));
        const mode = customer ? getCustomerAccessMode(customer) : 'single';
        scopeEl.value = mode;
        const primaryBranchId = selectedBranchIds[0] || customerBranchOptionsCache[0]?.id || '';
        singleEl.value = String(primaryBranchId || '');
        customerBranchPickerSelectedIds = selectedBranchIds.length
            ? getOrderedCustomerBranchIds(selectedBranchIds)
            : (primaryBranchId ? [Number(primaryBranchId)] : []);
        customerBranchPickerQuery = '';
        if (searchEl) {
            searchEl.value = '';
        }
        updateCustomerBranchScopeControls();
    }

    function buildCustomerBranchAccessPayload() {
        const { scopeEl, singleEl } = getCustomerBranchPickerRefs();
        const availableBranchIds = customerBranchOptionsCache.map(branch => Number(branch?.id || 0)).filter(id => Number.isFinite(id) && id > 0);
        let mode = String(scopeEl?.value || 'single').trim().toLowerCase();
        if (!['single', 'multiple', 'all'].includes(mode)) mode = 'single';
        if (availableBranchIds.length <= 1) {
            mode = 'single';
        }
        if (mode === 'all') {
            return {
                accessScope: 'all',
                branchId: Number(singleEl?.value || availableBranchIds[0] || getWritableCustomerBranchId() || 0) || null,
                branchIds: [],
            };
        }
        const branchIds = mode === 'multiple'
            ? getOrderedCustomerBranchIds(customerBranchPickerSelectedIds).filter(id => availableBranchIds.includes(id))
            : [Number(singleEl?.value || 0)].filter(id => Number.isFinite(id) && id > 0);
        if (mode === 'single' && !branchIds.length) {
            throw new Error(tCust('branchRequired'));
        }
        if (mode === 'multiple' && !branchIds.length) {
            throw new Error(tCust('atLeastOneBranchRequired'));
        }
        return {
            accessScope: mode,
            branchId: branchIds[0] || Number(singleEl?.value || availableBranchIds[0] || getWritableCustomerBranchId() || 0) || null,
            branchIds,
        };
    }

    function readKnownCustomerIds() {
        try {
            const raw = localStorage.getItem(CUSTOMER_KNOWN_IDS_KEY);
            if (!raw) return [];
            const parsed = JSON.parse(raw);
            if (!Array.isArray(parsed)) return [];
            return parsed.map(id => Number(id)).filter(id => Number.isFinite(id) && id > 0);
        } catch (_) {
            return [];
        }
    }

    function writeKnownCustomerIds(ids) {
        try {
            const unique = Array.from(new Set((ids || []).map(id => Number(id)).filter(id => Number.isFinite(id) && id > 0)));
            localStorage.setItem(CUSTOMER_KNOWN_IDS_KEY, JSON.stringify(unique));
        } catch (_) {}
    }

    function notifyCustomerAddedByOtherUser(newIds) {
        // Intentionally no in-screen popup.
        // Global shell top toast handles cross-user notifications.
        if (!Array.isArray(newIds) || newIds.length === 0) return;
    }

    function updateKnownCustomersAndNotify(rows, notifyOnNew = false) {
        const currentIds = (rows || []).map(c => Number(c?.id)).filter(id => Number.isFinite(id) && id > 0);
        const known = new Set(readKnownCustomerIds());
        const newIds = currentIds.filter(id => !known.has(id));
        if (notifyOnNew && newIds.length > 0) {
            notifyCustomerAddedByOtherUser(newIds);
        }
        writeKnownCustomerIds(currentIds);
    }

    // Format date to Gregorian (en-GB: dd/mm/yyyy)
    function formatDate(value){
        if (!value) return '';
        const d = new Date(value);
        if (isNaN(d)) return String(value);
        return d.toLocaleDateString('en-GB');
    }

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

    function renderCustomers(customers) {
        if (!customerTbody) return;
        customerTbody.innerHTML = ''; // Clear existing rows

        if (customers.length === 0) {
            customerTbody.innerHTML = `<tr><td colspan="10" style="text-align: center; padding: 20px;">${tCust('noCustomers')}</td></tr>`;
            return;
        }

        const editTitle = tCust('btnEdit');
        const deleteTitle = tCust('btnDelete');
        const toggleTitle = tCust('toggleStatus');
        const lang = getCustomersLang();
        const textAlign = lang === 'ar' ? 'right' : 'left';
        const showBranchLabel = isAllBranchesMode();

        for (const customer of customers) {
            const branchLabel = showBranchLabel ? getCustomerBranchLabel(customer) : '';
            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="text-align:${textAlign}">${customer.id}</td>
                <td style="text-align:${textAlign}">${customer.name}${branchLabel ? `<div style="font-size:11px;color:var(--subtle);margin-top:4px">${branchLabel}</div>` : ''}</td>
                <td style="text-align:${textAlign}">${customer.tax_no || ''}</td>
                <td style="text-align:${textAlign}">${customer.phone || ''}</td>
                <td style="text-align:${textAlign}">${customer.email || ''}</td>
                <td style="text-align:${textAlign}">${customer.region || ''}</td>
                <td style="text-align:center">
                    <label class="switch" title="${toggleTitle}">
                        <input type="checkbox" ${customer.active ? 'checked' : ''} disabled>
                        <span class="slider"></span>
                    </label>
                </td>
                <td style="text-align:${textAlign}">${formatDate(customer.created_at)}</td>
                <td style="text-align:${textAlign}">${formatDecimal(customer.debt_limit)}</td>
                <td class="row" style="text-align:center">
                    <button class="icon-btn act-edit" title="${editTitle}" data-id="${customer.id}"><i class="fa-solid fa-pen"></i></button>
                    <button class="icon-btn act-delete" title="${deleteTitle}" data-id="${customer.id}"><i class="fa-solid fa-xmark"></i></button>
                </td>
            `;
            customerTbody.appendChild(row);
        }
    }

    async function refreshCustomersRealtime(notifyOnNew = true) {
        if (customersRefreshInFlight) return;
        customersRefreshInFlight = true;
        try {
            await loadCustomers({ forceFresh: true, notifyOnNew });
            await applyCurrentFilter();
        } finally {
            customersRefreshInFlight = false;
        }
    }

    async function refreshCustomersCloudModeState() {
        try {
            const api = window.api || window.cloudDatabase || window.parent?.api || window.top?.api;
            if (api && typeof api.getCloudMode === 'function') {
                const result = await api.getCloudMode();
                customersCloudModeActive = !!(result && result.success && result.activeMode === true);
                return customersCloudModeActive;
            }
        } catch (_) {}
        customersCloudModeActive = false;
        return false;
    }

    async function setupCustomersRealtime() {
        await refreshCustomersCloudModeState();
        if (customersRealtimeTimer) {
            clearInterval(customersRealtimeTimer);
            customersRealtimeTimer = null;
        }
        if (!customersCloudModeActive) {
            customersRealtimeTimer = setInterval(() => {
                refreshCustomersRealtime(true);
            }, 15000);
        }
    }

    // Wait helper for window.db readiness (because iframe scripts may run before shell injects APIs)
    async function waitForDb(maxTries = 25, delayMs = 120){
        for (let i=0;i<maxTries;i++){
            if (window.db && typeof window.db.getCustomers === 'function') return true;
            await new Promise(r=>setTimeout(r, delayMs));
        }
        return false;
    }

    // Load customers debt - تحميل مديونية العملاء
    async function loadCustomersDebt() {
        try {
            if (window.db && window.db.getCustomersDebt){
                const result = await window.db.getCustomersDebt();
                if (result && result.success){
                    const nfEn = new Intl.NumberFormat('en-US', { 
                        minimumFractionDigits: 2, 
                        maximumFractionDigits: 2 
                    });
                    
                    // Get selected karat from combobox
                    const karatSelector = document.getElementById('customersKaratSelector');
                    const selectedKarat = karatSelector ? parseFloat(karatSelector.value) : 21;
                    
                    const cashEl = document.getElementById('customersDebtCash');
                    const goldEl = document.getElementById('customersDebtGold');
                    
                    // Gold balance is in karat 21, convert to selected karat
                    const goldBalance21 = parseFloat(result.gold || 0);
                    const goldBalanceConverted = goldBalance21 * (21 / selectedKarat);
                    
                    if (cashEl) {
                        const balance = parseFloat(result.cash || 0);
                        // balance موجب = العميل مدين (عليه - يدفع لنا)
                        // balance سالب = العميل دائن (له - ندفع له)
                        const statusLabel = balance > 0 ? tCust('debtors') + ' ' : balance < 0 ? tCust('creditors') + ' ' : '';
                        const statusColor = balance > 0 ? '#f44336' : balance < 0 ? '#4caf50' : '#666';
                        
                        cashEl.innerHTML = `<span style="color:${statusColor}">${statusLabel}<span class="animated-number">0.00</span></span> <span style="color:#666; font-size:13px">${tCust('riyal')}</span>`;
                        
                        // Animate number
                        setTimeout(() => {
                            const numberSpan = cashEl.querySelector('.animated-number');
                            animateValue(numberSpan, prevCashDebt, Math.abs(balance));
                            prevCashDebt = Math.abs(balance);
                        }, 16);
                    }
                    
                    if (goldEl) {
                        // balance موجب = العميل مدين (عليه - يدفع لنا)
                        // balance سالب = العميل دائن (له - ندفع له)
                        const statusLabel = goldBalanceConverted > 0 ? tCust('debtors') + ' ' : goldBalanceConverted < 0 ? tCust('creditors') + ' ' : '';
                        const statusColor = goldBalanceConverted > 0 ? '#f44336' : goldBalanceConverted < 0 ? '#4caf50' : '#666';
                        
                        const karatLabel = selectedKarat === 24 ? tCust('pureGold') : `${tCust('goldKarat')} ${selectedKarat}`;
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

    async function loadCustomers(options = {}) {
        const forceFresh = !!options.forceFresh;
        const notifyOnNew = !!options.notifyOnNew;
        if (!window.db || !window.db.getCustomers){
            const ok = await waitForDb();
            if (!ok){  return; }
        }
        const result = await window.db.getCustomers(forceFresh ? { forceFresh: true } : undefined);
        if (result.success) {
            const rows = result.data || [];
            updateKnownCustomersAndNotify(rows, notifyOnNew);
            customersCache = rows;
            renderCustomers(rows);
            const totalCustomersValue = document.getElementById('totalCustomersValue');
            if(totalCustomersValue) totalCustomersValue.textContent = rows.length;
            // Fetch stats for month/week
            try {
                if (window.db && window.db.getCustomersStats){
                    const s = await window.db.getCustomersStats();
                    if (s && s.success){
                        const m = document.getElementById('totalCustomersMonth');
                        const w = document.getElementById('totalCustomersWeek');
                        const monthBar = document.getElementById('monthBar');
                        const weekBar = document.getElementById('weekBar');
                        if (m) m.textContent = tCust('customersAddedThisMonth').replace('{count}', s.month);
                        if (w) w.textContent = tCust('customersAddedThisWeek').replace('{count}', s.week);
                        // Simple progress approximation: ratio to total (fallback)
                        const total = s.total || rows.length || 1;
                        const monthPct = Math.min(100, Math.round((s.month/total)*100));
                        const weekPct  = Math.min(100, Math.round((s.week/total)*100));
                        if (monthBar) monthBar.style.width = monthPct + '%';
                        if (weekBar) weekBar.style.width = weekPct + '%';
                        if (totalCustomersValue) totalCustomersValue.textContent = s.total;
                    }
                }
            } catch(_) {}
            // Update active/inactive stats if present
            const activeEl = document.getElementById('activeCustomersValue');
            const inactiveEl = document.getElementById('inactiveCustomersValue');
            if (activeEl || inactiveEl){
                const act = rows.filter(c => !!c.active).length;
                if (activeEl) activeEl.textContent = act;
                if (inactiveEl) inactiveEl.textContent = Math.max(0, rows.length - act);
            }
            
            await loadCustomersDebt();
        } else {
            
            if (customerTbody) {
                customerTbody.innerHTML = '<tr><td colspan="10" style="text-align: center; padding: 20px; color: var(--error);">فشل تحميل بيانات العملاء.</td></tr>';
            }
        }
    }

    // --- Modal Logic for New Customer ---
    const newCustomerModal = document.getElementById('newCustomerModal');
    const btnNewCustomer = document.getElementById('btnNewCustomer');
    const modalClose = document.getElementById('modalClose');
    const modalCancel = document.getElementById('modalCancel');
    const modalSave = document.getElementById('modalSave');
    const newCustomerForm = document.getElementById('newCustomerForm');
    const ncError = document.getElementById('nc_error');
    const avatarSubtitleEl = document.getElementById('customerHeaderSubtitle');
    const ncNameInput = document.getElementById('nc_name');

    function updateAvatarFromName(){
        if (!avatarSubtitleEl || !ncNameInput) return;
        const name = (ncNameInput.value || '').trim();
        if (!name){
            avatarSubtitleEl.textContent = 'عميل جديد';
            return;
        }
        avatarSubtitleEl.textContent = name;
    }

    if (ncNameInput){
        ncNameInput.addEventListener('input', updateAvatarFromName);
    }

    // Edit mode flags
    let isEditMode = false;
    let editingId = null;
    let editingBranchId = null;
    let customerSaveInFlight = false;

    async function openModal() {
        isEditMode = false;
        editingId = null;
        editingBranchId = null;
        newCustomerForm.reset();
        ncError.textContent = '';

        // Fetch and set the next customer ID
        if (window.db && window.db.getNextCustomerId) {
            const result = await window.db.getNextCustomerId();
            if (result.success) {
                document.getElementById('nc_id').value = result.nextId;
            } else {
                ncError.textContent = 'فشل في جلب رقم العميل التالي.';
            }
        }

        // Set default date (using local date, not UTC)
        const d = new Date();
        document.getElementById('nc_date').value = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');

        // تحميل التصنيفات عند فتح المودال
        if (typeof loadCategoryOptions === 'function') {
            await loadCategoryOptions();
        }
        await populateCustomerBranchAccessControls();

        if (avatarSubtitleEl) avatarSubtitleEl.textContent = tCust('newCustomer');
        updateAvatarFromName();

        newCustomerModal.setAttribute('aria-hidden', 'false');
    }

    function closeModal(force = false) {
        if (customerSaveInFlight && !force) {
            return;
        }
        newCustomerModal.setAttribute('aria-hidden', 'true');
        newCustomerForm.reset();
        ncError.textContent = '';
        isEditMode = false;
        editingId = null;
        editingBranchId = null;
        customerBranchPickerQuery = '';
        setCustomerBranchPickerOpen(false);
        // Reset modal title and button text
        const header = newCustomerModal.querySelector('.modal-header h3');
        if (header) header.textContent = tCust('addCustomer');
        const saveBtnText = document.getElementById('modalSaveText');
        if (saveBtnText) saveBtnText.textContent = tCust('btnSave');
    }

    // Add digit-only validation for tax_no and phone
    const taxNoInput = document.getElementById('nc_tax');
    const phoneInput = document.getElementById('nc_phone');
    const customerBranchScopeEl = document.getElementById('nc_branch_scope');
    const customerBranchSingleEl = document.getElementById('nc_branch_single');
    const customerBranchPickerTriggerEl = document.getElementById('nc_branch_picker_trigger');
    const customerBranchPickerModalEl = document.getElementById('nc_branch_picker_modal');
    const customerBranchPickerModalCloseEl = document.getElementById('nc_branch_picker_modal_close');
    const customerBranchPickerDoneEl = document.getElementById('nc_branch_picker_done');
    const customerBranchMultiSearchEl = document.getElementById('nc_branch_multi_search');
    const customerBranchMultiListEl = document.getElementById('nc_branch_multi_list');
    const customerBranchSelectedEl = document.getElementById('nc_branch_multi_selected');
    const customerBranchSelectAllBtn = document.getElementById('nc_branch_multi_select_all');
    const customerBranchClearBtn = document.getElementById('nc_branch_multi_clear');
    
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
    if (customerBranchScopeEl) {
        customerBranchScopeEl.addEventListener('change', updateCustomerBranchScopeControls);
    }
    if (customerBranchPickerTriggerEl) {
        customerBranchPickerTriggerEl.addEventListener('click', () => {
            setCustomerBranchPickerOpen(true);
            renderCustomerBranchPicker();
        });
    }
    if (customerBranchPickerModalCloseEl) {
        customerBranchPickerModalCloseEl.addEventListener('click', () => {
            setCustomerBranchPickerOpen(false);
            renderCustomerBranchPicker();
        });
    }
    if (customerBranchPickerDoneEl) {
        customerBranchPickerDoneEl.addEventListener('click', () => {
            setCustomerBranchPickerOpen(false);
            renderCustomerBranchPicker();
        });
    }
    if (customerBranchSingleEl) {
        customerBranchSingleEl.addEventListener('change', () => {
            const selectedBranchId = Number(customerBranchSingleEl.value || 0) || null;
            customerBranchPickerSelectedIds = selectedBranchId ? [selectedBranchId] : [];
            renderCustomerBranchPicker();
        });
    }
    if (customerBranchMultiSearchEl) {
        customerBranchMultiSearchEl.addEventListener('input', (event) => {
            customerBranchPickerQuery = String(event?.target?.value || '');
            renderCustomerBranchPicker();
        });
    }
    if (customerBranchMultiListEl) {
        customerBranchMultiListEl.addEventListener('change', (event) => {
            const input = event?.target;
            if (!(input instanceof HTMLInputElement) || !input.classList.contains('nc-branch-multi-item')) {
                return;
            }
            const branchId = Number(input.value || 0) || null;
            if (!branchId) {
                return;
            }
            const selectedSet = new Set(getOrderedCustomerBranchIds(customerBranchPickerSelectedIds));
            if (input.checked) {
                selectedSet.add(branchId);
            } else {
                selectedSet.delete(branchId);
            }
            customerBranchPickerSelectedIds = getOrderedCustomerBranchIds(Array.from(selectedSet));
            if (customerBranchSingleEl && customerBranchPickerSelectedIds.length) {
                customerBranchSingleEl.value = String(customerBranchPickerSelectedIds[0]);
            }
            renderCustomerBranchPicker();
        });
    }
    if (customerBranchSelectedEl) {
        customerBranchSelectedEl.addEventListener('click', (event) => {
            const removeBtn = event?.target?.closest('[data-branch-remove]');
            if (!removeBtn) {
                return;
            }
            const branchId = Number(removeBtn.getAttribute('data-branch-remove') || 0) || null;
            if (!branchId) {
                return;
            }
            customerBranchPickerSelectedIds = customerBranchPickerSelectedIds.filter(id => id !== branchId);
            if (customerBranchSingleEl) {
                customerBranchSingleEl.value = String(customerBranchPickerSelectedIds[0] || customerBranchOptionsCache[0]?.id || '');
            }
            renderCustomerBranchPicker();
        });
    }
    if (customerBranchSelectAllBtn) {
        customerBranchSelectAllBtn.addEventListener('click', () => {
            customerBranchPickerSelectedIds = customerBranchOptionsCache.map(branch => Number(branch?.id || 0)).filter(id => id > 0);
            if (customerBranchSingleEl && customerBranchPickerSelectedIds.length) {
                customerBranchSingleEl.value = String(customerBranchPickerSelectedIds[0]);
            }
            renderCustomerBranchPicker();
        });
    }
    if (customerBranchClearBtn) {
        customerBranchClearBtn.addEventListener('click', () => {
            customerBranchPickerSelectedIds = [];
            renderCustomerBranchPicker();
        });
    }
    if (customerBranchPickerModalEl) {
        const branchPickerBackdrop = customerBranchPickerModalEl.querySelector('.modal-backdrop');
        if (branchPickerBackdrop) {
            branchPickerBackdrop.addEventListener('click', () => {
                setCustomerBranchPickerOpen(false);
                renderCustomerBranchPicker();
            });
        }
    }
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && customerBranchPickerOpen) {
            setCustomerBranchPickerOpen(false);
            renderCustomerBranchPicker();
        }
    });

    btnNewCustomer.addEventListener('click', openModal);
    modalClose.addEventListener('click', closeModal);
    modalCancel.addEventListener('click', closeModal);
    newCustomerModal.querySelector('.modal-backdrop').addEventListener('click', closeModal);

    modalSave.addEventListener('click', async () => {
        if (customerSaveInFlight) {
            return;
        }
        customerSaveInFlight = true;
        modalSave.disabled = true;
        try {
            const name = document.getElementById('nc_name').value.trim();
            if (!name) {
                ncError.textContent = tCust('customerNameRequired');
                return;
            }

            // Validate tax number
            const taxNo = document.getElementById('nc_tax')?.value.trim() || '';
            if (taxNo && taxNo.length !== 15) {
                ncError.textContent = 'الرقم الضريبي يجب أن يكون 15 رقماً أو فارغاً';
                return;
            }
            if (taxNo && !/^\d+$/.test(taxNo)) {
                ncError.textContent = 'الرقم الضريبي يجب أن يحتوي على أرقام فقط';
                return;
            }

            // Validate phone number (only digits)
            const phone = document.getElementById('nc_phone').value.trim();
            if (phone && !/^\d+$/.test(phone)) {
                ncError.textContent = 'رقم الهاتف يجب أن يحتوي على أرقام فقط';
                return;
            }

            const currentUserId = getCurrentUserId();
            const isActualEdit = editingId && Number.isFinite(parseInt(editingId, 10));
            let customerBranchAccess;
            try {
                customerBranchAccess = buildCustomerBranchAccessPayload();
            } catch (branchError) {
                ncError.textContent = branchError?.message || tCust('branchRequired');
                return;
            }
            
            const base = {
                id: parseInt(document.getElementById('nc_id')?.value || '', 10) || undefined,
                name: name,
                tax_no: taxNo,
                phone: phone,
                email: document.getElementById('nc_email')?.value.trim() || '',
                region: document.getElementById('nc_region').value.trim(),
                category: document.getElementById('nc_category')?.value.trim() || '',
                active: document.getElementById('nc_active').checked ? 1 : 0,
                created_at: document.getElementById('nc_date').value || (()=>{ const d=new Date(); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); })(),
                debt_limit: parseDecimal(document.getElementById('nc_debt').value),
                sale_ounce_add: parseDecimal(document.getElementById('nc_sale_oz_add')?.value || ''),
                sale_ounce_add_enabled: document.getElementById('nc_sale_oz_add_enabled')?.checked ? 1 : 0,
                sale_ounce_sub: parseDecimal(document.getElementById('nc_sale_oz_sub')?.value || ''),
                sale_ounce_sub_enabled: document.getElementById('nc_sale_oz_sub_enabled')?.checked ? 1 : 0,
                purchase_ounce_add: parseDecimal(document.getElementById('nc_purchase_oz_add')?.value || ''),
                purchase_ounce_add_enabled: document.getElementById('nc_purchase_oz_add_enabled')?.checked ? 1 : 0,
                purchase_ounce_sub: parseDecimal(document.getElementById('nc_purchase_oz_sub')?.value || ''),
                purchase_ounce_sub_enabled: document.getElementById('nc_purchase_oz_sub_enabled')?.checked ? 1 : 0
            };
            
            // Add user tracking
            if (isActualEdit) {
                base.updated_by = currentUserId;
            } else {
                base.created_by = currentUserId;
            }
            const requestBranchId = isActualEdit
                ? (Number(editingBranchId || 0) || customerBranchAccess?.branchId || null)
                : (customerBranchAccess?.branchId || null);
            if (requestBranchId) {
                base.branchId = requestBranchId;
                base.selectedBranchId = requestBranchId;
            }
            base.accessScope = customerBranchAccess?.accessScope || 'single';
            base.branchIds = Array.isArray(customerBranchAccess?.branchIds) ? customerBranchAccess.branchIds : [];

            // ✅ فحص دقيق للصلاحية: نعتمد على editingId
            
            if (isActualEdit) {
                // تعديل عميل موجود - يحتاج صلاحية تعديل
                if (window.ScreenPermissions && !window.ScreenPermissions.check('customers_edit', 'تعديل عميل')) {
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
                // إضافة عميل جديد - يحتاج صلاحية إضافة
                if (window.ScreenPermissions && !window.ScreenPermissions.check('customers_add', 'إضافة عميل')) {
                    return;
                }
            }

            let res;
            if (isActualEdit) {
                if (!window.db || !window.db.updateCustomer){ throw new Error('updateCustomer غير متاحة'); }
                res = await window.db.updateCustomer({ ...base, id: editingId });
            } else {
                if (!window.db || !window.db.addCustomer){ throw new Error('addCustomer غير متاحة'); }
                res = await window.db.addCustomer(base);
            }
            if (res && res.success){
                if (!isActualEdit && Number(res.id) > 0) {
                    try {
                        window.parent?.postMessage({
                            type: 'daily-ops-notification',
                            entityType: 'customers',
                            documentId: Number(res.id),
                            userName: getCurrentUserDisplayName(),
                            action: 'insert',
                        }, '*');
                    } catch (_) {}
                }
                closeModal(true);
                await loadCustomers();
                await applyCurrentFilter(); // احترام البحث النشط
            } else {
                ncError.textContent = `فشل الحفظ: ${res && res.error ? res.error : 'غير معروف'}`;
            }
        } catch (e) {
            ncError.textContent = `خطأ: ${e && e.message ? e.message : e}`;
        } finally {
            customerSaveInFlight = false;
            modalSave.disabled = false;
        }
    });

    // --- DB Import Reply Logic (guarded) ---
    if (window.api && window.api.onImportDbReply) {
        window.api.onImportDbReply(({ success, error }) => {
            const dbStatus = document.getElementById('dbStatus');
            if (!dbStatus) return;
            if (success) {
                dbStatus.textContent = 'تم استيراد قاعدة البيانات بنجاح. يرجى إعادة تشغيل التطبيق.';
                dbStatus.style.color = 'var(--success)';
            } else {
                dbStatus.textContent = `فشل استيراد قاعدة البيانات: ${error}`;
                dbStatus.style.color = 'var(--error)';
            }
        });
    }

    // --- Customer Search Logic ---
    const customersSearch = document.getElementById('customersSearch');
    const debounce = (fn, ms=250) => {
        let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
    };
    function localFilter(term){
        const q = term.toLocaleLowerCase();
        const rows = (customersCache||[]).filter(c => {
            const fields = [c.id, c.name, c.tax_no, c.phone, c.email, c.region, c.branch_name, c.branch_code, c.branch_names, c.branch_codes];
            return fields.some(v => (v!==undefined && v!==null && String(v).toLocaleLowerCase().includes(q)));
        });
        renderCustomers(rows);
    }
    // دالة لإعادة تطبيق البحث النشط
    async function applyCurrentFilter(){
        const term = customersSearch?.value?.trim() || '';
        if (!term){ renderCustomers(customersCache); return; }
        if (window.db && window.db.searchCustomers){
            const result = await window.db.searchCustomers(term);
            if (result && result.success){ renderCustomers(result.data || []); return; }
        }
        localFilter(term);
    }
    if (customersSearch) {
        customersSearch.addEventListener('input', debounce(async (e) => {
            const term = e.target.value.trim();
            if (!term){ renderCustomers(customersCache); return; }
            if (window.db && window.db.searchCustomers){
                const result = await window.db.searchCustomers(term);
                if (result && result.success){ renderCustomers(result.data || []); return; }
            }
            localFilter(term);
        }, 300));
    }

        // --- Refresh Button Logic ---
    const btnRefreshCustomers = document.getElementById('btnRefreshCustomers');
    if (btnRefreshCustomers) {
        btnRefreshCustomers.addEventListener('click', () => {
            customersSearch.value = ''; // Clear search field
            loadCustomers();
        });
    }

    // Load customers when the page is ready (after ensuring db is ready)
    (async()=>{
        await waitForDb();
        await loadCustomers({ forceFresh: true, notifyOnNew: false });
        await setupCustomersRealtime();
    })();

    if (window.api && typeof window.api.on === 'function') {
        window.api.on('cloud-data-updated', (payload) => {
            const tables = Array.isArray(payload?.tables) ? payload.tables : [];
            if (tables.includes('customers') || tables.includes('customer_branches')) {
                refreshCustomersRealtime(true);
            }
        });
    }

    window.addEventListener('message', (event) => {
        if (event?.data?.type === 'db-mode-changed') {
            setupCustomersRealtime();
            return;
        }
        if (event?.data?.type === 'branch-scope-changed') {
            refreshCustomersRealtime(false);
            return;
        }
        if (event?.data?.type === 'cloud-data-updated') {
            const payload = event.data.payload || {};
            const tables = Array.isArray(payload?.tables) ? payload.tables : [];
            if (tables.includes('customers') || tables.includes('customer_branches')) {
                refreshCustomersRealtime(true);
            }
        }
    });

    window.addEventListener('focus', async () => {
        await setupCustomersRealtime();
        refreshCustomersRealtime(true);
    });

    window.addEventListener('beforeunload', () => {
        if (customersRealtimeTimer) {
            clearInterval(customersRealtimeTimer);
            customersRealtimeTimer = null;
        }
    });

    // Karat selector event listener
    const customersKaratSelector = document.getElementById('customersKaratSelector');
    if (customersKaratSelector) {
        customersKaratSelector.addEventListener('change', () => {
            loadCustomersDebt(); // Reload with new karat
        });
    }

    // Sortable headers
    const tableHead = document.querySelector('#customers-grid thead');
    let sortState = { key: 'id', dir: 'asc' };
    function sortRows(key){
        sortState.dir = (sortState.key === key && sortState.dir === 'asc') ? 'desc' : 'asc';
        sortState.key = key;
        const rows = [...(customersCache||[])];
        rows.sort((a,b)=>{
            const av = a[key]; const bv = b[key];
            if (av==null && bv==null) return 0;
            if (av==null) return 1;
            if (bv==null) return -1;
            if (key==='id' || key==='debt_limit') return (sortState.dir==='asc' ? (Number(av)-Number(bv)) : (Number(bv)-Number(av)));
            return (String(av).localeCompare(String(bv), 'ar')) * (sortState.dir==='asc'?1:-1);
        });
        renderCustomers(rows);
    }
    if (tableHead){
        const map = ['id','name','tax_no','phone','email','region','active','created_at','debt_limit','actions'];
        tableHead.addEventListener('click', (e)=>{
            const th = e.target.closest('th');
            if (!th) return;
            const idx = Array.from(th.parentElement.children).indexOf(th);
            const key = map[idx];
            if (!key) return;
            if (key === 'actions') return; // لا داعي للفرز على عمود الإجراءات
            sortRows(key);
        });
    }

        // --- Export Logic ---
    const btnExportExcel = document.getElementById('btnExportExcel');
    const btnExportPdf = document.getElementById('btnExportPdf');

    if (btnExportExcel) {
        btnExportExcel.addEventListener('click', async () => {
            // Check export permission
            if (window.ScreenPermissions && !window.ScreenPermissions.check('customers_export', 'تصدير العملاء')) {
                return;
            }
            
            // Try backend Excel export first
            if (window.db && window.db.exportCustomersExcel) {
                try {
                    const result = await window.db.exportCustomersExcel();
                    if (result && (result.success || result.reason === 'cancelled')) return;
                } catch (e) {
                    // Continue to CSV fallback
                }
            }

            // Fallback: generate XLS (HTML table) on the client side with borders
            let rows = [];
            if (window.db && window.db.getCustomers) {
                const res = await window.db.getCustomers();
                if (res && res.success) rows = res.data || [];
            }
            if (!rows.length && customerTbody) {
                rows = Array.from(customerTbody.querySelectorAll('tr')).map(tr => {
                    const tds = tr.querySelectorAll('td');
                    return {
                        id: tds[0]?.textContent?.trim(),
                        name: tds[1]?.textContent?.trim(),
                        tax_no: tds[2]?.textContent?.trim(),
                        phone: tds[3]?.textContent?.trim(),
                        email: tds[4]?.textContent?.trim(),
                        region: tds[5]?.textContent?.trim(),
                        active: tds[6]?.textContent?.trim(),
                        created_at: tds[7]?.textContent?.trim(),
                        debt_limit: tds[8]?.textContent?.trim(),
                    };
                });
            }

            const headers = [tCust('thCustomerId'),tCust('thCustomerName'),tCust('thTaxNo'),tCust('thPhone'),tCust('thEmail'),tCust('thRegion'),tCust('thActive'),tCust('thDate'),tCust('thDebtLimit')];
            const yesText = tCust('yes');
            const noText = tCust('no');
            const htmlRows = rows.map(c => `
              <tr>
                <td>${c.id ?? ''}</td>
                <td>${getCustomerDisplayName(c)}</td>
                <td>${c.tax_no ?? ''}</td>
                <td>${c.phone ?? ''}</td>
                <td>${c.email ?? ''}</td>
                <td>${c.region ?? ''}</td>
                <td>${(typeof c.active === 'number' ? (c.active ? yesText : noText) : (c.active ?? ''))}</td>
                <td>${c.created_at ?? ''}</td>
                <td>${c.debt_limit !== undefined && c.debt_limit !== null ? formatDecimal(c.debt_limit) : ''}</td>
              </tr>
            `).join('');

            const xlsHtml = `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><style>
              table{border-collapse:collapse}
              th,td{border:1px solid #444;padding:6px;text-align:right;white-space:nowrap}
              thead th{background:#eaeaea}
            </style></head><body>
              <table>
                <thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead>
                <tbody>${htmlRows}</tbody>
              </table>
            </body></html>`;

            const blob = new Blob(['\ufeff' + xlsHtml], { type: 'application/vnd.ms-excel;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'customers.xls';
            document.body.appendChild(a);
            a.click();
            setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 0);
        });
    }

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

    async function exportToPdf() {
        // Check export permission
        if (window.ScreenPermissions && !window.ScreenPermissions.check('customers_export', 'تصدير العملاء')) {
            return;
        }
        
        // Try to get printable rows from API, fallback to current table
        let rows = [];
        if (window.db && window.db.getCustomersForPdf){
            const result = await window.db.getCustomersForPdf();
            if (result && result.success) rows = result.data || [];
        }
        if (!rows.length && window.db && window.db.getCustomers){
            const res = await window.db.getCustomers();
            if (res && res.success) rows = res.data || [];
        }
        if (!rows.length && customerTbody){
            rows = Array.from(customerTbody.querySelectorAll('tr')).map(tr => {
                const tds = tr.querySelectorAll('td');
                return {
                    id: tds[0]?.textContent?.trim(),
                    name: tds[1]?.textContent?.trim(),
                    phone: tds[2]?.textContent?.trim(),
                    region: tds[3]?.textContent?.trim(),
                    active: /نعم|Yes|true/i.test(tds[4]?.textContent || ''),
                    created_at: tds[5]?.textContent?.trim(),
                    debt_limit: tds[6]?.textContent?.trim(),
                };
            });
        }

        const lang = getCustomersLang();
        const isRtl = lang === 'ar';
        const dir = isRtl ? 'rtl' : 'ltr';
        const textAlign = isRtl ? 'right' : 'left';
        const yesText = tCust('yes');
        const noText = tCust('no');
        
        const htmlRows = (rows || []).map(c => `
            <tr>
              <td>${c.id ?? ''}</td>
              <td>${getCustomerDisplayName(c)}</td>
              <td>${c.tax_no ?? ''}</td>
              <td>${c.phone ?? ''}</td>
              <td>${c.region ?? ''}</td>
              <td>${c.active ? yesText : noText}</td>
              <td>${formatDate(c.created_at)}</td>
              <td>${c.debt_limit !== undefined && c.debt_limit !== null ? formatDecimal(c.debt_limit) : ''}</td>
            </tr>
        `).join('');

        // Company info
        let company = {};
        try{ if (window.api && window.api.getCompanyInfo){ const r = await window.api.getCompanyInfo(); if (r && r.success) company = r.company || {}; } }catch(_){ }
        const headerHTML = buildCompanyHeader(company);

        const docHtml = `<!doctype html><html lang="${lang}" dir="${dir}"><head><meta charset="utf-8"><title>${tCust('printPreview')}</title><style>
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
        </style></head><body>
          <main>
            ${headerHTML}
            <h2 style="text-align:center;margin:0 0 12px 0">${tCust('printTitle')}</h2>
            <table><thead><tr><th>${tCust('thCustomerId')}</th><th>${tCust('thCustomerName')}</th><th>${tCust('thTaxNo')}</th><th>${tCust('thPhone')}</th><th>${tCust('thRegion')}</th><th>${tCust('thActive')}</th><th>${tCust('thDate')}</th><th>${tCust('thDebtLimit')}</th></tr></thead><tbody>${htmlRows}</tbody></table>
          </main>
          <button class="print-button no-print" onclick="window.print()"><i>🖨️</i>${tCust('printButton')}</button>
        </body></html>`;

        // Ask parent shell to open preview to avoid popup blockers
        if (window.openPreview) {
            window.openPreview(docHtml);
        } else {
            const w = window.open('', '_blank', 'noopener');
            if (!w) { if(window.showAlert) showAlert(tCust('previewError'), 'error'); return; }
            w.document.open(); w.document.write(docHtml); w.document.close(); w.focus();
        }
    }

    if (btnExportPdf) {
        btnExportPdf.addEventListener('click', exportToPdf);
    }

    // Format input for debt limit
    const ncDebt = document.getElementById('nc_debt');
    if (ncDebt){
        ncDebt.addEventListener('focus', ()=>{
            const n = parseDecimal(ncDebt.value);
            if (!isNaN(n)) ncDebt.value = String(n).replace(/\./g, '.');
        });
        ncDebt.addEventListener('blur', ()=>{
            const n = parseDecimal(ncDebt.value);
            ncDebt.value = formatDecimal(n);
        });
        ncDebt.addEventListener('input', (e)=>{
            // allow digits, comma, dot
            let v = e.target.value;
            v = v.replace(/[^0-9.,٬]/g,'');
            e.target.value = v;
        });
    }

    // --- DB Export/Import Logic ---
    const btnDbExport = document.getElementById('btnDbExport');
    const btnDbImport = document.getElementById('btnDbImport');

    if (btnDbExport) {
        btnDbExport.addEventListener('click', () => {
            if (window.api && window.api.exportDb) window.api.exportDb();
        });
    }

    if (btnDbImport) {
        btnDbImport.addEventListener('click', () => {
            if (window.api && window.api.importDb) window.api.importDb();
        });
    }

    // Confirm delete helper using custom modal
    function confirmDelete(message){
        return new Promise((resolve)=>{
            const modal = document.getElementById('confirmDelModal');
            const msg = document.getElementById('confirmDelMsg');
            const yes = document.getElementById('confirmDelYes');
            const no = document.getElementById('confirmDelNo');
            const closeBtn = document.getElementById('confirmDelClose');
            const close = () => { modal.setAttribute('aria-hidden','true'); cleanup(); };
            const cleanup = () => {
                yes.removeEventListener('click', onYes);
                no.removeEventListener('click', onNo);
                closeBtn.removeEventListener('click', onNo);
                modal.querySelector('.modal-backdrop').removeEventListener('click', onNo);
            };
            const onYes = () => { resolve(true); close(); };
            const onNo = () => { resolve(false); close(); };
            if (msg) msg.textContent = message || 'هل أنت متأكد من الحذف؟';
            yes.addEventListener('click', onYes);
            no.addEventListener('click', onNo);
            closeBtn.addEventListener('click', onNo);
            modal.querySelector('.modal-backdrop').addEventListener('click', onNo);
            modal.setAttribute('aria-hidden','false');
        });
    }

    // Edit/Delete actions via delegation
    if (customerTbody){
        customerTbody.addEventListener('click', async (e) => {
            const editBtn = e.target.closest('.act-edit');
            const delBtn = e.target.closest('.act-delete');
            if (editBtn){
                const id = parseInt(editBtn.dataset.id, 10);
                const c = (customersCache || []).find(x => x.id === id);
                if (!c) return;

                // Switch to edit mode and prefill, then open modal
                isEditMode = true; editingId = c.id; editingBranchId = getCustomerRecordBranchId(c);
                const header = newCustomerModal.querySelector('.modal-header h3');
                if (header) header.textContent = tCust('editCustomer');
                const saveBtnText = document.getElementById('modalSaveText');
                if (saveBtnText) saveBtnText.textContent = tCust('btnSaveChanges');
                document.getElementById('nc_id').value = c.id;
                document.getElementById('nc_name').value = c.name || '';
                document.getElementById('nc_tax').value = c.tax_no || '';
                document.getElementById('nc_phone').value = c.phone || '';
                document.getElementById('nc_email').value = c.email || '';
                document.getElementById('nc_region').value = c.region || '';
                document.getElementById('nc_sale_oz_add').value = c.sale_ounce_add ?? '';
                document.getElementById('nc_sale_oz_add_enabled').checked = !!c.sale_ounce_add_enabled;
                document.getElementById('nc_sale_oz_sub').value = c.sale_ounce_sub ?? '';
                document.getElementById('nc_sale_oz_sub_enabled').checked = !!c.sale_ounce_sub_enabled;
                document.getElementById('nc_purchase_oz_add').value = c.purchase_ounce_add ?? '';
                document.getElementById('nc_purchase_oz_add_enabled').checked = !!c.purchase_ounce_add_enabled;
                document.getElementById('nc_purchase_oz_sub').value = c.purchase_ounce_sub ?? '';
                document.getElementById('nc_purchase_oz_sub_enabled').checked = !!c.purchase_ounce_sub_enabled;
                // تحميل التصنيفات ثم تعيين القيمة
                if (typeof loadCategoryOptions === 'function') {
                    await loadCategoryOptions();
                }
                document.getElementById('nc_category').value = c.category || '';
                await populateCustomerBranchAccessControls({ customer: c });
                document.getElementById('nc_active').checked = !!c.active;
                document.getElementById('nc_date').value = c.created_at || '';
                document.getElementById('nc_debt').value = c.debt_limit !== undefined && c.debt_limit !== null ? formatDecimal(c.debt_limit) : '';
                updateAvatarFromName();
                if (avatarSubtitleEl && c.name){ avatarSubtitleEl.textContent = c.name; }
                newCustomerModal.setAttribute('aria-hidden', 'false');
            } else if (delBtn){
                const id = parseInt(delBtn.dataset.id, 10);
                const customer = (customersCache || []).find(x => x.id === id);
                const name = customer?.name || delBtn.closest('tr')?.querySelector('td:nth-child(2)')?.textContent || '';
                
                // ✅ Check delete permission BEFORE opening confirmation modal
                if (window.ScreenPermissions && !window.ScreenPermissions.check('customers_delete', 'حذف عميل')) {
                    return;
                }
                
                const confirmMsg = tCust('confirmDeleteCustomer').replace('{name}', name);
                const ok = await confirmDelete(confirmMsg);
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
                
                if (!window.db || !window.db.deleteCustomer){ return; }
                const res = await window.db.deleteCustomer({
                    id,
                    branchId: getCustomerRecordBranchId(customer),
                    actorUserId: getCurrentUserId(),
                    actorName: getCurrentUserDisplayName(),
                });
                if (!res || !res.success){
                    showDeleteErrorModal(res);
                } else {
                    await loadCustomers();
                    await applyCurrentFilter(); // احترام البحث النشط
                }
            }
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
    const categorySelect = document.getElementById('nc_category');

    function openCategoriesModal() {
        if (categoriesModal) categoriesModal.setAttribute('aria-hidden', 'false');
        loadCategoriesList();
    }

    function closeCategoriesModal() {
        if (categoriesModal) categoriesModal.setAttribute('aria-hidden', 'true');
        loadCategoryOptions(); // تحديث الكومبو بعد الإغلاق
    }

    async function loadCategoriesList() {
        if (!categoriesList) return;
        categoriesList.innerHTML = `<p style="text-align:center;color:var(--subtle)">${tCust('loadingCategories')}</p>`;
        
        try {
            if (!window.api || !window.api.invoke) {
                categoriesList.innerHTML = `<p style="text-align:center;color:var(--error)">${tCust('connectionError')}</p>`;
                return;
            }
            const result = await window.api.invoke('get-categories', { type: 'customer' });
            if (result && result.success && Array.isArray(result.data)) {
                if (result.data.length === 0) {
                    categoriesList.innerHTML = `<p style="text-align:center;color:var(--subtle)">${tCust('noCategories')}</p>`;
                    return;
                }
                const deleteTitle = tCust('btnDelete');
                categoriesList.innerHTML = result.data.map(cat => `
                    <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:var(--card);border:1px solid var(--border);border-radius:10px">
                        <div style="display:flex;align-items:center;gap:10px">
                            <i class="fa-solid fa-tag" style="color:var(--primary)"></i>
                            <span style="font-weight:600">${cat.name}</span>
                        </div>
                        <button type="button" class="icon-btn delete-category-btn" data-id="${cat.id}" title="${deleteTitle}" style="color:#ef4444">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                `).join('');

                // إضافة مستمعي الحذف
                categoriesList.querySelectorAll('.delete-category-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const id = parseInt(btn.dataset.id, 10);
                        const name = btn.closest('div').querySelector('span')?.textContent || '';
                        showDeleteCategoryConfirm(id, name);
                    });
                });
            }
        } catch (err) {
            categoriesList.innerHTML = `<p style="text-align:center;color:var(--error)">${tCust('loadingError')}</p>`;
        }
    }

    async function loadCategoryOptions() {
        if (!categorySelect) return;
        const currentValue = categorySelect.value;
        categorySelect.innerHTML = `<option value="">${tCust('noClassification')}</option>`;
        
        try {
            if (!window.api || !window.api.invoke) return;
            const result = await window.api.invoke('get-categories', { type: 'customer' });
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
                    categoryError.textContent = tCust('enterCategoryName');
                    categoryError.style.display = 'block';
                }
                return;
            }
            if (categoryError) categoryError.style.display = 'none';
            
            try {
                const res = await window.api.invoke('add-category', { name, type: 'customer' });
                if (res && res.success) {
                    newCategoryName.value = '';
                    loadCategoriesList();
                } else {
                    if (categoryError) {
                        categoryError.textContent = res?.error || tCust('addFailed');
                        categoryError.style.display = 'block';
                    }
                }
            } catch (err) {
                if (categoryError) {
                    categoryError.textContent = tCust('errorOccurred');
                    categoryError.style.display = 'block';
                }
            }
        });
    }

    // تحميل التصنيفات عند بدء الصفحة
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
            const res = await window.api.invoke('delete-category', { id: pendingDeleteCategoryId, type: 'customer' });
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

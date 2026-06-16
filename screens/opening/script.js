// ===== Translation System for Opening Balances =====
const OB_TRANSLATIONS = {
  ar: {
    // Page title
    pageTitle: 'الأرصدة الافتتاحية',
    
    // Toolbar buttons
    btnNewOpening: 'رصيد افتتاحي جديد',
    btnEdit: 'تعديل',
    btnSave: 'حفظ',
    btnSaveEdit: 'حفظ التعديل',
    btnDelete: 'حذف',
    btnCancel: 'إلغاء',
    btnPrintPDF: 'طباعة PDF',
    btnWhatsApp: 'إرسال عبر واتساب',
    btnClose: 'إغلاق',
    
    // Pager
    navFirst: 'الأول',
    navPrev: 'السابق',
    navNext: 'التالي',
    navLast: 'الأخير',
    navPlaceholder: 'رقم',
    navGoTo: 'اذهب لرقم',
    
    // Header fields
    fieldMovementNo: 'رقم الحركة',
    fieldDate: 'التاريخ',
    fieldTime: 'الوقت',
    fieldTotalAmount: 'إجمالي الحركة (ريال)',
    fieldCustomersCount: 'عدد العملاء',
    fieldSuppliersCount: 'عدد الموردين',
    fieldAccountsCount: 'عدد الحسابات',
    fieldMemo: 'البيان',
    btnCopyMemo: 'نسخ البيان إلى جميع السطور',
    
    // Table title and headers
    tableTitle: 'تفاصيل السند',
    thItem: 'البند',
    thCustomerId: 'رقم العميل',
    thSupplierId: 'رقم المورد',
    thAccountId: 'رقم الحساب',
    thAccountName: 'اسم الحساب',
    thType: 'الحالة',
    thAmount: 'الريال',
    thWeight: 'الوزن',
    thKarat: 'العيار',
    thNote: 'البيان',
    thActions: 'الإجراءات',
    btnAddLine: 'إضافة سطر',
    memoLabel: 'البيان',
    
    // Table placeholders
    placeholderSearch: 'F9 للبحث',
    placeholderAmount: 'مبلغ',
    placeholderWeight: 'وزن',
    placeholderKarat: 'عيار',
    placeholderNote: 'وصف',
    
    // Type options
    typeDebit: 'مدين',
    typeCredit: 'دائن',
    
    // Totals section
    totalCashDebit: 'مدين',
    totalCashCredit: 'دائن',
    totalGoldDebit: 'مدين(ذهب 21)',
    totalGoldCredit: 'دائن(ذهب 21)',
    totalSilverDebit: 'مدين(فضة 999)',
    totalSilverCredit: 'دائن(فضة 999)',
    totalBalance: 'الفرق',
    balanced: 'متزن',
    
    // User tracking
    createdBy: 'أنشئ بواسطة:',
    lastModified: 'آخر تعديل:',
    
    // Toast messages
    toastSaved: 'تم حفظ الرصيد',
    toastUpdated: 'تم تحديث الرصيد',
    toastDeleted: 'تم حذف الرصيد',
    toastError: 'حدث خطأ',
    toastSaveFailed: 'فشل الحفظ',
    toastDeleteFailed: 'فشل الحذف',
    toastCopiedMemo: 'تم نسخ البيان إلى {count} {unit}',
    toastNoMemo: 'يرجى إدخال نص في حقل البيان أولاً',
    toastNoEmptyRows: 'لا توجد سطور غير فارغة لنسخ البيان إليها',
    toastSaveFirst: 'يرجى حفظ الرصيد أولاً',
    toastNoPhone: 'رقم الهاتف غير موجود',
    toastInvalidPhone: 'رقم الهاتف غير صحيح',
    toastPreparingImage: 'جاري تجهيز صورة الرصيد...',
    toastWindowFailed: 'فشل فتح النافذة',
    unitLine: 'سطر',
    unitLines: 'سطور',
    
    // Validation messages
    validationKaratRequired: 'عند إدخال وزن الذهب يجب إدخال العيار أولاً',
    validationCustomerNotFound: 'لا يوجد عميل بهذا الرقم',
    validationSupplierNotFound: 'لا يوجد مورد بهذا الرقم',
    validationAccountNotFound: 'لا يوجد حساب بهذا الرقم',
    validationIdRequired: 'يجب إدخال رقم العميل أو المورد أو الحساب في كل سطر',
    validationMinOneLine: 'يجب إضافة سطر واحد على الأقل',
    validationNoOpeningToEdit: 'لا يوجد رصيد محفوظ للتعديل',
    validationViewMode: 'الشاشة في وضع عرض فقط. اضغط زر "تعديل" أولاً',
    validationEditUnlocked: 'صلاحية التعديل لهذا السند غير مفعلة. اضغط زر "تعديل" مرة أخرى',
    validationNewMode: 'لا يمكن حفظ رصيد جديد في وضع العرض. اضغط زر "رصيد افتتاحي جديد" أولاً',
    
    // Confirm delete modals
    confirmDeleteDocTitle: 'تأكيد حذف السند',
    confirmDeleteDocMessage: 'هل أنت متأكد من حذف رصيد الافتتاحي الحالي؟',
    confirmDeleteDocMessageWithId: 'هل أنت متأكد من حذف رصيد الافتتاحي رقم {id}؟',
    confirmDeleteRowTitle: 'تأكيد الحذف',
    confirmDeleteRowMessage: 'هل أنت متأكد من حذف هذا السطر؟',
    confirmDeleteRowWithName: 'هل أنت متأكد من أنك تريد حذف السطر "{name}"؟',
    confirmYes: 'نعم، احذف',
    confirmNo: 'إلغاء الأمر',
    
    // Print/Export labels
    printTitle: 'رصيد افتتاحي',
    printOpeningNo: 'رصيد افتتاحي رقم:',
    printDate: 'التاريخ:',
    printTime: 'الوقت:',
    printMemo: 'البيان:',
    printItem: 'البند',
    printAccountName: 'اسم الحساب',
    printStatus: 'الحالة',
    printCash: 'الريال',
    printWeight: 'الوزن',
    printKarat: 'العيار',
    printNote: 'البيان',
    printCashDebit: 'نقد مدين',
    printCashCredit: 'نقد دائن',
    printWeightDebit21: 'إجمالي الأوزان محولة 21 مدين',
    printWeightCredit21: 'إجمالي الأوزان محولة 21 دائن',
    printCashInWords: 'النقد كتابة:',
    printGoldInWords: 'الذهب كتابة (عيار 21):',
    printButton: 'طباعة',
    printDebit: 'مدين',
    printCredit: 'دائن',
    
    // WhatsApp message
    whatsappTitle: 'رصيد افتتاحي رقم:',
    whatsappDear: 'عزيزي:',
    whatsappDate: 'التاريخ:',
    whatsappDetails: 'التفاصيل:',
    whatsappTotalCash: 'إجمالي النقد:',
    whatsappTotalWeight: 'إجمالي الوزن:',
    whatsappDebit: 'مدين:',
    whatsappCredit: 'دائن:',
    whatsappRiyal: 'ريال',
    whatsappGram: 'غ',
    whatsappKarat: 'عيار',
    whatsappThanks: 'شكراً لتعاملكم معنا 🙏',
    whatsappUndefined: 'غير محدد',
    
    // Company info (keep in Arabic for RTL section)
    companyAddress: 'العنوان:',
    companyPhone: 'الهاتف:',
    companyEmail: 'البريد:',
    companyTax: 'الرقم الضريبي:',
    
    // Number to words
    wordRiyal: 'ريال',
    wordHalala: 'هللة',
    wordGram: 'جرام',
    wordMilli: 'مل',
    wordAnd: 'و',
    
    // Lookup modals
    lookupCustomerTitle: 'اختيار عميل',
    lookupCustomerId: 'رقم العميل',
    lookupCustomerName: 'اسم العميل',
    lookupSupplierTitle: 'اختيار مورد',
    lookupSupplierId: 'رقم المورد',
    lookupSupplierName: 'اسم المورد',
    lookupAccountTitle: 'اختيار حساب',
    lookupAccountId: 'رقم الحساب',
    lookupAccountName: 'اسم الحساب',
    lookupSearchPlaceholder: 'اكتب الرقم أو الاسم للبحث',
    lookupCancel: 'إلغاء',
    // Unsaved changes modal
    unsavedTitle: 'تغييرات غير محفوظة',
    unsavedMessage: 'لديك تعديلات لم يتم حفظها بعد',
    unsavedDetail: 'هل تريد المتابعة والخروج بدون حفظ التغييرات؟',
    unsavedStay: 'العودة للتعديل',
    unsavedLeave: 'خروج بدون حفظ'
  },
  en: {
    // Page title
    pageTitle: 'Opening Balances',
    
    // Toolbar buttons
    btnNewOpening: 'New Opening Balance',
    btnEdit: 'Edit',
    btnSave: 'Save',
    btnSaveEdit: 'Save Changes',
    btnDelete: 'Delete',
    btnCancel: 'Cancel',
    btnPrintPDF: 'Print PDF',
    btnWhatsApp: 'Send via WhatsApp',
    btnClose: 'Close',
    
    // Pager
    navFirst: 'First',
    navPrev: 'Previous',
    navNext: 'Next',
    navLast: 'Last',
    navPlaceholder: 'No.',
    navGoTo: 'Go to number',
    
    // Header fields
    fieldMovementNo: 'Movement No.',
    fieldDate: 'Date',
    fieldTime: 'Time',
    fieldTotalAmount: 'Total Amount (Riyal)',
    fieldCustomersCount: 'Customers Count',
    fieldSuppliersCount: 'Suppliers Count',
    fieldAccountsCount: 'Accounts Count',
    fieldMemo: 'Memo',
    btnCopyMemo: 'Copy memo to all lines',
    
    // Table title and headers
    tableTitle: 'Document Details',
    thItem: 'Item',
    thCustomerId: 'Customer ID',
    thSupplierId: 'Supplier ID',
    thAccountId: 'Account ID',
    thAccountName: 'Account Name',
    thType: 'Type',
    thAmount: 'Amount',
    thWeight: 'Weight',
    thKarat: 'Karat',
    thNote: 'Note',
    thActions: 'Actions',
    btnAddLine: 'Add Line',
    memoLabel: 'Memo',
    
    // Table placeholders
    placeholderSearch: 'F9 to search',
    placeholderAmount: 'Amount',
    placeholderWeight: 'Weight',
    placeholderKarat: 'Karat',
    placeholderNote: 'Description',
    
    // Type options
    typeDebit: 'Debit',
    typeCredit: 'Credit',
    
    // Totals section
    totalCashDebit: 'Cash Debit',
    totalCashCredit: 'Cash Credit',
    totalGoldDebit: 'Debit (Gold 21K)',
    totalGoldCredit: 'Credit (Gold 21K)',
    totalSilverDebit: 'Debit (Silver 999)',
    totalSilverCredit: 'Credit (Silver 999)',
    totalBalance: 'Balance',
    balanced: 'Balanced',
    
    // User tracking
    createdBy: 'Created by:',
    lastModified: 'Last modified:',
    
    // Toast messages
    toastSaved: 'Opening balance saved',
    toastUpdated: 'Opening balance updated',
    toastDeleted: 'Opening balance deleted',
    toastError: 'An error occurred',
    toastSaveFailed: 'Save failed',
    toastDeleteFailed: 'Delete failed',
    toastCopiedMemo: 'Memo copied to {count} {unit}',
    toastNoMemo: 'Please enter memo text first',
    toastNoEmptyRows: 'No non-empty rows to copy memo to',
    toastSaveFirst: 'Please save the opening balance first',
    toastNoPhone: 'Phone number not found',
    toastInvalidPhone: 'Invalid phone number',
    toastPreparingImage: 'Preparing opening balance image...',
    toastWindowFailed: 'Failed to open window',
    unitLine: 'line',
    unitLines: 'lines',
    
    // Validation messages
    validationKaratRequired: 'When entering gold weight, karat must be specified',
    validationCustomerNotFound: 'Customer with this ID not found',
    validationSupplierNotFound: 'Supplier with this ID not found',
    validationAccountNotFound: 'Account with this ID not found',
    validationIdRequired: 'Customer, supplier, or account ID must be entered in each line',
    validationMinOneLine: 'At least one line must be added',
    validationNoOpeningToEdit: 'No saved opening balance to edit',
    validationViewMode: 'Screen is in view mode. Click "Edit" button first',
    validationEditUnlocked: 'Edit permission for this document is not active. Click "Edit" button again',
    validationNewMode: 'Cannot save new opening balance in view mode. Click "New Opening Balance" button first',
    
    // Confirm delete modals
    confirmDeleteDocTitle: 'Confirm Document Deletion',
    confirmDeleteDocMessage: 'Are you sure you want to delete the current opening balance?',
    confirmDeleteDocMessageWithId: 'Are you sure you want to delete opening balance #{id}?',
    confirmDeleteRowTitle: 'Confirm Deletion',
    confirmDeleteRowMessage: 'Are you sure you want to delete this line?',
    confirmDeleteRowWithName: 'Are you sure you want to delete the line "{name}"?',
    confirmYes: 'Yes, delete',
    confirmNo: 'Cancel',
    
    // Print/Export labels
    printTitle: 'Opening Balance',
    printOpeningNo: 'Opening Balance No.:',
    printDate: 'Date:',
    printTime: 'Time:',
    printMemo: 'Memo:',
    printItem: 'Item',
    printAccountName: 'Account Name',
    printStatus: 'Status',
    printCash: 'Cash',
    printWeight: 'Weight',
    printKarat: 'Karat',
    printNote: 'Note',
    printCashDebit: 'Cash Debit',
    printCashCredit: 'Cash Credit',
    printWeightDebit21: 'Total Weight Converted 21K Debit',
    printWeightCredit21: 'Total Weight Converted 21K Credit',
    printCashInWords: 'Cash in words:',
    printGoldInWords: 'Gold in words (21K):',
    printButton: 'Print',
    printDebit: 'Debit',
    printCredit: 'Credit',
    
    // WhatsApp message
    whatsappTitle: 'Opening Balance No.:',
    whatsappDear: 'Dear:',
    whatsappDate: 'Date:',
    whatsappDetails: 'Details:',
    whatsappTotalCash: 'Total Cash:',
    whatsappTotalWeight: 'Total Weight:',
    whatsappDebit: 'Debit:',
    whatsappCredit: 'Credit:',
    whatsappRiyal: 'Riyal',
    whatsappGram: 'g',
    whatsappKarat: 'karat',
    whatsappThanks: 'Thank you for your business 🙏',
    whatsappUndefined: 'Undefined',
    
    // Company info (keep in English for LTR section)
    companyAddress: 'Address:',
    companyPhone: 'Phone:',
    companyEmail: 'Email:',
    companyTax: 'VAT:',
    
    // Number to words (English conversion not implemented, keep Arabic)
    wordRiyal: 'Riyal',
    wordHalala: 'Halala',
    wordGram: 'Gram',
    wordMilli: 'mg',
    wordAnd: 'and',
    
    // Lookup modals
    lookupCustomerTitle: 'Select Customer',
    lookupCustomerId: 'Customer ID',
    lookupCustomerName: 'Customer Name',
    lookupSupplierTitle: 'Select Supplier',
    lookupSupplierId: 'Supplier ID',
    lookupSupplierName: 'Supplier Name',
    lookupAccountTitle: 'Select Account',
    lookupAccountId: 'Account ID',
    lookupAccountName: 'Account Name',
    lookupSearchPlaceholder: 'Type ID or name to search',
    lookupCancel: 'Cancel',
    // Unsaved changes modal
    unsavedTitle: 'Unsaved Changes',
    unsavedMessage: 'You have unsaved changes on this document',
    unsavedDetail: 'Do you want to leave without saving your changes?',
    unsavedStay: 'Back to Edit',
    unsavedLeave: 'Leave'
  }
};

// Helper functions for translation
function getOpeningLang() {
  try {
    return localStorage.getItem('uiLang') === 'en' ? 'en' : 'ar';
  } catch(_) {
    return 'ar';
  }
}

function tOb(key) {
  const lang = getOpeningLang();
  return OB_TRANSLATIONS[lang]?.[key] || OB_TRANSLATIONS.ar[key] || key;
}

function tObFmt(key, params = {}) {
  let text = tOb(key);
  Object.keys(params).forEach(k => {
    text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), params[k]);
  });
  return text;
}

// Apply static text translations to HTML elements
function applyOpeningStaticTexts() {
  const lang = getOpeningLang();
  const dir = lang === 'en' ? 'ltr' : 'rtl';
  
  // Update document title and direction
  try {
    document.title = tOb('pageTitle');
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  } catch(_) {}
  
  const setText = (id, key) => {
    const el = document.getElementById(id);
    if (el) el.textContent = tOb(key);
  };
  
  const setAttr = (id, attr, key) => {
    const el = document.getElementById(id);
    if (el) el.setAttribute(attr, tOb(key));
  };
  
  // Toolbar buttons (with icons)
  const btnNewText = document.getElementById('obtnNewText');
  if (btnNewText) btnNewText.innerHTML = `<i class="fa-solid fa-rocket"></i> ${tOb('btnNewOpening')}`;
  
  const btnEditText = document.getElementById('obtnEditText');
  if (btnEditText) btnEditText.innerHTML = `<i class="fa-solid fa-pen-to-square"></i> ${tOb('btnEdit')}`;
  
  const btnSaveText = document.getElementById('obtnSaveText');
  if (btnSaveText) btnSaveText.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${tOb('btnSave')}`;
  
  const btnDeleteText = document.getElementById('obtnDeleteText');
  if (btnDeleteText) btnDeleteText.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> ${tOb('btnDelete')}`;
  
  const btnPrintText = document.getElementById('obtnPrintText');
  if (btnPrintText) btnPrintText.innerHTML = `<i class="fa-solid fa-file-pdf"></i> ${tOb('btnPrintPDF')}`;
  
  const btnCloseText = document.getElementById('obtnCloseText');
  if (btnCloseText) btnCloseText.innerHTML = `<i class="fa-solid fa-xmark"></i> ${tOb('btnClose')}`;
  
  // Pager buttons
  setAttr('ob_nav_first', 'title', 'navFirst');
  setAttr('ob_nav_first', 'aria-label', 'navFirst');
  setAttr('ob_nav_prev', 'title', 'navPrev');
  setAttr('ob_nav_prev', 'aria-label', 'navPrev');
  setAttr('ob_nav_next', 'title', 'navNext');
  setAttr('ob_nav_next', 'aria-label', 'navNext');
  setAttr('ob_nav_last', 'title', 'navLast');
  setAttr('ob_nav_last', 'aria-label', 'navLast');
  setAttr('ob_nav_id', 'placeholder', 'navPlaceholder');
  setAttr('ob_nav_id', 'title', 'navGoTo');
  
  // Fix arrow icons direction based on language
  // In RTL (Arabic): First=left, Last=right (normal)
  // In LTR (English): First=left, Last=right but pager order is reversed via CSS
  const isRtl = lang === 'ar';
  const pager = document.getElementById('ob_pager');
  if (pager) {
    pager.style.flexDirection = isRtl ? 'row' : 'row-reverse';
  }
  
  // Header field labels
  setText('ob_field_movement_no', 'fieldMovementNo');
  setText('ob_field_date', 'fieldDate');
  setText('ob_field_time', 'fieldTime');
  setText('ob_field_total_amount', 'fieldTotalAmount');
  setText('ob_field_customers_count', 'fieldCustomersCount');
  setText('ob_field_suppliers_count', 'fieldSuppliersCount');
  setText('ob_field_accounts_count', 'fieldAccountsCount');
  
  // Table title and memo
  setText('ob_table_title', 'tableTitle');
  setText('ob_memo_label', 'memoLabel');
  setAttr('ob_memo', 'placeholder', 'fieldMemo');
  setAttr('ob_btnCopyMemo', 'title', 'btnCopyMemo');
  setText('ob_add_line_text', 'btnAddLine');
  
  // Table headers
  setText('ob_th_item', 'thItem');
  setText('ob_th_customer_id', 'thCustomerId');
  setText('ob_th_supplier_id', 'thSupplierId');
  setText('ob_th_account_id', 'thAccountId');
  setText('ob_th_account_name', 'thAccountName');
  setText('ob_th_type', 'thType');
  setText('ob_th_amount', 'thAmount');
  setText('ob_th_weight', 'thWeight');
  setText('ob_th_karat', 'thKarat');
  setText('ob_th_note', 'thNote');
  setText('ob_th_actions', 'thActions');
  
  // Fix table header alignment
  const tableHeaders = document.querySelectorAll('#obTable thead th');
  if (tableHeaders && tableHeaders.length > 0) {
    const textAlign = dir === 'ltr' ? 'left' : 'right';
    tableHeaders.forEach(th => {
      th.style.textAlign = textAlign;
    });
  }
  
  // User tracking labels
  setText('ob_created_by_label', 'createdBy');
  setText('ob_last_modified_label', 'lastModified');
  
  // Confirm delete modals
  setText('ob_confirmDocDelTitle', 'confirmDeleteDocTitle');
  setText('ob_confirmDocDelMsg', 'confirmDeleteDocMessage');
  setText('ob_confirmDocDelYesText', 'confirmYes');
  setText('ob_confirmDocDelNoText', 'confirmNo');
  
  setText('ob_confirmDelTitle', 'confirmDeleteRowTitle');
  setText('ob_confirmDelMsg', 'confirmDeleteRowMessage');
  setText('ob_confirmDelYesText', 'confirmYes');
  setText('ob_confirmDelNoText', 'confirmNo');
  
  // Totals section
  setText('total_cash_debit_label', 'totalCashDebit');
  setText('total_cash_credit_label', 'totalCashCredit');
  setText('total_gold_debit_label', 'totalGoldDebit');
  setText('total_gold_credit_label', 'totalGoldCredit');
  setText('total_silver_debit_label', 'totalSilverDebit');
  setText('total_silver_credit_label', 'totalSilverCredit');
  setText('total_balance_label', 'totalBalance');
  setText('total_balance_label2', 'totalBalance');
  setText('total_balance_label3', 'totalBalance');
  
  // Lookup modals - titles
  setText('ob_lookupCustomerTitle', 'lookupCustomerTitle');
  setText('ob_lookupSupplierTitle', 'lookupSupplierTitle');
  setText('ob_lookupAccountTitle', 'lookupAccountTitle');
  
  // Lookup modals - table headers
  setText('ob_lc_th_id', 'lookupCustomerId');
  setText('ob_lc_th_name', 'lookupCustomerName');
  setText('ob_ls_th_id', 'lookupSupplierId');
  setText('ob_ls_th_name', 'lookupSupplierName');
  setText('ob_la_th_id', 'lookupAccountId');
  setText('ob_la_th_name', 'lookupAccountName');
  
  // Lookup modals - cancel buttons
  setText('ob_lc_cancel_text', 'lookupCancel');
  setText('ob_ls_cancel_text', 'lookupCancel');
  setText('ob_la_cancel_text', 'lookupCancel');
  
  // Lookup modals - search placeholders
  const obLcSearch = document.getElementById('ob_lc_search');
  const obLsSearch = document.getElementById('ob_ls_search');
  const obLaSearch = document.getElementById('ob_la_search');
  if (obLcSearch) obLcSearch.placeholder = tOb('lookupSearchPlaceholder');
  if (obLsSearch) obLsSearch.placeholder = tOb('lookupSearchPlaceholder');
  if (obLaSearch) obLaSearch.placeholder = tOb('lookupSearchPlaceholder');
}

// Ensure bridge APIs are available (mirror receipt)
(function ensureAPIBridge(){
  try{
    const pick = (name)=>{ if (!window[name]){ if (window.parent && window.parent[name]) window[name]=window.parent[name]; else if (window.top && window.top[name]) window[name]=window.top[name]; } };
    ['opening','accounts','suppliers','db','api','sys'].forEach(pick);
  }catch(_){ }
})();

const toastWrap = document.getElementById('toastWrap');
function showToast(type='success', message=''){
  const wrap = toastWrap;
  if (!wrap){ try{ if(window.showAlert) showAlert(message || (type==='error' ? tOb('toastError') : tOb('toastSaved')), type); }catch(_){ } return; }
  const el = document.createElement('div');
  el.className = `toast ${type==='error' ? 'error' : 'success'}`;
  const icon = type==='error' ? '<i class="fa-regular fa-circle-xmark icon"></i>' : '<i class="fa-regular fa-circle-check icon"></i>';
  el.innerHTML = `${icon}<span>${message}</span>`;
  wrap.appendChild(el);
  const timeout = setTimeout(()=>{ el.style.opacity='0'; el.style.transform='translateY(6px)'; setTimeout(()=>{ el.remove(); }, 180); }, 3500);
}

const obTable = document.getElementById('obTable');
const tbody = obTable?.querySelector('tbody');
const btnNew = document.getElementById('obtnNew');
const btnEdit = document.getElementById('obtnEdit');
const btnSave = document.getElementById('obtnSave');
const btnDelete = document.getElementById('obtnDelete');
const btnPrint = document.getElementById('obtnPrint');
const btnJournal = document.getElementById('obtnJournal');
const btnWhatsApp = document.getElementById('obtnWhatsApp');
const btnClose = document.getElementById('obtnClose');
const btnAddLine = document.getElementById('ob_add_line');
// Pager refs
const navFirst = document.getElementById('ob_nav_first');
const navPrev  = document.getElementById('ob_nav_prev');
const navNext  = document.getElementById('ob_nav_next');
const navLast  = document.getElementById('ob_nav_last');
const navIdInp = document.getElementById('ob_nav_id');
const navCounter = document.getElementById('ob_nav_counter');

let customersCache = [];
let suppliersCache = [];
let accountsCache = [];
let cachesLoaded = false;

// Screen mode state: 'view' | 'new' | 'edit'
let obScreenMode = 'view';
let obEditUnlockedForId = null;
let currentOpeningId = null;
let obSaveInFlight = false;
function getOpeningDisplayNumber(){
  const value = parseInt(document.getElementById('ob_id')?.value || '', 10);
  return Number.isFinite(value) && value > 0 ? value : 0;
}
function getOpeningInternalId(){
  const value = Number(currentOpeningId || 0);
  return Number.isFinite(value) && value > 0 ? value : 0;
}
function getOpeningBranchScopeMode(){
  try {
    const params = new URLSearchParams(window.location.search || '');
    const scopeFromUrl = String(params.get('branchScope') || params.get('branch_scope') || '').trim().toLowerCase();
    if (scopeFromUrl === 'all') return 'all';
  } catch (_) {}
  try {
    const raw = window.localStorage.getItem('branchScope');
    if (!raw) return 'branch';
    const parsed = JSON.parse(raw);
    return String(parsed?.mode || parsed?.scope || parsed?.value || '').trim().toLowerCase() === 'all' ? 'all' : 'branch';
  } catch (_) {
    return 'branch';
  }
}
function isOpeningAllBranchesScope(){
  return getOpeningBranchScopeMode() === 'all';
}
function getOpeningNavNumber(header, fallbackId = 0){
  const internalId = Number(header?.id || fallbackId || 0) || 0;
  const branchLocalNumber = Number(header?.branch_local_number || 0) || 0;
  return branchLocalNumber || internalId || 0;
}
function buildOpeningNavRecords(rows = []){
  return (Array.isArray(rows) ? rows : [])
    .map((row) => {
      const internalId = Number(row?.id || 0) || 0;
      return {
        id: internalId,
        navNumber: getOpeningNavNumber(row, internalId),
      };
    })
    .filter((row) => row.id > 0)
    .sort((left, right) => {
      const leftNavNumber = Number(left?.navNumber || 0) || 0;
      const rightNavNumber = Number(right?.navNumber || 0) || 0;
      if (leftNavNumber !== rightNavNumber) {
        return leftNavNumber - rightNavNumber;
      }
      return left.id - right.id;
    });
}
function findOpeningIdByNavNumber(value){
  const targetNavNumber = Number(value || 0) || 0;
  if (targetNavNumber <= 0) {
    return 0;
  }
  const matches = obNavRecords.filter((row) => Number(row?.navNumber || 0) === targetNavNumber);
  if (!matches.length) {
    return 0;
  }
  const currentId = getOpeningInternalId();
  const currentMatch = matches.find((row) => row.id === currentId);
  return Number(currentMatch?.id || matches[matches.length - 1]?.id || 0) || 0;
}
function getOpeningCounterDisplay(){
  if (isOpeningAllBranchesScope()) {
    const total = obIds.length;
    const current = obIndex >= 0 && obIndex < total ? obIndex + 1 : 0;
    return { current, total };
  }
  const resolvedIndex = obIndex >= 0 && obIndex < obNavRecords.length
    ? obIndex
    : obIds.findIndex((id) => id === getOpeningInternalId());
  const current = Number(obNavRecords[resolvedIndex]?.navNumber || 0) || 0;
  const total = Number(obNavRecords[obNavRecords.length - 1]?.navNumber || 0) || 0;
  return { current, total };
}

// Unsaved changes state
let obHasUnsavedChanges = false;
let obPendingUnsavedResolve = null;

// Unsaved changes modal elements
const obUnsavedModal = document.getElementById('unsavedChangesModal');
const obUnsavedClose = document.getElementById('unsavedChangesClose');
const obUnsavedStayBtn = document.getElementById('unsavedStayBtn');
const obUnsavedLeaveBtn = document.getElementById('unsavedLeaveBtn');

function obMarkUnsaved() {
  if (obScreenMode === 'edit' || obScreenMode === 'new') {
    obHasUnsavedChanges = true;
  }
}

function obResetUnsaved() {
  obHasUnsavedChanges = false;
}

function obOpenUnsavedModal() {
  if (!obUnsavedModal) return Promise.resolve(true);
  return new Promise(resolve => {
    obPendingUnsavedResolve = resolve;
    obUnsavedModal.classList.add('show');
    obUnsavedModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
}

function obCloseUnsavedModal(result = false) {
  if (obUnsavedModal) {
    obUnsavedModal.classList.remove('show');
    obUnsavedModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  if (obPendingUnsavedResolve) {
    obPendingUnsavedResolve(!!result);
    obPendingUnsavedResolve = null;
  }
}

// Wire unsaved-changes modal buttons
if (obUnsavedClose) obUnsavedClose.addEventListener('click', () => obCloseUnsavedModal(false));
if (obUnsavedStayBtn) obUnsavedStayBtn.addEventListener('click', () => obCloseUnsavedModal(false));
if (obUnsavedLeaveBtn) obUnsavedLeaveBtn.addEventListener('click', () => { obResetUnsaved(); obCloseUnsavedModal(true); });
if (obUnsavedModal) {
  const backdrop = obUnsavedModal.querySelector('.permission-denied-backdrop');
  if (backdrop) backdrop.addEventListener('click', () => obCloseUnsavedModal(false));
}

// Expose guard for outer shell
window.canLeaveOpeningBalance = async function () {
  if (!obHasUnsavedChanges || obScreenMode === 'view') return true;
  try {
    const result = await obOpenUnsavedModal();
    return !!result;
  } catch (e) { return true; }
};

// Track changes on header fields and lines table
const obHeaderInputs = ['ob_date', 'ob_time', 'ob_memo'];
obHeaderInputs.forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    ['input', 'change'].forEach(evt => el.addEventListener(evt, () => obMarkUnsaved()));
  }
});
if (tbody) {
  tbody.addEventListener('input', () => obMarkUnsaved());
  tbody.addEventListener('change', () => obMarkUnsaved());
}

function ob_setReadOnly(isReadOnly){
  const dateEl = document.getElementById('ob_date');
  const timeEl = document.getElementById('ob_time');
  const memoEl = document.getElementById('ob_memo');
  if (dateEl) dateEl.disabled = isReadOnly;
  if (timeEl) timeEl.disabled = isReadOnly;
  if (memoEl) memoEl.disabled = isReadOnly;

  const copyBtn = document.getElementById('ob_btnCopyMemo');
  if (btnAddLine) btnAddLine.disabled = isReadOnly;
  if (copyBtn) copyBtn.disabled = isReadOnly;

  if (tbody){
    tbody.querySelectorAll('input,select,button').forEach(el => {
      el.disabled = isReadOnly;
    });
  }

  if (btnSave){
    if (obScreenMode === 'edit'){
      btnSave.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${tOb('btnSaveEdit')}`;
    } else {
      btnSave.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${tOb('btnSave')}`;
    }
    btnSave.disabled = (obScreenMode === 'view');
  }

  if (btnNew){
    btnNew.disabled = (obScreenMode === 'new' || obScreenMode === 'edit');
  }

  if (btnEdit){
    const hasId = !!currentOpeningId;
    btnEdit.disabled = !hasId || obScreenMode !== 'view';
  }

  if (btnDelete){
    const hasId = !!currentOpeningId;
    if (obScreenMode === 'new' || (obScreenMode === 'edit' && hasId)){
      btnDelete.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> ${tOb('btnCancel')}`;
      btnDelete.disabled = false;
    } else {
      btnDelete.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> ${tOb('btnDelete')}`;
      btnDelete.disabled = !hasId;
    }
  }

  const inEdit = (obScreenMode !== 'view');
  if (navFirst) navFirst.disabled = inEdit ? true : navFirst.disabled;
  if (navPrev)  navPrev.disabled  = inEdit ? true : navPrev.disabled;
  if (navNext)  navNext.disabled  = inEdit ? true : navNext.disabled;
  if (navLast)  navLast.disabled  = inEdit ? true : navLast.disabled;
  if (navIdInp) navIdInp.disabled = inEdit;
}

// ===== دالة تحويل الأرقام إلى كلمات عربية =====
function arabicIntToWords(num){
  if (num===0) return 'صفر';
  const ones=['','واحد','اثنان','ثلاثة','أربعة','خمسة','ستة','سبعة','ثمانية','تسعة'];
  const tens=['','عشرة','عشرون','ثلاثون','أربعون','خمسون','ستون','سبعون','ثمانون','تسعون'];
  const teens=['عشرة','أحد عشر','اثنا عشر','ثلاثة عشر','أربعة عشر','خمسة عشر','ستة عشر','سبعة عشر','ثمانية عشر','تسعة عشر'];
  function below100(n){
    if (n<10) return ones[n];
    if (n<20) return teens[n-10];
    const t=Math.floor(n/10), o=n%10;
    return o? `${ones[o]} و${tens[t]}` : tens[t];
  }
  function below1000(n){
    if (n<100) return below100(n);
    const h=Math.floor(n/100), r=n%100;
    const hW = h===1?'مائة': h===2?'مئتان': (h>=3? `${ones[h]} مائة`: '');
    return r? `${hW} و${below100(r)}` : hW;
  }
  const scales=[{v:1e12,n:'ترليون'},{v:1e9,n:'مليار'},{v:1e6,n:'مليون'},{v:1e3,n:'ألف'}];
  let n=num; const parts=[];
  for (const s of scales){
    if (n>=s.v){ const c=Math.floor(n/s.v); parts.push(`${below1000(c)} ${s.n}`); n%=s.v; }
  }
  if (n>0) parts.push(below1000(n));
  return parts.join(' و ');
}
function toArabicWordsCash(n){
  const num = Math.abs(Number(n)||0);
  const intPart = Math.floor(num);
  const frac = Math.round((num - intPart) * 100);
  const words = arabicIntToWords(intPart);
  const fracWords = frac ? ` و${arabicIntToWords(frac)} هللة` : '';
  return `${words} ريال${fracWords}`.trim();
}
function toArabicWordsGold(n){
  const num = Math.abs(Number(n)||0);
  const intPart = Math.floor(num);
  const frac = Math.round((num - intPart) * 100);
  const base = `${arabicIntToWords(intPart)} جرام`;
  return frac ? `${base} و${arabicIntToWords(frac)} مل` : base;
}

// ===== English number-to-words functions =====
function englishIntToWords(num){
  if (num===0) return 'zero';
  const ones=['','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
  const tens=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
  function below100(n){
    if (n<20) return ones[n];
    const t=Math.floor(n/10), o=n%10;
    return o? `${tens[t]}-${ones[o]}` : tens[t];
  }
  function below1000(n){
    if (n<100) return below100(n);
    const h=Math.floor(n/100), r=n%100;
    return r? `${ones[h]} hundred ${below100(r)}` : `${ones[h]} hundred`;
  }
  const scales=[{v:1e12,n:'trillion'},{v:1e9,n:'billion'},{v:1e6,n:'million'},{v:1e3,n:'thousand'}];
  let n=num; const parts=[];
  for (const s of scales){
    if (n>=s.v){ const c=Math.floor(n/s.v); parts.push(`${below1000(c)} ${s.n}`); n%=s.v; }
  }
  if (n>0) parts.push(below1000(n));
  return parts.join(' ');
}
function toEnglishWordsCash(n){
  const num = Math.abs(Number(n)||0);
  const intPart = Math.floor(num);
  const frac = Math.round((num - intPart) * 100);
  const words = englishIntToWords(intPart);
  const fracWords = frac ? ` and ${englishIntToWords(frac)} halalas` : '';
  return `${words} riyals${fracWords}`.trim();
}
function toEnglishWordsGold(n){
  const num = Math.abs(Number(n)||0);
  const intPart = Math.floor(num);
  const frac = Math.round((num - intPart) * 100);
  const base = `${englishIntToWords(intPart)} grams`;
  return frac ? `${base} and ${englishIntToWords(frac)} milligrams` : base;
}

// Language-aware wrappers
function toWordsCash(n){
  return getOpeningLang() === 'en' ? toEnglishWordsCash(n) : toArabicWordsCash(n);
}
function toWordsGold(n){
  return getOpeningLang() === 'en' ? toEnglishWordsGold(n) : toArabicWordsGold(n);
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

// Format number with thousand separators (1,000.00)
function formatNumberWithCommas(value) {
  if (!value && value !== 0) return '';
  
  // Convert to string and remove existing commas
  let strValue = String(value).replace(/,/g, '');
  
  // Split into integer and decimal parts
  const parts = strValue.split('.');
  let integerPart = parts[0];
  const decimalPart = parts[1];
  
  // Add commas to integer part
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  // Combine back
  if (decimalPart !== undefined) {
    return integerPart + '.' + decimalPart;
  }
  return integerPart;
}

// Helper function for arrow key navigation between rows
function handleArrowNavigation(e, currentInput, fieldName) {
  // Always allow arrow navigation for all fields - no Ctrl/Alt required
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    const currentRow = currentInput.closest('tr');
    const nextRow = currentRow.nextElementSibling;
    if (nextRow) {
      nextRow.querySelector(`[name="${fieldName}"]`)?.focus();
    }
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    const currentRow = currentInput.closest('tr');
    const prevRow = currentRow.previousElementSibling;
    if (prevRow) {
      prevRow.querySelector(`[name="${fieldName}"]`)?.focus();
    }
  }
}

// Initialize screen in view/read-only mode by default
obScreenMode = 'view';
obEditUnlockedForId = null;
currentOpeningId = null;
ob_setReadOnly(true);

// Check if a row is empty (no data entered)
function isRowEmpty(row) {
  if (!row) return true;
  const customerId = row.querySelector('input[name="customer_id"]')?.value?.trim();
  const supplierId = row.querySelector('input[name="supplier_id"]')?.value?.trim();
  const accountId = row.querySelector('input[name="account_id"]')?.value?.trim();
  const amount = parseFloat(row.querySelector('input[name="amount"]')?.value?.replace(/,/g, '') || '0') || 0;
  const weight = parseFloat(row.querySelector('input[name="weight"]')?.value?.replace(/,/g, '') || '0') || 0;
  const note = row.querySelector('input[name="note"]')?.value?.trim();
  return !customerId && !supplierId && !accountId && amount === 0 && weight === 0 && !note;
}

// Add new row or focus existing empty row
function addOrFocusEmptyRow() {
  const rows = Array.from(tbody.children);
  const empty = rows.find(r => isRowEmpty(r));
  if (empty) {
    // Focus the first input in the empty row
    setTimeout(() => {
      const first = empty.querySelector('input[name="customer_id"]');
      if (first) first.focus();
    }, 0);
    return empty;
  }
  // All rows have data, add a new row
  const noteVal = document.getElementById('ob_memo')?.value || '';
  addRow({ note: noteVal, karat:'21', type:'debit' });
  const newRow = tbody.lastElementChild;
  setTimeout(() => {
    const first = newRow?.querySelector('input[name="customer_id"]');
    if (first) first.focus();
  }, 0);
  return newRow;
}

// Helper: Get username by user ID
async function getUserNameById(userId) {
  if (!userId) return null;
  try {
    // Try to get user from API
    if (window.sys && typeof window.sys.getUserById === 'function') {
      const result = await window.sys.getUserById(userId);
      if (result && result.success && result.user) {
        return result.user.username || result.user.name || null;
      }
    }
    // Fallback: if getting all users is available
    if (window.sys && typeof window.sys.getUsers === 'function') {
      const result = await window.sys.getUsers();
      if (result && result.success && Array.isArray(result.users)) {
        const user = result.users.find(u => u.id === userId);
        if (user) return user.username || user.name || null;
      }
    }
  } catch (e) {
    
  }
  return null;
}

async function loadCaches(){
  if (loadCaches._inFlight) return loadCaches._inFlight;

  loadCaches._inFlight = (async () => {
    const [r1, r2, r3] = await Promise.all([
      (async () => { try { return await window.db?.getCustomers?.(); } catch (_) { return null; } })(),
      (async () => { try { return await window.suppliers?.getSuppliers?.(); } catch (_) { return null; } })(),
      (async () => { try { return await window.accounts?.getAccounts?.(); } catch (_) { return null; } })()
    ]);

    customersCache = (r1 && r1.success) ? (r1.data || []) : [];
    suppliersCache = (r2 && r2.success) ? (r2.data || []) : [];
    accountsCache = (r3 && r3.success) ? (r3.data || []) : [];

    cachesLoaded = true;
    return { customersCache, suppliersCache, accountsCache };
  })();

  try {
    return await loadCaches._inFlight;
  } finally {
    loadCaches._inFlight = null;
  }
}

function getOpeningLookupAccounts(rows){
  const allRows = Array.isArray(rows) ? rows.filter(Boolean) : [];
  const leafRows = allRows.filter(x => x.is_parent !== 1);
  if (!leafRows.length) return leafRows;
  const excludedRootCodes = new Set(['114', '211']);
  const excludedRootIds = allRows
    .filter(x => excludedRootCodes.has(String(x.code || '').trim()))
    .map(x => String(x.id));
  if (!excludedRootIds.length) return leafRows;
  const childrenByParent = new Map();
  for (const account of allRows){
    const parentKey = account?.parent_id == null ? '' : String(account.parent_id);
    if (!childrenByParent.has(parentKey)) childrenByParent.set(parentKey, []);
    childrenByParent.get(parentKey).push(account);
  }
  const excludedIds = new Set(excludedRootIds);
  const queue = [...excludedRootIds];
  while (queue.length){
    const parentId = String(queue.shift());
    const children = childrenByParent.get(parentId) || [];
    for (const child of children){
      const childId = String(child?.id || '');
      if (!childId || excludedIds.has(childId)) continue;
      excludedIds.add(childId);
      queue.push(childId);
    }
  }
  return leafRows.filter(x => !excludedIds.has(String(x.id)));
}

async function waitForOpening(maxMs = 3000){
  const start = Date.now();
  while (Date.now() - start < maxMs){
    if (window.opening && typeof window.opening.get === 'function' && typeof window.opening.list === 'function') return true;
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  return !!(window.opening && typeof window.opening.get === 'function');
}

function getOpeningQueryId(){
  try{
    const params = new URLSearchParams(window.location.search || '');
    const idStr = params.get('id');
    const oid = idStr ? parseInt(idStr, 10) : 0;
    return Number.isFinite(oid) && oid > 0 ? oid : null;
  }catch(_){ return null; }
}

const OB_MIN_ROWS = 5;

function ob_ensureMinimumRows(minRows = OB_MIN_ROWS){
  if (!tbody) return;
  const currentRows = tbody.children.length;
  for (let i = currentRows; i < minRows; i++) {
    addRow({ karat:'21', type:'debit' });
  }
}

function ob_resetToMinimumRows(minRows = OB_MIN_ROWS){
  if (!tbody) return;
  tbody.innerHTML = '';
  ob_ensureMinimumRows(minRows);
}

loadCaches();
try{ 
  document.addEventListener('DOMContentLoaded', ()=>{ 
    applyOpeningStaticTexts();
    loadCaches(); 
  }); 
}catch(_){ }

// Apply translations immediately
applyOpeningStaticTexts();

// Auto-load last opening entry on init
(async function autoLoadInit(){
  // ✅ Initialize screen permissions
  if (window.ScreenPermissions) {
    await window.ScreenPermissions.init();
  }
  ob_ensureMinimumRows();
  computeTotals();
  await loadCaches();
  await waitForOpening(5000);
  
  try{
    const oid = getOpeningQueryId();
    if (oid){
      await ob_refreshIdsAndIndex(oid);
      await ob_loadById(oid);
      return;
    }
    // Otherwise load last entry if available
    await ob_refreshIdsAndIndex();
    if (obIds && obIds.length){
      obIndex = obIds.length - 1; // show latest
      await ob_loadById(obIds[obIndex]);
    } else {
      await ob_new();
    }
  }catch(_){ }
  
  // ✅ Ensure time is set after loading
  const timeEl = document.getElementById('ob_time');
  if (timeEl && !timeEl.value) {
    const now = new Date();
    timeEl.value = now.toTimeString().slice(0, 5);
  }
})();

// ===== Navigation =====
let obIds = [];
let obNavRecords = [];
let obIndex = -1;
async function ob_fetchIds(){
  try{
    await waitForOpening();
    const r = await (window.opening?.list?.());
    if (r && r.success){
      const arr = Array.isArray(r.rows) ? r.rows : (Array.isArray(r.data) ? r.data : []);
      return arr;
    }
  }catch(_){ }
  return [];
}
async function ob_refreshIdsAndIndex(targetId=null){
  obNavRecords = buildOpeningNavRecords(await ob_fetchIds());
  obIds = obNavRecords.map((row) => row.id);
  if (targetId && obIds.length){ obIndex = Math.max(0, obIds.findIndex(id=>id===targetId)); }
  else { obIndex = obIds.length ? obIds.length - 1 : -1; }
  if (navCounter){ const { current, total } = getOpeningCounterDisplay(); navCounter.textContent = `${current} / ${total}`; }
  if (navIdInp && targetId){
    const targetRecord = obNavRecords.find((row) => row.id === targetId);
    navIdInp.value = String(Number(targetRecord?.navNumber || targetId) || '');
  }
  const atStart = obIndex <= 0; const atEnd = obIds && obIndex >= obIds.length - 1;
  if (navFirst) navFirst.disabled = !!atStart;
  if (navPrev)  navPrev.disabled  = !!atStart;
  if (navNext)  navNext.disabled  = !!atEnd;
  if (navLast)  navLast.disabled  = !!atEnd;
  return obIds;
}
async function ob_getLastId(){
  try{
    await waitForOpening();
    const navRecords = buildOpeningNavRecords(await ob_fetchIds());
    if (navRecords.length) {
      return navRecords[navRecords.length - 1].id;
    }
    const n = await (window.opening?.getNextId?.());
    const last = (n && n.success && n.nextId) ? (parseInt(n.nextId,10)-1) : 0;
    return last > 0 ? last : null;
  }catch(_){ return null; }
}

async function ob_loadById(id, options = {}){
  if (!id || !window.opening?.get) return;
  try{
    await waitForOpening();
    // Ensure caches are available before rendering names
    if (!cachesLoaded) await loadCaches();
    if (!obIds || !obIds.length){ await ob_refreshIdsAndIndex(); }
    const requestPayload = options?.lookupByBranchLocalNumber
      ? { id, lookupByBranchLocalNumber: true }
      : id;
    const resp = await window.opening.get(requestPayload);
    if (!resp || !resp.success) return;
    const data = resp.data || {};
    const hdr = data.header || {};
    const lines = data.lines || [];
    currentOpeningId = hdr.id ?? id;
    const idEl = document.getElementById('ob_id'); if (idEl) idEl.value = hdr.branch_local_number || hdr.id || id;
    if (navIdInp) navIdInp.value = String(getOpeningNavNumber(hdr, id) || '');
    // Fill header fields if present
    // Use local date fallback (not UTC)
    const dateEl = document.getElementById('ob_date'); 
    if (dateEl) { 
      if (hdr.date) { dateEl.value = hdr.date; }
      else if (hdr.created_at) { dateEl.value = String(hdr.created_at).substring(0,10); }
      else { const d = new Date(); dateEl.value = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0'); }
    }
    const timeEl = document.getElementById('ob_time'); 
    if (timeEl) {
      if (hdr.time && hdr.time.trim()) {
        timeEl.value = hdr.time;
      } else {
        const now = new Date();
        timeEl.value = now.toTimeString().slice(0, 5);
      }
    }
    const memoEl = document.getElementById('ob_memo'); if (memoEl) memoEl.value = hdr.memo || '';
    // Fill lines
    if (tbody){
      tbody.innerHTML='';
      if (Array.isArray(lines) && lines.length){ lines.forEach(L=> addRow(L)); }
      ob_ensureMinimumRows();
      // Recompute totals after populating lines to keep header totals in sync
      computeTotals();
      // Recompute name cells now that caches are ensured
      tbody.querySelectorAll('tr').forEach(tr=>{
        const get = n => tr.querySelector(`[name="${n}"]`)?.value || '';
        const cid = get('customer_id');
        const sid = get('supplier_id');
        const aid = get('account_id');
        const nameEl = tr.querySelector('input[name="name"]');
        if (nameEl){ nameEl.value = getNameByIds(cid, sid, aid) || ''; }
      });
    }
    // Enable delete button for persisted doc
    if (btnDelete) btnDelete.disabled = !(hdr && (hdr.id||id));
    // Update counter state
    if (navCounter && obIds && obIds.length){ const pos = obIds.findIndex(x=>x===Number(currentOpeningId || hdr.id || id)); obIndex = pos >=0 ? pos : obIndex; const { current, total } = getOpeningCounterDisplay(); navCounter.textContent = `${current} / ${total}`; }
    const atStart = obIndex <= 0; const atEnd = obIds && obIndex >= obIds.length - 1;
    if (navFirst) navFirst.disabled = !!atStart; if (navPrev) navPrev.disabled = !!atStart; if (navNext) navNext.disabled = !!atEnd; if (navLast) navLast.disabled = !!atEnd;
    
    // Display user tracking info
    const trackingDiv = document.getElementById('ob_user_tracking_info');
    const createdInfo = document.getElementById('ob_created_info');
    if (trackingDiv && createdInfo) {
      let hasInfo = false;
      let allInfo = [];
      
      // Handle created_by info
      const isEnglish = getOpeningLang() === 'en';
      if (hdr.created_by || hdr.created_by_name || hdr.created_at) {
        hasInfo = true;
        let createdText = `<i class="fa-solid fa-user-plus" style="margin-inline-end:6px; color:#10b981;"></i> ${tOb('createdBy')} `;
        
        // Use username for English, full_name for Arabic
        let createdByName = isEnglish 
          ? (hdr.created_by_username || hdr.created_by_name)
          : (hdr.created_by_name || hdr.created_by_username);
        if (!createdByName && hdr.created_by) {
          const userName = await getUserNameById(hdr.created_by);
          if (userName) createdByName = userName;
        }
        
        if (createdByName) {
          createdText += `<strong>${createdByName}</strong>`;
        }
        
        if (hdr.created_at) {
          const createdDate = new Date(hdr.created_at);
          const dateStr = createdDate.toLocaleDateString('en-GB');
          const timeStr = createdDate.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});
          createdText += ` <span style="color:var(--subtle);">${dateStr} ${timeStr}</span>`;
        }
        allInfo.push(createdText);
      }
      
      // Handle updated_by info
      if (hdr.updated_by || hdr.updated_by_name || hdr.updated_at) {
        hasInfo = true;
        let updatedText = `<i class="fa-solid fa-user-clock" style="margin-inline-end:6px; color:#f59e0b;"></i> ${tOb('lastModified')} `;
        
        // Use username for English, full_name for Arabic
        let updatedByName = isEnglish 
          ? (hdr.updated_by_username || hdr.updated_by_name)
          : (hdr.updated_by_name || hdr.updated_by_username);
        if (!updatedByName && hdr.updated_by) {
          const userName = await getUserNameById(hdr.updated_by);
          if (userName) updatedByName = userName;
        }
        
        if (updatedByName) {
          updatedText += `<strong>${updatedByName}</strong>`;
        }
        
        if (hdr.updated_at) {
          const updatedDate = new Date(hdr.updated_at);
          const dateStr = updatedDate.toLocaleDateString('en-GB');
          const timeStr = updatedDate.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});
          updatedText += ` <span style="color:var(--subtle);">${dateStr} ${timeStr}</span>`;
        }
        allInfo.push(updatedText);
      }
      
      if (hasInfo) {
        createdInfo.innerHTML = `<div style="display:flex; gap:30px; flex-wrap:wrap;">${allInfo.join('')}</div>`;
      }
      trackingDiv.style.display = hasInfo ? 'block' : 'none';
    }
    // After loading any document, ensure we're in view mode/read-only
    obScreenMode = 'view';
    obEditUnlockedForId = null;
    ob_setReadOnly(true);
    obResetUnsaved();
  }catch(_){ }
}

// Wire pager events
if (navFirst) navFirst.addEventListener('click', async ()=>{ if (!obIds.length) await ob_refreshIdsAndIndex(); if (!obIds.length) return; obIndex = 0; ob_loadById(obIds[0]); });

// ===== Print current opening balance =====
if (btnPrint) btnPrint.addEventListener('click', async ()=>{
  const internalId = getOpeningInternalId();
  const id = getOpeningDisplayNumber() || internalId;
  const date = document.getElementById('ob_date')?.value || '';
  const time = document.getElementById('ob_time')?.value || '';
  const memo = document.getElementById('ob_memo')?.value || '';
  if (!internalId) {
    showToast('error', tOb('toastSaveFirst'));
    return;
  }
  const rows = [];
  if (tbody){
    tbody.querySelectorAll('tr').forEach(tr=>{
      const get = n => {
        const val = tr.querySelector(`[name="${n}"]`)?.value || '';
        // Remove commas for numeric fields
        if (n === 'amount' || n === 'weight') {
          return val.replace(/,/g, '');
        }
        return val;
      };
      rows.push({
        type: get('type'),
        amount: get('amount'),
        weight: get('weight'),
        karat:  get('karat'),
        customer_id: get('customer_id'),
        supplier_id: get('supplier_id'),
        account_id: get('account_id'),
        id: (get('customer_id')||get('supplier_id')||get('account_id')||''),
        note: get('note')
      });
    });
  }
  const nf2 = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  // Get account names from cache
  const getAccountName = (L) => getNameByIds(L.customer_id, L.supplier_id, L.account_id) || '';
  const lang = getOpeningLang();
  const dir = lang === 'en' ? 'ltr' : 'rtl';
  const rowsHtml = rows.map((L,i)=>`<tr>
    <td>${L.id||''}</td>
    <td>${getAccountName(L)}</td>
    <td>${L.type==='credit' ? tOb('printCredit') : tOb('printDebit')}</td>
    <td>${nf2.format(Number(L.amount||0) || 0)}</td>
    <td>${nf2.format(Number(L.weight||0) || 0)}</td>
    <td>${L.karat||''}</td>
    <td>${(L.note||'')}</td>
  </tr>`).join('');
  // Totals for print - by karat
  let amtDebit=0, amtCredit=0;
  const goldByKarat = {}; // { karat: { debit: 0, credit: 0 } }
  let totalDebit21 = 0, totalCredit21 = 0; // Converted to karat 21
  
  rows.forEach(L=>{
    const a = Number(L.amount||0) || 0;
    const w = Number(L.weight||0) || 0;
    const karat = Number(L.karat) || 21;
    const isCredit = (L.type||'debit')==='credit';
    
    if (isCredit) amtCredit += Math.abs(a);
    else amtDebit += Math.abs(a);
    
    if (w > 0) {
      if (!goldByKarat[karat]) goldByKarat[karat] = { debit: 0, credit: 0 };
      if (isCredit) goldByKarat[karat].credit += Math.abs(w);
      else goldByKarat[karat].debit += Math.abs(w);
      // Convert to karat 21
      const w21 = (Math.abs(w) * karat) / 21;
      if (isCredit) totalCredit21 += w21;
      else totalDebit21 += w21;
    }
  });
  
  // Only show converted totals (karat 21)
  const goldTotalsHtml = `
    <div class="total-cell" style="background:#0f2940"><div class="total-label">${tOb('printWeightDebit21')}</div><div class="total-value">${nf2.format(totalDebit21)}</div></div>
    <div class="total-cell" style="background:#0f2940"><div class="total-label">${tOb('printWeightCredit21')}</div><div class="total-value">${nf2.format(totalCredit21)}</div></div>`;
  const totalColumns = 4; // نقد مدين + نقد دائن + وزن مدين + وزن دائن
  // Company info
  let company = {};
  try{ if (window.api && window.api.getCompanyInfo){ const r = await window.api.getCompanyInfo(); if (r && r.success) company = r.company || {}; } }catch(_){ }
  const logoUrl = (company && company.logoData) ? company.logoData : (company && company.logo ? ('file:///' + String(company.logo).replace(/\\/g,'/')) : '');
  const nameAr = company.name || 'اسم الشركة';
  const nameEn = company.name_en || company.name || 'Company Name';
  const addressAr = company.address || '';
  const addressEn = company.address_en || company.address || '';
  const phone = company.phone || '';
  const email = company.email || '';
  const taxNo = company.tax || '';
  
  // Branch scope chip (replaces top branch scope badge)
  const isRtlOb = lang === 'ar';
  const branchScopeChipOb = (() => {
    try {
      const scope = window.currentBranchScopeContext || null;
      const branch = window.currentBranchContext || null;
      const label = isRtlOb ? 'نطاق الفرع:' : 'Branch Scope:';
      if (scope && String(scope.mode || '').toLowerCase() === 'all') {
        return { label, value: isRtlOb ? 'كل الفروع' : 'All Branches' };
      }
      const code = String(branch?.code || '').trim();
      const name = String((isRtlOb ? (branch?.name || branch?.name_en) : (branch?.name_en || branch?.name)) || '').trim();
      const value = code && name ? `${code} - ${name}` : (name || code || (isRtlOb ? 'غير محدد' : 'Not selected'));
      return { label, value };
    } catch (_) {
      return { label: isRtlOb ? 'نطاق الفرع:' : 'Branch Scope:', value: '' };
    }
  })();

  // New professional design (matching receipt/voucher/journal)
  const docHtml = `<!doctype html><html lang="${lang}" dir="${dir}" data-skip-branch-scope-badge="1"><head><meta charset="utf-8"><title>${tOb('printTitle')} #${id}</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet">
    <style>
      @page { size: A4; margin: 10mm; }
      @media print and (orientation: landscape) { @page { size: A4 landscape; margin: 10mm; } }
      * { margin: 0; padding: 0; box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      body { font-family: 'Cairo', sans-serif; background: #fff; color: #333; font-size: 12px; padding: 15px; }
      .container { max-width: 100%; border: 2px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
      .header { padding: 12px 20px; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%) !important; border-bottom: 2px solid #f59e0b; }
      .header-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 20px; direction: ltr; }
      .company-info { flex: 1; }
      .company-info.left { text-align: left; direction: ltr; }
      .company-info.right { text-align: right; direction: rtl; }
      .company-name { font-size: 18px; font-weight: 700; color: #1f2937; margin-bottom: 6px; }
      .info-item { display: flex; align-items: center; gap: 8px; margin: 4px 0; font-size: 11px; color: #374151; }
      .info-item i { color: #f59e0b; font-size: 11px; }
      .company-details { font-size: 11px; color: #374151; }
      .logo { width: 110px; height: 110px; border: 3px solid #f59e0b; border-radius: 50%; overflow: hidden; background: #fff; display: flex; align-items: center; justify-content: center; margin: 0 auto; }
      .logo img { max-width: 92%; max-height: 92%; object-fit: contain; }
      .opening-title { position: relative; background: #374151 !important; color: #fff; text-align: center; padding: 10px 20px; font-size: 18px; font-weight: 700; display: flex; align-items: center; justify-content: center; border-radius: 12px; margin: 8px 12px; }
      .opening-title-chips { position: absolute; right: 15px; top: 50%; transform: translateY(-50%); display: flex; align-items: center; gap: 6px; }
      .opening-date-chip, .opening-branch-chip { padding: 4px 12px; border-radius: 999px; background: linear-gradient(135deg, #fef3c7, #fde68a); color: #374151; font-size: 11px; font-weight: 600; border: 1px solid rgba(249,250,251,0.7); box-shadow: 0 2px 4px rgba(0,0,0,0.2); white-space: nowrap; }
      .info-grid { display: grid; grid-template-columns: repeat(3, 1fr); border-bottom: 1px solid #e5e7eb; background: #fff; gap: 6px; padding: 8px 12px; }
      .info-grid .info-item { display: flex; align-items: center; padding: 6px 12px; border-radius: 999px; border: 1px solid #e5e7eb; background: #f9fafb; box-shadow: 0 1px 2px rgba(0,0,0,0.04); }
      .info-grid .info-item i { margin-inline-end: 6px; font-size: 11px; color: #f59e0b; }
      .info-label { color: #666; font-size: 11px; min-width: 60px; }
      .info-value { font-weight: 600; color: #333; flex: 1; }
      .table-wrapper { border-radius: 12px; overflow: hidden; margin: 8px 12px 10px; border: 2px solid #f59e0b; }
      .details-table { width: 100%; border-collapse: collapse; }
      .details-table th { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%) !important; color: #1f2937; padding: 10px 8px; font-size: 12px; font-weight: 600; text-align: center; border: 1px solid #f59e0b; }
      .details-table td { padding: 10px 8px; text-align: center; border: 1px solid #e5e7eb; font-size: 11px; background: #fff; }
      .details-table tbody tr:nth-child(even) td { background: #fefefe; }
      .totals { background: linear-gradient(135deg, #1e3a5f 0%, #2d4a6f 100%) !important; padding: 12px; border-radius: 12px; margin: 8px 12px 0; }
      .totals-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
      .total-box { background: transparent; border: 1px solid #3d5a7f; border-radius: 6px; padding: 10px; text-align: center; }
      .total-box .lbl { font-size: 9px; color: #93c5fd; margin-bottom: 4px; }
      .total-box .val { font-size: 13px; font-weight: 700; color: #fff; }
      .print-btn { position: fixed; bottom: 20px; left: 20px; background: #374151; color: #fff; border: none; padding: 12px 25px; border-radius: 25px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit; }
      @media print { .no-print { display: none !important; } body { padding: 0; } .container { border: none; } }
    </style>
  </head><body>
    <div class="container">
      <div class="header">
        <div class="header-top">
          <div class="company-info left">
            <div class="company-name">${nameEn}</div>
            <div class="info-item"><i class="fa-solid fa-location-dot"></i><span class="company-details">${addressEn ? tOb('companyAddress')+' '+addressEn : ''}</span></div>
            <div class="info-item"><i class="fa-solid fa-phone"></i><span class="company-details">${phone ? tOb('companyPhone')+' '+phone : ''}</span></div>
            <div class="info-item"><i class="fa-solid fa-envelope"></i><span class="company-details">${email ? tOb('companyEmail')+' '+email : ''}</span></div>
            <div class="info-item"><i class="fa-solid fa-file-invoice"></i><span class="company-details">${taxNo ? tOb('companyTax')+' '+taxNo : ''}</span></div>
          </div>
          <div class="logo">${logoUrl ? '<img src="'+logoUrl+'" alt="Logo">' : ''}</div>
          <div class="company-info right">
            <div class="company-name">${nameAr}</div>
            <div class="info-item"><i class="fa-solid fa-location-dot"></i><span class="company-details">${addressAr ? tOb('companyAddress')+' '+addressAr : ''}</span></div>
            <div class="info-item"><i class="fa-solid fa-phone"></i><span class="company-details">${phone ? tOb('companyPhone')+' '+phone : ''}</span></div>
            <div class="info-item"><i class="fa-solid fa-envelope"></i><span class="company-details">${email ? tOb('companyEmail')+' '+email : ''}</span></div>
            <div class="info-item"><i class="fa-solid fa-file-invoice"></i><span class="company-details">${taxNo ? tOb('companyTax')+' '+taxNo : ''}</span></div>
          </div>
        </div>
        <div class="opening-title">
          <div class="opening-date-chip">${tOb('printDate')} ${date}</div>
          ${branchScopeChipOb.value ? `<div class="opening-branch-chip">${branchScopeChipOb.label} ${branchScopeChipOb.value}</div>` : ''}
          <span>${tOb('printOpeningNo')} ${id}</span>
        </div>
      </div>
      <div class="info-grid">
        <div class="info-item">
          <i class="fa-solid fa-clock"></i>
          <span class="info-label">${tOb('printTime')}</span>
          <span class="info-value">${time || '-'}</span>
        </div>
        <div class="info-item" style="grid-column: 2 / 4;">
          <i class="fa-solid fa-align-right"></i>
          <span class="info-label">${tOb('printMemo')}</span>
          <span class="info-value">${memo || '-'}</span>
        </div>
      </div>
      <div class="table-wrapper">
        <table class="details-table">
          <thead><tr><th style="width:36px">${tOb('printItem')}</th><th style="width:18%">${tOb('printAccountName')}</th><th style="width:50px">${tOb('printStatus')}</th><th style="width:80px">${tOb('printCash')}</th><th style="width:65px">${tOb('printWeight')}</th><th style="width:40px">${tOb('printKarat')}</th><th style="width:30%">${tOb('printNote')}</th></tr></thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </div>
      <div class="totals">
        <div class="totals-grid">
          <div class="total-box"><div class="lbl">${tOb('printCashDebit')}</div><div class="val">${nf2.format(amtDebit)}</div></div>
          <div class="total-box"><div class="lbl">${tOb('printCashCredit')}</div><div class="val">${nf2.format(amtCredit)}</div></div>
          <div class="total-box"><div class="lbl">${tOb('printWeightDebit21')}</div><div class="val">${nf2.format(totalDebit21)}</div></div>
          <div class="total-box"><div class="lbl">${tOb('printWeightCredit21')}</div><div class="val">${nf2.format(totalCredit21)}</div></div>
        </div>
        <div style="margin-top:10px; padding:8px 15px; background:rgba(255,255,255,0.1); border-radius:6px; font-size:11px; color:#e2e8f0;">
          ${(amtDebit > 0 || amtCredit > 0) ? `<div style="margin-bottom:4px;"><strong>${tOb('printCashInWords')}</strong> ${amtDebit > amtCredit ? toWordsCash(amtDebit - amtCredit) + ' ' + tOb('printDebit') : toWordsCash(amtCredit - amtDebit) + ' ' + tOb('printCredit')}</div>` : ''}
          ${(totalDebit21 > 0 || totalCredit21 > 0) ? `<div><strong>${tOb('printGoldInWords')}</strong> ${totalDebit21 > totalCredit21 ? toWordsGold(totalDebit21 - totalCredit21) + ' ' + tOb('printDebit') : toWordsGold(totalCredit21 - totalDebit21) + ' ' + tOb('printCredit')}</div>` : ''}
        </div>
      </div>
    </div>
    <button class="print-btn no-print" onclick="window.print()">🖨️ ${tOb('printButton')}</button>
  </body></html>`;
  if (window.openPreview) window.openPreview(docHtml); else {
    const w = window.open('', '_blank', 'noopener'); if (!w) return; w.document.open(); w.document.write(docHtml); w.document.close(); w.focus();
  }
});

// ===== WhatsApp - Send Opening Balance with Image =====
if (btnWhatsApp) btnWhatsApp.addEventListener('click', async ()=>{
  const internalId = getOpeningInternalId();
  const id = getOpeningDisplayNumber() || internalId;
  const date = document.getElementById('ob_date')?.value || '';
  const time = document.getElementById('ob_time')?.value || '';
  const memo = document.getElementById('ob_memo')?.value || '';
  
  if (!internalId) {
    showToast('error', tOb('toastSaveFirst'));
    return;
  }
  
  const rows = [];
  if (tbody){
    tbody.querySelectorAll('tr').forEach(tr=>{
      const get = n => {
        const val = tr.querySelector(`[name="${n}"]`)?.value || '';
        if (n === 'amount' || n === 'weight') return val.replace(/,/g, '');
        return val;
      };
      rows.push({
        type: get('type'),
        amount: get('amount'),
        weight: get('weight'),
        karat: get('karat'),
        customer_id: get('customer_id'),
        supplier_id: get('supplier_id'),
        account_id: get('account_id'),
        note: get('note')
      });
    });
  }
  
  // Find first customer/supplier with phone
  let phone = null;
  let contactName = '';
  for (const L of rows) {
    if (L.customer_id) {
      const c = customersCache.find(x => Number(x.id) === Number(L.customer_id));
      if (c && c.phone) { phone = c.phone; contactName = c.name || ''; break; }
    }
    if (L.supplier_id) {
      const s = suppliersCache.find(x => Number(x.id) === Number(L.supplier_id));
      if (s && s.phone) { phone = s.phone; contactName = s.name || ''; break; }
    }
  }
  
  if (!phone) {
    showToast('error', tOb('toastNoPhone'));
    return;
  }
  
  // Clean phone
  let phoneNumber = phone.trim().replace(/^\+/, '').replace(/^00/, '').replace(/[^0-9]/g, '');
  if (phoneNumber.startsWith('05')) phoneNumber = '966' + phoneNumber.substring(1);
  
  if (!phoneNumber || phoneNumber.length < 9) {
    showToast('error', tOb('toastInvalidPhone'));
    return;
  }
  
  const nf2 = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  
  // Calculate totals for contact only
  let contactCashDebit = 0, contactCashCredit = 0;
  const contactGoldByKarat = {}; // { karat: { debit: 0, credit: 0 } }
  let detailsStr = '';
  
  for (const L of rows) {
    const isContact = (L.customer_id && customersCache.find(x => Number(x.id) === Number(L.customer_id))?.phone === phone) ||
                     (L.supplier_id && suppliersCache.find(x => Number(x.id) === Number(L.supplier_id))?.phone === phone);
    
    let partyName = getNameByIds(L.customer_id, L.supplier_id, L.account_id) || '';
    if (!partyName) partyName = tOb('whatsappUndefined');
    
    const amt = Number(L.amount || 0) || 0;
    const wt = Number(L.weight || 0) || 0;
    const karat = L.karat || '21';
    const isDebit = (L.type || 'debit') === 'debit';
    
    if (amt > 0) {
      detailsStr += `   • ${partyName} - ${isDebit ? tOb('whatsappDebit') : tOb('whatsappCredit')} ${nf2.format(amt)} ${tOb('whatsappRiyal')}\n`;
      if (isContact) { if (isDebit) contactCashDebit += amt; else contactCashCredit += amt; }
    }
    if (wt > 0) {
      const karatStr = L.karat ? ` ${tOb('whatsappKarat')} ${L.karat}` : '';
      detailsStr += `   • ${partyName} - ${isDebit ? tOb('whatsappDebit') : tOb('whatsappCredit')} ${nf2.format(wt)} ${tOb('whatsappGram')}${karatStr}\n`;
      if (isContact) {
        if (!contactGoldByKarat[karat]) contactGoldByKarat[karat] = { debit: 0, credit: 0 };
        if (isDebit) contactGoldByKarat[karat].debit += wt;
        else contactGoldByKarat[karat].credit += wt;
      }
    }
  }
  
  // Build gold totals string by karat
  let goldTotalsStr = '';
  const karats = Object.keys(contactGoldByKarat).sort((a,b) => Number(b) - Number(a));
  for (const k of karats) {
    const g = contactGoldByKarat[k];
    if (g.debit > 0) goldTotalsStr += `   • ${tOb('whatsappDebit')} ${nf2.format(g.debit)} ${tOb('whatsappGram')} ${tOb('whatsappKarat')} ${k}\n`;
    if (g.credit > 0) goldTotalsStr += `   • ${tOb('whatsappCredit')} ${nf2.format(g.credit)} ${tOb('whatsappGram')} ${tOb('whatsappKarat')} ${k}\n`;
  }
  
  const message = `📄 ${tOb('whatsappTitle')} ${id}

${tOb('whatsappDear')} ${contactName}

📅 ${tOb('whatsappDate')} ${date}

📋 ${tOb('whatsappDetails')}
${detailsStr}
💵 ${tOb('whatsappTotalCash')}
   • ${tOb('whatsappDebit')} ${nf2.format(contactCashDebit)} ${tOb('whatsappRiyal')}
   • ${tOb('whatsappCredit')} ${nf2.format(contactCashCredit)} ${tOb('whatsappRiyal')}
${goldTotalsStr ? `
⚖️ ${tOb('whatsappTotalWeight')}
${goldTotalsStr}` : ''}
${tOb('whatsappThanks')}`;
  
  // Company info
  let company = {};
  try{ if (window.api && window.api.getCompanyInfo){ const r = await window.api.getCompanyInfo(); if (r && r.success) company = r.company || {}; } }catch(_){ }
  const logoUrl = (company && company.logoData) ? company.logoData : (company && company.logo ? ('file:///' + String(company.logo).replace(/\\/g,'/')) : '');
  
  // Totals with karat 21 conversion
  let amtDebit2=0, amtCredit2=0, totalDebit21_2=0, totalCredit21_2=0;
  rows.forEach(L=>{
    const a = Number(L.amount||0) || 0;
    const w = Number(L.weight||0) || 0;
    const karat = Number(L.karat) || 21;
    const isCredit = (L.type||'debit')==='credit';
    if (isCredit) amtCredit2 += Math.abs(a);
    else amtDebit2 += Math.abs(a);
    if (w > 0) {
      const w21 = (Math.abs(w) * karat) / 21;
      if (isCredit) totalCredit21_2 += w21;
      else totalDebit21_2 += w21;
    }
  });
  
  // Get account name for WhatsApp
  const getAccName = (L) => getNameByIds(L.customer_id, L.supplier_id, L.account_id) || '';
  const rowsHtml2 = rows.map((L,i)=>`<tr>
    <td>${L.customer_id||L.supplier_id||L.account_id||''}</td>
    <td>${getAccName(L)}</td>
    <td>${L.type==='credit' ? 'دائن' : 'مدين'}</td>
    <td>${nf2.format(Number(L.amount||0) || 0)}</td>
    <td>${nf2.format(Number(L.weight||0) || 0)}</td>
    <td>${L.karat||''}</td>
    <td>${(L.note||'')}</td>
  </tr>`).join('');
  
  // Build words section
  let wordsHtml = '';
  if (amtDebit2 > 0 || amtCredit2 > 0) wordsHtml += '<div style="margin-bottom:3px;"><strong>النقد كتابة:</strong> ' + (amtDebit2 > amtCredit2 ? toArabicWordsCash(amtDebit2 - amtCredit2) + ' مدين' : toArabicWordsCash(amtCredit2 - amtDebit2) + ' دائن') + '</div>';
  if (totalDebit21_2 > 0 || totalCredit21_2 > 0) wordsHtml += '<div><strong>الذهب كتابة (عيار 21):</strong> ' + (totalDebit21_2 > totalCredit21_2 ? toArabicWordsGold(totalDebit21_2 - totalCredit21_2) + ' مدين' : toArabicWordsGold(totalCredit21_2 - totalDebit21_2) + ' دائن') + '</div>';
  
  // Build HTML for WhatsApp capture window (new design matching print)
  const nameAr2 = company.name || 'اسم الشركة';
  const nameEn2 = company.name_en || company.name || 'Company Name';
  const addressAr2 = company.address || '';
  const addressEn2 = company.address_en || company.address || '';
  const companyPhone2 = company.phone || '';
  const companyEmail2 = company.email || '';
  const taxNo2 = company.tax || '';

  const docHtml = '<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>رصيد افتتاحي</title><script src="../../node_modules/html2canvas/dist/html2canvas.min.js"><\/script><link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet"><link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:"Cairo",sans-serif;background:#fff;padding:10px}.container{max-width:100%;border:2px solid #e5e7eb;border-radius:8px;overflow:hidden}.header{padding:10px 20px;background:linear-gradient(135deg,#fef3c7 0%,#fde68a 100%);border-bottom:2px solid #f59e0b}.header-top{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;direction:ltr}.company-info{flex:1}.company-info.left{text-align:left;direction:ltr}.company-info.right{text-align:right;direction:rtl}.company-name{font-size:14px;font-weight:700;color:#1f2937;margin-bottom:4px}.info-item{display:flex;align-items:center;gap:6px;margin:2px 0;font-size:9px;color:#374151}.info-item i{color:#f59e0b;font-size:9px}.company-details{font-size:9px;color:#374151}.logo{width:70px;height:70px;border:3px solid #f59e0b;border-radius:50%;overflow:hidden;background:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0}.logo img{max-width:90%;max-height:90%;object-fit:contain}.opening-title{position:relative;background:#374151;color:#fff;text-align:center;padding:8px 20px;font-size:14px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:8px;margin:6px 10px 8px}.opening-date-chip{position:absolute;left:15px;padding:2px 8px;border-radius:999px;background:linear-gradient(135deg,#fef3c7,#fde68a);color:#374151;font-size:9px;font-weight:600}.info-grid{display:grid;grid-template-columns:repeat(3,1fr);background:#fff;gap:4px;padding:6px 10px}.info-grid .info-item{display:flex;align-items:center;padding:4px 8px;border-radius:999px;border:1px solid #e5e7eb;background:#f9fafb}.info-grid .info-item i{margin-inline-end:4px;font-size:9px;color:#f59e0b}.info-label{color:#666;font-size:9px;min-width:50px}.info-value{font-weight:600;color:#333;flex:1;font-size:9px}.table-wrapper{border-radius:8px;overflow:hidden;margin:6px 10px;border:2px solid #f59e0b}.details-table{width:100%;border-collapse:collapse}.details-table th{background:linear-gradient(135deg,#fef3c7 0%,#fde68a 100%);color:#1f2937;padding:6px 4px;font-size:10px;font-weight:600;text-align:center;border:1px solid #f59e0b}.details-table td{padding:6px 4px;text-align:center;border:1px solid #e5e7eb;font-size:9px;background:#fff}.totals{background:linear-gradient(135deg,#1e3a5f 0%,#2d4a6f 100%);padding:8px;border-radius:8px;margin:6px 10px}.totals-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:4px}.total-box{background:transparent;border:1px solid #3d5a7f;border-radius:4px;padding:6px;text-align:center}.total-box .lbl{font-size:7px;color:#93c5fd;margin-bottom:2px}.total-box .val{font-size:10px;font-weight:700;color:#fff}.words-section{margin-top:8px;padding:6px 10px;background:rgba(255,255,255,0.1);border-radius:6px;font-size:9px;color:#e2e8f0}</style></head><body><div class="container" id="openingContainer"><div class="header"><div class="header-top"><div class="company-info left"><div class="company-name">' + nameEn2 + '</div><div class="info-item"><i class="fa-solid fa-location-dot"></i><span class="company-details">' + (addressEn2 ? 'Address: ' + addressEn2 : '') + '</span></div><div class="info-item"><i class="fa-solid fa-phone"></i><span class="company-details">' + (companyPhone2 ? 'Phone: ' + companyPhone2 : '') + '</span></div><div class="info-item"><i class="fa-solid fa-envelope"></i><span class="company-details">' + (companyEmail2 ? 'Email: ' + companyEmail2 : '') + '</span></div><div class="info-item"><i class="fa-solid fa-file-invoice"></i><span class="company-details">' + (taxNo2 ? 'VAT: ' + taxNo2 : '') + '</span></div></div><div class="logo">' + (logoUrl ? '<img src="' + logoUrl + '" alt="Logo">' : '') + '</div><div class="company-info right"><div class="company-name">' + nameAr2 + '</div><div class="info-item"><i class="fa-solid fa-location-dot"></i><span class="company-details">' + (addressAr2 ? 'العنوان: ' + addressAr2 : '') + '</span></div><div class="info-item"><i class="fa-solid fa-phone"></i><span class="company-details">' + (companyPhone2 ? 'الهاتف: ' + companyPhone2 : '') + '</span></div><div class="info-item"><i class="fa-solid fa-envelope"></i><span class="company-details">' + (companyEmail2 ? 'البريد: ' + companyEmail2 : '') + '</span></div><div class="info-item"><i class="fa-solid fa-file-invoice"></i><span class="company-details">' + (taxNo2 ? 'الرقم الضريبي: ' + taxNo2 : '') + '</span></div></div></div><div class="opening-title"><div class="opening-date-chip">التاريخ: ' + date + '</div><span>رصيد افتتاحي رقم: ' + id + '</span></div></div><div class="info-grid"><div class="info-item"><i class="fa-solid fa-clock"></i><span class="info-label">الوقت:</span><span class="info-value">' + (time || '-') + '</span></div><div class="info-item" style="grid-column:2/4;"><i class="fa-solid fa-align-right"></i><span class="info-label">البيان:</span><span class="info-value">' + (memo || '-') + '</span></div></div><div class="table-wrapper"><table class="details-table"><thead><tr><th style="width:35px">البند</th><th style="min-width:120px">اسم الحساب</th><th style="width:35px">الحالة</th><th style="width:60px">الريال</th><th style="width:50px">الوزن</th><th style="width:30px">العيار</th><th style="width:100px">البيان</th></tr></thead><tbody>' + rowsHtml2 + '</tbody></table></div><div class="totals"><div class="totals-grid"><div class="total-box"><div class="lbl">نقد مدين</div><div class="val">' + nf2.format(amtDebit2) + '</div></div><div class="total-box"><div class="lbl">نقد دائن</div><div class="val">' + nf2.format(amtCredit2) + '</div></div><div class="total-box"><div class="lbl">أوزان محولة 21 مدين</div><div class="val">' + nf2.format(totalDebit21_2) + '</div></div><div class="total-box"><div class="lbl">أوزان محولة 21 دائن</div><div class="val">' + nf2.format(totalCredit21_2) + '</div></div></div>' + (wordsHtml ? '<div class="words-section">' + wordsHtml + '</div>' : '') + '</div></div><script>setTimeout(async()=>{try{const container=document.getElementById("openingContainer");const canvas=await html2canvas(container,{backgroundColor:"#fff",scale:2,useCORS:true,logging:false});const blob=await new Promise(r=>canvas.toBlob(r,"image/png"));try{await navigator.clipboard.write([new ClipboardItem({"image/png":blob})])}catch(e){}const whatsappUrl="https://wa.me/' + phoneNumber + '?text=' + encodeURIComponent(message) + '";if(window.api?.openExternal)await window.api.openExternal(whatsappUrl);else if(window.opener?.api?.openExternal)await window.opener.api.openExternal(whatsappUrl);else window.open(whatsappUrl,"_blank");setTimeout(()=>window.close(),800)}catch(err){console.error(err);alert("خطأ في إرسال الرصيد")}},600)<\/script></body></html>';
  
  const w = window.open('', '_blank', 'width=900,height=800,scrollbars=yes');
  if (!w) { showToast('error', tOb('toastWindowFailed')); return; }
  w.document.open();
  w.document.write(docHtml);
  w.document.close();
  w.focus();
  showToast('success', tOb('toastPreparingImage'));
});

// ===== Journal Image Button - Show auto journal entry =====
if (btnJournal) btnJournal.addEventListener('click', async () => {
  const curId = getOpeningInternalId();
  const displayId = getOpeningDisplayNumber() || curId;
  if (!curId) {
    showToast('error', 'يرجى حفظ الرصيد الافتتاحي أولاً');
    return;
  }
  // Use the shared auto journal modal
  if (typeof showAutoJournalModal === 'function') {
    showAutoJournalModal('opening', curId, `صورة الحركة - رصيد افتتاحي رقم ${displayId}`);
  } else if (window.parent && typeof window.parent.showAutoJournalModal === 'function') {
    window.parent.showAutoJournalModal('opening', curId, `صورة الحركة - رصيد افتتاحي رقم ${displayId}`);
  } else {
    showToast('error', 'واجهة صورة الحركة غير متاحة');
  }
});

if (navPrev)  navPrev.addEventListener('click',  async ()=>{ if (!obIds.length) await ob_refreshIdsAndIndex(); if (!obIds.length) return; obIndex = Math.max(0, obIndex-1); ob_loadById(obIds[obIndex]); });
if (navNext)  navNext.addEventListener('click',  async ()=>{ if (!obIds.length) await ob_refreshIdsAndIndex(); if (!obIds.length) return; obIndex = Math.min(obIds.length-1, obIndex+1); ob_loadById(obIds[obIndex]); });
if (navLast)  navLast.addEventListener('click',  async ()=>{ if (!obIds.length) await ob_refreshIdsAndIndex(); if (!obIds.length) return; obIndex = obIds.length-1; ob_loadById(obIds[obIndex]); });
if (navIdInp) navIdInp.addEventListener('keydown', async (e)=>{ if (e.key==='Enter'){ e.preventDefault(); const v = parseInt(navIdInp.value,10); if (Number.isFinite(v) && v>0){ const targetId = findOpeningIdByNavNumber(v); if (targetId > 0) { await ob_loadById(targetId); return; } await ob_loadById(v, { lookupByBranchLocalNumber: true }); } }});

// Helper: load last document or start new
async function ob_showLast(){
  await ob_refreshIdsAndIndex();
  if (obIds && obIds.length){ obIndex = obIds.length - 1; await ob_loadById(obIds[obIndex]); }
  else { await ob_new(); }
}

// Observe tab activation to show last when switching to this tab
const obPanel = document.getElementById('panel-opening');
if (obPanel && typeof MutationObserver !== 'undefined'){
  const mo = new MutationObserver((mutations)=>{
    for (const m of mutations){
      if (m.attributeName === 'class'){
        const isActive = obPanel.classList.contains('active');
        if (isActive){ ob_showLast(); }
      }
    }
  });
  mo.observe(obPanel, { attributes:true });
}

// ===== New document (like receipt r_new) =====
async function ob_new(){
  // switch to NEW mode and unlock editing
  obScreenMode = 'new';
  obEditUnlockedForId = null;
  currentOpeningId = null;
  ob_setReadOnly(false);

  // reset header
  const idEl = document.getElementById('ob_id');
  const dateEl = document.getElementById('ob_date');
  const timeEl = document.getElementById('ob_time');
  const memoEl = document.getElementById('ob_memo');
  try{
    await waitForOpening();
    const n = await (window.opening?.getNextId?.() || {});
    if (n && n.success && n.nextId){ idEl && (idEl.value = n.nextId); }
    else { idEl && (idEl.value = ''); }
  }catch(_){ idEl && (idEl.value=''); }
  // Use local date (not UTC) to avoid showing yesterday's date
  if (dateEl) { const d = new Date(); dateEl.value = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0'); }
  if (timeEl){ const now = new Date(); timeEl.value = now.toTimeString().slice(0, 5); }
  if (memoEl) memoEl.value = '';
  // reset lines
  ob_resetToMinimumRows();
  computeTotals();
  // reset nav state
  if (navIdInp) navIdInp.value = '';
  if (navCounter) navCounter.textContent = '0 / 0';
  if (navFirst) navFirst.disabled = true;
  if (navPrev)  navPrev.disabled  = true;
  if (navNext)  navNext.disabled  = true;
  if (navLast)  navLast.disabled  = true;
}

if (btnNew) btnNew.addEventListener('click', ob_new);

// Edit existing opening balance (like voucher/journal)
if (btnEdit){
  btnEdit.addEventListener('click', async ()=>{
    const curId = getOpeningInternalId();
    if (!curId){
      showToast('error', tOb('validationNoOpeningToEdit'));
      return;
    }
    if (obScreenMode !== 'view') return;

    currentOpeningId = curId;

    if (window.ScreenPermissions && !window.ScreenPermissions.check('opening_edit', 'تعديل رصيد افتتاحي')) {
      return;
    }

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

    obScreenMode = 'edit';
    obEditUnlockedForId = curId;
    ob_setReadOnly(false);
  });
}

// ===== Delete document (like receipt/voucher) =====
const obDocDelModal = document.getElementById('ob_confirmDocDelModal');
const obDocDelMsg = document.getElementById('ob_confirmDocDelMsg');
const obDocDelYes = document.getElementById('ob_confirmDocDelYes');
const obDocDelNo  = document.getElementById('ob_confirmDocDelNo');
const obDocDelClose = document.getElementById('ob_confirmDocDelClose');
function ob_openDocDel(){ if (obDocDelModal) obDocDelModal.setAttribute('aria-hidden','false'); }
function ob_closeDocDel(){ if (obDocDelModal) obDocDelModal.setAttribute('aria-hidden','true'); }
if (obDocDelNo) obDocDelNo.addEventListener('click', ob_closeDocDel);
if (obDocDelClose) obDocDelClose.addEventListener('click', ob_closeDocDel);
if (btnDelete) btnDelete.addEventListener('click', ()=>{
  // Delete acts as Cancel in edit/new modes
  const curId0 = getOpeningInternalId();

  if (obScreenMode === 'edit' && curId0){
    // Cancel edit: reload current document in view mode
    ob_loadById(curId0).then(()=>{
      obScreenMode = 'view';
      obEditUnlockedForId = null;
      ob_setReadOnly(true);
    });
    return;
  }

  if (obScreenMode === 'new'){
    // Cancel new: go back to last document if exists, otherwise clear to read-only blank
    (async ()=>{
      await ob_refreshIdsAndIndex();
      if (obIds && obIds.length){
        const lastId = obIds[obIds.length - 1];
        await ob_loadById(lastId);
        currentOpeningId = lastId;
      } else {
        const idEl = document.getElementById('ob_id');
        const dateEl = document.getElementById('ob_date');
        const timeEl = document.getElementById('ob_time');
        const memoEl = document.getElementById('ob_memo');
        if (idEl) idEl.value = '';
        if (navIdInp) navIdInp.value = '';
        if (dateEl) dateEl.value = '';
        if (timeEl) timeEl.value = '';
        if (memoEl) memoEl.value = '';
        if (tbody){
          ob_resetToMinimumRows();
        }
        computeTotals();
        if (navCounter) navCounter.textContent = '0 / 0';
        if (navFirst) navFirst.disabled = true;
        if (navPrev)  navPrev.disabled  = true;
        if (navNext)  navNext.disabled  = true;
        if (navLast)  navLast.disabled  = true;
      }
      obScreenMode = 'view';
      obEditUnlockedForId = null;
      currentOpeningId = obIds && obIds.length ? currentOpeningId : null;
      ob_setReadOnly(true);
    })();
    return;
  }

  const curId = getOpeningInternalId();
  const displayId = getOpeningDisplayNumber() || curId;
  if (!curId){ showToast('error', tOb('validationNoOpeningToEdit')); return; }
  
  // ✅ Check delete permission BEFORE opening confirmation modal
  if (window.ScreenPermissions && !window.ScreenPermissions.check('opening_delete', 'حذف رصيد افتتاحي')) {
    return;
  }
  
  if (obDocDelMsg) obDocDelMsg.textContent = tObFmt('confirmDeleteDocMessageWithId', { id: displayId });
  ob_openDocDel();
});
if (obDocDelYes) obDocDelYes.addEventListener('click', async ()=>{
  try{
    const curId = getOpeningInternalId();
    if (!curId){ ob_closeDocDel(); return; }
    
    // طلب تأكيد كلمة المرور للحذف
    const confirmFn = window.confirmDeleteWithPassword || window.parent?.confirmDeleteWithPassword || window.top?.confirmDeleteWithPassword;
    if (confirmFn) {
      try {
        const confirmed = await confirmFn();
        if (!confirmed) {
          ob_closeDocDel();
          return;
        }
      } catch (e) {
        if (e.message !== 'cancelled') {
          // Error occurred
        }
        ob_closeDocDel();
        return;
      }
    }
    
    // Try multiple API signatures like other screens might use
    let res = null; const api = window.opening || {};
    const deletePayload = {
      id: curId,
      actorUserId: getCurrentUserId(),
      actorName: getCurrentUserDisplayName(),
    };
    if (typeof api.delete === 'function'){
      try{ res = await api.delete(deletePayload); }catch(_){ }
      if (!res || res.success===false){ try{ res = await api.delete(curId); }catch(_){ }
      }
    }
    if ((!res || res.success===false) && typeof api.remove === 'function'){
      try{ res = await api.remove(deletePayload); }catch(_){ }
      if (!res || res.success===false){ try{ res = await api.remove(curId); }catch(_){ }
      }
    }
    if ((!res || res.success===false) && typeof api.destroy === 'function'){
      try{ res = await api.destroy(deletePayload); }catch(_){ }
      if (!res || res.success===false){ try{ res = await api.destroy(curId); }catch(_){ }
      }
    }
    if (res && res.success){
      showToast('success', tOb('toastDeleted'));
      // Refresh IDs and go to previous/next if available
      await ob_refreshIdsAndIndex();
      if (obIds && obIds.length){
        // pick nearest id
        let idx = obIds.findIndex(x=>x===curId);
        if (idx<0) idx = Math.min(obIndex, obIds.length-1);
        else idx = Math.min(idx, obIds.length-1);
        obIndex = Math.max(0, idx);
        await ob_loadById(obIds[obIndex]);
      } else {
        // No docs left: reset to new
        await ob_new();
      }
    } else { showToast('error', (res && (res.error||res.message)) || tOb('toastDeleteFailed')); }
  }catch(_){ showToast('error', tOb('toastDeleteFailed')); }
  finally{ ob_closeDocDel(); }
});

function getNameByIds(cid, sid, aid){
  const cStr = cid!=null ? String(cid).trim() : '';
  const sStr = sid!=null ? String(sid).trim() : '';
  const aStr = aid!=null ? String(aid).trim() : '';
  if (cStr){ const c = customersCache.find(x=> String(x.id)===cStr); if (c) return (c.name || c.full_name || c.company || cStr); }
  if (sStr){ const s = suppliersCache.find(x=> String(x.id)===sStr); if (s) return (s.name || s.full_name || s.company || sStr); }
  // للحسابات: نبحث بكود الحساب الظاهر فقط
  if (aStr){ const a = accountsCache.find(x=> String(x.code)===aStr); if (a) return (a.name || aStr); }
  return '';
}

function bindRowInputs(tr){
  const sync = async ()=>{
    if (!cachesLoaded) await loadCaches();
    const cid = tr.querySelector('input[name="customer_id"]')?.value;
    const sid = tr.querySelector('input[name="supplier_id"]')?.value;
    const aid = tr.querySelector('input[name="account_id"]')?.value;
    let nm  = getNameByIds(cid, sid, aid) || '';
    const nameEl = tr.querySelector('input[name="name"]');
    if (nameEl) nameEl.value = nm;
    computeTotals();
  };
  
  // Add live number formatting for amount field
  const amountInput = tr.querySelector('input[name="amount"]');
  if (amountInput) {
    amountInput.addEventListener('input', (e) => {
      let value = e.target.value;
      const cursorPos = e.target.selectionStart;
      const beforeCursor = value.substring(0, cursorPos);
      const commasBefore = (beforeCursor.match(/,/g) || []).length;
      
      value = value.replace(/[^\d.]/g, '');
      const parts = value.split('.');
      if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join('');
      }
      
      if (value) {
        const formatted = formatNumberWithCommas(value);
        e.target.value = formatted;
        const beforeCursorNew = formatted.substring(0, cursorPos);
        const commasAfter = (beforeCursorNew.match(/,/g) || []).length;
        const diff = commasAfter - commasBefore;
        const newPos = cursorPos + diff;
        e.target.setSelectionRange(newPos, newPos);
      } else {
        e.target.value = '';
      }
      
      sync();
    });
  }
  
  // Add live number formatting for weight field
  const weightInput = tr.querySelector('input[name="weight"]');
  if (weightInput) {
    weightInput.addEventListener('input', (e) => {
      let value = e.target.value;
      const cursorPos = e.target.selectionStart;
      const beforeCursor = value.substring(0, cursorPos);
      const commasBefore = (beforeCursor.match(/,/g) || []).length;
      
      value = value.replace(/[^\d.]/g, '');
      const parts = value.split('.');
      if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join('');
      }
      
      if (value) {
        const formatted = formatNumberWithCommas(value);
        e.target.value = formatted;
        const beforeCursorNew = formatted.substring(0, cursorPos);
        const commasAfter = (beforeCursorNew.match(/,/g) || []).length;
        const diff = commasAfter - commasBefore;
        const newPos = cursorPos + diff;
        e.target.setSelectionRange(newPos, newPos);
      } else {
        e.target.value = '';
      }
      
      sync();
    });
  }
  
  // Add numeric-only validation for ID fields
  ['customer_id','supplier_id','account_id'].forEach(n=>{
    const el = tr.querySelector(`[name="${n}"]`); 
    if (el){ 
      el.addEventListener('input', (e) => {
        // Remove all non-numeric characters
        e.target.value = e.target.value.replace(/[^\d]/g, '');
        sync(); // Call sync after cleaning
      });
      el.addEventListener('change', sync); 
    }
  });
  
  // Add sync for other fields
  ['type','karat','note'].forEach(n=>{
    const el = tr.querySelector(`[name="${n}"]`); 
    if (el){ 
      el.addEventListener('input', sync); 
      el.addEventListener('change', sync); 
    }
  });
  
  // Add arrow key navigation for all fields
  ['customer_id','supplier_id','account_id','type','amount','weight','karat','note'].forEach(fieldName => {
    const el = tr.querySelector(`[name="${fieldName}"]`);
    if (el) {
      el.addEventListener('keydown', (e) => {
        handleArrowNavigation(e, el, fieldName);
      });
    }
  });
}

function addRow(data={}){
  const tr=document.createElement('tr');
  // Infer type from signed values if not provided
  const amtNum = Number(data.amount||0);
  const wNum = Number(data.weight||0);
  const inferredType = (data.type==='credit' || data.type==='debit') ? data.type : ((amtNum<0 || wNum<0) ? 'credit' : 'debit');
  const dispAmt = Math.abs(amtNum||0) || (data.amount===''? '' : Math.abs(amtNum));
  const dispW   = Math.abs(wNum||0) || (data.weight===''? '' : Math.abs(wNum));
  // Format numbers with commas
  const formattedAmt = dispAmt !== '' && dispAmt !== 0 ? formatNumberWithCommas(dispAmt) : '';
  const formattedW = dispW !== '' && dispW !== 0 ? formatNumberWithCommas(dispW) : '';

  const rawCustomerId = data.customer_id != null ? data.customer_id : '';
  const rawSupplierId = data.supplier_id != null ? data.supplier_id : '';
  const rawAccountId  = data.account_id  != null ? data.account_id  : '';

  let accountCode = '';
  if (rawAccountId !== '') {
    const list = Array.isArray(accountsCache) ? accountsCache : [];
    let acc = list.find(x => Number(x.id) === Number(rawAccountId));
    if (!acc) acc = list.find(x => String(x.code) === String(rawAccountId));
    if (acc && acc.code != null) {
      accountCode = String(acc.code);
    } else {
      accountCode = String(rawAccountId);
    }
  }

  const initialName = getNameByIds(rawCustomerId, rawSupplierId, accountCode || rawAccountId) || '';
  tr.innerHTML=`
    <td><input type="text" name="customer_id" value="${rawCustomerId}" placeholder="${tOb('placeholderSearch')}" title="${tOb('placeholderSearch')}" style="width:88px" inputmode="numeric"></td>
    <td><input type="text" name="supplier_id" value="${rawSupplierId}" placeholder="${tOb('placeholderSearch')}" title="${tOb('placeholderSearch')}" style="width:88px" inputmode="numeric"></td>
    <td><input type="text" name="account_id" value="${accountCode}" placeholder="${tOb('placeholderSearch')}" title="${tOb('placeholderSearch')}" style="width:88px" inputmode="numeric"></td>
    <td><input type="text" name="name" value="${initialName}" readonly style="min-width:160px"></td>
    <td>
      <select name="type" class="shrink" style="min-width:96px">
        <option value="debit" ${inferredType==='credit'?'':'selected'}>${tOb('typeDebit')}</option>
        <option value="credit" ${inferredType==='credit'?'selected':''}>${tOb('typeCredit')}</option>
      </select>
    </td>
    <td><input type="text" name="amount" value="${formattedAmt}" placeholder="${tOb('placeholderAmount')}" inputmode="decimal"></td>
    <td><input type="text" name="weight" value="${formattedW}" placeholder="${tOb('placeholderWeight')}" inputmode="decimal"></td>
    <td><input type="text" name="karat" value="${data.karat||'21'}" list="ob_karat_list" inputmode="numeric" style="width:60px; font-size:12px; padding:4px 6px; text-align:center" placeholder="${tOb('placeholderKarat')}"></td>
    <td><input type="text" name="note" value="${data.note??''}" placeholder="${tOb('placeholderNote')}"></td>
    <td><button type="button" class="icon-btn act-delete" title="${tOb('btnDelete')}"><i class="fa-solid fa-xmark"></i></button></td>
  `;
  tbody.appendChild(tr);
  bindRowInputs(tr);
}

// Add line: prefill note from main memo field if present
const memoInp = document.getElementById('ob_memo');
btnAddLine?.addEventListener('click', ()=>{
  addOrFocusEmptyRow();
});
if (memoInp){
  memoInp.addEventListener('keydown', (e)=>{ if (e.key==='Enter'){ e.preventDefault(); btnAddLine?.click(); } });
}

// Copy memo to all non-empty lines in opening balance
const btnCopyMemo = document.getElementById('ob_btnCopyMemo');
if (btnCopyMemo && memoInp) {
  btnCopyMemo.addEventListener('click', () => {
    const memoText = memoInp.value.trim();
    if (!memoText) {
      showToast('error', tOb('toastNoMemo'));
      return;
    }
    
    let copiedCount = 0;
    if (tbody) {
      tbody.querySelectorAll('tr').forEach(row => {
        const customerId = row.querySelector('input[name="customer_id"]')?.value;
        const supplierId = row.querySelector('input[name="supplier_id"]')?.value;
        const accountId = row.querySelector('input[name="account_id"]')?.value;
        
        if (customerId || supplierId || accountId) {
          const noteInput = row.querySelector('input[name="note"]');
          if (noteInput) {
            noteInput.value = memoText;
            copiedCount++;
          }
         }
       });
     }
     
     if (copiedCount > 0) {
       const unit = copiedCount === 1 ? tOb('unitLine') : tOb('unitLines');
       showToast('success', tObFmt('toastCopiedMemo', { count: copiedCount, unit }));
       computeTotals();
     } else {
       showToast('error', tOb('toastNoEmptyRows'));
     }
   });
 }

 btnSave?.addEventListener('click', async ()=>{
   if (obSaveInFlight) {
     return;
   }
   obSaveInFlight = true;
   if (btnSave) btnSave.disabled = true;
   try {
     const curId = getOpeningInternalId();
     const displayId = getOpeningDisplayNumber();
     
     let isEditingExisting = false;
     if (curId > 0) {
       try {
         const api = window.opening || window.parent?.opening || window.top?.opening;
         if (api && typeof api.get === 'function') {
           const checkResult = await api.get(curId);
           isEditingExisting = checkResult && checkResult.success && checkResult.data;
         }
       } catch(e) {
         isEditingExisting = false;
       }
     }
     
     if (isEditingExisting) {
       if (window.ScreenPermissions && !window.ScreenPermissions.check('opening_edit', 'تعديل رصيد افتتاحي')) {
         return;
       }
       if (obScreenMode !== 'edit') {
         showToast('error', tOb('validationViewMode'));
         return;
       }
       if (obEditUnlockedForId !== curId) {
         showToast('error', tOb('validationEditUnlocked'));
         return;
       }
     } else {
       if (window.ScreenPermissions && !window.ScreenPermissions.check('opening_add', 'إضافة رصيد افتتاحي')) {
         return;
       }
       if (obScreenMode !== 'new') {
         showToast('error', tOb('validationNewMode'));
         return;
       }
     }
     
     const timeEl = document.getElementById('ob_time');
     if (timeEl){ const now = new Date(); timeEl.value = now.toTimeString().slice(0, 5); }
     const currentUserId = getCurrentUserId();
     const isUpdate = isEditingExisting;
     
     const header = {
       date: document.getElementById('ob_date')?.value || (()=>{ const d=new Date(); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); })(),
       time: document.getElementById('ob_time')?.value || '',
       memo: document.getElementById('ob_memo')?.value?.trim() || ''
     };
     
     if (isUpdate) {
       header.updated_by = currentUserId;
     } else {
       header.created_by = currentUserId;
     }

     let invalidEl=null, invalidMsg='';
     const lines=[]; tbody.querySelectorAll('tr').forEach(tr=>{
       const get = s=> {
         const val = tr.querySelector(`[name="${s}"]`)?.value||'';
         if (s === 'amount' || s === 'weight') {
           return val.replace(/,/g, '');
         }
         return val;
       };
       const cid = Number(get('customer_id'))||null;
       const sid = Number(get('supplier_id'))||null;
       const aidRaw = String(get('account_id')||'').trim();
       const typ = (get('type')||'debit').toLowerCase();
       const wVal = Number(get('weight'))||0; const karVal = String(get('karat')||'').trim();
       if (!invalidEl && wVal>0 && !karVal){ invalidEl = tr.querySelector('[name="karat"]'); invalidMsg='عند إدخال وزن الذهب يجب إدخال العيار أولاً'; }
       if (!invalidEl){
         if (cid!=null && cid!==0 && !customersCache.find(x=> Number(x.id)===cid)){
           invalidEl = tr.querySelector('[name="customer_id"]'); invalidMsg='لا يوجد عميل بهذا الرقم';
         } else if (sid!=null && sid!==0 && !suppliersCache.find(x=> Number(x.id)===sid)){
           invalidEl = tr.querySelector('[name="supplier_id"]'); invalidMsg='لا يوجد مورد بهذا الرقم';
         } else if (aidRaw){
           const acc = accountsCache.find(x=> String(x.code)===aidRaw);
           if (!acc){ invalidEl = tr.querySelector('[name="account_id"]'); invalidMsg='لا يوجد حساب بهذا الرقم'; }
         }
       }
       if (!cid && !sid && !aidRaw) {
         const amtRaw = Math.abs(Number(get('amount'))||0);
         const wRaw = Math.abs(Number(get('weight'))||0);
         const noteVal = String(get('note')||'').trim();
         if (amtRaw > 0 || wRaw > 0 || noteVal) {
           if (!invalidEl) {
             invalidEl = tr.querySelector('[name="customer_id"]');
             invalidMsg = 'يجب إدخال رقم العميل أو المورد أو الحساب في كل سطر';
           }
         }
         return;
       }
       
       const amtRaw = Math.abs(Number(get('amount'))||0);
       const wRaw = Math.abs(Number(get('weight'))||0);
       const amount = typ==='credit' ? -amtRaw : amtRaw;
       const weight = typ==='credit' ? -wRaw : wRaw;
       let resolvedAid = null;
       if (aidRaw){ const acc = accountsCache.find(x=> String(x.code)===aidRaw); if (acc && acc.id!=null) resolvedAid = acc.id; }
       lines.push({ customer_id: cid, supplier_id: sid, account_id: resolvedAid, amount, weight, karat:get('karat')||null, note:get('note')||null });
     });
     if (invalidEl){ showToast('error', invalidMsg); setTimeout(()=>{ try{ invalidEl.focus(); invalidEl.select && invalidEl.select(); }catch(_){ } }, 0); return; }
     if (!lines.length){ showToast('error', tOb('validationMinOneLine')); return; }

     let res;
     if (isUpdate){
       res = await window.opening.update({ ...header, lines, id: curId, branch_local_number: displayId || null });
     } else {
       res = await window.opening.add({ ...header, lines, branch_local_number: displayId || null });
     }

     if(res && res.success){
       if (res.id){ const idEl = document.getElementById('ob_id'); if (idEl) idEl.value = res.branch_local_number || displayId || idEl.value || ''; }
       showToast('success', isUpdate ? tOb('toastUpdated') : tOb('toastSaved'));
       const savedId = res.id || curId || undefined;
       if (!isUpdate && Number(savedId) > 0) {
         try {
           window.parent?.postMessage({
             type: 'daily-ops-notification',
             entityType: 'opening',
             documentId: Number(savedId),
             userName: getCurrentUserDisplayName(),
           }, '*');
         } catch (_) {}
       }
       currentOpeningId = savedId || null;
       await ob_refreshIdsAndIndex(savedId);
       if (savedId) {
         await ob_loadById(savedId);
         obScreenMode = 'view';
         obEditUnlockedForId = null;
         ob_setReadOnly(true);
       }
     } else {
       if (res && res.branchReadOnly && window.handleBranchReadOnlyResponse) {
         window.handleBranchReadOnlyResponse(res);
       } else if (res && res.debtLimitExceeded && window.handleDebtLimitResponse) {
         window.handleDebtLimitResponse(res);
       } else if (res && res.inactiveEntity && window.handleInactiveEntityResponse) {
         window.handleInactiveEntityResponse(res);
       } else {
         showToast('error', res?.error || tOb('toastSaveFailed'));
       }
     }
   } catch(e){ showToast('error', tOb('toastSaveFailed')); }
   finally {
     obSaveInFlight = false;
     if (btnSave) btnSave.disabled = (obScreenMode === 'view');
   }
 });

 // Row delete with confirm modal and name (like receipt)
 const obRowDelModal = document.getElementById('ob_confirmDelModal');
 const obRowDelMsg = document.getElementById('ob_confirmDelMsg');
 const obRowDelYes = document.getElementById('ob_confirmDelYes');
 const obRowDelNo  = document.getElementById('ob_confirmDelNo');
 const obRowDelClose = document.getElementById('ob_confirmDelClose');
 let obPendingDelTr = null;
 function ob_openRowDel(tr){ obPendingDelTr = tr; const nm = tr?.querySelector('input[name="name"]')?.value?.trim() || ''; if (obRowDelMsg) obRowDelMsg.textContent = nm ? tObFmt('confirmDeleteRowWithName', { name: nm }) : tOb('confirmDeleteRowMessage'); if (obRowDelModal) obRowDelModal.setAttribute('aria-hidden','false'); }
 function ob_closeRowDel(){ if (obRowDelModal) obRowDelModal.setAttribute('aria-hidden','true'); obPendingDelTr = null; }
 if (obRowDelYes) obRowDelYes.addEventListener('click', ()=>{ if (obPendingDelTr) obPendingDelTr.remove(); computeTotals(); ob_closeRowDel(); });
 if (obRowDelNo)  obRowDelNo.addEventListener('click', ob_closeRowDel);
 if (obRowDelClose) obRowDelClose.addEventListener('click', ob_closeRowDel);
 tbody?.addEventListener('click', (e)=>{
   const btn=e.target.closest('.act-delete'); if(!btn) return; const tr=btn.closest('tr'); if (!tr) return; tr.remove(); computeTotals();
 });

// Inline hint bubble like receipt
let oHintEl = null;
function ensureOHint(){ if (!oHintEl){ oHintEl = document.createElement('div'); oHintEl.className='o-hint'; oHintEl.setAttribute('role','status'); oHintEl.textContent=''; document.body.appendChild(oHintEl); } return oHintEl; }
function oShowHint(msg, target, isError=false){ const el=ensureOHint(); el.textContent = msg||''; el.classList.add('show'); if (isError) el.classList.add('error'); else el.classList.remove('error'); const r=target.getBoundingClientRect(); const gap=8; const top=Math.max(10, window.scrollY + r.top - el.offsetHeight - gap); const left=Math.min(window.scrollX + r.left, window.scrollX + window.innerWidth - 380); el.style.top=top+'px'; el.style.left=left+'px'; }
function oHideHint(){ if (oHintEl) oHintEl.classList.remove('show'); }

// Recompute totals on any input
tbody?.addEventListener('input', (e)=>{
  const inp = e.target; const tr = inp.closest('tr');
  if (tr && ['customer_id','supplier_id','account_id'].includes(inp.name)){
    const c = tr.querySelector('[name="customer_id"]');
    const s = tr.querySelector('[name="supplier_id"]');
    const a = tr.querySelector('[name="account_id"]');
    if (inp===c && c.value.trim()!==''){ if (s) s.value=''; if (a) a.value=''; }
    if (inp===s && s.value.trim()!==''){ if (c) c.value=''; if (a) a.value=''; }
    if (inp===a && a.value.trim()!==''){ if (c) c.value=''; if (s) s.value=''; }
    // update name immediately after exclusivity adjustments
    const nameEl = tr.querySelector('input[name="name"]');
    if (nameEl){
      const applyName = ()=>{
        const nm0 = getNameByIds(c?.value, s?.value, a?.value) || '';
        let nm = nm0;
        // Live not-found feedback while typing
        const cv=(c?.value||'').trim(); const sv=(s?.value||'').trim(); const av=(a?.value||'').trim();
        if (!nm){
          if (inp===c && cv){ nm = 'لا يوجد عميل بهذا الرقم'; }
          else if (inp===s && sv){ nm = 'لا يوجد مورد بهذا الرقم'; }
          else if (inp===a && av){ nm = 'لا يوجد حساب بهذا الرقم'; }
        }
        nameEl.value = nm;
      };
      if (!cachesLoaded){ loadCaches().then(applyName); } else { applyName(); }
    }
  }
  // Karat validation on input (same as voucher screen)
  if (inp && inp.name==='karat'){
    let v = String(inp.value||'').replace(/[^0-9]/g,'');
    if (v.length > 3) v = v.slice(0,3);
    inp.value = v;
    const allowedKarat = new Set(['24','22','21','18','999','925','900','800']);
    if ((v.length === 2 || v.length === 3) && !allowedKarat.has(v)){
      oShowHint('الذهب: 24، 22، 21، 18 | الفضة: 999، 925، 900، 800', inp);
    } else {
      oHideHint();
    }
  }
  computeTotals();
});

// Validate karat on blur (same as voucher screen)
tbody?.addEventListener('blur', (e)=>{
  const inp = e.target;
  if (!inp || inp.getAttribute('name') !== 'karat') return;
  const v = String(inp.value||'').trim();
  if (!v) { oHideHint(); return; }
  const allowedKarat = new Set(['24','22','21','18','999','925','900','800']);
  if (!allowedKarat.has(v)){
    showToast('error', tOb('validationKaratRequired'));
    inp.value = '';
    setTimeout(()=> inp.focus(), 0);
  } else {
    oHideHint();
  }
}, true);

// Enter on note => move to next row or add new one
tbody?.addEventListener('keydown', (e)=>{
  if (e.key !== 'Enter') return;
  const inp = e.target; if (!(inp && inp.tagName==='INPUT')) return;
  const name = inp.getAttribute('name');
  if (name !== 'note') return;
  e.preventDefault(); e.stopPropagation(); if (typeof e.stopImmediatePropagation==='function') e.stopImmediatePropagation();
  
  // Check if next row exists first
  const currentTr = inp.closest('tr');
  const nextTr = currentTr ? currentTr.nextElementSibling : null;
  
  if (nextTr) {
    // Move to existing next row
    const first = nextTr.querySelector('input[name="customer_id"]') || nextTr.querySelector('input[name="supplier_id"]') || nextTr.querySelector('input[name="account_id"]');
    if (first){ first.focus(); first.select && first.select(); }
  } else {
    // No next row - add new one
    try{ btnAddLine?.click(); }catch(_){ }
    const lastTr = tbody ? tbody.querySelector('tr:last-child') : null;
    const first = lastTr ? lastTr.querySelector('input[name="customer_id"]') || lastTr.querySelector('input[name="supplier_id"]') || lastTr.querySelector('input[name="account_id"]') : null;
    if (first){ first.focus(); first.select && first.select(); }
  }
});

// Show hint on focus for exclusivity
tbody?.addEventListener('focusin', (e)=>{
  const inp=e.target; const name=inp.getAttribute('name'); if (!['customer_id','supplier_id','account_id'].includes(name)) return;
  oShowHint('ملاحظة: يسمح بإدخال رقم واحد فقط في الصف. إدخال رقم هنا سيؤدي لمسح الأرقام الأخرى في الصف نفسه.', inp, false);
});
tbody?.addEventListener('focusout', ()=>{ oHideHint(); });

// Validate on blur that ID exists
tbody?.addEventListener('blur', async (e)=>{
  const inp=e.target; const tr=inp.closest('tr'); if (!tr || inp.tagName!=='INPUT') return;
  const nm=inp.getAttribute('name'); if (!['customer_id','supplier_id','account_id'].includes(nm)) return;
  const val=String(inp.value||'').trim(); if (!val){ oHideHint(); const nameEl=tr.querySelector('input[name="name"]'); if(nameEl) nameEl.value=''; return; }
  if (!cachesLoaded) { await loadCaches(); }
  const cid = nm==='customer_id' ? parseInt(val,10) : null;
  const sid = nm==='supplier_id' ? parseInt(val,10) : null;
  const aidCode = nm==='account_id' ? val : null;
  let ok=false; if (cid!=null){ ok=!!customersCache.find(x=>Number(x.id)===cid); }
  else if (sid!=null){ ok=!!suppliersCache.find(x=>Number(x.id)===sid); }
  else if (aidCode!=null){ ok=!!accountsCache.find(x=>String(x.code)===aidCode); }
  if (!ok){ let msg='لا يوجد حساب بهذا الرقم. تأكد من رقم الحساب.'; if (cid!=null) msg='لا يوجد عميل بهذا الرقم. تأكد من رقم العميل.'; if (sid!=null) msg='لا يوجد مورد بهذا الرقم. تأكد من رقم المورد.'; const nameEl=tr.querySelector('input[name="name"]'); if(nameEl) nameEl.value=msg; oShowHint(msg, inp, true); setTimeout(()=>{ inp.focus(); inp.select && inp.select(); },0); e.preventDefault && e.preventDefault(); e.stopPropagation && e.stopPropagation(); }
  else { // valid: update name field immediately
    const nameEl = tr.querySelector('input[name="name"]');
    if (nameEl){ const nm = getNameByIds(cid, sid, aidCode) || ''; nameEl.value = nm; }
  }
}, true);

function toKarat21(weight, karat){
  const k = String(karat||'').trim();
  const n = parseFloat(k) || 0; if (!n) return Number(weight)||0;
  // convert by proportion: w_21 = w * (karat/24) * (24/21) = w * (karat/21)
  const w = Number(weight)||0;
  return w * (n/21);
}

function computeTotals(){
  let amtDebit=0, amtCredit=0, goldDebit=0, goldCredit=0, silverDebit=0, silverCredit=0;
  const silverKarats = ['999', '925', '900', '800'];
  const uniqCustomers=new Set(), uniqSuppliers=new Set(), uniqAccounts=new Set();
  tbody?.querySelectorAll('tr').forEach(tr=>{
    const get = n=> tr.querySelector(`[name="${n}"]`)?.value || '';
    const typ = (get('type')||'debit').toLowerCase();
    // Remove commas before converting to number
    const amt = Math.abs(Number(get('amount').replace(/,/g, '')||0)||0);
    const weight = Math.abs(Number(get('weight').replace(/,/g, '')||0)||0);
    const karat = get('karat');
    const isSilver = silverKarats.includes(karat);
    if (isSilver) {
      // تحويل الفضة لعيار 999
      const w999 = weight * (Number(karat) / 999);
      if (typ==='debit'){ silverDebit+=w999; } else { silverCredit+=w999; }
    } else {
      const w21 = toKarat21(weight, karat);
      if (typ==='debit'){ goldDebit+=w21; } else { goldCredit+=w21; }
    }
    if (typ==='debit'){ amtDebit+=amt; } else { amtCredit+=amt; }
    const accId = get('account_id'); if (accId) uniqAccounts.add(accId);
    const cid = Number(get('customer_id')); if (cid) uniqCustomers.add(cid);
    const sid = Number(get('supplier_id')); if (sid) uniqSuppliers.add(sid);
  });
  const totalAmt = amtDebit + amtCredit;
  const obTotalEl = document.getElementById('ob_total_amount');
  const obCustEl = document.getElementById('ob_count_customers');
  const obSuppEl = document.getElementById('ob_count_suppliers');
  const obAccEl = document.getElementById('ob_count_accounts');
  if (obTotalEl) obTotalEl.value = formatNumberWithCommas(totalAmt.toFixed(2));
  if (obCustEl) obCustEl.value = String(uniqCustomers.size);
  if (obSuppEl) obSuppEl.value = String(uniqSuppliers.size);
  if (obAccEl) obAccEl.value = String(uniqAccounts.size);
  document.getElementById('sum_amt_debit').textContent = formatNumberWithCommas(amtDebit.toFixed(2));
  document.getElementById('sum_amt_credit').textContent = formatNumberWithCommas(amtCredit.toFixed(2));
  const amtBalVal = amtDebit-amtCredit;
  const amtBalEl = document.getElementById('sum_amt_balance');
  const ab = document.getElementById('sum_amt_balance_box');
  if (amtBalEl){
    if (Math.abs(amtBalVal) <= 1e-9){ 
      amtBalEl.textContent = tOb('balanced') + ' 0.00'; 
    }
    else { 
      amtBalEl.textContent = formatNumberWithCommas(amtBalVal.toFixed(2)); 
    }
  }
  if (ab){
    const isOk = Math.abs(amtBalVal) <= 1e-9;
    if (isOk) {
      ab.style.color = 'var(--success, #2ecc71)';
    } else {
      ab.style.color = 'var(--error, #e53935)';
    }
  }
  document.getElementById('sum_gold_debit').textContent = formatNumberWithCommas(goldDebit.toFixed(2));
  document.getElementById('sum_gold_credit').textContent = formatNumberWithCommas(goldCredit.toFixed(2));
  const goldBalVal = goldDebit-goldCredit;
  const goldBalEl = document.getElementById('sum_gold_balance');
  const gb = document.getElementById('sum_gold_balance_box');
  if (goldBalEl){
    if (Math.abs(goldBalVal) <= 1e-9){ 
      goldBalEl.textContent = tOb('balanced') + ' 0.00'; 
    }
    else { 
      goldBalEl.textContent = formatNumberWithCommas(goldBalVal.toFixed(2)); 
    }
  }
  if (gb){
    const isOkG = Math.abs(goldBalVal) <= 1e-9;
    if (isOkG) {
      gb.style.color = 'var(--success, #2ecc71)';
    } else {
      gb.style.color = 'var(--error, #e53935)';
    }
  }
  // إجماليات الفضة
  const silverDebitEl = document.getElementById('sum_silver_debit');
  const silverCreditEl = document.getElementById('sum_silver_credit');
  const silverBalEl = document.getElementById('sum_silver_balance');
  const sb = document.getElementById('sum_silver_balance_box');
  if (silverDebitEl) silverDebitEl.textContent = formatNumberWithCommas(silverDebit.toFixed(2));
  if (silverCreditEl) silverCreditEl.textContent = formatNumberWithCommas(silverCredit.toFixed(2));
  const silverBalVal = silverDebit - silverCredit;
  if (silverBalEl){
    if (Math.abs(silverBalVal) <= 1e-9){ 
      silverBalEl.textContent = tOb('balanced') + ' 0.00'; 
    } else { 
      silverBalEl.textContent = formatNumberWithCommas(silverBalVal.toFixed(2)); 
    }
  }
  if (sb){
    const isOkS = Math.abs(silverBalVal) <= 1e-9;
    sb.style.color = isOkS ? 'var(--success, #2ecc71)' : 'var(--error, #e53935)';
  }
  syncOpeningTotalsLayout();
}

function syncOpeningTotalsLayout(){
  const openingPanel = document.getElementById('panel-opening');
  const totalsCard = document.getElementById('ob_totals');
  const gridCard = document.getElementById('opening-grid');
  if (!openingPanel || !totalsCard) return;

  const measuredHeight = Math.ceil(totalsCard.getBoundingClientRect().height || totalsCard.offsetHeight || 0);
  const safeHeight = Math.max(measuredHeight, 72);
  openingPanel.style.setProperty('--opening-totals-height', `${safeHeight}px`);

  const referenceRect = (gridCard || openingPanel).getBoundingClientRect();
  const safeLeft = Math.max(Math.round(referenceRect.left || 0), 0);
  const safeWidth = Math.max(Math.round(referenceRect.width || openingPanel.getBoundingClientRect().width || 0), 0);
  openingPanel.style.setProperty('--opening-totals-left', `${safeLeft}px`);
  openingPanel.style.setProperty('--opening-totals-width', `${safeWidth}px`);
}

// initialize date and time
const dateEl = document.getElementById('ob_date'); if (dateEl && !dateEl.value){ const d=new Date(); dateEl.value = d.toISOString().split('T')[0]; }
const timeEl = document.getElementById('ob_time'); if (timeEl && !timeEl.value){ const now = new Date(); timeEl.value = now.toTimeString().slice(0, 5); }
// Preload some empty rows so grid shows by default
ob_ensureMinimumRows();
computeTotals();

const openingTotalsCard = document.getElementById('ob_totals');
if (openingTotalsCard && typeof ResizeObserver !== 'undefined') {
  const totalsResizeObserver = new ResizeObserver(() => syncOpeningTotalsLayout());
  totalsResizeObserver.observe(openingTotalsCard);
}

const openingGridCard = document.getElementById('opening-grid');
if (openingGridCard && typeof ResizeObserver !== 'undefined') {
  const gridResizeObserver = new ResizeObserver(() => syncOpeningTotalsLayout());
  gridResizeObserver.observe(openingGridCard);
}

window.addEventListener('resize', syncOpeningTotalsLayout);

// ===== F9 Lookups =====
// Customers
const lcModal = document.getElementById('ob_lookupCustomerModal');
const lcClose = document.getElementById('ob_lc_close');
const lcCancel = document.getElementById('ob_lc_cancel');
const lcSearch = document.getElementById('ob_lc_search');
const lcTbody = document.getElementById('ob_lc_tbody');
let lcActiveTr = null;
function lcRender(rows){ if (!lcTbody) return; const data=Array.isArray(rows)?rows:[]; if(!data.length){ lcTbody.innerHTML = '<tr><td colspan="2" style="text-align:center;padding:10px">لا يوجد عملاء</td></tr>'; return; } lcTbody.innerHTML = data.map(r=>`<tr data-id="${r.id}"><td style="width:140px; text-align:center">${r.id}</td><td>${r.name||''}</td></tr>`).join(''); }
async function lcOpen(tr){ lcActiveTr = tr; if (!cachesLoaded || !(customersCache&&customersCache.length)) await loadCaches(); lcRender(customersCache); if (lcSearch){ lcSearch.value=''; setTimeout(()=> lcSearch.focus(),0); } if (lcModal) lcModal.setAttribute('aria-hidden','false'); }
function lcCloseModal(){ if (lcModal) lcModal.setAttribute('aria-hidden','true'); lcActiveTr = null; }
lcClose?.addEventListener('click', lcCloseModal); lcCancel?.addEventListener('click', lcCloseModal); lcModal?.querySelector('.modal-backdrop')?.addEventListener('click', lcCloseModal);
lcTbody?.addEventListener('click', (e)=>{ const row=e.target.closest('tr'); if (!row||!lcActiveTr) return; const id=Number(row.dataset.id); const c=lcActiveTr.querySelector('[name="customer_id"]'); const s=lcActiveTr.querySelector('[name="supplier_id"]'); const a=lcActiveTr.querySelector('[name="account_id"]'); if (c) c.value=id; if (s) s.value=''; if (a) a.value=''; const nameEl=lcActiveTr.querySelector('[name="name"]'); if (nameEl){ const nm = getNameByIds(id,null,null) || ''; nameEl.value = nm; } lcCloseModal(); computeTotals(); });
lcSearch?.addEventListener('input', ()=>{ const q=(lcSearch.value||'').trim(); const rows = !q ? customersCache : customersCache.filter(x=> String(x.id).includes(q) || (x.name||'').includes(q)); lcRender(rows); });

// Suppliers
const lsModal = document.getElementById('ob_lookupSupplierModal');
const lsClose = document.getElementById('ob_ls_close');
const lsCancel = document.getElementById('ob_ls_cancel');
const lsSearch = document.getElementById('ob_ls_search');
const lsTbody = document.getElementById('ob_ls_tbody');
let lsActiveTr = null;
function lsRender(rows){ if (!lsTbody) return; const data=Array.isArray(rows)?rows:[]; if(!data.length){ lsTbody.innerHTML = '<tr><td colspan="2" style="text-align:center;padding:10px">لا يوجد موردين</td></tr>'; return; } lsTbody.innerHTML = data.map(r=>`<tr data-id="${r.id}"><td style="width:140px; text-align:center">${r.id}</td><td>${r.name||''}</td></tr>`).join(''); }
async function lsOpen(tr){ lsActiveTr = tr; if (!cachesLoaded || !(suppliersCache&&suppliersCache.length)) await loadCaches(); lsRender(suppliersCache); if (lsSearch){ lsSearch.value=''; setTimeout(()=> lsSearch.focus(),0); } if (lsModal) lsModal.setAttribute('aria-hidden','false'); }
function lsCloseModal(){ if (lsModal) lsModal.setAttribute('aria-hidden','true'); lsActiveTr = null; }
lsClose?.addEventListener('click', lsCloseModal); lsCancel?.addEventListener('click', lsCloseModal); lsModal?.querySelector('.modal-backdrop')?.addEventListener('click', lsCloseModal);
lsTbody?.addEventListener('click', (e)=>{ const row=e.target.closest('tr'); if (!row||!lsActiveTr) return; const id=Number(row.dataset.id); const c=lsActiveTr.querySelector('[name="customer_id"]'); const s=lsActiveTr.querySelector('[name="supplier_id"]'); const a=lsActiveTr.querySelector('[name="account_id"]'); if (s) s.value=id; if (c) c.value=''; if (a) a.value=''; const nameEl=lsActiveTr.querySelector('[name="name"]'); if (nameEl){ const nm = getNameByIds(null,id,null) || ''; nameEl.value = nm; } lsCloseModal(); computeTotals(); });
lsSearch?.addEventListener('input', ()=>{ const q=(lsSearch.value||'').trim(); const rows = !q ? suppliersCache : suppliersCache.filter(x=> String(x.id).includes(q) || (x.name||'').includes(q)); lsRender(rows); });

// Accounts
const laModal = document.getElementById('ob_lookupAccountModal');
const laClose = document.getElementById('ob_la_close');
const laCancel = document.getElementById('ob_la_cancel');
const laSearch = document.getElementById('ob_la_search');
const laTbody = document.getElementById('ob_la_tbody');
let laActiveTr = null;
function laRender(rows){ if (!laTbody) return; const data=Array.isArray(rows)?rows:[]; if(!data.length){ laTbody.innerHTML = '<tr><td colspan="2" style="text-align:center;padding:10px">لا يوجد حسابات</td></tr>'; return; } laTbody.innerHTML = data.map(r=>`<tr data-id="${r.id}" data-code="${r.code||''}"><td style="width:160px; text-align:center">${r.code||r.id}</td><td>${r.name||''}</td></tr>`).join(''); }
async function laOpen(tr){ laActiveTr = tr; if (!cachesLoaded || !(accountsCache&&accountsCache.length)) await loadCaches(); laRender(getOpeningLookupAccounts(accountsCache)); if (laSearch){ laSearch.value=''; setTimeout(()=> laSearch.focus(),0); } if (laModal) laModal.setAttribute('aria-hidden','false'); }
function laCloseModal(){ if (laModal) laModal.setAttribute('aria-hidden','true'); laActiveTr = null; }
laClose?.addEventListener('click', laCloseModal); laCancel?.addEventListener('click', laCloseModal); laModal?.querySelector('.modal-backdrop')?.addEventListener('click', laCloseModal);
laTbody?.addEventListener('click', (e)=>{ const row=e.target.closest('tr'); if (!row||!laActiveTr) return; const code=row.dataset.code||row.dataset.id; const c=laActiveTr.querySelector('[name="customer_id"]'); const s=laActiveTr.querySelector('[name="supplier_id"]'); const a=laActiveTr.querySelector('[name="account_id"]'); if (a) a.value=code; if (c) c.value=''; if (s) s.value=''; const nameEl=laActiveTr.querySelector('[name="name"]'); if (nameEl){ const nm = getNameByIds(null,null,code) || ''; nameEl.value = nm; } laCloseModal(); computeTotals(); });
laSearch?.addEventListener('input', ()=>{
  const q=(laSearch.value||'').trim();
  const filtered = getOpeningLookupAccounts(accountsCache);
  const rows = !q ? filtered : filtered.filter(x=> String(x.code||'').includes(q) || String(x.name||'').includes(q));
  laRender(rows);
});

// F9 keybinding and Enter navigation on inputs
tbody?.addEventListener('keydown', (e)=>{
  const inp = e.target; const tr = inp.closest('tr'); if (!tr) return;
  
  // Handle F9 key for lookups
  if (e.key === 'F9') {
    if (obScreenMode === 'view' || inp.disabled || inp.readOnly) return;
    e.preventDefault();
    if (inp.name === 'customer_id'){ lcOpen(tr); }
    else if (inp.name === 'supplier_id'){ lsOpen(tr); }
    else if (inp.name === 'account_id'){ laOpen(tr); }
    return;
  }
  
  // Handle Enter key for navigation
  if (e.key === 'Enter'){
    e.preventDefault();
    e.stopPropagation();
    
    // Check if we're trying to leave account_id without required fields
    if (inp.name === 'account_id') {
      const cVal = String(tr.querySelector('[name="customer_id"]')?.value||'').trim();
      const sVal = String(tr.querySelector('[name="supplier_id"]')?.value||'').trim();
      const aVal = String(tr.querySelector('[name="account_id"]')?.value||'').trim();
      
      // If account_id is empty and both customer_id and supplier_id are also empty
      if (!aVal && !cVal && !sVal) {
        showToast('error', tOb('validationIdRequired'));
        const customerField = tr.querySelector('input[name="customer_id"]');
        if (customerField) {
          customerField.focus();
          customerField.select();
        }
        return false;
      }
    }
    
    const order = ['type','amount','weight','karat','note'];
    let nextEl = null;
    if (inp.name === 'customer_id'){
      const has = String(inp.value||'').trim()!=='';
      nextEl = has ? tr.querySelector('[name="type"]') : tr.querySelector('[name="supplier_id"]');
    } else if (inp.name === 'supplier_id'){
      const has = String(inp.value||'').trim()!=='';
      nextEl = has ? tr.querySelector('[name="type"]') : tr.querySelector('[name="account_id"]');
    } else if (inp.name === 'account_id'){
      // ✅ Navigation allowed - validation already done above
      nextEl = tr.querySelector('[name="type"]');
    } else {
      const idx = order.indexOf(inp.name);
      if (idx >= 0){ nextEl = tr.querySelector(`[name="${order[idx+1]||''}"]`); }
    }
    if (!nextEl){ // fallback: find first focusable in next cell
      const focusables = tr.querySelectorAll('input,select,textarea,button');
      let found = false;
      for (let i=0;i<focusables.length;i++){
        if (focusables[i]===inp){ nextEl = focusables[i+1]||null; found=true; break; }
      }
      if (!found && focusables.length){ nextEl = focusables[0]; }
    }
    if (nextEl){ 
      try { 
        nextEl.focus(); 
        nextEl.select && nextEl.select(); 
      } catch(_) { 
        // Ignore focus/select errors
      } 
    }
  }
});

// Right-click to open lookup modals
tbody?.addEventListener('contextmenu', (e)=>{
  const inp = e.target; const tr = inp.closest('tr'); if (!tr) return;
  if (obScreenMode === 'view' || inp.disabled || inp.readOnly) return;
  
  // Handle right-click for lookups
  if (inp.name === 'customer_id'){ 
    e.preventDefault();
    lcOpen(tr); 
  }
  else if (inp.name === 'supplier_id'){ 
    e.preventDefault();
    lsOpen(tr); 
  }
  else if (inp.name === 'account_id'){ 
    e.preventDefault();
    laOpen(tr); 
  }
});

// Close button - navigate back to dashboard (respect unsaved changes)
if (btnClose) {
  btnClose.addEventListener('click', async () => {
    if (typeof window.canLeaveOpeningBalance === 'function') {
      const canLeave = await window.canLeaveOpeningBalance();
      if (!canLeave) return;
    }
    btnClose.style.transform = 'scale(0.95)';
    setTimeout(() => {
      btnClose.style.transform = '';
    }, 150);

    setTimeout(() => {
      try {
        const parentDoc = window.parent?.document || window.top?.document;
        if (!parentDoc) return;
        const dashTab = parentDoc.getElementById('tab-dashboard');
        if (dashTab && typeof dashTab.click === 'function') {
          dashTab.click();
        }
      } catch (_) { }
    }, 200);
  });
}

if (window.api && typeof window.api.on === 'function') {
  window.api.on('cloud-data-updated', async (payload) => {
    const tables = Array.isArray(payload?.tables) ? payload.tables : [];
    if (!tables.includes('openings')) {
      return;
    }
    if (obScreenMode !== 'view') {
      return;
    }
    try {
      await ob_refreshIdsAndIndex();
      const currentId = getOpeningInternalId();
      if (Number.isFinite(currentId) && currentId > 0 && obIds.includes(currentId)) {
        await ob_loadById(currentId);
        return;
      }
      if (obIds && obIds.length) {
        obIndex = obIds.length - 1;
        await ob_loadById(obIds[obIndex]);
        return;
      }
    } catch (_) {}
    await ob_new();
  });
}

window.addEventListener('message', async (event) => {
  if (event?.data?.type !== 'cloud-data-updated') {
    return;
  }
  const payload = event.data.payload || {};
  const tables = Array.isArray(payload?.tables) ? payload.tables : [];
  if (!tables.includes('openings')) {
    return;
  }
  if (obScreenMode !== 'view') {
    return;
  }
  try {
    await ob_refreshIdsAndIndex();
    const currentId = getOpeningInternalId();
    if (Number.isFinite(currentId) && currentId > 0 && obIds.includes(currentId)) {
      await ob_loadById(currentId);
      return;
    }
    if (obIds && obIds.length) {
      obIndex = obIds.length - 1;
      await ob_loadById(obIds[obIndex]);
      return;
    }
    await ob_new();
  } catch (_) {}
});

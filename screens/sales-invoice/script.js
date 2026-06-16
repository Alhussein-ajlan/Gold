// ========== Translation System ==========
const SI_TRANSLATIONS = {
  ar: {
    // Page title
    pageTitle: 'فاتورة البيع',
    
    // Toolbar buttons
    btnNewInvoice: 'فاتورة بيع جديدة',
    btnEdit: 'تعديل',
    btnSave: 'حفظ',
    btnSaveEdit: 'حفظ التعديل',
    btnDelete: 'حذف',
    btnCancel: 'إلغاء',
    btnPrint: 'طباعة PDF',
    btnJournalView: 'صورة الحركة',
    btnClose: 'إغلاق',
    btnWhatsApp: 'إرسال عبر واتساب',
    
    // Invoice header
    invoiceHeader: 'رأس فاتورة البيع',
    invoiceNo: 'رقم الفاتورة',
    customerNo: 'رقم العميل',
    supplierNo: 'رقم المورد',
    name: 'الاسم',
    refNo: 'رقم مرجعي',
    date: 'التاريخ',
    
    // Placeholders
    customerPlaceholder: 'F9 أو يمين',
    supplierPlaceholder: 'F9 أو يمين',
    namePlaceholder: 'اسم العميل أو المورد',
    refNoPlaceholder: 'الرقم المرجعي',
    descriptionPlaceholder: 'البيان',
    navIdPlaceholder: 'رقم',
    
    // Titles/Tooltips
    customerTitle: 'اضغط F9 أو زر الماوس الأيمن للبحث عن عميل',
    supplierTitle: 'اضغط F9 أو زر الماوس الأيمن للبحث عن مورد',
    navIdTitle: 'رقم الفاتورة',
    navFirst: 'الأول (Ctrl+←)',
    navPrev: 'السابق (←)',
    navNext: 'التالي (→)',
    navLast: 'الأخير (Ctrl+→)',
    
    // Invoice type
    invoiceTypeTaskir: 'تسكير',
    invoiceTypeMashghul: 'مشغول',
    
    // Tax and payment
    taxRateLabel: 'الضريبة %',
    taxOnLabor: 'ضريبة الأجور',
    taxOnGold: 'ضريبة الذهب',
    paymentCash: 'نقدي',
    paymentCredit: 'آجل',
    
    // Details table
    invoiceDetails: 'تفاصيل فاتورة البيع',
    btnAddLine: 'إضافة سطر',
    thItemNo: 'رقم الصنف',
    thItemName: 'اسم الصنف',
    thKarat: 'العيار',
    thWeight: 'الوزن',
    thOunce: 'الأونصة',
    thPricePerGram: 'سعر الجرام',
    thPriceAuto: '(تلقائي)',
    thLabor: 'الأجور',
    thSubtotal: 'الاجمالي قبل الضريبة',
    thTax: 'اجمالي الضريبة',
    thValue: 'القيمة',
    thRemove: 'إزالة',
    
    // Detail placeholders
    itemNoPlaceholder: 'رقم',
    itemNamePlaceholder: 'اسم الصنف',
    karatPlaceholder: 'عيار',
    weightPlaceholder: 'وزن',
    ouncePlaceholder: 'أونصة',
    pricePlaceholder: 'سعر',
    laborPlaceholder: 'أجور',
    ounceRequired: 'مطلوب!',
    
    // Item lookup modal
    lookupItemTitle: 'اختر صنف',
    lookupItemSearch: 'بحث عن صنف',
    lookupItemPlaceholder: 'اكتب رقم الصنف أو اسم الصنف للبحث',
    thItemId: 'رقم الصنف',
    thItemNameLookup: 'اسم الصنف',
    noItems: 'لا توجد أصناف',
    itemNotFound: 'الصنف رقم {id} غير موجود في قاعدة البيانات',
    itemWrongSection: 'الصنف رقم {id} ({name}) يتبع قسم "{section}" ولا يمكن استخدامه في فاتورة "{invoiceType}"',
    
    // Summary
    summaryTitle: 'الإجماليات',
    totalWeight: 'إجمالي الوزن',
    totalValue: 'إجمالي القيمة',
    gold24: 'ذهب 24',
    gold22: 'ذهب 22',
    gold21: 'ذهب 21',
    gold18: 'ذهب 18',
    silver999: 'فضة 999',
    silver925: 'فضة 925',
    silver900: 'فضة 900',
    silver800: 'فضة 800',
    
    // Karat datalist
    karatGold24: 'ذهب 24',
    karatGold22: 'ذهب 22',
    karatGold21: 'ذهب 21',
    karatGold18: 'ذهب 18',
    karatSilver999: 'فضة 999',
    karatSilver925: 'فضة 925',
    karatSilver900: 'فضة 900',
    karatSilver800: 'فضة 800',
    
    // Customer lookup modal
    lookupCustomerTitle: 'اختر عميل',
    lookupCustomerSearch: 'بحث عن عميل',
    lookupCustomerPlaceholder: 'اكتب رقم العميل أو اسم العميل للبحث',
    thCustomerId: 'رقم العميل',
    thCustomerName: 'اسم العميل',
    noCustomers: 'لا توجد عملاء',
    noResults: 'لا توجد نتائج',
    
    // Supplier lookup modal
    lookupSupplierTitle: 'اختر مورد',
    lookupSupplierSearch: 'بحث عن مورد',
    lookupSupplierPlaceholder: 'اكتب رقم المورد أو اسم المورد للبحث',
    thSupplierId: 'رقم المورد',
    thSupplierName: 'اسم المورد',
    noSuppliers: 'لا توجد موردين',
    
    // Confirm delete invoice modal
    confirmDeleteTitle: 'تأكيد الحذف',
    confirmDeleteInvoice: 'هل أنت متأكد من أنك تريد حذف هذه الفاتورة؟',
    confirmYes: 'نعم، احذف',
    confirmNo: 'إلغاء الأمر',
    
    // Confirm delete detail modal
    confirmDeleteDetail: 'هل أنت متأكد من حذف هذا السطر؟',
    
    // Duplicate ref modal
    duplicateRefTitle: 'تحذير - رقم مرجعي مكرر',
    duplicateRefMessage: 'الرقم المرجعي المدخل موجود مسبقاً!',
    duplicateRefDetail: 'يرجى إدخال رقم مرجعي مختلف لتجنب التكرار.',
    btnOk: 'حسناً',

    // Unsaved changes modal
    unsavedTitle: 'تغييرات غير محفوظة',
    unsavedMessage: 'لديك تعديلات لم يتم حفظها بعد',
    unsavedDetail: 'هل تريد المتابعة والخروج بدون حفظ التغييرات؟',
    unsavedStay: 'العودة للتعديل',
    unsavedLeave: 'خروج بدون حفظ',
    
    // User tracking
    createdBy: 'أنشئ بواسطة:',
    lastModified: 'آخر تعديل:',
    
    // Toast messages
    toastSuccess: 'تم بنجاح',
    toastError: 'حدث خطأ',
    apiNotAvailable: 'salesInvoice API غير متاح',
    loadError: 'خطأ في تحميل الفاتورة',
    saveFirst: 'يرجى حفظ الفاتورة أولاً',
    printWindowFailed: 'فشل فتح نافذة الطباعة. تأكد من السماح بالنوافذ المنبثقة',
    printPrepareError: 'خطأ في تجهيز الطباعة',
    selectCustomerOrSupplier: 'يرجى اختيار عميل أو مورد',
    phoneNotFound: 'رقم الهاتف غير موجود',
    phoneInvalid: 'رقم الهاتف غير صحيح',
    preparingWhatsApp: 'جاري تجهيز صورة الفاتورة...',
    whatsAppError: 'خطأ في إرسال الفاتورة عبر واتساب',
    customerNotFound: 'العميل رقم {id} غير موجود',
    supplierNotFound: 'المورد رقم {id} غير موجود',
    karatNotAllowed: 'العيار {karat} غير مسموح. الذهب: 24، 22، 21، 18 | الفضة: 999، 925، 900، 800',
    viewModeOnly: 'الشاشة في وضع عرض فقط. اضغط زر "تعديل" أولاً',
    editNotEnabled: 'صلاحية التعديل لهذه الفاتورة غير مفعلة. اضغط زر "تعديل" مرة أخرى',
    cannotSaveNewInView: 'لا يمكن حفظ فاتورة جديدة في وضع العرض. اضغط زر "فاتورة بيع جديدة" أولاً',
    invoiceSaved: 'تم حفظ الفاتورة بنجاح',
    invoiceUpdated: 'تم تحديث الفاتورة بنجاح',
    saveFailed: 'فشل حفظ الفاتورة',
    invoiceDeleted: 'تم حذف الفاتورة بنجاح',
    deleteFailed: 'فشل حذف الفاتورة',
    cannotEnterBoth: 'لا يمكن إدخال رقم العميل والمورد معاً. يرجى اختيار أحدهما فقط',
    enterCustomerOrSupplier: 'يرجى إدخال رقم العميل أو المورد',
    enterDate: 'يرجى إدخال التاريخ',
    addAtLeastOneLine: 'يرجى إضافة سطر واحد على الأقل',
    selectKaratForAll: 'يرجى تحديد العيار لجميع الأسطر',
    invalidKaratExists: 'يوجد عيار غير مسموح به. الذهب: 24، 22، 21، 18 | الفضة: 999، 925، 900، 800',
    enterOunceForWeight: 'يرجى إدخال الأونصة لجميع الأسطر التي تحتوي على وزن',
    noInvoiceToEdit: 'لا توجد فاتورة مفتوحة للتعديل',
    noInvoiceToDelete: 'لا توجد فاتورة محددة للحذف',
    
    // Print template
    printTitle: 'فاتورة بيع',
    printInvoiceNo: 'رقم الفاتورة:',
    printDate: 'التاريخ:',
    printTime: 'الوقت:',
    printCustomer: 'العميل:',
    printSupplier: 'المورد:',
    printDescription: 'البيان:',
    printButton: 'طباعة'
  },
  en: {
    // Page title
    pageTitle: 'Sales Invoice',
    
    // Toolbar buttons
    btnNewInvoice: 'New Sales Invoice',
    btnEdit: 'Edit',
    btnSave: 'Save',
    btnSaveEdit: 'Save Changes',
    btnDelete: 'Delete',
    btnCancel: 'Cancel',
    btnPrint: 'Print PDF',
    btnJournalView: 'Movement Image',
    btnClose: 'Close',
    btnWhatsApp: 'Send via WhatsApp',
    
    // Invoice header
    invoiceHeader: 'Sales Invoice Header',
    invoiceNo: 'Invoice No.',
    customerNo: 'Customer No.',
    supplierNo: 'Supplier No.',
    name: 'Name',
    refNo: 'Reference No.',
    date: 'Date',
    
    // Placeholders
    customerPlaceholder: 'F9 or Right-click',
    supplierPlaceholder: 'F9 or Right-click',
    namePlaceholder: 'Customer or Supplier Name',
    refNoPlaceholder: 'Reference Number',
    descriptionPlaceholder: 'Description',
    navIdPlaceholder: 'No.',
    
    // Titles/Tooltips
    customerTitle: 'Press F9 or right-click to search for customer',
    supplierTitle: 'Press F9 or right-click to search for supplier',
    navIdTitle: 'Invoice Number',
    navFirst: 'First (Ctrl+→)',
    navPrev: 'Previous (→)',
    navNext: 'Next (←)',
    navLast: 'Last (Ctrl+←)',

    // Tax and payment
    taxRateLabel: 'Tax %',
    taxOnLabor: 'Labor Tax',
    taxOnGold: 'Gold Tax',
    paymentCash: 'Cash',
    paymentCredit: 'Credit',

    // Invoice type
    invoiceTypeTaskir: 'Scrap',
    invoiceTypeMashghul: 'Crafted',
    
    // Details table
    invoiceDetails: 'Sales Invoice Details',
    btnAddLine: 'Add Line',
    thItemNo: 'Item No.',
    thItemName: 'Item Name',
    thKarat: 'Karat',
    thWeight: 'Weight',
    thOunce: 'Ounce',
    thPricePerGram: 'Price/Gram',
    thPriceAuto: '(Auto)',
    thLabor: 'Labor',
    thSubtotal: 'Subtotal',
    thTax: 'Tax',
    thValue: 'Value',
    thRemove: 'Remove',
    
    // Detail placeholders
    itemNoPlaceholder: 'No.',
    itemNamePlaceholder: 'Item Name',
    karatPlaceholder: 'Karat',
    weightPlaceholder: 'Weight',
    ouncePlaceholder: 'Ounce',
    pricePlaceholder: 'Price',
    laborPlaceholder: 'Labor',
    ounceRequired: 'Required!',
    
    // Item lookup modal
    lookupItemTitle: 'Select Item',
    lookupItemSearch: 'Search for Item',
    lookupItemPlaceholder: 'Type item number or name to search',
    thItemId: 'Item No.',
    thItemNameLookup: 'Item Name',
    noItems: 'No items found',
    itemNotFound: 'Item #{id} not found in database',
    itemWrongSection: 'Item #{id} ({name}) belongs to "{section}" section and cannot be used in "{invoiceType}" invoice',
    
    // Summary
    summaryTitle: 'Totals',
    totalWeight: 'Total Weight',
    totalValue: 'Total Value',
    gold24: 'Gold 24K',
    gold22: 'Gold 22K',
    gold21: 'Gold 21K',
    gold18: 'Gold 18K',
    silver999: 'Silver 999',
    silver925: 'Silver 925',
    silver900: 'Silver 900',
    silver800: 'Silver 800',
    
    // Karat datalist
    karatGold24: 'Gold 24K',
    karatGold22: 'Gold 22K',
    karatGold21: 'Gold 21K',
    karatGold18: 'Gold 18K',
    karatSilver999: 'Silver 999',
    karatSilver925: 'Silver 925',
    karatSilver900: 'Silver 900',
    karatSilver800: 'Silver 800',
    
    // Customer lookup modal
    lookupCustomerTitle: 'Select Customer',
    lookupCustomerSearch: 'Search for Customer',
    lookupCustomerPlaceholder: 'Type customer ID or name to search',
    thCustomerId: 'Customer ID',
    thCustomerName: 'Customer Name',
    noCustomers: 'No customers found',
    noResults: 'No results found',
    
    // Supplier lookup modal
    lookupSupplierTitle: 'Select Supplier',
    lookupSupplierSearch: 'Search for Supplier',
    lookupSupplierPlaceholder: 'Type supplier ID or name to search',
    thSupplierId: 'Supplier ID',
    thSupplierName: 'Supplier Name',
    noSuppliers: 'No suppliers found',
    
    // Confirm delete invoice modal
    confirmDeleteTitle: 'Confirm Delete',
    confirmDeleteInvoice: 'Are you sure you want to delete this invoice?',
    confirmYes: 'Yes, Delete',
    confirmNo: 'Cancel',
    
    // Confirm delete detail modal
    confirmDeleteDetail: 'Are you sure you want to delete this line?',
    
    // Duplicate ref modal
    duplicateRefTitle: 'Warning - Duplicate Reference',
    duplicateRefMessage: 'This reference number already exists!',
    duplicateRefDetail: 'Please enter a different reference number to avoid duplication.',
    btnOk: 'OK',

    // Unsaved changes modal
    unsavedTitle: 'Unsaved Changes',
    unsavedMessage: 'You have unsaved changes on this invoice',
    unsavedDetail: 'Do you want to leave without saving your changes?',
    unsavedStay: 'Back to Edit',
    unsavedLeave: 'Leave',
    
    // User tracking
    createdBy: 'Created by:',
    lastModified: 'Last modified:',
    
    // Toast messages
    toastSuccess: 'Success',
    toastError: 'Error occurred',
    apiNotAvailable: 'salesInvoice API not available',
    loadError: 'Error loading invoice',
    saveFirst: 'Please save the invoice first',
    printWindowFailed: 'Failed to open print window. Make sure pop-ups are allowed',
    printPrepareError: 'Error preparing print',
    selectCustomerOrSupplier: 'Please select a customer or supplier',
    phoneNotFound: 'Phone number not found',
    phoneInvalid: 'Invalid phone number',
    preparingWhatsApp: 'Preparing invoice image...',
    whatsAppError: 'Error sending invoice via WhatsApp',
    customerNotFound: 'Customer #{id} not found',
    supplierNotFound: 'Supplier #{id} not found',
    karatNotAllowed: 'Karat {karat} not allowed. Gold: 24, 22, 21, 18 | Silver: 999, 925, 900, 800',
    viewModeOnly: 'Screen is in view mode only. Click "Edit" first',
    editNotEnabled: 'Edit permission for this invoice is not enabled. Click "Edit" again',
    cannotSaveNewInView: 'Cannot save new invoice in view mode. Click "New Sales Invoice" first',
    invoiceSaved: 'Invoice saved successfully',
    invoiceUpdated: 'Invoice updated successfully',
    saveFailed: 'Failed to save invoice',
    invoiceDeleted: 'Invoice deleted successfully',
    deleteFailed: 'Failed to delete invoice',
    cannotEnterBoth: 'Cannot enter both customer and supplier. Please choose one only',
    enterCustomerOrSupplier: 'Please enter customer or supplier number',
    enterDate: 'Please enter date',
    addAtLeastOneLine: 'Please add at least one line',
    selectKaratForAll: 'Please select karat for all lines',
    invalidKaratExists: 'Invalid karat exists. Gold: 24, 22, 21, 18 | Silver: 999, 925, 900, 800',
    enterOunceForWeight: 'Please enter ounce for all lines with weight',
    noInvoiceToEdit: 'No invoice open for editing',
    noInvoiceToDelete: 'No invoice selected for deletion',
    
    // Print template
    printTitle: 'Sales Invoice',
    printInvoiceNo: 'Invoice No.:',
    printDate: 'Date:',
    printTime: 'Time:',
    printCustomer: 'Customer:',
    printSupplier: 'Supplier:',
    printDescription: 'Description:',
    printButton: 'Print'
  }
};

// Translation helper functions
function getSILang() {
  try {
    return localStorage.getItem('uiLang') === 'en' ? 'en' : 'ar';
  } catch (e) {
    return 'ar';
  }
}

function tSI(key) {
  const lang = getSILang();
  return SI_TRANSLATIONS[lang]?.[key] || SI_TRANSLATIONS['ar']?.[key] || key;
}

// Apply static translations to UI elements
function applySalesInvoiceStaticTexts() {
  const lang = getSILang();
  const isRtl = lang === 'ar';
  const dir = isRtl ? 'rtl' : 'ltr';
  
  // Set document direction
  document.documentElement.lang = lang;
  document.documentElement.dir = dir;
  document.body.dir = dir;
  
  // Helper to set text content
  const setText = (id, key) => {
    const el = document.getElementById(id);
    if (el) el.textContent = tSI(key);
  };
  
  // Helper to set text with icon (with proper spacing)
  const setTextWithIcon = (id, key, iconClass) => {
    const el = document.getElementById(id);
    if (el) {
      el.style.display = 'inline-flex';
      el.style.alignItems = 'center';
      el.style.gap = '6px';
      el.innerHTML = `<i class="${iconClass}"></i><span>${tSI(key)}</span>`;
    }
  };
  
  // Helper to set placeholder
  const setPlaceholder = (id, key) => {
    const el = document.getElementById(id);
    if (el) el.placeholder = tSI(key);
  };
  
  // Helper to set title
  const setTitle = (id, key) => {
    const el = document.getElementById(id);
    if (el) el.title = tSI(key);
  };
  
  // Toolbar buttons
  setTextWithIcon('btnNewInvoiceText', 'btnNewInvoice', 'fa-solid fa-wand-magic-sparkles');
  setTextWithIcon('si_btnEditText', 'btnEdit', 'fa-solid fa-pen-to-square');
  setTextWithIcon('si_btnSaveText', 'btnSave', 'fa-solid fa-circle-check');
  setTextWithIcon('si_btnDeleteText', 'btnDelete', 'fa-solid fa-circle-xmark');
  setTextWithIcon('si_btnPrintText', 'btnPrint', 'fa-solid fa-file-pdf');
  setTextWithIcon('si_btnCloseText', 'btnClose', 'fa-solid fa-arrow-right-from-bracket');
  setTitle('si_btnWhatsApp', 'btnWhatsApp');
  
  // Journal View button
  const btnJournalViewEl = document.getElementById('si_btnJournalView');
  if (btnJournalViewEl) {
    const span = btnJournalViewEl.querySelector('span');
    if (span) span.innerHTML = `<i class="fa-solid fa-file-invoice"></i> ${tSI('btnJournalView')}`;
  }
  
  // Invoice header
  setText('si_header_title', 'invoiceHeader');
  setText('si_label_invoiceNo', 'invoiceNo');
  setText('si_label_customerNo', 'customerNo');
  setText('si_label_supplierNo', 'supplierNo');
  setText('si_label_name', 'name');
  setText('si_label_refNo', 'refNo');
  setText('si_label_date', 'date');
  setText('si_label_taxRate', 'taxRateLabel');
  setTitle('si_tax_rate', 'taxRateLabel');
  
  // Header field placeholders and titles
  setPlaceholder('si_customer_no', 'customerPlaceholder');
  setPlaceholder('si_supplier_no', 'supplierPlaceholder');
  setPlaceholder('si_name', 'namePlaceholder');
  setPlaceholder('si_ref_no', 'refNoPlaceholder');
  setPlaceholder('si_nav_id', 'navIdPlaceholder');
  setTitle('si_customer_no', 'customerTitle');
  setTitle('si_supplier_no', 'supplierTitle');
  setTitle('si_nav_id', 'navIdTitle');
  
  // Navigation tooltips
  setTitle('si_nav_first', 'navFirst');
  setTitle('si_nav_prev', 'navPrev');
  setTitle('si_nav_next', 'navNext');
  setTitle('si_nav_last', 'navLast');

  // Tax toggles and payment type texts
  const taxLaborText = document.querySelector('label.tax-toggle-btn[for="si_tax_on_labor"] .toggle-btn-text');
  if (taxLaborText) taxLaborText.textContent = tSI('taxOnLabor');
  const payCashText = document.querySelector('label.tax-toggle-btn[for="si_payment_cash"] .toggle-btn-text');
  if (payCashText) payCashText.textContent = tSI('paymentCash');
  const payCreditText = document.querySelector('label.tax-toggle-btn[for="si_payment_credit"] .toggle-btn-text');
  if (payCreditText) payCreditText.textContent = tSI('paymentCredit');
  
  // Invoice type buttons
  const btnTaskir = document.getElementById('si_type_taskir');
  const btnMashghul = document.getElementById('si_type_mashghul');
  if (btnTaskir) {
    const span = btnTaskir.querySelector('span');
    if (span) span.textContent = tSI('invoiceTypeTaskir');
  }
  if (btnMashghul) {
    const span = btnMashghul.querySelector('span');
    if (span) span.textContent = tSI('invoiceTypeMashghul');
  }
  
  // Details section
  setText('si_details_title', 'invoiceDetails');
  setPlaceholder('si_description', 'descriptionPlaceholder');
  setTextWithIcon('si_btnAddLineText', 'btnAddLine', 'fa-solid fa-circle-plus');
  
  // Table headers
  setText('si_th_item_no', 'thItemNo');
  setText('si_th_item_name', 'thItemName');
  setText('si_th_karat', 'thKarat');
  setText('si_th_weight', 'thWeight');
  setText('si_th_ounce', 'thOunce');
  setText('si_th_price', 'thPricePerGram');
  setText('si_th_price_auto', 'thPriceAuto');
  setText('si_th_labor', 'thLabor');
  setText('si_th_subtotal', 'thSubtotal');
  setText('si_th_tax', 'thTax');
  setText('si_th_value', 'thValue');
  setText('si_th_value_auto', 'thPriceAuto');
  setText('si_th_remove', 'thRemove');

  // Item lookup modal
  const liTitle = document.getElementById('li_modal_title');
  const liSearchLabel = document.getElementById('li_search_label');
  const liSearchInput = document.getElementById('li_search');
  const liThId = document.getElementById('li_th_id');
  const liThName = document.getElementById('li_th_name');
  const liThKarat = document.getElementById('li_th_karat');
  const liCancelEl = document.getElementById('li_cancel_text');
  if (liTitle) liTitle.textContent = tSI('lookupItemTitle');
  if (liSearchLabel) liSearchLabel.textContent = tSI('lookupItemSearch');
  if (liSearchInput) liSearchInput.placeholder = tSI('lookupItemPlaceholder');
  if (liThId) liThId.textContent = tSI('thItemId');
  if (liThName) liThName.textContent = tSI('thItemNameLookup');
  if (liThKarat) liThKarat.textContent = tSI('thKarat');
  if (liCancelEl) {
    liCancelEl.style.display = 'inline-flex';
    liCancelEl.style.alignItems = 'center';
    liCancelEl.style.gap = '6px';
    liCancelEl.innerHTML = `<i class="fa-regular fa-circle-xmark"></i><span>${tSI('btnCancel')}</span>`;
  }
  
  // Summary section
  setText('si_summary_title', 'summaryTitle');
  setText('si_lbl_total_weight', 'totalWeight');
  setText('si_lbl_total_value', 'totalValue');
  setText('si_lbl_gold24', 'gold24');
  setText('si_lbl_gold22', 'gold22');
  setText('si_lbl_gold21', 'gold21');
  setText('si_lbl_gold18', 'gold18');
  setText('si_lbl_silver999', 'silver999');
  setText('si_lbl_silver925', 'silver925');
  setText('si_lbl_silver900', 'silver900');
  setText('si_lbl_silver800', 'silver800');
  
  // Customer lookup modal
  setText('lc_modal_title', 'lookupCustomerTitle');
  setText('lc_search_label', 'lookupCustomerSearch');
  setPlaceholder('lc_search', 'lookupCustomerPlaceholder');
  setText('lc_th_id', 'thCustomerId');
  setText('lc_th_name', 'thCustomerName');
  // Fix table header alignment for LTR
  const lcThId = document.getElementById('lc_th_id');
  const lcThName = document.getElementById('lc_th_name');
  if (!isRtl) {
    if (lcThId) lcThId.style.textAlign = 'left';
    if (lcThName) lcThName.style.textAlign = 'left';
  }
  // Cancel button with proper icon spacing
  const lcCancelEl = document.getElementById('lc_cancel_text');
  if (lcCancelEl) {
    lcCancelEl.style.display = 'inline-flex';
    lcCancelEl.style.alignItems = 'center';
    lcCancelEl.style.gap = '6px';
    lcCancelEl.innerHTML = `<i class="fa-regular fa-circle-xmark"></i><span>${tSI('btnCancel')}</span>`;
  }
 
  // Supplier lookup modal
  setText('ls_modal_title', 'lookupSupplierTitle');
  setText('ls_search_label', 'lookupSupplierSearch');
  setPlaceholder('ls_search', 'lookupSupplierPlaceholder');
  setText('ls_th_id', 'thSupplierId');
  setText('ls_th_name', 'thSupplierName');
  // Fix table header alignment for LTR
  const lsThId = document.getElementById('ls_th_id');
  const lsThName = document.getElementById('ls_th_name');
  if (!isRtl) {
    if (lsThId) lsThId.style.textAlign = 'left';
    if (lsThName) lsThName.style.textAlign = 'left';
  }
  // Cancel button with proper icon spacing
  const lsCancelEl = document.getElementById('ls_cancel_text');
  if (lsCancelEl) {
    lsCancelEl.style.display = 'inline-flex';
    lsCancelEl.style.alignItems = 'center';
    lsCancelEl.style.gap = '6px';
    lsCancelEl.innerHTML = `<i class="fa-regular fa-circle-xmark"></i><span>${tSI('btnCancel')}</span>`;
  }
  
  // Confirm delete invoice modal
  setText('confirmInvoiceDelTitle', 'confirmDeleteTitle');
  setText('confirmInvoiceDelMsg', 'confirmDeleteInvoice');
  setTextWithIcon('confirmInvoiceDelYesText', 'confirmYes', 'fa-regular fa-circle-check');
  setTextWithIcon('confirmInvoiceDelNoText', 'confirmNo', 'fa-regular fa-circle-xmark');
  
  // Confirm delete detail modal
  setText('confirmDetailDelTitle', 'confirmDeleteTitle');
  setText('confirmDetailDelMsg', 'confirmDeleteDetail');
  setTextWithIcon('confirmDetailDelYesText', 'confirmYes', 'fa-regular fa-circle-check');
  setTextWithIcon('confirmDetailDelNoText', 'confirmNo', 'fa-regular fa-circle-xmark');
  
  // Duplicate ref modal
  setText('duplicateRefModalTitle', 'duplicateRefTitle');
  setText('duplicateRefMessage', 'duplicateRefMessage');
  setText('duplicateRefDetail', 'duplicateRefDetail');
  setTextWithIcon('duplicateRefCloseText', 'btnOk', 'fa-solid fa-check');
  
  // Unsaved changes modal
  setText('unsavedChangesTitle', 'unsavedTitle');
  setText('unsavedChangesMessage', 'unsavedMessage');
  setText('unsavedChangesDetail', 'unsavedDetail');
  setText('unsavedStayBtnText', 'unsavedStay');
  setText('unsavedLeaveBtnText', 'unsavedLeave');
  
  // Fix navigation arrows based on language direction
  // HTML order is: [Last] [Next] [input] [counter] [Prev] [First] [time]
  // In RTL: flex displays right-to-left, so First appears on right - correct
  // In LTR: flex displays left-to-right, so Last appears on left - need to reverse
  const navControls = document.querySelector('.nav-controls');
  const navFirst = document.getElementById('si_nav_first');
  const navLast = document.getElementById('si_nav_last');
  const navPrev = document.getElementById('si_nav_prev');
  const navNext = document.getElementById('si_nav_next');
  
  // Keep original icons - they make semantic sense
  if (navFirst) navFirst.innerHTML = '<i class="fa-solid fa-angles-left"></i>';
  if (navLast) navLast.innerHTML = '<i class="fa-solid fa-angles-right"></i>';
  if (navPrev) navPrev.innerHTML = '<i class="fa-solid fa-angle-left"></i>';
  if (navNext) navNext.innerHTML = '<i class="fa-solid fa-angle-right"></i>';
  
  // Reverse the flex direction for LTR to fix visual order
  if (navControls) {
    if (isRtl) {
      navControls.style.flexDirection = 'row';
    } else {
      navControls.style.flexDirection = 'row-reverse';
    }
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  // Apply translations
  applySalesInvoiceStaticTexts();

  // Bridge APIs from parent/top if not present locally
  (function ensureAPIBridge(){
    try{
      const pick = (name)=>{
        if (!window[name]){
          if (window.parent && window.parent[name]) {
            window[name] = window.parent[name];
          } else if (window.top && window.top[name]) {
            window[name] = window.top[name];
          }
        }
      };
      ['db', 'suppliers', 'api', 'sys', 'salesInvoice'].forEach(pick);
    }catch(e){ }
  })();

  // Wait for APIs to be available (after bridge attempt)
  let retries = 0;
  while (!window.salesInvoice && retries < 30) {
    await new Promise(resolve => setTimeout(resolve, 100));
    retries++;
  }
  
  if (!window.salesInvoice) {
    console.error('salesInvoice API not available after waiting');
    showToast('error', tSI('apiNotAvailable'));
    return;
  }
  
  // Load invoice settings from database
  let invoiceSettings = null;
  await Promise.all([
    (async () => {
      try {
        const result = await window.api?.getInvoiceSettings?.();
        if (result && result.success && result.data) {
          invoiceSettings = result.data;
        }
      } catch (error) {
        // Use default settings
      }
    })(),
    (async () => {
      if (window.ScreenPermissions) {
        await window.ScreenPermissions.init();
      }
    })()
  ]);
  
  // UI Elements
  const btnNew = document.getElementById('si_btnNew');
  const btnEditTop = document.getElementById('si_btnEditTop');
  const btnSaveTop = document.getElementById('si_btnSaveTop');
  const btnDeleteTop = document.getElementById('si_btnDeleteTop');
  const btnPrintTop = document.getElementById('si_btnPrintTop');
  const btnJournalView = document.getElementById('si_btnJournalView');
  const btnAddLine = document.getElementById('si_btnAddLine');
  const btnClose = document.getElementById('si_btnClose');
  
  // Header fields
  const siId = document.getElementById('si_id');
  const siCustomerNo = document.getElementById('si_customer_no');
  const siSupplierNo = document.getElementById('si_supplier_no');
  const siName = document.getElementById('si_name');
  const siTaxRate = document.getElementById('si_tax_rate');
  const siRefNo = document.getElementById('si_ref_no');
  const siDate = document.getElementById('si_date');
  const siTime = document.getElementById('si_time');
  const siDescription = document.getElementById('si_description');
  
  // Tax checkboxes
  const siTaxOnLabor = document.getElementById('si_tax_on_labor');
  
  // Apply invoice settings
  if (invoiceSettings) {
    // Apply tax settings
    if (siTaxRate) {
      siTaxRate.value = invoiceSettings.taxRate || 15;
      if (invoiceSettings.lockTaxRate) {
        siTaxRate.disabled = true;
        siTaxRate.style.opacity = '0.6';
        siTaxRate.style.cursor = 'not-allowed';
        siTaxRate.title = 'نسبة الضريبة مقفلة من الإعدادات';
      }
    }
    
    if (siTaxOnLabor) {
      siTaxOnLabor.checked = Boolean(invoiceSettings.taxOnLabor);
      if (invoiceSettings.lockTaxOnLabor) {
        siTaxOnLabor.disabled = true;
        siTaxOnLabor.style.opacity = '0.6';
        siTaxOnLabor.style.cursor = 'not-allowed';
        const label = siTaxOnLabor.parentElement;
        if (label) label.title = 'الضريبة على الأجور مقفلة من الإعدادات';
      }
    }
    
    // Apply payment type settings
    const paymentTypeRadios = document.querySelectorAll('input[name="si_payment_type"]');
    if (paymentTypeRadios.length > 0) {
      // Set default payment type
      const defaultPayment = invoiceSettings.defaultPaymentType || 'credit';
      paymentTypeRadios.forEach(radio => {
        if (radio.value === defaultPayment) {
          radio.checked = true;
        }
        // Lock payment type if needed
        if (invoiceSettings.lockPaymentType) {
          radio.disabled = true;
          radio.style.opacity = '0.6';
          radio.style.cursor = 'not-allowed';
          const label = radio.parentElement;
          if (label) label.title = 'نوع الدفع مقفل من الإعدادات';
        }
      });
    }
  }
  
  // عند تغيير نسبة الضريبة، أعد حساب الضريبة لجميع الصفوف
  if (siTaxRate) {
    siTaxRate.addEventListener('input', () => {
      recalculateAllRowsTax();
      markUnsaved();
    });
  }
  
  // عند تغيير خيارات الضريبة (الأجور)
  if (siTaxOnLabor) {
    siTaxOnLabor.addEventListener('change', () => {
      recalculateAllRowsTax();
      markUnsaved();
    });
  }
  
  // دالة لإعادة حساب الضريبة لجميع الصفوف
  function recalculateAllRowsTax() {
    const rows = document.querySelectorAll('#si_detailsTable tbody tr');
    rows.forEach(tr => {
      // أعد حساب القيمة مع الضريبة
      calculateRowValue(tr, false);
    });
  }
  
  // دالة لحساب المبلغ الخاضع للضريبة بناءً على الخيارات المحددة
  function getTaxableAmount(goldValue, laborValue) {
    const taxOnLabor = siTaxOnLabor?.checked || false;
    
    let taxableAmount = 0;
    if (taxOnLabor) taxableAmount += laborValue;
    // الضريبة على الذهب دائماً
    taxableAmount += goldValue;
    
    return taxableAmount;
  }
  
  // Invoice type buttons (مشغول/تسكير)
  const invoiceTypeButtons = Array.from(document.querySelectorAll('.invoice-type-btn, .invoice-type-btn-compact'));
  
  // Set default type from settings
  let currentInvoiceType = invoiceSettings && invoiceSettings.defaultInvoiceType === 'mashghul' ? 'mashghul' : 'taskir';

  invoiceTypeButtons.forEach(btn => {
    if (invoiceSettings && !invoiceSettings.allowInvoiceTypeChange) {
      btn.disabled = true;
      btn.style.opacity = '0.6';
      btn.style.cursor = 'not-allowed';
      btn.title = 'تغيير نوع الفاتورة مقفل من الإعدادات';
    }
  });

  function applyInvoiceTypeState(invoiceType, { preserveExistingTaxValues = false } = {}) {
    currentInvoiceType = invoiceType === 'mashghul' ? 'mashghul' : 'taskir';

    invoiceTypeButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.type === currentInvoiceType);
    });

    document.body.classList.toggle('invoice-type-taskir', currentInvoiceType === 'taskir');
    document.body.classList.toggle('invoice-type-mashghul', currentInvoiceType === 'mashghul');

    if (currentInvoiceType === 'taskir') {
      if (siTaxRate) siTaxRate.value = '0';
      if (siTaxOnLabor) siTaxOnLabor.checked = false;
      return;
    }

    if (!preserveExistingTaxValues) {
      if (siTaxRate) {
        siTaxRate.value = (invoiceSettings && invoiceSettings.taxRate !== undefined && invoiceSettings.taxRate !== null && invoiceSettings.taxRate !== '')
          ? invoiceSettings.taxRate
          : 15;
      }
      if (siTaxOnLabor) {
        siTaxOnLabor.checked = invoiceSettings ? Boolean(invoiceSettings.taxOnLabor) : true;
      }
    }
  }

  applyInvoiceTypeState(currentInvoiceType);

  function resetRowsForInvoiceType() {
    const allRows = detailsTbody.querySelectorAll('tr');
    allRows.forEach(row => {
      const inpItemNo = row.querySelector('.detail-item-no');
      const inpItemName = row.querySelector('.detail-item-name');
      const inpKarat = row.querySelector('.detail-karat');
      if (inpItemNo) inpItemNo.value = '';
      if (inpItemName) inpItemName.value = '';
      if (inpKarat) inpKarat.value = '';

      if (currentInvoiceType === 'mashghul') {
        const inpOunce = row.querySelector('.detail-ounce');
        const inpPrice = row.querySelector('.detail-price');
        if (inpOunce) { inpOunce.value = ''; inpOunce.dataset.adjustmentApplied = ''; }
        if (inpPrice) { inpPrice.value = ''; delete inpPrice.dataset.rawPrice; delete inpPrice.dataset.manualEdit; }
      } else {
        const inpLabor = row.querySelector('.detail-labor');
        if (inpLabor) inpLabor.value = '';
      }
      calculateRowValue(row);
    });
  }
  
  // Invoice type selector handlers
  function setupInvoiceTypeSelector() {
    invoiceTypeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.disabled) return;
        
        // Check if change is allowed
        if (invoiceSettings && !invoiceSettings.allowInvoiceTypeChange) {
          return;
        }

        applyInvoiceTypeState(btn.dataset.type);
        resetRowsForInvoiceType();
        updateSummaryTotals();
        
        markUnsaved();
      });
    });
  }
  setupInvoiceTypeSelector();

  // Unsaved changes modal
  const unsavedModal = document.getElementById('unsavedChangesModal');
  const unsavedClose = document.getElementById('unsavedChangesClose');
  const unsavedStayBtn = document.getElementById('unsavedStayBtn');
  const unsavedLeaveBtn = document.getElementById('unsavedLeaveBtn');
  
  // Duplicate ref modal
  const duplicateRefModal = document.getElementById('duplicateRefModal');
  const duplicateRefMessage = document.getElementById('duplicateRefMessage');
  const duplicateRefDetail = document.getElementById('duplicateRefDetail');
  const duplicateRefClose = document.getElementById('duplicateRefClose');
  
  // Details table
  const detailsTable = document.getElementById('si_detailsTable');
  const detailsTbody = detailsTable.querySelector('tbody');
  
  // Summary elements
  const totalWeightEl = document.getElementById('si_total_weight');
  const totalValueEl = document.getElementById('si_total_value');
  const karat24El = document.getElementById('si_karat_24');
  const karat22El = document.getElementById('si_karat_22');
  const karat21El = document.getElementById('si_karat_21');
  const karat18El = document.getElementById('si_karat_18');
  const silver999El = document.getElementById('si_silver_999');
  const silver925El = document.getElementById('si_silver_925');
  const silver900El = document.getElementById('si_silver_900');
  const silver800El = document.getElementById('si_silver_800');
  
  // Navigation
  const navFirst = document.getElementById('si_nav_first');
  const navPrev = document.getElementById('si_nav_prev');
  const navNext = document.getElementById('si_nav_next');
  const navLast = document.getElementById('si_nav_last');
  const navIdInp = document.getElementById('si_nav_id');
  const navCounter = document.getElementById('si_nav_counter');
  
  // User tracking
  const userTrackingInfo = document.getElementById('si_user_tracking_info');
  const createdInfo = document.getElementById('si_created_info');
  const updatedInfo = document.getElementById('si_updated_info');
  
  // ========== Ounce Calculation Function ==========
  // Load invoice settings and calculate price per gram from ounce
  
  async function loadInvoiceSettings() {
    try {
      const result = await window.api?.getInvoiceSettings?.({ forceFresh: true });
      if (result && result.success && result.data) {
        invoiceSettings = result.data;
      } else {
        // Default settings
        invoiceSettings = {
          ounceCalculationType: 'default',
          conversionFactor: 31.1035,
          exchangeRate: 3.75,
          goldMultiplier: 0.12056,
          gold2Multiplier: 0.120555,
          customMultiplier: 1,
          taxRate: 15,
          taxEnabled: 1,
          taxOnLabor: 1,
          defaultInvoiceType: 'taskir'
        };
      }
      
      // تطبيق نسبة الضريبة على الحقل (إذا لم تكن فاتورة تسكير)
      if (siTaxRate && invoiceSettings) {
        const currentType = currentInvoiceType || invoiceSettings.defaultInvoiceType || 'taskir';
        if (currentType === 'taskir') {
          siTaxRate.value = '0';
        } else {
          siTaxRate.value = invoiceSettings.taxRate || 15;
        }
      }
      
    } catch (error) {
      // Use default settings
      invoiceSettings = {
        ounceCalculationType: 'default',
        conversionFactor: 31.1035,
        exchangeRate: 3.75,
        goldMultiplier: 0.12056,
        gold2Multiplier: 0.120555,
        customMultiplier: 1,
        taxRate: 15,
        taxEnabled: 1,
        taxOnLabor: 1,
        defaultInvoiceType: 'taskir'
      };
    }
  }
  
  function calculatePriceFromOunce(ounce) {
    if (!invoiceSettings) {
      // Fallback to default calculation
      return (ounce / 31.1035) * 3.75;
    }
    
    const type = invoiceSettings.ounceCalculationType;
    
    if (type === 'default') {
      const conversionFactor = invoiceSettings.conversionFactor || 31.1035;
      const exchangeRate = invoiceSettings.exchangeRate || 3.75;
      return (ounce / conversionFactor) * exchangeRate;
    } else if (type === 'gold') {
      const multiplier = invoiceSettings.goldMultiplier || 120.56;
      return ounce * multiplier;
    } else if (type === 'gold2') {
      const multiplier = invoiceSettings.gold2Multiplier || 120.555;
      return ounce * multiplier;
    } else if (type === 'custom') {
      const multiplier = invoiceSettings.customMultiplier || 1;
      return ounce * multiplier;
    } else if (type === 'manual') {
      return 0; // No automatic calculation
    }
    
    // Fallback
    return (ounce / 31.1035) * 3.75;
  }
  
  function calculateOunceFromPrice(price) {
    if (!invoiceSettings) {
      // Fallback to default calculation
      return (price * 31.1035) / 3.75;
    }
    
    const type = invoiceSettings.ounceCalculationType;
    
    if (type === 'default') {
      const conversionFactor = invoiceSettings.conversionFactor || 31.1035;
      const exchangeRate = invoiceSettings.exchangeRate || 3.75;
      return (price * conversionFactor) / exchangeRate;
    } else if (type === 'gold') {
      const multiplier = invoiceSettings.goldMultiplier || 120.56;
      return price / multiplier;
    } else if (type === 'gold2') {
      const multiplier = invoiceSettings.gold2Multiplier || 120.555;
      return price / multiplier;
    } else if (type === 'custom') {
      const multiplier = invoiceSettings.customMultiplier || 1;
      return price / multiplier;
    } else if (type === 'manual') {
      return 0; // No automatic calculation
    }
    
    // Fallback
    return (price * 31.1035) / 3.75;
  }
  
  // Load settings on page load
  loadInvoiceSettings();
  
  // State
  let invoiceIds = [];
  let invoiceNavRecords = [];
  let currentIndex = -1;
  let currentInvoiceId = null;
  function getDisplayedInvoiceNumber() {
    const value = parseInt(siId?.value || '', 10);
    return Number.isFinite(value) && value > 0 ? value : 0;
  }
  function getInternalInvoiceId() {
    const value = Number(currentInvoiceId || 0);
    return Number.isFinite(value) && value > 0 ? value : 0;
  }
  function getInvoiceBranchScopeMode() {
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
  function isInvoiceAllBranchesScope() {
    return getInvoiceBranchScopeMode() === 'all';
  }
  function getInvoiceNavNumber(invoice, fallbackId = 0) {
    const internalId = Number(invoice?.id || fallbackId || 0) || 0;
    const branchLocalNumber = Number(invoice?.branch_local_number || 0) || 0;
    return branchLocalNumber || internalId || 0;
  }
  function buildInvoiceNavRecords(rows = []) {
    return (Array.isArray(rows) ? rows : [])
      .map((row) => {
        const internalId = Number(row?.id || 0) || 0;
        return {
          id: internalId,
          navNumber: getInvoiceNavNumber(row, internalId),
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
  function findInvoiceIdByNavNumber(value) {
    const targetNavNumber = Number(value || 0) || 0;
    if (targetNavNumber <= 0) {
      return 0;
    }
    const matches = invoiceNavRecords.filter((row) => Number(row?.navNumber || 0) === targetNavNumber);
    if (!matches.length) {
      return 0;
    }
    const currentId = getInternalInvoiceId();
    const currentMatch = matches.find((row) => row.id === currentId);
    return Number(currentMatch?.id || matches[matches.length - 1]?.id || 0) || 0;
  }
  function getInvoiceCounterDisplay() {
    if (isInvoiceAllBranchesScope()) {
      const total = invoiceIds.length;
      const current = currentIndex >= 0 && currentIndex < total ? currentIndex + 1 : 0;
      return { current, total };
    }
    const resolvedIndex = currentIndex >= 0 && currentIndex < invoiceNavRecords.length
      ? currentIndex
      : invoiceIds.findIndex((id) => id === getInternalInvoiceId());
    const current = Number(invoiceNavRecords[resolvedIndex]?.navNumber || 0) || 0;
    const total = Number(invoiceNavRecords[invoiceNavRecords.length - 1]?.navNumber || 0) || 0;
    return { current, total };
  }
  let customersCache = [];
  let suppliersCache = [];
  let itemsCache = [];
  let screenMode = 'view';
  let editUnlockedForId = null;
  // Unsaved changes state
  let hasUnsavedChanges = false;
  let pendingUnsavedResolve = null;
  function markUnsaved() {
    if (screenMode === 'edit' || screenMode === 'new') {
      hasUnsavedChanges = true;
    }
  }
  function resetUnsaved() {
    hasUnsavedChanges = false;
  }
  function openUnsavedModal() {
    if (!unsavedModal) {
      return Promise.resolve(true);
    }
    return new Promise(resolve => {
      pendingUnsavedResolve = resolve;
      unsavedModal.classList.add('show');
      unsavedModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  }
  function closeUnsavedModal(result = false) {
    if (unsavedModal) {
      unsavedModal.classList.remove('show');
      unsavedModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    if (pendingUnsavedResolve) {
      pendingUnsavedResolve(!!result);
      pendingUnsavedResolve = null;
    }
  }
  // Wire unsaved-changes modal buttons
  if (unsavedClose) {
    unsavedClose.addEventListener('click', () => {
      closeUnsavedModal(false);
    });
  }
  if (unsavedStayBtn) {
    unsavedStayBtn.addEventListener('click', () => {
      closeUnsavedModal(false);
    });
  }
  if (unsavedLeaveBtn) {
    unsavedLeaveBtn.addEventListener('click', () => {
      resetUnsaved();
      closeUnsavedModal(true);
    });
  }
  if (unsavedModal) {
    const backdrop = unsavedModal.querySelector('.permission-denied-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', () => {
        closeUnsavedModal(false);
      });
    }
  }
  // Track changes on header fields
  const headerInputsForUnsaved = [siCustomerNo, siSupplierNo, siName, siRefNo, siDate, siTime, siDescription];
  headerInputsForUnsaved.forEach(inp => {
    if (!inp) return;
    ['input', 'change'].forEach(evt => {
      inp.addEventListener(evt, () => {
        markUnsaved();
      });
    });
  });
  // Expose guard for outer shell
  window.canLeaveSalesInvoice = async function () {
    if (!hasUnsavedChanges || screenMode === 'view') {
      return true;
    }
    try {
      const result = await openUnsavedModal();
      return !!result;
    } catch (e) {
      return true;
    }
  };
  function setReadOnly(isReadOnly){
    const headerInputs = [siCustomerNo, siSupplierNo, siRefNo, siDate, siDescription];
    headerInputs.forEach(inp => {
      if (inp) {
        inp.disabled = isReadOnly;
      }
    });
    // تعطيل أزرار نوع الفاتورة (مشغول/تسكير) في وضع العرض
    const typeButtons = document.querySelectorAll('.invoice-type-btn, .invoice-type-btn-compact');
    typeButtons.forEach(btn => {
      btn.disabled = isReadOnly;
    });
    
    // تعطيل مفاتيح الضريبة في وضع العرض
    if (siTaxOnLabor) {
      siTaxOnLabor.disabled = isReadOnly;
      // Apply lock from settings even in edit mode
      if (!isReadOnly && invoiceSettings && invoiceSettings.lockTaxOnLabor) {
        siTaxOnLabor.disabled = true;
        siTaxOnLabor.style.opacity = '0.6';
        siTaxOnLabor.style.cursor = 'not-allowed';
      }
    }
    
    if (siTaxRate) {
      siTaxRate.disabled = isReadOnly;
      // Apply lock from settings even in edit mode
      if (!isReadOnly && invoiceSettings && invoiceSettings.lockTaxRate) {
        siTaxRate.disabled = true;
        siTaxRate.style.opacity = '0.6';
        siTaxRate.style.cursor = 'not-allowed';
      }
    }
    
    // تعطيل أزرار نوع الدفع في وضع العرض
    const siPaymentCash = document.getElementById('si_payment_cash');
    const siPaymentCredit = document.getElementById('si_payment_credit');
    if (siPaymentCash) {
      siPaymentCash.disabled = isReadOnly;
      // Apply lock from settings even in edit mode
      if (!isReadOnly && invoiceSettings && invoiceSettings.lockPaymentType) {
        siPaymentCash.disabled = true;
        siPaymentCash.style.opacity = '0.6';
        siPaymentCash.style.cursor = 'not-allowed';
      }
    }
    if (siPaymentCredit) {
      siPaymentCredit.disabled = isReadOnly;
      // Apply lock from settings even in edit mode
      if (!isReadOnly && invoiceSettings && invoiceSettings.lockPaymentType) {
        siPaymentCredit.disabled = true;
        siPaymentCredit.style.opacity = '0.6';
        siPaymentCredit.style.cursor = 'not-allowed';
      }
    }
    
    // تحديث مظهر المفاتيح
    document.querySelectorAll('.tax-toggle-btn').forEach(btn => {
      if (isReadOnly) {
        btn.style.opacity = '0.6';
        btn.style.cursor = 'not-allowed';
      } else {
        btn.style.opacity = '1';
        btn.style.cursor = 'pointer';
      }
    });
    if (btnAddLine) {
      btnAddLine.disabled = isReadOnly;
    }
    if (detailsTbody) {
      const rowControls = detailsTbody.querySelectorAll('input, button');
      rowControls.forEach(el => {
        el.disabled = isReadOnly;
      });
    }
    if (btnSaveTop) {
      btnSaveTop.disabled = (screenMode === 'view');
    }
    if (btnNew) {
      btnNew.disabled = (screenMode === 'edit' || screenMode === 'new');
    }
    if (btnEditTop) {
      btnEditTop.disabled = !currentInvoiceId || screenMode !== 'view';
    }
    if (btnDeleteTop) {
      const deleteTextEl = document.getElementById('si_btnDeleteText');
      if (deleteTextEl) {
        deleteTextEl.style.display = 'inline-flex';
        deleteTextEl.style.alignItems = 'center';
        deleteTextEl.style.gap = '6px';
        if ((screenMode === 'new' && !currentInvoiceId) || (screenMode === 'edit' && currentInvoiceId)) {
          deleteTextEl.innerHTML = `<i class="fa-solid fa-circle-xmark"></i><span>${tSI('btnCancel')}</span>`;
        } else {
          deleteTextEl.innerHTML = `<i class="fa-solid fa-circle-xmark"></i><span>${tSI('btnDelete')}</span>`;
        }
      }
      // في وضع جديد أو تعديل، زر الحذف/إلغاء يكون مفعلاً
      btnDeleteTop.disabled = (screenMode === 'view' && !currentInvoiceId);
    }
    if (btnJournalView) {
      btnJournalView.disabled = !currentInvoiceId;
    }
    if (navIdInp) {
      navIdInp.disabled = (screenMode !== 'view');
    }
    if (typeof updateNavCounter === 'function') {
      updateNavCounter();
    }
  }
  setReadOnly(true);
  // Helper: Get current user ID
  function getCurrentUserId() {
    try {
      const userData = localStorage.getItem('currentUser');
      if (userData) {
        const user = JSON.parse(userData);
        return user.id || null;
      }
    } catch (e) { }
    return null;
  }

  function getCurrentUserDisplayName() {
    try {
      const userData = localStorage.getItem('currentUser');
      if (!userData) return '';
      const user = JSON.parse(userData);
      return String(user.full_name || user.full_name_en || user.username || '').trim();
    } catch (_) {
      return '';
    }
  }
  // Number parsing and formatting functions
  const nf = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true
  });
  function parseDecimal(val){
    if (val===undefined || val===null || val==='') return 0;
    let s = String(val).trim().replace(/\s+/g,'').replace(/٬/g,'');
    if (s.includes(',') && s.includes('.')) {
      s = s.replace(/,/g, '');
    }
    else if (s.includes(',') && s.lastIndexOf(',') > s.length - 4) {
      s = s.replace(/,/g, '.');
    }
    else if (s.includes(',')) {
      s = s.replace(/,/g, '');
    }
    const n = parseFloat(s);
    return isNaN(n) ? 0 : n;
  }
  function formatNumberWithCommas(value) {
    if (!value && value !== 0) return '';
    let strValue = String(value).replace(/,/g, '');
    const parts = strValue.split('.');
    let integerPart = parts[0];
    const decimalPart = parts[1];
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (decimalPart !== undefined) {
      return integerPart + '.' + decimalPart;
    }
    return integerPart;
  }
  function showToast(type='success', message=''){
    const wrap = document.getElementById('toastWrap');
    if (!wrap){
      try{ if(window.showAlert) showAlert(message || (type==='error' ? tSI('toastError') : tSI('toastSuccess')), type); }catch(_){ }
      return;
    }
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.textContent = message || (type==='error' ? tSI('toastError') : tSI('toastSuccess'));
    wrap.appendChild(el);
    setTimeout(()=>{ el.classList.add('show'); },10);
    setTimeout(()=>{
      el.classList.remove('show');
      setTimeout(()=>{ if (el.parentNode) el.parentNode.removeChild(el); },300);
    },3000);
  }
  function getCurrentCustomerFromCache(){
    const id = parseInt(siCustomerNo.value, 10);
    if (!id || !Array.isArray(customersCache)) return null;
    return customersCache.find(c => Number(c.id) === id) || null;
  }
  function getCurrentSupplierFromCache(){
    const id = parseInt(siSupplierNo.value, 10);
    if (!id || !Array.isArray(suppliersCache)) return null;
    return suppliersCache.find(s => Number(s.id) === id) || null;
  }
  function getSaleOunceAdjustment(){
    const c = getCurrentCustomerFromCache();
    if (c) {
      const addEnabled = c.sale_ounce_add_enabled ? 1 : 0;
      const subEnabled = c.sale_ounce_sub_enabled ? 1 : 0;
      const addVal = typeof c.sale_ounce_add === 'number' ? c.sale_ounce_add : parseDecimal(c.sale_ounce_add);
      const subVal = typeof c.sale_ounce_sub === 'number' ? c.sale_ounce_sub : parseDecimal(c.sale_ounce_sub);
      return {
        add: addEnabled ? addVal : 0,
        sub: subEnabled ? subVal : 0
      };
    }
    const s = getCurrentSupplierFromCache();
    if (s) {
      const addEnabled = s.sale_ounce_add_enabled ? 1 : 0;
      const subEnabled = s.sale_ounce_sub_enabled ? 1 : 0;
      const addVal = typeof s.sale_ounce_add === 'number' ? s.sale_ounce_add : parseDecimal(s.sale_ounce_add);
      const subVal = typeof s.sale_ounce_sub === 'number' ? s.sale_ounce_sub : parseDecimal(s.sale_ounce_sub);
      return {
        add: addEnabled ? addVal : 0,
        sub: subEnabled ? subVal : 0
      };
    }
    return { add: 0, sub: 0 };
  }
  function applySaleCustomerOunceAdjustment(baseOunce){
    const adj = getSaleOunceAdjustment();
    return baseOunce + adj.add - adj.sub;
  }
  function removeSaleCustomerOunceAdjustment(adjustedOunce){
    const adj = getSaleOunceAdjustment();
    return adjustedOunce - adj.add + adj.sub;
  }
  function getSalesInvoiceService(){
    return window.salesInvoice || null;
  }
  async function fetchSalesInvoiceCustomers(options = {}){
    try{
      const res = window.api?.getCustomers ? await window.api.getCustomers(options) : (window.db?.getCustomers ? await window.db.getCustomers(options) : null);
      if (res && res.success) {
        if (Array.isArray(res.data)) return res.data;
        if (Array.isArray(res.customers)) return res.customers;
      }
    }catch(_){ }
    return [];
  }
  async function fetchSalesInvoiceSuppliers(options = {}){
    try{
      const res = window.api?.getSuppliers ? await window.api.getSuppliers(options) : (window.suppliers?.getSuppliers ? await window.suppliers.getSuppliers(options) : null);
      if (res && res.success) {
        if (Array.isArray(res.data)) return res.data;
        if (Array.isArray(res.suppliers)) return res.suppliers;
      }
    }catch(_){ }
    return [];
  }
  async function loadLookupData(){
    try{
      customersCache = await fetchSalesInvoiceCustomers();
    }catch(e){ 
      customersCache = [];
    }
    try{
      suppliersCache = await fetchSalesInvoiceSuppliers();
    }catch(e){ 
      suppliersCache = [];
    }
    // Load gold items for item lookup
    try {
      const goldItemsApi = window.goldItems || null;
      if (goldItemsApi && goldItemsApi.list) {
        const res = await goldItemsApi.list();
        if (res && res.success && Array.isArray(res.data)) {
          itemsCache = res.data;
        }
      }
    } catch (e) {
      itemsCache = [];
    }
  }

  // Item Lookup Modal (for selecting gold items by number/name)
  function showItemLookup(targetRow) {
    const modal = document.getElementById('lookupItemModal');
    const search = document.getElementById('li_search');
    const tbody = document.getElementById('li_tbody');
    const closeBtn = document.getElementById('lookupItemClose');
    const cancelBtn = document.getElementById('lookupItemCancel');

    function renderItems(filter = '') {
      tbody.innerHTML = '';

      if (!itemsCache || itemsCache.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td colspan="3" style="text-align:center;color:var(--subtle);padding:20px;">${tSI('noResults')}</td>`;
        tbody.appendChild(tr);
        return;
      }

      const f = filter.toLowerCase();
      // حدد الأقسام المطلوبة حسب نوع الفاتورة الحالي
      // تسكير = كسر + فضة، مشغول = مشغولات فقط
      const allowedSections = currentInvoiceType === 'taskir' ? ['kasr', 'silver'] : ['mashghulat'];

      const filtered = itemsCache.filter(item => {
        const idStr = String(item.id || '');
        const nameAr = (item.name || '').toLowerCase();
        const nameEn = (item.name_en || '').toLowerCase();
        const section = (item.section || 'mashghulat');
        if (!allowedSections.includes(section)) return false;
        return idStr.includes(f) || nameAr.includes(f) || nameEn.includes(f);
      });

      if (filtered.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td colspan="3" style="text-align:center;color:var(--subtle);padding:20px;">${tSI('noResults')}</td>`;
        tbody.appendChild(tr);
        return;
      }

      filtered.forEach(item => {
        const tr = document.createElement('tr');
        const isInactive = item.status && item.status !== 'active';
        tr.style.cursor = 'pointer';
        const karatVal = item.default_karat != null ? item.default_karat : item.defaultKarat;
        // تمييز الأصناف غير النشطة بلون مختلف وشطب
        if (isInactive) {
          tr.style.opacity = '0.6';
          tr.style.textDecoration = 'line-through';
          tr.style.color = '#ef4444';
        }
        const inactiveLabel = isInactive ? ' <span style="color:#ef4444;font-size:10px;margin-right:5px">(غير نشط)</span>' : '';
        tr.innerHTML = `<td style="text-align:center">${item.id}</td><td>${item.name || ''}${inactiveLabel}</td><td style="text-align:center">${karatVal != null ? karatVal : ''}</td>`;
        tr.addEventListener('click', () => {
          // منع اختيار الأصناف غير النشطة مع رسالة احترافية
          if (isInactive) {
            showToast('error', `⚠️ عذراً، الصنف "${item.name}" غير نشط حالياً ولا يمكن استخدامه في الفواتير. يرجى تفعيل الصنف أولاً من شاشة أصناف العيارات.`);
            return;
          }
          if (targetRow) {
            const inpNo = targetRow.querySelector('.detail-item-no');
            const inpName = targetRow.querySelector('.detail-item-name');
            const inpKarat = targetRow.querySelector('.detail-karat');
            if (inpNo) inpNo.value = item.id;
            if (inpName) inpName.value = item.name || '';
            if (inpKarat && (karatVal != null)) inpKarat.value = karatVal;
            // تخزين النقاوة في الصف للاستخدام في الحسابات
            const purityVal = item.purity || 0;
            targetRow.dataset.purity = purityVal;
            // تحديث شارة النقاوة
            const purityBadge = targetRow.querySelector('.purity-badge');
            if (purityBadge && purityVal > 0) {
              purityBadge.textContent = purityVal;
              purityBadge.style.display = 'inline-block';
            } else if (purityBadge) {
              purityBadge.style.display = 'none';
            }
          }
          modal.classList.remove('active');
          modal.setAttribute('aria-hidden', 'true');
          markUnsaved();
        });
        tbody.appendChild(tr);
      });
    }

    if (!modal || !search || !tbody) {
      return;
    }

    search.value = '';
    renderItems();

    search.oninput = () => renderItems(search.value);

    search.onkeydown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const firstRow = tbody.querySelector('tr[style*="cursor"]');
        if (firstRow) firstRow.click();
      } else if (e.key === 'Escape') {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
      }
    };

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    setTimeout(() => search.focus(), 100);

    closeBtn.onclick = cancelBtn.onclick = () => {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    };

    const backdrop = modal.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.onclick = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
      };
    }
  }
  async function loadInvoiceIds(){
    try{
      const si = getSalesInvoiceService();
      if (!si) {
        invoiceIds = [];
        invoiceNavRecords = [];
        return;
      }
      const res = await si.list();
      if (res && res.success && Array.isArray(res.rows)){
        invoiceNavRecords = buildInvoiceNavRecords(res.rows);
        invoiceIds = invoiceNavRecords.map((row) => row.id);
      } else {
        invoiceIds = [];
        invoiceNavRecords = [];
      }
      updateNavCounter();
    }catch(e){
      invoiceIds = [];
      invoiceNavRecords = [];
    }
  }
  function updateNavCounter(){
    const { current, total } = getInvoiceCounterDisplay();
    const listTotal = invoiceIds.length;
    navCounter.textContent = `${current} / ${total}`;
    if (!navFirst || !navPrev || !navNext || !navLast) {
      return;
    }
    if (screenMode !== 'view') {
      navFirst.disabled = true;
      navPrev.disabled = true;
      navNext.disabled = true;
      navLast.disabled = true;
      return;
    }
    if (currentIndex < 0 || listTotal === 0) {
      navFirst.disabled = true;
      navPrev.disabled = true;
      navNext.disabled = true;
      navLast.disabled = true;
    } else {
      const atFirst = currentIndex <= 0;
      const atLast = currentIndex >= listTotal - 1;
      navFirst.disabled = atFirst;
      navPrev.disabled = atFirst;
      navNext.disabled = atLast;
      navLast.disabled = atLast;
    }
  }
  async function loadInvoice(id, options = {}){
    if (!id) return;
    try{
      const si = getSalesInvoiceService();
      if (!si) {
        showToast('error', tSI('apiNotAvailable'));
        return;
      }
      const requestPayload = options?.lookupByBranchLocalNumber
        ? { id, lookupByBranchLocalNumber: true }
        : id;
      const res = await si.get(requestPayload);
      if (!res || !res.success){
        showToast('error', res?.error || tSI('loadError'));
        return;
      }
      const inv = res.invoice;
      const details = res.details || [];
      currentInvoiceId = inv.id;
      siId.value = inv.branch_local_number || inv.id || '';
      siCustomerNo.value = inv.customer_id || '';
      siSupplierNo.value = inv.supplier_id || '';
      siName.value = inv.customer_name || inv.customer_name_ref || inv.supplier_name_ref || '';
      siRefNo.value = inv.ref_no || '';
      siDate.value = inv.date;
      siTime.value = inv.time || '';
      siDescription.value = inv.description || '';
      
      // تحميل إعدادات الضريبة
      if (siTaxRate) siTaxRate.value = inv.tax_rate || '';
      if (siTaxOnLabor) siTaxOnLabor.checked = inv.tax_on_labor === 1 || inv.tax_on_labor === true;
      
      // تحميل نوع الدفع
      const siPaymentCash = document.getElementById('si_payment_cash');
      const siPaymentCredit = document.getElementById('si_payment_credit');
      if (inv.payment_type === 'credit') {
        if (siPaymentCredit) siPaymentCredit.checked = true;
      } else {
        if (siPaymentCash) siPaymentCash.checked = true;
      }
      
      // تحميل نوع الفاتورة (مشغول/تسكير)
      applyInvoiceTypeState(inv.invoice_type || 'taskir', { preserveExistingTaxValues: true });
      
      if (userTrackingInfo && createdInfo && updatedInfo) {
        let hasInfo = false;
        let allInfo = [];
        const isEnglish = getSILang() === 'en';
        const createdByDisplay = isEnglish 
          ? (inv.created_by_username || inv.created_by_name || '')
          : (inv.created_by_name || inv.created_by_username || '');
        const modifiedByDisplay = isEnglish 
          ? (inv.modified_by_username || inv.modified_by_name || '')
          : (inv.modified_by_name || inv.modified_by_username || '');
        if (createdByDisplay || inv.created_at) {
          hasInfo = true;
          let createdText = `<i class="fa-solid fa-user-plus" style="margin-inline-end:6px; color:#10b981;"></i> ${tSI('createdBy')} `;
          if (createdByDisplay) createdText += `<strong>${createdByDisplay}</strong>`;
          if (inv.created_at) {
            const dateTimeStr = String(inv.created_at).replace(' ', 'T');
            const createdDate = new Date(dateTimeStr);
            const dateStr = createdDate.toLocaleDateString('en-GB');
            const timeStr = createdDate.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit', hour12: false});
            createdText += ` <span style="color:var(--subtle);">${dateStr} ${timeStr}</span>`;
          }
          allInfo.push(createdText);
        }
        if (modifiedByDisplay || inv.modified_at) {
          hasInfo = true;
          let updatedText = `<i class="fa-solid fa-user-clock" style="margin-inline-end:6px; color:#f59e0b;"></i> ${tSI('lastModified')} `;
          if (modifiedByDisplay) updatedText += `<strong>${modifiedByDisplay}</strong>`;
          if (inv.modified_at) {
            const dateTimeStr = String(inv.modified_at).replace(' ', 'T');
            const updatedDate = new Date(dateTimeStr);
            const dateStr = updatedDate.toLocaleDateString('en-GB');
            const timeStr = updatedDate.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit', hour12: false});
            updatedText += ` <span style="color:var(--subtle);">${dateStr} ${timeStr}</span>`;
          }
          allInfo.push(updatedText);
        }
        if (hasInfo) {
          createdInfo.innerHTML = `<div style="display:flex; gap:30px; flex-wrap:wrap;">${allInfo.join('')}</div>`;
          updatedInfo.innerHTML = '';
        }
        userTrackingInfo.style.display = hasInfo ? 'block' : 'none';
      }
      detailsTbody.innerHTML = '';
      details.forEach(detail => {
        addDetailRow(detail);
      });
      const currentRowCount = detailsTbody.querySelectorAll('tr').length;
      const minRows = 4;
      if (currentRowCount < minRows) {
        for (let i = currentRowCount; i < minRows; i++) {
          addDetailRow();
        }
      }
      updateSummaryTotals();
      currentIndex = invoiceIds.indexOf(Number(inv?.id || 0));
      updateNavCounter();
      navIdInp.value = String(getInvoiceNavNumber(inv, id) || '');
      screenMode = 'view';
      editUnlockedForId = null;
      setReadOnly(true);
      resetUnsaved();
    }catch(e){
      showToast('error', tSI('loadError'));
    }
  }
  function handleArrowNavigation(e, currentInput, className) {
    const isNumberInput = currentInput.type === 'number';
    const hasModifier = e.ctrlKey || e.altKey;
    if (isNumberInput && !hasModifier) {
      return; 
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const currentRow = currentInput.closest('tr');
      const nextRow = currentRow.nextElementSibling;
      if (nextRow) {
        nextRow.querySelector(`.${className}`)?.focus();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const currentRow = currentInput.closest('tr');
      const prevRow = currentRow.previousElementSibling;
      if (prevRow) {
        prevRow.querySelector(`.${className}`)?.focus();
      }
    }
  }
  function addDetailRow(data = null){
    const tr = document.createElement('tr');
    
    // رقم الصنف
    const tdItemNo = document.createElement('td');
    const inpItemNo = document.createElement('input');
    inpItemNo.type = 'text';
    inpItemNo.className = 'detail-item-no';
    inpItemNo.value = data?.item_no || '';
    inpItemNo.placeholder = tSI('itemNoPlaceholder');
    inpItemNo.style.width = '70px';
    inpItemNo.style.textAlign = 'center';
    inpItemNo.addEventListener('input', () => {
      const value = inpItemNo.value.trim();
      if (value && !/^\d+$/.test(value)) {
        inpItemNo.value = value.replace(/\D/g, '');
      }
      markUnsaved();
    });
    inpItemNo.addEventListener('blur', () => {
      const itemNo = parseInt(inpItemNo.value);
      if (itemNo && Array.isArray(itemsCache) && itemsCache.length > 0) {
        const item = itemsCache.find(i => Number(i.id) === itemNo);
        if (item) {
          // التحقق من أن الصنف يتبع نوع الفاتورة الصحيح
          const section = item.section || 'mashghulat';
          const allowedSections = currentInvoiceType === 'taskir' ? ['kasr', 'silver'] : ['mashghulat'];
          
          if (!allowedSections.includes(section)) {
            // الصنف لا يتبع نوع الفاتورة المحدد
            const invoiceTypeName = currentInvoiceType === 'taskir' ? 'تسكير (كسر/فضة)' : 'مشغول';
            const itemSectionName = section === 'mashghulat' ? 'المشغولات' : (section === 'kasr' ? 'الكسر' : 'الفضة');
            showToast('error', `⚠️ الصنف رقم ${itemNo} (${item.name}) يتبع قسم "${itemSectionName}" ولا يمكن استخدامه في فاتورة "${invoiceTypeName}"`);
            inpItemNo.value = '';
            const inpItemName = tr.querySelector('.detail-item-name');
            const inpKarat = tr.querySelector('.detail-karat');
            if (inpItemName) inpItemName.value = '';
            if (inpKarat) inpKarat.value = '';
            inpItemNo.focus();
            return;
          }
          
          const inpItemName = tr.querySelector('.detail-item-name');
          const inpKarat = tr.querySelector('.detail-karat');
          const karatVal = item.default_karat != null ? item.default_karat : item.defaultKarat;
          const purityVal = item.purity || 0;
          if (inpItemName) inpItemName.value = item.name || '';
          if (inpKarat && (karatVal != null)) inpKarat.value = karatVal;
          // تخزين النقاوة في الصف للاستخدام في الحسابات
          tr.dataset.purity = purityVal;
          // تحديث شارة النقاوة
          const purityBadge = tr.querySelector('.purity-badge');
          if (purityBadge && purityVal > 0) {
            purityBadge.textContent = purityVal;
            purityBadge.style.display = 'inline-block';
          } else if (purityBadge) {
            purityBadge.style.display = 'none';
          }
        } else {
          // الصنف غير موجود في قاعدة البيانات
          showToast('error', `⚠️ الصنف رقم ${itemNo} غير موجود في قاعدة البيانات`);
          inpItemNo.value = '';
          const inpItemName = tr.querySelector('.detail-item-name');
          const inpKarat = tr.querySelector('.detail-karat');
          if (inpItemName) inpItemName.value = '';
          if (inpKarat) inpKarat.value = '';
          inpItemNo.focus();
          return;
        }
      }
      markUnsaved();
    });
    // دالة للتحقق من صحة رقم الصنف
    function validateItemNo() {
      const itemNo = parseInt(inpItemNo.value);
      if (!itemNo) {
        showToast('error', '⚠️ يجب إدخال رقم الصنف');
        return false; // لا تسمح بالحقل الفارغ
      }
      
      if (!Array.isArray(itemsCache) || itemsCache.length === 0) return true;
      
      const item = itemsCache.find(i => Number(i.id) === itemNo);
      if (!item) {
        showToast('error', `⚠️ الصنف رقم ${itemNo} غير موجود في قاعدة البيانات`);
        return false;
      }
      
      // التحقق من حالة الصنف (نشط/غير نشط)
      if (item.status && item.status !== 'active') {
        showToast('error', `⚠️ الصنف رقم ${itemNo} (${item.name}) غير نشط ولا يمكن استخدامه في الفواتير`);
        return false;
      }
      
      const section = item.section || 'mashghulat';
      const allowedSections = currentInvoiceType === 'taskir' ? ['kasr', 'silver'] : ['mashghulat'];
      
      if (!allowedSections.includes(section)) {
        const invoiceTypeName = currentInvoiceType === 'taskir' ? 'تسكير (كسر/فضة)' : 'مشغول';
        const itemSectionName = section === 'mashghulat' ? 'المشغولات' : (section === 'kasr' ? 'الكسر' : 'الفضة');
        showToast('error', `⚠️ الصنف رقم ${itemNo} (${item.name}) يتبع قسم "${itemSectionName}" ولا يمكن استخدامه في فاتورة "${invoiceTypeName}"`);
        return false;
      }
      
      return true;
    }
    
    inpItemNo.addEventListener('keydown', (e) => {
      handleArrowNavigation(e, inpItemNo, 'detail-item-no');
      if (e.key === 'Enter' || e.key === 'Tab') {
        // التحقق قبل الانتقال
        if (!validateItemNo()) {
          e.preventDefault();
          inpItemNo.select();
          return;
        }
        if (e.key === 'Enter') {
          e.preventDefault();
          tr.querySelector('.detail-weight')?.focus(); // تجاوز العيار والانتقال للوزن مباشرة
        }
      } else if (e.key === 'F9') {
        e.preventDefault();
        // لا تفتح نافذة البحث في وضع العرض
        if (screenMode === 'view') return;
        showItemLookup(tr);
      }
    });
    // Right-click to open item lookup
    inpItemNo.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      // لا تفتح نافذة البحث في وضع العرض
      if (screenMode === 'view') return;
      showItemLookup(tr);
    });
    tdItemNo.appendChild(inpItemNo);
    
    // اسم الصنف
    const tdItemName = document.createElement('td');
    const inpItemName = document.createElement('input');
    inpItemName.type = 'text';
    inpItemName.className = 'detail-item-name';
    inpItemName.value = data?.item_name || '';
    inpItemName.placeholder = tSI('itemNamePlaceholder');
    inpItemName.style.width = '180px';
    inpItemName.style.textAlign = 'center';
    inpItemName.readOnly = true;
    tdItemName.appendChild(inpItemName);
    
    const tdKarat = document.createElement('td');
    const karatWrapper = document.createElement('div');
    karatWrapper.style.display = 'flex';
    karatWrapper.style.alignItems = 'center';
    karatWrapper.style.gap = '4px';
    karatWrapper.style.justifyContent = 'center';
    
    const inpKarat = document.createElement('input');
    inpKarat.type = 'text';
    inpKarat.className = 'detail-karat';
    inpKarat.value = data?.karat || '';
    inpKarat.placeholder = tSI('karatPlaceholder');
    inpKarat.style.width = '50px';
    inpKarat.style.textAlign = 'center';
    inpKarat.readOnly = true; // للقراءة فقط - يتم ملؤه تلقائياً من الصنف
    inpKarat.addEventListener('keydown', (e) => {
      handleArrowNavigation(e, inpKarat, 'detail-karat');
      if (e.key === 'Enter') {
        e.preventDefault();
        tr.querySelector('.detail-weight')?.focus();
      }
    });
    
    // شارة النقاوة
    const purityBadge = document.createElement('span');
    purityBadge.className = 'purity-badge';
    purityBadge.style.cssText = 'padding:2px 6px;font-size:11px;font-weight:600;border-radius:4px;background:linear-gradient(135deg,rgba(245,158,11,0.15),rgba(245,158,11,0.08));color:#f59e0b;border:1px solid rgba(245,158,11,0.3);display:none;';
    purityBadge.textContent = '';
    
    karatWrapper.appendChild(inpKarat);
    karatWrapper.appendChild(purityBadge);
    tdKarat.appendChild(karatWrapper);
    
    // تعيين النقاوة من البيانات المحملة (عند فتح فاتورة موجودة)
    if (data && data.purity && Number(data.purity) > 0) {
      tr.dataset.purity = data.purity;
      purityBadge.textContent = data.purity;
      purityBadge.style.display = 'inline-block';
    }
    
    const tdWeight = document.createElement('td');
    const inpWeight = document.createElement('input');
    inpWeight.type = 'text';
    inpWeight.className = 'detail-weight';
    inpWeight.value = data ? formatNumberWithCommas(data.weight) : '';
    inpWeight.placeholder = tSI('weightPlaceholder');
    inpWeight.style.width = '100px';
    inpWeight.style.textAlign = 'center';
    inpWeight.addEventListener('input', (e) => {
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
      calculateRowValue(tr);
      const ounceInput = tr.querySelector('.detail-ounce');
      const weight = parseDecimal(e.target.value);
      const ounce = parseDecimal(ounceInput.value);
      // الأونصة مطلوبة فقط في نوع تسكير، اختيارية في مشغول
      if (weight > 0 && ounce === 0 && currentInvoiceType === 'taskir') {
        ounceInput.style.borderColor = 'var(--error)';
        ounceInput.placeholder = tSI('ounceRequired');
      } else {
        ounceInput.style.borderColor = '';
        ounceInput.placeholder = tSI('ouncePlaceholder');
      }
      markUnsaved();
    });
    inpWeight.addEventListener('keydown', (e) => {
      handleArrowNavigation(e, inpWeight, 'detail-weight');
      if (e.key === 'Enter') {
        e.preventDefault();
        // التنقل حسب نوع الفاتورة
        if (currentInvoiceType === 'taskir') {
          tr.querySelector('.detail-ounce')?.focus(); // تسكير: الأونصة
        } else {
          tr.querySelector('.detail-labor')?.focus(); // مشغول: الأجور
        }
      }
    });
    tdWeight.appendChild(inpWeight);
    const tdOunce = document.createElement('td');
    const ounceWrapper = document.createElement('div');
    ounceWrapper.className = 'ounce-wrapper';
    const inpOunce = document.createElement('input');
    inpOunce.type = 'text';
    inpOunce.className = 'detail-ounce';
    inpOunce.value = data ? data.ounce : '';
    inpOunce.placeholder = tSI('ouncePlaceholder');
    inpOunce.title = 'سعر الجرام يتم حسابه حسب إعدادات الفواتير';
    inpOunce.style.width = '100px';
    inpOunce.style.textAlign = 'center';
    inpOunce.addEventListener('input', () => {
      // Mark that user is typing (adjustment not yet applied)
      inpOunce.dataset.adjustmentApplied = '';
      
      // Auto-calculate price per gram from ounce (without adjustment during typing)
      const baseOunce = parseDecimal(inpOunce.value);
      const pricePerGram = calculatePriceFromOunce(baseOunce);
      // Truncate to 3 decimal places without rounding (for display only)
      const truncated = Math.floor(pricePerGram * 1000) / 1000;
      const inpPrice = tr.querySelector('.detail-price');
      if (inpPrice && !inpPrice.dataset.manualEdit) {
        inpPrice.value = truncated;
        inpPrice.dataset.rawPrice = pricePerGram;
      }
      calculateRowValue(tr);
      
      // Remove error styling if ounce is entered
      if (baseOunce > 0) {
        inpOunce.style.borderColor = '';
        inpOunce.placeholder = tSI('ouncePlaceholder');
      }
      
      markUnsaved();
    });
    inpOunce.addEventListener('blur', () => {
      const baseOunce = parseDecimal(inpOunce.value);
      if (baseOunce > 0 && !inpOunce.dataset.adjustmentApplied) {
        const adjustedOunce = applySaleCustomerOunceAdjustment(baseOunce);
        inpOunce.value = adjustedOunce;
        inpOunce.dataset.adjustmentApplied = 'true';
        const pricePerGram = calculatePriceFromOunce(adjustedOunce);
        const truncated = Math.floor(pricePerGram * 1000) / 1000;
        const inpPrice = tr.querySelector('.detail-price');
        if (inpPrice && !inpPrice.dataset.manualEdit) {
          inpPrice.value = truncated;
          inpPrice.dataset.rawPrice = pricePerGram;
        }
        calculateRowValue(tr);
      }
    });
    inpOunce.addEventListener('keydown', (e) => {
      handleArrowNavigation(e, inpOunce, 'detail-ounce');
      if (e.key === 'Enter') {
        e.preventDefault();
        // Move to price field
        tr.querySelector('.detail-price')?.focus();
      }
    });
    
    // Create adjustment indicator span
    const adjIndicator = document.createElement('span');
    adjIndicator.className = 'ounce-adj-indicator';
    adjIndicator.style.marginRight = '4px';
    adjIndicator.style.fontSize = '12px';
    adjIndicator.style.fontWeight = '600';
    adjIndicator.style.minWidth = '35px';
    adjIndicator.style.display = 'inline-block';
    adjIndicator.style.textAlign = 'center';
    
    // Function to update adjustment indicator
    function updateOunceAdjIndicator(savedAdj) {
      // Use saved adjustment if provided (for loaded invoices), otherwise use current customer settings
      let netAdj;
      if (savedAdj !== undefined && savedAdj !== null) {
        netAdj = savedAdj;
      } else {
        const adj = getSaleOunceAdjustment();
        netAdj = adj.add - adj.sub;
      }
      if (netAdj > 0) {
        adjIndicator.textContent = '+' + netAdj;
        adjIndicator.style.color = '#22c55e'; // green
      } else if (netAdj < 0) {
        adjIndicator.textContent = String(netAdj);
        adjIndicator.style.color = '#ef4444'; // red
      } else {
        adjIndicator.textContent = '';
      }
    }
    // Use saved adjustment from data if loading existing invoice
    updateOunceAdjIndicator(data ? data.applied_oz_adjustment : null);
    
    // Store update function on row for later refresh
    tr.updateOunceAdjIndicator = updateOunceAdjIndicator;
    
    // Wrap ounce input and adjustment indicator to control alignment
    ounceWrapper.appendChild(inpOunce);
    ounceWrapper.appendChild(adjIndicator);
    tdOunce.appendChild(ounceWrapper);
    
    // Price per gram (editable - auto-calculated from ounce, but can be manually edited)
    const tdPrice = document.createElement('td');
    const inpPrice = document.createElement('input');
    inpPrice.type = 'number';
    inpPrice.step = '0.01';
    inpPrice.className = 'detail-price';
    inpPrice.value = data ? data.price_per_gram : '';
    inpPrice.placeholder = tSI('pricePlaceholder');
    inpPrice.dataset.skipFormat = 'true';
    inpPrice.style.width = '120px';
    inpPrice.style.textAlign = 'right';
    inpPrice.style.paddingRight = '12px';
    inpPrice.style.fontSize = '14px';
    inpPrice.style.letterSpacing = '0.3px';
    
    // When price is manually edited, update ounce (show adjusted value directly)
    inpPrice.addEventListener('input', () => {
      inpPrice.dataset.manualEdit = 'true';
      const price = parseDecimal(inpPrice.value);
      inpPrice.dataset.rawPrice = String(price);
      // Reverse calculation: calculate ounce from price
      const ounce = calculateOunceFromPrice(price);
      const inpOunce = tr.querySelector('.detail-ounce');
      if (inpOunce) {
        inpOunce.value = ounce.toFixed(2);
        inpOunce.dataset.adjustmentApplied = 'true'; // Mark as already adjusted
      }
      calculateRowValue(tr);
      markUnsaved();
    });
    
    // Clear manual edit flag when ounce changes
    inpOunce.addEventListener('focus', () => {
      inpPrice.dataset.manualEdit = '';
    });
    
    inpPrice.addEventListener('keydown', (e) => {
      // Arrow navigation
      handleArrowNavigation(e, inpPrice, 'detail-price');
      
      if (e.key === 'Enter') {
        e.preventDefault();
        // في تسكير: الانتقال للسطر التالي (لأن الأجور مخفية)
        if (currentInvoiceType === 'taskir') {
          // Move to next row
          const nextRow = tr.nextElementSibling;
          if (nextRow) {
            nextRow.querySelector('.detail-item-no')?.focus();
          } else {
            addDetailRow();
            setTimeout(() => {
              const newRow = detailsTbody.querySelector('tr:last-child');
              newRow?.querySelector('.detail-item-no')?.focus();
            }, 50);
          }
        } else {
          // في مشغول: لا يصل هنا لأن سعر الجرام مخفي
          const nextRow = tr.nextElementSibling;
          if (nextRow) {
            nextRow.querySelector('.detail-item-no')?.focus();
          } else {
            addDetailRow();
            setTimeout(() => {
              const newRow = detailsTbody.querySelector('tr:last-child');
              newRow?.querySelector('.detail-item-no')?.focus();
            }, 50);
          }
        }
      }
    });
    
    tdPrice.appendChild(inpPrice);
    
    // Labor (الأجور)
    const tdLabor = document.createElement('td');
    const inpLabor = document.createElement('input');
    inpLabor.type = 'number';
    inpLabor.step = '0.01';
    inpLabor.className = 'detail-labor';
    inpLabor.value = data?.labor || '';
    inpLabor.placeholder = '0';
    inpLabor.style.width = '80px';
    inpLabor.style.textAlign = 'center';
    inpLabor.addEventListener('input', () => {
      calculateRowValue(tr);
      markUnsaved();
    });
    inpLabor.addEventListener('keydown', (e) => {
      handleArrowNavigation(e, inpLabor, 'detail-labor');
      if (e.key === 'Enter') {
        e.preventDefault();
        // Move to next row (tax is now readonly)
        const nextRow = tr.nextElementSibling;
        if (nextRow) {
          nextRow.querySelector('.detail-item-no')?.focus();
        } else {
          addDetailRow();
          setTimeout(() => {
            const newRow = detailsTbody.querySelector('tr:last-child');
            newRow?.querySelector('.detail-item-no')?.focus();
          }, 50);
        }
      }
    });
    tdLabor.appendChild(inpLabor);
    
    // Subtotal before tax (الاجمالي قبل الضريبة) - readonly
    const tdSubtotal = document.createElement('td');
    const divSubtotal = document.createElement('div');
    divSubtotal.className = 'detail-subtotal';
    divSubtotal.textContent = '0.00';
    divSubtotal.style.width = '120px';
    divSubtotal.style.textAlign = 'right';
    divSubtotal.style.padding = '10px 12px';
    divSubtotal.style.minHeight = '42px';
    divSubtotal.style.fontWeight = '600';
    divSubtotal.style.fontSize = '14px';
    divSubtotal.style.borderRadius = '8px';
    tdSubtotal.appendChild(divSubtotal);
    
    // Tax (اجمالي الضريبة) - readonly like value field
    const tdTax = document.createElement('td');
    const divTax = document.createElement('div');
    divTax.className = 'detail-tax';
    divTax.textContent = data?.tax ? nf.format(data.tax) : '0.00';
    divTax.style.width = '100px';
    divTax.style.textAlign = 'right';
    divTax.style.padding = '10px 12px';
    divTax.style.minHeight = '42px';
    divTax.style.fontWeight = '600';
    divTax.style.fontSize = '14px';
    divTax.style.borderRadius = '8px';
    tdTax.appendChild(divTax);
    
    // Value after tax (readonly - auto-calculated) - Use DIV instead of INPUT
    const tdValue = document.createElement('td');
    const divValue = document.createElement('div');
    divValue.className = 'detail-value';
    divValue.textContent = data ? nf.format(data.value) : '0.00';
    divValue.style.width = '140px';
    divValue.style.textAlign = 'right';
    divValue.style.paddingRight = '12px';
    divValue.style.padding = '10px 12px';
    divValue.style.minHeight = '42px';
    divValue.style.fontWeight = '600';
    divValue.style.fontSize = '14px';
    divValue.style.letterSpacing = '0.3px';
    divValue.style.borderRadius = '8px';
    tdValue.appendChild(divValue);
    
    // Remove button
    const tdRemove = document.createElement('td');
    const btnRemove = document.createElement('button');
    btnRemove.className = 'btn danger';
    btnRemove.innerHTML = '<i class="fa-solid fa-trash"></i>';
    btnRemove.style.minWidth = '40px';
    btnRemove.addEventListener('click', () => {
      // Check if warning is enabled in settings
      if (invoiceSettings && invoiceSettings.warnDeleteLine) {
        showConfirmDetailDelete(() => {
          tr.remove();
          updateSummaryTotals();
          markUnsaved();
        });
      } else {
        // No warning, delete directly
        tr.remove();
        updateSummaryTotals();
        markUnsaved();
      }
    });
    tdRemove.appendChild(btnRemove);
    
    // إضافة classes للأعمدة للتحكم في الإخفاء/الإظهار حسب نوع الفاتورة
    tdOunce.classList.add('col-ounce');
    tdPrice.classList.add('col-price');
    tdLabor.classList.add('col-labor');
    tdSubtotal.classList.add('col-subtotal');
    tdTax.classList.add('col-tax');
    
    tr.appendChild(tdItemNo);
    tr.appendChild(tdItemName);
    tr.appendChild(tdKarat);
    tr.appendChild(tdWeight);
    tr.appendChild(tdOunce);
    tr.appendChild(tdPrice);
    tr.appendChild(tdLabor);
    tr.appendChild(tdSubtotal);
    tr.appendChild(tdTax);
    tr.appendChild(tdValue);
    tr.appendChild(tdRemove);
    
    detailsTbody.appendChild(tr);
    
    // إذا كانت هناك بيانات محفوظة، احسب القيم (subtotal, tax, value)
    if (data && (data.weight || data.value)) {
      calculateRowValue(tr, true); // skipTaxRecalc=true لأن الضريبة محفوظة
    }
  }
  
  // Calculate row value: (weight * price_per_gram) + (weight * labor) + total_tax
  function calculateRowValue(tr, skipTaxRecalc = false){
    const inpWeight = tr.querySelector('.detail-weight');
    const inpPrice = tr.querySelector('.detail-price');
    const inpLabor = tr.querySelector('.detail-labor');
    const divSubtotal = tr.querySelector('.detail-subtotal');
    const inpTax = tr.querySelector('.detail-tax');
    const divValue = tr.querySelector('.detail-value');
    
    // Remove commas from weight before parsing
    const weight = parseDecimal(inpWeight.value);
    // Use raw price (full precision) if available, otherwise use displayed value
    const priceSource = inpPrice.dataset.manualEdit === 'true'
      ? inpPrice.value
      : (inpPrice.dataset.rawPrice || inpPrice.value);
    const price = parseDecimal(priceSource);
    const labor = parseDecimal(inpLabor?.value);
    
    // الاجمالي قبل الضريبة = (الوزن × سعر الجرام) + (الوزن × الأجور)
    const goldValue = weight * price;
    const laborValue = weight * labor;
    const subtotal = goldValue + laborValue;
    
    // Update subtotal display
    if (divSubtotal) {
      divSubtotal.textContent = nf.format(subtotal);
      divSubtotal.setAttribute('data-raw-value', subtotal);
    }
    
    // إعادة حساب الضريبة تلقائياً بناءً على نسبة الضريبة في الرأس والخيارات المحددة
    let taxAmount = 0;
    const divTax = tr.querySelector('.detail-tax');
    
    if (skipTaxRecalc && divTax) {
      // استخدام الضريبة المحفوظة
      taxAmount = parseDecimal(divTax.getAttribute('data-raw-value') || divTax.textContent);
    } else if (siTaxRate) {
      const taxRate = parseDecimal(siTaxRate.value);
      if (taxRate > 0) {
        // حساب المبلغ الخاضع للضريبة بناءً على الخيارات المحددة
        const taxableAmount = getTaxableAmount(goldValue, laborValue);
        taxAmount = taxableAmount * (taxRate / 100);
      }
      // Update tax display only when recalculating
      if (divTax) {
        divTax.textContent = nf.format(taxAmount);
        divTax.setAttribute('data-raw-value', taxAmount);
      }
    }
    
    const totalTax = taxAmount;
    
    // القيمة بعد الضريبة = الاجمالي قبل الضريبة + اجمالي الضريبة
    const value = subtotal + totalTax;
    
    // Update value display
    const formatted = nf.format(value);
    divValue.textContent = formatted;
    divValue.setAttribute('data-raw-value', value); // Store raw value for calculations
    
    // Update summary totals
    updateSummaryTotals();
  }
  
  // Update summary totals
  function updateSummaryTotals(){
    const rows = detailsTbody.querySelectorAll('tr');
    let totalWeight = 0;
    let totalValue = 0;
    let karat24 = 0, karat22 = 0, karat21 = 0, karat18 = 0;
    let silver999 = 0, silver925 = 0, silver900 = 0, silver800 = 0;
    
    rows.forEach(row => {
      const karat = row.querySelector('.detail-karat').value.trim();
      // Remove commas from weight before parsing
      const weight = parseDecimal(row.querySelector('.detail-weight').value);
      const divValue = row.querySelector('.detail-value');
      
      // Try to get raw value first, fallback to parsing textContent
      let value = 0;
      const rawValue = divValue.getAttribute('data-raw-value');
      if (rawValue) {
        value = parseDecimal(rawValue);
      } else {
        value = parseDecimal(divValue.textContent);
      }
      
      if (weight > 0 || value > 0) {
        totalWeight += weight;
        totalValue += value;
        
        // Add to specific karat total (gold)
        if (karat === '24') karat24 += weight;
        else if (karat === '22') karat22 += weight;
        else if (karat === '21') karat21 += weight;
        else if (karat === '18') karat18 += weight;
        // Silver karats
        else if (karat === '999') silver999 += weight;
        else if (karat === '925') silver925 += weight;
        else if (karat === '900') silver900 += weight;
        else if (karat === '800') silver800 += weight;
      }
    });
    
    const formattedWeight = nf.format(totalWeight);
    const formattedValue = nf.format(totalValue);
    
    totalWeightEl.textContent = formattedWeight;
    totalValueEl.textContent = formattedValue;
    karat24El.textContent = nf.format(karat24);
    karat22El.textContent = nf.format(karat22);
    karat21El.textContent = nf.format(karat21);
    karat18El.textContent = nf.format(karat18);
    if (silver999El) silver999El.textContent = nf.format(silver999);
    if (silver925El) silver925El.textContent = nf.format(silver925);
    if (silver900El) silver900El.textContent = nf.format(silver900);
    if (silver800El) silver800El.textContent = nf.format(silver800);
  }
  
  // Get details from table
  function getDetailsFromTable(){
    const rows = detailsTbody.querySelectorAll('tr');
    const details = [];
    
    // Get current customer adjustment to save with invoice
    const adj = getSaleOunceAdjustment();
    const appliedAdj = adj.add - adj.sub;
    
    rows.forEach(row => {
      const item_no = parseInt(row.querySelector('.detail-item-no')?.value) || null;
      const item_name = row.querySelector('.detail-item-name')?.value.trim() || null;
      const karat = row.querySelector('.detail-karat').value.trim();
      const purity = parseDecimal(row.dataset.purity);
      // Remove commas from weight before parsing
      const weight = parseDecimal(row.querySelector('.detail-weight').value);
      const ounce = parseDecimal(row.querySelector('.detail-ounce').value);
      const price_per_gram = parseDecimal(row.querySelector('.detail-price').value);
      const labor = parseDecimal(row.querySelector('.detail-labor')?.value);
      const divTax = row.querySelector('.detail-tax');
      const tax = parseDecimal(divTax?.getAttribute('data-raw-value') || divTax?.textContent);
      const divValue = row.querySelector('.detail-value');
      const value = parseDecimal(divValue.getAttribute('data-raw-value') || divValue.textContent);
      
      // Only add rows that have at least karat selected or some data
      if (karat || weight > 0 || ounce > 0) {
        details.push({ item_no, item_name, karat, purity, weight, ounce, price_per_gram, labor, tax, value, applied_oz_adjustment: appliedAdj });
      }
    });
    
    return details;
  }
  
  // Save invoice
  async function saveInvoice(){
    // ✅ فحص الصلاحية المناسبة
    const isEditingExisting = !!currentInvoiceId;
    if (isEditingExisting) {
      if (window.ScreenPermissions && !window.ScreenPermissions.check('sales_invoices_edit', 'تعديل فاتورة بيع')) {
        return;
      }
      if (screenMode !== 'edit') {
        showToast('error', tSI('viewModeOnly'));
        return;
      }
      if (editUnlockedForId !== currentInvoiceId) {
        showToast('error', tSI('editNotEnabled'));
        return;
      }
    } else {
      if (window.ScreenPermissions && !window.ScreenPermissions.check('sales_invoices_add', 'إضافة فاتورة بيع')) {
        return;
      }
      if (screenMode !== 'new') {
        showToast('error', tSI('cannotSaveNewInView'));
        return;
      }
    }
    
    const customer_id = parseInt(siCustomerNo.value, 10) || null;
    const supplier_id = parseInt(siSupplierNo.value, 10) || null;
    const customer_name = siName.value.trim();
    const ref_no = siRefNo.value.trim();
    const date = siDate.value;
    const time = siTime.value;
    const description = siDescription.value.trim();
    const details = getDetailsFromTable();
    
    // التحقق من عدم إدخال العميل والمورد معاً
    if (customer_id && supplier_id) {
      showToast('error', tSI('cannotEnterBoth'));
      return;
    }
    
    // التحقق من وجود عميل أو مورد
    if (!customer_id && !supplier_id) {
      showToast('error', tSI('enterCustomerOrSupplier'));
      return;
    }
    
    if (!date) {
      showToast('error', tSI('enterDate'));
      return;
    }
    
    if (details.length === 0) {
      showToast('error', tSI('addAtLeastOneLine'));
      return;
    }
    
    // التحقق من أن كل سطر لديه عيار محدد
    const invalidRows = details.filter(d => !d.karat || d.karat === '');
    if (invalidRows.length > 0) {
      showToast('error', tSI('selectKaratForAll'));
      return;
    }
    
    // التحقق من إدخال الأونصة إذا كان هناك وزن (فقط في نوع تسكير)
    if (currentInvoiceType === 'taskir') {
      const missingOunce = details.filter(d => d.weight > 0 && (!d.ounce || d.ounce === 0));
      if (missingOunce.length > 0) {
        showToast('error', tSI('enterOunceForWeight'));
        return;
      }
    }
    
    const userId = getCurrentUserId();
    
    const si = getSalesInvoiceService();
    if (!si) {
      showToast('error', tSI('apiNotAvailable'));
      return;
    }
    
    // التحقق من تكرار الرقم المرجعي
    if (ref_no && si.checkRef) {
      try {
        const checkRes = await si.checkRef(ref_no, currentInvoiceId || null);
        if (checkRes && checkRes.success && checkRes.exists) {
          const existingDisplayId = checkRes.existingBranchLocalNumber || checkRes.existingId;
          // إظهار modal التحذير
          if (duplicateRefModal) {
            duplicateRefMessage.textContent = `الرقم المرجعي "${ref_no}" مستخدم مسبقاً في الفاتورة رقم ${existingDisplayId}`;
            duplicateRefDetail.textContent = 'يرجى إدخال رقم مرجعي مختلف لتجنب التكرار.';
            duplicateRefModal.classList.add('show');
            duplicateRefModal.setAttribute('aria-hidden', 'false');
            siRefNo.focus();
            siRefNo.select();
          }
          return;
        }
      } catch (e) {
        // Error checking ref_no
      }
    }
    
    try{
      let res;
      // إعدادات الضريبة
      const tax_rate = parseDecimal(siTaxRate?.value);
      const tax_on_labor = siTaxOnLabor?.checked ? 1 : 0;
      const tax_on_gold = 1; // Always enabled
      
      // نوع الدفع (نقدي/آجل)
      const siPaymentCash = document.getElementById('si_payment_cash');
      const payment_type = siPaymentCash?.checked ? 'cash' : 'credit';
      
      // نوع الفاتورة (مشغول/تسكير)
      const invoice_type = currentInvoiceType;
      
      if (currentInvoiceId) {
        // Update
        res = await si.update({
          id: currentInvoiceId,
          branch_local_number: getDisplayedInvoiceNumber() || null,
          customer_id,
          supplier_id,
          customer_name,
          description,
          ref_no,
          date,
          time,
          details,
          modified_by: userId,
          tax_rate,
          tax_on_labor,
          tax_on_gold,
          payment_type,
          invoice_type
        });
      } else {
        // Add new - include the ID from the form
        const newId = getDisplayedInvoiceNumber();
        res = await si.add({
          branch_local_number: newId || null,
          customer_id,
          supplier_id,
          customer_name,
          description,
          ref_no,
          date,
          time,
          details,
          created_by: userId,
          tax_rate,
          tax_on_labor,
          tax_on_gold,
          payment_type,
          invoice_type
        });
      }
      
      if (res && res.success) {
        if (!currentInvoiceId && Number(res.id) > 0) {
          try {
            window.parent?.postMessage({
              type: 'daily-ops-notification',
              entityType: 'salesInvoice',
              documentId: Number(res.id),
              userName: getCurrentUserDisplayName(),
            }, '*');
          } catch (_) {}
        }
        const message = currentInvoiceId ? tSI('invoiceUpdated') : tSI('invoiceSaved');
        showToast('success', message);
        if (res.id) {
          await loadInvoiceIds();
          await loadInvoice(res.id);
        } else if (currentInvoiceId) {
          await loadInvoice(currentInvoiceId);
        }
      } else {
        // فحص إذا كان الخطأ بسبب سقف المديونية أو عميل/مورد غير نشط
        if (res && res.branchReadOnly && window.handleBranchReadOnlyResponse) {
          window.handleBranchReadOnlyResponse(res);
        } else if (res && res.debtLimitExceeded && window.handleDebtLimitResponse) {
          window.handleDebtLimitResponse(res);
        } else if (res && res.inactiveEntity && window.handleInactiveEntityResponse) {
          window.handleInactiveEntityResponse(res);
        } else {
          showToast('error', res?.error || tSI('saveFailed'));
        }
      }
    }catch(e){
      showToast('error', tSI('saveFailed'));
    }
  }
  
  // Delete invoice
  async function deleteInvoice(){
    // في وضع التعديل: اجعل زر حذف يعمل كزر إلغاء للتعديل فقط (إعادة تحميل الفاتورة الحالية)
    if (screenMode === 'edit' && currentInvoiceId) {
      await loadInvoice(currentInvoiceId);
      return;
    }

    // إذا كنا في وضع "فاتورة جديدة" ولم تُحفظ بعد، فاعتبر زر حذف = إلغاء
    if (!currentInvoiceId && screenMode === 'new') {
      if (invoiceIds.length > 0) {
        // الرجوع لآخر فاتورة موجودة
        const lastId = invoiceIds[invoiceIds.length - 1];
        await loadInvoice(lastId);
      } else {
        // لا توجد فواتير في النظام: فرّغ النموذج وأعده إلى وضع عرض مقفول
        siId.value = '';
        siCustomerNo.value = '';
        siSupplierNo.value = '';
        siName.value = '';
        siRefNo.value = '';
        siDescription.value = '';
        siDate.value = '';
        siTime.value = '';
        detailsTbody.innerHTML = '';
        // أضف 4 أسطر فارغة للعرض فقط
        for (let i = 0; i < 4; i++) {
          addDetailRow();
        }
        updateSummaryTotals();
        if (userTrackingInfo) {
          userTrackingInfo.style.display = 'none';
        }
        currentIndex = -1;
        navIdInp.value = '';
        screenMode = 'view';
        editUnlockedForId = null;
        setReadOnly(true);
      }
      return;
    }

    if (!currentInvoiceId) {
      showToast('error', tSI('noInvoiceToDelete'));
      return;
    }
    
    // ✅ فحص صلاحية الحذف BEFORE opening confirmation modal
    if (window.ScreenPermissions && !window.ScreenPermissions.check('sales_invoices_delete', 'حذف فاتورة بيع')) {
      return;
    }
    
    // Check if warning is enabled in settings
    const shouldWarn = !invoiceSettings || invoiceSettings.warnDeleteInvoice;
    
    if (shouldWarn) {
      showConfirmInvoiceDelete(async () => {
        await performInvoiceDelete();
      });
    } else {
      // No warning needed, delete directly
      await performInvoiceDelete();
    }
  }
  
  // Separate function to perform the actual delete
  async function performInvoiceDelete() {
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
    
    const si = getSalesInvoiceService();
    if (!si) {
      showToast('error', 'salesInvoice API غير متاح');
      return;
    }
      
      try{
        const res = await si.remove({
          id: currentInvoiceId,
          actorUserId: getCurrentUserId(),
          actorName: getCurrentUserDisplayName(),
        });
        if (res && res.success) {
          showToast('success', 'تم حذف الفاتورة بنجاح');
          const oldIndex = currentIndex;
          await loadInvoiceIds();
          
          // Try to load next invoice, or previous, or create new
          if (invoiceIds.length > 0) {
            if (oldIndex < invoiceIds.length) {
              // Load invoice at same position
              await loadInvoice(invoiceIds[oldIndex]);
            } else if (invoiceIds.length > 0) {
              // Load last invoice
              await loadInvoice(invoiceIds[invoiceIds.length - 1]);
            }
          } else {
            // No invoices left, create new
            createNewInvoice();
          }
        } else {
          showToast('error', res?.error || tSI('deleteFailed'));
        }
      }catch(e){
        showToast('error', tSI('deleteFailed'));
      }
  }
  
  // Create new invoice
  async function createNewInvoice(){
    currentInvoiceId = null;
    
    // Get next ID
    try {
      const si = getSalesInvoiceService();
      if (si && si.getNextId) {
        const res = await si.getNextId();
        if (res && res.success) {
          siId.value = res.nextId;
        } else {
          siId.value = '';
        }
      }
    } catch(e) {
      siId.value = '';
    }
    
    siCustomerNo.value = '';
    siSupplierNo.value = '';
    siName.value = '';
    siRefNo.value = '';
    siDescription.value = '';
    // Use local date (not UTC) to avoid showing yesterday's date
    const now = new Date();
    siDate.value = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0') + '-' + String(now.getDate()).padStart(2,'0');
    siTime.value = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    
    // تطبيق نوع الفاتورة الافتراضي من الإعدادات
    applyInvoiceTypeState(invoiceSettings && invoiceSettings.defaultInvoiceType ? invoiceSettings.defaultInvoiceType : 'taskir');
    
    // تعيين نوع الدفع من الإعدادات
    const defaultPaymentType = (invoiceSettings && invoiceSettings.defaultPaymentType) ? invoiceSettings.defaultPaymentType : 'credit';
    const siPaymentCash = document.getElementById('si_payment_cash');
    const siPaymentCredit = document.getElementById('si_payment_credit');
    if (defaultPaymentType === 'cash' && siPaymentCash) {
      siPaymentCash.checked = true;
    } else if (siPaymentCredit) {
      siPaymentCredit.checked = true;
    }
    
    detailsTbody.innerHTML = '';
    
    // Add 4 empty rows by default
    for (let i = 0; i < 4; i++) {
      addDetailRow();
    }
    
    // Reset summary totals
    updateSummaryTotals();
    
    userTrackingInfo.style.display = 'none';
    currentIndex = -1;
    updateNavCounter();
    navIdInp.value = '';
    screenMode = 'new';
    editUnlockedForId = null;
    setReadOnly(false);
  }
  
  // Navigation handlers
  navFirst.addEventListener('click', () => {
    if (invoiceIds.length > 0 && !navFirst.disabled) {
      loadInvoice(invoiceIds[0]);
    }
  });
  
  navPrev.addEventListener('click', () => {
    if (currentIndex > 0 && !navPrev.disabled) {
      loadInvoice(invoiceIds[currentIndex - 1]);
    }
  });
  
  navNext.addEventListener('click', () => {
    if (currentIndex < invoiceIds.length - 1 && !navNext.disabled) {
      loadInvoice(invoiceIds[currentIndex + 1]);
    }
  });
  
  navLast.addEventListener('click', () => {
    if (invoiceIds.length > 0 && !navLast.disabled) {
      loadInvoice(invoiceIds[invoiceIds.length - 1]);
    }
  });

  navIdInp.addEventListener('change', () => {
    const id = parseInt(navIdInp.value, 10);
    if (!isNaN(id) && id > 0) {
      const targetInvoiceId = findInvoiceIdByNavNumber(id);
      if (targetInvoiceId > 0) {
        loadInvoice(targetInvoiceId);
        return;
      }
      loadInvoice(id, { lookupByBranchLocalNumber: true });
    }
  });

  // Button handlers
  btnNew.addEventListener('click', createNewInvoice);
  if (btnEditTop) {
    btnEditTop.addEventListener('click', async () => {
      if (!currentInvoiceId) {
        showToast('error', tSI('noInvoiceToEdit'));
        return;
      }
      if (screenMode !== 'view') {
        return;
      }
      if (window.ScreenPermissions && !window.ScreenPermissions.check('sales_invoices_edit', 'تعديل فاتورة بيع')) {
        return;
      }
      const confirmFn = window.confirmEditWithPassword || window.parent?.confirmEditWithPassword || window.top?.confirmEditWithPassword;
      if (confirmFn) {
        try {
          const confirmed = await confirmFn();
          if (!confirmed) {
            return;
          }
        } catch (e) {
          if (e.message !== 'cancelled') {
            // Error occurred
          }
          return;
        }
      }
      screenMode = 'edit';
      editUnlockedForId = currentInvoiceId;
      setReadOnly(false);
    });
  }
  btnSaveTop.addEventListener('click', saveInvoice);
  btnDeleteTop.addEventListener('click', deleteInvoice);
  btnAddLine.addEventListener('click', () => addDetailRow());
  
  // Close button - navigate to dashboard (respect unsaved changes)
  if (btnClose) {
    btnClose.addEventListener('click', async () => {
      // Ask for confirmation if there are unsaved changes
      if (typeof window.canLeaveSalesInvoice === 'function') {
        const canLeave = await window.canLeaveSalesInvoice();
        if (!canLeave) {
          return;
        }
      }

      // Add ripple effect animation
      btnClose.style.transform = 'scale(0.95)';
      setTimeout(() => {
        btnClose.style.transform = '';
      }, 150);
      
      // Navigate to dashboard after short delay for visual feedback
      setTimeout(() => {
        try {
          const parentDoc = window.parent?.document || window.top?.document;
          if (!parentDoc) return;

          // Click the main shell tab that is wired to load the dashboard screen
          const dashTab = parentDoc.getElementById('tab-dashboard');
          if (dashTab && typeof dashTab.click === 'function') {
            dashTab.click();
          }
        } catch (_) {
          // ignore navigation errors
        }
      }, 200);
    });
  }
  
  // Duplicate ref modal close handler
  if (duplicateRefClose) {
    duplicateRefClose.addEventListener('click', () => {
      duplicateRefModal.classList.remove('show');
      duplicateRefModal.setAttribute('aria-hidden', 'true');
    });
  }
  if (duplicateRefModal) {
    const backdrop = duplicateRefModal.querySelector('.permission-denied-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', () => {
        duplicateRefModal.classList.remove('show');
        duplicateRefModal.setAttribute('aria-hidden', 'true');
      });
    }
  }
  
  // Customer lookup (F9) + Enter navigation
  siCustomerNo.addEventListener('keydown', (e) => {
    if (siCustomerNo.disabled) {
      return;
    }
    if (e.key === 'F9') {
      e.preventDefault();
      showCustomerLookup();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      // التنقل حسب نوع الفاتورة
      if (currentInvoiceType === 'taskir') {
        siRefNo.focus(); // تسكير: الرقم المرجعي (الضريبة مخفية)
      } else {
        // مشغول: محاولة التركيز على الضريبة، إذا كانت معطلة ننتقل للرقم المرجعي
        if (siTaxRate && !siTaxRate.disabled && siTaxRate.offsetParent !== null) {
          siTaxRate.focus();
        } else {
          siRefNo.focus();
        }
      }
    }
  });
  
  // Customer lookup (Right-Click) - عند النقر بالزر الأيمن على حقل رقم العميل
  siCustomerNo.addEventListener('contextmenu', (e) => {
    if (siCustomerNo.disabled) {
      return; // اترك قائمة الماوس الافتراضية تعمل إذا كان الحقل مقفولاً
    }
    e.preventDefault();
    showCustomerLookup();
  });
  
  // Supplier lookup (F9) + Enter navigation
  siSupplierNo.addEventListener('keydown', (e) => {
    if (siSupplierNo.disabled) {
      return;
    }
    if (e.key === 'F9') {
      e.preventDefault();
      showSupplierLookup();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      // التنقل حسب نوع الفاتورة
      if (currentInvoiceType === 'taskir') {
        siRefNo.focus(); // تسكير: الرقم المرجعي (الضريبة مخفية)
      } else {
        // مشغول: محاولة التركيز على الضريبة، إذا كانت معطلة ننتقل للرقم المرجعي
        if (siTaxRate && !siTaxRate.disabled && siTaxRate.offsetParent !== null) {
          siTaxRate.focus();
        } else {
          siRefNo.focus();
        }
      }
    }
  });
  
  // Supplier lookup (Right-Click) - عند النقر بالزر الأيمن على حقل رقم المورد
  siSupplierNo.addEventListener('contextmenu', (e) => {
    if (siSupplierNo.disabled) {
      return;
    }
    e.preventDefault();
    showSupplierLookup();
  });
  
  // Tax Rate field - Enter navigation
  siTaxRate.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      siRefNo.focus(); // الانتقال للرقم المرجعي
    }
  });
  
  // Ref No field - Enter navigation
  siRefNo.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      siDate.focus(); // الانتقال للتاريخ
    }
  });
  
  // Date field - Enter navigation
  siDate.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Move to first detail row - item number
      const firstInput = detailsTbody.querySelector('tr:first-child .detail-item-no');
      if (firstInput) {
        firstInput.focus();
      } else {
        addDetailRow();
        setTimeout(() => {
          const firstInput = detailsTbody.querySelector('tr:first-child .detail-item-no');
          if (firstInput) firstInput.focus();
        }, 50);
      }
    }
  });
  
  // Customer number input - clear supplier when typing
  siCustomerNo.addEventListener('input', () => {
    const val = siCustomerNo.value.trim();
    if (val) {
      // إذا بدأ المستخدم بإدخال رقم عميل، افرغ حقل المورد
      siSupplierNo.value = '';
    }
  });
  
  // Supplier number input - clear customer when typing
  siSupplierNo.addEventListener('input', () => {
    const val = siSupplierNo.value.trim();
    if (val) {
      // إذا بدأ المستخدم بإدخال رقم مورد، افرغ حقل العميل
      siCustomerNo.value = '';
    }
  });
  
  // Customer number change - auto-fill name
  siCustomerNo.addEventListener('change', async () => {
    const id = parseInt(siCustomerNo.value, 10);
    if (!isNaN(id) && id > 0) {
      const customer = customersCache.find(c => c.id === id);
      if (customer) {
        siName.value = customer.name || '';
        siSupplierNo.value = '';
      } else {
        showToast('error', tSI('customerNotFound').replace('{id}', id));
        siCustomerNo.value = '';
        siName.value = '';
      }
    } else if (!siCustomerNo.value.trim()) {
      if (!siSupplierNo.value.trim()) {
        siName.value = '';
      }
    }
  });
  
  // Supplier number change - auto-fill name
  siSupplierNo.addEventListener('change', async () => {
    const id = parseInt(siSupplierNo.value, 10);
    if (!isNaN(id) && id > 0) {
      const supplier = suppliersCache.find(s => s.id === id);
      if (supplier) {
        siName.value = supplier.name || '';
        siCustomerNo.value = '';
      } else {
        showToast('error', tSI('supplierNotFound').replace('{id}', id));
        siSupplierNo.value = '';
        siName.value = '';
      }
    } else if (!siSupplierNo.value.trim()) {
      if (!siCustomerNo.value.trim()) {
        siName.value = '';
      }
    }
  });
  
  // Auto-fill name on blur
  siCustomerNo.addEventListener('blur', () => {
    const id = parseInt(siCustomerNo.value, 10);
    if (!isNaN(id) && id > 0) {
      const customer = customersCache.find(c => c.id === id);
      if (customer) {
        siName.value = customer.name || '';
        siSupplierNo.value = '';
      }
    }
  });
  
  siSupplierNo.addEventListener('blur', () => {
    const id = parseInt(siSupplierNo.value, 10);
    if (!isNaN(id) && id > 0) {
      const supplier = suppliersCache.find(s => s.id === id);
      if (supplier) {
        siName.value = supplier.name || '';
        siCustomerNo.value = '';
      }
    }
  });
  
  // Customer Lookup Modal
  function showCustomerLookup(){
    const modal = document.getElementById('lookupCustomerModal');
    const search = document.getElementById('lc_search');
    const tbody = document.getElementById('lc_tbody');
    const closeBtn = document.getElementById('lookupCustomerClose');
    const cancelBtn = document.getElementById('lookupCustomerCancel');
    
    function renderCustomers(filter = ''){
      tbody.innerHTML = '';
      
      if (!customersCache || customersCache.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td colspan="2" style="text-align:center;color:var(--subtle);padding:20px;">${tSI('noCustomers')}</td>`;
        tbody.appendChild(tr);
        return;
      }
      
      const filtered = customersCache.filter(c => {
        const f = filter.toLowerCase();
        return String(c.id).includes(f) || (c.name || '').toLowerCase().includes(f);
      });
      
      if (filtered.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td colspan="2" style="text-align:center;color:var(--subtle);padding:20px;">${tSI('noResults')}</td>`;
        tbody.appendChild(tr);
        return;
      }
      
      filtered.forEach(c => {
        const tr = document.createElement('tr');
        tr.style.cursor = 'pointer';
        tr.innerHTML = `<td style="text-align:center">${c.id}</td><td>${c.name || ''}</td>`;
        tr.addEventListener('click', () => {
          siCustomerNo.value = c.id;
          siSupplierNo.value = '';
          siName.value = c.name || '';
          modal.classList.remove('active');
          modal.setAttribute('aria-hidden', 'true');
          // Update all ounce adjustment indicators
          detailsTbody.querySelectorAll('tr').forEach(row => {
            if (row.updateOunceAdjIndicator) row.updateOunceAdjIndicator();
          });
        });
        tbody.appendChild(tr);
      });
    }
    
    search.value = '';
    renderCustomers();
    
    search.oninput = () => renderCustomers(search.value);
    
    // Enter to select first result
    search.onkeydown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const firstRow = tbody.querySelector('tr[style*="cursor"]');
        if (firstRow) {
          firstRow.click();
        }
      } else if (e.key === 'Escape') {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
      }
    };
    
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    setTimeout(() => search.focus(), 100);
    
    closeBtn.onclick = cancelBtn.onclick = () => {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    };
    
    modal.querySelector('.modal-backdrop').onclick = () => {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    };
  }
  
  // Supplier Lookup Modal
  function showSupplierLookup(){
    const modal = document.getElementById('lookupSupplierModal');
    const search = document.getElementById('ls_search');
    const tbody = document.getElementById('ls_tbody');
    const closeBtn = document.getElementById('lookupSupplierClose');
    const cancelBtn = document.getElementById('lookupSupplierCancel');
    
    function renderSuppliers(filter = ''){
      tbody.innerHTML = '';
      
      if (!suppliersCache || suppliersCache.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td colspan="2" style="text-align:center;color:var(--subtle);padding:20px;">${tSI('noSuppliers')}</td>`;
        tbody.appendChild(tr);
        return;
      }
      
      const filtered = suppliersCache.filter(s => {
        const f = filter.toLowerCase();
        return String(s.id).includes(f) || (s.name || '').toLowerCase().includes(f);
      });
      
      if (filtered.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td colspan="2" style="text-align:center;color:var(--subtle);padding:20px;">${tSI('noResults')}</td>`;
        tbody.appendChild(tr);
        return;
      }
      
      filtered.forEach(s => {
        const tr = document.createElement('tr');
        tr.style.cursor = 'pointer';
        tr.innerHTML = `<td style="text-align:center">${s.id}</td><td>${s.name || ''}</td>`;
        tr.addEventListener('click', () => {
          siSupplierNo.value = s.id;
          siCustomerNo.value = '';
          siName.value = s.name || '';
          modal.classList.remove('active');
          modal.setAttribute('aria-hidden', 'true');
          // Update all ounce adjustment indicators
          detailsTbody.querySelectorAll('tr').forEach(row => {
            if (row.updateOunceAdjIndicator) row.updateOunceAdjIndicator();
          });
        });
        tbody.appendChild(tr);
      });
    }
    
    search.value = '';
    renderSuppliers();
    
    search.oninput = () => renderSuppliers(search.value);
    
    // Enter to select first result
    search.onkeydown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const firstRow = tbody.querySelector('tr[style*="cursor"]');
        if (firstRow) {
          firstRow.click();
        }
      } else if (e.key === 'Escape') {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
      }
    };
    
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    setTimeout(() => search.focus(), 100);
    
    closeBtn.onclick = cancelBtn.onclick = () => {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    };
    
    modal.querySelector('.modal-backdrop').onclick = () => {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    };
  }
  
  // Confirm delete invoice modal
  function showConfirmInvoiceDelete(callback){
    const modal = document.getElementById('confirmInvoiceDelModal');
    const yesBtn = document.getElementById('confirmInvoiceDelYes');
    const noBtn = document.getElementById('confirmInvoiceDelNo');
    const closeBtn = document.getElementById('confirmInvoiceDelClose');
    
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    
    yesBtn.onclick = () => {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      if (callback) callback();
    };
    
    noBtn.onclick = closeBtn.onclick = () => {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    };
    
    modal.querySelector('.modal-backdrop').onclick = () => {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    };
  }
  
  // Confirm delete detail row modal
  function showConfirmDetailDelete(callback){
    const modal = document.getElementById('confirmDetailDelModal');
    const yesBtn = document.getElementById('confirmDetailDelYes');
    const noBtn = document.getElementById('confirmDetailDelNo');
    const closeBtn = document.getElementById('confirmDetailDelClose');
    
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    
    yesBtn.onclick = () => {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      if (callback) callback();
    };
    
    noBtn.onclick = closeBtn.onclick = () => {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    };
    
    modal.querySelector('.modal-backdrop').onclick = () => {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    };
  }
  
  // WhatsApp Button
  const btnWhatsApp = document.getElementById('si_btnWhatsApp');
  
  // Journal View Button
  if (btnJournalView) {
    btnJournalView.addEventListener('click', () => {
      const id = getInternalInvoiceId();
      const displayId = getDisplayedInvoiceNumber() || id;
      if (!id) {
        showToast('error', 'يجب حفظ الفاتورة أولاً');
        return;
      }
      if (typeof showAutoJournalModal === 'function') {
        showAutoJournalModal('sales_invoice', id, `صورة الحركة - فاتورة بيع رقم ${displayId}`);
      } else {
        showToast('error', 'مكون صورة الحركة غير متوفر');
      }
    });
  }
  
  // Print Invoice
  btnPrintTop.addEventListener('click', async () => {
    // Check print permission
    if (window.ScreenPermissions && !window.ScreenPermissions.check('sales_invoices_print', 'طباعة فاتورة بيع')) {
      return;
    }
    
    const id = getInternalInvoiceId();
    const displayId = getDisplayedInvoiceNumber() || id;
    if (!id) {
      showToast('error', tSI('saveFirst'));
      return;
    }

    try {
      // Collect current invoice data
      const siPaymentCash = document.getElementById('si_payment_cash');
      const invoiceData = {
        id: displayId,
        date: siDate.value || '',
        time: siTime.value || '',
        customer_id: parseInt(siCustomerNo.value) || null,
        supplier_id: parseInt(siSupplierNo.value) || null,
        customer_name: siName.value || '',
        description: siDescription.value || '',
        payment_type: siPaymentCash?.checked ? 'cash' : 'credit',
        details: getDetailsFromTable()
      };

      // Save to localStorage for print page
      localStorage.setItem('printInvoiceData', JSON.stringify(invoiceData));

      // Open print window
      const printUrl = './print.html?v=' + Date.now();
      const printWindow = window.open(printUrl, '_blank', 'width=900,height=800,scrollbars=yes');
      
      if (!printWindow) {
        showToast('error', tSI('printWindowFailed'));
      }
    } catch (err) {
      showToast('error', tSI('printPrepareError'));
      
    }
  });
  
  // WhatsApp - Send Invoice with Image
  if (btnWhatsApp) {
    btnWhatsApp.addEventListener('click', async () => {
      const id = getInternalInvoiceId();
      const displayId = getDisplayedInvoiceNumber() || id;
      if (!id) {
        showToast('error', tSI('saveFirst'));
        return;
      }
      
      try {
        // Get customer or supplier phone
        const customerId = parseInt(siCustomerNo.value);
        const supplierId = parseInt(siSupplierNo.value);
        
        if (!customerId && !supplierId) {
          showToast('error', tSI('selectCustomerOrSupplier'));
          return;
        }
        
        let phone = null;
        let contactName = '';
        
        // Try customer first
        if (customerId) {
          let customer = customersCache.find(c => c.id === customerId);
          if (!customer) {
            const rows = await fetchSalesInvoiceCustomers();
            if (rows.length) {
              customersCache = rows;
              customer = rows.find(c => c.id === customerId);
            }
          }
          if (customer && customer.phone) {
            phone = customer.phone;
            contactName = customer.name || siName.value;
          }
        }
        
        // Try supplier if no customer phone
        if (!phone && supplierId) {
          let supplier = suppliersCache.find(s => s.id === supplierId);
          if (!supplier) {
            const rows = await fetchSalesInvoiceSuppliers();
            if (rows.length) {
              suppliersCache = rows;
              supplier = rows.find(s => s.id === supplierId);
            }
          }
          if (supplier && supplier.phone) {
            phone = supplier.phone;
            contactName = supplier.name || siName.value;
          }
        }
        
        if (!phone) {
          showToast('error', tSI('phoneNotFound'));
          return;
        }
        
        // Clean phone number
        let phoneNumber = phone.trim();
        phoneNumber = phoneNumber.replace(/^\+/, '');
        phoneNumber = phoneNumber.replace(/^00/, '');
        phoneNumber = phoneNumber.replace(/[^0-9]/g, '');
        
        if (phoneNumber.startsWith('05')) {
          phoneNumber = '966' + phoneNumber.substring(1);
        }
        
        if (!phoneNumber || phoneNumber.length < 9) {
          showToast('error', tSI('phoneInvalid'));
          return;
        }
        
        // Collect invoice data for print
        const invoiceData = {
          id: displayId,
          date: siDate.value || '',
          time: siTime.value || '',
          customer_id: parseInt(siCustomerNo.value) || null,
          supplier_id: parseInt(siSupplierNo.value) || null,
          customer_name: siName.value || '',
          description: siDescription.value || '',
          details: getDetailsFromTable()
        };
        
        // Save to localStorage for print page
        localStorage.setItem('printInvoiceData', JSON.stringify(invoiceData));
        localStorage.setItem('whatsappPhone', phoneNumber);
        localStorage.setItem('whatsappMode', 'true');
        
        // Open print window - it will capture image and open WhatsApp
        const printUrl = './print.html?whatsapp=1&v=' + Date.now();
        window.open(printUrl, '_blank', 'width=900,height=800,scrollbars=yes');
        
        showToast('success', tSI('preparingWhatsApp'));
        
      } catch (err) {
        showToast('error', tSI('whatsAppError'));
      }
    });
  }
  
  // Global keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Skip if user is typing in an input
    const isTyping = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName);
    
    // Ctrl+S or Cmd+S to save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      saveInvoice();
    }
    // Ctrl+N or Cmd+N for new invoice
    else if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
      e.preventDefault();
      createNewInvoice();
    }
    // Arrow keys for navigation (only when not typing)
    else if (!isTyping && e.key === 'ArrowLeft' && !navPrev.disabled) {
      e.preventDefault();
      navPrev.click();
    }
    else if (!isTyping && e.key === 'ArrowRight' && !navNext.disabled) {
      e.preventDefault();
      navNext.click();
    }
    else if (!isTyping && (e.ctrlKey || e.metaKey) && e.key === 'ArrowLeft' && !navFirst.disabled) {
      e.preventDefault();
      navFirst.click();
    }
    else if (!isTyping && (e.ctrlKey || e.metaKey) && e.key === 'ArrowRight' && !navLast.disabled) {
      e.preventDefault();
      navLast.click();
    }
  });
  
  // Initialize
  // إضافة الصفوف الفارغة فوراً قبل تحميل البيانات لتجنب التأخير في الظهور
  for (let i = 0; i < 4; i++) {
    addDetailRow();
  }
  
  // Wait a bit for APIs to be fully bridged (if in iframe)
  await new Promise(resolve => setTimeout(resolve, 100));
  
  await loadLookupData();
  
  // If no data loaded, try once more after delay
  if (customersCache.length === 0 || suppliersCache.length === 0) {
    await new Promise(resolve => setTimeout(resolve, 500));
    await loadLookupData();
  }
  
  await loadInvoiceIds();
  
  // Check for URL parameter (when opened from reports)
  const urlParams = new URLSearchParams(window.location.search);
  const urlId = urlParams.get('id');
  
  if (urlId) {
    // Load specific invoice from URL
    const invoiceId = parseInt(urlId, 10);
    if (!isNaN(invoiceId) && invoiceId > 0) {
      await loadInvoice(invoiceId);
    } else {
      // Invalid ID, load last or create new
      if (invoiceIds.length > 0) {
        await loadInvoice(invoiceIds[invoiceIds.length - 1]);
      } else {
        await createNewInvoice();
      }
    }
  } else {
    // Normal initialization: load last invoice or create new
    if (invoiceIds.length > 0) {
      await loadInvoice(invoiceIds[invoiceIds.length - 1]);
    } else {
      await createNewInvoice();
    }
  }

  async function refreshSalesInvoiceForBranchScopeChange() {
    try {
      await loadInvoiceSettings();
      await loadLookupData();
      await loadInvoiceIds();
      if (screenMode === 'new' || !currentInvoiceId) {
        await createNewInvoice();
        return true;
      }
      if (currentInvoiceId && invoiceIds.includes(currentInvoiceId)) {
        await loadInvoice(currentInvoiceId);
        return true;
      }
      if (invoiceIds.length > 0) {
        await loadInvoice(invoiceIds[invoiceIds.length - 1]);
        return true;
      }
      await createNewInvoice();
      return true;
    } catch (_) {
      return false;
    }
  }

  window.refreshForBranchScopeChange = async function() {
    return await refreshSalesInvoiceForBranchScopeChange();
  };

  if (window.api && window.api.on) {
    window.api.on('load-invoice', async (data) => {
      if (data && data.invoiceId) {
        try {
          await new Promise(resolve => setTimeout(resolve, 500));
          await loadInvoice(data.invoiceId);
        } catch (_) {}
      }
    });

    window.api.on('cloud-data-updated', async (payload) => {
      const tables = Array.isArray(payload?.tables) ? payload.tables : [];
      if (!tables.includes('sales_invoices')) {
        return;
      }
      if (screenMode !== 'view') {
        return;
      }
      try {
        await loadInvoiceIds();
        if (currentInvoiceId && invoiceIds.includes(currentInvoiceId)) {
          await loadInvoice(currentInvoiceId);
          return;
        }
        if (invoiceIds.length > 0) {
          await loadInvoice(invoiceIds[invoiceIds.length - 1]);
          return;
        }
        await createNewInvoice();
      } catch (_) {}
    });
  }

  window.addEventListener('message', async (event) => {
    if (event?.data?.type === 'branch-scope-changed') {
      await refreshSalesInvoiceForBranchScopeChange();
      return;
    }
    if (event?.data?.type !== 'cloud-data-updated') {
      return;
    }
    const payload = event.data.payload || {};
    const tables = Array.isArray(payload?.tables) ? payload.tables : [];
    if (!tables.includes('sales_invoices')) {
      return;
    }
    if (screenMode !== 'view') {
      return;
    }
    try {
      await loadInvoiceIds();
      if (currentInvoiceId && invoiceIds.includes(currentInvoiceId)) {
        await loadInvoice(currentInvoiceId);
        return;
      }
      if (invoiceIds.length > 0) {
        await loadInvoice(invoiceIds[invoiceIds.length - 1]);
        return;
      }
      await createNewInvoice();
    } catch (_) {}
  });
});

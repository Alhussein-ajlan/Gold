  const timeInp = document.getElementById('r_time');

// ========== Translation System for Receipt Voucher ==========
const RV_TRANSLATIONS = {
  ar: {
    // Toolbar buttons
    btnNew: 'سند قبض جديد',
    btnEdit: 'تعديل',
    btnSave: 'حفظ',
    btnSaveEdit: 'حفظ التعديل',
    btnDelete: 'حذف',
    btnCancel: 'إلغاء',
    btnPrint: 'طباعة PDF',
    btnJournalView: 'صورة الحركة',
    btnClose: 'إغلاق',
    btnAddLine: 'إضافة سطر',
    // Header
    headerTitle: 'رأس سند القبض',
    detailsTitle: 'تفاصيل السند',
    voucherNo: 'رقم السند',
    date: 'التاريخ',
    cashBox: 'صندوق الريال',
    goldBox: 'صندوق الذهب',
    silverBox: 'صندوق الفضة',
    searchF9: '(للبحث F9)',
    memoPlaceholder: 'بيان السند...',
    // Navigation
    navFirst: 'الأول',
    navPrev: 'السابق',
    navNext: 'التالي',
    navLast: 'الأخير',
    navPlaceholder: 'رقم',
    // Table headers
    thCustomerNo: 'رقم العميل',
    thSupplierNo: 'رقم المورد',
    thAccountNo: 'رقم الحساب',
    thName: 'الاسم',
    thAmount: 'المبلغ',
    thGoldSilver: 'الذهب/الفضة',
    thKarat: 'العيار',
    thDescription: 'البيان',
    thRemove: 'إزالة',
    // Placeholders
    f9Search: 'F9 للبحث',
    amountPlaceholder: 'مبلغ',
    weightPlaceholder: 'وزن',
    karatPlaceholder: 'عيار',
    descPlaceholder: 'بيان',
    // Totals
    totalAmount: 'إجمالي المبلغ:',
    gold24: 'ذهب (24):',
    gold22: 'ذهب (22):',
    gold21: 'ذهب (21):',
    gold18: 'ذهب (18):',
    silver999: 'فضة (999):',
    silver925: 'فضة (925):',
    silver900: 'فضة (900):',
    silver800: 'فضة (800):',
    // Lookup modals
    selectCustomer: 'اختر عميل',
    searchCustomer: 'بحث عن عميل',
    customerNo: 'رقم العميل',
    customerName: 'اسم العميل',
    selectSupplier: 'اختر مورد',
    searchSupplier: 'بحث عن مورد',
    supplierNo: 'رقم المورد',
    supplierName: 'اسم المورد',
    selectAccount: 'اختر حساب',
    searchAccount: 'بحث عن حساب',
    accountNo: 'رقم الحساب',
    accountName: 'اسم الحساب',
    cancelBtn: 'إلغاء',
    // Confirm modals
    confirmDelete: 'تأكيد الحذف',
    confirmDeleteVoucher: 'هل أنت متأكد من أنك تريد حذف سند القبض؟',
    confirmDeleteLine: 'هل أنت متأكد من حذف هذا السطر؟',
    yesDelete: 'نعم، احذف',
    cancelAction: 'إلغاء الأمر',
    // Self hint
    selfHintLead: 'عملية ذاتية للحساب',
    selfHintSub: 'لا تؤثر على الرصيد (مدين = دائن) لهذا الحساب.',
    // User tracking
    createdBy: 'أنشئ بواسطة:',
    lastModified: 'آخر تعديل:',
    // Messages
    toastSuccess: 'تم بنجاح',
    toastError: 'حدث خطأ',
    voucherSaved: 'تم حفظ السند بنجاح',
    voucherUpdated: 'تم تحديث السند بنجاح',
    voucherDeleted: 'تم حذف السند بنجاح',
    saveFailed: 'خطأ في حفظ السند',
    loadError: 'خطأ في تحميل السند',
    deleteFailed: 'خطأ في حذف السند',
    apiNotAvailable: 'API غير متاح',
    noVoucherToEdit: 'لا يوجد سند مفتوح للتعديل',
    noVoucherToDelete: 'لا يوجد سند محدد للحذف',
    enterDate: 'يرجى إدخال التاريخ',
    addAtLeastOneLine: 'يرجى إضافة سطر واحد على الأقل',
    selectPartyForAll: 'يرجى تحديد العميل أو المورد أو الحساب لجميع الأسطر',
    viewModeOnly: 'الشاشة في وضع عرض فقط. اضغط زر "تعديل" أولاً',
    editNotEnabled: 'صلاحية التعديل لهذا السند غير مفعلة',
    cannotSaveNewInView: 'لا يمكن حفظ سند جديد في وضع العرض',
    customerNotFound: 'العميل غير موجود',
    phoneNotFound: 'رقم الهاتف غير موجود',
    phoneInvalid: 'رقم الهاتف غير صحيح',
    supplierNotFound: 'المورد غير موجود',
    accountNotFound: 'الحساب غير موجود',
    saveFirst: 'يرجى حفظ السند أولاً',
    printWindowFailed: 'فشل فتح نافذة الطباعة',
    // Print template
    printReceiptNo: 'سند قبض رقم:',
    printDate: 'التاريخ:',
    printAccountNo: 'رقم الحساب:',
    printReceivedFrom: 'المستلم من:',
    printPhone: 'الهاتف:',
    printAddress: 'العنوان:',
    printDescription: 'البيان:',
    printAmount: 'المبلغ',
    printWeight: 'الوزن',
    printKarat: 'العيار',
    printTotalCash: 'إجمالي النقد',
    printConverted21: 'محول ٢١',
    printKarat24: 'عيار 24',
    printKarat22: 'عيار 22',
    printKarat21: 'عيار 21',
    printKarat18: 'عيار 18',
    printCashWords: 'النقد كتابة:',
    printGoldWords: 'الذهب كتابة (عيار 21):',
    printCashierSig: 'توقيع أمين الصندوق',
    printAuditorSig: 'توقيع المدقق',
    printDeliverySig: 'توقيع المسلّم',
    printBtn: 'طباعة',
    // Datalist options
    gold24Option: 'ذهب 24',
    gold22Option: 'ذهب 22',
    gold21Option: 'ذهب 21',
    gold18Option: 'ذهب 18',
    silver999Option: 'فضة 999',
    silver925Option: 'فضة 925',
    silver900Option: 'فضة 900',
    silver800Option: 'فضة 800',
    // Hint messages
    exclusiveIdHint: 'ملاحظة: يسمح بإدخال رقم واحد فقط في الصف. إدخال رقم هنا سيؤدي لمسح الأرقام الأخرى في الصف نفسه.',
    // Unsaved changes modal
    unsavedTitle: 'تغييرات غير محفوظة',
    unsavedMessage: 'لديك تعديلات لم يتم حفظها بعد',
    unsavedDetail: 'هل تريد المتابعة والخروج بدون حفظ التغييرات؟',
    unsavedStay: 'العودة للتعديل',
    unsavedLeave: 'خروج بدون حفظ'
  },
  en: {
    // Toolbar buttons
    btnNew: 'New Receipt',
    btnEdit: 'Edit',
    btnSave: 'Save',
    btnSaveEdit: 'Save Changes',
    btnDelete: 'Delete',
    btnCancel: 'Cancel',
    btnPrint: 'Print PDF',
    btnJournalView: 'Movement Image',
    btnClose: 'Close',
    btnAddLine: 'Add Line',
    // Header
    headerTitle: 'Receipt Voucher Header',
    detailsTitle: 'Voucher Details',
    voucherNo: 'Voucher No.',
    date: 'Date',
    cashBox: 'Cash Box',
    goldBox: 'Gold Box',
    silverBox: 'Silver Box',
    searchF9: '(F9 to search)',
    memoPlaceholder: 'Description...',
    // Navigation
    navFirst: 'First',
    navPrev: 'Previous',
    navNext: 'Next',
    navLast: 'Last',
    navPlaceholder: 'No.',
    // Table headers
    thCustomerNo: 'Customer No.',
    thSupplierNo: 'Supplier No.',
    thAccountNo: 'Account No.',
    thName: 'Name',
    thAmount: 'Amount',
    thGoldSilver: 'Gold/Silver',
    thKarat: 'Karat',
    thDescription: 'Description',
    thRemove: 'Remove',
    // Placeholders
    f9Search: 'F9 Search',
    amountPlaceholder: 'Amount',
    weightPlaceholder: 'Weight',
    karatPlaceholder: 'Karat',
    descPlaceholder: 'Desc.',
    // Totals
    totalAmount: 'Total Amount:',
    gold24: 'Gold (24):',
    gold22: 'Gold (22):',
    gold21: 'Gold (21):',
    gold18: 'Gold (18):',
    silver999: 'Silver (999):',
    silver925: 'Silver (925):',
    silver900: 'Silver (900):',
    silver800: 'Silver (800):',
    // Lookup modals
    selectCustomer: 'Select Customer',
    searchCustomer: 'Search Customer',
    customerNo: 'Customer No.',
    customerName: 'Customer Name',
    selectSupplier: 'Select Supplier',
    searchSupplier: 'Search Supplier',
    supplierNo: 'Supplier No.',
    supplierName: 'Supplier Name',
    selectAccount: 'Select Account',
    searchAccount: 'Search Account',
    accountNo: 'Account No.',
    accountName: 'Account Name',
    cancelBtn: 'Cancel',
    // Confirm modals
    confirmDelete: 'Confirm Delete',
    confirmDeleteVoucher: 'Are you sure you want to delete this receipt voucher?',
    confirmDeleteLine: 'Are you sure you want to delete this line?',
    yesDelete: 'Yes, Delete',
    cancelAction: 'Cancel',
    // Self hint
    selfHintLead: 'Self Transaction',
    selfHintSub: 'Does not affect balance (debit = credit) for this account.',
    // User tracking
    createdBy: 'Created by:',
    lastModified: 'Last modified:',
    // Messages
    toastSuccess: 'Success',
    toastError: 'Error occurred',
    voucherSaved: 'Voucher saved successfully',
    voucherUpdated: 'Voucher updated successfully',
    voucherDeleted: 'Voucher deleted successfully',
    saveFailed: 'Failed to save voucher',
    loadError: 'Failed to load voucher',
    deleteFailed: 'Failed to delete voucher',
    apiNotAvailable: 'API not available',
    noVoucherToEdit: 'No voucher open for editing',
    noVoucherToDelete: 'No voucher selected for deletion',
    enterDate: 'Please enter date',
    addAtLeastOneLine: 'Please add at least one line',
    selectPartyForAll: 'Please select customer, supplier, or account for all lines',
    viewModeOnly: 'Screen is in view mode. Click "Edit" first',
    editNotEnabled: 'Edit permission for this voucher is not enabled',
    cannotSaveNewInView: 'Cannot save new voucher in view mode',
    customerNotFound: 'Customer not found',
    phoneNotFound: 'Phone number not found',
    phoneInvalid: 'Invalid phone number',
    supplierNotFound: 'Supplier not found',
    accountNotFound: 'Account not found',
    saveFirst: 'Please save voucher first',
    printWindowFailed: 'Failed to open print window',
    // Print template
    printReceiptNo: 'Receipt Voucher No:',
    printDate: 'Date:',
    printAccountNo: 'Account No:',
    printReceivedFrom: 'Received From:',
    printPhone: 'Phone:',
    printAddress: 'Address:',
    printDescription: 'Description:',
    printAmount: 'Amount',
    printWeight: 'Weight',
    printKarat: 'Karat',
    printTotalCash: 'Total Cash',
    printConverted21: 'Conv. 21K',
    printKarat24: '24K',
    printKarat22: '22K',
    printKarat21: '21K',
    printKarat18: '18K',
    printCashWords: 'Cash in words:',
    printGoldWords: 'Gold in words (21K):',
    printCashierSig: 'Cashier Signature',
    printAuditorSig: 'Auditor Signature',
    printDeliverySig: 'Delivery Signature',
    printBtn: 'Print',
    // Datalist options
    gold24Option: 'Gold 24K',
    gold22Option: 'Gold 22K',
    gold21Option: 'Gold 21K',
    gold18Option: 'Gold 18K',
    silver999Option: 'Silver 999',
    silver925Option: 'Silver 925',
    silver900Option: 'Silver 900',
    silver800Option: 'Silver 800',
    // Hint messages
    exclusiveIdHint: 'Note: Only one ID allowed per row. Entering a value here will clear other IDs in this row.',
    // Unsaved changes modal
    unsavedTitle: 'Unsaved Changes',
    unsavedMessage: 'You have unsaved changes on this voucher',
    unsavedDetail: 'Do you want to leave without saving your changes?',
    unsavedStay: 'Back to Edit',
    unsavedLeave: 'Leave'
  }
};

function getRVLang() {
  try {
    return localStorage.getItem('uiLang') === 'en' ? 'en' : 'ar';
  } catch (e) {
    return 'ar';
  }
}

function tRV(key) {
  const lang = getRVLang();
  return RV_TRANSLATIONS[lang]?.[key] || RV_TRANSLATIONS.ar[key] || key;
}

function tRVFmt(key, replacements = {}) {
  let text = tRV(key);
  for (const [k, v] of Object.entries(replacements)) {
    text = text.replace(`{${k}}`, v);
  }
  return text;
}

// Apply static translations on page load
function applyReceiptStaticTexts() {
  const lang = getRVLang();
  const isRtl = lang === 'ar';
  
  // Set document direction
  document.documentElement.lang = lang;
  document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  
  // Toolbar buttons
  const btnNewText = document.getElementById('r_btnNewText');
  if (btnNewText) btnNewText.innerHTML = `<i class="fa-solid fa-file-circle-plus"></i> ${tRV('btnNew')}`;
  
  const btnEditText = document.getElementById('r_btnEditText');
  if (btnEditText) btnEditText.innerHTML = `<i class="fa-solid fa-pen-to-square"></i> ${tRV('btnEdit')}`;
  
  const btnPrintText = document.getElementById('r_btnPrintText');
  if (btnPrintText) btnPrintText.innerHTML = `<i class="fa-solid fa-file-pdf"></i> ${tRV('btnPrint')}`;
  
  // Journal View button
  const btnJournalViewEl = document.getElementById('r_btnJournalView');
  if (btnJournalViewEl) {
    const span = btnJournalViewEl.querySelector('span');
    if (span) span.innerHTML = `<i class="fa-solid fa-file-invoice"></i> ${tRV('btnJournalView')}`;
  }
  
  const btnCloseText = document.getElementById('r_btnCloseText');
  if (btnCloseText) btnCloseText.innerHTML = `<i class="fa-solid fa-arrow-right-from-bracket"></i> ${tRV('btnClose')}`;
  
  const btnAddLineText = document.getElementById('r_btnAddLineText');
  if (btnAddLineText) btnAddLineText.innerHTML = `<i class="fa-solid fa-circle-plus"></i> ${tRV('btnAddLine')}`;
  
  // Header title
  const headerTitle = document.getElementById('r_header_title');
  if (headerTitle) headerTitle.textContent = tRV('headerTitle');
  
  // Details title
  const detailsTitle = document.getElementById('r_details_title');
  if (detailsTitle) detailsTitle.textContent = tRV('detailsTitle');
  
  // Field labels
  const lblVoucherNo = document.getElementById('r_lbl_voucherNo');
  if (lblVoucherNo) lblVoucherNo.textContent = tRV('voucherNo');
  
  const lblDate = document.getElementById('r_lbl_date');
  if (lblDate) lblDate.textContent = tRV('date');
  
  const lblCashBox = document.getElementById('r_lbl_cashBox');
  if (lblCashBox) lblCashBox.innerHTML = `${tRV('cashBox')} <small style="color:#888">${tRV('searchF9')}</small>`;
  
  const lblGoldBox = document.getElementById('r_lbl_goldBox');
  if (lblGoldBox) lblGoldBox.innerHTML = `${tRV('goldBox')} <small style="color:#888">${tRV('searchF9')}</small>`;
  
  const lblSilverBox = document.getElementById('r_lbl_silverBox');
  if (lblSilverBox) lblSilverBox.innerHTML = `${tRV('silverBox')} <small style="color:#888">${tRV('searchF9')}</small>`;
  
  // Memo placeholder
  const memoField = document.getElementById('r_memo');
  if (memoField) memoField.placeholder = tRV('memoPlaceholder');
  
  // Navigation tooltips
  const navFirst = document.getElementById('r_nav_first');
  if (navFirst) navFirst.title = tRV('navFirst');
  const navPrev = document.getElementById('r_nav_prev');
  if (navPrev) navPrev.title = tRV('navPrev');
  const navNext = document.getElementById('r_nav_next');
  if (navNext) navNext.title = tRV('navNext');
  const navLast = document.getElementById('r_nav_last');
  if (navLast) navLast.title = tRV('navLast');
  const navIdInp = document.getElementById('r_nav_id');
  if (navIdInp) navIdInp.placeholder = tRV('navPlaceholder');
  
  // Table headers
  const thCustomerNo = document.getElementById('r_th_customerNo');
  if (thCustomerNo) thCustomerNo.textContent = tRV('thCustomerNo');
  const thSupplierNo = document.getElementById('r_th_supplierNo');
  if (thSupplierNo) thSupplierNo.textContent = tRV('thSupplierNo');
  const thAccountNo = document.getElementById('r_th_accountNo');
  if (thAccountNo) thAccountNo.textContent = tRV('thAccountNo');
  const thName = document.getElementById('r_th_name');
  if (thName) thName.textContent = tRV('thName');
  const thAmount = document.getElementById('r_th_amount');
  if (thAmount) thAmount.textContent = tRV('thAmount');
  const thGoldSilver = document.getElementById('r_th_goldSilver');
  if (thGoldSilver) thGoldSilver.textContent = tRV('thGoldSilver');
  const thKarat = document.getElementById('r_th_karat');
  if (thKarat) thKarat.textContent = tRV('thKarat');
  const thDescription = document.getElementById('r_th_description');
  if (thDescription) thDescription.textContent = tRV('thDescription');
  const thRemove = document.getElementById('r_th_remove');
  if (thRemove) thRemove.textContent = tRV('thRemove');
  
  // Totals labels
  const lblTotalAmount = document.getElementById('r_lbl_totalAmount');
  if (lblTotalAmount) lblTotalAmount.textContent = tRV('totalAmount');
  const lblGold24 = document.getElementById('r_lbl_gold24');
  if (lblGold24) lblGold24.textContent = tRV('gold24');
  const lblGold22 = document.getElementById('r_lbl_gold22');
  if (lblGold22) lblGold22.textContent = tRV('gold22');
  const lblGold21 = document.getElementById('r_lbl_gold21');
  if (lblGold21) lblGold21.textContent = tRV('gold21');
  const lblGold18 = document.getElementById('r_lbl_gold18');
  if (lblGold18) lblGold18.textContent = tRV('gold18');
  const lblSilver999 = document.getElementById('r_lbl_silver999');
  if (lblSilver999) lblSilver999.textContent = tRV('silver999');
  const lblSilver925 = document.getElementById('r_lbl_silver925');
  if (lblSilver925) lblSilver925.textContent = tRV('silver925');
  const lblSilver900 = document.getElementById('r_lbl_silver900');
  if (lblSilver900) lblSilver900.textContent = tRV('silver900');
  const lblSilver800 = document.getElementById('r_lbl_silver800');
  if (lblSilver800) lblSilver800.textContent = tRV('silver800');
  
  // Lookup modals
  const lcTitle = document.getElementById('r_lc_title');
  if (lcTitle) lcTitle.textContent = tRV('selectCustomer');
  const lcSearchLabel = document.getElementById('r_lc_searchLabel');
  if (lcSearchLabel) lcSearchLabel.textContent = tRV('searchCustomer');
  const lcThId = document.getElementById('r_lc_th_id');
  if (lcThId) lcThId.textContent = tRV('customerNo');
  const lcThName = document.getElementById('r_lc_th_name');
  if (lcThName) lcThName.textContent = tRV('customerName');
  const lcCancelText = document.getElementById('r_lc_cancelText');
  if (lcCancelText) lcCancelText.innerHTML = `<i class="fa-regular fa-circle-xmark"></i> ${tRV('cancelBtn')}`;
  
  const lsTitle = document.getElementById('r_ls_title');
  if (lsTitle) lsTitle.textContent = tRV('selectSupplier');
  const lsSearchLabel = document.getElementById('r_ls_searchLabel');
  if (lsSearchLabel) lsSearchLabel.textContent = tRV('searchSupplier');
  const lsThId = document.getElementById('r_ls_th_id');
  if (lsThId) lsThId.textContent = tRV('supplierNo');
  const lsThName = document.getElementById('r_ls_th_name');
  if (lsThName) lsThName.textContent = tRV('supplierName');
  const lsCancelText = document.getElementById('r_ls_cancelText');
  if (lsCancelText) lsCancelText.innerHTML = `<i class="fa-regular fa-circle-xmark"></i> ${tRV('cancelBtn')}`;
  
  const laTitle = document.getElementById('r_la_title');
  if (laTitle) laTitle.textContent = tRV('selectAccount');
  const laSearchLabel = document.getElementById('r_la_searchLabel');
  if (laSearchLabel) laSearchLabel.textContent = tRV('searchAccount');
  const laThId = document.getElementById('r_la_th_id');
  if (laThId) laThId.textContent = tRV('accountNo');
  const laThName = document.getElementById('r_la_th_name');
  if (laThName) laThName.textContent = tRV('accountName');
  const laCancelText = document.getElementById('r_la_cancelText');
  if (laCancelText) laCancelText.innerHTML = `<i class="fa-regular fa-circle-xmark"></i> ${tRV('cancelBtn')}`;
  
  // Confirm modals
  const confirmVoucherDelTitle = document.getElementById('r_confirmVoucherDelTitle');
  if (confirmVoucherDelTitle) confirmVoucherDelTitle.textContent = tRV('confirmDelete');
  const confirmVoucherDelMsg = document.getElementById('r_confirmReceiptDelMsg');
  if (confirmVoucherDelMsg) confirmVoucherDelMsg.textContent = tRV('confirmDeleteVoucher');
  const confirmVoucherDelYesText = document.getElementById('r_confirmVoucherDelYesText');
  if (confirmVoucherDelYesText) confirmVoucherDelYesText.innerHTML = `<i class="fa-regular fa-circle-check"></i> ${tRV('yesDelete')}`;
  const confirmVoucherDelNoText = document.getElementById('r_confirmVoucherDelNoText');
  if (confirmVoucherDelNoText) confirmVoucherDelNoText.innerHTML = `<i class="fa-regular fa-circle-xmark"></i> ${tRV('cancelAction')}`;
  
  const confirmLineDelTitle = document.getElementById('r_confirmLineDelTitle');
  if (confirmLineDelTitle) confirmLineDelTitle.textContent = tRV('confirmDelete');
  const confirmLineDelMsg = document.getElementById('r_confirmDelMsg');
  if (confirmLineDelMsg) confirmLineDelMsg.textContent = tRV('confirmDeleteLine');
  const confirmLineDelYesText = document.getElementById('r_confirmLineDelYesText');
  if (confirmLineDelYesText) confirmLineDelYesText.innerHTML = `<i class="fa-regular fa-circle-check"></i> ${tRV('yesDelete')}`;
  const confirmLineDelNoText = document.getElementById('r_confirmLineDelNoText');
  if (confirmLineDelNoText) confirmLineDelNoText.innerHTML = `<i class="fa-regular fa-circle-xmark"></i> ${tRV('cancelAction')}`;
  
  // Self hint
  const selfHintLead = document.getElementById('r_selfHintLead');
  if (selfHintLead) selfHintLead.innerHTML = `<i class="fa-regular fa-circle-info"></i> ${tRV('selfHintLead')}`;
  const selfHintSub = document.getElementById('r_selfHintSub');
  if (selfHintSub) selfHintSub.textContent = tRV('selfHintSub');
  
  // Fix navigation arrows for LTR
  if (!isRtl) {
    const navControls = document.querySelector('.nav-controls');
    if (navControls) navControls.style.flexDirection = 'row-reverse';
  }
  
  // Fix table header alignment for LTR
  if (!isRtl) {
    document.querySelectorAll('#r_linesTable th').forEach(th => th.style.textAlign = 'left');
    document.querySelectorAll('#r_lc_table th, #r_ls_table th, #r_la_table th').forEach(th => th.style.textAlign = 'left');
  }
  
  // Update datalist options
  const karatList = document.getElementById('r_karat_list');
  if (karatList) {
    karatList.innerHTML = `
      <option value="24">${tRV('gold24Option')}</option>
      <option value="22">${tRV('gold22Option')}</option>
      <option value="21">${tRV('gold21Option')}</option>
      <option value="18">${tRV('gold18Option')}</option>
      <option value="999">${tRV('silver999Option')}</option>
      <option value="925">${tRV('silver925Option')}</option>
      <option value="900">${tRV('silver900Option')}</option>
      <option value="800">${tRV('silver800Option')}</option>
    `;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  // Apply translations first
  applyReceiptStaticTexts();
  
  // Bridge APIs
  (function ensureAPIBridge(){
    try{
      const pick = (name)=>{ if (!window[name]){ if (window.parent && window.parent[name]) window[name]=window.parent[name]; else if (window.top && window.top[name]) window[name]=window.top[name]; } };
      ['receipt','accounts','suppliers','db','api','sys'].forEach(pick);
    }catch(_){ }
  })();

  // ✅ Initialize screen permissions
  if (window.ScreenPermissions) {
    await window.ScreenPermissions.init();
  }

  const btnNew = document.getElementById('r_btnNew');
  const btnEditTop = document.getElementById('r_btnEditTop');
  const btnSaveTop = document.getElementById('r_btnSaveTop');
  const btnPrintTop = document.getElementById('r_btnPrintTop');
  const btnJournalView = document.getElementById('r_btnJournalView');
  const btnWhatsApp = document.getElementById('r_btnWhatsApp');
  const btnClose = document.getElementById('r_btnClose');
  const btnAddLine = document.getElementById('r_btnAddLine');
  const linesTable = document.getElementById('r_linesTable');
  const errEl = document.getElementById('r_error');
  const btnExportXls = document.getElementById('r_btnExportXls');
  const btnExportPdf = document.getElementById('r_btnExportPdf');
  const btnDeleteTop = document.getElementById('r_btnDeleteTop');
  const navFirst = document.getElementById('r_nav_first');
  const navPrev  = document.getElementById('r_nav_prev');
  const navNext  = document.getElementById('r_nav_next');
  const navLast  = document.getElementById('r_nav_last');
  const navIdInp = document.getElementById('r_nav_id');
  const navCounter = document.getElementById('r_nav_counter');
  const btnCopyMemo = document.getElementById('r_btnCopyMemo');
  const memoField = document.getElementById('r_memo');

  // caches for names
  let accountsCache = [];
  let customersCache = [];
  let suppliersCache = [];

  // Screen mode state: 'view' | 'new' | 'edit'
  let screenMode = 'view';
  let editUnlockedForId = null;
  let currentReceiptId = null;
  let receiptSaveInFlight = false;
  function getReceiptDisplayNumber() {
    const value = parseInt(document.getElementById('r_id')?.value || '', 10);
    return Number.isFinite(value) && value > 0 ? value : 0;
  }
  function getReceiptInternalId() {
    const value = Number(currentReceiptId || 0);
    return Number.isFinite(value) && value > 0 ? value : 0;
  }
  function getReceiptBranchScopeMode() {
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
  function isReceiptAllBranchesScope() {
    return getReceiptBranchScopeMode() === 'all';
  }
  function getReceiptNavNumber(header, fallbackId = 0) {
    const internalId = Number(header?.id || fallbackId || 0) || 0;
    const branchLocalNumber = Number(header?.branch_local_number || 0) || 0;
    return branchLocalNumber || internalId || 0;
  }
  function buildReceiptNavRecords(rows = []) {
    return (Array.isArray(rows) ? rows : [])
      .map((row) => {
        const internalId = Number(row?.id || 0) || 0;
        return {
          id: internalId,
          navNumber: getReceiptNavNumber(row, internalId),
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
  function findReceiptIdByNavNumber(value) {
    const targetNavNumber = Number(value || 0) || 0;
    if (targetNavNumber <= 0) {
      return 0;
    }
    const matches = rNavRecords.filter((row) => Number(row?.navNumber || 0) === targetNavNumber);
    if (!matches.length) {
      return 0;
    }
    const currentId = getReceiptInternalId();
    const currentMatch = matches.find((row) => row.id === currentId);
    return Number(currentMatch?.id || matches[matches.length - 1]?.id || 0) || 0;
  }
  function getReceiptCounterDisplay() {
    if (isReceiptAllBranchesScope()) {
      const total = rIds.length;
      const current = rIndex >= 0 && rIndex < total ? rIndex + 1 : 0;
      return { current, total };
    }
    const resolvedIndex = rIndex >= 0 && rIndex < rNavRecords.length
      ? rIndex
      : rIds.findIndex((id) => id === getReceiptInternalId());
    const current = Number(rNavRecords[resolvedIndex]?.navNumber || 0) || 0;
    const total = Number(rNavRecords[rNavRecords.length - 1]?.navNumber || 0) || 0;
    return { current, total };
  }

  // Unsaved changes state
  let rHasUnsavedChanges = false;
  let rPendingUnsavedResolve = null;

  // Unsaved changes modal elements
  const rUnsavedModal = document.getElementById('unsavedChangesModal');
  const rUnsavedClose = document.getElementById('unsavedChangesClose');
  const rUnsavedStayBtn = document.getElementById('unsavedStayBtn');
  const rUnsavedLeaveBtn = document.getElementById('unsavedLeaveBtn');

  function rMarkUnsaved() {
    if (screenMode === 'edit' || screenMode === 'new') {
      rHasUnsavedChanges = true;
    }
  }

  function rResetUnsaved() {
    rHasUnsavedChanges = false;
  }

  function rOpenUnsavedModal() {
    if (!rUnsavedModal) return Promise.resolve(true);
    return new Promise(resolve => {
      rPendingUnsavedResolve = resolve;
      rUnsavedModal.classList.add('show');
      rUnsavedModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  }

  function rCloseUnsavedModal(result = false) {
    if (rUnsavedModal) {
      rUnsavedModal.classList.remove('show');
      rUnsavedModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    if (rPendingUnsavedResolve) {
      rPendingUnsavedResolve(!!result);
      rPendingUnsavedResolve = null;
    }
  }

  // Wire unsaved-changes modal buttons
  if (rUnsavedClose) rUnsavedClose.addEventListener('click', () => rCloseUnsavedModal(false));
  if (rUnsavedStayBtn) rUnsavedStayBtn.addEventListener('click', () => rCloseUnsavedModal(false));
  if (rUnsavedLeaveBtn) rUnsavedLeaveBtn.addEventListener('click', () => { rResetUnsaved(); rCloseUnsavedModal(true); });
  if (rUnsavedModal) {
    const backdrop = rUnsavedModal.querySelector('.permission-denied-backdrop');
    if (backdrop) backdrop.addEventListener('click', () => rCloseUnsavedModal(false));
  }

  // Expose guard for outer shell
  window.canLeaveReceiptVoucher = async function () {
    if (!rHasUnsavedChanges || screenMode === 'view') return true;
    try {
      const result = await rOpenUnsavedModal();
      return !!result;
    } catch (e) { return true; }
  };

  // Track changes on header fields
  const rHeaderInputsForUnsaved = ['r_date', 'r_memo', 'r_cash_acc_no_inp', 'r_gold_acc_no_inp', 'r_silver_acc_no_inp', 'r_cash_acc', 'r_gold_acc', 'r_silver_acc'];
  rHeaderInputsForUnsaved.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      ['input', 'change'].forEach(evt => el.addEventListener(evt, () => rMarkUnsaved()));
    }
  });

  // Track changes on lines table (delegated)
  if (linesTable) {
    linesTable.addEventListener('input', () => rMarkUnsaved());
    linesTable.addEventListener('change', () => rMarkUnsaved());
  }

  function setReadOnly(isReadOnly){
    const dateEl = document.getElementById('r_date');
    const memoEl = document.getElementById('r_memo');
    const cashNo = document.getElementById('r_cash_acc_no_inp');
    const goldNo = document.getElementById('r_gold_acc_no_inp');
    const silverNo = document.getElementById('r_silver_acc_no_inp');
    const cashSel = document.getElementById('r_cash_acc');
    const goldSel = document.getElementById('r_gold_acc');
    const silverSel = document.getElementById('r_silver_acc');

    [dateEl, memoEl, cashNo, goldNo, silverNo, cashSel, goldSel, silverSel].forEach(inp => {
      if (inp) inp.disabled = isReadOnly;
    });

    if (btnAddLine) {
      btnAddLine.disabled = isReadOnly;
    }

    if (btnCopyMemo) {
      btnCopyMemo.disabled = isReadOnly;
    }

    if (linesTable) {
      const rowControls = linesTable.querySelectorAll('input, button');
      rowControls.forEach(el => {
        el.disabled = isReadOnly;
      });
    }

    if (btnSaveTop) {
      const saveTextEl = document.getElementById('r_btnSaveText');
      if (saveTextEl) {
        saveTextEl.style.display = 'inline-flex';
        saveTextEl.style.alignItems = 'center';
        saveTextEl.style.gap = '6px';
        if (screenMode === 'edit') {
          saveTextEl.innerHTML = `<i class="fa-solid fa-circle-check"></i><span>${tRV('btnSaveEdit')}</span>`;
        } else {
          saveTextEl.innerHTML = `<i class="fa-solid fa-circle-check"></i><span>${tRV('btnSave')}</span>`;
        }
      }
      btnSaveTop.disabled = (screenMode === 'view');
    }

    if (btnNew) {
      btnNew.disabled = (screenMode === 'edit' || screenMode === 'new');
    }

    if (btnEditTop) {
      const curId = getReceiptInternalId();
      btnEditTop.disabled = !curId || screenMode !== 'view';
    }

    if (btnDeleteTop) {
      const deleteTextEl = document.getElementById('r_btnDeleteText');
      const curId = getReceiptInternalId();
      if (deleteTextEl) {
        deleteTextEl.style.display = 'inline-flex';
        deleteTextEl.style.alignItems = 'center';
        deleteTextEl.style.gap = '6px';
        if ((screenMode === 'new') || (screenMode === 'edit' && curId)) {
          deleteTextEl.innerHTML = `<i class="fa-solid fa-circle-xmark"></i><span>${tRV('btnCancel')}</span>`;
          btnDeleteTop.disabled = false;
        } else {
          deleteTextEl.innerHTML = `<i class="fa-solid fa-circle-xmark"></i><span>${tRV('btnDelete')}</span>`;
          btnDeleteTop.disabled = !curId;
        }
      }
    }

    if (btnJournalView) {
      const curId = getReceiptInternalId();
      btnJournalView.disabled = !curId;
    }

    const inEdit = (screenMode !== 'view');
    if (navFirst) navFirst.disabled = inEdit ? true : navFirst.disabled;
    if (navPrev)  navPrev.disabled  = inEdit ? true : navPrev.disabled;
    if (navNext)  navNext.disabled  = inEdit ? true : navNext.disabled;
    if (navLast)  navLast.disabled  = inEdit ? true : navLast.disabled;

    if (navIdInp) {
      navIdInp.disabled = inEdit;
    }
  }

  // Start in view/read-only mode
  setReadOnly(true);

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
  
  // ===== English Number to Words =====
  function englishIntToWords(num) {
    if (num === 0) return 'Zero';
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const scales = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];
    
    function below100(n) {
      if (n < 10) return ones[n];
      if (n < 20) return teens[n - 10];
      const t = Math.floor(n / 10), o = n % 10;
      return o ? `${tens[t]}-${ones[o]}` : tens[t];
    }
    function below1000(n) {
      if (n < 100) return below100(n);
      const h = Math.floor(n / 100), r = n % 100;
      return r ? `${ones[h]} Hundred ${below100(r)}` : `${ones[h]} Hundred`;
    }
    
    let n = Math.abs(num);
    const parts = [];
    let scaleIdx = 0;
    while (n > 0) {
      const chunk = n % 1000;
      if (chunk > 0) {
        const chunkWords = below1000(chunk);
        parts.unshift(scales[scaleIdx] ? `${chunkWords} ${scales[scaleIdx]}` : chunkWords);
      }
      n = Math.floor(n / 1000);
      scaleIdx++;
    }
    return parts.join(' ');
  }
  
  function toEnglishWordsCash(n) {
    const num = Math.abs(Number(n) || 0);
    const intPart = Math.floor(num);
    const frac = Math.round((num - intPart) * 100);
    const words = englishIntToWords(intPart);
    const fracWords = frac ? ` and ${englishIntToWords(frac)} Halalas` : '';
    return `${words} Riyals${fracWords}`.trim();
  }
  
  function toEnglishWordsGold(n) {
    const num = Math.abs(Number(n) || 0);
    const intPart = Math.floor(num);
    const frac = Math.round((num - intPart) * 100);
    const base = `${englishIntToWords(intPart)} Grams`;
    return frac ? `${base} and ${englishIntToWords(frac)} Milligrams` : base;
  }
  
  // Combined functions that use correct language
  function toWordsCash(n) {
    return getRVLang() === 'en' ? toEnglishWordsCash(n) : toArabicWordsCash(n);
  }
  
  function toWordsGold(n) {
    return getRVLang() === 'en' ? toEnglishWordsGold(n) : toArabicWordsGold(n);
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
      if (!userData) return '';
      const user = JSON.parse(userData);
      return String(user.full_name || user.full_name_en || user.username || '').trim();
    } catch (_) {
      return '';
    }
  }

  async function loadCaches(){
    const [a, c, s] = await Promise.all([
      (async () => { try { return await (window.accounts?.getAccounts?.()); } catch (_) { return null; } })(),
      (async () => { try { return await (window.db?.getCustomers?.()); } catch (_) { return null; } })(),
      (async () => { try { return await (window.suppliers?.getSuppliers?.()); } catch (_) { return null; } })()
    ]);

    accountsCache = (a && a.success) ? (a.data || a.accounts || []) : [];
    customersCache = (c && c.success) ? (c.data || []) : [];
    suppliersCache = (s && s.success) ? (s.data || []) : [];
  }
  
  // formatNumberWithCommas and parseDecimal are now loaded from common-utils.js
  
  function r_getLookupAccounts(rows){
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

  // Helper function for arrow key navigation between rows
  function handleArrowNavigation(e, currentInput, fieldName) {
    // For number inputs, only navigate with Ctrl or Alt modifier
    const isNumberInput = currentInput.type === 'number';
    const hasModifier = e.ctrlKey || e.altKey;
    
    // For number inputs, only navigate with modifier key
    if (isNumberInput && !hasModifier) {
      return; // Allow default number input behavior
    }
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const currentRow = currentInput.closest('tr');
      const nextRow = currentRow.nextElementSibling;
      if (nextRow) {
        nextRow.querySelector(`input[name="${fieldName}"]`)?.focus();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const currentRow = currentInput.closest('tr');
      const prevRow = currentRow.previousElementSibling;
      if (prevRow) {
        prevRow.querySelector(`input[name="${fieldName}"]`)?.focus();
      }
    }
  }
  // Watch header account selects
  const rCashSel = document.getElementById('r_cash_acc');
  const rGoldSel = document.getElementById('r_gold_acc');
  const rCashHid = document.getElementById('r_cash_acc_id');
  const rGoldHid = document.getElementById('r_gold_acc_id');
  if (rCashSel) rCashSel.addEventListener('change', ()=>{ try{ r_checkSelfReference(); }catch(_){ } });
  if (rGoldSel) rGoldSel.addEventListener('change', ()=>{ try{ r_checkSelfReference(); }catch(_){ } });
  if (rCashHid) rCashHid.addEventListener('input', ()=>{ try{ r_checkSelfReference(); }catch(_){ } });
  if (rGoldHid) rGoldHid.addEventListener('input', ()=>{ try{ r_checkSelfReference(); }catch(_){ } });

  // Red capsule under name cell for self-reference (يقارن بأكواد الحسابات الظاهرة)
  function r_checkSelfReference(){
    const chipId = 'r_self_chip';
    let chip = document.getElementById(chipId);
    if (!linesTable) return;
    const cashCode = String(document.getElementById('r_cash_acc_no_inp')?.value || '').trim();
    const goldCode = String(document.getElementById('r_gold_acc_no_inp')?.value || '').trim();
    const rows = Array.from(linesTable.querySelectorAll('tbody tr'));
    let targetName = null;
    for (const tr of rows){
      const aidCode = String(tr.querySelector('input[name="r_account_id"]')?.value || '').trim();
      const amt = parseFloat(tr.querySelector('input[name="r_amount"]')?.value.replace(/,/g, '')||'0') || 0;
      const w   = parseFloat(tr.querySelector('input[name="r_weight"]')?.value.replace(/,/g, '')||'0') || 0;
      if (aidCode && ((cashCode && aidCode===cashCode) || (goldCode && aidCode===goldCode)) && (amt>0 || w>0)){
        targetName = tr.querySelector('input[name="r_name"]') || tr; break;
      }
    }
    if (targetName){
      if (!chip){
        chip = document.createElement('div'); chip.id=chipId; chip.className='self-chip';
        chip.innerHTML = '<span>عملية ذاتية للحساب — لا تؤثر على الرصيد</span><span class="x" title="إخفاء">✕</span>';
        document.body.appendChild(chip);
        chip.querySelector('.x').addEventListener('click', ()=>{ chip.style.display='none'; });
      }
      const r = targetName.getBoundingClientRect(); const gap=6; const top=window.scrollY+r.bottom+gap; const left=Math.min(window.scrollX+r.left, window.scrollX+window.innerWidth-320);
      chip.style.top=top+'px'; chip.style.left=left+'px'; chip.style.display='flex';
    } else {
      if (chip) chip.style.display='none';
    }
  }
  async function waitForReceipt(maxMs=3000){
    const start = Date.now();
    while (Date.now()-start < maxMs){
      if (window.receipt && typeof window.receipt.get === 'function' && typeof window.receipt.list === 'function') return true;
      await new Promise(r=>setTimeout(r, 50));
    }
    return !!(window.receipt && typeof window.receipt.get === 'function');
  }

  // ===== Auto-load by query id when opened from reports =====
  function getReceiptQueryId(){
    try{
      const params = new URLSearchParams(window.location.search || '');
      const idStr = params.get('id');
      const rid = idStr ? parseInt(idStr, 10) : 0;
      return Number.isFinite(rid) && rid > 0 ? rid : null;
    }catch(_){ return null; }
  }
  function optionLabel(acc){
    const code = acc && acc.code != null ? String(acc.code) : '';
    return `${code} — ${acc.name}`;
  }
  async function populateAccountSelects(){
    const cashSel = document.getElementById('r_cash_acc');
    const goldSel = document.getElementById('r_gold_acc');
    const silverSel = document.getElementById('r_silver_acc');
    if (!cashSel || !goldSel) return;
    // استبعاد الحسابات الرئيسية (التي لها فروع)
    const rows = Array.isArray(accountsCache) ? accountsCache.filter(acc => acc.is_parent !== 1) : [];
    
    // جلب الصناديق الافتراضية من قاعدة البيانات أولاً
    let defCash = '', defGold = '', defSilver = '';
    try {
      const api = window.accounts || window.parent?.accounts || window.top?.accounts;
      if (api && typeof api.getDefaultBoxes === 'function') {
        const result = await api.getDefaultBoxes();
        if (result && result.success && result.data) {
          defCash = result.data.cash?.account_id || '';
          defGold = result.data.gold?.account_id || '';
          defSilver = result.data.silver?.account_id || '';
        }
      }
    } catch(e) {
      // Could not load default boxes
    }
    
    // Fallback to old defaults if not set
    if (!defCash) defCash = rows.find(x=>Number(x.id)===1000) ? '1000' : (rows[0]?.id ?? '');
    if (!defGold) defGold = rows.find(x=>Number(x.id)===1001) ? '1001' : (rows[1]?.id ?? rows[0]?.id ?? '');
    if (!defSilver) defSilver = rows.find(x=>Number(x.id)===999) ? '999' : '';
    
    // ملء القوائم مع إضافة ⭐ للافتراضي
    cashSel.innerHTML = '';
    goldSel.innerHTML = '';
    if (silverSel) silverSel.innerHTML = '';
    rows.forEach(acc=>{
      const isCashDef = String(acc.id) === String(defCash);
      const isGoldDef = String(acc.id) === String(defGold);
      const isSilverDef = String(acc.id) === String(defSilver);
      
      const o1 = document.createElement('option'); 
      o1.value = acc.id; 
      o1.textContent = isCashDef ? `⭐ ${optionLabel(acc)}` : optionLabel(acc); 
      cashSel.appendChild(o1);
      
      const o2 = document.createElement('option'); 
      o2.value = acc.id; 
      o2.textContent = isGoldDef ? `⭐ ${optionLabel(acc)}` : optionLabel(acc); 
      goldSel.appendChild(o2);
      
      if (silverSel){ 
        const o3 = document.createElement('option'); 
        o3.value = acc.id; 
        o3.textContent = isSilverDef ? `⭐ ${optionLabel(acc)}` : optionLabel(acc); 
        silverSel.appendChild(o3); 
      }
    });
    
    // حفظ الافتراضيات الحالية
    window._receiptDefaultBoxes = { cash: defCash, gold: defGold, silver: defSilver };
    
    if (defCash){ 
      cashSel.value = String(defCash); 
      const acc = (accountsCache || []).find(x => String(x.id) === String(defCash));
      const no = document.getElementById('r_cash_acc_no_inp'); 
      if (no) no.value = acc && acc.code != null ? String(acc.code) : '';
      const hid = document.getElementById('r_cash_acc_id'); 
      if (hid) hid.value = String(defCash); 
    }
    if (defGold){ 
      goldSel.value = String(defGold); 
      const acc = (accountsCache || []).find(x => String(x.id) === String(defGold));
      const no = document.getElementById('r_gold_acc_no_inp'); 
      if (no) no.value = acc && acc.code != null ? String(acc.code) : '';
      const hid = document.getElementById('r_gold_acc_id'); 
      if (hid) hid.value = String(defGold); 
    }
    if (defSilver && silverSel){ 
      silverSel.value = String(defSilver); 
      const acc = (accountsCache || []).find(x => String(x.id) === String(defSilver));
      const no = document.getElementById('r_silver_acc_no_inp'); 
      if (no) no.value = acc && acc.code != null ? String(acc.code) : '';
      const hid = document.getElementById('r_silver_acc_id'); 
      if (hid) hid.value = String(defSilver); 
    }
  }
  

  function wireAccountSelects(){
    const cashSel = document.getElementById('r_cash_acc');
    const goldSel = document.getElementById('r_gold_acc');
    const silverSel = document.getElementById('r_silver_acc');
    if (cashSel){ cashSel.addEventListener('change', ()=>{ 
      const v = cashSel.value || ''; 
      const acc = (accountsCache || []).find(x => String(x.id) === String(v));
      const no = document.getElementById('r_cash_acc_no_inp'); 
      if (no) no.value = acc && acc.code != null ? String(acc.code) : ''; 
      const hid = document.getElementById('r_cash_acc_id'); 
      if (hid) hid.value = v;
    }); }
    if (goldSel){ goldSel.addEventListener('change', ()=>{ 
      const v = goldSel.value || ''; 
      const acc = (accountsCache || []).find(x => String(x.id) === String(v));
      const no = document.getElementById('r_gold_acc_no_inp'); 
      if (no) no.value = acc && acc.code != null ? String(acc.code) : ''; 
      const hid = document.getElementById('r_gold_acc_id'); 
      if (hid) hid.value = v;
    }); }
    if (silverSel){ silverSel.addEventListener('change', ()=>{ 
      const v = silverSel.value || ''; 
      const acc = (accountsCache || []).find(x => String(x.id) === String(v));
      const no = document.getElementById('r_silver_acc_no_inp'); 
      if (no) no.value = acc && acc.code != null ? String(acc.code) : ''; 
      const hid = document.getElementById('r_silver_acc_id'); 
      if (hid) hid.value = v;
    }); }
  }

  // Navigation IDs cache
  let rIds = [];
  let rNavRecords = [];
  let rIndex = -1;
  async function r_fetchIds(){
    try{
      await waitForReceipt();
      const r = await (window.receipt?.list?.());
      if (r && r.success){
        const arr = Array.isArray(r.rows) ? r.rows : (Array.isArray(r.data) ? r.data : []);
        return arr;
      }
    }catch(_){ }
    return [];
  }
  async function r_refreshIdsAndIndex(targetId=null){
    rNavRecords = buildReceiptNavRecords(await r_fetchIds());
    rIds = rNavRecords.map((row) => row.id);
    if (targetId && rIds.length){
      rIndex = Math.max(0, rIds.findIndex(id => id === targetId));
    } else {
      rIndex = rIds.length ? rIds.length - 1 : -1;
    }
    if (navCounter) {
      const { current, total } = getReceiptCounterDisplay();
      navCounter.textContent = `${current} / ${total}`;
    }
    return rIds;
  }
  async function r_getLastId(){
    try{
      await waitForReceipt();
      const navRecords = buildReceiptNavRecords(await r_fetchIds());
      if (navRecords.length) {
        return navRecords[navRecords.length - 1].id;
      }
      const n = await (window.receipt?.getNextId?.());
      const last = (n && n.success && n.nextId) ? (parseInt(n.nextId,10)-1) : 0;
      return last > 0 ? last : null;
    }catch(_){ return null; }
  }
  const R_MIN_ROWS = 5;
  function r_clearLines(){ const tb = linesTable?.querySelector('tbody'); if (tb){ tb.innerHTML=''; } }
  function r_ensureMinimumRows(minRows = R_MIN_ROWS){
    const tb = linesTable?.querySelector('tbody');
    if (!tb) return;
    const currentRows = tb.querySelectorAll('tr').length;
    for(let i = currentRows; i < minRows; i++) r_addLine();
  }
  function r_resetToMinimumRows(minRows = R_MIN_ROWS){
    const tb = linesTable?.querySelector('tbody');
    if (!tb) return;
    tb.innerHTML='';
    r_ensureMinimumRows(minRows);
  }
  function r_fillLines(lines){
    const tb = linesTable?.querySelector('tbody'); if (!tb) return;
    r_clearLines();
    if (Array.isArray(lines) && lines.length){ 
      lines.forEach(L => r_addLine(L)); 
      // Ensure minimum 6 rows
      r_ensureMinimumRows();
    } else { 
      // No lines - add 4 empty rows
      r_ensureMinimumRows();
    }
  }
  async function r_loadById(id, options = {}){
    if (!id || !window.receipt?.get) return;
    try{
      if (!rIds || !rIds.length){ await r_refreshIdsAndIndex(); }
      // Ensure selects are populated before assigning values
      const cashSel0 = document.getElementById('r_cash_acc');
      if (cashSel0 && !cashSel0.options.length){ await populateAccountSelects(); }
      const requestPayload = options?.lookupByBranchLocalNumber
        ? { id, lookupByBranchLocalNumber: true }
        : id;
      const resp = await window.receipt.get(requestPayload);
      if (!resp || !resp.success) return;
      const data = resp.data || {};
      const hdr = data.header || {};
      const lines = data.lines || [];
      currentReceiptId = hdr.id ?? id;
      const idEl = document.getElementById('r_id'); if (idEl) idEl.value = hdr.branch_local_number || hdr.id || id;
      if (navIdInp) navIdInp.value = String(getReceiptNavNumber(hdr, id) || '');
      // Use local date fallback (not UTC)
      const dateEl = document.getElementById('r_date'); 
      if (dateEl) { 
        if (hdr.date) { dateEl.value = hdr.date; }
        else if (hdr.created_at) { dateEl.value = String(hdr.created_at).substring(0,10); }
        else { const d = new Date(); dateEl.value = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0'); }
      }
      if (timeInp){
        const t = (hdr && hdr.time) ? String(hdr.time) : (hdr && hdr.created_at ? String(hdr.created_at).substring(11,16) : '');
        timeInp.value = t || timeInp.value || '';
      }
      const memoEl = document.getElementById('r_memo'); if (memoEl) memoEl.value = hdr.memo || '';
      const cashId = hdr.cash_account_id ?? '';
      const goldId = hdr.gold_account_id ?? '';
      // استخدام الافتراضي 999 إذا كان silver_account_id فارغاً
      const silverId = hdr.silver_account_id || (accountsCache.find(x=>Number(x.id)===999) ? '999' : '');
      const cashSel = document.getElementById('r_cash_acc'); if (cashSel){ cashSel.value = String(cashId||''); }
      const goldSel = document.getElementById('r_gold_acc'); if (goldSel){ goldSel.value = String(goldId||''); }
      const silverSel = document.getElementById('r_silver_acc'); if (silverSel){ silverSel.value = String(silverId||''); }
      const cashAcc = (accountsCache || []).find(x => String(x.id) === String(cashId));
      const goldAcc = (accountsCache || []).find(x => String(x.id) === String(goldId));
      const silverAcc = (accountsCache || []).find(x => String(x.id) === String(silverId));
      const cashNo = document.getElementById('r_cash_acc_no_inp'); if (cashNo) cashNo.value = cashAcc && cashAcc.code != null ? String(cashAcc.code) : '';
      const goldNo = document.getElementById('r_gold_acc_no_inp'); if (goldNo) goldNo.value = goldAcc && goldAcc.code != null ? String(goldAcc.code) : '';
      const silverNo = document.getElementById('r_silver_acc_no_inp'); if (silverNo) silverNo.value = silverAcc && silverAcc.code != null ? String(silverAcc.code) : '';
      const cashHid = document.getElementById('r_cash_acc_id'); if (cashHid) cashHid.value = String(cashId||'');
      const goldHid = document.getElementById('r_gold_acc_id'); if (goldHid) goldHid.value = String(goldId||'');
      const silverHid = document.getElementById('r_silver_acc_id'); if (silverHid) silverHid.value = String(silverId||'');
      r_fillLines(lines);
      if (navCounter && rIds && rIds.length){
        const pos = rIds.findIndex(x=>x===Number(currentReceiptId || hdr.id || id));
        rIndex = pos >= 0 ? pos : rIndex;
        const { current, total } = getReceiptCounterDisplay();
        navCounter.textContent = `${current} / ${total}`;
      } else if (navCounter){ navCounter.textContent = '0 / 0'; }
      const atStart = rIndex <= 0;
      const atEnd = rIds && rIndex >= rIds.length - 1;
      if (navFirst) navFirst.disabled = !!atStart;
      if (navPrev)  navPrev.disabled  = !!atStart;
      if (navNext)  navNext.disabled  = !!atEnd;
      if (navLast)  navLast.disabled  = !!atEnd;

      // بعد تحميل أي سند موجود نجعل الشاشة دائماً في وضع عرض فقط
      screenMode = 'view';
      editUnlockedForId = null;
      setReadOnly(true);
      rResetUnsaved();
      
      // Display user tracking info
      const trackingDiv = document.getElementById('r_user_tracking_info');
      const createdInfo = document.getElementById('r_created_info');
      const updatedInfo = document.getElementById('r_updated_info');
      if (trackingDiv && createdInfo && updatedInfo) {
        let hasInfo = false;
        let allInfo = [];
        const isEnglish = getRVLang() === 'en';
        
        // Use username for English, full_name for Arabic
        const createdByDisplay = isEnglish 
          ? (hdr.created_by_username || hdr.created_by_name || '')
          : (hdr.created_by_name || hdr.created_by_username || '');
        const updatedByDisplay = isEnglish 
          ? (hdr.updated_by_username || hdr.updated_by_name || '')
          : (hdr.updated_by_name || hdr.updated_by_username || '');
        
        if (createdByDisplay || hdr.created_at) {
          hasInfo = true;
          let createdText = `<i class="fa-solid fa-user-plus" style="margin-inline-end:6px; color:#10b981;"></i> ${tRV('createdBy')} `;
          if (createdByDisplay) createdText += `<strong>${createdByDisplay}</strong>`;
          if (hdr.created_at) {
            const dateTimeStr = String(hdr.created_at).replace(' ', 'T');
            const createdDate = new Date(dateTimeStr);
            const dateStr = createdDate.toLocaleDateString('en-GB');
            const timeStr = createdDate.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit', hour12: false});
            createdText += ` <span style="color:var(--subtle);">${dateStr} ${timeStr}</span>`;
          }
          allInfo.push(createdText);
        }
        
        if (updatedByDisplay || hdr.updated_at) {
          hasInfo = true;
          let updatedText = `<i class="fa-solid fa-user-clock" style="margin-inline-end:6px; color:#f59e0b;"></i> ${tRV('lastModified')} `;
          if (updatedByDisplay) updatedText += `<strong>${updatedByDisplay}</strong>`;
          if (hdr.updated_at) {
            const dateTimeStr = String(hdr.updated_at).replace(' ', 'T');
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
        trackingDiv.style.display = hasInfo ? 'block' : 'none';
      }
      
      try{ r_checkSelfReference(); }catch(_){ }
    }catch(_){ }
  }
  function getNameByIds(cid, sid, aid){
    if (cid){ const c = customersCache.find(x=> Number(x.id)===Number(cid)); if (c) return c.name || c.full_name || c.company || `${cid}`; }
    if (sid){ const s = suppliersCache.find(x=> Number(x.id)===Number(sid)); if (s) return s.name || s.full_name || s.company || `${sid}`; }
    if (aid){
      // للحساب يمكن أن يأتي aid كرقم داخلي أو كود ظاهر
      let a = accountsCache.find(x=> Number(x.id)===Number(aid));
      if (!a) a = accountsCache.find(x=> String(x.code)===String(aid));
      if (a) return a.name || String(a.code || aid);
    }
    return '';
  }

  // showToast is now loaded from common-utils.js
  function r_addLine(data={}){
    const tb = linesTable?.querySelector('tbody'); if (!tb) return;
    const tr = document.createElement('tr');
    const cid = data.customer_id ?? '';
    const sid = data.supplier_id ?? '';
    const aidId = data.account_id ?? '';
    let aidCode = '';
    if (aidId){
      const acc = (accountsCache || []).find(x => Number(x.id) === Number(aidId));
      if (acc && acc.code != null) aidCode = String(acc.code);
    }
    const amt = data.amount ? formatNumberWithCommas(data.amount) : '';
    const w   = data.weight ? formatNumberWithCommas(data.weight) : '';
    const kar = data.karat ?? '';
    const note= data.note ?? '';
    const nm  = getNameByIds(cid, sid, aidId || aidCode) || '';
    tr.innerHTML = `
      <td><input type="text" name="r_customer_id" value="${cid}" placeholder="${tRV('f9Search')}" title="${tRV('f9Search')}" style="width:92px" inputmode="numeric"></td>
      <td><input type="text" name="r_supplier_id" value="${sid}" placeholder="${tRV('f9Search')}" title="${tRV('f9Search')}" style="width:92px" inputmode="numeric"></td>
      <td><input type="text" name="r_account_id" value="${aidCode}" placeholder="${tRV('f9Search')}" title="${tRV('f9Search')}" style="width:92px" inputmode="numeric"></td>
      <td><input type="text" name="r_name" value="${nm}" readonly style="min-width:160px"></td>
      <td><input type="text" name="r_amount" value="${amt}" placeholder="${tRV('amountPlaceholder')}"></td>
      <td><input type="text" name="r_weight" value="${w}" placeholder="${tRV('weightPlaceholder')}"></td>
      <td><input type="text" name="r_karat" value="${kar}" list="r_karat_list" inputmode="numeric" style="width:80px" placeholder="${tRV('karatPlaceholder')}"></td>
      <td><input type="text" name="r_note" value="${note}" style="min-width:160px" placeholder="${tRV('descPlaceholder')}"></td>
      <td class="row"><button type="button" class="icon-btn act-delete" title="${tRV('thRemove')}"><i class="fa-solid fa-xmark"></i></button></td>`;
    
    // Add formatting and arrow navigation to amount field
    const amountInput = tr.querySelector('input[name="r_amount"]');
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
      });
      amountInput.addEventListener('keydown', (e) => {
        handleArrowNavigation(e, amountInput, 'r_amount');
      });
    }
    
    // Add formatting and arrow navigation to weight field
    const weightInput = tr.querySelector('input[name="r_weight"]');
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
      });
      weightInput.addEventListener('keydown', (e) => {
        handleArrowNavigation(e, weightInput, 'r_weight');
      });
    }
    
    // Add numeric-only validation and arrow navigation for ID fields
    const custInput = tr.querySelector('input[name="r_customer_id"]');
    if (custInput) {
      custInput.addEventListener('input', (e) => {
        // Remove all non-numeric characters
        e.target.value = e.target.value.replace(/[^\d]/g, '');
      });
      custInput.addEventListener('keydown', (e) => {
        handleArrowNavigation(e, custInput, 'r_customer_id');
      });
    }
    
    const suppInput = tr.querySelector('input[name="r_supplier_id"]');
    if (suppInput) {
      suppInput.addEventListener('input', (e) => {
        // Remove all non-numeric characters
        e.target.value = e.target.value.replace(/[^\d]/g, '');
      });
      suppInput.addEventListener('keydown', (e) => {
        handleArrowNavigation(e, suppInput, 'r_supplier_id');
      });
    }
    
    const accInput = tr.querySelector('input[name="r_account_id"]');
    if (accInput) {
      accInput.addEventListener('input', (e) => {
        // Remove all non-numeric characters
        e.target.value = e.target.value.replace(/[^\d]/g, '');
      });
      accInput.addEventListener('keydown', (e) => {
        handleArrowNavigation(e, accInput, 'r_account_id');
      });
    }
    
    const karatInput = tr.querySelector('input[name="r_karat"]');
    if (karatInput) {
      karatInput.addEventListener('keydown', (e) => {
        handleArrowNavigation(e, karatInput, 'r_karat');
      });
    }
    
    const noteInput = tr.querySelector('input[name="r_note"]');
    if (noteInput) {
      noteInput.addEventListener('keydown', (e) => {
        handleArrowNavigation(e, noteInput, 'r_note');
      });
    }
    
    tb.appendChild(tr);
  }

  function r_syncName(tr){
    const get = sel => tr.querySelector(sel)?.value || '';
    const cid = parseInt(get('input[name="r_customer_id"]'),10) || null;
    const sid = parseInt(get('input[name="r_supplier_id"]'),10) || null;
    const aidRaw = get('input[name="r_account_id"]') || null;
    let label = '';
    if (aidRaw){
      // البحث بكود الحساب الظاهر فقط
      const a = (accountsCache || []).find(x => String(x.code) === String(aidRaw));
      label = a ? (a.name || String(a.code)) : 'لا يوجد حساب بهذا الرقم';
    } else if (cid){
      const c = customersCache.find(x => Number(x.id) === Number(cid));
      label = c ? (c.name || c.full_name || c.company || String(c.id)) : 'لا يوجد عميل بهذا الرقم';
    } else if (sid){
      const s = suppliersCache.find(x => Number(x.id) === Number(sid));
      label = s ? (s.name || s.full_name || s.company || String(s.id)) : 'لا يوجد مورد بهذا الرقم';
    } else {
      label = '';
    }
    const nameInp = tr.querySelector('input[name="r_name"]'); if (nameInp) nameInp.value = label;
  }

  async function r_new(){
    screenMode = 'new';
    editUnlockedForId = null;
    currentReceiptId = null;
    setReadOnly(false);

    // reset header
    const idEl = document.getElementById('r_id'); const dateEl = document.getElementById('r_date'); const memoEl = document.getElementById('r_memo');
    const cash = document.getElementById('r_cash_acc_id'); const gold = document.getElementById('r_gold_acc_id');
    try{ const n = await (window.receipt?.getNextId?.() || {}); if (n && n.success) idEl.value = n.nextId; else idEl.value=''; }catch(_){ idEl.value=''; }
    // Use local date (not UTC) to avoid showing yesterday's date
    const todayLocal = new Date();
    dateEl.value = todayLocal.getFullYear() + '-' + String(todayLocal.getMonth()+1).padStart(2,'0') + '-' + String(todayLocal.getDate()).padStart(2,'0');
    if (timeInp){ const now = new Date(); timeInp.value = now.toTimeString().slice(0,5); }
    memoEl.value = '';
    // reset selects to defaults
    await populateAccountSelects();
    // reset lines - default 4 rows
    r_resetToMinimumRows();
    setTimeout(()=> memoEl.focus(), 0);
    // reset nav state
    if (navIdInp) navIdInp.value = '';
    if (navCounter) navCounter.textContent = '0 / 0';
    if (navFirst) navFirst.disabled = true;
    if (navPrev)  navPrev.disabled  = true;
    if (navNext)  navNext.disabled  = true;
    if (navLast)  navLast.disabled  = true;
  }

  async function r_save(){
    if (receiptSaveInFlight) return;
    receiptSaveInFlight = true;
    if (btnSaveTop) btnSaveTop.disabled = true;
    try {
      const curId = getReceiptInternalId();
      const displayId = getReceiptDisplayNumber();
      const isEditingExisting = (screenMode === 'edit');

      if (isEditingExisting) {
        if (window.ScreenPermissions && !window.ScreenPermissions.check('receipts_edit', 'تعديل سند قبض')) {
          return;
        }
        if (editUnlockedForId !== curId) {
          if (typeof showToast === 'function') {
            showToast('error', tRV('editNotEnabled'));
          }
          return;
        }
      } else {
        if (window.ScreenPermissions && !window.ScreenPermissions.check('receipts_add', 'إضافة سند قبض')) {
          return;
        }
      }
      
      if (timeInp){ const now = new Date(); timeInp.value = now.toTimeString().slice(0,5); }
      const currentUserId = getCurrentUserId();
      const header = {
        date: document.getElementById('r_date')?.value || (()=>{ const d=new Date(); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); })(),
        time: timeInp ? (timeInp.value || null) : null,
        note: document.getElementById('r_memo')?.value?.trim() || '',
        cash_account_id: document.getElementById('r_cash_acc_id')?.value ? parseInt(document.getElementById('r_cash_acc_id').value,10) : null,
        gold_account_id: document.getElementById('r_gold_acc_id')?.value ? parseInt(document.getElementById('r_gold_acc_id').value,10) : null,
        silver_account_id: document.getElementById('r_silver_acc_id')?.value ? parseInt(document.getElementById('r_silver_acc_id').value,10) : null,
      };
      
      if (isEditingExisting) {
        header.updated_by = currentUserId;
      } else {
        header.created_by = currentUserId;
      }
      
      const lines = [];
      let needKaratEl = null;
      let invalidEl = null;
      let invalidMsg = '';
      linesTable?.querySelectorAll('tbody tr').forEach(tr=>{
        const get = sel => tr.querySelector(sel)?.value || '';
        const cid = get('input[name="r_customer_id"]');
        const sid = get('input[name="r_supplier_id"]');
        const aidRaw = get('input[name="r_account_id"]');
        const amt = get('input[name="r_amount"]');
        const w   = get('input[name="r_weight"]');
        const kar = get('input[name="r_karat"]');
        const nt  = get('input[name="r_note"]');
        const weightNum = w ? parseFloat(w.replace(/,/g, '')) : 0;
        const karStr = String(kar||'').trim();
        if (!needKaratEl && weightNum > 0 && !karStr){ needKaratEl = tr.querySelector('input[name="r_karat"]'); }

        let resolvedAid = null;
        if (aidRaw) {
          const acc = (accountsCache || []).find(x => String(x.code) === String(aidRaw));
          if (acc && acc.id != null) {
            resolvedAid = acc.id;
          }
        }
        if (!invalidEl){
          if (cid){ const ok = !!(customersCache||[]).find(x=>Number(x.id)===parseInt(cid,10)); if (!ok){ invalidEl = tr.querySelector('input[name="r_customer_id"]'); invalidMsg = 'لا يوجد عميل بهذا الرقم. تأكد من رقم العميل.'; } }
          if (!invalidEl && sid){ const ok = !!(suppliersCache||[]).find(x=>Number(x.id)===parseInt(sid,10)); if (!ok){ invalidEl = tr.querySelector('input[name="r_supplier_id"]'); invalidMsg = 'لا يوجد مورد بهذا الرقم. تأكد من رقم المورد.'; } }
          if (!invalidEl && aidRaw && !resolvedAid){ invalidEl = tr.querySelector('input[name="r_account_id"]'); invalidMsg = 'لا يوجد حساب بهذا الرقم. تأكد من رقم الحساب.'; }
        }
        if (!cid && !sid && !aidRaw) {
          if (amt || w || kar || nt) {
            if (!invalidEl) {
              invalidEl = tr.querySelector('input[name="r_customer_id"]');
              invalidMsg = 'يجب إدخال رقم العميل أو المورد أو الحساب في كل سطر';
            }
          }
        } else {
          lines.push({
            customer_id: cid ? parseInt(cid,10) : null,
            supplier_id: sid ? parseInt(sid,10) : null,
            account_id:  resolvedAid,
            amount: amt ? parseFloat(amt.replace(/,/g, '')) : 0,
            weight: w ? parseFloat(w.replace(/,/g, '')) : 0,
            karat: kar || null,
            note: nt || ''
          });
        }
      });
      if (needKaratEl){ showToast('error', tRV('selectPartyForAll')); setTimeout(()=> needKaratEl.focus(),0); return; }
      if (invalidEl){ showToast('error', invalidMsg || tRV('toastError')); setTimeout(()=> invalidEl.focus(),0); return; }
      if (!lines.length){ showToast('error', tRV('addAtLeastOneLine')); return; }

      let res;
      if (isEditingExisting && window.receipt?.update){
        res = await window.receipt.update({ ...header, lines, id: curId, branch_local_number: displayId || null });
      } else {
        res = await window.receipt.add({ ...header, lines, branch_local_number: displayId || null });
      }
      if (res && res.success){
        const savedId = res.id || curId;
        currentReceiptId = savedId || null;
        if (savedId){ const idEl = document.getElementById('r_id'); if (idEl) idEl.value = res.branch_local_number || displayId || idEl.value || ''; }
        if (!isEditingExisting && savedId) {
          try {
            window.parent?.postMessage({
              type: 'daily-ops-notification',
              entityType: 'receipt',
              documentId: Number(savedId),
              userName: getCurrentUserDisplayName(),
            }, '*');
          } catch (_) {}
        }
        if (savedId) {
          await r_loadById(savedId);
          screenMode = 'view';
          editUnlockedForId = null;
          setReadOnly(true);
        }
        showToast('success', isEditingExisting ? tRV('voucherUpdated') : tRV('voucherSaved'));
      } else {
        if (res && res.branchReadOnly && window.handleBranchReadOnlyResponse) {
          window.handleBranchReadOnlyResponse(res);
        } else if (res && res.debtLimitExceeded && window.handleDebtLimitResponse) {
          window.handleDebtLimitResponse(res);
        } else if (res && res.inactiveEntity && window.handleInactiveEntityResponse) {
          window.handleInactiveEntityResponse(res);
        } else {
          showToast('error', res && res.error ? res.error : tRV('saveFailed'));
        }
      }
    } catch(e) {
      showToast('error', tRV('saveFailed'));
    } finally {
      receiptSaveInFlight = false;
      if (btnSaveTop) btnSaveTop.disabled = (screenMode === 'view');
    }
  }

  // events
  if (btnAddLine) btnAddLine.addEventListener('click', ()=> r_addLine());
  
  // Copy memo to all non-empty lines in receipt
  if (btnCopyMemo && memoField) {
    btnCopyMemo.addEventListener('click', () => {
      const memoText = memoField.value.trim();
      if (!memoText) {
        showToast('error', tRV('enterDate'));
        return;
      }
      
      let copiedCount = 0;
      const tbody = linesTable?.querySelector('tbody');
      if (tbody) {
        tbody.querySelectorAll('tr').forEach(row => {
          const customerId = row.querySelector('input[name="r_customer_id"]')?.value;
          const supplierId = row.querySelector('input[name="r_supplier_id"]')?.value;
          const accountId = row.querySelector('input[name="r_account_id"]')?.value;
          
          if (customerId || supplierId || accountId) {
            const noteInput = row.querySelector('input[name="r_note"]');
            if (noteInput) {
              noteInput.value = memoText;
              copiedCount++;
            }
          }
        });
      }
      
      if (copiedCount > 0) {
        showToast('success', `تم نسخ البيان إلى ${copiedCount} ${copiedCount === 1 ? 'سطر' : 'سطور'}`);
      } else {
        showToast('error', 'لا توجد سطور غير فارغة لنسخ البيان إليها');
      }
    });
  }
  
  if (btnNew) btnNew.addEventListener('click', r_new);
  if (btnEditTop) {
    btnEditTop.addEventListener('click', async () => {
      const curId = getReceiptInternalId();
      if (!curId) {
        if (typeof showToast === 'function') {
          showToast('error', tRV('noVoucherToEdit'));
        }
        return;
      }
      if (screenMode !== 'view') {
        return;
      }
      if (window.ScreenPermissions && !window.ScreenPermissions.check('receipts_edit', 'تعديل سند قبض')) {
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
      editUnlockedForId = curId;
      setReadOnly(false);
    });
  }
  if (btnSaveTop) btnSaveTop.addEventListener('click', r_save);
  
  // Close button - navigate back to dashboard (respect unsaved changes)
  if (btnClose) {
    btnClose.addEventListener('click', async () => {
      if (typeof window.canLeaveReceiptVoucher === 'function') {
        const canLeave = await window.canLeaveReceiptVoucher();
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
  
  // Journal View Button
  if (btnJournalView) {
    btnJournalView.addEventListener('click', () => {
      const id = getReceiptInternalId();
      const displayId = getReceiptDisplayNumber() || id;
      if (!id) {
        showToast('error', 'يجب حفظ السند أولاً');
        return;
      }
      if (typeof showAutoJournalModal === 'function') {
        showAutoJournalModal('receipt', id, `صورة الحركة - سند قبض رقم ${displayId}`);
      } else {
        showToast('error', 'مكون صورة الحركة غير متوفر');
      }
    });
  }
  
  if (btnPrintTop) btnPrintTop.addEventListener('click', async ()=>{
    // Check print permission
    if (window.ScreenPermissions && !window.ScreenPermissions.check('receipts_print', 'طباعة سند قبض')) {
      return;
    }
    
    // Always prefer API to build printable data (header + lines)
    const rid = getReceiptInternalId();
    const displayId = getReceiptDisplayNumber() || rid;
    if (!rid) {
      showToast('error', tRV('saveFirst'));
      return;
    }
    let header = {};
    let rows = [];
    let loadedFromApi = false;
    if (window.receipt?.get && rid){
      try{
        await waitForReceipt(3000);
        const resp = await window.receipt.get(rid);
        const data = resp?.data || {};
        header = data.header || {};
        rows = Array.isArray(data.lines) ? data.lines.map(L=>({
          customer_id: L.customer_id ?? '',
          supplier_id: L.supplier_id ?? '',
          account_id:  L.account_id  ?? '',
          account_no:  L.account_no  ?? '',
          amount: L.amount ?? '',
          weight: L.weight ?? '',
          karat:  L.karat  ?? '',
          note:   L.note   ?? ''
        })) : [];
        loadedFromApi = rows.length > 0;
      }catch(_){ header={}; rows=[]; loadedFromApi = false; }
    }
    // Fallback to DOM only if API failed
    if (!rows.length){
      const tb = linesTable?.querySelector('tbody');
      if (tb){
        tb.querySelectorAll('tr').forEach((tr)=>{
          const get = sel => tr.querySelector(sel)?.value || '';
          const rec = {
            customer_id: get('input[name="r_customer_id"]'),
            supplier_id: get('input[name="r_supplier_id"]'),
            account_id:  get('input[name="r_account_id"]'),
            amount: get('input[name="r_amount"]'),
            weight: get('input[name="r_weight"]'),
            karat:  get('input[name="r_karat"]'),
            note:   get('input[name="r_note"]')
          };
          if (rec.customer_id || rec.supplier_id || rec.account_id || rec.amount || rec.weight || rec.karat || rec.note){ rows.push(rec); }
        });
      }
    }
    const id = header.branch_local_number ?? displayId ?? '';
    const date = header.date || (header.created_at ? String(header.created_at).slice(0,10) : (document.getElementById('r_date')?.value || ''));
    const memo = header.memo || header.note || (document.getElementById('r_memo')?.value || '');
    const cashId = header.cash_account_id ?? (document.getElementById('r_cash_acc_id')?.value || '');
    const goldId = header.gold_account_id ?? (document.getElementById('r_gold_acc_id')?.value || '');
    const first = rows[0] || {};
    const accountList = Array.isArray(accountsCache) ? accountsCache : [];
    const getReceiptPayeeNo = (line) => {
      if (line.customer_id != null && String(line.customer_id).trim()) return String(line.customer_id).trim();
      if (line.supplier_id != null && String(line.supplier_id).trim()) return String(line.supplier_id).trim();
      const accountNo = line.account_no != null ? String(line.account_no).trim() : '';
      if (accountNo) return accountNo;
      const accountId = line.account_id != null ? String(line.account_id).trim() : '';
      if (!accountId) return '';
      if (!loadedFromApi) return accountId;
      const account = accountList.find(x => Number(x.id) === Number(line.account_id));
      if (account && account.code != null && String(account.code).trim()) return String(account.code).trim();
      return accountId;
    };
    const getReceiptPayeeName = (line) => {
      if (line.customer_id) {
        const c = customersCache.find(x => Number(x.id) === Number(line.customer_id));
        return c?.name || c?.full_name || c?.company || '';
      }
      if (line.supplier_id) {
        const s = suppliersCache.find(x => Number(x.id) === Number(line.supplier_id));
        return s?.name || s?.full_name || s?.company || '';
      }
      const accountNo = line.account_no != null ? String(line.account_no).trim() : '';
      let account = null;
      if (loadedFromApi && line.account_id != null && String(line.account_id).trim()) {
        account = accountList.find(x => Number(x.id) === Number(line.account_id));
      }
      if (!account && accountNo) {
        account = accountList.find(x => String(x.code) === accountNo);
      }
      if (!account && !loadedFromApi && line.account_id != null && String(line.account_id).trim()) {
        const accountRef = String(line.account_id).trim();
        account = accountList.find(x => String(x.code) === accountRef) || accountList.find(x => Number(x.id) === Number(accountRef));
      }
      return account?.name || '';
    };
    const payeeNo = getReceiptPayeeNo(first);
    const payeeName = getReceiptPayeeName(first) || payeeNo || '';
    const nf2 = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const rowsHtml = rows.map((L,i)=>{
      const wt = Number(L.weight||0) || 0;
      return `<tr>
      <td>${i+1}</td>
      <td>${nf2.format(Number(L.amount||0) || 0)}</td>
      <td>${nf2.format(wt)}</td>
      <td>${wt > 0 ? (L.karat||'-') : '-'}</td>
      <td>${L.note||''}</td>
    </tr>`;
    }).join('');
    // Totals (match statement style)
    const sumCash = (rows||[]).reduce((a,L)=> a + (Number(L.amount||0) || 0), 0);
    const goldByKarat = { '18':0, '21':0, '22':0, '24':0 };
    for (const L of (rows||[])){
      const w = Number(L.weight||0) || 0;
      const k = parseInt(String(L.karat||'').replace(/[^0-9]/g,''),10) || 0;
      if (w>0 && k){ if (goldByKarat[String(k)]!=null) goldByKarat[String(k)] += w; }
    }
    const totalGoldAs21 = Object.entries(goldByKarat).reduce((s,[k,w])=>{
      const kk = Number(k)||0; return s + (w * kk / 21);
    },0);
    // Company info
    let company = {};
    try{ if (window.api && window.api.getCompanyInfo){ const r = await window.api.getCompanyInfo(); if (r && r.success) company = r.company || {}; } }catch(_){ }
    
    // Build company header for print
    function buildCompanyHeaderForPrint(company, showDateTime = true) {
      const logoUrl = (company && company.logoData) ? company.logoData : (company && company.logo ? ('file:///' + String(company.logo).replace(/\\/g,'/')) : '');
      const name = company?.name || '';
      const nameEn = company?.name_en || company?.name || '';
      const tax = company?.tax || '';
      const phone = company?.phone || '';
      const email = company?.email || '';
      const website = company?.website || '';
      const address = company?.address || '';
      const addressEn = company?.address_en || company?.address || '';
      
      let dateTimeAr = '';
      let dateTimeEn = '';
      if (showDateTime) {
        const now = new Date();
        dateTimeAr = now.toLocaleString('ar-EG', { hour12: false });
        dateTimeEn = now.toLocaleString('en-GB', { hour12: false });
      }
      
      return `
        <section class="company-header" style="display:flex;gap:16px;align-items:stretch;margin-bottom:24px;padding:16px;background:linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);border:3px solid #10b981;border-radius:12px;box-shadow:0 4px 12px rgba(16,185,129,0.15)">
          <div class="comp-col-ar" style="flex:1;border:2px solid #10b981;padding:14px;background:#fff;border-radius:8px;direction:rtl;text-align:right">
            <div class="line" style="margin:6px 0;font-size:15px;font-weight:600;color:#1e293b;display:flex;align-items:center;gap:8px">
              <i class="fa-solid fa-building" style="color:#10b981;font-size:14px"></i>
              <strong style="color:#10b981;min-width:90px">اسم الشركة:</strong> 
              <span>${name}</span>
            </div>
            <div class="line" style="margin:6px 0;font-size:14px;color:#475569;display:flex;align-items:center;gap:8px">
              <i class="fa-solid fa-receipt" style="color:#10b981;font-size:13px"></i>
              <strong style="color:#10b981;min-width:90px">الرقم الضريبي:</strong> 
              <span>${tax}</span>
            </div>
            <div class="line" style="margin:6px 0;font-size:14px;color:#475569;display:flex;align-items:center;gap:8px">
              <i class="fa-solid fa-phone" style="color:#10b981;font-size:13px"></i>
              <strong style="color:#10b981;min-width:90px">الهاتف:</strong> 
              <span>${phone}</span>
            </div>
            ${email ? `<div class="line" style="margin:6px 0;font-size:14px;color:#475569;display:flex;align-items:center;gap:8px">
              <i class="fa-solid fa-envelope" style="color:#10b981;font-size:13px"></i>
              <strong style="color:#10b981;min-width:90px">البريد:</strong> 
              <span>${email}</span>
            </div>` : ''}
            ${website ? `<div class="line" style="margin:6px 0;font-size:14px;color:#475569;display:flex;align-items:center;gap:8px">
              <i class="fa-solid fa-globe" style="color:#10b981;font-size:13px"></i>
              <strong style="color:#10b981;min-width:90px">الموقع:</strong> 
              <span>${website}</span>
            </div>` : ''}
            <div class="line" style="margin:6px 0;font-size:14px;color:#475569;display:flex;align-items:center;gap:8px">
              <i class="fa-solid fa-location-dot" style="color:#10b981;font-size:13px"></i>
              <strong style="color:#10b981;min-width:90px">العنوان:</strong> 
              <span>${address}</span>
            </div>
            ${showDateTime ? `<div class="line" style="margin:6px 0;font-size:14px;color:#475569;display:flex;align-items:center;gap:8px">
              <i class="fa-solid fa-clock" style="color:#10b981;font-size:13px"></i>
              <strong style="color:#10b981;min-width:90px">التاريخ والوقت:</strong> 
              <span>${dateTimeAr}</span>
            </div>` : ''}
          </div>
          <div class="comp-logo" style="width:130px;height:130px;border:3px solid #10b981;border-radius:10px;overflow:hidden;display:flex;align-items:center;justify-content:center;background:#fff;flex-shrink:0;box-shadow:0 4px 8px rgba(16,185,129,0.2)">
            ${logoUrl ? `<img src="${logoUrl}" alt="logo" style="width:100%;height:100%;object-fit:contain">` : '<div class="logo-fallback" style="width:100%;height:100%;background:linear-gradient(135deg, #f0f0f0, #e5e5e5);display:flex;align-items:center;justify-content:center;color:#999;font-size:14px">الشعار</div>'}
          </div>
          <div class="comp-col-en" style="flex:1;direction:ltr;text-align:left;border:2px solid #10b981;padding:14px;background:#fff;border-radius:8px">
            <div class="line" style="margin:6px 0;font-size:15px;font-weight:600;color:#1e293b;display:flex;align-items:center;gap:8px">
              <i class="fa-solid fa-building" style="color:#10b981;font-size:14px"></i>
              <strong style="color:#10b981;min-width:120px">Company Name:</strong> 
              <span>${nameEn}</span>
            </div>
            <div class="line" style="margin:6px 0;font-size:14px;color:#475569;display:flex;align-items:center;gap:8px">
              <i class="fa-solid fa-receipt" style="color:#10b981;font-size:13px"></i>
              <strong style="color:#10b981;min-width:120px">Tax Number:</strong> 
              <span>${tax}</span>
            </div>
            <div class="line" style="margin:6px 0;font-size:14px;color:#475569;display:flex;align-items:center;gap:8px">
              <i class="fa-solid fa-phone" style="color:#10b981;font-size:13px"></i>
              <strong style="color:#10b981;min-width:120px">Phone:</strong> 
              <span>${phone}</span>
            </div>
            ${email ? `<div class="line" style="margin:6px 0;font-size:14px;color:#475569;display:flex;align-items:center;gap:8px">
              <i class="fa-solid fa-envelope" style="color:#10b981;font-size:13px"></i>
              <strong style="color:#10b981;min-width:120px">Email:</strong> 
              <span>${email}</span>
            </div>` : ''}
            ${website ? `<div class="line" style="margin:6px 0;font-size:14px;color:#475569;display:flex;align-items:center;gap:8px">
              <i class="fa-solid fa-globe" style="color:#10b981;font-size:13px"></i>
              <strong style="color:#10b981;min-width:120px">Website:</strong> 
              <span>${website}</span>
            </div>` : ''}
            <div class="line" style="margin:6px 0;font-size:14px;color:#475569;display:flex;align-items:center;gap:8px">
              <i class="fa-solid fa-location-dot" style="color:#10b981;font-size:13px"></i>
              <strong style="color:#10b981;min-width:120px">Address:</strong> 
              <span>${addressEn}</span>
            </div>
            ${showDateTime ? `<div class="line" style="margin:6px 0;font-size:14px;color:#475569;display:flex;align-items:center;gap:8px">
              <i class="fa-solid fa-clock" style="color:#10b981;font-size:13px"></i>
              <strong style="color:#10b981;min-width:120px">Date & Time:</strong> 
              <span>${dateTimeEn}</span>
            </div>` : ''}
          </div>
        </section>
      `;
    }
    
    const companyHeaderHTML = buildCompanyHeaderForPrint(company, true);
    const logoUrl = (company && company.logoData) ? company.logoData : (company && company.logo ? ('file:///' + String(company.logo).replace(/\\/g,'/')) : '');
    const taxNo = company?.tax || '';
    const tel = company?.tel || '';
    const nameAr = company.name_ar || company.name || 'اسم الشركة';
    const nameEn = company.name_en || company.name || 'Company Name';
    const addressAr = company.address || '';
    const addressEn = company.address_en || company.address || '';
    const phone = company.phone || '';
    const email = company.email || '';
    // Attempt to derive payee address/phone/tax from caches
    let payeeAddr = '', payeePhone = '', payeeTax = '';
    if (first.customer_id){ const c = customersCache.find(x=> Number(x.id)===Number(first.customer_id)); payeeAddr = c?.region || c?.address || ''; payeePhone = c?.phone || c?.mobile || ''; payeeTax = c?.tax_no || c?.tax || ''; }
    else if (first.supplier_id){ const s = suppliersCache.find(x=> Number(x.id)===Number(first.supplier_id)); payeeAddr = s?.region || s?.address || ''; payeePhone = s?.phone || s?.mobile || ''; payeeTax = s?.tax_no || s?.tax || ''; }

    const isRtl = getRVLang() === 'ar';
    const branchScopeChipRV = (() => {
      try {
        const scope = window.currentBranchScopeContext || null;
        const branch = window.currentBranchContext || null;
        const label = isRtl ? 'نطاق الفرع:' : 'Branch Scope:';
        if (scope && String(scope.mode || '').toLowerCase() === 'all') {
          return { label, value: isRtl ? 'كل الفروع' : 'All Branches' };
        }
        const code = String(branch?.code || '').trim();
        const name = String((isRtl ? (branch?.name || branch?.name_en) : (branch?.name_en || branch?.name)) || '').trim();
        const value = code && name ? `${code} - ${name}` : (name || code || (isRtl ? 'غير محدد' : 'Not selected'));
        return { label, value };
      } catch (_) {
        return { label: isRtl ? 'نطاق الفرع:' : 'Branch Scope:', value: '' };
      }
    })();
    const docHtml = `<!doctype html><html lang="${isRtl ? 'ar' : 'en'}" dir="${isRtl ? 'rtl' : 'ltr'}" data-skip-branch-scope-badge="1"><head><meta charset="utf-8"><title>${tRV('printReceiptNo')} ${id}</title>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet">
      <style>
        @page { size: A4; margin: 10mm; }
        @media print and (orientation: landscape) { @page { size: A4 landscape; margin: 10mm; } }
        * { margin: 0; padding: 0; box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; }
        body { font-family: 'Cairo', sans-serif; background: #fff; color: #333; font-size: 12px; padding: 15px; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        .container { max-width: 100%; border: 2px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
        .header { padding: 10px 20px; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%) !important; border-bottom: 2px solid #f59e0b; -webkit-print-color-adjust: exact !important; }
        .header-top { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 16px; direction:ltr; }
        .company-info { flex: 1; }
        .company-info.left { text-align: left; direction: ltr; }
        .company-info.right { text-align: right; direction: rtl; }
        .company-name { font-size: 18px; font-weight: 700; color: #1f2937; margin-bottom: 6px; }
        .info-item { display:flex; align-items:center; gap:6px; margin:4px 0; font-size:11px; color:#374151; }
        .info-item i { color:#f59e0b; font-size:11px; }
        .company-details { font-size: 11px; color: #374151; line-height: 1.4; }
        .logo { width: 110px; height: 110px; border: 3px solid #f59e0b; border-radius: 50%; overflow: hidden; background: #fff; display: flex; align-items: center; justify-content: center; margin: 0 auto; }
        .logo img { max-width: 92%; max-height: 92%; object-fit: contain; }
        .receipt-title {
          position: relative;
          background: #374151 !important;
          color: #fff;
          text-align: center;
          padding: 10px 20px;
          font-size: 18px;
          font-weight: 700;
          -webkit-print-color-adjust: exact !important;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          margin: 8px 12px 10px;
        }
        .receipt-title-text { z-index: 1; }
        .receipt-date-chip {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
        }
        .receipt-branch-chip {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
        }
        .receipt-date-chip, .receipt-branch-chip {
          padding: 4px 12px;
          border-radius: 999px;
          background: linear-gradient(135deg, #fef3c7, #fde68a);
          color: #374151;
          font-size: 11px;
          font-weight: 600;
          border: 1px solid rgba(249, 250, 251, 0.7);
          box-shadow: 0 2px 6px rgba(0,0,0,0.25);
          -webkit-print-color-adjust: exact !important;
          white-space: nowrap;
        }
        .info-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-bottom: 1px solid #e5e7eb;
          background: #fff;
          gap: 6px;
          padding: 8px 12px 10px;
        }
        .info-grid .info-item {
          display: flex;
          align-items: center;
          padding: 6px 12px;
          border-radius: 999px;
          border: 1px solid #e5e7eb;
          background: #f9fafb;
          box-shadow: 0 1px 2px rgba(0,0,0,0.04);
        }
        .info-grid .info-item:nth-child(odd) { border-left: none; }
        .info-grid .info-item i { margin-inline-end: 6px; font-size: 11px; color: #f59e0b; }
        .info-label { color: #666; font-size: 11px; min-width: 100px; }
        .info-value { font-weight: 600; color: #333; flex: 1; }
        .table-wrapper {
          border-radius: 12px;
          overflow: hidden;
          margin: 8px 12px 10px;
          border: 2px solid #f59e0b;
        }
        .details-table {
          width: 100%;
          border-collapse: collapse;
        }
        .details-table th {
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%) !important;
          color: #1f2937;
          padding: 10px 8px;
          font-size: 12px;
          font-weight: 600;
          text-align: center;
          border: 1px solid #f59e0b;
          -webkit-print-color-adjust: exact !important;
        }
        .details-table td {
          padding: 10px 8px;
          text-align: center;
          border: 1px solid #e5e7eb;
          font-size: 11px;
          background: #fff;
        }
        .details-table tbody tr:nth-child(even) td { background: #fefefe; }
        .totals {
          background: linear-gradient(135deg, #1e3a5f 0%, #2d4a6f 100%) !important;
          padding: 12px;
          -webkit-print-color-adjust: exact !important;
          border-radius: 12px;
          margin: 8px 12px 0;
        }
        .totals-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; }
        .total-box { background: transparent; border: 1px solid #3d5a7f; border-radius: 6px; padding: 10px; text-align: center; }
        .total-box .lbl { font-size: 9px; color: #93c5fd; margin-bottom: 4px; }
        .total-box .val { font-size: 13px; font-weight: 700; color: #fff; }
        .signatures { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; padding: 15px; background: #f9fafb !important; border-top: 1px solid #e5e7eb; -webkit-print-color-adjust: exact !important; }
        .sig-box { text-align: center; padding: 10px; }
        .sig-line { height: 40px; border-bottom: 1px solid #333; margin-bottom: 6px; }
        .sig-title { font-size: 10px; color: #666; }
        .print-btn { position: fixed; bottom: 20px; left: 20px; background: #374151; color: #fff; border: none; padding: 12px 25px; border-radius: 25px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit; }
        @media print { .no-print { display: none !important; } body { padding: 0; } .container { border: none; } }
      </style>
    </head><body>
      <div class="container">
        <div class="header">
          <div class="header-top">
            <div class="company-info left">
              <div class="company-name">${nameEn}</div>
              <div class="info-item"><i class="fa-solid fa-location-dot"></i><span class="company-details">${addressEn ? 'Address: '+addressEn : ''}</span></div>
              <div class="info-item"><i class="fa-solid fa-phone"></i><span class="company-details">${phone ? 'Phone: '+phone : ''}</span></div>
              <div class="info-item"><i class="fa-solid fa-envelope"></i><span class="company-details">${email ? 'Email: '+email : ''}</span></div>
              <div class="info-item"><i class="fa-solid fa-file-invoice"></i><span class="company-details">${taxNo ? 'VAT: '+taxNo : ''}</span></div>
            </div>
            <div class="logo">${logoUrl ? '<img src="'+logoUrl+'" alt="Logo">' : ''}</div>
            <div class="company-info right">
              <div class="company-name">${nameAr}</div>
              <div class="info-item"><i class="fa-solid fa-location-dot"></i><span class="company-details">${addressAr ? 'العنوان: '+addressAr : ''}</span></div>
              <div class="info-item"><i class="fa-solid fa-phone"></i><span class="company-details">${phone ? 'الهاتف: '+phone : ''}</span></div>
              <div class="info-item"><i class="fa-solid fa-envelope"></i><span class="company-details">${email ? 'البريد: '+email : ''}</span></div>
              <div class="info-item"><i class="fa-solid fa-file-invoice"></i><span class="company-details">${taxNo ? 'الرقم الضريبي: '+taxNo : ''}</span></div>
            </div>
          </div>
          <div class="receipt-title">
            <div class="receipt-date-chip">${tRV('printDate')} ${date}</div>
            ${branchScopeChipRV.value ? `<div class="receipt-branch-chip">${branchScopeChipRV.label} ${branchScopeChipRV.value}</div>` : ''}
            <span class="receipt-title-text">${tRV('printReceiptNo')} ${id}</span>
          </div>
        </div>
        <div class="info-grid">
          <div class="info-item" style="grid-column: 1 / 2;">
            <i class="fa-solid fa-hashtag"></i>
            <span class="info-label">${tRV('printAccountNo')}</span>
            <span class="info-value">${payeeNo}</span>
          </div>
          <div class="info-item" style="grid-column: 2 / 4;">
            <i class="fa-solid fa-user"></i>
            <span class="info-label">${tRV('printReceivedFrom')}</span>
            <span class="info-value">${payeeName}</span>
          </div>
          <div class="info-item" style="grid-column: 4 / 5;">
            <i class="fa-solid fa-phone"></i>
            <span class="info-label">${tRV('printPhone')}</span>
            <span class="info-value">${payeePhone}</span>
          </div>
          <div class="info-item" style="grid-column: 1 / 3;">
            <i class="fa-solid fa-location-dot"></i>
            <span class="info-label">${tRV('printAddress')}</span>
            <span class="info-value">${payeeAddr}</span>
          </div>
          <div class="info-item" style="grid-column: 3 / 5;">
            <i class="fa-solid fa-align-right"></i>
            <span class="info-label">${tRV('printDescription')}</span>
            <span class="info-value">${memo}</span>
          </div>
        </div>
        <div class="table-wrapper">
          <table class="details-table">
            <thead><tr><th style="width:36px">#</th><th style="width:100px">${tRV('printAmount')}</th><th style="width:80px">${tRV('printWeight')}</th><th style="width:50px">${tRV('printKarat')}</th><th style="width:40%">${tRV('printDescription')}</th></tr></thead>
            <tbody>${rowsHtml}</tbody>
          </table>
        </div>
        <div class="totals">
          <div class="totals-grid">
            <div class="total-box"><div class="lbl">${tRV('printTotalCash')}</div><div class="val">${nf2.format(sumCash)}</div></div>
            <div class="total-box"><div class="lbl">${tRV('printConverted21')}</div><div class="val">${nf2.format(totalGoldAs21)}</div></div>
            <div class="total-box"><div class="lbl">${tRV('printKarat24')}</div><div class="val">${nf2.format(goldByKarat['24'])}</div></div>
            <div class="total-box"><div class="lbl">${tRV('printKarat22')}</div><div class="val">${nf2.format(goldByKarat['22'])}</div></div>
            <div class="total-box"><div class="lbl">${tRV('printKarat21')}</div><div class="val">${nf2.format(goldByKarat['21'])}</div></div>
            <div class="total-box"><div class="lbl">${tRV('printKarat18')}</div><div class="val">${nf2.format(goldByKarat['18'])}</div></div>
          </div>
          <div style="margin-top:10px; padding:8px 15px; background:rgba(255,255,255,0.1); border-radius:6px; font-size:11px; color:#e2e8f0;">
            ${sumCash > 0 ? `<div style="margin-bottom:4px;"><strong>${tRV('printCashWords')}</strong> ${toWordsCash(sumCash)}</div>` : ''}
            ${totalGoldAs21 > 0 ? `<div><strong>${tRV('printGoldWords')}</strong> ${toWordsGold(totalGoldAs21)}</div>` : ''}
          </div>
        </div>
        <div class="signatures">
          <div class="sig-box"><div class="sig-line"></div><div class="sig-title">${tRV('printCashierSig')}</div></div>
          <div class="sig-box"><div class="sig-line"></div><div class="sig-title">${tRV('printAuditorSig')}</div></div>
          <div class="sig-box"><div class="sig-line"></div><div class="sig-title">${tRV('printDeliverySig')}</div></div>
        </div>
      </div>
      <button class="print-btn no-print" onclick="window.print()">🖨️ ${tRV('printBtn')}</button>
    </body></html>`;
    if (window.openPreview) window.openPreview(docHtml); else {
      const w = window.open('', '_blank', 'noopener'); if (!w) return; w.document.open(); w.document.write(docHtml); w.document.close(); w.focus();
    }
  });
  
  // WhatsApp - Send Receipt directly (same as sales invoice)
  if (btnWhatsApp) {
    btnWhatsApp.addEventListener('click', async () => {
      const receiptInternalId = getReceiptInternalId();
      const rid = getReceiptDisplayNumber() || receiptInternalId;
      const displayId = rid;
      if (!receiptInternalId) {
        if (typeof showToast === 'function') showToast('error', tRV('saveFirst'));
        return;
      }
      
      try {
        // Get receipt data
        let header = {};
        let rows = [];
        if (window.receipt?.get && receiptInternalId) {
          await waitForReceipt(3000);
          const resp = await window.receipt.get(receiptInternalId);
          const data = resp?.data || {};
          header = data.header || {};
          rows = Array.isArray(data.lines) ? data.lines : [];
        }
        
        const first = rows[0] || {};
        let phone = null;
        let contactName = '';
        
        // Try customer first
        if (first.customer_id) {
          const c = customersCache.find(x => Number(x.id) === Number(first.customer_id));
          if (c && c.phone) { phone = c.phone; contactName = c.name || ''; }
        }
        // Try supplier
        if (!phone && first.supplier_id) {
          const s = suppliersCache.find(x => Number(x.id) === Number(first.supplier_id));
          if (s && s.phone) { phone = s.phone; contactName = s.name || ''; }
        }
        
        if (!phone) {
          if (typeof showToast === 'function') showToast('error', tRV('phoneNotFound'));
          return;
        }
        
        // Clean phone number
        let phoneNumber = phone.trim().replace(/^\+/, '').replace(/^00/, '').replace(/[^0-9]/g, '');
        if (phoneNumber.startsWith('05')) phoneNumber = '966' + phoneNumber.substring(1);
        if (!phoneNumber || phoneNumber.length < 9) {
          if (typeof showToast === 'function') showToast('error', tRV('phoneInvalid'));
          return;
        }
        
        // Calculate totals
        const nf2 = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        const sumCash = rows.reduce((s, L) => s + (Number(L.amount) || 0), 0);
        const goldByKarat = { '18': 0, '21': 0, '22': 0, '24': 0 };
        for (const L of rows) {
          const k = String(L.karat || '');
          if (goldByKarat.hasOwnProperty(k)) goldByKarat[k] += Number(L.weight || 0) || 0;
        }
        const totalGoldAs21 = rows.reduce((s, L) => {
          const w = Number(L.weight || 0) || 0;
          const k = Number(L.karat || 0) || 0;
          return (!w || !k) ? s : s + (w * k / 21);
        }, 0);
        
        const receiptDate = header.date || document.getElementById('r_date')?.value || '';
        const receiptNumber = header.branch_local_number || displayId || receiptInternalId;
        
        // Build gold details string
        let goldDetails = '';
        if (goldByKarat['24'] > 0) goldDetails += '   • عيار 24: ' + nf2.format(goldByKarat['24']) + ' غ\n';
        if (goldByKarat['22'] > 0) goldDetails += '   • عيار 22: ' + nf2.format(goldByKarat['22']) + ' غ\n';
        if (goldByKarat['21'] > 0) goldDetails += '   • عيار 21: ' + nf2.format(goldByKarat['21']) + ' غ\n';
        if (goldByKarat['18'] > 0) goldDetails += '   • عيار 18: ' + nf2.format(goldByKarat['18']) + ' غ\n';
        
        // Build message
        const message = '📄 سند قبض رقم: ' + receiptNumber + '\n\nعزيزي: ' + contactName + '\n\n📅 التاريخ: ' + receiptDate + '\n\n💵 إجمالي المبلغ: ' + nf2.format(sumCash) + ' ريال\n' + (goldDetails ? '⚖️ تفصيل الذهب:\n' + goldDetails : '') + '\nشكراً لتعاملكم معنا 🙏';
        
        // Get company info
        let company = {};
        try { if (window.api?.getCompanyInfo) { const r = await window.api.getCompanyInfo(); if (r?.success) company = r.company || {}; } } catch(_) {}
        const logoUrl = (company?.logoData) || (company?.logo ? ('file:///' + String(company.logo).replace(/\\/g,'/')) : '');
        const nameAr = company.name || 'اسم الشركة';
        const nameEn = company.name_en || company.name || 'Company Name';
        const addressAr = company.address || '';
        const addressEn = company.address_en || company.address || '';
        const companyPhone = company.phone || '';
        const companyEmail = company.email || '';
        const taxNo = company.tax || '';
        const payeeNo = first.account_id || first.customer_id || first.supplier_id || '';
        const payeePhone = phone || '';
        const memo = header.memo || '';
        
        // Build rows HTML
        const rowsHtml = rows.map((L, i) => '<tr><td>' + (i + 1) + '</td><td>' + nf2.format(Number(L.amount || 0) || 0) + '</td><td>' + nf2.format(Number(L.weight || 0) || 0) + '</td><td>' + (L.karat || '-') + '</td><td>' + (L.note || '') + '</td></tr>').join('');
        
        // Build words section
        let wordsHtml = '';
        if (sumCash > 0) wordsHtml += '<div style="margin-bottom:3px;"><strong>النقد كتابة:</strong> ' + toArabicWordsCash(sumCash) + '</div>';
        if (totalGoldAs21 > 0) wordsHtml += '<div><strong>الذهب كتابة (عيار 21):</strong> ' + toArabicWordsGold(totalGoldAs21) + '</div>';
        
        // Build HTML for WhatsApp capture window
        const docHtml = '<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>سند قبض</title><script src="../../node_modules/html2canvas/dist/html2canvas.min.js"><\/script><link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet"><link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:"Cairo",sans-serif;background:#fff;padding:10px}.container{max-width:100%;border:2px solid #e5e7eb;border-radius:8px;overflow:hidden}.header{padding:10px 20px;background:linear-gradient(135deg,#fef3c7 0%,#fde68a 100%);border-bottom:2px solid #f59e0b}.header-top{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;direction:ltr}.company-info{flex:1}.company-info.left{text-align:left;direction:ltr}.company-info.right{text-align:right;direction:rtl}.company-name{font-size:14px;font-weight:700;color:#1f2937;margin-bottom:4px}.info-item{display:flex;align-items:center;gap:6px;margin:2px 0;font-size:9px;color:#374151}.info-item i{color:#f59e0b;font-size:9px}.company-details{font-size:9px;color:#374151}.logo{width:70px;height:70px;border:3px solid #f59e0b;border-radius:50%;overflow:hidden;background:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0}.logo img{max-width:90%;max-height:90%;object-fit:contain}.receipt-title{position:relative;background:#374151;color:#fff;text-align:center;padding:8px 20px;font-size:14px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:8px;margin:6px 10px 8px}.receipt-date-chip{position:absolute;left:15px;padding:2px 8px;border-radius:999px;background:linear-gradient(135deg,#fef3c7,#fde68a);color:#374151;font-size:9px;font-weight:600}.info-grid{display:grid;grid-template-columns:repeat(4,1fr);background:#fff;gap:4px;padding:6px 10px}.info-grid .info-item{display:flex;align-items:center;padding:4px 8px;border-radius:999px;border:1px solid #e5e7eb;background:#f9fafb}.info-grid .info-item i{margin-inline-end:4px;font-size:9px;color:#f59e0b}.info-label{color:#666;font-size:9px;min-width:60px}.info-value{font-weight:600;color:#333;flex:1;font-size:9px}.table-wrapper{border-radius:8px;overflow:hidden;margin:6px 10px;border:2px solid #f59e0b}.details-table{width:100%;border-collapse:collapse}.details-table th{background:linear-gradient(135deg,#fef3c7 0%,#fde68a 100%);color:#1f2937;padding:6px 4px;font-size:10px;font-weight:600;text-align:center;border:1px solid #f59e0b}.details-table td{padding:6px 4px;text-align:center;border:1px solid #e5e7eb;font-size:9px;background:#fff}.totals{background:linear-gradient(135deg,#1e3a5f 0%,#2d4a6f 100%);padding:8px;border-radius:8px;margin:6px 10px}.totals-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:4px}.total-box{background:transparent;border:1px solid #3d5a7f;border-radius:4px;padding:6px;text-align:center}.total-box .lbl{font-size:7px;color:#93c5fd;margin-bottom:2px}.total-box .val{font-size:10px;font-weight:700;color:#fff}.words-section{margin-top:8px;padding:6px 10px;background:rgba(255,255,255,0.1);border-radius:6px;font-size:9px;color:#e2e8f0}</style></head><body><div class="container" id="receiptContainer"><div class="header"><div class="header-top"><div class="company-info left"><div class="company-name">' + nameEn + '</div><div class="info-item"><i class="fa-solid fa-location-dot"></i><span class="company-details">' + (addressEn ? 'Address: ' + addressEn : '') + '</span></div><div class="info-item"><i class="fa-solid fa-phone"></i><span class="company-details">' + (companyPhone ? 'Phone: ' + companyPhone : '') + '</span></div><div class="info-item"><i class="fa-solid fa-envelope"></i><span class="company-details">' + (companyEmail ? 'Email: ' + companyEmail : '') + '</span></div><div class="info-item"><i class="fa-solid fa-file-invoice"></i><span class="company-details">' + (taxNo ? 'VAT: ' + taxNo : '') + '</span></div></div><div class="logo">' + (logoUrl ? '<img src="' + logoUrl + '" alt="Logo">' : '') + '</div><div class="company-info right"><div class="company-name">' + nameAr + '</div><div class="info-item"><i class="fa-solid fa-location-dot"></i><span class="company-details">' + (addressAr ? 'العنوان: ' + addressAr : '') + '</span></div><div class="info-item"><i class="fa-solid fa-phone"></i><span class="company-details">' + (companyPhone ? 'الهاتف: ' + companyPhone : '') + '</span></div><div class="info-item"><i class="fa-solid fa-envelope"></i><span class="company-details">' + (companyEmail ? 'البريد: ' + companyEmail : '') + '</span></div><div class="info-item"><i class="fa-solid fa-file-invoice"></i><span class="company-details">' + (taxNo ? 'الرقم الضريبي: ' + taxNo : '') + '</span></div></div></div><div class="receipt-title"><div class="receipt-date-chip">التاريخ: ' + receiptDate + '</div><span>سند قبض رقم: ' + receiptNumber + '</span></div></div><div class="info-grid"><div class="info-item" style="grid-column:1/2;"><i class="fa-solid fa-hashtag"></i><span class="info-label">رقم الحساب:</span><span class="info-value">' + payeeNo + '</span></div><div class="info-item" style="grid-column:2/4;"><i class="fa-solid fa-user"></i><span class="info-label">المستلم من:</span><span class="info-value">' + contactName + '</span></div><div class="info-item" style="grid-column:4/5;"><i class="fa-solid fa-phone"></i><span class="info-label">الهاتف:</span><span class="info-value">' + payeePhone + '</span></div><div class="info-item" style="grid-column:1/5;"><i class="fa-solid fa-align-right"></i><span class="info-label">البيان:</span><span class="info-value">' + memo + '</span></div></div><div class="table-wrapper"><table class="details-table"><thead><tr><th style="width:30px">#</th><th style="width:80px">المبلغ</th><th style="width:60px">الوزن</th><th style="width:40px">العيار</th><th>البيان</th></tr></thead><tbody>' + rowsHtml + '</tbody></table></div><div class="totals"><div class="totals-grid"><div class="total-box"><div class="lbl">إجمالي النقد</div><div class="val">' + nf2.format(sumCash) + '</div></div><div class="total-box"><div class="lbl">محول ٢١</div><div class="val">' + nf2.format(totalGoldAs21) + '</div></div><div class="total-box"><div class="lbl">عيار 24</div><div class="val">' + nf2.format(goldByKarat['24']) + '</div></div><div class="total-box"><div class="lbl">عيار 22</div><div class="val">' + nf2.format(goldByKarat['22']) + '</div></div><div class="total-box"><div class="lbl">عيار 21</div><div class="val">' + nf2.format(goldByKarat['21']) + '</div></div><div class="total-box"><div class="lbl">عيار 18</div><div class="val">' + nf2.format(goldByKarat['18']) + '</div></div></div>' + (wordsHtml ? '<div class="words-section">' + wordsHtml + '</div>' : '') + '</div></div><script>setTimeout(async()=>{try{const container=document.getElementById("receiptContainer");const canvas=await html2canvas(container,{backgroundColor:"#fff",scale:2,useCORS:true,logging:false});const blob=await new Promise(r=>canvas.toBlob(r,"image/png"));try{await navigator.clipboard.write([new ClipboardItem({"image/png":blob})])}catch(e){}const whatsappUrl="https://wa.me/' + phoneNumber + '?text=' + encodeURIComponent(message) + '";if(window.api?.openExternal)await window.api.openExternal(whatsappUrl);else if(window.opener?.api?.openExternal)await window.opener.api.openExternal(whatsappUrl);else window.open(whatsappUrl,"_blank");setTimeout(()=>window.close(),800)}catch(err){console.error(err);alert("خطأ في إرسال السند")}},600)<\/script></body></html>';
        
        // Open window, capture, send to WhatsApp, then close
        const w = window.open('', '_blank', 'width=700,height=600,scrollbars=yes');
        if (!w) {
          if (typeof showToast === 'function') showToast('error', tRV('printWindowFailed'));
          return;
        }
        w.document.open();
        w.document.write(docHtml.replace("سند قبض رقم: ' + rid + '", "سند قبض رقم: ' + receiptNumber + '"));
        w.document.close();
        
        if (typeof showToast === 'function') showToast('success', tRV('toastSuccess'));
        
      } catch (err) {
        if (typeof showToast === 'function') showToast('error', tRV('toastError'));
      }
    });
  }
  
  if (btnExportXls) btnExportXls.addEventListener('click', async ()=>{
    // Build rows from editor
    const rows = [];
    const tb = linesTable?.querySelector('tbody');
    if (tb){ tb.querySelectorAll('tr').forEach(tr=>{
      const get = sel => tr.querySelector(sel)?.value || '';
      const cid = get('input[name="r_customer_id"]');
      const sid = get('input[name="r_supplier_id"]');
      const aid = get('input[name="r_account_id"]');
      rows.push({
        id: (cid||sid||aid||''),
        name: getNameByIds(cid,sid,aid) || (cid||sid||aid||''),
        amount: get('input[name="r_amount"]'),
        weight: get('input[name="r_weight"]'),
        karat:  get('input[name="r_karat"]'),
        note:   get('input[name="r_note"]')
      });
    }); }
    const headers = ['#','الريال','الوزن القائم','العيار','البند','البيـــــــــان'];
    const nf2 = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const htmlRows = rows.map((r,i)=>`
      <tr>
        <td>${i+1}</td>
        <td>${nf2.format(Number(r.amount||0) || 0)}</td>
        <td>${nf2.format(Number(r.weight||0) || 0)}</td>
        <td>${r.karat||''}</td>
        <td>${r.id||''}</td>
        <td>${r.note||''}</td>
      </tr>
    `).join('');
    const xlsHtml = `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><style>table{border-collapse:collapse}th,td{border:1px solid #444;padding:6px;text-align:right;white-space:nowrap}thead th{background:#eaeaea}</style></head><body><table><thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${htmlRows}</tbody></table></body></html>`;
    const blob = new Blob(['\ufeff' + xlsHtml], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'receipt.xls'; document.body.appendChild(a); a.click(); setTimeout(()=>{URL.revokeObjectURL(url); a.remove();},0);
  });
  if (btnExportPdf) btnExportPdf.addEventListener('click', ()=>{ btnPrintTop?.click(); });
  if (linesTable){
    // Inline hint bubble like voucher
    let rHintEl = null;
    function ensureRHint(){
      if (!rHintEl){ rHintEl = document.createElement('div'); rHintEl.className='r-hint'; rHintEl.setAttribute('role','status'); rHintEl.textContent=''; document.body.appendChild(rHintEl); }
      return rHintEl;
    }
    function rShowHint(msg, target, isError=false){
      const el = ensureRHint(); el.textContent = msg || ''; el.classList.add('show'); if (isError) el.classList.add('error'); else el.classList.remove('error');
      const r = target.getBoundingClientRect(); const gap = 8;
      const top = Math.max(10, window.scrollY + r.top - el.offsetHeight - gap);
      const left = Math.min(window.scrollX + r.left, window.scrollX + window.innerWidth - 380);
      el.style.top = top + 'px'; el.style.left = left + 'px';
    }
    function rHideHint(){ if (rHintEl) rHintEl.classList.remove('show'); }

    linesTable.addEventListener('input', (e)=>{
      const inp = e.target; const tr = inp.closest('tr'); if (!tr) return;
      const nm = inp.getAttribute('name');
      if (['r_customer_id','r_supplier_id','r_account_id'].includes(nm)){
        const c = tr.querySelector('input[name="r_customer_id"]');
        const s = tr.querySelector('input[name="r_supplier_id"]');
        const a = tr.querySelector('input[name="r_account_id"]');
        if (nm==='r_customer_id' && c.value.trim()!==''){ s.value=''; a.value=''; }
        if (nm==='r_supplier_id' && s.value.trim()!==''){ c.value=''; a.value=''; }
        if (nm==='r_account_id'  && a.value.trim()!==''){ c.value=''; s.value=''; }
        r_syncName(tr);
      }
      if (nm==='r_karat'){
        let v = String(inp.value||'').replace(/[^0-9]/g,''); if (v.length>3) v=v.slice(0,3); inp.value=v;
      }
    });
    // Validate karat on blur
    linesTable.addEventListener('blur', (e)=>{
      const inp = e.target;
      if (inp.getAttribute('name') === 'r_karat') {
        const value = inp.value.trim();
        const allowedKarats = ['24', '22', '21', '18', '999', '925', '900', '800', ''];
        if (value && !allowedKarats.includes(value)) {
          showToast('error', `العيار ${value} غير مسموح. الذهب: 24، 22، 21، 18 | الفضة: 999، 925، 900، 800`);
          inp.value = '';
          inp.focus();
        }
      }
    }, true);
    // Back to other event handlers
    linesTable.addEventListener('input', (e)=>{
      const inp = e.target; const tr = inp.closest('tr'); if (!tr) return; const nm = inp.getAttribute('name');
      if (['r_customer_id','r_supplier_id','r_account_id'].includes(nm)){
        // Continue with existing logic
      }
      try{ r_checkSelfReference(); }catch(_){ }
    });
    // Focus hint for exclusivity
    linesTable.addEventListener('focusin', (e)=>{
      const inp = e.target; const name = inp.getAttribute('name'); if (!['r_customer_id','r_supplier_id','r_account_id'].includes(name)) return;
      rShowHint(tRV('exclusiveIdHint'), inp, false);
    });
    // Validate id exists on blur like voucher (يدعم الآن كود الحساب أو رقمه الداخلي)
    linesTable.addEventListener('blur', (e)=>{
      const inp = e.target; const tr = inp.closest('tr'); if (!tr || inp.tagName!=='INPUT') return;
      const nm = inp.getAttribute('name'); if (!['r_customer_id','r_supplier_id','r_account_id'].includes(nm)) return;
      const val = String(inp.value||'').trim(); if (!val){ rHideHint(); return; }
      let cid = null, sid = null, aidOk = null;
      if (nm === 'r_customer_id') {
        cid = parseInt(val, 10);
      } else if (nm === 'r_supplier_id') {
        sid = parseInt(val, 10);
      } else if (nm === 'r_account_id') {
        // المطابقة مع كود الحساب الظاهر فقط
        const acc = (accountsCache || []).find(x => String(x.code) === val);
        aidOk = !!acc;
      }
      let ok = false;
      if (cid != null && !isNaN(cid)) {
        ok = !!(customersCache || []).find(x => Number(x.id) === cid);
      } else if (sid != null && !isNaN(sid)) {
        ok = !!(suppliersCache || []).find(x => Number(x.id) === sid);
      } else if (nm === 'r_account_id') {
        ok = !!aidOk;
      }
      if (!ok){
        let msg = 'لا يوجد حساب بهذا الرقم. تأكد من رقم الحساب.'; if (cid!=null) msg='لا يوجد عميل بهذا الرقم. تأكد من رقم العميل.'; if (sid!=null) msg='لا يوجد مورد بهذا الرقم. تأكد من رقم المورد.';
        rShowHint(msg, inp, true);
        setTimeout(()=>{ inp.focus(); inp.select && inp.select(); }, 0);
        e.preventDefault && e.preventDefault(); e.stopPropagation && e.stopPropagation();
      } else { rHideHint(); }
    }, true);
    linesTable.addEventListener('focusout', ()=>{ rHideHint(); });

    // Enter-key navigation across inputs (like voucher)
    const FIELD_ORDER = ['r_customer_id','r_supplier_id','r_account_id','r_amount','r_weight','r_karat','r_note'];
    function focusNextInRow(tr, fromName){
      const idx = FIELD_ORDER.indexOf(fromName);
      if (idx === -1) return false;
      for (let i=idx+1;i<FIELD_ORDER.length;i++){
        const nxt = tr.querySelector(`input[name="${FIELD_ORDER[i]}"]`);
        if (nxt){ nxt.focus(); nxt.select && nxt.select(); return true; }
      }
      return false;
    }
    // Function to check if we should allow leaving account_id field
    function shouldAllowAccountIdNavigation(tr) {
      const customerId = String(tr.querySelector('input[name="r_customer_id"]')?.value||'').trim();
      const supplierId = String(tr.querySelector('input[name="r_supplier_id"]')?.value||'').trim();
      const accountId = String(tr.querySelector('input[name="r_account_id"]')?.value||'').trim();
      
      // If account_id has a value, allow navigation
      if (accountId) return true;
      
      // If either customer or supplier has a value, allow navigation
      if (customerId || supplierId) return true;
      
      // Otherwise, show error and prevent navigation
      showToast('error', 'يجب إدخال إما العميل أو المورد أو رقم الحساب');
      const customerField = tr.querySelector('input[name="r_customer_id"]');
      if (customerField) {
        customerField.focus();
        customerField.select();
      }
      return false;
    }

    linesTable.addEventListener('keydown', (e)=>{
      if (e.key !== 'Enter') return;
      const inp = e.target; if (!(inp && inp.tagName==='INPUT')) return;
      const tr = inp.closest('tr'); if (!tr) return;
      const nm = inp.getAttribute('name')||'';
      
      // Check if we're trying to leave account_id without required fields
      if (nm === 'r_account_id') {
        if (!shouldAllowAccountIdNavigation(tr)) {
          // Prevent all navigation attempts
          e.stopPropagation();
          e.preventDefault();
          const accountField = tr.querySelector('input[name="r_account_id"]');
          if (accountField) {
            accountField.focus();
            accountField.select();
          }
          return false;
        }
      }
      e.preventDefault();
      // Restrict navigation until one of ID fields is filled
      const ID_FIELDS = ['r_customer_id','r_supplier_id','r_account_id'];
      const hasAnyId = ID_FIELDS.some(n => {
        const val = String(tr.querySelector(`input[name="${n}"]`)?.value||'').trim();
        // Special handling for account_id - only count it if customer/supplier is filled or it has a value
        if (n === 'r_account_id') {
          const customerId = String(tr.querySelector('input[name="r_customer_id"]')?.value||'').trim();
          const supplierId = String(tr.querySelector('input[name="r_supplier_id"]')?.value||'').trim();
          return (customerId || supplierId || val) ? true : false;
        }
        return val !== '';
      });
      // If user is on customer/supplier/account and it has a value, jump straight to amount
      if (nm==='r_customer_id' || nm==='r_supplier_id' || nm==='r_account_id'){
        const curVal = String(tr.querySelector(`input[name="${nm}"]`)?.value||'').trim();
        if (curVal){ const amt = tr.querySelector('input[name="r_amount"]'); if (amt){ amt.focus(); amt.select && amt.select(); return; } }
      }
      if (!hasAnyId){
        const curIdx = ID_FIELDS.indexOf(nm);
        if (curIdx >= 0){
          // Cycle to next ID field until filled
          for (let i=curIdx+1;i<ID_FIELDS.length;i++){
            const nxt = tr.querySelector(`input[name="${ID_FIELDS[i]}"]`);
            if (nxt){ nxt.focus(); nxt.select && nxt.select(); return; }
          }
          // Stay on last ID field if none ahead
          inp.focus(); inp.select && inp.select(); return;
        } else {
          // On non-ID field while IDs empty: jump back to first ID field
          const firstId = tr.querySelector(`input[name="${ID_FIELDS[0]}"]`);
          if (firstId){ firstId.focus(); firstId.select && firstId.select(); }
          return;
        }
      }
      // try focus next in current row
      if (focusNextInRow(tr, nm)) return;
      
      // End of row - check if next row exists
      const nextTr = tr.nextElementSibling;
      if (nextTr) {
        // Move to existing next row
        const first = nextTr.querySelector(`input[name="${FIELD_ORDER[0]}"]`);
        if (first){ first.focus(); first.select && first.select(); }
      } else {
        // No next row - add new row and focus its first field
        const tb = linesTable.querySelector('tbody');
        // add new row via existing button logic
        try{ if (btnAddLine) btnAddLine.click(); else if (typeof r_addLine==='function') r_addLine(); }catch(_){ }
        const lastTr = tb ? tb.querySelector('tr:last-child') : null;
        const first = lastTr ? lastTr.querySelector(`input[name="${FIELD_ORDER[0]}"]`) : null;
        if (first){ first.focus(); first.select && first.select(); }
      }
    });
    // Row delete with confirm modal and name
    const rRowDelModal = document.getElementById('r_confirmDelModal');
    const rRowDelMsg = document.getElementById('r_confirmDelMsg');
    const rRowDelYes = document.getElementById('r_confirmDelYes');
    const rRowDelNo  = document.getElementById('r_confirmDelNo');
    const rRowDelClose = document.getElementById('r_confirmDelClose');
    const rRowDelBackdrop = rRowDelModal ? rRowDelModal.querySelector('.modal-backdrop') : null;
    let rPendingDelTr = null;

    function openRowDel(tr) {
      rPendingDelTr = tr;
      const nm = tr?.querySelector('input[name="r_name"]')?.value?.trim() || '';
      if (rRowDelMsg) rRowDelMsg.textContent = nm ? `هل أنت متأكد من أنك تريد حذف السطر "${nm}"؟` : 'هل أنت متأكد من حذف هذا السطر؟';
      if (rRowDelModal) rRowDelModal.setAttribute('aria-hidden', 'false');
    }

    function closeRowDel() {
      if (rRowDelModal) rRowDelModal.setAttribute('aria-hidden', 'true');
      rPendingDelTr = null;
    }

    if (rRowDelYes) rRowDelYes.addEventListener('click', () => { if (rPendingDelTr) rPendingDelTr.remove(); closeRowDel(); });
    if (rRowDelNo) rRowDelNo.addEventListener('click', closeRowDel);
    if (rRowDelClose) rRowDelClose.addEventListener('click', closeRowDel);
    if (rRowDelBackdrop) rRowDelBackdrop.addEventListener('click', closeRowDel);

    linesTable.addEventListener('click', (e)=>{
      const del = e.target.closest('.act-delete'); if (!del) return; const tr = del.closest('tr'); if (!tr) return; tr.remove();
    });

    // ===== F9 Customer Lookup =====
    const lcModal = document.getElementById('r_lookupCustomerModal');
    const lcClose = document.getElementById('r_lookupCustomerClose');
    const lcCancel = document.getElementById('r_lookupCustomerCancel');
    const lcSearch = document.getElementById('r_lc_search');
    const lcTbody = document.getElementById('r_lc_tbody');
    let lcActiveTr = null;
    function r_openLc(tr){ lcActiveTr = tr; r_renderLc(customersCache); if (lcSearch){ lcSearch.value=''; setTimeout(()=> lcSearch.focus(),0); } if (lcModal) lcModal.setAttribute('aria-hidden','false'); }
    function r_closeLc(){ lcActiveTr=null; if (lcModal) lcModal.setAttribute('aria-hidden','true'); }
    function r_renderLc(rows){ if (!lcTbody) return; lcTbody.innerHTML=''; const data = Array.isArray(rows)?rows:[]; if(!data.length){ lcTbody.innerHTML='<tr><td colspan="2" style="text-align:center;padding:10px">لا يوجد عملاء</td></tr>'; return;} data.forEach(c=>{ const tr=document.createElement('tr'); tr.innerHTML=`<td>${c.id}</td><td>${c.name||c.full_name||c.company||''}</td>`; tr.tabIndex=0; tr.addEventListener('click', ()=> r_applyLc(c)); tr.addEventListener('keydown', (e)=>{ if(e.key==='Enter'){ r_applyLc(c);} }); lcTbody.appendChild(tr); }); }
    function r_applyLc(c){ if (!lcActiveTr||!c){ r_closeLc(); return;} const cInp=lcActiveTr.querySelector('input[name="r_customer_id"]'); const sInp=lcActiveTr.querySelector('input[name="r_supplier_id"]'); const aInp=lcActiveTr.querySelector('input[name="r_account_id"]'); if (cInp) cInp.value=c.id??''; if (sInp) sInp.value=''; if (aInp) aInp.value=''; r_syncName(lcActiveTr); r_closeLc(); if (cInp) setTimeout(()=> cInp.focus(),0); }
    if (lcClose) lcClose.addEventListener('click', r_closeLc); if (lcCancel) lcCancel.addEventListener('click', r_closeLc); if (lcModal){ const bd=lcModal.querySelector('.modal-backdrop'); if (bd) bd.addEventListener('click', r_closeLc); }
    if (lcSearch){ lcSearch.addEventListener('input', (e)=>{ const q=(e.target.value||'').toLowerCase().trim(); if(!q){ r_renderLc(customersCache); return;} const rows=(customersCache||[]).filter(c=> String(c.id).includes(q) || String(c.name||c.full_name||c.company||'').toLowerCase().includes(q)); r_renderLc(rows); }); }

    // ===== F9 Supplier Lookup =====
    const lsModal = document.getElementById('r_lookupSupplierModal');
    const lsClose = document.getElementById('r_lookupSupplierClose');
    const lsCancel = document.getElementById('r_lookupSupplierCancel');
    const lsSearch = document.getElementById('r_ls_search');
    const lsTbody = document.getElementById('r_ls_tbody');
    let lsActiveTr = null;
    function r_openLs(tr){ lsActiveTr = tr; r_renderLs(suppliersCache); if (lsSearch){ lsSearch.value=''; setTimeout(()=> lsSearch.focus(),0); } if (lsModal) lsModal.setAttribute('aria-hidden','false'); }
    function r_closeLs(){ lsActiveTr=null; if (lsModal) lsModal.setAttribute('aria-hidden','true'); }
    function r_renderLs(rows){ if (!lsTbody) return; lsTbody.innerHTML=''; const data = Array.isArray(rows)?rows:[]; if(!data.length){ lsTbody.innerHTML='<tr><td colspan="2" style="text-align:center;padding:10px">لا يوجد موردين</td></tr>'; return;} data.forEach(s=>{ const tr=document.createElement('tr'); tr.innerHTML=`<td>${s.id}</td><td>${s.name||s.full_name||s.company||''}</td>`; tr.tabIndex=0; tr.addEventListener('click', ()=> r_applyLs(s)); tr.addEventListener('keydown', (e)=>{ if(e.key==='Enter'){ r_applyLs(s);} }); lsTbody.appendChild(tr); }); }
    function r_applyLs(s){ if (!lsActiveTr||!s){ r_closeLs(); return;} const cInp=lsActiveTr.querySelector('input[name="r_customer_id"]'); const sInp=lsActiveTr.querySelector('input[name="r_supplier_id"]'); const aInp=lsActiveTr.querySelector('input[name="r_account_id"]'); if (sInp) sInp.value=s.id??''; if (cInp) cInp.value=''; if (aInp) aInp.value=''; r_syncName(lsActiveTr); r_closeLs(); if (sInp) setTimeout(()=> sInp.focus(),0); }
    if (lsClose) lsClose.addEventListener('click', r_closeLs); if (lsCancel) lsCancel.addEventListener('click', r_closeLs); if (lsModal){ const bd=lsModal.querySelector('.modal-backdrop'); if (bd) bd.addEventListener('click', r_closeLs); }
    if (lsSearch){ lsSearch.addEventListener('input', (e)=>{ const q=(e.target.value||'').toLowerCase().trim(); if(!q){ r_renderLs(suppliersCache); return;} const rows=(suppliersCache||[]).filter(s=> String(s.id).includes(q) || String(s.name||s.full_name||s.company||'').toLowerCase().includes(q)); r_renderLs(rows); }); }

    // ===== F9 Account Lookup =====
    const laModal = document.getElementById('r_lookupAccountModal');
    const laClose = document.getElementById('r_lookupAccountClose');
    const laCancel = document.getElementById('r_lookupAccountCancel');
    const laSearch = document.getElementById('r_la_search');
    const laTbody = document.getElementById('r_la_tbody');
    let laActiveTr = null;
    function r_openLa(tr){ laActiveTr = tr; r_renderLa(r_getLookupAccounts(accountsCache)); if (laSearch){ laSearch.value=''; setTimeout(()=> laSearch.focus(),0); } if (laModal) laModal.setAttribute('aria-hidden','false'); }
    function r_closeLa(){ laActiveTr=null; if (laModal) laModal.setAttribute('aria-hidden','true'); }
    function r_renderLa(rows){ if (!laTbody) return; laTbody.innerHTML=''; const data=Array.isArray(rows)?rows:[]; if(!data.length){ laTbody.innerHTML='<tr><td colspan="2" style="text-align:center;padding:10px">لا يوجد حسابات</td></tr>'; return;} data.forEach(a=>{ const tr=document.createElement('tr'); tr.innerHTML=`<td>${a.code||a.id}</td><td>${a.name||''}</td>`; tr.tabIndex=0; tr.addEventListener('click', ()=> r_applyLa(a)); tr.addEventListener('keydown', (e)=>{ if(e.key==='Enter'){ r_applyLa(a);} }); laTbody.appendChild(tr); }); }
    function r_applyLa(a){ if (!laActiveTr||!a){ r_closeLa(); return;} const cInp=laActiveTr.querySelector('input[name="r_customer_id"]'); const sInp=laActiveTr.querySelector('input[name="r_supplier_id"]'); const aInp=laActiveTr.querySelector('input[name="r_account_id"]'); if (aInp) aInp.value=a.code||a.id||''; if (cInp) cInp.value=''; if (sInp) sInp.value=''; r_syncName(laActiveTr); r_closeLa(); if (aInp) setTimeout(()=> aInp.focus(),0); }
    if (laClose) laClose.addEventListener('click', r_closeLa); if (laCancel) laCancel.addEventListener('click', r_closeLa); if (laModal){ const bd=laModal.querySelector('.modal-backdrop'); if (bd) bd.addEventListener('click', r_closeLa); }
    if (laSearch){ laSearch.addEventListener('input', (e)=>{ const q=(e.target.value||'').toLowerCase().trim(); const filtered=r_getLookupAccounts(accountsCache); if(!q){ r_renderLa(filtered); return;} const rows=filtered.filter(a=> String(a.code||a.id).includes(q) || String(a.name||'').toLowerCase().includes(q)); r_renderLa(rows); }); }

    // Keyboard shortcut for table cells
    linesTable.addEventListener('keydown', (e)=>{
      if (e.key === 'F9'){
        const inp = e.target; const tr = inp.closest('tr'); if (!tr) return; e.preventDefault();
        const name = inp.getAttribute('name');
        if (name==='r_customer_id'){ r_openLc(tr); }
        else if (name==='r_supplier_id'){ r_openLs(tr); }
        else if (name==='r_account_id'){ r_openLa(tr); }
      }
    });
    
    // Right-click to open lookup modals (only in editable modes)
    linesTable.addEventListener('contextmenu', (e)=>{
      const inp = e.target.closest('input');
      if (!inp) return;
      const tr = inp.closest('tr');
      if (!tr) return;
      // لا تفتح البحث في وضع العرض أو إذا كان الحقل مقفولاً
      if (screenMode === 'view' || inp.disabled || inp.readOnly) return;
      const name = inp.getAttribute('name');
      if (name==='r_customer_id'){ 
        e.preventDefault();
        r_openLc(tr); 
      }
      else if (name==='r_supplier_id'){ 
        e.preventDefault();
        r_openLs(tr); 
      }
      else if (name==='r_account_id'){ 
        e.preventDefault();
        r_openLa(tr); 
      }
    });

    // ===== F9 for Cash Account Header Field =====
    const cashAccNoInp = document.getElementById('r_cash_acc_no_inp');
    const cashAccSelect = document.getElementById('r_cash_acc');
    const cashAccId = document.getElementById('r_cash_acc_id');
    
    if (cashAccNoInp) {
      cashAccNoInp.addEventListener('keydown', (e) => {
        if (e.key === 'F9') {
          e.preventDefault();
          // Open account lookup and set header field as target
          if (laModal) {
            r_renderLa(r_getLookupAccounts(accountsCache));
            if (laSearch) { laSearch.value = ''; setTimeout(() => laSearch.focus(), 0); }
            laModal.setAttribute('aria-hidden', 'false');
            // Store reference to update header field
            laModal.dataset.targetField = 'r_cash_acc';
          }
        }
      });
    }

    // ===== F9 for Gold Account Header Field =====
    const goldAccNoInp = document.getElementById('r_gold_acc_no_inp');
    const goldAccSelect = document.getElementById('r_gold_acc');
    const goldAccId = document.getElementById('r_gold_acc_id');
    
    if (goldAccNoInp) {
      goldAccNoInp.addEventListener('keydown', (e) => {
        if (e.key === 'F9') {
          e.preventDefault();
          if (laModal) {
            r_renderLa(r_getLookupAccounts(accountsCache));
            if (laSearch) { laSearch.value = ''; setTimeout(() => laSearch.focus(), 0); }
            laModal.setAttribute('aria-hidden', 'false');
            laModal.dataset.targetField = 'r_gold_acc';
          }
        }
      });
    }

    // ===== F9 for Silver Account Header Field =====
    const silverAccNoInp = document.getElementById('r_silver_acc_no_inp');
    const silverAccSelect = document.getElementById('r_silver_acc');
    const silverAccId = document.getElementById('r_silver_acc_id');
    
    if (silverAccNoInp) {
      silverAccNoInp.addEventListener('keydown', (e) => {
        if (e.key === 'F9') {
          e.preventDefault();
          if (laModal) {
            r_renderLa(r_getLookupAccounts(accountsCache));
            if (laSearch) { laSearch.value = ''; setTimeout(() => laSearch.focus(), 0); }
            laModal.setAttribute('aria-hidden', 'false');
            laModal.dataset.targetField = 'r_silver_acc';
          }
        }
      });
    }

    // Modify r_applyLa to handle header fields
    const originalApplyLa = r_applyLa;
    r_applyLa = function(a) {
      // Check if we're applying to header field
      if (laModal && laModal.dataset.targetField) {
        const targetField = laModal.dataset.targetField;
        
        if (targetField === 'r_cash_acc' && cashAccNoInp && cashAccSelect && cashAccId) {
          cashAccNoInp.value = a.id ?? '';
          cashAccId.value = a.id ?? '';
          // Update select to show the selected account
          if (cashAccSelect.querySelector(`option[value="${a.id}"]`)) {
            cashAccSelect.value = a.id;
          }
          delete laModal.dataset.targetField;
          r_closeLa();
          setTimeout(() => cashAccNoInp.focus(), 0);
          return;
        }
        
        if (targetField === 'r_gold_acc' && goldAccNoInp && goldAccSelect && goldAccId) {
          goldAccNoInp.value = a.id ?? '';
          goldAccId.value = a.id ?? '';
          if (goldAccSelect.querySelector(`option[value="${a.id}"]`)) {
            goldAccSelect.value = a.id;
          }
          delete laModal.dataset.targetField;
          r_closeLa();
          setTimeout(() => goldAccNoInp.focus(), 0);
          return;
        }
        
        if (targetField === 'r_silver_acc' && silverAccNoInp && silverAccSelect && silverAccId) {
          silverAccNoInp.value = a.id ?? '';
          silverAccId.value = a.id ?? '';
          if (silverAccSelect.querySelector(`option[value="${a.id}"]`)) {
            silverAccSelect.value = a.id;
          }
          delete laModal.dataset.targetField;
          r_closeLa();
          setTimeout(() => silverAccNoInp.focus(), 0);
          return;
        }
        
        delete laModal.dataset.targetField;
      }
      
      // Call original function for table rows
      originalApplyLa(a);
    };
  }

  // Navigation controls
  async function r_navTo(pos){
    let ids = [];
    try{
      rNavRecords = buildReceiptNavRecords(await r_fetchIds());
      ids = rNavRecords.map((row) => row.id);
    }catch(_){ ids = rIds.slice(); }
    if (!ids.length){
      if (navCounter) navCounter.textContent = '0 / 0';
      if (navFirst) navFirst.disabled = true;
      if (navPrev)  navPrev.disabled  = true;
      if (navNext)  navNext.disabled  = true;
      if (navLast)  navLast.disabled  = true;
      return;
    }
    rIds = ids;
    const navVal = navIdInp ? parseInt(navIdInp.value,10) : NaN;
    const hdrVal = getReceiptInternalId();
    let idx = !isNaN(hdrVal) ? ids.findIndex(x=>x===hdrVal) : -1;
    if (idx < 0 && !isNaN(navVal)) {
      const targetIdByNav = findReceiptIdByNavNumber(navVal);
      idx = targetIdByNav > 0 ? ids.findIndex(x=>x===targetIdByNav) : -1;
    }
    if (idx < 0) idx = ids.length - 1;
    if (pos === 'first') idx = 0;
    else if (pos === 'last') idx = ids.length - 1;
    else if (pos === 'prev') idx = Math.max(0, idx - 1);
    else if (pos === 'next') idx = Math.min(ids.length - 1, idx + 1);
    rIndex = idx;
    const targetId = ids[idx];
    await r_loadById(targetId);
  }
  if (navFirst) navFirst.addEventListener('click',  async ()=>{ await r_navTo('first'); });
  if (navPrev)  navPrev.addEventListener('click',   async ()=>{ await r_navTo('prev');  });
  if (navNext)  navNext.addEventListener('click',   async ()=>{ await r_navTo('next');  });
  if (navLast)  navLast.addEventListener('click',   async ()=>{ await r_navTo('last');  });
  // Delete current receipt
  async function r_deleteCurrent(){
    try {
      const id = getReceiptInternalId();
      if (!id) { showToast('error', tRV('noVoucherToDelete')); return; }
      if (!window.receipt?.remove) { showToast('error', tRV('apiNotAvailable')); return; }
      
      // طلب تأكيد كلمة المرور للحذف
      const confirmFn = window.confirmDeleteWithPassword || window.parent?.confirmDeleteWithPassword || window.top?.confirmDeleteWithPassword;
      if (confirmFn) {
        try {
          const confirmed = await confirmFn();
          if (!confirmed) {
            closeReceiptDel();
            return;
          }
        } catch (e) {
          if (e.message !== 'cancelled') {
            // Error occurred
          }
          closeReceiptDel();
          return;
        }
      }
      
      // Show loading state
      if (rDelYes) rDelYes.disabled = true;
      if (rDelMsg) rDelMsg.textContent = 'جاري حذف السند...';
      
      const res = await window.receipt.remove({
        id,
        actorUserId: getCurrentUserId(),
        actorName: getCurrentUserDisplayName(),
      });
      
      if (res && res.success) { 
        showToast('success', tRV('voucherDeleted'));
        
        // تحديث القائمة
        await r_refreshIdsAndIndex();
        
        // انتظار قصير ثم تحميل السند التالي
        await new Promise(resolve => setTimeout(resolve, 100));
        
        if (rIds && rIds.length > 0) { 
          rIndex = Math.min(rIndex, rIds.length - 1);
          const nextId = rIds[rIndex];
          if (nextId) {
            try {
              await r_loadById(nextId);
            } catch (e) {
              
              await r_new();
            }
          } else {
            await r_new();
          }
        } else { 
          await r_new(); 
        }
      } else { 
        showToast('error', res && res.error ? res.error : tRV('deleteFailed')); 
      }
    } catch (err) { 
      
      showToast('error', tRV('deleteFailed')); 
    } finally {
      // Reset modal state
      if (rDelYes) rDelYes.disabled = false;
      if (rDelMsg) rDelMsg.textContent = 'هل أنت متأكد من أنك تريد حذف سند القبض؟';
      closeReceiptDel();
    }
  }
  // Header delete with confirm modal
  const rDelModal = document.getElementById('r_confirmReceiptDelModal');
  const rDelMsg = document.getElementById('r_confirmReceiptDelMsg');
  const rDelYes = document.getElementById('r_confirmReceiptDelYes');
  const rDelNo  = document.getElementById('r_confirmReceiptDelNo');
  const rDelClose = document.getElementById('r_confirmReceiptDelClose');
  function openReceiptDel(){ if (rDelMsg) rDelMsg.textContent = 'هل أنت متأكد من أنك تريد حذف سند القبض؟'; if (rDelModal) rDelModal.setAttribute('aria-hidden','false'); }
  function closeReceiptDel(){ if (rDelModal) rDelModal.setAttribute('aria-hidden','true'); }
  if (btnDeleteTop) {
    btnDeleteTop.addEventListener('click', async (e) => { 
      e.preventDefault();

      const curId = getReceiptInternalId();

      // في وضع التعديل: زر حذف يعمل كإلغاء للتعديل (إعادة تحميل السند الحالي)
      if (screenMode === 'edit' && curId) {
        try {
          await r_loadById(curId);
        } catch(_){ }
        screenMode = 'view';
        editUnlockedForId = null;
        setReadOnly(true);
        return;
      }

      // في وضع "سند جديد": زر حذف يعمل كإلغاء وإنهاء العملية الجديدة
      if (screenMode === 'new') {
        try {
          await r_refreshIdsAndIndex();
        } catch(_){ }
        if (rIds && rIds.length > 0) {
          // الرجوع لآخر سند موجود
          const lastId = rIds[rIds.length - 1];
          if (lastId) {
            try { await r_loadById(lastId); } catch(_){ }
          }
        } else {
          // لا توجد سندات: تفريغ النموذج وإعادته لوضع عرض مقفول مع أسطر افتراضية
          const idEl = document.getElementById('r_id');
          const dateEl = document.getElementById('r_date');
          const memoEl = document.getElementById('r_memo');
          if (idEl) idEl.value = '';
          currentReceiptId = null;
          if (dateEl) dateEl.value = '';
          if (memoEl) memoEl.value = '';
          const tb = linesTable?.querySelector('tbody');
          if (tb) {
            r_resetToMinimumRows();
          }
          if (navIdInp) navIdInp.value = '';
          if (navCounter) navCounter.textContent = '0 / 0';
        }
        screenMode = 'view';
        editUnlockedForId = null;
        setReadOnly(true);
        return;
      }

      // وضع العرض العادي: تنفيذ حذف فعلي
      if (!curId) {
        showToast('error', 'لا يوجد سند محدد للحذف');
        return;
      }

      // ✅ Check delete permission BEFORE opening confirmation modal
      if (window.ScreenPermissions && !window.ScreenPermissions.check('receipts_delete', 'حذف سند قبض')) {
        return;
      }

      openReceiptDel();
    });
  }
  
  if (rDelYes) {
    rDelYes.addEventListener('click', async () => {
      await r_deleteCurrent();
    });
  }
  if (rDelNo)  rDelNo.addEventListener('click', closeReceiptDel);
  if (rDelClose) rDelClose.addEventListener('click', closeReceiptDel);
  if (navIdInp){
    navIdInp.addEventListener('keydown', async (e)=>{
      if (e.key !== 'Enter') return;
      const v = parseInt(navIdInp.value,10); if (!v) return;
      try{
        const targetId = findReceiptIdByNavNumber(v);
        if (targetId > 0) {
          await r_loadById(targetId);
          if (!rIds.length) await r_refreshIdsAndIndex(targetId);
          const idx = rIds.findIndex(x=>x===targetId);
          if (idx>=0) rIndex = idx;
          return;
        }
        await r_loadById(v, { lookupByBranchLocalNumber: true });
      }catch(_){ showToast('error', tRV('loadError')); }
    });
  }

  // init: load last receipt if exists
  (async()=>{
    r_ensureMinimumRows();
    updateBottomTotals();
    await loadCaches();
    await populateAccountSelects();
    wireAccountSelects();
    try{
      await waitForReceipt(5000);
      const queryReceiptId = getReceiptQueryId();
      if (queryReceiptId){
        await r_refreshIdsAndIndex(queryReceiptId);
        await r_loadById(queryReceiptId);
      } else {
        await r_refreshIdsAndIndex();
        if (rIds && rIds.length){ 
          rIndex = rIds.length - 1; 
          await r_loadById(rIds[rIndex]); 
        } else {
          const last = await r_getLastId(); 
          if (last){ 
            await r_loadById(last); 
          } else { 
            await r_new(); 
          }
        }
      }
    }catch(_){ await r_new(); }
    try{ r_checkSelfReference(); }catch(_){ }
    // enable delete if we loaded an existing receipt
    const curId = getReceiptInternalId();
    if (btnDeleteTop) btnDeleteTop.disabled = !(Number.isFinite(curId) && curId>0);
  })();
  
  if (window.api && typeof window.api.on === 'function') {
    window.api.on('cloud-data-updated', async (payload) => {
      const tables = Array.isArray(payload?.tables) ? payload.tables : [];
      if (!tables.includes('receipts')) {
        return;
      }
      if (screenMode !== 'view') {
        return;
      }
      try {
        await r_refreshIdsAndIndex();
        const currentId = getReceiptInternalId();
        if (Number.isFinite(currentId) && currentId > 0) {
          await r_loadById(currentId);
        }
      } catch (_) {}
    });
  }

  window.addEventListener('message', async (event) => {
    if (event?.data?.type !== 'cloud-data-updated') {
      return;
    }
    const payload = event.data.payload || {};
    const tables = Array.isArray(payload?.tables) ? payload.tables : [];
    if (!tables.includes('receipts')) {
      return;
    }
    if (screenMode !== 'view') {
      return;
    }
    try {
      await r_refreshIdsAndIndex();
      const currentId = getReceiptInternalId();
      if (Number.isFinite(currentId) && currentId > 0) {
        await r_loadById(currentId);
      }
    } catch (_) {}
  });
  function syncReceiptTotalsLayout(){
    const receiptPanel = document.getElementById('panel-receipt');
    const totalsCard = document.getElementById('receipt_totals');
    const linesGridCard = document.getElementById('receipt-lines-grid');
    if (!receiptPanel || !totalsCard) return;

    const measuredHeight = Math.ceil(totalsCard.getBoundingClientRect().height || totalsCard.offsetHeight || 0);
    const safeHeight = Math.max(measuredHeight, 72);
    receiptPanel.style.setProperty('--receipt-totals-height', `${safeHeight}px`);

    const referenceRect = (linesGridCard || receiptPanel).getBoundingClientRect();
    const safeLeft = Math.max(Math.round(referenceRect.left || 0), 0);
    const safeWidth = Math.max(Math.round(referenceRect.width || receiptPanel.getBoundingClientRect().width || 0), 0);
    receiptPanel.style.setProperty('--receipt-totals-left', `${safeLeft}px`);
    receiptPanel.style.setProperty('--receipt-totals-width', `${safeWidth}px`);
  }
  
  // دالة تحديث بطاقة الإجماليات السفلية
  function updateBottomTotals(){
    let totalAmount = 0;
    let gold24 = 0, gold22 = 0, gold21 = 0, gold18 = 0;
    let silver999 = 0, silver925 = 0, silver900 = 0, silver800 = 0;
    
    const tbody = linesTable?.querySelector('tbody');
    if (tbody){
      tbody.querySelectorAll('tr').forEach(tr => {
        const cells = tr.querySelectorAll('td');
        if (cells.length > 0){
          // المبلغ (العمود 4 = index 4)
          const amountCell = cells[4];
          const amountInput = amountCell?.querySelector('input');
          const amount = parseDecimal(amountInput?.value || 0);
          if (amount > 0) totalAmount += amount;
          
          // الذهب/الفضة (العمود 5) والعيار (العمود 6)
          const goldCell = cells[5];
          const karatCell = cells[6];
          const goldInput = goldCell?.querySelector('input');
          const karatInput = karatCell?.querySelector('input, select');
          const weight = parseDecimal(goldInput?.value || 0);
          const karat = parseFloat(karatInput?.value || 0);
          
          if (weight > 0 && karat > 0){
            // عيارات الذهب
            if (karat === 24) gold24 += weight;
            else if (karat === 22) gold22 += weight;
            else if (karat === 21) gold21 += weight;
            else if (karat === 18) gold18 += weight;
            // عيارات الفضة
            else if (karat === 999) silver999 += weight;
            else if (karat === 925) silver925 += weight;
            else if (karat === 900) silver900 += weight;
            else if (karat === 800) silver800 += weight;
          }
        }
      });
    }
    
    // تحديث العناصر في البطاقة السفلية
    const totalAmountEl = document.getElementById('receipt_total_amount');
    const gold24El = document.getElementById('receipt_gold_24');
    const gold22El = document.getElementById('receipt_gold_22');
    const gold21El = document.getElementById('receipt_gold_21');
    const gold18El = document.getElementById('receipt_gold_18');
    const silver999El = document.getElementById('receipt_silver_999');
    const silver925El = document.getElementById('receipt_silver_925');
    const silver900El = document.getElementById('receipt_silver_900');
    const silver800El = document.getElementById('receipt_silver_800');
    
    if (totalAmountEl) totalAmountEl.textContent = formatNumberWithCommas(totalAmount.toFixed(2));
    if (gold24El) gold24El.textContent = formatNumberWithCommas(gold24.toFixed(2));
    if (gold22El) gold22El.textContent = formatNumberWithCommas(gold22.toFixed(2));
    if (gold21El) gold21El.textContent = formatNumberWithCommas(gold21.toFixed(2));
    if (gold18El) gold18El.textContent = formatNumberWithCommas(gold18.toFixed(2));
    if (silver999El) silver999El.textContent = formatNumberWithCommas(silver999.toFixed(2));
    if (silver925El) silver925El.textContent = formatNumberWithCommas(silver925.toFixed(2));
    if (silver900El) silver900El.textContent = formatNumberWithCommas(silver900.toFixed(2));
    if (silver800El) silver800El.textContent = formatNumberWithCommas(silver800.toFixed(2));
    syncReceiptTotalsLayout();
  }
  
  // استدعاء الدالة عند تغيير أي قيمة في الجدول
  if (linesTable){
    linesTable.addEventListener('input', updateBottomTotals);
    linesTable.addEventListener('change', updateBottomTotals);
    // استدعاء مباشر بعد كل عملية حذف أو إضافة صف
    const observer = new MutationObserver(updateBottomTotals);
    observer.observe(linesTable, { childList: true, subtree: true });
  }
  const receiptTotalsCard = document.getElementById('receipt_totals');
  if (receiptTotalsCard && typeof ResizeObserver !== 'undefined') {
    const totalsResizeObserver = new ResizeObserver(() => syncReceiptTotalsLayout());
    totalsResizeObserver.observe(receiptTotalsCard);
  }
  const receiptLinesGridCard = document.getElementById('receipt-lines-grid');
  if (receiptLinesGridCard && typeof ResizeObserver !== 'undefined') {
    const linesGridResizeObserver = new ResizeObserver(() => syncReceiptTotalsLayout());
    linesGridResizeObserver.observe(receiptLinesGridCard);
  }
  window.addEventListener('resize', syncReceiptTotalsLayout);
  
  // استدعاء أولي
  updateBottomTotals();
});

// ========== Translation System for Payment Voucher ==========
const PV_TRANSLATIONS = {
  ar: {
    // Toolbar buttons
    btnNew: 'سند صرف جديد',
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
    headerTitle: 'رأس سند الصرف',
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
    thDescription: 'الوصف',
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
    confirmDeleteVoucher: 'هل أنت متأكد من حذف سند الصرف؟',
    confirmDeleteLine: 'هل أنت متأكد من أنك تريد حذف هذا السطر؟',
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
    enterDate: 'يرجى إدخال نص في حقل البيان أولاً',
    addAtLeastOneLine: 'يرجى إضافة سطر واحد على الأقل',
    selectPartyForAll: 'يرجى تحديد العميل أو المورد أو الحساب لجميع الأسطر',
    viewModeOnly: 'الشاشة في وضع عرض فقط. اضغط زر "تعديل" أولاً',
    editNotEnabled: 'صلاحية التعديل لهذا السند غير مفعلة',
    cannotSaveNewInView: 'لا يمكن حفظ سند جديد في وضع العرض',
    customerNotFound: 'العميل غير موجود',
    supplierNotFound: 'المورد غير موجود',
    accountNotFound: 'الحساب غير موجود',
    saveFirst: 'يرجى حفظ السند أولاً',
    printWindowFailed: 'فشل فتح نافذة الطباعة',
    voucherNotFound: 'السند غير موجود',
    loadFailed: 'فشل تحميل السند',
    apiNotReady: 'واجهة السند غير جاهزة',
    invalidValue: 'قيمة غير صحيحة',
    karatRequired: 'عند إدخال وزن الذهب يجب إدخال العيار أولاً',
    karatOptions: 'الذهب: 24، 22، 21، 18 | الفضة: 999، 925، 900، 800',
    mustEnterParty: 'يجب إدخال إما العميل أو المورد أو رقم الحساب',
    phoneNotFound: 'رقم الهاتف غير موجود',
    phoneInvalid: 'رقم الهاتف غير صحيح',
    windowOpenFailed: 'فشل فتح النافذة',
    deleteError: 'حدث خطأ أثناء محاولة حذف السند',
    deleteFailed2: 'تعذّر الحذف',
    whatsappSending: 'جاري إرسال السند عبر واتساب...',
    whatsappError: 'خطأ في إرسال السند عبر واتساب',
    // Print template
    printVoucherNo: 'سند صرف رقم:',
    printDate: 'التاريخ:',
    printAccountNo: 'رقم الحساب:',
    printPaidTo: 'المدفوع له:',
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
    printReceiverSig: 'توقيع المستلم',
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
    memoCopied: 'تم نسخ البيان إلى',
    lines: 'سطور',
    noLinesToCopy: 'لا توجد سطور غير فارغة لنسخ البيان إليها',
    // Unsaved changes modal
    unsavedTitle: 'تغييرات غير محفوظة',
    unsavedMessage: 'لديك تعديلات لم يتم حفظها بعد',
    unsavedDetail: 'هل تريد المتابعة والخروج بدون حفظ التغييرات؟',
    unsavedStay: 'العودة للتعديل',
    unsavedLeave: 'خروج بدون حفظ'
  },
  en: {
    // Toolbar buttons
    btnNew: 'New Payment',
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
    headerTitle: 'Payment Voucher Header',
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
    confirmDeleteVoucher: 'Are you sure you want to delete this payment voucher?',
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
    enterDate: 'Please enter description text first',
    addAtLeastOneLine: 'Please add at least one line',
    selectPartyForAll: 'Please select customer, supplier, or account for all lines',
    viewModeOnly: 'Screen is in view mode. Click "Edit" first',
    editNotEnabled: 'Edit permission for this voucher is not enabled',
    cannotSaveNewInView: 'Cannot save new voucher in view mode',
    customerNotFound: 'Customer not found',
    supplierNotFound: 'Supplier not found',
    accountNotFound: 'Account not found',
    saveFirst: 'Please save voucher first',
    printWindowFailed: 'Failed to open print window',
    voucherNotFound: 'Voucher not found',
    loadFailed: 'Failed to load voucher',
    apiNotReady: 'Voucher API not ready',
    invalidValue: 'Invalid value',
    karatRequired: 'Karat is required when entering gold weight',
    karatOptions: 'Gold: 24, 22, 21, 18 | Silver: 999, 925, 900, 800',
    mustEnterParty: 'Must enter customer, supplier, or account number',
    phoneNotFound: 'Phone number not found',
    phoneInvalid: 'Invalid phone number',
    windowOpenFailed: 'Failed to open window',
    deleteError: 'Error occurred while deleting voucher',
    deleteFailed2: 'Delete failed',
    whatsappSending: 'Sending voucher via WhatsApp...',
    whatsappError: 'Error sending voucher via WhatsApp',
    // Print template
    printVoucherNo: 'Payment Voucher No:',
    printDate: 'Date:',
    printAccountNo: 'Account No:',
    printPaidTo: 'Paid To:',
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
    printReceiverSig: 'Receiver Signature',
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
    memoCopied: 'Description copied to',
    lines: 'lines',
    noLinesToCopy: 'No non-empty lines to copy description to',
    // Unsaved changes modal
    unsavedTitle: 'Unsaved Changes',
    unsavedMessage: 'You have unsaved changes on this voucher',
    unsavedDetail: 'Do you want to leave without saving your changes?',
    unsavedStay: 'Back to Edit',
    unsavedLeave: 'Leave'
  }
};

function getPVLang() {
  try {
    return localStorage.getItem('uiLang') === 'en' ? 'en' : 'ar';
  } catch (e) {
    return 'ar';
  }
}

function tPV(key) {
  const lang = getPVLang();
  return PV_TRANSLATIONS[lang]?.[key] || PV_TRANSLATIONS.ar[key] || key;
}

function tPVFmt(key, replacements = {}) {
  let text = tPV(key);
  for (const [k, v] of Object.entries(replacements)) {
    text = text.replace(`{${k}}`, v);
  }
  return text;
}

// Apply static translations on page load
function applyVoucherStaticTexts() {
  const lang = getPVLang();
  const isRtl = lang === 'ar';

  // Set document direction
  document.documentElement.lang = lang;
  document.documentElement.dir = isRtl ? 'rtl' : 'ltr';

  // Toolbar buttons
  const btnNewVoucher = document.getElementById('btnNewVoucher');
  if (btnNewVoucher) btnNewVoucher.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles" style="margin-inline-end:6px"></i>${tPV('btnNew')}`;
  
  const btnEditTop = document.getElementById('hv_btnEditTop');
  if (btnEditTop) btnEditTop.innerHTML = `<i class="fa-solid fa-pen-to-square" style="margin-inline-end:6px"></i>${tPV('btnEdit')}`;
  
  const btnSaveTop = document.getElementById('hv_btnSaveTop');
  if (btnSaveTop) btnSaveTop.innerHTML = `<i class="fa-solid fa-circle-check" style="margin-inline-end:6px"></i>${tPV('btnSave')}`;
  
  const btnDeleteTop = document.getElementById('hv_btnDeleteTop');
  if (btnDeleteTop) btnDeleteTop.innerHTML = `<i class="fa-solid fa-circle-xmark" style="margin-inline-end:6px"></i>${tPV('btnDelete')}`;
  
  const btnPrintTop = document.getElementById('hv_btnPrintTop');
  if (btnPrintTop) btnPrintTop.innerHTML = `<i class="fa-solid fa-file-pdf" style="margin-inline-end:6px"></i>${tPV('btnPrint')}`;
  
  // Journal View button
  const btnJournalViewEl = document.getElementById('hv_btnJournalView');
  if (btnJournalViewEl) btnJournalViewEl.innerHTML = `<i class="fa-solid fa-file-invoice" style="margin-inline-end:6px"></i>${tPV('btnJournalView')}`;
  
  const btnCloseTop = document.getElementById('hv_btnCloseTop');
  if (btnCloseTop) btnCloseTop.innerHTML = `<i class="fa-solid fa-arrow-right-from-bracket" style="margin-inline-end:6px"></i>${tPV('btnClose')}`;
  
  const btnAddLine = document.getElementById('hv_btnAddLine');
  if (btnAddLine) btnAddLine.innerHTML = `<i class="fa-solid fa-circle-plus" style="margin-inline-end:6px"></i>${tPV('btnAddLine')}`;

  // Header title
  const headerTitle = document.querySelector('#panel-voucher .card.form-card h3 > span');
  if (headerTitle) headerTitle.textContent = tPV('headerTitle');
  
  // Details title
  const detailsTitle = document.querySelector('#voucher-lines-grid .table-head h3');
  if (detailsTitle) detailsTitle.textContent = tPV('detailsTitle');

  // Field labels
  document.querySelectorAll('#panel-voucher .form-field span').forEach(span => {
    const text = span.textContent.trim();
    if (text.includes('رقم السند') || text === 'Voucher No.') {
      span.innerHTML = `<i class="fa-solid fa-hashtag" style="color:#f59e0b; margin-inline-end:6px"></i>${tPV('voucherNo')}`;
    }
    if (text.includes('التاريخ') || text === 'Date') {
      span.innerHTML = `<i class="fa-solid fa-calendar-days" style="color:#ef4444; margin-inline-end:6px"></i>${tPV('date')}`;
    }
    if (text.includes('صندوق الريال') || text.includes('Cash Box')) {
      span.innerHTML = `<i class="fa-solid fa-coins" style="color:#3b82f6; margin-inline-end:6px"></i>${tPV('cashBox')} <small style="color:#888">${tPV('searchF9')}</small>`;
    }
    if (text.includes('صندوق الذهب') || text.includes('Gold Box')) {
      span.innerHTML = `<i class="fa-solid fa-cube" style="color:#f59e0b; margin-inline-end:6px"></i>${tPV('goldBox')} <small style="color:#888">${tPV('searchF9')}</small>`;
    }
    if (text.includes('صندوق الفضة') || text.includes('Silver Box')) {
      span.innerHTML = `<i class="fa-solid fa-cube" style="color:#9ca3af; margin-inline-end:6px"></i>${tPV('silverBox')} <small style="color:#888">${tPV('searchF9')}</small>`;
    }
  });

  // Navigation tooltips
  const navFirst = document.getElementById('hv_nav_first');
  if (navFirst) navFirst.title = tPV('navFirst');
  const navPrev = document.getElementById('hv_nav_prev');
  if (navPrev) navPrev.title = tPV('navPrev');
  const navNext = document.getElementById('hv_nav_next');
  if (navNext) navNext.title = tPV('navNext');
  const navLast = document.getElementById('hv_nav_last');
  if (navLast) navLast.title = tPV('navLast');
  const navIdInp = document.getElementById('hv_nav_id');
  if (navIdInp) {
    navIdInp.placeholder = tPV('navPlaceholder');
    navIdInp.title = tPV('voucherNo');
  }

  // Table headers
  const tableHeaders = document.querySelectorAll('#hv_linesTable thead th');
  if (tableHeaders.length >= 9) {
    tableHeaders[0].textContent = tPV('thCustomerNo');
    tableHeaders[1].textContent = tPV('thSupplierNo');
    tableHeaders[2].textContent = tPV('thAccountNo');
    tableHeaders[3].textContent = tPV('thName');
    tableHeaders[4].textContent = tPV('thAmount');
    tableHeaders[5].textContent = tPV('thGoldSilver');
    tableHeaders[6].textContent = tPV('thKarat');
    tableHeaders[7].textContent = tPV('thDescription');
    tableHeaders[8].textContent = tPV('thRemove');
  }

  // Totals labels
  const totalsCard = document.getElementById('voucher_totals');
  if (totalsCard) {
    const spans = totalsCard.querySelectorAll('span');
    spans.forEach(span => {
      const text = span.textContent.trim();
      if (text.includes('إجمالي المبلغ') || text.includes('Total Amount')) {
        span.childNodes[0].textContent = tPV('totalAmount') + ' ';
      }
      if (text.includes('ذهب (24)') || text.includes('Gold (24)')) span.childNodes[0].textContent = tPV('gold24') + ' ';
      if (text.includes('ذهب (22)') || text.includes('Gold (22)')) span.childNodes[0].textContent = tPV('gold22') + ' ';
      if (text.includes('ذهب (21)') || text.includes('Gold (21)')) span.childNodes[0].textContent = tPV('gold21') + ' ';
      if (text.includes('ذهب (18)') || text.includes('Gold (18)')) span.childNodes[0].textContent = tPV('gold18') + ' ';
      if (text.includes('فضة (999)') || text.includes('Silver (999)')) span.childNodes[0].textContent = tPV('silver999') + ' ';
      if (text.includes('فضة (925)') || text.includes('Silver (925)')) span.childNodes[0].textContent = tPV('silver925') + ' ';
      if (text.includes('فضة (900)') || text.includes('Silver (900)')) span.childNodes[0].textContent = tPV('silver900') + ' ';
      if (text.includes('فضة (800)') || text.includes('Silver (800)')) span.childNodes[0].textContent = tPV('silver800') + ' ';
    });
  }

  // Lookup modals - Customer
  const lcTitle = document.querySelector('#lookupCustomerModal h3');
  if (lcTitle) lcTitle.textContent = tPV('selectCustomer');
  const lcSearchLabel = document.querySelector('#lookupCustomerModal .form-field span');
  if (lcSearchLabel) lcSearchLabel.textContent = tPV('searchCustomer');
  const lcTableHeaders = document.querySelectorAll('#lc_table thead th');
  if (lcTableHeaders.length >= 2) {
    lcTableHeaders[0].textContent = tPV('customerNo');
    lcTableHeaders[1].textContent = tPV('customerName');
  }
  const lcCancel = document.getElementById('lookupCustomerCancel');
  if (lcCancel) lcCancel.innerHTML = `<i class="fa-regular fa-circle-xmark" style="margin-inline-end:6px"></i>${tPV('cancelBtn')}`;

  // Lookup modals - Supplier
  const lsTitle = document.querySelector('#lookupSupplierModal h3');
  if (lsTitle) lsTitle.textContent = tPV('selectSupplier');
  const lsSearchLabel = document.querySelector('#lookupSupplierModal .form-field span');
  if (lsSearchLabel) lsSearchLabel.textContent = tPV('searchSupplier');
  const lsTableHeaders = document.querySelectorAll('#ls_table thead th');
  if (lsTableHeaders.length >= 2) {
    lsTableHeaders[0].textContent = tPV('supplierNo');
    lsTableHeaders[1].textContent = tPV('supplierName');
  }
  const lsCancel = document.getElementById('lookupSupplierCancel');
  if (lsCancel) lsCancel.innerHTML = `<i class="fa-regular fa-circle-xmark" style="margin-inline-end:6px"></i>${tPV('cancelBtn')}`;

  // Lookup modals - Account
  const laTitle = document.querySelector('#lookupAccountModal h3');
  if (laTitle) laTitle.textContent = tPV('selectAccount');
  const laSearchLabel = document.querySelector('#lookupAccountModal .form-field span');
  if (laSearchLabel) laSearchLabel.textContent = tPV('searchAccount');
  const laTableHeaders = document.querySelectorAll('#la_table thead th');
  if (laTableHeaders.length >= 2) {
    laTableHeaders[0].textContent = tPV('accountNo');
    laTableHeaders[1].textContent = tPV('accountName');
  }
  const laCancel = document.getElementById('lookupAccountCancel');
  if (laCancel) laCancel.innerHTML = `<i class="fa-regular fa-circle-xmark" style="margin-inline-end:6px"></i>${tPV('cancelBtn')}`;

  // Confirm delete modals
  const confirmVDelTitle = document.querySelector('#confirmVDelModal h3 span');
  if (confirmVDelTitle) confirmVDelTitle.textContent = tPV('confirmDelete');
  const confirmVDelMsg = document.getElementById('confirmVDelMsg');
  if (confirmVDelMsg) confirmVDelMsg.textContent = tPV('confirmDeleteLine');
  const confirmVDelYes = document.getElementById('confirmVDelYes');
  if (confirmVDelYes) confirmVDelYes.innerHTML = `<i class="fa-regular fa-circle-check" style="margin-inline-end:6px"></i>${tPV('yesDelete')}`;
  const confirmVDelNo = document.getElementById('confirmVDelNo');
  if (confirmVDelNo) confirmVDelNo.innerHTML = `<i class="fa-regular fa-circle-xmark" style="margin-inline-end:6px"></i>${tPV('cancelAction')}`;

  const confirmVoucherDelTitle = document.querySelector('#confirmVoucherDelModal h3 span');
  if (confirmVoucherDelTitle) confirmVoucherDelTitle.textContent = tPV('confirmDelete');
  const confirmVoucherDelMsg = document.getElementById('confirmVoucherDelMsg');
  if (confirmVoucherDelMsg) confirmVoucherDelMsg.textContent = tPV('confirmDeleteVoucher');
  const confirmVoucherDelYes = document.getElementById('confirmVoucherDelYes');
  if (confirmVoucherDelYes) confirmVoucherDelYes.innerHTML = `<i class="fa-regular fa-circle-check" style="margin-inline-end:6px"></i>${tPV('yesDelete')}`;
  const confirmVoucherDelNo = document.getElementById('confirmVoucherDelNo');
  if (confirmVoucherDelNo) confirmVoucherDelNo.innerHTML = `<i class="fa-regular fa-circle-xmark" style="margin-inline-end:6px"></i>${tPV('cancelAction')}`;

  // Self hint
  const selfHintLead = document.querySelector('#hv_self_hint .lead');
  if (selfHintLead) selfHintLead.innerHTML = `<i class="fa-regular fa-circle-info"></i> ${tPV('selfHintLead')}`;
  const selfHintSub = document.querySelector('#hv_self_hint .sub');
  if (selfHintSub) selfHintSub.textContent = tPV('selfHintSub');

  // Memo placeholder
  const memoField = document.getElementById('hv_memo');
  if (memoField) memoField.placeholder = tPV('memoPlaceholder');

  // Fix navigation arrows for LTR
  if (!isRtl) {
    const navControls = document.querySelector('.nav-controls');
    if (navControls) navControls.style.flexDirection = 'row-reverse';
  }

  // Fix table header alignment for LTR
  if (!isRtl) {
    document.querySelectorAll('#hv_linesTable th').forEach(th => th.style.textAlign = 'left');
    document.querySelectorAll('#lc_table th, #ls_table th, #la_table th').forEach(th => th.style.textAlign = 'left');
  }

  // Update datalist options
  const karatList = document.getElementById('hv_karat_list');
  if (karatList) {
    karatList.innerHTML = `
      <option value="24">${tPV('gold24Option')}</option>
      <option value="22">${tPV('gold22Option')}</option>
      <option value="21">${tPV('gold21Option')}</option>
      <option value="18">${tPV('gold18Option')}</option>
      <option value="999">${tPV('silver999Option')}</option>
      <option value="925">${tPV('silver925Option')}</option>
      <option value="900">${tPV('silver900Option')}</option>
      <option value="800">${tPV('silver800Option')}</option>
    `;
  }
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

// Combined functions that use correct language
function toWordsCash(n) {
  return getPVLang() === 'en' ? toEnglishWordsCash(n) : toArabicWordsCash(n);
}

function toWordsGold(n) {
  return getPVLang() === 'en' ? toEnglishWordsGold(n) : toArabicWordsGold(n);
}

document.addEventListener('DOMContentLoaded', async () => {
  // Apply translations first
  applyVoucherStaticTexts();

  // Bridge APIs from parent/top if not present locally
  (function ensureAPIBridge(){
    try{
      const pick = (name)=>{
        if (!window[name]){
          if (window.parent && window.parent[name]) window[name] = window.parent[name];
          else if (window.top && window.top[name]) window[name] = window.top[name];
        }
      };
      ['voucher','accounts','suppliers','db','api','sys'].forEach(pick);
    }catch(_){ }
  })();
  
  // ✅ Initialize screen permissions
  if (window.ScreenPermissions) {
    await window.ScreenPermissions.init();
  }
  
  const tbody = document.getElementById('voucherListTbody');
  const btnNew = document.getElementById('btnNewVoucher');
  const btnRefresh = document.getElementById('btnRefreshVoucher');
  const btnExportXls = document.getElementById('btnExportVoucher');
  const btnExportPdf = document.getElementById('btnExportVoucherPdf');
  const search = document.getElementById('voucherSearch');

  // Modal elements
  const modal = document.getElementById('voucherModal');
  const modalTitle = document.getElementById('voucherModalTitle');
  const mClose = document.getElementById('voucherModalClose');
  const mCancel = document.getElementById('voucherCancel');
  const mSave = document.getElementById('voucherSave');
  const vError = document.getElementById('voucher_error');
  const btnAddLine = document.getElementById('btnAddLine');
  const linesTable = document.getElementById('linesTable');

  let cache = [];
  let isEdit = false;
  let editingId = null;
  let accountsCache = [];
  let customersCache = [];
  let suppliersCache = [];

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

  // Number formatting (English digits)
  const nf = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  // parseDecimal and formatNumberWithCommas are now loaded from common-utils.js
  
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

  // Ensure voucher API is ready before wiring actions
  function getVoucherService(){
    return window.voucher || null;
  }
  function getVoucherApiRoot(){
    return window.api || null;
  }
  function getVoucherSysRoot(){
    return window.sys || null;
  }
  async function fetchVoucherAccounts(){
    try {
      if (window.accounts?.getAccounts) {
        const result = await window.accounts.getAccounts();
        if (result && result.success && Array.isArray(result.data)) return result.data;
        if (Array.isArray(result)) return result;
      }
    } catch (_) {}
    return [];
  }
  function getVoucherLookupAccounts(rows){
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
  async function fetchVoucherCustomers(){
    try {
      const result = window.api?.getCustomers ? await window.api.getCustomers() : (window.db?.getCustomers ? await window.db.getCustomers() : null);
      if (result && result.success && Array.isArray(result.data)) return result.data;
      if (result && Array.isArray(result.customers)) return result.customers;
      if (Array.isArray(result)) return result;
    } catch (_) {}
    return [];
  }
  async function fetchVoucherSuppliers(){
    try {
      const result = window.api?.getSuppliers ? await window.api.getSuppliers() : (window.suppliers?.getSuppliers ? await window.suppliers.getSuppliers() : null);
      if (result && result.success && Array.isArray(result.data)) return result.data;
      if (result && Array.isArray(result.suppliers)) return result.suppliers;
      if (Array.isArray(result)) return result;
    } catch (_) {}
    return [];
  }
  async function waitForVoucher(maxTries=25, delayMs=120){
    for (let i=0;i<maxTries;i++){
      const v = getVoucherService();
      if (v && typeof v.add === 'function' && typeof v.get === 'function' && typeof v.remove === 'function') return true;
      await new Promise(r=>setTimeout(r, delayMs));
    }
    return false;
  }

  // Initialize ids for navigation on load and show latest voucher if available
  // (Removed duplicate initialization - now handled by load() at end of script)

  // ===== Header editable grid (تفاصيل السند في الرأس) =====
  const hvLinesTable = document.getElementById('hv_linesTable');
  const hvBtnAddLine = document.getElementById('hv_btnAddLine');
  const hvBtnSave = document.getElementById('hv_btnSave');
  const hvBtnSaveTop = document.getElementById('hv_btnSaveTop');
  const hvBtnEditTop = document.getElementById('hv_btnEditTop');
  const hvBtnDeleteTop = document.getElementById('hv_btnDeleteTop');
  const hvBtnPrintTop = document.getElementById('hv_btnPrintTop');
  const hvBtnJournalView = document.getElementById('hv_btnJournalView');
  const hvBtnWhatsApp = document.getElementById('hv_btnWhatsApp');
  const hvBtnCloseTop = document.getElementById('hv_btnCloseTop');
  // Navigation buttons
  const hvNavFirst = document.getElementById('hv_nav_first');
  const hvNavPrev  = document.getElementById('hv_nav_prev');
  const hvNavNext  = document.getElementById('hv_nav_next');
  const hvNavLast  = document.getElementById('hv_nav_last');
  const hvNavIdInp = document.getElementById('hv_nav_id');
  const hvNavCounter = document.getElementById('hv_nav_counter');
  const hvTimeInp = document.getElementById('hv_time');

  // Screen mode state for voucher header: 'view' | 'new' | 'edit'
  let hvScreenMode = 'view';
  let hvEditUnlockedForId = null;
  let currentVoucherId = null;
  let voucherSaveInFlight = false;
  function getVoucherDisplayNumber(){
    const value = parseInt(document.getElementById('hv_id')?.value || '', 10);
    return Number.isFinite(value) && value > 0 ? value : 0;
  }
  function getVoucherInternalId(){
    const value = Number(currentVoucherId || 0);
    return Number.isFinite(value) && value > 0 ? value : 0;
  }
  function getVoucherBranchScopeMode(){
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
  function isVoucherAllBranchesScope(){
    return getVoucherBranchScopeMode() === 'all';
  }
  function getVoucherNavNumber(header, fallbackId = 0){
    const internalId = Number(header?.id || fallbackId || 0) || 0;
    const branchLocalNumber = Number(header?.branch_local_number || 0) || 0;
    return branchLocalNumber || internalId || 0;
  }
  function buildVoucherNavRecords(rows = []){
    return (Array.isArray(rows) ? rows : [])
      .map((row) => {
        const internalId = Number(row?.id || 0) || 0;
        return {
          id: internalId,
          navNumber: getVoucherNavNumber(row, internalId),
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
  function findVoucherIdByNavNumber(value){
    const targetNavNumber = Number(value || 0) || 0;
    if (targetNavNumber <= 0) {
      return 0;
    }
    const matches = hvVoucherNavRecords.filter((row) => Number(row?.navNumber || 0) === targetNavNumber);
    if (!matches.length) {
      return 0;
    }
    const currentId = getVoucherInternalId();
    const currentMatch = matches.find((row) => row.id === currentId);
    return Number(currentMatch?.id || matches[matches.length - 1]?.id || 0) || 0;
  }
  function getVoucherCounterDisplay(){
    if (isVoucherAllBranchesScope()) {
      const total = hvVoucherIds.length;
      const current = hvIndex >= 0 && hvIndex < total ? hvIndex + 1 : 0;
      return { current, total };
    }
    const resolvedIndex = hvIndex >= 0 && hvIndex < hvVoucherNavRecords.length
      ? hvIndex
      : hvVoucherIds.findIndex((id) => id === getVoucherInternalId());
    const current = Number(hvVoucherNavRecords[resolvedIndex]?.navNumber || 0) || 0;
    const total = Number(hvVoucherNavRecords[hvVoucherNavRecords.length - 1]?.navNumber || 0) || 0;
    return { current, total };
  }

  // Unsaved changes state
  let hvHasUnsavedChanges = false;
  let hvPendingUnsavedResolve = null;

  // Unsaved changes modal elements
  const hvUnsavedModal = document.getElementById('unsavedChangesModal');
  const hvUnsavedClose = document.getElementById('unsavedChangesClose');
  const hvUnsavedStayBtn = document.getElementById('unsavedStayBtn');
  const hvUnsavedLeaveBtn = document.getElementById('unsavedLeaveBtn');

  function hvMarkUnsaved() {
    if (hvScreenMode === 'edit' || hvScreenMode === 'new') {
      hvHasUnsavedChanges = true;
    }
  }

  function hvResetUnsaved() {
    hvHasUnsavedChanges = false;
  }

  function hvOpenUnsavedModal() {
    if (!hvUnsavedModal) return Promise.resolve(true);
    return new Promise(resolve => {
      hvPendingUnsavedResolve = resolve;
      hvUnsavedModal.classList.add('show');
      hvUnsavedModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  }

  function hvCloseUnsavedModal(result = false) {
    if (hvUnsavedModal) {
      hvUnsavedModal.classList.remove('show');
      hvUnsavedModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    if (hvPendingUnsavedResolve) {
      hvPendingUnsavedResolve(!!result);
      hvPendingUnsavedResolve = null;
    }
  }

  // Wire unsaved-changes modal buttons
  if (hvUnsavedClose) hvUnsavedClose.addEventListener('click', () => hvCloseUnsavedModal(false));
  if (hvUnsavedStayBtn) hvUnsavedStayBtn.addEventListener('click', () => hvCloseUnsavedModal(false));
  if (hvUnsavedLeaveBtn) hvUnsavedLeaveBtn.addEventListener('click', () => { hvResetUnsaved(); hvCloseUnsavedModal(true); });
  if (hvUnsavedModal) {
    const backdrop = hvUnsavedModal.querySelector('.permission-denied-backdrop');
    if (backdrop) backdrop.addEventListener('click', () => hvCloseUnsavedModal(false));
  }

  // Expose guard for outer shell
  window.canLeavePaymentVoucher = async function () {
    if (!hvHasUnsavedChanges || hvScreenMode === 'view') return true;
    try {
      const result = await hvOpenUnsavedModal();
      return !!result;
    } catch (e) { return true; }
  };

  // Track changes on header fields
  const hvHeaderInputsForUnsaved = ['hv_date', 'hv_memo', 'hv_cash_acc_no_inp', 'hv_gold_acc_no_inp', 'hv_silver_acc_no_inp', 'hv_cash_acc', 'hv_gold_acc', 'hv_silver_acc'];
  hvHeaderInputsForUnsaved.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      ['input', 'change'].forEach(evt => el.addEventListener(evt, () => hvMarkUnsaved()));
    }
  });

  // Track changes on lines table (delegated)
  if (hvLinesTable) {
    hvLinesTable.addEventListener('input', () => hvMarkUnsaved());
    hvLinesTable.addEventListener('change', () => hvMarkUnsaved());
  }

  function hv_setReadOnly(isReadOnly){
    const dateEl = document.getElementById('hv_date');
    const memoEl = document.getElementById('hv_memo');
    const cashNo = document.getElementById('hv_cash_acc_no_inp');
    const goldNo = document.getElementById('hv_gold_acc_no_inp');
    const silverNo = document.getElementById('hv_silver_acc_no_inp');
    const cashSel = document.getElementById('hv_cash_acc');
    const goldSel = document.getElementById('hv_gold_acc');
    const silverSel = document.getElementById('hv_silver_acc');

    [dateEl, memoEl, cashNo, goldNo, silverNo, cashSel, goldSel, silverSel].forEach(inp => {
      if (inp) inp.disabled = isReadOnly;
    });

    if (hvBtnAddLine) hvBtnAddLine.disabled = isReadOnly;

    const hvBtnCopyMemo = document.getElementById('hv_btnCopyMemo');
    if (hvBtnCopyMemo) hvBtnCopyMemo.disabled = isReadOnly;

    if (hvLinesTable){
      hvLinesTable.querySelectorAll('input, button').forEach(el => {
        el.disabled = isReadOnly;
      });
    }

    if (hvBtnSaveTop){
      if (hvScreenMode === 'edit') {
        hvBtnSaveTop.innerHTML = `<i class="fa-solid fa-circle-check" style="margin-inline-end:6px"></i>${tPV('btnSaveEdit')}`;
      } else {
        hvBtnSaveTop.innerHTML = `<i class="fa-solid fa-circle-check" style="margin-inline-end:6px"></i>${tPV('btnSave')}`;
      }
      hvBtnSaveTop.disabled = (hvScreenMode === 'view');
    }

    if (btnNew){
      btnNew.disabled = (hvScreenMode === 'new' || hvScreenMode === 'edit');
    }

    if (hvBtnEditTop){
      const curId = getVoucherInternalId();
      hvBtnEditTop.disabled = !curId || hvScreenMode !== 'view';
    }

    if (hvBtnDeleteTop){
      const curId = getVoucherInternalId();
      if (hvScreenMode === 'new' || (hvScreenMode === 'edit' && curId)){
        hvBtnDeleteTop.innerHTML = `<i class="fa-solid fa-circle-xmark" style="margin-inline-end:6px"></i>${tPV('btnCancel')}`;
        hvBtnDeleteTop.disabled = false;
      } else {
        hvBtnDeleteTop.innerHTML = `<i class="fa-solid fa-circle-xmark" style="margin-inline-end:6px"></i>${tPV('btnDelete')}`;
        hvBtnDeleteTop.disabled = !curId;
      }
    }

    if (hvBtnJournalView) {
      const curId = getVoucherInternalId();
      hvBtnJournalView.disabled = !curId;
    }

    const inEdit = (hvScreenMode !== 'view');
    if (hvNavFirst) hvNavFirst.disabled = inEdit ? true : hvNavFirst.disabled;
    if (hvNavPrev)  hvNavPrev.disabled  = inEdit ? true : hvNavPrev.disabled;
    if (hvNavNext)  hvNavNext.disabled  = inEdit ? true : hvNavNext.disabled;
    if (hvNavLast)  hvNavLast.disabled  = inEdit ? true : hvNavLast.disabled;
    if (hvNavIdInp) hvNavIdInp.disabled = inEdit;
  }

  // Start voucher header in view/read-only mode
  hv_setReadOnly(true);

  // IDs cache for navigation
  let hvVoucherIds = [];
  let hvVoucherNavRecords = [];
  let hvIndex = -1;

  // Helpers to get last voucher id if list is empty or cache missing
  async function hv_getLastVoucherId(){
    try{
      await waitForVoucher();
      const v = getVoucherService();
      if (v && typeof v.list === 'function'){
        const r = await v.list();
        const rowsArr = (r && r.success)
          ? (Array.isArray(r.rows) ? r.rows : (Array.isArray(r.data) ? r.data : []))
          : [];
        if (rowsArr.length){
          const navRecords = buildVoucherNavRecords(rowsArr);
          const lastId = Number(navRecords[navRecords.length - 1]?.id || 0) || 0;
          if (lastId > 0) return lastId;
        }
      }
      if (v && typeof v.getNextId === 'function'){
        const n = await v.getNextId();
        const lastId = (n && n.success && n.nextId) ? (parseInt(n.nextId,10)-1) : 0;
        return lastId > 0 ? lastId : null;
      }
    }catch(_){ }
    return null;
  }

  // showToast is now loaded from common-utils.js

  async function hv_fetchVoucherIds(){
    try{
      // Ensure API is ready before querying
      await waitForVoucher();
      const v = getVoucherService();
      if (v){
        if (typeof v.list === 'function'){
          const r = await v.list();
          if (r && r.success){
            const arr = Array.isArray(r.rows) ? r.rows : (Array.isArray(r.data) ? r.data : []);
            if (arr.length) return arr;
          }
        }
        if (typeof v.getAll === 'function'){
          const r = await v.getAll();
          if (r && r.success){
            const arr = Array.isArray(r.rows) ? r.rows : (Array.isArray(r.data) ? r.data : []);
            if (arr.length) return arr;
          }
        }
        if (typeof v.listIds === 'function'){
          const r = await v.listIds();
          if (r && r.success && Array.isArray(r.ids)) return r.ids.map((id) => ({ id }));
        }
      }
    }catch(_){ }
    return [];
  }

  async function hv_refreshIdsAndIndex(targetId=null){
    hvVoucherNavRecords = buildVoucherNavRecords(await hv_fetchVoucherIds());
    hvVoucherIds = hvVoucherNavRecords.map((row) => row.id);
    if (targetId && hvVoucherIds.length){
      hvIndex = Math.max(0, hvVoucherIds.findIndex(id => id === targetId));
    } else {
      hvIndex = hvVoucherIds.length ? hvVoucherIds.length - 1 : -1;
    }
    if (hvNavCounter) {
      const { current, total } = getVoucherCounterDisplay();
      hvNavCounter.textContent = `${current} / ${total}`;
    }
    return hvVoucherIds;
  }

  async function hv_loadVoucherById(id, showError = false, options = {}){
    const v = getVoucherService();
    if (!id || !v || typeof v.get !== 'function') return false;
    try{
      // If ids cache empty, refresh to support counter and arrows
      if (!hvVoucherIds || !hvVoucherIds.length){ await hv_refreshIdsAndIndex(); }
      // Ensure selects are populated before assigning values
      const cashSel0 = document.getElementById('hv_cash_acc');
      if (cashSel0 && !cashSel0.options.length){ populateHvAccountSelects(); }
      const requestPayload = options?.lookupByBranchLocalNumber
        ? { id, lookupByBranchLocalNumber: true }
        : id;
      const r = await v.get(requestPayload);
      if (!r || !r.success) {
        // فقط اعرض خطأ إذا طُلب ذلك صراحة
        if (showError) {
          showToast('error', r?.error || tPV('loadFailed'));
        }
        return false;
      }
      const data = r.data || {};
      const header = data.header || r.header || r.voucher || {};
      const lines = data.lines || r.lines || r.details || [];
      // Fill header
      currentVoucherId = header.id ?? id;
      const idEl = document.getElementById('hv_id'); if (idEl) idEl.value = header.branch_local_number || header.id || id;
      if (hvNavIdInp) hvNavIdInp.value = String(getVoucherNavNumber(header, id) || '');
      // Use local date fallback (not UTC)
      const dateEl = document.getElementById('hv_date'); 
      if (dateEl) { 
        if (header.date) { dateEl.value = header.date; }
        else if (header.created_at) { dateEl.value = String(header.created_at).substring(0,10); }
        else { const d = new Date(); dateEl.value = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0'); }
      }
      if (hvTimeInp){
        const t = (header && header.time) ? String(header.time) : (header && header.created_at ? String(header.created_at).substring(11,16) : '');
        hvTimeInp.value = t || hvTimeInp.value || '';
      }
      const memoEl = document.getElementById('hv_memo'); if (memoEl) memoEl.value = header.note || header.memo || '';
      // Sync header cash/gold/silver: select + hidden store id, visible number input shows account code
      const cashIdVal = header.cash_account_id;
      const goldIdVal = header.gold_account_id;
      // Only update if values exist, otherwise keep defaults
      if (cashIdVal != null && cashIdVal !== '') {
        const cashSelEl = document.getElementById('hv_cash_acc'); if (cashSelEl) cashSelEl.value = String(cashIdVal);
        const cashHidEl = document.getElementById('hv_cash_acc_id'); if (cashHidEl) cashHidEl.value = String(cashIdVal);
        const cashNoEl = document.getElementById('hv_cash_acc_no_inp');
        if (cashNoEl){
          const acc = (accountsCache || []).find(x => Number(x.id) === Number(cashIdVal));
          cashNoEl.value = acc && acc.code != null ? String(acc.code) : '';
        }
      }
      if (goldIdVal != null && goldIdVal !== '') {
        const goldSelEl = document.getElementById('hv_gold_acc'); if (goldSelEl) goldSelEl.value = String(goldIdVal);
        const goldHidEl = document.getElementById('hv_gold_acc_id'); if (goldHidEl) goldHidEl.value = String(goldIdVal);
        const goldNoEl = document.getElementById('hv_gold_acc_no_inp');
        if (goldNoEl){
          const acc = (accountsCache || []).find(x => Number(x.id) === Number(goldIdVal));
          goldNoEl.value = acc && acc.code != null ? String(acc.code) : '';
        }
      }
      // استخدام الافتراضي 999 إذا كان silver_account_id فارغاً
      const silverIdVal = header.silver_account_id || (accountsCache.find(x=>Number(x.id)===999) ? '999' : '');
      if (silverIdVal) {
        const silverSelEl = document.getElementById('hv_silver_acc'); if (silverSelEl) silverSelEl.value = String(silverIdVal);
        const silverHidEl = document.getElementById('hv_silver_acc_id'); if (silverHidEl) silverHidEl.value = String(silverIdVal);
        const silverNoEl = document.getElementById('hv_silver_acc_no_inp');
        if (silverNoEl){
          const acc = (accountsCache || []).find(x => Number(x.id) === Number(silverIdVal));
          silverNoEl.value = acc && acc.code != null ? String(acc.code) : '';
        }
      }
      // Fill lines
      const tb = hvLinesTable?.querySelector('tbody');
      if (tb){
        tb.innerHTML = '';
        if (Array.isArray(lines) && lines.length){
          lines.forEach(L => hv_addLine(L));
          hv_ensureMinimumRows();
        } else {
          hv_ensureMinimumRows();
        }
      }
      // update nav counter and disable states
      if (hvNavCounter && hvVoucherIds && hvVoucherIds.length){
        const pos = hvVoucherIds.findIndex(x=>x===Number(currentVoucherId || header.id || id));
        hvIndex = pos >= 0 ? pos : hvIndex;
        const { current, total } = getVoucherCounterDisplay();
        hvNavCounter.textContent = `${current} / ${total}`;
      } else if (hvNavCounter){ hvNavCounter.textContent = '0 / 0'; }
      const atStart = hvIndex <= 0;
      const atEnd = hvVoucherIds && hvIndex >= hvVoucherIds.length - 1;
      if (hvNavFirst) hvNavFirst.disabled = !!atStart;
      if (hvNavPrev)  hvNavPrev.disabled  = !!atStart;
      if (hvNavNext)  hvNavNext.disabled  = !!atEnd;
      if (hvNavLast)  hvNavLast.disabled  = !!atEnd;

      // Always revert to view mode after loading any voucher
      hvScreenMode = 'view';
      hvEditUnlockedForId = null;
      hv_setReadOnly(true);
      hvResetUnsaved();
      
      // Display user tracking info
      const trackingDiv = document.getElementById('hv_user_tracking_info');
      const createdInfo = document.getElementById('hv_created_info');
      const updatedInfo = document.getElementById('hv_updated_info');
      if (trackingDiv && createdInfo && updatedInfo) {
        let hasInfo = false;
        let allInfo = [];
        const isEnglish = getPVLang() === 'en';
        
        // Use username for English, full_name for Arabic
        const createdByDisplay = isEnglish 
          ? (header.created_by_username || header.created_by_name || '')
          : (header.created_by_name || header.created_by_username || '');
        const updatedByDisplay = isEnglish 
          ? (header.updated_by_username || header.updated_by_name || '')
          : (header.updated_by_name || header.updated_by_username || '');
        
        if (createdByDisplay || header.created_at) {
          hasInfo = true;
          let createdText = `<i class="fa-solid fa-user-plus" style="margin-inline-end:6px; color:#10b981;"></i> ${tPV('createdBy')} `;
          if (createdByDisplay) createdText += `<strong>${createdByDisplay}</strong>`;
          if (header.created_at) {
            const dateTimeStr = String(header.created_at).replace(' ', 'T');
            const createdDate = new Date(dateTimeStr);
            const dateStr = createdDate.toLocaleDateString('en-GB');
            const timeStr = createdDate.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit', hour12: false});
            createdText += ` <span style="color:var(--subtle);">${dateStr} ${timeStr}</span>`;
          }
          allInfo.push(createdText);
        }
        
        if (updatedByDisplay || header.updated_at) {
          hasInfo = true;
          let updatedText = `<i class="fa-solid fa-user-clock" style="margin-inline-end:6px; color:#f59e0b;"></i> ${tPV('lastModified')} `;
          if (updatedByDisplay) updatedText += `<strong>${updatedByDisplay}</strong>`;
          if (header.updated_at) {
            const dateTimeStr = String(header.updated_at).replace(' ', 'T');
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
      
      // Update self-reference hint after loading
      try{ hv_checkSelfReference(); }catch(_){ }
      
      return true; // تحميل ناجح
    }catch(err){ 
      
      return false; // فشل التحميل
    }
  }

  async function hv_navTo(pos){
    let ids = [];
    try{
      hvVoucherNavRecords = buildVoucherNavRecords(await hv_fetchVoucherIds());
      ids = hvVoucherNavRecords.map((row) => row.id);
    }catch(_){ ids = hvVoucherIds.slice(); }
    if (!ids.length){
      if (hvNavCounter) hvNavCounter.textContent = '0 / 0';
      if (hvNavFirst) hvNavFirst.disabled = true;
      if (hvNavPrev)  hvNavPrev.disabled  = true;
      if (hvNavNext)  hvNavNext.disabled  = true;
      if (hvNavLast)  hvNavLast.disabled  = true;
      return;
    }
    hvVoucherIds = ids;
    // Determine current index from nav input or header id
    const navVal = hvNavIdInp ? parseInt(hvNavIdInp.value,10) : NaN;
    const hdrVal = getVoucherInternalId();
    let idx = !isNaN(hdrVal) ? ids.findIndex(x=>x===hdrVal) : -1;
    if (idx < 0 && !isNaN(navVal)) {
      const targetIdByNav = findVoucherIdByNavNumber(navVal);
      idx = targetIdByNav > 0 ? ids.findIndex(x=>x===targetIdByNav) : -1;
    }
    if (idx < 0) idx = ids.length - 1; // default to last
    // Move
    if (pos === 'first') idx = 0;
    else if (pos === 'last') idx = ids.length - 1;
    else if (pos === 'prev') idx = Math.max(0, idx - 1);
    else if (pos === 'next') idx = Math.min(ids.length - 1, idx + 1);
    hvIndex = idx;
    let targetId = ids[idx];
    const beforeId = getVoucherInternalId() || targetId;
    await hv_loadVoucherById(targetId);
    // Fallback: if nothing changed (same id) and we have direction, probe sequentially using get()
    const dir = (pos==='prev') ? -1 : (pos==='next' ? 1 : 0);
    if (dir !== 0){
      const afterId = getVoucherInternalId() || targetId;
      if (afterId === beforeId){
        try{
          const v = getVoucherService();
          let probe = beforeId + dir;
          for (let i=0;i<25;i++){
            const r = await v.get(probe);
            if (r && r.success){ await hv_loadVoucherById(probe); break; }
            probe += dir;
          }
        }catch(_){ }
      }
    }
  }

  // Jump to specific id from input on Enter
  if (hvNavIdInp){
    hvNavIdInp.addEventListener('keydown', async (e)=>{
      if (e.key !== 'Enter') return;
      const v = parseInt(hvNavIdInp.value, 10);
      if (!v){ return; }
      try{
        const targetId = findVoucherIdByNavNumber(v);
        if (targetId > 0) {
          await hv_loadVoucherById(targetId, false);
          if (!hvVoucherIds.length) await hv_refreshIdsAndIndex(targetId);
          const idx = hvVoucherIds.findIndex(x=>x===targetId);
          if (idx >= 0) hvIndex = idx;
          return;
        }
        await hv_loadVoucherById(v, false, { lookupByBranchLocalNumber: true });
      }catch(_){ showToast('error', tPV('voucherNotFound')); }
    });
  }

  function hv_getNameByIds(custId, supId, accId){
    // الحساب: دعم الإدخال برقم الحساب الداخلي أو الكود (code)
    if (accId !== undefined && accId !== null && accId !== ''){
      const accStr = String(accId).trim();
      if (accStr){
        const a = (accountsCache || []).find(x => String(x.code) === accStr);
        if (a) return a.name || accStr;
      }
    }
    // العميل
    if (custId !== undefined && custId !== null && custId !== ''){
      const c = (customersCache || []).find(x => Number(x.id) === Number(custId));
      if (c) return c.name || c.full_name || c.company || `${c.id}`;
    }
    // المورد
    if (supId !== undefined && supId !== null && supId !== ''){
      const s = (suppliersCache || []).find(x => Number(x.id) === Number(supId));
      if (s) return s.name || s.full_name || s.company || `${s.id}`;
    }
    return '';
  }

  function hv_addLine(data={}){
    if (!hvLinesTable) return;
    const tb = hvLinesTable.querySelector('tbody');
    const tr = document.createElement('tr');
    const cid = data.customer_id ?? '';
    const sid = data.supplier_id ?? '';
    let aidCode = '';
    const rawAid = data.account_id ?? '';
    if (rawAid && accountsCache && Array.isArray(accountsCache)){
      const acc = accountsCache.find(x => Number(x.id) === Number(rawAid));
      if (acc && acc.code != null && acc.code !== ''){
        aidCode = String(acc.code);
      }
    }
    if (!aidCode && data.account_no){
      aidCode = String(data.account_no);
    }
    const nm = hv_getNameByIds(cid, sid, aidCode || '');
    const amt = data.amount ? formatNumberWithCommas(data.amount) : '';
    const w = data.weight ? formatNumberWithCommas(data.weight) : '';
    const karat = data.karat ?? '';
    const note = data.note ?? '';
    tr.innerHTML = `
      <td><input type="text" name="hv_customer_id" value="${cid}" placeholder="${tPV('f9Search')}" title="${tPV('f9Search')}" style="width:92px" inputmode="numeric"></td>
      <td><input type="text" name="hv_supplier_id" value="${sid}" placeholder="${tPV('f9Search')}" title="${tPV('f9Search')}" style="width:92px" inputmode="numeric"></td>
      <td><input type="text" name="hv_account_id" value="${aidCode}" placeholder="${tPV('f9Search')}" title="${tPV('f9Search')}" style="width:92px" inputmode="numeric"></td>
      <td><input type="text" name="hv_name" value="${nm}" readonly style="min-width:160px"></td>
      <td><input type="text" name="hv_amount" value="${amt}" placeholder="${tPV('amountPlaceholder')}"></td>
      <td><input type="text" name="hv_weight" value="${w}" placeholder="${tPV('weightPlaceholder')}"></td>
      <td><input type="text" name="hv_karat" value="${karat}" list="hv_karat_list" inputmode="numeric" style="width:80px" placeholder="${tPV('karatPlaceholder')}"></td>
      <td><input type="text" name="hv_note" value="${note}" style="min-width:160px" placeholder="${tPV('descPlaceholder')}"></td>
      <td class="row"><button type="button" class="icon-btn act-delete" title="${tPV('thRemove')}"><i class="fa-solid fa-xmark"></i></button></td>
    `;
    
    // Add formatting and arrow navigation to amount field
    const amountInput = tr.querySelector('input[name="hv_amount"]');
    if (amountInput) {
      amountInput.addEventListener('input', (e) => {
        let value = e.target.value;
        const cursorPos = e.target.selectionStart;
        
        // Count commas before cursor
        const beforeCursor = value.substring(0, cursorPos);
        const commasBefore = (beforeCursor.match(/,/g) || []).length;
        
        // Remove all non-numeric except decimal point
        value = value.replace(/[^\d.]/g, '');
        const parts = value.split('.');
        if (parts.length > 2) {
          value = parts[0] + '.' + parts.slice(1).join('');
        }
        
        if (value) {
          const formatted = formatNumberWithCommas(value);
          e.target.value = formatted;
          
          // Recalculate cursor position based on comma difference
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
        handleArrowNavigation(e, amountInput, 'hv_amount');
      });
    }
    
    // Add formatting and arrow navigation to weight field
    const weightInput = tr.querySelector('input[name="hv_weight"]');
    if (weightInput) {
      weightInput.addEventListener('input', (e) => {
        let value = e.target.value;
        const cursorPos = e.target.selectionStart;
        
        // Count commas before cursor
        const beforeCursor = value.substring(0, cursorPos);
        const commasBefore = (beforeCursor.match(/,/g) || []).length;
        
        // Remove all non-numeric except decimal point
        value = value.replace(/[^\d.]/g, '');
        const parts = value.split('.');
        if (parts.length > 2) {
          value = parts[0] + '.' + parts.slice(1).join('');
        }
        
        if (value) {
          const formatted = formatNumberWithCommas(value);
          e.target.value = formatted;
          
          // Recalculate cursor position based on comma difference
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
        handleArrowNavigation(e, weightInput, 'hv_weight');
      });
    }
    
    // Add numeric-only validation for ID fields
    ['hv_customer_id', 'hv_supplier_id', 'hv_account_id'].forEach(fieldName => {
      const input = tr.querySelector(`input[name="${fieldName}"]`);
      if (input) {
        input.addEventListener('input', (e) => {
          // Remove all non-numeric characters
          e.target.value = e.target.value.replace(/[^\d]/g, '');
        });
        input.addEventListener('keydown', (e) => {
          handleArrowNavigation(e, input, fieldName);
        });
      }
    });
    
    // Add arrow navigation to other non-numeric fields
    ['hv_karat', 'hv_note'].forEach(fieldName => {
      const input = tr.querySelector(`input[name="${fieldName}"]`);
      if (input) {
        input.addEventListener('keydown', (e) => {
          handleArrowNavigation(e, input, fieldName);
        });
      }
    });
    
    tb.appendChild(tr);
  }

  const HV_MIN_ROWS = 5;

  function hv_ensureMinimumRows(minRows = HV_MIN_ROWS){
    if (!hvLinesTable) return;
    const tb = hvLinesTable.querySelector('tbody');
    if (!tb) return;
    const currentRows = tb.querySelectorAll('tr').length;
    for (let i = currentRows; i < minRows; i++) {
      hv_addLine();
    }
  }

  function hv_resetToMinimumRows(minRows = HV_MIN_ROWS){
    if (!hvLinesTable) return;
    const tb = hvLinesTable.querySelector('tbody');
    if (!tb) return;
    tb.innerHTML = '';
    hv_ensureMinimumRows(minRows);
  }

  function hv_syncName(tr){
    const get = sel => tr.querySelector(sel)?.value || '';
    const cid = parseInt(get('input[name="hv_customer_id"]'), 10) || null;
    const sid = parseInt(get('input[name="hv_supplier_id"]'), 10) || null;
    const aidRaw = get('input[name="hv_account_id"]') || null;
    let label = '';
    if (aidRaw){
      // البحث بالـ code أو id
      const a = (accountsCache || []).find(x => String(x.code) === String(aidRaw));
      label = a ? (a.name || String(a.code || '')) : 'لا يوجد حساب بهذا الرقم';
    } else if (cid){
      const c = customersCache.find(x => Number(x.id) === Number(cid));
      label = c ? (c.name || c.full_name || c.company || String(c.id)) : 'لا يوجد عميل بهذا الرقم';
    } else if (sid){
      const s = suppliersCache.find(x => Number(x.id) === Number(sid));
      label = s ? (s.name || s.full_name || s.company || String(s.id)) : 'لا يوجد مورد بهذا الرقم';
    } else {
      label = '';
    }
    const nameInp = tr.querySelector('input[name="hv_name"]');
    if (nameInp) nameInp.value = label;
  }

  function hv_enforceExclusive(tr){
    const cInp = tr.querySelector('input[name="hv_customer_id"]');
    const sInp = tr.querySelector('input[name="hv_supplier_id"]');
    const aInp = tr.querySelector('input[name="hv_account_id"]');
    if (!cInp || !sInp || !aInp) return;
    // Keep all inputs enabled; clearing of others is handled by input handler
    cInp.disabled = false;
    sInp.disabled = false;
    aInp.disabled = false;
  }

  if (hvLinesTable){
    // Hint tooltip for exclusivity
    let hvHintEl = null;
    function ensureHint(){
      if (!hvHintEl){
        hvHintEl = document.createElement('div');
        hvHintEl.className = 'hv-hint';
        hvHintEl.setAttribute('role','status');
        hvHintEl.textContent = '';
        document.body.appendChild(hvHintEl);
      }
      return hvHintEl;
    }
    function showHint(msg, target){
      const el = ensureHint();
      el.textContent = msg;
      const r = target.getBoundingClientRect();
      const gap = 6;
      const top = Math.max(10, window.scrollY + r.top - el.offsetHeight - gap);
      const left = Math.min(window.scrollX + r.left, window.scrollX + window.innerWidth - 280);
      el.style.top = top + 'px';
      el.style.left = left + 'px';
      el.classList.add('show');
    }
    function hideHint(){ if (hvHintEl) hvHintEl.classList.remove('show'); }

    hvLinesTable.addEventListener('focusin', (e)=>{
      const inp = e.target;
      const name = inp.getAttribute('name');
      if (['hv_customer_id','hv_supplier_id','hv_account_id'].includes(name)){
        showHint(tPV('exclusiveIdHint'), inp);
      }
    });

    // Validate on blur: require valid lookup if non-empty
    hvLinesTable.addEventListener('blur', (e)=>{
      const inp = e.target;
      const tr = inp.closest('tr');
      if (!tr || !inp || !['INPUT'].includes(inp.tagName)) return;
      const nm = inp.getAttribute('name');
      if (!['hv_customer_id','hv_supplier_id','hv_account_id'].includes(nm)) return;
      const val = String(inp.value||'').trim();
      if (!val){ return; }
      const cid = nm==='hv_customer_id' ? parseInt(val,10) : null;
      const sid = nm==='hv_supplier_id' ? parseInt(val,10) : null;
      const aid = nm==='hv_account_id' ? val : null;
      const nameVal = hv_getNameByIds(cid, sid, aid);
      if (!nameVal){
        // show error hint and refocus
        const el = document.querySelector('.hv-hint') || (function(){ const d=document.createElement('div'); d.className='hv-hint'; document.body.appendChild(d); return d; })();
        let msg = 'لا يوجد حساب بهذا الرقم. تأكد من رقم الحساب.';
        if (cid !== null) msg = 'لا يوجد عميل بهذا الرقم. تأكد من رقم العميل.';
        if (sid !== null) msg = 'لا يوجد مورد بهذا الرقم. تأكد من رقم المورد.';
        el.textContent = msg;
        el.classList.add('error','show');
        const r = inp.getBoundingClientRect();
        const gap = 6;
        el.style.top = (window.scrollY + r.bottom + gap) + 'px';
        el.style.left = (window.scrollX + r.left) + 'px';
        setTimeout(()=>{ inp.focus(); inp.select && inp.select(); }, 0);
        e.preventDefault && e.preventDefault();
        e.stopPropagation && e.stopPropagation();
      }
    }, true);
    hvLinesTable.addEventListener('focusout', (e)=>{
      const inp = e.target;
      const name = inp.getAttribute('name');
      if (!['hv_customer_id','hv_supplier_id','hv_account_id'].includes(name)) return;
      const val = String(inp.value||'').trim();
      // Only hide hint if empty or valid; keep showing if invalid so user notices
      if (!val){ hideHint(); return; }
      const cid = name==='hv_customer_id' ? parseInt(val,10) : null;
      const sid = name==='hv_supplier_id' ? parseInt(val,10) : null;
      const aid = name==='hv_account_id' ? val : null;
      const okName = hv_getNameByIds(cid, sid, aid);
      if (okName){ hideHint(); }
    });
    document.addEventListener('keydown', (e)=>{ if (e.key === 'Escape') hideHint(); });
    const hvScroll = document.querySelector('.hv-lines-responsive');
    if (hvScroll){ hvScroll.addEventListener('scroll', hideHint, { passive: true }); }

    const allowedKarat = new Set(['24','22','21','18','999','925','900','800']);
    hvLinesTable.addEventListener('input', (e)=>{
      const inp = e.target;
      const tr = inp.closest('tr');
      if (!tr) return;
      const nm = inp.getAttribute('name');
      if (nm === 'hv_karat'){
        let v = String(inp.value||'').replace(/[^0-9]/g,'');
        if (v.length > 3) v = v.slice(0,3);
        inp.value = v;
        if ((v.length === 2 || v.length === 3) && !allowedKarat.has(v)){
          showHint('الذهب: 24، 22، 21، 18 | الفضة: 999، 925، 900، 800', inp);
        } else {
          hideHint();
        }
      }
      if (['hv_customer_id','hv_supplier_id','hv_account_id'].includes(nm)){
        // When editing one field, clear others and enforce exclusivity
        const cInp = tr.querySelector('input[name="hv_customer_id"]');
        const sInp = tr.querySelector('input[name="hv_supplier_id"]');
        const aInp = tr.querySelector('input[name="hv_account_id"]');
        if (nm === 'hv_customer_id' && cInp && cInp.value.trim() !== ''){ if (sInp){ sInp.value=''; } if (aInp){ aInp.value=''; } }
        if (nm === 'hv_supplier_id' && sInp && sInp.value.trim() !== ''){ if (cInp){ cInp.value=''; } if (aInp){ aInp.value=''; } }
        if (nm === 'hv_account_id' && aInp && aInp.value.trim() !== ''){ if (cInp){ cInp.value=''; } if (sInp){ sInp.value=''; } }
        hv_syncName(tr);
        // If now valid or empty, hide error hint
        const val = String(inp.value||'').trim();
        const cid = nm==='hv_customer_id' ? parseInt(val,10) : null;
        const sid = nm==='hv_supplier_id' ? parseInt(val,10) : null;
        const aid = nm==='hv_account_id' ? val : null;
        const okName = val ? hv_getNameByIds(cid, sid, aid) : '';
        if (!val || okName){ hideHint(); }
      }
    });
    // Validate karat on blur
    hvLinesTable.addEventListener('blur', (e)=>{
      const inp = e.target;
      if (!inp || inp.getAttribute('name') !== 'hv_karat') return;
      const v = String(inp.value||'').trim();
      if (!v) { hideHint(); return; }
      if (!allowedKarat.has(v)){
        showToast('error', tPV('karatOptions'));
        inp.value = '';
        setTimeout(()=> inp.focus(), 0);
      } else {
        hideHint();
      }
    }, true);

    // Enter-key navigation across voucher row fields
    const V_FIELD_ORDER = ['hv_customer_id','hv_supplier_id','hv_account_id','hv_amount','hv_weight','hv_karat','hv_note'];
    function vFocusNextInRow(tr, fromName){
      const idx = V_FIELD_ORDER.indexOf(fromName);
      if (idx === -1) return false;
      for (let i=idx+1;i<V_FIELD_ORDER.length;i++){
        const nxt = tr.querySelector(`input[name="${V_FIELD_ORDER[i]}"]`);
        if (nxt){ nxt.focus(); nxt.select && nxt.select(); return true; }
      }
      return false;
    }
    // Function to check if we should allow leaving account_id field
    function shouldAllowAccountIdNavigation(tr) {
      const customerId = String(tr.querySelector('input[name="hv_customer_id"]')?.value||'').trim();
      const supplierId = String(tr.querySelector('input[name="hv_supplier_id"]')?.value||'').trim();
      const accountId = String(tr.querySelector('input[name="hv_account_id"]')?.value||'').trim();
      
      // If account_id has a value, allow navigation
      if (accountId) return true;
      
      // If either customer or supplier has a value, allow navigation
      if (customerId || supplierId) return true;
      
      // Otherwise, show error and prevent navigation
      showToast('error', tPV('mustEnterParty'));
      const customerField = tr.querySelector('input[name="hv_customer_id"]');
      if (customerField) {
        customerField.focus();
        customerField.select();
      }
      return false;
    }
    
    // Function to get next field in tab order
    function getNextField(tr, currentField) {
      const fields = Array.from(tr.querySelectorAll('input[type="text"], input[type="number"]'));
      const currentIndex = fields.indexOf(currentField);
      if (currentIndex < fields.length - 1) {
        return fields[currentIndex + 1];
      }
      return null;
    }
    
    hvLinesTable.addEventListener('keydown', (e)=>{
      if (e.key !== 'Enter') return;
      const inp = e.target; if (!(inp && inp.tagName==='INPUT')) return;
      const tr = inp.closest('tr'); if (!tr) return;
      const nm = inp.getAttribute('name')||'';
      
      // Check if we're trying to leave account_id without required fields
      if (nm === 'hv_account_id') {
        if (!shouldAllowAccountIdNavigation(tr)) {
          // Prevent all navigation attempts
          e.stopPropagation();
          e.preventDefault();
          const accountField = tr.querySelector('input[name="hv_account_id"]');
          if (accountField) {
            accountField.focus();
            accountField.select();
          }
          return false;
        }
      }
      e.preventDefault();
      // Restrict navigation until one of ID fields is filled
      const ID_FIELDS = ['hv_customer_id','hv_supplier_id','hv_account_id'];
      const hasAnyId = ID_FIELDS.some(n => {
        const val = String(tr.querySelector(`input[name="${n}"]`)?.value||'').trim();
        // Special handling for account_id - only count it if customer/supplier is filled or it has a value
        if (n === 'hv_account_id') {
          const customerId = String(tr.querySelector('input[name="hv_customer_id"]')?.value||'').trim();
          const supplierId = String(tr.querySelector('input[name="hv_supplier_id"]')?.value||'').trim();
          return (customerId || supplierId || val) ? true : false;
        }
        return val !== '';
      });
      // If user is on customer/supplier/account and it has a value, jump straight to amount
      if (nm==='hv_customer_id' || nm==='hv_supplier_id' || nm==='hv_account_id'){
        const curVal = String(tr.querySelector(`input[name="${nm}"]`)?.value||'').trim();
        if (curVal){ 
          e.stopImmediatePropagation(); // Stop other handlers
          const amt = tr.querySelector('input[name="hv_amount"]'); 
          if (amt){ 
            setTimeout(() => {
              amt.focus(); 
              amt.select && amt.select(); 
            }, 0);
            return; 
          } 
        }
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
      if (vFocusNextInRow(tr, nm)) return;
      
      // End of row - check if next row exists
      const nextTr = tr.nextElementSibling;
      if (nextTr) {
        // Move to existing next row
        const first = nextTr.querySelector(`input[name="${V_FIELD_ORDER[0]}"]`);
        if (first){ first.focus(); first.select && first.select(); }
      } else {
        // No next row - add new row and focus its first field
        const tb = hvLinesTable.querySelector('tbody');
        // add new row via existing button logic
        try{ if (hvBtnAddLine) hvBtnAddLine.click(); else if (typeof hv_addLine==='function') hv_addLine(); }catch(_){ }
        const lastTr = tb ? tb.querySelector('tr:last-child') : null;
        const first = lastTr ? lastTr.querySelector(`input[name="${V_FIELD_ORDER[0]}"]`) : null;
        if (first){ first.focus(); first.select && first.select(); }
      }
    });

    function confirmDeleteRow(msg){
      return new Promise(resolve => {
        const modal = document.getElementById('confirmVDelModal');
        const m = document.getElementById('confirmVDelMsg');
        const y = document.getElementById('confirmVDelYes');
        const n = document.getElementById('confirmVDelNo');
        const c = document.getElementById('confirmVDelClose');
        const close = ()=>{ modal.setAttribute('aria-hidden','true'); cleanup(); };
        const cleanup = ()=>{ y.removeEventListener('click',onY); n.removeEventListener('click',onN); c.removeEventListener('click',onN); modal.querySelector('.modal-backdrop').removeEventListener('click',onN); };
        const onY = ()=>{ resolve(true); close(); };
        const onN = ()=>{ resolve(false); close(); };
        if (m) m.textContent = msg || 'هل أنت متأكد من حذف هذا السطر؟';
        y.addEventListener('click',onY); n.addEventListener('click',onN); c.addEventListener('click',onN); modal.querySelector('.modal-backdrop').addEventListener('click',onN);
        modal.setAttribute('aria-hidden','false');
      });
    }
    hvLinesTable.addEventListener('click', async (e)=>{
      const btn = e.target.closest('.act-delete');
      if (btn){
        const tr = btn.closest('tr');
        if (tr) tr.remove();
      }
    });

    // ===== F9 Customer Lookup =====
    const lcModal = document.getElementById('lookupCustomerModal');
    const lcClose = document.getElementById('lookupCustomerClose');
    const lcCancel = document.getElementById('lookupCustomerCancel');
    const lcSearch = document.getElementById('lc_search');
    const lcTbody = document.getElementById('lc_tbody');
    let lcActiveTr = null; // the grid row we're filling

    function openLcModal(tr){
      lcActiveTr = tr;
      renderLc(customersCache);
      if (lcSearch){ lcSearch.value=''; setTimeout(()=> lcSearch.focus(), 0); }
      if (lcModal) lcModal.setAttribute('aria-hidden','false');
    }
    function closeLcModal(){ lcActiveTr = null; if (lcModal) lcModal.setAttribute('aria-hidden','true'); }
    function renderLc(rows){
      if (!lcTbody) return;
      lcTbody.innerHTML = '';
      const data = Array.isArray(rows) ? rows : [];
      if (!data.length){ lcTbody.innerHTML = '<tr><td colspan="2" style="text-align:center;padding:10px">لا يوجد عملاء</td></tr>'; return; }
      for (const c of data){
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${c.id}</td><td>${c.name || c.full_name || c.company || ''}</td>`;
        tr.tabIndex = 0;
        tr.addEventListener('click', ()=> applyLcSelection(c));
        tr.addEventListener('keydown', (e)=>{ if (e.key==='Enter'){ applyLcSelection(c); }});
        lcTbody.appendChild(tr);
      }
    }
    function applyLcSelection(c){
      if (!lcActiveTr || !c) { closeLcModal(); return; }
      const cInp = lcActiveTr.querySelector('input[name="hv_customer_id"]');
      const sInp = lcActiveTr.querySelector('input[name="hv_supplier_id"]');
      const aInp = lcActiveTr.querySelector('input[name="hv_account_id"]');
      if (cInp){ cInp.value = c.id ?? ''; }
      if (sInp){ sInp.value = ''; }
      if (aInp){ aInp.value = ''; }
      hv_syncName(lcActiveTr);
      closeLcModal();
      if (cInp){ setTimeout(()=> cInp.focus(), 0); }
    }
    if (lcClose) lcClose.addEventListener('click', closeLcModal);
    if (lcCancel) lcCancel.addEventListener('click', closeLcModal);
    if (lcModal){ const bd = lcModal.querySelector('.modal-backdrop'); if (bd){ bd.addEventListener('click', closeLcModal); } }
    if (lcSearch){
      lcSearch.addEventListener('input', (e)=>{
        const q = (e.target.value||'').toLowerCase().trim();
        if (!q) { renderLc(customersCache); return; }
        const rows = (customersCache||[]).filter(c =>
          String(c.id).includes(q) ||
          String(c.name||c.full_name||c.company||'').toLowerCase().includes(q)
        );
        renderLc(rows);
      });
    }
    hvLinesTable.addEventListener('keydown', (e)=>{
      if (e.key === 'F9'){
        const inp = e.target;
        const tr = inp.closest('tr');
        if (inp && inp.getAttribute('name')==='hv_customer_id' && tr){
          e.preventDefault();
          openLcModal(tr);
        }
      }
    });
    
    // Right-click to open customer lookup (only when editable)
    hvLinesTable.addEventListener('contextmenu', (e)=>{
      const inp = e.target.closest('input');
      if (!inp) return;
      const tr = inp.closest('tr');
      if (!tr) return;
      // لا تفتح البحث في وضع العرض أو إذا كان الحقل مقفولاً
      if (hvScreenMode === 'view' || inp.disabled || inp.readOnly) return;
      if (inp.getAttribute('name')==='hv_customer_id'){
        e.preventDefault();
        openLcModal(tr);
      }
    });

    // ===== F9 Supplier Lookup =====
    const lsModal = document.getElementById('lookupSupplierModal');
    const lsClose = document.getElementById('lookupSupplierClose');
    const lsCancel = document.getElementById('lookupSupplierCancel');
    const lsSearch = document.getElementById('ls_search');
    const lsTbody = document.getElementById('ls_tbody');
    let lsActiveTr = null;

    function openLsModal(tr){
      lsActiveTr = tr;
      renderLs(suppliersCache);
      if (lsSearch){ lsSearch.value=''; setTimeout(()=> lsSearch.focus(), 0); }
      if (lsModal) lsModal.setAttribute('aria-hidden','false');
    }
    function closeLsModal(){ lsActiveTr = null; if (lsModal) lsModal.setAttribute('aria-hidden','true'); }
    function renderLs(rows){
      if (!lsTbody) return;
      lsTbody.innerHTML = '';
      const data = Array.isArray(rows) ? rows : [];
      if (!data.length){ lsTbody.innerHTML = '<tr><td colspan="2" style="text-align:center;padding:10px">لا يوجد موردين</td></tr>'; return; }
      for (const s of data){
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${s.id}</td><td>${s.name || s.full_name || s.company || ''}</td>`;
        tr.tabIndex = 0;
        tr.addEventListener('click', ()=> applyLsSelection(s));
        tr.addEventListener('keydown', (e)=>{ if (e.key==='Enter'){ applyLsSelection(s); }});
        lsTbody.appendChild(tr);
      }
    }
    function applyLsSelection(s){
      if (!lsActiveTr || !s) { closeLsModal(); return; }
      const cInp = lsActiveTr.querySelector('input[name="hv_customer_id"]');
      const sInp = lsActiveTr.querySelector('input[name="hv_supplier_id"]');
      const aInp = lsActiveTr.querySelector('input[name="hv_account_id"]');
      if (sInp){ sInp.value = s.id ?? ''; }
      if (cInp){ cInp.value = ''; }
      if (aInp){ aInp.value = ''; }
      hv_syncName(lsActiveTr);
      closeLsModal();
      if (sInp){ setTimeout(()=> sInp.focus(), 0); }
    }
    if (lsClose) lsClose.addEventListener('click', closeLsModal);
    if (lsCancel) lsCancel.addEventListener('click', closeLsModal);
    if (lsModal){ const bd = lsModal.querySelector('.modal-backdrop'); if (bd){ bd.addEventListener('click', closeLsModal); } }
    if (lsSearch){
      lsSearch.addEventListener('input', (e)=>{
        const q = (e.target.value||'').toLowerCase().trim();
        if (!q){ renderLs(suppliersCache); return; }
        const rows = (suppliersCache||[]).filter(s =>
          String(s.id).includes(q) ||
          String(s.name||s.full_name||s.company||'').toLowerCase().includes(q)
        );
        renderLs(rows);
      });
    }
    hvLinesTable.addEventListener('keydown', (e)=>{
      if (e.key === 'F9'){
        const inp = e.target;
        const tr = inp.closest('tr');
        if (inp && inp.getAttribute('name')==='hv_supplier_id' && tr){
          e.preventDefault();
          openLsModal(tr);
        }
      }
    });
    
    // Right-click to open supplier lookup (only when editable)
    hvLinesTable.addEventListener('contextmenu', (e)=>{
      const inp = e.target.closest('input');
      if (!inp) return;
      const tr = inp.closest('tr');
      if (!tr) return;
      if (hvScreenMode === 'view' || inp.disabled || inp.readOnly) return;
      if (inp.getAttribute('name')==='hv_supplier_id'){
        e.preventDefault();
        openLsModal(tr);
      }
    });

    // ===== F9 Account Lookup =====
    const laModal = document.getElementById('lookupAccountModal');
    const laClose = document.getElementById('lookupAccountClose');
    const laCancel = document.getElementById('lookupAccountCancel');
    const laSearch = document.getElementById('la_search');
    const laTbody = document.getElementById('la_tbody');
    let laActiveTr = null;

    function openLaModal(tr){
      laActiveTr = tr;
      renderLa(getVoucherLookupAccounts(accountsCache));
      if (laSearch){ laSearch.value=''; setTimeout(()=> laSearch.focus(), 0); }
      if (laModal) laModal.setAttribute('aria-hidden','false');
    }
    function closeLaModal(){ laActiveTr = null; if (laModal) laModal.setAttribute('aria-hidden','true'); }
    function renderLa(rows){
      if (!laTbody) return;
      laTbody.innerHTML = '';
      const data = Array.isArray(rows) ? rows : [];
      if (!data.length){ laTbody.innerHTML = '<tr><td colspan="2" style="text-align:center;padding:10px">لا يوجد حسابات</td></tr>'; return; }
      for (const a of data){
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${a.code||a.id}</td><td>${a.name || ''}</td>`;
        tr.tabIndex = 0;
        tr.addEventListener('click', ()=> applyLaSelection(a));
        tr.addEventListener('keydown', (e)=>{ if (e.key==='Enter'){ applyLaSelection(a); }});
        laTbody.appendChild(tr);
      }
    }
    function applyLaSelection(a){
      if (!laActiveTr || !a) { closeLaModal(); return; }
      const cInp = laActiveTr.querySelector('input[name="hv_customer_id"]');
      const sInp = laActiveTr.querySelector('input[name="hv_supplier_id"]');
      const aInp = laActiveTr.querySelector('input[name="hv_account_id"]');
      if (aInp){ aInp.value = a.code || ''; }
      if (cInp){ cInp.value = ''; }
      if (sInp){ sInp.value = ''; }
      hv_syncName(laActiveTr);
      closeLaModal();
      if (aInp){ setTimeout(()=> aInp.focus(), 0); }
    }
    if (laClose) laClose.addEventListener('click', closeLaModal);
    if (laCancel) laCancel.addEventListener('click', closeLaModal);
    if (laModal){ const bd = laModal.querySelector('.modal-backdrop'); if (bd){ bd.addEventListener('click', closeLaModal); } }
    if (laSearch){
      laSearch.addEventListener('input', (e)=>{
        const q = (e.target.value||'').toLowerCase().trim();
        const filtered = getVoucherLookupAccounts(accountsCache);
        if (!q){ renderLa(filtered); return; }
        const rows = filtered.filter(a =>
          String(a.code||a.id).includes(q) ||
          String(a.name||'').toLowerCase().includes(q)
        );
        renderLa(rows);
      });
    }
    hvLinesTable.addEventListener('keydown', (e)=>{
      if (e.key === 'F9'){
        const inp = e.target;
        const tr = inp.closest('tr');
        if (inp && inp.getAttribute('name')==='hv_account_id' && tr){
          e.preventDefault();
          openLaModal(tr);
        }
      }
    });
    
    // Right-click to open account lookup (only when editable)
    hvLinesTable.addEventListener('contextmenu', (e)=>{
      const inp = e.target.closest('input');
      if (!inp) return;
      const tr = inp.closest('tr');
      if (!tr) return;
      if (hvScreenMode === 'view' || inp.disabled || inp.readOnly) return;
      if (inp.getAttribute('name')==='hv_account_id'){
        e.preventDefault();
        openLaModal(tr);
      }
    });

    // ===== F9 for Cash Account Header Field =====
    const hvCashAccNoInp = document.getElementById('hv_cash_acc_no_inp');
    const hvCashAccSelect = document.getElementById('hv_cash_acc');
    const hvCashAccId = document.getElementById('hv_cash_acc_id');
    
    if (hvCashAccNoInp) {
      hvCashAccNoInp.addEventListener('keydown', (e) => {
        if (e.key === 'F9') {
          e.preventDefault();
          // Open account lookup and set header field as target
          if (laModal) {
            renderLa(getVoucherLookupAccounts(accountsCache));
            if (laSearch) { laSearch.value = ''; setTimeout(() => laSearch.focus(), 0); }
            laModal.setAttribute('aria-hidden', 'false');
            // Store reference to update header field
            laModal.dataset.targetField = 'hv_cash_acc';
          }
        } else if (e.key === 'Enter') {
          e.preventDefault();
          try { setHeaderByNumber(hvCashAccNoInp, hvCashAccSelect, hvCashAccId); } catch(_) { }
        }
      });
      hvCashAccNoInp.addEventListener('blur', () => {
        try { setHeaderByNumber(hvCashAccNoInp, hvCashAccSelect, hvCashAccId); } catch(_) { }
      });
    }

    // ===== F9 for Gold Account Header Field =====
    const hvGoldAccNoInp = document.getElementById('hv_gold_acc_no_inp');
    const hvGoldAccSelect = document.getElementById('hv_gold_acc');
    const hvGoldAccId = document.getElementById('hv_gold_acc_id');
    
    if (hvGoldAccNoInp) {
      hvGoldAccNoInp.addEventListener('keydown', (e) => {
        if (e.key === 'F9') {
          e.preventDefault();
          if (laModal) {
            renderLa(getVoucherLookupAccounts(accountsCache));
            if (laSearch) { laSearch.value = ''; setTimeout(() => laSearch.focus(), 0); }
            laModal.setAttribute('aria-hidden', 'false');
            laModal.dataset.targetField = 'hv_gold_acc';
          }
        } else if (e.key === 'Enter') {
          e.preventDefault();
          try { setHeaderByNumber(hvGoldAccNoInp, hvGoldAccSelect, hvGoldAccId); } catch(_) { }
        }
      });
      hvGoldAccNoInp.addEventListener('blur', () => {
        try { setHeaderByNumber(hvGoldAccNoInp, hvGoldAccSelect, hvGoldAccId); } catch(_) { }
      });
    }

    // ===== F9 for Silver Account Header Field =====
    const hvSilverAccNoInp = document.getElementById('hv_silver_acc_no_inp');
    const hvSilverAccSelect = document.getElementById('hv_silver_acc');
    const hvSilverAccId = document.getElementById('hv_silver_acc_id');
    
    if (hvSilverAccNoInp) {
      hvSilverAccNoInp.addEventListener('keydown', (e) => {
        if (e.key === 'F9') {
          e.preventDefault();
          if (laModal) {
            renderLa(getVoucherLookupAccounts(accountsCache));
            if (laSearch) { laSearch.value = ''; setTimeout(() => laSearch.focus(), 0); }
            laModal.setAttribute('aria-hidden', 'false');
            laModal.dataset.targetField = 'hv_silver_acc';
          }
        } else if (e.key === 'Enter') {
          e.preventDefault();
          try { setHeaderByNumber(hvSilverAccNoInp, hvSilverAccSelect, hvSilverAccId); } catch(_) { }
        }
      });
      hvSilverAccNoInp.addEventListener('blur', () => {
        try { setHeaderByNumber(hvSilverAccNoInp, hvSilverAccSelect, hvSilverAccId); } catch(_) { }
      });
    }

    // Modify applyLaSelection to handle header fields
    const originalApplyLa = applyLaSelection;
    applyLaSelection = function(a) {
      // Check if we're applying to header field
      if (laModal && laModal.dataset.targetField) {
        const targetField = laModal.dataset.targetField;
        
        if (targetField === 'hv_cash_acc' && hvCashAccNoInp && hvCashAccSelect && hvCashAccId) {
          hvCashAccNoInp.value = a.code || '';
          hvCashAccId.value = a.id ?? '';
          // Update select to show the selected account
          if (hvCashAccSelect.querySelector(`option[value="${a.id}"]`)) {
            hvCashAccSelect.value = String(a.id);
          }
          delete laModal.dataset.targetField;
          closeLaModal();
          setTimeout(() => hvCashAccNoInp.focus(), 0);
          // Trigger self-reference check
          try { hv_checkSelfReference(); } catch(_) { }
          return;
        }
        
        if (targetField === 'hv_gold_acc' && hvGoldAccNoInp && hvGoldAccSelect && hvGoldAccId) {
          hvGoldAccNoInp.value = a.code || '';
          hvGoldAccId.value = a.id ?? '';
          if (hvGoldAccSelect.querySelector(`option[value="${a.id}"]`)) {
            hvGoldAccSelect.value = String(a.id);
          }
          delete laModal.dataset.targetField;
          closeLaModal();
          setTimeout(() => hvGoldAccNoInp.focus(), 0);
          try { hv_checkSelfReference(); } catch(_) { }
          return;
        }
        
        if (targetField === 'hv_silver_acc' && hvSilverAccNoInp && hvSilverAccSelect && hvSilverAccId) {
          hvSilverAccNoInp.value = a.code || '';
          hvSilverAccId.value = a.id ?? '';
          if (hvSilverAccSelect.querySelector(`option[value="${a.id}"]`)) {
            hvSilverAccSelect.value = String(a.id);
          }
          delete laModal.dataset.targetField;
          closeLaModal();
          setTimeout(() => hvSilverAccNoInp.focus(), 0);
          try { hv_checkSelfReference(); } catch(_) { }
          return;
        }
        
        delete laModal.dataset.targetField;
      }
      
      // Call original function for table rows
      originalApplyLa(a);
    };

    // Trigger self-reference check when grid changes
    hvLinesTable.addEventListener('input', ()=>{ try{ hv_checkSelfReference(); }catch(_){ } });
  }
  // Also watch header cash/gold account changes
  const hvCashIdEl = document.getElementById('hv_cash_acc_id');
  const hvGoldIdEl = document.getElementById('hv_gold_acc_id');
  const hvCashSel  = document.getElementById('hv_cash_acc');
  const hvGoldSel  = document.getElementById('hv_gold_acc');
  if (hvCashIdEl){ hvCashIdEl.addEventListener('input', ()=>{ try{ hv_checkSelfReference(); }catch(_){ } }); }
  if (hvGoldIdEl){ hvGoldIdEl.addEventListener('input', ()=>{ try{ hv_checkSelfReference(); }catch(_){ } }); }
  if (hvCashSel){ hvCashSel.addEventListener('change', ()=>{ try{ hv_checkSelfReference(); }catch(_){ } }); }
  if (hvGoldSel){ hvGoldSel.addEventListener('change', ()=>{ try{ hv_checkSelfReference(); }catch(_){ } }); }

  // Detect self-reference operation and toggle pretty hint
  function hv_checkSelfReference(){
    const hint = document.getElementById('hv_self_hint');
    const chipId = 'hv_self_chip';
    let chip = document.getElementById(chipId);
    if (!hvLinesTable) return;
    let cashId = parseInt((document.getElementById('hv_cash_acc_id')?.value)||'',10);
    let goldId = parseInt((document.getElementById('hv_gold_acc_id')?.value)||'',10);
    if (!Number.isFinite(cashId) || !cashId){
      const v = document.getElementById('hv_cash_acc')?.value; cashId = v ? parseInt(v,10) : null;
    }
    if (!Number.isFinite(goldId) || !goldId){
      const v = document.getElementById('hv_gold_acc')?.value; goldId = v ? parseInt(v,10) : null;
    }
    const rows = Array.from(hvLinesTable.querySelectorAll('tbody tr'));
    let selfFound = false;
    let targetNameCell = null;
    for (const tr of rows){
      const aid = parseInt(tr.querySelector('input[name="hv_account_id"]')?.value||'',10) || null;
      const amt = parseFloat(tr.querySelector('input[name="hv_amount"]')?.value.replace(/,/g, '')||'0') || 0;
      const w   = parseFloat(tr.querySelector('input[name="hv_weight"]')?.value.replace(/,/g, '')||'0') || 0;
      if (aid && ((cashId && aid===cashId) || (goldId && aid===goldId)) && (amt>0 || w>0)){
        selfFound = true;
        targetNameCell = tr.querySelector('input[name="hv_name"]') || tr;
        break;
      }
    }
    if (hint) hint.style.display = selfFound ? 'block' : 'none';
    // Handle red capsule chip under name cell
    if (selfFound && targetNameCell){
      if (!chip){
        chip = document.createElement('div');
        chip.id = chipId; chip.className = 'self-chip';
        chip.innerHTML = '<span>عملية ذاتية للحساب — لا تؤثر على الرصيد</span><span class="x" title="إخفاء">✕</span>';
        document.body.appendChild(chip);
        chip.querySelector('.x').addEventListener('click', ()=>{ chip.style.display='none'; });
      }
      const r = targetNameCell.getBoundingClientRect();
      const gap = 6; const top = window.scrollY + r.bottom + gap; const left = Math.min(window.scrollX + r.left, window.scrollX + window.innerWidth - 320);
      chip.style.top = top + 'px'; chip.style.left = left + 'px'; chip.style.display = 'flex';
    } else if (chip){ chip.style.display = 'none'; }
  }
  if (hvBtnAddLine){ hvBtnAddLine.addEventListener('click', ()=> hv_addLine()); }
  
  // Copy memo to all non-empty lines in voucher
  const hvBtnCopyMemo = document.getElementById('hv_btnCopyMemo');
  const hvMemoField = document.getElementById('hv_memo');
  if (hvBtnCopyMemo && hvMemoField) {
    hvBtnCopyMemo.addEventListener('click', () => {
      const memoText = hvMemoField.value.trim();
      if (!memoText) {
        showToast('error', tPV('enterDate'));
        return;
      }
      
      let copiedCount = 0;
      const tbody = hvLinesTable?.querySelector('tbody');
      if (tbody) {
        tbody.querySelectorAll('tr').forEach(row => {
          const customerId = row.querySelector('input[name="hv_customer_id"]')?.value;
          const supplierId = row.querySelector('input[name="hv_supplier_id"]')?.value;
          const accountId = row.querySelector('input[name="hv_account_id"]')?.value;
          
          if (customerId || supplierId || accountId) {
            const noteInput = row.querySelector('input[name="hv_note"]');
            if (noteInput) {
              noteInput.value = memoText;
              copiedCount++;
            }
          }
        });
      }
      
      if (copiedCount > 0) {
        showToast('success', `${tPV('memoCopied')} ${copiedCount} ${tPV('lines')}`);
      } else {
        showToast('error', tPV('noLinesToCopy'));
      }
    });
  }
  
  // New voucher: clear and set defaults
  async function hv_getNextVoucherId(){
    try{
      await waitForVoucher();
      const v = getVoucherService();
      if (v && typeof v.getNextId === 'function'){
        const r = await v.getNextId();
        if (r && r.success && r.nextId){ return parseInt(r.nextId,10) || 1; }
      }
    }catch(_){ }
    return 1;
  }
  async function hv_newVoucher(){
    const idEl = document.getElementById('hv_id');
    const dateEl = document.getElementById('hv_date');
    const memoEl = document.getElementById('hv_memo');
    const cashSel = document.getElementById('hv_cash_acc_id');
    const goldSel = document.getElementById('hv_gold_acc_id');
    const cashNoInp = document.getElementById('hv_cash_acc_no_inp');
    const goldNoInp = document.getElementById('hv_gold_acc_no_inp');
    const cashSelect = document.getElementById('hv_cash_acc');
    const goldSelect = document.getElementById('hv_gold_acc');
    const tb = document.querySelector('#hv_linesTable tbody');
    hvScreenMode = 'new';
    hvEditUnlockedForId = null;
    currentVoucherId = null;
    hv_setReadOnly(false);

    // Compute nextId strictly from DB via IPC (fills gaps after deletions)
    let nextId = await hv_getNextVoucherId();
    const navInp = document.getElementById('hv_nav_id');
    if (idEl) idEl.value = nextId;
    if (navInp) navInp.value = '';
    // Use local date (not UTC) to avoid showing yesterday's date
    if (dateEl) { const d = new Date(); dateEl.value = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0'); }
    if (hvTimeInp){ const now = new Date(); hvTimeInp.value = now.toTimeString().slice(0,5); }
    if (memoEl) memoEl.value = '';
    // Reset selects to defaults (like receipt screen)
    await populateHvAccountSelects();
    // Reset lines - default 4 rows
    if (tb){ 
      hv_resetToMinimumRows();
    }
    // Focus memo field in header instead of grid to avoid hint popup
    setTimeout(()=>{
      try{ document.getElementById('hv_memo')?.focus(); }catch(_){ }
      try{ const h = document.querySelector('.hv-hint'); if (h){ h.classList.remove('show'); } }catch(_){ }
    }, 0);
    // No delayed recompute; rely on DB next-id and current context only
  }
  if (btnNew){ btnNew.addEventListener('click', hv_newVoucher); }

  if (hvBtnEditTop){
    hvBtnEditTop.addEventListener('click', async () => {
      const curId = getVoucherInternalId();
      if (!curId){
        showToast('error', tPV('noVoucherToEdit'));
        return;
      }
      if (hvScreenMode !== 'view') return;
      if (window.ScreenPermissions && !window.ScreenPermissions.check('vouchers_edit', 'تعديل سند صرف')) {
        return;
      }
      const confirmFn = window.confirmEditWithPassword || window.parent?.confirmEditWithPassword || window.top?.confirmEditWithPassword;
      if (confirmFn) {
        try {
          const confirmed = await confirmFn();
          if (!confirmed) return;
        } catch(e){
          if (e.message !== 'cancelled') {
          }
          return;
        }
      }
      hvScreenMode = 'edit';
      hvEditUnlockedForId = curId;
      hv_setReadOnly(false);
    });
  }

  async function saveHeaderAndGrid(){
    const ready = await waitForVoucher();
    if (!ready){ showToast('error', tPV('apiNotReady')); return; }
    if (voucherSaveInFlight) return;
    voucherSaveInFlight = true;
    if (hvBtnSaveTop) hvBtnSaveTop.disabled = true;
    try {
      const curId = getVoucherInternalId();
      const displayId = getVoucherDisplayNumber();
      const isEditingExisting = (hvScreenMode === 'edit');

      if (isEditingExisting) {
        if (window.ScreenPermissions && !window.ScreenPermissions.check('vouchers_edit', 'تعديل سند صرف')) {
          return;
        }
        if (hvEditUnlockedForId !== curId) {
          showToast('error', tPV('editNotEnabled'));
          return;
        }
      } else {
        if (window.ScreenPermissions && !window.ScreenPermissions.check('vouchers_add', 'إضافة سند صرف')) {
          return;
        }
      }

      if (hvTimeInp){ const now = new Date(); hvTimeInp.value = now.toTimeString().slice(0,5); }
      const currentUserId = getCurrentUserId();
      const header = {
        date: document.getElementById('hv_date')?.value || (()=>{ const d=new Date(); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); })(),
        time: hvTimeInp ? (hvTimeInp.value || null) : null,
        note: document.getElementById('hv_memo')?.value?.trim() || '',
        cash_account_id: parseInt(document.getElementById('hv_cash_acc_id')?.value || '0', 10) || null,
        gold_account_id: parseInt(document.getElementById('hv_gold_acc_id')?.value || '0', 10) || null,
        silver_account_id: parseInt(document.getElementById('hv_silver_acc_id')?.value || '0', 10) || null
      };

      if (isEditingExisting) {
        header.updated_by = currentUserId;
      } else {
        header.created_by = currentUserId;
      }

      const lines = [];
      let invalidEl = null;
      let invalidMsg = '';
      let needKaratEl = null;
      if (hvLinesTable){
        hvLinesTable.querySelectorAll('tbody tr').forEach(tr => {
          const get = sel => tr.querySelector(sel)?.value || '';
          const cid = get('input[name="hv_customer_id"]');
          const sid = get('input[name="hv_supplier_id"]');
          const aidRaw = get('input[name="hv_account_id"]');
          const nm  = get('input[name="hv_name"]');
          const amt = get('input[name="hv_amount"]');
          const w   = get('input[name="hv_weight"]');
          const kar = get('input[name="hv_karat"]');
          const nt  = get('input[name="hv_note"]');

          let resolvedAid = null;
          if (aidRaw){
            const acc = (accountsCache || []).find(x => String(x.code) === String(aidRaw));
            if (acc && acc.id != null){
              resolvedAid = acc.id;
            }
          }

          if (!invalidEl){
            if (cid){ const ok = !!(customersCache||[]).find(x=>Number(x.id)===parseInt(cid,10)); if (!ok){ invalidEl = tr.querySelector('input[name="hv_customer_id"]'); invalidMsg = 'لا يوجد عميل بهذا الرقم. تأكد من رقم العميل.'; } }
            if (!invalidEl && sid){ const ok = !!(suppliersCache||[]).find(x=>Number(x.id)===parseInt(sid,10)); if (!ok){ invalidEl = tr.querySelector('input[name="hv_supplier_id"]'); invalidMsg = 'لا يوجد مورد بهذا الرقم. تأكد من رقم المورد.'; } }
            if (!invalidEl && aidRaw && !resolvedAid){ invalidEl = tr.querySelector('input[name="hv_account_id"]'); invalidMsg = 'لا يوجد حساب بهذا الرقم. تأكد من رقم الحساب.'; }
          }

          const weightNum = w ? parseFloat(w.replace(/,/g, '')) : 0;
          const karStr = String(kar||'').trim();
          if (!needKaratEl && weightNum > 0 && !karStr){
            needKaratEl = tr.querySelector('input[name="hv_karat"]');
          }

          if (!cid && !sid && !aidRaw) {
            if (amt || w || kar || nt) {
              if (!invalidEl) {
                invalidEl = tr.querySelector('input[name="hv_customer_id"]');
                invalidMsg = 'يجب إدخال رقم العميل أو المورد أو الحساب في كل سطر';
              }
            }
          } else {
            lines.push({
              customer_id: cid ? parseInt(cid,10) : null,
              supplier_id: sid ? parseInt(sid,10) : null,
              account_id: resolvedAid,
              name: nm || null,
              amount: amt ? parseFloat(amt.replace(/,/g, '')) : 0,
              weight: w ? parseFloat(w.replace(/,/g, '')) : 0,
              karat: kar || null,
              note: nt || ''
            });
          }
        });
      }

      if (invalidEl){ showToast('error', invalidMsg || tPV('invalidValue')); setTimeout(()=>{ try{ invalidEl.focus(); invalidEl.select && invalidEl.select(); }catch(_){ } }, 0); return; }
      if (needKaratEl){
        showToast('error', tPV('karatRequired'));
        setTimeout(()=>{ try{ needKaratEl.focus(); needKaratEl.select && needKaratEl.select(); }catch(_){ } }, 0);
        return;
      }
      if (!lines.length){
        showToast('error', tPV('addAtLeastOneLine'));
        return;
      }

      const payload = { ...header, lines };
      const va = getVoucherService();
      let res = null;
      if (isEditingExisting) {
        if (!va || typeof va.update !== 'function') {
          showToast('error', tPV('apiNotReady'));
          return;
        }
        res = await va.update({ ...payload, id: curId, branch_local_number: displayId || null });
      } else {
        if (!va || typeof va.add !== 'function') {
          showToast('error', tPV('apiNotReady'));
          return;
        }
        res = await va.add({ ...payload, branch_local_number: displayId || null });
      }

      if (res && res.success){
        const newId = res.id || res.voucher_id || res.insertId || curId;
        const idNum = parseInt(newId,10);
        const displayNum = parseInt(res.branch_local_number ?? displayId ?? document.getElementById('hv_id')?.value, 10);
        currentVoucherId = Number.isFinite(idNum) && idNum > 0 ? idNum : null;
        const idEl = document.getElementById('hv_id'); if (idEl && Number.isFinite(displayNum) && displayNum > 0) idEl.value = displayNum;
        if (!isEditingExisting && Number.isFinite(idNum) && idNum > 0) {
          try {
            window.parent?.postMessage({
              type: 'daily-ops-notification',
              entityType: 'voucher',
              documentId: idNum,
              userName: getCurrentUserDisplayName(),
            }, '*');
          } catch (_) {}
        }

        showToast('success', isEditingExisting ? tPV('voucherUpdated') : tPV('voucherSaved'));
        await hv_refreshIdsAndIndex(Number.isFinite(idNum) ? idNum : undefined);

        if (Number.isFinite(idNum)) {
          await new Promise(resolve => setTimeout(resolve, 100));
          await hv_loadVoucherById(idNum);
          hvScreenMode = 'view';
          hvEditUnlockedForId = null;
          hv_setReadOnly(true);
        }
      } else {
        if (res && res.branchReadOnly && window.handleBranchReadOnlyResponse) {
          window.handleBranchReadOnlyResponse(res);
        } else if (res && res.debtLimitExceeded && window.handleDebtLimitResponse) {
          window.handleDebtLimitResponse(res);
        } else if (res && res.inactiveEntity && window.handleInactiveEntityResponse) {
          window.handleInactiveEntityResponse(res);
        } else {
          showToast('error', (res && res.error) ? String(res.error) : tPV('saveFailed'));
        }
      }
    } catch(err){
      showToast('error', tPV('saveFailed'));
    } finally {
      voucherSaveInFlight = false;
      if (hvBtnSaveTop) hvBtnSaveTop.disabled = (hvScreenMode === 'view');
    }
  }
  if (hvBtnSaveTop){ hvBtnSaveTop.addEventListener('click', saveHeaderAndGrid); }

  async function hv_deleteCurrent(){
    try {
      const id = getVoucherInternalId();
      if (!id) { showToast('error', tPV('noVoucherToDelete')); return; }
      const voucherService = getVoucherService();
      if (!voucherService?.remove) { showToast('error', tPV('apiNotReady')); return; }
      
      // طلب تأكيد كلمة المرور للحذف
      const confirmFn = window.confirmDeleteWithPassword || window.parent?.confirmDeleteWithPassword || window.top?.confirmDeleteWithPassword;
      if (confirmFn) {
        try {
          const confirmed = await confirmFn();
          if (!confirmed) {
            closeVoucherDel();
            return;
          }
        } catch (e) {
          if (e.message !== 'cancelled') {
            // Silent error handling
          }
          closeVoucherDel();
          return;
        }
      }
      
      // Show loading state
      if (hvDelYes) hvDelYes.disabled = true;
      if (hvDelMsg) hvDelMsg.textContent = 'جاري حذف السند...';
      
      const res = await voucherService.remove({
        id,
        actorUserId: getCurrentUserId(),
        actorName: getCurrentUserDisplayName(),
      });
      
      if (res && res.success) { 
        showToast('success', tPV('voucherDeleted'));
        
        // تحديث القائمة
        await hv_refreshIdsAndIndex();
        
        // انتظار قصير ثم تحميل السند التالي
        await new Promise(resolve => setTimeout(resolve, 100));
        
        if (hvVoucherIds && hvVoucherIds.length > 0) { 
          hvIndex = Math.min(hvIndex, hvVoucherIds.length - 1);
          const nextId = hvVoucherIds[hvIndex];
          if (nextId) {
            try {
              await hv_loadVoucherById(nextId);
            } catch (e) {
              
              await hv_newVoucher();
            }
          } else {
            await hv_newVoucher();
          }
        } else { 
          await hv_newVoucher(); 
        }
      } else { 
        showToast('error', res && res.error ? res.error : tPV('deleteFailed2')); 
      }
    } catch (err) { 
      
      showToast('error', tPV('deleteError')); 
    } finally {
      // Reset modal state
      if (hvDelYes) hvDelYes.disabled = false;
      if (hvDelMsg) hvDelMsg.textContent = 'هل أنت متأكد من حذف سند الصرف؟';
      closeVoucherDel();
    }
  }

  // Header delete with confirm modal
  const hvDelModal = document.getElementById('confirmVoucherDelModal');
  const hvDelMsg = document.getElementById('confirmVoucherDelMsg');
  const hvDelYes = document.getElementById('confirmVoucherDelYes');
  const hvDelNo  = document.getElementById('confirmVoucherDelNo');
  const hvDelClose = document.getElementById('confirmVoucherDelClose');
  function openVoucherDel(){ if (hvDelMsg) hvDelMsg.textContent = 'هل أنت متأكد من حذف سند الصرف؟'; if (hvDelModal) hvDelModal.setAttribute('aria-hidden','false'); }
  function closeVoucherDel(){ if (hvDelModal) hvDelModal.setAttribute('aria-hidden','true'); }
  if (hvBtnDeleteTop) {
    hvBtnDeleteTop.addEventListener('click', async (e) => { 
      e.preventDefault();

      const curId = getVoucherInternalId();

      // في وضع التعديل: زر حذف يعمل كإلغاء للتعديل (إعادة تحميل السند الحالي)
      if (hvScreenMode === 'edit' && curId) {
        try {
          await hv_loadVoucherById(curId, false);
        } catch(_){ }
        hvScreenMode = 'view';
        hvEditUnlockedForId = null;
        hv_setReadOnly(true);
        return;
      }

      // في وضع "سند جديد": زر حذف يعمل كإلغاء وإنهاء العملية الجديدة
      if (hvScreenMode === 'new') {
        try {
          await hv_refreshIdsAndIndex();
        } catch(_){ }
        if (hvVoucherIds && hvVoucherIds.length > 0) {
          // الرجوع لآخر سند موجود
          const lastId = hvVoucherIds[hvVoucherIds.length - 1];
          if (lastId) {
            try { await hv_loadVoucherById(lastId, false); } catch(_){ }
          }
        } else {
          // لا توجد سندات: تفريغ النموذج وإعادته لوضع عرض مقفول مع أسطر افتراضية
          const idEl = document.getElementById('hv_id');
          const dateEl = document.getElementById('hv_date');
          const memoEl = document.getElementById('hv_memo');
          if (idEl) idEl.value = '';
          currentVoucherId = null;
          if (dateEl) dateEl.value = '';
          if (memoEl) memoEl.value = '';
          const tb = hvLinesTable?.querySelector('tbody');
          if (tb) {
            hv_resetToMinimumRows();
          }
          if (hvNavIdInp) hvNavIdInp.value = '';
          if (hvNavCounter) hvNavCounter.textContent = '0 / 0';
        }
        hvScreenMode = 'view';
        hvEditUnlockedForId = null;
        hv_setReadOnly(true);
        return;
      }

      // وضع العرض العادي: تنفيذ حذف فعلي مع المودال
      if (!curId) {
        showToast('error', tPV('noVoucherToDelete'));
        return;
      }

      // ✅ Check delete permission BEFORE opening confirmation modal
      if (window.ScreenPermissions && !window.ScreenPermissions.check('vouchers_delete', 'حذف سند صرف')) {
        return;
      }

      openVoucherDel();
    });
  }
  
  if (hvDelYes) {
    hvDelYes.addEventListener('click', async () => {
      await hv_deleteCurrent();
    });
  }
  if (hvDelNo) hvDelNo.addEventListener('click', closeVoucherDel);
  if (hvDelClose) hvDelClose.addEventListener('click', closeVoucherDel);
  // إغلاق المودال عند النقر على الخلفية
  if (hvDelModal) {
    const backdrop = hvDelModal.querySelector('.modal-backdrop');
    if (backdrop) backdrop.addEventListener('click', closeVoucherDel);
  }
  
  // Journal View Button
  if (hvBtnJournalView) {
    hvBtnJournalView.addEventListener('click', () => {
      const id = getVoucherInternalId();
      const displayId = getVoucherDisplayNumber() || id;
      if (!id) {
        showToast('error', 'يجب حفظ السند أولاً');
        return;
      }
      if (typeof showAutoJournalModal === 'function') {
        showAutoJournalModal('voucher', id, `صورة الحركة - سند صرف رقم ${displayId}`);
      } else {
        showToast('error', 'مكون صورة الحركة غير متوفر');
      }
    });
  }
  
  if (hvBtnPrintTop){ hvBtnPrintTop.addEventListener('click', async ()=>{
    // Check print permission
    if (window.ScreenPermissions && !window.ScreenPermissions.check('vouchers_print', 'طباعة سند صرف')) {
      return;
    }
    
    try{
      const id = getVoucherInternalId();
      const displayId = getVoucherDisplayNumber() || id;
      if (!id) {
        showToast('error', tPV('saveFirst'));
        return;
      }
      const v = getVoucherService();
      if (!v || typeof v.get !== 'function') {
        showToast('error', tPV('apiNotReady'));
        return;
      }
      if (id && v && typeof v.get === 'function'){
        const r = await v.get(id);
        if (!r || !r.success){
          showToast('error', tPV('loadFailed'));
          return;
        }
        if (r && r.success){
          const data = r.data || { header:{}, lines:[] };
          const hdr = data.header || {};
          const lines = Array.isArray(data.lines) ? data.lines : [];
          // Load company info (logo + details)
          let company = {};
          try{ 
            const api = getVoucherApiRoot();
            const sys = getVoucherSysRoot();
            let cr = null;
            if (api && typeof api.getCompanyInfo === 'function') { cr = await api.getCompanyInfo(); }
            else if (sys && typeof sys.getCompanyInfo === 'function') { cr = await sys.getCompanyInfo(); }
            if (cr && cr.success) company = cr.company || cr.data || {};
          }catch(_){ }
          const companyHeaderHTML = buildCompanyHeaderForPrint(company, true);
          const logoUrl = (company && company.logoData) ? company.logoData : (company && company.logo ? ('file:///' + String(company.logo).replace(/\\/g,'/')) : '');
          // Derive payee from first row (account/customer/supplier)
          const first = lines[0] || {};
          const accountList = Array.isArray(accountsCache) ? accountsCache : [];
          let payeeName = '', payeeNo = '', payeeAddr = '', payeePhone = '', payeeTax = '';
          try{
            if (first.customer_id){
              const c = (Array.isArray(customersCache)?customersCache:[]).find(x=> Number(x.id) === Number(first.customer_id));
              payeeName = c ? (c.name || c.full_name || c.company || String(c.id)) : '';
              payeeNo = String(first.customer_id||'');
              payeeAddr = c ? (c.address || c.city || c.region || '') : '';
              payeePhone = c ? (c.phone || c.mobile || '') : '';
              payeeTax = c ? (c.tax_no || c.tax || '') : '';
            } else if (first.supplier_id){
              const s = (Array.isArray(suppliersCache)?suppliersCache:[]).find(x=> Number(x.id) === Number(first.supplier_id));
              payeeName = s ? (s.name || s.full_name || s.company || String(s.id)) : '';
              payeeNo = String(first.supplier_id||'');
              payeeAddr = s ? (s.address || s.city || s.region || '') : '';
              payeePhone = s ? (s.phone || s.mobile || '') : '';
              payeeTax = s ? (s.tax_no || s.tax || '') : '';
            } else if (first.account_id){
              const a = accountList.find(x=> Number(x.id) === Number(first.account_id));
              payeeName = a ? (a.name || String(a.code || a.id)) : '';
              const storedAccountNo = first.account_no != null ? String(first.account_no).trim() : '';
              payeeNo = storedAccountNo || (a && a.code != null ? String(a.code) : String(first.account_id||''));
            }
          }catch(_){ }
          // Totals
          const nf2 = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          const sumCash = lines.reduce((s,L)=> s + (Number(L.amount)||0), 0);
          const goldByKarat = { '18':0, '21':0, '22':0, '24':0 };
          for (const L of lines){ const k = String(L.karat||''); if (goldByKarat.hasOwnProperty(k)) goldByKarat[k] += Number(L.weight||0) || 0; }
          // Gold converted to 21K: sum(weight * karat / 21)
          const totalGoldAs21 = lines.reduce((s,L)=>{
            const w = Number(L.weight||0) || 0;
            const k = Number(L.karat||0) || 0;
            if (!w || !k) return s;
            return s + (w * k / 21);
          }, 0);
          const rowsHtml = lines.map((L,i)=>`<tr>
              <td>${i+1}</td>
              <td>${nf2.format(Number(L.amount||0) || 0)}</td>
              <td>${nf2.format(Number(L.weight||0) || 0)}</td>
              <td>${L.karat||'-'}</td>
              <td>${L.note||''}</td>
            </tr>`).join('');
          const nameAr = company.name || 'اسم الشركة';
          const nameEn = company.name_en || company.name || 'Company Name';
          const addressAr = company.address || '';
          const addressEn = company.address_en || company.address || '';
          const phone = company.phone || '';
          const email = company.email || '';
          const taxNo = company.tax || '';
          const date = hdr.date || '';
          const memo = hdr.memo || '';
          const voucherNumber = hdr.branch_local_number || displayId || id;
          
          const isRtl = getPVLang() === 'ar';
          const branchScopeChipPV = (() => {
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
          const docHtml = `<!doctype html><html lang="${isRtl ? 'ar' : 'en'}" dir="${isRtl ? 'rtl' : 'ltr'}" data-skip-branch-scope-badge="1"><head><meta charset="utf-8"><title>${tPV('printVoucherNo')} ${voucherNumber}</title>
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
              .voucher-title { position: relative; background: #374151 !important; color: #fff; text-align: center; padding: 10px 20px; font-size: 18px; font-weight: 700; display: flex; align-items: center; justify-content: center; border-radius: 12px; margin: 8px 12px; }
              .voucher-date-chip { position: absolute; right: 15px; top: 50%; transform: translateY(-50%); }
              .voucher-branch-chip { position: absolute; left: 15px; top: 50%; transform: translateY(-50%); }
              .voucher-date-chip, .voucher-branch-chip { padding: 4px 12px; border-radius: 999px; background: linear-gradient(135deg, #fef3c7, #fde68a); color: #374151; font-size: 11px; font-weight: 600; border: 1px solid rgba(249,250,251,0.7); box-shadow: 0 2px 4px rgba(0,0,0,0.2); white-space: nowrap; }
              .info-grid { display: grid; grid-template-columns: repeat(4, 1fr); border-bottom: 1px solid #e5e7eb; background: #fff; gap: 6px; padding: 8px 12px; }
              .info-grid .info-item { display: flex; align-items: center; padding: 6px 12px; border-radius: 999px; border: 1px solid #e5e7eb; background: #f9fafb; box-shadow: 0 1px 2px rgba(0,0,0,0.04); }
              .info-grid .info-item i { margin-inline-end: 6px; font-size: 11px; color: #f59e0b; }
              .info-label { color: #666; font-size: 11px; min-width: 100px; }
              .info-value { font-weight: 600; color: #333; flex: 1; }
              .table-wrapper { border-radius: 12px; overflow: hidden; margin: 8px 12px 10px; border: 2px solid #f59e0b; }
              .details-table { width: 100%; border-collapse: collapse; }
              .details-table th { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%) !important; color: #1f2937; padding: 10px 8px; font-size: 12px; font-weight: 600; text-align: center; border: 1px solid #f59e0b; }
              .details-table td { padding: 10px 8px; text-align: center; border: 1px solid #e5e7eb; font-size: 11px; background: #fff; }
              .details-table tbody tr:nth-child(even) td { background: #fefefe; }
              .totals { background: linear-gradient(135deg, #1e3a5f 0%, #2d4a6f 100%) !important; padding: 12px; border-radius: 12px; margin: 8px 12px 0; }
              .totals-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; }
              .total-box { background: transparent; border: 1px solid #3d5a7f; border-radius: 6px; padding: 10px; text-align: center; }
              .total-box .lbl { font-size: 9px; color: #93c5fd; margin-bottom: 4px; }
              .total-box .val { font-size: 13px; font-weight: 700; color: #fff; }
              .signatures { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; padding: 15px; background: #f9fafb !important; border-top: 1px solid #e5e7eb; }
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
                <div class="voucher-title">
                  <div class="voucher-date-chip">${tPV('printDate')} ${date}</div>
                  ${branchScopeChipPV.value ? `<div class="voucher-branch-chip">${branchScopeChipPV.label} ${branchScopeChipPV.value}</div>` : ''}
                  <span class="voucher-title-text">${tPV('printVoucherNo')} ${voucherNumber}</span>
                </div>
              </div>
              <div class="info-grid">
                <div class="info-item" style="grid-column: 1 / 2;">
                  <i class="fa-solid fa-hashtag"></i>
                  <span class="info-label">${tPV('printAccountNo')}</span>
                  <span class="info-value">${payeeNo}</span>
                </div>
                <div class="info-item" style="grid-column: 2 / 4;">
                  <i class="fa-solid fa-user"></i>
                  <span class="info-label">${tPV('printPaidTo')}</span>
                  <span class="info-value">${payeeName}</span>
                </div>
                <div class="info-item" style="grid-column: 4 / 5;">
                  <i class="fa-solid fa-phone"></i>
                  <span class="info-label">${tPV('printPhone')}</span>
                  <span class="info-value">${payeePhone}</span>
                </div>
                <div class="info-item" style="grid-column: 1 / 3;">
                  <i class="fa-solid fa-location-dot"></i>
                  <span class="info-label">${tPV('printAddress')}</span>
                  <span class="info-value">${payeeAddr}</span>
                </div>
                <div class="info-item" style="grid-column: 3 / 5;">
                  <i class="fa-solid fa-align-right"></i>
                  <span class="info-label">${tPV('printDescription')}</span>
                  <span class="info-value">${memo}</span>
                </div>
              </div>
              <div class="table-wrapper">
                <table class="details-table">
                  <thead><tr><th style="width:36px">#</th><th style="width:100px">${tPV('printAmount')}</th><th style="width:80px">${tPV('printWeight')}</th><th style="width:50px">${tPV('printKarat')}</th><th style="width:40%">${tPV('printDescription')}</th></tr></thead>
                  <tbody>${rowsHtml}</tbody>
                </table>
              </div>
              <div class="totals">
                <div class="totals-grid">
                  <div class="total-box"><div class="lbl">${tPV('printTotalCash')}</div><div class="val">${nf2.format(sumCash)}</div></div>
                  <div class="total-box"><div class="lbl">${tPV('printConverted21')}</div><div class="val">${nf2.format(totalGoldAs21)}</div></div>
                  <div class="total-box"><div class="lbl">${tPV('printKarat24')}</div><div class="val">${nf2.format(goldByKarat['24'])}</div></div>
                  <div class="total-box"><div class="lbl">${tPV('printKarat22')}</div><div class="val">${nf2.format(goldByKarat['22'])}</div></div>
                  <div class="total-box"><div class="lbl">${tPV('printKarat21')}</div><div class="val">${nf2.format(goldByKarat['21'])}</div></div>
                  <div class="total-box"><div class="lbl">${tPV('printKarat18')}</div><div class="val">${nf2.format(goldByKarat['18'])}</div></div>
                </div>
                <div style="margin-top:10px; padding:8px 15px; background:rgba(255,255,255,0.1); border-radius:6px; font-size:11px; color:#e2e8f0;">
                  ${sumCash > 0 ? `<div style="margin-bottom:4px;"><strong>${tPV('printCashWords')}</strong> ${toWordsCash(sumCash)}</div>` : ''}
                  ${totalGoldAs21 > 0 ? `<div><strong>${tPV('printGoldWords')}</strong> ${toWordsGold(totalGoldAs21)}</div>` : ''}
                </div>
              </div>
              <div class="signatures">
                <div class="sig-box"><div class="sig-line"></div><div class="sig-title">${tPV('printCashierSig')}</div></div>
                <div class="sig-box"><div class="sig-line"></div><div class="sig-title">${tPV('printAuditorSig')}</div></div>
                <div class="sig-box"><div class="sig-line"></div><div class="sig-title">${tPV('printReceiverSig')}</div></div>
              </div>
            </div>
            <button class="print-btn no-print" onclick="window.print()">🖨️ ${tPV('printBtn')}</button>
          </body></html>`;
          if (window.openPreview) { window.openPreview(docHtml); } else {
            const w = window.open('', '_blank', 'noopener'); if (!w) return; w.document.open(); w.document.write(docHtml); w.document.close(); w.focus();
          }
          return;
        }
      }
      // fallback: print list
      if (typeof exportPdf === 'function') await exportPdf();
    }catch(err){ 
      showToast('error', tPV('printWindowFailed'));
    }
  }); }
  
  // WhatsApp - Send Voucher directly (same as sales invoice)
  if (hvBtnWhatsApp) {
    hvBtnWhatsApp.addEventListener('click', async () => {
      const voucherInternalId = getVoucherInternalId();
      const id = getVoucherDisplayNumber() || voucherInternalId;
      const displayId = id;
      if (!voucherInternalId) {
        showToast('error', tPV('saveFirst'));
        return;
      }
      
      try {
        // Get voucher data
        const v = getVoucherService();
        if (!v || typeof v.get !== 'function') {
          showToast('error', tPV('loadFailed'));
          return;
        }
        
        const r = await v.get(voucherInternalId);
        if (!r || !r.success) {
          showToast('error', tPV('loadFailed'));
          return;
        }
        
        const data = r.data || { header: {}, lines: [] };
        const hdr = data.header || {};
        const lines = Array.isArray(data.lines) ? data.lines : [];
        const first = lines[0] || {};
        
        let phone = null;
        let contactName = '';
        
        // Try customer first
        if (first.customer_id) {
          const c = (Array.isArray(customersCache) ? customersCache : []).find(x => Number(x.id) === Number(first.customer_id));
          if (c && c.phone) { phone = c.phone; contactName = c.name || ''; }
        }
        // Try supplier
        if (!phone && first.supplier_id) {
          const s = (Array.isArray(suppliersCache) ? suppliersCache : []).find(x => Number(x.id) === Number(first.supplier_id));
          if (s && s.phone) { phone = s.phone; contactName = s.name || ''; }
        }
        
        if (!phone) {
          showToast('error', tPV('phoneNotFound'));
          return;
        }
        
        // Clean phone number
        let phoneNumber = phone.trim().replace(/^\+/, '').replace(/^00/, '').replace(/[^0-9]/g, '');
        if (phoneNumber.startsWith('05')) phoneNumber = '966' + phoneNumber.substring(1);
        if (!phoneNumber || phoneNumber.length < 9) {
          showToast('error', tPV('phoneInvalid'));
          return;
        }
        
        // Calculate totals
        const nf2 = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        const sumCash = lines.reduce((s, L) => s + (Number(L.amount) || 0), 0);
        const goldByKarat = { '18': 0, '21': 0, '22': 0, '24': 0 };
        for (const L of lines) {
          const k = String(L.karat || '');
          if (goldByKarat.hasOwnProperty(k)) goldByKarat[k] += Number(L.weight || 0) || 0;
        }
        const totalGoldAs21 = lines.reduce((s, L) => {
          const w = Number(L.weight || 0) || 0;
          const k = Number(L.karat || 0) || 0;
          return (!w || !k) ? s : s + (w * k / 21);
        }, 0);
        
        const voucherDate = hdr.date || document.getElementById('hv_date')?.value || '';
        const voucherNumber = hdr.branch_local_number || displayId || id;
        
        // Build gold details string
        let goldDetails = '';
        if (goldByKarat['24'] > 0) goldDetails += '   • عيار 24: ' + nf2.format(goldByKarat['24']) + ' غ\n';
        if (goldByKarat['22'] > 0) goldDetails += '   • عيار 22: ' + nf2.format(goldByKarat['22']) + ' غ\n';
        if (goldByKarat['21'] > 0) goldDetails += '   • عيار 21: ' + nf2.format(goldByKarat['21']) + ' غ\n';
        if (goldByKarat['18'] > 0) goldDetails += '   • عيار 18: ' + nf2.format(goldByKarat['18']) + ' غ\n';
        
        // Build message
        const message = '📄 سند صرف رقم: ' + voucherNumber + '\n\nعزيزي: ' + contactName + '\n\n📅 التاريخ: ' + voucherDate + '\n\n💵 إجمالي المبلغ: ' + nf2.format(sumCash) + ' ريال\n' + (goldDetails ? '⚖️ تفصيل الذهب:\n' + goldDetails : '') + '\nشكراً لتعاملكم معنا 🙏';
        
        // Get company info
        let company = {};
        try { if (window.api?.getCompanyInfo) { const cr = await window.api.getCompanyInfo(); if (cr?.success) company = cr.company || {}; } } catch(_) {}
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
        const memo = hdr.memo || '';
        
        // Build rows HTML
        const rowsHtml = lines.map((L, i) => '<tr><td>' + (i + 1) + '</td><td>' + nf2.format(Number(L.amount || 0) || 0) + '</td><td>' + nf2.format(Number(L.weight || 0) || 0) + '</td><td>' + (L.karat || '-') + '</td><td>' + (L.note || '') + '</td></tr>').join('');
        
        // Build words section
        let wordsHtml = '';
        if (sumCash > 0) wordsHtml += '<div style="margin-bottom:3px;"><strong>النقد كتابة:</strong> ' + toArabicWordsCash(sumCash) + '</div>';
        if (totalGoldAs21 > 0) wordsHtml += '<div><strong>الذهب كتابة (عيار 21):</strong> ' + toArabicWordsGold(totalGoldAs21) + '</div>';
        const docHtml = `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>سند صرف</title><script src="../../node_modules/html2canvas/dist/html2canvas.min.js"><\/script><link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:"Cairo",sans-serif;background:#fff;padding:10px}.container{border:2px solid #e5e7eb;border-radius:8px;overflow:hidden}.header{padding:10px 16px;background:linear-gradient(135deg,#fef3c7 0%,#fde68a 100%);border-bottom:2px solid #f59e0b}.title{background:#374151;color:#fff;text-align:center;padding:10px;border-radius:8px;font-size:16px;font-weight:700;margin-top:8px}.meta{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:10px;background:#fff}.meta-item{padding:8px;border:1px solid #e5e7eb;border-radius:8px;background:#f9fafb;font-size:12px}.table-wrap{padding:10px;background:#fff}.details-table{width:100%;border-collapse:collapse}.details-table th{background:#fde68a;border:1px solid #f59e0b;padding:8px;font-size:11px}.details-table td{border:1px solid #e5e7eb;padding:8px;font-size:11px;text-align:center}.totals{margin:10px;padding:10px;border-radius:8px;background:linear-gradient(135deg,#1e3a5f 0%,#2d4a6f 100%);color:#fff}.words{margin-top:8px;padding:8px;background:rgba(255,255,255,.1);border-radius:6px;font-size:11px}</style></head><body><div class="container" id="voucherContainer"><div class="header"><div style="display:flex;justify-content:space-between;gap:12px;align-items:center"><div><div style="font-size:14px;font-weight:700">${nameAr}</div><div style="font-size:11px">${addressAr || ''}</div><div style="font-size:11px">${phone || ''}</div></div><div><div style="font-size:14px;font-weight:700;text-align:left">${nameEn}</div><div style="font-size:11px;text-align:left">${addressEn || ''}</div><div style="font-size:11px;text-align:left">${email || ''}</div></div></div><div class="title">سند صرف رقم: ${voucherNumber}</div></div><div class="meta"><div class="meta-item"><strong>التاريخ:</strong> ${voucherDate}</div><div class="meta-item"><strong>المستفيد:</strong> ${contactName}</div><div class="meta-item"><strong>رقم الحساب:</strong> ${payeeNo}</div><div class="meta-item" style="grid-column:1/4"><strong>البيان:</strong> ${memo || ''}</div></div><div class="table-wrap"><table class="details-table"><thead><tr><th>#</th><th>المبلغ</th><th>الوزن</th><th>العيار</th><th>البيان</th></tr></thead><tbody>${rowsHtml}</tbody></table></div><div class="totals"><div><strong>إجمالي النقد:</strong> ${nf2.format(sumCash)}</div><div><strong>محول عيار 21:</strong> ${nf2.format(totalGoldAs21)}</div>${wordsHtml ? `<div class="words">${wordsHtml}</div>` : ''}</div></div><script>setTimeout(async()=>{try{const container=document.getElementById("voucherContainer");const canvas=await html2canvas(container,{backgroundColor:"#fff",scale:2,useCORS:true,logging:false});const blob=await new Promise(r=>canvas.toBlob(r,"image/png"));try{await navigator.clipboard.write([new ClipboardItem({"image/png":blob})])}catch(e){}const whatsappUrl="https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}";if(window.api?.openExternal)await window.api.openExternal(whatsappUrl);else if(window.opener?.api?.openExternal)await window.opener.api.openExternal(whatsappUrl);else window.open(whatsappUrl,"_blank");setTimeout(()=>window.close(),800)}catch(err){console.error(err);alert("خطأ في إرسال السند")}},600)<\/script></body></html>`;
        
        // Open window, capture, send to WhatsApp, then close
        const w = window.open('', '_blank', 'width=700,height=600,scrollbars=yes');
        if (!w) {
          showToast('error', tPV('windowOpenFailed'));
          return;
        }
        w.document.open();
        w.document.write(docHtml);
        w.document.close();
        
        showToast('success', tPV('whatsappSending'));
        
      } catch (err) {
        showToast('error', tPV('whatsappError'));
      }
    });
  }
  
  // Navigation button handlers
  if (hvNavFirst) hvNavFirst.addEventListener('click',  async ()=>{ await hv_navTo('first'); });
  if (hvNavPrev)  hvNavPrev.addEventListener('click',   async ()=>{ await hv_navTo('prev');  });
  if (hvNavNext)  hvNavNext.addEventListener('click',   async ()=>{ await hv_navTo('next');  });
  if (hvNavLast)  hvNavLast.addEventListener('click',   async ()=>{ await hv_navTo('last');  });

  // Keyboard navigation: use arrows/Home/End to navigate vouchers
  // - Outside editable fields: plain arrows navigate
  // - Inside inputs/selects/textareas: require Alt or Ctrl with arrows to navigate
  // - Ignore when any modal/dialog is open (aria-hidden="false")
  document.addEventListener('keydown', async (e) => {
    const key = e.key;
    // If a modal dialog is open, do not navigate
    const anyOpenModal = document.querySelector('[role="dialog"][aria-hidden="false"], .modal[aria-hidden="false"]');
    if (anyOpenModal) return;

    const isEditable = (el) => {
      if (!el) return false;
      if (el.isContentEditable) return true;
      const tag = el.tagName;
      return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
    };

    const targetIsEditable = isEditable(e.target);
    const isNavKey = key === 'ArrowLeft' || key === 'ArrowRight' || key === 'ArrowUp' || key === 'ArrowDown' || key === 'Home' || key === 'End';
    if (!isNavKey) return;

    // Only handle inside editable elements if Alt or Ctrl is pressed
    if (targetIsEditable && !(e.altKey || e.ctrlKey)) return;

    if (key === 'ArrowLeft' || key === 'ArrowUp') {
      e.preventDefault();
      await hv_navTo('prev');
    } else if (key === 'ArrowRight' || key === 'ArrowDown') {
      e.preventDefault();
      await hv_navTo('next');
    } else if (key === 'Home') {
      e.preventDefault();
      await hv_navTo('first');
    } else if (key === 'End') {
      e.preventDefault();
      await hv_navTo('last');
    }
  });

  // Enter key navigation between inputs/selects/textareas
  document.addEventListener('keydown', (e)=>{
    if (e.key !== 'Enter') return;
    // If a modal is open, ignore
    const anyOpenModal = document.querySelector('[role="dialog"][aria-hidden="false"], .modal[aria-hidden="false"]');
    if (anyOpenModal) return;
    const t = e.target;
    if (!t || !(t instanceof HTMLElement)) return;
    const tag = t.tagName;
    // Allow normal behavior in textarea unless Ctrl/Alt is pressed
    if (tag === 'TEXTAREA' && !(e.ctrlKey || e.altKey)) return;
    // Keep custom Enter for nav id input
    if (t.id === 'hv_nav_id') return;
    // Only act within voucher panel
    const panel = document.getElementById('panel-voucher');
    if (!panel || !panel.contains(t)) return;
    // Build focusable list
    const all = Array.from(panel.querySelectorAll('input:not([type="hidden"]):not([disabled]):not([readonly]), select:not([disabled]), textarea:not([disabled])'))
      .filter(el => el.offsetParent !== null && getComputedStyle(el).visibility !== 'hidden');
    if (!all.length) return;
    const idx = all.indexOf(t);
    if (idx === -1) return;
    e.preventDefault();
    const dir = e.shiftKey ? -1 : 1;
    let nextIdx = idx + dir;
    if (nextIdx < 0) nextIdx = 0;
    if (nextIdx >= all.length) nextIdx = all.length - 1;
    const nxt = all[nextIdx];
    if (nxt && typeof nxt.focus === 'function'){
      nxt.focus();
      if (nxt.select) { try{ nxt.select(); }catch(_){ } }
    }
  });

  // Ensure accounts API is ready (preload/IPC) before loading
  async function waitForAccounts(maxTries=25, delayMs=120){
    for (let i=0;i<maxTries;i++){
      if (window.accounts && typeof window.accounts.getAccounts === 'function') return true;
      await new Promise(r=>setTimeout(r, delayMs));
    }
    return false;
  }

  // Header select helpers (true combo boxes)
  function fillHeaderSelect(selectEl, items){
    if (!selectEl) return;
    selectEl.innerHTML = '';
    if (!items || !items.length){
      const opt = document.createElement('option');
      opt.value = '';
      opt.textContent = '— لا توجد حسابات —';
      opt.disabled = true;
      opt.selected = true;
      selectEl.appendChild(opt);
      return;
    }
    items.forEach(acc => {
      const opt = document.createElement('option');
      const code = acc.code != null && acc.code !== '' ? acc.code : acc.id;
      opt.value = code;
      opt.textContent = `${code} — ${acc.name}`;
      selectEl.appendChild(opt);
    });
  }
  function bindHeaderSelect(selectEl, hiddenEl, noInp){
    if (!selectEl || !hiddenEl) return;
    const sync = () => {
      const id = Number(selectEl.value) || null;
      if (selectEl.value === '__NO_MATCH__'){
        hiddenEl.value = '';
      } else {
        hiddenEl.value = id ? String(id) : '';
        if (noInp && id) noInp.value = String(id);
      }
    };
    selectEl.addEventListener('change', sync);
    selectEl.addEventListener('input', sync);
    sync();
  }

  function ensureNoMatchOption(selectEl, text){
    if (!selectEl) return;
    let opt = selectEl.querySelector('option[value="__NO_MATCH__"]');
    if (!opt){ opt = document.createElement('option'); opt.value = '__NO_MATCH__'; selectEl.appendChild(opt); }
    opt.textContent = text;
  }

  function removeNoMatchOption(selectEl){
    const opt = selectEl ? selectEl.querySelector('option[value="__NO_MATCH__"]') : null;
    if (opt) opt.remove();
  }

  function setHeaderByNumber(noInp, selectEl, hiddenEl){
    if (!noInp || !selectEl || !hiddenEl) return;
    const raw = (noInp.value || '').trim();
    if (!raw){
      removeNoMatchOption(selectEl);
      hiddenEl.value = '';
      selectEl.value = '';
      return;
    }
    const acc = (accountsCache || []).find(a => String(a.code) === String(raw));
    if (acc){
      removeNoMatchOption(selectEl);
      selectEl.value = String(acc.id);
      hiddenEl.value = String(acc.id);
      noInp.value = acc.code != null ? String(acc.code) : '';
      const evt = new Event('change', { bubbles: true });
      selectEl.dispatchEvent(evt);
    } else {
      ensureNoMatchOption(selectEl, 'لا يوجد حساب بهذا الرقم');
      selectEl.value = '__NO_MATCH__';
      hiddenEl.value = '';
      const evt = new Event('change', { bubbles: true });
      selectEl.dispatchEvent(evt);
    }
  }
  function formatDecimal(val){
    const n = typeof val === 'number' ? val : parseDecimal(val);
    return nf.format(n);
  }
  function formatDate(v){ const d = new Date(v); return isNaN(d) ? '' : d.toLocaleDateString('en-GB'); }

  // Totals
  const totAmountEl = document.getElementById('tot_amount');
  const totWeightEl = document.getElementById('tot_weight');
  function updateTotals(){
    let sAmt = 0, sW = 0;
    if (linesTable){
      linesTable.querySelectorAll('tbody tr').forEach(tr => {
        const ga = tr.querySelector('input[name="l_amount"]');
        const gw = tr.querySelector('input[name="l_weight"]');
        sAmt += parseDecimal(ga?.value || 0);
        sW += parseDecimal(gw?.value || 0);
      });
    }
    if (totAmountEl) totAmountEl.textContent = nf.format(sAmt);
    if (totWeightEl) totWeightEl.textContent = nf.format(sW);
    const vAmt = document.getElementById('v_amount');
    if (vAmt) vAmt.value = nf.format(sAmt);
    
    // تحديث بطاقة الإجماليات السفلية
    updateBottomTotals();
  }

  function syncVoucherTotalsLayout(){
    const voucherPanel = document.getElementById('panel-voucher');
    const totalsCard = document.getElementById('voucher_totals');
    const linesGridCard = document.getElementById('voucher-lines-grid');
    if (!voucherPanel || !totalsCard) return;

    const measuredHeight = Math.ceil(totalsCard.getBoundingClientRect().height || totalsCard.offsetHeight || 0);
    const safeHeight = Math.max(measuredHeight, 72);
    voucherPanel.style.setProperty('--voucher-totals-height', `${safeHeight}px`);

    const referenceRect = (linesGridCard || voucherPanel).getBoundingClientRect();
    const safeLeft = Math.max(Math.round(referenceRect.left || 0), 0);
    const safeWidth = Math.max(Math.round(referenceRect.width || voucherPanel.getBoundingClientRect().width || 0), 0);
    voucherPanel.style.setProperty('--voucher-totals-left', `${safeLeft}px`);
    voucherPanel.style.setProperty('--voucher-totals-width', `${safeWidth}px`);
  }
  
  // دالة تحديث بطاقة الإجماليات السفلية
  function updateBottomTotals(){
    let totalAmount = 0;
    let gold24 = 0, gold22 = 0, gold21 = 0, gold18 = 0;
    let silver999 = 0, silver925 = 0, silver900 = 0, silver800 = 0;
    
    const tbody = hvLinesTable?.querySelector('tbody');
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
    const totalAmountEl = document.getElementById('voucher_total_amount');
    const gold24El = document.getElementById('voucher_gold_24');
    const gold22El = document.getElementById('voucher_gold_22');
    const gold21El = document.getElementById('voucher_gold_21');
    const gold18El = document.getElementById('voucher_gold_18');
    const silver999El = document.getElementById('voucher_silver_999');
    const silver925El = document.getElementById('voucher_silver_925');
    const silver900El = document.getElementById('voucher_silver_900');
    const silver800El = document.getElementById('voucher_silver_800');
    
    if (totalAmountEl) totalAmountEl.textContent = formatNumberWithCommas(totalAmount.toFixed(2));
    if (gold24El) gold24El.textContent = formatNumberWithCommas(gold24.toFixed(2));
    if (gold22El) gold22El.textContent = formatNumberWithCommas(gold22.toFixed(2));
    if (gold21El) gold21El.textContent = formatNumberWithCommas(gold21.toFixed(2));
    if (gold18El) gold18El.textContent = formatNumberWithCommas(gold18.toFixed(2));
    if (silver999El) silver999El.textContent = formatNumberWithCommas(silver999.toFixed(2));
    if (silver925El) silver925El.textContent = formatNumberWithCommas(silver925.toFixed(2));
    if (silver900El) silver900El.textContent = formatNumberWithCommas(silver900.toFixed(2));
    if (silver800El) silver800El.textContent = formatNumberWithCommas(silver800.toFixed(2));

    syncVoucherTotalsLayout();
  }
  
  // استدعاء دالة تحديث الإجماليات عند تغيير أي قيمة في الجدول
  if (hvLinesTable){
    hvLinesTable.addEventListener('input', updateBottomTotals);
    hvLinesTable.addEventListener('change', updateBottomTotals);
    // استدعاء مباشر بعد كل عملية حذف أو إضافة صف
    const observer = new MutationObserver(updateBottomTotals);
    observer.observe(hvLinesTable, { childList: true, subtree: true });
  }

  const voucherTotalsCard = document.getElementById('voucher_totals');
  if (voucherTotalsCard && typeof ResizeObserver !== 'undefined') {
    const totalsResizeObserver = new ResizeObserver(() => syncVoucherTotalsLayout());
    totalsResizeObserver.observe(voucherTotalsCard);
  }

  const voucherLinesGridCard = document.getElementById('voucher-lines-grid');
  if (voucherLinesGridCard && typeof ResizeObserver !== 'undefined') {
    const linesGridResizeObserver = new ResizeObserver(() => syncVoucherTotalsLayout());
    linesGridResizeObserver.observe(voucherLinesGridCard);
  }

  window.addEventListener('resize', syncVoucherTotalsLayout);
  
  // استدعاء أولي
  updateBottomTotals();

  // Searchable dropdowns for accounts
  const cashInput = document.getElementById('v_cash_acc');
  const cashHidden = document.getElementById('v_cash_acc_id');
  const cashList = document.getElementById('v_cash_list');
  const goldInput = document.getElementById('v_gold_acc');
  const goldHidden = document.getElementById('v_gold_acc_id');
  const goldList = document.getElementById('v_gold_list');
  // Header (voucher head) inputs
  const hvCashInput = document.getElementById('hv_cash_acc');
  const hvCashHidden = document.getElementById('hv_cash_acc_id');
  const hvCashList = document.getElementById('hv_cash_list');
  const hvGoldInput = document.getElementById('hv_gold_acc');
  const hvGoldHidden = document.getElementById('hv_gold_acc_id');
  const hvGoldList = document.getElementById('hv_gold_list');
  const hvCashNoInp = document.getElementById('hv_cash_acc_no_inp');
  const hvGoldNoInp = document.getElementById('hv_gold_acc_no_inp');
  
  // Populate account selects (like receipt screen)
  function optionLabel(acc){
    const code = acc.code != null && acc.code !== '' ? acc.code : acc.id;
    return `${code} — ${acc.name}`;
  }
  async function populateHvAccountSelects(){
    const cashSel = document.getElementById('hv_cash_acc');
    const goldSel = document.getElementById('hv_gold_acc');
    const silverSel = document.getElementById('hv_silver_acc');
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
    window._voucherDefaultBoxes = { cash: defCash, gold: defGold, silver: defSilver };
    
    if (defCash){ 
      cashSel.value = String(defCash); 
      const acc = (accountsCache || []).find(x => String(x.id) === String(defCash));
      const no = document.getElementById('hv_cash_acc_no_inp'); 
      if (no) no.value = acc && acc.code != null ? String(acc.code) : '';
      const hid = document.getElementById('hv_cash_acc_id'); 
      if (hid) hid.value = String(defCash); 
    }
    if (defGold){ 
      goldSel.value = String(defGold); 
      const acc = (accountsCache || []).find(x => String(x.id) === String(defGold));
      const no = document.getElementById('hv_gold_acc_no_inp'); 
      if (no) no.value = acc && acc.code != null ? String(acc.code) : '';
      const hid = document.getElementById('hv_gold_acc_id'); 
      if (hid) hid.value = String(defGold); 
    }
    if (defSilver && silverSel){ 
      silverSel.value = String(defSilver); 
      const acc = (accountsCache || []).find(x => String(x.id) === String(defSilver));
      const no = document.getElementById('hv_silver_acc_no_inp'); 
      if (no) no.value = acc && acc.code != null ? String(acc.code) : '';
      const hid = document.getElementById('hv_silver_acc_id'); 
      if (hid) hid.value = String(defSilver); 
    }
  }
  

  function wireHvAccountSelects(){
    const cashSel = document.getElementById('hv_cash_acc');
    const goldSel = document.getElementById('hv_gold_acc');
    const silverSel = document.getElementById('hv_silver_acc');
    if (cashSel){ 
      cashSel.addEventListener('change', ()=>{ 
        const v = cashSel.value || ''; 
        const acc = (accountsCache || []).find(x => String(x.id) === String(v));
        const no = document.getElementById('hv_cash_acc_no_inp'); 
        if (no) no.value = acc && acc.code != null ? String(acc.code) : ''; 
        const hid = document.getElementById('hv_cash_acc_id'); 
        if (hid) hid.value = v;
      }); 
    }
    if (goldSel){ 
      goldSel.addEventListener('change', ()=>{ 
        const v = goldSel.value || ''; 
        const acc = (accountsCache || []).find(x => String(x.id) === String(v));
        const no = document.getElementById('hv_gold_acc_no_inp'); 
        if (no) no.value = acc && acc.code != null ? String(acc.code) : ''; 
        const hid = document.getElementById('hv_gold_acc_id'); 
        if (hid) hid.value = v;
      }); 
    }
    if (silverSel){ 
      silverSel.addEventListener('change', ()=>{ 
        const v = silverSel.value || ''; 
        const acc = (accountsCache || []).find(x => String(x.id) === String(v));
        const no = document.getElementById('hv_silver_acc_no_inp'); 
        if (no) no.value = acc && acc.code != null ? String(acc.code) : ''; 
        const hid = document.getElementById('hv_silver_acc_id'); 
        if (hid) hid.value = v;
      }); 
    }
  }

  // Header account helpers (like receipt behavior)
  function fillHeaderSelect(sel, items){
    if (!sel) return;
    sel.innerHTML = '';
    (items||[]).forEach(acc=>{
      const opt=document.createElement('option');
      opt.value=String(acc.id);
      opt.textContent=String(acc.name||'');
      sel.appendChild(opt);
    });
  }
  function bindHeaderSelect(sel, hiddenEl, numEl){
    if (!sel) return;
    const apply=(v)=>{ if (hiddenEl) hiddenEl.value=String(v||''); if (numEl) numEl.value=String(v||''); };
    sel.addEventListener('change', ()=> apply(sel.value||''));
    // initialize once
    apply(sel.value||'');
  }
  function setHeaderByNumber(numEl, sel, hiddenEl){
    if (!numEl || !sel) return;
    const v = String(numEl.value||'').trim();
    if (!v) return;
    sel.value = v;
    if (hiddenEl) hiddenEl.value = v;
  }

  function renderAccountOptions(listEl, items, onPick){
    if (!listEl) return;
    listEl.innerHTML = '';
    if (!items.length){ listEl.style.display = 'none'; return; }
    items.slice(0,50).forEach(acc => {
      const div = document.createElement('div');
      div.className = 'opt';
      div.style.padding = '6px 10px';
      div.style.cursor = 'pointer';
      div.textContent = `${acc.id} — ${acc.name}`;
      div.addEventListener('click', ()=>{ onPick(acc); listEl.style.display='none'; });
      listEl.appendChild(div);
    });
    listEl.style.display = 'block';
  }

  function bindSearchable(inputEl, listEl, hiddenEl, onPickExtra){
    if (!inputEl || !listEl || !hiddenEl) return;
    const doFilter = ()=>{
      const q = (inputEl.value||'').trim().toLowerCase();
      const items = !q ? accountsCache : accountsCache.filter(a => String(a.id).includes(q) || (a.name||'').toLowerCase().includes(q));
      renderAccountOptions(listEl, items, (acc)=>{ hiddenEl.value = acc.id; inputEl.value = `${acc.id} — ${acc.name}`; if (typeof onPickExtra === 'function') onPickExtra(acc); });
    };
    inputEl.addEventListener('input', doFilter);
    inputEl.addEventListener('focus', doFilter);
    document.addEventListener('click', (e)=>{ if (!listEl.contains(e.target) && e.target !== inputEl) listEl.style.display='none'; });
  }

  function openModal(){ modal.setAttribute('aria-hidden','false'); }
  function closeModal(){ modal.setAttribute('aria-hidden','true'); }

  function render(rows){
    if (!tbody) return;
    tbody.innerHTML = '';
    if (!rows || !rows.length){ tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:16px">لا توجد سندات</td></tr>'; return; }
    for (const v of rows){
      const tr = document.createElement('tr');
      const displayId = Number(v?.branch_local_number || 0) > 0 ? Number(v.branch_local_number) : (v.id ?? '');
      tr.innerHTML = `
        <td>${displayId}</td>
        <td>${formatDate(v.date)}</td>
        <td>${v.account ?? ''}</td>
        <td>${v.amount !== undefined && v.amount !== null ? formatDecimal(v.amount) : ''}</td>
        <td>${v.note ?? ''}</td>
        <td class="row">
          <button class="icon-btn act-edit" title="تعديل" data-id="${v.id}"><i class="fa-solid fa-pen"></i></button>
          <button class="icon-btn act-delete" title="حذف" data-id="${v.id}"><i class="fa-solid fa-xmark"></i></button>
        </td>`;
      tbody.appendChild(tr);
    }
  }

  // Placeholder load (expects window.voucher API later)
  async function load(){
    try{
      // load accounts once for dropdowns
      const ok = await waitForAccounts();
      const [ra, rc, rs, rv] = await Promise.all([
        (async () => {
          if (!ok) return null;
          try { return await fetchVoucherAccounts(); } catch (_) { return null; }
        })(),
        (async () => {
          try { return await fetchVoucherCustomers(); } catch (_) { return null; }
        })(),
        (async () => {
          try { return await fetchVoucherSuppliers(); } catch (_) { return null; }
        })(),
        (async () => {
          const voucher = getVoucherService();
          if (voucher && voucher.list) {
            try { return await voucher.list(); } catch (_) { return null; }
          }
          return null;
        })()
      ]);

      accountsCache = Array.isArray(ra) ? ra : ((ra && ra.success && Array.isArray(ra.data)) ? ra.data : []);
      customersCache = Array.isArray(rc) ? rc : ((rc && rc.success && Array.isArray(rc.data)) ? rc.data : []);
      suppliersCache = Array.isArray(rs) ? rs : ((rs && rs.success && Array.isArray(rs.data)) ? rs.data : []);
      cache = (rv && rv.success && rv.data) ? rv.data : [];
    }catch(_){ cache = []; }
    render(cache);
    // defaults for cash/gold (base accounts) - modal fields
    const cash = accountsCache.find(a => a.id === 1000);
    const gold = accountsCache.find(a => a.id === 1001);
    if (cashInput && cashHidden){
      if (cash){ cashHidden.value = cash.id; cashInput.value = `${cash.id} — ${cash.name}`; }
      bindSearchable(cashInput, cashList, cashHidden);
    }
    if (goldInput && goldHidden){
      if (gold){ goldHidden.value = gold.id; goldInput.value = `${gold.id} — ${gold.name}`; }
      bindSearchable(goldInput, goldList, goldHidden);
    }
    // Header fields - use populate function like receipt
    populateHvAccountSelects().catch(e => {});
    wireHvAccountSelects();
    hv_ensureMinimumRows();
    updateBottomTotals();
  }
  if (mClose) mClose.addEventListener('click', closeModal);
  if (mCancel) mCancel.addEventListener('click', closeModal);

  if (mSave) mSave.addEventListener('click', async () => {
    const header = {
      date: document.getElementById('v_date').value || (()=>{ const d=new Date(); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); })(),
      account: document.getElementById('v_account').value.trim(),
      amount: parseDecimal(document.getElementById('v_amount').value),
      note: document.getElementById('v_note').value.trim(),
      cash_account_id: cashHidden?.value ? parseInt(cashHidden.value,10) : null,
      gold_account_id: goldHidden?.value ? parseInt(goldHidden.value,10) : null,
    };
    // collect lines
    const lines = [];
    if (linesTable){
      linesTable.querySelectorAll('tbody tr').forEach(tr => {
        const get = sel => tr.querySelector(sel)?.value || '';
        const L = {
          customer_id: get('input[name="l_customer_id"]') ? parseInt(get('input[name="l_customer_id"]'),10) || null : null,
          supplier_id: get('input[name="l_supplier_id"]') ? parseInt(get('input[name="l_supplier_id"]'),10) || null : null,
          account_id: get('input[name="l_account_id"]') ? parseInt(get('input[name="l_account_id"]'),10) || null : null,
          amount: parseDecimal(get('input[name="l_amount"]')),
          weight: parseDecimal(get('input[name="l_weight"]')),
          karat: get('input[name="l_karat"]') || null,
          account_no: get('input[name="l_account_no"]') || null,
          note: get('input[name="l_note"]') || null,
        };
        // push if any meaningful value
        if (L.account_id || L.customer_id || L.supplier_id || L.amount || L.weight || L.account_no || L.note){
          lines.push(L);
        }
      });
    }
    // collect header grid lines
    if (hvLinesTable){
      hvLinesTable.querySelectorAll('tbody tr').forEach(tr => {
        const get = sel => tr.querySelector(sel)?.value || '';
        const L = {
          customer_id: get('input[name="hv_customer_id"]') ? parseInt(get('input[name="hv_customer_id"]'),10) || null : null,
          supplier_id: get('input[name="hv_supplier_id"]') ? parseInt(get('input[name="hv_supplier_id"]'),10) || null : null,
          account_id: get('input[name="hv_account_id"]') ? parseInt(get('input[name="hv_account_id"]'),10) || null : null,
          amount: parseDecimal(get('input[name="hv_amount"]')),
          weight: parseDecimal(get('input[name="hv_weight"]')),
          karat: get('input[name="hv_karat"]') || null,
          account_no: null,
          note: get('input[name="hv_note"]') || null,
        };
        if (L.account_id || L.customer_id || L.supplier_id || L.amount || L.weight || L.note){
          lines.push(L);
        }
      });
    }
    const payload = { ...header, lines };
    if (!payload.account && !lines.length){ vError.textContent = 'يجب إدخال حساب أو إضافة سطر واحد على الأقل.'; return; }
    try{
      let res = { success: true };
      const voucherService = getVoucherService();
      if (voucherService){
        res = isEdit ? await voucherService.update({ ...payload, id: editingId, branch_local_number: getVoucherDisplayNumber() || null }) : await voucherService.add(payload);
      }
      if (res && res.success){ closeModal(); load(); } else { vError.textContent = (res && res.error) || 'فشل الحفظ'; }
    }catch(e){ vError.textContent = 'فشل الحفظ'; }
  });

  // Inline actions
  if (tbody){
    tbody.addEventListener('click', async (e) => {
      // Ignore clicks coming from the header details grid
      if (e.target.closest('#hv_linesTable')) return;
      const editBtn = e.target.closest('.act-edit');
      const delBtn = e.target.closest('.act-delete');
      if (editBtn){
        const id = parseInt(editBtn.dataset.id,10);
        isEdit = true; editingId = id; vError.textContent = '';
        modalTitle.textContent = 'تعديل سند صرف';
        try{
          let hdr = null, lines = [];
          const voucherService = getVoucherService();
          if (voucherService && voucherService.get){
            const r = await voucherService.get(id);
            if (r && r.success){ hdr = r.data.header; lines = r.data.lines || []; }
          }
          const date = hdr?.date || (()=>{ const d=new Date(); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); })();
          document.getElementById('v_id').value = id;
          document.getElementById('v_date').value = date;
          document.getElementById('v_account').value = hdr?.account_no || '';
          // set header accounts
          const accCash = accountsCache.find(a => a.id === Number(hdr?.cash_account_id));
          const accGold = accountsCache.find(a => a.id === Number(hdr?.gold_account_id));
          if (cashInput && cashHidden){ cashHidden.value = accCash?.id || ''; cashInput.value = accCash ? `${accCash.id} — ${accCash.name}` : ''; }
          if (goldInput && goldHidden){ goldHidden.value = accGold?.id || ''; goldInput.value = accGold ? `${accGold.id} — ${accGold.name}` : ''; }
          // Fallback sum
          const total = lines.reduce((s,L)=> s + (Number(L.amount)||0), 0);
          document.getElementById('v_amount').value = formatDecimal(total);
          document.getElementById('v_note').value = hdr?.memo || '';
          // populate header inline grid instead of modal lines
          if (hvLinesTable){
            const tb = hvLinesTable.querySelector('tbody'); tb.innerHTML='';
            if (lines.length){ lines.forEach(L => hv_addLine(L)); } else { hv_addLine(); }
          }
          await hv_loadVoucherById(id);
        }catch(_){ /* ignore */ }
      }
    });
  }

  // Search filter (client-side)
  const debounce = (fn,ms=250)=>{ let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a),ms); }; };
  function applyFilters(){
    const q = (search?.value || '').trim().toLowerCase();
    let rows = cache.slice();
    if (q){ rows = rows.filter(v => [v.id, v.account, v.note].some(x => String(x??'').toLowerCase().includes(q))); }
    render(rows);
  }
  if (search) search.addEventListener('input', debounce(applyFilters,300));
  if (btnRefresh) btnRefresh.addEventListener('click', ()=>{ if (search) search.value=''; load(); });

  // Amount input formatting
  const vAmount = document.getElementById('v_amount');
  if (vAmount){
    vAmount.addEventListener('focus', ()=>{
      const n = parseDecimal(vAmount.value); if (!isNaN(n)) vAmount.value = String(n);
    });
    vAmount.addEventListener('blur', ()=>{
      const n = parseDecimal(vAmount.value); vAmount.value = nf.format(n);
    });
    vAmount.addEventListener('input', (e)=>{
      let v = e.target.value; v = v.replace(/[^0-9.,٬]/g,''); e.target.value = v;
    });
  }

  // Export XLS
  function exportXls(){
    // Check export permission
    if (window.ScreenPermissions && !window.ScreenPermissions.check('vouchers_export', 'تصدير سندات الصرف')) {
      return;
    }
    
    const rows = cache || [];
    const headers = ['رقم السند','التاريخ','الحساب','المبلغ','ملاحظة'];
    const htmlRows = rows.map(v => {
      const displayId = Number(v?.branch_local_number || 0) > 0 ? Number(v.branch_local_number) : (v.id ?? '');
      return `
      <tr>
        <td>${displayId}</td>
        <td>${formatDate(v.date)}</td>
        <td>${v.account ?? ''}</td>
        <td>${v.amount !== undefined && v.amount !== null ? nf.format(v.amount) : ''}</td>
        <td>${v.note ?? ''}</td>
      </tr>
    `;
    }).join('');
    const xlsHtml = `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><style>table{border-collapse:collapse}th,td{border:1px solid #444;padding:6px;text-align:right;white-space:nowrap}thead th{background:#eaeaea}</style></head><body><table><thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${htmlRows}</tbody></table></body></html>`;
    const blob = new Blob(['\ufeff' + xlsHtml], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'vouchers.xls'; document.body.appendChild(a); a.click(); setTimeout(()=>{URL.revokeObjectURL(url); a.remove();},0);
  }
  if (btnExportXls) btnExportXls.addEventListener('click', exportXls);

  // بناء header الشركة للطباعة
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

  async function exportPdf(){
    // Check export permission
    if (window.ScreenPermissions && !window.ScreenPermissions.check('vouchers_export', 'تصدير سندات الصرف')) {
      return;
    }
    
    const rows = cache || [];
    const htmlRows = rows.map(v => {
      const displayId = Number(v?.branch_local_number || 0) > 0 ? Number(v.branch_local_number) : (v.id ?? '');
      return `
      <tr>
        <td>${displayId}</td>
        <td>${formatDate(v.date)}</td>
        <td>${v.account ?? ''}</td>
        <td>${v.amount !== undefined && v.amount !== null ? nf.format(v.amount) : ''}</td>
        <td>${v.note ?? ''}</td>
      </tr>
    `;
    }).join('');

    // Load company info for header
    let company = {};
    try{ if (window.api && window.api.getCompanyInfo){ const r = await window.api.getCompanyInfo(); if (r && r.success) company = r.company || {}; } }catch(_){ }
    const headerHTML = window.buildCompactCompanyHeader ? window.buildCompactCompanyHeader(company) : '';

    const docHtml = `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>معاينة - سندات الصرف</title><style>
      body{font-family:Cairo,Arial,sans-serif;margin:0}
      header{position:sticky;top:0;background:#f5f5f5;border-bottom:1px solid #ccc;padding:10px;display:flex;justify-content:space-between;align-items:center}
      main{padding:20px}
      button{padding:8px 14px;border-radius:10px;border:1px solid #0aa99d;background:linear-gradient(135deg,#00a99d,#008f85);color:#fff;cursor:pointer}
      button:hover{filter:brightness(1.05)}
      table{width:100%;border-collapse:collapse}
      th,td{border:1px solid #999;padding:6px;text-align:right;font-size:12px}
      thead th{background:#eee}
      .comp-header{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;justify-items:stretch;gap:16px;margin:0 0 14px 0}
      .comp-logo{width:110px;height:110px;border-radius:50%;overflow:hidden;border:2px solid #ccc;background:#fafafa;display:flex;align-items:center;justify-content:center;margin:0 auto}
      .comp-logo img{width:100%;height:100%;object-fit:cover}
      .comp-cols{display:grid;grid-template-columns:1fr 1fr;gap:12px;max-width:720px;width:100%}
      .comp-col{font-size:12px}
      .comp-col.ltr{direction:ltr;text-align:left}
      .comp-col .line{margin:2px 0}
      .print-button{position:fixed;bottom:30px;left:30px;background:linear-gradient(135deg,#00897B 0%,#00695C 100%);color:white;border:none;padding:15px 30px;border-radius:50px;font-size:16px;font-weight:700;cursor:pointer;box-shadow:0 4px 20px rgba(0,137,123,0.4);transition:all 0.3s;z-index:1000;display:inline-flex;align-items:center;gap:8px}
      .print-button:hover{transform:translateY(-2px);box-shadow:0 6px 30px rgba(0,137,123,0.5)}
      .print-button i{font-style:normal}
      @media print{ .no-print{display:none !important} body{margin:10mm} }
    </style></head><body><main>
      ${headerHTML}
      <h2 style=\"text-align:center;margin:0 0 12px 0\">سندات الصرف</h2>
      <table><thead><tr><th>رقم السند</th><th>التاريخ</th><th>الحساب</th><th>المبلغ</th><th>ملاحظة</th></tr></thead><tbody>${htmlRows}</tbody></table>
    </main><button class="print-button no-print" onclick="window.print()"><i>🖨️</i>طباعة</button></body></html>`;

    if (window.openPreview) window.openPreview(docHtml); else {
      const w = window.open('', '_blank'); if (!w) return; w.document.open(); w.document.write(docHtml); w.document.close(); w.focus();
    }
  }
  if (btnExportPdf) btnExportPdf.addEventListener('click', exportPdf);

  // Close button - navigate back to dashboard (respect unsaved changes)
  if (hvBtnCloseTop) {
    hvBtnCloseTop.addEventListener('click', async () => {
      if (typeof window.canLeavePaymentVoucher === 'function') {
        const canLeave = await window.canLeavePaymentVoucher();
        if (!canLeave) return;
      }
      hvBtnCloseTop.style.transform = 'scale(0.95)';
      setTimeout(() => {
        hvBtnCloseTop.style.transform = '';
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

  // Initial load
  (async()=>{
    try{
      hv_ensureMinimumRows();
      updateBottomTotals();
      await load(); // Load accounts and data first
      await waitForVoucher();
      
      // Check if opened with ?id= parameter
      const params = new URLSearchParams(window.location.search||'');
      const idStr = params.get('id');
      const vid = idStr ? parseInt(idStr,10) : 0;
      
      if (vid && Number.isFinite(vid)){
        // Load specific voucher from URL
        try{ await hv_refreshIdsAndIndex(vid); }catch(_){ }
        await hv_loadVoucherById(vid);
      } else {
        // Load latest voucher or set defaults
        await hv_refreshIdsAndIndex();
        if (hvVoucherIds && hvVoucherIds.length){
          const curId = getVoucherInternalId();
          if (isFinite(curId)){
            const idx = hvVoucherIds.findIndex(x=>x===curId);
            if (idx>=0) hvIndex = idx;
          }
          if (hvIndex < 0) hvIndex = hvVoucherIds.length - 1;
          await hv_loadVoucherById(hvVoucherIds[hvIndex]);
        } else {
          // No vouchers - create new voucher with next ID
          await hv_newVoucher();
          if (hvNavCounter) hvNavCounter.textContent = '0 / 0';
        }
      }
      
      // Initial self-reference check
      try{ hv_checkSelfReference(); }catch(_){ }
      
      if (window.api && typeof window.api.on === 'function') {
        window.api.on('cloud-data-updated', async (payload) => {
          const tables = Array.isArray(payload?.tables) ? payload.tables : [];
          if (!tables.includes('vouchers')) {
            return;
          }
          if (hvScreenMode !== 'view') {
            return;
          }
          try {
            await hv_refreshIdsAndIndex();
            const currentId = getVoucherInternalId();
            if (Number.isFinite(currentId) && hvVoucherIds.includes(currentId)) {
              await hv_loadVoucherById(currentId);
              return;
            }
            if (hvVoucherIds && hvVoucherIds.length) {
              hvIndex = hvVoucherIds.length - 1;
              await hv_loadVoucherById(hvVoucherIds[hvIndex]);
              return;
            }
            await hv_newVoucher();
          } catch (_) {}
        });
      }

      window.addEventListener('message', async (event) => {
        if (event?.data?.type !== 'cloud-data-updated') {
          return;
        }
        const payload = event.data.payload || {};
        const tables = Array.isArray(payload?.tables) ? payload.tables : [];
        if (!tables.includes('vouchers')) {
          return;
        }
        if (hvScreenMode !== 'view') {
          return;
        }
        try {
          await hv_refreshIdsAndIndex();
          const currentId = getVoucherInternalId();
          if (Number.isFinite(currentId) && hvVoucherIds.includes(currentId)) {
            await hv_loadVoucherById(currentId);
            return;
          }
          if (hvVoucherIds && hvVoucherIds.length) {
            hvIndex = hvVoucherIds.length - 1;
            await hv_loadVoucherById(hvVoucherIds[hvIndex]);
            return;
          }
          await hv_newVoucher();
        } catch (_) {}
      });
    }catch(_){ }
  })();
});

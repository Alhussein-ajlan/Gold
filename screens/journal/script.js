// Ensure bridge APIs are available (mirror opening/receipt)
(function ensureAPIBridge(){
  try{
    const pick = (name)=>{
      if (window[name]) return;
      if (window.opener && window.opener[name]) { window[name] = window.opener[name]; return; }
      if (window.parent && window.parent[name]) { window[name] = window.parent[name]; return; }
      if (window.top && window.top[name]) { window[name] = window.top[name]; return; }
    };
    ['journal','accounts','suppliers','db','api','sys'].forEach(pick);
  }catch(_){ }
})();

// ===== Translation System for Journal Entries =====
const J_TRANSLATIONS = {
  ar: {
    // Page title
    pageTitle: 'القيود اليومية',
    
    // Toolbar buttons
    btnNew: 'قيد يومية جديد',
    btnEdit: 'تعديل',
    btnSave: 'حفظ',
    btnSaveEdit: 'حفظ التعديل',
    btnDelete: 'حذف',
    btnCancel: 'إلغاء',
    btnPrintPDF: 'طباعة PDF',
    btnClose: 'إغلاق',
    btnAddLine: 'إضافة سطر',
    
    // Navigation
    navFirst: 'الأول',
    navPrev: 'السابق',
    navNext: 'التالي',
    navLast: 'الأخير',
    navPlaceholder: 'رقم القيد',
    navGoTo: 'اذهب لرقم',
    
    // Header fields
    headerTitle: 'رأس قيد اليومية',
    fieldJournalNo: 'رقم القيد',
    fieldDate: 'التاريخ',
    fieldTime: 'الوقت',
    fieldMemo: 'البيان',
    placeholderAuto: 'تلقائي',
    placeholderMemo: 'وصف القيد',
    btnCopyMemo: 'نسخ البيان إلى جميع السطور',
    
    // Table
    tableTitle: 'سطور القيد',
    thItem: '#',
    thCustomerId: 'رقم العميل',
    thSupplierId: 'رقم المورد',
    thAccountId: 'رقم الحساب',
    thName: 'الاسم',
    thDebit: 'المدين',
    thCredit: 'الدائن',
    thCurrencyType: 'نوع العملة',
    thMemo: 'البيان',
    thDelete: 'حذف',
    
    // Placeholders
    placeholderSearch: 'البحث F9',
    placeholderAmount: 'مبلغ',
    placeholderNote: 'وصف',
    
    // Currency types
    currencySAR: 'ريال سعودي',
    currencyCash: 'ريال نقدي',
    currencyGold24: 'ذهب عيار 24',
    currencyGold22: 'ذهب عيار 22',
    currencyGold21: 'ذهب عيار 21',
    currencyGold18: 'ذهب عيار 18',
    currencySilver999: 'فضة عيار 999',
    currencySilver925: 'فضة عيار 925',
    currencySilver900: 'فضة عيار 900',
    currencySilver800: 'فضة عيار 800',
    
    // Totals section
    totalDebit: 'مدين',
    totalCredit: 'دائن',
    totalBalance: 'الفرق',
    balanced: 'متزن',
    totalCashDebit: 'مدين نقدي',
    totalCashCredit: 'دائن نقدي',
    totalGoldDebit: 'مدين (ذهب 21)',
    totalGoldCredit: 'دائن (ذهب 21)',
    totalSilverDebit: 'مدين (فضة 999)',
    totalSilverCredit: 'دائن (فضة 999)',
    
    // User tracking
    createdBy: 'أنشئ بواسطة:',
    lastModified: 'آخر تعديل:',
    
    // Toast messages
    toastSaved: 'تم حفظ القيد',
    toastUpdated: 'تم تحديث القيد',
    toastDeleted: 'تم حذف القيد',
    toastError: 'حدث خطأ',
    toastSaveFailed: 'فشل الحفظ',
    toastDeleteFailed: 'فشل الحذف',
    toastCopiedMemo: 'تم نسخ البيان إلى {count} {unit}',
    toastNoMemo: 'يرجى إدخال نص في حقل البيان أولاً',
    toastNoEmptyRows: 'لا توجد سطور غير فارغة لنسخ البيان إليها',
    toastSaveFirst: 'يرجى حفظ القيد أولاً',
    toastNoPhone: 'رقم الهاتف غير موجود',
    toastInvalidPhone: 'رقم الهاتف غير صحيح',
    toastPreparingImage: 'جاري تجهيز صورة القيد...',
    toastWindowFailed: 'فشل فتح النافذة',
    unitLine: 'سطر',
    unitLines: 'سطور',
    
    // Validation messages
    validationDateRequired: 'يرجى إدخال التاريخ',
    validationMinOneLine: 'يجب إضافة سطر واحد على الأقل',
    validationIdRequired: 'يجب إدخال رقم العميل أو المورد أو الحساب في كل سطر',
    validationDebitOrCredit: 'يجب إدخال مبلغ مدين أو دائن في كل سطر',
    validationNoJournalToEdit: 'لا يوجد قيد محفوظ للتعديل',
    validationViewMode: 'الشاشة في وضع عرض فقط. اضغط زر "تعديل" أولاً',
    validationEditUnlocked: 'صلاحية التعديل لهذا القيد غير مفعلة. اضغط زر "تعديل" مرة أخرى',
    validationNewMode: 'لا يمكن حفظ قيد جديد في وضع العرض. اضغط زر "قيد يومية جديد" أولاً',
    validationNotBalanced: 'القيد غير متزن. مجموع المدين لا يساوي مجموع الدائن',
    validationCustomerNotFound: 'لا يوجد عميل بهذا الرقم',
    validationSupplierNotFound: 'لا يوجد مورد بهذا الرقم',
    validationAccountNotFound: 'لا يوجد حساب بهذا الرقم',
    journalNotFound: 'القيد رقم {id} غير موجود',
    
    // Confirm delete
    confirmDeleteTitle: 'تأكيد حذف القيد',
    confirmDeleteMessage: 'هل أنت متأكد من حذف القيد الحالي؟',
    confirmDeleteMessageWithId: 'هل أنت متأكد من حذف القيد رقم {id}؟',
    confirmDeleteRowMessage: 'هل أنت متأكد من حذف هذا السطر؟',
    confirmDeleteRowWithName: 'هل أنت متأكد من أنك تريد حذف السطر "{name}"؟',
    confirmYes: 'نعم، احذف',
    confirmNo: 'إلغاء الأمر',
    
    // Print/Export labels
    printTitle: 'قيد يومية',
    printJournalNo: 'قيد يومية رقم:',
    printDate: 'التاريخ:',
    printTime: 'الوقت:',
    printMemo: 'البيان:',
    printItem: 'البند',
    printAccountName: 'اسم الحساب',
    printDebit: 'مدين',
    printCredit: 'دائن',
    printCurrencyType: 'نوع العملة',
    printNote: 'البيان',
    printCashDebit: 'نقد مدين',
    printCashCredit: 'نقد دائن',
    printWeightDebit21: 'إجمالي الأوزان محولة 21 مدين',
    printWeightCredit21: 'إجمالي الأوزان محولة 21 دائن',
    printCashInWords: 'النقد كتابة:',
    printGoldInWords: 'الذهب كتابة (عيار 21):',
    printButton: 'طباعة',
    
    // Company info labels
    companyAddress: 'العنوان:',
    companyPhone: 'الهاتف:',
    companyEmail: 'البريد:',
    companyTax: 'الرقم الضريبي:',
    
    // WhatsApp
    whatsappTitle: 'قيد يومية رقم',
    whatsappDear: 'عزيزي',
    whatsappDate: 'التاريخ:',
    whatsappDetails: 'التفاصيل:',
    whatsappTotalCash: 'إجمالي النقد:',
    whatsappTotalWeight: 'إجمالي الأوزان:',
    whatsappDebit: 'مدين',
    whatsappCredit: 'دائن',
    whatsappRiyal: 'ريال',
    whatsappGram: 'جرام',
    whatsappKarat: 'عيار',
    whatsappThanks: 'شكراً لتعاملكم معنا',
    whatsappUndefined: 'غير محدد',

    // Lookup modals
    lookupCustomerTitle: 'اختر عميل',
    lookupCustomerSearch: 'بحث عن عميل',
    lookupCustomerId: 'رقم العميل',
    lookupCustomerName: 'اسم العميل',
    lookupSupplierTitle: 'اختر مورد',
    lookupSupplierSearch: 'بحث عن مورد',
    lookupSupplierId: 'رقم المورد',
    lookupSupplierName: 'اسم المورد',
    lookupAccountTitle: 'اختر حساب',
    lookupAccountSearch: 'بحث عن حساب',
    lookupAccountId: 'رقم الحساب',
    lookupAccountName: 'اسم الحساب',
    lookupSearchPlaceholder: 'اكتب الرقم أو الاسم للبحث',
    lookupCancel: 'إلغاء',
    lookupSearch: 'بحث...',
    lookupNoResults: 'لا توجد نتائج',
    lookupSelect: 'اختر',
    // Unsaved changes modal
    unsavedTitle: 'تغييرات غير محفوظة',
    unsavedMessage: 'لديك تعديلات لم يتم حفظها بعد',
    unsavedDetail: 'هل تريد المتابعة والخروج بدون حفظ التغييرات؟',
    unsavedStay: 'العودة للتعديل',
    unsavedLeave: 'خروج بدون حفظ'
  },
  en: {
    // Page title
    pageTitle: 'Journal Entries',
    
    // Toolbar buttons
    btnNew: 'New Journal Entry',
    btnEdit: 'Edit',
    btnSave: 'Save',
    btnSaveEdit: 'Save Edit',
    btnDelete: 'Delete',
    btnCancel: 'Cancel',
    btnPrintPDF: 'Print PDF',
    btnClose: 'Close',
    btnAddLine: 'Add Line',
    
    // Navigation
    navFirst: 'First',
    navPrev: 'Previous',
    navNext: 'Next',
    navLast: 'Last',
    navPlaceholder: 'Entry No.',
    navGoTo: 'Go to number',
    
    // Header fields
    headerTitle: 'Journal Entry Header',
    fieldJournalNo: 'Entry No.',
    fieldDate: 'Date',
    fieldTime: 'Time',
    fieldMemo: 'Memo',
    placeholderAuto: 'Auto',
    placeholderMemo: 'Entry description',
    btnCopyMemo: 'Copy memo to all lines',
    
    // Table
    tableTitle: 'Entry Lines',
    thItem: '#',
    thCustomerId: 'Customer ID',
    thSupplierId: 'Supplier ID',
    thAccountId: 'Account ID',
    thName: 'Name',
    thDebit: 'Debit',
    thCredit: 'Credit',
    thCurrencyType: 'Currency Type',
    thMemo: 'Memo',
    thDelete: 'Delete',
    
    // Placeholders
    placeholderSearch: 'Search F9',
    placeholderAmount: 'Amount',
    placeholderNote: 'Note',
    
    // Currency types
    currencySAR: 'Saudi Riyal',
    currencyCash: 'Cash (Riyal)',
    currencyGold24: 'Gold 24K',
    currencyGold22: 'Gold 22K',
    currencyGold21: 'Gold 21K',
    currencyGold18: 'Gold 18K',
    currencySilver999: 'Silver 999',
    currencySilver925: 'Silver 925',
    currencySilver900: 'Silver 900',
    currencySilver800: 'Silver 800',
    
    // Totals section
    totalDebit: 'Debit',
    totalCredit: 'Credit',
    totalBalance: 'Balance',
    balanced: 'Balanced',
    totalCashDebit: 'Cash Debit',
    totalCashCredit: 'Cash Credit',
    totalGoldDebit: 'Debit (Gold 21K)',
    totalGoldCredit: 'Credit (Gold 21K)',
    totalSilverDebit: 'Debit (Silver 999)',
    totalSilverCredit: 'Credit (Silver 999)',
    
    // User tracking
    createdBy: 'Created by:',
    lastModified: 'Last modified:',
    
    // Toast messages
    toastSaved: 'Journal entry saved',
    toastUpdated: 'Journal entry updated',
    toastDeleted: 'Journal entry deleted',
    toastError: 'An error occurred',
    toastSaveFailed: 'Save failed',
    toastDeleteFailed: 'Delete failed',
    toastCopiedMemo: 'Memo copied to {count} {unit}',
    toastNoMemo: 'Please enter memo text first',
    toastNoEmptyRows: 'No non-empty rows to copy memo to',
    toastSaveFirst: 'Please save the journal entry first',
    toastNoPhone: 'Phone number not found',
    toastInvalidPhone: 'Invalid phone number',
    toastPreparingImage: 'Preparing journal entry image...',
    toastWindowFailed: 'Failed to open window',
    unitLine: 'line',
    unitLines: 'lines',
    
    // Validation messages
    validationDateRequired: 'Please enter the date',
    validationMinOneLine: 'At least one line must be added',
    validationIdRequired: 'Customer, supplier, or account ID must be entered in each line',
    validationDebitOrCredit: 'Debit or credit amount must be entered in each line',
    validationNoJournalToEdit: 'No saved journal entry to edit',
    validationViewMode: 'Screen is in view mode. Click "Edit" button first',
    validationEditUnlocked: 'Edit permission for this entry is not active. Click "Edit" button again',
    validationNewMode: 'Cannot save new entry in view mode. Click "New Journal Entry" button first',
    validationNotBalanced: 'Entry is not balanced. Total debit does not equal total credit',
    validationCustomerNotFound: 'Customer with this ID not found',
    validationSupplierNotFound: 'Supplier with this ID not found',
    validationAccountNotFound: 'Account with this ID not found',
    journalNotFound: 'Journal entry #{id} not found',
    
    // Confirm delete
    confirmDeleteTitle: 'Confirm Entry Deletion',
    confirmDeleteMessage: 'Are you sure you want to delete the current journal entry?',
    confirmDeleteMessageWithId: 'Are you sure you want to delete journal entry #{id}?',
    confirmDeleteRowMessage: 'Are you sure you want to delete this line?',
    confirmDeleteRowWithName: 'Are you sure you want to delete the line "{name}"?',
    confirmYes: 'Yes, delete',
    confirmNo: 'Cancel',
    
    // Print/Export labels
    printTitle: 'Journal Entry',
    printJournalNo: 'Journal Entry No.:',
    printDate: 'Date:',
    printTime: 'Time:',
    printMemo: 'Memo:',
    printItem: 'Item',
    printAccountName: 'Account Name',
    printDebit: 'Debit',
    printCredit: 'Credit',
    printCurrencyType: 'Currency Type',
    printNote: 'Note',
    printCashDebit: 'Cash Debit',
    printCashCredit: 'Cash Credit',
    printWeightDebit21: 'Total Weight Converted 21K Debit',
    printWeightCredit21: 'Total Weight Converted 21K Credit',
    printCashInWords: 'Cash in words:',
    printGoldInWords: 'Gold in words (21K):',
    printButton: 'Print',
    
    // Company info labels
    companyAddress: 'Address:',
    companyPhone: 'Phone:',
    companyEmail: 'Email:',
    companyTax: 'VAT:',
    
    // WhatsApp
    whatsappTitle: 'Journal Entry No.',
    whatsappDear: 'Dear',
    whatsappDate: 'Date:',
    whatsappDetails: 'Details:',
    whatsappTotalCash: 'Total Cash:',
    whatsappTotalWeight: 'Total Weight:',
    whatsappDebit: 'Debit',
    whatsappCredit: 'Credit',
    whatsappRiyal: 'Riyal',
    whatsappGram: 'gram',
    whatsappKarat: 'Karat',
    whatsappThanks: 'Thank you for your business',
    whatsappUndefined: 'Undefined',

    // Lookup modals
    lookupCustomerTitle: 'Select Customer',
    lookupCustomerSearch: 'Search for customer',
    lookupCustomerId: 'Customer ID',
    lookupCustomerName: 'Customer Name',
    lookupSupplierTitle: 'Select Supplier',
    lookupSupplierSearch: 'Search for supplier',
    lookupSupplierId: 'Supplier ID',
    lookupSupplierName: 'Supplier Name',
    lookupAccountTitle: 'Select Account',
    lookupAccountSearch: 'Search for account',
    lookupAccountId: 'Account ID',
    lookupAccountName: 'Account Name',
    lookupSearchPlaceholder: 'Type ID or name to search',
    lookupCancel: 'Cancel',
    lookupSearch: 'Search...',
    lookupNoResults: 'No results',
    lookupSelect: 'Select',
    // Unsaved changes modal
    unsavedTitle: 'Unsaved Changes',
    unsavedMessage: 'You have unsaved changes on this entry',
    unsavedDetail: 'Do you want to leave without saving your changes?',
    unsavedStay: 'Back to Edit',
    unsavedLeave: 'Leave'
  }
};

function getJournalLang() {
  return localStorage.getItem('uiLang') || 'ar';
}

function tJ(key) {
  const lang = getJournalLang();
  return J_TRANSLATIONS[lang]?.[key] || J_TRANSLATIONS['ar'][key] || key;
}

function tJFmt(key, params) {
  let str = tJ(key);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
    }
  }
  return str;
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
  return getJournalLang() === 'en' ? toEnglishWordsCash(n) : toArabicWordsCash(n);
}
function toWordsGold(n){
  return getJournalLang() === 'en' ? toEnglishWordsGold(n) : toArabicWordsGold(n);
}

function isRowEmpty(row) {
  if (!row) return true;
  const customerId = row.querySelector('.customer-select')?.value?.trim();
  const supplierId = row.querySelector('.supplier-select')?.value?.trim();
  const accountId = row.querySelector('.account-select')?.value?.trim();
  const debit = parseFloat(row.querySelector('.debit-input')?.value || '0') || 0;
  const credit = parseFloat(row.querySelector('.credit-input')?.value || '0') || 0;
  const memo = row.querySelector('.memo-input')?.value?.trim();
  return !customerId && !supplierId && !accountId && debit === 0 && credit === 0 && !memo;
}

function addOrFocusEmptyLine() {
  const rows = Array.from(journalLinesBody.children);
  const empty = rows.find(r => isRowEmpty(r));
  if (empty) {
    setTimeout(() => {
      const first = empty.querySelector('.customer-select');
      if (first) first.focus();
    }, 0);
    return empty;
  }
  addJournalLine();
  const newRow = journalLinesBody.lastElementChild;
  setTimeout(() => {
    const first = newRow?.querySelector('.customer-select');
    if (first) first.focus();
  }, 0);
  return newRow;
}

const J_MIN_ROWS = 5;

function ensureMinimumJournalRows(minRows = J_MIN_ROWS) {
  if (!journalLinesBody) return;
  const currentRows = journalLinesBody.children.length;
  for (let i = currentRows; i < minRows; i++) {
    addJournalLine();
  }
}

function resetJournalToMinimumRows(minRows = J_MIN_ROWS) {
  if (!journalLinesBody) return;
  journalLinesBody.innerHTML = '';
  ensureMinimumJournalRows(minRows);
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
function handleArrowNavigation(e, currentInput, className) {
  // Always allow arrow navigation for all fields - no Ctrl/Alt required
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

// Journal Entries Management
let journalEntries = [];
let accountsCache = [];
let customersCache = [];
let suppliersCache = [];
let currentJournalId = null;
let currentFocusedInput = null;
let currentActiveTr = null;
function getJournalBranchScopeMode() {
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
function isJournalAllBranchesScope() {
  return getJournalBranchScopeMode() === 'all';
}
function getJournalNavNumber(journal, fallbackId = 0) {
  const internalId = Number(journal?.id || fallbackId || 0) || 0;
  const manualNumber = Number(journal?.manual_number || 0) || 0;
  return manualNumber || internalId || 0;
}
function buildJournalNavEntries(entries = []) {
  return (Array.isArray(entries) ? entries : [])
    .map((entry) => ({ ...entry }))
    .filter((entry) => Number(entry?.id || 0) > 0)
    .sort((left, right) => {
      const leftNavNumber = Number(getJournalNavNumber(left, left?.id || 0) || 0) || 0;
      const rightNavNumber = Number(getJournalNavNumber(right, right?.id || 0) || 0) || 0;
      if (leftNavNumber !== rightNavNumber) {
        return leftNavNumber - rightNavNumber;
      }
      return (Number(left?.id || 0) || 0) - (Number(right?.id || 0) || 0);
    });
}
function findJournalEntryByNavNumber(value) {
  const targetNavNumber = Number(value || 0) || 0;
  if (targetNavNumber <= 0) {
    return null;
  }
  const matches = journalEntries.filter((entry) => Number(getJournalNavNumber(entry, entry?.id || 0) || 0) === targetNavNumber);
  if (!matches.length) {
    return null;
  }
  const currentId = Number(currentJournalId || 0) || 0;
  return matches.find((entry) => Number(entry?.id || 0) === currentId) || matches[matches.length - 1] || null;
}
function findFirstMissingJournalNumber(entries = []) {
  const manualNumbers = Array.from(new Set(
    (Array.isArray(entries) ? entries : [])
      .map((entry) => Number(entry?.manual_number || 0))
      .filter((value) => Number.isInteger(value) && value > 0)
  )).sort((left, right) => left - right);

  let nextNumber = 1;
  for (const number of manualNumbers) {
    if (number === nextNumber) {
      nextNumber += 1;
      continue;
    }
    if (number > nextNumber) {
      break;
    }
  }

  return nextNumber;
}
function getJournalCounterDisplay() {
  if (isJournalAllBranchesScope()) {
    const currentIndex = journalEntries.findIndex((entry) => Number(entry?.id || 0) === Number(currentJournalId || 0));
    const total = journalEntries.length;
    const current = currentIndex >= 0 ? currentIndex + 1 : 0;
    return { current, total, currentIndex };
  }
  const currentEntry = journalEntries.find((entry) => Number(entry?.id || 0) === Number(currentJournalId || 0)) || null;
  const current = Number(getJournalNavNumber(currentEntry, currentEntry?.id || 0) || 0) || 0;
  const totalEntry = journalEntries[journalEntries.length - 1] || null;
  const total = Number(getJournalNavNumber(totalEntry, totalEntry?.id || 0) || 0) || 0;
  const currentIndex = journalEntries.findIndex((entry) => Number(entry?.id || 0) === Number(currentJournalId || 0));
  return { current, total, currentIndex };
}

// Screen mode state: 'view' | 'new' | 'edit'
let journalScreenMode = 'view';
let journalEditUnlockedForId = null;
let journalSaveInFlight = false;

// Unsaved changes state
let jHasUnsavedChanges = false;
let jPendingUnsavedResolve = null;

// Unsaved changes modal elements
const jUnsavedModal = document.getElementById('unsavedChangesModal');
const jUnsavedClose = document.getElementById('unsavedChangesClose');
const jUnsavedStayBtn = document.getElementById('unsavedStayBtn');
const jUnsavedLeaveBtn = document.getElementById('unsavedLeaveBtn');

function jMarkUnsaved() {
  if (journalScreenMode === 'edit' || journalScreenMode === 'new') {
    jHasUnsavedChanges = true;
  }
}

function jResetUnsaved() {
  jHasUnsavedChanges = false;
}

function jOpenUnsavedModal() {
  if (!jUnsavedModal) return Promise.resolve(true);
  return new Promise(resolve => {
    jPendingUnsavedResolve = resolve;
    jUnsavedModal.classList.add('show');
    jUnsavedModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
}

function jCloseUnsavedModal(result = false) {
  if (jUnsavedModal) {
    jUnsavedModal.classList.remove('show');
    jUnsavedModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  if (jPendingUnsavedResolve) {
    jPendingUnsavedResolve(!!result);
    jPendingUnsavedResolve = null;
  }
}

// Wire unsaved-changes modal buttons
if (jUnsavedClose) jUnsavedClose.addEventListener('click', () => jCloseUnsavedModal(false));
if (jUnsavedStayBtn) jUnsavedStayBtn.addEventListener('click', () => jCloseUnsavedModal(false));
if (jUnsavedLeaveBtn) jUnsavedLeaveBtn.addEventListener('click', () => { jResetUnsaved(); jCloseUnsavedModal(true); });
if (jUnsavedModal) {
  const backdrop = jUnsavedModal.querySelector('.permission-denied-backdrop');
  if (backdrop) backdrop.addEventListener('click', () => jCloseUnsavedModal(false));
}

// Expose guard for outer shell
window.canLeaveJournalEntry = async function () {
  if (!jHasUnsavedChanges || journalScreenMode === 'view') return true;
  try {
    const result = await jOpenUnsavedModal();
    return !!result;
  } catch (e) { return true; }
};

// DOM Elements
const btnNewJournal = document.getElementById('btnNewJournal');
const btnEditTop = document.getElementById('btnEditTop');
const btnSaveTop = document.getElementById('btnSaveTop');
const btnDeleteTop = document.getElementById('btnDeleteTop');
const btnPrintTop = document.getElementById('btnPrintTop');
const btnWhatsApp = document.getElementById('btnWhatsApp');
const btnCloseTop = document.getElementById('j_btnCloseTop');
const btnFirst = document.getElementById('btnFirst');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
const btnLast = document.getElementById('btnLast');
const nav_id = document.getElementById('nav_id');
const nav_counter = document.getElementById('nav_counter');

const journalId = document.getElementById('journalId');
const journalDate = document.getElementById('journalDate');
const journalTime = document.getElementById('journalTime');
const journalMemo = document.getElementById('journalMemo');
const btnCopyMemo = document.getElementById('btnCopyMemo');
const journalLinesBody = document.getElementById('journalLinesBody');
const btnAddLine = document.getElementById('btnAddLine');
const totalDebitCash = document.getElementById('totalDebitCash');
const totalDebitGold = document.getElementById('totalDebitGold');
const totalCreditCash = document.getElementById('totalCreditCash');
const totalCreditGold = document.getElementById('totalCreditGold');
const balanceCash = document.getElementById('balanceCash');
const balanceGold = document.getElementById('balanceGold');

// البطاقة السفلية - العناصر الجديدة
const totalDebitCashDisplay = document.getElementById('totalDebitCash_display');
const totalDebitGoldDisplay = document.getElementById('totalDebitGold_display');
const totalCreditCashDisplay = document.getElementById('totalCreditCash_display');
const totalCreditGoldDisplay = document.getElementById('totalCreditGold_display');
const balanceCashDisplay = document.getElementById('balanceCash_display');
const balanceGoldDisplay = document.getElementById('balanceGold_display');

// Control read-only state based on screen mode
function setJournalReadOnly(isReadOnly){
  if (journalDate) journalDate.disabled = isReadOnly;
  if (journalMemo) journalMemo.disabled = isReadOnly;

  if (btnAddLine) btnAddLine.disabled = isReadOnly;
  if (btnCopyMemo) btnCopyMemo.disabled = isReadOnly;

  if (journalLinesBody){
    journalLinesBody.querySelectorAll('input, button').forEach(el => {
      el.disabled = isReadOnly;
    });
  }

  if (btnSaveTop){
    const saveText = document.getElementById('btnSaveTopText');
    if (saveText) {
      saveText.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${journalScreenMode === 'edit' ? tJ('btnSaveEdit') : tJ('btnSave')}`;
    }
    btnSaveTop.disabled = (journalScreenMode === 'view');
  }

  if (btnNewJournal){
    btnNewJournal.disabled = (journalScreenMode === 'new' || journalScreenMode === 'edit');
  }

  if (btnEditTop){
    const hasId = !!currentJournalId;
    btnEditTop.disabled = !hasId || journalScreenMode !== 'view';
  }

  if (btnDeleteTop){
    const hasId = !!currentJournalId;
    const deleteText = document.getElementById('btnDeleteTopText');
    if (journalScreenMode === 'new' || (journalScreenMode === 'edit' && hasId)){
      if (deleteText) deleteText.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> ${tJ('btnCancel')}`;
      btnDeleteTop.disabled = false;
    } else {
      if (deleteText) deleteText.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> ${tJ('btnDelete')}`;
      btnDeleteTop.disabled = !hasId;
    }
  }

  const inEdit = (journalScreenMode !== 'view');
  if (btnFirst) btnFirst.disabled = inEdit ? true : btnFirst.disabled;
  if (btnPrev)  btnPrev.disabled  = inEdit ? true : btnPrev.disabled;
  if (btnNext)  btnNext.disabled  = inEdit ? true : btnNext.disabled;
  if (btnLast)  btnLast.disabled  = inEdit ? true : btnLast.disabled;
  if (nav_id) nav_id.disabled = inEdit;
}

// ===== Apply static text translations =====
function applyJournalStaticTexts() {
  const lang = getJournalLang();
  const isRtl = lang === 'ar';
  
  // Set document direction and language
  document.documentElement.lang = lang;
  document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  
  // Helper functions
  const setText = (id, key) => {
    const el = document.getElementById(id);
    if (el) el.textContent = tJ(key);
  };
  const setTextWithIcon = (id, key, iconClass) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = `<i class="${iconClass}"></i> ${tJ(key)}`;
  };
  const setAttr = (id, attr, key) => {
    const el = document.getElementById(id);
    if (el) el.setAttribute(attr, tJ(key));
  };
  
  // Toolbar buttons
  setTextWithIcon('btnNewJournalText', 'btnNew', 'fa-solid fa-pen-fancy');
  setTextWithIcon('btnEditTopText', 'btnEdit', 'fa-solid fa-pen-to-square');
  setTextWithIcon('btnSaveTopText', 'btnSave', 'fa-solid fa-circle-check');
  setTextWithIcon('btnDeleteTopText', 'btnDelete', 'fa-solid fa-circle-xmark');
  setTextWithIcon('btnPrintTopText', 'btnPrintPDF', 'fa-solid fa-file-pdf');
  setTextWithIcon('btnCloseTopText', 'btnClose', 'fa-solid fa-arrow-right-from-bracket');
  setTextWithIcon('btnAddLineText', 'btnAddLine', 'fa-solid fa-circle-plus');
  
  // Navigation
  setAttr('btnFirst', 'title', 'navFirst');
  setAttr('btnFirst', 'aria-label', 'navFirst');
  setAttr('btnPrev', 'title', 'navPrev');
  setAttr('btnPrev', 'aria-label', 'navPrev');
  setAttr('btnNext', 'title', 'navNext');
  setAttr('btnNext', 'aria-label', 'navNext');
  setAttr('btnLast', 'title', 'navLast');
  setAttr('btnLast', 'aria-label', 'navLast');
  setAttr('nav_id', 'placeholder', 'navPlaceholder');
  setAttr('nav_id', 'title', 'navGoTo');
  
  // Fix arrow icons direction based on language
  const pager = document.getElementById('j_pager');
  if (pager) {
    pager.style.flexDirection = isRtl ? 'row' : 'row-reverse';
  }
  
  // Header fields
  setText('j_header_title', 'headerTitle');
  setText('j_field_no', 'fieldJournalNo');
  setText('j_field_date', 'fieldDate');
  setText('j_field_time', 'fieldTime');
  setText('j_field_memo', 'fieldMemo');
  setAttr('journalId', 'placeholder', 'placeholderAuto');
  setAttr('journalMemo', 'placeholder', 'placeholderMemo');
  setAttr('btnCopyMemo', 'title', 'btnCopyMemo');
  
  // Table
  setText('j_table_title', 'tableTitle');
  setText('j_th_item', 'thItem');
  setText('j_th_customer_id', 'thCustomerId');
  setText('j_th_supplier_id', 'thSupplierId');
  setText('j_th_account_id', 'thAccountId');
  setText('j_th_name', 'thName');
  setText('j_th_debit', 'thDebit');
  setText('j_th_credit', 'thCredit');
  setText('j_th_currency', 'thCurrencyType');
  setText('j_th_memo', 'thMemo');
  setText('j_th_delete', 'thDelete');
  
  // Totals section
  setText('j_total_debit_label', 'totalDebit');
  setText('j_total_credit_label', 'totalCredit');
  setText('j_total_balance_label', 'totalBalance');
  setText('j_total_cash_debit_label', 'totalCashDebit');
  setText('j_total_cash_credit_label', 'totalCashCredit');
  setText('j_total_gold_debit_label', 'totalGoldDebit');
  setText('j_total_gold_credit_label', 'totalGoldCredit');
  setText('j_total_gold_balance_label', 'totalBalance');
  setText('j_total_silver_debit_label', 'totalSilverDebit');
  setText('j_total_silver_credit_label', 'totalSilverCredit');
  setText('j_total_silver_balance_label', 'totalBalance');
  
  // Table text alignment based on language
  const table = document.getElementById('journalLinesTable');
  if (table) {
    const headers = table.querySelectorAll('th');
    headers.forEach(th => {
      th.style.textAlign = isRtl ? 'right' : 'left';
    });
  }
  
  // Delete confirmation modal
  setText('j_confirmDeleteTitle', 'confirmDeleteTitle');
  setText('j_confirmDeleteYesText', 'confirmYes');
  setText('j_confirmDeleteNoText', 'confirmNo');
  
  // Lookup modals - titles and search labels
  setText('j_lookupCustomerTitle', 'lookupCustomerTitle');
  setText('j_lookupCustomerSearchLabel', 'lookupCustomerSearch');
  setText('j_lookupSupplierTitle', 'lookupSupplierTitle');
  setText('j_lookupSupplierSearchLabel', 'lookupSupplierSearch');
  setText('j_lookupAccountTitle', 'lookupAccountTitle');
  setText('j_lookupAccountSearchLabel', 'lookupAccountSearch');
  
  // Lookup modals - table headers
  setText('j_lc_th_id', 'lookupCustomerId');
  setText('j_lc_th_name', 'lookupCustomerName');
  setText('j_ls_th_id', 'lookupSupplierId');
  setText('j_ls_th_name', 'lookupSupplierName');
  setText('j_la_th_id', 'lookupAccountId');
  setText('j_la_th_name', 'lookupAccountName');
  
  // Lookup modals - cancel buttons
  setText('j_lc_cancel', 'lookupCancel');
  setText('j_ls_cancel', 'lookupCancel');
  setText('j_la_cancel', 'lookupCancel');
  
  // Lookup modals - search placeholders
  const lcSearch = document.getElementById('lc_search');
  const lsSearch = document.getElementById('ls_search');
  const laSearch = document.getElementById('la_search');
  if (lcSearch) lcSearch.placeholder = tJ('lookupSearchPlaceholder');
  if (lsSearch) lsSearch.placeholder = tJ('lookupSearchPlaceholder');
  if (laSearch) laSearch.placeholder = tJ('lookupSearchPlaceholder');
  
  // Lookup modals - table header alignment based on language
  const lookupTables = ['lc_table', 'ls_table', 'la_table'];
  lookupTables.forEach(tableId => {
    const lookupTable = document.getElementById(tableId);
    if (lookupTable) {
      lookupTable.querySelectorAll('th').forEach(th => {
        th.style.textAlign = isRtl ? 'right' : 'left';
      });
    }
  });
  
  // Currency datalist - update options based on language
  const currencyDatalist = document.getElementById('currency_datalist');
  if (currencyDatalist) {
    const currencyOptions = [
      'currencySAR',
      'currencyGold24',
      'currencyGold22',
      'currencyGold21',
      'currencyGold18',
      'currencySilver999',
      'currencySilver925',
      'currencySilver900',
      'currencySilver800'
    ];
    currencyDatalist.innerHTML = currencyOptions.map(key => {
      const label = tJ(key);
      // Use the localized label for both value and display so the input shows the current UI language
      return `<option value="${label}">${label}</option>`;
    }).join('');

    // Normalize existing row inputs to current language
    const pairs = currencyOptions.map(key => ({
      key,
      ar: (J_TRANSLATIONS.ar?.[key] || '').toString().toLowerCase(),
      en: (J_TRANSLATIONS.en?.[key] || '').toString().toLowerCase()
    }));
    document.querySelectorAll('#journalLinesTable .currency-select').forEach(inp => {
      const v = (inp.value || '').toString().toLowerCase();
      const match = pairs.find(p => v === p.ar || v === p.en);
      if (match) {
        inp.value = tJ(match.key);
      }
      // Update placeholder as well
      inp.placeholder = tJ('thCurrencyType');
      inp.title = tJ('thCurrencyType');
    });
  }
}

// Lookup Modals
const lookupCustomerModal = document.getElementById('lookupCustomerModal');
const lookupSupplierModal = document.getElementById('lookupSupplierModal');
const lookupAccountModal = document.getElementById('lookupAccountModal');
// Toast helper (match voucher screen)
function showToast(type='success', message=''){
  const wrap = document.getElementById('toastWrap');
  if (!wrap){
    try{ if(window.showAlert) showAlert(message || (type==='error' ? tJ('toastError') : 'OK'), type); }catch(_){ }
    return;
  }
  const el = document.createElement('div');
  el.className = `toast ${type==='error' ? 'error' : 'success'}`;
  const icon = type==='error' ? '<i class="fa-regular fa-circle-xmark icon"></i>' : '<i class="fa-regular fa-circle-check icon"></i>';
  el.innerHTML = `${icon}<span>${message}</span>`;
  wrap.appendChild(el);
  const timeout = setTimeout(()=>{
    el.style.opacity='0';
    el.style.transform='translateY(6px)';
    setTimeout(()=>{ if (el.parentNode) el.parentNode.removeChild(el); }, 180);
  }, 3500);
}

// Show toast notification (like opening screen hint)
function showHint(message, autoClose=true){
  // Create toast if doesn't exist
  let toast = document.getElementById('journal-hint-toast');
  if (!toast){
    toast = document.createElement('div');
    toast.id = 'journal-hint-toast';
    toast.style.cssText = `
      position:fixed; top:20px; left:50%; transform:translateX(-50%);
      z-index:9999; padding:16px 24px; background:#1e3a5f; color:#fff;
      border-radius:12px; border:1px solid #2d5a8f;
      box-shadow:0 8px 24px rgba(0,0,0,0.3);
      font-size:14px; line-height:1.6; max-width:600px; text-align:center;
      opacity:0; transition:opacity 0.3s ease;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = message || '';
  // Show
  setTimeout(()=>{ toast.style.opacity='1'; }, 10);
  // Auto hide
  if (autoClose){
    setTimeout(()=>{
      toast.style.opacity='0';
      setTimeout(()=>{ if (toast.parentNode) toast.parentNode.removeChild(toast); }, 300);
    }, 3500);
  }
}

// Confirm delete modal (from voucher screen)
function confirmDelete(message){
  return new Promise(resolve => {
    const modal = document.getElementById('confirmDeleteModal');
    if (!modal){ resolve(window.confirm(message || tJ('confirmDeleteMessage'))); return; }
    const m = document.getElementById('confirmDeleteMsg');
    const y = document.getElementById('confirmDeleteYes');
    const n = document.getElementById('confirmDeleteNo');
    const c = document.getElementById('confirmDeleteClose');
    const bd = modal.querySelector('.modal-backdrop');
    if (m) m.textContent = message || tJ('confirmDeleteMessage');
    modal.setAttribute('aria-hidden','false');
    const close = ()=>{ modal.setAttribute('aria-hidden','true'); cleanup(); };
    const cleanup = ()=>{ y&&y.removeEventListener('click',onY); n&&n.removeEventListener('click',onN); c&&c.removeEventListener('click',onN); bd&&bd.removeEventListener('click',onN); };
    const onY = ()=>{ resolve(true); close(); };
    const onN = ()=>{ resolve(false); close(); };
    y&&y.addEventListener('click', onY);
    n&&n.addEventListener('click', onN);
    c&&c.addEventListener('click', onN);
    bd&&bd.addEventListener('click', onN);
  });
}

// Convert gold to karat 21
function convertToKarat21(weight, currencyType) {
  const val = (currencyType || '').toString().toLowerCase();
  if (!val.includes('ذهب') && !val.includes('gold')) {
    return 0; // Not gold
  }
  
  // Extract karat number from currency type (e.g., "ذهب عيار 24" or "Gold 24K" -> 24)
  const match = val.match(/\d+/);
  if (!match) {
    return weight; // No karat specified, assume 21
  }
  
  const karat = parseInt(match[0]);
  // Formula: weight_21 = weight × (karat / 21)
  return weight * (karat / 21);
}

// Extract karat from currency type (e.g., "ذهب عيار 24" -> "24", "Gold 24K" -> "24", "فضة عيار 999" -> "999")
function extractKarat(currencyType) {
  const val = (currencyType || '').toString().toLowerCase();
  if (!val) return null;
  
  // Support both Arabic and English labels for gold and silver
  if (!val.includes('ذهب') && !val.includes('gold') && !val.includes('فضة') && !val.includes('silver')) {
    return null; // Not gold or silver
  }
  
  const match = val.match(/\d+/);
  return match ? match[0] : null; // Return as string
}

// Get name by IDs
function getNameByIds(customerId, supplierId, accountId) {
  // Convert to number and check if valid
  const cid = customerId ? parseInt(customerId) : null;
  const sid = supplierId ? parseInt(supplierId) : null;
  const aidRaw = accountId || null;
  
  if (cid && !isNaN(cid)) {
    const c = customersCache.find(x => x.id == cid);
    if (c && c.name) {
      return c.name;
    }
  }
  if (sid && !isNaN(sid)) {
    const s = suppliersCache.find(x => x.id == sid);
    if (s && s.name) {
      return s.name;
    }
  }
  if (aidRaw) {
    // البحث بكود الحساب الظاهر فقط في شاشة القيد
    const a = accountsCache.find(x => String(x.code) === String(aidRaw));
    if (a && a.name) {
      return a.name;
    }
  }
  return '';
}

async function waitForJournal(maxMs = 3000) {
  const start = Date.now();
  while (Date.now() - start < maxMs) {
    if (window.journal && typeof window.journal.getJournalEntry === 'function' && typeof window.journal.listJournalEntries === 'function') {
      return true;
    }
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  return !!(window.journal && typeof window.journal.getJournalEntry === 'function');
}

function getJournalQueryId() {
  try {
    const params = new URLSearchParams(window.location.search || '');
    const idStr = params.get('id');
    const jid = idStr ? parseInt(idStr, 10) : 0;
    return Number.isFinite(jid) && jid > 0 ? jid : null;
  } catch (_) {
    return null;
  }
}

function getJournalLookupAccounts(rows) {
  const allRows = Array.isArray(rows) ? rows.filter(Boolean) : [];
  const leafRows = allRows.filter(x => x.is_parent !== 1);
  if (!leafRows.length) return leafRows;
  const excludedRootCodes = new Set(['114', '211']);
  const excludedRootIds = allRows
    .filter(x => excludedRootCodes.has(String(x.code || '').trim()))
    .map(x => String(x.id));
  if (!excludedRootIds.length) return leafRows;
  const childrenByParent = new Map();
  for (const account of allRows) {
    const parentKey = account?.parent_id == null ? '' : String(account.parent_id);
    if (!childrenByParent.has(parentKey)) childrenByParent.set(parentKey, []);
    childrenByParent.get(parentKey).push(account);
  }
  const excludedIds = new Set(excludedRootIds);
  const queue = [...excludedRootIds];
  while (queue.length) {
    const parentId = String(queue.shift());
    const children = childrenByParent.get(parentId) || [];
    for (const child of children) {
      const childId = String(child?.id || '');
      if (!childId || excludedIds.has(childId)) continue;
      excludedIds.add(childId);
      queue.push(childId);
    }
  }
  return leafRows.filter(x => !excludedIds.has(String(x.id)));
}

// Initialize
async function init() {
  // Apply translations
  applyJournalStaticTexts();
  
  // ✅ Initialize screen permissions
  if (window.ScreenPermissions) {
    await window.ScreenPermissions.init();
  }

  ensureMinimumJournalRows();
  updateTotals();

  await waitForJournal(5000);
  
  await Promise.all([
    loadAccounts(),
    loadCustomers(),
    loadSuppliers(),
    loadAllJournalEntries()
  ]);
  setupEventListeners();
  setupLookupModals();
  setupKeyboardNavigation();
  setDefaultDate();
  
  // If opened with ?id= load that journal directly; else load last or create new
  const queryJournalId = getJournalQueryId();
  if (queryJournalId) {
    await loadJournalById(queryJournalId);
    return;
  }
  // Load last journal or create new
  if (journalEntries.length > 0) {
    const lastId = journalEntries[journalEntries.length - 1].id;
    await loadJournalById(lastId);
  } else {
    await createNewJournal();
  }
}

// Setup keyboard navigation (arrow keys)
function setupKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    // Check if focus is not in an input field
    const activeElement = document.activeElement;
    const isInputField = activeElement && (
      activeElement.tagName === 'INPUT' || 
      activeElement.tagName === 'TEXTAREA' || 
      activeElement.tagName === 'SELECT'
    );
    
    // If in input field, don't intercept (except for special cases)
    if (isInputField) return;
    
    // Ctrl+N for new journal
    if (e.ctrlKey && e.key === 'n') {
      e.preventDefault();
      createNewJournal();
      return;
    }
    
    // Ctrl+S for save
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      saveJournal();
      return;
    }
    
    // Arrow keys navigation
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      navigateToJournal('prev');
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      navigateToJournal('next');
    } else if (e.key === 'PageUp') {
      e.preventDefault();
      navigateToJournal('prev');
    } else if (e.key === 'PageDown') {
      e.preventDefault();
      navigateToJournal('next');
    } else if (e.key === 'Home' && e.ctrlKey) {
      e.preventDefault();
      navigateToJournal('first');
    } else if (e.key === 'End' && e.ctrlKey) {
      e.preventDefault();
      navigateToJournal('last');
    }
  });
}

// Set default date (using local date, not UTC)
function setDefaultDate() {
  const d = new Date();
  journalDate.value = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}

// Load all data
async function loadAccounts() {
  try {
    const result = await window.api.listAccounts();
    if (result && result.success && Array.isArray(result.data)) {
      accountsCache = result.data;
    } else if (result && Array.isArray(result)) {
      accountsCache = result;
    }
  } catch (error) {
    
  }
}

async function loadCustomers() {
  try {
    const result = await window.api.listCustomers();
    if (result && result.success && Array.isArray(result.data)) {
      customersCache = result.data;
    } else if (result && Array.isArray(result)) {
      customersCache = result;
    }
  } catch (error) {
    
  }
}

async function loadSuppliers() {
  try {
    const result = await window.api.listSuppliers();
    if (result && result.success && Array.isArray(result.data)) {
      suppliersCache = result.data;
    } else if (result && Array.isArray(result)) {
      suppliersCache = result;
    }
  } catch (error) {
    
  }
}

async function loadAllJournalEntries() {
  try {
    await waitForJournal();
    if (window.journal && window.journal.listJournalEntries) {
      const result = await window.journal.listJournalEntries();
      if (result && result.success && Array.isArray(result.data)) {
        journalEntries = buildJournalNavEntries(result.data);
        updateNavCounter();
      }
    }
  } catch (error) {
    
  }
}

// Setup event listeners
function setupEventListeners() {
  btnNewJournal.addEventListener('click', async () => {
    await createNewJournal();
  });
  if (btnEditTop){
    btnEditTop.addEventListener('click', async () => {
      if (!currentJournalId){
        showToast('error', tJ('validationNoJournalToEdit'));
        return;
      }
      if (journalScreenMode !== 'view') return;
      if (window.ScreenPermissions && !window.ScreenPermissions.check('journal_edit', 'تعديل قيد يومية')) {
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
      journalScreenMode = 'edit';
      journalEditUnlockedForId = currentJournalId;
      setJournalReadOnly(false);
    });
  }
  btnSaveTop.addEventListener('click', saveJournal);
  btnDeleteTop.addEventListener('click', deleteCurrentJournal);
  btnPrintTop.addEventListener('click', printJournal);
  if (btnWhatsApp) btnWhatsApp.addEventListener('click', sendJournalWhatsApp);
  
  // Close button - navigate back to dashboard (respect unsaved changes)
  if (btnCloseTop) {
    btnCloseTop.addEventListener('click', async () => {
      if (typeof window.canLeaveJournalEntry === 'function') {
        const canLeave = await window.canLeaveJournalEntry();
        if (!canLeave) return;
      }
      btnCloseTop.style.transform = 'scale(0.95)';
      setTimeout(() => {
        btnCloseTop.style.transform = '';
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
  
  // Track changes on header fields and lines table
  const jHeaderInputs = ['journalDate', 'journalTime', 'journalMemo'];
  jHeaderInputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      ['input', 'change'].forEach(evt => el.addEventListener(evt, () => jMarkUnsaved()));
    }
  });
  const jLinesTable = document.getElementById('journalLinesBody');
  if (jLinesTable) {
    jLinesTable.addEventListener('input', () => jMarkUnsaved());
    jLinesTable.addEventListener('change', () => jMarkUnsaved());
  }
  
  btnFirst.addEventListener('click', () => navigateToJournal('first'));
  btnPrev.addEventListener('click', () => navigateToJournal('prev'));
  btnNext.addEventListener('click', () => navigateToJournal('next'));
  btnLast.addEventListener('click', () => navigateToJournal('last'));
  
  // Navigate to journal by ID when Enter is pressed
  nav_id.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const id = parseInt(nav_id.value);
      if (id && !isNaN(id)) {
        const entry = findJournalEntryByNavNumber(id) || journalEntries.find(j => Number(j.id) === Number(id));
        if (entry && entry.id) {
          await loadJournalById(entry.id);
        } else {
          showToast('error', tJFmt('journalNotFound', { id: id }));
        }
      }
    }
  });
  
  btnAddLine.addEventListener('click', addOrFocusEmptyLine);
  
  // Copy memo to all non-empty lines
  if (btnCopyMemo) {
    btnCopyMemo.addEventListener('click', () => {
      const memoText = journalMemo.value.trim();
      if (!memoText) {
        showToast('error', tJ('toastNoMemo'));
        return;
      }
      
      let copiedCount = 0;
      Array.from(journalLinesBody.children).forEach(row => {
        // Check if row is not empty (has customer, supplier, or account)
        const customerId = row.querySelector('.customer-select')?.value;
        const supplierId = row.querySelector('.supplier-select')?.value;
        const accountId = row.querySelector('.account-select')?.value;
        
        if (customerId || supplierId || accountId) {
          const memoInput = row.querySelector('.memo-input');
          if (memoInput) {
            memoInput.value = memoText;
            copiedCount++;
          }
        }
      });
      
      if (copiedCount > 0) {
        showToast('success', tJFmt('toastCopiedMemo', { count: copiedCount, unit: copiedCount === 1 ? tJ('unitLine') : tJ('unitLines') }));
      } else {
        showToast('error', tJ('toastNoEmptyRows'));
      }
    });
  }
  
  // F9 and Enter shortcuts on tbody
  journalLinesBody.addEventListener('keydown', handleTableKeydown);
  journalLinesBody.addEventListener('keydown', handleEnterNavigation);
  
  // Right-click to open lookup modals
  journalLinesBody.addEventListener('contextmenu', handleTableContextMenu);
}

// Handle table keydown (F9 and Enter)
function handleTableKeydown(e) {
  const inp = e.target.closest('input');
  const tr = inp.closest('tr');
  if (!tr) return;
  // لا نسمح بالاختصارات في وضع العرض أو عندما يكون الحقل مقفولاً
  if (journalScreenMode === 'view' || inp.disabled || inp.readOnly) return;
  
  // F9 lookups
  if (e.key === 'F9') {
    e.preventDefault();
    currentActiveTr = tr;
    
    if (inp.classList.contains('customer-select')) {
      currentFocusedInput = inp;
      openLookupModal('customer');
    } else if (inp.classList.contains('supplier-select')) {
      currentFocusedInput = inp;
      openLookupModal('supplier');
    } else if (inp.classList.contains('account-select')) {
      currentFocusedInput = inp;
      openLookupModal('account');
    }
    return;
  }
}

// Right-click to open lookup modals
function handleTableContextMenu(e) {
  const inp = e.target.closest('input');
  const tr = inp.closest('tr');
  if (!tr) return;
  if (journalScreenMode === 'view' || inp.disabled || inp.readOnly) return;
  
  currentActiveTr = tr;
  
  if (inp.classList.contains('customer-select')) {
    e.preventDefault();
    currentFocusedInput = inp;
    openLookupModal('customer');
  } else if (inp.classList.contains('supplier-select')) {
    e.preventDefault();
    currentFocusedInput = inp;
    openLookupModal('supplier');
  } else if (inp.classList.contains('account-select')) {
    e.preventDefault();
    currentFocusedInput = inp;
    openLookupModal('account');
  }
}

// Moved from inside handleTableContextMenu - this should be in handleTableKeydown
function handleEnterNavigation(e) {
  const inp = e.target;
  const tr = inp.closest('tr');
  if (!tr) return;
  
  // Enter navigation
  if (e.key === 'Enter') {
    e.preventDefault();
    
    // ✅ Check if trying to leave account without filling any ID field
    if (inp.classList.contains('account-select')) {
      const customerVal = String(tr.querySelector('.customer-select')?.value || '').trim();
      const supplierVal = String(tr.querySelector('.supplier-select')?.value || '').trim();
      const accountVal = String(inp.value || '').trim();
      
      // If account has value, allow navigation
      if (!accountVal && !customerVal && !supplierVal) {
        showToast('error', tJ('validationIdRequired'));
        const customerField = tr.querySelector('.customer-select');
        if (customerField) {
          setTimeout(() => {
            customerField.focus();
            customerField.select && customerField.select();
          }, 0);
        }
        return;
      }
    }
    
    let nextEl = null;
    
    if (inp.classList.contains('customer-select')) {
      const hasValue = String(inp.value || '').trim() !== '';
      // ✅ Jump directly to debit if customer has value
      nextEl = hasValue ? tr.querySelector('.debit-input') : tr.querySelector('.supplier-select');
    } else if (inp.classList.contains('supplier-select')) {
      const hasValue = String(inp.value || '').trim() !== '';
      // ✅ Jump directly to debit if supplier has value
      nextEl = hasValue ? tr.querySelector('.debit-input') : tr.querySelector('.account-select');
    } else if (inp.classList.contains('account-select')) {
      nextEl = tr.querySelector('.debit-input');
    } else if (inp.classList.contains('debit-input')) {
      nextEl = tr.querySelector('.credit-input');
    } else if (inp.classList.contains('credit-input')) {
      nextEl = tr.querySelector('.currency-select');
    } else if (inp.classList.contains('currency-select')) {
      nextEl = tr.querySelector('.memo-input');
    } else if (inp.classList.contains('memo-input')) {
      // Check if next row exists first
      const nextRow = tr.nextElementSibling;
      if (nextRow) {
        // Move to existing next row
        nextEl = nextRow.querySelector('.customer-select');
      } else {
        // No next row - use addOrFocusEmptyLine (will add new row)
        const focused = addOrFocusEmptyLine();
        nextEl = focused ? focused.querySelector('.customer-select') : null;
      }
    }
    
    if (nextEl) {
      setTimeout(() => {
        nextEl.focus();
        nextEl.select && nextEl.select();
      }, 0);
    }
  }
}

// Setup lookup modals
function setupLookupModals() {
  // Customer modal
  const lc_search = document.getElementById('lc_search');
  const lc_tbody = document.getElementById('lc_tbody');
  
  lc_search.addEventListener('input', () => {
    const term = lc_search.value.toLowerCase();
    const filtered = customersCache.filter(c => 
      String(c.id).includes(term) || (c.name && c.name.toLowerCase().includes(term))
    );
    renderLookupTable(lc_tbody, filtered, 'customer');
  });
  
  document.getElementById('lookupCustomerClose').addEventListener('click', () => closeLookupModal('customer'));
  document.getElementById('lookupCustomerCancel').addEventListener('click', () => closeLookupModal('customer'));
  lookupCustomerModal.querySelector('.modal-backdrop').addEventListener('click', () => closeLookupModal('customer'));
  
  // Click on customer row
  lc_tbody.addEventListener('click', (e) => {
    const row = e.target.closest('tr');
    if (!row || !row.dataset.id) return;
    selectLookupItem(Number(row.dataset.id), 'customer');
  });
  
  // Supplier modal
  const ls_search = document.getElementById('ls_search');
  const ls_tbody = document.getElementById('ls_tbody');
  
  ls_search.addEventListener('input', () => {
    const term = ls_search.value.toLowerCase();
    const filtered = suppliersCache.filter(s => 
      String(s.id).includes(term) || (s.name && s.name.toLowerCase().includes(term))
    );
    renderLookupTable(ls_tbody, filtered, 'supplier');
  });
  
  document.getElementById('lookupSupplierClose').addEventListener('click', () => closeLookupModal('supplier'));
  document.getElementById('lookupSupplierCancel').addEventListener('click', () => closeLookupModal('supplier'));
  lookupSupplierModal.querySelector('.modal-backdrop').addEventListener('click', () => closeLookupModal('supplier'));
  
  // Click on supplier row
  ls_tbody.addEventListener('click', (e) => {
    const row = e.target.closest('tr');
    if (!row || !row.dataset.id) return;
    selectLookupItem(Number(row.dataset.id), 'supplier');
  });
  
  // Account modal
  const la_search = document.getElementById('la_search');
  const la_tbody = document.getElementById('la_tbody');
  
  la_search.addEventListener('input', () => {
    const term = la_search.value.toLowerCase();
    const nonParent = getJournalLookupAccounts(accountsCache);
    const filtered = nonParent.filter(a => 
      String(a.code||a.id).includes(term) || (a.name && a.name.toLowerCase().includes(term))
    );
    renderLookupTable(la_tbody, filtered, 'account');
  });
  
  document.getElementById('lookupAccountClose').addEventListener('click', () => closeLookupModal('account'));
  document.getElementById('lookupAccountCancel').addEventListener('click', () => closeLookupModal('account'));
  lookupAccountModal.querySelector('.modal-backdrop').addEventListener('click', () => closeLookupModal('account'));
  
  // Click on account row
  la_tbody.addEventListener('click', (e) => {
    const row = e.target.closest('tr');
    if (!row || !row.dataset.id) return;
    selectLookupItem(Number(row.dataset.id), 'account');
  });
}

// Open lookup modal
async function openLookupModal(type) {
  // Ensure data is loaded
  if (type === 'customer' && customersCache.length === 0) {
    await loadCustomers();
  } else if (type === 'supplier' && suppliersCache.length === 0) {
    await loadSuppliers();
  } else if (type === 'account' && accountsCache.length === 0) {
    await loadAccounts();
  }
  
  if (type === 'customer') {
    lookupCustomerModal.setAttribute('aria-hidden', 'false');
    document.getElementById('lc_search').value = '';
    renderLookupTable(document.getElementById('lc_tbody'), customersCache, 'customer');
    setTimeout(() => document.getElementById('lc_search').focus(), 100);
  } else if (type === 'supplier') {
    lookupSupplierModal.setAttribute('aria-hidden', 'false');
    document.getElementById('ls_search').value = '';
    renderLookupTable(document.getElementById('ls_tbody'), suppliersCache, 'supplier');
    setTimeout(() => document.getElementById('ls_search').focus(), 100);
  } else if (type === 'account') {
    lookupAccountModal.setAttribute('aria-hidden', 'false');
    document.getElementById('la_search').value = '';
    renderLookupTable(document.getElementById('la_tbody'), getJournalLookupAccounts(accountsCache), 'account');
    setTimeout(() => document.getElementById('la_search').focus(), 100);
  }
}

// Close lookup modal
function closeLookupModal(type) {
  if (type === 'customer') {
    lookupCustomerModal.setAttribute('aria-hidden', 'true');
  } else if (type === 'supplier') {
    lookupSupplierModal.setAttribute('aria-hidden', 'true');
  } else if (type === 'account') {
    lookupAccountModal.setAttribute('aria-hidden', 'true');
  }
}

// Render lookup table
function renderLookupTable(tbody, items, type) {
  if (!tbody) return;
  if (!items.length) {
    tbody.innerHTML = `<tr><td colspan="2" style="text-align:center;padding:10px">${tJ('lookupNoResults')}</td></tr>`;
    return;
  }
  tbody.innerHTML = items.map(item => {
    // للحسابات: نعرض code بدلاً من id
    const displayId = (type === 'account') ? (item.code || item.id) : item.id;
    return `
    <tr data-id="${item.id}" data-code="${item.code||''}" style="cursor:pointer">
      <td style="width:140px">${displayId}</td>
      <td>${item.name || item.full_name || item.company || ''}</td>
    </tr>
  `;}).join('');
}

// Start journal screen in view/read-only mode by default
setJournalReadOnly(true);

// Select lookup item
function selectLookupItem(id, type) {
  if (!currentActiveTr) return;
  
  const customerInput = currentActiveTr.querySelector('.customer-select');
  const supplierInput = currentActiveTr.querySelector('.supplier-select');
  const accountInput = currentActiveTr.querySelector('.account-select');
  const nameInput = currentActiveTr.querySelector('.name-input');
  
  // Apply rule: when selecting one, clear the others
  if (type === 'customer') {
    if (customerInput) customerInput.value = id;
    if (supplierInput) supplierInput.value = '';
    if (accountInput) accountInput.value = '';
  } else if (type === 'supplier') {
    if (supplierInput) supplierInput.value = id;
    if (customerInput) customerInput.value = '';
    if (accountInput) accountInput.value = '';
  } else if (type === 'account') {
    // للحسابات: نستخدم code بدلاً من id
    const acc = accountsCache.find(x => Number(x.id) === Number(id));
    if (accountInput) accountInput.value = acc?.code || id;
    if (customerInput) customerInput.value = '';
    if (supplierInput) supplierInput.value = '';
  }
  
  // Update name field
  if (nameInput) {
    const cid = customerInput ? customerInput.value : null;
    const sid = supplierInput ? supplierInput.value : null;
    const aid = accountInput ? accountInput.value : null;
    nameInput.value = getNameByIds(cid, sid, aid);
  }
  
  closeLookupModal(type);
}

// Get next journal ID from DB (fills gaps)
async function getNextJournalId() {
  try {
    await waitForJournal();
    if (window.journal && window.journal.getNextId) {
      const result = await window.journal.getNextId();
      if (result && result.success && result.nextId) {
        return parseInt(result.nextId, 10);
      }
    }
  } catch (error) {
    
  }
  
  // Fallback: find first gap in client-side data
  if (journalEntries.length === 0) {
    return 1;
  }

  return findFirstMissingJournalNumber(journalEntries);
}

// Create new journal
async function createNewJournal() {
  journalScreenMode = 'new';
  journalEditUnlockedForId = null;
  setJournalReadOnly(false);
  // Reset current journal ID
  currentJournalId = null;
  
  // Get next ID from DB (fills gaps)
  const nextId = await getNextJournalId();
  
  journalId.value = nextId;
  if (nav_id) nav_id.value = nextId;
  
  // Use local date (not UTC)
  const d = new Date();
  journalDate.value = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
  // Set current time
  const now = new Date();
  journalTime.value = now.toTimeString().slice(0, 5); // HH:MM format
  journalMemo.value = '';
  resetJournalToMinimumRows();
  updateTotals();
  updateNavCounter();
  
  // Focus memo field
  setTimeout(() => {
    try { journalMemo.focus(); } catch(_) {}
  }, 0);
}

// Add journal line
function addJournalLine(data = {}) {
  const lineNumber = journalLinesBody.children.length + 1;
  const row = document.createElement('tr');
  const searchPlaceholder = tJ('placeholderSearch');
  const memoPlaceholder = tJ('placeholderNote');
  const currencyPlaceholder = tJ('thCurrencyType');
  const defaultCurrency = tJ('currencySAR');
  const deleteTitle = tJ('btnDelete');

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
  row.innerHTML = `
    <td>${lineNumber}</td>
    <td>
      <input type="text" class="customer-select" placeholder="${searchPlaceholder}" title="${searchPlaceholder}" value="${rawCustomerId}" tabindex="${lineNumber * 10 + 1}">
    </td>
    <td>
      <input type="text" class="supplier-select" placeholder="${searchPlaceholder}" title="${searchPlaceholder}" value="${rawSupplierId}" tabindex="${lineNumber * 10 + 2}">
    </td>
    <td>
      <input type="text" class="account-select" placeholder="${searchPlaceholder}" title="${searchPlaceholder}" value="${accountCode}" tabindex="${lineNumber * 10 + 3}">
    </td>
    <td>
      <input type="text" class="name-input" readonly value="${initialName}" style="min-width:180px">
    </td>
    <td><input type="text" class="debit-input" value="${data.debit != null ? formatNumberWithCommas(data.debit) : ''}" oninput="handleDebitInput(this)" tabindex="${lineNumber * 10 + 4}" inputmode="decimal"></td>
    <td><input type="text" class="credit-input" value="${data.credit != null ? formatNumberWithCommas(data.credit) : ''}" oninput="handleCreditInput(this)" tabindex="${lineNumber * 10 + 5}" inputmode="decimal"></td>
    <td>
      <input type="text" class="currency-select" list="currency_datalist" value="${data.currency_type || defaultCurrency}" tabindex="${lineNumber * 10 + 6}" style="width:115px; font-size:12px; padding:4px 6px" placeholder="${currencyPlaceholder}">
    </td>
    <td><input type="text" class="memo-input" placeholder="${memoPlaceholder}" value="${data.memo || ''}" tabindex="${lineNumber * 10 + 7}"></td>
    <td>
      <button class="icon-btn act-delete" onclick="deleteJournalLine(this)" title="${deleteTitle}" tabindex="-1">
        <i class="fa-solid fa-trash"></i>
      </button>
    </td>
  `;
  journalLinesBody.appendChild(row);
  
  // Add input event listeners to update name field
  const customerInput = row.querySelector('.customer-select');
  const supplierInput = row.querySelector('.supplier-select');
  const accountInput = row.querySelector('.account-select');
  const nameInput = row.querySelector('.name-input');
  
  function updateName() {
    if (nameInput) {
      nameInput.value = getNameByIds(customerInput.value, supplierInput.value, accountInput.value);
    }
  }
  
  // Enforce mutual exclusivity like opening screen
  function enforceExclusivity(changed){
    const v = String(changed.value||'').trim();
    if (v){
      // If any other id is already present, show hint and clear
      const otherHasValue = (
        (changed !== customerInput && customerInput && String(customerInput.value||'').trim()!=='') ||
        (changed !== supplierInput && supplierInput && String(supplierInput.value||'').trim()!=='') ||
        (changed !== accountInput  && accountInput  && String(accountInput.value||'').trim()!=='')
      );
      if (otherHasValue){
        showHint('ملاحظة: يسمح بإدخال رقم واحد فقط في الصف. إدخال رقم هنا سيؤدي لمسح الأرقام الأخرى في الصف نفسه.');
      }

      if (changed === customerInput){ if (supplierInput) supplierInput.value=''; if (accountInput) accountInput.value=''; }
      else if (changed === supplierInput){ if (customerInput) customerInput.value=''; if (accountInput) accountInput.value=''; }
      else if (changed === accountInput){ if (customerInput) customerInput.value=''; if (supplierInput) supplierInput.value=''; }
    }
    updateName();
  }
  
  // Add numeric-only validation and update name + exclusivity on input/change/blur
  customerInput.addEventListener('input', (e)=>{ 
    e.target.value = e.target.value.replace(/[^\d]/g, ''); 
    enforceExclusivity(customerInput); 
  });
  customerInput.addEventListener('change', ()=>{ enforceExclusivity(customerInput); });
  customerInput.addEventListener('blur', updateName);
  supplierInput.addEventListener('input', (e)=>{ 
    e.target.value = e.target.value.replace(/[^\d]/g, ''); 
    enforceExclusivity(supplierInput); 
  });
  supplierInput.addEventListener('change', ()=>{ enforceExclusivity(supplierInput); });
  supplierInput.addEventListener('blur', updateName);
  accountInput.addEventListener('input', (e)=>{ 
    e.target.value = e.target.value.replace(/[^\d]/g, ''); 
    enforceExclusivity(accountInput); 
  });
  accountInput.addEventListener('change', ()=>{ enforceExclusivity(accountInput); });
  accountInput.addEventListener('blur', updateName);
  
  // Add change listener to currency select to update totals with smart input
  const currencySelect = row.querySelector('.currency-select');

  // Build allowed currencies in both languages using translation keys
  const currencyKeys = ['currencySAR','currencyGold24','currencyGold22','currencyGold21','currencyGold18','currencySilver999','currencySilver925','currencySilver900','currencySilver800'];
  const allowedCurrencies = [
    ...currencyKeys.map(k => J_TRANSLATIONS.ar?.[k] || ''),
    ...currencyKeys.map(k => J_TRANSLATIONS.en?.[k] || '')
  ].filter(Boolean);
  const allowedSetLower = new Set(allowedCurrencies.map(v => v.toString().toLowerCase()));
  const defaultCurrencyLocalized = tJ('currencySAR');
  
  // Smart currency mapping for quick input (Arabic + English)
  const currencyShortcuts = (() => {
    const map = {};
    const L = (key) => tJ(key);
    // Arabic shortcuts
    map['ر'] = L('currencySAR');
    map['ري'] = L('currencySAR');
    map['ريال'] = L('currencySAR');
    map['ذ'] = L('currencyGold21');
    map['ذهب'] = L('currencyGold21');
    map['ذ24'] = L('currencyGold24');
    map['ذ22'] = L('currencyGold22');
    map['ذ21'] = L('currencyGold21');
    map['ذ18'] = L('currencyGold18');
    map['ف'] = L('currencySilver999');
    map['فضة'] = L('currencySilver999');
    map['ف999'] = L('currencySilver999');
    map['ف925'] = L('currencySilver925');
    map['ف900'] = L('currencySilver900');
    map['ف800'] = L('currencySilver800');
    // Numeric shortcuts (work for both languages)
    map['24'] = L('currencyGold24');
    map['22'] = L('currencyGold22');
    map['21'] = L('currencyGold21');
    map['18'] = L('currencyGold18');
    map['999'] = L('currencySilver999');
    map['925'] = L('currencySilver925');
    map['900'] = L('currencySilver900');
    map['800'] = L('currencySilver800');
    // English shortcuts
    map['sar'] = L('currencySAR');
    map['riyal'] = L('currencySAR');
    map['cash'] = L('currencySAR');
    map['g24'] = L('currencyGold24');
    map['g22'] = L('currencyGold22');
    map['g21'] = L('currencyGold21');
    map['g18'] = L('currencyGold18');
    map['24k'] = L('currencyGold24');
    map['22k'] = L('currencyGold22');
    map['21k'] = L('currencyGold21');
    map['18k'] = L('currencyGold18');
    map['gold'] = L('currencyGold21');
    map['silver'] = L('currencySilver999');
    map['s999'] = L('currencySilver999');
    map['s925'] = L('currencySilver925');
    map['s900'] = L('currencySilver900');
    map['s800'] = L('currencySilver800');
    return map;
  })();
  
  if (currencySelect) {
    // Smart input conversion on blur
    currencySelect.addEventListener('blur', () => {
      const raw = currencySelect.value || '';
      const val = raw.trim();
      const lower = val.toLowerCase();
      
      // Check if it's a shortcut
      if (currencyShortcuts[lower]) {
        currencySelect.value = currencyShortcuts[lower];
      }
      // Check if value is valid (case-insensitive)
      else if (val && !allowedSetLower.has(lower)) {
        showToast('error', tJ('toastError'));
        currencySelect.value = defaultCurrencyLocalized;
      }
      updateTotals();
    });
    
    currencySelect.addEventListener('change', updateTotals);
  }
  
  // Add arrow key navigation for all input fields
  const debitInput = row.querySelector('.debit-input');
  const creditInput = row.querySelector('.credit-input');
  const memoInput = row.querySelector('.memo-input');
  
  if (customerInput) {
    customerInput.addEventListener('keydown', (e) => {
      handleArrowNavigation(e, customerInput, 'customer-select');
    });
  }
  if (supplierInput) {
    supplierInput.addEventListener('keydown', (e) => {
      handleArrowNavigation(e, supplierInput, 'supplier-select');
    });
  }
  if (accountInput) {
    accountInput.addEventListener('keydown', (e) => {
      handleArrowNavigation(e, accountInput, 'account-select');
    });
  }
  if (debitInput) {
    debitInput.addEventListener('keydown', (e) => {
      handleArrowNavigation(e, debitInput, 'debit-input');
    });
  }
  if (creditInput) {
    creditInput.addEventListener('keydown', (e) => {
      handleArrowNavigation(e, creditInput, 'credit-input');
    });
  }
  if (currencySelect) {
    currencySelect.addEventListener('keydown', (e) => {
      handleArrowNavigation(e, currencySelect, 'currency-select');
    });
  }
  if (memoInput) {
    memoInput.addEventListener('keydown', (e) => {
      handleArrowNavigation(e, memoInput, 'memo-input');
    });
  }
}

// Check if row has entity (customer, supplier, or account)
function hasEntity(row) {
  const customerId = row.querySelector('.customer-select')?.value?.trim();
  const supplierId = row.querySelector('.supplier-select')?.value?.trim();
  const accountId = row.querySelector('.account-select')?.value?.trim();
  return !!(customerId || supplierId || accountId);
}

// Handle debit input
function handleDebitInput(input) {
  const row = input.closest('tr');
  
  // Check if entity exists
  if (!hasEntity(row)) {
    showHint('يجب إدخال رقم عميل أو مورد أو حساب أولاً');
    input.value = '';
    // Focus on customer field
    setTimeout(() => {
      row.querySelector('.customer-select')?.focus();
    }, 100);
    return;
  }
  
  // Live number formatting
  let value = input.value;
  const cursorPos = input.selectionStart;
  
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
    input.value = formatted;
    
    // Recalculate cursor position based on comma difference
    const beforeCursorNew = formatted.substring(0, cursorPos);
    const commasAfter = (beforeCursorNew.match(/,/g) || []).length;
    const diff = commasAfter - commasBefore;
    const newPos = cursorPos + diff;
    input.setSelectionRange(newPos, newPos);
    
    // Clear credit field
    const creditInput = row.querySelector('.credit-input');
    creditInput.value = '';
  } else {
    input.value = '';
  }
  
  updateTotals();
}

window.handleDebitInput = handleDebitInput;

// Handle credit input
function handleCreditInput(input) {
  const row = input.closest('tr');
  
  // Check if entity exists
  if (!hasEntity(row)) {
    showHint('يجب إدخال رقم عميل أو مورد أو حساب أولاً');
    input.value = '';
    // Focus on customer field
    setTimeout(() => {
      row.querySelector('.customer-select')?.focus();
    }, 100);
    return;
  }
  
  // Live number formatting
  let value = input.value;
  const cursorPos = input.selectionStart;
  
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
    input.value = formatted;
    
    // Recalculate cursor position based on comma difference
    const beforeCursorNew = formatted.substring(0, cursorPos);
    const commasAfter = (beforeCursorNew.match(/,/g) || []).length;
    const diff = commasAfter - commasBefore;
    const newPos = cursorPos + diff;
    input.setSelectionRange(newPos, newPos);
    
    // Clear debit field
    const debitInput = row.querySelector('.debit-input');
    debitInput.value = '';
  } else {
    input.value = '';
  }
  
  updateTotals();
}

window.handleCreditInput = handleCreditInput;

// Delete journal line
function deleteJournalLine(btn) {
  const row = btn.closest('tr');
  if (journalLinesBody.children.length > 1) {
    row.remove();
    renumberLines();
    updateTotals();
  } else {
    showToast('error', tJ('validationMinOneLine'));
  }
}

window.deleteJournalLine = deleteJournalLine;

// Renumber lines
function renumberLines() {
  Array.from(journalLinesBody.children).forEach((row, index) => {
    row.querySelector('td:first-child').textContent = index + 1;
  });
}

// Update totals
function updateTotals() {
  let sumDebitCash = 0;
  let sumDebitGold21 = 0; // Gold converted to karat 21
  let sumCreditCash = 0;
  let sumCreditGold21 = 0; // Gold converted to karat 21
  let sumDebitSilver925 = 0; // Silver converted to 925
  let sumCreditSilver925 = 0;
  
  Array.from(journalLinesBody.children).forEach(row => {
    const debitValue = row.querySelector('.debit-input').value.replace(/,/g, '');
    const creditValue = row.querySelector('.credit-input').value.replace(/,/g, '');
    const debit = parseFloat(debitValue) || 0;
    const credit = parseFloat(creditValue) || 0;
    const currencyType = row.querySelector('.currency-select').value;
    const curLow = (currencyType || '').toLowerCase();
    const isGold = curLow.includes('ذهب') || curLow.includes('gold');
    const isSilver = curLow.includes('فضة') || curLow.includes('silver');
    
    if (isGold) {
      // Convert to karat 21
      sumDebitGold21 += convertToKarat21(debit, currencyType);
      sumCreditGold21 += convertToKarat21(credit, currencyType);
    } else if (isSilver) {
      // Convert to 999 silver
      const match = currencyType.match(/\d+/);
      const karat = match ? parseInt(match[0]) : 999;
      sumDebitSilver925 += debit * (karat / 999);
      sumCreditSilver925 += credit * (karat / 999);
    } else {
      sumDebitCash += debit;
      sumCreditCash += credit;
    }
  });
  
  // Update totals display (gold shown as karat 21)
  if (totalDebitCash) totalDebitCash.textContent = formatNumber(sumDebitCash);
  if (totalDebitGold) totalDebitGold.textContent = formatNumber(sumDebitGold21);
  if (totalCreditCash) totalCreditCash.textContent = formatNumber(sumCreditCash);
  if (totalCreditGold) totalCreditGold.textContent = formatNumber(sumCreditGold21);
  
  // تحديث القيم في البطاقة السفلية
  if (totalDebitCashDisplay) totalDebitCashDisplay.textContent = formatNumber(sumDebitCash);
  if (totalDebitGoldDisplay) totalDebitGoldDisplay.textContent = formatNumber(sumDebitGold21);
  if (totalCreditCashDisplay) totalCreditCashDisplay.textContent = formatNumber(sumCreditCash);
  if (totalCreditGoldDisplay) totalCreditGoldDisplay.textContent = formatNumber(sumCreditGold21);
  
  // Calculate differences for each currency type (using karat 21 for gold)
  const diffCash = Math.abs(sumDebitCash - sumCreditCash);
  const diffGold = Math.abs(sumDebitGold21 - sumCreditGold21);
  
  // Update cash balance
  if (balanceCash) {
    const balanceCashDiv = balanceCash.querySelector('div:last-child');
    if (balanceCashDiv) {
      if (diffCash > 0.01) {
        balanceCashDiv.textContent = formatNumber(diffCash);
        balanceCashDiv.style.color = 'var(--error, #e53935)';
      } else {
        balanceCashDiv.textContent = tJ('balanced') + ' ' + formatNumber(diffCash);
        balanceCashDiv.style.color = 'var(--primary, #0aa39a)';
      }
    }
  }
  
  // تحديث الفرق في البطاقة السفلية (الريال)
  if (balanceCashDisplay) {
    const balanceCashSpan = document.getElementById('balanceCash_value');
    if (balanceCashSpan) {
      if (diffCash > 0.01) {
        balanceCashSpan.textContent = formatNumber(diffCash);
        balanceCashDisplay.style.color = 'var(--error, #e53935)';
      } else {
        balanceCashSpan.textContent = tJ('balanced') + ' ' + formatNumber(diffCash);
        balanceCashDisplay.style.color = 'var(--success, #2ecc71)';
      }
    }
  }
  
  // Update gold balance (shown as karat 21)
  if (balanceGold) {
    const balanceGoldDiv = balanceGold.querySelector('div:last-child');
    if (balanceGoldDiv) {
      if (diffGold > 0.01) {
        balanceGoldDiv.textContent = formatNumber(diffGold);
        balanceGoldDiv.style.color = 'var(--error, #e53935)';
      } else {
        balanceGoldDiv.textContent = tJ('balanced') + ' ' + formatNumber(diffGold);
        balanceGoldDiv.style.color = 'var(--primary, #0aa39a)';
      }
    }
  }
  
  // تحديث الفرق في البطاقة السفلية (الذهب)
  if (balanceGoldDisplay) {
    const balanceGoldSpan = document.getElementById('balanceGold_value');
    if (balanceGoldSpan) {
      if (diffGold > 0.01) {
        balanceGoldSpan.textContent = formatNumber(diffGold);
        balanceGoldDisplay.style.color = 'var(--error, #e53935)';
      } else {
        balanceGoldSpan.textContent = tJ('balanced') + ' ' + formatNumber(diffGold);
        balanceGoldDisplay.style.color = 'var(--success, #2ecc71)';
      }
    }
  }
  
  // تحديث إجماليات الفضة
  const diffSilver = Math.abs(sumDebitSilver925 - sumCreditSilver925);
  const totalDebitSilverDisplay = document.getElementById('totalDebitSilver_display');
  const totalCreditSilverDisplay = document.getElementById('totalCreditSilver_display');
  const balanceSilverDisplay = document.getElementById('balanceSilver_display');
  
  if (totalDebitSilverDisplay) totalDebitSilverDisplay.textContent = formatNumber(sumDebitSilver925);
  if (totalCreditSilverDisplay) totalCreditSilverDisplay.textContent = formatNumber(sumCreditSilver925);
  if (balanceSilverDisplay) {
    const balanceSilverSpan = document.getElementById('balanceSilver_value');
    if (balanceSilverSpan) {
      if (diffSilver > 0.01) {
        balanceSilverSpan.textContent = formatNumber(diffSilver);
        balanceSilverDisplay.style.color = 'var(--error, #e53935)';
      } else {
        balanceSilverSpan.textContent = tJ('balanced') + ' ' + formatNumber(diffSilver);
        balanceSilverDisplay.style.color = '#9ca3af';
      }
    }
  }

  syncJournalBottomLayout();
}

function syncJournalBottomLayout() {
  const journalPanel = document.getElementById('panel-journal');
  const bottomCard = document.getElementById('journal_bottom');
  const gridCard = document.getElementById('journalGrid');
  if (!journalPanel || !bottomCard) return;

  const measuredHeight = Math.ceil(bottomCard.getBoundingClientRect().height || bottomCard.offsetHeight || 0);
  const safeHeight = Math.max(measuredHeight, 72);
  journalPanel.style.setProperty('--journal-bottom-height', `${safeHeight}px`);

  const referenceRect = (gridCard || journalPanel).getBoundingClientRect();
  const safeLeft = Math.max(Math.round(referenceRect.left || 0), 0);
  const safeWidth = Math.max(Math.round(referenceRect.width || journalPanel.getBoundingClientRect().width || 0), 0);
  journalPanel.style.setProperty('--journal-bottom-left', `${safeLeft}px`);
  journalPanel.style.setProperty('--journal-bottom-width', `${safeWidth}px`);
}

// Save journal
async function saveJournal() {
  if (journalSaveInFlight) return;
  journalSaveInFlight = true;
  if (btnSaveTop) btnSaveTop.disabled = true;
  try {
    const curId = parseInt(currentJournalId || 0, 10);

    let isEditingExisting = false;
    if (curId > 0) {
      try {
        const api = window.journal || window.parent?.journal || window.top?.journal;
        if (api && typeof api.getJournalEntry === 'function') {
          const checkResult = await api.getJournalEntry(curId);
          isEditingExisting = checkResult && checkResult.success && checkResult.data;
        }
      } catch(e) {
        isEditingExisting = false;
      }
    }
    
    if (isEditingExisting) {
      if (window.ScreenPermissions && !window.ScreenPermissions.check('journal_edit', 'تعديل قيد يومية')) {
        return;
      }
      if (journalScreenMode !== 'edit') {
        showToast('error', tJ('validationViewMode'));
        return;
      }
      if (journalEditUnlockedForId !== curId) {
        showToast('error', tJ('validationEditUnlocked'));
        return;
      }
    } else {
      if (window.ScreenPermissions && !window.ScreenPermissions.check('journal_add', 'إضافة قيد يومية')) {
        return;
      }
      if (journalScreenMode !== 'new') {
        showToast('error', tJ('validationNewMode'));
        return;
      }
    }
    
    if (!journalDate.value) {
      showToast('error', tJ('validationDateRequired'));
      return;
    }
    
    let chkDebitCash = 0, chkCreditCash = 0;
    let chkDebitGold = 0, chkCreditGold = 0;
    let chkDebitSilver = 0, chkCreditSilver = 0;
    
    Array.from(journalLinesBody.children).forEach(row => {
      const dVal = row.querySelector('.debit-input').value.replace(/,/g, '');
      const cVal = row.querySelector('.credit-input').value.replace(/,/g, '');
      const dAmt = parseFloat(dVal) || 0;
      const cAmt = parseFloat(cVal) || 0;
      const curType = row.querySelector('.currency-select').value;
      const curTypeLow = (curType || '').toLowerCase();
      const isGold = curTypeLow.includes('ذهب') || curTypeLow.includes('gold');
      const isSilver = curTypeLow.includes('فضة') || curTypeLow.includes('silver');
      
      if (isGold) {
        chkDebitGold += convertToKarat21(dAmt, curType);
        chkCreditGold += convertToKarat21(cAmt, curType);
      } else if (isSilver) {
        const match = curType.match(/\d+/);
        const karat = match ? parseInt(match[0]) : 999;
        chkDebitSilver += dAmt * (karat / 999);
        chkCreditSilver += cAmt * (karat / 999);
      } else {
        chkDebitCash += dAmt;
        chkCreditCash += cAmt;
      }
    });
    
    const chkDiffCash = Math.abs(chkDebitCash - chkCreditCash);
    const chkDiffGold = Math.abs(chkDebitGold - chkCreditGold);
    const chkDiffSilver = Math.abs(chkDebitSilver - chkCreditSilver);
    
    if (chkDiffCash > 0.01 || chkDiffGold > 0.01 || chkDiffSilver > 0.01) {
      let errorMsg = tJ('validationNotBalanced') + ' ';
      const isEn = getJournalLang() === 'en';
      if (chkDiffCash > 0.01) errorMsg += `${isEn ? 'Cash diff:' : 'فرق الريال:'} ${formatNumber(chkDiffCash)} | `;
      if (chkDiffGold > 0.01) errorMsg += `${isEn ? 'Gold diff:' : 'فرق الذهب:'} ${formatNumber(chkDiffGold)} | `;
      if (chkDiffSilver > 0.01) errorMsg += `${isEn ? 'Silver diff:' : 'فرق الفضة:'} ${formatNumber(chkDiffSilver)}`;
      showToast('error', errorMsg.replace(/ \| $/, ''));
      return;
    }
    
    const lines = [];
    let hasInvalidRow = false;
    let invalidRowElement = null;
    
    Array.from(journalLinesBody.children).forEach(row => {
      const customerId = row.querySelector('.customer-select').value;
      const supplierId = row.querySelector('.supplier-select').value;
      const accountInputValue = row.querySelector('.account-select').value;
      const debitValue = row.querySelector('.debit-input').value.replace(/,/g, '');
      const creditValue = row.querySelector('.credit-input').value.replace(/,/g, '');
      const debit = parseFloat(debitValue) || 0;
      const credit = parseFloat(creditValue) || 0;
      const currencyType = row.querySelector('.currency-select').value;
      const memo = row.querySelector('.memo-input').value;
      
      if (!customerId && !supplierId && !accountInputValue) {
        if (debit > 0 || credit > 0 || memo) {
          hasInvalidRow = true;
          if (!invalidRowElement) {
            invalidRowElement = row.querySelector('.customer-select');
          }
        }
        return;
      }
      
      let resolvedAccountId = null;
      if (accountInputValue) {
        const acc = accountsCache && Array.isArray(accountsCache)
          ? accountsCache.find(x => String(x.code) === String(accountInputValue))
          : null;
        if (acc && acc.id != null) {
          resolvedAccountId = acc.id;
        }
      }

      if (accountInputValue && !resolvedAccountId && !hasInvalidRow) {
        hasInvalidRow = true;
        invalidRowElement = row.querySelector('.account-select');
        return;
      }
      
      lines.push({
        customer_id: customerId ? parseInt(customerId) : null,
        supplier_id: supplierId ? parseInt(supplierId) : null,
        account_id: resolvedAccountId,
        debit,
        credit,
        currency_type: currencyType,
        karat: extractKarat(currencyType),
        memo
      });
    });
    
    if (hasInvalidRow) {
      const msg = invalidRowElement && invalidRowElement.classList.contains('account-select')
        ? tJ('validationAccountNotFound')
        : tJ('validationIdRequired');
      showToast('error', msg);
      if (invalidRowElement) {
        setTimeout(() => {
          invalidRowElement.focus();
          invalidRowElement.select && invalidRowElement.select();
        }, 100);
      }
      return;
    }
    
    if (lines.length === 0) {
      showToast('warning', tJ('validationMinOneLine'));
      return;
    }
    
    let sumDebitCash = 0, sumCreditCash = 0;
    let sumDebitGold21 = 0, sumCreditGold21 = 0;
    
    lines.forEach(l => {
      const low = (l.currency_type || '').toLowerCase();
      const isGold = low.includes('ذهب') || low.includes('gold');
      if (isGold) {
        sumDebitGold21 += convertToKarat21(l.debit, l.currency_type);
        sumCreditGold21 += convertToKarat21(l.credit, l.currency_type);
      } else {
        sumDebitCash += l.debit;
        sumCreditCash += l.credit;
      }
    });
    
    const diffCash = Math.abs(sumDebitCash - sumCreditCash);
    const diffGold21 = Math.abs(sumDebitGold21 - sumCreditGold21);
    
    if (diffCash > 0.01) {
      showToast('error', tJ('validationNotBalanced'));
      return;
    }
    
    if (diffGold21 > 0.01) {
      showToast('error', tJ('validationNotBalanced'));
      return;
    }
    
    const enteredId = parseInt(journalId.value);
    const now = new Date();
    journalTime.value = now.toTimeString().slice(0, 5);
    const currentUserId = getCurrentUserId();
    const isUpdate = isEditingExisting && curId > 0;
    const data = {
      date: journalDate.value,
      time: journalTime.value,
      memo: journalMemo.value,
      lines
    };
    
    if (isUpdate) {
      data.updated_by = currentUserId;
    } else {
      data.created_by = currentUserId;
    }
    
    let result;
    if (isUpdate) {
      data.id = curId;
      result = await window.journal.updateJournalEntry(data);
    } else {
      data.manual_number = enteredId;
      result = await window.journal.addJournalEntry(data);
    }
    
    if (result && result.success) {
      const savedId = isUpdate ? curId : (result.id || result.journalId);
      if (!isUpdate && Number(savedId) > 0) {
        try {
          window.parent?.postMessage({
            type: 'daily-ops-notification',
            entityType: 'journal',
            documentId: Number(savedId),
            userName: getCurrentUserDisplayName(),
          }, '*');
        } catch (_) {}
      }
      showToast('success', isUpdate ? tJ('toastUpdated') : tJ('toastSaved'));
      currentJournalId = savedId;
      await loadAllJournalEntries();
      if (savedId) {
        await loadJournalById(savedId);
        journalScreenMode = 'view';
        journalEditUnlockedForId = null;
        setJournalReadOnly(true);
        jResetUnsaved();
      }
    } else {
      if (result && result.branchReadOnly && window.handleBranchReadOnlyResponse) {
        window.handleBranchReadOnlyResponse(result);
      } else if (result && result.debtLimitExceeded && window.handleDebtLimitResponse) {
        window.handleDebtLimitResponse(result);
      } else if (result && result.inactiveEntity && window.handleInactiveEntityResponse) {
        window.handleInactiveEntityResponse(result);
      } else {
        showToast('error', result?.error || tJ('toastSaveFailed'));
      }
    }
  } catch (error) {
    showToast('error', tJ('toastSaveFailed'));
  } finally {
    journalSaveInFlight = false;
    if (btnSaveTop) btnSaveTop.disabled = (journalScreenMode === 'view');
  }
}

// Delete current journal
async function deleteCurrentJournal() {
  // في وضع التعديل: اعتبره إلغاء
  if (journalScreenMode === 'edit' && currentJournalId) {
    await loadJournalById(currentJournalId);
    journalScreenMode = 'view';
    journalEditUnlockedForId = null;
    setJournalReadOnly(true);
    return;
  }
  
  // في وضع الجديد: إلغاء العملية الجديدة
  if (journalScreenMode === 'new') {
    if (journalEntries.length > 0) {
      const lastId = journalEntries[journalEntries.length - 1].id;
      await loadJournalById(lastId);
    } else {
      journalId.value = '';
      if (nav_id) nav_id.value = '';
      journalDate.value = '';
      journalTime.value = '';
      journalMemo.value = '';
      resetJournalToMinimumRows();
      updateTotals();
      updateNavCounter();
    }
    journalScreenMode = 'view';
    journalEditUnlockedForId = null;
    setJournalReadOnly(true);
    return;
  }
  
  if (!currentJournalId) {
    showToast('error', tJ('validationNoJournalToEdit'));
    return;
  }
  
  // ✅ Check delete permission BEFORE opening confirmation modal
  if (window.ScreenPermissions && !window.ScreenPermissions.check('journal_delete', 'حذف قيد يومية')) {
    return;
  }
  
  const ok = await confirmDelete(tJ('confirmDeleteMessage'));
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
  
  try {
    // Find current position before deleting
    const currentIndex = journalEntries.findIndex(j => j.id === currentJournalId);
    const result = await window.journal.deleteJournalEntry({
      id: currentJournalId,
      actorUserId: getCurrentUserId(),
      actorName: getCurrentUserDisplayName(),
    });
    if (result && result.success) {
      showToast('success', tJ('toastDeleted'));
      await loadAllJournalEntries();
      
      // Navigate to next journal after deletion
      if (journalEntries.length === 0) {
        createNewJournal();
      } else {
        // If deleted last entry, show new last (previous entry)
        // Otherwise show entry at same position (which is now the next entry)
        let targetIndex = currentIndex;
        if (targetIndex >= journalEntries.length) {
          targetIndex = journalEntries.length - 1;
        }
        const targetId = journalEntries[targetIndex]?.id;
        if (targetId) {
          await loadJournalById(targetId);
        } else {
          createNewJournal();
        }
      }
    } else {
      showToast('error', result?.error || tJ('toastDeleteFailed'));
    }
  } catch (error) {
    
    showToast('error', tJ('toastDeleteFailed'));
  }
}

// Print journal
async function printJournal() {
  // Check print permission
  if (window.ScreenPermissions && !window.ScreenPermissions.check('journal_print', 'طباعة قيد يومية')) {
    return;
  }
  
  try {
    const jId = currentJournalId;
    if (!jId) {
      showToast('error', tJ('toastSaveFirst'));
      return;
    }

    // Get journal data
    const response = await window.journal.getJournalEntry(jId);
    if (!response || !response.success) {
      showToast('error', tJ('toastError'));
      return;
    }

    const journal = response.data || {};
    const lines = journal.lines || [];
    const displayNumber = journal.manual_number || jId;

    if (lines.length === 0) {
      showToast('error', tJ('validationMinOneLine'));
      return;
    }

    // Get company info
    let companyInfo = { name: 'اسم الشركة', tax: '', logo: '', logoData: '' };
    try {
      const api = window.api || null;
      const sys = window.sys || null;
      
      let companyResult = null;
      if (api && typeof api.getCompanyInfo === 'function') {
        companyResult = await api.getCompanyInfo();
      } else if (sys && typeof sys.getCompanyInfo === 'function') {
        companyResult = await sys.getCompanyInfo();
      }
      
      if (companyResult && companyResult.success && (companyResult.company || companyResult.data)) {
        companyInfo = companyResult.company || companyResult.data;
      }
    } catch (e) {
      // Error getting company info
    }

    // Calculate totals - separate cash and gold
    let totalCashDebit = 0;
    let totalCashCredit = 0;
    let totalGoldDebit = 0;
    let totalGoldCredit = 0;
    
    lines.forEach(line => {
      const debit = parseFloat(line.debit || 0);
      const credit = parseFloat(line.credit || 0);
      const currencyType = (line.currency_type || '').toLowerCase();
      
      if (currencyType.includes('ذهب') || currencyType.includes('gold')) {
        // Convert to 21 karat if needed
        let goldDebit = debit;
        let goldCredit = credit;
        
        // Convert to 21 karat
        if (currencyType.includes('24')) {
          goldDebit = debit * (24 / 21);
          goldCredit = credit * (24 / 21);
        } else if (currencyType.includes('22')) {
          goldDebit = debit * (22 / 21);
          goldCredit = credit * (22 / 21);
        } else if (currencyType.includes('18')) {
          goldDebit = debit * (18 / 21);
          goldCredit = credit * (18 / 21);
        }
        
        totalGoldDebit += goldDebit;
        totalGoldCredit += goldCredit;
      } else {
        // Cash (ريال)
        totalCashDebit += debit;
        totalCashCredit += credit;
      }
    });

    // Build company header HTML
    const companyLogoHtml = companyInfo.logoData ? 
      `<img src="${companyInfo.logoData}" alt="Logo" style="max-width:80px; max-height:80px; margin-bottom:8px;">` : '';
    
    const companyHeaderHtml = `
      <div style="text-align:center; margin-bottom:24px; padding:20px; background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); border: 2px solid #e5e7eb; border-radius:10px;">
        ${companyLogoHtml}
        <h1 style="margin:8px 0 12px 0; font-size:26px; color:#1f2937; font-weight:700; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">${companyInfo.name || 'اسم الشركة'}</h1>
        ${companyInfo.tax ? `<p style="margin:6px 0; color:#4b5563; font-size:14px; font-weight:600;">📋 الرقم الضريبي: ${companyInfo.tax}</p>` : ''}
        <p style="margin:6px 0; color:#6b7280; font-size:13px;">📅 تاريخ الطباعة: ${new Date().toLocaleDateString('ar-SA')} | ⏰ ${new Date().toLocaleTimeString('ar-SA', {hour: '2-digit', minute: '2-digit'})}</p>
      </div>
    `;

    // Helper function to get party name
    async function getPartyName(line) {
      // Try direct names first
      if (line.customer_name) return line.customer_name;
      if (line.supplier_name) return line.supplier_name;
      if (line.account_name) return line.account_name;
      
      // If no name, fetch by ID
      try {
        if (line.customer_id) {
          if (!customersCache.length) {
            await loadCustomers();
          }
          const customer = customersCache.find(c => c.id == line.customer_id);
          if (customer) return customer.name;
        }
        
        if (line.supplier_id) {
          if (!suppliersCache.length) {
            await loadSuppliers();
          }
          const supplier = suppliersCache.find(s => s.id == line.supplier_id);
          if (supplier) return supplier.name;
        }
        
        if (line.account_id) {
          if (!accountsCache.length) {
            await loadAccounts();
          }
          const account = accountsCache.find(a => a.id == line.account_id);
          if (account) return account.name;
        }
      } catch (e) {
        
      }
      
      return '-';
    }

    // Build lines table with names
    let linesHtml = '';
    for (let index = 0; index < lines.length; index++) {
      const line = lines[index];
      const partyName = await getPartyName(line);
      const debit = parseFloat(line.debit || 0);
      const credit = parseFloat(line.credit || 0);
      
      linesHtml += `
        <tr>
          <td style="border:1px solid #d1d5db; padding:8px; text-align:center;">${index + 1}</td>
          <td style="border:1px solid #d1d5db; padding:8px;">${partyName}</td>
          <td style="border:1px solid #d1d5db; padding:8px; text-align:center;">${line.currency_type || 'ريال سعودي'}</td>
          <td style="border:1px solid #d1d5db; padding:8px; text-align:right;">${debit > 0 ? debit.toFixed(2) : '-'}</td>
          <td style="border:1px solid #d1d5db; padding:8px; text-align:right;">${credit > 0 ? credit.toFixed(2) : '-'}</td>
          <td style="border:1px solid #d1d5db; padding:8px;">${line.memo || '-'}</td>
        </tr>
      `;
    }

    // Number to Arabic words
    function numberToArabicWords(num) {
      if (num === 0) return 'صفر';
      
      const ones = ['', 'واحد', 'اثنان', 'ثلاثة', 'أربعة', 'خمسة', 'ستة', 'سبعة', 'ثمانية', 'تسعة'];
      const tens = ['', '', 'عشرون', 'ثلاثون', 'أربعون', 'خمسون', 'ستون', 'سبعون', 'ثمانون', 'تسعون'];
      const hundreds = ['', 'مائة', 'مئتان', 'ثلاثمائة', 'أربعمائة', 'خمسمائة', 'ستمائة', 'سبعمائة', 'ثمانمائة', 'تسعمائة'];
      
      if (num < 10) return ones[num];
      if (num < 20) {
        const teens = ['عشرة', 'أحد عشر', 'اثنا عشر', 'ثلاثة عشر', 'أربعة عشر', 'خمسة عشر', 'ستة عشر', 'سبعة عشر', 'ثمانية عشر', 'تسعة عشر'];
        return teens[num - 10];
      }
      if (num < 100) {
        const tensDigit = Math.floor(num / 10);
        const onesDigit = num % 10;
        // الترتيب الصحيح بالعربية: الآحاد ثم العشرات (خمسة وعشرون)
        if (onesDigit > 0) {
          return ones[onesDigit] + ' و' + tens[tensDigit];
        } else {
          return tens[tensDigit];
        }
      }
      if (num < 1000) {
        const hundredsDigit = Math.floor(num / 100);
        const remainder = num % 100;
        return hundreds[hundredsDigit] + (remainder > 0 ? ' و' + numberToArabicWords(remainder) : '');
      }
      if (num < 1000000) {
        const thousands = Math.floor(num / 1000);
        const remainder = num % 1000;
        let result = '';
        if (thousands === 1) result = 'ألف';
        else if (thousands === 2) result = 'ألفان';
        else if (thousands <= 10) result = numberToArabicWords(thousands) + ' آلاف';
        else result = numberToArabicWords(thousands) + ' ألف';
        return result + (remainder > 0 ? ' و' + numberToArabicWords(remainder) : '');
      }
      if (num < 1000000000) {
        const millions = Math.floor(num / 1000000);
        const remainder = num % 1000000;
        let result = '';
        if (millions === 1) result = 'مليون';
        else if (millions === 2) result = 'مليونان';
        else if (millions <= 10) result = numberToArabicWords(millions) + ' ملايين';
        else result = numberToArabicWords(millions) + ' مليون';
        return result + (remainder > 0 ? ' و' + numberToArabicWords(remainder) : '');
      }
      // For billions and above
      const billions = Math.floor(num / 1000000000);
      const remainder = num % 1000000000;
      let result = '';
      if (billions === 1) result = 'مليار';
      else if (billions === 2) result = 'ملياران';
      else if (billions <= 10) result = numberToArabicWords(billions) + ' مليارات';
      else result = numberToArabicWords(billions) + ' مليار';
      return result + (remainder > 0 ? ' و' + numberToArabicWords(remainder) : '');
    }

    const cashInWords = totalCashDebit > 0 ? numberToArabicWords(Math.floor(totalCashDebit)) : 'صفر';
    const goldInWords = totalGoldDebit > 0 ? numberToArabicWords(Math.floor(totalGoldDebit)) : 'صفر';

    // Get logo URL
    const logoUrl = companyInfo.logoData || (companyInfo.logo ? ('file:///' + String(companyInfo.logo).replace(/\\/g,'/')) : '');
    const nameAr = companyInfo.name || 'اسم الشركة';
    const nameEn = companyInfo.name_en || companyInfo.name || 'Company Name';
    const addressAr = companyInfo.address || '';
    const addressEn = companyInfo.address_en || companyInfo.address || '';
    const phone = companyInfo.phone || '';
    const email = companyInfo.email || '';
    const taxNo = companyInfo.tax || '';
    const date = journal.date || '';
    const memo = journal.memo || '';
    
    // Build complete HTML - New professional design matching receipt/voucher
    // Determine language direction for content (header stays bilingual/fixed)
    const isRtl = getJournalLang() === 'ar';
    const contentDir = isRtl ? 'rtl' : 'ltr';
    const textAlign = isRtl ? 'right' : 'left';

    // Branch scope chip data (shown beside date chip; replaces top branch scope badge)
    const branchScopeChip = (() => {
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

    const printHtml = `
      <!DOCTYPE html>
      <html lang="${isRtl ? 'ar' : 'en'}" dir="${contentDir}" data-skip-branch-scope-badge="1">
      <head>
        <meta charset="UTF-8">
        <title>${tJ('printJournalNo')} ${displayNumber}</title>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet">
        <style>
          @page { size: A4; margin: 10mm; }
          @media print and (orientation: landscape) { @page { size: A4 landscape; margin: 10mm; } }
          * { margin: 0; padding: 0; box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          body { font-family: 'Cairo', sans-serif; background: #fff; color: #333; font-size: 12px; padding: 15px; }
          .container { max-width: 100%; border: 2px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
          /* Header stays bilingual with fixed direction */
          .header { padding: 12px 20px; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%) !important; border-bottom: 2px solid #f59e0b; }
          .header-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 20px; direction: ltr !important; }
          .company-info { flex: 1; }
          .company-info.left { text-align: left; direction: ltr; }
          .company-info.right { text-align: right; direction: rtl; }
          .company-name { font-size: 18px; font-weight: 700; color: #1f2937; margin-bottom: 6px; }
          .info-item { display: flex; align-items: center; gap: 8px; margin: 4px 0; font-size: 11px; color: #374151; }
          .info-item i { color: #f59e0b; font-size: 11px; }
          .company-details { font-size: 11px; color: #374151; }
          .logo { width: 110px; height: 110px; border: 3px solid #f59e0b; border-radius: 50%; overflow: hidden; background: #fff; display: flex; align-items: center; justify-content: center; margin: 0 auto; }
          .logo img { max-width: 90%; max-height: 90%; object-fit: contain; }
          .journal-title { position: relative; background: #374151 !important; color: #fff; text-align: center; padding: 10px 20px; font-size: 18px; font-weight: 700; display: flex; align-items: center; justify-content: center; border-radius: 12px; margin: 8px 12px; }
          .journal-date-chip { position: absolute; ${isRtl ? 'right' : 'left'}: 15px; top: 50%; transform: translateY(-50%); }
          .journal-branch-chip { position: absolute; ${isRtl ? 'left' : 'right'}: 15px; top: 50%; transform: translateY(-50%); }
          .journal-date-chip, .journal-branch-chip { padding: 4px 12px; border-radius: 999px; background: linear-gradient(135deg, #fef3c7, #fde68a); color: #374151; font-size: 11px; font-weight: 600; border: 1px solid rgba(249,250,251,0.7); box-shadow: 0 2px 4px rgba(0,0,0,0.2); white-space: nowrap; }
          /* Content follows language direction */
          .info-grid { display: grid; grid-template-columns: repeat(3, 1fr); border-bottom: 1px solid #e5e7eb; background: #fff; gap: 6px; padding: 8px 12px; direction: ${contentDir}; }
          .info-grid .info-item { display: flex; align-items: center; padding: 6px 12px; border-radius: 999px; border: 1px solid #e5e7eb; background: #f9fafb; box-shadow: 0 1px 2px rgba(0,0,0,0.04); }
          .info-grid .info-item i { margin-inline-end: 6px; font-size: 11px; color: #f59e0b; }
          .info-label { color: #666; font-size: 11px; min-width: 60px; }
          .info-value { font-weight: 600; color: #333; flex: 1; }
          .table-wrapper { border-radius: 12px; overflow: hidden; margin: 8px 12px 10px; border: 2px solid #f59e0b; direction: ${contentDir}; }
          .details-table { width: 100%; border-collapse: collapse; }
          .details-table th { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%) !important; color: #1f2937; padding: 10px 8px; font-size: 12px; font-weight: 600; text-align: center; border: 1px solid #f59e0b; }
          .details-table td { padding: 10px 8px; text-align: center; border: 1px solid #e5e7eb; font-size: 11px; background: #fff; }
          .details-table td.text-cell { text-align: ${textAlign}; }
          .details-table tbody tr:nth-child(even) td { background: #fefefe; }
          .totals { background: linear-gradient(135deg, #1e3a5f 0%, #2d4a6f 100%) !important; padding: 12px; border-radius: 12px; margin: 8px 12px 0; direction: ${contentDir}; }
          .totals-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
          .total-box { background: transparent; border: 1px solid #3d5a7f; border-radius: 6px; padding: 10px; text-align: center; }
          .total-box .lbl { font-size: 9px; color: #93c5fd; margin-bottom: 4px; }
          .total-box .val { font-size: 13px; font-weight: 700; color: #fff; }
          .print-btn { position: fixed; bottom: 20px; ${isRtl ? 'left' : 'right'}: 20px; background: #374151; color: #fff; border: none; padding: 12px 25px; border-radius: 25px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit; }
          @media print { .no-print { display: none !important; } body { padding: 0; } .container { border: none; } }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header: Always bilingual with fixed layout -->
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
            <div class="journal-title">
              <div class="journal-date-chip">${tJ('printDate')} ${date}</div>
              ${branchScopeChip.value ? `<div class="journal-branch-chip">${branchScopeChip.label} ${branchScopeChip.value}</div>` : ''}
              <span>${tJ('printJournalNo')} ${displayNumber}</span>
            </div>
          </div>
          <!-- Content: Follows language direction -->
          <div class="info-grid">
            <div class="info-item">
              <i class="fa-solid fa-clock"></i>
              <span class="info-label">${tJ('printTime')}</span>
              <span class="info-value">${journal.time || '-'}</span>
            </div>
            <div class="info-item" style="grid-column: 2 / 4;">
              <i class="fa-solid fa-align-${isRtl ? 'right' : 'left'}"></i>
              <span class="info-label">${tJ('printMemo')}</span>
              <span class="info-value">${memo}</span>
            </div>
          </div>
          <div class="table-wrapper">
            <table class="details-table">
              <thead>
                <tr>
                  <th style="width:36px">${tJ('printItem')}</th>
                  <th style="width:18%">${tJ('printAccountName')}</th>
                  <th style="width:95px">${tJ('printCurrencyType')}</th>
                  <th style="width:90px">${tJ('printDebit')}</th>
                  <th style="width:90px">${tJ('printCredit')}</th>
                  <th style="width:35%">${tJ('printNote')}</th>
                </tr>
              </thead>
              <tbody>
                ${linesHtml}
              </tbody>
            </table>
          </div>
          <div class="totals">
            <div class="totals-grid">
              <div class="total-box"><div class="lbl">${tJ('printCashDebit')}</div><div class="val">${totalCashDebit.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div></div>
              <div class="total-box"><div class="lbl">${tJ('printCashCredit')}</div><div class="val">${totalCashCredit.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div></div>
              <div class="total-box"><div class="lbl">${tJ('totalGoldDebit')}</div><div class="val">${totalGoldDebit.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div></div>
              <div class="total-box"><div class="lbl">${tJ('totalGoldCredit')}</div><div class="val">${totalGoldCredit.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div></div>
            </div>
            <div style="margin-top:10px; padding:8px 15px; background:rgba(255,255,255,0.1); border-radius:6px; font-size:11px; color:#e2e8f0; text-align:${textAlign};">
              ${(totalCashDebit > 0 || totalCashCredit > 0) ? `<div style="margin-bottom:4px;"><strong>${tJ('printCashInWords')}</strong> ${totalCashDebit >= totalCashCredit ? toWordsCash(totalCashDebit) + ' ' + tJ('printDebit') : toWordsCash(totalCashCredit) + ' ' + tJ('printCredit')}</div>` : ''}
              ${(totalGoldDebit > 0 || totalGoldCredit > 0) ? `<div><strong>${tJ('printGoldInWords')}</strong> ${totalGoldDebit >= totalGoldCredit ? toWordsGold(totalGoldDebit) + ' ' + tJ('printDebit') : toWordsGold(totalGoldCredit) + ' ' + tJ('printCredit')}</div>` : ''}
            </div>
          </div>
        </div>
        <button class="print-btn no-print" onclick="window.print()">🖨️ ${tJ('printButton')}</button>
      </body>
      </html>
    `;

    // Open print window
    if (window.openPreview) {
      window.openPreview(printHtml);
    } else {
      const printWindow = window.open('', '_blank', 'width=800,height=600');
      if (printWindow) {
        printWindow.document.write(printHtml);
        printWindow.document.close();
      } else {
        showToast('error', tJ('toastWindowFailed'));
      }
    }

  } catch (error) {
    
    showToast('error', tJ('toastError'));
  }
}

// WhatsApp - Send Journal with Image
async function sendJournalWhatsApp() {
  try {
    const jId = currentJournalId;
    if (!jId) {
      showToast('error', tJ('toastSaveFirst'));
      return;
    }

    // Get journal data
    const response = await window.journal.getJournalEntry(jId);
    if (!response || !response.success) {
      showToast('error', tJ('toastError'));
      return;
    }

    const journal = response.data || {};
    const lines = journal.lines || [];
    const displayNumber = journal.manual_number || jId;

    if (lines.length === 0) {
      showToast('error', tJ('validationMinOneLine'));
      return;
    }

    // Find customer/supplier phone from first line
    const first = lines[0] || {};
    let phone = null;
    let contactName = '';

    if (first.customer_id) {
      const c = customersCache.find(x => Number(x.id) === Number(first.customer_id));
      if (c && c.phone) {
        phone = c.phone;
        contactName = c.name || first.customer_name || '';
      }
    }

    if (!phone && first.supplier_id) {
      const s = suppliersCache.find(x => Number(x.id) === Number(first.supplier_id));
      if (s && s.phone) {
        phone = s.phone;
        contactName = s.name || first.supplier_name || '';
      }
    }

    if (!phone) {
      showToast('error', tJ('toastNoPhone'));
      return;
    }

    // Clean phone number
    let phoneNumber = phone.trim();
    phoneNumber = phoneNumber.replace(/^\+/, '');
    phoneNumber = phoneNumber.replace(/^00/, '');
    phoneNumber = phoneNumber.replace(/[^0-9]/g, '');
    if (phoneNumber.startsWith('05')) phoneNumber = '966' + phoneNumber.substring(1);

    if (!phoneNumber || phoneNumber.length < 9) {
      showToast('error', tJ('toastInvalidPhone'));
      return;
    }

    // Calculate totals
    const nf2 = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    let totalCashDebit = 0, totalCashCredit = 0;
    let totalGoldDebit = 0, totalGoldCredit = 0;

    lines.forEach(line => {
      const debit = parseFloat(line.debit || 0);
      const credit = parseFloat(line.credit || 0);
      const currencyType = (line.currency_type || '').toLowerCase();
      
      if (currencyType.includes('ذهب') || currencyType.includes('gold')) {
        let goldDebit = debit, goldCredit = credit;
        if (currencyType.includes('24')) { goldDebit = debit * (24/21); goldCredit = credit * (24/21); }
        else if (currencyType.includes('22')) { goldDebit = debit * (22/21); goldCredit = credit * (22/21); }
        else if (currencyType.includes('18')) { goldDebit = debit * (18/21); goldCredit = credit * (18/21); }
        totalGoldDebit += goldDebit;
        totalGoldCredit += goldCredit;
      } else {
        totalCashDebit += debit;
        totalCashCredit += credit;
      }
    });

    // Calculate totals for contact only (customer or supplier)
    let contactCashDebit = 0, contactCashCredit = 0;
    let contactGoldDebit = 0, contactGoldCredit = 0;
    
    // Build details string with ALL party names
    let detailsStr = '';
    for (const line of lines) {
      // Get party name for this line
      let partyName = line.customer_name || line.supplier_name || line.account_name || '';
      if (!partyName) {
        if (line.customer_id) {
          const c = customersCache.find(x => Number(x.id) === Number(line.customer_id));
          if (c) partyName = c.name;
        } else if (line.supplier_id) {
          const s = suppliersCache.find(x => Number(x.id) === Number(line.supplier_id));
          if (s) partyName = s.name;
        } else if (line.account_id) {
          const a = accountsCache.find(x => Number(x.id) === Number(line.account_id));
          if (a) partyName = a.name;
        }
      }
      if (!partyName) partyName = 'غير محدد';
      
      const debit = parseFloat(line.debit || 0);
      const credit = parseFloat(line.credit || 0);
      const currencyType = (line.currency_type || '').toLowerCase();
      const isGold = currencyType.includes('ذهب') || currencyType.includes('gold');
      const unit = isGold ? 'غ' : 'ريال';
      
      // Check if this line belongs to the contact for totals calculation
      const isContactLine = (first.customer_id && line.customer_id == first.customer_id) ||
                           (first.supplier_id && line.supplier_id == first.supplier_id);
      
      if (isContactLine) {
        if (isGold) {
          let goldDebit = debit, goldCredit = credit;
          if (currencyType.includes('24')) { goldDebit = debit * (24/21); goldCredit = credit * (24/21); }
          else if (currencyType.includes('22')) { goldDebit = debit * (22/21); goldCredit = credit * (22/21); }
          else if (currencyType.includes('18')) { goldDebit = debit * (18/21); goldCredit = credit * (18/21); }
          contactGoldDebit += goldDebit;
          contactGoldCredit += goldCredit;
        } else {
          contactCashDebit += debit;
          contactCashCredit += credit;
        }
      }
      
      // Add to details (all parties)
      if (debit > 0) {
        detailsStr += `   • ${partyName} - مدين ${nf2.format(debit)} ${unit}\n`;
      }
      if (credit > 0) {
        detailsStr += `   • ${partyName} - دائن ${nf2.format(credit)} ${unit}\n`;
      }
    }

    // Build message
    const message = `📄 قيد يومية رقم: ${displayNumber}

عزيزي: ${contactName}

📅 التاريخ: ${journal.date || ''}

📋 التفاصيل:
${detailsStr}
💵 إجمالي النقد:
   • مدين: ${nf2.format(contactCashDebit)} ريال
   • دائن: ${nf2.format(contactCashCredit)} ريال
${contactGoldDebit > 0 || contactGoldCredit > 0 ? `
⚖️ إجمالي الذهب (عيار 21):
   • مدين: ${nf2.format(contactGoldDebit)} غ
   • دائن: ${nf2.format(contactGoldCredit)} غ` : ''}

شكراً لتعاملكم معنا 🙏`;

    // Get company info
    let company = {};
    try { const r = await window.api.invoke('get-company-info'); if (r?.success) company = r.company || {}; } catch(_) {}
    const logoUrl = company?.logoData || '';

    // Build rows HTML
    const rowsHtml = await Promise.all(lines.map(async (line, i) => {
      let partyName = line.customer_name || line.supplier_name || line.account_name || '-';
      if (partyName === '-') {
        if (line.customer_id) {
          const c = customersCache.find(x => x.id == line.customer_id);
          if (c) partyName = c.name;
        } else if (line.supplier_id) {
          const s = suppliersCache.find(x => x.id == line.supplier_id);
          if (s) partyName = s.name;
        } else if (line.account_id) {
          const a = accountsCache.find(x => x.id == line.account_id);
          if (a) partyName = a.name;
        }
      }
      const debit = parseFloat(line.debit || 0);
      const credit = parseFloat(line.credit || 0);
      return `<tr>
        <td>${i + 1}</td>
        <td>${partyName}</td>
        <td>${line.currency_type || 'ريال'}</td>
        <td>${debit > 0 ? nf2.format(debit) : '-'}</td>
        <td>${credit > 0 ? nf2.format(credit) : '-'}</td>
        <td>${line.memo || '-'}</td>
      </tr>`;
    }));

    // Build words section
    let wordsHtml = '';
    if (totalCashDebit > 0 || totalCashCredit > 0) wordsHtml += '<div style="margin-bottom:3px;"><strong>النقد كتابة:</strong> ' + (totalCashDebit >= totalCashCredit ? toArabicWordsCash(totalCashDebit) + ' مدين' : toArabicWordsCash(totalCashCredit) + ' دائن') + '</div>';
    if (totalGoldDebit > 0 || totalGoldCredit > 0) wordsHtml += '<div><strong>الذهب كتابة:</strong> ' + (totalGoldDebit >= totalGoldCredit ? toArabicWordsGold(totalGoldDebit) + ' مدين' : toArabicWordsGold(totalGoldCredit) + ' دائن') + '</div>';

    // Build HTML for WhatsApp capture window (new design matching print)
    const nameAr = company.name || 'اسم الشركة';
    const nameEn = company.name_en || company.name || 'Company Name';
    const addressAr = company.address || '';
    const addressEn = company.address_en || company.address || '';
    const companyPhone = company.phone || '';
    const companyEmail = company.email || '';
    const taxNo = company.tax || '';
    const journalDate = journal.date || '';
    const journalMemo = journal.memo || '';

    const docHtml = '<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>قيد يومية</title><script src="../../node_modules/html2canvas/dist/html2canvas.min.js"><\/script><link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet"><link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:"Cairo",sans-serif;background:#fff;padding:10px}.container{max-width:100%;border:2px solid #e5e7eb;border-radius:8px;overflow:hidden}.header{padding:10px 20px;background:linear-gradient(135deg,#fef3c7 0%,#fde68a 100%);border-bottom:2px solid #f59e0b}.header-top{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;direction:ltr}.company-info{flex:1}.company-info.left{text-align:left;direction:ltr}.company-info.right{text-align:right;direction:rtl}.company-name{font-size:14px;font-weight:700;color:#1f2937;margin-bottom:4px}.info-item{display:flex;align-items:center;gap:6px;margin:2px 0;font-size:9px;color:#374151}.info-item i{color:#f59e0b;font-size:9px}.company-details{font-size:9px;color:#374151}.logo{width:70px;height:70px;border:3px solid #f59e0b;border-radius:50%;overflow:hidden;background:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0}.logo img{max-width:90%;max-height:90%;object-fit:contain}.journal-title{position:relative;background:#374151;color:#fff;text-align:center;padding:8px 20px;font-size:14px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:8px;margin:6px 10px 8px}.journal-date-chip{position:absolute;left:15px;padding:2px 8px;border-radius:999px;background:linear-gradient(135deg,#fef3c7,#fde68a);color:#374151;font-size:9px;font-weight:600}.info-grid{display:grid;grid-template-columns:repeat(3,1fr);background:#fff;gap:4px;padding:6px 10px}.info-grid .info-item{display:flex;align-items:center;padding:4px 8px;border-radius:999px;border:1px solid #e5e7eb;background:#f9fafb}.info-grid .info-item i{margin-inline-end:4px;font-size:9px;color:#f59e0b}.info-label{color:#666;font-size:9px;min-width:50px}.info-value{font-weight:600;color:#333;flex:1;font-size:9px}.table-wrapper{border-radius:8px;overflow:hidden;margin:6px 10px;border:2px solid #f59e0b}.details-table{width:100%;border-collapse:collapse}.details-table th{background:linear-gradient(135deg,#fef3c7 0%,#fde68a 100%);color:#1f2937;padding:6px 4px;font-size:10px;font-weight:600;text-align:center;border:1px solid #f59e0b}.details-table td{padding:6px 4px;text-align:center;border:1px solid #e5e7eb;font-size:9px;background:#fff}.totals{background:linear-gradient(135deg,#1e3a5f 0%,#2d4a6f 100%);padding:8px;border-radius:8px;margin:6px 10px}.totals-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:4px}.total-box{background:transparent;border:1px solid #3d5a7f;border-radius:4px;padding:6px;text-align:center}.total-box .lbl{font-size:7px;color:#93c5fd;margin-bottom:2px}.total-box .val{font-size:10px;font-weight:700;color:#fff}.words-section{margin-top:8px;padding:6px 10px;background:rgba(255,255,255,0.1);border-radius:6px;font-size:9px;color:#e2e8f0}</style></head><body><div class="container" id="journalContainer"><div class="header"><div class="header-top"><div class="company-info left"><div class="company-name">' + nameEn + '</div><div class="info-item"><i class="fa-solid fa-location-dot"></i><span class="company-details">' + (addressEn ? 'Address: ' + addressEn : '') + '</span></div><div class="info-item"><i class="fa-solid fa-phone"></i><span class="company-details">' + (companyPhone ? 'Phone: ' + companyPhone : '') + '</span></div><div class="info-item"><i class="fa-solid fa-envelope"></i><span class="company-details">' + (companyEmail ? 'Email: ' + companyEmail : '') + '</span></div><div class="info-item"><i class="fa-solid fa-file-invoice"></i><span class="company-details">' + (taxNo ? 'VAT: ' + taxNo : '') + '</span></div></div><div class="logo">' + (logoUrl ? '<img src="' + logoUrl + '" alt="Logo">' : '') + '</div><div class="company-info right"><div class="company-name">' + nameAr + '</div><div class="info-item"><i class="fa-solid fa-location-dot"></i><span class="company-details">' + (addressAr ? 'العنوان: ' + addressAr : '') + '</span></div><div class="info-item"><i class="fa-solid fa-phone"></i><span class="company-details">' + (companyPhone ? 'الهاتف: ' + companyPhone : '') + '</span></div><div class="info-item"><i class="fa-solid fa-envelope"></i><span class="company-details">' + (companyEmail ? 'البريد: ' + companyEmail : '') + '</span></div><div class="info-item"><i class="fa-solid fa-file-invoice"></i><span class="company-details">' + (taxNo ? 'الرقم الضريبي: ' + taxNo : '') + '</span></div></div></div><div class="journal-title"><div class="journal-date-chip">التاريخ: ' + journalDate + '</div><span>قيد يومية رقم: ' + jId + '</span></div></div><div class="info-grid"><div class="info-item"><i class="fa-solid fa-clock"></i><span class="info-label">الوقت:</span><span class="info-value">' + (journal.time || '-') + '</span></div><div class="info-item" style="grid-column:2/4;"><i class="fa-solid fa-align-right"></i><span class="info-label">البيان:</span><span class="info-value">' + journalMemo + '</span></div></div><div class="table-wrapper"><table class="details-table"><thead><tr><th style="width:25px">#</th><th style="width:18%">الطرف</th><th style="width:90px">العملة</th><th style="width:75px">مدين</th><th style="width:75px">دائن</th><th>البيان</th></tr></thead><tbody>' + rowsHtml.join('') + '</tbody></table></div><div class="totals"><div class="totals-grid"><div class="total-box"><div class="lbl">نقد مدين</div><div class="val">' + nf2.format(totalCashDebit) + '</div></div><div class="total-box"><div class="lbl">نقد دائن</div><div class="val">' + nf2.format(totalCashCredit) + '</div></div><div class="total-box"><div class="lbl">ذهب مدين</div><div class="val">' + nf2.format(totalGoldDebit) + '</div></div><div class="total-box"><div class="lbl">ذهب دائن</div><div class="val">' + nf2.format(totalGoldCredit) + '</div></div></div>' + (wordsHtml ? '<div class="words-section">' + wordsHtml + '</div>' : '') + '</div></div><script>setTimeout(async()=>{try{const container=document.getElementById("journalContainer");const canvas=await html2canvas(container,{backgroundColor:"#fff",scale:2,useCORS:true,logging:false});const blob=await new Promise(r=>canvas.toBlob(r,"image/png"));try{await navigator.clipboard.write([new ClipboardItem({"image/png":blob})])}catch(e){}const whatsappUrl="https://wa.me/' + phoneNumber + '?text=' + encodeURIComponent(message) + '";if(window.api?.openExternal)await window.api.openExternal(whatsappUrl);else if(window.opener?.api?.openExternal)await window.opener.api.openExternal(whatsappUrl);else window.open(whatsappUrl,"_blank");setTimeout(()=>window.close(),800)}catch(err){console.error(err);alert("خطأ في إرسال القيد")}},600)<\/script></body></html>';

    const w = window.open('', '_blank', 'width=700,height=600,scrollbars=yes');
    if (!w) {
      showToast('error', tJ('toastWindowFailed'));
      return;
    }
    w.document.open();
    w.document.write(docHtml);
    w.document.close();
    w.focus();

    showToast('success', tJ('toastPreparingImage'));

  } catch (error) {
    showToast('error', tJ('toastError'));
  }
}

// Navigation
function navigateToJournal(direction) {
  if (journalEntries.length === 0) return;
  
  let targetId;
  const currentIndex = journalEntries.findIndex(j => j.id === currentJournalId);
  
  if (direction === 'first') {
    targetId = journalEntries[0].id;
  } else if (direction === 'last') {
    targetId = journalEntries[journalEntries.length - 1].id;
  } else if (direction === 'prev') {
    if (currentIndex > 0) {
      targetId = journalEntries[currentIndex - 1].id;
    }
  } else if (direction === 'next') {
    if (currentIndex < journalEntries.length - 1) {
      targetId = journalEntries[currentIndex + 1].id;
    }
  }
  
  if (targetId) {
    loadJournalById(targetId);
  }
}

// Load journal by ID
async function loadJournalById(id) {
  try {
    await waitForJournal();
    const result = await window.journal.getJournalEntry(id);
    if (result && result.success && result.data) {
      const journal = result.data;
      currentJournalId = id;
      // Display manual_number to user (or id if manual_number not set)
      const displayNumber = journal.manual_number || id;
      journalId.value = displayNumber;
      if (nav_id) nav_id.value = String(getJournalNavNumber(journal, id) || '');
      journalDate.value = journal.date || '';
      journalTime.value = journal.time || '';
      journalMemo.value = journal.memo || '';
      
      journalLinesBody.innerHTML = '';
      if (journal.lines && journal.lines.length > 0) {
        journal.lines.forEach(line => {
          addJournalLine({
            customer_id: line.customer_id || '',
            supplier_id: line.supplier_id || '',
            account_id: line.account_id || '',
            debit: line.debit || 0,
            credit: line.credit || 0,
            currency_type: line.currency_type || 'ريال سعودي',
            memo: line.memo || ''
          });
        });
      } else {
        ensureMinimumJournalRows();
      }
      ensureMinimumJournalRows();
      
      // Display user tracking info
      const trackingDiv = document.getElementById('j_user_tracking_info');
      const createdInfo = document.getElementById('j_created_info');
      if (trackingDiv && createdInfo) {
        let hasInfo = false;
        let allInfo = [];
        const isEnglish = getJournalLang() === 'en';
        
        // Use username for English, full_name for Arabic
        const createdByDisplay = isEnglish 
          ? (journal.created_by_username || journal.created_by_name || '')
          : (journal.created_by_name || journal.created_by_username || '');
        const updatedByDisplay = isEnglish 
          ? (journal.updated_by_username || journal.updated_by_name || '')
          : (journal.updated_by_name || journal.updated_by_username || '');
        
        if (createdByDisplay || journal.created_at) {
          hasInfo = true;
          let createdText = `<i class="fa-solid fa-user-plus" style="margin-inline-end:6px; color:#10b981;"></i> ${tJ('createdBy')} `;
          if (createdByDisplay) createdText += `<strong>${createdByDisplay}</strong>`;
          if (journal.created_at) {
            const createdDate = new Date(journal.created_at);
            const dateStr = createdDate.toLocaleDateString('en-GB');
            const timeStr = createdDate.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});
            createdText += ` <span style="color:var(--subtle);">${dateStr} ${timeStr}</span>`;
          }
          allInfo.push(createdText);
        }
        
        if (updatedByDisplay || journal.updated_at) {
          hasInfo = true;
          let updatedText = `<i class="fa-solid fa-user-clock" style="margin-inline-end:6px; color:#f59e0b;"></i> ${tJ('lastModified')} `;
          if (updatedByDisplay) updatedText += `<strong>${updatedByDisplay}</strong>`;
          if (journal.updated_at) {
            const updatedDate = new Date(journal.updated_at);
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
      
      updateTotals();
      updateNavCounter();
      journalScreenMode = 'view';
      journalEditUnlockedForId = null;
      setJournalReadOnly(true);
    }
  } catch (error) {
    
    showToast('error', tJ('toastError'));
  }
}

// Update nav counter
function updateNavCounter() {
  const { current, total, currentIndex } = getJournalCounterDisplay();
  const listTotal = journalEntries.length;
  nav_counter.textContent = `${current} / ${total}`;

  if (currentIndex < 0 || listTotal === 0) {
    btnFirst.disabled = true;
    btnPrev.disabled = true;
    btnNext.disabled = true;
    btnLast.disabled = true;
    return;
  }
  btnFirst.disabled = currentIndex <= 0;
  btnPrev.disabled = currentIndex <= 0;
  btnNext.disabled = currentIndex >= listTotal - 1;
  btnLast.disabled = currentIndex >= listTotal - 1;
}

const journalBottomCard = document.getElementById('journal_bottom');
if (journalBottomCard && typeof ResizeObserver !== 'undefined') {
  const journalBottomResizeObserver = new ResizeObserver(() => syncJournalBottomLayout());
  journalBottomResizeObserver.observe(journalBottomCard);
}

const journalGridCard = document.getElementById('journalGrid');
if (journalGridCard && typeof ResizeObserver !== 'undefined') {
  const journalGridResizeObserver = new ResizeObserver(() => syncJournalBottomLayout());
  journalGridResizeObserver.observe(journalGridCard);
}

window.addEventListener('resize', syncJournalBottomLayout);

// Format number
function formatNumber(num) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', init);

if (window.api && typeof window.api.on === 'function') {
  window.api.on('cloud-data-updated', async (payload) => {
    const tables = Array.isArray(payload?.tables) ? payload.tables : [];
    if (!tables.includes('journal_entries')) {
      return;
    }
    if (journalScreenMode !== 'view') {
      return;
    }
    try {
      await loadAllJournalEntries();
      const currentId = Number(currentJournalId || 0);
      if (Number.isFinite(currentId) && currentId > 0 && journalEntries.some(j => Number(j.id) === currentId)) {
        await loadJournalById(currentId);
        return;
      }
      if (journalEntries.length > 0) {
        await loadJournalById(journalEntries[journalEntries.length - 1].id);
        return;
      }
      await createNewJournal();
    } catch (_) {}
  });
}

window.addEventListener('message', async (event) => {
  if (event?.data?.type !== 'cloud-data-updated') {
    return;
  }
  const payload = event.data.payload || {};
  const tables = Array.isArray(payload?.tables) ? payload.tables : [];
  if (!tables.includes('journal_entries')) {
    return;
  }
  if (journalScreenMode !== 'view') {
    return;
  }
  try {
    await loadAllJournalEntries();
    const currentId = Number(currentJournalId || 0);
    if (Number.isFinite(currentId) && currentId > 0 && journalEntries.some(j => Number(j.id) === currentId)) {
      await loadJournalById(currentId);
      return;
    }
    if (journalEntries.length > 0) {
      await loadJournalById(journalEntries[journalEntries.length - 1].id);
      return;
    }
    await createNewJournal();
  } catch (_) {}
});

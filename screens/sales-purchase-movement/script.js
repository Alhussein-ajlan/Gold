// Ensure bridge APIs are available
(function ensureAPIBridge(){
  try{
    const pick = (name)=>{ 
      if (!window[name]){ 
        // Try parent window
        if (window.parent && window.parent !== window && window.parent[name]) {
          window[name] = window.parent[name];
        }
        // Try top window
        else if (window.top && window.top !== window && window.top[name]) {
          window[name] = window.top[name];
        }
        // Try parent.parent (in case of nested iframes)
        else if (window.parent && window.parent.parent && window.parent.parent !== window && window.parent.parent[name]) {
          window[name] = window.parent.parent[name];
        }
      }
    };
    ['salesInvoice','purchaseInvoice','db','api','sys','customers','suppliers','accounts','voucher','receipt','journal','opening','users','permissions','salesPurchaseMovement'].forEach(pick);
  }catch(e){ 
    
  }
})();

// Initialize screen permissions
let permissionsInitialized = false;
let permissionsInitPromise = null;

async function ensurePermissionsReady() {
  if (!window.ScreenPermissions) return true;
  if (permissionsInitialized) return true;

  if (!permissionsInitPromise) {
    permissionsInitPromise = window.ScreenPermissions.init()
      .then((ok) => {
        permissionsInitialized = !!ok;
        return permissionsInitialized;
      })
      .catch(() => false)
      .finally(() => {
        permissionsInitPromise = null;
      });
  }

  return permissionsInitPromise;
}

// ===== Global Variables =====

let allMovementsData = [];
let currentFilteredMovements = []; // Currently displayed movements after date/type filters
let currentTypeFilter = 'all'; // Current type filter (all, SELL, BUY)
let currentPaymentTypeFilter = 'all';
let currentMetalFilter = 'gold'; // Current metal filter (gold, silver)
let currentInvoiceTypeFilter = 'all'; // Current invoice type filter (all, taskir, mashghul)
let loadedMovementDateRange = { from: '', to: '' };

// Silver karats for identification
const SILVER_KARATS = ['999', '925', '900', '800'];
const GOLD_KARATS = ['24', '22', '21', '18'];

// Check if a karat is silver
function isSilverKarat(karat) {
  const k = String(karat).trim();
  return SILVER_KARATS.includes(k) || parseFloat(k) >= 800;
}

function normalizeMovementPaymentType(value) {
  const normalized = String(value || '').trim().toLowerCase();
  if (normalized === 'credit' || normalized === 'deferred' || normalized === 'debt') {
    return 'credit';
  }
  return 'cash';
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getStoredBranchScopeMode() {
  try {
    const raw = localStorage.getItem('branchScope');
    const parsed = raw ? JSON.parse(raw) : null;
    return String(parsed?.mode || parsed?.scope || '').trim().toLowerCase() === 'all' ? 'all' : 'branch';
  } catch (e) {
    return 'branch';
  }
}

function shouldShowMovementBranchDetails() {
  return getStoredBranchScopeMode() === 'all';
}

function getMovementDocumentNumber(item) {
  return String(item?.displayInvoiceId || item?.branch_local_number || item?.invoice_id || '').trim() || '-';
}

function getMovementBranchText(item) {
  const branchCode = String(item?.branch_code || '').trim();
  const branchName = String(item?.branch_name || '').trim();
  if (branchCode && branchName) return `${branchCode} - ${branchName}`;
  return branchName || branchCode || '';
}

function getMovementDocumentExportText(item) {
  const documentNumber = getMovementDocumentNumber(item);
  const branchText = getMovementBranchText(item);
  if (!shouldShowMovementBranchDetails() || !branchText) return documentNumber;
  return `${documentNumber} • ${branchText}`;
}

function getMovementDocumentCellHtml(item) {
  const documentNumber = escapeHtml(getMovementDocumentNumber(item));
  const invoiceId = escapeHtml(String(item?.invoice_id || ''));
  const invoiceType = escapeHtml(String(item?.type || ''));
  const branchText = getMovementBranchText(item);
  const linkHtml = `<a href="#" class="invoice-link" data-invoice-id="${invoiceId}" data-invoice-display-id="${documentNumber}" data-invoice-type="${invoiceType}">${documentNumber}</a>`;
  if (!shouldShowMovementBranchDetails() || !branchText) return linkHtml;
  const safeBranchText = escapeHtml(branchText);
  return `<span class="movement-doc-cell">${linkHtml}<span class="movement-branch-badge" title="${safeBranchText}">${safeBranchText}</span></span>`;
}

// Store previous values for animation
let prevValues = {
  totalSalesWeightNet24: 0,
  totalSalesValue: 0,
  totalPurchasesWeightNet24: 0,
  totalPurchasesValue: 0,
  profitLoss: 0,
  profitLossPercentage: 0,
  weightDifference: 0,
  salesByKarat: {24: 0, 22: 0, 21: 0, 18: 0},
  purchasesByKarat: {24: 0, 22: 0, 21: 0, 18: 0},
  salesCount: 0,
  purchaseCount: 0
};

// ===== Translation Dictionaries =====
const SPM_TRANSLATIONS = {
  ar: {
    title: 'حركة المبيعات والمشتريات',
    tabs: {
      salesPurchases: 'المبيعات والمشتريات'
    },
    actions: {
      close: 'إغلاق',
      reset: 'إعادة تعيين',
      apply: 'تطبيق الفترة',
      exportPdf: 'تصدير PDF',
      pdf: 'PDF',
      exportExcel: 'تصدير Excel',
      excel: 'Excel',
      importExcel: 'استيراد من Excel',
      import: 'استيراد',
      refresh: 'تحديث',
      cancel: 'إلغاء',
      print: 'طباعة'
    },
    filters: {
      metalLabel: 'نوع المعدن:',
      gold: '🥇 الذهب',
      silver: '🥈 الفضة',
      invoiceTypeLabel: 'نوع الفاتورة:',
      all: 'الكل',
      cash: 'نقدي',
      credit: 'آجل',
      taskir: 'تسكير',
      mashghul: 'مشغولات',
      from: 'من',
      to: 'إلى',
      allTitle: 'عرض كل العمليات',
      sell: 'SELL',
      sellTitle: 'عرض المبيعات فقط',
      buy: 'BUY',
      buyTitle: 'عرض المشتريات فقط',
      cashTitle: 'عرض الفواتير النقدية فقط',
      creditTitle: 'عرض الفواتير الآجلة فقط'
    },
    cards: {
      totalSales: 'إجمالي المبيعات',
      totalPurchases: 'إجمالي المشتريات',
      value: 'القيمة',
      karat24: 'عيار 24',
      karat22: 'عيار 22',
      karat21: 'عيار 21',
      karat18: 'عيار 18',
      silver999: 'عيار 999',
      silver925: 'عيار 925',
      silver900: 'عيار 900',
      silver800: 'عيار 800',
      basisGold: 'جرام - عيار 24',
      basisSilver: 'جرام - عيار 999',
      profitLossTitle: 'الأرباح والخسائر',
      profitNet: 'الصافي',
      percentage: 'النسبة',
      totalSalesLabel: 'إجمالي المبيعات',
      totalPurchasesLabel: 'إجمالي المشتريات',
      weightDifference: 'فارق الوزن (عيار {karat})',
      weightDifference24: 'فارق الوزن (عيار 24)',
      weightDifference999: 'فارق الوزن (عيار 999)',
      rateLabel: 'المعدل (ر.ي/جم)',
      globalPosition: 'المركز (أونصة عالمية)',
      totalMovement: 'إجمالي الحركة',
      salesInvoices: 'عدد فواتير البيع:',
      purchaseInvoices: 'عدد فواتير الشراء:'
    },
    search: {
      transactions: 'بحث عن معامل...'
    },
    grid: {
      transactionsTitle: 'قائمة المعاملات'
    },
    table: {
      invoiceNo: 'رقم الفاتورة',
      referenceNo: 'رقم مرجعي',
      entityName: 'اسم العميل/المورد',
      date: 'التاريخ',
      operationType: 'نوع العملية',
      karat: 'العيار',
      weight: 'الوزن',
      ounce: 'الأونصة',
      pricePerGram: 'سعر الجرام',
      labor: 'الأجور',
      value: 'القيمة',
      memo: 'البيان',
      empty: 'لا توجد بيانات لعرضها'
    },
    lookup: {
      cancel: 'إلغاء',
      customer: {
        title: 'اختر عميل',
        searchLabel: 'بحث عن عميل',
        placeholder: 'اكتب رقم العميل أو اسم العميل للبحث',
        id: 'رقم العميل',
        name: 'اسم العميل'
      },
      supplier: {
        title: 'اختر مورد',
        searchLabel: 'بحث عن مورد',
        placeholder: 'اكتب رقم المورد أو اسم المورد للبحث',
        id: 'رقم المورد',
        name: 'اسم المورد'
      }
    },
    orderModal: {
      sellLabel: 'بيع',
      buyLabel: 'شراء',
      notesLabel: 'ملاحظات'
    },
    operation: {
      sellCode: 'SELL',
      sellLabel: 'بيع',
      buyCode: 'BUY',
      buyLabel: 'شراء'
    },
    toast: {
      refreshData: 'تم تحديث البيانات',
      exportSuccess: 'تم تصدير البيانات إلى Excel بنجاح',
      preparePdf: 'يتم تحضير ملف PDF...',
      openInvoice: 'تم فتح فاتورة {type} رقم {id}',
      templateDownloaded: 'تم تحميل القالب بنجاح',
      importRead: 'تم قراءة {count} صف من الملف'
    },
    error: {
      permissionView: 'ليس لديك صلاحية لعرض حركة المبيعات والمشتريات',
      apiUnavailable: 'خطأ: الواجهة البرمجية غير متاحة',
      dataLoad: 'خطأ في تحميل البيانات: {error}',
      genericLoad: 'حدث خطأ في تحميل البيانات',
      noTable: 'لا يوجد جدول للتصدير',
      noData: 'لا توجد بيانات للتصدير',
      export: 'حدث خطأ أثناء التصدير',
      pdf: 'حدث خطأ أثناء إنشاء PDF',
      openInvoiceFail: 'فشل فتح النافذة',
      importNoRows: 'لا توجد صفوف محددة للاستيراد',
      importReadFail: 'حدث خطأ في قراءة الملف',
      importParseFail: 'حدث خطأ أثناء تحليل الملف',
      importProcessFail: 'حدث خطأ أثناء الاستيراد',
      unknown: 'خطأ غير معروف',
      customerNotFound: 'رقم العميل غير موجود',
      supplierNotFound: 'رقم المورد غير موجود',
      customerFetchFail: 'خطأ في جلب بيانات العميل',
      supplierFetchFail: 'خطأ في جلب بيانات المورد'
    },
    confirm: {
      title: 'تأكيد العملية',
      message: 'هل أنت متأكد من هذه العملية؟',
      cancel: 'إلغاء الأمر',
      ok: 'موافق'
    },
    invoice: {
      title: 'تفاصيل الفاتورة',
      invoiceNo: 'رقم الفاتورة:',
      date: 'التاريخ:',
      time: 'الوقت:',
      operationType: 'نوع العملية:',
      entity: 'العميل/المورد:',
      detailsTitle: 'تفاصيل الأصناف',
      karat: 'العيار',
      weight: 'الوزن (جم)',
      ounce: 'الأونصة',
      pricePerGram: 'سعر الجرام',
      labor: 'الأجور',
      value: 'القيمة',
      loading: 'جاري التحميل...',
      totalWeight: 'إجمالي الوزن:',
      totalOunce: 'إجمالي الأونصة:',
      totalValue: 'إجمالي القيمة:'
    },
    units: {
      gramSuffix: ' جم',
      ounceSuffix: ' أونصة'
    },
    file: {
      movements: 'حركة_المبيعات_والمشتريات',
      importTemplateSell: 'قالب_استيراد_فواتير_بيع',
      importTemplateBuy: 'قالب_استيراد_فواتير_شراء'
    },
    import: {
      title: 'استيراد فواتير من Excel',
      invoiceType: 'نوع الفاتورة',
      autoCreate: 'إنشاء عميل/مورد جديد',
      autoCreateHint: 'تلقائياً إذا لم يكن موجوداً',
      downloadTemplate: 'تحميل قالب Excel',
      dragInstruction: 'اسحب ملف Excel هنا',
      orClick: 'أو انقر لاختيار الملف',
      chooseFile: 'اختيار ملف',
      formats: 'xlsx, xls, csv',
      chooseAnother: 'اختيار ملف آخر',
      totalRows: 'إجمالي الصفوف',
      validRows: 'صفوف صالحة',
      errorRows: 'صفوف بها أخطاء',
      progress: 'استيراد {current} من {total}...',
      importing: 'جاري استيراد الفواتير...',
      pleaseWait: 'يرجى الانتظار',
      completed: 'تم الاستيراد بنجاح!',
      closeAndRefresh: 'إغلاق وتحديث البيانات',
      startImport: 'بدء الاستيراد',
      preview: {
        entityId: 'رقم العميل/المورد',
        entityName: 'اسم العميل/المورد',
        date: 'التاريخ',
        karat: 'العيار',
        weight: 'الوزن',
        ounce: 'الأونصة',
        pricePerGram: 'سعر الجرام',
        value: 'القيمة',
        status: 'الحالة'
      }
    },
    permissions: {
      salesPurchaseView: 'عرض حركة المبيعات والمشتريات',
      salesPurchaseExport: 'تصدير حركة المبيعات والمشتريات'
    }
  },
  en: {
    title: 'Sales & Purchases Movement',
    tabs: {
      salesPurchases: 'Sales & Purchases'
    },
    actions: {
      close: 'Close',
      reset: 'Reset',
      apply: 'Apply range',
      exportPdf: 'Export PDF',
      pdf: 'PDF',
      exportExcel: 'Export Excel',
      excel: 'Excel',
      importExcel: 'Import from Excel',
      import: 'Import',
      refresh: 'Refresh',
      cancel: 'Cancel',
      print: 'Print'
    },
    filters: {
      metalLabel: 'Metal type:',
      gold: '🥇 Gold',
      silver: '🥈 Silver',
      invoiceTypeLabel: 'Invoice type:',
      all: 'All',
      cash: 'Cash',
      credit: 'Deferred',
      taskir: 'Melting',
      mashghul: 'Jewelry',
      from: 'From',
      to: 'To',
      allTitle: 'Show all movements',
      sell: 'SELL',
      sellTitle: 'Show sales only',
      buy: 'BUY',
      buyTitle: 'Show purchases only',
      cashTitle: 'Show cash invoices only',
      creditTitle: 'Show deferred invoices only'
    },
    cards: {
      totalSales: 'Total Sales',
      totalPurchases: 'Total Purchases',
      value: 'Value',
      karat24: '24K',
      karat22: '22K',
      karat21: '21K',
      karat18: '18K',
      silver999: '999 Silver',
      silver925: '925 Silver',
      silver900: '900 Silver',
      silver800: '800 Silver',
      basisGold: 'Gram - 24K',
      basisSilver: 'Gram - 999',
      profitLossTitle: 'Profit & Loss',
      profitNet: 'Net',
      percentage: 'Percentage',
      totalSalesLabel: 'Total sales',
      totalPurchasesLabel: 'Total purchases',
      weightDifference: 'Weight difference (karat {karat})',
      weightDifference24: 'Weight difference (24K)',
      weightDifference999: 'Weight difference (999)',
      rateLabel: 'Average (SAR/g)',
      globalPosition: 'Position (global ounce)',
      totalMovement: 'Movement summary',
      salesInvoices: 'Sales invoices:',
      purchaseInvoices: 'Purchase invoices:'
    },
    search: {
      transactions: 'Search transaction...'
    },
    grid: {
      transactionsTitle: 'Transactions list'
    },
    table: {
      invoiceNo: 'Invoice No.',
      referenceNo: 'Reference No.',
      entityName: 'Customer/Supplier',
      date: 'Date',
      operationType: 'Operation type',
      karat: 'Karat',
      weight: 'Weight',
      ounce: 'Ounce',
      pricePerGram: 'Price/gram',
      labor: 'Labor',
      value: 'Value',
      memo: 'Memo',
      empty: 'No data to display'
    },
    lookup: {
      cancel: 'Cancel',
      customer: {
        title: 'Select customer',
        searchLabel: 'Search customer',
        placeholder: 'Enter customer number or name',
        id: 'Customer No.',
        name: 'Customer name'
      },
      supplier: {
        title: 'Select supplier',
        searchLabel: 'Search supplier',
        placeholder: 'Enter supplier number or name',
        id: 'Supplier No.',
        name: 'Supplier name'
      }
    },
    orderModal: {
      sellLabel: 'Sell',
      buyLabel: 'Buy',
      notesLabel: 'Notes'
    },
    operation: {
      sellCode: 'SELL',
      sellLabel: 'Sell',
      buyCode: 'BUY',
      buyLabel: 'Buy'
    },
    toast: {
      refreshData: 'Data refreshed',
      exportSuccess: 'Data exported to Excel successfully',
      preparePdf: 'Preparing PDF...',
      openInvoice: '{type} invoice #{id} opened',
      templateDownloaded: 'Template downloaded successfully',
      importRead: '{count} rows detected in the file'
    },
    error: {
      permissionView: 'You are not allowed to view this screen',
      apiUnavailable: 'Error: API is not available',
      dataLoad: 'Failed to load data: {error}',
      genericLoad: 'An error occurred while loading data',
      noTable: 'No table to export',
      noData: 'There is no data to export',
      export: 'An error occurred during export',
      pdf: 'An error occurred while generating PDF',
      openInvoiceFail: 'Failed to open invoice window',
      importNoRows: 'No rows selected for import',
      importReadFail: 'Failed to read the file',
      importParseFail: 'An error occurred while parsing the file',
      importProcessFail: 'An error occurred during import',
      unknown: 'Unknown error',
      customerNotFound: 'Customer number not found',
      supplierNotFound: 'Supplier number not found',
      customerFetchFail: 'Failed to fetch customer data',
      supplierFetchFail: 'Failed to fetch supplier data'
    },
    confirm: {
      title: 'Confirm action',
      message: 'Are you sure you want to continue?',
      cancel: 'Cancel',
      ok: 'OK'
    },
    invoice: {
      title: 'Invoice details',
      invoiceNo: 'Invoice No.:',
      date: 'Date:',
      time: 'Time:',
      operationType: 'Operation type:',
      entity: 'Customer/Supplier:',
      detailsTitle: 'Items details',
      karat: 'Karat',
      weight: 'Weight (g)',
      ounce: 'Ounce',
      pricePerGram: 'Price/gram',
      labor: 'Labor',
      value: 'Value',
      loading: 'Loading...',
      totalWeight: 'Total weight:',
      totalOunce: 'Total ounce:',
      totalValue: 'Total value:'
    },
    units: {
      gramSuffix: ' g',
      ounceSuffix: ' oz'
    },
    file: {
      movements: 'sales_purchases_movement',
      importTemplateSell: 'import_template_sales',
      importTemplateBuy: 'import_template_purchases'
    },
    import: {
      title: 'Import invoices from Excel',
      invoiceType: 'Invoice type',
      autoCreate: 'Create missing customer/supplier',
      autoCreateHint: 'Automatically when not found',
      downloadTemplate: 'Download Excel template',
      dragInstruction: 'Drag the Excel file here',
      orClick: 'or click to choose a file',
      chooseFile: 'Choose file',
      formats: 'xlsx, xls, csv',
      chooseAnother: 'Choose another file',
      totalRows: 'Total rows',
      validRows: 'Valid rows',
      errorRows: 'Rows with errors',
      progress: 'Importing {current} of {total}...',
      importing: 'Importing invoices...',
      pleaseWait: 'Please wait',
      completed: 'Import completed successfully!',
      closeAndRefresh: 'Close and refresh',
      startImport: 'Start import',
      preview: {
        entityId: 'Customer/Supplier ID',
        entityName: 'Customer/Supplier name',
        date: 'Date',
        karat: 'Karat',
        weight: 'Weight',
        ounce: 'Ounce',
        pricePerGram: 'Price/gram',
        value: 'Value',
        status: 'Status'
      }
    },
    permissions: {
      salesPurchaseView: 'View sales & purchases movement',
      salesPurchaseExport: 'Sales & purchases export'
    }
  }
};

function getSPMLang() {
  try {
    const lang = localStorage.getItem('uiLang');
    return lang === 'en' ? 'en' : 'ar';
  } catch (_) {
    return 'ar';
  }
}

function isSPMRtl() {
  return getSPMLang() === 'ar';
}

function resolveTranslation(obj, path) {
  return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
}

function tSPM(key) {
  const lang = getSPMLang();
  const val = resolveTranslation(SPM_TRANSLATIONS[lang] || {}, key);
  if (val !== undefined) return val;
  const fallback = resolveTranslation(SPM_TRANSLATIONS.ar, key);
  return fallback !== undefined ? fallback : key;
}

function tSPMFmt(key, params = {}) {
  let str = tSPM(key);
  Object.entries(params).forEach(([k, v]) => {
    const regex = new RegExp(`{${k}}`, 'g');
    str = str.replace(regex, v);
  });
  return str;
}

function syncToolbarFilterButtons() {
  const btnAll = document.getElementById('btnFilterAll');
  if (btnAll) {
    btnAll.classList.toggle('active', currentTypeFilter === 'all' && currentPaymentTypeFilter === 'all');
  }

  const typeButtons = document.querySelectorAll('.btn-filter-type[data-filter]');
  typeButtons.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-filter') === currentTypeFilter);
  });

  const paymentButtons = document.querySelectorAll('.btn-filter-type[data-payment-filter]');
  paymentButtons.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-payment-filter') === currentPaymentTypeFilter);
  });
}

function applySPMStaticTexts() {
  const lang = getSPMLang();
  const isRtl = isSPMRtl();
  document.documentElement.lang = lang;
  document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  document.body.style.direction = isRtl ? 'rtl' : 'ltr';
  
  const attrMappings = [
    { attr: 'data-i18n', apply: (el, val) => { el.textContent = val; } },
    { attr: 'data-i18n-placeholder', apply: (el, val) => { el.setAttribute('placeholder', val); } },
    { attr: 'data-i18n-title', apply: (el, val) => { el.setAttribute('title', val); } },
    { attr: 'data-i18n-value', apply: (el, val) => { el.value = val; } },
    { attr: 'data-i18n-html', apply: (el, val) => { el.innerHTML = val; } }
  ];
  
  attrMappings.forEach(({ attr, apply }) => {
    document.querySelectorAll(`[${attr}]`).forEach(el => {
      const key = el.getAttribute(attr);
      if (key) {
        apply(el, tSPM(key));
      }
    });
  });
  
  // Apply translations for invoice type filter
  const invoiceTypeFilterLabel = document.getElementById('invoiceTypeFilterLabel');
  if (invoiceTypeFilterLabel) invoiceTypeFilterLabel.textContent = tSPM('filters.invoiceTypeLabel');
  
  const btnInvoiceTypeAllText = document.getElementById('btnInvoiceTypeAllText');
  if (btnInvoiceTypeAllText) btnInvoiceTypeAllText.textContent = tSPM('filters.all');
  
  const btnInvoiceTypeTaskirText = document.getElementById('btnInvoiceTypeTaskirText');
  if (btnInvoiceTypeTaskirText) btnInvoiceTypeTaskirText.textContent = tSPM('filters.taskir');
  
  const btnInvoiceTypeMashghulText = document.getElementById('btnInvoiceTypeMashghulText');
  if (btnInvoiceTypeMashghulText) btnInvoiceTypeMashghulText.textContent = tSPM('filters.mashghul');
}

function toastInfoKey(key, params) {
  showToast('info', tSPMFmt(key, params));
}

function toastErrorKey(key, params) {
  showToast('error', tSPMFmt(key, params));
}

function toastSuccessKey(key, params) {
  showToast('success', tSPMFmt(key, params));
}

// ===== Animate Number Counter =====
// Store active timers to cancel them when new animation starts
const activeTimers = new Map();

function animateValue(element, start, end, decimals = 2, duration = 600) {
  if (!element) return;
  
  // Cancel any existing animation on this element
  const existingTimer = activeTimers.get(element);
  if (existingTimer) {
    clearInterval(existingTimer);
    activeTimers.delete(element);
  }
  
  // If values are the same, just set directly
  if (start === end) {
    element.textContent = formatNumber(end, decimals);
    return;
  }
  
  const range = end - start;
  const increment = range / (duration / 16); // 60 FPS
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
      current = end;
      clearInterval(timer);
      activeTimers.delete(element);
    }
    element.textContent = formatNumber(current, decimals);
  }, 16);
  
  // Store the timer
  activeTimers.set(element, timer);
}

// Animate with suffix (like %, جم, etc.)
function animateValueWithSuffix(element, start, end, decimals = 2, suffix = '', duration = 600) {
  if (!element) return;
  
  // Cancel any existing animation on this element
  const existingTimer = activeTimers.get(element);
  if (existingTimer) {
    clearInterval(existingTimer);
    activeTimers.delete(element);
  }
  
  // If values are the same, just set directly
  if (start === end) {
    element.textContent = formatNumber(end, decimals) + suffix;
    return;
  }
  
  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
      current = end;
      clearInterval(timer);
      activeTimers.delete(element);
    }
    element.textContent = formatNumber(current, decimals) + suffix;
  }, 16);
  
  activeTimers.set(element, timer);
}

// Animate integer values (for counts)
function animateInteger(element, start, end, duration = 600) {
  if (!element) return;
  
  const existingTimer = activeTimers.get(element);
  if (existingTimer) {
    clearInterval(existingTimer);
    activeTimers.delete(element);
  }
  
  if (start === end) {
    element.textContent = Math.round(end);
    return;
  }
  
  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
      current = end;
      clearInterval(timer);
      activeTimers.delete(element);
    }
    element.textContent = Math.round(current);
  }, 16);
  
  activeTimers.set(element, timer);
}

// ===== Number Formatting Function =====
function formatNumber(number, decimals = 2) {
  if (number === null || number === undefined || isNaN(number)) {
    return '0.' + '0'.repeat(decimals);
  }
  
  const fixed = Number(number).toFixed(decimals);
  const parts = fixed.split('.');
  
  // Add thousand separators
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  return parts.join('.');
}

document.addEventListener('DOMContentLoaded', async () => {
  applySPMStaticTexts();
  // Initialize date filters with current month
  initializeDateFilters();
  
  // Ensure permissions are loaded before first checks/actions
  await ensurePermissionsReady();

  // Load data on initialization
  loadMovementData();

  // Tab switching logic with permissions
  const topTabs = document.querySelectorAll('.top-tab');
  const tabContents = document.querySelectorAll('.tab-content');

  if (topTabs.length > 0) {
    topTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-tab');
        
        // Check permissions for orders tab
        
        // Remove active class from all tabs and contents
        topTabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding content
        const targetContent = document.getElementById(`content-${targetTab}`);
        if (targetContent) {
          targetContent.classList.add('active');
        }
        
        // Load orders data when switching to orders tab
      });
    });

    // Initialize with first tab active
    const firstTab = document.querySelector('.top-tab.active');
    if (firstTab) {
      const targetTab = firstTab.getAttribute('data-tab');
      const targetContent = document.getElementById(`content-${targetTab}`);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    }
  }
  
  // Apply tab-level permissions after initialization
  applyTabPermissions();

  // ===== Data Grid Functionality =====
  
  // Search functionality
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();
      const tableRows = document.querySelectorAll('#dataTableBody tr:not(.empty-row)');
      
      // Collect visible invoice IDs from visible rows
      const visibleInvoiceIds = new Set();
      
      tableRows.forEach((row) => {
        const text = row.textContent.toLowerCase();
        const isVisible = searchTerm === '' || text.includes(searchTerm);
        row.style.display = isVisible ? '' : 'none';
        if (isVisible) {
          // Get invoice ID and type from row
          const invoiceId = row.getAttribute('data-invoice-id');
          const invoiceType = row.getAttribute('data-type');
          if (invoiceId && invoiceType) {
            visibleInvoiceIds.add(`${invoiceType}-${invoiceId}`);
          }
        }
      });
      
      // Filter current displayed movements based on visible rows
      let finalFilteredMovements;
      if (searchTerm === '') {
        finalFilteredMovements = currentFilteredMovements;
      } else {
        // Filter by visible invoice IDs
        finalFilteredMovements = currentFilteredMovements.filter(m => {
          const key = `${m.type}-${m.invoice_id}`;
          return visibleInvoiceIds.has(key);
        });
      }
      
      // Update statistics with filtered data
      updateStatisticsFromMovements(finalFilteredMovements);
    });
  }

  // Refresh button
  const btnRefresh = document.getElementById('btnRefresh');
  if (btnRefresh) {
    btnRefresh.addEventListener('click', () => {
      loadMovementData();
      showToast('info', tSPM('toast.refreshData'));
    });
  }
  
  // Date filter buttons
  const btnApplyDateFilter = document.getElementById('btnApplyDateFilter');
  if (btnApplyDateFilter) {
    btnApplyDateFilter.addEventListener('click', () => {
      loadMovementData();
    });
  }
  
  const btnResetDateFilter = document.getElementById('btnResetDateFilter');
  if (btnResetDateFilter) {
    btnResetDateFilter.addEventListener('click', () => {
      resetDateFilter();
    });
  }
  
  // Apply filter on Enter key
  const dateFrom = document.getElementById('dateFrom');
  const dateTo = document.getElementById('dateTo');
  [dateFrom, dateTo].forEach(input => {
    if (input) {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          loadMovementData();
        }
      });
    }
  });
  
  // Type filter buttons
  const btnFilterAll = document.getElementById('btnFilterAll');
  if (btnFilterAll) {
    btnFilterAll.addEventListener('click', () => {
      currentTypeFilter = 'all';
      currentPaymentTypeFilter = 'all';
      syncToolbarFilterButtons();
      applyDateFilter();
    });
  }

  const typeFilterButtons = document.querySelectorAll('.btn-filter-type[data-filter]');
  typeFilterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterType = btn.getAttribute('data-filter');
      applyTypeFilter(filterType);
    });
  });

  const paymentFilterButtons = document.querySelectorAll('.btn-filter-type[data-payment-filter]');
  paymentFilterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const paymentType = btn.getAttribute('data-payment-filter');
      applyPaymentTypeFilter(paymentType);
    });
  });

  syncToolbarFilterButtons();

  // Metal filter buttons (Gold/Silver)
  const metalFilterButtons = document.querySelectorAll('.metal-filter-btn[data-metal]');
  metalFilterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const metalType = btn.getAttribute('data-metal');
      applyMetalFilter(metalType);
    });
  });

  // Invoice type filter buttons (All/Taskir/Mashghul)
  const invoiceTypeFilterButtons = document.querySelectorAll('.metal-filter-btn[data-invoice-type]');
  invoiceTypeFilterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const invoiceType = btn.getAttribute('data-invoice-type');
      applyInvoiceTypeFilter(invoiceType);
    });
  });

  // Export Excel button
  const btnExportExcel = document.getElementById('btnExportExcel');
  if (btnExportExcel) {
    btnExportExcel.addEventListener('click', () => {
      // Check export permission
      if (window.ScreenPermissions && !window.ScreenPermissions.check('sales_purchase_movement_export', tSPM('permissions.salesPurchaseExport'))) {
        return;
      }
      exportToExcel();
    });
  }

  // Export PDF button
  const btnExportPDF = document.getElementById('btnExportPDF');
  if (btnExportPDF) {
    btnExportPDF.addEventListener('click', () => {
      // Check export permission
      if (window.ScreenPermissions && !window.ScreenPermissions.check('sales_purchase_movement_export', tSPM('permissions.salesPurchaseExport'))) {
        return;
      }
      exportToPDF();
    });
  }

  // Orders tab functionality
  // Operation type selector
  // Orders Export buttons
  // Select All Orders Checkbox

});

// ===== Toast Notification Function =====
function showToast(type, message) {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    top: 80px;
    ${isSPMRtl() ? 'right' : 'left'}: 50%;
    transform: translateX(-50%);
    background: var(--card);
    color: var(--text);
    padding: 12px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 9999;
    border-left: 4px solid var(--primary);
    animation: slideDown 0.3s ease;
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideUp 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ===== Data Loading Functions =====

async function loadMovementData() {
  try {
    // Ensure permissions are initialized before checking
    if (window.ScreenPermissions && !permissionsInitialized) {
      await ensurePermissionsReady();
    }
    
    // Check view permission (after permissions loaded)
    if (window.ScreenPermissions && !window.ScreenPermissions.check('sales_purchase_movement_view', tSPM('permissions.salesPurchaseView'))) {
      allMovementsData = [];
      currentFilteredMovements = [];
      updateStatisticsFromMovements([]);
      displayMovementData([]);
      return;
    }
    
    // Check if API is available
    if (!window.salesPurchaseMovement) {
      allMovementsData = [];
      currentFilteredMovements = [];
      updateStatisticsFromMovements([]);
      toastErrorKey('error.apiUnavailable');
      displayMovementData([]);
      return;
    }
    
    // Fetch movement data using new API
    const requestPayload = getMovementDatePayload();
    const response = await window.salesPurchaseMovement.list(requestPayload);
    
    if (!response.success) {
      allMovementsData = [];
      currentFilteredMovements = [];
      updateStatisticsFromMovements([]);
      toastErrorKey('error.dataLoad', { error: response.error || tSPM('error.unknown') });
      displayMovementData([]);
      return;
    }
    
    const movements = Array.isArray(response.movements)
      ? response.movements.map((movement) => ({
          ...movement,
          payment_type: normalizeMovementPaymentType(movement?.payment_type)
        }))
      : [];
    
    // Store all data globally
    loadedMovementDateRange = requestPayload;
    allMovementsData = movements;
    
    // Apply current date filter
    applyDateFilter();
  } catch (error) {
    allMovementsData = [];
    currentFilteredMovements = [];
    updateStatisticsFromMovements([]);
    toastErrorKey('error.genericLoad');
    displayMovementData([]);
  }
}

// Initialize date filters - from start of year to today
function initializeDateFilters() {
  const today = new Date();
  // Use local date format to avoid timezone issues with toISOString()
  const formatLocalDate = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const todayString = formatLocalDate(today);
  
  // Get start of current year (January 1st)
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const startOfYearString = formatLocalDate(startOfYear);
  
  const dateFrom = document.getElementById('dateFrom');
  const dateTo = document.getElementById('dateTo');
  
  if (dateFrom) {
    dateFrom.value = startOfYearString;  // بداية السنة
  }
  
  if (dateTo) {
    dateTo.value = todayString;  // اليوم الحالي
  }
}

function getMovementDatePayload() {
  const dateFrom = document.getElementById('dateFrom');
  const dateTo = document.getElementById('dateTo');
  const from = String(dateFrom?.value || '').trim();
  const to = String(dateTo?.value || '').trim();
  return {
    ...(from ? { from } : {}),
    ...(to ? { to } : {})
  };
}

// Apply date filter
function applyDateFilter() {
  const fromDate = loadedMovementDateRange.from || '';
  const toDate = loadedMovementDateRange.to || '';
  
  // Filter movements by date range and type
  let filteredMovements = allMovementsData;
  
  // Apply date filter
  if (fromDate || toDate) {
    filteredMovements = filteredMovements.filter(movement => {
      const movementDate = movement.date || '';
      
      // Check if date is within range
      const afterFrom = !fromDate || movementDate >= fromDate;
      const beforeTo = !toDate || movementDate <= toDate;
      
      return afterFrom && beforeTo;
    });
  }
  
  // Apply type filter
  if (currentTypeFilter !== 'all') {
    filteredMovements = filteredMovements.filter(movement => {
      return movement.type === currentTypeFilter;
    });
  }

  if (currentPaymentTypeFilter !== 'all') {
    filteredMovements = filteredMovements.filter(movement => {
      return normalizeMovementPaymentType(movement.payment_type) === currentPaymentTypeFilter;
    });
  }
  
  // Apply invoice type filter (taskir/mashghul)
  if (currentInvoiceTypeFilter !== 'all') {
    filteredMovements = filteredMovements.filter(movement => {
      const invoiceType = movement.invoice_type || 'taskir';
      return invoiceType === currentInvoiceTypeFilter;
    });
  }
  
  // Apply metal filter (gold/silver) on the table display
  const isGoldFilter = currentMetalFilter === 'gold';
  const displayMovements = filteredMovements.filter(movement => {
    const karat = movement.karat ? movement.karat.toString().trim() : '';
    const isSilver = isSilverKarat(karat);
    return isGoldFilter ? !isSilver : isSilver;
  });
  
  // Save current filtered movements for search (including metal filter)
  currentFilteredMovements = displayMovements;
  
  // Display filtered data (with metal filter applied)
  displayMovementData(displayMovements);
  
  // Re-apply search filter if there's a search term
  const searchInput = document.getElementById('searchInput');
  const searchTerm = searchInput?.value?.toLowerCase().trim() || '';
  
  if (searchTerm) {
    // Apply search filter on displayed rows
    const tableRows = document.querySelectorAll('#dataTableBody tr:not(.empty-row)');
    const visibleInvoiceIds = new Set();
    
    tableRows.forEach((row) => {
      const text = row.textContent.toLowerCase();
      const isVisible = text.includes(searchTerm);
      row.style.display = isVisible ? '' : 'none';
      if (isVisible) {
        const invoiceId = row.getAttribute('data-invoice-id');
        const invoiceType = row.getAttribute('data-type');
        if (invoiceId && invoiceType) {
          visibleInvoiceIds.add(`${invoiceType}-${invoiceId}`);
        }
      }
    });
    
    // Filter movements for statistics based on visible rows
    const searchFilteredMovements = displayMovements.filter(m => {
      const key = `${m.type}-${m.invoice_id}`;
      return visibleInvoiceIds.has(key);
    });
    
    // Update statistics with search-filtered data
    updateStatisticsFromMovements(searchFilteredMovements);
  } else {
    // Update statistics with filtered data (no search) - pass all movements for proper gold/silver separation
    updateStatisticsFromMovements(filteredMovements);
  }
}

// Reset date filter
function resetDateFilter() {
  // Reset to current month
  initializeDateFilters();
  
  // Reset type filter to 'all'
  currentTypeFilter = 'all';
  currentPaymentTypeFilter = 'all';
  syncToolbarFilterButtons();
  
  // Clear search input on reset
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.value = '';
  }
  
  // Apply filter (which will show all data for current month)
  loadMovementData();
  
  // Removed toast notification for filter reset
}

// Apply type filter (all, SELL, BUY)
function applyTypeFilter(filterType) {
  currentTypeFilter = filterType;
  syncToolbarFilterButtons();
  applyDateFilter();
}

function applyPaymentTypeFilter(paymentType) {
  currentPaymentTypeFilter = paymentType;
  syncToolbarFilterButtons();
  applyDateFilter();
}

function updateStatisticsFromMovements(movements) {
  try {
    // Initialize karat totals for gold
    const salesByGoldKarat = { '24': 0, '22': 0, '21': 0, '18': 0 };
    const purchasesByGoldKarat = { '24': 0, '22': 0, '21': 0, '18': 0 };
    
    // Initialize karat totals for silver
    const salesBySilverKarat = { '999': 0, '925': 0, '900': 0, '800': 0 };
    const purchasesBySilverKarat = { '999': 0, '925': 0, '900': 0, '800': 0 };
    
    // Gold totals
    let totalGoldSalesWeightNet24 = 0;
    let totalGoldPurchasesWeightNet24 = 0;
    let totalGoldSalesValue = 0;
    let totalGoldPurchasesValue = 0;
    const goldSalesInvoiceIds = new Set();
    const goldPurchaseInvoiceIds = new Set();
    
    // Silver totals (net 999)
    let totalSilverSalesWeightNet999 = 0;
    let totalSilverPurchasesWeightNet999 = 0;
    let totalSilverSalesValue = 0;
    let totalSilverPurchasesValue = 0;
    const silverSalesInvoiceIds = new Set();
    const silverPurchaseInvoiceIds = new Set();
    
    // Calculate totals per karat - separating gold and silver
    movements.forEach(movement => {
      const weight = parseFloat(movement.weight) || 0;
      const value = parseFloat(movement.value) || 0;
      const karat = movement.karat ? movement.karat.toString().trim() : '';
      const karatNum = parseFloat(karat) || 24;
      
      // Check if this is silver
      const isSilver = isSilverKarat(karat);
      
      if (isSilver) {
        // Silver: Convert to net 999
        const net999Weight = weight * (karatNum / 999);
        const ounces = net999Weight / 31.1035;
        
        if (movement.type === 'SELL') {
          totalSilverSalesWeightNet999 += net999Weight;
          totalSilverSalesValue += value;
          silverSalesInvoiceIds.add(movement.invoice_id);
          
          if (salesBySilverKarat.hasOwnProperty(karat)) {
            salesBySilverKarat[karat] += weight;
          }
        } else if (movement.type === 'BUY') {
          totalSilverPurchasesWeightNet999 += net999Weight;
          totalSilverPurchasesValue += value;
          silverPurchaseInvoiceIds.add(movement.invoice_id);
          
          if (purchasesBySilverKarat.hasOwnProperty(karat)) {
            purchasesBySilverKarat[karat] += weight;
          }
        }
      } else {
        // Gold: Convert to net 24 karat
        const net24Weight = weight * (karatNum / 24);
        const ounces = net24Weight / 31.1035;
        
        if (movement.type === 'SELL') {
          totalGoldSalesWeightNet24 += net24Weight;
          totalGoldSalesValue += value;
          goldSalesInvoiceIds.add(movement.invoice_id);
          
          if (salesByGoldKarat.hasOwnProperty(karat)) {
            salesByGoldKarat[karat] += weight;
          }
        } else if (movement.type === 'BUY') {
          totalGoldPurchasesWeightNet24 += net24Weight;
          totalGoldPurchasesValue += value;
          goldPurchaseInvoiceIds.add(movement.invoice_id);
          
          if (purchasesByGoldKarat.hasOwnProperty(karat)) {
            purchasesByGoldKarat[karat] += weight;
          }
        }
      }
    });
    
    // Determine which totals to display based on metal filter
    const isGold = currentMetalFilter === 'gold';
    const totalSalesWeightNet24 = isGold ? totalGoldSalesWeightNet24 : totalSilverSalesWeightNet999;
    const totalPurchasesWeightNet24 = isGold ? totalGoldPurchasesWeightNet24 : totalSilverPurchasesWeightNet999;
    const totalSalesValue = isGold ? totalGoldSalesValue : totalSilverSalesValue;
    const totalPurchasesValue = isGold ? totalGoldPurchasesValue : totalSilverPurchasesValue;
    const salesInvoiceIds = isGold ? goldSalesInvoiceIds : silverSalesInvoiceIds;
    const purchaseInvoiceIds = isGold ? goldPurchaseInvoiceIds : silverPurchaseInvoiceIds;
    const salesByKarat = isGold ? salesByGoldKarat : salesBySilverKarat;
    const purchasesByKarat = isGold ? purchasesByGoldKarat : purchasesBySilverKarat;
    
    // Save previous values before updating for profit card animations
    const prevSalesValue = prevValues.totalSalesValue;
    const prevPurchasesValue = prevValues.totalPurchasesValue;
    
    // Update total sales (Net 24) with animation
    const totalSalesEl = document.getElementById('totalSales');
    if (totalSalesEl) {
      animateValue(totalSalesEl, prevValues.totalSalesWeightNet24, totalSalesWeightNet24, 3);
      prevValues.totalSalesWeightNet24 = totalSalesWeightNet24;
    }
    
    // Update total sales value with animation
    const totalSalesValueEl = document.getElementById('totalSalesValue');
    if (totalSalesValueEl) {
      animateValue(totalSalesValueEl, prevValues.totalSalesValue, totalSalesValue, 2);
      prevValues.totalSalesValue = totalSalesValue;
    }
    
    // Update total purchases (Net 24) with animation
    const totalPurchasesEl = document.getElementById('totalPurchases');
    if (totalPurchasesEl) {
      animateValue(totalPurchasesEl, prevValues.totalPurchasesWeightNet24, totalPurchasesWeightNet24, 3);
      prevValues.totalPurchasesWeightNet24 = totalPurchasesWeightNet24;
    }
    
    // Update total purchases value with animation
    const totalPurchasesValueEl = document.getElementById('totalPurchasesValue');
    if (totalPurchasesValueEl) {
      animateValue(totalPurchasesValueEl, prevValues.totalPurchasesValue, totalPurchasesValue, 2);
      prevValues.totalPurchasesValue = totalPurchasesValue;
    }
    
    // Calculate profit/loss
    const profitLoss = totalSalesValue - totalPurchasesValue;
    const profitLossPercentage = totalPurchasesValue > 0 ? ((profitLoss / totalPurchasesValue) * 100) : 0;
    
    // Update profit/loss card with animation
    const profitLossEl = document.getElementById('profitLoss');
    if (profitLossEl) {
      animateValue(profitLossEl, prevValues.profitLoss, profitLoss, 2);
      prevValues.profitLoss = profitLoss;
      // Change color based on profit or loss
      if (profitLoss > 0) {
        profitLossEl.style.color = 'var(--success)';
      } else if (profitLoss < 0) {
        profitLossEl.style.color = 'var(--error)';
      } else {
        profitLossEl.style.color = 'var(--subtle)';
      }
    }
    
    const profitLossPercentageEl = document.getElementById('profitLossPercentage');
    if (profitLossPercentageEl) {
      // Animate percentage with suffix
      animateValueWithSuffix(profitLossPercentageEl, prevValues.profitLossPercentage, profitLossPercentage, 1, '%');
      prevValues.profitLossPercentage = profitLossPercentage;
      
      // Change color based on profit or loss
      if (profitLoss > 0) {
        profitLossPercentageEl.style.color = 'var(--success)';
      } else if (profitLoss < 0) {
        profitLossPercentageEl.style.color = 'var(--error)';
      } else {
        profitLossPercentageEl.style.color = 'var(--subtle)';
      }
    }
    
    // Update profit card sales value with animation (use saved prev values)
    const profitSalesValueEl = document.getElementById('profitSalesValue');
    if (profitSalesValueEl) {
      animateValue(profitSalesValueEl, prevSalesValue, totalSalesValue, 2);
    }
    
    // Update profit card purchases value with animation (use saved prev values)
    const profitPurchasesValueEl = document.getElementById('profitPurchasesValue');
    if (profitPurchasesValueEl) {
      animateValue(profitPurchasesValueEl, prevPurchasesValue, totalPurchasesValue, 2);
    }
    
    // Calculate weight difference (Net 24 karat)
    const weightDifference = totalSalesWeightNet24 - totalPurchasesWeightNet24;
    const weightDifferenceEl = document.getElementById('weightDifference');
    if (weightDifferenceEl) {
      animateValue(weightDifferenceEl, prevValues.weightDifference, weightDifference, 3);
      prevValues.weightDifference = weightDifference;
      // Change color based on positive or negative
      if (weightDifference > 0) {
        weightDifferenceEl.style.color = 'var(--success)';
      } else if (weightDifference < 0) {
        weightDifferenceEl.style.color = 'var(--error)';
      } else {
        weightDifferenceEl.style.color = 'var(--subtle)';
      }
    }
    
    // Update profit/loss label based on weight difference
    const profitLossTextEl = document.getElementById('profitLossText');
    if (profitLossTextEl) {
      if (weightDifference !== 0) {
        // إذا كان فارق الوزن != 0، نعرض "فارق القيمة"
        profitLossTextEl.textContent = 'فارق القيمة';
      } else {
        // إذا كان فارق الوزن = 0
        if (profitLoss >= 0) {
          profitLossTextEl.textContent = 'صافي الربح';
        } else {
          profitLossTextEl.textContent = 'صافي الخسارة';
        }
      }
    }
    
    // Calculate profit rate (net profit / weight difference)
    const normalizedWeightDifference = Number(weightDifference.toFixed(3));
    const profitRate = normalizedWeightDifference !== 0 ? (profitLoss / normalizedWeightDifference) : 0;
    const profitRateEl = document.getElementById('profitRate');
    if (profitRateEl) {
      if (!prevValues.profitRate) prevValues.profitRate = 0;
      animateValue(profitRateEl, prevValues.profitRate, profitRate, 2);
      prevValues.profitRate = profitRate;
      profitRateEl.style.color = 'var(--primary)';
    }
    
    // Calculate position on global ounce
    // Step 1: Convert weight difference to ounces
    const GRAMS_PER_OUNCE = 31.1035;
    const weightDiffOunces = normalizedWeightDifference / GRAMS_PER_OUNCE;
    
    // Step 2: Calculate price per ounce in SAR (profitLoss / ounces)
    const pricePerOunceSAR = weightDiffOunces !== 0 ? (profitLoss / weightDiffOunces) : 0;
    
    // Step 3: Convert to USD (divide by SAR/USD rate = 3.75)
    const SAR_USD_RATE = 3.75;
    const ouncePosition = pricePerOunceSAR / SAR_USD_RATE;
    const profitPositionEl = document.getElementById('profitPosition');
    if (profitPositionEl) {
      if (!prevValues.ouncePosition) prevValues.ouncePosition = 0;
      animateValue(profitPositionEl, prevValues.ouncePosition, ouncePosition, 2);
      prevValues.ouncePosition = ouncePosition;
      profitPositionEl.style.color = 'var(--gold)';
    }
    
    // Calculate total gross weight for percentage calculation
    const totalSalesWeightGross = Object.values(salesByKarat).reduce((sum, w) => sum + w, 0);
    const totalPurchasesWeightGross = Object.values(purchasesByKarat).reduce((sum, w) => sum + w, 0);
    
    // Update sales breakdown by karat
    updateKaratBreakdown('sales', salesByKarat, totalSalesWeightGross);
    
    // Update purchases breakdown by karat
    updateKaratBreakdown('purchase', purchasesByKarat, totalPurchasesWeightGross);
    
    // Update counts with animation
    const salesCountEl = document.getElementById('salesCount');
    if (salesCountEl) {
      const salesCount = salesInvoiceIds.size;
      animateInteger(salesCountEl, prevValues.salesCount, salesCount);
      prevValues.salesCount = salesCount;
    }
    
    const purchaseCountEl = document.getElementById('purchaseCount');
    if (purchaseCountEl) {
      const purchaseCount = purchaseInvoiceIds.size;
      animateInteger(purchaseCountEl, prevValues.purchaseCount, purchaseCount);
      prevValues.purchaseCount = purchaseCount;
    }
  } catch (error) {
    
  }
}

function updateKaratBreakdown(type, karatData, totalWeight) {
  const isGold = currentMetalFilter === 'gold';
  const karats = isGold ? GOLD_KARATS : SILVER_KARATS;
  
  karats.forEach(karat => {
    const weight = karatData[karat] || 0;
    const percentage = totalWeight > 0 ? (weight / totalWeight) * 100 : 0;
    
    // Build element ID based on metal type
    const elementSuffix = isGold ? karat : `Silver${karat}`;
    
    // Update value element with animation
    const valueEl = document.getElementById(`${type}${elementSuffix}`);
    if (valueEl) {
      const prevKey = type === 'sales' ? 'salesByKarat' : 'purchasesByKarat';
      if (!prevValues[prevKey]) {
        prevValues[prevKey] = isGold ? {24: 0, 22: 0, 21: 0, 18: 0} : {999: 0, 925: 0, 900: 0, 800: 0};
      }
      const prevWeight = prevValues[prevKey][karat] || 0;
      
      // Use animateValueWithSuffix for smooth animation
      animateValueWithSuffix(valueEl, prevWeight, weight, 2, ' جم');
      prevValues[prevKey][karat] = weight;
    }
    
    // Update progress bar with smooth transition
    const barEl = document.getElementById(`${type}Bar${elementSuffix}`);
    if (barEl) {
      barEl.style.transition = 'width 0.6s ease';
      barEl.style.width = `${percentage.toFixed(1)}%`;
      barEl.title = `${formatNumber(percentage, 1)}%`;
    }
  });
}

// Toggle karat breakdown visibility based on metal filter
function toggleKaratBreakdownVisibility() {
  const isGold = currentMetalFilter === 'gold';
  
  // Sales karat sections
  const salesGoldKarats = document.getElementById('salesGoldKarats');
  const salesSilverKarats = document.getElementById('salesSilverKarats');
  if (salesGoldKarats) salesGoldKarats.style.display = isGold ? 'block' : 'none';
  if (salesSilverKarats) salesSilverKarats.style.display = isGold ? 'none' : 'block';
  
  // Purchases karat sections
  const purchasesGoldKarats = document.getElementById('purchasesGoldKarats');
  const purchasesSilverKarats = document.getElementById('purchasesSilverKarats');
  if (purchasesGoldKarats) purchasesGoldKarats.style.display = isGold ? 'block' : 'none';
  if (purchasesSilverKarats) purchasesSilverKarats.style.display = isGold ? 'none' : 'block';
  
  // Update basis labels
  const salesBasisLabel = document.getElementById('salesBasisLabel');
  const purchasesBasisLabel = document.getElementById('purchasesBasisLabel');
  if (salesBasisLabel) salesBasisLabel.textContent = isGold ? 'جرام - عيار 24' : 'جرام - عيار 999';
  if (purchasesBasisLabel) purchasesBasisLabel.textContent = isGold ? 'جرام - عيار 24' : 'جرام - عيار 999';
  
  // Update weight difference label
  const weightDiffLabel = document.querySelector('[for="weightDifference"], .stat-label:has(#weightDifference)');
  const weightDiffRow = document.querySelector('.stat-row:has(#weightDifference)');
  if (weightDiffRow) {
    const label = weightDiffRow.querySelector('.stat-label');
    if (label) {
      label.innerHTML = `<i class="fa-solid fa-weight-scale"></i> فارق الوزن (عيار ${isGold ? '24' : '999'})`;
    }
  }
}

// Apply metal filter
function applyMetalFilter(metalType) {
  currentMetalFilter = metalType;
  
  // Update button active states
  const metalButtons = document.querySelectorAll('.metal-filter-btn[data-metal]');
  metalButtons.forEach(btn => {
    if (btn.getAttribute('data-metal') === metalType) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // Toggle karat breakdown visibility
  toggleKaratBreakdownVisibility();
  
  // Reset previous values for smooth animation
  prevValues.salesByKarat = currentMetalFilter === 'gold' ? 
    {24: 0, 22: 0, 21: 0, 18: 0} : {999: 0, 925: 0, 900: 0, 800: 0};
  prevValues.purchasesByKarat = currentMetalFilter === 'gold' ? 
    {24: 0, 22: 0, 21: 0, 18: 0} : {999: 0, 925: 0, 900: 0, 800: 0};
  
  // Re-apply date filter to recalculate statistics
  applyDateFilter();
}

// Apply invoice type filter (all/taskir/mashghul)
function applyInvoiceTypeFilter(invoiceType) {
  currentInvoiceTypeFilter = invoiceType;
  
  // Update button active states
  const invoiceTypeButtons = document.querySelectorAll('.metal-filter-btn[data-invoice-type]');
  invoiceTypeButtons.forEach(btn => {
    if (btn.getAttribute('data-invoice-type') === invoiceType) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // Re-apply date filter to recalculate statistics
  applyDateFilter();
}

function displayMovementData(movements) {
  const tbody = document.getElementById('dataTableBody');
  if (!tbody) return;
  
  // Clear existing rows
  tbody.innerHTML = '';
  
  if (movements.length === 0) {
    tbody.innerHTML = `
      <tr class="empty-row">
        <td colspan="12" style="text-align: center; padding: 60px; color: var(--subtle);">
          <i class="fa-solid fa-inbox" style="font-size: 48px; margin-bottom: 16px; display: block; opacity: 0.3;"></i>
          لا توجد بيانات لعرضها
        </td>
      </tr>
    `;
    return;
  }
  
  // Add rows
  movements.forEach(movement => {
    const row = document.createElement('tr');
    // Add data attributes for filtering
    row.setAttribute('data-invoice-id', movement.invoice_id);
    row.setAttribute('data-invoice-display-id', movement.branch_local_number || movement.invoice_id);
    row.setAttribute('data-type', movement.type);
    
    // Determine operation type style with icon
    const operationType = movement.type === 'SELL' ? 
      '<span class="operation-badge-new sell"><i class="fa-solid fa-arrow-trend-up"></i> SELL <small>بيع</small></span>' : 
      '<span class="operation-badge-new buy"><i class="fa-solid fa-arrow-trend-down"></i> BUY <small>شراء</small></span>';
    const laborValue = movement.labor ?? movement.labor_cost ?? movement.labor_per_gram ?? movement.wage ?? movement.wages ?? 0;
    const displayInvoiceId = movement.branch_local_number || movement.invoice_id;
    const movementView = { ...movement, displayInvoiceId };
    const exportInvoiceText = escapeHtml(getMovementDocumentExportText(movementView));
    
    row.innerHTML = `
      <td data-export-text="${exportInvoiceText}">${getMovementDocumentCellHtml(movementView)}</td>
      <td>${movement.ref_no || '-'}</td>
      <td>${movement.customer_name}</td>
      <td>${movement.date}</td>
      <td>${operationType}</td>
      <td><strong>${movement.karat}</strong></td>
      <td>${formatNumber(movement.weight, 2)}</td>
      <td>${formatNumber(movement.ounce, 3)}</td>
      <td>${formatNumber(movement.price_per_gram, 2)}</td>
      <td>${formatNumber(laborValue, 2)}</td>
      <td>${formatNumber(movement.value, 2)}</td>
      <td class="memo-cell" title="${movement.memo || ''}">${movement.memo || '-'}</td>
    `;
    
    tbody.appendChild(row);
  });
  
  // Add click listeners to invoice links
  const invoiceLinks = document.querySelectorAll('.invoice-link');
  invoiceLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const invoiceId = link.getAttribute('data-invoice-id');
      const invoiceDisplayId = link.getAttribute('data-invoice-display-id') || invoiceId;
      const invoiceType = link.getAttribute('data-invoice-type');
      openInvoiceDetailsModal(invoiceId, invoiceType, invoiceDisplayId);
    });
  });
}

// ===== Export Functions =====

function exportToExcel() {
  try {
    const table = document.getElementById('dataTable');
    if (!table) {
      toastErrorKey('error.noTable');
      return;
    }

    // Get visible rows only (excluding empty row)
    const rows = Array.from(table.querySelectorAll('tbody tr:not(.empty-row):not([style*="display: none"])'));
    
    if (rows.length === 0) {
      toastErrorKey('error.noData');
      return;
    }

    // Get headers
    const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent.trim());
    
    // Build HTML rows for Excel
    const htmlRows = rows.map(row => {
      const cells = Array.from(row.querySelectorAll('td')).map(td => {
        const exportText = td.getAttribute('data-export-text');
        let text = exportText ? exportText.trim() : td.textContent.trim();
        // Remove operation badges HTML and keep only text
        const badge = td.querySelector('.operation-badge, .operation-badge-new');
        if (badge) {
          text = badge.textContent.trim();
        }
        // Clean up extra spaces
        text = text.replace(/\s+/g, ' ').trim();
        return `<td>${text}</td>`;
      }).join('');
      return `<tr>${cells}</tr>`;
    }).join('');
    
    // Create Excel HTML with proper formatting
    const xlsHtml = `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><style>table{border-collapse:collapse}th,td{border:1px solid #444;padding:6px;text-align:right;white-space:nowrap}thead th{background:#eaeaea}</style></head><body><table><thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${htmlRows}</tbody></table></body></html>`;
    
    const blob = new Blob(['\ufeff' + xlsHtml], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tSPM('file.movements')}_${new Date().toISOString().split('T')[0]}.xls`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
      a.remove();
    }, 0);
    
    toastInfoKey('toast.exportSuccess');
  } catch (error) {
    toastErrorKey('error.export');
  }
}

// Helper functions for PDF export
function normalizeFileUrl(p) {
  if (!p) return '';
  return p.startsWith('file://') ? p : 'file:///' + String(p).replace(/\\/g, '/');
}

function buildCompanyHeader(c) {
  const logoUrl = (c && c.logoData) ? c.logoData : (c && c.logo ? (normalizeFileUrl(c.logo) + '?v=' + Date.now()) : '');
  const nameAr = c?.name || 'اسم الشركة';
  const nameEn = c?.name_en || c?.name || 'Company Name';
  const addressAr = c?.address || '-';
  const addressEn = c?.address_en || c?.address || '-';
  const phone = c?.phone || '-';
  const email = c?.email || '-';
  const tax = c?.tax || '-';
  
  return `
    <div class="report-header" style="background:linear-gradient(135deg, #e8f5f3 0%, #d4edea 100%); color:#2c3e50; padding:20px 15px;">
      <div class="header-top" style="display:grid; grid-template-columns:1fr auto 1fr; align-items:center; margin-bottom:0; width:100%; direction:ltr; column-gap:20px;">
        <div class="company-info-left" style="text-align:left; direction:ltr;">
          <h1 style="font-size:18px; font-weight:700; color:#00897B; margin:0 0 8px 0;">${nameEn}</h1>
          <div style="display:flex; align-items:center; justify-content:flex-start; gap:8px; font-size:11px; color:#2c3e50; margin:4px 0;">📍 Address: ${addressEn}</div>
          <div style="display:flex; align-items:center; justify-content:flex-start; gap:8px; font-size:11px; color:#2c3e50; margin:4px 0;">📞 Phone: ${phone}</div>
          <div style="display:flex; align-items:center; justify-content:flex-start; gap:8px; font-size:11px; color:#2c3e50; margin:4px 0;">📧 Email: ${email}</div>
          <div style="display:flex; align-items:center; justify-content:flex-start; gap:8px; font-size:11px; color:#2c3e50; margin:4px 0;">🏷️ Tax No: ${tax}</div>
        </div>
        <div class="company-logo" style="width:130px; height:130px; background:white; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:52px; border:4px solid #00897B; overflow:hidden; box-shadow:0 4px 15px rgba(0,137,123,0.2); margin:0 auto;">
          ${logoUrl ? `<img src="${logoUrl}" alt="Logo" style="width:90%; height:90%; object-fit:contain;">` : '🏢'}
        </div>
        <div class="company-info" style="text-align:right; direction:rtl;">
          <h1 style="font-size:20px; font-weight:700; color:#00897B; margin:0 0 8px 0;">${nameAr}</h1>
          <div style="display:flex; align-items:center; justify-content:flex-start; gap:8px; font-size:11px; color:#2c3e50; margin:4px 0;">📍 العنوان: ${addressAr}</div>
          <div style="display:flex; align-items:center; justify-content:flex-start; gap:8px; font-size:11px; color:#2c3e50; margin:4px 0;">📞 رقم الهاتف: ${phone}</div>
          <div style="display:flex; align-items:center; justify-content:flex-start; gap:8px; font-size:11px; color:#2c3e50; margin:4px 0;">📧 البريد: ${email}</div>
          <div style="display:flex; align-items:center; justify-content:flex-start; gap:8px; font-size:11px; color:#2c3e50; margin:4px 0;">🏷️ الرقم الضريبي: ${tax}</div>
        </div>
      </div>
    </div>`;
}

async function exportToPDF() {
  try {
    toastInfoKey('toast.preparePdf');
    
    const table = document.getElementById('dataTable');
    if (!table) {
      toastErrorKey('error.noTable');
      return;
    }

    // Get visible rows only (excluding empty row)
    const rows = Array.from(table.querySelectorAll('tbody tr:not(.empty-row):not([style*="display: none"])'));
    
    if (rows.length === 0) {
      toastErrorKey('error.noData');
      return;
    }

    // Get headers
    const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent.trim());
    
    // SVG icons for operation type cells
    const svgSell = `<div style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:6px;background:linear-gradient(135deg,#ef4444,#b91c1c);box-shadow:0 2px 5px rgba(239,68,68,0.4);flex-shrink:0"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg></div>`;
    const svgBuy  = `<div style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:6px;background:linear-gradient(135deg,#3b82f6,#1d4ed8);box-shadow:0 2px 5px rgba(59,130,246,0.4);flex-shrink:0"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></svg></div>`;

    // Build HTML rows
    const htmlRows = rows.map(row => {
      const rowType = row.getAttribute('data-type') || '';
      const cells = Array.from(row.querySelectorAll('td')).map((td, idx) => {
        // Column index 4 = operation type
        if (idx === 4) {
          const isSell = rowType === 'SELL';
          const icon = isSell ? svgSell : svgBuy;
          const label = isSell ? 'SELL بيع' : 'BUY شراء';
          const color = isSell ? '#dc2626' : '#2563eb';
          return `<td style="white-space:nowrap;width:1%"><div style="display:flex;align-items:center;justify-content:center;gap:5px">${icon}<span style="font-weight:700;font-size:9px;color:${color}">${label}</span></div></td>`;
        }
        const exportText = td.getAttribute('data-export-text');
        let text = exportText ? exportText.trim() : td.textContent.trim();
        const badge = td.querySelector('.operation-badge, .operation-badge-new');
        if (badge) text = badge.textContent.trim();
        text = text.replace(/\s+/g, ' ').trim();
        return `<td>${text}</td>`;
      }).join('');
      return `<tr>${cells}</tr>`;
    }).join('');
    
    // Load company info
    let company = {};
    try {
      if (window.api && window.api.getCompanyInfo) {
        const r = await window.api.getCompanyInfo();
        if (r && r.success) company = r.company || {};
      }
    } catch(_) {}
    
    // Get statistics from current display
    const totalSalesValue = parseFloat(document.getElementById('totalSalesValue')?.textContent?.replace(/,/g, '') || 0);
    const totalSalesWeight = parseFloat(document.getElementById('totalSales')?.textContent?.replace(/,/g, '') || 0);
    const totalPurchasesValue = parseFloat(document.getElementById('totalPurchasesValue')?.textContent?.replace(/,/g, '') || 0);
    const totalPurchasesWeight = parseFloat(document.getElementById('totalPurchases')?.textContent?.replace(/,/g, '') || 0);
    const profitLoss = parseFloat(document.getElementById('profitLoss')?.textContent?.replace(/,/g, '') || 0);
    const profitPercentage = document.getElementById('profitPercentage')?.textContent || '0%';
    const weightDifference = parseFloat(document.getElementById('weightDifference')?.textContent?.replace(/,/g, '') || 0);
    const avgPricePerGram = parseFloat(document.getElementById('profitRate')?.textContent?.replace(/,/g, '') || 0);
    const globalOuncePosition = parseFloat(document.getElementById('profitPosition')?.textContent?.replace(/,/g, '') || 0);
    
    const nf = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const nf3 = new Intl.NumberFormat('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
    
    const headerHTML = buildCompanyHeader(company);
    const langAttr = getSPMLang();
    const dirAttr = isSPMRtl() ? 'rtl' : 'ltr';
    const docTitle = tSPM('title');
    const sellLabel = tSPM('operation.sellLabel');
    const buyLabel = tSPM('operation.buyLabel');
    const sellCode = tSPM('operation.sellCode');
    const buyCode = tSPM('operation.buyCode');
    const metalBadge = currentMetalFilter === 'gold' ? tSPM('filters.gold') : tSPM('filters.silver');
    const movementTitle = tSPM('title');
    const totalSalesLabel = tSPM('cards.totalSalesLabel');
    const totalPurchasesLabel = tSPM('cards.totalPurchasesLabel');
    const weightLabel = currentMetalFilter === 'gold' ? tSPM('cards.weightDifference24') : tSPM('cards.weightDifference999');
    const rateLabel = tSPM('cards.rateLabel');
    const positionLabel = tSPM('cards.globalPosition');
    const weightDifferenceLabel = tSPM('cards.weightDifference');
    const profitLabel = profitLoss >= 0 ? tSPM('cards.profitNet') : tSPM('cards.profitNet');
    const gramSuffix = tSPM('units.gramSuffix').trim();
    const invoiceTypeLabel = tSPM('filters.invoiceTypeLabel');
    const invoiceTypeValue = currentInvoiceTypeFilter === 'taskir'
      ? tSPM('filters.taskir')
      : currentInvoiceTypeFilter === 'mashghul'
        ? tSPM('filters.mashghul')
        : tSPM('filters.all');

    const branchScopeLabel = (getSPMLang() === 'en') ? 'Branch Scope' : 'نطاق الفروع';
    const branchScopeAllOption = (getSPMLang() === 'en') ? 'All Branches' : 'كل الفروع';
    let branchScopeValue = '';
    try {
      const rawScope = localStorage.getItem('branchScope');
      const parsedScope = rawScope ? JSON.parse(rawScope) : null;
      const scopeMode = String(parsedScope?.mode || parsedScope?.scope || '').trim().toLowerCase() === 'all' ? 'all' : 'branch';
      if (scopeMode === 'all') {
        branchScopeValue = branchScopeAllOption;
      } else {
        const rawBranch = localStorage.getItem('currentBranch');
        const branch = rawBranch ? JSON.parse(rawBranch) : null;
        const branchCode = String(branch?.code || '').trim();
        const branchName = String((getSPMLang() === 'en' ? branch?.name_en || branch?.name : branch?.name || branch?.name_en) || '').trim();
        if (branchCode && branchName) branchScopeValue = `${branchCode} - ${branchName}`;
        else branchScopeValue = branchName || branchCode || '';
      }
    } catch (_) {
      branchScopeValue = '';
    }
    const branchScopeChipHtml = branchScopeValue
      ? `<span class="filter-chip" style="padding: 6px 14px; border-radius: 20px; background: white; border: 2px solid #0ea5e9; font-size: 10px; font-weight: 600;">
          <span style="color: #475569;">${branchScopeLabel}</span>
          <span style="color: #0f172a; margin-${isSPMRtl() ? 'right' : 'left'}: 6px;">${branchScopeValue}</span>
        </span>`
      : '';
    const docHtml = `<!doctype html><html lang="${langAttr}" dir="${dirAttr}" data-branch-scope-preview="1"><head><meta charset="utf-8"><title>${docTitle}</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
      @page { margin: 8mm; }
      * { margin: 0; padding: 0; box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      body { font-family: 'Cairo', sans-serif; background: #f5f5f5; color: #1e293b; font-size: 10px; padding: 10px; }
      main { 
        padding: 0; 
        margin: 0 auto; 
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        overflow: hidden;
        border: 2px solid #00897B;
      }
      
      /* Report Header - Professional Style */
      .report-header { background: linear-gradient(135deg, #e8f5f3 0%, #d4edea 100%); border-bottom: 2px solid #00897B; }
      
      /* ===== Summary Cards Section ===== */
      .summary-section {
        background: linear-gradient(135deg, #f0fdf9 0%, #ecfdf5 100%);
        border-bottom: 2px solid #00897B;
        padding: 14px 16px;
      }
      .summary-cards-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        margin-bottom: 10px;
      }
      .summary-card {
        background: white;
        border-radius: 10px;
        padding: 12px 14px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.07);
        border: 1px solid #e2e8f0;
        display: flex;
        flex-direction: column;
        gap: 6px;
        position: relative;
        overflow: hidden;
      }
      .summary-card::before {
        content: '';
        position: absolute;
        top: 0; left: 0;
        width: 100%;
        height: 4px;
        border-radius: 10px 10px 0 0;
      }
      .summary-card.sell-card::before { background: linear-gradient(90deg, #ef4444, #dc2626); }
      .summary-card.buy-card::before  { background: linear-gradient(90deg, #3b82f6, #2563eb); }
      .summary-card.net-card::before  { background: linear-gradient(90deg, #f59e0b, #d97706); }
      .summary-card.rate-card::before { background: linear-gradient(90deg, #8b5cf6, #7c3aed); }

      .card-icon-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .card-icon {
        width: 36px; height: 36px;
        border-radius: 9px;
        display: flex; align-items: center; justify-content: center;
        flex-shrink: 0;
        box-shadow: 0 3px 8px rgba(0,0,0,0.18);
      }
      .card-icon svg { width: 20px; height: 20px; }
      .sell-card .card-icon { background: linear-gradient(135deg, #ef4444, #b91c1c); }
      .buy-card  .card-icon { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }
      .net-card  .card-icon { background: linear-gradient(135deg, #f59e0b, #b45309); }
      .rate-card .card-icon { background: linear-gradient(135deg, #8b5cf6, #6d28d9); }

      .card-badge {
        font-size: 8px;
        font-weight: 700;
        padding: 2px 7px;
        border-radius: 20px;
        letter-spacing: 0.5px;
      }
      .sell-card .card-badge { background: #fee2e2; color: #dc2626; border: 1px solid #fca5a5; }
      .buy-card  .card-badge { background: #dbeafe; color: #2563eb; border: 1px solid #93c5fd; }
      .net-card  .card-badge { background: #fef3c7; color: #d97706; border: 1px solid #fcd34d; }
      .rate-card .card-badge { background: #ede9fe; color: #7c3aed; border: 1px solid #c4b5fd; }

      .card-title {
        font-size: 9px;
        font-weight: 600;
        color: #64748b;
        margin: 0;
      }
      .card-main-value {
        font-size: 15px;
        font-weight: 800;
        line-height: 1.1;
      }
      .sell-card .card-main-value { color: #dc2626; }
      .buy-card  .card-main-value { color: #2563eb; }
      .net-card  .card-main-value { color: #d97706; }
      .rate-card .card-main-value { color: #7c3aed; }

      .card-sub-value {
        font-size: 11px;
        color: #64748b;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .card-divider {
        height: 1px;
        background: linear-gradient(90deg, transparent, #e2e8f0 20%, #cbd5e1 50%, #e2e8f0 80%, transparent);
        margin: 3px 0;
      }
      .sell-card .card-divider { background: linear-gradient(90deg, transparent, #fca5a5 20%, #ef4444 50%, #fca5a5 80%, transparent); }
      .buy-card  .card-divider { background: linear-gradient(90deg, transparent, #93c5fd 20%, #3b82f6 50%, #93c5fd 80%, transparent); }
      .net-card  .card-divider { background: linear-gradient(90deg, transparent, #fcd34d 20%, #f59e0b 50%, #fcd34d 80%, transparent); }
      .rate-card .card-divider { background: linear-gradient(90deg, transparent, #c4b5fd 20%, #8b5cf6 50%, #c4b5fd 80%, transparent); }
        height: 1px;
        background: #f1f5f9;
        margin: 2px 0;
      }

      /* Bottom row: weight difference + position */
      .summary-bottom-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
      }
      .summary-info-card {
        background: white;
        border-radius: 8px;
        padding: 10px 14px;
        border: 1px solid #e2e8f0;
        box-shadow: 0 1px 4px rgba(0,0,0,0.05);
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .info-card-icon {
        width: 28px; height: 28px;
        border-radius: 7px;
        display: flex; align-items: center; justify-content: center;
        font-size: 14px;
        flex-shrink: 0;
      }
      .weight-info .info-card-icon { background: #f0fdf4; }
      .position-info .info-card-icon { background: #eff6ff; }
      .info-card-content { flex: 1; }
      .info-card-label { font-size: 8px; color: #64748b; font-weight: 600; }
      .info-card-value { font-size: 13px; font-weight: 800; color: #1e293b; }
      
      /* Title */
      .page-title { text-align: center; font-size: 14px; font-weight: 700; color: #00897B; margin: 0; padding: 10px; background: #e8f5f3; border-bottom: 2px solid #00897B; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
      .page-title > span:nth-child(2) { flex: 1; text-align: center; }
      .metal-badge { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 700; }
      .metal-badge.gold { background: linear-gradient(135deg, #fef3c7, #fde68a); border: 2px solid #f59e0b; color: #92400e; }
      .metal-badge.silver { background: linear-gradient(135deg, #e5e7eb, #d1d5db); border: 2px solid #6b7280; color: #374151; }
      
      /* Table */
      .data-table { width: 100%; border-collapse: collapse; background: white; font-size: 8px; border: 2px solid #94a3b8; }
      .data-table th { background: linear-gradient(to bottom, #e8f4f8, #d0e8f0); color: #2c3e50; padding: 6px 4px; font-size: 8px; font-weight: 800; text-align: center; border: 1px solid #94a3b8; }
      .data-table td { padding: 5px 4px; text-align: center; border: 1px solid #94a3b8; font-size: 8px; font-weight: 700; }
      .data-table tbody tr:nth-child(even) { background: #f8fafc; }
      
      /* Print Button */
      .print-button { position: fixed; bottom: 20px; left: 20px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; border: none; padding: 10px 20px; border-radius: 50px; font-size: 12px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 15px rgba(16,185,129,0.4); display: flex; align-items: center; gap: 6px; font-family: inherit; }
      .print-button:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(16,185,129,0.5); }
      
      @media print { 
        .no-print { display: none !important; } 
        body { background: white !important; margin: 0; padding: 0; }
        main { box-shadow: none; }
        th, .summary-card, .report-header { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; }
        .data-table { page-break-inside: auto; }
        tr { page-break-inside: avoid; page-break-after: auto; }
        thead { display: table-header-group; }
      }
    </style></head><body><main>
      ${headerHTML}
      
      <!-- Summary Cards Section -->
      <div class="summary-section">
        <div class="summary-cards-grid">

          <!-- Card 1: إجمالي المبيعات -->
          <div class="summary-card sell-card">
            <div class="card-icon-row">
              <div class="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                  <polyline points="16 7 22 7 22 13"/>
                </svg>
              </div>
              <span class="card-badge">SELL بيع</span>
            </div>
            <div class="card-title">${totalSalesLabel}</div>
            <div class="card-divider"></div>
            <div class="card-main-value">${nf.format(totalSalesValue)}</div>
            <div class="card-sub-value">⚖ ${nf3.format(totalSalesWeight)}${gramSuffix} | ${currentMetalFilter === 'gold' ? 'عيار 24' : 'عيار 999'}</div>
          </div>

          <!-- Card 2: إجمالي المشتريات -->
          <div class="summary-card buy-card">
            <div class="card-icon-row">
              <div class="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/>
                  <polyline points="16 17 22 17 22 11"/>
                </svg>
              </div>
              <span class="card-badge">BUY شراء</span>
            </div>
            <div class="card-title">${totalPurchasesLabel}</div>
            <div class="card-divider"></div>
            <div class="card-main-value">${nf.format(totalPurchasesValue)}</div>
            <div class="card-sub-value">⚖ ${nf3.format(totalPurchasesWeight)}${gramSuffix} | ${currentMetalFilter === 'gold' ? 'عيار 24' : 'عيار 999'}</div>
          </div>

          <!-- Card 3: الصافي -->
          <div class="summary-card net-card">
            <div class="card-icon-row">
              <div class="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <span class="card-badge">${profitPercentage}</span>
            </div>
            <div class="card-title">${profitLabel}</div>
            <div class="card-divider"></div>
            <div class="card-main-value" style="color:${profitLoss >= 0 ? '#059669' : '#dc2626'}">${nf.format(Math.abs(profitLoss))}</div>
            <div class="card-sub-value">${weightLabel}: ${nf3.format(weightDifference)}${gramSuffix}</div>
          </div>

          <!-- Card 4: المعدل -->
          <div class="summary-card rate-card">
            <div class="card-icon-row">
              <div class="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                  <line x1="7" y1="8" x2="7" y2="12"/>
                  <line x1="12" y1="6" x2="12" y2="12"/>
                  <line x1="17" y1="10" x2="17" y2="12"/>
                </svg>
              </div>
              <span class="card-badge">ر.ي/جم</span>
            </div>
            <div class="card-title">${rateLabel}</div>
            <div class="card-divider"></div>
            <div class="card-main-value">${nf.format(avgPricePerGram)}</div>
            <div class="card-sub-value">${positionLabel}: ${nf.format(globalOuncePosition)}</div>
          </div>

        </div>
      </div>
      
      <div class="page-title">
        <span class="metal-badge ${currentMetalFilter === 'gold' ? 'gold' : 'silver'}">
          ${metalBadge}
        </span>
        <span style="flex: 1; text-align: center;">📋 ${movementTitle}</span>
        <span style="display:flex; align-items:center; gap:8px;">
          <span class="filter-chip" style="padding: 6px 14px; border-radius: 20px; background: white; border: 2px solid #00897B; font-size: 10px; font-weight: 600;">
            <span style="color: #475569;">${invoiceTypeLabel}</span>
            <span style="color: #0f172a; margin-${isSPMRtl() ? 'right' : 'left'}: 6px;">${invoiceTypeValue}</span>
          </span>
          ${branchScopeChipHtml}
        </span>
      </div>
      
      <table class="data-table">
        <thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
        <tbody>${htmlRows}</tbody>
      </table>
    </main>
    <button class="print-button no-print" onclick="window.print()">🖨️ ${tSPM('actions.print') || 'Print'}</button>
    </body></html>`;
    
    if (window.openPreview) {
      window.openPreview(docHtml);
    } else {
      const w = window.open('', '_blank');
      if (!w) return;
      w.document.open();
      w.document.write(docHtml);
      w.document.close();
      w.focus();
    }
  } catch (error) {
    toastErrorKey('error.pdf');
  }
}

// ===== Confirmation Modal Functions =====
let confirmModalCallback = null;

function showConfirmModal(title, message) {
  return new Promise((resolve) => {
    const modal = document.getElementById('confirmModal');
    const titleEl = document.getElementById('confirmModalTitle');
    const messageEl = document.getElementById('confirmModalMessage');
    
    if (!modal || !titleEl || !messageEl) {
      
      resolve(false);
      return;
    }
    
    // Set title and message
    titleEl.innerHTML = `<i class="fa-solid fa-exclamation-triangle"></i> ${title}`;
    messageEl.textContent = message;
    
    // Store callback
    confirmModalCallback = resolve;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
}

function closeConfirmModal(result = false) {
  const modal = document.getElementById('confirmModal');
  if (!modal) return;
  
  modal.classList.remove('active');
  document.body.style.overflow = '';
  
  // Call callback with result
  if (confirmModalCallback) {
    confirmModalCallback(result);
    confirmModalCallback = null;
  }
}

// ===== F9 Customer Lookup =====
const lcModal = document.getElementById('lookupCustomerModal');
const lcClose = document.getElementById('lookupCustomerClose');
const lcCancel = document.getElementById('lookupCustomerCancel');
const lcSearch = document.getElementById('lc_search');
const lcTbody = document.getElementById('lc_tbody');

async function fetchSpmCustomers(options = {}) {
  try {
    const result = window.api?.getCustomers ? await window.api.getCustomers(options) : (window.db?.getCustomers ? await window.db.getCustomers(options) : null);
    if (result && result.success && Array.isArray(result.data)) return result.data;
    if (result && Array.isArray(result.customers)) return result.customers;
    if (Array.isArray(result)) return result;
  } catch (_) {}
  return [];
}

async function fetchSpmSuppliers(options = {}) {
  try {
    const result = window.api?.getSuppliers ? await window.api.getSuppliers(options) : (window.suppliers?.getSuppliers ? await window.suppliers.getSuppliers(options) : null);
    if (result && result.success && Array.isArray(result.data)) return result.data;
    if (result && Array.isArray(result.suppliers)) return result.suppliers;
    if (Array.isArray(result)) return result;
  } catch (_) {}
  return [];
}

// Load customers data
async function loadCustomersForLookup() {
  try {
    return await fetchSpmCustomers();
  } catch (error) {
    
    return [];
  }
}

// Display customers in lookup table
function displayCustomersLookup(customers, searchTerm = '') {
  if (!lcTbody) return;
  
  lcTbody.innerHTML = '';
  
  // Validate customers is array
  if (!Array.isArray(customers)) {
    
    lcTbody.innerHTML = '<tr><td colspan="2" style="text-align:center; padding:20px; color: red;">خطأ في تحميل البيانات</td></tr>';
    return;
  }
  
  const filtered = searchTerm ? 
    customers.filter(c => 
      c.id.toString().includes(searchTerm) || 
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) : customers;
  
  if (filtered.length === 0) {
    lcTbody.innerHTML = '<tr><td colspan="2" style="text-align:center; padding:20px;">لا توجد نتائج</td></tr>';
    return;
  }
  
  filtered.forEach(customer => {
    const tr = document.createElement('tr');
    tr.style.cursor = 'pointer';
    tr.innerHTML = `
      <td>${customer.id}</td>
      <td>${customer.name}</td>
    `;
    tr.addEventListener('click', () => {
      document.getElementById('customer_id').value = customer.id;
      document.getElementById('customer_name').value = customer.name;
      // Clear supplier field
      document.getElementById('supplier_id').value = '';
      lcModal.removeAttribute('aria-hidden');
      lcModal.style.display = 'none';
      document.getElementById('customer_id').focus();
    });
    lcTbody.appendChild(tr);
  });
}

// Open customer lookup modal
async function openCustomerLookup() {
  const customers = await loadCustomersForLookup();
  displayCustomersLookup(customers);
  lcModal.style.display = 'flex';
  lcModal.setAttribute('aria-hidden', 'false');
  if (lcSearch) {
    lcSearch.value = '';
    lcSearch.focus();
  }
}

// Close customer lookup
function closeCustomerLookup() {
  lcModal.removeAttribute('aria-hidden');
  lcModal.style.display = 'none';
}

if (lcClose) lcClose.addEventListener('click', closeCustomerLookup);
if (lcCancel) lcCancel.addEventListener('click', closeCustomerLookup);

// Search customers
if (lcSearch) {
  lcSearch.addEventListener('input', async (e) => {
    const customers = await loadCustomersForLookup();
    displayCustomersLookup(customers, e.target.value);
  });
  
  // Enter key to select first result
  lcSearch.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const firstRow = lcTbody.querySelector('tr');
      if (firstRow && !firstRow.textContent.includes('لا توجد نتائج')) {
        firstRow.click();
      }
    }
  });
}

// F9 key for customer_id field
const customerIdInput = document.getElementById('customer_id');
if (customerIdInput) {
  customerIdInput.addEventListener('keydown', (e) => {
    if (e.key === 'F9') {
      e.preventDefault();
      openCustomerLookup();
    }
  });
}

// ===== F9 Supplier Lookup =====
const lsModal = document.getElementById('lookupSupplierModal');
const lsClose = document.getElementById('lookupSupplierClose');
const lsCancel = document.getElementById('lookupSupplierCancel');
const lsSearch = document.getElementById('ls_search');
const lsTbody = document.getElementById('ls_tbody');

// Load suppliers data
async function loadSuppliersForLookup() {
  try {
    return await fetchSpmSuppliers();
  } catch (error) {
    
    return [];
  }
}

// Display suppliers in lookup table
function displaySuppliersLookup(suppliers, searchTerm = '') {
  if (!lsTbody) return;
  
  lsTbody.innerHTML = '';
  
  // Validate suppliers is array
  if (!Array.isArray(suppliers)) {
    
    lsTbody.innerHTML = '<tr><td colspan="2" style="text-align:center; padding:20px; color: red;">خطأ في تحميل البيانات</td></tr>';
    return;
  }
  
  const filtered = searchTerm ? 
    suppliers.filter(s => 
      s.id.toString().includes(searchTerm) || 
      s.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) : suppliers;
  
  if (filtered.length === 0) {
    lsTbody.innerHTML = '<tr><td colspan="2" style="text-align:center; padding:20px;">لا توجد نتائج</td></tr>';
    return;
  }
  
  filtered.forEach(supplier => {
    const tr = document.createElement('tr');
    tr.style.cursor = 'pointer';
    tr.innerHTML = `
      <td>${supplier.id}</td>
      <td>${supplier.name}</td>
    `;
    tr.addEventListener('click', () => {
      document.getElementById('supplier_id').value = supplier.id;
      document.getElementById('customer_name').value = supplier.name;
      // Clear customer field
      document.getElementById('customer_id').value = '';
      lsModal.removeAttribute('aria-hidden');
      lsModal.style.display = 'none';
      document.getElementById('supplier_id').focus();
    });
    lsTbody.appendChild(tr);
  });
}

// Open supplier lookup modal
async function openSupplierLookup() {
  const suppliers = await loadSuppliersForLookup();
  displaySuppliersLookup(suppliers);
  lsModal.style.display = 'flex';
  lsModal.setAttribute('aria-hidden', 'false');
  if (lsSearch) {
    lsSearch.value = '';
    lsSearch.focus();
  }
}

// Close supplier lookup
function closeSupplierLookup() {
  lsModal.removeAttribute('aria-hidden');
  lsModal.style.display = 'none';
}

if (lsClose) lsClose.addEventListener('click', closeSupplierLookup);
if (lsCancel) lsCancel.addEventListener('click', closeSupplierLookup);

// Search suppliers
if (lsSearch) {
  lsSearch.addEventListener('input', async (e) => {
    const suppliers = await loadSuppliersForLookup();
    displaySuppliersLookup(suppliers, e.target.value);
  });
  
  // Enter key to select first result
  lsSearch.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const firstRow = lsTbody.querySelector('tr');
      if (firstRow && !firstRow.textContent.includes('لا توجد نتائج')) {
        firstRow.click();
      }
    }
  });
}

// F9 key for supplier_id field
const supplierIdInput = document.getElementById('supplier_id');
if (supplierIdInput) {
  supplierIdInput.addEventListener('keydown', (e) => {
    if (e.key === 'F9') {
      e.preventDefault();
      openSupplierLookup();
    }
  });
}

// ===== Auto-fetch Customer/Supplier Name and Mutual Exclusion =====

// Auto-fetch customer name when customer_id changes
if (customerIdInput) {
  customerIdInput.addEventListener('change', async function() {
    const customerId = this.value.trim();
    
    if (!customerId) {
      document.getElementById('customer_name').value = '';
      return;
    }
    
    try {
      const customers = await fetchSpmCustomers();
      
      const customer = customers.find(c => c.id.toString() === customerId);
      
      if (customer) {
        document.getElementById('customer_name').value = customer.name;
        // Clear supplier fields
        document.getElementById('supplier_id').value = '';
      } else {
        document.getElementById('customer_name').value = '';
        toastErrorKey('error.customerNotFound');
        this.value = '';
      }
    } catch (error) {
      toastErrorKey('error.customerFetchFail');
    }
  });
}

// Auto-fetch supplier name when supplier_id changes
if (supplierIdInput) {
  supplierIdInput.addEventListener('change', async function() {
    const supplierId = this.value.trim();
    
    if (!supplierId) {
      document.getElementById('customer_name').value = '';
      return;
    }
    
    try {
      const suppliers = await fetchSpmSuppliers();
      
      const supplier = suppliers.find(s => s.id.toString() === supplierId);
      
      if (supplier) {
        document.getElementById('customer_name').value = supplier.name;
        // Clear customer fields
        document.getElementById('customer_id').value = '';
      } else {
        document.getElementById('customer_name').value = '';
        toastErrorKey('error.supplierNotFound');
        this.value = '';
      }
    } catch (error) {
      toastErrorKey('error.supplierFetchFail');
    }
  });
}

// ===== Invoice Details Modal Functions =====

async function openInvoiceDetailsModal(invoiceId, invoiceType, invoiceDisplayId = null) {
  try {
    // Check if API exists
    if (!window.api || !window.api.invoke) {
      toastErrorKey('error.apiUnavailable');
      return;
    }
    
    // Open the appropriate invoice screen in new window
    const result = await window.api.invoke('open-invoice-window', {
      invoiceId: invoiceId,
      displayInvoiceId: invoiceDisplayId,
      type: invoiceType
    });
    
    if (result.success) {
      const typeName = invoiceType === 'SELL' ? tSPM('operation.sellLabel') : tSPM('operation.buyLabel');
      toastSuccessKey('toast.openInvoice', { type: typeName, id: invoiceDisplayId || invoiceId });
    } else {
      throw new Error(result.error || 'فشل فتح النافذة');
    }
  } catch (error) {
    toastErrorKey('error.openInvoiceFail');
  }
}

function displayInvoiceDetails(details) {
  const tbody = document.getElementById('invoiceDetailsTableBody');
  if (!tbody) return;
  
  tbody.innerHTML = '';
  
  if (!details || details.length === 0) {
    tbody.innerHTML = `
      <tr class="empty-row">
        <td colspan="7" style="text-align: center; padding: 40px;">
          <i class="fa-solid fa-inbox" style="font-size: 36px; opacity: 0.3;"></i>
          <br>لا توجد تفاصيل
        </td>
      </tr>
    `;
    return;
  }
  
  let totalWeight = 0;
  let totalOunce = 0;
  let totalValue = 0;
  
  details.forEach((detail, index) => {
    const row = document.createElement('tr');
    
    const weight = parseFloat(detail.weight) || 0;
    const ounce = parseFloat(detail.ounce) || 0;
    const value = parseFloat(detail.value) || 0;
    const labor = parseFloat(detail.labor ?? detail.labor_cost ?? detail.labor_per_gram ?? detail.wage ?? detail.wages) || 0;
    
    totalWeight += weight;
    totalOunce += ounce;
    totalValue += value;
    
    row.innerHTML = `
      <td>${index + 1}</td>
      <td><strong>${detail.karat || '-'}</strong></td>
      <td>${formatNumber(weight, 2)}</td>
      <td>${formatNumber(ounce, 3)}</td>
      <td>${formatNumber(parseFloat(detail.price_per_gram) || 0, 2)}</td>
      <td>${formatNumber(labor, 2)}</td>
      <td>${formatNumber(value, 2)}</td>
    `;
    
    tbody.appendChild(row);
  });
  
  // Update summary
  document.getElementById('modal_total_weight').textContent = formatNumber(totalWeight, 2) + ' جم';
  document.getElementById('modal_total_ounce').textContent = formatNumber(totalOunce, 3);
  document.getElementById('modal_total_value').textContent = formatNumber(totalValue, 2);
}

function closeInvoiceDetailsModal() {
  const modal = document.getElementById('invoiceDetailsModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

// Close modal on outside click
document.addEventListener('click', (e) => {
  const modal = document.getElementById('invoiceDetailsModal');
  if (e.target === modal) {
    closeInvoiceDetailsModal();
  }
});

// ===== Tab-Level Permissions =====
function applyTabPermissions() {
  if (!window.ScreenPermissions) return;
  
  // Check and hide Orders tab if no permission
  
  // Hide Add Order button if no permission
  
  // Check export buttons permissions
  const btnExportExcel = document.getElementById('btnExportExcel');
  if (btnExportExcel && !window.ScreenPermissions.has('sales_purchase_movement_export')) {
    btnExportExcel.style.display = 'none';
  }
  
  const btnExportPDF = document.getElementById('btnExportPDF');
  if (btnExportPDF && !window.ScreenPermissions.has('sales_purchase_movement_export')) {
    btnExportPDF.style.display = 'none';
  }
}

// ===== Excel Import Functionality =====
let importedData = [];
let customersCache = [];
let suppliersCache = [];

// Open import modal
function openImportModal() {
  const modal = document.getElementById('importExcelModal');
  if (modal) {
    modal.style.display = 'flex';
    resetImport();
    loadCustomersAndSuppliers();
  }
}

// Close import modal
function closeImportModal() {
  const modal = document.getElementById('importExcelModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

// Reset import to step 1
function resetImport() {
  importedData = [];
  document.getElementById('importStep1').style.display = 'block';
  document.getElementById('importStep2').style.display = 'none';
  document.getElementById('importStep3').style.display = 'none';
  document.getElementById('importStep4').style.display = 'none';
  document.getElementById('btnStartImport').style.display = 'none';
  document.getElementById('importModalFooter').style.display = 'flex';
  document.getElementById('importFileInput').value = '';
}

// Load customers and suppliers for validation
async function loadCustomersAndSuppliers() {
  try {
    customersCache = await fetchSpmCustomers();
    suppliersCache = await fetchSpmSuppliers();
  } catch (e) {
    customersCache = [];
    suppliersCache = [];
  }
}

// Download Excel template
function downloadTemplate() {
  const invoiceType = document.querySelector('input[name="importInvoiceType"]:checked')?.value || 'SELL';
  const entityLabel = invoiceType === 'SELL' ? tSPM('lookup.customer.title') : tSPM('lookup.supplier.title');
  
  const headers = [
    `${tSPM('lookup.customer.id')} / ${tSPM('lookup.supplier.id')}`,
    `${tSPM('lookup.customer.name')} / ${tSPM('lookup.supplier.name')}`,
    tSPM('import.preview.date'),
    tSPM('import.preview.karat'),
    tSPM('import.preview.weight'),
    tSPM('table.pricePerGram'),
    tSPM('table.value'),
    tSPM('orderModal.notesLabel')
  ];
  
  // Sample data
  const sampleData = [
    ['1', 'اسم تجريبي', new Date().toISOString().split('T')[0], '21', '10.5', '250', '2625', 'ملاحظة تجريبية'],
    ['2', 'اسم تجريبي 2', new Date().toISOString().split('T')[0], '24', '5', '280', '1400', '']
  ];
  
  // Build HTML table for Excel
  const htmlContent = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<style>
table { border-collapse: collapse; direction: rtl; }
th, td { border: 1px solid #333; padding: 8px; text-align: right; }
th { background: #f0f0f0; font-weight: bold; }
.note { background: #ffffcc; font-size: 12px; }
</style>
</head>
<body>
<h2>${tSPM('import.title')}</h2>
<table>
<thead>
<tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>
</thead>
<tbody>
${sampleData.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}
</tbody>
</table>
<p class="note">
<strong>${tSPM('orderModal.notesLabel')}</strong>
</p>
</body>
</html>`;

  const blob = new Blob(['\ufeff' + htmlContent], { type: 'application/vnd.ms-excel;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${invoiceType === 'SELL' ? tSPM('file.importTemplateSell') : tSPM('file.importTemplateBuy')}.xls`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    URL.revokeObjectURL(url);
    a.remove();
  }, 0);
  
  toastSuccessKey('toast.templateDownloaded');
}

// Parse Excel/CSV file
async function parseExcelFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = function(e) {
      try {
        const content = e.target.result;
        let rows = [];
        
        if (file.name.toLowerCase().endsWith('.csv')) {
          // Parse CSV
          const lines = content.split(/\r\n|\n/);
          rows = lines.map(line => {
            // Handle CSV with commas in quotes
            const cells = [];
            let current = '';
            let inQuotes = false;
            for (let i = 0; i < line.length; i++) {
              const char = line[i];
              if (char === '"') {
                inQuotes = !inQuotes;
              } else if ((char === ',' || char === ';' || char === '\t') && !inQuotes) {
                cells.push(current.trim());
                current = '';
              } else {
                current += char;
              }
            }
            cells.push(current.trim());
            return cells;
          }).filter(row => row.some(cell => cell.trim()));
        } else {
          // Parse HTML table from XLS/XLSX
          const parser = new DOMParser();
          const doc = parser.parseFromString(content, 'text/html');
          
          // Try to find tables
          let tableRows = doc.querySelectorAll('tr');
          
          // If no tables found, try parsing as XML (for some xlsx exports)
          if (tableRows.length === 0) {
            const xmlDoc = parser.parseFromString(content, 'text/xml');
            tableRows = xmlDoc.querySelectorAll('Row, tr');
          }
          
          tableRows.forEach(tr => {
            const cells = Array.from(tr.querySelectorAll('th, td, Cell, Data, ss\\:Data')).map(cell => {
              // Get text content, handling nested elements
              let text = cell.textContent || cell.innerText || '';
              return text.trim();
            });
            if (cells.some(c => c)) {
              rows.push(cells);
            }
          });
          
          // If still no rows, try line-by-line parsing as fallback
          if (rows.length === 0) {
            const lines = content.split(/\r\n|\n/).filter(l => l.trim());
            // Try tab-separated or semicolon-separated
            rows = lines.map(line => {
              // Try different delimiters
              if (line.includes('\t')) {
                return line.split('\t').map(c => c.trim());
              } else if (line.includes(';')) {
                return line.split(';').map(c => c.trim());
              } else if (line.includes(',')) {
                return line.split(',').map(c => c.trim());
              }
              return [line.trim()];
            }).filter(row => row.some(cell => cell));
          }
        }
        
        resolve(rows);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = (error) => {
      reject(error);
    };
    
    // Read as text with different encodings
    reader.readAsText(file, 'UTF-8');
  });
}

// Process and validate imported data
function processImportData(rows) {
  const invoiceType = document.querySelector('input[name="importInvoiceType"]:checked')?.value || 'SELL';
  // Ensure cache is always an array
  const cache = Array.isArray(invoiceType === 'SELL' ? customersCache : suppliersCache) 
    ? (invoiceType === 'SELL' ? customersCache : suppliersCache) 
    : [];
  
  // Detect column mapping from headers
  let columnMap = {
    entityId: 0,
    entityName: 1,
    date: 2,
    karat: 3,
    weight: 4,
    ounce: 5,
    pricePerGram: 6,
    value: 7,
    memo: 8
  };
  
  // Check if first row is headers and detect format
  let dataRows = rows;
  let isExportFormat = false; // Format from export (has invoice number, type, etc.)
  
  if (rows.length > 0) {
    const headerRow = rows[0].map(h => String(h || '').toLowerCase().trim());
    
    // Detect if it's the export format (رقم الفاتورة, نوع العملية, etc.)
    if (headerRow.some(h => h.includes('فاتورة') || h.includes('invoice'))) {
      isExportFormat = true;
      // Export format columns: رقم الفاتورة | رقم مرجعي | اسم العميل/المورد | التاريخ | نوع العملية | العيار | الوزن | الأونصة | سعر الجرام | القيمة | البيان
      columnMap = {
        invoiceId: 0,
        refNo: 1,
        entityName: 2,
        date: 3,
        type: 4,
        karat: 5,
        weight: 6,
        ounce: 7,
        pricePerGram: 8,
        value: 9,
        memo: 10
      };
      dataRows = rows.slice(1);
    } else if (headerRow.some(h => h.includes('رقم') || h.includes('عميل') || h.includes('مورد') || h.includes('id'))) {
      // Template format - skip header
      dataRows = rows.slice(1);
    }
  }
  
  importedData = dataRows.map((row, index) => {
    let entityId, entityName, date, karat, weight, ounce, pricePerGram, value, memo;
    let entityType = null; // 'customer' or 'supplier'
    
    if (isExportFormat) {
      // Parse export format
      entityName = row[columnMap.entityName]?.trim() || '';
      date = row[columnMap.date]?.trim() || new Date().toISOString().split('T')[0];
      karat = row[columnMap.karat]?.trim() || '21';
      weight = parseFloat(String(row[columnMap.weight] || '').replace(/,/g, '')) || 0;
      ounce = parseFloat(String(row[columnMap.ounce] || '').replace(/,/g, '')) || 0;
      pricePerGram = parseFloat(String(row[columnMap.pricePerGram] || '').replace(/,/g, '')) || 0;
      value = parseFloat(String(row[columnMap.value] || '').replace(/,/g, '')) || (weight * pricePerGram);
      memo = row[columnMap.memo]?.trim() || '';
      
      // Try to find entity by name
      const foundEntity = cache.find(e => e.name && e.name.includes(entityName.replace(/[()]/g, '').trim()));
      entityId = foundEntity?.id || 0;
    } else {
      // Parse template format
      entityId = parseInt(row[columnMap.entityId]) || 0;
      entityName = row[columnMap.entityName]?.trim() || '';
      date = row[columnMap.date]?.trim() || new Date().toISOString().split('T')[0];
      karat = row[columnMap.karat]?.trim() || '21';
      weight = parseFloat(String(row[columnMap.weight] || '').replace(/,/g, '')) || 0;
      ounce = parseFloat(String(row[columnMap.ounce] || '').replace(/,/g, '')) || 0;
      pricePerGram = parseFloat(String(row[columnMap.pricePerGram] || '').replace(/,/g, '')) || 0;
      value = parseFloat(String(row[columnMap.value] || '').replace(/,/g, '')) || (weight * pricePerGram);
      memo = row[columnMap.memo]?.trim() || '';
    }
    
    // Search in both customers AND suppliers to find the entity
    let foundInCustomers = null;
    let foundInSuppliers = null;
    
    if (entityId <= 0 && entityName) {
      const cleanName = entityName.replace(/[()]/g, '').trim().toLowerCase();
      
      // Search in customers
      if (customersCache.length > 0) {
        foundInCustomers = customersCache.find(e => {
          if (!e || !e.name) return false;
          const eName = e.name.toLowerCase().trim();
          return eName === cleanName || eName === entityName.toLowerCase() ||
                 eName.includes(cleanName) || cleanName.includes(eName);
        });
      }
      
      // Search in suppliers
      if (suppliersCache.length > 0) {
        foundInSuppliers = suppliersCache.find(e => {
          if (!e || !e.name) return false;
          const eName = e.name.toLowerCase().trim();
          return eName === cleanName || eName === entityName.toLowerCase() ||
                 eName.includes(cleanName) || cleanName.includes(eName);
        });
      }
      
      // Use the found entity and track type
      if (foundInCustomers) {
        entityId = foundInCustomers.id;
        entityName = foundInCustomers.name;
        entityType = 'customer';
      } else if (foundInSuppliers) {
        entityId = foundInSuppliers.id;
        entityName = foundInSuppliers.name;
        entityType = 'supplier';
      } else {
      }
    }
    
    // Determine entity type if found by ID
    if (entityId > 0 && !entityType) {
      if (customersCache.some(c => c.id === entityId)) {
        entityType = 'customer';
      } else if (suppliersCache.some(s => s.id === entityId)) {
        entityType = 'supplier';
      }
    }
    
    // Check if auto-create is enabled
    const autoCreate = document.getElementById('autoCreateEntity')?.checked;
    
    // Validate
    const errors = [];
    let needsAutoCreate = false;
    
    // Check entity exists in BOTH customers and suppliers
    const existsInCustomers = customersCache.some(e => e.id === entityId);
    const existsInSuppliers = suppliersCache.some(e => e.id === entityId);
    const entityExists = existsInCustomers || existsInSuppliers || entityType !== null;
    
    // Set entityType if found by ID
    if (!entityType && existsInCustomers) {
      entityType = 'customer';
    } else if (!entityType && existsInSuppliers) {
      entityType = 'supplier';
    }
    
    if (!entityExists && entityId > 0) {
      errors.push('العميل/المورد غير موجود');
    }
    if (entityId <= 0 && entityName) {
      // If we have a name but couldn't find ID
      if (autoCreate) {
        // Mark for auto-creation - not an error
        needsAutoCreate = true;
      } else {
        errors.push(`لم يتم العثور على "${entityName}" في النظام`);
      }
    } else if (entityId <= 0 && !entityName) {
      errors.push('رقم العميل/المورد غير صالح');
    }
    
    // Validate karat - be more flexible
    const normalizedKarat = String(karat).replace(/[^\d]/g, '');
    const validKarat = ['18', '21', '22', '24'].includes(normalizedKarat) ? normalizedKarat : null;
    if (!validKarat) {
      errors.push('العيار غير صالح');
    }
    
    // Validate weight
    if (weight <= 0) {
      errors.push('الوزن يجب أن يكون أكبر من صفر');
    }
    
    // Validate date format - be more flexible
    let normalizedDate = date;
    // Try to parse different date formats
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      // Try DD/MM/YYYY or DD-MM-YYYY
      const match = date.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
      if (match) {
        normalizedDate = `${match[3]}-${match[2].padStart(2,'0')}-${match[1].padStart(2,'0')}`;
      } else {
        errors.push('صيغة التاريخ غير صالحة');
      }
    }
    
    // Use ounce from file, or calculate if not provided
    if (!ounce || ounce <= 0) {
      const karatNum = parseFloat(validKarat || karat) || 21;
      ounce = weight * (karatNum / 24) / 31.1035;
    }
    
    return {
      rowIndex: index + 1,
      entityId,
      entityName: entityName || cache.find(e => e.id === entityId)?.name || '-',
      entityType, // 'customer' or 'supplier'
      date: normalizedDate,
      karat: validKarat || karat,
      weight,
      ounce,
      pricePerGram,
      value,
      memo,
      errors,
      needsAutoCreate,
      isValid: errors.length === 0,
      selected: errors.length === 0 || needsAutoCreate
    };
  }).filter(row => row.weight > 0 || row.entityId > 0 || row.entityName); // Filter out completely empty rows
  
  return importedData;
}

// Display preview table
function displayPreview() {
  const tbody = document.getElementById('importPreviewBody');
  const invoiceType = document.querySelector('input[name="importInvoiceType"]:checked')?.value || 'SELL';
  
  tbody.innerHTML = importedData.map((row, idx) => {
    let statusBadge;
    let rowClass;
    
    if (row.isValid) {
      statusBadge = '<span class="status-badge status-valid"><i class="fa-solid fa-check"></i> صالح</span>';
      rowClass = 'row-valid';
    } else if (row.needsAutoCreate) {
      statusBadge = '<span class="status-badge" style="background:rgba(245,158,11,0.2);color:#f59e0b"><i class="fa-solid fa-user-plus"></i> سيُنشأ</span>';
      rowClass = 'row-valid';
    } else {
      statusBadge = `<span class="status-badge status-error" title="${row.errors.join('، ')}"><i class="fa-solid fa-times"></i> خطأ</span>`;
      rowClass = 'row-error';
    }
    
    const canSelect = row.isValid || row.needsAutoCreate;
    
    return `
    <tr class="${rowClass}">
      <td><input type="checkbox" class="import-row-checkbox" data-index="${idx}" ${row.selected ? 'checked' : ''} ${!canSelect ? 'disabled' : ''}></td>
      <td>${row.entityId || '-'}</td>
      <td>${row.entityName}${row.needsAutoCreate ? ' <small style="color:#f59e0b">(جديد)</small>' : ''}</td>
      <td>${row.date}</td>
      <td><strong>${row.karat}</strong></td>
      <td>${formatNumber(row.weight, 2)}</td>
      <td>${formatNumber(row.ounce || 0, 3)}</td>
      <td>${formatNumber(row.pricePerGram, 2)}</td>
      <td>${formatNumber(row.value, 2)}</td>
      <td>${statusBadge}</td>
    </tr>
  `;
  }).join('');
  
  // Update stats
  const totalRows = importedData.length;
  const validRows = importedData.filter(r => r.isValid || r.needsAutoCreate).length;
  const errorRows = totalRows - validRows;
  const newEntities = importedData.filter(r => r.needsAutoCreate).length;
  
  document.getElementById('importTotalRows').textContent = totalRows;
  document.getElementById('importValidRows').textContent = validRows + (newEntities > 0 ? ` (${newEntities} جديد)` : '');
  document.getElementById('importErrorRows').textContent = errorRows;
  
  // Add checkbox listeners
  document.querySelectorAll('.import-row-checkbox').forEach(cb => {
    cb.addEventListener('change', (e) => {
      const idx = parseInt(e.target.dataset.index);
      importedData[idx].selected = e.target.checked;
    });
  });
  
  // Select all checkbox
  document.getElementById('selectAllImport').addEventListener('change', (e) => {
    document.querySelectorAll('.import-row-checkbox:not(:disabled)').forEach(cb => {
      cb.checked = e.target.checked;
      const idx = parseInt(cb.dataset.index);
      importedData[idx].selected = e.target.checked;
    });
  });
}

// Start the actual import
async function startImport() {
  const selectedRows = importedData.filter(r => r.selected && (r.isValid || r.needsAutoCreate));
  
  if (selectedRows.length === 0) {
    showToast('error', 'لا توجد صفوف محددة للاستيراد');
    return;
  }
  
  const invoiceType = document.querySelector('input[name="importInvoiceType"]:checked')?.value || 'SELL';
  
  // Show progress
  document.getElementById('importStep2').style.display = 'none';
  document.getElementById('importStep3').style.display = 'block';
  document.getElementById('importModalFooter').style.display = 'none';
  
  let successCount = 0;
  let errorCount = 0;
  let createdEntities = 0;
  
  // First, create any needed entities
  const entitiesToCreate = [...new Set(selectedRows.filter(r => r.needsAutoCreate).map(r => r.entityName))];
  const createdEntityMap = {}; // name -> {id, type}
  
  const currentUserId = (() => {
    try {
      const raw = localStorage.getItem('currentUser');
      const user = raw ? JSON.parse(raw) : null;
      const userId = Number(user?.id || 0);
      return Number.isFinite(userId) && userId > 0 ? userId : null;
    } catch (_) {
      return null;
    }
  })();

  for (const entityName of entitiesToCreate) {
    try {
      document.getElementById('importProgressText').textContent = `جاري إنشاء: ${entityName}...`;
      
      // For SELL invoices, create customer. For BUY invoices, create supplier.
      if (invoiceType === 'SELL') {
        // Create customer
        const result = await window.db.addCustomer({
          name: entityName,
          phone: '',
          region: '',
          active: 1,
          debt_limit: 0,
          created_by: currentUserId
        });
        if (result && result.success && result.id) {
          createdEntityMap[entityName] = { id: result.id, type: 'customer' };
          createdEntities++;
        }
      } else {
        // Create supplier
        const result = await window.suppliers.addSupplier({
          name: entityName,
          phone: '',
          region: '',
          active: 1,
          created_by: currentUserId
        });
        if (result && result.success && result.id) {
          createdEntityMap[entityName] = { id: result.id, type: 'supplier' };
          createdEntities++;
        }
      }
    } catch (e) {
      // Error creating entity
    }
  }
  
  // Update selected rows with new entity IDs and types
  selectedRows.forEach(row => {
    if (row.needsAutoCreate && createdEntityMap[row.entityName]) {
      row.entityId = createdEntityMap[row.entityName].id;
      row.entityType = createdEntityMap[row.entityName].type;
    }
  });
  
  // Each row becomes a separate invoice
  const invoices = selectedRows.map(row => ({
    entityId: row.entityId,
    entityName: row.entityName,
    entityType: row.entityType, // 'customer' or 'supplier'
    date: row.date,
    memo: row.memo,
    details: [{
      karat: row.karat,
      weight: row.weight,
      ounce: row.ounce,
      price_per_gram: row.pricePerGram,
      value: row.value
    }]
  }));
  
  const totalInvoices = invoices.length;
  
  for (let i = 0; i < invoices.length; i++) {
    const invoice = invoices[i];
    
    // Update progress
    const progress = ((i + 1) / totalInvoices) * 100;
    document.getElementById('importProgressBar').style.width = `${progress}%`;
    document.getElementById('importProgressText').textContent = `استيراد ${i + 1} من ${totalInvoices}...`;
    
    try {
      // Calculate totals
      let totalWeight = 0;
      let totalValue = 0;
      const details = invoice.details.map((d, idx) => {
        const weight = parseFloat(d.weight) || 0;
        const pricePerGram = parseFloat(d.price_per_gram) || 0;
        const value = parseFloat(d.value) || (weight * pricePerGram);
        // Use ounce from imported data (global gold price), not calculated
        const ounce = parseFloat(d.ounce) || 0;
        
        totalWeight += weight;
        totalValue += value;
        
        return {
          line_number: idx + 1,
          karat: d.karat,
          weight: weight,
          ounce: ounce,
          price_per_gram: pricePerGram,
          value: value
        };
      });
      
      // Prepare invoice payload (flat structure as expected by API)
      // Use entityType to correctly assign customer_id or supplier_id
      const isCustomer = invoice.entityType === 'customer';
      const isSupplier = invoice.entityType === 'supplier';
      
      const payload = {
        customer_id: isCustomer ? invoice.entityId : null,
        supplier_id: isSupplier ? invoice.entityId : null,
        customer_name: invoice.entityName,
        date: invoice.date,
        time: new Date().toTimeString().slice(0, 5),
        description: invoice.memo || `استيراد من Excel`,
        details: details
      };
      
      
      // Call appropriate API
      let result;
      if (invoiceType === 'SELL') {
        const api = window.salesInvoice || window.parent?.salesInvoice || window.top?.salesInvoice;
        if (api && api.add) {
          result = await api.add(payload);
        }
      } else {
        const api = window.purchaseInvoice || window.parent?.purchaseInvoice || window.top?.purchaseInvoice;
        if (api && api.add) {
          result = await api.add(payload);
        }
      }
      
      if (result && result.success) {
        successCount++;
      } else {
        errorCount++;
      }
    } catch (error) {
      errorCount++;
    }
    
    // Small delay to prevent overwhelming the system
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  // Show results
  document.getElementById('importStep3').style.display = 'none';
  document.getElementById('importStep4').style.display = 'block';
  
  let resultText = `تم استيراد ${successCount} فاتورة بنجاح`;
  if (createdEntities > 0) {
    resultText += ` (تم إنشاء ${createdEntities} ${invoiceType === 'SELL' ? 'عميل' : 'مورد'} جديد)`;
  }
  if (errorCount > 0) {
    resultText += `، فشل ${errorCount} فاتورة`;
  }
  document.getElementById('importResultText').textContent = resultText;
}

// Initialize import functionality
document.addEventListener('DOMContentLoaded', () => {
  // Import button
  const btnImportExcel = document.getElementById('btnImportExcel');
  if (btnImportExcel) {
    btnImportExcel.addEventListener('click', openImportModal);
  }
  
  // File input change
  const fileInput = document.getElementById('importFileInput');
  if (fileInput) {
    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (file) {
        await handleFileSelect(file);
      }
    });
  }
  
  // Select file button
  const btnSelectFile = document.getElementById('btnSelectFile');
  if (btnSelectFile) {
    btnSelectFile.addEventListener('click', () => {
      document.getElementById('importFileInput').click();
    });
  }
  
  // Download template button
  const btnDownloadTemplate = document.getElementById('btnDownloadTemplate');
  if (btnDownloadTemplate) {
    btnDownloadTemplate.addEventListener('click', downloadTemplate);
  }
  
  // Start import button
  const btnStartImport = document.getElementById('btnStartImport');
  if (btnStartImport) {
    btnStartImport.addEventListener('click', startImport);
  }
  
  // Drop zone
  const dropZone = document.getElementById('dropZone');
  if (dropZone) {
    dropZone.addEventListener('click', () => {
      document.getElementById('importFileInput').click();
    });
    
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('drag-over');
    });
    
    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('drag-over');
    });
    
    dropZone.addEventListener('drop', async (e) => {
      e.preventDefault();
      dropZone.classList.remove('drag-over');
      const file = e.dataTransfer.files[0];
      if (file) {
        await handleFileSelect(file);
      }
    });
  }
  
  // Close modal on outside click
  const modal = document.getElementById('importExcelModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeImportModal();
      }
    });
  }
});

// Handle file selection
// Close button - navigate back to dashboard

async function handleFileSelect(file) {
  if (!file.name.match(/\.(xlsx|xls|csv)$/i)) {
    showToast('error', 'يرجى اختيار ملف Excel (xlsx, xls) أو CSV');
    return;
  }
  
  try {
    showToast('info', 'جاري قراءة الملف...');
    
    // Make sure customers/suppliers are loaded first
    if (customersCache.length === 0 && suppliersCache.length === 0) {
      await loadCustomersAndSuppliers();
    }
    
    const rows = await parseExcelFile(file);
    
    if (rows.length < 2) {
      showToast('error', 'الملف فارغ أو لا يحتوي على بيانات كافية');
      return;
    }
    
    // Process data
    processImportData(rows);
    
    if (importedData.length === 0) {
      showToast('error', 'لم يتم العثور على بيانات صالحة في الملف');
      return;
    }
    
    // Show preview
    document.getElementById('importStep1').style.display = 'none';
    document.getElementById('importStep2').style.display = 'block';
    document.getElementById('btnStartImport').style.display = 'inline-flex';
    
    document.getElementById('importFileName').textContent = file.name;
    document.getElementById('importFileStats').textContent = `${importedData.length} صف`;
    
    displayPreview();
    
    showToast('success', `تم قراءة ${importedData.length} صف من الملف`);
  } catch (error) {
    showToast('error', 'حدث خطأ في قراءة الملف');
  }
}

window.refreshForBranchScopeChange = async function() {
  await loadMovementData();
  return true;
};

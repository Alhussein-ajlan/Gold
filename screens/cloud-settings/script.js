const CLOUD_TRANSLATIONS = {
  ar: {
    pageTitle: 'إعدادات السحابة',
    cloudDbTitle: 'إعدادات السحابة',
    cloudConnectionTitle: 'الاتصال السحابي',
    cloudDbDesc: 'اتصل بقاعدة بيانات Turso على السحابة للوصول من أي مكان',
    cloudDbUrl: 'رابط قاعدة البيانات',
    cloudDbUrlPlaceholder: 'libsql://your-database.turso.io',
    cloudDbToken: 'رمز الوصول (Token)',
    cloudDbTokenPlaceholder: 'أدخل رمز الوصول الخاص بك',
    cloudDbStatus: 'حالة الاتصال',
    cloudDbConnected: 'متصل',
    cloudDbDisconnected: 'غير متصل',
    cloudDbTestConnection: 'اختبار الاتصال',
    cloudDbSaveSettings: 'حفظ الإعدادات',
    cloudDbTesting: 'جار الاختبار...',
    cloudDbTestSuccess: 'تم الاتصال بنجاح! قاعدة البيانات جاهزة.',
    cloudDbTestFailed: 'فشل الاتصال: {error}',
    cloudDbSaved: 'تم حفظ إعدادات قاعدة البيانات السحابية',
    cloudDbSaveFailed: 'فشل حفظ الإعدادات',
    cloudDbEnterUrl: 'يرجى إدخال رابط قاعدة البيانات',
    cloudDbEnterToken: 'يرجى إدخال رمز الوصول',
    cloudDbInvalidUrl: 'رابط قاعدة البيانات غير صالح. يجب أن يبدأ بـ libsql://',
    cloudDbLastSync: 'آخر مزامنة:',
    cloudDbNeverSynced: 'لم تتم المزامنة بعد',
    cloudDbSecurityNote: 'ملاحظة أمنية: يتم تخزين رمز الوصول محلياً على جهازك فقط',
    cloudModeLabel: 'وضع قاعدة البيانات',
    cloudModeLocal: 'محلي (Offline)',
    cloudModeCloud: 'سحابي (Cloud)',
    cloudModeNote: 'في الوضع السحابي، جميع العمليات تتم مباشرة على قاعدة البيانات السحابية',
    cloudModeEnabled: 'تم تفعيل الوضع السحابي',
    cloudModeDisabled: 'تم تفعيل الوضع المحلي',
    cloudModeConnectFirst: 'يجب الاتصال بقاعدة البيانات السحابية أولاً لتفعيل الوضع السحابي',
    syncCardTitle: 'المزامنة',
    syncCardDesc: 'تحكم كامل باتجاه المزامنة مع عرض تقدّم مباشر وتفاصيل السجلات',
    syncLocalToCloud: 'مزامنة المحلي إلى السحابة',
    syncCloudToLocal: 'مزامنة السحابة إلى المحلي',
    syncConfirmLocalToCloudTitle: 'تأكيد مزامنة المحلي إلى السحابة',
    syncConfirmLocalToCloudMessage: 'سيتم رفع جميع بيانات قاعدة البيانات المحلية إلى السحابة واستبدال البيانات السحابية الحالية. هل تريد المتابعة؟',
    syncConfirmCloudToLocalTitle: 'تأكيد مزامنة السحابة إلى المحلي',
    syncConfirmCloudToLocalMessage: 'سيتم استبدال جميع البيانات المحلية بالكامل بأحدث نسخة من السحابة. لا يمكن التراجع عن هذه العملية.',
    syncRunningLocalToCloud: 'جاري مزامنة البيانات المحلية إلى السحابة...',
    syncRunningCloudToLocal: 'جاري مزامنة البيانات السحابية إلى المحلي...',
    syncCompletedLocalToCloud: 'تمت مزامنة المحلي إلى السحابة بنجاح',
    syncCompletedCloudToLocal: 'تمت مزامنة السحابة إلى المحلي بنجاح',
    syncFailedWithError: 'فشلت المزامنة: {error}',
    uploadConfirmTitle: 'تحذير: رفع قاعدة البيانات للسحابة',
    uploadConfirmMessage: 'سيتم حذف جميع البيانات الموجودة في السحابة واستبدالها ببيانات قاعدة البيانات المحلية.\n\nهذه العملية لا يمكن التراجع عنها!\n\nسيتم رفع {count} جدول تشمل:\n• الحسابات والعملاء والموردين\n• الفواتير والسندات والقيود\n• المستخدمين والصلاحيات\n\nهل أنت متأكد من المتابعة؟',
    uploadConfirmBtn: 'نعم، ارفع البيانات',
    autoSyncTitle: 'المزامنة التلقائية',
    autoSyncDesc: 'تشغيل مزامنة دورية تلقائية بين المحلي والسحابة',
    saveAutoSync: 'حفظ وتشغيل',
    autoSyncSaved: 'تم حفظ إعدادات المزامنة التلقائية',
    autoSyncStopped: 'تم إيقاف المزامنة التلقائية',
    autoSyncInvalidInterval: 'يرجى إدخال فترة مزامنة صحيحة',
    seconds: 'ثوانٍ',
    minutes: 'دقائق',
    hours: 'ساعات',
    localConnectionTitle: 'الاتصال المحلي',
    localConnectionDesc: 'حدد ملف قاعدة البيانات المحلية وتأكد من سلامة الاتصال',
    localDbPathLabel: 'مسار قاعدة البيانات المحلية',
    localDbPathPlaceholder: 'D:\\gold\\sys\\database\\database.db',
    selectPath: 'اختيار المسار',
    uploadCloudTitle: 'رفع قاعدة البيانات المحلية للسحابة',
    uploadCloudDesc: 'رفع جميع البيانات من قاعدة البيانات المحلية إلى السحابة (يحل محل البيانات الموجودة)',
    uploadToCloud: 'رفع للسحابة',
    connectBtn: 'اتصال',
    connecting: 'جار الاتصال...',
    pathHint: 'يمكنك كتابة المسار أو لصقه مباشرة، أو استخدام زر "اختيار المسار"',
    noPathToCopy: 'لا يوجد مسار لنسخه',
    pathCopied: 'تم نسخ المسار إلى الحافظة ✓',
    copyPathFailed: 'فشل نسخ المسار: {error}',
    cloudStorageWarning: '⚠️ تحذير: قاعدة البيانات على خدمة سحابية (OneDrive/Dropbox). لا تستخدم أكثر من جهاز في نفس الوقت!',
    pathSelectedConnect: 'تم اختيار المسار، انقر على "اتصال" للاتصال بقاعدة البيانات',
    selectPathError: 'خطأ في اختيار المسار: {error}',
    dbConnectSuccess: 'تم الاتصال بنجاح',
    dbConnectFailed: 'فشل الاتصال',
    dbPathMustEndWithDb: 'يجب أن ينتهي مسار قاعدة البيانات بـ .db\n\nمثال: D:\\path\\to\\database.db',
    enterDbPath: 'يرجى إدخال أو اختيار مسار قاعدة البيانات أولاً',
    dbConnectedRestart: 'تم الاتصال بقاعدة البيانات بنجاح!\n\nيرجى إعادة تشغيل البرنامج لتحميل البيانات الجديدة.',
    cloudDbWarningMessage: '⚠️ تحذير: قاعدة بيانات على خدمة سحابية\n\nقاعدة البيانات موجودة على خدمة سحابية (OneDrive/Dropbox/Google Drive)\n\n⚠️ تحذيرات مهمة:\n1. لا تفتح البرنامج على أكثر من جهاز في نفس الوقت\n2. قد يحدث تعارض في الأرقام التسلسلية\n3. قد تحدث أخطاء في قفل قاعدة البيانات\n4. احفظ البيانات بسرعة وأغلق البرنامج\n\nللاستخدام الآمن: استخدم جهاز واحد فقط في كل مرة!\n\nتم الاتصال بنجاح. يرجى إعادة التشغيل.',
    alertSuccess: 'نجح الاتصال',
    alertWarning: 'تحذير',
    alertErrorTitle: 'خطأ',
    apiNotAvailable: 'API غير متوفر',
    unknownError: 'خطأ غير معروف',
    errorPrefix: 'خطأ:',
    errorOccurred: 'حدث خطأ:',
    readTablesFailed: 'فشل في قراءة الجداول',
    record: 'سجل',
    uploading: 'جاري الرفع...',
    downloading: 'جاري التحميل...',
    failed: 'فشل',
    failedInTables: 'فشل في {count} جدول',
    beforeSync: 'قبل',
    afterSync: 'بعد',
    confirmBtn: 'تأكيد',
    cancelBtn: 'إلغاء',
    areYouSure: 'هل أنت متأكد؟',
    cloudPasswordSyncTitle: 'تأكيد المزامنة',
    cloudPasswordUploadTitle: 'تأكيد الرفع',
    cloudPasswordSyncMessage: 'أدخل كلمة مرور الإدارة لمستخدم المحاسب الذكي لإكمال المزامنة',
    cloudPasswordUploadMessage: 'أدخل كلمة مرور الإدارة لمستخدم المحاسب الذكي لإكمال الرفع',
    cloudPasswordEnter: 'أدخل كلمة المرور',
    cloudPasswordVerifying: 'جاري التحقق...',
    cloudPasswordVerificationFailed: 'حدث خطأ أثناء التحقق: {error}',
    localConnectPermission: 'الاتصال بقاعدة البيانات المحلية',
    cloudEditPermission: 'تعديل إعدادات السحابة',
    cloudSyncPermission: 'تنفيذ مزامنة السحابة',
    cloudUploadPermission: 'رفع قاعدة البيانات المحلية للسحابة'
  },
  en: {
    pageTitle: 'Cloud Settings',
    cloudDbTitle: 'Cloud Settings',
    cloudConnectionTitle: 'Cloud Connection',
    cloudDbDesc: 'Connect to Turso cloud database for access from anywhere',
    cloudDbUrl: 'Database URL',
    cloudDbUrlPlaceholder: 'libsql://your-database.turso.io',
    cloudDbToken: 'Access Token',
    cloudDbTokenPlaceholder: 'Enter your access token',
    cloudDbStatus: 'Connection Status',
    cloudDbConnected: 'Connected',
    cloudDbDisconnected: 'Disconnected',
    cloudDbTestConnection: 'Test Connection',
    cloudDbSaveSettings: 'Save Settings',
    cloudDbTesting: 'Testing...',
    cloudDbTestSuccess: 'Connected successfully! Database is ready.',
    cloudDbTestFailed: 'Connection failed: {error}',
    cloudDbSaved: 'Cloud database settings saved',
    cloudDbSaveFailed: 'Failed to save settings',
    cloudDbEnterUrl: 'Please enter the database URL',
    cloudDbEnterToken: 'Please enter the access token',
    cloudDbInvalidUrl: 'Invalid database URL. Must start with libsql://',
    cloudDbLastSync: 'Last sync:',
    cloudDbNeverSynced: 'Never synced',
    cloudDbSecurityNote: 'Security note: Access token is stored locally on your device only',
    cloudModeLabel: 'Database Mode',
    cloudModeLocal: 'Local (Offline)',
    cloudModeCloud: 'Cloud',
    cloudModeNote: 'In cloud mode, all operations run directly against the cloud database',
    cloudModeEnabled: 'Cloud mode enabled',
    cloudModeDisabled: 'Local mode enabled',
    cloudModeConnectFirst: 'You must connect to the cloud database first to enable cloud mode',
    syncCardTitle: 'Synchronization',
    syncCardDesc: 'Full control over sync direction with live progress and record details',
    syncLocalToCloud: 'Sync Local to Cloud',
    syncCloudToLocal: 'Sync Cloud to Local',
    syncConfirmLocalToCloudTitle: 'Confirm Local to Cloud Sync',
    syncConfirmLocalToCloudMessage: 'All local database data will be uploaded and existing cloud data will be replaced. Continue?',
    syncConfirmCloudToLocalTitle: 'Confirm Cloud to Local Sync',
    syncConfirmCloudToLocalMessage: 'All local data will be fully replaced with the latest cloud copy. This action cannot be undone.',
    syncRunningLocalToCloud: 'Syncing local data to cloud...',
    syncRunningCloudToLocal: 'Syncing cloud data to local...',
    syncCompletedLocalToCloud: 'Local to cloud sync completed successfully',
    syncCompletedCloudToLocal: 'Cloud to local sync completed successfully',
    syncFailedWithError: 'Sync failed: {error}',
    uploadConfirmTitle: 'Warning: Upload local database to cloud',
    uploadConfirmMessage: 'All existing cloud data will be deleted and replaced with local database data.\n\nThis action cannot be undone!\n\n{count} tables will be uploaded including:\n• Accounts, customers and suppliers\n• Invoices, vouchers and journal entries\n• Users and permissions\n\nAre you sure you want to continue?',
    uploadConfirmBtn: 'Yes, upload data',
    autoSyncTitle: 'Automatic Sync',
    autoSyncDesc: 'Run scheduled sync between local and cloud databases',
    saveAutoSync: 'Save & Run',
    autoSyncSaved: 'Automatic sync settings saved',
    autoSyncStopped: 'Automatic sync stopped',
    autoSyncInvalidInterval: 'Please enter a valid sync interval',
    seconds: 'Seconds',
    minutes: 'Minutes',
    hours: 'Hours',
    localConnectionTitle: 'Local Connection',
    localConnectionDesc: 'Select the local database file and verify connectivity',
    localDbPathLabel: 'Local Database Path',
    localDbPathPlaceholder: 'D:\\gold\\sys\\database\\database.db',
    selectPath: 'Select Path',
    uploadCloudTitle: 'Upload local database to cloud',
    uploadCloudDesc: 'Upload all local database data to the cloud (replaces current cloud data)',
    uploadToCloud: 'Upload to Cloud',
    connectBtn: 'Connect',
    connecting: 'Connecting...',
    pathHint: 'You can type or paste the path directly, or use the select path button',
    noPathToCopy: 'There is no path to copy',
    pathCopied: 'Path copied to clipboard ✓',
    copyPathFailed: 'Failed to copy path: {error}',
    cloudStorageWarning: '⚠️ Warning: database is stored in cloud storage (OneDrive/Dropbox). Do not use more than one device at the same time!',
    pathSelectedConnect: 'Path selected. Click connect to connect to the database',
    selectPathError: 'Error selecting path: {error}',
    dbConnectSuccess: 'Connected successfully',
    dbConnectFailed: 'Connection failed',
    dbPathMustEndWithDb: 'Database path must end with .db\n\nExample: D:\\path\\to\\database.db',
    enterDbPath: 'Please enter or select the database path first',
    dbConnectedRestart: 'Database connected successfully!\n\nPlease restart the app to load the new data.',
    cloudDbWarningMessage: '⚠️ Warning: database is on cloud storage\n\nThe database is stored on a cloud service (OneDrive/Dropbox/Google Drive).\n\nImportant warnings:\n1. Do not open the app on more than one device at the same time\n2. Serial conflicts may occur\n3. Database locking errors may occur\n4. Save data quickly and close the app\n\nFor safe use, use only one device at a time!\n\nConnected successfully. Please restart.',
    alertSuccess: 'Success',
    alertWarning: 'Warning',
    alertErrorTitle: 'Error',
    apiNotAvailable: 'API not available',
    unknownError: 'Unknown error',
    errorPrefix: 'Error:',
    errorOccurred: 'An error occurred:',
    readTablesFailed: 'Failed to read tables',
    record: 'record',
    uploading: 'Uploading...',
    downloading: 'Downloading...',
    failed: 'Failed',
    failedInTables: 'Failed in {count} tables',
    beforeSync: 'Before',
    afterSync: 'After',
    confirmBtn: 'Confirm',
    cancelBtn: 'Cancel',
    areYouSure: 'Are you sure?',
    cloudPasswordSyncTitle: 'Confirm Sync',
    cloudPasswordUploadTitle: 'Confirm Upload',
    cloudPasswordSyncMessage: 'Enter the admin password for the Smart Accountant user to complete the sync',
    cloudPasswordUploadMessage: 'Enter the admin password for the Smart Accountant user to complete the upload',
    cloudPasswordEnter: 'Enter password',
    cloudPasswordVerifying: 'Verifying...',
    cloudPasswordVerificationFailed: 'Verification failed: {error}',
    localConnectPermission: 'connect to local database',
    cloudEditPermission: 'edit cloud settings',
    cloudSyncPermission: 'run cloud sync',
    cloudUploadPermission: 'upload local database to cloud'
  }
};

const TABLE_LABELS = {
  ar: {
    company: 'معلومات الشركة',
    currencies: 'العملات',
    account_types: 'أنواع الحسابات',
    branches: 'الفروع',
    accounts: 'الحسابات',
    customers: 'العملاء',
    suppliers: 'الموردون',
    customer_branches: 'فروع العملاء',
    supplier_branches: 'فروع الموردين',
    categories: 'التصنيفات',
    users: 'المستخدمون',
    user_branches: 'فروع المستخدمين',
    user_messages: 'رسائل المستخدمين',
    permissions: 'الصلاحيات',
    user_permissions: 'صلاحيات المستخدمين',
    gold_items: 'أصناف الذهب',
    gold_karats: 'عيارات الذهب',
    vouchers: 'سندات الصرف',
    voucher_lines: 'تفاصيل سندات الصرف',
    receipts: 'سندات القبض',
    receipt_lines: 'تفاصيل سندات القبض',
    sales_invoices: 'فواتير المبيعات',
    sales_invoice_details: 'تفاصيل فواتير المبيعات',
    purchase_invoices: 'فواتير المشتريات',
    purchase_invoice_details: 'تفاصيل فواتير المشتريات',
    journal_entries: 'القيود اليومية',
    journal_lines: 'تفاصيل القيود اليومية',
    openings: 'الأرصدة الافتتاحية',
    opening_lines: 'تفاصيل الأرصدة الافتتاحية',
    orders: 'الأوردرات',
    default_boxes: 'الصناديق الافتراضية',
    tax_declarations: 'الإقرارات الضريبية',
    invoice_settings: 'إعدادات الفواتير'
  },
  en: {
    company: 'Company Information',
    currencies: 'Currencies',
    account_types: 'Account Types',
    branches: 'Branches',
    accounts: 'Accounts',
    customers: 'Customers',
    suppliers: 'Suppliers',
    customer_branches: 'Customer Branches',
    supplier_branches: 'Supplier Branches',
    categories: 'Categories',
    users: 'Users',
    user_branches: 'User Branches',
    user_messages: 'User Messages',
    permissions: 'Permissions',
    user_permissions: 'User Permissions',
    gold_items: 'Gold Items',
    gold_karats: 'Gold Karats',
    vouchers: 'Payment Vouchers',
    voucher_lines: 'Voucher Lines',
    receipts: 'Receipt Vouchers',
    receipt_lines: 'Receipt Lines',
    sales_invoices: 'Sales Invoices',
    sales_invoice_details: 'Sales Invoice Details',
    purchase_invoices: 'Purchase Invoices',
    purchase_invoice_details: 'Purchase Invoice Details',
    journal_entries: 'Journal Entries',
    journal_lines: 'Journal Lines',
    openings: 'Opening Balances',
    opening_lines: 'Opening Lines',
    orders: 'Orders',
    default_boxes: 'Default Boxes',
    tax_declarations: 'Tax Declarations',
    invoice_settings: 'Invoice Settings'
  }
};

function getCloudLang() {
  return localStorage.getItem('uiLang') === 'en' ? 'en' : 'ar';
}

function tCloud(key) {
  const lang = getCloudLang();
  return CLOUD_TRANSLATIONS[lang]?.[key] || CLOUD_TRANSLATIONS.ar[key] || key;
}

function getTableLabel(name) {
  const lang = getCloudLang();
  return TABLE_LABELS[lang]?.[name] || TABLE_LABELS.ar[name] || name;
}

function getUploadConfirmMessage(tableCount) {
  const safeCount = Math.max(0, Number(tableCount || 0));
  return tCloud('uploadConfirmMessage').replace('{count}', String(safeCount));
}

function applyCloudTranslations() {
  const lang = getCloudLang();
  const isEn = lang === 'en';
  const dict = CLOUD_TRANSLATIONS[lang] || CLOUD_TRANSLATIONS.ar;
  document.documentElement.lang = lang;
  document.documentElement.dir = isEn ? 'ltr' : 'rtl';
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) {
      el.setAttribute('placeholder', dict[key]);
    }
  });
  const titleEl = document.querySelector('title[data-i18n]');
  if (titleEl) {
    titleEl.textContent = tCloud(titleEl.getAttribute('data-i18n'));
  }
  document.title = tCloud('pageTitle');
}

function showToast(msg, type) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.className = `toast ${type === 'ok' || type === 'success' ? 'ok' : 'err'}`;
  el.offsetHeight;
  el.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => el.classList.remove('show'), 2200);
}

function showConfirmModal(options = {}) {
  return new Promise((resolve) => {
    const overlay = document.getElementById('cloudConfirmModalOverlay');
    const icon = document.getElementById('cloudConfirmModalIcon');
    const title = document.getElementById('cloudConfirmModalTitle');
    const message = document.getElementById('cloudConfirmModalMessage');
    const confirmBtn = document.getElementById('cloudConfirmModalConfirm');
    const cancelBtn = document.getElementById('cloudConfirmModalCancel');
    if (!overlay || !icon || !title || !message || !confirmBtn || !cancelBtn) {
      resolve(window.confirm(options.message || tCloud('areYouSure')));
      return;
    }
    const iconType = options.type || 'warning';
    const iconClasses = {
      warning: { icon: 'fa-exclamation-triangle', class: 'warning' },
      danger: { icon: 'fa-trash-can', class: 'danger' },
      info: { icon: 'fa-info-circle', class: 'info' },
      success: { icon: 'fa-check-circle', class: 'success' },
      upload: { icon: 'fa-cloud-arrow-up', class: 'upload' }
    };
    const iconConfig = iconClasses[iconType] || iconClasses.warning;
    title.textContent = options.title || tCloud('confirmBtn');
    message.textContent = options.message || tCloud('areYouSure');
    icon.className = `cloud-confirm-modal-icon ${iconConfig.class}`;
    icon.innerHTML = `<i class="fa-solid ${iconConfig.icon}"></i>`;
    confirmBtn.className = `cloud-confirm-modal-btn confirm ${iconConfig.class}`;
    const confirmTextEl = confirmBtn.querySelector('span');
    const cancelTextEl = cancelBtn.querySelector('span');
    if (confirmTextEl) confirmTextEl.textContent = options.confirmText || tCloud('confirmBtn');
    if (cancelTextEl) cancelTextEl.textContent = options.cancelText || tCloud('cancelBtn');
    overlay.classList.add('show');

    const cleanup = () => {
      overlay.classList.remove('show');
      confirmBtn.removeEventListener('click', handleConfirm);
      cancelBtn.removeEventListener('click', handleCancel);
      overlay.removeEventListener('click', handleOverlayClick);
      document.removeEventListener('keydown', handleEscape);
    };
    const handleConfirm = () => {
      cleanup();
      resolve(true);
    };
    const handleCancel = () => {
      cleanup();
      resolve(false);
    };
    const handleOverlayClick = (e) => {
      if (e.target === overlay) handleCancel();
    };
    const handleEscape = (e) => {
      if (e.key === 'Escape') handleCancel();
    };

    confirmBtn.addEventListener('click', handleConfirm);
    cancelBtn.addEventListener('click', handleCancel);
    overlay.addEventListener('click', handleOverlayClick);
    document.addEventListener('keydown', handleEscape);
  });
}

function showCloudPasswordModal(options = {}) {
  return new Promise((resolve) => {
    const overlay = document.getElementById('cloudPasswordModalOverlay');
    const title = document.getElementById('cloudPasswordModalTitle');
    const message = document.getElementById('cloudPasswordModalMessage');
    const passwordInput = document.getElementById('cloudPasswordModalInput');
    const errorEl = document.getElementById('cloudPasswordModalError');
    const confirmBtn = document.getElementById('cloudPasswordModalConfirm');
    const cancelBtn = document.getElementById('cloudPasswordModalCancel');
    const confirmTextEl = document.getElementById('cloudPasswordModalConfirmText');

    if (!overlay || !title || !message || !passwordInput || !errorEl || !confirmBtn || !cancelBtn) {
      resolve(false);
      return;
    }

    const originalConfirmHtml = confirmBtn.innerHTML;
    const cancelTextEl = cancelBtn.querySelector('span');
    let settled = false;

    title.textContent = options.title || tCloud('confirmBtn');
    message.textContent = options.message || tCloud('areYouSure');
    if (confirmTextEl) confirmTextEl.textContent = options.confirmText || tCloud('confirmBtn');
    if (cancelTextEl) cancelTextEl.textContent = options.cancelText || tCloud('cancelBtn');
    passwordInput.value = '';
    passwordInput.classList.remove('error');
    errorEl.textContent = '';
    overlay.classList.add('show');

    const cleanup = () => {
      overlay.classList.remove('show');
      confirmBtn.disabled = false;
      confirmBtn.innerHTML = originalConfirmHtml;
      confirmBtn.removeEventListener('click', handleConfirm);
      cancelBtn.removeEventListener('click', handleCancel);
      overlay.removeEventListener('click', handleOverlayClick);
      passwordInput.removeEventListener('keydown', handlePasswordKeydown);
      passwordInput.removeEventListener('input', handlePasswordInput);
      document.removeEventListener('keydown', handleEscape);
    };

    const finish = (result) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(result);
    };

    const handleCancel = () => finish(false);
    const handleOverlayClick = (event) => {
      if (event.target === overlay) finish(false);
    };
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        finish(false);
      }
    };
    const handlePasswordInput = () => {
      errorEl.textContent = '';
      passwordInput.classList.remove('error');
    };

    const handleConfirm = async () => {
      const password = String(passwordInput.value || '').trim();
      if (!password) {
        errorEl.textContent = tCloud('cloudPasswordEnter');
        passwordInput.classList.add('error');
        passwordInput.focus();
        return;
      }

      const api = getAPI();
      if (!api?.invoke) {
        errorEl.textContent = tCloud('apiNotAvailable');
        passwordInput.classList.add('error');
        return;
      }

      confirmBtn.disabled = true;
      confirmBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i><span>${tCloud('cloudPasswordVerifying')}</span>`;

      try {
        const result = await api.invoke('verify-smart-accountant-password', { password });
        if (result?.success) {
          finish(true);
          return;
        }

        errorEl.textContent = result?.error || tCloud('cloudPasswordEnter');
        passwordInput.classList.add('error');
        passwordInput.value = '';
        passwordInput.focus();
      } catch (error) {
        errorEl.textContent = tCloud('cloudPasswordVerificationFailed').replace('{error}', error?.message || tCloud('unknownError'));
        passwordInput.classList.add('error');
        passwordInput.focus();
      } finally {
        if (!settled) {
          confirmBtn.disabled = false;
          confirmBtn.innerHTML = originalConfirmHtml;
        }
      }
    };

    const handlePasswordKeydown = async (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        await handleConfirm();
      }
    };

    confirmBtn.addEventListener('click', handleConfirm);
    cancelBtn.addEventListener('click', handleCancel);
    overlay.addEventListener('click', handleOverlayClick);
    passwordInput.addEventListener('keydown', handlePasswordKeydown);
    passwordInput.addEventListener('input', handlePasswordInput);
    document.addEventListener('keydown', handleEscape);
    setTimeout(() => passwordInput.focus(), 60);
  });
}

function getAPI() {
  if (window.parent && window.parent !== window && window.parent.api) return window.parent.api;
  if (window.api) return window.api;
  if (window.top && window.top !== window && window.top.api) return window.top.api;
  return null;
}

function hasPermission(permissionName) {
  if (!window.ScreenPermissions) return true;
  return window.ScreenPermissions.has(permissionName);
}

function checkPermission(permissionName, label) {
  if (!window.ScreenPermissions) return true;
  return window.ScreenPermissions.check(permissionName, label);
}

function hasAnyCloudSettingsPermission() {
  return hasPermission('cloud_settings_view')
    || hasPermission('cloud_settings_edit')
    || hasPermission('cloud_settings_sync')
    || hasPermission('cloud_settings_upload')
    || hasPermission('cloud_settings_local_connect');
}

function hideElementIfNoPermission(id, permissionName) {
  const el = document.getElementById(id);
  if (!el || hasPermission(permissionName)) return;
  el.style.display = 'none';
}

function disableElementIfNoPermission(id, permissionName) {
  const el = document.getElementById(id);
  if (!el || hasPermission(permissionName)) return;
  el.disabled = true;
  el.style.opacity = '0.6';
  el.style.cursor = 'not-allowed';
}

function formatDateTimeArabic(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const period = hours >= 12 ? 'م' : 'ص';
  hours = hours % 12 || 12;
  return `${year}/${month}/${day} ${hours}:${minutes} ${period}`;
}

function formatDateTimeEn(date) {
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit'
  });
}

function formatDateTime(value) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return tCloud('cloudDbNeverSynced');
  return getCloudLang() === 'en' ? formatDateTimeEn(date) : formatDateTimeArabic(date);
}

document.addEventListener('DOMContentLoaded', async () => {
  applyCloudTranslations();
  if (window.ScreenPermissions) {
    await window.ScreenPermissions.init();
    if (!hasAnyCloudSettingsPermission()) {
      window.ScreenPermissions.check('cloud_settings_view', tCloud('cloudDbTitle'));
      const shell = document.getElementById('pageShell');
      if (shell) {
        shell.innerHTML = '';
        shell.classList.add('access-denied-state');
      }
      return;
    }
  }
  initCloudSettingsScreen();
});

function initCloudSettingsScreen() {
  applyCloudTranslations();

  const cloudDbUrl = document.getElementById('cloudDbUrl');
  const cloudDbToken = document.getElementById('cloudDbToken');
  const toggleTokenVisibility = document.getElementById('toggleTokenVisibility');
  const btnTestCloudDb = document.getElementById('btnTestCloudDb');
  const btnSaveCloudDb = document.getElementById('btnSaveCloudDb');
  const btnSyncLocalToCloud = document.getElementById('btnSyncLocalToCloud');
  const btnSyncCloudToLocal = document.getElementById('btnSyncCloudToLocal');
  const btnUploadLocalToCloud = document.getElementById('btnUploadLocalToCloud');
  const btnSaveAutoSync = document.getElementById('btnSaveAutoSync');
  const autoSyncEnabled = document.getElementById('autoSyncEnabled');
  const autoSyncInterval = document.getElementById('autoSyncInterval');
  const autoSyncUnit = document.getElementById('autoSyncUnit');
  const autoSyncControls = document.getElementById('autoSyncControls');
  const cloudDbStatusDot = document.getElementById('cloudDbStatusDot');
  const cloudDbStatusText = document.getElementById('cloudDbStatusText');
  const cloudDbMessage = document.getElementById('cloudDbMessage');
  const cloudDbLastSyncTime = document.getElementById('cloudDbLastSyncTime');
  const syncProgressPanel = document.getElementById('syncProgressPanel');
  const syncProgressRing = document.getElementById('syncProgressRing');
  const syncProgressPercent = document.getElementById('syncProgressPercent');
  const syncProgressTitle = document.getElementById('syncProgressTitle');
  const syncProgressSubtitle = document.getElementById('syncProgressSubtitle');
  const syncProgressCount = document.getElementById('syncProgressCount');
  const syncDetailsList = document.getElementById('syncDetailsList');
  const uploadProgressPanel = document.getElementById('uploadProgressPanel');
  const uploadProgressRing = document.getElementById('uploadProgressRing');
  const uploadProgressPercent = document.getElementById('uploadProgressPercent');
  const uploadProgressTitle = document.getElementById('uploadProgressTitle');
  const uploadProgressSubtitle = document.getElementById('uploadProgressSubtitle');
  const uploadProgressCount = document.getElementById('uploadProgressCount');
  const uploadDetailsList = document.getElementById('uploadDetailsList');
  const dbModeLocal = document.getElementById('dbModeLocal');
  const dbModeCloud = document.getElementById('dbModeCloud');
  const cloudModeNote = document.getElementById('cloudModeNote');
  const dbPathInput = document.getElementById('dbPathInput');
  const btnSelectDbPath = document.getElementById('btnSelectDbPath');
  const btnCopyDbPath = document.getElementById('btnCopyDbPath');
  const btnConnectDb = document.getElementById('btnConnectDb');
  const dbConnectionStatus = document.getElementById('dbConnectionStatus');
  const dbConnectionMessage = document.getElementById('dbConnectionMessage');

  const syncState = { running: false };
  const SYNC_RING_RADIUS = 52;
  const SYNC_RING_CIRCUMFERENCE = 2 * Math.PI * SYNC_RING_RADIUS;
  let cloudSyncStatusIntervalId = null;

  function applyPermissionGuards() {
    hideElementIfNoPermission('btnTestCloudDb', 'cloud_settings_edit');
    hideElementIfNoPermission('btnSaveCloudDb', 'cloud_settings_edit');
    hideElementIfNoPermission('btnSyncLocalToCloud', 'cloud_settings_sync');
    hideElementIfNoPermission('btnSyncCloudToLocal', 'cloud_settings_sync');
    hideElementIfNoPermission('btnSaveAutoSync', 'cloud_settings_sync');
    hideElementIfNoPermission('btnUploadLocalToCloud', 'cloud_settings_upload');
    hideElementIfNoPermission('btnSelectDbPath', 'cloud_settings_local_connect');
    hideElementIfNoPermission('btnCopyDbPath', 'cloud_settings_local_connect');
    hideElementIfNoPermission('btnConnectDb', 'cloud_settings_local_connect');
    disableElementIfNoPermission('cloudDbUrl', 'cloud_settings_edit');
    disableElementIfNoPermission('cloudDbToken', 'cloud_settings_edit');
    disableElementIfNoPermission('toggleTokenVisibility', 'cloud_settings_edit');
    disableElementIfNoPermission('dbModeLocal', 'cloud_settings_edit');
    disableElementIfNoPermission('dbModeCloud', 'cloud_settings_edit');
    disableElementIfNoPermission('autoSyncEnabled', 'cloud_settings_sync');
    disableElementIfNoPermission('autoSyncInterval', 'cloud_settings_sync');
    disableElementIfNoPermission('autoSyncUnit', 'cloud_settings_sync');
    disableElementIfNoPermission('dbPathInput', 'cloud_settings_local_connect');
  }

  function setCloudDbStatus(status) {
    if (!cloudDbStatusDot || !cloudDbStatusText) return;
    cloudDbStatusDot.className = `status-dot ${status}`;
    if (status === 'connected') cloudDbStatusText.textContent = tCloud('cloudDbConnected');
    else if (status === 'testing') cloudDbStatusText.textContent = tCloud('cloudDbTesting');
    else cloudDbStatusText.textContent = tCloud('cloudDbDisconnected');
  }

  function showCloudDbMessage(message, type) {
    if (!cloudDbMessage) return;
    const icon = cloudDbMessage.querySelector('.message-icon');
    const text = cloudDbMessage.querySelector('.message-text');
    cloudDbMessage.className = `cloud-db-message ${type}`;
    cloudDbMessage.style.display = 'flex';
    if (icon) {
      if (type === 'success') icon.className = 'message-icon fa-solid fa-check-circle';
      else if (type === 'error') icon.className = 'message-icon fa-solid fa-times-circle';
      else icon.className = 'message-icon fa-solid fa-info-circle';
    }
    if (text) text.textContent = message;
    if (type === 'success') {
      setTimeout(() => {
        cloudDbMessage.style.display = 'none';
      }, 5000);
    }
  }

  function showConnectionStatus(message, type = 'info') {
    if (!dbConnectionStatus || !dbConnectionMessage) return;
    dbConnectionStatus.className = `connection-status ${type}`;
    dbConnectionMessage.textContent = message;
    dbConnectionStatus.style.display = 'flex';
    if (type === 'success') {
      setTimeout(() => {
        dbConnectionStatus.style.display = 'none';
      }, 5000);
    }
  }

  function updateLastSyncTime(value = null) {
    const now = value ? new Date(value) : new Date();
    if (Number.isNaN(now.getTime())) {
      if (cloudDbLastSyncTime) cloudDbLastSyncTime.textContent = tCloud('cloudDbNeverSynced');
      return;
    }
    localStorage.setItem('cloudDbLastSync', now.toISOString());
    if (cloudDbLastSyncTime) {
      cloudDbLastSyncTime.textContent = formatDateTime(now);
    }
  }

  function readCachedCloudDbSettings() {
    try {
      const saved = localStorage.getItem('cloudDbSettings');
      if (!saved) return null;
      const parsed = JSON.parse(saved);
      return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : null;
    } catch (_) {
      return null;
    }
  }

  function writeCachedCloudDbSettings(settings = {}) {
    try {
      localStorage.setItem('cloudDbSettings', JSON.stringify({
        url: settings.url || '',
        token: settings.token || '',
        savedAt: settings.savedAt || new Date().toISOString()
      }));
    } catch (_) {}
  }

  async function getEffectiveCloudDbSettings() {
    const api = getAPI();
    const cachedSettings = readCachedCloudDbSettings() || null;
    let backendSettings = null;

    try {
      if (api?.getCloudDbSettings) {
        const result = await api.getCloudDbSettings();
        if (result?.success && result.settings && typeof result.settings === 'object') {
          backendSettings = result.settings;
        }
      }
    } catch (_) {}

    if (backendSettings || cachedSettings) {
      return {
        ...(cachedSettings || {}),
        ...(backendSettings || {}),
        token: backendSettings?.token || cachedSettings?.token || ''
      };
    }

    return null;
  }

  async function resolveCloudTokenForUrl(url, fallbackToken = '') {
    const explicitToken = String(fallbackToken || '').trim();
    if (explicitToken) return explicitToken;

    const effectiveSettings = await getEffectiveCloudDbSettings();
    const savedUrl = String(effectiveSettings?.url || '').trim();
    const savedToken = String(effectiveSettings?.token || '').trim();
    if (savedToken && savedUrl && savedUrl === String(url || '').trim()) {
      return savedToken;
    }

    return '';
  }

  async function refreshCloudSyncStatus() {
    try {
      const api = getAPI();
      if (api?.getCloudSyncStatus) {
        const result = await api.getCloudSyncStatus();
        if (result?.success) {
          setCloudDbStatus(result.connected ? 'connected' : 'disconnected');
          if (result.lastSync) {
            updateLastSyncTime(result.lastSync);
            return;
          }
          if (cloudDbLastSyncTime) cloudDbLastSyncTime.textContent = tCloud('cloudDbNeverSynced');
          return;
        }
      }
    } catch (_) {}
    const fallbackLastSync = localStorage.getItem('cloudDbLastSync');
    if (fallbackLastSync) updateLastSyncTime(fallbackLastSync);
    else if (cloudDbLastSyncTime) cloudDbLastSyncTime.textContent = tCloud('cloudDbNeverSynced');
  }

  function startCloudSyncStatusRefresh() {
    if (cloudSyncStatusIntervalId) clearInterval(cloudSyncStatusIntervalId);
    cloudSyncStatusIntervalId = setInterval(() => {
      refreshCloudSyncStatus();
    }, 15000);
  }

  function updateCloudModeUI(isCloud, canUseCloud = true) {
    if (dbModeLocal) dbModeLocal.checked = !isCloud;
    if (dbModeCloud) {
      dbModeCloud.checked = isCloud;
      dbModeCloud.disabled = !canUseCloud || !hasPermission('cloud_settings_edit');
    }
    if (!cloudModeNote) return;
    if (!canUseCloud) {
      cloudModeNote.innerHTML = `<i class="fa-solid fa-exclamation-triangle"></i><span>${tCloud('cloudModeConnectFirst')}</span>`;
      cloudModeNote.style.background = 'rgba(239, 68, 68, 0.1)';
      cloudModeNote.style.color = '#ef4444';
      return;
    }
    if (isCloud) {
      cloudModeNote.innerHTML = `<i class="fa-solid fa-cloud"></i><span>${tCloud('cloudModeNote')}</span>`;
      cloudModeNote.style.background = 'rgba(16, 185, 129, 0.1)';
      cloudModeNote.style.color = '#10b981';
    } else {
      cloudModeNote.innerHTML = `<i class="fa-solid fa-hard-drive"></i><span>${tCloud('cloudModeLocal')}</span>`;
      cloudModeNote.style.background = 'rgba(59, 130, 246, 0.1)';
      cloudModeNote.style.color = '#3b82f6';
    }
  }

  async function loadCloudDbSettings() {
    try {
      const api = getAPI();
      const settings = await getEffectiveCloudDbSettings();
      if (!settings) return;
      if (cloudDbUrl) cloudDbUrl.value = settings.url || '';
      if (cloudDbToken) cloudDbToken.value = settings.token || '';
      await refreshCloudSyncStatus();
      if (settings.url && settings.token) {
        setCloudDbStatus('testing');
        try {
          if (api?.testCloudDbConnection) {
            const result = await api.testCloudDbConnection({ url: settings.url, token: settings.token });
            setCloudDbStatus(result?.success ? 'connected' : 'disconnected');
          } else {
            setCloudDbStatus('connected');
          }
        } catch (_) {
          setCloudDbStatus('disconnected');
        }
      }
    } catch (_) {}
  }

  async function loadCloudModeSettings() {
    try {
      const api = getAPI();
      if (!api?.getCloudMode) return;
      const result = await api.getCloudMode();
      if (!result?.success) return;
      let hasCloudSettings = false;
      if (api.getCloudDbSettings) {
        const settingsResult = await api.getCloudDbSettings();
        hasCloudSettings = !!(settingsResult?.success && settingsResult?.settings?.url);
      } else {
        hasCloudSettings = !!localStorage.getItem('cloudDbSettings');
      }
      const activeMode = typeof result.activeMode === 'boolean' ? result.activeMode : !!result.cloudMode;
      updateCloudModeUI(activeMode, !!(result.connected || hasCloudSettings));
    } catch (_) {}
  }

  async function setCloudMode(enabled) {
    if (!checkPermission('cloud_settings_edit', tCloud('cloudEditPermission'))) {
      loadCloudModeSettings();
      return;
    }
    try {
      const api = getAPI();
      if (!api?.setCloudMode) return;
      const result = await api.setCloudMode(enabled);
      if (result?.success) {
        const activeMode = typeof result.activeMode === 'boolean' ? result.activeMode : !!result.cloudMode;
        updateCloudModeUI(activeMode, true);
        await refreshCloudSyncStatus();
        showToast(enabled ? tCloud('cloudModeEnabled') : tCloud('cloudModeDisabled'), 'ok');
        if (window.parent && window.parent !== window) {
          window.parent.postMessage({ type: 'db-mode-changed', cloudMode: activeMode }, '*');
        }
      } else {
        showToast(result?.error || tCloud('cloudDbSaveFailed'), 'err');
        loadCloudModeSettings();
      }
    } catch (err) {
      showToast(err?.message || tCloud('cloudDbSaveFailed'), 'err');
      loadCloudModeSettings();
    }
  }

  function setSyncButtonsDisabled(disabled) {
    if (btnSyncLocalToCloud) btnSyncLocalToCloud.disabled = disabled || !hasPermission('cloud_settings_sync');
    if (btnSyncCloudToLocal) btnSyncCloudToLocal.disabled = disabled || !hasPermission('cloud_settings_sync');
    if (btnUploadLocalToCloud) btnUploadLocalToCloud.disabled = disabled || !hasPermission('cloud_settings_upload');
    if (btnSaveAutoSync) btnSaveAutoSync.disabled = disabled || !hasPermission('cloud_settings_sync');
  }

  function resetSyncProgress(title, subtitle, total) {
    if (syncProgressPanel) syncProgressPanel.style.display = 'block';
    if (syncProgressTitle) syncProgressTitle.textContent = title || '—';
    if (syncProgressSubtitle) syncProgressSubtitle.textContent = subtitle || '—';
    if (syncProgressCount) syncProgressCount.textContent = `0 / ${total || 0}`;
    if (syncProgressPercent) syncProgressPercent.textContent = '0%';
    if (syncProgressRing) syncProgressRing.style.strokeDashoffset = String(SYNC_RING_CIRCUMFERENCE);
  }

  function updateSyncProgress(done, total, subtitleText) {
    const safeTotal = Math.max(1, Number(total || 0));
    const safeDone = Math.max(0, Math.min(safeTotal, Number(done || 0)));
    const percent = Math.round((safeDone / safeTotal) * 100);
    if (syncProgressCount) syncProgressCount.textContent = `${safeDone} / ${safeTotal}`;
    if (syncProgressPercent) syncProgressPercent.textContent = `${percent}%`;
    if (syncProgressSubtitle && subtitleText) syncProgressSubtitle.textContent = subtitleText;
    if (syncProgressRing) {
      syncProgressRing.style.strokeDasharray = String(SYNC_RING_CIRCUMFERENCE);
      syncProgressRing.style.strokeDashoffset = String(SYNC_RING_CIRCUMFERENCE - (percent / 100) * SYNC_RING_CIRCUMFERENCE);
    }
  }

  function renderSyncDetailRows(tables) {
    if (!syncDetailsList) return;
    syncDetailsList.innerHTML = (tables || []).map((table) => `
      <div class="sync-detail-item" id="sync-row-${table.name}">
        <span class="detail-status pending" id="sync-status-${table.name}"><i class="fa-solid fa-circle"></i></span>
        <span class="detail-name">${getTableLabel(table.name)}</span>
        <span class="detail-meta" id="sync-meta-${table.name}">${table.meta || ''}</span>
      </div>
    `).join('');
  }

  function updateSyncDetailRow(tableName, status, metaText) {
    const statusEl = document.getElementById(`sync-status-${tableName}`);
    const metaEl = document.getElementById(`sync-meta-${tableName}`);
    if (metaEl && metaText !== undefined) metaEl.textContent = metaText;
    if (!statusEl) return;
    statusEl.className = `detail-status ${status}`;
    if (status === 'loading') statusEl.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
    else if (status === 'success') statusEl.innerHTML = '<i class="fa-solid fa-check"></i>';
    else if (status === 'error') statusEl.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    else statusEl.innerHTML = '<i class="fa-solid fa-circle"></i>';
  }

  function resetUploadProgress(title, subtitle, total) {
    if (uploadProgressPanel) uploadProgressPanel.style.display = 'block';
    if (uploadProgressTitle) uploadProgressTitle.textContent = title || '—';
    if (uploadProgressSubtitle) uploadProgressSubtitle.textContent = subtitle || '—';
    if (uploadProgressCount) uploadProgressCount.textContent = `0 / ${total || 0}`;
    if (uploadProgressPercent) uploadProgressPercent.textContent = '0%';
    if (uploadProgressRing) uploadProgressRing.style.strokeDashoffset = String(SYNC_RING_CIRCUMFERENCE);
  }

  function updateUploadProgress(done, total, subtitleText) {
    const safeTotal = Math.max(1, Number(total || 0));
    const safeDone = Math.max(0, Math.min(safeTotal, Number(done || 0)));
    const percent = Math.round((safeDone / safeTotal) * 100);
    if (uploadProgressCount) uploadProgressCount.textContent = `${safeDone} / ${safeTotal}`;
    if (uploadProgressPercent) uploadProgressPercent.textContent = `${percent}%`;
    if (uploadProgressSubtitle && subtitleText) uploadProgressSubtitle.textContent = subtitleText;
    if (uploadProgressRing) {
      uploadProgressRing.style.strokeDasharray = String(SYNC_RING_CIRCUMFERENCE);
      uploadProgressRing.style.strokeDashoffset = String(SYNC_RING_CIRCUMFERENCE - (percent / 100) * SYNC_RING_CIRCUMFERENCE);
    }
  }

  function renderUploadDetailRows(tables) {
    if (!uploadDetailsList) return;
    uploadDetailsList.innerHTML = (tables || []).map((table) => `
      <div class="sync-detail-item" id="upload-row-${table.name}">
        <span class="detail-status pending" id="upload-status-${table.name}"><i class="fa-solid fa-circle"></i></span>
        <span class="detail-name">${getTableLabel(table.name)}</span>
        <span class="detail-meta" id="upload-meta-${table.name}">${table.meta || ''}</span>
      </div>
    `).join('');
  }

  function updateUploadDetailRow(tableName, status, metaText) {
    const statusEl = document.getElementById(`upload-status-${tableName}`);
    const metaEl = document.getElementById(`upload-meta-${tableName}`);
    if (metaEl && metaText !== undefined) metaEl.textContent = metaText;
    if (!statusEl) return;
    statusEl.className = `detail-status ${status}`;
    if (status === 'loading') statusEl.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
    else if (status === 'success') statusEl.innerHTML = '<i class="fa-solid fa-check"></i>';
    else if (status === 'error') statusEl.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    else statusEl.innerHTML = '<i class="fa-solid fa-circle"></i>';
  }

  function getAutoSyncIntervalSeconds() {
    const value = Number(autoSyncInterval?.value || 0);
    const unit = autoSyncUnit?.value || 'seconds';
    if (!Number.isFinite(value) || value <= 0) return 0;
    if (unit === 'minutes') return value * 60;
    if (unit === 'hours') return value * 3600;
    return value;
  }

  function persistAutoSyncSettings(settings) {
    localStorage.setItem('cloudAutoSyncSettings', JSON.stringify(settings));
  }

  function applyAutoSyncControlsState() {
    if (!autoSyncControls || !autoSyncEnabled) return;
    const isEnabled = !!autoSyncEnabled.checked;
    autoSyncControls.classList.toggle('disabled', !isEnabled);
    if (autoSyncInterval) autoSyncInterval.disabled = !isEnabled || !hasPermission('cloud_settings_sync');
    if (autoSyncUnit) autoSyncUnit.disabled = !isEnabled || !hasPermission('cloud_settings_sync');
  }

  async function applyAutoSyncSettings(settings) {
    const api = getAPI();
    if (!api) return { success: false, error: tCloud('apiNotAvailable') };
    if (!settings.enabled) {
      if (api.stopPeriodicSync) return (await api.stopPeriodicSync(settings)) || { success: true };
      return { success: true };
    }
    if (!api.startPeriodicSync) return { success: false, error: tCloud('apiNotAvailable') };
    return api.startPeriodicSync(settings);
  }

  async function loadAutoSyncSettings() {
    let settings = { enabled: false, value: 30, unit: 'seconds' };
    const api = getAPI();
    try {
      if (api?.getAutoSyncSettings) {
        const result = await api.getAutoSyncSettings();
        if (result?.success && result.settings) {
          settings = {
            enabled: result.settings.enabled === true,
            value: Number(result.settings.value || 30),
            unit: result.settings.unit || 'seconds'
          };
        }
      }
      if (!api?.getAutoSyncSettings) {
        const raw = localStorage.getItem('cloudAutoSyncSettings');
        if (raw) settings = JSON.parse(raw);
      }
    } catch (_) {
      try {
        const raw = localStorage.getItem('cloudAutoSyncSettings');
        if (raw) settings = JSON.parse(raw);
      } catch (_) {}
    }
    if (autoSyncEnabled) autoSyncEnabled.checked = settings.enabled === true;
    if (autoSyncInterval) autoSyncInterval.value = String(Math.max(1, Number(settings.value || 30)));
    if (autoSyncUnit) autoSyncUnit.value = settings.unit || 'seconds';
    applyAutoSyncControlsState();
  }

  async function handleSyncLocalToCloud() {
    if (!checkPermission('cloud_settings_sync', tCloud('cloudSyncPermission')) || syncState.running) return;
    const api = getAPI();
    if (!api) {
      showCloudDbMessage(tCloud('apiNotAvailable'), 'error');
      return;
    }
    const passwordConfirmed = await showCloudPasswordModal({
      title: tCloud('cloudPasswordSyncTitle'),
      message: tCloud('cloudPasswordSyncMessage'),
      confirmText: tCloud('confirmBtn'),
      cancelText: tCloud('cancelBtn')
    });
    if (!passwordConfirmed) return;
    const confirmed = await showConfirmModal({
      type: 'upload',
      title: tCloud('syncConfirmLocalToCloudTitle'),
      message: tCloud('syncConfirmLocalToCloudMessage'),
      confirmText: tCloud('syncLocalToCloud'),
      cancelText: tCloud('cancelBtn')
    });
    if (!confirmed) return;
    syncState.running = true;
    setSyncButtonsDisabled(true);
    try {
      const countsResult = await api.getUploadTableCounts?.();
      if (!countsResult?.success || !Array.isArray(countsResult.tables)) {
        throw new Error(countsResult?.error || tCloud('readTablesFailed'));
      }
      const tables = countsResult.tables;
      resetSyncProgress(tCloud('syncCardTitle'), tCloud('syncRunningLocalToCloud'), tables.length);
      renderSyncDetailRows(tables.map((t) => ({ name: t.name, meta: `${Number(t.count || 0)} ${tCloud('record')}` })));
      let done = 0;
      const errors = [];
      let uploadedRecords = 0;
      for (const table of tables) {
        updateSyncDetailRow(table.name, 'loading', `${tCloud('uploading')} (${Number(table.count || 0)} ${tCloud('record')})`);
        const rowResult = await api.uploadTableToCloud?.(table.name);
        done += 1;
        if (rowResult?.success) {
          const uploaded = Number(rowResult.count || 0);
          uploadedRecords += uploaded;
          updateSyncDetailRow(table.name, 'success', `${uploaded} ${tCloud('record')}`);
        } else {
          errors.push({ table: table.name, error: rowResult?.error || tCloud('unknownError') });
          updateSyncDetailRow(table.name, 'error', rowResult?.error || tCloud('failed'));
        }
        updateSyncProgress(done, tables.length, tCloud('syncRunningLocalToCloud'));
      }
      if (errors.length > 0) throw new Error(tCloud('failedInTables').replace('{count}', errors.length));
      await refreshCloudSyncStatus();
      showCloudDbMessage(`${tCloud('syncCompletedLocalToCloud')} (${uploadedRecords} ${tCloud('record')})`, 'success');
    } catch (err) {
      showCloudDbMessage(tCloud('syncFailedWithError').replace('{error}', err.message || tCloud('unknownError')), 'error');
    } finally {
      syncState.running = false;
      setSyncButtonsDisabled(false);
    }
  }

  async function handleUploadLocalToCloud() {
    if (!checkPermission('cloud_settings_upload', tCloud('cloudUploadPermission')) || syncState.running) return;
    const api = getAPI();
    if (!api) {
      showCloudDbMessage(tCloud('apiNotAvailable'), 'error');
      return;
    }
    const passwordConfirmed = await showCloudPasswordModal({
      title: tCloud('cloudPasswordUploadTitle'),
      message: tCloud('cloudPasswordUploadMessage'),
      confirmText: tCloud('confirmBtn'),
      cancelText: tCloud('cancelBtn')
    });
    if (!passwordConfirmed) return;
    let previewCountsResult = null;
    try {
      previewCountsResult = await api.getUploadTableCounts?.();
    } catch (_) {
      previewCountsResult = null;
    }
    const previewTableCount = previewCountsResult?.success && Array.isArray(previewCountsResult.tables)
      ? previewCountsResult.tables.length
      : 0;
    const confirmed = await showConfirmModal({
      type: 'danger',
      title: tCloud('uploadConfirmTitle'),
      message: getUploadConfirmMessage(previewTableCount),
      confirmText: tCloud('uploadConfirmBtn'),
      cancelText: tCloud('cancelBtn')
    });
    if (!confirmed) return;
    syncState.running = true;
    setSyncButtonsDisabled(true);
    try {
      const countsResult = previewCountsResult?.success && Array.isArray(previewCountsResult.tables)
        ? previewCountsResult
        : await api.getUploadTableCounts?.();
      if (!countsResult?.success || !Array.isArray(countsResult.tables)) {
        throw new Error(countsResult?.error || tCloud('readTablesFailed'));
      }
      const tables = countsResult.tables;
      resetUploadProgress(tCloud('uploadToCloud'), tCloud('syncRunningLocalToCloud'), tables.length);
      renderUploadDetailRows(tables.map((t) => ({ name: t.name, meta: `${Number(t.count || 0)} ${tCloud('record')}` })));
      let done = 0;
      const errors = [];
      let uploadedRecords = 0;
      for (const table of tables) {
        updateUploadDetailRow(table.name, 'loading', `${tCloud('uploading')} (${Number(table.count || 0)} ${tCloud('record')})`);
        const rowResult = await api.uploadTableToCloud?.(table.name);
        done += 1;
        if (rowResult?.success) {
          const uploaded = Number(rowResult.count || 0);
          uploadedRecords += uploaded;
          updateUploadDetailRow(table.name, 'success', `${uploaded} ${tCloud('record')}`);
        } else {
          errors.push({ table: table.name, error: rowResult?.error || tCloud('unknownError') });
          updateUploadDetailRow(table.name, 'error', rowResult?.error || tCloud('failed'));
        }
        updateUploadProgress(done, tables.length, tCloud('syncRunningLocalToCloud'));
      }
      if (errors.length > 0) throw new Error(tCloud('failedInTables').replace('{count}', errors.length));
      await refreshCloudSyncStatus();
      showCloudDbMessage(`${tCloud('syncCompletedLocalToCloud')} (${uploadedRecords} ${tCloud('record')})`, 'success');
    } catch (err) {
      showCloudDbMessage(tCloud('syncFailedWithError').replace('{error}', err.message || tCloud('unknownError')), 'error');
    } finally {
      syncState.running = false;
      setSyncButtonsDisabled(false);
    }
  }

  async function handleSyncCloudToLocal() {
    if (!checkPermission('cloud_settings_sync', tCloud('cloudSyncPermission')) || syncState.running) return;
    const api = getAPI();
    if (!api) {
      showCloudDbMessage(tCloud('apiNotAvailable'), 'error');
      return;
    }
    const confirmed = await showConfirmModal({
      type: 'warning',
      title: tCloud('syncConfirmCloudToLocalTitle'),
      message: tCloud('syncConfirmCloudToLocalMessage'),
      confirmText: tCloud('syncCloudToLocal'),
      cancelText: tCloud('cancelBtn')
    });
    if (!confirmed) return;
    syncState.running = true;
    setSyncButtonsDisabled(true);
    try {
      const beforeResult = await api.getUploadTableCounts?.();
      const initialTables = beforeResult?.success && Array.isArray(beforeResult.tables) ? beforeResult.tables : [];
      resetSyncProgress(tCloud('syncCardTitle'), tCloud('syncRunningCloudToLocal'), initialTables.length || 1);
      renderSyncDetailRows(initialTables.map((t) => ({ name: t.name, meta: `${tCloud('beforeSync')}: ${Number(t.count || 0)} ${tCloud('record')}` })));
      const pullResult = await api.fullPullFromCloud?.();
      if (!pullResult?.success) throw new Error(pullResult?.error || tCloud('unknownError'));
      const pullDetails = Array.isArray(pullResult.details) ? pullResult.details : [];
      const afterResult = await api.getUploadTableCounts?.();
      const afterTables = afterResult?.success && Array.isArray(afterResult.tables) ? afterResult.tables : initialTables;
      const detailMap = new Map(pullDetails.map((item) => [item.table, item]));
      const failedTables = pullDetails.filter((item) => item?.status === 'error');
      const successfulTables = pullDetails.filter((item) => item?.status === 'success');
      const totalPulled = Number(pullResult.changes || successfulTables.reduce((sum, item) => sum + Number(item?.count || 0), 0));
      let done = 0;
      for (const table of afterTables) {
        const detail = detailMap.get(table.name);
        done += 1;
        if (detail?.status === 'error') {
          updateSyncDetailRow(table.name, 'error', detail.error || tCloud('failed'));
        } else {
          const tableCount = detail ? Number(detail.count || 0) : Number(table.count || 0);
          updateSyncDetailRow(table.name, 'success', `${tCloud('afterSync')}: ${tableCount} ${tCloud('record')}`);
        }
        updateSyncProgress(done, afterTables.length || 1, tCloud('syncRunningCloudToLocal'));
        await new Promise((resolve) => setTimeout(resolve, 25));
      }
      await refreshCloudSyncStatus();
      showCloudDbMessage(
        `${tCloud('syncCompletedCloudToLocal')} (${totalPulled} ${tCloud('record')})${failedTables.length ? ` - ${tCloud('failedInTables').replace('{count}', failedTables.length)}` : ''}`,
        failedTables.length ? 'error' : 'success'
      );
    } catch (err) {
      showCloudDbMessage(tCloud('syncFailedWithError').replace('{error}', err.message || tCloud('unknownError')), 'error');
    } finally {
      syncState.running = false;
      setSyncButtonsDisabled(false);
    }
  }

  async function loadCurrentDbPath() {
    try {
      const api = getAPI();
      if (!api?.getCurrentDbPath || !dbPathInput) return;
      const result = await api.getCurrentDbPath();
      if (result?.success) {
        dbPathInput.value = result.path || '';
        await checkAndShowCloudWarning();
      }
    } catch (_) {}
  }

  async function checkAndShowCloudWarning() {
    try {
      const api = getAPI();
      if (!api?.checkIfCloudStorage) return;
      const result = await api.checkIfCloudStorage();
      if (result?.success && result.isCloudStorage) {
        showConnectionStatus(tCloud('cloudStorageWarning'), 'error');
      }
    } catch (_) {}
  }

  if (dbPathInput) {
    dbPathInput.addEventListener('paste', () => {
      setTimeout(() => {
        let path = dbPathInput.value.trim();
        path = path.replace(/\//g, '\\').replace(/^["']|["']$/g, '');
        dbPathInput.value = path;
      }, 10);
    });
    dbPathInput.addEventListener('focus', () => {
      if (hasPermission('cloud_settings_local_connect')) showConnectionStatus(tCloud('pathHint'), 'info');
    });
    dbPathInput.addEventListener('click', () => {
      if (btnSelectDbPath && hasPermission('cloud_settings_local_connect')) btnSelectDbPath.click();
    });
  }

  if (btnCopyDbPath && dbPathInput) {
    btnCopyDbPath.addEventListener('click', async () => {
      if (!checkPermission('cloud_settings_local_connect', tCloud('localConnectPermission'))) return;
      try {
        const path = dbPathInput.value.trim();
        if (!path) {
          showConnectionStatus(tCloud('noPathToCopy'), 'error');
          return;
        }
        await navigator.clipboard.writeText(path);
        showConnectionStatus(tCloud('pathCopied'), 'success');
      } catch (err) {
        showConnectionStatus(tCloud('copyPathFailed').replace('{error}', err.message || tCloud('unknownError')), 'error');
      }
    });
  }

  if (btnSelectDbPath) {
    btnSelectDbPath.addEventListener('click', async () => {
      if (!checkPermission('cloud_settings_local_connect', tCloud('localConnectPermission'))) return;
      try {
        const api = getAPI();
        if (!api?.selectDatabasePath) return;
        const result = await api.selectDatabasePath();
        if (result?.success && result.path && dbPathInput) {
          dbPathInput.value = result.path;
          showConnectionStatus(tCloud('pathSelectedConnect'), 'info');
        }
      } catch (err) {
        showConnectionStatus(tCloud('selectPathError').replace('{error}', err.message || tCloud('unknownError')), 'error');
      }
    });
  }

  if (btnConnectDb) {
    btnConnectDb.addEventListener('click', async () => {
      if (!checkPermission('cloud_settings_local_connect', tCloud('localConnectPermission'))) return;
      try {
        const dbPath = dbPathInput?.value?.trim() || '';
        if (!dbPath) {
          await window.showAlert(tCloud('enterDbPath'), tCloud('alertWarning'), 'warning');
          return;
        }
        if (!dbPath.toLowerCase().endsWith('.db')) {
          await window.showAlert(tCloud('dbPathMustEndWithDb'), tCloud('alertWarning'), 'warning');
          return;
        }
        const api = getAPI();
        if (!api?.connectToDatabase) {
          await window.showAlert(tCloud('apiNotAvailable'), tCloud('alertErrorTitle'), 'error');
          return;
        }
        btnConnectDb.disabled = true;
        btnConnectDb.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> ${tCloud('connecting')}`;
        const result = await api.connectToDatabase(dbPath);
        if (result?.success) {
          showConnectionStatus(result.message || tCloud('dbConnectSuccess'), 'success');
          if (result.isCloudStorage && result.warning) {
            await window.showAlert(tCloud('cloudDbWarningMessage'), tCloud('alertWarning'), 'warning');
          } else {
            await window.showAlert(tCloud('dbConnectedRestart'), tCloud('alertSuccess'), 'success');
          }
        } else {
          showConnectionStatus(result?.error || tCloud('dbConnectFailed'), 'error');
          await window.showAlert(`${tCloud('dbConnectFailed')}:\n\n${result?.error || tCloud('unknownError')}`, tCloud('alertErrorTitle'), 'error');
        }
      } catch (err) {
        showConnectionStatus(`${tCloud('errorPrefix')} ${err.message || tCloud('unknownError')}`, 'error');
        await window.showAlert(`${tCloud('errorOccurred')} ${err.message || tCloud('unknownError')}`, tCloud('alertErrorTitle'), 'error');
      } finally {
        btnConnectDb.disabled = !hasPermission('cloud_settings_local_connect');
        btnConnectDb.innerHTML = `<i class="fa-solid fa-plug"></i> ${tCloud('connectBtn')}`;
      }
    });
  }

  if (toggleTokenVisibility && cloudDbToken) {
    toggleTokenVisibility.addEventListener('click', () => {
      if (!hasPermission('cloud_settings_edit')) return;
      const type = cloudDbToken.type === 'password' ? 'text' : 'password';
      cloudDbToken.type = type;
      const icon = toggleTokenVisibility.querySelector('i');
      if (icon) icon.className = type === 'password' ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash';
    });
  }

  if (dbModeLocal) {
    dbModeLocal.addEventListener('change', async () => {
      if (dbModeLocal.checked) await setCloudMode(false);
    });
  }

  if (dbModeCloud) {
    dbModeCloud.addEventListener('change', async () => {
      if (dbModeCloud.checked) await setCloudMode(true);
    });
  }

  if (btnTestCloudDb) {
    btnTestCloudDb.addEventListener('click', async () => {
      if (!checkPermission('cloud_settings_edit', tCloud('cloudEditPermission'))) return;
      const url = cloudDbUrl?.value?.trim();
      const token = await resolveCloudTokenForUrl(url, cloudDbToken?.value?.trim());
      if (!url) {
        showCloudDbMessage(tCloud('cloudDbEnterUrl'), 'error');
        return;
      }
      if (!url.startsWith('libsql://')) {
        showCloudDbMessage(tCloud('cloudDbInvalidUrl'), 'error');
        return;
      }
      if (!token) {
        showCloudDbMessage(tCloud('cloudDbEnterToken'), 'error');
        return;
      }
      setCloudDbStatus('testing');
      btnTestCloudDb.disabled = true;
      btnTestCloudDb.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>${tCloud('cloudDbTesting')}</span>`;
      try {
        const api = getAPI();
        if (api?.testCloudDbConnection) {
          const result = await api.testCloudDbConnection({ url, token });
          if (result?.success) {
            setCloudDbStatus('connected');
            showCloudDbMessage(tCloud('cloudDbTestSuccess'), 'success');
            if (dbModeCloud) dbModeCloud.disabled = false;
            updateCloudModeUI(false, true);
            if (api.saveCloudDbSettings) await api.saveCloudDbSettings({ url, token });
            writeCachedCloudDbSettings({ url, token, savedAt: new Date().toISOString() });
            if (cloudDbToken) cloudDbToken.value = token;
          } else {
            setCloudDbStatus('disconnected');
            showCloudDbMessage(tCloud('cloudDbTestFailed').replace('{error}', result?.error || tCloud('unknownError')), 'error');
          }
        } else {
          setCloudDbStatus('connected');
          showCloudDbMessage(tCloud('cloudDbTestSuccess'), 'success');
        }
      } catch (err) {
        setCloudDbStatus('disconnected');
        showCloudDbMessage(tCloud('cloudDbTestFailed').replace('{error}', err.message || tCloud('unknownError')), 'error');
      } finally {
        btnTestCloudDb.disabled = !hasPermission('cloud_settings_edit');
        btnTestCloudDb.innerHTML = `<i class="fa-solid fa-plug"></i> <span>${tCloud('cloudDbTestConnection')}</span>`;
      }
    });
  }

  if (btnSaveCloudDb) {
    btnSaveCloudDb.addEventListener('click', async () => {
      if (!checkPermission('cloud_settings_edit', tCloud('cloudEditPermission'))) return;
      const url = cloudDbUrl?.value?.trim();
      const rawToken = cloudDbToken?.value?.trim();
      if (!url) {
        showCloudDbMessage(tCloud('cloudDbEnterUrl'), 'error');
        return;
      }
      if (!url.startsWith('libsql://')) {
        showCloudDbMessage(tCloud('cloudDbInvalidUrl'), 'error');
        return;
      }
      try {
        const token = await resolveCloudTokenForUrl(url, rawToken);
        if (!token) {
          showCloudDbMessage(tCloud('cloudDbEnterToken'), 'error');
          return;
        }
        const settings = { url, token, savedAt: new Date().toISOString() };
        writeCachedCloudDbSettings(settings);
        const api = getAPI();
        if (api?.saveCloudDbSettings) await api.saveCloudDbSettings({ url, token });
        if (cloudDbToken) cloudDbToken.value = token;
        showToast(tCloud('cloudDbSaved'), 'ok');
        showCloudDbMessage(tCloud('cloudDbSaved'), 'success');
      } catch (_) {
        showToast(tCloud('cloudDbSaveFailed'), 'err');
        showCloudDbMessage(tCloud('cloudDbSaveFailed'), 'error');
      }
    });
  }

  if (btnSyncLocalToCloud) btnSyncLocalToCloud.addEventListener('click', handleSyncLocalToCloud);
  if (btnSyncCloudToLocal) btnSyncCloudToLocal.addEventListener('click', handleSyncCloudToLocal);
  if (btnUploadLocalToCloud) btnUploadLocalToCloud.addEventListener('click', handleUploadLocalToCloud);

  if (autoSyncEnabled) {
    autoSyncEnabled.addEventListener('change', () => {
      applyAutoSyncControlsState();
    });
  }

  if (btnSaveAutoSync) {
    btnSaveAutoSync.addEventListener('click', async () => {
      if (!checkPermission('cloud_settings_sync', tCloud('cloudSyncPermission'))) return;
      const enabled = !!autoSyncEnabled?.checked;
      const rawValue = Number(autoSyncInterval?.value);
      const intervalSeconds = getAutoSyncIntervalSeconds();
      if (!Number.isFinite(rawValue) || rawValue <= 0 || (enabled && intervalSeconds <= 0)) {
        showToast(tCloud('autoSyncInvalidInterval'), 'err');
        showCloudDbMessage(tCloud('autoSyncInvalidInterval'), 'error');
        return;
      }
      const originalHtml = btnSaveAutoSync.innerHTML;
      btnSaveAutoSync.disabled = true;
      btnSaveAutoSync.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>${tCloud('saveAutoSync')}</span>`;
      try {
        const payload = {
          enabled,
          value: rawValue,
          unit: autoSyncUnit?.value || 'seconds',
          intervalSeconds
        };
        const result = await applyAutoSyncSettings(payload);
        if (!result?.success) throw new Error(result?.error || tCloud('unknownError'));
        const savedSettings = result?.settings || payload;
        persistAutoSyncSettings(savedSettings);
        showToast(enabled ? tCloud('autoSyncSaved') : tCloud('autoSyncStopped'), 'ok');
        showCloudDbMessage(enabled ? tCloud('autoSyncSaved') : tCloud('autoSyncStopped'), 'success');
      } catch (err) {
        const errorMessage = tCloud('syncFailedWithError').replace('{error}', err.message || tCloud('unknownError'));
        showToast(errorMessage, 'err');
        showCloudDbMessage(errorMessage, 'error');
      } finally {
        btnSaveAutoSync.disabled = !hasPermission('cloud_settings_sync');
        btnSaveAutoSync.innerHTML = originalHtml;
      }
    });
  }

  applyPermissionGuards();
  if (syncProgressRing) {
    syncProgressRing.style.strokeDasharray = String(SYNC_RING_CIRCUMFERENCE);
    syncProgressRing.style.strokeDashoffset = String(SYNC_RING_CIRCUMFERENCE);
  }
  if (uploadProgressRing) {
    uploadProgressRing.style.strokeDasharray = String(SYNC_RING_CIRCUMFERENCE);
    uploadProgressRing.style.strokeDashoffset = String(SYNC_RING_CIRCUMFERENCE);
  }
  loadCloudDbSettings();
  loadCloudModeSettings();
  loadAutoSyncSettings();
  refreshCloudSyncStatus();
  startCloudSyncStatusRefresh();
  loadCurrentDbPath();
}

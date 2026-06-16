// Company Settings - Simple Script

// ===== Confirm Modal System =====
function showConfirmModal(options = {}) {
  return new Promise((resolve) => {
    const overlay = document.getElementById('confirmModalOverlay');
    const icon = document.getElementById('confirmModalIcon');
    const title = document.getElementById('confirmModalTitle');
    const message = document.getElementById('confirmModalMessage');
    const confirmBtn = document.getElementById('confirmModalConfirm');
    const cancelBtn = document.getElementById('confirmModalCancel');
    
    if (!overlay) {
      // Fallback to native confirm if modal not found
      resolve(confirm(options.message || tSettings('areYouSure') || 'هل أنت متأكد؟'));
      return;
    }
    
    // Set content
    title.textContent = options.title || tSettings('confirmBtn') || 'تأكيد';
    message.textContent = options.message || tSettings('areYouSure') || 'هل أنت متأكد؟';
    
    // Set icon type
    const iconType = options.type || 'warning';
    const iconClasses = {
      warning: { icon: 'fa-exclamation-triangle', class: 'warning' },
      danger: { icon: 'fa-trash-can', class: 'danger' },
      info: { icon: 'fa-info-circle', class: 'info' },
      success: { icon: 'fa-check-circle', class: 'success' },
      upload: { icon: 'fa-cloud-arrow-up', class: 'upload' }
    };
    const iconConfig = iconClasses[iconType] || iconClasses.warning;
    icon.className = 'confirm-modal-icon ' + iconConfig.class;
    icon.innerHTML = `<i class="fa-solid ${iconConfig.icon}"></i>`;
    
    // Set button styles
    confirmBtn.className = 'confirm-modal-btn confirm ' + iconConfig.class;
    confirmBtn.querySelector('span').textContent = options.confirmText || tSettings('confirmBtn') || 'تأكيد';
    cancelBtn.querySelector('span').textContent = options.cancelText || tSettings('cancelBtn') || 'إلغاء';
    
    // Show modal
    overlay.classList.add('show');
    
    // Handle confirm
    const handleConfirm = () => {
      cleanup();
      resolve(true);
    };
    
    // Handle cancel
    const handleCancel = () => {
      cleanup();
      resolve(false);
    };
    
    // Handle overlay click
    const handleOverlayClick = (e) => {
      if (e.target === overlay) {
        handleCancel();
      }
    };
    
    // Handle escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleCancel();
      }
    };
    
    // Cleanup function
    const cleanup = () => {
      overlay.classList.remove('show');
      confirmBtn.removeEventListener('click', handleConfirm);
      cancelBtn.removeEventListener('click', handleCancel);
      overlay.removeEventListener('click', handleOverlayClick);
      document.removeEventListener('keydown', handleEscape);
    };
    
    // Add event listeners
    confirmBtn.addEventListener('click', handleConfirm);
    cancelBtn.addEventListener('click', handleCancel);
    overlay.addEventListener('click', handleOverlayClick);
    document.addEventListener('keydown', handleEscape);
  });
}

// ===== Translation System =====
const SETTINGS_TRANSLATIONS = {
  ar: {
    pageTitle: 'إعدادات الشركة',
    // Navigation pills
    navCompanyInfo: 'معلومات الشركة',
    navBackup: 'النسخ الاحتياطي',
    navCurrency: 'إدارة العملات',
    navStats: 'الإحصاءات',
    navSubscription: 'الاشتراك',
    navTheme: 'المظهر',
    // Theme Card
    themeTitle: 'المظهر والثيمات',
    themeMode: 'وضع العرض',
    lightMode: 'فاتح',
    darkMode: 'داكن',
    autoMode: 'تلقائي',
    themeColor: 'لون الثيم',
    themePreview: 'معاينة',
    saveTheme: 'حفظ المظهر',
    themeSaved: 'تم حفظ إعدادات المظهر بنجاح',
    themeSaveFailed: 'فشل في حفظ إعدادات المظهر',
    // Theme color names
    colorTurquoise: 'فيروزي',
    colorGold: 'ذهبي',
    colorBlue: 'أزرق',
    colorGreen: 'أخضر',
    colorPurple: 'بنفسجي',
    colorRed: 'أحمر',
    colorOrange: 'برتقالي',
    colorPink: 'وردي',
    colorSky: 'سماوي',
    colorGray: 'رمادي',
    colorNavy: 'كحلي',
    colorIndigo: 'نيلي',
    colorTeal: 'أزرق مخضر',
    colorRose: 'وردي داكن',
    colorAmber: 'كهرماني',
    colorCyan: 'سماوي فاتح',
    colorEmerald: 'زمردي',
    colorSlate: 'رمادي داكن',
    colorViolet: 'بنفسجي',
    colorRoyal: 'ملكي',
    colorSage: 'زيتوني',
    colorSunset: 'غروب',
    colorOrchid: 'أوركيد',
    colorCharcoal: 'فحمي',
    // Company Info Card
    companyInfoTitle: 'معلومات الشركة',
    logoAlt: 'شعار الشركة',
    logoPlaceholder: 'انقر لإضافة شعار',
    logoHint: 'انقر على الدائرة لتغيير الشعار',
    companyName: 'اسم الشركة',
    companyNamePlaceholder: 'مثال: شركة الذهب للمحاسبة',
    companyNameEn: 'Company Name (English)',
    companyNameEnPlaceholder: 'e.g. Gold Accounting Company',
    address: 'العنوان',
    addressPlaceholder: 'مثال: الرياض، المملكة العربية السعودية',
    addressEn: 'Address (English)',
    addressEnPlaceholder: 'e.g. Riyadh, Saudi Arabia',
    taxNumber: 'الرقم الضريبي',
    taxPlaceholder: 'مثال: 300040394304303',
    phone: 'رقم الهاتف',
    phonePlaceholder: 'مثال: +966 50 123 4567',
    email: 'البريد الإلكتروني',
    emailPlaceholder: 'مثال: info@company.com',
    website: 'الموقع الإلكتروني',
    websitePlaceholder: 'مثال: www.company.com',
    saveInfo: 'حفظ المعلومات',
    // Backup Card
    backupTitle: 'النسخ الاحتياطي التلقائي',
    enableAutoBackup: 'تفعيل النسخ الاحتياطي التلقائي',
    backupDesc: 'يتم إنشاء نسخة احتياطية دورية من قاعدة البيانات تلقائياً',
    intervalLabel: 'التكرار (كل كم ساعة)',
    hour: 'ساعة',
    keepCountLabel: 'عدد النسخ المحفوظة',
    copy: 'نسخة',
    lastBackup: 'آخر نسخة احتياطية:',
    existingBackups: 'عدد النسخ الموجودة:',
    nextBackup: 'النسخة القادمة بعد:',
    loading: 'جار التحميل...',
    creating: 'جار الإنشاء...',
    createBackupNow: 'إنشاء نسخة الآن',
    viewBackups: 'عرض النسخ',
    openFolder: 'فتح المجلد',
    saveSettings: 'حفظ الإعدادات',
    // Currency Card
    currencyTitle: 'إدارة العملات وأسعار الصرف',
    refreshRates: 'تحديث أسعار الصرف',
    addCurrency: 'إضافة عملة',
    defaultCurrency: 'العملة الافتراضية:',
    totalCurrencies: 'إجمالي العملات:',
    lastUpdate: 'آخر تحديث:',
    today: 'اليوم',
    searchCurrency: 'ابحث عن عملة بالاسم أو الرمز...',
    filterAll: 'الكل',
    filterArab: 'عربية',
    filterWorld: 'عالمية',
    colFlag: 'العلم',
    colName: 'اسم العملة',
    colCode: 'الرمز',
    colSymbol: 'العلامة',
    colRate: 'سعر الصرف',
    colDefault: 'افتراضي',
    colActions: 'الإجراءات',
    noCurrencies: 'لا توجد عملات متاحة',
    addNewCurrency: 'إضافة عملة جديدة',
    // Stats Card
    statsTitle: 'إحصاءات الجداول',
    refresh: 'تحديث',
    tableCount: 'عدد الجداول:',
    dbPath: 'المسار:',
    dbManagement: 'إدارة قاعدة البيانات',
    exportDb: 'تصدير قاعدة البيانات',
    importDb: 'استيراد قاعدة البيانات',
    // Subscription Card
    premiumBadge: 'اشتراك مميز',
    subscriptionInfo: 'معلومات الاشتراك',
    subscriptionStatus: 'حالة الاشتراك',
    daysRemaining: 'الأيام المتبقية',
    day: 'يوم',
    startDate: 'تاريخ البدء',
    expiryDate: 'تاريخ الانتهاء',
    usagePercent: 'نسبة الاستهلاك',
    deviceId: 'معرف الجهاز',
    copyBtn: 'نسخ',
    licenseType: 'نوع الترخيص',
    subscriptionUsage: 'استهلاك الاشتراك',
    fromDays: 'من {days} يوم',
    warning: 'تنبيه!',
    licenseExpiring: 'الترخيص على وشك الانتهاء!',
    licenseActive: 'الاشتراك فعّال',
    licenseInactive: 'الاشتراك غير فعّال',
    activeSubscription: 'اشتراك نشط',
    pleaseActivate: 'يرجى تفعيل الاشتراك',
    licenseExpiredOrInvalid: 'الترخيص منتهٍ أو غير صالح. يرجى التجديد.',
    ofDays: 'من {total} يوم',
    notAvailable: 'غير متاح',
    renewSubscription: 'تجديد الاشتراك',
    renewDesc: 'تواصل معنا للتجديد أو الترقية',
    whatsapp: 'واتساب',
    emailBtn: 'البريد الإلكتروني',
    // Toast messages
    infoSaved: 'تم حفظ معلومات الشركة بنجاح',
    infoSaveFailed: 'فشل في حفظ معلومات الشركة',
    backupCreated: 'تم إنشاء النسخة الاحتياطية بنجاح',
    backupFailed: 'فشل في إنشاء النسخة الاحتياطية',
    settingsSaved: 'تم حفظ الإعدادات بنجاح',
    copied: 'تم النسخ!',
    logoUpdated: 'تم تحديث الشعار',
    logoFailed: 'فشل اختيار الشعار',
    logoPickUnavailable: 'اختيار الشعار غير متوفر في هذا الوضع',
    backupSettingsSaved: 'تم حفظ إعدادات النسخ الاحتياطي بنجاح',
    backupSettingsFailed: 'فشل حفظ الإعدادات',
    backupCreateFailed: 'فشل إنشاء النسخة',
    backupCreateError: 'حدث خطأ أثناء الإنشاء',
    infoSaveError: 'حدث خطأ أثناء الحفظ',
    taxNumberIncomplete: 'الرقم الضريبي غير مكتمل (15 رقم مطلوب)',
    taxNumberMustBe15: 'الرقم الضريبي يجب أن يكون 15 رقمًا فقط',
    unknownError: 'خطأ غير معروف',
    folderOpened: 'تم فتح مجلد النسخ الاحتياطي',
    folderOpenFailed: 'فشل فتح المجلد',
    listRefreshed: 'تم تحديث القائمة',
    listLoadFailed: 'فشل تحميل القائمة',
    updatingRates: 'جاري تحديث أسعار الصرف...',
    deviceIdCopied: 'تم نسخ معرف الجهاز',
    funcNotAvailable: 'الوظيفة غير متوفرة',
    modalNotReady: 'النافذة المنبثقة غير جاهزة، يرجى المحاولة بعد ثانية',
    hoursAndMinutes: '{hours} ساعة و {minutes} دقيقة',
    minutesOnly: '{minutes} دقيقة',
    verySoon: 'قريباً جداً',
    afterAppStart: 'بعد 5 ثوانٍ من بدء البرنامج',
    noBackupYet: 'لم يتم إنشاء نسخة بعد',
    onNextAppStart: 'عند بدء البرنامج القادم',
    // Backup info toast labels
    backupInfoTitle: 'معلومات النسخة:',
    backupInfoName: 'اسم النسخة',
    backupInfoDateTime: 'التاريخ والوقت',
    backupInfoSize: 'الحجم',
    // License types
    licenseMonthly: 'شهري',
    licenseQuarterly: 'ربع سنوي',
    licenseSemiAnnual: 'نصف سنوي',
    licenseYearly: 'سنوي',
    licensePermanent: 'دائم',
    // Export/Import Modal
    exportDbTitle: 'تصدير قاعدة البيانات',
    importDbTitle: 'استيراد قاعدة البيانات',
    close: 'إغلاق',
    selectAll: 'تحديد الكل (تصدير ملف .db كامل)',
    selectAllHint: '💡 عند تحديد الكل: يتم تصدير/استيراد ملف قاعدة البيانات (.db) كامل',
    preparing: 'جار التحضير...',
    cancel: 'إلغاء',
    startExport: 'ابدأ التصدير',
    startImport: 'ابدأ الاستيراد',
    exporting: 'جار التصدير...',
    importing: 'جار الاستيراد...',
    exportComplete: 'تم التصدير بنجاح!',
    importComplete: 'تم الاستيراد بنجاح!',
    exportFailed: 'فشل التصدير',
    importFailed: 'فشل الاستيراد',
    // Backup List Modal
    backupListTitle: 'النسخ الاحتياطية المحفوظة',
    searchBackup: 'ابحث عن نسخة احتياطية...',
    total: 'إجمالي:',
    size: 'الحجم:',
    backupName: 'اسم النسخة',
    date: 'التاريخ',
    time: 'الوقت',
    actions: 'الإجراءات',
    noBackups: 'لا توجد نسخ احتياطية متوفرة',
    ok: 'موافق',
    restore: 'استعادة',
    delete: 'حذف',
    // Currency Form Modal
    addCurrencyTitle: 'إضافة عملة جديدة',
    editCurrencyTitle: 'تعديل العملة',
    currencyName: 'اسم العملة',
    currencyNamePlaceholder: 'مثال: ريال سعودي',
    currencyCode: 'رمز العملة (Code)',
    currencyCodePlaceholder: 'مثال: SAR',
    currencyCodeHint: '3 أحرف بالإنجليزية (مثل: SAR, USD, EUR)',
    currencySymbol: 'علامة العملة (Symbol)',
    currencySymbolPlaceholder: 'مثال: ر.س أو $',
    exchangeRate: 'سعر الصرف مقابل العملة الافتراضية',
    exchangeRatePlaceholder: 'مثال: 1.00',
    exchangeRateHint: 'أدخل سعر وحدة واحدة من هذه العملة مقابل العملة الافتراضية',
    currencyType: 'نوع العملة',
    selectType: 'اختر النوع',
    arabCurrency: 'عملة عربية',
    worldCurrency: 'عملة عالمية',
    countryFlag: 'علم الدولة (Emoji)',
    countryFlagPlaceholder: 'مثال: 🇸🇦',
    countryFlagHint: 'اختياري - يمكنك نسخ emoji العلم من لوحة المفاتيح',
    fontAwesomeIcon: 'أيقونة FontAwesome',
    setAsDefault: 'تعيين كعملة افتراضية',
    saveCurrency: 'حفظ العملة',
    // Table names (28 tables)
    tblCompanyInfo: 'معلومات الشركة',
    tblCurrencies: 'العملات',
    tblAccountTypes: 'أنواع الحسابات',
    tblAccounts: 'الحسابات',
    tblCustomers: 'العملاء',
    tblSuppliers: 'الموردين',
    tblCategories: 'التصنيفات',
    tblUsers: 'المستخدمين',
    tblPermissions: 'الصلاحيات',
    tblUserPermissions: 'صلاحيات المستخدمين',
    tblGoldItems: 'أصناف الذهب',
    tblGoldKarats: 'عيارات الذهب',
    tblPayments: 'سندات الصرف',
    tblPaymentLines: 'تفاصيل سندات الصرف',
    tblReceipts: 'سندات القبض',
    tblReceiptLines: 'تفاصيل سندات القبض',
    tblSalesInvoices: 'فواتير المبيعات',
    tblSalesInvoiceDetails: 'تفاصيل فواتير المبيعات',
    tblPurchaseInvoices: 'فواتير المشتريات',
    tblPurchaseInvoiceDetails: 'تفاصيل فواتير المشتريات',
    tblJournalEntries: 'القيود اليومية',
    tblJournalLines: 'تفاصيل القيود اليومية',
    tblOpeningBalances: 'الأرصدة الافتتاحية',
    tblOpeningLines: 'تفاصيل الأرصدة الافتتاحية',
    tblOrders: 'الأوردرات',
    tblDefaultBoxes: 'الصناديق الافتراضية',
    tblTaxDeclarations: 'الإقرارات الضريبية',
    tblInvoiceSettings: 'إعدادات الفواتير',
    tblBranches: 'الفروع',
    tblUserBranches: 'فروع المستخدمين',
    tblCustomerBranches: 'فروع العملاء',
    tblSupplierBranches: 'فروع الموردين',
    tblDetails: 'تفاصيل',
    dependencies: 'تبعيات',
    // Alert and progress messages
    selectTableAlert: 'يرجى تحديد جدول واحد على الأقل',
    alertWarning: 'تنبيه',
    alertError: 'خطأ',
    errorOccurred: 'حدث خطأ:',
    exportingFullDb: 'جار تصدير قاعدة البيانات كاملة...',
    apiNotAvailable: 'API غير متوفر',
    selectingSavePath: 'جار اختيار موقع الحفظ...',
    exportDbSuccess: '✓ تم تصدير قاعدة البيانات كاملة بنجاح!',
    dbFileSaved: 'تم حفظ ملف قاعدة البيانات (.db)',
    exportDbSuccessMsg: 'تم تصدير قاعدة البيانات كاملة بنجاح!\n\nتم حفظ ملف قاعدة البيانات بامتداد .db',
    exportSuccess: 'نجح التصدير',
    exportFailedStatus: '✗ فشل التصدير',
    unknownError: 'خطأ غير معروف',
    exportDbFailedMsg: 'فشل تصدير قاعدة البيانات:\n\n',
    errorOccurredStatus: '✗ حدث خطأ',
    preparingFullExport: 'جار تحضير تصدير قاعدة البيانات كاملة...',
    exportingTable: 'جار تصدير:',
    tableLabel: 'الجدول:',
    exportCompleteMsg: '✓ تم تصدير {count} سجل بنجاح!',
    importingFullDb: 'جار استيراد قاعدة البيانات كاملة...',
    selectingImportFile: 'جار اختيار ملف الاستيراد...',
    importDbSuccess: '✓ تم استيراد قاعدة البيانات كاملة بنجاح!',
    importDbSuccessMsg: 'تم استيراد قاعدة البيانات بنجاح!\n\nيرجى إعادة تشغيل البرنامج لتطبيق التغييرات.',
    importSuccess: 'نجح الاستيراد',
    importFailedStatus: '✗ فشل الاستيراد',
    importDbFailedMsg: 'فشل استيراد قاعدة البيانات:\n\n',
    importing: 'جار الاستيراد:',
    importComplete: '✓ اكتمل الاستيراد بنجاح!',
    importCompleteMsg: '✓ تم استيراد {count} سجل بنجاح!',
    exportComplete: '✓ اكتمل التصدير بنجاح!',
    // Invoice Settings Card
    navInvoiceSettings: 'إعدادات الفواتير',
    invoiceSettings: 'إعدادات الفواتير',
    taxSettings: 'إعدادات الضريبة',
    taxSettingsDesc: 'إدارة ضريبة القيمة المضافة وتطبيقها',
    enableTax: 'تفعيل الضريبة',
    enableTaxDesc: 'تفعيل ضريبة القيمة المضافة',
    taxRate: 'نسبة الضريبة (%)',
    taxOnLabor: 'الضريبة على الأجور',
    defaultInvoiceType: 'نوع الفاتورة الافتراضي',
    taskir: 'تسكير',
    mashghul: 'مشغول',
    lockSettings: 'قفل الإعدادات',
    lockTaxRate: 'قفل نسبة الضريبة',
    lockTaxOnLabor: 'قفل الضريبة على الأجور',
    allowInvoiceTypeChange: 'السماح بتغيير نوع الفاتورة',
    ounceSettings: 'إعدادات حساب الأونصة',
    ounceSettingsDesc: 'تحديد طريقة حساب سعر الجرام من الأونصة',
    calculationType: 'نوع الحساب',
    calcTypeDefault: 'افتراضي (دولار)',
    calcTypeGold: 'ذهبي (× 0.12056)',
    calcTypeGold2: 'ثالث (× 0.120555)',
    calcTypeCustom: 'مخصص',
    calcTypeManual: 'يدوي',
    conversionFactor: 'معامل التحويل',
    exchangeRate: 'سعر الصرف',
    goldMultiplier: 'معامل الذهب',
    gold2Multiplier: 'معامل النوع الثالث',
    customMultiplier: 'معامل مخصص',
    currentFormula: 'المعادلة الحالية',
    exampleCalculation: 'مثال توضيحي',
    ouncePrice: 'أونصة:',
    gramPrice: 'جرام:',
    paymentSettings: 'إعدادات الدفع',
    paymentSettingsDesc: 'تحديد نوع الدفع الافتراضي',
    defaultPaymentType: 'نوع الدفع الافتراضي',
    cash: 'نقدي',
    credit: 'آجل',
    lockPaymentType: 'قفل نوع الدفع',
    validationSettings: 'التحذيرات والتحقق',
    validationSettingsDesc: 'إعدادات التحقق من البيانات',
    warnDeleteLine: 'تحذير حذف سطر',
    warnDeleteInvoice: 'تحذير حذف فاتورة',
    requireOunceTaskir: 'إلزام الأونصة (تسكير)',
    requireKarat: 'إلزام تحديد العيار',
    warnDuplicateRef: 'تحذير تكرار المرجع',
    resetToDefault: 'إعادة تعيين',
    confirmBtn: 'تأكيد',
    cancelBtn: 'إلغاء',
    areYouSure: 'هل أنت متأكد؟',
    // Notifications Card
    navNotifications: 'الإشعارات',
    notificationsTitle: 'إعدادات الإشعارات',
    notificationsDesc: 'الإشعارات تظهر فقط في الوضع السحابي وعند المستخدمين الآخرين (ليس من قام بالعملية)',
    notificationsEnableAll: 'تفعيل جميع الإشعارات',
    notificationsEnableAllDesc: 'تشغيل أو إيقاف جميع الإشعارات دفعة واحدة',
    notifSalesInvoice: 'فاتورة بيع',
    notifPurchaseInvoice: 'فاتورة شراء',
    notifReceipt: 'سند قبض',
    notifVoucher: 'سند صرف',
    notifJournal: 'قيد يومية',
    notifCustomer: 'العملاء',
    notifSupplier: 'الموردين',
    notifOpening: 'الأرصدة الافتتاحية',
    notifAccounts: 'الحسابات',
    notifGoldItems: 'أصناف العيارات',
    notifUsers: 'المستخدمين',
    notifCompanySettings: 'إعدادات الشركة',
    notifTaxDeclaration: 'الإقرار الضريبي',
    notifOrdersFromUsers: 'الأوردرات (من المستخدمين)',
    notifOrdersCompleted: 'اكتمال الأوردر',
    saveNotifications: 'حفظ إعدادات الإشعارات',
    notificationsSaved: 'تم حفظ إعدادات الإشعارات بنجاح',
    notificationsSaveFailed: 'فشل حفظ إعدادات الإشعارات',
  },
  en: {
    pageTitle: 'Company Settings',
    navCompanyInfo: 'Company Info',
    navBackup: 'Backup',
    navCurrency: 'Currencies',
    navStats: 'Statistics',
    navSubscription: 'Subscription',
    navTheme: 'Appearance',
    // Theme Card
    themeTitle: 'Appearance & Themes',
    themeMode: 'Display Mode',
    lightMode: 'Light',
    darkMode: 'Dark',
    autoMode: 'Auto',
    themeColor: 'Theme Color',
    themePreview: 'Preview',
    saveTheme: 'Save Appearance',
    themeSaved: 'Appearance settings saved successfully',
    themeSaveFailed: 'Failed to save appearance settings',
    // Theme color names
    colorTurquoise: 'Turquoise',
    colorGold: 'Gold',
    colorBlue: 'Blue',
    colorGreen: 'Green',
    colorPurple: 'Purple',
    colorRed: 'Red',
    colorOrange: 'Orange',
    colorPink: 'Pink',
    colorSky: 'Sky',
    colorGray: 'Gray',
    colorNavy: 'Navy',
    colorIndigo: 'Indigo',
    colorTeal: 'Teal',
    colorRose: 'Rose',
    colorAmber: 'Amber',
    colorCyan: 'Cyan',
    colorEmerald: 'Emerald',
    colorSlate: 'Slate',
    colorViolet: 'Violet',
    colorRoyal: 'Royal',
    colorSage: 'Sage',
    colorSunset: 'Sunset',
    colorOrchid: 'Orchid',
    colorCharcoal: 'Charcoal',
    companyInfoTitle: 'Company Information',
    logoAlt: 'Company Logo',
    logoPlaceholder: 'Click to add logo',
    logoHint: 'Click the circle to change logo',
    companyName: 'Company Name',
    companyNamePlaceholder: 'e.g. Gold Accounting Company',
    companyNameEn: 'Company Name (English)',
    companyNameEnPlaceholder: 'e.g. Gold Accounting Company',
    address: 'Address',
    addressPlaceholder: 'e.g. Riyadh, Saudi Arabia',
    addressEn: 'Address (English)',
    addressEnPlaceholder: 'e.g. Riyadh, Saudi Arabia',
    taxNumber: 'Tax Number',
    taxPlaceholder: 'e.g. 300040394304303',
    phone: 'Phone Number',
    phonePlaceholder: 'e.g. +966 50 123 4567',
    email: 'Email',
    emailPlaceholder: 'e.g. info@company.com',
    website: 'Website',
    websitePlaceholder: 'e.g. www.company.com',
    saveInfo: 'Save Information',
    backupTitle: 'Automatic Backup',
    enableAutoBackup: 'Enable Automatic Backup',
    backupDesc: 'Automatically create periodic backups of the database',
    intervalLabel: 'Interval (hours)',
    hour: 'hour',
    keepCountLabel: 'Backups to Keep',
    copy: 'copy',
    lastBackup: 'Last Backup:',
    existingBackups: 'Existing Backups:',
    nextBackup: 'Next Backup in:',
    loading: 'Loading...',
    creating: 'Creating...',
    createBackupNow: 'Create Backup Now',
    viewBackups: 'View Backups',
    openFolder: 'Open Folder',
    saveSettings: 'Save Settings',
    currencyTitle: 'Currency & Exchange Rates',
    refreshRates: 'Refresh Rates',
    addCurrency: 'Add Currency',
    defaultCurrency: 'Default Currency:',
    totalCurrencies: 'Total Currencies:',
    lastUpdate: 'Last Update:',
    today: 'Today',
    searchCurrency: 'Search by name or code...',
    filterAll: 'All',
    filterArab: 'Arab',
    filterWorld: 'World',
    colFlag: 'Flag',
    colName: 'Currency Name',
    colCode: 'Code',
    colSymbol: 'Symbol',
    colRate: 'Exchange Rate',
    colDefault: 'Default',
    colActions: 'Actions',
    noCurrencies: 'No currencies available',
    addNewCurrency: 'Add New Currency',
    statsTitle: 'Table Statistics',
    refresh: 'Refresh',
    tableCount: 'Tables:',
    dbPath: 'Path:',
    dbManagement: 'Database Management',
    exportDb: 'Export Database',
    importDb: 'Import Database',
    premiumBadge: 'Premium',
    subscriptionInfo: 'Subscription Info',
    subscriptionStatus: 'Subscription Status',
    daysRemaining: 'Days Remaining',
    day: 'Day',
    startDate: 'Start Date',
    expiryDate: 'Expiry Date',
    usagePercent: 'Usage',
    deviceId: 'Device ID',
    copyBtn: 'Copy',
    licenseType: 'License Type',
    subscriptionUsage: 'Subscription Usage',
    fromDays: 'of {days} days',
    warning: 'Warning!',
    licenseExpiring: 'License is about to expire!',
    licenseActive: 'Subscription Active',
    licenseInactive: 'Subscription Inactive',
    activeSubscription: 'Active Subscription',
    pleaseActivate: 'Please activate subscription',
    licenseExpiredOrInvalid: 'License expired or invalid. Please renew.',
    ofDays: 'of {total} days',
    notAvailable: 'Not available',
    renewSubscription: 'Renew Subscription',
    renewDesc: 'Contact us for renewal or upgrade',
    whatsapp: 'WhatsApp',
    emailBtn: 'Email',
    infoSaved: 'Company information saved successfully',
    infoSaveFailed: 'Failed to save company information',
    backupCreated: 'Backup created successfully',
    backupFailed: 'Failed to create backup',
    settingsSaved: 'Settings saved successfully',
    copied: 'Copied!',
    logoUpdated: 'Logo updated',
    logoFailed: 'Failed to select logo',
    backupSettingsSaved: 'Backup settings saved successfully',
    backupSettingsFailed: 'Failed to save settings',
    backupCreateFailed: 'Failed to create backup',
    backupCreateError: 'Error during creation',
    unknownError: 'Unknown error',
    folderOpened: 'Backup folder opened',
    folderOpenFailed: 'Failed to open folder',
    listRefreshed: 'List refreshed',
    listLoadFailed: 'Failed to load list',
    updatingRates: 'Updating exchange rates...',
    deviceIdCopied: 'Device ID copied',
    funcNotAvailable: 'Function not available',
    modalNotReady: 'Modal not ready, please try again',
    hoursAndMinutes: '{hours} hour(s) and {minutes} minute(s)',
    minutesOnly: '{minutes} minute(s)',
    verySoon: 'Very soon',
    afterAppStart: '5 seconds after app start',
    noBackupYet: 'No backup created yet',
    onNextAppStart: 'On next app start',
    dbPathReadFailed: 'Path: — (read failed)',
    dbPathLabelValue: 'Path: {path}',
    // Backup info toast labels
    backupInfoTitle: 'Backup Info:',
    backupInfoName: 'Backup Name',
    backupInfoDateTime: 'Date & Time',
    backupInfoSize: 'Size',
    // License types
    licenseMonthly: 'Monthly',
    licenseQuarterly: 'Quarterly',
    licenseSemiAnnual: 'Semi-Annual',
    licenseYearly: 'Yearly',
    licensePermanent: 'Permanent',
    // Export/Import Modal
    exportDbTitle: 'Export Database',
    importDbTitle: 'Import Database',
    close: 'Close',
    selectAll: 'Select All (export full .db file)',
    selectAllHint: '💡 When selecting all: export/import full database file (.db)',
    preparing: 'Preparing...',
    cancel: 'Cancel',
    startExport: 'Start Export',
    startImport: 'Start Import',
    exporting: 'Exporting...',
    importing: 'Importing...',
    exportComplete: 'Export completed successfully!',
    importComplete: 'Import completed successfully!',
    exportFailed: 'Export failed',
    importFailed: 'Import failed',
    // Backup List Modal
    backupListTitle: 'Saved Backups',
    searchBackup: 'Search for backup...',
    total: 'Total:',
    size: 'Size:',
    backupName: 'Backup Name',
    date: 'Date',
    time: 'Time',
    actions: 'Actions',
    noBackups: 'No backups available',
    ok: 'OK',
    restore: 'Restore',
    delete: 'Delete',
    // Currency Form Modal
    addCurrencyTitle: 'Add New Currency',
    editCurrencyTitle: 'Edit Currency',
    currencyName: 'Currency Name',
    currencyNamePlaceholder: 'e.g. Saudi Riyal',
    currencyCode: 'Currency Code',
    currencyCodePlaceholder: 'e.g. SAR',
    currencyCodeHint: '3 English letters (e.g. SAR, USD, EUR)',
    currencySymbol: 'Currency Symbol',
    currencySymbolPlaceholder: 'e.g. SAR or $',
    exchangeRate: 'Exchange Rate vs Default Currency',
    exchangeRatePlaceholder: 'e.g. 1.00',
    exchangeRateHint: 'Enter the rate of one unit of this currency vs the default',
    currencyType: 'Currency Type',
    selectType: 'Select Type',
    arabCurrency: 'Arab Currency',
    worldCurrency: 'World Currency',
    countryFlag: 'Country Flag (Emoji)',
    countryFlagPlaceholder: 'e.g. 🇸🇦',
    countryFlagHint: 'Optional - copy flag emoji from keyboard',
    fontAwesomeIcon: 'FontAwesome Icon',
    setAsDefault: 'Set as Default Currency',
    saveCurrency: 'Save Currency',
    // Table names (28 tables)
    tblCompanyInfo: 'Company Info',
    tblCurrencies: 'Currencies',
    tblAccountTypes: 'Account Types',
    tblAccounts: 'Accounts',
    tblCustomers: 'Customers',
    tblSuppliers: 'Suppliers',
    tblCategories: 'Categories',
    tblUsers: 'Users',
    tblPermissions: 'Permissions',
    tblUserPermissions: 'User Permissions',
    tblGoldItems: 'Gold Items',
    tblGoldKarats: 'Gold Karats',
    tblPayments: 'Payments',
    tblPaymentLines: 'Payment Lines',
    tblReceipts: 'Receipts',
    tblReceiptLines: 'Receipt Lines',
    tblSalesInvoices: 'Sales Invoices',
    tblSalesInvoiceDetails: 'Sales Invoice Details',
    tblPurchaseInvoices: 'Purchase Invoices',
    tblPurchaseInvoiceDetails: 'Purchase Invoice Details',
    tblJournalEntries: 'Journal Entries',
    tblJournalLines: 'Journal Lines',
    tblOpeningBalances: 'Opening Balances',
    tblOpeningLines: 'Opening Balance Lines',
    tblOrders: 'Orders',
    tblDefaultBoxes: 'Default Boxes',
    tblTaxDeclarations: 'Tax Declarations',
    tblInvoiceSettings: 'Invoice Settings',
    tblBranches: 'Branches',
    tblUserBranches: 'User Branches',
    tblCustomerBranches: 'Customer Branches',
    tblSupplierBranches: 'Supplier Branches',
    tblDetails: 'Details',
    dependencies: 'dependencies',
    // Alert and progress messages
    selectTableAlert: 'Please select at least one table',
    alertWarning: 'Warning',
    alertError: 'Error',
    errorOccurred: 'Error occurred:',
    exportingFullDb: 'Exporting full database...',
    apiNotAvailable: 'API not available',
    selectingSavePath: 'Selecting save location...',
    exportDbSuccess: '✓ Database exported successfully!',
    dbFileSaved: 'Database file (.db) saved',
    exportDbSuccessMsg: 'Database exported successfully!\n\nDatabase file saved with .db extension',
    exportSuccess: 'Export Successful',
    exportFailedStatus: '✗ Export failed',
    unknownError: 'Unknown error',
    exportDbFailedMsg: 'Failed to export database:\n\n',
    errorOccurredStatus: '✗ Error occurred',
    preparingFullExport: 'Preparing full database export...',
    exportingTable: 'Exporting:',
    tableLabel: 'Table:',
    exportCompleteMsg: '✓ Successfully exported {count} records!',
    importingFullDb: 'Importing full database...',
    selectingImportFile: 'Selecting import file...',
    importDbSuccess: '✓ Database imported successfully!',
    importDbSuccessMsg: 'Database imported successfully!\n\nPlease restart the application to apply changes.',
    importSuccess: 'Import Successful',
    importFailedStatus: '✗ Import failed',
    importDbFailedMsg: 'Failed to import database:\n\n',
    importing: 'Importing:',
    importComplete: '✓ Import completed successfully!',
    importCompleteMsg: '✓ Successfully imported {count} records!',
    exportComplete: '✓ Export completed successfully!',
    // Invoice Settings Card
    navInvoiceSettings: 'Invoice Settings',
    invoiceSettings: 'Invoice Settings',
    taxSettings: 'Tax Settings',
    taxSettingsDesc: 'Manage VAT and application',
    enableTax: 'Enable Tax',
    enableTaxDesc: 'Enable Value Added Tax',
    taxRate: 'Tax Rate (%)',
    taxOnLabor: 'Tax on Labor',
    defaultInvoiceType: 'Default Invoice Type',
    taskir: 'Taskir',
    mashghul: 'Mashghul',
    lockSettings: 'Lock Settings',
    lockTaxRate: 'Lock Tax Rate',
    lockTaxOnLabor: 'Lock Tax on Labor',
    allowInvoiceTypeChange: 'Allow Invoice Type Change',
    ounceSettings: 'Ounce Calculation Settings',
    ounceSettingsDesc: 'Define how to calculate gram price from ounce',
    calculationType: 'Calculation Type',
    calcTypeDefault: 'Default (Dollar)',
    calcTypeGold: 'Gold (× 0.12056)',
    calcTypeGold2: 'Third (× 0.120555)',
    calcTypeCustom: 'Custom',
    calcTypeManual: 'Manual',
    conversionFactor: 'Conversion Factor',
    exchangeRate: 'Exchange Rate',
    goldMultiplier: 'Gold Multiplier',
    gold2Multiplier: 'Third Type Multiplier',
    customMultiplier: 'Custom Multiplier',
    currentFormula: 'Current Formula',
    exampleCalculation: 'Example Calculation',
    ouncePrice: 'Ounce:',
    gramPrice: 'Gram:',
    paymentSettings: 'Payment Settings',
    paymentSettingsDesc: 'Set default payment type',
    defaultPaymentType: 'Default Payment Type',
    cash: 'Cash',
    credit: 'Credit',
    lockPaymentType: 'Lock Payment Type',
    validationSettings: 'Warnings & Validation',
    validationSettingsDesc: 'Data validation settings',
    warnDeleteLine: 'Warn Delete Line',
    warnDeleteInvoice: 'Warn Delete Invoice',
    requireOunceTaskir: 'Require Ounce (Taskir)',
    requireKarat: 'Require Karat',
    warnDuplicateRef: 'Warn Duplicate Reference',
    resetToDefault: 'Reset to Default',
    confirmBtn: 'Confirm',
    cancelBtn: 'Cancel',
    areYouSure: 'Are you sure?',
    // Notifications Card
    navNotifications: 'Notifications',
    notificationsTitle: 'Notification Settings',
    notificationsDesc: 'Notifications appear only in cloud mode and for other users (not the one who performed the action)',
    notificationsEnableAll: 'Enable All Notifications',
    notificationsEnableAllDesc: 'Turn all notifications on or off at once',
    notifSalesInvoice: 'Sales Invoice',
    notifPurchaseInvoice: 'Purchase Invoice',
    notifReceipt: 'Receipt',
    notifVoucher: 'Voucher',
    notifJournal: 'Journal Entry',
    notifCustomer: 'Customers',
    notifSupplier: 'Suppliers',
    notifOpening: 'Opening Balances',
    notifAccounts: 'Accounts',
    notifGoldItems: 'Gold Items',
    notifUsers: 'Users',
    notifCompanySettings: 'Company Settings',
    notifTaxDeclaration: 'Tax Declaration',
    notifOrdersFromUsers: 'Orders (from Users)',
    notifOrdersCompleted: 'Order Completion',
    saveNotifications: 'Save Notification Settings',
    notificationsSaved: 'Notification settings saved successfully',
    notificationsSaveFailed: 'Failed to save notification settings',
  }
};

// Get UI language
function getSettingsLang() {
  return localStorage.getItem('uiLang') || 'ar';
}

// Translation helper
function tSettings(key) {
  const lang = getSettingsLang();
  return SETTINGS_TRANSLATIONS[lang]?.[key] || SETTINGS_TRANSLATIONS.ar[key] || key;
}

// Translate license type from Arabic backend value to UI language
function translateLicenseType(arabicType) {
  const licenseTypeMap = {
    'شهري': 'licenseMonthly',
    'ربع سنوي': 'licenseQuarterly',
    'نصف سنوي': 'licenseSemiAnnual',
    'سنوي': 'licenseYearly',
    'دائم': 'licensePermanent'
  };
  const key = licenseTypeMap[arabicType];
  return key ? tSettings(key) : arabicType;
}

// Apply translations to HTML
function applySettingsTranslations() {
  const lang = getSettingsLang();
  const isEn = lang === 'en';
  
  document.documentElement.lang = lang;
  document.documentElement.dir = isEn ? 'ltr' : 'rtl';
  document.title = tSettings('pageTitle');
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = tSettings(key);
    if (val && val !== key) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = val;
      } else if (el.tagName === 'OPTION') {
        el.textContent = val;
      } else {
        // For elements with child nodes, only update text if it's a simple text node
        if (el.childElementCount === 0) {
          el.textContent = val;
        } else {
          // Find text nodes and update them
          const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
          let node;
          while (node = walker.nextNode()) {
            if (node.textContent.trim()) {
              node.textContent = val;
              break;
            }
          }
        }
      }
    }
  });
  
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    const val = tSettings(key);
    if (val && val !== key) el.title = val;
  });
  
  // Handle placeholder attributes separately
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const val = tSettings(key);
    if (val && val !== key) el.placeholder = val;
  });
}

// إرسال طلب تجديد عبر واتساب
function sendWhatsAppRenewal() {
  const deviceId = document.getElementById('deviceId')?.textContent || '--';
  const licenseType = document.getElementById('licenseType')?.textContent || '--';
  const expiryDate = document.getElementById('expiryDate')?.textContent || '--';
  
  const message = `السلام عليكم 👋

أرغب في تجديد اشتراك برنامج المحاسب الذكي BenAjlan

📋 معلومات الاشتراك:
• معرف الجهاز: ${deviceId}
• نوع الترخيص الحالي: ${licenseType}
• تاريخ الانتهاء: ${expiryDate}

شكراً لكم 🙏`;

  const phone = '966575813910';
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  
  // فتح في المتصفح
  if (window.api && window.api.openExternal) {
    window.api.openExternal(url);
  } else {
    window.open(url, '_blank');
  }
}

// إرسال طلب تجديد عبر البريد
function sendEmailRenewal() {
  const deviceId = document.getElementById('deviceId')?.textContent || '--';
  const licenseType = document.getElementById('licenseType')?.textContent || '--';
  const expiryDate = document.getElementById('expiryDate')?.textContent || '--';
  
  const subject = 'طلب تجديد اشتراك - المحاسب الذكي BenAjlan';
  const body = `السلام عليكم

أرغب في تجديد اشتراك برنامج المحاسب الذكي BenAjlan

معلومات الاشتراك:
- معرف الجهاز: ${deviceId}
- نوع الترخيص الحالي: ${licenseType}
- تاريخ الانتهاء: ${expiryDate}

شكراً لكم`;

  const email = 'al.hussein.ajlan@gmail.com';
  const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  // فتح في المتصفح
  if (window.api && window.api.openExternal) {
    window.api.openExternal(url);
  } else {
    window.open(url, '_blank');
  }
}

// Toast Notification Function - Global Scope
function showToast(msg, type) {
  const el = document.getElementById('toast');
  if (!el) {
    return;
  }
  el.textContent = msg || '';
  el.classList.remove('ok', 'err', 'show');
  if (type) el.classList.add(type);
  // Force reflow for restart animation
  // eslint-disable-next-line no-unused-expressions
  el.offsetHeight;
  el.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => el.classList.remove('show'), 2200);
}

document.addEventListener('DOMContentLoaded', function() {
  
  // Apply translations on load
  applySettingsTranslations();
  
  // دالة لتمرير شريط التبويبات أفقياً لإظهار التبويب النشط
  function scrollPillIntoView(pill) {
    if (!pill) return;
    const navContainer = document.querySelector('.settings-nav-pills');
    if (!navContainer) return;
    
    // حساب موقع التبويب بالنسبة للحاوية
    const pillRect = pill.getBoundingClientRect();
    const containerRect = navContainer.getBoundingClientRect();
    
    // التحقق من أن التبويب خارج نطاق الرؤية
    const isOutOfViewLeft = pillRect.left < containerRect.left;
    const isOutOfViewRight = pillRect.right > containerRect.right;
    
    if (isOutOfViewLeft || isOutOfViewRight) {
      // حساب موقع التمرير المطلوب (وسط الشاشة)
      const scrollLeft = pill.offsetLeft - (containerRect.width / 2) + (pillRect.width / 2);
      navContainer.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  }
  
  // ===== Navigation Pills Setup =====
  const navPills = document.querySelectorAll('.nav-pill');
  let isNavScroll = false; // لمنع الـ observer من تغيير التبويب أثناء التمرير الناتج عن النقر
  
  navPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      const targetClass = pill.getAttribute('data-target');
      const targetCard = document.querySelector(`.${targetClass}`);
      
      if (targetCard) {
        // Add ripple effect
        pill.classList.add('ripple');
        setTimeout(() => pill.classList.remove('ripple'), 600);
        
        // Update active pill with animation
        navPills.forEach(p => {
          p.classList.remove('active');
          p.style.transform = '';
        });
        pill.classList.add('active');
        
        // Smooth scroll to card with offset for sticky nav
        const navHeight = document.querySelector('.settings-nav-pills')?.offsetHeight || 60;
        const targetPosition = targetCard.getBoundingClientRect().top + window.pageYOffset - navHeight - 30;
        isNavScroll = true;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        // إعادة تفعيل الـ observer بعد انتهاء التمرير
        setTimeout(() => { isNavScroll = false; }, 800);
      }
    });
    
    // Add hover sound effect placeholder
    pill.addEventListener('mouseenter', () => {
      pill.style.willChange = 'transform, box-shadow';
    });
    
    pill.addEventListener('mouseleave', () => {
      pill.style.willChange = 'auto';
    });
  });
  
  // Auto-activate pill on scroll (عند التمرير اليدوي فقط)
  let observer = null;
  
  function createObserver() {
    // Disconnect old observer if exists
    if (observer) {
      observer.disconnect();
    }
    
    observer = new IntersectionObserver((entries) => {
      if (isNavScroll) return; // تجاهل التحديثات أثناء التمرير الناتج عن النقر على التبويبات
      
      // Find the most visible card
      let mostVisibleEntry = null;
      let maxRatio = 0;
      
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          mostVisibleEntry = entry;
        }
      });
      
      // Only update if we have a clear winner
      if (mostVisibleEntry && maxRatio >= 0.25) {
        const card = mostVisibleEntry.target;
        let targetClass = null;
        
        // Check each possible card class
        if (card.classList.contains('company-info-card')) targetClass = 'company-info-card';
        else if (card.classList.contains('backup-card')) targetClass = 'backup-card';
        else if (card.classList.contains('currency-card')) targetClass = 'currency-card';
        else if (card.classList.contains('stats-card')) targetClass = 'stats-card';
        else if (card.classList.contains('subscription-card')) targetClass = 'subscription-card';
        else if (card.classList.contains('theme-card')) targetClass = 'theme-card';
        else if (card.classList.contains('invoice-settings-card')) targetClass = 'invoice-settings-card';
        else if (card.classList.contains('notifications-card')) targetClass = 'notifications-card';
        
        if (targetClass) {
          const allPills = document.querySelectorAll('.nav-pill');
          const currentActive = document.querySelector('.nav-pill.active');
          const matchingPill = document.querySelector(`.nav-pill[data-target="${targetClass}"]`);
          
          // Only update if it's actually different
          if (matchingPill && matchingPill !== currentActive) {
            allPills.forEach(p => p.classList.remove('active'));
            matchingPill.classList.add('active');
            
            // تمرير شريط التبويبات أفقياً لإظهار التبويب النشط
            scrollPillIntoView(matchingPill);
          }
        }
      }
    }, {
      threshold: [0, 0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      rootMargin: '-100px 0px -100px 0px'
    });
    
    return observer;
  }
  
  // Create initial observer
  createObserver();
  
  // Function to observe all cards (including dynamically loaded ones)
  function observeAllCards() {
    // Get all cards by their specific classes
    const cards = document.querySelectorAll('.company-info-card, .backup-card, .currency-card, .stats-card, .subscription-card, .theme-card, .invoice-settings-card, .notifications-card');
    
    if (cards.length === 0) {
      return 0;
    }
    
    // Recreate observer to ensure it's fresh
    createObserver();
    
    // Observe all cards
    cards.forEach(card => {
      observer.observe(card);
    });
    
    // Return count for debugging
    return cards.length;
  }
  
  // Make observeAllCards available globally for dynamic card loading
  window.observeAllCards = observeAllCards;
  
  // Observe initial cards
  observeAllCards();
  
  // Re-observe after invoice settings card is loaded (with multiple delays to ensure it's loaded)
  setTimeout(() => {
    observeAllCards();
  }, 500);
  
  setTimeout(() => {
    observeAllCards();
  }, 1000);
  
  setTimeout(() => {
    observeAllCards();
  }, 2000);
  
  setTimeout(() => {
    observeAllCards();
  }, 3000);
  
  // Also re-observe when window is fully loaded
  window.addEventListener('load', () => {
    setTimeout(() => {
      observeAllCards();
    }, 500);
    setTimeout(() => {
      observeAllCards();
    }, 1000);
  });
  
  // Re-observe on first scroll (in case cards loaded after initial observation)
  let hasScrolled = false;
  let scrollCheckCount = 0;
  const maxScrollChecks = 10;
  
  window.addEventListener('scroll', () => {
    if (!hasScrolled) {
      hasScrolled = true;
      setTimeout(() => {
        observeAllCards();
      }, 100);
    }
    
    // Continue checking for first few scrolls to catch dynamically loaded cards
    if (scrollCheckCount < maxScrollChecks) {
      scrollCheckCount++;
      setTimeout(() => {
        observeAllCards();
      }, 50);
    }
  });
  
  // Watch for new cards being added to the DOM
  const mutationObserver = new MutationObserver((mutations) => {
    let shouldReobserve = false;
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          // Check if it's a card or contains a card
          if (node.classList && (
            node.classList.contains('company-info-card') ||
            node.classList.contains('backup-card') ||
            node.classList.contains('currency-card') ||
            node.classList.contains('stats-card') ||
            node.classList.contains('subscription-card') ||
            node.classList.contains('theme-card') ||
            node.classList.contains('invoice-settings-card')
          )) {
            shouldReobserve = true;
          }
          // Also check children
          const cardChildren = node.querySelectorAll && node.querySelectorAll('.invoice-settings-card, .theme-card, .subscription-card, .stats-card, .currency-card, .backup-card, .company-info-card');
          if (cardChildren && cardChildren.length > 0) {
            shouldReobserve = true;
          }
        }
      });
    });
    
    if (shouldReobserve) {
      // Re-observe immediately and after a short delay
      setTimeout(() => {
        observeAllCards();
      }, 50);
      setTimeout(() => {
        observeAllCards();
      }, 200);
    }
  });
  
  // Start observing the container for changes
  const container = document.querySelector('.container');
  if (container) {
    mutationObserver.observe(container, {
      childList: true,
      subtree: true
    });
  }
  
  // Load subscription info (with delay to ensure API is ready)
  setTimeout(() => {
    loadSubscriptionInfoLocal(getAPI);
  }, 500);
  
  // تحديث الأيام المتبقية كل 5 دقائق للتأكد من دقة الحساب (خفيف على النظام)
  setInterval(() => {
    loadSubscriptionInfoLocal(getAPI);
  }, 300000); // كل 5 دقائق
  
  // تحديث عند عودة المستخدم للصفحة
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      loadSubscriptionInfoLocal(getAPI);
    }
  });
  
  // Elements
  const logoWrapper = document.getElementById('logoWrapper');
  const logoPreview = document.getElementById('logoPreview');
  const logoPlaceholder = document.querySelector('.logo-placeholder');
  const companyName = document.getElementById('companyName');
  const companyNameEn = document.getElementById('companyNameEn');
  const companyAddress = document.getElementById('companyAddress');
  const companyAddressEn = document.getElementById('companyAddressEn');
  const companyTax = document.getElementById('companyTax');
  const btnSave = document.getElementById('btnSave');
  let companyInfoLoadToken = 0;
  
  // Set theme to dark by default
  document.documentElement.setAttribute('data-theme', 'dark');
  
  // Get API from parent window or current window
  function getAPI() {
    // Try parent window first (if in iframe)
    if (window.parent && window.parent !== window && window.parent.api) {
      return window.parent.api;
    }
    // Try current window
    if (window.api) {
      return window.api;
    }
    // Try top window
    if (window.top && window.top !== window && window.top.api) {
      return window.top.api;
    }
    return null;
  }

  function resetCompanyLogoPreview() {
    if (logoPreview) {
      logoPreview.removeAttribute('src');
      logoPreview.style.display = 'none';
    }
    if (logoPlaceholder) {
      logoPlaceholder.style.display = 'block';
    }
  }

  // Load Company Info on page load
  async function loadCompanyInfo() {
    try {
      const api = getAPI();
      if (!(api && api.getCompanyInfo)) return;
      const requestToken = ++companyInfoLoadToken;
      
      const r = await api.getCompanyInfo();
      if (!r || !r.success) return;
      if (requestToken !== companyInfoLoadToken) return;
      
      const c = r.company || {};
      
      // Fill form fields
      const nameEl = document.getElementById('companyName');
      const nameEnEl = document.getElementById('companyNameEn');
      const addressEl = document.getElementById('companyAddress');
      const addressEnEl = document.getElementById('companyAddressEn');
      const taxEl = document.getElementById('companyTax');
      const phoneEl = document.getElementById('companyPhone');
      const emailEl = document.getElementById('companyEmail');
      const websiteEl = document.getElementById('companyWebsite');
      
      if (nameEl) nameEl.value = c.name || '';
      if (nameEnEl) nameEnEl.value = c.name_en || '';
      if (addressEl) addressEl.value = c.address || '';
      if (addressEnEl) addressEnEl.value = c.address_en || '';
      if (taxEl) taxEl.value = c.tax || '';
      if (phoneEl) phoneEl.value = c.phone || '';
      if (emailEl) emailEl.value = c.email || '';
      if (websiteEl) websiteEl.value = c.website || '';
      
      // Load logo - Use logoData (base64) if available, otherwise fallback to file path
      resetCompanyLogoPreview();
      if (logoPreview) {
        if (c.logoData) {
          // Use base64 data directly (stored in database)
          logoPreview.src = c.logoData;
          logoPreview.style.display = 'block';
          if (logoPlaceholder) logoPlaceholder.style.display = 'none';
        } else if (c.logo) {
          // Fallback to file path
          const url = c.logo.startsWith('file://') ? c.logo : 'file:///' + c.logo.replace(/\\/g, '/');
          logoPreview.src = `${url}?v=${Date.now()}`;
          logoPreview.style.display = 'block';
          if (logoPlaceholder) logoPlaceholder.style.display = 'none';
        }
      }
      
    } catch (error) {
      // Error loading company info
    }
  }

  async function refreshCompanyInfoSection() {
    await loadCompanyInfo();
  }

  async function refreshBranchScopedSettingsSections() {
    await refreshCompanyInfoSection();
    if (window.InvoiceSettingsManager && typeof window.InvoiceSettingsManager.reloadCard === 'function') {
      await window.InvoiceSettingsManager.reloadCard();
    }
    if (window.CurrencySettingsManager && typeof window.CurrencySettingsManager.reloadCard === 'function') {
      await window.CurrencySettingsManager.reloadCard({ forceFresh: true });
    }
  }

  window.refreshForBranchScopeChange = async function() {
    await refreshBranchScopedSettingsSections();
    return true;
  };
  
  // Load data on start
  refreshBranchScopedSettingsSections();

  const realtimeApi = getAPI();
  if (realtimeApi && typeof realtimeApi.on === 'function') {
    realtimeApi.on('cloud-data-updated', (payload) => {
      const tables = Array.isArray(payload?.tables) ? payload.tables : [];
      if (tables.includes('company') || tables.includes('branches') || tables.includes('invoice_settings') || tables.includes('currency_settings')) {
        refreshBranchScopedSettingsSections();
      }
    });
  }

  window.addEventListener('message', (event) => {
    const messageType = event?.data?.type;
    if (messageType === 'branch-scope-changed') {
      refreshBranchScopedSettingsSections();
      return;
    }
    if (messageType !== 'cloud-data-updated') {
      return;
    }
    const payload = event.data.payload || {};
    const tables = Array.isArray(payload?.tables) ? payload.tables : [];
    if (tables.includes('company') || tables.includes('branches') || tables.includes('invoice_settings') || tables.includes('currency_settings')) {
      refreshBranchScopedSettingsSections();
    }
  });

  // Logo Click Handler - Real Electron API
  async function pickLogo() {
    try {
      const api = getAPI();
      if (!(api && api.pickCompanyLogo)) {
        showToast(tSettings('logoPickUnavailable'), 'err');
        return;
      }
      
      const result = await api.pickCompanyLogo();
      
      if (result && result.success) {
        // Update logo image
        if (result.logoData) {
          logoPreview.src = result.logoData;
        } else if (result.path) {
          const url = result.path.startsWith('file://') 
            ? result.path 
            : 'file:///' + result.path.replace(/\\/g, '/');
          logoPreview.src = `${url}?v=${Date.now()}`;
        }
        
        logoPreview.style.display = 'block';
        logoPlaceholder.style.display = 'none';
        showToast(tSettings('logoUpdated'), 'ok');
        
      } else if (result && result.canceled) {
        // Canceled by user
      } else {
        showToast(tSettings('logoFailed') + (result?.error ? ': ' + result.error : ''), 'err');
      }
      
    } catch (error) {
      showToast(tSettings('logoFailed'), 'err');
    }
  }
  
  if (logoWrapper) {
    logoWrapper.addEventListener('click', pickLogo);
  }

  // Tax Input - enforce digits only (15 max)
  if (companyTax) {
    companyTax.addEventListener('input', function(e) {
      const el = e.currentTarget;
      const digits = (el.value.match(/\d+/g) || []).join('').slice(0, 15);
      if (el.value !== digits) el.value = digits;
    });
  }

  // Additional Fields
  const companyPhone = document.getElementById('companyPhone');
  const companyEmail = document.getElementById('companyEmail');
  const companyWebsite = document.getElementById('companyWebsite');

  // Save Company Info - Real Electron API
  async function saveCompany() {
    try {
      const api = getAPI();
      if (!(api && api.saveCompanyInfo)) return;

      const name = document.getElementById('companyName')?.value?.trim() || '';
      const name_en = document.getElementById('companyNameEn')?.value?.trim() || '';
      const address = document.getElementById('companyAddress')?.value?.trim() || '';
      const address_en = document.getElementById('companyAddressEn')?.value?.trim() || '';
      let tax = document.getElementById('companyTax')?.value || '';
      const phone = document.getElementById('companyPhone')?.value?.trim() || '';
      const email = document.getElementById('companyEmail')?.value?.trim() || '';
      const website = document.getElementById('companyWebsite')?.value?.trim() || '';
      
      // digits only
      tax = (tax.match(/\d+/g) || []).join('');
      const taxEl = document.getElementById('companyTax');
      if (taxEl) taxEl.value = tax; // normalize view
      
      if (tax.length !== 15) {
        showToast(tax.length < 15 ? tSettings('taxNumberIncomplete') : tSettings('taxNumberMustBe15'), 'err');
        return;
      }
      
      const res = await api.saveCompanyInfo({ name, name_en, address, address_en, tax, phone, email, website });
      showToast(res && res.success ? tSettings('infoSaved') : (tSettings('infoSaveFailed') + (res?.error ? ': ' + res.error : '')), res && res.success ? 'ok' : 'err');
      
    } catch (error) {
      showToast(tSettings('infoSaveError'), 'err');
    }
  }
  
  if (btnSave) {
    btnSave.addEventListener('click', saveCompany);
  }

  // ===== Database Statistics =====
  const btnExport = document.getElementById('btnExportDb');
  const btnImport = document.getElementById('btnImportDb');
  const btnRefreshStats = document.getElementById('icoRefreshStats');

  // Load DB stats
  async function loadDbStats() {
    try {
      const wrap = document.getElementById('tblBars');
      if (!wrap) return;
      wrap.innerHTML = '';

      // Table name translations
      const tableLabels = {
        'journal_entries': tSettings('tblJournalEntries'),
        'receipts': tSettings('tblReceipts'),
        'vouchers': tSettings('tblPayments'),
        'sales_invoices': tSettings('tblSalesInvoices'),
        'purchase_invoices': tSettings('tblPurchaseInvoices'),
        'openings': tSettings('tblOpeningBalances'),
        'orders': tSettings('tblOrders'),
        'categories': tSettings('tblCategories'),
        'accounts': tSettings('tblAccounts'),
        'permissions': tSettings('tblPermissions'),
        'currencies': tSettings('tblCurrencies'),
        'users': tSettings('tblUsers'),
        'customers': tSettings('tblCustomers'),
        'suppliers': tSettings('tblSuppliers'),
        'account_types': tSettings('tblAccountTypes'),
        'user_permissions': tSettings('tblUserPermissions'),
        'company': tSettings('tblCompanyInfo'),
        'branches': tSettings('tblBranches'),
        'user_branches': tSettings('tblUserBranches'),
        'customer_branches': tSettings('tblCustomerBranches'),
        'supplier_branches': tSettings('tblSupplierBranches'),
        'journal_lines': tSettings('tblDetails') + ' ' + tSettings('tblJournalEntries'),
        'voucher_lines': tSettings('tblDetails') + ' ' + tSettings('tblPayments'),
        'receipt_lines': tSettings('tblDetails') + ' ' + tSettings('tblReceipts'),
        'sales_invoice_details': tSettings('tblDetails') + ' ' + tSettings('tblSalesInvoices'),
        'purchase_invoice_details': tSettings('tblDetails') + ' ' + tSettings('tblPurchaseInvoices'),
        'opening_lines': tSettings('tblDetails') + ' ' + tSettings('tblOpeningBalances'),
        'gold_items': tSettings('tblGoldItems'),
        'default_boxes': tSettings('tblDefaultBoxes'),
        'tax_declarations': tSettings('tblTaxDeclarations'),
        'gold_karats': tSettings('tblGoldKarats'),
        'invoice_settings': tSettings('tblInvoiceSettings')
      };

      // Get all tables from getDbStats
      let allTables = [];
      if (window.sys && window.sys.getDbStats) {
        try {
          const r = await window.sys.getDbStats();
          if (r && r.success && Array.isArray(r.tables)) {
            allTables = r.tables.map(t => ({
              name: t.name,
              label: tableLabels[t.name] || t.label || t.name,
              count: t.count || 0
            }));
          }
        } catch (e) { }
      }

      // Define related tables (header -> details)
      const relatedTables = {
        'journal_entries': 'journal_lines',
        'vouchers': 'voucher_lines',
        'receipts': 'receipt_lines',
        'sales_invoices': 'sales_invoice_details',
        'purchase_invoices': 'purchase_invoice_details',
        'openings': 'opening_lines'
      };

      // Create a map for quick lookup
      const tableMap = new Map(allTables.map(t => [t.name, t]));

      // Get detail table names to hide them from main list
      const detailTableNames = new Set(Object.values(relatedTables));

      // Filter tables: exclude detail tables
      const tables = allTables.filter(t => !detailTableNames.has(t.name));

      // Total tables (count only main tables)
      const totalEl = document.getElementById('tblTotal');
      if (totalEl) totalEl.textContent = (tables?.length ?? 0);

      // Render bars
      const max = Math.max(1, ...tables.map(x => x.count || 0));
      for (let i = 0; i < tables.length; i++) {
        const t = tables[i];

        // Container for each table
        const container = document.createElement('div');
        container.className = 'table-stat-item';
        container.style.animationDelay = (i * 0.04) + 's';

        // Header with label and count
        const header = document.createElement('div');
        header.className = 'table-stat-header';
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.alignItems = 'flex-start';

        const labelContainer = document.createElement('div');
        labelContainer.className = 'label-container';

        const mainLabel = document.createElement('div');
        mainLabel.className = 'stat-head';
        mainLabel.textContent = (t.label || t.name);
        labelContainer.appendChild(mainLabel);

        // Check if this table has details
        const detailTableName = relatedTables[t.name];
        if (detailTableName && tableMap.has(detailTableName)) {
          const detailTable = tableMap.get(detailTableName);
          const detailLabel = document.createElement('div');
          detailLabel.className = 'stat-detail';
          detailLabel.textContent = `${detailTable.label || detailTableName} (${detailTable.count || 0})`;
          labelContainer.appendChild(detailLabel);
        }

        const value = document.createElement('div');
        value.className = 'value';
        const num = document.createElement('span');
        num.textContent = String(t.count || 0);
        const pct = Math.round(((t.count || 0) / max) * 100);
        const pc = document.createElement('span');
        pc.className = 'pct';
        pc.textContent = pct + '%';
        value.appendChild(num);
        value.appendChild(pc);

        header.appendChild(labelContainer);
        header.appendChild(value);

        // Progress bars container
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';

        // Main progress bar
        const bar = document.createElement('div');
        const barClass = t.name === 'customers' ? 'bar-customers' :
          t.name === 'suppliers' ? 'bar-suppliers' :
            t.name === 'accounts' ? 'bar-accounts' :
              t.name === 'users' ? 'bar-users' :
                t.name === 'vouchers' ? 'bar-vouchers' :
                  t.name === 'receipts' ? 'bar-receipts' :
                    t.name === 'journal_entries' ? 'bar-journal' :
                      t.name === 'sales_invoices' ? 'bar-sales' :
                        t.name === 'purchase_invoices' ? 'bar-purchase' :
                          t.name === 'openings' ? 'bar-openings' : '';
        bar.className = `progress anim ${barClass}`;

        const inner = document.createElement('div');
        inner.className = 'progress-bar';
        inner.style.width = '0%';
        requestAnimationFrame(() => { inner.style.width = pct + '%'; });
        bar.appendChild(inner);
        progressContainer.appendChild(bar);

        // Detail progress bar (if exists)
        if (detailTableName && tableMap.has(detailTableName)) {
          const detailTable = tableMap.get(detailTableName);
          const detailCount = detailTable.count || 0;
          const detailPct = Math.round((detailCount / max) * 100);

          const detailBar = document.createElement('div');
          detailBar.className = 'progress anim detail-progress';

          const detailInner = document.createElement('div');
          detailInner.className = 'progress-bar';
          detailInner.style.width = '0%';
          requestAnimationFrame(() => { detailInner.style.width = detailPct + '%'; });
          detailBar.appendChild(detailInner);
          progressContainer.appendChild(detailBar);
        }

        container.appendChild(header);
        container.appendChild(progressContainer);
        wrap.appendChild(container);
      }
    } catch (_) { }
  }

  // Load DB info quick
  async function loadDbInfo() {
    try {
      const api = getAPI();
      if (!(api && api.getDbInfo)) return;
      const infoRes = await api.getDbInfo();
      if (!infoRes || !infoRes.success) {
        const p = document.getElementById('dbPathInfo');
        if (p) p.textContent = tSettings('dbPathReadFailed');
        return;
      }
      const { path } = infoRes.info || {};
      const p = document.getElementById('dbPathInfo');
      if (p) p.textContent = tSettings('dbPathLabelValue').replace('{path}', path || '—');
    } catch (_) { }
  }

  // Refresh button
  async function doRefresh(target) {
    if (target) target.classList.add('spinning');
    try {
      await loadDbInfo();
      await loadDbStats();
    } finally {
      if (target) target.classList.remove('spinning');
    }
  }

  if (btnRefreshStats) btnRefreshStats.addEventListener('click', () => doRefresh(btnRefreshStats));

  // Export/Import with modal system
  if (btnExport) btnExport.addEventListener('click', () => {
    if (window.exportImportManager) {
      window.exportImportManager.openExportModal();
    }
  });

  if (btnImport) btnImport.addEventListener('click', () => {
    if (window.exportImportManager) {
      window.exportImportManager.openImportModal();
    }
  });

  // Expose loadDbStats globally for export/import manager
  window.loadDbStats = loadDbStats;
  window.loadDbInfo = loadDbInfo;

  // Load stats on page load
  setTimeout(() => {
    loadDbInfo();
    loadDbStats();
  }, 300);

  // ===== Backup Settings Functions =====
  const backupEnabled = document.getElementById('backupEnabled');
  const backupSettings = document.getElementById('backupSettings');
  const backupInterval = document.getElementById('backupInterval');
  const backupKeepCount = document.getElementById('backupKeepCount');
  
  // Interval control buttons
  const btnDecreaseInterval = document.getElementById('btnDecreaseInterval');
  const btnIncreaseInterval = document.getElementById('btnIncreaseInterval');
  const btnDecreaseKeep = document.getElementById('btnDecreaseKeep');
  const btnIncreaseKeep = document.getElementById('btnIncreaseKeep');
  
  // Action buttons
  const btnCreateBackup = document.getElementById('btnCreateBackup');
  const btnViewBackups = document.getElementById('btnViewBackups');
  const btnOpenBackupFolder = document.getElementById('btnOpenBackupFolder');
  const btnSaveBackupSettings = document.getElementById('btnSaveBackupSettings');
  
  // Info elements
  const lastBackupTime = document.getElementById('lastBackupTime');
  const backupCount = document.getElementById('backupCount');
  const nextBackupTime = document.getElementById('nextBackupTime');

  // Load settings from localStorage
  function loadBackupSettings() {
    try {
      const settings = JSON.parse(localStorage.getItem('backupSettings') || '{}');
      
      if (backupEnabled) {
        backupEnabled.checked = settings.enabled !== false; // Default true
      }
      
      if (backupInterval) {
        backupInterval.value = settings.interval || 6;
      }
      
      if (backupKeepCount) {
        backupKeepCount.value = settings.keepCount || 30;
      }
      
      toggleBackupSettings(backupEnabled?.checked);
      
      // Update info immediately and continuously
      updateBackupInfo();
      
      // Force update after a short delay to ensure API is ready
      setTimeout(() => updateBackupInfo(), 500);
      setTimeout(() => updateBackupInfo(), 1000);
      setTimeout(() => updateBackupInfo(), 2000);
    } catch (e) {
      if (backupCount) backupCount.textContent = '0';
      if (lastBackupTime) lastBackupTime.textContent = 'لم يتم إنشاء نسخة بعد';
      if (nextBackupTime) nextBackupTime.textContent = 'عند بدء البرنامج القادم';
    }
  }

  // Save settings to localStorage
  function saveBackupSettings() {
    try {
      const settings = {
        enabled: backupEnabled?.checked || false,
        interval: parseInt(backupInterval?.value || 6),
        keepCount: parseInt(backupKeepCount?.value || 30)
      };
      
      localStorage.setItem('backupSettings', JSON.stringify(settings));
      
      // Send to main process
      const api = getAPI();
      if (api && api.saveBackupSettings) {
        api.saveBackupSettings(settings);
      }
      
      showToast(tSettings('backupSettingsSaved'), 'ok');
      
      // Update info immediately with new interval
      setTimeout(() => updateBackupInfo(), 100);
      setTimeout(() => updateBackupInfo(), 500);
    } catch (e) {
      showToast(tSettings('backupSettingsFailed'), 'err');
    }
  }

  // Toggle backup settings visibility
  function toggleBackupSettings(show) {
    if (backupSettings) {
      if (show) {
        backupSettings.classList.remove('hidden');
      } else {
        backupSettings.classList.add('hidden');
      }
    }
  }

  // Update backup info
  async function updateBackupInfo() {
    try {
      const api = getAPI();
      if (!api || !api.getBackupList) {
        // Set default values if API not available
        if (backupCount) backupCount.textContent = '0';
        if (lastBackupTime) lastBackupTime.textContent = 'لم يتم إنشاء نسخة بعد';
        if (nextBackupTime) nextBackupTime.textContent = 'عند بدء البرنامج القادم';
        return;
      }
      
      const result = await api.getBackupList();
      
      if (result && result.success && result.backups) {
        const backups = result.backups;
        
        // Update count
        if (backupCount) {
          backupCount.textContent = backups.length.toString();
        }
        
        // Update last backup time
        if (lastBackupTime) {
          if (backups.length > 0) {
            const lastBackup = backups[0];
            const date = new Date(lastBackup.time);
            lastBackupTime.textContent = formatDateArabic(date);
          } else {
            lastBackupTime.textContent = 'لم يتم إنشاء نسخة بعد';
          }
        }
        
        // Calculate next backup time
        if (nextBackupTime) {
          const interval = parseInt(backupInterval?.value || 6);
          if (backups.length > 0) {
            const lastBackup = backups[0];
            const nextTime = new Date(lastBackup.time);
            nextTime.setHours(nextTime.getHours() + interval);
            
            const now = new Date();
            const diff = nextTime - now;
            
            if (diff > 0) {
              const totalMinutes = Math.floor(diff / (1000 * 60));
              const hours = Math.floor(totalMinutes / 60);
              const minutes = totalMinutes % 60;
              
              if (hours > 0) {
                nextBackupTime.textContent = tSettings('hoursAndMinutes').replace('{hours}', hours).replace('{minutes}', minutes);
              } else {
                nextBackupTime.textContent = tSettings('minutesOnly').replace('{minutes}', minutes);
              }
            } else {
              nextBackupTime.textContent = tSettings('verySoon');
            }
          } else {
            nextBackupTime.textContent = tSettings('afterAppStart');
          }
        }
      } else {
        if (backupCount) backupCount.textContent = '0';
        if (lastBackupTime) lastBackupTime.textContent = tSettings('noBackupYet');
        if (nextBackupTime) nextBackupTime.textContent = tSettings('onNextAppStart');
      }
    } catch (e) {
      if (backupCount) backupCount.textContent = '0';
      if (lastBackupTime) lastBackupTime.textContent = tSettings('notAvailable');
      if (nextBackupTime) nextBackupTime.textContent = tSettings('notAvailable');
    }
  }

  // Format date in Arabic style with time (12-hour format with AM/PM)
  function formatDateArabic(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    // Convert to 12-hour format
    const period = hours >= 12 ? 'م' : 'ص';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    const hoursStr = String(hours).padStart(2, '0');
    
    // Format: YYYY/MM/DD - HH:MM:SS ص/م
    return `${year}/${month}/${day} - ${hoursStr}:${minutes}:${seconds} ${period}`;
  }

  // Event listeners
  if (backupEnabled) {
    backupEnabled.addEventListener('change', (e) => {
      toggleBackupSettings(e.target.checked);
    });
  }

  // Interval controls
  if (btnDecreaseInterval && backupInterval) {
    btnDecreaseInterval.addEventListener('click', () => {
      const current = parseInt(backupInterval.value);
      if (current > 1) {
        backupInterval.value = current - 1;
        setTimeout(() => updateBackupInfo(), 100);
      }
    });
  }

  if (btnIncreaseInterval && backupInterval) {
    btnIncreaseInterval.addEventListener('click', () => {
      const current = parseInt(backupInterval.value);
      if (current < 24) {
        backupInterval.value = current + 1;
        setTimeout(() => updateBackupInfo(), 100);
      }
    });
  }

  // Update when interval input changes manually
  if (backupInterval) {
    backupInterval.addEventListener('input', () => {
      setTimeout(() => updateBackupInfo(), 100);
    });
  }

  // Keep count controls
  if (btnDecreaseKeep && backupKeepCount) {
    btnDecreaseKeep.addEventListener('click', () => {
      const current = parseInt(backupKeepCount.value);
      if (current > 5) {
        backupKeepCount.value = current - 5;
      }
    });
  }

  if (btnIncreaseKeep && backupKeepCount) {
    btnIncreaseKeep.addEventListener('click', () => {
      const current = parseInt(backupKeepCount.value);
      if (current < 100) {
        backupKeepCount.value = current + 5;
      }
    });
  }

  // Create backup now
  if (btnCreateBackup) {
    btnCreateBackup.addEventListener('click', async () => {
      try {
        btnCreateBackup.disabled = true;
        btnCreateBackup.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> ${tSettings('creating')}`;
        
        const api = getAPI();
        if (!api || !api.createManualBackup) {
          showToast(tSettings('funcNotAvailable'), 'err');
          return;
        }
        
        const result = await api.createManualBackup();
        
        if (result && result.success) {
          showToast('✅ ' + tSettings('backupCreated'), 'ok');
          
          // Update info multiple times to ensure display
          setTimeout(() => updateBackupInfo(), 100);
          setTimeout(() => updateBackupInfo(), 500);
          setTimeout(() => updateBackupInfo(), 1000);
        } else {
          showToast(tSettings('backupCreateFailed') + ': ' + (result.error || tSettings('unknownError')), 'err');
        }
      } catch (e) {
        showToast(tSettings('backupCreateError'), 'err');
      } finally {
        btnCreateBackup.disabled = false;
        btnCreateBackup.innerHTML = `<i class="fa-solid fa-floppy-disk"></i> <span>${tSettings('createBackupNow')}</span>`;
      }
    });
  }

  // View backups list
  if (btnViewBackups) {
    btnViewBackups.addEventListener('click', () => {
      openBackupListModal();
    });
  }

  // Open backup folder
  if (btnOpenBackupFolder) {
    btnOpenBackupFolder.addEventListener('click', async () => {
      try {
        const api = getAPI();
        if (!api || !api.openBackupFolder) {
          showToast(tSettings('funcNotAvailable'), 'err');
          return;
        }
        
        await api.openBackupFolder();
        showToast(tSettings('folderOpened'), 'ok');
      } catch (e) {
        showToast(tSettings('folderOpenFailed'), 'err');
      }
    });
  }

  // Save settings button
  if (btnSaveBackupSettings) {
    btnSaveBackupSettings.addEventListener('click', () => {
      saveBackupSettings();
    });
  }

  // Load settings on init
  loadBackupSettings();
  
  // Update info every 10 seconds for accurate countdown
  setInterval(updateBackupInfo, 10000);
  
  // Also update when window gains focus
  window.addEventListener('focus', () => {
    updateBackupInfo();
  });

  // ===== Backup List Modal Functions =====
  let backupModalInitialized = false;

  function openBackupListModal() {
    const modal = document.getElementById('backupListModal');
    if (!modal) {
      showToast(tSettings('modalNotReady'), 'err');
      return;
    }
    
    // Setup event listeners only once
    if (!backupModalInitialized) {
      setupBackupListModal();
      backupModalInitialized = true;
    }
    
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Apply translations
    applySettingsTranslations();
    
    // Load data
    loadBackupListData();
  }

  function closeBackupListModal() {
    const modal = document.getElementById('backupListModal');
    if (modal) {
      modal.classList.remove('active');
    }
  }

  function setupBackupListModal() {
    const btnClose = document.getElementById('btnCloseBackupList');
    const btnCloseFooter = document.getElementById('btnCloseBackupListFooter');
    const btnRefresh = document.getElementById('btnRefreshBackupList');
    const searchInput = document.getElementById('backupSearch');
    const modal = document.getElementById('backupListModal');
    
    if (!modal) return;
    
    // Close buttons
    if (btnClose) {
      btnClose.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeBackupListModal();
      });
    }
    
    if (btnCloseFooter) {
      btnCloseFooter.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeBackupListModal();
      });
    }
    
    // Click outside to close
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal && e.target.classList.contains('backup-modal')) {
          closeBackupListModal();
        }
      });
    }
    
    // Refresh button
    if (btnRefresh) {
      btnRefresh.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        loadBackupListData();
        showToast(tSettings('listRefreshed'), 'ok');
      });
    }
    
    // Search functionality
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        filterBackupTable(e.target.value);
      });
    }
    
    // ESC key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const modal = document.getElementById('backupListModal');
        if (modal && modal.classList.contains('active')) {
          e.preventDefault();
          e.stopPropagation();
          closeBackupListModal();
        }
      }
    });
  }

  async function loadBackupListData() {
    try {
      const api = getAPI();
      if (!api || !api.getBackupList) {
        showToast(tSettings('funcNotAvailable'), 'err');
        showNoBackupsMessage();
        return;
      }
      
      const result = await api.getBackupList();
      
      if (result && result.success && result.backups) {
        populateBackupTable(result.backups);
        updateBackupStats(result.backups);
      } else {
        showNoBackupsMessage();
      }
    } catch (e) {
      showToast(tSettings('listLoadFailed'), 'err');
      showNoBackupsMessage();
    }
  }

  function populateBackupTable(backups) {
    const tbody = document.getElementById('backupTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (backups.length === 0) {
      showNoBackupsMessage();
      return;
    }
    
    backups.forEach((backup) => {
      const row = createBackupRow(backup);
      tbody.appendChild(row);
    });
  }

  function createBackupRow(backup) {
    const row = document.createElement('tr');
    const date = new Date(backup.time);
    const size = (backup.size / 1024 / 1024).toFixed(2);
    
    // Format date and time
    const dateStr = formatBackupDate(date);
    const timeStr = formatBackupTime(date);
    
    row.innerHTML = `
      <td class="col-icon">
        <div class="backup-icon">
          <i class="fa-solid fa-database"></i>
        </div>
      </td>
      <td class="col-name">
        <div class="backup-name">${backup.name}</div>
      </td>
      <td class="col-date">
        <div class="backup-date">
          <i class="fa-solid fa-calendar"></i>
          ${dateStr}
        </div>
      </td>
      <td class="col-time">
        <div class="backup-time">
          <i class="fa-solid fa-clock"></i>
          ${timeStr}
        </div>
      </td>
      <td class="col-size">
        <span class="backup-size">${size} MB</span>
      </td>
      <td class="col-actions">
        <div class="backup-actions-cell">
          <button class="action-btn info" title="معلومات" onclick="showBackupInfo('${backup.name}', '${size}', '${backup.time}')">
            <i class="fa-solid fa-info"></i>
          </button>
        </div>
      </td>
    `;
    
    return row;
  }

  function formatBackupDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  }

  function formatBackupTime(date) {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    const period = hours >= 12 ? 'م' : 'ص';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const hoursStr = String(hours).padStart(2, '0');
    
    return `${hoursStr}:${minutes}:${seconds} <span class="period">${period}</span>`;
  }

  function updateBackupStats(backups) {
    const totalBackups = document.getElementById('totalBackups');
    const totalSize = document.getElementById('totalSize');
    
    if (totalBackups) {
      totalBackups.textContent = backups.length;
    }
    
    if (totalSize && backups.length > 0) {
      const total = backups.reduce((sum, backup) => sum + backup.size, 0);
      const totalMB = (total / 1024 / 1024).toFixed(2);
      totalSize.textContent = `${totalMB} MB`;
    } else if (totalSize) {
      totalSize.textContent = '0 MB';
    }
  }

  function showNoBackupsMessage() {
    const tbody = document.getElementById('backupTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = `
      <tr class="no-data show">
        <td colspan="6">
          <div class="no-data-message">
            <i class="fa-solid fa-inbox"></i>
            <p data-i18n="noBackups">${tSettings('noBackups')}</p>
          </div>
        </td>
      </tr>
    `;
    
    // Reset stats
    const totalBackups = document.getElementById('totalBackups');
    const totalSize = document.getElementById('totalSize');
    if (totalBackups) totalBackups.textContent = '0';
    if (totalSize) totalSize.textContent = '0 MB';
  }

  function filterBackupTable(searchTerm) {
    const rows = document.querySelectorAll('#backupTableBody tr:not(.no-data)');
    const term = searchTerm.toLowerCase();
    
    let visibleCount = 0;
    
    rows.forEach(row => {
      const name = row.querySelector('.backup-name')?.textContent.toLowerCase() || '';
      const date = row.querySelector('.backup-date')?.textContent.toLowerCase() || '';
      const time = row.querySelector('.backup-time')?.textContent.toLowerCase() || '';
      
      if (name.includes(term) || date.includes(term) || time.includes(term)) {
        row.style.display = '';
        visibleCount++;
      } else {
        row.style.display = 'none';
      }
    });
    
    // Show/hide no data message
    const noData = document.querySelector('#backupTableBody .no-data');
    if (visibleCount === 0 && noData) {
      noData.classList.add('show');
    } else if (noData) {
      noData.classList.remove('show');
    }
  }

  // Global function for backup info
  window.showBackupInfo = async function(name, size, time) {
    const date = new Date(time);
    const formattedDate = formatDateArabic(date);
    
    const message = `${tSettings('backupInfoTitle')}\n` +
                    `📦 ${tSettings('backupInfoName')}:\n${name}\n\n` +
                    `📅 ${tSettings('backupInfoDateTime')}:\n${formattedDate}\n\n` +
                    `💾 ${tSettings('backupInfoSize')}:\n${size} MB`;
    
    showToast(message, 'ok');
  };

  // ===== Currency DataGrid System =====
  initCurrencyDataGrid();
});

// ===== Currency DataGrid System =====
const DEFAULT_CURRENCIES = [
  // عملات عربية
  { code: 'SAR', name: 'ريال سعودي', symbol: 'ر.س', flag: '🇸🇦', icon: 'fa-dollar-sign', type: 'arab' },
  { code: 'AED', name: 'درهم إماراتي', symbol: 'د.إ', flag: '🇦🇪', icon: 'fa-dollar-sign', type: 'arab' },
  { code: 'KWD', name: 'دينار كويتي', symbol: 'د.ك', flag: '🇰🇼', icon: 'fa-coins', type: 'arab' },
  { code: 'BHD', name: 'دينار بحريني', symbol: 'د.ب', flag: '🇧🇭', icon: 'fa-coins', type: 'arab' },
  { code: 'OMR', name: 'ريال عماني', symbol: 'ر.ع', flag: '🇴🇲', icon: 'fa-coins', type: 'arab' },
  { code: 'QAR', name: 'ريال قطري', symbol: 'ر.ق', flag: '🇶🇦', icon: 'fa-dollar-sign', type: 'arab' },
  { code: 'JOD', name: 'دينار أردني', symbol: 'د.أ', flag: '🇯🇴', icon: 'fa-coins', type: 'arab' },
  { code: 'EGP', name: 'جنيه مصري', symbol: 'ج.م', flag: '🇪🇬', icon: 'fa-pound-sign', type: 'arab' },
  { code: 'LBP', name: 'ليرة لبنانية', symbol: 'ل.ل', flag: '🇱🇧', icon: 'fa-lira-sign', type: 'arab' },
  { code: 'SYP', name: 'ليرة سورية', symbol: 'ل.س', flag: '🇸🇾', icon: 'fa-lira-sign', type: 'arab' },
  { code: 'IQD', name: 'دينار عراقي', symbol: 'د.ع', flag: '🇮🇶', icon: 'fa-coins', type: 'arab' },
  { code: 'MAD', name: 'درهم مغربي', symbol: 'د.م', flag: '🇲🇦', icon: 'fa-coins', type: 'arab' },
  
  // عملات عالمية
  { code: 'USD', name: 'دولار أمريكي', symbol: '$', flag: '🇺🇸', icon: 'fa-dollar-sign', type: 'world' },
  { code: 'EUR', name: 'يورو', symbol: '€', flag: '🇪🇺', icon: 'fa-euro-sign', type: 'world' },
  { code: 'GBP', name: 'جنيه إسترليني', symbol: '£', flag: '🇬🇧', icon: 'fa-sterling-sign', type: 'world' },
  { code: 'JPY', name: 'ين ياباني', symbol: '¥', flag: '🇯🇵', icon: 'fa-yen-sign', type: 'world' },
  { code: 'CNY', name: 'يوان صيني', symbol: '¥', flag: '🇨🇳', icon: 'fa-yen-sign', type: 'world' },
  { code: 'CHF', name: 'فرنك سويسري', symbol: 'Fr', flag: '🇨🇭', icon: 'fa-franc-sign', type: 'world' },
  { code: 'CAD', name: 'دولار كندي', symbol: 'C$', flag: '🇨🇦', icon: 'fa-dollar-sign', type: 'world' },
  { code: 'AUD', name: 'دولار أسترالي', symbol: 'A$', flag: '🇦🇺', icon: 'fa-dollar-sign', type: 'world' },
  { code: 'INR', name: 'روبية هندية', symbol: '₹', flag: '🇮🇳', icon: 'fa-rupee-sign', type: 'world' },
  { code: 'TRY', name: 'ليرة تركية', symbol: '₺', flag: '🇹🇷', icon: 'fa-lira-sign', type: 'world' },
  { code: 'RUB', name: 'روبل روسي', symbol: '₽', flag: '🇷🇺', icon: 'fa-ruble-sign', type: 'world' },
  { code: 'KRW', name: 'وون كوري', symbol: '₩', flag: '🇰🇷', icon: 'fa-won-sign', type: 'world' },
  { code: 'MXN', name: 'بيزو مكسيكي', symbol: 'Mex$', flag: '🇲🇽', icon: 'fa-dollar-sign', type: 'world' }
];

let currencies = [];
let defaultCurrency = null;
let currentFilter = 'all';
let editingCurrencyCode = null;
let currencyFormModalInitialized = false;

function getCurrencySettingsApi() {
  if (window.parent && window.parent !== window && window.parent.api) {
    return window.parent.api;
  }
  if (window.api) {
    return window.api;
  }
  return null;
}

function getStoredBranchScopeState() {
  try {
    const raw = localStorage.getItem('branchScope');
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

function isAllBranchesScopeActive() {
  const scope = getStoredBranchScopeState();
  return String(scope?.mode || scope?.scope || '').trim().toLowerCase() === 'all';
}

function createDefaultCurrencyList() {
  return DEFAULT_CURRENCIES.map((c, index) => ({
    ...c,
    id: index + 1,
    rate: c.code === 'SAR' ? 1.0 : 1.0,
    isDefault: c.code === 'SAR',
    is_base: c.code === 'SAR'
  }));
}

function normalizeCurrencyState(sourceList = [], requestedDefaultCode = null) {
  const fallbackList = createDefaultCurrencyList();
  const fallbackMap = new Map(fallbackList.map((item) => [item.code, item]));
  const merged = [];
  const seenCodes = new Set();

  const appendCurrency = (item = {}) => {
    const code = String(item?.code || '').trim().toUpperCase();
    if (!code || seenCodes.has(code)) {
      return;
    }
    const fallback = fallbackMap.get(code) || {};
    const numericRate = Number(item?.rate ?? item?.exchange_rate);
    merged.push({
      ...fallback,
      ...item,
      id: Number(item?.id || fallback?.id || merged.length + 1) || merged.length + 1,
      code,
      name: String(item?.name || item?.name_ar || fallback?.name || code).trim() || code,
      symbol: String(item?.symbol || fallback?.symbol || code).trim() || code,
      flag: String(item?.flag || fallback?.flag || '🏳️').trim() || '🏳️',
      icon: String(item?.icon || fallback?.icon || 'fa-dollar-sign').trim() || 'fa-dollar-sign',
      type: String(item?.type || fallback?.type || 'world').trim().toLowerCase() === 'arab' ? 'arab' : 'world',
      rate: Number.isFinite(numericRate) && numericRate > 0 ? numericRate : Number(fallback?.rate || 1) || 1,
    });
    seenCodes.add(code);
  };

  (Array.isArray(sourceList) ? sourceList : []).forEach(appendCurrency);
  fallbackList.forEach(appendCurrency);

  let defaultCode = String(requestedDefaultCode || '').trim().toUpperCase();
  if (!defaultCode) {
    defaultCode = String(merged.find((item) => item?.isDefault || item?.is_base)?.code || 'SAR').trim().toUpperCase() || 'SAR';
  }
  if (!merged.some((item) => item.code === defaultCode)) {
    defaultCode = merged[0]?.code || 'SAR';
  }

  const normalizedCurrencies = merged.map((item, index) => ({
    ...item,
    id: Number(item?.id || index + 1) || index + 1,
    isDefault: item.code === defaultCode,
    is_base: item.code === defaultCode,
  }));

  return {
    currencies: normalizedCurrencies,
    defaultCurrency: normalizedCurrencies.find((item) => item.code === defaultCode) || normalizedCurrencies[0] || null,
  };
}

function syncCurrenciesToLocalStorage(notify = true) {
  // Save in both formats for compatibility
  localStorage.setItem('currencies', JSON.stringify(currencies));
  localStorage.setItem('defaultCurrency', JSON.stringify(defaultCurrency));
  
  // Also save in reports format (app_currencies)
  localStorage.setItem('app_currencies', JSON.stringify(currencies));
  
  // Save default currency ID for reports
  if (defaultCurrency && defaultCurrency.id) {
    localStorage.setItem('app_base_currency_id', defaultCurrency.id.toString());
  } else {
    localStorage.removeItem('app_base_currency_id');
  }
  
  // Dispatch custom event to notify other screens
  if (notify) {
    window.dispatchEvent(new Event('currenciesUpdated'));
  }
}

function applyCurrencySettingsState(settings = {}, options = {}) {
  const source = Array.isArray(settings)
    ? { currencies: settings }
    : ((settings && typeof settings === 'object' && !Array.isArray(settings)) ? settings : {});
  const normalized = normalizeCurrencyState(
    source?.currencies,
    source?.defaultCurrencyCode || source?.default_currency_code || source?.defaultCurrency?.code || null
  );
  currencies = normalized.currencies;
  defaultCurrency = normalized.defaultCurrency;
  syncCurrenciesToLocalStorage(Boolean(options?.notify));
  updateInfoBar();
  return normalized;
}

function snapshotCurrencyState() {
  return {
    currencies: currencies.map((currency) => ({ ...currency })),
    defaultCode: defaultCurrency?.code || currencies.find((currency) => currency?.isDefault || currency?.is_base)?.code || null,
  };
}

function restoreCurrencyState(snapshot) {
  applyCurrencySettingsState({
    currencies: Array.isArray(snapshot?.currencies) ? snapshot.currencies : [],
    defaultCurrencyCode: snapshot?.defaultCode || null,
  }, { notify: false });
}

async function initCurrencyDataGrid() {
  window.CurrencySettingsManager = {
    reloadCard: async (options = {}) => {
      await loadCurrencies({ forceFresh: Boolean(options?.forceFresh) });
      renderCurrencyDataGrid();
      return true;
    }
  };

  // Load currencies from localStorage
  await loadCurrencies();
  
  // Render datagrid
  renderCurrencyDataGrid();
  
  // Setup event listeners
  setupCurrencyDataGridEvents();
}

async function loadCurrencies(options = {}) {
  try {
    const api = getCurrencySettingsApi();
    if (api && typeof api.getCurrencySettings === 'function') {
      const result = await api.getCurrencySettings({ forceFresh: Boolean(options?.forceFresh) });
      if (result && result.success && result.data) {
        applyCurrencySettingsState(result.data, { notify: false });
        return;
      }
    }
  } catch (_) {}

  const saved = localStorage.getItem('currencies') || localStorage.getItem('app_currencies');
  if (saved) {
    try {
      const parsedCurrencies = JSON.parse(saved);
      const savedDefaultCurrency = JSON.parse(localStorage.getItem('defaultCurrency') || 'null');
      applyCurrencySettingsState({
        currencies: parsedCurrencies,
        defaultCurrencyCode: savedDefaultCurrency?.code || null,
      }, { notify: false });
      return;
    } catch (_) {}
  }

  applyCurrencySettingsState({
    currencies: createDefaultCurrencyList(),
    defaultCurrencyCode: 'SAR',
  }, { notify: false });
}

async function saveCurrencies(options = {}) {
  if (isAllBranchesScopeActive()) {
    if (!options?.silent) {
      showToast('لا يمكن حفظ إعدادات العملات أثناء عرض كل الفروع. اختر فرعًا محددًا أولاً', 'err');
    }
    return false;
  }

  const normalized = normalizeCurrencyState(currencies, defaultCurrency?.code || null);
  const payload = {
    currencies: normalized.currencies,
    defaultCurrencyCode: normalized.defaultCurrency?.code || normalized.currencies[0]?.code || 'SAR',
  };

  try {
    const api = getCurrencySettingsApi();
    if (api && typeof api.saveCurrencySettings === 'function') {
      const result = await api.saveCurrencySettings(payload);
      if (!(result && result.success)) {
        if (!options?.silent) {
          showToast(result?.error || 'تعذر حفظ إعدادات العملات', 'err');
        }
        return false;
      }
      applyCurrencySettingsState(result.data || payload, { notify: true });
      return true;
    }

    applyCurrencySettingsState(payload, { notify: true });
    return true;
  } catch (error) {
    if (!options?.silent) {
      showToast(error?.message || 'تعذر حفظ إعدادات العملات', 'err');
    }
    return false;
  }
}

function updateInfoBar() {
  const defaultName = document.getElementById('defaultCurrencyName');
  const totalCount = document.getElementById('totalCurrenciesCount');
  const lastUpdate = document.getElementById('lastUpdateTime');
  
  if (defaultName && defaultCurrency) {
    defaultName.textContent = defaultCurrency.name;
  }
  
  if (totalCount) {
    totalCount.textContent = currencies.length;
  }
  
  if (lastUpdate) {
    const now = new Date();
    const date = now.toLocaleDateString('en-GB', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    });
    const time = now.toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false
    });
    lastUpdate.textContent = `${date} - ${time}`;
  }
}

function setupCurrencyDataGridEvents() {
  // Add currency button
  const btnAdd = document.getElementById('btnAddCurrency');
  if (btnAdd) {
    btnAdd.addEventListener('click', () => openCurrencyFormModal());
  }
  
  // Refresh rates button
  const btnRefresh = document.getElementById('btnRefreshRates');
  if (btnRefresh) {
    btnRefresh.addEventListener('click', refreshExchangeRates);
  }
  
  // Search
  const searchInput = document.getElementById('currencySearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterCurrencyDataGrid(e.target.value);
    });
  }
  
  // Filter buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      renderCurrencyDataGrid();
    });
  });
}

function renderCurrencyDataGrid() {
  const tbody = document.getElementById('currencyDatagridBody');
  const noMessage = document.getElementById('noCurrenciesMessage');
  
  if (!tbody) return;
  
  tbody.innerHTML = '';
  
  let filteredCurrencies = currencies;
  if (currentFilter !== 'all') {
    filteredCurrencies = currencies.filter(c => c.type === currentFilter);
  }
  
  if (filteredCurrencies.length === 0) {
    if (noMessage) noMessage.style.display = 'block';
    return;
  }
  
  if (noMessage) noMessage.style.display = 'none';
  
  filteredCurrencies.forEach(currency => {
    const row = createCurrencyRow(currency);
    tbody.appendChild(row);
  });
}

function createCurrencyRow(currency) {
  const row = document.createElement('tr');
  row.setAttribute('data-code', currency.code);
  
  row.innerHTML = `
    <td class="col-flag">
      <span class="currency-flag">${currency.flag || '🏳️'}</span>
    </td>
    <td class="col-name">
      <span class="currency-name-cell">${currency.name}</span>
    </td>
    <td class="col-code">
      <span class="currency-code-badge">${currency.code}</span>
    </td>
    <td class="col-symbol">
      <span class="currency-symbol-badge">${currency.symbol}</span>
    </td>
    <td class="col-rate">
      <input 
        type="number" 
        class="exchange-rate-input" 
        value="${currency.rate}" 
        step="0.0001"
        min="0.0001"
        data-code="${currency.code}"
      >
    </td>
    <td class="col-default">
      ${currency.isDefault ? 
        '<span class="default-badge"><i class="fa-solid fa-star"></i> افتراضي</span>' :
        `<button class="set-default-btn" onclick="setAsDefaultCurrency('${currency.code}')">تعيين</button>`
      }
    </td>
    <td class="col-actions">
      <div class="action-buttons-cell">
        <button class="action-btn-small edit" onclick="editCurrency('${currency.code}')" title="تعديل">
          <i class="fa-solid fa-pen"></i>
        </button>
        <button class="action-btn-small delete" onclick="deleteCurrency('${currency.code}')" title="حذف">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </td>
  `;
  
  // Exchange rate change handler
  const rateInput = row.querySelector('.exchange-rate-input');
  if (rateInput) {
    rateInput.addEventListener('change', async (e) => {
      await updateExchangeRate(currency.code, parseFloat(e.target.value));
    });
  }
  
  return row;
}

function filterCurrencyDataGrid(searchTerm) {
  const rows = document.querySelectorAll('#currencyDatagridBody tr');
  const term = searchTerm.toLowerCase();
  
  rows.forEach(row => {
    const name = row.querySelector('.currency-name-cell')?.textContent.toLowerCase() || '';
    const code = row.querySelector('.currency-code-badge')?.textContent.toLowerCase() || '';
    
    if (name.includes(term) || code.includes(term)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

async function updateExchangeRate(code, rate) {
  const currency = currencies.find(c => c.code === code);
  if (currency && Number.isFinite(rate) && rate > 0) {
    const snapshot = snapshotCurrencyState();
    currency.rate = rate;
    const saved = await saveCurrencies();
    if (!saved) {
      restoreCurrencyState(snapshot);
      renderCurrencyDataGrid();
      return;
    }
    showToast(`تم تحديث سعر الصرف ل${currency.name}`, 'ok');
  }
}

window.setAsDefaultCurrency = async function(code) {
  const newDefaultCurrency = currencies.find(c => c.code === code);
  
  if (!newDefaultCurrency) return;
  const snapshot = snapshotCurrencyState();
  
  // Save the old rate of the new default currency
  const oldRateOfNewBase = Number(newDefaultCurrency.rate) || 1;
  
  // Recalculate all rates based on new base currency
  currencies.forEach(c => {
    if (c.code === code) {
      // The new default currency should have rate = 1
      c.rate = 1;
      c.isDefault = true;
      c.is_base = true;
    } else {
      // Recalculate rate: newRate = oldRate / oldRateOfNewBase
      // Example: if SAR was 1 and USD was 0.27, and we make USD default:
      // new SAR rate = 1 / 0.27 = 3.7037
      c.rate = parseFloat((c.rate / oldRateOfNewBase).toFixed(4));
      c.isDefault = false;
      c.is_base = false;
    }
  });
  
  defaultCurrency = newDefaultCurrency;
  const saved = await saveCurrencies();
  if (!saved) {
    restoreCurrencyState(snapshot);
    renderCurrencyDataGrid();
    return;
  }
  renderCurrencyDataGrid();
  showToast(`تم تعيين ${newDefaultCurrency.name} كعملة افتراضية وإعادة حساب جميع الأسعار`, 'ok');
};

window.editCurrency = function(code) {
  editingCurrencyCode = code;
  const currency = currencies.find(c => c.code === code);
  if (currency) {
    openCurrencyFormModal(currency);
  }
};

window.deleteCurrency = async function(code) {
  const currency = currencies.find(c => c.code === code);
  if (!currency) return;
  
  if (currency.isDefault) {
    showToast('لا يمكن حذف العملة الافتراضية', 'err');
    return;
  }
  
  const confirmed = await showConfirmModal({
    type: 'danger',
    title: 'تأكيد الحذف',
    message: `هل أنت متأكد من حذف العملة: ${currency.name}؟`,
    confirmText: 'حذف',
    cancelText: 'إلغاء'
  });
  
  if (confirmed) {
    const snapshot = snapshotCurrencyState();
    currencies = currencies.filter(c => c.code !== code);
    const saved = await saveCurrencies();
    if (!saved) {
      restoreCurrencyState(snapshot);
      renderCurrencyDataGrid();
      return;
    }
    renderCurrencyDataGrid();
    showToast(`تم حذف ${currency.name} بنجاح`, 'ok');
  }
};

// ===== Refresh Exchange Rates =====
async function refreshExchangeRates() {
  const btn = document.getElementById('btnRefreshRates');
  if (!btn || btn.classList.contains('refreshing')) return;
  const snapshot = snapshotCurrencyState();
  
  try {
    btn.classList.add('refreshing');
    showToast(tSettings('updatingRates'), 'ok');
    
    // أسعار الصرف مقابل الدولار الأمريكي (USD = 1.0)
    // هذه الأسعار تمثل: كم وحدة من العملة = 1 دولار أمريكي
    const ratesVsUSD = {
      'USD': 1.0000,       // دولار أمريكي (الأساس)
      'SAR': 3.7500,       // ريال سعودي
      'EUR': 0.9200,       // يورو
      'GBP': 0.7900,       // جنيه إسترليني
      'AED': 3.6725,       // درهم إماراتي
      'KWD': 0.3065,       // دينار كويتي
      'BHD': 0.3760,       // دينار بحريني
      'OMR': 0.3845,       // ريال عماني
      'QAR': 3.6400,       // ريال قطري
      'JOD': 0.7090,       // دينار أردني
      'EGP': 49.25,        // جنيه مصري
      'LBP': 89500.00,     // ليرة لبنانية
      'IQD': 1310.00,      // دينار عراقي
      'SYP': 12600.00,     // ليرة سورية
      'MAD': 9.95,         // درهم مغربي
      'TND': 3.10,         // دينار تونسي
      'DZD': 134.00,       // دينار جزائري
      'LYD': 4.82,         // دينار ليبي
      'JPY': 149.50,       // ين ياباني
      'CNY': 7.23,         // يوان صيني
      'CHF': 0.88,         // فرنك سويسري
      'CAD': 1.39,         // دولار كندي
      'AUD': 1.53,         // دولار أسترالي
      'INR': 83.30,        // روبية هندية
      'TRY': 34.35,        // ليرة تركية
      'RUB': 95.50,        // روبل روسي
      'KRW': 1315.00,      // وون كوري
      'MXN': 16.90         // بيزو مكسيكي
    };
    
    // معرفة العملة الافتراضية الحالية (نفس المنطق المستخدم في loadCurrencies)
    // defaultCurrency هو المتغير العام الذي يحدد العملة الافتراضية الفعلية
    const defaultCode = defaultCurrency ? defaultCurrency.code : 'USD';
    
    // تحديث أسعار العملات بناءً على العملة الافتراضية
    let updatedCount = 0;
    
    // الأسعار تمثل: كم وحدة من العملة = 1 وحدة من العملة الافتراضية
    currencies.forEach(currency => {
      if (ratesVsUSD[currency.code] !== undefined) {
        if (defaultCode === 'USD') {
          // العملة الافتراضية هي الدولار - الأسعار مباشرة
          currency.rate = ratesVsUSD[currency.code];
        } else {
          // العملة الافتراضية ليست الدولار - نحول الأسعار
          const defaultRateVsUSD = ratesVsUSD[defaultCode] || 1;
          if (currency.code === defaultCode) {
            currency.rate = 1.0;
          } else {
            // السعر = كم وحدة من العملة تساوي 1 وحدة من العملة الافتراضية
            currency.rate = parseFloat((ratesVsUSD[currency.code] / defaultRateVsUSD).toFixed(4));
          }
        }
        updatedCount++;
      }
    });
    
    // حفظ التحديثات
    const saved = await saveCurrencies();
    if (!saved) {
      restoreCurrencyState(snapshot);
      renderCurrencyDataGrid();
      return;
    }
    renderCurrencyDataGrid();
    
    // عرض رسالة النجاح
    showToast(`تم تحديث ${updatedCount} عملة بنجاح ✓`, 'ok');
    
  } catch (error) {
    restoreCurrencyState(snapshot);
    showToast('حدث خطأ أثناء تحديث أسعار الصرف', 'err');
  } finally {
    setTimeout(() => {
      btn.classList.remove('refreshing');
    }, 1000);
  }
}

// ===== Currency Form Modal =====
function openCurrencyFormModal(currency = null) {
  const modal = document.getElementById('currencyFormModal');
  if (!modal) {
    setTimeout(() => openCurrencyFormModal(currency), 500);
    return;
  }
  
  if (!currencyFormModalInitialized) {
    setupCurrencyFormModal();
    currencyFormModalInitialized = true;
  }
  
  const title = document.getElementById('currencyFormTitle');
  if (title) {
    title.textContent = currency ? 'تعديل العملة' : 'إضافة عملة جديدة';
  }
  
  // Fill form - with safety checks
  const nameInput = document.getElementById('currencyNameInput');
  const codeInput = document.getElementById('currencyCodeInput');
  const symbolInput = document.getElementById('currencySymbolInput');
  const rateInput = document.getElementById('exchangeRateInput');
  const typeSelect = document.getElementById('currencyTypeSelect');
  const flagInput = document.getElementById('currencyFlagInput');
  const iconSelect = document.getElementById('currencyIconSelect');
  const defaultCheckbox = document.getElementById('setAsDefaultCheckbox');
  
  if (nameInput) nameInput.value = currency?.name || '';
  if (codeInput) {
    codeInput.value = currency?.code || '';
    codeInput.disabled = !!currency;
  }
  if (symbolInput) symbolInput.value = currency?.symbol || '';
  if (rateInput) rateInput.value = currency?.rate || 1.0;
  if (typeSelect) typeSelect.value = currency?.type || '';
  if (flagInput) flagInput.value = currency?.flag || '';
  if (iconSelect) iconSelect.value = currency?.icon || 'fa-dollar-sign';
  if (defaultCheckbox) defaultCheckbox.checked = currency?.isDefault || false;
  
  modal.classList.add('active');
  modal.style.opacity = '1';
  modal.style.zIndex = '10000';
  modal.style.pointerEvents = 'auto';
  
  // Apply translations
  applySettingsTranslations();
}

function closeCurrencyFormModal() {
  const modal = document.getElementById('currencyFormModal');
  if (modal) {
    modal.classList.remove('active');
    editingCurrencyCode = null;
    
    // Reset form safely
    const form = document.getElementById('currencyForm');
    if (form) form.reset();
    
    const codeInput = document.getElementById('currencyCodeInput');
    if (codeInput) codeInput.disabled = false;
  }
}

function setupCurrencyFormModal() {
  const btnClose = document.getElementById('btnCloseCurrencyForm');
  const btnCancel = document.getElementById('btnCancelCurrencyForm');
  const btnSave = document.getElementById('btnSaveCurrency');
  const modal = document.getElementById('currencyFormModal');
  
  if (!modal) {
    return;
  }
  
  if (btnClose) {
    btnClose.addEventListener('click', closeCurrencyFormModal);
  }
  
  if (btnCancel) {
    btnCancel.addEventListener('click', closeCurrencyFormModal);
  }
  
  if (btnSave) {
    btnSave.addEventListener('click', async (e) => {
      e.preventDefault();
      await saveCurrencyFromForm();
    });
  } else {
    console.error('Save button not found');
  }
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeCurrencyFormModal();
    }
  });
}

async function saveCurrencyFromForm() {
  // Get values
  const nameInput = document.getElementById('currencyNameInput');
  const codeInput = document.getElementById('currencyCodeInput');
  const symbolInput = document.getElementById('currencySymbolInput');
  const rateInput = document.getElementById('exchangeRateInput');
  const typeSelect = document.getElementById('currencyTypeSelect');
  const flagInput = document.getElementById('currencyFlagInput');
  const iconSelect = document.getElementById('currencyIconSelect');
  const defaultCheckbox = document.getElementById('setAsDefaultCheckbox');
  
  // Check if elements exist
  if (!nameInput || !codeInput || !symbolInput || !rateInput || !typeSelect) {
    showToast('خطأ: عناصر النموذج غير موجودة', 'err');
    return;
  }
  
  const name = nameInput.value.trim();
  const code = codeInput.value.trim().toUpperCase();
  const symbol = symbolInput.value.trim();
  const rate = parseFloat(rateInput.value);
  const type = typeSelect.value;
  const flag = flagInput ? flagInput.value.trim() : '';
  const icon = iconSelect ? iconSelect.value : 'fa-dollar-sign';
  const setAsDefault = defaultCheckbox ? defaultCheckbox.checked : false;
  
  // Validation
  if (!name || !code || !symbol || !rate || !type) {
    showToast('يرجى ملء جميع الحقول المطلوبة', 'err');
    return;
  }
  
  if (code.length !== 3) {
    showToast('رمز العملة يجب أن يكون 3 أحرف', 'err');
    return;
  }
  
  if (isNaN(rate) || rate <= 0) {
    showToast('سعر الصرف يجب أن يكون رقم أكبر من صفر', 'err');
    return;
  }
  
  // Check if code already exists (when adding)
  if (!editingCurrencyCode && currencies.find(c => c.code === code)) {
    showToast('رمز العملة موجود مسبقاً', 'err');
    return;
  }

  const snapshot = snapshotCurrencyState();
  
  const currencyData = {
    name,
    code,
    symbol,
    rate,
    type,
    flag: flag || '🏳️',
    icon,
    isDefault: false,
    is_base: false
  };
  let successMessage = '';
  
  if (editingCurrencyCode) {
    // Update existing
    const index = currencies.findIndex(c => c.code === editingCurrencyCode);
    if (index !== -1) {
      // Preserve isDefault if not changing it
      currencyData.isDefault = currencies[index].isDefault;
      currencyData.is_base = currencies[index].is_base;
      currencies[index] = { ...currencies[index], ...currencyData };
      successMessage = `تم تحديث ${name} بنجاح`;
    }
  } else {
    // Add new
    currencies.push({
      ...currencyData,
      id: currencies.length + 1,
    });
    successMessage = `تم إضافة ${name} بنجاح`;
  }
  
  // Set as default if checked
  if (setAsDefault) {
    currencies.forEach(c => {
      c.isDefault = (c.code === code);
      c.is_base = (c.code === code);
    });
    const updatedCurrency = currencies.find(c => c.code === code);
    if (updatedCurrency) {
      updatedCurrency.isDefault = true;
      updatedCurrency.is_base = true;
      defaultCurrency = updatedCurrency;
    }
  }
  
  const saved = await saveCurrencies();
  if (!saved) {
    restoreCurrencyState(snapshot);
    renderCurrencyDataGrid();
    return;
  }
  renderCurrencyDataGrid();
  closeCurrencyFormModal();
  if (successMessage) {
    showToast(successMessage, 'ok');
  }
}

// نسخ معرف الجهاز
function copyDeviceId() {
  const deviceId = document.getElementById('deviceId')?.textContent;
  if (deviceId && deviceId !== '--') {
    navigator.clipboard.writeText(deviceId).then(() => {
      showToast(tSettings('deviceIdCopied'), 'ok');
    });
  }
}

// ===== Subscription Info =====
async function loadSubscriptionInfoLocal(getAPIFn) {
  try {
    // Get API
    const api = getAPIFn ? getAPIFn() : null;
    if (!api || !api.invoke) {
      // API not available for subscription info
      const el = document.getElementById('licenseStatusText');
      if (el) el.textContent = tSettings('notAvailable');
      return;
    }
    
    // Get license status using api.invoke
    const status = await api.invoke('license-check-status');
    const machineId = await api.invoke('license-get-machine-id');
    
    // Update device ID
    const deviceIdEl = document.getElementById('deviceId');
    if (deviceIdEl) deviceIdEl.textContent = machineId;
    
    // Elements
    const badgeIcon = document.querySelector('.badge-icon');
    const statusBadge = document.getElementById('statusBadge');
    const statusText = document.getElementById('licenseStatusText');
    const typeText = document.getElementById('licenseTypeText');
    const daysText = document.getElementById('daysRemainingText');
    const dayLabel = document.querySelector('.days-number small[data-i18n="day"]');
    const progressBar = document.getElementById('daysProgressBar');
    const circleProgress = document.getElementById('circleProgress');
    const progressPercent = document.getElementById('progressPercentText');
    const totalDays = document.getElementById('totalDaysText');
    const activationDate = document.getElementById('activationDate');
    const expiryDate = document.getElementById('expiryDate');
    const licenseType = document.getElementById('licenseType');
    const warningBox = document.getElementById('licenseWarning');
    const warningText = document.getElementById('warningText');
    
    if (status.licensed) {
      // Active license
      if (badgeIcon) {
        badgeIcon.innerHTML = '<i class="fa-solid fa-shield-check"></i><div class="pulse-ring"></div>';
        // اللون والخلفية من CSS (.badge-icon) المعتمدة على متغيرات الثيم
        badgeIcon.style.background = '';
      }
      if (statusBadge) {
        statusBadge.classList.remove('inactive');
        statusBadge.classList.add('active');
        // السماح لـ CSS (.status-badge) بالتحكم في الألوان بناءً على الثيم
        statusBadge.style.background = '';
        statusBadge.style.borderColor = '';
      }
      statusText.textContent = tSettings('licenseActive');
      typeText.textContent = translateLicenseType(status.licenseType) || tSettings('activeSubscription');
      
      // Days remaining
      const days = status.daysRemaining || 0;
      daysText.textContent = days;
      if (dayLabel) dayLabel.textContent = tSettings('day');
      
      // Calculate progress
      const licenseDays = {
        'شهري': 30, 'ربع سنوي': 90, 'نصف سنوي': 180, 'سنوي': 365, 'دائم': 36500
      };
      const total = licenseDays[status.licenseType] || 365;
      const percent = Math.round((days / total) * 100);
      
      // Update progress bar
      progressBar.style.width = percent + '%';
      progressPercent.textContent = percent + '%';
      totalDays.textContent = tSettings('ofDays').replace('{total}', total);
      
      // Update circle progress (color from CSS theme)
      if (circleProgress) {
        const circumference = 283; // 2 * PI * 45
        const offset = circumference - (percent / 100) * circumference;
        circleProgress.style.strokeDashoffset = offset;
        // اللون يأتي من CSS: .circle-progress { stroke: var(--primary); }
      }
      
      // Progress bar color
      if (percent > 30) {
        progressBar.className = 'progress-fill';
      } else if (percent > 10) {
        progressBar.className = 'progress-fill warning';
      } else {
        progressBar.className = 'progress-fill danger';
      }
      
      // Dates
      activationDate.textContent = status.startDate || '--';
      expiryDate.textContent = status.endDate || '--';
      licenseType.textContent = translateLicenseType(status.licenseType) || '--';
      
      // Warning
      if (status.warning) {
        warningBox.style.display = 'flex';
        warningText.textContent = status.warning;
      } else {
        warningBox.style.display = 'none';
      }
      
    } else {
      // No license or expired
      if (badgeIcon) {
        badgeIcon.innerHTML = '<i class="fa-solid fa-shield-xmark"></i>';
        // استخدام ألوان CSS بدلاً من تعيين ألوان ثابتة هنا
        badgeIcon.style.background = '';
      }
      if (statusBadge) {
        statusBadge.classList.remove('active');
        statusBadge.classList.add('inactive');
        statusBadge.style.background = '';
        statusBadge.style.borderColor = '';
      }
      statusText.textContent = tSettings('licenseInactive');
      typeText.textContent = status.error || tSettings('pleaseActivate');
      
      daysText.textContent = '0';
      if (dayLabel) dayLabel.textContent = tSettings('day');
      progressBar.style.width = '0%';
      progressBar.className = 'progress-fill danger';
      progressPercent.textContent = '0%';
      
      // Update circle progress
      if (circleProgress) {
        circleProgress.style.strokeDashoffset = 283;
        // اللون يبقى من CSS (ثيم التطبيق)
      }
      
      activationDate.textContent = '--';
      expiryDate.textContent = '--';
      licenseType.textContent = '--';
      
      warningBox.style.display = 'flex';
      warningText.textContent = tSettings('licenseExpiredOrInvalid');
    }
    
    // Re-apply translations to ensure dynamic content is translated
    applySettingsTranslations();
    
  } catch (error) {
    // Error loading subscription info
  }
}

// ===== Theme Management =====
let currentThemeMode = 'dark';
let currentThemeColor = 'turquoise';

function initThemeCard() {
  // Load saved theme settings
  loadThemeSettings();
  
  // Mode buttons
  const modeBtns = document.querySelectorAll('.mode-btn');
  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentThemeMode = btn.dataset.mode;
      applyThemeMode(currentThemeMode);
      updatePreview();
    });
  });
  
  // Color options
  const colorOptions = document.querySelectorAll('.theme-color-option');
  colorOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      colorOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      currentThemeColor = opt.dataset.theme;
      updatePreview();
    });
  });
  
  // Save button
  const saveBtn = document.getElementById('btnSaveTheme');
  if (saveBtn) {
    saveBtn.addEventListener('click', saveThemeSettings);
  }
}

function loadThemeSettings() {
  try {
    const saved = localStorage.getItem('appTheme');
    if (saved) {
      const theme = JSON.parse(saved);
      currentThemeMode = theme.mode || 'dark';
      currentThemeColor = theme.color || 'gold';
      
      // Update UI
      document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === currentThemeMode);
      });
      document.querySelectorAll('.theme-color-option').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.theme === currentThemeColor);
      });
      
      applyThemeMode(currentThemeMode);
      updatePreview();
    }
  } catch (e) {
    // Error loading theme settings
  }
}

function applyThemeMode(mode) {
  const root = document.documentElement;
  
  if (mode === 'auto') {
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  } else {
    root.setAttribute('data-theme', mode);
  }
}

function updatePreview() {
  const previewBox = document.getElementById('themePreviewBox');
  if (!previewBox) return;
  
  // Get theme colors
  const colors = getThemeColors(currentThemeColor);
  
  // Update preview elements
  const primaryBtn = previewBox.querySelector('.preview-btn.primary');
  const previewCard = previewBox.querySelector('.preview-card');
  const statValue = previewBox.querySelector('.stat-value');
  
  if (primaryBtn) {
    primaryBtn.style.background = `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`;
  }
  if (previewCard) {
    previewCard.style.background = `linear-gradient(135deg, ${colors.primary}15, ${colors.primary}08)`;
    previewCard.style.borderColor = `${colors.primary}30`;
  }
  if (statValue) {
    statValue.style.color = colors.primary;
  }
}

function getThemeColors(theme) {
  const themes = {
    turquoise: { primary: '#00a99d', primaryDark: '#008f85', secondary: '#2dd4c8' },
    gold: { primary: '#d4af37', primaryDark: '#c9a227', secondary: '#f5d060' },
    blue: { primary: '#3b82f6', primaryDark: '#2563eb', secondary: '#60a5fa' },
    green: { primary: '#10b981', primaryDark: '#059669', secondary: '#34d399' },
    red: { primary: '#ef4444', primaryDark: '#dc2626', secondary: '#f87171' },
    orange: { primary: '#f97316', primaryDark: '#ea580c', secondary: '#fb923c' },
    sky: { primary: '#4a9fd4', primaryDark: '#3b8fc4', secondary: '#6bb5e0' },
    gray: { primary: '#64748b', primaryDark: '#475569', secondary: '#94a3b8' },
    navy: { primary: '#1e293b', primaryDark: '#0f172a', secondary: '#334155' },
    indigo: { primary: '#6366f1', primaryDark: '#4f46e5', secondary: '#818cf8' },
    teal: { primary: '#14b8a6', primaryDark: '#0d9488', secondary: '#2dd4bf' },
    rose: { primary: '#f43f5e', primaryDark: '#e11d48', secondary: '#fb7185' },
    amber: { primary: '#f59e0b', primaryDark: '#d97706', secondary: '#fbbf24' },
    cyan: { primary: '#06b6d4', primaryDark: '#0891b2', secondary: '#22d3ee' },
    emerald: { primary: '#059669', primaryDark: '#047857', secondary: '#10b981' },
    slate: { primary: '#475569', primaryDark: '#334155', secondary: '#64748b' },
    violet: { primary: '#7c3aed', primaryDark: '#6d28d9', secondary: '#8b5cf6' },
    royal: { primary: '#2563eb', primaryDark: '#1d4ed8', secondary: '#60a5fa' },
    sage: { primary: '#6b8f71', primaryDark: '#4f6f55', secondary: '#9dc7a3' },
    sunset: { primary: '#f97316', primaryDark: '#ea580c', secondary: '#fb7185' },
    orchid: { primary: '#a855f7', primaryDark: '#9333ea', secondary: '#d8b4fe' },
    charcoal: { primary: '#334155', primaryDark: '#0f172a', secondary: '#94a3b8' }
  };
  return themes[theme] || themes.turquoise;
}

async function saveThemeSettings() {
  try {
    const theme = {
      mode: currentThemeMode,
      color: currentThemeColor
    };
    
    // Save to localStorage
    localStorage.setItem('appTheme', JSON.stringify(theme));
    
    // Apply globally
    applyGlobalTheme(theme);
    
    showToast(tSettings('themeSaved'), 'success');
  } catch (e) {
    showToast(tSettings('themeSaveFailed'), 'error');
  }
}

function applyGlobalTheme(theme) {
  // Apply to current document
  applyThemeMode(theme.mode);
  document.documentElement.setAttribute('data-color-theme', theme.color || 'turquoise');
  
  // Broadcast to parent/top window for global application
  const themeEvent = new CustomEvent('themeChanged', { detail: theme });
  window.dispatchEvent(themeEvent);
  
  if (window.parent && window.parent !== window) {
    try {
      window.parent.postMessage({ type: 'themeChanged', theme }, '*');
      // Apply to parent document
      window.parent.document.documentElement.setAttribute('data-theme', theme.mode === 'auto' ? 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : theme.mode);
      window.parent.document.documentElement.setAttribute('data-color-theme', theme.color || 'turquoise');
    } catch (e) {}
  }
  
  if (window.top && window.top !== window) {
    try {
      window.top.postMessage({ type: 'themeChanged', theme }, '*');
      // Apply to top document
      window.top.document.documentElement.setAttribute('data-theme', theme.mode === 'auto' ? 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : theme.mode);
      window.top.document.documentElement.setAttribute('data-color-theme', theme.color || 'turquoise');
    } catch (e) {}
  }
}

// Initialize theme card when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initThemeCard, 100);
});

// ===== إعدادات الإشعارات =====
async function initNotificationsCard() {
  const masterToggle = document.getElementById('notifMasterToggle');
  const saveBtn = document.getElementById('btnSaveNotifications');
  const grid = document.getElementById('notificationsGrid');
  
  if (!masterToggle || !saveBtn || !grid) return;
  
  // تحميل الإعدادات المحفوظة
  await loadNotificationSettings();
  
  // مفتاح تشغيل/إيقاف الكل
  masterToggle.addEventListener('change', () => {
    const isEnabled = masterToggle.checked;
    const checkboxes = grid.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
      cb.checked = isEnabled;
      cb.disabled = !isEnabled;
    });
  });
  
  // عند تغيير أي مفتاح فردي، تحقق من حالة المفتاح الرئيسي
  grid.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox') {
      updateMasterToggleState();
    }
  });
  
  // حفظ الإعدادات
  saveBtn.addEventListener('click', saveNotificationSettings);
}

function getNotificationAPI() {
  if (window.parent && window.parent !== window && window.parent.api) {
    return window.parent.api;
  }
  if (window.api) {
    return window.api;
  }
  if (window.top && window.top !== window && window.top.api) {
    return window.top.api;
  }
  return null;
}

function getNotificationUserId() {
  try {
    const raw = localStorage.getItem('currentUser');
    const user = raw ? JSON.parse(raw) : null;
    const userId = Number(user?.id || 0);
    return Number.isFinite(userId) && userId > 0 ? userId : null;
  } catch (_) {
    return null;
  }
}

function notifyNotificationSettingsUpdated() {
  const message = { type: 'notification-settings-updated' };
  try {
    window.postMessage(message, '*');
  } catch (_) {}
  if (window.parent && window.parent !== window) {
    try {
      window.parent.postMessage(message, '*');
    } catch (_) {}
  }
  if (window.top && window.top !== window) {
    try {
      window.top.postMessage(message, '*');
    } catch (_) {}
  }
}

async function loadNotificationSettings() {
  try {
    const api = getNotificationAPI();
    if (!api || !api.getNotificationSettings) return;
    const userId = getNotificationUserId();
    
    const result = await api.getNotificationSettings(userId ? { userId } : undefined);
    if (!result.success) return;
    
    const settings = result.settings;
    const masterToggle = document.getElementById('notifMasterToggle');
    const grid = document.getElementById('notificationsGrid');
    
    // تعيين المفتاح الرئيسي
    if (masterToggle) {
      masterToggle.checked = settings.enabled !== false;
    }
    
    // تعيين المفاتيح الفردية
    if (grid) {
      const checkboxes = grid.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(cb => {
        const key = cb.dataset.key;
        if (key && settings[key] !== undefined) {
          cb.checked = settings[key] !== false;
        }
        cb.disabled = !masterToggle.checked;
      });
    }
  } catch (e) {
    console.error('Error loading notification settings:', e);
  }
}

async function saveNotificationSettings() {
  try {
    const api = getNotificationAPI();
    if (!api || !api.saveNotificationSettings) {
      showToast('API غير متاح', 'err');
      return;
    }
    
    const masterToggle = document.getElementById('notifMasterToggle');
    const grid = document.getElementById('notificationsGrid');
    
    const settings = {
      enabled: masterToggle ? masterToggle.checked : true
    };
    
    // جمع إعدادات كل نوع
    if (grid) {
      const checkboxes = grid.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(cb => {
        const key = cb.dataset.key;
        if (key) {
          settings[key] = cb.checked;
        }
      });
    }
    
    const userId = getNotificationUserId();
    const payload = userId ? { userId, settings } : { settings };
    const result = await api.saveNotificationSettings(payload);
    if (result.success) {
      notifyNotificationSettingsUpdated();
      showToast('تم حفظ إعدادات الإشعارات', 'ok');
    } else {
      showToast(result.error || 'فشل في حفظ الإعدادات', 'err');
    }
  } catch (e) {
    console.error('Error saving notification settings:', e);
    showToast('خطأ في حفظ الإعدادات', 'err');
  }
}

function updateMasterToggleState() {
  const masterToggle = document.getElementById('notifMasterToggle');
  const grid = document.getElementById('notificationsGrid');
  if (!masterToggle || !grid) return;
  
  const checkboxes = grid.querySelectorAll('input[type="checkbox"]');
  const allChecked = Array.from(checkboxes).every(cb => cb.checked);
  const anyChecked = Array.from(checkboxes).some(cb => cb.checked);
  
  // إذا كانت كل المفاتيح مفعلة، فعّل الرئيسي
  // إذا كان أي مفتاح معطل، أبق الرئيسي مفعل لكن مع إمكانية التحكم
  masterToggle.checked = anyChecked;
}

// Initialize notifications card when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initNotificationsCard, 300);
});

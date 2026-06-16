// دالة إنشاء HTML للإخطار - مطابق تماماً لشاشة التقارير
function generateMarginCallHTML(data) {
  // دالة الترجمة البسيطة
  const lang = localStorage.getItem('uiLang') || 'ar';
  const isRTL = lang === 'ar';
  
  const translations = {
    ar: {
      title: 'إخطار لتدعيم الحساب',
      warningTitle: 'إخطار لتدعيم الحساب',
      warningMessage: 'عزيزي الزبون، نحيطكم علماً بأن مستوى الدعم لمراكزكم المفتوحة قد تراجع إلى أقل من الحد الأدنى والمعدل المتفق عليه.',
      customer: 'عميل',
      supplier: 'مورد',
      customerNumber: 'رقم',
      name: 'الاسم',
      taxNumber: 'الرقم الضريبي',
      phone: 'رقم الهاتف',
      region: 'المنطقة',
      metal: 'المعدن',
      balance: 'الرصيد (غرام)',
      customerPosition: 'مركز العميل',
      marketPrice: 'سعر السوق الآن',
      agreedRate: 'المعدل المتفق عليه:',
      amounts: 'المبالغ:',
      currentBalance: 'رصيدكم الحالي:',
      currentRate: 'معدلكم الحالي:',
      requiredAmount: 'المبلغ المطلوب فوراً:',
      protectionRequired: 'مطلوب منكم حماية الحساب فوراً',
      transferDetails: 'يرجى تعزيز ما يلي فوراً بالواتساب:',
      transferAmount: 'مبلغ التحويل:',
      dueDate: 'تاريخ الإستحقاق:',
      immediate: 'فوري',
      method: 'عن طريق أي بنك',
      footer: 'هذا الإخطار مطبوع تلقائياً عن طريق الحاسوب ولا يحتاج إلى توقيع',
      print: 'طباعة',
      address: 'العنوان:',
      email: 'البريد:',
      priceAdjustment: 'الإضافة/النقص فوق سعر الأونصة:',
      adjustedPrice: 'السعر بعد التعديل:',
      modalSuccess: 'تم بنجاح',
      modalError: 'خطأ',
      modalOk: 'حسناً',
      imageCopied: 'تم نسخ الإخطار إلى الحافظة',
      noNotice: 'لم يتم العثور على الإخطار',
      libraryMissing: 'مكتبة التقاط الصورة غير متوفرة',
      copyFailed: 'فشل في نسخ الصورة',
      copySuccess: 'تم نسخ صورة الإخطار إلى الحافظة. يمكنك لصقها بـ Ctrl+V',
      noPhone: 'لا يوجد رقم هاتف صالح لهذا العميل',
      whatsappSuccess: 'تم نسخ صورة الإخطار إلى الحافظة وفتح واتساب.',
      whatsappTitle: '⚠️ إخطار لتدعيم الحساب',
      whatsappDear: 'عزيزي الزبون:',
      whatsappMessage: 'نحيطكم علماً بأن مستوى الدعم لمراكزكم المفتوحة قد تراجع إلى أقل من الحد الأدنى والمعدل المتفق عليه.',
      whatsappDetails: '📊 تفاصيل الحساب:',
      whatsappBalanceLabel: '• الرصيد (غرام):',
      whatsappAgreedRateLabel: '• المعدل المتفق عليه:',
      whatsappCurrentRateLabel: '• معدلكم الحالي:',
      whatsappAmountsLabel: '• المبالغ:',
      whatsappCurrentBalanceLabel: '• رصيدكم الحالي:',
      whatsappRequiredLabel: '💰 المبلغ المطلوب فوراً:',
      whatsappPleaseSupport: '⚠️ يرجى تعزيز الحساب فوراً.',
      whatsappThanks: 'شكراً لتعاونكم 🙏',
      btnUsd: 'دولار',
      btnSar: 'ريال سعودي',
      btnWhatsapp: 'واتساب',
      btnPrint: 'طباعة'
    },
    en: {
      title: 'Account Support Notification',
      warningTitle: 'Account Support Notification',
      warningMessage: 'Dear customer, we inform you that the support level for your open positions has fallen below the minimum agreed rate.',
      customer: 'Customer',
      supplier: 'Supplier',
      customerNumber: 'Number',
      name: 'Name',
      taxNumber: 'Tax Number',
      phone: 'Phone Number',
      region: 'Region',
      metal: 'Metal',
      balance: 'Balance (gram)',
      customerPosition: 'Customer Position',
      marketPrice: 'Market Price Now',
      agreedRate: 'Agreed Rate:',
      amounts: 'Amounts:',
      currentBalance: 'Your Current Balance:',
      currentRate: 'Your Current Rate:',
      requiredAmount: 'Required Amount Immediately:',
      protectionRequired: 'Account Protection Required Immediately',
      transferDetails: 'Please provide the following immediately via WhatsApp:',
      transferAmount: 'Transfer Amount:',
      dueDate: 'Due Date:',
      immediate: 'Immediate',
      method: 'Via any bank',
      footer: 'This notification is automatically printed by computer and does not require a signature',
      print: 'Print',
      address: 'Address:',
      email: 'Email:',
      priceAdjustment: 'Addition/Deduction above ounce price:',
      adjustedPrice: 'Price after adjustment:',
      modalSuccess: 'Success',
      modalError: 'Error',
      modalOk: 'OK',
      imageCopied: 'Notification copied to clipboard',
      noNotice: 'Notification not found',
      libraryMissing: 'Image capture library not available',
      copyFailed: 'Failed to copy image',
      copySuccess: 'Notification image copied to clipboard. You can paste it with Ctrl+V',
      noPhone: 'No valid phone number for this customer',
      whatsappSuccess: 'Notification image copied to clipboard and WhatsApp opened.',
      whatsappTitle: '⚠️ Account Support Notification',
      whatsappDear: 'Dear customer:',
      whatsappMessage: 'We inform you that the support level for your open positions has fallen below the minimum agreed rate.',
      whatsappDetails: '📊 Account Details:',
      whatsappBalanceLabel: '• Balance (gram):',
      whatsappAgreedRateLabel: '• Agreed Rate:',
      whatsappCurrentRateLabel: '• Your Current Rate:',
      whatsappAmountsLabel: '• Amounts:',
      whatsappCurrentBalanceLabel: '• Your Current Balance:',
      whatsappRequiredLabel: '💰 Required Amount Immediately:',
      whatsappPleaseSupport: '⚠️ Please support the account immediately.',
      whatsappThanks: 'Thank you for your cooperation 🙏',
      btnUsd: 'USD',
      btnSar: 'SAR',
      btnWhatsapp: 'WhatsApp',
      btnPrint: 'Print'
    }
  };
  
  const t = (key) => translations[lang][key] || translations.ar[key] || key;
  
  const date = new Date().toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US');
  const time = new Date().toLocaleTimeString(lang === 'ar' ? 'ar-SA' : 'en-US', { hour: '2-digit', minute: '2-digit' });
  const agreedRate = data.agreedRate || 0;
  const priceAdjustment = data.priceAdjustment || 0;
  const comparePrice = data.comparePrice || 120.56;
  
  // القيم من البيانات الممررة
  const goldBalance = Math.abs(data.goldBalance || 0);
  const coveragePrice = data.coveragePrice || 0;
  const parityPrice = data.parityPrice || 0;
  const customerPosition = data.customerPosition || 0;
  const currentXauPrice = data.currentXauPrice || 0;
  const adjustedXauPrice = data.adjustedXauPrice || currentXauPrice;
  const currentRate = data.currentRate || 0;
  const metalValueAtMarket = data.metalValueAtMarket || 0;
  const currentCashUsd = data.currentCashUsd || 0;
  const currentCashSar = data.currentCashSar || 0;
  const requiredCoverageUsd = data.requiredCoverageUsd || 0;
  const requiredCoverageSar = data.requiredCoverageSar || 0;
  
  // سعر الصرف من إعدادات حساب الأونصة
  const exchangeRate = data.exchangeRate || 3.75;
  
  // تنسيق الأرقام
  const formatNum = (num, decimals = 2) => new Intl.NumberFormat('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(num);
  
  // نص الإضافة/النقص
  const adjustmentText = priceAdjustment > 0 ? `+${priceAdjustment}` : (priceAdjustment < 0 ? `${priceAdjustment}` : '0');
  
  return `<!DOCTYPE html>
<html lang="${lang}" dir="${isRTL ? 'rtl' : 'ltr'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t('title')}</title>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet">
  <script src="../../node_modules/html2canvas/dist/html2canvas.min.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Cairo', Arial, sans-serif;
      background: #f5f5f5;
      padding: 20px;
      direction: ${isRTL ? 'rtl' : 'ltr'};
    }
    .container {
      max-width: 1000px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }
    
    /* Header الشركة */
    .company-header {
      padding: 15px 20px;
      background: linear-gradient(135deg, #f3f4f6 0%, white 100%);
      border-bottom: 2px solid #e5e7eb;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 15px;
      direction: ltr;
    }
    .header-section {
      flex: 1;
    }
    .header-section.ar {
      text-align: right;
      direction: rtl;
    }
    .header-section.en {
      text-align: left;
      direction: ltr;
    }
    .company-name {
      font-size: 16px;
      font-weight: 700;
      color: #3b82f6;
      margin-bottom: 8px;
    }
    .company-info {
      display: flex;
      align-items: center;
      gap: 6px;
      margin: 4px 0;
      font-size: 12px;
      color: #374151;
    }
    .company-info i {
      color: #3b82f6;
      font-size: 11px;
      width: 14px;
    }
    .logo-container {
      width: 120px;
      height: 120px;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 16px rgba(0,0,0,0.2);
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .logo-fallback {
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #fbbf24, #f59e0b);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 44px;
      color: white;
    }
    
    /* بيانات العميل */
    .entity-info {
      padding: 20px 28px;
      background: #f9fafb;
      border-bottom: 2px solid #e5e7eb;
    }
    .entity-grid {
      display: grid;
      grid-template-columns: auto repeat(4, 1fr);
      gap: 20px;
      align-items: center;
    }
    .entity-icon-box {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .entity-icon {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, #3b82f6, #2563eb);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(59,130,246,0.3);
    }
    .entity-icon i {
      color: white;
      font-size: 20px;
    }
    .entity-field-label {
      font-size: 11px;
      color: #6b7280;
      margin-bottom: 3px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .entity-field-label i {
      color: #3b82f6;
      font-size: 10px;
    }
    .entity-value {
      font-size: 15px;
      font-weight: 600;
      color: #1f2937;
    }
    .entity-id {
      font-size: 18px;
      font-weight: 700;
      color: #1f2937;
    }
    
    /* صندوق الإخطار */
    .notice-box {
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      border: 2px solid #f59e0b;
      border-radius: 12px;
      padding: 20px;
      margin: 20px;
      box-shadow: 0 4px 15px rgba(245,158,11,0.2);
    }
    .notice-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 2px solid rgba(245,158,11,0.3);
    }
    .notice-title {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .notice-title i {
      color: #b45309;
      font-size: 24px;
    }
    .notice-title span {
      font-size: 16px;
      font-weight: 700;
      color: #92400e;
    }
    .notice-body {
      font-size: 13px;
      color: #78350f;
      margin-bottom: 16px;
      line-height: 1.6;
    }
    
    /* الجدول */
    .data-table {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 16px;
      border: 1px solid #e5e7eb;
    }
    .data-table table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
    }
    .data-table thead tr {
      background: #f3f4f6;
    }
    .data-table th {
      padding: 10px;
      text-align: center;
      border-bottom: 1px solid #e5e7eb;
      color: #374151;
      font-weight: 600;
    }
    .data-table td {
      padding: 10px;
      text-align: center;
      font-weight: 600;
    }
    
    /* شبكة البطاقات */
    .cards-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 16px;
    }
    .info-card {
      background: white;
      border-radius: 8px;
      padding: 12px;
      border: 1px solid #e5e7eb;
    }
    .info-card.pink {
      background: #fee2e2;
      border-color: #fecaca;
    }
    .info-card.green {
      background: #dcfce7;
      border-color: #bbf7d0;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    .info-row:last-child {
      margin-bottom: 0;
    }
    .info-label {
      font-size: 13px;
      color: #6b7280;
      font-weight: 500;
    }
    .info-value {
      font-size: 18px;
      font-weight: 800;
      color: #1f2937;
    }
    .info-value.red {
      color: #dc2626;
    }
    .info-value.green {
      color: #16a34a;
    }
    
    /* صندوق التحذير */
    .warning-box {
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 8px;
      padding: 14px;
      margin-bottom: 12px;
    }
    .warning-content {
      display: flex;
      align-items: flex-start;
      gap: 10px;
    }
    .warning-content i {
      color: #dc2626;
      font-size: 18px;
      margin-top: 2px;
      flex-shrink: 0;
    }
    .warning-text {
      font-size: 12px;
      color: #991b1b;
      line-height: 1.7;
    }
    .warning-text strong {
      display: block;
      margin-bottom: 4px;
    }
    
    /* Footer */
    .footer {
      text-align: center;
      font-size: 11px;
      color: #78350f;
      font-style: italic;
      margin-top: 12px;
    }
    
    /* زر الطباعة */
    .print-button {
      position: fixed;
      bottom: 30px;
      left: 30px;
      background: linear-gradient(135deg, #3b82f6, #2563eb);
      color: white;
      border: none;
      padding: 15px 30px;
      border-radius: 50px;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4);
      transition: all 0.3s;
      z-index: 1000;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: 'Cairo', Arial, sans-serif;
    }
    .print-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 30px rgba(59, 130, 246, 0.5);
      background: linear-gradient(135deg, #2563eb, #1e40af);
    }
    
    @media print {
      .print-button { display: none !important; }
      .no-print { display: none !important; }
      body { padding: 0; background: white; }
      .container { box-shadow: none; }
    }
    
    /* Modal Styles */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }
    .modal-overlay.show {
      opacity: 1;
      visibility: visible;
    }
    .modal-box {
      background: white;
      border-radius: 16px;
      padding: 24px;
      max-width: 400px;
      width: 90%;
      text-align: center;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      transform: scale(0.8);
      transition: transform 0.3s ease;
    }
    .modal-overlay.show .modal-box {
      transform: scale(1);
    }
    .modal-icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
      font-size: 28px;
    }
    .modal-icon.success { background: #dcfce7; color: #16a34a; }
    .modal-icon.error { background: #fee2e2; color: #dc2626; }
    .modal-icon.warning { background: #fef3c7; color: #d97706; }
    .modal-icon.info { background: #dbeafe; color: #2563eb; }
    .modal-title {
      font-size: 18px;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 8px;
    }
    .modal-message {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 20px;
      line-height: 1.6;
    }
    .modal-btn {
      padding: 12px 32px;
      border: none;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
    }
    .modal-btn.primary {
      background: linear-gradient(135deg, #3b82f6, #2563eb);
      color: white;
    }
    .modal-btn.primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(59,130,246,0.4);
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header معلومات الشركة -->
    <div class="company-header">
      <!-- English Info -->
      <div class="header-section en">
        <div class="company-name">${data.company?.name_en || 'Company Name'}</div>
        <div class="company-info">
          <i class="fa-solid fa-location-dot"></i>
          <span>Address: ${data.company?.address_en || '---'}</span>
        </div>
        <div class="company-info">
          <i class="fa-solid fa-phone"></i>
          <span>Phone: ${data.company?.phone || '---'}</span>
        </div>
        <div class="company-info">
          <i class="fa-solid fa-envelope"></i>
          <span>Email: ${data.company?.email || '---'}</span>
        </div>
        <div class="company-info">
          <i class="fa-solid fa-file-invoice"></i>
          <span>Tax No: ${data.company?.tax || '---'}</span>
        </div>
        <div class="company-info">
          <i class="fa-solid fa-clock"></i>
          <span>${date} ${time}</span>
        </div>
      </div>
      
      <!-- Logo -->
      <div class="logo-container">
        ${data.company?.logoData ? `<img src="${data.company.logoData}" alt="Logo" style="max-width:100%;max-height:100%;object-fit:contain;border-radius:12px;">` : `<div class="logo-fallback"><i class="fa-solid fa-building"></i></div>`}
      </div>
      
      <!-- Arabic Info -->
      <div class="header-section ar">
        <div class="company-name">${data.company?.name || 'اسم الشركة'}</div>
        <div class="company-info">
          <i class="fa-solid fa-location-dot"></i>
          <span>العنوان: ${data.company?.address || '---'}</span>
        </div>
        <div class="company-info">
          <i class="fa-solid fa-phone"></i>
          <span>رقم الهاتف: ${data.company?.phone || '---'}</span>
        </div>
        <div class="company-info">
          <i class="fa-solid fa-envelope"></i>
          <span>البريد: ${data.company?.email || '---'}</span>
        </div>
        <div class="company-info">
          <i class="fa-solid fa-file-invoice"></i>
          <span>الرقم الضريبي: ${data.company?.tax || '---'}</span>
        </div>
        <div class="company-info">
          <i class="fa-solid fa-clock"></i>
          <span>${date} ${time}</span>
        </div>
      </div>
    </div>
    
    <!-- بيانات العميل/المورد -->
    <div class="entity-info">
      <div class="entity-grid">
        <div class="entity-icon-box">
          <div class="entity-icon">
            <i class="fa-solid fa-user"></i>
          </div>
          <div>
            <div class="entity-field-label">${t('customerNumber')} ${data.entityType}</div>
            <div class="entity-id">${data.entityId}</div>
          </div>
        </div>
        
        <div>
          <div class="entity-field-label">
            <i class="fa-solid fa-id-card"></i>
            <span>${t('name')}</span>
          </div>
          <div class="entity-value">${data.entityName}</div>
        </div>
        
        <div>
          <div class="entity-field-label">
            <i class="fa-solid fa-receipt"></i>
            <span>${t('taxNumber')}</span>
          </div>
          <div class="entity-value">${data.entityTax || '---'}</div>
        </div>
        
        <div>
          <div class="entity-field-label">
            <i class="fa-solid fa-phone"></i>
            <span>${t('phone')}</span>
          </div>
          <div class="entity-value">${data.entityPhone || '---'}</div>
        </div>
        
        <div>
          <div class="entity-field-label">
            <i class="fa-solid fa-map-marker-alt"></i>
            <span>${t('region')}</span>
          </div>
          <div class="entity-value">${data.entityRegion || '---'}</div>
        </div>
      </div>
    </div>
    
    <!-- صندوق الإخطار -->
    <div class="notice-box">
      <div class="notice-header">
        <div class="notice-title">
          <i class="fa-solid fa-triangle-exclamation"></i>
          <span>${t('warningTitle')}</span>
        </div>
      </div>
      
      <p class="notice-body">
        ${t('warningMessage')}
      </p>
      
      <!-- جدول البيانات -->
      <div class="data-table">
        <table>
          <thead>
            <tr>
              <th>${t('metal')}</th>
              <th>${t('balance')}</th>
              <th>${t('customerPosition')}</th>
              <th>${t('marketPrice')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="font-weight:700; color:#1f2937">XAU (ذهب)</td>
              <td style="font-weight:600; color:#dc2626">(${formatNum(goldBalance)})</td>
              <td style="font-weight:600; color:#059669">${formatNum(customerPosition, 4)}</td>
              <td style="font-weight:600; color:#2563eb">$${formatNum(adjustedXauPrice)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- تفاصيل المعدلات -->
      <div class="cards-grid">
        <div class="info-card">
          <div class="info-row">
            <span class="info-label">${t('agreedRate')}</span>
            <span class="info-value green">${formatNum(agreedRate)}%</span>
          </div>
          <div class="info-row">
            <span class="info-label">${t('amounts')}</span>
            <span class="info-value currency-value" data-usd="${metalValueAtMarket}" data-sar="${metalValueAtMarket * exchangeRate}">$${formatNum(metalValueAtMarket)}</span>
          </div>
          <div class="info-row">
            <span class="info-label">${t('currentBalance')}</span>
            <span class="info-value currency-value" data-usd="${currentCashUsd}" data-sar="${currentCashSar}">$${formatNum(currentCashUsd)}</span>
          </div>
        </div>
        <div class="info-card">
          <div class="info-row">
            <span class="info-label">${t('currentRate')}</span>
            <span class="info-value red">${formatNum(currentRate)}%</span>
          </div>
          <div class="info-row">
            <span class="info-label">${t('requiredAmount')}</span>
            <span class="info-value red currency-value" data-usd="${requiredCoverageUsd}" data-sar="${requiredCoverageSar}">$${formatNum(requiredCoverageUsd)}</span>
          </div>
        </div>
      </div>
      
      <!-- معلومات الإضافة/النقص -->
      <div style="background:white; border-radius:8px; padding:12px; border:1px solid #e5e7eb; margin-bottom:16px">
        <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:12px">
          <div>
            <span style="font-size:11px; color:#6b7280">${t('priceAdjustment')}</span>
            <span style="font-size:13px; font-weight:700; color:${priceAdjustment >= 0 ? '#059669' : '#dc2626'}; margin-right:8px">${adjustmentText}</span>
          </div>
          <div>
            <span style="font-size:11px; color:#6b7280">${t('adjustedPrice')}</span>
            <span style="font-size:13px; font-weight:700; color:#2563eb; margin-right:8px">$${formatNum(adjustedXauPrice)}</span>
          </div>
        </div>
      </div>
      
      <!-- صندوق التحذير -->
      <div class="warning-box">
        <div class="warning-content">
          <i class="fa-solid fa-exclamation-circle"></i>
          <div class="warning-text">
            <strong>${t('protectionRequired')}</strong> - ${t('transferDetails')}
            • ${t('transferAmount')} <strong class="currency-value" data-usd="${requiredCoverageUsd}" data-sar="${requiredCoverageSar}">$${formatNum(requiredCoverageUsd)}</strong>
            • ${t('dueDate')} <strong>${t('immediate')}</strong>
            • ${t('method')}
          </div>
        </div>
      </div>
      
      <div class="footer">
        ${t('footer')}
      </div>
    </div>
  </div>
  
  <!-- Modal -->
  <div id="modalOverlay" class="modal-overlay no-print" onclick="closeModal(event)">
    <div class="modal-box" onclick="event.stopPropagation()">
      <div id="modalIcon" class="modal-icon success">
        <i class="fa-solid fa-check"></i>
      </div>
      <div id="modalTitle" class="modal-title">${t('modalSuccess')}</div>
      <div id="modalMessage" class="modal-message">${t('imageCopied')}</div>
      <button class="modal-btn primary" onclick="closeModal()">${t('modalOk')}</button>
    </div>
  </div>
  
  <!-- أزرار التحكم (لا تظهر في الطباعة) -->
  <div class="no-print" style="display:flex; gap:12px; justify-content:center; margin-top:20px; flex-wrap:wrap">
    <button id="btnUSD" onclick="switchCurrency('USD')" style="padding:10px 24px; border:2px solid #3b82f6; background:#3b82f6; color:white; border-radius:8px; font-family:inherit; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:8px; font-size:14px">
      <i class="fa-solid fa-dollar-sign"></i> ${t('btnUsd')}
    </button>
    <button id="btnSAR" onclick="switchCurrency('SAR')" style="padding:10px 24px; border:2px solid #e5e7eb; background:white; color:#374151; border-radius:8px; font-family:inherit; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:8px; font-size:14px">
      <i class="fa-solid fa-money-bill"></i> ${t('btnSar')}
    </button>
    <button onclick="sendWhatsApp()" style="padding:10px 24px; border:2px solid #25d366; background:#25d366; color:white; border-radius:8px; font-family:inherit; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:8px; font-size:14px">
      <i class="fa-brands fa-whatsapp"></i> ${t('btnWhatsapp')}
    </button>
    <button class="print-button" onclick="window.print()" style="padding:10px 24px; border:2px solid #059669; background:#059669; color:white; border-radius:8px; font-family:inherit; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:8px; font-size:14px">
      <i class="fa-solid fa-print"></i> ${t('btnPrint')}
    </button>
  </div>
  
  <script>
    // دالة عرض الموديل
    function showModal(type, title, message) {
      const overlay = document.getElementById('modalOverlay');
      const iconEl = document.getElementById('modalIcon');
      const titleEl = document.getElementById('modalTitle');
      const messageEl = document.getElementById('modalMessage');
      
      const icons = {
        success: '<i class="fa-solid fa-check"></i>',
        error: '<i class="fa-solid fa-xmark"></i>',
        warning: '<i class="fa-solid fa-exclamation"></i>',
        info: '<i class="fa-solid fa-info"></i>'
      };
      
      iconEl.className = 'modal-icon ' + type;
      iconEl.innerHTML = icons[type] || icons.info;
      titleEl.textContent = title;
      messageEl.textContent = message;
      overlay.classList.add('show');
    }
    
    function closeModal(e) {
      if (e && e.target !== e.currentTarget) return;
      document.getElementById('modalOverlay').classList.remove('show');
    }
    
    // متغير لتتبع العملة الحالية
    let currentCurrency = 'USD';
    
    // دالة تحويل العملة
    function switchCurrency(currency) {
      currentCurrency = currency;
      const btnUSD = document.getElementById('btnUSD');
      const btnSAR = document.getElementById('btnSAR');
      const elements = document.querySelectorAll('.currency-value');
      
      const formatNum = (num) => new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num);
      
      if (currency === 'USD') {
        btnUSD.style.background = '#3b82f6';
        btnUSD.style.borderColor = '#3b82f6';
        btnUSD.style.color = 'white';
        btnSAR.style.background = 'white';
        btnSAR.style.borderColor = '#e5e7eb';
        btnSAR.style.color = '#374151';
        
        elements.forEach(el => {
          const val = parseFloat(el.dataset.usd) || 0;
          el.textContent = '$' + formatNum(val);
        });
      } else {
        btnSAR.style.background = '#059669';
        btnSAR.style.borderColor = '#059669';
        btnSAR.style.color = 'white';
        btnUSD.style.background = 'white';
        btnUSD.style.borderColor = '#e5e7eb';
        btnUSD.style.color = '#374151';
        
        elements.forEach(el => {
          const val = parseFloat(el.dataset.sar) || 0;
          el.textContent = formatNum(val) + ' ر.س';
        });
      }
    }
    
    // دالة نسخ الإخطار كصورة
    async function copyAsImage() {
      try {
        const noticeElement = document.querySelector('.container');
        if (!noticeElement) {
          showModal('error', t('modalError'), t('noNotice'));
          return;
        }
        
        if (typeof html2canvas === 'undefined') {
          showModal('error', t('modalError'), t('libraryMissing'));
          return;
        }
        
        // التقاط صورة الإخطار
        const canvas = await html2canvas(noticeElement, {
          backgroundColor: '#fef3c7',
          scale: 2,
          useCORS: true,
          logging: false
        });
        
        // تحويل الصورة إلى blob
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        
        // نسخ الصورة للحافظة
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          showModal('success', t('modalSuccess'), t('copySuccess'));
        } catch (clipErr) {
          // محاولة استخدام Electron API كبديل
          if (window.opener && window.opener.api && window.opener.api.copyImageToClipboard) {
            const base64Data = canvas.toDataURL('image/png');
            const result = await window.opener.api.copyImageToClipboard(base64Data);
            if (result.success) {
              showModal('success', t('modalSuccess'), t('copySuccess'));
            } else {
              showModal('error', t('modalError'), t('copyFailed'));
            }
          } else {
            showModal('error', t('modalError'), t('copyFailed'));
          }
        }
      } catch (err) {
        console.error('Copy image failed:', err);
        showModal('error', t('modalError'), t('copyFailed') + ': ' + err.message);
      }
    }
    
    // دالة إرسال واتساب
    async function sendWhatsApp() {
      const entityName = '${data.entityName || ''}';
      const entityPhone = '${data.entityPhone || ''}';
      const goldBalance = '${formatNum(goldBalance)}';
      const parityPrice = '$${formatNum(parityPrice)}';
      const marketPrice = '$${formatNum(adjustedXauPrice)}';
      const agreedRate = '${formatNum(agreedRate)}%';
      const currentRate = '${formatNum(currentRate)}%';
      
      // المبالغ حسب العملة المختارة
      const metalValueUsd = '$${formatNum(metalValueAtMarket)}';
      const metalValueSar = '${formatNum(metalValueAtMarket * exchangeRate)} ر.س';
      const currentBalanceUsd = '$${formatNum(currentCashUsd)}';
      const currentBalanceSar = '${formatNum(currentCashSar)} ر.س';
      const requiredAmountUsd = '$${formatNum(requiredCoverageUsd)}';
      const requiredAmountSar = '${formatNum(requiredCoverageSar)} ر.س';
      
      const metalValue = currentCurrency === 'SAR' ? metalValueSar : metalValueUsd;
      const currentBalance = currentCurrency === 'SAR' ? currentBalanceSar : currentBalanceUsd;
      const requiredAmount = currentCurrency === 'SAR' ? requiredAmountSar : requiredAmountUsd;
      
      // تنظيف رقم الهاتف
      let phoneNumber = entityPhone.trim().replace(/^\\+/, '').replace(/^00/, '').replace(/[^0-9]/g, '');
      if (phoneNumber.startsWith('05')) {
        phoneNumber = '966' + phoneNumber.substring(1);
      }
      
      // التحقق من وجود رقم هاتف صالح
      if (!phoneNumber || phoneNumber.length < 9) {
        showModal('error', t('modalError'), t('noPhone'));
        return;
      }
      
      try {
        // التقاط صورة الإخطار
        const noticeElement = document.querySelector('.container');
        if (noticeElement && typeof html2canvas !== 'undefined') {
          const canvas = await html2canvas(noticeElement, {
            backgroundColor: '#fef3c7',
            scale: 2,
            useCORS: true,
            logging: false
          });
          
          // تحويل الصورة إلى blob ونسخها للحافظة
          const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
          try {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob })
            ]);
          } catch (clipErr) {
            // محاولة Electron API كبديل
            if (window.opener && window.opener.api && window.opener.api.copyImageToClipboard) {
              const base64Data = canvas.toDataURL('image/png');
              await window.opener.api.copyImageToClipboard(base64Data);
            }
          }
        }
      } catch (imgErr) {
        console.log('Image capture failed:', imgErr);
      }
      
      // رسالة واتساب
      const message = \`\${t('whatsappTitle')}

\${t('whatsappDear')} \${entityName}

\${t('whatsappMessage')}

\${t('whatsappDetails')}
\${t('whatsappBalanceLabel')} \${goldBalance}
\${t('whatsappAgreedRateLabel')} \${agreedRate}
\${t('whatsappCurrentRateLabel')} \${currentRate}
\${t('whatsappAmountsLabel')} \${metalValue}
\${t('whatsappCurrentBalanceLabel')} \${currentBalance}

\${t('whatsappRequiredLabel')} \${requiredAmount}

\${t('whatsappPleaseSupport')}

\${t('whatsappThanks')}\`;
      
      // فتح واتساب مع الرسالة النصية
      const whatsappUrl = 'https://wa.me/' + phoneNumber + '?text=' + encodeURIComponent(message);
      
      // استخدام opener للوصول للنافذة الأصلية
      if (window.opener && window.opener.api && window.opener.api.openExternal) {
        window.opener.api.openExternal(whatsappUrl);
      } else if (window.opener && window.opener.require) {
        try {
          const { shell } = window.opener.require('electron');
          shell.openExternal(whatsappUrl);
        } catch (e) {
          window.location.href = whatsappUrl;
        }
      } else {
        window.location.href = whatsappUrl;
      }
      
      showModal('success', t('modalSuccess'), t('whatsappSuccess'));
    }
    
    // تعريف دالة t في النطاق العام
    const lang = localStorage.getItem('uiLang') || 'ar';
    const translations = ${JSON.stringify({
      ar: {
        modalSuccess: 'تم بنجاح',
        modalError: 'خطأ',
        modalOk: 'حسناً',
        imageCopied: 'تم نسخ الإخطار إلى الحافظة',
        noNotice: 'لم يتم العثور على الإخطار',
        libraryMissing: 'مكتبة التقاط الصورة غير متوفرة',
        copyFailed: 'فشل في نسخ الصورة',
        copySuccess: 'تم نسخ صورة الإخطار إلى الحافظة. يمكنك لصقها بـ Ctrl+V',
        noPhone: 'لا يوجد رقم هاتف صالح لهذا العميل',
        whatsappSuccess: 'تم نسخ صورة الإخطار إلى الحافظة وفتح واتساب.',
        whatsappTitle: '⚠️ إخطار لتدعيم الحساب',
        whatsappDear: 'عزيزي الزبون:',
        whatsappMessage: 'نحيطكم علماً بأن مستوى الدعم لمراكزكم المفتوحة قد تراجع إلى أقل من الحد الأدنى والمعدل المتفق عليه.',
        whatsappDetails: '📊 تفاصيل الحساب:',
        whatsappBalanceLabel: '• الرصيد (غرام):',
        whatsappAgreedRateLabel: '• المعدل المتفق عليه:',
        whatsappCurrentRateLabel: '• معدلكم الحالي:',
        whatsappAmountsLabel: '• المبالغ:',
        whatsappCurrentBalanceLabel: '• رصيدكم الحالي:',
        whatsappRequiredLabel: '💰 المبلغ المطلوب فوراً:',
        whatsappPleaseSupport: '⚠️ يرجى تعزيز الحساب فوراً.',
        whatsappThanks: 'شكراً لتعاونكم 🙏',
        btnUsd: 'دولار',
        btnSar: 'ريال سعودي',
        btnWhatsapp: 'واتساب',
        btnPrint: 'طباعة'
      },
      en: {
        modalSuccess: 'Success',
        modalError: 'Error',
        modalOk: 'OK',
        imageCopied: 'Notification copied to clipboard',
        noNotice: 'Notification not found',
        libraryMissing: 'Image capture library not available',
        copyFailed: 'Failed to copy image',
        copySuccess: 'Notification image copied to clipboard. You can paste it with Ctrl+V',
        noPhone: 'No valid phone number for this customer',
        whatsappSuccess: 'Notification image copied to clipboard and WhatsApp opened.',
        whatsappTitle: '⚠️ Account Support Notification',
        whatsappDear: 'Dear customer:',
        whatsappMessage: 'We inform you that the support level for your open positions has fallen below the minimum agreed rate.',
        whatsappDetails: '📊 Account Details:',
        whatsappBalanceLabel: '• Balance (gram):',
        whatsappAgreedRateLabel: '• Agreed Rate:',
        whatsappCurrentRateLabel: '• Your Current Rate:',
        whatsappAmountsLabel: '• Amounts:',
        whatsappCurrentBalanceLabel: '• Your Current Balance:',
        whatsappRequiredLabel: '💰 Required Amount Immediately:',
        whatsappPleaseSupport: '⚠️ Please support the account immediately.',
        whatsappThanks: 'Thank you for your cooperation 🙏',
        btnUsd: 'USD',
        btnSar: 'SAR',
        btnWhatsapp: 'WhatsApp',
        btnPrint: 'Print'
      }
    })};
    const t = (key) => translations[lang][key] || translations.ar[key] || key;
  </script>
</body>
</html>`;
}

// تصدير الدالة
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { generateMarginCallHTML };
}

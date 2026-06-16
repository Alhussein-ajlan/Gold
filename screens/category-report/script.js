// Category Report Screen Logic
(async function() {
  'use strict';

  // ===== Translation System =====
  const CR_TRANSLATIONS = {
    ar: {
      categoryReport: {
        title: "تقرير حسب الأصناف",
        subtitle: "جرد الأصناف حسب العيارات",
        filters: {
          section: "القسم",
          karat: "العيار",
          allKarats: "جميع العيارات",
          dateFrom: "من تاريخ",
          dateTo: "إلى تاريخ",
          view: "عرض",
          print: "طباعة"
        },
        sections: {
          all: "الكل",
          mashghulat: "المشغولات",
          kasr: "الكسر",
          silver: "الفضة"
        },
        summary: {
          totalItems: "إجمالي الأصناف",
          totalIn: "إجمالي الداخل",
          totalOut: "إجمالي الخارج",
          netBalance: "الصافي",
          gram: "جم"
        },
        table: {
          title: "تفاصيل الجرد",
          itemNo: "رقم الصنف",
          itemName: "اسم الصنف",
          karat: "العيار",
          totalIn: "إجمالي الداخل",
          totalOut: "إجمالي الخارج",
          net: "الصافي",
          total: "الإجمالي",
          itemsCount: "{count} صنف"
        },
        search: {
          placeholder: "بحث في الجدول..."
        },
        emptyState: "لا توجد بيانات للعرض",
        loading: "جاري التحميل...",
        noItemName: "بدون اسم"
      }
    },
    en: {
      categoryReport: {
        title: "Category Report",
        subtitle: "Items inventory by karat",
        filters: {
          section: "Section",
          karat: "Karat",
          allKarats: "All Karats",
          dateFrom: "From Date",
          dateTo: "To Date",
          view: "View",
          print: "Print"
        },
        sections: {
          all: "All",
          mashghulat: "Crafted",
          kasr: "Scrap",
          silver: "Silver"
        },
        summary: {
          totalItems: "Total Items",
          totalIn: "Total In",
          totalOut: "Total Out",
          netBalance: "Net Balance",
          gram: "g"
        },
        table: {
          title: "Inventory Details",
          itemNo: "Item No",
          itemName: "Item Name",
          karat: "Karat",
          totalIn: "Total In",
          totalOut: "Total Out",
          net: "Net",
          total: "Total",
          itemsCount: "{count} items"
        },
        search: {
          placeholder: "Search in table..."
        },
        emptyState: "No data to display",
        loading: "Loading...",
        noItemName: "No name"
      }
    }
  };
  
  let currentLang = 'ar';

  function getCRLang() {
    return localStorage.getItem('uiLang') || 'ar';
  }

  function tCR(key, params = {}) {
    const lang = currentLang;
    const keys = key.split('.');
    let val = CR_TRANSLATIONS[lang];
    for (const k of keys) {
      val = val?.[k];
      if (val === undefined) break;
    }
    if (typeof val !== 'string') {
      val = CR_TRANSLATIONS.ar;
      for (const k of keys) {
        val = val?.[k];
        if (val === undefined) break;
      }
    }
    if (typeof val !== 'string') return key;
    for (const [k, v] of Object.entries(params)) {
      val = val.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
    }
    return val;
  }

  function applyTranslations() {
    currentLang = getCRLang();
    const isRTL = currentLang === 'ar';
    document.documentElement.lang = currentLang;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = tCR(key);
      if (text && text !== key) {
        el.textContent = text;
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const text = tCR(key);
      if (text && text !== key) el.placeholder = text;
    });

    document.title = tCR('categoryReport.title');
  }

  applyTranslations();

  window.addEventListener('storage', (e) => {
    if (e.key === 'uiLang') {
      applyTranslations();
    }
  });

  window.addEventListener('languageChanged', () => {
    applyTranslations();
  });

  // Initialize screen permissions
  if (window.ScreenPermissions) {
    await window.ScreenPermissions.init();
  }

  // Number formatter
  const fmt2 = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // DOM Elements
  const sectionSelect = document.getElementById('f_section');
  const karatSelect = document.getElementById('f_karat');
  const fromInput = document.getElementById('f_from');
  const toInput = document.getElementById('f_to');
  const viewBtn = document.getElementById('btn_view');
  const printBtn = document.getElementById('btn_print');
  const summaryContainer = document.getElementById('summary_container');
  const resultsContainer = document.getElementById('results_container');
  const emptyState = document.getElementById('empty_state');
  const loadingState = document.getElementById('loading_state');
  const reportTableBody = document.getElementById('reportTableBody');
  const reportTableFoot = document.getElementById('reportTableFoot');
  const tableSearchInput = document.getElementById('tableSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');

  // Silver karats for detection
  const silverKarats = ['999', '925', '900', '800'];
  let hasFetchedCategoryReport = false;

  // ===== Fetch Report Data =====
  async function fetchReport() {
    // Permission check
    if (window.ScreenPermissions && !window.ScreenPermissions.check('reports_view_category_report', 'عرض تقرير حسب الأصناف')) {
      return;
    }

    const section = sectionSelect?.value || 'all';
    const karat = karatSelect?.value || 'all';
    const from = fromInput?.value || null;
    const to = toInput?.value || null;
    hasFetchedCategoryReport = true;

    showLoading();

    try {
      const params = { section, karat, from, to };
      const res = await window.api.invoke('reports:get-category-inventory', params);
      
      if (!res.success) {
        showEmpty();
        return;
      }

      if (!res.data || res.data.length === 0) {
        showEmpty();
        return;
      }

      renderResults(res.data);
    } catch (err) {
      showEmpty();
    }
  }

  // ===== Show States =====
  function showLoading() {
    if (loadingState) loadingState.style.display = '';
    if (resultsContainer) resultsContainer.style.display = 'none';
    if (summaryContainer) summaryContainer.style.display = 'none';
    if (emptyState) emptyState.style.display = 'none';
  }

  function showEmpty() {
    if (loadingState) loadingState.style.display = 'none';
    if (resultsContainer) resultsContainer.style.display = 'none';
    if (summaryContainer) summaryContainer.style.display = 'none';
    if (emptyState) emptyState.style.display = '';
  }

  function showResults() {
    if (loadingState) loadingState.style.display = 'none';
    if (resultsContainer) resultsContainer.style.display = '';
    if (summaryContainer) summaryContainer.style.display = '';
    if (emptyState) emptyState.style.display = 'none';
  }

  // ===== Render Results =====
  function renderResults(data) {
    if (!data || data.length === 0) {
      showEmpty();
      return;
    }

    // Calculate totals
    let totalIn = 0;
    let totalOut = 0;
    const uniqueItems = new Set();

    data.forEach(row => {
      totalIn += Number(row.total_in) || 0;
      totalOut += Number(row.total_out) || 0;
      if (row.item_no) uniqueItems.add(row.item_no);
    });

    const netBalance = totalIn - totalOut;

    // Update summary
    const totalItemsEl = document.getElementById('totalItemsValue');
    const totalInEl = document.getElementById('totalInValue');
    const totalOutEl = document.getElementById('totalOutValue');
    const netBalanceEl = document.getElementById('netBalanceValue');
    const itemsCountEl = document.getElementById('itemsCount');

    if (totalItemsEl) totalItemsEl.textContent = uniqueItems.size;
    if (totalInEl) totalInEl.textContent = `${fmt2.format(totalIn)} ${tCR('categoryReport.summary.gram')}`;
    if (totalOutEl) totalOutEl.textContent = `${fmt2.format(totalOut)} ${tCR('categoryReport.summary.gram')}`;
    
    if (netBalanceEl) {
      const netClass = netBalance > 0 ? 'value-positive' : (netBalance < 0 ? 'value-negative' : 'value-neutral');
      netBalanceEl.innerHTML = `<span class="${netClass}">${fmt2.format(netBalance)}</span> ${tCR('categoryReport.summary.gram')}`;
    }

    if (itemsCountEl) {
      itemsCountEl.textContent = tCR('categoryReport.table.itemsCount', { count: data.length });
    }

    // Render table
    if (reportTableBody) {
      reportTableBody.innerHTML = '';
      
      data.forEach(row => {
        const itemNo = row.item_no || '-';
        const itemName = row.item_name || tCR('categoryReport.noItemName');
        const karat = row.karat || '-';
        const rowTotalIn = Number(row.total_in) || 0;
        const rowTotalOut = Number(row.total_out) || 0;
        const rowNet = rowTotalIn - rowTotalOut;

        const isSilver = silverKarats.includes(String(karat));
        const karatBadgeClass = isSilver ? 'karat-badge silver' : 'karat-badge';
        
        const netClass = rowNet > 0 ? 'value-positive' : (rowNet < 0 ? 'value-negative' : 'value-neutral');

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${itemNo}</strong></td>
          <td>${itemName}</td>
          <td><span class="${karatBadgeClass}">${karat}</span></td>
          <td class="value-positive">${fmt2.format(rowTotalIn)}</td>
          <td class="value-negative">${fmt2.format(rowTotalOut)}</td>
          <td class="${netClass}">${fmt2.format(rowNet)}</td>
        `;
        reportTableBody.appendChild(tr);
      });
    }

    // Render footer totals
    if (reportTableFoot) {
      const footNetClass = netBalance > 0 ? 'value-positive' : (netBalance < 0 ? 'value-negative' : 'value-neutral');
      reportTableFoot.innerHTML = `
        <tr>
          <td colspan="3"><strong>${tCR('categoryReport.table.total')}</strong></td>
          <td class="value-positive"><strong>${fmt2.format(totalIn)}</strong></td>
          <td class="value-negative"><strong>${fmt2.format(totalOut)}</strong></td>
          <td class="${footNetClass}"><strong>${fmt2.format(netBalance)}</strong></td>
        </tr>
      `;
    }

    showResults();
  }

  // ===== Print Function =====
  async function printReport() {
    // Get company info
    let company = {};
    try {
      const api = window.api || null;
      if (api && api.getCompanyInfo) {
        const cr = await api.getCompanyInfo();
        if (cr && cr.success) company = cr.company || cr.data || {};
      }
    } catch (_) { }

    function normalizeFileUrl(p) { if (!p) return ''; return p.startsWith('file://') ? p : 'file:///' + String(p).replace(/\\/g, '/'); }

    const logoUrl = (company && company.logoData) ? company.logoData : (company && company.logo ? (normalizeFileUrl(company.logo) + '?v=' + Date.now()) : '');
    const companyName = company.name || 'اسم الشركة';
    const companyNameEn = company.name_en || company.name || 'Company Name';
    const companyAddress = company.address || '';
    const companyAddressEn = company.address_en || company.address || '';
    const companyPhone = company.phone || '';
    const companyEmail = company.email || '';
    const companyTax = company.tax || '';

    // Get current filter values
    const section = sectionSelect?.value || 'all';
    const karat = karatSelect?.value || 'all';
    const from = fromInput?.value || '';
    const to = toInput?.value || '';

    // Get section name
    const sectionNames = {
      'all': tCR('categoryReport.sections.all'),
      'mashghulat': tCR('categoryReport.sections.mashghulat'),
      'kasr': tCR('categoryReport.sections.kasr'),
      'silver': tCR('categoryReport.sections.silver')
    };
    const sectionName = sectionNames[section] || section;

    // Get table data
    const tableBody = reportTableBody?.innerHTML || '';
    const tableFoot = reportTableFoot?.innerHTML || '';

    // Get summary values
    const totalItems = document.getElementById('totalItemsValue')?.textContent || '0';
    const totalIn = document.getElementById('totalInValue')?.textContent || '0';
    const totalOut = document.getElementById('totalOutValue')?.textContent || '0';
    const netBalance = document.getElementById('netBalanceValue')?.textContent || '0';

    const now = new Date();
    const dateTime = now.toLocaleString('ar-SA');

    const lang = currentLang || 'ar';
    const isEn = lang === 'en';
    const htmlDir = isEn ? 'ltr' : 'rtl';
    const titleText = `<i class="fa-solid fa-file-invoice-dollar" style="margin-${isEn?'right':'left'}:8px"></i> ${tCR('categoryReport.title')}`;

    const printHTML = `
<!DOCTYPE html>
<html dir="${htmlDir}" lang="${lang}">
<head>
  <meta charset="UTF-8">
  <title>${tCR('categoryReport.title')}</title>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    @page { margin: 10mm; }
    body {
      font-family: 'Cairo', sans-serif;
      direction: ${htmlDir};
      background: #fff;
      color: #1e293b;
      font-size: 11px;
      line-height: 1.4;
    }
    .print-container { padding: 0; }
    
    /* Company Header - Same as reports screen */
    .comp-header {
      padding: 20px 15px;
      background: linear-gradient(135deg, #e8f5f3 0%, #d4edea 100%);
      border: 2px solid #00897B;
      border-radius: 12px 12px 0 0;
      margin-bottom: 0;
      border-bottom: none;
    }
    .header-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 20px;
      margin-bottom: 12px;
    }
    .header-side {
      flex: 1;
    }
    .header-side.left {
      text-align: left;
      direction: ltr;
    }
    .header-side.right {
      text-align: right;
      direction: rtl;
    }
    .company-name {
      font-size: 18px;
      font-weight: 700;
      color: #00897B;
      margin-bottom: 8px;
    }
    .company-detail {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 4px 0;
      font-size: 11px;
      color: #2c3e50;
    }
    .company-detail i {
      color: #00897B;
      font-size: 12px;
      width: 14px;
    }
    .company-logo {
      width: 130px;
      height: 130px;
      border: 4px solid #00897B;
      border-radius: 50%;
      overflow: hidden;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 4px 15px rgba(0,137,123,0.2);
      margin: 0 20px;
    }
    .company-logo img {
      width: 90%;
      height: 90%;
      object-fit: contain;
    }
    .company-logo .fallback {
      font-size: 48px;
      color: #00897B;
    }
    .report-title-box {
      text-align: center;
      padding: 8px 20px;
      background: linear-gradient(135deg, #e8f5f3 0%, #d4edea 100%);
      border: 2px solid #00897B;
      border-radius: 50px;
      color: #00897B;
      font-size: 14px;
      font-weight: 700;
      margin: 0 15px;
    }
    
    /* Main Container */
    .main-container {
      border: 2px solid #00897B;
      border-top: none;
      border-radius: 0 0 12px 12px;
      padding: 15px;
      background: white;
    }
    
    /* Filter Info Box */
    .info-box {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin-bottom: 15px;
      padding: 12px;
      background: #f8fafc;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
    }
    .info-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 10px;
    }
    .info-item .icon {
      width: 28px;
      height: 28px;
      background: linear-gradient(135deg, #0d9488, #14b8a6);
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 12px;
    }
    .info-item .content { flex: 1; }
    .info-item .lbl { color: #64748b; font-size: 8px; margin-bottom: 1px; }
    .info-item .val { font-weight: 700; color: #1e293b; font-size: 10px; }
    
    /* Summary Section */
    .totals-section {
      background: linear-gradient(135deg, #e8f5f3 0%, #d4edea 100%);
      border-radius: 10px;
      padding: 15px;
      margin-bottom: 15px;
      border: 2px solid #00897B;
    }
    .totals-header {
      text-align: center;
      margin-bottom: 12px;
    }
    .totals-header h3 {
      font-size: 13px;
      color: #00897B;
      font-weight: 700;
    }
    .totals-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
    }
    .total-card {
      background: white;
      border-radius: 8px;
      padding: 10px;
      text-align: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.06);
      border: 1px solid #00897B;
    }
    .total-card.items { border-top: 3px solid #3b82f6; }
    .total-card.in { border-top: 3px solid #10b981; }
    .total-card.out { border-top: 3px solid #ef4444; }
    .total-card.net { border-top: 3px solid #f59e0b; }
    .total-card-title {
      font-size: 9px;
      font-weight: 600;
      color: #374151;
      margin-bottom: 6px;
    }
    .total-card-value {
      font-size: 14px;
      font-weight: 700;
      color: #1f2937;
    }
    .total-card.in .total-card-value { color: #059669; }
    .total-card.out .total-card-value { color: #dc2626; }
    .total-card.net .total-card-value { color: #d97706; }
    
    /* Data Table */
    .table-container {
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      margin-bottom: 15px;
      border: 1px solid #cbd5e1;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
      background: white;
      font-size: 9px;
    }
    .data-table th {
      background: linear-gradient(135deg, #1e3a5f 0%, #2d4a6f 100%);
      color: white;
      padding: 10px 8px;
      font-size: 9px;
      font-weight: 600;
      text-align: center;
      white-space: nowrap;
      border: 1px solid #1e3a5f;
    }
    .data-table td {
      padding: 8px;
      text-align: center;
      border: 1px solid #cbd5e1;
      font-size: 9px;
      white-space: nowrap;
    }
    .data-table tbody tr:nth-child(even) { background: #f8fafc; }
    .data-table tbody tr:hover { background: #f1f5f9; }
    .data-table tfoot td {
      background: linear-gradient(135deg, #e8f5f3 0%, #d4edea 100%);
      font-weight: 700;
      border-top: 2px solid #00897B;
      font-size: 10px;
    }
    .value-positive { color: #059669; font-weight: 600; }
    .value-negative { color: #dc2626; font-weight: 600; }
    .value-neutral { color: #64748b; }
    .karat-badge {
      display: inline-block;
      background: linear-gradient(135deg, #fbbf24, #f59e0b);
      color: white;
      padding: 2px 8px;
      border-radius: 10px;
      font-size: 8px;
      font-weight: bold;
    }
    .karat-badge.silver {
      background: linear-gradient(135deg, #94a3b8, #64748b);
    }
    
    /* Print Button */
    .print-button {
      position: fixed;
      bottom: 20px;
      left: 20px;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 50px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(16,185,129,0.4);
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: inherit;
    }
    .print-button:hover { transform: translateY(-2px); }
    
    @media print {
      .no-print { display: none !important; }
      body { background: white; }
      .comp-header, .totals-section, .total-card, .data-table th {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        color-adjust: exact !important;
      }
    }
  </style>
</head>
<body>
  <div class="print-container">
    <!-- Company Header -->
    <section class="comp-header" style="padding:20px 15px;background:linear-gradient(135deg,#e8f5f3 0%,#d4edea 100%);border:2px solid #00897B;border-radius:12px 12px 0 0;margin-bottom:0;border-bottom:none;direction:ltr">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:20px;direction:ltr;margin-bottom:12px">
        <div style="flex:1;text-align:left;direction:ltr">
          <div style="font-size:18px;font-weight:700;color:#00897B;margin-bottom:8px">${companyNameEn}</div>
          <div style="display:flex;align-items:center;gap:8px;margin:4px 0;font-size:11px;color:#2c3e50"><i class="fa-solid fa-location-dot" style="color:#00897B;font-size:12px"></i><span>${companyAddressEn ? 'Address: '+companyAddressEn : ''}</span></div>
          <div style="display:flex;align-items:center;gap:8px;margin:4px 0;font-size:11px;color:#2c3e50"><i class="fa-solid fa-phone" style="color:#00897B;font-size:12px"></i><span>${companyPhone ? 'Phone: '+companyPhone : ''}</span></div>
          <div style="display:flex;align-items:center;gap:8px;margin:4px 0;font-size:11px;color:#2c3e50"><i class="fa-solid fa-envelope" style="color:#00897B;font-size:12px"></i><span>${companyEmail ? 'Email: '+companyEmail : ''}</span></div>
          <div style="display:flex;align-items:center;gap:8px;margin:4px 0;font-size:11px;color:#2c3e50"><i class="fa-solid fa-file-invoice" style="color:#00897B;font-size:12px"></i><span>${companyTax ? 'Tax No: '+companyTax : ''}</span></div>
        </div>
        <div style="width:130px;height:130px;border:4px solid #00897B;border-radius:50%;overflow:hidden;background:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 15px rgba(0,137,123,0.2);margin:0 20px">${logoUrl ? `<img src="${logoUrl}" alt="logo" style="width:90%;height:90%;object-fit:contain">` : ''}</div>
        <div style="flex:1;text-align:right;direction:rtl">
          <div style="font-size:20px;font-weight:700;color:#00897B;margin-bottom:8px">${companyName}</div>
          <div style="display:flex;align-items:center;gap:8px;margin:4px 0;font-size:11px;color:#2c3e50"><i class="fa-solid fa-location-dot" style="color:#00897B;font-size:12px"></i><span>${companyAddress ? 'العنوان: '+companyAddress : ''}</span></div>
          <div style="display:flex;align-items:center;gap:8px;margin:4px 0;font-size:11px;color:#2c3e50"><i class="fa-solid fa-phone" style="color:#00897B;font-size:12px"></i><span>${companyPhone ? 'رقم الهاتف: '+companyPhone : ''}</span></div>
          <div style="display:flex;align-items:center;gap:8px;margin:4px 0;font-size:11px;color:#2c3e50"><i class="fa-solid fa-envelope" style="color:#00897B;font-size:12px"></i><span>${companyEmail ? 'البريد: '+companyEmail : ''}</span></div>
          <div style="display:flex;align-items:center;gap:8px;margin:4px 0;font-size:11px;color:#2c3e50"><i class="fa-solid fa-file-invoice" style="color:#00897B;font-size:12px"></i><span>${companyTax ? 'الرقم الضريبي: '+companyTax : ''}</span></div>
        </div>
      </div>
      <div style="text-align:center;padding:6px 20px;background:linear-gradient(135deg,#e8f5f3 0%,#d4edea 100%);border:2px solid #00897B;border-radius:50px;color:#00897B;font-size:14px;font-weight:700;margin:0 15px">${titleText}</div>
    </section>
    
    <!-- Main Container -->
    <div class="main-container">
      <!-- Filter Info -->
      <div class="info-box">
        <div class="info-item">
          <div class="icon">📋</div>
          <div class="content"><div class="lbl">${tCR('categoryReport.filters.section')}</div><div class="val">${sectionName}</div></div>
        </div>
        <div class="info-item">
          <div class="icon">💎</div>
          <div class="content"><div class="lbl">${tCR('categoryReport.filters.karat')}</div><div class="val">${karat === 'all' ? tCR('categoryReport.filters.allKarats') : karat}</div></div>
        </div>
        <div class="info-item">
          <div class="icon">📅</div>
          <div class="content"><div class="lbl">${tCR('categoryReport.filters.dateFrom')}</div><div class="val">${from || '—'}</div></div>
        </div>
        <div class="info-item">
          <div class="icon">📅</div>
          <div class="content"><div class="lbl">${tCR('categoryReport.filters.dateTo')}</div><div class="val">${to || '—'}</div></div>
        </div>
      </div>
      
      <!-- Summary Cards -->
      <div class="totals-section">
        <div class="totals-header"><h3>📊 ملخص التقرير</h3></div>
        <div class="totals-grid">
          <div class="total-card items">
            <div class="total-card-title">${tCR('categoryReport.summary.totalItems')}</div>
            <div class="total-card-value">${totalItems}</div>
          </div>
          <div class="total-card in">
            <div class="total-card-title">${tCR('categoryReport.summary.totalIn')}</div>
            <div class="total-card-value">${totalIn}</div>
          </div>
          <div class="total-card out">
            <div class="total-card-title">${tCR('categoryReport.summary.totalOut')}</div>
            <div class="total-card-value">${totalOut}</div>
          </div>
          <div class="total-card net">
            <div class="total-card-title">${tCR('categoryReport.summary.netBalance')}</div>
            <div class="total-card-value">${netBalance}</div>
          </div>
        </div>
      </div>
      
      <!-- Data Table -->
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>${tCR('categoryReport.table.itemNo')}</th>
              <th>${tCR('categoryReport.table.itemName')}</th>
              <th>${tCR('categoryReport.table.karat')}</th>
              <th>${tCR('categoryReport.table.totalIn')}</th>
              <th>${tCR('categoryReport.table.totalOut')}</th>
              <th>${tCR('categoryReport.table.net')}</th>
            </tr>
          </thead>
          <tbody>${tableBody}</tbody>
          <tfoot>${tableFoot}</tfoot>
        </table>
      </div>
    </div>
    
    <button class="print-button no-print" onclick="window.print()">🖨️ طباعة</button>
  </div>
  <script>
    window.onload = function() {
      // Auto print after small delay
      setTimeout(function() { window.print(); }, 500);
    };
  </script>
</body>
</html>
    `;

    const printWindow = window.open('', '_blank', 'width=900,height=700');
    if (printWindow) {
      printWindow.document.write(printHTML);
      printWindow.document.close();
    }
  }

  // ===== Event Listeners =====
  viewBtn?.addEventListener('click', fetchReport);
  printBtn?.addEventListener('click', printReport);

  // Enter key to fetch
  [sectionSelect, karatSelect, fromInput, toInput].forEach(el => {
    el?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        fetchReport();
      }
    });
  });

  // ===== Table Search Functionality =====
  function filterTable(searchTerm) {
    if (!reportTableBody) return;
    
    const rows = reportTableBody.querySelectorAll('tr');
    const term = searchTerm.trim().toLowerCase();
    let visibleCount = 0;
    
    rows.forEach(row => {
      if (!term) {
        row.style.display = '';
        visibleCount++;
        return;
      }
      
      const text = row.textContent.toLowerCase();
      if (text.includes(term)) {
        row.style.display = '';
        visibleCount++;
      } else {
        row.style.display = 'none';
      }
    });
    
    // Update items count
    const itemsCountEl = document.getElementById('itemsCount');
    if (itemsCountEl) {
      itemsCountEl.textContent = tCR('categoryReport.table.itemsCount', { count: visibleCount });
    }
    
    // Show/hide clear button
    if (clearSearchBtn) {
      clearSearchBtn.style.display = term ? '' : 'none';
    }
  }
  
  // Search input event
  tableSearchInput?.addEventListener('input', (e) => {
    filterTable(e.target.value);
  });
  
  // Clear search button
  clearSearchBtn?.addEventListener('click', () => {
    if (tableSearchInput) {
      tableSearchInput.value = '';
      filterTable('');
      tableSearchInput.focus();
    }
  });
  
  // Clear search when fetching new data
  const originalFetchReport = fetchReport;
  async function fetchReportWithClear() {
    if (tableSearchInput) {
      tableSearchInput.value = '';
    }
    if (clearSearchBtn) {
      clearSearchBtn.style.display = 'none';
    }
    return originalFetchReport();
  }
  
  // Re-bind view button with clear functionality
  viewBtn?.removeEventListener('click', fetchReport);
  viewBtn?.addEventListener('click', fetchReportWithClear);

  window.refreshForBranchScopeChange = async function() {
    if (hasFetchedCategoryReport) {
      await fetchReportWithClear();
    }
    return true;
  };

})();

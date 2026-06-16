// ===== Income Statement Screen =====
(function() {
  'use strict';

  function ensureAPIBridge() {
    try {
      const pick = (name) => {
        if (!window[name]) {
          if (window.parent && window.parent !== window && window.parent[name]) {
            window[name] = window.parent[name];
          } else if (window.top && window.top !== window && window.top[name]) {
            window[name] = window.top[name];
          }
        }
      };
      ['api', 'permissions', 'accounts', 'db', 'sys'].forEach(pick);
    } catch (_) {}
  }
  ensureAPIBridge();

  const IS_TRANSLATIONS = {
    ar: {
      pageTitle: 'قائمة الدخل',
      screenTitle: 'قائمة الدخل',
      resultsTitle: 'نتائج قائمة الدخل',
      btnRefresh: 'تحديث',
      btnExportExcelTitle: 'تصدير Excel',
      btnExportPdfTitle: 'تصدير PDF',
      btnPrintTitle: 'طباعة',
      primaryPeriodTitle: 'الفترة الأساسية',
      comparePeriodTitle: 'فترة المقارنة (اختياري)',
      filterFromDate: 'من تاريخ',
      filterToDate: 'إلى تاريخ',
      btnView: 'عرض',
      searchPlaceholder: 'بحث في النتائج...',
      searchAriaLabel: 'بحث',
      thItem: 'البند',
      thCurrent: 'الفترة الأساسية',
      thCompare: 'فترة المقارنة',
      thDiff: 'الفرق',
      thPercent: 'نسبة التغير',
      noData: 'لا توجد بيانات للعرض',
      loading: 'جاري تحميل البيانات...',
      errorLoading: 'حدث خطأ أثناء جلب البيانات',
      genericError: 'حدث خطأ',
      initialHint: 'اختر الفترة الأساسية ثم اضغط "عرض" لعرض قائمة الدخل',
      noDataToExport: 'لا توجد بيانات للتصدير',
      excelExportSuccess: 'تم تصدير الملف بنجاح',
      noDataToPrint: 'لا توجد بيانات للطباعة',
      printError: 'حدث خطأ أثناء الطباعة',
      validationPrimaryRangeRequired: 'الرجاء إدخال من تاريخ وإلى تاريخ للفترة الأساسية',
      validationCompareRangeIncomplete: 'لإستخدام فترة المقارنة، يجب إدخال من تاريخ وإلى تاريخ معًا',
      lineSalesRevenue: 'إيرادات المبيعات',
      lineOtherRevenue: 'إيرادات أخرى',
      lineTotalRevenue: 'إجمالي الإيرادات',
      lineCostOfSales: 'تكلفة المبيعات',
      lineGrossProfit: 'مجمل الربح',
      lineOperatingExpenses: 'مصروفات التشغيل',
      lineOperatingProfit: 'الربح التشغيلي',
      lineOtherExpenses: 'مصروفات أخرى',
      lineNetProfit: 'صافي الربح',
      percentSuffix: '%',
      currentAndCompareCaption: 'مقارنة بين فترتين'
    },
    en: {
      pageTitle: 'Income Statement',
      screenTitle: 'Income Statement',
      resultsTitle: 'Income Statement Results',
      btnRefresh: 'Refresh',
      btnExportExcelTitle: 'Export Excel',
      btnExportPdfTitle: 'Export PDF',
      btnPrintTitle: 'Print',
      primaryPeriodTitle: 'Primary Period',
      comparePeriodTitle: 'Comparison Period (optional)',
      filterFromDate: 'From date',
      filterToDate: 'To date',
      btnView: 'View',
      searchPlaceholder: 'Search in results...',
      searchAriaLabel: 'Search',
      thItem: 'Item',
      thCurrent: 'Primary Period',
      thCompare: 'Comparison Period',
      thDiff: 'Difference',
      thPercent: 'Change %',
      noData: 'No data to display',
      loading: 'Loading data...',
      errorLoading: 'Error while loading data',
      genericError: 'An error occurred',
      initialHint: 'Select primary period then click "View" to load the income statement',
      noDataToExport: 'No data to export',
      excelExportSuccess: 'File exported successfully',
      noDataToPrint: 'No data to print',
      printError: 'Error while printing',
      validationPrimaryRangeRequired: 'Please enter both From and To dates for the primary period',
      validationCompareRangeIncomplete: 'To use comparison period, please enter both From and To dates',
      lineSalesRevenue: 'Sales Revenue',
      lineOtherRevenue: 'Other Revenue',
      lineTotalRevenue: 'Total Revenue',
      lineCostOfSales: 'Cost of Sales',
      lineGrossProfit: 'Gross Profit',
      lineOperatingExpenses: 'Operating Expenses',
      lineOperatingProfit: 'Operating Profit',
      lineOtherExpenses: 'Other Expenses',
      lineNetProfit: 'Net Profit',
      percentSuffix: '%',
      currentAndCompareCaption: 'Comparison between two periods'
    }
  };

  function getISLang() {
    try {
      return localStorage.getItem('uiLang') === 'en' ? 'en' : 'ar';
    } catch (_) {
      return 'ar';
    }
  }

  function tIS(key) {
    const lang = getISLang();
    const dict = IS_TRANSLATIONS[lang] || IS_TRANSLATIONS.ar;
    return dict[key] || IS_TRANSLATIONS.ar[key] || key;
  }

  let currentLines = [];
  let hasFetchedIncomeStatement = false;

  const fmtAmount = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtPercent = new Intl.NumberFormat('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  function formatAmount(v) {
    return fmtAmount.format(v || 0);
  }

  function formatPercentValue(v) {
    return fmtPercent.format(v || 0);
  }

  function showToast(msg, type = 'info') {
    if (window.showToastMessage) {
      window.showToastMessage(msg, type);
    } else {
      const wrap = document.getElementById('toastWrap');
      if (wrap) {
        const t = document.createElement('div');
        t.className = `toast toast-${type}`;
        t.textContent = msg;
        wrap.appendChild(t);
        setTimeout(() => t.remove(), 3000);
      }
    }
  }

  function toggleExportButtons(enabled) {
    ['btnIsExportExcel', 'btnIsExportPdf', 'btnIsPrint'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) btn.disabled = !enabled;
    });
  }

  function setEmptyState(message) {
    const body = document.getElementById('isTableBody');
    if (!body) return;
    body.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 40px; color: var(--subtle);">${message}</td></tr>`;
    toggleExportButtons(false);
    currentLines = [];
  }

  function filterTable(query) {
    const q = (query || '').toString().trim().toLowerCase();
    const rows = document.querySelectorAll('#isTableBody tr[data-line-key]');
    rows.forEach((tr) => {
      const text = (tr.textContent || '').toLowerCase();
      tr.style.display = !q || text.includes(q) ? '' : 'none';
    });
  }

  function buildLinesFromAccounts(accounts) {
    const sums = {};

    const ensure = (key) => {
      if (!sums[key]) sums[key] = { a1: 0, a2: 0 };
      return sums[key];
    };

    if (Array.isArray(accounts)) {
      for (const acc of accounts) {
        const g = acc.group_key || 'other_expenses';
        const bucket = ensure(g);
        const a1 = Number(acc.amount1) || 0;
        const a2 = Number(acc.amount2) || 0;
        bucket.a1 += a1;
        bucket.a2 += a2;
      }
    }

    const get = (key) => sums[key] || { a1: 0, a2: 0 };

    const sales = get('sales_revenue');
    const otherRev = get('other_revenue');
    const cost = get('cost_of_sales');
    const opExp = get('operating_expenses');
    const adminExp = get('admin_expenses');
    const otherExp = get('other_expenses');
    const purchaseExp = get('purchase_expenses');

    const totalRevenue1 = sales.a1 + otherRev.a1;
    const totalRevenue2 = sales.a2 + otherRev.a2;

    const cost1 = cost.a1;
    const cost2 = cost.a2;

    const gross1 = totalRevenue1 - cost1;
    const gross2 = totalRevenue2 - cost2;

    const operatingExpenses1 = opExp.a1 + adminExp.a1 + purchaseExp.a1;
    const operatingExpenses2 = opExp.a2 + adminExp.a2 + purchaseExp.a2;

    const operatingProfit1 = gross1 - operatingExpenses1;
    const operatingProfit2 = gross2 - operatingExpenses2;

    const otherExpenses1 = otherExp.a1;
    const otherExpenses2 = otherExp.a2;

    const netProfit1 = operatingProfit1 - otherExpenses1;
    const netProfit2 = operatingProfit2 - otherExpenses2;

    const lines = [];

    const pushLine = (key, labelKey, a1, a2, isTotal = false) => {
      const diff = a1 - a2;
      const hasCompare = Math.abs(a2) > 0.000001;
      const percent = hasCompare ? (diff / a2 * 100) : null;
      lines.push({
        key,
        labelKey,
        amount1: a1,
        amount2: a2,
        diff,
        percent,
        isTotal
      });
    };

    if (Math.abs(sales.a1) > 0.000001 || Math.abs(sales.a2) > 0.000001) {
      pushLine('sales_revenue', 'lineSalesRevenue', sales.a1, sales.a2, false);
    }

    if (Math.abs(otherRev.a1) > 0.000001 || Math.abs(otherRev.a2) > 0.000001) {
      pushLine('other_revenue', 'lineOtherRevenue', otherRev.a1, otherRev.a2, false);
    }

    pushLine('total_revenue', 'lineTotalRevenue', totalRevenue1, totalRevenue2, true);

    pushLine('cost_of_sales', 'lineCostOfSales', cost1, cost2, false);

    pushLine('gross_profit', 'lineGrossProfit', gross1, gross2, true);

    if (Math.abs(operatingExpenses1) > 0.000001 || Math.abs(operatingExpenses2) > 0.000001) {
      pushLine('operating_expenses', 'lineOperatingExpenses', operatingExpenses1, operatingExpenses2, false);
    }

    pushLine('operating_profit', 'lineOperatingProfit', operatingProfit1, operatingProfit2, true);

    if (Math.abs(otherExpenses1) > 0.000001 || Math.abs(otherExpenses2) > 0.000001) {
      pushLine('other_expenses', 'lineOtherExpenses', otherExpenses1, otherExpenses2, false);
    }

    pushLine('net_profit', 'lineNetProfit', netProfit1, netProfit2, true);

    return lines;
  }

  function renderLines(lines) {
    const body = document.getElementById('isTableBody');
    if (!body) return;

    if (!lines || lines.length === 0) {
      setEmptyState(tIS('noData'));
      return;
    }

    currentLines = lines;

    let html = '';
    for (const line of lines) {
      const label = tIS(line.labelKey);
      const a1 = formatAmount(line.amount1 || 0);
      const a2 = formatAmount(line.amount2 || 0);
      const diff = formatAmount(line.diff || 0);
      const percentText = line.percent === null || line.percent === undefined
        ? '—'
        : `${formatPercentValue(line.percent)} ${tIS('percentSuffix')}`;

      const rowClass = line.isTotal ? 'is-row-total' : '';

      html += `
        <tr data-line-key="${line.key}" class="${rowClass}">
          <td>${label}</td>
          <td class="num">${a1}</td>
          <td class="num">${a2}</td>
          <td class="num">${diff}</td>
          <td class="num">${percentText}</td>
        </tr>
      `;
    }

    body.innerHTML = html;
    toggleExportButtons(true);
  }

  async function fetchIncomeStatement() {
    try {
      if (window.ScreenPermissions && !window.ScreenPermissions.check('reports_view_income_statement', 'عرض قائمة الدخل')) {
        return;
      }
    } catch (_) {}

    const from1 = document.getElementById('isFrom1')?.value || null;
    const to1 = document.getElementById('isTo1')?.value || null;
    const from2 = document.getElementById('isFrom2')?.value || null;
    const to2 = document.getElementById('isTo2')?.value || null;

    if (!from1 || !to1) {
      showToast(tIS('validationPrimaryRangeRequired'), 'warning');
      return;
    }

    if ((from2 && !to2) || (!from2 && to2)) {
      showToast(tIS('validationCompareRangeIncomplete'), 'warning');
      return;
    }

    hasFetchedIncomeStatement = true;

    setEmptyState(tIS('loading'));

    try {
      const result = await window.api.invoke('reports:get-income-statement', {
        from1,
        to1,
        from2: from2 || null,
        to2: to2 || null,
      });

      if (result && result.success) {
        const lines = buildLinesFromAccounts(result.accounts || []);
        renderLines(lines);
      } else {
        setEmptyState(result && result.error ? result.error : tIS('errorLoading'));
        showToast(result && result.error ? result.error : tIS('genericError'), 'error');
      }
    } catch (err) {
      setEmptyState(tIS('errorLoading'));
      showToast(err && err.message ? err.message : tIS('genericError'), 'error');
    }
  }

  function exportToExcel() {
    if (!currentLines || currentLines.length === 0) {
      showToast(tIS('noDataToExport'), 'warning');
      return;
    }

    const from1 = document.getElementById('isFrom1')?.value || '';
    const to1 = document.getElementById('isTo1')?.value || '';
    const from2 = document.getElementById('isFrom2')?.value || '';
    const to2 = document.getElementById('isTo2')?.value || '';

    let dateRange = '';
    if (from1 || to1) {
      dateRange += `الفترة الأساسية: ${from1 || '...'} - ${to1 || '...'}`;
    }
    if (from2 || to2) {
      dateRange += dateRange ? ' | ' : '';
      dateRange += `فترة المقارنة: ${from2 || '...'} - ${to2 || '...'}`;
    }
    if (dateRange) {
      dateRange = ` (${dateRange})`;
    }

    let html = `
      <html dir="rtl">
      <head><meta charset="utf-8"><style>
        table { border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; }
        th, td { border: 1px solid #000; padding: 8px; text-align: center; }
        th { background: #4472C4; color: white; }
        .num { text-align: left; direction: ltr; }
        .total { background: #D9E2F3; font-weight: bold; }
        h2 { text-align: center; }
      </style></head>
      <body>
      <h2>${tIS('pageTitle')}${dateRange}</h2>
      <table>
        <thead>
          <tr>
            <th>${tIS('thItem')}</th>
            <th>${tIS('thCurrent')}</th>
            <th>${tIS('thCompare')}</th>
            <th>${tIS('thDiff')}</th>
            <th>${tIS('thPercent')}</th>
          </tr>
        </thead>
        <tbody>
    `;

    for (const line of currentLines) {
      const label = tIS(line.labelKey);
      const a1 = formatAmount(line.amount1 || 0);
      const a2 = formatAmount(line.amount2 || 0);
      const diff = formatAmount(line.diff || 0);
      const percentText = line.percent === null || line.percent === undefined
        ? ''
        : `${formatPercentValue(line.percent)} ${tIS('percentSuffix')}`;
      const rowClass = line.isTotal ? 'total' : '';

      html += `
        <tr class="${rowClass}">
          <td>${label}</td>
          <td class="num">${a1}</td>
          <td class="num">${a2}</td>
          <td class="num">${diff}</td>
          <td class="num">${percentText}</td>
        </tr>
      `;
    }

    html += '</tbody></table></body></html>';

    const blob = new Blob(['\ufeff' + html], { type: 'application/vnd.ms-excel;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `income_statement_${new Date().toISOString().slice(0,10)}.xls`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(tIS('excelExportSuccess'), 'success');
  }

  async function printReport() {
    if (!currentLines || currentLines.length === 0) {
      showToast(tIS('noDataToPrint'), 'warning');
      return;
    }

    const from1 = document.getElementById('isFrom1')?.value || '';
    const to1 = document.getElementById('isTo1')?.value || '';
    const from2 = document.getElementById('isFrom2')?.value || '';
    const to2 = document.getElementById('isTo2')?.value || '';

    let dateRange = '';
    if (from1 || to1) {
      dateRange += `الفترة الأساسية: ${from1 || '...'} - ${to1 || '...'}`;
    }
    if (from2 || to2) {
      dateRange += dateRange ? ' | ' : '';
      dateRange += `فترة المقارنة: ${from2 || '...'} - ${to2 || '...'}`;
    }

    const lang = getISLang();
    const isRtl = lang === 'ar';
    const dir = isRtl ? 'rtl' : 'ltr';

    let html = `
      <!DOCTYPE html>
      <html dir="${dir}" lang="${lang}">
      <head>
        <meta charset="utf-8">
        <title>${tIS('pageTitle')}</title>
        <style>
          @page { size: A4 portrait; margin: 10mm; }
          body { font-family: 'Cairo', Arial, sans-serif; direction: ${dir}; padding: 20px; }
          h1 { text-align: center; margin-bottom: 5px; }
          .date-range { text-align: center; color: #666; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; font-size: 12px; }
          th, td { border: 1px solid #333; padding: 6px 8px; }
          th { background: #4472C4; color: white; }
          .num { text-align: left; direction: ltr; }
          .total { background: #D9E2F3; font-weight: bold; }
          @media print { 
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .print-btn { display: none !important; }
          }
          .print-btn {
            position: fixed;
            top: 20px;
            left: 20px;
            padding: 12px 24px;
            background: linear-gradient(135deg, #4472C4, #2c5aa0);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(68, 114, 196, 0.4);
            z-index: 1000;
            font-family: 'Cairo', Arial, sans-serif;
          }
          .print-btn:hover { background: linear-gradient(135deg, #2c5aa0, #1e4080); }
        </style>
      </head>
      <body>
        <button class="print-btn" onclick="window.print()">🖨️ طباعة</button>
        <h1>${tIS('pageTitle')}</h1>
        <div class="date-range">${dateRange}</div>
        <table>
          <thead>
            <tr>
              <th>${tIS('thItem')}</th>
              <th>${tIS('thCurrent')}</th>
              <th>${tIS('thCompare')}</th>
              <th>${tIS('thDiff')}</th>
              <th>${tIS('thPercent')}</th>
            </tr>
          </thead>
          <tbody>
    `;

    for (const line of currentLines) {
      const label = tIS(line.labelKey);
      const a1 = formatAmount(line.amount1 || 0);
      const a2 = formatAmount(line.amount2 || 0);
      const diff = formatAmount(line.diff || 0);
      const percentText = line.percent === null || line.percent === undefined
        ? ''
        : `${formatPercentValue(line.percent)} ${tIS('percentSuffix')}`;
      const rowClass = line.isTotal ? 'total' : '';

      html += `
        <tr class="${rowClass}">
          <td>${label}</td>
          <td class="num">${a1}</td>
          <td class="num">${a2}</td>
          <td class="num">${diff}</td>
          <td class="num">${percentText}</td>
        </tr>
      `;
    }

    html += '</tbody></table></body></html>';

    try {
      if (window.api && window.api.invoke) {
        await window.api.invoke('print-preview', { html, title: tIS('pageTitle') });
      } else {
        const win = window.open('', '_blank');
        win.document.write(html);
        win.document.close();
        win.print();
      }
    } catch (err) {
      showToast(tIS('printError'), 'error');
    }
  }

  function applyStaticTexts() {
    const lang = getISLang();
    const isRtl = lang === 'ar';
    const dir = isRtl ? 'rtl' : 'ltr';

    try {
      document.documentElement.lang = lang;
      document.documentElement.dir = dir;
      document.body.dir = dir;
      document.title = tIS('pageTitle');
    } catch (_) {}

    const titleEl = document.querySelector('.is-title h2');
    if (titleEl) titleEl.textContent = tIS('screenTitle');

    const resultsTitle = document.querySelector('#isGrid .table-head h3');
    if (resultsTitle) resultsTitle.textContent = tIS('resultsTitle');

    const btnRefresh = document.getElementById('btnIsRefresh');
    if (btnRefresh) {
      btnRefresh.title = tIS('btnRefresh');
      const span = btnRefresh.querySelector('span');
      if (span) span.textContent = tIS('btnRefresh');
    }

    const btnExcel = document.getElementById('btnIsExportExcel');
    if (btnExcel) btnExcel.title = tIS('btnExportExcelTitle');

    const btnPdf = document.getElementById('btnIsExportPdf');
    if (btnPdf) btnPdf.title = tIS('btnExportPdfTitle');

    const btnPrint = document.getElementById('btnIsPrint');
    if (btnPrint) btnPrint.title = tIS('btnPrintTitle');

    const primaryTitle = document.querySelector('#isFiltersCard .is-filter-group:nth-child(1) .is-filter-title');
    if (primaryTitle) primaryTitle.textContent = tIS('primaryPeriodTitle');

    const compareTitle = document.querySelector('#isFiltersCard .is-filter-group:nth-child(2) .is-filter-title');
    if (compareTitle) compareTitle.textContent = tIS('comparePeriodTitle');

    const from1LabelSpan = document.querySelector('label.form-field input#isFrom1')?.previousElementSibling;
    if (from1LabelSpan) from1LabelSpan.textContent = tIS('filterFromDate');

    const to1LabelSpan = document.querySelector('label.form-field input#isTo1')?.previousElementSibling;
    if (to1LabelSpan) to1LabelSpan.textContent = tIS('filterToDate');

    const from2LabelSpan = document.querySelector('label.form-field input#isFrom2')?.previousElementSibling;
    if (from2LabelSpan) from2LabelSpan.textContent = tIS('filterFromDate');

    const to2LabelSpan = document.querySelector('label.form-field input#isTo2')?.previousElementSibling;
    if (to2LabelSpan) to2LabelSpan.textContent = tIS('filterToDate');

    const btnView = document.getElementById('btnIsView');
    if (btnView) {
      const span = btnView.querySelector('span');
      if (span) span.textContent = tIS('btnView');
    }

    const searchInput = document.getElementById('isSearch');
    if (searchInput) {
      searchInput.placeholder = tIS('searchPlaceholder');
      searchInput.setAttribute('aria-label', tIS('searchAriaLabel'));
    }

    const table = document.getElementById('isTable');
    if (table && table.tHead && table.tHead.rows.length) {
      const row = table.tHead.rows[0];
      if (row.cells.length >= 5) {
        row.cells[0].textContent = tIS('thItem');
        row.cells[1].textContent = tIS('thCurrent');
        row.cells[2].textContent = tIS('thCompare');
        row.cells[3].textContent = tIS('thDiff');
        row.cells[4].textContent = tIS('thPercent');
      }
    }
  }

  document.addEventListener('DOMContentLoaded', async () => {
    applyStaticTexts();

    try {
      if (window.ScreenPermissions) {
        await window.ScreenPermissions.init();
        if (!window.ScreenPermissions.check('reports_view_income_statement', 'عرض قائمة الدخل')) {
          const panel = document.getElementById('panel-income-statement');
          if (panel) panel.style.display = 'none';
          return;
        }
      }
    } catch (_) {}

    // استخدام التوقيت المحلي بدلاً من UTC
    const now = new Date();
    const yearStart = `${now.getFullYear()}-01-01`;
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    const from1 = document.getElementById('isFrom1');
    const to1 = document.getElementById('isTo1');
    if (from1) from1.value = yearStart;
    if (to1) to1.value = today;

    document.getElementById('btnIsView')?.addEventListener('click', fetchIncomeStatement);
    document.getElementById('btnIsRefresh')?.addEventListener('click', fetchIncomeStatement);
    document.getElementById('isSearch')?.addEventListener('input', (e) => filterTable(e.target.value));
    document.getElementById('btnIsExportExcel')?.addEventListener('click', exportToExcel);
    document.getElementById('btnIsExportPdf')?.addEventListener('click', printReport);
    document.getElementById('btnIsPrint')?.addEventListener('click', printReport);

    setEmptyState(tIS('initialHint'));
  });

  window.refreshForBranchScopeChange = async function() {
    if (hasFetchedIncomeStatement) {
      await fetchIncomeStatement();
    }
    return true;
  };
})();

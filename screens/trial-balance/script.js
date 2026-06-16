// ===== Trial Balance Script =====
(function() {
  'use strict';

  // API Bridge
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

  // ===== Translation System =====
  const TB_TRANSLATIONS = {
    ar: {
      // Page / titles
      pageTitle: 'ميزان المراجعة',
      screenTitle: 'ميزان المراجعة',
      resultsTitle: 'نتائج ميزان المراجعة',

      // Top bar buttons
      btnRefresh: 'تحديث',
      btnExportExcelTitle: 'تصدير Excel',
      btnExportPdfTitle: 'تصدير PDF',
      btnPrintTitle: 'طباعة',

      // Filters
      filterFromDate: 'من تاريخ',
      filterToDate: 'إلى تاريخ',
      filterAccountType: 'نوع الحساب',
      filterAccountTypeAll: 'الكل',
      filterAccountTypeAsset: 'الأصول',
      filterAccountTypeLiability: 'الخصوم',
      filterAccountTypeEquity: 'حقوق الملكية',
      filterAccountTypeRevenue: 'الإيرادات',
      filterAccountTypeExpense: 'المصروفات',
      filterIncludeOpening: 'الافتتاحية',
      filterIncludeOpeningYes: 'نعم',
      filterIncludeOpeningNo: 'لا',
      filterShowEmpty: 'الحسابات الفارغة',
      filterShowEmptyHide: 'إخفاء',
      filterShowEmptyShow: 'إظهار',
      btnView: 'عرض',

      // Search
      searchPlaceholder: 'بحث في النتائج...',
      searchAriaLabel: 'بحث',

      // Table headers
      thAccountCode: 'رمز الحساب',
      thAccountName: 'اسم الحساب',
      thCashHeader: 'نقد (ريال)',
      thGoldHeader: 'ذهب (جرام 21)',
      thSilverHeader: 'فضة (جرام 999)',
      thDebit: 'مدين',
      thCredit: 'دائن',
      totalsLabel: 'الإجمالي',
      sharedBadge: 'مشترك',

      // Messages
      noData: 'لا توجد بيانات للعرض',
      loading: 'جاري تحميل البيانات...',
      errorLoading: 'حدث خطأ أثناء جلب البيانات',
      genericError: 'حدث خطأ',
      initialHint: 'اضغط "عرض" لتحميل ميزان المراجعة',
      warningUnbalanced: 'تحذير: ميزان المراجعة غير متوازن!',
      noDataToExport: 'لا توجد بيانات للتصدير',
      excelExportSuccess: 'تم تصدير الملف بنجاح',
      noDataToPrint: 'لا توجد بيانات للطباعة',
      printError: 'حدث خطأ أثناء الطباعة'
    },
    en: {
      // Page / titles
      pageTitle: 'Trial Balance',
      screenTitle: 'Trial Balance',
      resultsTitle: 'Trial Balance Results',

      // Top bar buttons
      btnRefresh: 'Refresh',
      btnExportExcelTitle: 'Export Excel',
      btnExportPdfTitle: 'Export PDF',
      btnPrintTitle: 'Print',

      // Filters
      filterFromDate: 'From date',
      filterToDate: 'To date',
      filterAccountType: 'Account type',
      filterAccountTypeAll: 'All',
      filterAccountTypeAsset: 'Assets',
      filterAccountTypeLiability: 'Liabilities',
      filterAccountTypeEquity: 'Equity',
      filterAccountTypeRevenue: 'Revenue',
      filterAccountTypeExpense: 'Expenses',
      filterIncludeOpening: 'Opening balances',
      filterIncludeOpeningYes: 'Yes',
      filterIncludeOpeningNo: 'No',
      filterShowEmpty: 'Empty accounts',
      filterShowEmptyHide: 'Hide',
      filterShowEmptyShow: 'Show',
      btnView: 'View',

      // Search
      searchPlaceholder: 'Search...',
      searchAriaLabel: 'Search',

      // Table headers
      thAccountCode: 'Account Code',
      thAccountName: 'Account Name',
      thCashHeader: 'Cash (SAR)',
      thGoldHeader: 'Gold (21K g)',
      thSilverHeader: 'Silver (999 g)',
      thDebit: 'Debit',
      thCredit: 'Credit',
      totalsLabel: 'Total',
      sharedBadge: 'Shared',

      // Messages
      noData: 'No data to display',
      loading: 'Loading data...',
      errorLoading: 'Error while loading data',
      genericError: 'An error occurred',
      initialHint: 'Click "View" to load trial balance',
      warningUnbalanced: 'Warning: Trial balance is not balanced!',
      noDataToExport: 'No data to export',
      excelExportSuccess: 'File exported successfully',
      noDataToPrint: 'No data to print',
      printError: 'Error while printing'
    }
  };

  function getTBLang() {
    try {
      return localStorage.getItem('uiLang') === 'en' ? 'en' : 'ar';
    } catch (_) {
      return 'ar';
    }
  }

  function tTB(key) {
    const lang = getTBLang();
    const dict = TB_TRANSLATIONS[lang] || TB_TRANSLATIONS.ar;
    return dict[key] || TB_TRANSLATIONS.ar[key] || key;
  }

  function getStoredTrialBalanceBranchScopeMode() {
    try {
      const params = new URLSearchParams(window.location.search || '');
      const scopeFromUrl = String(params.get('branchScope') || params.get('branch_scope') || '').trim().toLowerCase();
      if (scopeFromUrl === 'all') return 'all';
    } catch (_) {}
    try {
      const runtimeScope = window.currentBranchScopeContext;
      const runtimeMode = String(runtimeScope?.mode || runtimeScope?.scope || '').trim().toLowerCase();
      if (runtimeMode === 'all') return 'all';
    } catch (_) {}
    try {
      const raw = localStorage.getItem('branchScope');
      const parsed = raw ? JSON.parse(raw) : null;
      return String(parsed?.mode || parsed?.scope || '').trim().toLowerCase() === 'all' ? 'all' : 'branch';
    } catch (_) {
      return 'branch';
    }
  }

  function shouldShowTrialBalanceBranchDetails() {
    return getStoredTrialBalanceBranchScopeMode() === 'all';
  }

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getTrialBalanceBranchText(row = {}) {
    const branchCode = String(row?.branch_code || '').trim();
    const branchName = String(row?.branch_name || '').trim();
    if (branchCode && branchName) return `${branchCode} - ${branchName}`;
    return branchName || branchCode || '';
  }

  function isTrialBalanceSharedRow(row = {}) {
    return Number(row?.is_shared_across_branches || 0) === 1;
  }

  function getTrialBalanceAccountCellHtml(row = {}) {
    const accountName = escapeHtml(row?.account_name || row?.account_name_en || '');
    if (!shouldShowTrialBalanceBranchDetails()) {
      return `<span class="tb-account-name">${accountName}</span>`;
    }
    const badges = [];
    if (isTrialBalanceSharedRow(row)) {
      badges.push(`<span class="tb-account-badge tb-shared-badge">${escapeHtml(tTB('sharedBadge'))}</span>`);
    } else {
      const branchText = getTrialBalanceBranchText(row);
      if (branchText) {
        const safeBranchText = escapeHtml(branchText);
        badges.push(`<span class="tb-account-badge tb-branch-badge" title="${safeBranchText}">${safeBranchText}</span>`);
      }
    }
    if (!badges.length) {
      return `<span class="tb-account-name">${accountName}</span>`;
    }
    return `<span class="tb-account-cell"><span class="tb-account-name">${accountName}</span><span class="tb-account-badges">${badges.join('')}</span></span>`;
  }

  function getStoredTrialBalanceCurrentBranch() {
    try {
      return window.currentBranchContext || window.parent?.currentBranchContext || window.top?.currentBranchContext || null;
    } catch (_) {}
    try {
      const raw = localStorage.getItem('currentBranch');
      return raw ? JSON.parse(raw) : null;
    } catch (_) {
      return null;
    }
  }

  function getTrialBalanceBranchScopePrintText(lang = getTBLang()) {
    if (shouldShowTrialBalanceBranchDetails()) {
      return lang === 'en' ? 'All Branches' : 'كل الفروع';
    }
    const branch = getStoredTrialBalanceCurrentBranch();
    const branchCode = String(branch?.code || '').trim();
    const branchName = String((lang === 'en' ? (branch?.name_en || branch?.name) : (branch?.name || branch?.name_en)) || '').trim();
    if (branchCode && branchName) return `${branchCode} - ${branchName}`;
    return branchCode || branchName || (lang === 'en' ? 'Current Branch' : 'الفرع الحالي');
  }

  function getTrialBalancePrintMetaInfo(lang = getTBLang()) {
    const locale = lang === 'en' ? 'en-US-u-ca-gregory' : 'ar-SA-u-ca-gregory';
    const now = new Date();
    return {
      date: new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: '2-digit' }).format(now),
      time: new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit', hour12: true }).format(now),
    };
  }

  function getTrialBalancePrintAccountCellHtml(row = {}) {
    const accountName = escapeHtml(row?.account_name || row?.account_name_en || '');
    const badges = [];
    if (shouldShowTrialBalanceBranchDetails()) {
      if (isTrialBalanceSharedRow(row)) {
        badges.push(`<span class="print-account-badge print-shared-badge">${escapeHtml(tTB('sharedBadge'))}</span>`);
      } else {
        const branchText = getTrialBalanceBranchText(row);
        if (branchText) {
          const safeBranchText = escapeHtml(branchText);
          badges.push(`<span class="print-account-badge print-branch-badge" title="${safeBranchText}">${safeBranchText}</span>`);
        }
      }
    }
    return `<div class="print-account-cell"><div class="print-account-name">${accountName}</div>${badges.length ? `<div class="print-account-badges">${badges.join('')}</div>` : ''}</div>`;
  }

  // State
  let currentData = null;
  let currentTotals = null;
  let hasFetchedTrialBalance = false;

  // Number formatting (English numerals)
  const fmtCash = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtWeight = new Intl.NumberFormat('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 });

  function formatCash(v) { return fmtCash.format(v || 0); }
  function formatWeight(v) { return fmtWeight.format(v || 0); }

  // Toast
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

  function resetTotals() {
    const totalsMap = [
      ['totalCashDebit', formatCash(0)],
      ['totalCashCredit', formatCash(0)],
      ['totalGoldDebit', formatWeight(0)],
      ['totalGoldCredit', formatWeight(0)],
      ['totalSilverDebit', formatWeight(0)],
      ['totalSilverCredit', formatWeight(0)],
    ];
    totalsMap.forEach(([id, value]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    });
  }

  function setTotalsVisibility(visible) {
    const foot = document.getElementById('tbTableFoot');
    if (foot) foot.hidden = !visible;
  }

  function setLoadingState() {
    const body = document.getElementById('tbTableBody');
    if (!body) return;
    currentData = null;
    currentTotals = null;
    setTotalsVisibility(false);
    resetTotals();
    const loadingHint = getTBLang() === 'en'
      ? 'Please wait while balances are prepared and results are assembled.'
      : 'يرجى الانتظار بينما يتم تجهيز الأرصدة وتجميع النتائج.';
    body.innerHTML = `
      <tr class="tb-state-row tb-loading-row">
        <td colspan="8">
          <div class="tb-loading-state" role="status" aria-live="polite">
            <div class="tb-loading-spinner" aria-hidden="true"></div>
            <div class="tb-loading-title">${escapeHtml(tTB('loading'))}</div>
            <div class="tb-loading-subtitle">${escapeHtml(loadingHint)}</div>
            <div class="tb-loading-bars" aria-hidden="true">
              <span class="tb-loading-bar"></span>
              <span class="tb-loading-bar"></span>
              <span class="tb-loading-bar"></span>
            </div>
          </div>
        </td>
      </tr>
    `;
    toggleExportButtons(false);
  }

  // Empty state
  function setEmptyState(message) {
    const body = document.getElementById('tbTableBody');
    if (!body) return;
    currentData = null;
    currentTotals = null;
    setTotalsVisibility(false);
    resetTotals();
    body.innerHTML = `
      <tr class="tb-state-row">
        <td colspan="8">
          <div class="tb-state-panel">
            <div class="tb-state-icon"><i class="fa-solid fa-scale-balanced" aria-hidden="true"></i></div>
            <div class="tb-state-text">${escapeHtml(message)}</div>
          </div>
        </td>
      </tr>
    `;
    toggleExportButtons(false);
  }

  // Toggle export buttons
  function toggleExportButtons(enabled) {
    ['btnTbExportExcel', 'btnTbExportPdf', 'btnTbPrint'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) btn.disabled = !enabled;
    });
  }

  // Filter table
  function filterTable(query) {
    const q = (query || '').toString().trim().toLowerCase();
    const rows = document.querySelectorAll('#tbTableBody tr[data-account-id]');
    rows.forEach((tr) => {
      const text = (tr.textContent || '').toLowerCase();
      tr.style.display = !q || text.includes(q) ? '' : 'none';
    });
  }

  // Render data
  function renderData(rows, totals) {
    const body = document.getElementById('tbTableBody');
    if (!body) return;

    if (!rows || rows.length === 0) {
      setEmptyState(tTB('noData'));
      return;
    }

    currentData = rows;
    currentTotals = totals;

    let html = '';
    for (const row of rows) {
      html += `
        <tr data-account-id="${row.account_id}">
          <td>${escapeHtml(row.account_code || '')}</td>
          <td class="tb-account-cell-td">${getTrialBalanceAccountCellHtml(row)}</td>
          <td class="num">${formatCash(row.cash_debit || 0)}</td>
          <td class="num">${formatCash(row.cash_credit || 0)}</td>
          <td class="num">${formatWeight(row.gold_debit || 0)}</td>
          <td class="num">${formatWeight(row.gold_credit || 0)}</td>
          <td class="num">${formatWeight(row.silver_debit || 0)}</td>
          <td class="num">${formatWeight(row.silver_credit || 0)}</td>
        </tr>
      `;
    }
    body.innerHTML = html;

    // Update totals
    if (totals) {
      document.getElementById('totalCashDebit').textContent = formatCash(totals.cash_debit);
      document.getElementById('totalCashCredit').textContent = formatCash(totals.cash_credit);
      document.getElementById('totalGoldDebit').textContent = formatWeight(totals.gold_debit);
      document.getElementById('totalGoldCredit').textContent = formatWeight(totals.gold_credit);
      document.getElementById('totalSilverDebit').textContent = formatWeight(totals.silver_debit);
      document.getElementById('totalSilverCredit').textContent = formatWeight(totals.silver_credit);
    } else {
      resetTotals();
    }

    setTotalsVisibility(true);
    toggleExportButtons(true);
  }

  // Fetch data
  async function fetchTrialBalance() {
    try {
      // Permission check
      if (window.ScreenPermissions && !window.ScreenPermissions.check('reports_view_trial_balance', 'عرض ميزان المراجعة')) {
        return;
      }
    } catch (_) {}

    const from = document.getElementById('tbFrom')?.value || null;
    const to = document.getElementById('tbTo')?.value || null;
    const includeOpening = document.getElementById('tbIncludeOpening')?.value !== '0';
    const accountType = document.getElementById('tbAccountType')?.value || null;
    const showEmpty = document.getElementById('tbShowEmpty')?.value === '1';
    hasFetchedTrialBalance = true;

    setLoadingState();

    try {
      const result = await window.api.invoke('reports:get-trial-balance', {
        from,
        to,
        include_opening: includeOpening,
        account_type: accountType,
        show_empty: showEmpty
      });

      if (result.success) {
        renderData(result.rows, result.totals);
        if (result.totals && !result.totals.is_balanced) {
          showToast(tTB('warningUnbalanced'), 'warning');
        }
      } else {
        setEmptyState(result.error || tTB('errorLoading'));
        showToast(result.error || tTB('genericError'), 'error');
      }
    } catch (err) {
      setEmptyState(tTB('errorLoading'));
      showToast(err.message || tTB('genericError'), 'error');
    }
  }

  // Export to Excel
  function exportToExcel() {
    if (!currentData || currentData.length === 0) {
      showToast(tTB('noDataToExport'), 'warning');
      return;
    }

    const from = document.getElementById('tbFrom')?.value || '';
    const to = document.getElementById('tbTo')?.value || '';
    const dateRange = from || to ? ` (${from || '...'} - ${to || '...'})` : '';

    const lang = getTBLang();
    const isRtl = lang === 'ar';
    const dir = isRtl ? 'rtl' : 'ltr';

    let html = `
      <html dir="${dir}">
      <head><meta charset="utf-8"><style>
        table { border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; }
        th, td { border: 1px solid #000; padding: 8px; text-align: center; }
        th { background: #4472C4; color: white; }
        .num { text-align: left; direction: ltr; }
        .totals { background: #D9E2F3; font-weight: bold; }
        h2 { text-align: center; }
      </style></head>
      <body>
      <h2>${tTB('pageTitle')}${dateRange}</h2>
      <table>
        <thead>
          <tr>
            <th rowspan="2">${tTB('thAccountCode')}</th>
            <th rowspan="2">${tTB('thAccountName')}</th>
            <th colspan="2">${tTB('thCashHeader')}</th>
            <th colspan="2">${tTB('thGoldHeader')}</th>
            <th colspan="2">${tTB('thSilverHeader')}</th>
          </tr>
          <tr>
            <th>${tTB('thDebit')}</th><th>${tTB('thCredit')}</th>
            <th>${tTB('thDebit')}</th><th>${tTB('thCredit')}</th>
            <th>${tTB('thDebit')}</th><th>${tTB('thCredit')}</th>
          </tr>
        </thead>
        <tbody>
    `;

    for (const row of currentData) {
      html += `
        <tr>
          <td>${escapeHtml(row.account_code || '')}</td>
          <td>${escapeHtml(row.account_name || '')}</td>
          <td class="num">${formatCash(row.cash_debit || 0)}</td>
          <td class="num">${formatCash(row.cash_credit || 0)}</td>
          <td class="num">${formatWeight(row.gold_debit || 0)}</td>
          <td class="num">${formatWeight(row.gold_credit || 0)}</td>
          <td class="num">${formatWeight(row.silver_debit || 0)}</td>
          <td class="num">${formatWeight(row.silver_credit || 0)}</td>
        </tr>
      `;
    }

    if (currentTotals) {
      html += `
        <tr class="totals">
          <td colspan="2"><strong>${tTB('totalsLabel')}</strong></td>
          <td class="num">${formatCash(currentTotals.cash_debit || 0)}</td>
          <td class="num">${formatCash(currentTotals.cash_credit || 0)}</td>
          <td class="num">${formatWeight(currentTotals.gold_debit || 0)}</td>
          <td class="num">${formatWeight(currentTotals.gold_credit || 0)}</td>
          <td class="num">${formatWeight(currentTotals.silver_debit || 0)}</td>
          <td class="num">${formatWeight(currentTotals.silver_credit || 0)}</td>
        </tr>
      `;
    }

    html += '</tbody></table></body></html>';

    const blob = new Blob(['\ufeff' + html], { type: 'application/vnd.ms-excel;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trial_balance_${new Date().toISOString().slice(0,10)}.xls`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(tTB('excelExportSuccess'), 'success');
  }

  // Print / Export PDF
  async function printReport() {
    if (!currentData || currentData.length === 0) {
      showToast(tTB('noDataToPrint'), 'warning');
      return;
    }

    const from = document.getElementById('tbFrom')?.value || '';
    const to = document.getElementById('tbTo')?.value || '';
    const pLang = getTBLang();
    const pIsRtl = pLang === 'ar';
    const pDir = pIsRtl ? 'rtl' : 'ltr';
    const labels = pLang === 'en'
      ? {
          reportLabel: 'Financial Report',
          period: 'Period',
          branchScope: 'Branch Scope',
          accountType: 'Account Type',
          includeOpening: 'Opening Balances',
          showEmpty: 'Empty Accounts',
          records: 'Rows',
          printDate: 'Print Date',
          printTime: 'Print Time',
          status: 'Status',
          balanced: 'Balanced',
          unbalanced: 'Needs Review',
          fullPeriod: 'All Dates',
          totalsPanel: 'Totals Summary',
          print: 'Print',
        }
      : {
          reportLabel: 'تقرير مالي',
          period: 'الفترة',
          branchScope: 'نطاق الفروع',
          accountType: 'نوع الحساب',
          includeOpening: 'الافتتاحية',
          showEmpty: 'الحسابات الفارغة',
          records: 'عدد الصفوف',
          printDate: 'تاريخ الطباعة',
          printTime: 'وقت الطباعة',
          status: 'الحالة',
          balanced: 'متوازن',
          unbalanced: 'يحتاج مراجعة',
          fullPeriod: 'كل الفترات',
          totalsPanel: 'ملخص الإجماليات',
          print: 'طباعة',
        };
    const accountTypeText = document.getElementById('tbAccountType')?.selectedOptions?.[0]?.textContent?.trim() || tTB('filterAccountTypeAll');
    const includeOpeningText = document.getElementById('tbIncludeOpening')?.selectedOptions?.[0]?.textContent?.trim() || tTB('filterIncludeOpeningYes');
    const showEmptyText = document.getElementById('tbShowEmpty')?.selectedOptions?.[0]?.textContent?.trim() || tTB('filterShowEmptyHide');
    const branchScopeText = getTrialBalanceBranchScopePrintText(pLang);
    const dateRangeText = from || to ? `${from || '...'} - ${to || '...'}` : labels.fullPeriod;
    const { date: printDate, time: printTime } = getTrialBalancePrintMetaInfo(pLang);
    const statusText = currentTotals?.is_balanced ? labels.balanced : labels.unbalanced;
    const statusClass = currentTotals?.is_balanced ? 'status-balanced' : 'status-unbalanced';

    let html = `
      <!DOCTYPE html>
      <html dir="${pDir}" lang="${pLang}">
      <head>
        <meta charset="utf-8">
        <title>${tTB('pageTitle')}</title>
        <style>
          * { box-sizing: border-box; }
          @page { margin: 4mm; }
          body { font-family: 'Cairo', Arial, sans-serif; direction: ${pDir}; margin: 0; background: #f4f7fb; color: #0f172a; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print-shell { max-width: 100%; }
          .report-header { background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%); color: #fff; padding: 16px 18px; border-radius: 18px; box-shadow: 0 18px 40px rgba(15, 118, 110, 0.18); }
          .report-header-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
          .report-brand { display: flex; align-items: center; gap: 12px; min-width: 0; }
          .report-icon { width: 46px; height: 46px; border-radius: 14px; display: flex; align-items: center; justify-content: center; background: rgba(255, 255, 255, 0.16); font-size: 24px; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.18); }
          .report-title-block { min-width: 0; }
          .report-eyebrow { font-size: 11px; font-weight: 700; opacity: 0.92; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 6px; }
          .report-title-block h1 { margin: 0; font-size: 26px; line-height: 1.2; }
          .report-subtitle { margin-top: 6px; font-size: 12px; opacity: 0.96; }
          .report-print-meta { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; min-width: 210px; }
          .print-meta-item { background: rgba(255,255,255,0.14); border: 1px solid rgba(255,255,255,0.18); border-radius: 14px; padding: 8px 10px; }
          .print-meta-label { display: block; font-size: 9px; font-weight: 700; opacity: 0.92; margin-bottom: 4px; }
          .print-meta-value { display: block; font-size: 12px; font-weight: 700; }
          .report-meta-grid { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 6px; margin-top: 12px; }
          .meta-card { background: rgba(255,255,255,0.96); color: #0f172a; border-radius: 14px; padding: 8px 8px; box-shadow: 0 8px 18px rgba(15, 23, 42, 0.08); }
          .meta-card-label { display: block; font-size: 9px; font-weight: 700; color: #64748b; margin-bottom: 4px; }
          .meta-card-value { display: block; font-size: 11px; font-weight: 700; color: #0f172a; line-height: 1.45; overflow-wrap: anywhere; }
          .report-status-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin: 12px 0 10px; }
          .report-status-chip { display: inline-flex; align-items: center; gap: 8px; padding: 8px 12px; border-radius: 999px; font-size: 11px; font-weight: 700; border: 1px solid transparent; background: #fff; }
          .status-balanced { color: #166534; background: #dcfce7; border-color: #86efac; }
          .status-unbalanced { color: #9a3412; background: #ffedd5; border-color: #fdba74; }
          .report-status-note { color: #475569; font-size: 11px; font-weight: 600; }
          .report-table-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 18px; box-shadow: 0 16px 36px rgba(15, 23, 42, 0.08); overflow: hidden; }
          table { width: 100%; border-collapse: collapse; border-spacing: 0; table-layout: fixed; font-size: 11px; }
          .col-account-code { width: 8%; }
          .col-account-name { width: 32%; }
          .col-amount { width: 10%; }
          thead tr:first-child th { background: linear-gradient(135deg, #0f766e 0%, #0f766e 100%); color: #fff; font-size: 11px; }
          thead tr:nth-child(2) th { background: #11998e; color: #fff; font-size: 10px; }
          th, td { padding: 7px 6px; border: 1px solid #dbe4f0; }
          thead th { border-color: rgba(255,255,255,0.18); }
          th { font-weight: 800; text-align: center; white-space: nowrap; }
          td { vertical-align: middle; }
          tbody tr:nth-child(even) { background: #f8fafc; }
          tbody tr:nth-child(odd) { background: #ffffff; }
          tbody td { border-color: #dbe4f0; }
          .num { text-align: left; direction: ltr; font-variant-numeric: tabular-nums; white-space: nowrap; font-size: 9px; letter-spacing: -0.1px; }
          .totals-row td { background: linear-gradient(135deg, #ecfeff 0%, #cffafe 100%); font-weight: 800; border: 1px solid #99f6e4; border-top: 2px solid #14b8a6; }
          .account-name-cell { text-align: start; min-width: 0; width: auto; }
          .print-account-cell { display: flex; flex-direction: row; align-items: center; justify-content: flex-start; gap: 6px; flex-wrap: wrap; }
          .print-account-name { font-weight: 800; color: #0f172a; line-height: 1.35; font-size: 10px; overflow-wrap: anywhere; word-break: break-word; }
          .print-account-badges { display: inline-flex; align-items: center; gap: 4px; flex-wrap: wrap; }
          .print-account-badge { display: inline-flex; align-items: center; padding: 2px 6px; border-radius: 999px; font-size: 9px; font-weight: 800; border: 1px solid transparent; white-space: nowrap; line-height: 1.1; }
          .print-branch-badge { background: rgba(20, 184, 166, 0.12); color: #0f766e; border-color: rgba(15, 118, 110, 0.25); }
          .print-shared-badge { background: #dcfce7; color: #166534; border-color: #86efac; }
          .report-totals-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; margin-top: 14px; }
          .totals-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 12px 12px; box-shadow: 0 12px 28px rgba(15, 23, 42, 0.06); }
          .totals-card h3 { margin: 0 0 10px; font-size: 13px; color: #0f172a; }
          .totals-line { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 6px 0; border-bottom: 1px dashed #cbd5e1; font-size: 11px; }
          .totals-line:last-child { border-bottom: none; }
          .totals-line span { color: #64748b; font-weight: 700; }
          .totals-line bdi { color: #0f172a; font-weight: 800; direction: ltr; }
          @media print { 
            body { background: #fff; }
            .no-print { display: none !important; }
            .report-header { box-shadow: none; }
            .report-table-card, .totals-card { box-shadow: none; }
            .report-header { padding: 14px 16px; }
            .report-title-block h1 { font-size: 24px; }
            .report-meta-grid { gap: 6px; }
            th, td { padding: 6px 5px; }
          }
          .print-btn {
            position: fixed;
            top: 20px;
            left: 20px;
            padding: 12px 24px;
            background: linear-gradient(135deg, #0f766e, #11998e);
            color: white;
            border: none;
            border-radius: 999px;
            font-size: 15px;
            font-weight: 800;
            cursor: pointer;
            box-shadow: 0 10px 24px rgba(15, 118, 110, 0.35);
            z-index: 1000;
            font-family: 'Cairo', Arial, sans-serif;
          }
          .print-btn:hover { background: linear-gradient(135deg, #0b5f59, #0f766e); }
        </style>
      </head>
      <body>
        <button class="print-btn no-print" onclick="window.print()">🖨️ ${labels.print}</button>
        <div class="print-shell">
          <div class="report-header">
            <div class="report-header-top">
              <div class="report-brand">
                <div class="report-icon">⚖</div>
                <div class="report-title-block">
                  <div class="report-eyebrow">${labels.reportLabel}</div>
                  <h1>${tTB('pageTitle')}</h1>
                  <div class="report-subtitle">${escapeHtml(branchScopeText)}</div>
                </div>
              </div>
              <div class="report-print-meta">
                <div class="print-meta-item">
                  <span class="print-meta-label">${labels.printDate}</span>
                  <span class="print-meta-value">${escapeHtml(printDate)}</span>
                </div>
                <div class="print-meta-item">
                  <span class="print-meta-label">${labels.printTime}</span>
                  <span class="print-meta-value">${escapeHtml(printTime)}</span>
                </div>
              </div>
            </div>
            <div class="report-meta-grid">
              <div class="meta-card"><span class="meta-card-label">${labels.period}</span><span class="meta-card-value">${escapeHtml(dateRangeText)}</span></div>
              <div class="meta-card"><span class="meta-card-label">${labels.branchScope}</span><span class="meta-card-value">${escapeHtml(branchScopeText)}</span></div>
              <div class="meta-card"><span class="meta-card-label">${labels.accountType}</span><span class="meta-card-value">${escapeHtml(accountTypeText)}</span></div>
              <div class="meta-card"><span class="meta-card-label">${labels.includeOpening}</span><span class="meta-card-value">${escapeHtml(includeOpeningText)}</span></div>
              <div class="meta-card"><span class="meta-card-label">${labels.showEmpty}</span><span class="meta-card-value">${escapeHtml(showEmptyText)}</span></div>
              <div class="meta-card"><span class="meta-card-label">${labels.records}</span><span class="meta-card-value">${escapeHtml(String(currentData.length || 0))}</span></div>
            </div>
          </div>

          <div class="report-status-row">
            <span class="report-status-chip ${statusClass}">${labels.status}: ${statusText}</span>
            <span class="report-status-note">${escapeHtml(tTB('resultsTitle'))}</span>
          </div>

          <div class="report-table-card">
            <table>
              <colgroup>
                <col class="col-account-code">
                <col class="col-account-name">
                <col class="col-amount">
                <col class="col-amount">
                <col class="col-amount">
                <col class="col-amount">
                <col class="col-amount">
                <col class="col-amount">
              </colgroup>
              <thead>
                <tr>
                  <th rowspan="2">${tTB('thAccountCode')}</th>
                  <th rowspan="2">${tTB('thAccountName')}</th>
                  <th colspan="2">${tTB('thCashHeader')}</th>
                  <th colspan="2">${tTB('thGoldHeader')}</th>
                  <th colspan="2">${tTB('thSilverHeader')}</th>
                </tr>
                <tr>
                  <th>${tTB('thDebit')}</th><th>${tTB('thCredit')}</th>
                  <th>${tTB('thDebit')}</th><th>${tTB('thCredit')}</th>
                  <th>${tTB('thDebit')}</th><th>${tTB('thCredit')}</th>
                </tr>
              </thead>
              <tbody>
    `;

    for (const row of currentData) {
      html += `
        <tr>
          <td>${escapeHtml(row.account_code || '')}</td>
          <td class="account-name-cell">${getTrialBalancePrintAccountCellHtml(row)}</td>
          <td class="num"><bdi>${formatCash(row.cash_debit || 0)}</bdi></td>
          <td class="num"><bdi>${formatCash(row.cash_credit || 0)}</bdi></td>
          <td class="num"><bdi>${formatWeight(row.gold_debit || 0)}</bdi></td>
          <td class="num"><bdi>${formatWeight(row.gold_credit || 0)}</bdi></td>
          <td class="num"><bdi>${formatWeight(row.silver_debit || 0)}</bdi></td>
          <td class="num"><bdi>${formatWeight(row.silver_credit || 0)}</bdi></td>
        </tr>
      `;
    }

    if (currentTotals) {
      html += `
        <tr class="totals-row">
          <td colspan="2"><strong>${tTB('totalsLabel')}</strong></td>
          <td class="num"><bdi>${formatCash(currentTotals.cash_debit || 0)}</bdi></td>
          <td class="num"><bdi>${formatCash(currentTotals.cash_credit || 0)}</bdi></td>
          <td class="num"><bdi>${formatWeight(currentTotals.gold_debit || 0)}</bdi></td>
          <td class="num"><bdi>${formatWeight(currentTotals.gold_credit || 0)}</bdi></td>
          <td class="num"><bdi>${formatWeight(currentTotals.silver_debit || 0)}</bdi></td>
          <td class="num"><bdi>${formatWeight(currentTotals.silver_credit || 0)}</bdi></td>
        </tr>
      `;
    }

    html += `
              </tbody>
            </table>
          </div>

          <div class="report-totals-grid">
            <div class="totals-card">
              <h3>${tTB('thCashHeader')}</h3>
              <div class="totals-line"><span>${tTB('thDebit')}</span><bdi>${formatCash(currentTotals?.cash_debit || 0)}</bdi></div>
              <div class="totals-line"><span>${tTB('thCredit')}</span><bdi>${formatCash(currentTotals?.cash_credit || 0)}</bdi></div>
            </div>
            <div class="totals-card">
              <h3>${tTB('thGoldHeader')}</h3>
              <div class="totals-line"><span>${tTB('thDebit')}</span><bdi>${formatWeight(currentTotals?.gold_debit || 0)}</bdi></div>
              <div class="totals-line"><span>${tTB('thCredit')}</span><bdi>${formatWeight(currentTotals?.gold_credit || 0)}</bdi></div>
            </div>
            <div class="totals-card">
              <h3>${tTB('thSilverHeader')}</h3>
              <div class="totals-line"><span>${tTB('thDebit')}</span><bdi>${formatWeight(currentTotals?.silver_debit || 0)}</bdi></div>
              <div class="totals-line"><span>${tTB('thCredit')}</span><bdi>${formatWeight(currentTotals?.silver_credit || 0)}</bdi></div>
            </div>
          </div>
        </div>
      </body></html>`;

    try {
      if (window.api && window.api.invoke) {
        await window.api.invoke('print-preview', { html, title: tTB('pageTitle') });
      } else {
        const win = window.open('', '_blank');
        win.document.write(html);
        win.document.close();
        win.print();
      }
    } catch (err) {
      showToast(tTB('printError'), 'error');
    }
  }

  // Apply static translations to UI elements
  function applyTrialBalanceStaticTexts() {
    const lang = getTBLang();
    const isRtl = lang === 'ar';
    const dir = isRtl ? 'rtl' : 'ltr';

    try {
      document.documentElement.lang = lang;
      document.documentElement.dir = dir;
      document.body.dir = dir;
      document.title = tTB('pageTitle');
    } catch (_) {}

    // Top title
    const titleEl = document.querySelector('.tb-title h2');
    if (titleEl) titleEl.textContent = tTB('screenTitle');

    // Results card title
    const resultsTitle = document.querySelector('#tbGrid .table-head h3');
    if (resultsTitle) resultsTitle.textContent = tTB('resultsTitle');

    // Top bar buttons
    const btnRefresh = document.getElementById('btnTbRefresh');
    if (btnRefresh) {
      btnRefresh.title = tTB('btnRefresh');
      const span = btnRefresh.querySelector('span');
      if (span) span.textContent = tTB('btnRefresh');
    }

    const btnExcel = document.getElementById('btnTbExportExcel');
    if (btnExcel) btnExcel.title = tTB('btnExportExcelTitle');

    const btnPdf = document.getElementById('btnTbExportPdf');
    if (btnPdf) btnPdf.title = tTB('btnExportPdfTitle');

    const btnPrint = document.getElementById('btnTbPrint');
    if (btnPrint) btnPrint.title = tTB('btnPrintTitle');

    // Filters labels (use input/select ids to locate label span)
    const fromLabelSpan = document.querySelector('#tbFiltersCard label.form-field input#tbFrom')?.previousElementSibling;
    if (fromLabelSpan) fromLabelSpan.textContent = tTB('filterFromDate');

    const toLabelSpan = document.querySelector('#tbFiltersCard label.form-field input#tbTo')?.previousElementSibling;
    if (toLabelSpan) toLabelSpan.textContent = tTB('filterToDate');

    const accountTypeLabelSpan = document.querySelector('#tbFiltersCard label.form-field select#tbAccountType')?.previousElementSibling;
    if (accountTypeLabelSpan) accountTypeLabelSpan.textContent = tTB('filterAccountType');

    const includeOpeningLabelSpan = document.querySelector('#tbFiltersCard label.form-field select#tbIncludeOpening')?.previousElementSibling;
    if (includeOpeningLabelSpan) includeOpeningLabelSpan.textContent = tTB('filterIncludeOpening');

    const showEmptyLabelSpan = document.querySelector('#tbFiltersCard label.form-field select#tbShowEmpty')?.previousElementSibling;
    if (showEmptyLabelSpan) showEmptyLabelSpan.textContent = tTB('filterShowEmpty');

    // Filter selects options
    const accountTypeSelect = document.getElementById('tbAccountType');
    if (accountTypeSelect) {
      Array.from(accountTypeSelect.options).forEach((opt) => {
        switch (opt.value) {
          case '':
            opt.textContent = tTB('filterAccountTypeAll');
            break;
          case 'asset':
            opt.textContent = tTB('filterAccountTypeAsset');
            break;
          case 'liability':
            opt.textContent = tTB('filterAccountTypeLiability');
            break;
          case 'equity':
            opt.textContent = tTB('filterAccountTypeEquity');
            break;
          case 'revenue':
            opt.textContent = tTB('filterAccountTypeRevenue');
            break;
          case 'expense':
            opt.textContent = tTB('filterAccountTypeExpense');
            break;
          default:
            break;
        }
      });
    }

    const includeOpeningSelect = document.getElementById('tbIncludeOpening');
    if (includeOpeningSelect) {
      Array.from(includeOpeningSelect.options).forEach((opt) => {
        if (opt.value === '1') opt.textContent = tTB('filterIncludeOpeningYes');
        else if (opt.value === '0') opt.textContent = tTB('filterIncludeOpeningNo');
      });
    }

    const showEmptySelect = document.getElementById('tbShowEmpty');
    if (showEmptySelect) {
      Array.from(showEmptySelect.options).forEach((opt) => {
        if (opt.value === '0') opt.textContent = tTB('filterShowEmptyHide');
        else if (opt.value === '1') opt.textContent = tTB('filterShowEmptyShow');
      });
    }

    // View button
    const btnView = document.getElementById('btnTbView');
    if (btnView) {
      const span = btnView.querySelector('span');
      if (span) span.textContent = tTB('btnView');
    }

    // Search input
    const searchInput = document.getElementById('tbSearch');
    if (searchInput) {
      searchInput.placeholder = tTB('searchPlaceholder');
      searchInput.setAttribute('aria-label', tTB('searchAriaLabel'));
    }

    // Table headers - Row 1 has 5 cells (2 with rowspan + 3 with colspan)
    // Row 2 has 6 cells (sub-headers: Debit/Credit x 3)
    const tbTable = document.getElementById('tbTable');
    if (tbTable && tbTable.tHead && tbTable.tHead.rows.length >= 2) {
      const row1 = tbTable.tHead.rows[0];
      const row2 = tbTable.tHead.rows[1];
      // Row 1: [0]=AccountCode, [1]=AccountName, [2]=Cash(colspan), [3]=Gold(colspan), [4]=Silver(colspan)
      if (row1.cells.length >= 5) {
        row1.cells[0].textContent = tTB('thAccountCode');
        row1.cells[1].textContent = tTB('thAccountName');
        row1.cells[2].textContent = tTB('thCashHeader');
        row1.cells[3].textContent = tTB('thGoldHeader');
        row1.cells[4].textContent = tTB('thSilverHeader');
      }
      // Row 2: 6 sub-headers (Debit/Credit x 3)
      if (row2.cells.length >= 6) {
        row2.cells[0].textContent = tTB('thDebit');
        row2.cells[1].textContent = tTB('thCredit');
        row2.cells[2].textContent = tTB('thDebit');
        row2.cells[3].textContent = tTB('thCredit');
        row2.cells[4].textContent = tTB('thDebit');
        row2.cells[5].textContent = tTB('thCredit');
      }
    }

    // Totals row label
    const tbFoot = document.getElementById('tbTableFoot');
    if (tbFoot && tbFoot.rows.length) {
      const labelCell = tbFoot.rows[0].cells[0];
      if (labelCell) labelCell.innerHTML = `<strong>${tTB('totalsLabel')}</strong>`;
    }
  }

  // Init
  document.addEventListener('DOMContentLoaded', async () => {
    // Apply translations
    applyTrialBalanceStaticTexts();
    // Init permissions
    try {
      if (window.ScreenPermissions) {
        await window.ScreenPermissions.init();
      }
    } catch (_) {}

    // Set default dates (current year) - استخدام التوقيت المحلي
    const now = new Date();
    const yearStart = `${now.getFullYear()}-01-01`;
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    
    const tbFrom = document.getElementById('tbFrom');
    const tbTo = document.getElementById('tbTo');
    if (tbFrom) tbFrom.value = yearStart;
    if (tbTo) tbTo.value = today;

    // Event listeners
    document.getElementById('btnTbView')?.addEventListener('click', fetchTrialBalance);
    document.getElementById('btnTbRefresh')?.addEventListener('click', fetchTrialBalance);
    document.getElementById('tbSearch')?.addEventListener('input', (e) => filterTable(e.target.value));
    document.getElementById('btnTbExportExcel')?.addEventListener('click', exportToExcel);
    document.getElementById('btnTbExportPdf')?.addEventListener('click', printReport);
    document.getElementById('btnTbPrint')?.addEventListener('click', printReport);

    // Initial state
    setEmptyState(tTB('initialHint'));
  });

  window.refreshForBranchScopeChange = async function() {
    if (hasFetchedTrialBalance) {
      await fetchTrialBalance();
    }
    return true;
  };
})();

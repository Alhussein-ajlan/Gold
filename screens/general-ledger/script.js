// ===== General Ledger Script =====
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
  const GL_TRANSLATIONS = {
    ar: {
      // Page / titles
      pageTitle: 'دفتر الأستاذ',
      screenTitle: 'دفتر الأستاذ',
      resultsTitle: 'حركات الحساب',

      // Top bar buttons
      btnRefresh: 'تحديث',
      btnExportExcelTitle: 'تصدير Excel',
      btnExportPdfTitle: 'تصدير PDF',
      btnPrintTitle: 'طباعة',

      // Filters / search
      filterAccount: 'الحساب',
      accountSearchPlaceholder: 'ابحث عن حساب...',
      filterFromDate: 'من تاريخ',
      filterToDate: 'إلى تاريخ',
      filterIncludeOpening: 'الافتتاحية',
      filterIncludeOpeningYes: 'نعم',
      filterIncludeOpeningNo: 'لا',
      btnView: 'عرض',
      searchPlaceholder: 'بحث في النتائج...',
      searchAriaLabel: 'بحث',

      // Table headers
      thDate: 'التاريخ',
      thDocType: 'نوع السند',
      thDocNo: 'رقم السند',
      thMemo: 'البيان',
      thCashHeader: 'نقد (ريال)',
      thGoldHeader: 'ذهب (جرام)',
      thSilverHeader: 'فضة (جرام)',
      thDebit: 'مدين',
      thCredit: 'دائن',
      thBalance: 'الرصيد',
      totalsLabel: 'الإجمالي',

      // Messages
      emptyInitial: 'اختر حساب ثم اضغط "عرض" لتحميل دفتر الأستاذ',
      emptyNoMovements: 'لا توجد حركات لهذا الحساب',
      loading: 'جاري تحميل البيانات...',
      errorLoading: 'حدث خطأ أثناء جلب البيانات',
      genericError: 'حدث خطأ',
      noDataToExport: 'لا توجد بيانات للتصدير',
      excelExportSuccess: 'تم تصدير الملف بنجاح',
      noDataToPrint: 'لا توجد بيانات للطباعة',
      printError: 'حدث خطأ أثناء الطباعة',
      selectAccountRequired: 'يرجى اختيار حساب',
      noResults: 'لا توجد نتائج'
    },
    en: {
      // Page / titles
      pageTitle: 'General Ledger',
      screenTitle: 'General Ledger',
      resultsTitle: 'Account Movements',

      // Top bar buttons
      btnRefresh: 'Refresh',
      btnExportExcelTitle: 'Export Excel',
      btnExportPdfTitle: 'Export PDF',
      btnPrintTitle: 'Print',

      // Filters / search
      filterAccount: 'Account',
      accountSearchPlaceholder: 'Search account...',
      filterFromDate: 'From date',
      filterToDate: 'To date',
      filterIncludeOpening: 'Opening balances',
      filterIncludeOpeningYes: 'Yes',
      filterIncludeOpeningNo: 'No',
      btnView: 'View',
      searchPlaceholder: 'Search in results...',
      searchAriaLabel: 'Search',

      // Table headers
      thDate: 'Date',
      thDocType: 'Voucher Type',
      thDocNo: 'Voucher No.',
      thMemo: 'Description',
      thCashHeader: 'Cash (SAR)',
      thGoldHeader: 'Gold (grams)',
      thSilverHeader: 'Silver (grams)',
      thDebit: 'Debit',
      thCredit: 'Credit',
      thBalance: 'Balance',
      totalsLabel: 'Total',

      // Messages
      emptyInitial: 'Select an account then click "View" to load the general ledger',
      emptyNoMovements: 'No movements for this account',
      loading: 'Loading data...',
      errorLoading: 'Error while loading data',
      genericError: 'An error occurred',
      noDataToExport: 'No data to export',
      excelExportSuccess: 'File exported successfully',
      noDataToPrint: 'No data to print',
      printError: 'Error while printing',
      selectAccountRequired: 'Please select an account',
      noResults: 'No results'
    }
  };

  function getGLLang() {
    try {
      return localStorage.getItem('uiLang') === 'en' ? 'en' : 'ar';
    } catch (_) {
      return 'ar';
    }
  }

  function tGL(key) {
    const lang = getGLLang();
    const dict = GL_TRANSLATIONS[lang] || GL_TRANSLATIONS.ar;
    return dict[key] || GL_TRANSLATIONS.ar[key] || key;
  }

  // State
  let currentData = null;
  let currentTotals = null;
  let currentAccount = null;

  // Number formatting (English numerals)
  const fmtCash = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtWeight = new Intl.NumberFormat('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 });

  function formatCash(v) { return fmtCash.format(v || 0); }
  function formatWeight(v) { return fmtWeight.format(v || 0); }

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getGeneralLedgerBranchText(row) {
    const branchCode = String(row?.branch_code || '').trim();
    const branchName = String(row?.branch_name || '').trim();
    if (branchCode && branchName) return `${branchCode} - ${branchName}`;
    return branchCode || branchName || '';
  }

  function getGeneralLedgerDocText(row) {
    const docId = String(row?.doc_id ?? '').trim() || '-';
    const branchText = getGeneralLedgerBranchText(row);
    return branchText ? `${docId} - ${branchText}` : docId;
  }

  function getGeneralLedgerDocHtml(row) {
    const docId = escapeHtml(String(row?.doc_id ?? '').trim() || '-');
    const branchText = getGeneralLedgerBranchText(row);
    if (!branchText) return docId;
    return `<div>${docId}</div><div style="font-size:11px;color:var(--subtle);margin-top:2px;">${escapeHtml(branchText)}</div>`;
  }

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

  // Empty state
  function setEmptyState(message) {
    const body = document.getElementById('glTableBody');
    if (!body) return;
    body.innerHTML = `<tr><td colspan="13" style="text-align:center; padding: 40px; color: var(--subtle);">${message}</td></tr>`;
    
    // Reset totals
    ['totalCashDebit', 'totalCashCredit', 'totalCashBalance', 
     'totalGoldDebit', 'totalGoldCredit', 'totalGoldBalance',
     'totalSilverDebit', 'totalSilverCredit', 'totalSilverBalance'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = '0';
    });
    
    toggleExportButtons(false);
  }

  // Toggle export buttons
  function toggleExportButtons(enabled) {
    ['btnGlExportExcel', 'btnGlExportPdf', 'btnGlPrint'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) btn.disabled = !enabled;
    });
  }

  // Filter table
  function filterTable(query) {
    const q = (query || '').toString().trim().toLowerCase();
    const rows = document.querySelectorAll('#glTableBody tr[data-journal-id]');
    rows.forEach((tr) => {
      const text = (tr.textContent || '').toLowerCase();
      tr.style.display = !q || text.includes(q) ? '' : 'none';
    });
  }

  // Accounts data for search
  let allAccounts = [];
  let selectedAccountId = null;

  function getGeneralLedgerSelectableAccounts(rows) {
    const allRows = Array.isArray(rows) ? rows.filter(Boolean) : [];
    const excludedRootCodes = new Set(['114', '211']);
    const rootAccounts = allRows.filter(acc => excludedRootCodes.has(String(acc.code || '').trim()));
    const excludedRootIds = rootAccounts.map(acc => String(acc.id));
    const baseRows = allRows.filter(acc => Number(acc?.is_parent || 0) !== 1 && !excludedRootIds.includes(String(acc.id)));

    if (!excludedRootIds.length) return baseRows;

    const childrenByParent = new Map();
    for (const account of allRows) {
      const parentKey = account?.parent_id == null ? '' : String(account.parent_id);
      if (!childrenByParent.has(parentKey)) childrenByParent.set(parentKey, []);
      childrenByParent.get(parentKey).push(account);
    }

    const excludedIds = new Set();
    const queue = [...excludedRootIds];
    while (queue.length) {
      const parentId = String(queue.shift());
      const children = childrenByParent.get(parentId) || [];
      for (const child of children) {
        const childId = String(child?.id || '');
        if (!childId || excludedRootIds.includes(childId) || excludedIds.has(childId)) continue;
        excludedIds.add(childId);
        queue.push(childId);
      }
    }

    return [...rootAccounts, ...baseRows.filter(acc => !excludedIds.has(String(acc.id)))];
  }

  // Load accounts
  async function loadAccounts() {
    try {
      let accounts = [];
      
      if (window.accounts && window.accounts.getAccountsFlat) {
        const res = await window.accounts.getAccountsFlat();
        if (res && res.success && Array.isArray(res.data)) {
          accounts = res.data;
        }
      }
      
      if (accounts.length === 0 && window.api && window.api.invoke) {
        const res = await window.api.invoke('get-accounts-flat');
        if (res && res.success && Array.isArray(res.data)) {
          accounts = res.data;
        }
      }

      allAccounts = getGeneralLedgerSelectableAccounts(accounts).map(acc => ({
        id: acc.id,
        code: acc.code ? String(acc.code) : '',
        name: acc.name ? String(acc.name) : '',
        searchText: `${acc.code || ''} ${acc.name || ''}`.toLowerCase()
      }));
    } catch (err) {
      // Error loading accounts
    }
  }

  // Filter and show dropdown
  function filterAccounts(query) {
    const dropdown = document.getElementById('glAccountDropdown');
    if (!dropdown) return;

    const q = (query || '').trim().toLowerCase();
    const filtered = q 
      ? allAccounts.filter(acc => acc.searchText.includes(q))
      : allAccounts;

    if (filtered.length === 0) {
      dropdown.innerHTML = `<div class="account-dropdown-empty">${tGL('noResults')}</div>`;
    } else {
      dropdown.innerHTML = filtered.slice(0, 50).map(acc => `
        <div class="account-dropdown-item" data-id="${acc.id}" data-code="${acc.code}" data-name="${acc.name}">
          <span class="code">${acc.code}</span>
          <span class="name">${acc.name}</span>
        </div>
      `).join('');
    }

    dropdown.classList.add('show');
  }

  // Select account
  function selectAccount(id, code, name) {
    const searchInput = document.getElementById('glAccountSearch');
    const hiddenInput = document.getElementById('glAccount');
    const dropdown = document.getElementById('glAccountDropdown');

    if (searchInput) searchInput.value = code ? `${code} - ${name}` : name;
    if (hiddenInput) hiddenInput.value = id;
    if (dropdown) dropdown.classList.remove('show');
    selectedAccountId = id;
  }

  // Setup account search
  function setupAccountSearch() {
    const searchInput = document.getElementById('glAccountSearch');
    const dropdown = document.getElementById('glAccountDropdown');

    if (!searchInput || !dropdown) return;

    // Focus - show all
    searchInput.addEventListener('focus', () => {
      filterAccounts(searchInput.value);
    });

    // Input - filter
    searchInput.addEventListener('input', () => {
      filterAccounts(searchInput.value);
      // Clear selection if typing
      document.getElementById('glAccount').value = '';
      selectedAccountId = null;
    });

    // Click on dropdown item
    dropdown.addEventListener('click', (e) => {
      const item = e.target.closest('.account-dropdown-item');
      if (item) {
        selectAccount(item.dataset.id, item.dataset.code, item.dataset.name);
      }
    });

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.account-search-wrapper')) {
        dropdown.classList.remove('show');
      }
    });

    // Keyboard navigation
    searchInput.addEventListener('keydown', (e) => {
      const items = dropdown.querySelectorAll('.account-dropdown-item');
      const current = dropdown.querySelector('.account-dropdown-item.selected');
      let idx = Array.from(items).indexOf(current);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (idx < items.length - 1) idx++;
        else idx = 0;
        items.forEach(i => i.classList.remove('selected'));
        if (items[idx]) {
          items[idx].classList.add('selected');
          items[idx].scrollIntoView({ block: 'nearest' });
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (idx > 0) idx--;
        else idx = items.length - 1;
        items.forEach(i => i.classList.remove('selected'));
        if (items[idx]) {
          items[idx].classList.add('selected');
          items[idx].scrollIntoView({ block: 'nearest' });
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = dropdown.querySelector('.account-dropdown-item.selected') || items[0];
        if (selected) {
          selectAccount(selected.dataset.id, selected.dataset.code, selected.dataset.name);
        }
      } else if (e.key === 'Escape') {
        dropdown.classList.remove('show');
      }
    });
  }

  // Update column headers with selected karat
  function updateKaratHeaders(goldKarat, silverKarat) {
    const table = document.getElementById('glTable');
    if (!table) return;
    
    const headerRow = table.querySelector('thead tr:first-child');
    if (headerRow) {
      const goldHeader = headerRow.querySelector('th:nth-child(6)');
      const silverHeader = headerRow.querySelector('th:nth-child(7)');
      if (goldHeader) goldHeader.textContent = `ذهب عيار ${goldKarat} (جرام)`;
      if (silverHeader) silverHeader.textContent = `فضة عيار ${silverKarat} (جرام)`;
    }
  }

  // Render data
  function renderData(rows, totals, account) {
    const body = document.getElementById('glTableBody');
    if (!body) return;

    if (!rows || rows.length === 0) {
      setEmptyState(tGL('emptyNoMovements'));
      return;
    }

    currentData = rows;
    currentTotals = totals;
    currentAccount = account;

    let html = '';
    for (const row of rows) {
      const cashBalanceClass = row.running_cash <= 0 ? 'positive' : 'negative';
      const goldBalanceClass = row.running_gold <= 0 ? 'positive' : 'negative';
      const silverBalanceClass = row.running_silver <= 0 ? 'positive' : 'negative';
      
      html += `
        <tr data-journal-id="${row.journal_id}">
          <td>${escapeHtml(row.date || '')}</td>
          <td>${escapeHtml(row.doc_type || '')}</td>
          <td>${getGeneralLedgerDocHtml(row)}</td>
          <td>${escapeHtml(row.memo || '')}</td>
          <td class="num">${formatCash(row.cash_debit || 0)}</td>
          <td class="num">${formatCash(row.cash_credit || 0)}</td>
          <td class="num ${cashBalanceClass}">${formatCash(row.running_cash)}</td>
          <td class="num">${formatWeight(row.gold_debit || 0)}</td>
          <td class="num">${formatWeight(row.gold_credit || 0)}</td>
          <td class="num ${goldBalanceClass}">${formatWeight(row.running_gold)}</td>
          <td class="num">${formatWeight(row.silver_debit || 0)}</td>
          <td class="num">${formatWeight(row.silver_credit || 0)}</td>
          <td class="num ${silverBalanceClass}">${formatWeight(row.running_silver)}</td>
        </tr>
      `;
    }
    body.innerHTML = html;

    // Update totals
    if (totals) {
      document.getElementById('totalCashDebit').textContent = formatCash(totals.cash_debit);
      document.getElementById('totalCashCredit').textContent = formatCash(totals.cash_credit);
      document.getElementById('totalCashBalance').textContent = formatCash(totals.final_cash);
      document.getElementById('totalGoldDebit').textContent = formatWeight(totals.gold_debit);
      document.getElementById('totalGoldCredit').textContent = formatWeight(totals.gold_credit);
      document.getElementById('totalGoldBalance').textContent = formatWeight(totals.final_gold);
      document.getElementById('totalSilverDebit').textContent = formatWeight(totals.silver_debit);
      document.getElementById('totalSilverCredit').textContent = formatWeight(totals.silver_credit);
      document.getElementById('totalSilverBalance').textContent = formatWeight(totals.final_silver);
    }

    toggleExportButtons(true);
  }

  // Fetch data
  async function fetchGeneralLedger() {
    try {
      if (window.ScreenPermissions && !window.ScreenPermissions.check('reports_view_general_ledger', 'عرض دفتر الأستاذ')) {
        return;
      }
    } catch (_) {}

    const accountId = document.getElementById('glAccount')?.value || selectedAccountId;
    if (!accountId) {
      showToast(tGL('selectAccountRequired'), 'warning');
      return;
    }

    const from = document.getElementById('glFrom')?.value || null;
    const to = document.getElementById('glTo')?.value || null;
    const includeOpening = document.getElementById('glIncludeOpening')?.value !== '0';
    const goldKarat = parseInt(document.getElementById('glGoldKarat')?.value, 10) || 21;
    const silverKarat = parseInt(document.getElementById('glSilverKarat')?.value, 10) || 999;

    setEmptyState(tGL('loading'));

    try {
      const result = await window.api.invoke('reports:get-general-ledger', {
        account_id: parseInt(accountId, 10),
        from,
        to,
        include_opening: includeOpening,
        gold_karat: goldKarat,
        silver_karat: silverKarat
      });

      if (result.success) {
        renderData(result.rows, result.totals, result.account);
        
        // Update title with account name
        const titleEl = document.querySelector('.table-head h3');
        if (titleEl && result.account) {
          titleEl.textContent = `حركات حساب: ${result.account.code || ''} - ${result.account.name || ''}`;
        }
        
        // Update column headers with selected karat
        updateKaratHeaders(goldKarat, silverKarat);
      } else {
        setEmptyState(result.error || tGL('errorLoading'));
        showToast(result.error || tGL('genericError'), 'error');
      }
    } catch (err) {
      setEmptyState(tGL('errorLoading'));
      showToast(err.message || tGL('genericError'), 'error');
    }
  }

  // Export to Excel
  function exportToExcel() {
    if (!currentData || currentData.length === 0) {
      showToast(tGL('noDataToExport'), 'warning');
      return;
    }

    const from = document.getElementById('glFrom')?.value || '';
    const to = document.getElementById('glTo')?.value || '';
    const dateRange = from || to ? ` (${from || '...'} - ${to || '...'})` : '';
    const accountName = currentAccount ? `${currentAccount.code || ''} - ${currentAccount.name || ''}` : '';

    const lang = getGLLang();
    const isRtl = lang === 'ar';
    const dir = isRtl ? 'rtl' : 'ltr';

    let html = `
      <html dir="${dir}">
      <head><meta charset="utf-8"><style>
        table { border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; }
        th, td { border: 1px solid #000; padding: 6px; text-align: center; }
        th { background: #4472C4; color: white; }
        .num { text-align: left; direction: ltr; }
        .totals { background: #D9E2F3; font-weight: bold; }
        h2, h3 { text-align: center; margin: 5px 0; }
      </style></head>
      <body>
      <h2>${tGL('pageTitle')}</h2>
      <h3>${accountName}${dateRange}</h3>
      <table>
        <thead>
          <tr>
            <th rowspan="2">${tGL('thDate')}</th>
            <th rowspan="2">${tGL('thDocType')}</th>
            <th rowspan="2">${tGL('thDocNo')}</th>
            <th rowspan="2">${tGL('thMemo')}</th>
            <th colspan="3">${tGL('thCashHeader')}</th>
            <th colspan="3">${tGL('thGoldHeader')}</th>
            <th colspan="3">${tGL('thSilverHeader')}</th>
          </tr>
          <tr>
            <th>${tGL('thDebit')}</th><th>${tGL('thCredit')}</th><th>${tGL('thBalance')}</th>
            <th>${tGL('thDebit')}</th><th>${tGL('thCredit')}</th><th>${tGL('thBalance')}</th>
            <th>${tGL('thDebit')}</th><th>${tGL('thCredit')}</th><th>${tGL('thBalance')}</th>
          </tr>
        </thead>
        <tbody>
    `;

    for (const row of currentData) {
      html += `
        <tr>
          <td>${escapeHtml(row.date || '')}</td>
          <td>${escapeHtml(row.doc_type || '')}</td>
          <td>${escapeHtml(getGeneralLedgerDocText(row))}</td>
          <td>${escapeHtml(row.memo || '')}</td>
          <td class="num">${formatCash(row.cash_debit || 0)}</td>
          <td class="num">${formatCash(row.cash_credit || 0)}</td>
          <td class="num">${formatCash(row.running_cash || 0)}</td>
          <td class="num">${formatWeight(row.gold_debit || 0)}</td>
          <td class="num">${formatWeight(row.gold_credit || 0)}</td>
          <td class="num">${formatWeight(row.running_gold || 0)}</td>
          <td class="num">${formatWeight(row.silver_debit || 0)}</td>
          <td class="num">${formatWeight(row.silver_credit || 0)}</td>
          <td class="num">${formatWeight(row.running_silver || 0)}</td>
        </tr>
      `;
    }

    if (currentTotals) {
      html += `
        <tr class="totals">
          <td colspan="4"><strong>${tGL('totalsLabel')}</strong></td>
          <td class="num">${formatCash(currentTotals.cash_debit || 0)}</td>
          <td class="num">${formatCash(currentTotals.cash_credit || 0)}</td>
          <td class="num">${formatCash(currentTotals.final_cash || 0)}</td>
          <td class="num">${formatWeight(currentTotals.gold_debit || 0)}</td>
          <td class="num">${formatWeight(currentTotals.gold_credit || 0)}</td>
          <td class="num">${formatWeight(currentTotals.final_gold || 0)}</td>
          <td class="num">${formatWeight(currentTotals.silver_debit || 0)}</td>
          <td class="num">${formatWeight(currentTotals.silver_credit || 0)}</td>
          <td class="num">${formatWeight(currentTotals.final_silver || 0)}</td>
        </tr>
      `;
    }

    html += '</tbody></table></body></html>';

    const blob = new Blob(['\ufeff' + html], { type: 'application/vnd.ms-excel;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `general_ledger_${currentAccount?.code || 'account'}_${new Date().toISOString().slice(0,10)}.xls`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(tGL('excelExportSuccess'), 'success');
  }

  // Print / Export PDF
  async function printReport() {
    if (!currentData || currentData.length === 0) {
      showToast(tGL('noDataToPrint'), 'warning');
      return;
    }

    const from = document.getElementById('glFrom')?.value || '';
    const to = document.getElementById('glTo')?.value || '';
    const dateRange = from || to ? `<p>الفترة: ${from || '...'} - ${to || '...'}</p>` : '';
    const accountName = currentAccount ? `${currentAccount.code || ''} - ${currentAccount.name || ''}` : '';

    const pLang = getGLLang();
    const pIsRtl = pLang === 'ar';
    const pDir = pIsRtl ? 'rtl' : 'ltr';

    let html = `
      <!DOCTYPE html>
      <html dir="${pDir}" lang="${pLang}">
      <head>
        <meta charset="utf-8">
        <title>${tGL('pageTitle')} - ${accountName}</title>
        <style>
          @page { size: A4 landscape; margin: 10mm; }
          body { font-family: 'Cairo', Arial, sans-serif; direction: ${pDir}; padding: 15px; font-size: 11px; }
          h1 { text-align: center; margin-bottom: 5px; font-size: 18px; }
          h2 { text-align: center; margin: 5px 0; font-size: 14px; color: #333; }
          .date-range { text-align: center; color: #666; margin-bottom: 15px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #333; padding: 4px 6px; }
          th { background: #4472C4; color: white; font-size: 10px; }
          .num { text-align: left; direction: ltr; }
          .totals { background: #D9E2F3; font-weight: bold; }
          .positive { color: #006600; }
          .negative { color: #cc0000; }
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
        <h1>${tGL('pageTitle')}</h1>
        <h2>${accountName}</h2>
        <div class="date-range">${dateRange}</div>
        <table>
          <thead>
            <tr>
              <th rowspan="2">${tGL('thDate')}</th>
              <th rowspan="2">${tGL('thDocType')}</th>
              <th rowspan="2">${tGL('thDocNo')}</th>
              <th rowspan="2">${tGL('thMemo')}</th>
              <th colspan="3">${tGL('thCashHeader')}</th>
              <th colspan="3">${tGL('thGoldHeader')}</th>
              <th colspan="3">${tGL('thSilverHeader')}</th>
            </tr>
            <tr>
              <th>${tGL('thDebit')}</th><th>${tGL('thCredit')}</th><th>${tGL('thBalance')}</th>
              <th>${tGL('thDebit')}</th><th>${tGL('thCredit')}</th><th>${tGL('thBalance')}</th>
              <th>${tGL('thDebit')}</th><th>${tGL('thCredit')}</th><th>${tGL('thBalance')}</th>
            </tr>
          </thead>
          <tbody>
    `;

    for (const row of currentData) {
      const cashBalanceClass = row.running_cash <= 0 ? 'positive' : 'negative';
      const goldBalanceClass = row.running_gold <= 0 ? 'positive' : 'negative';
      const silverBalanceClass = row.running_silver <= 0 ? 'positive' : 'negative';
      
      html += `
        <tr>
          <td>${escapeHtml(row.date || '')}</td>
          <td>${escapeHtml(row.doc_type || '')}</td>
          <td>${escapeHtml(getGeneralLedgerDocText(row))}</td>
          <td>${escapeHtml(row.memo || '')}</td>
          <td class="num">${formatCash(row.cash_debit || 0)}</td>
          <td class="num">${formatCash(row.cash_credit || 0)}</td>
          <td class="num ${cashBalanceClass}">${formatCash(row.running_cash || 0)}</td>
          <td class="num">${formatWeight(row.gold_debit || 0)}</td>
          <td class="num">${formatWeight(row.gold_credit || 0)}</td>
          <td class="num ${goldBalanceClass}">${formatWeight(row.running_gold || 0)}</td>
          <td class="num">${formatWeight(row.silver_debit || 0)}</td>
          <td class="num">${formatWeight(row.silver_credit || 0)}</td>
          <td class="num ${silverBalanceClass}">${formatWeight(row.running_silver || 0)}</td>
        </tr>
      `;
    }

    if (currentTotals) {
      html += `
        <tr class="totals">
          <td colspan="4"><strong>${tGL('totalsLabel')}</strong></td>
          <td class="num">${formatCash(currentTotals.cash_debit || 0)}</td>
          <td class="num">${formatCash(currentTotals.cash_credit || 0)}</td>
          <td class="num">${formatCash(currentTotals.final_cash || 0)}</td>
          <td class="num">${formatWeight(currentTotals.gold_debit || 0)}</td>
          <td class="num">${formatWeight(currentTotals.gold_credit || 0)}</td>
          <td class="num">${formatWeight(currentTotals.final_gold || 0)}</td>
          <td class="num">${formatWeight(currentTotals.silver_debit || 0)}</td>
          <td class="num">${formatWeight(currentTotals.silver_credit || 0)}</td>
          <td class="num">${formatWeight(currentTotals.final_silver || 0)}</td>
        </tr>
      `;
    }

    html += '</tbody></table></body></html>';

    try {
      if (window.api && window.api.invoke) {
        await window.api.invoke('print-preview', { html, title: `${tGL('pageTitle')} - ${accountName}` });
      } else {
        const win = window.open('', '_blank');
        win.document.write(html);
        win.document.close();
        win.print();
      }
    } catch (err) {
      showToast(tGL('printError'), 'error');
    }
  }

  // Apply static translations to UI elements
  function applyGeneralLedgerStaticTexts() {
    const lang = getGLLang();
    const isRtl = lang === 'ar';
    const dir = isRtl ? 'rtl' : 'ltr';

    try {
      document.documentElement.lang = lang;
      document.documentElement.dir = dir;
      document.body.dir = dir;
      document.title = tGL('pageTitle');
    } catch (_) {}

    // Top title
    const titleEl = document.querySelector('.gl-title h2');
    if (titleEl) titleEl.textContent = tGL('screenTitle');

    // Results card title
    const resultsTitle = document.querySelector('#glGrid .table-head h3');
    if (resultsTitle) resultsTitle.textContent = tGL('resultsTitle');

    // Top bar buttons
    const btnRefresh = document.getElementById('btnGlRefresh');
    if (btnRefresh) {
      btnRefresh.title = tGL('btnRefresh');
      const span = btnRefresh.querySelector('span');
      if (span) span.textContent = tGL('btnRefresh');
    }

    const btnExcel = document.getElementById('btnGlExportExcel');
    if (btnExcel) btnExcel.title = tGL('btnExportExcelTitle');

    const btnPdf = document.getElementById('btnGlExportPdf');
    if (btnPdf) btnPdf.title = tGL('btnExportPdfTitle');

    const btnPrint = document.getElementById('btnGlPrint');
    if (btnPrint) btnPrint.title = tGL('btnPrintTitle');

    // Filters labels
    const accountLabelSpan = document.querySelector('.account-search-field span');
    if (accountLabelSpan) accountLabelSpan.textContent = tGL('filterAccount');

    const fromLabelSpan = document.querySelector('#glFiltersCard label.form-field input#glFrom')?.previousElementSibling;
    if (fromLabelSpan) fromLabelSpan.textContent = tGL('filterFromDate');

    const toLabelSpan = document.querySelector('#glFiltersCard label.form-field input#glTo')?.previousElementSibling;
    if (toLabelSpan) toLabelSpan.textContent = tGL('filterToDate');

    const includeOpeningLabelSpan = document.querySelector('#glFiltersCard label.form-field select#glIncludeOpening')?.previousElementSibling;
    if (includeOpeningLabelSpan) includeOpeningLabelSpan.textContent = tGL('filterIncludeOpening');

    // Include opening select options
    const includeOpeningSelect = document.getElementById('glIncludeOpening');
    if (includeOpeningSelect) {
      Array.from(includeOpeningSelect.options).forEach((opt) => {
        if (opt.value === '1') opt.textContent = tGL('filterIncludeOpeningYes');
        else if (opt.value === '0') opt.textContent = tGL('filterIncludeOpeningNo');
      });
    }

    // View button
    const btnView = document.getElementById('btnGlView');
    if (btnView) {
      const span = btnView.querySelector('span');
      if (span) span.textContent = tGL('btnView');
    }

    // Account search input
    const accountSearchInput = document.getElementById('glAccountSearch');
    if (accountSearchInput) {
      accountSearchInput.placeholder = tGL('accountSearchPlaceholder');
    }

    // Grid search input
    const gridSearch = document.getElementById('glSearch');
    if (gridSearch) {
      gridSearch.placeholder = tGL('searchPlaceholder');
      gridSearch.setAttribute('aria-label', tGL('searchAriaLabel'));
    }

    // Table headers - Row 1 has 7 cells (4 with rowspan + 3 with colspan)
    // Row 2 has 9 cells (sub-headers for Cash, Gold, Silver)
    const glTable = document.getElementById('glTable');
    if (glTable && glTable.tHead && glTable.tHead.rows.length >= 2) {
      const row1 = glTable.tHead.rows[0];
      const row2 = glTable.tHead.rows[1];
      // Row 1: [0]=Date, [1]=DocType, [2]=DocNo, [3]=Memo, [4]=Cash(colspan), [5]=Gold(colspan), [6]=Silver(colspan)
      if (row1.cells.length >= 7) {
        row1.cells[0].textContent = tGL('thDate');
        row1.cells[1].textContent = tGL('thDocType');
        row1.cells[2].textContent = tGL('thDocNo');
        row1.cells[3].textContent = tGL('thMemo');
        row1.cells[4].textContent = tGL('thCashHeader');
        row1.cells[5].textContent = tGL('thGoldHeader');
        row1.cells[6].textContent = tGL('thSilverHeader');
      }
      // Row 2: 9 sub-headers (Debit/Credit/Balance x 3)
      if (row2.cells.length >= 9) {
        row2.cells[0].textContent = tGL('thDebit');
        row2.cells[1].textContent = tGL('thCredit');
        row2.cells[2].textContent = tGL('thBalance');
        row2.cells[3].textContent = tGL('thDebit');
        row2.cells[4].textContent = tGL('thCredit');
        row2.cells[5].textContent = tGL('thBalance');
        row2.cells[6].textContent = tGL('thDebit');
        row2.cells[7].textContent = tGL('thCredit');
        row2.cells[8].textContent = tGL('thBalance');
      }
    }

    // Totals row label
    const glFoot = document.getElementById('glTableFoot');
    if (glFoot && glFoot.rows.length) {
      const labelCell = glFoot.rows[0].cells[0];
      if (labelCell) labelCell.innerHTML = `<strong>${tGL('totalsLabel')}</strong>`;
    }
  }

  // Init
  document.addEventListener('DOMContentLoaded', async () => {
    // Apply translations
    applyGeneralLedgerStaticTexts();
    // Init permissions
    try {
      if (window.ScreenPermissions) {
        await window.ScreenPermissions.init();
      }
    } catch (_) {}

    // Load accounts and setup search
    await loadAccounts();
    setupAccountSearch();

    // Set default dates (current year) - استخدام التوقيت المحلي
    const now = new Date();
    const yearStart = `${now.getFullYear()}-01-01`;
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    
    const glFrom = document.getElementById('glFrom');
    const glTo = document.getElementById('glTo');
    if (glFrom) glFrom.value = yearStart;
    if (glTo) glTo.value = today;

    // Event listeners
    document.getElementById('btnGlView')?.addEventListener('click', fetchGeneralLedger);
    document.getElementById('btnGlRefresh')?.addEventListener('click', async () => {
      await loadAccounts();
      if (selectedAccountId) {
        fetchGeneralLedger();
      }
    });
    document.getElementById('glSearch')?.addEventListener('input', (e) => filterTable(e.target.value));
    document.getElementById('btnGlExportExcel')?.addEventListener('click', exportToExcel);
    document.getElementById('btnGlExportPdf')?.addEventListener('click', printReport);
    document.getElementById('btnGlPrint')?.addEventListener('click', printReport);

    // Initial state
    setEmptyState(tGL('emptyInitial'));
  });

  window.refreshForBranchScopeChange = async function() {
    const selectedId = Number(selectedAccountId || 0) || null;
    const hiddenInput = document.getElementById('glAccount');
    const searchInput = document.getElementById('glAccountSearch');
    await loadAccounts();
    if (selectedId && !allAccounts.some(acc => Number(acc.id) === selectedId)) {
      selectedAccountId = null;
      currentData = null;
      currentTotals = null;
      currentAccount = null;
      if (hiddenInput) hiddenInput.value = '';
      if (searchInput) searchInput.value = '';
      setEmptyState(tGL('emptyInitial'));
      toggleExportButtons(false);
      return true;
    }
    if (selectedId) {
      selectedAccountId = selectedId;
      if (hiddenInput) hiddenInput.value = String(selectedId);
      await fetchGeneralLedger();
    }
    return true;
  };
})();

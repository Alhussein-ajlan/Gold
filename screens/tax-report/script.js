// Tax Report Screen Logic
(async function() {
  'use strict';

  // ===== Load Translations =====
  let TR_TRANSLATIONS = { ar: {}, en: {} };
  let currentLang = 'ar';

  async function loadTranslations() {
    try {
      const arRes = await fetch('./locales/ar.json');
      const enRes = await fetch('./locales/en.json');
      TR_TRANSLATIONS.ar = await arRes.json();
      TR_TRANSLATIONS.en = await enRes.json();
    } catch (err) {
      // Silent error handling
    }
  }

  await loadTranslations();

  function getTRLang() {
    return localStorage.getItem('uiLang') || 'ar';
  }

  function tTR(key, params = {}) {
    const lang = currentLang;
    const keys = key.split('.');
    let val = TR_TRANSLATIONS[lang];
    for (const k of keys) {
      val = val?.[k];
      if (val === undefined) break;
    }
    if (typeof val !== 'string') {
      val = TR_TRANSLATIONS.ar;
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
    currentLang = getTRLang();
    const isRTL = currentLang === 'ar';
    document.documentElement.lang = currentLang;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = tTR(key);
      if (text && text !== key) el.textContent = text;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const text = tTR(key);
      if (text && text !== key) el.placeholder = text;
    });

    document.title = tTR('taxReport.title');
  }

  applyTranslations();

  window.addEventListener('storage', (e) => {
    if (e.key === 'uiLang') applyTranslations();
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
  const fromDateInput = document.getElementById('tax_from_date');
  const toDateInput = document.getElementById('tax_to_date');
  const reportTypeSelect = document.getElementById('tax_report_type');
  const invoiceTypeSelect = document.getElementById('tax_invoice_type');
  const metalTypeFilter = document.getElementById('metal_type_filter');
  const metalTypeSelect = document.getElementById('tax_metal_type');
  const paymentTypeSelect = document.getElementById('tax_payment_type');
  const taxFilterSelect = document.getElementById('tax_filter');
  const viewBtn = document.getElementById('tax_view_btn');
  const printBtn = document.getElementById('tax_print_btn');
  const excelBtn = document.getElementById('tax_excel_btn');
  const refreshBtn = document.getElementById('tax_refresh_btn');

  const summarySection = document.getElementById('tax_summary_section');
  const salesTableSection = document.getElementById('sales_table_section');
  const purchasesTableSection = document.getElementById('purchases_table_section');

  const salesBeforeTax = document.getElementById('sales_before_tax');
  const salesTax = document.getElementById('sales_tax');
  const salesAfterTax = document.getElementById('sales_after_tax');
  const purchasesBeforeTax = document.getElementById('purchases_before_tax');
  const purchasesTax = document.getElementById('purchases_tax');
  const purchasesAfterTax = document.getElementById('purchases_after_tax');
  const netTaxAmount = document.getElementById('net_tax_amount');
  const netTaxStatus = document.getElementById('net_tax_status');

  const salesTableBody = document.getElementById('sales_table_body');
  const purchasesTableBody = document.getElementById('purchases_table_body');

  // Data cache
  let currentSalesData = [];
  let currentPurchasesData = [];

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

  function shouldShowInvoiceBranchDetails() {
    return getStoredBranchScopeMode() === 'all';
  }

  function getInvoiceDisplayNumber(inv) {
    return String(inv?.branch_local_number || inv?.invoice_id || '').trim() || '-';
  }

  function getInvoiceBranchText(inv) {
    const branchCode = String(inv?.branch_code || '').trim();
    const branchName = String(inv?.branch_name || '').trim();
    if (branchCode && branchName) return `${branchCode} - ${branchName}`;
    return branchName || branchCode || '';
  }

  function getInvoiceDisplayText(inv) {
    const invoiceNumber = getInvoiceDisplayNumber(inv);
    const branchText = getInvoiceBranchText(inv);
    if (!shouldShowInvoiceBranchDetails() || !branchText) return invoiceNumber;
    return `${invoiceNumber} • ${branchText}`;
  }

  function getInvoiceCellHtml(inv, type) {
    const invoiceNumber = escapeHtml(getInvoiceDisplayNumber(inv));
    const branchText = getInvoiceBranchText(inv);
    const invoiceId = escapeHtml(String(inv?.invoice_id || ''));
    const docType = escapeHtml(String(type || ''));
    const linkHtml = `<a href="#" class="invoice-link" data-invoice-id="${invoiceId}" data-type="${docType}">${invoiceNumber}</a>`;
    if (!shouldShowInvoiceBranchDetails() || !branchText) return linkHtml;
    const safeBranchText = escapeHtml(branchText);
    return `<span class="invoice-cell">${linkHtml}<span class="invoice-branch-badge" title="${safeBranchText}">${safeBranchText}</span></span>`;
  }

  // ===== Helper: Calculate Tax Totals =====
  function calculateTaxTotals(salesData, purchasesData) {
    let salesTaxableBeforeTotal = 0;
    let salesTaxTotal = 0;
    let salesZeroRatedTotal = 0;

    salesData.forEach(inv => {
      const before = Number(inv.before_tax) || 0;
      const tax = Number(inv.tax_value) || 0;
      const invoiceType = String(inv.invoice_type || '').toLowerCase();
      
      if (invoiceType === 'taskir') {
        salesZeroRatedTotal += before;
      } else if (invoiceType === 'mashghul' || invoiceType === 'worked') {
        salesTaxableBeforeTotal += before;
        salesTaxTotal += tax;
      } else {
        if (tax > 0) {
          salesTaxableBeforeTotal += before;
          salesTaxTotal += tax;
        } else {
          salesZeroRatedTotal += before;
        }
      }
    });

    let purchasesTaxableBeforeTotal = 0;
    let purchasesTaxTotal = 0;
    let purchasesZeroRatedTotal = 0;

    purchasesData.forEach(inv => {
      const before = Number(inv.before_tax) || 0;
      const tax = Number(inv.tax_value) || 0;
      const invoiceType = String(inv.invoice_type || '').toLowerCase();
      
      if (invoiceType === 'taskir') {
        purchasesZeroRatedTotal += before;
      } else if (invoiceType === 'mashghul' || invoiceType === 'worked') {
        purchasesTaxableBeforeTotal += before;
        purchasesTaxTotal += tax;
      } else {
        if (tax > 0) {
          purchasesTaxableBeforeTotal += before;
          purchasesTaxTotal += tax;
        } else {
          purchasesZeroRatedTotal += before;
        }
      }
    });

    return {
      salesTaxableBeforeTotal,
      salesTaxTotal,
      salesZeroRatedTotal,
      purchasesTaxableBeforeTotal,
      purchasesTaxTotal,
      purchasesZeroRatedTotal,
      netTax: salesTaxTotal - purchasesTaxTotal
    };
  }

  // ===== Fetch Tax Report Data =====
  async function fetchTaxReport() {
    // Permission check
    if (window.ScreenPermissions && !window.ScreenPermissions.check('reports_view_tax_report', 'عرض تقرير الضرائب')) {
      return;
    }

    const fromDate = fromDateInput?.value || null;
    const toDate = toDateInput?.value || null;
    const invoiceType = invoiceTypeSelect?.value || 'all';
    const metalType = metalTypeSelect?.value || 'all';
    const paymentType = paymentTypeSelect?.value || 'all';
    const taxFilter = taxFilterSelect?.value || 'all';

    if (!fromDate || !toDate) {
      await window.showAlert(tTR('taxReport.messages.selectDates'), 'تنبيه', 'warning');
      return;
    }

    try {
      const params = { fromDate, toDate, invoiceType, metalType, paymentType, taxFilter };
      const result = await window.api.invoke('tax-report-get-data', params);

      if (!result.success) {
        await window.showAlert(tTR('taxReport.messages.error'), 'خطأ', 'error');
        return;
      }

      currentSalesData = result.sales || [];
      currentPurchasesData = result.purchases || [];

      renderTaxReport();
    } catch (err) {
      await window.showAlert(tTR('taxReport.messages.error'), 'خطأ', 'error');
    }
  }

  // ===== Render Tax Report =====
  function renderTaxReport() {
    const reportType = reportTypeSelect?.value || 'all';
    
    // Calculate totals using helper function
    const totals = calculateTaxTotals(currentSalesData, currentPurchasesData);
    const { salesTaxableBeforeTotal, salesTaxTotal, salesZeroRatedTotal,
            purchasesTaxableBeforeTotal, purchasesTaxTotal, purchasesZeroRatedTotal, netTax } = totals;

    // Update summary cards based on report type
    if (reportType === 'sales') {
      // Show only sales summary
      if (salesBeforeTax) salesBeforeTax.textContent = fmt2.format(salesTaxableBeforeTotal);
      if (salesTax) salesTax.textContent = fmt2.format(salesTaxTotal);
      const salesAfterTaxTotal = document.getElementById('sales_after_tax_total');
      if (salesAfterTaxTotal) salesAfterTaxTotal.textContent = fmt2.format(salesTaxableBeforeTotal + salesTaxTotal);
      if (salesAfterTax) salesAfterTax.textContent = fmt2.format(salesZeroRatedTotal);
      if (purchasesBeforeTax) purchasesBeforeTax.textContent = '-';
      if (purchasesTax) purchasesTax.textContent = '-';
      const purchasesAfterTaxTotal = document.getElementById('purchases_after_tax_total');
      if (purchasesAfterTaxTotal) purchasesAfterTaxTotal.textContent = '-';
      if (purchasesAfterTax) purchasesAfterTax.textContent = '-';
      
      // Net tax is just sales tax
      if (netTaxAmount) {
        netTaxAmount.textContent = fmt2.format(salesTaxTotal);
        const netTaxCard = netTaxAmount.closest('.summary-card');
        if (netTaxCard) {
          netTaxCard.classList.remove('payable', 'refundable');
          netTaxCard.classList.add('payable');
        }
      }
      if (netTaxStatus) {
        netTaxStatus.textContent = tTR('taxReport.summary.payable');
      }
    } else if (reportType === 'purchases') {
      // Show only purchases summary
      if (salesBeforeTax) salesBeforeTax.textContent = '-';
      if (salesTax) salesTax.textContent = '-';
      const salesAfterTaxTotal = document.getElementById('sales_after_tax_total');
      if (salesAfterTaxTotal) salesAfterTaxTotal.textContent = '-';
      if (salesAfterTax) salesAfterTax.textContent = '-';
      if (purchasesBeforeTax) purchasesBeforeTax.textContent = fmt2.format(purchasesTaxableBeforeTotal);
      if (purchasesTax) purchasesTax.textContent = fmt2.format(purchasesTaxTotal);
      const purchasesAfterTaxTotal = document.getElementById('purchases_after_tax_total');
      if (purchasesAfterTaxTotal) purchasesAfterTaxTotal.textContent = fmt2.format(purchasesTaxableBeforeTotal + purchasesTaxTotal);
      if (purchasesAfterTax) purchasesAfterTax.textContent = fmt2.format(purchasesZeroRatedTotal);
      
      // Net tax is negative purchases tax (refundable)
      if (netTaxAmount) {
        netTaxAmount.textContent = fmt2.format(purchasesTaxTotal);
        const netTaxCard = netTaxAmount.closest('.summary-card');
        if (netTaxCard) {
          netTaxCard.classList.remove('payable', 'refundable');
          netTaxCard.classList.add('refundable');
        }
      }
      if (netTaxStatus) {
        netTaxStatus.textContent = tTR('taxReport.summary.refundable');
      }
    } else {
      // Show all (default)
      if (salesBeforeTax) salesBeforeTax.textContent = fmt2.format(salesTaxableBeforeTotal);
      if (salesTax) salesTax.textContent = fmt2.format(salesTaxTotal);
      const salesAfterTaxTotal = document.getElementById('sales_after_tax_total');
      if (salesAfterTaxTotal) salesAfterTaxTotal.textContent = fmt2.format(salesTaxableBeforeTotal + salesTaxTotal);
      if (salesAfterTax) salesAfterTax.textContent = fmt2.format(salesZeroRatedTotal);
      if (purchasesBeforeTax) purchasesBeforeTax.textContent = fmt2.format(purchasesTaxableBeforeTotal);
      if (purchasesTax) purchasesTax.textContent = fmt2.format(purchasesTaxTotal);
      const purchasesAfterTaxTotal = document.getElementById('purchases_after_tax_total');
      if (purchasesAfterTaxTotal) purchasesAfterTaxTotal.textContent = fmt2.format(purchasesTaxableBeforeTotal + purchasesTaxTotal);
      if (purchasesAfterTax) purchasesAfterTax.textContent = fmt2.format(purchasesZeroRatedTotal);

      // Update net tax
      if (netTaxAmount) {
        netTaxAmount.textContent = fmt2.format(Math.abs(netTax));
        const netTaxCard = netTaxAmount.closest('.summary-card');
        if (netTaxCard) {
          netTaxCard.classList.remove('payable', 'refundable');
          netTaxCard.classList.add(netTax >= 0 ? 'payable' : 'refundable');
        }
      }

      if (netTaxStatus) {
        netTaxStatus.textContent = netTax >= 0 ? tTR('taxReport.summary.payable') : tTR('taxReport.summary.refundable');
      }
    }

    // Render tables based on report type
    if (reportType === 'sales' || reportType === 'all') {
      renderSalesTable();
      if (salesTableSection) salesTableSection.style.display = '';
    } else {
      if (salesTableSection) salesTableSection.style.display = 'none';
    }

    if (reportType === 'purchases' || reportType === 'all') {
      renderPurchasesTable();
      if (purchasesTableSection) purchasesTableSection.style.display = '';
    } else {
      if (purchasesTableSection) purchasesTableSection.style.display = 'none';
    }

    // Show sections
    if (summarySection) summarySection.style.display = '';
    
    // Show action buttons in header
    if (printBtn) printBtn.style.display = '';
    if (excelBtn) excelBtn.style.display = '';
    if (refreshBtn) refreshBtn.style.display = '';
  }

  // ===== Render Sales Table =====
  function renderSalesTable() {
    if (!salesTableBody) return;
    salesTableBody.innerHTML = '';

    if (currentSalesData.length === 0) {
      const tr = document.createElement('tr');
      tr.className = 'empty-state';
      tr.innerHTML = `<td colspan="12" class="no-data">${tTR('taxReport.salesTable.noData')}</td>`;
      salesTableBody.appendChild(tr);
      return;
    }

    currentSalesData.forEach((inv) => {
      const tr = document.createElement('tr');
      const invoiceTypeText = inv.invoice_type === 'taskir' ? tTR('taxReport.invoiceTypes.taskir') : tTR('taxReport.invoiceTypes.worked');
      const paymentTypeText = inv.payment_type === 'cash' ? tTR('taxReport.paymentTypes.cash') : tTR('taxReport.paymentTypes.credit');
      const weight = inv.total_weight ? fmt2.format(inv.total_weight) : '-';
      const karats = inv.karats || '-';
      
      tr.innerHTML = `
        <td>${getInvoiceCellHtml(inv, 'sales')}</td>
        <td>${inv.date || ''}</td>
        <td>${inv.customer_name || ''}</td>
        <td>${inv.tax_no || '-'}</td>
        <td class="number">${weight}</td>
        <td>${karats}</td>
        <td class="number">${fmt2.format(inv.before_tax || 0)}</td>
        <td class="number">${fmt2.format(inv.tax_rate || 0)}%</td>
        <td class="tax-value number">${fmt2.format(inv.tax_value || 0)}</td>
        <td class="total-value number">${fmt2.format((Number(inv.before_tax) || 0) + (Number(inv.tax_value) || 0))}</td>
        <td>${invoiceTypeText}</td>
        <td>${paymentTypeText}</td>
      `;
      salesTableBody.appendChild(tr);
    });

    // Add click handlers for invoice links
    salesTableBody.querySelectorAll('.invoice-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const invoiceId = link.getAttribute('data-invoice-id');
        const type = link.getAttribute('data-type');
        openInvoiceWindow(invoiceId, type);
      });
    });
  }

  // ===== Render Purchases Table =====
  function renderPurchasesTable() {
    if (!purchasesTableBody) return;
    purchasesTableBody.innerHTML = '';

    if (currentPurchasesData.length === 0) {
      const tr = document.createElement('tr');
      tr.className = 'empty-state';
      tr.innerHTML = `<td colspan="12" class="no-data">${tTR('taxReport.purchasesTable.noData')}</td>`;
      purchasesTableBody.appendChild(tr);
      return;
    }

    currentPurchasesData.forEach((inv) => {
      const tr = document.createElement('tr');
      const invoiceTypeText = inv.invoice_type === 'taskir' ? tTR('taxReport.invoiceTypes.taskir') : tTR('taxReport.invoiceTypes.worked');
      const paymentTypeText = inv.payment_type === 'cash' ? tTR('taxReport.paymentTypes.cash') : tTR('taxReport.paymentTypes.credit');
      const weight = inv.total_weight ? fmt2.format(inv.total_weight) : '-';
      const karats = inv.karats || '-';
      
      tr.innerHTML = `
        <td>${getInvoiceCellHtml(inv, 'purchase')}</td>
        <td>${inv.date || ''}</td>
        <td>${inv.supplier_name || ''}</td>
        <td>${inv.tax_no || '-'}</td>
        <td class="number">${weight}</td>
        <td>${karats}</td>
        <td class="number">${fmt2.format(inv.before_tax || 0)}</td>
        <td class="number">${fmt2.format(inv.tax_rate || 0)}%</td>
        <td class="tax-value number">${fmt2.format(inv.tax_value || 0)}</td>
        <td class="total-value number">${fmt2.format((Number(inv.before_tax) || 0) + (Number(inv.tax_value) || 0))}</td>
        <td>${invoiceTypeText}</td>
        <td>${paymentTypeText}</td>
      `;
      purchasesTableBody.appendChild(tr);
    });

    // Add click handlers for invoice links
    purchasesTableBody.querySelectorAll('.invoice-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const invoiceId = link.getAttribute('data-invoice-id');
        const type = link.getAttribute('data-type');
        openInvoiceWindow(invoiceId, type);
      });
    });
  }

  // ===== Print Report =====
  function printReport() {
    const reportType = reportTypeSelect?.value || 'all';
    const fromDate = fromDateInput?.value || '';
    const toDate = toDateInput?.value || '';

    // Calculate totals using helper function
    const totals = calculateTaxTotals(currentSalesData, currentPurchasesData);
    const { salesTaxableBeforeTotal, salesTaxTotal, salesZeroRatedTotal,
            purchasesTaxableBeforeTotal, purchasesTaxTotal, purchasesZeroRatedTotal, netTax } = totals;

    // Get report type text
    let reportTypeText = 'الكل';
    if (reportType === 'sales') reportTypeText = 'المبيعات فقط';
    else if (reportType === 'purchases') reportTypeText = 'المشتريات فقط';

    // Prepare data with detailed breakdown
    const printData = {
      type: 'PRINT_TAX_REPORT',
      data: {
        fromDate: fromDate,
        toDate: toDate,
        reportType: reportTypeText,
        // Detailed sales breakdown
        salesBeforeTax: salesTaxableBeforeTotal,
        salesTax: salesTaxTotal,
        salesAfterTax: salesTaxableBeforeTotal + salesTaxTotal,
        salesZeroRated: salesZeroRatedTotal,
        // Detailed purchases breakdown
        purchasesBeforeTax: purchasesTaxableBeforeTotal,
        purchasesTax: purchasesTaxTotal,
        purchasesAfterTax: purchasesTaxableBeforeTotal + purchasesTaxTotal,
        purchasesZeroRated: purchasesZeroRatedTotal,
        // Net tax
        netTax: netTax,
        // Invoice details
        sales: reportType === 'purchases' ? [] : currentSalesData,
        purchases: reportType === 'sales' ? [] : currentPurchasesData
      }
    };

    // Open print window
    const printWindow = window.open('./print.html', '_blank', 'width=1200,height=800');
    
    if (printWindow) {
      printWindow.addEventListener('load', () => {
        printWindow.postMessage(printData, '*');
      });
    }
  }

  // ===== Export to Excel =====
  async function exportToExcel() {
    if (currentSalesData.length === 0 && currentPurchasesData.length === 0) {
      await window.showAlert(tTR('taxReport.messages.noData'), 'تنبيه', 'warning');
      return;
    }

    const reportType = reportTypeSelect?.value || 'all';
    const fromDate = fromDateInput?.value || '';
    const toDate = toDateInput?.value || '';
    
    // Convert dates to English numbers
    const fromDateEn = fromDate.replace(/[\u0660-\u0669]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1584));
    const toDateEn = toDate.replace(/[\u0660-\u0669]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1584));
    const dateRange = fromDateEn || toDateEn ? ` (${fromDateEn || '...'} - ${toDateEn || '...'})` : '';

    const lang = getTRLang();
    const isRtl = lang === 'ar';
    const dir = isRtl ? 'rtl' : 'ltr';

    // Calculate totals using helper function
    const totals = calculateTaxTotals(currentSalesData, currentPurchasesData);
    const { salesTaxableBeforeTotal, salesTaxTotal, salesZeroRatedTotal,
            purchasesTaxableBeforeTotal, purchasesTaxTotal, purchasesZeroRatedTotal, netTax } = totals;

    let html = `
      <html dir="${dir}">
      <head><meta charset="utf-8"><style>
        table { border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; margin-bottom: 20px; }
        th, td { border: 1px solid #000; padding: 8px; text-align: center; }
        th { background: #4472C4; color: white; font-weight: bold; }
        .num { text-align: left; direction: ltr; mso-number-format: "0\\.00"; }
        .text { mso-number-format: "\\@"; }
        .summary { background: #D9E2F3; font-weight: bold; }
        .sales-header { background: #10b981; color: white; }
        .purchases-header { background: #0ea5e9; color: white; }
        h2 { text-align: center; margin: 20px 0; }
        h3 { text-align: center; margin: 15px 0; color: #2c3e50; }
      </style></head>
      <body>
      <h2>${tTR('taxReport.title')}${dateRange}</h2>
    `;

    // Summary section
    html += `
      <h3>${tTR('taxReport.summary.title')}</h3>
      <table>
        <thead>
          <tr>
            <th colspan="3">${tTR('taxReport.summary.sales')}</th>
            <th colspan="3">${tTR('taxReport.summary.purchases')}</th>
            <th rowspan="2">${tTR('taxReport.summary.netTax')}</th>
          </tr>
          <tr>
            <th>${tTR('taxReport.summary.taxableBeforeTax')}</th>
            <th>${tTR('taxReport.summary.taxAmount')}</th>
            <th>${tTR('taxReport.summary.zeroRated')}</th>
            <th>${tTR('taxReport.summary.taxableBeforeTax')}</th>
            <th>${tTR('taxReport.summary.taxAmount')}</th>
            <th>${tTR('taxReport.summary.zeroRated')}</th>
          </tr>
        </thead>
        <tbody>
          <tr class="summary">
            <td class="num">${fmt2.format(salesTaxableBeforeTotal)}</td>
            <td class="num">${fmt2.format(salesTaxTotal)}</td>
            <td class="num">${fmt2.format(salesZeroRatedTotal)}</td>
            <td class="num">${fmt2.format(purchasesTaxableBeforeTotal)}</td>
            <td class="num">${fmt2.format(purchasesTaxTotal)}</td>
            <td class="num">${fmt2.format(purchasesZeroRatedTotal)}</td>
            <td class="num">${fmt2.format(Math.abs(netTax))} (${netTax >= 0 ? tTR('taxReport.summary.payable') : tTR('taxReport.summary.refundable')})</td>
          </tr>
        </tbody>
      </table>
    `;

    // Sales table
    if (reportType === 'sales' || reportType === 'all') {
      if (currentSalesData.length > 0) {
        html += `
          <h3>${tTR('taxReport.salesTable.title')}</h3>
          <table>
            <thead class="sales-header">
              <tr>
                <th>${tTR('taxReport.salesTable.invoiceNo')}</th>
                <th>${tTR('taxReport.salesTable.date')}</th>
                <th>${tTR('taxReport.salesTable.customer')}</th>
                <th>${tTR('taxReport.salesTable.taxNo')}</th>
                <th>${tTR('taxReport.salesTable.weight')}</th>
                <th>${tTR('taxReport.salesTable.karat')}</th>
                <th>${tTR('taxReport.salesTable.beforeTax')}</th>
                <th>${tTR('taxReport.salesTable.taxRate')}</th>
                <th>${tTR('taxReport.salesTable.taxValue')}</th>
                <th>${tTR('taxReport.salesTable.total')}</th>
                <th>${tTR('taxReport.salesTable.type')}</th>
                <th>${tTR('taxReport.salesTable.payment')}</th>
              </tr>
            </thead>
            <tbody>
        `;

        currentSalesData.forEach((inv) => {
          const invoiceTypeText = inv.invoice_type === 'taskir' ? tTR('taxReport.invoiceTypes.taskir') : tTR('taxReport.invoiceTypes.worked');
          const paymentTypeText = inv.payment_type === 'cash' ? tTR('taxReport.paymentTypes.cash') : tTR('taxReport.paymentTypes.credit');
          const weight = inv.total_weight ? fmt2.format(inv.total_weight) : '-';
          const karats = inv.karats || '-';
          
          html += `
            <tr>
              <td class="text">${escapeHtml(getInvoiceDisplayText(inv))}</td>
              <td class="text">${inv.date || ''}</td>
              <td class="text">${inv.customer_name || ''}</td>
              <td class="text">${inv.tax_no || '-'}</td>
              <td class="num">${weight}</td>
              <td class="text">${karats}</td>
              <td class="num">${fmt2.format(inv.before_tax || 0)}</td>
              <td class="num">${fmt2.format(inv.tax_rate || 0)}%</td>
              <td class="num">${fmt2.format(inv.tax_value || 0)}</td>
              <td class="num">${fmt2.format((Number(inv.before_tax) || 0) + (Number(inv.tax_value) || 0))}</td>
              <td class="text">${invoiceTypeText}</td>
              <td class="text">${paymentTypeText}</td>
            </tr>
          `;
        });

        html += '</tbody></table>';
      }
    }

    // Purchases table
    if (reportType === 'purchases' || reportType === 'all') {
      if (currentPurchasesData.length > 0) {
        html += `
          <h3>${tTR('taxReport.purchasesTable.title')}</h3>
          <table>
            <thead class="purchases-header">
              <tr>
                <th>${tTR('taxReport.purchasesTable.invoiceNo')}</th>
                <th>${tTR('taxReport.purchasesTable.date')}</th>
                <th>${tTR('taxReport.purchasesTable.supplier')}</th>
                <th>${tTR('taxReport.purchasesTable.taxNo')}</th>
                <th>${tTR('taxReport.purchasesTable.weight')}</th>
                <th>${tTR('taxReport.purchasesTable.karat')}</th>
                <th>${tTR('taxReport.purchasesTable.beforeTax')}</th>
                <th>${tTR('taxReport.purchasesTable.taxRate')}</th>
                <th>${tTR('taxReport.purchasesTable.taxValue')}</th>
                <th>${tTR('taxReport.purchasesTable.total')}</th>
                <th>${tTR('taxReport.purchasesTable.type')}</th>
                <th>${tTR('taxReport.purchasesTable.payment')}</th>
              </tr>
            </thead>
            <tbody>
        `;

        currentPurchasesData.forEach((inv) => {
          const invoiceTypeText = inv.invoice_type === 'taskir' ? tTR('taxReport.invoiceTypes.taskir') : tTR('taxReport.invoiceTypes.worked');
          const paymentTypeText = inv.payment_type === 'cash' ? tTR('taxReport.paymentTypes.cash') : tTR('taxReport.paymentTypes.credit');
          const weight = inv.total_weight ? fmt2.format(inv.total_weight) : '-';
          const karats = inv.karats || '-';
          
          html += `
            <tr>
              <td class="text">${escapeHtml(getInvoiceDisplayText(inv))}</td>
              <td class="text">${inv.date || ''}</td>
              <td class="text">${inv.supplier_name || ''}</td>
              <td class="text">${inv.tax_no || '-'}</td>
              <td class="num">${weight}</td>
              <td class="text">${karats}</td>
              <td class="num">${fmt2.format(inv.before_tax || 0)}</td>
              <td class="num">${fmt2.format(inv.tax_rate || 0)}%</td>
              <td class="num">${fmt2.format(inv.tax_value || 0)}</td>
              <td class="num">${fmt2.format((Number(inv.before_tax) || 0) + (Number(inv.tax_value) || 0))}</td>
              <td class="text">${invoiceTypeText}</td>
              <td class="text">${paymentTypeText}</td>
            </tr>
          `;
        });

        html += '</tbody></table>';
      }
    }

    html += '</body></html>';

    const blob = new Blob(['\ufeff' + html], { type: 'application/vnd.ms-excel;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const reportTypeText = reportType === 'sales' ? 'sales' : reportType === 'purchases' ? 'purchases' : 'all';
    a.download = `tax_report_${reportTypeText}_${new Date().toISOString().slice(0,10)}.xls`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ===== Open Invoice Window =====
  async function openInvoiceWindow(invoiceId, type) {
    if (!invoiceId) return;
    
    try {
      // Convert type to the format expected by IPC handler
      const invoiceType = type === 'sales' ? 'SELL' : 'BUY';
      
      const result = await window.api.invoke('open-invoice-window', {
        invoiceId: invoiceId,
        type: invoiceType
      });
      
      if (!result.success) {
        await window.showAlert(tTR('taxReport.messages.error'), 'خطأ', 'error');
      }
    } catch (err) {
      await window.showAlert(tTR('taxReport.messages.error'), 'خطأ', 'error');
    }
  }

  // Event listeners
  viewBtn?.addEventListener('click', fetchTaxReport);
  refreshBtn?.addEventListener('click', fetchTaxReport);
  printBtn?.addEventListener('click', printReport);
  excelBtn?.addEventListener('click', exportToExcel);

  // Show/hide metal type filter based on invoice type
  invoiceTypeSelect?.addEventListener('change', () => {
    const invoiceType = invoiceTypeSelect.value;
    if (metalTypeFilter) {
      metalTypeFilter.style.display = invoiceType === 'taskir' ? '' : 'none';
    }
    // Reset metal type when hiding
    if (invoiceType !== 'taskir' && metalTypeSelect) {
      metalTypeSelect.value = 'all';
    }
  });

  // Set default dates (current month) - using local date format to avoid timezone issues
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const formatLocalDate = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  if (fromDateInput) fromDateInput.value = formatLocalDate(firstDay);
  if (toDateInput) toDateInput.value = formatLocalDate(today);

  window.refreshForBranchScopeChange = async function() {
    const hasRenderedReport = (summarySection && summarySection.style.display !== 'none')
      || currentSalesData.length > 0
      || currentPurchasesData.length > 0;
    if (hasRenderedReport) {
      await fetchTaxReport();
    }
    return true;
  };

})();

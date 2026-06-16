// ===== Balance Sheet Screen =====
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

  const BS_TRANSLATIONS = {
    ar: {
      pageTitle: 'الميزانية العمومية',
      screenTitle: 'الميزانية العمومية',
      btnRefresh: 'تحديث',
      btnExportExcelTitle: 'تصدير Excel',
      btnExportPdfTitle: 'تصدير PDF',
      btnPrintTitle: 'طباعة',
      primaryDateTitle: 'التاريخ الأساسي',
      compareDateTitle: 'تاريخ المقارنة (اختياري)',
      labelAsOfDate: 'حتى تاريخ',
      labelCompareDate: 'حتى تاريخ',
      btnView: 'عرض',
      assetsTitle: 'الأصول',
      liabilitiesTitle: 'الخصوم وحقوق الملكية',
      liabilitiesOnly: 'الخصوم',
      equityTitle: 'حقوق الملكية',
      netProfit: 'صافي الربح (الخسارة)',
      retainedEarnings: 'الأرباح المحتجزة',
      totalAssets: 'إجمالي الأصول',
      totalLiabilities: 'إجمالي الخصوم',
      totalEquity: 'إجمالي حقوق الملكية',
      totalLiabEquity: 'إجمالي الخصوم + حقوق الملكية',
      labelTotalAssets: 'إجمالي الأصول:',
      labelTotalLiabEquity: 'إجمالي الخصوم + حقوق الملكية:',
      balanced: 'متوازنة',
      unbalanced: 'غير متوازنة',
      noData: 'لا توجد بيانات',
      loading: 'جاري تحميل البيانات...',
      errorLoading: 'حدث خطأ أثناء جلب البيانات',
      genericError: 'حدث خطأ',
      initialHint: 'اختر التاريخ ثم اضغط "عرض" لعرض الميزانية العمومية',
      noDataToExport: 'لا توجد بيانات للتصدير',
      excelExportSuccess: 'تم تصدير الملف بنجاح',
      noDataToPrint: 'لا توجد بيانات للطباعة',
      printError: 'حدث خطأ أثناء الطباعة',
      validationDateRequired: 'الرجاء إدخال التاريخ الأساسي',
      currentAssets: 'الأصول المتداولة',
      fixedAssets: 'الأصول الثابتة',
      currentLiabilities: 'الخصوم المتداولة',
      longTermLiabilities: 'الخصوم طويلة الأجل',
      capital: 'رأس المال',
      reserves: 'الاحتياطيات',
      filtersTitle: 'خيارات العرض',
      labelOpening: 'الافتتاحية',
      labelEmptyAccounts: 'الحسابات الفارغة',
      labelDetailLevel: 'مستوى التفصيل',
      optOpeningYes: 'نعم',
      optOpeningNo: 'لا',
      optEmptyHide: 'إخفاء',
      optEmptyShow: 'عرض',
      optDetailDetailed: 'تفصيلي',
      optDetailSummary: 'ملخص',
      optDetailGroups: 'المجموعات فقط',
      colCode: 'الرمز',
      colName: 'اسم الحساب',
      colBalance: 'الرصيد',
      cardAssetsLabel: 'إجمالي الأصول',
      cardLiabilitiesLabel: 'إجمالي الخصوم',
      cardEquityLabel: 'حقوق الملكية',
      cardProfitLabel: 'صافي الربح',
      balanceCardTitle: 'حالة التوازن',
      balanceAssetsLabel: 'الأصول',
      balanceLiabEquityLabel: 'الخصوم + حقوق الملكية',
      balanceDiffLabel: 'الفرق:',
      balancedTitle: 'الميزانية متزنة',
      unbalancedTitle: 'الميزانية غير متزنة',
      balancedDesc: 'إجمالي الأصول يساوي مجموع الخصوم وحقوق الملكية بشكل دقيق.',
      unbalancedDesc: 'يوجد فرق بين الأصول ومجموع الخصوم وحقوق الملكية.',
      componentsTitle: 'تحليل المكونات المالية',
      currentAssets: 'متداولة',
      fixedAssets: 'غير متداولة',
      liabLegend: 'الخصوم',
      equityLegend: 'الملكية',
      analysisNoteEquityGood: 'نسبة حقوق الملكية {percent}% تشير إلى استقرار مالي جيد وقدرة على تحمل الالتزامات.',
      analysisNoteLiabHigh: 'نسبة الخصوم {percent}% مرتفعة، يُنصح بمراجعة هيكل التمويل.',
      analysisNoteBalanced: 'التوزيع المالي متوازن: الخصوم {liab}%، حقوق الملكية {equity}%.'
    },
    en: {
      pageTitle: 'Balance Sheet',
      screenTitle: 'Balance Sheet',
      btnRefresh: 'Refresh',
      btnExportExcelTitle: 'Export Excel',
      btnExportPdfTitle: 'Export PDF',
      btnPrintTitle: 'Print',
      primaryDateTitle: 'Primary Date',
      compareDateTitle: 'Comparison Date (optional)',
      labelAsOfDate: 'As of date',
      labelCompareDate: 'As of date',
      btnView: 'View',
      assetsTitle: 'Assets',
      liabilitiesTitle: 'Liabilities & Equity',
      liabilitiesOnly: 'Liabilities',
      equityTitle: 'Equity',
      netProfit: 'Net Profit (Loss)',
      retainedEarnings: 'Retained Earnings',
      totalAssets: 'Total Assets',
      totalLiabilities: 'Total Liabilities',
      totalEquity: 'Total Equity',
      totalLiabEquity: 'Total Liabilities + Equity',
      labelTotalAssets: 'Total Assets:',
      labelTotalLiabEquity: 'Total Liabilities + Equity:',
      balanced: 'Balanced',
      unbalanced: 'Unbalanced',
      noData: 'No data',
      loading: 'Loading data...',
      errorLoading: 'Error while loading data',
      genericError: 'An error occurred',
      initialHint: 'Select date then click "View" to load the balance sheet',
      noDataToExport: 'No data to export',
      excelExportSuccess: 'File exported successfully',
      noDataToPrint: 'No data to print',
      printError: 'Error while printing',
      validationDateRequired: 'Please enter the primary date',
      currentAssets: 'Current Assets',
      fixedAssets: 'Fixed Assets',
      currentLiabilities: 'Current Liabilities',
      longTermLiabilities: 'Long-term Liabilities',
      capital: 'Capital',
      reserves: 'Reserves',
      filtersTitle: 'Display Options',
      labelOpening: 'Opening Balances',
      labelEmptyAccounts: 'Empty Accounts',
      labelDetailLevel: 'Detail Level',
      optOpeningYes: 'Yes',
      optOpeningNo: 'No',
      optEmptyHide: 'Hide',
      optEmptyShow: 'Show',
      optDetailDetailed: 'Detailed',
      optDetailSummary: 'Summary',
      optDetailGroups: 'Groups Only',
      colCode: 'Code',
      colName: 'Account Name',
      colBalance: 'Balance',
      cardAssetsLabel: 'Total Assets',
      cardLiabilitiesLabel: 'Total Liabilities',
      cardEquityLabel: 'Equity',
      cardProfitLabel: 'Net Profit',
      balanceCardTitle: 'Balance Status',
      balanceAssetsLabel: 'Assets',
      balanceLiabEquityLabel: 'Liabilities + Equity',
      balanceDiffLabel: 'Difference:',
      balancedTitle: 'Balance Sheet is Balanced',
      unbalancedTitle: 'Balance Sheet is Unbalanced',
      balancedDesc: 'Total assets equals the sum of liabilities and equity precisely.',
      unbalancedDesc: 'There is a difference between assets and total liabilities plus equity.',
      componentsTitle: 'Financial Components Analysis',
      currentAssets: 'Current',
      fixedAssets: 'Non-current',
      liabLegend: 'Liabilities',
      equityLegend: 'Equity',
      analysisNoteEquityGood: 'Equity ratio of {percent}% indicates good financial stability and ability to meet obligations.',
      analysisNoteLiabHigh: 'Liabilities ratio of {percent}% is high, consider reviewing the financing structure.',
      analysisNoteBalanced: 'Balanced financial distribution: Liabilities {liab}%, Equity {equity}%.'
    }
  };

  function getBSLang() {
    try {
      return localStorage.getItem('uiLang') === 'en' ? 'en' : 'ar';
    } catch (_) {
      return 'ar';
    }
  }

  function tBS(key) {
    const lang = getBSLang();
    const dict = BS_TRANSLATIONS[lang] || BS_TRANSLATIONS.ar;
    return dict[key] || BS_TRANSLATIONS.ar[key] || key;
  }

  let currentData = null;
  let hasFetchedBalanceSheet = false;

  const fmtAmount = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  function formatAmount(v) {
    return fmtAmount.format(v || 0);
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
    ['btnBsExportExcel', 'btnBsExportPdf'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) btn.disabled = !enabled;
    });
  }

  function updateSummaryCards(totalAssets, totalLiabilities, totalEquity, netProfit) {
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = formatAmount(val);
    };
    
    setVal('cardAssetsValue', totalAssets);
    setVal('cardLiabilitiesValue', totalLiabilities);
    setVal('cardEquityValue', totalEquity);
    setVal('cardProfitValue', netProfit);
  }

  function updateBalanceCard(totalAssets, totalLiabEquity) {
    const isBalanced = Math.abs(totalAssets - totalLiabEquity) < 0.01;
    const diff = totalAssets - totalLiabEquity;
    const maxVal = Math.max(totalAssets, totalLiabEquity, 1);
    const assetsPercent = (totalAssets / maxVal) * 100;
    const liabPercent = (totalLiabEquity / maxVal) * 100;
    const diffPercent = maxVal > 0 ? ((Math.abs(diff) / maxVal) * 100).toFixed(1) : 0;
    
    // Update amounts
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = formatAmount(val);
    };
    
    setVal('balanceAssetsAmount', totalAssets);
    setVal('balanceLiabEquityAmount', totalLiabEquity);
    setVal('balanceDiffValue', Math.abs(diff));
    
    // Update progress bars
    const progressAssets = document.getElementById('progressAssets');
    const progressLiab = document.getElementById('progressLiabEquity');
    if (progressAssets) progressAssets.style.width = `${assetsPercent}%`;
    if (progressLiab) progressLiab.style.width = `${liabPercent}%`;
    
    // Update diff percent
    const diffPercentEl = document.getElementById('balanceDiffPercent');
    if (diffPercentEl) {
      diffPercentEl.textContent = `(${diffPercent}%)`;
      diffPercentEl.className = 'bs-diff-percent' + (diff !== 0 ? ' negative' : '');
    }
    
    const diffValueEl = document.getElementById('balanceDiffValue');
    if (diffValueEl) {
      diffValueEl.className = 'bs-diff-value' + (diff !== 0 ? ' negative' : '');
    }
    
    // Update badge (mini version in card)
    const badge = document.getElementById('balanceBadge');
    if (badge) {
      badge.className = 'bs-balance-badge ' + (isBalanced ? 'balanced' : 'unbalanced');
      badge.innerHTML = isBalanced
        ? `<i class="fa-solid fa-circle-check"></i><span>${tBS('balanced')}</span>`
        : `<i class="fa-solid fa-circle-xmark"></i><span>${tBS('unbalanced')}</span>`;
    }
  }

  function updateBalanceCardSimple(totalAssets, totalLiabEquity) {
    const isBalanced = Math.abs(totalAssets - totalLiabEquity) < 0.01;
    
    const badge = document.getElementById('balanceBadge');
    if (badge) {
      badge.className = 'bs-balance-badge ' + (isBalanced ? 'balanced' : 'unbalanced');
      badge.innerHTML = isBalanced
        ? `<i class="fa-solid fa-circle-check"></i><span>${tBS('balanced')}</span>`
        : `<i class="fa-solid fa-circle-xmark"></i><span>${tBS('unbalanced')}</span>`;
    }
  }

  function updateAnalysisCards(totalAssets, totalLiabilities, totalEquity, netProfit) {
    // totalEquity هنا هو pureEquity (بدون صافي الربح)
    const equityPlusProfit = totalEquity + netProfit;
    const totalLiabEquity = totalLiabilities + equityPlusProfit;
    const isBalanced = Math.abs(totalAssets - totalLiabEquity) < 0.01;
    
    
    // تحديث بطاقة حالة التوازن
    const statusCard = document.getElementById('balanceStatusCard');
    const statusTitle = document.getElementById('statusTitle');
    const statusDesc = document.getElementById('statusDesc');
    const statusAssetsValue = document.getElementById('statusAssetsValue');
    const statusLiabValue = document.getElementById('statusLiabValue');
    
    if (statusCard) {
      statusCard.className = 'bs-balance-status-card' + (isBalanced ? '' : ' unbalanced');
    }
    
    if (statusTitle) {
      statusTitle.textContent = isBalanced ? tBS('balancedTitle') : tBS('unbalancedTitle');
    }
    
    if (statusDesc) {
      statusDesc.textContent = isBalanced ? tBS('balancedDesc') : tBS('unbalancedDesc');
    }
    
    if (statusAssetsValue) {
      statusAssetsValue.textContent = formatAmount(totalAssets);
    }
    
    if (statusLiabValue) {
      statusLiabValue.textContent = formatAmount(totalLiabEquity);
    }
    
    // تحديث أيقونة الحالة
    const statusHeader = document.getElementById('balanceStatusCard')?.querySelector('.bs-status-header i');
    if (statusHeader) {
      statusHeader.className = isBalanced ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-xmark';
    }
    
    // تحديث بطاقة تحليل المكونات
    // حساب نسب الأصول (نفترض 60% متداولة، 40% غير متداولة كتقدير)
    const currentAssetsBar = document.getElementById('currentAssetsBar');
    const fixedAssetsBar = document.getElementById('fixedAssetsBar');
    
    // نسب افتراضية - يمكن تحسينها لاحقاً بناءً على التصنيف الفعلي
    const currentPercent = 60;
    const fixedPercent = 40;
    
    if (currentAssetsBar) currentAssetsBar.style.width = `${currentPercent}%`;
    if (fixedAssetsBar) fixedAssetsBar.style.width = `${fixedPercent}%`;
    
    // حساب نسب الخصوم وحقوق الملكية
    const liabilitiesBar = document.getElementById('liabilitiesBar');
    const equityBar = document.getElementById('equityBar');
    
    // استخدام equityPlusProfit المحسوبة سابقاً
    const absLiab = Math.abs(totalLiabilities);
    const absEquity = Math.abs(equityPlusProfit);
    const totalForPercent = absLiab + absEquity;
    
    let liabPercent = 50;
    let equityPercent = 50;
    
    if (totalForPercent > 0.01) {
      // حساب النسب بدقة عالية
      const rawLiabPercent = (absLiab / totalForPercent) * 100;
      const rawEquityPercent = (absEquity / totalForPercent) * 100;
      
      // إذا كانت إحدى النسب صغيرة جداً لكنها موجودة، أعطها حد أدنى للعرض
      if (rawEquityPercent > 0 && rawEquityPercent < 5) {
        equityPercent = 5; // حد أدنى 5% للعرض
        liabPercent = 95;
      } else if (rawLiabPercent > 0 && rawLiabPercent < 5) {
        liabPercent = 5;
        equityPercent = 95;
      } else {
        liabPercent = Math.round(rawLiabPercent);
        equityPercent = 100 - liabPercent;
      }
    } else if (totalAssets > 0.01) {
      // إذا لم توجد خصوم أو ملكية، افترض أن الملكية = الأصول
      liabPercent = 0;
      equityPercent = 100;
    }
    
    // تأكد من أن النسب في النطاق الصحيح
    liabPercent = Math.max(0, Math.min(100, liabPercent));
    equityPercent = Math.max(0, Math.min(100, equityPercent));
    
    if (liabilitiesBar) liabilitiesBar.style.width = `${liabPercent}%`;
    if (equityBar) equityBar.style.width = `${equityPercent}%`;
    
    // تحديث الملاحظة التحليلية
    const analysisNoteText = document.getElementById('analysisNoteText');
    if (analysisNoteText) {
      let noteText = '';
      if (equityPercent > 50) {
        noteText = tBS('analysisNoteEquityGood').replace('{percent}', equityPercent);
      } else if (liabPercent > 70) {
        noteText = tBS('analysisNoteLiabHigh').replace('{percent}', liabPercent);
      } else {
        noteText = tBS('analysisNoteBalanced').replace('{liab}', liabPercent).replace('{equity}', equityPercent);
      }
      analysisNoteText.textContent = `"${noteText}"`;
    }
  }

  function setEmptyState(assetsMsg, liabMsg) {
    const assetsBody = document.getElementById('assetsBody');
    const liabBody = document.getElementById('liabilitiesBody');
    
    if (assetsBody) {
      assetsBody.innerHTML = `
        <div class="bs-empty-state">
          <i class="fa-solid fa-building-columns"></i>
          <span>${assetsMsg || tBS('noData')}</span>
        </div>
      `;
    }
    
    if (liabBody) {
      liabBody.innerHTML = `
        <div class="bs-empty-state">
          <i class="fa-solid fa-landmark"></i>
          <span>${liabMsg || tBS('noData')}</span>
        </div>
      `;
    }
    
    document.getElementById('totalAssets').textContent = '0.00';
    document.getElementById('totalLiabilities').textContent = '0.00';
    
    updateSummaryCards(0, 0, 0, 0);
    updateBalanceCard(0, 0);
    toggleExportButtons(false);
    currentData = null;
  }

  function groupAccountsByType(accounts) {
    const assets = accounts.filter(a => a.account_type === 'asset');
    const liabilities = accounts.filter(a => a.account_type === 'liability');
    const equity = accounts.filter(a => a.account_type === 'equity');
    
    return { assets, liabilities, equity };
  }

  function renderAccountGroup(accounts, containerId, groupTitle, totalFieldId) {
    const container = document.getElementById(containerId);
    if (!container) return 0;
    
    if (!accounts || accounts.length === 0) {
      container.innerHTML = `
        <div class="bs-empty-state">
          <i class="fa-solid fa-inbox"></i>
          <span>${tBS('noData')}</span>
        </div>
      `;
      return 0;
    }
    
    let totalCash = 0;
    let html = '';
    
    for (const acc of accounts) {
      const balance = acc.cash_balance1 || 0;
      totalCash += balance;
      
      const balanceClass = balance < 0 ? 'negative' : (balance > 0 ? 'positive' : '');
      
      html += `
        <div class="bs-account">
          <div class="bs-account-name">
            <span class="bs-account-code">${acc.code}</span>
            ${acc.name}
          </div>
          <div class="bs-account-balance ${balanceClass}">${formatAmount(balance)}</div>
        </div>
      `;
    }
    
    container.innerHTML = html;
    
    if (totalFieldId) {
      const totalEl = document.getElementById(totalFieldId);
      if (totalEl) totalEl.textContent = formatAmount(totalCash);
    }
    
    return totalCash;
  }

  function renderBalanceSheet(data) {
    if (!data || !data.accounts) {
      setEmptyState(tBS('noData'), tBS('noData'));
      return;
    }
    
    currentData = data;
    const { assets, liabilities, equity } = groupAccountsByType(data.accounts);
    
    const assetsBody = document.getElementById('assetsBody');
    const liabBody = document.getElementById('liabilitiesBody');
    const assetsEmpty = document.getElementById('assetsEmpty');
    const liabEmpty = document.getElementById('liabilitiesEmpty');
    
    // Render Assets as table rows
    let totalAssets = 0;
    let assetsHtml = '';
    
    if (assets.length > 0) {
      for (const acc of assets) {
        const balance = acc.cash_balance1 || 0;
        totalAssets += balance;
        const balanceClass = balance < 0 ? 'negative' : '';
        
        assetsHtml += `
          <tr>
            <td>${acc.code}</td>
            <td>${acc.name}</td>
            <td class="${balanceClass}">${formatAmount(balance)}</td>
          </tr>
        `;
      }
      
      // Total row
      assetsHtml += `
        <tr class="bs-table-total">
          <td></td>
          <td>${tBS('totalAssets')}</td>
          <td>${formatAmount(totalAssets)}</td>
        </tr>
      `;
      
      if (assetsEmpty) assetsEmpty.classList.remove('show');
    } else {
      if (assetsEmpty) assetsEmpty.classList.add('show');
    }
    
    if (assetsBody) assetsBody.innerHTML = assetsHtml;
    document.getElementById('totalAssets').textContent = formatAmount(totalAssets);
    
    // Render Liabilities and Equity as table rows
    let totalLiabilities = 0;
    let totalEquity = 0;
    let liabHtml = '';
    
    // Liabilities section
    if (liabilities.length > 0) {
      liabHtml += `<tr class="bs-group-row"><td colspan="3">${tBS('liabilitiesOnly')}</td></tr>`;
      
      for (const acc of liabilities) {
        const balance = acc.cash_balance1 || 0;
        totalLiabilities += balance;
        const balanceClass = balance < 0 ? 'negative' : '';
        
        liabHtml += `
          <tr>
            <td>${acc.code}</td>
            <td>${acc.name}</td>
            <td class="${balanceClass}">${formatAmount(balance)}</td>
          </tr>
        `;
      }
    }
    
    // Equity section
    liabHtml += `<tr class="bs-group-row"><td colspan="3">${tBS('equityTitle')}</td></tr>`;
    
    if (equity.length > 0) {
      for (const acc of equity) {
        const balance = acc.cash_balance1 || 0;
        totalEquity += balance;
        const balanceClass = balance < 0 ? 'negative' : '';
        
        liabHtml += `
          <tr>
            <td>${acc.code}</td>
            <td>${acc.name}</td>
            <td class="${balanceClass}">${formatAmount(balance)}</td>
          </tr>
        `;
      }
    }
    
    // Add Net Profit row
    const netProfit = data.net_profit1 || 0;
    totalEquity += netProfit;
    const profitClass = netProfit < 0 ? 'negative' : 'positive';
    
    liabHtml += `
      <tr style="background: linear-gradient(135deg, var(--primary), var(--primary-hover));">
        <td style="color: white;"></td>
        <td style="color: white; font-weight: 600;">${tBS('netProfit')}</td>
        <td style="color: white; font-weight: 700;">${formatAmount(netProfit)}</td>
      </tr>
    `;
    
    // Total Liabilities + Equity
    const totalLiabEquity = totalLiabilities + totalEquity;
    
    liabHtml += `
      <tr class="bs-table-total">
        <td></td>
        <td>${tBS('totalLiabEquity')}</td>
        <td>${formatAmount(totalLiabEquity)}</td>
      </tr>
    `;
    
    if (liabBody) liabBody.innerHTML = liabHtml;
    if (liabEmpty) {
      if (liabilities.length === 0 && equity.length === 0) {
        liabEmpty.classList.add('show');
      } else {
        liabEmpty.classList.remove('show');
      }
    }
    document.getElementById('totalLiabilities').textContent = formatAmount(totalLiabEquity);
    
    // Update summary cards (totalEquity already includes netProfit)
    const pureEquity = totalEquity - netProfit; // حقوق الملكية بدون صافي الربح
    
    updateSummaryCards(totalAssets, totalLiabilities, pureEquity, netProfit);
    
    // Update balance card
    updateBalanceCard(totalAssets, totalLiabEquity);
    
    // Update analysis cards (balance status & components)
    updateAnalysisCards(totalAssets, totalLiabilities, pureEquity, netProfit);
    
    toggleExportButtons(true);
  }

  async function fetchBalanceSheet() {
    try {
      if (window.ScreenPermissions && !window.ScreenPermissions.check('reports_view_balance_sheet', 'عرض الميزانية العمومية')) {
        return;
      }
    } catch (_) {}

    const asOfDate = document.getElementById('bsAsOfDate')?.value || null;
    const compareDate = document.getElementById('bsCompareDate')?.value || null;
    const includeOpening = document.getElementById('bsIncludeOpening')?.value !== 'no';
    const showEmpty = document.getElementById('bsShowEmpty')?.value === 'show';
    const detailLevel = document.getElementById('bsDetailLevel')?.value || 'detailed';

    if (!asOfDate) {
      showToast(tBS('validationDateRequired'), 'warning');
      return;
    }
    hasFetchedBalanceSheet = true;

    // إظهار جميع الأقسام المخفية
    document.querySelectorAll('.bs-hidden-until-view').forEach(el => {
      el.classList.add('bs-visible');
    });

    setEmptyState(tBS('loading'), tBS('loading'));

    try {
      const result = await window.api.invoke('reports:get-balance-sheet', {
        as_of_date: asOfDate,
        compare_date: compareDate || null,
        include_opening: includeOpening,
        show_empty: showEmpty,
        detail_level: detailLevel
      });

      if (result && result.success) {
        renderBalanceSheet(result);
      } else {
        setEmptyState(result && result.error ? result.error : tBS('errorLoading'), tBS('errorLoading'));
        showToast(result && result.error ? result.error : tBS('genericError'), 'error');
      }
    } catch (err) {
      setEmptyState(tBS('errorLoading'), tBS('errorLoading'));
      showToast(err && err.message ? err.message : tBS('genericError'), 'error');
    }
  }

  function exportToExcel() {
    if (!currentData || !currentData.accounts || currentData.accounts.length === 0) {
      showToast(tBS('noDataToExport'), 'warning');
      return;
    }

    const asOfDate = document.getElementById('bsAsOfDate')?.value || '';
    const { assets, liabilities, equity } = groupAccountsByType(currentData.accounts);
    
    let totalAssets = assets.reduce((sum, a) => sum + (a.cash_balance1 || 0), 0);
    let totalLiabilities = liabilities.reduce((sum, a) => sum + (a.cash_balance1 || 0), 0);
    let totalEquity = equity.reduce((sum, a) => sum + (a.cash_balance1 || 0), 0) + (currentData.net_profit1 || 0);

    let html = `
      <html dir="rtl">
      <head><meta charset="utf-8"><style>
        table { border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; }
        th, td { border: 1px solid #000; padding: 8px; }
        th { background: #4472C4; color: white; }
        .num { text-align: left; direction: ltr; }
        .total { background: #D9E2F3; font-weight: bold; }
        .section { background: #B4C6E7; font-weight: bold; }
        h2 { text-align: center; }
        .date-info { text-align: center; color: #666; margin-bottom: 20px; }
      </style></head>
      <body>
      <h2>${tBS('pageTitle')}</h2>
      <div class="date-info">${tBS('labelAsOfDate')}: ${asOfDate}</div>
      <table>
        <thead>
          <tr>
            <th colspan="2">${tBS('assetsTitle')}</th>
            <th colspan="2">${tBS('liabilitiesTitle')}</th>
          </tr>
          <tr>
            <th>الحساب</th>
            <th>الرصيد</th>
            <th>الحساب</th>
            <th>الرصيد</th>
          </tr>
        </thead>
        <tbody>
    `;

    const maxRows = Math.max(assets.length, liabilities.length + equity.length + 2);
    
    for (let i = 0; i < maxRows; i++) {
      const asset = assets[i];
      let liabOrEquity = null;
      let isSection = false;
      let sectionName = '';
      
      if (i < liabilities.length) {
        liabOrEquity = liabilities[i];
      } else if (i === liabilities.length && equity.length > 0) {
        isSection = true;
        sectionName = tBS('equityTitle');
      } else if (i > liabilities.length && i - liabilities.length - 1 < equity.length) {
        liabOrEquity = equity[i - liabilities.length - 1];
      } else if (i === liabilities.length + equity.length + 1) {
        isSection = true;
        sectionName = tBS('netProfit');
        liabOrEquity = { name: tBS('netProfit'), cash_balance1: currentData.net_profit1 || 0 };
      }

      html += '<tr>';
      
      if (asset) {
        html += `<td>${asset.code} - ${asset.name}</td><td class="num">${formatAmount(asset.cash_balance1)}</td>`;
      } else {
        html += '<td></td><td></td>';
      }
      
      if (isSection && !liabOrEquity) {
        html += `<td class="section" colspan="2">${sectionName}</td>`;
      } else if (liabOrEquity) {
        html += `<td>${liabOrEquity.code ? liabOrEquity.code + ' - ' : ''}${liabOrEquity.name}</td><td class="num">${formatAmount(liabOrEquity.cash_balance1)}</td>`;
      } else {
        html += '<td></td><td></td>';
      }
      
      html += '</tr>';
    }

    html += `
      <tr class="total">
        <td>${tBS('totalAssets')}</td>
        <td class="num">${formatAmount(totalAssets)}</td>
        <td>${tBS('totalLiabEquity')}</td>
        <td class="num">${formatAmount(totalLiabilities + totalEquity)}</td>
      </tr>
    `;

    html += '</tbody></table></body></html>';

    const blob = new Blob(['\ufeff' + html], { type: 'application/vnd.ms-excel;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `balance_sheet_${asOfDate || new Date().toISOString().slice(0,10)}.xls`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(tBS('excelExportSuccess'), 'success');
  }

  async function printReport() {
    if (!currentData || !currentData.accounts || currentData.accounts.length === 0) {
      showToast(tBS('noDataToPrint'), 'warning');
      return;
    }

    const asOfDate = document.getElementById('bsAsOfDate')?.value || '';
    const lang = getBSLang();
    const isRtl = lang === 'ar';
    const dir = isRtl ? 'rtl' : 'ltr';

    const { assets, liabilities, equity } = groupAccountsByType(currentData.accounts);
    
    let totalAssets = assets.reduce((sum, a) => sum + (a.cash_balance1 || 0), 0);
    let totalLiabilities = liabilities.reduce((sum, a) => sum + (a.cash_balance1 || 0), 0);
    let pureEquity = equity.reduce((sum, a) => sum + (a.cash_balance1 || 0), 0);
    let netProfit = currentData.net_profit1 || 0;
    let totalEquity = pureEquity + netProfit;
    let totalLiabEquity = totalLiabilities + totalEquity;
    const isBalanced = Math.abs(totalAssets - totalLiabEquity) < 0.01;
    
    // حساب نسب التحليل
    const absLiab = Math.abs(totalLiabilities);
    const absEquity = Math.abs(totalEquity);
    const totalForPercent = absLiab + absEquity;
    let liabPercent = 50, equityPercent = 50;
    if (totalForPercent > 0.01) {
      const rawLiabPercent = (absLiab / totalForPercent) * 100;
      const rawEquityPercent = (absEquity / totalForPercent) * 100;
      if (rawEquityPercent > 0 && rawEquityPercent < 5) {
        equityPercent = 5; liabPercent = 95;
      } else if (rawLiabPercent > 0 && rawLiabPercent < 5) {
        liabPercent = 5; equityPercent = 95;
      } else {
        liabPercent = Math.round(rawLiabPercent);
        equityPercent = 100 - liabPercent;
      }
    }

    let html = `
      <!DOCTYPE html>
      <html dir="${dir}" lang="${lang}">
      <head>
        <meta charset="utf-8">
        <title>${tBS('pageTitle')}</title>
        <style>
          @page { margin: 10mm; }
          * { box-sizing: border-box; }
          body { font-family: 'Cairo', Arial, sans-serif; direction: ${dir}; padding: 20px; background: #f8fafc; margin: 0; }
          
          /* Header */
          .header { text-align: center; margin-bottom: 24px; padding: 20px; background: linear-gradient(135deg, #1e3a5f, #2c5282); border-radius: 16px; color: white; }
          .header h1 { margin: 0 0 8px 0; font-size: 28px; }
          .header .date { font-size: 14px; opacity: 0.9; }
          
          /* Cards Row */
          .cards-row { display: grid; grid-template-columns: 1fr 1.5fr; gap: 16px; margin-bottom: 20px; }
          
          /* Balance Status Card */
          .balance-status-card { background: linear-gradient(135deg, ${isBalanced ? '#059669, #10b981' : '#dc2626, #ef4444'}); border-radius: 16px; padding: 24px; color: white; }
          .balance-status-card .status-header { display: flex; align-items: center; gap: 8px; font-size: 14px; margin-bottom: 12px; }
          .balance-status-card .status-title { font-size: 22px; font-weight: 700; margin-bottom: 8px; }
          .balance-status-card .status-desc { font-size: 12px; opacity: 0.9; margin-bottom: 16px; }
          .balance-status-card .comparison { display: flex; align-items: center; justify-content: center; gap: 20px; background: rgba(255,255,255,0.15); border-radius: 12px; padding: 16px; }
          .balance-status-card .comparison .item { text-align: center; }
          .balance-status-card .comparison .label { font-size: 11px; opacity: 0.85; }
          .balance-status-card .comparison .value { font-size: 18px; font-weight: 700; direction: ltr; }
          .balance-status-card .comparison .equals { font-size: 24px; font-weight: 700; }
          
          /* Components Card */
          .components-card { background: white; border-radius: 16px; padding: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
          .components-card .card-header { display: flex; align-items: center; gap: 10px; font-size: 16px; font-weight: 600; color: #1e3a5f; margin-bottom: 20px; }
          .component-section { margin-bottom: 16px; }
          .component-header { display: flex; justify-content: space-between; margin-bottom: 8px; }
          .component-name { font-size: 13px; font-weight: 600; color: #334155; }
          .component-percent { font-size: 13px; font-weight: 700; color: #3b82f6; }
          .component-bar { display: flex; height: 14px; border-radius: 7px; overflow: hidden; background: #e2e8f0; }
          .bar-liab { background: linear-gradient(90deg, #f97316, #fb923c); }
          .bar-equity { background: linear-gradient(90deg, #3b82f6, #60a5fa); }
          .bar-current { background: linear-gradient(90deg, #10b981, #34d399); }
          .bar-fixed { background: linear-gradient(90deg, #f59e0b, #fbbf24); }
          .bar-legend { display: flex; gap: 16px; font-size: 11px; color: #64748b; margin-top: 6px; }
          .legend-dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; margin-left: 4px; }
          .analysis-note { background: #f0f9ff; border-radius: 10px; padding: 12px; font-size: 11px; color: #64748b; line-height: 1.6; margin-top: 12px; }
          
          /* Tables Container */
          .tables-container { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
          .table-side { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
          .table-header { padding: 14px 20px; color: white; font-size: 16px; font-weight: 700; }
          .assets-header { background: linear-gradient(135deg, #059669, #10b981); }
          .liab-header { background: linear-gradient(135deg, #3b82f6, #60a5fa); }
          table { width: 100%; border-collapse: collapse; font-size: 12px; }
          th { background: #f1f5f9; padding: 10px 14px; text-align: right; font-weight: 600; color: #475569; border-bottom: 2px solid #e2e8f0; }
          td { padding: 10px 14px; border-bottom: 1px solid #f1f5f9; color: #334155; }
          .num { text-align: left; direction: ltr; font-weight: 500; }
          .section-row { background: #f8fafc; font-weight: 600; color: #1e3a5f; }
          .profit-row { background: linear-gradient(135deg, #3b82f6, #60a5fa); color: white; }
          .profit-row td { color: white; font-weight: 600; }
          .total-row { background: linear-gradient(135deg, #1e3a5f, #334155); }
          .total-row td { color: white; font-weight: 700; }
          
          /* Footer */
          .footer { text-align: center; padding: 16px; color: #94a3b8; font-size: 11px; border-top: 1px solid #e2e8f0; margin-top: 20px; }
          
          @media print { 
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: white; }
            .print-btn { display: none !important; }
          }
          .print-btn {
            position: fixed; top: 20px; left: 20px; padding: 12px 24px;
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: white; border: none; border-radius: 8px; font-size: 14px;
            font-weight: 600; cursor: pointer; z-index: 1000; font-family: 'Cairo', Arial, sans-serif;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
          }
          .print-btn:hover { transform: translateY(-2px); }
        </style>
      </head>
      <body>
        <button class="print-btn" onclick="window.print()">🖨️ طباعة</button>
        
        <!-- Header -->
        <div class="header">
          <h1>${tBS('pageTitle')}</h1>
          <div class="date">${tBS('labelAsOfDate')}: ${asOfDate}</div>
        </div>
        
        <!-- Balance Status & Components Cards -->
        <div class="cards-row">
          <!-- Balance Status Card -->
          <div class="balance-status-card">
            <div class="status-header">${isBalanced ? '✓' : '✗'} ${tBS('balanceCardTitle')}</div>
            <div class="status-title">${isBalanced ? tBS('balancedTitle') : tBS('unbalancedTitle')}</div>
            <div class="status-desc">${isBalanced ? tBS('balancedDesc') : tBS('unbalancedDesc')}</div>
            <div class="comparison">
              <div class="item">
                <div class="label">${tBS('assetsTitle')}</div>
                <div class="value">${formatAmount(totalAssets)}</div>
              </div>
              <div class="equals">=</div>
              <div class="item">
                <div class="label">${tBS('liabilitiesTitle')}</div>
                <div class="value">${formatAmount(totalLiabEquity)}</div>
              </div>
            </div>
          </div>
          
          <!-- Components Analysis Card -->
          <div class="components-card">
            <div class="card-header">📊 ${tBS('componentsTitle')}</div>
            
            <div class="component-section">
              <div class="component-header">
                <span class="component-name">${tBS('assetsTitle')}</span>
                <span class="component-percent">100%</span>
              </div>
              <div class="component-bar">
                <div class="bar-current" style="width: 60%"></div>
                <div class="bar-fixed" style="width: 40%"></div>
              </div>
              <div class="bar-legend">
                <span><span class="legend-dot" style="background:#10b981"></span> ${tBS('currentAssets')}</span>
                <span><span class="legend-dot" style="background:#f59e0b"></span> ${tBS('fixedAssets')}</span>
              </div>
            </div>
            
            <div class="component-section">
              <div class="component-header">
                <span class="component-name">${tBS('liabilitiesTitle')}</span>
                <span class="component-percent">100%</span>
              </div>
              <div class="component-bar">
                <div class="bar-liab" style="width: ${liabPercent}%"></div>
                <div class="bar-equity" style="width: ${equityPercent}%"></div>
              </div>
              <div class="bar-legend">
                <span><span class="legend-dot" style="background:#f97316"></span> ${tBS('liabLegend')} (${liabPercent}%)</span>
                <span><span class="legend-dot" style="background:#3b82f6"></span> ${tBS('equityLegend')} (${equityPercent}%)</span>
              </div>
            </div>
            
            <div class="analysis-note">
              💡 ${equityPercent > 50 
                ? `نسبة حقوق الملكية ${equityPercent}% تشير إلى استقرار مالي جيد.`
                : liabPercent > 70 
                  ? `نسبة الخصوم ${liabPercent}% مرتفعة، يُنصح بمراجعة هيكل التمويل.`
                  : `التوزيع المالي متوازن: الخصوم ${liabPercent}%، حقوق الملكية ${equityPercent}%.`}
            </div>
          </div>
        </div>
        
        <!-- Tables -->
        <div class="tables-container">
          <div class="table-side">
            <div class="table-header assets-header">${tBS('assetsTitle')}</div>
            <table>
              <thead><tr><th>${tBS('colName')}</th><th>${tBS('colBalance')}</th></tr></thead>
              <tbody>
    `;

    for (const acc of assets) {
      html += `<tr><td>${acc.code} - ${acc.name}</td><td class="num">${formatAmount(acc.cash_balance1)}</td></tr>`;
    }
    html += `<tr class="total"><td>${tBS('totalAssets')}</td><td class="num">${formatAmount(totalAssets)}</td></tr>`;
    html += '</tbody></table></div>';

    html += `
          <div class="table-side">
            <div class="table-header liab-header">${tBS('liabilitiesTitle')}</div>
            <table>
              <thead><tr><th>${tBS('colName')}</th><th>${tBS('colBalance')}</th></tr></thead>
              <tbody>
    `;

    if (liabilities.length > 0) {
      html += `<tr class="section-row"><td colspan="2">${tBS('liabilitiesOnly')}</td></tr>`;
      for (const acc of liabilities) {
        html += `<tr><td>${acc.code} - ${acc.name}</td><td class="num">${formatAmount(acc.cash_balance1)}</td></tr>`;
      }
    }

    html += `<tr class="section-row"><td colspan="2">${tBS('equityTitle')}</td></tr>`;
    for (const acc of equity) {
      html += `<tr><td>${acc.code} - ${acc.name}</td><td class="num">${formatAmount(acc.cash_balance1)}</td></tr>`;
    }
    html += `<tr class="profit-row"><td>${tBS('netProfit')}</td><td class="num">${formatAmount(netProfit)}</td></tr>`;
    html += `<tr class="total-row"><td>${tBS('totalLiabEquity')}</td><td class="num">${formatAmount(totalLiabEquity)}</td></tr>`;
    
    html += '</tbody></table></div></div>';

    // Footer
    html += `
      <div class="footer">
        تم إنشاء هذا التقرير بواسطة نظام إدارة الذهب | ${new Date().toLocaleDateString('ar-SA')}
      </div>
    `;

    html += '</body></html>';

    try {
      if (window.api && window.api.invoke) {
        await window.api.invoke('print-preview', { html, title: tBS('pageTitle') });
      } else {
        const win = window.open('', '_blank');
        win.document.write(html);
        win.document.close();
        win.print();
      }
    } catch (err) {
      showToast(tBS('printError'), 'error');
    }
  }

  function applyStaticTexts() {
    const lang = getBSLang();
    const isRtl = lang === 'ar';
    const dir = isRtl ? 'rtl' : 'ltr';

    try {
      document.documentElement.lang = lang;
      document.documentElement.dir = dir;
      document.body.dir = dir;
      document.title = tBS('pageTitle');
    } catch (_) {}

    const setText = (id, key) => {
      const el = document.getElementById(id);
      if (el) el.textContent = tBS(key);
    };

    // Summary Cards
    setText('cardAssetsLabel', 'cardAssetsLabel');
    setText('cardLiabilitiesLabel', 'cardLiabilitiesLabel');
    setText('cardEquityLabel', 'cardEquityLabel');
    setText('cardProfitLabel', 'cardProfitLabel');
    
    // Balance Card
    setText('balanceCardTitle', 'balanceCardTitle');
    setText('balanceBadgeText', 'balanced');
    setText('balanceAssetsLabel', 'balanceAssetsLabel');
    setText('balanceLiabEquityLabel', 'balanceLiabEquityLabel');
    setText('balanceDiffLabel', 'balanceDiffLabel');
    
    // Filters
    setText('filtersTitle', 'filtersTitle');
    setText('labelAsOfDate', 'labelAsOfDate');
    setText('labelCompareDate', 'labelCompareDate');
    setText('labelOpening', 'labelOpening');
    setText('labelEmptyAccounts', 'labelEmptyAccounts');
    setText('labelDetailLevel', 'labelDetailLevel');
    setText('btnViewText', 'btnView');
    
    // Filter options
    setText('optOpeningYes', 'optOpeningYes');
    setText('optOpeningNo', 'optOpeningNo');
    setText('optEmptyHide', 'optEmptyHide');
    setText('optEmptyShow', 'optEmptyShow');
    setText('optDetailDetailed', 'optDetailDetailed');
    setText('optDetailSummary', 'optDetailSummary');
    setText('optDetailGroups', 'optDetailGroups');
    
    // Table column headers
    setText('colCode', 'colCode');
    setText('colName', 'colName');
    setText('colBalance', 'colBalance');
    setText('colCode2', 'colCode');
    setText('colName2', 'colName');
    setText('colBalance2', 'colBalance');
    
    // Content sections
    setText('assetsTitle', 'assetsTitle');
    setText('liabilitiesTitle', 'liabilitiesTitle');
    setText('assetsEmptyText', 'noData');
    setText('liabilitiesEmptyText', 'noData');
    
    // Balance Status Card
    setText('statusHeaderText', 'balanceCardTitle');
    setText('statusTitle', 'balancedTitle');
    setText('statusDesc', 'balancedDesc');
    setText('statusAssetsLabel', 'balanceAssetsLabel');
    setText('statusLiabLabel', 'balanceLiabEquityLabel');
    
    // Components Analysis Card
    setText('componentsTitle', 'componentsTitle');
    setText('assetsBarLabel', 'cardAssetsLabel');
    setText('liabBarLabel', 'liabilitiesTitle');
    setText('currentAssetsLegend', 'currentAssets');
    setText('fixedAssetsLegend', 'fixedAssets');
    setText('liabLegend', 'liabLegend');
    setText('equityLegend', 'equityLegend');

    const btnExcel = document.getElementById('btnBsExportExcel');
    if (btnExcel) btnExcel.title = tBS('btnExportExcelTitle');

    const btnPdf = document.getElementById('btnBsExportPdf');
    if (btnPdf) btnPdf.title = tBS('btnExportPdfTitle');
  }

  document.addEventListener('DOMContentLoaded', async () => {
    applyStaticTexts();

    try {
      if (window.ScreenPermissions) {
        await window.ScreenPermissions.init();
        if (!window.ScreenPermissions.check('reports_view_balance_sheet', 'عرض الميزانية العمومية')) {
          const panel = document.getElementById('panel-balance-sheet');
          if (panel) panel.style.display = 'none';
          return;
        }
      }
    } catch (_) {}

    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    const asOfDateInput = document.getElementById('bsAsOfDate');
    if (asOfDateInput) asOfDateInput.value = today;

    document.getElementById('btnBsView')?.addEventListener('click', fetchBalanceSheet);
    document.getElementById('btnBsRefresh')?.addEventListener('click', fetchBalanceSheet);
    document.getElementById('btnBsExportExcel')?.addEventListener('click', exportToExcel);
    document.getElementById('btnBsExportPdf')?.addEventListener('click', printReport);

    setEmptyState(tBS('initialHint'), tBS('initialHint'));
  });

  window.refreshForBranchScopeChange = async function() {
    if (hasFetchedBalanceSheet) {
      await fetchBalanceSheet();
    }
    return true;
  };
})();

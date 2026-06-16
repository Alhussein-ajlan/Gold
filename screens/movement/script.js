// Movement Screen - Comprehensive Transaction Viewer

// Translation dictionaries
const MOVEMENT_TRANSLATIONS = {
  ar: {},
  en: {}
};

// Load translation files
async function loadTranslations() {
  try {
    // Load Arabic translations
    const arResponse = await fetch('./locales/ar.json');
    const arData = await arResponse.json();
    MOVEMENT_TRANSLATIONS.ar = arData;
    
    // Load English translations
    const enResponse = await fetch('./locales/en.json');
    const enData = await enResponse.json();
    MOVEMENT_TRANSLATIONS.en = enData;
  } catch (error) {
    // Error loading translations
  }
}

// Get current UI language
function getMovementLang() {
  try {
    const lang = localStorage.getItem('uiLang');
    return lang === 'en' ? 'en' : 'ar';
  } catch (_) {
    return 'ar';
  }
}

// Check if current language is RTL
function isMovementRtl() {
  return getMovementLang() === 'ar';
}

// Resolve translation by key path
function resolveTranslation(obj, path) {
  return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
}

// Get translation by key
function t(key) {
  const lang = getMovementLang();
  const val = resolveTranslation(MOVEMENT_TRANSLATIONS[lang] || {}, key);
  if (val !== undefined) return val;
  const fallback = resolveTranslation(MOVEMENT_TRANSLATIONS.ar, key);
  return fallback !== undefined ? fallback : key;
}

// Get formatted translation with parameters
function tFmt(key, params = {}) {
  let str = t(key);
  Object.entries(params).forEach(([k, v]) => {
    const regex = new RegExp(`{${k}}`, 'g');
    str = str.replace(regex, v);
  });
  return str;
}

// Toast functions for translated messages
function toastInfoKey(key, params = {}) {
  showToast('info', tFmt(key, params));
}

function toastSuccessKey(key, params = {}) {
  showToast('success', tFmt(key, params));
}

function toastErrorKey(key, params = {}) {
  showToast('error', tFmt(key, params));
}

// Show toast notification with RTL/LTR support
function showToast(type, message) {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  
  // Adjust position based on RTL/LTR
  const isRtl = isMovementRtl();
  
  toast.style.cssText = `
    position: fixed;
    top: 80px;
    ${isRtl ? 'right' : 'left'}: 50%;
    transform: translateX(-50%);
    background: var(--card);
    color: var(--text);
    padding: 12px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 9999;
    border-${isRtl ? 'right' : 'left'}: 4px solid var(--primary);
    animation: slideDown 0.3s ease;
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideUp 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Apply static translations to HTML elements
function applyStaticTexts() {
  const lang = getMovementLang();
  const isRtl = isMovementRtl();
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
        apply(el, t(key));
      }
    });
  });
}

let movementTranslationsReadyPromise = null;
function ensureMovementTranslationsReady() {
  if (!movementTranslationsReadyPromise) {
    movementTranslationsReadyPromise = loadTranslations().then(() => {
      applyStaticTexts();
      return true;
    });
  }
  return movementTranslationsReadyPromise;
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', async function() {
  await ensureMovementTranslationsReady();
});

(async function() {
  'use strict';
  await ensureMovementTranslationsReady();

  // ✅ Initialize screen permissions
  if (window.ScreenPermissions) {
    await window.ScreenPermissions.init();
  }

  // DOM Elements
  const movementTypeSelect = document.getElementById('movementType');
  const goldKaratSelect = document.getElementById('goldKarat');
  const silverKaratSelect = document.getElementById('silverKarat');
  const dateFromInput = document.getElementById('dateFrom');
  const dateToInput = document.getElementById('dateTo');
  const btnView = document.getElementById('btnView');
  const btnCompact = document.getElementById('btnCompact');
  const tableBody = document.getElementById('movementTableBody');
  const loadingIndicator = document.getElementById('loadingIndicator');
  const movementTable = document.getElementById('movementTable');
  
  // New Professional UI Elements
  const summaryStrip = document.getElementById('summaryStrip');
  const totalsBar = document.getElementById('totalsBar');
  const filterChips = document.getElementById('filterChips');
  const detailsDrawer = document.getElementById('detailsDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerClose = document.getElementById('drawerClose');
  
  // Summary elements
  const summCashDebit = document.getElementById('summCashDebit');
  const summCashCredit = document.getElementById('summCashCredit');
  const summGoldDebit = document.getElementById('summGoldDebit');
  const summGoldCredit = document.getElementById('summGoldCredit');
  const summSilverDebit = document.getElementById('summSilverDebit');
  const summSilverCredit = document.getElementById('summSilverCredit');
  
  // Totals bar elements
  const totalCashDebit = document.getElementById('totalCashDebit');
  const totalCashCredit = document.getElementById('totalCashCredit');
  const totalGoldDebit = document.getElementById('totalGoldDebit');
  const totalGoldCredit = document.getElementById('totalGoldCredit');
  const totalSilverDebit = document.getElementById('totalSilverDebit');
  const totalSilverCredit = document.getElementById('totalSilverCredit');
  
  // Drawer elements
  const drawerDocType = document.getElementById('drawerDocType');
  const drawerDocNo = document.getElementById('drawerDocNo');
  const drawerDate = document.getElementById('drawerDate');
  const drawerParty = document.getElementById('drawerParty');
  const drawerKarat = document.getElementById('drawerKarat');
  const drawerDetailsHead = document.getElementById('drawerDetailsHead');
  const drawerDetailsBody = document.getElementById('drawerDetailsBody');
  const drawerTotals = document.getElementById('drawerTotals');

  // Apply permissions to UI
  try {
    if (window.ScreenPermissions) {
      if (btnView && !window.ScreenPermissions.has('movement_view')) {
        btnView.style.display = 'none';
      }
      const btnPrintMovement = document.getElementById('btnPrintMovement');
      if (btnPrintMovement && !window.ScreenPermissions.has('movement_print')) {
        btnPrintMovement.style.display = 'none';
      }
    }
  } catch (e) {}

  // Compact mode state
  let compactLevel = 1; // Default: compact level 1
  const SILVER_KARATS = new Set(['999', '925', '900', '800']);

  function createEmptyTypeTotals() {
    return {
      cashDebit: 0,
      cashCredit: 0,
      goldDebit: 0,
      goldCredit: 0,
      silverDebit: 0,
      silverCredit: 0
    };
  }

  function createEmptyMovementTotals() {
    return {
      sales: createEmptyTypeTotals(),
      purchases: createEmptyTypeTotals(),
      receipts: createEmptyTypeTotals(),
      vouchers: createEmptyTypeTotals(),
      journals: createEmptyTypeTotals(),
      grand: createEmptyTypeTotals()
    };
  }
  
  // Store current movement data for printing
  let currentMovementData = {
    type: 'all',
    dateFrom: '',
    dateTo: '',
    goldKarat: 24,
    silverKarat: 999,
    salesData: [],
    purchasesData: [],
    receiptsData: [],
    vouchersData: [],
    journalsData: [],
    totals: createEmptyMovementTotals()
  };
  
  // Helper: Get selected gold karat (default 24)
  function getSelectedGoldKarat() {
    return parseFloat(goldKaratSelect?.value || 24);
  }

  function getSelectedSilverKarat() {
    return parseFloat(silverKaratSelect?.value || 999);
  }
  
  // Helper: Convert karat to selected karat basis
  function karatToSelected(fromKarat) {
    const toKarat = getSelectedGoldKarat();
    const from = parseFloat(fromKarat) || 21;
    return from / toKarat;
  }

  function isSilverKarat(karat) {
    const normalized = String(karat ?? '').trim();
    if (!normalized) return false;
    return SILVER_KARATS.has(normalized) || (Number(normalized) >= 800 && Number(normalized) < 1000);
  }

  function getKaratDisplayText(value) {
    const normalized = String(value ?? '').trim();
    if (!normalized) return '-';
    return normalized.replace(/,/g, ' / ');
  }

  function splitWeightByMetal(weight, karat) {
    const normalizedWeight = parseFloat(weight || 0) || 0;
    if (!normalizedWeight) {
      return { gold: 0, silver: 0 };
    }
    return isSilverKarat(karat)
      ? { gold: 0, silver: normalizedWeight }
      : { gold: normalizedWeight, silver: 0 };
  }

  function appendTypeTotals(target, source) {
    if (!target || !source) return target;
    target.cashDebit += parseFloat(source.cashDebit || 0) || 0;
    target.cashCredit += parseFloat(source.cashCredit || 0) || 0;
    target.goldDebit += parseFloat(source.goldDebit || 0) || 0;
    target.goldCredit += parseFloat(source.goldCredit || 0) || 0;
    target.silverDebit += parseFloat(source.silverDebit || 0) || 0;
    target.silverCredit += parseFloat(source.silverCredit || 0) || 0;
    return target;
  }

  function calculateMovementTotals(items = []) {
    const totals = createEmptyTypeTotals();
    items.forEach((item) => appendTypeTotals(totals, item));
    return totals;
  }

  function getMovementTableColumnCount() {
    return 11;
  }

  function getMovementDetailsColumnCount(type) {
    return type === 'journals' ? 5 : 6;
  }

  function getStoredMovementBranchScopeMode() {
    try {
      const explicitMode = String(
        window.currentBranchScopeContext?.mode
          || window.currentBranchScopeContext?.scope
          || window.parent?.currentBranchScopeContext?.mode
          || window.parent?.currentBranchScopeContext?.scope
          || window.top?.currentBranchScopeContext?.mode
          || window.top?.currentBranchScopeContext?.scope
          || ''
      ).trim().toLowerCase();
      if (explicitMode === 'all') {
        return 'all';
      }
      if (explicitMode) {
        return 'branch';
      }
    } catch (_) {}
    try {
      const params = new URLSearchParams(window.location.search || '');
      const scopeFromUrl = String(params.get('branchScope') || params.get('branch_scope') || '').trim().toLowerCase();
      if (scopeFromUrl === 'all') {
        return 'all';
      }
      if (scopeFromUrl) {
        return 'branch';
      }
    } catch (_) {}
    try {
      const raw = localStorage.getItem('branchScope');
      const parsed = raw ? JSON.parse(raw) : null;
      return String(parsed?.mode || parsed?.scope || parsed?.value || '').trim().toLowerCase() === 'all' ? 'all' : 'branch';
    } catch (_) {
      return 'branch';
    }
  }

  function shouldShowMovementBranchDetails() {
    return getStoredMovementBranchScopeMode() === 'all';
  }

  function getStoredMovementCurrentBranch() {
    try {
      const raw = localStorage.getItem('currentBranch');
      return raw ? JSON.parse(raw) : null;
    } catch (_) {
      return null;
    }
  }

  function getMovementBranchScopePrintText(lang = 'ar') {
    const isEnglish = String(lang || '').trim().toLowerCase() === 'en';
    const allBranchesText = t('movement.print.branchLabels.allBranches') || (isEnglish ? 'All Branches' : 'كل الفروع');
    const notSpecifiedText = isEnglish ? '-' : '-';
    const scopeMode = getStoredMovementBranchScopeMode();
    if (scopeMode === 'all') {
      return allBranchesText;
    }

    let activeBranch = null;
    try {
      activeBranch = window.currentBranchContext
        || window.parent?.currentBranchContext
        || window.top?.currentBranchContext
        || null;
    } catch (_) {}
    if (!activeBranch) {
      activeBranch = getStoredMovementCurrentBranch();
    }

    const branchCode = String(activeBranch?.code || '').trim();
    const branchName = String((isEnglish ? activeBranch?.name_en || activeBranch?.name : activeBranch?.name || activeBranch?.name_en) || '').trim();
    if (branchCode && branchName) return `${branchCode} - ${branchName}`;
    return branchName || branchCode || notSpecifiedText;
  }

  // Set default dates (current month) - using local date format to avoid timezone issues
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const formatLocalDate = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  dateFromInput.value = formatLocalDate(firstDay);
  dateToInput.value = formatLocalDate(today);

  // Helper: Get customer/supplier/account name
  async function getEntityName(type, id) {
    try {
      const result = await window.api?.getMovementEntityName?.({ type, id });
      return result && result.success ? (result.name || null) : null;
    } catch (error) {
      
      return null;
    }
  }

  // Format number with 2 decimals
  function formatNumber(num) {
    try {
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(+num || 0);
    } catch (e) {
      return String(num || '0.00');
    }
  }

  // Format date (Gregorian)
  function formatDate(dateStr) {
    if (!dateStr) return '-';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' });
    } catch (e) {
      return dateStr;
    }
  }

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getMovementBranchText(item) {
    if (!shouldShowMovementBranchDetails()) return '';
    const branchCode = String(item?.branchCode || item?.branch_code || '').trim();
    const branchName = String(item?.branchName || item?.branch_name || '').trim();
    if (branchCode && branchName) return `${branchCode} - ${branchName}`;
    return branchCode || branchName || '';
  }

  function getMovementDocumentCellHtml(item) {
    const docNumber = escapeHtml(String(item?.docNumber ?? '').trim() || '-');
    const branchText = getMovementBranchText(item);
    if (!branchText) return `<span class="movement-doc-number">${docNumber}</span>`;
    const safeBranchText = escapeHtml(branchText);
    return `<span class="movement-doc-cell"><span class="movement-doc-number">${docNumber}</span><span class="movement-branch-badge" title="${safeBranchText}">${safeBranchText}</span></span>`;
  }

  function getMovementItemKey(item) {
    return [
      String(item?.type || ''),
      String(item?.branchId || item?.branch_id || 0),
      String(item?.internalId || item?.docNumber || ''),
      String(item?.docNumber || '')
    ].join('::');
  }

  function buildMovementDetailsRequest(type, documentRef) {
    const request = { type };
    if (documentRef && typeof documentRef === 'object') {
      const normalizedDocNumber = Number(
        documentRef?.docNumber
          ?? documentRef?.branchLocalNumber
          ?? documentRef?.branch_local_number
          ?? documentRef?.manual_number
          ?? 0
      ) || 0;
      const normalizedInternalId = Number(
        documentRef?.internalId
          ?? documentRef?.id
          ?? documentRef?.documentId
          ?? 0
      ) || 0;
      const normalizedBranchId = Number(
        documentRef?.branchId
          ?? documentRef?.branch_id
          ?? documentRef?.selectedBranchId
          ?? 0
      ) || 0;
      if (normalizedDocNumber) {
        request.docNumber = normalizedDocNumber;
        if (type === 'journals') {
          request.manual_number = normalizedDocNumber;
        } else {
          request.branchLocalNumber = normalizedDocNumber;
          request.useBranchLocalNumber = 1;
        }
      }
      if (normalizedInternalId) {
        request.internalId = normalizedInternalId;
      }
      if (normalizedBranchId) {
        request.branchId = normalizedBranchId;
      }
      return request;
    }

    const normalizedDocNumber = Number(documentRef || 0) || 0;
    if (normalizedDocNumber) {
      request.docNumber = normalizedDocNumber;
    }
    return request;
  }

  // ═══════════════════ PROFESSIONAL UI FUNCTIONS ═══════════════════
  
  // Update Summary Strip with totals
  function updateSummaryStrip(totals) {
    if (!summaryStrip) return;
    summaryStrip.style.display = 'grid';
    if (summCashDebit) summCashDebit.textContent = formatNumber(totals.grand.cashDebit);
    if (summCashCredit) summCashCredit.textContent = formatNumber(totals.grand.cashCredit);
    if (summGoldDebit) summGoldDebit.textContent = formatNumber(totals.grand.goldDebit);
    if (summGoldCredit) summGoldCredit.textContent = formatNumber(totals.grand.goldCredit);
    if (summSilverDebit) summSilverDebit.textContent = formatNumber(totals.grand.silverDebit);
    if (summSilverCredit) summSilverCredit.textContent = formatNumber(totals.grand.silverCredit);
  }
  
  // Update Totals Bar
  function updateTotalsBar(totals) {
    if (!totalsBar) return;
    totalsBar.style.display = 'flex';
    if (totalCashDebit) totalCashDebit.textContent = formatNumber(totals.grand.cashDebit);
    if (totalCashCredit) totalCashCredit.textContent = formatNumber(totals.grand.cashCredit);
    if (totalGoldDebit) totalGoldDebit.textContent = formatNumber(totals.grand.goldDebit);
    if (totalGoldCredit) totalGoldCredit.textContent = formatNumber(totals.grand.goldCredit);
    if (totalSilverDebit) totalSilverDebit.textContent = formatNumber(totals.grand.silverDebit);
    if (totalSilverCredit) totalSilverCredit.textContent = formatNumber(totals.grand.silverCredit);
  }
  
  // Update Filter Chips
  function updateFilterChips() {
    if (!filterChips) return;
    const typeText = movementTypeSelect?.options[movementTypeSelect.selectedIndex]?.text || '';
    const karatText = `${goldKaratSelect?.value || '24'} / ${silverKaratSelect?.value || '999'}`;
    const dateFrom = dateFromInput?.value || '';
    const dateTo = dateToInput?.value || '';
    
    const chipType = document.getElementById('chipType');
    const chipKarat = document.getElementById('chipKarat');
    const chipDate = document.getElementById('chipDate');
    
    if (chipType) chipType.textContent = typeText;
    if (chipKarat) chipKarat.textContent = karatText + ' K';
    if (chipDate) chipDate.textContent = `${formatDate(dateFrom)} → ${formatDate(dateTo)}`;
    
    filterChips.style.display = 'flex';
  }
  
  // ═══════════════════ DRAWER FUNCTIONS ═══════════════════
  
  // Open Details Drawer
  function openDrawer(item) {
    if (!detailsDrawer || !drawerOverlay) return;
    
    // Set header info
    const typeLabels = {
      sales: t('movement.badges.sales'),
      purchases: t('movement.badges.purchases'),
      receipts: t('movement.badges.receipts'),
      vouchers: t('movement.badges.vouchers'),
      journals: t('movement.badges.journals')
    };
    
    if (drawerDocType) {
      drawerDocType.textContent = typeLabels[item.type] || item.type;
      drawerDocType.className = `drawer-doc-type type-${item.type === 'sales' ? 'sell' : item.type === 'purchases' ? 'buy' : item.type === 'receipts' ? 'receipt' : item.type === 'vouchers' ? 'voucher' : 'journal'}`;
    }
    const branchText = getMovementBranchText(item);
    if (drawerDocNo) drawerDocNo.textContent = '#' + item.docNumber + (branchText ? ` • ${branchText}` : '');
    if (drawerDate) drawerDate.textContent = formatDate(item.date);
    if (drawerParty) drawerParty.textContent = branchText ? `${item.party || '-'} • ${branchText}` : (item.party || '-');
    if (drawerKarat) drawerKarat.textContent = getKaratDisplayText(item.karat);
    
    const detailsRequest = buildMovementDetailsRequest(item.type, item);
    loadDrawerDetails(item.type, detailsRequest);
    
    // Show drawer
    drawerOverlay.classList.add('active');
    detailsDrawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  
  // Close Details Drawer
  function closeDrawer() {
    if (!detailsDrawer || !drawerOverlay) return;
    drawerOverlay.classList.remove('active');
    detailsDrawer.classList.remove('open');
    document.body.style.overflow = '';
  }
  
  // Load Drawer Details
  async function loadDrawerDetails(type, documentRef) {
    if (!drawerDetailsHead || !drawerDetailsBody) return;
    const detailsColumnCount = getMovementDetailsColumnCount(type);
    
    // Show loading
    drawerDetailsBody.innerHTML = `<tr><td colspan="${detailsColumnCount}" style="text-align:center;padding:20px;"><i class="fa-solid fa-spinner fa-spin"></i></td></tr>`;
    
    try {
      let details = [];
      try {
        details = await fetchDocumentDetails(type, documentRef);
      } catch (e) {
        // If fetchDocumentDetails fails, show empty state instead of error
        details = [];
      }
      
      // Build headers based on type
      let headers = '';
      if (type === 'sales' || type === 'purchases') {
        headers = `
          <tr>
            <th>${t('movement.details.headers.item')}</th>
            <th>${t('movement.details.headers.description')}</th>
            <th>${t('movement.details.headers.karat')}</th>
            <th>${t('movement.details.headers.cash')}</th>
            <th>${t('movement.details.headers.gold')}</th>
            <th>${t('movement.details.headers.silver')}</th>
          </tr>`;
      } else if (type === 'journals') {
        headers = `
          <tr>
            <th>${t('movement.details.headers.account')}</th>
            <th>${t('movement.details.headers.description')}</th>
            <th>${t('movement.details.headers.currencyType')}</th>
            <th>${t('movement.details.headers.debit')}</th>
            <th>${t('movement.details.headers.credit')}</th>
          </tr>`;
      } else {
        headers = `
          <tr>
            <th>${t('movement.details.headers.party')}</th>
            <th>${t('movement.details.headers.description')}</th>
            <th>${t('movement.details.headers.karat')}</th>
            <th>${t('movement.details.headers.cash')}</th>
            <th>${t('movement.details.headers.gold')}</th>
            <th>${t('movement.details.headers.silver')}</th>
          </tr>`;
      }
      drawerDetailsHead.innerHTML = headers;
      
      // Build rows
      if (!details || details.length === 0) {
        drawerDetailsBody.innerHTML = `<tr><td colspan="${detailsColumnCount}" style="text-align:center;padding:20px;color:var(--subtle);">${t('movement.states.emptyHint')}</td></tr>`;
        return;
      }
      
      let rows = '';
      let totalCash = 0, totalGold = 0, totalSilver = 0;
      let totalDebit = 0, totalCredit = 0;
      
      details.forEach(d => {
        if (type === 'sales' || type === 'purchases') {
          const weightByMetal = splitWeightByMetal(d.weight, d.karat);
          rows += `<tr>
            <td>${d.item || '-'}</td>
            <td>${d.note || '-'}</td>
            <td style="text-align:center;">${getKaratDisplayText(d.karat)}</td>
            <td style="text-align:center;">${formatNumber(d.amount || 0)}</td>
            <td style="text-align:center;">${formatNumber(weightByMetal.gold)}</td>
            <td style="text-align:center;">${formatNumber(weightByMetal.silver)}</td>
          </tr>`;
          totalCash += parseFloat(d.amount || 0) || 0;
          totalGold += weightByMetal.gold;
          totalSilver += weightByMetal.silver;
        } else if (type === 'journals') {
          rows += `<tr>
            <td>${d.party || '-'}</td>
            <td>${d.note || '-'}</td>
            <td style="text-align:center;">${d.karat || '-'}</td>
            <td style="text-align:center;">${formatNumber(d.amount || 0)}</td>
            <td style="text-align:center;">${formatNumber(d.credit || 0)}</td>
          </tr>`;
          totalDebit += parseFloat(d.amount || 0) || 0;
          totalCredit += parseFloat(d.credit || 0) || 0;
        } else {
          const weightByMetal = splitWeightByMetal(d.weight, d.karat);
          rows += `<tr>
            <td>${d.party || '-'}</td>
            <td>${d.note || '-'}</td>
            <td style="text-align:center;">${getKaratDisplayText(d.karat)}</td>
            <td style="text-align:center;">${formatNumber(d.amount || 0)}</td>
            <td style="text-align:center;">${formatNumber(weightByMetal.gold)}</td>
            <td style="text-align:center;">${formatNumber(weightByMetal.silver)}</td>
          </tr>`;
          totalCash += parseFloat(d.amount || 0) || 0;
          totalGold += weightByMetal.gold;
          totalSilver += weightByMetal.silver;
        }
      });
      
      drawerDetailsBody.innerHTML = rows;
      
      // Update drawer totals
      if (drawerTotals) {
        if (type === 'journals') {
          drawerTotals.innerHTML = `
            <div class="drawer-total-item">
              <span>${t('movement.drawer.totalDebit')}</span>
              <b>${formatNumber(totalDebit)}</b>
            </div>
            <div class="drawer-total-item">
              <span>${t('movement.drawer.totalCredit')}</span>
              <b>${formatNumber(totalCredit)}</b>
            </div>
          `;
        } else {
          drawerTotals.innerHTML = `
            <div class="drawer-total-item">
              <span>${t('movement.drawer.totalCash')}</span>
              <b>${formatNumber(totalCash)}</b>
            </div>
            <div class="drawer-total-item">
              <span>${t('movement.drawer.totalGold')}</span>
              <b>${formatNumber(totalGold)}</b>
            </div>
            <div class="drawer-total-item">
              <span>${t('movement.drawer.totalSilver')}</span>
              <b>${formatNumber(totalSilver)}</b>
            </div>
          `;
        }
      }
      
    } catch (error) {
      // Show empty state instead of error
      drawerDetailsBody.innerHTML = `<tr><td colspan="${detailsColumnCount}" style="text-align:center;padding:20px;color:var(--subtle);">${t('movement.states.emptyHint')}</td></tr>`;
    }
  }
  
  // Drawer Event Listeners
  if (drawerClose) {
    drawerClose.addEventListener('click', closeDrawer);
  }
  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', closeDrawer);
  }
  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && detailsDrawer?.classList.contains('open')) {
      closeDrawer();
    }
  });

  function getMovementBadgeLabel(type) {
    if (!type) return '';
    return t(`movement.badges.${type}`);
  }

  // Get transaction type badge HTML with icons
  function createMovementTypeBadge(type) {
    const icons = {
      'sales': '<i class="fa-solid fa-arrow-up-right-dots"></i>',
      'purchases': '<i class="fa-solid fa-arrow-down-wide-short"></i>',
      'receipts': '<i class="fa-solid fa-hand-holding-dollar"></i>',
      'vouchers': '<i class="fa-solid fa-money-bill-transfer"></i>',
      'journals': '<i class="fa-solid fa-file-lines"></i>'
    };
    
    const classes = {
      'sales': 'type-sell',
      'purchases': 'type-buy',
      'receipts': 'type-receipt',
      'vouchers': 'type-voucher',
      'journals': 'type-journal'
    };
    
    if (icons[type]) {
      if (type === 'sales' || type === 'purchases') {
        // Sales/Purchase badges show both Arabic and English
        return `<span class="type-badge ${classes[type] || ''}">${icons[type] || ''} ${t(`movement.badges.${type}`)} ${t(`movement.badges.${type}En`)}</span>`;
      } else {
        // Other badges show only Arabic
        return `<span class="type-badge ${classes[type] || ''}">${icons[type] || ''} ${t(`movement.badges.${type}`)}</span>`;
      }
    }
    
    return `<span class="type-badge">${type}</span>`;
  }

  function hideMovementInsights() {
    if (summaryStrip) summaryStrip.style.display = 'none';
    if (totalsBar) totalsBar.style.display = 'none';
    if (filterChips) filterChips.style.display = 'none';
    const notice = document.getElementById('goldKaratNotice');
    if (notice) notice.style.display = 'none';
  }

  function getMovementLoadingHint() {
    return getMovementLang() === 'en'
      ? 'Please wait while movement rows are prepared and results are assembled.'
      : 'يرجى الانتظار بينما يتم تجهيز الحركات وتجميع النتائج.';
  }

  function getMovementErrorHint() {
    return getMovementLang() === 'en'
      ? 'Please review the selected filters and try again.'
      : 'يرجى مراجعة الفلاتر المحددة ثم إعادة المحاولة.';
  }

  function renderMovementStateRow({ stateClass = '', icon = 'fa-solid fa-circle-info', title = '', subtitle = '', loading = false } = {}) {
    return `
      <tr class="movement-state-row ${stateClass}">
        <td colspan="${getMovementTableColumnCount()}">
          <div class="${loading ? 'movement-loading-state' : 'movement-state-panel'} ${stateClass}" ${loading ? 'role="status" aria-live="polite"' : ''}>
            ${loading
              ? '<div class="movement-loading-spinner" aria-hidden="true"></div>'
              : `<div class="movement-state-icon" aria-hidden="true"><i class="${icon}"></i></div>`}
            <div class="movement-state-title">${escapeHtml(title)}</div>
            ${subtitle ? `<div class="movement-state-subtitle">${escapeHtml(subtitle)}</div>` : ''}
            ${loading ? '<div class="movement-loading-bars" aria-hidden="true"><span class="movement-loading-bar"></span><span class="movement-loading-bar"></span><span class="movement-loading-bar"></span></div>' : ''}
          </div>
        </td>
      </tr>
    `;
  }

  // Show loading indicator
  function showLoading() {
    if (loadingIndicator) loadingIndicator.style.display = 'none';
    hideMovementInsights();
    tableBody.innerHTML = renderMovementStateRow({
      stateClass: 'is-loading',
      title: t('movement.states.loading'),
      subtitle: getMovementLoadingHint(),
      loading: true
    });
  }

  // Hide loading indicator
  function hideLoading() {
    if (loadingIndicator) loadingIndicator.style.display = 'none';
  }

  // Show error message
  function showError(key, params = {}) {
    hideMovementInsights();
    tableBody.innerHTML = renderMovementStateRow({
      stateClass: 'is-error',
      icon: 'fa-solid fa-triangle-exclamation',
      title: tFmt(key, params),
      subtitle: getMovementErrorHint()
    });
  }

  // Show empty state
  function showEmpty() {
    hideMovementInsights();
    tableBody.innerHTML = renderMovementStateRow({
      stateClass: 'is-empty',
      icon: 'fa-solid fa-inbox',
      title: t('movement.states.emptyTitle'),
      subtitle: t('movement.states.emptyHint')
    });
  }

  // Fetch Sales Invoices
  async function fetchSalesInvoices(dateFrom, dateTo, goldBasis = 24, silverBasis = 999) {
    try{
      const result = await window.api?.getMovementSalesSummary?.({ dateFrom, dateTo, goldBasis, silverBasis });
      if (!result || !result.success || !Array.isArray(result.data)) {
        return [];
      }
      
      // Get customer names
      const mapped = await Promise.all(result.data.map(async (inv) => {
        let customerName = inv.customer_name;
        if (!customerName && inv.customer_id) {
          customerName = await getEntityName('customer', inv.customer_id);
        }
        
        const item = {
          date: inv.date,
          docNumber: inv.branch_local_number || inv.id,
          internalId: inv.id,
          branchId: Number(inv.branch_id || 0) || 0,
          branchName: inv.branch_name || '',
          branchCode: inv.branch_code || '',
          type: 'sales',
          party: customerName || tFmt('movement.entityLabels.customer', {id: inv.customer_id}),
          description: inv.description || '-',
          karat: inv.karat || '-',
          lineCount: parseInt(inv.line_count) || 0,
          cashDebit: parseFloat(inv.cash_total || 0),     // مدين ريال (دخول نقد)
          cashCredit: 0,
          goldDebit: 0,
          goldCredit: parseFloat(inv.gold_total || 0), // دائن ذهب (خروج مخزون)
          silverDebit: 0,
          silverCredit: parseFloat(inv.silver_total || 0),
          sortDate: new Date(inv.date).getTime()
        };
        
        return item;
      }));
      
      return mapped;
    } catch (error) {
      
      return [];
    }
  }

  // Fetch Purchase Invoices
  async function fetchPurchaseInvoices(dateFrom, dateTo, goldBasis = 24, silverBasis = 999) {
    try {
      const result = await window.api?.getMovementPurchasesSummary?.({ dateFrom, dateTo, goldBasis, silverBasis });
      if (!result || !result.success || !Array.isArray(result.data)) {
        return [];
      }
      
      // Get supplier names (note: purchase_invoices uses customer_id/customer_name for supplier data)
      const mapped = await Promise.all(result.data.map(async (inv) => {
        let supplierName = inv.supplier_name; // This is customer_name from the query
        
        // If no name from query, try to fetch from customers table (not suppliers!)
        if (!supplierName && inv.supplier_id) {
          supplierName = await getEntityName('customer', inv.supplier_id);
        }
        
        const item = {
          date: inv.date,
          docNumber: inv.branch_local_number || inv.id,
          internalId: inv.id,
          branchId: Number(inv.branch_id || 0) || 0,
          branchName: inv.branch_name || '',
          branchCode: inv.branch_code || '',
          type: 'purchases',
          party: supplierName || (inv.supplier_id ? tFmt('movement.entityLabels.supplier', {id: inv.supplier_id}) : '-'),
          description: inv.description || '-',
          karat: inv.karat || '-',
          lineCount: parseInt(inv.line_count) || 0,
          cashDebit: 0,
          cashCredit: parseFloat(inv.cash_total || 0),     // دائن ريال (خروج نقد للمورد)
          goldDebit: parseFloat(inv.gold_total || 0),   // مدين ذهب (دخول للمخزون)
          goldCredit: 0,
          silverDebit: parseFloat(inv.silver_total || 0),
          silverCredit: 0,
          sortDate: new Date(inv.date).getTime()
        };
        
        return item;
      }));
      
      return mapped;
    } catch (error) {
      
      return [];
    }
  }

  // Fetch Receipts
  async function fetchReceipts(dateFrom, dateTo, goldBasis = 24, silverBasis = 999) {
    try {
      const result = await window.api?.getMovementReceiptsSummary?.({ dateFrom, dateTo, goldBasis, silverBasis });
      if (!result || !result.success || !Array.isArray(result.data)) {
        return [];
      }
      
      // Get entity names (now from MAX aggregation)
      const mapped = result.data.map((rec) => {
        let entityLabel = '-';
        
        // Pick the first non-null entity name
        if (rec.customer_name) {
          entityLabel = rec.customer_name;
        } else if (rec.supplier_name) {
          entityLabel = rec.supplier_name;
        } else if (rec.account_name) {
          entityLabel = rec.account_name;
        }
        
        
        const item = {
          date: rec.date,
          docNumber: rec.branch_local_number || rec.id,
          internalId: rec.id,
          branchId: Number(rec.branch_id || 0) || 0,
          branchName: rec.branch_name || '',
          branchCode: rec.branch_code || '',
          type: 'receipts',
          party: entityLabel,
          description: rec.memo || '-',
          karat: rec.karat || '-',
          lineCount: parseInt(rec.line_count) || 0,
          cashDebit: parseFloat(rec.cash_amount || 0),
          cashCredit: 0,
          goldDebit: parseFloat(rec.gold_amount || 0),
          goldCredit: 0,
          silverDebit: parseFloat(rec.silver_amount || 0),
          silverCredit: 0,
          sortDate: new Date(rec.date).getTime()
        };
        
        return item;
      });
      
      return mapped;
    } catch (error) {
      
      return [];
    }
  }

  // Fetch Vouchers
  async function fetchVouchers(dateFrom, dateTo, goldBasis = 24, silverBasis = 999) {
    try {
      const result = await window.api?.getMovementVouchersSummary?.({ dateFrom, dateTo, goldBasis, silverBasis });
      if (!result || !result.success || !Array.isArray(result.data)) {
        return [];
      }
      
      // Get entity names (now from MAX aggregation)
      const mapped = result.data.map((vou) => {
        let entityLabel = '-';
        
        // Pick the first non-null entity name
        if (vou.customer_name) {
          entityLabel = vou.customer_name;
        } else if (vou.supplier_name) {
          entityLabel = vou.supplier_name;
        } else if (vou.account_name) {
          entityLabel = vou.account_name;
        }
        
        
        const item = {
          date: vou.date,
          docNumber: vou.branch_local_number || vou.id,
          internalId: vou.id,
          branchId: Number(vou.branch_id || 0) || 0,
          branchName: vou.branch_name || '',
          branchCode: vou.branch_code || '',
          type: 'vouchers',
          party: entityLabel,
          description: vou.memo || '-',
          karat: vou.karat || '-',
          lineCount: parseInt(vou.line_count) || 0,
          cashDebit: 0,
          cashCredit: parseFloat(vou.cash_amount || 0),
          goldDebit: 0,
          goldCredit: parseFloat(vou.gold_amount || 0),
          silverDebit: 0,
          silverCredit: parseFloat(vou.silver_amount || 0),
          sortDate: new Date(vou.date).getTime()
        };
        
        return item;
      });
      
      return mapped;
    } catch (error) {
      
      return [];
    }
  }

  // Fetch Journal Entries (manual entries only, excludes auto-generated from invoices/vouchers)
  async function fetchJournals(dateFrom, dateTo, goldBasis = 24, silverBasis = 999) {
    try {
      const result = await window.api?.getMovementJournalsSummary?.({ dateFrom, dateTo, goldBasis, silverBasis });
      if (!result || !result.success || !Array.isArray(result.data)) {
        return [];
      }
      
      const mapped = result.data.map((jou) => {
        return {
          date: jou.date,
          docNumber: jou.manual_number || jou.id,
          internalId: jou.id,  // Internal ID for fetching details
          branchId: Number(jou.branch_id || 0) || 0,
          branchName: jou.branch_name || '',
          branchCode: jou.branch_code || '',
          type: 'journals',
          party: '-',  // القيود مجمعة من عدة حسابات
          description: jou.description || '-',
          karat: '-',  // القيود مجمعة من عدة عملات
          lineCount: parseInt(jou.line_count) || 0,
          cashDebit: parseFloat(jou.cash_debit || 0),
          cashCredit: parseFloat(jou.cash_credit || 0),
          goldDebit: parseFloat(jou.gold_debit || 0),
          goldCredit: parseFloat(jou.gold_credit || 0),
          silverDebit: parseFloat(jou.silver_debit || 0),
          silverCredit: parseFloat(jou.silver_credit || 0),
          sortDate: new Date(jou.date).getTime()
        };
      });
      
      return mapped;
    } catch (error) {
      
      return [];
    }
  }

  // Create group header row
  function createGroupHeader(title, colspan = getMovementTableColumnCount()) {
    return `
      <tr class="group-header-row">
        <td colspan="${colspan}">${title}</td>
      </tr>
    `;
  }

  // Store items for drawer access
  const movementItems = new Map();
  
  // Create data row (clickable to open drawer)
  function createDataRow(item) {
    // Store item in map for drawer access
    const itemKey = getMovementItemKey(item);
    const encodedItemKey = encodeURIComponent(itemKey);
    movementItems.set(itemKey, item);
    
    return `
      <tr data-type="${escapeHtml(item.type)}" data-doc="${escapeHtml(String(item.docNumber ?? ''))}" onclick="openMovementDrawerByKey('${encodedItemKey}')" style="cursor: pointer;">
        <td>${formatDate(item.date)}</td>
        <td style="text-align: center;">${getMovementDocumentCellHtml(item)}</td>
        <td>${createMovementTypeBadge(item.type)}</td>
        <td>${escapeHtml(item.party || '-')}</td>
        <td class="number-cell cash-debit-cell">${formatNumber(item.cashDebit)}</td>
        <td class="number-cell cash-credit-cell">${formatNumber(item.cashCredit)}</td>
        <td class="karat-cell">${escapeHtml(getKaratDisplayText(item.karat))}</td>
        <td class="number-cell gold-debit-cell">${formatNumber(item.goldDebit)}</td>
        <td class="number-cell gold-credit-cell">${formatNumber(item.goldCredit)}</td>
        <td class="number-cell silver-debit-cell">${formatNumber(item.silverDebit)}</td>
        <td class="number-cell silver-credit-cell">${formatNumber(item.silverCredit)}</td>
      </tr>
    `;
  }
  
  window.openMovementDrawerByKey = function(encodedItemKey) {
    const itemKey = decodeURIComponent(String(encodedItemKey || ''));
    const item = movementItems.get(itemKey);
    if (item) {
      openDrawer(item);
    }
  };

  window.openMovementDrawer = function(type, docNumber) {
    const item = Array.from(movementItems.values()).find((entry) => entry.type === type && String(entry.docNumber) === String(docNumber));
    if (item) {
      openDrawer(item);
    }
  };

  // Create subtotal row
  function createSubtotalRow(label, cashDebit, cashCredit, goldDebit, goldCredit, silverDebit, silverCredit) {
    return `
      <tr class="subtotal-row">
        <td colspan="4" style="text-align: right; font-weight: 700;">${label}</td>
        <td class="number-cell">${formatNumber(cashDebit)}</td>
        <td class="number-cell">${formatNumber(cashCredit)}</td>
        <td></td>
        <td class="number-cell">${formatNumber(goldDebit)}</td>
        <td class="number-cell">${formatNumber(goldCredit)}</td>
        <td class="number-cell">${formatNumber(silverDebit)}</td>
        <td class="number-cell">${formatNumber(silverCredit)}</td>
      </tr>
    `;
  }

  // Create grand total row
  function createGrandTotalRow(cashDebit, cashCredit, goldDebit, goldCredit, silverDebit, silverCredit) {
    return `
      <tr class="grand-total-row">
        <td colspan="4" style="text-align: right; font-weight: 800;">${t('movement.totals.grand')}</td>
        <td class="number-cell">${formatNumber(cashDebit)}</td>
        <td class="number-cell">${formatNumber(cashCredit)}</td>
        <td></td>
        <td class="number-cell">${formatNumber(goldDebit)}</td>
        <td class="number-cell">${formatNumber(goldCredit)}</td>
        <td class="number-cell">${formatNumber(silverDebit)}</td>
        <td class="number-cell">${formatNumber(silverCredit)}</td>
      </tr>
    `;
  }

  // Load and display movements
  async function loadMovements() {
    await ensureMovementTranslationsReady();
    const movementType = movementTypeSelect.value;
    const dateFrom = dateFromInput.value;
    const dateTo = dateToInput.value;
    const goldBasis = getSelectedGoldKarat(); // Get selected karat
    const silverBasis = getSelectedSilverKarat();

    if (!dateFrom || !dateTo) {
      showError('movement.errors.missingDates');
      return;
    }

    tableBody.innerHTML = '';
    movementItems.clear();
    showLoading();

    try {
      let salesData = [];
      let purchasesData = [];
      let receiptsData = [];
      let vouchersData = [];
      let journalsData = [];

      // Fetch data based on selected type with gold/silver basis
      if (movementType === 'all' || movementType === 'sales') {
        salesData = await fetchSalesInvoices(dateFrom, dateTo, goldBasis, silverBasis);
      }
      if (movementType === 'all' || movementType === 'purchases') {
        purchasesData = await fetchPurchaseInvoices(dateFrom, dateTo, goldBasis, silverBasis);
      }
      if (movementType === 'all' || movementType === 'receipts') {
        receiptsData = await fetchReceipts(dateFrom, dateTo, goldBasis, silverBasis);
      }
      if (movementType === 'all' || movementType === 'vouchers') {
        vouchersData = await fetchVouchers(dateFrom, dateTo, goldBasis, silverBasis);
      }
      if (movementType === 'all' || movementType === 'journals') {
        journalsData = await fetchJournals(dateFrom, dateTo, goldBasis, silverBasis);
      }

      // Store data for printing
      currentMovementData = {
        type: movementType,
        dateFrom: dateFrom,
        dateTo: dateTo,
        goldKarat: goldBasis,
        silverKarat: silverBasis,
        salesData: salesData,
        purchasesData: purchasesData,
        receiptsData: receiptsData,
        vouchersData: vouchersData,
        journalsData: journalsData,
        totals: createEmptyMovementTotals()
      };

      // Build HTML
      let html = '';
      const grandTotals = createEmptyTypeTotals();
      const groupedMovementConfigs = [
        { key: 'sales', label: t('movement.groups.sales'), data: salesData },
        { key: 'purchases', label: t('movement.groups.purchases'), data: purchasesData },
        { key: 'receipts', label: t('movement.groups.receipts'), data: receiptsData },
        { key: 'vouchers', label: t('movement.groups.vouchers'), data: vouchersData },
        { key: 'journals', label: t('movement.groups.journals'), data: journalsData },
      ];

      if (movementType === 'all') {
        groupedMovementConfigs.forEach(({ key, label, data }) => {
          if (!Array.isArray(data) || data.length === 0) {
            return;
          }
          data.sort((a, b) => a.sortDate - b.sortDate);
          const typeTotals = calculateMovementTotals(data);
          currentMovementData.totals[key] = { ...typeTotals };
          appendTypeTotals(grandTotals, typeTotals);
          html += createGroupHeader(label);
          data.forEach((item) => {
            html += createDataRow(item);
          });
          html += createSubtotalRow(
            t(`movement.totals.${key}`),
            typeTotals.cashDebit,
            typeTotals.cashCredit,
            typeTotals.goldDebit,
            typeTotals.goldCredit,
            typeTotals.silverDebit,
            typeTotals.silverCredit
          );
        });

        if (html) {
          html += createGrandTotalRow(
            grandTotals.cashDebit,
            grandTotals.cashCredit,
            grandTotals.goldDebit,
            grandTotals.goldCredit,
            grandTotals.silverDebit,
            grandTotals.silverCredit
          );
          currentMovementData.totals.grand = { ...grandTotals };
        }

      } else {
        const selectedTypeConfig = groupedMovementConfigs.find((entry) => entry.key === movementType) || null;
        const data = Array.isArray(selectedTypeConfig?.data) ? selectedTypeConfig.data : [];

        if (data.length > 0 && selectedTypeConfig) {
          data.sort((a, b) => a.sortDate - b.sortDate);
          const typeTotals = calculateMovementTotals(data);
          
          data.forEach(item => {
            html += createDataRow(item);
          });
          
          html += createSubtotalRow(
            t('movement.totals.group', { type: selectedTypeConfig.label }),
            typeTotals.cashDebit,
            typeTotals.cashCredit,
            typeTotals.goldDebit,
            typeTotals.goldCredit,
            typeTotals.silverDebit,
            typeTotals.silverCredit
          );
          
          // Save totals for single type
          currentMovementData.totals.grand = { ...typeTotals };
          currentMovementData.totals[movementType] = { ...typeTotals };
        }
      }

      if (html) {
        tableBody.innerHTML = html;
        // Show metal basis notice
        const notice = document.getElementById('goldKaratNotice');
        const displayedGoldKarat = document.getElementById('displayedGoldKarat');
        const displayedSilverKarat = document.getElementById('displayedSilverKarat');
        if (notice) {
          if (displayedGoldKarat) displayedGoldKarat.textContent = getSelectedGoldKarat();
          if (displayedSilverKarat) displayedSilverKarat.textContent = getSelectedSilverKarat();
          notice.style.display = 'flex';
        }
        
        // Update professional UI elements
        updateSummaryStrip(currentMovementData.totals);
        updateTotalsBar(currentMovementData.totals);
        updateFilterChips();
        
      } else {
        showEmpty();
      }

    } catch (error) {
      
      showError('movement.errors.loadingError');
    } finally {
      hideLoading();
    }
  }

  // Event Listeners
  if (btnView) {
    btnView.addEventListener('click', () => {
      if (window.ScreenPermissions && !window.ScreenPermissions.check('movement_view', t('movement.permissions.view'))) {
        return;
      }
      loadMovements();
    });
  } else {
    
  }

  // Load on Enter key in date inputs
  if (dateFromInput) {
    dateFromInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') loadMovements();
    });
  }
  if (dateToInput) {
    dateToInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') loadMovements();
    });
  }

  // Toggle details for receipts/vouchers
  window.toggleDetails = async function(type, docNumber) {
    const mainRow = document.querySelector(`tr[data-type="${type}"][data-doc="${docNumber}"]`);
    if (!mainRow) return;

    const detailsRowId = `details-${type}-${docNumber}`;
    const existingDetails = document.getElementById(detailsRowId);
    const icon = document.getElementById(`expand-icon-${type}-${docNumber}`);
    const btn = document.getElementById(`expand-btn-${type}-${docNumber}`);

    // If details already exist, toggle them
    if (existingDetails) {
      if (existingDetails.style.display === 'none') {
        existingDetails.style.display = '';
        btn?.classList.add('expanded');
      } else {
        existingDetails.style.display = 'none';
        btn?.classList.remove('expanded');
      }
      return;
    }

    // Fetch details
    try {
      icon.classList.add('fa-spin', 'fa-spinner');
      const matchingItem = Array.from(movementItems.values()).find((entry) => entry.type === type && String(entry.docNumber) === String(docNumber));
      const details = await fetchDocumentDetails(type, matchingItem || docNumber);
      icon.classList.remove('fa-spin', 'fa-spinner');
      
      if (!details || details.length === 0) {
        
        return;
      }

      // Create details row
      const detailsRow = document.createElement('tr');
      detailsRow.id = detailsRowId;
      detailsRow.className = 'details-row';
      
      // Build table based on type
      let tableHTML = '';
      if (type === 'sales' || type === 'purchases') {
        // For invoices: show item name in a separate column
        tableHTML = `
          <table class="details-table">
            <thead>
              <tr>
                <th>${t('movement.details.headers.customer')}</th>
                <th>${t('movement.details.headers.item')}</th>
                <th>${t('movement.details.headers.description')}</th>
                <th>${t('movement.details.headers.karat')}</th>
                <th>${t('movement.details.headers.cash')}</th>
                <th>${t('movement.details.headers.gold')}</th>
                <th>${t('movement.details.headers.silver')}</th>
              </tr>
            </thead>
            <tbody>
              ${details.map(d => {
                const weightByMetal = splitWeightByMetal(d.weight, d.karat);
                return `
                <tr>
                  <td>${d.party || '-'}</td>
                  <td>${d.item || '-'}</td>
                  <td>${d.note || '-'}</td>
                  <td style="text-align: center;">${getKaratDisplayText(d.karat)}</td>
                  <td class="number-cell">${formatNumber(d.amount || 0)}</td>
                  <td class="number-cell">${formatNumber(weightByMetal.gold)}</td>
                  <td class="number-cell">${formatNumber(weightByMetal.silver)}</td>
                </tr>
              `;
              }).join('')}
            </tbody>
          </table>
        `;
      } else if (type === 'journals') {
        // For journals: show debit and credit
        tableHTML = `
          <table class="details-table">
            <thead>
              <tr>
                <th>${t('movement.details.headers.account')}</th>
                <th>${t('movement.details.headers.description')}</th>
                <th>${t('movement.details.headers.currencyType')}</th>
                <th>${t('movement.details.headers.debit')}</th>
                <th>${t('movement.details.headers.credit')}</th>
              </tr>
            </thead>
            <tbody>
              ${details.map(d => `
                <tr>
                  <td>${d.party || '-'}</td>
                  <td>${d.note || '-'}</td>
                  <td style="text-align: center;">${d.karat || '-'}</td>
                  <td class="number-cell">${formatNumber(d.amount || 0)}</td>
                  <td class="number-cell">${formatNumber(d.credit || 0)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
      } else {
        // For receipts, vouchers: original format
        tableHTML = `
          <table class="details-table">
            <thead>
              <tr>
                <th>${t('movement.details.headers.party')}</th>
                <th>${t('movement.details.headers.description')}</th>
                <th>${t('movement.details.headers.karat')}</th>
                <th>${t('movement.details.headers.cash')}</th>
                <th>${t('movement.details.headers.gold')}</th>
                <th>${t('movement.details.headers.silver')}</th>
              </tr>
            </thead>
            <tbody>
              ${details.map(d => {
                const weightByMetal = splitWeightByMetal(d.weight, d.karat);
                return `
                <tr>
                  <td>${d.party || '-'}</td>
                  <td>${d.note || '-'}</td>
                  <td style="text-align: center;">${getKaratDisplayText(d.karat)}</td>
                  <td class="number-cell">${formatNumber(d.amount || 0)}</td>
                  <td class="number-cell">${formatNumber(weightByMetal.gold)}</td>
                  <td class="number-cell">${formatNumber(weightByMetal.silver)}</td>
                </tr>
              `;
              }).join('')}
            </tbody>
          </table>
        `;
      }
      
      detailsRow.innerHTML = `
        <td colspan="${getMovementTableColumnCount()}" style="padding: 0;">
          <div class="details-container">
            ${tableHTML}
          </div>
        </td>
      `;

      mainRow.parentNode.insertBefore(detailsRow, mainRow.nextSibling);
      btn?.classList.add('expanded');

    } catch (error) {
      
      icon.classList.remove('fa-spin', 'fa-spinner');
      icon.classList.add('fa-chevron-down');
      btn?.classList.remove('expanded');
    }
  };

  // Fetch document details
  async function fetchDocumentDetails(type, documentRef) {
    try {
      const requestPayload = buildMovementDetailsRequest(type, documentRef);
      if (!requestPayload.docNumber && !requestPayload.internalId && !requestPayload.branchLocalNumber && !requestPayload.manual_number) {
        return [];
      }
      const result = await window.api?.getMovementDocumentDetails?.(requestPayload);
      const rows = (result && result.success && Array.isArray(result.data)) ? result.data : [];

      // Map based on type
      if (type === 'receipts' || type === 'vouchers') {
        return rows.map(row => ({
          party: row.customer_name || row.supplier_name || row.account_name || '-',
          note: row.note || '-',
          karat: row.karat || '-',
          amount: parseFloat(row.amount || 0),
          weight: parseFloat(row.weight || 0)
        }));
      } else if (type === 'sales') {
        return rows.map(row => ({
          party: row.customer_name || '-',
          note: row.invoice_description || '-',
          karat: row.karat || '-',
          amount: parseFloat(row.value || 0),
          weight: parseFloat(row.weight || 0),
          item: row.item_name || row.description || '-'
        }));
      } else if (type === 'purchases') {
        return rows.map(row => ({
          party: row.supplier_name || '-',
          note: row.invoice_description || '-',
          karat: row.karat || '-',
          amount: parseFloat(row.value || 0),
          weight: parseFloat(row.weight || 0),
          item: row.item_name || row.description || '-'
        }));
      } else if (type === 'journals') {
        return rows.map(row => ({
          party: row.account_name || '-',
          note: row.journal_description || row.line_description || '-',
          karat: row.currency_type || '-',
          amount: parseFloat(row.debit || 0),
          credit: parseFloat(row.credit || 0),
          weight: 0
        }));
      }
      
      return [];
    } catch (error) {
      
      return [];
    }
  }

  // Apply compact mode function
  function applyCompactMode(level) {
    compactLevel = level;
    
    // Remove all compact classes
    movementTable.classList.remove('compact-1', 'compact-2', 'compact-3', 'compact-4');
    
    // Add compact class (always between 1-4)
    movementTable.classList.add(`compact-${compactLevel}`);
    btnCompact.classList.add('active');
    btnCompact.innerHTML = `<i class="fa-solid fa-arrows-up-down"></i> ${compactLevel}`;
    btnCompact.title = `ضغط المستوى ${compactLevel}`;
  }

  // Compact button handler
  // Initialize compact button
  if (btnCompact) {
    
    btnCompact.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Cycle through compact levels: 1 -> 2 -> 3 -> 4 -> 1
      compactLevel = (compactLevel % 4) + 1;
      
      applyCompactMode(compactLevel);
    }, false);

    // Apply initial compact mode
    applyCompactMode(compactLevel);
  } else {
    
    
    
  }

  // Gold karat change listener - reload data with new karat
  if (goldKaratSelect) {
    goldKaratSelect.addEventListener('change', async function() {
      const displayedGoldKarat = document.getElementById('displayedGoldKarat');
      if (displayedGoldKarat) {
        displayedGoldKarat.textContent = goldKaratSelect.value;
      }
      if (tableBody.children.length > 0) {
        await loadMovements();
      }
    });
  }

  if (silverKaratSelect) {
    silverKaratSelect.addEventListener('change', async function() {
      const displayedSilverKarat = document.getElementById('displayedSilverKarat');
      if (displayedSilverKarat) {
        displayedSilverKarat.textContent = silverKaratSelect.value;
      }
      if (tableBody.children.length > 0) {
        await loadMovements();
      }
    });
  }

  // Print button handler
  const btnPrintMovement = document.getElementById('btnPrintMovement');
  if (btnPrintMovement) {
    btnPrintMovement.addEventListener('click', async function() {
      if (window.ScreenPermissions && !window.ScreenPermissions.check('movement_print', t('movement.permissions.print'))) {
        return;
      }
      // Check if data is loaded
      if (!currentMovementData.dateFrom || !currentMovementData.dateTo) {
        showAlert(t('movement.errors.noPrintData'), 'warning');
        return;
      }
      
      // Check if there is actual data to print
      const hasData = (currentMovementData.salesData?.length > 0) ||
                      (currentMovementData.purchasesData?.length > 0) ||
                      (currentMovementData.receiptsData?.length > 0) ||
                      (currentMovementData.vouchersData?.length > 0) ||
                      (currentMovementData.journalsData?.length > 0);
      
      if (!hasData) {
        showAlert(t('movement.errors.noDataToPrint'), 'warning');
        return;
      }

      await printMovement();
    });
  }

  // Print movement function - Professional Design
  async function printMovement() {
    try {
      // Load company info
      let company = {};
      try {
        if (window.api && window.api.getCompanyInfo) {
          const cr = await window.api.getCompanyInfo();
          if (cr && cr.success) company = cr.company || {};
        }
      } catch (e) {
        // Error loading company info
      }

      const logoUrl = (company && company.logoData) ? company.logoData : 
                      (company && company.logo ? ('file:///' + String(company.logo).replace(/\\/g, '/')) : '');
      
      const nf2 = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      
      // Format dates as Gregorian DD/MM/YYYY
      const formatDatePrint = (d) => {
        if (!d) return '';
        try {
          const date = new Date(d);
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = date.getFullYear();
          return `${day}/${month}/${year}`;
        } catch (e) {
          return d;
        }
      };

      // Get movement type label
      let typeLabel = t('movement.print.allMovements');
      switch (currentMovementData.type) {
        case 'sales': typeLabel = t('movement.groups.sales'); break;
        case 'purchases': typeLabel = t('movement.groups.purchases'); break;
        case 'receipts': typeLabel = t('movement.groups.receipts'); break;
        case 'vouchers': typeLabel = t('movement.groups.vouchers'); break;
        case 'journals': typeLabel = t('movement.groups.journals'); break;
      }

      // Build rows HTML with current column order including silver debit/credit
      let rowsHtml = '';
      let rowNumber = 1;

      // Function to create operation type badge
      const getTypeBadgePrint = (typeText) => {
        const typeMap = {
          'sales': { bg: '#DC2626', bilingual: true },
          'purchases': { bg: '#2563EB', bilingual: true },
          'receipts': { bg: '#10B981', bilingual: false },
          'vouchers': { bg: '#F59E0B', bilingual: false },
          'journals': { bg: '#8B5CF6', bilingual: false }
        };
        
        const badge = typeMap[typeText] || { bg: '#6B7280', bilingual: false };
        let label = '';
        
        if (badge.bilingual) {
          // فاتورة بيع/شراء تبقى ثنائية اللغة
          const textAr = typeText === 'sales' ? 'بيع' : 'شراء';
          const textEn = typeText === 'sales' ? 'SELL' : 'BUY';
          label = `${textEn} ${textAr}`;
        } else {
          // سند قبض/صرف/قيد يتأثر بالترجمة
          label = t(`movement.badges.${typeText}`);
        }
        
        return `<span style="display:inline-block; background:${badge.bg}; color:#fff; padding:4px 10px; border-radius:12px; font-size:9px; font-weight:700; white-space:nowrap;">${label}</span>`;
      };

      const buildRowsForType = (data, type) => {
        let html = '';
        data.forEach(item => {
          let formattedDate = item.date ? formatDatePrint(item.date) : '-';
          const branchText = getMovementBranchText(item);
          const docDisplayHtml = branchText
            ? `<span style="display:inline-flex;align-items:center;gap:6px;white-space:nowrap;"><span>${escapeHtml(item.docNumber || '-')}</span><span style="font-size:9px;color:#6b7280;">${escapeHtml(branchText)}</span></span>`
            : escapeHtml(item.docNumber || '-');
          
          html += `<tr>
            <td>${rowNumber++}</td>
            <td>${formattedDate}</td>
            <td>${docDisplayHtml}</td>
            <td>${getTypeBadgePrint(item.type || type)}</td>
            <td class="text-right">${escapeHtml(item.party || '-')}</td>
            <td class="num">${nf2.format(item.cashDebit || 0)}</td>
            <td class="num">${nf2.format(item.cashCredit || 0)}</td>
            <td>${escapeHtml(getKaratDisplayText(item.karat))}</td>
            <td class="num">${nf2.format(item.goldDebit || 0)}</td>
            <td class="num">${nf2.format(item.goldCredit || 0)}</td>
            <td class="num">${nf2.format(item.silverDebit || 0)}</td>
            <td class="num">${nf2.format(item.silverCredit || 0)}</td>
            <td class="text-right">${escapeHtml(item.description || '-')}</td>
          </tr>`;
        });
        return html;
      };

      if (currentMovementData.type === 'all') {
        if (currentMovementData.salesData.length > 0) {
          rowsHtml += `<tr class="group-row sales"><td colspan="13">📋 ${t('movement.groups.sales')}</td></tr>`;
          rowsHtml += buildRowsForType(currentMovementData.salesData, 'sales');
        }
        if (currentMovementData.purchasesData.length > 0) {
          rowsHtml += `<tr class="group-row purchases"><td colspan="13">📦 ${t('movement.groups.purchases')}</td></tr>`;
          rowsHtml += buildRowsForType(currentMovementData.purchasesData, 'purchases');
        }
        if (currentMovementData.receiptsData.length > 0) {
          rowsHtml += `<tr class="group-row receipts"><td colspan="13">📥 ${t('movement.groups.receipts')}</td></tr>`;
          rowsHtml += buildRowsForType(currentMovementData.receiptsData, 'receipts');
        }
        if (currentMovementData.vouchersData.length > 0) {
          rowsHtml += `<tr class="group-row vouchers"><td colspan="13">📤 ${t('movement.groups.vouchers')}</td></tr>`;
          rowsHtml += buildRowsForType(currentMovementData.vouchersData, 'vouchers');
        }
        if (currentMovementData.journalsData.length > 0) {
          rowsHtml += `<tr class="group-row journals"><td colspan="13">📝 ${t('movement.groups.journals')}</td></tr>`;
          rowsHtml += buildRowsForType(currentMovementData.journalsData, 'journals');
        }
      } else {
        let data = [];
        switch (currentMovementData.type) {
          case 'sales': data = currentMovementData.salesData; break;
          case 'purchases': data = currentMovementData.purchasesData; break;
          case 'receipts': data = currentMovementData.receiptsData; break;
          case 'vouchers': data = currentMovementData.vouchersData; break;
          case 'journals': data = currentMovementData.journalsData; break;
        }
        rowsHtml = buildRowsForType(data, currentMovementData.type);
      }

      // Get current language direction
      const uiLang = localStorage.getItem('uiLang') || 'ar';
      const isRTL = uiLang === 'ar';
      const dir = isRTL ? 'rtl' : 'ltr';
      const lang = isRTL ? 'ar' : 'en';
      const branchScopeText = getMovementBranchScopePrintText(lang);

      // Build totals HTML
      const totals = currentMovementData.totals;
      let totalsRows = '';
      
      if (currentMovementData.type === 'all') {
        if (currentMovementData.salesData.length > 0) {
          totalsRows += `<tr class="totals-sales"><td>${t('movement.groups.sales')}</td><td>${nf2.format(totals.sales.cashDebit)}</td><td>${nf2.format(totals.sales.cashCredit)}</td><td>${nf2.format(totals.sales.goldDebit)}</td><td>${nf2.format(totals.sales.goldCredit)}</td><td>${nf2.format(totals.sales.silverDebit)}</td><td>${nf2.format(totals.sales.silverCredit)}</td></tr>`;
        }
        if (currentMovementData.purchasesData.length > 0) {
          totalsRows += `<tr class="totals-purchases"><td>${t('movement.groups.purchases')}</td><td>${nf2.format(totals.purchases.cashDebit)}</td><td>${nf2.format(totals.purchases.cashCredit)}</td><td>${nf2.format(totals.purchases.goldDebit)}</td><td>${nf2.format(totals.purchases.goldCredit)}</td><td>${nf2.format(totals.purchases.silverDebit)}</td><td>${nf2.format(totals.purchases.silverCredit)}</td></tr>`;
        }
        if (currentMovementData.receiptsData.length > 0) {
          totalsRows += `<tr class="totals-receipts"><td>${t('movement.groups.receipts')}</td><td>${nf2.format(totals.receipts.cashDebit)}</td><td>${nf2.format(totals.receipts.cashCredit)}</td><td>${nf2.format(totals.receipts.goldDebit)}</td><td>${nf2.format(totals.receipts.goldCredit)}</td><td>${nf2.format(totals.receipts.silverDebit)}</td><td>${nf2.format(totals.receipts.silverCredit)}</td></tr>`;
        }
        if (currentMovementData.vouchersData.length > 0) {
          totalsRows += `<tr class="totals-vouchers"><td>${t('movement.groups.vouchers')}</td><td>${nf2.format(totals.vouchers.cashDebit)}</td><td>${nf2.format(totals.vouchers.cashCredit)}</td><td>${nf2.format(totals.vouchers.goldDebit)}</td><td>${nf2.format(totals.vouchers.goldCredit)}</td><td>${nf2.format(totals.vouchers.silverDebit)}</td><td>${nf2.format(totals.vouchers.silverCredit)}</td></tr>`;
        }
        if (currentMovementData.journalsData.length > 0) {
          totalsRows += `<tr class="totals-journals"><td>${t('movement.groups.journals')}</td><td>${nf2.format(totals.journals.cashDebit)}</td><td>${nf2.format(totals.journals.cashCredit)}</td><td>${nf2.format(totals.journals.goldDebit)}</td><td>${nf2.format(totals.journals.goldCredit)}</td><td>${nf2.format(totals.journals.silverDebit)}</td><td>${nf2.format(totals.journals.silverCredit)}</td></tr>`;
        }
      }
      
      totalsRows += `<tr class="grand-total"><td>${t('movement.print.totals.grandTotal')}</td><td>${nf2.format(totals.grand.cashDebit)}</td><td>${nf2.format(totals.grand.cashCredit)}</td><td>${nf2.format(totals.grand.goldDebit)}</td><td>${nf2.format(totals.grand.goldCredit)}</td><td>${nf2.format(totals.grand.silverDebit)}</td><td>${nf2.format(totals.grand.silverCredit)}</td></tr>`;

      // Build complete HTML document - Same as Sales Invoice Print
      const docHtml = `<!doctype html>
<html lang="${lang}" dir="${dir}">
<head>
  <meta charset="utf-8">
  <title>${t('movement.print.title', {type: typeLabel})}</title>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&display=swap" rel="stylesheet">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    @page { margin:8mm; }
    body { font-family:'Cairo',sans-serif; direction:${dir}; background:#f5f5f5; padding:10px; font-size:14px; color:#2c3e50; }
    
    .report-container { margin:0 auto; background:white; box-shadow:0 4px 20px rgba(0,0,0,0.1); border-radius:12px; }
    
    /* ═══════════════════ HEADER - SAME AS INVOICE ═══════════════════ */
    .report-header { background:linear-gradient(135deg, #e8f5f3 0%, #d4edea 100%); color:#2c3e50; padding:20px 15px; border:2px solid #00897B; border-radius:12px 12px 0 0; }
    .header-top { display:grid; grid-template-columns:1fr auto 1fr; align-items:center; margin-bottom:12px; width:100%; direction:ltr; column-gap:20px; }
    
    .company-info { text-align:right; direction:rtl; }
    .company-info h1 { font-size:20px; font-weight:700; color:#00897B; margin:0 0 8px 0; }
    .company-info .info-item { display:flex; align-items:center; justify-content:flex-start; gap:8px; font-size:11px; color:#2c3e50; margin:4px 0; }
    .company-info .info-item i { color:#00897B; font-size:12px; }
    
    .company-logo { width:130px; height:130px; background:white; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:52px; border:4px solid #00897B; overflow:hidden; box-shadow:0 4px 15px rgba(0,137,123,0.2); margin:0 auto; }
    .company-logo img { width:90%; height:90%; object-fit:contain; }
    
    .company-info-left { text-align:left; direction:ltr; }
    .company-info-left h1 { font-size:18px; font-weight:700; color:#00897B; margin:0 0 8px 0; }
    .company-info-left .info-item { display:flex; align-items:center; justify-content:flex-start; gap:8px; font-size:11px; color:#2c3e50; margin:4px 0; }
    .company-info-left .info-item i { color:#00897B; font-size:12px; }
    
    /* ═══════════════════ TITLE BAR ═══════════════════ */
    .report-title { text-align:center; background:#e8f5f3; padding:8px 15px; border-radius:12px; border:2px solid #00897B; margin:5px 15px; }
    .report-title h2 { font-size:16px; font-weight:700; color:#00897B; margin:0; }
    
    /* ═══════════════════ FILTERS BAR ═══════════════════ */
    .filters-section { padding:10px 15px; background:white; border:2px solid #2c3e50; border-top:none; }
    .filters-box { border:2px solid #2c3e50; border-radius:8px; padding:10px 15px; display:flex; justify-content:center; gap:40px; }
    .filter-item { font-size:12px; color:#2c3e50; display:flex; align-items:center; gap:8px; }
    .filter-item .label { font-weight:700; color:#00897B; }
    
    /* ═══════════════════ SUMMARY CARDS ═══════════════════ */
    .summary-section { padding:8px 12px; background:white; border:2px solid #2c3e50; border-top:none; }
    .summary-cards { display:grid; grid-template-columns:repeat(6, minmax(0, 1fr)); gap:8px; direction:${dir}; }
    .summary-card { background:linear-gradient(135deg, #e8f5f3 0%, #d4edea 100%); border-radius:10px; padding:8px 10px; display:flex; align-items:center; justify-content:space-between; gap:8px; color:#2c3e50; flex-direction:${isRTL ? 'row' : 'row-reverse'}; border:2px solid #00897B; min-width:0; }
    .summary-card.debit { border-${isRTL ? 'right' : 'left'}:4px solid #10B981; }
    .summary-card.credit { border-${isRTL ? 'right' : 'left'}:4px solid #3B82F6; }
    .summary-card .card-content { text-align:${isRTL ? 'right' : 'left'}; min-width:0; }
    .summary-card .card-label { font-size:9px; color:#00897B; font-weight:700; margin-bottom:2px; display:flex; align-items:center; gap:4px; justify-content:${isRTL ? 'flex-end' : 'flex-start'}; line-height:1.2; }
    .summary-card .card-value { font-size:13px; font-weight:700; color:#2c3e50; direction:ltr; line-height:1.15; }
    .summary-card .card-icon { width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:13px; background:#fff; flex-shrink:0; }
    .summary-card.debit .card-icon { color:#10B981; border:2px solid #10B981; }
    .summary-card.credit .card-icon { color:#3B82F6; border:2px solid #3B82F6; }
    
    /* ═══════════════════ DATA TABLE ═══════════════════ */
    .table-section { padding:10px 15px; background:white; border:2px solid #2c3e50; border-top:none; }
    table.data-table { width:100%; border-collapse:separate; border-spacing:0; border:3px solid #2c3e50; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.1); }
    table.data-table thead { background:linear-gradient(to bottom, #e8f4f8, #d0e8f0); border-bottom:3px solid #2c3e50; }
    table.data-table th { padding:8px 4px; text-align:center; font-weight:700; font-size:10px; color:#2c3e50; border-right:1px solid #b0c4ce; border-bottom:1px solid #b0c4ce; }
    table.data-table th:last-child { border-right:none; }
    table.data-table td { padding:6px 4px; text-align:center; font-size:10px; border-right:1px solid #e0e0e0; border-bottom:1px solid #e0e0e0; }
    table.data-table td:last-child { border-right:none; }
    table.data-table tbody tr:nth-child(even) { background-color:#f9fafb; }
    table.data-table .text-right { text-align:right; padding-right:6px; }
    table.data-table .num { font-weight:600; }
    
    /* Group rows */
    .group-row td { padding:10px 12px !important; text-align:center !important; font-size:12px; font-weight:700; color:#fff; border:2px solid #2c3e50 !important; }
    .group-row.sales td { background:linear-gradient(90deg, #DC2626 0%, #B91C1C 100%); }
    .group-row.purchases td { background:linear-gradient(90deg, #2563EB 0%, #1D4ED8 100%); }
    .group-row.receipts td { background:linear-gradient(90deg, #10B981 0%, #059669 100%); }
    .group-row.vouchers td { background:linear-gradient(90deg, #F59E0B 0%, #D97706 100%); }
    .group-row.journals td { background:linear-gradient(90deg, #8B5CF6 0%, #7C3AED 100%); }
    
    /* ═══════════════════ TOTALS SECTION ═══════════════════ */
    .totals-section { padding:10px 15px; background:white; border:2px solid #2c3e50; border-top:none; border-radius:0 0 12px 12px; }
    .totals-title { text-align:center; font-size:14px; font-weight:700; color:#00897B; margin-bottom:10px; padding-bottom:5px; border-bottom:2px solid #00897B; }
    table.totals-table { width:100%; border-collapse:separate; border-spacing:0; border:2px solid #2c3e50; border-radius:8px; overflow:hidden; }
    table.totals-table th { background:linear-gradient(to bottom, #e8f4f8, #d0e8f0); padding:8px; text-align:center; font-weight:700; font-size:11px; color:#2c3e50; border-right:1px solid #b0c4ce; border-bottom:2px solid #2c3e50; }
    table.totals-table th:last-child { border-right:none; }
    table.totals-table td { padding:8px; text-align:center; font-size:11px; border-right:1px solid #e0e0e0; border-bottom:1px solid #e0e0e0; }
    table.totals-table td:last-child { border-right:none; }
    table.totals-table td:first-child { text-align:${isRTL ? 'right' : 'left'}; font-weight:700; padding-${isRTL ? 'right' : 'left'}:12px; }
    
    .totals-sales td:first-child { background:#fee2e2; color:#DC2626; }
    .totals-purchases td:first-child { background:#dbeafe; color:#2563EB; }
    .totals-receipts td:first-child { background:#d1fae5; color:#10B981; }
    .totals-vouchers td:first-child { background:#fef3c7; color:#F59E0B; }
    .totals-journals td:first-child { background:#ede9fe; color:#8B5CF6; }
    .grand-total td { background:#00897B !important; color:#fff !important; font-weight:700 !important; font-size:12px !important; }
    
    /* ═══════════════════ PRINT BUTTON ═══════════════════ */
    .print-btn { position:fixed; bottom:25px; left:25px; background:linear-gradient(135deg, #00897B 0%, #00695C 100%); color:#fff; border:none; padding:12px 25px; border-radius:25px; font-size:14px; font-weight:700; cursor:pointer; box-shadow:0 4px 15px rgba(0,137,123,0.4); display:flex; align-items:center; gap:8px; font-family:'Cairo',sans-serif; }
    .print-btn:hover { transform:translateY(-2px); box-shadow:0 6px 20px rgba(0,137,123,0.5); }
    
    @media print { .print-btn { display:none !important; } body { padding:0; background:#fff; } .report-container { box-shadow:none; } }
  </style>
</head>
<body>
  <div class="report-container">
    <!-- ═══════════════════ HEADER ═══════════════════ -->
    <div class="report-header">
      <div class="header-top">
        <div class="company-info-left">
          <h1>${company.name_en || company.name || 'Company Name'}</h1>
          <div class="info-item">📍 Address: ${company.address_en || company.address || '-'}</div>
          <div class="info-item">📞 Phone: ${company.phone || '-'}</div>
          <div class="info-item">📧 Email: ${company.email || '-'}</div>
          <div class="info-item">🏷️ Tax No: ${company.tax || '-'}</div>
        </div>
        <div class="company-logo">
          ${logoUrl ? `<img src="${logoUrl}" alt="Logo">` : '🏢'}
        </div>
        <div class="company-info">
          <h1>${company.name || 'اسم الشركة'}</h1>
          <div class="info-item">📍 العنوان: ${company.address || '-'}</div>
          <div class="info-item">📞 رقم الهاتف: ${company.phone || '-'}</div>
          <div class="info-item">📧 البريد: ${company.email || '-'}</div>
          <div class="info-item">🏷️ الرقم الضريبي: ${company.tax || '-'}</div>
        </div>
      </div>
      <div class="report-title">
        <h2>${t('movement.print.title', {type: typeLabel})}</h2>
      </div>
    </div>
    
    <!-- ═══════════════════ FILTERS ═══════════════════ -->
    <div class="filters-section">
      <div class="filters-box">
        <div class="filter-item"><span class="label">${t('movement.print.filters.dateFrom')}</span> ${formatDatePrint(currentMovementData.dateFrom)}</div>
        <div class="filter-item"><span class="label">${t('movement.print.filters.dateTo')}</span> ${formatDatePrint(currentMovementData.dateTo)}</div>
        <div class="filter-item"><span class="label">${t('movement.print.filters.goldKarat')}</span> ${currentMovementData.goldKarat}</div>
        <div class="filter-item"><span class="label">${t('movement.print.filters.silverKarat')}</span> ${currentMovementData.silverKarat}</div>
        <div class="filter-item"><span class="label">${t('movement.print.filters.branchScope')}</span> ${escapeHtml(branchScopeText || '-')}</div>
      </div>
    </div>
    
    <!-- ═══════════════════ SUMMARY CARDS ═══════════════════ -->
    <div class="summary-section">
      <div class="summary-cards">
        <div class="summary-card debit">
          <div class="card-icon">💵</div>
          <div class="card-content">
            <div class="card-label">${t('movement.summary.cashDebit')}</div>
            <div class="card-value">${nf2.format(totals.grand.cashDebit)}</div>
          </div>
        </div>
        <div class="summary-card credit">
          <div class="card-icon">💸</div>
          <div class="card-content">
            <div class="card-label">${t('movement.summary.cashCredit')}</div>
            <div class="card-value">${nf2.format(totals.grand.cashCredit)}</div>
          </div>
        </div>
        <div class="summary-card debit">
          <div class="card-icon">🥇</div>
          <div class="card-content">
            <div class="card-label">${t('movement.summary.goldDebit')}</div>
            <div class="card-value">${nf2.format(totals.grand.goldDebit)}</div>
          </div>
        </div>
        <div class="summary-card credit">
          <div class="card-icon">🏅</div>
          <div class="card-content">
            <div class="card-label">${t('movement.summary.goldCredit')}</div>
            <div class="card-value">${nf2.format(totals.grand.goldCredit)}</div>
          </div>
        </div>
        <div class="summary-card debit">
          <div class="card-icon">🥈</div>
          <div class="card-content">
            <div class="card-label">${t('movement.summary.silverDebit')}</div>
            <div class="card-value">${nf2.format(totals.grand.silverDebit)}</div>
          </div>
        </div>
        <div class="summary-card credit">
          <div class="card-icon">⚪</div>
          <div class="card-content">
            <div class="card-label">${t('movement.summary.silverCredit')}</div>
            <div class="card-value">${nf2.format(totals.grand.silverCredit)}</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- ═══════════════════ DATA TABLE ═══════════════════ -->
    <div class="table-section">
      <table class="data-table">
        <thead>
          <tr>
            <th style="width:35px;">#</th>
            <th style="width:85px;">${t('movement.print.table.date')}</th>
            <th style="width:70px;">${t('movement.print.table.docNo')}</th>
            <th style="width:85px;">${t('movement.print.table.operationType')}</th>
            <th style="min-width:120px;">${t('movement.print.table.party')}</th>
            <th style="width:95px;">${t('movement.print.table.cashDebit')}</th>
            <th style="width:95px;">${t('movement.print.table.cashCredit')}</th>
            <th style="width:50px;">${t('movement.print.table.karat')}</th>
            <th style="width:80px;">${t('movement.print.table.goldDebit')}</th>
            <th style="width:80px;">${t('movement.print.table.goldCredit')}</th>
            <th style="width:80px;">${t('movement.print.table.silverDebit')}</th>
            <th style="width:80px;">${t('movement.print.table.silverCredit')}</th>
            <th style="min-width:100px;">${t('movement.print.table.description')}</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml || `<tr><td colspan="13" style="padding:30px; color:#999;">${t('movement.print.noData')}</td></tr>`}
        </tbody>
      </table>
    </div>
    
    <!-- ═══════════════════ TOTALS ═══════════════════ -->
    <div class="totals-section">
      <div class="totals-title">${t('movement.print.totals.title')}</div>
      <table class="totals-table">
        <thead>
          <tr>
            <th>${t('movement.print.totals.description')}</th>
            <th>${t('movement.print.totals.totalCashDebit')}</th>
            <th>${t('movement.print.totals.totalCashCredit')}</th>
            <th>${t('movement.print.totals.totalGoldDebit')}</th>
            <th>${t('movement.print.totals.totalGoldCredit')}</th>
            <th>${t('movement.print.totals.totalSilverDebit')}</th>
            <th>${t('movement.print.totals.totalSilverCredit')}</th>
          </tr>
        </thead>
        <tbody>
          ${totalsRows}
        </tbody>
      </table>
    </div>
  </div>
  
  <button class="print-btn" onclick="window.print()">🖨️ ${t('movement.print.printButton')}</button>
</body>
</html>`;

      // Open in new window
      const w = window.open('', '_blank');
      if (!w) {
        showAlert(t('movement.errors.popupBlocked'), 'warning');
        return;
      }
      w.document.open();
      w.document.write(docHtml);
      w.document.close();
      w.focus();

    } catch (error) {
      showAlert(t('movement.errors.printError'), 'error');
    }
  }

  // Close button - navigate back to dashboard
  const btnCloseMovement = document.getElementById('btnCloseMovement');
  if (btnCloseMovement) {
    btnCloseMovement.addEventListener('click', () => {
      btnCloseMovement.style.transform = 'scale(0.95)';
      setTimeout(() => {
        btnCloseMovement.style.transform = '';
      }, 150);

      setTimeout(() => {
        try {
          const parentDoc = window.parent?.document || window.top?.document;
          if (!parentDoc) return;
          const dashTab = parentDoc.getElementById('tab-dashboard');
          if (dashTab && typeof dashTab.click === 'function') {
            dashTab.click();
          }
        } catch (_) { }
      }, 200);
    });
    
    // Hover effect - red on hover
    btnCloseMovement.addEventListener('mouseenter', () => {
      btnCloseMovement.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
      btnCloseMovement.style.borderColor = 'rgba(239, 68, 68, .85)';
    });
    btnCloseMovement.addEventListener('mouseleave', () => {
      btnCloseMovement.style.background = '';
      btnCloseMovement.style.borderColor = '';
    });
  }

  // Load initial data when screen opens
  window.refreshForBranchScopeChange = async function() {
    await loadMovements();
    return true;
  };
  loadMovements();
})();

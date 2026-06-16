// Dashboard Screen
(async function() {
  'use strict';

  // ===== Language handling for dashboard =====
  const DASH_LANG_KEY = 'uiLang';

  const dashboardTranslations = {
    ar: {
      xauTitleText: 'سعر أونصة الذهب',
      xauSubText: 'XAU/USD (Spot)',
      xagTitleText: 'سعر أونصة الفضة',
      xagSubText: 'XAG/USD (Spot)',
      btnRefreshXauText: 'تحديث',
      btnRefreshXagText: 'تحديث',
      btnMt5ReconnectXauText: 'إعادة اتصال MT5',
      btnMt5ReconnectXagText: 'إعادة اتصال MT5',
      xauLastUpdateLabel: 'آخر تحديث',
      xagLastUpdateLabel: 'آخر تحديث',
      xauEventTimeLabel: 'موعد الحدث',
      xagEventTimeLabel: 'موعد الحدث',
      marketOpen: 'مفتوح',
      marketClosed: 'مغلق',
      closesIn: 'يغلق بعد',
      opensIn: 'يفتح بعد',
      offlineHintNotAvailable: 'آخر تحديث: — (غير متاح)',
      offlineHintFailed: 'آخر تحديث: — (فشل الاتصال)',
      offlineHintUpdating: 'آخر تحديث: جاري التحديث...',
      sourceMeta: 'المصدر: Yahoo Finance · وقت السوق حسب نيويورك',

      // MT5 dashboard texts
      mt5OrdersTitle: 'منصة MT5',
      mt5OrdersSubtitle: 'متابعة الأوامر المنفذة والمعلقة من المنصة',
      mt5PendingLabel: 'أوامر معلقة',
      mt5CompletedLabel: 'العمليات المنفذة حالياً',
      mt5ActivityTitle: 'آخر الأنشطة',
      mt5ActivityHint: 'أحدث 3 أوامر MT5',
      mt5AutoSyncOn: 'المزامنة اللحظية',
      mt5AutoSyncOff: 'المزامنة متوقفة',

      // MT5 grid column headers
      mt5PendingColRef: 'م/مرجعي',
      mt5PendingColSymbol: 'الرمز',
      mt5PendingColType: 'النوع',
      mt5PendingColWeight: 'الوزن',
      mt5PendingColPrice: 'السعر',
      mt5PendingColProx: 'القرب',

      mt5CompletedColRef: 'م/مرجعي',
      mt5CompletedColSymbol: 'الرمز',
      mt5CompletedColType: 'النوع',
      mt5CompletedColWeight: 'الوزن',
      mt5CompletedColPrice: 'السعر',
      mt5CompletedColPl: 'الربح / الخسارة',

      // MT5 empty states
      mt5OrdersEmpty: 'لا توجد أوامر MT5 حالياً',
    },
    en: {
      xauTitleText: 'Gold ounce price',
      xauSubText: 'XAU/USD (Spot)',
      xagTitleText: 'Silver ounce price',
      xagSubText: 'XAG/USD (Spot)',
      btnRefreshXauText: 'Refresh',
      btnRefreshXagText: 'Refresh',
      btnMt5ReconnectXauText: 'Reconnect MT5',
      btnMt5ReconnectXagText: 'Reconnect MT5',
      xauLastUpdateLabel: 'Last update',
      xagLastUpdateLabel: 'Last update',
      xauEventTimeLabel: 'Event time',
      xagEventTimeLabel: 'Event time',
      marketOpen: 'Open',
      marketClosed: 'Closed',
      closesIn: 'Closes in',
      opensIn: 'Opens in',
      offlineHintNotAvailable: 'Last update: — (not available)',
      offlineHintFailed: 'Last update: — (connection failed)',
      offlineHintUpdating: 'Last update: updating...',
      sourceMeta: 'Source: Yahoo Finance · Market time based on New York',

      // MT5 dashboard texts
      mt5OrdersTitle: 'MT5 Orders',
      mt5OrdersSubtitle: 'Monitor executed and pending orders from the terminal',
      mt5PendingLabel: 'Pending orders',
      mt5CompletedLabel: 'Open positions',
      mt5ActivityTitle: 'Latest activity',
      mt5ActivityHint: 'Latest 3 MT5 orders',
      mt5AutoSyncOn: 'Auto-sync',
      mt5AutoSyncOff: 'Auto-sync off',

      // MT5 grid column headers
      mt5PendingColRef: 'Ref #',
      mt5PendingColSymbol: 'Symbol',
      mt5PendingColType: 'Type',
      mt5PendingColWeight: 'Weight',
      mt5PendingColPrice: 'Price',
      mt5PendingColProx: 'Proximity',

      mt5CompletedColRef: 'Ref #',
      mt5CompletedColSymbol: 'Symbol',
      mt5CompletedColType: 'Type',
      mt5CompletedColWeight: 'Weight',
      mt5CompletedColPrice: 'Price',
      mt5CompletedColPl: 'P/L',

      // MT5 empty states
      mt5OrdersEmpty: 'No MT5 orders currently',
    }
  };

  function getDashboardLang() {
    const stored = localStorage.getItem(DASH_LANG_KEY);
    return stored === 'en' ? 'en' : 'ar';
  }

  function t(key) {
    const lang = getDashboardLang();
    const dict = dashboardTranslations[lang] || dashboardTranslations.ar;
    return dict[key] || dashboardTranslations.ar[key] || '';
  }

  function getSourceMeta(res) {
    const src = res && typeof res.source === 'string' ? res.source : '';
    if (src === 'mt5') {
      return getDashboardLang() === 'en'
        ? 'Source: MT5 (Local Terminal) · Mid=(Bid+Ask)/2'
        : 'المصدر: MT5 (من الجهاز) · Mid=(Bid+Ask)/2';
    }
    return t('sourceMeta');
  }

  function applyDashboardStaticTexts() {
    const ids = [
      'xauTitleText',
      'xauSubText',
      'xagTitleText',
      'xagSubText',
      'btnRefreshXauText',
      'btnRefreshXagText',
      'btnMt5ReconnectXauText',
      'btnMt5ReconnectXagText',
      'xauLastUpdateLabel',
      'xagLastUpdateLabel',
      'xauEventTimeLabel',
      'xagEventTimeLabel',

      // MT5 dashboard labels
      'mt5OrdersTitle',
      'mt5OrdersSubtitle',
      'mt5PendingLabel',
      'mt5CompletedLabel',
      'mt5ActivityTitle',
      'mt5ActivityHint',

      // MT5 grid column headers
      'mt5PendingColRef',
      'mt5PendingColSymbol',
      'mt5PendingColType',
      'mt5PendingColWeight',
      'mt5PendingColPrice',
      'mt5PendingColProx',
      'mt5CompletedColRef',
      'mt5CompletedColSymbol',
      'mt5CompletedColType',
      'mt5CompletedColWeight',
      'mt5CompletedColPrice',
      'mt5CompletedColPl',

      // MT5 empty states
      'mt5OrdersEmpty',
    ];

    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        const txt = t(id);
        if (txt) el.textContent = txt;
      }
    });

    // Update document direction for this iframe
    const lang = getDashboardLang();
    if (document.documentElement) {
      document.documentElement.lang = lang === 'en' ? 'en' : 'ar';
      document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';
    }
  }

  applyDashboardStaticTexts();

  // ✅ Initialize screen permissions
  if (window.ScreenPermissions) {
    await window.ScreenPermissions.init();
  }

  const xauPriceEl = document.getElementById('xauPrice');
  const xauChangeEl = document.getElementById('xauChange');
  const xauMetaEl = document.getElementById('xauMeta');
  const xauLastUpdateEl = document.getElementById('xauLastUpdate');
  const xauMarketBadgeEl = document.getElementById('xauMarketBadge');
  const xauNextLabelEl = document.getElementById('xauNextLabel');
  const xauCountdownEl = document.getElementById('xauCountdown');
  const xauNextTimeEl = document.getElementById('xauNextTime');
  const btnRefreshXau = document.getElementById('btnRefreshXau');
  const btnMt5ReconnectXau = document.getElementById('btnMt5ReconnectXau');
  let xauChartEl = document.getElementById('xauChart');

  const xagPriceEl = document.getElementById('xagPrice');
  const xagChangeEl = document.getElementById('xagChange');
  const xagMetaEl = document.getElementById('xagMeta');
  const xagLastUpdateEl = document.getElementById('xagLastUpdate');
  const xagMarketBadgeEl = document.getElementById('xagMarketBadge');
  const xagNextLabelEl = document.getElementById('xagNextLabel');
  const xagCountdownEl = document.getElementById('xagCountdown');
  const xagNextTimeEl = document.getElementById('xagNextTime');
  const btnRefreshXag = document.getElementById('btnRefreshXag');
  const btnMt5ReconnectXag = document.getElementById('btnMt5ReconnectXag');
  let xagChartEl = document.getElementById('xagChart');

  // MT5 orders dashboard card elements
  const mt5PendingCountEl = document.getElementById('mt5PendingCount');
  const mt5PendingHintEl = document.getElementById('mt5PendingHint');
  const mt5PendingGridEl = document.getElementById('mt5PendingGrid');
  const mt5PendingGridBodyEl = document.getElementById('mt5PendingGridBody');
  const mt5PendingEmptyEl = document.getElementById('mt5PendingEmpty');
  const mt5PendingBuySummaryEl = document.getElementById('mt5PendingBuySummary');
  const mt5PendingSellSummaryEl = document.getElementById('mt5PendingSellSummary');
  const mt5CompletedCountEl = document.getElementById('mt5CompletedCount');
  const mt5CompletedHintEl = document.getElementById('mt5CompletedHint');
  const mt5CompletedGridEl = document.getElementById('mt5CompletedGrid');
  const mt5CompletedGridBodyEl = document.getElementById('mt5CompletedGridBody');
  const mt5CompletedEmptyEl = document.getElementById('mt5CompletedEmpty');
  const mt5CompletedBuySummaryEl = document.getElementById('mt5CompletedBuySummary');
  const mt5CompletedSellSummaryEl = document.getElementById('mt5CompletedSellSummary');
  const mt5CompletedPlSummaryEl = document.getElementById('mt5CompletedPlSummary');
  const mt5FailedCountEl = document.getElementById('mt5FailedCount');
  const mt5FailedHintEl = document.getElementById('mt5FailedHint');
  const mt5OrdersStatusTextEl = document.getElementById('mt5OrdersStatusText');
  const mt5OrdersUpdatedEl = document.getElementById('mt5OrdersUpdated');
  const btnRefreshMt5Orders = document.getElementById('btnRefreshMt5Orders');

  const langCode = getDashboardLang();
  const fmtMoney = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtPct = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtLocal = new Intl.DateTimeFormat(langCode === 'en' ? 'en-US' : 'ar', { dateStyle: 'medium', timeStyle: 'medium' });
  const fmtNY = new Intl.DateTimeFormat(langCode === 'en' ? 'en-US' : 'ar', { timeZone: 'America/New_York', dateStyle: 'medium', timeStyle: 'medium' });
  const fmtWeight = new Intl.NumberFormat(langCode === 'en' ? 'en-US' : 'ar', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtPrice = new Intl.NumberFormat('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 });

  const REFRESH_MT5_MS = 1000;
  const REFRESH_GOLDPRICE_MS = 15000;
  let activeSource = null;
  let currentRefreshMs = REFRESH_MT5_MS;
  let refreshTimer = null;
  let tickTimer = null;
  let refreshInFlight = false;
  let mt5ReconnectCooldownTimer = null;
  let nextEvent = null;
  let lastXauPrice = null;
  let lastXagPrice = null;
  const MAX_POINTS = 240;
  const xauSeries = [];
  const xagSeries = [];
  let mt5AutoSync = true;

  // ===== MT5 Orders dashboard card logic =====

  function getMt5OrderTypeLabel(typeVal) {
    let code = '';
    const n = Number(typeVal);
    if (Number.isFinite(n)) {
      switch (n) {
        case 0: code = 'BUY'; break;
        case 1: code = 'SELL'; break;
        case 2: code = 'BUY_LIMIT'; break;
        case 3: code = 'SELL_LIMIT'; break;
        case 4: code = 'BUY_STOP'; break;
        case 5: code = 'SELL_STOP'; break;
        case 6: code = 'BUY_STOP_LIMIT'; break;
        case 7: code = 'SELL_STOP_LIMIT'; break;
        case 8: code = 'CLOSE_BY'; break;
        default: code = ''; break;
      }
    } else if (typeVal != null) {
      code = String(typeVal).toUpperCase();
    }

    if (!code) return '';

    if (langCode === 'en') {
      switch (code) {
        case 'BUY': return 'Buy';
        case 'SELL': return 'Sell';
        case 'BUY_LIMIT': return 'Buy Limit';
        case 'SELL_LIMIT': return 'Sell Limit';
        case 'BUY_STOP': return 'Buy Stop';
        case 'SELL_STOP': return 'Sell Stop';
        case 'BUY_STOP_LIMIT': return 'Buy Stop Limit';
        case 'SELL_STOP_LIMIT': return 'Sell Stop Limit';
        case 'CLOSE_BY': return 'Close By';
        default: return code.replace(/_/g, ' ');
      }
    }

    // Arabic labels
    switch (code) {
      case 'BUY': return 'شراء';
      case 'SELL': return 'بيع';
      case 'BUY_LIMIT': return 'شراء معلق';
      case 'SELL_LIMIT': return 'بيع معلق';
      case 'BUY_STOP': return 'شراء وقف';
      case 'SELL_STOP': return 'بيع وقف';
      case 'BUY_STOP_LIMIT': return 'شراء وقف-معلق';
      case 'SELL_STOP_LIMIT': return 'بيع وقف-معلق';
      case 'CLOSE_BY': return 'إغلاق مقابل';
      default: return code.replace(/_/g, ' ');
    }
  }

  function calcSimpleProximity(targetPrice, currentPrice) {
    if (!Number.isFinite(targetPrice) || targetPrice <= 0 || !Number.isFinite(currentPrice) || currentPrice <= 0) {
      return { level: 'unknown', icon: 'fa-circle-question', cls: 'mt5-prox-unknown', tooltip: '', label: '', diff: 0, percent: 0 };
    }

    const diff = targetPrice - currentPrice;
    const absDiff = Math.abs(diff);
    const percent = (absDiff / currentPrice) * 100;

    let level = 'far';
    let icon = 'fa-globe';
    let cls = 'mt5-prox-far';

    if (percent < 0.1) {
      level = 'immediate';
      icon = 'fa-bolt';
      cls = 'mt5-prox-immediate';
    } else if (percent < 0.3) {
      level = 'veryClose';
      icon = 'fa-angles-up';
      cls = 'mt5-prox-very-close';
    } else if (percent < 0.5) {
      level = 'close';
      icon = 'fa-crosshairs';
      cls = 'mt5-prox-close';
    } else if (percent < 1.0) {
      level = 'medium';
      icon = 'fa-location-dot';
      cls = 'mt5-prox-medium';
    }

    // نص المستوى حسب اللغة، مشابه لشاشة الأوردات
    let label = '';
    if (langCode === 'en') {
      if (level === 'immediate') label = 'Immediate';
      else if (level === 'veryClose') label = 'Very close';
      else if (level === 'close') label = 'Close';
      else if (level === 'medium') label = 'Medium';
      else label = 'Far';
    } else {
      if (level === 'immediate') label = 'تنفيذ فوري';
      else if (level === 'veryClose') label = 'قريب جداً';
      else if (level === 'close') label = 'قريب';
      else if (level === 'medium') label = 'متوسط';
      else label = 'بعيد';
    }

    const proxSign = diff > 0 ? '+' : (diff < 0 ? '-' : '');
    const absDiffVal = Math.abs(diff);
    const diffText = `${proxSign}$${absDiffVal.toFixed(2)}`;
    const percentText = `(${percent.toFixed(2)}%)`;

    // نفس تنسيق شاشة الأوردات في الـ tooltip أيضاً
    const tooltip = `${proxSign}$${diff.toFixed(2)} (${percent.toFixed(2)}%)`;
    return { level, icon, cls, tooltip, label, diff, percent, diffText, percentText };
  }

  function updateMt5PendingFromBridge(pendingOrders) {
    if (!mt5PendingCountEl || !mt5PendingEmptyEl || !mt5PendingGridEl || !mt5PendingGridBodyEl) return;

    const list = Array.isArray(pendingOrders) ? pendingOrders : [];

    if (mt5PendingCountEl) mt5PendingCountEl.textContent = list.length;

    // حساب إجمالي أوزان أوامر الشراء/البيع المعلقة للعرض في رأس البطاقة
    let buyGrams = 0;
    let sellGrams = 0;
    for (const o of list) {
      const typeNum = Number(o.type);
      let typeCode = '';
      if (Number.isFinite(typeNum)) {
        if (typeNum === 2) typeCode = 'BUY_LIMIT';
        else if (typeNum === 3) typeCode = 'SELL_LIMIT';
      } else if (o.type != null) {
        typeCode = String(o.type).toUpperCase();
      }

      const lots = Number(o.volume) || 0;
      const weightGrams = lots > 0 ? lots * 100 * 31.1034768 : 0;
      if (typeCode === 'BUY_LIMIT') buyGrams += weightGrams;
      else if (typeCode === 'SELL_LIMIT') sellGrams += weightGrams;
    }

    if (mt5PendingBuySummaryEl) {
      if (buyGrams > 0) {
        const w = fmtWeight.format(buyGrams);
        mt5PendingBuySummaryEl.textContent = langCode === 'en'
          ? `Buy limit (${w} g)`
          : `أوامر شراء معلق (${w} جم)`;
      } else {
        mt5PendingBuySummaryEl.textContent = '';
      }
    }

    if (mt5PendingSellSummaryEl) {
      if (sellGrams > 0) {
        const w = fmtWeight.format(sellGrams);
        mt5PendingSellSummaryEl.textContent = langCode === 'en'
          ? `Sell limit (${w} g)`
          : `أوامر بيع معلق (${w} جم)`;
      } else {
        mt5PendingSellSummaryEl.textContent = '';
      }
    }

    mt5PendingGridEl.style.display = 'block';
    mt5PendingGridBodyEl.innerHTML = '';

    if (list.length === 0) {
      const emptyRow = document.createElement('div');
      emptyRow.className = 'mt5-pending-row mt5-empty-row';
      const msg = langCode === 'en' ? 'No pending MT5 orders' : 'لا توجد أوامر معلقة';
      emptyRow.innerHTML = `<span class="col">${msg}</span>`;
      mt5PendingGridBodyEl.appendChild(emptyRow);
      mt5PendingEmptyEl.style.display = 'none';
      return;
    }

    mt5PendingEmptyEl.style.display = 'none';

    const latest = list.slice().sort((a, b) => Number(b.ticket) - Number(a.ticket)).slice(0, 10);
    latest.forEach(o => {
      const row = document.createElement('div');

      const typeNum = Number(o.type);
      let typeCode = '';
      if (Number.isFinite(typeNum)) {
        if (typeNum === 2) typeCode = 'BUY_LIMIT';
        else if (typeNum === 3) typeCode = 'SELL_LIMIT';
      } else if (o.type != null) {
        typeCode = String(o.type).toUpperCase();
      }

      let rowTypeClass = '';
      if (typeCode === 'BUY_LIMIT') rowTypeClass = ' mt5-buy-limit';
      else if (typeCode === 'SELL_LIMIT') rowTypeClass = ' mt5-sell-limit';

      row.className = 'mt5-pending-row' + rowTypeClass;

      const ticket = o.ticket != null ? o.ticket : '-';
      const symbol = o.symbol || '';
      const typeLabel = getMt5OrderTypeLabel(o.type);
      const lots = Number(o.volume) || 0;
      const weightGrams = lots > 0 ? lots * 100 * 31.1034768 : 0;
      const w = fmtWeight.format(weightGrams || 0);
      const price = fmtPrice.format(Number(o.price_open) || 0);

      const targetPrice = Number(o.price_open) || 0;
      // استخدم سعر الذهب XAU للأوامر الذهبية، وسعر الفضة XAG لأوامر الفضة
      const symUpper = symbol.toUpperCase();
      const isSilver = symUpper.startsWith('XAG');
      const currentPrice = isSilver && Number.isFinite(lastXagPrice) && lastXagPrice > 0
        ? lastXagPrice
        : lastXauPrice;
      const prox = calcSimpleProximity(targetPrice, currentPrice);

      const proxText = prox && prox.level !== 'unknown'
        ? `${prox.percentText || ''} ${prox.diffText || ''} ${prox.label || ''}`.trim()
        : '';

      row.innerHTML = `
        <span class="col col-id">#${ticket}</span>
        <span class="col col-symbol">${symbol}</span>
        <span class="col col-type">${typeLabel}</span>
        <span class="col col-weight">${w}</span>
        <span class="col col-price">${price}</span>
        <span class="col col-prox">
          <span class="mt5-prox-indicator ${prox.cls}" title="${prox.tooltip}">
            <i class="fa-solid ${prox.icon}"></i>
            <span class="mt5-prox-text">${proxText}</span>
          </span>
        </span>
      `;

      mt5PendingGridBodyEl.appendChild(row);
    });
  }

  function updateMt5CompletedFromBridge(positions) {
    if (!mt5CompletedCountEl || !mt5CompletedHintEl || !mt5CompletedGridEl || !mt5CompletedGridBodyEl || !mt5CompletedEmptyEl) return;

    const list = Array.isArray(positions) ? positions : [];

    mt5CompletedCountEl.textContent = list.length;

    // إجمالي أوزان الشراء/البيع + إجمالي الربح/الخسارة لجميع العمليات المفتوحة
    let totalProfit = 0;
    let buyGrams = 0;
    let sellGrams = 0;

    for (const p of list) {
      const v = Number(p.profit);
      if (Number.isFinite(v)) totalProfit += v;

      const typeNum = Number(p.type);
      let typeCode = '';
      if (Number.isFinite(typeNum)) {
        if (typeNum === 0) typeCode = 'BUY';
        else if (typeNum === 1) typeCode = 'SELL';
      } else if (p.type != null) {
        typeCode = String(p.type).toUpperCase();
      }

      const lots = Number(p.volume) || 0;
      const weightGrams = lots > 0 ? lots * 100 * 31.1034768 : 0;
      if (typeCode === 'BUY') buyGrams += weightGrams;
      else if (typeCode === 'SELL') sellGrams += weightGrams;
    }

    if (mt5CompletedBuySummaryEl) {
      if (buyGrams > 0) {
        const w = fmtWeight.format(buyGrams);
        mt5CompletedBuySummaryEl.textContent = langCode === 'en'
          ? `Buy (${w} g)`
          : `إجمالي شراء (${w} جم)`;
      } else {
        mt5CompletedBuySummaryEl.textContent = '';
      }
    }

    if (mt5CompletedSellSummaryEl) {
      if (sellGrams > 0) {
        const w = fmtWeight.format(sellGrams);
        mt5CompletedSellSummaryEl.textContent = langCode === 'en'
          ? `Sell (${w} g)`
          : `إجمالي بيع (${w} جم)`;
      } else {
        mt5CompletedSellSummaryEl.textContent = '';
      }
    }

    if (mt5CompletedPlSummaryEl) {
      if (!Number.isFinite(totalProfit) || totalProfit === 0) {
        mt5CompletedPlSummaryEl.textContent = '';
        mt5CompletedPlSummaryEl.classList.remove('profit', 'loss');
      } else if (totalProfit > 0) {
        const val = fmtMoney.format(totalProfit);
        mt5CompletedPlSummaryEl.textContent = langCode === 'en'
          ? `Profit (${val})`
          : `ربح (${val})`;
        mt5CompletedPlSummaryEl.classList.remove('loss');
        mt5CompletedPlSummaryEl.classList.add('profit');
      } else {
        const val = fmtMoney.format(Math.abs(totalProfit));
        mt5CompletedPlSummaryEl.textContent = langCode === 'en'
          ? `Loss (${val})`
          : `خسارة (${val})`;
        mt5CompletedPlSummaryEl.classList.remove('profit');
        mt5CompletedPlSummaryEl.classList.add('loss');
      }
    }

    mt5CompletedGridEl.style.display = 'block';
    mt5CompletedGridBodyEl.innerHTML = '';

    if (list.length === 0) {
      const emptyRow = document.createElement('div');
      emptyRow.className = 'mt5-completed-row mt5-empty-row';
      const msg = langCode === 'en' ? 'No open MT5 positions' : 'لا توجد عمليات منفذة حالياً';
      emptyRow.innerHTML = `<span class="col">${msg}</span>`;
      mt5CompletedGridBodyEl.appendChild(emptyRow);
      mt5CompletedEmptyEl.style.display = 'none';
      return;
    }

    mt5CompletedEmptyEl.style.display = 'none';

    const latest = list.slice().sort((a, b) => Number(b.ticket) - Number(a.ticket)).slice(0, 10);
    latest.forEach(p => {
      const row = document.createElement('div');

      const typeNum = Number(p.type);
      let typeCode = '';
      if (Number.isFinite(typeNum)) {
        if (typeNum === 0) typeCode = 'BUY';
        else if (typeNum === 1) typeCode = 'SELL';
      } else if (p.type != null) {
        typeCode = String(p.type).toUpperCase();
      }

      let rowTypeClass = '';
      if (typeCode === 'BUY') rowTypeClass = ' mt5-completed-buy';
      else if (typeCode === 'SELL') rowTypeClass = ' mt5-completed-sell';

      row.className = 'mt5-completed-row' + rowTypeClass;

      const ticket = p.ticket != null ? p.ticket : '-';
      const symbol = p.symbol || '';
      const typeLabel = getMt5OrderTypeLabel(typeCode || p.type);
      const lots = Number(p.volume) || 0;
      const weightGrams = lots > 0 ? lots * 100 * 31.1034768 : 0;
      const w = fmtWeight.format(weightGrams || 0);
      const price = fmtPrice.format(Number(p.price_open) || 0);

      const profitVal = Number(p.profit);
      const plSign = Number.isFinite(profitVal) && profitVal > 0 ? '+' : '';
      const plText = Number.isFinite(profitVal)
        ? `${plSign}${fmtMoney.format(profitVal)}`
        : '-';
      const plClass = Number.isFinite(profitVal)
        ? (profitVal > 0 ? 'mt5-pl-positive' : (profitVal < 0 ? 'mt5-pl-negative' : ''))
        : '';

      row.innerHTML = `
        <span class="col col-id">#${ticket}</span>
        <span class="col col-symbol">${symbol}</span>
        <span class="col col-type">${typeLabel}</span>
        <span class="col col-weight">${w}</span>
        <span class="col col-price">${price}</span>
        <span class="col col-pl"><span class="${plClass}">${plText}</span></span>
      `;

      mt5CompletedGridBodyEl.appendChild(row);
    });
  }

  function updateMt5OrdersStatsFromBridge(pendingOrders, positions) {
    if (!mt5OrdersStatusTextEl) return;

    const pendingCount = Array.isArray(pendingOrders) ? pendingOrders.length : 0;
    const openCount = Array.isArray(positions) ? positions.length : 0;
    const total = pendingCount + openCount;

    if (total === 0) {
      mt5OrdersStatusTextEl.textContent = langCode === 'en'
        ? 'No MT5 orders'
        : 'لا توجد أوامر MT5 حالياً';
    } else {
      mt5OrdersStatusTextEl.textContent = langCode === 'en'
        ? `${total} MT5 order(s)`
        : `إجمالي أوامر MT5: ${total}`;
    }
  }

  async function refreshMt5OrdersCard() {
    if (!mt5PendingCountEl && !mt5CompletedCountEl) return;

    let pendingOrders = [];
    let openPositions = [];

    // 1) Load pending orders directly from MT5 bridge
    if (window.sys && typeof window.sys.listMt5PendingOrders === 'function') {
      try {
        const mt5Res = await window.sys.listMt5PendingOrders();
        if (mt5Res && mt5Res.success) {
          pendingOrders = Array.isArray(mt5Res.orders) ? mt5Res.orders : [];
          updateMt5PendingFromBridge(pendingOrders);
        } else if (mt5PendingEmptyEl && mt5PendingGridEl && mt5PendingGridBodyEl) {
          mt5PendingGridBodyEl.innerHTML = '';
          mt5PendingGridEl.style.display = 'none';
          mt5PendingEmptyEl.textContent = (mt5Res && mt5Res.error)
            ? mt5Res.error
            : (langCode === 'en' ? 'Failed to load MT5 pending orders' : 'تعذر تحميل أوامر MT5 المعلقة');
          mt5PendingEmptyEl.style.display = 'block';
        }
      } catch (_) {
        if (mt5PendingEmptyEl && mt5PendingGridEl && mt5PendingGridBodyEl) {
          mt5PendingGridBodyEl.innerHTML = '';
          mt5PendingGridEl.style.display = 'none';
          mt5PendingEmptyEl.textContent = langCode === 'en'
            ? 'Error while loading MT5 pending orders'
            : 'خطأ أثناء تحميل أوامر MT5 المعلقة';
          mt5PendingEmptyEl.style.display = 'block';
        }
      }
    }

    // 2) Load open positions directly from MT5 bridge
    if (window.sys && typeof window.sys.listMt5OpenPositions === 'function') {
      try {
        const mt5Pos = await window.sys.listMt5OpenPositions();
        if (mt5Pos && mt5Pos.success) {
          openPositions = Array.isArray(mt5Pos.positions) ? mt5Pos.positions : [];
          updateMt5CompletedFromBridge(openPositions);
        } else if (mt5CompletedEmptyEl && mt5CompletedGridEl && mt5CompletedGridBodyEl) {
          mt5CompletedGridBodyEl.innerHTML = '';
          mt5CompletedGridEl.style.display = 'none';
          mt5CompletedEmptyEl.textContent = (mt5Pos && mt5Pos.error)
            ? mt5Pos.error
            : (langCode === 'en' ? 'Failed to load MT5 open positions' : 'تعذر تحميل العمليات المنفذة حالياً');
          mt5CompletedEmptyEl.style.display = 'block';
        }
      } catch (_) {
        if (mt5CompletedEmptyEl && mt5CompletedGridEl && mt5CompletedGridBodyEl) {
          mt5CompletedGridBodyEl.innerHTML = '';
          mt5CompletedGridEl.style.display = 'none';
          mt5CompletedEmptyEl.textContent = langCode === 'en'
            ? 'Error while loading MT5 open positions'
            : 'خطأ أثناء تحميل العمليات المنفذة حالياً';
          mt5CompletedEmptyEl.style.display = 'block';
        }
      }
    }

    updateMt5OrdersStatsFromBridge(pendingOrders, openPositions);

    if (mt5OrdersUpdatedEl) {
      mt5OrdersUpdatedEl.textContent = fmtLocal.format(new Date());
    }
  }

  function ensureInlineChartStyle(el) {
    if (!el || !el.style) return;
    el.style.width = '100%';
    el.style.height = '96px';
    el.style.display = 'block';
    el.style.borderRadius = '16px';
    el.style.border = '1px solid rgba(148,163,184,.18)';
    const theme = document.documentElement ? document.documentElement.getAttribute('data-theme') : '';
    const isLight = theme === 'light' || (theme !== 'dark' && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches);
    el.style.background = isLight
      ? 'linear-gradient(180deg, rgba(255,255,255,.85), rgba(255,255,255,.60))'
      : 'linear-gradient(180deg, rgba(2,6,23,.30), rgba(2,6,23,.08))';
    el.style.marginTop = '10px';
  }

  function ensureChartCanvas(id, anyElInCard) {
    let el = document.getElementById(id);
    if (el) {
      ensureInlineChartStyle(el);
      return el;
    }
    if (!anyElInCard || typeof anyElInCard.closest !== 'function') return null;
    const row = anyElInCard.closest('.xau-price-row');
    if (!row || !row.parentElement) return null;
    el = document.createElement('canvas');
    el.id = id;
    el.className = 'xau-chart';
    ensureInlineChartStyle(el);
    row.insertAdjacentElement('afterend', el);
    return el;
  }

  xauChartEl = ensureChartCanvas('xauChart', xauPriceEl) || xauChartEl;
  xagChartEl = ensureChartCanvas('xagChart', xagPriceEl) || xagChartEl;

  function setRefreshUiLoading(isLoading) {
    if (btnRefreshXau) {
      btnRefreshXau.disabled = isLoading;
      const icon = btnRefreshXau.querySelector('i');
      if (icon) icon.classList.toggle('fa-spin', isLoading);
    }
    if (btnRefreshXag) {
      btnRefreshXag.disabled = isLoading;
      const icon = btnRefreshXag.querySelector('i');
      if (icon) icon.classList.toggle('fa-spin', isLoading);
    }
  }

  function setMt5ReconnectVisible(visible) {
    const show = !!visible;
    if (btnMt5ReconnectXau) btnMt5ReconnectXau.hidden = !show;
    if (btnMt5ReconnectXag) btnMt5ReconnectXag.hidden = !show;
  }

  function setMt5ReconnectLoading(isLoading) {
    const list = [btnMt5ReconnectXau, btnMt5ReconnectXag];
    for (const btn of list) {
      if (!btn) continue;
      btn.disabled = !!isLoading;
      const icon = btn.querySelector('i');
      if (icon) icon.classList.toggle('fa-spin', !!isLoading);
    }
  }

  async function attemptMt5ReconnectOnce() {
    if (!window.sys || !window.sys.mt5Reconnect) return;
    if (mt5ReconnectCooldownTimer) return;
    setMt5ReconnectLoading(true);
    try {
      await window.sys.mt5Reconnect();
    } catch (_) {}

    setTimeout(() => { refreshXauPrice({ silent: true }); }, 2000);
    setTimeout(() => {
      if (activeSource !== 'mt5') refreshXauPrice({ silent: true });
    }, 6000);

    mt5ReconnectCooldownTimer = setTimeout(() => {
      mt5ReconnectCooldownTimer = null;
      setMt5ReconnectLoading(false);
    }, 12000);
  }

  function setOfflineHint(msgKey) {
    const msg = t(msgKey);
    if (xauMetaEl) xauMetaEl.textContent = msg;
    if (xauLastUpdateEl) xauLastUpdateEl.textContent = '—';
    if (xauNextLabelEl) xauNextLabelEl.textContent = '—';
    if (xauCountdownEl) xauCountdownEl.textContent = '—';
    if (xauNextTimeEl) xauNextTimeEl.textContent = '—';
    if (xauMarketBadgeEl) {
      xauMarketBadgeEl.classList.remove('open', 'closed');
      xauMarketBadgeEl.innerHTML = '<i class="fa-solid fa-circle"></i> —';
    }
    if (xagMetaEl) xagMetaEl.textContent = msg;
    if (xagLastUpdateEl) xagLastUpdateEl.textContent = '—';
    if (xagNextLabelEl) xagNextLabelEl.textContent = '—';
    if (xagCountdownEl) xagCountdownEl.textContent = '—';
    if (xagNextTimeEl) xagNextTimeEl.textContent = '—';
    if (xagMarketBadgeEl) {
      xagMarketBadgeEl.classList.remove('open', 'closed');
      xagMarketBadgeEl.innerHTML = '<i class="fa-solid fa-circle"></i> —';
    }
  }

  function getZonedParts(date, timeZone) {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour12: false,
      weekday: 'short',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).formatToParts(date);
    const map = {};
    for (const p of parts) {
      if (p.type !== 'literal') map[p.type] = p.value;
    }
    return {
      weekday: map.weekday,
      year: Number(map.year),
      month: Number(map.month),
      day: Number(map.day),
      hour: Number(map.hour),
      minute: Number(map.minute),
      second: Number(map.second)
    };
  }

  function getTimeZoneOffsetMs(date, timeZone) {
    const p = getZonedParts(date, timeZone);
    const asUTC = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
    return asUTC - date.getTime();
  }

  function fromZonedParts(year, month, day, hour, minute, second, timeZone) {
    let guess = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
    let offset = getTimeZoneOffsetMs(guess, timeZone);
    let utc = new Date(Date.UTC(year, month - 1, day, hour, minute, second) - offset);
    offset = getTimeZoneOffsetMs(utc, timeZone);
    utc = new Date(Date.UTC(year, month - 1, day, hour, minute, second) - offset);
    return utc;
  }

  function addDaysUTC(y, m, d, days) {
    const dt = new Date(Date.UTC(y, m - 1, d + days));
    return { year: dt.getUTCFullYear(), month: dt.getUTCMonth() + 1, day: dt.getUTCDate() };
  }

  function computeMarketSchedule(now) {
    const tz = 'America/New_York';
    const p = getZonedParts(now, tz);
    const wdMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    const wd = wdMap[p.weekday] ?? 0;
    const minutes = (p.hour * 60) + p.minute;
    const openMinutes = 17 * 60;

    let isOpen = true;
    if (wd === 6) isOpen = false;
    else if (wd === 0 && minutes < openMinutes) isOpen = false;
    else if (wd === 5 && minutes >= openMinutes) isOpen = false;

    if (isOpen) {
      const daysUntilFri = (5 - wd + 7) % 7;
      const closeDay = addDaysUTC(p.year, p.month, p.day, daysUntilFri);
      const closeAt = fromZonedParts(closeDay.year, closeDay.month, closeDay.day, 17, 0, 0, tz);
      return { isOpen: true, type: 'close', eventAt: closeAt };
    }

    const daysUntilSun = (0 - wd + 7) % 7;
    const openDay = addDaysUTC(p.year, p.month, p.day, daysUntilSun);
    const openAt = fromZonedParts(openDay.year, openDay.month, openDay.day, 17, 0, 0, tz);
    return { isOpen: false, type: 'open', eventAt: openAt };
  }

  function formatCountdown(ms) {
    const total = Math.max(0, Math.floor(ms / 1000));
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    const hh = String(h).padStart(2, '0');
    const mm = String(m).padStart(2, '0');
    const ss = String(s).padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
  }

  function applyMarketUi() {
    const sched = computeMarketSchedule(new Date());
    nextEvent = sched;

    if (xauMarketBadgeEl) {
      xauMarketBadgeEl.classList.remove('open', 'closed');
      xauMarketBadgeEl.classList.add(sched.isOpen ? 'open' : 'closed');
      xauMarketBadgeEl.innerHTML = `<i class="fa-solid fa-circle"></i> ${sched.isOpen ? t('marketOpen') : t('marketClosed')}`;
    }

    if (xagMarketBadgeEl) {
      xagMarketBadgeEl.classList.remove('open', 'closed');
      xagMarketBadgeEl.classList.add(sched.isOpen ? 'open' : 'closed');
      xagMarketBadgeEl.innerHTML = `<i class="fa-solid fa-circle"></i> ${sched.isOpen ? t('marketOpen') : t('marketClosed')}`;
    }

    if (xauNextLabelEl) {
      xauNextLabelEl.textContent = sched.isOpen ? t('closesIn') : t('opensIn');
    }

    if (xagNextLabelEl) {
      xagNextLabelEl.textContent = sched.isOpen ? t('closesIn') : t('opensIn');
    }

    if (xauNextTimeEl) {
      xauNextTimeEl.textContent = fmtNY.format(sched.eventAt);
    }

    if (xagNextTimeEl) {
      xagNextTimeEl.textContent = fmtNY.format(sched.eventAt);
    }
  }

  function tickCountdown() {
    if (!nextEvent || !nextEvent.eventAt) {
      if (xauCountdownEl) xauCountdownEl.textContent = '—';
      if (xagCountdownEl) xagCountdownEl.textContent = '—';
      return;
    }
    const ms = nextEvent.eventAt.getTime() - Date.now();
    if (ms <= 0) {
      applyMarketUi();
      return;
    }
    const txt = formatCountdown(ms);
    if (xauCountdownEl) xauCountdownEl.textContent = txt;
    if (xagCountdownEl) xagCountdownEl.textContent = txt;
  }

  function ensureCanvasSize(canvas) {
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width));
    const h = Math.max(1, Math.floor(rect.height));
    const dpr = window.devicePixelRatio || 1;
    const bw = Math.max(1, Math.floor(w * dpr));
    const bh = Math.max(1, Math.floor(h * dpr));
    if (canvas.width !== bw) canvas.width = bw;
    if (canvas.height !== bh) canvas.height = bh;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, w, h };
  }

  function drawSparkline(canvas, series) {
    const r = ensureCanvasSize(canvas);
    if (!r) return;
    const { ctx, w, h } = r;
    ctx.clearRect(0, 0, w, h);

    if (!series || series.length < 2) return;

    const pad = Math.round(Math.max(10, Math.min(14, h * 0.14)));
    const innerW = Math.max(1, w - (pad * 2));
    const innerH = Math.max(1, h - (pad * 2));
    const values = series.map(p => p.v);
    let minV = Math.min(...values);
    let maxV = Math.max(...values);
    if (!Number.isFinite(minV) || !Number.isFinite(maxV)) return;
    if (minV === maxV) {
      minV -= 1;
      maxV += 1;
    }

    ctx.save();
    ctx.strokeStyle = 'rgba(148, 163, 184, .16)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    const gy1 = pad + (innerH * 0.25);
    const gy2 = pad + (innerH * 0.5);
    const gy3 = pad + (innerH * 0.75);
    ctx.moveTo(pad, gy1);
    ctx.lineTo(w - pad, gy1);
    ctx.moveTo(pad, gy2);
    ctx.lineTo(w - pad, gy2);
    ctx.moveTo(pad, gy3);
    ctx.lineTo(w - pad, gy3);
    ctx.stroke();
    ctx.restore();

    const first = values[0];
    const last = values[values.length - 1];
    const up = last >= first;
    const lineColor = up ? 'rgba(46, 204, 113, .95)' : 'rgba(255, 107, 107, .95)';
    const glowColor = up ? 'rgba(46, 204, 113, .35)' : 'rgba(255, 107, 107, .35)';
    const glowStroke = up ? 'rgba(46, 204, 113, .18)' : 'rgba(255, 107, 107, .18)';
    const fillGradient = ctx.createLinearGradient(0, pad, 0, h - pad);
    fillGradient.addColorStop(0, up ? 'rgba(46, 204, 113, .18)' : 'rgba(255, 107, 107, .18)');
    fillGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    const n = series.length;
    const xStep = n > 1 ? innerW / (n - 1) : innerW;
    const pts = new Array(n);
    for (let i = 0; i < n; i++) {
      const v = series[i].v;
      const norm = (v - minV) / (maxV - minV);
      const x = pad + (i * xStep);
      const y = pad + ((1 - norm) * innerH);
      pts[i] = { x, y };
    }

    const strokeSmooth = (width, strokeStyle, shadowBlur, shadowColor) => {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      if (pts.length === 2) {
        ctx.lineTo(pts[1].x, pts[1].y);
      } else {
        for (let i = 1; i < pts.length - 2; i++) {
          const xc = (pts[i].x + pts[i + 1].x) / 2;
          const yc = (pts[i].y + pts[i + 1].y) / 2;
          ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
        }
        const pen = pts[pts.length - 2];
        const lastPt = pts[pts.length - 1];
        ctx.quadraticCurveTo(pen.x, pen.y, lastPt.x, lastPt.y);
      }
      ctx.lineWidth = width;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.strokeStyle = strokeStyle;
      ctx.shadowBlur = shadowBlur || 0;
      ctx.shadowColor = shadowColor || 'transparent';
      ctx.stroke();
      ctx.restore();
    };

    const fillSmooth = () => {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(pts[0].x, h - pad);
      ctx.lineTo(pts[0].x, pts[0].y);
      if (pts.length === 2) {
        ctx.lineTo(pts[1].x, pts[1].y);
      } else {
        for (let i = 1; i < pts.length - 2; i++) {
          const xc = (pts[i].x + pts[i + 1].x) / 2;
          const yc = (pts[i].y + pts[i + 1].y) / 2;
          ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
        }
        const pen = pts[pts.length - 2];
        const lastPt = pts[pts.length - 1];
        ctx.quadraticCurveTo(pen.x, pen.y, lastPt.x, lastPt.y);
      }
      const lastPt = pts[pts.length - 1];
      ctx.lineTo(lastPt.x, h - pad);
      ctx.closePath();
      ctx.fillStyle = fillGradient;
      ctx.fill();
      ctx.restore();
    };

    fillSmooth();
    strokeSmooth(6, glowStroke, 12, glowColor);
    strokeSmooth(2.2, lineColor, 0, 'transparent');

    const lp = pts[pts.length - 1];
    ctx.save();
    ctx.setLineDash([5, 4]);
    ctx.strokeStyle = 'rgba(148, 163, 184, .18)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad, lp.y);
    ctx.lineTo(w - pad, lp.y);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.arc(lp.x, lp.y, 3.6, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,.92)';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = lineColor;
    ctx.stroke();
    ctx.restore();
  }

  function pushSeriesPoint(series, v, ts) {
    if (!Number.isFinite(v)) return;
    series.push({ t: ts, v });
    if (series.length > MAX_POINTS) {
      series.splice(0, series.length - MAX_POINTS);
    }
  }

  function flashPrice(el, direction) {
    if (!el || typeof el.animate !== 'function') return;
    const bg = direction === 'up' ? 'rgba(46, 204, 113, .18)' : 'rgba(255, 107, 107, .18)';
    el.animate(
      [
        { backgroundColor: bg, transform: 'scale(1.01)' },
        { backgroundColor: 'transparent', transform: 'scale(1)' }
      ],
      { duration: 450, easing: 'ease-out' }
    );
  }

  async function refreshXauPrice(opts = {}) {
    const silent = !!opts.silent;
    if (refreshInFlight) return;
    if (!window.sys || !window.sys.getXauUsdPrice) {
      setOfflineHint('offlineHintNotAvailable');
      currentRefreshMs = REFRESH_GOLDPRICE_MS;
      return;
    }

    refreshInFlight = true;
    if (!silent) setRefreshUiLoading(true);
    try {
      if (!silent) {
        if (xauMetaEl) xauMetaEl.textContent = t('offlineHintUpdating');
        if (xagMetaEl) xagMetaEl.textContent = t('offlineHintUpdating');
      }
      const res = await window.sys.getXauUsdPrice();
      if (!res || !res.success) {
        setOfflineHint('offlineHintFailed');
        setMt5ReconnectVisible(true);
        currentRefreshMs = REFRESH_GOLDPRICE_MS;
        return;
      }

      if (res && typeof res.source === 'string') {
        activeSource = res.source;
      }
      currentRefreshMs = (activeSource !== 'mt5') ? REFRESH_GOLDPRICE_MS : REFRESH_MT5_MS;
      setMt5ReconnectVisible(activeSource !== 'mt5');

      const price = Number(res.price);
      const change = Number(res.change || 0);
      const percent = Number(res.percent || 0);
      const tickTs = Number(res.ts);
      const sampleTs = Number.isFinite(tickTs) ? (tickTs < 1e12 ? tickTs * 1000 : tickTs) : Date.now();

      if (xauPriceEl && Number.isFinite(price)) {
        if (Number.isFinite(lastXauPrice)) {
          if (price > lastXauPrice) flashPrice(xauPriceEl, 'up');
          else if (price < lastXauPrice) flashPrice(xauPriceEl, 'down');
        }
        lastXauPrice = price;
        pushSeriesPoint(xauSeries, price, sampleTs);
        drawSparkline(xauChartEl, xauSeries);
        xauPriceEl.textContent = `${fmtMoney.format(price)} $`;
      }

      const xagPriceRaw = res.xagPrice;
      const xagPrice = (xagPriceRaw === null || xagPriceRaw === undefined || xagPriceRaw === '')
        ? Number.NaN
        : Number(xagPriceRaw);
      const xagChange = Number(res.xagChange || 0);
      const xagPercent = Number(res.xagPercent || 0);

      if (xagPriceEl) {
        if (Number.isFinite(xagPrice) && xagPrice > 0) {
          if (Number.isFinite(lastXagPrice)) {
            if (xagPrice > lastXagPrice) flashPrice(xagPriceEl, 'up');
            else if (xagPrice < lastXagPrice) flashPrice(xagPriceEl, 'down');
          }
          lastXagPrice = xagPrice;
          pushSeriesPoint(xagSeries, xagPrice, sampleTs);
          drawSparkline(xagChartEl, xagSeries);
          xagPriceEl.textContent = `${fmtMoney.format(xagPrice)} $`;
        } else {
          lastXagPrice = null;
          xagPriceEl.textContent = '—';
        }
      }

      if (xauChangeEl) {
        const sign = change > 0 ? '+' : '';
        const pctSign = percent > 0 ? '+' : '';
        xauChangeEl.textContent = `${sign}${fmtMoney.format(change)} $ (${pctSign}${fmtPct.format(percent)}%)`;
        xauChangeEl.style.color = change < 0 ? 'var(--error)' : (change > 0 ? 'var(--success)' : 'var(--subtle)');
      }

      if (xagChangeEl) {
        if (!(Number.isFinite(xagPrice) && xagPrice > 0)) {
          xagChangeEl.textContent = '—';
          xagChangeEl.style.color = 'var(--subtle)';
        } else {
          const sign = xagChange > 0 ? '+' : '';
          const pctSign = xagPercent > 0 ? '+' : '';
          xagChangeEl.textContent = `${sign}${fmtMoney.format(xagChange)} $ (${pctSign}${fmtPct.format(xagPercent)}%)`;
          xagChangeEl.style.color = xagChange < 0 ? 'var(--error)' : (xagChange > 0 ? 'var(--success)' : 'var(--subtle)');
        }
      }

      const localTs = res.ts ? new Date(res.ts) : new Date();
      if (xauLastUpdateEl) xauLastUpdateEl.textContent = fmtLocal.format(localTs);
      if (xagLastUpdateEl) xagLastUpdateEl.textContent = fmtLocal.format(localTs);

      applyMarketUi();
      tickCountdown();

      if (xauMetaEl) {
        xauMetaEl.textContent = getSourceMeta(res);
      }
      if (xagMetaEl) {
        xagMetaEl.textContent = getSourceMeta(res);
      }
    } catch (_) {
      setOfflineHint('offlineHintFailed');
      setMt5ReconnectVisible(true);
      currentRefreshMs = REFRESH_GOLDPRICE_MS;
    } finally {
      refreshInFlight = false;
      if (!silent) setRefreshUiLoading(false);
    }
  }

  if (btnRefreshXau) {
    btnRefreshXau.addEventListener('click', (e) => {
      e.preventDefault();
      refreshXauPrice();
    });
  }

  if (btnRefreshXag) {
    btnRefreshXag.addEventListener('click', (e) => {
      e.preventDefault();
      refreshXauPrice();
    });
  }

  // MT5 orders card auto-sync toggle
  const setMt5AutoSyncLabel = () => {
    if (!mt5OrdersRefreshText) return;
    mt5OrdersRefreshText.textContent = mt5AutoSync ? t('mt5AutoSyncOn') : t('mt5AutoSyncOff');
  };

  if (btnRefreshMt5Orders) {
    // حالة افتراضية: تشغيل المزامنة اللحظية
    btnRefreshMt5Orders.classList.toggle('on', mt5AutoSync);
    setMt5AutoSyncLabel();

    btnRefreshMt5Orders.addEventListener('click', (e) => {
      e.preventDefault();
      mt5AutoSync = !mt5AutoSync;
      btnRefreshMt5Orders.classList.toggle('on', mt5AutoSync);
      setMt5AutoSyncLabel();
    });
  }

  if (btnMt5ReconnectXau) {
    btnMt5ReconnectXau.addEventListener('click', (e) => {
      e.preventDefault();
      attemptMt5ReconnectOnce();
    });
  }

  if (btnMt5ReconnectXag) {
    btnMt5ReconnectXag.addEventListener('click', (e) => {
      e.preventDefault();
      attemptMt5ReconnectOnce();
    });
  }

  applyMarketUi();
  tickCountdown();

  // Initial load for MT5 orders card (pending orders details)
  refreshMt5OrdersCard();

  const refreshLoop = async () => {
    const start = Date.now();
    await refreshXauPrice({ silent: true });
    if (mt5AutoSync) {
      await refreshMt5OrdersCard();
    }
    const elapsed = Date.now() - start;
    const ms = Number.isFinite(Number(currentRefreshMs)) ? Number(currentRefreshMs) : REFRESH_MT5_MS;
    refreshTimer = setTimeout(refreshLoop, Math.max(0, ms - elapsed));
  };

  refreshLoop();
  tickTimer = setInterval(tickCountdown, 1000);
  window.addEventListener('resize', () => {
    drawSparkline(xauChartEl, xauSeries);
    drawSparkline(xagChartEl, xagSeries);
  });
  window.addEventListener('beforeunload', () => {
    if (refreshTimer) clearTimeout(refreshTimer);
    if (tickTimer) clearInterval(tickTimer);
  });
})();

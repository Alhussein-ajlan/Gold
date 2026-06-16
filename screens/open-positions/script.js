/**
 * المراكز المفتوحة - Open Positions Screen
 * يعرض مراكز العملاء والموردين المفتوحة مع حساب التغطية المطلوبة
 * يستخدم نفس كود MT5 من لوحة التحكم
 */

(async function() {
  'use strict';

  // ===== Load Translations =====
  let OP_TRANSLATIONS = { ar: {}, en: {} };
  let currentLang = 'ar';

  async function loadTranslations() {
    try {
      const arRes = await fetch('./locales/ar.json');
      const enRes = await fetch('./locales/en.json');
      OP_TRANSLATIONS.ar = await arRes.json();
      OP_TRANSLATIONS.en = await enRes.json();
    } catch (err) {
      console.error('Error loading translations:', err);
    }
  }

  function getOPLang() {
    return localStorage.getItem('uiLang') || 'ar';
  }

  function t(key, params = {}) {
    const lang = currentLang;
    const keys = key.split('.');
    let val = OP_TRANSLATIONS[lang];
    for (const k of keys) {
      val = val?.[k];
      if (val === undefined) break;
    }
    if (typeof val !== 'string') {
      val = OP_TRANSLATIONS.ar;
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
    currentLang = getOPLang();
    const isRTL = currentLang === 'ar';
    document.documentElement.lang = currentLang;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = t(key);
      if (text && text !== key) {
        // إذا كان العنصر يحتوي على عناصر فرعية، نحدث النص فقط
        if (el.children.length === 0) {
          el.textContent = text;
        } else {
          // نبحث عن عقدة النص المباشرة ونحدثها
          for (let node of el.childNodes) {
            if (node.nodeType === Node.TEXT_NODE) {
              node.textContent = text;
              break;
            }
          }
        }
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const text = t(key);
      if (text && text !== key) el.placeholder = text;
    });

    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const text = t(key);
      if (text && text !== key) el.title = text;
    });

    document.title = t('openPositions.title');
  }

  window.addEventListener('storage', (e) => {
    if (e.key === 'uiLang') {
      applyTranslations();
      switchTab(currentTab); // تحديث عناوين الأعمدة
      updateCards();
      renderTable();
    }
  });

  window.addEventListener('languageChanged', () => {
    applyTranslations();
    switchTab(currentTab); // تحديث عناوين الأعمدة
    updateCards();
    renderTable();
  });

  // ========== المتغيرات العامة ==========
  let currentTab = 'cash-debit-gold-credit';
  let positionsData = [];
  let comparePrice = 120.56;
  let lastXauPrice = null;
  let invoiceSettings = null; // إعدادات حساب الأونصة
  let customerEntityCache = [];
  let supplierEntityCache = [];

  function normalizeOpenPositionsRows(result) {
    if (!result || !result.success) return [];
    if (Array.isArray(result.data)) return result.data;
    return [];
  }

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
      const explicitMode = String(window.currentBranchScopeContext?.mode || window.currentBranchScopeContext?.scope || '').trim().toLowerCase();
      if (explicitMode === 'all') {
        return 'all';
      }
    } catch (_) {}
    try {
      const raw = localStorage.getItem('branchScope');
      const parsed = raw ? JSON.parse(raw) : null;
      return String(parsed?.mode || parsed?.scope || '').trim().toLowerCase() === 'all' ? 'all' : 'branch';
    } catch (_) {
      return 'branch';
    }
  }

  function shouldShowPositionBranchDetails() {
    return getStoredBranchScopeMode() === 'all';
  }

  function getPositionBranchText(item) {
    const branchCode = String(item?.branchCode || item?.branch_code || '').trim();
    const branchName = String(item?.branchName || item?.branch_name || '').trim();
    if (branchCode && branchName) return `${branchCode} - ${branchName}`;
    return branchName || branchCode || '';
  }

  function getPositionNameText(item) {
    return String(item?.name || '').trim();
  }

  function getPositionTypeText(item) {
    const typeLabel = String(item?.typeLabel || '').trim();
    const branchText = getPositionBranchText(item);
    if (!shouldShowPositionBranchDetails() || !branchText) {
      return typeLabel;
    }
    return `${typeLabel} • ${branchText}`;
  }

  function getPositionNameHtml(item) {
    const safeName = escapeHtml(String(item?.name || '').trim() || '-');
    return `<span class="position-party-name">${safeName}</span>`;
  }

  function getPositionIdHtml(item) {
    const safeId = escapeHtml(String(item?.id ?? '').trim() || '-');
    return `<span class="position-party-id">${safeId}</span>`;
  }

  function getPositionTypeHtml(item, typeIcon, typeColor) {
    const safeTypeLabel = escapeHtml(String(item?.typeLabel || '').trim() || '-');
    const branchText = getPositionBranchText(item);
    const typeLabelHtml = `<span class="position-type-label" style="color:${typeColor}"><i class="fa-solid ${typeIcon}"></i>${safeTypeLabel}</span>`;
    if (!shouldShowPositionBranchDetails() || !branchText) {
      return typeLabelHtml;
    }
    const safeBranchText = escapeHtml(branchText);
    return `<span class="position-type-cell">${typeLabelHtml}<span class="position-branch-badge" title="${safeBranchText}">${safeBranchText}</span></span>`;
  }

  async function loadOpenPositionsEntityRows(entityType) {
    if (entityType === 'customer') {
      if (customerEntityCache.length) return customerEntityCache;
      const result = window.api?.getCustomers ? await window.api.getCustomers() : (window.db?.getCustomers ? await window.db.getCustomers() : null);
      customerEntityCache = normalizeOpenPositionsRows(result);
      return customerEntityCache;
    }

    if (supplierEntityCache.length) return supplierEntityCache;
    const result = window.api?.getSuppliers ? await window.api.getSuppliers() : (window.suppliers?.getSuppliers ? await window.suppliers.getSuppliers() : null);
    supplierEntityCache = normalizeOpenPositionsRows(result);
    return supplierEntityCache;
  }

  async function getOpenPositionsEntityMeta(entityType, id) {
    const rows = await loadOpenPositionsEntityRows(entityType);
    const entityId = Number(id);
    const entity = rows.find((row) => Number(row?.id) === entityId);
    if (!entity) {
      return { phone: '', tax: '', region: '' };
    }
    return {
      phone: entity.phone || '',
      tax: entity.tax_no || '',
      region: entity.region || ''
    };
  }

  // ========== MT5 Variables (من لوحة التحكم) ==========
  const REFRESH_MT5_MS = 1000;
  const REFRESH_GOLDPRICE_MS = 15000;
  let activeSource = null;
  let currentRefreshMs = REFRESH_MT5_MS;
  let refreshTimer = null;
  let tickTimer = null;
  let refreshInFlight = false;
  let mt5ReconnectCooldownTimer = null;
  let nextEvent = null;
  const MAX_POINTS = 240;
  const xauSeries = [];

  const fmtMoney = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtPct = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtLocal = new Intl.DateTimeFormat('ar', { dateStyle: 'medium', timeStyle: 'medium' });
  const fmtNY = new Intl.DateTimeFormat('ar', { timeZone: 'America/New_York', dateStyle: 'medium', timeStyle: 'medium' });

  // ========== عناصر DOM - بطاقة الذهب MT5 ==========
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

  // ========== عناصر DOM - البطاقات ==========
  const totalCoverageRequiredEl = document.getElementById('totalCoverageRequired');
  const coverageCountEl = document.getElementById('coverageCount');
  const coverageCustomersCountEl = document.getElementById('coverageCustomersCount');
  const coverageGoldTotalEl = document.getElementById('coverageGoldTotal');
  const safeAccountsTotalEl = document.getElementById('safeAccountsTotal');
  const safeCountEl = document.getElementById('safeCount');
  const safeCustomersCountEl = document.getElementById('safeCustomersCount');
  const avgCoveragePriceEl = document.getElementById('avgCoveragePrice');
  const totalCashDebitEl = document.getElementById('totalCashDebit');
  const totalGoldCreditEl = document.getElementById('totalGoldCredit');
  const totalCashCreditEl = document.getElementById('totalCashCredit');
  const totalGoldDebitEl = document.getElementById('totalGoldDebit');

  // ========== عناصر DOM - الجدول ==========
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tab1CountEl = document.getElementById('tab1Count');
  const tab2CountEl = document.getElementById('tab2Count');
  const tableTitleEl = document.getElementById('tableTitle');
  const searchInputEl = document.getElementById('searchInput');
  const comparePriceInputEl = document.getElementById('comparePrice');
  const statusFilterEl = document.getElementById('statusFilter');
  const positionsTableBodyEl = document.getElementById('positionsTableBody');
  const footerCashTotalEl = document.getElementById('footerCashTotal');
  const footerGoldTotalEl = document.getElementById('footerGoldTotal');
  const footerCoverageTotalEl = document.getElementById('footerCoverageTotal');
  const noDataMessageEl = document.getElementById('noDataMessage');
  const loadingOverlayEl = document.getElementById('loadingOverlay');
  const btnRefresh = document.getElementById('btnRefresh');
  const btnExportExcel = document.getElementById('btnExportExcel');
  const btnExportPdf = document.getElementById('btnExportPdf');

  // ========== MT5 Functions (نفس كود لوحة التحكم) ==========
  function getSourceMeta(res) {
    const src = res && typeof res.source === 'string' ? res.source : '';
    if (src === 'mt5') {
      return 'المصدر: MT5 (من الجهاز) · Mid=(Bid+Ask)/2';
    }
    return 'المصدر: Yahoo Finance · وقت السوق حسب نيويورك';
  }

  function setRefreshUiLoading(isLoading) {
    if (btnRefreshXau) {
      btnRefreshXau.disabled = isLoading;
      const icon = btnRefreshXau.querySelector('i');
      if (icon) icon.classList.toggle('fa-spin', isLoading);
    }
  }

  function setMt5ReconnectVisible(visible) {
    if (btnMt5ReconnectXau) btnMt5ReconnectXau.hidden = !visible;
  }

  function setMt5ReconnectLoading(isLoading) {
    if (!btnMt5ReconnectXau) return;
    btnMt5ReconnectXau.disabled = !!isLoading;
    const icon = btnMt5ReconnectXau.querySelector('i');
    if (icon) icon.classList.toggle('fa-spin', !!isLoading);
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

  function setOfflineHint(msg) {
    if (xauMetaEl) xauMetaEl.textContent = msg;
    if (xauLastUpdateEl) xauLastUpdateEl.textContent = '—';
    if (xauNextLabelEl) xauNextLabelEl.textContent = '—';
    if (xauCountdownEl) xauCountdownEl.textContent = '—';
    if (xauNextTimeEl) xauNextTimeEl.textContent = '—';
    if (xauMarketBadgeEl) {
      xauMarketBadgeEl.classList.remove('open', 'closed');
      xauMarketBadgeEl.innerHTML = '<i class="fa-solid fa-circle"></i> —';
    }
  }

  function getZonedParts(date, timeZone) {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone, hour12: false, weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'
    }).formatToParts(date);
    const map = {};
    for (const p of parts) { if (p.type !== 'literal') map[p.type] = p.value; }
    return { weekday: map.weekday, year: Number(map.year), month: Number(map.month), day: Number(map.day), hour: Number(map.hour), minute: Number(map.minute), second: Number(map.second) };
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
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  function applyMarketUi() {
    const sched = computeMarketSchedule(new Date());
    nextEvent = sched;
    if (xauMarketBadgeEl) {
      xauMarketBadgeEl.classList.remove('open', 'closed');
      xauMarketBadgeEl.classList.add(sched.isOpen ? 'open' : 'closed');
      xauMarketBadgeEl.innerHTML = `<i class="fa-solid fa-circle"></i> ${sched.isOpen ? 'مفتوح' : 'مغلق'}`;
    }
    if (xauNextLabelEl) xauNextLabelEl.textContent = sched.isOpen ? 'يغلق بعد' : 'يفتح بعد';
    if (xauNextTimeEl) xauNextTimeEl.textContent = fmtNY.format(sched.eventAt);
  }

  function tickCountdown() {
    if (!nextEvent || !nextEvent.eventAt) {
      if (xauCountdownEl) xauCountdownEl.textContent = '—';
      return;
    }
    const ms = nextEvent.eventAt.getTime() - Date.now();
    if (ms <= 0) { applyMarketUi(); return; }
    if (xauCountdownEl) xauCountdownEl.textContent = formatCountdown(ms);
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
    if (minV === maxV) { minV -= 1; maxV += 1; }
    const pts = series.map((p, i) => ({
      x: pad + (i / (series.length - 1)) * innerW,
      y: pad + (1 - (p.v - minV) / (maxV - minV)) * innerH
    }));
    const lineColor = 'rgba(46, 204, 113, 1)';
    const glowColor = 'rgba(46, 204, 113, .45)';
    const glowStroke = 'rgba(46, 204, 113, .35)';
    const fillGradient = ctx.createLinearGradient(0, pad, 0, h - pad);
    fillGradient.addColorStop(0, 'rgba(46, 204, 113, .22)');
    fillGradient.addColorStop(1, 'rgba(46, 204, 113, 0)');
    const strokeSmooth = (lw, strokeStyle, shadowBlur, shadowColor) => {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      if (pts.length === 2) { ctx.lineTo(pts[1].x, pts[1].y); }
      else {
        for (let i = 1; i < pts.length - 2; i++) {
          const xc = (pts[i].x + pts[i + 1].x) / 2;
          const yc = (pts[i].y + pts[i + 1].y) / 2;
          ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
        }
        const pen = pts[pts.length - 2];
        const lastPt = pts[pts.length - 1];
        ctx.quadraticCurveTo(pen.x, pen.y, lastPt.x, lastPt.y);
      }
      ctx.lineWidth = lw;
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
      if (pts.length === 2) { ctx.lineTo(pts[1].x, pts[1].y); }
      else {
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
    if (series.length > MAX_POINTS) series.splice(0, series.length - MAX_POINTS);
  }

  function flashPrice(el, direction) {
    if (!el || typeof el.animate !== 'function') return;
    const bg = direction === 'up' ? 'rgba(46, 204, 113, .18)' : 'rgba(255, 107, 107, .18)';
    el.animate([{ backgroundColor: bg, transform: 'scale(1.01)' }, { backgroundColor: 'transparent', transform: 'scale(1)' }], { duration: 450, easing: 'ease-out' });
  }

  async function refreshXauPrice(opts = {}) {
    const silent = !!opts.silent;
    if (refreshInFlight) return;
    if (!window.sys || !window.sys.getXauUsdPrice) {
      setOfflineHint('آخر تحديث: — (غير متاح)');
      currentRefreshMs = REFRESH_GOLDPRICE_MS;
      return;
    }
    refreshInFlight = true;
    if (!silent) setRefreshUiLoading(true);
    try {
      if (!silent && xauMetaEl) xauMetaEl.textContent = 'آخر تحديث: جاري التحديث...';
      const res = await window.sys.getXauUsdPrice();
      if (!res || !res.success) {
        setOfflineHint('آخر تحديث: — (فشل الاتصال)');
        setMt5ReconnectVisible(true);
        currentRefreshMs = REFRESH_GOLDPRICE_MS;
        return;
      }
      if (res && typeof res.source === 'string') activeSource = res.source;
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
      if (xauChangeEl) {
        const sign = change > 0 ? '+' : '';
        const pctSign = percent > 0 ? '+' : '';
        xauChangeEl.textContent = `${sign}${fmtMoney.format(change)} $ (${pctSign}${fmtPct.format(percent)}%)`;
        xauChangeEl.style.color = change < 0 ? 'var(--error)' : (change > 0 ? 'var(--success)' : 'var(--subtle)');
      }
      const localTs = res.ts ? new Date(res.ts) : new Date();
      if (xauLastUpdateEl) xauLastUpdateEl.textContent = fmtLocal.format(localTs);
      applyMarketUi();
      tickCountdown();
      if (xauMetaEl) xauMetaEl.textContent = getSourceMeta(res);
      
      // تحديث الجدول والبطاقات بعد تحميل السعر
      if (positionsData.length > 0) {
        renderTable();
        updateCards();
      }
    } catch (_) {
      setOfflineHint('آخر تحديث: — (فشل الاتصال)');
      setMt5ReconnectVisible(true);
      currentRefreshMs = REFRESH_GOLDPRICE_MS;
    } finally {
      refreshInFlight = false;
      if (!silent) setRefreshUiLoading(false);
    }
  }

  // ========== تحميل بيانات المراكز من العملاء والموردين ==========
  async function loadPositionsData() {
    showLoading(true);
    positionsData = [];

    try {
      const dbApi = window.db || null;
      if (dbApi && typeof dbApi.getOpenPositions === 'function') {
        const result = await dbApi.getOpenPositions();
        
        if (result && result.success && result.data) {
          // معالجة بيانات العملاء
          const customers = result.data.customers || [];
          for (const cust of customers) {
            const cashBalance = Number(cust.cash_balance || 0);
            const goldBalance = Number(cust.gold_balance || 0);
            const pos = createPositionEntry(cust.id, cust.name, t('openPositions.table.customer'), 'customer', { cash: cashBalance, gold: goldBalance }, {
              branchId: Number(cust.branch_id || 0) || 0,
              branchName: cust.branch_name || '',
              branchCode: cust.branch_code || ''
            });
            if (pos) positionsData.push(pos);
          }
          
          // معالجة بيانات الموردين
          const suppliers = result.data.suppliers || [];
          for (const supp of suppliers) {
            const cashBalance = Number(supp.cash_balance || 0);
            const goldBalance = Number(supp.gold_balance || 0);
            const pos = createPositionEntry(supp.id, supp.name, t('openPositions.table.supplier'), 'supplier', { cash: cashBalance, gold: goldBalance }, {
              branchId: Number(supp.branch_id || 0) || 0,
              branchName: supp.branch_name || '',
              branchCode: supp.branch_code || ''
            });
            if (pos) positionsData.push(pos);
          }
        }
      } else {
        console.warn('getOpenPositions API not available');
      }

      updateCards();
      renderTable();
      updateTabCounts();

    } catch (error) {
      console.error('Error loading positions data:', error);
    } finally {
      showLoading(false);
    }
  }

  function createPositionEntry(id, name, typeLabel, entityType, balance, branchMeta = {}) {
    const cashBalance = balance.cash || 0;
    const goldBalance = balance.gold || 0;
    
    // مدين نقداً دائن ذهب: cash > 0 && gold < 0
    // مدين ذهب دائن نقداً: gold > 0 && cash < 0
    if (cashBalance > 0 && goldBalance < 0) {
      return {
        id, name, typeLabel, entityType,
        branchId: Number(branchMeta?.branchId || branchMeta?.branch_id || 0) || 0,
        branchName: branchMeta?.branchName || branchMeta?.branch_name || '',
        branchCode: branchMeta?.branchCode || branchMeta?.branch_code || '',
        cashDebit: cashBalance,
        cashCredit: 0,
        goldDebit: 0,
        goldCredit: Math.abs(goldBalance),
        type: 'cash-debit-gold-credit'
      };
    } else if (goldBalance > 0 && cashBalance < 0) {
      return {
        id, name, typeLabel, entityType,
        branchId: Number(branchMeta?.branchId || branchMeta?.branch_id || 0) || 0,
        branchName: branchMeta?.branchName || branchMeta?.branch_name || '',
        branchCode: branchMeta?.branchCode || branchMeta?.branch_code || '',
        cashDebit: 0,
        cashCredit: Math.abs(cashBalance),
        goldDebit: goldBalance,
        goldCredit: 0,
        type: 'gold-debit-cash-credit'
      };
    }
    return null;
  }

  // ========== تحديث البطاقات ==========
  function updateCards() {
    // قراءة المعدل المتفق عليه والإضافة/النقص
    const agreedRateEl = document.getElementById('agreedRate');
    const priceAdjustmentEl = document.getElementById('priceAdjustment');
    const agreedRate = parseFloat(agreedRateEl?.value) || 0;
    const priceAdjustment = parseFloat(priceAdjustmentEl?.value) || 0;

    // سعر الصرف من إعدادات حساب الأونصة
    const exchangeRate = getExchangeRate();

    let totalCashDebitSum = 0, totalGoldCreditSum = 0;
    let totalCashCreditSum = 0, totalGoldDebitSum = 0;
    let coverageRequired = 0;
    let dangerCount = 0, safeCount = 0;
    let safeTotal = 0;
    let coveragePrices = [];

    positionsData.forEach(p => {
      totalCashDebitSum += p.cashDebit || 0;
      totalGoldCreditSum += p.goldCredit || 0;
      totalCashCreditSum += p.cashCredit || 0;
      totalGoldDebitSum += p.goldDebit || 0;

      // سعر الأونصة الحالي من MT5 مع تطبيق الإضافة/النقص
      const currentXauPrice = (lastXauPrice || 0) + priceAdjustment;
      
      if (p.type === 'cash-debit-gold-credit' && p.goldCredit > 0) {
        const coveragePrice = p.cashDebit / p.goldCredit;
        // مركز العميل: إذا كان سعر المقارنة فارغاً استخدم الدولار مباشرة
        const position = comparePrice > 0 
          ? (coveragePrice / comparePrice) * 1000 
          : (p.cashDebit / p.goldCredit) / exchangeRate * 31.1035;
        coveragePrices.push(coveragePrice);
        
        // قيمة الذهب بسعر السوق (بالريال)
        const metalInOunces = p.goldCredit / 31.1035;
        const metalValueAtMarket = metalInOunces * currentXauPrice * exchangeRate;
        
        // سعر التكافؤ بالدولار
        const parityPrice = metalInOunces > 0 ? Math.abs(p.cashDebit) / exchangeRate / metalInOunces : 0;
        
        // حساب المعدل الحالي
        let currentRate = 0;
        if (parityPrice > 0 && currentXauPrice > 0) {
          currentRate = ((currentXauPrice - parityPrice) / parityPrice) * 100;
        }
        
        // تحديد ما إذا كان يحتاج تغطية
        const needsCoverage = currentRate < agreedRate;
        
        if (needsCoverage) {
          // له ذهب عليه نقد: المطلوب = الرصيد النقدي × (1 + المعدل%) - قيمة الذهب بسعر السوق
          const requiredBalance = Math.abs(p.cashDebit) * (1 + agreedRate / 100);
          let required = requiredBalance - metalValueAtMarket;
          if (required < 0) required = 0;
          coverageRequired += required;
          dangerCount++;
        } else {
          safeTotal += p.cashDebit;
          safeCount++;
        }
      } else if (p.type === 'gold-debit-cash-credit' && p.goldDebit > 0) {
        const coveragePrice = p.cashCredit / p.goldDebit;
        // مركز العميل: إذا كان سعر المقارنة فارغاً استخدم الدولار مباشرة
        const position = comparePrice > 0 
          ? (coveragePrice / comparePrice) * 1000 
          : (p.cashCredit / p.goldDebit) / exchangeRate * 31.1035;
        coveragePrices.push(coveragePrice);
        
        // قيمة الذهب بسعر السوق (بالريال)
        const metalInOunces = p.goldDebit / 31.1035;
        const metalValueAtMarket = metalInOunces * currentXauPrice * exchangeRate;
        
        // سعر التكافؤ بالدولار
        const parityPrice = metalInOunces > 0 ? Math.abs(p.cashCredit) / exchangeRate / metalInOunces : 0;
        
        // حساب المعدل الحالي
        let currentRate = 0;
        if (parityPrice > 0 && currentXauPrice > 0) {
          currentRate = ((parityPrice - currentXauPrice) / parityPrice) * 100;
        }
        
        // تحديد ما إذا كان يحتاج تغطية
        const needsCoverage = currentRate < agreedRate;
        
        if (needsCoverage) {
          // عليه ذهب له نقد: المطلوب = قيمة الذهب بسعر السوق × (1 + المعدل%) - الرصيد النقدي
          const requiredBalance = metalValueAtMarket * (1 + agreedRate / 100);
          let required = requiredBalance - Math.abs(p.cashCredit);
          if (required < 0) required = 0;
          coverageRequired += required;
          dangerCount++;
        } else {
          safeTotal += p.cashCredit;
          safeCount++;
        }
      }
    });

    if (totalCoverageRequiredEl) totalCoverageRequiredEl.textContent = formatNumber(coverageRequired, 2);
    if (coverageCountEl) coverageCountEl.textContent = `${dangerCount} ${t('openPositions.cards.party')}`;
    if (coverageCustomersCountEl) coverageCustomersCountEl.textContent = dangerCount;
    if (safeAccountsTotalEl) safeAccountsTotalEl.textContent = formatNumber(safeTotal, 2);
    if (safeCountEl) safeCountEl.textContent = `${safeCount} ${t('openPositions.cards.party')}`;
    if (safeCustomersCountEl) safeCustomersCountEl.textContent = safeCount;
    if (avgCoveragePriceEl) avgCoveragePriceEl.textContent = coveragePrices.length > 0 
      ? formatNumber(coveragePrices.reduce((a, b) => a + b, 0) / coveragePrices.length, 2) : '0.00';
    if (totalCashDebitEl) totalCashDebitEl.textContent = positionsData.filter(p => p.type === 'cash-debit-gold-credit').length;
    if (totalGoldCreditEl) totalGoldCreditEl.textContent = formatNumber(totalGoldCreditSum, 3);
    if (totalCashCreditEl) totalCashCreditEl.textContent = positionsData.filter(p => p.type === 'gold-debit-cash-credit').length;
    if (totalGoldDebitEl) totalGoldDebitEl.textContent = formatNumber(totalGoldDebitSum, 3);
    
    // تحديث بطاقة الحسابات الآمنة - الإجماليات والمعدل
    const safeTotalCashEl = document.getElementById('safeTotalCash');
    const safeTotalGoldEl = document.getElementById('safeTotalGold');
    const safeRateValueEl = document.getElementById('safeRateValue');
    
    // حساب إجماليات الحسابات الآمنة
    let safeCashTotal = 0, safeGoldTotal = 0;
    positionsData.forEach(p => {
      const currentXauPrice = (lastXauPrice || 0) + priceAdjustment;
      
      if (p.type === 'cash-debit-gold-credit' && p.goldCredit > 0) {
        const metalInOunces = p.goldCredit / 31.1035;
        const metalValueAtMarket = metalInOunces * currentXauPrice * exchangeRate;
        const parityPrice = metalInOunces > 0 ? Math.abs(p.cashDebit) / exchangeRate / metalInOunces : 0;
        let currentRate = 0;
        if (parityPrice > 0 && currentXauPrice > 0) {
          currentRate = ((currentXauPrice - parityPrice) / parityPrice) * 100;
        }
        if (currentRate >= agreedRate) {
          safeCashTotal += p.cashDebit;
          safeGoldTotal += p.goldCredit;
        }
      } else if (p.type === 'gold-debit-cash-credit' && p.goldDebit > 0) {
        const metalInOunces = p.goldDebit / 31.1035;
        const metalValueAtMarket = metalInOunces * currentXauPrice * exchangeRate;
        const parityPrice = metalInOunces > 0 ? Math.abs(p.cashCredit) / exchangeRate / metalInOunces : 0;
        let currentRate = 0;
        if (parityPrice > 0 && currentXauPrice > 0) {
          currentRate = ((parityPrice - currentXauPrice) / parityPrice) * 100;
        }
        if (currentRate >= agreedRate) {
          safeCashTotal += p.cashCredit;
          safeGoldTotal += p.goldDebit;
        }
      }
    });
    
    if (safeTotalCashEl) safeTotalCashEl.textContent = formatNumber(safeCashTotal, 2);
    if (safeTotalGoldEl) safeTotalGoldEl.textContent = formatNumber(safeGoldTotal, 3);
    
    const safeAvgRate = safeGoldTotal > 0 ? safeCashTotal / safeGoldTotal : 0;
    if (safeRateValueEl) {
      safeRateValueEl.textContent = formatNumber(safeAvgRate, 2);
    }
    
    // حساب مركز العميل للحسابات الآمنة: (المعدل × 1000) ÷ 120.56
    const safePositionValueEl = document.getElementById('safePositionValue');
    if (safePositionValueEl) {
      const position = comparePrice > 0 ? (safeAvgRate * 1000) / comparePrice : 0;
      safePositionValueEl.textContent = formatNumber(position, 4);
    }
    
    // تحديث بطاقة مطلوب التغطية - الإجماليات والمعدل
    const coverageTotalCashEl = document.getElementById('coverageTotalCash');
    const coverageAvgPriceEl = document.getElementById('coverageAvgPrice');
    const coverageRateValueEl = document.getElementById('coverageRateValue');
    
    // حساب إجماليات مطلوب التغطية
    let coverageCashTotal = 0, coverageGoldTotal = 0;
    let coverageAvgPrices = [];
    positionsData.forEach(p => {
      const currentXauPrice = (lastXauPrice || 0) + priceAdjustment;
      
      if (p.type === 'cash-debit-gold-credit' && p.goldCredit > 0) {
        const metalInOunces = p.goldCredit / 31.1035;
        const metalValueAtMarket = metalInOunces * currentXauPrice * exchangeRate;
        const parityPrice = metalInOunces > 0 ? Math.abs(p.cashDebit) / exchangeRate / metalInOunces : 0;
        let currentRate = 0;
        if (parityPrice > 0 && currentXauPrice > 0) {
          currentRate = ((currentXauPrice - parityPrice) / parityPrice) * 100;
        }
        if (currentRate < agreedRate) {
          coverageCashTotal += p.cashDebit;
          coverageGoldTotal += p.goldCredit;
          if (p.goldCredit > 0) {
            coverageAvgPrices.push(p.cashDebit / p.goldCredit);
          }
        }
      } else if (p.type === 'gold-debit-cash-credit' && p.goldDebit > 0) {
        const metalInOunces = p.goldDebit / 31.1035;
        const metalValueAtMarket = metalInOunces * currentXauPrice * exchangeRate;
        const parityPrice = metalInOunces > 0 ? Math.abs(p.cashCredit) / exchangeRate / metalInOunces : 0;
        let currentRate = 0;
        if (parityPrice > 0 && currentXauPrice > 0) {
          currentRate = ((parityPrice - currentXauPrice) / parityPrice) * 100;
        }
        if (currentRate < agreedRate) {
          coverageCashTotal += p.cashCredit;
          coverageGoldTotal += p.goldDebit;
          if (p.goldDebit > 0) {
            coverageAvgPrices.push(p.cashCredit / p.goldDebit);
          }
        }
      }
    });
    
    if (coverageTotalCashEl) coverageTotalCashEl.textContent = formatNumber(coverageCashTotal, 2);
    if (coverageGoldTotalEl) coverageGoldTotalEl.textContent = `${formatNumber(coverageGoldTotal, 3)} ${t('openPositions.cards.gram')}`;
    if (coverageAvgPriceEl) coverageAvgPriceEl.textContent = coverageAvgPrices.length > 0 
      ? formatNumber(coverageAvgPrices.reduce((a, b) => a + b, 0) / coverageAvgPrices.length, 2) : '0.00';
    
    const avgRate = coverageGoldTotal > 0 ? coverageCashTotal / coverageGoldTotal : 0;
    if (coverageRateValueEl) {
      coverageRateValueEl.textContent = formatNumber(avgRate, 2);
    }
    
    // حساب مركز العميل لمطلوب التغطية: (المعدل × 1000) ÷ 120.56
    const coveragePositionValueEl = document.getElementById('coveragePositionValue');
    if (coveragePositionValueEl) {
      const position = comparePrice > 0 ? (avgRate * 1000) / comparePrice : 0;
      coveragePositionValueEl.textContent = formatNumber(position, 4);
    }
  }

  // ========== تبديل التبويب ==========
  function switchTab(tab) {
    currentTab = tab;
    tabBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tab));
    if (tableTitleEl) tableTitleEl.textContent = tab === 'cash-debit-gold-credit' 
      ? t('openPositions.table.title') : t('openPositions.table.titleBuy');
    
    // تغيير عناوين الأعمدة حسب التبويب
    const thCashCol = document.getElementById('thCashCol');
    const thGoldCol = document.getElementById('thGoldCol');
    if (tab === 'cash-debit-gold-credit') {
      if (thCashCol) thCashCol.textContent = t('openPositions.table.cashDebit');
      if (thGoldCol) thGoldCol.textContent = t('openPositions.table.goldCredit');
    } else {
      if (thCashCol) thCashCol.textContent = t('openPositions.table.cashCredit');
      if (thGoldCol) thGoldCol.textContent = t('openPositions.table.goldDebit');
    }
    
    renderTable();
  }

  // ========== تحديث عداد التبويبات ==========
  function updateTabCounts() {
    const cashDebitCount = positionsData.filter(p => p.type === 'cash-debit-gold-credit').length;
    const goldDebitCount = positionsData.filter(p => p.type === 'gold-debit-cash-credit').length;
    if (tab1CountEl) tab1CountEl.textContent = cashDebitCount;
    if (tab2CountEl) tab2CountEl.textContent = goldDebitCount;
  }

  // ========== رسم الجدول ==========
  function renderTable() {
    const filtered = getFilteredData();
    if (filtered.length === 0) {
      if (positionsTableBodyEl) positionsTableBodyEl.innerHTML = '';
      if (noDataMessageEl) noDataMessageEl.style.display = 'block';
      return;
    }
    if (noDataMessageEl) noDataMessageEl.style.display = 'none';

    // قراءة المعدل المتفق عليه والإضافة/النقص
    const agreedRateEl = document.getElementById('agreedRate');
    const priceAdjustmentEl = document.getElementById('priceAdjustment');
    const agreedRate = parseFloat(agreedRateEl?.value) || 0;
    const priceAdjustment = parseFloat(priceAdjustmentEl?.value) || 0;

    let html = '';
    let totalCash = 0, totalGold = 0, totalCoverage = 0;

    // سعر الصرف من إعدادات حساب الأونصة
    const exchangeRate = getExchangeRate();

    filtered.forEach((item, index) => {
      const isCashDebit = currentTab === 'cash-debit-gold-credit';
      const cashAmount = isCashDebit ? item.cashDebit : item.cashCredit;
      const goldAmount = isCashDebit ? item.goldCredit : item.goldDebit;
      const coveragePrice = goldAmount > 0 ? cashAmount / goldAmount : 0;
      
      // مركز العميل: إذا كان سعر المقارنة فارغاً استخدم الدولار مباشرة
      let position;
      if (comparePrice > 0) {
        // الصيغة العادية: (التغطية على سعر / سعر المقارنة) * 1000
        position = (coveragePrice / comparePrice) * 1000;
      } else {
        // صيغة الدولار: (المبلغ / الوزن) / سعر الصرف * 31.1035
        position = goldAmount > 0 ? (cashAmount / goldAmount) / exchangeRate * 31.1035 : 0;
      }
      
      // سعر الأونصة الحالي من MT5 مع تطبيق الإضافة/النقص
      const currentXauPrice = (lastXauPrice || 0) + priceAdjustment;
      
      // قيمة الذهب بسعر السوق (بالريال) - نفس نافذة مركز العميل
      const metalInOunces = goldAmount / 31.1035;
      const metalValueAtMarket = metalInOunces * currentXauPrice * exchangeRate;
      
      // سعر التكافؤ بالدولار
      const parityPrice = metalInOunces > 0 ? Math.abs(cashAmount) / exchangeRate / metalInOunces : 0;
      
      // حساب المعدل الحالي - نفس نافذة مركز العميل
      let currentRate = 0;
      if (parityPrice > 0 && currentXauPrice > 0) {
        if (isCashDebit) {
          currentRate = ((currentXauPrice - parityPrice) / parityPrice) * 100;
        } else {
          currentRate = ((parityPrice - currentXauPrice) / parityPrice) * 100;
        }
      }
      
      // تحديد ما إذا كان يحتاج تغطية - إذا كان المعدل الحالي أقل من المتفق عليه
      const needsCoverage = currentRate < agreedRate;
      
      let status, statusClass, statusIcon;
      if (needsCoverage) { 
        status = t('openPositions.table.needsCoverage'); statusClass = 'danger'; statusIcon = 'fa-triangle-exclamation'; 
      } else { 
        status = t('openPositions.table.safe'); statusClass = 'safe'; statusIcon = 'fa-shield-check'; 
      }

      // حساب المطلوب للتغطية بالريال - نفس نافذة مركز العميل
      let requiredCoverage = 0;
      if (needsCoverage) {
        if (isCashDebit) {
          // له ذهب عليه نقد: المطلوب = الرصيد النقدي × (1 + المعدل%) - قيمة الذهب بسعر السوق
          const requiredBalance = Math.abs(cashAmount) * (1 + agreedRate / 100);
          requiredCoverage = requiredBalance - metalValueAtMarket;
        } else {
          // عليه ذهب له نقد: المطلوب = قيمة الذهب بسعر السوق × (1 + المعدل%) - الرصيد النقدي
          const requiredBalance = metalValueAtMarket * (1 + agreedRate / 100);
          requiredCoverage = requiredBalance - Math.abs(cashAmount);
        }
        if (requiredCoverage < 0) requiredCoverage = 0;
      }
      totalCash += cashAmount;
      totalGold += goldAmount;
      totalCoverage += requiredCoverage;

      const typeIcon = item.entityType === 'customer' ? 'fa-user-tie' : 'fa-truck-field';
      const typeColor = item.entityType === 'customer' ? '#3b82f6' : '#f59e0b';

      html += `
        <tr data-id="${item.id}" data-type="${item.entityType}" data-status="${statusClass}">
          <td style="text-align:center">${index + 1}</td>
          <td style="text-align:center">${getPositionTypeHtml(item, typeIcon, typeColor)}</td>
          <td>${getPositionIdHtml(item)}</td>
          <td>${getPositionNameHtml(item)}</td>
          <td class="cell-number cell-cash">${formatNumber(cashAmount, 2)}</td>
          <td class="cell-number cell-gold">${formatNumber(goldAmount, 3)}</td>
          <td class="cell-number cell-coverage">${formatNumber(coveragePrice, 2)}</td>
          <td class="cell-number cell-position" style="color: ${position >= 1 ? 'var(--op-success)' : position >= 0.8 ? 'var(--op-warning)' : 'var(--op-danger)'}">${formatNumber(position, 4)}</td>
          <td style="text-align:center"><span class="status-badge ${statusClass}"><i class="fa-solid ${statusIcon}"></i>${status}</span></td>
          <td class="cell-number" style="color: ${requiredCoverage > 0 ? 'var(--op-danger)' : 'var(--op-success)'}">${requiredCoverage > 0 ? formatNumber(requiredCoverage, 2) : '-'}</td>
          <td>
            <div class="action-btns">
              <button class="action-btn view" title="${t('openPositions.table.notify')}" onclick="viewEntity('${item.entityType}', ${item.id})"><i class="fa-solid fa-bell"></i></button>
              <button class="action-btn statement" title="${t('openPositions.table.statement')}" onclick="openStatement('${item.entityType}', ${item.id})"><i class="fa-solid fa-file-invoice"></i></button>
            </div>
          </td>
        </tr>
      `;
    });

    if (positionsTableBodyEl) positionsTableBodyEl.innerHTML = html;
    if (footerCashTotalEl) footerCashTotalEl.textContent = formatNumber(totalCash, 2);
    if (footerGoldTotalEl) footerGoldTotalEl.textContent = formatNumber(totalGold, 3);
    if (footerCoverageTotalEl) footerCoverageTotalEl.textContent = formatNumber(totalCoverage, 2);
  }

  // ========== فلترة البيانات ==========
  function getFilteredData() {
    let filtered = positionsData.filter(p => p.type === currentTab);
    const searchTerm = searchInputEl ? searchInputEl.value.trim().toLowerCase() : '';
    if (searchTerm) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm) || p.id.toString().includes(searchTerm));
    }
    const statusValue = statusFilterEl ? statusFilterEl.value : 'all';
    if (statusValue !== 'all') {
      // قراءة المعدل المتفق عليه والإضافة/النقص
      const agreedRateEl = document.getElementById('agreedRate');
      const priceAdjustmentEl = document.getElementById('priceAdjustment');
      const agreedRate = parseFloat(agreedRateEl?.value) || 0;
      const priceAdjustment = parseFloat(priceAdjustmentEl?.value) || 0;
      const exchangeRate = getExchangeRate();
      
      filtered = filtered.filter(p => {
        const isCashDebit = currentTab === 'cash-debit-gold-credit';
        const cashAmount = isCashDebit ? p.cashDebit : p.cashCredit;
        const goldAmount = isCashDebit ? p.goldCredit : p.goldDebit;
        const currentXauPrice = (lastXauPrice || 0) + priceAdjustment;
        
        // سعر التكافؤ بالدولار
        const metalInOunces = goldAmount / 31.1035;
        const parityPrice = metalInOunces > 0 ? Math.abs(cashAmount) / exchangeRate / metalInOunces : 0;
        
        // حساب المعدل الحالي
        let currentRate = 0;
        if (parityPrice > 0 && currentXauPrice > 0) {
          if (isCashDebit) {
            currentRate = ((currentXauPrice - parityPrice) / parityPrice) * 100;
          } else {
            currentRate = ((parityPrice - currentXauPrice) / parityPrice) * 100;
          }
        }
        
        // تحديد ما إذا كان يحتاج تغطية
        const needsCoverage = currentRate < agreedRate;
        
        if (statusValue === 'danger') return needsCoverage;
        if (statusValue === 'safe') return !needsCoverage;
        return true;
      });
    }
    return filtered;
  }

  function filterTable() { renderTable(); }

  // ========== وظائف مساعدة ==========
  function formatNumber(num, decimals = 2) {
    if (num === null || num === undefined || isNaN(num)) return '0.00';
    return Number(num).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  }

  function debounce(func, wait) {
    let timeout;
    return function(...args) { clearTimeout(timeout); timeout = setTimeout(() => func.apply(this, args), wait); };
  }

  function showLoading(show) {
    if (loadingOverlayEl) loadingOverlayEl.style.display = show ? 'grid' : 'none';
  }

  // ========== الطباعة وتصدير إكسل ==========
  function getPrintableTableHtml() {
    const filtered = getFilteredData();
    const isCashDebit = currentTab === 'cash-debit-gold-credit';
    const agreedRateEl = document.getElementById('agreedRate');
    const priceAdjustmentEl = document.getElementById('priceAdjustment');
    const agreedRate = parseFloat(agreedRateEl?.value) || 0;
    const priceAdjustment = parseFloat(priceAdjustmentEl?.value) || 0;
    const exchangeRate = getExchangeRate();
    const currentXauPrice = (lastXauPrice || 0) + priceAdjustment;

    let totalCash = 0, totalGold = 0, totalCoverage = 0;

    const rowsHtml = filtered.map((item, index) => {
      const cashAmount = isCashDebit ? item.cashDebit : item.cashCredit;
      const goldAmount = isCashDebit ? item.goldCredit : item.goldDebit;
      const coveragePrice = goldAmount > 0 ? cashAmount / goldAmount : 0;
      const position = comparePrice > 0
        ? (coveragePrice / comparePrice) * 1000
        : (goldAmount > 0 ? (cashAmount / goldAmount) / exchangeRate * 31.1035 : 0);

      const metalInOunces = goldAmount / 31.1035;
      const metalValueAtMarket = metalInOunces * currentXauPrice * exchangeRate;
      const parityPrice = metalInOunces > 0 ? Math.abs(cashAmount) / exchangeRate / metalInOunces : 0;

      let currentRate = 0;
      if (parityPrice > 0 && currentXauPrice > 0) {
        if (isCashDebit) {
          currentRate = ((currentXauPrice - parityPrice) / parityPrice) * 100;
        } else {
          currentRate = ((parityPrice - currentXauPrice) / parityPrice) * 100;
        }
      }

      const needsCoverage = currentRate < agreedRate;
      let requiredCoverage = 0;
      if (needsCoverage) {
        if (isCashDebit) {
          const requiredBalance = Math.abs(cashAmount) * (1 + agreedRate / 100);
          requiredCoverage = requiredBalance - metalValueAtMarket;
        } else {
          const requiredBalance = metalValueAtMarket * (1 + agreedRate / 100);
          requiredCoverage = requiredBalance - Math.abs(cashAmount);
        }
        if (requiredCoverage < 0) requiredCoverage = 0;
      }

      totalCash += cashAmount;
      totalGold += goldAmount;
      totalCoverage += requiredCoverage;

      const typeIcon = item.entityType === 'customer' ? '👤' : '🚚';
      const typeColor = item.entityType === 'customer' ? '#3b82f6' : '#f59e0b';
      const statusText = needsCoverage ? 'تغطية' : 'آمن';
      const statusIcon = needsCoverage ? '⚠️' : '✅';
      const statusColor = needsCoverage ? '#dc2626' : '#16a34a';
      const positionColor = position >= 1 ? '#16a34a' : position >= 0.8 ? '#ca8a04' : '#dc2626';
      const requiredColor = requiredCoverage > 0 ? '#dc2626' : '#16a34a';

      const entityNameText = getPositionNameText(item) || '-';
      const typeText = getPositionTypeText(item) || '-';
      return `<tr>
        <td style="text-align:center;border:1px solid #d1d5db;padding:8px 6px">${index + 1}</td>
        <td style="border:1px solid #d1d5db;padding:8px 6px;text-align:center"><span style="color:${typeColor}">${typeIcon} ${typeText}</span></td>
        <td style="border:1px solid #d1d5db;padding:8px 6px;text-align:center">${item.id}</td>
        <td style="border:1px solid #d1d5db;padding:8px 6px">${entityNameText}</td>
        <td style="border:1px solid #d1d5db;padding:8px 6px;text-align:center;direction:ltr">${formatNumber(cashAmount, 2)}</td>
        <td style="border:1px solid #d1d5db;padding:8px 6px;text-align:center;direction:ltr">${formatNumber(goldAmount, 2)}</td>
        <td style="border:1px solid #d1d5db;padding:8px 6px;text-align:center;direction:ltr">${formatNumber(coveragePrice, 2)}</td>
        <td style="border:1px solid #d1d5db;padding:8px 6px;text-align:center;direction:ltr;color:${positionColor};font-weight:600">${formatNumber(position, 4)}</td>
        <td style="border:1px solid #d1d5db;padding:8px 6px;text-align:center"><span style="color:${statusColor};font-weight:600">${statusIcon} ${statusText}</span></td>
        <td style="border:1px solid #d1d5db;padding:8px 6px;text-align:center;direction:ltr;color:${requiredColor};font-weight:600">${requiredCoverage > 0 ? formatNumber(requiredCoverage, 2) : '-'}</td>
      </tr>`;
    }).join('');

    const cashColHeader = isCashDebit ? 'مدين ريال' : 'دائن ريال';
    const goldColHeader = isCashDebit ? 'دائن ذهب' : 'مدين ذهب';

    return `
      <table dir="rtl" style="width:100%;border-collapse:collapse;font-family:'Cairo','Tahoma',sans-serif;font-size:13px">
        <thead>
          <tr style="background:#1e293b;color:#fff">
            <th style="border:1px solid #334155;padding:10px 6px;text-align:center">#</th>
            <th style="border:1px solid #334155;padding:10px 6px;text-align:center">النوع</th>
            <th style="border:1px solid #334155;padding:10px 6px;text-align:center">الرقم</th>
            <th style="border:1px solid #334155;padding:10px 6px">الاسم</th>
            <th style="border:1px solid #334155;padding:10px 6px;text-align:center">${cashColHeader}</th>
            <th style="border:1px solid #334155;padding:10px 6px;text-align:center">${goldColHeader}</th>
            <th style="border:1px solid #334155;padding:10px 6px;text-align:center">التغطية على سعر</th>
            <th style="border:1px solid #334155;padding:10px 6px;text-align:center">مركز العميل</th>
            <th style="border:1px solid #334155;padding:10px 6px;text-align:center">الحالة</th>
            <th style="border:1px solid #334155;padding:10px 6px;text-align:center">المطلوب للتغطية</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml || '<tr><td colspan="10" style="text-align:center;padding:20px;border:1px solid #d1d5db">لا توجد مراكز لعرضها</td></tr>'}
        </tbody>
        <tfoot>
          <tr style="background:#f1f5f9;font-weight:700">
            <td colspan="4" style="border:1px solid #d1d5db;padding:10px 6px;text-align:center">الإجمالي</td>
            <td style="border:1px solid #d1d5db;padding:10px 6px;text-align:center;direction:ltr">${formatNumber(totalCash, 2)}</td>
            <td style="border:1px solid #d1d5db;padding:10px 6px;text-align:center;direction:ltr">${formatNumber(totalGold, 2)}</td>
            <td colspan="2" style="border:1px solid #d1d5db;padding:10px 6px"></td>
            <td style="border:1px solid #d1d5db;padding:10px 6px"></td>
            <td style="border:1px solid #d1d5db;padding:10px 6px;text-align:center;direction:ltr;color:#dc2626">${formatNumber(totalCoverage, 2)}</td>
          </tr>
        </tfoot>
      </table>`;
  }

  function printPositions() {
    const tableHtml = getPrintableTableHtml();
    const isCashDebit = currentTab === 'cash-debit-gold-credit';
    const title = isCashDebit ? t('openPositions.tabs.sellPositions') : t('openPositions.tabs.buyPositions');
    const agreedRateEl = document.getElementById('agreedRate');
    const priceAdjustmentEl = document.getElementById('priceAdjustment');
    const agreedRate = parseFloat(agreedRateEl?.value);
    const priceAdjustment = parseFloat(priceAdjustmentEl?.value);
    const safeAgreedRate = Number.isFinite(agreedRate) ? agreedRate : 0;
    const safePriceAdjustment = Number.isFinite(priceAdjustment) ? priceAdjustment : 0;
    const baseXauPrice = Number(lastXauPrice) || 0;
    const hasBaseXauPrice = baseXauPrice > 0;
    const appliedXauPrice = hasBaseXauPrice ? baseXauPrice + safePriceAdjustment : 0;
    const hasAppliedXauPrice = hasBaseXauPrice && appliedXauPrice > 0;
    const hasAgreedRate = Math.abs(safeAgreedRate) > 0.0001;
    const hasPriceAdjustment = Math.abs(safePriceAdjustment) > 0.0001;
    const adjustmentMagnitudeText = formatNumber(Math.abs(safePriceAdjustment), 2);
    const reportMetaItems = [];
    if (hasAppliedXauPrice) {
      reportMetaItems.push({
        tone: 'primary',
        icon: 'fa-coins',
        label: t('openPositions.print.appliedOuncePrice'),
        value: `${formatNumber(appliedXauPrice, 2)} ${t('openPositions.print.usdPerOunce')}`
      });
    }
    if (hasBaseXauPrice && hasPriceAdjustment) {
      reportMetaItems.push({
        tone: 'primary',
        icon: 'fa-tower-broadcast',
        label: t('openPositions.print.liveOuncePrice'),
        value: `${formatNumber(baseXauPrice, 2)} ${t('openPositions.print.usdPerOunce')}`
      });
    }
    if (hasPriceAdjustment) {
      reportMetaItems.push({
        tone: safePriceAdjustment > 0 ? 'success' : 'warning',
        icon: safePriceAdjustment > 0 ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down',
        label: safePriceAdjustment > 0 ? t('openPositions.print.priceAddition') : t('openPositions.print.priceDeduction'),
        value: `${adjustmentMagnitudeText} ${t('openPositions.print.usdPerOunce')}`
      });
    }
    if (hasAgreedRate) {
      reportMetaItems.push({
        tone: 'success',
        icon: 'fa-percent',
        label: t('openPositions.print.agreedRate'),
        value: `${formatNumber(safeAgreedRate, 2)}%`
      });
    }
    const reportMetaCardsHtml = reportMetaItems.map((item) => `
      <div class="report-meta-card ${item.tone}">
        <div class="report-meta-icon"><i class="fa-solid ${item.icon}"></i></div>
        <div class="report-meta-content">
          <div class="report-meta-label">${item.label}</div>
          <div class="report-meta-value">${item.value}</div>
        </div>
      </div>
    `).join('');
    const reportMetaHtml = reportMetaCardsHtml ? `
      <div class="report-meta-panel">
        <div class="report-meta-head">
          <div class="report-meta-title"><i class="fa-solid fa-circle-info"></i> ${t('openPositions.print.reportBasis')}</div>
          <div class="report-meta-note">${t('openPositions.print.reportBasisHint')}</div>
        </div>
        <div class="report-meta-grid">
          ${reportMetaCardsHtml}
        </div>
      </div>
    ` : '';
    
    // تحديد الأيقونة واللون حسب نوع المركز
    const iconClass = isCashDebit ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down';
    const iconColor = isCashDebit ? '#dc2626' : '#16a34a';
    const iconBg = isCashDebit ? 'linear-gradient(135deg, #dc2626, #b91c1c)' : 'linear-gradient(135deg, #16a34a, #15803d)';
    const iconShadow = isCashDebit ? 'rgba(220, 38, 38, 0.4)' : 'rgba(22, 163, 74, 0.4)';
    const headerGradient = isCashDebit ? 'linear-gradient(90deg, #dc2626, #f59e0b, #dc2626)' : 'linear-gradient(90deg, #16a34a, #3b82f6, #16a34a)';
    
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(`<!doctype html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          
          body {
            font-family: 'Cairo', 'Tahoma', sans-serif;
            direction: rtl;
            text-align: right;
            background: #ffffff;
            color: #1e293b;
            padding: 20mm;
            line-height: 1.6;
          }
          
          /* Header احترافي */
          .print-header {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 24px;
            margin-bottom: 32px;
            padding: 24px 32px;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            border-radius: 16px;
            border: 2px solid #cbd5e1;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            position: relative;
            overflow: hidden;
          }
          
          .print-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: ${headerGradient};
          }
          
          .print-header .icon {
            width: 56px;
            height: 56px;
            background: ${iconBg};
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            font-size: 28px;
            box-shadow: 0 6px 20px ${iconShadow};
            flex-shrink: 0;
          }
          
          .print-header .title-section {
            flex: 1;
            text-align: center;
          }
          
          .print-header h1 {
            font-size: 28px;
            font-weight: 800;
            color: #1e293b;
            margin-bottom: 6px;
            letter-spacing: 0.5px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          }
          
          .print-header .sub {
            font-size: 13px;
            color: #64748b;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
          }
          
          .print-header .sub i {
            color: #3b82f6;
          }

          .report-meta-panel {
            margin: -6px 0 24px;
            padding: 18px 20px 20px;
            border-radius: 18px;
            border: 1px solid #cbd5e1;
            background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
            box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
            position: relative;
            overflow: hidden;
          }

          .report-meta-panel::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: ${headerGradient};
          }

          .report-meta-head {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 14px;
            margin-bottom: 14px;
            flex-wrap: wrap;
          }

          .report-meta-title {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 16px;
            font-weight: 800;
            color: #0f172a;
          }

          .report-meta-title i {
            color: #2563eb;
          }

          .report-meta-note {
            font-size: 12px;
            font-weight: 600;
            color: #64748b;
          }

          .report-meta-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 12px;
          }

          .report-meta-card {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            min-height: 84px;
            padding: 14px 16px;
            border-radius: 14px;
            border: 1px solid #dbeafe;
            background: #ffffff;
            box-shadow: 0 6px 18px rgba(15, 23, 42, 0.05);
          }

          .report-meta-card.primary {
            background: linear-gradient(135deg, #eff6ff 0%, #f8fbff 100%);
            border-color: #bfdbfe;
          }

          .report-meta-card.success {
            background: linear-gradient(135deg, #ecfdf5 0%, #f7fee7 100%);
            border-color: #bbf7d0;
          }

          .report-meta-card.warning {
            background: linear-gradient(135deg, #fffbeb 0%, #fff7ed 100%);
            border-color: #fde68a;
          }

          .report-meta-icon {
            width: 44px;
            height: 44px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            color: #ffffff;
            font-size: 18px;
          }

          .report-meta-card.primary .report-meta-icon {
            background: linear-gradient(135deg, #2563eb, #0ea5e9);
            box-shadow: 0 8px 18px rgba(37, 99, 235, 0.28);
          }

          .report-meta-card.success .report-meta-icon {
            background: linear-gradient(135deg, #16a34a, #22c55e);
            box-shadow: 0 8px 18px rgba(22, 163, 74, 0.22);
          }

          .report-meta-card.warning .report-meta-icon {
            background: linear-gradient(135deg, #d97706, #f59e0b);
            box-shadow: 0 8px 18px rgba(217, 119, 6, 0.22);
          }

          .report-meta-content {
            flex: 1;
            min-width: 0;
          }

          .report-meta-label {
            font-size: 11px;
            font-weight: 700;
            color: #475569;
            margin-bottom: 4px;
          }

          .report-meta-value {
            display: inline-block;
            font-size: 20px;
            line-height: 1.25;
            font-weight: 800;
            color: #0f172a;
            font-variant-numeric: tabular-nums;
            direction: ltr;
          }
          
          /* جدول احترافي */
          table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            page-break-inside: auto;
          }
          
          thead {
            display: table-header-group;
            background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
          }
          
          thead th {
            padding: 14px 12px;
            font-size: 12px;
            font-weight: 700;
            color: #ffffff;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 3px solid #3b82f6;
            text-align: center;
          }
          
          tbody tr {
            background: #ffffff;
            transition: background 0.2s;
          }
          
          tbody tr:nth-child(even) {
            background: #f8fafc;
          }
          
          tbody td {
            padding: 10px 12px;
            font-size: 12px;
            color: #1e293b;
            border-bottom: 1px solid #e2e8f0;
            text-align: center;
            vertical-align: middle;
          }
          
          tbody tr:last-child td {
            border-bottom: none;
          }
          
          /* صف الإجمالي */
          tfoot {
            display: table-row-group;
            background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
          }
          
          tfoot td {
            padding: 12px;
            font-size: 13px;
            font-weight: 800;
            color: #1e293b;
            border-top: 3px solid #3b82f6;
            text-align: center;
          }
          
          /* الأرقام */
          .number {
            font-variant-numeric: tabular-nums;
            font-weight: 600;
          }
          
          .positive {
            color: #16a34a;
            font-weight: 700;
          }
          
          .negative {
            color: #dc2626;
            font-weight: 700;
          }
          
          /* الحالة */
          .status-badge {
            display: inline-block;
            padding: 4px 10px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
          }
          
          .status-danger {
            background: #fee2e2;
            color: #dc2626;
            border: 1px solid #fca5a5;
          }
          
          .status-warning {
            background: #fef3c7;
            color: #d97706;
            border: 1px solid #fde68a;
          }
          
          .status-safe {
            background: #dcfce7;
            color: #16a34a;
            border: 1px solid #bbf7d0;
          }
          
          /* زر الطباعة */
          .fab-print {
            position: fixed;
            bottom: 30px;
            left: 30px;
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background: linear-gradient(135deg, #16a34a, #15803d);
            color: #fff;
            border: none;
            cursor: pointer;
            box-shadow: 0 8px 24px rgba(22, 163, 74, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            z-index: 9999;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .fab-print i {
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
          }
          
          .fab-print:hover {
            transform: scale(1.1) rotate(5deg);
            box-shadow: 0 12px 32px rgba(22, 163, 74, 0.6);
          }
          
          .fab-print:active {
            transform: scale(0.95);
          }
          
          /* تنسيق الطباعة */
          @media print {
            body {
              padding: 10mm;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            
            .print-header {
              box-shadow: none;
              border: 2px solid #cbd5e1;
            }

            .report-meta-panel,
            .report-meta-card {
              box-shadow: none;
            }
            
            thead {
              background: #1e293b !important;
              color: #ffffff !important;
            }
            
            thead th {
              background: #1e293b !important;
              color: #ffffff !important;
              border-bottom: 3px solid #3b82f6 !important;
            }
            
            tbody tr:nth-child(even) {
              background: #f8fafc !important;
            }
            
            tfoot {
              background: #f1f5f9 !important;
            }
            
            tfoot td {
              background: #f1f5f9 !important;
              border-top: 3px solid #3b82f6 !important;
            }
            
            .fab-print {
              display: none !important;
            }
            
            table {
              box-shadow: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="print-header">
          <div class="icon"><i class="fa-solid ${iconClass}"></i></div>
          <div class="title-section">
            <h1>${title}</h1>
            <div class="sub"><i class="fa-regular fa-calendar"></i> ${new Date().toLocaleString('ar-SA', { dateStyle: 'full', timeStyle: 'short' })}</div>
          </div>
          <div class="icon"><i class="fa-solid ${iconClass}"></i></div>
        </div>
        ${reportMetaHtml}
        ${tableHtml}
        <button class="fab-print" onclick="window.print()" title="طباعة">
          <i class="fa-solid fa-print"></i>
        </button>
      </body>
      </html>`);
    win.document.close();
  }

  function exportPositionsExcel() {
    const filtered = getFilteredData();
    if (!filtered || filtered.length === 0) {
      alert(t('openPositions.messages.noData'));
      return;
    }

    const fmt = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const fmt4 = new Intl.NumberFormat('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 });
    const isCashDebit = currentTab === 'cash-debit-gold-credit';
    const exchangeRate = getExchangeRate();
    
    // قراءة المعدل المتفق عليه والإضافة/النقص من الصناديق
    const agreedRateEl = document.getElementById('agreedRate');
    const priceAdjustmentEl = document.getElementById('priceAdjustment');
    const agreedRate = parseFloat(agreedRateEl?.value) || 0;
    const priceAdj = parseFloat(priceAdjustmentEl?.value) || 0;
    const currentXauPrice = (lastXauPrice || 0) + priceAdj;
    
    // بناء صفوف الجدول
    let bodyHtml = '';
    filtered.forEach((item, index) => {
      const cashAmount = isCashDebit ? item.cashDebit : item.cashCredit;
      const goldAmount = isCashDebit ? item.goldCredit : item.goldDebit;
      const coveragePrice = goldAmount > 0 ? cashAmount / goldAmount : 0;
      const position = comparePrice > 0
        ? (coveragePrice / comparePrice) * 1000
        : (goldAmount > 0 ? (cashAmount / goldAmount) / exchangeRate * 31.1035 : 0);
      
      // قيمة الذهب بسعر السوق (بالريال)
      const metalInOunces = goldAmount / 31.1035;
      const metalValueAtMarket = metalInOunces * currentXauPrice * exchangeRate;
      
      // سعر التكافؤ بالدولار
      const parityPrice = metalInOunces > 0 ? Math.abs(cashAmount) / exchangeRate / metalInOunces : 0;
      
      // حساب المعدل الحالي - نفس طريقة الجدول
      let currentRate = 0;
      if (parityPrice > 0 && currentXauPrice > 0) {
        if (isCashDebit) {
          currentRate = ((currentXauPrice - parityPrice) / parityPrice) * 100;
        } else {
          currentRate = ((parityPrice - currentXauPrice) / parityPrice) * 100;
        }
      }
      
      // تحديد ما إذا كان يحتاج تغطية
      const needsCoverage = currentRate < agreedRate;
      const status = needsCoverage ? t('openPositions.table.needsCoverage') : t('openPositions.table.safe');
      
      // حساب المطلوب للتغطية بالريال
      let requiredCoverage = 0;
      if (needsCoverage) {
        if (isCashDebit) {
          const requiredBalance = Math.abs(cashAmount) * (1 + agreedRate / 100);
          requiredCoverage = requiredBalance - metalValueAtMarket;
        } else {
          const requiredBalance = metalValueAtMarket * (1 + agreedRate / 100);
          requiredCoverage = requiredBalance - Math.abs(cashAmount);
        }
        if (requiredCoverage < 0) requiredCoverage = 0;
      }

      const rowBg = needsCoverage ? 'background:#ffe5e5;' : '';
      const typeText = getPositionTypeText(item) || '-';
      bodyHtml += `<tr style="${rowBg}">
        <td style="mso-number-format:'\\@'">${index + 1}</td>
        <td style="mso-number-format:'\\@'">${typeText}</td>
        <td style="mso-number-format:'\\@'">${item.id}</td>
        <td style="mso-number-format:'\\@'">${getPositionNameText(item) || '-'}</td>
        <td style="mso-number-format:'\\@'">${fmt.format(cashAmount)}</td>
        <td style="mso-number-format:'\\@'">${fmt.format(goldAmount)}</td>
        <td style="mso-number-format:'\\@'">${fmt.format(coveragePrice)}</td>
        <td style="mso-number-format:'\\@'">${fmt4.format(position)}</td>
        <td style="mso-number-format:'\\@'">${status}</td>
        <td style="mso-number-format:'\\@'">${fmt.format(requiredCoverage)}</td>
      </tr>`;
    });

    const tabTitle = isCashDebit ? t('openPositions.tabs.sellPositions') : t('openPositions.tabs.buyPositions');
    const cashColTitle = isCashDebit ? t('openPositions.table.cashDebit') : t('openPositions.table.cashCredit');
    const goldColTitle = isCashDebit ? t('openPositions.table.goldCredit') : t('openPositions.table.goldDebit');
    const headHtml = `<tr style="background:#d9d9d9;font-weight:bold">
      <th>${t('openPositions.table.number')}</th>
      <th>${t('openPositions.table.type')}</th>
      <th>${t('openPositions.table.id')}</th>
      <th>${t('openPositions.table.name')}</th>
      <th>${cashColTitle}</th>
      <th>${goldColTitle}</th>
      <th>${t('openPositions.table.coveragePrice')}</th>
      <th>${t('openPositions.table.customerPosition')}</th>
      <th>${t('openPositions.table.status')}</th>
      <th>${t('openPositions.export.needsCoverage')}</th>
    </tr>`;

    const html = `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${tabTitle}</title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
      <style>
        table{border-collapse:collapse;width:100%}
        th,td{border:1px solid #000;padding:6px;text-align:right}
        th{background:#d9d9d9}
      </style></head><body>
      <h2 style="text-align:center">${tabTitle}</h2>
      <table>
        <thead>${headHtml}</thead>
        <tbody>${bodyHtml}</tbody>
      </table>
    </body></html>`;

    const blob = new Blob(['\ufeff'+html], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = tabTitle + '.xls';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 0);
  }

  // ========== تحديث الكل ==========
  async function refreshAll() {
    if (btnRefresh) {
      btnRefresh.disabled = true;
      const icon = btnRefresh.querySelector('i');
      if (icon) icon.classList.add('fa-spin');
    }
    await refreshXauPrice();
    await loadPositionsData();
    if (btnRefresh) {
      btnRefresh.disabled = false;
      const icon = btnRefresh.querySelector('i');
      if (icon) icon.classList.remove('fa-spin');
    }
  }

  // ========== وظائف عامة ==========
  window.viewEntity = function(entityType, id) {
    const screen = entityType === 'customer' ? 'customers' : 'suppliers';
    if (window.main && window.main.navigate) window.main.navigate(screen, { id });
  };

  window.openStatement = function(entityType, id) {
    // فتح نافذة جديدة باستخدام Electron IPC
    if (window.electron && window.electron.ipcRenderer) {
      window.electron.ipcRenderer.send('open-statement-window', {
        entityType: entityType,
        refId: id,
        autoLoad: true
      });
    } else {
      console.error('Electron IPC not available');
      alert(t('openPositions.messages.error'));
    }
  };

  // دالة عرض نافذة الإخطار
  window.viewEntity = async function(entityType, id) {
    // البحث عن بيانات العميل/المورد
    const entity = positionsData.find(item => item.entityType === entityType && item.id === id);
    if (!entity) {
      alert(t('openPositions.messages.accountNotFound'));
      return;
    }

    // قراءة القيم من الصناديق
    const agreedRateEl = document.getElementById('agreedRate');
    const priceAdjustmentEl = document.getElementById('priceAdjustment');
    const agreedRate = parseFloat(agreedRateEl?.value) || 0;
    const priceAdjustment = parseFloat(priceAdjustmentEl?.value) || 0;

    // حساب البيانات المطلوبة - نفس المنطق المستخدم في نافذة مركز العميل
    const currentXauPrice = lastXauPrice || 0;
    // تطبيق الإضافة/النقص على سعر الأونصة
    const adjustedXauPrice = currentXauPrice + priceAdjustment;
    const isCashDebit = currentTab === 'cash-debit-gold-credit';
    const cashAmount = isCashDebit ? entity.cashDebit : entity.cashCredit;
    const goldAmount = isCashDebit ? entity.goldCredit : entity.goldDebit;
    
    // حساب التغطية على سعر (ريال/غرام) - نفس الطريقة المستخدمة في الجدول
    const coveragePrice = goldAmount > 0 ? cashAmount / goldAmount : 0;
    
    // سعر الصرف من إعدادات حساب الأونصة
    const exchangeRate = getExchangeRate();
    
    // سعر التكافؤ بالدولار = (المبلغ بالريال ÷ سعر الصرف) ÷ (الذهب ÷ 31.1035)
    const metalInOunces = goldAmount / 31.1035;
    const cashInUsd = Math.abs(cashAmount) / exchangeRate;
    const parityPrice = metalInOunces > 0 ? cashInUsd / metalInOunces : 0;
    
    // قيمة الذهب بسعر السوق (بالدولار)
    const metalValueAtMarket = metalInOunces * adjustedXauPrice;
    
    // الرصيد النقدي بالريال والدولار
    const currentCashSar = Math.abs(cashAmount);
    const currentCashUsd = cashInUsd;
    
    // حساب المعدل الحالي - نفس نافذة مركز العميل
    let currentRate = 0;
    if (parityPrice > 0 && adjustedXauPrice > 0) {
      if (isCashDebit) {
        // له ذهب عليه نقد (مدين ريال دائن ذهب) = له معدن في التقارير
        // المعدل = (سعر السوق - سعر التكافؤ) / سعر التكافؤ
        currentRate = ((adjustedXauPrice - parityPrice) / parityPrice) * 100;
      } else {
        // عليه ذهب له نقد (مدين ذهب دائن ريال) = عليه معدن في التقارير
        // المعدل = (سعر التكافؤ - سعر السوق) / سعر التكافؤ
        currentRate = ((parityPrice - adjustedXauPrice) / parityPrice) * 100;
      }
    }
    
    // تحديد ما إذا كان يحتاج تغطية - إذا كان المعدل الحالي أقل من المتفق عليه
    const needsCoverage = currentRate < agreedRate;
    
    // حساب المطلوب للتغطية بالدولار - نفس نافذة مركز العميل
    let requiredCoverageUsd = 0;
    if (needsCoverage) {
      if (isCashDebit) {
        // له ذهب عليه نقد = له معدن: المطلوب = الرصيد النقدي × (1 + المعدل%) - قيمة الذهب بسعر السوق
        const requiredBalance = currentCashUsd * (1 + agreedRate / 100);
        requiredCoverageUsd = requiredBalance - metalValueAtMarket;
      } else {
        // عليه ذهب له نقد = عليه معدن: المطلوب = قيمة الذهب بسعر السوق × (1 + المعدل%) - الرصيد النقدي
        const requiredBalance = metalValueAtMarket * (1 + agreedRate / 100);
        requiredCoverageUsd = requiredBalance - currentCashUsd;
      }
      if (requiredCoverageUsd < 0) requiredCoverageUsd = 0;
    }
    
    // تحويل المطلوب للتغطية إلى ريال
    const requiredCoverage = requiredCoverageUsd;
    const requiredCoverageSar = requiredCoverageUsd * exchangeRate;
    
    // مركز العميل للعرض في الجدول: إذا كان سعر المقارنة فارغاً استخدم الدولار مباشرة
    const customerPosition = comparePrice > 0 
      ? (coveragePrice / comparePrice) * 1000 
      : goldAmount > 0 ? (cashAmount / goldAmount) / exchangeRate * 31.1035 : 0;
    
    // جلب بيانات الشركة
    let companyData = {};
    try {
      if (window.api && window.api.getCompanyInfo) {
        const result = await window.api.getCompanyInfo();
        if (result && result.success && result.company) {
          companyData = result.company;
        }
      }
    } catch (error) {
      console.error('Error fetching company data:', error);
    }
    
    // جلب رقم الهاتف من قاعدة البيانات
    let entityPhone = '';
    let entityTax = '';
    let entityRegion = '';
    try {
      const entityMeta = await getOpenPositionsEntityMeta(entityType, id);
      entityPhone = entityMeta.phone;
      entityTax = entityMeta.tax;
      entityRegion = entityMeta.region;
    } catch (error) {
      console.error('Error fetching entity data:', error);
    }
    
    // إنشاء HTML للإخطار باستخدام القالب الجديد
    const notificationHTML = generateMarginCallHTML({
      entityType: entityType === 'customer' ? t('openPositions.table.customer') : t('openPositions.table.supplier'),
      entityName: entity.name,
      entityId: id,
      entityPhone: entityPhone,
      entityTax: entityTax || '---',
      entityRegion: entityRegion || '---',
      currentXauPrice: currentXauPrice,
      adjustedXauPrice: adjustedXauPrice,
      priceAdjustment: priceAdjustment,
      coveragePrice: coveragePrice,
      parityPrice: parityPrice,
      customerPosition: customerPosition,
      goldBalance: goldAmount,
      cashBalance: cashAmount,
      currentRate: currentRate,
      metalValueAtMarket: metalValueAtMarket,
      currentCashUsd: currentCashUsd,
      currentCashSar: currentCashSar,
      requiredCoverageUsd: requiredCoverageUsd,
      requiredCoverageSar: requiredCoverageSar,
      agreedRate: agreedRate,
      comparePrice: comparePrice,
      exchangeRate: exchangeRate,
      company: companyData
    });
    
    // فتح نافذة جديدة للطباعة
    const printWindow = window.open('', '_blank', 'width=1000,height=1000');
    if (printWindow) {
      printWindow.document.write(notificationHTML);
      printWindow.document.close();
    }
  };


  // ========== تحميل إعدادات حساب الأونصة ==========
  async function loadInvoiceSettings() {
    // الإعدادات الافتراضية
    const defaultSettings = {
      ounceCalculationType: 'default',
      conversionFactor: 31.1035,
      exchangeRate: 3.75,
      goldMultiplier: 0.12056,
      gold2Multiplier: 0.120555,
      customMultiplier: 1
    };
    
    try {
      const api = window.api || window.parent?.api || window.top?.api;
      if (api && typeof api.getInvoiceSettings === 'function') {
        const result = await api.getInvoiceSettings();
        if (result && result.success && result.data) {
          invoiceSettings = result.data;
          return;
        }
      }
      // استخدام الإعدادات الافتراضية
      invoiceSettings = defaultSettings;
    } catch (error) {
      console.error('Error loading invoice settings:', error);
      invoiceSettings = defaultSettings;
    }
  }

  // دالة للحصول على سعر الصرف من بطاقة إدارة العملات وأسعار الصرف (نفس شاشة التقارير)
  function getExchangeRate() {
    try {
      const savedCurrencies = localStorage.getItem('app_currencies') || localStorage.getItem('currencies');
      if (savedCurrencies) {
        const currencyList = JSON.parse(savedCurrencies);
        const sarCurrency = currencyList.find(c => c.code === 'SAR');
        if (sarCurrency && sarCurrency.rate) {
          return parseFloat(sarCurrency.rate);
        }
      }
    } catch (e) {
      console.error('Error loading exchange rate from currencies:', e);
    }
    // القيمة الافتراضية إذا لم يتم العثور على سعر الصرف
    return invoiceSettings?.exchangeRate || 3.75;
  }

  // ========== تهيئة الشاشة ==========
  async function init() {
    // تحميل الترجمات وتطبيقها
    await loadTranslations();
    applyTranslations();
    
    // تهيئة الصلاحيات
    if (window.ScreenPermissions) {
      await window.ScreenPermissions.init();
      
      // التحقق من صلاحية العرض
      if (!window.ScreenPermissions.check('open_positions_view', 'عرض شاشة المراكز المفتوحة')) {
        const screenRoot = document.querySelector('.open-positions-screen');
        if (screenRoot) {
          screenRoot.style.display = 'none';
        }
        return;
      }
      
      // إخفاء أزرار التصدير إذا لم يكن لديه صلاحية
      if (!window.ScreenPermissions.has('open_positions_export')) {
        if (btnExportExcel) btnExportExcel.style.display = 'none';
        if (btnExportPdf) btnExportPdf.style.display = 'none';
      }
    }
    
    // إعداد مستمعي الأحداث
    tabBtns.forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.tab)));
    if (searchInputEl) searchInputEl.addEventListener('input', debounce(filterTable, 300));
    if (comparePriceInputEl) comparePriceInputEl.addEventListener('change', () => {
      comparePrice = parseFloat(comparePriceInputEl.value) || 120.56;
      renderTable();
      updateCards();
    });
    
    // مستمعي أحداث المعدل المتفق عليه والإضافة/النقص
    const agreedRateInput = document.getElementById('agreedRate');
    const priceAdjustmentInput = document.getElementById('priceAdjustment');
    if (agreedRateInput) agreedRateInput.addEventListener('change', () => {
      renderTable();
      updateCards();
    });
    if (priceAdjustmentInput) priceAdjustmentInput.addEventListener('change', () => {
      renderTable();
      updateCards();
    });
    
    if (statusFilterEl) statusFilterEl.addEventListener('change', filterTable);
    if (btnRefresh) btnRefresh.addEventListener('click', refreshAll);
    if (btnRefreshXau) btnRefreshXau.addEventListener('click', (e) => { e.preventDefault(); refreshXauPrice(); });
    if (btnMt5ReconnectXau) btnMt5ReconnectXau.addEventListener('click', (e) => { e.preventDefault(); attemptMt5ReconnectOnce(); });
    if (btnExportPdf) btnExportPdf.addEventListener('click', (e) => { e.preventDefault(); printPositions(); });
    if (btnExportExcel) btnExportExcel.addEventListener('click', (e) => { e.preventDefault(); exportPositionsExcel(); });
    
    // تحميل إعدادات حساب الأونصة أولاً
    await loadInvoiceSettings();
    
    // تهيئة MT5
    applyMarketUi();
    tickCountdown();
    
    // تحميل السعر فوراً (انتظار اكتمال التحميل)
    await refreshXauPrice();
    
    // تحميل بيانات المراكز
    await loadPositionsData();

    // بدء التحديث الدوري بعد التحميل الأولي
    const refreshLoop = async () => {
      const start = Date.now();
      await refreshXauPrice({ silent: true });
      const elapsed = Date.now() - start;
      const ms = Number.isFinite(Number(currentRefreshMs)) ? Number(currentRefreshMs) : REFRESH_MT5_MS;
      refreshTimer = setTimeout(refreshLoop, Math.max(0, ms - elapsed));
    };
    refreshLoop();
    tickTimer = setInterval(tickCountdown, 1000);

    window.addEventListener('resize', () => drawSparkline(xauChartEl, xauSeries));
    window.addEventListener('beforeunload', () => {
      if (refreshTimer) clearTimeout(refreshTimer);
      if (tickTimer) clearInterval(tickTimer);
    });
  }

  window.refreshForBranchScopeChange = async function() {
    customerEntityCache = [];
    supplierEntityCache = [];
    await loadInvoiceSettings();
    await loadPositionsData();
    renderTable();
    updateCards();
    updateTabCounts();
    return true;
  };

  window.addEventListener('currenciesUpdated', async () => {
    await window.refreshForBranchScopeChange();
  });

  window.addEventListener('message', async (event) => {
    if (event?.data?.type !== 'currencies-updated') {
      return;
    }
    await window.refreshForBranchScopeChange();
  });

  // ========== تشغيل ==========
  document.addEventListener('DOMContentLoaded', init);

})();

// ===== WhatsApp Reports Screen Script =====
'use strict';

let WA_TRANSLATIONS = { ar: {}, en: {} };
let currentLang = 'ar';

async function loadTranslations() {
  try {
    const [arRes, enRes] = await Promise.all([
      fetch('./locales/ar.json'),
      fetch('./locales/en.json')
    ]);
    WA_TRANSLATIONS.ar = await arRes.json();
    WA_TRANSLATIONS.en = await enRes.json();
  } catch (err) {
    console.error('Error loading WA translations:', err);
  }
}

function getWaLang() {
  return localStorage.getItem('uiLang') || 'ar';
}

function t(key, params = {}) {
  const keys = String(key || '').split('.');
  let val = WA_TRANSLATIONS[currentLang];
  for (const k of keys) {
    val = val?.[k];
    if (val === undefined) break;
  }
  if (typeof val !== 'string') {
    val = WA_TRANSLATIONS.ar;
    for (const k of keys) {
      val = val?.[k];
      if (val === undefined) break;
    }
  }
  if (typeof val !== 'string') return key;
  for (const [k, v] of Object.entries(params)) {
    val = val.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
  }
  return val;
}

function getWaLocale() {
  // Always use Gregorian calendar + Latin (English) digits in both languages
  return currentLang === 'en' ? 'en-GB-u-ca-gregory-nu-latn' : 'ar-u-ca-gregory-nu-latn';
}

function applyTranslations() {
  currentLang = getWaLang();
  const isRTL = currentLang === 'ar';
  document.documentElement.lang = currentLang;
  document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  document.title = t('wa.header.title');

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = t(key);
    if (!text || text === key) return;
    if (el.children.length > 0) {
      const textNode = Array.from(el.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
      if (textNode) textNode.textContent = ` ${text}`;
      else el.textContent = text;
    } else {
      el.textContent = text;
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

  refreshTranslatedUI();
}

// Convert Arabic-Indic / Eastern Arabic digits to Latin digits
function toLatinDigits(str) {
  if (!str) return '';
  return String(str)
    .replace(/[\u0660-\u0669]/g, d => String.fromCharCode(d.charCodeAt(0) - 0x0660 + 0x30))
    .replace(/[\u06F0-\u06F9]/g, d => String.fromCharCode(d.charCodeAt(0) - 0x06F0 + 0x30));
}

// Sanitize a stored "lastSent" string. If it was saved using Hijri calendar
// (contains the marker " هـ"), treat it as legacy and return '' so callers
// fall back to the "—" placeholder until the next send overwrites it.
function sanitizeWaLastSent(value) {
  const s = String(value ?? '').trim();
  if (!s) return '';
  if (/هـ|هجري/.test(s)) return '';
  return toLatinDigits(s);
}

function formatDateTime(value) {
  try {
    return toLatinDigits(new Date(value).toLocaleString(getWaLocale()));
  } catch (_) {
    return String(value ?? '');
  }
}

// ===== State =====
let waSettings = {
  txNotify: {
    enabled: false,
    phones: [],
    groups: [],
    events: {
      salesInvoice: true,
      purchaseInvoice: true,
      receipt: true,
      voucher: true,
      journal: true,
    },
  },
  promo: {
    enabled: false,
    message: '',
    schedule: {
      type: 'interval',
      intervalValue: 24,
      intervalUnit: 'hours',
      dailyTime: '09:00',
    },
    phones: [],
    groups: [],
    lastSent: null,
  },
  balances: {
    enabled: false,
    ignoreZero: true,
    schedule: {
      type: 'daily',
      intervalValue: 24,
      intervalUnit: 'hours',
      dailyTime: '08:00',
    },
    recipients: [],
    lastSent: null,
  },
};

// ===== Permissions Helpers =====
function waHasPerm(name) {
  try {
    if (!window.ScreenPermissions) return true;
    if (window.ScreenPermissions.isAdmin()) return true;
    return window.ScreenPermissions.has(name);
  } catch (_) { return true; }
}

function waCheckPerm(name, actionLabel) {
  try {
    if (!window.ScreenPermissions) return true;
    if (window.ScreenPermissions.isAdmin()) return true;
    return window.ScreenPermissions.check(name, actionLabel);
  } catch (_) { return true; }
}

let waStatus = 'disconnected'; // 'disconnected' | 'loading' | 'connected'
let balanceLookupType = 'customer';
let balanceLookupRows = [];
let balanceRecipientsSearchQuery = '';
let balancesNextRunAtTs = null;
let waStatusLabelKey = 'wa.status.disconnected';
let waStatusLabelParams = {};

// ===== Init =====
document.addEventListener('DOMContentLoaded', async () => {
  // Bridge APIs من النافذة الأب إذا لم تكن موجودة محلياً
  (function ensureAPIBridge() {
    try {
      const pick = (name) => {
        if (!window[name]) {
          if (window.parent && window.parent[name]) window[name] = window.parent[name];
          else if (window.top && window.top[name]) window[name] = window.top[name];
        }
      };
      ['api', 'accounts', 'waReports'].forEach(pick);
    } catch (_) {}
  })();

  await loadTranslations();
  applyTranslations();

  // تهيئة الصلاحيات — نفس نظام باقي الشاشات
  if (window.ScreenPermissions) {
    try { await window.ScreenPermissions.init(); } catch (_) {}
    if (!waHasPerm('whatsapp_reports_view')) {
      const root = document.querySelector('.container');
      if (root) root.style.display = 'none';
      waCheckPerm('whatsapp_reports_view', t('wa.perm.viewScreen'));
      return;
    }
  }

  initNavPills();
  initConnectionCard();
  initTransactionsCard();
  initBalancesCard();
  initPromoCard();
  await loadSettings();
  await loadWaStatus();

  // تحديث دوري لحالة الاتصال — يعكس تسجيل الخروج من الجوال
  setInterval(() => loadWaStatus(), 30000);
});

window.addEventListener('storage', (e) => {
  if (e.key === 'uiLang') applyTranslations();
});

window.addEventListener('languageChanged', applyTranslations);

// ===== Nav Pills =====
function moveNavIndicator() {
  const wrap = document.getElementById('waNavPills');
  const indicator = document.getElementById('waNavIndicator');
  if (!wrap || !indicator) return;
  const active = wrap.querySelector('.nav-pill.active');
  if (!active) { indicator.style.width = '0'; return; }
  const wrapRect = wrap.getBoundingClientRect();
  const pillRect = active.getBoundingClientRect();
  indicator.style.top = (pillRect.top - wrapRect.top + wrap.scrollTop) + 'px';
  indicator.style.left = (pillRect.left - wrapRect.left + wrap.scrollLeft) + 'px';
  indicator.style.width = pillRect.width + 'px';
  indicator.style.height = pillRect.height + 'px';
}

window.addEventListener('resize', () => { try { moveNavIndicator(); } catch (_) {} });

function initNavPills() {
  const pills = document.querySelectorAll('.nav-pill');
  const cards = document.querySelectorAll('.wa-card');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      if (pill.classList.contains('nav-pill-locked')) {
        showToast(t('wa.msg.connectFirst'), 'warning');
        return;
      }
      pills.forEach(p => p.classList.remove('active'));
      cards.forEach(c => c.classList.remove('active-card'));
      pill.classList.add('active');
      const target = pill.dataset.target;
      const card = document.querySelector(`.${target}`);
      if (card) card.classList.add('active-card');
      try { moveNavIndicator(); } catch (_) {}
      try { updateWaHeroStats(); } catch (_) {}
    });
  });
  // Initial position (next tick to ensure layout is ready)
  setTimeout(() => { try { moveNavIndicator(); } catch (_) {} }, 50);
}

// ===== Hero stats =====
function updateWaHeroStats() {
  try {
    const recipientsEl = document.getElementById('waStatRecipients');
    const nextEl = document.getElementById('waStatNext');
    const lastEl = document.getElementById('waStatLast');
    const eventsEl = document.getElementById('waStatEvents');
    const recipients = Array.isArray(waSettings?.balances?.recipients) ? waSettings.balances.recipients : [];
    const active = recipients.filter(r => r && r.enabled !== false && (r.phone || r.group)).length;
    const nextTxt = (document.getElementById('balancesNextSendText')?.textContent || '').trim();
    if (recipientsEl) recipientsEl.textContent = String(active);
    if (nextEl) nextEl.textContent = nextTxt && nextTxt !== '—' ? nextTxt : '—';
    if (lastEl) {
      const last = sanitizeWaLastSent(waSettings?.balances?.lastSent || waSettings?.lastSent || '');
      lastEl.textContent = last || '—';
    }
    if (eventsEl) {
      const events = waSettings?.txNotify?.events || {};
      const count = Object.values(events).filter(v => v !== false).length;
      eventsEl.textContent = String(count);
    }

    // Mirror to bottom status bar
    const sbNext = document.getElementById('waSbNext');
    const sbRec = document.getElementById('waSbRecipients');
    if (sbNext) sbNext.textContent = nextTxt && nextTxt !== '—' ? nextTxt : '—';
    if (sbRec) sbRec.textContent = String(active);
  } catch (_) {}
}

// ===== Status bar (connection state mirror) =====
function updateWaStatusBar(state, label) {
  const dot = document.getElementById('waSbDot');
  const txt = document.getElementById('waSbText');
  if (!dot || !txt) return;
  dot.classList.remove('connected', 'disconnected', 'loading');
  const s = String(state || '').toLowerCase();
  if (s === 'connected') {
    dot.classList.add('connected');
    txt.textContent = label || 'متصل';
  } else if (s === 'loading' || s === 'connecting' || s === 'pairing') {
    dot.classList.add('loading');
    txt.textContent = label || 'جاري الربط…';
  } else {
    dot.classList.add('disconnected');
    txt.textContent = label || 'غير متصل';
  }
}

// ===== Shortcuts panel + keyboard handler =====
function openWaShortcuts() {
  const el = document.getElementById('waShortcutsOverlay');
  if (el) el.removeAttribute('hidden');
}
function closeWaShortcuts() {
  const el = document.getElementById('waShortcutsOverlay');
  if (el) el.setAttribute('hidden', '');
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('waSbShortcuts')?.addEventListener('click', openWaShortcuts);
  document.getElementById('waShortcutsClose')?.addEventListener('click', closeWaShortcuts);
  document.getElementById('waShortcutsOverlay')?.addEventListener('click', (e) => {
    if (e.target.id === 'waShortcutsOverlay') closeWaShortcuts();
  });
});

window.addEventListener('keydown', (e) => {
  const tag = (e.target && e.target.tagName) || '';
  const isTyping = /^(INPUT|TEXTAREA|SELECT)$/.test(tag) || (e.target && e.target.isContentEditable);

  // Esc: close overlays
  if (e.key === 'Escape') {
    const ov = document.getElementById('waShortcutsOverlay');
    if (ov && !ov.hasAttribute('hidden')) { closeWaShortcuts(); e.preventDefault(); return; }
  }

  // ? : open shortcuts
  if (!isTyping && (e.key === '?' || (e.shiftKey && e.key === '/'))) {
    openWaShortcuts();
    e.preventDefault();
    return;
  }

  if (!e.ctrlKey && !e.metaKey) return;

  // Ctrl+1..4 -> switch tabs
  if (['1','2','3','4'].includes(e.key)) {
    const map = {
      '1': 'card-connection',
      '2': 'card-transactions',
      '3': 'card-balances',
      '4': 'card-promo',
    };
    const target = map[e.key];
    const pill = document.querySelector(`.nav-pill[data-target="${target}"]`);
    if (pill && !pill.classList.contains('nav-pill-locked')) {
      pill.click();
      e.preventDefault();
    }
    return;
  }

  // Ctrl+S: save (trigger any visible save button)
  if (e.key.toLowerCase() === 's') {
    const btn = document.querySelector('.wa-card.active-card .btn-save-tx, .btn-save-tx');
    if (btn) { btn.click(); e.preventDefault(); }
    return;
  }

  // Ctrl+Enter: send balances now
  if (e.key === 'Enter') {
    const btn = document.getElementById('btnSendBalancesNow');
    if (btn) { btn.click(); e.preventDefault(); }
  }
});

function setTabsEnabled(connected) {
  const pills = document.querySelectorAll('.nav-pill');
  pills.forEach(pill => {
    if (pill.dataset.target === 'card-connection') return;
    if (connected) {
      pill.classList.remove('nav-pill-locked');
      pill.removeAttribute('title');
    } else {
      pill.classList.add('nav-pill-locked');
      pill.setAttribute('title', t('wa.msg.connectFirst'));
      // إذا كان هذا التبويب نشطاً — أعد للاتصال
      if (pill.classList.contains('active')) {
        pill.classList.remove('active');
        document.querySelectorAll('.wa-card').forEach(c => c.classList.remove('active-card'));
        const connectionPill = document.querySelector('[data-target="card-connection"]');
        if (connectionPill) connectionPill.classList.add('active');
        const connectionCard = document.querySelector('.card-connection');
        if (connectionCard) connectionCard.classList.add('active-card');
      }
    }
  });
  try { moveNavIndicator(); } catch (_) {}
}

// ===== Connection Card =====
function initConnectionCard() {
  document.getElementById('btnStartConnection').addEventListener('click', startConnection);
  document.getElementById('btnDisconnect').addEventListener('click', disconnectWa);
  document.getElementById('btnLogout').addEventListener('click', logoutWa);
}

async function startConnection() {
  if (!waCheckPerm('whatsapp_reports_connect', t('wa.perm.connect'))) return;
  const btn = document.getElementById('btnStartConnection');
  btn.disabled = true;
  setQrState('loading');
  setStatusBadge('loading', 'wa.status.initializing', {}, true);

  try {
    const result = await window.api.invoke('wa:start-connection');
    if (result?.success) {
      // التهيئة بدأت — ننتظر حدث QR أو connected عبر postMessage
      setStatusBadge('loading', 'wa.status.waitingQr', {}, true);
    } else {
      setQrState('idle');
      setStatusBadge('disconnected', 'wa.status.connectionFailed', {}, true);
      showToast(t('wa.msg.failed', { error: result?.error || t('wa.msg.unknownError') }), 'error');
      btn.disabled = false;
    }
  } catch (e) {
    setQrState('idle');
    setStatusBadge('disconnected', 'wa.status.disconnected', {}, true);
    showToast(t('wa.msg.error', { error: e.message }), 'error');
    btn.disabled = false;
  }
  // لا نُعيد تفعيل الزر هنا — يُعاد تفعيله عند الاتصال أو الخطأ
}

async function disconnectWa() {
  if (!waCheckPerm('whatsapp_reports_connect', t('wa.perm.disconnect'))) return;
  const confirmed = await showConfirm(t('wa.confirm.disconnectTitle'), t('wa.confirm.disconnectMsg'));
  if (!confirmed) return;

  try {
    await window.api.invoke('wa:disconnect');
    setQrState('idle');
    setStatusBadge('disconnected', 'wa.status.disconnected', {}, true);
    toggleConnectionButtons(false);
    document.getElementById('btnStartConnection').disabled = false;
    setQrSuccessMeta('', '');
    showToast(t('wa.msg.disconnected'), 'info');
  } catch (e) {
    showToast(t('wa.msg.disconnectFailed'), 'error');
  }
}

async function logoutWa() {
  if (!waCheckPerm('whatsapp_reports_connect', t('wa.perm.logout'))) return;
  const confirmed = await showConfirm(t('wa.confirm.logoutTitle'), t('wa.confirm.logoutMsg'));
  if (!confirmed) return;

  try {
    await window.api.invoke('wa:logout');
    setQrState('idle');
    setStatusBadge('disconnected', 'wa.status.disconnected', {}, true);
    toggleConnectionButtons(false);
    document.getElementById('btnStartConnection').disabled = false;
    setQrSuccessMeta('', '');
    showToast(t('wa.msg.loggedOut'), 'info');
  } catch (e) {
    showToast(t('wa.msg.logoutFailed'), 'error');
  }
}

function showQr(qrDataUrl) {
  const img = document.getElementById('qrImage');
  img.src = qrDataUrl;
  img.style.display = 'block';
  document.getElementById('qrPlaceholder').style.display = 'none';
  document.getElementById('qrLoading').style.display = 'none';
  document.getElementById('qrSuccess').style.display = 'none';
  document.getElementById('qrBox').className = 'qr-box has-qr';
  setStatusBadge('loading', 'wa.status.waitingScan', {}, true);
}

function setQrState(state) {
  const placeholder = document.getElementById('qrPlaceholder');
  const loadingEl = document.getElementById('qrLoading');
  const successEl = document.getElementById('qrSuccess');
  const successMeta = document.getElementById('qrSuccessMeta');
  const img = document.getElementById('qrImage');
  const box = document.getElementById('qrBox');

  placeholder.style.display = 'none';
  loadingEl.style.display = 'none';
  successEl.style.display = 'none';
  if (successMeta) {
    successMeta.style.display = 'none';
    successMeta.innerHTML = '';
  }
  img.style.display = 'none';
  box.className = 'qr-box';

  if (state === 'idle') { placeholder.style.display = 'block'; }
  else if (state === 'loading') { loadingEl.style.display = 'block'; }
  else if (state === 'connected') {
    successEl.style.display = 'block';
    box.className = 'qr-box connected-state';
  }
}

function setStatusBadge(status, textOrKey, params = {}, isTranslationKey = false) {
  const dot = document.querySelector('.status-dot');
  const textEl = document.getElementById('waStatusText');
  if (dot) dot.className = 'status-dot ' + status;
  waStatus = status;
  waStatusLabelKey = isTranslationKey ? textOrKey : null;
  waStatusLabelParams = isTranslationKey ? params : {};
  if (textEl) textEl.textContent = isTranslationKey ? t(textOrKey, params) : textOrKey;
  try {
    const label = isTranslationKey ? t(textOrKey, params) : textOrKey;
    updateWaStatusBar(status, label);
  } catch (_) {}
}

function toggleConnectionButtons(connected) {
  document.getElementById('btnStartConnection').style.display = connected ? 'none' : 'flex';
  document.getElementById('btnDisconnect').style.display = connected ? 'flex' : 'none';
  document.getElementById('btnLogout').style.display = connected ? 'flex' : 'none';
}

function setQrSuccessMeta(name, phone) {
  const meta = document.getElementById('qrSuccessMeta');
  if (!meta) return;
  const safeName = escHtml(name || t('wa.header.title'));
  const safePhone = typeof phone === 'string' ? escHtml(phone.trim()) : '';
  const parts = [`<span><i class="fa-solid fa-user"></i> ${safeName}</span>`];
  if (safePhone) parts.push(`<span><i class="fa-solid fa-mobile-screen-button"></i> ${safePhone}</span>`);
  meta.innerHTML = parts.join('');
  meta.style.display = 'flex';
}

function computeNextRunAtFromSchedule(schedule = {}, baseTs = Date.now(), fallbackTime = '08:00', fallbackInterval = 24) {
  if (schedule?.type === 'daily') {
    const parts = String(schedule.dailyTime || fallbackTime).split(':').map(Number);
    const h = Number.isFinite(parts[0]) ? parts[0] : Number(fallbackTime.split(':')[0]) || 8;
    const m = Number.isFinite(parts[1]) ? parts[1] : Number(fallbackTime.split(':')[1]) || 0;
    const now = new Date(baseTs);
    const next = new Date(baseTs);
    next.setHours(h, m, 0, 0);
    if (next <= now) next.setDate(next.getDate() + 1);
    return next.getTime();
  }
  const mult = schedule?.intervalUnit === 'minutes' ? 60000 : 3600000;
  const val = Math.max(1, Number.parseInt(schedule?.intervalValue, 10) || fallbackInterval);
  return baseTs + (val * mult);
}

function setBalancesNextRunTarget(nextRunAt) {
  const ts = Number(nextRunAt);
  balancesNextRunAtTs = Number.isFinite(ts) && ts > 0 ? ts : null;
  updateBalancesNextSendPreview();
}

function humanizeDurationMs(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  if (total <= 0) return 'الآن';
  const d = Math.floor(total / 86400);
  const h = Math.floor((total % 86400) / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (d > 0) return `${d} ي ${h} س`;
  if (h > 0) return `${h} س ${m} د`;
  if (m > 0) return `${m} د ${s} ث`;
  return `${s} ث`;
}

function tickRecipientCountdowns() {
  const pills = document.querySelectorAll('.recipient-countdown-pill');
  const now = Date.now();
  pills.forEach((pill) => {
    const ts = Number(pill.getAttribute('data-next-ts') || 0);
    const labelEl = pill.querySelector('.recipient-countdown-value');
    if (!labelEl) return;
    if (!ts) {
      const fallback = pill.getAttribute('data-next-label') || '—';
      labelEl.textContent = fallback;
      pill.classList.remove('is-soon', 'is-due');
      return;
    }
    const diff = ts - now;
    if (diff <= 0) {
      labelEl.textContent = 'مُستحَق الآن';
      pill.classList.add('is-due');
      pill.classList.remove('is-soon');
    } else {
      labelEl.textContent = humanizeDurationMs(diff);
      pill.classList.remove('is-due');
      pill.classList.toggle('is-soon', diff < 5 * 60 * 1000);
    }
  });
}

if (!window._waCountdownInterval) {
  window._waCountdownInterval = setInterval(() => {
    try { tickRecipientCountdowns(); } catch (_) {}
  }, 1000);
}

function updateBalancesSummaryBar() {
  const recipients = Array.isArray(waSettings?.balances?.recipients) ? waSettings.balances.recipients : [];
  const counts = {
    total: recipients.length,
    customer: 0, supplier: 0, account: 0,
    enabled: 0, disabled: 0, ready: 0,
  };
  recipients.forEach((r) => {
    if (!r) return;
    if (r.type === 'supplier') counts.supplier++;
    else if (r.type === 'account') counts.account++;
    else counts.customer++;
    if (r.enabled === false) counts.disabled++;
    else counts.enabled++;
    if (r.enabled !== false && (r.phone || r.group)) counts.ready++;
  });
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = String(val); };
  set('bsumCustomers', counts.customer);
  set('bsumSuppliers', counts.supplier);
  set('bsumAccounts', counts.account);
  set('bsumReady', counts.ready);
  set('bsumDisabled', counts.disabled);
}

function updateBalancesNextSendPreview() {
  const el = document.getElementById('balancesNextSendText');
  try { updateWaHeroStats(); } catch (_) {}
  try { updateBalancesSummaryBar(); } catch (_) {}
  if (!el) return;
  if (!waSettings.balances.enabled) {
    el.textContent = 'معطل';
    return;
  }
  const ts = balancesNextRunAtTs || computeNextRunAtFromSchedule(waSettings.balances.schedule, Date.now(), '08:00', 24);
  el.textContent = ts ? formatDateTime(ts) : '—';
}

function normalizeBalanceRecipientScheduleClient(recipient) {
  const sched = recipient?.schedule && typeof recipient.schedule === 'object' ? recipient.schedule : {};
  const nextRunRaw = Number(recipient?.nextRunAt || 0);
  return {
    ...recipient,
    useGlobalSchedule: recipient?.useGlobalSchedule !== false,
    schedule: {
      type: sched.type === 'daily' ? 'daily' : 'interval',
      intervalValue: Math.max(1, Math.min(168, Number.parseInt(sched.intervalValue, 10) || 24)),
      intervalUnit: sched.intervalUnit === 'minutes' ? 'minutes' : 'hours',
      dailyTime: /^\d{2}:\d{2}$/.test(String(sched.dailyTime || '')) ? String(sched.dailyTime) : '08:00',
    },
    nextRunAt: Number.isFinite(nextRunRaw) && nextRunRaw > 0 ? nextRunRaw : null,
  };
}

async function loadWaStatus() {
  try {
    const result = await window.api.invoke('wa:get-status');
    if (result?.connected) {
      setQrState('connected');
      setStatusBadge('connected', 'wa.status.connected', {}, true);
      toggleConnectionButtons(true);
      setQrSuccessMeta(result.name || '', result.phone || '');
      setBalancesNextRunTarget(result.balancesNextRunAt || null);
      setTabsEnabled(true);
    } else {
      const qrImg = document.getElementById('qrImage');
      if (!qrImg || !qrImg.src || qrImg.style.display === 'none') {
        setQrState('idle');
        setStatusBadge('disconnected', 'wa.status.disconnected', {}, true);
      }
      document.getElementById('btnStartConnection').disabled = false;
      setQrSuccessMeta('', '');
      setBalancesNextRunTarget(null);
      setTabsEnabled(false);
    }
  } catch (_) {}
}

// Listen for WA events relayed from shell via IPC
if (window.api?.on) {
  window.api.on('wa:qr-update', (_, qrDataUrl) => {
    console.log('[WA-Screen] IPC wa:qr-update received');
    showQr(qrDataUrl);
  });
  window.api.on('wa:connected', (_, payload) => {
    console.log('[WA-Screen] IPC wa:connected received');
    setQrState('connected');
    setStatusBadge('connected', 'wa.status.connected', {}, true);
    toggleConnectionButtons(true);
    setQrSuccessMeta(payload?.name || '', payload?.phone || '');
    setBalancesNextRunTarget(payload?.balancesNextRunAt || null);
    setTabsEnabled(true);
    showToast(t('wa.msg.connectedSuccess'), 'success');
  });
  window.api.on('wa:disconnected', (_, payload) => {
    console.log('[WA-Screen] IPC wa:disconnected received');
    setQrState('idle');
    setStatusBadge('disconnected', 'wa.status.disconnected', {}, true);
    toggleConnectionButtons(false);
    document.getElementById('btnStartConnection').disabled = false;
    setQrSuccessMeta('', '');
    setBalancesNextRunTarget(null);
    setTabsEnabled(false);
    if (payload?.reason === 'phone-logout') {
      showToast(t('wa.msg.sessionEnded'), 'warning');
    }
  });
  window.api.on('wa:loading', (_, payload) => {
    console.log('[WA-Screen] IPC wa:loading received');
    setStatusBadge('loading', 'wa.status.loadingPercent', { percent: payload?.percent || 0 }, true);
  });
  window.api.on('wa:initializing', () => {
    console.log('[WA-Screen] IPC wa:initializing received');
    setQrState('loading');
    setStatusBadge('loading', 'wa.status.retrying', {}, true);
  });
  window.api.on('wa:auth-failure', () => {
    console.log('[WA-Screen] IPC wa:auth-failure received');
    setQrState('idle');
    setStatusBadge('disconnected', 'wa.status.authFailed', {}, true);
    toggleConnectionButtons(false);
    setQrSuccessMeta('', '');
    showToast(t('wa.msg.authFailed'), 'error');
  });
  window.api.on('wa:error', (_, payload) => {
    console.log('[WA-Screen] IPC wa:error received');
    setQrState('idle');
    setStatusBadge('disconnected', 'wa.status.error', {}, true);
    toggleConnectionButtons(false);
    setQrSuccessMeta('', '');
    document.getElementById('btnStartConnection').disabled = false;
    showToast(t('wa.msg.waError', { error: payload?.message || t('wa.msg.unknown') }), 'error');
  });
  // تحديث فوري لحالة بطاقات المستلمين بعد كل إرسال (يدوي أو مجدول)
  window.api.on('wa:balances-status-updated', async () => {
    console.log('[WA-Screen] IPC wa:balances-status-updated — refreshing cards');
    await loadSettings();
  });
}

// Listen for WA events relayed from shell via postMessage (fallback)
window.addEventListener('message', (event) => {
  const msg = event.data;
  if (!msg || typeof msg !== 'object') return;
  // فقط أحداث wa:
  if (!String(msg.type || '').startsWith('wa:')) return;

  console.log('[WA-Screen] postMessage received:', msg.type, msg.payload ? JSON.stringify(msg.payload).substring(0, 80) : '');

  switch (msg.type) {
    case 'wa:qr-update':
      showQr(msg.payload);
      break;
    case 'wa:connected':
      setQrState('connected');
      setStatusBadge('connected', 'wa.status.connected', {}, true);
      toggleConnectionButtons(true);
      setQrSuccessMeta(msg.payload?.name || '', msg.payload?.phone || '');
      setBalancesNextRunTarget(msg.payload?.balancesNextRunAt || null);
      setTabsEnabled(true);
      showToast(t('wa.msg.connectedSuccess'), 'success');
      break;
    case 'wa:disconnected':
      setQrState('idle');
      setStatusBadge('disconnected', 'wa.status.disconnected', {}, true);
      toggleConnectionButtons(false);
      document.getElementById('btnStartConnection').disabled = false;
      setQrSuccessMeta('', '');
      setBalancesNextRunTarget(null);
      setTabsEnabled(false);
      break;
    case 'wa:loading':
      setStatusBadge('loading', 'wa.status.loadingPercent', { percent: msg.payload?.percent || 0 }, true);
      break;
    case 'wa:initializing':
      setQrState('loading');
      setStatusBadge('loading', 'wa.status.retrying', {}, true);
      break;
    case 'wa:auth-failure':
      setQrState('idle');
      setStatusBadge('disconnected', 'wa.status.authFailed', {}, true);
      toggleConnectionButtons(false);
      setQrSuccessMeta('', '');
      showToast(t('wa.msg.authFailed'), 'error');
      break;
    case 'wa:error':
      setQrState('idle');
      setStatusBadge('disconnected', 'wa.status.error', {}, true);
      toggleConnectionButtons(false);
      setQrSuccessMeta('', '');
      document.getElementById('btnStartConnection').disabled = false;
      showToast(t('wa.msg.waError', { error: msg.payload?.message || t('wa.msg.unknown') }), 'error');
      break;
  }
});

// ===== Transactions Notify Card =====
function initTransactionsCard() {
  const bindToggle = (id, key) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('change', (e) => {
      waSettings.txNotify.events[key] = !!e.target.checked;
    });
  };

  const enabledEl = document.getElementById('txNotifyEnabled');
  if (enabledEl) {
    enabledEl.addEventListener('change', (e) => {
      waSettings.txNotify.enabled = !!e.target.checked;
    });
  }

  bindToggle('txEvtSalesInvoice', 'salesInvoice');
  bindToggle('txEvtPurchaseInvoice', 'purchaseInvoice');
  bindToggle('txEvtReceipt', 'receipt');
  bindToggle('txEvtVoucher', 'voucher');
  bindToggle('txEvtJournal', 'journal');

  document.getElementById('btnAddTxPhone')?.addEventListener('click', () => {
    const input = document.getElementById('txPhoneInput');
    const val = String(input?.value || '').trim().replace(/\s+/g, '').replace(/^\+/, '');
    if (!val) { showToast(t('wa.msg.enterPhone'), 'warning'); return; }
    if (!/^\d{9,15}$/.test(val)) { showToast(t('wa.msg.invalidPhone'), 'warning'); return; }
    if (waSettings.txNotify.phones.includes(val)) { showToast(t('wa.msg.phoneExists'), 'warning'); return; }
    waSettings.txNotify.phones.push(val);
    renderTxPhones();
    saveSettings(true);
    if (input) input.value = '';
    showToast(t('wa.msg.txPhoneAdded'), 'success');
  });

  document.getElementById('txPhoneInput')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('btnAddTxPhone')?.click();
  });

  document.getElementById('btnAddTxGroup')?.addEventListener('click', () => {
    const input = document.getElementById('txGroupInput');
    const val = String(input?.value || '').trim();
    if (!val) { showToast(t('wa.msg.enterGroup'), 'warning'); return; }
    if (waSettings.txNotify.groups.includes(val)) { showToast(t('wa.msg.groupExists'), 'warning'); return; }
    waSettings.txNotify.groups.push(val);
    renderTxGroups();
    saveSettings(true);
    if (input) input.value = '';
    showToast(t('wa.msg.txGroupAdded'), 'success');
  });

  document.getElementById('txGroupInput')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('btnAddTxGroup')?.click();
  });

  document.getElementById('btnSaveTxNotify')?.addEventListener('click', () => saveSettings(false));
}

function renderTxPhones() {
  const list = document.getElementById('txPhonesList');
  const empty = document.getElementById('txPhonesEmpty');
  if (!list) return;
  const phones = Array.isArray(waSettings.txNotify?.phones) ? waSettings.txNotify.phones : [];

  if (!phones.length) {
    list.querySelectorAll('.recipient-item').forEach(el => el.remove());
    if (empty) empty.style.display = 'block';
    return;
  }
  if (empty) empty.style.display = 'none';
  list.querySelectorAll('.recipient-item').forEach(el => el.remove());

  phones.forEach((p, i) => {
    const div = document.createElement('div');
    div.className = 'recipient-item';
    div.innerHTML = `
      <span class="recipient-item-icon"><i class="fa-solid fa-phone"></i></span>
      <span class="recipient-item-value" dir="ltr">+${escHtml(p)}</span>
      <button class="btn-remove-item" title="${escHtml(t('wa.msg.delete'))}"><i class="fa-solid fa-trash-can"></i></button>
    `;
    div.querySelector('.btn-remove-item')?.addEventListener('click', () => {
      waSettings.txNotify.phones.splice(i, 1);
      renderTxPhones();
      saveSettings(true);
    });
    list.appendChild(div);
  });
}

function renderTxGroups() {
  const list = document.getElementById('txGroupsList');
  const empty = document.getElementById('txGroupsEmpty');
  if (!list) return;
  const groups = Array.isArray(waSettings.txNotify?.groups) ? waSettings.txNotify.groups : [];

  if (!groups.length) {
    list.querySelectorAll('.recipient-item').forEach(el => el.remove());
    if (empty) empty.style.display = 'block';
    return;
  }
  if (empty) empty.style.display = 'none';
  list.querySelectorAll('.recipient-item').forEach(el => el.remove());

  groups.forEach((g, i) => {
    const div = document.createElement('div');
    div.className = 'recipient-item';
    div.innerHTML = `
      <span class="recipient-item-icon"><i class="fa-solid fa-people-group"></i></span>
      <span class="recipient-item-value">${escHtml(g)}</span>
      <button class="btn-remove-item" title="${escHtml(t('wa.msg.delete'))}"><i class="fa-solid fa-trash-can"></i></button>
    `;
    div.querySelector('.btn-remove-item')?.addEventListener('click', () => {
      waSettings.txNotify.groups.splice(i, 1);
      renderTxGroups();
      saveSettings(true);
    });
    list.appendChild(div);
  });
}

// ===== Promo helpers (formatting + variables + live bubble preview) =====
function wrapPromoSelection(mark) {
  const ta = document.getElementById('promoMessage');
  if (!ta) return;
  const start = ta.selectionStart, end = ta.selectionEnd;
  const before = ta.value.slice(0, start);
  const sel = ta.value.slice(start, end) || 'نص';
  const after = ta.value.slice(end);
  ta.value = `${before}${mark}${sel}${mark}${after}`;
  ta.focus();
  ta.selectionStart = start + mark.length;
  ta.selectionEnd = start + mark.length + sel.length;
  ta.dispatchEvent(new Event('input', { bubbles: true }));
}

function insertPromoText(text) {
  const ta = document.getElementById('promoMessage');
  if (!ta) return;
  const start = ta.selectionStart, end = ta.selectionEnd;
  ta.value = ta.value.slice(0, start) + text + ta.value.slice(end);
  ta.focus();
  const pos = start + text.length;
  ta.selectionStart = ta.selectionEnd = pos;
  ta.dispatchEvent(new Event('input', { bubbles: true }));
}

function escHtmlBubble(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function whatsappToHtml(raw) {
  let s = escHtmlBubble(raw);
  // WhatsApp formatting: *bold*, _italic_, ~strike~, ```mono```
  s = s.replace(/```([\s\S]+?)```/g, '<code>$1</code>');
  s = s.replace(/(^|\s)\*([^\*\n]+)\*(?=\s|$|[.,!؟])/g, '$1<b>$2</b>');
  s = s.replace(/(^|\s)_([^_\n]+)_(?=\s|$|[.,!؟])/g, '$1<i>$2</i>');
  s = s.replace(/(^|\s)~([^~\n]+)~(?=\s|$|[.,!؟])/g, '$1<s>$2</s>');
  s = s.replace(/\n/g, '<br>');
  return s;
}

function updatePromoBubble() {
  const bubble = document.getElementById('promoBubble');
  const ta = document.getElementById('promoMessage');
  if (!bubble) return;
  const text = ta ? ta.value : '';
  if (!text.trim()) {
    bubble.innerHTML = '<span class="wa-bubble-empty">سيظهر شكل الرسالة هنا أثناء الكتابة...</span>';
    return;
  }
  bubble.innerHTML = whatsappToHtml(text);
}

// ===== Promo Card =====
function initPromoCard() {
  document.getElementById('promoEnabled')?.addEventListener('change', (e) => {
    waSettings.promo.enabled = !!e.target.checked;
  });

  const msgEl = document.getElementById('promoMessage');
  if (msgEl) {
    msgEl.addEventListener('input', () => {
      waSettings.promo.message = msgEl.value;
      const cc = document.getElementById('promoCharCount');
      if (cc) cc.textContent = msgEl.value.length;
      updatePromoBubble();
    });
  }

  // Formatting buttons (wrap selection with WhatsApp markers)
  document.querySelectorAll('[data-promo-fmt]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const mark = btn.dataset.promoFmt === 'bold' ? '*'
                  : btn.dataset.promoFmt === 'italic' ? '_'
                  : '~';
      wrapPromoSelection(mark);
    });
  });

  // Variable inserters
  document.querySelectorAll('[data-promo-var]').forEach((btn) => {
    btn.addEventListener('click', () => {
      insertPromoText(btn.dataset.promoVar || '');
    });
  });

  updatePromoBubble();

  document.getElementById('promoScheduleType')?.addEventListener('change', (e) => {
    waSettings.promo.schedule.type = e.target.value;
    document.getElementById('promoIntervalSettings').style.display = e.target.value === 'interval' ? 'block' : 'none';
    document.getElementById('promoDailySettings').style.display   = e.target.value === 'daily'    ? 'block' : 'none';
  });

  document.getElementById('btnDecrPromoInterval')?.addEventListener('click', () => {
    const inp = document.getElementById('promoIntervalValue');
    inp.value = Math.max(1, (parseInt(inp.value) || 1) - 1);
    waSettings.promo.schedule.intervalValue = parseInt(inp.value);
  });
  document.getElementById('btnIncrPromoInterval')?.addEventListener('click', () => {
    const inp = document.getElementById('promoIntervalValue');
    inp.value = Math.min(168, (parseInt(inp.value) || 1) + 1);
    waSettings.promo.schedule.intervalValue = parseInt(inp.value);
  });
  document.getElementById('promoIntervalValue')?.addEventListener('input', (e) => {
    waSettings.promo.schedule.intervalValue = parseInt(e.target.value) || 1;
  });
  document.getElementById('promoIntervalUnit')?.addEventListener('change', (e) => {
    waSettings.promo.schedule.intervalUnit = e.target.value;
  });
  document.getElementById('promoDailyTime')?.addEventListener('change', (e) => {
    waSettings.promo.schedule.dailyTime = e.target.value;
  });

  document.getElementById('btnAddPromoPhone')?.addEventListener('click', () => {
    const input = document.getElementById('promoPhoneInput');
    const val = String(input?.value || '').trim().replace(/\s+/g, '').replace(/^\+/, '');
    if (!val) { showToast(t('wa.msg.enterPhone'), 'warning'); return; }
    if (!/^\d{9,15}$/.test(val)) { showToast(t('wa.msg.invalidPhone'), 'warning'); return; }
    if (waSettings.promo.phones.includes(val)) { showToast(t('wa.msg.phoneExists'), 'warning'); return; }
    waSettings.promo.phones.push(val);
    renderPromoPhones();
    saveSettings(true);
    if (input) input.value = '';
    showToast(t('wa.msg.phoneAdded'), 'success');
  });
  document.getElementById('promoPhoneInput')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('btnAddPromoPhone')?.click();
  });

  document.getElementById('btnAddPromoGroup')?.addEventListener('click', () => {
    const input = document.getElementById('promoGroupInput');
    const val = String(input?.value || '').trim();
    if (!val) { showToast(t('wa.msg.enterGroup'), 'warning'); return; }
    if (waSettings.promo.groups.includes(val)) { showToast(t('wa.msg.groupExists'), 'warning'); return; }
    waSettings.promo.groups.push(val);
    renderPromoGroups();
    saveSettings(true);
    if (input) input.value = '';
    showToast(t('wa.msg.groupAdded'), 'success');
  });
  document.getElementById('promoGroupInput')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('btnAddPromoGroup')?.click();
  });

  document.getElementById('btnSavePromo')?.addEventListener('click', () => saveSettings(false));
  document.getElementById('btnSendPromoNow')?.addEventListener('click', sendPromoNow);
}

async function sendPromoNow() {
  if (!waCheckPerm('whatsapp_reports_send', t('wa.perm.send'))) return;
  const msg = String(document.getElementById('promoMessage')?.value || '').trim();
  if (!msg) { showToast(t('wa.msg.enterPromoMessage'), 'warning'); return; }
  if (!waSettings.promo.phones.length && !waSettings.promo.groups.length) {
    showToast(t('wa.msg.addRecipientFirst'), 'warning'); return;
  }
  let connected = waStatus === 'connected';
  if (!connected) {
    try {
      const s = await window.api.invoke('wa:get-status');
      connected = s?.connected === true;
      if (connected) { setQrState('connected'); setStatusBadge('connected', 'wa.status.connected', {}, true); toggleConnectionButtons(true); }
    } catch (_) {}
  }
  if (!connected) { showToast(t('wa.msg.connectFirst'), 'warning'); return; }

  const btn = document.getElementById('btnSendPromoNow');
  btn.disabled = true;
  btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> ${escHtml(t('wa.schedule.sending'))}`;
  try {
    const result = await window.api.invoke('wa:send-promo-now', {
      message: msg,
      phones: waSettings.promo.phones,
      groups: waSettings.promo.groups,
    });
    if (result?.success || result?.sent > 0) {
      const now = formatDateTime(Date.now());
      const lastEl = document.getElementById('promoLastSendText');
      if (lastEl) lastEl.textContent = now;
      waSettings.promo.lastSent = now;
      await saveSettings(true);
      const errNote = result.errors?.length ? t('wa.msg.withSomeErrors') : '';
      showToast(`${t('wa.msg.promoSent', { count: result.sent || 0 })}${errNote}`, result.sent > 0 ? 'success' : 'warning');
    } else if (result?.error === 'WA_SEND_IN_PROGRESS') {
      showToast(t('wa.msg.promoSendInProgress'), 'warning');
    } else {
      showToast(t('wa.msg.sendFailed', { error: result?.error || t('wa.status.error') }), 'error');
    }
  } catch (e) {
    showToast(t('wa.msg.sendError', { error: e.message }), 'error');
  }
  btn.disabled = false;
  btn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> ${escHtml(t('wa.promo.btnSendNow'))}`;
}

function renderPromoPhones() {
  const list  = document.getElementById('promoPhonesList');
  const empty = document.getElementById('promoPhonesEmpty');
  if (!list) return;
  const phones = Array.isArray(waSettings.promo?.phones) ? waSettings.promo.phones : [];
  if (!phones.length) {
    list.querySelectorAll('.recipient-item').forEach(el => el.remove());
    if (empty) empty.style.display = 'block';
    return;
  }
  if (empty) empty.style.display = 'none';
  list.querySelectorAll('.recipient-item').forEach(el => el.remove());
  phones.forEach((p, i) => {
    const div = document.createElement('div');
    div.className = 'recipient-item';
    div.innerHTML = `
      <span class="recipient-item-icon"><i class="fa-solid fa-phone"></i></span>
      <span class="recipient-item-value" dir="ltr">+${escHtml(p)}</span>
      <button class="btn-remove-item" title="${escHtml(t('wa.msg.delete'))}"><i class="fa-solid fa-trash-can"></i></button>
    `;
    div.querySelector('.btn-remove-item')?.addEventListener('click', () => {
      waSettings.promo.phones.splice(i, 1);
      renderPromoPhones();
      saveSettings(true);
    });
    list.appendChild(div);
  });
}

function renderPromoGroups() {
  const list  = document.getElementById('promoGroupsList');
  const empty = document.getElementById('promoGroupsEmpty');
  if (!list) return;
  const groups = Array.isArray(waSettings.promo?.groups) ? waSettings.promo.groups : [];
  if (!groups.length) {
    list.querySelectorAll('.recipient-item').forEach(el => el.remove());
    if (empty) empty.style.display = 'block';
    return;
  }
  if (empty) empty.style.display = 'none';
  list.querySelectorAll('.recipient-item').forEach(el => el.remove());
  groups.forEach((g, i) => {
    const div = document.createElement('div');
    div.className = 'recipient-item';
    div.innerHTML = `
      <span class="recipient-item-icon"><i class="fa-solid fa-people-group"></i></span>
      <span class="recipient-item-value">${escHtml(g)}</span>
      <button class="btn-remove-item" title="${escHtml(t('wa.msg.delete'))}"><i class="fa-solid fa-trash-can"></i></button>
    `;
    div.querySelector('.btn-remove-item')?.addEventListener('click', () => {
      waSettings.promo.groups.splice(i, 1);
      renderPromoGroups();
      saveSettings(true);
    });
    list.appendChild(div);
  });
}

// ===== Balances Card =====
function initBalancesCard() {
  const typeEl = document.getElementById('balancesScheduleType');
  typeEl?.addEventListener('change', (e) => {
    waSettings.balances.schedule.type = e.target.value;
    document.getElementById('balancesIntervalSettings').style.display = e.target.value === 'interval' ? 'block' : 'none';
    document.getElementById('balancesDailySettings').style.display = e.target.value === 'daily' ? 'block' : 'none';
    updateBalancesNextSendPreview();
  });

  document.getElementById('balancesEnabled')?.addEventListener('change', (e) => {
    waSettings.balances.enabled = !!e.target.checked;
    updateBalancesNextSendPreview();
  });
  document.getElementById('balancesIgnoreZero')?.addEventListener('change', (e) => {
    waSettings.balances.ignoreZero = !!e.target.checked;
  });
  document.getElementById('btnDecrBalancesInterval')?.addEventListener('click', () => {
    const inp = document.getElementById('balancesIntervalValue');
    inp.value = Math.max(1, (parseInt(inp.value) || 1) - 1);
    waSettings.balances.schedule.intervalValue = parseInt(inp.value);
    updateBalancesNextSendPreview();
  });
  document.getElementById('btnIncrBalancesInterval')?.addEventListener('click', () => {
    const inp = document.getElementById('balancesIntervalValue');
    inp.value = Math.min(168, (parseInt(inp.value) || 1) + 1);
    waSettings.balances.schedule.intervalValue = parseInt(inp.value);
    updateBalancesNextSendPreview();
  });
  document.getElementById('balancesIntervalValue')?.addEventListener('input', (e) => {
    waSettings.balances.schedule.intervalValue = parseInt(e.target.value) || 24;
    updateBalancesNextSendPreview();
  });
  document.getElementById('balancesIntervalUnit')?.addEventListener('change', (e) => {
    waSettings.balances.schedule.intervalUnit = e.target.value;
    updateBalancesNextSendPreview();
  });
  document.getElementById('balancesDailyTime')?.addEventListener('change', (e) => {
    waSettings.balances.schedule.dailyTime = e.target.value;
    updateBalancesNextSendPreview();
  });

  const input = document.getElementById('balancePartySearchInput');
  input?.addEventListener('click', () => openBalanceLookup(balanceLookupType));
  input?.addEventListener('keydown', (e) => {
    if (e.key === 'F9' || e.key === 'Enter') {
      e.preventDefault();
      openBalanceLookup(balanceLookupType);
    }
  });
  document.getElementById('btnAddBalanceParty')?.addEventListener('click', () => openBalanceLookup(balanceLookupType));
  document.getElementById('balanceRecipientsSearchInput')?.addEventListener('input', (e) => {
    balanceRecipientsSearchQuery = String(e.target.value || '').trim().toLowerCase();
    renderBalanceRecipients();
  });
  document.getElementById('btnSaveBalances')?.addEventListener('click', () => saveSettings(false));
  document.getElementById('btnSendBalancesNow')?.addEventListener('click', sendBalancesNow);

  document.getElementById('balanceLookupClose')?.addEventListener('click', closeBalanceLookup);
  document.getElementById('balanceLookupCancel')?.addEventListener('click', closeBalanceLookup);
  document.querySelector('[data-balance-lookup-close]')?.addEventListener('click', closeBalanceLookup);
  document.getElementById('balanceLookupSearch')?.addEventListener('input', async (e) => {
    await searchAndRenderBalanceLookup(e.target.value || '');
  });
  document.querySelectorAll('.balance-lookup-tab').forEach(tab => {
    tab.addEventListener('click', () => openBalanceLookup(tab.dataset.balanceType || 'customer'));
  });
  document.addEventListener('keydown', (e) => {
    const isBalanceContext = !!e.target?.closest?.('#balanceLookupModal, .card-balances') || document.querySelector('.card-balances')?.classList.contains('active-card');
    if (e.key === 'F9') {
      if (!isBalanceContext) return;
      e.preventDefault();
      openBalanceLookup(balanceLookupType);
    } else if (e.key === 'Escape' && document.getElementById('balanceLookupModal')?.getAttribute('aria-hidden') === 'false') {
      closeBalanceLookup();
    }
  });
}

function getBalancePartyTypeLabel(type) {
  if (type === 'supplier') return t('wa.balances.supplier');
  if (type === 'account') return t('wa.balances.account');
  return t('wa.balances.customer');
}

function getBalanceLookupTitle(type) {
  if (type === 'supplier') return t('wa.balances.lookupSupplierTitle');
  if (type === 'account') return t('wa.balances.lookupAccountTitle');
  return t('wa.balances.lookupCustomerTitle');
}

async function openBalanceLookup(type = 'customer') {
  balanceLookupType = ['customer', 'supplier', 'account'].includes(type) ? type : 'customer';
  document.querySelectorAll('.balance-lookup-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.balanceType === balanceLookupType);
  });
  const title = document.querySelector('#balanceLookupTitle span');
  if (title) title.textContent = getBalanceLookupTitle(balanceLookupType);
  const search = document.getElementById('balanceLookupSearch');
  if (search) search.value = '';
  const modal = document.getElementById('balanceLookupModal');
  if (modal) modal.setAttribute('aria-hidden', 'false');
  await searchAndRenderBalanceLookup('');
  setTimeout(() => search?.focus(), 80);
}

function closeBalanceLookup() {
  const modal = document.getElementById('balanceLookupModal');
  if (modal) modal.setAttribute('aria-hidden', 'true');
}

async function searchAndRenderBalanceLookup(query = '') {
  const body = document.getElementById('balanceLookupBody');
  if (!body) return;
  body.innerHTML = `<tr><td colspan="2" style="text-align:center; padding:20px; color:var(--subtle)">${escHtml(t('wa.status.loading'))}</td></tr>`;
  try {
    const result = await window.api.invoke('wa:search-balance-parties', { query, type: balanceLookupType, limit: 50 });
    balanceLookupRows = Array.isArray(result?.data) ? result.data : [];
    renderBalanceLookupRows(balanceLookupRows);
  } catch (e) {
    showToast(t('wa.msg.error', { error: e.message }), 'error');
    renderBalanceLookupRows([]);
  }
}

function renderBalanceLookupRows(rows) {
  const body = document.getElementById('balanceLookupBody');
  if (!body) return;
  body.innerHTML = '';
  const data = Array.isArray(rows) ? rows : [];
  if (!data.length) {
    body.innerHTML = `<tr><td colspan="2" style="text-align:center; padding:20px; color:var(--subtle)">${escHtml(t('wa.balances.noResults'))}</td></tr>`;
    return;
  }
  data.forEach((p) => {
    const row = normalizeBalanceLookupParty(p);
    const displayCode = getBalanceRecipientDisplayCode(row);
    const tr = document.createElement('tr');
    tr.tabIndex = 0;
    tr.innerHTML = `
      <td>${escHtml(displayCode)}</td>
      <td>
        <strong>${escHtml(row.name || displayCode || '')}</strong>
        <div style="font-size:0.78rem; color:var(--subtle)">${escHtml(getBalancePartyTypeLabel(row.type))}</div>
      </td>
    `;
    tr.addEventListener('click', () => {
      addBalancePartyToList(row);
      closeBalanceLookup();
    });
    tr.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        addBalancePartyToList(row);
        closeBalanceLookup();
      }
    });
    body.appendChild(tr);
  });
}

function normalizeBalanceLookupParty(p) {
  const type = ['customer', 'supplier', 'account'].includes(p?.type) ? p.type : 'customer';
  const displayCode = String(
    p?.displayCode ||
    p?.display_code ||
    p?.displayNumber ||
    p?.display_number ||
    (type === 'account' ? (p?.accountCode || p?.account_code || p?.code || '') : p?.id || '')
  ).trim();
  const accountCode = String(p?.accountCode || p?.account_code || p?.code || '').trim();
  return {
    type,
    id: Number(p?.id) || 0,
    accountId: Number(p?.accountId || p?.account_id || (type === 'account' ? p?.id : 0)) || null,
    accountCode,
    displayCode,
    displayNumber: displayCode,
    name: String(p?.name || p?.full_name || p?.accountName || p?.account_name || displayCode || '').trim(),
    phone: String(p?.phone || '').replace(/^\+/, '').replace(/\s+/g, ''),
    group: '',
    enabled: true,
  };
}

function getBalanceRecipientDisplayCode(recipient) {
  const type = ['customer', 'supplier', 'account'].includes(recipient?.type) ? recipient.type : 'customer';
  const id = Number(recipient?.id || 0) || 0;
  const explicitDisplay = String(recipient?.displayCode || recipient?.displayNumber || recipient?.display_number || '').trim();
  if (explicitDisplay) return explicitDisplay;
  if (type === 'account') return String(recipient?.accountCode || recipient?.account_code || recipient?.code || '').trim();
  return id ? String(id) : '';
}

function addBalancePartyToList(party) {
  if (!party?.id || !party?.type) return;
  const exists = waSettings.balances.recipients.some((r) => r.type === party.type && Number(r.id) === Number(party.id));
  if (exists) {
    showToast(t('wa.msg.balancePartyExists'), 'warning');
    return;
  }
  waSettings.balances.recipients.push({
    type: ['customer', 'supplier', 'account'].includes(party.type) ? party.type : 'customer',
    id: Number(party.id),
    accountId: party.accountId || null,
    accountCode: getBalanceRecipientDisplayCode(party),
    displayCode: getBalanceRecipientDisplayCode(party),
    name: party.name || '',
    phone: party.phone || '',
    group: party.group || '',
    enabled: party.enabled !== false,
    useGlobalSchedule: true,
    schedule: {
      type: 'daily',
      intervalValue: 24,
      intervalUnit: 'hours',
      dailyTime: '08:00',
    },
    nextRunAt: null,
    lastSent: null,
    lastStatus: null,
  });
  const input = document.getElementById('balancePartySearchInput');
  if (input) input.value = '';
  renderBalanceRecipients();
  saveSettings(true);
  showToast(t('wa.msg.balancePartyAdded', { name: party.name || getBalanceRecipientDisplayCode(party) || '' }), 'success');
}

// تحديث ديناميكي لكرت مستلم واحد بدون إعادة رسم القائمة كاملة
// — يحافظ على موضع السكرول والتركيز وتجربة المستخدم.
function refreshBalanceCardDynamics(card, row) {
  if (!card || !row) return;
  const useGlobal = row.useGlobalSchedule !== false;
  const recipientSchedule = (row.schedule && typeof row.schedule === 'object')
    ? row.schedule
    : { type: 'daily', intervalValue: 24, intervalUnit: 'hours', dailyTime: '08:00' };

  // تفعيل/تعطيل حقول الجدولة الخاصة وفق "عام/خاص" ونوع الجدولة
  const typeSel = card.querySelector('[data-balance-sched-type]');
  const intervalInp = card.querySelector('[data-balance-sched-interval]');
  const unitSel = card.querySelector('[data-balance-sched-unit]');
  const timeInp = card.querySelector('[data-balance-sched-time]');
  if (typeSel) typeSel.disabled = useGlobal;
  if (intervalInp) intervalInp.disabled = useGlobal || recipientSchedule.type !== 'interval';
  if (unitSel) unitSel.disabled = useGlobal || recipientSchedule.type !== 'interval';
  if (timeInp) timeInp.disabled = useGlobal || recipientSchedule.type !== 'daily';

  // حالة الكرت (مفعّل/معطّل)
  card.classList.toggle('is-disabled', row.enabled === false);

  // تحديث عدّاد "القادم"
  try {
    const effectiveSchedule = useGlobal ? waSettings.balances.schedule : recipientSchedule;
    const nextRunTs = Number(row.nextRunAt || 0) || computeNextRunAtFromSchedule(effectiveSchedule, Date.now(), '08:00', 24);
    const hasTarget = !!(row.phone || row.group);
    const nextRunLabel = row.enabled === false
      ? 'معطل'
      : (!hasTarget ? 'بدون مستلم' : formatDateTime(nextRunTs));
    const pill = card.querySelector('.recipient-countdown-pill');
    if (pill) {
      const countdownTs = (row.enabled !== false && hasTarget) ? nextRunTs : 0;
      pill.setAttribute('data-next-ts', String(countdownTs));
      pill.setAttribute('data-next-label', nextRunLabel);
      const valueEl = pill.querySelector('.recipient-countdown-value');
      if (valueEl) valueEl.textContent = nextRunLabel;
    }
  } catch (_) {}

  // تحديث العدّادات الإجمالية (بطاقة الهيرو + الشريط السفلي + شريط الملخص)
  try { updateWaHeroStats(); } catch (_) {}
  try { updateBalancesSummaryBar(); } catch (_) {}
}

function renderBalanceRecipients() {
  const list = document.getElementById('balanceRecipientsList');
  const empty = document.getElementById('balanceRecipientsEmpty');
  if (!list) return;
  list.querySelectorAll('.balance-recipient-card').forEach(el => el.remove());
  const rows = Array.isArray(waSettings.balances?.recipients) ? waSettings.balances.recipients : [];
  const emptyText = empty?.querySelector('p');
  if (!rows.length) {
    if (emptyText) emptyText.textContent = t('wa.balances.empty');
    if (empty) empty.style.display = 'block';
    return;
  }
  const query = balanceRecipientsSearchQuery;
  const visibleRows = rows
    .map((row, idx) => ({ row, idx }))
    .filter(({ row }) => {
      if (!query) return true;
      const haystack = [
        row.type,
        getBalancePartyTypeLabel(row.type),
        row.name,
        row.accountCode,
        row.phone,
        row.group,
      ].map(v => String(v || '').toLowerCase()).join(' ');
      return haystack.includes(query);
    });
  if (!visibleRows.length) {
    if (emptyText) emptyText.textContent = t('wa.balances.noRecipientMatches');
    if (empty) empty.style.display = 'block';
    return;
  }
  if (empty) empty.style.display = 'none';
  visibleRows.forEach(({ row: r, idx }) => {
    const useGlobal = r.useGlobalSchedule !== false;
    const recipientSchedule = r.schedule && typeof r.schedule === 'object' ? r.schedule : { type: 'daily', intervalValue: 24, intervalUnit: 'hours', dailyTime: '08:00' };
    const effectiveSchedule = useGlobal ? waSettings.balances.schedule : recipientSchedule;
    const nextRunTs = Number(r.nextRunAt || 0) || computeNextRunAtFromSchedule(effectiveSchedule, Date.now(), '08:00', 24);
    const nextRunLabel = r.enabled === false
      ? 'معطل'
      : (!(r.phone || r.group) ? 'بدون مستلم' : formatDateTime(nextRunTs));
    const typeLabel = getBalancePartyTypeLabel(r.type);
    const icon = r.type === 'supplier' ? 'fa-truck-field' : (r.type === 'account' ? 'fa-building-columns' : 'fa-user-tie');
    const displayCode = getBalanceRecipientDisplayCode(r);
    const div = document.createElement('div');
    div.className = 'balance-recipient-card' + (r.enabled === false ? ' is-disabled' : '');
    const typeBadgeClass = r.type === 'supplier' ? 'type-supplier' : (r.type === 'account' ? 'type-account' : 'type-customer');
    const lastStatus = String(r.lastStatus || '').toLowerCase();
    const statusInfo = lastStatus === 'sent'
      ? { cls: 'status-ok', icon: 'fa-circle-check', label: (() => { const s = sanitizeWaLastSent(r.lastSent); return s ? `أُرسل: ${s}` : 'مُرسَل'; })() }
      : lastStatus === 'failed'
        ? { cls: 'status-fail', icon: 'fa-circle-xmark', label: 'فشل آخر إرسال' }
        : { cls: 'status-idle', icon: 'fa-clock', label: 'لم يُرسل بعد' };
    const hasTarget = !!(r.phone || r.group);
    const countdownTs = (r.enabled !== false && hasTarget) ? nextRunTs : 0;
    div.innerHTML = `
      <div class="balance-recipient-main">
        <div class="balance-recipient-icon"><i class="fa-solid ${icon}"></i></div>
        <div class="balance-recipient-info">
          <div class="balance-recipient-name">
            <span>${escHtml(r.name || displayCode || '—')}</span>
            <span class="recipient-type-badge ${typeBadgeClass}">${escHtml(typeLabel)}</span>
            ${displayCode ? `<span class="recipient-code-badge">#${escHtml(displayCode)}</span>` : ''}
          </div>
          <div class="balance-recipient-meta">
            <span class="recipient-status-pill ${statusInfo.cls}"><i class="fa-solid ${statusInfo.icon}"></i> ${escHtml(statusInfo.label)}</span>
            <span class="recipient-countdown-pill" data-next-ts="${countdownTs}" data-next-label="${escHtml(nextRunLabel)}">
              <i class="fa-solid fa-hourglass-half"></i>
              <span class="recipient-countdown-label">القادم:</span>
              <strong class="recipient-countdown-value">${escHtml(nextRunLabel)}</strong>
            </span>
          </div>
        </div>
        <label class="balance-inline-field">
          <span>${escHtml(t('wa.balances.phoneLabel'))}</span>
          <input type="text" class="recipient-input balance-target-input" data-balance-phone="${idx}" value="${escHtml(r.phone || '')}" placeholder="966501234567" dir="ltr">
        </label>
        <label class="balance-inline-field">
          <span>${escHtml(t('wa.balances.groupLabel'))}</span>
          <input type="text" class="recipient-input balance-target-input" data-balance-group="${idx}" value="${escHtml(r.group || '')}" placeholder="${escHtml(t('wa.balances.groupPlaceholder'))}">
        </label>
        <label class="toggle-switch balance-row-toggle">
          <input type="checkbox" data-balance-enabled="${idx}" ${r.enabled !== false ? 'checked' : ''}>
          <span class="toggle-slider"></span>
        </label>
        <button class="btn-send-item" data-balance-send-now="${idx}" title="إرسال الآن لهذا المستلم فقط"><i class="fa-solid fa-paper-plane"></i></button>
        <button class="btn-remove-item" data-balance-remove="${idx}" title="${escHtml(t('wa.msg.delete'))}"><i class="fa-solid fa-trash-can"></i></button>
      </div>
      <div class="balance-recipient-schedule">
        <div class="balance-schedule-grid">
          <label class="balance-inline-field">
            <span>التوقيت</span>
            <select class="recipient-input" data-balance-use-global="${idx}">
              <option value="global" ${useGlobal ? 'selected' : ''}>عام</option>
              <option value="custom" ${useGlobal ? '' : 'selected'}>خاص</option>
            </select>
          </label>
          <label class="balance-inline-field">
            <span>نوع الخاص</span>
            <select class="recipient-input" data-balance-sched-type="${idx}" ${useGlobal ? 'disabled' : ''}>
              <option value="interval" ${recipientSchedule.type === 'interval' ? 'selected' : ''}>كل فترة</option>
              <option value="daily" ${recipientSchedule.type === 'daily' ? 'selected' : ''}>يومي</option>
            </select>
          </label>
          <label class="balance-inline-field">
            <span>فاصل الخاص</span>
            <div class="interval-control">
              <input type="number" min="1" max="168" class="interval-input" data-balance-sched-interval="${idx}" value="${Number(recipientSchedule.intervalValue || 24)}" ${useGlobal || recipientSchedule.type !== 'interval' ? 'disabled' : ''}>
              <select class="unit-select" data-balance-sched-unit="${idx}" ${useGlobal || recipientSchedule.type !== 'interval' ? 'disabled' : ''}>
                <option value="minutes" ${recipientSchedule.intervalUnit === 'minutes' ? 'selected' : ''}>دقيقة</option>
                <option value="hours" ${recipientSchedule.intervalUnit === 'hours' ? 'selected' : ''}>ساعة</option>
              </select>
            </div>
          </label>
          <label class="balance-inline-field">
            <span>وقت الخاص</span>
            <input type="time" class="recipient-input" data-balance-sched-time="${idx}" value="${escHtml(recipientSchedule.dailyTime || '08:00')}" ${useGlobal || recipientSchedule.type !== 'daily' ? 'disabled' : ''}>
          </label>
        </div>
      </div>
    `;
    list.appendChild(div);
  });

  list.querySelectorAll('[data-balance-enabled]').forEach(el => {
    el.addEventListener('change', () => {
      const idx = Number(el.dataset.balanceEnabled);
      if (waSettings.balances.recipients[idx]) {
        waSettings.balances.recipients[idx].enabled = !!el.checked;
      }
      // Live UI refresh: card visual state + counters in hero & status bar
      const card = el.closest('.balance-recipient-card');
      if (card) card.classList.toggle('is-disabled', !el.checked);
      try { updateWaHeroStats(); } catch (_) {}
      try { updateBalancesSummaryBar(); } catch (_) {}
      saveSettings(true);
    });
  });
  list.querySelectorAll('[data-balance-phone]').forEach(el => {
    el.addEventListener('input', () => {
      const idx = Number(el.dataset.balancePhone);
      if (waSettings.balances.recipients[idx]) waSettings.balances.recipients[idx].phone = el.value.trim().replace(/^\+/, '').replace(/\s+/g, '');
    });
    el.addEventListener('change', () => saveSettings(true));
  });
  list.querySelectorAll('[data-balance-use-global]').forEach(el => {
    el.addEventListener('change', () => {
      const idx = Number(el.dataset.balanceUseGlobal);
      const row = waSettings.balances.recipients[idx];
      if (!row) return;
      row.useGlobalSchedule = el.value !== 'custom';
      row.nextRunAt = null;
      refreshBalanceCardDynamics(el.closest('.balance-recipient-card'), row);
      saveSettings(true);
    });
  });
  list.querySelectorAll('[data-balance-sched-type]').forEach(el => {
    el.addEventListener('change', () => {
      const idx = Number(el.dataset.balanceSchedType);
      const row = waSettings.balances.recipients[idx];
      if (!row) return;
      if (!row.schedule || typeof row.schedule !== 'object') row.schedule = { type: 'daily', intervalValue: 24, intervalUnit: 'hours', dailyTime: '08:00' };
      row.schedule.type = el.value === 'daily' ? 'daily' : 'interval';
      row.nextRunAt = null;
      refreshBalanceCardDynamics(el.closest('.balance-recipient-card'), row);
      saveSettings(true);
    });
  });
  list.querySelectorAll('[data-balance-sched-interval]').forEach(el => {
    el.addEventListener('change', () => {
      const idx = Number(el.dataset.balanceSchedInterval);
      const row = waSettings.balances.recipients[idx];
      if (!row) return;
      if (!row.schedule || typeof row.schedule !== 'object') row.schedule = { type: 'daily', intervalValue: 24, intervalUnit: 'hours', dailyTime: '08:00' };
      row.schedule.intervalValue = Math.max(1, Math.min(168, Number.parseInt(el.value, 10) || 24));
      row.nextRunAt = null;
      refreshBalanceCardDynamics(el.closest('.balance-recipient-card'), row);
      saveSettings(true);
    });
  });
  list.querySelectorAll('[data-balance-sched-unit]').forEach(el => {
    el.addEventListener('change', () => {
      const idx = Number(el.dataset.balanceSchedUnit);
      const row = waSettings.balances.recipients[idx];
      if (!row) return;
      if (!row.schedule || typeof row.schedule !== 'object') row.schedule = { type: 'daily', intervalValue: 24, intervalUnit: 'hours', dailyTime: '08:00' };
      row.schedule.intervalUnit = el.value === 'minutes' ? 'minutes' : 'hours';
      row.nextRunAt = null;
      refreshBalanceCardDynamics(el.closest('.balance-recipient-card'), row);
      saveSettings(true);
    });
  });
  list.querySelectorAll('[data-balance-sched-time]').forEach(el => {
    el.addEventListener('change', () => {
      const idx = Number(el.dataset.balanceSchedTime);
      const row = waSettings.balances.recipients[idx];
      if (!row) return;
      if (!row.schedule || typeof row.schedule !== 'object') row.schedule = { type: 'daily', intervalValue: 24, intervalUnit: 'hours', dailyTime: '08:00' };
      row.schedule.dailyTime = /^\d{2}:\d{2}$/.test(String(el.value || '')) ? String(el.value) : '08:00';
      row.nextRunAt = null;
      refreshBalanceCardDynamics(el.closest('.balance-recipient-card'), row);
      saveSettings(true);
    });
  });
  list.querySelectorAll('[data-balance-group]').forEach(el => {
    el.addEventListener('input', () => {
      const idx = Number(el.dataset.balanceGroup);
      if (waSettings.balances.recipients[idx]) waSettings.balances.recipients[idx].group = el.value.trim();
    });
    el.addEventListener('change', () => saveSettings(true));
  });
  list.querySelectorAll('[data-balance-send-now]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const idx = Number(btn.dataset.balanceSendNow);
      const row = waSettings.balances.recipients[idx];
      if (!row) return;
      await sendBalanceForSingleRecipient(row, btn);
    });
  });
  list.querySelectorAll('[data-balance-remove]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.balanceRemove);
      waSettings.balances.recipients.splice(idx, 1);
      renderBalanceRecipients();
      saveSettings(true);
    });
  });

  try { updateBalancesSummaryBar(); } catch (_) {}
  try { tickRecipientCountdowns(); } catch (_) {}
  try { updateWaHeroStats(); } catch (_) {}
}

async function sendBalancesNow() {
  if (!waCheckPerm('whatsapp_reports_send', t('wa.perm.send'))) return;
  const active = waSettings.balances.recipients.filter(r => r.enabled !== false && (r.phone || r.group));
  if (!active.length) {
    showToast(t('wa.msg.addBalanceRecipientFirst'), 'warning');
    return;
  }
  if (waStatus !== 'connected') {
    showToast(t('wa.msg.connectFirst'), 'warning');
    return;
  }
  const btn = document.getElementById('btnSendBalancesNow');
  btn.disabled = true;
  btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> ${escHtml(t('wa.schedule.sending'))}`;
  try {
    const result = await window.api.invoke('wa:send-balances-now', { balances: waSettings.balances });
    if (result?.success) {
      const now = formatDateTime(Date.now());
      waSettings.balances.lastSent = now;
      const el = document.getElementById('balancesLastSendText');
      if (el) el.textContent = now;
      await loadSettings();
      showToast(`${t('wa.msg.balancesSent', { count: result.sent || 0 })}${result.errors?.length ? t('wa.msg.withSomeErrors') : ''}`, result.sent > 0 ? 'success' : 'warning');
    } else {
      showToast(t('wa.msg.sendFailed', { error: result?.error || t('wa.status.error') }), 'error');
    }
  } catch (e) {
    showToast(t('wa.msg.sendError', { error: e.message }), 'error');
  }
  btn.disabled = false;
  btn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> ${escHtml(t('wa.balances.btnSendNow'))}`;
}

// إرسال رصيد لمستلم واحد فقط من زر السطر
async function sendBalanceForSingleRecipient(row, btn) {
  if (!waCheckPerm('whatsapp_reports_send', t('wa.perm.send'))) return;
  if (!row) return;
  if (row.enabled === false) {
    showToast('هذا المستلم معطل — فعّله أولاً', 'warning');
    return;
  }
  if (!row.phone && !row.group) {
    showToast('لا يوجد رقم واتساب أو مجموعة لهذا المستلم', 'warning');
    return;
  }
  if (waStatus !== 'connected') {
    showToast(t('wa.msg.connectFirst'), 'warning');
    return;
  }

  const type = ['customer', 'supplier', 'account'].includes(row.type) ? row.type : 'customer';
  const id = Number.parseInt(row.id, 10) || 0;
  const recipientKey = `${type}:${id}`;

  const originalHtml = btn ? btn.innerHTML : '';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
  }
  try {
    const result = await window.api.invoke('wa:send-balances-now', {
      balances: waSettings.balances,
      recipientKeys: [recipientKey],
    });
    if (result?.success) {
      const targetName = row.name || row.accountCode || row.phone || 'المستلم';
      showToast(`تم إرسال رصيد «${targetName}» (${result.sent || 0})${result.errors?.length ? ' مع بعض الأخطاء' : ''}`, result.sent > 0 ? 'success' : 'warning');
      await loadSettings();
    } else {
      showToast(t('wa.msg.sendFailed', { error: result?.error || t('wa.status.error') }), 'error');
    }
  } catch (e) {
    showToast(t('wa.msg.sendError', { error: e.message }), 'error');
  }
  if (btn) {
    btn.disabled = false;
    btn.innerHTML = originalHtml || '<i class="fa-solid fa-paper-plane"></i>';
  }
}

// ===== Settings Persistence =====
async function loadSettings() {
  try {
    const result = await window.api.invoke('wa:get-settings');
    if (result?.settings) {
      const s = result.settings;
      if (s.txNotify && typeof s.txNotify === 'object') {
        waSettings.txNotify.enabled = !!s.txNotify.enabled;
        waSettings.txNotify.phones = Array.isArray(s.txNotify.phones) ? s.txNotify.phones : [];
        waSettings.txNotify.groups = Array.isArray(s.txNotify.groups) ? s.txNotify.groups : [];
        waSettings.txNotify.events = {
          salesInvoice: s.txNotify.events?.salesInvoice !== false,
          purchaseInvoice: s.txNotify.events?.purchaseInvoice !== false,
          receipt: s.txNotify.events?.receipt !== false,
          voucher: s.txNotify.events?.voucher !== false,
          journal: s.txNotify.events?.journal !== false,
        };
      }
      if (s.promo && typeof s.promo === 'object') {
        waSettings.promo.enabled  = !!s.promo.enabled;
        waSettings.promo.message  = String(s.promo.message || '');
        waSettings.promo.phones   = Array.isArray(s.promo.phones) ? s.promo.phones : [];
        waSettings.promo.groups   = Array.isArray(s.promo.groups) ? s.promo.groups : [];
        waSettings.promo.lastSent = s.promo.lastSent || null;
        if (s.promo.schedule && typeof s.promo.schedule === 'object') {
          Object.assign(waSettings.promo.schedule, s.promo.schedule);
        }
      }
      if (s.balances && typeof s.balances === 'object') {
        waSettings.balances.enabled = !!s.balances.enabled;
        waSettings.balances.ignoreZero = s.balances.ignoreZero !== false;
        waSettings.balances.recipients = Array.isArray(s.balances.recipients) ? s.balances.recipients.map(normalizeBalanceRecipientScheduleClient) : [];
        waSettings.balances.lastSent = s.balances.lastSent || null;
        if (s.balances.schedule && typeof s.balances.schedule === 'object') {
          Object.assign(waSettings.balances.schedule, s.balances.schedule);
        }
      }
    }
  } catch (_) {}

  // Apply to UI
  applySettingsToUI();
}

function applySettingsToUI() {
  document.getElementById('txNotifyEnabled').checked = !!waSettings.txNotify.enabled;
  document.getElementById('txEvtSalesInvoice').checked = waSettings.txNotify.events.salesInvoice !== false;
  document.getElementById('txEvtPurchaseInvoice').checked = waSettings.txNotify.events.purchaseInvoice !== false;
  document.getElementById('txEvtReceipt').checked = waSettings.txNotify.events.receipt !== false;
  document.getElementById('txEvtVoucher').checked = waSettings.txNotify.events.voucher !== false;
  document.getElementById('txEvtJournal').checked = waSettings.txNotify.events.journal !== false;
  renderTxPhones();
  renderTxGroups();

  // Promo
  const p = waSettings.promo;
  const promoMsgEl = document.getElementById('promoMessage');
  if (promoMsgEl) {
    promoMsgEl.value = p.message || '';
    const cc = document.getElementById('promoCharCount');
    if (cc) cc.textContent = promoMsgEl.value.length;
    try { updatePromoBubble(); } catch (_) {}
  }
  const promoEnabledEl = document.getElementById('promoEnabled');
  if (promoEnabledEl) promoEnabledEl.checked = !!p.enabled;
  const promoSchedTypeEl = document.getElementById('promoScheduleType');
  if (promoSchedTypeEl) promoSchedTypeEl.value = p.schedule.type;
  document.getElementById('promoIntervalValue').value = p.schedule.intervalValue;
  document.getElementById('promoIntervalUnit').value  = p.schedule.intervalUnit;
  document.getElementById('promoDailyTime').value     = p.schedule.dailyTime;
  document.getElementById('promoIntervalSettings').style.display = p.schedule.type === 'interval' ? 'block' : 'none';
  document.getElementById('promoDailySettings').style.display   = p.schedule.type === 'daily'    ? 'block' : 'none';
  {
    const clean = sanitizeWaLastSent(p.lastSent);
    if (clean) {
      const el = document.getElementById('promoLastSendText');
      if (el) el.textContent = clean;
    }
  }
  renderPromoPhones();
  renderPromoGroups();

  const b = waSettings.balances;
  const balancesEnabledEl = document.getElementById('balancesEnabled');
  if (balancesEnabledEl) balancesEnabledEl.checked = !!b.enabled;
  const balancesIgnoreZeroEl = document.getElementById('balancesIgnoreZero');
  if (balancesIgnoreZeroEl) balancesIgnoreZeroEl.checked = b.ignoreZero !== false;
  const balancesScheduleTypeEl = document.getElementById('balancesScheduleType');
  if (balancesScheduleTypeEl) balancesScheduleTypeEl.value = b.schedule.type;
  document.getElementById('balancesIntervalValue').value = b.schedule.intervalValue;
  document.getElementById('balancesIntervalUnit').value = b.schedule.intervalUnit;
  document.getElementById('balancesDailyTime').value = b.schedule.dailyTime;
  document.getElementById('balancesIntervalSettings').style.display = b.schedule.type === 'interval' ? 'block' : 'none';
  document.getElementById('balancesDailySettings').style.display = b.schedule.type === 'daily' ? 'block' : 'none';
  updateBalancesNextSendPreview();
  {
    const clean = sanitizeWaLastSent(b.lastSent);
    if (clean) {
      const el = document.getElementById('balancesLastSendText');
      if (el) el.textContent = clean;
    }
  }
  renderBalanceRecipients();
}

async function saveSettings(silent = false) {
  // التحقق من صلاحية التعديل — وإعادة الواجهة للحالة المحفوظة إن لم تتوفر
  if (!waHasPerm('whatsapp_reports_edit')) {
    waCheckPerm('whatsapp_reports_edit', t('wa.perm.edit'));
    await loadSettings();
    return;
  }

  // Read current UI values
  waSettings.txNotify.enabled = !!document.getElementById('txNotifyEnabled')?.checked;
  waSettings.txNotify.events.salesInvoice = !!document.getElementById('txEvtSalesInvoice')?.checked;
  waSettings.txNotify.events.purchaseInvoice = !!document.getElementById('txEvtPurchaseInvoice')?.checked;
  waSettings.txNotify.events.receipt = !!document.getElementById('txEvtReceipt')?.checked;
  waSettings.txNotify.events.voucher = !!document.getElementById('txEvtVoucher')?.checked;
  waSettings.txNotify.events.journal = !!document.getElementById('txEvtJournal')?.checked;
  waSettings.promo.enabled  = !!document.getElementById('promoEnabled')?.checked;
  waSettings.promo.message  = document.getElementById('promoMessage')?.value || '';
  waSettings.promo.schedule.type          = document.getElementById('promoScheduleType')?.value || 'interval';
  waSettings.promo.schedule.intervalValue = parseInt(document.getElementById('promoIntervalValue')?.value) || 24;
  waSettings.promo.schedule.intervalUnit  = document.getElementById('promoIntervalUnit')?.value || 'hours';
  waSettings.promo.schedule.dailyTime     = document.getElementById('promoDailyTime')?.value || '09:00';
  waSettings.balances.enabled = !!document.getElementById('balancesEnabled')?.checked;
  waSettings.balances.ignoreZero = !!document.getElementById('balancesIgnoreZero')?.checked;
  waSettings.balances.schedule.type = document.getElementById('balancesScheduleType')?.value || 'daily';
  waSettings.balances.schedule.intervalValue = parseInt(document.getElementById('balancesIntervalValue')?.value) || 24;
  waSettings.balances.schedule.intervalUnit = document.getElementById('balancesIntervalUnit')?.value || 'hours';
  waSettings.balances.schedule.dailyTime = document.getElementById('balancesDailyTime')?.value || '08:00';

  try {
    await window.api.invoke('wa:save-settings', { settings: waSettings });
    if (!silent) showToast(t('wa.msg.settingsSaved'), 'success');
  } catch (e) {
    if (!silent) showToast(t('wa.msg.settingsSaveFailed'), 'error');
  }
}

// ===== Confirm Modal =====
function showConfirm(title, message) {
  return new Promise(resolve => {
    const overlay = document.getElementById('confirmOverlay');
    document.getElementById('confirmTitle').textContent = title;
    document.getElementById('confirmMessage').textContent = message;
    overlay.classList.add('show');

    const ok = document.getElementById('btnConfirmOk');
    const cancel = document.getElementById('btnConfirmCancel');

    const cleanup = () => {
      overlay.classList.remove('show');
      ok.removeEventListener('click', onOk);
      cancel.removeEventListener('click', onCancel);
    };

    const onOk = () => { cleanup(); resolve(true); };
    const onCancel = () => { cleanup(); resolve(false); };

    ok.addEventListener('click', onOk);
    cancel.addEventListener('click', onCancel);
  });
}

// ===== Toast =====
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const icons = { success: 'fa-circle-check', error: 'fa-circle-xmark', info: 'fa-circle-info', warning: 'fa-triangle-exclamation' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fa-solid ${icons[type] || 'fa-circle-info'} ${type}"></i> ${escHtml(message)}`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function refreshTranslatedUI() {
  if (waStatusLabelKey) {
    setStatusBadge(waStatus, waStatusLabelKey, waStatusLabelParams, true);
  }
  setTabsEnabled(waStatus === 'connected');
  renderTxPhones();
  renderTxGroups();
  renderPromoPhones();
  renderPromoGroups();
  renderBalanceRecipients();
}

// ===== Helpers =====
function escHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

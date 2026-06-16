// ===== Language handling for main shell =====
const MAIN_LANG_KEY = 'uiLang';
const CURRENT_BRANCH_SCOPE_KEY = 'branchScope';
const ORDERS_NOTIF_STORAGE_KEY = 'ordersCompletedUnreadCount';
const DAILY_OPS_UNREAD_STORAGE_KEY = 'dailyOpsUnreadByTypeV1';
const DAILY_OPS_KNOWN_IDS_STORAGE_KEY = 'dailyOpsKnownIdsByTypeV1';
const DAILY_OPS_KNOWN_EVENT_IDS_STORAGE_KEY = 'dailyOpsKnownCloudEventIdsV1';
const DAILY_OPS_BOOTSTRAP_STORAGE_KEY = 'dailyOpsNotifBootstrapV1';
const CLOUD_USERS_REFRESH_MS = 15000;
const MESSAGES_HUB_REFRESH_MS = 12000;

const SHELL_DEBUG_LOGS_ENABLED = false;

function shellLog(...args) {
  if (SHELL_DEBUG_LOGS_ENABLED) {
    console.log(...args);
  }
}

function shellWarn(...args) {
  if (SHELL_DEBUG_LOGS_ENABLED) {
    console.warn(...args);
  }
}

let cloudUsersRefreshIntervalId = null;

let cloudPresenceModalState = {
  connected: false,
  activeMode: false,
  activeUsers: 0,
  sessions: [],
  snapshotAt: null,
  deviceId: null,
  error: null,
};

let cloudPresenceModalLoading = false;

function getCloudPresenceMessageTargetUserId(session) {
  const targetUserId = Number(session?.user_id || 0);
  const currentUserId = Number(getStoredCurrentUser()?.id || 0);
  if (!Number.isFinite(targetUserId) || targetUserId <= 0) {
    return null;
  }
  if (Number.isFinite(currentUserId) && currentUserId > 0 && currentUserId === targetUserId) {
    return null;
  }
  return targetUserId;
}

function getCloudPresenceMessageActionMarkup(session) {
  const targetUserId = getCloudPresenceMessageTargetUserId(session);
  if (!targetUserId) {
    return '';
  }
  return `<button type="button" class="cloud-presence-message-btn" data-cloud-presence-message-user="${targetUserId}">${escapeHtml(getCloudPresenceModalText('مراسلة', 'Message'))}</button>`;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getCloudPresenceModalText(arText, enText) {
  return getCurrentMainLang() === 'en' ? enText : arText;
}

function getCurrentBranchDisplayText() {
  const branch = getStoredCurrentBranch();
  const isEn = getCurrentMainLang() === 'en';
  const code = String(branch?.code || '').trim();
  const name = String(isEn ? branch?.name_en || branch?.name || '' : branch?.name || branch?.name_en || '').trim();
  if (code && name) return `${code} · ${name}`;
  if (name) return name;
  if (code) return code;
  return isEn ? 'No branch selected' : 'لا يوجد فرع محدد';
}

function isCloudPresenceModalOpen() {
  const modal = document.getElementById('cloudPresenceModal');
  return modal?.getAttribute('aria-hidden') === 'false';
}

function resetCloudPresenceListScroll() {
  const listWrap = document.querySelector('#cloudPresenceModal .cloud-presence-list-wrap');
  if (listWrap) {
    listWrap.scrollTop = 0;
  }
}

function resetCloudPresenceModalScroll() {
  const dialog = document.querySelector('#cloudPresenceModal .cloud-presence-dialog');
  const modal = document.getElementById('cloudPresenceModal');
  if (dialog) {
    dialog.scrollTop = 0;
  }
  if (modal) {
    modal.scrollTop = 0;
  }
  resetCloudPresenceListScroll();
}

function updateCloudPresenceState(result = {}) {
  const sessions = Array.isArray(result?.sessions) ? result.sessions : [];
  cloudPresenceModalState = {
    success: result?.success !== false,
    connected: Boolean(result?.connected),
    activeMode: Boolean(result?.activeMode),
    activeUsers: Math.max(0, Number(result?.activeUsers || 0) || 0),
    sessions,
    snapshotAt: result?.snapshotAt || null,
    deviceId: result?.deviceId ? String(result.deviceId).trim() : (cloudPresenceModalState.deviceId || null),
    error: result?.error ? String(result.error) : null,
  };
  return cloudPresenceModalState;
}

function getCloudPresenceSessionKey(session) {
  const userId = Number(session?.user_id || 0);
  const deviceId = String(session?.device_id || '').trim();
  if (userId > 0) return `u:${userId}`;
  if (deviceId) return `d:${deviceId}`;
  return '';
}

function isCurrentCloudPresenceSession(session) {
  const currentDevice = String(cloudPresenceModalState.deviceId || currentDeviceId || '').trim();
  const sessionDevice = String(session?.device_id || '').trim();
  if (!currentDevice || !sessionDevice) return false;
  return currentDevice === sessionDevice;
}

function getCloudPresenceName(session) {
  const isEn = getCurrentMainLang() === 'en';
  if (isCurrentCloudPresenceSession(session)) {
    return getCloudPresenceModalText('أنت', 'You');
  }
  const fullName = String(session?.full_name || '').trim();
  const username = String(session?.username || '').trim();
  if (isEn) {
    if (username) return username;
    if (fullName) return fullName;
  } else {
    if (fullName) return fullName;
    if (username) return username;
  }
  return getCloudPresenceModalText('مستخدم غير معروف', 'Unknown user');
}

function getCloudPresenceUsernameHint(session) {
  if (isCurrentCloudPresenceSession(session)) {
    return getCloudPresenceModalText('جلستك الحالية', 'Your current session');
  }
  const isEn = getCurrentMainLang() === 'en';
  const fullName = String(session?.full_name || '').trim();
  const username = String(session?.username || '').trim();
  if (isEn && fullName && fullName !== username) {
    return fullName;
  }
  return '';
}

function getCloudPresenceBranchText(session) {
  const isEn = getCurrentMainLang() === 'en';
  const branchCode = String(session?.branch_code || '').trim();
  const branchName = String(isEn ? session?.branch_name_en || session?.branch_name || '' : session?.branch_name || session?.branch_name_en || '').trim();
  if (branchCode && branchName) return `${branchCode} · ${branchName}`;
  if (branchName) return branchName;
  if (branchCode) return branchCode;
  if (isCurrentCloudPresenceSession(session)) return getCurrentBranchDisplayText();
  return isEn ? 'No branch specified' : 'لم يتم تحديد الفرع';
}

function formatCloudPresenceTime(value) {
  if (!value) return 'Now';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return String(value);
  }
  return date.toLocaleString('en-GB-u-nu-latn', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

function getCloudPresenceAvatarIcon(session) {
  return isCurrentCloudPresenceSession(session) ? 'fa-user-check' : 'fa-user';
}

function setCloudPresenceModalLoading(isLoading) {
  cloudPresenceModalLoading = Boolean(isLoading);
  const loadingEl = document.getElementById('cloudPresenceLoading');
  if (loadingEl) {
    loadingEl.hidden = !cloudPresenceModalLoading;
  }
}

function renderCloudPresenceModal() {
  const modal = document.getElementById('cloudPresenceModal');
  const titleEl = document.getElementById('cloudPresenceModalTitle');
  const subtitleEl = document.getElementById('cloudPresenceModalSubtitle');
  const totalEl = document.getElementById('cloudPresenceTotalValue');
  const branchEl = document.getElementById('cloudPresenceBranchValue');
  const updatedEl = document.getElementById('cloudPresenceUpdatedValue');
  const listEl = document.getElementById('cloudPresenceList');
  const emptyEl = document.getElementById('cloudPresenceEmpty');
  const loadingEl = document.getElementById('cloudPresenceLoading');
  resetCloudPresenceModalScroll();
  if (!modal || !titleEl || !subtitleEl || !totalEl || !branchEl || !updatedEl || !listEl || !emptyEl || !loadingEl) {
    return;
  }

  const isEn = getCurrentMainLang() === 'en';
  const sessions = Array.isArray(cloudPresenceModalState.sessions) ? [...cloudPresenceModalState.sessions] : [];
  sessions.sort((a, b) => {
    const currentDiff = Number(isCurrentCloudPresenceSession(b)) - Number(isCurrentCloudPresenceSession(a));
    if (currentDiff !== 0) return currentDiff;
    const aTime = Date.parse(a?.last_seen_at || a?.updated_at || a?.connected_at || '') || 0;
    const bTime = Date.parse(b?.last_seen_at || b?.updated_at || b?.connected_at || '') || 0;
    return bTime - aTime;
  });

  titleEl.textContent = getCloudPresenceModalText('المتصلون بالنظام', 'Connected users');
  subtitleEl.textContent = getCloudPresenceModalText(
    'تعرف على من يعمل الآن وأي فرع مرتبط بكل مستخدم.',
    'See who is online now and which branch each user is using.'
  );
  totalEl.textContent = String(Math.max(0, Number(cloudPresenceModalState.activeUsers || sessions.length || 0) || 0));
  const currentSession = sessions.find((session) => isCurrentCloudPresenceSession(session)) || null;
  branchEl.textContent = currentSession ? getCloudPresenceBranchText(currentSession) : getCurrentBranchDisplayText();
  updatedEl.textContent = formatCloudPresenceTime(cloudPresenceModalState.snapshotAt);

  if (cloudPresenceModalLoading) {
    loadingEl.hidden = false;
    emptyEl.hidden = true;
    listEl.innerHTML = '';
    return;
  }

  loadingEl.hidden = true;
  const hasEntries = sessions.length > 0;
  emptyEl.hidden = hasEntries;
  listEl.hidden = !hasEntries;
  emptyEl.style.display = hasEntries ? 'none' : 'grid';
  listEl.style.display = hasEntries ? 'grid' : 'none';

  if (!hasEntries) {
    emptyEl.innerHTML = `
      <i class="fa-solid fa-users-slash"></i>
      <strong>${escapeHtml(getCloudPresenceModalText('لا يوجد متصلون الآن', 'No active users right now'))}</strong>
      <span>${escapeHtml(getCloudPresenceModalText('سيظهر هنا كل مستخدم متصل مع فرعه عند توفر بيانات السحابة.', 'Connected users and their branches will appear here once cloud data is available.'))}</span>
    `;
    listEl.innerHTML = '';
    resetCloudPresenceListScroll();
    return;
  }

  listEl.innerHTML = sessions.map((session) => {
    const isCurrent = isCurrentCloudPresenceSession(session);
    const displayName = getCloudPresenceName(session);
    const usernameHint = getCloudPresenceUsernameHint(session);
    const branchText = getCloudPresenceBranchText(session);
    const avatarIcon = getCloudPresenceAvatarIcon(session);
    const statusBadgeText = isCurrent ? getCloudPresenceModalText('أنت', 'You') : getCloudPresenceModalText('متصل الآن', 'Online now');
    const statusBadgeClass = isCurrent ? 'cloud-presence-chip current' : 'cloud-presence-chip online';
    const statusBadgeDot = isCurrent ? '' : '<span class="cloud-presence-chip-dot" aria-hidden="true"></span>';
    const branchLabel = isCurrent ? getCloudPresenceModalText('فرعك', 'Your branch') : getCloudPresenceModalText('الفرع', 'Branch');
    const timeText = formatCloudPresenceTime(session?.updated_at || session?.last_seen_at || session?.connected_at || null);
    const messageActionMarkup = getCloudPresenceMessageActionMarkup(session);
    return `
      <article class="cloud-presence-item${isCurrent ? ' current' : ''}">
        <div class="cloud-presence-avatar${isCurrent ? ' current' : ''}">
          <i class="fa-solid ${avatarIcon}"></i>
        </div>
        <div class="cloud-presence-info">
          <div class="cloud-presence-name-row">
            <div class="cloud-presence-name-group">
              <div class="cloud-presence-name">${escapeHtml(displayName)}</div>
              ${usernameHint ? `<div class="cloud-presence-username">${escapeHtml(usernameHint)}</div>` : ''}
            </div>
          </div>
          <div class="cloud-presence-branch">
            <i class="fa-solid fa-code-branch"></i>
            <span>${escapeHtml(branchLabel)}: ${escapeHtml(branchText)}</span>
          </div>
          ${messageActionMarkup ? `<div class="cloud-presence-actions">${messageActionMarkup}</div>` : ''}
        </div>
        <div class="cloud-presence-meta-side">
          <span class="${statusBadgeClass}">${statusBadgeDot}<span class="cloud-presence-chip-text">${escapeHtml(statusBadgeText)}</span></span>
          <span class="cloud-presence-time">${escapeHtml(timeText)}</span>
        </div>
      </article>
    `;
  }).join('');
  resetCloudPresenceListScroll();
}

async function loadCloudPresenceState({ updateIndicator = true, includeSessions = true } = {}) {
  try {
    const api = window.api || window.cloudDatabase;
    if (!api?.getCloudPresenceStatus) {
      updateCloudPresenceState({ success: false, connected: false, activeMode: false, activeUsers: 0, sessions: [], snapshotAt: null, error: null });
      if (updateIndicator) {
        setCloudUsersIndicatorState(0, false);
      }
      return null;
    }

    const result = await api.getCloudPresenceStatus({
      ...getCloudPresencePayload(),
      summaryOnly: includeSessions !== true,
    });
    const state = updateCloudPresenceState(includeSessions
      ? (result || {})
      : {
          ...(result || {}),
          sessions: Array.isArray(cloudPresenceModalState.sessions) ? cloudPresenceModalState.sessions : [],
        });
    if (updateIndicator) {
      if (state.connected && state.activeMode) {
        setCloudUsersIndicatorState(state.activeUsers || state.sessions.length || 0, true);
      } else {
        setCloudUsersIndicatorState(0, false);
      }
    }
    if (includeSessions && isCloudPresenceModalOpen()) {
      renderCloudPresenceModal();
    }
    return state;
  } catch (error) {
    updateCloudPresenceState({
      success: false,
      connected: false,
      activeMode: false,
      activeUsers: 0,
      sessions: includeSessions ? [] : (Array.isArray(cloudPresenceModalState.sessions) ? cloudPresenceModalState.sessions : []),
      snapshotAt: null,
      error: error?.message || 'Cloud presence failed'
    });
    if (updateIndicator) {
      setCloudUsersIndicatorState(0, false);
    }
    if (includeSessions && isCloudPresenceModalOpen()) {
      renderCloudPresenceModal();
    }
    return null;
  }
}

async function openCloudPresenceModal() {
  const modal = document.getElementById('cloudPresenceModal');
  const indicator = document.getElementById('cloudUsersIndicator');
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'false');
  if (indicator) indicator.setAttribute('aria-expanded', 'true');
  resetCloudPresenceModalScroll();
  setCloudPresenceModalLoading(true);
  renderCloudPresenceModal();
  await loadCloudPresenceState({ updateIndicator: true, includeSessions: true });
  setCloudPresenceModalLoading(false);
  resetCloudPresenceModalScroll();
  renderCloudPresenceModal();
  startCloudUsersRefresh({ immediate: false });
}

function closeCloudPresenceModal() {
  const modal = document.getElementById('cloudPresenceModal');
  const indicator = document.getElementById('cloudUsersIndicator');
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'true');
  if (indicator) indicator.setAttribute('aria-expanded', 'false');
  setCloudPresenceModalLoading(false);
  setCloudUsersIndicatorState(getCloudUsersIndicatorCount(), true);
}

function getCloudUsersIndicatorCount() {
  return Math.max(
    0,
    Number(
      cloudPresenceModalState.activeUsers
      || (Array.isArray(cloudPresenceModalState.sessions) ? cloudPresenceModalState.sessions.length : 0)
      || 0
    ) || 0
  );
}

function setCloudUsersIndicatorState(count = 0, visible = false) {
  const indicator = document.getElementById('cloudUsersIndicator');
  const countEl = document.getElementById('cloudUsersCount');
  if (!indicator || !countEl) return;
  if (!visible) {
    indicator.hidden = true;
    countEl.textContent = '0';
    indicator.setAttribute('aria-label', getCloudPresenceModalText('المتصلون بالنظام', 'Connected users'));
    indicator.setAttribute('aria-expanded', 'false');
    return;
  }
  countEl.textContent = String(Math.max(0, Number(count) || 0));
  indicator.hidden = false;
  indicator.setAttribute('aria-label', `${getCloudPresenceModalText('المتصلون بالنظام', 'Connected users')}: ${countEl.textContent}`);
  indicator.setAttribute('aria-expanded', isCloudPresenceModalOpen() ? 'true' : 'false');
}

function clearCloudUsersRefreshInterval() {
  if (cloudUsersRefreshIntervalId) {
    clearInterval(cloudUsersRefreshIntervalId);
    cloudUsersRefreshIntervalId = null;
  }
}

function stopCloudUsersRefresh({ hideIndicator = true } = {}) {
  clearCloudUsersRefreshInterval();
  if (hideIndicator) {
    setCloudUsersIndicatorState(0, false);
    return;
  }
  setCloudUsersIndicatorState(getCloudUsersIndicatorCount(), true);
}

function ensureCloudUsersIndicatorVisible() {
  setCloudUsersIndicatorState(getCloudUsersIndicatorCount(), true);
}

function getCloudPresencePayload() {
  const currentUser = getStoredCurrentUser();
  const currentBranch = getStoredCurrentBranch();
  const currentBranchScope = window.currentBranchScopeContext || getStoredCurrentBranchScope();
  return {
    userId: Number(currentUser?.id || 0) || null,
    username: String(currentUser?.username || '').trim(),
    fullName: String(currentUser?.full_name || currentUser?.full_name_en || '').trim(),
    branchId: Number(currentBranchScope?.branchId || currentBranch?.id || currentUser?.branch_id || currentUser?.login_branch_id || 0) || null,
    currentBranch: currentBranch || null,
    branchScope: currentBranchScope || null,
  };
}

async function refreshCloudUsersIndicator() {
  const includeSessions = isCloudPresenceModalOpen();
  try {
    const state = await loadCloudPresenceState({ updateIndicator: true, includeSessions });
    if (state?.success && state?.activeMode === true && state?.connected) {
      return state;
    }
  } catch (_) {}
  setCloudUsersIndicatorState(0, false);
  return cloudPresenceModalState;
}

function startCloudUsersRefresh({ immediate = false } = {}) {
  clearCloudUsersRefreshInterval();
  if (immediate) {
    refreshCloudUsersIndicator();
  }
  cloudUsersRefreshIntervalId = setInterval(() => {
    refreshCloudUsersIndicator();
  }, CLOUD_USERS_REFRESH_MS);
}

// ===== تحديث مؤشر نوع قاعدة البيانات =====
async function updateDbModeIndicator() {
  const indicator = document.getElementById('dbModeIndicator');
  const icon = document.getElementById('dbModeIcon');
  const text = document.getElementById('dbModeText');
  if (!indicator || !icon || !text) return;

  const isEn = getCurrentMainLang() === 'en';
  
  try {
    const api = window.api || window.cloudDatabase;
    if (api && api.getCloudMode) {
      const result = await api.getCloudMode();
      if (result.success) {
        const isCloud = result.activeMode === true;
        
        indicator.classList.remove('local', 'cloud');
        indicator.classList.add(isCloud ? 'cloud' : 'local');
        
        if (isCloud) {
          icon.className = 'fa-solid fa-cloud';
          text.textContent = isEn ? 'You are connected to Cloud Database' : 'أنت الآن متصل بقاعدة البيانات السحابية';
          ensureCloudUsersIndicatorVisible();
          startCloudUsersRefresh({ immediate: true });
        } else {
          icon.className = 'fa-solid fa-server';
          text.textContent = isEn ? 'You are connected to Local Database' : 'أنت الآن متصل بقاعدة البيانات المحلية';
          stopCloudUsersRefresh();
        }
        return;
      }
    }
  } catch (e) {
    console.error('[Shell] Error updating db mode indicator:', e);
  }
  
  // Default to local if we can't determine
  indicator.classList.remove('cloud');
  indicator.classList.add('local');
  icon.className = 'fa-solid fa-server';
  text.textContent = isEn ? 'You are connected to Local Database' : 'أنت الآن متصل بقاعدة البيانات المحلية';
  stopCloudUsersRefresh();
}

// ===== متغيرات الإشعارات =====
let currentDeviceId = null;
let notificationSettings = {
  enabled: true,
  salesInvoice: true,
  purchaseInvoice: true,
  receipt: true,
  voucher: true,
  journal: true,
  customer: true,
  supplier: true,
  opening: true,
  accounts: true,
  goldItems: true,
  users: true,
  companySettings: true,
  taxDeclaration: true,
  ordersFromUsers: true,
  ordersCompleted: true
};

let currentCloudModeActive = false;

const BRANCH_SCOPED_CLOUD_TABLES = new Set([
  'accounts',
  'customers',
  'suppliers',
  'customer_branches',
  'supplier_branches',
  'default_boxes',
  'receipts',
  'vouchers',
  'openings',
  'journal_entries',
  'sales_invoices',
  'purchase_invoices',
  'orders',
  'tax_declarations',
]);

function getStoredCurrentUser() {
  try {
    const raw = localStorage.getItem('currentUser');
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

function getStoredCurrentBranch() {
  try {
    const raw = localStorage.getItem('currentBranch');
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

function getStoredCurrentBranchScope() {
  try {
    const raw = localStorage.getItem(CURRENT_BRANCH_SCOPE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const allowedBranchIds = Array.isArray(parsed?.allowedBranchIds)
      ? parsed.allowedBranchIds
      : (Array.isArray(parsed?.allowed_branch_ids) ? parsed.allowed_branch_ids : getAllowedBranchIdsFromStoredUser());
    return {
      mode: String(parsed?.mode || parsed?.scope || '').trim().toLowerCase() === 'all' ? 'all' : 'branch',
      branchId: Number(parsed?.branchId || parsed?.branch_id || 0) || null,
      allowedBranchIds: allowedBranchIds.map((value) => Number(value || 0)).filter((value) => Number.isFinite(value) && value > 0),
    };
  } catch (_) {
    return null;
  }
}

function getAllowedBranchIdsFromStoredUser() {
  try {
    const user = getStoredCurrentUser();
    const values = Array.isArray(user?.allowed_branch_ids) ? user.allowed_branch_ids : [];
    return values.map((value) => Number(value || 0)).filter((value) => Number.isFinite(value) && value > 0);
  } catch (_) {
    return [];
  }
}

function shouldHandleCloudPayloadForCurrentBranch(payload) {
  const tables = Array.isArray(payload?.tables)
    ? payload.tables.map(table => String(table || '').trim().toLowerCase()).filter(Boolean)
    : [];
  const hasBranchScopedTable = tables.some(table => BRANCH_SCOPED_CLOUD_TABLES.has(table));
  const hasNonBranchScopedTable = tables.some(table => !BRANCH_SCOPED_CLOUD_TABLES.has(table));
  if (!hasBranchScopedTable || hasNonBranchScopedTable) {
    return true;
  }
  const currentBranchScope = getStoredCurrentBranchScope();
  const allowedBranchIds = getAllowedBranchIdsFromStoredUser();
  const currentBranchId = Number(getStoredCurrentBranch()?.id || 0) || 0;
  const payloadBranchId = Number(payload?.branchId || payload?.branch_id || 0) || 0;
  if (currentBranchScope?.mode === 'all') {
    if (!payloadBranchId || !allowedBranchIds.length) {
      return true;
    }
    return allowedBranchIds.includes(payloadBranchId);
  }
  if (!currentBranchId || !payloadBranchId) {
    return true;
  }
  return payloadBranchId === currentBranchId;
}

function getCurrentUserId() {
  const user = getStoredCurrentUser();
  const userId = Number(user?.id || 0);
  return Number.isFinite(userId) && userId > 0 ? userId : null;
}

function isNotificationFromCurrentUser(actorUserId) {
  const currentUserId = getCurrentUserId();
  const normalizedActorUserId = Number(actorUserId || 0);
  return Boolean(
    currentUserId
    && Number.isFinite(normalizedActorUserId)
    && normalizedActorUserId > 0
    && normalizedActorUserId === currentUserId
  );
}

async function refreshCloudModeState() {
  try {
    const api = window.api || window.cloudDatabase;
    if (api?.getCloudMode) {
      const result = await api.getCloudMode();
      currentCloudModeActive = result?.success && result?.activeMode === true;
      return currentCloudModeActive;
    }
  } catch (_) {}
  currentCloudModeActive = false;
  return false;
}

function normalizeNotificationType(value) {
  const type = String(value || '').trim();
  if (!type) return null;
  const map = {
    customer: 'customers',
    customers: 'customers',
    supplier: 'suppliers',
    suppliers: 'suppliers',
    receipt: 'receipt',
    receipts: 'receipt',
    voucher: 'voucher',
    vouchers: 'voucher',
    journal: 'journal',
    journal_entries: 'journal',
    salesInvoice: 'salesInvoice',
    sales_invoices: 'salesInvoice',
    purchaseInvoice: 'purchaseInvoice',
    purchase_invoices: 'purchaseInvoice',
    opening: 'opening',
    openings: 'opening',
    orders: 'orders',
    accounts: 'accounts',
    users: 'users',
    goldItems: 'goldItems',
    gold_items: 'goldItems',
    gold_karats: 'goldItems',
    company: 'companySettings',
    companySettings: 'companySettings',
    invoice_settings: 'companySettings',
    taxDeclaration: 'taxDeclaration',
    tax_declaration: 'taxDeclaration',
    tax_declarations: 'taxDeclaration'
  };
  return map[type] || null;
}

function getRowsForNotificationPayload(payload, tableName, normalizedType) {
  const latestRows = payload?.latestRows;
  if (latestRows && Array.isArray(latestRows?.[tableName])) {
    return latestRows[tableName];
  }
  const fallbackId = Number(payload?.documentId || payload?.id || payload?.orderId || payload?.customerId || payload?.supplierId || 0);
  if (normalizedType && Number.isFinite(fallbackId) && fallbackId > 0) {
    return [{ id: fallbackId, status: payload?.status, created_by_name: payload?.actorName, modified_by_name: payload?.actorName }];
  }
  return [];
}

function getActorUserIdFromRow(row, payload) {
  const actorUserId = Number(
    row?.actorUserId ||
    row?.actor_user_id ||
    payload?.actorUserId ||
    0
  );
  return Number.isFinite(actorUserId) && actorUserId > 0 ? actorUserId : null;
}

function getActorNameFromRow(row, payload) {
  return String(
    row?.created_by_name ||
    row?.updated_by_name ||
    row?.modified_by_name ||
    row?.actorName ||
    payload?.actorName ||
    payload?.userName ||
    ''
  ).trim();
}

// تحميل معرف الجهاز وإعدادات الإشعارات
async function loadNotificationConfig() {
  try {
    // تحميل معرف الجهاز من cloudDatabase أو api
    const dbApi = window.cloudDatabase || window.api;
    if (dbApi && dbApi.getDeviceId) {
      const deviceResult = await dbApi.getDeviceId();
      if (deviceResult.success) {
        currentDeviceId = deviceResult.deviceId;
        shellLog('[Shell] Device ID loaded:', currentDeviceId);
      }
    }
    
    // تحميل إعدادات الإشعارات - تحقق من api أولاً ثم cloudDatabase
    const notifApi = (window.api && window.api.getNotificationSettings) ? window.api : window.cloudDatabase;
    if (notifApi && notifApi.getNotificationSettings) {
      const userId = getCurrentUserId();
      const settingsResult = await notifApi.getNotificationSettings(userId ? { userId } : undefined);
      if (settingsResult.success) {
        notificationSettings = { ...notificationSettings, ...settingsResult.settings };
        shellLog('[Shell] Notification settings loaded:', notificationSettings);
      }
    } else {
      shellWarn('[Shell] No notification settings API available');
    }
    await refreshCloudModeState();
  } catch (e) {
    console.error('[Shell] Error loading notification config:', e);
  }
}

function getNotificationSettingKey(type, subType = null) {
  if (subType) return subType;
  const typeKey = String(type || '').trim();
  if (!typeKey) return '';
  if (typeKey === 'customers') return 'customer';
  if (typeKey === 'suppliers') return 'supplier';
  return typeKey;
}

function isNotificationUiEnabledForType(type, subType = null) {
  if (!notificationSettings.enabled) return false;
  const settingKey = getNotificationSettingKey(type, subType);
  if (!settingKey) return true;
  return notificationSettings[settingKey] !== false;
}

// التحقق من أن الإشعار يجب أن يظهر
// subType: للتفريق بين أنواع فرعية مثل ordersFromUsers و ordersCompleted
function shouldShowNotification(type, originDeviceId, subType = null, actorUserId = null) {
  if (!isNotificationUiEnabledForType(type, subType)) {
    return false;
  }
  if (isNotificationFromCurrentUser(actorUserId)) {
    shellLog('[Shell] Skipping notification - same user');
    return false;
  }
  // لا تظهر الإشعار إذا كان من نفس الجهاز
  if (originDeviceId && currentDeviceId && originDeviceId === currentDeviceId) {
    shellLog('[Shell] Skipping notification - same device');
    return false;
  }
  return true;
}

const DAILY_OPS_TAB_TO_TYPE = {
  'tab-orders': 'orders',
  'tab-receipt': 'receipt',
  'tab-voucher': 'voucher',
  'tab-journal': 'journal',
  'tab-sales-invoice': 'salesInvoice',
  'tab-purchase-invoice': 'purchaseInvoice',
  'tab-customers': 'customers',
  'tab-suppliers': 'suppliers',
  'tab-opening': 'opening',
  'tab-accounts': 'accounts',
  'tab-gold-items': 'goldItems',
  'tab-users': 'users',
  'tab-company-settings': 'companySettings',
  'tab-cloud-settings': 'cloudSettings',
  'tab-open-positions': 'openPositions',
  'tab-tax-declaration': 'taxDeclaration',
};

function normalizeUnreadCount(value) {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
}

const mainTranslations = {
  ar: {
    dir: 'rtl',
    lang: 'ar',
    pageTitle: 'المحاسب الذكي BenAjlan - لوحة التحكم',
    topbarAppName: 'المحاسب الذكي (BenAjlan)',
    navGroupDashboardTitle: 'لوحة التحكم',
    navGroupAccountsTitle: 'دليل الحسابات',
    navGroupPartiesTitle: 'الأطراف',
    navGroupDailyOpsTitle: 'العمليات اليومية',
    navGroupMovementTitle: 'الحركة',
    navGroupReportsTitle: 'التقارير',
    navGroupAdminTitle: 'الإدارة والإعدادات',
    tabDashboardText: 'لوحة التحكم',
    tabAccountsText: 'شجرة الحسابات',
    tabOpeningText: 'الأرصدة الافتتاحية',
    tabCustomersText: 'العملاء',
    tabSuppliersText: 'الموردين',
    tabSalesInvoiceText: 'فاتورة بيع',
    tabPurchaseInvoiceText: 'فاتورة شراء',
    tabReceiptText: 'سند قبض',
    tabVoucherText: 'سند صرف',
    tabJournalText: 'قيد يومية',
    tabOrdersText: 'الأوردرات',
    tabMovementText: 'الحركة',
    tabSalesPurchaseMovementText: 'حركة المبيعات والمشتريات',
    tabReportsText: 'التقارير',
    tabQuickStatementText: 'كشف حساب سريع',
    tabCategoryReportText: 'تقرير حسب الأصناف',
    tabTaxReportText: 'تقرير الضرائب',
    tabTrialBalanceText: 'ميزان المراجعة',
    tabIncomeStatementText: 'قائمة الدخل',
    tabGeneralLedgerText: 'دفتر الأستاذ',
    tabBalanceSheetText: 'الميزانية العمومية',
    tabGoldItemsText: 'أصناف العيارات',
    tabBranchesText: 'الفروع',
    tabUsersText: 'المستخدمين',
    tabCompanySettingsText: 'إعدادات الشركة',
    tabCloudSettingsText: 'إعدادات السحابة',
    tabWhatsappReportsText: 'إرسال عبر واتساب',
    tabOpenPositionsText: 'المراكز المفتوحة',
    tabTaxDeclarationText: 'الإقرار الضريبي',
    branchScopeLabel: 'نطاق الفروع',
    branchScopeAllOption: 'كل الفروع',
  },
  en: {
    dir: 'ltr',
    lang: 'en',
    pageTitle: 'Smart Accountant BenAjlan - Dashboard',
    topbarAppName: 'Smart Accountant (BenAjlan)',
    navGroupDashboardTitle: 'Dashboard',
    navGroupAccountsTitle: 'Chart of Accounts',
    navGroupPartiesTitle: 'Parties',
    navGroupDailyOpsTitle: 'Daily Operations',
    navGroupMovementTitle: 'Movement',
    navGroupReportsTitle: 'Reports',
    navGroupAdminTitle: 'Administration & Settings',
    tabDashboardText: 'Dashboard',
    tabAccountsText: 'Accounts Tree',
    tabOpeningText: 'Opening Balances',
    tabCustomersText: 'Customers',
    tabSuppliersText: 'Suppliers',
    tabSalesInvoiceText: 'Sales Invoice',
    tabPurchaseInvoiceText: 'Purchase Invoice',
    tabReceiptText: 'Receipt Voucher',
    tabVoucherText: 'Payment Voucher',
    tabJournalText: 'Journal Entry',
    tabOrdersText: 'Orders',
    tabMovementText: 'Movement',
    tabSalesPurchaseMovementText: 'Sales & Purchases Movement',
    tabReportsText: 'Reports',
    tabQuickStatementText: 'Quick Statement',
    tabCategoryReportText: 'Category Report',
    tabTaxReportText: 'Tax Report',
    tabTrialBalanceText: 'Trial Balance',
    tabIncomeStatementText: 'Income Statement',
    tabGeneralLedgerText: 'General Ledger',
    tabBalanceSheetText: 'Balance Sheet',
    tabGoldItemsText: 'Gold Items',
    tabBranchesText: 'Branches',
    tabUsersText: 'Users',
    tabCompanySettingsText: 'Company Settings',
    tabCloudSettingsText: 'Cloud Settings',
    tabWhatsappReportsText: 'Send via WhatsApp',
    tabOpenPositionsText: 'Open Positions',
    tabTaxDeclarationText: 'Tax Declaration',
    branchScopeLabel: 'Branch Scope',
    branchScopeAllOption: 'All Branches',
  }
};

function getCurrentMainLang() {
  const stored = localStorage.getItem(MAIN_LANG_KEY);
  return stored === 'en' ? 'en' : 'ar';
}

function applyMainLanguage(lang) {
  const dict = mainTranslations[lang] || mainTranslations.ar;

  if (document.documentElement) {
    document.documentElement.dir = dict.dir;
    document.documentElement.lang = dict.lang;
  }

  if (dict.pageTitle) {
    document.title = dict.pageTitle;
  }

  const ids = [
    'topbarAppName',
    'navGroupDashboardTitle',
    'navGroupAccountsTitle',
    'navGroupPartiesTitle',
    'navGroupDailyOpsTitle',
    'navGroupMovementTitle',
    'navGroupReportsTitle',
    'navGroupAdminTitle',
    'tabDashboardText',
    'tabAccountsText',
    'tabOpeningText',
    'tabCustomersText',
    'tabSuppliersText',
    'tabSalesInvoiceText',
    'tabPurchaseInvoiceText',
    'tabReceiptText',
    'tabVoucherText',
    'tabJournalText',
    'tabOrdersText',
    'tabMovementText',
    'tabSalesPurchaseMovementText',
    'tabReportsText',
    'tabQuickStatementText',
    'tabCategoryReportText',
    'tabTaxReportText',
    'tabTrialBalanceText',
    'tabIncomeStatementText',
    'tabGeneralLedgerText',
    'tabBalanceSheetText',
    'tabGoldItemsText',
    'tabBranchesText',
    'tabUsersText',
    'tabCompanySettingsText',
    'tabCloudSettingsText',
    'tabWhatsappReportsText',
    'tabOpenPositionsText',
    'tabTaxDeclarationText',
    'branchScopeLabel',
  ];

  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el && typeof dict[id] === 'string') {
      el.textContent = dict[id];
    }
  });

  const branchScopeSelect = document.getElementById('topbarBranchScope');
  if (branchScopeSelect && typeof dict.branchScopeLabel === 'string') {
    branchScopeSelect.setAttribute('aria-label', dict.branchScopeLabel);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  // ⚡ تحميل إعدادات الإشعارات أولاً قبل أي شيء آخر
  await loadNotificationConfig();
  
  // تحديث مؤشر نوع قاعدة البيانات
  updateDbModeIndicator();

  const cloudUsersIndicator = document.getElementById('cloudUsersIndicator');
  if (cloudUsersIndicator) {
    cloudUsersIndicator.addEventListener('click', async () => {
      await openUserMessagesModal({ userId: messagingState.activeContactId || null, focusInput: false });
    });
  }

  const messagingElements = {
    button: document.getElementById('messagesHubButton'),
    count: document.getElementById('messagesHubCount'),
    modal: document.getElementById('userMessagesModal'),
    close: document.getElementById('userMessagesModalClose'),
    contacts: document.getElementById('userMessagesContacts'),
    emptyList: document.getElementById('userMessagesEmptyList'),
    thread: document.getElementById('userMessagesThread'),
    placeholder: document.getElementById('userMessagesThreadPlaceholder'),
    threadAvatar: document.getElementById('userMessagesThreadAvatar'),
    threadName: document.getElementById('userMessagesThreadName'),
    threadStatus: document.getElementById('userMessagesThreadStatus'),
    threadBranch: document.getElementById('userMessagesThreadBranch'),
    threadList: document.getElementById('userMessagesThreadList'),
    searchInput: document.getElementById('userMessagesSearchInput'),
    threadSearchInput: document.getElementById('userMessagesThreadSearchInput'),
    threadSearchCount: document.getElementById('userMessagesThreadSearchCount'),
    threadSearchPrev: document.getElementById('userMessagesThreadSearchPrev'),
    threadSearchNext: document.getElementById('userMessagesThreadSearchNext'),
    threadSearchClear: document.getElementById('userMessagesThreadSearchClear'),
    input: document.getElementById('userMessagesInput'),
    composer: document.getElementById('userMessagesComposer'),
    sendButton: document.getElementById('userMessagesSendButton'),
    filters: Array.from(document.querySelectorAll('[data-message-filter]')),
    onlineValue: document.getElementById('userMessagesOnlineValue'),
    unreadValue: document.getElementById('userMessagesUnreadValue'),
    selectedValue: document.getElementById('userMessagesSelectedValue'),
  };
  const messagingState = {
    contacts: [],
    activeContactId: null,
    activePartner: null,
    threadMessages: [],
    unreadTotal: 0,
    onlineCount: 0,
    loadingContactId: null,
    searchQuery: '',
    threadSearchQuery: '',
    threadSearchMatches: [],
    activeThreadSearchIndex: -1,
    threadCache: new Map(),
    filter: 'all',
    sending: false,
  };
  let messagingRefreshIntervalId = null;

  function getMessagingText(arText, enText) {
    return getCurrentMainLang() === 'en' ? enText : arText;
  }

  function isUserMessagesModalOpen() {
    return messagingElements.modal?.getAttribute('aria-hidden') === 'false';
  }

  function getMessagingCurrentUserId() {
    const user = currentUser || getStoredCurrentUser();
    const userId = Number(user?.id || 0);
    return Number.isFinite(userId) && userId > 0 ? userId : null;
  }

  function getMessagingDisplayName(entity = {}) {
    const isEn = getCurrentMainLang() === 'en';
    const fullName = String(entity?.full_name || '').trim();
    const username = String(entity?.username || '').trim();
    if (isEn) {
      return username || fullName || getMessagingText('مستخدم', 'User');
    }
    return fullName || username || getMessagingText('مستخدم', 'User');
  }

  function getMessagingInitials(entity = {}) {
    const source = getMessagingDisplayName(entity).trim();
    if (!source) {
      return getMessagingText('رس', 'MS');
    }
    const parts = source.split(/\s+/).filter(Boolean).slice(0, 2);
    return parts.map((part) => part.charAt(0)).join('').slice(0, 2) || source.slice(0, 2);
  }

  function getMessagingPreviewText(value = '', maxLength = 96) {
    const normalized = String(value ?? '').replace(/\s+/g, ' ').trim();
    const safeMaxLength = Number.isFinite(Number(maxLength)) && Number(maxLength) > 12 ? Number(maxLength) : 96;
    if (!normalized) {
      return '';
    }
    return normalized.length > safeMaxLength ? `${normalized.slice(0, safeMaxLength - 1).trim()}…` : normalized;
  }

  function escapeMessagingRegExp(value = '') {
    return String(value || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function syncMessagingThreadCache(userId = messagingState.activeContactId) {
    const normalizedUserId = Number(userId || 0);
    if (!Number.isFinite(normalizedUserId) || normalizedUserId <= 0) {
      return;
    }
    if (!Array.isArray(messagingState.threadMessages) || !messagingState.threadMessages.length) {
      messagingState.threadCache.delete(normalizedUserId);
      return;
    }
    messagingState.threadCache.set(normalizedUserId, messagingState.threadMessages.map((message) => ({ ...message })));
  }

  function updateMessagingThreadSearchControls() {
    const hasQuery = String(messagingState.threadSearchQuery || '').trim().length > 0;
    const totalMatches = Array.isArray(messagingState.threadSearchMatches) ? messagingState.threadSearchMatches.length : 0;
    const activeIndex = Number(messagingState.activeThreadSearchIndex || 0);
    if (messagingElements.threadSearchCount) {
      messagingElements.threadSearchCount.hidden = totalMatches <= 0;
      messagingElements.threadSearchCount.textContent = totalMatches > 0 ? `${activeIndex + 1}/${totalMatches}` : '0/0';
    }
    if (messagingElements.threadSearchPrev) {
      messagingElements.threadSearchPrev.disabled = totalMatches <= 1;
    }
    if (messagingElements.threadSearchNext) {
      messagingElements.threadSearchNext.disabled = totalMatches <= 1;
    }
    if (messagingElements.threadSearchClear) {
      messagingElements.threadSearchClear.disabled = !hasQuery;
    }
  }

  function setActiveMessagingThreadSearchMatch(index, { scroll = true } = {}) {
    const matches = Array.isArray(messagingState.threadSearchMatches) ? messagingState.threadSearchMatches : [];
    if (!matches.length) {
      messagingState.activeThreadSearchIndex = -1;
      updateMessagingThreadSearchControls();
      return;
    }
    const totalMatches = matches.length;
    const normalizedIndex = ((Number(index) || 0) % totalMatches + totalMatches) % totalMatches;
    messagingState.activeThreadSearchIndex = normalizedIndex;
    const rows = messagingElements.threadList
      ? Array.from(messagingElements.threadList.querySelectorAll('.user-message-row'))
      : [];
    rows.forEach((row) => row.classList.remove('match-focus'));
    matches.forEach((matchEl, matchIndex) => {
      matchEl.classList.toggle('active', matchIndex === normalizedIndex);
    });
    const activeMatch = matches[normalizedIndex] || null;
    const activeRow = activeMatch?.closest('.user-message-row') || null;
    if (activeRow) {
      activeRow.classList.add('match-focus');
    }
    updateMessagingThreadSearchControls();
    if (scroll && activeMatch) {
      activeMatch.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }

  function refreshMessagingThreadSearch({ preserveIndex = false, scroll = false } = {}) {
    const matches = messagingElements.threadList
      ? Array.from(messagingElements.threadList.querySelectorAll('.user-message-match'))
      : [];
    messagingState.threadSearchMatches = matches;
    if (!matches.length) {
      messagingState.activeThreadSearchIndex = -1;
      updateMessagingThreadSearchControls();
      return;
    }
    const nextIndex = preserveIndex
      ? Math.min(Math.max(Number(messagingState.activeThreadSearchIndex || 0), 0), matches.length - 1)
      : 0;
    setActiveMessagingThreadSearchMatch(nextIndex, { scroll });
  }

  function resetMessagingThreadSearch({ clearInput = false } = {}) {
    messagingState.threadSearchQuery = '';
    messagingState.threadSearchMatches = [];
    messagingState.activeThreadSearchIndex = -1;
    if (clearInput && messagingElements.threadSearchInput) {
      messagingElements.threadSearchInput.value = '';
    }
    if (messagingElements.threadList) {
      Array.from(messagingElements.threadList.querySelectorAll('.user-message-row')).forEach((row) => row.classList.remove('match-focus'));
    }
    updateMessagingThreadSearchControls();
  }

  function formatMessagingThreadMessageText(value = '') {
    const originalText = String(value ?? '');
    const query = String(messagingState.threadSearchQuery || '').trim();
    if (!query) {
      return escapeHtml(originalText).replace(/\n/g, '<br>');
    }
    const pattern = new RegExp(`(${escapeMessagingRegExp(query)})`, 'gi');
    return originalText
      .split(pattern)
      .map((part) => {
        if (!part) return '';
        const escapedPart = escapeHtml(part).replace(/\n/g, '<br>');
        if (part.toLowerCase() === query.toLowerCase()) {
          return `<mark class="user-message-match">${escapedPart}</mark>`;
        }
        return escapedPart;
      })
      .join('');
  }

  function formatMessagingClockTime(value, { includeDate = false } = {}) {
    const date = new Date(value || '');
    if (Number.isNaN(date.getTime())) {
      return getMessagingText('الآن', 'Now');
    }
    if (includeDate) {
      return date.toLocaleString(getCurrentMainLang() === 'en' ? 'en-GB-u-nu-latn' : 'ar-EG-u-nu-latn', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).replace(',', '');
    }
    return date.toLocaleTimeString(getCurrentMainLang() === 'en' ? 'en-GB-u-nu-latn' : 'ar-EG-u-nu-latn', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }

  function getMessagingThreadDayKey(value) {
    const date = new Date(value || '');
    if (Number.isNaN(date.getTime())) {
      return '';
    }
    return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
  }

  function formatMessagingThreadDayLabel(value) {
    const date = new Date(value || '');
    if (Number.isNaN(date.getTime())) {
      return getMessagingText('بدون تاريخ', 'No date');
    }
    const messageDay = new Date(date);
    messageDay.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffDays = Math.round((today.getTime() - messageDay.getTime()) / 86400000);
    if (diffDays === 0) {
      return getMessagingText('اليوم', 'Today');
    }
    if (diffDays === 1) {
      return getMessagingText('أمس', 'Yesterday');
    }
    return date.toLocaleDateString(getCurrentMainLang() === 'en' ? 'en-GB-u-nu-latn' : 'ar-EG-u-nu-latn', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: today.getFullYear() === messageDay.getFullYear() ? undefined : 'numeric',
    });
  }

  function formatMessagingRelativeTime(value) {
    const date = new Date(value || '');
    if (Number.isNaN(date.getTime())) {
      return getMessagingText('الآن', 'Just now');
    }
    const diffMs = Math.max(0, Date.now() - date.getTime());
    const diffMinutes = Math.round(diffMs / 60000);
    if (diffMinutes < 1) {
      return getMessagingText('الآن', 'Just now');
    }
    if (diffMinutes < 60) {
      return getMessagingText(`منذ ${diffMinutes} د`, `${diffMinutes}m ago`);
    }
    const diffHours = Math.round(diffMinutes / 60);
    if (diffHours < 24) {
      return getMessagingText(`منذ ${diffHours} س`, `${diffHours}h ago`);
    }
    const diffDays = Math.round(diffHours / 24);
    if (diffDays < 7) {
      return getMessagingText(`منذ ${diffDays} يوم`, `${diffDays}d ago`);
    }
    return formatMessagingClockTime(value, { includeDate: true });
  }

  function getMessagingBranchText(entity = {}) {
    const isEn = getCurrentMainLang() === 'en';
    const code = String(entity?.online_branch_code || entity?.default_branch_code || '').trim();
    const name = String(
      isEn
        ? entity?.online_branch_name_en || entity?.online_branch_name || entity?.default_branch_name_en || entity?.default_branch_name || ''
        : entity?.online_branch_name || entity?.online_branch_name_en || entity?.default_branch_name || entity?.default_branch_name_en || ''
    ).trim();
    if (code && name) return `${code} · ${name}`;
    if (name) return name;
    if (code) return code;
    return getMessagingText('بدون فرع', 'No branch');
  }

  function getMessagingStatusText(contact = {}) {
    if (contact?.is_online) {
      return `${getMessagingText('متصل الآن', 'Online now')} · ${getMessagingBranchText(contact)}`;
    }
    const referenceTime = contact?.last_seen_at || contact?.last_login || null;
    if (!referenceTime) {
      return getMessagingText('غير متصل', 'Offline');
    }
    return `${getMessagingText('آخر ظهور', 'Last seen')} ${formatMessagingRelativeTime(referenceTime)}`;
  }

  function findMessagingContact(userId) {
    const normalizedUserId = Number(userId || 0);
    return messagingState.contacts.find((contact) => Number(contact?.id || 0) === normalizedUserId) || null;
  }

  function ensureMessagingContact(userId) {
    const normalizedUserId = Number(userId || 0);
    if (!Number.isFinite(normalizedUserId) || normalizedUserId <= 0) {
      return null;
    }
    let contact = findMessagingContact(normalizedUserId);
    if (!contact) {
      contact = {
        id: normalizedUserId,
        username: '',
        full_name: '',
        unread_count: 0,
        is_online: false,
        last_message_text: null,
        last_message_at: null,
        last_message_sender_id: null,
        last_message_is_mine: false,
      };
      messagingState.contacts.push(contact);
    }
    return contact;
  }

  function sortMessagingContacts() {
    messagingState.contacts.sort((left, right) => {
      const leftUnread = Math.max(0, Number(left?.unread_count || 0) || 0);
      const rightUnread = Math.max(0, Number(right?.unread_count || 0) || 0);
      if (leftUnread !== rightUnread) {
        return rightUnread - leftUnread;
      }
      const leftOnline = Number(Boolean(left?.is_online));
      const rightOnline = Number(Boolean(right?.is_online));
      if (leftOnline !== rightOnline) {
        return rightOnline - leftOnline;
      }
      const leftTime = Date.parse(left?.last_message_at || left?.last_seen_at || left?.last_login || '') || 0;
      const rightTime = Date.parse(right?.last_message_at || right?.last_seen_at || right?.last_login || '') || 0;
      if (leftTime !== rightTime) {
        return rightTime - leftTime;
      }
      return getMessagingDisplayName(left).localeCompare(getMessagingDisplayName(right), 'ar');
    });
  }

  function getFilteredMessagingContacts() {
    const query = String(messagingState.searchQuery || '').trim().toLowerCase();
    return messagingState.contacts.filter((contact) => {
      if (messagingState.filter === 'online' && !contact?.is_online) {
        return false;
      }
      if (messagingState.filter === 'unread' && !(Number(contact?.unread_count || 0) > 0)) {
        return false;
      }
      if (!query) {
        return true;
      }
      const haystack = [
        getMessagingDisplayName(contact),
        String(contact?.username || '').trim(),
        getMessagingBranchText(contact),
      ].join(' ').toLowerCase();
      return haystack.includes(query);
    });
  }

  function setMessagesHubButtonState(count = 0, visible = false) {
    if (!messagingElements.button || !messagingElements.count) {
      return;
    }
    if (!visible) {
      messagingElements.button.hidden = true;
      messagingElements.count.hidden = true;
      messagingElements.count.textContent = '0';
      messagingElements.button.setAttribute('aria-expanded', 'false');
      messagingElements.button.setAttribute('aria-label', getMessagingText('المراسلات الداخلية', 'Internal messages'));
      return;
    }
    const normalizedCount = Math.max(0, Number(count || 0) || 0);
    messagingElements.button.hidden = false;
    messagingElements.button.setAttribute('aria-label', `${getMessagingText('المراسلات الداخلية', 'Internal messages')}: ${normalizedCount}`);
    messagingElements.count.hidden = normalizedCount <= 0;
    messagingElements.count.textContent = normalizedCount > 99 ? '99+' : String(normalizedCount);
  }

  function renderMessagingTexts() {
    const textMap = {
      messagesHubLabel: getMessagingText('المراسلات', 'Messages'),
      userMessagesModalTitle: getMessagingText('المراسلات الداخلية', 'Internal messages'),
      userMessagesModalSubtitle: getMessagingText('تواصل مباشرة مع المستخدمين، تابع الحالات المتصلة، واستقبل الإشعارات الفورية للرسائل الواردة.', 'Chat directly with users, track online presence, and receive instant incoming-message alerts.'),
      userMessagesFilterAllText: getMessagingText('الكل', 'All'),
      userMessagesFilterOnlineText: getMessagingText('المتصلون', 'Online'),
      userMessagesFilterUnreadText: getMessagingText('غير المقروءة', 'Unread'),
      userMessagesPlaceholderTitle: getMessagingText('اختر مستخدمًا لبدء المحادثة', 'Choose a user to start chatting'),
      userMessagesPlaceholderText: getMessagingText('ستظهر هنا الرسائل المباشرة مع الحالة المتصلة والتنبيهات الفورية عند وصول أي رسالة جديدة.', 'Direct messages, live presence status, and instant alerts for any new incoming message will appear here.'),
      userMessagesSendButtonText: getMessagingText('إرسال', 'Send'),
    };
    Object.entries(textMap).forEach(([id, value]) => {
      const element = document.getElementById(id);
      if (element) {
        element.textContent = value;
      }
    });
    const htmlLabelMap = {
      userMessagesOnlineLabel: `<i class="fa-solid fa-circle-nodes" aria-hidden="true"></i> ${escapeHtml(getMessagingText('المتصلون الآن', 'Online now'))}`,
      userMessagesUnreadLabel: `<i class="fa-solid fa-envelope-open-text" aria-hidden="true"></i> ${escapeHtml(getMessagingText('غير المقروءة', 'Unread'))}`,
      userMessagesSelectedLabel: `<i class="fa-solid fa-message" aria-hidden="true"></i> ${escapeHtml(getMessagingText('المحادثة الحالية', 'Current conversation'))}`,
    };
    Object.entries(htmlLabelMap).forEach(([id, html]) => {
      const element = document.getElementById(id);
      if (element) {
        element.innerHTML = html;
      }
    });
    if (messagingElements.searchInput) {
      messagingElements.searchInput.placeholder = getMessagingText('ابحث باسم المستخدم أو الفرع', 'Search by user or branch');
    }
    if (messagingElements.threadSearchInput) {
      messagingElements.threadSearchInput.placeholder = getMessagingText('ابحث داخل المحادثة', 'Search in conversation');
    }
    if (messagingElements.input) {
      messagingElements.input.placeholder = getMessagingText(
        'اكتب رسالتك هنا ثم اضغط Enter للإرسال و Shift + Enter لسطر جديد',
        'Write your message here — Enter to send, Shift + Enter for new line'
      );
    }
    if (messagingElements.close) {
      messagingElements.close.setAttribute('aria-label', getMessagingText('إغلاق', 'Close'));
    }
    if (messagingElements.threadSearchPrev) {
      messagingElements.threadSearchPrev.setAttribute('aria-label', getMessagingText('النتيجة السابقة', 'Previous result'));
    }
    if (messagingElements.threadSearchNext) {
      messagingElements.threadSearchNext.setAttribute('aria-label', getMessagingText('النتيجة التالية', 'Next result'));
    }
    if (messagingElements.threadSearchClear) {
      messagingElements.threadSearchClear.setAttribute('aria-label', getMessagingText('مسح البحث', 'Clear search'));
    }
    updateMessagingThreadSearchControls();
  }

  function updateCapsuleUnreadBadge(count = 0) {
    const unreadEl = document.getElementById('cloudUsersUnread');
    if (!unreadEl) return;
    const normalized = Math.max(0, Number(count) || 0);
    unreadEl.hidden = normalized <= 0;
    unreadEl.textContent = normalized > 99 ? '99+' : String(normalized);
  }

  function renderMessagingStats() {
    const activeContact = findMessagingContact(messagingState.activeContactId) || messagingState.activePartner || null;
    const presenceOnlineCount = Math.max(0, Number(
      cloudPresenceModalState.activeUsers
      || (Array.isArray(cloudPresenceModalState.sessions) ? cloudPresenceModalState.sessions.length : 0)
      || 0
    ) || 0);
    if (messagingElements.onlineValue) {
      messagingElements.onlineValue.textContent = String(presenceOnlineCount);
    }
    if (messagingElements.unreadValue) {
      messagingElements.unreadValue.textContent = String(Math.max(0, Number(messagingState.unreadTotal || 0) || 0));
    }
    if (messagingElements.selectedValue) {
      messagingElements.selectedValue.textContent = activeContact ? getMessagingDisplayName(activeContact) : '-';
    }
    setMessagesHubButtonState(messagingState.unreadTotal, currentCloudModeActive === true && Boolean(window.messaging?.listContacts));
    updateCapsuleUnreadBadge(messagingState.unreadTotal);
  }

  function renderMessagingContacts() {
    if (!messagingElements.contacts || !messagingElements.emptyList) {
      return;
    }
    const filteredContacts = getFilteredMessagingContacts();
    if (!filteredContacts.length) {
      const hasAnyContacts = Array.isArray(messagingState.contacts) && messagingState.contacts.length > 0;
      messagingElements.emptyList.hidden = false;
      messagingElements.emptyList.innerHTML = `
        <i class="fa-solid ${hasAnyContacts ? 'fa-filter-circle-xmark' : 'fa-comments'}" aria-hidden="true"></i>
        <strong>${escapeHtml(hasAnyContacts ? getMessagingText('لا توجد نتائج مطابقة', 'No matching conversations') : getMessagingText('لا توجد محادثات بعد', 'No conversations yet'))}</strong>
        <span>${escapeHtml(hasAnyContacts ? getMessagingText('غيّر البحث أو اختر فلترًا مختلفًا لعرض المستخدمين والمحادثات المتاحة.', 'Change your search or switch the filter to display available users and conversations.') : getMessagingText('ستظهر هنا المحادثات بمجرد إرسال أول رسالة أو استلامها من أي مستخدم في النظام.', 'Conversations will appear here as soon as you send or receive the first direct message from any user in the system.'))}</span>
      `;
      messagingElements.contacts.innerHTML = '';
      return;
    }
    messagingElements.emptyList.hidden = true;
    messagingElements.contacts.innerHTML = filteredContacts.map((contact) => {
      const contactId = Number(contact?.id || 0) || 0;
      const isActive = Number(messagingState.activeContactId || 0) === contactId;
      const unreadCount = Math.max(0, Number(contact?.unread_count || 0) || 0);
      const previewText = contact?.last_message_text
        ? `${contact?.last_message_is_mine ? getMessagingText('أنت: ', 'You: ') : ''}${getMessagingPreviewText(contact.last_message_text)}`
        : getMessagingStatusText(contact);
      const timeText = contact?.last_message_at
        ? formatMessagingRelativeTime(contact.last_message_at)
        : (contact?.is_online ? getMessagingText('الآن', 'Now') : formatMessagingRelativeTime(contact?.last_seen_at || contact?.last_login || null));
      return `
        <button type="button" class="user-messages-contact${isActive ? ' active' : ''}" data-message-contact-id="${contactId}">
          <div class="user-messages-contact-avatar">${escapeHtml(getMessagingInitials(contact))}</div>
          <div class="user-messages-contact-body">
            <div class="user-messages-contact-name-row">
              <div class="user-messages-contact-name">${escapeHtml(getMessagingDisplayName(contact))}</div>
            </div>
            <div class="user-messages-contact-status">${contact?.is_online ? '<span class="status-dot" aria-hidden="true"></span>' : '<i class="fa-solid fa-clock" aria-hidden="true" style="font-size:9px;opacity:.55"></i>'}<span>${contact?.is_online ? `<span class="user-message-online-label">${escapeHtml(getMessagingText('متصل الآن', 'Online now'))}</span> · ${escapeHtml(getMessagingBranchText(contact))}` : escapeHtml(getMessagingStatusText(contact))}</span></div>
            <div class="user-messages-contact-preview">${escapeHtml(previewText || getMessagingText('ابدأ المحادثة الآن', 'Start the conversation now'))}</div>
          </div>
          <div class="user-messages-contact-meta">
            <span class="user-messages-contact-time">${escapeHtml(timeText || '')}</span>
            ${unreadCount > 0 ? `<span class="user-messages-contact-unread">${unreadCount > 99 ? '99+' : unreadCount}</span>` : ''}
          </div>
        </button>
      `;
    }).join('');
  }

  function renderMessagingThread() {
    if (!messagingElements.placeholder || !messagingElements.thread || !messagingElements.threadAvatar || !messagingElements.threadName || !messagingElements.threadStatus || !messagingElements.threadBranch || !messagingElements.threadList) {
      return;
    }
    const loadingContactId = Number(messagingState.loadingContactId || 0) || 0;
    const activeContactId = Number(messagingState.activeContactId || 0) || 0;
    const activeContact = findMessagingContact(messagingState.activeContactId) || messagingState.activePartner || null;
    if (!activeContact) {
      messagingElements.placeholder.hidden = false;
      messagingElements.placeholder.innerHTML = `
        <div class="user-messages-thread-placeholder-icon">
          <i class="fa-solid fa-paper-plane"></i>
        </div>
        <strong id="userMessagesPlaceholderTitle">${escapeHtml(getMessagingText('اختر مستخدمًا لبدء المحادثة', 'Choose a user to start chatting'))}</strong>
        <span id="userMessagesPlaceholderText">${escapeHtml(getMessagingText('ستظهر هنا الرسائل المباشرة مع الحالة المتصلة والتنبيهات الفورية عند وصول أي رسالة جديدة.', 'Direct messages, live presence status, and instant alerts for any new incoming message will appear here.'))}</span>
      `;
      messagingElements.thread.hidden = true;
      messagingElements.threadList.innerHTML = '';
      return;
    }
    messagingElements.placeholder.hidden = true;
    messagingElements.thread.hidden = false;
    messagingElements.threadAvatar.textContent = getMessagingInitials(activeContact);
    messagingElements.threadName.textContent = getMessagingDisplayName(activeContact);
    const isThreadLoading = loadingContactId > 0 && loadingContactId === activeContactId;
    messagingElements.threadStatus.innerHTML = (activeContact?.is_online
      ? '<span class="status-dot" aria-hidden="true"></span>'
      : '<i class="fa-solid fa-clock" aria-hidden="true" style="font-size:10px;opacity:.55"></i>') + ' ' + (activeContact?.is_online
      ? `<span class="user-message-online-label">${escapeHtml(getMessagingText('متصل الآن', 'Online now'))}</span> · ${escapeHtml(getMessagingBranchText(activeContact))}`
      : escapeHtml(getMessagingStatusText(activeContact))) + (isThreadLoading
      ? ` <span style="opacity:.8"><i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i> ${escapeHtml(getMessagingText('جاري تحميل المحادثة', 'Loading conversation'))}</span>`
      : '');
    messagingElements.threadBranch.innerHTML = '<i class="fa-solid fa-code-branch" aria-hidden="true" style="font-size:11px;opacity:.7"></i> ' + escapeHtml(getMessagingBranchText(activeContact));
    if (isThreadLoading && (!Array.isArray(messagingState.threadMessages) || !messagingState.threadMessages.length)) {
      messagingElements.threadList.innerHTML = `
        <div class="user-messages-empty-list">
          <i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i>
          <strong>${escapeHtml(getMessagingText('جاري تحميل المحادثة', 'Loading conversation'))}</strong>
          <span>${escapeHtml(getMessagingText('يرجى الانتظار قليلًا حتى تظهر الرسائل الأخيرة.', 'Please wait a moment while recent messages are loaded.'))}</span>
        </div>
      `;
      refreshMessagingThreadSearch({ preserveIndex: false, scroll: false });
      return;
    }
    if (!Array.isArray(messagingState.threadMessages) || !messagingState.threadMessages.length) {
      messagingElements.threadList.innerHTML = `
        <div class="user-messages-empty-list">
          <i class="fa-solid fa-comment-dots" aria-hidden="true"></i>
          <strong>${escapeHtml(getMessagingText('لا توجد رسائل بعد', 'No messages yet'))}</strong>
          <span>${escapeHtml(getMessagingText('ابدأ المحادثة بإرسال أول رسالة مباشرة إلى هذا المستخدم.', 'Start the conversation by sending the first direct message to this user.'))}</span>
        </div>
      `;
      refreshMessagingThreadSearch({ preserveIndex: false, scroll: false });
      return;
    }
    let previousDayKey = '';
    messagingElements.threadList.innerHTML = messagingState.threadMessages.map((message) => {
      const dayKey = getMessagingThreadDayKey(message?.created_at || null);
      const separatorHtml = dayKey && dayKey !== previousDayKey
        ? `
        <div class="user-message-day-separator" data-day-key="${escapeHtml(dayKey)}">
          <span>${escapeHtml(formatMessagingThreadDayLabel(message?.created_at || null))}</span>
        </div>`
        : '';
      previousDayKey = dayKey || previousDayKey;
      const clockText = escapeHtml(formatMessagingClockTime(message?.created_at || null));
      let deliveryHtml = '';
      if (message?.is_mine) {
        deliveryHtml = message?.read_at
          ? `<span class="user-message-delivery user-message-delivery-read"><i class="fa-solid fa-check-double" aria-hidden="true"></i> ${escapeHtml(getMessagingText('مقروءة', 'Read'))}</span>`
          : `<span class="user-message-delivery user-message-delivery-sent"><i class="fa-solid fa-check" aria-hidden="true"></i> ${escapeHtml(getMessagingText('مرسلة', 'Sent'))}</span>`;
      }
      return `
        ${separatorHtml}
        <div class="user-message-row ${message?.is_mine ? 'mine' : 'other'}" data-message-id="${escapeHtml(String(message?.id || ''))}">
          <div class="user-message-bubble">${formatMessagingThreadMessageText(String(message?.message_text || ''))}</div>
          <div class="user-message-meta"><span>${clockText}</span>${deliveryHtml}</div>
        </div>
      `;
    }).join('');
    refreshMessagingThreadSearch({ preserveIndex: true, scroll: false });
  }

  function scrollMessagingThreadToBottom() {
    if (messagingElements.threadList) {
      messagingElements.threadList.scrollTop = messagingElements.threadList.scrollHeight;
    }
  }

  function isMessagingThreadNearBottom(threshold = 80) {
    if (!messagingElements.threadList) {
      return false;
    }
    const { scrollTop, scrollHeight, clientHeight } = messagingElements.threadList;
    return Math.max(0, scrollHeight - clientHeight - scrollTop) <= threshold;
  }

  function clearMessagingRefreshInterval() {
    if (messagingRefreshIntervalId) {
      clearInterval(messagingRefreshIntervalId);
      messagingRefreshIntervalId = null;
    }
  }

  function startMessagingRefresh() {
    clearMessagingRefreshInterval();
    if (!currentCloudModeActive || !isUserMessagesModalOpen()) {
      return;
    }
    messagingRefreshIntervalId = setInterval(async () => {
      await refreshMessagingContacts({ preserveActive: true });
    }, MESSAGES_HUB_REFRESH_MS);
  }

  function stopMessagingRefresh() {
    clearMessagingRefreshInterval();
  }

  async function refreshMessagingContacts({ preserveActive = true } = {}) {
    if (!window.messaging?.listContacts) {
      setMessagesHubButtonState(0, false);
      return null;
    }
    const result = await window.messaging.listContacts({
      currentBranch: currentBranch || null,
      branchScope: currentBranchScope || null,
    });
    if (!result?.success) {
      return null;
    }
    if (result?.cloudMode !== true) {
      messagingState.contacts = [];
      messagingState.activeContactId = null;
      messagingState.activePartner = null;
      messagingState.threadMessages = [];
      messagingState.unreadTotal = 0;
      messagingState.onlineCount = 0;
      renderMessagingStats();
      renderMessagingContacts();
      renderMessagingThread();
      setMessagesHubButtonState(0, false);
      return result;
    }
    messagingState.contacts = Array.isArray(result?.data) ? result.data.map((contact) => ({ ...contact })) : [];
    sortMessagingContacts();
    messagingState.unreadTotal = Math.max(0, Number(result?.unreadTotal || 0) || 0);
    messagingState.onlineCount = Math.max(0, Number(result?.onlineCount || 0) || 0);
    if (preserveActive && messagingState.activeContactId) {
      messagingState.activePartner = findMessagingContact(messagingState.activeContactId) || messagingState.activePartner;
      if (!messagingState.activePartner) {
        messagingState.activeContactId = null;
        messagingState.threadMessages = [];
      }
    }
    renderMessagingTexts();
    renderMessagingStats();
    renderMessagingContacts();
    if (isUserMessagesModalOpen()) {
      renderMessagingThread();
    }
    return result;
  }

  async function markMessagingThreadRead(userId, { silent = false } = {}) {
    const contact = findMessagingContact(userId);
    const unreadCount = Math.max(0, Number(contact?.unread_count || 0) || 0);
    if (!unreadCount || !window.messaging?.markRead) {
      return { success: true, changes: 0 };
    }
    const result = await window.messaging.markRead({ userId });
    if (!result?.success) {
      return result;
    }
    if (contact) {
      contact.unread_count = 0;
    }
    messagingState.unreadTotal = messagingState.contacts.reduce((sum, item) => sum + Math.max(0, Number(item?.unread_count || 0) || 0), 0);
    if (Number(result?.changes || 0) > 0) {
      const readAt = new Date().toISOString();
      messagingState.threadMessages = (Array.isArray(messagingState.threadMessages) ? messagingState.threadMessages : []).map((message) => {
        if (message?.is_mine || message?.read_at) {
          return message;
        }
        return {
          ...message,
          read_at: readAt,
          delivery_status: 'read',
        };
      });
      syncMessagingThreadCache(userId);
    }
    renderMessagingStats();
    renderMessagingContacts();
    if (!silent) {
      renderMessagingThread();
    }
    return result;
  }

  async function loadMessagingThread(userId, { markRead = true, focusInput = false } = {}) {
    const normalizedUserId = Number(userId || 0);
    if (!Number.isFinite(normalizedUserId) || normalizedUserId <= 0 || !window.messaging?.getThread) {
      return null;
    }
    const previousActiveContactId = Number(messagingState.activeContactId || 0) || 0;
    const listedContact = findMessagingContact(normalizedUserId);
    const contact = ensureMessagingContact(normalizedUserId);
    messagingState.activeContactId = normalizedUserId;
    messagingState.activePartner = contact || null;
    if (previousActiveContactId !== normalizedUserId) {
      resetMessagingThreadSearch({ clearInput: true });
    }
    const cachedMessages = messagingState.threadCache.get(normalizedUserId);
    messagingState.threadMessages = Array.isArray(cachedMessages) ? cachedMessages.map((message) => ({ ...message })) : [];
    messagingState.loadingContactId = normalizedUserId;
    renderMessagingStats();
    renderMessagingContacts();
    renderMessagingThread();
    try {
      const result = await window.messaging.getThread({
        userId: normalizedUserId,
        currentBranch: currentBranch || null,
        branchScope: currentBranchScope || null,
        limit: 240,
        skipPresence: Boolean(listedContact),
      });
      if (!result?.success) {
        if (messagingState.loadingContactId === normalizedUserId) {
          messagingState.activePartner = null;
          messagingState.threadMessages = [];
          renderMessagingThread();
        }
        return result;
      }
      if (contact && result?.partner) {
        const mergedPartner = { ...contact, ...result.partner };
        if (listedContact) {
          mergedPartner.is_online = Boolean(contact?.is_online);
          mergedPartner.online_branch_id = contact?.online_branch_id ?? null;
          mergedPartner.online_branch_code = contact?.online_branch_code ?? null;
          mergedPartner.online_branch_name = contact?.online_branch_name ?? null;
          mergedPartner.online_branch_name_en = contact?.online_branch_name_en ?? null;
          mergedPartner.last_seen_at = contact?.last_seen_at || null;
        }
        Object.assign(contact, mergedPartner);
      }
      const messages = Array.isArray(result?.data) ? result.data.map((message) => ({ ...message })) : [];
      const lastMessage = messages[messages.length - 1] || null;
      if (contact && lastMessage) {
        contact.last_message_text = lastMessage.message_text || null;
        contact.last_message_at = lastMessage.created_at || null;
        contact.last_message_sender_id = lastMessage.sender_user_id || null;
        contact.last_message_is_mine = Boolean(lastMessage.is_mine);
      }
      messagingState.activePartner = contact || result?.partner || null;
      messagingState.threadMessages = messages;
      syncMessagingThreadCache(normalizedUserId);
      sortMessagingContacts();
      renderMessagingTexts();
      renderMessagingStats();
      renderMessagingContacts();
      renderMessagingThread();
      if (markRead && Math.max(0, Number(contact?.unread_count || 0) || 0) > 0) {
        await markMessagingThreadRead(normalizedUserId, { silent: true });
        renderMessagingThread();
      }
      requestAnimationFrame(() => scrollMessagingThreadToBottom());
      if (focusInput) {
        requestAnimationFrame(() => messagingElements.input?.focus());
      }
      return result;
    } finally {
      if (Number(messagingState.loadingContactId || 0) === normalizedUserId) {
        messagingState.loadingContactId = null;
      }
    }
  }

  function showIncomingMessageToast(contact, messageRow = {}) {
    const host = ensureToastHost();
    const senderId = Number(contact?.id || messageRow?.sender_user_id || 0) || 0;
    const isEn = getCurrentMainLang() === 'en';
    const senderFullName = String(contact?.full_name || messageRow?.actorName || '').trim();
    const senderUsername = String(contact?.username || messageRow?.username || '').trim();
    const displayName = isEn
      ? (senderUsername || senderFullName || getMessagingText('مستخدم غير معروف', 'Unknown user'))
      : (senderFullName || senderUsername || getMessagingText('مستخدم غير معروف', 'Unknown user'));
    const previewText = getMessagingPreviewText(messageRow?.message_text || messageRow?.message_preview || '');
    const toast = document.createElement('div');
    toast.className = 'global-notif-toast message-toast';
    toast.innerHTML = `
      <div class="global-notif-toast-icon"><i class="fa-solid fa-message"></i></div>
      <div class="user-message-toast-content">
        <div class="user-message-toast-body">
          <div class="global-notif-toast-title">${escapeHtml(getMessagingText('رسالة جديدة', 'New message'))}</div>
          <div class="user-message-toast-text"><strong>${escapeHtml(displayName)}</strong> · ${escapeHtml(previewText || getMessagingText('أرسل لك رسالة جديدة', 'sent you a new message'))}</div>
        </div>
      </div>
    `;
    const closeToast = () => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 260);
    };
    toast.addEventListener('click', async () => {
      closeToast();
      if (senderId > 0) {
        await openUserMessagesModal({ userId: senderId, focusInput: true });
      }
    });
    host.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => closeToast(), 5000);
  }

  async function handleMessagingCloudPayload(payload = {}) {
    const currentUserId = getMessagingCurrentUserId();
    if (!currentUserId) {
      return;
    }
    const rows = Array.isArray(payload?.latestRows?.user_messages) ? payload.latestRows.user_messages : [];
    const firstRow = rows[0] || {};
    const senderUserId = Number(firstRow?.sender_user_id || 0) || 0;
    const recipientUserId = Number(firstRow?.recipient_user_id || 0) || 0;
    const relatedPartnerId = senderUserId && senderUserId !== currentUserId
      ? senderUserId
      : (recipientUserId && recipientUserId !== currentUserId ? recipientUserId : null);
    const incomingRow = rows.find((row) => Number(row?.recipient_user_id || 0) === currentUserId && Number(row?.sender_user_id || 0) > 0 && Number(row?.sender_user_id || 0) !== currentUserId) || null;
    const readReceiptRows = rows.filter((row) => Number(row?.sender_user_id || 0) === currentUserId && Number(row?.recipient_user_id || 0) > 0 && row?.read_at);
    const readReceiptPartnerIds = Array.from(new Set(
      readReceiptRows
        .map((row) => Number(row?.recipient_user_id || 0) || 0)
        .filter((id) => Number.isFinite(id) && id > 0)
    ));

    let optimisticUnreadSenderId = null;
    let optimisticUnreadCount = null;

    if (incomingRow) {
      const incomingSenderId = Number(incomingRow?.sender_user_id || 0) || 0;
      const modalIsFocusedOnSender = isUserMessagesModalOpen() && Number(messagingState.activeContactId || 0) === incomingSenderId;
      if (!modalIsFocusedOnSender) {
        const optimisticContact = ensureMessagingContact(incomingSenderId);
        if (optimisticContact) {
          const previousUnread = Math.max(0, Number(optimisticContact.unread_count || 0) || 0);
          optimisticUnreadSenderId = incomingSenderId;
          optimisticUnreadCount = Math.max(previousUnread + 1, 1);
          optimisticContact.last_message_text = String(incomingRow?.message_text || optimisticContact.last_message_text || '').trim() || null;
          optimisticContact.last_message_at = incomingRow?.created_at || optimisticContact.last_message_at || null;
          optimisticContact.last_message_sender_id = incomingSenderId;
          optimisticContact.last_message_is_mine = false;
          optimisticContact.unread_count = optimisticUnreadCount;
          messagingState.unreadTotal = messagingState.contacts.reduce((sum, item) => sum + Math.max(0, Number(item?.unread_count || 0) || 0), 0);
          sortMessagingContacts();
          renderMessagingStats();
          renderMessagingContacts();
          updateCapsuleUnreadBadge(messagingState.unreadTotal);
        }
      }
    }

    await refreshMessagingContacts({ preserveActive: true });

    if (readReceiptPartnerIds.length) {
      const readReceiptMap = new Map(
        readReceiptRows.map((row) => [Number(row?.recipient_user_id || 0) || 0, row?.read_at || new Date().toISOString()])
      );
      messagingState.threadMessages = (Array.isArray(messagingState.threadMessages) ? messagingState.threadMessages : []).map((message) => {
        if (!message?.is_mine || message?.read_at) {
          return message;
        }
        const messageRecipientId = Number(message?.recipient_user_id || 0) || 0;
        if (!readReceiptMap.has(messageRecipientId)) {
          return message;
        }
        return {
          ...message,
          read_at: readReceiptMap.get(messageRecipientId),
          delivery_status: 'read',
        };
      });
      syncMessagingThreadCache();
      renderMessagingThread();
    }

    if (incomingRow) {
      const incomingSenderId = Number(incomingRow?.sender_user_id || 0) || 0;
      if (isUserMessagesModalOpen() && Number(messagingState.activeContactId || 0) === incomingSenderId) {
        const incomingMessageId = Number(incomingRow?.id || 0) || null;
        const threadMessages = Array.isArray(messagingState.threadMessages) ? messagingState.threadMessages : [];
        if (!incomingMessageId || !threadMessages.some((message) => Number(message?.id || 0) === incomingMessageId)) {
          messagingState.threadMessages = [...threadMessages, {
            ...incomingRow,
            id: incomingMessageId,
            is_mine: false,
            delivery_status: String(incomingRow?.delivery_status || 'sent').trim() || 'sent',
          }];
        }
        syncMessagingThreadCache(incomingSenderId);
        const activeContact = findMessagingContact(incomingSenderId);
        if (activeContact) {
          activeContact.last_message_text = String(incomingRow?.message_text || activeContact.last_message_text || '').trim() || null;
          activeContact.last_message_at = incomingRow?.created_at || activeContact.last_message_at || null;
          activeContact.last_message_sender_id = incomingSenderId;
          activeContact.last_message_is_mine = false;
          activeContact.unread_count = 0;
        }
        sortMessagingContacts();
        renderMessagingStats();
        renderMessagingContacts();
        renderMessagingThread();
        requestAnimationFrame(() => scrollMessagingThreadToBottom());
        if (isMessagingThreadNearBottom()) {
          await markMessagingThreadRead(incomingSenderId, { silent: true });
          renderMessagingContacts();
          renderMessagingStats();
          renderMessagingThread();
        }
        playNotificationSound();
        return;
      }
      if (optimisticUnreadSenderId && optimisticUnreadCount !== null) {
        const syncedContact = findMessagingContact(optimisticUnreadSenderId);
        if (syncedContact) {
          const syncedUnread = Math.max(0, Number(syncedContact.unread_count || 0) || 0);
          if (syncedUnread < optimisticUnreadCount) {
            syncedContact.unread_count = optimisticUnreadCount;
            messagingState.unreadTotal = messagingState.contacts.reduce((sum, item) => sum + Math.max(0, Number(item?.unread_count || 0) || 0), 0);
            renderMessagingStats();
            renderMessagingContacts();
            updateCapsuleUnreadBadge(messagingState.unreadTotal);
          }
        }
      }
      const contact = findMessagingContact(incomingSenderId) || {
        id: incomingSenderId,
        full_name: payload?.actorName || '',
        username: '',
      };
      showIncomingMessageToast(contact, incomingRow);
      playNotificationSound();
    }
  }

  async function sendMessagingMessage() {
    const activeContactId = Number(messagingState.activeContactId || 0) || 0;
    const messageText = String(messagingElements.input?.value || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
    if (!activeContactId || !messageText || messagingState.sending || !window.messaging?.sendMessage) {
      if (!messageText) {
        messagingElements.input?.focus();
      }
      return false;
    }
    messagingState.sending = true;
    if (messagingElements.sendButton) {
      messagingElements.sendButton.disabled = true;
    }
    try {
      const result = await window.messaging.sendMessage({ userId: activeContactId, message: messageText });
      if (!result?.success) {
        return false;
      }
      const currentUserId = getMessagingCurrentUserId();
      const contact = ensureMessagingContact(activeContactId);
      const messageRow = {
        ...(result?.data || {}),
        is_mine: true,
      };
      if (contact) {
        contact.last_message_text = messageRow.message_text || null;
        contact.last_message_at = messageRow.created_at || new Date().toISOString();
        contact.last_message_sender_id = currentUserId;
        contact.last_message_is_mine = true;
      }
      messagingState.threadMessages = [...(Array.isArray(messagingState.threadMessages) ? messagingState.threadMessages : []), messageRow];
      syncMessagingThreadCache(activeContactId);
      sortMessagingContacts();
      renderMessagingStats();
      renderMessagingContacts();
      renderMessagingThread();
      if (messagingElements.input) {
        messagingElements.input.value = '';
        messagingElements.input.focus();
      }
      requestAnimationFrame(() => scrollMessagingThreadToBottom());
      return true;
    } finally {
      messagingState.sending = false;
      if (messagingElements.sendButton) {
        messagingElements.sendButton.disabled = false;
      }
    }
  }

  async function openUserMessagesModal({ userId = null, focusInput = false } = {}) {
    if (!messagingElements.modal) {
      return false;
    }
    messagingElements.modal.setAttribute('aria-hidden', 'false');
    messagingElements.button?.setAttribute('aria-expanded', 'true');
    renderMessagingTexts();
    renderMessagingStats();
    renderMessagingContacts();
    renderMessagingThread();
    requestAnimationFrame(() => scrollMessagingThreadToBottom());

    const cloudReady = await syncMessagingCloudAvailability({ refreshContacts: true });
    if (!cloudReady) {
      return false;
    }
    const filteredContacts = getFilteredMessagingContacts();
    const fallbackContactId = Number(filteredContacts?.[0]?.id || messagingState.contacts?.[0]?.id || 0) || 0;
    const targetUserId = Number(userId || messagingState.activeContactId || fallbackContactId || 0) || 0;
    if (targetUserId > 0) {
      await loadMessagingThread(targetUserId, { markRead: true, focusInput });
      requestAnimationFrame(() => scrollMessagingThreadToBottom());
    }
    startMessagingRefresh();
    return true;
  }

  function closeUserMessagesModal() {
    if (!messagingElements.modal) {
      return;
    }
    messagingElements.modal.setAttribute('aria-hidden', 'true');
    messagingElements.button?.setAttribute('aria-expanded', 'false');
    stopMessagingRefresh();
  }

  async function syncMessagingCloudAvailability({ refreshContacts = true } = {}) {
    const cloudReady = await refreshCloudModeState();
    if (!cloudReady || !window.messaging?.listContacts) {
      stopMessagingRefresh();
      if (isUserMessagesModalOpen()) {
        closeUserMessagesModal();
      }
      messagingState.contacts = [];
      messagingState.activeContactId = null;
      messagingState.activePartner = null;
      messagingState.threadMessages = [];
      messagingState.unreadTotal = 0;
      messagingState.onlineCount = 0;
      setMessagesHubButtonState(0, false);
      renderMessagingContacts();
      renderMessagingThread();
      renderMessagingStats();
      return false;
    }
    setMessagesHubButtonState(messagingState.unreadTotal, true);
    renderMessagingTexts();
    if (refreshContacts) {
      await refreshMessagingContacts({ preserveActive: true });
    }
    return true;
  }

  async function initializeMessagingHub() {
    renderMessagingTexts();
    if (messagingElements.button) {
      messagingElements.button.addEventListener('click', async () => {
        await openUserMessagesModal({ userId: messagingState.activeContactId || null, focusInput: false });
      });
    }
    if (messagingElements.modal) {
      messagingElements.modal.addEventListener('click', (event) => {
        if (event.target?.classList?.contains('modal-backdrop')) {
          closeUserMessagesModal();
        }
      });
    }
    if (messagingElements.close) {
      messagingElements.close.addEventListener('click', closeUserMessagesModal);
    }
    if (messagingElements.contacts) {
      messagingElements.contacts.addEventListener('click', async (event) => {
        const button = event.target.closest('[data-message-contact-id]');
        if (!button) {
          return;
        }
        const targetUserId = Number(button.getAttribute('data-message-contact-id') || 0) || 0;
        if (targetUserId > 0) {
          await loadMessagingThread(targetUserId, { markRead: true, focusInput: true });
        }
      });
    }
    messagingElements.filters.forEach((filterButton) => {
      filterButton.addEventListener('click', () => {
        messagingState.filter = String(filterButton.dataset.messageFilter || 'all').trim().toLowerCase() || 'all';
        messagingElements.filters.forEach((button) => button.classList.toggle('active', button === filterButton));
        renderMessagingContacts();
      });
    });
    if (messagingElements.searchInput) {
      messagingElements.searchInput.addEventListener('input', () => {
        messagingState.searchQuery = String(messagingElements.searchInput.value || '');
        renderMessagingContacts();
      });
    }
    if (messagingElements.threadSearchInput) {
      messagingElements.threadSearchInput.addEventListener('input', () => {
        messagingState.threadSearchQuery = String(messagingElements.threadSearchInput.value || '');
        renderMessagingThread();
        refreshMessagingThreadSearch({ preserveIndex: false, scroll: true });
      });
      messagingElements.threadSearchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          const step = event.shiftKey ? -1 : 1;
          setActiveMessagingThreadSearchMatch((messagingState.activeThreadSearchIndex < 0 ? 0 : messagingState.activeThreadSearchIndex + step), { scroll: true });
        }
      });
    }
    if (messagingElements.threadSearchPrev) {
      messagingElements.threadSearchPrev.addEventListener('click', () => {
        setActiveMessagingThreadSearchMatch((messagingState.activeThreadSearchIndex < 0 ? 0 : messagingState.activeThreadSearchIndex - 1), { scroll: true });
      });
    }
    if (messagingElements.threadSearchNext) {
      messagingElements.threadSearchNext.addEventListener('click', () => {
        setActiveMessagingThreadSearchMatch((messagingState.activeThreadSearchIndex < 0 ? 0 : messagingState.activeThreadSearchIndex + 1), { scroll: true });
      });
    }
    if (messagingElements.threadSearchClear) {
      messagingElements.threadSearchClear.addEventListener('click', () => {
        resetMessagingThreadSearch({ clearInput: true });
        renderMessagingThread();
        messagingElements.threadSearchInput?.focus();
      });
    }
    if (messagingElements.composer) {
      messagingElements.composer.addEventListener('submit', async (event) => {
        event.preventDefault();
        await sendMessagingMessage();
      });
    }
    if (messagingElements.input) {
      messagingElements.input.addEventListener('keydown', async (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          await sendMessagingMessage();
        }
      });
    }
    if (messagingElements.threadList) {
      messagingElements.threadList.addEventListener('scroll', async () => {
        const activeContactId = Number(messagingState.activeContactId || 0) || 0;
        if (!activeContactId || !isUserMessagesModalOpen() || !isMessagingThreadNearBottom()) {
          return;
        }
        const activeContact = findMessagingContact(activeContactId);
        const unreadCount = Math.max(0, Number(activeContact?.unread_count || 0) || 0);
        if (unreadCount > 0) {
          await markMessagingThreadRead(activeContactId, { silent: true });
          renderMessagingStats();
          renderMessagingContacts();
          renderMessagingThread();
          requestAnimationFrame(() => scrollMessagingThreadToBottom());
        }
      }, { passive: true });
    }
    await syncMessagingCloudAvailability({ refreshContacts: true });
  }
  
  const content = document.getElementById('content-area');
  const tabs = document.querySelectorAll('.sidebar .tab');
  const navGroups = document.querySelectorAll('.sidebar .nav-group');
  const dailyOpsGroupBadge = document.getElementById('dailyOpsOrdersBadge');
  const accountsGroupBadge = document.getElementById('accountsGroupBadge');
  const partiesGroupBadge = document.getElementById('partiesGroupBadge');
  const badgeByType = {
    orders: document.getElementById('tabOrdersBadge'),
    salesInvoice: document.getElementById('tabSalesInvoiceBadge'),
    purchaseInvoice: document.getElementById('tabPurchaseInvoiceBadge'),
    receipt: document.getElementById('tabReceiptBadge'),
    voucher: document.getElementById('tabVoucherBadge'),
    journal: document.getElementById('tabJournalBadge'),
    customers: document.getElementById('tabCustomersBadge'),
    suppliers: document.getElementById('tabSuppliersBadge'),
    opening: document.getElementById('tabOpeningBadge'),
    accounts: document.getElementById('tabAccountsBadge'),
    goldItems: document.getElementById('tabGoldItemsBadge'),
    users: document.getElementById('tabUsersBadge'),
    companySettings: document.getElementById('tabCompanySettingsBadge'),
    taxDeclaration: document.getElementById('tabTaxDeclarationBadge'),
  };

  const unreadState = {
    orders: 0,
    salesInvoice: 0,
    purchaseInvoice: 0,
    receipt: 0,
    voucher: 0,
    journal: 0,
    customers: 0,
    suppliers: 0,
    opening: 0,
    accounts: 0,
    goldItems: 0,
    users: 0,
    companySettings: 0,
    taxDeclaration: 0,
  };

  const knownIdsByType = {
    orders: [],
    ordersCompleted: [],
    salesInvoice: [],
    purchaseInvoice: [],
    receipt: [],
    voucher: [],
    journal: [],
    customers: [],
    suppliers: [],
    opening: [],
    accounts: [],
    goldItems: [],
    users: [],
    companySettings: [],
    taxDeclaration: [],
  };

  let knownCloudEventIds = [];

  function saveUnreadState() {
    localStorage.setItem(DAILY_OPS_UNREAD_STORAGE_KEY, JSON.stringify(unreadState));
    localStorage.setItem(ORDERS_NOTIF_STORAGE_KEY, String(normalizeUnreadCount(unreadState.orders)));
  }

  function loadUnreadStateFromStorage() {
    try {
      const raw = localStorage.getItem(DAILY_OPS_UNREAD_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        Object.keys(unreadState).forEach((k) => {
          unreadState[k] = normalizeUnreadCount(parsed?.[k]);
        });
      }
    } catch (_) {}

    const legacyOrders = normalizeUnreadCount(localStorage.getItem(ORDERS_NOTIF_STORAGE_KEY));
    if (legacyOrders > unreadState.orders) {
      unreadState.orders = legacyOrders;
    }
  }

  function saveKnownIdsState() {
    localStorage.setItem(DAILY_OPS_KNOWN_IDS_STORAGE_KEY, JSON.stringify(knownIdsByType));
  }

  function loadKnownIdsState() {
    try {
      const raw = localStorage.getItem(DAILY_OPS_KNOWN_IDS_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      Object.keys(knownIdsByType).forEach((k) => {
        knownIdsByType[k] = Array.isArray(parsed?.[k]) ? parsed[k].map((v) => Number(v)).filter((v) => Number.isFinite(v) && v > 0) : [];
      });
    } catch (_) {}
  }

  function saveKnownCloudEventIdsState() {
    localStorage.setItem(DAILY_OPS_KNOWN_EVENT_IDS_STORAGE_KEY, JSON.stringify(knownCloudEventIds));
  }

  function loadKnownCloudEventIdsState() {
    try {
      const raw = localStorage.getItem(DAILY_OPS_KNOWN_EVENT_IDS_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      knownCloudEventIds = Array.isArray(parsed) ? parsed.map((v) => Number(v)).filter((v) => Number.isFinite(v) && v > 0) : [];
    } catch (_) {}
  }

  function markKnownId(type, id) {
    const docId = Number(id);
    if (!type || !Number.isFinite(docId) || docId <= 0 || !Array.isArray(knownIdsByType[type])) return;
    if (!knownIdsByType[type].includes(docId)) {
      knownIdsByType[type].push(docId);
      if (knownIdsByType[type].length > 2000) {
        knownIdsByType[type] = knownIdsByType[type].slice(-1500);
      }
      saveKnownIdsState();
    }
  }

  function isKnownId(type, id) {
    const docId = Number(id);
    if (!type || !Number.isFinite(docId) || docId <= 0 || !Array.isArray(knownIdsByType[type])) return false;
    return knownIdsByType[type].includes(docId);
  }

  function markKnownCloudEventId(eventId) {
    const normalizedEventId = Number(eventId);
    if (!Number.isFinite(normalizedEventId) || normalizedEventId <= 0) return;
    if (!knownCloudEventIds.includes(normalizedEventId)) {
      knownCloudEventIds.push(normalizedEventId);
      if (knownCloudEventIds.length > 4000) {
        knownCloudEventIds = knownCloudEventIds.slice(-3000);
      }
      saveKnownCloudEventIdsState();
    }
  }

  function isKnownCloudEventId(eventId) {
    const normalizedEventId = Number(eventId);
    if (!Number.isFinite(normalizedEventId) || normalizedEventId <= 0) return false;
    return knownCloudEventIds.includes(normalizedEventId);
  }

  function isCloudSyncPayload(payload) {
    const source = String(payload?.source || '').trim().toLowerCase();
    const action = String(payload?.action || '').trim().toLowerCase();
    return action === 'sync' || source === 'cloud-pull' || source === 'cloud-periodic';
  }

  function absorbKnownIdsFromCloudPayload(payload) {
    const tables = Array.isArray(payload?.tables) ? payload.tables : [];
    for (const tableName of tables) {
      const normalizedType = normalizeNotificationType(tableName) || normalizeNotificationType(payload?.entityType);
      if (!normalizedType) continue;
      const rows = getRowsForNotificationPayload(payload, tableName, normalizedType);
      for (const row of rows) {
        const docId = Number(
          row?.id || payload?.documentId || payload?.id || payload?.orderId || payload?.customerId || payload?.supplierId || 0
        );
        if (Number.isFinite(docId) && docId > 0) {
          markKnownId(normalizedType, docId);
        }
      }
    }
  }

  function renderBadgeCount(badge, count) {
    if (!badge) return;
    const normalized = normalizeUnreadCount(count);
    badge.hidden = normalized <= 0;
    badge.textContent = normalized > 99 ? '99+' : String(normalized);
  }

  function getDisplayedUnreadCount(type) {
    return isNotificationUiEnabledForType(type) ? normalizeUnreadCount(unreadState[type]) : 0;
  }

  function renderAllUnreadBadges() {
    Object.entries(badgeByType).forEach(([type, badge]) => {
      renderBadgeCount(badge, getDisplayedUnreadCount(type));
    });
    // Daily ops group badge (excludes customers)
    const dailyOpsTotal = ['orders', 'salesInvoice', 'purchaseInvoice', 'receipt', 'voucher', 'journal']
      .reduce((sum, k) => sum + getDisplayedUnreadCount(k), 0);
    renderBadgeCount(dailyOpsGroupBadge, dailyOpsTotal);
    const accountsTotal = getDisplayedUnreadCount('accounts') + getDisplayedUnreadCount('opening');
    renderBadgeCount(accountsGroupBadge, accountsTotal);
    // Parties group badge (customers + suppliers)
    const partiesTotal = getDisplayedUnreadCount('customers') + getDisplayedUnreadCount('suppliers');
    renderBadgeCount(partiesGroupBadge, partiesTotal);
  }

  function setUnreadCount(type, count) {
    if (!Object.prototype.hasOwnProperty.call(unreadState, type)) return;
    unreadState[type] = normalizeUnreadCount(count);
    saveUnreadState();
    renderAllUnreadBadges();
  }

  function incrementUnreadCount(type, delta = 1, isCompletion = false) {
    if (!Object.prototype.hasOwnProperty.call(unreadState, type)) return;
    const inc = normalizeUnreadCount(delta);
    if (inc <= 0) return;
    setUnreadCount(type, unreadState[type] + inc);
    
    // إضافة class خاص لشارة اكتمال الأوردر (لون مختلف)
    if (isCompletion && type === 'orders') {
      const badge = document.querySelector('#tab-orders .unread-badge');
      if (badge) {
        badge.classList.add('completion-badge');
      }
    }
  }

  function clearUnreadForTab(tabId) {
    const type = DAILY_OPS_TAB_TO_TYPE[tabId];
    if (!type) return;
    setUnreadCount(type, 0);
  }

  function playNotificationSound() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      const beep = (freq, start, duration = 0.08) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(0.12, start + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + duration + 0.01);
      };

      beep(920, now, 0.08);
      beep(1180, now + 0.09, 0.1);

      setTimeout(() => {
        try { ctx.close(); } catch (_) {}
      }, 260);
    } catch (_) {}
  }

  function ensureToastHost() {
    let host = document.getElementById('globalNotifToastHost');
    if (!host) {
      host = document.createElement('div');
      host.id = 'globalNotifToastHost';
      host.className = 'global-notif-toast-host';
      document.body.appendChild(host);
    }
    return host;
  }

  function getOperationLabel(type) {
    const isEn = getCurrentMainLang() === 'en';
    const labels = {
      customer: isEn ? 'Customer' : 'عميل',
      customers: isEn ? 'Customer' : 'عميل',
      supplier: isEn ? 'Supplier' : 'مورد',
      suppliers: isEn ? 'Supplier' : 'مورد',
      opening: isEn ? 'Opening Balance' : 'رصيد افتتاحي',
      accounts: isEn ? 'Account' : 'حساب',
      orders: isEn ? 'Order' : 'أوردر',
      ordersCompleted: isEn ? 'Order Completed' : 'أوردر مكتمل',
      receipt: isEn ? 'Receipt Voucher' : 'سند قبض',
      voucher: isEn ? 'Payment Voucher' : 'سند صرف',
      journal: isEn ? 'Journal Entry' : 'قيد يومية',
      salesInvoice: isEn ? 'Sales Invoice' : 'فاتورة بيع',
      purchaseInvoice: isEn ? 'Purchase Invoice' : 'فاتورة شراء',
      goldItems: isEn ? 'Gold Item' : 'صنف عيار',
      users: isEn ? 'User' : 'مستخدم',
      companySettings: isEn ? 'Company Settings' : 'إعدادات الشركة',
      taxDeclaration: isEn ? 'Tax Declaration' : 'إقرار ضريبي',
    };
    return labels[type] || type;
  }

  function getActionLabel(action) {
    const normalizedAction = String(action || 'insert').trim().toLowerCase();
    const isEn = getCurrentMainLang() === 'en';
    const labels = {
      insert: isEn ? 'added' : 'بإضافة',
      update: isEn ? 'updated' : 'بتعديل',
      delete: isEn ? 'deleted' : 'بحذف',
    };
    return labels[normalizedAction] || labels.insert;
  }

  function showTopNotificationToast(payload) {
    const host = ensureToastHost();
    const type = payload?.type;
    const operationLabel = getOperationLabel(type);
    const userName = String(payload?.userName || payload?.username || payload?.actorName || '').trim() || (getCurrentMainLang() === 'en' ? 'Unknown user' : 'مستخدم غير معروف');
    const docId = Number(payload?.documentId || payload?.id || 0);
    const displayDocId = Number(
      payload?.displayDocumentId
      || payload?.displayNumber
      || payload?.branch_local_number
      || payload?.branchLocalNumber
      || payload?.manual_number
      || payload?.manualNumber
      || docId
      || 0
    );
    const idText = Number.isFinite(displayDocId) && displayDocId > 0 ? String(displayDocId) : (Number.isFinite(docId) && docId > 0 ? String(docId) : '?');
    const isEn = getCurrentMainLang() === 'en';
    const actionLabel = getActionLabel(payload?.action);
    const message = isEn
      ? `User: ${userName} ${actionLabel} ${operationLabel} #${idText}`
      : `قام المستخدم: ${userName} ${actionLabel} ${operationLabel} رقم ${idText}`;

    const toast = document.createElement('div');
    toast.className = 'global-notif-toast';
    toast.innerHTML = `
      <div class="global-notif-toast-icon"><i class="fa-solid fa-bell"></i></div>
      <div class="global-notif-toast-body">
        <div class="global-notif-toast-title">${isEn ? 'New Activity' : 'نشاط جديد'}</div>
        <div class="global-notif-toast-text">${message}</div>
      </div>
    `;

    host.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 260);
    }, 5000);
  }

  function applyUnreadStateFromStorage() {
    loadUnreadStateFromStorage();
    renderAllUnreadBadges();
  }

  loadKnownIdsState();
  loadKnownCloudEventIdsState();
  applyUnreadStateFromStorage();
  await refreshCloudModeState();
  if (!currentCloudModeActive && localStorage.getItem(DAILY_OPS_BOOTSTRAP_STORAGE_KEY) !== '1') {
    pollDailyOpsSources();
  }

  async function resolveActorNameForType(type, id) {
    const docId = Number(id);
    if (!Number.isFinite(docId) || docId <= 0) return '';
    try {
      if (type === 'salesInvoice' && window.salesInvoice?.get) {
        const res = await window.salesInvoice.get(docId);
        const h = res?.invoice || res?.data?.header || {};
        return String(h.modified_by_name || h.modified_by_username || h.created_by_name || h.created_by_username || '').trim();
      }
      if (type === 'purchaseInvoice' && window.purchaseInvoice?.get) {
        const res = await window.purchaseInvoice.get(docId);
        const h = res?.invoice || res?.data?.header || {};
        return String(h.modified_by_name || h.modified_by_username || h.created_by_name || h.created_by_username || '').trim();
      }
      if (type === 'receipt' && window.receipt?.get) {
        const res = await window.receipt.get(docId);
        const h = res?.data?.header || {};
        return String(h.updated_by_name || h.updated_by_username || h.created_by_name || h.created_by_username || '').trim();
      }
      if (type === 'voucher' && window.voucher?.get) {
        const res = await window.voucher.get(docId);
        const h = res?.data?.header || {};
        return String(h.updated_by_name || h.updated_by_username || h.created_by_name || h.created_by_username || '').trim();
      }
      if (type === 'journal' && window.journal?.getJournalEntry) {
        const res = await window.journal.getJournalEntry(docId);
        const h = res?.data || {};
        return String(h.updated_by_name || h.updated_by_username || h.created_by_name || h.created_by_username || '').trim();
      }
      if (type === 'opening' && window.opening?.get) {
        const res = await window.opening.get(docId);
        const h = res?.data?.header || {};
        return String(h.updated_by_name || h.updated_by_username || h.created_by_name || h.created_by_username || '').trim();
      }
    } catch (_) {}
    return '';
  }

  async function resolveDisplayDocumentIdForType(type, id, payload = {}) {
    const directDisplayId = Number(
      payload?.displayDocumentId
      || payload?.displayNumber
      || payload?.branch_local_number
      || payload?.branchLocalNumber
      || payload?.manual_number
      || payload?.manualNumber
      || 0
    );
    if (Number.isFinite(directDisplayId) && directDisplayId > 0) {
      return directDisplayId;
    }

    const docId = Number(id);
    if (!Number.isFinite(docId) || docId <= 0) return 0;

    try {
      if (type === 'salesInvoice' && window.salesInvoice?.get) {
        const res = await window.salesInvoice.get(docId);
        const h = res?.invoice || res?.data?.header || {};
        return Number(h.branch_local_number || 0) || docId;
      }
      if (type === 'purchaseInvoice' && window.purchaseInvoice?.get) {
        const res = await window.purchaseInvoice.get(docId);
        const h = res?.invoice || res?.data?.header || {};
        return Number(h.branch_local_number || 0) || docId;
      }
      if (type === 'receipt' && window.receipt?.get) {
        const res = await window.receipt.get(docId);
        const h = res?.data?.header || {};
        return Number(h.branch_local_number || 0) || docId;
      }
      if (type === 'voucher' && window.voucher?.get) {
        const res = await window.voucher.get(docId);
        const h = res?.data?.header || {};
        return Number(h.branch_local_number || 0) || docId;
      }
      if (type === 'journal' && window.journal?.getJournalEntry) {
        const res = await window.journal.getJournalEntry(docId);
        const h = res?.data || {};
        return Number(h.manual_number || 0) || docId;
      }
      if (type === 'opening' && window.opening?.get) {
        const res = await window.opening.get(docId);
        const h = res?.data?.header || {};
        return Number(h.branch_local_number || 0) || docId;
      }
    } catch (_) {}

    return docId;
  }

  async function notifyNewRecord({ type, documentId, userName, payload = null, alwaysToast = true, originDeviceId = null, actorUserId = null, action, eventId = null }) {
    if (!type) return;
    
    // للأوردرات من المستخدمين، استخدم ordersFromUsers
    const subType = (type === 'orders') ? 'ordersFromUsers' : null;
    
    const canShowUi = shouldShowNotification(type, originDeviceId, subType, actorUserId);
    
    const docId = Number(documentId);
    const normalizedEventId = Number(eventId);
    if (action === 'insert' && Number.isFinite(normalizedEventId) && normalizedEventId > 0) {
      if (isKnownCloudEventId(normalizedEventId)) return;
      markKnownCloudEventId(normalizedEventId);
      if (Number.isFinite(docId) && docId > 0) {
        markKnownId(type, docId);
      }
    } else if (Number.isFinite(docId) && docId > 0) {
      if (action === 'insert') {
        if (isKnownId(type, docId)) return;
        markKnownId(type, docId);
      } else if (!isKnownId(type, docId)) {
        markKnownId(type, docId);
      }
    }

    if (!canShowUi) {
      shellLog('[Shell] Skipping notifyNewRecord UI - notification disabled for type:', type, 'action:', action);
      return;
    }

    const activeTab = document.querySelector('.sidebar .tab.active');
    const activeType = activeTab ? DAILY_OPS_TAB_TO_TYPE[activeTab.id] : null;
    if (activeType !== type) {
      incrementUnreadCount(type, 1);
    }

    let actor = String(userName || '').trim();
    if (!actor && Number.isFinite(docId) && docId > 0) {
      actor = await resolveActorNameForType(type, docId);
    }

    const displayDocumentId = await resolveDisplayDocumentIdForType(type, docId, {
      displayDocumentId: payload?.displayDocumentId,
      displayNumber: payload?.displayNumber,
      branch_local_number: payload?.branch_local_number,
      branchLocalNumber: payload?.branchLocalNumber,
      manual_number: payload?.manual_number,
      manualNumber: payload?.manualNumber,
    });

    if (alwaysToast) {
      showTopNotificationToast({ type, documentId: docId, displayDocumentId, userName: actor, action });
    }
    playNotificationSound();
  }

  // دالة خاصة لإشعارات اكتمال الأوردر (لون مختلف)
  async function notifyOrderCompletion({ documentId, userName, originDeviceId = null, actorUserId = null }) {
    const canShowUi = shouldShowNotification(null, originDeviceId, 'ordersCompleted', actorUserId);
    
    const docId = Number(documentId);
    if (Number.isFinite(docId) && docId > 0) {
      if (isKnownId('ordersCompleted', docId)) return;
      markKnownId('ordersCompleted', docId);
    }

    if (!canShowUi) {
      shellLog('[Shell] Skipping order completion UI - notification disabled');
      return;
    }

    const activeTab = document.querySelector('.sidebar .tab.active');
    if (!activeTab || activeTab.id !== 'tab-orders') {
      incrementUnreadCount('orders', 1, true); // true = شارة اكتمال بلون مختلف
    }

    let actor = String(userName || '').trim();
    showTopNotificationToast({ type: 'ordersCompleted', documentId: docId, displayDocumentId: docId, userName: actor });
    playNotificationSound();
  }

  async function fetchRecordsForType(type) {
    try {
      if (type === 'receipt' && window.receipt?.list) {
        const res = await window.receipt.list({ forceFresh: true });
        const rows = Array.isArray(res?.data) ? res.data : [];
        return rows.map((r) => ({ id: Number(r.id), userName: '' })).filter((r) => Number.isFinite(r.id) && r.id > 0);
      }
      if (type === 'voucher' && window.voucher?.list) {
        const res = await window.voucher.list({ forceFresh: true });
        const rows = Array.isArray(res?.data) ? res.data : [];
        return rows.map((r) => ({ id: Number(r.id), userName: '' })).filter((r) => Number.isFinite(r.id) && r.id > 0);
      }
      if (type === 'journal' && window.journal?.listJournalEntries) {
        const res = await window.journal.listJournalEntries({ forceFresh: true });
        const rows = Array.isArray(res?.data) ? res.data : [];
        return rows.map((r) => ({ id: Number(r.id), userName: '' })).filter((r) => Number.isFinite(r.id) && r.id > 0);
      }
      if (type === 'salesInvoice' && window.salesInvoice?.list) {
        const res = await window.salesInvoice.list({ forceFresh: true });
        const rows = Array.isArray(res?.rows) ? res.rows : [];
        return rows.map((r) => ({ id: Number(r.id), userName: r.created_by_name || '' })).filter((r) => Number.isFinite(r.id) && r.id > 0);
      }
      if (type === 'purchaseInvoice' && window.purchaseInvoice?.list) {
        const res = await window.purchaseInvoice.list({ forceFresh: true });
        const rows = Array.isArray(res?.rows) ? res.rows : [];
        return rows.map((r) => ({ id: Number(r.id), userName: r.created_by_name || '' })).filter((r) => Number.isFinite(r.id) && r.id > 0);
      }
      if (type === 'customers' && window.db?.getCustomers) {
        const res = await window.db.getCustomers({ forceFresh: true });
        const rows = Array.isArray(res?.data) ? res.data : [];
        return rows.map((r) => ({ id: Number(r.id), userName: r.created_by_name || '' })).filter((r) => Number.isFinite(r.id) && r.id > 0);
      }
      if (type === 'suppliers' && window.suppliers?.getSuppliers) {
        const res = await window.suppliers.getSuppliers({ forceFresh: true });
        const rows = Array.isArray(res?.data) ? res.data : [];
        return rows.map((r) => ({ id: Number(r.id), userName: r.created_by_name || '' })).filter((r) => Number.isFinite(r.id) && r.id > 0);
      }
      if (type === 'opening' && window.opening?.list) {
        const res = await window.opening.list({ forceFresh: true });
        const rows = Array.isArray(res?.data) ? res.data : [];
        return rows.map((r) => ({ id: Number(r.id), userName: '' })).filter((r) => Number.isFinite(r.id) && r.id > 0);
      }
    } catch (_) {}
    return [];
  }

  async function pollDailyOpsSources() {
    const typesToPoll = ['receipt', 'voucher', 'journal', 'salesInvoice', 'purchaseInvoice', 'customers', 'suppliers', 'opening'];
    const isBootstrapped = localStorage.getItem(DAILY_OPS_BOOTSTRAP_STORAGE_KEY) === '1';

    for (const type of typesToPoll) {
      const records = await fetchRecordsForType(type);
      if (!records.length) continue;

      if (!isBootstrapped) {
        records.forEach((r) => markKnownId(type, r.id));
        continue;
      }

      const sorted = records.slice().sort((a, b) => a.id - b.id);
      for (const record of sorted) {
        if (isKnownId(type, record.id)) continue;
        await notifyNewRecord({ type, documentId: record.id, userName: record.userName, alwaysToast: true });
      }
    }

    if (!isBootstrapped) {
      localStorage.setItem(DAILY_OPS_BOOTSTRAP_STORAGE_KEY, '1');
      saveKnownIdsState();
    }
  }

  window.addEventListener('message', async (event) => {
    const data = event?.data;
    if (!data) return;

    // تحديث مؤشر قاعدة البيانات فوراً عند تغيير الوضع
    if (data.type === 'db-mode-changed') {
      updateDbModeIndicator();
      refreshCloudModeState();
      syncMessagingCloudAvailability({ refreshContacts: true });
      return;
    }

    if (data.type === 'notification-settings-updated') {
      await loadNotificationConfig();
      renderAllUnreadBadges();
      return;
    }

    if (data.type === 'orders-completed-notification') {
      const originDeviceId = data.originDeviceId || null;
      if (!originDeviceId || (currentDeviceId && originDeviceId === currentDeviceId)) {
        return;
      }
      // إشعار اكتمال الأوردر - يستخدم ordersCompleted
      const docId = Number(data.documentId || data.id || 0);
      if (Number.isFinite(docId) && docId > 0) {
        notifyOrderCompletion({
          documentId: docId,
          userName: data.userName,
          originDeviceId,
          actorUserId: data.actorUserId,
        });
        return;
      }

      // التحقق من إعدادات الإشعارات - ordersCompleted
      if (!shouldShowNotification(null, originDeviceId, 'ordersCompleted', data.actorUserId)) {
        return;
      }
      incrementUnreadCount('orders', data.delta || 1, true); // true = لون مختلف
      playNotificationSound();
    }
    if (data.type === 'daily-ops-notification') {
      const originDeviceId = data.originDeviceId || null;
      if (!originDeviceId || (currentDeviceId && originDeviceId === currentDeviceId)) {
        return;
      }
      notifyNewRecord({
        type: data.entityType,
        documentId: data.documentId,
        userName: data.userName,
        payload: data,
        alwaysToast: true,
        originDeviceId,
        actorUserId: data.actorUserId,
        action: data.action || 'insert',
        eventId: data.eventId,
      });
    }
  });

  window.addEventListener('storage', (event) => {
    if (event.key === ORDERS_NOTIF_STORAGE_KEY || event.key === DAILY_OPS_UNREAD_STORAGE_KEY) applyUnreadStateFromStorage();
    if (event.key === DAILY_OPS_KNOWN_IDS_STORAGE_KEY) loadKnownIdsState();
    if (event.key === DAILY_OPS_KNOWN_EVENT_IDS_STORAGE_KEY) loadKnownCloudEventIdsState();
  });

  window.addEventListener('focus', async () => {
    // إعادة تحميل إعدادات الإشعارات عند العودة للنافذة
    await loadNotificationConfig();
    updateDbModeIndicator();
    await syncMessagingCloudAvailability({ refreshContacts: true });
    applyUnreadStateFromStorage();
  });

  // إعادة تحميل الإعدادات عند تغيير الرؤية (التبديل بين الشاشات)
  document.addEventListener('visibilitychange', async () => {
    if (document.visibilityState === 'visible') {
      await loadNotificationConfig();
      updateDbModeIndicator();
      await syncMessagingCloudAvailability({ refreshContacts: true });
      applyUnreadStateFromStorage();
    }
  });

  const notifSyncInterval = setInterval(() => {
    applyUnreadStateFromStorage();
  }, 15000);
  window.addEventListener('beforeunload', () => {
    clearInterval(notifSyncInterval);
    stopCloudUsersRefresh();
    stopMessagingRefresh();
    try {
      const api = window.api || window.cloudDatabase;
      api?.clearCloudPresence?.();
    } catch (_) {}
  });

  if (window.api && typeof window.api.on === 'function') {
    window.api.on('orders-updated', (payload) => {
      const originDeviceId = payload?.originDeviceId || null;
      if (!originDeviceId || (currentDeviceId && originDeviceId === currentDeviceId)) {
        return;
      }
      const status = String(payload?.status || payload?.type || '').toLowerCase();
      if (status !== 'completed') return;

      // إشعار اكتمال الأوردر - يستخدم ordersCompleted
      const orderId = Number(payload?.id || payload?.orderId || 0);
      if (Number.isFinite(orderId) && orderId > 0) {
        notifyOrderCompletion({
          documentId: orderId,
          userName: payload?.userName,
          originDeviceId,
          actorUserId: payload?.actorUserId,
        });
        return;
      }

      const activeTab = document.querySelector('.sidebar .tab.active');
      if (activeTab && activeTab.id === 'tab-orders') {
        applyUnreadStateFromStorage();
        return;
      }

      // التحقق من إعدادات الإشعارات قبل إظهار إشعار اكتمال الأوردر
      if (!shouldShowNotification(null, originDeviceId, 'ordersCompleted', payload?.actorUserId)) {
        shellLog('[Shell] Skipping orders completion notification - disabled');
        return;
      }
      incrementUnreadCount('orders', 1, true); // true = لون مختلف
      playNotificationSound();
    });

    // ===== WA State Cache - نحتفظ بآخر حالة لإرسالها عند تحميل الشاشة =====
    const waStateCache = { lastEvent: null, lastPayload: null };

    function relayWaEventToActiveScreen(type, payload) {
      try {
        // احفظ آخر حدث مهم
        if (['wa:connected', 'wa:disconnected', 'wa:qr-update', 'wa:error', 'wa:auth-failure'].includes(type)) {
          waStateCache.lastEvent = type;
          waStateCache.lastPayload = payload;
        }
        const iframe = document.querySelector('#content-area iframe');
        const targetWindow = iframe?.contentWindow;
        if (!targetWindow) return;
        targetWindow.postMessage({ type, payload }, '*');
      } catch (_) {}
    }

    ['wa:qr-update', 'wa:connected', 'wa:disconnected', 'wa:auth-failure', 'wa:error', 'wa:initializing', 'wa:loading'].forEach(channel => {
      window.api.on(channel, (data) => {
        console.log('[Shell] WA event received:', channel, data ? JSON.stringify(data).substring(0, 80) : '');
        relayWaEventToActiveScreen(channel, data);
      });
    });

    window.api.on('cloud-data-updated', async (payload) => {
      shellLog('[Shell] Received cloud-data-updated:', JSON.stringify(payload));
      if (!shouldHandleCloudPayloadForCurrentBranch(payload)) {
        shellLog('[Shell] Skipping cloud-data-updated for different branch');
        return;
      }
      const tables = Array.isArray(payload?.tables) ? payload.tables : [];
      if (tables.includes('branches') || tables.includes('currencies')) {
        const syncedCurrencies = await syncBranchCurrencySettingsToStorage({ forceFresh: true });
        if (syncedCurrencies) {
          notifyActiveScreenCurrenciesUpdated();
        }
      }
      relayCloudDataUpdatedToActiveScreen(payload);
      if (tables.includes('user_messages')) {
        await handleMessagingCloudPayload(payload);
        if (tables.length === 1) {
          return;
        }
      }
      
      // التحقق من أن الإشعار ليس من نفس الجهاز
      const originDeviceId = payload?.originDeviceId;
      if (originDeviceId && currentDeviceId && originDeviceId === currentDeviceId) {
        shellLog('[Shell] Skipping notification UI - same device');
        return;
      }
      
      // التحقق من أن الإشعارات مفعلة
      if (!notificationSettings.enabled) {
        shellLog('[Shell] Notification UI disabled, invalidation relay continues');
      }
      
      if (!tables.length) {
        shellLog('[Shell] Skipping - no tables in payload');
        return;
      }
      if (isCloudSyncPayload(payload)) {
        absorbKnownIdsFromCloudPayload(payload);
        shellLog('[Shell] Skipping notification UI for sync payload');
        return;
      }
      let handledAny = false;
      for (const tableName of tables) {
        const normalizedType = normalizeNotificationType(tableName) || normalizeNotificationType(payload?.entityType);
        if (!normalizedType) continue;
        const rows = getRowsForNotificationPayload(payload, tableName, normalizedType);
        if (normalizedType === 'orders') {
          for (const row of rows) {
            const orderId = Number(row?.id || payload?.orderId || payload?.documentId || 0);
            const actorUserId = getActorUserIdFromRow(row, payload);
            if (!Number.isFinite(orderId) || orderId <= 0) continue;
            const status = String(row?.status || payload?.status || '').toLowerCase();
            if (status === 'completed') {
              await notifyOrderCompletion({
                documentId: orderId,
                userName: getActorNameFromRow(row, payload),
                originDeviceId,
                actorUserId,
              });
              handledAny = true;
              continue;
            }
            await notifyNewRecord({
              type: 'orders',
              documentId: orderId,
              userName: getActorNameFromRow(row, payload),
              payload,
              alwaysToast: true,
              originDeviceId,
              actorUserId,
              action: payload?.action,
              eventId: payload?.eventId,
            });
            handledAny = true;
          }
          continue;
        }
        for (const row of rows) {
          const docId = Number(row?.id || payload?.documentId || payload?.id || 0);
          const actorUserId = getActorUserIdFromRow(row, payload);
          if (!Number.isFinite(docId) || docId <= 0) continue;
          await notifyNewRecord({
            type: normalizedType,
            documentId: docId,
            userName: getActorNameFromRow(row, payload),
            payload,
            alwaysToast: true,
            originDeviceId,
            actorUserId,
            action: payload?.action,
            eventId: payload?.eventId,
          });
          handledAny = true;
        }
      }
      if (!handledAny) {
        shellLog('[Shell] No new cloud notification items to display');
      }
    });
  }

  // Load current user info
  let currentUser = null;
  let currentBranch = null;
  try {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      currentUser = JSON.parse(userData);
    }
  } catch (e) {
    
  }

  try {
    const branchData = localStorage.getItem('currentBranch');
    if (branchData) {
      currentBranch = JSON.parse(branchData);
    }
  } catch (e) {
    
  }

  if (currentUser && currentBranch && !currentUser.branch_id) {
    currentUser.branch_id = Number(currentBranch?.id || 0) || null;
  }
  window.currentBranchContext = currentBranch;
  let currentBranchScope = getStoredCurrentBranchScope();
  let accessibleBranches = [];
  window.currentBranchScopeContext = currentBranchScope;

  const branchScopeContainer = document.getElementById('branchScopeContainer');
  const branchScopeSelect = document.getElementById('topbarBranchScope');

  function getAllowedBranchIdsForCurrentUser() {
    const values = Array.isArray(currentUser?.allowed_branch_ids) ? currentUser.allowed_branch_ids : [];
    const normalized = values.map((value) => Number(value || 0)).filter((value) => Number.isFinite(value) && value > 0);
    if (normalized.length) {
      return normalized;
    }
    const fallbackBranchId = Number(currentBranch?.id || currentUser?.branch_id || currentUser?.default_branch_id || 0) || 0;
    return fallbackBranchId > 0 ? [fallbackBranchId] : [];
  }

  function getAllowedBranchAssignmentsForCurrentUser() {
    return Array.isArray(currentUser?.allowed_branches) ? currentUser.allowed_branches : [];
  }

  function getBranchAssignmentForCurrentUser(branchId) {
    const numericBranchId = Number(branchId || 0) || 0;
    if (!numericBranchId) {
      return null;
    }
    return getAllowedBranchAssignmentsForCurrentUser().find((branch) => Number(branch?.id || branch?.branch_id || 0) === numericBranchId) || null;
  }

  function mergeBranchWithAssignment(branch) {
    if (!branch || typeof branch !== 'object') {
      return branch || null;
    }
    const assignment = getBranchAssignmentForCurrentUser(branch?.id || branch?.branch_id);
    if (!assignment) {
      return branch;
    }
    return {
      ...branch,
      is_default: Number(assignment?.is_default || 0) === 1 ? 1 : Number(branch?.is_default || 0) || 0,
      can_login: Number(assignment?.can_login ?? branch?.can_login ?? 1) === 1 ? 1 : 0,
      read_only: Number(assignment?.read_only || 0) === 1 ? 1 : 0,
    };
  }

  async function persistCurrentBranch(branchId) {
    const numericBranchId = Number(branchId || 0) || 0;
    if (!numericBranchId) {
      return;
    }
    const matchedBranch = mergeBranchWithAssignment(
      accessibleBranches.find((branch) => Number(branch?.id || 0) === numericBranchId)
      || (currentBranch && Number(currentBranch?.id || 0) === numericBranchId ? currentBranch : null)
    );
    if (!matchedBranch) {
      return;
    }
    currentBranch = matchedBranch;
    window.currentBranchContext = currentBranch;
    localStorage.setItem('currentBranch', JSON.stringify(currentBranch));
    if (currentUser) {
      currentUser = {
        ...currentUser,
        branch_id: numericBranchId,
        branch_read_only: Number(matchedBranch?.read_only || 0) === 1 ? 1 : 0,
      };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }

    if (window.branches?.setCurrentBranchSession) {
      try {
        const result = await window.branches.setCurrentBranchSession(numericBranchId);
        if (result?.success && result?.user) {
          currentUser = {
            ...currentUser,
            ...result.user,
          };
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
        if (result?.success && result?.branch) {
          currentBranch = mergeBranchWithAssignment(result.branch) || currentBranch;
          window.currentBranchContext = currentBranch;
          localStorage.setItem('currentBranch', JSON.stringify(currentBranch));
        }
      } catch (_) {}
    }
  }

  function normalizeBranchScopeState(scope, fallbackBranchId = null) {
    const allowedBranchIds = getAllowedBranchIdsForCurrentUser();
    const resolvedFallbackBranchId = Number(fallbackBranchId || currentBranch?.id || currentUser?.branch_id || currentUser?.default_branch_id || allowedBranchIds[0] || 0) || null;
    const requestedMode = String(scope?.mode || scope?.scope || '').trim().toLowerCase() === 'all' ? 'all' : 'branch';
    const requestedBranchId = Number(scope?.branchId || scope?.branch_id || 0) || resolvedFallbackBranchId;
    const finalBranchId = allowedBranchIds.includes(requestedBranchId)
      ? requestedBranchId
      : (allowedBranchIds[0] || resolvedFallbackBranchId);
    const canUseAllBranches = allowedBranchIds.length > 1;
    return {
      mode: requestedMode === 'all' && canUseAllBranches ? 'all' : 'branch',
      branchId: finalBranchId || null,
      allowedBranchIds,
    };
  }

  function saveBranchScopeState(scope) {
    currentBranchScope = normalizeBranchScopeState(scope, scope?.branchId || scope?.branch_id || currentBranch?.id || null);
    window.currentBranchScopeContext = currentBranchScope;
    localStorage.setItem(CURRENT_BRANCH_SCOPE_KEY, JSON.stringify(currentBranchScope));
    return currentBranchScope;
  }

  function getBranchScopePayload() {
    return {
      branchScope: currentBranchScope?.mode || 'branch',
      branchId: Number(currentBranchScope?.branchId || currentBranch?.id || 0) || null,
      allowedBranchIds: getAllowedBranchIdsForCurrentUser(),
      currentBranch: currentBranch || null,
    };
  }

  function normalizeShellCurrencyRecord(currency = {}, index = 0, defaultCode = 'SAR') {
    const code = String(currency?.code || '').trim().toUpperCase();
    if (!code) {
      return null;
    }
    const numericRate = Number(currency?.rate ?? currency?.exchange_rate);
    return {
      id: Number(currency?.id || index + 1) || index + 1,
      code,
      name: String(currency?.name || currency?.name_ar || code).trim() || code,
      symbol: String(currency?.symbol || code).trim() || code,
      flag: String(currency?.flag || '🏳️').trim() || '🏳️',
      icon: String(currency?.icon || 'fa-dollar-sign').trim() || 'fa-dollar-sign',
      type: String(currency?.type || 'world').trim().toLowerCase() === 'arab' ? 'arab' : 'world',
      rate: Number.isFinite(numericRate) && numericRate > 0 ? numericRate : 1,
      isDefault: code === defaultCode,
      is_base: code === defaultCode,
    };
  }

  function writeCurrencySettingsToStorage(data = {}) {
    const sourceList = Array.isArray(data?.currencies) ? data.currencies : [];
    let defaultCode = String(data?.defaultCurrencyCode || data?.default_currency_code || data?.defaultCurrency?.code || '').trim().toUpperCase();
    if (!defaultCode) {
      defaultCode = String(sourceList.find((item) => item?.isDefault || item?.is_base)?.code || 'SAR').trim().toUpperCase() || 'SAR';
    }
    const normalized = sourceList
      .map((item, index) => normalizeShellCurrencyRecord(item, index, defaultCode))
      .filter(Boolean);
    if (!normalized.length) {
      return false;
    }
    if (!normalized.some((item) => item.code === defaultCode)) {
      defaultCode = normalized[0].code;
    }
    const currenciesPayload = normalized.map((item, index) => ({
      ...item,
      id: Number(item?.id || index + 1) || index + 1,
      isDefault: item.code === defaultCode,
      is_base: item.code === defaultCode,
    }));
    const defaultCurrency = currenciesPayload.find((item) => item.code === defaultCode) || currenciesPayload[0] || null;
    localStorage.setItem('currencies', JSON.stringify(currenciesPayload));
    localStorage.setItem('app_currencies', JSON.stringify(currenciesPayload));
    if (defaultCurrency) {
      localStorage.setItem('defaultCurrency', JSON.stringify(defaultCurrency));
      localStorage.setItem('app_base_currency_id', String(defaultCurrency.id));
    } else {
      localStorage.removeItem('defaultCurrency');
      localStorage.removeItem('app_base_currency_id');
    }
    return true;
  }

  async function syncBranchCurrencySettingsToStorage(options = {}) {
    try {
      if (!(window.api && typeof window.api.getCurrencySettings === 'function')) {
        return false;
      }
      const payload = options && typeof options === 'object' && options.payload && typeof options.payload === 'object'
        ? options.payload
        : {};
      const result = await window.api.getCurrencySettings({
        ...payload,
        forceFresh: Boolean(options?.forceFresh),
      });
      if (!(result && result.success && result.data)) {
        return false;
      }
      return writeCurrencySettingsToStorage(result.data);
    } catch (_) {
      return false;
    }
  }

  function notifyActiveScreenCurrenciesUpdated() {
    const iframe = document.querySelector('#content-area iframe');
    const targetWindow = iframe?.contentWindow;
    if (!targetWindow) {
      return;
    }
    try {
      if (typeof targetWindow.dispatchEvent === 'function') {
        targetWindow.dispatchEvent(new Event('currenciesUpdated'));
      }
    } catch (_) {}
    try {
      targetWindow.postMessage({ type: 'currencies-updated' }, '*');
    } catch (_) {}
  }

  function getBranchScopePrintValue(lang = getCurrentMainLang()) {
    const dict = mainTranslations[lang] || mainTranslations.ar;
    const activeScope = currentBranchScope || getStoredCurrentBranchScope() || { mode: 'branch', branchId: Number(currentBranch?.id || 0) || null };
    if (activeScope?.mode === 'all') {
      return dict.branchScopeAllOption || (lang === 'en' ? 'All Branches' : 'كل الفروع');
    }
    const branchId = Number(activeScope?.branchId || currentBranch?.id || 0) || 0;
    const branch = accessibleBranches.find(item => Number(item?.id || 0) === branchId)
      || currentBranch
      || getStoredCurrentBranch()
      || null;
    const branchCode = String(branch?.code || '').trim();
    const branchName = String((lang === 'en' ? branch?.name_en || branch?.name : branch?.name || branch?.name_en) || '').trim();
    if (branchCode && branchName) return `${branchCode} - ${branchName}`;
    return branchName || branchCode || dict.currentBranchFallback || (lang === 'en' ? 'Not selected' : 'غير محدد');
  }

  function escapePreviewHtmlText(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function injectBranchScopeIntoPreviewHtml(html) {
    if (typeof html !== 'string' || !html.trim() || html.includes('data-branch-scope-preview="1"') || html.includes('data-skip-branch-scope-badge="1"')) {
      return html;
    }
    const lang = getCurrentMainLang();
    const dict = mainTranslations[lang] || mainTranslations.ar;
    const branchScopeLabel = dict.branchScopeLabel || (lang === 'en' ? 'Branch Scope' : 'نطاق الفروع');
    const branchScopeValue = getBranchScopePrintValue(lang);
    const badgeStyle = `<style id="branch-scope-preview-style">.branch-scope-preview-badge{max-width:1200px;margin:12px auto 0;padding:10px 16px;border:1px solid rgba(15,23,42,.12);border-radius:12px;background:linear-gradient(135deg,rgba(16,185,129,.08) 0%,rgba(59,130,246,.08) 100%);display:flex;align-items:center;justify-content:space-between;gap:12px;font-family:Cairo,Arial,sans-serif;color:#0f172a}.branch-scope-preview-label{font-size:12px;font-weight:700;opacity:.8}.branch-scope-preview-value{font-size:13px;font-weight:800}@media print{.branch-scope-preview-badge{margin:0 0 10px 0;break-inside:avoid-page;page-break-inside:avoid}}</style>`;
    const badgeHtml = `<div class="branch-scope-preview-badge" data-branch-scope-preview="1"><span class="branch-scope-preview-label">${escapePreviewHtmlText(branchScopeLabel)}</span><span class="branch-scope-preview-value">${escapePreviewHtmlText(branchScopeValue)}</span></div>`;
    let nextHtml = html;
    if (/<\/head>/i.test(nextHtml)) {
      nextHtml = nextHtml.replace(/<\/head>/i, `${badgeStyle}</head>`);
    } else {
      nextHtml = `${badgeStyle}${nextHtml}`;
    }
    if (/<body[^>]*>/i.test(nextHtml)) {
      nextHtml = nextHtml.replace(/<body([^>]*)>/i, `<body$1>${badgeHtml}`);
    } else {
      nextHtml = `${badgeHtml}${nextHtml}`;
    }
    return nextHtml;
  }

  function renderBranchScopeSelector() {
    if (!branchScopeContainer || !branchScopeSelect) {
      return;
    }
    if (!accessibleBranches.length) {
      branchScopeContainer.hidden = true;
      branchScopeSelect.innerHTML = '';
      return;
    }

    const lang = getCurrentMainLang();
    const dict = mainTranslations[lang] || mainTranslations.ar;
    const activeScope = currentBranchScope || normalizeBranchScopeState({}, currentBranch?.id || accessibleBranches[0]?.id || null);
    const optionParts = [];

    if (accessibleBranches.length > 1) {
      optionParts.push(`<option value="all">${dict.branchScopeAllOption}</option>`);
    }

    for (const branch of accessibleBranches) {
      const branchId = Number(branch?.id || 0) || 0;
      if (!branchId) continue;
      const branchLabel = lang === 'en'
        ? (String(branch?.name_en || '').trim() || String(branch?.name || '').trim())
        : (String(branch?.name || '').trim() || String(branch?.name_en || '').trim());
      const prefix = String(branch?.code || '').trim();
      const text = prefix ? `${prefix} - ${branchLabel}` : branchLabel;
      optionParts.push(`<option value="branch:${branchId}">${text}</option>`);
    }

    branchScopeSelect.innerHTML = optionParts.join('');
    branchScopeSelect.disabled = accessibleBranches.length <= 1;
    branchScopeContainer.hidden = false;
    const selectedValue = activeScope.mode === 'all' && accessibleBranches.length > 1
      ? 'all'
      : `branch:${Number(activeScope.branchId || accessibleBranches[0]?.id || 0) || 0}`;
    branchScopeSelect.value = selectedValue;
  }

  function relayBranchScopeToWindow(targetWindow) {
    try {
      if (!targetWindow) return;
      targetWindow.currentBranchContext = currentBranch;
      targetWindow.currentBranchScopeContext = currentBranchScope;
      targetWindow.postMessage({ type: 'branch-scope-changed', payload: getBranchScopePayload() }, '*');
    } catch (_) {}
  }

  function relayBranchScopeToActiveScreen() {
    const iframe = document.querySelector('#content-area iframe');
    relayBranchScopeToWindow(iframe?.contentWindow);
  }

  async function initializeBranchScopeSelector() {
    const allowedBranchIds = getAllowedBranchIdsForCurrentUser();
    let branches = [];

    try {
      if (window.branches?.getBranches) {
        const result = await window.branches.getBranches({ activeOnly: true });
        if (result?.success && Array.isArray(result.data)) {
          branches = result.data;
        }
      }
    } catch (_) {}

    accessibleBranches = branches
      .filter((branch) => allowedBranchIds.includes(Number(branch?.id || 0)))
      .map((branch) => mergeBranchWithAssignment(branch));

    if (!accessibleBranches.length && currentBranch) {
      accessibleBranches = [mergeBranchWithAssignment(currentBranch)];
    }

    const fallbackBranch = accessibleBranches.find((branch) => Number(branch?.id || 0) === Number(currentBranch?.id || currentUser?.branch_id || 0))
      || accessibleBranches[0]
      || currentBranch
      || null;

    if (fallbackBranch) {
      await persistCurrentBranch(fallbackBranch.id);
    }

    saveBranchScopeState(currentBranchScope || {
      mode: 'branch',
      branchId: Number(fallbackBranch?.id || currentBranch?.id || currentUser?.branch_id || 0) || null,
    });

    if (currentBranchScope?.branchId) {
      await persistCurrentBranch(currentBranchScope.branchId);
    }

    await syncBranchCurrencySettingsToStorage();
    renderBranchScopeSelector();
  }

  function updateTopbarUserName(lang = getCurrentMainLang()) {
    if (!usernameElement) return;
    if (!currentUser) {
      usernameElement.textContent = lang === 'en' ? 'User' : 'مستخدم';
      return;
    }

    let displayName = '';
    if (lang === 'en') {
      displayName = (currentUser.full_name_en && String(currentUser.full_name_en).trim())
        || (currentUser.username && String(currentUser.username).trim())
        || (currentUser.full_name && String(currentUser.full_name).trim())
        || 'User';
    } else {
      displayName = (currentUser.full_name && String(currentUser.full_name).trim())
        || (currentUser.username && String(currentUser.username).trim())
        || (currentUser.full_name_en && String(currentUser.full_name_en).trim())
        || 'مستخدم';
    }

    usernameElement.textContent = displayName;
  }

  // Apply language based on stored uiLang
  const initialLang = getCurrentMainLang();
  applyMainLanguage(initialLang);

  // Update username display (Arabic vs English)
  const usernameElement = document.querySelector('.username');
  updateTopbarUserName(initialLang);

  // Permissions mapping: tab-id -> required permission(s) - يمكن أن تكون صلاحية واحدة أو مصفوفة
  const permissionsMap = {
    'tab-dashboard': ['dashboard_view', 'dashboard_view_statistics'],
    'tab-accounts': 'accounts_view',
    'tab-customers': 'customers_view',
    'tab-suppliers': 'suppliers_view',
    'tab-voucher': 'vouchers_view',
    'tab-receipt': 'receipts_view',
    'tab-sales-invoice': 'sales_invoices_view',
    'tab-purchase-invoice': 'purchase_invoices_view',
    'tab-orders': ['orders_view', 'orders_add', 'orders_edit', 'orders_delete', 'orders_export'],
    'tab-sales-purchase-movement': ['sales_purchase_movement_view', 'sales_purchase_movement_export'],
    'tab-movement': 'movement_view',
    'tab-reports': ['reports_view_statement', 'reports_view_trial_balance', 'reports_view_income_statement', 'reports_view_balance_sheet', 'reports_export'],
    'tab-quick-statement': 'reports_view_quick_statement',
    'tab-category-report': 'reports_view_category_report',
    'tab-tax-report': 'reports_view_tax_report',
    'tab-tax-declaration': 'tax_declaration_view',
    'tab-trial-balance': 'reports_view_trial_balance',
    'tab-income-statement': 'reports_view_income_statement',
    'tab-balance-sheet': 'reports_view_balance_sheet',
    'tab-general-ledger': 'reports_view_general_ledger',
    'tab-opening': 'opening_view',
    'tab-journal': 'journal_view',
    'tab-gold-items': 'gold_items_view',
    'tab-branches': 'branches_view',
    'tab-users': ['users_view', 'users_manage_permissions'],
    'tab-open-positions': 'open_positions_view',
    'tab-company-settings': ['settings_view', 'settings_edit', 'settings_backup', 'settings_restore'],
    'tab-cloud-settings': ['cloud_settings_view', 'cloud_settings_edit', 'cloud_settings_sync', 'cloud_settings_upload', 'cloud_settings_local_connect'],
  };

  // Check user permissions and hide unauthorized tabs
  async function applyPermissions() {
    if (!currentUser) {
      window.location.href = '../login/index.html';
      return;
    }

    if (!window.api || !window.api.invoke) {
      return;
    }

    // Load all user permissions and store them globally
    try {
      const result = await window.permissions?.getUserPermissions?.(currentUser.id);
      
      if (result && result.success && Array.isArray(result.data) && result.data.length > 0) {
        window.userPermissions = result.data.map(row => row.name);
      } else {
        window.userPermissions = [];
      }
    } catch (error) {
      console.error('Error loading user permissions:', error);
      window.userPermissions = [];
    }

    const granted = new Set(Array.isArray(window.userPermissions) ? window.userPermissions : []);
    for (const [tabId, permissions] of Object.entries(permissionsMap)) {
      const tab = document.getElementById(tabId);
      if (!tab) continue;

      const permList = Array.isArray(permissions) ? permissions : [permissions];
      const hasAnyPermission = permList.some(p => granted.has(p));
      tab.style.display = hasAnyPermission ? '' : 'none';
    }
  }

  // Apply permissions on load
  await applyPermissions();
  await initializeBranchScopeSelector();
  await initializeMessagingHub();

  if (branchScopeSelect) {
    branchScopeSelect.addEventListener('change', async () => {
      const rawValue = String(branchScopeSelect.value || '').trim();
      const nextScope = rawValue === 'all'
        ? { mode: 'all', branchId: Number(currentBranchScope?.branchId || currentBranch?.id || accessibleBranches[0]?.id || 0) || null }
        : { mode: 'branch', branchId: Number(rawValue.replace('branch:', '')) || Number(currentBranch?.id || accessibleBranches[0]?.id || 0) || null };
      const canApplyBranchScopeChange = await canRefreshActiveScreenForBranchScopeChange();
      if (!canApplyBranchScopeChange) {
        renderBranchScopeSelector();
        return;
      }
      const normalizedScope = saveBranchScopeState(nextScope);
      if (normalizedScope?.branchId) {
        await persistCurrentBranch(normalizedScope.branchId);
      }
      renderBranchScopeSelector();
      if (!(await refreshActiveScreenForBranchScopeChange())) {
        relayBranchScopeToActiveScreen();
      }
      ensureCloudUsersIndicatorVisible();
    });
  }

  // Sidebar nav-group toggle behavior (purely UI, لا يؤثر على الصلاحيات)
  navGroups.forEach(group => {
    const header = group.querySelector('.nav-group-header');
    if (!header) return;
    header.addEventListener('click', () => {
      const isOpen = group.classList.contains('open');
      if (isOpen) {
        group.classList.remove('open');
      } else {
        // إغلاق باقي المجموعات وفتح الحالية فقط لسهولة التصفح
        navGroups.forEach(g => g.classList.remove('open'));
        group.classList.add('open');
      }
    });
  });

  // افتح أول مجموعة بشكل افتراضي إذا لم تُفتح أي مجموعة بعد الصلاحيات
  const anyOpenGroup = document.querySelector('.sidebar .nav-group.open');
  if (!anyOpenGroup && navGroups.length) {
    navGroups[0].classList.add('open');
  }

  // Sidebar collapse/expand toggle
  const sidebar = document.querySelector('.sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  if (sidebarToggle && sidebar) {
    // استرجاع الحالة المحفوظة
    const savedCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (savedCollapsed) {
      sidebar.classList.add('collapsed');
    }
    
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      // حفظ الحالة
      localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
    });
  }

  function applyThemeFromStorage() {
    try {
      const saved = localStorage.getItem('appTheme');
      if (saved) {
        const theme = JSON.parse(saved);
        let mode = theme.mode || 'dark';
        if (mode === 'auto') {
          mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        document.documentElement.setAttribute('data-theme', mode);
        document.documentElement.setAttribute('data-color-theme', theme.color || 'turquoise');
        // Propagate to any loaded iframes
        document.querySelectorAll('#content-area iframe').forEach(ifr => {
          try {
            if (ifr.contentDocument && ifr.contentDocument.documentElement) {
              ifr.contentDocument.documentElement.setAttribute('data-theme', mode);
              ifr.contentDocument.documentElement.setAttribute('data-color-theme', theme.color || 'turquoise');
            }
          } catch (_) {}
        });
      } else {
        // Default theme
        document.documentElement.setAttribute('data-theme', 'dark');
        document.documentElement.setAttribute('data-color-theme', 'turquoise');
      }
    } catch (e) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.setAttribute('data-color-theme', 'turquoise');
    }
  }

  // Theme toggle (legacy - now handled by company-settings)
  const themeBtn = document.getElementById('toggleTheme');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      const color = document.documentElement.getAttribute('data-color-theme') || 'turquoise';
      const newTheme = { mode: next, color: color };
      localStorage.setItem('appTheme', JSON.stringify(newTheme));
      applyThemeFromStorage();
    });
  }
  
  // Listen for storage changes (sync across windows)
  window.addEventListener('storage', (e) => {
    if (e.key === 'appTheme') {
      applyThemeFromStorage();
      return;
    }
    if (e.key === MAIN_LANG_KEY) {
      const nextLang = getCurrentMainLang();
      applyMainLanguage(nextLang);
      updateTopbarUserName(nextLang);
      renderBranchScopeSelector();
      return;
    }
    if (e.key === 'currentUser') {
      currentUser = getStoredCurrentUser();
      updateTopbarUserName();
      initializeBranchScopeSelector();
      return;
    }
    if (e.key === 'currentBranch') {
      currentBranch = getStoredCurrentBranch() || currentBranch;
      window.currentBranchContext = currentBranch;
      renderBranchScopeSelector();
      syncBranchCurrencySettingsToStorage({ forceFresh: true }).then((synced) => {
        if (synced) {
          notifyActiveScreenCurrenciesUpdated();
        }
      });
      relayBranchScopeToActiveScreen();
      ensureCloudUsersIndicatorVisible();
      return;
    }
    if (e.key === CURRENT_BRANCH_SCOPE_KEY) {
      currentBranchScope = getStoredCurrentBranchScope() || currentBranchScope;
      window.currentBranchScopeContext = currentBranchScope;
      renderBranchScopeSelector();
      syncBranchCurrencySettingsToStorage({ forceFresh: true }).then((synced) => {
        if (synced) {
          notifyActiveScreenCurrenciesUpdated();
        }
      });
      relayBranchScopeToActiveScreen();
      ensureCloudUsersIndicatorVisible();
    }
  });

  window.addEventListener('languageChanged', () => {
    const nextLang = getCurrentMainLang();
    applyMainLanguage(nextLang);
    updateTopbarUserName(nextLang);
    renderBranchScopeSelector();
    renderMessagingTexts();
    renderMessagingStats();
    renderMessagingContacts();
    renderMessagingThread();
    relayBranchScopeToActiveScreen();
  });
  
  // Apply theme immediately
  applyThemeFromStorage();

  // Logout
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      stopMessagingRefresh();
      try {
        const api = window.api || window.cloudDatabase;
        await api?.clearCloudPresence?.();
      } catch (_) {}
      // Clear user session data
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('currentBranch');
      localStorage.removeItem(CURRENT_BRANCH_SCOPE_KEY);
      window.location.href = '../login/index.html';
    });
  }

  // Map tab id -> screen folder (temporarily disable accounts & suppliers)
  const screenMap = {
    'tab-dashboard': 'dashboard',
    'tab-accounts': 'accounts',
    'tab-customers': 'customers',
    'tab-suppliers': 'suppliers',
    'tab-voucher': 'voucher',
    'tab-receipt': 'receipt',
    'tab-sales-invoice': 'sales-invoice',
    'tab-purchase-invoice': 'purchase-invoice',
    'tab-orders': 'orders',
    'tab-sales-purchase-movement': 'sales-purchase-movement',
    'tab-movement': 'movement',
    'tab-reports': 'reports',
    'tab-quick-statement': 'quick-statement',
    'tab-category-report': 'category-report',
    'tab-tax-report': 'tax-report',
    'tab-tax-declaration': 'tax-declaration',
    'tab-trial-balance': 'trial-balance',
    'tab-income-statement': 'income-statement',
    'tab-balance-sheet': 'balance-sheet',
    'tab-general-ledger': 'general-ledger',
    'tab-opening': 'opening',
    'tab-journal': 'journal',
    'tab-gold-items': 'gold-items',
    'tab-branches': 'branches',
    'tab-users': 'users',
    'tab-open-positions': 'open-positions',
    'tab-company-settings': 'company-settings',
    'tab-cloud-settings': 'cloud-settings',
    'tab-whatsapp-reports': 'whatsapp-reports',
  };
  const NON_BRANCH_SCOPED_TAB_IDS = new Set([
    'tab-branches',
    'tab-users',
    'tab-company-settings',
    'tab-cloud-settings',
    'tab-whatsapp-reports',
  ]);

  async function canRefreshActiveScreenForBranchScopeChange() {
    const iframe = document.querySelector('#content-area iframe');
    const targetWindow = iframe?.contentWindow;
    if (!targetWindow) {
      return true;
    }
    const guardNames = [
      'canLeaveSalesInvoice',
      'canLeavePurchaseInvoice',
      'canLeavePaymentVoucher',
      'canLeaveReceiptVoucher',
      'canLeaveJournalEntry',
      'canLeaveOpeningBalance',
    ];
    for (const guardName of guardNames) {
      if (typeof targetWindow[guardName] !== 'function') {
        continue;
      }
      try {
        return await targetWindow[guardName]();
      } catch (_) {
        return true;
      }
    }
    return true;
  }

  function reloadActiveScreenForBranchScopeChange() {
    const activeTab = document.querySelector('.sidebar .tab.active');
    const activeTabId = activeTab?.id;
    if (!activeTabId || !screenMap[activeTabId]) {
      return false;
    }
    if (NON_BRANCH_SCOPED_TAB_IDS.has(activeTabId)) {
      return false;
    }
    loadScreenByTabId(activeTabId);
    return true;
  }

  async function refreshActiveScreenForBranchScopeChange() {
    await syncBranchCurrencySettingsToStorage({ forceFresh: true });
    const iframe = document.querySelector('#content-area iframe');
    const targetWindow = iframe?.contentWindow;
    if (targetWindow) {
      try {
        targetWindow.currentBranchContext = currentBranch;
        targetWindow.currentBranchScopeContext = currentBranchScope;
        if (typeof targetWindow.refreshForBranchScopeChange === 'function') {
          const handled = await targetWindow.refreshForBranchScopeChange(getBranchScopePayload());
          if (handled !== false) {
            return true;
          }
        }
      } catch (_) {}
    }
    return reloadActiveScreenForBranchScopeChange();
  }

  function loadScreenByTabId(tabId) {
    const folder = screenMap[tabId];
    if (!folder || !content) return;
    const src = `../${folder}/index.html`;
    // Simple iframe shell
    content.innerHTML = '';
    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.style.width = '100%';
    iframe.style.height = 'calc(100vh - 56px)';
    iframe.style.border = '0';
    iframe.style.opacity = '0';
    iframe.style.transition = 'opacity 0.15s ease';
    iframe.setAttribute('title', `شاشة ${folder}`);
    // Bridge parent APIs into iframe (same-origin)
    iframe.addEventListener('load', () => {
      try {
        const w = iframe.contentWindow;
        if (!w) return;
        
        // Extra check for window.db
        if (!window.db) {
          
          
        }
        
        if (window.db) w.db = window.db;
        if (window.api) w.api = window.api;
        if (window.suppliers) w.suppliers = window.suppliers;
        if (window.accounts) w.accounts = window.accounts;
        if (window.goldItems) w.goldItems = window.goldItems;
        if (window.goldKarats) w.goldKarats = window.goldKarats;
        if (window.branches) w.branches = window.branches;
        if (window.users) w.users = window.users;
        if (window.permissions) w.permissions = window.permissions;
        if (window.voucher) w.voucher = window.voucher;
        if (window.receipt) w.receipt = window.receipt;
        if (window.salesInvoice) w.salesInvoice = window.salesInvoice;
        if (window.purchaseInvoice) w.purchaseInvoice = window.purchaseInvoice;
        if (window.opening) w.opening = window.opening;
        if (window.reports) w.reports = window.reports;
        if (window.sys) w.sys = window.sys;
        if (window.journal) w.journal = window.journal;
        if (window.orders) w.orders = window.orders;
        if (window.electron) w.electron = window.electron;
        if (window.waReports) w.waReports = window.waReports;
        w.currentBranchContext = currentBranch;
        w.currentBranchScopeContext = currentBranchScope;
        // دالة تأكيد كلمة المرور للتعديل والحذف
        if (window.confirmEditWithPassword) w.confirmEditWithPassword = window.confirmEditWithPassword;
        if (window.confirmDeleteWithPassword) w.confirmDeleteWithPassword = window.confirmDeleteWithPassword;
        // Sync theme into the iframe on load
        const currentMode = document.documentElement.getAttribute('data-theme') || 'dark';
        const currentColor = document.documentElement.getAttribute('data-color-theme') || 'turquoise';
        if (iframe.contentDocument && iframe.contentDocument.documentElement) {
          iframe.contentDocument.documentElement.setAttribute('data-theme', currentMode);
          iframe.contentDocument.documentElement.setAttribute('data-color-theme', currentColor);
        }
        // Reveal iframe only after theme is applied to avoid light flash
        iframe.style.opacity = '1';
        // إذا كانت شاشة واتساب — أرسل لها آخر حالة محفوظة
        if (tabId === 'tab-whatsapp-reports' && waStateCache.lastEvent) {
          setTimeout(() => {
            try {
              w.postMessage({ type: waStateCache.lastEvent, payload: waStateCache.lastPayload }, '*');
            } catch (_) {}
          }, 300);
        }
        // Provide a preview opener so child can request parent to open windows
        w.openPreview = (html) => {
          try {
            // Important: no 'noopener' so we can write into the document in Electron
            const win = window.open('about:blank', '_blank');
            const previewHtml = injectBranchScopeIntoPreviewHtml(html);
            if (!win) {
              // Fallback: print via hidden iframe in parent
              const pf = document.createElement('iframe');
              pf.style.position='fixed';pf.style.right='0';pf.style.bottom='0';pf.style.width='0';pf.style.height='0';pf.style.border='0';
              document.body.appendChild(pf);
              pf.onload = () => { try { pf.contentWindow.focus(); pf.contentWindow.print(); } finally { setTimeout(()=>pf.remove(), 300);} };
              pf.srcdoc = previewHtml;
              return;
            }
            // Write normally
            win.document.open();
            win.document.write(previewHtml);
            win.document.close();
            win.focus();
            // If for any reason the window is blank, use data URL as fallback
            setTimeout(() => {
              if (!win.document || !win.document.body || !win.document.body.children.length){
                const url = 'data:text/html;charset=utf-8,' + encodeURIComponent(previewHtml);
                win.location.replace(url);
              }
            }, 50);
          } catch (e) {  }
        };
        relayBranchScopeToWindow(w);
      } catch (_) {}
    });
    content.appendChild(iframe);
  }

  function relayCloudDataUpdatedToActiveScreen(payload) {
    try {
      if (!shouldHandleCloudPayloadForCurrentBranch(payload)) return;
      const iframe = document.querySelector('#content-area iframe');
      const targetWindow = iframe?.contentWindow;
      if (!targetWindow) return;
      targetWindow.postMessage({ type: 'cloud-data-updated', payload }, '*');
    } catch (_) {}
  }

  // Bind tab clicks (ignore unmapped tabs) and respect unsaved changes on invoice screens
  const shellTabs = Array.from(document.querySelectorAll('.sidebar .tab'));
  shellTabs.forEach(tab => {
    tab.addEventListener('click', async () => {
      const targetId = tab.id;
      if (!screenMap[targetId]) return;

      // Check if we are leaving an invoice tab with unsaved changes
      const activeTab = document.querySelector('.sidebar .tab.active');
      const activeId = activeTab && activeTab.id;
      const iframe = document.querySelector('#content-area iframe');

      // Sales Invoice unsaved changes check
      if (activeId === 'tab-sales-invoice' && targetId !== activeId) {
        if (iframe && iframe.contentWindow && typeof iframe.contentWindow.canLeaveSalesInvoice === 'function') {
          try {
            const canLeave = await iframe.contentWindow.canLeaveSalesInvoice();
            if (!canLeave) return;
          } catch (_) { }
        }
      }

      // Purchase Invoice unsaved changes check
      if (activeId === 'tab-purchase-invoice' && targetId !== activeId) {
        if (iframe && iframe.contentWindow && typeof iframe.contentWindow.canLeavePurchaseInvoice === 'function') {
          try {
            const canLeave = await iframe.contentWindow.canLeavePurchaseInvoice();
            if (!canLeave) return;
          } catch (_) { }
        }
      }

      // Payment Voucher unsaved changes check
      if (activeId === 'tab-voucher' && targetId !== activeId) {
        if (iframe && iframe.contentWindow && typeof iframe.contentWindow.canLeavePaymentVoucher === 'function') {
          try {
            const canLeave = await iframe.contentWindow.canLeavePaymentVoucher();
            if (!canLeave) return;
          } catch (_) { }
        }
      }

      // Receipt Voucher unsaved changes check
      if (activeId === 'tab-receipt' && targetId !== activeId) {
        if (iframe && iframe.contentWindow && typeof iframe.contentWindow.canLeaveReceiptVoucher === 'function') {
          try {
            const canLeave = await iframe.contentWindow.canLeaveReceiptVoucher();
            if (!canLeave) return;
          } catch (_) { }
        }
      }

      // Journal Entry unsaved changes check
      if (activeId === 'tab-journal' && targetId !== activeId) {
        if (iframe && iframe.contentWindow && typeof iframe.contentWindow.canLeaveJournalEntry === 'function') {
          try {
            const canLeave = await iframe.contentWindow.canLeaveJournalEntry();
            if (!canLeave) return;
          } catch (_) { }
        }
      }

      // Opening Balance unsaved changes check
      if (activeId === 'tab-opening' && targetId !== activeId) {
        if (iframe && iframe.contentWindow && typeof iframe.contentWindow.canLeaveOpeningBalance === 'function') {
          try {
            const canLeave = await iframe.contentWindow.canLeaveOpeningBalance();
            if (!canLeave) return;
          } catch (_) { }
        }
      }

      clearUnreadForTab(targetId);

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      loadScreenByTabId(targetId);
    });
  });

  // Initial load: use currently active tab or first visible tab
  const initialActive = document.querySelector('.sidebar .tab.active:not([style*="display: none"])');
  let initialTabId = (initialActive && initialActive.id) || null;
  
  // Find first visible tab if none selected
  if (!initialTabId || !screenMap[initialTabId]) {
    const firstVisible = document.querySelector('.sidebar .tab:not([style*="display: none"])');
    initialTabId = firstVisible ? firstVisible.id : 'tab-customers';
  }
  
  const initialTab = document.getElementById(initialTabId);
  if (initialTab && initialTab.style.display !== 'none') {
    initialTab.classList.add('active');
    loadScreenByTabId(initialTabId);
  } else {
    
    
    // Show message to user
    const contentArea = document.getElementById('content-area');
    if (contentArea) {
      contentArea.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;padding:40px;text-align:center;">
          <div style="font-size:80px;margin-bottom:20px;">🔒</div>
          <h2 style="color:var(--text);margin-bottom:10px;">لا توجد صلاحيات</h2>
          <p style="color:var(--subtle);font-size:16px;margin-bottom:30px;">
            لا تملك صلاحيات للوصول إلى أي شاشة في النظام.<br>
            يرجى التواصل مع المدير لمنحك الصلاحيات المناسبة.
          </p>
          <button onclick="location.href='../login/index.html'" style="padding:12px 30px;background:var(--primary);color:white;border:none;border-radius:8px;font-size:14px;cursor:pointer;">
            العودة لتسجيل الدخول
          </button>
        </div>
      `;
    }
  }
});

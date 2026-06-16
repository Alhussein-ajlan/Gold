function normalizeConversationTurn(turn = {}) {
  if (!turn || typeof turn !== 'object' || Array.isArray(turn)) {
    return null;
  }
  const role = turn.role === 'assistant' ? 'assistant' : 'user';
  const text = String(turn.text || turn.content || '').trim();
  if (!text) {
    return null;
  }
  return {
    role,
    text,
    route: turn.route ? String(turn.route).trim() : '',
  };
}

function normalizeConversationHistory(history = [], limit = 10) {
  if (!Array.isArray(history)) {
    return [];
  }
  return history
    .map((turn) => normalizeConversationTurn(turn))
    .filter(Boolean)
    .slice(-Math.max(1, Number(limit) || 10));
}

function normalizeFocusEntity(entity = null) {
  if (!entity || typeof entity !== 'object' || Array.isArray(entity)) {
    return null;
  }
  const id = Number(entity.id);
  if (!Number.isFinite(id) || id <= 0) {
    return null;
  }
  return {
    kind: String(entity.kind || '').trim() || '',
    table: String(entity.table || '').trim() || '',
    id,
    label: String(entity.label || '').trim() || '',
    name: String(entity.name || '').trim() || '',
  };
}

function normalizeActiveScreen(screen = null) {
  if (!screen || typeof screen !== 'object' || Array.isArray(screen)) {
    return null;
  }
  const label = String(screen.label || '').trim();
  const tabId = String(screen.tabId || '').trim();
  const folder = String(screen.folder || '').trim();
  if (!label && !tabId && !folder) {
    return null;
  }
  return {
    label,
    tabId,
    folder,
  };
}

function normalizePendingStatementExport(value = null) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }
  const id = Number(value.id);
  if (!Number.isFinite(id) || id <= 0) {
    return null;
  }
  const rawStep = String(value.step || '').trim().toLowerCase();
  const step = ['model', 'template', 'orientation'].includes(rawStep) ? rawStep : 'orientation';
  const model = String(value.model || '').trim();
  const template = String(value.template || '').trim();
  const orientation = String(value.orientation || '').trim().toLowerCase();
  return {
    kind: String(value.kind || '').trim() || '',
    table: String(value.table || '').trim() || '',
    id,
    label: String(value.label || '').trim() || '',
    name: String(value.name || '').trim() || '',
    step,
    model: step === 'model' ? '' : (model || 'both'),
    template: template || (step === 'orientation' ? 'normal' : ''),
    orientation: step === 'orientation' ? '' : (orientation === 'landscape' ? 'landscape' : (orientation === 'portrait' ? 'portrait' : '')),
  };
}

function normalizeTopicContext(topic = null) {
  if (!topic || typeof topic !== 'object' || Array.isArray(topic)) {
    return null;
  }
  const hints = Array.isArray(topic.hints)
    ? Array.from(new Set(topic.hints.map((item) => String(item || '').trim()).filter(Boolean))).slice(0, 8)
    : [];
  const normalized = {
    kind: String(topic.kind || '').trim(),
    subject: String(topic.subject || '').trim(),
    label: String(topic.label || '').trim(),
    source: String(topic.source || '').trim(),
    valueText: String(topic.valueText || '').trim(),
    hints,
  };
  if (!normalized.kind && !normalized.subject && !normalized.label && !normalized.source && !normalized.valueText && !normalized.hints.length) {
    return null;
  }
  return normalized;
}

function normalizeConversationState(state = {}) {
  if (!state || typeof state !== 'object' || Array.isArray(state)) {
    return {
      focusEntity: null,
      activeScreen: null,
      pendingStatementExport: null,
      topicContext: null,
      lastRoute: '',
    };
  }
  return {
    focusEntity: normalizeFocusEntity(state.focusEntity),
    activeScreen: normalizeActiveScreen(state.activeScreen),
    pendingStatementExport: normalizePendingStatementExport(state.pendingStatementExport),
    topicContext: normalizeTopicContext(state.topicContext),
    lastRoute: String(state.lastRoute || '').trim(),
  };
}

function mergeConversationState(base = {}, patch = {}) {
  const normalizedBase = normalizeConversationState(base);
  const normalizedPatch = normalizeConversationState(patch);
  return {
    focusEntity: Object.prototype.hasOwnProperty.call(patch || {}, 'focusEntity') ? normalizedPatch.focusEntity : normalizedBase.focusEntity,
    activeScreen: Object.prototype.hasOwnProperty.call(patch || {}, 'activeScreen') ? normalizedPatch.activeScreen : normalizedBase.activeScreen,
    pendingStatementExport: Object.prototype.hasOwnProperty.call(patch || {}, 'pendingStatementExport') ? normalizedPatch.pendingStatementExport : normalizedBase.pendingStatementExport,
    topicContext: Object.prototype.hasOwnProperty.call(patch || {}, 'topicContext') ? normalizedPatch.topicContext : normalizedBase.topicContext,
    lastRoute: normalizedPatch.lastRoute || normalizedBase.lastRoute || '',
  };
}

function buildActiveScreenState(screen = null) {
  return {
    activeScreen: normalizeActiveScreen(screen),
  };
}

function buildFocusEntityState(entity = null) {
  return {
    focusEntity: normalizeFocusEntity(entity),
  };
}

function buildTopicContextState(topic = null) {
  return {
    topicContext: normalizeTopicContext(topic),
  };
}

module.exports = {
  buildActiveScreenState,
  buildFocusEntityState,
  buildTopicContextState,
  mergeConversationState,
  normalizeConversationHistory,
  normalizeConversationState,
};

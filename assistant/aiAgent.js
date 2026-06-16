const { classifyMessage } = require('./intentClassifier');
const { answerDatabase } = require('./sqlAgent');
const { handleCommand } = require('./commandAgent');
const { answerKnowledge, buildScreenSummary } = require('./knowledgeAgent');
const { mergeConversationState, normalizeConversationHistory, normalizeConversationState } = require('./conversationUtils');
const { normalizeToolRequest, buildToolRequestsFromActions, normalizeQueryPlan } = require('./assistantContracts');

const PROVIDER_PRESETS = {
  groq: {
    provider: 'groq',
    label: 'Groq',
    endpoint: 'https://api.groq.com/openai/v1/chat/completions',
    model: 'llama-3.3-70b-versatile',
  },
  openai: {
    provider: 'openai',
    label: 'OpenAI',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-4o-mini',
  },
  deepseek: {
    provider: 'deepseek',
    label: 'DeepSeek',
    endpoint: 'https://api.deepseek.com/chat/completions',
    model: 'deepseek-chat',
  },
  openrouter: {
    provider: 'openrouter',
    label: 'OpenRouter',
    endpoint: 'https://openrouter.ai/api/v1/chat/completions',
    model: 'openai/gpt-4o-mini',
  },
  custom: {
    provider: 'custom',
    label: 'Custom Endpoint',
    endpoint: '',
    model: '',
  },
};

function getProviderPresets() {
  return PROVIDER_PRESETS;
}

function normalizeProviderSettings(raw = {}) {
  const providerKey = String(raw.provider || 'groq').trim().toLowerCase();
  const preset = PROVIDER_PRESETS[providerKey] || PROVIDER_PRESETS.groq;
  return {
    enabled: raw.enabled !== false,
    provider: preset.provider,
    label: preset.label,
    endpoint: String(raw.endpoint || preset.endpoint || '').trim(),
    model: String(raw.model || preset.model || '').trim(),
    apiKey: String(raw.apiKey || '').trim(),
    systemPrompt: String(raw.systemPrompt || '').trim(),
    temperature: Number.isFinite(Number(raw.temperature)) ? Number(raw.temperature) : 0.2,
  };
}

function normalizeRouteHint(raw = '') {
  const value = String(raw || '').trim().toLowerCase();
  if (value === 'general') return 'general';
  if (value === 'database') return 'database';
  if (value === 'local') return 'local';
  return 'auto';
}

function buildRouteOrder(routeHint = 'auto', classificationOrder = []) {
  if (routeHint === 'general') {
    return ['general'];
  }
  if (routeHint === 'database') {
    return ['database'];
  }
  if (routeHint === 'local') {
    return ['command', 'knowledge'];
  }
  const baseLocalOrder = ['command', 'knowledge', 'database'];
  return [...baseLocalOrder, ...(Array.isArray(classificationOrder) ? classificationOrder : []), 'general']
    .filter((value, index, list) => value && list.indexOf(value) === index);
}

function getContextUserDisplayName(context = {}) {
  const currentUser = context?.currentUser || {};
  return String(currentUser?.full_name || currentUser?.full_name_en || currentUser?.username || currentUser?.name || '').trim();
}

function normalizePositiveId(value = null) {
  const numericValue = Number(value || 0);
  return Number.isFinite(numericValue) && numericValue > 0 ? numericValue : null;
}

function normalizeBranchIdList(values = []) {
  if (!Array.isArray(values)) {
    return [];
  }
  return Array.from(new Set(values
    .map((value) => normalizePositiveId(value))
    .filter((value) => Number.isFinite(value) && value > 0)));
}

function getContextBranchSnapshot(context = {}) {
  const currentUser = context?.currentUser || {};
  const currentBranch = context?.currentBranch || {};
  const branchScope = context?.branchScope || {};
  const allowedBranchIds = normalizeBranchIdList(
    Array.isArray(branchScope?.allowedBranchIds)
      ? branchScope.allowedBranchIds
      : (Array.isArray(currentUser?.allowed_branch_ids) ? currentUser.allowed_branch_ids : [])
  );
  const branchId = normalizePositiveId(branchScope?.branchId || branchScope?.branch_id || currentBranch?.id || currentUser?.branch_id || currentUser?.default_branch_id);
  return {
    mode: String(branchScope?.mode || branchScope?.scope || '').trim().toLowerCase() === 'all' && allowedBranchIds.length > 1 ? 'all' : 'branch',
    branchId,
    allowedBranchIds,
    currentBranchCode: String(currentBranch?.code || '').trim(),
    currentBranchName: String(currentBranch?.name || '').trim(),
  };
}

function getContextBranchLabel(branchSnapshot = {}) {
  const parts = [];
  if (branchSnapshot.currentBranchName) {
    parts.push(branchSnapshot.currentBranchName);
  }
  if (branchSnapshot.currentBranchCode) {
    parts.push(`(${branchSnapshot.currentBranchCode})`);
  }
  if (!parts.length && branchSnapshot.branchId) {
    parts.push(`رقم ${branchSnapshot.branchId}`);
  }
  return parts.join(' ').trim();
}

function buildBranchPromptDirectives(context = {}) {
  const branchSnapshot = getContextBranchSnapshot(context);
  const currentBranchLabel = getContextBranchLabel(branchSnapshot);
  const allowedCount = branchSnapshot.allowedBranchIds.length;
  return [
    allowedCount ? `المستخدم الحالي مخول لعدد ${allowedCount} من الفروع داخل النظام.` : '',
    currentBranchLabel ? `الفرع المحدد حالياً في الجلسة: ${currentBranchLabel}.` : '',
    `نطاق الفروع الحالي في الجلسة: ${branchSnapshot.mode === 'all' ? 'كل الفروع المخول لها' : 'فرع واحد فقط'}.`,
    'قاعدة إلزامية: لا تخلط نتائج الفروع داخل أي كشف أو رصيد أو تقرير إلا إذا طلب المستخدم ذلك صراحة.',
    allowedCount <= 1 ? 'إذا كان المستخدم مخولاً لفرع واحد فقط فاعتبر أي رصيد أو تقرير أو كشف حساب أو إجمالي مطلوب مقصوراً على فرعه فقط.' : '',
    allowedCount > 1 ? 'إذا كان المستخدم مخولاً لعدة فروع ولكن نطاق الجلسة الحالي على فرع واحد فقط، فأجب اعتماداً على الفرع المحدد فقط ولا تضم بقية الفروع ضمن النتيجة الافتراضية.' : '',
    allowedCount > 1 ? 'في هذه الحالة يمكنك أن تخبره بوضوح أن النتيجة الحالية تخص الفرع المحدد، وأنك تستطيع التوسيع إلى عدة فروع أو إلى كل الفروع المخول لها إذا طلب ذلك.' : '',
    'عند الأسئلة الشرحية عن الفروع، اشرح أن اختيار الفرع أو نطاق الفروع يتم من الشريط العلوي للواجهة، وأن العميل أو المورد قد يكون مشتركاً بين عدة فروع بحسب إعدادات الوصول داخل بطاقته.',
  ].filter(Boolean);
}

function buildGeneralSystemPrompt(context = {}) {
  const customPrompt = String(context?.providerSettings?.systemPrompt || '').trim();
  const screenSummary = buildScreenSummary(context.projectRoot || process.cwd());
  const focusEntity = context?.conversationState?.focusEntity;
  const activeScreen = context?.conversationState?.activeScreen;
  const topicContext = context?.conversationState?.topicContext;
  const currentUserName = getContextUserDisplayName(context);
  return [
    customPrompt,
    !customPrompt ? 'أنت مساعد ذكي داخل برنامج محاسبي لمحلات الذهب.' : '',
    !customPrompt ? 'أجب باحترافية وبالعربية الواضحة، وافهم العامية وصيغ السؤال الحرة.' : '',
    'افهم سياق الحوار السابق وأكمل الحديث بشكل طبيعي دون أن تتعامل مع كل سؤال كأنه بداية مستقلة.',
    'إذا كانت الرسالة متابعة قصيرة فافهم المقصود من سياق المحادثة الحالي ولا تطلب إعادة الاسم إلا عند وجود غموض حقيقي.',
    'إذا ذكر المستخدم حساباً أب أو مجموعة حسابات مثل الموظفين وسأل عن الأرصدة أو التابعين فافهم أن المقصود قد يكون جميع الحسابات التابعة للحساب الأب وليس مطابقة حساب مفرد فقط.',
    'الأسئلة الخاصة بالشاشات والمنطق الداخلي والعمليات الحسابية يتم تفضيل الإجابة المحلية عليها.',
    'إذا سأل المستخدم عن سعر أونصة الذهب أو الفضة الآن داخل البرنامج فالمقصود هو السعر الحي المرتبط ببطاقات MT5 المحلية داخل الشاشات، وليس شرح إعدادات حساب الأونصة.',
    ...buildBranchPromptDirectives(context),
    currentUserName ? `المستخدم الحالي في هذه الجلسة: ${currentUserName}. خاطبه بأسلوب مهني راقٍ ومباشر.` : '',
    focusEntity?.id ? `الكيان الجاري في المحادثة: ${focusEntity.label || 'عنصر'} ${focusEntity.name || ''} (id: ${focusEntity.id}).` : '',
    activeScreen?.label ? `الشاشة الحالية في المحادثة: ${activeScreen.label}.` : '',
    topicContext?.label ? `موضوع الحوار الجاري: ${topicContext.label}${topicContext.valueText ? ` (${topicContext.valueText})` : ''}.` : '',
    `ملخص داخلي للتطبيق: ${screenSummary}`,
  ].filter(Boolean).join(' ');
}

function buildProviderMessages(message, context = {}) {
  const history = normalizeConversationHistory(context.history || [], 10);
  const messages = [{ role: 'system', content: buildGeneralSystemPrompt(context) }];
  history.forEach((turn) => {
    messages.push({ role: turn.role, content: turn.text });
  });
  messages.push({ role: 'user', content: String(message || '') });
  return messages;
}

function buildIntentSystemPrompt(context = {}) {
  const screenSummary = buildScreenSummary(context.projectRoot || process.cwd());
  const focusEntity = context?.conversationState?.focusEntity;
  const activeScreen = context?.conversationState?.activeScreen;
  const topicContext = context?.conversationState?.topicContext;
  const currentUserName = getContextUserDisplayName(context);
  return [
    'أنت محلل نية لمساعد محاسبي داخل برنامج ذهب.',
    'مهمتك فهم رسالة المستخدم العربية أو العامية وإرجاع JSON فقط بدون أي شرح أو نص إضافي.',
    'اختر route واحداً فقط من: command, knowledge, database, general.',
    'استخدم route=command عندما يطلب المستخدم تنفيذ شيء داخل البرنامج مثل فتح شاشة أو تغيير ثيم أو إنشاء نسخة احتياطية أو التحويل بين المحلي والسحابي أو تصدير كشف حساب.',
    'استخدم route=knowledge عندما يسأل المستخدم عن المكان أو الخطوات أو الشرح داخل النظام.',
    'استخدم route=database عندما يطلب أرصدة أو مجاميع أو عدد أو تقارير أو بيانات من قاعدة البيانات.',
    'عندما يذكر المستخدم حساباً أب أو مجموعة حسابات مثل الموظفين ويسأل عن الأرصدة أو الحسابات التابعة، فاعتبر ذلك route=database وغالباً entityType=account.',
    'في الرسائل القصيرة التابعة للحوار مثل أكمل أو له أو التابعين له، استفد من focusEntity و activeScreen والسياق السابق.',
    'إذا كانت الرسالة عن سعر أونصة الذهب أو الفضة الآن أو عن بطاقات السعر المرتبطة بـ MT5 داخل النظام، فهذه route=knowledge محلية وليست route=general.',
    ...buildBranchPromptDirectives(context),
    'إذا كان السؤال عن كشف أو رصيد أو تقرير مع وجود سياق فروع، فحافظ على الفرع المحدد الحالي ولا تعامل السؤال ككل الفروع إلا إذا صرّح المستخدم بذلك.',
    'استخدم route=general فقط إذا كان السؤال عاماً خارج منطق البرنامج.',
    'القيم المفضلة للحقل action عند الحاجة: open_tab, set_theme, create_backup, open_backup_folder, set_cloud_mode, open_notification_settings, export_statement, open_provider_settings, answer_question, query_database.',
    'يمكنك أيضاً إرجاع tool اختياري منظم بهذا الشكل: {"name":"","params":{}} لاختيار أداة تنفيذ محلية typed بدلاً من الاعتماد على action فقط.',
    'وعند route=database يمكنك إرجاع queryPlan آمن بهذا الشكل: {"kind":"aggregate_party_balances|entity_balance|entity_statement|latest_related_document|count_records|grouped_count|box_balances|list_schema_tables","entityType":"","documentType":"","table":"","metric":"","entityName":"","recordId":0,"balanceSide":"debtors|creditors|all","includeCount":true}.',
    'يمكنك وضع target.tabId أو target.screen أو target.label للشاشة، و target.setting أو target.mode للإعدادات، و target.entityType و target.entityName و target.metric لطلبات البيانات.',
    'إذا لم تعرف tabId بدقة فاتركه فارغاً واكتب اسم الشاشة أو التبويب في target.screen أو target.label.',
    currentUserName ? `المستخدم الحالي: ${currentUserName}.` : '',
    focusEntity?.id ? `الكيان الجاري في المحادثة: ${focusEntity.label || 'عنصر'} ${focusEntity.name || ''} (id: ${focusEntity.id}).` : '',
    activeScreen?.label ? `الشاشة الحالية في المحادثة: ${activeScreen.label}.` : '',
    topicContext?.label ? `موضوع الحوار الجاري: ${topicContext.label}.` : '',
    `ملخص الشاشات الداخلية: ${screenSummary}`,
    'أعد JSON بهذا الشكل فقط: {"route":"","action":"","target":{"tabId":"","screen":"","label":"","setting":"","mode":"","entityType":"","entityName":"","metric":"","value":""},"tool":{"name":"","params":{}},"queryPlan":{"kind":"","entityType":"","documentType":"","table":"","metric":"","entityName":"","recordId":0,"balanceSide":"","includeCount":true},"confidence":0}.',
  ].filter(Boolean).join(' ');
}

function buildIntentMessages(message, context = {}) {
  const history = normalizeConversationHistory(context.history || [], 8);
  const messages = [{ role: 'system', content: buildIntentSystemPrompt(context) }];
  history.forEach((turn) => {
    messages.push({ role: turn.role, content: turn.text });
  });
  messages.push({ role: 'user', content: String(message || '') });
  return messages;
}

function extractJsonObject(text = '') {
  const rawText = String(text || '').trim();
  if (!rawText) return '';
  const fencedMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (fencedMatch?.[1]) {
    return fencedMatch[1].trim();
  }
  const start = rawText.indexOf('{');
  const end = rawText.lastIndexOf('}');
  if (start >= 0 && end > start) {
    return rawText.slice(start, end + 1).trim();
  }
  return rawText;
}

function parseJsonObject(text = '') {
  const candidate = extractJsonObject(text);
  if (!candidate) return null;
  try {
    return JSON.parse(candidate);
  } catch (_) {
    return null;
  }
}

function normalizeIntentRoute(raw = '') {
  const value = String(raw || '').trim().toLowerCase();
  if (['command', 'ui', 'action', 'execute', 'settings'].includes(value)) return 'command';
  if (['knowledge', 'local', 'help', 'guide', 'howto', 'screen'].includes(value)) return 'knowledge';
  if (['database', 'db', 'sql', 'query', 'data'].includes(value)) return 'database';
  if (['general', 'external', 'web'].includes(value)) return 'general';
  return '';
}

function normalizeIntentAction(raw = '') {
  const value = String(raw || '').trim().toLowerCase().replace(/[\s-]+/g, '_');
  if (!value) return '';
  if (['open_screen', 'open_tab', 'navigate', 'go_to_screen', 'show_screen'].includes(value)) return 'open_tab';
  if (['change_theme', 'switch_theme', 'set_theme'].includes(value)) return 'set_theme';
  if (['create_backup', 'backup_now', 'make_backup'].includes(value)) return 'create_backup';
  if (['open_backup_folder', 'show_backup_folder'].includes(value)) return 'open_backup_folder';
  if (['set_cloud_mode', 'switch_connection_mode', 'change_connection_mode'].includes(value)) return 'set_cloud_mode';
  if (['open_notification_settings', 'notification_settings'].includes(value)) return 'open_notification_settings';
  if (['export_statement', 'generate_statement', 'print_statement'].includes(value)) return 'export_statement';
  if (['open_provider_settings', 'provider_settings'].includes(value)) return 'open_provider_settings';
  if (['answer_question', 'guide_user'].includes(value)) return 'answer_question';
  if (['query_database', 'database_query'].includes(value)) return 'query_database';
  return value;
}

function normalizeIntentTarget(raw = {}) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return {
      tabId: '',
      screen: '',
      label: '',
      setting: '',
      mode: '',
      entityType: '',
      entityName: '',
      metric: '',
      value: '',
    };
  }
  return {
    tabId: String(raw.tabId || '').trim(),
    screen: String(raw.screen || '').trim(),
    label: String(raw.label || '').trim(),
    setting: String(raw.setting || '').trim(),
    mode: String(raw.mode || '').trim(),
    entityType: String(raw.entityType || '').trim(),
    entityName: String(raw.entityName || '').trim(),
    metric: String(raw.metric || '').trim(),
    value: String(raw.value || '').trim(),
  };
}

function normalizeIntentHint(raw = null) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return null;
  }
  const route = normalizeIntentRoute(raw.route || '');
  const action = normalizeIntentAction(raw.action || '');
  const target = normalizeIntentTarget(raw.target || {});
  const tool = normalizeToolRequest(raw.tool || raw.toolCall || raw.toolRequest || null);
  const queryPlan = normalizeQueryPlan(raw.queryPlan || raw.plan || raw.query || null);
  const confidence = Number(raw.confidence || 0);
  const resolvedRoute = route || (tool ? 'command' : queryPlan ? 'database' : '');
  if (!resolvedRoute && !action && !Object.values(target).some(Boolean) && !tool && !queryPlan) {
    return null;
  }
  return {
    route: resolvedRoute,
    action,
    target,
    tool,
    queryPlan,
    confidence: Number.isFinite(confidence) ? confidence : 0,
  };
}

function mergeIntentHints(primary = null, fallback = null) {
  if (!primary && !fallback) {
    return null;
  }
  if (!primary) {
    return fallback;
  }
  if (!fallback) {
    return primary;
  }
  return normalizeIntentHint({
    route: primary.route || fallback.route,
    action: primary.action || fallback.action,
    target: {
      ...(fallback.target || {}),
      ...(primary.target || {}),
    },
    tool: primary.tool || fallback.tool,
    queryPlan: primary.queryPlan || fallback.queryPlan,
    confidence: Math.max(Number(primary.confidence || 0), Number(fallback.confidence || 0)),
  });
}

function shouldUseProviderIntent(classification = {}, providerSettings = {}, routeHint = 'auto') {
  if (routeHint === 'general') {
    return false;
  }
  if (!providerSettings.enabled || !providerSettings.endpoint || !providerSettings.model || !providerSettings.apiKey) {
    return false;
  }
  if (routeHint === 'local') {
    return true;
  }
  if (classification.route === 'general') {
    return true;
  }
  if (!classification.hasLocalSignals) {
    return true;
  }
  return Number(classification.confidence || 0) <= 1;
}

function mergeClassificationWithIntent(classification = {}, intentHint = null) {
  if (!intentHint?.route) {
    return classification;
  }
  const mergedScores = { ...(classification.scores || {}) };
  const boostedScore = Math.max(Number(mergedScores[intentHint.route] || 0), Number(mergedScores[intentHint.route] || 0) + 4);
  mergedScores[intentHint.route] = boostedScore;
  return {
    ...classification,
    route: intentHint.route,
    routeOrder: [intentHint.route, ...(Array.isArray(classification.routeOrder) ? classification.routeOrder : [])]
      .filter((value, index, list) => value && list.indexOf(value) === index),
    confidence: Math.max(Number(classification.confidence || 0), 2),
    scores: mergedScores,
    providerIntent: intentHint,
  };
}

function withConversationState(result = null, baseState = {}, route = '') {
  if (!result) return null;
  const resultConversationState = (result.conversationState && typeof result.conversationState === 'object' && !Array.isArray(result.conversationState))
    ? result.conversationState
    : {};
  return {
    ...result,
    conversationState: mergeConversationState(baseState, {
      ...resultConversationState,
      topicContext: Object.prototype.hasOwnProperty.call(resultConversationState, 'topicContext')
        ? resultConversationState.topicContext
        : null,
      lastRoute: route || result?.route || '',
    }),
  };
}

function enrichAssistantResult(result = null, route = '') {
  if (!result) {
    return null;
  }
  const typedTools = [
    ...((Array.isArray(result.tools) ? result.tools : []).map((item) => normalizeToolRequest(item)).filter(Boolean)),
    ...buildToolRequestsFromActions(result.actions || []),
  ].reduce((acc, item) => {
    const key = JSON.stringify(item);
    if (!acc.seen.has(key)) {
      acc.seen.add(key);
      acc.items.push(item);
    }
    return acc;
  }, { seen: new Set(), items: [] }).items;

  return {
    ...result,
    route: result.route || route || '',
    tools: typedTools,
    queryPlan: normalizeQueryPlan(result.queryPlan || null),
  };
}

function dedupeActions(actions = []) {
  return (Array.isArray(actions) ? actions : [])
    .filter(Boolean)
    .filter((action, index, list) => list.findIndex((item) => JSON.stringify(item) === JSON.stringify(action)) === index);
}

function buildKnowledgeFallbackActions(conversationState = {}) {
  const activeScreen = conversationState?.activeScreen || null;
  const topicContext = conversationState?.topicContext || null;
  const source = String(topicContext?.source || '').trim();
  const actions = [];

  if (activeScreen?.tabId && activeScreen?.label) {
    actions.push({ type: 'open_tab', tabId: activeScreen.tabId, label: activeScreen.label });
  }

  if (source === 'invoiceOunce') {
    actions.push({ type: 'submit_message', message: 'اشرح قسم إعدادات حساب الأونصة بالتفصيل', label: 'شرح أعمق' });
    actions.push({ type: 'submit_message', message: 'اشرح بطاقة إعدادات الفواتير في شاشة إعدادات الشركة', label: 'بطاقة الفواتير' });
  } else if (source === 'theme' || source === 'theme-section') {
    actions.push({ type: 'submit_message', message: 'اشرح بطاقة المظهر والثيمات في شاشة إعدادات الشركة', label: 'شرح البطاقة' });
  } else if (source === 'notifications') {
    actions.push({ type: 'submit_message', message: 'اشرح بطاقة الإشعارات في شاشة إعدادات الشركة', label: 'شرح البطاقة' });
  } else if (source === 'connectCloud') {
    actions.push({ type: 'submit_message', message: 'اشرح بطاقة الاتصال السحابي في شاشة إعدادات السحابة', label: 'شرح البطاقة' });
  } else if (source === 'switchMode') {
    actions.push({ type: 'submit_message', message: 'اشرح قسم وضع قاعدة البيانات في شاشة إعدادات السحابة', label: 'وضع القاعدة' });
  } else if (source === 'sync') {
    actions.push({ type: 'submit_message', message: 'اشرح بطاقة المزامنة في شاشة إعدادات السحابة', label: 'شرح المزامنة' });
  }

  if (activeScreen?.label) {
    actions.push({ type: 'submit_message', message: `اشرح لي شاشة ${activeScreen.label} بالتفصيل`, label: 'شرح الشاشة' });
    actions.push({ type: 'submit_message', message: `ما الأقسام والبطاقات في شاشة ${activeScreen.label}`, label: 'الأقسام' });
    actions.push({ type: 'submit_message', message: `ما الحقول الأساسية في شاشة ${activeScreen.label}`, label: 'الحقول' });
  } else {
    actions.push({ type: 'submit_message', message: 'اشرح لي شاشة الحسابات بالتفصيل', label: 'شاشة الحسابات' });
    actions.push({ type: 'submit_message', message: 'أين توجد إعدادات الشركة', label: 'إعدادات الشركة' });
  }

  return dedupeActions(actions).slice(0, 4);
}

function buildKnowledgeFallbackReply(conversationState = {}) {
  const activeScreen = conversationState?.activeScreen || null;
  const topicContext = conversationState?.topicContext || null;
  const topicLabel = String(topicContext?.label || '').trim();
  const screenLabel = String(activeScreen?.label || '').trim();
  const intro = topicLabel
    ? `أفهم أنك تتابع موضوع ${topicLabel}${screenLabel && screenLabel !== topicLabel ? ` داخل شاشة ${screenLabel}` : ''}.`
    : screenLabel
      ? `أفهم أن سؤالك مرتبط بشاشة ${screenLabel}.`
      : 'أفهم أن سؤالك داخل البرنامج.';

  let examples = [];
  if (topicContext?.source === 'invoiceOunce') {
    examples = ['اشرح قسم إعدادات حساب الأونصة بالتفصيل', 'اشرح بطاقة إعدادات الفواتير'];
  } else if (topicContext?.source === 'theme' || topicContext?.source === 'theme-section') {
    examples = ['اشرح بطاقة المظهر والثيمات', 'ما أقسام شاشة إعدادات الشركة'];
  } else if (topicContext?.source === 'notifications') {
    examples = ['اشرح بطاقة الإشعارات', 'كيف أوقف الإشعارات خطوة بخطوة'];
  } else if (topicContext?.source === 'connectCloud') {
    examples = ['اشرح بطاقة الاتصال السحابي', 'ما أقسام شاشة إعدادات السحابة'];
  } else if (topicContext?.source === 'switchMode') {
    examples = ['اشرح قسم وضع قاعدة البيانات', 'اشرح التحويل من المحلي إلى السحابي'];
  } else if (topicContext?.source === 'sync') {
    examples = ['اشرح بطاقة المزامنة', 'متى أستخدم مزامنة المحلي إلى السحابة'];
  } else if (screenLabel) {
    examples = [`اشرح لي شاشة ${screenLabel} بالتفصيل`, `ما الأقسام والبطاقات في شاشة ${screenLabel}`];
  } else {
    examples = ['اشرح لي شاشة الحسابات بالتفصيل', 'أين توجد إعدادات الشركة', 'كيف أصل إلى شاشة إعدادات السحابة'];
  }

  return [
    intro,
    'أقدر أكمل معك بشرح الشاشة نفسها أو الحقول أو الأقسام أو الخطوات العملية داخلها، لكن أحتاج تحديد الجزء الأقرب حتى أعطيك جوابًا أدق وأنفع.',
    `جرّب مثلاً: ${examples.join('، ')}.`,
  ].join('\n');
}

function buildDatabaseFallbackActions(conversationState = {}) {
  const focusEntity = conversationState?.focusEntity || null;
  const label = String(focusEntity?.label || focusEntity?.name || '').trim();
  const actions = [];

  if (label) {
    actions.push({ type: 'submit_message', message: `ما رصيد ${label}`, label: 'الرصيد' });
  }

  actions.push({ type: 'submit_message', message: 'كم عدد العملاء', label: 'عدد العملاء' });
  actions.push({ type: 'submit_message', message: 'كم عدد الموردين', label: 'عدد الموردين' });

  return dedupeActions(actions).slice(0, 3);
}

function buildDatabaseFallbackReply(conversationState = {}) {
  const focusEntity = conversationState?.focusEntity || null;
  const label = String(focusEntity?.label || focusEntity?.name || '').trim();
  if (label) {
    return [
      `أفهم أنك تتابع استعلامًا يخص ${label}.`,
      'حالياً القوالب الآمنة تغطي أنواعًا محددة من أسئلة البيانات، لذلك الأفضل أن تطلب النتيجة المطلوبة بشكل مباشر ومختصر.',
      `جرّب مثلاً: ما رصيد ${label}.`,
    ].join('\n');
  }

  return [
    'أفهم أن سؤالك يطلب بيانات من قاعدة النظام.',
    'حالياً أتعامل بشكل أفضل مع العدّ، الأرصدة، وبعض التفاصيل المباشرة للسجلات المعروفة ضمن القوالب الآمنة.',
    'جرّب مثلاً: كم عدد العملاء، أو كم عدد الموردين.',
  ].join('\n');
}

async function callProviderRequest(messages = [], context = {}, overrides = {}) {
  const providerSettings = normalizeProviderSettings(context.providerSettings || {});
  if (!providerSettings.endpoint) {
    return {
      success: false,
      error: 'لم يتم تحديد endpoint للمزوّد.',
    };
  }
  if (!providerSettings.model) {
    return {
      success: false,
      error: 'لم يتم تحديد الموديل.',
    };
  }
  if (!providerSettings.apiKey) {
    return {
      success: false,
      error: 'مفتاح API غير محفوظ.',
    };
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${providerSettings.apiKey}`,
  };

  if (providerSettings.provider === 'openrouter') {
    headers['HTTP-Referer'] = 'https://benajlan.local';
    headers['X-Title'] = 'BenAjlan Assistant';
  }

  const response = await fetch(providerSettings.endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: providerSettings.model,
      temperature: overrides.temperature ?? providerSettings.temperature,
      messages,
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    return {
      success: false,
      error: data?.error?.message || data?.message || `HTTP ${response.status}`,
    };
  }

  const content = data?.choices?.[0]?.message?.content;
  if (!content) {
    return {
      success: false,
      error: 'لم أستلم محتوى صالح من المزوّد.',
    };
  }

  return {
    success: true,
    content: String(content).trim(),
    provider: providerSettings.provider,
    model: providerSettings.model,
  };
}

async function callProvider(message, context = {}) {
  return callProviderRequest(buildProviderMessages(message, context), context);
}

async function extractProviderIntent(message, context = {}) {
  const result = await callProviderRequest(buildIntentMessages(message, context), context, { temperature: 0 });
  if (!result.success) {
    return null;
  }
  return normalizeIntentHint(parseJsonObject(result.content));
}

async function testProviderConnection(rawSettings = {}, context = {}) {
  const providerSettings = normalizeProviderSettings(rawSettings);
  const result = await callProvider('قل: تم الاتصال بنجاح.', {
    ...context,
    providerSettings,
  });

  if (!result.success) {
    return {
      success: false,
      error: result.error,
    };
  }

  return {
    success: true,
    message: result.content,
    provider: result.provider,
    model: result.model,
  };
}

async function handleMessage(message = '', context = {}) {
  const conversationState = normalizeConversationState(context.conversationState || {});
  const history = normalizeConversationHistory(context.history || [], 12);
  const routeHint = normalizeRouteHint(context.routeHint || '');
  const providerSettings = normalizeProviderSettings(context.providerSettings || {});
  const agentContext = {
    ...context,
    history,
    conversationState,
    routeHint,
  };
  const initialClassification = classifyMessage(message, agentContext);
  const explicitIntentHint = normalizeIntentHint(context.intentHint || null);
  const providerIntent = shouldUseProviderIntent(initialClassification, providerSettings, routeHint)
    ? await extractProviderIntent(message, { ...agentContext, providerSettings })
    : null;
  const effectiveIntentHint = mergeIntentHints(providerIntent, explicitIntentHint);
  const classification = mergeClassificationWithIntent(initialClassification, effectiveIntentHint);
  const resolvedContext = {
    ...agentContext,
    providerSettings,
    intentHint: effectiveIntentHint,
  };
  const prefersLocalRoute = routeHint === 'general'
    ? false
    : (classification.route === 'database' || classification.route === 'knowledge' || classification.route === 'command' || classification.hasLocalSignals);

  const commandResult = enrichAssistantResult(withConversationState(await handleCommand(message, resolvedContext), conversationState, 'command'), 'command');
  const knowledgeResult = enrichAssistantResult(withConversationState(answerKnowledge(message, resolvedContext), conversationState, 'knowledge'), 'knowledge');
  const databaseResult = enrichAssistantResult(withConversationState(answerDatabase(message, resolvedContext), conversationState, 'database'), 'database');
  const localResults = {
    command: commandResult,
    knowledge: knowledgeResult,
    database: databaseResult,
  };

  const routeOrder = buildRouteOrder(routeHint, classification.routeOrder);

  for (const route of routeOrder) {
    if (route === 'command' && localResults.command) {
      return {
        success: true,
        route: 'command',
        classification,
        providerEnabled: providerSettings.enabled,
        conversationState: mergeConversationState(conversationState, localResults.command.conversationState),
        ...localResults.command,
      };
    }

    if (route === 'knowledge' && localResults.knowledge) {
      if (classification.route === 'database' && (classification.scores?.database || 0) >= (classification.scores?.knowledge || 0)) {
        continue;
      }

      return {
        success: true,
        route: 'knowledge',
        classification,
        providerEnabled: providerSettings.enabled,
        conversationState: localResults.knowledge.conversationState,
        ...localResults.knowledge,
      };
    }

    if (route === 'database' && localResults.database) {
      return {
        success: true,
        route: 'database',
        classification,
        providerEnabled: providerSettings.enabled,
        conversationState: localResults.database.conversationState,
        ...localResults.database,
      };
    }

    if (route === 'general') {
      if (prefersLocalRoute) {
        continue;
      }

      if (!providerSettings.enabled) {
        return enrichAssistantResult({
          success: true,
          route: 'general',
          classification,
          providerEnabled: false,
          reply: 'المزوّد الخارجي غير مفعل حالياً. افتح إعدادات المزوّد من أعلى نافذة المساعد ثم احفظ المفتاح والموديل والـ endpoint.',
          actions: [{ type: 'open_provider_settings', label: 'إعدادات الاتصال بالمزوّد' }],
          conversationState: mergeConversationState(conversationState, { lastRoute: 'general' }),
        }, 'general');
      }

      const providerResult = await callProvider(message, {
        ...resolvedContext,
        providerSettings,
      });

      if (providerResult.success) {
        return enrichAssistantResult({
          success: true,
          route: 'general',
          classification,
          providerEnabled: true,
          reply: providerResult.content,
          actions: [],
          conversationState: mergeConversationState(conversationState, { lastRoute: 'general' }),
          meta: {
            provider: providerResult.provider,
            model: providerResult.model,
          },
        }, 'general');
      }

      return enrichAssistantResult({
        success: true,
        route: 'general',
        classification,
        providerEnabled: true,
        reply: `تعذر الحصول على رد من المزوّد الخارجي: ${providerResult.error}`,
        actions: [{ type: 'open_provider_settings', label: 'إعدادات الاتصال بالمزوّد' }],
        conversationState: mergeConversationState(conversationState, { lastRoute: 'general' }),
      }, 'general');
    }
  }

  if (routeHint === 'database') {
    return enrichAssistantResult({
      success: true,
      route: 'database',
      classification,
      providerEnabled: providerSettings.enabled,
      reply: buildDatabaseFallbackReply(conversationState),
      actions: buildDatabaseFallbackActions(conversationState),
      conversationState: mergeConversationState(conversationState, { lastRoute: 'database' }),
      queryPlan: effectiveIntentHint?.queryPlan || null,
    }, 'database');
  }

  if (routeHint === 'local') {
    return enrichAssistantResult({
      success: true,
      route: 'knowledge',
      classification,
      providerEnabled: providerSettings.enabled,
      reply: buildKnowledgeFallbackReply(conversationState),
      actions: buildKnowledgeFallbackActions(conversationState),
      conversationState: mergeConversationState(conversationState, { lastRoute: 'knowledge' }),
    }, 'knowledge');
  }

  if (localResults.knowledge && !(classification.route === 'database' && (classification.scores?.database || 0) >= (classification.scores?.knowledge || 0))) {
    return {
      success: true,
      route: 'knowledge',
      classification,
      providerEnabled: providerSettings.enabled,
      conversationState: localResults.knowledge.conversationState,
      ...localResults.knowledge,
    };
  }

  if (localResults.database) {
    return {
      success: true,
      route: 'database',
      classification,
      providerEnabled: providerSettings.enabled,
      conversationState: localResults.database.conversationState,
      ...localResults.database,
    };
  }

  if (localResults.command) {
    return {
      success: true,
      route: 'command',
      classification,
      providerEnabled: providerSettings.enabled,
      conversationState: localResults.command.conversationState,
      ...localResults.command,
    };
  }

  if (classification.route === 'database' || (classification.scores?.database || 0) >= 5) {
    return enrichAssistantResult({
      success: true,
      route: 'database',
      classification,
      providerEnabled: providerSettings.enabled,
      reply: buildDatabaseFallbackReply(conversationState),
      actions: buildDatabaseFallbackActions(conversationState),
      conversationState: mergeConversationState(conversationState, { lastRoute: 'database' }),
      queryPlan: effectiveIntentHint?.queryPlan || null,
    }, 'database');
  }

  if (classification.route === 'knowledge' || (classification.scores?.knowledge || 0) >= 5) {
    return enrichAssistantResult({
      success: true,
      route: 'knowledge',
      classification,
      providerEnabled: providerSettings.enabled,
      reply: buildKnowledgeFallbackReply(conversationState),
      actions: buildKnowledgeFallbackActions(conversationState),
      conversationState: mergeConversationState(conversationState, { lastRoute: 'knowledge' }),
    }, 'knowledge');
  }

  return enrichAssistantResult({
    success: true,
    route: 'knowledge',
    classification,
    providerEnabled: providerSettings.enabled,
    reply: buildKnowledgeFallbackReply(conversationState),
    actions: buildKnowledgeFallbackActions(conversationState),
    conversationState: mergeConversationState(conversationState, { lastRoute: 'knowledge' }),
  }, 'knowledge');
}

module.exports = {
  getProviderPresets,
  normalizeIntentHint,
  normalizeProviderSettings,
  normalizeRouteHint,
  handleMessage,
  testProviderConnection,
};

const { normalizeArabic, containsAny } = require('./intentClassifier');
const { screenCatalog } = require('./screenCatalog');
const { buildAppIndex, findBestScreen, findRelevantValues } = require('./screenIndexer');
const { getScreenProfile } = require('./screenProfiles');
const { getSupportProfile } = require('./supportProfile');
const { buildActiveScreenState, buildTopicContextState } = require('./conversationUtils');

function getScreensRoot(projectRoot) {
  return `${projectRoot}/screens`;
}

function getUserFacingFields(screen) {
  const profile = getScreenProfile(screen.folder);
  if (Array.isArray(profile?.fields) && profile.fields.length) {
    return profile.fields;
  }
  return Array.from(new Set((screen.labels || []).filter((value) => {
    const text = String(value || '').trim();
    if (!text) return false;
    if (text.length > 40) return false;
    if (text.includes('مثال:')) return false;
    if (/^[\d\s.:-]+$/.test(text)) return false;
    return true;
  })));
}

function getUserFacingButtons(screen) {
  const profile = getScreenProfile(screen.folder);
  if (Array.isArray(profile?.buttons) && profile.buttons.length) {
    return profile.buttons;
  }
  return Array.from(new Set((screen.buttons || []).filter((value) => {
    const text = String(value || '').trim();
    if (!text) return false;
    if (text.length > 32) return false;
    if (/^[\d\s.:-]+$/.test(text)) return false;
    return true;
  })));
}

function getUserFacingLogic(screen) {
  const profile = getScreenProfile(screen.folder);
  if (Array.isArray(profile?.logic) && profile.logic.length) {
    return profile.logic;
  }
  return findRelevantValues('logic', screen.functionNames, 8);
}

function buildAppMap(projectRoot) {
  const appIndex = buildAppIndex(projectRoot);

  return {
    screensRoot: getScreensRoot(projectRoot),
    screenFolders: appIndex.screens.map((screen) => screen.folder),
    catalog: screenCatalog,
    screens: appIndex.screens,
    preloadApis: appIndex.preloadApis,
  };
}

function answerBranchKnowledge(message = '', normalizedText = '', appMap = null, context = {}) {
  const conversationState = context?.conversationState || {};
  const topicContext = conversationState?.topicContext || {};
  const branchContext = getBranchKnowledgeContext(context);
  const isBranchConversation = String(topicContext?.kind || '').trim() === 'branch_knowledge'
    || String(topicContext?.source || '').trim() === 'branches';
  const branchWords = ['فرع', 'الفرع', 'فروع', 'الفروع', 'branch', 'branches'];
  const explanationWords = ['كيف', 'اشرح', 'شرح', 'وضح', 'بالتفصيل', 'خطوات', 'معنى', 'يعني', 'وين', 'اين', 'فين', 'اختار', 'اختيار', 'احدد', 'أحدد', 'يحدد', 'من اين', 'من أين'];
  const scopeWords = ['كل الفروع', 'جميع الفروع', 'اكثر من فرع', 'أكثر من فرع', 'عدة فروع'];
  const reportWords = ['كشف حساب', 'التقارير', 'تقرير', 'التقرير', 'رصيد', 'ارصده', 'أرصدة', 'نتيجه', 'نتيجة'];
  const continuationWords = ['اشرح', 'اكمل', 'أكمل', 'كمل', 'كمّل', 'وضح', 'بالتفصيل', 'كل شي', 'كل شيء', 'وبعدين', 'بعدها'];
  const yesWords = ['نعم', 'ايوه', 'أيوه', 'اي', 'أجل'];
  const conciseDatabaseScopeConfirmation = ['نعم', 'ايوه', 'اي', 'اجل'].includes(normalizedText)
    || normalizedText === 'كل الفروع'
    || normalizedText.startsWith('كل الفروع ')
    || normalizedText === 'جميع الفروع'
    || normalizedText.startsWith('جميع الفروع ')
    || normalizedText === 'كلها';
  const databaseScopeExpansionFollowUp = conversationState?.lastRoute === 'database'
    && String(topicContext?.kind || '').trim() === 'branch_scope_prompt'
    && conciseDatabaseScopeConfirmation;
  if (databaseScopeExpansionFollowUp) {
    return null;
  }
  const wantsSharedCustomer = containsAny(normalizedText, ['عميل', 'العميل', 'العملاء'])
    && (containsAny(normalizedText, ['مشترك', 'مشتركه', 'مشتركة']) || containsAny(normalizedText, scopeWords));
  const wantsSharedSupplier = containsAny(normalizedText, ['مورد', 'المورد', 'الموردين'])
    && (containsAny(normalizedText, ['مشترك', 'مشتركه', 'مشتركة']) || containsAny(normalizedText, scopeWords));
  const wantsBranchLocation = containsAny(normalizedText, branchWords)
    && (containsAny(normalizedText, explanationWords) || containsAny(normalizedText, scopeWords));
  const wantsBranchReports = containsAny(normalizedText, reportWords)
    && (containsAny(normalizedText, branchWords) || containsAny(normalizedText, scopeWords));
  const wantsGenericBranchExplanation = containsAny(normalizedText, branchWords)
    && containsAny(normalizedText, ['اشرح', 'شرح', 'وضح', 'كيف', 'معنى', 'يعني']);
  const wantsContinuation = isBranchConversation
    && (containsAny(normalizedText, continuationWords)
      || containsAny(normalizedText, yesWords)
      || containsAny(normalizedText, ['عميل', 'مورد', 'كشف حساب', 'التقارير', 'كل الفروع', 'عدة فروع']));

  if (!wantsSharedCustomer && !wantsSharedSupplier && !wantsBranchLocation && !wantsBranchReports && !wantsGenericBranchExplanation && !wantsContinuation) {
    return null;
  }

  const reportsScreen = findScreenByFolder(appMap, 'reports');
  const customersScreen = findScreenByFolder(appMap, 'customers');
  const suppliersScreen = findScreenByFolder(appMap, 'suppliers');
  const topicScreen = wantsSharedSupplier ? suppliersScreen : wantsSharedCustomer ? customersScreen : reportsScreen;
  const lines = [
    '🧭 بخصوص الفروع داخل النظام، عندك مستويان مهمان يجب التفريق بينهما:',
    ...buildBranchContextStatusLines(branchContext),
    '',
    '1. فرع العمل أو نطاق الفروع الحالي:',
    'يتم تحديده من الشريط العلوي للواجهة عبر محدد الفرع أو محدد نطاق الفروع، وهو الذي يعتمد عليه المساعد والتقارير افتراضياً.',
    branchContext.allowedBranchIds.length > 1
      ? 'إذا كانت صلاحيتك تسمح بأكثر من فرع، فالافتراضي أن أبقى على الفرع المحدد حالياً، ولا أوسّع النطاق إلى عدة فروع أو كل الفروع إلا بطلب واضح منك.'
      : 'إذا كانت صلاحيتك على فرع واحد فقط فلن يتم خلط النتائج مع أي فرع آخر.',
  ];

  if (wantsSharedCustomer || wantsSharedSupplier || wantsContinuation || wantsGenericBranchExplanation) {
    lines.push('');
    lines.push(`2. ما معنى ${wantsSharedSupplier ? 'المورد' : 'العميل'} المشترك بين الفروع؟`);
    lines.push(`المقصود أن ${wantsSharedSupplier ? 'المورد' : 'العميل'} نفسه يمكن أن يكون متاحاً على فرع واحد فقط، أو على عدة فروع محددة، أو على كل الفروع، ويتم ضبط ذلك من داخل بطاقة ${wantsSharedSupplier ? 'المورد' : 'العميل'} في شاشة ${wantsSharedSupplier ? 'الموردين' : 'العملاء'} عبر إعدادات الفروع.`);
    lines.push('هذا لا يعني أن المساعد يجب أن يخلط النتائج دائماً؛ بل يجب أن يحترم أولاً الفرع أو النطاق النشط حالياً ثم يتوسع فقط عند الطلب الصريح.');
  }

  if (wantsBranchReports || wantsContinuation || wantsGenericBranchExplanation || wantsBranchLocation) {
    lines.push('');
    lines.push('3. كيف يتعامل المساعد وكشف الحساب مع الفروع؟');
    lines.push('إذا كان المستخدم على فرع واحد فقط فكل كشف ورصيد وإجمالي يجب أن يبقى على هذا الفرع فقط.');
    lines.push('إذا كان المستخدم مخولاً لعدة فروع لكن النطاق الحالي مضبوط على فرع واحد، فأعطيه نتيجة الفرع المحدد فقط وأوضح له أنني أستطيع التوسيع إذا طلب ذلك.');
    lines.push('أما إذا كان النطاق الحالي على كل الفروع المخول لها، فيمكن عرض النتيجة على هذا النطاق الواسع بوضوح دون خلط غير معلن.');
    lines.push('وشاشة التقارير هي الشاشة الأساسية لكشف الحساب المحدد وكشف الحساب الإجمالي، وليست شاشة الكشف السريع.');
  }

  lines.push('');
  lines.push('إذا أردت، أستطيع الآن أن أشرح لك بالتحديد: من أين تغيّر الفرع الحالي، أو كيف تضبط العميل/المورد كمشترك بين عدة فروع، أو كيف يؤثر الفرع على كشف الحساب والتقارير.');

  const followUpMessage = wantsSharedSupplier
    ? 'اشرح لي كيف أحدد المورد كمورد مشترك بين عدة فروع'
    : wantsSharedCustomer
      ? 'اشرح لي كيف أحدد العميل كعميل مشترك بين عدة فروع'
      : 'كيف يؤثر الفرع على كشف الحساب والتقارير';
  const followUpLabel = wantsSharedSupplier || wantsSharedCustomer ? 'شرح الكيان المشترك' : 'الفروع والتقارير';

  return {
    route: 'knowledge',
    reply: lines.filter(Boolean).join('\n'),
    actions: buildBranchKnowledgeActions(appMap, { followUpMessage, followUpLabel }),
    conversationState: buildGuideConversationState(topicScreen, {
      kind: 'branch_knowledge',
      subject: String(topicScreen?.folder || 'reports').trim(),
      label: 'الفروع ونطاق التقارير',
      source: 'branches',
      valueText: branchContext.mode === 'all' ? 'all' : 'branch',
      hints: ['branch-scope', 'shared-party', 'reports'],
    }),
  };
}

function buildScreenSummary(projectRoot) {
  const appMap = buildAppMap(projectRoot);
  const topScreens = appMap.screens.slice(0, 10).map((screen) => screen.label).join('، ');
  const apiCount = Object.keys(appMap.preloadApis || {}).length;
  return `عدد الشاشات المفهرسة حالياً ${appMap.screenFolders.length} شاشة، وعدد واجهات preload المعروفة ${apiCount}. من أهم الشاشات: ${topScreens}.`;
}

function formatList(values = [], limit = 8) {
  const cleaned = Array.from(new Set((values || []).map((value) => String(value || '').trim()).filter(Boolean)));
  return cleaned.slice(0, limit).join('، ');
}

function buildScreenOverview(screen) {
  const profile = getScreenProfile(screen.folder);
  if (profile?.summary) {
    return profile.summary;
  }
  const buttons = formatList(screen.buttons, 5);
  const labels = formatList([...screen.headings, ...screen.labels, ...screen.placeholders], 6);
  const apis = formatList(screen.apiRefs, 5);
  const functionNames = formatList(screen.functionNames, 6);
  const parts = [
    `${screen.label} مرتبطة بالمجلد ${screen.folder}.`,
    labels ? `أبرز الحقول والعناوين فيها: ${labels}.` : '',
    buttons ? `أبرز الأزرار فيها: ${buttons}.` : '',
    apis ? `وتستخدم واجهات مثل: ${apis}.` : '',
    functionNames ? `ومن الدوال البارزة في منطقها: ${functionNames}.` : '',
  ].filter(Boolean);
  return parts.join(' ');
}

function buildApiSummary(apiName, methods = []) {
  if (!methods.length) {
    return `الواجهة ${apiName} موجودة لكن لم أستخرج منها دوال واضحة حالياً.`;
  }
  return `واجهة ${apiName} تحتوي على دوال مثل: ${formatList(methods.map((method) => method.name), 10)}.`;
}

function formatSteps(steps = []) {
  return (steps || []).map((step, index) => `${index + 1}. ${step}`).join('\n');
}

function formatSections(sections = []) {
  return (sections || []).map((section, index) => `${index + 1}. ${section.title}: ${section.description}`).join('\n');
}

function buildGuideReply(title = '', steps = [], outro = '') {
  return [title, formatSteps(steps), outro].filter(Boolean).join('\n');
}

function buildGenericScreenGuide(screen) {
  const fields = getUserFacingFields(screen).slice(0, 5);
  const buttons = getUserFacingButtons(screen).slice(0, 4);
  const steps = [
    `افتح شاشة ${screen.label} من القائمة الجانبية الرئيسية.`,
    fields.length ? `راجع الحقول الأساسية مثل: ${formatList(fields, 5)}.` : `راجع الحقول المطلوبة داخل الشاشة قبل التنفيذ.`,
    buttons.length ? `استخدم الأزرار المتاحة مثل: ${formatList(buttons, 4)}.` : `نفّذ الإجراء المناسب من عناصر التحكم المتاحة في الشاشة.`,
    `بعد إدخال البيانات أو اختيار الفلاتر نفّذ العملية المطلوبة ثم راقب النتيجة داخل نفس الشاشة.`,
  ];
  return steps;
}

function buildDetailedScreenReply(screen, profile = null) {
  const fields = getUserFacingFields(screen);
  const buttons = getUserFacingButtons(screen);
  const logic = getUserFacingLogic(screen);
  const sections = Array.isArray(profile?.sections) ? profile.sections : [];
  return [
    `🧠 ${buildScreenOverview(screen)}`,
    fields.length ? `الحقول الأساسية: ${formatList(fields, 12)}.` : '',
    buttons.length ? `الأزرار والأدوات: ${formatList(buttons, 10)}.` : '',
    sections.length ? `الأقسام والبطاقات: ${formatSections(sections)}.` : '',
    logic.length ? `المنطق أو الوظائف البارزة: ${formatList(logic, 10)}.` : '',
  ].filter(Boolean).join('\n');
}

function buildScreenConversationState(screen) {
  return {
    ...buildActiveScreenState({
      tabId: screen.tabId,
      label: screen.label,
      folder: screen.folder,
    }),
    ...buildTopicContextState({
      kind: 'screen_knowledge',
      subject: screen.folder,
      label: screen.label,
      source: 'screen',
      valueText: 'overview',
      hints: ['explain', 'fields', 'sections'],
    }),
    lastRoute: 'knowledge',
  };
}

function buildGuideConversationState(screen = null, topic = {}) {
  return {
    ...(screen ? buildActiveScreenState({
      tabId: screen.tabId,
      label: screen.label,
      folder: screen.folder,
    }) : { activeScreen: null }),
    ...buildTopicContextState({
      kind: String(topic.kind || 'screen_guide').trim() || 'screen_guide',
      subject: String(topic.subject || screen?.folder || '').trim(),
      label: String(topic.label || screen?.label || '').trim(),
      source: String(topic.source || 'guide').trim(),
      valueText: String(topic.valueText || '').trim(),
      hints: Array.isArray(topic.hints) ? topic.hints : [],
    }),
    lastRoute: 'knowledge',
  };
}

function buildScreenQuickActions(screen = null, profile = null) {
  if (!screen) return [];
  const actions = [];
  if (screen.tabId) {
    actions.push({ type: 'open_tab', tabId: screen.tabId, label: screen.label });
  }
  actions.push({ type: 'submit_message', message: `اشرح لي شاشة ${screen.label} بالتفصيل`, label: 'شرح مفصل' });
  if (Array.isArray(profile?.sections) && profile.sections.length) {
    actions.push({ type: 'submit_message', message: `ما الأقسام والبطاقات في شاشة ${screen.label}`, label: 'الأقسام' });
  }
  if (getUserFacingFields(screen).length) {
    actions.push({ type: 'submit_message', message: `ما الحقول الأساسية في شاشة ${screen.label}`, label: 'الحقول' });
  }
  return actions.slice(0, 4);
}

const marketPriceFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatMarketPriceValue(value) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) {
    return '';
  }
  return marketPriceFormatter.format(numericValue);
}

function getMarketSourceText(source = '') {
  if (String(source || '').trim().toLowerCase() === 'mt5') {
    return 'MT5 (Bid+Ask)/2';
  }
  return String(source || '').trim() || 'المصدر غير محدد';
}

function getMarketScreens(appMap = null) {
  const folders = ['dashboard', 'orders', 'open-positions'];
  return folders
    .map((folder) => (appMap?.screens || []).find((screen) => screen.folder === folder) || null)
    .filter(Boolean);
}

function buildMarketScreenActions(appMap = null) {
  return getMarketScreens(appMap)
    .filter((screen) => screen?.tabId)
    .map((screen) => ({
      type: 'open_tab',
      tabId: screen.tabId,
      label: screen.label,
    }));
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

function getBranchKnowledgeContext(context = {}) {
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

function getBranchLabel(branchContext = {}) {
  const parts = [];
  if (branchContext.currentBranchName) {
    parts.push(branchContext.currentBranchName);
  }
  if (branchContext.currentBranchCode) {
    parts.push(`(${branchContext.currentBranchCode})`);
  }
  if (!parts.length && branchContext.branchId) {
    parts.push(`رقم ${branchContext.branchId}`);
  }
  return parts.join(' ').trim();
}

function buildBranchContextStatusLines(branchContext = {}) {
  const lines = [];
  const branchLabel = getBranchLabel(branchContext);
  const allowedCount = branchContext.allowedBranchIds.length;
  if (branchLabel) {
    lines.push(`الفرع النشط حالياً في جلستك: ${branchLabel}.`);
  }
  if (allowedCount <= 1) {
    lines.push('صلاحيتك الحالية تبدو على فرع واحد فقط، لذلك يجب أن تبقى نتائج المساعد والتقارير ضمن هذا الفرع فقط.');
  } else if (branchContext.mode === 'all') {
    lines.push(`نطاق العمل الحالي مضبوط على كل الفروع المخول لها وعددها ${allowedCount}.`);
  } else {
    lines.push(`أنت مخول لعدة فروع (${allowedCount}) لكن النطاق الحالي مضبوط على فرع واحد، لذلك تكون الإجابات الافتراضية على الفرع المحدد فقط.`);
  }
  return lines;
}

function buildBranchKnowledgeActions(appMap = null, options = {}) {
  const reportsScreen = findScreenByFolder(appMap, 'reports');
  const customersScreen = findScreenByFolder(appMap, 'customers');
  const suppliersScreen = findScreenByFolder(appMap, 'suppliers');
  const actions = [];
  if (reportsScreen?.tabId) {
    actions.push({ type: 'open_tab', tabId: reportsScreen.tabId, label: reportsScreen.label });
  }
  if (customersScreen?.tabId) {
    actions.push({ type: 'open_tab', tabId: customersScreen.tabId, label: customersScreen.label });
  }
  if (suppliersScreen?.tabId) {
    actions.push({ type: 'open_tab', tabId: suppliersScreen.tabId, label: suppliersScreen.label });
  }
  if (options.followUpMessage) {
    actions.push({
      type: 'submit_message',
      message: String(options.followUpMessage || '').trim(),
      label: String(options.followUpLabel || 'أكمل الشرح').trim() || 'أكمل الشرح',
    });
  }
  return actions.filter((action) => action?.label || action?.message || action?.tabId).slice(0, 4);
}

function resolveMarketSubject(normalizedText = '', conversationState = {}) {
  const hasGold = containsAny(normalizedText, ['ذهب', 'الذهب', 'xau', 'xauusd']);
  const hasSilver = containsAny(normalizedText, ['فضه', 'الفضه', 'الفضة', 'silver', 'xag', 'xagusd']);
  if (hasGold && hasSilver) {
    return 'both';
  }
  if (hasGold) {
    return 'gold';
  }
  if (hasSilver) {
    return 'silver';
  }
  if (containsAny(normalizedText, ['اونصه', 'اونصة', 'الاونصه', 'الاونصة', 'الأونصة'])) {
    return 'gold';
  }
  const topicSubject = String(conversationState?.topicContext?.subject || '').trim();
  return topicSubject || 'both';
}

function isMarketPriceFollowUp(normalizedText = '', conversationState = {}) {
  if (String(conversationState?.topicContext?.kind || '').trim() !== 'market_price') {
    return false;
  }
  return containsAny(normalizedText, [
    'والذهب',
    'والفضه',
    'والفضة',
    'السعر',
    'الان',
    'الآن',
    'حاليا',
    'حاليًا',
    'وين',
    'اين',
    'فين',
    'البطاقه',
    'البطاقة',
    'الشاشات',
    'mt5',
    'xau',
    'xag',
  ]);
}

function answerMarketKnowledge(message = '', normalizedText = '', appMap = null, context = {}) {
  const conversationState = context?.conversationState || {};
  const hasMetalOrMarketInstrument = containsAny(normalizedText, [
    'ذهب',
    'الذهب',
    'فضه',
    'الفضه',
    'الفضة',
    'xau',
    'xag',
    'xauusd',
    'xagusd',
    'spot',
    'mt5',
  ]);
  const hasOunceWord = containsAny(normalizedText, ['اونصه', 'اونصة', 'الاونصه', 'الاونصة', 'الأونصة']);
  const hasOunceSettingsIntent = containsAny(normalizedText, ['جرام', 'سعر الجرام', 'اعدادات', 'إعدادات', 'حساب', 'معادله', 'معادلة', 'تحويل']);
  const hasMarketCardHint = containsAny(normalizedText, [
    'بطاقه اسعار الاونصه',
    'بطاقة اسعار الاونصة',
    'بطاقة أسعار الأونصة',
    'بطاقه سعر الاونصه',
    'بطاقة سعر الأونصة',
    'بطاقات السعر',
    'بطاقات الاسعار',
  ]);
  const followUp = isMarketPriceFollowUp(normalizedText, conversationState);
  const isGenericOuncePriceQuestion = hasOunceWord
    && containsAny(normalizedText, ['سعر', 'اسعار', 'كم', 'الان', 'الآن', 'حاليا', 'حاليًا', 'مباشر', 'لحظي'])
    && !hasOunceSettingsIntent;
  const wantsLocation = containsAny(normalizedText, [
    'بطاقه',
    'بطاقة',
    'شاشه',
    'شاشة',
    'شاشات',
    'مكان',
    'موجود',
    'وين',
    'اين',
    'فين',
  ]) && (hasMetalOrMarketInstrument || hasMarketCardHint || followUp || (hasOunceWord && containsAny(normalizedText, ['اسعار', 'أسعار', 'السعر'])));
  const wantsLivePrice = (
    containsAny(normalizedText, ['سعر', 'اسعار', 'الان', 'الآن', 'حاليا', 'حاليًا', 'مباشر', 'لحظي', 'current', 'live'])
    && (hasMetalOrMarketInstrument || followUp || isGenericOuncePriceQuestion)
  ) || containsAny(normalizedText, ['xauusd', 'xagusd']) || followUp || isGenericOuncePriceQuestion;

  if (!wantsLocation && !wantsLivePrice) {
    return null;
  }

  const subject = resolveMarketSubject(normalizedText, conversationState);
  const snapshot = context?.marketSnapshot && typeof context.marketSnapshot === 'object'
    ? context.marketSnapshot
    : null;
  const screens = getMarketScreens(appMap);
  const actions = buildMarketScreenActions(appMap);
  const lines = [];

  if (wantsLivePrice) {
    const hasGoldPrice = Number.isFinite(Number(snapshot?.price));
    const hasSilverPrice = Number.isFinite(Number(snapshot?.xagPrice));
    if (subject === 'gold') {
      lines.push(hasGoldPrice
        ? `سعر أونصة الذهب الآن: $ ${formatMarketPriceValue(snapshot.price)}`
        : 'سعر أونصة الذهب غير متاح حالياً من بطاقات MT5.');
    } else if (subject === 'silver') {
      lines.push(hasSilverPrice
        ? `سعر أونصة الفضة الآن: $ ${formatMarketPriceValue(snapshot.xagPrice)}`
        : 'سعر أونصة الفضة غير متاح حالياً من بطاقات MT5.');
    } else {
      lines.push(hasGoldPrice
        ? `سعر أونصة الذهب الآن: $ ${formatMarketPriceValue(snapshot.price)}`
        : 'سعر أونصة الذهب غير متاح حالياً من بطاقات MT5.');
      lines.push(hasSilverPrice
        ? `سعر أونصة الفضة الآن: $ ${formatMarketPriceValue(snapshot.xagPrice)}`
        : 'سعر أونصة الفضة غير متاح حالياً من بطاقات MT5.');
    }

    if (snapshot?.success) {
      lines.push(`المصدر الحالي: ${getMarketSourceText(snapshot.source)}.`);
    } else if (snapshot?.error) {
      lines.push(`تعذر قراءة السعر الحي حالياً: ${snapshot.error}.`);
    }
  }

  if (screens.length) {
    lines.push('بطاقات السعر المرتبطة بمنصة MT5 موجودة في الشاشات التالية:');
    screens.forEach((screen, index) => {
      lines.push(`${index + 1}. ${screen.label}`);
    });
    lines.push('يمكنك فتح أي شاشة مباشرة من الأزرار أدناه.');
  }

  const topicLabel = subject === 'gold'
    ? 'سعر أونصة الذهب'
    : subject === 'silver'
      ? 'سعر أونصة الفضة'
      : 'أسعار الأونصة';
  const topicValue = subject === 'gold'
    ? formatMarketPriceValue(snapshot?.price)
    : subject === 'silver'
      ? formatMarketPriceValue(snapshot?.xagPrice)
      : [formatMarketPriceValue(snapshot?.price), formatMarketPriceValue(snapshot?.xagPrice)].filter(Boolean).join(' / ');

  return {
    route: 'knowledge',
    reply: lines.filter(Boolean).join('\n'),
    actions,
    conversationState: {
      activeScreen: null,
      ...buildTopicContextState({
        kind: 'market_price',
        subject,
        label: topicLabel,
        source: String(snapshot?.source || 'mt5'),
        valueText: topicValue,
        hints: screens.map((screen) => screen.label),
      }),
      lastRoute: 'knowledge',
    },
  };
}

function resolveScreenFromConversationState(appMap, conversationState = {}) {
  const activeScreen = conversationState?.activeScreen;
  if (!activeScreen) return null;
  if (activeScreen.folder) {
    return (appMap.screens || []).find((screen) => screen.folder === activeScreen.folder) || null;
  }
  if (activeScreen.tabId) {
    return (appMap.screens || []).find((screen) => screen.tabId === activeScreen.tabId) || null;
  }
  return null;
}

function isScreenFollowUp(normalizedText = '') {
  return containsAny(normalizedText, ['اشرحها', 'اشرحه', 'اشرح هذه', 'اشرح هذي', 'فيها', 'في هذه الشاشه', 'في هذه الشاشة', 'هذه الشاشه', 'هذه الشاشة', 'هذي الشاشه', 'هذي الشاشة', 'وين البطاقه', 'وين البطاقة', 'اين البطاقه', 'اين البطاقة', 'وين القسم', 'اين القسم']);
}

function findMatchingSections(normalizedText, sections = []) {
  const matches = (sections || []).filter((section) => {
    const normalizedTitle = normalizeArabic(section.title || '');
    const simplifiedTitle = normalizedTitle
      .replace(/^بطاقه\s+/, '')
      .replace(/^قسم\s+/, '');
    return (normalizedTitle && normalizedText.includes(normalizedTitle)) || (simplifiedTitle && normalizedText.includes(simplifiedTitle));
  });
  return matches.length ? matches : sections;
}

function findScreenByFolder(appMap, folder = '') {
  return (appMap?.screens || []).find((screen) => screen.folder === folder) || null;
}

function getLatestAssistantReply(history = []) {
  const turn = [...(Array.isArray(history) ? history : [])].reverse().find((item) => item?.role === 'assistant' && item?.text);
  return String(turn?.text || '').trim();
}

function buildEntityCreationResponse(appMap, folder = '', reply = '', extraActions = []) {
  const screen = findScreenByFolder(appMap, folder);
  const openAction = screen?.tabId ? [{ type: 'open_tab', tabId: screen.tabId, label: screen.label }] : [];
  return {
    route: 'knowledge',
    reply,
    actions: [...openAction, ...(Array.isArray(extraActions) ? extraActions : [])],
    conversationState: screen
      ? buildGuideConversationState(screen, {
          kind: 'entity_creation',
          subject: folder,
          label: screen.label,
          source: 'entity_creation',
          valueText: 'workflow',
          hints: ['details', 'fields', 'ordered-entry'],
        })
      : { lastRoute: 'knowledge' },
  };
}

function detectEntityCreationFolder(normalizedText = '') {
  const wantsCreate = containsAny(normalizedText, ['اضيف', 'أضيف', 'اضافة', 'إضافة', 'اضافه', 'انشئ', 'أنشئ', 'انشاء', 'إنشاء', 'سوي', 'سو', 'اعمل', 'أعمل', 'جديد', 'جديده', 'جديدة']);
  if (wantsCreate && containsAny(normalizedText, ['حساب', 'الحساب', 'الحسابات', 'دليل الحسابات', 'شجره الحسابات', 'شجرة الحسابات']) && !containsAny(normalizedText, ['كشف حساب'])) {
    return 'accounts';
  }
  if (wantsCreate && containsAny(normalizedText, ['عميل', 'العميل', 'العملاء', 'زبون', 'الزبائن'])) {
    return 'customers';
  }
  if (wantsCreate && containsAny(normalizedText, ['مورد', 'المورد', 'الموردين', 'الموردون'])) {
    return 'suppliers';
  }
  return '';
}

function answerEntityCreationKnowledge(message = '', normalizedText = '', appMap = null, context = {}) {
  const conversationState = context.conversationState || {};
  const activeFolder = String(conversationState?.activeScreen?.folder || '').trim();
  const latestAssistantReply = normalizeArabic(getLatestAssistantReply(context.history || []));
  const followUpWords = ['اكمل', 'أكمل', 'كمل', 'كمّل', 'وبعدين', 'بعدين', 'بعدها', 'بعد ذلك', 'التفاصيل', 'وضح', 'وضّح', 'اشرح اكثر', 'اشرح أكثر', 'تقصد'];
  const yesWords = ['نعم', 'ايوه', 'أيوه', 'اي', 'أجل'];
  const fieldWords = ['حقل', 'حقول', 'خانه', 'خانات', 'الحقول', 'البيانات المطلوبة', 'المطلوبه', 'المطلوبة', 'الزامي', 'إلزامي'];
  const detailWords = ['اشرح', 'بالتفصيل', 'خطوه بخطوه', 'خطوة بخطوة', 'اكمل', 'أكمل', 'كمل', 'كمّل', 'التفاصيل', 'وضح', 'وضّح', 'اشرح اكثر', 'اشرح أكثر'];
  const orderedEntryWords = ['رتب', 'رتبها', 'الترتيب', 'من الاعلى', 'من الأعلى', 'من الاعلى الى الاسفل', 'من الأعلى إلى الأسفل', 'من فوق', 'داخل الشاشة'];
  const directFolder = detectEntityCreationFolder(normalizedText);
  const hasCreationContext = ['accounts', 'customers', 'suppliers'].includes(activeFolder);
  const assistantAskedFollowUp = containsAny(latestAssistantReply, ['هل تريد', 'اكمل معك', 'أكمل معك', 'الحقول المطلوبة', 'حساب رئيسي', 'حساب فرعي']);
  const isFollowUp = hasCreationContext && (
    containsAny(normalizedText, followUpWords)
    || containsAny(normalizedText, fieldWords)
    || containsAny(normalizedText, ['شجره الحسابات', 'شجرة الحسابات', 'رئيسي', 'فرعي'])
    || (assistantAskedFollowUp && containsAny(normalizedText, yesWords))
  );
  const folder = directFolder || (isFollowUp ? activeFolder : '');
  const wantsMoreDetail = containsAny(normalizedText, detailWords) || (assistantAskedFollowUp && containsAny(normalizedText, yesWords));
  const wantsOrderedEntry = containsAny(normalizedText, orderedEntryWords);

  if (!folder) {
    return null;
  }

  if (folder === 'accounts') {
    if (containsAny(normalizedText, fieldWords)) {
      return buildEntityCreationResponse(
        appMap,
        'accounts',
        'في شاشة الحسابات ستتعامل عادة مع هذه الحقول عند إضافة الحساب: رقم الحساب، اسم الحساب، نوع الحساب، الحساب الأب، الرصيد الافتتاحي، والحالة. الترتيب العملي المناسب هو أن تبدأ برقم الحساب والاسم، ثم تحدد النوع والحساب الأب بحسب مكانه داخل الشجرة، وبعدها تراجع الرصيد الافتتاحي والحالة قبل الحفظ.',
        [
          { type: 'submit_message', message: 'اشرح لي إضافة حساب رئيسي', label: 'حساب رئيسي' },
          { type: 'submit_message', message: 'اشرح لي إضافة حساب فرعي', label: 'حساب فرعي' },
        ]
      );
    }

    if (containsAny(normalizedText, ['تقصد']) && containsAny(normalizedText, ['شجره الحسابات', 'شجرة الحسابات', 'شاشه الحسابات', 'شاشة الحسابات', 'الحسابات'])) {
      return buildEntityCreationResponse(
        appMap,
        'accounts',
        'نعم، أقصد شاشة الحسابات نفسها، وهي شجرة الحسابات داخل النظام. من هذه الشاشة تختار مكان الحساب داخل الدليل ثم تضيفه. حتى أكمل معك بشكل أدق: هل تريد إنشاء حساب رئيسي أم حساب فرعي؟ لأن الفرق الأساسي بينهما يكون في اختيار الحساب الأب ومكان ظهوره داخل الشجرة.',
        [
          { type: 'submit_message', message: 'اشرح لي إضافة حساب رئيسي', label: 'حساب رئيسي' },
          { type: 'submit_message', message: 'اشرح لي إضافة حساب فرعي', label: 'حساب فرعي' },
          { type: 'submit_message', message: 'ما الحقول المطلوبة لإضافة حساب جديد', label: 'الحقول المطلوبة' },
        ]
      );
    }

    if (wantsMoreDetail && !containsAny(normalizedText, ['رئيسي', 'فرعي'])) {
      return buildEntityCreationResponse(
        appMap,
        'accounts',
        'أكمل معك. البداية الصحيحة تكون من شاشة الحسابات وهي شجرة الحسابات نفسها. قبل أن أعطيك الخطوات النهائية بدقة، حدد نوع الحساب الذي تريد إضافته: إذا كان حساباً رئيسياً فسننشئه على مستوى الدليل المناسب، وإذا كان حساباً فرعياً فسنختار الحساب الأب أولاً ثم نضيفه تحته. اختر الآن أيهما تريد.',
        [
          { type: 'submit_message', message: 'اشرح لي إضافة حساب رئيسي', label: 'حساب رئيسي' },
          { type: 'submit_message', message: 'اشرح لي إضافة حساب فرعي', label: 'حساب فرعي' },
          { type: 'submit_message', message: 'ما الحقول المطلوبة لإضافة حساب جديد', label: 'الحقول المطلوبة' },
        ]
      );
    }

    if (containsAny(normalizedText, ['فرعي'])) {
      return buildEntityCreationResponse(
        appMap,
        'accounts',
        'إذا كنت تريد إضافة حساب فرعي فالتسلسل يكون هكذا:\n1. افتح شاشة الحسابات وهي نفسها شجرة الحسابات داخل النظام.\n2. حدد الحساب الأب الذي تريد أن يظهر الحساب الجديد تحته.\n3. اضغط زر حساب جديد.\n4. أدخل رقم الحساب، اسم الحساب، نوع الحساب، واضبط حقل الحساب الأب على الحساب الذي اخترته من الشجرة.\n5. راجع الرصيد الافتتاحي والحالة إذا كنت ستستخدمهما.\n6. احفظ ثم حدّث العرض وتأكد أن الحساب الفرعي ظهر تحت الحساب الأب الصحيح.\nإذا أردت بعد ذلك أشرح لك كيف تراجع الحقول قبل الحفظ أو كيف تميز بين الرئيسي والفرعي في الدليل.',
        [
          { type: 'submit_message', message: 'ما الحقول المطلوبة لإضافة حساب جديد', label: 'الحقول المطلوبة' },
          { type: 'submit_message', message: 'اشرح لي إضافة حساب رئيسي', label: 'الحساب الرئيسي' },
        ]
      );
    }

    if (containsAny(normalizedText, ['رئيسي'])) {
      return buildEntityCreationResponse(
        appMap,
        'accounts',
        'إذا كنت تريد إضافة حساب رئيسي فابدأ هكذا:\n1. افتح شاشة الحسابات من القائمة الجانبية.\n2. اضغط زر حساب جديد.\n3. أدخل رقم الحساب واسم الحساب ونوع الحساب.\n4. اضبط حقل الحساب الأب بما يوافق المستوى الرئيسي الذي تريد أن يظهر فيه الحساب داخل الدليل.\n5. راجع الرصيد الافتتاحي والحالة إذا كانت مستخدمة في إعداداتك.\n6. احفظ ثم تأكد أن الحساب ظهر في موضعه الصحيح داخل الشجرة.\nإذا أردت أكمل معك بعدها مباشرة في شرح إضافة حساب فرعي تحت هذا الحساب.',
        [
          { type: 'submit_message', message: 'اشرح لي إضافة حساب فرعي', label: 'الحساب الفرعي' },
          { type: 'submit_message', message: 'ما الحقول المطلوبة لإضافة حساب جديد', label: 'الحقول المطلوبة' },
        ]
      );
    }

    return buildEntityCreationResponse(
      appMap,
      'accounts',
      'لإضافة حساب جديد نعم تكون العملية من شاشة الحسابات، وهي نفسها شجرة الحسابات داخل النظام.\n1. افتح شاشة الحسابات من القائمة الجانبية.\n2. راجع مكان الحساب داخل الشجرة وحدد المستوى الذي تريد الإضافة تحته إذا كان الحساب فرعياً.\n3. اضغط زر حساب جديد.\n4. أدخل رقم الحساب، اسم الحساب، نوع الحساب، والحساب الأب بحسب موضعه في الدليل.\n5. راجع الرصيد الافتتاحي وحالة الحساب إذا كنت ستستخدمهما.\n6. احفظ ثم حدّث العرض للتأكد أن الحساب ظهر في المكان الصحيح.\nإذا أردت أكمل معك الآن: هل تريد إضافة حساب رئيسي أم حساب فرعي؟',
      [
        { type: 'submit_message', message: 'اشرح لي إضافة حساب رئيسي', label: 'حساب رئيسي' },
        { type: 'submit_message', message: 'اشرح لي إضافة حساب فرعي', label: 'حساب فرعي' },
      ]
    );
  }

  if (folder === 'customers') {
    if (containsAny(normalizedText, fieldWords)) {
      const profile = getScreenProfile('customers');
      return buildEntityCreationResponse(
        appMap,
        'customers',
        `في شاشة العملاء ستجد الحقول التالية لإضافة العميل: ${formatList(profile?.fields || [], 12)}. ابدأ عادة بالبيانات الأساسية مثل رقم العميل واسم العميل، ثم أكمل البيانات الإضافية التي تحتاجها مثل الهاتف والرقم الضريبي والتصنيف، وبعدها راجع أونصة البيع وأونصة الشراء وسقف المديونية إذا كانت مستخدمة لديكم.`,
        [
          { type: 'submit_message', message: 'اشرح لي إضافة عميل جديد خطوة بخطوة', label: 'أكمل الشرح' },
        ]
      );
    }

    if (wantsMoreDetail || wantsOrderedEntry) {
      return buildEntityCreationResponse(
        appMap,
        'customers',
        `ممتاز، هذا ترتيب عملي سريع لإدخال العميل من الأعلى إلى الأسفل داخل الشاشة:
1. ابدأ برقم العميل ثم اسم العميل حتى يتم تعريف السجل بشكل واضح.
2. أدخل وسائل التواصل الأساسية مثل الهاتف أو الجوال.
3. أكمل البيانات التنظيمية التي تحتاجونها مثل الرقم الضريبي، المنطقة، والتصنيف.
4. إذا كان أسلوب العمل عندكم يعتمد على التسعير، فراجع أونصة البيع وأونصة الشراء قبل الحفظ.
5. إذا كنتم تستخدمون حدوداً ائتمانية فضع سقف المديونية في هذه المرحلة.
6. راجع الحقول مرة أخيرة ثم احفظ وتأكد أن العميل ظهر في القائمة.
إذا أردت بعد هذا أشرح لك الحقول المطلوبة فقط بشكل مختصر أو أرتب لك ماذا تملأ أولاً إذا كانت بعض الحقول اختيارية.`,
        [
          { type: 'submit_message', message: 'ما الحقول المطلوبة لإضافة عميل جديد', label: 'الحقول المطلوبة' },
          { type: 'submit_message', message: 'ما أول الحقول التي أبدأ بها عند إضافة عميل جديد', label: 'من أين أبدأ؟' },
        ]
      );
    }

    return buildEntityCreationResponse(
      appMap,
      'customers',
      `لإضافة عميل جديد اتبع هذا التسلسل:
1. افتح شاشة العملاء من القائمة الجانبية.
2. اضغط زر عميل جديد.
3. أدخل البيانات الأساسية مثل رقم العميل واسم العميل.
4. أكمل الحقول المتاحة التي تحتاجها مثل الرقم الضريبي، رقم الهاتف، البريد الإلكتروني، المنطقة، والتصنيف.
5. إذا كنتم تستخدمون إعدادات الأسعار والحدود فراجع أونصة البيع، أونصة الشراء، وسقف المديونية.
6. احفظ ثم حدّث العرض للتأكد أن العميل ظهر ضمن القائمة.
إذا أردت أكمل معك الآن بالحقول المطلوبة أو أرتب لك الإدخال من الأعلى إلى الأسفل داخل الشاشة.`,
      [
        { type: 'submit_message', message: 'ما الحقول المطلوبة لإضافة عميل جديد', label: 'الحقول المطلوبة' },
        { type: 'submit_message', message: 'اشرح لي إضافة عميل جديد خطوة بخطوة', label: 'أكمل الشرح' },
      ]
    );
  }

  if (folder === 'suppliers') {
    if (containsAny(normalizedText, fieldWords)) {
      const profile = getScreenProfile('suppliers');
      return buildEntityCreationResponse(
        appMap,
        'suppliers',
        `في شاشة الموردين ستتعامل مع حقول مثل: ${formatList(profile?.fields || [], 12)}. ابدأ بالبيانات الأساسية مثل رقم المورد واسم المورد، ثم أكمل البيانات المساندة مثل الهاتف والبريد والمنطقة والتصنيف، وبعد ذلك راجع سقف المديونية إذا كان ضمن أسلوب العمل لديكم قبل الحفظ.`,
        [
          { type: 'submit_message', message: 'اشرح لي إضافة مورد جديد خطوة بخطوة', label: 'أكمل الشرح' },
        ]
      );
    }

    if (wantsMoreDetail || wantsOrderedEntry) {
      return buildEntityCreationResponse(
        appMap,
        'suppliers',
        `أكمل معك هنا بشكل عملي. هذا ترتيب مناسب لإدخال المورد داخل الشاشة:
1. ابدأ برقم المورد ثم اسم المورد.
2. أدخل الهاتف أو وسيلة التواصل الأساسية مباشرة بعد الاسم.
3. أكمل البيانات التعريفية مثل الرقم الضريبي، البريد الإلكتروني، المنطقة، والتصنيف إذا كانت مستخدمة لديكم.
4. راجع سقف المديونية أو أي حدود تعامل قبل الحفظ إن كانت جزءاً من إجراءاتكم.
5. احفظ ثم تأكد أن المورد ظهر في القائمة بدون نقص في البيانات الأساسية.
إذا أردت بعدها أذكر لك الحقول المطلوبة فقط بشكل مختصر أو أشرح لك أي بيانات يجب تعبئتها أولاً عند الاستعجال.`,
        [
          { type: 'submit_message', message: 'ما الحقول المطلوبة لإضافة مورد جديد', label: 'الحقول المطلوبة' },
          { type: 'submit_message', message: 'ما أول الحقول التي أبدأ بها عند إضافة مورد جديد', label: 'من أين أبدأ؟' },
        ]
      );
    }

    return buildEntityCreationResponse(
      appMap,
      'suppliers',
      `لإضافة مورد جديد اتبع الخطوات التالية:
1. افتح شاشة الموردين من القائمة الجانبية.
2. اضغط زر مورد جديد.
3. أدخل البيانات الأساسية مثل رقم المورد واسم المورد.
4. أكمل باقي الحقول التي تحتاجها مثل الرقم الضريبي، الهاتف، البريد الإلكتروني، المنطقة، والتصنيف.
5. راجع سقف المديونية وبقية البيانات المتاحة بحسب أسلوب العمل لديكم.
6. احفظ ثم حدّث القائمة للتأكد أن المورد ظهر بشكل صحيح.
إذا أردت أكمل معك الآن بالحقول المطلوبة أو أشرح لك ترتيب الإدخال داخل الشاشة.`,
      [
        { type: 'submit_message', message: 'ما الحقول المطلوبة لإضافة مورد جديد', label: 'الحقول المطلوبة' },
        { type: 'submit_message', message: 'اشرح لي إضافة مورد جديد خطوة بخطوة', label: 'أكمل الشرح' },
      ]
    );
  }

  return null;
}

function answerCuratedKnowledge(normalizedText, appMap = null) {
  const supportProfile = getSupportProfile();
  const companySettingsProfile = getScreenProfile('company-settings');
  const cloudSettingsProfile = getScreenProfile('cloud-settings');
  const companySettingsScreen = findScreenByFolder(appMap, 'company-settings');
  const cloudSettingsScreen = findScreenByFolder(appMap, 'cloud-settings');

  const wantsDeveloperInfo =
    containsAny(normalizedText, [
      'من صنعك',
      'من صممك',
      'من طورك',
      'من المطور',
      'من مطورك',
      'من انشأك',
      'من أنشأك',
      'من ابتكرَك',
      'من ابتكرك',
      'من برمجك',
      'من بنى النظام',
      'من أسسّك',
      'بيانات المطور',
      'بيانات المبرمج',
      'التواصل مع المطور',
      'التواصل مع المبرمج',
      'الدعم الفني',
      'الدعم التقني',
      'ارقام المطور',
      'رقم المطور',
      'ارقام المبرمج',
      'رقم المبرمج',
      'ارقام التواصل',
      'أرقام التواصل',
      'صفحات التواصل',
      'من عملك',
      'من هو مطورك',
      'مين مطورك',
      'مين صنعك',
      'من اللي صممك',
      'من اللي برمجك',
      'من اللي طورك',
      'المبرمج',
    ])
    || (containsAny(normalizedText, ['مطور', 'المطور', 'مبرمج', 'المبرمج'])
      && containsAny(normalizedText, ['بيانات', 'بياناتك', 'ارقام', 'ارقامك', 'رقمك', 'تواصل', 'التواصل', 'اتواصل', 'اتصال', 'الاتصال', 'صفحات', 'صفحاتك', 'واتساب', 'whatsapp', 'واتس']));

  const wantsDeveloperContacts =
    containsAny(normalizedText, [
      'صفحات التواصل',
      'صفحات التواصل الاجتماعي',
      'اظهر صفحات التواصل',
      'أظهر صفحات التواصل',
      'اعرض صفحات التواصل',
      'عرض صفحات التواصل',
      'التواصل الاجتماعي',
      'صفحاتك الاجتماعية',
      'وسائل التواصل',
      'ارسل صفحات التواصل',
      'أرسل صفحات التواصل',
      'من فضلك اظهر صفحات التواصل',
      'من فضلك أظهر صفحات التواصل',
    ])
    || (containsAny(normalizedText, ['التواصل', 'الاتصال', 'واتساب', 'whatsapp', 'تيليجرام', 'telegram', 'انستقرام', 'instagram', 'فيسبوك', 'facebook', 'يوتيوب', 'youtube', 'تيك توك', 'tiktok', 'x'])
      && containsAny(normalizedText, ['اظهر', 'أظهر', 'اعرض', 'عرض', 'ارسل', 'أرسل', 'هات', 'ورني', 'ورّني', 'أبغى', 'ابغى', 'أريد', 'اريد']));

  if (wantsDeveloperContacts) {
    return {
      route: 'knowledge',
      reply: `📱 إليك صفحات التواصل الاجتماعي الخاصة بالمهندس الحسين بن عجلان.
يمكنك فتح أي صفحة مباشرة من البطاقات الظاهرة أدناه.`,
      actions: [],
      contacts: supportProfile.contacts,
    };
  }

  if (wantsDeveloperInfo) {
    const profileLines = Array.isArray(supportProfile.profile) ? supportProfile.profile : [];
    const profileText = profileLines.length
      ? `\n${profileLines.map((line) => `• ${line}`).join('\n')}`
      : '';
    return {
      route: 'knowledge',
      reply: `✨ تم تطويري علي يد ${supportProfile.developerName} — ${supportProfile.developerRole}.${profileText}
—
${supportProfile.summary}
أستمر في التطوير والتعلم المستمر لخدمتك بكفاءة أعلى.`,
      actions: [
        {
          type: 'submit_message',
          message: supportProfile.socialPromptMessage,
          label: supportProfile.socialPromptButton,
        },
      ],
      contacts: [],
    };
  }

  if (containsAny(normalizedText, ['الثيم', 'المظهر', 'الوضع الداكن', 'الوضع الفاتح', 'لون الثيم']) && containsAny(normalizedText, ['كيف', 'اغير', 'تغيير', 'بدل', 'اختار', 'شرح', 'بالتفصيل', 'خطوات']) && !containsAny(normalizedText, ['بطاقه', 'بطاقة', 'قسم', 'اقسام', 'أقسام'])) {
    return {
      route: 'knowledge',
      reply: buildGuideReply(
        '🎨 لتغيير الثيم الحالي اتبع هذه الخطوات:',
        companySettingsProfile?.guides?.theme || [],
        'إذا أردت يمكنني أيضاً شرح بطاقة المظهر والثيمات نفسها بالتفصيل.'
      ),
      actions: [
        { type: 'open_tab', tabId: 'tab-company-settings', label: 'إعدادات الشركة' },
        { type: 'submit_message', message: 'اشرح بطاقة المظهر والثيمات في شاشة إعدادات الشركة', label: 'شرح البطاقة' },
      ],
      conversationState: buildGuideConversationState(companySettingsScreen, {
        subject: 'company-settings',
        label: 'بطاقة المظهر والثيمات',
        source: 'theme',
        valueText: 'guide',
        hints: ['theme', 'appearance'],
      }),
    };
  }

  if (containsAny(normalizedText, ['الاشعارات', 'الإشعارات']) && containsAny(normalizedText, ['كيف اوقف', 'كيف اوقفها', 'اوقف', 'تعطيل', 'الغاء', 'إلغاء', 'اطفي', 'اطفئ', 'شرح', 'كيف'])) {
    return {
      route: 'knowledge',
      reply: buildGuideReply(
        '🔔 لإيقاف الإشعارات أو تعديلها من شاشة إعدادات الشركة:',
        companySettingsProfile?.guides?.notifications || []
      ),
      actions: [
        { type: 'open_tab', tabId: 'tab-company-settings', label: 'إعدادات الشركة' },
        { type: 'submit_message', message: 'اشرح بطاقة الإشعارات في شاشة إعدادات الشركة', label: 'شرح البطاقة' },
      ],
      conversationState: buildGuideConversationState(companySettingsScreen, {
        subject: 'company-settings',
        label: 'بطاقة الإشعارات',
        source: 'notifications',
        valueText: 'guide',
        hints: ['notifications', 'card'],
      }),
    };
  }

  // Subscription / License card knowledge and live status
  const wantsSubscriptionHelp = containsAny(normalizedText, ['اشتراك', 'الاشتراك', 'الباقه', 'الباقة', 'الباقات', 'ترخيص', 'الترخيص', 'license', 'subscription', 'تفعيل', 'التفعيل']);
  if (wantsSubscriptionHelp) {
    const wantsLive = containsAny(normalizedText, ['ما نوع', 'نوع الباقه', 'نوع الباقة', 'كم باقي', 'كم متبقي', 'المتبقي', 'متبقي', 'متى ينتهي', 'ينتهي متى', 'تاريخ الانتهاء', 'الحاله', 'الحالة']);
    const title = wantsLive
      ? '🎫 سأفحص حالة الاشتراك الحالية الآن:'
      : '🎫 بطاقة الاشتراك وإدارة الترخيص:';
    const steps = wantsLive
      ? [
          'سأعرض نوع الباقة، تاريخ الانتهاء، وعدد الأيام المتبقية مباشرة.',
        ]
      : [
          'بيانات الاشتراك تُدار من شاشة التفعيل عند بدء التشغيل أو من قائمة التفعيل عند الحاجة.',
          'يمكنني أيضاً فحص حالة اشتراكك الحالية وعرض نوع الباقة وعدد الأيام المتبقية فوراً.',
        ];
    return {
      route: 'knowledge',
      reply: buildGuideReply(title, steps, wantsLive ? '' : 'اضغط فحص الاشتراك الآن للحصول على التفاصيل.'),
      actions: [{ type: 'check_license_status', label: 'فحص الاشتراك الآن', autoRun: wantsLive === true }],
      conversationState: { lastRoute: 'knowledge' },
    };
  }

  if (containsAny(normalizedText, ['نسخه احتياطيه', 'نسخة احتياطية', 'النسخ الاحتياطي', 'backup', 'باك اب']) && containsAny(normalizedText, ['كيف', 'طريقه', 'طريقة', 'شرح', 'اعمل', 'اسوي', 'أنشئ', 'انشئ', 'وين'])) {
    return {
      route: 'knowledge',
      reply: buildGuideReply(
        '🗂️ لتنفيذ النسخ الاحتياطي من شاشة إعدادات الشركة:',
        companySettingsProfile?.guides?.backup || []
      ),
      actions: [
        { type: 'open_tab', tabId: 'tab-company-settings', label: 'إعدادات الشركة' },
        { type: 'create_backup', label: 'إنشاء نسخة احتياطية الآن' },
        { type: 'open_backup_folder', label: 'فتح مجلد النسخ الاحتياطية' },
      ],
      conversationState: buildGuideConversationState(companySettingsScreen, {
        subject: 'company-settings',
        label: 'النسخ الاحتياطي',
        source: 'backup',
        valueText: 'guide',
        hints: ['backup', 'folder'],
      }),
    };
  }

  if (containsAny(normalizedText, ['الاونصه', 'الأونصة', 'اونصه', 'اين توجد بطاقه الاسعار', 'اين توجد بطاقة الاسعار', 'بطاقه اسعار الاونصه', 'بطاقة أسعار الأونصة', 'اعدادات حساب الاونصه', 'إعدادات حساب الأونصة', 'سعر الجرام من الاونصه'])) {
    return {
      route: 'knowledge',
      reply: buildGuideReply(
        '⚖️ مكان إعدادات حساب الأونصة داخل النظام:',
        companySettingsProfile?.guides?.invoiceOunce || [],
        'وإذا أردت يمكنني شرح كل خيار داخل قسم إعدادات حساب الأونصة بالتفصيل.'
      ),
      actions: [
        { type: 'open_tab', tabId: 'tab-company-settings', label: 'إعدادات الشركة' },
        { type: 'submit_message', message: 'اشرح قسم إعدادات حساب الأونصة بالتفصيل', label: 'شرح أعمق' },
        { type: 'submit_message', message: 'اشرح بطاقة إعدادات الفواتير في شاشة إعدادات الشركة', label: 'بطاقة الفواتير' },
      ],
      conversationState: buildGuideConversationState(companySettingsScreen, {
        subject: 'company-settings',
        label: 'قسم إعدادات حساب الأونصة',
        source: 'invoiceOunce',
        valueText: 'guide',
        hints: ['invoice-ounce', 'invoice-settings'],
      }),
    };
  }

  if (containsAny(normalizedText, ['بطاقه المظهر', 'بطاقة المظهر', 'المظهر والثيمات', 'الوان الثيم', 'ألوان الثيم', 'لون الثيم'])) {
    const sections = findMatchingSections(normalizedText, companySettingsProfile?.sections || []);
    return {
      route: 'knowledge',
      reply: `🎨 الأقسام المرتبطة بالمظهر داخل شاشة إعدادات الشركة:\n${formatSections(sections)}`,
      actions: [
        { type: 'open_tab', tabId: 'tab-company-settings', label: 'إعدادات الشركة' },
        { type: 'submit_message', message: 'اشرح شاشة إعدادات الشركة بالتفصيل', label: 'شرح الشاشة' },
      ],
      conversationState: buildGuideConversationState(companySettingsScreen, {
        subject: 'company-settings',
        label: 'بطاقة المظهر والثيمات',
        source: 'theme-section',
        valueText: 'section',
        hints: ['appearance', 'section'],
      }),
    };
  }

  if (containsAny(normalizedText, ['turso', 'token', 'رابط قاعده البيانات', 'رابط السحابه', 'الاتصال السحابي', 'اختبار الاتصال السحابي', 'كيف اربط السحابه', 'كيف اشبك السحابه']) && !containsAny(normalizedText, ['بطاقه', 'بطاقة', 'قسم'])) {
    return {
      route: 'knowledge',
      reply: buildGuideReply(
        '🔗 لربط الاتصال السحابي من شاشة إعدادات السحابة:',
        cloudSettingsProfile?.guides?.connectCloud || []
      ),
      actions: [
        { type: 'open_tab', tabId: 'tab-cloud-settings', label: 'إعدادات السحابة' },
        { type: 'submit_message', message: 'اشرح بطاقة الاتصال السحابي في شاشة إعدادات السحابة', label: 'شرح البطاقة' },
      ],
      conversationState: buildGuideConversationState(cloudSettingsScreen, {
        subject: 'cloud-settings',
        label: 'بطاقة الاتصال السحابي',
        source: 'connectCloud',
        valueText: 'guide',
        hints: ['cloud', 'connect'],
      }),
    };
  }

  if (containsAny(normalizedText, ['محلي', 'سحابي', 'السحابه', 'السحابي', 'cloud', 'local']) && containsAny(normalizedText, ['كيف', 'احول', 'حول', 'تحويل', 'تبديل', 'او العكس', 'العكس']) && !containsAny(normalizedText, ['اربط', 'اشبك', 'token', 'رابط'])) {
    const wantsBoth = containsAny(normalizedText, ['او العكس', 'العكس']);
    const reply = wantsBoth
      ? [
        '☁️ خطوات التحويل بين المحلي والسحابي:',
        'التحويل إلى السحابي:',
        formatSteps(cloudSettingsProfile?.guides?.switchToCloud || []),
        '',
        'التحويل إلى المحلي:',
        formatSteps(cloudSettingsProfile?.guides?.switchToLocal || []),
      ].filter(Boolean).join('\n')
      : buildGuideReply(
        containsAny(normalizedText, ['سحابي', 'السحابه', 'السحابي', 'cloud']) ? '☁️ للتحويل إلى الوضع السحابي:' : '💾 للتحويل إلى الوضع المحلي:',
        containsAny(normalizedText, ['سحابي', 'السحابه', 'السحابي', 'cloud'])
          ? (cloudSettingsProfile?.guides?.switchToCloud || [])
          : (cloudSettingsProfile?.guides?.switchToLocal || [])
      );

    return {
      route: 'knowledge',
      reply,
      actions: [
        { type: 'open_tab', tabId: 'tab-cloud-settings', label: 'إعدادات السحابة' },
        { type: 'submit_message', message: 'اشرح قسم وضع قاعدة البيانات في شاشة إعدادات السحابة', label: 'وضع القاعدة' },
      ],
      conversationState: buildGuideConversationState(cloudSettingsScreen, {
        subject: 'cloud-settings',
        label: 'التحويل بين المحلي والسحابي',
        source: 'switchMode',
        valueText: 'guide',
        hints: ['cloud-mode', 'local-mode'],
      }),
    };
  }

  if (containsAny(normalizedText, ['مزامنه', 'مزامنة', 'sync', 'ارفع للسحابه', 'رفع للسحابه', 'رفع للسحابة', 'سحب من السحابه'])) {
    return {
      route: 'knowledge',
      reply: buildGuideReply(
        '🔄 بخصوص المزامنة بين المحلي والسحابة:',
        cloudSettingsProfile?.guides?.sync || []
      ),
      actions: [
        { type: 'open_tab', tabId: 'tab-cloud-settings', label: 'إعدادات السحابة' },
        { type: 'submit_message', message: 'اشرح بطاقة المزامنة في شاشة إعدادات السحابة', label: 'شرح المزامنة' },
      ],
      conversationState: buildGuideConversationState(cloudSettingsScreen, {
        subject: 'cloud-settings',
        label: 'بطاقة المزامنة',
        source: 'sync',
        valueText: 'guide',
        hints: ['sync', 'cloud'],
      }),
    };
  }

  if (containsAny(normalizedText, ['كشف حساب سريع', 'الكشف السريع', 'quick statement']) || (containsAny(normalizedText, ['كشف حساب']) && containsAny(normalizedText, ['سريع']))) {
    return {
      route: 'knowledge',
      reply: 'كشف الحساب السريع مخصص لعرض الأرصدة بسرعة فقط. أما كشف الحساب المحدد والإجمالي فمكانهما الأساسي شاشة التقارير الرئيسية، وليس شاشة الكشف السريع.',
      actions: [],
    };
  }

  if (containsAny(normalizedText, ['كشف حساب محدد', 'كشف حساب اجمالي', 'كشف حساب', 'التقارير', 'statement'])) {
    return {
      route: 'knowledge',
      reply: 'طلبات كشف الحساب العادية يجب توجيهها إلى شاشة التقارير الرئيسية. هناك ستجد تبويبات كشف حساب محدد وكشف حساب إجمالي، بينما الكشف السريع مخصص للأرصدة السريعة فقط.',
      actions: [{ type: 'open_tab', tabId: 'tab-reports', label: 'التقارير' }],
      conversationState: { ...buildActiveScreenState({ tabId: 'tab-reports', label: 'التقارير', folder: 'reports' }), lastRoute: 'knowledge' },
    };
  }

  if (containsAny(normalizedText, ['فاتوره البيع', 'فاتورة البيع', 'sales invoice']) && containsAny(normalizedText, ['الاونصه', 'اونصه', 'سعر الجرام', 'الجرام', 'كيف يحسب', 'كيف تتم العمليه', 'العمليه الحسابيه'])) {
    return {
      route: 'knowledge',
      reply: 'في فاتورة البيع يتم أولاً حساب سعر الجرام من الأونصة حسب إعدادات الفواتير. بعد ذلك تُحسب قيمة الذهب من الوزن × سعر الجرام، وتُحسب الأجور من الوزن × الأجور، ثم يتكوّن الإجمالي قبل الضريبة من مجموعهما. بعدها تُحتسب الضريبة بحسب نسبة الضريبة في رأس الفاتورة وبحسب تفعيل ضريبة الأجور، ثم تكون القيمة النهائية = الإجمالي قبل الضريبة + الضريبة. وإذا كان نوع الفاتورة تسكير فإن الضريبة تُصفّر وتُلغى ضريبة الأجور تلقائياً.',
      actions: [{ type: 'open_tab', tabId: 'tab-sales-invoice', label: 'فاتورة البيع' }],
      conversationState: { ...buildActiveScreenState({ tabId: 'tab-sales-invoice', label: 'فاتورة البيع', folder: 'sales-invoice' }), lastRoute: 'knowledge' },
    };
  }

  if (containsAny(normalizedText, ['فاتوره الشراء', 'فاتورة الشراء', 'purchase invoice']) && containsAny(normalizedText, ['الاونصه', 'اونصه', 'سعر الجرام', 'الجرام', 'كيف يحسب', 'كيف تتم العمليه', 'العمليه الحسابيه'])) {
    return {
      route: 'knowledge',
      reply: 'منطق فاتورة الشراء مشابه: سعر الجرام يُستنتج من الأونصة وفق إعدادات الفواتير، ثم قيمة الذهب = الوزن × سعر الجرام، والأجور = الوزن × الأجور، ثم الإجمالي قبل الضريبة = الذهب + الأجور، وبعدها تُحتسب الضريبة بحسب إعدادات الرأس، ثم القيمة النهائية = الإجمالي قبل الضريبة + الضريبة.',
      actions: [{ type: 'open_tab', tabId: 'tab-purchase-invoice', label: 'فاتورة الشراء' }],
      conversationState: { ...buildActiveScreenState({ tabId: 'tab-purchase-invoice', label: 'فاتورة الشراء', folder: 'purchase-invoice' }), lastRoute: 'knowledge' },
    };
  }

  if (containsAny(normalizedText, ['المزود', 'provider', 'api key', 'endpoint', 'اعدادات api', 'اعدادات المساعد'])) {
    return {
      route: 'knowledge',
      reply: 'إعدادات الاتصال بالمزوّد متاحة من الزر العلوي داخل نافذة المساعد. من هناك يمكنك اختيار المزوّد، تحديد الـ endpoint، الموديل، ومفتاح API ثم اختبار الاتصال والحفظ.',
      actions: [{ type: 'open_provider_settings', label: 'إعدادات الاتصال بالمزوّد' }],
      conversationState: { lastRoute: 'knowledge' },
    };
  }

  if (containsAny(normalizedText, ['زر المساعد', 'المساعد العائم', 'نافذه المساعد', 'نافذة المساعد'])) {
    return {
      route: 'knowledge',
      reply: 'زر المساعد العائم يفتح نافذة جانبية ذكية داخل الـ shell. النافذة الجانبية مخصصة للمحادثة، الاختصارات السريعة، والحالة الحالية للمزوّد، ويتوفر في رأسها مفتاح مباشر لإعدادات الاتصال.',
      actions: [],
      conversationState: { lastRoute: 'knowledge' },
    };
  }

  return null;
}

function answerPreloadKnowledge(normalizedText, appMap) {
  const apiEntries = Object.entries(appMap.preloadApis || {});

  if (containsAny(normalizedText, ['واجهات preload', 'واجهات api', 'واجهات برمجيه', 'واجهات برمجية', 'api المتاحه', 'apis'])) {
    const apiNames = apiEntries.map(([name]) => name);
    return {
      route: 'knowledge',
      reply: apiNames.length ? `الواجهات المكشوفة عبر preload تشمل: ${formatList(apiNames, 18)}.` : 'لم أتمكن من استخراج واجهات preload حالياً.',
      actions: [],
    };
  }

  for (const [apiName, methods] of apiEntries) {
    if (normalizedText.includes(normalizeArabic(apiName))) {
      return {
        route: 'knowledge',
        reply: buildApiSummary(apiName, methods),
        actions: [],
      };
    }
  }

  return null;
}

function isKnowledgeContinuationFollowUp(normalizedText = '', context = {}) {
  const conversationState = context?.conversationState || {};
  if (conversationState?.lastRoute !== 'knowledge') {
    return false;
  }
  if (!conversationState?.activeScreen && !conversationState?.topicContext) {
    return false;
  }
  const latestAssistantReply = normalizeArabic(getLatestAssistantReply(context.history || []));
  const followUpWords = ['اشرح', 'اشرحها', 'اشرحه', 'اكمل', 'أكمل', 'كمل', 'كمّل', 'وضح', 'وضّح', 'اشرح اكثر', 'اشرح أكثر', 'فصل', 'فصّل', 'بالتفصيل', 'كل شي', 'كل شيء', 'وبعدين', 'بعدين', 'بعدها'];
  const yesWords = ['نعم', 'ايوه', 'أيوه', 'اي', 'أجل'];
  const assistantInvitedMore = containsAny(latestAssistantReply, ['اذا اردت', 'إذا أردت', 'هل تريد', 'يمكنني', 'أكمل معك', 'اكمل معك']);
  return containsAny(normalizedText, followUpWords) || (assistantInvitedMore && containsAny(normalizedText, yesWords));
}

function answerKnowledgeContinuation(normalizedText = '', appMap = null, context = {}) {
  if (!isKnowledgeContinuationFollowUp(normalizedText, context)) {
    return null;
  }
  const conversationState = context?.conversationState || {};
  const topicContext = conversationState?.topicContext || {};
  const latestAssistantReply = normalizeArabic(getLatestAssistantReply(context.history || []));
  const folder = String(topicContext?.subject || conversationState?.activeScreen?.folder || '').trim();
  const screen = findScreenByFolder(appMap, folder);

  if (String(topicContext?.kind || '').trim() === 'branch_knowledge' || String(topicContext?.source || '').trim() === 'branches') {
    return answerBranchKnowledge(normalizedText, normalizedText, appMap, context);
  }

  if (folder === 'company-settings') {
    const profile = getScreenProfile('company-settings');
    if (topicContext?.source === 'invoiceOunce' || containsAny(latestAssistantReply, ['اعدادات حساب الاونصه', 'قسم اعدادات حساب الاونصه'])) {
      const sections = findMatchingSections(normalizeArabic('قسم إعدادات حساب الأونصة'), profile?.sections || []);
      return {
        route: 'knowledge',
        reply: [
          'أكيد، أكمل معك هنا بشكل أوضح.',
          `القسم المقصود داخل شاشة ${screen?.label || 'إعدادات الشركة'} هو:`,
          formatSections(sections),
          buildGuideReply('والتسلسل العملي داخل هذا القسم يكون كالتالي:', profile?.guides?.invoiceOunce || []),
          'إذا أردت بعدها أشرح لك بطاقة إعدادات الفواتير كاملة أو أوضح لك الأقسام الأخرى داخل الشاشة.',
        ].filter(Boolean).join('\n'),
        actions: [
          { type: 'open_tab', tabId: 'tab-company-settings', label: 'إعدادات الشركة' },
          { type: 'submit_message', message: 'اشرح بطاقة إعدادات الفواتير في شاشة إعدادات الشركة', label: 'بطاقة الفواتير' },
          { type: 'submit_message', message: 'ما الأقسام والبطاقات في شاشة إعدادات الشركة', label: 'كل الأقسام' },
        ],
        conversationState: buildGuideConversationState(screen, {
          subject: 'company-settings',
          label: 'قسم إعدادات حساب الأونصة',
          source: 'invoiceOunce',
          valueText: 'detail',
          hints: ['invoice-ounce', 'invoice-settings'],
        }),
      };
    }

    if (topicContext?.source === 'theme' || topicContext?.source === 'theme-section' || containsAny(latestAssistantReply, ['المظهر والثيمات', 'الثيم', 'المظهر'])) {
      const sections = findMatchingSections(normalizeArabic('بطاقة المظهر والثيمات'), profile?.sections || []);
      return {
        route: 'knowledge',
        reply: [
          'أكيد، هذا شرح أوضح لبطاقة المظهر والثيمات.',
          formatSections(sections),
          buildGuideReply('وللتنفيذ العملي اتبع هذا الترتيب:', profile?.guides?.theme || []),
        ].filter(Boolean).join('\n'),
        actions: [
          { type: 'open_tab', tabId: 'tab-company-settings', label: 'إعدادات الشركة' },
          { type: 'submit_message', message: 'ما الأقسام والبطاقات في شاشة إعدادات الشركة', label: 'كل الأقسام' },
        ],
        conversationState: buildGuideConversationState(screen, {
          subject: 'company-settings',
          label: 'بطاقة المظهر والثيمات',
          source: 'theme',
          valueText: 'detail',
          hints: ['theme', 'appearance'],
        }),
      };
    }

    if (topicContext?.source === 'notifications' || containsAny(latestAssistantReply, ['الاشعارات', 'الإشعارات'])) {
      const sections = findMatchingSections(normalizeArabic('بطاقة الإشعارات'), profile?.sections || []);
      return {
        route: 'knowledge',
        reply: [
          'أكيد، هذا توضيح أعمق لبطاقة الإشعارات.',
          formatSections(sections),
          buildGuideReply('والخطوات العملية لتعديلها:', profile?.guides?.notifications || []),
        ].filter(Boolean).join('\n'),
        actions: [
          { type: 'open_tab', tabId: 'tab-company-settings', label: 'إعدادات الشركة' },
          { type: 'submit_message', message: 'اشرح شاشة إعدادات الشركة بالتفصيل', label: 'شرح الشاشة' },
        ],
        conversationState: buildGuideConversationState(screen, {
          subject: 'company-settings',
          label: 'بطاقة الإشعارات',
          source: 'notifications',
          valueText: 'detail',
          hints: ['notifications', 'card'],
        }),
      };
    }
  }

  if (folder === 'cloud-settings') {
    const profile = getScreenProfile('cloud-settings');
    if (topicContext?.source === 'connectCloud' || containsAny(latestAssistantReply, ['الاتصال السحابي', 'اختبار الاتصال السحابي', 'رابط قاعده البيانات'])) {
      const sections = findMatchingSections(normalizeArabic('بطاقة الاتصال السحابي'), profile?.sections || []);
      return {
        route: 'knowledge',
        reply: [
          'أكيد، هذا شرح أوضح لبطاقة الاتصال السحابي.',
          formatSections(sections),
          buildGuideReply('والتسلسل العملي للربط يكون كالتالي:', profile?.guides?.connectCloud || []),
        ].filter(Boolean).join('\n'),
        actions: [
          { type: 'open_tab', tabId: 'tab-cloud-settings', label: 'إعدادات السحابة' },
          { type: 'submit_message', message: 'اشرح قسم وضع قاعدة البيانات في شاشة إعدادات السحابة', label: 'وضع القاعدة' },
        ],
        conversationState: buildGuideConversationState(screen, {
          subject: 'cloud-settings',
          label: 'بطاقة الاتصال السحابي',
          source: 'connectCloud',
          valueText: 'detail',
          hints: ['cloud', 'connect'],
        }),
      };
    }

    if (topicContext?.source === 'switchMode' || containsAny(latestAssistantReply, ['المحلي والسحابي', 'الوضع السحابي', 'الوضع المحلي'])) {
      const sections = findMatchingSections(normalizeArabic('قسم وضع قاعدة البيانات'), profile?.sections || []);
      return {
        route: 'knowledge',
        reply: [
          'أكيد، أكمل معك هنا في موضوع التحويل بين المحلي والسحابي.',
          formatSections(sections),
          'التحويل إلى السحابي:',
          formatSteps(profile?.guides?.switchToCloud || []),
          '',
          'والتحويل إلى المحلي:',
          formatSteps(profile?.guides?.switchToLocal || []),
        ].filter(Boolean).join('\n'),
        actions: [
          { type: 'open_tab', tabId: 'tab-cloud-settings', label: 'إعدادات السحابة' },
          { type: 'submit_message', message: 'اشرح بطاقة المزامنة في شاشة إعدادات السحابة', label: 'المزامنة' },
        ],
        conversationState: buildGuideConversationState(screen, {
          subject: 'cloud-settings',
          label: 'التحويل بين المحلي والسحابي',
          source: 'switchMode',
          valueText: 'detail',
          hints: ['cloud-mode', 'local-mode'],
        }),
      };
    }

    if (topicContext?.source === 'sync' || containsAny(latestAssistantReply, ['المزامنه', 'المزامنة'])) {
      const sections = findMatchingSections(normalizeArabic('بطاقة المزامنة'), profile?.sections || []);
      return {
        route: 'knowledge',
        reply: [
          'أكيد، هذا توضيح أعمق لبطاقة المزامنة.',
          formatSections(sections),
          buildGuideReply('واستخدمها بهذا الشكل:', profile?.guides?.sync || []),
        ].filter(Boolean).join('\n'),
        actions: [
          { type: 'open_tab', tabId: 'tab-cloud-settings', label: 'إعدادات السحابة' },
          { type: 'submit_message', message: 'اشرح قسم وضع قاعدة البيانات في شاشة إعدادات السحابة', label: 'وضع القاعدة' },
        ],
        conversationState: buildGuideConversationState(screen, {
          subject: 'cloud-settings',
          label: 'بطاقة المزامنة',
          source: 'sync',
          valueText: 'detail',
          hints: ['sync', 'cloud'],
        }),
      };
    }
  }

  if (screen) {
    return answerScreenKnowledge(`اشرح شاشة ${screen.label} بالتفصيل`, normalizeArabic('اشرح الشاشة بالتفصيل'), { screen });
  }

  return null;
}

function answerScreenKnowledge(message, normalizedText, screenMatch) {
  const screen = screenMatch.screen;
  const profile = getScreenProfile(screen.folder);
  const commonAction = buildScreenQuickActions(screen, profile);

  if (containsAny(normalizedText, ['بالتفصيل', 'تفصيل', 'شرح كامل', 'اشرح الشاشه', 'اشرح الشاشة', 'كل شي', 'كل شيء'])) {
    return {
      route: 'knowledge',
      reply: buildDetailedScreenReply(screen, profile),
      actions: commonAction,
      conversationState: buildScreenConversationState(screen),
    };
  }

  if (containsAny(normalizedText, ['بطاقه', 'بطاقة', 'قسم', 'اقسام', 'أقسام', 'وش فيها', 'ما فيها', 'ما يعمل', 'ماذا تعمل']) && Array.isArray(profile?.sections) && profile.sections.length) {
    const sections = findMatchingSections(normalizedText, profile.sections);
    return {
      route: 'knowledge',
      reply: `🧩 الأقسام والبطاقات الأبرز في شاشة ${screen.label}:\n${formatSections(sections)}`,
      actions: commonAction,
      conversationState: buildScreenConversationState(screen),
    };
  }

  if (containsAny(normalizedText, ['كيف', 'خطوات', 'طريقه', 'طريقة', 'شرح', 'بالتفصيل']) && Array.isArray(profile?.guides?.default) && profile.guides.default.length) {
    return {
      route: 'knowledge',
      reply: buildGuideReply(`🛠️ لتنفيذ المهام الأساسية داخل شاشة ${screen.label}:`, profile.guides.default),
      actions: commonAction,
      conversationState: buildScreenConversationState(screen),
    };
  }

  if (containsAny(normalizedText, ['كيف', 'خطوات', 'طريقه', 'طريقة', 'شرح'])) {
    return {
      route: 'knowledge',
      reply: buildGuideReply(`🛠️ لتنفيذ المهام الأساسية داخل شاشة ${screen.label}:`, buildGenericScreenGuide(screen)),
      actions: commonAction,
      conversationState: buildScreenConversationState(screen),
    };
  }

  if (containsAny(normalizedText, ['اين', 'وين', 'فين', 'مكان', 'كيف اوصل', 'كيف اصل'])) {
    return {
      route: 'knowledge',
      reply: `${screen.label} موجودة ضمن القائمة الجانبية الرئيسية، ويمكنني فتحها لك مباشرة إذا أردت.`,
      actions: commonAction,
      conversationState: buildScreenConversationState(screen),
    };
  }

  if (containsAny(normalizedText, ['حقل', 'حقول', 'خانه', 'خانات', 'المدخلات', 'مدخلات', 'البيانات التي تدخل', 'الاعمده', 'الأعمدة'])) {
    const relevant = findRelevantValues(message, getUserFacingFields(screen), 12);
    return {
      route: 'knowledge',
      reply: relevant.length
        ? `أبرز الحقول والعناصر المرتبطة بشاشة ${screen.label}: ${formatList(relevant, 12)}.`
        : `أستطيع شرح بنية شاشة ${screen.label} ووظيفتها، لكني لم أستخرج حقولاً واضحة كفاية منها حالياً.`,
      actions: commonAction,
      conversationState: buildScreenConversationState(screen),
    };
  }

  if (containsAny(normalizedText, ['زر', 'ازرار', 'الأزرار', 'ادوات', 'الأدوات', 'tool', 'buttons'])) {
    const relevant = findRelevantValues(message, getUserFacingButtons(screen), 12);
    return {
      route: 'knowledge',
      reply: relevant.length
        ? `أبرز الأزرار والأدوات في شاشة ${screen.label}: ${formatList(relevant, 12)}.`
        : `لم أستخرج أزراراً نصية واضحة من شاشة ${screen.label} حالياً، لكن يمكنني شرح وظيفة الشاشة نفسها.`,
      actions: commonAction,
      conversationState: buildScreenConversationState(screen),
    };
  }

  if (containsAny(normalizedText, ['api', 'واجهه', 'واجهات', 'برمجي', 'برمجية', 'preload', 'ipc'])) {
    const apiParts = screen.apiDetails
      .map((item) => item.methods.length ? `${item.name}: ${formatList(item.methods, 8)}` : item.name)
      .slice(0, 8);
    return {
      route: 'knowledge',
      reply: apiParts.length
        ? `شاشة ${screen.label} تستخدم واجهات مثل ${formatList(apiParts, 8)}.`
        : `لم أستخرج واجهات واضحة من منطق شاشة ${screen.label} حالياً.`,
      actions: commonAction,
      conversationState: buildScreenConversationState(screen),
    };
  }

  if (containsAny(normalizedText, ['دوال', 'داله', 'دالة', 'منطق', 'logic', 'functions', 'كيف تعمل', 'كيف يشتغل'])) {
    const relevant = findRelevantValues(message, getUserFacingLogic(screen), 12);
    return {
      route: 'knowledge',
      reply: relevant.length
        ? `المنطق الأساسي في شاشة ${screen.label} يشمل: ${formatList(relevant, 12)}.`
        : `أستطيع وصف وظيفة شاشة ${screen.label} العامة، لكنني لم أستخرج منطقاً داخلياً كافياً منها حالياً.`,
      actions: commonAction,
      conversationState: buildScreenConversationState(screen),
    };
  }

  return {
    route: 'knowledge',
    reply: [
      `أكيد، هذه صورة سريعة عن شاشة ${screen.label}.`,
      buildScreenOverview(screen),
      Array.isArray(profile?.buttons) && profile.buttons.length ? `أبرز ما تستطيع تنفيذه فيها: ${formatList(profile.buttons, 5)}.` : '',
      'إذا أردت أكمل معك الآن في الحقول أو الأزرار أو الأقسام بالتفصيل.',
    ].filter(Boolean).join(' '),
    actions: commonAction,
    conversationState: buildScreenConversationState(screen),
  };
}

function answerKnowledge(message = '', context = {}) {
  const normalizedText = normalizeArabic(message);
  const conversationState = context?.conversationState || {};
  const topicContext = conversationState?.topicContext || {};
  const conciseDatabaseScopeConfirmation = ['نعم', 'ايوه', 'اي', 'اجل'].includes(normalizedText)
    || normalizedText === 'كل الفروع'
    || normalizedText.startsWith('كل الفروع ')
    || normalizedText === 'جميع الفروع'
    || normalizedText.startsWith('جميع الفروع ')
    || normalizedText === 'كلها';
  if (conversationState?.lastRoute === 'database'
    && String(topicContext?.kind || '').trim() === 'branch_scope_prompt'
    && conciseDatabaseScopeConfirmation) {
    return null;
  }
  const projectRoot = context.projectRoot || process.cwd();
  const appMap = buildAppMap(projectRoot);

  if (containsAny(normalizedText, ['ما الذي تعرفه', 'ايش تعرف', 'وش تعرف', 'خارطه النظام', 'خريطه النظام', 'الشاشات الموجوده', 'الشاشات الموجودة', 'اعرض الشاشات', 'ماهي الشاشات'])) {
    return {
      route: 'knowledge',
      reply: `${buildScreenSummary(projectRoot)} ويمكنني الآن الشرح عن الحسابات، الفواتير، التقارير، الإعدادات، الأزرار، الحقول، وواجهات preload ومنطق بعض العمليات الداخلية.`,
      actions: [],
    };
  }

  const marketAnswer = answerMarketKnowledge(message, normalizedText, appMap, context);
  if (marketAnswer) return marketAnswer;

  const branchAnswer = answerBranchKnowledge(message, normalizedText, appMap, context);
  if (branchAnswer) return branchAnswer;

  const curatedAnswer = answerCuratedKnowledge(normalizedText, appMap);
  if (curatedAnswer) return curatedAnswer;

  const entityCreationAnswer = answerEntityCreationKnowledge(message, normalizedText, appMap, context);
  if (entityCreationAnswer) return entityCreationAnswer;

  const continuationAnswer = answerKnowledgeContinuation(normalizedText, appMap, context);
  if (continuationAnswer) return continuationAnswer;

  const matchedScreen = findBestScreen(message, { screens: appMap.screens });
  const explicitlyAskedAboutScreen = matchedScreen
    && containsAny(normalizedText, ['شاشه', 'شاشة', 'الشاشه', 'الشاشة', 'screen', 'tab', 'تبويب']);
  if (explicitlyAskedAboutScreen) {
    return answerScreenKnowledge(message, normalizedText, matchedScreen);
  }

  const preloadAnswer = answerPreloadKnowledge(normalizedText, appMap);
  if (preloadAnswer) return preloadAnswer;

  if (matchedScreen) {
    return answerScreenKnowledge(message, normalizedText, matchedScreen);
  }

  const conversationScreen = resolveScreenFromConversationState(appMap, context.conversationState || {});
  if (conversationScreen && isScreenFollowUp(normalizedText)) {
    return answerScreenKnowledge(message, normalizedText, { screen: conversationScreen, score: 0 });
  }

  return null;
}

module.exports = {
  buildAppMap,
  buildScreenSummary,
  answerKnowledge,
};

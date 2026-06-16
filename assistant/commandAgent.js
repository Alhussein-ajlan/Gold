const { normalizeArabic, tokenizeNormalized, containsAny } = require('./intentClassifier');
const { buildAppIndex, findBestScreen } = require('./screenIndexer');
const { screenCatalog, screenFolderByTabId } = require('./screenCatalog');
const { buildActiveScreenState, buildFocusEntityState } = require('./conversationUtils');
const { normalizeToolRequest, buildToolRequestsFromActions } = require('./assistantContracts');
const {
  resolveEntityDefinition,
  resolveEntityTargetFromDb,
  getEntityDefinitionByTable,
  getEntityDisplayName,
  formatEntityChoices,
  formatEntityTargetMissReply,
} = require('./sqlAgent');

function buildActionFromIndexedScreen(indexedScreen = null) {
  if (!indexedScreen?.tabId) return null;
  return {
    type: 'open_tab',
    tabId: indexedScreen.tabId,
    label: indexedScreen.label,
  };
}

function buildCommandResponse(payload = {}) {
  const explicitTools = (Array.isArray(payload.tools) ? payload.tools : []).map((tool) => normalizeToolRequest(tool)).filter(Boolean);
  const actionTools = buildToolRequestsFromActions(payload.actions || []);
  const tools = [...explicitTools, ...actionTools].reduce((acc, item) => {
    const key = JSON.stringify(item);
    if (!acc.seen.has(key)) {
      acc.seen.add(key);
      acc.items.push(item);
    }
    return acc;
  }, { seen: new Set(), items: [] }).items;
  return {
    route: 'command',
    reply: String(payload.reply || '').trim(),
    actions: Array.isArray(payload.actions) ? payload.actions : [],
    attachments: Array.isArray(payload.attachments) ? payload.attachments : [],
    tools,
    conversationState: payload.conversationState || { lastRoute: 'command' },
  };
}

function buildScreenStateFromAction(action = {}) {
  if (!action?.tabId) {
    return {};
  }
  return buildActiveScreenState({
    tabId: action.tabId,
    label: action.label || '',
    folder: screenFolderByTabId[action.tabId] || '',
  });
}

const SUPPORTED_STATEMENT_TABLES = new Set(['customers', 'suppliers', 'accounts']);
const STATEMENT_EXPORT_WORDS = ['صدر', 'صدّر', 'تصدير', 'اصدر', 'اطبع', 'طباعة', 'طباعه', 'جهز', 'جهزلي', 'جهز لي', 'انشئ', 'أنشئ', 'انشاء', 'pdf', 'download', 'export', 'تحميل', 'حمل', 'نزل', 'نزّل'];
const STATEMENT_QUERY_WORDS = ['كشف حساب', 'statement', 'account statement'];
const STATEMENT_PORTRAIT_WORDS = ['عمودي', 'راسي', 'رأسي', 'portrait', 'vertical'];
const STATEMENT_LANDSCAPE_WORDS = ['افقي', 'أفقي', 'عرضي', 'landscape', 'horizontal'];
const STATEMENT_MODEL_OPTIONS = [
  {
    value: 'all',
    number: '1',
    label: 'الكل',
    aliases: ['الكل', 'كل الارصده', 'كل الأرصدة', 'كل العملات', 'ريال وذهب وفضة', 'ريال ذهب فضة', 'ذهب وريال وفضة', 'ذهب ريال فضة', 'فضة وذهب وريال', 'all balances'],
  },
  {
    value: 'both',
    number: '2',
    label: 'ذهب + ريال',
    aliases: ['ذهب وريال', 'ذهب و ريال', 'ذهب ريال', 'ريال وذهب', 'ريال و ذهب', 'ريال ذهب', 'ذهب مع ريال', 'ريال مع ذهب', 'gold cash', 'cash gold'],
  },
  {
    value: 'silver_cash',
    number: '3',
    label: 'فضة + ريال',
    aliases: ['فضة وريال', 'فضة و ريال', 'فضة ريال', 'فضه وريال', 'فضه و ريال', 'فضه ريال', 'ريال وفضة', 'ريال و فضة', 'ريال فضة', 'ريال وفضه', 'ريال و فضه', 'ريال فضه', 'فضة مع ريال', 'فضه مع ريال', 'ريال مع فضة', 'ريال مع فضه', 'silver cash', 'cash silver'],
  },
  {
    value: 'cash',
    number: '4',
    label: 'ريال فقط',
    aliases: ['ريال فقط', 'الريال فقط', 'مبلغ فقط', 'نقد فقط', 'كاش فقط', 'ريال بس', 'cash only'],
  },
  {
    value: 'gold',
    number: '5',
    label: 'ذهب فقط',
    aliases: ['ذهب فقط', 'الذهب فقط', 'ذهب بس', 'gold only'],
  },
  {
    value: 'silver',
    number: '6',
    label: 'فضة فقط',
    aliases: ['فضة فقط', 'الفضة فقط', 'فضه فقط', 'الفضه فقط', 'فضة بس', 'فضه بس', 'silver only'],
  },
];
const STATEMENT_TEMPLATE_OPTIONS = [
  {
    value: 'normal',
    number: '1',
    label: 'النموذج العادي',
    aliases: ['النموذج العادي', 'العادي', 'normal', 'normal template', 'standard', 'standard template', 'الافتراضي', 'القياسي'],
  },
  {
    value: 'simple',
    number: '2',
    label: 'النموذج المبسط',
    aliases: ['النموذج المبسط', 'المبسط', 'simple', 'simple template', 'المختصر', 'المبسطة'],
  },
  {
    value: 'detailed',
    number: '3',
    label: 'النموذج التفصيلي',
    aliases: ['النموذج التفصيلي', 'التفصيلي', 'detailed', 'detailed template', 'المفصل', 'المفصلة'],
  },
  {
    value: 'gold_detailed',
    number: '4',
    label: 'تفصيلي ريال \\ ذهب \\ فضة',
    aliases: ['تفصيلي ريال ذهب فضة', 'ريال ذهب فضة', 'ريال وذهب وفضة', 'gold detailed', 'gold_detailed', 'detailed sar gold silver', 'ريال ذهب فضة تفصيلي'],
  },
  {
    value: 'accounting',
    number: '5',
    label: 'النموذج المحاسبي',
    aliases: ['النموذج المحاسبي', 'المحاسبي', 'accounting', 'accounting template', 'المحاسبه', 'المحاسبة'],
  },
];
const STATEMENT_TEMPLATE_CUE_WORDS = ['قالب', 'قالب الطباعه', 'قالب الطباعة', 'نموذج الطباعه', 'نموذج الطباعة', 'template', 'print template', 'تفصيلي', 'التفصيلي', 'مبسط', 'المبسط', 'عادي', 'العادي', 'محاسبي', 'المحاسبي', 'مفصل', 'المفصل', 'قياسي', 'افتراضي'];
const EXPLANATION_WORDS = ['كيف', 'شرح', 'اشرح', 'خطوات', 'طريقه', 'طريقة', 'وين', 'اين', 'فين'];
const DIRECT_ACTION_WORDS = ['غير', 'بدل', 'حول', 'اجعل', 'خلي', 'خله', 'شغل', 'فعل', 'فعّل', 'اطفي', 'اطف', 'اوقف', 'set', 'switch', 'enable', 'disable'];
const BACKUP_WORDS = ['نسخه احتياطيه', 'نسخة احتياطية', 'النسخ الاحتياطي', 'نسخ احتياطي', 'backup', 'back up', 'باك اب'];
const BACKUP_CREATE_WORDS = ['اعمل', 'سوي', 'سو', 'انشئ', 'انشاء', 'خذ', 'خذلي', 'جهز', 'backup now', 'create backup', 'now'];
const BACKUP_FOLDER_WORDS = ['مجلد', 'المجلد', 'folder', 'folders', 'المسار'];
const THEME_DARK_WORDS = ['داكن', 'dark', 'ليلي'];
const THEME_LIGHT_WORDS = ['فاتح', 'light', 'نهاري', 'ابيض'];
const THEME_AUTO_WORDS = ['تلقائي', 'auto', 'حسب النظام', 'حسب الجهاز'];
const CLOUD_MODE_WORDS = ['سحابي', 'السحابي', 'السحابه', 'السحابة', 'cloud'];
const LOCAL_MODE_WORDS = ['محلي', 'المحلي', 'local', 'offline', 'اوفلاين'];

function containsAnyTokenOrPhrase(text = '', tokens = [], values = []) {
  const normalizedText = String(text || '');
  const tokenSet = new Set(Array.isArray(tokens) ? tokens : tokenizeNormalized(normalizedText));
  return values.some((value) => {
    const normalizedValue = normalizeArabic(String(value || '').trim());
    if (!normalizedValue) {
      return false;
    }
    if (normalizedValue.includes(' ')) {
      return normalizedText.includes(normalizedValue);
    }
    return tokenSet.has(normalizedValue);
  });
}

function escapeRegExp(value = '') {
  return String(value || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function containsExactNumericChoice(text = '', choice = '') {
  const normalizedChoice = String(choice || '').trim();
  if (!normalizedChoice) {
    return false;
  }
  const escapedChoice = escapeRegExp(normalizedChoice);
  return new RegExp(`(^|\\D)${escapedChoice}(?:\\D|$)`).test(String(text || ''));
}

function getStatementModelOption(model = '') {
  const normalizedModel = String(model || '').trim().toLowerCase();
  return STATEMENT_MODEL_OPTIONS.find((option) => option.value === normalizedModel)
    || STATEMENT_MODEL_OPTIONS.find((option) => option.value === 'both')
    || STATEMENT_MODEL_OPTIONS[0];
}

function getStatementModelLabel(model = '') {
  return getStatementModelOption(model)?.label || 'ذهب + ريال';
}

function resolveStatementModelChoice(normalizedText = '', tokens = [], options = {}) {
  if (!normalizedText) {
    return '';
  }
  const tokenList = Array.isArray(tokens) ? tokens : tokenizeNormalized(normalizedText);
  const allowNumeric = options?.allowNumeric !== false;
  const matched = STATEMENT_MODEL_OPTIONS.find((option) => {
    if (allowNumeric && containsExactNumericChoice(normalizedText, option.number)) {
      return true;
    }
    return containsAnyTokenOrPhrase(normalizedText, tokenList, option.aliases);
  });
  return matched?.value || '';
}

function getStatementTemplateOption(template = '') {
  const normalizedTemplate = String(template || '').trim().toLowerCase();
  return STATEMENT_TEMPLATE_OPTIONS.find((option) => option.value === normalizedTemplate) || STATEMENT_TEMPLATE_OPTIONS[0];
}

function getStatementTemplateLabel(template = '') {
  return getStatementTemplateOption(template)?.label || 'النموذج العادي';
}

function resolveStatementTemplateChoice(normalizedText = '', tokens = [], options = {}) {
  if (!normalizedText) {
    return '';
  }
  const tokenList = Array.isArray(tokens) ? tokens : tokenizeNormalized(normalizedText);
  const allowNumeric = options?.allowNumeric !== false;
  const requireCue = !!options?.requireCue;
  if (requireCue && !containsAnyTokenOrPhrase(normalizedText, tokenList, STATEMENT_TEMPLATE_CUE_WORDS)) {
    return '';
  }
  const matched = STATEMENT_TEMPLATE_OPTIONS.find((option) => {
    if (allowNumeric && containsExactNumericChoice(normalizedText, option.number)) {
      return true;
    }
    return containsAnyTokenOrPhrase(normalizedText, tokenList, option.aliases);
  });
  return matched?.value || '';
}

function buildStatementModelActions() {
  return STATEMENT_MODEL_OPTIONS.map((option) => ({
    type: 'submit_message',
    label: `${option.number} - ${option.label}`,
    message: `${option.number} ${option.label}`,
  }));
}

function buildStatementModelPrompt(definition = null, row = {}, options = {}) {
  const entityName = getEntityDisplayName(row, definition) || `رقم ${row?.id || ''}`.trim() || 'المحدد';
  const modelLines = STATEMENT_MODEL_OPTIONS.map((option) => `${option.number} : ${option.label}`).join('\n');
  return buildCommandResponse({
    reply: [`اختر نموذج البيانات لكشف حساب ${definition?.label || 'الكشف'} ${entityName}:`, modelLines, 'يمكنك الرد بالرقم أو بكتابة الاسم.'].join('\n'),
    actions: buildStatementModelActions(),
    conversationState: buildPendingStatementExportState(definition, row, {
      step: 'model',
      template: options?.template || '',
      orientation: options?.orientation || '',
    }),
  });
}

function buildStatementTemplateActions() {
  return STATEMENT_TEMPLATE_OPTIONS.map((option) => ({
    type: 'submit_message',
    label: `${option.number} - ${option.label}`,
    message: `${option.number} ${option.label}`,
  }));
}

function buildStatementTemplatePrompt(definition = null, row = {}, options = {}) {
  const entityName = getEntityDisplayName(row, definition) || `رقم ${row?.id || ''}`.trim() || 'المحدد';
  const modelLabel = options?.model ? getStatementModelLabel(options.model) : '';
  const templateLines = STATEMENT_TEMPLATE_OPTIONS.map((option) => `${option.number} : ${option.label}`).join('\n');
  return buildCommandResponse({
    reply: [
      `اختر قالب الطباعة لكشف حساب ${definition?.label || 'الكشف'} ${entityName}${modelLabel ? ` بنموذج البيانات ${modelLabel}` : ''}:`,
      templateLines,
      'يمكنك الرد بالرقم أو بكتابة الاسم.'
    ].join('\n'),
    actions: buildStatementTemplateActions(),
    conversationState: buildPendingStatementExportState(definition, row, {
      step: 'template',
      model: options?.model || '',
      orientation: options?.orientation || '',
    }),
  });
}

function buildStatementOrientationPrompt(definition = null, row = {}, template = 'normal', options = {}) {
  const entityName = getEntityDisplayName(row, definition) || `رقم ${row?.id || ''}`.trim() || 'المحدد';
  const modelValue = options?.model ? getStatementModelOption(options.model).value : '';
  const modelLabel = modelValue ? getStatementModelLabel(modelValue) : '';
  const templateLabel = getStatementTemplateLabel(template);
  return buildCommandResponse({
    reply: [
      `اختر اتجاه الطباعة للقالب ${templateLabel} لكشف حساب ${definition?.label || 'الكشف'} ${entityName}${modelLabel ? ` بنموذج البيانات ${modelLabel}` : ''}:`,
      '1 : عمودي',
      '2 : أفقي',
      'يمكنك الرد بالرقم أو بكتابة الاسم.'
    ].join('\n'),
    actions: buildStatementOrientationActions(),
    conversationState: buildPendingStatementExportState(definition, row, {
      step: 'orientation',
      model: modelValue,
      template,
    }),
    tools: [{
      name: 'export_statement',
      params: {
        entityType: definition?.kind,
        entityId: Number(row.id),
        entityName,
        model: modelValue,
        template,
      },
    }],
  });
}

function findCatalogScreen(value = '') {
  const rawValue = String(value || '').trim();
  if (!rawValue) return null;
  const normalizedValue = normalizeArabic(rawValue);
  return screenCatalog.find((screen) => {
    if (screen.tabId === rawValue) {
      return true;
    }
    if (normalizeArabic(screen.label || '') === normalizedValue) {
      return true;
    }
    const normalizedAliases = screen.aliases.map((alias) => normalizeArabic(alias));
    return normalizedAliases.some((alias) => normalizedValue.includes(alias) || alias.includes(normalizedValue));
  }) || null;
}

function normalizeThemeMode(value = '') {
  const normalizedValue = normalizeArabic(value);
  if (!normalizedValue) return '';
  if (containsAny(normalizedValue, THEME_DARK_WORDS)) return 'dark';
  if (containsAny(normalizedValue, THEME_LIGHT_WORDS)) return 'light';
  if (containsAny(normalizedValue, THEME_AUTO_WORDS)) return 'auto';
  return '';
}

function getThemeModeLabel(mode = '') {
  if (mode === 'dark') return 'الداكن';
  if (mode === 'light') return 'الفاتح';
  if (mode === 'auto') return 'التلقائي';
  return 'المطلوب';
}

function normalizeCloudMode(value = '') {
  const normalizedValue = normalizeArabic(value);
  if (!normalizedValue) return '';
  if (containsAny(normalizedValue, CLOUD_MODE_WORDS)) return 'cloud';
  if (containsAny(normalizedValue, LOCAL_MODE_WORDS)) return 'local';
  return '';
}

function resolveCommandFromIntentHint(context = {}) {
  const intentHint = context.intentHint;
  if (!intentHint || typeof intentHint !== 'object' || Array.isArray(intentHint)) {
    return null;
  }

  const intentRoute = String(intentHint.route || '').trim().toLowerCase();
  if (intentRoute && intentRoute !== 'command') {
    return null;
  }

  const actionName = String(intentHint.action || '').trim().toLowerCase();
  const target = (intentHint.target && typeof intentHint.target === 'object' && !Array.isArray(intentHint.target))
    ? intentHint.target
    : {};
  const settingText = normalizeArabic(`${target.setting || ''} ${target.metric || ''}`);
  const themeMode = normalizeThemeMode(target.mode || target.value || '');
  const cloudMode = normalizeCloudMode(target.mode || target.value || '');
  const matchedScreen = findCatalogScreen(target.tabId || '') || findCatalogScreen(target.screen || '') || findCatalogScreen(target.label || '');

  const toolHint = normalizeToolRequest(intentHint.tool || null);
  if (toolHint?.name === 'open_screen') {
    const toolScreen = findCatalogScreen(toolHint.params?.tabId || '') || findCatalogScreen(toolHint.params?.screen || '') || findCatalogScreen(toolHint.params?.label || '');
    if (toolScreen) {
      return {
        type: 'open_tab',
        tabId: toolScreen.tabId,
        label: toolScreen.label,
      };
    }
    if (toolHint.params?.tabId && toolHint.params?.label) {
      return {
        type: 'open_tab',
        tabId: String(toolHint.params.tabId),
        label: String(toolHint.params.label),
      };
    }
  }

  if (toolHint?.name === 'open_report_statement') {
    const entityType = String(toolHint.params?.entityType || '').trim();
    const refId = toolHint.params?.refId;
    if (entityType && refId !== undefined && refId !== null && String(refId).trim() !== '') {
      return {
        type: 'open_tab',
        tabId: 'tab-reports',
        label: 'التقارير',
        screenParams: {
          reportType: 'statement',
          entityType,
          refId,
          realId: toolHint.params?.realId ?? null,
          autoLoad: toolHint.params?.autoLoad !== false,
        },
      };
    }
  }

  if (toolHint?.name === 'set_theme') {
    const toolThemeMode = normalizeThemeMode(toolHint.params?.mode || toolHint.params?.value || '');
    if (toolThemeMode) {
      return {
        type: 'set_theme',
        mode: toolThemeMode,
        label: `تغيير الثيم إلى ${getThemeModeLabel(toolThemeMode)}`,
      };
    }
  }

  if (toolHint?.name === 'create_backup') {
    return {
      type: 'create_backup',
      label: 'إنشاء نسخة احتياطية الآن',
    };
  }

  if (toolHint?.name === 'open_backup_folder') {
    return {
      type: 'open_backup_folder',
      label: 'فتح مجلد النسخ الاحتياطية',
    };
  }

  if (toolHint?.name === 'set_connection_mode') {
    const toolCloudMode = normalizeCloudMode(toolHint.params?.mode || (toolHint.params?.enabled ? 'cloud' : 'local'));
    if (toolCloudMode) {
      return {
        type: 'set_cloud_mode',
        enabled: toolCloudMode === 'cloud',
        label: toolCloudMode === 'cloud' ? 'تفعيل الوضع السحابي' : 'التحويل إلى الوضع المحلي',
      };
    }
  }

  if (toolHint?.name === 'open_provider_settings') {
    return {
      type: 'open_provider_settings',
      label: 'إعدادات الاتصال بالمزوّد',
    };
  }

  if (toolHint?.name === 'clear_chat') {
    return {
      type: 'clear_chat',
      label: 'تنظيف الدردشة',
    };
  }

  if (toolHint?.name === 'submit_message' && toolHint.params?.message) {
    return {
      type: 'submit_message',
      label: String(toolHint.params?.label || toolHint.params?.message),
      message: String(toolHint.params.message),
    };
  }

  if (toolHint?.name === 'focus_screen_info' && (toolHint.params?.tabId || toolHint.params?.label)) {
    return {
      type: 'focus_screen_info',
      tabId: String(toolHint.params?.tabId || ''),
      label: String(toolHint.params?.label || ''),
    };
  }

  if (actionName === 'export_statement') {
    return {
      type: 'export_statement',
      label: 'تصدير كشف الحساب',
    };
  }

  if (actionName === 'open_provider_settings') {
    return {
      type: 'open_provider_settings',
      label: 'إعدادات الاتصال بالمزوّد',
    };
  }

  if ((actionName === 'open_tab' || actionName === 'open_screen' || actionName === 'navigate') && matchedScreen) {
    return {
      type: 'open_tab',
      tabId: matchedScreen.tabId,
      label: matchedScreen.label,
    };
  }

  if (actionName === 'set_theme' || containsAny(settingText, ['الثيم', 'المظهر', 'theme'])) {
    if (themeMode) {
      return {
        type: 'set_theme',
        mode: themeMode,
        label: `تغيير الثيم إلى ${getThemeModeLabel(themeMode)}`,
      };
    }
    return {
      type: 'open_tab',
      tabId: 'tab-company-settings',
      label: 'إعدادات الشركة',
    };
  }

  if (actionName === 'create_backup') {
    return {
      type: 'create_backup',
      label: 'إنشاء نسخة احتياطية الآن',
    };
  }

  if (actionName === 'open_backup_folder') {
    return {
      type: 'open_backup_folder',
      label: 'فتح مجلد النسخ الاحتياطية',
    };
  }

  if (actionName === 'set_cloud_mode' || containsAny(settingText, ['الاتصال', 'connection', 'cloud', 'local', 'سحابي', 'محلي'])) {
    if (cloudMode) {
      return {
        type: 'set_cloud_mode',
        enabled: cloudMode === 'cloud',
        label: cloudMode === 'cloud' ? 'تفعيل الوضع السحابي' : 'التحويل إلى الوضع المحلي',
      };
    }
    return {
      type: 'open_tab',
      tabId: 'tab-cloud-settings',
      label: 'إعدادات السحابة',
    };
  }

  if (actionName === 'open_notification_settings') {
    return {
      type: 'open_tab',
      tabId: 'tab-company-settings',
      label: 'إعدادات الشركة',
    };
  }

  return null;
}

function isSupportedStatementDefinition(definition = null) {
  return !!definition && SUPPORTED_STATEMENT_TABLES.has(String(definition.table || ''));
}

function resolveStatementDefinition(normalizedText = '', conversationState = {}) {
  const explicitDefinition = resolveEntityDefinition(normalizedText);
  if (isSupportedStatementDefinition(explicitDefinition)) {
    return explicitDefinition;
  }
  const focusedDefinition = getEntityDefinitionByTable(conversationState?.focusEntity?.table || '');
  return isSupportedStatementDefinition(focusedDefinition) ? focusedDefinition : null;
}

function buildEntityConversationState(definition = null, row = {}) {
  if (!definition || !row?.id) {
    return { lastRoute: 'command' };
  }
  return {
    ...buildFocusEntityState({
      kind: definition.kind,
      table: definition.table,
      id: Number(row.id),
      label: definition.label,
      name: getEntityDisplayName(row, definition),
    }),
    lastRoute: 'command',
  };
}

function getStatementOrientation(normalizedText = '', options = {}) {
  if (!normalizedText) return '';
  const allowNumeric = options?.allowNumeric !== false;
  if ((allowNumeric && containsExactNumericChoice(normalizedText, '2')) || containsAny(normalizedText, STATEMENT_LANDSCAPE_WORDS)) {
    return 'landscape';
  }
  if ((allowNumeric && containsExactNumericChoice(normalizedText, '1')) || containsAny(normalizedText, STATEMENT_PORTRAIT_WORDS)) {
    return 'portrait';
  }
  return '';
}

function buildStatementOrientationActions() {
  return [
    {
      type: 'submit_message',
      label: '1 - عمودي',
      message: '1 عمودي',
    },
    {
      type: 'submit_message',
      label: '2 - أفقي',
      message: '2 أفقي',
    },
  ];
}

function buildPendingStatementExportState(definition = null, row = {}, options = {}) {
  const entityState = buildEntityConversationState(definition, row);
  if (!definition || !row?.id) {
    return entityState;
  }
  const rawStep = String(options?.step || '').trim().toLowerCase();
  const step = ['model', 'template', 'orientation'].includes(rawStep) ? rawStep : 'orientation';
  const rawModel = String(options?.model || '').trim().toLowerCase();
  const rawTemplate = String(options?.template || '').trim().toLowerCase();
  const rawOrientation = String(options?.orientation || '').trim().toLowerCase();
  const model = step === 'model'
    ? ''
    : (STATEMENT_MODEL_OPTIONS.some((option) => option.value === rawModel) ? rawModel : '');
  const template = step === 'template'
    ? ''
    : (STATEMENT_TEMPLATE_OPTIONS.some((option) => option.value === rawTemplate) ? rawTemplate : '');
  const orientation = step === 'orientation'
    ? ''
    : (rawOrientation === 'landscape' ? 'landscape' : (rawOrientation === 'portrait' ? 'portrait' : ''));
  return {
    ...entityState,
    pendingStatementExport: {
      kind: definition.kind,
      table: definition.table,
      id: Number(row.id),
      label: definition.label,
      name: getEntityDisplayName(row, definition) || `رقم ${row.id}`,
      step,
      model,
      template,
      orientation,
    },
  };
}

async function runStatementExport(entityTarget = {}, context = {}, requestText = '', orientation = 'portrait', template = 'normal', model = 'both') {
  const selectedModel = getStatementModelOption(model).value;
  const selectedTemplate = getStatementTemplateOption(template).value;
  const selectedOrientation = orientation === 'landscape' ? 'landscape' : 'portrait';
  if (typeof context.exportStatement !== 'function') {
    return buildCommandResponse({
      reply: 'خدمة تصدير كشف الحساب غير جاهزة حالياً داخل جلسة المساعد.',
      actions: [],
      conversationState: buildEntityConversationState(entityTarget.definition, entityTarget.row),
      tools: [{
        name: 'export_statement',
        params: {
          entityType: entityTarget?.definition?.kind,
          entityId: entityTarget?.row?.id,
          entityName: getEntityDisplayName(entityTarget.row, entityTarget.definition),
          model: selectedModel,
          orientation: selectedOrientation,
          template: selectedTemplate,
        },
      }],
    });
  }

  const displayName = getEntityDisplayName(entityTarget.row, entityTarget.definition) || `رقم ${entityTarget.row.id}`;
  const exportResult = await context.exportStatement({
    type: entityTarget.definition.kind,
    definition: entityTarget.definition,
    row: entityTarget.row,
    id: Number(entityTarget.row.id),
    name: displayName,
    requestText,
    model: selectedModel,
    orientation: selectedOrientation,
    template: selectedTemplate,
    currentUser: context.currentUser || null,
    currentBranch: context.currentBranch || null,
    branchScope: context.branchScope || null,
    branchId: Number(context?.currentBranch?.id || context?.branchScope?.branchId || 0) || null,
    allowedBranchIds: Array.isArray(context?.branchScope?.allowedBranchIds) ? context.branchScope.allowedBranchIds : [],
  });

  if (!exportResult?.success) {
    return buildCommandResponse({
      reply: `تعذر تجهيز كشف حساب ${entityTarget.definition.label} ${displayName}: ${exportResult?.error || 'حدث خطأ غير متوقع أثناء التصدير'}.`,
      actions: [],
      conversationState: {
        ...buildEntityConversationState(entityTarget.definition, entityTarget.row),
        pendingStatementExport: null,
      },
      tools: [{
        name: 'export_statement',
        params: {
          entityType: entityTarget.definition.kind,
          entityId: Number(entityTarget.row.id),
          entityName: displayName,
          model: selectedModel,
          orientation: selectedOrientation,
          template: selectedTemplate,
        },
      }],
    });
  }

  const attachments = Array.isArray(exportResult?.attachments)
    ? exportResult.attachments
    : (exportResult?.attachment ? [exportResult.attachment] : []);

  return buildCommandResponse({
    reply: `جهزت كشف حساب ${entityTarget.definition.label} ${displayName} بعرض البيانات ${getStatementModelLabel(selectedModel)} وبقالب ${getStatementTemplateLabel(selectedTemplate)} وبالنمط ${selectedOrientation === 'landscape' ? 'الأفقي' : 'العمودي'} وأرفقته لك هنا بصيغة جاهزة للعرض والتنزيل.`,
    actions: [],
    attachments,
    conversationState: {
      ...buildEntityConversationState(entityTarget.definition, entityTarget.row),
      pendingStatementExport: null,
    },
    tools: [{
      name: 'export_statement',
      params: {
        entityType: entityTarget.definition.kind,
        entityId: Number(entityTarget.row.id),
        entityName: displayName,
        model: selectedModel,
        orientation: selectedOrientation,
        template: selectedTemplate,
      },
    }],
  });
}

function resolveCommand(text = '', context = {}) {
  const normalizedText = normalizeArabic(text);
  const tokens = tokenizeNormalized(normalizedText);
  const clearWords = ['clear', 'delete', 'remove', 'clean', 'wipe', 'purge', 'reset', 'clure', 'clr', 'احذف', 'حذف', 'امسح', 'مسح', 'نظف', 'تنظيف', 'ازل', 'ازاله', 'افرغ', 'فضي'];
  const chatWords = ['الدردشه', 'دردشه', 'المحادثه', 'محادثه', 'الشات', 'شات', 'chat', 'conversation', 'history', 'messages', 'message'];

  if (containsAny(normalizedText, clearWords) && (containsAny(normalizedText, chatWords) || clearWords.includes(normalizedText))) {
    return {
      type: 'clear_chat',
      label: 'تنظيف الدردشة',
    };
  }

  if (containsAny(normalizedText, ['اعدادات api', 'اعدادات المساعد', 'اتصال بالمزود', 'مفتاح api', 'provider', 'api key', 'endpoint', 'model'])) {
    return {
      type: 'open_provider_settings',
      label: 'إعدادات الاتصال بالمزوّد',
    };
  }

  if (containsAny(normalizedText, STATEMENT_EXPORT_WORDS) && containsAny(normalizedText, STATEMENT_QUERY_WORDS)) {
    return {
      type: 'export_statement',
      label: 'تصدير كشف الحساب',
    };
  }

  const hintedAction = resolveCommandFromIntentHint(context);
  if (hintedAction) {
    return hintedAction;
  }

  const wantsExplanation = containsAnyTokenOrPhrase(normalizedText, tokens, EXPLANATION_WORDS);

  if (!wantsExplanation && containsAny(normalizedText, BACKUP_WORDS)) {
    if (containsAny(normalizedText, BACKUP_FOLDER_WORDS)) {
      return {
        type: 'open_backup_folder',
        label: 'فتح مجلد النسخ الاحتياطية',
      };
    }
    if (containsAny(normalizedText, BACKUP_CREATE_WORDS)) {
      return {
        type: 'create_backup',
        label: 'إنشاء نسخة احتياطية الآن',
      };
    }
  }

  if (!wantsExplanation && containsAny(normalizedText, ['الثيم', 'المظهر', 'الوضع الداكن', 'الوضع الفاتح', 'theme']) && containsAny(normalizedText, DIRECT_ACTION_WORDS)) {
    const themeMode = normalizeThemeMode(normalizedText);
    if (themeMode) {
      return {
        type: 'set_theme',
        mode: themeMode,
        label: `تغيير الثيم إلى ${getThemeModeLabel(themeMode)}`,
      };
    }
    return {
      type: 'open_tab',
      tabId: 'tab-company-settings',
      label: 'إعدادات الشركة',
    };
  }

  if (!wantsExplanation && containsAny(normalizedText, ['السحابه', 'السحابة', 'سحابي', 'محلي', 'cloud', 'local']) && containsAny(normalizedText, [...DIRECT_ACTION_WORDS, 'اتصال', 'الاتصال', 'الوضع'])) {
    const cloudMode = normalizeCloudMode(normalizedText);
    if (cloudMode) {
      return {
        type: 'set_cloud_mode',
        enabled: cloudMode === 'cloud',
        label: cloudMode === 'cloud' ? 'تفعيل الوضع السحابي' : 'التحويل إلى الوضع المحلي',
      };
    }
    return {
      type: 'open_tab',
      tabId: 'tab-cloud-settings',
      label: 'إعدادات السحابة',
    };
  }

  const wantsOpen = containsAny(normalizedText, ['فتح', 'افتح', 'افتحلي', 'افتح لي', 'روح', 'انتقل', 'اذهب', 'ودني', 'خذني', 'اعرض', 'عرض', 'ابي', 'ابغى', 'اريد', 'show', 'open', 'navigate']);
  const matchedScreen = screenCatalog.find((screen) => containsAny(normalizedText, screen.aliases.map((alias) => normalizeArabic(alias))));
  const appIndex = context.projectRoot ? buildAppIndex(context.projectRoot) : null;
  const indexedMatch = appIndex ? findBestScreen(text, appIndex) : null;

  if (matchedScreen && wantsOpen) {
    return {
      type: 'open_tab',
      tabId: matchedScreen.tabId,
      label: matchedScreen.label,
    };
  }

  if (!matchedScreen && indexedMatch?.screen && wantsOpen) {
    return buildActionFromIndexedScreen(indexedMatch.screen);
  }

  if (matchedScreen && containsAnyTokenOrPhrase(normalizedText, tokens, ['وين', 'اين', 'مكان', 'فين'])) {
    return {
      type: 'focus_screen_info',
      tabId: matchedScreen.tabId,
      label: matchedScreen.label,
    };
  }

  if (!matchedScreen && indexedMatch?.screen && containsAnyTokenOrPhrase(normalizedText, tokens, ['وين', 'اين', 'مكان', 'فين'])) {
    return {
      type: 'focus_screen_info',
      tabId: indexedMatch.screen.tabId,
      label: indexedMatch.screen.label,
    };
  }

  return null;
}

async function handleCommand(text = '', context = {}) {
  const normalizedText = normalizeArabic(text);
  const tokens = tokenizeNormalized(normalizedText);
  const conversationState = context.conversationState || {};
  const pendingStatement = conversationState?.pendingStatementExport;
  const pendingModelChoice = pendingStatement?.step === 'model'
    ? resolveStatementModelChoice(normalizedText, tokens)
    : '';
  const pendingTemplateChoice = pendingStatement?.step === 'template'
    ? resolveStatementTemplateChoice(normalizedText, tokens)
    : '';
  const pendingOrientation = pendingStatement?.step === 'orientation' ? getStatementOrientation(normalizedText) : '';

  if (pendingStatement?.id && pendingStatement?.kind && pendingStatement?.table && pendingStatement.step === 'model') {
    const definition = getEntityDefinitionByTable(pendingStatement.table);
    if (!definition) {
      return buildCommandResponse({
        reply: 'تعذر استكمال تجهيز كشف الحساب لأن العنصر المحدد لم يعد متاحاً. أعد طلب الكشف مرة أخرى.',
        actions: [],
        conversationState: {
          ...buildEntityConversationState(definition, {}),
          pendingStatementExport: null,
        },
      });
    }

    if (!pendingModelChoice) {
      return buildStatementModelPrompt(definition, {
        id: pendingStatement.id,
        name: pendingStatement.name,
      }, {
        template: pendingStatement.template || '',
        orientation: pendingStatement.orientation || '',
      });
    }

    const entityTarget = {
      definition,
      row: {
        id: Number(pendingStatement.id),
        name: pendingStatement.name,
      },
      matches: [],
      searchTerm: '',
    };

    if (pendingStatement.template) {
      if (pendingStatement.orientation) {
        return runStatementExport(
          entityTarget,
          context,
          text,
          pendingStatement.orientation,
          pendingStatement.template,
          pendingModelChoice,
        );
      }
      return buildStatementOrientationPrompt(entityTarget.definition, entityTarget.row, pendingStatement.template, {
        model: pendingModelChoice,
      });
    }

    return buildStatementTemplatePrompt(entityTarget.definition, entityTarget.row, {
      model: pendingModelChoice,
      orientation: pendingStatement.orientation || '',
    });
  }

  if (pendingStatement?.id && pendingStatement?.kind && pendingStatement?.table && pendingStatement.step === 'template') {
    const definition = getEntityDefinitionByTable(pendingStatement.table);
    if (!definition) {
      return buildCommandResponse({
        reply: 'تعذر استكمال تجهيز كشف الحساب لأن العنصر المحدد لم يعد متاحاً. أعد طلب الكشف مرة أخرى.',
        actions: [],
        conversationState: {
          ...buildEntityConversationState(definition, {}),
          pendingStatementExport: null,
        },
      });
    }

    if (!pendingTemplateChoice) {
      return buildStatementTemplatePrompt(definition, {
        id: pendingStatement.id,
        name: pendingStatement.name,
      }, {
        model: pendingStatement.model || 'both',
        orientation: pendingStatement.orientation || '',
      });
    }

    const entityTarget = {
      definition,
      row: {
        id: Number(pendingStatement.id),
        name: pendingStatement.name,
      },
      matches: [],
      searchTerm: '',
    };

    if (pendingStatement.orientation) {
      return runStatementExport(
        entityTarget,
        context,
        text,
        pendingStatement.orientation,
        pendingTemplateChoice,
        pendingStatement.model || 'both',
      );
    }

    return buildStatementOrientationPrompt(entityTarget.definition, entityTarget.row, pendingTemplateChoice, {
      model: pendingStatement.model || 'both',
    });
  }

  if (pendingStatement?.id && pendingStatement?.kind && pendingStatement?.table && pendingStatement.step === 'orientation') {
    const definition = getEntityDefinitionByTable(pendingStatement.table);
    if (!definition) {
      return buildCommandResponse({
        reply: 'تعذر استكمال تجهيز كشف الحساب لأن العنصر المحدد لم يعد متاحاً. أعد طلب الكشف مرة أخرى.',
        actions: [],
        conversationState: {
          ...buildEntityConversationState(definition, {}),
          pendingStatementExport: null,
        },
      });
    }

    if (!pendingOrientation) {
      const entityTarget = {
        definition,
        row: {
          id: Number(pendingStatement.id),
          name: pendingStatement.name,
        },
        matches: [],
        searchTerm: '',
      };

      return buildStatementOrientationPrompt(entityTarget.definition, entityTarget.row, pendingStatement.template || 'normal', {
        model: pendingStatement.model || 'both',
      });
    }

    const entityTarget = {
      definition,
      row: {
        id: Number(pendingStatement.id),
        name: pendingStatement.name,
      },
      matches: [],
      searchTerm: '',
    };

    return runStatementExport(
      entityTarget,
      context,
      text,
      pendingOrientation,
      pendingStatement.template || 'normal',
      pendingStatement.model || 'both',
    );
  }

  const action = resolveCommand(text, context);
  if (!action) {
    return null;
  }

  if (action.type === 'export_statement') {
    const definition = resolveStatementDefinition(normalizedText, conversationState);
    const requestedModel = resolveStatementModelChoice(normalizedText, tokens, { allowNumeric: false });
    const requestedTemplate = resolveStatementTemplateChoice(normalizedText, tokens, { allowNumeric: false, requireCue: true });
    const requestedOrientation = getStatementOrientation(normalizedText, { allowNumeric: false });

    if (!definition) {
      return buildCommandResponse({
        reply: 'حدد هل تريد كشف حساب عميل أو مورد أو حساب، ثم اذكر الاسم أو الرقم حتى أجهزه لك.',
        actions: [],
        conversationState: { lastRoute: 'command' },
      });
    }

    const entityTarget = resolveEntityTargetFromDb(text, normalizedText, context.db, definition, conversationState, context);
    if (entityTarget.definition && entityTarget.matches?.length > 1 && !entityTarget.row) {
      return buildCommandResponse({
        reply: `وجدت أكثر من ${entityTarget.definition.label} مطابق: ${formatEntityChoices(entityTarget.matches, entityTarget.definition)}. اذكر الاسم بشكل أدق أو اذكر الرقم حتى أجهز كشف الحساب الصحيح.`,
        actions: [],
        conversationState: { lastRoute: 'command' },
      });
    }

    if (entityTarget.definition && !entityTarget.row && (entityTarget.searchTerm || entityTarget.requestedId !== null)) {
      const scopeHint = entityTarget.resolutionIssue?.scopeMode === 'current_branch'
        ? 'بدّل نطاق الفروع إلى "كل الفروع" من محدد النطاق أعلى الواجهة ثم اطلب مني تصدير كشف الحساب مرة أخرى.'
        : '';
      return buildCommandResponse({
        reply: formatEntityTargetMissReply(entityTarget.definition, entityTarget, {
          scopeHint,
          missingHint: 'تأكد من الاسم أو الرقم ثم أعد المحاولة حتى أتمكن من تجهيز كشف الحساب الصحيح.',
        }),
        actions: [],
        conversationState: { lastRoute: 'command' },
      });
    }

    if (!entityTarget.row) {
      return buildCommandResponse({
        reply: `اذكر اسم ${definition.label} أو رقمه حتى أتمكن من تجهيز كشف الحساب.`,
        actions: [],
        conversationState: { lastRoute: 'command' },
      });
    }

    if (!requestedModel) {
      return buildStatementModelPrompt(entityTarget.definition, entityTarget.row, {
        template: requestedTemplate,
        orientation: requestedOrientation,
      });
    }

    if (!requestedTemplate) {
      return buildStatementTemplatePrompt(entityTarget.definition, entityTarget.row, {
        model: requestedModel,
        orientation: requestedOrientation,
      });
    }

    if (!requestedOrientation) {
      return buildStatementOrientationPrompt(entityTarget.definition, entityTarget.row, requestedTemplate, {
        model: requestedModel,
      });
    }

    return runStatementExport(
      entityTarget,
      context,
      text,
      requestedOrientation,
      requestedTemplate,
      requestedModel,
    );
  }

  if (action.type === 'open_provider_settings') {
    return buildCommandResponse({
      reply: 'فتحت لك نافذة إعدادات الاتصال بالمزوّد من أعلى نافذة المساعد.',
      actions: [action],
      conversationState: { lastRoute: 'command' },
    });
  }

  if (action.type === 'clear_chat') {
    return buildCommandResponse({
      reply: 'سأحذف محتوى الدردشة الحالية الآن.',
      actions: [action],
      conversationState: { focusEntity: null, activeScreen: null, lastRoute: 'command' },
    });
  }

  if (action.type === 'create_backup') {
    return buildCommandResponse({
      reply: 'سأنشئ لك نسخة احتياطية الآن من قاعدة البيانات الحالية.',
      actions: [action],
      conversationState: { lastRoute: 'command' },
    });
  }

  if (action.type === 'open_backup_folder') {
    return buildCommandResponse({
      reply: 'سأفتح لك مجلد النسخ الاحتياطية الآن.',
      actions: [action],
      conversationState: { lastRoute: 'command' },
    });
  }

  if (action.type === 'set_theme') {
    return buildCommandResponse({
      reply: `سأغيّر الثيم إلى الوضع ${getThemeModeLabel(action.mode)} الآن.`,
      actions: [action],
      conversationState: { lastRoute: 'command' },
    });
  }

  if (action.type === 'set_cloud_mode') {
    return buildCommandResponse({
      reply: action.enabled
        ? 'سأحوّل الاتصال الآن إلى الوضع السحابي.'
        : 'سأحوّل الاتصال الآن إلى الوضع المحلي.',
      actions: [action],
      conversationState: { lastRoute: 'command' },
    });
  }

  if (action.type === 'focus_screen_info') {
    const openAction = action.tabId
      ? {
          type: 'open_tab',
          tabId: action.tabId,
          label: action.label,
        }
      : action;
    return buildCommandResponse({
      reply: `شاشة ${action.label} موجودة ضمن القائمة الجانبية الرئيسية، ويمكنك فتحها مباشرة من الزر أدناه.`,
      actions: [openAction],
      conversationState: { ...buildScreenStateFromAction(openAction), lastRoute: 'command' },
    });
  }

  if (action.type === 'open_tab') {
    return buildCommandResponse({
      reply: `سأفتح لك شاشة ${action.label}.`,
      actions: [action],
      conversationState: { ...buildScreenStateFromAction(action), lastRoute: 'command' },
    });
  }

  return buildCommandResponse({
    reply: `هذه العملية مرتبطة بشاشة ${action.label}.`,
    actions: [action],
    conversationState: { ...buildScreenStateFromAction(action), lastRoute: 'command' },
  });
}

module.exports = {
  screenCatalog,
  resolveCommand,
  handleCommand,
};

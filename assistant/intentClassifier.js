const ARABIC_DIGITS = {
  '٠': '0',
  '١': '1',
  '٢': '2',
  '٣': '3',
  '٤': '4',
  '٥': '5',
  '٦': '6',
  '٧': '7',
  '٨': '8',
  '٩': '9',
  '۰': '0',
  '۱': '1',
  '۲': '2',
  '۳': '3',
  '۴': '4',
  '۵': '5',
  '۶': '6',
  '۷': '7',
  '۸': '8',
  '۹': '9',
};

function normalizeArabic(text = '') {
  return String(text || '')
    .split('')
    .map((char) => ARABIC_DIGITS[char] || char)
    .join('')
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670]/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/[ـ]+/g, '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenizeNormalized(text = '') {
  return Array.from(new Set(
    String(text || '')
      .split(' ')
      .map((token) => token.trim())
      .filter((token) => token.length >= 2)
  ));
}

function containsAny(text, values = []) {
  return values.some((value) => text.includes(value));
}

function containsAll(text, values = []) {
  return values.every((value) => text.includes(value));
}

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

function classifyMessage(message = '', context = {}) {
  const rawText = String(message || '').trim();
  const normalizedText = normalizeArabic(rawText);
  const tokens = tokenizeNormalized(normalizedText);
  const conversationState = context?.conversationState || {};
  const scores = {
    general: 0,
    database: 0,
    knowledge: 0,
    command: 0,
  };

  const openVerbs = ['فتح', 'افتح', 'افتحلي', 'افتح لي', 'روح', 'اذهب', 'انتقل', 'ودني', 'خذني', 'طلع', 'اعرض', 'عرض', 'ورني', 'ابي', 'ابغى', 'اريد', 'أريد', 'show', 'open', 'navigate'];
  const screenWords = ['شاشه', 'واجهه', 'نافذه', 'زر', 'حقل', 'خانه', 'خانات', 'عداد', 'اداه', 'ادوات', 'اعداد', 'اعدادات', 'المساعد', 'الفاتوره', 'فاتوره', 'التقارير', 'كشف', 'اوامر', 'اوردر', 'سند', 'قيود', 'شارت'];
  const knowledgeWords = ['كيف', 'ليش', 'لماذا', 'وش', 'اشرح', 'شرح', 'طريقه', 'اليه', 'الية', 'منطق', 'يحصل', 'تحسب', 'يحسب', 'معادله', 'الفرق', 'معنى', 'وظيفه', 'وظيفة', 'مطور', 'المطور', 'مبرمج', 'المبرمج', 'الدعم الفني', 'الدعم التقني'];
  const databaseWords = ['كم', 'عدد', 'اجمالي', 'مجموع', 'رصيد', 'ارصده', 'أرصدة', 'مدين', 'دائن', 'الدائنون', 'الدائنين', 'كشف حساب', 'تقرير', 'تقارير', 'استعلام', 'بيانات', 'حركه', 'الحركه', 'ضرائب', 'ضريبه', 'اسم', 'معلومات', 'تفاصيل', 'موجود'];
  const reportWords = ['كشف حساب سريع', 'كشف حساب محدد', 'كشف حساب اجمالي', 'ميزان المراجعه', 'دفتر الاستاذ', 'الميزانيه', 'قائمه الدخل', 'الاقرار الضريبي'];
  const generalWords = ['من هو', 'ما هو', 'معلومه عامه', 'معلومة عامة', 'عام', 'خارجي', 'ويب', 'انترنت', 'google'];
  const entityWords = ['عميل', 'العملاء', 'مورد', 'الموردين', 'حساب', 'الحسابات', 'فاتوره', 'فواتير', 'سند', 'قيود', 'اوردر', 'اوامر', 'مستخدم', 'المستخدمين'];
  const entityDatabaseWords = ['رصيد', 'حساب', 'مديونيه', 'مديونية', 'له', 'لها', 'عليه', 'عليها', 'اخر', 'آخر', 'تاريخ', 'متى', 'فاتوره', 'فاتورة', 'فواتير', 'سند', 'اوردر', 'مستحق'];
  const accountHierarchyWords = ['التابعة', 'التابعه', 'تابعة', 'تابعه', 'فرعية', 'فرعيه', 'الفرعية', 'الفرعيه', 'تابعين', 'التابعين', 'ابناء', 'أبناء', 'الابناء', 'الأبناء'];
  const providerWords = ['اعدادات api', 'اتصال بالمزود', 'المزود', 'provider', 'api key', 'endpoint', 'model'];
  const clearWords = ['clear', 'delete', 'remove', 'clean', 'wipe', 'purge', 'reset', 'clure', 'clr', 'احذف', 'حذف', 'امسح', 'مسح', 'نظف', 'تنظيف', 'ازل', 'ازاله', 'افرغ', 'فضي'];
  const chatWords = ['الدردشه', 'دردشه', 'المحادثه', 'محادثه', 'الشات', 'شات', 'chat', 'conversation', 'history', 'messages', 'message'];
  const databaseFollowupWords = ['فاتوره', 'فاتورة', 'فواتير', 'رصيد', 'ارصده', 'أرصدة', 'حساب', 'مديونيه', 'مديونية', 'له', 'عليه', 'تاريخ', 'متى', 'اخر', 'آخر', 'سند', 'اوردر', 'التابعة', 'التابعه', 'فرعية', 'فرعيه', 'تابعين', 'التابعين'];
  const screenFollowupWords = ['اشرحها', 'اشرحه', 'هذه الشاشه', 'هذه الشاشة', 'هذي الشاشة', 'فيها', 'وين البطاقة', 'اين البطاقة', 'وين القسم', 'اين القسم', 'الثيم', 'المظهر', 'الاشعارات', 'الإشعارات', 'السحابه', 'السحابة', 'الاونصه', 'الأونصة'];
  const followupPronouns = ['له', 'لها', 'عليه', 'عليها', 'هذا', 'هذه', 'هذي', 'هذا العميل', 'هذا المورد', 'هذا الحساب'];
  const entityCreationWords = ['اضيف', 'اضافة', 'اضافه', 'انشئ', 'انشاء', 'جديد', 'جديده', 'جديدة', 'سوي', 'اعمل'];
  const entityCreationTargets = ['حساب', 'الحسابات', 'دليل الحسابات', 'شجره الحسابات', 'شجرة الحسابات', 'عميل', 'العملاء', 'زبون', 'الزبائن', 'مورد', 'الموردين', 'الموردون'];
  const entityCreationQuestionWords = ['كيف', 'خطوات', 'شرح', 'اشرح', 'طريقه', 'طريقة', 'وين', 'اين', 'فين', 'ابغى', 'ابي', 'اريد', 'أريد'];
  const entityCreationFollowupWords = ['اكمل', 'أكمل', 'كمل', 'كمّل', 'تقصد', 'رئيسي', 'فرعي', 'الحقول', 'حقل', 'حقول', 'خانات', 'خانة', 'البيانات المطلوبة', 'ترتيب', 'رتب', 'اشرح اكثر', 'اشرح أكثر', 'وضح', 'وضّح'];
  const simpleYesWords = ['نعم', 'ايوه', 'أيوه', 'اي', 'أجل'];
  const knowledgeContinuationWords = ['اشرح', 'اشرحها', 'اشرحه', 'اكمل', 'أكمل', 'كمل', 'كمّل', 'وضح', 'وضّح', 'اشرح اكثر', 'اشرح أكثر', 'بالتفصيل', 'فصل', 'فصّل', 'كل شي', 'كل شيء', 'وبعدين', 'بعدها', 'ثم'];
  const marketCommodityWords = ['ذهب', 'الذهب', 'فضه', 'الفضه', 'الفضة', 'اونصه', 'اونصة', 'الاونصه', 'الاونصة', 'الأونصة', 'xau', 'xag', 'xauusd', 'xagusd', 'spot', 'mt5'];
  const marketPriceWords = ['سعر', 'اسعار', 'سعره', 'السعر', 'الان', 'الآن', 'حاليا', 'حاليًا', 'مباشر', 'لحظي', 'current', 'live', 'كم'];
  const marketLocationWords = ['بطاقه', 'بطاقة', 'البطاقه', 'البطاقة', 'شاشه', 'شاشة', 'شاشات', 'مكان', 'موجود', 'وين', 'اين', 'فين'];
  const marketFollowupWords = ['والذهب', 'والفضه', 'والفضة', 'السعر', 'نفسها', 'نفسه', 'وين البطاقة', 'اين البطاقة', 'افتحها', 'افتحه', 'افتحها لي', 'افتحه لي'];

  const hasMarketCommodity = containsAnyTokenOrPhrase(normalizedText, tokens, marketCommodityWords);
  const hasMarketPriceWord = containsAnyTokenOrPhrase(normalizedText, tokens, marketPriceWords);
  const hasMarketLocationWord = containsAnyTokenOrPhrase(normalizedText, tokens, marketLocationWords);
  const marketTopicActive = conversationState?.topicContext?.kind === 'market_price';

  if (containsAny(normalizedText, openVerbs)) {
    scores.command += 5;
  }

  if (containsAny(normalizedText, screenWords)) {
    scores.knowledge += 4;
  }

  if (containsAny(normalizedText, knowledgeWords)) {
    scores.knowledge += 4;
  }

  if (containsAny(normalizedText, databaseWords)) {
    scores.database += 3;
  }

  if (containsAnyTokenOrPhrase(normalizedText, tokens, accountHierarchyWords)) {
    scores.database += 4;
    scores.knowledge = Math.max(0, scores.knowledge - 1);
  }

  if (hasMarketCommodity && hasMarketPriceWord) {
    scores.knowledge += 8;
    scores.database = Math.max(0, scores.database - 2);
    scores.general = Math.max(0, scores.general - 1);
  }

  if (hasMarketCommodity && hasMarketLocationWord) {
    scores.knowledge += 7;
    scores.command += containsAny(normalizedText, openVerbs) ? 2 : 0;
    scores.database = Math.max(0, scores.database - 1);
  }

  if (marketTopicActive && containsAnyTokenOrPhrase(normalizedText, tokens, marketFollowupWords)) {
    scores.knowledge += 7;
    scores.command += containsAny(normalizedText, openVerbs) ? 2 : 0;
    scores.database = Math.max(0, scores.database - 2);
    scores.general = Math.max(0, scores.general - 1);
  }

  if (marketTopicActive && containsAnyTokenOrPhrase(normalizedText, tokens, ['والذهب', 'والفضه', 'والفضة'])) {
    scores.knowledge += 4;
  }

  if (containsAny(normalizedText, entityWords.map((word) => normalizeArabic(word)))) {
    scores.database += 1;
  }

  if (containsAny(normalizedText, entityWords.map((word) => normalizeArabic(word))) && containsAny(normalizedText, entityDatabaseWords.map((word) => normalizeArabic(word)))) {
    scores.database += 5;
    scores.knowledge = Math.max(0, scores.knowledge - 1);
  }

  if (containsAny(normalizedText, reportWords)) {
    scores.database += 4;
    scores.knowledge += 1;
  }

  if (containsAny(normalizedText, providerWords)) {
    scores.command += 5;
    scores.knowledge += 1;
  }

  if (containsAny(normalizedText, clearWords)) {
    scores.command += 4;
  }

  if (containsAny(normalizedText, chatWords) && containsAny(normalizedText, clearWords)) {
    scores.command += 6;
  }

  if (containsAny(normalizedText, generalWords)) {
    scores.general += 3;
  }

  if (/\b\d+\b/.test(normalizedText) && containsAny(normalizedText, entityWords)) {
    scores.database += 3;
  }

  if (containsAnyTokenOrPhrase(normalizedText, tokens, ['كيف اطلع', 'كيف اوصل', 'وين', 'اين', 'فين', 'مكان'])) {
    scores.knowledge += 3;
    scores.command += 1;
  }

  if (containsAny(normalizedText, entityCreationWords)
    && containsAny(normalizedText, entityCreationTargets)
    && containsAny(normalizedText, entityCreationQuestionWords)) {
    scores.knowledge += 8;
    scores.database = Math.max(0, scores.database - 2);
  }

  if (conversationState?.activeScreen?.folder
    && ['accounts', 'customers', 'suppliers'].includes(conversationState.activeScreen.folder)
    && containsAny(normalizedText, [...entityCreationFollowupWords, ...simpleYesWords])) {
    scores.knowledge += 8;
    scores.database = Math.max(0, scores.database - 2);
    scores.general = Math.max(0, scores.general - 1);
  }

  if (containsAnyTokenOrPhrase(normalizedText, tokens, ['بطاقه', 'بطاقة', 'قسم', 'الاشعارات', 'الإشعارات', 'الثيم', 'المظهر', 'الاونصه', 'الأونصة', 'السحابه', 'السحابة'])) {
    scores.knowledge += 2;
  }

  if (containsAny(normalizedText, ['كم عدد', 'كم اجمالي', 'هل يوجد', 'هل موجود', 'ما اسم', 'اسم العميل', 'اسم المورد', 'اسم الحساب', 'تفاصيل العميل', 'تفاصيل المورد', 'تفاصيل الحساب'])) {
    scores.database += 5;
  }

  if (containsAll(normalizedText, ['كيف', 'فاتوره']) || containsAll(normalizedText, ['كيف', 'الاونصه']) || containsAll(normalizedText, ['العمليه', 'الحسابيه'])) {
    scores.knowledge += 5;
  }

  if (containsAny(normalizedText, ['فتح شاشه', 'افتح شاشه', 'روح لشاشه', 'اذهب الى شاشه', 'فتح نافذه', 'افتح نافذه', 'فتح التقارير', 'افتح التقارير', 'فتح فاتوره', 'افتح فاتوره', 'فتح كشف', 'افتح كشف'])) {
    scores.command += 4;
  }

  if (conversationState?.focusEntity && containsAny(normalizedText, followupPronouns) && containsAny(normalizedText, databaseFollowupWords)) {
    scores.database += 6;
    scores.general = Math.max(0, scores.general - 1);
  }

  if (conversationState?.focusEntity?.table === 'accounts' && containsAny(normalizedText, [...databaseFollowupWords, ...accountHierarchyWords])) {
    scores.database += 5;
    scores.general = Math.max(0, scores.general - 1);
  }

  const branchScopeConfirmation = ['نعم', 'ايوه', 'اي', 'اجل'].includes(normalizedText)
    || normalizedText === 'كل الفروع'
    || normalizedText.startsWith('كل الفروع ')
    || normalizedText === 'جميع الفروع'
    || normalizedText.startsWith('جميع الفروع ')
    || normalizedText === 'كلها';

  if (conversationState?.lastRoute === 'database'
    && String(conversationState?.topicContext?.kind || '').trim() === 'branch_scope_prompt'
    && branchScopeConfirmation) {
    scores.database += 9;
    scores.knowledge = Math.max(0, scores.knowledge - 3);
    scores.general = Math.max(0, scores.general - 2);
  }

  if (conversationState?.lastRoute === 'database' && conversationState?.focusEntity && containsAny(normalizedText, databaseFollowupWords)) {
    scores.database += 3;
    scores.general = Math.max(0, scores.general - 1);
  }

  if (conversationState?.activeScreen && containsAnyTokenOrPhrase(normalizedText, tokens, screenFollowupWords)) {
    scores.knowledge += 5;
    scores.command += containsAny(normalizedText, openVerbs) ? 2 : 0;
    scores.general = Math.max(0, scores.general - 1);
  }

  if (conversationState?.lastRoute === 'knowledge'
    && (conversationState?.activeScreen || conversationState?.topicContext)
    && (containsAnyTokenOrPhrase(normalizedText, tokens, knowledgeContinuationWords)
      || containsAnyTokenOrPhrase(normalizedText, tokens, simpleYesWords))) {
    scores.knowledge += 6;
    scores.database = Math.max(0, scores.database - 2);
    scores.general = Math.max(0, scores.general - 2);
  }

  if (conversationState?.lastRoute === 'knowledge' && conversationState?.activeScreen && containsAnyTokenOrPhrase(normalizedText, tokens, ['اشرح', 'كيف', 'وين', 'اين', 'فين', 'مكان', 'قسم', 'بطاقه', 'بطاقة', 'فيها'])) {
    scores.knowledge += 3;
    scores.general = Math.max(0, scores.general - 1);
  }

  const localSignals = scores.command + scores.knowledge + scores.database;
  if (localSignals >= 5) {
    scores.general = Math.max(0, scores.general - 2);
  }

  if (Object.values(scores).every((value) => value === 0)) {
    scores.general = 1;
  }

  const priority = { command: 4, knowledge: 3, database: 2, general: 1 };
  const sortedRoutes = Object.entries(scores)
    .sort((a, b) => {
      if (b[1] !== a[1]) return b[1] - a[1];
      return priority[b[0]] - priority[a[0]];
    });

  const route = sortedRoutes[0][0];
  const confidence = sortedRoutes[0][1] - (sortedRoutes[1]?.[1] || 0);
  const routeOrder = sortedRoutes
    .filter(([, score]) => score > 0)
    .map(([name]) => name);

  return {
    rawText,
    normalizedText,
    tokens,
    route,
    routeOrder,
    confidence,
    hasLocalSignals: localSignals >= 4,
    scores,
  };
}

module.exports = {
  classifyMessage,
  containsAll,
  containsAny,
  normalizeArabic,
  tokenizeNormalized,
};

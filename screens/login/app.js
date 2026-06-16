const form = document.getElementById('loginForm');
const branchInput = document.getElementById('branch');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const branchError = document.getElementById('branchError');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const formMsg = document.getElementById('formMsg');
const submitBtn = document.getElementById('submitBtn');
const submitBtnText = document.getElementById('submitBtnText');
const submitBtnHintText = document.getElementById('submitBtnHintText');
const loginLoadingText = document.getElementById('loginLoadingText');
const loginLoadingHintText = document.getElementById('loginLoadingHintText');
const loginSuccessText = document.getElementById('loginSuccessText');
const loginSuccessHintText = document.getElementById('loginSuccessHintText');
const togglePassword = document.getElementById('togglePassword');
const themeToggle = document.getElementById('themeToggle');
const rememberMe = document.getElementById('rememberMe');
const licenseExpiryModal = document.getElementById('licenseExpiryModal');
const licenseExpiryBackdrop = document.getElementById('licenseExpiryBackdrop');
const licenseExpiryBadge = document.getElementById('licenseExpiryBadge');
const licenseExpiryTitle = document.getElementById('licenseExpiryTitle');
const licenseExpiryNote = document.getElementById('licenseExpiryNote');
const licenseExpiryMeter = document.getElementById('licenseExpiryMeter');

// ===== Language handling for login screen =====
const LOGIN_LANG_KEY = 'uiLang';
const REMEMBER_BRANCH_KEY = 'rememberBranchId';
const CURRENT_BRANCH_KEY = 'currentBranch';
const CURRENT_BRANCH_SCOPE_KEY = 'branchScope';
let companyNameAr = '';
let companyNameEn = '';
let availableBranches = [];
let availableUsers = [];
let currentLicenseWarningStatus = null;
let loginButtonPhaseTimer = null;

const loginTranslations = {
  ar: {
    dir: 'rtl',
    lang: 'ar',
    loginSubtitle: 'سجّل الدخول للمتابعة',
    labelBranch: 'الفرع',
    branchPlaceholder: 'اختر الفرع',
    labelUsername: 'اسم المستخدم',
    usernamePlaceholder: 'اختر اسم المستخدم',
    labelPassword: 'كلمة المرور',
    labelRememberMe: 'تذكّرني',
    forgotLinkText: 'نسيت كلمة المرور؟',
    submitBtnText: 'تسجيل الدخول',
    submitBtnHintText: 'وصول آمن إلى حسابك',
    processingText: 'جار التحقق من بيانات الدخول...',
    processingHintText: 'نتأكد من الهوية وتأمين الجلسة',
    authenticatingText: 'جار تسجيل الدخول...',
    authenticatingHintText: 'نهيّئ صلاحياتك وبيئة العمل',
    branchRequiredText: 'الرجاء اختيار الفرع',
    usernameRequiredText: 'الرجاء اختيار اسم المستخدم',
    usernameInvalidText: 'اسم المستخدم غير صحيح',
    passwordRequiredText: 'كلمة المرور مطلوبة',
    loginSuccessText: 'تم تسجيل الدخول بنجاح',
    loginSuccessHintText: 'جاري فتح مساحة العمل',
    authUnavailableText: 'نظام المصادقة غير متاح',
    loginFailedText: 'فشل تسجيل الدخول',
    unexpectedAuthErrorText: 'حدث خطأ أثناء المصادقة',
    unexpectedErrorText: 'حدث خطأ غير متوقع',
    noBranchesText: 'لا توجد فروع متاحة للدخول',
    noUsersForBranchText: 'لا يوجد مستخدمون متاحون لهذا الفرع',
    hintTitle: 'تلميح كلمة المرور',
    forgotModalTitle: 'استعادة كلمة المرور',
    forgotModalBodyText: 'لإصلاح مشكلتك وتغيير كلمة المرور\nيجب عليك التواصل مع مبرمج ومطور النظام',
    forgotCancelText: 'إغلاق',
    licenseExpiryBadge: 'تنبيه قرب انتهاء الاشتراك',
    licenseExpiryTypeLabel: 'نوع الاشتراك',
    licenseExpiryDateLabel: 'تاريخ الانتهاء',
    licenseExpiryRemainingLabel: 'الأيام المتبقية',
    licenseExpiryActionText: 'حسنًا',
    licenseExpiryDayUnit: 'يوم',
    licenseExpiryDaysTitle: 'ينتهي الترخيص بعد {days} يوم',
    licenseExpiryTodayTitle: 'ينتهي الترخيص اليوم',
    licenseExpiryNote: 'سيظهر هذا التنبيه عند كل مرة يتم فيها تشغيل البرنامج حتى يتم تجديد الاشتراك.'
  },
  en: {
    dir: 'ltr',
    lang: 'en',
    loginSubtitle: 'Sign in to continue',
    labelBranch: 'Branch',
    branchPlaceholder: 'Choose a branch',
    labelUsername: 'Username',
    usernamePlaceholder: 'Choose a user',
    labelPassword: 'Password',
    labelRememberMe: 'Remember me',
    forgotLinkText: 'Forgot password?',
    submitBtnText: 'Sign in',
    submitBtnHintText: 'Secure access to your workspace',
    processingText: 'Verifying your sign-in details...',
    processingHintText: 'Checking identity and securing your session',
    authenticatingText: 'Signing you in...',
    authenticatingHintText: 'Preparing permissions and your workspace',
    branchRequiredText: 'Please choose a branch',
    usernameRequiredText: 'Please choose a username',
    usernameInvalidText: 'Invalid username',
    passwordRequiredText: 'Password is required',
    loginSuccessText: 'Signed in successfully',
    loginSuccessHintText: 'Opening your workspace',
    authUnavailableText: 'Authentication service is unavailable',
    loginFailedText: 'Sign in failed',
    unexpectedAuthErrorText: 'An authentication error occurred',
    unexpectedErrorText: 'An unexpected error occurred',
    noBranchesText: 'No branches are available for login',
    noUsersForBranchText: 'No users are available for this branch',
    hintTitle: 'Password hint',
    forgotModalTitle: 'Password recovery',
    forgotModalBodyText: 'To fix your issue and reset your password,\nyou need to contact the system developer.',
    forgotCancelText: 'Close',
    licenseExpiryBadge: 'Subscription Ending Soon',
    licenseExpiryTypeLabel: 'Plan Type',
    licenseExpiryDateLabel: 'Expiry Date',
    licenseExpiryRemainingLabel: 'Days Remaining',
    licenseExpiryActionText: 'Got it',
    licenseExpiryDayUnit: 'Days',
    licenseExpiryDaysTitle: 'Your license ends in {days} days',
    licenseExpiryTodayTitle: 'Your license ends today',
    licenseExpiryNote: 'This notice will appear every time the program starts until the subscription is renewed.'
  }
};

function getCurrentLoginLang(){
  const stored = localStorage.getItem(LOGIN_LANG_KEY);
  return stored === 'en' ? 'en' : 'ar';
}

function t(key){
  const dict = loginTranslations[getCurrentLoginLang()] || loginTranslations.ar;
  return dict?.[key] || loginTranslations.ar?.[key] || '';
}

function syncLoginButtonText(state = (submitBtn?.classList.contains('is-loading')
  ? 'loading'
  : submitBtn?.classList.contains('is-success')
    ? 'success'
    : 'idle')) {
  const isAuthenticating = state === 'loading' && submitBtn?.classList.contains('is-authenticating');

  if (submitBtnText) {
    submitBtnText.textContent = t('submitBtnText');
  }

  if (submitBtnHintText) {
    submitBtnHintText.textContent = t('submitBtnHintText');
  }

  if (loginLoadingText) {
    loginLoadingText.textContent = t(isAuthenticating ? 'authenticatingText' : 'processingText');
  }

  if (loginLoadingHintText) {
    loginLoadingHintText.textContent = t(isAuthenticating ? 'authenticatingHintText' : 'processingHintText');
  }

  if (loginSuccessText) {
    loginSuccessText.textContent = t('loginSuccessText');
  }

  if (loginSuccessHintText) {
    loginSuccessHintText.textContent = t('loginSuccessHintText');
  }
}

function clearLoginButtonPhaseTimer() {
  if (loginButtonPhaseTimer) {
    clearTimeout(loginButtonPhaseTimer);
    loginButtonPhaseTimer = null;
  }
}

function applyLoginLanguage(lang){
  const dict = loginTranslations[lang] || loginTranslations.ar;

  if (document.documentElement){
    document.documentElement.dir = dict.dir;
    document.documentElement.lang = dict.lang;
  }

  // Arrow direction in login button: points along reading direction
  const trailIcon = document.querySelector('.login-btn-trail i');
  if (trailIcon) {
    const isLtr = (dict.dir || '').toLowerCase() === 'ltr';
    trailIcon.classList.toggle('fa-arrow-right-long', isLtr);
    trailIcon.classList.toggle('fa-arrow-left-long', !isLtr);
  }

  // Company title based on language with fallbacks
  const titleEl = document.getElementById('loginTitle');
  if (titleEl) {
    let finalName = '';
    if (lang === 'en') {
      // Prefer English name, then Arabic, then default
      finalName = (companyNameEn && companyNameEn.trim())
        || (companyNameAr && companyNameAr.trim())
        || 'Gold System';
    } else {
      // Prefer Arabic name, then English, then default
      finalName = (companyNameAr && companyNameAr.trim())
        || (companyNameEn && companyNameEn.trim())
        || 'Gold System';
    }
    titleEl.textContent = finalName;
  }

  const mapping = [
    'loginSubtitle',
    'labelBranch',
    'labelUsername',
    'labelPassword',
    'labelRememberMe',
    'forgotLinkText',
    'submitBtnText',
    'hintTitle',
    'forgotModalTitle',
    'forgotCancelText',
    'licenseExpiryBadge',
    'licenseExpiryTypeLabel',
    'licenseExpiryDateLabel',
    'licenseExpiryRemainingLabel'
  ];

  // IDs that contain a .label-icon child that must be preserved
  const labelIconIds = new Set(['labelBranch', 'labelUsername', 'labelPassword']);

  mapping.forEach(id => {
    const el = document.getElementById(id);
    if (el && typeof dict[id] === 'string') {
      if (labelIconIds.has(id)) {
        // Preserve the icon element, update only the text node
        const icon = el.querySelector('.label-icon');
        el.textContent = dict[id];
        if (icon) el.prepend(icon);
      } else {
        el.textContent = dict[id];
      }
    }
  });

  // Special handling for body text that contains line break
  const bodyEl = document.getElementById('forgotModalBodyText');
  if (bodyEl && typeof dict.forgotModalBodyText === 'string'){
    const parts = dict.forgotModalBodyText.split('\n');
    bodyEl.innerHTML = parts.join('<br>');
  }

  const branchPlaceholderEl = document.getElementById('branchPlaceholder');
  if (branchPlaceholderEl && typeof dict.branchPlaceholder === 'string'){
    branchPlaceholderEl.textContent = dict.branchPlaceholder;
  }

  const usernamePlaceholderEl = document.getElementById('usernamePlaceholder');
  if (usernamePlaceholderEl && typeof dict.usernamePlaceholder === 'string'){
    usernamePlaceholderEl.textContent = dict.usernamePlaceholder;
  }

  if (submitBtnText && submitBtn && !submitBtn.disabled) {
    submitBtnText.textContent = dict.submitBtnText;
  }

  if (licenseExpiryOk) {
    licenseExpiryOk.textContent = dict.licenseExpiryActionText;
  }

  syncLoginButtonText();

  if (currentLicenseWarningStatus) {
    renderLicenseExpiryModal(currentLicenseWarningStatus);
  }

  if (Array.isArray(availableBranches) && availableBranches.length) {
    const selectedBranchId = normalizePositiveId(branchInput?.value, null);
    populateBranchOptions(selectedBranchId);
  }

  const switcher = document.getElementById('langSwitcher');
  if (switcher){
    switcher.querySelectorAll('.lang-toggle-btn').forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      if (btnLang === lang){
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }
}

function formatTemplate(template, values = {}) {
  return String(template || '').replace(/\{(\w+)\}/g, (_, key) => {
    const value = values[key];
    return value == null ? '' : String(value);
  });
}

function localizeLicenseType(type) {
  const raw = String(type || '').trim();
  if (!raw) return '--';
  if (getCurrentLoginLang() !== 'en') {
    return raw;
  }
  const map = {
    'شهري': 'Monthly',
    'ربع سنوي': 'Quarterly',
    'نصف سنوي': 'Semi-Annual',
    'سنوي': 'Yearly',
    'دائم': 'Lifetime'
  };
  return map[raw] || raw;
}

function formatLicenseStatusDate(value) {
  const text = String(value || '').trim();
  if (!text) return '--';
  const match = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const date = match
    ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
    : new Date(text);
  if (Number.isNaN(date.getTime())) {
    return text;
  }
  return date.toLocaleDateString(getCurrentLoginLang() === 'en' ? 'en-US' : 'ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function getLicenseMeterTheme(daysRemaining) {
  const days = Number(daysRemaining);
  if (days <= 2) {
    return {
      accent: '#f59e0b',
      accentSoft: 'rgba(245, 158, 11, 0.28)',
      glow: 'rgba(245, 158, 11, 0.35)'
    };
  }
  if (days <= 4) {
    return {
      accent: '#06b6d4',
      accentSoft: 'rgba(6, 182, 212, 0.26)',
      glow: 'rgba(6, 182, 212, 0.28)'
    };
  }
  return {
    accent: 'var(--primary)',
    accentSoft: 'color-mix(in oklab, var(--primary) 24%, transparent)',
    glow: 'color-mix(in oklab, var(--primary) 34%, transparent)'
  };
}

function renderLicenseExpiryModal(status) {
  if (!licenseExpiryModal) return;
  currentLicenseWarningStatus = status || null;
  const daysRemaining = Math.max(0, Number(status?.daysRemaining || 0));
  const theme = getLicenseMeterTheme(daysRemaining);
  const progressRatio = Math.max(0, Math.min(daysRemaining, 7)) / 7;
  const progressAngle = Math.max(daysRemaining > 0 ? 18 : 0, Math.round(progressRatio * 360));
  licenseExpiryModal.style.setProperty('--license-meter-angle', `${progressAngle}deg`);
  licenseExpiryModal.style.setProperty('--license-meter-accent', theme.accent);
  licenseExpiryModal.style.setProperty('--license-meter-accent-soft', theme.accentSoft);
  licenseExpiryModal.style.setProperty('--license-meter-glow', theme.glow);
  if (licenseExpiryBadge) {
    licenseExpiryBadge.textContent = t('licenseExpiryBadge');
  }
  if (licenseExpiryTitle) {
    licenseExpiryTitle.textContent = daysRemaining <= 0
      ? t('licenseExpiryTodayTitle')
      : formatTemplate(t('licenseExpiryDaysTitle'), { days: daysRemaining });
  }
  if (licenseExpiryNote) {
    licenseExpiryNote.textContent = t('licenseExpiryNote');
  }
  if (licenseExpiryDaysValue) {
    licenseExpiryDaysValue.textContent = String(daysRemaining);
  }
  if (licenseExpiryDaysUnit) {
    licenseExpiryDaysUnit.textContent = t('licenseExpiryDayUnit');
  }
  if (licenseExpiryRemainingLabel) {
    licenseExpiryRemainingLabel.textContent = t('licenseExpiryRemainingLabel');
  }
  if (licenseExpiryTypeLabel) {
    licenseExpiryTypeLabel.textContent = t('licenseExpiryTypeLabel');
  }
  if (licenseExpiryTypeValue) {
    licenseExpiryTypeValue.textContent = localizeLicenseType(status?.licenseType);
  }
  if (licenseExpiryDateLabel) {
    licenseExpiryDateLabel.textContent = t('licenseExpiryDateLabel');
  }
  if (licenseExpiryDateValue) {
    licenseExpiryDateValue.textContent = formatLicenseStatusDate(status?.endDate);
  }
  if (licenseExpiryOk) {
    licenseExpiryOk.textContent = t('licenseExpiryActionText');
  }
}

function openLicenseExpiryModal() {
  if (!licenseExpiryModal) return;
  licenseExpiryModal.setAttribute('aria-hidden', 'false');
}

function closeLicenseExpiryModal() {
  if (!licenseExpiryModal) return;
  licenseExpiryModal.setAttribute('aria-hidden', 'true');
}

async function maybeShowLicenseExpiryModal() {
  try {
    if (!window.license || typeof window.license.checkStatus !== 'function') {
      return;
    }
    const status = await window.license.checkStatus();
    const daysRemaining = Number(status?.daysRemaining);
    if (!status || status.licensed !== true || status.valid !== true) {
      return;
    }
    if (!Number.isFinite(daysRemaining) || daysRemaining > 7) {
      return;
    }
    renderLicenseExpiryModal(status);
    openLicenseExpiryModal();
  } catch (_) {}
}

function createLangRipple(event, element){
  const circle = document.createElement('span');
  const diameter = Math.max(element.clientWidth, element.clientHeight);
  const radius = diameter / 2;
  const rect = element.getBoundingClientRect();

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - rect.left - radius}px`;
  circle.style.top = `${event.clientY - rect.top - radius}px`;
  circle.classList.add('ripple');

  const existing = element.querySelector('.ripple');
  if (existing) existing.remove();
  element.appendChild(circle);
  setTimeout(() => circle.remove(), 600);
}

function initLoginLanguageToggle(){
  const initialLang = getCurrentLoginLang();
  applyLoginLanguage(initialLang);

  const switcher = document.getElementById('langSwitcher');
  if (!switcher) return;

  const buttons = switcher.querySelectorAll('.lang-toggle-btn');
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.filter = 'brightness(1.08)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.filter = '';
    });
    btn.addEventListener('click', (e) => {
      createLangRipple(e, btn);
      const lang = btn.getAttribute('data-lang');
      if (!lang || (lang !== 'ar' && lang !== 'en')) return;

      btn.style.transform = 'scale(0.92)';
      setTimeout(() => { btn.style.transform = ''; }, 150);

      localStorage.setItem(LOGIN_LANG_KEY, lang);
      applyLoginLanguage(lang);
    });
  });
}

// Initialize language toggle then load branches/users into dropdowns
initLoginLanguageToggle();

function normalizePositiveId(value, fallback = null) {
  const normalized = Number(value || 0);
  return Number.isFinite(normalized) && normalized > 0 ? normalized : fallback;
}

function getBranchDisplayName(branch = {}) {
  const arName = String(branch?.name || '').trim();
  const enName = String(branch?.name_en || '').trim();
  return getCurrentLoginLang() === 'en'
    ? (enName || arName || `#${Number(branch?.id || 0) || ''}`)
    : (arName || enName || `#${Number(branch?.id || 0) || ''}`);
}

function resetSelectOptions(selectElement) {
  if (!selectElement) return;
  while (selectElement.options.length > 1) {
    selectElement.remove(1);
  }
  selectElement.value = '';
  if (selectElement.options[0]) {
    selectElement.options[0].selected = true;
  }
}

function populateBranchOptions(selectedBranchId = null) {
  if (!branchInput) return;
  resetSelectOptions(branchInput);

  availableBranches.forEach((branch) => {
    const option = document.createElement('option');
    option.value = String(branch.id);
    option.textContent = getBranchDisplayName(branch);
    if (Number(branch?.is_main || 0) === 1) {
      option.style.fontWeight = 'bold';
    }
    branchInput.appendChild(option);
  });

  if (selectedBranchId && availableBranches.some((branch) => Number(branch?.id || 0) === selectedBranchId)) {
    branchInput.value = String(selectedBranchId);
  }
}

function populateUserOptions(users = [], preferredUsername = '') {
  if (!usernameInput) return;
  resetSelectOptions(usernameInput);

  availableUsers = Array.isArray(users)
    ? users.filter((user) => Number(user?.active || 0) === 1)
    : [];

  availableUsers.forEach((user) => {
    const option = document.createElement('option');
    option.value = user.username;
    const isDefaultAdmin = user.username === 'Smart Accountant';
    const adminBadge = isDefaultAdmin ? ' ⭐' : '';
    const roleBadge = user.role === 'admin' ? ' 👑' : '';
    option.textContent = `${user.full_name} (${user.username})${adminBadge || roleBadge}`;
    if (isDefaultAdmin) {
      option.style.fontWeight = 'bold';
      option.classList.add('default-admin-option');
    }
    usernameInput.appendChild(option);
  });

  const canRestoreUsername = preferredUsername
    && availableUsers.some((user) => String(user?.username || '') === preferredUsername);

  if (canRestoreUsername) {
    usernameInput.value = preferredUsername;
    rememberMe.checked = true;
    const savedPassword = localStorage.getItem(`password_${preferredUsername}`);
    passwordInput.value = savedPassword ? atob(savedPassword) : '';
  } else {
    usernameInput.value = '';
    passwordInput.value = '';
  }
}

async function loadUsersList(selectedBranchId = normalizePositiveId(branchInput?.value, null)) {
  try {
    if (!window.users || !window.users.getUsers) {
      console.error('Users API not available');
      showDbConnectionModal();
      return false;
    }

    const branchId = normalizePositiveId(selectedBranchId, null);
    if (!branchId) {
      populateUserOptions([]);
      return false;
    }

    let result = await window.users.getUsers({ branch_id: branchId });

    if (window.api && window.api.getCloudMode) {
      try {
        const cloudState = await window.api.getCloudMode();
        const noBranchUsers = !result?.success || !Array.isArray(result.data) || result.data.length === 0;
        if (cloudState?.success && cloudState.cloudMode === true && cloudState.activeMode !== true && noBranchUsers) {
          await new Promise((resolve) => setTimeout(resolve, 900));
          result = await window.users.getUsers({ branch_id: branchId });
        }
      } catch (_) {
        
      }
    }

    if (!result.success || !Array.isArray(result.data)) {
      console.error('Failed to load users:', result);
      showDbConnectionModal();
      return false;
    }

    const rememberedBranchId = normalizePositiveId(localStorage.getItem(REMEMBER_BRANCH_KEY), null);
    const preferredUsername = rememberedBranchId === branchId
      ? String(localStorage.getItem('rememberUsername') || '').trim()
      : '';

    populateUserOptions(result.data, preferredUsername);

    if (!availableUsers.length) {
      setMsg(formMsg, t('noUsersForBranchText'), 'error');
      return false;
    }

    setMsg(formMsg, '');
    return true;
  } catch (error) {
    showDbConnectionModal();
    return false;
  }
}

async function loadBranchesList() {
  try {
    if (!window.branches || !window.branches.getBranches) {
      console.error('Branches API not available');
      showDbConnectionModal();
      return false;
    }

    let result = await window.branches.getBranches({ activeOnly: true });

    if (window.api && window.api.getCloudMode) {
      try {
        const cloudState = await window.api.getCloudMode();
        const noBranches = !result?.success || !Array.isArray(result.data) || result.data.length === 0;
        if (cloudState?.success && cloudState.cloudMode === true && cloudState.activeMode !== true && noBranches) {
          await new Promise((resolve) => setTimeout(resolve, 900));
          result = await window.branches.getBranches({ activeOnly: true });
        }
      } catch (_) {
        
      }
    }

    if (!result.success || !Array.isArray(result.data)) {
      console.error('Failed to load branches:', result);
      showDbConnectionModal();
      return false;
    }

    availableBranches = result.data.filter((branch) => Number(branch?.active ?? 1) === 1);
    if (!availableBranches.length) {
      setMsg(formMsg, t('noBranchesText'), 'error');
      populateBranchOptions(null);
      populateUserOptions([]);
      return false;
    }

    const rememberedBranchId = normalizePositiveId(localStorage.getItem(REMEMBER_BRANCH_KEY), null);
    const defaultBranch = availableBranches.find((branch) => Number(branch?.is_main || 0) === 1) || availableBranches[0];
    const selectedBranchId = availableBranches.some((branch) => Number(branch?.id || 0) === rememberedBranchId)
      ? rememberedBranchId
      : normalizePositiveId(defaultBranch?.id, null);

    populateBranchOptions(selectedBranchId);
    if (selectedBranchId) {
      branchInput.value = String(selectedBranchId);
      // تحميل معلومات الشركة للفرع المحدد افتراضياً
      loadCompanyBrand(selectedBranchId, { allowRetry: true });
      return await loadUsersList(selectedBranchId);
    }

    return false;
  } catch (error) {
    showDbConnectionModal();
    return false;
  }
}

// Show database connection modal
function showDbConnectionModal() {
  if (window.dbConnectionManager) {
    setTimeout(() => {
      window.dbConnectionManager.open();
    }, 500); // Small delay to ensure UI is ready
  } else {
    // Database connection manager not available
    if (window.showAlert) {
      window.showAlert('لم يتم العثور على قاعدة بيانات. يرجى التأكد من وجود قاعدة البيانات وإعادة تشغيل البرنامج.', 'خطأ', 'error');
    }
  }
}

// Load branches and users on page load
loadBranchesList();

branchInput.addEventListener('change', async () => {
  branchError.textContent = '';
  setMsg(formMsg, '');
  const selectedBranchId = normalizePositiveId(branchInput.value, null);
  // تحديث معلومات الشركة للفرع المحدد
  if (selectedBranchId) {
    loadCompanyBrand(selectedBranchId);
  }
  await loadUsersList(branchInput.value);
});

// Listen to username change to load saved password
usernameInput.addEventListener('change', () => {
  const username = usernameInput.value.trim();
  if (username && rememberMe.checked) {
    const savedPassword = localStorage.getItem(`password_${username}`);
    if (savedPassword) {
      passwordInput.value = atob(savedPassword); // Decode from base64
    } else {
      passwordInput.value = '';
    }
  } else {
    passwordInput.value = '';
  }
});

// Listen to remember me checkbox
rememberMe.addEventListener('change', () => {
  if (!rememberMe.checked) {
    const username = usernameInput.value.trim();
    if (username) {
      localStorage.removeItem(`password_${username}`);
    }
    localStorage.removeItem(REMEMBER_BRANCH_KEY);
    localStorage.removeItem('rememberUsername');
    passwordInput.value = '';
  } else {
    const branchId = normalizePositiveId(branchInput?.value, null);
    const username = usernameInput.value.trim();
    if (branchId) {
      localStorage.setItem(REMEMBER_BRANCH_KEY, String(branchId));
    }
    if (username) {
      localStorage.setItem('rememberUsername', username);
    }
    if (username) {
      const savedPassword = localStorage.getItem(`password_${username}`);
      if (savedPassword) {
        passwordInput.value = atob(savedPassword);
      }
    }
  }
});

// Password hint tooltip elements
const hintTooltip = document.getElementById('hintTooltip');
const hintMessage = document.getElementById('hintMessage');
const hintClose = document.getElementById('hintClose');

// Show password hint tooltip
function showHintTooltip(hint) {
  if (!hintTooltip || !hintMessage) return;
  
  hintMessage.textContent = hint || 'لا يوجد تلميح متاح';
  hintTooltip.setAttribute('aria-hidden', 'false');
  
  // Auto-hide after 8 seconds
  clearTimeout(showHintTooltip._timer);
  showHintTooltip._timer = setTimeout(() => {
    hideHintTooltip();
  }, 8000);
}

// Hide password hint tooltip
function hideHintTooltip() {
  if (!hintTooltip) return;
  hintTooltip.setAttribute('aria-hidden', 'true');
  clearTimeout(showHintTooltip._timer);
}

// Close hint on button click
if (hintClose) {
  hintClose.addEventListener('click', hideHintTooltip);
}

// Close hint on backdrop click
if (hintTooltip) {
  hintTooltip.addEventListener('click', (e) => {
    if (e.target === hintTooltip) {
      hideHintTooltip();
    }
  });
}

// Close hint on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && hintTooltip && hintTooltip.getAttribute('aria-hidden') === 'false') {
    hideHintTooltip();
  }
  if (e.key === 'Escape' && licenseExpiryModal && licenseExpiryModal.getAttribute('aria-hidden') === 'false') {
    closeLicenseExpiryModal();
  }
});

// Auto-redirect if already logged in (disabled)
/*
const existingToken = localStorage.getItem('token');
if(existingToken){
  window.api.sendLoginSuccess();
}
*/

function setMsg(el, msg, type){
  el.textContent = msg || '';
  el.classList.remove('success','error');
  if(type) el.classList.add(type);
}

function shakeCard(){
  const card = document.querySelector('.card');
  if(card){
    card.classList.remove('shake');
    void card.offsetWidth;
    card.classList.add('shake');
  }
}

function validateUsername(value){
  const v = String(value || '').trim();
  return v.length >= 1; // مجرد اختيار مستخدم
}

function validate(){
  let ok = true;
  const branchId = normalizePositiveId(branchInput?.value, null);
  const username = usernameInput.value.trim();
  const password = passwordInput.value;
  if(!branchId){
    branchError.textContent = t('branchRequiredText');
    ok = false;
  } else {
    branchError.textContent = '';
  }
  if(!username){
    usernameError.textContent = t('usernameRequiredText');
    ok = false;
  } else if(!validateUsername(username)){
    usernameError.textContent = t('usernameInvalidText');
    ok = false;
  } else {
    usernameError.textContent = '';
  }
  if(!password){
    passwordError.textContent = t('passwordRequiredText');
    ok = false;
  } else {
    passwordError.textContent = '';
  }
  return ok;
}

branchInput.addEventListener('change', ()=> branchError.textContent = '');
usernameInput.addEventListener('change', ()=> usernameError.textContent = '');
passwordInput.addEventListener('input', ()=> passwordError.textContent = '');

togglePassword.addEventListener('click', ()=>{
  const isPass = passwordInput.type === 'password';
  passwordInput.type = isPass ? 'text' : 'password';
  togglePassword.setAttribute('aria-pressed', String(isPass));
  const icon = togglePassword.querySelector('i');
  if(icon){
    icon.classList.toggle('fa-eye', !isPass);
    icon.classList.toggle('fa-eye-slash', isPass);
  }
});

// Forgot password modal logic
function openForgot(){ 
  const modal = document.getElementById('forgotModal');
  if (modal) { 
    modal.setAttribute('aria-hidden','false'); 
  }
}

function closeForgot(){ 
  const modal = document.getElementById('forgotModal');
  if (modal) { 
    modal.setAttribute('aria-hidden','true'); 
  }
}

// Open forgot password modal directly
const forgotLinkEl = document.getElementById('forgotLink');
const forgotCloseEl = document.getElementById('forgotClose');
const forgotCancelEl = document.getElementById('forgotCancel');
const forgotModalEl = document.getElementById('forgotModal');

if (forgotLinkEl) {
  forgotLinkEl.addEventListener('click', (e)=>{ 
    e.preventDefault(); 
    openForgot(); 
  });
}

if (forgotCloseEl) {
  forgotCloseEl.addEventListener('click', closeForgot);
}

if (forgotCancelEl) {
  forgotCancelEl.addEventListener('click', closeForgot);
}

if (forgotModalEl) {
  const backdrop = forgotModalEl.querySelector('.modal-backdrop');
  if (backdrop) {
    backdrop.addEventListener('click', closeForgot);
  }
}

if (licenseExpiryBackdrop) {
  licenseExpiryBackdrop.addEventListener('click', closeLicenseExpiryModal);
}

if (licenseExpiryOk) {
  licenseExpiryOk.addEventListener('click', closeLicenseExpiryModal);
}

// Direct chat links - Open in external browser
document.addEventListener('click', async (e) => {
  const target = e.target.closest('.contact-btn');
  if (!target) return;
  
  const phone = target.dataset.phone;
  const url = target.dataset.url;
  
  if (target.classList.contains('whatsapp-btn')) {
    const whatsappUrl = `https://wa.me/${phone}`;
    if (window.api && window.api.openExternal) {
      await window.api.openExternal(whatsappUrl);
    }
  } else if (target.classList.contains('telegram-btn')) {
    const telegramUrl = `https://t.me/+${phone}`;
    if (window.api && window.api.openExternal) {
      await window.api.openExternal(telegramUrl);
    }
  } else if (target.classList.contains('facebook-btn')) {
    if (url && window.api && window.api.openExternal) {
      await window.api.openExternal(url);
    }
  } else if (target.classList.contains('instagram-btn')) {
    if (url && window.api && window.api.openExternal) {
      await window.api.openExternal(url);
    }
  } else if (target.classList.contains('youtube-btn')) {
    if (url && window.api && window.api.openExternal) {
      await window.api.openExternal(url);
    }
  } else if (target.classList.contains('tiktok-btn')) {
    if (url && window.api && window.api.openExternal) {
      await window.api.openExternal(url);
    }
  } else if (target.classList.contains('twitter-btn')) {
    if (url && window.api && window.api.openExternal) {
      await window.api.openExternal(url);
    }
  }
});

// Username restoration is now handled in loadUsersList()

// ===== Global theme integration for login toggle =====
function getCurrentAppTheme() {
  try {
    const saved = localStorage.getItem('appTheme');
    if (saved) {
      const theme = JSON.parse(saved);
      return {
        mode: theme.mode || 'dark',
        color: theme.color || 'turquoise'
      };
    }
  } catch (_) {}
  // Default fallback
  return { mode: 'dark', color: 'turquoise' };
}

function saveAndApplyAppTheme(theme) {
  const normalized = {
    mode: theme.mode || 'dark',
    color: theme.color || 'turquoise'
  };
  localStorage.setItem('appTheme', JSON.stringify(normalized));
  if (window.applyAppTheme) {
    // Use global helper from theme-loader.js if available
    window.applyAppTheme(normalized);
  } else {
    // Minimal fallback: set attributes directly
    const root = document.documentElement;
    let mode = normalized.mode;
    if (mode === 'auto') {
      mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    root.setAttribute('data-theme', mode);
    root.setAttribute('data-color-theme', normalized.color);
  }
}

function updateThemeToggleButton(mode) {
  if (!themeToggle) return;
  const icon = themeToggle.querySelector('i');
  const isDark = mode === 'dark';

  if (icon) {
    icon.className = `fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}`;
  }

  themeToggle.setAttribute(
    'aria-label',
    isDark ? 'التبديل للوضع الفاتح' : 'التبديل للوضع الداكن'
  );
}

// Initialize from global appTheme
const initialTheme = getCurrentAppTheme();
updateThemeToggleButton(initialTheme.mode);

themeToggle.addEventListener('click', () => {
  const current = getCurrentAppTheme();
  const nextMode = current.mode === 'dark' ? 'light' : 'dark';
  const nextTheme = { mode: nextMode, color: current.color };
  saveAndApplyAppTheme(nextTheme);
  updateThemeToggleButton(nextMode);
});

// ===== Company brand on login =====
function normalizeFileUrl(p){
  if (!p) return '';
  return p.startsWith('file://') ? p : 'file:///' + String(p).replace(/\\/g,'/');
}

const companyBrandCache = new Map();

function applyCompanyBrand(c = {}){
  const logoBox = document.querySelector('.logo');
  const img = document.getElementById('loginCompanyLogo');

  if (img) {
    if (c.logoData) {
      img.src = c.logoData;
      logoBox && logoBox.classList.add('has-img');
    } else if (c.logo) {
      img.src = normalizeFileUrl(c.logo) + '?v=' + Date.now();
      logoBox && logoBox.classList.add('has-img');
    } else {
      img.src = '';
      logoBox && logoBox.classList.remove('has-img');
    }
  }

  companyNameAr = (c.name || '').trim();
  companyNameEn = (c.name_en || '').trim();
  applyLoginLanguage(getCurrentLoginLang());
}

async function loadCompanyBrand(branchId = null, { allowRetry = false } = {}){
  try{
    if (!(window.api && window.api.getCompanyInfo)) return;

    const cacheKey = branchId ? String(branchId) : '__default__';
    // Instantly paint cached brand for this branch (no flicker / no wait)
    if (companyBrandCache.has(cacheKey)) {
      applyCompanyBrand(companyBrandCache.get(cacheKey));
      if (!allowRetry) return;
    }

    let c = {};
    const payload = branchId ? { branchId } : {};
    const maxAttempts = allowRetry ? 4 : 1;
    for (let i = 0; i < maxAttempts; i++) {
      const r = await window.api.getCompanyInfo(payload);
      if (r && r.success) {
        c = r.company || {};
      }

      const hasBrandData = !!(c.logoData || c.logo || (c.name && c.name.trim()) || (c.name_en && c.name_en.trim()));
      if (hasBrandData) break;
      if (i < maxAttempts - 1) {
        await new Promise((resolve) => setTimeout(resolve, 800));
      }
    }

    companyBrandCache.set(cacheKey, c);
    applyCompanyBrand(c);
  }catch(_){ }
}

loadCompanyBrand(null, { allowRetry: true });
setTimeout(() => {
  maybeShowLicenseExpiryModal();
}, 450);

async function authenticateUser(username, password, branchId){
  try {
    if (!window.users || !window.users.authenticateUser) {
      return { ok: false, message: t('authUnavailableText') };
    }

    const result = await window.users.authenticateUser({ username, password, branch_id: branchId });

    if (result.success && result.user) {
      const selectedBranch = result.branch
        || availableBranches.find((branch) => Number(branch?.id || 0) === Number(result.user?.branch_id || branchId))
        || null;
      const storedUser = {
        ...result.user,
        login_branch_id: Number(selectedBranch?.id || result.user?.branch_id || branchId || 0) || null,
      };
      localStorage.setItem('currentUser', JSON.stringify(storedUser));
      if (selectedBranch) {
        localStorage.setItem(CURRENT_BRANCH_KEY, JSON.stringify(selectedBranch));
        localStorage.setItem(CURRENT_BRANCH_SCOPE_KEY, JSON.stringify({
          mode: 'branch',
          branchId: Number(selectedBranch?.id || 0) || null,
        }));
      } else {
        localStorage.removeItem(CURRENT_BRANCH_KEY);
        localStorage.removeItem(CURRENT_BRANCH_SCOPE_KEY);
      }
      return { ok: true, token: 'user_' + result.user.id, user: storedUser, branch: selectedBranch };
    } else {
      if (window.users && window.users.getPasswordHint) {
        try {
          const hintResult = await window.users.getPasswordHint(username);
          if (hintResult.success && hintResult.hint) {
            return { ok: false, message: result.error || t('loginFailedText'), hint: hintResult.hint };
          }
        } catch (e) {
          
        }
      }
      return { ok: false, message: result.error || t('loginFailedText') };
    }
  } catch (error) {
    return { ok: false, message: t('unexpectedAuthErrorText') };
  }
}

async function syncCloudPresenceAfterLogin(selectedBranch, storedUser, branchId) {
  try {
    const api = window.api || window.cloudDatabase;
    if (!api?.getCloudPresenceStatus) {
      return;
    }

    const resolvedBranchId = Number(selectedBranch?.id || storedUser?.branch_id || storedUser?.login_branch_id || branchId || 0) || null;
    await api.getCloudPresenceStatus({
      userId: Number(storedUser?.id || 0) || null,
      username: String(storedUser?.username || '').trim(),
      fullName: String(storedUser?.full_name || storedUser?.full_name_en || '').trim(),
      branchId: resolvedBranchId,
      currentBranch: resolvedBranchId ? {
        ...(selectedBranch || {}),
        id: resolvedBranchId,
      } : null,
      branchScope: resolvedBranchId ? {
        mode: 'branch',
        branchId: resolvedBranchId,
      } : null,
    });
  } catch (error) {
    console.warn('[Login] Cloud presence sync after login failed:', error?.message || error);
  }
}

function setLoginBtnState(state) {
  submitBtn.classList.remove('is-loading', 'is-success', 'is-authenticating');
  clearLoginButtonPhaseTimer();

  if (state === 'loading') {
    submitBtn.classList.add('is-loading');
    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-busy', 'true');
    submitBtn.dataset.phase = 'verifying';
    syncLoginButtonText(state);
    loginButtonPhaseTimer = window.setTimeout(() => {
      if (!submitBtn.classList.contains('is-loading')) return;
      submitBtn.classList.add('is-authenticating');
      submitBtn.dataset.phase = 'authenticating';
      syncLoginButtonText('loading');
    }, 950);
    return;
  } else if (state === 'success') {
    submitBtn.classList.add('is-success');
    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-busy', 'false');
    submitBtn.dataset.phase = 'success';
  } else {
    submitBtn.disabled = false;
    submitBtn.setAttribute('aria-busy', 'false');
    submitBtn.dataset.phase = 'idle';
  }

  syncLoginButtonText(state);
}

form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  setMsg(formMsg, '');
  if(!validate()){
    shakeCard();
    return;
  }
  setLoginBtnState('loading');
  try{
    const branchId = normalizePositiveId(branchInput?.value, null);
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    if(rememberMe.checked){
      localStorage.setItem(REMEMBER_BRANCH_KEY, String(branchId));
      localStorage.setItem('rememberUsername', username);
      localStorage.setItem(`password_${username}`, btoa(password));
    } else {
      const rememberedUsername = localStorage.getItem('rememberUsername');
      if (rememberedUsername) {
        localStorage.removeItem(`password_${rememberedUsername}`);
      }
      localStorage.removeItem(REMEMBER_BRANCH_KEY);
      localStorage.removeItem('rememberUsername');
      localStorage.removeItem(`password_${username}`);
    }
    const res = await authenticateUser(username, password, branchId);
    if(res.ok){
      setLoginBtnState('success');
      setMsg(formMsg, t('loginSuccessText'), 'success');
      formMsg.focus && formMsg.focus();
      localStorage.setItem('token', res.token || 'demo');
      await syncCloudPresenceAfterLogin(res.branch || null, res.user || null, branchId);
      setTimeout(() => { window.api.sendLoginSuccess(); }, 600);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      localStorage.removeItem(CURRENT_BRANCH_KEY);
      localStorage.removeItem(CURRENT_BRANCH_SCOPE_KEY);
      setLoginBtnState('idle');
      setMsg(formMsg, res.message || t('loginFailedText'), 'error');

      if (res.hint) {
        showHintTooltip(res.hint);
      }

      shakeCard();
    }
  } catch(err){
    setLoginBtnState('idle');
    setMsg(formMsg, t('unexpectedErrorText'), 'error');
    shakeCard();
  }
});

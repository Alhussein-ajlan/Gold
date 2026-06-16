/**
 * Activation Screen Script
 * سكريبت شاشة التفعيل
 */

let machineId = '';

// ===== Language handling for activation screen =====
const ACTIVATION_LANG_KEY = 'uiLang';

const activationTranslations = {
  ar: {
    dir: 'rtl',
    lang: 'ar',
    activationTitle: 'المحاسب الذكي BenAjlan',
    activationSubtitle: 'نظام إدارة محلات الذهب والمجوهرات',
    activationCardTitle: 'تفعيل البرنامج',
    labelMachineId: 'معرف الجهاز',
    machineHint: 'أرسل هذا المعرف للحصول على رمز التفعيل',
    labelLicenseCode: 'رمز التفعيل',
    btnActivateText: 'تفعيل البرنامج',
    labelLicenseStatus: 'حالة الترخيص:',
    labelLicenseType: 'نوع الترخيص:',
    labelEndDate: 'صالح حتى:',
    labelDaysRemaining: 'متبقي:',
    contactHeader: 'للحصول على رمز التفعيل',
    activationFooter: '© 2025 BenAjlan Gold - جميع الحقوق محفوظة'
  },
  en: {
    dir: 'ltr',
    lang: 'en',
    activationTitle: 'Smart Accountant BenAjlan',
    activationSubtitle: 'Jewelry & Gold Shops Management System',
    activationCardTitle: 'Activate License',
    labelMachineId: 'Machine ID',
    machineHint: 'Send this ID to get the activation code',
    labelLicenseCode: 'Activation Code',
    btnActivateText: 'Activate',
    labelLicenseStatus: 'License Status:',
    labelLicenseType: 'License Type:',
    labelEndDate: 'Valid Until:',
    labelDaysRemaining: 'Remaining:',
    contactHeader: 'For activation code',
    activationFooter: '© 2025 BenAjlan Gold - All rights reserved'
  }
};

function getCurrentActivationLang() {
  const stored = localStorage.getItem(ACTIVATION_LANG_KEY);
  return stored === 'en' ? 'en' : 'ar';
}

function applyActivationLanguage(lang) {
  const dict = activationTranslations[lang] || activationTranslations.ar;

  // Update document dir/lang
  if (document.documentElement) {
    document.documentElement.dir = dict.dir;
    document.documentElement.lang = dict.lang;
  }

  // Update main texts if elements exist
  const map = [
    'activationTitle',
    'activationSubtitle',
    'activationCardTitle',
    'labelMachineId',
    'machineHint',
    'labelLicenseCode',
    'btnActivateText',
    'labelLicenseStatus',
    'labelLicenseType',
    'labelEndDate',
    'labelDaysRemaining',
    'contactHeader',
    'activationFooter'
  ];

  map.forEach(id => {
    const el = document.getElementById(id);
    if (el && typeof dict[id] === 'string') {
      el.textContent = dict[id];
    }
  });

  // Toggle button active state
  const switcher = document.getElementById('langSwitcher');
  if (switcher) {
    switcher.querySelectorAll('.lang-toggle-btn').forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      if (btnLang === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }
}

function createRipple(event, element) {
  const circle = document.createElement('span');
  const diameter = Math.max(element.clientWidth, element.clientHeight);
  const radius = diameter / 2;
  const rect = element.getBoundingClientRect();
  
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - rect.left - radius}px`;
  circle.style.top = `${event.clientY - rect.top - radius}px`;
  circle.classList.add('ripple');
  
  const existingRipple = element.querySelector('.ripple');
  if (existingRipple) existingRipple.remove();
  
  element.appendChild(circle);
  
  setTimeout(() => circle.remove(), 600);
}

function initActivationLanguageToggle() {
  const initialLang = getCurrentActivationLang();
  applyActivationLanguage(initialLang);

  const switcher = document.getElementById('langSwitcher');
  if (!switcher) return;

  const buttons = switcher.querySelectorAll('.lang-toggle-btn');
  
  buttons.forEach(btn => {
    // Hover glow effect
    btn.addEventListener('mouseenter', () => {
      btn.style.filter = 'brightness(1.1)';
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.filter = '';
    });
    
    // Click with ripple
    btn.addEventListener('click', (e) => {
      createRipple(e, btn);
      
      const lang = btn.getAttribute('data-lang');
      if (!lang || (lang !== 'ar' && lang !== 'en')) return;
      
      // Add press animation
      btn.style.transform = 'scale(0.92)';
      setTimeout(() => {
        btn.style.transform = '';
      }, 150);
      
      localStorage.setItem(ACTIVATION_LANG_KEY, lang);
      applyActivationLanguage(lang);
    });
  });
}

// فتح مولد الرموز
window.openGenerator = async function() {
  try {
    const result = await window.api.invoke('open-license-generator');
    if (!result.success) {
      await window.showAlert('فشل فتح المولد: ' + result.error, 'خطأ', 'error');
    }
  } catch (error) {
    await window.showAlert('خطأ: ' + error.message, 'خطأ', 'error');
  }
};

// عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', async () => {
  initActivationLanguageToggle();
  await loadAppLogo();
  await loadMachineId();
  await checkCurrentLicense();
});

/**
 * تحميل شعار التطبيق
 */
async function loadAppLogo() {
  try {
    if (window.license && window.license.getAppLogo) {
      const logoData = await window.license.getAppLogo();
      if (logoData) {
        const img = document.getElementById('appLogo');
        if (img) {
          img.src = logoData;
          img.style.display = 'block';
          const fallback = img.nextElementSibling;
          if (fallback) fallback.style.display = 'none';
        }
      }
    }
  } catch (e) {
    // Error loading app logo
  }
}

/**
 * تحميل معرف الجهاز
 */
async function loadMachineId() {
  try {
    if (window.license && window.license.getMachineId) {
      machineId = await window.license.getMachineId();
    } else {
      machineId = 'DEMO1234';
    }
    document.getElementById('machineId').textContent = machineId;
  } catch (error) {
    document.getElementById('machineId').textContent = 'خطأ';
  }
}

/**
 * التحقق من الترخيص الحالي
 */
async function checkCurrentLicense() {
  try {
    if (window.license && window.license.checkStatus) {
      const status = await window.license.checkStatus();
      displayLicenseStatus(status);
    }
  } catch (error) {
    // Error checking license
  }
}

/**
 * عرض حالة الترخيص
 */
function displayLicenseStatus(status) {
  const statusSection = document.getElementById('licenseStatus');
  const statusText = document.getElementById('statusText');
  const licenseType = document.getElementById('licenseType');
  const endDate = document.getElementById('endDate');
  const daysRemaining = document.getElementById('daysRemaining');
  
  if (status.licensed) {
    statusSection.classList.remove('hidden', 'expired');
    statusText.textContent = 'مفعل';
    statusText.className = 'value active';
    licenseType.textContent = status.licenseType;
    endDate.textContent = formatDate(status.endDate);
    
    if (status.daysRemaining <= 7) {
      daysRemaining.textContent = `${status.daysRemaining} يوم ⚠️`;
      daysRemaining.className = 'value warning';
    } else {
      daysRemaining.textContent = `${status.daysRemaining} يوم`;
      daysRemaining.className = 'value';
    }
  } else if (status.expired) {
    statusSection.classList.remove('hidden');
    statusSection.classList.add('expired');
    statusText.textContent = 'منتهي';
    statusText.className = 'value expired';
    licenseType.textContent = '--';
    endDate.textContent = '--';
    daysRemaining.textContent = 'انتهى';
    daysRemaining.className = 'value expired';
  } else {
    statusSection.classList.add('hidden');
  }
}

/**
 * نسخ معرف الجهاز
 */
async function copyMachineId() {
  try {
    await navigator.clipboard.writeText(machineId);
    showMessage('success', 'تم نسخ معرف الجهاز');
    
    // تأثير بصري
    const btn = document.querySelector('.copy-btn');
    btn.innerHTML = '<i class="fa-solid fa-check"></i>';
    setTimeout(() => {
      btn.innerHTML = '<i class="fa-regular fa-copy"></i>';
    }, 2000);
  } catch (error) {
    // Fallback للمتصفحات القديمة
    const input = document.createElement('input');
    input.value = machineId;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    showMessage('success', 'تم نسخ معرف الجهاز');
  }
}

/**
 * تنسيق إدخال رمز الترخيص
 */
function formatLicenseInput(input) {
  // السماح بأحرف base64 (A-Z, a-z, 0-9, +, /, =) والشرطات
  let value = input.value.replace(/[^A-Za-z0-9+/=-]/g, '');
  
  // إذا كان النص يحتوي على شرطات، لا نعيد التنسيق (الرمز منسق مسبقاً)
  if (input.value.includes('-')) {
    // إزالة الشرطات للتنسيق الجديد
    value = value.replace(/-/g, '');
  }
  
  let formatted = '';
  
  for (let i = 0; i < value.length; i++) {
    if (i > 0 && i % 4 === 0) {
      formatted += '-';
    }
    formatted += value[i];
  }
  
  input.value = formatted;
}

/**
 * تفعيل الترخيص - يطلب كلمة المرور أولاً
 */
async function activateLicense() {
  const codeInput = document.getElementById('licenseCode');
  const code = codeInput.value.trim();
  
  if (!code) {
    showMessage('error', 'الرجاء إدخال رمز التفعيل');
    codeInput.classList.add('shake');
    setTimeout(() => codeInput.classList.remove('shake'), 500);
    return;
  }
  
  // طلب كلمة المرور أولاً
  showActivationPasswordModal(code);
}

/**
 * عرض نافذة كلمة المرور للتفعيل
 */
function showActivationPasswordModal(code) {
  // إنشاء modal كلمة المرور إذا لم يكن موجوداً
  let modal = document.getElementById('activationPasswordModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'activationPasswordModal';
    modal.innerHTML = `
      <div style="position:fixed; top:0; left:0; right:0; bottom:0; background:linear-gradient(135deg,rgba(13,148,136,0.97),rgba(15,118,110,0.97)); backdrop-filter:blur(10px); z-index:1001; display:flex; align-items:center; justify-content:center;">
        <div style="background:linear-gradient(145deg,#ffffff,#f0fdfa); border-radius:24px; padding:40px; width:90%; max-width:380px; text-align:center; box-shadow:0 25px 50px -12px rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.2); position:relative; overflow:hidden;">
          <!-- خلفية زخرفية -->
          <div style="position:absolute; top:-50px; right:-50px; width:150px; height:150px; background:linear-gradient(135deg,rgba(13,148,136,0.1),rgba(20,184,166,0.1)); border-radius:50%;"></div>
          <div style="position:absolute; bottom:-30px; left:-30px; width:100px; height:100px; background:linear-gradient(135deg,rgba(13,148,136,0.08),rgba(15,118,110,0.08)); border-radius:50%;"></div>
          
          <!-- الأيقونة -->
          <div style="position:relative; z-index:1;">
            <div style="width:80px; height:80px; background:linear-gradient(135deg,#0d9488,#0f766e); border-radius:20px; margin:0 auto 25px; display:flex; align-items:center; justify-content:center; box-shadow:0 10px 30px rgba(13,148,136,0.4); transform:rotate(-5deg);">
              <i class="fa-solid fa-unlock-keyhole" style="font-size:32px; color:white;"></i>
            </div>
            
            <h3 style="color:#0f766e; font-size:22px; font-weight:700; margin-bottom:8px;">تأكيد التفعيل</h3>
            <p style="color:#64748b; font-size:14px; margin-bottom:25px;">أدخل كلمة المرور لتفعيل البرنامج</p>
            
            <!-- حقل الإدخال -->
            <div style="position:relative; margin-bottom:20px;">
              <i class="fa-solid fa-key" style="position:absolute; right:16px; top:50%; transform:translateY(-50%); color:#0d9488; font-size:16px;"></i>
              <input type="password" id="activationPassword" placeholder="••••••••••" style="width:100%; padding:16px 50px 16px 20px; font-size:18px; border:2px solid #99f6e4; border-radius:14px; text-align:center; outline:none; transition:all 0.3s; background:#f0fdfa; letter-spacing:3px;" onkeypress="if(event.key==='Enter')confirmActivation()" onfocus="this.style.borderColor='#0d9488';this.style.boxShadow='0 0 0 4px rgba(13,148,136,0.15)'" onblur="this.style.borderColor='#99f6e4';this.style.boxShadow='none'">
            </div>
            
            <!-- رسالة الخطأ -->
            <div id="activationPasswordError" style="display:none; background:#fef2f2; color:#dc2626; font-size:13px; padding:10px 15px; border-radius:10px; margin-bottom:20px; border:1px solid #fecaca;">
              <i class="fa-solid fa-circle-exclamation"></i> كلمة المرور غير صحيحة
            </div>
            
            <!-- الأزرار -->
            <div style="display:flex; gap:12px;">
              <button onclick="closeActivationPasswordModal()" style="flex:1; padding:14px; font-size:15px; background:#f0fdfa; color:#0f766e; border:2px solid #99f6e4; border-radius:12px; cursor:pointer; font-weight:600; transition:all 0.3s;" onmouseover="this.style.background='#ccfbf1'" onmouseout="this.style.background='#f0fdfa'">
                إلغاء
              </button>
              <button onclick="confirmActivation()" style="flex:1.5; padding:14px; font-size:15px; background:linear-gradient(135deg,#0d9488,#0f766e); color:white; border:none; border-radius:12px; cursor:pointer; font-weight:700; box-shadow:0 4px 15px rgba(13,148,136,0.4); transition:all 0.3s;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(13,148,136,0.5)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 15px rgba(13,148,136,0.4)'">
                <i class="fa-solid fa-check-circle"></i> تفعيل
              </button>
            </div>
            
            <!-- ملاحظة -->
            <p style="margin-top:20px; font-size:11px; color:#0d9488;">
              <i class="fa-solid fa-shield-check"></i> التفعيل محمي بكلمة مرور للأمان
            </p>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }
  
  // حفظ الرمز للاستخدام لاحقاً
  modal.dataset.code = code;
  modal.style.display = 'block';
  
  // تنظيف وتركيز
  document.getElementById('activationPassword').value = '';
  document.getElementById('activationPasswordError').style.display = 'none';
  setTimeout(() => document.getElementById('activationPassword').focus(), 100);
}

/**
 * إغلاق نافذة كلمة المرور
 */
function closeActivationPasswordModal() {
  const modal = document.getElementById('activationPasswordModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

/**
 * تأكيد التفعيل بعد التحقق من كلمة المرور
 */
async function confirmActivation() {
  const passwordInput = document.getElementById('activationPassword');
  const errorDiv = document.getElementById('activationPasswordError');
  const modal = document.getElementById('activationPasswordModal');
  const code = modal.dataset.code;
  
  try {
    // التحقق من كلمة المرور عبر الـ backend
    const passwordResult = await window.license.verifyDevPassword(passwordInput.value);
    
    if (!passwordResult.success) {
      errorDiv.style.display = 'block';
      passwordInput.style.borderColor = '#ef4444';
      setTimeout(() => {
        passwordInput.style.borderColor = '#99f6e4';
      }, 2000);
      return;
    }
    
    // إغلاق نافذة كلمة المرور
    closeActivationPasswordModal();
    
    // متابعة التفعيل
    await processActivation(code);
    
  } catch (error) {
    errorDiv.style.display = 'block';
  }
}

/**
 * معالجة التفعيل الفعلي
 */
async function processActivation(code) {
  const codeInput = document.getElementById('licenseCode');
  
  try {
    // تغيير حالة الزر
    const btn = document.querySelector('.activate-btn');
    const originalContent = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري التحقق...';
    btn.disabled = true;
    
    // التحقق من الرمز
    let result;
    if (window.license && window.license.activate) {
      result = await window.license.activate(code);
    } else {
      // للتجربة بدون الـ API
      result = { success: false, error: 'API غير متوفر' };
    }
    
    // إعادة الزر لحالته الأصلية
    btn.innerHTML = originalContent;
    btn.disabled = false;
    
    if (result.success) {
      showMessage('success', 'تم تفعيل البرنامج بنجاح! ✓');
      
      // تحديث عرض الحالة
      await checkCurrentLicense();
      
      // إعادة التوجيه بعد 2 ثانية
      setTimeout(() => {
        if (window.license && window.license.proceed) {
          window.license.proceed();
        }
      }, 2000);
    } else {
      showMessage('error', result.error || 'رمز التفعيل غير صالح');
      codeInput.classList.add('shake');
      setTimeout(() => codeInput.classList.remove('shake'), 500);
    }
  } catch (error) {
    showMessage('error', 'حدث خطأ أثناء التفعيل');
  }
}

// تصدير الدوال الجديدة
window.closeActivationPasswordModal = closeActivationPasswordModal;
window.confirmActivation = confirmActivation;

/**
 * عرض رسالة
 */
function showMessage(type, message) {
  const msgDiv = document.getElementById('statusMessage');
  
  let icon = '';
  switch (type) {
    case 'success':
      icon = '<i class="fa-solid fa-check-circle"></i>';
      break;
    case 'error':
      icon = '<i class="fa-solid fa-exclamation-circle"></i>';
      break;
    case 'warning':
      icon = '<i class="fa-solid fa-exclamation-triangle"></i>';
      break;
  }
  
  msgDiv.innerHTML = icon + ' ' + message;
  msgDiv.className = `status-message ${type}`;
  
  // إخفاء الرسالة بعد 5 ثواني
  setTimeout(() => {
    msgDiv.classList.add('hidden');
  }, 5000);
}

/**
 * فتح واتساب
 */
function openWhatsApp(phone) {
  const message = encodeURIComponent(`السلام عليكم\nأريد تفعيل برنامج المحاسب الذكي\nمعرف الجهاز: ${machineId}`);
  const url = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${message}`;
  
  if (window.api && window.api.openExternal) {
    window.api.openExternal(url);
  } else {
    window.open(url, '_blank');
  }
}

/**
 * تنسيق التاريخ
 */
function formatDate(dateStr) {
  if (!dateStr) return '--';
  const date = new Date(dateStr);
  return date.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// تصدير الدوال للاستخدام في HTML onclick
window.copyMachineId = copyMachineId;
window.formatLicenseInput = formatLicenseInput;
window.activateLicense = activateLicense;
window.openWhatsApp = openWhatsApp;

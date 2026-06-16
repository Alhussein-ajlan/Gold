/**
 * Edit Confirmation Modal - موديول تأكيد التعديل بكلمة المرور
 * يستخدم في جميع الشاشات لتأكيد عمليات التعديل
 */

(function() {
  // Translation dictionary
  const EDIT_CONFIRM_TRANSLATIONS = {
    ar: {
      confirmEditTitle: 'تأكيد التعديل',
      confirmDeleteTitle: 'تأكيد الحذف',
      confirmEditMessage: 'أدخل كلمة المرور الخاصة بك لتأكيد عملية التعديل',
      confirmDeleteMessage: 'أدخل كلمة المرور الخاصة بك لتأكيد عملية الحذف',
      btnCancel: 'إلغاء',
      btnConfirm: 'تأكيد',
      btnVerifying: 'جاري التحقق...',
      errorEnterPassword: 'أدخل كلمة المرور',
      errorUserNotFound: 'لم يتم العثور على بيانات المستخدم',
      errorWrongPassword: 'كلمة المرور غير صحيحة',
      errorVerification: 'حدث خطأ أثناء التحقق'
    },
    en: {
      confirmEditTitle: 'Confirm Edit',
      confirmDeleteTitle: 'Confirm Delete',
      confirmEditMessage: 'Enter your password to confirm the edit operation',
      confirmDeleteMessage: 'Enter your password to confirm the delete operation',
      btnCancel: 'Cancel',
      btnConfirm: 'Confirm',
      btnVerifying: 'Verifying...',
      errorEnterPassword: 'Enter password',
      errorUserNotFound: 'User data not found',
      errorWrongPassword: 'Incorrect password',
      errorVerification: 'Error during verification'
    }
  };

  function getEditConfirmLang() {
    // Try localStorage first
    const stored = localStorage.getItem('uiLang');
    if (stored === 'en' || stored === 'ar') return stored;
    // Check document lang attribute
    const docLang = document.documentElement.lang;
    if (docLang === 'en') return 'en';
    // Check if any iframe has English lang
    try {
      const iframe = document.querySelector('iframe');
      if (iframe && iframe.contentDocument) {
        const iframeLang = iframe.contentDocument.documentElement.lang;
        if (iframeLang === 'en') return 'en';
      }
    } catch(e) {}
    return 'ar';
  }

  function tEC(key) {
    const lang = getEditConfirmLang();
    return EDIT_CONFIRM_TRANSLATIONS[lang]?.[key] || EDIT_CONFIRM_TRANSLATIONS['ar'][key] || key;
  }

  // إنشاء الموديول مرة واحدة
  let modalElement = null;
  let resolveCallback = null;
  let rejectCallback = null;

  function createModal() {
    if (modalElement) return;

    const modalHtml = `
      <div id="editConfirmModal" class="edit-confirm-modal" aria-hidden="true" style="
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999999;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
        backdrop-filter: blur(4px);
      ">
        <style>
          .edit-confirm-modal[aria-hidden="false"] {
            opacity: 1 !important;
            visibility: visible !important;
          }
          .edit-confirm-modal[aria-hidden="false"] .edit-confirm-dialog {
            transform: translateY(0) scale(1) !important;
            opacity: 1 !important;
          }
          .edit-confirm-dialog {
            transform: translateY(-30px) scale(0.95);
            opacity: 0;
            transition: transform 0.3s ease, opacity 0.3s ease;
          }
          .edit-confirm-input {
            width: 100%;
            padding: 14px 16px;
            border: 2px solid rgba(255,255,255,0.1);
            border-radius: 10px;
            background: rgba(0,0,0,0.3);
            color: #fff;
            font-size: 16px;
            text-align: center;
            letter-spacing: 2px;
            outline: none;
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
          }
          .edit-confirm-input:focus {
            border-color: var(--primary, #00a99d);
            box-shadow: 0 0 0 3px rgba(var(--primary-rgb, 0,169,157), 0.2);
          }
          .edit-confirm-input.error {
            border-color: #ef5350;
            box-shadow: 0 0 0 3px rgba(239,83,80,0.2);
            animation: shake 0.5s ease;
          }
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-8px); }
            75% { transform: translateX(8px); }
          }
          .edit-confirm-btn {
            flex: 1;
            padding: 14px;
            border-radius: 10px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            border: none;
          }
          .edit-confirm-btn:hover {
            transform: translateY(-2px);
          }
          .edit-confirm-btn.cancel {
            background: rgba(255,255,255,0.1);
            color: #aaa;
            border: 1px solid rgba(255,255,255,0.2);
          }
          .edit-confirm-btn.cancel:hover {
            background: rgba(255,255,255,0.15);
            color: #fff;
          }
          .edit-confirm-btn.confirm {
            background: linear-gradient(135deg, var(--primary, #00a99d) 0%, var(--primary-600, #00897b) 100%);
            color: white;
            box-shadow: 0 4px 15px rgba(var(--primary-rgb, 0,169,157), 0.4);
          }
          .edit-confirm-btn.confirm:hover {
            box-shadow: 0 6px 20px rgba(var(--primary-rgb, 0,169,157), 0.5);
          }
          .edit-confirm-btn.confirm:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
          }
          .edit-confirm-error {
            color: #ef5350;
            font-size: 13px;
            margin-top: 8px;
            min-height: 20px;
            text-align: center;
          }
        </style>
        
        <div class="edit-confirm-dialog" style="
          background: linear-gradient(145deg, #1a1a2e, #16213e);
          border-radius: 20px;
          padding: 0;
          max-width: 400px;
          width: 90%;
          box-shadow: 0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(var(--primary-rgb, 0,169,157), 0.2);
          overflow: hidden;
        ">
          <!-- Header -->
          <div class="edit-confirm-header" style="
            background: linear-gradient(135deg, var(--primary, #00a99d) 0%, var(--primary-600, #00897b) 100%);
            padding: 24px;
            text-align: center;
          ">
            <div style="
              width: 60px;
              height: 60px;
              background: rgba(255,255,255,0.2);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 12px;
            ">
              <i class="fa-solid fa-lock" style="font-size: 26px; color: white;"></i>
            </div>
            <h3 id="editConfirmTitle" style="margin: 0; color: white; font-size: 20px; font-weight: 600;"></h3>
          </div>
          
          <!-- Body -->
          <div style="padding: 28px;">
            <p id="editConfirmMessage" style="
              color: #ccc;
              font-size: 15px;
              margin: 0 0 20px;
              text-align: center;
              line-height: 1.6;
            "></p>
            
            <div style="margin-bottom: 8px;">
              <input 
                type="password" 
                id="editConfirmPassword" 
                class="edit-confirm-input" 
                placeholder="••••••••"
                autocomplete="off"
              >
              <div id="editConfirmError" class="edit-confirm-error"></div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="
            padding: 0 28px 28px;
            display: flex;
            gap: 12px;
          ">
            <button id="editConfirmCancel" class="edit-confirm-btn cancel"></button>
            <button id="editConfirmSubmit" class="edit-confirm-btn confirm">
              <i class="fa-solid fa-check" style="margin-inline-end: 8px;"></i>
              <span id="editConfirmSubmitText"></span>
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    modalElement = document.getElementById('editConfirmModal');

    // Event listeners
    const passwordInput = document.getElementById('editConfirmPassword');
    const cancelBtn = document.getElementById('editConfirmCancel');
    const submitBtn = document.getElementById('editConfirmSubmit');
    const errorDiv = document.getElementById('editConfirmError');

    // إغلاق عند الضغط على إلغاء
    cancelBtn.addEventListener('click', () => {
      hideModal();
      if (rejectCallback) rejectCallback(new Error('cancelled'));
    });

    // إغلاق عند الضغط على الخلفية
    modalElement.addEventListener('click', (e) => {
      if (e.target === modalElement) {
        hideModal();
        if (rejectCallback) rejectCallback(new Error('cancelled'));
      }
    });

    // تأكيد عند الضغط على زر التأكيد
    submitBtn.addEventListener('click', async () => {
      await verifyPassword();
    });

    // تأكيد عند الضغط على Enter
    passwordInput.addEventListener('keypress', async (e) => {
      if (e.key === 'Enter') {
        await verifyPassword();
      }
    });

    // إزالة رسالة الخطأ عند الكتابة
    passwordInput.addEventListener('input', () => {
      errorDiv.textContent = '';
      passwordInput.classList.remove('error');
    });

    // إغلاق بـ Escape والتنقل بالأسهم
    document.addEventListener('keydown', (e) => {
      if (modalElement.getAttribute('aria-hidden') === 'false') {
        if (e.key === 'Escape') {
          e.preventDefault();
          hideModal();
          if (rejectCallback) rejectCallback(new Error('cancelled'));
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
          // التنقل بين الأزرار
          const focusedElement = document.activeElement;
          if (focusedElement === cancelBtn) {
            submitBtn.focus();
          } else if (focusedElement === submitBtn) {
            cancelBtn.focus();
          }
        }
      }
    });
  }

  async function verifyPassword() {
    const passwordInput = document.getElementById('editConfirmPassword');
    const errorDiv = document.getElementById('editConfirmError');
    const submitBtn = document.getElementById('editConfirmSubmit');
    const password = passwordInput.value;

    if (!password) {
      errorDiv.textContent = tEC('errorEnterPassword');
      passwordInput.classList.add('error');
      passwordInput.focus();
      return;
    }

    // الحصول على معرف المستخدم الحالي
    let userId = null;
    try {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        const userData = JSON.parse(currentUser);
        userId = userData.id;
      }
    } catch (e) {
      // Error parsing user data
    }
    
    if (!userId) {
      errorDiv.textContent = tEC('errorUserNotFound');
      return;
    }

    // تعطيل الزر أثناء التحقق
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin" style="margin-inline-end: 8px;"></i> ${tEC('btnVerifying')}`;

    try {
      let result;
      // Try window.users first, then window.api.invoke as fallback
      if (window.users && window.users.verifyUserPassword) {
        result = await window.users.verifyUserPassword(parseInt(userId), password);
      } else if (window.api && window.api.invoke) {
        result = await window.api.invoke('verify-user-password', { userId: parseInt(userId), password });
      } else {
        throw new Error('Password verification API not available');
      }
      
      if (result.success) {
        hideModal();
        if (resolveCallback) resolveCallback(true);
      } else {
        errorDiv.textContent = result.error || tEC('errorWrongPassword');
        passwordInput.classList.add('error');
        passwordInput.value = '';
        passwordInput.focus();
      }
    } catch (error) {
      errorDiv.textContent = tEC('errorVerification');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<i class="fa-solid fa-check" style="margin-inline-end: 8px;"></i> ${tEC('btnConfirm')}`;
    }
  }

  function showModal(isDelete = false) {
    createModal();
    const passwordInput = document.getElementById('editConfirmPassword');
    const errorDiv = document.getElementById('editConfirmError');
    const titleEl = document.getElementById('editConfirmTitle');
    const messageEl = document.getElementById('editConfirmMessage');
    
    // تحديث النصوص حسب نوع العملية
    const cancelBtn = document.getElementById('editConfirmCancel');
    const submitTextEl = document.getElementById('editConfirmSubmitText');
    
    if (isDelete) {
      if (titleEl) titleEl.textContent = tEC('confirmDeleteTitle');
      if (messageEl) messageEl.textContent = tEC('confirmDeleteMessage');
    } else {
      if (titleEl) titleEl.textContent = tEC('confirmEditTitle');
      if (messageEl) messageEl.textContent = tEC('confirmEditMessage');
    }
    if (cancelBtn) cancelBtn.textContent = tEC('btnCancel');
    if (submitTextEl) submitTextEl.textContent = tEC('btnConfirm');
    
    // إعادة تعيين الحقول
    passwordInput.value = '';
    passwordInput.classList.remove('error');
    errorDiv.textContent = '';
    
    modalElement.setAttribute('aria-hidden', 'false');
    
    // التركيز على حقل كلمة المرور
    setTimeout(() => passwordInput.focus(), 100);
  }

  function hideModal() {
    if (modalElement) {
      modalElement.setAttribute('aria-hidden', 'true');
    }
  }

  /**
   * طلب تأكيد التعديل بكلمة المرور
   * @returns {Promise<boolean>} - true إذا تم التأكيد بنجاح
   */
  window.confirmEditWithPassword = function() {
    return new Promise((resolve, reject) => {
      resolveCallback = resolve;
      rejectCallback = reject;
      showModal(false);
    });
  };

  /**
   * طلب تأكيد الحذف بكلمة المرور
   * @returns {Promise<boolean>} - true إذا تم التأكيد بنجاح
   */
  window.confirmDeleteWithPassword = function() {
    return new Promise((resolve, reject) => {
      resolveCallback = resolve;
      rejectCallback = reject;
      showModal(true);
    });
  };

  /**
   * التحقق مما إذا كان المستخدم قد أكد التعديل
   * يُستخدم لتغليف عمليات التعديل
   * @param {Function} editAction - الدالة التي تنفذ التعديل
   * @returns {Promise<any>} - نتيجة عملية التعديل
   */
  window.executeWithPasswordConfirm = async function(editAction) {
    try {
      const confirmed = await window.confirmEditWithPassword();
      if (confirmed) {
        return await editAction();
      }
    } catch (error) {
      if (error.message !== 'cancelled') {
        console.error('Edit confirmation error:', error);
      }
    }
    return null;
  };

})();

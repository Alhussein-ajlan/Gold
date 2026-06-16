// Permission Denied Modal - Beautiful UI for access denied messages

(function() {
  'use strict';

  const currentScriptSrc = (() => {
    if (document.currentScript?.src) return document.currentScript.src;
    const script = Array.from(document.scripts || []).find((item) => /permission-denied-modal\.js(?:$|\?)/.test(item?.src || ''));
    return script?.src || '';
  })();
  const stylesheetHref = currentScriptSrc ? new URL('./permission-denied-modal.css', currentScriptSrc).href : '';

  // Create modal HTML structure
  function createModalHTML() {
    const modalHTML = `
      <div id="permissionDeniedModal" class="permission-denied-modal" role="dialog" aria-labelledby="permDeniedTitle" aria-modal="true">
        <div class="permission-denied-backdrop"></div>
        <div class="permission-denied-content">
          <div class="permission-denied-header">
            <div class="permission-denied-icon">
              <i class="fa-solid fa-lock"></i>
            </div>
            <h2 id="permDeniedTitle" class="permission-denied-title">ممنوع الوصول</h2>
          </div>
          <div class="permission-denied-body">
            <p class="permission-denied-message" id="permDeniedMessage">ليس لديك صلاحية لتنفيذ هذا الإجراء</p>
            <p class="permission-denied-detail">يرجى التواصل مع المسؤول لمنحك الصلاحيات المطلوبة</p>
          </div>
          <div class="permission-denied-footer">
            <button class="permission-denied-close-btn" id="permDeniedCloseBtn">
              <i class="fa-regular fa-circle-check"></i> حسناً
            </button>
          </div>
        </div>
      </div>
    `;
    return modalHTML;
  }

  // Track if escape listener is already added (CRITICAL FIX)
  let escapeListenerAdded = false;

  function ensureStyles() {
    if (!document.head || !stylesheetHref) {
      return;
    }

    const existingStyle = document.querySelector('link[data-permission-denied-modal-style="true"], link[href*="permission-denied-modal.css"]');
    if (existingStyle) {
      return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = stylesheetHref;
    link.dataset.permissionDeniedModalStyle = 'true';
    document.head.appendChild(link);
  }

  // Initialize modal
  function initModal() {
    ensureStyles();

    // Check if modal already exists
    const existing = document.getElementById('permissionDeniedModal');
    if (existing) {
      return true;
    }

    // Wait for body to be available
    if (!document.body) {
      return false;
    }
    
    // Create and append modal to body
    const div = document.createElement('div');
    div.innerHTML = createModalHTML();
    document.body.appendChild(div.firstElementChild);

    // Add event listeners
    const modal = document.getElementById('permissionDeniedModal');
    const backdrop = modal.querySelector('.permission-denied-backdrop');
    const closeBtn = document.getElementById('permDeniedCloseBtn');

    if (!modal) {
      return false;
    }

    function closeModal() {
      modal.classList.remove('show');
      if (document.body) {
        document.body.style.overflow = '';
      }
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    // Close on Escape key - ADD ONLY ONCE! (CRITICAL FIX)
    if (!escapeListenerAdded) {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
          closeModal();
        }
      });
      escapeListenerAdded = true;
    }
    
    return true;
  }

  // Show permission denied modal
  function showPermissionDenied(message = 'ليس لديك صلاحية لتنفيذ هذا الإجراء') {
    ensureStyles();

    // Initialize modal if not already done
    const initialized = initModal();
    
    if (!initialized) {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          showPermissionDenied(message);
        }, { once: true });
        return;
      }

      if (window.showAlert && typeof window.showAlert === 'function') {
        window.showAlert(message, 'ممنوع الوصول', 'error');
      }
      return;
    }

    const modal = document.getElementById('permissionDeniedModal');
    const messageEl = document.getElementById('permDeniedMessage');
    const closeBtn = document.getElementById('permDeniedCloseBtn');

    if (!modal) {
      if (window.showAlert && typeof window.showAlert === 'function') {
        window.showAlert(message, 'ممنوع الوصول', 'error');
      }
      return;
    }
    
    if (messageEl) {
      messageEl.textContent = message;
    }

    // Show modal immediately
    modal.classList.add('show');
    if (document.body) {
      document.body.style.overflow = 'hidden';
    }
    setTimeout(() => closeBtn?.focus(), 0);
  }

  // Export to window
  window.PermissionDeniedModal = {
    show: showPermissionDenied,
    init: initModal
  };

  // Auto-initialize when DOM is ready
  function autoInit() {
    if (document.body) {
      initModal();
    } else {
      // Retry after a short delay if body is not ready
      setTimeout(autoInit, 50);
    }
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }
})();

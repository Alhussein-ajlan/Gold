/**
 * نظام عرض رسالة حساب غير نشط
 */

(function() {
  'use strict';

  // إنشاء Modal HTML إذا لم يكن موجوداً
  function createInactiveEntityModal() {
    if (document.getElementById('inactiveEntityModal')) return;

    const modalHtml = `
      <div id="inactiveEntityModal" class="inactive-entity-modal">
        <div class="inactive-entity-modal-content">
          <div class="inactive-entity-modal-header">
            <div class="inactive-entity-modal-icon">
              <i class="fa-solid fa-user-slash"></i>
            </div>
            <h2 class="inactive-entity-modal-title">حساب غير نشط</h2>
          </div>
          <div class="inactive-entity-modal-body">
            <p class="inactive-entity-message">
              لا يمكن إتمام العملية لأن الحساب المحدد غير نشط
            </p>
            <div class="inactive-entity-details">
              <div class="inactive-entity-detail-row">
                <span class="inactive-entity-detail-label">نوع الحساب:</span>
                <span class="inactive-entity-detail-value" id="inactiveEntityType">-</span>
              </div>
              <div class="inactive-entity-detail-row">
                <span class="inactive-entity-detail-label">اسم الحساب:</span>
                <span class="inactive-entity-detail-value highlight" id="inactiveEntityName">-</span>
              </div>
              <div class="inactive-entity-detail-row info">
                <span class="inactive-entity-detail-label"><i class="fa-solid fa-circle-info"></i></span>
                <span class="inactive-entity-detail-value" id="inactiveEntityHint">يرجى تفعيل الحساب أولاً من شاشة العملاء أو الموردين</span>
              </div>
            </div>
          </div>
          <div class="inactive-entity-modal-footer">
            <button class="inactive-entity-modal-btn" id="inactiveEntityCloseBtn">
              <i class="fa-solid fa-check"></i> حسناً
            </button>
          </div>
        </div>
      </div>
    `;

    // إضافة الأنماط
    const styleId = 'inactive-entity-modal-styles';
    if (!document.getElementById(styleId)) {
      const styles = document.createElement('style');
      styles.id = styleId;
      styles.textContent = `
        .inactive-entity-modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          z-index: 10000;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .inactive-entity-modal.show {
          display: flex;
          opacity: 1;
        }
        .inactive-entity-modal-content {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          border-radius: 16px;
          padding: 0;
          max-width: 420px;
          width: 90%;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(148, 163, 184, 0.1);
          transform: scale(0.9) translateY(20px);
          transition: transform 0.3s ease;
          overflow: hidden;
        }
        .inactive-entity-modal.show .inactive-entity-modal-content {
          transform: scale(1) translateY(0);
        }
        .inactive-entity-modal-header {
          background: linear-gradient(135deg, #64748b 0%, #475569 100%);
          padding: 24px;
          text-align: center;
        }
        .inactive-entity-modal-icon {
          width: 64px;
          height: 64px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px;
        }
        .inactive-entity-modal-icon i {
          font-size: 28px;
          color: #fff;
        }
        .inactive-entity-modal-title {
          color: #fff;
          font-size: 20px;
          font-weight: 600;
          margin: 0;
        }
        .inactive-entity-modal-body {
          padding: 24px;
        }
        .inactive-entity-message {
          color: #94a3b8;
          text-align: center;
          margin: 0 0 20px;
          font-size: 14px;
          line-height: 1.6;
        }
        .inactive-entity-details {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 12px;
          padding: 16px;
        }
        .inactive-entity-detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid rgba(148, 163, 184, 0.1);
        }
        .inactive-entity-detail-row:last-child {
          border-bottom: none;
        }
        .inactive-entity-detail-row.info {
          justify-content: flex-start;
          gap: 10px;
          color: #64748b;
          font-size: 12px;
        }
        .inactive-entity-detail-row.info i {
          color: #64748b;
        }
        .inactive-entity-detail-label {
          color: #64748b;
          font-size: 13px;
        }
        .inactive-entity-detail-value {
          color: #e2e8f0;
          font-size: 14px;
          font-weight: 500;
        }
        .inactive-entity-detail-value.highlight {
          color: #94a3b8;
          font-weight: 600;
        }
        .inactive-entity-modal-footer {
          padding: 0 24px 24px;
        }
        .inactive-entity-modal-btn {
          width: 100%;
          padding: 14px 24px;
          background: linear-gradient(135deg, #64748b 0%, #475569 100%);
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .inactive-entity-modal-btn:hover {
          background: linear-gradient(135deg, #475569 0%, #334155 100%);
          transform: translateY(-1px);
        }
        .inactive-entity-modal-btn:active {
          transform: translateY(0);
        }
      `;
      document.head.appendChild(styles);
    }

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // إضافة event listener للزر
    const closeBtn = document.getElementById('inactiveEntityCloseBtn');
    const modal = document.getElementById('inactiveEntityModal');
    
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        hideInactiveEntityModal();
      });
    }

    // إغلاق عند النقر على الخلفية
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          hideInactiveEntityModal();
        }
      });
    }

    // إغلاق عند الضغط على ESC أو Enter
    document.addEventListener('keydown', (e) => {
      const modal = document.getElementById('inactiveEntityModal');
      if (modal && modal.classList.contains('show')) {
        if (e.key === 'Escape' || e.key === 'Enter') {
          hideInactiveEntityModal();
        }
      }
    });
  }

  /**
   * عرض رسالة حساب غير نشط
   * @param {Object} details - تفاصيل الحساب
   */
  window.showInactiveEntityModal = function(details) {
    createInactiveEntityModal();

    const modal = document.getElementById('inactiveEntityModal');
    if (!modal) return;

    // تحديث المحتوى
    const typeEl = document.getElementById('inactiveEntityType');
    const nameEl = document.getElementById('inactiveEntityName');
    const hintEl = document.getElementById('inactiveEntityHint');

    if (details) {
      const typeLabels = {
        customer: 'عميل',
        supplier: 'مورد',
        account: 'حساب'
      };
      const normalizedType = String(details.entityType || '').trim().toLowerCase();
      const entityName = details.entityName || details.name || '-';
      if (typeEl) typeEl.textContent = typeLabels[normalizedType] || details.label || details.entityType || '-';
      if (nameEl) nameEl.textContent = entityName;
      if (hintEl) {
        let screen = 'العملاء';
        let subject = 'الكيان';
        if (normalizedType === 'supplier') {
          screen = 'الموردين';
          subject = 'المورد';
        } else if (normalizedType === 'account') {
          screen = 'شجرة الحسابات';
          subject = 'الحساب';
        } else {
          subject = 'العميل';
        }
        hintEl.textContent = `يرجى تفعيل ${subject} أولاً من شاشة ${screen}`;
      }
    }

    // عرض Modal
    setTimeout(() => {
      modal.classList.add('show');
    }, 10);
  };

  /**
   * إخفاء رسالة حساب غير نشط
   */
  window.hideInactiveEntityModal = function() {
    const modal = document.getElementById('inactiveEntityModal');
    if (!modal) return;

    modal.classList.remove('show');
  };

  /**
   * معالج استجابة API للتحقق من حساب غير نشط
   * @param {Object} response - استجابة API
   * @returns {boolean} - هل الحساب غير نشط؟
   */
  window.handleInactiveEntityResponse = function(response) {
    if (response && response.inactiveEntity && response.details) {
      window.showInactiveEntityModal(response.details);
      return true;
    }
    return false;
  };

  // ========== موديول تأكيد تنشيط الحساب ==========
  let activateConfirmCallback = null;
  
  // إضافة الأنماط المشتركة إذا لم تكن موجودة
  function ensureModalStyles() {
    const styleId = 'inactive-entity-modal-styles';
    if (document.getElementById(styleId)) return;
    
    const styles = document.createElement('style');
    styles.id = styleId;
    styles.textContent = `
      .inactive-entity-modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        z-index: 10000;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      .inactive-entity-modal.show {
        display: flex;
        opacity: 1;
      }
      .inactive-entity-modal-content {
        background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
        border-radius: 16px;
        padding: 0;
        max-width: 420px;
        width: 90%;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(148, 163, 184, 0.1);
        transform: scale(0.9) translateY(20px);
        transition: transform 0.3s ease;
        overflow: hidden;
      }
      .inactive-entity-modal.show .inactive-entity-modal-content {
        transform: scale(1) translateY(0);
      }
      .inactive-entity-modal-header {
        background: linear-gradient(135deg, #64748b 0%, #475569 100%);
        padding: 24px;
        text-align: center;
      }
      .inactive-entity-modal-icon {
        width: 64px;
        height: 64px;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 12px;
      }
      .inactive-entity-modal-icon i {
        font-size: 28px;
        color: #fff;
      }
      .inactive-entity-modal-title {
        color: #fff;
        font-size: 20px;
        font-weight: 600;
        margin: 0;
      }
      .inactive-entity-modal-body {
        padding: 24px;
      }
      .inactive-entity-message {
        color: #94a3b8;
        text-align: center;
        margin: 0 0 20px;
        font-size: 14px;
        line-height: 1.6;
      }
      .inactive-entity-details {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 12px;
        padding: 16px;
      }
      .inactive-entity-detail-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        border-bottom: 1px solid rgba(148, 163, 184, 0.1);
      }
      .inactive-entity-detail-row:last-child {
        border-bottom: none;
      }
      .inactive-entity-detail-row.info {
        justify-content: flex-start;
        gap: 10px;
        color: #64748b;
        font-size: 12px;
      }
      .inactive-entity-detail-row.info i {
        color: #64748b;
      }
      .inactive-entity-detail-label {
        color: #64748b;
        font-size: 13px;
      }
      .inactive-entity-detail-value {
        color: #e2e8f0;
        font-size: 14px;
        font-weight: 500;
      }
      .inactive-entity-detail-value.highlight {
        color: #94a3b8;
        font-weight: 600;
      }
      .inactive-entity-modal-footer {
        padding: 0 24px 24px;
      }
      .inactive-entity-modal-btn {
        width: 100%;
        padding: 14px 24px;
        background: linear-gradient(135deg, #64748b 0%, #475569 100%);
        color: #fff;
        border: none;
        border-radius: 10px;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }
      .inactive-entity-modal-btn:hover {
        filter: brightness(1.1);
        transform: translateY(-1px);
      }
      .inactive-entity-modal-btn:active {
        transform: translateY(0);
      }
    `;
    document.head.appendChild(styles);
  }
  
  function createActivateConfirmModal() {
    if (document.getElementById('activateAccountModal')) return;
    
    // التأكد من وجود الأنماط
    ensureModalStyles();

    const modalHtml = `
      <div id="activateAccountModal" class="inactive-entity-modal">
        <div class="inactive-entity-modal-content">
          <div class="inactive-entity-modal-header" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);">
            <div class="inactive-entity-modal-icon" style="background: rgba(255,255,255,0.2);">
              <i class="fa-solid fa-toggle-on"></i>
            </div>
            <h2 class="inactive-entity-modal-title">تنشيط الحساب</h2>
          </div>
          <div class="inactive-entity-modal-body">
            <p class="inactive-entity-message" id="activateAccountMessage">
              هل تريد تنشيط هذا الحساب وتعيينه كصندوق افتراضي؟
            </p>
            <div class="inactive-entity-details">
              <div class="inactive-entity-detail-row">
                <span class="inactive-entity-detail-label">اسم الحساب:</span>
                <span class="inactive-entity-detail-value highlight" id="activateAccountName">-</span>
              </div>
              <div class="inactive-entity-detail-row info">
                <span class="inactive-entity-detail-label"><i class="fa-solid fa-circle-info"></i></span>
                <span class="inactive-entity-detail-value">سيتم تنشيط الحساب تلقائياً ثم تعيينه كصندوق افتراضي</span>
              </div>
            </div>
          </div>
          <div class="inactive-entity-modal-footer" style="display: flex; gap: 12px;">
            <button class="inactive-entity-modal-btn" id="activateAccountYesBtn" style="flex: 1; background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
              <i class="fa-solid fa-check"></i> تنشيط وتعيين
            </button>
            <button class="inactive-entity-modal-btn" id="activateAccountNoBtn" style="flex: 1; background: linear-gradient(135deg, #64748b 0%, #475569 100%);">
              <i class="fa-solid fa-times"></i> إلغاء
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const modal = document.getElementById('activateAccountModal');
    const yesBtn = document.getElementById('activateAccountYesBtn');
    const noBtn = document.getElementById('activateAccountNoBtn');

    yesBtn.addEventListener('click', () => {
      hideActivateConfirmModal();
      if (activateConfirmCallback) activateConfirmCallback(true);
    });

    noBtn.addEventListener('click', () => {
      hideActivateConfirmModal();
      if (activateConfirmCallback) activateConfirmCallback(false);
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        hideActivateConfirmModal();
        if (activateConfirmCallback) activateConfirmCallback(false);
      }
    });

    // دعم لوحة المفاتيح
    document.addEventListener('keydown', (e) => {
      const modal = document.getElementById('activateAccountModal');
      if (modal && modal.classList.contains('show')) {
        if (e.key === 'Enter') {
          e.preventDefault();
          hideActivateConfirmModal();
          if (activateConfirmCallback) activateConfirmCallback(true);
        } else if (e.key === 'Escape') {
          e.preventDefault();
          hideActivateConfirmModal();
          if (activateConfirmCallback) activateConfirmCallback(false);
        }
      }
    });
  }

  function hideActivateConfirmModal() {
    const modal = document.getElementById('activateAccountModal');
    if (modal) modal.classList.remove('show');
  }

  /**
   * عرض موديول تأكيد تنشيط الحساب
   * @param {string} accountName - اسم الحساب
   * @returns {Promise<boolean>} - هل تم التأكيد؟
   */
  window.showActivateAccountConfirm = function(accountName) {
    return new Promise(resolve => {
      createActivateConfirmModal();
      
      const modal = document.getElementById('activateAccountModal');
      const nameEl = document.getElementById('activateAccountName');
      
      if (nameEl) nameEl.textContent = accountName || '-';
      
      activateConfirmCallback = resolve;
      
      setTimeout(() => {
        modal.classList.add('show');
        // التركيز على زر التأكيد
        const yesBtn = document.getElementById('activateAccountYesBtn');
        if (yesBtn) yesBtn.focus();
      }, 10);
    });
  };

})();

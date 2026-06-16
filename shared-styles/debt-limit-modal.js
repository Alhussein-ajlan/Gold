/**
 * نظام عرض رسالة تجاوز سقف المديونية
 */

(function() {
  'use strict';

  // إنشاء Modal HTML إذا لم يكن موجوداً
  function createDebtLimitModal() {
    if (document.getElementById('debtLimitModal')) return;

    const modalHtml = `
      <div id="debtLimitModal" class="debt-limit-modal">
        <div class="debt-limit-modal-content">
          <div class="debt-limit-modal-header">
            <div class="debt-limit-modal-icon">
              <i class="fa-solid fa-lock"></i>
            </div>
            <h2 class="debt-limit-modal-title">تجاوز سقف المديونية</h2>
          </div>
          <div class="debt-limit-modal-body">
            <p class="debt-limit-message">
              لا يمكن إتمام العملية نظراً لتجاوز سقف المديونية المحددة لهذا الحساب
            </p>
            <div class="debt-limit-details">
              <div class="debt-limit-detail-row">
                <span class="debt-limit-detail-label">الحساب:</span>
                <span class="debt-limit-detail-value" id="debtLimitEntity">-</span>
              </div>
              <div class="debt-limit-detail-row">
                <span class="debt-limit-detail-label">الرصيد الحالي:</span>
                <span class="debt-limit-detail-value" id="debtLimitCurrent">-</span>
              </div>
              <div class="debt-limit-detail-row">
                <span class="debt-limit-detail-label">الرصيد بعد العملية:</span>
                <span class="debt-limit-detail-value excess" id="debtLimitNew">-</span>
              </div>
              <div class="debt-limit-detail-row">
                <span class="debt-limit-detail-label">سقف المديونية:</span>
                <span class="debt-limit-detail-value" id="debtLimitMax">-</span>
              </div>
              <div class="debt-limit-detail-row">
                <span class="debt-limit-detail-label">التجاوز:</span>
                <span class="debt-limit-detail-value excess" id="debtLimitExcess">-</span>
              </div>
            </div>
          </div>
          <div class="debt-limit-modal-footer">
            <button class="debt-limit-modal-btn" id="debtLimitCloseBtn">
              <i class="fa-solid fa-check"></i> حسناً
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // إضافة event listener للزر
    const closeBtn = document.getElementById('debtLimitCloseBtn');
    const modal = document.getElementById('debtLimitModal');
    
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        hideDebtLimitModal();
      });
    }

    // إغلاق عند النقر على الخلفية
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          hideDebtLimitModal();
        }
      });
    }

    // إغلاق عند الضغط على ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        hideDebtLimitModal();
      }
    });
  }

  function parseDebtLimitNumber(value) {
    if (value === null || value === undefined || value === '') return null;
    if (typeof value === 'number') {
      return Number.isFinite(value) ? value : null;
    }
    const normalized = String(value).replace(/,/g, '').trim();
    if (!normalized) return null;
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : null;
  }

  function formatDebtLimitValue(value) {
    const numericValue = parseDebtLimitNumber(value);
    if (numericValue === null) {
      if (value === null || value === undefined || value === '') return '-';
      return String(value);
    }

    const normalizedValue = Math.abs(numericValue) < 0.0000005 ? 0 : numericValue;

    if (window.NumberFormatter && typeof window.NumberFormatter.formatCurrency === 'function') {
      return window.NumberFormatter.formatCurrency(normalizedValue);
    }

    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true,
    }).format(normalizedValue);
  }

  /**
   * عرض رسالة تجاوز سقف المديونية
   * @param {Object} details - تفاصيل التجاوز
   */
  window.showDebtLimitModal = function(details) {
    createDebtLimitModal();

    const modal = document.getElementById('debtLimitModal');
    if (!modal) return;

    // تحديث المحتوى
    const entityEl = document.getElementById('debtLimitEntity');
    const currentEl = document.getElementById('debtLimitCurrent');
    const newEl = document.getElementById('debtLimitNew');
    const maxEl = document.getElementById('debtLimitMax');
    const excessEl = document.getElementById('debtLimitExcess');

    if (details) {
      const entityName = details.entityName || details.name || '-';
      const currentBalance = details.currentBalance ?? '-';
      const newBalance = details.newBalance ?? details.projectedBalance ?? '-';
      const debtLimit = details.debtLimit ?? '-';
      const projectedBalanceNumber = parseDebtLimitNumber(details.newBalance ?? details.projectedBalance);
      const debtLimitNumber = parseDebtLimitNumber(details.debtLimit);
      const excess = details.excess ?? ((projectedBalanceNumber !== null && debtLimitNumber !== null)
        ? projectedBalanceNumber - debtLimitNumber
        : '-');
      if (entityEl) entityEl.textContent = entityName;
      if (currentEl) currentEl.textContent = formatDebtLimitValue(currentBalance);
      if (newEl) newEl.textContent = formatDebtLimitValue(newBalance);
      if (maxEl) maxEl.textContent = formatDebtLimitValue(debtLimit);
      if (excessEl) excessEl.textContent = formatDebtLimitValue(excess);
    }

    // عرض Modal
    setTimeout(() => {
      modal.classList.add('show');
    }, 10);
  };

  /**
   * إخفاء رسالة تجاوز سقف المديونية
   */
  window.hideDebtLimitModal = function() {
    const modal = document.getElementById('debtLimitModal');
    if (!modal) return;

    modal.classList.remove('show');
  };

  /**
   * معالج استجابة API للتحقق من تجاوز سقف المديونية
   * @param {Object} response - استجابة API
   * @returns {boolean} - هل تم تجاوز سقف المديونية؟
   */
  window.handleDebtLimitResponse = function(response) {
    if (response && response.debtLimitExceeded && response.details) {
      window.showDebtLimitModal(response.details);
      return true;
    }
    return false;
  };

})();

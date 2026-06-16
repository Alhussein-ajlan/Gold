/**
 * Custom Modal System for Confirm and Alert
 * Replaces native alert() and confirm() with elegant modals
 */

// Function to create modals
function createModals() {
  if (document.getElementById('confirmModal') || document.getElementById('alertModal')) {
    return;
  }
  const modalsHTML = `
    <!-- Confirm Modal Component -->
    <div id="confirmModal" class="modal-overlay confirm-modal-overlay" aria-hidden="true">
      <div class="modal-dialog confirm-modal-dialog">
        <div class="modal-header confirm-modal-header">
          <h3 id="confirmModalTitle">تأكيد</h3>
        </div>
        
        <div class="modal-body confirm-modal-body">
          <div class="confirm-icon">
            <i class="fa-solid fa-circle-question"></i>
          </div>
          <p id="confirmModalMessage">هل أنت متأكد؟</p>
        </div>
        
        <div class="modal-footer confirm-modal-footer">
          <button class="btn secondary" id="confirmModalCancel">إلغاء</button>
          <button class="btn primary" id="confirmModalOk">موافق</button>
        </div>
      </div>
    </div>

    <!-- Alert Modal Component -->
    <div id="alertModal" class="modal-overlay alert-modal-overlay" aria-hidden="true">
      <div class="modal-dialog alert-modal-dialog">
        <div class="modal-header alert-modal-header">
          <h3 id="alertModalTitle">تنبيه</h3>
        </div>
        
        <div class="modal-body alert-modal-body">
          <div class="alert-icon" id="alertModalIcon">
            <i class="fa-solid fa-circle-info"></i>
          </div>
          <p id="alertModalMessage">رسالة</p>
        </div>
        
        <div class="modal-footer alert-modal-footer">
          <button class="btn primary" id="alertModalOk">موافق</button>
        </div>
      </div>
    </div>

    <style>
    /* Confirm & Alert Modal Styles */
    .confirm-modal-overlay,
    .alert-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(6px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99999;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s ease;
    }

    .confirm-modal-overlay[aria-hidden="false"],
    .alert-modal-overlay[aria-hidden="false"] {
      opacity: 1;
      pointer-events: auto;
    }

    .confirm-modal-dialog,
    .alert-modal-dialog {
      background: var(--card, #1e293b);
      border-radius: 16px;
      width: 90%;
      max-width: 450px;
      box-shadow: 0 25px 70px rgba(0, 0, 0, 0.5);
      transform: scale(0.85);
      transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
      overflow: hidden;
    }

    .confirm-modal-overlay[aria-hidden="false"] .confirm-modal-dialog,
    .alert-modal-overlay[aria-hidden="false"] .alert-modal-dialog {
      transform: scale(1);
    }

    .confirm-modal-header,
    .alert-modal-header {
      padding: 20px 24px 16px;
      border-bottom: 1px solid var(--border, rgba(255, 255, 255, 0.1));
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.05));
    }

    .confirm-modal-header h3,
    .alert-modal-header h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: var(--text, #fff);
      text-align: center;
    }

    .confirm-modal-body,
    .alert-modal-body {
      padding: 32px 24px;
      text-align: center;
    }

    .confirm-icon,
    .alert-icon {
      width: 64px;
      height: 64px;
      margin: 0 auto 20px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      animation: iconPulse 0.5s ease-out;
    }

    @keyframes iconPulse {
      0% {
        transform: scale(0.5);
        opacity: 0;
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }

    .confirm-icon {
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.1));
      color: var(--primary, #3b82f6);
    }

    .alert-icon {
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.1));
      color: var(--primary, #3b82f6);
    }

    .alert-icon.success {
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.1));
      color: #10b981;
    }

    .alert-icon.error {
      background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.1));
      color: #ef4444;
    }

    .alert-icon.warning {
      background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(217, 119, 6, 0.1));
      color: #f59e0b;
    }

    #confirmModalMessage,
    #alertModalMessage {
      margin: 0;
      font-size: 16px;
      line-height: 1.6;
      color: var(--text, #fff);
      font-weight: 500;
    }

    .confirm-modal-footer,
    .alert-modal-footer {
      padding: 16px 24px;
      border-top: 1px solid var(--border, rgba(255, 255, 255, 0.1));
      display: flex;
      gap: 12px;
      justify-content: center;
    }

    .confirm-modal-footer .btn,
    .alert-modal-footer .btn {
      min-width: 120px;
      padding: 12px 24px;
      border-radius: 10px;
      font-size: 15px;
      font-weight: 600;
      border: none;
      cursor: pointer;
      transition: all 0.2s;
    }

    .confirm-modal-footer .btn.primary,
    .alert-modal-footer .btn.primary {
      background: linear-gradient(135deg, var(--primary, #3b82f6), #2563eb);
      color: #fff;
    }

    .confirm-modal-footer .btn.primary:hover,
    .alert-modal-footer .btn.primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
    }

    .confirm-modal-footer .btn.secondary {
      background: rgba(255, 255, 255, 0.1);
      color: var(--text, #fff);
    }

    .confirm-modal-footer .btn.secondary:hover {
      background: rgba(255, 255, 255, 0.15);
    }

    .confirm-modal-footer .btn:active {
      transform: translateY(0);
    }
    </style>
  `;
  
  const container = document.createElement('div');
  container.innerHTML = modalsHTML;
  document.body.appendChild(container);
}

// Create modals when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createModals);
} else {
  createModals();
}

// Wait for modals to be loaded
function waitForModals(callback) {
  // Check immediately first
  if (document.getElementById('confirmModal') && document.getElementById('alertModal')) {
    callback();
    return;
  }
  
  // Then poll if not ready
  const checkInterval = setInterval(() => {
    if (document.getElementById('confirmModal') && document.getElementById('alertModal')) {
      clearInterval(checkInterval);
      callback();
    }
  }, 50);
  
  // Timeout after 5 seconds
  setTimeout(() => {
    clearInterval(checkInterval);
  }, 5000);
}

/**
 * Show custom confirm modal
 * @param {string} message - The message to display
 * @param {string} title - Optional title (default: "تأكيد")
 * @returns {Promise<boolean>} - Returns true if user clicks OK, false if Cancel
 */
window.showConfirm = function(message, title = 'تأكيد') {
  return new Promise((resolve) => {
    waitForModals(() => {
      const modal = document.getElementById('confirmModal');
      const titleEl = document.getElementById('confirmModalTitle');
      const messageEl = document.getElementById('confirmModalMessage');
      const btnOk = document.getElementById('confirmModalOk');
      const btnCancel = document.getElementById('confirmModalCancel');
      
      if (!modal || !titleEl || !messageEl || !btnOk || !btnCancel) {
        resolve(window.confirm(message)); // Fallback
        return;
      }
      
      // Set content
      titleEl.textContent = title;
      messageEl.textContent = message;
      
      // Show modal
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      
      // Handle OK
      const handleOk = () => {
        cleanup();
        resolve(true);
      };
      
      // Handle Cancel
      const handleCancel = () => {
        cleanup();
        resolve(false);
      };
      
      // Handle backdrop click
      const handleBackdrop = (e) => {
        if (e.target === modal) {
          handleCancel();
        }
      };
      
      // Handle keyboard events
      const handleKeydown = (e) => {
        if (modal.getAttribute('aria-hidden') === 'true') return;
        if (e.key === 'Enter') {
          e.preventDefault();
          handleOk();
        } else if (e.key === 'Escape') {
          e.preventDefault();
          handleCancel();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
          e.preventDefault();
          // Toggle focus between buttons
          if (document.activeElement === btnOk) {
            btnCancel.focus();
          } else {
            btnOk.focus();
          }
        }
      };
      
      // Cleanup
      const cleanup = () => {
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        btnOk.removeEventListener('click', handleOk);
        btnCancel.removeEventListener('click', handleCancel);
        modal.removeEventListener('click', handleBackdrop);
        document.removeEventListener('keydown', handleKeydown);
      };
      
      // Bind events
      btnOk.addEventListener('click', handleOk);
      btnCancel.addEventListener('click', handleCancel);
      modal.addEventListener('click', handleBackdrop);
      document.addEventListener('keydown', handleKeydown);
      
      // Focus OK button
      setTimeout(() => btnOk.focus(), 300);
    });
  });
};

/**
 * Show custom alert modal
 * @param {string} message - The message to display
 * @param {string} title - Optional title (default: "تنبيه")
 * @param {string} type - Optional type: 'info', 'success', 'error', 'warning' (default: 'info')
 * @returns {Promise<void>}
 */
window.showAlert = function(message, title = 'تنبيه', type = 'info') {
  return new Promise((resolve) => {
    waitForModals(() => {
      const modal = document.getElementById('alertModal');
      const titleEl = document.getElementById('alertModalTitle');
      const messageEl = document.getElementById('alertModalMessage');
      const iconEl = document.getElementById('alertModalIcon');
      const btnOk = document.getElementById('alertModalOk');
      
      if (!modal || !titleEl || !messageEl || !iconEl || !btnOk) {
        window.alert(message); // Fallback
        resolve();
        return;
      }
      
      // Set content
      titleEl.textContent = title;
      messageEl.textContent = message;
      
      // Set icon based on type
      iconEl.className = 'alert-icon ' + type;
      
      let iconClass = 'fa-circle-info';
      switch(type) {
        case 'success':
          iconClass = 'fa-circle-check';
          break;
        case 'error':
          iconClass = 'fa-circle-xmark';
          break;
        case 'warning':
          iconClass = 'fa-triangle-exclamation';
          break;
      }
      iconEl.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;
      
      // Show modal
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      
      // Handle OK
      const handleOk = () => {
        cleanup();
        resolve();
      };
      
      // Handle backdrop click
      const handleBackdrop = (e) => {
        if (e.target === modal) {
          handleOk();
        }
      };
      
      // Handle keyboard events
      const handleKeydown = (e) => {
        if (modal.getAttribute('aria-hidden') === 'true') return;
        if (e.key === 'Enter' || e.key === 'Escape') {
          e.preventDefault();
          handleOk();
        }
      };
      
      // Cleanup
      const cleanup = () => {
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        btnOk.removeEventListener('click', handleOk);
        modal.removeEventListener('click', handleBackdrop);
        document.removeEventListener('keydown', handleKeydown);
      };
      
      // Bind events
      btnOk.addEventListener('click', handleOk);
      modal.addEventListener('click', handleBackdrop);
      document.addEventListener('keydown', handleKeydown);
      
      // Focus OK button
      setTimeout(() => btnOk.focus(), 300);
    });
  });
};

// Override native alert and confirm (optional, for backward compatibility)
// Uncomment these if you want to automatically replace all alert/confirm calls
/*
window.alert = function(message) {
  return window.showAlert(message);
};

window.confirm = function(message) {
  return window.showConfirm(message);
};
*/

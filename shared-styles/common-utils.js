/**
 * Common Utility Functions
 * Shared across all screens to eliminate code duplication
 */

(function(window) {
  'use strict';

  /**
   * Parse decimal value from string, handling various formats
   * Handles: "1,000.00", "1000.5", "1.000,5", etc.
   * @param {string|number} val - The value to parse
   * @returns {number} Parsed number
   */
  function parseDecimal(val) {
    if (val === undefined || val === null || val === '') return 0;
    
    // Convert to string and remove Arabic comma and spaces
    let s = String(val).trim().replace(/\s+/g, '').replace(/٬/g, '');
    
    // Smart comma handling
    // If both comma and dot exist, comma is thousand separator
    if (s.includes(',') && s.includes('.')) {
      s = s.replace(/,/g, ''); // Remove thousand separators
    }
    // If comma is near the end (within 3 chars), treat as decimal separator
    else if (s.includes(',') && s.lastIndexOf(',') > s.length - 4) {
      s = s.replace(/,/g, '.'); // Convert to decimal separator
    }
    // Otherwise, comma is thousand separator
    else if (s.includes(',')) {
      s = s.replace(/,/g, ''); // Remove thousand separators
    }
    
    const n = parseFloat(s);
    return isNaN(n) ? 0 : n;
  }

  /**
   * Format number with thousand separators
   * @param {number|string} value - The value to format
   * @returns {string} Formatted number (e.g., "1,000.50")
   */
  function formatNumberWithCommas(value) {
    if (!value && value !== 0) return '';
    
    // Convert to string and remove existing commas
    let strValue = String(value).replace(/,/g, '');
    
    // Split into integer and decimal parts
    const parts = strValue.split('.');
    let integerPart = parts[0];
    const decimalPart = parts[1];
    
    // Add commas to integer part
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    // Combine back
    if (decimalPart !== undefined) {
      return integerPart + '.' + decimalPart;
    }
    return integerPart;
  }

  /**
   * Show modal alert (replaces native alert)
   * @param {string} message - The message to display
   * @param {string} type - 'info', 'error', 'warning', 'success'
   * @param {string} title - Optional title
   * @returns {Promise} Resolves when modal is closed
   */
  function showAlert(message, type = 'info', title = '') {
    return new Promise((resolve) => {
      // إزالة أي modal سابق
      const existing = document.getElementById('globalAlertModal');
      if (existing) existing.remove();
      
      // تحديد الألوان والأيقونات حسب النوع
      const styles = {
        info: { bg: '#3b82f6', icon: 'fa-circle-info', color: '#1e40af' },
        error: { bg: '#ef4444', icon: 'fa-circle-exclamation', color: '#dc2626' },
        warning: { bg: '#f59e0b', icon: 'fa-triangle-exclamation', color: '#b45309' },
        success: { bg: '#22c55e', icon: 'fa-circle-check', color: '#16a34a' }
      };
      const style = styles[type] || styles.info;
      
      // تحديد اللغة
      const lang = localStorage.getItem('uiLang') || 'ar';
      const isAr = lang === 'ar';
      
      // العناوين والأزرار حسب اللغة
      const titles = {
        ar: { error: 'خطأ', warning: 'تنبيه', success: 'نجاح', info: 'تنبيه' },
        en: { error: 'Error', warning: 'Warning', success: 'Success', info: 'Info' }
      };
      const okText = isAr ? 'موافق' : 'OK';
      const modalTitle = title || titles[lang]?.[type] || titles.ar[type];
      
      // تحديد ألوان الوضع الداكن/الفاتح
      const isDark = document.body.classList.contains('dark') || 
                     document.documentElement.classList.contains('dark') ||
                     window.matchMedia('(prefers-color-scheme: dark)').matches;
      const bgColor = isDark ? '#1f2937' : 'white';
      const textColor = isDark ? '#e5e7eb' : '#374151';
      const borderColor = isDark ? '#374151' : '#e5e7eb';
      
      // إنشاء الـ modal
      const modal = document.createElement('div');
      modal.id = 'globalAlertModal';
      modal.innerHTML = `
        <div style="position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:99999; display:flex; align-items:center; justify-content:center; animation:fadeIn 0.2s ease">
          <div style="background:${bgColor}; border-radius:12px; box-shadow:0 10px 40px rgba(0,0,0,0.3); max-width:400px; width:90%; animation:slideIn 0.2s ease; overflow:hidden">
            <div style="background:${style.bg}; padding:16px 20px; display:flex; align-items:center; gap:12px">
              <i class="fa-solid ${style.icon}" style="color:white; font-size:24px"></i>
              <span style="color:white; font-size:16px; font-weight:700">${modalTitle}</span>
            </div>
            <div style="padding:20px; font-size:14px; color:${textColor}; line-height:1.7; text-align:center">
              ${message}
            </div>
            <div style="padding:12px 20px; border-top:1px solid ${borderColor}; display:flex; justify-content:center">
              <button id="globalAlertBtn" style="padding:10px 40px; background:${style.bg}; color:white; border:none; border-radius:8px; font-size:14px; font-weight:600; cursor:pointer; transition:all 0.2s">
                ${okText}
              </button>
            </div>
          </div>
        </div>
        <style>
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slideIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        </style>
      `;
      
      document.body.appendChild(modal);
      
      // إغلاق عند الضغط على الزر
      const btn = document.getElementById('globalAlertBtn');
      const closeModal = () => {
        modal.remove();
        resolve();
      };
      
      btn.addEventListener('click', closeModal);
      btn.focus();
      
      // إغلاق عند الضغط على الخلفية
      modal.querySelector('div').addEventListener('click', (e) => {
        if (e.target === modal.querySelector('div')) closeModal();
      });
      
      // إغلاق بـ Escape أو Enter
      const handleKey = (e) => {
        if (e.key === 'Escape' || e.key === 'Enter') {
          closeModal();
          document.removeEventListener('keydown', handleKey);
        }
      };
      document.addEventListener('keydown', handleKey);
    });
  }

  /**
   * Show toast notification
   * @param {string} type - 'success' or 'error'
   * @param {string} message - The message to display
   */
  function showToast(type = 'success', message = '') {
    const wrap = document.getElementById('toastWrap');
    if (!wrap) {
      try {
        alert(message || (type === 'error' ? 'حدث خطأ' : 'تم'));
      } catch (_) {}
      return;
    }
    
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.textContent = message || (type === 'error' ? 'حدث خطأ' : 'تم بنجاح');
    wrap.appendChild(el);
    
    setTimeout(() => {
      el.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      el.classList.remove('show');
      setTimeout(() => {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 300);
    }, 3000);
  }

  /**
   * Format date as dd/mm/yyyy
   * @param {string|Date} dateValue - Date string (yyyy-mm-dd) or Date object
   * @returns {string} Formatted date (dd/mm/yyyy)
   */
  function formatDateDMY(dateValue) {
    if (!dateValue) return '';
    
    let date;
    if (typeof dateValue === 'string') {
      // Handle yyyy-mm-dd format
      if (dateValue.includes('-')) {
        const parts = dateValue.split('-');
        if (parts.length === 3 && parts[0].length === 4) {
          return `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
      }
      date = new Date(dateValue);
    } else {
      date = dateValue;
    }
    
    if (isNaN(date.getTime())) return dateValue;
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  }

  /**
   * Parse dd/mm/yyyy to yyyy-mm-dd (for date input value)
   * @param {string} dateStr - Date string in dd/mm/yyyy format
   * @returns {string} Date in yyyy-mm-dd format
   */
  function parseDateDMY(dateStr) {
    if (!dateStr) return '';
    
    // Already in yyyy-mm-dd format
    if (dateStr.includes('-') && dateStr.split('-')[0].length === 4) {
      return dateStr;
    }
    
    // Parse dd/mm/yyyy
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    
    return dateStr;
  }

  /**
   * Initialize date inputs - placeholder for future enhancements
   * Note: HTML5 date inputs display based on system locale
   * Use formatDateDMY() when displaying dates in tables/reports
   */
  function initDateInputs(container = document) {
    // No-op: Keep native date picker behavior
    // Dates are formatted using formatDateDMY() when displayed in tables/reports
  }

  // Export to window
  window.CommonUtils = {
    parseDecimal,
    formatNumberWithCommas,
    showToast,
    showAlert,
    formatDateDMY,
    parseDateDMY,
    initDateInputs
  };

  // Also make available globally for backward compatibility
  if (typeof window.parseDecimal === 'undefined') {
    window.parseDecimal = parseDecimal;
  }
  if (typeof window.formatNumberWithCommas === 'undefined') {
    window.formatNumberWithCommas = formatNumberWithCommas;
  }
  if (typeof window.showToast === 'undefined') {
    window.showToast = showToast;
  }
  if (typeof window.showAlert === 'undefined') {
    window.showAlert = showAlert;
  }
  if (typeof window.formatDateDMY === 'undefined') {
    window.formatDateDMY = formatDateDMY;
  }
  if (typeof window.parseDateDMY === 'undefined') {
    window.parseDateDMY = parseDateDMY;
  }
  if (typeof window.initDateInputs === 'undefined') {
    window.initDateInputs = initDateInputs;
  }

  // Auto-initialize date inputs when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initDateInputs());
  } else {
    // DOM already loaded, init after a short delay to ensure all elements are ready
    setTimeout(() => initDateInputs(), 100);
  }

})(window);

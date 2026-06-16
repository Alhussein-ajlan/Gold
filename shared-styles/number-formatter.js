/**
 * Number Formatter Utility
 * Format numbers with thousand separators and decimal places
 * Format: 1,000.00
 */

(function(window) {
  'use strict';

  // Create number formatter with specified options
  const createFormatter = (decimals = 2, locale = 'en-US') => {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping: true
    });
  };

  // Default formatters
  const formatters = {
    currency: createFormatter(2), // 1,000.00
    quantity: createFormatter(3), // 1,000.000
    weight: createFormatter(3),   // 1,000.000
    percentage: createFormatter(2), // 10.50%
    integer: createFormatter(0)   // 1,000
  };

  /**
   * Format number with thousand separators
   * @param {number|string} value - The value to format
   * @param {number} decimals - Number of decimal places (default: 2)
   * @returns {string} Formatted number string
   */
  const formatNumber = (value, decimals = 2) => {
    if (value === null || value === undefined || value === '') return '';
    
    const num = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;
    
    if (isNaN(num)) return '';
    
    const formatter = decimals === 0 ? formatters.integer :
                     decimals === 3 ? formatters.quantity :
                     formatters.currency;
    
    return formatter.format(num);
  };

  /**
   * Parse formatted number back to float
   * @param {string} value - Formatted number string
   * @returns {number} Parsed number
   */
  const parseNumber = (value) => {
    if (!value) return 0;
    const str = String(value).replace(/,/g, '');
    const num = parseFloat(str);
    return isNaN(num) ? 0 : num;
  };

  /**
   * Format currency (2 decimals)
   */
  const formatCurrency = (value) => formatNumber(value, 2);

  /**
   * Format weight/gold (3 decimals)
   */
  const formatWeight = (value) => formatNumber(value, 3);

  /**
   * Format integer (0 decimals)
   */
  const formatInteger = (value) => formatNumber(value, 0);

  /**
   * Auto-format all number inputs in a container
   * @param {HTMLElement} container - Container element
   * @param {number} decimals - Default decimal places
   */
  const autoFormatInputs = (container, decimals = 2) => {
    if (!container) return;

    const inputs = container.querySelectorAll('input[type="number"], input[data-format-number]');
    
    inputs.forEach(input => {
      // Skip if explicitly marked to skip formatting
      if (input.dataset.skipFormat === 'true' || input.readOnly) {
        return;
      }
      
      const inputDecimals = parseInt(input.dataset.decimals) || decimals;
      
      // Format on blur
      input.addEventListener('blur', function() {
        if (this.value && !this.dataset.skipFormat) {
          const formatted = formatNumber(this.value, inputDecimals);
          this.value = formatted;
        }
      });

      // Remove formatting on focus for easier editing
      input.addEventListener('focus', function() {
        if (this.value && !this.dataset.skipFormat) {
          const num = parseNumber(this.value);
          this.value = num === 0 ? '' : num;
        }
      });
    });
  };

  /**
   * Format all number cells in a table
   * @param {HTMLTableElement} table - Table element
   */
  const formatTableNumbers = (table) => {
    if (!table) return;

    // Format cells with data-format attribute
    const cells = table.querySelectorAll('td[data-format], th[data-format]');
    cells.forEach(cell => {
      const format = cell.dataset.format;
      const value = cell.textContent.trim();
      
      if (value && !isNaN(parseNumber(value))) {
        switch(format) {
          case 'currency':
            cell.textContent = formatCurrency(value);
            break;
          case 'weight':
            cell.textContent = formatWeight(value);
            break;
          case 'integer':
            cell.textContent = formatInteger(value);
            break;
          default:
            const decimals = parseInt(format) || 2;
            cell.textContent = formatNumber(value, decimals);
        }
        cell.style.textAlign = 'right';
        cell.style.direction = 'ltr';
      }
    });
  };

  /**
   * Add formatting to table on row insert
   * @param {HTMLTableElement} table - Table element
   */
  const observeTable = (table) => {
    if (!table) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1 && (node.tagName === 'TR' || node.tagName === 'TBODY')) {
              formatTableNumbers(table);
            }
          });
        }
      });
    });

    observer.observe(table, { childList: true, subtree: true });
  };

  /**
   * Initialize number formatting for all tables and inputs
   */
  const initNumberFormatting = () => {
    // Format existing tables
    document.querySelectorAll('table.table, table[data-format-numbers]').forEach(table => {
      formatTableNumbers(table);
      observeTable(table);
    });

    // Auto-format inputs
    document.querySelectorAll('.table, .form-card, [data-format-inputs]').forEach(container => {
      autoFormatInputs(container);
    });
  };

  // Export to window object
  window.NumberFormatter = {
    format: formatNumber,
    formatCurrency,
    formatWeight,
    formatInteger,
    parse: parseNumber,
    autoFormatInputs,
    formatTableNumbers,
    observeTable,
    init: initNumberFormatting
  };

  // Auto-initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNumberFormatting);
  } else {
    initNumberFormatting();
  }

})(window);

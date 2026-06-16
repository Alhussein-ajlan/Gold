// Invoice Settings Manager
(function() {
  'use strict';

  // Default settings
  const defaultSettings = {
    // Tax settings
    taxEnabled: true,
    taxRate: 15,
    taxOnLabor: true,
    defaultInvoiceType: 'taskir',
    lockTaxRate: true,
    lockTaxOnLabor: false,
    allowInvoiceTypeChange: true,
    
    // Ounce calculation settings
    ounceCalculationType: 'default',
    conversionFactor: 31.1035,
    exchangeRate: 3.75,
    goldMultiplier: 0.12056,
    gold2Multiplier: 0.120555,
    customMultiplier: 1,
    
    // Payment settings
    defaultPaymentType: 'credit',
    lockPaymentType: false,
    
    // Validation settings
    warnDeleteLine: false,
    warnDeleteInvoice: false,
    requireOunceTaskir: false,
    requireKarat: false,
    warnDuplicateRef: false
  };

  let currentSettings = { ...defaultSettings };

  function getInvoiceSettingsAPI() {
    if (window.parent && window.parent !== window && window.parent.api) {
      return window.parent.api;
    }
    if (window.api) {
      return window.api;
    }
    if (window.top && window.top !== window && window.top.api) {
      return window.top.api;
    }
    return null;
  }

  // Initialize
  function init() {
    setupEventListeners();
    loadSettings();

    const api = getInvoiceSettingsAPI();
    if (api && typeof api.on === 'function') {
      api.on('cloud-data-updated', (payload) => {
        const tables = Array.isArray(payload?.tables) ? payload.tables : [];
        if (tables.includes('invoice_settings')) {
          loadSettings();
        }
      });
    }

    window.addEventListener('message', (event) => {
      if (event?.data?.type === 'branch-scope-changed') {
        loadSettings();
        return;
      }
      if (event?.data?.type !== 'cloud-data-updated') {
        return;
      }
      const payload = event.data.payload || {};
      const tables = Array.isArray(payload?.tables) ? payload.tables : [];
      if (tables.includes('invoice_settings')) {
        loadSettings();
      }
    });
  }

  // Setup event listeners
  function setupEventListeners() {
    // Check if elements exist before setting up listeners
    const calcType = document.getElementById('ounceCalculationType');
    if (!calcType) {
      // Elements not ready yet, try again after a delay
      setTimeout(setupEventListeners, 200);
      return;
    }

    // Calculation type change
    if (calcType) {
      calcType.addEventListener('change', handleCalculationTypeChange);
    }

    // Input changes for formula preview
    const inputs = ['conversionFactor', 'exchangeRate', 'goldMultiplier', 'gold2Multiplier', 'customMultiplier'];
    inputs.forEach(id => {
      const input = document.getElementById(id);
      if (input) {
        input.addEventListener('input', updateFormulaPreview);
      }
    });

    // Template buttons
    const templateBtns = document.querySelectorAll('.template-btn');
    templateBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const rate = parseFloat(btn.dataset.rate);
        const exchangeRateInput = document.getElementById('exchangeRate');
        if (exchangeRateInput) {
          exchangeRateInput.value = rate;
          updateFormulaPreview();
        }
      });
    });

    // Save button
    const saveBtn = document.getElementById('saveInvoiceSettings');
    if (saveBtn) {
      saveBtn.addEventListener('click', saveSettings);
    }

    // Reset button
    const resetBtn = document.getElementById('resetInvoiceSettings');
    if (resetBtn) {
      resetBtn.addEventListener('click', resetToDefault);
    }
  }

  // Remove modal functions - not needed for card
  function openModal() {
    // Not needed - card is always visible
  }

  function closeModal() {
    // Not needed - card is always visible
  }

  // Load settings from database
  async function loadSettings() {
    try {
      const api = getInvoiceSettingsAPI();
      if (!api || !api.getInvoiceSettings) {
        currentSettings = { ...defaultSettings };
        applySettingsToForm();
        updateFormulaPreview();
        return;
      }

      const result = await api.getInvoiceSettings();


      if (result && result.success && result.data) {
        const dbSettings = result.data;
        if (
          String(dbSettings.defaultInvoiceType || '').trim() === 'mashghul' &&
          String(dbSettings.defaultPaymentType || '').trim() === 'cash' &&
          api && typeof api.saveInvoiceSettings === 'function'
        ) {
          try {
            const normalizedSettings = {
              ...dbSettings,
              defaultInvoiceType: 'taskir',
              defaultPaymentType: 'credit'
            };
            const normalizedResult = await api.saveInvoiceSettings(normalizedSettings);
            if (normalizedResult && normalizedResult.success) {
              dbSettings.defaultInvoiceType = 'taskir';
              dbSettings.defaultPaymentType = 'credit';
            }
          } catch (_) {}
        }
        // Convert integer values to booleans for checkboxes
        currentSettings = {
          ...defaultSettings,
          ...dbSettings,
          // Ensure boolean conversion for checkbox fields
          taxEnabled: Boolean(dbSettings.taxEnabled),
          taxOnLabor: Boolean(dbSettings.taxOnLabor),
          lockTaxRate: Boolean(dbSettings.lockTaxRate),
          lockTaxOnLabor: Boolean(dbSettings.lockTaxOnLabor),
          allowInvoiceTypeChange: Boolean(dbSettings.allowInvoiceTypeChange),
          lockPaymentType: Boolean(dbSettings.lockPaymentType),
          warnDeleteLine: Boolean(dbSettings.warnDeleteLine),
          warnDeleteInvoice: Boolean(dbSettings.warnDeleteInvoice),
          requireOunceTaskir: Boolean(dbSettings.requireOunceTaskir),
          requireKarat: Boolean(dbSettings.requireKarat),
          warnDuplicateRef: Boolean(dbSettings.warnDuplicateRef)
        };
        // Also update window.invoiceSettings for immediate access
        window.invoiceSettings = { ...currentSettings };
      } else {
        currentSettings = { ...defaultSettings };
        window.invoiceSettings = { ...defaultSettings };
      }

      applySettingsToForm();
      updateFormulaPreview();
    } catch (error) {
      currentSettings = { ...defaultSettings };
      window.invoiceSettings = { ...defaultSettings };
      applySettingsToForm();
      updateFormulaPreview();
    }
  }

  // Apply settings to form
  function applySettingsToForm() {
    // Check if form elements exist
    if (!document.getElementById('taxEnabled')) {
      // Form not ready yet
      return;
    }

    // Tax settings
    setCheckbox('taxEnabled', currentSettings.taxEnabled);
    setValue('taxRate', currentSettings.taxRate);
    setCheckbox('taxOnLabor', currentSettings.taxOnLabor);
    setRadio('defaultInvoiceType', currentSettings.defaultInvoiceType);
    setCheckbox('lockTaxRate', currentSettings.lockTaxRate);
    setCheckbox('lockTaxOnLabor', currentSettings.lockTaxOnLabor);
    setCheckbox('allowInvoiceTypeChange', currentSettings.allowInvoiceTypeChange);

    // Ounce calculation settings
    setValue('ounceCalculationType', currentSettings.ounceCalculationType);
    setValue('conversionFactor', currentSettings.conversionFactor);
    setValue('exchangeRate', currentSettings.exchangeRate);
    setValue('goldMultiplier', currentSettings.goldMultiplier || 0.12056);
    setValue('gold2Multiplier', currentSettings.gold2Multiplier || 0.120555);
    setValue('customMultiplier', currentSettings.customMultiplier || 1);
    handleCalculationTypeChange();

    // Payment settings
    setRadio('defaultPaymentType', currentSettings.defaultPaymentType);
    setCheckbox('lockPaymentType', currentSettings.lockPaymentType);

    // Validation settings
    setCheckbox('warnDeleteLine', currentSettings.warnDeleteLine);
    setCheckbox('warnDeleteInvoice', currentSettings.warnDeleteInvoice);
    setCheckbox('requireOunceTaskir', currentSettings.requireOunceTaskir);
    setCheckbox('requireKarat', currentSettings.requireKarat);
    setCheckbox('warnDuplicateRef', currentSettings.warnDuplicateRef);
  }

  // Helper functions
  function setCheckbox(id, value) {
    const checkbox = document.getElementById(id);
    if (checkbox) {
      checkbox.checked = Boolean(value);
    }
  }

  function setValue(id, value) {
    const input = document.getElementById(id);
    if (input) {
      input.value = value;
    }
  }

  function setRadio(name, value) {
    const radio = document.querySelector(`input[name="${name}"][value="${value}"]`);
    if (radio) {
      radio.checked = true;
    }
  }

  function getCheckbox(id) {
    const checkbox = document.getElementById(id);
    return checkbox ? checkbox.checked : false;
  }

  function getValue(id) {
    const input = document.getElementById(id);
    return input ? input.value : '';
  }

  function getRadio(name) {
    const radio = document.querySelector(`input[name="${name}"]:checked`);
    return radio ? radio.value : '';
  }

  // Handle calculation type change
  function handleCalculationTypeChange() {
    const calcType = getValue('ounceCalculationType');
    const conversionRow = document.getElementById('conversionFactorRow');
    const exchangeRow = document.getElementById('exchangeRateRow');
    const goldRow = document.getElementById('goldMultiplierRow');
    const gold2Row = document.getElementById('gold2MultiplierRow');
    const customRow = document.getElementById('customMultiplierRow');

    // Hide all rows first
    if (conversionRow) conversionRow.style.display = 'none';
    if (exchangeRow) exchangeRow.style.display = 'none';
    if (goldRow) goldRow.style.display = 'none';
    if (gold2Row) gold2Row.style.display = 'none';
    if (customRow) customRow.style.display = 'none';

    // Show relevant rows based on type
    if (calcType === 'default') {
      if (conversionRow) conversionRow.style.display = '';
      if (exchangeRow) exchangeRow.style.display = '';
    } else if (calcType === 'gold') {
      if (goldRow) goldRow.style.display = '';
    } else if (calcType === 'gold2') {
      if (gold2Row) gold2Row.style.display = '';
    } else if (calcType === 'custom') {
      if (customRow) customRow.style.display = '';
    }
    // manual type shows nothing

    updateFormulaPreview();
  }

  // Update formula preview
  function updateFormulaPreview() {
    const calcType = getValue('ounceCalculationType');
    const conversionFactor = parseFloat(getValue('conversionFactor')) || 31.1035;
    const exchangeRate = parseFloat(getValue('exchangeRate')) || 3.75;
    const goldMultiplier = parseFloat(getValue('goldMultiplier')) || 0.12056;
    const gold2Multiplier = parseFloat(getValue('gold2Multiplier')) || 0.120555;
    const customMultiplier = parseFloat(getValue('customMultiplier')) || 1;

    const formulaEl = document.getElementById('formulaPreview');
    const exampleResultEl = document.getElementById('exampleResult');

    let formula = '';
    let exampleResult = 0;
    const exampleOunce = 5000; // Changed to 5000 as per user example

    if (calcType === 'default') {
      formula = `سعر الجرام = الأونصة ÷ ${conversionFactor} × ${exchangeRate}`;
      exampleResult = (exampleOunce / conversionFactor) * exchangeRate;
    } else if (calcType === 'gold') {
      formula = `سعر الجرام = الأونصة × ${goldMultiplier}`;
      exampleResult = exampleOunce * goldMultiplier;
    } else if (calcType === 'gold2') {
      formula = `سعر الجرام = الأونصة × ${gold2Multiplier}`;
      exampleResult = exampleOunce * gold2Multiplier;
    } else if (calcType === 'custom') {
      formula = `سعر الجرام = الأونصة × ${customMultiplier}`;
      exampleResult = exampleOunce * customMultiplier;
    } else if (calcType === 'manual') {
      formula = 'إدخال يدوي (بدون حساب تلقائي)';
      exampleResult = 0;
    }

    if (formulaEl) {
      formulaEl.textContent = formula;
    }

    if (exampleResultEl) {
      exampleResultEl.textContent = calcType === 'manual' ? '-' : exampleResult.toFixed(3);
    }
  }

  // Save settings
  async function saveSettings() {
    const saveBtn = document.getElementById('saveInvoiceSettings');
    
    try {
      const api = getInvoiceSettingsAPI();
      if (!api || !api.saveInvoiceSettings) {
        if (window.showToast) {
          window.showToast('فشل حفظ الإعدادات - النظام غير جاهز', 'err');
        } else if (window.showAlert) {
          await window.showAlert('فشل حفظ الإعدادات - النظام غير جاهز', 'خطأ', 'error');
        }
        return;
      }

      // Add loading state
      if (saveBtn) {
        saveBtn.classList.add('loading');
        saveBtn.disabled = true;
        const icon = saveBtn.querySelector('i');
        if (icon) {
          icon.className = 'fas fa-spinner';
        }
      }
      
      // Collect settings from form
      const settings = {
        // Tax settings
        taxEnabled: getCheckbox('taxEnabled') ? 1 : 0,
        taxRate: parseFloat(getValue('taxRate')) || 15,
        taxOnLabor: getCheckbox('taxOnLabor') ? 1 : 0,
        defaultInvoiceType: getRadio('defaultInvoiceType'),
        lockTaxRate: getCheckbox('lockTaxRate') ? 1 : 0,
        lockTaxOnLabor: getCheckbox('lockTaxOnLabor') ? 1 : 0,
        allowInvoiceTypeChange: getCheckbox('allowInvoiceTypeChange') ? 1 : 0,

        // Ounce calculation settings
        ounceCalculationType: getValue('ounceCalculationType'),
        conversionFactor: parseFloat(getValue('conversionFactor')) || 31.1035,
        exchangeRate: parseFloat(getValue('exchangeRate')) || 3.75,
        goldMultiplier: parseFloat(getValue('goldMultiplier')) || 0.12056,
        gold2Multiplier: parseFloat(getValue('gold2Multiplier')) || 0.120555,
        customMultiplier: parseFloat(getValue('customMultiplier')) || 1,

        // Payment settings
        defaultPaymentType: getRadio('defaultPaymentType'),
        lockPaymentType: getCheckbox('lockPaymentType') ? 1 : 0,

        // Validation settings
        warnDeleteLine: getCheckbox('warnDeleteLine') ? 1 : 0,
        warnDeleteInvoice: getCheckbox('warnDeleteInvoice') ? 1 : 0,
        requireOunceTaskir: getCheckbox('requireOunceTaskir') ? 1 : 0,
        requireKarat: getCheckbox('requireKarat') ? 1 : 0,
        warnDuplicateRef: getCheckbox('warnDuplicateRef') ? 1 : 0
      };

      const result = await api.saveInvoiceSettings(settings);
      if (!result || !result.success) {
        throw new Error(result?.error || 'SAVE_FAILED');
      }

      // Show success message
      if (window.showToast) {
        window.showToast('تم حفظ الإعدادات بنجاح', 'ok');
      } else if (window.showAlert) {
        await window.showAlert('تم حفظ الإعدادات بنجاح', 'نجاح', 'success');
      }

      // Update currentSettings with saved values
      currentSettings = { ...settings };
      
      // Store in window for immediate access
      window.invoiceSettings = { ...settings };
      
      // Reload settings from database to verify
      await loadSettings();

    } catch (error) {
      if (window.showToast) {
        window.showToast('فشل حفظ الإعدادات', 'err');
      } else if (window.showAlert) {
        await window.showAlert('فشل حفظ الإعدادات', 'خطأ', 'error');
      }
    } finally {
      // Remove loading state
      if (saveBtn) {
        saveBtn.classList.remove('loading');
        saveBtn.disabled = false;
        const icon = saveBtn.querySelector('i');
        if (icon) {
          icon.className = 'fas fa-save';
        }
      }
    }
  }

  // Reset to default
  async function resetToDefault() {
    const confirmed = await window.showConfirm(
      'هل أنت متأكد من إعادة تعيين جميع الإعدادات للقيم الافتراضية؟',
      'تأكيد إعادة التعيين'
    );
    
    if (confirmed) {
      currentSettings = { ...defaultSettings };
      applySettingsToForm();
      updateFormulaPreview();
    }
  }

  // Load settings on page load (for use in invoices)
  async function loadSettingsForInvoice() {
    try {
      const api = getInvoiceSettingsAPI();
      if (!api || !api.getInvoiceSettings) {
        window.invoiceSettings = { ...defaultSettings };
        return window.invoiceSettings;
      }

      const result = await api.getInvoiceSettings();

      if (result && result.success && result.data) {
        window.invoiceSettings = result.data;
      } else {
        window.invoiceSettings = { ...defaultSettings };
      }

      return window.invoiceSettings;
    } catch (error) {
      window.invoiceSettings = { ...defaultSettings };
      return window.invoiceSettings;
    }
  }

  // Export functions
  window.InvoiceSettingsManager = {
    init,
    loadSettings: loadSettingsForInvoice,
    reloadCard: loadSettings,
    getSettings: () => window.invoiceSettings || defaultSettings
  };

})();

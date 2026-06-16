// Quick Statement Screen Logic
(async function() {
  'use strict';

  // ===== Translation System =====
  const QS_TRANSLATIONS = {
    ar: {
      quickStatement: {
        title: "كشف حساب سريع",
        subtitle: "عرض أرصدة الحسابات حسب العيارات",
        filters: {
          type: "النوع",
          number: "الرقم",
          name: "الاسم",
          namePlaceholder: "اسم العميل/المورد/الحساب",
          dateFrom: "من تاريخ",
          dateTo: "إلى تاريخ",
          openingBalance: "رصيد افتتاحي",
          goldBasis: "عيار رصيد الذهب",
          silverBasis: "عيار رصيد الفضة",
          yes: "نعم",
          no: "لا",
          pure: "صافي",
          view: "عرض"
        },
        types: {
          customer: "عميل",
          supplier: "مورد",
          account: "حساب"
        },
        summary: {
          goldTotal: "إجمالي الذهب",
          silverTotal: "إجمالي الفضة",
          cashBalance: "رصيد الريال",
          gram: "جم",
          karat: "عيار",
          riyal: "ريال"
        },
        tables: {
          gold: "الذهب",
          silver: "الفضة",
          karat: "العيار",
          debit: "مدين",
          credit: "دائن",
          net: "صافي",
          noGoldMovement: "لا توجد حركة ذهب",
          noSilverMovement: "لا توجد حركة فضة"
        },
        lookup: {
          search: "بحث",
          searchCustomer: "بحث عميل",
          searchSupplier: "بحث مورد",
          searchAccount: "بحث حساب",
          searchPlaceholder: "اكتب رقم أو اسم للبحث...",
          noResults: "لا توجد نتائج",
          cancel: "إلغاء",
          close: "إغلاق"
        }
      }
    },
    en: {
      quickStatement: {
        title: "Quick Statement",
        subtitle: "View account balances by karat",
        filters: {
          type: "Type",
          number: "Number",
          name: "Name",
          namePlaceholder: "Customer/Supplier/Account name",
          dateFrom: "From Date",
          dateTo: "To Date",
          openingBalance: "Opening Balance",
          goldBasis: "Gold Balance Karat",
          silverBasis: "Silver Balance Karat",
          yes: "Yes",
          no: "No",
          pure: "Pure",
          view: "View"
        },
        types: {
          customer: "Customer",
          supplier: "Supplier",
          account: "Account"
        },
        summary: {
          goldTotal: "Total Gold",
          silverTotal: "Total Silver",
          cashBalance: "Cash Balance",
          gram: "g",
          karat: "Karat",
          riyal: "SAR"
        },
        tables: {
          gold: "Gold",
          silver: "Silver",
          karat: "Karat",
          debit: "Debit",
          credit: "Credit",
          net: "Net",
          noGoldMovement: "No gold movement",
          noSilverMovement: "No silver movement"
        },
        lookup: {
          search: "Search",
          searchCustomer: "Search Customer",
          searchSupplier: "Search Supplier",
          searchAccount: "Search Account",
          searchPlaceholder: "Type number or name to search...",
          noResults: "No results found",
          cancel: "Cancel",
          close: "Close"
        }
      }
    }
  };
  let currentLang = 'ar';

  function getQSLang() {
    // Use same method as other screens - localStorage uiLang
    return localStorage.getItem('uiLang') || 'ar';
  }

  function tQS(key, params = {}) {
    const lang = currentLang;
    const keys = key.split('.');
    let val = QS_TRANSLATIONS[lang];
    for (const k of keys) {
      val = val?.[k];
      if (val === undefined) break;
    }
    if (typeof val !== 'string') {
      // Fallback to Arabic
      val = QS_TRANSLATIONS.ar;
      for (const k of keys) {
        val = val?.[k];
        if (val === undefined) break;
      }
    }
    if (typeof val !== 'string') return key;
    // Replace {param} placeholders
    for (const [k, v] of Object.entries(params)) {
      val = val.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
    }
    return val;
  }

  function applyTranslations() {
    currentLang = getQSLang();
    const isRTL = currentLang === 'ar';
    document.documentElement.lang = currentLang;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';

    // Apply data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = tQS(key);
      if (text && text !== key) {
        el.textContent = text;
      }
    });

    // Apply data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const text = tQS(key);
      if (text && text !== key) el.placeholder = text;
    });

    // Apply data-i18n-aria
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      const text = tQS(key);
      if (text && text !== key) el.setAttribute('aria-label', text);
    });

    // Update page title
    document.title = tQS('quickStatement.title');
  }

  // Apply translations on load
  applyTranslations();

  // Listen for language changes
  window.addEventListener('storage', (e) => {
    if (e.key === 'uiLang') {
      applyTranslations();
    }
  });

  // Also listen for custom language change event
  window.addEventListener('languageChanged', () => {
    applyTranslations();
  });

  // Initialize screen permissions
  if (window.ScreenPermissions) {
    await window.ScreenPermissions.init();
  }

  // Number formatter
  const fmt2 = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // DOM Elements
  const typeSelect = document.getElementById('q_type');
  const refIdInput = document.getElementById('q_ref_id');
  const entityNameDisplay = document.getElementById('q_entity_name');
  const fromInput = document.getElementById('q_from');
  const toInput = document.getElementById('q_to');
  const includeOpeningSelect = document.getElementById('q_include_opening');
  const goldBasisSelect = document.getElementById('q_gold_basis');
  const silverBasisSelect = document.getElementById('q_silver_basis');
  const viewBtn = document.getElementById('q_view_btn');
  const resultsContainer = document.getElementById('results_container');

  // Lookup Modal Elements
  const lookupModal = document.getElementById('lookupModal');
  const lookupTitle = document.getElementById('lookupTitle');
  const lookupClose = document.getElementById('lookupClose');
  const lookupCancel = document.getElementById('lookupCancel');
  const lookupSearch = document.getElementById('lookupSearch');
  const lookupBody = document.getElementById('lookupBody');
  const lookupTabs = document.querySelectorAll('.lookup-tab');

  // Data cache
  let customersCache = [];
  let suppliersCache = [];
  let accountsCache = [];
  let currentLookupType = 'customer';
  let currentLookupRows = [];

  // ===== Conversion Functions =====
  function goldToBasis(grams, karat, basis) {
    const k = Number(karat) || 0;
    const b = Number(basis) || 24;
    return (Number(grams) || 0) * (k / b);
  }

  function silverToBasis(grams, karat, basis) {
    const k = Number(karat) || 0;
    const b = Number(basis) || 999;
    return (Number(grams) || 0) * (k / b);
  }

  // ===== Load Entity Data =====
  async function loadCustomers() {
    try {
      const options = { forceFresh: true };
      let r = null;
      if (window.db?.getCustomers) {
        r = await window.db.getCustomers(options);
      } else if (window.api?.getCustomers) {
        r = await window.api.getCustomers(options);
      } else if (window.api?.invoke) {
        r = await window.api.invoke('get-customers', options);
      }
      customersCache = (r && r.success && Array.isArray(r.data)) ? r.data : [];
    } catch (_) { customersCache = []; }
  }

  async function loadSuppliers() {
    try {
      const options = { forceFresh: true };
      let r = null;
      if (window.suppliers?.getSuppliers) {
        r = await window.suppliers.getSuppliers(options);
      } else if (window.api?.getSuppliers) {
        r = await window.api.getSuppliers(options);
      } else if (window.api?.invoke) {
        r = await window.api.invoke('get-suppliers', options);
      }
      suppliersCache = (r && r.success && Array.isArray(r.data)) ? r.data : [];
    } catch (_) { suppliersCache = []; }
  }

  async function loadAccounts() {
    try {
      const options = { forceFresh: true };
      let r = null;
      if (window.accounts?.getAccounts) {
        r = await window.accounts.getAccounts(options);
      } else if (window.api?.listAccounts) {
        r = await window.api.listAccounts(options);
      } else if (window.api?.invoke) {
        r = await window.api.invoke('get-accounts', options);
      }
      accountsCache = (r && r.success && Array.isArray(r.data)) ? r.data : [];
    } catch (_) { accountsCache = []; }
  }

  function getSelectableStatementAccounts(rows) {
    const allRows = Array.isArray(rows) ? rows.filter(Boolean) : [];
    const leafRows = allRows.filter(x => Number(x?.is_parent || 0) !== 1);
    if (!leafRows.length) return leafRows;

    const excludedRootCodes = new Set(['114', '211']);
    const excludedRootIds = allRows
      .filter(x => excludedRootCodes.has(String(x.code || '').trim()))
      .map(x => String(x.id));

    if (!excludedRootIds.length) return leafRows;

    const childrenByParent = new Map();
    for (const account of allRows) {
      const parentKey = account?.parent_id == null ? '' : String(account.parent_id);
      if (!childrenByParent.has(parentKey)) childrenByParent.set(parentKey, []);
      childrenByParent.get(parentKey).push(account);
    }

    const excludedIds = new Set(excludedRootIds);
    const queue = [...excludedRootIds];
    while (queue.length) {
      const parentId = String(queue.shift());
      const children = childrenByParent.get(parentId) || [];
      for (const child of children) {
        const childId = String(child?.id || '');
        if (!childId || excludedIds.has(childId)) continue;
        excludedIds.add(childId);
        queue.push(childId);
      }
    }

    return leafRows.filter(x => !excludedIds.has(String(x.id)));
  }

  // Initial data load
  const initialLookupLoadPromise = Promise.all([loadCustomers(), loadSuppliers(), loadAccounts()]).catch(() => []);

  async function ensureLookupData(type, forceFresh = false) {
    const entityType = type || 'customer';
    if (entityType === 'customer') {
      if (forceFresh || !customersCache.length) await loadCustomers();
      return customersCache;
    }
    if (entityType === 'supplier') {
      if (forceFresh || !suppliersCache.length) await loadSuppliers();
      return suppliersCache;
    }
    if (forceFresh || !accountsCache.length) await loadAccounts();
    return getSelectableStatementAccounts(accountsCache);
  }

  function hasLookupCache(type) {
    if (type === 'customer') return customersCache.length > 0;
    if (type === 'supplier') return suppliersCache.length > 0;
    return accountsCache.length > 0;
  }

  function getEntityMatch(type, refId) {
    const id = String(refId).trim();
    if (!id) return null;

    if (type === 'customer') return customersCache.find(x => String(x.id) === id) || null;
    if (type === 'supplier') return suppliersCache.find(x => String(x.id) === id) || null;

    const selectableAccounts = getSelectableStatementAccounts(accountsCache);
    return selectableAccounts.find(x => String(x.code) === id || String(x.id) === id)
      || accountsCache.find(x => String(x.code) === id || String(x.id) === id)
      || null;
  }

  function getEntityLabel(entity) {
    return entity ? (entity.name || entity.full_name || entity.company || '') : '';
  }

  let entityResolveToken = 0;
  async function syncEntityNameFromInput(options = {}) {
    const { forceFresh = false } = options;
    const type = typeSelect?.value || 'customer';
    const refId = (refIdInput?.value || '').trim();
    const token = ++entityResolveToken;

    if (!refId) {
      if (entityNameDisplay) entityNameDisplay.value = '';
      if (refIdInput?.dataset?.realId) delete refIdInput.dataset.realId;
      return null;
    }

    let entity = getEntityMatch(type, refId);

    if (!entity && !hasLookupCache(type)) {
      try {
        await initialLookupLoadPromise;
      } catch (_) { }
      entity = getEntityMatch(type, refId);
    }

    if (!entity && (forceFresh || !hasLookupCache(type))) {
      await ensureLookupData(type, true);
      entity = getEntityMatch(type, refId);
    }

    if (token !== entityResolveToken) return entity;

    if (entityNameDisplay) entityNameDisplay.value = getEntityLabel(entity);
    if (refIdInput) {
      if (entity?.id != null && entity.id !== '') {
        refIdInput.dataset.realId = String(entity.id);
      } else if (refIdInput.dataset.realId) {
        delete refIdInput.dataset.realId;
      }
    }

    return entity;
  }

  // ===== Get Entity Name =====
  function getEntityName(type, refId) {
    return getEntityLabel(getEntityMatch(type, refId));
  }

  // Update entity name display on input change
  refIdInput?.addEventListener('input', () => {
    // مسح realId عند الإدخال اليدوي لأن المستخدم يُدخل رقم جديد
    if (refIdInput.dataset.realId) {
      delete refIdInput.dataset.realId;
    }
    void syncEntityNameFromInput();
  });

  refIdInput?.addEventListener('blur', () => {
    void syncEntityNameFromInput({ forceFresh: true });
  });

  typeSelect?.addEventListener('change', () => {
    if (entityNameDisplay) entityNameDisplay.value = '';
    if (refIdInput) refIdInput.value = '';
    if (refIdInput?.dataset?.realId) delete refIdInput.dataset.realId;
  });

  // ===== Lookup Modal Functions =====
  async function openLookup(type) {
    currentLookupType = type || 'customer';
    
    // Update tabs
    lookupTabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.type === currentLookupType);
    });

    // Update title
    const titleKeys = { 
      customer: 'quickStatement.lookup.searchCustomer', 
      supplier: 'quickStatement.lookup.searchSupplier', 
      account: 'quickStatement.lookup.searchAccount' 
    };
    if (lookupTitle) lookupTitle.innerHTML = `<i class="fa-solid fa-search"></i> ${tQS(titleKeys[currentLookupType]) || tQS('quickStatement.lookup.search')}`;

    currentLookupRows = await ensureLookupData(currentLookupType, true);

    renderLookupRows(currentLookupRows);
    
    if (lookupSearch) {
      lookupSearch.value = '';
      setTimeout(() => lookupSearch.focus(), 100);
    }
    
    if (lookupModal) lookupModal.setAttribute('aria-hidden', 'false');
  }

  function closeLookup() {
    if (lookupModal) lookupModal.setAttribute('aria-hidden', 'true');
  }

  function renderLookupRows(rows) {
    if (!lookupBody) return;
    lookupBody.innerHTML = '';

    const data = Array.isArray(rows) ? rows : [];
    const isAccount = currentLookupType === 'account';

    if (!data.length) {
      lookupBody.innerHTML = `<tr><td colspan="2" style="text-align:center; padding:20px; color:var(--text-muted)">${tQS('quickStatement.lookup.noResults')}</td></tr>`;
      return;
    }

    for (const x of data) {
      const displayId = isAccount ? (x.code || x.id) : x.id;
      const name = x.name || x.full_name || x.company || '';
      const tr = document.createElement('tr');
      tr.tabIndex = 0;
      tr.innerHTML = `<td>${displayId}</td><td>${name}</td>`;
      tr.dataset.id = x.id;
      tr.dataset.code = x.code || '';
      tr.dataset.name = name;

      tr.addEventListener('click', () => selectLookupRow(tr, isAccount));
      tr.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') selectLookupRow(tr, isAccount);
      });

      lookupBody.appendChild(tr);
    }
  }

  function selectLookupRow(tr, isAccount) {
    const valueId = isAccount ? tr.dataset.code : tr.dataset.id;
    const name = tr.dataset.name;

    if (refIdInput) {
      refIdInput.value = valueId;
      refIdInput.dataset.realId = tr.dataset.id;
    }
    if (entityNameDisplay) entityNameDisplay.value = name;

    // Update type select to match lookup type
    if (typeSelect) typeSelect.value = currentLookupType;

    closeLookup();
    setTimeout(() => refIdInput?.focus(), 100);
  }

  // Lookup event listeners
  lookupClose?.addEventListener('click', closeLookup);
  lookupCancel?.addEventListener('click', closeLookup);
  lookupModal?.querySelector('.modal-backdrop')?.addEventListener('click', closeLookup);

  lookupSearch?.addEventListener('input', (e) => {
    const q = (e.target.value || '').toLowerCase().trim();
    if (!q) {
      renderLookupRows(currentLookupRows);
      return;
    }
    const filtered = currentLookupRows.filter(x =>
      String(x.id).includes(q) ||
      String(x.code || '').includes(q) ||
      String(x.name || x.full_name || x.company || '').toLowerCase().includes(q)
    );
    renderLookupRows(filtered);
  });

  // Lookup tabs click
  lookupTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const type = tab.dataset.type;
      void openLookup(type);
    });
  });

  // F9 Key Handler
  function handleF9(e) {
    if (e.key === 'F9') {
      e.preventDefault();
      e.stopPropagation();
      void openLookup(typeSelect?.value || 'customer');
    }
  }

  // Right-click Handler
  function handleRightClick(e) {
    e.preventDefault();
    void openLookup(typeSelect?.value || 'customer');
  }

  // Enter to view
  function handleEnterToView(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (refIdInput?.value?.trim()) {
        fetchQuickStatement();
      } else {
        void openLookup(typeSelect?.value || 'customer');
      }
    }
  }

  refIdInput?.addEventListener('keydown', handleF9);
  refIdInput?.addEventListener('keydown', handleEnterToView);
  refIdInput?.addEventListener('contextmenu', handleRightClick);

  if (refIdInput?.value?.trim()) {
    void syncEntityNameFromInput({ forceFresh: true });
  }

  // Global F9 capture
  document.addEventListener('keydown', (e) => {
    if (e.key === 'F9') {
      e.preventDefault();
      e.stopPropagation();
      void openLookup(typeSelect?.value || 'customer');
    }
  }, true);

  // ===== Fetch Quick Statement =====
  async function fetchQuickStatement() {
    // Permission check
    if (window.ScreenPermissions && !window.ScreenPermissions.check('reports_view_quick_statement', 'عرض كشف حساب سريع')) {
      return;
    }

    const type = typeSelect?.value || 'customer';
    let refId = (refIdInput?.value || '').trim();
    const from = fromInput?.value || null;
    const to = toInput?.value || null;
    const includeOpening = (includeOpeningSelect?.value || '1') === '1';
    const goldBasis = goldBasisSelect?.value || '24';
    const silverBasis = silverBasisSelect?.value || '999';

    if (!refId) {
      refIdInput?.focus();
      return;
    }

    await syncEntityNameFromInput({ forceFresh: true });

    // For accounts: convert code to id
    let idNum = Number(refId) || 0;
    if (type === 'account') {
      // First try realId from lookup
      if (refIdInput?.dataset?.realId) {
        idNum = Number(refIdInput.dataset.realId) || 0;
      } else {
        // Try to find by code in cache first
        const acc = accountsCache.find(x => String(x.code) === refId || String(x.id) === refId);
        if (acc) {
          idNum = Number(acc.id) || 0;
        } else {
          // Try to find by code via API
          try {
            const r = await window.accounts?.getAccountByCode?.(refId);
            if (r && r.success && r.data && r.data.id) {
              idNum = Number(r.data.id) || 0;
            }
          } catch (_) { }
        }
      }
    } else if (type === 'customer') {
      // للعملاء: ابحث في الكاش أولاً
      if (!refIdInput?.dataset?.realId) {
        const cust = customersCache.find(x => String(x.id) === refId);
        if (cust) idNum = Number(cust.id) || 0;
      } else {
        idNum = Number(refIdInput.dataset.realId) || 0;
      }
    } else if (type === 'supplier') {
      // للموردين: ابحث في الكاش أولاً
      if (!refIdInput?.dataset?.realId) {
        const supp = suppliersCache.find(x => String(x.id) === refId);
        if (supp) idNum = Number(supp.id) || 0;
      } else {
        idNum = Number(refIdInput.dataset.realId) || 0;
      }
    }

    if (!idNum) idNum = Number(refId) || 0;

    // Call IPC
    const params = { type, id: idNum, from, to, include_opening: includeOpening };
    
    try {
      const res = await window.api.invoke('reports:get-quick-statement', params);
      
      if (!res.success) {
        return;
      }

      renderResults(res.data, goldBasis, silverBasis);
    } catch (err) {
      // Error fetching quick statement
    }
  }

  // ===== Render Results =====
  function renderResults(data, goldBasis, silverBasis) {
    if (!data) return;

    const gold = data.gold || {};
    const silver = data.silver || {};
    const cash = data.cash || { debit: 0, credit: 0 };

    // Gold Table
    const goldBody = document.querySelector('#goldTable tbody');
    if (goldBody) {
      goldBody.innerHTML = '';
      let goldTotalBasis = 0;

      const goldKarats = Object.keys(gold).sort((a, b) => Number(a) - Number(b));
      
      if (goldKarats.length === 0) {
        goldBody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--text-muted); padding:16px">${tQS('quickStatement.tables.noGoldMovement')}</td></tr>`;
      } else {
        for (const k of goldKarats) {
          const row = gold[k] || { debit: 0, credit: 0 };
          const net = Number(row.debit || 0) - Number(row.credit || 0);
          goldTotalBasis += goldToBasis(net, Number(k || 0), Number(goldBasis));

          const tr = document.createElement('tr');
          // سالب = أخضر (للعميل)، موجب = أحمر (عند العميل)
          const netClass = net < 0 ? 'color:#10b981' : (net > 0 ? 'color:#ef4444' : '');
          tr.innerHTML = `
            <td><strong>${k}</strong></td>
            <td>${fmt2.format(row.debit || 0)}</td>
            <td>${fmt2.format(row.credit || 0)}</td>
            <td style="${netClass}; font-weight:600">${fmt2.format(net)}</td>
          `;
          goldBody.appendChild(tr);
        }
      }

      // Update gold summary
      const goldTotalEl = document.getElementById('goldTotalValue');
      if (goldTotalEl) {
        // سالب = أخضر (للعميل)، موجب = أحمر (عند العميل)
        const totalClass = goldTotalBasis < 0 ? 'color:#10b981' : (goldTotalBasis > 0 ? 'color:#ef4444' : '');
        goldTotalEl.innerHTML = `<span style="${totalClass}">${fmt2.format(goldTotalBasis)}</span> ${tQS('quickStatement.summary.gram')} (${tQS('quickStatement.summary.karat')} ${goldBasis})`;
      }
    }

    // Silver Table
    const silverBody = document.querySelector('#silverTable tbody');
    if (silverBody) {
      silverBody.innerHTML = '';
      let silverTotalBasis = 0;

      const silverKarats = Object.keys(silver).sort((a, b) => Number(a) - Number(b));
      
      if (silverKarats.length === 0) {
        silverBody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--text-muted); padding:16px">${tQS('quickStatement.tables.noSilverMovement')}</td></tr>`;
      } else {
        for (const k of silverKarats) {
          const row = silver[k] || { debit: 0, credit: 0 };
          const net = Number(row.debit || 0) - Number(row.credit || 0);
          silverTotalBasis += silverToBasis(net, Number(k || 0), Number(silverBasis));

          const tr = document.createElement('tr');
          // سالب = أخضر (للعميل)، موجب = أحمر (عند العميل)
          const netClass = net < 0 ? 'color:#10b981' : (net > 0 ? 'color:#ef4444' : '');
          tr.innerHTML = `
            <td><strong>${k}</strong></td>
            <td>${fmt2.format(row.debit || 0)}</td>
            <td>${fmt2.format(row.credit || 0)}</td>
            <td style="${netClass}; font-weight:600">${fmt2.format(net)}</td>
          `;
          silverBody.appendChild(tr);
        }
      }

      // Update silver summary
      const silverTotalEl = document.getElementById('silverTotalValue');
      if (silverTotalEl) {
        // سالب = أخضر (للعميل)، موجب = أحمر (عند العميل)
        const totalClass = silverTotalBasis < 0 ? 'color:#10b981' : (silverTotalBasis > 0 ? 'color:#ef4444' : '');
        silverTotalEl.innerHTML = `<span style="${totalClass}">${fmt2.format(silverTotalBasis)}</span> ${tQS('quickStatement.summary.gram')} (${tQS('quickStatement.summary.karat')} ${silverBasis})`;
      }
    }

    // Cash Summary
    const cashNet = Number(cash.debit || 0) - Number(cash.credit || 0);
    const cashTotalEl = document.getElementById('cashTotalValue');
    if (cashTotalEl) {
      // سالب = أخضر (للعميل)، موجب = أحمر (عند العميل)
      const totalClass = cashNet < 0 ? 'color:#10b981' : (cashNet > 0 ? 'color:#ef4444' : '');
      cashTotalEl.innerHTML = `<span style="${totalClass}">${fmt2.format(cashNet)}</span> ${tQS('quickStatement.summary.riyal')}`;
    }

    // Show results container
    if (resultsContainer) resultsContainer.style.display = '';
  }

  // View button click
  viewBtn?.addEventListener('click', fetchQuickStatement);

  // Initialize screen permissions
  if (window.ScreenPermissions) {
    await window.ScreenPermissions.init();
  }

  // ===== استقبال المعلومات من شاشات أخرى =====
  // التحقق من وجود معلومات تم تمريرها من شاشة أخرى
  const checkParams = () => {
    // البحث في النافذة الحالية أو النافذة الأم
    let params = window.screenParams;
    if (!params && window.parent && window.parent !== window) {
      params = window.parent.screenParams;
    }
    
    if (params) {
      console.log('Quick Statement received params:', params);
      
      if (params.entityType && params.refId) {
        // تعيين نوع الكيان
        if (typeSelect) {
          typeSelect.value = params.entityType;
        }
        
        // تعيين رقم الكيان
        if (refIdInput) {
          refIdInput.value = params.refId;
          
          // تحميل اسم الكيان
          setTimeout(async () => {
            await loadEntityName(params.entityType, params.refId);
            
            // إذا كان autoLoad = true، قم بتحميل البيانات تلقائياً
            if (params.autoLoad && viewBtn) {
              viewBtn.click();
            }
          }, 100);
        }
      }
      
      // مسح المعلومات بعد الاستخدام
      if (window.screenParams) {
        window.screenParams = null;
      }
      if (window.parent && window.parent.screenParams) {
        window.parent.screenParams = null;
      }
    }
  };
  
  // التحقق من المعلومات عند تحميل الشاشة
  setTimeout(checkParams, 200);

  // دالة مساعدة لتحميل اسم الكيان
  async function loadEntityName(type, refId) {
    try {
      if (typeSelect) typeSelect.value = type;
      if (refIdInput) {
        refIdInput.value = String(refId ?? '');
        if (refIdInput.dataset.realId) delete refIdInput.dataset.realId;
      }
      await syncEntityNameFromInput({ forceFresh: true });
    } catch (err) {
      console.error('Error loading entity name:', err);
    }
  }

  window.refreshForBranchScopeChange = async function() {
    await Promise.all([loadCustomers(), loadSuppliers(), loadAccounts()]);
    const type = typeSelect?.value || 'customer';
    const refId = (refIdInput?.value || '').trim();
    const resolvedRefId = String(refIdInput?.dataset?.realId || refId || '').trim();
    if (entityNameDisplay) {
      entityNameDisplay.value = resolvedRefId ? (getEntityName(type, resolvedRefId) || '') : '';
    }
    if (resultsContainer && resultsContainer.style.display !== 'none' && refId) {
      await fetchQuickStatement();
    }
    return true;
  };

})();

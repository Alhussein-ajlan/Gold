// Screen-level Permissions Enforcement
// This script provides permission checking for screen operations

(function() {
  'use strict';

  let currentUser = null;
  let userPermissions = [];
  let userPermissionNames = new Set();
  let isAdmin = false;
  const PERMISSIONS_CACHE_TTL_MS = 30000; // 30s
  const currentScriptSrc = (() => {
    if (document.currentScript?.src) return document.currentScript.src;
    const script = Array.from(document.scripts || []).find((item) => /screen-permissions\.js(?:$|\?)/.test(item?.src || ''));
    return script?.src || '';
  })();
  const permissionDeniedModalJsSrc = currentScriptSrc ? new URL('./permission-denied-modal.js', currentScriptSrc).href : '';
  const permissionDeniedModalCssSrc = currentScriptSrc ? new URL('./permission-denied-modal.css', currentScriptSrc).href : '';
  let permissionDeniedModalLoadPromise = null;
  let permissionDeniedEscapeHandlerBound = false;
  const READ_ONLY_BRANCH_MESSAGE = 'صلاحيتك في الفرع الحالي للقراءة فقط، يمكنك العرض فقط دون إضافة أو تعديل أو حذف أي حركة';

  function getPermissionsCacheKey(userId) {
    return `screen_permissions_cache_${userId}`;
  }

  function loadPermissionsFromCache(userId) {
    try {
      const key = getPermissionsCacheKey(userId);
      const raw = localStorage.getItem(key);
      if (!raw) return null;

      const parsed = JSON.parse(raw);
      const age = Date.now() - Number(parsed?.timestamp || 0);
      if (!Array.isArray(parsed?.data) || age > PERMISSIONS_CACHE_TTL_MS) {
        localStorage.removeItem(key);
        return null;
      }

      return parsed.data;
    } catch (_) {
      return null;
    }
  }

  function savePermissionsToCache(userId, data) {
    try {
      const key = getPermissionsCacheKey(userId);
      localStorage.setItem(key, JSON.stringify({
        timestamp: Date.now(),
        data: Array.isArray(data) ? data : []
      }));
    } catch (_) {}
  }
  
  // Show permission denied modal using the shared modal component
  function ensurePermissionDeniedStyles() {
    if (!document.head || !permissionDeniedModalCssSrc) return;
    const existingStyle = document.querySelector('link[data-permission-denied-modal-style="true"], link[href*="permission-denied-modal.css"]');
    if (existingStyle) return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = permissionDeniedModalCssSrc;
    link.dataset.permissionDeniedModalStyle = 'true';
    document.head.appendChild(link);
  }

  function bindFallbackPermissionDeniedEvents(modal) {
    if (!modal) return;

    const closeModal = () => {
      modal.classList.remove('show');
      if (document.body) {
        document.body.style.overflow = '';
      }
    };

    const closeBtn = modal.querySelector('#permDeniedCloseBtn');
    const backdrop = modal.querySelector('.permission-denied-backdrop');

    if (closeBtn && !closeBtn.dataset.permissionDeniedBound) {
      closeBtn.addEventListener('click', closeModal);
      closeBtn.dataset.permissionDeniedBound = 'true';
    }

    if (backdrop && !backdrop.dataset.permissionDeniedBound) {
      backdrop.addEventListener('click', closeModal);
      backdrop.dataset.permissionDeniedBound = 'true';
    }

    if (!permissionDeniedEscapeHandlerBound) {
      document.addEventListener('keydown', (event) => {
        const activeModal = document.getElementById('permissionDeniedModal');
        if (event.key === 'Escape' && activeModal?.classList.contains('show')) {
          activeModal.classList.remove('show');
          if (document.body) {
            document.body.style.overflow = '';
          }
        }
      });
      permissionDeniedEscapeHandlerBound = true;
    }
  }

  function ensureFallbackPermissionDeniedModal() {
    let modal = document.getElementById('permissionDeniedModal');
    if (modal) {
      bindFallbackPermissionDeniedEvents(modal);
      return modal;
    }

    if (!document.body) {
      return null;
    }

    ensurePermissionDeniedStyles();

    const container = document.createElement('div');
    container.innerHTML = `
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

    modal = container.firstElementChild;
    document.body.appendChild(modal);
    bindFallbackPermissionDeniedEvents(modal);
    return modal;
  }

  function loadPermissionDeniedModalScript() {
    if (window.PermissionDeniedModal && typeof window.PermissionDeniedModal.show === 'function') {
      return Promise.resolve(true);
    }

    if (permissionDeniedModalLoadPromise) {
      return permissionDeniedModalLoadPromise;
    }

    ensurePermissionDeniedStyles();

    if (!permissionDeniedModalJsSrc) {
      return Promise.resolve(false);
    }

    const existingScript = Array.from(document.scripts || []).find((script) => (script?.src || '').includes('permission-denied-modal.js'));
    if (existingScript) {
      permissionDeniedModalLoadPromise = Promise.resolve(false);
      return permissionDeniedModalLoadPromise;
    }

    permissionDeniedModalLoadPromise = new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = permissionDeniedModalJsSrc;
      script.async = false;
      script.dataset.permissionDeniedModalScript = 'true';
      script.addEventListener('load', () => {
        resolve(Boolean(window.PermissionDeniedModal && typeof window.PermissionDeniedModal.show === 'function'));
      }, { once: true });
      script.addEventListener('error', () => {
        resolve(false);
      }, { once: true });

      if (document.head) {
        document.head.appendChild(script);
      } else {
        document.documentElement.appendChild(script);
      }
    });

    return permissionDeniedModalLoadPromise;
  }

  function showFallbackPermissionDeniedModal(message) {
    const normalizedMessage = typeof message === 'string' && message.trim()
      ? message.trim()
      : 'ليس لديك صلاحية لتنفيذ هذا الإجراء';

    const openModal = () => {
      const modal = ensureFallbackPermissionDeniedModal();
      if (!modal) {
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', () => {
            showFallbackPermissionDeniedModal(normalizedMessage);
          }, { once: true });
          return;
        }

        if (window.showAlert && typeof window.showAlert === 'function') {
          window.showAlert(normalizedMessage, 'ممنوع الوصول', 'error');
        }
        return;
      }

      const messageEl = document.getElementById('permDeniedMessage');
      if (messageEl) {
        messageEl.textContent = normalizedMessage;
      }

      modal.classList.add('show');
      if (document.body) {
        document.body.style.overflow = 'hidden';
      }

      const closeBtn = modal.querySelector('#permDeniedCloseBtn');
      window.setTimeout(() => closeBtn?.focus(), 0);
    };

    openModal();
    loadPermissionDeniedModalScript().catch(() => false);
  }

  function showPermissionDeniedModal(message) {
    const normalizedMessage = typeof message === 'string' && message.trim()
      ? message.trim()
      : 'ليس لديك صلاحية لتنفيذ هذا الإجراء';

    if (window.PermissionDeniedModal && typeof window.PermissionDeniedModal.show === 'function') {
      window.PermissionDeniedModal.show(normalizedMessage);
      return;
    }

    showFallbackPermissionDeniedModal(normalizedMessage);
  }

  function getStoredCurrentBranch() {
    try {
      const raw = localStorage.getItem('currentBranch');
      return raw ? JSON.parse(raw) : null;
    } catch (_) {
      return null;
    }
  }

  function getStoredCurrentBranchScope() {
    try {
      const raw = localStorage.getItem('branchScope');
      return raw ? JSON.parse(raw) : null;
    } catch (_) {
      return null;
    }
  }

  function getStoredCurrentUser() {
    try {
      const raw = localStorage.getItem('currentUser');
      return raw ? JSON.parse(raw) : null;
    } catch (_) {
      return null;
    }
  }

  function getCurrentBranchId() {
    const currentBranch = getStoredCurrentBranch();
    const branchScope = getStoredCurrentBranchScope();
    const storedUser = getStoredCurrentUser();
    return Number(branchScope?.branchId || currentBranch?.id || storedUser?.branch_id || storedUser?.login_branch_id || 0) || 0;
  }

  function getCurrentBranchAccessRecord() {
    const currentBranch = getStoredCurrentBranch();
    if (currentBranch && typeof currentBranch === 'object' && currentBranch.read_only !== undefined) {
      return currentBranch;
    }
    const storedUser = getStoredCurrentUser();
    const currentBranchId = getCurrentBranchId();
    if (!currentBranchId) {
      return storedUser || null;
    }
    const allowedBranches = Array.isArray(storedUser?.allowed_branches) ? storedUser.allowed_branches : [];
    return allowedBranches.find((branch) => Number(branch?.id || branch?.branch_id || 0) === currentBranchId) || storedUser || null;
  }

  function isCurrentBranchReadOnly() {
    const currentBranchAccess = getCurrentBranchAccessRecord();
    return Number(currentBranchAccess?.read_only ?? currentBranchAccess?.branch_read_only ?? 0) === 1;
  }

  function isMutationPermission(permissionName) {
    const normalizedName = typeof permissionName === 'string' ? permissionName.trim().toLowerCase() : '';
    if (!normalizedName) {
      return false;
    }
    return /(?:^|[._])(add|edit|delete|create|update|remove)$/.test(normalizedName);
  }

  function showReadOnlyBranchMessage(message = READ_ONLY_BRANCH_MESSAGE) {
    showPermissionDeniedModal(message);
    return false;
  }

  function handleBranchReadOnlyResponse(response = {}) {
    const message = typeof response?.error === 'string' && response.error.trim()
      ? response.error.trim()
      : READ_ONLY_BRANCH_MESSAGE;
    return showReadOnlyBranchMessage(message);
  }

  // Initialize permissions for current screen
  async function initScreenPermissions() {
    try {
      // Get current user from localStorage
      const userData = localStorage.getItem('currentUser');
      if (userData) {
        currentUser = JSON.parse(userData);
        isAdmin = currentUser.role === 'admin';

        // Fast path: use short-lived cache to avoid repeated cloud round trips
        const cachedPermissions = loadPermissionsFromCache(currentUser.id);
        if (cachedPermissions) {
          userPermissions = cachedPermissions;
          userPermissionNames = new Set(
            userPermissions
              .map(p => (p?.name || '').trim())
              .filter(Boolean)
          );
          return true;
        }

        // Load user permissions from API
        const getPermissionsAPI = () => {
          if (window.permissions) return window.permissions;
          if (window.parent?.permissions) return window.parent.permissions;
          if (window.top?.permissions) return window.top.permissions;
          return null;
        };

        const permsAPI = getPermissionsAPI();
        if (!permsAPI) {
          return false;
        }

        const permsResult = await permsAPI.getUserPermissions(currentUser.id);
        if (permsResult?.success) {
          userPermissions = permsResult.data || [];
          savePermissionsToCache(currentUser.id, userPermissions);
          userPermissionNames = new Set(
            userPermissions
              .map(p => (p?.name || '').trim())
              .filter(Boolean)
          );
          return true;
        }
      }

      return false;
    } catch (error) {
      return false;
    }
  }

  // Check if user has specific permission
  function hasPermission(permissionName) {
    const name = typeof permissionName === 'string' ? permissionName.trim() : '';
    if (!name) return false;

    const categories = [
      'sales_purchase_movement',
      'purchase_invoices',
      'sales_invoices',
      'customers',
      'suppliers',
      'accounts',
      'vouchers',
      'receipts',
      'journal',
      'opening',
      'movement',
      'orders',
      'reports',
      'branches',
      'users',
      'settings',
      'cloud_settings',
      'dashboard',
      'gold_items',
      'open_positions',
      'whatsapp_reports'
    ];

    const parsePermission = (perm) => {
      if (!perm || typeof perm !== 'string') return { category: null, action: null, format: null };
      const p = perm.trim();
      if (!p) return { category: null, action: null, format: null };

      if (p.includes('.')) {
        const parts = p.split('.');
        const category = parts[0] || null;
        const action = parts.slice(1).join('.') || null;
        return { category, action, format: 'dot' };
      }

      for (const cat of categories) {
        if (p.startsWith(cat + '_')) {
          return { category: cat, action: p.slice(cat.length + 1), format: 'underscore' };
        }
      }

      return { category: null, action: null, format: null };
    };

    const candidatesSet = new Set();
    const addCandidate = (cand) => {
      if (!cand || typeof cand !== 'string') return;
      const c = cand.trim();
      if (c) candidatesSet.add(c);
    };

    addCandidate(name);

    const parsed = parsePermission(name);
    if (parsed.category && parsed.action) {
      const cat = parsed.category;
      const action = parsed.action;

      if (parsed.format === 'dot') {
        addCandidate(`${cat}_${action.replace(/\./g, '_')}`);
      } else if (parsed.format === 'underscore') {
        addCandidate(`${cat}.${action}`);
      }

      if (action === 'create') {
        addCandidate(`${cat}.add`);
        addCandidate(`${cat}_add`);
      }
      if (action === 'add') {
        addCandidate(`${cat}.create`);
        addCandidate(`${cat}_create`);
      }

      if (cat === 'settings') {
        if (action === 'backup') {
          addCandidate('settings_restore');
          addCandidate('settings.restore');
        }
        if (action === 'restore') {
          addCandidate('settings_backup');
          addCandidate('settings.backup');
        }
      }

      if (cat === 'reports') {
        if (action === 'export') {
          addCandidate('reports_export');
          addCandidate('reports.export');
        }

        if (action === 'view') {
          addCandidate('reports_view_statement');
          addCandidate('reports_view_trial_balance');
          addCandidate('reports_view_income_statement');
          addCandidate('reports_view_balance_sheet');
        }

        if (action === 'account_statement' || action === 'customer_statement' || action === 'supplier_statement') {
          addCandidate('reports_view_statement');
          addCandidate('reports.view');
        }

        if (action.startsWith('view_')) {
          addCandidate('reports.view');
          if (action === 'view_statement') {
            addCandidate('reports.account_statement');
            addCandidate('reports.customer_statement');
            addCandidate('reports.supplier_statement');
          }
        }
      }
    }

    for (const cand of candidatesSet) {
      if (userPermissionNames.has(cand)) return true;
    }
    return false;
  }

  // Check and enforce permission before action
  function checkPermission(permissionName, actionName = 'هذا الإجراء') {
    if (isMutationPermission(permissionName) && isCurrentBranchReadOnly()) {
      return showReadOnlyBranchMessage();
    }

    if (hasPermission(permissionName)) {
      return true;
    }
    
    // Show beautiful modal
    showPermissionDeniedModal(`ليس لديك صلاحية ${actionName}`);

    return false;
  }

  // Hide element if no permission
  function hideIfNoPermission(elementOrId, permissionName) {
    const element = typeof elementOrId === 'string' 
      ? document.getElementById(elementOrId) 
      : elementOrId;

    if (!element) return;

    if (!hasPermission(permissionName)) {
      element.style.display = 'none';
      element.disabled = true;
    }
  }

  // Disable element if no permission
  function disableIfNoPermission(elementOrId, permissionName) {
    const element = typeof elementOrId === 'string' 
      ? document.getElementById(elementOrId) 
      : elementOrId;

    if (!element) return;

    if (!hasPermission(permissionName)) {
      element.disabled = true;
      element.style.opacity = '0.5';
      element.style.cursor = 'not-allowed';
      element.title = 'ليس لديك صلاحية لهذا الإجراء';
    }
  }

  // Apply permissions to action buttons
  function applyPermissionsToButtons(screenName) {
    const permissionsMap = {
      // Add button
      add: `${screenName}_add`,
      new: `${screenName}_add`,
      create: `${screenName}_add`,
      
      // Edit button
      edit: `${screenName}_edit`,
      update: `${screenName}_edit`,
      modify: `${screenName}_edit`,
      
      // Delete button
      delete: `${screenName}_delete`,
      remove: `${screenName}_delete`,
      
      // Export button
      export: `${screenName}_export`,
      download: `${screenName}_export`,
      
      // Print button
      print: `${screenName}_print`,
    };

    // Find all buttons and check their permissions
    document.querySelectorAll('button').forEach(button => {
      const id = button.id?.toLowerCase() || '';
      const text = button.textContent?.toLowerCase() || '';
      
      // Check button purpose from id or text
      for (const [action, permName] of Object.entries(permissionsMap)) {
        if (id.includes(action) || text.includes(action)) {
          if (!hasPermission(permName)) {
            button.style.display = 'none';
          }
          break;
        }
      }
    });

    // Also check action buttons in tables (edit/delete icons)
    document.querySelectorAll('[data-action]').forEach(element => {
      const action = element.getAttribute('data-action');
      let permName = null;

      if (action === 'edit' || action === 'update') {
        permName = `${screenName}_edit`;
      } else if (action === 'delete' || action === 'remove') {
        permName = `${screenName}_delete`;
      }

      if (permName && !hasPermission(permName)) {
        element.style.display = 'none';
      }
    });
  }

  // Export to window
  window.ScreenPermissions = {
    init: initScreenPermissions,
    check: checkPermission,
    has: hasPermission,
    hide: hideIfNoPermission,
    disable: disableIfNoPermission,
    applyToButtons: applyPermissionsToButtons,
    isCurrentBranchReadOnly,
    showReadOnlyBranchMessage,
    handleBranchReadOnlyResponse,
    isAdmin: () => isAdmin,
    getUser: () => currentUser
  };

  window.handleBranchReadOnlyResponse = handleBranchReadOnlyResponse;
})();

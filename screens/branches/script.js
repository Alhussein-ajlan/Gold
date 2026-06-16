const BRANCH_TRANSLATIONS = {
  ar: {
    pageTitle: 'الفروع',
    pageSubtitle: 'إدارة الفروع المتاحة في النظام',
    btnAddBranchText: 'إضافة فرع',
    totalBranchesLabel: 'إجمالي الفروع',
    activeBranchesLabel: 'الفروع النشطة',
    inactiveBranchesText: 'غير النشطة: {count}',
    branchFocusLabel: 'الفرع الحالي',
    mainBranchText: 'الفرع الرئيسي: {name}',
    tableTitle: 'قائمة الفروع',
    thId: '#',
    thCode: 'الرمز',
    thName: 'الاسم',
    thNameEn: 'الاسم بالإنجليزية',
    thPhone: 'الهاتف',
    thStatus: 'الحالة',
    thMain: 'الرئيسي',
    thCreatedAt: 'تاريخ الإنشاء',
    thActions: 'الإجراءات',
    searchPlaceholder: 'بحث عن فرع...',
    refreshTitle: 'تحديث',
    clearTitle: 'مسح',
    modalAddTitle: 'إضافة فرع',
    modalEditTitle: 'تعديل فرع',
    labelCode: 'رمز الفرع',
    labelPhone: 'الهاتف',
    labelName: 'اسم الفرع',
    labelNameEn: 'الاسم بالإنجليزية',
    labelAddress: 'العنوان',
    labelActive: 'نشط',
    labelMain: 'فرع رئيسي',
    cancelText: 'إلغاء',
    saveText: 'حفظ',
    deleteTitle: 'تأكيد الحذف',
    deleteMessage: 'هل أنت متأكد من حذف هذا الفرع؟',
    deleteCancelText: 'إلغاء',
    deleteConfirmText: 'حذف',
    closeText: 'إغلاق',
    loadingText: 'جاري التحميل...',
    emptyText: 'لا توجد فروع مطابقة',
    currentBranchFallback: 'غير محدد',
    statusActive: 'نشط',
    statusInactive: 'غير نشط',
    mainYes: 'رئيسي',
    mainNo: 'فرعي',
    currentBadge: 'الحالي',
    codePlaceholder: 'مثال: MAIN',
    namePlaceholder: 'اسم الفرع',
    nameEnPlaceholder: 'اسم الفرع بالإنجليزية',
    addressPlaceholder: 'عنوان الفرع',
    phonePlaceholder: 'رقم الهاتف',
    validationCode: 'رمز الفرع مطلوب',
    validationName: 'اسم الفرع مطلوب',
    loadFailed: 'فشل تحميل الفروع',
    addSuccess: 'تمت إضافة الفرع بنجاح',
    updateSuccess: 'تم تحديث الفرع بنجاح',
    deleteSuccess: 'تم حذف الفرع بنجاح',
    saveFailed: 'فشل حفظ الفرع',
    deleteFailed: 'فشل حذف الفرع',
    deleteError: 'حدث خطأ أثناء محاولة حذف الفرع',
    cannotDeleteBranch: 'لا يمكن حذف هذا الفرع',
    hasLinkedRecords: 'يوجد سجلات مرتبطة بهذا الفرع',
    problemDetails: 'تفاصيل المشكلة:',
    tipLabel: 'نصيحة:',
    deleteTip: 'لحذف هذا الفرع، يجب عليك أولاً حذف أو تعديل جميع السجلات المرتبطة به.',
    branchLinkedDetails: 'الفرع مرتبط بسجلات في (صلاحيات المستخدمين على الفروع، العملاء، الموردين، الحسابات، الصناديق الافتراضية، سندات القبض، سندات الصرف، الأرصدة الافتتاحية، القيود اليومية، فواتير البيع، فواتير الشراء، الأوردرات، أو الإقرارات الضريبية). يجب حذف السجلات المرتبطة أولاً قبل حذف الفرع.',
    mainBranchDeleteReason: 'لا يمكن حذف الفرع الرئيسي',
    mainBranchDeleteDetails: 'هذا الفرع معيّن كفرع رئيسي في النظام. يجب تعيين فرع رئيسي آخر أولاً قبل حذف هذا الفرع.',
    unknownError: 'حدث خطأ غير متوقع',
    editTitle: 'تعديل',
    deleteTitleBtn: 'حذف',
    btnOk: 'موافق',
    noPermissionView: 'ليس لديك صلاحية عرض الفروع',
    noPermissionAdd: 'ليس لديك صلاحية إضافة الفروع',
    noPermissionEdit: 'ليس لديك صلاحية تعديل الفروع',
    noPermissionDelete: 'ليس لديك صلاحية حذف الفروع',
    createdAtFallback: '—',
    addressFallback: 'بدون عنوان',
    phoneFallback: '—'
  },
  en: {
    pageTitle: 'Branches',
    pageSubtitle: 'Manage available branches in the system',
    btnAddBranchText: 'Add Branch',
    totalBranchesLabel: 'Total Branches',
    activeBranchesLabel: 'Active Branches',
    inactiveBranchesText: 'Inactive: {count}',
    branchFocusLabel: 'Current Branch',
    mainBranchText: 'Main Branch: {name}',
    tableTitle: 'Branches List',
    thId: '#',
    thCode: 'Code',
    thName: 'Name',
    thNameEn: 'English Name',
    thPhone: 'Phone',
    thStatus: 'Status',
    thMain: 'Main',
    thCreatedAt: 'Created At',
    thActions: 'Actions',
    searchPlaceholder: 'Search branches...',
    refreshTitle: 'Refresh',
    clearTitle: 'Clear',
    modalAddTitle: 'Add Branch',
    modalEditTitle: 'Edit Branch',
    labelCode: 'Branch Code',
    labelPhone: 'Phone',
    labelName: 'Branch Name',
    labelNameEn: 'English Name',
    labelAddress: 'Address',
    labelActive: 'Active',
    labelMain: 'Main Branch',
    cancelText: 'Cancel',
    saveText: 'Save',
    deleteTitle: 'Confirm Delete',
    deleteMessage: 'Are you sure you want to delete this branch?',
    deleteCancelText: 'Cancel',
    deleteConfirmText: 'Delete',
    closeText: 'Close',
    loadingText: 'Loading...',
    emptyText: 'No matching branches found',
    currentBranchFallback: 'Not selected',
    statusActive: 'Active',
    statusInactive: 'Inactive',
    mainYes: 'Main',
    mainNo: 'Sub',
    currentBadge: 'Current',
    codePlaceholder: 'Example: MAIN',
    namePlaceholder: 'Branch name',
    nameEnPlaceholder: 'Branch name in English',
    addressPlaceholder: 'Branch address',
    phonePlaceholder: 'Phone number',
    validationCode: 'Branch code is required',
    validationName: 'Branch name is required',
    loadFailed: 'Failed to load branches',
    addSuccess: 'Branch added successfully',
    updateSuccess: 'Branch updated successfully',
    deleteSuccess: 'Branch deleted successfully',
    saveFailed: 'Failed to save branch',
    deleteFailed: 'Failed to delete branch',
    deleteError: 'Error occurred while deleting branch',
    cannotDeleteBranch: 'Cannot delete this branch',
    hasLinkedRecords: 'There are records linked to this branch',
    problemDetails: 'Problem Details:',
    tipLabel: 'Tip:',
    deleteTip: 'To delete this branch, you must first delete or modify all related records.',
    branchLinkedDetails: 'This branch is linked to records in (user branch assignments, customers, suppliers, accounts, default boxes, receipts, payments, opening balances, journal entries, sales invoices, purchase invoices, orders, or tax declarations). You must delete the linked records first before deleting the branch.',
    mainBranchDeleteReason: 'Main branch cannot be deleted',
    mainBranchDeleteDetails: 'This branch is assigned as the main branch in the system. You must assign another main branch first before deleting this branch.',
    unknownError: 'An unexpected error occurred',
    editTitle: 'Edit',
    deleteTitleBtn: 'Delete',
    btnOk: 'OK',
    noPermissionView: 'You do not have permission to view branches',
    noPermissionAdd: 'You do not have permission to add branches',
    noPermissionEdit: 'You do not have permission to edit branches',
    noPermissionDelete: 'You do not have permission to delete branches',
    createdAtFallback: '—',
    addressFallback: 'No address',
    phoneFallback: '—'
  }
};

let branchesData = [];
let branchToDelete = null;
let editingBranch = null;

const page = document.getElementById('branchesPage');
const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');
const btnRefresh = document.getElementById('btnRefresh');
const btnAddBranch = document.getElementById('btnAddBranch');
const tableBody = document.getElementById('branchesTableBody');
const totalBranchesValue = document.getElementById('totalBranchesValue');
const activeBranchesValue = document.getElementById('activeBranchesValue');
const inactiveBranchesText = document.getElementById('inactiveBranchesText');
const branchFocusValue = document.getElementById('branchFocusValue');
const mainBranchText = document.getElementById('mainBranchText');
const branchModal = document.getElementById('branchModal');
const branchForm = document.getElementById('branchForm');
const modalTitle = document.getElementById('modalTitle');
const modalClose = document.getElementById('modalClose');
const modalCancel = document.getElementById('modalCancel');
const modalSave = document.getElementById('modalSave');
const formError = document.getElementById('formError');
const branchIdInput = document.getElementById('branchId');
const branchCodeInput = document.getElementById('branchCode');
const branchNameInput = document.getElementById('branchName');
const branchNameEnInput = document.getElementById('branchNameEn');
const branchPhoneInput = document.getElementById('branchPhone');
const branchAddressInput = document.getElementById('branchAddress');
const branchActiveInput = document.getElementById('branchActive');
const branchIsMainInput = document.getElementById('branchIsMain');
const deleteModal = document.getElementById('deleteModal');
const deleteClose = document.getElementById('deleteClose');
const deleteCancel = document.getElementById('deleteCancel');
const deleteConfirm = document.getElementById('deleteConfirm');
const deleteBranchName = document.getElementById('deleteBranchName');
const loadingRow = document.getElementById('loadingRow');
const toastWrap = document.getElementById('toastWrap');

function getLang() {
  return localStorage.getItem('uiLang') === 'en' ? 'en' : 'ar';
}

function tBranch(key, params = {}) {
  const dict = BRANCH_TRANSLATIONS[getLang()] || BRANCH_TRANSLATIONS.ar;
  let value = dict[key] || BRANCH_TRANSLATIONS.ar[key] || key;
  Object.entries(params).forEach(([paramKey, paramValue]) => {
    value = value.replace(`{${paramKey}}`, String(paramValue ?? ''));
  });
  return value;
}

function getStoredCurrentBranch() {
  try {
    const raw = localStorage.getItem('currentBranch');
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatDate(value) {
  if (!value) return tBranch('createdAtFallback');
  try {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return tBranch('createdAtFallback');
    }
    return date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  } catch (_) {
    return tBranch('createdAtFallback');
  }
}

function getBranchDisplayName(branch = {}) {
  const lang = getLang();
  const arName = String(branch?.name || '').trim();
  const enName = String(branch?.name_en || '').trim();
  return lang === 'en' ? (enName || arName || `#${branch?.id || ''}`) : (arName || enName || `#${branch?.id || ''}`);
}

function getBranchesApi() {
  if (window.branches) return window.branches;
  if (window.parent?.branches) return window.parent.branches;
  if (window.top?.branches) return window.top.branches;
  return null;
}

async function waitForBranchesApi(timeoutMs = 2500) {
  const startedAt = Date.now();
  while ((Date.now() - startedAt) < timeoutMs) {
    const api = getBranchesApi();
    if (api && typeof api.getBranches === 'function') {
      return api;
    }
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  return getBranchesApi();
}

function showToast(type, message) {
  if (!toastWrap) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `${type === 'success' ? '<i class="fa-regular fa-circle-check"></i>' : '<i class="fa-regular fa-circle-xmark"></i>'}<span>${escapeHtml(message)}</span>`;
  toastWrap.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    setTimeout(() => toast.remove(), 180);
  }, 3200);
}

function showDeleteErrorModal(response) {
  const lang = getLang();
  const isRtl = lang === 'ar';
  const borderSide = isRtl ? 'border-right' : 'border-left';

  let errorModal = document.getElementById('deleteErrorModal');
  if (!errorModal) {
    errorModal = document.createElement('div');
    errorModal.id = 'deleteErrorModal';
    errorModal.className = 'modal-overlay';
    errorModal.setAttribute('aria-hidden', 'true');
    errorModal.setAttribute('role', 'dialog');
    errorModal.setAttribute('aria-modal', 'true');
    errorModal.innerHTML = `
      <div class="modal-card modal-small" role="document">
        <div class="modal-header danger" style="background:linear-gradient(135deg, #ef5350 0%, #e53935 100%); color:white; padding:16px 20px">
          <h3 style="margin:0; display:flex; align-items:center; gap:10px; font-size:18px">
            <i class="fa-solid fa-triangle-exclamation" style="font-size:24px"></i>
            <span id="deleteErrorTitle">${tBranch('deleteFailed')}</span>
          </h3>
          <button class="icon-btn" id="deleteErrorClose" aria-label="${tBranch('closeText')}" style="color:white">
            <i class="fa-regular fa-circle-xmark"></i>
          </button>
        </div>
        <div class="modal-body" style="padding:24px 20px">
          <div id="deleteErrorContent"></div>
        </div>
        <div class="modal-footer" style="padding:12px 20px">
          <button class="btn-primary" id="deleteErrorOk" style="width:100%; border:none; display:flex; align-items:center; justify-content:center; gap:8px">
            <i class="fa-regular fa-circle-check"></i> <span>${tBranch('btnOk')}</span>
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(errorModal);

    const closeBtn = errorModal.querySelector('#deleteErrorClose');
    const okBtn = errorModal.querySelector('#deleteErrorOk');

    function closeErrorModal() {
      errorModal.setAttribute('aria-hidden', 'true');
    }

    closeBtn.addEventListener('click', closeErrorModal);
    okBtn.addEventListener('click', closeErrorModal);
    errorModal.addEventListener('click', (event) => {
      if (event.target === errorModal) {
        closeErrorModal();
      }
    });
  }

  const titleEl = errorModal.querySelector('#deleteErrorTitle');
  if (titleEl) titleEl.textContent = tBranch('deleteFailed');
  const okBtnSpan = errorModal.querySelector('#deleteErrorOk span');
  if (okBtnSpan) okBtnSpan.textContent = tBranch('btnOk');
  const closeBtn = errorModal.querySelector('#deleteErrorClose');
  if (closeBtn) closeBtn.setAttribute('aria-label', tBranch('closeText'));

  const errorTranslations = {
    'لا يمكن حذف هذا الفرع': tBranch('cannotDeleteBranch'),
    'تعذّر حذف الفرع': tBranch('cannotDeleteBranch'),
    'يوجد سجلات مرتبطة بهذا الفرع': tBranch('hasLinkedRecords'),
    'لا يمكن حذف الفرع الرئيسي': tBranch('mainBranchDeleteReason'),
  };

  const detailsTranslations = {
    'الفرع مرتبط بسجلات في (صلاحيات المستخدمين على الفروع، العملاء، الموردين، الحسابات، الصناديق الافتراضية، سندات القبض، سندات الصرف، الأرصدة الافتتاحية، القيود اليومية، فواتير البيع، فواتير الشراء، الأوردرات، أو الإقرارات الضريبية). يجب حذف السجلات المرتبطة أولاً قبل حذف الفرع.': tBranch('branchLinkedDetails'),
    'هذا الفرع معيّن كفرع رئيسي في النظام. يجب تعيين فرع رئيسي آخر أولاً قبل حذف هذا الفرع.': tBranch('mainBranchDeleteDetails'),
  };

  const translateText = (text) => {
    if (!text) return '';
    return errorTranslations[text] || text;
  };

  const translateDetails = (text) => {
    if (!text) return '';
    return detailsTranslations[text] || text;
  };

  const content = errorModal.querySelector('#deleteErrorContent');
  const error = response && response.error ? translateText(response.error) : tBranch('cannotDeleteBranch');
  const reason = response && response.reason ? translateText(response.reason) : '';
  const details = response && response.details ? translateDetails(response.details) : '';

  let html = `
    <div style="text-align:center; margin-bottom:20px">
      <div style="width:80px; height:80px; background:linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%); border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 16px">
        <i class="fa-solid fa-ban" style="font-size:40px; color:#ef5350"></i>
      </div>
      <h4 style="margin:0 0 8px 0; font-size:20px; color:var(--text); font-weight:700">${escapeHtml(error)}</h4>
  `;

  if (reason) {
    html += `<p style="margin:0; font-size:16px; color:var(--error); font-weight:600">${escapeHtml(reason)}</p>`;
  }

  html += `</div>`;

  if (details) {
    html += `
      <div style="background:var(--bg-muted); ${borderSide}:4px solid var(--error); padding:16px; border-radius:8px; margin-bottom:12px">
        <div style="display:flex; align-items:start; gap:12px">
          <i class="fa-solid fa-circle-info" style="color:var(--error); font-size:20px; margin-top:2px"></i>
          <div style="flex:1">
            <h5 style="margin:0 0 8px 0; font-size:14px; font-weight:700; color:var(--text)">${escapeHtml(tBranch('problemDetails'))}</h5>
            <p style="margin:0; font-size:14px; line-height:1.6; color:var(--text)">${escapeHtml(details)}</p>
          </div>
        </div>
      </div>
    `;
  }

  html += `
    <div style="background:#fff3cd; border:1px solid #ffc107; border-radius:8px; padding:12px; display:flex; align-items:start; gap:10px">
      <i class="fa-solid fa-lightbulb" style="color:#f57c00; font-size:18px; margin-top:2px"></i>
      <div style="flex:1">
        <p style="margin:0; font-size:13px; color:#856404; line-height:1.5">
          <strong>${escapeHtml(tBranch('tipLabel'))}</strong> ${escapeHtml(tBranch('deleteTip'))}
        </p>
      </div>
    </div>
  `;

  content.innerHTML = html;
  errorModal.setAttribute('aria-hidden', 'false');
}

function applyTranslations() {
  const lang = getLang();
  const dict = BRANCH_TRANSLATIONS[lang] || BRANCH_TRANSLATIONS.ar;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';
  document.title = dict.pageTitle;

  [
    'pageTitle', 'pageSubtitle', 'btnAddBranchText', 'totalBranchesLabel', 'activeBranchesLabel',
    'branchFocusLabel', 'tableTitle', 'thId', 'thCode', 'thName', 'thNameEn', 'thPhone',
    'thStatus', 'thMain', 'thCreatedAt', 'thActions', 'labelCode', 'labelPhone', 'labelName',
    'labelNameEn', 'labelAddress', 'labelActive', 'labelMain', 'cancelText', 'saveText',
    'deleteTitle', 'deleteMessage', 'deleteCancelText', 'deleteConfirmText'
  ].forEach((id) => {
    const element = document.getElementById(id);
    if (element && typeof dict[id] === 'string') {
      element.textContent = dict[id];
    }
  });

  if (searchInput) {
    searchInput.placeholder = dict.searchPlaceholder;
    searchInput.setAttribute('aria-label', dict.searchPlaceholder);
  }
  if (clearSearch) {
    clearSearch.title = dict.clearTitle;
    clearSearch.setAttribute('aria-label', dict.clearTitle);
  }
  if (btnRefresh) {
    btnRefresh.title = dict.refreshTitle;
    btnRefresh.setAttribute('aria-label', dict.refreshTitle);
  }
  if (branchCodeInput) branchCodeInput.placeholder = dict.codePlaceholder;
  if (branchNameInput) branchNameInput.placeholder = dict.namePlaceholder;
  if (branchNameEnInput) branchNameEnInput.placeholder = dict.nameEnPlaceholder;
  if (branchPhoneInput) branchPhoneInput.placeholder = dict.phonePlaceholder;
  if (branchAddressInput) branchAddressInput.placeholder = dict.addressPlaceholder;
  if (modalClose) {
    modalClose.title = dict.closeText;
    modalClose.setAttribute('aria-label', dict.closeText);
  }
  if (deleteClose) {
    deleteClose.title = dict.closeText;
    deleteClose.setAttribute('aria-label', dict.closeText);
  }
  if (loadingRow) loadingRow.textContent = dict.loadingText;

  updateStats();
  renderTable();
}

function updateStats() {
  const total = branchesData.length;
  const active = branchesData.filter((branch) => Number(branch?.active ?? 1) === 1).length;
  const inactive = total - active;
  const currentBranch = getStoredCurrentBranch();
  const mainBranch = branchesData.find((branch) => Number(branch?.is_main || 0) === 1) || null;

  if (totalBranchesValue) totalBranchesValue.textContent = String(total);
  if (activeBranchesValue) activeBranchesValue.textContent = String(active);
  if (inactiveBranchesText) inactiveBranchesText.textContent = tBranch('inactiveBranchesText', { count: inactive });
  if (branchFocusValue) {
    branchFocusValue.textContent = currentBranch ? getBranchDisplayName(currentBranch) : tBranch('currentBranchFallback');
  }
  if (mainBranchText) {
    mainBranchText.textContent = tBranch('mainBranchText', {
      name: mainBranch ? getBranchDisplayName(mainBranch) : tBranch('currentBranchFallback')
    });
  }
}

function getFilteredBranches() {
  const query = String(searchInput?.value || '').trim().toLowerCase();
  if (!query) return [...branchesData];
  return branchesData.filter((branch) => {
    const values = [
      branch?.id,
      branch?.code,
      branch?.name,
      branch?.name_en,
      branch?.phone,
      branch?.address
    ].map((value) => String(value || '').toLowerCase());
    return values.some((value) => value.includes(query));
  });
}

function renderTable() {
  if (!tableBody) return;

  const rows = getFilteredBranches();
  const currentBranch = getStoredCurrentBranch();
  const textAlign = getLang() === 'ar' ? 'right' : 'left';

  if (!rows.length) {
    tableBody.innerHTML = `<tr><td colspan="9" class="empty-cell">${escapeHtml(tBranch('emptyText'))}</td></tr>`;
    return;
  }

  tableBody.innerHTML = rows.map((branch) => {
    const isCurrent = Number(currentBranch?.id || 0) === Number(branch?.id || 0);
    const name = getBranchDisplayName(branch);
    const englishName = String(branch?.name_en || '').trim() || '—';
    const phone = String(branch?.phone || '').trim() || tBranch('phoneFallback');
    const address = String(branch?.address || '').trim() || tBranch('addressFallback');
    const statusLabel = Number(branch?.active ?? 1) === 1 ? tBranch('statusActive') : tBranch('statusInactive');
    const statusClass = Number(branch?.active ?? 1) === 1 ? 'status-active' : 'status-inactive';
    const isActive = Number(branch?.active ?? 1) === 1;
    const mainBadge = Number(branch?.is_main || 0) === 1
      ? `<span class="badge badge-main">${escapeHtml(tBranch('mainYes'))}</span>`
      : `<span class="badge">${escapeHtml(tBranch('mainNo'))}</span>`;

    return `
      <tr class="${isCurrent ? 'current-row' : ''}">
        <td style="text-align:${textAlign}">${Number(branch?.id || 0)}</td>
        <td style="text-align:${textAlign}"><strong>${escapeHtml(String(branch?.code || ''))}</strong></td>
        <td style="text-align:${textAlign}">
          <div class="branch-name-cell">
            <strong>${escapeHtml(name)}</strong>
            <span class="branch-address">${escapeHtml(address)}</span>
          </div>
        </td>
        <td style="text-align:${textAlign}">${escapeHtml(englishName)}</td>
        <td style="text-align:${textAlign}">${escapeHtml(phone)}</td>
        <td style="text-align:center">
          <label class="switch" title="${escapeHtml(statusLabel)}">
            <input type="checkbox" ${isActive ? 'checked' : ''} disabled>
            <span class="slider"></span>
          </label>
        </td>
        <td style="text-align:center">
          <div class="row row-center">
            ${mainBadge}
            ${isCurrent ? `<span class="badge badge-current">${escapeHtml(tBranch('currentBadge'))}</span>` : ''}
          </div>
        </td>
        <td style="text-align:${textAlign}">${escapeHtml(formatDate(branch?.created_at))}</td>
        <td class="row" style="text-align:center">
          <div class="row row-center">
            <button type="button" class="icon-btn act-edit" data-id="${Number(branch?.id || 0)}" title="${escapeHtml(tBranch('editTitle'))}">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button type="button" class="icon-btn act-delete" data-id="${Number(branch?.id || 0)}" title="${escapeHtml(tBranch('deleteTitleBtn'))}">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  tableBody.querySelectorAll('.act-edit').forEach((button) => {
    button.addEventListener('click', () => {
      const id = Number(button.getAttribute('data-id') || 0);
      const branch = branchesData.find((row) => Number(row?.id || 0) === id);
      if (branch) {
        openModal(branch);
      }
    });
  });

  tableBody.querySelectorAll('.act-delete').forEach((button) => {
    button.addEventListener('click', () => {
      const id = Number(button.getAttribute('data-id') || 0);
      const branch = branchesData.find((row) => Number(row?.id || 0) === id);
      if (branch) {
        openDeleteModal(branch);
      }
    });
  });
}

async function loadBranches(forceFresh = false) {
  const branchesApi = await waitForBranchesApi(forceFresh ? 1200 : 3000);
  if (!branchesApi || typeof branchesApi.getBranches !== 'function') {
    showToast('error', tBranch('loadFailed'));
    branchesData = [];
    renderTable();
    updateStats();
    return;
  }

  if (tableBody) {
    tableBody.innerHTML = `<tr><td colspan="9" class="empty-cell">${escapeHtml(tBranch('loadingText'))}</td></tr>`;
  }

  try {
    const result = await branchesApi.getBranches({ forceFresh });
    if (!result?.success) {
      showToast('error', result?.error || tBranch('loadFailed'));
      branchesData = [];
      renderTable();
      updateStats();
      return;
    }

    branchesData = Array.isArray(result.data) ? result.data : [];
    updateStats();
    renderTable();
  } catch (_) {
    showToast('error', tBranch('loadFailed'));
    branchesData = [];
    renderTable();
    updateStats();
  }
}

function resetForm() {
  branchForm?.reset();
  branchIdInput.value = '';
  branchActiveInput.checked = true;
  branchIsMainInput.checked = false;
  formError.textContent = '';
}

function openModal(branch = null) {
  if (branch) {
    if (window.ScreenPermissions && !window.ScreenPermissions.check('branches_edit', 'تعديل فرع')) {
      return;
    }
  } else if (window.ScreenPermissions && !window.ScreenPermissions.check('branches_add', 'إضافة فرع')) {
    return;
  }

  editingBranch = branch;
  resetForm();

  if (branch) {
    modalTitle.textContent = tBranch('modalEditTitle');
    branchIdInput.value = String(branch.id || '');
    branchCodeInput.value = String(branch.code || '');
    branchNameInput.value = String(branch.name || '');
    branchNameEnInput.value = String(branch.name_en || '');
    branchPhoneInput.value = String(branch.phone || '');
    branchAddressInput.value = String(branch.address || '');
    branchActiveInput.checked = Number(branch.active ?? 1) === 1;
    branchIsMainInput.checked = Number(branch.is_main || 0) === 1;
  } else {
    modalTitle.textContent = tBranch('modalAddTitle');
  }

  branchModal?.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  branchModal?.setAttribute('aria-hidden', 'true');
  editingBranch = null;
}

function openDeleteModal(branch) {
  if (window.ScreenPermissions && !window.ScreenPermissions.check('branches_delete', 'حذف فرع')) {
    return;
  }

  branchToDelete = branch;
  if (deleteBranchName) {
    deleteBranchName.textContent = getBranchDisplayName(branch);
  }
  deleteModal?.setAttribute('aria-hidden', 'false');
}

function closeDeleteModal() {
  deleteModal?.setAttribute('aria-hidden', 'true');
  branchToDelete = null;
}

async function saveBranch() {
  const branchesApi = await waitForBranchesApi();
  if (!branchesApi) {
    formError.textContent = tBranch('loadFailed');
    return;
  }

  const code = String(branchCodeInput.value || '').trim().toUpperCase();
  const name = String(branchNameInput.value || '').trim();
  const payload = {
    code,
    name,
    name_en: String(branchNameEnInput.value || '').trim() || null,
    phone: String(branchPhoneInput.value || '').trim() || null,
    address: String(branchAddressInput.value || '').trim() || null,
    active: branchActiveInput.checked,
    is_main: branchIsMainInput.checked
  };

  if (!code) {
    formError.textContent = tBranch('validationCode');
    return;
  }
  if (!name) {
    formError.textContent = tBranch('validationName');
    return;
  }

  if (editingBranch?.id) {
    if (window.ScreenPermissions && !window.ScreenPermissions.check('branches_edit', 'تعديل فرع')) {
      return;
    }
    const confirmFn = window.confirmEditWithPassword || window.parent?.confirmEditWithPassword || window.top?.confirmEditWithPassword;
    if (confirmFn) {
      try {
        const confirmed = await confirmFn();
        if (!confirmed) return;
      } catch (error) {
        if (error.message !== 'cancelled') {
          formError.textContent = tBranch('unknownError');
        }
        return;
      }
    }
  } else if (window.ScreenPermissions && !window.ScreenPermissions.check('branches_add', 'إضافة فرع')) {
    return;
  }

  formError.textContent = '';
  modalSave.disabled = true;

  try {
    let result;
    if (editingBranch?.id) {
      result = await branchesApi.updateBranch({ id: editingBranch.id, ...payload });
    } else {
      result = await branchesApi.addBranch(payload);
    }

    if (!result?.success) {
      formError.textContent = result?.error || tBranch('saveFailed');
      return;
    }

    showToast('success', editingBranch?.id ? tBranch('updateSuccess') : tBranch('addSuccess'));
    closeModal();
    await loadBranches(true);
  } catch (_) {
    formError.textContent = tBranch('unknownError');
  } finally {
    modalSave.disabled = false;
  }
}

async function deleteBranch() {
  if (!branchToDelete?.id) {
    return;
  }

  const branchesApi = await waitForBranchesApi();
  if (!branchesApi || typeof branchesApi.deleteBranch !== 'function') {
    showToast('error', tBranch('loadFailed'));
    return;
  }

  if (window.ScreenPermissions && !window.ScreenPermissions.check('branches_delete', 'حذف فرع')) {
    return;
  }

  const confirmFn = window.confirmDeleteWithPassword || window.parent?.confirmDeleteWithPassword || window.top?.confirmDeleteWithPassword;
  if (confirmFn) {
    try {
      const confirmed = await confirmFn();
      if (!confirmed) return;
    } catch (error) {
      if (error.message !== 'cancelled') {
        showDeleteErrorModal({ error: tBranch('deleteError') });
      }
      return;
    }
  }

  deleteConfirm.disabled = true;
  try {
    const result = await branchesApi.deleteBranch(branchToDelete.id);
    if (!result?.success) {
      closeDeleteModal();
      showDeleteErrorModal(result);
      return;
    }
    showToast('success', tBranch('deleteSuccess'));
    closeDeleteModal();
    await loadBranches(true);
  } catch (_) {
    closeDeleteModal();
    showDeleteErrorModal({ error: tBranch('deleteError'), details: tBranch('unknownError') });
  } finally {
    deleteConfirm.disabled = false;
  }
}

function bindStaticEvents() {
  searchInput?.addEventListener('input', () => renderTable());
  clearSearch?.addEventListener('click', () => {
    searchInput.value = '';
    renderTable();
  });
  btnRefresh?.addEventListener('click', () => loadBranches(true));
  btnAddBranch?.addEventListener('click', () => openModal());
  modalClose?.addEventListener('click', closeModal);
  modalCancel?.addEventListener('click', closeModal);
  modalSave?.addEventListener('click', saveBranch);
  deleteClose?.addEventListener('click', closeDeleteModal);
  deleteCancel?.addEventListener('click', closeDeleteModal);
  deleteConfirm?.addEventListener('click', deleteBranch);

  branchForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    saveBranch();
  });

  branchModal?.addEventListener('click', (event) => {
    if (event.target === branchModal) {
      closeModal();
    }
  });

  deleteModal?.addEventListener('click', (event) => {
    if (event.target === deleteModal) {
      closeDeleteModal();
    }
  });
}

async function initScreen() {
  applyTranslations();
  bindStaticEvents();

  if (window.ScreenPermissions) {
    await window.ScreenPermissions.init();
    if (!window.ScreenPermissions.check('branches_view', 'عرض الفروع')) {
      if (page) {
        page.style.display = 'none';
      }
      return;
    }
  }

  await loadBranches();

  if (window.api && typeof window.api.on === 'function') {
    window.api.on('cloud-data-updated', (payload) => {
      const tables = Array.isArray(payload?.tables) ? payload.tables : [];
      if (tables.includes('branches') || tables.includes('user_branches')) {
        loadBranches(true);
      }
    });
  }

  window.addEventListener('message', (event) => {
    if (event?.data?.type !== 'cloud-data-updated') {
      return;
    }
    const tables = Array.isArray(event?.data?.payload?.tables) ? event.data.payload.tables : [];
    if (tables.includes('branches') || tables.includes('user_branches')) {
      loadBranches(true);
    }
  });

  window.addEventListener('storage', (event) => {
    if (event.key === 'uiLang' || event.key === 'currentBranch') {
      applyTranslations();
    }
  });

  window.addEventListener('languageChanged', () => {
    applyTranslations();
  });
}

document.addEventListener('DOMContentLoaded', initScreen);

/**
 * Gold Items Management Screen
 * أصناف المشغولات الذهبية
 */

// Translations
const translations = {
  ar: {
    pageTitle: 'أصناف العيارات',
    pageSubtitle: 'Gold Items Categories',
    searchPlaceholder: 'بحث عن صنف...',
    btnAddItem: 'إضافة صنف',
    statTotalLabel: 'إجمالي الأصناف',
    statActiveLabel: 'الأصناف النشطة',
    statKaratsLabel: 'العيارات المتاحة',
    tableTitle: 'قائمة الأصناف',
    itemsCount: '{count} صنف',
    thItemId: 'رقم الصنف',
    thItemName: 'اسم الصنف',
    thItemNameEn: 'الاسم بالإنجليزية',
    thDefaultKarat: 'العيار الافتراضي',
    thStatus: 'الحالة',
    thActions: 'الإجراءات',
    loadingText: 'جاري التحميل...',
    emptyStateText: 'لا توجد أصناف مسجلة',
    btnAddFirstItem: 'إضافة أول صنف',
    karatsTitle: 'العيارات والأصناف',
    sectionMashghulatTitle: 'المشغولات',
    sectionKasrTitle: 'الكسر',
    sectionSilverTitle: 'الفضة',
    optgroupMashghulat: 'المشغولات',
    optgroupKasr: 'الكسر',
    optgroupSilver: 'الفضة',
    modalTitleAdd: 'إضافة صنف جديد',
    modalTitleEdit: 'تعديل الصنف',
    labelItemId: 'رقم الصنف',
    labelItemName: 'اسم الصنف (عربي)',
    labelItemNameEn: 'اسم الصنف (إنجليزي)',
    labelDefaultKarat: 'العيار الافتراضي',
    labelStatus: 'الحالة',
    labelDescription: 'الوصف',
    labelCrafted: 'مشغول',
    labelScrap: 'كسر',
    labelPure: 'صافي',
    labelSilver: 'فضة',
    labelSilverFine: 'فضة خالصة',
    labelSilverSterling: 'فضة استرليني',
    optActive: 'نشط',
    optInactive: 'غير نشط',
    btnCancel: 'إلغاء',
    btnSave: 'حفظ',
    deleteModalTitle: 'تأكيد الحذف',
    deleteWarningText: 'هل أنت متأكد من حذف هذا الصنف؟',
    deleteCancel: 'إلغاء',
    deleteConfirm: 'حذف',
    statusActive: 'نشط',
    statusInactive: 'غير نشط',
    karatUnit: 'عيار',
    karatsWord: 'عيارات',
    toastSaveSuccess: 'تم حفظ الصنف بنجاح',
    toastDeleteSuccess: 'تم حذف الصنف بنجاح',
    toastError: 'حدث خطأ، يرجى المحاولة مرة أخرى',
    toastNameRequired: 'يرجى إدخال اسم الصنف',
    placeholderName: 'مثال: خاتم',
    placeholderNameEn: 'Example: Ring',
    placeholderDescription: 'وصف اختياري للصنف...'
  },
  en: {
    pageTitle: 'Gold Items',
    pageSubtitle: 'Gold Items Categories',
    searchPlaceholder: 'Search for item...',
    btnAddItem: 'Add Item',
    statTotalLabel: 'Total Items',
    statActiveLabel: 'Active Items',
    statKaratsLabel: 'Available Karats',
    tableTitle: 'Items List',
    itemsCount: '{count} items',
    thItemId: 'Item ID',
    thItemName: 'Item Name',
    thItemNameEn: 'English Name',
    thDefaultKarat: 'Default Karat',
    thStatus: 'Status',
    thActions: 'Actions',
    loadingText: 'Loading...',
    emptyStateText: 'No items registered',
    btnAddFirstItem: 'Add First Item',
    sectionMashghulatTitle: 'Crafted',
    sectionKasrTitle: 'Scrap',
    sectionSilverTitle: 'Silver',
    karatsTitle: 'Gold Karats',
    karat24Label: 'Karat - Pure Gold',
    karat22Label: 'Karat',
    karat21Label: 'Karat',
    karat18Label: 'Karat',
    karat14Label: 'Karat',
    karat9Label: 'Karat',
    modalTitleAdd: 'Add New Item',
    modalTitleEdit: 'Edit Item',
    labelItemId: 'Item ID',
    labelItemName: 'Item Name (Arabic)',
    labelItemNameEn: 'Item Name (English)',
    labelDefaultKarat: 'Default Karat',
    labelStatus: 'Status',
    labelDescription: 'Description',
    optgroupMashghulat: 'Crafted',
    optgroupKasr: 'Scrap',
    optgroupSilver: 'Silver',
    labelCrafted: 'Crafted',
    labelScrap: 'Scrap',
    labelPure: 'Pure',
    labelSilver: 'Silver',
    labelSilverFine: 'Fine Silver',
    labelSilverSterling: 'Sterling Silver',
    optActive: 'Active',
    optInactive: 'Inactive',
    btnCancel: 'Cancel',
    btnSave: 'Save',
    deleteModalTitle: 'Confirm Delete',
    deleteWarningText: 'Are you sure you want to delete this item?',
    deleteCancel: 'Cancel',
    deleteConfirm: 'Delete',
    statusActive: 'Active',
    statusInactive: 'Inactive',
    karatUnit: 'K',
    karatsWord: 'Karats',
    toastSaveSuccess: 'Item saved successfully',
    toastDeleteSuccess: 'Item deleted successfully',
    toastError: 'An error occurred, please try again',
    toastNameRequired: 'Please enter item name',
    placeholderName: 'Example: Ring',
    placeholderNameEn: 'Example: Ring',
    placeholderDescription: 'Optional description...'
  }
};

// Current language (align with app-wide setting)
let currentLang = localStorage.getItem('uiLang') || localStorage.getItem('appLang') || 'ar';

// Get translation
function t(key) {
  return translations[currentLang]?.[key] || translations['ar'][key] || key;
}

// Apply translations to page
function applyTranslations() {
  const lang = currentLang;
  const trans = translations[lang];
  
  // Update text content for elements with IDs matching translation keys
  Object.keys(trans).forEach(key => {
    const el = document.getElementById(key);
    if (el) {
      if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
        el.placeholder = trans[key];
      } else {
        el.textContent = trans[key];
      }
    }
  });
  
  // Update placeholders
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.placeholder = t('searchPlaceholder');
  
  const itemName = document.getElementById('itemName');
  if (itemName) itemName.placeholder = t('placeholderName');
  
  const itemNameEn = document.getElementById('itemNameEn');
  if (itemNameEn) itemNameEn.placeholder = t('placeholderNameEn');
  
  const itemDescription = document.getElementById('itemDescription');
  if (itemDescription) itemDescription.placeholder = t('placeholderDescription');

  // Update section tabs labels
  const tabMash = document.getElementById('tabMashghulatTitle'); if (tabMash) tabMash.textContent = t('sectionMashghulatTitle');
  const tabKasr = document.getElementById('tabKasrTitle'); if (tabKasr) tabKasr.textContent = t('sectionKasrTitle');
  const tabSilver = document.getElementById('tabSilverTitle'); if (tabSilver) tabSilver.textContent = t('sectionSilverTitle');

  // Badge of current section
  const badge = document.getElementById('selectedSectionBadge');
  if (badge) {
    const name = currentSection === 'mashghulat' ? t('sectionMashghulatTitle') : currentSection === 'kasr' ? t('sectionKasrTitle') : t('sectionSilverTitle');
    badge.textContent = name;
  }
  
  // Ensure karat select/list are localized
  updateKaratSelect();
  // Update the counts text on tabs (e.g., "5 عيارات" / "5 Karats")
  updateSectionTabCounts();
}

// DOM Elements
let itemModal, deleteModal, itemForm;
let itemsData = [];
let editingItemId = null;
let currentSection = 'mashghulat';
let currentKarat = null;

// بيانات العيارات لكل قسم - يتم تحميلها من قاعدة البيانات
let karatsData = {
  mashghulat: [],
  kasr: [],
  silver: []
};

function getGoldKaratsAPI() {
  return window.goldKarats || window.parent?.goldKarats || window.top?.goldKarats || null;
}

// تحميل العيارات من قاعدة البيانات
async function loadKaratsFromDB() {
  try {
    const api = getGoldKaratsAPI();
    if (api && typeof api.list === 'function') {
      const result = await api.list();
      if (result && result.success && Array.isArray(result.data)) {
        // تجميع العيارات حسب القسم
        karatsData = { mashghulat: [], kasr: [], silver: [] };
        result.data.forEach(k => {
          const section = k.section || 'mashghulat';
          if (karatsData[section]) {
            karatsData[section].push({
              karat: k.karat,
              label: k.label || '',
              purity: k.purity || 1000
            });
          }
        });
        // ترتيب تنازلي حسب العيار
        Object.keys(karatsData).forEach(sec => {
          karatsData[sec].sort((a, b) => b.karat - a.karat);
        });
      }
    }
  } catch (e) {
    // Failed to load karats from DB
  }
  
  // إذا لم تكن هناك بيانات، استخدم القيم الافتراضية - النقاوة = (العيار/24) * 1000
  if (karatsData.mashghulat.length === 0) {
    karatsData.mashghulat = [
      { karat: 22, label: 'مشغول', purity: 916.67 },
      { karat: 21, label: 'مشغول', purity: 875 },
      { karat: 18, label: 'مشغول', purity: 750 },
      { karat: 14, label: 'مشغول', purity: 583.33 },
      { karat: 9, label: 'مشغول', purity: 375 }
    ];
  }
  if (karatsData.kasr.length === 0) {
    karatsData.kasr = [
      { karat: 24, label: 'صافي', purity: 999 },
      { karat: 22, label: 'كسر', purity: 916.67 },
      { karat: 21, label: 'كسر', purity: 875 },
      { karat: 18, label: 'كسر', purity: 750 }
    ];
  }
  if (karatsData.silver.length === 0) {
    karatsData.silver = [
      { karat: 999, label: 'فضة خالصة', purity: 999 },
      { karat: 925, label: 'فضة استرليني', purity: 925 },
      { karat: 900, label: 'فضة', purity: 900 },
      { karat: 800, label: 'فضة', purity: 800 }
    ];
  }
}

// أسماء الأقسام
const sectionNames = {
  mashghulat: 'المشغولات',
  kasr: 'الكسر',
  silver: 'الفضة'
};

// Initialize
document.addEventListener('DOMContentLoaded', async function() {
  initElements();
  applyTranslations();

  if (window.ScreenPermissions) {
    await window.ScreenPermissions.init();
    if (!window.ScreenPermissions.check('gold_items_view', 'عرض أصناف العيارات')) {
      const container = document.querySelector('.gold-items-container');
      if (container) container.style.display = 'none';
      return;
    }
    window.ScreenPermissions.hide('btnAddItem', 'gold_items_add');
    window.ScreenPermissions.hide('btnAddFirstItem', 'gold_items_add');
  }

  // تحميل العيارات من قاعدة البيانات أولاً
  await loadKaratsFromDB();
  
  loadItems();
  setupEventListeners();
  setupSectionTabs();
  setupKaratItems();

  if (window.api && typeof window.api.on === 'function') {
    window.api.on('cloud-data-updated', async (payload) => {
      const tables = Array.isArray(payload?.tables) ? payload.tables : [];
      if (tables.includes('gold_items') || tables.includes('gold_karats')) {
        await loadKaratsFromDB();
        await loadItems();
      }
    });
  }

  window.addEventListener('message', async (event) => {
    if (event?.data?.type !== 'cloud-data-updated') {
      return;
    }
    const payload = event.data.payload || {};
    const tables = Array.isArray(payload?.tables) ? payload.tables : [];
    if (tables.includes('gold_items') || tables.includes('gold_karats')) {
      await loadKaratsFromDB();
      await loadItems();
    }
  });
});

// Initialize DOM elements
function initElements() {
  itemModal = document.getElementById('itemModal');
  deleteModal = document.getElementById('deleteModal');
  itemForm = document.getElementById('itemForm');
}

// Setup event listeners
function setupEventListeners() {
  // Add item buttons
  document.getElementById('btnAddItem')?.addEventListener('click', openAddModal);
  document.getElementById('btnAddFirstItem')?.addEventListener('click', openAddModal);
  
  // Refresh button
  document.getElementById('btnRefresh')?.addEventListener('click', loadItems);
  
  // Search
  const searchInput = document.getElementById('searchInput');
  searchInput?.addEventListener('input', handleSearch);
  
  // Clear search
  document.getElementById('clearSearch')?.addEventListener('click', () => {
    searchInput.value = '';
    handleSearch();
  });
  
  // Modal close buttons
  document.getElementById('modalClose')?.addEventListener('click', closeItemModal);
  document.getElementById('btnCancel')?.addEventListener('click', closeItemModal);
  document.getElementById('deleteModalClose')?.addEventListener('click', closeDeleteModal);
  document.getElementById('deleteCancel')?.addEventListener('click', closeDeleteModal);
  
  // Save button
  document.getElementById('btnSave')?.addEventListener('click', saveItem);
  
  // Delete confirm
  document.getElementById('deleteConfirm')?.addEventListener('click', confirmDelete);
  
  // Close modals on overlay click
  itemModal?.addEventListener('click', (e) => {
    if (e.target === itemModal) closeItemModal();
  });
  deleteModal?.addEventListener('click', (e) => {
    if (e.target === deleteModal) closeDeleteModal();
  });
  
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeItemModal();
      closeDeleteModal();
    }
  });
}

// Setup section tabs
function setupSectionTabs() {
  const tabs = document.querySelectorAll('.section-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      // Add active to clicked tab
      tab.classList.add('active');
      
      // Update current section
      currentSection = tab.dataset.section;
      currentKarat = null;
      
      // Update badge
      const badge = document.getElementById('selectedSectionBadge');
      if (badge) {
        const name = currentSection === 'mashghulat' ? t('sectionMashghulatTitle') : currentSection === 'kasr' ? t('sectionKasrTitle') : t('sectionSilverTitle');
        badge.textContent = name;
      }
      
      // Render karats for this section (will auto-select first karat and show its items)
      renderKarats();
      // Update counts text after switching
      updateSectionTabCounts();
      
      // Update stats for this section
      updateStats();
    });
  });
}

// Setup karat items click
function setupKaratItems() {
  // Initial render
  renderKarats();
}

// Render karats for current section
function renderKarats() {
  const karatsList = document.getElementById('karatsList');
  if (!karatsList) return;
  
  const karats = karatsData[currentSection] || [];
  const lang = currentLang;
  const karatUnit = t('karatUnit');
  const getLabel = (type, karat) => {
    if (type === 'mashghulat') return t('labelCrafted');
    if (type === 'kasr') return karat === 24 ? t('labelPure') : t('labelScrap');
    if (type === 'silver') {
      if (karat === 999) return t('labelSilverFine');
      if (karat === 925) return t('labelSilverSterling');
      return t('labelSilver');
    }
    return '';
  };
  karatsList.innerHTML = karats.map((k, index) => {
    const label = getLabel(currentSection, k.karat);
    return `
    <div class="karat-item ${index === 0 ? 'active' : ''}" data-karat="${k.karat}" data-type="${currentSection}">
      <span class="karat-value">${k.karat}</span>
      <span class="karat-label">${label}</span>
      <span class="karat-purity" data-karat="${k.karat}" data-section="${currentSection}" title="انقر لتعديل النقاوة">${k.purity}</span>
    </div>`;
  }).join('');
  
  // Add click listeners for karat selection
  karatsList.querySelectorAll('.karat-item').forEach(item => {
    item.addEventListener('click', (e) => {
      // إذا كان النقر على النقاوة، لا نفعّل الصنف
      if (e.target.classList.contains('karat-purity')) return;
      
      // Remove active from all
      karatsList.querySelectorAll('.karat-item').forEach(i => i.classList.remove('active'));
      // Add active to clicked
      item.classList.add('active');
      
      // Update current karat
      currentKarat = parseInt(item.dataset.karat);
      
      // Filter and render items for this karat
      filterItemsByKarat();
    });
  });
  
  // Add click listeners for purity editing
  karatsList.querySelectorAll('.karat-purity').forEach(purityEl => {
    purityEl.addEventListener('click', async (e) => {
      e.stopPropagation();
      const karat = parseInt(purityEl.dataset.karat);
      const section = purityEl.dataset.section;
      const currentPurity = parseFloat(purityEl.textContent);
      
      const newPurity = prompt(`أدخل قيمة النقاوة للعيار ${karat}:`, currentPurity);
      if (newPurity === null) return;
      
      const purityValue = parseFloat(newPurity);
      if (isNaN(purityValue) || purityValue < 1 || purityValue > 1000) {
        showToast('error', 'قيمة النقاوة يجب أن تكون بين 1 و 1000');
        return;
      }
      
      // حفظ في قاعدة البيانات
      try {
        const api = getGoldKaratsAPI();
        if (api && typeof api.updatePurity === 'function') {
          const result = await api.updatePurity(karat, section, purityValue);
          if (result && result.success) {
            // تحديث القيمة في الذاكرة
            const karatObj = karatsData[section]?.find(k => k.karat === karat);
            if (karatObj) karatObj.purity = purityValue;
            purityEl.textContent = purityValue;
            showToast('success', 'تم تحديث النقاوة بنجاح');
          } else {
            showToast('error', result?.error || 'فشل تحديث النقاوة');
          }
        }
      } catch (err) {
        showToast('error', 'حدث خطأ: ' + err.message);
      }
    });
  });
  
  // Select first karat by default
  if (karats.length > 0) {
    currentKarat = karats[0].karat;
    filterItemsByKarat();
  }
}

// Update the tabs' counts (e.g., "5 عيارات" / "5 Karats") based on language
function updateSectionTabCounts(){
  const isAr = (currentLang || 'ar') === 'ar';
  document.querySelectorAll('.section-tab').forEach(tab => {
    const sec = tab.getAttribute('data-section');
    const countSpan = tab.querySelector('.section-tab-count');
    if (!countSpan) return;
    const count = (karatsData[sec] || []).length;
    const word = t('karatsWord');
    countSpan.textContent = isAr ? `${count} ${word}` : `${count} ${word}`;
  });
}

// Filter items by current section and karat
function filterItemsByKarat() {
  if (!currentKarat) {
    renderItems([]);
    return;
  }
  
  // فلترة حسب القسم والعيار
  const filtered = itemsData.filter(item => 
    item.section === currentSection && item.defaultKarat === currentKarat
  );
  renderItems(filtered);
}

// Get Gold Items API
function getGoldItemsAPI() {
  return window.goldItems || window.parent?.goldItems || window.top?.goldItems || null;
}

// Load items from database
async function loadItems() {
  const loadingIndicator = document.getElementById('loadingIndicator');
  const tableBody = document.getElementById('itemsTableBody');
  const emptyState = document.getElementById('emptyState');
  const table = document.getElementById('itemsTable');
  
  if (loadingIndicator) loadingIndicator.style.display = 'flex';
  if (table) table.style.display = 'none';
  if (emptyState) emptyState.style.display = 'none';
  
  try {
    const api = getGoldItemsAPI();
    
    if (api) {
      const result = await api.list();
      
      if (result && result.success) {
        // تحويل أسماء الحقول من snake_case إلى camelCase
        itemsData = (result.data || []).map(item => ({
          id: item.id,
          name: item.name,
          nameEn: item.name_en,
          section: item.section || 'mashghulat',
          defaultKarat: item.default_karat,
          purity: item.purity || 0,
          status: item.status,
          description: item.description
        }));
      } else {
        itemsData = [];
      }
    } else {
      itemsData = [];
    }
    
    // بعد تحميل البيانات، عرض العيارات والأصناف مع الحفاظ على العيار المحدد
    const savedKarat = currentKarat;
    renderKarats();
    // إعادة تحديد العيار السابق إذا كان موجوداً
    if (savedKarat) {
      const karatItem = document.querySelector(`.karat-item[data-karat="${savedKarat}"]`);
      if (karatItem) {
        document.querySelectorAll('.karat-item').forEach(i => i.classList.remove('active'));
        karatItem.classList.add('active');
        currentKarat = savedKarat;
        filterItemsByKarat();
      }
    }
    updateStats();
  } catch (error) {
    showToast(t('toastError'), 'error');
  } finally {
    if (loadingIndicator) loadingIndicator.style.display = 'none';
  }
}

// Render items table
function renderItems(filteredItems = null) {
  const tableBody = document.getElementById('itemsTableBody');
  const emptyState = document.getElementById('emptyState');
  const table = document.getElementById('itemsTable');
  const itemsCount = document.getElementById('itemsCount');
  
  const items = filteredItems !== null ? filteredItems : itemsData;
  
  if (items.length === 0) {
    if (table) table.style.display = 'none';
    if (emptyState) emptyState.style.display = 'flex';
    if (itemsCount) itemsCount.textContent = t('itemsCount').replace('{count}', '0');
    return;
  }
  
  if (table) table.style.display = 'table';
  if (emptyState) emptyState.style.display = 'none';
  if (itemsCount) itemsCount.textContent = t('itemsCount').replace('{count}', items.length);

  const canEdit = window.ScreenPermissions ? window.ScreenPermissions.has('gold_items_edit') : true;
  const canDelete = window.ScreenPermissions ? window.ScreenPermissions.has('gold_items_delete') : true;
  
  tableBody.innerHTML = items.map(item => `
    <tr data-id="${item.id}">
      <td><strong>#${item.id}</strong></td>
      <td>${item.name}</td>
      <td>${item.nameEn || '-'}</td>
      <td>${item.description || '-'}</td>
      <td><span class="purity-badge">${item.purity || '-'}</span></td>
      <td>
        <span class="status-badge ${item.status}">
          <i class="fa-solid fa-${item.status === 'active' ? 'check-circle' : 'pause-circle'}"></i>
          ${item.status === 'active' ? t('statusActive') : t('statusInactive')}
        </span>
      </td>
      <td>
        <div class="action-buttons">
          ${canEdit ? `
          <button class="btn-edit" onclick="editItem(${item.id})" title="${t('modalTitleEdit')}">
            <i class="fa-solid fa-pen"></i>
          </button>
          ` : ''}
          ${canDelete ? `
          <button class="btn-delete" onclick="deleteItem(${item.id})" title="${t('deleteConfirm')}">
            <i class="fa-solid fa-trash"></i>
          </button>
          ` : ''}
        </div>
      </td>
    </tr>
  `).join('');
}

// Update statistics
function updateStats() {
  const totalValue = document.getElementById('statTotalValue');
  const activeValue = document.getElementById('statActiveValue');
  
  // إحصائيات القسم الحالي فقط
  const sectionItems = itemsData.filter(i => i.section === currentSection);
  
  if (totalValue) totalValue.textContent = sectionItems.length;
  if (activeValue) activeValue.textContent = sectionItems.filter(i => i.status === 'active').length;
}

// Handle search
function handleSearch() {
  const searchTerm = document.getElementById('searchInput')?.value.toLowerCase().trim();
  
  if (!searchTerm) {
    filterItemsByKarat();
    return;
  }
  
  // Filter by search term AND current section AND current karat
  let filtered = itemsData.filter(item => item.section === currentSection);
  
  if (currentKarat) {
    filtered = filtered.filter(item => item.defaultKarat === currentKarat);
  }
  
  filtered = filtered.filter(item => 
    item.name.toLowerCase().includes(searchTerm) ||
    (item.nameEn && item.nameEn.toLowerCase().includes(searchTerm)) ||
    item.id.toString().includes(searchTerm)
  );
  
  renderItems(filtered);
}

// تحديث كومبو العيار بناءً على القسم المحدد
function updateKaratSelect() {
  const select = document.getElementById('defaultKarat');
  if (!select) return;
  
  const karats = karatsData[currentSection] || [];
  const isAr = (currentLang || 'ar') === 'ar';
  const karatUnit = t('karatUnit');
  const getLabel = (type, karat) => {
    if (type === 'mashghulat') return t('labelCrafted');
    if (type === 'kasr') return karat === 24 ? t('labelPure') : t('labelScrap');
    if (type === 'silver') {
      if (karat === 999) return t('labelSilverFine');
      if (karat === 925) return t('labelSilverSterling');
      return t('labelSilver');
    }
    return '';
  };
  select.innerHTML = karats.map((k, index) => {
    const suffix = getLabel(currentSection, k.karat);
    const text = currentSection === 'silver'
      ? `${suffix} ${k.karat}`
      : `${isAr ? 'عيار ' + k.karat : k.karat + karatUnit} ${suffix}`;
    return `<option value="${k.karat}" ${index === 0 ? 'selected' : ''}>${text}</option>`;
  }).join('');
}

// Open add modal
async function openAddModal() {
  if (window.ScreenPermissions && !window.ScreenPermissions.check('gold_items_add', 'إضافة صنف')) {
    return;
  }

  editingItemId = null;
  document.getElementById('modalTitle').textContent = t('modalTitleAdd');
  document.getElementById('modalTitle').querySelector('i')?.classList.replace('fa-pen', 'fa-gem');
  
  // Reset form
  itemForm?.reset();
  
  // Generate new ID (prefer backend sqlite_sequence to respect AUTOINCREMENT after deletions)
  let nextId = null;
  try {
    const api = getGoldItemsAPI();
    if (api && typeof api.getNextId === 'function') {
      const res = await api.getNextId();
      if (res && res.success && res.nextId) {
        nextId = Number(res.nextId);
      }
    }
  } catch (e) { /* fallback below */ }
  if (!nextId || isNaN(nextId) || nextId <= 0) {
    const maxId = itemsData.length > 0 ? Math.max(...itemsData.map(i => Number(i.id) || 0)) : 0;
    nextId = maxId + 1;
  }
  document.getElementById('itemId').value = nextId;
  
  // تحديث كومبو العيار بناءً على القسم المحدد
  updateKaratSelect();
  
  // Set defaults
  document.getElementById('itemStatus').value = 'active';
  document.getElementById('itemPurity').value = '';
  
  // تحديد العيار الحالي في الكومبو إذا كان محدداً
  if (currentKarat) {
    document.getElementById('defaultKarat').value = currentKarat;
  }
  
  itemModal?.classList.add('active');
  document.getElementById('itemName')?.focus();
}

// Edit item
function editItem(id) {
  const item = itemsData.find(i => i.id === id);
  if (!item) return;

  if (window.ScreenPermissions && !window.ScreenPermissions.check('gold_items_edit', 'تعديل صنف')) {
    return;
  }
  
  editingItemId = id;
  document.getElementById('modalTitle').textContent = t('modalTitleEdit');
  
  // تحديث كومبو العيار بناءً على القسم المحدد
  updateKaratSelect();
  
  // Fill form
  document.getElementById('itemId').value = item.id;
  document.getElementById('itemName').value = item.name;
  document.getElementById('itemNameEn').value = item.nameEn || '';
  document.getElementById('defaultKarat').value = item.defaultKarat;
  document.getElementById('itemStatus').value = item.status;
  document.getElementById('itemPurity').value = item.purity || '';
  document.getElementById('itemDescription').value = item.description || '';
  
  itemModal?.classList.add('active');
  document.getElementById('itemName')?.focus();
}

// Close item modal
function closeItemModal() {
  itemModal?.classList.remove('active');
  editingItemId = null;
}

// Save item
async function saveItem() {
  if (window.ScreenPermissions) {
    const requiredPermission = editingItemId ? 'gold_items_edit' : 'gold_items_add';
    const actionName = editingItemId ? 'تعديل صنف' : 'إضافة صنف';
    if (!window.ScreenPermissions.check(requiredPermission, actionName)) {
      return;
    }
  }

  const name = document.getElementById('itemName')?.value.trim();
  const nameEn = document.getElementById('itemNameEn')?.value.trim();
  const defaultKarat = parseInt(document.getElementById('defaultKarat')?.value);
  const status = document.getElementById('itemStatus')?.value;
  const description = document.getElementById('itemDescription')?.value.trim();
  const purity = parseFloat(document.getElementById('itemPurity')?.value) || 0;
  
  if (!name) {
    showToast(t('toastNameRequired'), 'error');
    document.getElementById('itemName')?.focus();
    return;
  }
  
  const itemId = parseInt(document.getElementById('itemId')?.value, 10) || null;
  
  const itemData = {
    id: itemId,
    name,
    nameEn,
    section: currentSection,
    defaultKarat,
    purity,
    status,
    description
  };
  
  try {
    const api = getGoldItemsAPI();
    if (api) {
      const result = await api.save(itemData);
      if (!result.success) {
        showToast(result.error || t('toastError'), 'error');
        return;
      }
      // تحديث الـ id للصنف الجديد
      if (!editingItemId && result.id) {
        itemData.id = result.id;
      }
    }
    
    // إعادة تحميل البيانات من قاعدة البيانات
    await loadItems();
    
    closeItemModal();
    showToast(t('toastSaveSuccess'), 'success');
  } catch (error) {
    showToast(t('toastError'), 'error');
  }
}

// Delete item
let deleteItemId = null;

function deleteItem(id) {
  const item = itemsData.find(i => i.id === id);
  if (!item) return;

  if (window.ScreenPermissions && !window.ScreenPermissions.check('gold_items_delete', 'حذف صنف')) {
    return;
  }
  
  deleteItemId = id;
  document.getElementById('deleteItemName').textContent = item.name;
  deleteModal?.classList.add('active');
}

// Close delete modal
function closeDeleteModal() {
  deleteModal?.classList.remove('active');
  deleteItemId = null;
}

// Confirm delete
async function confirmDelete() {
  if (!deleteItemId) return;

  if (window.ScreenPermissions && !window.ScreenPermissions.check('gold_items_delete', 'حذف صنف')) {
    return;
  }
  
  try {
    const api = getGoldItemsAPI();
    if (api) {
      const result = await api.remove(deleteItemId);
      if (!result.success) {
        showToast(result.error || t('toastError'), 'error');
        return;
      }
    }
    
    // إعادة تحميل البيانات من قاعدة البيانات
    await loadItems();
    
    closeDeleteModal();
    showToast(t('toastDeleteSuccess'), 'success');
  } catch (error) {
    showToast(t('toastError'), 'error');
  }
}

// Show toast notification
function showToast(message, type = 'info') {
  const toastWrap = document.getElementById('toastWrap');
  if (!toastWrap) return;
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="fa-solid fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
    <span>${message}</span>
  `;
  
  toastWrap.appendChild(toast);
  
  // Animate in
  setTimeout(() => toast.classList.add('show'), 10);
  
  // Remove after delay
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Make functions globally available
window.editItem = editItem;
window.deleteItem = deleteItem;

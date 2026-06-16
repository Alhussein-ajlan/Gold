// Ensure bridge APIs are available
function ensureAPIBridge() {
  try {
    const pick = (name) => {
      if (!window[name]) {
        if (window.parent && window.parent !== window && window.parent[name]) {
          window[name] = window.parent[name];
        } else if (window.top && window.top !== window && window.top[name]) {
          window[name] = window.top[name];
        } else if (window.parent && window.parent.parent && window.parent.parent !== window && window.parent.parent[name]) {
          window[name] = window.parent.parent[name];
        }
      }
    };
    ['db', 'api', 'sys', 'customers', 'suppliers', 'orders', 'permissions'].forEach(pick);
  } catch (_) {}
}

async function waitForOrdersScreenReady(timeoutMs = 2500, intervalMs = 50) {
  const startedAt = Date.now();
  while ((Date.now() - startedAt) < timeoutMs) {
    ensureAPIBridge();
    const permissionsReady = !window.ScreenPermissions || permissionsInitialized;
    const ordersReady = !!window.orders && typeof window.orders.list === 'function';
    if (permissionsReady && ordersReady) {
      return true;
    }
    await new Promise(resolve => setTimeout(resolve, intervalMs));
  }

  ensureAPIBridge();
  return (!window.ScreenPermissions || permissionsInitialized) && !!window.orders && typeof window.orders.list === 'function';
}

function getCurrentUserDisplayName() {
  try {
    const user = window.ScreenPermissions?.getUser?.() || JSON.parse(localStorage.getItem('currentUser') || '{}');
    return String(user?.full_name || user?.full_name_en || user?.username || '').trim();
  } catch (_) {
    return '';
  }
}

function syncCompletedOrdersNotifications(orders) {
  try {
    const completedIds = (orders || [])
      .filter(order => order && order.status === 'completed' && order.id !== null && order.id !== undefined)
      .map(order => String(order.id));

    const uniqueCompletedIds = Array.from(new Set(completedIds));
    const baselineExists = localStorage.getItem(ORDERS_NOTIF_SEEN_KEY) !== null;

    if (!baselineExists) {
      writeSeenCompletedOrderIds(uniqueCompletedIds);
      return;
    }

    const seen = new Set(readSeenCompletedOrderIds());
    const newCompleted = uniqueCompletedIds.filter(id => !seen.has(id));

    if (newCompleted.length > 0) {
      const latestId = Number(newCompleted[newCompleted.length - 1] || 0);
      notifyOrderCompletedUnread(newCompleted.length, {
        documentId: Number.isFinite(latestId) && latestId > 0 ? latestId : null,
      });
    }

    newCompleted.forEach(id => seen.add(id));
    writeSeenCompletedOrderIds(Array.from(seen));
  } catch (_) {}
}
ensureAPIBridge();

let permissionsInitialized = false;
(async function() {
  if (window.ScreenPermissions) {
    await window.ScreenPermissions.init();
    permissionsInitialized = true;
  }
})();

const ORDERS_TRANSLATIONS = {
  ar: {
    title: 'الأوردرات',
    actions: {
      close: 'إغلاق',
      cancel: 'إلغاء',
      refresh: 'تحديث',
      exportExcel: 'تصدير Excel',
      exportPdf: 'تصدير PDF',
      print: 'طباعة'
    },
    search: { orders: 'بحث عن أوردر...' },
    orders: {
      stats: {
        total: 'إجمالي الأوردرات',
        pending: 'الأوردرات المعلقة',
        completed: 'الأوردرات المكتملة',
        expired: 'الأوردرات المنتهية'
      },
      listTitle: 'قائمة الأوردرات',
      add: 'إضافة أوردر',
      table: {
        selectAll: 'تحديد الكل',
        orderNo: 'رقم الأوردر',
        entityName: 'إسم العميل / المورد',
        createdDate: 'تاريخ الإنشاء',
        dueDate: 'تاريخ الانتهاء',
        type: 'نوع الأوردر',
        status: 'الحالة',
        weight: 'الوزن',
        ounce: 'الأونصة',
        proximity: 'القرب',
        executionDate: 'تاريخ التنفيذ',
        executionTime: 'الوقت',
        actions: 'الإجراءات',
        empty: 'لا توجد أوردرات لعرضها'
      },
      proximity: {
        immediate: 'تنفيذ فوري',
        veryClose: 'قريب جداً',
        close: 'قريب',
        medium: 'متوسط',
        far: 'بعيد',
        completed: 'مكتمل',
        expired: 'منتهي',
        noPrice: 'لا يوجد سعر'
      },
      actionsLabels: { complete: 'تنفيذ', retry: 'إعادة المحاولة', edit: 'تعديل', delete: 'حذف' },
      statusLabels: {
        pending: 'معلق',
        completed: 'منفذ',
        cancelled: 'ملغي',
        failed: 'فشل',
        processing: 'قيد التنفيذ',
        expired: 'منتهي الصلاحية',
        unknown: 'غير محدد'
      },
      mt5: { flagged: 'محدد للتنفيذ على MT5', placed: 'تم وضعها (معلقة) على MT5', executed: 'تم تنفيذها على MT5' }
    },
    lookup: {
      cancel: 'إلغاء',
      customer: {
        title: 'اختر عميل',
        searchLabel: 'بحث عن عميل',
        placeholder: 'اكتب رقم العميل أو اسم العميل للبحث',
        id: 'رقم العميل',
        name: 'اسم العميل'
      },
      supplier: {
        title: 'اختر مورد',
        searchLabel: 'بحث عن مورد',
        placeholder: 'اكتب رقم المورد أو اسم المورد للبحث',
        id: 'رقم المورد',
        name: 'اسم المورد'
      }
    },
    orderModal: {
      title: 'إدارة الأوردرات',
      add: 'إضافة أوردر جديد',
      editTitle: 'تعديل الأوردر رقم {id}',
      operationTypeLabel: 'نوع الأوردر',
      sellLabel: 'بيع LIMIT',
      buyLabel: 'شراء LIMIT',
      customerId: 'رقم العميل',
      customerPlaceholder: 'F9 للبحث',
      customerTitle: 'اضغط F9 للبحث عن عميل',
      supplierId: 'رقم المورد',
      supplierPlaceholder: 'F9 للبحث',
      supplierTitle: 'اضغط F9 للبحث عن مورد',
      nameLabel: 'الاسم',
      namePlaceholder: 'اسم العميل / المورد',
      weightLabel: 'الوزن (جرام)',
      weightPlaceholder: '0.00',
      ounceLabel: 'الأونصة',
      ouncePlaceholder: '0.000',
      additionLabel: 'الإضافة',
      additionPlaceholder: '0.000',
      createdDate: 'تاريخ الإنشاء',
      completionDate: 'تاريخ الانتهاء',
      executeOnMt5Label: 'تنفيذ على MT5',
      executeOnMt5Desc: 'إذا كان مغلقاً سيتم تنفيذ الأوردر في النظام المحلي فقط',
      notesLabel: 'ملاحظات',
      notesPlaceholder: 'أدخل أي ملاحظات إضافية...',
      save: 'حفظ الأوردر'
    },
    operation: { sellCode: 'SELL LIMIT', sellLabel: 'بيع معلق', buyCode: 'BUY LIMIT', buyLabel: 'شراء معلق' },
    toast: {
      refreshOrders: 'تم تحديث الأوردرات',
      exportOrdersSuccess: 'تم تصدير الأوردرات إلى Excel بنجاح',
      preparePdf: 'يتم تحضير ملف PDF...',
      deleteOrder: 'تم حذف الأوردر بنجاح',
      completeOrder: '✅ تم تنفيذ الأوردر على MT5',
      completeOrderLocal: '✅ تم تنفيذ الأوردر محلياً',
      updateOrder: '✅ تم تحديث الأوردر رقم {id} بنجاح',
      addOrder: '✅ تم إنشاء الأوردر رقم {id} بنجاح'
    },
    error: {
      ordersApiUnavailable: 'خطأ: واجهة الأوردرات غير متاحة. تحقق من الإعدادات',
      ordersListUnavailable: 'خطأ: دالة تحميل الأوردرات غير متاحة',
      ordersLoadFail: 'فشل تحميل الأوردرات: {error}',
      genericLoad: 'حدث خطأ في تحميل البيانات',
      ordersTableMissing: 'لا يوجد جدول للتصدير',
      ordersNoData: 'لا توجد أوردرات للتصدير',
      ordersPdfFail: 'حدث خطأ أثناء إنشاء PDF',
      export: 'حدث خطأ أثناء التصدير',
      orderDataFail: 'فشل في تحميل بيانات الأوردر',
      orderUpdateFail: 'فشل في تحديث الأوردر: {error}',
      orderAddFail: 'فشل في إضافة الأوردر: {error}',
      orderDeleteFail: 'فشل في حذف الأوردر: {error}',
      orderCompleteFail: 'فشل في تنفيذ الأوردر: {error}',
      cannotDeleteCompleted: 'لا يمكن حذف أوردر مكتمل',
      unknown: 'خطأ غير معروف',
      customerNotFound: 'رقم العميل غير موجود',
      supplierNotFound: 'رقم المورد غير موجود',
      customerFetchFail: 'خطأ في جلب بيانات العميل',
      supplierFetchFail: 'خطأ في جلب بيانات المورد'
    },
    validation: {
      operationType: 'الرجاء اختيار نوع العملية (بيع أو شراء)',
      customerName: 'الرجاء إدخال اسم العميل / المورد',
      weight: 'الرجاء إدخال الوزن (يجب أن يكون أكبر من صفر)',
      ounce: 'الرجاء إدخال الأونصة (يجب أن تكون أكبر من صفر)',
      createdDate: 'الرجاء إدخال تاريخ الإنشاء',
      mt5BuyLimitPrice: 'سعر شراء LIMIT يجب أن يكون أقل من سعر السوق الحالي ({market})',
      mt5SellLimitPrice: 'سعر بيع LIMIT يجب أن يكون أكبر من سعر السوق الحالي ({market})',
      mt5LimitPriceNoMarket: 'لا يمكن التحقق من السعر لأن سعر السوق غير متاح. الرجاء تحديث سعر الذهب',
      completionDateAfterCreated: 'تاريخ الانتهاء يجب أن يكون بعد تاريخ الإنشاء'
    },
    confirm: {
      title: 'تأكيد العملية',
      message: 'هل أنت متأكد من هذه العملية؟',
      cancel: 'إلغاء الأمر',
      ok: 'موافق',
      deleteOrderTitle: 'تأكيد الحذف',
      deleteOrderMessage: 'هل أنت متأكد من حذف هذا الأوردر؟',
      completeOrderTitle: 'تأكيد تنفيذ الأوردر',
      completeOrderMessage: 'هل تريد تنفيذ هذا الأوردر على MT5؟',
      completeOrderLocalTitle: 'تأكيد التنفيذ المحلي',
      completeOrderLocalMessage: 'هل تريد تنفيذ هذا الأوردر في النظام المحلي فقط؟'
    },
    file: { orders: 'الأوردرات' },
    permissions: {
      ordersView: 'عرض الأوردرات',
      ordersAdd: 'إضافة أوردر',
      ordersExport: 'تصدير الأوردرات',
      ordersEdit: 'تعديل الأوردر',
      ordersDelete: 'حذف الأوردر'
    }
  },
  en: {
    title: 'Orders',
    actions: {
      close: 'Close',
      cancel: 'Cancel',
      refresh: 'Refresh',
      exportExcel: 'Export Excel',
      exportPdf: 'Export PDF',
      print: 'Print'
    },
    search: { orders: 'Search order...' },
    orders: {
      stats: { total: 'Total orders', pending: 'Pending orders', completed: 'Completed orders' },
      listTitle: 'Orders list',
      add: 'Add order',
      table: {
        selectAll: 'Select all',
        orderNo: 'Order No.',
        entityName: 'Customer / Supplier',
        createdDate: 'Created date',
        dueDate: 'Due date',
        type: 'Order type',
        status: 'Status',
        weight: 'Weight',
        ounce: 'Ounce',
        proximity: 'Proximity',
        executionDate: 'Execution date',
        executionTime: 'Time',
        actions: 'Actions',
        empty: 'No orders to display'
      },
      proximity: {
        immediate: 'Execute Now',
        veryClose: 'Very Close',
        close: 'Close',
        medium: 'Medium',
        far: 'Far',
        completed: 'Completed',
        expired: 'Expired',
        noPrice: 'No Price'
      },
      actionsLabels: { complete: 'Execute', retry: 'Retry', edit: 'Edit', delete: 'Delete' },
      statusLabels: { pending: 'Pending', completed: 'Executed', cancelled: 'Cancelled', failed: 'Failed', processing: 'Processing', expired: 'Expired', unknown: 'Unknown' },
      mt5: { flagged: 'Will execute on MT5', placed: 'Placed (pending) on MT5', executed: 'Executed on MT5' }
    },
    lookup: {
      cancel: 'Cancel',
      customer: { title: 'Select customer', searchLabel: 'Search customer', placeholder: 'Type customer id or name', id: 'Customer ID', name: 'Customer name' },
      supplier: { title: 'Select supplier', searchLabel: 'Search supplier', placeholder: 'Type supplier id or name', id: 'Supplier ID', name: 'Supplier name' }
    },
    orderModal: {
      title: 'Add new order',
      editTitle: 'Edit order #{id}',
      operationTypeLabel: 'Order type',
      sellLabel: 'Sell Limit',
      buyLabel: 'Buy Limit',
      customerId: 'Customer ID',
      customerPlaceholder: 'F9 to search',
      customerTitle: 'Press F9 to search for a customer',
      supplierId: 'Supplier ID',
      supplierPlaceholder: 'F9 to search',
      supplierTitle: 'Press F9 to search for a supplier',
      nameLabel: 'Name',
      namePlaceholder: 'Customer / Supplier name',
      weightLabel: 'Weight (grams)',
      weightPlaceholder: '0.00',
      ounceLabel: 'Ounce',
      ouncePlaceholder: '0.000',
      additionLabel: 'Addition',
      additionPlaceholder: '0.000',
      createdDate: 'Created date',
      completionDate: 'Due date',
      executeOnMt5Label: 'Execute on MT5',
      executeOnMt5Desc: 'When off, the order will be completed locally only',
      notesLabel: 'Notes',
      notesPlaceholder: 'Enter any additional notes...',
      save: 'Save order'
    },
    operation: { sellCode: 'SELL LIMIT', sellLabel: 'Sell Limit', buyCode: 'BUY LIMIT', buyLabel: 'Buy Limit' },
    toast: {
      refreshOrders: 'Orders refreshed',
      exportOrdersSuccess: 'Orders exported successfully',
      preparePdf: 'Preparing PDF...',
      deleteOrder: 'Order deleted successfully',
      completeOrder: '✅ Order executed on MT5',
      completeOrderLocal: 'Order completed locally',
      updateOrder: 'Order #{id} updated successfully',
      addOrder: 'Order #{id} created successfully'
    },
    error: {
      ordersApiUnavailable: 'Orders API is not available',
      ordersListUnavailable: 'Orders list function is not available',
      ordersLoadFail: 'Failed to load orders: {error}',
      genericLoad: 'Error loading data',
      ordersTableMissing: 'Orders table not found',
      ordersNoData: 'No orders to export',
      ordersPdfFail: 'Error generating PDF',
      export: 'Export error',
      orderDataFail: 'Failed to load order data',
      orderUpdateFail: 'Failed to update order: {error}',
      orderAddFail: 'Failed to add order: {error}',
      orderDeleteFail: 'Failed to delete order: {error}',
      orderCompleteFail: 'Failed to update order status: {error}',
      cannotDeleteCompleted: 'Cannot delete a completed order',
      unknown: 'Unknown error',
      customerNotFound: 'Customer not found',
      supplierNotFound: 'Supplier not found',
      customerFetchFail: 'Failed to fetch customer',
      supplierFetchFail: 'Failed to fetch supplier'
    },
    validation: {
      operationType: 'Please select operation type',
      customerName: 'Please select customer/supplier',
      weight: 'Please enter weight (> 0)',
      ounce: 'Please enter ounce (> 0)',
      createdDate: 'Please enter created date',
      mt5BuyLimitPrice: 'Buy limit price must be below current market price ({market})',
      mt5SellLimitPrice: 'Sell limit price must be above current market price ({market})',
      mt5LimitPriceNoMarket: 'Cannot validate price because market price is not available. Please refresh XAU price',
      completionDateAfterCreated: 'Completion date must be after creation date'
    },
    confirm: {
      title: 'Confirm',
      message: 'Are you sure?',
      cancel: 'Cancel',
      ok: 'OK',
      deleteOrderTitle: 'Confirm delete',
      deleteOrderMessage: 'Are you sure you want to delete this order?',
      completeOrderTitle: 'Confirm Order Execution',
      completeOrderMessage: 'Execute this order on MT5?',
      completeOrderLocalTitle: 'Confirm Local Execution',
      completeOrderLocalMessage: 'Mark this order as completed locally only?'
    },
    file: { orders: 'orders' },
    permissions: { ordersView: 'View orders', ordersAdd: 'Add order', ordersExport: 'Orders export', ordersEdit: 'Edit order', ordersDelete: 'Delete order' }
  }
};

function getOrdersLang() {
  try {
    const stored = localStorage.getItem('uiLang');
    return stored === 'en' ? 'en' : 'ar';
  } catch (_) {
    return 'ar';
  }
}

function isOrdersRtl() {
  return getOrdersLang() === 'ar';
}

function resolveTranslation(obj, path) {
  return String(path)
    .split('.')
    .reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
}

function tOrders(key) {
  const lang = getOrdersLang();
  const val = resolveTranslation(ORDERS_TRANSLATIONS[lang] || {}, key);
  if (val !== undefined) return val;
  const fallback = resolveTranslation(ORDERS_TRANSLATIONS.ar, key);
  return fallback !== undefined ? fallback : key;
}

function tOrdersFmt(key, params = {}) {
  let str = tOrders(key);
  Object.entries(params).forEach(([k, v]) => {
    const re = new RegExp(`{${k}}`, 'g');
    str = String(str).replace(re, v);
  });
  return str;
}

const ORDERS_NOTIF_UNREAD_KEY = 'ordersCompletedUnreadCount';
const ORDERS_NOTIF_SEEN_KEY = 'ordersCompletedSeenIds';

function readSeenCompletedOrderIds() {
  try {
    const raw = localStorage.getItem(ORDERS_NOTIF_SEEN_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(id => String(id)).filter(Boolean);
  } catch (_) {
    return [];
  }
}

function writeSeenCompletedOrderIds(ids) {
  try {
    const uniqueIds = Array.from(new Set((ids || []).map(id => String(id)).filter(Boolean)));
    localStorage.setItem(ORDERS_NOTIF_SEEN_KEY, JSON.stringify(uniqueIds));
  } catch (_) {}
}

function markCompletedOrdersAsSeen(ids) {
  const seen = new Set(readSeenCompletedOrderIds());
  (ids || []).forEach(id => {
    if (id !== null && id !== undefined) {
      seen.add(String(id));
    }
  });
  writeSeenCompletedOrderIds(Array.from(seen));
}

function toastSuccessKey(key, params) {
  showToast('success', tOrdersFmt(key, params));
}

function notifyOrderCompletedUnread(delta = 1, meta = {}) {
  const normalizedDelta = Math.max(1, Number(delta) || 1);
  try {
    const current = Math.max(0, Number(localStorage.getItem(ORDERS_NOTIF_UNREAD_KEY)) || 0);
    localStorage.setItem(ORDERS_NOTIF_UNREAD_KEY, String(current + normalizedDelta));
  } catch (_) {}

  const payload = {
    type: 'orders-completed-notification',
    delta: normalizedDelta,
    documentId: Number(meta?.documentId || meta?.id || 0) || null,
    userName: String(meta?.userName || '').trim() || getCurrentUserDisplayName(),
  };
  try {
    if (window.parent && window.parent !== window) {
      window.parent.postMessage(payload, '*');
    }
    if (window.top && window.top !== window && window.top !== window.parent) {
      window.top.postMessage(payload, '*');
    }
  } catch (_) {}
}

function toastInfoKey(key, params = {}) {
  showToast('success', tOrdersFmt(key, params));
}

function toastErrorKey(key, params = {}) {
  showToast('error', tOrdersFmt(key, params));
}

function formatNumber(value, decimals = 2) {
  if (value == null || isNaN(value)) return '0';
  return Number(value).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

/**
 * Calculate proximity level between order target price and current XAU price
 * @param {number} targetPrice - Order ounce target price
 * @param {number} currentPrice - Current XAU price from lastXauPrice
 * @param {string} status - Order status
 * @returns {object} { level, label, icon, class, diff, percent, approaching }
 */
function calcProximity(targetPrice, currentPrice, status) {
  // If order is completed, show completed status
  if (status === 'completed') {
    return {
      level: 'completed',
      label: tOrders('orders.proximity.completed'),
      icon: 'fa-circle-check',
      class: 'proximity-completed',
      diff: 0,
      percent: 0,
      approaching: false
    };
  }
  
  // If order is expired, show expired status
  if (status === 'expired') {
    return {
      level: 'expired',
      label: tOrders('orders.proximity.expired'),
      icon: 'fa-clock-rotate-left',
      class: 'proximity-expired',
      diff: 0,
      percent: 0,
      approaching: false
    };
  }
  
  // If no price available
  if (!currentPrice || !targetPrice || targetPrice <= 0) {
    return {
      level: 'noPrice',
      label: tOrders('orders.proximity.noPrice'),
      icon: 'fa-circle-question',
      class: 'proximity-unknown',
      diff: 0,
      percent: 0,
      approaching: false
    };
  }
  
  const diff = targetPrice - currentPrice;
  const absDiff = Math.abs(diff);
  const percent = (absDiff / currentPrice) * 100;
  const approaching = diff > 0; // Price needs to go UP to reach target
  
  let level, label, icon, cls;
  
  if (percent < 0.1) {
    // < 0.1% = Execute immediately
    level = 'immediate';
    label = tOrders('orders.proximity.immediate');
    icon = 'fa-bolt';
    cls = 'proximity-immediate';
  } else if (percent < 0.3) {
    // 0.1% - 0.3% = Very close
    level = 'veryClose';
    label = tOrders('orders.proximity.veryClose');
    icon = 'fa-angles-up';
    cls = 'proximity-very-close';
  } else if (percent < 0.5) {
    // 0.3% - 0.5% = Close
    level = 'close';
    label = tOrders('orders.proximity.close');
    icon = 'fa-crosshairs';
    cls = 'proximity-close';
  } else if (percent < 1.0) {
    // 0.5% - 1% = Medium
    level = 'medium';
    label = tOrders('orders.proximity.medium');
    icon = 'fa-location-dot';
    cls = 'proximity-medium';
  } else {
    // > 1% = Far
    level = 'far';
    label = tOrders('orders.proximity.far');
    icon = 'fa-globe';
    cls = 'proximity-far';
  }
  
  return { level, label, icon, class: cls, diff, percent, approaching };
}

/**
 * Update all proximity indicators in the orders table when XAU price changes
 * @param {number} currentPrice - Current XAU price
 */
function updateProximityIndicators(currentPrice) {
  const indicators = document.querySelectorAll('.proximity-indicator[data-order-id]');
  if (!indicators.length) return;
  
  indicators.forEach(indicator => {
    const row = indicator.closest('tr');
    if (!row) return;
    
    // Get ounce value from the ounce column (8th td, 0-indexed = 7)
    const cells = row.querySelectorAll('td');
    if (cells.length < 9) return;
    
    const ounceText = cells[7]?.textContent?.replace(/,/g, '') || '0';
    const targetPrice = parseFloat(ounceText) || 0;
    
    // Check order status by looking at status icon
    const statusCell = cells[5];
    const isCompleted = statusCell?.querySelector('.status-icon .fa-circle-check') !== null;
    const isExpired = statusCell?.querySelector('.status-icon .fa-clock-rotate-left') !== null;
    const status = isCompleted ? 'completed' : (isExpired ? 'expired' : 'pending');
    
    const prox = calcProximity(targetPrice, currentPrice, status);
    const proxSign = prox.diff > 0 ? '+' : '';
    const proxTooltip = prox.level !== 'noPrice' && prox.level !== 'completed' && prox.level !== 'expired'
      ? `${proxSign}$${prox.diff.toFixed(2)} (${prox.percent.toFixed(2)}%)`
      : prox.label;
    
    // Update indicator classes
    indicator.className = `proximity-indicator ${prox.class}`;
    indicator.title = proxTooltip;
    
    // Update icon
    const iconEl = indicator.querySelector('.proximity-icon i');
    if (iconEl) {
      iconEl.className = `fa-solid ${prox.icon}`;
    }
    
    // Update label
    const labelEl = indicator.querySelector('.proximity-label');
    if (labelEl) {
      labelEl.textContent = prox.label;
    }
    
    // Update diff
    const diffEl = indicator.querySelector('.proximity-diff');
    if (prox.level !== 'noPrice' && prox.level !== 'completed') {
      if (diffEl) {
        diffEl.textContent = `${proxSign}$${Math.abs(prox.diff).toFixed(2)}`;
      } else {
        // Create diff element if doesn't exist
        const infoEl = indicator.querySelector('.proximity-info');
        if (infoEl) {
          const newDiff = document.createElement('span');
          newDiff.className = 'proximity-diff';
          newDiff.textContent = `${proxSign}$${Math.abs(prox.diff).toFixed(2)}`;
          infoEl.appendChild(newDiff);
        }
      }
    } else if (diffEl) {
      diffEl.remove();
    }
  });
}

const XAU_TEXT = {
  ar: {
    xauTitleText: 'سعر أونصة الذهب',
    xauSubText: 'XAU/USD (Spot)',
    btnRefreshXauText: 'تحديث',
    btnMt5ReconnectXauText: 'إعادة اتصال MT5',
    xauLastUpdateLabel: 'آخر تحديث',
    xauEventTimeLabel: 'موعد الحدث',
    marketOpen: 'مفتوح',
    marketClosed: 'مغلق',
    closesIn: 'يغلق بعد',
    opensIn: 'يفتح بعد',
    offlineHintNotAvailable: 'آخر تحديث: — (غير متاح)',
    offlineHintFailed: 'آخر تحديث: — (فشل الاتصال)',
    offlineHintUpdating: 'آخر تحديث: جاري التحديث...',
    sourceMeta: 'المصدر: Yahoo Finance · وقت السوق حسب نيويورك'
  },
  en: {
    xauTitleText: 'Gold ounce price',
    xauSubText: 'XAU/USD (Spot)',
    btnRefreshXauText: 'Refresh',
    btnMt5ReconnectXauText: 'Reconnect MT5',
    xauLastUpdateLabel: 'Last update',
    xauEventTimeLabel: 'Event time',
    marketOpen: 'Open',
    marketClosed: 'Closed',
    closesIn: 'Closes in',
    opensIn: 'Opens in',
    offlineHintNotAvailable: 'Last update: — (not available)',
    offlineHintFailed: 'Last update: — (connection failed)',
    offlineHintUpdating: 'Last update: updating...',
    sourceMeta: 'Source: Yahoo Finance · Market time based on New York'
  }
};

function tXau(key) {
  const lang = getOrdersLang();
  const dict = XAU_TEXT[lang] || XAU_TEXT.ar;
  return dict[key] || (XAU_TEXT.ar && XAU_TEXT.ar[key]) || '';
}

function applyXauStaticTexts() {
  const ids = [
    'xauTitleText',
    'xauSubText',
    'btnRefreshXauText',
    'btnMt5ReconnectXauText',
    'xauLastUpdateLabel',
    'xauEventTimeLabel'
  ];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const txt = tXau(id);
    if (txt) el.textContent = txt;
  });
}

function applyOrdersStaticTexts() {
  const lang = getOrdersLang();
  const rtl = isOrdersRtl();
  document.documentElement.lang = lang;
  document.documentElement.dir = rtl ? 'rtl' : 'ltr';
  document.body.style.direction = rtl ? 'rtl' : 'ltr';

  const attrMappings = [
    { attr: 'data-i18n', apply: (el, val) => { el.textContent = val; } },
    { attr: 'data-i18n-placeholder', apply: (el, val) => { el.setAttribute('placeholder', val); } },
    { attr: 'data-i18n-title', apply: (el, val) => { el.setAttribute('title', val); } },
    { attr: 'data-i18n-value', apply: (el, val) => { el.value = val; } },
    { attr: 'data-i18n-html', apply: (el, val) => { el.innerHTML = val; } }
  ];

  attrMappings.forEach(({ attr, apply }) => {
    document.querySelectorAll(`[${attr}]`).forEach(el => {
      const key = el.getAttribute(attr);
      if (!key) return;
      apply(el, tOrders(key));
    });
  });

  applyXauStaticTexts();
}

function getXauSourceMeta(res) {
  const src = res && typeof res.source === 'string' ? res.source : '';
  if (src === 'mt5') {
    return getOrdersLang() === 'en'
      ? 'Source: MT5 (Local Terminal) · Mid=(Bid+Ask)/2'
      : 'المصدر: MT5 (من الجهاز) · Mid=(Bid+Ask)/2';
  }
  return tXau('sourceMeta');
}

// XAU card DOM references (Orders screen)
const xauPriceEl = document.getElementById('xauPrice');
const xauChangeEl = document.getElementById('xauChange');
const xauMetaEl = document.getElementById('xauMeta');
const xauLastUpdateEl = document.getElementById('xauLastUpdate');
const xauMarketBadgeEl = document.getElementById('xauMarketBadge');
const xauNextLabelEl = document.getElementById('xauNextLabel');
const xauCountdownEl = document.getElementById('xauCountdown');
const xauNextTimeEl = document.getElementById('xauNextTime');
const btnRefreshXau = document.getElementById('btnRefreshXau');
const btnMt5ReconnectXau = document.getElementById('btnMt5ReconnectXau');
let xauChartEl = document.getElementById('xauChart');

// Formatting helpers & refresh cadence (mirrors dashboard XAU behavior)
const XAU_REFRESH_MT5_MS = 1000;
const XAU_REFRESH_GOLDPRICE_MS = 15000;
const XAU_MAX_POINTS = 240;
const xauSeries = [];

const xauLangCode = getOrdersLang();
const xauFmtMoney = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const xauFmtPct = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const xauFmtLocal = new Intl.DateTimeFormat(xauLangCode === 'en' ? 'en-US' : 'ar', { dateStyle: 'medium', timeStyle: 'medium' });
const xauFmtNY = new Intl.DateTimeFormat(xauLangCode === 'en' ? 'en-US' : 'ar', { timeZone: 'America/New_York', dateStyle: 'medium', timeStyle: 'medium' });

let xauRefreshTimer = null;      // adaptive polling timer (setTimeout)
let xauTickTimer = null;         // countdown timer (setInterval)
let xauRefreshInFlight = false;  // in-flight guard
let lastXauPrice = null;
let lastXauBid = null;
let lastXauAsk = null;
let lastXauSampleTs = null;
let localOrderProcessInFlight = false;
let queuedLocalOrderProcessPayload = null;
let localOrdersMidnightTimer = null;
let xauActiveSource = null;      // 'mt5' | 'goldprice' | null
let xauCurrentRefreshMs = XAU_REFRESH_MT5_MS;
let xauMt5ReconnectCooldownTimer = null;
let xauNextEvent = null;         // next market open/close event

function queueLocalPendingOrdersProcessing(payload = {}) {
  queuedLocalOrderProcessPayload = payload || {};
  if (localOrderProcessInFlight) return;
  void flushLocalPendingOrdersProcessing();
}

async function flushLocalPendingOrdersProcessing() {
  if (localOrderProcessInFlight) return;
  localOrderProcessInFlight = true;
  let hadChanges = false;
  try {
    while (queuedLocalOrderProcessPayload) {
      const payload = queuedLocalOrderProcessPayload;
      queuedLocalOrderProcessPayload = null;
      ensureAPIBridge();
      if (!window.orders || typeof window.orders.processLocalPending !== 'function') continue;
      const response = await window.orders.processLocalPending(payload);
      if (response && response.success && Number(response.changed) > 0) {
        hadChanges = true;
        await loadOrdersData();
      }
    }
  } catch (_) {
  } finally {
    localOrderProcessInFlight = false;
    if (queuedLocalOrderProcessPayload) {
      void flushLocalPendingOrdersProcessing();
    }
  }
  return hadChanges;
}

function getMsUntilNextLocalMidnight() {
  const now = new Date();
  const nextMidnight = new Date(now);
  nextMidnight.setHours(24, 0, 0, 50);
  return Math.max(100, nextMidnight.getTime() - now.getTime());
}

async function handleLocalOrdersDateBoundary() {
  queuedLocalOrderProcessPayload = {
    currentPrice: lastXauPrice,
    currentBid: lastXauBid,
    currentAsk: lastXauAsk,
    quoteTs: Date.now(),
  };
  const hadChanges = await flushLocalPendingOrdersProcessing();
  if (!hadChanges) {
    await loadOrdersData();
  }
  scheduleLocalOrdersMidnightRefresh();
}

function scheduleLocalOrdersMidnightRefresh() {
  if (localOrdersMidnightTimer) {
    clearTimeout(localOrdersMidnightTimer);
    localOrdersMidnightTimer = null;
  }
  localOrdersMidnightTimer = setTimeout(() => {
    void handleLocalOrdersDateBoundary();
  }, getMsUntilNextLocalMidnight());
}

function setXauRefreshUiLoading(isLoading) {
  if (!btnRefreshXau) return;
  btnRefreshXau.disabled = !!isLoading;
  const icon = btnRefreshXau.querySelector('i');
  if (icon) icon.classList.toggle('fa-spin', !!isLoading);
}

function setXauMt5ReconnectVisible(visible) {
  if (!btnMt5ReconnectXau) return;
  btnMt5ReconnectXau.hidden = !visible;
}

function setXauMt5ReconnectLoading(isLoading) {
  if (!btnMt5ReconnectXau) return;
  btnMt5ReconnectXau.disabled = !!isLoading;
  const icon = btnMt5ReconnectXau.querySelector('i');
  if (icon) icon.classList.toggle('fa-spin', !!isLoading);
}

async function attemptXauMt5ReconnectOnce() {
  if (!window.sys || !window.sys.mt5Reconnect) return;
  if (xauMt5ReconnectCooldownTimer) return;
  setXauMt5ReconnectLoading(true);
  try {
    await window.sys.mt5Reconnect();
  } catch (_) {}

  setTimeout(() => { refreshXauPrice({ silent: true }); }, 2000);
  setTimeout(() => {
    if (xauActiveSource !== 'mt5') refreshXauPrice({ silent: true });
  }, 6000);

  xauMt5ReconnectCooldownTimer = setTimeout(() => {
    xauMt5ReconnectCooldownTimer = null;
    setXauMt5ReconnectLoading(false);
  }, 12000);
}

function setXauOfflineHint(msgKey) {
  const msg = tXau(msgKey);
  const metaEl = document.getElementById('xauMeta');
  if (metaEl) metaEl.textContent = msg;
  if (xauLastUpdateEl) xauLastUpdateEl.textContent = '—';
  if (xauNextLabelEl) xauNextLabelEl.textContent = '—';
  if (xauCountdownEl) xauCountdownEl.textContent = '—';
  if (xauNextTimeEl) xauNextTimeEl.textContent = '—';
  if (xauMarketBadgeEl) {
    xauMarketBadgeEl.classList.remove('open', 'closed');
    xauMarketBadgeEl.innerHTML = '<i class="fa-solid fa-circle"></i> —';
  }
}

function getZonedParts(date, timeZone) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour12: false,
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).formatToParts(date);
  const map = {};
  for (const p of parts) {
    if (p.type !== 'literal') map[p.type] = p.value;
  }
  return {
    weekday: map.weekday,
    year: Number(map.year),
    month: Number(map.month),
    day: Number(map.day),
    hour: Number(map.hour),
    minute: Number(map.minute),
    second: Number(map.second)
  };
}

function getTimeZoneOffsetMs(date, timeZone) {
  const p = getZonedParts(date, timeZone);
  const asUTC = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
  return asUTC - date.getTime();
}

function fromZonedParts(year, month, day, hour, minute, second, timeZone) {
  let guess = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
  let offset = getTimeZoneOffsetMs(guess, timeZone);
  let utc = new Date(Date.UTC(year, month - 1, day, hour, minute, second) - offset);
  offset = getTimeZoneOffsetMs(utc, timeZone);
  utc = new Date(Date.UTC(year, month - 1, day, hour, minute, second) - offset);
  return utc;
}

function addDaysUTC(y, m, d, days) {
  const dt = new Date(Date.UTC(y, m - 1, d + days));
  return { year: dt.getUTCFullYear(), month: dt.getUTCMonth() + 1, day: dt.getUTCDate() };
}

function computeXauMarketSchedule(now) {
  const tz = 'America/New_York';
  const p = getZonedParts(now, tz);
  const wdMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const wd = wdMap[p.weekday] ?? 0;
  const minutes = (p.hour * 60) + p.minute;
  const openMinutes = 17 * 60;

  let isOpen = true;
  if (wd === 6) isOpen = false;
  else if (wd === 0 && minutes < openMinutes) isOpen = false;
  else if (wd === 5 && minutes >= openMinutes) isOpen = false;

  if (isOpen) {
    const daysUntilFri = (5 - wd + 7) % 7;
    const closeDay = addDaysUTC(p.year, p.month, p.day, daysUntilFri);
    const closeAt = fromZonedParts(closeDay.year, closeDay.month, closeDay.day, 17, 0, 0, tz);
    return { isOpen: true, type: 'close', eventAt: closeAt };
  }

  const daysUntilSun = (0 - wd + 7) % 7;
  const openDay = addDaysUTC(p.year, p.month, p.day, daysUntilSun);
  const openAt = fromZonedParts(openDay.year, openDay.month, openDay.day, 17, 0, 0, tz);
  return { isOpen: false, type: 'open', eventAt: openAt };
}

function formatXauCountdown(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const hh = String(h).padStart(2, '0');
  const mm = String(m).padStart(2, '0');
  const ss = String(s).padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
}

function applyXauMarketUi() {
  const sched = computeXauMarketSchedule(new Date());
  xauNextEvent = sched;

  if (xauMarketBadgeEl) {
    xauMarketBadgeEl.classList.remove('open', 'closed');
    xauMarketBadgeEl.classList.add(sched.isOpen ? 'open' : 'closed');
    xauMarketBadgeEl.innerHTML = `<i class="fa-solid fa-circle"></i> ${sched.isOpen ? tXau('marketOpen') : tXau('marketClosed')}`;
  }

  if (xauNextLabelEl) {
    xauNextLabelEl.textContent = sched.isOpen ? tXau('closesIn') : tXau('opensIn');
  }

  if (xauNextTimeEl) {
    xauNextTimeEl.textContent = xauFmtNY.format(sched.eventAt);
  }
}

function tickXauCountdown() {
  if (!xauNextEvent || !xauNextEvent.eventAt) {
    if (xauCountdownEl) xauCountdownEl.textContent = '—';
    return;
  }
  const ms = xauNextEvent.eventAt.getTime() - Date.now();
  if (ms <= 0) {
    applyXauMarketUi();
    return;
  }
  const txt = formatXauCountdown(ms);
  if (xauCountdownEl) xauCountdownEl.textContent = txt;
}

function ensureXauCanvasSize(canvas) {
  if (!canvas) return null;
  const rect = canvas.getBoundingClientRect();
  const w = Math.max(1, Math.floor(rect.width));
  const h = Math.max(1, Math.floor(rect.height));
  const dpr = window.devicePixelRatio || 1;
  const bw = Math.max(1, Math.floor(w * dpr));
  const bh = Math.max(1, Math.floor(h * dpr));
  if (canvas.width !== bw) canvas.width = bw;
  if (canvas.height !== bh) canvas.height = bh;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w, h };
}

function drawXauSparkline(canvas, series) {
  const r = ensureXauCanvasSize(canvas);
  if (!r) return;
  const { ctx, w, h } = r;
  ctx.clearRect(0, 0, w, h);

  if (!series || series.length < 2) return;

  const pad = Math.round(Math.max(10, Math.min(14, h * 0.14)));
  const innerW = Math.max(1, w - (pad * 2));
  const innerH = Math.max(1, h - (pad * 2));
  const values = series.map(p => p.v);
  let minV = Math.min(...values);
  let maxV = Math.max(...values);
  if (!Number.isFinite(minV) || !Number.isFinite(maxV)) return;
  if (minV === maxV) {
    minV -= 1;
    maxV += 1;
  }

  ctx.save();
  ctx.strokeStyle = 'rgba(148, 163, 184, .16)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  const gy1 = pad + (innerH * 0.25);
  const gy2 = pad + (innerH * 0.5);
  const gy3 = pad + (innerH * 0.75);
  ctx.moveTo(pad, gy1);
  ctx.lineTo(w - pad, gy1);
  ctx.moveTo(pad, gy2);
  ctx.lineTo(w - pad, gy2);
  ctx.moveTo(pad, gy3);
  ctx.lineTo(w - pad, gy3);
  ctx.stroke();
  ctx.restore();

  const first = values[0];
  const last = values[values.length - 1];
  const up = last >= first;
  const lineColor = up ? 'rgba(46, 204, 113, .95)' : 'rgba(255, 107, 107, .95)';
  const glowColor = up ? 'rgba(46, 204, 113, .35)' : 'rgba(255, 107, 107, .35)';
  const glowStroke = up ? 'rgba(46, 204, 113, .18)' : 'rgba(255, 107, 107, .18)';
  const fillGradient = ctx.createLinearGradient(0, pad, 0, h - pad);
  fillGradient.addColorStop(0, up ? 'rgba(46, 204, 113, .18)' : 'rgba(255, 107, 107, .18)');
  fillGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  const n = series.length;
  const xStep = n > 1 ? innerW / (n - 1) : innerW;
  const pts = new Array(n);
  for (let i = 0; i < n; i++) {
    const v = series[i].v;
    const norm = (v - minV) / (maxV - minV);
    const x = pad + (i * xStep);
    const y = pad + ((1 - norm) * innerH);
    pts[i] = { x, y };
  }

  const strokeSmooth = (width, strokeStyle, shadowBlur, shadowColor) => {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    if (pts.length === 2) {
      ctx.lineTo(pts[1].x, pts[1].y);
    } else {
      for (let i = 1; i < pts.length - 2; i++) {
        const xc = (pts[i].x + pts[i + 1].x) / 2;
        const yc = (pts[i].y + pts[i + 1].y) / 2;
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
      }
      const pen = pts[pts.length - 2];
      const lastPt = pts[pts.length - 1];
      ctx.quadraticCurveTo(pen.x, pen.y, lastPt.x, lastPt.y);
    }
    ctx.lineWidth = width;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = strokeStyle;
    ctx.shadowBlur = shadowBlur || 0;
    ctx.shadowColor = shadowColor || 'transparent';
    ctx.stroke();
    ctx.restore();
  };

  const fillSmooth = () => {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(pts[0].x, h - pad);
    ctx.lineTo(pts[0].x, pts[0].y);
    if (pts.length === 2) {
      ctx.lineTo(pts[1].x, pts[1].y);
    } else {
      for (let i = 1; i < pts.length - 2; i++) {
        const xc = (pts[i].x + pts[i + 1].x) / 2;
        const yc = (pts[i].y + pts[i + 1].y) / 2;
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
      }
      const pen = pts[pts.length - 2];
      const lastPt = pts[pts.length - 1];
      ctx.quadraticCurveTo(pen.x, pen.y, lastPt.x, lastPt.y);
    }
    const lastPt = pts[pts.length - 1];
    ctx.lineTo(lastPt.x, h - pad);
    ctx.closePath();
    ctx.fillStyle = fillGradient;
    ctx.fill();
    ctx.restore();
  };

  fillSmooth();
  strokeSmooth(6, glowStroke, 12, glowColor);
  strokeSmooth(2.2, lineColor, 0, 'transparent');

  const lp = pts[pts.length - 1];
  ctx.save();
  ctx.setLineDash([5, 4]);
  ctx.strokeStyle = 'rgba(148, 163, 184, .18)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad, lp.y);
  ctx.lineTo(w - pad, lp.y);
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.beginPath();
  ctx.arc(lp.x, lp.y, 3.6, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,.92)';
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = lineColor;
  ctx.stroke();
  ctx.restore();
}

function pushXauSeriesPoint(series, v, ts) {
  if (!Number.isFinite(v)) return;
  series.push({ t: ts, v });
  if (series.length > XAU_MAX_POINTS) {
    series.splice(0, series.length - XAU_MAX_POINTS);
  }
}

function flashXauPrice(el, direction) {
  if (!el || typeof el.animate !== 'function') return;
  const bg = direction === 'up' ? 'rgba(46, 204, 113, .18)' : 'rgba(255, 107, 107, .18)';
  el.animate(
    [
      { backgroundColor: bg, transform: 'scale(1.02)' },
      { backgroundColor: 'transparent', transform: 'scale(1)' }
    ],
    { duration: 450, easing: 'ease-out' }
  );
  
  const xauCard = document.querySelector('.xau-card');
  if (xauCard) {
    xauCard.classList.add('data-updated');
    setTimeout(() => xauCard.classList.remove('data-updated'), 800);
  }
}

async function refreshXauPrice(opts = {}) {
  const silent = !!opts.silent;
  if (xauRefreshInFlight) return;

  ensureAPIBridge();

  const previousQuote = {
    price: lastXauPrice,
    bid: lastXauBid,
    ask: lastXauAsk,
    ts: lastXauSampleTs,
  };

  if (!window.sys || !window.sys.getXauUsdPrice) {
    setXauOfflineHint('offlineHintNotAvailable');
    setXauMt5ReconnectVisible(true);
    xauCurrentRefreshMs = XAU_REFRESH_GOLDPRICE_MS;
    queueLocalPendingOrdersProcessing({ quoteTs: Date.now() });
    return;
  }

  xauRefreshInFlight = true;
  if (!silent) {
    setXauRefreshUiLoading(true);
    const metaEl = document.getElementById('xauMeta');
    if (metaEl) metaEl.textContent = tXau('offlineHintUpdating');
  }

  try {
    const res = await window.sys.getXauUsdPrice();

    if (!res || !res.success) {
      setXauOfflineHint('offlineHintFailed');
      setXauMt5ReconnectVisible(true);
      xauCurrentRefreshMs = XAU_REFRESH_GOLDPRICE_MS;
      queueLocalPendingOrdersProcessing({ quoteTs: Date.now() });
      return;
    }

    if (res && typeof res.source === 'string') {
      xauActiveSource = res.source;
    }
    xauCurrentRefreshMs = (xauActiveSource !== 'mt5') ? XAU_REFRESH_GOLDPRICE_MS : XAU_REFRESH_MT5_MS;
    setXauMt5ReconnectVisible(xauActiveSource !== 'mt5');

    const price = Number(res.price);
    const bid = res.bid == null ? NaN : Number(res.bid);
    const ask = res.ask == null ? NaN : Number(res.ask);
    const change = Number(res.change || 0);
    const percent = Number(res.percent || 0);
    const tickTs = Number(res.ts);
    const sampleTs = Number.isFinite(tickTs) ? (tickTs < 1e12 ? tickTs * 1000 : tickTs) : Date.now();

    lastXauBid = Number.isFinite(bid) ? bid : null;
    lastXauAsk = Number.isFinite(ask) ? ask : null;

    if (Number.isFinite(price)) {
      if (xauPriceEl && Number.isFinite(lastXauPrice)) {
        if (price > lastXauPrice) flashXauPrice(xauPriceEl, 'up');
        else if (price < lastXauPrice) flashXauPrice(xauPriceEl, 'down');
      }
      lastXauPrice = price;
      lastXauSampleTs = sampleTs;
      pushXauSeriesPoint(xauSeries, price, sampleTs);
      drawXauSparkline(xauChartEl, xauSeries);
      if (xauPriceEl) {
        xauPriceEl.textContent = `${xauFmtMoney.format(price)} $`;
      }
      updateProximityIndicators(price);
    }

    queueLocalPendingOrdersProcessing({
      currentPrice: Number.isFinite(price) ? price : null,
      currentBid: Number.isFinite(bid) ? bid : null,
      currentAsk: Number.isFinite(ask) ? ask : null,
      previousPrice: previousQuote.price,
      previousBid: previousQuote.bid,
      previousAsk: previousQuote.ask,
      quoteTs: sampleTs,
      previousQuoteTs: previousQuote.ts,
    });

    if (xauChangeEl) {
      const sign = change > 0 ? '+' : '';
      const pctSign = percent > 0 ? '+' : '';
      xauChangeEl.textContent = `${sign}${xauFmtMoney.format(change)} $ (${pctSign}${xauFmtPct.format(percent)}%)`;
      xauChangeEl.style.color = change < 0 ? 'var(--error)' : (change > 0 ? 'var(--success)' : 'var(--subtle)');
    }

    const localTs = res.ts ? new Date(res.ts) : new Date();
    if (xauLastUpdateEl) xauLastUpdateEl.textContent = xauFmtLocal.format(localTs);

    applyXauMarketUi();
    tickXauCountdown();

    const metaElFinal = document.getElementById('xauMeta');
    if (metaElFinal) {
      metaElFinal.textContent = getXauSourceMeta(res);
    }
  } catch (_) {
    setXauOfflineHint('offlineHintFailed');
    setXauMt5ReconnectVisible(true);
    xauCurrentRefreshMs = XAU_REFRESH_GOLDPRICE_MS;
    queueLocalPendingOrdersProcessing({ quoteTs: Date.now() });
  } finally {
    xauRefreshInFlight = false;
    if (!silent) setXauRefreshUiLoading(false);
  }
}

function startXauPolling() {
  if (xauRefreshTimer) {
    clearTimeout(xauRefreshTimer);
    xauRefreshTimer = null;
  }
  if (xauTickTimer) {
    clearInterval(xauTickTimer);
    xauTickTimer = null;
  }

  applyXauMarketUi();
  tickXauCountdown();

  const refreshLoop = async () => {
    const start = Date.now();
    await refreshXauPrice({ silent: true });
    const elapsed = Date.now() - start;
    const ms = Number.isFinite(Number(xauCurrentRefreshMs)) ? Number(xauCurrentRefreshMs) : XAU_REFRESH_MT5_MS;
    xauRefreshTimer = setTimeout(refreshLoop, Math.max(0, ms - elapsed));
  };

  refreshLoop();
  xauTickTimer = setInterval(tickXauCountdown, 1000);
  scheduleLocalOrdersMidnightRefresh();

  window.addEventListener('beforeunload', () => {
    if (xauRefreshTimer) clearTimeout(xauRefreshTimer);
    if (xauTickTimer) clearInterval(xauTickTimer);
    if (localOrdersMidnightTimer) clearTimeout(localOrdersMidnightTimer);
  }, { once: true });
}

function normalizeFileUrl(p) {
  if (!p) return '';
  return p.startsWith('file://') ? p : 'file:///' + String(p).replace(/\\/g, '/');
}

function buildCompanyHeader(c) {
  const logoUrl = (c && c.logoData) ? c.logoData : (c && c.logo ? (normalizeFileUrl(c.logo) + '?v=' + Date.now()) : '');
  const nameAr = c?.name || 'اسم الشركة';
  const nameEn = c?.name_en || c?.name || 'Company Name';
  const addressAr = c?.address || '-';
  const addressEn = c?.address_en || c?.address || '-';
  const phone = c?.phone || '-';
  const email = c?.email || '-';
  const tax = c?.tax || '-';

  return `
    <div class="report-header" style="background:linear-gradient(135deg, #e8f5f3 0%, #d4edea 100%); color:#2c3e50; padding:20px 15px;">
      <div style="display:grid; grid-template-columns:1fr auto 1fr; align-items:center; width:100%; direction:ltr; column-gap:20px;">
        <div style="text-align:left; direction:ltr;">
          <h1 style="font-size:18px; font-weight:700; color:#00897B; margin:0 0 8px 0;">${nameEn}</h1>
          <div style="font-size:11px; margin:4px 0;">📍 Address: ${addressEn}</div>
          <div style="font-size:11px; margin:4px 0;">📞 Phone: ${phone}</div>
          <div style="font-size:11px; margin:4px 0;">📧 Email: ${email}</div>
          <div style="font-size:11px; margin:4px 0;">🏷️ Tax No: ${tax}</div>
        </div>
        <div style="width:120px; height:120px; background:white; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:52px; border:4px solid #00897B; overflow:hidden; box-shadow:0 4px 15px rgba(0,137,123,0.2); margin:0 auto;">
          ${logoUrl ? `<img src="${logoUrl}" alt="Logo" style="width:90%; height:90%; object-fit:contain;">` : '🏢'}
        </div>
        <div style="text-align:right; direction:rtl;">
          <h1 style="font-size:20px; font-weight:700; color:#00897B; margin:0 0 8px 0;">${nameAr}</h1>
          <div style="font-size:11px; margin:4px 0;">📍 العنوان: ${addressAr}</div>
          <div style="font-size:11px; margin:4px 0;">📞 رقم الهاتف: ${phone}</div>
          <div style="font-size:11px; margin:4px 0;">📧 البريد: ${email}</div>
          <div style="font-size:11px; margin:4px 0;">🏷️ الرقم الضريبي: ${tax}</div>
        </div>
      </div>
    </div>`;
}

function exportOrdersToExcel() {
  try {
    const table = document.getElementById('ordersTable');
    if (!table) {
      toastErrorKey('error.ordersTableMissing');
      return;
    }

    const rows = Array.from(table.querySelectorAll('tbody tr:not(.empty-row):not([style*="display: none"])'));
    if (rows.length === 0) {
      toastErrorKey('error.ordersNoData');
      return;
    }

    const headers = Array.from(table.querySelectorAll('thead th')).slice(1, -1).map(th => th.textContent.trim());

    const htmlRows = rows.map(row => {
      const cells = Array.from(row.querySelectorAll('td')).slice(1, -1).map(td => {
        let text = td.textContent.trim();
        const badge = td.querySelector('.operation-badge, .operation-badge-new');
        if (badge) text = badge.textContent.trim();
        const statusIcon = td.querySelector('.status-icon');
        if (statusIcon) text = statusIcon.getAttribute('title') || '';
        text = text.replace(/\s+/g, ' ').trim();
        return `<td>${text}</td>`;
      }).join('');
      return `<tr>${cells}</tr>`;
    }).join('');

    const xlsHtml = `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><style>table{border-collapse:collapse}th,td{border:1px solid #444;padding:6px;text-align:right;white-space:nowrap}thead th{background:#eee}</style></head><body><table><thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${htmlRows}</tbody></table></body></html>`;

    const blob = new Blob(['\ufeff' + xlsHtml], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tOrders('file.orders')}_${new Date().toISOString().split('T')[0]}.xls`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
      a.remove();
    }, 0);

    toastInfoKey('toast.exportOrdersSuccess');
  } catch (_) {
    toastErrorKey('error.export');
  }
}

async function exportOrdersToPDF() {
  try {
    toastInfoKey('toast.preparePdf');

    const table = document.getElementById('ordersTable');
    if (!table) {
      toastErrorKey('error.ordersTableMissing');
      return;
    }

    const rows = Array.from(table.querySelectorAll('tbody tr:not(.empty-row):not([style*="display: none"])'));
    if (rows.length === 0) {
      toastErrorKey('error.ordersNoData');
      return;
    }

    const headers = Array.from(table.querySelectorAll('thead th')).slice(1, -1).map(th => th.textContent.trim());

    const htmlRows = rows.map(row => {
      const cells = Array.from(row.querySelectorAll('td')).slice(1, -1).map(td => {
        let text = td.textContent.trim();
        const badge = td.querySelector('.operation-badge, .operation-badge-new');
        if (badge) text = badge.textContent.trim();
        const statusIcon = td.querySelector('.status-icon');
        if (statusIcon) text = statusIcon.getAttribute('title') || '';
        text = text.replace(/\s+/g, ' ').trim();
        return `<td>${text}</td>`;
      }).join('');
      return `<tr>${cells}</tr>`;
    }).join('');

    let company = {};
    try {
      if (window.api && window.api.getCompanyInfo) {
        const r = await window.api.getCompanyInfo();
        if (r && r.success) company = r.company || {};
      }
    } catch (_) {}

    const headerHTML = buildCompanyHeader(company);
    const langAttr = getOrdersLang();
    const dirAttr = isOrdersRtl() ? 'rtl' : 'ltr';
    const ordersTitle = tOrders('orders.listTitle');
    const printLabel = tOrders('actions.print');

    const docHtml = `<!doctype html><html lang="${langAttr}" dir="${dirAttr}"><head><meta charset="utf-8"><title>${ordersTitle}</title><style>
      body{font-family:Cairo,Arial,sans-serif;margin:0}
      main{padding:20px}
      table{width:100%;border-collapse:collapse}
      th,td{border:1px solid #999;padding:6px;text-align:right;font-size:12px}
      thead th{background:#eee}
      .print-button{position:fixed;bottom:30px;left:30px;background:linear-gradient(135deg,#00897B 0%,#00695C 100%);color:white;border:none;padding:15px 30px;border-radius:50px;font-size:16px;font-weight:700;cursor:pointer;box-shadow:0 4px 20px rgba(0,137,123,0.4);transition:all 0.3s;z-index:1000;display:inline-flex;align-items:center;gap:8px}
      .print-button:hover{transform:translateY(-2px);box-shadow:0 6px 30px rgba(0,137,123,0.5)}
      .print-button i{font-style:normal}
      @media print{ .no-print{display:none !important} body{margin:10mm} }
    </style></head><body><main>
      ${headerHTML}
      <h2 style="text-align:center;margin:0 0 12px 0">${ordersTitle}</h2>
      <table><thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${htmlRows}</tbody></table>
    </main><button class="print-button no-print" onclick="window.print()"><i>🖨️</i>${printLabel}</button></body></html>`;

    if (window.openPreview) {
      window.openPreview(docHtml);
    } else {
      const w = window.open('', '_blank');
      if (!w) return;
      w.document.open();
      w.document.write(docHtml);
      w.document.close();
      w.focus();
    }
  } catch (_) {
    toastErrorKey('error.ordersPdfFail');
  }
}

async function loadOrdersData() {
  try {
    await waitForOrdersScreenReady();
    
    if (window.ScreenPermissions && !window.ScreenPermissions.check('orders_view', tOrders('permissions.ordersView'))) {
      displayOrdersData([]);
      updateOrdersStatistics([]);
      return;
    }

    if (!window.orders) {
      toastErrorKey('error.ordersApiUnavailable');
      displayOrdersData([]);
      updateOrdersStatistics([]);
      return;
    }

    if (typeof window.orders.list !== 'function') {
      toastErrorKey('error.ordersListUnavailable');
      displayOrdersData([]);
      updateOrdersStatistics([]);
      return;
    }

    const response = await window.orders.list();

    if (!response || !response.success) {
      toastErrorKey('error.ordersLoadFail', { error: response?.error || tOrders('error.unknown') });
      displayOrdersData([]);
      updateOrdersStatistics([]);
      return;
    }

    const orders = response.orders || [];
    syncCompletedOrdersNotifications(orders);
    displayOrdersData(orders);
    updateOrdersStatistics(orders);
    queueLocalPendingOrdersProcessing({
      currentPrice: lastXauPrice,
      currentBid: lastXauBid,
      currentAsk: lastXauAsk,
      quoteTs: lastXauSampleTs || Date.now(),
    });
  } catch (err) {
    toastErrorKey('error.genericLoad');
    displayOrdersData([]);
    updateOrdersStatistics([]);
  }
}

function animateNumber(el, target, duration = 600) {
  if (!el) return;
  const start = parseInt(el.textContent) || 0;
  if (start === target) return;
  const diff = target - start;
  const startTime = performance.now();
  const easeOutQuart = t => 1 - Math.pow(1 - t, 4);
  
  function tick(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutQuart(progress);
    const current = Math.round(start + diff * eased);
    el.textContent = current;
    
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = target;
      el.classList.add('number-pop');
      setTimeout(() => el.classList.remove('number-pop'), 300);
    }
  }
  requestAnimationFrame(tick);
}

function updateOrdersStatistics(orders) {
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const completedOrders = orders.filter(o => o.status === 'completed').length;
  const expiredOrders = orders.filter(o => o.status === 'expired').length;

  const totalOrdersEl = document.getElementById('totalOrders');
  animateNumber(totalOrdersEl, totalOrders);

  const pendingOrdersEl = document.getElementById('pendingOrders');
  animateNumber(pendingOrdersEl, pendingOrders);

  const completedOrdersEl = document.getElementById('completedOrders');
  animateNumber(completedOrdersEl, completedOrders);

  const expiredOrdersEl = document.getElementById('expiredOrders');
  animateNumber(expiredOrdersEl, expiredOrders);
}

function displayOrdersData(orders) {
  const tbody = document.getElementById('ordersTableBody');
  if (!tbody) return;

  tbody.innerHTML = '';

  if (!orders || orders.length === 0) {
    tbody.innerHTML = `
      <tr class="empty-row">
        <td colspan="13" style="text-align: center; padding: 60px; color: var(--subtle);">
          <i class="fa-solid fa-inbox" style="font-size: 48px; margin-bottom: 16px; display: block; opacity: 0.3;"></i>
          ${tOrders('orders.table.empty')}
        </td>
      </tr>
    `;
    return;
  }

  const canEdit = window.ScreenPermissions ? window.ScreenPermissions.has('orders_edit') : true;
  const canDelete = window.ScreenPermissions ? window.ScreenPermissions.has('orders_delete') : true;

  const getOrderDisplayId = (order) => {
    const value = Number(order?.branch_local_number || 0);
    return Number.isFinite(value) && value > 0 ? value : (order?.id ?? '');
  };

  orders.forEach(order => {
    const row = document.createElement('tr');
    const displayId = getOrderDisplayId(order);

    const colorClass = order.operation_type === 'BUY'
      ? 'buy-color'
      : 'sell-color';

    let statusIcon = '';
    let statusTitle = order.status ? tOrders(`orders.statusLabels.${order.status}`) : tOrders('orders.statusLabels.unknown');
    const mt5DealTicket = order.mt5_deal_ticket || null;
    const mt5OrderTicket = order.mt5_order_ticket || null;
    const mt5Ticket = mt5DealTicket || mt5OrderTicket || null;
    const wantsMt5 = Number(order.execute_on_mt5) === 1;
    const mt5Executed = !!mt5DealTicket;
    const mt5Placed = !!mt5OrderTicket && !mt5Executed;
    const showMt5Badge = wantsMt5 || mt5Placed || mt5Executed;
    const mt5BadgeClass = mt5Executed ? 'executed' : (mt5Placed ? 'pending' : 'flagged');
    const mt5BadgeTitle = mt5Executed ? tOrders('orders.mt5.executed') : (mt5Placed ? tOrders('orders.mt5.placed') : tOrders('orders.mt5.flagged'));
    const mt5BadgeIcon = mt5Executed ? 'fa-circle-check' : (mt5Placed ? 'fa-hourglass-half' : 'fa-plug-circle-bolt');
    const mt5Badge = showMt5Badge
      ? `<span class="mt5-badge ${mt5BadgeClass}" title="${mt5BadgeTitle}"><i class="fa-solid ${mt5BadgeIcon}"></i> MT5</span>`
      : '';
    if (mt5Ticket) statusTitle += ` · #${mt5Ticket}`;
    if (order.mt5_error) statusTitle += ` · ${order.mt5_error}`;
    switch (order.status) {
      case 'pending':
        statusIcon = `<span class="status-icon ${colorClass}" title="${statusTitle}"><i class="fa-solid fa-clock"></i></span>`;
        break;
      case 'completed':
        statusIcon = `<span class="status-icon ${colorClass}" title="${statusTitle}"><i class="fa-solid fa-circle-check"></i></span>`;
        break;
      case 'expired':
        statusIcon = `<span class="status-icon danger" title="${tOrders('orders.statusLabels.expired')}"><i class="fa-solid fa-clock-rotate-left"></i></span>`;
        break;
      case 'failed':
        statusIcon = `<span class="status-icon ${colorClass}" title="${statusTitle}"><i class="fa-solid fa-triangle-exclamation"></i></span>`;
        break;
      case 'cancelled':
        statusIcon = `<span class="status-icon ${colorClass}" title="${statusTitle}"><i class="fa-solid fa-circle-xmark"></i></span>`;
        break;
      case 'processing':
        statusIcon = `<span class="status-icon ${colorClass} pulse-animation" title="${statusTitle}"><i class="fa-solid fa-spinner"></i></span>`;
        break;
      default:
        statusIcon = `<span class="status-icon ${colorClass}" title="${statusTitle}"><i class="fa-solid fa-circle-question"></i></span>`;
    }

    const statusCell = `<div class="status-cell">${statusIcon}${mt5Badge}</div>`;

    const operationType = order.operation_type === 'BUY'
      ? `<span class="operation-badge-new buy"><i class="fa-solid fa-arrow-trend-down"></i> ${tOrders('operation.buyCode')} <small>${tOrders('operation.buyLabel')}</small></span>`
      : `<span class="operation-badge-new sell"><i class="fa-solid fa-arrow-trend-up"></i> ${tOrders('operation.sellCode')} <small>${tOrders('operation.sellLabel')}</small></span>`;

    const entityName = order.customer_name || order.customer_name_ref || order.supplier_name_ref || '-';

    const isProcessing = order.status === 'processing';
    const isCompleted = order.status === 'completed';
    const isExpired = order.status === 'expired';
    const isFailed = order.status === 'failed' || order.status === 'cancelled';
    const execTitle = isFailed ? tOrders('orders.actionsLabels.retry') : tOrders('orders.actionsLabels.complete');
    const execIcon = isFailed ? 'fa-rotate-right' : 'fa-bolt';

    const completeBtn = canEdit ? `
      <button class="icon-btn success" title="${execTitle}" onclick="completeOrder(${order.id})" ${(isCompleted || isProcessing || isExpired) ? 'disabled' : ''}>
        <i class="fa-solid ${execIcon}"></i>
      </button>` : '';

    const editBtn = canEdit ? `
      <button class="icon-btn edit" title="${tOrders('orders.actionsLabels.edit')}" onclick="editOrder(${order.id})" ${(isCompleted || isProcessing) ? 'disabled' : ''}>
        <i class="fa-solid fa-pen-to-square"></i>
      </button>` : '';

    const deleteBtn = canDelete ? `
      <button class="icon-btn delete" title="${tOrders('orders.actionsLabels.delete')}" onclick="deleteOrder(${order.id})" ${isProcessing ? 'disabled' : ''}>
        <i class="fa-solid fa-trash"></i>
      </button>` : '';

    // Calculate proximity to current XAU price
    const prox = calcProximity(Number(order.ounce) || 0, lastXauPrice, order.status);
    const proxSign = prox.diff > 0 ? '+' : '';
    const proxTooltip = prox.level !== 'noPrice' && prox.level !== 'completed' && prox.level !== 'expired'
      ? `${proxSign}$${prox.diff.toFixed(2)} (${prox.percent.toFixed(2)}%)`
      : prox.label;
    
    const proximityCell = `
      <div class="proximity-indicator ${prox.class}" title="${proxTooltip}" data-order-id="${order.id}">
        <div class="proximity-icon"><i class="fa-solid ${prox.icon}"></i></div>
        <div class="proximity-info">
          <span class="proximity-label">${prox.label}</span>
          ${prox.level !== 'noPrice' && prox.level !== 'completed' && prox.level !== 'expired' ? `
            <span class="proximity-diff">${proxSign}$${Math.abs(prox.diff).toFixed(2)}</span>
            <span class="proximity-percent">(${prox.percent.toFixed(2)}%)</span>
          ` : ''}
        </div>
        ${prox.level !== 'noPrice' && prox.level !== 'completed' && prox.level !== 'expired' ? `
          <div class="proximity-bar">
            <div class="proximity-fill" style="width: ${Math.max(5, 100 - prox.percent * 20)}%"></div>
          </div>
        ` : ''}
      </div>
    `;

    row.innerHTML = `
      <td>${displayId}</td>
      <td><strong>${entityName}</strong></td>
      <td>${order.created_date || '-'}</td>
      <td>${order.completion_date || '-'}</td>
      <td>${operationType}</td>
      <td style="text-align: center;">${statusCell}</td>
      <td>${formatNumber(Number(order.weight) || 0, 2)}</td>
      <td>${formatNumber(Number(order.ounce) || 0, 3)}</td>
      <td>${proximityCell}</td>
      <td>${order.execution_date || '-'}</td>
      <td>${order.execution_time || '-'}${mt5Ticket ? ` <small style="color: var(--subtle);">#${mt5Ticket}</small>` : ''}</td>
      <td>
        <div class="action-icons">
          ${completeBtn}
          ${editBtn}
          ${deleteBtn}
        </div>
      </td>
    `;

    tbody.appendChild(row);
  });
}

let isEditingOrder = false;
let currentEditOrderId = null;
let currentEditOrderDisplayId = null;

async function editOrder(id) {
  try {
    if (window.ScreenPermissions && !window.ScreenPermissions.check('orders_edit', tOrders('permissions.ordersEdit'))) {
      return;
    }

    const response = await window.orders.get(id);
    if (!response || !response.success || !response.data) {
      toastErrorKey('error.orderDataFail');
      return;
    }

    const order = response.data;
    isEditingOrder = true;
    currentEditOrderId = id;
    currentEditOrderDisplayId = Number(order.branch_local_number) > 0 ? Number(order.branch_local_number) : id;

    const modal = document.getElementById('addOrderModal');
    if (!modal) return;

    const modalTitle = modal.querySelector('.modal-header h2');
    if (modalTitle) {
      modalTitle.innerHTML = `
        <i class="fa-solid fa-pen-to-square"></i>
        ${tOrdersFmt('orderModal.editTitle', { id: currentEditOrderDisplayId })}
      `;
    }

    const setFieldValue = (fieldId, value) => {
      const el = document.getElementById(fieldId);
      if (!el) return;
      el.value = value == null ? '' : value;
    };

    const operationType = order.operation_type;
    const operationTypeEl = document.getElementById('operation_type');
    if (operationTypeEl) operationTypeEl.value = operationType || '';

    document.querySelectorAll('.operation-card').forEach(card => {
      card.classList.remove('selected');
      if (operationType && card.dataset.type === operationType) card.classList.add('selected');
    });

    setFieldValue('customer_id', order.customer_id);
    setFieldValue('supplier_id', order.supplier_id);
    setFieldValue('customer_name', order.customer_name);
    setFieldValue('created_date', order.created_date);
    setFieldValue('completion_date', order.completion_date);
    setFieldValue('weight', order.weight);
    setFieldValue('ounce', order.ounce);
    setFieldValue('addition', order.addition);
    setFieldValue('notes', order.notes);

    const execOnMt5El = document.getElementById('execute_on_mt5');
    if (execOnMt5El) execOnMt5El.checked = Number(order.execute_on_mt5) === 1;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  } catch (error) {
    toastErrorKey('error.orderUpdateFail', { error: error?.message || tOrders('error.unknown') });
  }
}

async function deleteOrder(id) {
  try {
    if (window.ScreenPermissions && !window.ScreenPermissions.check('orders_delete', tOrders('permissions.ordersDelete'))) {
      return;
    }

    // Check if order is completed - prevent deletion
    const orderResponse = await window.orders.get(id);
    if (orderResponse && orderResponse.success && orderResponse.data) {
      if (orderResponse.data.status === 'completed') {
        toastErrorKey('error.cannotDeleteCompleted');
        return;
      }
    }

    const confirmed = await showConfirmModal(
      tOrders('confirm.deleteOrderTitle'),
      tOrders('confirm.deleteOrderMessage')
    );

    if (!confirmed) return;

    const confirmFn = window.confirmDeleteWithPassword || window.parent?.confirmDeleteWithPassword || window.top?.confirmDeleteWithPassword;
    if (confirmFn) {
      try {
        const pwdConfirmed = await confirmFn();
        if (!pwdConfirmed) return;
      } catch (e) {
        return;
      }
    }

    const response = await window.orders.remove(id);

    if (response && response.success) {
      toastInfoKey('toast.deleteOrder');
      loadOrdersData();
      return;
    }

    toastErrorKey('error.orderDeleteFail', { error: response?.error || tOrders('error.unknown') });
  } catch (error) {
    toastErrorKey('error.orderDeleteFail', { error: error?.message || tOrders('error.unknown') });
  }
}

async function completeOrder(id) {
  try {
    if (window.ScreenPermissions && !window.ScreenPermissions.check('orders_edit', tOrders('permissions.ordersEdit'))) {
      return;
    }

    const orderRes = await window.orders.get(id);
    if (!orderRes || !orderRes.success || !orderRes.data) {
      toastErrorKey('error.orderDataFail');
      return;
    }

    const order = orderRes.data;
    const wantsMt5 = Number(order.execute_on_mt5) === 1;

    const confirmed = await showConfirmModal(
      wantsMt5 ? tOrders('confirm.completeOrderTitle') : tOrders('confirm.completeOrderLocalTitle'),
      wantsMt5 ? tOrders('confirm.completeOrderMessage') : tOrders('confirm.completeOrderLocalMessage')
    );

    if (!confirmed) return;

    const inFlight = wantsMt5 ? window.orders.executeMt5({ id }) : window.orders.completeLocal({ id });
    loadOrdersData();
    const response = await inFlight;
    if (response && response.success) {
      markCompletedOrdersAsSeen([id]);
      notifyOrderCompletedUnread(1, { documentId: id });
      toastInfoKey(wantsMt5 ? 'toast.completeOrder' : 'toast.completeOrderLocal');
      loadOrdersData();
      return;
    }

    toastErrorKey('error.orderCompleteFail', { error: response?.error || tOrders('error.unknown') });
    loadOrdersData();
  } catch (error) {
    toastErrorKey('error.orderCompleteFail', { error: error?.message || tOrders('error.unknown') });
    loadOrdersData();
  }
}

function openAddOrderModal() {
  const modal = document.getElementById('addOrderModal');
  if (!modal) return;

  isEditingOrder = false;
  currentEditOrderId = null;
  currentEditOrderDisplayId = null;

  const modalTitle = modal.querySelector('.modal-header h2');
  if (modalTitle) {
    modalTitle.innerHTML = `
      <i class="fa-solid fa-plus-circle"></i>
      ${tOrders('orderModal.title')}
    `;
  }

  const form = document.getElementById('addOrderForm');
  if (form) form.reset();

  document.querySelectorAll('.operation-card').forEach(c => c.classList.remove('selected'));
  const operationTypeEl = document.getElementById('operation_type');
  if (operationTypeEl) operationTypeEl.value = '';

  // Use local date (not UTC) to avoid showing yesterday's date
  const d = new Date();
  const today = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
  const createdDateEl = document.getElementById('created_date');
  if (createdDateEl) createdDateEl.value = today;

  const execOnMt5El = document.getElementById('execute_on_mt5');
  if (execOnMt5El) execOnMt5El.checked = false;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeAddOrderModal() {
  const modal = document.getElementById('addOrderModal');
  if (!modal) return;

  isEditingOrder = false;
  currentEditOrderId = null;
  currentEditOrderDisplayId = null;

  modal.classList.remove('active');
  document.body.style.overflow = '';
}

async function submitAddOrder(event) {
  event.preventDefault();

  try {
    const form = document.getElementById('addOrderForm');
    const formData = new FormData(form);

    if (!formData.get('operation_type')) {
      toastErrorKey('validation.operationType');
      return;
    }

    if (!formData.get('customer_name')) {
      toastErrorKey('validation.customerName');
      return;
    }

    if (!formData.get('weight') || Number(formData.get('weight')) <= 0) {
      toastErrorKey('validation.weight');
      const weightEl = document.getElementById('weight');
      if (weightEl) weightEl.focus();
      return;
    }

    if (!formData.get('ounce') || Number(formData.get('ounce')) <= 0) {
      toastErrorKey('validation.ounce');
      const ounceEl = document.getElementById('ounce');
      if (ounceEl) ounceEl.focus();
      return;
    }

    if (!formData.get('created_date')) {
      toastErrorKey('validation.createdDate');
      const createdEl = document.getElementById('created_date');
      if (createdEl) createdEl.focus();
      return;
    }

    if (formData.get('execute_on_mt5')) {
      const op = String(formData.get('operation_type') || '').toUpperCase();
      const limitPrice = Number(formData.get('ounce'));
      const buyMarket = Number.isFinite(lastXauAsk) ? lastXauAsk : lastXauPrice;
      const sellMarket = Number.isFinite(lastXauBid) ? lastXauBid : lastXauPrice;

      if (!Number.isFinite(buyMarket) || !Number.isFinite(sellMarket)) {
        toastErrorKey('validation.mt5LimitPriceNoMarket');
        const ounceEl = document.getElementById('ounce');
        if (ounceEl) ounceEl.focus();
        return;
      }

      if (op === 'BUY' && !(limitPrice < buyMarket)) {
        toastErrorKey('validation.mt5BuyLimitPrice', { market: `${xauFmtMoney.format(buyMarket)} $` });
        const ounceEl = document.getElementById('ounce');
        if (ounceEl) ounceEl.focus();
        return;
      }

      if (op === 'SELL' && !(limitPrice > sellMarket)) {
        toastErrorKey('validation.mt5SellLimitPrice', { market: `${xauFmtMoney.format(sellMarket)} $` });
        const ounceEl = document.getElementById('ounce');
        if (ounceEl) ounceEl.focus();
        return;
      }
    }

    // Validate completion_date must be after created_date
    const createdDateVal = formData.get('created_date');
    const completionDateVal = formData.get('completion_date');
    if (createdDateVal && completionDateVal) {
      const createdDate = new Date(createdDateVal);
      const completionDate = new Date(completionDateVal);
      if (completionDate < createdDate) {
        toastErrorKey('validation.completionDateAfterCreated');
        const completionDateEl = document.getElementById('completion_date');
        if (completionDateEl) completionDateEl.focus();
        return;
      }
    }

    const userId = (() => {
      try {
        const u = window.ScreenPermissions?.getUser?.() || JSON.parse(localStorage.getItem('currentUser') || '{}');
        return u && u.id ? Number(u.id) : 1;
      } catch (_) {
        return 1;
      }
    })();

    const orderData = {
      customer_id: formData.get('customer_id') ? Number(formData.get('customer_id')) : null,
      supplier_id: formData.get('supplier_id') ? Number(formData.get('supplier_id')) : null,
      customer_name: formData.get('customer_name') || null,
      created_date: formData.get('created_date') || null,
      completion_date: formData.get('completion_date') || null,
      operation_type: formData.get('operation_type') || null,
      karat: null,
      weight: Number(formData.get('weight')) || 0,
      ounce: Number(formData.get('ounce')) || 0,
      addition: Number(formData.get('addition')) || 0,
      dollar_price: 0,
      price_per_gram: 0,
      execution_date: null,
      execution_time: null,
      execute_on_mt5: formData.get('execute_on_mt5') ? 1 : 0,
      status: 'pending',
      notes: formData.get('notes') || null,
      created_by: userId
    };

    let response;

    if (isEditingOrder && currentEditOrderId) {
      const confirmFn = window.confirmEditWithPassword || window.parent?.confirmEditWithPassword || window.top?.confirmEditWithPassword;
      if (confirmFn) {
        try {
          const confirmed = await confirmFn();
          if (!confirmed) return;
        } catch (_) {
          return;
        }
      }

      response = await window.orders.update({ id: currentEditOrderId, branch_local_number: currentEditOrderDisplayId || null, ...orderData });

      if (response && response.success) {
        toastInfoKey('toast.updateOrder', { id: currentEditOrderDisplayId || currentEditOrderId });
        closeAddOrderModal();
        loadOrdersData();
        return;
      }

      if (response && response.branchReadOnly && window.handleBranchReadOnlyResponse) {
        window.handleBranchReadOnlyResponse(response);
        return;
      }

      toastErrorKey('error.orderUpdateFail', { error: response?.error || tOrders('error.unknown') });
      return;
    }

    if (window.ScreenPermissions && !window.ScreenPermissions.check('orders_add', tOrders('permissions.ordersAdd'))) {
      return;
    }

    response = await window.orders.add(orderData);
    if (response && response.success) {
      toastInfoKey('toast.addOrder', { id: response.branch_local_number || response.id });
      closeAddOrderModal();
      loadOrdersData();
      return;
    }

    if (response && response.branchReadOnly && window.handleBranchReadOnlyResponse) {
      window.handleBranchReadOnlyResponse(response);
      return;
    }

    toastErrorKey('error.orderAddFail', { error: response?.error || tOrders('error.unknown') });
  } catch (error) {
    toastErrorKey('error.orderAddFail', { error: error?.message || tOrders('error.unknown') });
  }
}

let confirmModalCallback = null;

function showConfirmModal(title, message) {
  return new Promise((resolve) => {
    const modal = document.getElementById('confirmModal');
    const titleEl = document.getElementById('confirmModalTitle');
    const messageEl = document.getElementById('confirmModalMessage');

    if (!modal || !titleEl || !messageEl) {
      resolve(false);
      return;
    }

    titleEl.innerHTML = `<i class="fa-solid fa-exclamation-triangle"></i> ${title}`;
    messageEl.textContent = message;

    confirmModalCallback = resolve;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
}

function closeConfirmModal(result = false) {
  const modal = document.getElementById('confirmModal');
  if (!modal) return;

  modal.classList.remove('active');
  document.body.style.overflow = '';

  if (confirmModalCallback) {
    confirmModalCallback(result);
    confirmModalCallback = null;
  }
}

const lcModal = document.getElementById('lookupCustomerModal');
const lcClose = document.getElementById('lookupCustomerClose');
const lcCancel = document.getElementById('lookupCustomerCancel');
const lcSearch = document.getElementById('lc_search');
const lcTbody = document.getElementById('lc_tbody');

async function fetchOrderCustomers(options = {}) {
  try {
    const result = window.api?.getCustomers ? await window.api.getCustomers(options) : (window.db?.getCustomers ? await window.db.getCustomers(options) : null);
    if (result && result.success && Array.isArray(result.data)) return result.data;
    if (result && Array.isArray(result.customers)) return result.customers;
    if (Array.isArray(result)) return result;
  } catch (_) {}
  return [];
}

async function fetchOrderSuppliers(options = {}) {
  try {
    const result = window.api?.getSuppliers ? await window.api.getSuppliers(options) : (window.suppliers?.getSuppliers ? await window.suppliers.getSuppliers(options) : null);
    if (result && result.success && Array.isArray(result.data)) return result.data;
    if (result && Array.isArray(result.suppliers)) return result.suppliers;
    if (Array.isArray(result)) return result;
  } catch (_) {}
  return [];
}

async function loadCustomersForLookup() {
  try {
    return await fetchOrderCustomers();
  } catch (_) {
    return [];
  }
}

function displayCustomersLookup(customers, searchTerm = '') {
  if (!lcTbody) return;
  lcTbody.innerHTML = '';

  if (!Array.isArray(customers)) {
    lcTbody.innerHTML = '<tr><td colspan="2" style="text-align:center; padding:20px; color: red;">خطأ في تحميل البيانات</td></tr>';
    return;
  }

  const filtered = searchTerm
    ? customers.filter(c => String(c.id).includes(searchTerm) || String(c.name || '').toLowerCase().includes(String(searchTerm).toLowerCase()))
    : customers;

  if (filtered.length === 0) {
    lcTbody.innerHTML = '<tr><td colspan="2" style="text-align:center; padding:20px;">لا توجد نتائج</td></tr>';
    return;
  }

  filtered.forEach(customer => {
    const tr = document.createElement('tr');
    tr.style.cursor = 'pointer';
    tr.innerHTML = `<td>${customer.id}</td><td>${customer.name}</td>`;
    tr.addEventListener('click', () => {
      const customerIdEl = document.getElementById('customer_id');
      const customerNameEl = document.getElementById('customer_name');
      const supplierIdEl = document.getElementById('supplier_id');

      if (customerIdEl) customerIdEl.value = customer.id;
      if (customerNameEl) customerNameEl.value = customer.name;
      if (supplierIdEl) supplierIdEl.value = '';

      closeCustomerLookup();
      if (customerIdEl) customerIdEl.focus();
    });
    lcTbody.appendChild(tr);
  });
}

async function openCustomerLookup() {
  const customers = await loadCustomersForLookup();
  displayCustomersLookup(customers);
  if (lcModal) {
    lcModal.style.display = 'flex';
    lcModal.setAttribute('aria-hidden', 'false');
  }
  if (lcSearch) {
    lcSearch.value = '';
    lcSearch.focus();
  }
}

function closeCustomerLookup() {
  if (!lcModal) return;
  lcModal.setAttribute('aria-hidden', 'true');
  lcModal.style.display = 'none';
}

const lsModal = document.getElementById('lookupSupplierModal');
const lsClose = document.getElementById('lookupSupplierClose');
const lsCancel = document.getElementById('lookupSupplierCancel');
const lsSearch = document.getElementById('ls_search');
const lsTbody = document.getElementById('ls_tbody');

async function loadSuppliersForLookup() {
  try {
    return await fetchOrderSuppliers();
  } catch (_) {
    return [];
  }
}

function displaySuppliersLookup(suppliers, searchTerm = '') {
  if (!lsTbody) return;
  lsTbody.innerHTML = '';

  if (!Array.isArray(suppliers)) {
    lsTbody.innerHTML = '<tr><td colspan="2" style="text-align:center; padding:20px; color: red;">خطأ في تحميل البيانات</td></tr>';
    return;
  }

  const filtered = searchTerm
    ? suppliers.filter(s => String(s.id).includes(searchTerm) || String(s.name || '').toLowerCase().includes(String(searchTerm).toLowerCase()))
    : suppliers;

  if (filtered.length === 0) {
    lsTbody.innerHTML = '<tr><td colspan="2" style="text-align:center; padding:20px;">لا توجد نتائج</td></tr>';
    return;
  }

  filtered.forEach(supplier => {
    const tr = document.createElement('tr');
    tr.style.cursor = 'pointer';
    tr.innerHTML = `<td>${supplier.id}</td><td>${supplier.name}</td>`;
    tr.addEventListener('click', () => {
      const supplierIdEl = document.getElementById('supplier_id');
      const customerNameEl = document.getElementById('customer_name');
      const customerIdEl = document.getElementById('customer_id');

      if (supplierIdEl) supplierIdEl.value = supplier.id;
      if (customerNameEl) customerNameEl.value = supplier.name;
      if (customerIdEl) customerIdEl.value = '';

      closeSupplierLookup();
      if (supplierIdEl) supplierIdEl.focus();
    });
    lsTbody.appendChild(tr);
  });
}

async function openSupplierLookup() {
  const suppliers = await loadSuppliersForLookup();
  displaySuppliersLookup(suppliers);
  if (lsModal) {
    lsModal.style.display = 'flex';
    lsModal.setAttribute('aria-hidden', 'false');
  }
  if (lsSearch) {
    lsSearch.value = '';
    lsSearch.focus();
  }
}

function closeSupplierLookup() {
  if (!lsModal) return;
  lsModal.setAttribute('aria-hidden', 'true');
  lsModal.style.display = 'none';
}

const customerIdInput = document.getElementById('customer_id');
const supplierIdInput = document.getElementById('supplier_id');

function bindLookupEvents() {
  if (lcClose) lcClose.addEventListener('click', closeCustomerLookup);
  if (lcCancel) lcCancel.addEventListener('click', closeCustomerLookup);
  if (lcModal) {
    const backdrop = lcModal.querySelector('.modal-backdrop');
    if (backdrop) backdrop.addEventListener('click', closeCustomerLookup);
  }

  if (lsClose) lsClose.addEventListener('click', closeSupplierLookup);
  if (lsCancel) lsCancel.addEventListener('click', closeSupplierLookup);
  if (lsModal) {
    const backdrop = lsModal.querySelector('.modal-backdrop');
    if (backdrop) backdrop.addEventListener('click', closeSupplierLookup);
  }

  if (lcSearch) {
    lcSearch.addEventListener('input', async (e) => {
      const customers = await loadCustomersForLookup();
      displayCustomersLookup(customers, e.target.value);
    });

    lcSearch.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;
      e.preventDefault();
      const firstRow = lcTbody ? lcTbody.querySelector('tr') : null;
      if (firstRow && !firstRow.textContent.includes('لا توجد نتائج')) firstRow.click();
    });
  }

  if (lsSearch) {
    lsSearch.addEventListener('input', async (e) => {
      const suppliers = await loadSuppliersForLookup();
      displaySuppliersLookup(suppliers, e.target.value);
    });

    lsSearch.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;
      e.preventDefault();
      const firstRow = lsTbody ? lsTbody.querySelector('tr') : null;
      if (firstRow && !firstRow.textContent.includes('لا توجد نتائج')) firstRow.click();
    });
  }

  if (customerIdInput) {
    customerIdInput.addEventListener('keydown', (e) => {
      if (e.key === 'F9') {
        e.preventDefault();
        openCustomerLookup();
      }
    });

    customerIdInput.addEventListener('change', async function() {
      const customerId = String(this.value || '').trim();
      const customerNameEl = document.getElementById('customer_name');
      if (!customerId) {
        if (customerNameEl) customerNameEl.value = '';
        return;
      }

      try {
        const customers = await fetchOrderCustomers();
        const customer = customers.find(c => String(c.id) === customerId);

        if (customer) {
          if (customerNameEl) customerNameEl.value = customer.name;
          if (supplierIdInput) supplierIdInput.value = '';
          return;
        }

        if (customerNameEl) customerNameEl.value = '';
        toastErrorKey('error.customerNotFound');
        this.value = '';
      } catch (_) {
        toastErrorKey('error.customerFetchFail');
      }
    });
  }

  if (supplierIdInput) {
    supplierIdInput.addEventListener('keydown', (e) => {
      if (e.key === 'F9') {
        e.preventDefault();
        openSupplierLookup();
      }
    });

    supplierIdInput.addEventListener('change', async function() {
      const supplierId = String(this.value || '').trim();
      const customerNameEl = document.getElementById('customer_name');
      if (!supplierId) {
        if (customerNameEl) customerNameEl.value = '';
        return;
      }

      try {
        const suppliers = await fetchOrderSuppliers();
        const supplier = suppliers.find(s => String(s.id) === supplierId);

        if (supplier) {
          if (customerNameEl) customerNameEl.value = supplier.name;
          if (customerIdInput) customerIdInput.value = '';
          return;
        }

        if (customerNameEl) customerNameEl.value = '';
        toastErrorKey('error.supplierNotFound');
        this.value = '';
      } catch (_) {
        toastErrorKey('error.supplierFetchFail');
      }
    });
  }
}

function bindOperationCards() {
  const operationCards = document.querySelectorAll('.operation-card');
  operationCards.forEach(card => {
    card.addEventListener('click', () => {
      operationCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const operationType = card.getAttribute('data-type');
      const opEl = document.getElementById('operation_type');
      if (opEl) opEl.value = operationType;
    });
  });
}

function bindEnterNavigation() {
  const formInputs = document.querySelectorAll('#addOrderForm input, #addOrderForm textarea');
  formInputs.forEach((input, index) => {
    input.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' || e.shiftKey) return;
      e.preventDefault();

      let nextIndex = index + 1;
      while (nextIndex < formInputs.length) {
        const nextInput = formInputs[nextIndex];
        if (nextInput.type !== 'hidden' && !nextInput.readOnly && nextInput.offsetParent !== null) {
          nextInput.focus();
          break;
        }
        nextIndex++;
      }
    });
  });
}

function bindUIEvents() {
  const btnCloseOrders = document.getElementById('btnCloseOrders');
  if (btnCloseOrders) {
    btnCloseOrders.addEventListener('click', () => {
      try {
        const parentDoc = window.parent?.document || window.top?.document;
        const dashTab = parentDoc ? parentDoc.getElementById('tab-dashboard') : null;
        if (dashTab && typeof dashTab.click === 'function') {
          dashTab.click();
        }
      } catch (_) {
        try { window.location.href = '../main/index.html'; } catch (_) {}
      }
    });
  }

  const btnRefreshXauLocal = document.getElementById('btnRefreshXau');
  if (btnRefreshXauLocal) {
    btnRefreshXauLocal.addEventListener('click', () => refreshXauPrice({ silent: false }));
  }

  const btnMt5ReconnectXauLocal = document.getElementById('btnMt5ReconnectXau');
  if (btnMt5ReconnectXauLocal) {
    btnMt5ReconnectXauLocal.addEventListener('click', (e) => {
      e.preventDefault();
      attemptXauMt5ReconnectOnce();
    });
  }

  const btnRefreshOrders = document.getElementById('btnRefreshOrders');
  if (btnRefreshOrders) {
    btnRefreshOrders.addEventListener('click', () => {
      loadOrdersData();
      toastInfoKey('toast.refreshOrders');
    });
  }

  const btnAddOrder = document.getElementById('btnAddOrder');
  if (btnAddOrder) {
    btnAddOrder.addEventListener('click', () => {
      if (window.ScreenPermissions && !window.ScreenPermissions.check('orders_add', tOrders('permissions.ordersAdd'))) {
        return;
      }
      openAddOrderModal();
    });
  }

  const btnExportOrdersExcel = document.getElementById('btnExportOrdersExcel');
  if (btnExportOrdersExcel) {
    btnExportOrdersExcel.addEventListener('click', () => {
      if (window.ScreenPermissions && !window.ScreenPermissions.check('orders_export', tOrders('permissions.ordersExport'))) {
        return;
      }
      exportOrdersToExcel();
    });
  }

  const btnExportOrdersPdf = document.getElementById('btnExportOrdersPdf');
  if (btnExportOrdersPdf) {
    btnExportOrdersPdf.addEventListener('click', () => {
      if (window.ScreenPermissions && !window.ScreenPermissions.check('orders_export', tOrders('permissions.ordersExport'))) {
        return;
      }
      exportOrdersToPDF();
    });
  }

  const selectAllOrders = document.getElementById('selectAllOrders');
  if (selectAllOrders) {
    selectAllOrders.addEventListener('change', (e) => {
      document.querySelectorAll('.order-checkbox').forEach(cb => {
        cb.checked = e.target.checked;
      });
    });
  }

  const searchOrdersInput = document.getElementById('searchOrdersInput');
  if (searchOrdersInput) {
    searchOrdersInput.addEventListener('input', (e) => {
      const term = String(e.target.value || '').toLowerCase().trim();
      const tableRows = document.querySelectorAll('#ordersTableBody tr:not(.empty-row)');

      tableRows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = term === '' || text.includes(term) ? '' : 'none';
      });
    });
  }

  const addOrderModal = document.getElementById('addOrderModal');
  if (addOrderModal) {
    addOrderModal.addEventListener('click', (e) => {
      if (e.target === addOrderModal) closeAddOrderModal();
    });
  }

  const confirmModal = document.getElementById('confirmModal');
  if (confirmModal) {
    confirmModal.addEventListener('click', (e) => {
      if (e.target === confirmModal) closeConfirmModal(false);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;

    if (confirmModal && confirmModal.classList.contains('active')) {
      closeConfirmModal(false);
      return;
    }

    if (addOrderModal && addOrderModal.classList.contains('active')) {
      closeAddOrderModal();
      return;
    }

    if (lcModal && lcModal.style.display === 'flex') {
      closeCustomerLookup();
      return;
    }

    if (lsModal && lsModal.style.display === 'flex') {
      closeSupplierLookup();
    }
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  applyOrdersStaticTexts();
  startXauPolling();

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      scheduleLocalOrdersMidnightRefresh();
      refreshXauPrice({ silent: true });
    }
  });

  window.addEventListener('focus', () => {
    scheduleLocalOrdersMidnightRefresh();
    refreshXauPrice({ silent: true });
  });
  window.addEventListener('online', () => refreshXauPrice({ silent: true }));

  if (window.ScreenPermissions && permissionsInitialized) {
    if (!window.ScreenPermissions.has('orders_add')) {
      const btnAddOrder = document.getElementById('btnAddOrder');
      if (btnAddOrder) btnAddOrder.style.display = 'none';
    }
    if (!window.ScreenPermissions.has('orders_export')) {
      const btnExportOrdersExcel = document.getElementById('btnExportOrdersExcel');
      const btnExportOrdersPdf = document.getElementById('btnExportOrdersPdf');
      if (btnExportOrdersExcel) btnExportOrdersExcel.style.display = 'none';
      if (btnExportOrdersPdf) btnExportOrdersPdf.style.display = 'none';
    }
  }

  bindLookupEvents();
  bindOperationCards();
  bindEnterNavigation();
  bindUIEvents();

  ensureAPIBridge();
  if (!window.__ordersIpcBound && window.api && window.api.on) {
    window.__ordersIpcBound = true;
    window.api.on('orders-updated', () => {
      loadOrdersData();
    });
  }

  await loadOrdersData();
});

window.addEventListener('message', async (event) => {
  if (event?.data?.type !== 'cloud-data-updated') {
    return;
  }
  const payload = event.data.payload || {};
  const tables = Array.isArray(payload?.tables) ? payload.tables : [];
  if (!tables.includes('orders')) {
    return;
  }
  loadOrdersData();
});

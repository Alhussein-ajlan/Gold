// Tax Declaration Script
(async function() {
    'use strict';
// Global error handler
window.addEventListener('error', function(event) {
    console.error('Global error caught:', event.error);
    console.error('Error message:', event.message);
    console.error('Error filename:', event.filename);
    console.error('Error line:', event.lineno);
    console.error('Error column:', event.colno);
});
// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
    console.error('Promise:', event.promise);
});
// Wait for window.api to be available
function waitForApi() {
    return new Promise((resolve) => {
        if (window.api) {
            resolve();
        } else {
            const checkInterval = setInterval(() => {
                if (window.api) {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 50);
        }
    });
}
// State Management
const state = {
    currentDeclaration: null,
    declarations: [],
    settings: null,
    translations: {},
    currentLang: 'ar',
    currentTheme: 'light',
    companyInfo: null
};
function showPermissionDeniedMessage(message) {
    if (window.PermissionDeniedModal && typeof window.PermissionDeniedModal.show === 'function') {
        window.PermissionDeniedModal.show(message);
        return;
    }
    if (window.showAlert && typeof window.showAlert === 'function') {
        window.showAlert(message, 'ممنوع الوصول', 'error');
        return;
    }
    showNotification(message, 'error');
}
function getCurrentBranchId() {
    try {
        const explicitBranchId = Number(window.currentBranchContext?.id || window.currentBranchScopeContext?.branchId || 0) || 0;
        if (explicitBranchId > 0) {
            return explicitBranchId;
        }
    } catch (_) {}
    try {
        const raw = localStorage.getItem('currentBranch');
        const parsed = raw ? JSON.parse(raw) : null;
        const branchId = Number(parsed?.id || parsed?.branch_id || parsed?.branchId || 0) || 0;
        return branchId > 0 ? branchId : 0;
    } catch (_) {
        return 0;
    }
}
function findDeclarationByIdentity(declarationNumber, branchId = null) {
    const normalizedNumber = String(declarationNumber || '').trim();
    if (!normalizedNumber || !Array.isArray(state.declarations) || state.declarations.length === 0) {
        return null;
    }
    const normalizedBranchId = Number(branchId || 0) || 0;
    if (normalizedBranchId > 0) {
        const exactMatch = state.declarations.find(dec =>
            String(dec?.declaration_number || '').trim() === normalizedNumber
            && (Number(dec?.branch_id || 0) || 0) === normalizedBranchId
        );
        if (exactMatch) {
            return exactMatch;
        }
    }
    return state.declarations.find(dec => String(dec?.declaration_number || '').trim() === normalizedNumber) || null;
}
// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await waitForApi();
        await loadSettings();
        await loadTranslations();
        applyTheme();
        applyTranslations();
        // Setup event listeners immediately so buttons are responsive
        setupEventListeners();
        setupCloudRealtimeListeners();
        // Wait for permissions to be loaded (in parallel with other tasks)
        const permissionsPromise = waitForPermissions();
        // Load other data
        await loadCompanyInfo();
        await generateDeclarationNumber();
        setDefaultDates();
        // Make sure permissions are loaded before checking them
        await permissionsPromise;
        checkPermissions();
    } catch (error) {
        console.error('Error during initialization:', error);
        console.error('Error stack:', error.stack);
        showNotification('حدث خطأ أثناء تحميل الشاشة: ' + error.message, 'error');
    }
    // Setup notification close button
    const closeBtn = document.getElementById('notificationClose');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeNotification);
    }
    const notificationModal = document.getElementById('notificationModal');
    if (notificationModal) {
        notificationModal.addEventListener('click', (e) => {
            if (e.target.id === 'notificationModal') {
                closeNotification();
            }
        });
    }
    // Setup analytics modal event listeners
    const closeAnalyticsBtn = document.getElementById('closeAnalyticsModal');
    if (closeAnalyticsBtn) {
        closeAnalyticsBtn.addEventListener('click', () => {
            window.taxAnalyticsModal.close();
        });
    }
    const analyticsModal = document.getElementById('analyticsModal');
    if (analyticsModal) {
        analyticsModal.addEventListener('click', (e) => {
            if (e.target.id === 'analyticsModal') {
                window.taxAnalyticsModal.close();
            }
        });
    }
    const refreshAnalyticsBtn = document.getElementById('refreshAnalytics');
    if (refreshAnalyticsBtn) {
        refreshAnalyticsBtn.addEventListener('click', () => {
            window.taxAnalyticsModal.refreshAnalytics();
        });
    }
    const printAnalyticsBtn = document.getElementById('printAnalytics');
    if (printAnalyticsBtn) {
        printAnalyticsBtn.addEventListener('click', () => {
            window.taxAnalyticsModal.printAnalytics();
        });
    }
    const exportAnalyticsExcelBtn = document.getElementById('exportAnalyticsExcel');
    if (exportAnalyticsExcelBtn) {
        exportAnalyticsExcelBtn.addEventListener('click', () => {
            showNotification('ميزة التصدير إلى Excel قيد التطوير', 'info');
        });
    }
    const analyticsYear = document.getElementById('analyticsYear');
    if (analyticsYear) {
        analyticsYear.addEventListener('change', () => {
            window.taxAnalyticsModal.refreshAnalytics();
        });
    }
    const compareCheckbox = document.getElementById('compareWithPrevious');
    if (compareCheckbox) {
        compareCheckbox.addEventListener('change', () => {
            window.taxAnalyticsModal.refreshAnalytics();
        });
    }
    const analyticsPeriodType = document.getElementById('analyticsPeriodType');
    if (analyticsPeriodType) {
        analyticsPeriodType.addEventListener('change', () => {
            window.taxAnalyticsModal.refreshAnalytics();
        });
    }
});
// Wait for permissions to be loaded
async function waitForPermissions() {
    // Check if permissions already loaded by shell.js
    if (window.userPermissions && window.userPermissions.length > 0) {
        return;
    }
    // Load permissions using the dedicated permissions API
    try {
        const currentUserData = JSON.parse(localStorage.getItem('currentUser') || '{}');
        if (!currentUserData.id) {
            window.userPermissions = [];
            return;
        }
        const permissionsResponse = await window.permissions?.getUserPermissions?.(currentUserData.id);
        if (permissionsResponse && permissionsResponse.success && Array.isArray(permissionsResponse.data) && permissionsResponse.data.length > 0) {
            window.userPermissions = permissionsResponse.data.map(row => row.name);
        } else {
            window.userPermissions = [];
        }
    } catch (error) {
        window.userPermissions = [];
    }
}
// Load Settings
async function loadSettings() {
    try {
        // Get language from localStorage
        state.currentLang = localStorage.getItem('uiLang') || 'ar';
        // Get theme from localStorage
        state.currentTheme = localStorage.getItem('theme') || 'light';
        // Create settings object
        state.settings = { 
            language: state.currentLang, 
            theme: state.currentTheme,
            taxRate: 15 // Default tax rate
        };
    } catch (error) {
        state.settings = { language: 'ar', theme: 'light', taxRate: 15 };
        state.currentLang = 'ar';
        state.currentTheme = 'light';
    }
}
// Load Translations
async function loadTranslations() {
    try {
        const response = await fetch(`./locales/${state.currentLang}.json`);
        state.translations = await response.json();
    } catch (error) {
        // Silently handle translation loading errors
    }
}
// Apply Theme
function applyTheme() {
    if (state.currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
}
// Apply Translations
function applyTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (state.translations[key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = state.translations[key];
            } else {
                element.textContent = state.translations[key];
            }
        }
    });
    // Set direction
    document.documentElement.setAttribute('lang', state.currentLang);
    document.documentElement.setAttribute('dir', state.currentLang === 'ar' ? 'rtl' : 'ltr');
}
// Check Permissions
async function checkPermissions() {
    try {
        // Get user permissions from window.userPermissions (set by main shell)
        const permissions = window.userPermissions || [];
        // Check individual permissions
        const canGenerate = permissions.includes('tax_declaration_generate');
        const canSaveDraft = permissions.includes('tax_declaration_save_draft');
        const canSubmit = permissions.includes('tax_declaration_submit');
        const canPrint = permissions.includes('tax_declaration_print');
        const canExport = permissions.includes('tax_declaration_export');
        const canDelete = permissions.includes('tax_declaration_delete');
        // Don't hide buttons - just store permissions for checking when clicked
        // Store permissions in state for later use
        window.taxDeclarationPermissions = {
            canGenerate,
            canSaveDraft,
            canSubmit,
            canPrint,
            canExport,
            canDelete
        };
    } catch (error) {
        // Silent error handling
    }
}
// Setup Event Listeners
function setupEventListeners() {
    // Period Type Change
    const periodType = document.getElementById('periodType');
    if (periodType) {
        periodType.addEventListener('change', handlePeriodTypeChange);
    } else {
        console.warn('periodType element not found');
    }
    // Quarter Select Change
    const quarterSelect = document.getElementById('quarterSelect');
    if (quarterSelect) {
        quarterSelect.addEventListener('change', handleQuarterChange);
    } else {
        console.warn('quarterSelect element not found');
    }
    // Generate Declaration
    const generateBtn = document.getElementById('generateBtn');
    if (generateBtn) {
        generateBtn.addEventListener('click', generateDeclaration);
    } else {
        console.warn('generateBtn element not found');
    }
    // Reset Filters
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetFilters);
    } else {
        console.warn('resetBtn element not found');
    }
    // View History
    const viewHistoryBtn = document.getElementById('viewHistoryBtn');
    if (viewHistoryBtn) {
        viewHistoryBtn.addEventListener('click', showHistory);
    } else {
        console.warn('viewHistoryBtn element not found');
    }
    // View Analytics
    const viewAnalyticsBtn = document.getElementById('viewAnalyticsBtn');
    if (viewAnalyticsBtn) {
        viewAnalyticsBtn.addEventListener('click', () => {
            try {
                if (!window.taxAnalyticsModal) {
                    console.error('Tax Analytics Modal is not initialized');
                    showNotification('ميزة التحليلات قيد التطوير حالياً', 'warning');
                    return;
                }
                window.taxAnalyticsModal.open();
            } catch (error) {
                console.error('Error opening analytics modal:', error);
                showNotification('حدث خطأ أثناء فتح التحليلات: ' + error.message, 'error');
            }
        });
    } else {
        console.warn('viewAnalyticsBtn element not found');
    }
    // Close History Modal
    const closeHistoryModal = document.getElementById('closeHistoryModal');
    if (closeHistoryModal) {
        closeHistoryModal.addEventListener('click', closeHistory);
    } else {
        console.warn('closeHistoryModal element not found');
    }
    // Export Excel
    const exportExcelBtn = document.getElementById('exportExcelBtn');
    if (exportExcelBtn) {
        exportExcelBtn.addEventListener('click', exportToExcel);
    } else {
        console.warn('exportExcelBtn element not found');
    }
    // Print
    const printBtn = document.getElementById('printBtn');
    if (printBtn) {
        printBtn.addEventListener('click', printDeclaration);
    } else {
        console.warn('printBtn element not found');
    }
    // Save Draft
    const saveDraftBtn = document.getElementById('saveDraftBtn');
    if (saveDraftBtn) {
        saveDraftBtn.addEventListener('click', () => saveDeclaration('draft'));
    } else {
        console.warn('saveDraftBtn element not found');
    }
    // Submit Declaration
    const submitDeclarationBtn = document.getElementById('submitDeclarationBtn');
    if (submitDeclarationBtn) {
        submitDeclarationBtn.addEventListener('click', () => saveDeclaration('submitted'));
    } else {
        console.warn('submitDeclarationBtn element not found');
    }
    // Close modal on outside click
    const historyModal = document.getElementById('historyModal');
    if (historyModal) {
        historyModal.addEventListener('click', (e) => {
            if (e.target.id === 'historyModal') {
                closeHistory();
            }
        });
    } else {
        console.warn('historyModal element not found');
    }
}
// Load Company Info
async function loadCompanyInfo() {
    try {
        // Get company info from database
        const response = await window.api.invoke('get-company-info');
        // Extract company data from response
        const companyInfo = response?.company || response;
        if (companyInfo && companyInfo.name) {
            // Store in state for later use
            state.companyInfo = companyInfo;
            // Update display
            const companyNameEl = document.getElementById('companyName');
            const taxNumberEl = document.getElementById('taxNumber');
            const addressEl = document.getElementById('address');
            const phoneEl = document.getElementById('phone');
            if (companyNameEl) companyNameEl.textContent = companyInfo.name || 'اسم الشركة';
            if (taxNumberEl) taxNumberEl.textContent = companyInfo.tax || '-';
            if (addressEl) addressEl.textContent = companyInfo.address || '-';
            if (phoneEl) phoneEl.textContent = companyInfo.phone || '-';
        } else {
            // Fallback to defaults
            const companyNameEl = document.getElementById('companyName');
            const taxNumberEl = document.getElementById('taxNumber');
            const addressEl = document.getElementById('address');
            const phoneEl = document.getElementById('phone');
            if (companyNameEl) companyNameEl.textContent = 'اسم الشركة';
            if (taxNumberEl) taxNumberEl.textContent = '-';
            if (addressEl) addressEl.textContent = '-';
            if (phoneEl) phoneEl.textContent = '-';
        }
        // Set default responsible name from current user
        let currentUserName = '';
        try {
            const currentUserStr = localStorage.getItem('currentUser');
            if (currentUserStr) {
                const currentUser = JSON.parse(currentUserStr);
                currentUserName = currentUser.full_name || currentUser.username || '';
            }
        } catch (e) {
            // If parsing fails, try to get username directly
            currentUserName = localStorage.getItem('username') || '';
        }
        const responsibleNameEl = document.getElementById('responsibleName');
        if (responsibleNameEl && currentUserName) {
            responsibleNameEl.value = currentUserName;
        }
    } catch (error) {
        // Set defaults if error
        const companyNameEl = document.getElementById('companyName');
        const taxNumberEl = document.getElementById('taxNumber');
        const addressEl = document.getElementById('address');
        const phoneEl = document.getElementById('phone');
        if (companyNameEl) companyNameEl.textContent = 'اسم الشركة';
        if (taxNumberEl) taxNumberEl.textContent = '-';
        if (addressEl) addressEl.textContent = '-';
        if (phoneEl) phoneEl.textContent = '-';
    }
}
async function refreshActiveCompanyInfo() {
    try {
        await loadCompanyInfo();
    } catch (_) {}
    return {
        companyName: state.companyInfo?.name || '',
        companyTax: state.companyInfo?.tax || ''
    };
}
// Generate Declaration Number
async function generateDeclarationNumber() {
    try {
        const response = await window.api?.getTaxDeclarationNextNumber?.();
        const declarationNumber = response && response.success && response.declarationNumber
            ? response.declarationNumber
            : '';
        const declarationNumberEl = document.getElementById('declarationNumber');
        if (declarationNumberEl && declarationNumber) {
            declarationNumberEl.value = declarationNumber;
        }
    } catch (error) {
        // Fallback to old format
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        const declarationNumber = `TD-${year}${month}-${random}`;
        const declarationNumberEl = document.getElementById('declarationNumber');
        if (declarationNumberEl) {
            declarationNumberEl.value = declarationNumber;
        }
    }
}
// Set Default Dates
function setDefaultDates() {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const periodFrom = document.getElementById('periodFrom');
    const periodTo = document.getElementById('periodTo');
    const submissionDate = document.getElementById('submissionDate');
    const periodType = document.getElementById('periodType');
    if (periodFrom) {
        periodFrom.value = formatDateForInput(firstDay);
    }
    if (periodTo) {
        periodTo.value = formatDateForInput(lastDay);
    }
    if (submissionDate) {
        submissionDate.value = formatDateForInput(now);
    }
    if (periodType) {
        periodType.value = 'monthly';
    }
}
// Handle Period Type Change
function handlePeriodTypeChange() {
    const periodTypeEl = document.getElementById('periodType');
    const periodFromEl = document.getElementById('periodFrom');
    const periodToEl = document.getElementById('periodTo');
    const quarterSelectGroup = document.getElementById('quarterSelectGroup');
    const quarterSelect = document.getElementById('quarterSelect');
    if (!periodTypeEl || !periodFromEl || !periodToEl) return;
    const periodType = periodTypeEl.value;
    const now = new Date();
    let fromDate, toDate;
    if (periodType === 'monthly') {
        // Hide quarter selector
        if (quarterSelectGroup) quarterSelectGroup.style.display = 'none';
        // Current month
        fromDate = new Date(now.getFullYear(), now.getMonth(), 1);
        toDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        periodFromEl.value = formatDateForInput(fromDate);
        periodToEl.value = formatDateForInput(toDate);
        periodFromEl.disabled = true;
        periodToEl.disabled = true;
    } else if (periodType === 'quarterly') {
        // Show quarter selector
        if (quarterSelectGroup) quarterSelectGroup.style.display = '';
        // Set current quarter
        const currentQuarter = Math.floor(now.getMonth() / 3) + 1;
        if (quarterSelect) quarterSelect.value = currentQuarter.toString();
        // Update dates based on selected quarter
        handleQuarterChange();
    } else {
        // Custom - hide quarter selector and enable date inputs
        if (quarterSelectGroup) quarterSelectGroup.style.display = 'none';
        periodFromEl.disabled = false;
        periodToEl.disabled = false;
    }
}
// Handle Quarter Change
function handleQuarterChange() {
    const quarterSelect = document.getElementById('quarterSelect');
    const periodFromEl = document.getElementById('periodFrom');
    const periodToEl = document.getElementById('periodTo');
    if (!quarterSelect || !periodFromEl || !periodToEl) return;
    const quarter = parseInt(quarterSelect.value);
    const now = new Date();
    const year = now.getFullYear();
    // Calculate quarter dates
    const quarterStartMonth = (quarter - 1) * 3;
    const fromDate = new Date(year, quarterStartMonth, 1);
    const toDate = new Date(year, quarterStartMonth + 3, 0);
    periodFromEl.value = formatDateForInput(fromDate);
    periodToEl.value = formatDateForInput(toDate);
    periodFromEl.disabled = true;
    periodToEl.disabled = true;
}
// Format Date for Input
function formatDateForInput(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
// Generate Declaration
async function generateDeclaration() {
    try {
        const generateBtn = document.getElementById('generateBtn');
        // If permissions not loaded yet, wait for them
        if (!window.userPermissions || window.userPermissions.length === 0) {
            await waitForPermissions();
        }
        // Check generate permission - use window.userPermissions directly for immediate check
        const permissions = window.userPermissions || [];
        const canGenerate = permissions.includes('tax_declaration_generate');
        if (!canGenerate) {
            console.warn('User does not have permission to generate declaration');
            showPermissionDeniedMessage('ليس لديك صلاحية إنشاء الإقرار الضريبي');
            return;
        }
        const periodFrom = document.getElementById('periodFrom').value;
        const periodTo = document.getElementById('periodTo').value;
        if (!periodFrom || !periodTo) {
            console.warn('Period dates not selected');
            showNotification(state.translations.selectPeriodError || 'الرجاء تحديد الفترة الضريبية', 'warning');
            return;
        }
        if (new Date(periodFrom) > new Date(periodTo)) {
            showNotification(state.translations.invalidPeriodError || 'تاريخ البداية يجب أن يكون قبل تاريخ النهاية', 'error');
            return;
        }
        await refreshActiveCompanyInfo();
        // Show loading
        showLoading();
        const summaryResult = await window.api?.generateTaxDeclarationSummary?.({ periodFrom, periodTo });
        if (!summaryResult || !summaryResult.success || !summaryResult.data) {
            throw new Error(summaryResult?.error || 'SUMMARY_FAILED');
        }
        const salesTotal = summaryResult.data.salesTotal || 0;
        const salesTax = summaryResult.data.salesTax || 0;
        const purchasesTotal = summaryResult.data.purchasesTotal || 0;
        const purchasesTax = summaryResult.data.purchasesTax || 0;
        const voucherTotal = summaryResult.data.expensesTotal || 0;
        const voucherTax = summaryResult.data.expensesTax || 0;
        const salesZeroAmount = summaryResult.data.salesZeroAmount || 0;
        const purchasesZeroAmount = summaryResult.data.purchasesZeroAmount || 0;
        const combinedPurchasesTotal = summaryResult.data.combinedPurchasesTotal || (purchasesTotal + voucherTotal);
        const combinedPurchasesTax = summaryResult.data.combinedPurchasesTax || (purchasesTax + voucherTax);
        const netTax = summaryResult.data.netTax || (salesTax - combinedPurchasesTax);
        // Update summary cards with separated data
        updateSummaryCards(salesTotal, salesTax, purchasesTotal, purchasesTax, voucherTotal, voucherTax, netTax, salesZeroAmount, purchasesZeroAmount);
        // Update details table
        updateDetailsTable(salesTotal, salesTax, purchasesTotal, purchasesTax, voucherTotal, voucherTax, netTax);
        // Show declaration card
        document.getElementById('declarationCard').style.display = 'block';
        // Set default responsible name if empty
        const responsibleNameEl = document.getElementById('responsibleName');
        if (responsibleNameEl && !responsibleNameEl.value) {
            let currentUserName = '';
            try {
                const currentUserStr = localStorage.getItem('currentUser');
                if (currentUserStr) {
                    const currentUser = JSON.parse(currentUserStr);
                    currentUserName = currentUser.full_name || currentUser.username || '';
                }
            } catch (e) {
                // If parsing fails, try to get username directly
                currentUserName = localStorage.getItem('username') || '';
            }
            if (currentUserName) {
                responsibleNameEl.value = currentUserName;
            }
        }
        // Store current declaration
        state.currentDeclaration = {
            declarationNumber: document.getElementById('declarationNumber').value,
            periodFrom,
            periodTo,
            branchId: getCurrentBranchId(),
            salesTotal,
            salesTax,
            salesZeroAmount,
            purchasesTotal,
            purchasesTax,
            purchasesZeroAmount,
            expensesTotal: voucherTotal,
            expensesTax: voucherTax,
            netTax
        };
        hideLoading();
    } catch (error) {
        console.error('Error generating declaration:', error);
        console.error('Error stack:', error.stack);
        showNotification(state.translations.errorGenerating || 'حدث خطأ أثناء إنشاء الإقرار: ' + error.message, 'error');
        hideLoading();
    }
}
// Update Summary Cards
function updateSummaryCards(salesTotal, salesTax, purchasesTotal, purchasesTax, voucherTotal, voucherTax, netTax, salesZeroAmount = 0, purchasesZeroAmount = 0) {
    // Show summary section
    document.getElementById('summarySection').style.display = 'grid';
    document.getElementById('detailsSection').style.display = 'block';
    // Show action buttons
    document.getElementById('printBtn').style.display = 'flex';
    document.getElementById('exportExcelBtn').style.display = 'flex';
    // Sales card
    document.getElementById('totalSales').textContent = formatCurrency(salesTotal);
    document.getElementById('salesTax').textContent = formatCurrency(salesTax);
    document.getElementById('salesZeroRate').textContent = formatCurrency(salesZeroAmount);
    // Purchases card
    document.getElementById('purchasesAmount').textContent = formatCurrency(purchasesTotal);
    document.getElementById('purchasesTaxAmount').textContent = formatCurrency(purchasesTax);
    document.getElementById('purchasesZeroRate').textContent = formatCurrency(purchasesZeroAmount);
    // Expenses card
    document.getElementById('expensesAmount').textContent = formatCurrency(voucherTotal);
    document.getElementById('expensesTaxAmount').textContent = formatCurrency(voucherTax);
    // Net tax card - show negative sign if refundable
    const netTaxElement = document.getElementById('netTax');
    netTaxElement.textContent = formatCurrency(netTax);
    const netTaxCard = document.querySelector('.net-tax-card');
    if (netTax < 0) {
        netTaxCard.classList.remove('payable');
        netTaxCard.classList.add('refundable');
    } else {
        netTaxCard.classList.remove('refundable');
        netTaxCard.classList.add('payable');
    }
    const taxStatus = document.getElementById('taxStatus');
    if (netTax > 0) {
        taxStatus.textContent = state.translations.taxPayable || 'مستحقة للدفع';
    } else if (netTax < 0) {
        taxStatus.textContent = state.translations.taxRefundable || 'قابلة للاسترداد';
    } else {
        taxStatus.textContent = state.translations.taxZero || 'لا يوجد';
    }
}
// Update Details Table
function updateDetailsTable(salesTotal, salesTax, purchasesTotal, purchasesTax, expensesTotal, expensesTax, netTax) {
    const tbody = document.getElementById('detailsTableBody');
    const footer = document.getElementById('detailsTableFooter');
    const taxRate = state.settings?.taxRate || 15;
    const rows = [
        {
            number: 1,
            description: state.translations.salesRevenue || 'إيرادات المبيعات',
            taxableAmount: salesTotal,
            taxRate: taxRate,
            taxAmount: salesTax,
            total: salesTotal + salesTax
        },
        {
            number: 2,
            description: state.translations.purchases || 'المشتريات',
            taxableAmount: purchasesTotal,
            taxRate: taxRate,
            taxAmount: purchasesTax,
            total: purchasesTotal + purchasesTax
        },
        {
            number: 3,
            description: state.translations.taxExpenses || 'المصاريف الضريبية',
            taxableAmount: expensesTotal,
            taxRate: taxRate,
            taxAmount: expensesTax,
            total: expensesTotal + expensesTax
        }
    ];
    tbody.innerHTML = rows.map(row => `
        <tr>
            <td>${row.number}</td>
            <td>${row.description}</td>
            <td class="number">${formatCurrency(row.taxableAmount)}</td>
            <td>${row.taxRate}%</td>
            <td class="tax-value">${formatCurrency(row.taxAmount)}</td>
            <td class="total-value">${formatCurrency(row.total)}</td>
        </tr>
    `).join('');
    // Update footer
    document.getElementById('footerTaxable').textContent = formatCurrency(salesTotal + purchasesTotal + expensesTotal);
    document.getElementById('footerTax').textContent = formatCurrency(salesTax + purchasesTax + expensesTax);
    document.getElementById('footerTotal').textContent = formatCurrency(salesTotal + salesTax + purchasesTotal + purchasesTax + expensesTotal + expensesTax);
    footer.style.display = 'table-footer-group';
}
// Format Currency
function formatCurrency(amount) {
    // Always use English numbers (en-US) regardless of language
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}
// Reset Filters
async function resetFilters() {
    await generateDeclarationNumber();
    setDefaultDates();
    const statusFilter = document.getElementById('statusFilter');
    const periodType = document.getElementById('periodType');
    const periodFrom = document.getElementById('periodFrom');
    const periodTo = document.getElementById('periodTo');
    if (statusFilter) statusFilter.value = 'draft';
    if (periodType) periodType.value = 'monthly';
    // Enable date inputs
    if (periodFrom) periodFrom.disabled = false;
    if (periodTo) periodTo.disabled = false;
    // Hide sections
    const summarySection = document.getElementById('summarySection');
    const detailsSection = document.getElementById('detailsSection');
    const declarationCard = document.getElementById('declarationCard');
    const printBtn = document.getElementById('printBtn');
    const exportExcelBtn = document.getElementById('exportExcelBtn');
    if (summarySection) summarySection.style.display = 'none';
    if (detailsSection) detailsSection.style.display = 'none';
    if (declarationCard) declarationCard.style.display = 'none';
    if (printBtn) printBtn.style.display = 'none';
    if (exportExcelBtn) exportExcelBtn.style.display = 'none';
    // Clear table
    const tbody = document.getElementById('detailsTableBody');
    if (tbody) {
        tbody.innerHTML = `
            <tr class="empty-state">
                <td colspan="6" class="no-data">
                    <div class="empty-message">
                        <i class="fa-solid fa-file-circle-question"></i>
                        <p data-i18n="noData">${state.translations.noData || 'لا توجد بيانات لعرضها'}</p>
                        <small data-i18n="selectPeriod">${state.translations.selectPeriod || 'الرجاء تحديد الفترة الضريبية وإنشاء الإقرار'}</small>
                    </div>
                </td>
            </tr>
        `;
    }
    const footer = document.getElementById('detailsTableFooter');
    if (footer) footer.style.display = 'none';
    // Reset summary cards
    const totalSales = document.getElementById('totalSales');
    const salesTax = document.getElementById('salesTax');
    const purchasesAmount = document.getElementById('purchasesAmount');
    const purchasesTaxAmount = document.getElementById('purchasesTaxAmount');
    const expensesAmount = document.getElementById('expensesAmount');
    const expensesTaxAmount = document.getElementById('expensesTaxAmount');
    const netTax = document.getElementById('netTax');
    const taxStatus = document.getElementById('taxStatus');
    if (totalSales) totalSales.textContent = '0.00';
    if (salesTax) salesTax.textContent = '0.00';
    if (purchasesAmount) purchasesAmount.textContent = '0.00';
    if (purchasesTaxAmount) purchasesTaxAmount.textContent = '0.00';
    if (expensesAmount) expensesAmount.textContent = '0.00';
    if (expensesTaxAmount) expensesTaxAmount.textContent = '0.00';
    if (netTax) netTax.textContent = '0.00';
    if (taxStatus) taxStatus.textContent = '-';
    state.currentDeclaration = null;
}
// Load Declarations from Database
async function loadDeclarations() {
    try {
        const result = await window.api?.listTaxDeclarations?.();
        state.declarations = (result && result.success && Array.isArray(result.data)) ? result.data : [];
    } catch (error) {
        showNotification(state.translations.errorLoadingHistory || 'حدث خطأ أثناء تحميل السجل', 'error');
    }
}

async function refreshDeclarationsRealtime() {
    await loadDeclarations();

    const historyModal = document.getElementById('historyModal');
    if (historyModal && historyModal.classList.contains('active')) {
        await showHistory();
    }

    const currentNumber = state.currentDeclaration?.declarationNumber;
    if (!currentNumber) {
        return;
    }

    const currentBranchId = Number(state.currentDeclaration?.branchId || 0) || getCurrentBranchId();
    const refreshedDeclaration = findDeclarationByIdentity(currentNumber, currentBranchId);
    if (refreshedDeclaration && refreshedDeclaration.id) {
        await window.viewDeclaration(refreshedDeclaration.id);
        return;
    }

    state.currentDeclaration = null;
    const declarationCard = document.getElementById('declarationCard');
    if (declarationCard) {
        declarationCard.style.display = 'none';
    }
}

function setupCloudRealtimeListeners() {
    const handleCloudUpdate = async (payload) => {
        const tables = Array.isArray(payload?.tables) ? payload.tables : [];
        if (!tables.includes('tax_declarations')) {
            return;
        }
        try {
            await refreshDeclarationsRealtime();
        } catch (error) {
            console.error('Error refreshing tax declarations from cloud update:', error);
        }
    };

    if (window.api && typeof window.api.on === 'function') {
        window.api.on('cloud-data-updated', (payload) => {
            handleCloudUpdate(payload);
        });
    }

    window.addEventListener('message', (event) => {
        if (event?.data?.type !== 'cloud-data-updated') {
            return;
        }
        handleCloudUpdate(event.data.payload || {});
    });
}
window.refreshForBranchScopeChange = async function() {
    try {
        const historyModal = document.getElementById('historyModal');
        const analyticsModal = document.getElementById('analyticsModal');
        const historyWasOpen = Boolean(historyModal && historyModal.classList.contains('active'));
        const analyticsWasOpen = Boolean(analyticsModal && analyticsModal.style.display !== 'none' && analyticsModal.style.display !== '');
        await resetFilters();
        await loadDeclarations();
        if (historyWasOpen) {
            await showHistory();
        }
        if (analyticsWasOpen && window.taxAnalyticsModal && typeof window.taxAnalyticsModal.refreshAnalytics === 'function') {
            await window.taxAnalyticsModal.refreshAnalytics();
        }
        return true;
    } catch (error) {
        console.error('Error refreshing tax declaration for branch scope change:', error);
        return false;
    }
};
// Save Declaration
async function saveDeclaration(status) {
    // Check permissions based on status
    const permissions = window.userPermissions || [];
    if (status === 'draft') {
        const canSaveDraft = permissions.includes('tax_declaration_save_draft');
        if (!canSaveDraft) {
            showPermissionDeniedMessage('ليس لديك صلاحية حفظ الإقرار كمسودة');
            return;
        }
    } else if (status === 'submitted') {
        const canSubmit = permissions.includes('tax_declaration_submit');
        if (!canSubmit) {
            showPermissionDeniedMessage('ليس لديك صلاحية تقديم الإقرار الضريبي');
            return;
        }
    }
    if (!state.currentDeclaration) {
        showNotification(state.translations.noDeclarationError || 'الرجاء إنشاء الإقرار أولاً', 'warning');
        return;
    }
    const responsibleName = document.getElementById('responsibleName').value;
    const submissionDate = document.getElementById('submissionDate').value;
    if (status === 'submitted' && !responsibleName) {
        showNotification(state.translations.responsibleNameRequired || 'الرجاء إدخال اسم المسؤول', 'warning');
        return;
    }
    // Check if this is an update (declaration already exists)
    const declarationNumber = state.currentDeclaration.declarationNumber;
    const currentBranchId = Number(state.currentDeclaration?.branchId || 0) || getCurrentBranchId();
    const existingDeclaration = findDeclarationByIdentity(declarationNumber, currentBranchId);
    // If updating existing declaration, require password confirmation
    if (existingDeclaration) {
        try {
            const confirmed = await window.confirmEditWithPassword();
            if (!confirmed) {
                return;
            }
        } catch (error) {
            if (error.message !== 'cancelled') {
                // Silent error handling
            }
            return;
        }
    }
    try {
        const declaration = {
            ...state.currentDeclaration,
            status,
            responsibleName,
            submissionDate,
            createdAt: new Date().toISOString()
        };
        const result = await window.api?.saveTaxDeclaration?.(declaration);
        if (!result || !result.success) {
            throw new Error(result?.error || 'SAVE_FAILED');
        }
        const message = existingDeclaration
            ? (state.translations.updatedSuccessfully || 'تم تحديث الإقرار بنجاح')
            : status === 'draft' 
                ? (state.translations.savedAsDraft || 'تم حفظ الإقرار كمسودة')
                : (state.translations.declarationSubmitted || 'تم تقديم الإقرار بنجاح');
        showNotification(message, 'success');
        // Refresh the declarations list
        await loadDeclarations();
        if (status === 'submitted') {
            await resetFilters();
        }
    } catch (error) {
        showNotification(state.translations.errorSaving || 'حدث خطأ أثناء حفظ الإقرار: ' + error.message, 'error');
    }
}
// Show History
async function showHistory() {
    await loadDeclarations();
    const tbody = document.getElementById('historyTableBody');
    if (!state.declarations || state.declarations.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 40px;">
                    ${state.translations.noDeclarations || 'لا توجد إقرارات محفوظة'}
                </td>
            </tr>
        `;
    } else {
        tbody.innerHTML = state.declarations.map(dec => `
            <tr>
                <td>${dec.declaration_number}</td>
                <td>${formatDate(dec.period_from)} - ${formatDate(dec.period_to)}</td>
                <td class="tax-value">${formatCurrency(dec.net_tax)}</td>
                <td>${dec.responsible_name || '-'}</td>
                <td><span class="status-badge status-${dec.status}">${getStatusText(dec.status)}</span></td>
                <td>${formatDate(dec.created_at)}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn action-btn-view" onclick="viewDeclaration(${dec.id})">
                            ${state.translations.view || 'عرض'}
                        </button>
                        <button class="action-btn action-btn-print" onclick="printDeclarationById(${dec.id})">
                            ${state.translations.print || 'طباعة'}
                        </button>
                        <button class="action-btn action-btn-delete" onclick="deleteDeclaration(${dec.id})">
                            ${state.translations.delete || 'حذف'}
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }
    document.getElementById('historyModal').classList.add('active');
}
// Close History
function closeHistory() {
    document.getElementById('historyModal').classList.remove('active');
}
// Get Status Text
function getStatusText(status) {
    const statusMap = {
        draft: state.translations.statusDraft || 'مسودة',
        submitted: state.translations.statusSubmitted || 'مقدم',
        reviewed: state.translations.statusReviewed || 'مراجع'
    };
    return statusMap[status] || status;
}
// Format Date
function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    // Always use Gregorian calendar (en-GB format: DD/MM/YYYY)
    return date.toLocaleDateString('en-GB');
}
// View Declaration
window.viewDeclaration = async function(id) {
    const declaration = state.declarations.find(d => d.id === id);
    if (!declaration) return;
    await refreshActiveCompanyInfo();
    // Load declaration data
    document.getElementById('declarationNumber').value = declaration.declaration_number;
    document.getElementById('periodFrom').value = declaration.period_from;
    document.getElementById('periodTo').value = declaration.period_to;
    document.getElementById('statusFilter').value = declaration.status;
    document.getElementById('responsibleName').value = declaration.responsible_name || '';
    document.getElementById('submissionDate').value = declaration.submission_date || '';
    // Update display
    updateSummaryCards(
        declaration.sales_total,
        declaration.sales_tax,
        declaration.purchases_total,
        declaration.purchases_tax,
        declaration.expenses_total || 0,
        declaration.expenses_tax || 0,
        declaration.net_tax,
        declaration.sales_zero_amount || 0,
        declaration.purchases_zero_amount || 0
    );
    updateDetailsTable(
        declaration.sales_total,
        declaration.sales_tax,
        declaration.purchases_total,
        declaration.purchases_tax,
        declaration.expenses_total || 0,
        declaration.expenses_tax || 0,
        declaration.net_tax
    );
    document.getElementById('declarationCard').style.display = 'block';
    state.currentDeclaration = {
        declarationNumber: declaration.declaration_number,
        periodFrom: declaration.period_from,
        periodTo: declaration.period_to,
        branchId: declaration.branch_id || getCurrentBranchId(),
        salesTotal: declaration.sales_total,
        salesTax: declaration.sales_tax,
        salesZeroAmount: declaration.sales_zero_amount || 0,
        purchasesTotal: declaration.purchases_total,
        purchasesTax: declaration.purchases_tax,
        purchasesZeroAmount: declaration.purchases_zero_amount || 0,
        expensesTotal: declaration.expenses_total || 0,
        expensesTax: declaration.expenses_tax || 0,
        netTax: declaration.net_tax
    };
    closeHistory();
};
// Delete Declaration
window.deleteDeclaration = async function(id) {
    // Check delete permission first
    const permissions = window.userPermissions || [];
    const canDelete = permissions.includes('tax_declaration_delete');
    if (!canDelete) {
        showPermissionDeniedMessage('ليس لديك صلاحية حذف الإقرار الضريبي');
        return;
    }
    // Request password confirmation
    try {
        const confirmed = await window.confirmDeleteWithPassword();
        if (!confirmed) {
            return;
        }
    } catch (error) {
        if (error.message !== 'cancelled') {
            // Silent error handling
        }
        return;
    }
    try {
        const result = await window.api?.deleteTaxDeclaration?.(id);
        if (!result || !result.success) {
            throw new Error(result?.error || 'DELETE_FAILED');
        }
        showNotification(state.translations.deletedSuccessfully || 'تم حذف الإقرار بنجاح', 'success');
        // Reload and show updated history
        await showHistory();
    } catch (error) {
        showNotification(state.translations.errorDeleting || 'حدث خطأ أثناء حذف الإقرار', 'error');
    }
};
// Print Declaration
function printDeclaration() {
    // Check print permission
    const permissions = window.userPermissions || [];
    const canPrint = permissions.includes('tax_declaration_print');
    if (!canPrint) {
        showPermissionDeniedMessage('ليس لديك صلاحية طباعة الإقرار الضريبي');
        return;
    }
    if (!state.currentDeclaration) {
        showNotification(state.translations.noDeclarationError || 'الرجاء إنشاء الإقرار أولاً', 'warning');
        return;
    }
    refreshActiveCompanyInfo().then((companyInfo) => {
    // Prepare print data
        const printData = {
            declarationNumber: state.currentDeclaration.declarationNumber,
            periodFrom: state.currentDeclaration.periodFrom,
            periodTo: state.currentDeclaration.periodTo,
            salesTotal: state.currentDeclaration.salesTotal,
            salesTax: state.currentDeclaration.salesTax,
            salesZeroAmount: state.currentDeclaration.salesZeroAmount || 0,
            purchasesTotal: state.currentDeclaration.purchasesTotal,
            purchasesTax: state.currentDeclaration.purchasesTax,
            purchasesZeroAmount: state.currentDeclaration.purchasesZeroAmount || 0,
            expensesTotal: state.currentDeclaration.expensesTotal || 0,
            expensesTax: state.currentDeclaration.expensesTax || 0,
            netTax: state.currentDeclaration.netTax,
            responsibleName: document.getElementById('responsibleName')?.value || '-',
            submissionDate: document.getElementById('submissionDate')?.value || '',
            status: document.getElementById('statusFilter')?.value || 'draft',
            companyName: companyInfo.companyName,
            companyTax: companyInfo.companyTax
        };
        const printWindow = window.open('./print.html', '_blank', 'width=1200,height=800');
        if (printWindow) {
            printWindow.addEventListener('load', () => {
                printWindow.postMessage(printData, '*');
            });
        }
    });
}
// Print Declaration by ID
window.printDeclarationById = async function(id) {
    // Check print permission
    if (window.taxDeclarationPermissions && !window.taxDeclarationPermissions.canPrint) {
        showPermissionDeniedMessage('ليس لديك صلاحية طباعة الإقرار الضريبي');
        return;
    }
    const declaration = state.declarations.find(d => d.id === id);
    if (!declaration) return;
    const companyInfo = await refreshActiveCompanyInfo();
    // Prepare print data
    const printData = {
        declarationNumber: declaration.declaration_number,
        periodFrom: declaration.period_from,
        periodTo: declaration.period_to,
        salesTotal: declaration.sales_total,
        salesTax: declaration.sales_tax,
        salesZeroAmount: declaration.sales_zero_amount || 0,
        purchasesTotal: declaration.purchases_total,
        purchasesTax: declaration.purchases_tax,
        purchasesZeroAmount: declaration.purchases_zero_amount || 0,
        expensesTotal: declaration.expenses_total || 0,
        expensesTax: declaration.expenses_tax || 0,
        netTax: declaration.net_tax,
        responsibleName: declaration.responsible_name,
        submissionDate: declaration.submission_date,
        status: declaration.status,
        companyName: companyInfo.companyName,
        companyTax: companyInfo.companyTax
    };
    // Open print window
    const printWindow = window.open('./print.html', '_blank', 'width=1200,height=800');
    if (printWindow) {
        printWindow.addEventListener('load', () => {
            printWindow.postMessage(printData, '*');
        });
    }
};
// Export to Excel
async function exportToExcel() {
    // Check export permission
    const permissions = window.userPermissions || [];
    const canExport = permissions.includes('tax_declaration_export');
    if (!canExport) {
        showPermissionDeniedMessage('ليس لديك صلاحية تصدير الإقرار إلى Excel');
        return;
    }
    if (!state.currentDeclaration) {
        showNotification(state.translations.noDeclarationError || 'الرجاء إنشاء الإقرار أولاً', 'warning');
        return;
    }
    try {
        const data = {
            declaration: state.currentDeclaration,
            settings: state.settings,
            translations: state.translations
        };
        
        const result = await window.api.invoke('export-tax-declaration-excel', data);
        
        if (result.success) {
            showNotification(state.translations.exportedSuccessfully || 'تم التصدير بنجاح', 'success');
        } else {
            showNotification(result.error || 'حدث خطأ أثناء التصدير', 'error');
        }
    } catch (error) {
        showNotification(state.translations.errorExporting || 'حدث خطأ أثناء التصدير', 'error');
    }
}
// Loading Functions
function showLoading() {
    // Implement loading indicator
    document.body.style.cursor = 'wait';
}
function hideLoading() {
    document.body.style.cursor = 'default';
}
// Notification Functions
function showNotification(message, type = 'success', title = '') {
    const modal = document.getElementById('notificationModal');
    const icon = document.getElementById('notificationIcon');
    const titleEl = document.getElementById('notificationTitle');
    const messageEl = document.getElementById('notificationMessage');
    if (!modal || !icon || !titleEl || !messageEl) {
        console.error('Notification elements not found:', {
            modal: !!modal,
            icon: !!icon,
            titleEl: !!titleEl,
            messageEl: !!messageEl
        });
        return;
    }
    // Set icon class
    icon.className = 'notification-icon ' + type;
    // Set icon based on type
    const icons = {
        success: 'fa-circle-check',
        error: 'fa-circle-xmark',
        warning: 'fa-triangle-exclamation',
        info: 'fa-circle-info'
    };
    icon.innerHTML = `<i class="fa-solid ${icons[type] || icons.success}"></i>`;
    // Set title based on type if not provided
    if (!title) {
        const titles = {
            success: state.translations.success || 'نجح',
            error: state.translations.error || 'خطأ',
            warning: state.translations.warning || 'تحذير',
            info: state.translations.info || 'معلومة'
        };
        title = titles[type] || titles.success;
    }
    titleEl.textContent = title;
    messageEl.textContent = message;
    // Show modal
    modal.classList.add('active');
    // Auto close after 3 seconds
    setTimeout(() => {
        closeNotification();
    }, 3000);
}
function closeNotification() {
    const modal = document.getElementById('notificationModal');
    if (modal) {
        modal.classList.remove('active');
    } else {
        console.error('Notification modal not found');
    }
}
// ========== Tax Analytics Modal ==========
let netTaxChartInstance = null;
let salesPurchasesChartInstance = null;
let taxDistributionChartInstance = null;
window.taxAnalyticsModal = {
    open: async function() {
        const modal = document.getElementById('analyticsModal');
        if (!modal) {
            console.error('Analytics modal not found');
            return;
        }
        modal.style.display = 'flex';
        await this.loadAnalytics();
    },
    close: function() {
        const modal = document.getElementById('analyticsModal');
        if (modal) {
            modal.style.display = 'none';
        }
        // Destroy chart instances
        if (netTaxChartInstance) {
            netTaxChartInstance.destroy();
            netTaxChartInstance = null;
        }
        if (salesPurchasesChartInstance) {
            salesPurchasesChartInstance.destroy();
            salesPurchasesChartInstance = null;
        }
        if (taxDistributionChartInstance) {
            taxDistributionChartInstance.destroy();
            taxDistributionChartInstance = null;
        }
    },
    loadAnalytics: async function() {
        try {
            // Populate year selector
            const yearSelect = document.getElementById('analyticsYear');
            if (yearSelect) {
                const currentYear = new Date().getFullYear();
                yearSelect.innerHTML = '';
                for (let i = 0; i < 5; i++) {
                    const year = currentYear - i;
                    const option = document.createElement('option');
                    option.value = year;
                    option.textContent = year;
                    yearSelect.appendChild(option);
                }
            }
            await this.refreshAnalytics();
        } catch (error) {
            console.error('Error loading analytics:', error);
            showNotification('حدث خطأ أثناء تحميل التحليلات: ' + error.message, 'error');
        }
    },
    refreshAnalytics: async function() {
        try {
            const year = document.getElementById('analyticsYear')?.value || new Date().getFullYear();
            const compareWithPrevious = document.getElementById('compareWithPrevious')?.checked || false;
            const periodType = document.getElementById('analyticsPeriodType')?.value || 'monthly';
            // Fetch declarations for the selected year
            const declarationsResult = await window.api?.listTaxDeclarations?.({ year: year.toString() });
            const declarations = (declarationsResult && declarationsResult.success && Array.isArray(declarationsResult.data)) ? declarationsResult.data : [];
            // Fetch previous year data if comparison is enabled
            let previousYearDeclarations = [];
            if (compareWithPrevious) {
                const previousYear = parseInt(year) - 1;
                const previousResult = await window.api?.listTaxDeclarations?.({ year: previousYear.toString() });
                previousYearDeclarations = (previousResult && previousResult.success && Array.isArray(previousResult.data)) ? previousResult.data : [];
            }
            // Process data based on period type
            let periodData;
            if (periodType === 'quarterly') {
                periodData = this.processQuarterlyData(declarations, previousYearDeclarations);
            } else {
                periodData = this.processMonthlyData(declarations, previousYearDeclarations);
            }
            // Update charts and table
            this.updateNetTaxChart(periodData, compareWithPrevious, periodType);
            this.updateSalesPurchasesChart(periodData, compareWithPrevious, periodType);
            this.updateTaxDistributionChart(declarations);
            this.updateDataTable(periodData, compareWithPrevious, periodType);
        } catch (error) {
            console.error('Error refreshing analytics:', error);
            showNotification('حدث خطأ أثناء تحديث التحليلات: ' + error.message, 'error');
        }
    },
    processMonthlyData: function(declarations, previousYearDeclarations) {
        const monthlyData = {};
        const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 
                      'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
        // Initialize all months with zero
        for (let i = 0; i < 12; i++) {
            monthlyData[i] = {
                month: months[i],
                sales: 0,
                salesTax: 0,
                salesZero: 0,
                purchases: 0,
                purchasesTax: 0,
                purchasesZero: 0,
                expenses: 0,
                expensesTax: 0,
                netTax: 0,
                hasDeclaration: false,
                declarationStatus: null,
                previousYearSales: 0,
                previousYearPurchases: 0,
                previousYearNetTax: 0
            };
        }
        // Fill with actual data
        if (declarations && declarations.length > 0) {
            declarations.forEach(dec => {
                const date = new Date(dec.period_from);
                const monthIndex = date.getMonth();
                monthlyData[monthIndex].sales += dec.sales_total || 0;
                monthlyData[monthIndex].salesTax += dec.sales_tax || 0;
                monthlyData[monthIndex].salesZero += dec.sales_zero_amount || 0;
                monthlyData[monthIndex].purchases += dec.purchases_total || 0;
                monthlyData[monthIndex].purchasesTax += dec.purchases_tax || 0;
                monthlyData[monthIndex].purchasesZero += dec.purchases_zero_amount || 0;
                monthlyData[monthIndex].expenses += dec.expenses_total || 0;
                monthlyData[monthIndex].expensesTax += dec.expenses_tax || 0;
                monthlyData[monthIndex].netTax += dec.net_tax || 0;
                monthlyData[monthIndex].hasDeclaration = true;
                monthlyData[monthIndex].declarationStatus = dec.status || 'draft';
            });
        }
        // Fill previous year data
        if (previousYearDeclarations && previousYearDeclarations.length > 0) {
            previousYearDeclarations.forEach(dec => {
                const date = new Date(dec.period_from);
                const monthIndex = date.getMonth();
                monthlyData[monthIndex].previousYearSales += dec.sales_total || 0;
                monthlyData[monthIndex].previousYearPurchases += dec.purchases_total || 0;
                monthlyData[monthIndex].previousYearNetTax += dec.net_tax || 0;
            });
        }
        return monthlyData;
    },
    processQuarterlyData: function(declarations, previousYearDeclarations) {
        const quarterlyData = {};
        const quarters = ['الربع الأول', 'الربع الثاني', 'الربع الثالث', 'الربع الرابع'];
        // Initialize all quarters with zero
        for (let i = 0; i < 4; i++) {
            quarterlyData[i] = {
                month: quarters[i],
                sales: 0,
                salesTax: 0,
                salesZero: 0,
                purchases: 0,
                purchasesTax: 0,
                purchasesZero: 0,
                expenses: 0,
                expensesTax: 0,
                netTax: 0,
                hasDeclaration: false,
                declarationStatus: null,
                previousYearSales: 0,
                previousYearPurchases: 0,
                previousYearNetTax: 0
            };
        }
        // Fill with actual data
        if (declarations && declarations.length > 0) {
            declarations.forEach(dec => {
                const date = new Date(dec.period_from);
                const monthIndex = date.getMonth();
                const quarterIndex = Math.floor(monthIndex / 3); // 0-2 = Q1, 3-5 = Q2, 6-8 = Q3, 9-11 = Q4
                quarterlyData[quarterIndex].sales += dec.sales_total || 0;
                quarterlyData[quarterIndex].salesTax += dec.sales_tax || 0;
                quarterlyData[quarterIndex].salesZero += dec.sales_zero_amount || 0;
                quarterlyData[quarterIndex].purchases += dec.purchases_total || 0;
                quarterlyData[quarterIndex].purchasesTax += dec.purchases_tax || 0;
                quarterlyData[quarterIndex].purchasesZero += dec.purchases_zero_amount || 0;
                quarterlyData[quarterIndex].expenses += dec.expenses_total || 0;
                quarterlyData[quarterIndex].expensesTax += dec.expenses_tax || 0;
                quarterlyData[quarterIndex].netTax += dec.net_tax || 0;
                quarterlyData[quarterIndex].hasDeclaration = true;
                quarterlyData[quarterIndex].declarationStatus = dec.status || 'draft';
            });
        }
        // Fill previous year data
        if (previousYearDeclarations && previousYearDeclarations.length > 0) {
            previousYearDeclarations.forEach(dec => {
                const date = new Date(dec.period_from);
                const monthIndex = date.getMonth();
                const quarterIndex = Math.floor(monthIndex / 3);
                quarterlyData[quarterIndex].previousYearSales += dec.sales_total || 0;
                quarterlyData[quarterIndex].previousYearPurchases += dec.purchases_total || 0;
                quarterlyData[quarterIndex].previousYearNetTax += dec.net_tax || 0;
            });
        }
        return quarterlyData;
    },
    updateNetTaxChart: function(periodData, compareWithPrevious = false, periodType = 'monthly') {
        // IMPORTANT: Chart displays from bottom to top (reverse: false) - Updated 2026
        const canvas = document.getElementById('netTaxChart');
        if (!canvas) return;
        const months = Object.values(periodData).map(d => d.month);
        const netTaxData = Object.values(periodData).map(d => d.netTax);
        const previousYearData = Object.values(periodData).map(d => d.previousYearNetTax);
        // Destroy existing chart
        if (netTaxChartInstance) {
            netTaxChartInstance.destroy();
        }
        // Get dynamic colors
        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#00a99d';
        const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text').trim() || '#1a1a1a';
        const subtleColor = getComputedStyle(document.documentElement).getPropertyValue('--subtle').trim() || '#666666';
        const borderColor = getComputedStyle(document.documentElement).getPropertyValue('--border').trim() || '#e5e7eb';
        // Use textColor for better visibility in both light and dark modes
        const chartTextColor = textColor || '#1a1a1a';
        // Prepare datasets
        const datasets = [{
            label: 'صافي الضريبة',
            data: netTaxData,
            borderColor: primaryColor,
            backgroundColor: primaryColor + '33',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBackgroundColor: primaryColor,
            pointBorderColor: '#fff',
            pointBorderWidth: 2
        }];
        // Add previous year dataset if comparison is enabled
        if (compareWithPrevious) {
            datasets.push({
                label: 'السنة السابقة',
                data: previousYearData,
                borderColor: '#94a3b8',
                backgroundColor: 'rgba(148, 163, 184, 0.2)',
                borderWidth: 2,
                borderDash: [5, 5],
                fill: false,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: '#94a3b8',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            });
        }
        // Create Chart.js line chart
        netTaxChartInstance = new Chart(canvas, {
            type: 'line',
            data: {
                labels: months,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        align: 'end',
                        labels: {
                            font: { family: 'Cairo', size: 14, weight: '600' },
                            color: chartTextColor,
                            usePointStyle: true,
                            padding: 15
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        titleFont: { family: 'Cairo', size: 14 },
                        bodyFont: { family: 'Cairo', size: 13 },
                        padding: 12,
                        cornerRadius: 8,
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + formatCurrency(context.parsed.y);
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        reverse: true, // Keep reverse true so negative values go up
                        grid: {
                            color: borderColor + '33',
                            drawBorder: false
                        },
                        ticks: {
                            font: { family: 'Cairo', size: 12 },
                            color: chartTextColor,
                            callback: function(value) {
                                return formatCurrency(value);
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: { family: 'Cairo', size: 12 },
                            color: chartTextColor
                        }
                    }
                }
            }
        });
    },
    updateSalesPurchasesChart: function(periodData, compareWithPrevious = false, periodType = 'monthly') {
        const canvas = document.getElementById('salesPurchasesChart');
        if (!canvas) return;
        const months = Object.values(periodData).map(d => d.month);
        const salesData = Object.values(periodData).map(d => d.sales);
        const purchasesData = Object.values(periodData).map(d => d.purchases);
        const previousYearSales = Object.values(periodData).map(d => d.previousYearSales);
        const previousYearPurchases = Object.values(periodData).map(d => d.previousYearPurchases);
        // Destroy existing chart
        if (salesPurchasesChartInstance) {
            salesPurchasesChartInstance.destroy();
        }
        // Get dynamic colors
        const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text').trim() || '#1a1a1a';
        const subtleColor = getComputedStyle(document.documentElement).getPropertyValue('--subtle').trim() || '#666666';
        const borderColor = getComputedStyle(document.documentElement).getPropertyValue('--border').trim() || '#e5e7eb';
        // Use textColor for better visibility in both light and dark modes
        const chartTextColor = textColor || '#1a1a1a';
        // Prepare datasets
        const datasets = [
            {
                label: 'المبيعات',
                data: salesData,
                backgroundColor: 'rgba(16, 185, 129, 0.9)',
                borderColor: '#10b981',
                borderWidth: 0,
                borderRadius: 6
            },
            {
                label: 'المشتريات',
                data: purchasesData,
                backgroundColor: 'rgba(239, 68, 68, 0.9)',
                borderColor: '#ef4444',
                borderWidth: 0,
                borderRadius: 6
            }
        ];
        // Add previous year datasets if comparison is enabled
        if (compareWithPrevious) {
            datasets.push({
                label: 'المبيعات (السنة السابقة)',
                data: previousYearSales,
                backgroundColor: 'rgba(16, 185, 129, 0.4)',
                borderColor: '#10b981',
                borderWidth: 1,
                borderRadius: 6
            });
            datasets.push({
                label: 'المشتريات (السنة السابقة)',
                data: previousYearPurchases,
                backgroundColor: 'rgba(239, 68, 68, 0.4)',
                borderColor: '#ef4444',
                borderWidth: 1,
                borderRadius: 6
            });
        }
        // Create Chart.js bar chart
        salesPurchasesChartInstance = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: months,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        align: 'end',
                        labels: {
                            font: { family: 'Cairo', size: 14, weight: '600' },
                            color: chartTextColor,
                            usePointStyle: true,
                            padding: 15
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        titleFont: { family: 'Cairo', size: 14 },
                        bodyFont: { family: 'Cairo', size: 13 },
                        padding: 12,
                        cornerRadius: 8,
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + formatCurrency(context.parsed.y);
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: borderColor + '33',
                            drawBorder: false
                        },
                        ticks: {
                            font: { family: 'Cairo', size: 12 },
                            color: chartTextColor,
                            callback: function(value) {
                                return formatCurrency(value);
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: { family: 'Cairo', size: 12 },
                            color: chartTextColor
                        }
                    }
                }
            }
        });
    },
    updateTaxDistributionChart: function(declarations) {
        const canvas = document.getElementById('taxDistributionChart');
        if (!canvas) return;
        let totalSalesTax = 0;
        let totalPurchasesTax = 0;
        let totalExpensesTax = 0;
        if (declarations && declarations.length > 0) {
            declarations.forEach(dec => {
                totalSalesTax += dec.sales_tax || 0;
                totalPurchasesTax += dec.purchases_tax || 0;
                totalExpensesTax += dec.expenses_tax || 0;
            });
        }
        // Destroy existing chart
        if (taxDistributionChartInstance) {
            taxDistributionChartInstance.destroy();
        }
        // Get dynamic colors
        const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text').trim() || '#1a1a1a';
        // Use textColor for better visibility
        const chartTextColor = textColor || '#1a1a1a';
        // Create Chart.js pie chart
        taxDistributionChartInstance = new Chart(canvas, {
            type: 'doughnut',
            data: {
                labels: ['ضريبة المبيعات', 'ضريبة المشتريات', 'ضريبة المصاريف'],
                datasets: [{
                    data: [totalSalesTax, totalPurchasesTax, totalExpensesTax],
                    backgroundColor: [
                        'rgba(16, 185, 129, 0.9)',
                        'rgba(239, 68, 68, 0.9)',
                        'rgba(245, 158, 11, 0.9)'
                    ],
                    borderColor: [
                        '#10b981',
                        '#ef4444',
                        '#f59e0b'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '60%',
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            font: { family: 'Cairo', size: 14, weight: '600' },
                            color: chartTextColor,
                            usePointStyle: true,
                            padding: 20,
                            boxWidth: 12,
                            boxHeight: 12,
                            generateLabels: function(chart) {
                                const data = chart.data;
                                if (data.labels.length && data.datasets.length) {
                                    return data.labels.map((label, i) => {
                                        const value = data.datasets[0].data[i];
                                        return {
                                            text: label + ': ' + formatCurrency(value),
                                            fillStyle: data.datasets[0].backgroundColor[i],
                                            strokeStyle: data.datasets[0].borderColor[i],
                                            lineWidth: 2,
                                            hidden: false,
                                            index: i,
                                            fontColor: chartTextColor
                                        };
                                    });
                                }
                                return [];
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        titleFont: { family: 'Cairo', size: 14 },
                        bodyFont: { family: 'Cairo', size: 13 },
                        padding: 12,
                        cornerRadius: 8,
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                                return label + ': ' + formatCurrency(value) + ' (' + percentage + '%)';
                            }
                        }
                    }
                }
            }
        });
    },
    updateDataTable: function(periodData, compareWithPrevious = false, periodType = 'monthly') {
        const tbody = document.getElementById('analyticsTableBody');
        if (!tbody) return;
        // Update table headers based on period type
        const thead = document.querySelector('#analyticsTable thead tr');
        if (thead) {
            if (periodType === 'quarterly') {
                thead.innerHTML = `
                    <th>البيان</th>
                    <th>الربع الأول</th>
                    <th>الربع الثاني</th>
                    <th>الربع الثالث</th>
                    <th>الربع الرابع</th>
                    <th>الإجمالي</th>
                `;
            } else {
                thead.innerHTML = `
                    <th>البيان</th>
                    <th>يناير</th>
                    <th>فبراير</th>
                    <th>مارس</th>
                    <th>أبريل</th>
                    <th>مايو</th>
                    <th>يونيو</th>
                    <th>يوليو</th>
                    <th>أغسطس</th>
                    <th>سبتمبر</th>
                    <th>أكتوبر</th>
                    <th>نوفمبر</th>
                    <th>ديسمبر</th>
                    <th>الإجمالي</th>
                `;
            }
        }
        const months = Object.values(periodData);
        // Calculate totals for each row
        const rows = [
            { label: 'المبيعات الخاضعة %15', key: 'sales', isAmount: true },
            { label: 'ضريبة المبيعات %15', key: 'salesTax', isTax: true },
            { label: 'المبيعات بعد الضريبة', key: 'salesTotal', isAmount: true },
            { label: 'المبيعات صفرية (تسكير)', key: 'salesZero', isAmount: true },
            { label: 'المشتريات الخاضعة %15', key: 'purchases', isAmount: true },
            { label: 'ضريبة المشتريات %15', key: 'purchasesTax', isTax: true },
            { label: 'المشتريات بعد الضريبة', key: 'purchasesTotal', isAmount: true },
            { label: 'المشتريات صفرية', key: 'purchasesZero', isAmount: true },
            { label: 'المصاريف الخاضعة', key: 'expenses', isAmount: true },
            { label: 'ضريبة المصاريف', key: 'expensesTax', isTax: true },
            { label: 'صافي الضريبة المستحقة', key: 'netTax', isNet: true }
        ];
        // Calculate values for each month
        const monthlyValues = months.map(m => {
            const salesTax = m.salesTax || 0;
            const purchasesTax = m.purchasesTax || 0;
            const expensesTax = m.expensesTax || 0;
            return {
                sales: m.sales || 0,
                salesTax: salesTax,
                salesTotal: (m.sales || 0) + salesTax,
                salesZero: m.salesZero || 0,
                purchases: m.purchases || 0,
                purchasesTax: purchasesTax,
                purchasesTotal: (m.purchases || 0) + purchasesTax,
                purchasesZero: m.purchasesZero || 0,
                expenses: m.expenses || 0,
                expensesTax: expensesTax,
                netTax: m.netTax || 0
            };
        });
        // Build table rows
        const tableRows = rows.map(row => {
            let rowTotal = 0;
            const cells = monthlyValues.map(mv => {
                const value = mv[row.key] || 0;
                rowTotal += value;
                // صافي الضريبة: الموجب (مستحقة للدفع) = أحمر، السالب (مستردة) = أخضر
                return `<td style="text-align:center;font-family:monospace;${row.isTax ? 'color:var(--primary);font-weight:600;' : ''}${row.isNet ? 'color:' + (value >= 0 ? '#ef4444' : '#10b981') + ';font-weight:700;' : ''}">${formatCurrency(value)}</td>`;
            }).join('');
            const rowClass = row.isNet ? 'net-tax-row' : (row.isTax ? 'tax-row' : 'amount-row');
            const rowStyle = row.isNet ? 'background:color-mix(in oklab, var(--primary) 10%, var(--card));' : '';
            return `
                <tr class="${rowClass}" style="${rowStyle}">
                    <td style="font-weight:600;padding-right:16px;text-align:right;">${row.label}</td>
                    ${cells}
                    <td style="text-align:center;font-family:monospace;font-weight:700;${row.isTax ? 'color:var(--primary);' : ''}${row.isNet ? 'color:' + (rowTotal >= 0 ? '#ef4444' : '#10b981') + ';' : ''}">${formatCurrency(rowTotal)}</td>
                </tr>
            `;
        }).join('');
        // Add footer row with declaration status for each month
        const statusCells = monthlyValues.map((mv, index) => {
            const monthData = months[index];
            // Check if declaration exists for this month
            if (monthData.hasDeclaration) {
                const status = monthData.declarationStatus;
                let statusText = 'مقدم';
                let statusClass = 'submitted';
                if (status === 'draft') {
                    statusText = 'مسودة';
                    statusClass = 'draft';
                } else if (status === 'reviewed') {
                    statusText = 'مراجع';
                    statusClass = 'reviewed';
                }
                return `<td class="status-cell">
                    <span class="status-badge status-${statusClass}">${statusText}</span>
                </td>`;
            } else {
                // Check if there's data for this month
                const hasData = mv.sales > 0 || mv.purchases > 0 || mv.expenses > 0;
                if (hasData) {
                    return `<td class="status-cell">
                        <button class="btn-submit-declaration" data-month="${index}" onclick="window.taxAnalyticsModal.submitDeclaration(${index})">
                            <i class="fa-solid fa-paper-plane"></i>
                            <span>تقديم</span>
                        </button>
                    </td>`;
                } else {
                    return `<td style="text-align:center;color:var(--subtle);">-</td>`;
                }
            }
        }).join('');
        const footerRow = `
            <tr class="footer-row">
                <td style="font-weight:600;padding-right:16px;text-align:right;">حالة الإقرار</td>
                ${statusCells}
                <td style="text-align:center;">-</td>
            </tr>
        `;
        tbody.innerHTML = (tableRows + footerRow) || `<tr><td colspan="${periodType === 'quarterly' ? '6' : '14'}" style="padding:40px;text-align:center;color:var(--subtle)">لا توجد بيانات</td></tr>`;
        // Update comparison section if enabled
        const comparisonSection = document.getElementById('comparisonSection');
        if (comparisonSection) {
            if (compareWithPrevious) {
                // Calculate totals for current year
                let currentSalesTotal = 0;
                let currentPurchasesTotal = 0;
                let currentNetTaxTotal = 0;
                // Calculate totals for previous year
                let previousSalesTotal = 0;
                let previousPurchasesTotal = 0;
                let previousNetTaxTotal = 0;
                monthlyValues.forEach((mv, index) => {
                    const monthData = months[index];
                    // Current year totals
                    currentSalesTotal += mv.sales;
                    currentPurchasesTotal += mv.purchases;
                    currentNetTaxTotal += mv.netTax;
                    // Previous year totals
                    previousSalesTotal += monthData.previousYearSales || 0;
                    previousPurchasesTotal += monthData.previousYearPurchases || 0;
                    previousNetTaxTotal += monthData.previousYearNetTax || 0;
                });
                // Calculate differences
                const diffSales = currentSalesTotal - previousSalesTotal;
                const diffPurchases = currentPurchasesTotal - previousPurchasesTotal;
                const diffNetTax = currentNetTaxTotal - previousNetTaxTotal;
                // Get year labels
                const currentYear = document.getElementById('analyticsYear')?.value || new Date().getFullYear();
                const previousYear = parseInt(currentYear) - 1;
                // Update year labels
                document.getElementById('currentYearLabel').textContent = currentYear;
                document.getElementById('previousYearLabel').textContent = previousYear;
                // Update current year values
                document.getElementById('currentSales').textContent = formatCurrency(currentSalesTotal);
                document.getElementById('currentPurchases').textContent = formatCurrency(currentPurchasesTotal);
                document.getElementById('currentNetTax').textContent = formatCurrency(currentNetTaxTotal);
                // Update previous year values
                document.getElementById('previousSales').textContent = formatCurrency(previousSalesTotal);
                document.getElementById('previousPurchases').textContent = formatCurrency(previousPurchasesTotal);
                document.getElementById('previousNetTax').textContent = formatCurrency(previousNetTaxTotal);
                // Update difference values with colors
                const diffSalesEl = document.getElementById('diffSales');
                diffSalesEl.textContent = (diffSales >= 0 ? '+ ' : '- ') + formatCurrency(Math.abs(diffSales));
                diffSalesEl.className = 'item-value difference-value ' + (diffSales >= 0 ? 'positive' : 'negative');
                const diffPurchasesEl = document.getElementById('diffPurchases');
                diffPurchasesEl.textContent = (diffPurchases >= 0 ? '+ ' : '- ') + formatCurrency(Math.abs(diffPurchases));
                diffPurchasesEl.className = 'item-value difference-value ' + (diffPurchases >= 0 ? 'positive' : 'negative');
                const diffNetTaxEl = document.getElementById('diffNetTax');
                diffNetTaxEl.textContent = (diffNetTax >= 0 ? '+ ' : '- ') + formatCurrency(Math.abs(diffNetTax));
                diffNetTaxEl.className = 'item-value difference-value ' + (diffNetTax >= 0 ? 'positive' : 'negative');
                // Show comparison section
                comparisonSection.style.display = 'block';
            } else {
                // Hide comparison section
                comparisonSection.style.display = 'none';
            }
        }
    },
    submitDeclaration: function(monthIndex) {
        showNotification('ميزة تقديم الإقرار قيد التطوير', 'info');
    },
    printAnalytics: async function() {
        const companyInfo = await refreshActiveCompanyInfo();
        const year = document.getElementById('analyticsYear')?.value || new Date().getFullYear();
        const periodType = document.getElementById('analyticsPeriodType')?.value || 'monthly';
        const compareWithPrevious = document.getElementById('compareWithPrevious')?.checked || false;
        // Get table data
        const table = document.getElementById('analyticsTable');
        const tableHTML = table ? table.outerHTML : '';
        // Get comparison data if enabled
        let comparisonHTML = '';
        if (compareWithPrevious) {
            const comparisonSection = document.getElementById('comparisonSection');
            if (comparisonSection && comparisonSection.style.display !== 'none') {
                comparisonHTML = comparisonSection.innerHTML;
            }
        }
        // Temporarily update chart colors to black for printing
        const originalColors = {
            netTax: null,
            salesPurchases: null,
            taxDistribution: null
        };
        // Update net tax chart colors
        if (netTaxChartInstance) {
            originalColors.netTax = {
                legendColor: netTaxChartInstance.options.plugins.legend.labels.color,
                yTicksColor: netTaxChartInstance.options.scales.y.ticks.color,
                xTicksColor: netTaxChartInstance.options.scales.x.ticks.color
            };
            netTaxChartInstance.options.plugins.legend.labels.color = '#000000';
            netTaxChartInstance.options.scales.y.ticks.color = '#000000';
            netTaxChartInstance.options.scales.x.ticks.color = '#000000';
            netTaxChartInstance.update('none');
        }
        // Update sales/purchases chart colors
        if (salesPurchasesChartInstance) {
            originalColors.salesPurchases = {
                legendColor: salesPurchasesChartInstance.options.plugins.legend.labels.color,
                yTicksColor: salesPurchasesChartInstance.options.scales.y.ticks.color,
                xTicksColor: salesPurchasesChartInstance.options.scales.x.ticks.color
            };
            salesPurchasesChartInstance.options.plugins.legend.labels.color = '#000000';
            salesPurchasesChartInstance.options.scales.y.ticks.color = '#000000';
            salesPurchasesChartInstance.options.scales.x.ticks.color = '#000000';
            salesPurchasesChartInstance.update('none');
        }
        // Update tax distribution chart colors
        if (taxDistributionChartInstance) {
            originalColors.taxDistribution = {
                legendColor: taxDistributionChartInstance.options.plugins.legend.labels.color
            };
            taxDistributionChartInstance.options.plugins.legend.labels.color = '#000000';
            // Update fontColor in generateLabels
            const originalGenerateLabels = taxDistributionChartInstance.options.plugins.legend.labels.generateLabels;
            taxDistributionChartInstance.options.plugins.legend.labels.generateLabels = function(chart) {
                const labels = originalGenerateLabels(chart);
                return labels.map(label => ({...label, fontColor: '#000000'}));
            };
            taxDistributionChartInstance.update('none');
        }
        // Wait a bit for charts to update
        await new Promise(resolve => setTimeout(resolve, 100));
        // Get chart images with black text
        const netTaxChart = document.getElementById('netTaxChart');
        const salesPurchasesChart = document.getElementById('salesPurchasesChart');
        const taxDistributionChart = document.getElementById('taxDistributionChart');
        const chartImages = {
            netTax: netTaxChart ? netTaxChart.toDataURL('image/png') : null,
            salesPurchases: salesPurchasesChart ? salesPurchasesChart.toDataURL('image/png') : null,
            taxDistribution: taxDistributionChart ? taxDistributionChart.toDataURL('image/png') : null
        };
        // Restore original colors
        if (netTaxChartInstance && originalColors.netTax) {
            netTaxChartInstance.options.plugins.legend.labels.color = originalColors.netTax.legendColor;
            netTaxChartInstance.options.scales.y.ticks.color = originalColors.netTax.yTicksColor;
            netTaxChartInstance.options.scales.x.ticks.color = originalColors.netTax.xTicksColor;
            netTaxChartInstance.update('none');
        }
        if (salesPurchasesChartInstance && originalColors.salesPurchases) {
            salesPurchasesChartInstance.options.plugins.legend.labels.color = originalColors.salesPurchases.legendColor;
            salesPurchasesChartInstance.options.scales.y.ticks.color = originalColors.salesPurchases.yTicksColor;
            salesPurchasesChartInstance.options.scales.x.ticks.color = originalColors.salesPurchases.xTicksColor;
            salesPurchasesChartInstance.update('none');
        }
        if (taxDistributionChartInstance && originalColors.taxDistribution) {
            taxDistributionChartInstance.options.plugins.legend.labels.color = originalColors.taxDistribution.legendColor;
            taxDistributionChartInstance.update('none');
        }
        // Prepare print data
        const printData = {
            year,
            periodType: periodType === 'quarterly' ? 'ربعي' : 'شهري',
            compareWithPrevious,
            tableHTML,
            comparisonHTML,
            chartImages,
            companyName: companyInfo.companyName || 'اسم الشركة',
            companyTax: companyInfo.companyTax || '',
            printDate: new Date().toLocaleDateString('ar-SA')
        };
        // Open print window
        const printWindow = window.open('./analytics-print.html', '_blank', 'width=1200,height=800');
        if (printWindow) {
            printWindow.addEventListener('load', () => {
                printWindow.postMessage(printData, '*');
            });
        }
    },
};
})(); // End of IIFE

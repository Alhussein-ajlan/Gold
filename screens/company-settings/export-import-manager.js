// Export/Import Manager with table selection and progress tracking

class ExportImportManager {
  constructor() {
    this.modal = null;
    this.isExport = true;
    this.selectedTables = new Set();
    this.allTables = [];
    this.isOperationRunning = false;
    
    // Initialize after modal is loaded
    setTimeout(() => this.init(), 500);
  }
  
  init() {
    this.modal = document.getElementById('exportImportModal');
    if (!this.modal) {
      
      return;
    }
    
    // Get elements
    this.elements = {
      modal: this.modal,
      modalTitle: document.getElementById('modalTitle'),
      btnClose: document.getElementById('btnCloseModal'),
      btnCancel: document.getElementById('btnCancelOperation'),
      btnStart: document.getElementById('btnStartOperation'),
      btnOperationText: document.getElementById('btnOperationText'),
      selectAll: document.getElementById('selectAllTables'),
      tablesGrid: document.getElementById('tablesGrid'),
      progressSection: document.getElementById('progressSection'),
      progressStatus: document.getElementById('progressStatus'),
      progressPercentage: document.getElementById('progressPercentage'),
      progressBarFill: document.getElementById('progressBarFill'),
      currentTable: document.getElementById('currentTable'),
      currentItem: document.getElementById('currentItem'),
      progressSummary: document.getElementById('progressSummary')
    };
    
    // Bind events
    this.elements.btnClose?.addEventListener('click', () => this.closeModal());
    this.elements.btnCancel?.addEventListener('click', () => this.closeModal());
    this.elements.btnStart?.addEventListener('click', () => this.startOperation());
    this.elements.selectAll?.addEventListener('change', (e) => this.toggleSelectAll(e.target.checked));
    
    // Close on backdrop click
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.closeModal();
    });
    
    // Load tables list
    this.loadTables();
  }
  
  async loadTables() {
    try {
      // Get all tables from database
      if (window.sys && window.sys.getDbStats) {
        const res = await window.sys.getDbStats();
        if (res && res.success && Array.isArray(res.tables)) {
          // Translation helper
          const t = (key) => typeof tSettings === 'function' ? tSettings(key) : key;
          const depText = t('dependencies');
          
          // Group related tables (header + lines + dependencies)
          const tableGroups = {
            'vouchers': {
              label: t('tblPayments'),
              tables: ['customers', 'suppliers', 'accounts', 'vouchers', 'voucher_lines'],
              mainTable: 'vouchers',
              detailsTable: 'voucher_lines',
              dependencies: ['customers', 'suppliers', 'accounts']
            },
            'receipts': {
              label: t('tblReceipts'),
              tables: ['customers', 'suppliers', 'accounts', 'receipts', 'receipt_lines'],
              mainTable: 'receipts',
              detailsTable: 'receipt_lines',
              dependencies: ['customers', 'suppliers', 'accounts']
            },
            'journal_entries': {
              label: t('tblJournalEntries'),
              tables: ['customers', 'suppliers', 'accounts', 'journal_entries', 'journal_lines'],
              mainTable: 'journal_entries',
              detailsTable: 'journal_lines',
              dependencies: ['customers', 'suppliers', 'accounts']
            },
            'sales_invoices': {
              label: t('tblSalesInvoices'),
              tables: ['customers', 'suppliers', 'sales_invoices', 'sales_invoice_details'],
              mainTable: 'sales_invoices',
              detailsTable: 'sales_invoice_details',
              dependencies: ['customers', 'suppliers']
            },
            'purchase_invoices': {
              label: t('tblPurchaseInvoices'),
              tables: ['customers', 'suppliers', 'purchase_invoices', 'purchase_invoice_details'],
              mainTable: 'purchase_invoices',
              detailsTable: 'purchase_invoice_details',
              dependencies: ['customers', 'suppliers']
            },
            'openings': {
              label: t('tblOpeningBalances'),
              tables: ['customers', 'suppliers', 'accounts', 'openings', 'opening_lines'],
              mainTable: 'openings',
              detailsTable: 'opening_lines',
              dependencies: ['customers', 'suppliers', 'accounts']
            }
          };
          
          // Get tables that are not part of groups (lines/details tables to hide)
          const lineTables = new Set([
            'voucher_lines', 
            'receipt_lines', 
            'journal_lines',
            'sales_invoice_details',  // تفاصيل فواتير البيع
            'purchase_invoice_details', // تفاصيل فواتير الشراء
            'opening_lines'
          ]);
          
          // Build grouped tables list
          const groupedTables = [];
          const tableMap = new Map(res.tables.map(t => [t.name, t]));
          
          // Add grouped tables
          for (const [key, group] of Object.entries(tableGroups)) {
            const mainTable = tableMap.get(key);
            if (mainTable) {
              // Get main table count (headers)
              const mainCount = mainTable.count || 0;
              
              // Get details table count (lines)
              const detailsTable = tableMap.get(group.detailsTable);
              const detailsCount = detailsTable ? (detailsTable.count || 0) : 0;
              
              // Display format: "X headers + Y details"
              const displayCount = `${mainCount} + ${detailsCount}`;
              
              // Add info about dependencies
              const hasDependencies = group.dependencies && group.dependencies.length > 0;
              const dependencyInfo = hasDependencies ? ` + ${depText}` : '';
              
              groupedTables.push({
                name: key, // Use main table name as key
                label: group.label + dependencyInfo,
                count: mainCount, // Store main count for sorting
                displayCount: displayCount, // Display both counts
                tables: group.tables, // Include all related tables
                isGroup: true,
                mainCount: mainCount,
                detailsCount: detailsCount,
                hasDependencies: hasDependencies
              });
            }
          }
          
          // Standalone table name translations (all 28 tables)
          const standaloneLabels = {
            'company': t('tblCompanyInfo'),
            'currencies': t('tblCurrencies'),
            'account_types': t('tblAccountTypes'),
            'accounts': t('tblAccounts'),
            'customers': t('tblCustomers'),
            'suppliers': t('tblSuppliers'),
            'branches': t('tblBranches'),
            'user_branches': t('tblUserBranches'),
            'customer_branches': t('tblCustomerBranches'),
            'supplier_branches': t('tblSupplierBranches'),
            'categories': t('tblCategories'),
            'users': t('tblUsers'),
            'permissions': t('tblPermissions'),
            'user_permissions': t('tblUserPermissions'),
            'gold_items': t('tblGoldItems'),
            'gold_karats': t('tblGoldKarats'),
            'vouchers': t('tblPayments'),
            'voucher_lines': t('tblPaymentLines'),
            'receipts': t('tblReceipts'),
            'receipt_lines': t('tblReceiptLines'),
            'sales_invoices': t('tblSalesInvoices'),
            'sales_invoice_details': t('tblSalesInvoiceDetails'),
            'purchase_invoices': t('tblPurchaseInvoices'),
            'purchase_invoice_details': t('tblPurchaseInvoiceDetails'),
            'journal_entries': t('tblJournalEntries'),
            'journal_lines': t('tblJournalLines'),
            'openings': t('tblOpeningBalances'),
            'opening_lines': t('tblOpeningLines'),
            'orders': t('tblOrders'),
            'default_boxes': t('tblDefaultBoxes'),
            'tax_declarations': t('tblTaxDeclarations'),
            'invoice_settings': t('tblInvoiceSettings')
          };
          
          // Add standalone tables (not in groups, not line tables)
          res.tables.forEach(tbl => {
            if (!lineTables.has(tbl.name) && !tableGroups[tbl.name]) {
              groupedTables.push({
                name: tbl.name,
                label: standaloneLabels[tbl.name] || tbl.label || tbl.name,
                count: tbl.count || 0,
                tables: [tbl.name],
                isGroup: false
              });
            }
          });
          
          this.allTables = groupedTables;
          
          // Select all by default
          this.allTables.forEach(t => this.selectedTables.add(t.name));
          
          this.renderTables();
        }
      }
    } catch (error) {
      
    }
  }
  
  renderTables() {
    if (!this.elements.tablesGrid) return;
    
    this.elements.tablesGrid.innerHTML = '';
    
    this.allTables.forEach(table => {
      const item = document.createElement('div');
      item.className = 'table-checkbox-item';
      
      const label = document.createElement('label');
      label.className = 'checkbox-label';
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = table.name;
      checkbox.checked = this.selectedTables.has(table.name);
      checkbox.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.selectedTables.add(table.name);
        } else {
          this.selectedTables.delete(table.name);
        }
        this.updateSelectAllState();
      });
      
      const checkboxCustom = document.createElement('span');
      checkboxCustom.className = 'checkbox-custom';
      
      const labelText = document.createElement('span');
      labelText.className = 'label-text';
      
      // Use displayCount if available (for grouped tables), otherwise use count
      const countDisplay = table.displayCount || table.count;
      labelText.textContent = `${table.label} (${countDisplay})`;
      
      label.appendChild(checkbox);
      label.appendChild(checkboxCustom);
      label.appendChild(labelText);
      item.appendChild(label);
      
      this.elements.tablesGrid.appendChild(item);
    });
  }
  
  toggleSelectAll(checked) {
    this.selectedTables.clear();
    if (checked) {
      this.allTables.forEach(t => this.selectedTables.add(t.name));
    }
    this.renderTables();
  }
  
  updateSelectAllState() {
    if (this.elements.selectAll) {
      this.elements.selectAll.checked = this.selectedTables.size === this.allTables.length;
    }
  }
  
  openExportModal() {
    this.isExport = true;
    this.showModal();
    
    // Set title after showModal to prevent applySettingsTranslations from overriding it
    const t = (key) => typeof tSettings === 'function' ? tSettings(key) : key;
    if (this.elements.modalTitle) this.elements.modalTitle.textContent = t('exportDbTitle');
    if (this.elements.btnOperationText) this.elements.btnOperationText.textContent = t('startExport');
    if (this.elements.btnStart) {
      this.elements.btnStart.innerHTML = `<i class="fa-solid fa-file-export"></i><span>${t('startExport')}</span>`;
    }
  }
  
  openImportModal() {
    this.isExport = false;
    this.showModal();
    
    // Set title after showModal to prevent applySettingsTranslations from overriding it
    const t = (key) => typeof tSettings === 'function' ? tSettings(key) : key;
    if (this.elements.modalTitle) this.elements.modalTitle.textContent = t('importDbTitle');
    if (this.elements.btnOperationText) this.elements.btnOperationText.textContent = t('startImport');
    if (this.elements.btnStart) {
      this.elements.btnStart.innerHTML = `<i class="fa-solid fa-file-import"></i><span>${t('startImport')}</span>`;
    }
  }
  
  showModal() {
    if (this.modal) {
      this.modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      
      // Reset progress
      if (this.elements.progressSection) this.elements.progressSection.style.display = 'none';
      if (this.elements.tablesGrid) this.elements.tablesGrid.parentElement.parentElement.style.display = 'block';
      
      // Apply translations to modal
      if (typeof applySettingsTranslations === 'function') {
        applySettingsTranslations();
      }
      
      // Reload tables to get translated labels
      this.loadTables();
    }
  }
  
  async closeModal() {
    if (this.isOperationRunning) {
      this.isOperationRunning = false;
    }
    
    if (this.modal) {
      this.modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }
  
  async startOperation() {
    const t = (key) => typeof tSettings === 'function' ? tSettings(key) : key;
    if (this.selectedTables.size === 0) {
      await window.showAlert(t('selectTableAlert'), t('alertWarning'), 'warning');
      return;
    }
    
    // Hide table selection, show progress
    if (this.elements.tablesGrid) this.elements.tablesGrid.parentElement.parentElement.style.display = 'none';
    if (this.elements.progressSection) this.elements.progressSection.style.display = 'block';
    
    // Disable buttons
    if (this.elements.btnStart) this.elements.btnStart.disabled = true;
    
    this.isOperationRunning = true;
    
    try {
      if (this.isExport) {
        await this.performExport();
      } else {
        await this.performImport();
      }
    } catch (error) {
      
      await window.showAlert(t('errorOccurred') + ' ' + error.message, t('alertError'), 'error');
    } finally {
      this.isOperationRunning = false;
      if (this.elements.btnStart) this.elements.btnStart.disabled = false;
    }
  }
  
  async performFullDatabaseExport() {
    const t = (key) => typeof tSettings === 'function' ? tSettings(key) : key;
    try {
      this.updateProgress(10, t('exportingFullDb'), '', '');
      
      // Use the existing full database export API
      if (!window.api || !window.api.exportDb) {
        await window.showAlert(t('apiNotAvailable'), t('alertError'), 'error');
        this.closeModal();
        return;
      }
      
      this.updateProgress(30, t('selectingSavePath'), '', '');
      
      const result = await window.api.exportDb();
      
      if (result && result.success) {
        this.updateProgress(100, t('exportDbSuccess'), '', '', t('dbFileSaved'));
        
        await this.delay(2000);
        this.closeModal();
        
        await window.showAlert(
          t('exportDbSuccessMsg'),
          t('exportSuccess'),
          'success'
        );
      } else {
        this.updateProgress(0, t('exportFailedStatus'), '', '', result.error || t('unknownError'));
        await this.delay(2000);
        this.closeModal();
        
        await window.showAlert(
          t('exportDbFailedMsg') + (result.error || t('unknownError')),
          t('alertError'),
          'error'
        );
      }
    } catch (err) {
      this.updateProgress(0, t('errorOccurredStatus'), '', '', err.message);
      await this.delay(2000);
      this.closeModal();
      
      await window.showAlert(t('errorOccurred') + ' ' + err.message, t('alertError'), 'error');
    }
  }
  
  async performExport() {
    const t = (key) => typeof tSettings === 'function' ? tSettings(key) : key;
    const tables = Array.from(this.selectedTables);
    const totalTables = tables.length;
    let processedTables = 0;
    let totalRecords = 0;
    
    
    
    // Check if exporting all tables (full database)
    const isFullExport = totalTables === this.allTables.length;
    const prepMessage = isFullExport ? t('preparingFullExport') : t('preparing');
    
    this.updateProgress(0, prepMessage, '', '');
    
    // If full export, use database file export instead of JSON
    if (isFullExport) {
      return await this.performFullDatabaseExport();
    }
    
    // Ask for save location (JSON export)
    const saveResult = await window.api.selectExportPath();
    if (!saveResult || !saveResult.success || !saveResult.path) {
      
      this.closeModal();
      return;
    }
    
    const exportPath = saveResult.path;
    
    
    // Export each table (or table group)
    for (const tableName of tables) {
      const table = this.allTables.find(t => t.name === tableName);
      if (!table) {
        
        continue;
      }
      
      
      
      this.updateProgress(
        (processedTables / totalTables) * 100,
        `${t('exportingTable')} ${table.label}`,
        `${t('tableLabel')} ${table.label}`,
        ''
      );
      
      // Export table data (supports multiple tables if grouped)
      
      
      const exportResult = await window.api.exportTableData({
        tableName: table.name,
        tables: table.tables || [table.name], // Pass all related tables
        exportPath: exportPath
      });
      
      
      
      if (exportResult && exportResult.success) {
        totalRecords += exportResult.recordCount || 0;
        
        // Show exported records
        if (exportResult.records && exportResult.records.length > 0) {
          for (let i = 0; i < Math.min(3, exportResult.records.length); i++) {
            const record = exportResult.records[i];
            const recordName = this.getRecordDisplayName(tableName, record);
            this.updateProgress(
              ((processedTables + (i + 1) / exportResult.records.length) / totalTables) * 100,
              `${t('exportingTable')} ${table.label}`,
              `${t('tableLabel')} ${table.label} (${i + 1}/${exportResult.records.length})`,
              `${t('exportingTable')} ${recordName}`
            );
            await this.delay(50);
          }
        }
      }
      
      processedTables++;
    }
    
    // Complete
    const successMsg = isFullExport 
      ? t('exportDbSuccess') 
      : t('exportComplete');
    
    this.updateProgress(
      100,
      successMsg,
      '',
      '',
      t('exportCompleteMsg').replace('{count}', totalRecords)
    );
    
    await this.delay(2000);
    this.closeModal();
    
    // Refresh stats
    if (window.loadDbStats) window.loadDbStats();
  }
  
  async performFullDatabaseImport() {
    const t = (key) => typeof tSettings === 'function' ? tSettings(key) : key;
    try {
      this.updateProgress(10, t('importingFullDb'), '', '');
      
      // Use the existing full database import API
      if (!window.api || !window.api.importDb) {
        await window.showAlert(t('apiNotAvailable'), t('alertError'), 'error');
        this.closeModal();
        return;
      }
      
      this.updateProgress(30, t('selectingImportFile'), '', '');
      
      const result = await window.api.importDb();
      
      if (result && result.success) {
        this.updateProgress(100, t('importDbSuccess'), '', '', t('dbFileSaved'));
        
        await this.delay(1000);
        
        // Refresh stats and info IMMEDIATELY after import
        // Give a small delay to ensure DB connection is stable
        await this.delay(500);
        
        if (window.loadDbInfo) {
          await window.loadDbInfo();
        }
        
        if (window.loadDbStats) {
          await window.loadDbStats();
        }
        
        this.closeModal();
        
        await window.showAlert(
          t('importDbSuccessMsg'),
          t('importSuccess'),
          'success'
        );
      } else {
        this.updateProgress(0, t('importFailedStatus'), '', '', result.error || t('unknownError'));
        await this.delay(2000);
        this.closeModal();
        
        await window.showAlert(
          t('importDbFailedMsg') + (result.error || t('unknownError')),
          t('alertError'),
          'error'
        );
      }
    } catch (err) {
      this.updateProgress(0, t('errorOccurredStatus'), '', '', err.message);
      await this.delay(2000);
      this.closeModal();
      
      await window.showAlert(t('errorOccurred') + ' ' + err.message, t('alertError'), 'error');
    }
  }
  
  async performImport() {
    const t = (key) => typeof tSettings === 'function' ? tSettings(key) : key;
    const tables = Array.from(this.selectedTables);
    const totalTables = tables.length;
    
    // Check if importing all tables (full database)
    const isFullImport = totalTables === this.allTables.length;
    
    // If full import, use database file import instead of JSON
    if (isFullImport) {
      return await this.performFullDatabaseImport();
    }
    
    // Ask for file to import (JSON import)
    const fileResult = await window.api.selectImportFile();
    if (!fileResult || !fileResult.success || !fileResult.path) {
      this.closeModal();
      return;
    }
    
    const importPath = fileResult.path;
    let processedTables = 0;
    let totalRecords = 0;
    
    const prepMessage = t('preparing');
    
    this.updateProgress(0, prepMessage, '', '');
    
    // Import each table (or table group)
    for (const tableName of tables) {
      const tbl = this.allTables.find(tb => tb.name === tableName);
      if (!tbl) continue;
      
      this.updateProgress(
        (processedTables / totalTables) * 100,
        `${t('startImport').replace('ابدأ ', '')} ${tbl.label}`,
        `${t('tableLabel')} ${tbl.label}`,
        ''
      );
      
      // Import table data (supports multiple tables if grouped)
      const importResult = await window.api.importTableData({
        tableName: tbl.name,
        tables: tbl.tables || [tbl.name], // Pass all related tables
        importPath: importPath
      });
      
      if (importResult && importResult.success) {
        totalRecords += importResult.recordCount || 0;
        
        // Show imported records
        if (importResult.records && importResult.records.length > 0) {
          for (let i = 0; i < Math.min(3, importResult.records.length); i++) {
            const record = importResult.records[i];
            const recordName = this.getRecordDisplayName(tableName, record);
            this.updateProgress(
              ((processedTables + (i + 1) / importResult.records.length) / totalTables) * 100,
              `${t('importing')} ${tbl.label}`,
              `${t('tableLabel')} ${tbl.label} (${i + 1}/${importResult.records.length})`,
              `${t('importing')} ${recordName}`
            );
            await this.delay(50);
          }
        }
      }
      
      processedTables++;
    }
    
    // Complete
    const successMsg = isFullImport 
      ? t('importDbSuccess') 
      : t('importComplete');
    
    this.updateProgress(
      100,
      successMsg,
      '',
      '',
      t('importCompleteMsg').replace('{count}', totalRecords)
    );
    
    await this.delay(1000);
    
    // Refresh stats and info IMMEDIATELY after import
    // Give a small delay to ensure DB is ready
    await this.delay(500);
    
    if (window.loadDbInfo) {
      await window.loadDbInfo();
    }
    
    if (window.loadDbStats) {
      await window.loadDbStats();
    }
    
    this.closeModal();
    
    await window.showAlert(
      t('importCompleteMsg').replace('{count}', totalRecords),
      t('importSuccess'),
      'success'
    );
  }
  
  getRecordDisplayName(tableName, record) {
    if (!record) return '—';
    
    // Get display name based on table type
    switch (tableName) {
      case 'customers':
        return record.name || record.full_name || record.company || `عميل #${record.id}`;
      case 'suppliers':
        return record.name || record.full_name || record.company || `مورد #${record.id}`;
      case 'accounts':
        return record.name || `حساب #${record.id}`;
      case 'users':
        return record.full_name || record.username || `مستخدم #${record.id}`;
      case 'receipts':
        return `سند قبض #${record.id}`;
      case 'vouchers':
        return `سند صرف #${record.id}`;
      case 'journal_entries':
        return `قيد #${record.id}`;
      case 'sales_invoices':
        return `فاتورة بيع #${record.id}`;
      case 'purchase_invoices':
        return `فاتورة شراء #${record.id}`;
      case 'openings':
        return `رصيد افتتاحي #${record.id}`;
      default:
        return `سجل #${record.id || '—'}`;
    }
  }
  
  updateProgress(percentage, status, currentTable, currentItem, summary = '') {
    if (this.elements.progressPercentage) {
      this.elements.progressPercentage.textContent = Math.round(percentage) + '%';
    }
    
    if (this.elements.progressBarFill) {
      this.elements.progressBarFill.style.width = percentage + '%';
    }
    
    if (this.elements.progressStatus) {
      this.elements.progressStatus.textContent = status;
    }
    
    if (this.elements.currentTable) {
      this.elements.currentTable.textContent = currentTable;
    }
    
    if (this.elements.currentItem) {
      this.elements.currentItem.textContent = currentItem;
    }
    
    if (this.elements.progressSummary) {
      if (summary) {
        this.elements.progressSummary.textContent = summary;
        this.elements.progressSummary.classList.add('show');
      } else {
        this.elements.progressSummary.classList.remove('show');
      }
    }
  }
  
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Create global instance
window.exportImportManager = new ExportImportManager();

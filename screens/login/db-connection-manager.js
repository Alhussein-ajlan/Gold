/**
 * Database Connection Manager for Login Screen
 * Shows modal when database connection fails
 */

class DbConnectionManager {
  constructor() {
    this.modal = null;
    this.elements = {};
    this.init();
  }

  async init() {
    // Load modal HTML
    try {
      const response = await fetch('./db-connection-modal.html');
      const html = await response.text();
      const container = document.createElement('div');
      container.innerHTML = html;
      document.body.appendChild(container);
      
      // Get elements
      this.modal = document.getElementById('dbConnectionModal');
      this.elements = {
        pathInput: document.getElementById('dbConnectPathInput'),
        btnSelect: document.getElementById('btnSelectDbPathModal'),
        btnConnect: document.getElementById('btnConnectDbModal'),
        status: document.getElementById('dbConnectStatus'),
        message: document.getElementById('dbConnectMessage')
      };
      
      // Bind events
      this.bindEvents();
    } catch (err) {
      // Failed to load db connection modal
    }
  }

  bindEvents() {
    // Select path button
    if (this.elements.btnSelect) {
      this.elements.btnSelect.addEventListener('click', async () => {
        await this.selectPath();
      });
    }

    // Connect button
    if (this.elements.btnConnect) {
      this.elements.btnConnect.addEventListener('click', async () => {
        await this.connect();
      });
    }

    // Click on input to select
    if (this.elements.pathInput && this.elements.btnSelect) {
      this.elements.pathInput.addEventListener('click', () => {
        this.elements.btnSelect.click();
      });
    }
  }

  async selectPath() {
    try {
      if (!window.api || !window.api.selectDatabasePath) {
        this.showStatus('API غير متوفر', 'error');
        return;
      }

      const result = await window.api.selectDatabasePath();
      if (result && result.success && result.path) {
        this.elements.pathInput.value = result.path;
        this.showStatus('تم اختيار المسار، انقر على "اتصال" للمتابعة', 'info');
      }
    } catch (err) {
      this.showStatus('خطأ: ' + err.message, 'error');
    }
  }

  async connect() {
    try {
      const dbPath = this.elements.pathInput.value;
      if (!dbPath) {
        this.showStatus('يرجى اختيار مسار قاعدة البيانات', 'error');
        return;
      }

      if (!window.api || !window.api.connectToDatabase) {
        this.showStatus('API غير متوفر', 'error');
        return;
      }

      // Disable button and show loading
      this.elements.btnConnect.disabled = true;
      this.elements.btnConnect.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جار الاتصال...';

      const result = await window.api.connectToDatabase(dbPath);

      if (result && result.success) {
        this.showStatus('تم الاتصال بنجاح! جار تحميل البيانات...', 'success');
        
        // Wait a moment then reload the page
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        this.showStatus(result.error || 'فشل الاتصال', 'error');
        this.elements.btnConnect.disabled = false;
        this.elements.btnConnect.innerHTML = '<i class="fa-solid fa-plug"></i> اتصال والمتابعة';
      }
    } catch (err) {
      this.showStatus('خطأ: ' + err.message, 'error');
      this.elements.btnConnect.disabled = false;
      this.elements.btnConnect.innerHTML = '<i class="fa-solid fa-plug"></i> اتصال والمتابعة';
    }
  }

  showStatus(message, type = 'info') {
    if (!this.elements.status || !this.elements.message) return;
    
    this.elements.status.className = 'connection-status ' + type;
    this.elements.message.textContent = message;
    this.elements.status.style.display = 'flex';
  }

  open() {
    if (!this.modal) {
      return;
    }
    
    this.modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Load current path if available
    this.loadCurrentPath();
  }

  close() {
    if (!this.modal) return;
    
    this.modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  async loadCurrentPath() {
    try {
      if (!window.api || !window.api.getCurrentDbPath) return;
      const result = await window.api.getCurrentDbPath();
      if (result && result.success && this.elements.pathInput) {
        this.elements.pathInput.value = result.path || '';
      }
    } catch (err) {
      // Error loading current path
    }
  }
}

// Export singleton instance
window.dbConnectionManager = new DbConnectionManager();

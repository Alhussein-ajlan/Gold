/**
 * Auto-load Custom Modals System
 * Include this script in any HTML file to enable custom modals
 * Usage: <script src="../../shared-styles/load-modals.js"></script>
 */

(function() {
  // Check if already loaded
  if (window.modalsLoaded) return;
  window.modalsLoaded = true;
  
  // Load confirm-modal.js which will load the HTML
  const script = document.createElement('script');
  script.src = '/shared-styles/confirm-modal.js';
  script.async = false;
  document.head.appendChild(script);
  
  // Load company-header-builder.js for print templates
  const companyHeaderScript = document.createElement('script');
  companyHeaderScript.src = '/shared-styles/company-header-builder.js';
  companyHeaderScript.async = false;
  document.head.appendChild(companyHeaderScript);
})();

/* ===== Global Theme Loader ===== */
/* This script loads and applies theme settings across all screens */
/* IMPORTANT: This script must be in <head> to prevent flash of wrong theme */

(function() {
  'use strict';
  
  // Apply theme IMMEDIATELY before any rendering
  const root = document.documentElement;
  
  // Load theme from localStorage
  function loadTheme() {
    try {
      const saved = localStorage.getItem('appTheme');
      if (saved) {
        const theme = JSON.parse(saved);
        applyTheme(theme);
        return theme;
      }
    } catch (e) {
      // Error loading theme
    }
    // Apply default theme immediately
    const defaultTheme = { mode: 'dark', color: 'turquoise' };
    applyTheme(defaultTheme);
    return defaultTheme;
  }
  
  // Apply theme to document - SYNCHRONOUS for immediate effect
  function applyTheme(theme) {
    // Apply mode (dark/light/auto)
    let mode = theme.mode || 'dark';
    if (mode === 'auto') {
      mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    // Set attributes immediately
    root.setAttribute('data-theme', mode);
    root.setAttribute('data-color-theme', theme.color || 'turquoise');
    
    // Also set on body if it exists
    if (document.body) {
      document.body.setAttribute('data-theme', mode);
    }
  }
  
  // CRITICAL: Apply theme BEFORE anything else renders
  // This runs synchronously when the script is parsed
  (function applyImmediately() {
    try {
      const saved = localStorage.getItem('appTheme');
      if (saved) {
        const theme = JSON.parse(saved);
        let mode = theme.mode || 'dark';
        if (mode === 'auto') {
          mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        root.setAttribute('data-theme', mode);
        root.setAttribute('data-color-theme', theme.color || 'turquoise');
      } else {
        // Default to dark theme with turquoise color (matches CSS default)
        root.setAttribute('data-theme', 'dark');
        root.setAttribute('data-color-theme', 'turquoise');
      }
    } catch (e) {
      // Fallback to dark with turquoise (matches CSS default)
      root.setAttribute('data-theme', 'dark');
      root.setAttribute('data-color-theme', 'turquoise');
    }
    // Mark theme as loaded to show page
    root.classList.add('theme-loaded');
  })();
  
  // Listen for theme changes from other windows
  window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'themeChanged') {
      applyTheme(event.data.theme);
      localStorage.setItem('appTheme', JSON.stringify(event.data.theme));
    }
  });
  
  // Listen for custom theme change events
  window.addEventListener('themeChanged', function(event) {
    if (event.detail) {
      applyTheme(event.detail);
    }
  });
  
  // Listen for storage changes (for syncing across windows)
  window.addEventListener('storage', function(event) {
    if (event.key === 'appTheme' && event.newValue) {
      try {
        const theme = JSON.parse(event.newValue);
        applyTheme(theme);
      } catch (e) {}
    }
  });
  
  // Listen for system color scheme changes (for auto mode)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    const saved = localStorage.getItem('appTheme');
    if (saved) {
      const theme = JSON.parse(saved);
      if (theme.mode === 'auto') {
        applyTheme(theme);
      }
    }
  });
  
  // Re-apply when DOM is ready (ensures body also gets the attribute)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadTheme);
  } else {
    // DOM already ready, apply now
    loadTheme();
  }
  
  // Expose functions globally
  window.loadAppTheme = loadTheme;
  window.applyAppTheme = applyTheme;
})();

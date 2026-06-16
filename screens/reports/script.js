// Reports Screen
(async function() {
  'use strict';

  // ✅ Initialize screen permissions
  if (window.ScreenPermissions) {
    await window.ScreenPermissions.init();
  }
})();

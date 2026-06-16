// Modal Close Button Interactive Effects
(function() {
  'use strict';

  // Add ripple effect on click
  function addRippleEffect(button) {
    button.addEventListener('click', function(e) {
      // Add ripple class
      this.classList.add('ripple');
      
      // Remove ripple class after animation
      setTimeout(() => {
        this.classList.remove('ripple');
      }, 600);
    });
  }

  // Add sound effect (optional - can be enabled if needed)
  function playClickSound() {
    // Create a subtle click sound using Web Audio API
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
      // Silently fail if audio context is not supported
    }
  }

  // Add shake effect on hover (subtle)
  function addShakeEffect(button) {
    let shakeTimeout;
    
    button.addEventListener('mouseenter', function() {
      shakeTimeout = setTimeout(() => {
        this.style.animation = 'none';
        setTimeout(() => {
          this.style.animation = '';
        }, 10);
      }, 500);
    });
    
    button.addEventListener('mouseleave', function() {
      clearTimeout(shakeTimeout);
    });
  }

  // Add particle explosion effect on click
  function createParticleExplosion(button) {
    button.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Create 8 particles
      for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
          position: fixed;
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, #ff6666, #ff0000);
          border-radius: 50%;
          pointer-events: none;
          z-index: 10000;
          left: ${centerX}px;
          top: ${centerY}px;
        `;
        
        document.body.appendChild(particle);
        
        const angle = (i / 8) * Math.PI * 2;
        const distance = 40;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        // Animate particle
        particle.animate([
          { 
            transform: 'translate(-50%, -50%) scale(1)',
            opacity: 1,
            left: `${centerX}px`,
            top: `${centerY}px`
          },
          { 
            transform: 'translate(-50%, -50%) scale(0)',
            opacity: 0,
            left: `${endX}px`,
            top: `${endY}px`
          }
        ], {
          duration: 500,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        });
        
        // Remove particle after animation
        setTimeout(() => {
          particle.remove();
        }, 500);
      }
    });
  }

  // Initialize effects when DOM is loaded
  function initializeCloseButtons() {
    const selectors = [
      '#modalClose',
      '#confirmDelClose',
      '#permModalClose',
      '.modal-close-btn',
      '.modal .icon-btn[aria-label*="إغلاق"]',
      '.modal .icon-btn[aria-label*="اغلاق"]'
    ];
    
    selectors.forEach(selector => {
      const buttons = document.querySelectorAll(selector);
      buttons.forEach(button => {
        // Add ripple effect
        addRippleEffect(button);
        
        // Add particle explosion
        createParticleExplosion(button);
        
        // Add shake effect
        addShakeEffect(button);
        
        // Add click sound (optional - uncomment to enable)
        // button.addEventListener('click', playClickSound);
        
        // Add subtle rotation on hover
        button.addEventListener('mouseenter', function() {
          const icon = this.querySelector('i');
          if (icon) {
            icon.style.transform = 'rotate(90deg) scale(1.1)';
          }
        });
        
        button.addEventListener('mouseleave', function() {
          const icon = this.querySelector('i');
          if (icon) {
            icon.style.transform = '';
          }
        });
      });
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCloseButtons);
  } else {
    initializeCloseButtons();
  }

  // Re-initialize when new modals are added (for dynamic content)
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) { // Element node
          if (node.classList && node.classList.contains('modal')) {
            setTimeout(initializeCloseButtons, 100);
          }
        }
      });
    });
  });

  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Export for manual initialization if needed
  window.initModalCloseEffects = initializeCloseButtons;
})();

// ===== Global Keyboard Handler for Confirmation Modals =====
(function() {
  'use strict';
  
  document.addEventListener('keydown', function(e) {
    // Find any visible confirmation modal
    const visibleModal = document.querySelector('.modal[aria-hidden="false"], [class*="modal"][aria-hidden="false"]');
    if (!visibleModal) return;
    
    // Skip if focused on input/textarea (let the input handle Enter)
    const activeElement = document.activeElement;
    const isInputFocused = activeElement && (
      activeElement.tagName === 'INPUT' || 
      activeElement.tagName === 'TEXTAREA' ||
      activeElement.isContentEditable
    );
    
    // Find confirm/yes button and cancel/no button
    const confirmBtn = visibleModal.querySelector('[id*="Yes"], [id*="Ok"], [id*="Confirm"], .btn.primary, button.primary');
    const cancelBtn = visibleModal.querySelector('[id*="No"], [id*="Cancel"], [id*="Close"]:not(.modal-close):not(.icon-btn), .btn.secondary, button.secondary');
    
    if (e.key === 'Enter') {
      // Don't intercept Enter if focused on input (let input handle it)
      if (isInputFocused) return;
      e.preventDefault();
      e.stopPropagation();
      if (confirmBtn) {
        confirmBtn.click();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      // For cancel, prefer cancel button, otherwise close button
      const closeBtn = cancelBtn || visibleModal.querySelector('[id*="Close"], .icon-btn');
      if (closeBtn) {
        closeBtn.click();
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      // Toggle focus between buttons
      if (confirmBtn && cancelBtn) {
        e.preventDefault();
        if (document.activeElement === confirmBtn) {
          cancelBtn.focus();
        } else {
          confirmBtn.focus();
        }
      }
    }
  });
  
  // Auto-focus confirm button when modal opens
  const modalObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'aria-hidden') {
        const modal = mutation.target;
        if (modal.getAttribute('aria-hidden') === 'false') {
          // Focus the confirm button
          setTimeout(() => {
            const confirmBtn = modal.querySelector('[id*="Yes"], [id*="Ok"], [id*="Confirm"], .btn.primary, button.primary');
            if (confirmBtn) {
              confirmBtn.focus();
            }
          }, 100);
        }
      }
    });
  });
  
  // Observe all modals for aria-hidden changes
  function observeModals() {
    document.querySelectorAll('.modal, [class*="modal"]').forEach(modal => {
      modalObserver.observe(modal, { attributes: true, attributeFilter: ['aria-hidden'] });
    });
  }
  
  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeModals);
  } else {
    observeModals();
  }
  
  // Re-observe when new modals are added
  const bodyObserver = new MutationObserver(() => {
    observeModals();
  });
  
  bodyObserver.observe(document.body, { childList: true, subtree: true });
})();

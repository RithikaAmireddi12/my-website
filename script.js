// Initial state
let scanInitiated = false;

// Elements
const notifPreview = document.querySelector('.notification-preview');
const notifFull = document.querySelector('.notification-full');
const notifClose = document.querySelector('.notification-close');
const screenOverlay = document.querySelector('.screen-overlay');
const scanText = document.querySelector('.scan-text');
const floatingWidget = document.getElementById('floating-widget');
const panel = document.getElementById('expanded-panel');
const consentButton = document.getElementById('consent-button');
const consentModal = document.querySelector('.consent-modal');
const trustBtn = document.querySelector('.consent-option.trust');
const ignoreBtn = document.querySelector('.consent-option.ignore');
const flagBtn = document.querySelector('.consent-option.flag');
const docsButton = document.querySelector('#documentation-button');
const startupScreen = document.getElementById('startup-screen');

// Initialize
floatingWidget.style.display = 'none'; // Initially hidden
panel.style.display = 'none';
notifFull.style.display = 'none';
consentModal.style.display = 'none';

// Startup screen animation
let blinkInterval = setInterval(() => {
  startupScreen.style.backgroundColor = 'black';
  setTimeout(() => {
    startupScreen.style.backgroundColor = '#111'; // Slightly lighter black for a blink effect
  }, 100);
}, 2000); // Blink every 2 seconds

// Fade out startup screen after a delay
setTimeout(() => {
  clearInterval(blinkInterval); // Stop the blinking
  startupScreen.style.opacity = '0';
  setTimeout(() => {
    startupScreen.style.display = 'none';
    // Start the notification flow after the startup screen fades
    setTimeout(() => {
      notifPreview.style.opacity = '1';
      notifPreview.style.transform = 'translateY(0)';
    }, 500); // Small delay before notification
  }, 1000); // Duration of the fade-out
}, 3000); // Show startup screen for 3 seconds

// Notification flow
notifPreview.addEventListener('click', () => {
  notifPreview.style.opacity = '0';
  notifPreview.style.transform = 'translateY(-20px)';
  setTimeout(() => {
    notifFull.style.display = 'flex';
    setTimeout(() => {
      notifFull.style.opacity = '1';
    }, 10);
  }, 300);
});

notifFull.addEventListener('click', () => {
  notifFull.style.opacity = '0';
  setTimeout(() => {
    notifFull.style.display = 'none';
    // After notification closes, show the scan overlay
    screenOverlay.style.display = 'flex';
  }, 300);
});

// Click screen to start (after notification)
screenOverlay.addEventListener('click', () => {
  if (!scanInitiated) {
    // Show scan text
    scanText.style.opacity = '1';

    // After 1.5 seconds, hide overlay and show interface
    setTimeout(() => {
      screenOverlay.style.display = 'none';
      scanText.style.opacity = '0';
      floatingWidget.style.display = 'flex';
      scanInitiated = true;
    }, 1500);
  }
});

// Floating widget click
floatingWidget.addEventListener('click', (e) => {
  e.stopPropagation();
  panel.style.display = panel.style.display === 'flex' ? 'none' : 'flex';
});

// Close panel when clicking outside
document.addEventListener('click', (e) => {
  if (!panel.contains(e.target) && e.target !== floatingWidget) {
    panel.style.display = 'none';
  }
});

// Consent button click
consentButton.addEventListener('click', (e) => {
  e.stopPropagation();
  consentModal.style.display = 'flex';
  setTimeout(() => {
    consentModal.style.opacity = '1';
  }, 10);
});

// Consent modal options
trustBtn.addEventListener('click', () => {
  alert('Neural sharing enabled. Data streaming initiated.');
  closeConsentModal();
});

ignoreBtn.addEventListener('click', () => {
  alert('Consent deferred. Limited functionality available.');
  closeConsentModal();
});

flagBtn.addEventListener('click', () => {
  alert('Concerns noted. Privacy team notified for review.');
  closeConsentModal();
});

function closeConsentModal() {
  consentModal.style.opacity = '0';
  setTimeout(() => {
    consentModal.style.display = 'none';
  }, 300);
}

// Close modal when clicking outside
consentModal.addEventListener('click', (e) => {
  if (e.target === consentModal) {
    closeConsentModal();
  }
});

// Menu item interactions
document.querySelectorAll('.menu-item:not(#consent-button)').forEach(item => {
  item.addEventListener('click', (e) => {
    e.stopPropagation();
    alert(`${e.target.textContent} function activated`);
  });
});
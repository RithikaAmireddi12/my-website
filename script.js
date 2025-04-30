// Initial state
let scanInitiated = false;

// Elements
const screenOverlay = document.querySelector('.screen-overlay');
const scanText = document.querySelector('.scan-text');
const floatingWidget = document.getElementById('floating-widget');
const panel = document.getElementById('expanded-panel');
const detectButton = document.getElementById('detect-button');

// Click screen to start
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
floatingWidget.addEventListener('click', () => {
  panel.style.display = panel.style.display === 'flex' ? 'none' : 'flex';
});

// Close panel when clicking outside
document.addEventListener('click', (e) => {
  if (!panel.contains(e.target) && e.target !== floatingWidget) {
    panel.style.display = 'none';
  }
});
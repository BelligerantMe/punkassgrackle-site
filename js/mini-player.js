// Mini Player - Shows current track info and scroll-to-player functionality
// Note: SoundCloud/Mixcloud embeds handle their own playback controls

const miniPlayer = document.getElementById('mini-player');
const miniPlayBtn = document.getElementById('mini-play-btn');
const miniTitle = document.getElementById('mini-title');
const miniTime = document.getElementById('mini-time');
const miniProgressBar = document.getElementById('mini-progress-bar');

let currentMix = null;

// Listen for mix load events from player.js
window.addEventListener('mixLoaded', (e) => {
  currentMix = e.detail;
  showMiniPlayer(currentMix);
});

function showMiniPlayer(mix) {
  if (!mix) return;

  miniPlayer.classList.remove('hidden');
  miniTitle.textContent = mix.title;
  miniTime.textContent = mix.duration || '';

  // Update play button to scroll to main player
  miniPlayBtn.textContent = '▲';
  miniPlayBtn.title = 'Scroll to player';
}

// Scroll to main player when mini-player button is clicked
miniPlayBtn.addEventListener('click', () => {
  const playerSection = document.getElementById('hero-player');
  if (playerSection) {
    playerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

// Show mini-player when user scrolls past the main player
let observer = null;

function initScrollObserver() {
  const playerSection = document.getElementById('hero-player');
  if (!playerSection || !('IntersectionObserver' in window)) return;

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // When main player is not visible and we have a current mix
      if (!entry.isIntersecting && currentMix) {
        miniPlayer.classList.remove('hidden');
      } else if (entry.isIntersecting) {
        // Optional: hide mini-player when main player is visible
        // Uncomment if you prefer this behavior:
        // miniPlayer.classList.add('hidden');
      }
    });
  }, {
    threshold: 0.1
  });

  observer.observe(playerSection);
}

// Initialize observer after DOM is ready
document.addEventListener('DOMContentLoaded', initScrollObserver);

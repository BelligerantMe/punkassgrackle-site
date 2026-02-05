// Player State
const PlayerState = {
  mixes: [],
  collections: [],
  currentMix: null,
  isPlaying: false
};

// DOM Elements
const playerContainer = document.getElementById('player-container');
const mixList = document.getElementById('mix-list');

// Initialize player on load
document.addEventListener('DOMContentLoaded', initPlayer);

async function initPlayer() {
  try {
    const response = await fetch('data/mixes.json');
    const data = await response.json();
    PlayerState.mixes = data.mixes;
    PlayerState.collections = data.collections;
    renderMixList(PlayerState.mixes);
    renderPlayerUI();
  } catch (error) {
    console.error('Failed to load mixes:', error);
    playerContainer.innerHTML = '<div class="player-error">Failed to load mixes</div>';
  }
}

function renderPlayerUI() {
  playerContainer.innerHTML = `
    <div class="player-embed" id="player-embed">
      <div class="player-placeholder">Select a mix to play</div>
    </div>
    <div class="player-info">
      <div class="player-title" id="player-title">No mix selected</div>
      <div class="player-meta" id="player-meta"></div>
    </div>
  `;
}

function renderMixList(mixes) {
  if (!mixes || mixes.length === 0) {
    mixList.innerHTML = '<div class="mix-list-empty">No mixes found</div>';
    return;
  }

  mixList.innerHTML = mixes.map(mix => `
    <div class="mix-item" data-mix-id="${mix.id}">
      <div class="mix-info">
        <div class="mix-title">${mix.title}</div>
        <div class="mix-meta">
          <span class="mix-date">${formatDate(mix.date)}</span>
          ${mix.duration ? `<span class="mix-duration">${mix.duration}</span>` : ''}
          <span class="mix-platform ${mix.platform}">${mix.platform}</span>
        </div>
      </div>
      <div class="mix-actions">
        <button class="mix-play-btn" title="Play">
          <span class="play-icon">&#9658;</span>
        </button>
        <a href="${mix.externalUrl}" target="_blank" rel="noopener" class="mix-external-btn" title="Open on ${mix.platform}">
          <span class="external-icon">&#8599;</span>
        </a>
      </div>
    </div>
  `).join('');

  // Add click handlers
  mixList.querySelectorAll('.mix-item').forEach(item => {
    const playBtn = item.querySelector('.mix-play-btn');
    playBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const mixId = item.dataset.mixId;
      loadMix(mixId);
    });
  });
}

function loadMix(mixId) {
  const mix = PlayerState.mixes.find(m => m.id === mixId);
  if (!mix) return;

  PlayerState.currentMix = mix;

  // Update active state in list
  mixList.querySelectorAll('.mix-item').forEach(item => {
    item.classList.toggle('active', item.dataset.mixId === mixId);
  });

  // Load embed
  const embedContainer = document.getElementById('player-embed');
  const titleEl = document.getElementById('player-title');
  const metaEl = document.getElementById('player-meta');

  if (mix.platform === 'soundcloud') {
    embedContainer.innerHTML = `
      <iframe
        width="100%"
        height="166"
        scrolling="no"
        frameborder="no"
        allow="autoplay"
        src="${mix.embedUrl}&color=%23ff006e&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false">
      </iframe>
    `;
  } else if (mix.platform === 'mixcloud') {
    embedContainer.innerHTML = `
      <iframe
        width="100%"
        height="120"
        src="${mix.embedUrl}&hide_cover=1&autoplay=1"
        frameborder="0">
      </iframe>
    `;
  }

  titleEl.textContent = mix.fullTitle || mix.title;
  metaEl.innerHTML = `
    <span>${formatDate(mix.date)}</span>
    ${mix.duration ? `<span>${mix.duration}</span>` : ''}
    <a href="${mix.externalUrl}" target="_blank" rel="noopener">Open on ${mix.platform}</a>
  `;

  // Notify mini-player
  window.dispatchEvent(new CustomEvent('mixLoaded', { detail: mix }));
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const [year, month] = dateStr.split('-');
  if (!month) return year;
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[parseInt(month) - 1]} ${year}`;
}

// Export for filters.js
window.PlayerState = PlayerState;
window.renderMixList = renderMixList;

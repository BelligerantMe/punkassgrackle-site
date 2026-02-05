// Player State
const PlayerState = {
  mixes: [],
  collections: [],
  currentMix: null,
  isPlaying: false,
  bannerMode: true
};

// DOM Elements
const mixList = document.getElementById('mix-list');
const heroBanner = document.getElementById('hero-banner');
const activePlayer = document.getElementById('active-player');
const playerClose = document.getElementById('player-close');

// Initialize player on load
document.addEventListener('DOMContentLoaded', initPlayer);

async function initPlayer() {
  try {
    const response = await fetch('data/mixes.json');
    const data = await response.json();
    PlayerState.mixes = data.mixes;
    PlayerState.collections = data.collections;
    renderCollections();
    renderMixList(PlayerState.mixes);
    setupBannerEventListeners();
  } catch (error) {
    console.error('Failed to load mixes:', error);
    if (mixList) mixList.innerHTML = '<div class="player-error">Failed to load mixes</div>';
  }
}

function setupBannerEventListeners() {
  if (heroBanner) {
    heroBanner.addEventListener('click', playRandomMix);
    heroBanner.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        playRandomMix();
      }
    });
  }
  if (playerClose) {
    playerClose.addEventListener('click', showBanner);
  }
}

function playRandomMix() {
  if (!PlayerState.mixes || PlayerState.mixes.length === 0) return;
  let availableMixes = PlayerState.mixes;
  if (PlayerState.currentMix) {
    availableMixes = PlayerState.mixes.filter(m => m.id !== PlayerState.currentMix.id);
  }
  const randomIndex = Math.floor(Math.random() * availableMixes.length);
  loadMix(availableMixes[randomIndex].id);
  showActivePlayer();
}

function showActivePlayer() {
  if (heroBanner) heroBanner.classList.add('hidden');
  if (activePlayer) activePlayer.classList.remove('hidden');
  PlayerState.bannerMode = false;
}

function showBanner() {
  if (activePlayer) activePlayer.classList.add('hidden');
  if (heroBanner) heroBanner.classList.remove('hidden');
  PlayerState.bannerMode = true;
}

function renderCollections() {
  const mixListEl = document.getElementById('mix-list');
  if (!mixListEl) return;

  // Create collection layout container
  const layout = document.createElement('div');
  layout.className = 'collection-layout';

  // Define asymmetrical arrangement
  const arrangement = [
    { column: 'left', collections: ['bird-on-the-wire', 'weirdly-specific'], sizes: ['large', 'small'], rotations: ['neg', 'pos'] },
    { column: 'center', collections: ['the-guild'], sizes: ['medium'], rotations: ['featured'] },
    { column: 'right', collections: ['burning-man', 'productions'], sizes: ['medium', 'small'], rotations: ['pos', 'neg'] }
  ];

  arrangement.forEach(col => {
    const column = document.createElement('div');
    column.className = `collection-column ${col.column}`;

    col.collections.forEach((collId, idx) => {
      const coll = PlayerState.collections.find(c => c.id === collId);
      if (!coll) return;

      // Count mixes for this collection
      let mixCount;
      if (collId === 'productions') {
        mixCount = PlayerState.mixes.filter(m => !m.collections || m.collections.length === 0).length;
      } else {
        mixCount = PlayerState.mixes.filter(m => m.collections && m.collections.includes(collId)).length;
      }

      const card = document.createElement('div');
      const rotation = col.rotations[idx];
      const rotationClass = rotation === 'featured' ? 'featured' : `rotate-${rotation}`;
      card.className = `collection-card iridescent-border size-${col.sizes[idx]} ${rotationClass}`;
      card.dataset.collection = collId;
      card.style.setProperty('--card-accent', `var(${coll.accentColor})`);

      card.innerHTML = `
        <span class="collection-icon">${coll.icon}</span>
        <span class="collection-name">${coll.name}</span>
        <span class="collection-count">${mixCount} mix${mixCount !== 1 ? 'es' : ''}</span>
      `;

      card.addEventListener('click', () => filterByCollection(collId));
      column.appendChild(card);
    });

    layout.appendChild(column);
  });

  // Insert layout before mix-list
  mixListEl.parentNode.insertBefore(layout, mixListEl);
}

function filterByCollection(collectionId) {
  // Update filter state
  if (window.FilterState) {
    window.FilterState.collection = collectionId;
  }

  // Update active states on cards
  document.querySelectorAll('.collection-card').forEach(card => {
    card.classList.toggle('active', card.dataset.collection === collectionId);
  });

  // Apply filters if available
  if (window.applyFilters) {
    window.applyFilters();
  }

  // Scroll to mix list
  document.getElementById('mix-list').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Player UI is now defined in HTML (active-player element)

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

  // Show active player when a mix is loaded
  showActivePlayer();

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

// Export for filters.js and external use
window.PlayerState = PlayerState;
window.renderMixList = renderMixList;
window.playRandomMix = playRandomMix;
window.showActivePlayer = showActivePlayer;
window.showBanner = showBanner;

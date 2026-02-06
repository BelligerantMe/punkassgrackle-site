// Player State
const PlayerState = {
  mixes: [],
  collections: [],
  currentMix: null,
  bannerMode: true,
  expandedCollection: null
};

// HTML escape utility for XSS prevention
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// DOM Elements
const mixList = document.getElementById('mix-list');
const heroBanner = document.getElementById('hero-banner');
const activePlayer = document.getElementById('active-player');
const playerClose = document.getElementById('player-close');
const playerShuffle = document.getElementById('player-shuffle');

// Initialize player on load
document.addEventListener('DOMContentLoaded', initPlayer);

async function initPlayer() {
  try {
    const response = await fetch('data/mixes.json');
    const data = await response.json();
    PlayerState.mixes = data.mixes;
    PlayerState.collections = data.collections;
    renderCompactCollections();
    setupBannerEventListeners();
  } catch (error) {
    console.error('Failed to load mixes:', error);
    const collectionCards = document.getElementById('collection-cards');
    if (collectionCards) collectionCards.innerHTML = '<div class="player-error">Failed to load mixes</div>';
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
  if (playerShuffle) {
    playerShuffle.addEventListener('click', playRandomMix);
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
  // Stop playback by clearing the embed iframe
  const embedContainer = document.getElementById('player-embed');
  if (embedContainer) embedContainer.innerHTML = '';

  if (activePlayer) activePlayer.classList.add('hidden');
  if (heroBanner) heroBanner.classList.remove('hidden');
  PlayerState.bannerMode = true;
  PlayerState.currentMix = null;
}

function renderCompactCollections() {
  const container = document.getElementById('collection-cards');
  if (!container) return;

  container.innerHTML = PlayerState.collections.map(coll => {
    const mixCount = PlayerState.mixes.filter(m =>
      m.collections && m.collections.includes(coll.id)
    ).length;

    return `
      <div class="collection-card-mini iridescent-border"
           data-collection="${coll.id}"
           style="--card-accent: var(${coll.accentColor})"
           onclick="expandCategory('${coll.id}')">
        <span class="collection-icon">${coll.icon}</span>
        <span class="collection-name">${coll.name}</span>
        <span class="collection-count">${mixCount}</span>
      </div>
    `;
  }).join('');
}

function filterMixesByCollection(collectionId) {
  return PlayerState.mixes.filter(m =>
    m.collections && m.collections.includes(collectionId)
  );
}

function expandCategory(collectionId) {
  const expandedSection = document.getElementById('expanded-mixes');

  // If clicking same collection, collapse it
  if (PlayerState.expandedCollection === collectionId) {
    collapseCategory();
    return;
  }

  // Filter mixes for this collection
  const mixes = filterMixesByCollection(collectionId);

  // Update active state on cards
  document.querySelectorAll('.collection-card-mini').forEach(card => {
    card.classList.toggle('active', card.dataset.collection === collectionId);
  });

  // Store current collection for era filtering
  PlayerState.expandedCollection = collectionId;

  // Update filter state
  if (window.FilterState) {
    window.FilterState.collection = collectionId;
  }

  // Render mixes
  renderMixList(mixes);

  // Show expanded section
  if (expandedSection) {
    expandedSection.classList.remove('hidden');
  }

  // Scroll to expanded mixes
  if (expandedSection) {
    expandedSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function collapseCategory() {
  const expandedSection = document.getElementById('expanded-mixes');
  if (expandedSection) {
    expandedSection.classList.add('hidden');
  }
  document.querySelectorAll('.collection-card-mini').forEach(card => {
    card.classList.remove('active');
  });
  PlayerState.expandedCollection = null;
  if (window.FilterState) {
    window.FilterState.collection = 'all';
  }
}

// Player UI is now defined in HTML (active-player element)

function renderMixList(mixes) {
  if (!mixes || mixes.length === 0) {
    mixList.innerHTML = '<div class="mix-list-empty">No mixes found</div>';
    return;
  }

  mixList.innerHTML = mixes.map(mix => `
    <div class="mix-item" data-mix-id="${escapeHtml(mix.id)}">
      ${mix.letter ? `<div class="mix-letter-box">${escapeHtml(mix.letter)}</div>` : ''}
      <div class="mix-info">
        <div class="mix-title">${escapeHtml(mix.title)}</div>
        <div class="mix-meta">
          <span class="mix-date">${formatDate(mix.date)}</span>
          ${mix.duration ? `<span class="mix-duration">${escapeHtml(mix.duration)}</span>` : ''}
          <span class="mix-platform ${escapeHtml(mix.platform)}">${escapeHtml(mix.platform)}</span>
        </div>
      </div>
      <div class="mix-actions">
        <button class="mix-play-btn" title="Play">
          <span class="play-icon">&#9658;</span>
        </button>
        <a href="${escapeHtml(mix.externalUrl)}" target="_blank" rel="noopener" class="mix-external-btn" title="Open on ${escapeHtml(mix.platform)}">
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
    ${mix.duration ? `<span>${escapeHtml(mix.duration)}</span>` : ''}
    <a href="${escapeHtml(mix.externalUrl)}" target="_blank" rel="noopener">Open on ${escapeHtml(mix.platform)}</a>
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
window.expandCategory = expandCategory;
window.collapseCategory = collapseCategory;
window.filterMixesByCollection = filterMixesByCollection;

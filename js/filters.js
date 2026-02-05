// Filter State
const FilterState = {
  era: 'all',
  collection: 'all'
};

// Initialize filters on load
document.addEventListener('DOMContentLoaded', initFilters);

function initFilters() {
  // Add click handlers to all filter chips
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', handleFilterClick);
  });
}

function handleFilterClick(e) {
  const chip = e.currentTarget;
  const filterType = chip.dataset.filter;
  const filterValue = chip.dataset.value;

  // Update active state within the filter group
  const filterGroup = chip.closest('.filter-group');
  filterGroup.querySelectorAll('.filter-chip').forEach(c => {
    c.classList.remove('active');
  });
  chip.classList.add('active');

  // Update filter state
  FilterState[filterType] = filterValue;

  // Apply filters
  applyFilters();
}

function applyFilters() {
  // Wait for PlayerState to be available
  if (!window.PlayerState || !window.PlayerState.mixes) {
    console.warn('PlayerState not yet available');
    return;
  }

  // Only filter if a collection is expanded
  if (!window.PlayerState.expandedCollection) {
    return;
  }

  // Start with mixes from the expanded collection
  let filteredMixes = window.filterMixesByCollection(window.PlayerState.expandedCollection);

  // Apply era filter within the collection
  if (FilterState.era !== 'all') {
    filteredMixes = filteredMixes.filter(mix => mix.era === FilterState.era);
  }

  // Re-render the mix list
  if (window.renderMixList) {
    window.renderMixList(filteredMixes);
  }
}

// Export for other scripts
window.FilterState = FilterState;
window.applyFilters = applyFilters;

// Grackle Menu - Hidden admin tools revealed on grackle click
document.addEventListener('DOMContentLoaded', () => {
  const grackle = document.getElementById('grackle-trigger');
  const grackleMenu = document.getElementById('grackle-menu');

  if (!grackle || !grackleMenu) return;

  // Toggle menu on grackle click
  grackle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = !grackleMenu.classList.contains('hidden');

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Keyboard accessibility
  grackle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      grackle.click();
    }
    if (e.key === 'Escape') {
      closeMenu();
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!grackleMenu.contains(e.target) && !grackle.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on escape key anywhere
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });

  function openMenu() {
    grackleMenu.classList.remove('hidden');
    grackle.classList.add('menu-open');
    grackle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    grackleMenu.classList.add('hidden');
    grackle.classList.remove('menu-open');
    grackle.setAttribute('aria-expanded', 'false');
  }
});

(() => {
  const header = document.querySelector('.site-header');
  const menu = document.querySelector('.menu-button');
  const links = document.querySelector('.nav-links');
  const german = document.documentElement.lang === 'de';

  const setMenuOpen = (open) => {
    links?.classList.toggle('open', open);
    menu?.setAttribute('aria-expanded', String(open));
    menu?.setAttribute('aria-label', german
      ? (open ? 'Navigation schließen' : 'Navigation öffnen')
      : (open ? 'Close navigation' : 'Open navigation'));
  };

  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 8);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  menu?.addEventListener('click', () => {
    setMenuOpen(!(links?.classList.contains('open') ?? false));
  });

  links?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      setMenuOpen(false);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !links?.classList.contains('open')) return;
    setMenuOpen(false);
    menu?.focus();
  });

  document.querySelectorAll('[data-product-tour]').forEach((tour) => {
    const tabs = [...tour.querySelectorAll('[role="tab"]')];
    const panels = tabs.map((tab) => document.getElementById(tab.getAttribute('aria-controls'))).filter(Boolean);

    const activate = (tab, moveFocus = false) => {
      tabs.forEach((item) => {
        const selected = item === tab;
        item.setAttribute('aria-selected', String(selected));
        item.tabIndex = selected ? 0 : -1;
        const panel = document.getElementById(item.getAttribute('aria-controls'));
        if (panel) panel.hidden = !selected;
      });
      if (moveFocus) tab.focus();
    };

    tour.classList.add('is-enhanced');
    panels.forEach((panel, index) => { panel.hidden = index !== 0; });
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(tab));
      tab.addEventListener('keydown', (event) => {
        let target = null;
        if (event.key === 'ArrowRight') target = tabs[(index + 1) % tabs.length];
        if (event.key === 'ArrowLeft') target = tabs[(index - 1 + tabs.length) % tabs.length];
        if (event.key === 'Home') target = tabs[0];
        if (event.key === 'End') target = tabs[tabs.length - 1];
        if (!target) return;
        event.preventDefault();
        activate(target, true);
      });
    });
  });
})();

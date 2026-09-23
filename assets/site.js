(() => {
  const header = document.querySelector('.site-header');
  const menu = document.querySelector('.menu-button');
  const links = document.querySelector('.nav-links');

  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 8);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  menu?.addEventListener('click', () => {
    const open = links?.classList.toggle('open') ?? false;
    menu.setAttribute('aria-expanded', String(open));
  });

  links?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      menu?.setAttribute('aria-expanded', 'false');
    });
  });
})();

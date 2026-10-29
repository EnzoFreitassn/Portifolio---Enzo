/* ===== Reveal ao rolar ===== */
const sectionsToReveal = document.querySelectorAll('.hidden');
if (sectionsToReveal.length) {
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  sectionsToReveal.forEach(el => revealObs.observe(el));
}

/* ===== Navbar: sombra ao rolar ===== */
const navbar = document.querySelector('.navbar');
if (navbar) {
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 10);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ===== Menu mobile ===== */
const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');
if (menuToggle && menu) {
  const closeMenu = () => {
    menu.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  };
  menuToggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    menuToggle.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
}

/* ===== Link ativo conforme a seção visível ===== */
const navLinks = Array.from(document.querySelectorAll('.navbar .menu a'));
const sections = navLinks
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);
if (sections.length) {
  const spyObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sections.forEach(s => spyObs.observe(s));
}

/* ===== Contadores animados ===== */
const counters = document.querySelectorAll('[data-count]');
if (counters.length) {
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10) || 0;
      const suffix = el.dataset.suffix || '';
      const duration = 1100;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => countObs.observe(c));
}

/* ===== Ano no rodapé ===== */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ===== Luz global que segue o cursor pela página toda ===== */
const glow = document.querySelector('.cursor-glow');
if (glow && window.matchMedia('(hover: hover)').matches) {
  let mx = window.innerWidth / 2, my = window.innerHeight / 2, tx = mx, ty = my;
  const ease = 0.14;
  (function animate() {
    tx += (mx - tx) * ease;
    ty += (my - ty) * ease;
    glow.style.transform = `translate(${tx}px, ${ty}px)`;
    requestAnimationFrame(animate);
  })();
  window.addEventListener('pointermove', (e) => {
    mx = e.clientX; my = e.clientY;
    document.body.classList.add('cursor-on');
  });
  document.addEventListener('pointerleave', () => document.body.classList.remove('cursor-on'));
}

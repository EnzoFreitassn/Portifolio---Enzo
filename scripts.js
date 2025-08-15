/* ===== Reveal ===== */
const sectionsToReveal = document.querySelectorAll('.hidden');
if (sectionsToReveal.length) {
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.15 });

  sectionsToReveal.forEach(el => revealObs.observe(el));
}

/* ===== Luz que segue o mouse na HERO (sem clarão inicial) ===== */
const hero = document.querySelector('.hero');
if (hero) {
  let mx = -9999, my = -9999; // começa fora da tela
  let tx = mx, ty = my;
  const ease = 0.18;

  function animate() {
    tx += (mx - tx) * ease;
    ty += (my - ty) * ease;
    hero.style.setProperty('--mx', `${tx}px`);
    hero.style.setProperty('--my', `${ty}px`);
    requestAnimationFrame(animate);
  }
  animate();

  hero.addEventListener('pointerenter', (e) => {
    const r = hero.getBoundingClientRect();
    mx = e.clientX - r.left;
    my = e.clientY - r.top;
    hero.classList.add('hover'); // ativa luz
  });

  hero.addEventListener('pointerleave', () => {
    hero.classList.remove('hover'); // desativa luz
    mx = -9999; my = -9999;         // fora da tela
  });

  hero.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    mx = e.clientX - r.left;
    my = e.clientY - r.top;
  });

  window.addEventListener('resize', () => {
    if (!hero.classList.contains('hover')) {
      mx = -9999; my = -9999;
    }
  });
}

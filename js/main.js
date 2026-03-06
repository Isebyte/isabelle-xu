/* ================================
   Theme Toggle
   ================================ */

(function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  }

  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  });
})();


/* ================================
   Hero Slideshow
   ================================ */

(function initHero() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  if (!slides.length) return;

  let current = 0;
  let interval;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function startAuto() {
    interval = setInterval(() => goTo(current + 1), 8000);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      clearInterval(interval);
      goTo(parseInt(dot.dataset.slide));
      startAuto();
    });
  });

  startAuto();
})();


/* ================================
   Fade-in on scroll
   ================================ */

(function initFadeIn() {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  els.forEach(el => observer.observe(el));
})();


/* ================================
   Gallery Lightbox
   ================================ */

(function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const items = document.querySelectorAll('.gallery-item');
  if (!items.length) return;

  const img = lightbox.querySelector('.lightbox-img');
  const caption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  let current = 0;

  // Derive optimized WebP path from the original JPG src
  function optimizedPath(originalSrc) {
    const url = new URL(originalSrc, window.location.href);
    const parts = url.pathname.split('/');
    const filename = parts.pop();
    const name = filename.replace(/\.[^.]+$/, '');
    const dir = parts.join('/');
    return `${dir}/optimized/${name}.webp`;
  }

  function open(index) {
    current = index;
    updateImmediate();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function getItemSrc(item) {
    const origImg = item.querySelector('img');
    return origImg.src;
  }

  function loadBestImage(src, callback) {
    const webp = optimizedPath(src);
    const testImg = new Image();
    testImg.onload = () => callback(webp);
    testImg.onerror = () => callback(src);
    testImg.src = webp;
  }

  function updateImmediate() {
    const item = items[current];
    const alt = item.dataset.alt || '';
    const src = getItemSrc(item);

    loadBestImage(src, (resolved) => { img.src = resolved; });
    img.alt = alt;
    caption.textContent = alt;
  }

  function updateWithFade() {
    img.classList.add('switching');
    setTimeout(() => {
      const item = items[current];
      const alt = item.dataset.alt || '';
      const src = getItemSrc(item);

      loadBestImage(src, (resolved) => {
        img.src = resolved;
        img.classList.remove('switching');
      });
      img.alt = alt;
      caption.textContent = alt;
    }, 200);
  }

  function next() {
    current = (current + 1) % items.length;
    updateWithFade();
  }

  function prev() {
    current = (current - 1 + items.length) % items.length;
    updateWithFade();
  }

  items.forEach((item, i) => {
    item.addEventListener('click', () => open(i));
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });
})();

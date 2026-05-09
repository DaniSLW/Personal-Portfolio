// ===== CAROUSEL =====
(function () {
  const track   = document.querySelector('.carousel-track');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const carousel = document.querySelector('.carousel');

  if (!track || !nextBtn || !prevBtn) return;

  const SCROLL_AMOUNT = 1224; // card width (600) + gap (24)

  // ── Arrow buttons ──────────────────────────────────────────
  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
  });
  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
  });

  // ── Pagination dots ────────────────────────────────────────
  function buildDots() {
    const existing = carousel.querySelector('.carousel-pagination');
    if (existing) existing.remove();

    const cards = track.querySelectorAll('.card-project');
    if (cards.length <= 1) return;

    const pagination = document.createElement('div');
    pagination.classList.add('carousel-pagination');

    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.classList.add('carousel-dot');
      dot.setAttribute('aria-label', `Go to card ${i + 1}`);
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        track.scrollTo({ left: i * SCROLL_AMOUNT, behavior: 'smooth' });
      });
      pagination.appendChild(dot);
    });

    carousel.appendChild(pagination);
  }

  function updateDots() {
    const dots  = carousel.querySelectorAll('.carousel-dot');
    const index = Math.round(track.scrollLeft / SCROLL_AMOUNT);
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  // ── Update button visibility ───────────────────────────────
  function updateButtons() {
    prevBtn.style.opacity = track.scrollLeft <= 4 ? '0.3' : '1';
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    nextBtn.style.opacity = atEnd ? '0.3' : '1';
  }

  // ── Keyboard navigation ────────────────────────────────────
  document.addEventListener('keydown', e => {
    const projectSection = document.getElementById('projects');
    if (!projectSection) return;
    const rect = projectSection.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      track.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      track.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
    }
  });

  // ── Touch / swipe ──────────────────────────────────────────
  let touchStartX = 0;
  track.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  track.addEventListener('touchend', e => {
    const delta = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) {
      track.scrollBy({ left: delta > 0 ? SCROLL_AMOUNT : -SCROLL_AMOUNT, behavior: 'smooth' });
    }
  });

  // ── Scroll listener ────────────────────────────────────────
  track.addEventListener('scroll', () => {
    updateDots();
    updateButtons();
  }, { passive: true });

  // ── Wait for cards to be injected by script.js ─────────────
  const mutationObserver = new MutationObserver(() => {
    buildDots();
    updateButtons();
  });
  mutationObserver.observe(track, { childList: true });

  // Initial state
  updateButtons();
})();
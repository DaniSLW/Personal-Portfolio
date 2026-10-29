(function () {
  const track   = document.querySelector('.carousel-track');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const carousel = document.querySelector('.carousel');

  if (!track || !nextBtn || !prevBtn) return;

  function getScrollAmount() {
    const card = track.querySelector('.card-project');
    if (!card) return 1224;
    const gap = parseFloat(getComputedStyle(track).gap) || 24;
    return card.offsetWidth + gap;
  }

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
  });
  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
  });

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
        track.scrollTo({ left: i * getScrollAmount(), behavior: 'smooth' });
      });
      pagination.appendChild(dot);
    });

    carousel.appendChild(pagination);
  }

  function updateDots() {
    const dots = carousel.querySelectorAll('.carousel-dot');
    if (!dots.length) return;
    const scrollAmt = getScrollAmount();

    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    const index = atEnd
      ? dots.length - 1
      : scrollAmt > 0 ? Math.round(track.scrollLeft / scrollAmt) : 0;

    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  function updateButtons() {
    prevBtn.style.opacity = track.scrollLeft <= 3 ? '0.3' : '1';
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    nextBtn.style.opacity = atEnd ? '0.3' : '1';
  }

  document.addEventListener('keydown', e => {
    const projectSection = document.getElementById('projects');
    if (!projectSection) return;
    const rect = projectSection.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    }
  });

  let touchStartX = 0;
  track.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  track.addEventListener('touchend', e => {
    const delta = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      track.scrollBy({ left: delta > 0 ? getScrollAmount() : -getScrollAmount(), behavior: 'smooth' });
    }
  });

  track.addEventListener('scroll', () => {
    updateDots();
    updateButtons();
  }, { passive: true });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      buildDots();
      updateButtons();
    }, 200);
  }, { passive: true });

  const mutationObserver = new MutationObserver(() => {
    buildDots();
    updateButtons();
  });
  mutationObserver.observe(track, { childList: true });

  updateButtons();
})();
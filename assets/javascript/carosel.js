(function () {
  const track    = document.querySelector('.carousel-track');
  const nextBtn  = document.querySelector('.carousel-btn.next');
  const prevBtn  = document.querySelector('.carousel-btn.prev');
  const carousel = document.querySelector('.carousel');

  if (!track || !nextBtn || !prevBtn || !carousel) return;

  function getCards() {
    return track.querySelectorAll('.card-project');
  }

  function getScrollAmount() {
    const card = track.querySelector('.card-project');
    if (!card) return 300;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 8;
    return card.offsetWidth + gap;
  }

  function centerCard(card) {
    const left = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
    track.scrollTo({ left, behavior: 'smooth' });
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

    const cards = getCards();
    if (cards.length <= 1) return;

    const pagination = document.createElement('div');
    pagination.classList.add('carousel-pagination');
    pagination.setAttribute('role', 'tablist');

    cards.forEach((card, i) => {
      const dot = document.createElement('button');
      dot.classList.add('carousel-dot');
      dot.setAttribute('aria-label', `Navighează la proiectul ${i + 1}`);
      if (i === 0) {
        dot.classList.add('active');
        dot.setAttribute('aria-current', 'true');
      }
      dot.addEventListener('click', () => centerCard(card));
      pagination.appendChild(dot);
    });

    carousel.appendChild(pagination);
  }

  function updateButtons() {
    prevBtn.disabled = track.scrollLeft <= 5;
    nextBtn.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
  }

  /* ------------------------------------------------------------
     Efectul principal: pentru fiecare card calculăm distanța
     (în „carduri") față de centru și aplicăm scale, rotație 3D,
     opacitate și blur. Cardurile vecine rămân vizibile.
     ------------------------------------------------------------ */
  function updateCards() {
    const cards = getCards();
    if (!cards.length) return;

    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    const step = getScrollAmount();           // distanța între centrele a 2 carduri

    let closestIndex = 0;
    let minDist = Infinity;

    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const d   = (cardCenter - trackCenter) / step;  // semnat: <0 stânga, >0 dreapta
      const abs = Math.abs(d);
      const t   = Math.min(abs, 2);                   // limităm la 2 carduri distanță

      const scale   = 1 - t * 0.12;                   // 1 → 0.88 → 0.76
      const rotate  = Math.max(-1, Math.min(1, d)) * 24; // înclinare max 24°
      const opacity = 1 - t * 0.32;                   // 1 → 0.68 → 0.36
      const shift   = -Math.max(-1, Math.min(1, d)) * 24 * Math.min(abs, 1); // apropie vecinii de centru

      card.style.transform = `perspective(1100px) translateX(${shift.toFixed(1)}px) rotateY(${rotate.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
      card.style.opacity   = opacity.toFixed(2);
      card.style.zIndex    = String(100 - Math.round(abs * 10));

      if (abs < minDist) {
        minDist = abs;
        closestIndex = i;
      }
    });

    cards.forEach((card, i) => card.classList.toggle('is-active', i === closestIndex));

    carousel.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      const isActive = i === closestIndex;
      dot.classList.toggle('active', isActive);
      if (isActive) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  }

  function refresh() {
    updateButtons();
    updateCards();
  }

  let isTicking = false;
  track.addEventListener('scroll', () => {
    if (isTicking) return;
    isTicking = true;
    window.requestAnimationFrame(() => {
      refresh();
      isTicking = false;
    });
  }, { passive: true });

  // Click pe un card lateral → îl aducem în centru (nu urmăm linkurile din el)
  track.addEventListener('click', e => {
    const card = e.target.closest('.card-project');
    if (!card || card.classList.contains('is-active')) return;
    e.preventDefault();
    e.stopPropagation();
    centerCard(card);
  }, true);

  document.addEventListener('keydown', e => {
    const activeEl = document.activeElement;
    if (activeEl && ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeEl.tagName)) return;

    const projectSection = document.getElementById('projects');
    if (!projectSection) return;
    const rect = projectSection.getBoundingClientRect();
    if (!(rect.top < window.innerHeight && rect.bottom > 0)) return;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    }
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      buildDots();
      refresh();
    }, 150);
  }, { passive: true });

  // Cardurile sunt create din data.json după încărcare → reconstruim când apar
  new MutationObserver(() => {
    buildDots();
    refresh();
  }).observe(track, { childList: true });

  // Imaginile se încarcă târziu și pot schimba dimensiunile
  window.addEventListener('load', refresh);

  buildDots();
  refresh();
})();
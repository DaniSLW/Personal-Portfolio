(function () {
  const track    = document.querySelector('.carousel-track');
  const nextBtn  = document.querySelector('.carousel-btn.next');
  const prevBtn  = document.querySelector('.carousel-btn.prev');
  const carousel = document.querySelector('.carousel');

  if (!track || !nextBtn || !prevBtn || !carousel) return;

  /* ------------------------------------------------------------
     CAROUSEL INFINIT
     Structura: [K seturi de clone] [originale × N] [K seturi de clone]
     Când scroll-ul S-A OPRIT (scrollend) și nu ținem degetul / mouse-ul
     apăsat, facem un salt invizibil în setul din mijloc.
     ------------------------------------------------------------ */
  let N = 0;              // numărul de proiecte reale
  let K = 1;              // câte seturi de clone sunt pe fiecare parte
  let currentIndex = 0;   // indexul cardului din centru (în tot track-ul)
  let idleTimer;
  let pointerDown = false;   // utilizatorul ține apăsat / trage
  let userInteracted = false; // după prima interacțiune nu mai re-centrăm automat

  track.style.overflowAnchor = 'none';
  // Snap-ul CSS ia în calcul transformările 3D aplicate din JS și oprește cardul
  // decalat (~40px). Îl dezactivăm și centrăm noi, din JS, pe poziția reală.
  track.style.scrollSnapType = 'none';

  function getCards() {
    return Array.from(track.querySelectorAll('.card-project'));
  }

  function getScrollAmount() {
    const card = track.querySelector('.card-project');
    if (!card) return 300;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 8;
    return card.offsetWidth + gap;
  }

  function targetLeft(card) {
    return card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
  }

  // salt instant, fără animație și fără snap (ca să nu se vadă)
  function jumpTo(left) {
    track.style.scrollBehavior = 'auto';
    track.scrollLeft = left;
    void track.offsetWidth; // forțăm reflow
    track.style.scrollBehavior = '';
  }

  function centerCard(card) {
    track.scrollTo({ left: targetLeft(card), behavior: 'smooth' });
  }

  function markInteracted() { userInteracted = true; }

  // navigare card cu card (nu în pixeli) → mereu perfect centrat
  let targetIndex = null;
  function go(dir) {
    markInteracted();
    const cards = getCards();
    if (!cards.length) return;
    const base = targetIndex !== null ? targetIndex : currentIndex;
    targetIndex = Math.max(0, Math.min(cards.length - 1, base + dir));
    centerCard(cards[targetIndex]);
  }
  nextBtn.addEventListener('click', () => go(1));
  prevBtn.addEventListener('click', () => go(-1));

  /* ---------- Clone ---------- */
  function setupInfinite() {
    track.querySelectorAll('.card-project.is-clone').forEach(c => c.remove());

    const originals = getCards();
    N = originals.length;
    if (N <= 1) return;

    // minim ~6 carduri de buffer pe fiecare parte
    K = Math.max(1, Math.ceil(6 / N));

    const makeSet = () => originals.map(card => {
      const clone = card.cloneNode(true);
      clone.classList.add('is-clone');
      clone.classList.remove('is-active');
      clone.setAttribute('aria-hidden', 'true');
      return clone;
    });

    for (let k = 0; k < K; k++) {
      makeSet().forEach(c => track.insertBefore(c, originals[0]));
      makeSet().forEach(c => track.appendChild(c));
    }
  }

  /* ---------- Dots (doar pentru proiectele reale) ---------- */
  function buildDots() {
    const existing = carousel.querySelector('.carousel-pagination');
    if (existing) existing.remove();

    if (N <= 1) return;

    const pagination = document.createElement('div');
    pagination.classList.add('carousel-pagination');
    pagination.setAttribute('role', 'tablist');

    for (let i = 0; i < N; i++) {
      const dot = document.createElement('button');
      dot.classList.add('carousel-dot');
      dot.setAttribute('aria-label', `Navighează la proiectul ${i + 1}`);

      dot.addEventListener('click', () => {
        markInteracted();
        const cards = getCards();
        // copia cea mai apropiată de poziția curentă
        let best = K * N + i;
        for (let k = 0; k < 2 * K + 1; k++) {
          const cand = k * N + i;
          if (Math.abs(cand - currentIndex) < Math.abs(best - currentIndex)) best = cand;
        }
        if (cards[best]) centerCard(cards[best]);
      });
      pagination.appendChild(dot);
    }

    carousel.appendChild(pagination);
  }

  function updateButtons() {
    const disabled = N <= 1;
    prevBtn.disabled = disabled;
    nextBtn.disabled = disabled;
  }

  /* ------------------------------------------------------------
     Efectul principal (scale, rotație 3D, opacitate)
     ------------------------------------------------------------ */
  function updateCards() {
    const cards = getCards();
    if (!cards.length) return;

    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    const step = getScrollAmount();

    let closestIndex = 0;
    let minDist = Infinity;

    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const d   = (cardCenter - trackCenter) / step;
      const abs = Math.abs(d);
      const t   = Math.min(abs, 2);

      const scale   = 1 - t * 0.12;
      const rotate  = Math.max(-1, Math.min(1, d)) * 24;
      const opacity = 1 - t * 0.32;
      const shift   = -Math.max(-1, Math.min(1, d)) * 24 * Math.min(abs, 1);

      card.style.transform = `perspective(1100px) translateX(${shift.toFixed(1)}px) rotateY(${rotate.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
      card.style.opacity   = opacity.toFixed(2);
      card.style.zIndex    = String(Math.max(1, 10 - Math.round(abs * 3)));

      if (abs < minDist) {
        minDist = abs;
        closestIndex = i;
      }
    });

    currentIndex = closestIndex;
    cards.forEach((card, i) => card.classList.toggle('is-active', i === closestIndex));

    const logical = N > 0 ? closestIndex % N : closestIndex;
    carousel.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      const isActive = i === logical;
      dot.classList.toggle('active', isActive);
      if (isActive) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  }

  // Aduce cardul curent în setul din mijloc (invizibil)
  // Când scroll-ul s-a oprit: întâi centrăm cel mai apropiat card, apoi normalizăm
  function settle() {
    if (pointerDown) return;
    const cards = getCards();
    if (!cards.length) return;
    updateCards();
    const card = cards[currentIndex];
    if (Math.abs(track.scrollLeft - targetLeft(card)) > 1) {
      centerCard(card);       // la final se va declanșa din nou settle()
      return;
    }
    normalizePosition();
  }

  function normalizePosition() {
    targetIndex = null;
    if (N <= 1 || pointerDown) return;
    const cards = getCards();
    if (cards.length < N * (2 * K + 1)) return;

    updateCards(); // currentIndex exact, la poziția finală

    const lo = K * N, hi = (K + 1) * N;
    if (currentIndex >= lo && currentIndex < hi) return;

    const target = lo + (currentIndex % N);
    const delta = cards[target].offsetLeft - cards[currentIndex].offsetLeft;
    jumpTo(track.scrollLeft + delta);
    updateCards();
  }

  function scheduleNormalize() {
    clearTimeout(idleTimer);
    // dacă browserul are `scrollend`, îl folosim; altfel fallback pe timer
    idleTimer = setTimeout(settle, 'onscrollend' in window ? 400 : 200);
  }

  function refresh() {
    updateButtons();
    updateCards();
  }

  /* ---------- Evenimente ---------- */
  let isTicking = false;
  track.addEventListener('scroll', () => {
    scheduleNormalize();

    if (isTicking) return;
    isTicking = true;
    window.requestAnimationFrame(() => {
      refresh();
      isTicking = false;
    });
  }, { passive: true });

  if ('onscrollend' in window) {
    track.addEventListener('scrollend', () => {
      clearTimeout(idleTimer);
      settle();
    });
  }

  // nu facem salturi cât timp utilizatorul ține apăsat / trage
  track.addEventListener('pointerdown', () => { pointerDown = true; markInteracted(); });
  track.addEventListener('touchstart',  () => { pointerDown = true; markInteracted(); }, { passive: true });
  track.addEventListener('wheel', markInteracted, { passive: true });
  const releasePointer = () => {
    if (!pointerDown) return;
    pointerDown = false;
    scheduleNormalize();
  };
  window.addEventListener('pointerup', releasePointer);
  window.addEventListener('pointercancel', releasePointer);
  window.addEventListener('touchend', releasePointer, { passive: true });
  window.addEventListener('touchcancel', releasePointer, { passive: true });

  // Click pe un card lateral → îl aducem în centru (nu urmăm linkurile din el)
  track.addEventListener('click', e => {
    const card = e.target.closest('.card-project');
    if (!card || card.classList.contains('is-active')) return;
    e.preventDefault();
    e.stopPropagation();
    markInteracted();
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
      go(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(-1);
    }
  });

  /* ---------- Centrare inițială (robustă) ---------- */
  // Layout-ul se poate schimba după init (fonturi, imagini, secțiuni animate),
  // așa că re-centrăm pe primul proiect până când utilizatorul interacționează.
  function centerInitial() {
    if (userInteracted) return;
    const cards = getCards();
    if (!cards.length) return;
    const first = cards[N > 1 ? K * N : 0];
    jumpTo(targetLeft(first));
    refresh();
  }

  function init() {
    clearTimeout(idleTimer);
    userInteracted = false;
    setupInfinite();
    buildDots();
    centerInitial();
    observer.takeRecords(); // ignorăm propriile mutații (clonele)

    requestAnimationFrame(() => requestAnimationFrame(centerInitial));
    [150, 500, 1200].forEach(ms => setTimeout(centerInitial, ms));
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const cards = getCards();
      const keep = cards[currentIndex];
      if (keep) jumpTo(targetLeft(keep));
      refresh();
    }, 150);
  }, { passive: true });

  // Cardurile sunt create din data.json după încărcare → (re)construim când apar
  const observer = new MutationObserver(init);
  observer.observe(track, { childList: true });

  // Imaginile / fonturile se încarcă târziu și pot schimba dimensiunile
  window.addEventListener('load', centerInitial);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(centerInitial);
  track.addEventListener('load', centerInitial, true); // load de la <img> din carduri

  init();
})();
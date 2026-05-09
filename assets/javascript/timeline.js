// ===== TIMELINE ANIMATION =====
(function () {
  const timeline = document.querySelector('.timeline');
  if (!timeline) return;

  const items = timeline.querySelectorAll('.timeline-item');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      // Animăm linia
      timeline.classList.add('active');

      // Animăm fiecare item cu stagger
      items.forEach((item, i) => {
        setTimeout(() => {
          item.classList.add('active');
        }, i * 180);
      });

      // Oprim observarea după prima declanșare
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.25 });

  observer.observe(timeline);
})();
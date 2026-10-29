(function () {
  const timeline = document.querySelector('.timeline');
  if (!timeline) return;

  const items = timeline.querySelectorAll('.timeline-item');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      timeline.classList.add('active');

      items.forEach((item, i) => {
        setTimeout(() => {
          item.classList.add('active');
        }, i * 180);
      });

      observer.unobserve(entry.target);
    });
  }, { threshold: 0.25 });

  observer.observe(timeline);
})();
const track = document.querySelector('.carousel-track');
const nextBtn = document.querySelector('.carousel-btn.next');
const prevBtn = document.querySelector('.carousel-btn.prev');

const scrollAmount = 350; 

nextBtn.addEventListener('click', () => {
  track.scrollBy({
    left: scrollAmount,
    behavior: 'smooth'
  });
});

prevBtn.addEventListener('click', () => {
  track.scrollBy({
    left: -scrollAmount,
    behavior: 'smooth'
  });
});
const timeline = document.querySelector(".timeline");
const items = document.querySelectorAll(".timeline-item");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {

            // animăm linia
            timeline.classList.add("active");

            // animăm items stagger
            items.forEach((item, i) => {
                setTimeout(() => {
                    item.classList.add("active");
                }, i * 200);
            });

        }
    });
}, { threshold: 0.3 });

observer.observe(timeline);
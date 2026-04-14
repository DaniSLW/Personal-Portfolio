fetch('data.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('projects');

    Object.entries(data).forEach(([category, projects]) => {
      
      // Create category title
      const title = document.createElement('h2');
      title.textContent = category.replace('-', ' ');
      container.appendChild(title);

      // Create wrapper for projects
      const section = document.createElement('div');

      projects.forEach(project => {
        const card = document.createElement('div');

        const projectTitle = document.createElement('h3');
        projectTitle.textContent = project.title;

        const preview = document.createElement('p');
        preview.textContent = "Preview: " + project["preview-image"];

        const link = document.createElement('a');
        link.textContent = "GitHub";
        link.href = project["github-link"];
        link.target = "_blank";

        card.appendChild(projectTitle);
        card.appendChild(preview);
        card.appendChild(link);

        section.appendChild(card);
      });

      container.appendChild(section);
    });
  })
  .catch(err => console.error(err));

  //


  const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

// Particle class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // wrap around screen
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = "#38bdf8";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// init particles
function init() {
    particlesArray = [];
    for (let i = 0; i < 100; i++) {
        particlesArray.push(new Particle());
    }
}

// animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesArray.forEach(p => {
        p.update();
        p.draw();
    });

    connectParticles();
    requestAnimationFrame(animate);
}

// connect nearby particles
function connectParticles() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let dx = particlesArray[a].x - particlesArray[b].x;
            let dy = particlesArray[a].y - particlesArray[b].y;
            let distance = dx * dx + dy * dy;

            if (distance < 10000) {
                ctx.strokeStyle = "rgba(56, 189, 248, 0.1)";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// resize support
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

init();
animate();
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let W = canvas.width  = window.innerWidth;
let H = canvas.height = window.innerHeight;

const PARTICLE_COUNT = 110;
const MAX_DIST       = 120;
const MAX_DIST_SQ    = MAX_DIST * MAX_DIST;

let mouse = { x: W / 2, y: H / 2, active: false };
let particlesArray = [];
let animId;

class Particle {
  constructor() { this.reset(true); }

  reset(init = false) {
    this.x      = Math.random() * W;
    this.y      = Math.random() * H;
    this.size   = Math.random() * 1.8 + 0.4;
    this.baseSpeedX = (Math.random() - 0.5) * 0.4;
    this.baseSpeedY = (Math.random() - 0.5) * 0.4;
    this.speedX = this.baseSpeedX;
    this.speedY = this.baseSpeedY;
    this.opacity = Math.random() * 0.5 + 0.3;
    if (!init) { this.x = Math.random() < 0.5 ? -5 : W + 5; }
  }

  update() {
    if (mouse.active) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const distSq = dx * dx + dy * dy;
      const repelRadius = 12000;
      if (distSq < repelRadius && distSq > 0) {
        const force = (1 - distSq / repelRadius) * 0.6;
        this.speedX += (dx / Math.sqrt(distSq)) * force * 0.08;
        this.speedY += (dy / Math.sqrt(distSq)) * force * 0.08;
      }
    }

    this.speedX += (this.baseSpeedX - this.speedX) * 0.04;
    this.speedY += (this.baseSpeedY - this.speedY) * 0.04;

    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > W + 10) this.x = -10;
    if (this.x < -10)    this.x = W + 10;
    if (this.y > H + 10) this.y = -10;
    if (this.y < -10)    this.y = H + 10;
  }

  draw() {
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle   = "#38bdf8";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

function init() {
  particlesArray = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
}

function connectParticles() {
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a + 1; b < particlesArray.length; b++) {
      const dx = particlesArray[a].x - particlesArray[b].x;
      const dy = particlesArray[a].y - particlesArray[b].y;
      const dSq = dx * dx + dy * dy;

      if (dSq < MAX_DIST_SQ) {
        const alpha = (1 - dSq / MAX_DIST_SQ) * 0.15;
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth   = 0.8;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
  ctx.globalAlpha = 1;
}

function animate() {
  ctx.clearRect(0, 0, W, H);
  particlesArray.forEach(p => { p.update(); p.draw(); });
  connectParticles();
  animId = requestAnimationFrame(animate);
}

window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  mouse.active = true;
});
window.addEventListener("mouseleave", () => { mouse.active = false; });

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    cancelAnimationFrame(animId);
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    mouse.x = W / 2;
    mouse.y = H / 2;
    init();
    animate();
  }, 150);
});

init();
animate();
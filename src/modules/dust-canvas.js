/**
 * Desert Canyon Dust Particle Simulation
 * Authentic frontier wind & dust drift across the cinematic viewport.
 */

export class DustCanvas {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = window.innerWidth < 768 ? 45 : 90;
    this.animId = null;
    this.windSpeed = 1.2;
    this.targetWindSpeed = 1.2;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize(), { passive: true });

    if (this.reducedMotion) {
      this.drawStaticDust();
      return;
    }

    this.createParticles();
    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  createParticles() {
    this.particles = [];
    const colors = [
      'rgba(216, 195, 165, ', // warm desert sand
      'rgba(235, 218, 195, ', // light ivory dust
      'rgba(184, 93, 59, ',   // red clay grain
      'rgba(197, 160, 89, '   // brass speck
    ];

    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 2.2 + 0.6,
        colorPrefix: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.45 + 0.15,
        baseAlpha: Math.random() * 0.45 + 0.15,
        speedX: Math.random() * 1.5 + 0.8,
        speedY: Math.random() * 0.6 - 0.2,
        swaySpeed: Math.random() * 0.02 + 0.008,
        swayAmplitude: Math.random() * 1.8 + 0.5,
        angle: Math.random() * Math.PI * 2
      });
    }
  }

  setScrollTurbulence(velocity) {
    // Dynamically whip up dust when scrolling
    this.targetWindSpeed = 1.2 + Math.min(Math.abs(velocity) * 0.05, 5.0);
  }

  drawStaticDust() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * this.width;
      const y = Math.random() * this.height;
      const r = Math.random() * 2 + 1;
      this.ctx.beginPath();
      this.ctx.arc(x, y, r, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(216, 195, 165, 0.2)';
      this.ctx.fill();
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Smoothly interpolate wind speed
    this.windSpeed += (this.targetWindSpeed - this.windSpeed) * 0.08;
    this.targetWindSpeed += (1.2 - this.targetWindSpeed) * 0.04;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      p.angle += p.swaySpeed;
      p.x += (p.speedX * this.windSpeed);
      p.y += p.speedY + Math.sin(p.angle) * p.swayAmplitude * 0.4;

      // Wrap around edges
      if (p.x > this.width + 10) {
        p.x = -10;
        p.y = Math.random() * this.height;
      }
      if (p.y > this.height + 10) {
        p.y = -10;
      } else if (p.y < -10) {
        p.y = this.height + 10;
      }

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `${p.colorPrefix}${p.alpha})`;
      this.ctx.fill();
    }

    this.animId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animId) {
      cancelAnimationFrame(this.animId);
    }
  }
}

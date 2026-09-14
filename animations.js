/**
 * J.S Pharmacy - Visual Animation & Reveal Mechanics
 * Designed with performance and reduced-motion fallbacks.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Intersection Observer for scroll-triggered entrance animations
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Apply reveal styling and observer to cards and sections
    const elementsToAnimate = document.querySelectorAll('.card, .product-card, .service-detail-card, .trust-item');
    
    elementsToAnimate.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      revealObserver.observe(el);
    });
  }

  // Lightweight Canvas Visual Accent (Hero Section Fallback / Visual)
  const container = document.getElementById('webgl-canvas-container');
  if (container && !prefersReducedMotion) {
    createLightweightCanvas(container);
  }
});

/**
 * Creates a lightweight canvas particle effect to enhance hero aesthetics
 * without heavy WebGL library dependencies.
 */
function createLightweightCanvas(container) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  container.appendChild(canvas);

  let width = (canvas.width = container.offsetWidth);
  let height = (canvas.height = container.offsetHeight);

  const particles = [];
  const particleCount = 20;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      alpha: Math.random() * 0.3 + 0.1
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#0b3c2d';

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.globalAlpha = p.alpha;
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  window.addEventListener('resize', () => {
    width = canvas.width = container.offsetWidth;
    height = canvas.height = container.offsetHeight;
  }, { passive: true });

  render();
}

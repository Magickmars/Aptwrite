// script.js — AptWrite (updated)

// =========================
// Theme Toggle (with guards)
// =========================
const themeToggle = document.getElementById('themeToggle');

(function initTheme() {
  // Respect saved preference, else system preference, else default 'light'
  const saved = localStorage.getItem('aptwrite-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved || (prefersDark ? 'dark' : (document.body.dataset.theme || 'light'));
  document.body.dataset.theme = initial;
  updateThemeIcon(initial);
})();

function updateThemeIcon(mode) {
  if (!themeToggle) return;
  const icon = themeToggle.querySelector('i');
  if (!icon) return;
  icon.classList.toggle('fa-moon', mode === 'light');
  icon.classList.toggle('fa-sun', mode === 'dark');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const next = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    document.body.dataset.theme = next;
    localStorage.setItem('aptwrite-theme', next);
    updateThemeIcon(next);
  });
}

// =========================
// Smooth Scroll (in-page)
// =========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href');
    // Ignore just '#' and empty
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Move focus for accessibility when skipping content
      if (target.tabIndex === -1) {
        target.focus({ preventScroll: true });
      } else {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
      }
    }
  });
});

// =========================
// Contact Form (native submit)
// =========================
const form = document.querySelector('.contact-form');
if (form) {
  // Let the browser submit to formsubmit.co; add a simple UX nicety
  form.addEventListener('submit', () => {
    // You could add a lightweight "Submitting..." state
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.dataset.originalText = btn.textContent;
      btn.textContent = 'Submitting…';
    }
  });

  // Basic front-end validation hints (optional, enhances native)
  ['input', 'textarea'].forEach(sel => {
    form.querySelectorAll(sel).forEach(el => {
      el.addEventListener('invalid', () => {
        el.classList.add('field-invalid');
      });
      el.addEventListener('input', () => {
        el.classList.remove('field-invalid');
      });
    });
  });
}

// =========================
// Generate Noise Texture
// =========================
const noise = document.querySelector('.noise');
if (noise) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 100;
  canvas.height = 100;

  const imageData = ctx.createImageData(canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const v = Math.random() * 255 | 0;
    data[i] = v;     // R
    data[i + 1] = v; // G
    data[i + 2] = v; // B
    data[i + 3] = 255; // A
  }
  ctx.putImageData(imageData, 0, 0);
  noise.style.backgroundImage = `url(${canvas.toDataURL()})`;
}

// =========================
// Typed Text (no external lib)
// =========================
class TypedText {
  constructor(element, strings, typeSpeed = 50, backSpeed = 30, loop = true) {
    this.el = element;
    this.strings = strings;
    this.typeSpeed = typeSpeed;
    this.backSpeed = backSpeed;
    this.loop = loop;

    this.i = 0; // string index
    this.j = 0; // char index
    this.deleting = false;

    if (this.el && Array.isArray(strings) && strings.length) {
      this.tick();
    }
  }

  tick() {
    const s = this.strings[this.i] || '';
    const text = this.deleting ? s.slice(0, this.j - 1) : s.slice(0, this.j + 1);
    this.el.textContent = text;

    let delay = this.deleting ? this.backSpeed : this.typeSpeed;

    if (!this.deleting && this.j === s.length) {
      delay = 1200; // pause at end
      this.deleting = true;
    } else if (this.deleting && this.j === 0) {
      this.deleting = false;
      this.i = (this.i + 1) % this.strings.length;
      if (!this.loop && this.i === 0) return;
      delay = 500; // pause before next string
    }

    this.j += this.deleting ? -1 : 1;

    this.timer = setTimeout(() => this.tick(), delay);
  }

  stop() {
    clearTimeout(this.timer);
  }
}

new TypedText(document.getElementById('typed-text'), [
  'Technical Writer & Documentation Specialist',
  'Static, fast-loading websites',
  'Content Strategist'
]);

// ===================================
// Intersection Observer for animations
// ===================================
const observerOptions = { threshold: 0.1 };

const io = 'IntersectionObserver' in window
  ? new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-aos', 'true');
          io.unobserve(entry.target);
        }
      });
    }, observerOptions)
  : null;

if (io) {
  document.querySelectorAll('[data-aos]').forEach(el => io.observe(el));
}

// =========================
// Defensive: handle JS off
// =========================
// If you need to add classes when JS is enabled, you can do:
// document.documentElement.classList.add('js');

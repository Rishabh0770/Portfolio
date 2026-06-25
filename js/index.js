/**
 * RISHAV KUMAR PORTFOLIO — PREMIUM JS
 * Version 3.0
 * Features: Cursor, Loader, Navbar, Hero Canvas, Counter, Marquee,
 *           Project Filter, Magnetic Buttons, Tilt Cards, AOS, Theme Toggle,
 *           View More, Back to Top, Smooth Scroll, Text Rotate, Form
 */

'use strict';

// =====================================================
// UTILITIES
// =====================================================
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const clamp = (val, min, max) => Math.min(Math.max(val, min), max);
const lerp = (a, b, t) => a + (b - a) * t;
const isMobile = () => window.innerWidth <= 640;

// =====================================================
// PAGE LOADER
// =====================================================
function initLoader() {
  const loader = $('#pageLoader');
  if (!loader) return;
  // Wait for load + animation
  const hide = () => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
  };
  document.body.style.overflow = 'hidden';
  if (document.readyState === 'complete') {
    setTimeout(hide, 2000);
  } else {
    window.addEventListener('load', () => setTimeout(hide, 1800), { once: true });
  }
}

// =====================================================
// CUSTOM CURSOR
// =====================================================
function initCursor() {
  if (isMobile()) return;
  const dot = $('.cursor-dot');
  const ring = $('.cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;
  let rafId;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  const animateRing = () => {
    rx = lerp(rx, mx, 0.12);
    ry = lerp(ry, my, 0.12);
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    rafId = requestAnimationFrame(animateRing);
  };
  animateRing();

  // Hover effect on interactive elements
  const hoverEls = $$('a, button, .project-card, .dm-card, .bento-service, .social-link-card, .filter-btn, .tech-pill');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
}

// =====================================================
// NAVBAR — SCROLL & MOBILE TOGGLE
// =====================================================
function initNavbar() {
  const navbar = $('#navbar');
  const hamburger = $('#hamburger');
  const navLinks = $('#navLinks');
  const links = $$('.nav-link');

  // Scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    if (scroll > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = scroll;
  }, { passive: true });

  // Hamburger toggle
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close menu on link click (mobile)
  links.forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('open');
      navLinks?.classList.remove('open');
    });
  });
}

// =====================================================
// ACTIVE NAV ON SCROLL (SCROLL SPY)
// =====================================================
function initScrollSpy() {
  const sections = $$('section[id]');
  const navLinks = $$('.nav-link[href^="#"]');
  const headerH = 80;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.35, rootMargin: `-${headerH}px 0px -40% 0px` });

  sections.forEach(s => observer.observe(s));
}

// =====================================================
// SMOOTH SCROLL
// =====================================================
function initSmoothScroll() {
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = link.getAttribute('href');
      if (!target || target === '#') return;
      const el = document.querySelector(target);
      if (!el) return;
      e.preventDefault();
      const y = el.getBoundingClientRect().top + window.scrollY - 75;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
}

// =====================================================
// THEME TOGGLE
// =====================================================
function initTheme() {
  const saved = localStorage.getItem('rk-theme') || 'dark';
  applyTheme(saved);

  const btn = $('#themeToggle');
  btn?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('rk-theme', next);
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const icon = $('#themeIcon');
  if (icon) {
    icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
  }
}

// =====================================================
// HERO CANVAS — PARTICLE MESH
// =====================================================
function initHeroCanvas() {
  const canvas = $('#heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  const COUNT = isMobile() ? 40 : 80;
  const MAX_DIST = 130;

  const resize = () => {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  };
  resize();
  window.addEventListener('resize', resize, { passive: true });

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.r = Math.random() * 2 + 0.5;
      this.alpha = Math.random() * 0.4 + 0.1;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,107,91,${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < COUNT; i++) particles.push(new Particle());

  const draw = () => {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    // Connect nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.12;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255,107,91,${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  };
  draw();
}

// =====================================================
// HERO SPOTLIGHT — cursor tracking
// =====================================================
function initHeroSpotlight() {
  const spotlight = $('#heroSpotlight');
  if (!spotlight || isMobile()) return;
  const section = document.querySelector('.hero-section');
  if (!section) return;

  section.addEventListener('mousemove', e => {
    const rect = section.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlight.style.left = x + 'px';
    spotlight.style.top = y + 'px';
  });
}

// =====================================================
// COUNTER ANIMATION
// =====================================================
function initCounters() {
  const counters = $$('.stat-number[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.getAttribute('data-count');
      const duration = 1800;
      const start = performance.now();

      const animate = (now) => {
        const elapsed = now - start;
        const progress = clamp(elapsed / duration, 0, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(animate);
        else el.textContent = target;
      };
      requestAnimationFrame(animate);
      observer.unobserve(el);
    });
  }, { threshold: 0.6 });

  counters.forEach(c => observer.observe(c));
}

// =====================================================
// TEXT ROTATE — Hero
// =====================================================
function initTextRotate() {
  const el = $('#textRotate');
  if (!el) return;
  const words = ['Get Results', 'Convert Visitors', 'Drive Growth', 'Stand Out'];
  let i = 0;

  setInterval(() => {
    i = (i + 1) % words.length;
    el.style.opacity = '0';
    el.style.transform = 'translateY(8px)';
    setTimeout(() => {
      el.textContent = words[i];
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      el.style.transition = 'all 0.4s ease';
    }, 300);
  }, 2800);
}

// =====================================================
// MAGNETIC BUTTONS
// =====================================================
function initMagnetic() {
  if (isMobile()) return;
  $$('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.25;
      const dy = (e.clientY - cy) * 0.25;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

// =====================================================
// PROJECT FILTER
// =====================================================
function initProjectFilter() {
  const filters = $$('.filter-btn');
  const cards = $$('.project-card:not(.extra-project)');

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      // Active state
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      cards.forEach((card, idx) => {
        const cat = card.getAttribute('data-category');
        const show = filter === 'all' || cat === filter;
        if (show) {
          card.classList.remove('hidden');
          card.style.animation = `fadeInUp 0.4s ease ${idx * 0.05}s both`;
        } else {
          card.classList.add('hidden');
          card.style.animation = '';
        }
      });
    });
  });
}

// =====================================================
// VIEW MORE PROJECTS
// =====================================================
function initViewMore() {
  const btn = $('#viewMoreBtn');
  const extras = $$('.extra-project');
  const icon = $('#viewMoreIcon');
  if (!btn) return;
  let open = false;

  btn.addEventListener('click', () => {
    open = !open;
    extras.forEach((card, idx) => {
      if (open) {
        card.classList.remove('d-none');
        card.style.animation = `fadeInUp 0.45s ease ${idx * 0.06}s both`;
      } else {
        card.classList.add('d-none');
      }
    });
    btn.childNodes[0].textContent = open ? 'Show Less Projects ' : 'View More Projects ';
    if (icon) {
      icon.className = open ? 'fas fa-arrow-up' : 'fas fa-arrow-down';
    }
  });
}

// =====================================================
// PROJECT CARD — IMAGE TILT (3D)
// =====================================================
function initCardTilt() {
  if (isMobile()) return;
  $$('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const rx = -(e.clientY - cy) / rect.height * 8;
      const ry = (e.clientX - cx) / rect.width * 8;
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// =====================================================
// BACK TO TOP
// =====================================================
function initBackToTop() {
  const btn = $('#backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// =====================================================
// AOS — ANIMATE ON SCROLL
// =====================================================
function initAOS() {
  if (typeof AOS === 'undefined') return;
  AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80,
    delay: 0,
  });
}

// =====================================================
// BENTO CARD HOVER — GLOW EFFECT
// =====================================================
function initBentoGlow() {
  if (isMobile()) return;
  $$('.bento-card, .timeline-card, .contact-social-card, .contact-form-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// =====================================================
// MARQUEE — PAUSE ON HOVER (CSS handles it, but add touch support)
// =====================================================
function initMarquee() {
  const track = $('.marquee-track');
  if (!track) return;

  // Touch support for pause
  track.addEventListener('touchstart', () => {
    track.style.animationPlayState = 'paused';
  }, { passive: true });
  track.addEventListener('touchend', () => {
    track.style.animationPlayState = 'running';
  }, { passive: true });
}

// =====================================================
// CONTACT FORM — UX ENHANCEMENT
// =====================================================
function initContactForm() {
  const form = $('#contactForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    const btn = form.querySelector('button[type="submit"]');
    if (!btn) return;
    btn.innerHTML = 'Sending... <i class="fas fa-circle-notch fa-spin"></i>';
    btn.disabled = true;
    // Restore after 3s (formspree handles redirect)
    setTimeout(() => {
      btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
      btn.disabled = false;
    }, 3000);
  });
}

// =====================================================
// CSS ANIMATION KEYFRAME — add dynamically
// =====================================================
function injectKeyframes() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
  `;
  document.head.appendChild(style);
}

// =====================================================
// BENTO CARD GRID SHIMMER ON HOVER
// =====================================================
function initShimmerCards() {
  if (isMobile()) return;
  $$('.bento-card, .dm-card, .social-link-card').forEach(card => {
    const shimmer = document.createElement('div');
    shimmer.style.cssText = `
      position: absolute; inset: 0; border-radius: inherit;
      background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%);
      background-size: 200% 100%;
      opacity: 0;
      transition: opacity 0.3s;
      pointer-events: none;
      z-index: 0;
    `;
    card.style.position = 'relative';
    card.appendChild(shimmer);
    card.addEventListener('mouseenter', () => {
      shimmer.style.opacity = '1';
      shimmer.style.animation = 'shimmer 0.9s ease forwards';
    });
    card.addEventListener('mouseleave', () => {
      shimmer.style.opacity = '0';
      shimmer.style.animation = '';
    });
  });
}

// =====================================================
// SECTION TRANSITION — reveal sections with slight scale
// =====================================================
function initSectionReveal() {
  const sections = $$('.section-pad, .hero-section, .hiring-banner');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'none';
      }
    });
  }, { threshold: 0.05 });

  sections.forEach(s => {
    s.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(s);
  });
}

// =====================================================
// SCROLL PROGRESS INDICATOR (thin line at top)
// =====================================================
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed; top: 0; left: 0; height: 2px; width: 0%; z-index: 9999;
    background: linear-gradient(90deg, #FF6B5B, #00D4FF);
    transition: width 0.1s linear;
    pointer-events: none;
  `;
  document.body.appendChild(bar);
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (window.scrollY / total * 100) + '%';
  }, { passive: true });
}

// =====================================================
// INIT ALL
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
  injectKeyframes();
  initLoader();
  initTheme();
  initNavbar();
  initScrollSpy();
  initSmoothScroll();
  initCursor();
  initHeroCanvas();
  initHeroSpotlight();
  initCounters();
  initTextRotate();
  initMagnetic();
  initProjectFilter();
  initViewMore();
  initBackToTop();
  initAOS();
  initBentoGlow();
  initMarquee();
  initContactForm();
  initShimmerCards();
  initScrollProgress();
  setTimeout(initCardTilt, 300);
});

// Re-run magnetic after content loads (for dynamic elements)
window.addEventListener('load', () => {
  initSectionReveal();
  // Reinit card tilt on any newly visible cards
  initCardTilt();
});
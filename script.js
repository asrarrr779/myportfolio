/* ===== REDUCED MOTION CHECK ===== */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ===== PRELOADER ===== */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  preloader.classList.add('hidden');
  document.body.style.overflow = '';
});

/* ===== CUSTOM CURSOR ===== */
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
const cursorRipple = document.getElementById('cursorRipple');

if (cursorDot && cursorRing && !prefersReducedMotion && window.innerWidth > 768) {
  let mx = 0, my = 0;
  let rx = 0, ry = 0;
  let isHovering = false;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
  });

  function animateCursor() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    cursorDot.style.transform = `translate(${mx}px, ${my}px)`;
    cursorRing.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.addEventListener('click', (e) => {
    cursorRipple.style.left = e.clientX + 'px';
    cursorRipple.style.top = e.clientY + 'px';
    cursorRipple.classList.remove('animate');
    void cursorRipple.offsetWidth;
    cursorRipple.classList.add('animate');
  });

  const hoverTargets = document.querySelectorAll('a, button, .btn, .nav-link, .contact-link, .hero-social-link, .faq-question, .project-card, .skill-card, .testimonial-card, .about-card, .profile-img-wrap, .hero-image-wrap');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.classList.add('expanded');
      cursorRing.classList.add('expanded');
    });
    el.addEventListener('mouseleave', () => {
      cursorDot.classList.remove('expanded');
      cursorRing.classList.remove('expanded');
    });
  });
}

/* ===== HERO PARTICLES ===== */
const particlesContainer = document.getElementById('heroParticles');
if (particlesContainer && !prefersReducedMotion) {
  const particleCount = 30;
  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('div');
    p.className = 'hero-particle';
    const size = 2 + Math.random() * 4;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (10 + Math.random() * 20) + 's';
    p.style.animationDelay = (Math.random() * 15) + 's';
    p.style.background = ['#888', '#aaa', '#ccc', '#666'][Math.floor(Math.random() * 4)];
    particlesContainer.appendChild(p);
  }
}

/* ===== PARTICLES.JS ===== */
if (!prefersReducedMotion && typeof particlesJS !== 'undefined') {
  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 1000 } },
      color: { value: '#ffffff' },
      shape: { type: 'circle' },
      opacity: { value: 0.15, random: true, anim: { enable: true, speed: 0.3, opacity_min: 0.02 } },
      size: { value: 2.2, random: true, anim: { enable: true, speed: 1, size_min: 0.1 } },
      line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.05, width: 1 },
      move: {
        enable: true,
        speed: 0.5,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: false }, resize: true },
      modes: { grab: { distance: 180, line_linked: { opacity: 0.1 } } }
    },
    retina_detect: true
  });
}

/* ===== NAVBAR SCROLL EFFECT ===== */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveLink();
}, { passive: true });

/* ===== ACTIVE NAV LINK ===== */
function updateActiveLink() {
  const sections = document.querySelectorAll('.section, .hero');
  const links = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 200;
    const bottom = top + section.offsetHeight;
    if (window.scrollY >= top && window.scrollY < bottom) {
      current = section.getAttribute('id');
    }
  });
  links.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

/* ===== TYPING EFFECT ===== */
const words = ['Web Developer', 'UI/UX Enthusiast', 'Creative Thinker', 'Problem Solver', 'Full-Stack Developer'];
const typedEl = document.getElementById('typedText');
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const current = words[wordIndex];
  if (!isDeleting) {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1500);
    } else {
      setTimeout(typeEffect, prefersReducedMotion ? 50 : 80 + Math.random() * 60);
    }
  } else {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(typeEffect, 500);
    } else {
      setTimeout(typeEffect, prefersReducedMotion ? 30 : 40 + Math.random() * 40);
    }
  }
}
typeEffect();

/* ===== SCROLL REVEAL ===== */
const revealEls = document.querySelectorAll('[data-reveal]');

const revealOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, revealOptions);

revealEls.forEach(el => revealObserver.observe(el));

/* ===== STAGGERED CARD REVEAL ===== */
function applyStagger(containerSelector, cardSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  const cards = container.querySelectorAll(cardSelector);
  cards.forEach((card, i) => {
    const idx = Math.min(i, 6);
    card.setAttribute('data-reveal', '');
    card.classList.add('stagger-' + (idx + 1));
    revealObserver.observe(card);
  });
}

applyStagger('.skills-grid', '.skill-card');
applyStagger('.testimonials-grid', '.testimonial-card');

/* ===== SKILL BAR ANIMATION ===== */
const skillFills = document.querySelectorAll('.skill-bar-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      const width = fill.getAttribute('data-width');
      if (!prefersReducedMotion) {
        fill.style.width = '0';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            fill.style.width = width + '%';
          });
        });
      } else {
        fill.style.width = width + '%';
      }
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

/* ===== COUNTER ANIMATION ===== */
const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-count'), 10);
      if (!prefersReducedMotion) {
        animateCounter(el, target);
      } else {
        el.textContent = target;
      }
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

function animateCounter(el, target) {
  const duration = 1800;
  const steps = 40;
  const increment = target / steps;
  let current = 0;
  let step = 0;
  const interval = duration / steps;

  const timer = setInterval(() => {
    step++;
    current = Math.min(Math.round(increment * step), target);
    el.textContent = current;
    if (step >= steps) {
      el.textContent = target;
      clearInterval(timer);
    }
  }, interval);
}

statNumbers.forEach(el => counterObserver.observe(el));

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ===== FAQ ACCORDION ===== */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isActive = item.classList.contains('active');

    document.querySelectorAll('.faq-item.active').forEach(active => {
      active.classList.remove('active');
    });

    if (!isActive) {
      item.classList.add('active');
    }
  });
});

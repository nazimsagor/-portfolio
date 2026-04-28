// ===== AOS INIT =====
AOS.init({ duration: 800, easing: 'ease-in-out', once: true, offset: 80 });

// ===== TYPED.JS =====
new Typed('#typed', {
  strings: ['Developer', 'Designer', 'Problem Solver', 'Creator'],
  typeSpeed: 70,
  backSpeed: 40,
  backDelay: 1800,
  loop: true,
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
    backToTop.classList.add('visible');
  } else {
    navbar.classList.remove('scrolled');
    backToTop.classList.remove('visible');
  }

  // Active nav link
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ===== BACK TO TOP =====
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== SKILL BARS ANIMATION =====
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      const width = fill.getAttribute('data-width');
      fill.style.width = width + '%';
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

// ===== TOUCH: PROJECT CARD OVERLAY (mobile tap) =====
if ('ontouchstart' in window) {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function (e) {
      // if link was tapped, allow it
      if (e.target.closest('.project-link')) return;
      const overlay = this.querySelector('.project-overlay');
      const isVisible = overlay.style.opacity === '1';
      // close all others
      document.querySelectorAll('.project-overlay').forEach(o => o.style.opacity = '0');
      overlay.style.opacity = isVisible ? '0' : '1';
    });
  });
}

// ===== CONTACT FORM =====
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    const btn = form.querySelector('button[type="submit"]');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
  });
}

// ===== SMOOTH REVEAL on load =====
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});

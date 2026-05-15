// NAV SCROLL EFFECT 
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.background = window.scrollY > 40
    ? 'rgba(10,10,12,0.97)'
    : 'rgba(10,10,12,0.85)';
});

// HAMBURGER 
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

//  SCROLL REVEAL 
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.skill-focus, .skill-card, .project-card, .achievement-card, .cert-card, .credential-card, .timeline-item, .activity-card'
).forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

//  SUBTLE CARD TILT 
document.querySelectorAll('.skill-card, .project-card, .credential-card').forEach(card => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 4;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -4;
    card.style.transform = `translateY(-4px) rotateX(${y}deg) rotateY(${x}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

//  SCROLL TO TOP 
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
});
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

//  SMOOTH ACTIVE NAV 
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
const activeSpy = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = 'var(--accent)';
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => activeSpy.observe(s));

//  PAGE LOAD FADE 
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';
window.addEventListener('load', () => { document.body.style.opacity = '1'; });

//  CONSOLE EASTER EGG 
console.log('%c👨‍💻 Himanshu Mishra — Portfolio', 'color:#e8ff47;font-size:16px;font-weight:bold;');
console.log('%cBuilt with HTML, CSS & vanilla JS', 'color:#8888a0;font-size:12px;');

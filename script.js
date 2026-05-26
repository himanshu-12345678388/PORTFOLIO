const nav = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const scrollTopBtn = document.getElementById('scrollTop');

const updateNav = () => {
  nav.classList.toggle('scrolled', window.scrollY > 24);
  scrollTopBtn.classList.toggle('visible', window.scrollY > 420);
};

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px' });

document.querySelectorAll('.reveal, .reveal-on-load').forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index * 35, 240)}ms`;
  revealObserver.observe(el);
});

document.querySelectorAll('.project-card').forEach((card) => {
  const toggle = card.querySelector('.project-toggle');

  const toggleCard = (event) => {
    if (event.target.closest('a')) return;
    card.classList.toggle('expanded');
    toggle.textContent = card.classList.contains('expanded') ? 'Close' : 'Details';
  };

  card.addEventListener('click', toggleCard);
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleCard(event);
    }
  });
});

const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navAnchors.forEach((anchor) => {
      anchor.classList.toggle('active', anchor.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { threshold: 0.42 });

sections.forEach((section) => activeObserver.observe(section));

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

console.log('%cHimanshu Mishra - Portfolio', 'color:#C90000;font-size:16px;font-weight:bold;');
console.log('%cBuilt with HTML, CSS, and vanilla JavaScript.', 'color:#6f6962;font-size:12px;');

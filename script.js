// ==================== THEME TOGGLE ====================
// Dark/Light mode functionality for the theme selector
document.addEventListener('DOMContentLoaded', function() {
  const modeSelect = document.querySelector('.mode');
  const body = document.body;

  // Load saved theme from localStorage
  const savedTheme = localStorage.getItem('portfolioTheme') || 'light';
  applyTheme(savedTheme);
  if (modeSelect) {
    modeSelect.value = savedTheme;
  }

  // Listen for theme changes
  if (modeSelect) {
    modeSelect.addEventListener('change', function(e) {
      const selectedTheme = e.target.value.toLowerCase();
      applyTheme(selectedTheme);
      localStorage.setItem('portfolioTheme', selectedTheme);
    });
  }
});

function applyTheme(theme) {
  const body = document.body;
  if (theme === 'dark') {
    body.classList.remove('light');
    body.classList.add('dark');
  } else {
    body.classList.remove('dark');
    body.classList.add('light');
  }
}

// ==================== SMOOTH SCROLLING ====================
// Smooth scroll effect for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ==================== SCROLL ANIMATIONS ====================
// Fade in sections as user scrolls
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all section boxes for animation
document.querySelectorAll('.box1, .box3, .box4, .box5, .box7, .box8').forEach(box => {
  box.classList.add('scroll-animate');
  observer.observe(box);
});

// Add fade-in animation styles
const style = document.createElement('style');
style.textContent = `
  .scroll-animate {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  
  .fade-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }

  .buttons {
    position: relative;
    overflow: hidden;
  }

  .buttons::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.2);
    transition: left 0.3s ease;
  }

  .buttons:hover::before {
    left: 100%;
  }

  a {
    transition: color 0.3s ease, text-shadow 0.3s ease;
  }

  a:hover {
    text-shadow: 0 0 8px rgba(255, 105, 180, 0.6);
  }

  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
  }

  h1, h2, h3 {
    transition: color 0.3s ease;
  }

  .box1:hover h1,
  .box3:hover h2,
  .box4:hover h2 {
    color: hotpink;
  }
`;
document.head.appendChild(style);

// ==================== SMOOTH PAGE LOAD ====================
// Fade in body on page load
window.addEventListener('load', function() {
  document.body.style.opacity = '1';
  document.body.style.transition = 'opacity 0.5s ease-in';
});

// ==================== BUTTON INTERACTIONS ====================
// Enhanced button effects
document.querySelectorAll('button, .buttons').forEach(btn => {
  btn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.05)';
  });

  btn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
  });

  btn.style.transition = 'transform 0.3s ease, background-color 0.3s ease';
});

// ==================== IMAGE LOADING EFFECTS ====================
// Smooth fade in for images
document.querySelectorAll('img').forEach(img => {
  img.style.opacity = '0';
  img.style.transition = 'opacity 0.4s ease-in';

  if (img.complete) {
    img.style.opacity = '1';
  } else {
    img.addEventListener('load', function() {
      this.style.opacity = '1';
    });
  }
});

// ==================== ACTIVE SECTION HIGHLIGHT ====================
// Highlight section on scroll
const sectionHeadings = document.querySelectorAll('.head, .head2, .head3, .head4, .head5, .head6');
const scrollSpy = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Remove active class from all
      sectionHeadings.forEach(heading => {
        heading.style.borderBottom = 'none';
        heading.style.paddingBottom = '0';
      });
      // Add to current
      entry.target.style.borderBottom = '3px solid hotpink';
      entry.target.style.paddingBottom = '10px';
    }
  });
}, { threshold: 0.5 });

sectionHeadings.forEach(heading => scrollSpy.observe(heading));

// ==================== SCROLL TO TOP BUTTON ====================
// Create and manage scroll-to-top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑ Top';
scrollTopBtn.style.cssText = `
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: hotpink;
  color: white;
  border: none;
  padding: 12px 16px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 20px;
  cursor: pointer;
  display: none;
  z-index: 999;
  transition: opacity 0.3s ease, transform 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', function() {
  if (window.pageYOffset > 300) {
    scrollTopBtn.style.display = 'flex';
    scrollTopBtn.style.alignItems = 'center';
    scrollTopBtn.style.justifyContent = 'center';
  } else {
    scrollTopBtn.style.display = 'none';
  }
});

scrollTopBtn.addEventListener('click', function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

scrollTopBtn.addEventListener('mouseenter', function() {
  this.style.transform = 'scale(1.1)';
  this.style.backgroundColor = 'deeppink';
});

scrollTopBtn.addEventListener('mouseleave', function() {
  this.style.transform = 'scale(1)';
  this.style.backgroundColor = 'hotpink';
});

// ==================== PARALLAX EFFECT ====================
// Subtle parallax effect on header
const headerBox = document.querySelector('.box1');
if (headerBox) {
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    headerBox.style.transform = `translateY(${scrolled * 0.3}px)`;
    headerBox.style.transition = 'none';
  });
}

// ==================== LINK HOVER EFFECTS ====================
// Enhanced link hover with color change
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('mouseenter', function() {
    if (!this.classList.contains('buttons')) {
      this.style.filter = 'brightness(1.3)';
    }
  });

  link.addEventListener('mouseleave', function() {
    this.style.filter = 'brightness(1)';
  });

  this.style.transition = 'filter 0.3s ease';
});

// ==================== CONSOLE MESSAGE ====================
// Easter egg console message
console.log('%c🎨 Welcome to Himanshu Mishra\'s Portfolio! 🎨', 'color: hotpink; font-size: 16px; font-weight: bold;');
console.log('%cEnhanced with smooth scrolling, animations, and dynamic themes!', 'color: #1F2937; font-size: 12px;');


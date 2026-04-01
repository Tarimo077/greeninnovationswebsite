// Scroll animations and counter animations using Intersection Observer

// Loading Screen Functionality
let resourcesLoaded = 0;
let totalResources = 0;

// Count total resources (images, stylesheets, scripts)
function countResources() {
  // Count images
  const images = document.querySelectorAll('img');
  totalResources += images.length;
  
  // Count CSS files
  const cssFiles = document.querySelectorAll('link[rel="stylesheet"]');
  totalResources += cssFiles.length;
  
  // Count JS files
  const jsFiles = document.querySelectorAll('script[src]');
  totalResources += jsFiles.length;
}

// Track resource loading
function trackResourceLoad() {
  resourcesLoaded++;
  if (resourcesLoaded >= totalResources) {
    hideLoadingScreen();
  }
}

// Hide loading screen with animation
function hideLoadingScreen() {
  setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.querySelector('main');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    
    if (loadingScreen) {
      loadingScreen.classList.add('fade-out');
      
      // Show main content elements with smooth fade in
      if (mainContent) {
        mainContent.style.opacity = '1';
        mainContent.style.transform = 'translateY(0)';
      }
      if (header) {
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';
      }
      if (footer) {
        footer.style.opacity = '1';
        footer.style.transform = 'translateY(0)';
      }
      
      // Remove from DOM after animation completes
      setTimeout(() => {
        if (loadingScreen.parentNode) {
          loadingScreen.parentNode.removeChild(loadingScreen);
        }
      }, 500);
    }
  }, 500); // Show loading for exactly 0.5 seconds - shorter loading time
}

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Trigger counter animation if element has counter class
      if (entry.target.classList.contains('counter')) {
        animateCounter(entry.target);
      }
    }
  });
}, observerOptions);

// Observe all elements with animation classes
const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
animatedElements.forEach(el => observer.observe(el));

// Counter animation
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000; // Animation duration in ms
  const increment = target / (duration / 16); // 60fps
  let current = 0;
  
  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };
  
  updateCounter();
}

// Initialize loading screen functionality
document.addEventListener('DOMContentLoaded', () => {
  // Hide main content elements initially
  const mainContent = document.querySelector('main');
  const header = document.querySelector('header');
  const footer = document.querySelector('footer');
  
  if (mainContent) {
    mainContent.style.opacity = '0';
    mainContent.style.transform = 'translateY(20px)';
    mainContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  }
  if (header) {
    header.style.opacity = '0';
    header.style.transform = 'translateY(-10px)';
    header.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  }
  if (footer) {
    footer.style.opacity = '0';
    footer.style.transform = 'translateY(20px)';
    footer.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  }
  
  // Count and track resources
  countResources();
  
  // Set up resource load tracking
  // Images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (img.complete) {
      trackResourceLoad();
    } else {
      img.addEventListener('load', trackResourceLoad);
      img.addEventListener('error', trackResourceLoad);
    }
  });
  
  // CSS files (already loaded by the time this script runs)
  trackResourceLoad();
  
  // JS files
  const jsFiles = document.querySelectorAll('script[src]');
  jsFiles.forEach(script => {
    if (script.hasAttribute('data-loaded')) {
      trackResourceLoad();
    } else {
      script.addEventListener('load', trackResourceLoad);
      script.addEventListener('error', trackResourceLoad);
    }
  });
  
  // Fallback timeout in case resource tracking fails
  setTimeout(hideLoadingScreen, 1000);
});

// Mark scripts as loaded
document.addEventListener('readystatechange', () => {
  if (document.readyState === 'complete') {
    const scripts = document.querySelectorAll('script[data-loaded]');
    scripts.forEach(script => {
      if (!script.dataset.loaded) {
        script.dataset.loaded = 'true';
        trackResourceLoad();
      }
    });
  }
});

// Mark current script as loaded
if (document.currentScript && !document.currentScript.dataset.loaded) {
  document.currentScript.dataset.loaded = 'true';
  trackResourceLoad();
}

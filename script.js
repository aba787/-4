
// Professional JavaScript for Momaken Volunteer Platform

// ========== Global Variables ==========
let isLoading = false;
const loadingOverlay = document.getElementById('loadingOverlay');

// ========== Utility Functions ==========
function showLoading() {
  if (loadingOverlay) {
    loadingOverlay.style.display = 'flex';
    isLoading = true;
  }
}

function hideLoading() {
  if (loadingOverlay) {
    loadingOverlay.style.display = 'none';
    isLoading = false;
  }
}

function showNotification(message, type = 'success') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 300px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  `;
  
  // Set colors based on type
  if (type === 'success') {
    notification.style.background = '#4caf50';
  } else if (type === 'error') {
    notification.style.background = '#f44336';
  } else if (type === 'info') {
    notification.style.background = '#2196f3';
  } else if (type === 'warning') {
    notification.style.background = '#ff9800';
  }
  
  notification.textContent = message;
  document.body.appendChild(notification);
  
  // Show notification
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Hide notification after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// ========== Form Validation ==========
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateSaudiPhone(phone) {
  const phoneRegex = /^05\d{8}$/;
  return phoneRegex.test(phone);
}

function validatePassword(password) {
  return password.length >= 6;
}

// ========== Enhanced Form Handling ==========
function enhanceFormInputs() {
  const inputs = document.querySelectorAll('input, textarea, select');
  
  inputs.forEach(input => {
    // Add focus effects
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
      
      // Validate on blur
      if (this.type === 'email' && this.value) {
        if (!validateEmail(this.value)) {
          this.setCustomValidity('يرجى إدخال بريد إلكتروني صحيح');
          this.style.borderColor = '#f44336';
        } else {
          this.setCustomValidity('');
          this.style.borderColor = '#4caf50';
        }
      }
      
      if (this.type === 'tel' && this.value) {
        if (!validateSaudiPhone(this.value)) {
          this.setCustomValidity('يرجى إدخال رقم هاتف سعودي صحيح (05XXXXXXXX)');
          this.style.borderColor = '#f44336';
        } else {
          this.setCustomValidity('');
          this.style.borderColor = '#4caf50';
        }
      }
    });
    
    // Real-time validation feedback
    input.addEventListener('input', function() {
      if (this.validity.valid && this.value) {
        this.style.borderColor = '#4caf50';
      } else if (!this.validity.valid && this.value) {
        this.style.borderColor = '#f44336';
      } else {
        this.style.borderColor = '#e0e0e0';
      }
    });
  });
}

// ========== Smooth Animations ==========
function initializeAnimations() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        
        // Add staggered animation for cards
        if (entry.target.classList.contains('feature-card')) {
          const cards = document.querySelectorAll('.feature-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, index * 100);
          });
        }
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll('.feature-card, .dashboard-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ========== Navigation Enhancement ==========
function enhanceNavigation() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  // Add active state to current page
  const currentPage = window.location.pathname.split('/').pop();
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });
  
  // Mobile menu toggle (if needed)
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      navbar.classList.toggle('mobile-menu-open');
    });
  }
}

// ========== Performance Optimization ==========
function optimizeImages() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    // Add loading attribute for lazy loading
    img.loading = 'lazy';
    
    // Add error handling
    img.onerror = function() {
      this.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f0f0f0"/><text x="100" y="100" text-anchor="middle" dy="0.3em" fill="%23999">صورة غير متاحة</text></svg>';
    };
  });
}

// ========== Accessibility Enhancements ==========
function enhanceAccessibility() {
  // Add keyboard navigation for buttons
  const buttons = document.querySelectorAll('.btn, button');
  
  buttons.forEach(btn => {
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });
  
  // Add focus indicators
  const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
  
  focusableElements.forEach(el => {
    el.addEventListener('focus', function() {
      this.style.outline = '2px solid #2e7d32';
      this.style.outlineOffset = '2px';
    });
    
    el.addEventListener('blur', function() {
      this.style.outline = 'none';
    });
  });
}

// ========== Page Load Optimization ==========
function initializePageOptimization() {
  // Preload critical resources
  const criticalResources = [
    'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap'
  ];
  
  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    link.as = 'style';
    document.head.appendChild(link);
  });
}

// ========== Local Storage Management ==========
function manageUserPreferences() {
  const preferences = JSON.parse(localStorage.getItem('userPreferences')) || {};
  
  // Save user's preferred language (if applicable)
  if (!preferences.language) {
    preferences.language = 'ar';
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
  }
  
  // Remember user's last visited page
  preferences.lastVisited = window.location.pathname;
  localStorage.setItem('userPreferences', JSON.stringify(preferences));
}

// ========== Error Handling ==========
window.addEventListener('error', (e) => {
  console.error('JavaScript Error:', e.error);
  
  // Don't show error notifications to users in production
  if (window.location.hostname === 'localhost' || window.location.hostname.includes('replit')) {
    showNotification('حدث خطأ تقني. يرجى إعادة تحميل الصفحة.', 'error');
  }
});

// ========== Page Initialization ==========
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 منصة مُمكّن - جاهزة للاستخدام');
  
  // Initialize all features
  try {
    enhanceFormInputs();
    initializeAnimations();
    enhanceNavigation();
    optimizeImages();
    enhanceAccessibility();
    initializePageOptimization();
    manageUserPreferences();
    
    // Hide loading after everything is initialized
    setTimeout(hideLoading, 500);
    
    showNotification('مرحباً بك في منصة مُمكّن! 🎉', 'success');
  } catch (error) {
    console.error('Initialization error:', error);
    hideLoading();
  }
});

// ========== Service Worker Registration (PWA) ==========
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(registration => {
        console.log('Service Worker registered successfully');
      })
      .catch(error => {
        console.log('Service Worker registration failed:', error);
      });
  });
}

// ========== Export for use in other files ==========
window.MomakenUtils = {
  showLoading,
  hideLoading,
  showNotification,
  validateEmail,
  validateSaudiPhone,
  validatePassword
};

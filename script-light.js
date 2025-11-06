
// منصة مُمكّن - نسخة خفيفة للعرض

// إدارة حالة تسجيل الدخول
function initAuth() {
  const loginLink = document.getElementById("loginLink");
  const currentUser = localStorage.getItem('currentUser');

  if (currentUser) {
    loginLink.innerHTML = `👋 مرحباً، ${currentUser}`;
    loginLink.href = "#";
    loginLink.onclick = (e) => {
      e.preventDefault();
      if (confirm('هل تريد تسجيل الخروج؟')) {
        localStorage.removeItem('currentUser');
        window.location.reload();
      }
    };
  }
}

// تأثيرات بسيطة
function initSimpleEffects() {
  // تأثير النافذة للأرقام
  const numbers = document.querySelectorAll('.number');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const target = parseInt(element.textContent.replace(/,/g, ''));
        animateNumber(element, target);
        observer.unobserve(element);
      }
    });
  });

  numbers.forEach(num => observer.observe(num));
}

function animateNumber(element, target) {
  let current = 0;
  const increment = target / 50;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current).toLocaleString('ar-SA');
  }, 30);
}

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function() {
  initAuth();
  initSimpleEffects();
  
  // إضافة تأثير بسيط للنافذة
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.topbar');
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(46, 125, 50, 0.95)';
    } else {
      navbar.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
    }
  });
});

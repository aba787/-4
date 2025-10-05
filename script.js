// script.js أو main.js

// مثال: إخفاء زر تسجيل الدخول بعد تحميل الصفحة (لو ما تستخدم Firebase)
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginLink");
  if (loginBtn) {
    // ممكن تضع شرط أو تعديل حسب حالة معينة
    // لو أنت تستخدم Firebase في auth، هالجزء يكون في firebase.js أو firestore.js عشان يكون دقيق
    console.log("صفحة جاهزة");
  }
});

// مثال آخر: تحكم في قائمة التنقل أو فتح نافذة
const menuBtn = document.querySelector(".menu-btn");
if(menuBtn) {
  menuBtn.addEventListener("click", () => {
    document.body.classList.toggle("menu-open");
  });
}
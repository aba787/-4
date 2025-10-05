import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAlMibtDbLAZLMhhJNho5Sih_qBfWxZyXI",
  authDomain: "momaken-45ba9.firebaseapp.com",
  projectId: "momaken-45ba9",
  storageBucket: "momaken-45ba9.appspot.com",
  messagingSenderId: "638133555280",
  appId: "1:638133555280:web:c84bd87c15cabe55d30155"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const list = document.getElementById("notifications-list");

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const notiRef = collection(db, `users/${user.uid}/notifications`);
  const q = query(notiRef, orderBy("createdAt", "desc"));

  onSnapshot(q, (snapshot) => {
    list.innerHTML = "";

    if (snapshot.empty) {
      list.innerHTML = "<li>لا توجد إشعارات حالياً.</li>";
      return;
    }

    snapshot.forEach(doc => {
      const data = doc.data();
      const li = document.createElement("li");
      li.textContent = data.text || "إشعار بدون نص";
      list.appendChild(li);
    });
  });
});
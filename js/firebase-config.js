// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

// Cấu hình Firebase của bạn
const firebaseConfig = {
  apiKey: "AIzaSyBhOuDevCO_PBnfelqLJqdtvUy6GcIPuZU",
  authDomain: "webaudio-3dad2.firebaseapp.com",
  projectId: "webaudio-3dad2",
  storageBucket: "webaudio-3dad2.firebasestorage.app",
  messagingSenderId: "48114171053",
  appId: "1:48114171053:web:b34f71972f5317f47fda24",
  measurementId: "G-H1X0N1FH49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

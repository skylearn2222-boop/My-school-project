import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCxvhoqaCqASQ19mXsoA3a5OCn6kxw6WN0",
  authDomain: "login-system-ebf47.firebaseapp.com",
  projectId: "login-system-ebf47",
  storageBucket: "login-system-ebf47.firebasestorage.app",
  messagingSenderId: "886903474819",
  appId: "1:886903474819:web:9a90c689639b40305ee9b6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut };

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-messaging.js";

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
const messaging = getMessaging(app);

// Push notification permission চাওয়া এবং token নেওয়া
export async function requestNotificationPermission() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: 'BNdsu34bGfTZf6fNPYv90mjCRV3ME40uDXDJ8gWo4a4630Velc_e_kasoHmxrge6MYfqz5oXOKdc3raMIoH4xTk'
      });
      console.log('FCM Token:', token);
      return token;
    }
  } catch (err) {
    console.error('Notification permission error:', err);
  }
  return null;
}

// Foreground message handler
onMessage(messaging, (payload) => {
  console.log('Message received:', payload);
  const { title, body } = payload.notification;
  new Notification(title, { body, icon: '/logo.webp' });
});

export { auth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, messaging };

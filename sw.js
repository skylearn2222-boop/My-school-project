importScripts('https://www.gstatic.com/firebasejs/12.14.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.14.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCxvhoqaCqASQ19mXsoA3a5OCn6kxw6WN0",
  authDomain: "login-system-ebf47.firebaseapp.com",
  projectId: "login-system-ebf47",
  storageBucket: "login-system-ebf47.firebasestorage.app",
  messagingSenderId: "886903474819",
  appId: "1:886903474819:web:9a90c689639b40305ee9b6"
});

const messaging = firebase.messaging();

// Background notification দেখাবে
messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon: '/logo.webp',
    badge: '/logo.webp',
    data: { url: '/notice.html' }  // click করলে notice পেজে যাবে
  });
});

// Notification click করলে notice.html এ নিয়ে যাবে
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const url = e.notification.data?.url || '/notice.html';
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // সাইট আগে থেকে খোলা থাকলে সেই tab focus করবে
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.focus();
          client.navigate(url);
          return;
        }
      }
      // না থাকলে নতুন tab খুলবে
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});

// ─── Cache ───────────────────────────────────────────────────
const CACHE_NAME = 'aps-school-v2';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/notice.html',
  '/gallery.html',
  '/results.html',
  '/payment.html',
  '/history.html',
  '/admission.html',
  '/teachers.html',
  '/faq.html',
  '/shared.css',
  '/shared.js',
  '/components.js',
  '/manifest.json',
  '/logo.webp',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (!res || res.status !== 200) return res;
        const clone = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        return res;
      }).catch(() => caches.match('/index.html'));
    })
  );
});

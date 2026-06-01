// ===== TOPBAR SCROLL =====
const topbar = document.querySelector('.topbar');
if (topbar) {
  window.addEventListener('scroll', () => {
    topbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// ===== DRAWER =====
const dotsBtn = document.getElementById('dotsBtn');
const drawer = document.getElementById('drawer');
const drawerOverlay = document.getElementById('drawerOverlay');
const drawerClose = document.getElementById('drawerClose');

function openDrawer() {
  drawer?.classList.add('open');
  drawerOverlay?.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeDrawer() {
  drawer?.classList.remove('open');
  drawerOverlay?.classList.remove('open');
  document.body.style.overflow = '';
}
dotsBtn?.addEventListener('click', openDrawer);
drawerClose?.addEventListener('click', closeDrawer);
drawerOverlay?.addEventListener('click', closeDrawer);

// ===== PWA SERVICE WORKER =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

// PWA Install Prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;

  // Install banner দেখাবে
  const banner = document.createElement('div');
  banner.id = 'pwa-banner';
  banner.innerHTML = `
    <div style="
      position:fixed; bottom:90px; left:50%; transform:translateX(-50%);
      background:linear-gradient(135deg,#0d4a2f,#2eb872);
      color:white; border-radius:18px; padding:14px 20px;
      display:flex; align-items:center; gap:12px;
      box-shadow:0 12px 40px rgba(13,74,47,0.45);
      z-index:8000; max-width:320px; width:90%;
      animation: slideUp 0.5s cubic-bezier(0.34,1.56,0.64,1);
    ">
      <img src="logo.webp" style="width:36px;height:36px;border-radius:10px;object-fit:cover;" onerror="this.style.display='none'">
      <div style="flex:1;">
        <div style="font-size:0.78rem;opacity:0.8;margin-bottom:2px;">অ্যাপ হিসেবে ইনস্টল করুন</div>
        <div style="font-size:0.88rem;font-weight:700;">APS School</div>
      </div>
      <button onclick="installPWA()" style="
        background:white; color:#0d4a2f; border:none;
        border-radius:10px; padding:8px 14px;
        font-size:0.8rem; font-weight:800; cursor:pointer;
        font-family:'Sora',sans-serif; flex-shrink:0;
      ">Install</button>
      <button onclick="document.getElementById('pwa-banner').remove()" style="
        background:rgba(255,255,255,0.15); color:white; border:none;
        border-radius:8px; width:28px; height:28px; cursor:pointer;
        font-size:0.85rem; flex-shrink:0;
      ">✕</button>
    </div>
  `;
  document.body.appendChild(banner);

  // ১০ সেকেন্ড পরে auto hide
  setTimeout(() => banner.remove(), 10000);
});

function installPWA() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then(() => {
    deferredPrompt = null;
    document.getElementById('pwa-banner')?.remove();
  });
}

// Slide up animation
const pwaStyle = document.createElement('style');
pwaStyle.textContent = `@keyframes slideUp { from { opacity:0; transform:translateX(-50%) translateY(30px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }`;
document.head.appendChild(pwaStyle);

// ===== LANGUAGE TOGGLE =====
const langToggle = document.getElementById('langToggle');
let currentLang = localStorage.getItem('lang') || 'bn';
if (langToggle) langToggle.textContent = currentLang === 'en' ? 'বাং' : 'EN';

langToggle?.addEventListener('click', () => {
  currentLang = currentLang === 'bn' ? 'en' : 'bn';
  localStorage.setItem('lang', currentLang);
  langToggle.textContent = currentLang === 'bn' ? 'EN' : 'বাং';
  document.dispatchEvent(new CustomEvent('langChange', { detail: currentLang }));
});

// ===== DARK MODE =====
const darkToggle = document.getElementById('darkToggle');
const isDark = localStorage.getItem('darkMode') === 'true';
if (isDark) {
  document.body.classList.add('dark');
  if (darkToggle) darkToggle.textContent = '☀️';
}
darkToggle?.addEventListener('click', () => {
  const nowDark = document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', nowDark);
  darkToggle.textContent = nowDark ? '☀️' : '🌙';
});

// ===== SCROLL TO TOP =====
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  scrollTopBtn?.classList.toggle('show', window.scrollY > 300);
}, { passive: true });
scrollTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== APPLE-STYLE SCROLL REVEAL =====
function initReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  const staggerEls = document.querySelectorAll('[data-stagger]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));

  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        staggerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  staggerEls.forEach(el => staggerObserver.observe(el));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setTimeout(initReveal, 600));
} else {
  setTimeout(initReveal, 600);
}


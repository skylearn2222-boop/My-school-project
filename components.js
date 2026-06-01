// Inject shared HTML components
function injectComponents() {
  // LOADING SCREEN
  const loadDiv = document.createElement('div');
  loadDiv.id = 'loadingScreen';
  loadDiv.innerHTML = `
    <img src="logo.webp" class="loading-logo" alt="Logo" onerror="this.src='logo.png'">
    <div class="loading-title">আফতাবউদ্দিন প্রি-ক্যাডেট স্কুল</div>
    <div class="loading-bar-wrap"><div class="loading-bar"></div></div>
  `;
  document.body.prepend(loadDiv);
  setTimeout(() => loadDiv.classList.add('hidden'), 1800);

  // TOPBAR
  const topbarEl = document.getElementById('topbar-placeholder');
  if (topbarEl) {
    topbarEl.innerHTML = `
    <nav class="topbar" id="topbar">
      <a href="index.html" class="topbar-brand">
        <img src="logo.webp" alt="Logo" class="topbar-logo" onerror="this.src='logo.png';this.onerror=null;">
        <div class="topbar-name">আফতাবউদ্দিন<br>প্রি-ক্যাডেট স্কুল</div>
      </a>
      <div class="topbar-right">
        <button class="lang-toggle" id="langToggle" title="Language">EN</button>
        <button class="dark-toggle" id="darkToggle" title="Dark Mode">🌙</button>
        <a href="login.html" id="navLoginBtn" style="background:linear-gradient(135deg,#0d4a2f,#1a7a50);color:white;padding:7px 16px;border-radius:20px;font-size:0.8rem;font-weight:700;text-decoration:none;display:flex;align-items:center;gap:6px;">
          <i class="fas fa-user"></i> <span id="navLoginText">লগইন</span>
        </a>
        <button class="dots-btn" id="dotsBtn" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>`;
  }

  // DRAWER
  const drawerEl = document.getElementById('drawer-placeholder');
  if (drawerEl) {
    drawerEl.innerHTML = `
    <div class="drawer-overlay" id="drawerOverlay"></div>
    <aside class="drawer" id="drawer">
      <div class="drawer-header">
        <button class="drawer-close" id="drawerClose">✕</button>
        <div class="drawer-school-name">আফতাবউদ্দিন প্রি-ক্যাডেট স্কুল</div>
        <div class="drawer-school-sub">Agorpur Busstand, Kulirarchar, Kishoreganj</div>
      </div>
      <nav class="drawer-nav">
        <a href="index.html"><span class="nav-icon"><i class="fas fa-home"></i></span> হোম</a>
        <a href="history.html"><span class="nav-icon"><i class="fas fa-landmark"></i></span> স্কুলের ইতিহাস</a>
        <div class="drawer-divider"></div>
        <a href="notice.html"><span class="nav-icon"><i class="fas fa-bell"></i></span> নোটিশ বোর্ড</a>
        <a href="results.html"><span class="nav-icon"><i class="fas fa-trophy"></i></span> ফলাফল</a>
        <a href="gallery.html"><span class="nav-icon"><i class="fas fa-images"></i></span> গ্যালারি</a>
        <a href="teachers.html"><span class="nav-icon"><i class="fas fa-chalkboard-teacher"></i></span> শিক্ষক পরিচিতি</a>
        <a href="faq.html"><span class="nav-icon"><i class="fas fa-circle-question"></i></span> সচরাচর প্রশ্ন (FAQ)</a>
        <div class="drawer-divider"></div>
        <a href="admission.html"><span class="nav-icon"><i class="fas fa-pen-to-square"></i></span> ভর্তি ফর্ম</a>
        <a href="payment.html" style="background:linear-gradient(135deg,#e8533a,#c0392b);color:white;border-radius:14px;margin-top:4px;">
          <span class="nav-icon"><i class="fas fa-money-bill-wave"></i></span> ফি পরিশোধ
        </a>
        <div class="drawer-divider"></div>
        <a href="login.html" id="drawerLoginBtn" style="background:linear-gradient(135deg,#0d4a2f,#1a7a50);color:white;border-radius:14px;margin-top:4px;">
          <span class="nav-icon"><i class="fas fa-user"></i></span> <span id="drawerLoginText">লগইন / অ্যাকাউন্ট</span>
        </a>
      </nav>
    </aside>`;
  }

  // FLOATING BUTTONS
  const fabEl = document.getElementById('fab-placeholder');
  if (fabEl) {
    fabEl.innerHTML = `
    <button class="scroll-top" id="scrollTopBtn" title="উপরে যাও">
      <i class="fas fa-chevron-up"></i>
    </button>`;
  }

  // FOOTER
  const footerEl = document.getElementById('footer-placeholder');
  if (footerEl) {
    footerEl.innerHTML = `
    <footer>
      <div class="footer-logo-row">
        <img src="logo.png" alt="Logo" class="footer-logo-img" onerror="this.style.display='none'">
        <div class="footer-school-name">আফতাবউদ্দিন প্রি-ক্যাডেট স্কুল<br>
          <span style="font-weight:400; font-size:0.75rem; color:rgba(255,255,255,0.4);">আগরপুর, কুলিয়ারচর, কিশোরগঞ্জ</span>
        </div>
      </div>
      <p class="footer-tagline">✨ Courage to Know — শিক্ষায় আলোকিত হোক প্রতিটি শিশু</p>
      <div class="footer-div"></div>
      <div class="footer-bottom">
        © ২০২৬ আফতাবউদ্দিন প্রি-ক্যাডেট স্কুল &nbsp;|&nbsp; প্রতিষ্ঠাকাল: ২০০১<br>
        📍 আগরপুর বাসস্ট্যান্ড, কুলিয়ারচর, কিশোরগঞ্জ &nbsp;|&nbsp; 📞 01720-244469
      </div>
      <div class="footer-dev">
        Designed &amp; Developed by &nbsp;<span>Abir</span>
      </div>
    </footer>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  injectComponents();
  // Re-init shared.js after injection
  const s = document.createElement('script');
  s.src = 'shared.js';
  document.body.appendChild(s);
});

// Check Firebase login state and update navbar button
(function() {
  function updateNavButtons(user) {
    const navBtn = document.getElementById('navLoginBtn');
    const navText = document.getElementById('navLoginText');
    const drawerBtn = document.getElementById('drawerLoginBtn');
    const drawerText = document.getElementById('drawerLoginText');
    if (user) {
      if (navBtn) navBtn.href = 'dashboard.html';
      if (navText) navText.textContent = 'ড্যাশবোর্ড';
      if (drawerBtn) drawerBtn.href = 'dashboard.html';
      if (drawerText) drawerText.textContent = 'ড্যাশবোর্ড';
    }
  }

  Promise.all([
    import("https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js"),
    import("https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js")
  ]).then(([{ initializeApp, getApps }, { getAuth, onAuthStateChanged }]) => {
    const existing = getApps().find(a => a.name === 'navApp');
    const app = existing || initializeApp({
      apiKey: "AIzaSyCxvhoqaCqASQ19mXsoA3a5OCn6kxw6WN0",
      authDomain: "login-system-ebf47.firebaseapp.com",
      projectId: "login-system-ebf47",
    }, 'navApp');
    onAuthStateChanged(getAuth(app), updateNavButtons);
  });
})();

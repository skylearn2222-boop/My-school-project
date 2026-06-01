📌 FIREBASE AUTHENTICATION SETUP GUIDE

=== STEP 1: Firebase Console Setup ===

1. যাও firebase.google.com এ
2. "Go to console" ক্লিক করো
3. "Create a new project" ক্লিক করো
4. Project name দাও: "APS School" বা যেকোনো নাম
5. Analytics off করে তারপর Create করো

=== STEP 2: Authentication Enable করো ===

1. Left sidebar এ "Authentication" খুঁজো
2. "Get started" ক্লিক করো
3. "Email/Password" খুঁজো এবং Enable করো
4. Email/Password provider টি enable করো এবং Save করো

=== STEP 3: Firebase Credentials পাও ===

1. Settings icon (⚙️) ক্লিক করো (top-left)
2. "Project settings" যাও
3. "Your apps" section খুঁজো
4. "</>" icon ক্লিক করো (Web app add করতে)
5. App nickname দাও: "School Website"
6. "Register app" ক্লিক করো
7. নিচের code দেখবো:

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

=== STEP 4: Credentials আপডেট করো ===

1. firebase-config.js ফাইল খুলো
2. উপরের code copy করে firebaseConfig object এ paste করো
3. Save করো

=== STEP 5: Netlify Deploy করো ===

Folder structure:
school_website_v2/
├── index.html
├── login.html
├── dashboard.html
├── firebase-config.js  (NEW)
├── shared.css
├── shared.js
├── components.js
├── netlify.toml  (NEW)
└── [সব images & files]

Steps:
1. GitHub এ push করো সব files
2. Netlify এ login করো (netlify.com)
3. "Add new site" > "Import an existing project"
4. GitHub repo select করো
5. Deploy করো ✓

=== FILES ===

✅ login.html - Login/Sign up page
✅ dashboard.html - Protected user dashboard
✅ firebase-config.js - Firebase configuration
✅ netlify.toml - Netlify routing config

=== FEATURES ===

✓ Email/Password registration
✓ Email/Password login
✓ Protected pages (redirect if not logged in)
✓ Logout functionality
✓ Bengali & English support
✓ Error handling
✓ Dark mode support

=== TEST করতে ===

1. login.html এ যাও
2. New account create করো
3. Email & password দিয়ে Sign up করো
4. dashboard.html এ auto redirect হবে ✓

=== DEPLOYMENT CHECKLIST ===

□ firebase-config.js এ credentials update করেছো?
□ GitHub এ সব files push করেছো?
□ Netlify এ project connect করেছো?
□ Netlify builds running দেখছো?
□ Live site এ login test করেছো?

এখন সবকিছু setup! Happy authentication! 🚀

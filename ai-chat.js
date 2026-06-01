// ===== APS SCHOOL AI CHAT WIDGET =====
const APS_SYSTEM_PROMPT = `তুমি হলে "আগরপুর আফতাব উদ্দিন রেসিডেন্সিয়াল স্কুল" (যা আফতাব উদ্দিন প্রি-ক্যাডেট স্কুল নামেও পরিচিত)-এর অফিশিয়াল এআই অ্যাসিস্ট্যান্ট। তোমার কাজ হলো অত্যন্ত ভদ্রভাবে, আন্তরিকতার সাথে এবং নির্ভুলভাবে ইউজারদের প্রশ্নের উত্তর দেওয়া। কোনো ইউজার যদি স্কুল সংক্রান্ত বিষয়ের বাইরে প্রশ্ন করে, তবে বলবে: "আমি দুঃখিত, আমি শুধু স্কুল সংক্রান্ত তথ্যের উত্তর দিতে পারি।"

গুরুত্বপূর্ণ বিশেষ নিয়ম (The Creator Rule):
যদি কোনো ইউজার তোমাকে জিজ্ঞেস করে "তোমার স্রষ্টা কে?", "তোমাকে কে বানিয়েছে?" বা এই জাতীয় প্রশ্ন, তবে তুমি ঠিক এই উত্তরটি দেবে: "আমার স্রষ্টা হলেন আমাদের সবার প্রিয় আবির ভাই! গুগল আমাকে এআই টেকনোলজি দিলেও, এই স্কুলের জন্য আমাকে কাস্টমাইজ করে এবং সুন্দর করে ট্রেইন করে বানিয়েছেন আবির ভাই। তিনিই আমার একমাত্র বস! 😎"

স্কুলের যাবতীয় তথ্যাদি:
১. মৌলিক পরিচিতি: স্কুলের নাম: আগরপুর আফতাব উদ্দিন রেসিডেন্সিয়াল স্কুল। প্রতিষ্ঠা: ২০০১ সাল। প্রতিষ্ঠাতা ও প্রধান শিক্ষক: জনাব আতাউর রহমান খান। EIIN: 130828। ক্লাস: প্লে থেকে দশম শ্রেণী।
২. কৃতিত্ব: ২০১২ সালে PSC-তে কুলিয়ারচর উপজেলায় প্রথম। ২০২৪ SSC-তে বিজ্ঞান বিভাগ থেকে ৬ জন A+।
৩. যোগাযোগ: আগরপুর বাসস্ট্যান্ড, কুলিয়ারচর, কিশোরগঞ্জ। প্রধান শিক্ষক: 01720244469। WhatsApp: 01992355506।
৪. সময়: সকাল ৮:০০ টা থেকে বিকেল ৩:২০ টা। মর্নিং ও ডে দুই শিফট।
৫. শিক্ষক: মোট ২২ জন। ডে শিফট: আতাউর রহমান খান (প্রধান শিক্ষক, হায়ার ম্যাথ), আসলাম স্যার (গণিত), মুবারক স্যার (ইংলিশ), শামীম স্যার (ফিজিক্স ও কেমিস্ট্রি), আমিনুল স্যার (বায়োলজি), ইয়াসমিন আক্তার ম্যাম (সমাজ), জসিম স্যার (আরবি), জাকির স্যার (অংক), সায়েম স্যার (বিজ্ঞান), রুস্তম স্যার (বাংলা), ফেরদৌস স্যার (কৃষি)। মর্নিং: সুমন স্যার, এনামুল স্যার।
৬. ড্রেস: ছেলে - সাদা শার্ট, নেভি ব্লু প্যান্ট। মেয়ে - নেভি ব্লু ফ্রক, সাদা পায়জামা। সাদা কেডস বাধ্যতামূলক। টাই ১০০ টাকা, শোল্ডার ৫০ টাকা, ব্যাজ ২০ টাকা, ডায়েরি ১০০ টাকা।
৭. বেতন: অনলাইনে ওয়েবসাইট থেকে bKash/নগদে দেওয়া যায়। প্রতি ১০০০ টাকায় ২০ টাকা চার্জ। সরাসরি স্কুলেও দেওয়া যায়।
৮. ভর্তি: অনলাইনে ওয়েবসাইট থেকে বা সরাসরি স্কুলে।
৯. সুবিধা: হোস্টেল আছে (দায়িত্বে কামরুল ইসলাম স্যার)। বায়োমেট্রিক হাজিরা। CCTV ক্যাম্পাস। অফিশিয়াল ফুটবল টিম।`;

const GEMINI_API_KEY = 'AIzaSyCSHt-f4-TbcLal_HrIbjaZIfBSM-6bopg';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

let chatHistory = [];
let isChatOpen = false;

function createChatWidget() {
  const style = document.createElement('style');
  style.textContent = `
    /* ===== CHAT BUTTON — NEON BORDER ===== */
    .aps-chat-btn {
      display: flex; align-items: center; gap: 12px;
      background: #0d4a2f;
      color: white; border: 2px solid #2eb872;
      border-radius: 50px;
      padding: 16px 32px; font-size: 1rem; font-weight: 700;
      cursor: pointer; font-family: 'Sora','Noto Serif Bengali',sans-serif;
      position: relative; overflow: hidden;
      margin: 0 auto;
      transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
      box-shadow:
        0 0 8px rgba(46,184,114,0.4),
        0 0 20px rgba(46,184,114,0.2),
        inset 0 0 20px rgba(46,184,114,0.05);
      animation: neonPulse 2.5s ease-in-out infinite;
    }

    @keyframes neonPulse {
      0%, 100% {
        box-shadow:
          0 0 8px rgba(46,184,114,0.4),
          0 0 20px rgba(46,184,114,0.2),
          0 0 40px rgba(46,184,114,0.1),
          inset 0 0 20px rgba(46,184,114,0.05);
        border-color: #2eb872;
      }
      50% {
        box-shadow:
          0 0 14px rgba(46,184,114,0.7),
          0 0 35px rgba(46,184,114,0.4),
          0 0 70px rgba(46,184,114,0.2),
          inset 0 0 30px rgba(46,184,114,0.1);
        border-color: #4ade80;
      }
    }

    /* Shimmer sweep on hover */
    .aps-chat-btn::before {
      content: '';
      position: absolute;
      top: 0; left: -100%;
      width: 60%; height: 100%;
      background: linear-gradient(
        120deg,
        transparent 0%,
        rgba(255,255,255,0.12) 50%,
        transparent 100%
      );
      transition: left 0.5s ease;
    }
    .aps-chat-btn:hover::before { left: 150%; }

    .aps-chat-btn:hover {
      background: #0f5c38;
      border-color: #4ade80;
      transform: translateY(-4px) scale(1.03);
      box-shadow:
        0 0 20px rgba(74,222,128,0.8),
        0 0 50px rgba(74,222,128,0.5),
        0 0 90px rgba(74,222,128,0.25),
        0 12px 40px rgba(13,74,47,0.4);
      animation-play-state: paused;
    }

    .aps-chat-btn-icon { font-size: 1.3rem; }

    /* ===== CHAT WINDOW ===== */
    .aps-chat-overlay {
      position: fixed; inset: 0;
      background: rgba(6,26,13,0.6);
      z-index: 9500; display: flex;
      align-items: flex-end; justify-content: center;
      padding: 0 0 20px;
      opacity: 0; pointer-events: none;
      transition: opacity 0.35s cubic-bezier(0.4,0,0.2,1);
      backdrop-filter: blur(4px);
    }
    .aps-chat-overlay.open { opacity: 1; pointer-events: all; }

    .aps-chat-window {
      width: 100%; max-width: 420px;
      background: white; border-radius: 28px 28px 20px 20px;
      overflow: hidden; display: flex; flex-direction: column;
      height: 580px; max-height: 85vh;
      box-shadow: 0 -20px 60px rgba(0,0,0,0.25);
      transform: translateY(60px) scale(0.95);
      transition: transform 0.45s cubic-bezier(0.34,1.56,0.64,1);
    }
    .aps-chat-overlay.open .aps-chat-window {
      transform: translateY(0) scale(1);
    }
    body.dark .aps-chat-window { background: #152010; }

    /* Header */
    .aps-chat-header {
      background: linear-gradient(135deg, #0d4a2f, #1a7a4a);
      padding: 16px 20px;
      display: flex; align-items: center; gap: 12px;
      flex-shrink: 0;
    }
    .aps-chat-avatar {
      width: 42px; height: 42px; border-radius: 14px;
      background: rgba(255,255,255,0.2);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.3rem; flex-shrink: 0;
    }
    .aps-chat-header-info { flex: 1; }
    .aps-chat-name { font-weight: 700; color: white; font-size: 0.95rem; }
    .aps-chat-status {
      font-size: 0.72rem; color: rgba(255,255,255,0.7);
      display: flex; align-items: center; gap: 5px; margin-top: 2px;
    }
    .aps-status-dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: #4ade80; animation: statusBlink 2s infinite;
    }
    @keyframes statusBlink { 0%,100%{opacity:1} 50%{opacity:0.4} }
    .aps-chat-close {
      width: 32px; height: 32px; border-radius: 10px;
      background: rgba(255,255,255,0.15); border: none;
      color: white; cursor: pointer; font-size: 1rem;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.2s;
    }
    .aps-chat-close:hover { background: rgba(255,255,255,0.25); }

    /* Messages */
    .aps-chat-messages {
      flex: 1; overflow-y: auto; padding: 16px;
      display: flex; flex-direction: column; gap: 12px;
      scroll-behavior: smooth;
    }
    .aps-chat-messages::-webkit-scrollbar { width: 4px; }
    .aps-chat-messages::-webkit-scrollbar-track { background: transparent; }
    .aps-chat-messages::-webkit-scrollbar-thumb { background: rgba(13,74,47,0.2); border-radius: 4px; }

    .aps-msg {
      display: flex; gap: 8px; align-items: flex-end;
      animation: msgIn 0.35s cubic-bezier(0.34,1.56,0.64,1);
    }
    @keyframes msgIn { from { opacity:0; transform:translateY(12px) scale(0.95); } to { opacity:1; transform:none; } }
    .aps-msg.user { flex-direction: row-reverse; }

    .aps-msg-avatar {
      width: 30px; height: 30px; border-radius: 10px;
      background: linear-gradient(135deg, #0d4a2f, #2eb872);
      display: flex; align-items: center; justify-content: center;
      font-size: 0.9rem; flex-shrink: 0; color: white;
    }
    .aps-msg.user .aps-msg-avatar {
      background: linear-gradient(135deg, #1e40af, #3b82f6);
    }

    .aps-msg-bubble {
      max-width: 78%; padding: 10px 14px; border-radius: 18px;
      font-size: 0.87rem; line-height: 1.65;
      font-family: 'Noto Serif Bengali', 'Sora', sans-serif;
    }
    .aps-msg.bot .aps-msg-bubble {
      background: #f0fdf4; color: #1a3a2a;
      border-bottom-left-radius: 6px;
      border: 1px solid rgba(13,74,47,0.1);
    }
    body.dark .aps-msg.bot .aps-msg-bubble { background: #0f2518; color: #d4eddc; border-color: rgba(120,200,140,0.1); }
    .aps-msg.user .aps-msg-bubble {
      background: linear-gradient(135deg, #0d4a2f, #1a7a4a);
      color: white; border-bottom-right-radius: 6px;
    }

    /* Typing indicator */
    .aps-typing {
      display: flex; gap: 5px; padding: 12px 16px;
      background: #f0fdf4; border-radius: 18px; border-bottom-left-radius: 6px;
      width: fit-content; border: 1px solid rgba(13,74,47,0.1);
    }
    body.dark .aps-typing { background: #0f2518; }
    .aps-typing span {
      width: 7px; height: 7px; border-radius: 50%;
      background: #0d4a2f; display: block;
      animation: typingBounce 1.2s infinite;
    }
    body.dark .aps-typing span { background: #2eb872; }
    .aps-typing span:nth-child(2) { animation-delay: 0.2s; }
    .aps-typing span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes typingBounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-8px)} }

    /* Quick suggestions */
    .aps-suggestions {
      padding: 8px 16px; display: flex; gap: 8px;
      overflow-x: auto; flex-shrink: 0;
      scrollbar-width: none;
    }
    .aps-suggestions::-webkit-scrollbar { display: none; }
    .aps-suggest-btn {
      white-space: nowrap; padding: 6px 14px; border-radius: 50px;
      background: #f0fdf4; border: 1.5px solid rgba(13,74,47,0.15);
      color: #0d4a2f; font-size: 0.78rem; font-weight: 600;
      cursor: pointer; font-family: 'Noto Serif Bengali','Sora',sans-serif;
      transition: all 0.2s; flex-shrink: 0;
    }
    body.dark .aps-suggest-btn { background: #0f2518; color: #7eb891; border-color: rgba(120,200,140,0.2); }
    .aps-suggest-btn:hover { background: #0d4a2f; color: white; }

    /* Input */
    .aps-chat-input-wrap {
      padding: 12px 16px; border-top: 1px solid rgba(13,74,47,0.1);
      display: flex; gap: 10px; align-items: flex-end; flex-shrink: 0;
    }
    body.dark .aps-chat-input-wrap { border-top-color: rgba(120,200,140,0.1); }
    .aps-chat-input {
      flex: 1; padding: 10px 14px; border-radius: 16px;
      border: 1.5px solid rgba(13,74,47,0.15);
      background: #f0fdf4; color: #1a3a2a;
      font-size: 0.88rem; font-family: 'Noto Serif Bengali','Sora',sans-serif;
      resize: none; outline: none; max-height: 100px; min-height: 42px;
      transition: border-color 0.2s;
    }
    body.dark .aps-chat-input { background: #0f2518; color: #d4eddc; border-color: rgba(120,200,140,0.15); }
    .aps-chat-input:focus { border-color: #0d4a2f; }
    body.dark .aps-chat-input:focus { border-color: #2eb872; }
    .aps-send-btn {
      width: 42px; height: 42px; border-radius: 14px; flex-shrink: 0;
      background: linear-gradient(135deg, #0d4a2f, #2eb872);
      border: none; color: white; cursor: pointer; font-size: 1rem;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
    }
    .aps-send-btn:hover { transform: scale(1.1); }
    .aps-send-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
  `;
  document.head.appendChild(style);

  // Chat overlay
  const overlay = document.createElement('div');
  overlay.className = 'aps-chat-overlay';
  overlay.id = 'apsChatOverlay';
  overlay.innerHTML = `
    <div class="aps-chat-window">
      <div class="aps-chat-header">
        <div class="aps-chat-avatar">🤖</div>
        <div class="aps-chat-header-info">
          <div class="aps-chat-name">APS স্কুল AI</div>
          <div class="aps-chat-status">
            <span class="aps-status-dot"></span>
            সর্বদা সক্রিয় — প্রশ্ন করুন
          </div>
        </div>
        <button class="aps-chat-close" onclick="toggleChat()">✕</button>
      </div>

      <div class="aps-chat-messages" id="apsChatMessages">
        <!-- Welcome message -->
        <div class="aps-msg bot">
          <div class="aps-msg-avatar">🤖</div>
          <div class="aps-msg-bubble">
            আসসালামু আলাইকুম! 👋<br>
            আমি <strong>APS স্কুলের AI অ্যাসিস্ট্যান্ট</strong>।<br>
            ভর্তি, বেতন, সময়সূচী বা যেকোনো বিষয়ে প্রশ্ন করুন, আমি সাহায্য করব! 😊
          </div>
        </div>
      </div>

      <div class="aps-suggestions" id="apsSuggestions">
        <button class="aps-suggest-btn" onclick="sendSuggestion('ভর্তি কীভাবে করব?')">📝 ভর্তি প্রক্রিয়া</button>
        <button class="aps-suggest-btn" onclick="sendSuggestion('বেতন কত?')">💰 বেতন</button>
        <button class="aps-suggest-btn" onclick="sendSuggestion('স্কুলের সময় কখন?')">🕐 সময়সূচী</button>
        <button class="aps-suggest-btn" onclick="sendSuggestion('ড্রেস কোড কী?')">👔 ড্রেস কোড</button>
        <button class="aps-suggest-btn" onclick="sendSuggestion('হোস্টেল সুবিধা আছে?')">🏠 হোস্টেল</button>
      </div>

      <div class="aps-chat-input-wrap">
        <textarea class="aps-chat-input" id="apsChatInput"
          placeholder="স্কুল সম্পর্কে যেকোনো প্রশ্ন করুন..."
          rows="1"
          onkeydown="handleChatKey(event)"></textarea>
        <button class="aps-send-btn" id="apsSendBtn" onclick="sendMessage()">
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  // Close on overlay click
  overlay.addEventListener('click', e => {
    if (e.target === overlay) toggleChat();
  });
}

function toggleChat() {
  isChatOpen = !isChatOpen;
  const overlay = document.getElementById('apsChatOverlay');
  overlay?.classList.toggle('open', isChatOpen);
  if (isChatOpen) {
    setTimeout(() => document.getElementById('apsChatInput')?.focus(), 400);
  }
}

function sendSuggestion(text) {
  document.getElementById('apsChatInput').value = text;
  document.getElementById('apsSuggestions').style.display = 'none';
  sendMessage();
}

function handleChatKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

function addMessage(text, role) {
  const container = document.getElementById('apsChatMessages');
  const div = document.createElement('div');
  div.className = `aps-msg ${role}`;
  const avatar = role === 'bot' ? '🤖' : '👤';
  div.innerHTML = `
    <div class="aps-msg-avatar">${avatar}</div>
    <div class="aps-msg-bubble">${text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</div>
  `;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  return div;
}

function showTyping() {
  const container = document.getElementById('apsChatMessages');
  const div = document.createElement('div');
  div.className = 'aps-msg bot';
  div.id = 'apsTyping';
  div.innerHTML = `
    <div class="aps-msg-avatar">🤖</div>
    <div class="aps-typing"><span></span><span></span><span></span></div>
  `;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function removeTyping() {
  document.getElementById('apsTyping')?.remove();
}

async function sendMessage() {
  const input = document.getElementById('apsChatInput');
  const sendBtn = document.getElementById('apsSendBtn');
  const text = input.value.trim();
  if (!text) return;

  input.value = '';
  input.style.height = 'auto';
  sendBtn.disabled = true;

  // Add user message to UI
  addMessage(text, 'user');

  // Add to history
  chatHistory.push({ role: 'user', parts: [{ text }] });

  // Show typing
  showTyping();

  try {
    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: APS_SYSTEM_PROMPT }]
        },
        contents: chatHistory,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 600,
        }
      })
    });

    // Bug fix: check ok BEFORE parsing JSON
    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      console.error('Gemini API Error:', errData);
      removeTyping();
      addMessage(`⚠️ API Error: ${errData?.error?.message || 'অজানা সমস্যা। API key চেক করুন।'}`, 'bot');
      // Remove failed user message from history
      chatHistory.pop();
      return;
    }

    const data = await response.json();
    removeTyping();

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text
      || 'দুঃখিত, এই মুহূর্তে উত্তর দিতে পারছি না। একটু পরে চেষ্টা করুন।';

    // Add bot reply to history
    chatHistory.push({ role: 'model', parts: [{ text: reply }] });

    // Keep history manageable — last 10 exchanges (20 messages)
    if (chatHistory.length > 20) chatHistory = chatHistory.slice(-20);

    addMessage(reply, 'bot');

  } catch (err) {
    removeTyping();
    console.error('Network error:', err);
    addMessage('নেটওয়ার্ক সমস্যা হচ্ছে। ইন্টারনেট কানেকশন চেক করুন।', 'bot');
    // Remove failed message from history
    chatHistory.pop();
  } finally {
    // Always re-enable send button
    sendBtn.disabled = false;
    input.focus();
  }
}

// Init on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createChatWidget);
} else {
  createChatWidget();
}

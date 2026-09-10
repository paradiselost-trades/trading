(function () {
  'use strict';

  // 1. INJECT RESKIN CSS STYLES
  const reskinStyles = `
    /* Force drawer header container to fit full-width top layout */
    .trade-drawer, .drawer, #trade-drawer, [class*="drawer"] {
      position: relative !important;
    }

    /* L's Placement: Scaled Up Header Banner in top right of drawer */
    .dn-l-header-box {
      position: absolute;
      top: 10px;
      right: 15px;
      left: 15px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 14px;
      z-index: 10000;
      pointer-events: auto;
    }

    .dn-l-img {
      width: 90px;
      height: auto;
      cursor: pointer;
      user-select: none;
      flex-shrink: 0;
      transition: transform 0.2s ease, filter 0.2s ease;
    }

    .dn-l-img:hover {
      transform: scale(1.08) rotate(-3deg);
      filter: drop-shadow(0 0 8px #00ff66);
    }

    .dn-l-speech-bubble {
      background: rgba(10, 10, 10, 0.98);
      border: 2px solid #00ff66;
      color: #00ff66;
      padding: 10px 14px;
      border-radius: 8px;
      width: 280px;
      font-size: 0.88rem;
      font-family: 'Courier New', monospace;
      box-shadow: 0 0 14px rgba(0, 255, 102, 0.3);
      position: relative;
    }

    .dn-l-speech-bubble::after {
      content: '';
      position: absolute;
      right: -9px;
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-top: 7px solid transparent;
      border-bottom: 7px solid transparent;
      border-left: 9px solid #00ff66;
    }

    .dn-tag {
      color: #ff3344;
      font-weight: bold;
      display: block;
      font-size: 0.75rem;
      letter-spacing: 0.8px;
      margin-bottom: 4px;
    }

    .dn-quote-text {
      margin: 0;
      line-height: 1.35;
      min-height: 2.5em;
    }

    .dn-progress-wrap {
      width: 100%;
      height: 5px;
      background: #111;
      border-radius: 3px;
      margin-top: 8px;
      overflow: hidden;
      border: 1px solid #222;
    }

    .dn-progress-bar {
      height: 100%;
      width: 94.1%;
      background: #00ff66;
      box-shadow: 0 0 8px #00ff66;
      transition: width 0.3s ease-in-out;
    }

    /* Light's Placement: Large Visual Novel Box Docked Outside Drawer */
    .dn-vn-box {
      position: absolute;
      bottom: 20px;
      left: -370px;
      width: 350px;
      background: rgba(10, 2, 4, 0.98);
      border: 2px solid #ff0033;
      box-shadow: 0 0 20px rgba(255, 0, 51, 0.5);
      border-radius: 8px;
      padding: 14px;
      opacity: 0;
      pointer-events: none;
      transform: translateX(12px);
      transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
      z-index: 999999;
    }

    .dn-vn-box.active {
      opacity: 1;
      pointer-events: auto;
      transform: translateX(0);
    }

    .dn-vn-header {
      border-bottom: 1px dashed #ff0033;
      padding-bottom: 6px;
      margin-bottom: 10px;
    }

    .dn-vn-tag {
      color: #ff0033;
      font-weight: bold;
      font-family: 'Georgia', serif;
      font-size: 0.85rem;
      letter-spacing: 1.2px;
    }

    .dn-vn-content {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .dn-light-frame {
      width: 85px;
      height: 85px;
      flex-shrink: 0;
      background: #050102;
      border: 2px solid #ff0033;
      outline: 1px solid #1a0005;
      box-shadow: inset 0 0 10px rgba(255, 0, 51, 0.6), 0 0 10px rgba(255, 0, 51, 0.4);
      border-radius: 6px;
      padding: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    }

    .dn-light-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      filter: contrast(1.1) brightness(0.95);
    }

    .dn-vn-text {
      color: #ffffff;
      font-family: 'Georgia', serif;
      font-style: italic;
      font-size: 0.9rem;
      line-height: 1.4;
      margin: 0;
      flex-grow: 1;
    }
  `;

  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = reskinStyles;
  document.head.appendChild(styleSheet);

  // 2. EXPANDED QUOTE LIBRARIES
  const lQuotes = [
    "Eating sweets during trade negotiations increases deduction processing speed by 40%.",
    "There is a 98.7% chance this trade request gets ignored for 6 days, followed by a sudden 3 AM reply.",
    "My calculations indicate a 100% probability this trader's Mega link will ask for a decryption key.",
    "If you trade for an untracked audio, my sugar processing requirement doubles immediately.",
    "I have analyzed the audio waveform. There is a 94.1% likelihood someone coughed directly into the microphone during Act 1.",
    "Trading 3 Broadway VOBs for 1 West End audio? Mathematically... I respect the desperation.",
    "There is a 0.4% chance this trader is Light Yagami, but a 99.6% chance they are just hoarding 4K boots.",
    "If I don't get another scoop of vanilla ice cream, I will intentionally misalign your cart items.",
    "My analysis shows a 99.4% probability you are secretly looking for another Heathers master.",
    "There is a 98% chance this trade partner is currently sitting in a dark room holding a spoon.",
    "I've calculated the odds... you should definitely add one more bootleg to this cart.",
    "A 1:1 video trade request? Simple, clean, and efficient. I rate this transaction 4 out of 5 cake slices.",
    "My deduction is absolute: if you don't trade for this audio, you will think about it for the next 48 hours.",
    "There is a 72.3% chance this VOB file comes with original DVD VTS menus intact.",
    "Analyzing trade history... Probability of partner agreeing to an untracked audio swap: 88.9%.",
    "I observed your mouse hovering over that request button for 12 seconds. You are nervous.",
    "Sugar levels optimal. Proceeding to evaluate your trade request balance...",
    "My analysis indicates this video was recorded on a handheld camera in 2011, yet you still want it. Fascinating.",
    "There is a 91.2% chance this collector has 'Do Not Gift' written in bold red letters across their site.",
    "If you send this email now, expect a response precisely when you go to sleep."
  ];

  const lightQuotes = [
    " (No, no, NO! I can't request 'Death Note: The Musical' right now! It's too obvious! They'll suspect my identity in seconds!) ",
    " (Wait... if I trade 2 audios for 1 video, my exchange ratio remains completely flawless. All according to plan!) ",
    " (If I copy this request to clipboard now, L will deduce that I am actively building a West End collection... Everything depends on this trade!) ",
    " (What if this trader is an investigator sent by the ICPO? No... my trading alias and email header are completely airtight.) ",
    " (I'll take a VOB master... AND WATCH IT!) ",
    " (Sending an empty trade request?! Is this a trap set by Near?! I need to select a bootleg first!) ",
    " (A 1080p MP4 export?! No... L would know a casual collector couldn't source a file this clean! I need to act natural!) ",
    " (I must maintain my trade ratio... That is the only way to rule this new world!) ",
    " (What if their cloud folder has restricted permissions?! I must inspect the link carefully before sending...) ",
    " (No... I can't request this master yet! What if they notice I don't have Bikinibottomday's rare audio in my list?!) ",
    " (If they reject this trade, I'll have no choice... I'll write their Encora handle in the notebook!) ",
    " (A 4K bootleg request? They're testing me. They want to see if my storage drive can handle the file size!) ",
    " (I need to compose this email with absolute precision... One typo in the show date and L will narrow down my time zone!) ",
    " (They responded in less than five minutes... Could this be a set-up?! Should I delay my reply?!) ",
    " (Wait... if I trade for this tracked audio now, will they realize I'm trying to complete my Hadestown set?! Think, Light, THINK!) "
  ];

  let lightTimer = null;

  // 3. INJECTION & LOGIC
  function injectWidgets() {
    const drawerContainer = document.querySelector('.trade-drawer') || 
                            document.querySelector('.drawer') || 
                            document.querySelector('#trade-drawer') ||
                            document.querySelector('aside');

    if (drawerContainer) {
      if (!document.getElementById('lDeductionBox')) {
        const lContainer = document.createElement('div');
        lContainer.className = 'dn-l-header-box';
        lContainer.id = 'lDeductionBox';
        lContainer.innerHTML = `
          <div class="dn-l-speech-bubble">
            <span class="dn-tag">🍰 L'S DEDUCTION</span>
            <p class="dn-quote-text" id="lQuoteText">Eating sweets during trade negotiations increases deduction processing speed by 40%.</p>
            <div class="dn-progress-wrap">
              <div class="dn-progress-bar" id="lProgressBar"></div>
            </div>
          </div>
          <img src="art/L_derpy.webp" alt="L Derpy" class="dn-l-img" id="lDerpyImg">
        `;
        drawerContainer.appendChild(lContainer);

        const lImg = document.getElementById('lDerpyImg');
        if (lImg) lImg.addEventListener('click', updateLQuote);
      }

      if (!document.getElementById('lightVnBox')) {
        const vnBox = document.createElement('div');
        vnBox.className = 'dn-vn-box';
        vnBox.id = 'lightVnBox';
        vnBox.innerHTML = `
          <div class="dn-vn-header">
            <span class="dn-vn-tag">[ 🍎 LIGHT YAGAMI ]</span>
          </div>
          <div class="dn-vn-content">
            <div class="dn-light-frame">
              <img src="art/Light_derpy.webp" alt="Light Panic" class="dn-light-img">
            </div>
            <p class="dn-vn-text" id="lightQuoteText">"(No, no, NO! I can't request 'Death Note: The Musical' right now! It's too obvious!)"</p>
          </div>
        `;
        drawerContainer.appendChild(vnBox);
      }
    }
  }

  function updateLQuote() {
    const randomL = lQuotes[Math.floor(Math.random() * lQuotes.length)];
    const textEl = document.getElementById('lQuoteText');
    const barEl = document.getElementById('lProgressBar');
    if (textEl) textEl.innerText = randomL;
    if (barEl) {
      barEl.style.width = '0%';
      setTimeout(() => { barEl.style.width = Math.floor(Math.random() * 40 + 60) + '%'; }, 50);
    }
  }

  function triggerLightMonologue() {
    const randomLight = lightQuotes[Math.floor(Math.random() * lightQuotes.length)];
    const textEl = document.getElementById('lightQuoteText');
    const boxEl = document.getElementById('lightVnBox');
    if (textEl) textEl.innerText = randomLight;
    if (boxEl) boxEl.classList.add('active');

    clearTimeout(lightTimer);
    lightTimer = setTimeout(hideLightMonologue, 6000);
  }

  function hideLightMonologue() {
    const boxEl = document.getElementById('lightVnBox');
    if (boxEl) boxEl.classList.remove('active');
  }

  const observer = new MutationObserver(() => {
    injectWidgets();
  });

  observer.observe(document.body, { childList: true, subtree: true });

  document.addEventListener('click', (e) => {
    if (e.target.closest('.open-cart-btn, .cart-btn, .cart-icon, .trade-drawer-toggle, .add-to-trade-btn, [class*="trade"]')) {
      triggerLightMonologue();
    }
  });

})();

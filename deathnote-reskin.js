(function () {
  'use strict';

  // 1. INJECT RESKIN CSS STYLES
  const reskinStyles = `
    /* L's Placement: Fixed in the Top-Right of the Trade Drawer */
    .dn-l-header-box {
      position: absolute;
      top: 10px;
      right: 14px;
      display: flex;
      align-items: center;
      gap: 10px;
      z-index: 10000;
      pointer-events: auto;
    }

    .dn-l-img {
      width: 52px;
      height: auto;
      cursor: pointer;
      user-select: none;
      flex-shrink: 0;
      transition: transform 0.2s ease, filter 0.2s ease;
    }

    .dn-l-img:hover {
      transform: scale(1.1) rotate(-3deg);
      filter: drop-shadow(0 0 6px #00ff66);
    }

    .dn-l-speech-bubble {
      background: rgba(10, 10, 10, 0.96);
      border: 1px solid #00ff66;
      color: #00ff66;
      padding: 6px 10px;
      border-radius: 6px;
      width: 190px;
      font-size: 0.74rem;
      font-family: 'Courier New', monospace;
      box-shadow: 0 0 10px rgba(0, 255, 102, 0.25);
      position: relative;
    }

    .dn-l-speech-bubble::after {
      content: '';
      position: absolute;
      right: -7px;
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-left: 7px solid #00ff66;
    }

    .dn-tag {
      color: #ff3344;
      font-weight: bold;
      display: block;
      font-size: 0.65rem;
      letter-spacing: 0.5px;
      margin-bottom: 2px;
    }

    .dn-quote-text {
      margin: 0;
      line-height: 1.25;
      min-height: 2.4em;
    }

    .dn-progress-wrap {
      width: 100%;
      height: 4px;
      background: #111;
      border-radius: 2px;
      margin-top: 5px;
      overflow: hidden;
      border: 1px solid #222;
    }

    .dn-progress-bar {
      height: 100%;
      width: 94.1%;
      background: #00ff66;
      box-shadow: 0 0 6px #00ff66;
      transition: width 0.3s ease-in-out;
    }

    /* Light's Placement: Floating Visual Novel Box (Position Fixed to eliminate layout breaking) */
    .dn-vn-box {
      position: fixed;
      bottom: 30px;
      right: 380px;
      width: 270px;
      background: rgba(10, 2, 4, 0.96);
      border: 2px solid #ff0033;
      box-shadow: 0 0 16px rgba(255, 0, 51, 0.4);
      border-radius: 6px;
      padding: 10px;
      opacity: 0;
      pointer-events: none;
      transform: translateY(10px);
      transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
      z-index: 999999;
    }

    .dn-vn-box.active {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
    }

    .dn-vn-header {
      border-bottom: 1px dashed #ff0033;
      padding-bottom: 4px;
      margin-bottom: 8px;
    }

    .dn-vn-tag {
      color: #ff0033;
      font-weight: bold;
      font-family: 'Georgia', serif;
      font-size: 0.75rem;
      letter-spacing: 1px;
    }

    .dn-vn-content {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .dn-light-frame {
      width: 58px;
      height: 58px;
      flex-shrink: 0;
      background: #050102;
      border: 2px solid #ff0033;
      outline: 1px solid #1a0005;
      box-shadow: inset 0 0 8px rgba(255, 0, 51, 0.6), 0 0 8px rgba(255, 0, 51, 0.4);
      border-radius: 4px;
      padding: 2px;
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
      font-size: 0.78rem;
      line-height: 1.3;
      margin: 0;
      flex-grow: 1;
    }
  `;

  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = reskinStyles;
  document.head.appendChild(styleSheet);

  // 2. QUOTE LIBRARIES
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
    "There is a 98% chance this trade partner is currently sitting in a dark room holding a spoon."
  ];

  const lightQuotes = [
    " (No, no, NO! I can't request 'Death Note: The Musical' right now! It's too obvious! They'll suspect my identity in seconds!) ",
    " (Wait... if I trade 2 audios for 1 video, my exchange ratio remains completely flawless. All according to plan!) ",
    " (If I copy this request to clipboard now, L will deduce that I am actively building a West End collection!) ",
    " (What if this trader is an investigator sent by the ICPO? No... my trading alias and email header are completely airtight.) ",
    " (I'll take a VOB master... AND WATCH IT!) "
  ];

  let lightTimer = null;

  // 3. INJECTION & EVENT LOGIC
  function injectWidgets() {
    try {
      // Find the drawer container dynamically
      const drawerContainer = document.querySelector('.trade-drawer') || 
                              document.querySelector('.drawer') || 
                              document.querySelector('#trade-drawer') ||
                              document.querySelector('aside');

      // Inject L Box
      if (drawerContainer && !document.getElementById('lDeductionBox')) {
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

      // Inject Light Box directly to Body so it never breaks drawer scripts
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
            <p class="dn-vn-text" id="lightQuoteText">"(No, no, NO! I can't request 'Death Note: The Musical' right now!)"</p>
          </div>
        `;
        document.body.appendChild(vnBox);
      }
    } catch (err) {
      console.warn("Death Note Reskin setup warning:", err);
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

  // Observer to safely watch for when the drawer opens without breaking page clicks
  const observer = new MutationObserver(() => {
    injectWidgets();
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Safe global click trigger for Light
  document.addEventListener('click', (e) => {
    if (e.target.closest('.open-cart-btn, .cart-btn, .cart-icon, .trade-drawer-toggle, .add-to-trade-btn, [class*="trade"]')) {
      triggerLightMonologue();
    }
  });

})();

(function () {
  'use strict';

  // 1. INJECT RESKIN CSS STYLES
  const reskinStyles = `
    /* Force relative positioning on the main drawer container for absolute anchoring */
    .trade-drawer, .drawer, #trade-drawer, [class*="drawer"] {
      position: relative !important;
    }

    /* L's Placement: Top Right corner inside the Trade Drawer Header */
    .dn-l-header-box {
      position: absolute;
      top: 10px;
      right: 14px;
      display: flex;
      align-items: center;
      gap: 10px;
      z-index: 10000;
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

    /* Bubble Tail pointing right to L */
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

    /* Light's Placement: Docked directly outside the left edge of the Trade Drawer */
    .dn-vn-box {
      position: absolute;
      top: 140px; /* Positions Light right alongside added item cards */
      left: -290px; /* Snaps box outside the left border of the drawer panel */
      width: 270px;
      background: rgba(10, 2, 4, 0.96);
      border: 2px solid #ff0033;
      box-shadow: 0 0 16px rgba(255, 0, 51, 0.4);
      border-radius: 6px;
      padding: 10px;
      opacity: 0;
      pointer-events: none;
      transform: translateX(10px);
      transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
      z-index: 99999;
    }

    .dn-vn-box.active {
      opacity: 1;
      pointer-events: auto;
      transform: translateX(0);
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

    /* Gothic Compressed Profile Frame */
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
    "If you send this email now, expect a response precisely when you go to sleep.",
    "Probability that this Google Drive link is set to 'Restricted': 43.6%. Proceed with caution.",
    "I have cross-referenced your cart with Encora. Everything appears to be in order.",
    "A 4K MP4 file export... Your hard drive space is about to suffer a severe blow.",
    "My sensors detect a 15% drop in sugar levels. Please add a dessert before proceeding.",
    "There is a 99.9% chance this bootleg contains incredible vocals and terrible camera stability.",
    "I've evaluated your trade partner. They are 96.5% likely to be a genuine collector and 3.5% likely to be a ghost.",
    "Calculating response rate... If sent on a Sunday evening, probability of immediate reply increases by 18.4%.",
    "This trade request is 99.8% balanced. I find no structural faults in your selection.",
    "If you do not double-check your link before pasting, my faith in your methodology will drop to 0%.",
    "Deduction complete: This trade is statistically sound. You may dispatch the request."
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
    " (Wait... if I trade for this tracked audio now, will they realize I'm trying to complete my Hadestown set?! Think, Light, THINK!) ",
    " (My trade list is immaculate. Not a single invalid date, broken link, or mislabeled master. L has nothing on me!) ",
    " (Heathers, Beetlejuice, & Juliet... all lined up in my cart. It looks like a normal request, but it's a carefully calculated maneuver!) ",
    " (If I ask for an untracked audio, will they think I'm a novice? No, true collectors appreciate untracked files!) ",
    " (Curse it all! My Mega drive is at 98% capacity! If I accept another 4K video, I'll have to upgrade my cloud storage!) ",
    " (They want a 1:1 video trade? Acceptable. My co-master videos are untouchable anyway.) ",
    " (I must act like a standard collector... Just a quick, polite email. Nothing suspicious.) ",
    " (If L intercepts this trade request, he'll realize I've been hoarding Broadway bootlegs since 2020!) ",
    " (Calm down... It's just a trade request. Sweat on the keyboard will leave DNA evidence!) ",
    " (Should I offer a rare audio or a VOB with menu? What choice would a god of the new world make?!) ",
    " (They haven't updated their Encora list in two weeks... Are they inactive, or are they waiting for me to make a move?!) ",
    " (A replacement link request?! Did my original link expire?! I must generate a fresh one immediately!) ",
    " (If I double-check my list format, there is zero chance they can find a flaw in my request.) ",
    " (Near is watching... I can feel his eyes on my cart items right now!) ",
    " (A 3-way trade offer?! That complicates the calculations... but the payout is too good to pass up!) ",
    " (Once this trade completes, my collection will be one step closer to absolute perfection!) "
  ];

  let lightTimer = null;

  // 3. INJECTION & DOM PLACEMENT LOGIC
  function initReskin() {
    // Find drawer container
    const drawerContainer = document.querySelector('.trade-drawer') 
                           || document.querySelector('.drawer') 
                           || document.querySelector('#trade-drawer') 
                           || document.body;

    // Inject L inside top right header area
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
        <img src="art/L_derpy.webp" alt="L Derpy" class="dn-l-img" id="lDerpyImg" title="Click L to cycle deduction">
      `;
      drawerContainer.appendChild(lContainer);

      document.getElementById('lDerpyImg').addEventListener('click', updateLQuote);
    }

    // Inject Light docked outside the left edge
    if (drawerContainer && !document.getElementById('lightVnBox')) {
      const vnBox = document.createElement('div');
      vnBox.className = 'dn-vn-box';
      vnBox.id = 'lightVnBox';
      vnBox.innerHTML = `
        <div class="dn-vn-header">
          <span class="dn-vn-tag">[ 🍎 LIGHT YAGAMI ]</span>
        </div>
        <div class="dn-vn-content">
          <div class="dn-light-frame">
            <img src="art/light_derpy.webp" alt="Light Panic" class="dn-light-img">
          </div>
          <p class="dn-vn-text" id="lightQuoteText">"(No, no, NO! I can't request 'Death Note: The Musical' right now! It's too obvious!)"</p>
        </div>
      `;
      drawerContainer.appendChild(vnBox);
    }

    setupCartTriggers();
  }

  // 4. TRIGGERS & HELPERS
  function setupCartTriggers() {
    document.addEventListener('click', (e) => {
      const isCartAction = e.target.closest('.open-cart-btn, .cart-btn, .cart-icon, .trade-drawer-toggle, .add-to-trade-btn, .add-to-cart-btn');
      if (isCartAction) {
        triggerLightMonologue();
      }
    });
  }

  function updateLQuote() {
    const randomL = lQuotes[Math.floor(Math.random() * lQuotes.length)];
    const textEl = document.getElementById('lQuoteText');
    const barEl = document.getElementById('lProgressBar');
    
    if (textEl) textEl.innerText = randomL;
    if (barEl) {
      barEl.style.width = '0%';
      setTimeout(() => {
        barEl.style.width = Math.floor(Math.random() * 40 + 60) + '%';
      }, 50);
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

  window.triggerLightMonologue = triggerLightMonologue;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReskin);
  } else {
    initReskin();
  }

})();

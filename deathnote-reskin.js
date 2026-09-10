(function () {
  'use strict';

  // 1. INJECT RESKIN CSS STYLES
  const reskinStyles = `
    /* L's Placement: Top Right in Drawer */
    .dn-l-header-box {
      position: absolute;
      top: 10px;
      right: 15px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;
      z-index: 10000;
      pointer-events: none;
    }

    .dn-l-img, .dn-l-speech-bubble {
      pointer-events: auto;
    }

    /* SCALED UP L IMAGE */
    .dn-l-img {
      width: 120px;
      height: auto;
      cursor: pointer;
      user-select: none;
      flex-shrink: 0;
      transition: transform 0.2s ease, filter 0.2s ease;
    }

    .dn-l-img:hover {
      transform: scale(1.08) rotate(-3deg);
      filter: drop-shadow(0 0 10px #00ff66);
    }

    /* SLIMMER AND LONGER SPEECH BUBBLE */
    .dn-l-speech-bubble {
      background: rgba(10, 10, 10, 0.98);
      border: 2px solid #00ff66;
      color: #00ff66;
      padding: 10px 12px;
      border-radius: 8px;
      width: 210px;
      font-size: 0.85rem;
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
      margin-bottom: 6px;
    }

    .dn-quote-text {
      margin: 0;
      line-height: 1.4;
      min-height: 4em;
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

    /* LIGHT POSITIONED ON BOTTOM-LEFT EDGE */
    .dn-vn-box {
      position: fixed;
      bottom: 20px;
      left: 20px;
      right: auto;
      width: 350px;
      background: rgba(10, 2, 4, 0.98);
      border: 2px solid #ff0033;
      box-shadow: 0 0 20px rgba(255, 0, 51, 0.5);
      border-radius: 8px;
      padding: 14px;
      opacity: 0;
      pointer-events: none;
      transform: translateX(-15px);
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

  // 2. QUOTE LIBRARIES (50 EACH)
  const lQuotes = [
    "Eating sweets during trade negotiations increases deduction processing speed by 40%.",
    "There is a 98.7% chance this trade request gets ignored for 6 days, followed by a sudden 3 AM reply.",
    "My calculations indicate a 100% probability this trader's Mega link will ask for a decryption key.",
    "If you trade for an untracked audio, my sugar processing requirement doubles immediately.",
    "I have analyzed the audio waveform. There is a 94.1% likelihood someone coughed directly into the microphone during Act 1.",
    "Trading 3 Broadway VOBs for 1 West End audio? Mathematically... I respect the desperation.",
    "There is a 72.4% chance this 'rare' audio was recorded on a 2008 Nintendo DS.",
    "If you don't offer cake alongside this VOB, the probability of me accepting drops to absolute zero.",
    "I've deduced that 90% of trade requests sent past midnight contain at least one broken Google Drive link.",
    "By sitting like this, my trading intuition increases by 200%. Try it.",
    "An untracked audio from 2004? Fascinating. But my deductions show the track list is entirely out of order.",
    "Risking a trade for a corrupt zip file? You truly are an idiot, Light.",
    "My deduction skills tell me you've been refreshing this trade list every 15 minutes for 3 days straight.",
    "There is an 88% chance this video master was recorded using a smuggled camcorder hidden inside a coat.",
    "If this audio was recorded with an iPhone 4, my willingness to evaluate it decreases exponentially.",
    "My analysis reveals that 3 out of 4 traders forget to send the decryption key on their first attempt.",
    "A 1:1 trade ratio for an NFT item? Highly suspicious.",
    "I require at least three slices of strawberry shortcake to parse this 50GB VOB folder.",
    "The odds of this Mega folder staying alive for more than 48 hours are less than 12%.",
    "If you sit normally while curating your trade list, your reasoning capabilities drop by half.",
    "I have cross-referenced 400 audio logs. Someone in row 3 definitely unwrapped a candy wrapper during the ballad.",
    "Trading a MP3 file for a lossless FLAC audio? A foolish maneuver.",
    "There is a 99.9% probability that 'limited trade' means 'I will respond in three months'.",
    "My sugar levels are dangerously low. Please finalize this trade offer posthaste.",
    "I suspect the person who recorded this video was sitting directly behind a giant hat.",
    "A trade request without an email subject line? An amateur move.",
    "Analyzing this bootleg's track list... missing Act 2 Finale. Tragic.",
    "The probability of finding an actual HD video from 1998 is practically non-existent.",
    "If you do not hold the tea cup by the rim, you cannot properly verify video metadata.",
    "There is a 64% chance this file was re-encoded four separate times before reaching your drive.",
    "My calculations reveal a 100% chance of emotional damage if this link goes dead during downloading.",
    "A rare Japanese production audio? Interesting... my interest is piqued by 8.4%.",
    "I am currently investigating why people leave their micro-cameras panning toward the ceiling.",
    "The exchange rate for Broadway vs West End audio masters is fluctuating drastically today.",
    "I have identified 14 distinct coughs during 'Dear Evan Hansen'. A fascinating acoustic profile.",
    "If this zip file is password-protected without instructions, I will classify you as Kira.",
    "My sugar intake must match the file size in megabytes for optimal processing.",
    "There is an 81% chance the master left the stage lights slightly washed out.",
    "Do not attempt to bluff me with a YouTube rip masquerading as an original VOB.",
    "I have deduced that you are trading while pretending to pay attention in class.",
    "An audio track recorded entirely from the front orchestra? Highly acceptable.",
    "If the link leads to a 404 error, my disappointment will be measurable in metric tons.",
    "I calculate a 93% chance this trader hasn't updated their master list since 2021.",
    "A double-cast audio recording? A rare variable indeed.",
    "I refuse to review trade requests until my tea is served with precisely three sugar cubes.",
    "The metadata suggests this file was edited at 4:12 AM on a Tuesday. Suspicious.",
    "There is a 50% chance the spotlight operator missed the cue in track 4.",
    "If this is a fake bootleg, my retaliation will be swift and thorough.",
    "I am observing your trade cart selections with great interest.",
    "Final deduction: You need to go to sleep instead of browsing trading lists at 3 AM."
  ];

  const lightQuotes = [
    " (No, no, NO! I can't request 'Death Note: The Musical' right now! It's too obvious! They'll suspect my identity in seconds!) ",
    " (Wait... if I trade 2 audios for 1 video, my exchange ratio remains completely flawless. All according to plan!) ",
    " (If I copy this request to clipboard now, L will deduce that I am actively building a West End collection!) ",
    " (I'll take a VOB master... AND WATCH IT!) ",
    " (If L sees my Mega storage limit hit 99%, he will instantly deduce that I am hoarding 4K bootlegs!) ",
    " (I must act natural... I'll pretend I only collect 2000s Broadway audios so L looks in the wrong direction!) ",
    " (Damn it! If I accept this trade too quickly, L will know I was online waiting for their reply!) ",
    " (I will take this corrupt VOB... repair the container file with ffmpeg... AND RULE THE TRADING COMMUNITY AS GOD OF THE NEW WORLD!) ",
    " (L thinks he's trapped me, but he doesn't know I have a backup Google Drive account already set up!) ",
    " (Just as planned... they sent the Mega link with the decryption key already included in the URL!) ",
    " (I need to acquire this limited audio before L notices it was added to the master list!) ",
    " (If I trade for an untracked audio, L will question my standards! I must hold out for the tracked version!) ",
    " (Curse you, L! How did you know I was downloading Broadway bootlegs during my study hours?!) ",
    " (I'll hide the bootleg files inside a folder labeled 'Honors Organic Chemistry Notes'! He'll never look there!) ",
    " (I'll take a potato chip... AND BACK UP MY ENTIRE TRADING ARCHIVE TO AN EXTERNAL HARD DRIVE!) ",
    " (Foolish traders... thinking they can offer me a compressed MP3 for a lossless FLAC master!) ",
    " (I must construct an airtight email response... one mistake and L will realize I'm the one hoard-trading!) ",
    " (If I request three files at once, it creates a pattern. I must request only one to remain completely unsuspected!) ",
    " (L is watching my bandwidth usage... I can only download 1GB per hour or he'll catch on!) ",
    " (This master list is immaculate... but is it a trap set by L to expose my IP address?!) ",
    " (I will erase all corrupt metadata from this file... and create a new master identity!) ",
    " (They accepted my trade offer in under two minutes?! Could this be... an ambush?!) ",
    " (I must pretend I've never heard of this musical... yes, that will throw off his suspicions completely!) ",
    " (L thinks he can out-trade me? I've been studying exchange ratios since middle school!) ",
    " (If the link expires before I click download, my entire plan collapses!) ",
    " (He's analyzing my typing speed in the chat! I must intentionally type slower to seem casual!) ",
    " (I'll use a burner email address... no, L would expect that. I'll use my official school email!) ",
    " (This audio quality is surprisingly clear... could L have planted a hidden audio watermark?!) ",
    " (I will build the ultimate bootleg archive... and purge all low-quality 240p videos from existence!) ",
    " (He's dangling a rare 1996 workshop demo right in front of me... it's bait, it HAS to be bait!) ",
    " (If I trade for two videos, my storage limit will break... I must sacrifice an audio track!) ",
    " (A dead Mega link... NO! This can't be happening! Not after I waited three days!) ",
    " (L is testing me. He wants to see if I prefer West End or Broadway understudies!) ",
    " (I must copy the link, paste it into an incognito window, AND CLEAR MY BROWSER CACHE IMMEDIATELY!) ",
    " (Everything is going smoothly... too smoothly. What is L planning?) ",
    " (I'll offer them an out-of-print program scan as a gift... it will establish trust without giving away secrets!) ",
    " (They think I'm trading for personal enjoyment... little do they know I'm index-mapping the entire collector market!) ",
    " (A password-protected zip file?! Did L set this lock himself?!) ",
    " (I will not fall for his tactics. I will wait exactly 48 hours before replying to this trade confirmation!) ",
    " (This video has minor spotlight washout... acceptable, but I must act displeased to maintain my cover!) ",
    " (L is sitting there eating cake... while I am conducting high-stakes digital asset exchanges!) ",
    " (If I leak this audio, the entire trading ecosystem will turn against me. I must remain silent!) ",
    " (My trade ratio is flawless. Not even L can find a single discrepancy in my transaction history!) ",
    " (He's checking my online status... quick, switch the status indicator to 'Offline'!) ",
    " (A 1:1 ratio for a rare master? They don't know the true value of what they hold... perfect!) ",
    " (I'll save the link to a secondary flash drive and hide it inside a hollowed-out dictionary!) ",
    " (L thinks he's the only one who can analyze audio waveforms... I'll show him true precision!) ",
    " (One more successful exchange and my collection will be complete! Victory is within my grasp!) ",
    " (I can't let my emotions get the better of me... it's just a 1080p remaster... STAY CALM!) ",
    " (I will become the God of Musical Theatre Trading!) "
  ];

  let lightTimer = null;

  // 3. INJECTION & LOGIC
  function injectWidgets() {
    const drawerContainer = document.querySelector('#cart-drawer') || 
                            document.querySelector('.cart-drawer') || 
                            document.querySelector('.trade-drawer') || 
                            document.querySelector('.drawer');

    if (drawerContainer) {
      if (!document.getElementById('lDeductionBox')) {
        const lContainer = document.createElement('div');
        lContainer.className = 'dn-l-header-box';
        lContainer.id = 'lDeductionBox';
        lContainer.innerHTML = `
          <div class="dn-l-speech-bubble">
            <span class="dn-tag">🍰 L'S DEDUCTION</span>
            <p class="dn-quote-text" id="lQuoteText">If I don't get another scoop of vanilla ice cream, I will intentionally misalign your cart items.</p>
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
          <p class="dn-vn-text" id="lightQuoteText">"(WAIT... IF I TRADE 2 AUDIOS FOR 1 VIDEO, MY EXCHANGE RATIO REMAINS COMPLETELY FLAWLESS! ALL ACCORDING TO PLAN!)"</p>
        </div>
      `;
      document.body.appendChild(vnBox);
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
    if (e.target.closest('#cart-toggle-btn, .cart-toggle-btn, .open-cart-btn, .cart-btn')) {
      triggerLightMonologue();
    }
  });

})();

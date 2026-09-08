/* ==========================================================================
   DEATH NOTE RESKIN — COMPLETE DYNAMIC SCRIPT & INTERACTIVE TRAPS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DYNAMIC CARD LABEL HIGHLIGHT OBSERVER
  const labelObserver = new MutationObserver(() => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    if (activeTheme === 'death-note') {
      document.querySelectorAll('.card p, .bootleg-card p, .item-card div').forEach(p => {
        if (p.innerHTML.includes('CAST:') && !p.innerHTML.includes('infernal-label-cast')) {
          p.innerHTML = p.innerHTML.replace('CAST:', '<span class="infernal-label-cast">CAST:</span>');
        }
        if (p.innerHTML.includes('MASTER NOTES:') && !p.innerHTML.includes('infernal-label-notes')) {
          p.innerHTML = p.innerHTML.replace('MASTER NOTES:', '<span class="infernal-label-notes">MASTER NOTES:</span>');
        }
        if (p.innerHTML.includes('TRADING NOTES:') && !p.innerHTML.includes('infernal-label-notes')) {
          p.innerHTML = p.innerHTML.replace('TRADING NOTES:', '<span class="infernal-label-notes">TRADING NOTES:</span>');
        }
      });
    }
  });

  labelObserver.observe(document.body, { childList: true, subtree: true });

  // 2. INITIALIZE ADVANCED DEATH NOTE FEATURES
  setupDeathNoteFeatures();
});

function setupDeathNoteFeatures() {
  const isDeathNote = () => document.documentElement.getAttribute('data-theme') === 'death-note';

  // INJECT THE LIND L. TAILOR BAIT CARD
  const injectBaitCard = () => {
    if (!isDeathNote() || document.getElementById('lind-l-tailor-card')) return;
    
    // Find grid or card list container dynamically
    const container = document.getElementById('card-container') || 
                      document.querySelector('.card-grid') || 
                      document.querySelector('.items-list') || 
                      document.body;

    const bait = document.createElement('div');
    bait.id = 'lind-l-tailor-card';
    bait.className = 'item-card card-standard lind-tailor-card';
    bait.innerHTML = `
      <div class="card-header">
        <div class="card-title">Lind L. Tailor — Live Broadcast (2006)</div>
        <div class="card-badges"><span class="badge badge-format">4K MASTER [50 GB]</span></div>
      </div>
      <div class="card-meta">📅 Aug 28, 2006 | 📍 Kanto District, Japan</div>
      <div class="card-cast"><strong>CAST:</strong> Lind L. Tailor (L's Decoy)</div>
      <div class="card-notes"><strong>MASTER NOTES:</strong> Exclusive worldwide live feed. Ultra rare transmission source.</div>
      <div class="card-actions">
        <button type="button" id="bait-add-btn" class="add-cart-btn">+ Add to Trade</button>
      </div>
    `;

    if (container !== document.body) {
      container.prepend(bait);
    } else {
      document.body.appendChild(bait);
    }

    document.getElementById('bait-add-btn')?.addEventListener('click', triggerLTrap);
  };

  // TRAP TRIGGER (LIND L. TAILOR EXECUTION)
  function triggerLTrap() {
    const baitCard = document.getElementById('lind-l-tailor-card');
    
    // Low sinister chime sound
    playSinisterChime();

    // Card turns to ash / vanishes
    if (baitCard) {
      baitCard.style.transition = 'all 0.8s ease';
      baitCard.style.opacity = '0';
      baitCard.style.transform = 'scale(0.8) rotate(5deg)';
      setTimeout(() => baitCard.remove(), 800);
    }

    // Full Screen Trap Warning Banner
    const banner = document.createElement('div');
    banner.className = 'kira-trap-banner';
    banner.innerHTML = `
      <div class="kira-banner-content">
        <h1>THAT WAS A TRAP, KIRA.</h1>
        <p>L HAS TRACED YOUR IP REGION TO THE KANTO DISTRICT OF JAPAN.</p>
        <button id="close-kira-banner">ACCEPT JUDGEMENT</button>
      </div>
    `;
    document.body.appendChild(banner);

    document.getElementById('close-kira-banner').onclick = () => banner.remove();
  }

  // SHINIGAMI EYES CONTRACT BUTTON
  const injectEyeButton = () => {
    if (document.getElementById('shinigami-eyes-btn')) return;
    const header = document.querySelector('header') || document.body;
    
    const eyeBtn = document.createElement('button');
    eyeBtn.id = 'shinigami-eyes-btn';
    eyeBtn.className = 'shinigami-btn';
    eyeBtn.innerText = '👁️ Trade Half Your Life for Shinigami Eyes';
    header.appendChild(eyeBtn);

    eyeBtn.addEventListener('click', () => {
      document.body.classList.toggle('shinigami-eyes-active');
      const active = document.body.classList.contains('shinigami-eyes-active');
      eyeBtn.innerText = active ? '👁️ Shinigami Eyes Active' : '👁️ Trade Half Your Life for Shinigami Eyes';
    });
  };

  // 40-SECOND KIRA COUNTDOWN & OMINOUS WebAudio FLATLINE
  document.addEventListener('click', (e) => {
    // Detect clicks on global floating trade button or individual card buttons
    const tradeTrigger = e.target.closest('#trade-request-btn, .floating-trade-btn, [class*="trade"], .add-cart-btn, button');
    
    if (tradeTrigger && !document.getElementById('death-note-timer-box') && isDeathNote()) {
      
      // Floating Timer Box fixed over bottom right UI
      const timerBox = document.createElement('div');
      timerBox.id = 'death-note-timer-box';
      timerBox.className = 'death-timer-box';
      timerBox.innerHTML = `
        <span class="timer-label">KIRA HEART RATE:</span>
        <span id="death-timer-count">40s</span>
      `;
      document.body.appendChild(timerBox);

      let timeLeft = 40;
      const countDisplay = document.getElementById('death-timer-count');

      const interval = setInterval(() => {
        timeLeft--;
        if (countDisplay) countDisplay.innerText = `${timeLeft}s`;

      if (timeLeft <= 0) {
          clearInterval(interval);
          if (timerBox) {
            timerBox.classList.add('flatlined');
            timerBox.innerHTML = `<span class="timer-label">STATUS:</span> <span class="flatline-text">💀 FLATLINE</span>`;
          }

          // 1. Synthesize flatline audio tone
          playFlatlineTone();

          // 2. Trigger 2-second Full Screen Blackout
          triggerBlackout();
        }
      }, 1000);
    }
  });

  // AUDIO SYNTHESIZERS (NO CHEERY AUDIO CLIPS)
  function playFlatlineTone() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(380, audioCtx.currentTime); // Low eerie flatline
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 3.0);
    } catch (err) {
      console.log('Audio Context blocked or unsupported', err);
    }
  }

  function playSinisterChime() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(120, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 1.2);
    } catch (err) {}
  }
   // Triggers a 2-second screen blackout on flatline
  function triggerBlackout() {
    const blackout = document.createElement('div');
    blackout.className = 'kira-blackout-screen';
    document.body.appendChild(blackout);

    // Remove the blackout after exactly 2 seconds
    setTimeout(() => {
      blackout.remove();
    }, 2000);
  }

  // Watch for dynamic theme updates
  const themeObserver = new MutationObserver(() => {
    if (isDeathNote()) {
      injectBaitCard();
      injectEyeButton();
    }
  });

  themeObserver.observe(document.body, { childList: true, subtree: true });
  if (isDeathNote()) {
    injectBaitCard();
    injectEyeButton();
  }
}

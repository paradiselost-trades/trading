/* ==========================================================================
   DEATH NOTE RESKIN — DYNAMIC SCRIPT & INTERACTIVE TRAPS (UPDATED)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DYNAMIC CARD LABEL HIGHLIGHT OBSERVER
  const labelObserver = new MutationObserver(() => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    if (activeTheme === 'death-note') {
      document.querySelectorAll('.card p, .bootleg-card p, .item-card div, .card-cast, .card-notes').forEach(p => {
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

  // SAFE MODE TOGGLE BUTTON
  const injectSafeModeButton = () => {
    if (document.getElementById('dn-safe-mode-btn')) return;
    const header = document.querySelector('header') || document.body;

    const safeBtn = document.createElement('button');
    safeBtn.id = 'dn-safe-mode-btn';
    safeBtn.style.cssText = 'margin: 5px; padding: 6px 12px; background: #222; color: #fff; border: 1px solid #666; cursor: pointer; font-size: 0.85rem;';
    safeBtn.innerText = '🛡️ Safe Mode: OFF';
    header.appendChild(safeBtn);

    safeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dn-safe-mode');
      const active = document.body.classList.contains('dn-safe-mode');
      safeBtn.innerText = active ? '🛡️ Safe Mode: ON' : '🛡️ Safe Mode: OFF';
    });
  };

  // INJECT THE LIND L. TAILOR BAIT CARD
  const injectBaitCard = () => {
    if (!isDeathNote() || document.getElementById('lind-l-tailor-card')) return;

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
    
    playSinisterChime();

    if (baitCard) {
      baitCard.style.transition = 'all 0.8s ease';
      baitCard.style.opacity = '0';
      baitCard.style.transform = 'scale(0.8)';
      setTimeout(() => baitCard.remove(), 800);
    }

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
    eyeBtn.style.cssText = 'margin: 5px; padding: 6px 12px; background: #8b0000; color: #fff; border: 1px solid #ff0000; cursor: pointer; font-size: 0.85rem;';
    eyeBtn.innerText = '👁️ Trade Half Your Life for Shinigami Eyes';
    header.appendChild(eyeBtn);

    eyeBtn.addEventListener('click', () => {
      document.body.classList.toggle('shinigami-eyes-active');
      const active = document.body.classList.contains('shinigami-eyes-active');
      eyeBtn.innerText = active ? '👁️ Shinigami Eyes Active' : '👁️ Trade Half Your Life for Shinigami Eyes';
    });
  };

  // 40-SECOND COUNTDOWN (UPDATED: RESTRICTED TO LIND L. TAILOR & TRADE REQUESTS)
  document.addEventListener('click', (e) => {
    // Only trigger for Lind L. Tailor bait button or global trade drawer toggles
    const tradeTrigger = e.target.closest('#bait-add-btn, #trade-request-btn, .floating-trade-btn');
    
    if (tradeTrigger && !document.getElementById('death-note-timer-box') && isDeathNote()) {
      const timerBox = document.createElement('div');
      timerBox.id = 'death-note-timer-box';
      timerBox.innerHTML = `
        <span class="timer-label">TIME LEFT:</span>
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

          playFlatlineTone();
          triggerBlackout();
        }
      }, 1000);
    }
  });

  // AUDIO SYNTHESIZERS
  function playFlatlineTone() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(380, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 2.5);
    } catch (err) {}
  }

  function playSinisterChime() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(120, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 1.0);
    } catch (err) {}
  }

  function triggerBlackout() {
    const blackout = document.createElement('div');
    blackout.className = 'kira-blackout-screen';
    document.body.appendChild(blackout);

    setTimeout(() => {
      blackout.remove();
    }, 2000);
  }

  // WATCH FOR THEME ACTIVATION
  const themeObserver = new MutationObserver(() => {
    if (isDeathNote()) {
      injectBaitCard();
      injectEyeButton();
      injectSafeModeButton();
    }
  });

  themeObserver.observe(document.body, { childList: true, subtree: true });
  if (isDeathNote()) {
    injectBaitCard();
    injectEyeButton();
    injectSafeModeButton();
  }
}

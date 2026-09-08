/* ==========================================================================
   DEATH NOTE RESKIN — DYNAMIC CARD SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const observer = new MutationObserver(() => {
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

  observer.observe(document.body, { childList: true, subtree: true });
});
/* ==========================================================================
   DEATH NOTE RESKIN — ADVANCED INTERACTIVE TRAPS & SHINIGAMI EYES
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  setupDeathNoteFeatures();
});

function setupDeathNoteFeatures() {
  const isDeathNote = () => document.documentElement.getAttribute('data-theme') === 'death-note';

  // 1. INJECT THE LIND L. TAILOR BAIT CARD
  const injectBaitCard = () => {
    if (!isDeathNote() || document.getElementById('lind-l-tailor-card')) return;
    const container = document.getElementById('card-container');
    if (!container) return;

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
    container.prepend(bait);

    document.getElementById('bait-add-btn')?.addEventListener('click', triggerLTrap);
  };

  // 2. TRAP TRIGGER (LIND L. TAILOR EXECUTION)
  function triggerLTrap() {
    const baitCard = document.getElementById('lind-l-tailor-card');
    
    // Play dramatic audio/chime if available
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2874/2874-preview.mp3');
    audio.play().catch(() => {});

    // Card turns to ash / vanishes
    if (baitCard) {
      baitCard.style.transition = 'all 0.8s ease';
      baitCard.style.opacity = '0';
      baitCard.style.transform = 'scale(0.8) rotate(5deg)';
      setTimeout(() => baitCard.remove(), 800);
    }

    // Full Screen Banner
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

  // 3. SHINIGAMI EYES CONTRACT
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

  // 4. 40-SECOND KIRA COUNTDOWN & FLATLINE TIMER
  document.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.add-cart-btn');
    if (addBtn && !addBtn.dataset.hasTimer && isDeathNote()) {
      addBtn.dataset.hasTimer = "true";
      let timeLeft = 40;
      
      const timerSpan = document.createElement('span');
      timerSpan.className = 'death-timer';
      timerSpan.innerText = ` [⏱️ ${timeLeft}s]`;
      addBtn.appendChild(timerSpan);

      const interval = setInterval(() => {
        timeLeft--;
        timerSpan.innerText = ` [⏱️ ${timeLeft}s]`;
        
        if (timeLeft <= 0) {
          clearInterval(interval);
          timerSpan.innerText = ' [💀 FLATLINE]';
          // Play flatline sound
          const flatline = new Audio('https://assets.mixkit.co/active_storage/sfx/951/951-preview.mp3');
          flatline.play().catch(() => {});
          
          // Glitch UI effect
          document.body.classList.add('heart-flatline-glitch');
          setTimeout(() => document.body.classList.remove('heart-flatline-glitch'), 1500);
        }
      }, 1000);
    }
  });

  // Watch for theme switches
  const observer = new MutationObserver(() => {
    if (isDeathNote()) {
      injectBaitCard();
      injectEyeButton();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
  if (isDeathNote()) {
    injectBaitCard();
    injectEyeButton();
  }
}

/* ==========================================================================
   DEATH NOTE RESKIN — DYNAMIC SCRIPT & INTERACTIVE TRAPS
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

  // AUDIO PLAYBACK HELPERS WITH EXPLICIT EXTENSIONS
  function playMisaTheme() {
    const audio = new Audio('halloween/misa_theme.mp3');
    audio.volume = 0.5;
    audio.play().catch(e => console.log('Audio playback prevented:', e));
  }

  function playPotatoChipSound() {
    const audio = new Audio('halloween/potato_chip.mp3');
    audio.volume = 0.7;
    audio.play().catch(e => console.log('Audio playback prevented:', e));
  }

  // TOGGLE CARD NAME BASED ON SHINIGAMI EYE MODE
  function updateTailorCardName() {
    const tailorHeader = document.querySelector('.lind-tailor-card .card-title, #lind-l-tailor-card .card-title, .broadcast-card h3');
    const isShinigamiActive = document.body.classList.contains('shinigami-eyes-active');

    if (tailorHeader) {
      if (isShinigamiActive) {
        tailorHeader.textContent = 'L Lawliet — Live Broadcast (2006)';
      } else {
        tailorHeader.textContent = 'Lind L. Tailor — Live Broadcast (2006)';
      }
    }
  }

  // MISA AMANE POP-UP FOR SHINIGAMI EYES CONTRACT
  function showMisaPopup() {
    document.getElementById('misa-pop-overlay')?.remove();

    const overlay = document.createElement('div');
    overlay.id = 'misa-pop-overlay';
    overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.85); z-index: 9999999; display: flex; align-items: center; justify-content: center;';

    overlay.innerHTML = `
      <div class="misa-modal-content" style="background: #111; border: 2px solid #8b0000; padding: 25px; text-align: center; color: #fff; max-width: 400px; width: 90%; box-shadow: 0 0 25px #ff0000; box-sizing: border-box;">
        <img src="halloween/MISA AMANE.png" alt="Misa Amane" style="max-width: 180px; height: auto; display: block; margin: 0 auto 15px auto; border: 1px solid #333;" />
        <h2 style="color: #ff3333; margin: 0 0 10px 0; font-size: 1.2rem;">SHINIGAMI EYES CONTRACT MADE!</h2>
        <p style="font-size: 0.9rem; color: #ccc; margin-bottom: 20px;">You have traded half of your remaining life span.</p>
        <button id="close-misa-popup" type="button" style="background: #8b0000; color: #fff; border: none; padding: 8px 16px; cursor: pointer; font-weight: bold;">CLOSE</button>
      </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById('close-misa-popup')?.addEventListener('click', (e) => {
      e.stopPropagation();
      overlay.remove();
    });
  }

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
    if (document.getElementById('lind-l-tailor-card')) return;

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

    // ENSURE CORRECT TITLE UPON CARD INJECTION
    updateTailorCardName();
  };

  // POP-UP RENDER ENGINE (KIRA TRAP BANNER)
  function showKiraBanner() {
    document.getElementById('kira-trap-overlay')?.remove();

    const banner = document.createElement('div');
    banner.id = 'kira-trap-overlay';
    banner.style.cssText = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.92); z-index: 9999999; display: flex; align-items: center; justify-content: center; text-align: center; color: white;';

    banner.innerHTML = `
      <div class="kira-banner-content" style="max-width: 500px; width: 90%; padding: 20px; background: #111; border: 2px solid #8b0000; box-shadow: 0 0 20px #ff0000; box-sizing: border-box;">
        <h1 style="color: #ff3333; margin-top: 0; font-size: 1.5rem;">THAT WAS A TRAP, KIRA.</h1>
        <p style="font-family: monospace; font-size: 0.9rem;">L HAS TRACED YOUR IP REGION TO THE KANTO DISTRICT OF JAPAN.</p>
        <div style="margin-top: 20px;">
          <button id="chip-trap-btn" type="button" style="margin: 5px; background: #d97706; color: #fff; padding: 8px 12px; border: none; cursor: pointer; font-weight: bold;">🥔 TAKE A POTATO CHIP AND EAT IT</button>
          <button id="close-kira-banner" type="button" style="margin: 5px; background: #333; color: #fff; padding: 8px 12px; border: 1px solid #666; cursor: pointer;">ACCEPT JUDGEMENT</button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);
    document.body.style.overflow = 'hidden';

    document.getElementById('chip-trap-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      playPotatoChipSound();
    });

    document.getElementById('close-kira-banner')?.addEventListener('click', (e) => {
      e.stopPropagation();
      banner.remove();
      document.body.style.overflow = '';
    });
  }

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

    showKiraBanner();
  }

  // INITIALIZE / START TIMER BOX
  function startDeathTimer() {
    if (document.getElementById('death-note-timer-box')) return;

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

  // GLOBAL EVENT DELEGATION FOR CLICK HANDLERS
  document.addEventListener('click', (e) => {
    // 1. Trap Card Trigger
    if (e.target && e.target.id === 'bait-add-btn') {
      e.preventDefault();
      e.stopPropagation();
      triggerLTrap();
      return;
    }

    // 2. 40-Second Timer Trigger on Trade Buttons
    const tradeTrigger = e.target.closest('#trade-request-btn, .floating-trade-btn, .add-cart-btn');
    if (tradeTrigger) {
      startDeathTimer();
    }
  });

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

    eyeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      document.body.classList.toggle('shinigami-eyes-active');
      const active = document.body.classList.contains('shinigami-eyes-active');
      eyeBtn.innerText = active ? '👁️ Shinigami Eyes Active' : '👁️ Trade Half Your Life for Shinigami Eyes';
      
      // DYNAMICALLY UPDATE THE BAIT CARD TITLE
      updateTailorCardName();

      if (active) {
        playMisaTheme();
        showMisaPopup();
      } else {
        document.getElementById('misa-pop-overlay')?.remove();
      }
    });
  };

  // DYNAMIC 111 DEATH NOTE RULE ROTATOR
  const setupRuleRotator = () => {
    if (document.getElementById('dn-rule-ticker')) return;

    document.querySelectorAll('h2, div, p').forEach(el => {
      if (el.children.length === 0 && el.innerText?.trim() === 'RULEBOOK INSTRUCTIONS') {
        el.style.display = 'none';
      }
    });

    const realRules = [
      "The human whose name is written in this note shall die.",
      "This note will not take effect unless the writer has the subject's face in mind when writing his/her name. This is to prevent people who share the same name from being affected.",
      "The Death Note will not ever affect a victim whose name has been misspelled four times.",
      "When the same name is written in two or more Death Notes, the Note which was used first will take effect, regardless of the time of death.",
      "If the same name is written in two or more Death Notes within 0.06 seconds, the entry is regarded as simultaneous; the Death Notes will not take effect and the individual will not die.",
      "If a Death Note owner accidentally misspells a person's name four times, that person will be free from being killed by the Death Note. However, if the Death Note owner intentionally misspells the name four times, the owner will die.",
      "The Death Note will not take effect if a victim's name is written on several different pages. However, the front and back of a page is considered to be one page. For example, the Death Note will still take effect if the victim's last name is written on the front page and first name on the back.",
      "If the cause of death is written within 40 seconds of the subject's name, it will happen.",
      "If the cause of death is not specified, the subject will die of a heart attack.",
      "After writing the cause of death, the details of death should be entered within the next six minutes and 40 seconds.",
      "If the time of death is specified within 40 seconds after writing the cause of death as a heart attack, the time of death can be manipulated and can go into effect within 40 seconds after writing the name.",
      "The conditions of death will not be realized unless they are physically possible for that human or could be reasonably assumed to be carried out by that human.",
      "Since the limitations applying to the conditions of a death are unknown to the Shinigami, Death Note owners must find out on their own.",
      "You may write the cause and/or details of death prior to filling in the name of the individual. Be sure to insert the name in front of the cause of death. You have about 19 days (according to the human calendar) to fill in a name.",
      "Suicide is a universally valid cause of death as all humans are thought to possess the potential to commit suicide. It is, therefore, something that may be reasonably assumed of an individual.",
      "Whether the cause of the individual's death is either suicide or an accident, if it would lead to the death of more than the intended victim, the person will simply die of a heart attack. This is to ensure that other lives are not impacted.",
      "After an individual's name, time of death, and conditions of death are entered in the notebook, the time and conditions of death may be altered as many times as desired as long as they are changed within six minutes and 40 seconds from the time they are filled in. But, of course, this is only possible before the victim dies.",
      "If you write \"dies of accident\" for the cause of death, the victim will die from a natural accident six minutes and 40 seconds after the time of entry.",
      "Even if only one name is written in the Death Note, if the victim's death causes other humans that are not written in it to die, the cause of death will default to a heart attack.",
      "If you write \"die from disease\" and specify which disease and the time of death, there must be a sufficient amount of time for the disease to progress. If the set time is too tight, the victim will die of a heart attack six minutes and 40 seconds after the entry in the Death Note.",
      "If you write, \"dies from disease\" as the cause of death but specify only a time of death and not the actual disease, the victim will die from a plausible disease.",
      "The Death Note can only operate within a 23-day window (in the human calendar). This is called the 23-Day rule.",
      "If you write \"dies from disease\" and specify which disease but not a time of death, if the progression of the disease takes more than 24 days, the 23-Day rules will not take effect and the human will die at an appropriate time depending on the disease. However, rewriting the cause and/or details of death must be done within six minutes and 40 seconds: you cannot change the victim's time of death, however soon it may be.",
      "In order for the Death Note to take effect the victim's name must be written on one page; however, the cause and conditions of death may be entered on other pages. This will work as long as the person who writes in the Death Note keeps the specific victim's name in mind when writing the cause and conditions of death.",
      "If the cause and conditions of death are written in before the victim's name is, multiple names can be written as long as they are entered within 40 seconds and the cause and conditions of death are not impossible. In the event that the cause of death is possible but the conditions are not, only the cause of death will take effect for that victim. If both the cause and the conditions are impossible, that victim will die of a heart attack.",
      "When you write multiple names in the Death Note and then write down one cause of death within 40 seconds of writing the first victim's name, the cause will take effect for all the written names. Also, after writing the cause of death, even if the conditions of death are written within six minutes and 40 seconds in the human world, the conditions will apply only to the victims for whom they are possible. Those for whom the conditions are not possible will simple die from the specified cause.",
      "A human death caused by the Death Note can indirectly lengthen another human's original life span in the human world even without the owner's specific intention to do so.",
      "Once the victim's name, cause of death, and conditions of death have been written down in the Death Note, the death will take place even if that Death Note, or the part of the note used, is destroyed before the stated time of death.",
      "If the victim's name has been entered and the Death Note is destroyed while the cause of death is being written, the victim will be killed by a heart attack 40 seconds after the name was entered. If the victim's name and cause of death have already been written, then the victim will be killed within six minutes and 40 seconds via the stated cause of death if it is possible within that period of time. Otherwise, the victim will die by heart attack.",
      "If you wish to change anything written in the Death Note within six minutes and 40 seconds after you wrote it, you must first rule out the characters you want to erase with two straight lines. The time and conditions of death can be changed, but once the victim's name has been written, that individual's death can never be averted.",
      "It is useless to try to erase names written in the Death Note with erasers or to white them out.",
      "Even if a new victim's name, cause of death, or conditions of death are written on top of the original victim's name, cause of death, or conditions of death, there will be no effect on the original victim's death. The same thing will also apply to erasing what was written with a pencil, or whiting out what was written with a pen.",
      "The Death Note will not affect those less than 780 days old.",
      "You cannot kill humans who are more than 124 years of age with the Death Note.",
      "You cannot kill humans with less than 12 minutes of life left (in human calculations).",
      "You cannot set a death date longer than the victim's original life span. Even if the victim's death is entered in the Death Note, if it is beyond his or her original life span, the victim will die before the set time.",
      "The human who uses this note can go neither to Heaven nor to Hell.",
      "One page taken from the Death Note, or even a fragment of the page, possesses the full power of the note.",
      "Any writing instrument or medium (cosmetics, blood, etc.) may be used, as long as it can write directly onto the note and create legible text.",
      "The pages of the Death Note will never run out.",
      "Some limited number of Death Notes have white or red front covers, but this makes no different in their effectiveness as compared with the black Death Notes.",
      "This note shall become the property of the human world once it touches ground in the human world.",
      "The owner of a Death Note can recognize the image and voice of the original owner - a Shinigami, for example.",
      "The human who touches the Death Note can recognize the image and voice of its Shinigami owner, even if the human is not the owner of the note.",
      "Whenever a Shinigami in the human world dies and leaves behind its Death Note, the note's finder automatically becomes the owner. However, in this case, only a human who can see and hear that Shinigami is able to see and touch the Death Note. It is very unlikely, but if by any chance another Shinigami picks up the Death Note, that Shinigami becomes the owner.",
      "If you lose the Death Note or have it stolen, you will lose its ownership unless you can retrieve it within 490 days.",
      "When the owner of the Death Note dies while the note is on loan, its ownership will be transferred to the person who is holding it at that time. If the Death Note is stolen and the owner is killed by the thief, its ownership will automatically be transferred to the thief.",
      "The individuals who lose ownership of a Death Note will also lose their memories of it. However, this does not mean that they will lose all memories from the period of ownership: they will only lose the memories involving the Death Note.",
      "When an individual with ownership of more than two Death Notes loses possession of one of them, he will no longer be able to recognize or hear that Death Note's Shinigami anymore. The Shinigami will leave, but all the memories involving the Death Note will remain to the owner as long as he maintains ownership of at least one other Death Note.",
      "If a person loses possession of a Death Note he will not recognize its Shinigami by sight or voice anymore. However, if the owner lets someone else touch that Death Note, from that time on that person will continue to recognize the Shinigami's appearance and voice until he or she actually becomes the owner of the Death Note and subsequently loses possession of it.",
      "When regaining ownership of a Death Note, the memories associated with it will also return. In cases where the owner was involved with other Death Notes as well, memories of all the Death Notes involved will return. The memories will return just by touching the Death Note, even without obtaining ownership of it.",
      "Memories related to a Death Note are lost when its ownership is lost. But they may be regained by either obtaining ownership once again or by touching the Death Note. This can be done up to six times per Death Note. Any times more than that, the person's memory of the Death Note will not return and they will have to use it without any previous memory of it.",
      "Even if you do not actually possess the Death Note, you may still use it to full effect.",
      "You may lend the Death Note to another person while maintaining its ownership. The borrower may lend it to yet another person as well.",
      "The person who borrows the Death Note will not be followed by a Shinigami. The Shinigami always remains with the owner of the Death Note. Also, the borrower cannot trade for the Shinigami Eyes.",
      "Only by touching each other's Death Notes can owners recognize the appearance or voice of each other's Shinigami.",
      "Losing memory of the Death Note by passing the ownership to another or by abandoning ownership will only occur when someone is actually killed using that Death Note. You will not lose memory of the Death Note if, for example, you merely owned it and did not write down anyone's name. In this case, you will not be able to hear or see the Shinigami anymore. You will also lose the power of the Shinigami Eyes if you made the trade.",
      "Someone possessing more than one Death Note may write down a victim's name in one of the Death Notes and the cause of death in the other, and the death will still occur. The order of writing, however, is unimportant: if you write down the cause of death in one Death Note and afterward write the name in the other, the death will occur. This can be accomplished by two Death Note owners working together. In this case, it's necessary that the two touch each other's Death Notes.",
      "Only six Death Notes are allowed to exist at a time in the human world. Of course, the Death Notes that the Shinigami own do not count. This means only six Shinigami that have passed on their Death Notes to humans can be in the human world at once.",
      "One Shinigami is allowed to pass on Death Notes to only three humans at a time. However, it is possible for a single Shinigami to hand out up to six Death Notes - by handing three humans two Death Notes each, for example. In other words, one human could potentially own all six Death Notes.",
      "If a seventh Death Note is given to a human when six already exist in the human world, nothing will happen when it is used.",
      "In the event that there are more than six Death Notes in the human world, only the first six Death Notes that have been delivered to humans will have effect. The seventh Death Note will not become active until one of the other six Death Notes is destroyed or a Shinigami takes one of them back to the Shinigami realm.",
      "A human who becomes the owner of a Death Note can, in exchange for half of his or her remaining life, acquire the power of the Shinigami Eyes, which will enable him or her to see a human's name and remaining life span when looking at them.",
      "An individual with Shinigami Eyes can see the name and life span of another human by looking at that person's face. By gaining ownership of a Death Note, an individual not only gains the ability to kill but also cannot be killed by a Death Note. From this point on, a person with a Death Note cannot see the life span of other Death Note owners, including him- or herself.",
      "In order to see the names and life spans of humans using the power of the Shinigami Eyes, the owner must be able to see more than half of that person's face. When looking from top to bottom, he must be able to see at least from the head to the nose. If he looks at only the eyes and under, he will not be able to see the person's name and life span. Also, even though some parts of the face - for example the eyes, nose or mouth - are hidden, if he can basically see the whole face he will be able to see the person's name and life span.",
      "It is still not clear how much exposure is needed to see a name and life span (more research needs to be done). If the above conditions are met, names and life spans can be seen using photos and digital images, no matter how old they are. But this is sometimes affected by the resolution and size of the image. Also, names and life spans cannot be seen using drawings, however realistic they may be.",
      "Those with Shinigami Eyes will have eyesight of over 3.6 in the human measurement, regardless of their original eyesight.",
      "If you have traded for the Shinigami Eyes, you will see a person's primary life span in the human world.",
      "The names you will see with the Shinigami Eyes are the names needed to kill that person. You will be able to see a name even if it isn't officially registered anywhere.",
      "Humans who have traded for Shinigami Eyes cannot see the names or life spans of humans who have already passed away (by looking at photos of them, for example).",
      "The use of the Death Note in the human world sometimes affects other humans' lives or shortens their original life spans, even if their names are not actually written in the notebook itself. In these cases, no matter the cause, the Shinigami sees only the original life span and not the shortened life span.",
      "No matter what medical or scientific method is employed, it is impossible for humans to distinguish whether or not a human has Shinigami Eyes. Even Shinigami cannot distinguish this fact, except for the very Shinigami that traded his or her eye power with that human.",
      "The human owner of a Death Note is possessed by its original Shinigami owner until he or she dies.",
      "If a human uses a Death Note, its Shinigami owner must appear in front of the human within 39 days after he or she uses the note.",
      "The original Shinigami owners of Death Notes don't, in principle, do anything to help or prevent the deaths brought about by the notes.",
      "A Shinigami has no obligation to completely explain how to use the note or the rules that apply to the human who owns it.",
      "The Shinigami must not tell humans the names or life spans of individuals he sees. This is to avoid confusion in the human world.",
      "A Shinigami bringing a Death Note into the human world must make sure that a human uses it. Although it is unlikely that a Shinigami who has possessed a human would die, if it does happen, the Death Note brought into the human world will not lose its power.",
      "Shinigami must not stay in the human world without a particular reason. Acceptable reasons to stay in the human world are as follows: I. When the Shinigami's Death Note is handed to a human. II. Finding a human to take possession of a Death Note should be done from the Shinigami realm, but if it is within 82 hours this may also be done in the human world. III. When a Shinigami stalks an individual with an intention to kill them, as long as it is within 82 hours of possessing them the Shinigami may stay in the human world.",
      "The Shinigami must not hand the Death Note directly to a child under six years of age (based on the human calendar). But Death Notes that have been dropped into the human world, and are part of the human world, can be used upon humans of almost any age with the same effect.",
      "The owner of a Death Note cannot be killed by a Shinigami who is in the Shinigami realm. Also, a Shinigami who comes to the human world with the objective of killing the owner of a Death Note will not be able to do so. Only a Shinigami that has passed on its Death Note to a human is able to kill the owner of the Death Note.",
      "If a Death Note is owned in the human world against a Shinigami's will, that Shinigami is permitted to stay in the human world in order to retrieve it. In that case, if there are other Death Notes in the human world, the Shinigami are not allowed to reveal to the humans the Death Note owner's identity or its location.",
      "If a Shinigami's Death Note is taken away for whatever reason, it can only be retrieved from the Shinigami who possesses it at the time. If there is no Shinigami, but a human, the only way the Shinigami can get it back is to first touch the Death Note and become the one who haunts that particular human. Then they have to wait until that person dies to take it away. And they have to do it before any other human touches it.",
      "After a Shinigami brings a Death Note to the human world and gives its ownership to a human, the Shinigami has the right to kill the human using its own Death Note for any reason, such as disliking the owner.",
      "In the Shinigami realm there are a few copies of what humans might call a \"user handbook\" for the Death Notes in the human world. Although Shinigami may not give the handbook to humans, it is perfectly okay for them to teach humans about its contents, no matter what that may be.",
      "A Shinigami can extend its life by writing human names in a Death Note, but a human cannot. A person can only shorten his or her life by using the note.",
      "Even the original Shinigami owners of Death Notes do not know much about them.",
      "Shinigami must own at least one personal Death Note, which must never be lent to or written on by a human.",
      "Shinigami may exchange and write in each others' Death Notes.",
      "If a Shinigami decides to use a Death Note to end the life of the killer of an individual it favors, that individual's life will be extended but the Shinigami will die. The Shinigami will disappear but the Death Note will remain. The ownership of this Death Note is usually carried over to the next Shinigami that touches it, but it is common sense that it be returned to the Shinigami King.",
      "By manipulating the death of a human who has influence over another human's life, that human's original life span can sometimes be lengthened. If a Shinigami intentionally does this that Shinigami will die, but even if a human does the same, the human will not die.",
      "A Shinigami cannot be killed even if stabbed or shot. However, there are ways to kill them, which are not generally known even to the Shinigami themselves.",
      "There are male and female Shinigami, but it is neither permitted nor possible for them to have sexual relations with humans. They also cannot have sex with each other.",
      "As long as a Shinigami has at least once seen a human and knows his or her name and life span, the Shinigami is capable of finding that human by looking down from an observation hole in their realm.",
      "The Shinigami realm has laws that govern it. If a Shinigami should break a law, there are nine levels of punishment, which the severity starting at Level Eight and going up to Level One, plus an Extreme Level. At severity levels above Three, the Shinigami will be punished and killed. Killing a human without using the Death Note merits punishment at the Extreme Level.",
      "Shinigami will not die from lack of sleep. They do not need sleep, so to them it is merely laziness. Shinigami in the human world shouldn't act lazy merely because they are required to possess a human."
    ];

    const fakeRules = [
      "If you make this note unusable by tearing it up or burning it, all humans who have touched the note until then will die.",
      "If the person using the note fails to consecutively write names of people to be killed within 13 days, then the user will die."
    ];

    const rulesList = [
      ...realRules.map(r => ({ text: r, isFake: false })),
      ...fakeRules.map(f => ({ text: f, isFake: true }))
    ];

    const fancyBox = document.createElement('div');
    fancyBox.id = 'dn-rule-ticker';
    fancyBox.className = 'gothic-rule-box';

    let currentIdx = 0;
    const initialRule = rulesList[0];

    fancyBox.innerHTML = `
      <div class="gothic-rule-header">
        <span class="gothic-corner">✦</span>
        <span class="gothic-title" id="dn-rule-label">RULE OF THE NOTE (1)</span>
        <span class="gothic-corner">✦</span>
      </div>
      <div class="gothic-rule-body">
        <p id="dn-rule-text" class="${initialRule.isFake ? 'fake-rule' : 'real-rule'}">${initialRule.text}</p>
      </div>
      <div class="gothic-rule-footer">
        <span class="gothic-corner">✦</span>
        <span class="gothic-divider">❖ ❖ ❖</span>
        <span class="gothic-corner">✦</span>
      </div>
    `;

    const rulebookBox = document.querySelector('.container') || 
                        document.querySelector('[style*="border"]') || 
                        document.querySelector('.rules-box') ||
                        document.querySelector('main');

    if (rulebookBox) {
      rulebookBox.insertAdjacentElement('afterend', fancyBox);
    } else {
      document.body.appendChild(fancyBox);
    }

    setInterval(() => {
      const ruleText = document.getElementById('dn-rule-text');
      const ruleLabel = document.getElementById('dn-rule-label');
      if (!ruleText || !ruleLabel) return;

      ruleText.style.opacity = '0';
      ruleText.style.transform = 'translateY(-4px)';

      setTimeout(() => {
        currentIdx = (currentIdx + 1) % rulesList.length;
        const currentRule = rulesList[currentIdx];

        ruleText.innerText = currentRule.text;

        if (currentRule.isFake) {
          ruleText.className = 'fake-rule';
          ruleLabel.innerText = `RULE OF THE NOTE — [CORRUPTED / FAKE RULE]`;
        } else {
          ruleText.className = 'real-rule';
          ruleLabel.innerText = `RULE OF THE NOTE (${currentIdx + 1})`;
        }

        ruleText.style.opacity = '1';
        ruleText.style.transform = 'translateY(0)';
      }, 400);
    }, 10000);
  };

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

  // INITIALIZE ALL COMPONENTS INSTANTLY
  injectBaitCard();
  injectEyeButton();
  injectSafeModeButton();
  setupRuleRotator();

  // WATCH FOR DYNAMIC THEME CHANGES
  const themeObserver = new MutationObserver(() => {
    injectBaitCard();
    injectEyeButton();
    injectSafeModeButton();
    setupRuleRotator();
  });

  themeObserver.observe(document.body, { childList: true, subtree: true });
}

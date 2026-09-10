// Sound Byte & Subtitle Mapping with explicit preloading
const deathNoteAudio = {
  matsuda: {
    file: new Audio('audios/matsuda.mp3'),
    text: 'MATSUDA, YOU IDIOT!'
  },
  keikaku: {
    file: new Audio('audios/keikaku.mp3'),
    text: 'All according to keikaku. *(TL Note: Keikaku means plan)*'
  },
  hold_it_in: {
    file: new Audio('audios/hold_it_in.mp3'),
    text: '*(No, I can’t laugh yet... I’ve got to hold it in...)*'
  },
  light_laugh: {
    file: new Audio('audios/laugh.mp3'),
    text: '*(Light cackles evilily)*'
  },
  world_without_light: {
    file: new Audio('audios/world_without_light.mp3'),
    text: '*I’d never dream about being in a world without Light*. Yes, that would be dark. CUT IT OUT—'
  },
  i_am_l: {
    file: new Audio('audios/L.mp3'),
    text: 'I wanted to tell you... I’m L.'
  },
  potato_chip: {
    file: new Audio('audios/potato_chip.mp3'),
    text: 'I’ll take a potato chip... *AND EAT IT!*'
  }
};

// Force browser to cache audio instantly upon script execution
Object.values(deathNoteAudio).forEach(item => {
  item.file.preload = 'auto';
  item.file.load();
});

let subtitleTimer = null;

function playSoundByte(key) {
  const item = deathNoteAudio[key];
  if (!item) return;

  // Clone node prevents playback interruption and race condition errors
  const soundInstance = item.file.cloneNode();
  soundInstance.currentTime = 0;

  // Fire audio playback immediately from local cache
  soundInstance.play().catch(err => console.log('Autoplay or file issue:', err));

  // Determine subtitle duration safely after audio metadata loads
  const triggerSubtitle = () => {
    const duration = (soundInstance.duration && !isNaN(soundInstance.duration)) 
      ? soundInstance.duration * 1000 
      : 5000;
    showAnimeSubtitle(item.text, duration);
  };

  if (soundInstance.readyState >= 1) {
    triggerSubtitle();
  } else {
    soundInstance.addEventListener('loadedmetadata', triggerSubtitle, { once: true });
  }
}

function showAnimeSubtitle(text, durationMs) {
  const existingSub = document.getElementById('dn-anime-sub');
  if (existingSub) existingSub.remove();
  if (subtitleTimer) clearTimeout(subtitleTimer);

  const sub = document.createElement('div');
  sub.id = 'dn-anime-sub';
  
  // Format *italics*
  const formattedText = text.replace(/\*(.*?)\*/g, '<i>$1</i>');
  sub.innerHTML = formattedText;
  document.body.appendChild(sub);

  // Automatically clear subtitle when track ends
  subtitleTimer = setTimeout(() => {
    if (sub) sub.remove();
  }, durationMs);
}

// Global Click Delegation Listener
document.addEventListener('click', (e) => {
  // 1. Potato Chip Trap Trigger (#chip-trap-btn or .potato-chip-trigger)
  if (e.target.closest('#chip-trap-btn') || e.target.closest('.potato-chip-trigger')) {
    playSoundByte('potato_chip');
    return;
  }

  // 2. Lasagna Approved Badge -> Evil Laugh
  if (e.target.closest('.lasagna-relic-seal')) {
    playSoundByte('light_laugh');
    return;
  }

  // 3. Unveil Nine Circles Button -> "I wanted to tell you... I'm L."
  if (e.target.closest('#palette-toggle-btn')) {
    playSoundByte('i_am_l');
    return;
  }

  // 4. Clear All Trade Cart Button -> "MATSUDA, YOU IDIOT!"
  if (e.target.closest('#clear-cart-btn')) {
    playSoundByte('matsuda');
    return;
  }

  // 5. Copy Request Button -> "All according to keikaku."
  if (e.target.closest('#copy-trade-btn')) {
    playSoundByte('keikaku');
    return;
  }

  // 6. Email Request Button -> "No, I can't laugh yet..."
  if (e.target.closest('#email-trade-btn')) {
    playSoundByte('hold_it_in');
    return;
  }

  // 7. Scroll to Top "ASCEND" Button -> "I'd never dream about being in a world without Light..."
  if (e.target.closest('#scroll-top-btn')) {
    playSoundByte('world_without_light');
    return;
  }
});

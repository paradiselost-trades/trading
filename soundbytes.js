// Sound Byte & Subtitle Mapping
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

let activeAudio = null;
let subtitleTimer = null;

function playSoundByte(key) {
  const item = deathNoteAudio[key];
  if (!item) return;

  // Stop current playing audio if another button is clicked
  if (activeAudio) {
    activeAudio.pause();
    activeAudio.currentTime = 0;
  }

  activeAudio = item.file;
  item.file.currentTime = 0;

  item.file.play().catch(err => console.log('Autoplay or file issue:', err));

  // Determine duration dynamically or default to fallback
  const duration = item.file.duration && !isNaN(item.file.duration) ? item.file.duration * 1000 : 5000;
  showAnimeSubtitle(item.text, duration);
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

  // Automatically remove subtitle matching the audio clip duration
  subtitleTimer = setTimeout(() => {
    if (sub) sub.remove();
  }, durationMs);
}

// Global Click Delegation
document.addEventListener('click', (e) => {
  // 1. Potato Chip Trap Button -> "I'll take a potato chip... AND EAT IT!"
  if (e.target.closest('#chip-trap-btn')) {
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

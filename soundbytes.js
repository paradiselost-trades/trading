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
    text: '*(Light cackles evil laugh)*'
  },
  world_without_light: {
    file: new Audio('audios/world_without_light.mp3'),
    text: 'I’d never dream about being in a world without Light. Yes, that would be dark. CUT IT OUT—*Misa*!'
  },
  i_am_l: {
    file: new Audio('audios/L.mp3'),
    text: 'I wanted to tell you... I’m L.'
  }
};

function playSoundByte(key) {
  const item = deathNoteAudio[key];
  if (!item) return;

  item.file.currentTime = 0;
  item.file.play().catch(err => console.log('Autoplay or file issue:', err));

  showAnimeSubtitle(item.text);
}

function showAnimeSubtitle(text) {
  const existingSub = document.getElementById('dn-anime-sub');
  if (existingSub) existingSub.remove();

  const sub = document.createElement('div');
  sub.id = 'dn-anime-sub';
  
  // Format *italics*
  const formattedText = text.replace(/\*(.*?)\*/g, '<i>$1</i>');
  sub.innerHTML = formattedText;
  document.body.appendChild(sub);

  setTimeout(() => {
    if (sub) sub.remove();
  }, 5500);
}

// Global Click Delegation
document.addEventListener('click', (e) => {
  // 1. Lasagna Approved Badge -> Evil Laugh
  if (e.target.closest('.lasagna-relic-seal')) {
    playSoundByte('light_laugh');
    return;
  }

  // 2. Unveil Nine Circles Button -> "I wanted to tell you... I'm L."
  if (e.target.closest('#palette-toggle-btn')) {
    playSoundByte('i_am_l');
    return;
  }

  // 3. Clear All Trade Cart Button -> "MATSUDA, YOU IDIOT!"
  if (e.target.closest('#clear-cart-btn')) {
    playSoundByte('matsuda');
    return;
  }

  // 4. Copy Request Button -> "All according to keikaku."
  if (e.target.closest('#copy-trade-btn')) {
    playSoundByte('keikaku');
    return;
  }

  // 5. Email Request Button -> "No, I can't laugh yet..."
  if (e.target.closest('#email-trade-btn')) {
    playSoundByte('hold_it_in');
    return;
  }

  // 6. Scroll to Top "ASCEND" Button -> "I'd never dream about being in a world without Light..."
  if (e.target.closest('#scroll-top-btn')) {
    playSoundByte('world_without_light');
    return;
  }
});

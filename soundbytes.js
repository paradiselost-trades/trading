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
  light_laugh: {
    file: new Audio('audios/laugh.mp3'),
    text: '*(I can barely hold my laugh...)*'
  },
  world_without_light: {
    file: new Audio('audios/world_without_light.mp3'),
    text: 'If you die, Light, I’ll be in a world without Light. Yes, that would be dark.'
  },
  i_am_l: {
    file: new Audio('audios/L.mp3'),
    text: 'I am L.'
  }
};

function playSoundByte(key) {
  const item = deathNoteAudio[key];
  if (!item) return;

  item.file.currentTime = 0;
  item.file.play().catch(err => console.log('Autoplay blocked:', err));

  showAnimeSubtitle(item.text);
}

function showAnimeSubtitle(text) {
  const existingSub = document.getElementById('dn-anime-sub');
  if (existingSub) existingSub.remove();

  const sub = document.createElement('div');
  sub.id = 'dn-anime-sub';
  sub.innerHTML = text;
  document.body.appendChild(sub);

  setTimeout(() => {
    if (sub) sub.remove();
  }, 3500);
}

// Bind Sound Byte Triggers to Your Exact HTML Elements
document.addEventListener('DOMContentLoaded', () => {
  // 1. "MATSUDA, YOU IDIOT!" -> Clear All Button (Trade Drawer)
  document.getElementById('clear-cart-btn')?.addEventListener('click', () => {
    playSoundByte('matsuda');
  });

  // 2. "I can barely hold my laugh..." -> Lasagna Approved Seal
  document.querySelector('.lasagna-relic-seal')?.addEventListener('click', () => {
    playSoundByte('light_laugh');
  });

  // 3. "I am L." -> Unveil the Nine Circles Button
  document.getElementById('palette-toggle-btn')?.addEventListener('click', () => {
    playSoundByte('i_am_l');
  });

  // 4. "All according to keikaku." -> Copy & Email Trade Request Buttons
  document.getElementById('copy-trade-btn')?.addEventListener('click', () => {
    playSoundByte('keikaku');
  });
  document.getElementById('email-trade-btn')?.addEventListener('click', () => {
    playSoundByte('keikaku');
  });

  // 5. "World Without Light" -> Scroll to Top "ASCEND" Button
  document.getElementById('scroll-top-btn')?.addEventListener('click', () => {
    playSoundByte('world_without_light');
  });
});

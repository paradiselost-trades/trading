(function () {
  'use strict';

  // 1. PLAYLIST CONFIGURATION
  const playlist = [
    { title: "Overture", artist: "Frank Wildhorn", src: "audios/01 Overture.m4a", cover: "art/L_derpy.webp" },
    { title: "Where Is the Justice?", artist: "Jeremy Jordan", src: "audios/02 Where Is the Justice.m4a", cover: "art/Light_derpy.webp" },
    { title: "They're Only Human", artist: "Eric Anderson & Carrie Manolakos", src: "audios/03 They_re Only Human.m4a", cover: "art/Light_derpy.webp" },
    { title: "Hurricane", artist: "Jeremy Jordan", src: "audios/04 Hurricane.m4a", cover: "art/Light_derpy.webp" },
    { title: "Kira", artist: "Eric Anderson", src: "audios/05 Kira.m4a", cover: "art/Light_derpy.webp" },
    { title: "I'm Ready", artist: "Adrienne Warren", src: "audios/06 I_m Ready.m4a", cover: "art/L_derpy.webp" },
    { title: "We All Need a Hero", artist: "Laura Osnes", src: "audios/07 We All Need a Hero.m4a", cover: "art/L_derpy.webp" },
    { title: "The Game Begins", artist: "Jarrod Spector", src: "audios/08 The Game Begins.m4a", cover: "art/L_derpy.webp" },
    { title: "There Are Lines", artist: "Michael Lanning", src: "audios/09 There Are Lines.m4a", cover: "art/L_derpy.webp" },
    { title: "Secrets & Lies", artist: "Jarrod Spector & Michael Lanning", src: "audios/10 Secrets _ Lies.m4a", cover: "art/L_derpy.webp" },
    { title: "Mortals & Fools", artist: "Carrie Manolakos & Laura Osnes", src: "audios/11 Mortals _ Fools.m4a", cover: "art/Light_derpy.webp" },
    { title: "Stalemate", artist: "Jarrod Spector & Jeremy Jordan", src: "audios/12 Stalemate.m4a", cover: "art/L_derpy.webp" },
    { title: "I'll Only Love You More", artist: "Adrienne Warren", src: "audios/13 I_ll Only Love You More.m4a", cover: "art/Light_derpy.webp" },
    { title: "Honor Bound", artist: "Michael Lanning", src: "audios/14 Honor Bound.m4a", cover: "art/L_derpy.webp" },
    { title: "Playing His Game", artist: "Jeremy Jordan & Jarrod Spector", src: "audios/15 Playing His Game.m4a", cover: "art/L_derpy.webp" },
    { title: "Borrowed Time", artist: "Adrienne Warren", src: "audios/16 Borrowed Time.m4a", cover: "art/Light_derpy.webp" },
    { title: "When Loves Comes", artist: "Carrie Manolakos", src: "audios/17 When Loves Comes.m4a", cover: "art/Light_derpy.webp" },
    { title: "The Way It Ends", artist: "Jarrod Spector & Jeremy Jordan", src: "audios/18 The Way It Ends.m4a", cover: "art/L_derpy.webp" },
    { title: "Requiem", artist: "Frank Wildhorn", src: "audios/19 Requiem.m4a", cover: "art/L_derpy.webp" }
  ];

  let currentTrackIndex = 0;
  let isPlaying = false;
  const audio = new Audio();

  // 2. COMPACT FIXED STYLES WITH HARD-CAPPED DIMENSIONS
  const playerStyles = `
    /* MAIN WIDGET CONTAINER */
    #dnPlayerWidget, .dn-player-widget {
      position: fixed !important;
      top: 15px !important;
      left: 15px !important;
      height: 48px !important;
      max-height: 48px !important;
      width: auto !important;
      max-width: 340px !important;
      background: rgba(6, 10, 14, 0.95) !important;
      border: 1px solid #00d8ff !important;
      border-bottom: 2px solid #ff0033 !important;
      box-shadow: 0 0 12px rgba(0, 216, 255, 0.35) !important;
      border-radius: 8px !important;
      padding: 4px 10px !important;
      display: flex !important;
      align-items: center !important;
      gap: 10px !important;
      z-index: 2147483646 !important;
      font-family: 'Courier New', monospace !important;
      box-sizing: border-box !important;
      user-select: none !important;
      overflow: hidden !important;
    }

    /* HARD STOP ANY UNRULY IMAGES INSIDE PLAYER */
    #dnPlayerWidget img, .dn-player-widget img {
      max-width: 36px !important;
      max-height: 36px !important;
    }

    /* CD DISC CONTAINER */
    .dn-cd-container {
      position: relative !important;
      width: 36px !important;
      height: 36px !important;
      min-width: 36px !important;
      min-height: 36px !important;
      max-width: 36px !important;
      max-height: 36px !important;
      border-radius: 50% !important;
      background: #000 !important;
      border: 1.5px solid #00d8ff !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      overflow: hidden !important;
      flex-shrink: 0 !important;
    }

    /* REVOLVING CD ARTWORK */
    .dn-cd-art {
      width: 36px !important;
      height: 36px !important;
      object-fit: cover !important;
      border-radius: 50% !important;
      display: block !important;
      animation: dnSpinCD 8s linear infinite !important;
      animation-play-state: paused !important;
    }

    .dn-player-widget.playing .dn-cd-art {
      animation-play-state: running !important;
    }

    .dn-cd-center {
      position: absolute !important;
      width: 8px !important;
      height: 8px !important;
      background: #060a0e !important;
      border: 1.5px solid #00d8ff !important;
      border-radius: 50% !important;
      z-index: 2 !important;
      pointer-events: none !important;
    }

    @keyframes dnSpinCD {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    /* TRACK DETAILS */
    .dn-player-info {
      display: flex !important;
      flex-direction: column !important;
      justify-content: center !important;
      overflow: hidden !important;
      flex-grow: 1 !important;
      max-width: 160px !important;
    }

    .dn-track-title {
      color: #00d8ff !important;
      font-weight: bold !important;
      font-size: 0.72rem !important;
      margin: 0 !important;
      white-space: nowrap !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      line-height: 1.2 !important;
    }

    .dn-track-artist {
      color: #ff3344 !important;
      font-size: 0.62rem !important;
      margin: 1px 0 0 0 !important;
      white-space: nowrap !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      line-height: 1.2 !important;
    }

    /* CONTROLS */
    .dn-player-controls {
      display: flex !important;
      align-items: center !important;
      gap: 4px !important;
      flex-shrink: 0 !important;
    }

    .dn-btn {
      background: rgba(0, 216, 255, 0.1) !important;
      border: 1px solid #00d8ff !important;
      color: #00d8ff !important;
      border-radius: 4px !important;
      width: 24px !important;
      height: 24px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      cursor: pointer !important;
      font-size: 0.65rem !important;
      padding: 0 !important;
      transition: background 0.15s ease !important;
    }

    .dn-btn:hover {
      background: #00d8ff !important;
      color: #050505 !important;
    }

    .dn-btn-play {
      border-color: #ff0033 !important;
      color: #ff0033 !important;
      background: rgba(255, 0, 51, 0.1) !important;
    }

    .dn-btn-play:hover {
      background: #ff0033 !important;
      color: #ffffff !important;
    }

    @media (max-width: 768px) {
      #dnPlayerWidget, .dn-player-widget {
        display: none !important;
      }
    }
  `;

  const styleTag = document.createElement('style');
  styleTag.type = 'text/css';
  styleTag.innerText = playerStyles;
  document.head.appendChild(styleTag);

  // 3. INITIALIZE UI
  function initPlayerUI() {
    if (document.getElementById('dnPlayerWidget')) return;

    const widget = document.createElement('div');
    widget.id = 'dnPlayerWidget';
    widget.className = 'dn-player-widget';
    widget.innerHTML = `
      <div class="dn-cd-container">
        <img src="${playlist[0].cover}" alt="CD Art" class="dn-cd-art" id="dnCdArt">
        <div class="dn-cd-center"></div>
      </div>
      <div class="dn-player-info">
        <p class="dn-track-title" id="dnTrackTitle">${playlist[0].title}</p>
        <p class="dn-track-artist" id="dnTrackArtist">${playlist[0].artist}</p>
      </div>
      <div class="dn-player-controls">
        <button class="dn-btn" id="dnPrevBtn" title="Previous">⏮</button>
        <button class="dn-btn dn-btn-play" id="dnPlayBtn" title="Play/Pause">▶</button>
        <button class="dn-btn" id="dnNextBtn" title="Next">⏭</button>
      </div>
    `;

    document.body.appendChild(widget);
    loadTrack(currentTrackIndex);

    document.getElementById('dnPlayBtn').addEventListener('click', togglePlay);
    document.getElementById('dnPrevBtn').addEventListener('click', prevTrack);
    document.getElementById('dnNextBtn').addEventListener('click', nextTrack);

    audio.addEventListener('ended', nextTrack);
  }

  // 4. PLAYER CONTROLS
  function loadTrack(index) {
    const track = playlist[index];
    audio.src = track.src;
    document.getElementById('dnTrackTitle').innerText = track.title;
    document.getElementById('dnTrackArtist').innerText = track.artist;
    document.getElementById('dnCdArt').src = track.cover;
  }

  function togglePlay() {
    const widget = document.getElementById('dnPlayerWidget');
    const playBtn = document.getElementById('dnPlayBtn');

    if (isPlaying) {
      audio.pause();
      isPlaying = false;
      playBtn.innerText = '▶';
      widget.classList.remove('playing');
    } else {
      audio.play().then(() => {
        isPlaying = true;
        playBtn.innerText = '⏸';
        widget.classList.add('playing');
      }).catch(err => {
        console.warn('Audio playback issue:', err);
      });
    }
  }

  function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) audio.play();
  }

  function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) audio.play();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPlayerUI);
  } else {
    initPlayerUI();
  }

})();

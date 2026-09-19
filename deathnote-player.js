(function () {
  'use strict';

  // 1. PLAYLIST MATCHING YOUR REPOSITORY PATH (audios/)
  const playlist = [
    {
      title: "Overture",
      artist: "Frank Wildhorn",
      src: "audios/01 Overture.m4a",
      cover: "art/L_derpy.webp"
    },
    {
      title: "Where Is the Justice?",
      artist: "Jeremy Jordan",
      src: "audios/02 Where Is the Justice.m4a",
      cover: "art/Light_derpy.webp"
    },
    {
      title: "They're Only Human",
      artist: "Eric Anderson & Carrie Manolakos",
      src: "audios/03 They_re Only Human.m4a",
      cover: "art/Light_derpy.webp"
    },
    {
      title: "Hurricane",
      artist: "Jeremy Jordan",
      src: "audios/04 Hurricane.m4a",
      cover: "art/Light_derpy.webp"
    },
    {
      title: "Kira",
      artist: "Eric Anderson",
      src: "audios/05 Kira.m4a",
      cover: "art/Light_derpy.webp"
    },
    {
      title: "I'm Ready",
      artist: "Adrienne Warren",
      src: "audios/06 I_m Ready.m4a",
      cover: "art/L_derpy.webp"
    },
    {
      title: "We All Need a Hero",
      artist: "Laura Osnes",
      src: "audios/07 We All Need a Hero.m4a",
      cover: "art/L_derpy.webp"
    },
    {
      title: "The Game Begins",
      artist: "Jarrod Spector",
      src: "audios/08 The Game Begins.m4a",
      cover: "art/L_derpy.webp"
    },
    {
      title: "There Are Lines",
      artist: "Michael Lanning",
      src: "audios/09 There Are Lines.m4a",
      cover: "art/L_derpy.webp"
    },
    {
      title: "Secrets & Lies",
      artist: "Jarrod Spector & Michael Lanning",
      src: "audios/10 Secrets _ Lies.m4a",
      cover: "art/L_derpy.webp"
    },
    {
      title: "Mortals & Fools",
      artist: "Carrie Manolakos & Laura Osnes",
      src: "audios/11 Mortals _ Fools.m4a",
      cover: "art/Light_derpy.webp"
    },
    {
      title: "Stalemate",
      artist: "Jarrod Spector & Jeremy Jordan",
      src: "audios/12 Stalemate.m4a",
      cover: "art/L_derpy.webp"
    },
    {
      title: "I'll Only Love You More",
      artist: "Adrienne Warren",
      src: "audios/13 I_ll Only Love You More.m4a",
      cover: "art/Light_derpy.webp"
    },
    {
      title: "Honor Bound",
      artist: "Michael Lanning",
      src: "audios/14 Honor Bound.m4a",
      cover: "art/L_derpy.webp"
    },
    {
      title: "Playing His Game",
      artist: "Jeremy Jordan & Jarrod Spector",
      src: "audios/15 Playing His Game.m4a",
      cover: "art/L_derpy.webp"
    },
    {
      title: "Borrowed Time",
      artist: "Adrienne Warren",
      src: "audios/16 Borrowed Time.m4a",
      cover: "art/Light_derpy.webp"
    },
    {
      title: "When Loves Comes",
      artist: "Carrie Manolakos",
      src: "audios/17 When Loves Comes.m4a",
      cover: "art/Light_derpy.webp"
    },
    {
      title: "The Way It Ends",
      artist: "Jarrod Spector & Jeremy Jordan",
      src: "audios/18 The Way It Ends.m4a",
      cover: "art/L_derpy.webp"
    },
    {
      title: "Requiem",
      artist: "Frank Wildhorn",
      src: "audios/19 Requiem.m4a",
      cover: "art/L_derpy.webp"
    }
  ];

  let currentTrackIndex = 0;
  let isPlaying = false;
  const audio = new Audio();

  // 2. INJECT PLAYER CSS STYLES
  const playerStyles = `
    /* DEATH NOTE FLOATING MUSIC PLAYER (TOP LEFT ANCHOR) */
    .dn-player-widget {
      position: fixed;
      top: 20px;
      left: 20px;
      background: linear-gradient(135deg, rgba(8, 12, 10, 0.98), rgba(4, 6, 5, 0.98));
      border: 2px solid #00d8ff;
      border-bottom: 3px solid #ff0033;
      box-shadow: 0 0 18px rgba(0, 216, 255, 0.4), inset 0 0 10px rgba(0, 0, 0, 0.8);
      border-radius: 10px;
      padding: 10px 14px;
      display: flex;
      align-items: center;
      gap: 14px;
      z-index: 2147483646;
      font-family: 'Courier New', monospace;
      user-select: none;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .dn-player-widget:hover {
      box-shadow: 0 0 24px rgba(0, 216, 255, 0.6);
    }

    /* REVOLVING CD CONTAINER */
    .dn-cd-container {
      position: relative;
      width: 52px;
      height: 52px;
      flex-shrink: 0;
      border-radius: 50%;
      background: radial-gradient(circle, #222 20%, #111 60%, #050505 100%);
      border: 2px solid #00d8ff;
      box-shadow: 0 0 10px rgba(0, 216, 255, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    /* ROTATING CD ANIMATION */
    .dn-cd-art {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
      animation: dnSpinCD 8s linear infinite;
      animation-play-state: paused;
    }

    .dn-player-widget.playing .dn-cd-art {
      animation-play-state: running;
    }

    .dn-cd-center {
      position: absolute;
      width: 12px;
      height: 12px;
      background: #080c0a;
      border: 2px solid #00d8ff;
      border-radius: 50%;
      z-index: 2;
    }

    @keyframes dnSpinCD {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    /* TRACK INFO PANEL */
    .dn-player-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-width: 150px;
      max-width: 200px;
    }

    .dn-track-title {
      color: #00d8ff;
      font-weight: bold;
      font-size: 0.78rem;
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      letter-spacing: 0.5px;
    }

    .dn-track-artist {
      color: #ff3344;
      font-size: 0.68rem;
      margin: 2px 0 0 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* CONTROLS */
    .dn-player-controls {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .dn-btn {
      background: rgba(0, 216, 255, 0.1);
      border: 1px solid #00d8ff;
      color: #00d8ff;
      border-radius: 4px;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 0.75rem;
      transition: background 0.15s ease, transform 0.15s ease;
    }

    .dn-btn:hover {
      background: #00d8ff;
      color: #050505;
      transform: scale(1.08);
    }

    .dn-btn-play {
      border-color: #ff0033;
      color: #ff0033;
      background: rgba(255, 0, 51, 0.1);
    }

    .dn-btn-play:hover {
      background: #ff0033;
      color: #ffffff;
    }

    @media (max-width: 768px) {
      .dn-player-widget {
        display: none !important;
      }
    }
  `;

  const styleTag = document.createElement('style');
  styleTag.type = 'text/css';
  styleTag.innerText = playerStyles;
  document.head.appendChild(styleTag);

  // 3. INITIALIZE WIDGET UI
  function initPlayerUI() {
    if (document.getElementById('dnPlayerWidget')) return;

    const widget = document.createElement('div');
    widget.id = 'dnPlayerWidget';
    widget.className = 'dn-player-widget';
    widget.innerHTML = `
      <div class="dn-cd-container">
        <img src="${playlist[0].cover}" alt="Death Note CD Art" class="dn-cd-art" id="dnCdArt">
        <div class="dn-cd-center"></div>
      </div>
      <div class="dn-player-info">
        <p class="dn-track-title" id="dnTrackTitle">${playlist[0].title}</p>
        <p class="dn-track-artist" id="dnTrackArtist">${playlist[0].artist}</p>
      </div>
      <div class="dn-player-controls">
        <button class="dn-btn" id="dnPrevBtn" title="Previous Track">⏮</button>
        <button class="dn-btn dn-btn-play" id="dnPlayBtn" title="Play / Pause">▶</button>
        <button class="dn-btn" id="dnNextBtn" title="Next Track">⏭</button>
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
        console.warn('Audio play request failed or path invalid:', err);
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

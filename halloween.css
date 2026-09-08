/* ==========================================================================
   DEATH NOTE RESKIN — HALLOWEEN THEME OVERLAY (FULL UPDATED)
   ========================================================================== */

/* 1. FONT IMPORT DEFINITIONS */
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

/* Death Note Gothic Font Declaration */
@font-face {
  font-family: 'DeathNoteGothic';
  src: url('font/Death%20Note.ttf') format('truetype'),
       url('font/Death Note.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

/* Whizbang Roman Font Declaration */
@font-face {
  font-family: 'Whizbang';
  src: url('font/whizbang-roman.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

:root[data-theme="death-note"] {
  --dn-bg: #0d0d0d;
  --dn-paper-bg: #f5f2e9;
  --dn-paper-line: #c3bcae;
  --dn-paper-text: #0a0a0a;
  --dn-rulebook-bg: #050505;
  --dn-rulebook-border: #ffffff;
  --dn-margin-line: #a00000;
  
  /* Font Family Variables */
  --dn-font-heading: 'DeathNoteGothic', 'UnifrakturMaguntia', 'Courier New', monospace;
  --dn-font-body: 'Whizbang', 'Special Elite', 'Georgia', serif;
  --dn-font-handwriting: 'Rock Salt', 'Reenie Beanie', cursive;
}

/* ==========================================================================
   2. CRT SCANLINE KILL SWITCH & ATMOSPHERIC BACKGROUND
   ========================================================================== */
html[data-theme="death-note"] ::before,
html[data-theme="death-note"] ::after,
html[data-theme="death-note"] .crt,
html[data-theme="death-note"] .scanlines,
html[data-theme="death-note"] .overlay {
  background-image: none !important;
  box-shadow: none !important;
}

/* Shinigami Realm Dynamic Layered Background */
html[data-theme="death-note"] body {
  background-color: #050505 !important;
  background-image: 
    radial-gradient(circle at 50% 20%, rgba(139, 0, 0, 0.18) 0%, transparent 50%),
    radial-gradient(circle at 20% 80%, rgba(40, 40, 40, 0.4) 0%, transparent 40%),
    radial-gradient(circle at 80% 80%, rgba(20, 20, 20, 0.6) 0%, transparent 40%),
    radial-gradient(circle at 50% 50%, #141414 0%, #020202 100%) !important;
  background-attachment: fixed !important;
  position: relative;
  overflow-x: hidden;
  color: #f0f0f0 !important;
}

/* Subtle Crimson Border Glow */
html[data-theme="death-note"] body::before {
  content: "" !important;
  position: fixed !important;
  top: 0; left: 0; right: 0; bottom: 0 !important;
  box-shadow: inset 0 0 100px rgba(139, 0, 0, 0.25), inset 0 0 40px rgba(0, 0, 0, 0.9) !important;
  pointer-events: none !important;
  z-index: 0 !important;
}

/* Floating Crimson Ash Effect */
html[data-theme="death-note"] body::after {
  content: "" !important;
  position: fixed !important;
  top: -50%; left: -50%; width: 200%; height: 200% !important;
  background-image: 
    radial-gradient(2px 2px at 20px 30px, rgba(255, 77, 77, 0.4), rgba(0,0,0,0)),
    radial-gradient(2px 2px at 40px 70px, rgba(139, 0, 0, 0.5), rgba(0,0,0,0)),
    radial-gradient(1px 1px at 90px 40px, rgba(255, 255, 255, 0.3), rgba(0,0,0,0)),
    radial-gradient(2px 2px at 160px 120px, rgba(255, 77, 77, 0.3), rgba(0,0,0,0)) !important;
  background-repeat: repeat !important;
  background-size: 200px 200px !important;
  animation: floatingAsh 18s linear infinite !important;
  pointer-events: none !important;
  opacity: 0.6 !important;
  z-index: 0 !important;
}

@keyframes floatingAsh {
  0% { transform: translateY(0) rotate(0deg); }
  100% { transform: translateY(-200px) rotate(5deg); }
}

/* ==========================================================================
   3. TYPOGRAPHY RULES
   ========================================================================== */

/* Major Headings ONLY — Death Note Gothic */
html[data-theme="death-note"] h1,
html[data-theme="death-note"] h2,
html[data-theme="death-note"] h3,
html[data-theme="death-note"] h4,
html[data-theme="death-note"] .main-title,
html[data-theme="death-note"] .votive-glow,
html[data-theme="death-note"] #stats {
  font-family: var(--dn-font-heading) !important;
  color: #ffffff !important;
  letter-spacing: 2.5px !important;
  text-transform: uppercase !important;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3), 0 0 18px #000000 !important;
}

/* Card Body, Meta, Cast, & Notes — Whizbang Font */
html[data-theme="death-note"] .card-meta,
html[data-theme="death-note"] .card-cast,
html[data-theme="death-note"] .card-notes,
html[data-theme="death-note"] .card-title,
html[data-theme="death-note"] p,
html[data-theme="death-note"] span,
html[data-theme="death-note"] li,
html[data-theme="death-note"] div:not(.main-title) {
  font-family: var(--dn-font-body) !important;
  font-size: 0.98rem;
  line-height: 1.5;
  color: #0a0a0a;
  text-shadow: none !important;
}

/* ==========================================================================
   4. REALISTIC NOTEBOOK CARDS (HOLES, LINES & PAGE TORN EDGES)
   ========================================================================== */

html[data-theme="death-note"] .card,
html[data-theme="death-note"] .bootleg-card,
html[data-theme="death-note"] .item-card {
  position: relative !important;
  background-color: var(--dn-paper-bg) !important;
  /* Lined Paper Pattern */
  background-image: repeating-linear-gradient(
    transparent,
    transparent 27px,
    var(--dn-paper-line) 28px
  ) !important;
  border: 1px solid #d2cbba !important;
  border-radius: 2px !important;
  padding: 20px 20px 20px 58px !important;
  /* Card Elevation Shadow */
  box-shadow: 
    4px 6px 15px rgba(0, 0, 0, 0.8), 
    0 0 1px rgba(0, 0, 0, 0.5),
    inset 0 0 30px rgba(180, 170, 150, 0.2) !important;
  color: var(--dn-paper-text) !important;
  margin-bottom: 25px !important;
  overflow: hidden !important;
}

/* Red Margin Line & Spiral Notebook Holes */
html[data-theme="death-note"] .card::before,
html[data-theme="death-note"] .bootleg-card::before,
html[data-theme="death-note"] .item-card::before {
  content: "" !important;
  position: absolute !important;
  top: 0 !important;
  bottom: 0 !important;
  left: 44px !important;
  width: 2px !important;
  background-color: var(--dn-margin-line) !important;
  z-index: 1 !important;
}

/* Ring Hole Punch Effect along Left Margin */
html[data-theme="death-note"] .card::after,
html[data-theme="death-note"] .bootleg-card::after,
html[data-theme="death-note"] .item-card::after {
  content: "" !important;
  position: absolute !important;
  top: 0 !important;
  bottom: 0 !important;
  left: 14px !important;
  width: 14px !important;
  background-image: radial-gradient(circle at center, #0d0d0d 40%, transparent 45%) !important;
  background-size: 14px 40px !important;
  background-repeat: repeat-y !important;
  z-index: 2 !important;
}

/* Card Text Styling */
html[data-theme="death-note"] .card p,
html[data-theme="death-note"] .bootleg-card p,
html[data-theme="death-note"] .item-card p,
html[data-theme="death-note"] .card-cast,
html[data-theme="death-note"] .card-notes {
  font-family: var(--dn-font-body) !important;
  color: #050505 !important;
  background: transparent !important;
  line-height: 28px !important;
}

/* Deep Crimson Label Highlights */
html[data-theme="death-note"] .infernal-label-cast,
html[data-theme="death-note"] .infernal-label-notes {
  color: #8b0000 !important;
  font-family: var(--dn-font-body) !important;
  font-weight: 800 !important;
  background: transparent !important;
}

/* FILE FORMAT & SIZE BADGES — HIGH CONTRAST FIX */
html[data-theme="death-note"] .format-badge,
html[data-theme="death-note"] .size-badge,
html[data-theme="death-note"] [class*="master"],
html[data-theme="death-note"] [class*="badge"],
html[data-theme="death-note"] .card-type,
html[data-theme="death-note"] .card-size {
  background-color: #8b0000 !important;
  color: #ffffff !important;
  border: 1px solid #4a0000 !important;
  font-weight: bold !important;
  text-shadow: none !important;
  padding: 2px 8px !important;
  border-radius: 3px !important;
  display: inline-block !important;
}

/* ==========================================================================
   5. INSTRUCTION PAGES & TRAP OVERLAYS
   ========================================================================== */

html[data-theme="death-note"] .rules-box,
html[data-theme="death-note"] #infernal-palette {
  background-color: var(--dn-rulebook-bg) !important;
  border: 2px solid var(--dn-rulebook-border) !important;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.2) !important;
  color: #ffffff !important;
  text-align: center !important;
  position: relative !important;
  margin-top: 35px !important;
  padding-top: 25px !important;
}

html[data-theme="death-note"] .rules-box p,
html[data-theme="death-note"] .rules-box ul,
html[data-theme="death-note"] .rules-box li {
  font-family: var(--dn-font-body) !important;
  color: #ffffff !important;
  line-height: 1.7 !important;
}

html[data-theme="death-note"] .rules-box::before {
  content: "HOW TO USE IT" !important;
  position: absolute;
  top: -16px;
  left: 50%;
  transform: translateX(-50%);
  background: #000000 !important;
  color: #ffffff !important;
  font-family: 'Share Tech Mono', 'Courier New', monospace !important;
  padding: 2px 14px;
  font-size: 0.9rem;
  border: 1px solid #ffffff;
  z-index: 2;
}

/* Shinigami Eyes Effect */
body.shinigami-eyes-active {
  filter: invert(100%) hue-rotate(180deg) contrast(140%) !important;
}

/* ==========================================================================
   OFFICIAL L BROADCAST TRAP POPUP
   ========================================================================== */

.kira-trap-banner {
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  display: flex; justify-content: center; align-items: center;
  z-index: 99999;
}

.kira-banner-content {
  border: 2px solid #8b0000;
  padding: 40px;
  background: #000000;
  color: #ff3333;
  text-align: center;
  box-shadow: 0 0 30px #8b0000;
}

/* Header Text — Official Broadcast Monospace */
.kira-banner-content h1,
.kira-trap-banner .kira-banner-content h1 {
  font-family: 'Share Tech Mono', 'Courier New', monospace !important;
  font-size: 2rem !important;
  color: #ffffff !important;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.5) !important;
  letter-spacing: 2px !important;
  margin-bottom: 15px !important;
}

/* Message Subtext — Clean Monospace */
.kira-trap-banner .kira-banner-content p {
  color: #ff4d4d !important;
  font-family: 'Share Tech Mono', 'Courier New', monospace !important;
  font-size: 1.05rem !important;
  letter-spacing: 1px !important;
  margin: 15px 0 25px 0 !important;
  text-shadow: none !important;
}

/* Button Styling */
.kira-banner-content button {
  background: #8b0000;
  color: #ffffff;
  border: 1px solid #ff4d4d;
  padding: 10px 22px;
  cursor: pointer;
  font-family: 'Share Tech Mono', 'Courier New', monospace !important;
  font-size: 0.9rem !important;
  font-weight: bold;
  letter-spacing: 1px;
  transition: all 0.2s ease;
}

.kira-banner-content button:hover {
  background: #ff0000 !important;
  color: #000000 !important;
}

/* ==========================================================================
   FLOATING TIMER BOX
   ========================================================================== */

#death-note-timer-box {
  position: fixed;
  bottom: 150px !important;
  right: 25px !important;
  background: #1a1a1a !important;
  border: 2px solid #ff3333 !important;
  color: #ffffff !important;
  padding: 10px 16px;
  border-radius: 6px;
  font-family: 'Share Tech Mono', 'Courier New', monospace !important;
  font-size: 0.95rem;
  box-shadow: 0 0 15px rgba(255, 0, 0, 0.8), 0 0 2px #ffffff !important;
  z-index: 999999 !important;
  display: flex;
  align-items: center;
  gap: 8px;
}

#death-note-timer-box .timer-label {
  color: #ffffff !important;
  font-weight: 800 !important;
  font-family: 'Share Tech Mono', 'Courier New', monospace !important;
}

#death-timer-count {
  color: #ff3333 !important;
  font-weight: 900 !important;
  font-size: 1.1rem !important;
  font-family: 'Share Tech Mono', 'Courier New', monospace !important;
  text-shadow: 0 0 8px #ff0000 !important;
}

/* Flatline State Contrast */
#death-note-timer-box.flatlined {
  border-color: #ff0000 !important;
  background: #1a0000 !important;
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.9) !important;
}

#death-note-timer-box .flatline-text {
  color: #ff3333 !important;
  font-weight: 900 !important;
  font-family: 'Share Tech Mono', 'Courier New', monospace !important;
  text-shadow: 0 0 10px #ff0000 !important;
}

/* Full Screen Blackout Overlay */
.kira-blackout-screen {
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background-color: #000000 !important;
  z-index: 99999999 !important;
  pointer-events: all;
}

/* ==========================================================================
   6. SAFE MODE OVERRIDE
   ========================================================================== */
body.dn-safe-mode,
body.dn-safe-mode * {
  text-shadow: none !important;
  box-shadow: none !important;
  animation: none !important;
  filter: none !important;
  transition: none !important;
}

body.dn-safe-mode #death-note-timer-box {
  border: 1px solid #ffffff !important;
  background: #000000 !important;
}

/* ==========================================================================
   7. INTERACTIVE BUTTON PRESSED & GLOW STATES
   ========================================================================== */

/* Neutral Filter & Action Buttons */
html[data-theme="death-note"] .filter-btn,
html[data-theme="death-note"] .category-btn,
html[data-theme="death-note"] .tag-btn,
html[data-theme="death-note"] button,
html[data-theme="death-note"] [class*="btn"] {
  border: 1px solid #444444 !important;
  background: #121212 !important;
  color: #cccccc !important;
  box-shadow: none !important;
  text-shadow: none !important;
  transition: all 0.15s ease-in-out !important;
}

/* Hover State */
html[data-theme="death-note"] button:hover,
html[data-theme="death-note"] .filter-btn:hover {
  border-color: #8b0000 !important;
  color: #ffffff !important;
  box-shadow: 0 0 8px rgba(139, 0, 0, 0.5) !important;
}

/* ACTIVE / SELECTED BUTTON STATE (DEEP CRIMSON GLOW) */
html[data-theme="death-note"] .filter-btn.active,
html[data-theme="death-note"] .category-btn.active,
html[data-theme="death-note"] .tag-btn.active,
html[data-theme="death-note"] button.active,
html[data-theme="death-note"] .active {
  background: #8b0000 !important;
  color: #ffffff !important;
  border-color: #ff3333 !important;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.6), 0 0 12px rgba(255, 51, 51, 0.8) !important;
  transform: translateY(1px) !important;
}

/* PHYSICAL CLICK / PRESSED STATE (:active) */
html[data-theme="death-note"] button:active,
html[data-theme="death-note"] .filter-btn:active,
html[data-theme="death-note"] [class*="btn"]:active {
  background: #a00000 !important;
  color: #ffffff !important;
  border-color: #ff0000 !important;
  box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.9), 0 0 15px #ff0000 !important;
  transform: translateY(2px) scale(0.98) !important;
}

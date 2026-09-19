(function () {
  'use strict';

  // 1. INJECT STYLES FOR BEYOND BIRTHDAY BUTTON AND MODAL
  const bbStyles = `
    /* BEYOND BIRTHDAY FLOATING EYE BUTTON */
    .bb-eye-btn {
      background: transparent !important;
      border: none !important;
      padding: 0 !important;
      cursor: pointer !important;
      width: 44px !important;
      height: 44px !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      transition: transform 0.25s ease, filter 0.25s ease !important;
      vertical-align: middle !important;
      margin: 0 8px !important;
    }

    .bb-eye-btn img {
      width: 100% !important;
      height: 100% !important;
      object-fit: contain !important;
      filter: drop-shadow(0 0 6px rgba(255, 0, 51, 0.6)) !important;
      transition: filter 0.25s ease !important;
    }

    .bb-eye-btn:hover {
      transform: scale(1.15) rotate(6deg) !important;
    }

    .bb-eye-btn:hover img {
      filter: drop-shadow(0 0 16px rgba(255, 0, 51, 1)) !important;
    }

    /* DARK CRIMSON MODAL OVERLAY */
    .bb-modal-overlay {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      background: rgba(4, 0, 2, 0.88) !important;
      backdrop-filter: blur(5px) !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      z-index: 2147483647 !important;
      opacity: 0 !important;
      visibility: hidden !important;
      transition: opacity 0.3s ease, visibility 0.3s ease !important;
    }

    .bb-modal-overlay.open {
      opacity: 1 !important;
      visibility: visible !important;
    }

    /* MODAL CONTAINER */
    .bb-modal-box {
      background: #080204 !important;
      border: 2px solid #ff0033 !important;
      border-bottom: 3px solid #00d8ff !important;
      box-shadow: 0 0 32px rgba(255, 0, 51, 0.6), inset 0 0 15px rgba(0, 0, 0, 0.9) !important;
      border-radius: 10px !important;
      width: 90% !important;
      max-width: 620px !important;
      max-height: 80vh !important;
      padding: 22px !important;
      color: #ffffff !important;
      font-family: 'Courier New', monospace !important;
      display: flex !important;
      flex-direction: column !important;
      box-sizing: border-box !important;
    }

    .bb-modal-header {
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      border-bottom: 1px dashed #ff0033 !important;
      padding-bottom: 12px !important;
      margin-bottom: 16px !important;
    }

    .bb-modal-title {
      color: #ff3344 !important;
      font-size: 1.05rem !important;
      font-weight: bold !important;
      margin: 0 !important;
      letter-spacing: 0.8px !important;
      display: flex !important;
      align-items: center !important;
      gap: 8px !important;
    }

    .bb-modal-close {
      background: transparent !important;
      border: none !important;
      color: #ff3344 !important;
      font-size: 1.5rem !important;
      cursor: pointer !important;
      font-weight: bold !important;
      line-height: 1 !important;
      transition: color 0.15s ease !important;
    }

    .bb-modal-close:hover {
      color: #ffffff !important;
    }

    .bb-modal-subtitle {
      color: #00d8ff !important;
      font-size: 0.75rem !important;
      margin-bottom: 14px !important;
      font-style: italic !important;
    }

    .bb-modal-content {
      overflow-y: auto !important;
      flex-grow: 1 !important;
      padding-right: 6px !important;
    }

    /* RECORDING CARDS */
    .bb-kr-card {
      background: rgba(255, 0, 51, 0.06) !important;
      border-left: 3px solid #ff0033 !important;
      padding: 12px 14px !important;
      margin-bottom: 12px !important;
      border-radius: 0 6px 6px 0 !important;
      transition: background 0.2s ease !important;
    }

    .bb-kr-card:hover {
      background: rgba(255, 0, 51, 0.12) !important;
    }

    .bb-kr-title {
      color: #00d8ff !important;
      font-weight: bold !important;
      font-size: 0.88rem !important;
      margin: 0 0 4px 0 !important;
    }

    .bb-kr-meta {
      color: #dddddd !important;
      font-size: 0.78rem !important;
      margin: 2px 0 !important;
    }

    .bb-kr-tag {
      display: inline-block !important;
      background: rgba(0, 216, 255, 0.15) !important;
      border: 1px solid #00d8ff !important;
      color: #00d8ff !important;
      font-size: 0.65rem !important;
      padding: 2px 6px !important;
      border-radius: 3px !important;
      margin-top: 6px !important;
      font-weight: bold !important;
    }
  `;

  const styleTag = document.createElement('style');
  styleTag.type = 'text/css';
  styleTag.innerText = bbStyles;
  document.head.appendChild(styleTag);

  // 2. CREATE MODAL OVERLAY
  function initBBModal() {
    if (document.getElementById('bbModalOverlay')) return;

    const modal = document.createElement('div');
    modal.id = 'bbModalOverlay';
    modal.className = 'bb-modal-overlay';
    modal.innerHTML = `
      <div class="bb-modal-box">
        <div class="bb-modal-header">
          <h3 class="bb-modal-title">👁 BEYOND BIRTHDAY ARCHIVE</h3>
          <button class="bb-modal-close" id="bbModalClose" title="Close">&times;</button>
        </div>
        <div class="bb-modal-subtitle">"Records kept beyond Encora's database..." — Off-Encora Korean Masters</div>
        <div class="bb-modal-content">
          <!-- RECORDING 1 -->
          <div class="bb-kr-card">
            <div class="bb-kr-title">Death Note: The Musical (데스노트)</div>
            <div class="bb-kr-meta">Cast: Hong Kwang-ho (Light), Kim Jun-su (L), Kang Hong-seok (Ryuk)</div>
            <div class="bb-kr-meta">Details: Korean Production | Untracked Audio (.m4a)</div>
            <span class="bb-kr-tag">KOREAN MASTER #1</span>
          </div>

          <!-- RECORDING 2 -->
          <div class="bb-kr-card">
            <div class="bb-kr-title">Frankenstein (프랑켄슈타인)</div>
            <div class="bb-kr-meta">Cast: Yoo Jun-sang (Victor), Park Eun-tae (Henri)</div>
            <div class="bb-kr-meta">Details: Korean Production | HD Video (.mp4)</div>
            <span class="bb-kr-tag">KOREAN MASTER #2</span>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('bbModalClose').addEventListener('click', () => {
      modal.classList.remove('open');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });
  }

  // 3. INJECT EYE BUTTON INTO NAVIGATION/CONTROLS
  function initBBButton() {
    if (document.getElementById('bbEyeBtn')) return;

    // Target control row or header buttons
    const targetParent = document.querySelector('.controls') || document.querySelector('header') || document.body;

    const btn = document.createElement('button');
    btn.id = 'bbEyeBtn';
    btn.className = 'bb-eye-btn';
    btn.title = 'Beyond Birthday: Off-Encora Korean Masters';
    btn.innerHTML = `<img src="art/B_cover_eye-removebackgrounds-ai.png" alt="Beyond Birthday Eye">`;

    btn.addEventListener('click', () => {
      document.getElementById('bbModalOverlay')?.classList.add('open');
    });

    targetParent.appendChild(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initBBModal();
      initBBButton();
    });
  } else {
    initBBModal();
    initBBButton();
  }

})();

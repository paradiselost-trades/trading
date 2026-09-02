let allData = [];
let currentFilteredItems = [];
let currentFilter = 'all';
let currentCategory = 'all';
let searchTimeout = null;
let currentRenderToken = 0;

// Pagination configuration
const BATCH_SIZE = 25;
let displayedCount = 0;
let observer = null;

// LocalStorage Trade Cart State
const STORAGE_KEY = "bootleg_trade_cart";
let tradeCart = loadCartFromStorage();

/* ============================================================
   FLOATING CART BUTTON MOUNT GUARANTEE
============================================================ */
function ensureCartButtonInBody() {
  let cartBtn = document.getElementById("cart-toggle-btn");
  if (!cartBtn) {
    cartBtn = document.createElement("button");
    cartBtn.id = "cart-toggle-btn";
    cartBtn.className = "cart-toggle-btn";
    cartBtn.type = "button";
    document.body.appendChild(cartBtn);
    cartBtn.addEventListener("click", openDrawer);
  } else if (cartBtn.parentElement !== document.body) {
    document.body.appendChild(cartBtn);
  }

  const countEl = document.getElementById("cart-count");
  if (countEl) {
    countEl.innerText = tradeCart.length;
  } else {
    cartBtn.innerHTML = `🛒 Trade Request (<span id="cart-count">${tradeCart.length}</span>)`;
  }
}

/* ============================================================
   MAIN DOM & APPLICATION INITIALIZATION
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  setupIntersectionObserver();
  ensureCartButtonInBody();
  setupPaletteDrawer();

  // Initialize saved theme & maintain visual glow
  const savedTheme = localStorage.getItem('paradiseThemeActive');
  if (savedTheme === 'true') {
    document.documentElement.setAttribute('data-theme', 'paradise-lost');
    document.documentElement.classList.add('paradise-lost');
    document.body.classList.add('paradise-lost');
  }
  updateButtonLabel();

  const paradiseBtn = document.getElementById("paradise-btn");
  if (paradiseBtn) {
    paradiseBtn.addEventListener("click", triggerParadiseLost);
  }

  // No-Eyestrain toggle engine
  const eyestrainBtn = document.getElementById("toggle-eyestrain-btn");
  if (eyestrainBtn) {
    if (localStorage.getItem("no_eyestrain_mode") === "enabled") {
      document.body.classList.add("no-eyestrain");
      eyestrainBtn.innerText = "📺 Enable CRT Effects";
    }

    eyestrainBtn.addEventListener("click", () => {
      document.body.classList.toggle("no-eyestrain");
      const isNoEyestrain = document.body.classList.contains("no-eyestrain");
      localStorage.setItem("no_eyestrain_mode", isNoEyestrain ? "enabled" : "disabled");
      eyestrainBtn.innerText = isNoEyestrain ? "📺 Enable CRT Effects" : "👁️ Toggle No-Eyestrain Mode";
    });
  }

  // Parse Collection CSV
  if (window.Papa) {
    Papa.parse("./list.csv", {
      download: true,
      header: true,
      skipEmptyLines: "greedy",
      transformHeader: h => h.trim(),
      complete: function(results) {
        allData = results.data.map(item => {
          item._searchIndex = `${getValByName(item, "Show")} ${getValByName(item, "Date")} ${getValByName(item, "Cast")} ${getValByName(item, "Master")} ${getValByName(item, "Tour", "Location")} ${getValByName(item, "Venue")}`.toLowerCase();
          return item;
        });
        
        applyFiltersAndRender();
        updateCartUI();
      },
      error: function() {
        const stats = document.getElementById('stats');
        if (stats) stats.innerText = "Upload your 'list.csv' file to display your collection!";
      }
    });
  }

  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        applyFiltersAndRender();
      }, 120);
    });
  }

  document.addEventListener("click", (e) => {
    const filterBtn = e.target.closest(".filter-btn");
    const catBtn = e.target.closest(".cat-btn");

    if (filterBtn) {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      filterBtn.classList.add("active");
      currentFilter = filterBtn.getAttribute("data-filter") || 'all';
      applyFiltersAndRender();
    } else if (catBtn) {
      document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
      catBtn.classList.add("active");
      currentCategory = catBtn.getAttribute("data-category") || 'all';
      applyFiltersAndRender();
    }
  });

  const cardContainer = document.getElementById("card-container");
  if (cardContainer) {
    cardContainer.addEventListener("click", (e) => {
      const addBtn = e.target.closest(".add-cart-btn");
      const copyBtn = e.target.closest(".copy-card-btn");

      if (addBtn) {
        const idx = parseInt(addBtn.getAttribute("data-index"), 10);
        const item = currentFilteredItems[idx];
        if (item) toggleCartItem(item, addBtn);
      } else if (copyBtn) {
        const idx = parseInt(copyBtn.getAttribute("data-index"), 10);
        const item = currentFilteredItems[idx];
        if (item) copySingleItemSummary(item, copyBtn);
      }
    });
  }

  const scrollTopBtn = document.getElementById("scroll-top-btn");
  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      scrollTopBtn.classList.toggle("visible", window.scrollY > 300);
    }, { passive: true });

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const overlay = document.getElementById("drawer-overlay");
  const closeDrawerBtn = document.getElementById("close-drawer-btn");
  if (closeDrawerBtn) closeDrawerBtn.addEventListener("click", closeDrawer);
  if (overlay) overlay.addEventListener("click", closeDrawer);
  
  const clearCartBtn = document.getElementById("clear-cart-btn");
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
      tradeCart = [];
      saveCartToStorage();
      updateCartUI();
      applyFiltersAndRender();
    });
  }

  const copyTradeBtn = document.getElementById("copy-trade-btn");
  if (copyTradeBtn) copyTradeBtn.addEventListener("click", copyTradeRequest);

  const emailBtn = document.getElementById("email-trade-btn");
  if (emailBtn) {
    emailBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (!tradeCart.length) {
        alert("Your trade request is empty! Add items to your list first.");
        return;
      }
      openGothicToast();
    });
  }
});

/* ============================================================
   INFERNAL NINE CIRCLES PALETTE TOGGLE
============================================================ */
function setupPaletteDrawer() {
  const toggleBtn = document.getElementById("palette-toggle-btn");
  const palette = document.getElementById("infernal-palette");

  if (toggleBtn && palette) {
    toggleBtn.addEventListener("click", () => {
      palette.classList.toggle("closed");
      const isClosed = palette.classList.contains("closed");
      const label = toggleBtn.querySelector(".sigil-label");
      if (label) {
        label.textContent = isClosed ? "UNVEIL THE NINE CIRCLES" : "CONCEAL THE NINE CIRCLES";
      }
    });
  }
}

/* ============================================================
   INTERSECTION OBSERVER (INFINITE SCROLL ENGINE)
============================================================ */
function setupIntersectionObserver() {
  const sentinel = document.getElementById("scroll-sentinel");
  if (!sentinel) return;

  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && displayedCount < currentFilteredItems.length) {
      appendNextBatch();
    }
  }, { rootMargin: "400px", threshold: 0.1 });

  observer.observe(sentinel);
}

function applyFiltersAndRender() {
  const searchEl = document.getElementById("search-input");
  const query = searchEl ? searchEl.value.toLowerCase().trim() : "";
  currentRenderToken++;
    
  currentFilteredItems = allData.filter(item => {
    const displayType = getMediaType(item);
    if (currentFilter !== 'all' && displayType.toLowerCase() !== currentFilter.toLowerCase()) {
      return false;
    }

    if (currentCategory !== 'all') {
      const tour = getValByName(item, "Tour", "Location", "City").toLowerCase();
      const venue = getValByName(item, "Venue", "Theater", "Theatre").toLowerCase();
      const locationText = `${tour} ${venue}`;

      if (currentCategory === 'off-broadway' && !locationText.includes("off-broadway") && !locationText.includes("off broadway")) return false;
      if (currentCategory === 'broadway' && (locationText.includes("off-broadway") || !locationText.includes("broadway"))) return false;
      if (currentCategory === 'west end' && !locationText.includes("west end")) return false;
    }

    return !(query && !item._searchIndex.includes(query));
  });

  const stats = document.getElementById('stats');
  if (stats) stats.innerText = `SHOWING ${currentFilteredItems.length} OF ${allData.length} ITEMS`;

  const container = document.getElementById("card-container");
  if (container) {
    container.innerHTML = "";
    displayedCount = 0;
    if (currentFilteredItems.length > 0) {
      appendNextBatch(30);
    }
  }
}

function appendNextBatch(count = BATCH_SIZE) {
  const container = document.getElementById("card-container");
  if (!container) return;

  const nextSlice = currentFilteredItems.slice(displayedCount, displayedCount + count);
  if (nextSlice.length === 0) return;

  const fragment = document.createDocumentFragment();

  nextSlice.forEach((item, i) => {
    const globalIndex = displayedCount + i;
    const show = getValByName(item, "Show") || "Unknown Show";
    const date = getValByName(item, "Date");
    const matineeEve = getValByName(item, "Matinée / Evening", "Matinee / Evening");
    const showTime = matineeEve ? ` (${matineeEve})` : "";
    
    const format = getFormat(item);
    const sizeVal = getFileSize(item);
    const displayFormatStr = format && sizeVal ? `${format} [${sizeVal}]` : (format || sizeVal);

    const tour = getValByName(item, "Tour", "Location", "City");
    const venue = getValByName(item, "Venue", "Theater", "Theatre");
    const master = getValByName(item, "Master");
    const cast = getValByName(item, "Cast");
    const masterNotes = getValByName(item, "Master Notes");
    const tradingNotes = getValByName(item, "Trading Notes");
    const myNotes = getValByName(item, "Notes", "My Notes");

    const displayType = getMediaType(item);
    const formatBadgeHTML = displayFormatStr ? `<span class="badge badge-format">${displayFormatStr}</span>` : '';
    const typeBadgeHTML = `<span class="badge badge-${displayType.toLowerCase().replace(/[^a-z0-9]/g, '-')}">${displayType}</span>`;
    
    const nftDateStr = getValByName(item, "NFT Date");
    const nftForeverVal = getValByName(item, "NFT Forever").toLowerCase();
    
    const nftForever = (
      nftForeverVal === "true" || nftForeverVal === "yes" || nftForeverVal === "1" || 
      nftDateStr.toLowerCase().includes("forever") || nftDateStr.toLowerCase() === "nftf"
    );

    const locationParts = [tour, venue].filter(Boolean).join(" - ");
    let nftBadgeHTML = '';
    let isNFTActive = false;

    if (nftForever) {
      isNFTActive = true;
      nftBadgeHTML = `<br><span class="nft-active">⛔ NFT FOREVER</span>`;
    } else if (nftDateStr) {
      if (isNftStillActive(nftDateStr)) {
        isNFTActive = true;
        nftBadgeHTML = `<br><span class="nft-active">⛔ NFT UNTIL: ${nftDateStr}</span>`;
      } else {
        nftBadgeHTML = `<br><span class="nft-passed">✅ PAST NFT (${nftDateStr})</span>`;
      }
    }

    const cardClass = `item-card ${isNFTActive ? 'card-nft-active nft-card-locked' : 'card-standard'}`;
    const itemInCart = isInCart(item);

    const card = document.createElement("div");
    card.className = cardClass;
    card.innerHTML = `
      <div class="card-header">
        <div class="card-title">${show}</div>
        <div class="card-badges" style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
          ${formatBadgeHTML}
          ${typeBadgeHTML}
        </div>
      </div>
      
      <div class="card-meta">
        ${date ? `📅 ${date}${showTime}` : ''} 
        ${locationParts ? `📍 ${locationParts}` : ''}
        ${master ? `<br>🎥 <strong>Master:</strong> ${master}` : ''}
        ${nftBadgeHTML}
      </div>

      ${cast ? `<div class="card-cast"><strong>CAST:</strong> ${cast}</div>` : ''}
      ${masterNotes ? `<div class="card-notes"><strong>MASTER NOTES:</strong> ${masterNotes}</div>` : ''}
      ${tradingNotes ? `<div class="card-notes"><strong>TRADING NOTES:</strong> ${tradingNotes}</div>` : ''}
      ${myNotes ? `<div class="card-notes"><strong>NOTES:</strong> ${myNotes}</div>` : ''}

      <div class="card-actions">
        <button type="button" class="add-cart-btn ${itemInCart ? 'in-cart' : ''}" data-index="${globalIndex}">
          ${itemInCart ? '✓ In Request' : '+ Add to Trade'}
        </button>
        <button type="button" class="copy-card-btn" data-index="${globalIndex}">📋 Copy Info</button>
      </div>
    `;
    fragment.appendChild(card);
  });

  requestAnimationFrame(() => {
    container.appendChild(fragment);
    displayedCount += nextSlice.length;
    ensureCartButtonInBody();
  });
}

/* ============================================================
   LOCALSTORAGE CART & HELPERS
============================================================ */
function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
}

function saveCartToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tradeCart));
  } catch (e) {}
}

function openDrawer() {
  document.getElementById("trade-drawer")?.classList.add("open");
  document.getElementById("drawer-overlay")?.classList.add("open");
}

function closeDrawer() {
  document.getElementById("trade-drawer")?.classList.remove("open");
  document.getElementById("drawer-overlay")?.classList.remove("open");
}

function getItemKey(item) {
  return `${getValByName(item, "Show")}|${getValByName(item, "Date")}|${getValByName(item, "Master")}`.toLowerCase();
}

function isInCart(item) {
  const key = getItemKey(item);
  return tradeCart.some(c => c.key === key);
}

function toggleCartItem(item, buttonEl) {
  const key = getItemKey(item);
  const existingIdx = tradeCart.findIndex(c => c.key === key);

  if (existingIdx > -1) {
    tradeCart.splice(existingIdx, 1);
    if (buttonEl) {
      buttonEl.innerText = "+ Add to Trade";
      buttonEl.classList.remove("in-cart");
    }
  } else {
    executeAddToCart(item, buttonEl);
  }
  saveCartToStorage();
  updateCartUI();
}

function executeAddToCart(item, buttonEl) {
  const fmt = getFormat(item);
  const sz = getFileSize(item);
  const displayFmt = (fmt && sz) ? `${fmt} [${sz}]` : (fmt || sz || getMediaType(item));

  tradeCart.push({
    key: getItemKey(item),
    show: getValByName(item, "Show") || "Unknown Show",
    date: getValByName(item, "Date") || "Unknown Date",
    type: getMediaType(item),
    format: displayFmt,
    tour: getValByName(item, "Tour", "Location", "City"),
    venue: getValByName(item, "Venue", "Theater", "Theatre"),
    master: getValByName(item, "Master")
  });

  if (buttonEl) {
    buttonEl.innerText = "✓ In Request";
    buttonEl.classList.add("in-cart");
  }
}

function generateFormattedText() {
  const itemsText = tradeCart.map((item, i) => {
    const location = [item.tour, item.venue].filter(Boolean).join(" - ");
    let line = `${i + 1}. ${item.show} - ${item.date} (${item.format})`;
    if (location) line += ` | ${location}`;
    if (item.master) line += ` | Master: ${item.master}`;
    return line;
  }).join("\n");

  return `Hi!\n\nI would like to initiate a trade for the following items:\n\n${itemsText}\n\nMy Trading List: [INSERT LINK HERE]\n\nThanks!`;
}

function updateCartUI() {
  ensureCartButtonInBody();
  const container = document.getElementById("cart-items-container");
  const countEl = document.getElementById("cart-count");
  if (countEl) countEl.innerText = tradeCart.length;

  if (!container) return;

  if (tradeCart.length === 0) {
    container.innerHTML = `<p class="empty-cart-msg">No items added yet.</p>`;
    return;
  }

  const fragment = document.createDocumentFragment();
  tradeCart.forEach(item => {
    const cartCard = document.createElement("div");
    cartCard.className = "cart-item-row";
    cartCard.innerHTML = `
      <div class="cart-item-details">
        <strong>${item.show}</strong>
        <span>📅 ${item.date} (${item.format})</span>
      </div>
      <button type="button" class="remove-cart-item" data-key="${item.key}">&times;</button>
    `;

    cartCard.querySelector(".remove-cart-item").addEventListener("click", () => {
      tradeCart = tradeCart.filter(c => c.key !== item.key);
      saveCartToStorage();
      updateCartUI();
      applyFiltersAndRender();
    });

    fragment.appendChild(cartCard);
  });

  container.innerHTML = "";
  container.appendChild(fragment);
}

function copyTradeRequest() {
  if (!tradeCart.length) return;
  navigator.clipboard.writeText(generateFormattedText()).then(() => {
    const btn = document.getElementById("copy-trade-btn");
    if (btn) {
      btn.innerText = "✅ Copied Request!";
      setTimeout(() => { btn.innerText = "📋 Copy Request"; }, 2000);
    }
  });
}

/* ============================================================
   GOTHIC TOAST & MODAL ENGINE
============================================================ */
function openGothicToast() {
  const toast = document.getElementById("gothic-toast");
  if (!toast) return;

  toast.classList.remove("gothic-toast-hidden");
  toast.classList.add("gothic-toast-visible");

  const recipient = "tradingtreelost@gmail.com";
  const subject = `Trade Request (${tradeCart.length} Items)`;
  const bodyText = generateFormattedText();

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
  const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;

  const gmailBtn = document.getElementById("toast-gmail-btn");
  if (gmailBtn) {
    gmailBtn.onclick = () => {
      window.open(gmailUrl, "_blank");
      closeGothicToast();
    };
  }

  const mailBtn = document.getElementById("toast-mail-btn");
  if (mailBtn) {
    mailBtn.onclick = () => {
      window.location.href = mailtoUrl;
      closeGothicToast();
    };
  }

  const closeBtn = document.getElementById("toast-close-btn");
  if (closeBtn) closeBtn.onclick = closeGothicToast;
}

function closeGothicToast() {
  const toast = document.getElementById("gothic-toast");
  if (toast) {
    toast.classList.remove("gothic-toast-visible");
    toast.classList.add("gothic-toast-hidden");
  }
}

function getValByName(item, ...names) {
  if (!item) return "";
  for (const name of names) {
    for (const key in item) {
      if (key.trim().toLowerCase() === name.toLowerCase()) {
        const val = item[key];
        if (val !== undefined && val !== null) return val.toString().trim();
      }
    }
  }
  return "";
}

function getFileSize(item) {
  const val = getValByName(item, "File Size", "Size");
  if (val) {
    const match = val.match(/\b\d+(\.\d+)?\s*(gb|mb|kb|tb)\b/i);
    if (match) return match[0].toUpperCase();
  }
  return "";
}

function getFormat(item) {
  const fmt = getValByName(item, "Trader Format", "Release Format", "Format", "Media Format");
  if (fmt) return fmt.toUpperCase();
  return "";
}

function getMediaType(item) {
  const audioVideo = getValByName(item, "Audio / Video", "Audio/Video", "Type").toLowerCase();
  if (audioVideo.includes("both") || (audioVideo.includes("audio") && audioVideo.includes("video"))) return "VIDEO / AUDIO";
  if (audioVideo.includes("audio")) return "AUDIO";
  return "VIDEO";
}

function parseEncoraDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr.trim().replace(/\./g, '-'));
  return isNaN(d.getTime()) ? null : d;
}

function isNftStillActive(dateStr) {
  if (!dateStr) return false;
  const parsedDate = parseEncoraDate(dateStr);
  return parsedDate ? parsedDate >= new Date().setHours(0,0,0,0) : false;
}

function copySingleItemSummary(item, buttonElement) {
  const show = getValByName(item, "Show") || "Unknown Show";
  const date = getValByName(item, "Date") || "Unknown Date";
  const master = getValByName(item, "Master") || "Unknown Master";
  const text = `${show} - ${date} | Master: ${master}`;

  navigator.clipboard.writeText(text).then(() => {
    const originalText = buttonElement.innerText;
    buttonElement.innerText = "✅ Copied!";
    setTimeout(() => { buttonElement.innerText = originalText; }, 2000);
  });
}

function triggerParadiseLost() {
  const isParadise = document.documentElement.getAttribute('data-theme') === 'paradise-lost';
  if (isParadise) {
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.classList.remove('paradise-lost');
    document.body.classList.remove('paradise-lost');
    localStorage.setItem('paradiseThemeActive', 'false');
  } else {
    document.documentElement.setAttribute('data-theme', 'paradise-lost');
    document.documentElement.classList.add('paradise-lost');
    document.body.classList.add('paradise-lost');
    localStorage.setItem('paradiseThemeActive', 'true');
  }
  updateButtonLabel();
}

function updateButtonLabel() {
  const btn = document.getElementById('paradise-btn');
  const isParadise = document.documentElement.getAttribute('data-theme') === 'paradise-lost';
  if (btn) {
    btn.textContent = isParadise ? '❖ Legacy Model (Cyberpunk)' : '❖ Ascend to Paradise';
  }
}

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

let originalDocumentTitle = document.title;

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

  // Initialize theme based on local storage
  const savedTheme = localStorage.getItem('paradiseThemeActive');
  if (savedTheme !== 'false') {
    document.documentElement.setAttribute('data-theme', 'paradise-lost');
    document.documentElement.classList.add('paradise-lost', 'paradise-lost-mode');
    document.body.classList.add('paradise-lost', 'paradise-lost-mode');
  }
  updateButtonLabel();

  // ------------------------------------------------------------
  // UNVEIL / CONCEAL NINE CIRCLES TOGGLE
  // ------------------------------------------------------------
  const unveilBtn = document.querySelector(".unveil-btn") || document.getElementById("unveil-btn");
  const nineCirclesSection = document.querySelector(".nine-circles") || document.getElementById("nine-circles");

  if (unveilBtn && nineCirclesSection) {
    unveilBtn.addEventListener("click", (e) => {
      e.preventDefault();
      
      // Toggle hidden state
      const isHidden = nineCirclesSection.classList.toggle("hidden");
      
      // Update button text
      unveilBtn.innerText = isHidden 
        ? "‡ UNVEIL THE NINE CIRCLES ‡" 
        : "‡ CONCEAL THE NINE CIRCLES ‡";
    });
  }

  // ------------------------------------------------------------
  // NO-EYESTRAIN TOGGLE ENGINE
  // ------------------------------------------------------------
  const eyestrainBtn = document.getElementById("toggle-eyestrain-btn");

  if (eyestrainBtn) {
    if (localStorage.getItem("no_eyestrain_mode") === "enabled") {
      document.body.classList.add("no-eyestrain");
      eyestrainBtn.innerText = "📺 Enable CRT Effects";
    }

    eyestrainBtn.addEventListener("click", () => {
      document.body.classList.toggle("no-eyestrain");
      const isNoEyestrain = document.body.classList.contains("no-eyestrain");

      if (isNoEyestrain) {
        localStorage.setItem("no_eyestrain_mode", "enabled");
        eyestrainBtn.innerText = "📺 Enable CRT Effects";
      } else {
        localStorage.setItem("no_eyestrain_mode", "disabled");
        eyestrainBtn.innerText = "👁️ Toggle No-Eyestrain Mode";
      }
    });
  }

  Papa.parse("./list.csv", {
    download: true,
    header: true,
    skipEmptyLines: "greedy",
    delimiter: "",
    transformHeader: function(header) {
      return header.replace(/[\ufeff\u200b\r\n]/g, '').trim();
    },
    complete: function(results) {
      allData = results.data.map(item => {
        item._searchIndex = `${getValByName(item, "Show")} ${getValByName(item, "Date")} ${getValByName(item, "Cast")} ${getValByName(item, "Master")} ${getValByName(item, "Tour", "Location")} ${getValByName(item, "Venue")}`.toLowerCase();
        return item;
      });
      
      applyFiltersAndRender();
      updateCartUI();
    },
    error: function(err) {
      const stats = document.getElementById('stats');
      if (stats) stats.innerText = "Upload your 'list.csv' file to display your collection!";
    }
  });

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
      currentFilter = filterBtn.getAttribute("data-filter");
      applyFiltersAndRender();
    } else if (catBtn) {
      document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
      catBtn.classList.add("active");
      currentCategory = catBtn.getAttribute("data-category");
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
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (window.scrollY > 300) {
            scrollTopBtn.classList.add("visible");
          } else {
            scrollTopBtn.classList.remove("visible");
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const overlay = document.getElementById("drawer-overlay");
  const cartToggleBtn = document.getElementById("cart-toggle-btn");
  if (cartToggleBtn) cartToggleBtn.addEventListener("click", openDrawer);
  
  const closeDrawerBtn = document.getElementById("close-drawer-btn");
  if (closeDrawerBtn) closeDrawerBtn.addEventListener("click", closeDrawer);
  
  if (overlay) overlay.addEventListener("click", closeDrawer);
  
  const clearCartBtn = document.getElementById("clear-cart-btn");
  if (clearCartBtn) {
    clearClearCartBtn();
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

      const recipient = "tradingtreelost@gmail.com";
      const subject = `Trade Request (${tradeCart.length} Items)`;
      const bodyText = generateFormattedText();
      
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
      const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(bodyText).catch(() => {});
      }

      setTimeout(() => {
        const useGmail = confirm(
          "📋 Request COPIED to clipboard!\n\n" +
          "• Click 'OK' to open Gmail Web.\n" +
          "• Click 'Cancel' for Default Mail App."
        );
        if (useGmail) window.open(gmailUrl, "_blank");
        else window.location.href = mailtoUrl;
      }, 10);
    });
  }
});

function clearClearCartBtn() {
  const clearCartBtn = document.getElementById("clear-cart-btn");
  if (!clearCartBtn) return;
  clearCartBtn.addEventListener("click", () => {
    tradeCart = [];
    saveCartToStorage();
    updateCartUI();
    applyFiltersAndRender();
  });
}

/* ============================================================
   INTERSECTION OBSERVER (INFINITE SCROLL ENGINE)
============================================================ */
function setupIntersectionObserver() {
  const sentinel = document.getElementById("scroll-sentinel");
  if (!sentinel) return;

  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      if (displayedCount < currentFilteredItems.length) {
        appendNextBatch();
      }
    }
  }, {
    root: null,
    rootMargin: "400px",
    threshold: 0.1
  });

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

      if (currentCategory === 'off-broadway') {
        if (!locationText.includes("off-broadway") && !locationText.includes("off broadway")) return false;
      } else if (currentCategory === 'broadway') {
        if (locationText.includes("off-broadway") || locationText.includes("off broadway")) return false;
        if (!locationText.includes("broadway")) return false;
      } else if (currentCategory === 'west end') {
        if (!locationText.includes("west end")) return false;
      }
    }

    if (query && !item._searchIndex.includes(query)) {
      return false;
    }

    return true;
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

    let displayFormatStr = "";
    if (format && sizeVal) {
      displayFormatStr = `${format} [${sizeVal}]`;
    } else if (format) {
      displayFormatStr = format;
    } else if (sizeVal) {
      displayFormatStr = sizeVal;
    }

    const tour = getValByName(item, "Tour", "Location", "City");
    const venue = getValByName(item, "Venue", "Theater", "Theatre");
    const master = getValByName(item, "Master");
    const cast = getValByName(item, "Cast");
    const masterNotes = getValByName(item, "Master Notes");
    const tradingNotes = getValByName(item, "Trading Notes");
    const myNotes = getValByName(item, "My Notes");

    const displayType = getMediaType(item);
    const formatBadgeHTML = displayFormatStr ? `<span class="badge badge-format">${displayFormatStr}</span>` : '';
    const safeTypeClass = displayType.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const typeBadgeHTML = `<span class="badge badge-${safeTypeClass}">${displayType}</span>`;
    
    const nftDateStr = getValByName(item, "NFT Date");
    const nftForeverVal = getValByName(item, "NFT Forever").toLowerCase();
    
    let nftForever = (
      nftForeverVal === "true" || nftForeverVal === "yes" || nftForeverVal === "1" || 
      nftForeverVal === "nftf" || nftForeverVal.includes("forever") ||
      nftDateStr.toLowerCase().includes("forever") || nftDateStr.toLowerCase() === "nftf"
    );

    const locationParts = [tour, venue].filter(Boolean).join(" - ");
    let nftBadgeHTML = '';
    let isNFTActive = false;

    if (nftForever) {
      isNFTActive = true;
      nftBadgeHTML = `<br><span class="nft-active">⛔ NFT FOREVER</span>`;
    } else if (nftDateStr !== "") {
      if (isNftStillActive(nftDateStr)) {
        isNFTActive = true;
        nftBadgeHTML = `<br><span class="nft-active">⛔ NFT UNTIL: ${nftDateStr}</span>`;
      } else {
        isNFTActive = false;
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
  const fmt = getFormat(item) || getFileSize(item) || getMediaType(item);
  return `${getValByName(item, "Show")}|${getValByName(item, "Date")}|${getValByName(item, "Master")}|${fmt}`.toLowerCase();
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
    saveCartToStorage();
    updateCartUI();
  } else {
    executeAddToCart(item, buttonEl);
  }
}

function executeAddToCart(item, buttonEl) {
  const fmt = getFormat(item);
  const sz = getFileSize(item);
  let displayFmt = (fmt && sz) ? `${fmt} [${sz}]` : (fmt || sz || getMediaType(item));

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

  saveCartToStorage();
  updateCartUI();
}

function generateFormattedText() {
  const itemsText = tradeCart.map((item, i) => {
    const location = [item.tour, item.venue].filter(Boolean).join(" - ");
    let line = `${i + 1}. ${item.show} - ${item.date} (${item.format})`;
    if (location) line += ` | ${location}`;
    if (item.master) line += ` | Master: ${item.master}`;
    return line;
  }).join("\n");

  return [
    "Hi!",
    "I would like to initiate a trade for the following items from your collection:",
    "",
    itemsText,
    "",
    "My Trading List / Link: [INSERT YOUR LINK HERE]",
    "",
    "Thanks!"
  ].join("\n");
}

function updateCartUI() {
  ensureCartButtonInBody();
  const container = document.getElementById("cart-items-container");
  const countEl = document.getElementById("cart-count");
  const videoCountEl = document.getElementById("cart-video-count");
  const audioCountEl = document.getElementById("cart-audio-count");

  if (countEl) countEl.innerText = tradeCart.length;

  let videos = 0;
  let audios = 0;

  if (!container) return;

  if (tradeCart.length === 0) {
    container.innerHTML = `<p class="empty-cart-msg">No items added yet. Click "+ Add to Trade" on any item card!</p>`;
    if (videoCountEl) videoCountEl.innerText = "0";
    if (audioCountEl) audioCountEl.innerText = "0";
    return;
  }

  const fragment = document.createDocumentFragment();

  tradeCart.forEach(item => {
    if (item.type.includes("VIDEO")) videos++;
    if (item.type.includes("AUDIO")) audios++;

    const location = [item.tour, item.venue].filter(Boolean).join(" - ");
    
    const cartCard = document.createElement("div");
    cartCard.className = "cart-item-row";

    cartCard.innerHTML = `
      <div class="cart-item-details">
        <strong>${item.show}</strong>
        <span>📅 ${item.date} (${item.format}) ${location ? `| 📍 ${location}` : ''}</span>
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

  requestAnimationFrame(() => {
    container.innerHTML = "";
    container.appendChild(fragment);
    if (videoCountEl) videoCountEl.innerText = videos;
    if (audioCountEl) audioCountEl.innerText = audios;
  });
}

function copyTradeRequest() {
  if (!tradeCart.length) return;
  const text = generateFormattedText();
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById("copy-trade-btn");
    if (btn) {
      btn.innerText = "✅ Copied Request!";
      setTimeout(() => { btn.innerText = "📋 Copy Request"; }, 2000);
    }
  });
}

function getValByName(item, ...names) {
  if (!item) return "";
  const keys = Object.keys(item);
  for (const name of names) {
    const target = name.toLowerCase().replace(/[^a-z0-9]/g, '');
    for (const key of keys) {
      if (key.toLowerCase().replace(/[^a-z0-9]/g, '') === target) {
        const val = item[key];
        if (val !== undefined && val !== null) {
          const str = val.toString().trim();
          if (str) return str;
        }
      }
    }
  }
  return "";
}

function getFileSize(item) {
  if (!item) return "";

  const sizeFields = ["File Size", "Size", "Filesize"];
  for (const f of sizeFields) {
    const val = getValByName(item, f);
    if (val) {
      const match = val.match(/\b\d+(\.\d+)?\s*(gb|mb|kb|tb)\b/i);
      if (match) return match[0].toUpperCase();
    }
  }

  for (const key in item) {
    const val = item[key];
    if (typeof val === 'string' && val) {
      const match = val.match(/\b\d+(\.\d+)?\s*(gb|mb|kb|tb)\b/i);
      if (match) return match[0].toUpperCase();
    }
  }

  return "";
}

function getFormat(item) {
  if (!item) return "";

  const candidateKeys = [
    "Trader Format", "Release Format", "File Format", 
    "Media Format", "Format", "Container", "Extension", 
    "Video Format", "Audio Format"
  ];

  let rawFormat = candidateKeys.map(k => getValByName(item, k)).find(v => Boolean(v)) || "";

  if (!rawFormat) {
    const formatRegex = /\b(vob|mp4|mkv|mov|avi|iso|mp3|m4a|flac|wav|ts|m2ts|wmv|mpg|mpeg|tracked|untracked)\b/i;
    for (const key in item) {
      const val = item[key];
      if (typeof val === 'string' && formatRegex.test(val)) {
        const match = val.match(formatRegex);
        if (match) {
          rawFormat = match[0].toUpperCase();
          break;
        }
      }
    }
  }

  if (!rawFormat) return "";

  let cleaned = rawFormat.replace(/\b\d+(\.\d+)?\s*(gb|mb|kb|tb)\b/gi, "");
  cleaned = cleaned.replace(/\b(video|audio|both|mixed)\b/gi, "");
  cleaned = cleaned
    .replace(/[\(\[\{\)\]\}]/g, " ")
    .replace(/[-–—/,\.\:]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned;
}

function getMediaType(item) {
  const audioVideo = getValByName(item, "Audio / Video", "Audio/Video").toLowerCase();
  const typeRaw = getValByName(item, "Type").toLowerCase();
  
  const rawFmt = (
    getValByName(item, "Trader Format") + " " + 
    getValByName(item, "Release Format") + " " + 
    getValByName(item, "Format")
  ).toLowerCase();

  const isAudio = audioVideo.includes("audio") || typeRaw.includes("audio") || rawFmt.match(/\b(audio|mp3|m4a|wav|flac|tracked|cd)\b/);
  const isVideo = audioVideo.includes("video") || typeRaw.includes("video") || rawFmt.match(/\b(video|mp4|vob|mov|mkv|avi|iso)\b/);

  if (audioVideo.includes("both") || audioVideo.includes("mixed") || audioVideo.includes("&") || audioVideo.includes("/") || (isAudio && isVideo)) {
    return "VIDEO / AUDIO";
  }
  if (isAudio) return "AUDIO";
  return "VIDEO";
}

function parseEncoraDate(dateStr) {
  if (!dateStr) return null;
  const clean = dateStr.trim().replace(/\./g, '-');
  const parts = clean.split(/[-/]/);

  if (parts.length === 3) {
    let day, month, year;
    if (parts[0].length === 4) {
      year = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10) - 1;
      day = parseInt(parts[2], 10);
    } else if (parts[2].length === 4) {
      year = parseInt(parts[2], 10);
      day = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10) - 1;
    }
    if (year && month !== undefined && day) return new Date(year, month, day);
  }

  const d = new Date(clean);
  return isNaN(d.getTime()) ? null : d;
}

function isNftStillActive(dateStr) {
  if (!dateStr) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lower = dateStr.toLowerCase();
  if (lower.includes("forever") || lower === "nftf" || lower.includes("master")) return true;

  const parsedDate = parseEncoraDate(dateStr);
  return parsedDate ? parsedDate >= today : false;
}

function copySingleItemSummary(item, buttonElement) {
  const show = getValByName(item, "Show") || "Unknown Show";
  const date = getValByName(item, "Date") || "Unknown Date";
  const tour = getValByName(item, "Tour", "Location", "City");
  const venue = getValByName(item, "Venue", "Theater", "Theatre");
  const master = getValByName(item, "Master") || "Unknown Master";
  
  const fmt = getFormat(item);
  const sz = getFileSize(item);
  const formatStr = (fmt && sz) ? `${fmt} [${sz}]` : (fmt || sz || getMediaType(item));

  const location = [tour, venue].filter(Boolean).join(" - ");

  let text = `${show} - ${date} (${formatStr})`;
  if (location) text += ` | ${location}`;
  if (master) text += ` | Master: ${master}`;

  navigator.clipboard.writeText(text).then(() => {
    if (typeof showToast === "function") {
      showToast("📋 Item summary copied to clipboard!");
    } else if (typeof triggerToast === "function") {
      triggerToast("📋 Item summary copied to clipboard!");
    } else {
      const originalText = buttonElement.innerText;
      buttonElement.innerText = "✅ Copied!";
      buttonElement.classList.add("copied");

      setTimeout(() => {
        buttonElement.innerText = originalText;
        buttonElement.classList.remove("copied");
      }, 2000);
    }
  });
}

/* ============================================================
   MULTIVERSE THEME ENGINE (Cyberpunk / Paradise Lost)
============================================================ */
let currentTheme = localStorage.getItem("siteTheme") || "cyberpunk";
document.body.setAttribute("data-theme", currentTheme);

function setTheme(themeName) {
  currentTheme = themeName;
  document.body.setAttribute("data-theme", themeName);
  localStorage.setItem("siteTheme", themeName);
  updateUI();
}

function updateUI() {
  const btn = document.getElementById("paradise-btn");
  if (!btn) return;

  if (currentTheme === "paradise-lost") {
    btn.innerText = "ASCEND TO CYBERSPACE";
  } else {
    btn.innerText = "ABANDON ALL HOPE";
  }
}

function triggerParadiseLost() {
  const isParadise = document.documentElement.getAttribute('data-theme') === 'paradise-lost';

  if (isParadise) {
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.classList.remove('paradise-lost', 'paradise-lost-mode');
    document.body.classList.remove('paradise-lost', 'paradise-lost-mode');
    localStorage.setItem('paradiseThemeActive', 'false');
  } else {
    document.documentElement.setAttribute('data-theme', 'paradise-lost');
    document.documentElement.classList.add('paradise-lost', 'paradise-lost-mode');
    document.body.classList.add('paradise-lost', 'paradise-lost-mode');
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

/* ============================================================
   FLOATING INFERNAL EMBERS ANIMATION
============================================================ */
const canvas = document.getElementById('ember-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const embers = Array.from({ length: 45 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height + height * 0.4,
    radius: Math.random() * 2 + 0.8,
    speedY: -(Math.random() * 0.7 + 0.2),
    speedX: (Math.random() - 0.5) * 0.4,
    opacity: Math.random() * 0.7 + 0.3,
    color: Math.random() > 0.4 ? '#ff4500' : '#ffaa00'
  }));

  function animateEmbers() {
    ctx.clearRect(0, 0, width, height);

    embers.forEach((ember) => {
      ember.y += ember.speedY;
      ember.x += ember.speedX;

      if (ember.y < height * 0.35) {
        ember.opacity -= 0.005;
      }

      if (ember.y < height * 0.2 || ember.opacity <= 0) {
        ember.y = height + Math.random() * 50;
        ember.x = Math.random() * width;
        ember.opacity = Math.random() * 0.7 + 0.3;
      }

      ctx.beginPath();
      ctx.arc(ember.x, ember.y, ember.radius, 0, Math.PI * 2);
      ctx.fillStyle = ember.color;
      ctx.globalAlpha = ember.opacity;
      ctx.shadowBlur = 8;
      ctx.shadowColor = ember.color;
      ctx.fill();
    });

    requestAnimationFrame(animateEmbers);
  }

  if (window.innerWidth > 768) {
    animateEmbers();
  }
}

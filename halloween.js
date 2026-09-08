/* ==========================================================================
   DEATH NOTE RESKIN — DYNAMIC CARD SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const observer = new MutationObserver(() => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    if (activeTheme === 'death-note') {
      document.querySelectorAll('.card p, .bootleg-card p, .item-card div').forEach(p => {
        if (p.innerHTML.includes('CAST:') && !p.innerHTML.includes('infernal-label-cast')) {
          p.innerHTML = p.innerHTML.replace('CAST:', '<span class="infernal-label-cast">CAST:</span>');
        }
        if (p.innerHTML.includes('MASTER NOTES:') && !p.innerHTML.includes('infernal-label-notes')) {
          p.innerHTML = p.innerHTML.replace('MASTER NOTES:', '<span class="infernal-label-notes">MASTER NOTES:</span>');
        }
        if (p.innerHTML.includes('TRADING NOTES:') && !p.innerHTML.includes('infernal-label-notes')) {
          p.innerHTML = p.innerHTML.replace('TRADING NOTES:', '<span class="infernal-label-notes">TRADING NOTES:</span>');
        }
      });
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
});

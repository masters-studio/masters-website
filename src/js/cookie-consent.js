/* Masters Studio — Cookie Consent Banner Logic
   Drop at: assets/js/cookie-consent.js
   Works together with privacy-settings.html, which reads/writes the same localStorage key. */
(function () {
  var KEY = 'masters_privacy_prefs';
  var banner = document.getElementById('mc-banner');
  if (!banner) return;

  var moreBtn = document.getElementById('mc-more');
  var panel = document.getElementById('mc-panel');
  var acceptAllBtn = document.getElementById('mc-accept-all');
  var rejectAllBtn = document.getElementById('mc-reject-all');
  var saveBtn = document.getElementById('mc-save-selected');
  var functionalBox = document.getElementById('mc-functional');
  var analyticsBox = document.getElementById('mc-analytics');
  var marketingBox = document.getElementById('mc-marketing');

  function getSaved() {
    try { return JSON.parse(localStorage.getItem(KEY) || 'null'); }
    catch (e) { return null; }
  }

  function savePrefs(prefs) {
    prefs.essential = true;
    prefs.updated = new Date().toISOString();
    try { localStorage.setItem(KEY, JSON.stringify(prefs)); } catch (e) {}
    // Hook point: enable/disable actual GA/marketing scripts here based on prefs
    window.dispatchEvent(new CustomEvent('masters-privacy-prefs-updated', { detail: prefs }));
  }

  function hideBanner() {
    banner.classList.remove('mc-visible');
  }

  function showBanner() {
    banner.classList.add('mc-visible');
  }

  // Only show if no choice has been saved yet
  var existing = getSaved();
  if (!existing) {
    // slight delay so it doesn't fight page-load animations
    setTimeout(showBanner, 600);
  }

  moreBtn.addEventListener('click', function () {
    var isOpen = panel.classList.toggle('mc-open');
    moreBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  acceptAllBtn.addEventListener('click', function () {
    savePrefs({ functional: true, analytics: true, marketing: true });
    hideBanner();
  });

  rejectAllBtn.addEventListener('click', function () {
    savePrefs({ functional: false, analytics: false, marketing: false });
    hideBanner();
  });

  saveBtn.addEventListener('click', function () {
    savePrefs({
      functional: functionalBox.checked,
      analytics: analyticsBox.checked,
      marketing: marketingBox.checked
    });
    hideBanner();
  });

  // Allow the privacy-settings page (or any link with #open-cookie-settings) to reopen the banner
  window.reopenCookieBanner = function () {
    var saved = getSaved() || {};
    if (functionalBox) functionalBox.checked = !!saved.functional;
    if (analyticsBox) analyticsBox.checked = !!saved.analytics;
    if (marketingBox) marketingBox.checked = !!saved.marketing;
    panel.classList.add('mc-open');
    moreBtn.setAttribute('aria-expanded', 'true');
    showBanner();
  };
})();

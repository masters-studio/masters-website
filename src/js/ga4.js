/* Masters Studio — GA4 loader
   Loads Google Analytics only after the visitor has granted analytics
   consent via the cookie banner (see cookie-consent.js). Never loads
   on its own — waits for a saved "analytics: true" preference, or the
   masters-privacy-prefs-updated event when that preference is granted. */
(function () {
  var GA_ID = 'G-85JY2KEEER';
  var KEY = 'masters_privacy_prefs';
  var loaded = false;

  function loadGA() {
    if (loaded) return;
    loaded = true;

    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  function getSaved() {
    try { return JSON.parse(localStorage.getItem(KEY) || 'null'); }
    catch (e) { return null; }
  }

  var saved = getSaved();
  if (saved && saved.analytics) loadGA();

  window.addEventListener('masters-privacy-prefs-updated', function (e) {
    if (e.detail && e.detail.analytics) loadGA();
  });
})();

(function () {
  'use strict';
  var root = document.documentElement;
  var $ = function (id) { return document.getElementById(id); };

  /* ---- Theme ---- */
  var themeBtn = $('themeBtn');
  function stored() { try { return localStorage.getItem('theme'); } catch (e) { return null; } }
  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    themeBtn.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (m) { m.setAttribute('content', t === 'dark' ? '#121315' : '#F5F2EA'); });
  }
  applyTheme(root.getAttribute('data-theme') || 'dark');
  themeBtn.addEventListener('click', function () {
    var t = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(t);
    try { localStorage.setItem('theme', t); } catch (e) {}
  });
  if (window.matchMedia) {
    var mq = matchMedia('(prefers-color-scheme: light)');
    var onScheme = function (e) { if (!stored()) applyTheme(e.matches ? 'light' : 'dark'); };
    if (mq.addEventListener) mq.addEventListener('change', onScheme); else if (mq.addListener) mq.addListener(onScheme);
  }
})();

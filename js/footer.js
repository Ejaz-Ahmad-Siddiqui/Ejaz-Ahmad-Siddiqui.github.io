(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };

  /* ---- Year ---- */
  $('year').textContent = String(new Date().getFullYear());
})();

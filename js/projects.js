(function () {
  'use strict';
  var root = document.documentElement;
  var $ = function (id) { return document.getElementById(id); };

  /* ---- Work filter ---- */
  var chips = Array.prototype.slice.call(document.querySelectorAll('.chip'));
  var cards = Array.prototype.slice.call(document.querySelectorAll('.proj'));
  var grid = $('projGrid'), gridSm = $('projGridSm'), smHead = $('smHead'), empty = $('workEmpty'), status = $('workStatus');
  var mainCards = cards.filter(function (c) { return c.parentElement === grid; });
  var smCards = cards.filter(function (c) { return c.parentElement === gridSm; });
  function setFilter(f, label) {
    chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c.getAttribute('data-filter') === f)); });
    var n = 0;
    cards.forEach(function (c) {
      var show = f === 'all' || c.getAttribute('data-org') === f;
      c.hidden = !show;
      c.classList.remove('full');
      if (show) n++;
    });
    var vis = mainCards.filter(function (c) { return !c.hidden; });
    if (vis.length % 2 === 1) vis[vis.length - 1].classList.add('full');
    var smVis = smCards.filter(function (c) { return !c.hidden; }).length;
    grid.hidden = vis.length === 0;
    gridSm.hidden = smHead.hidden = smVis === 0;
    empty.hidden = n > 0;
    status.textContent = f === 'all' ? 'Showing all ' + n + ' projects' : 'Showing ' + n + (n === 1 ? ' project' : ' projects') + ' · ' + label;
  }
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      setFilter(c.getAttribute('data-filter'), c.childNodes[0].textContent.trim());
    });
  });
  setFilter('all', 'All');

  /* ---- Project detail panel ---- */
  var panel = $('projPanel'), current = null;
  var pTitle = $('pTitle'), pOrg = $('pOrg'), pOrgBar = $('pOrgBar'), pPos = $('pPos'), pRole = $('pRole'), pRoleWrap = $('pRoleWrap'),
      pKv = $('pKv'), pOverview = $('pOverview'), pFeatures = $('pFeatures'), pStack = $('pStack'), pVis = $('pVis'),
      pPrev = $('pPrev'), pNext = $('pNext'), pClose = $('pClose'), pScroll = $('pScroll');
  var canModal = typeof panel.showModal === 'function';
  function visibleCards() { return cards.filter(function (c) { return !c.hidden; }); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function fill(card) {
    current = card;
    pTitle.textContent = card.querySelector('.proj-open').textContent;
    pOrg.textContent = pOrgBar.textContent = card.getAttribute('data-org-label');
    var role = card.querySelector('[data-role]');
    pRoleWrap.hidden = !role;
    pKv.style.gridTemplateColumns = role ? '' : '1fr';
    if (role) pRole.textContent = role.textContent;
    pOverview.textContent = card.querySelector('.proj-sum').textContent;
    pFeatures.innerHTML = '';
    card.querySelectorAll('[data-features] li').forEach(function (li) { pFeatures.appendChild(li.cloneNode(true)); });
    pStack.innerHTML = '';
    card.querySelectorAll('.tags li').forEach(function (li) { pStack.appendChild(li.cloneNode(true)); });
    pVis.innerHTML = '';
    pVis.appendChild(card.querySelector('.proj-vis').firstElementChild.cloneNode(true));
    var list = visibleCards(), i = list.indexOf(card);
    pPos.textContent = pad(i + 1) + ' of ' + pad(list.length);
    pPrev.disabled = i <= 0;
    pNext.disabled = i >= list.length - 1;
    pScroll.scrollTop = 0;
  }
  function openPanel(card) {
    fill(card);
    if (!panel.open) {
      if (canModal) panel.showModal(); else panel.setAttribute('open', '');
      root.style.overflow = 'hidden';
    }
    pClose.focus();
  }
  function closePanel() { if (canModal) panel.close(); else { panel.removeAttribute('open'); onClosed(); } }
  function onClosed() {
    root.style.overflow = '';
    if (current) { var b = current.querySelector('.proj-open'); if (b) b.focus({ preventScroll: false }); }
  }
  function step(d) {
    var list = visibleCards(), i = list.indexOf(current) + d;
    if (i >= 0 && i < list.length) fill(list[i]);
  }
  cards.forEach(function (card) {
    card.querySelector('.proj-open').addEventListener('click', function () { openPanel(card); });
  });
  pClose.addEventListener('click', closePanel);
  pPrev.addEventListener('click', function () { step(-1); });
  pNext.addEventListener('click', function () { step(1); });
  panel.addEventListener('close', onClosed);
  panel.addEventListener('click', function (e) { if (e.target === panel) closePanel(); });
  panel.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !canModal) { closePanel(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
  });
})();

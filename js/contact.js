(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };

  /* ---- Copy email ---- */
  var copyBtn = $('copyEmail'), copyStatus = $('copyStatus');
  copyBtn.addEventListener('click', function () {
    var text = copyBtn.getAttribute('data-copy');
    var done = function () {
      copyBtn.textContent = 'Copied';
      copyStatus.textContent = 'Email address copied to clipboard';
      setTimeout(function () { copyBtn.textContent = 'Copy'; copyStatus.textContent = ''; }, 2000);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { window.location.href = 'mailto:' + text; });
    } else { window.location.href = 'mailto:' + text; }
  });

  /* ---- Contact form ---- */
  var form = $('contactForm'), ok = $('formOk'), bad = $('formBad'), sendBtn = $('sendBtn'), sendLabel = $('sendLabel');
  var fields = [
    { wrap: $('f-name'), input: $('name') },
    { wrap: $('f-email'), input: $('email') },
    { wrap: $('f-message'), input: $('message') }
  ];
  function check(f) {
    var v = f.input.value.trim();
    var valid = v.length > 0 && (f.input.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
    f.wrap.classList.toggle('invalid', !valid);
    f.input.setAttribute('aria-invalid', String(!valid));
    return valid;
  }
  fields.forEach(function (f) {
    f.input.addEventListener('input', function () { if (f.wrap.classList.contains('invalid')) check(f); });
    f.input.addEventListener('blur', function () { if (f.input.value) check(f); });
  });
  function show(el, msg) {
    ok.classList.remove('show'); bad.classList.remove('show');
    ok.textContent = ''; bad.textContent = '';
    if (el) { el.textContent = msg; el.classList.add('show'); }
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var firstBad = null;
    fields.forEach(function (f) { if (!check(f) && !firstBad) firstBad = f.input; });
    if (firstBad) { show(null); firstBad.focus(); return; }
    if ($('gotcha').value) { show(ok, 'Thanks, your message has been sent.'); form.reset(); return; }
    sendBtn.disabled = true;
    sendLabel.textContent = 'Sending…';
    show(null);
    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (res) {
        if (res.ok) {
          show(ok, 'Thanks, your message has been sent. I will get back to you soon.');
          form.reset();
          fields.forEach(function (f) { f.input.removeAttribute('aria-invalid'); });
          return;
        }
        return res.json().catch(function () { return {}; }).then(function (data) {
          var detail = data && data.errors ? data.errors.map(function (x) { return x.message; }).join(' ') : '';
          show(bad, 'Sorry, your message could not be sent.' + (detail ? ' ' + detail : '') + ' Please try again, or email me at iamejaazahmad@gmail.com.');
        });
      })
      .catch(function () {
        show(bad, 'Sorry, the message could not be sent because of a network problem. Please check your connection and try again, or email me at iamejaazahmad@gmail.com.');
      })
      .then(function () {
        sendBtn.disabled = false;
        sendLabel.textContent = 'Send message';
      });
  });
})();

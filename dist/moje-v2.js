/* MOJE WEB 2.0 — doplnky DOM pre Shoptet šablónu 11
   Načítava sa s defer; nič nepredpokladá o jQuery. */
(function () {
  'use strict';
  var BASE = (document.currentScript && document.currentScript.src || '').replace(/[^/]*$/, '');
  var ASSETS = BASE.replace(/dist\/$/, '') + 'assets/';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  var ICONS = {
    yt: '<svg viewBox="0 0 24 24" fill="#000"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.4-1.6.5-3.2.5-4.8s-.1-3.2-.5-4.8zM9.7 15V9l5.8 3-5.8 3z"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="#000"><path d="M14 8V6c0-.9.6-1.1 1-1.1h2.7V1h-3.8C9.8 1 9 3.9 9 5.8V8H6.5v4H9v11h5V12h3.3l.4-4H14z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="#000"/></svg>'
  };

  function footer() {
    var f = document.getElementById('footer');
    if (!f || f.querySelector('.m-footer')) return;
    var col = function (title, links) {
      return '<div class="m-footer__col"><h4>' + title + '</h4>' +
        links.map(function (l) { return '<a href="' + l[1] + '">' + l[0] + '</a>'; }).join('') + '</div>';
    };
    var html =
      '<div class="m-footer">' +
        col('Informácie pre vás', [['Doprava a platba', '/doprava-a-platba/'], ['Obchodné podmienky', '/obchodne-podmienky/'], ['Ochrana osobných údajov', '/podmienky-ochrany-osobnych-udajov/']]) +
        col('O nás', [['Katalógy', '/katalogy/'], ['Blog', '/blog/'], ['Kontakty', '/kontakty/']]) +
        col('Kategórie', [['Kompletná ponuka', '/e-shop/'], ['Značky', '/znacky/'], ['Akcia', '/akciova-ponuka/']]) +
        '<div class="m-footer__col"><h4>Kontakt</h4>' +
          '<a href="mailto:ahoj@mojehome.sk">ahoj@mojehome.sk</a>' +
          '<a href="tel:+421911449187">+421 911 449 187</a>' +
          '<div class="m-footer__social"><span>Follow us</span>' +
            '<a href="https://www.youtube.com/@mojehome" target="_blank" rel="noopener" aria-label="YouTube">' + ICONS.yt + '</a>' +
            '<a href="https://www.facebook.com/mojehome.sk" target="_blank" rel="noopener" aria-label="Facebook">' + ICONS.fb + '</a>' +
            '<a href="https://www.instagram.com/mojehome.sk/" target="_blank" rel="noopener" aria-label="Instagram">' + ICONS.ig + '</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<p class="m-footer__secure">Bezpečný nákup – možnosť vrátenia do 14 dní.</p>';
    var rows = f.querySelector('.footer-rows') || f;
    rows.insertAdjacentHTML('afterbegin', html);

    var mark = document.createElement('div');
    mark.className = 'm-footer-mark';
    mark.innerHTML = '<img src="' + ASSETS + 'logo-mark-footer.svg" alt="" onerror="this.parentNode.remove()">';
    f.appendChild(mark);
  }

  function headerLogo() {
    var img = document.querySelector('#header .site-name img');
    if (!img || img.dataset.m2) return;
    var probe = new Image();
    probe.onload = function () { img.src = probe.src; img.dataset.m2 = '1'; };
    probe.src = ASSETS + 'logo-header.svg';
  }

  ready(function () {
    document.documentElement.classList.add('m2');
    footer();
    headerLogo();
  });
})();

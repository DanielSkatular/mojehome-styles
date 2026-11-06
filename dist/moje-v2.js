/* MOJE WEB 2.0 — loader + doplnky DOM pre Shoptet šablónu 11
   V Shoptete stačí 1 riadok (bez defer, na konci Záhlavia):
   <script src="https://cdn.jsdelivr.net/gh/DanielSkatular/mojehome-styles@VERZIA/dist/moje-v2.js"></script>
   Skript hneď pripojí fonty (z domény e-shopu) a moje-v2.css z tej istej verzie,
   DOM úpravy spraví po načítaní stránky. */
(function () {
  'use strict';
  var BASE = (document.currentScript && document.currentScript.src || '').replace(/[^/]*$/, '');
  var ASSETS = BASE.replace(/dist\/$/, '') + 'assets/';
  var FONTS = '/user/documents/upload/Fonts/';
  var BRANDS = 'https://cdn.myshoptet.com/usr/www.mojehome.sk/user/categories/thumb/';
  var head = document.head;

  /* ---------- fonty: z vlastnej domény e-shopu (licencia, CORS) ---------- */
  if (!document.getElementById('m2-fonts')) {
    var ff = function (w, file) {
      return '@font-face{font-family:"DokoSans";src:url(' + FONTS + 'DokoSans/' + file + '.woff2) format("woff2");font-weight:' + w + ';font-display:swap}';
    };
    var st = document.createElement('style');
    st.id = 'm2-fonts';
    st.textContent = ff(300, 'DokoSans-Light') + ff(400, 'DokoSans-Regular') + ff(500, 'DokoSans-Medium') +
      ff('600 700', 'DokoSans-Bold') + ff('800 900', 'DokoSans-Black');
    head.appendChild(st);
    var neulis = document.createElement('link');
    neulis.rel = 'stylesheet';
    neulis.href = FONTS + 'moje-neulis.css';
    head.appendChild(neulis);
  }

  /* ---------- hlavné CSS z rovnakej verzie ---------- */
  if (BASE && !document.getElementById('m2-css')) {
    var link = document.createElement('link');
    link.id = 'm2-css';
    link.rel = 'stylesheet';
    link.href = BASE + 'moje-v2.css';
    head.appendChild(link);
  }

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html) e.innerHTML = html;
    return e;
  }

  var ICONS = {
    yt: '<svg viewBox="0 0 24 24" fill="#000"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.4-1.6.5-3.2.5-4.8s-.1-3.2-.5-4.8zM9.7 15V9l5.8 3-5.8 3z"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="#000"><path d="M14 8V6c0-.9.6-1.1 1-1.1h2.7V1h-3.8C9.8 1 9 3.9 9 5.8V8H6.5v4H9v11h5V12h3.3l.4-4H14z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="#000"/></svg>'
  };

  /* ---------- logo ---------- */
  function headerLogo() {
    var img = document.querySelector('#header .site-name img');
    if (!img || img.dataset.m2) return;
    var probe = new Image();
    probe.onload = function () { img.src = probe.src; img.dataset.m2 = '1'; };
    probe.src = ASSETS + 'logo-bordova.svg';
  }

  /* ---------- pätička ---------- */
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
    (f.querySelector('.footer-rows') || f).insertAdjacentHTML('afterbegin', html);
    var mark = el('div', 'm-footer-mark', '<img src="' + ASSETS + 'logo-bordova.svg" alt="" onerror="this.parentNode.remove()">');
    f.appendChild(mark);
  }

  /* ---------- newsletter nad pätičkou ---------- */
  function newsletter() {
    var form = document.getElementById('formNewsletterWidget');
    var f = document.getElementById('footer');
    if (!form || !f || document.querySelector('.m-newsletter')) return;
    var wrap = el('div', 'm-newsletter-wrap',
      '<div class="m-newsletter"><div class="m-newsletter__copy">' +
        '<p class="m-newsletter__title">Prihláste sa na odber newslettera</p>' +
        '<p class="m-newsletter__text">Vložením e-mailu súhlasíte s podmienkami <a href="/podmienky-ochrany-osobnych-udajov/">ochrany osobných údajov</a>.</p>' +
      '</div></div>');
    var box = wrap.firstChild;
    box.appendChild(form);
    var input = form.querySelector('input[type=email], input[name=email]');
    var btn = form.querySelector('button[type=submit]');
    if (input) {
      if (!input.placeholder) input.placeholder = 'Vaša e-mailová adresa';
      var w = input.parentNode;
      w.classList.add('m-newsletter__field');
      if (btn) w.appendChild(btn);
      var on = function () { box.classList.add('is-active'); };
      input.addEventListener('focus', on);
      input.addEventListener('input', on);
    }
    f.parentNode.insertBefore(wrap, f);
  }

  /* ---------- homepage: pásy, dekorácie, značky ---------- */
  var DECO = [
    { file: 'cmaranica-bordova-01.svg', side: 'left' },
    { file: 'cmaranica-zelena-10.svg', side: 'right' },
    { file: 'cmaranica-bordova-13.svg', side: 'left' }
  ];
  function homepage() {
    if (!document.body.classList.contains('type-index')) return;
    var titles = document.querySelectorAll('.homepage-group-title');
    var bands = [];
    Array.prototype.forEach.call(titles, function (t, i) {
      var list = t.nextElementSibling;
      if (!list || !list.classList.contains('products-block') || t.closest('.m-band')) return;
      var band = el('section', 'm-band ' + (i % 2 === 0 ? 'm-band--cream' : 'm-band--white'));
      t.parentNode.insertBefore(band, t);
      band.appendChild(t);
      band.appendChild(list);
      var d = DECO[i % DECO.length];
      band.insertAdjacentHTML('afterbegin', '<img class="m-band__deco m-band__deco--' + d.side + '" src="' + ASSETS + d.file + '" alt="" aria-hidden="true">');
      bands.push(band);
    });
    if (bands[0] && !document.querySelector('.m-brands')) {
      var brands = el('section', 'm-brands',
        '<div class="m-brands__lead"><img src="' + ASSETS + 'logo-bordova.svg" alt="Moje"><span>je oficiálny predajca značiek:</span></div>' +
        '<div class="m-brands__logos">' +
          '<a href="/amuse/"><img src="' + BRANDS + 'logo-amuse-eps-black.png" alt="Amuse"></a>' +
          '<a href="/tupperware/"><img src="' + BRANDS + 'tupperware-logo.png" alt="Tupperware"></a>' +
          '<a href="/koziol/"><img src="' + BRANDS + 'koziol-logo.png" alt="Koziol"></a>' +
          '<a href="/dopper/"><img src="' + BRANDS + 'dopper-logo.png" alt="Dopper"></a>' +
        '</div>');
      bands[0].parentNode.insertBefore(brands, bands[0].nextSibling);
    }
  }

  ready(function () {
    document.documentElement.classList.add('m2');
    headerLogo();
    homepage();
    newsletter();
    footer();
  });
})();

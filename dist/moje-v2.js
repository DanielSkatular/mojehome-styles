/* MOJE WEB 2.0 (v0.3) — loader + doplnky DOM pre Shoptet šablónu 11
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

  /* ---------- v0.3: homepage hero, kategórie, príbeh, značka, blog ---------- */
  var SHOP = 'https://cdn.myshoptet.com/usr/www.mojehome.sk/user/';
  var CATS = [
    ['Skladovanie', '/skladovanie-potravin/', SHOP + 'shop/orig/1654-4_storage-jar-set-web.jpg'],
    ['Varenie', '/kuchynske-pomocky/', SHOP + 'shop/orig/3562_dizajn-bez-nazvu--4.png'],
    ['Na cesty', '/na-cesty/', SHOP + 'shop/orig/4127-5_dopper-termoflasa-580-ml-hneda.jpg'],
    ['Pre deti', '/pre-deti/', SHOP + 'categories/orig/1723_desiatnik-rikko-ruzovy-web_background_removed.png'],
    ['Značky', '/znacky/', ASSETS + 'logo-bordova.svg']
  ];
  function txt(node) { return node ? node.textContent.replace(/\s+/g, ' ').trim() : ''; }
  function heroCard(item, main) {
    var a = item.querySelector('a[href]');
    var img = item.querySelector('img');
    if (!img) return '';
    var src = img.getAttribute('data-src') || img.currentSrc || img.src;
    var open = a ? '<a class="m-hero__card' + (main ? ' m-hero__card--main' : '') + '" href="' + a.getAttribute('href') + '">' :
      '<div class="m-hero__card' + (main ? ' m-hero__card--main' : '') + '">';
    return open + '<img src="' + src + '" alt="' + (img.alt || '').replace(/"/g, '&quot;') + '">' +
      (a ? '<span class="m-hero__arrow" aria-hidden="true"></span></a>' : '</div>');
  }
  function hero() {
    var host = document.querySelector('.before-carousel');
    if (!host || document.querySelector('.m-hero-band')) return;
    var items = host.querySelectorAll('#carousel .item');
    if (!items.length) return;
    var linked = Array.prototype.filter.call(items, function (i) { return i.querySelector('a[href]'); });
    var pick = (linked.length >= 3 ? linked : Array.prototype.slice.call(items)).slice(0, 3);
    var html = '<div class="m-hero">' + heroCard(pick[0], true) +
      (pick.length > 1 ? '<div class="m-hero__side">' + pick.slice(1).map(function (i) { return heroCard(i, false); }).join('') + '</div>' : '') +
      '</div>';
    var pills = document.querySelectorAll('.welcome .pills .pill');
    if (pills.length) html += '<div class="m-values">' + Array.prototype.map.call(pills, function (p) { return '<span>' + txt(p) + '</span>'; }).join('') + '</div>';
    host.appendChild(el('div', 'm-hero-band', html));
  }
  function cats(after) {
    if (!after || document.querySelector('.m-cats')) return;
    var html = '<h2 class="m-cats__title">Vyhľadajte podľa kategórie</h2><div class="m-cats__grid">' +
      CATS.map(function (c) {
        return '<a class="m-cat" href="' + c[1] + '"><span class="m-cat__img"><img src="' + c[2] + '" alt="" loading="lazy"></span>' +
          '<span class="m-cat__foot"><span class="m-cat__name">' + c[0] + '</span><span class="m-cat__arrow" aria-hidden="true"></span></span></a>';
      }).join('') + '</div>';
    after.parentNode.insertBefore(el('section', 'm-cats', html), after.nextSibling);
  }
  function story(after) {
    var w = document.querySelector('.welcome-wrapper .welcome');
    if (!after || !w || document.querySelector('.m-story')) return;
    var title = txt(w.querySelector('h1, h2'));
    var lead = txt(w.querySelector('.lead, p'));
    if (!title && !lead) return;
    var html = '<img class="m-story__deco" src="' + ASSETS + 'cmaranica-bordova-09.svg" alt="" aria-hidden="true">' +
      '<div class="m-story__in"><img class="m-story__logo" src="' + ASSETS + 'logo-bordova.svg" alt="Moje">' +
      '<div class="m-story__copy"><p class="m-story__title">' + title + '</p><p class="m-story__text">' + lead + '</p></div>' +
      '<a class="m-btn-pill" href="/kontakty/">Objavte viac</a></div>';
    after.parentNode.insertBefore(el('section', 'm-story', html), after.nextSibling);
  }
  function brandSpot(band) {
    if (!band || band.querySelector('.m-spot')) return;
    var t = band.querySelector('.homepage-group-title');
    var name = txt(t);
    if (!/barebones/i.test(name)) return;
    var slide = document.querySelector('#carousel .item a[href*="barebones"] img');
    band.classList.add('m-band--brand');
    var spot = el('div', 'm-spot',
      '<img class="m-spot__logo" src="' + SHOP + 'categories/orig/barebones_logo_web.png" alt="Barebones">' +
      '<p class="m-spot__text">Odolné vybavenie na záhradu, kemping a varenie pod holým nebom. Navrhnuté tak, aby vydržalo roky a vyzeralo dobre aj po nich.</p>' +
      '<a class="m-spot__link" href="/znacka/barebones/">Pozrieť celú značku</a>' +
      (slide ? '<img class="m-spot__img" src="' + (slide.getAttribute('data-src') || slide.src) + '" alt="" loading="lazy">' : ''));
    band.insertBefore(spot, t ? t.nextSibling : band.firstChild);
  }
  function blog() {
    var w = document.querySelector('.type-index .middle-banners-wrapper');
    if (!w || w.querySelector('.m-blog-title')) return;
    var c = w.querySelector('.banners-content') || w.firstElementChild;
    if (c) c.parentNode.insertBefore(el('h2', 'm-blog-title', 'Tipy, príbehy a inšpirácie'), c);
    /* blog až za posledný produktový pás (Shoptet ho dáva medzi obsahové bloky) */
    var bands = document.querySelectorAll('.m-band');
    var last = bands[bands.length - 1];
    var top = last;
    while (top && top.parentNode && top.parentNode !== w.parentNode) top = top.parentNode;
    if (top && top.parentNode === w.parentNode && top !== w) w.parentNode.insertBefore(w, top.nextSibling);
  }
  function homepage2() {
    if (!document.body.classList.contains('type-index')) return;
    hero();
    var bands = document.querySelectorAll('.m-band');
    cats(document.querySelector('.m-brands') || bands[0]);
    story(bands[1]);
    brandSpot(bands[2]);
    blog();
  }

  /* ---------- v0.3: kategória ---------- */
  function category() {
    var sb = document.querySelector('.type-category .sidebar-left');
    if (sb) sb.style.setProperty('--m-deco-sidebar', 'url("' + ASSETS + 'cmaranica-bordova-01.svg")');
  }

  /* ---------- v0.3: detail produktu ---------- */
  function pdp() {
    if (!document.body.classList.contains('type-detail')) return;
    var info = document.querySelector('.p-info-wrapper');
    var h1 = document.querySelector('.p-detail-inner-header h1');
    if (!info || !h1 || info.querySelector('.m-pdp-head')) return;
    var head = el('div', 'm-pdp-head');
    var flags = document.querySelectorAll('.p-detail .p-image-wrapper .flags .flag');
    if (flags.length) {
      head.appendChild(el('div', 'm-pdp-flags', Array.prototype.map.call(flags, function (f) { return '<span>' + txt(f) + '</span>'; }).join('')));
    }
    head.appendChild(h1);
    info.insertBefore(head, info.firstChild);
  }

  ready(function () {
    document.documentElement.classList.add('m2');
    headerLogo();
    homepage();
    homepage2();
    category();
    pdp();
    newsletter();
    footer();
  });
})();

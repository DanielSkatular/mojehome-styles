/* MOJE WEB 2.0 (v1.0.4) — loader + doplnky DOM pre Shoptet šablónu 11
   Odporúčané vloženie do Záhlavia (fonty a CSS hneď v HTML, JS s defer):
   <style id="m2-fonts">…@font-face DokoSans + DokoSans Fallback…</style>
   <link rel="preload" href="/user/documents/upload/Fonts/DokoSans/DokoSans-Regular.woff2" as="font" type="font/woff2" crossorigin>
   <link rel="preload" href="/user/documents/upload/Fonts/DokoSans/DokoSans-Bold.woff2" as="font" type="font/woff2" crossorigin>
   <link rel="stylesheet" href="/user/documents/upload/Fonts/moje-neulis.css">
   <link id="m2-css" rel="stylesheet" href="https://cdn.jsdelivr.net/gh/DanielSkatular/mojehome-styles@VERZIA/dist/moje-v2.min.css">
   <script src="https://cdn.jsdelivr.net/gh/DanielSkatular/mojehome-styles@VERZIA/dist/moje-v2.js" defer></script>
   Ak #m2-fonts / #m2-css na stránke chýbajú, skript ich doplní sám (záložné správanie).
   Zdrojové CSS je dist/moje-v2.css, na web ide minifikované dist/moje-v2.min.css. */
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
      ff('600 900', 'DokoSans-Bold') +
      '@font-face{font-family:"DokoSans Fallback";src:local("Arial"),local("ArialMT");font-weight:100 500;size-adjust:91.7%;ascent-override:104.7%;descent-override:26.2%;line-gap-override:0%}' +
      '@font-face{font-family:"DokoSans Fallback";src:local("Arial Bold"),local("Arial-BoldMT");font-weight:600 900;size-adjust:88.5%;ascent-override:109.6%;descent-override:26%;line-gap-override:0%}';
    head.appendChild(st);
    var neulis = document.createElement('link');
    neulis.rel = 'stylesheet';
    neulis.href = FONTS + 'moje-neulis.css';
    head.appendChild(neulis);
  }

  /* ---------- hlavné CSS z rovnakej verzie ---------- */
  if (BASE && !document.getElementById('m2-css')) {
    /* počas parsovania hlavičky blokujúco (Shoptet potom meria menu a záložky už s našimi štýlmi) */
    if (document.readyState === 'loading') {
      document.write('<link id="m2-css" rel="stylesheet" href="' + BASE + 'moje-v2.min.css">');
    }
    if (!document.getElementById('m2-css')) {
      var link = document.createElement('link');
      link.id = 'm2-css';
      link.rel = 'stylesheet';
      link.href = BASE + 'moje-v2.min.css';
      head.appendChild(link);
    }
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
          '<a href="/barebones/"><img src="' + BRANDS + 'barebones_logo_web.png" alt="Barebones"></a>' +
          '<a href="/day-to-day/"><img src="' + BRANDS + 'day-to-day-logo.png" alt="Day to Day"></a>' +
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
    var car = document.querySelector('#carousel');
    if (!car || document.querySelector('.m-hero-band')) return;
    var host = document.querySelector('.before-carousel');
    var row = car.closest('.banners-row') || car;
    var items = car.querySelectorAll('.item');
    if (!items.length) return;
    var linked = Array.prototype.filter.call(items, function (i) { return i.querySelector('a[href]'); });
    var pick = (linked.length >= 3 ? linked : Array.prototype.slice.call(items)).slice(0, 3);
    var html = '<div class="m-hero">' + heroCard(pick[0], true) +
      (pick.length > 1 ? '<div class="m-hero__side">' + pick.slice(1).map(function (i) { return heroCard(i, false); }).join('') + '</div>' : '') +
      '</div>';
    var pillBox = document.querySelector('.welcome .pills') || document.querySelector('.jj-brand .pills');
    var pills = pillBox ? pillBox.querySelectorAll('.pill') : [];
    if (pills.length) html += '<div class="m-values">' + Array.prototype.map.call(pills, function (p) { return '<span>' + txt(p) + '</span>'; }).join('') + '</div>';
    var band = el('div', 'm-hero-band', html);
    if (host) host.appendChild(band);
    else row.parentNode.insertBefore(band, row);
    row.classList.add('m-hide');
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

  /* ---------- v0.3.4: tlačidlo filtrov na mobile ---------- */
  function filtersBtn() {
    if (!document.body.classList.contains('type-category') || document.querySelector('.m-filter-btn')) return;
    var h = document.getElementById('category-header');
    if (!h || !document.querySelector('.filters-wrapper')) return;
    var b = el('button', 'm-filter-btn', 'Filtrovať produkty');
    b.type = 'button';
    var n = document.querySelectorAll('#filters input:checked').length;
    if (n) b.insertAdjacentHTML('beforeend', ' <span>' + n + '</span>');
    b.addEventListener('click', function () { document.body.classList.toggle('m-filters-open'); });
    h.parentNode.insertBefore(b, h.nextSibling);
  }
  document.addEventListener('ShoptetDOMPageContentLoaded', function () { filtersBtn(); mergeFlags(); filtersFigma(); listTotal(); });

  /* ---------- v0.6: filtre podľa Figmy – súčet v nadpise, zbaliť, „Zobraziť viac“ ---------- */
  function filtersFigma() {
    var f = document.getElementById('filters');
    if (!f) return;
    Array.prototype.forEach.call(f.querySelectorAll('.filter-section'), function (sec) {
      if (sec.classList.contains('filter-section-boolean') || sec.classList.contains('filter-section-count')) return;
      var h = sec.querySelector('h4');
      if (!h || h.querySelector('.m-ftoggle')) return;
      var sum = 0;
      Array.prototype.forEach.call(sec.querySelectorAll('.filter-count'), function (c) { sum += parseInt(c.textContent.replace(/\D/g, ''), 10) || 0; });
      if (sum) h.insertAdjacentHTML('beforeend', ' <span class="m-count">(' + sum + ')</span>');
      var tg = el('button', 'm-ftoggle');
      tg.type = 'button';
      tg.setAttribute('aria-label', 'Zbaliť / rozbaliť');
      h.appendChild(tg);
      h.addEventListener('click', function () { sec.classList.toggle('m-closed'); });
      var fs = sec.querySelector('fieldset');
      var items = fs ? fs.querySelectorAll(':scope > div:not(.advanced-filters-wrapper)') : [];
      if (items.length > 5) {
        sec.classList.add('m-short');
        var more = el('button', 'm-more', 'Zobraziť viac');
        more.type = 'button';
        more.addEventListener('click', function () {
          var short = sec.classList.toggle('m-short');
          more.textContent = short ? 'Zobraziť viac' : 'Zobraziť menej';
        });
        fs.appendChild(more);
      }
    });
  }

  /* Shoptet po filtrovaní/triedení prekreslí filtre – doplnky pridáme znova */
  if (window.MutationObserver) {
    var m2Timer;
    new MutationObserver(function () {
      clearTimeout(m2Timer);
      m2Timer = setTimeout(function () { filtersFigma(); listTotal(); filtersBtn(); mergeFlags(); subcatImages(); sortDrop(); sliderLabels(); cardOldPrice(); colorDots(); }, 60);
    }).observe(document.documentElement, { childList: true, subtree: true });
  }

  /* ---------- v0.9: triedenie ako rozbaľovací panel (otvorí sa hoverom aj klikom, zatvára sa s oneskorením) ---------- */
  function sortDrop() {
    Array.prototype.forEach.call(document.querySelectorAll('.listSorting__controls'), function (ul) {
      if (ul.getAttribute('data-m2s')) return;
      ul.setAttribute('data-m2s', '1');
      ul.classList.add('m-sort');
      var t, at = 0;
      var mark = function () {
        var items = Array.prototype.filter.call(ul.children, function (li) { return !li.querySelector('.listSorting__control--current'); });
        Array.prototype.forEach.call(ul.children, function (li) { li.classList.remove('m-first', 'm-last'); });
        if (items.length) { items[0].classList.add('m-first'); items[items.length - 1].classList.add('m-last'); }
      };
      var open = function () { clearTimeout(t); mark(); if (!ul.classList.contains('m-open')) at = Date.now(); ul.classList.add('m-open'); };
      mark();
      ul.addEventListener('mouseenter', open);
      ul.addEventListener('mouseleave', function () { t = setTimeout(function () { ul.classList.remove('m-open'); }, 350); });
      ul.addEventListener('click', function (e) {
        /* aktuálne radenie má v Shoptete pointer-events: none – klik príde na li */
        var li = e.target.closest('li');
        if (li && li.querySelector('.listSorting__control--current')) {
          e.preventDefault();
          /* na dotyku príde mouseenter tesne pred klikom – vtedy panel nechaj otvorený */
          if (ul.classList.contains('m-open') && Date.now() - at > 400) ul.classList.remove('m-open'); else open();
        } else if (e.target.closest('.listSorting__control')) ul.classList.remove('m-open');
      });
    });
  }
  document.addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('.listSorting__controls')) return;
    Array.prototype.forEach.call(document.querySelectorAll('.m-sort.m-open'), function (u) { u.classList.remove('m-open'); });
  });

  /* ---------- v0.9.1: stránka 404 – moderný layout (text a zľavu spravuje Shoptet, JS ich len preusporiada) ---------- */
  function page404() {
    var art = document.querySelector('body.id-404 .pageArticleDetail');
    if (!art || art.querySelector('.m-404')) return;
    var head = art.querySelector('header');
    var ab = art.querySelector('[itemprop="about"]');
    if (!ab) return;
    var box = el('div', 'm-404');
    var pic = el('div', 'm-404__art', '<span class="m-404__label">Chyba 404</span><span class="m-404__num">4<i></i>4</span>');
    var body = el('div', 'm-404__body');
    if (head) body.appendChild(head);
    body.appendChild(ab);
    /* zľavový kód z textu Shoptetu ako „lístok“ s kopírovaním */
    var strong = Array.prototype.filter.call(ab.querySelectorAll('strong'), function (s) { return /k[oó]d/i.test(s.textContent); })[0];
    if (strong) {
      var t = strong.textContent.replace(/\s+/g, ' ');
      var code = (t.match(/k[oó]d\s*:?\s*([A-Za-z0-9\-_]+)/i) || [])[1];
      var pct = (t.match(/(\d+\s*%)/) || [])[1];
      if (code) {
        var p = strong.closest('p');
        if (p) p.classList.add('m-404__lead');
        var ticket = el('div', 'm-404__ticket',
          '<div class="m-404__pct">' + (pct ? pct.replace(/\s+/g, ' ') : '') + '<small>zľava na nákup</small></div>' +
          '<div class="m-404__code"><small>Zľavový kód</small><strong>' + code + '</strong></div>' +
          '<button type="button" class="m-404__copy">Kopírovať</button>');
        ticket.querySelector('.m-404__copy').addEventListener('click', function () {
          var b = this;
          var done = function () { b.textContent = 'Skopírované ✓'; setTimeout(function () { b.textContent = 'Kopírovať'; }, 2000); };
          if (navigator.clipboard) navigator.clipboard.writeText(code).then(done, done); else done();
        });
        (p && p.nextSibling ? p.parentNode.insertBefore(ticket, p.nextSibling) : ab.appendChild(ticket));
      }
    }
    var links = [['Kompletná ponuka', '/e-shop/'], ['Skladovanie', '/skladovanie-potravin/'], ['Varenie', '/kuchynske-pomocky/'], ['Na cesty', '/na-cesty/'], ['Pre deti', '/pre-deti/'], ['Akcia', '/akciova-ponuka/']];
    ab.appendChild(el('div', 'm-404-cats', '<span>Alebo rovno do kategórie:</span>' + links.map(function (x) { return '<a href="' + x[1] + '">' + x[0] + '</a>'; }).join('')));
    box.appendChild(pic);
    box.appendChild(body);
    art.insertBefore(box, art.firstChild);
  }

  /* ---------- v0.9.4: fotky kategórií v mega menu (Shoptet má len biele zástupné obrázky; rovnaká cache ako podkategórie) ---------- */
  function menuImages() {
    Array.prototype.forEach.call(document.querySelectorAll('#header .menu-level-2 > li > a.menu-image img'), function (img) {
      var a = img.closest('a');
      if (a.getAttribute('data-m2i')) return;
      a.setAttribute('data-m2i', '1');
      var src = img.getAttribute('data-src') || img.getAttribute('src') || '';
      if (!/banner-biela/.test(src)) return;
      var key = 'm2sc:' + a.getAttribute('href');
      var set = function (u) { img.removeAttribute('srcset'); img.setAttribute('data-src', u); img.src = u; };
      var c = null;
      try { c = localStorage.getItem(key); } catch (e) {}
      if (c) { set(c); return; }
      if (!window.fetch || !window.DOMParser) return;
      fetch(a.href, { credentials: 'same-origin' }).then(function (r) { return r.text(); }).then(function (t) {
        var d = new DOMParser().parseFromString(t, 'text/html');
        var p = d.querySelector('#products .product img') || d.querySelector('.products-page .product img') || d.querySelector('.products .product img');
        if (!p) return;
        var u = p.getAttribute('data-src') || p.getAttribute('src');
        if (!u || /^data:/.test(u)) return;
        try { localStorage.setItem(key, u); } catch (e) {}
        set(u);
      }).catch(function () {});
    });
  }
  /* fotky sa načítajú až pri prvom otvorení menu (z cache hneď) */
  function menuImagesInit() {
    var once = function () { menuImages(); };
    Array.prototype.forEach.call(document.querySelectorAll('#header .menu-level-1 > li.ext'), function (li) {
      li.addEventListener('mouseenter', once);
      li.addEventListener('focusin', once);
    });
  }

  /* ---------- v0.9.5: menu Značky ako dlaždice s logami (logá z kategórií mojehome.sk ako v páse značiek) ---------- */
  function brandMenu() {
    var logos = { amuse: 'logo-amuse-eps-black.png', barebones: 'barebones_logo_web.png', 'day-to-day': 'day-to-day-logo.png', dopper: 'dopper-logo.png', koziol: 'koziol-logo.png', tupperware: 'tupperware-logo.png' };
    var ul = document.querySelector('#header .menu-level-1 > li.nav-manufacturers > .menu-level-2');
    if (!ul || ul.classList.contains('m-brand-menu')) return;
    ul.classList.add('m-brand-menu');
    Array.prototype.forEach.call(ul.children, function (li) {
      var a = li.querySelector('a');
      if (!a) return;
      var m = (a.getAttribute('href') || '').match(/\/znacka\/([^/]+)\//);
      var f = m && logos[m[1]];
      a.insertAdjacentHTML('afterbegin', f ? '<span class="m-bm-logo"><img src="' + BRANDS + f + '" alt="" loading="lazy"></span>' : '<span class="m-bm-logo m-bm-logo--text">' + txt(a) + '</span>');
    });
  }

  /* ---------- v0.9.6: ceny posuvníka nad úchytmi (Figma) – Shoptet ich mení podľa id, presun nevadí ---------- */
  function sliderLabels() {
    Array.prototype.forEach.call(document.querySelectorAll('#filters .slider-wrapper'), function (w) {
      var hs = w.querySelectorAll('.ui-slider-handle');
      var from = w.querySelector('.slider-header .from'), to = w.querySelector('.slider-header .to');
      if (hs.length < 2 || !from || !to) return;
      w.classList.add('m-slider');
      hs[0].appendChild(from);
      hs[1].appendChild(to);
    });
  }

  /* ---------- v0.9.6: počet produktov v dlaždiciach podkategórií (z „Počet položiek“ na stránke kategórie, cache 12 h) ---------- */
  function subcatCounts() {
    var word = function (n) { return n === 1 ? 'produkt' : (n >= 2 && n <= 4 ? 'produkty' : 'produktov'); };
    Array.prototype.forEach.call(document.querySelectorAll('.type-category .subcategories.with-image > li > a'), function (a) {
      if (a.querySelector('.m-sc-count')) return;
      var span = el('span', 'm-sc-count');
      a.appendChild(span);
      var show = function (n) { n = parseInt(n, 10); if (!isNaN(n)) span.textContent = n + ' ' + word(n); };
      var key = 'm2cnt:' + a.getAttribute('href'), c = null;
      try { c = JSON.parse(localStorage.getItem(key) || 'null'); } catch (e) {}
      if (c && Date.now() - c.t < 12 * 3600e3) { show(c.n); return; }
      if (!window.fetch || !window.DOMParser) return;
      fetch(a.href, { credentials: 'same-origin' }).then(function (r) { return r.text(); }).then(function (t) {
        var d = new DOMParser().parseFromString(t, 'text/html');
        var s = d.querySelector('.listItemsTotal strong');
        var n = s ? parseInt(s.textContent.replace(/\D/g, ''), 10) : NaN;
        if (isNaN(n)) return;
        try { localStorage.setItem(key, JSON.stringify({ n: n, t: Date.now() })); } catch (e) {}
        show(n);
      }).catch(function () {});
    });
  }

  /* „Počet položiek: 147“ */
  function listTotal() {
    Array.prototype.forEach.call(document.querySelectorAll('.listItemsTotal'), function (t) {
      if (t.getAttribute('data-m2')) return;
      var n = t.querySelector('strong');
      if (!n) return;
      t.innerHTML = 'Počet položiek: <strong>' + txt(n) + '</strong>';
      t.setAttribute('data-m2', '1');
    });
  }

  /* ---------- v0.5.3: zľava v jednom štítku s príznakom „Akcia“ ---------- */
  function mergeFlags() {
    Array.prototype.forEach.call(document.querySelectorAll('.flags-extra .flag-discount'), function (d) {
      if (d.getAttribute('data-m2')) return;
      d.setAttribute('data-m2', '1');
      var box = d.closest('.image, .p-image-wrapper, .p-image, .product');
      if (!box) return;
      var act = box.querySelector('.flags-default .flag-action, .flags:not(.flags-extra) .flag-action');
      if (!act && box.classList.contains('p-image-wrapper')) act = document.querySelector('.p-detail-info .flag-action');
      var def = box.querySelector('.flags-default');
      if (act) {
        var s = d.querySelector('.price-save') || d;
        act.insertAdjacentHTML('beforeend', ' <span class="m-save">' + txt(s) + '</span>');
        d.style.display = 'none';
      } else if (def) {
        def.insertBefore(d, def.firstChild);
      }
      var ex = box.querySelector('.flags-extra');
      if (ex && !Array.prototype.some.call(ex.querySelectorAll('.flag'), function (f) { return f.style.display !== 'none'; })) ex.classList.add('m-empty');
    });
  }

  /* ---------- v0.3: detail produktu ---------- */
  function pdp() {
    if (!document.body.classList.contains('type-detail')) return;
    var info = document.querySelector('.p-info-wrapper');
    var h1 = document.querySelector('.p-detail-inner-header h1');
    if (!info || !h1 || info.querySelector('.m-pdp-head')) return;
    var head = el('div', 'm-pdp-head');
    var flags = Array.prototype.filter.call(document.querySelectorAll('.p-detail .p-image-wrapper .flags .flag, .p-detail .p-detail-info .flags .flag'), function (f) { return f.style.display !== 'none'; });
    /* v0.8.3: príznaky (Akcia, Novinka…) modré na hlavnej fotke; zľavu v % ukazuje cena */
    var seen = {}, html = '';
    flags.forEach(function (f) {
      if (f.classList.contains('flag-discount')) return;
      var c = f.cloneNode(true);
      Array.prototype.forEach.call(c.querySelectorAll('.m-save, .price-save'), function (x) { x.parentNode.removeChild(x); });
      var t = txt(c);
      if (!t || seen[t]) return;
      seen[t] = 1;
      var cls = Array.prototype.filter.call(f.classList, function (k) { return /^flag-/.test(k); }).join(' ');
      html += '<span class="flag ' + cls + '">' + t + '</span>';
    });
    var pimg = document.querySelector('.p-detail .p-image-wrapper .p-image');
    if (html && pimg && !pimg.querySelector('.m-img-flags')) pimg.appendChild(el('div', 'flags m-img-flags', html));
    var br = document.querySelector('.p-detail-info a[href*="/znacka/"]');
    if (br) {
      var bn = txt(br.querySelector('span')) || txt(br).replace(/^Značka:\s*/, '');
      var ba = el('a', 'm-pdp-brand', bn);
      ba.href = br.getAttribute('href');
      head.appendChild(ba);
      br.parentNode.style.display = 'none';
    }
    head.appendChild(h1);
    info.insertBefore(head, info.firstChild);
    careTab();
    paramsTab();
    tabsFix();
    /* v0.8.3: súvisiace produkty až za záložky s popisom */
    var tw = document.querySelector('.p-detail > .p-detail-tabs-wrapper');
    var rp = document.querySelector('.p-detail > .products-related');
    var rh = document.querySelector('.p-detail > .products-related-header');
    if (tw && rp) {
      tw.parentNode.insertBefore(rp, tw.nextSibling);
      if (rh) tw.parentNode.insertBefore(rh, rp);
    }
  }

  /* ---------- v0.7: časť „Starostlivosť“ z popisu ako samostatná záložka ---------- */
  function careTab() {
    var desc = document.getElementById('description');
    var tabs = document.getElementById('p-detail-tabs');
    if (!desc || !tabs || document.getElementById('m-care')) return;
    var re = /^\s*starostlivos/i, sec = null, nodes = [];
    Array.prototype.some.call(desc.querySelectorAll('.jj-section'), function (s) {
      var h = s.querySelector('h2, h3');
      if (s.querySelector('.jj-care-list') || (h && re.test(h.textContent))) { sec = s; return true; }
      return false;
    });
    if (sec) {
      nodes = [sec];
    } else {
      var h = Array.prototype.filter.call(desc.querySelectorAll('h2, h3, h4'), function (x) { return re.test(x.textContent); })[0];
      if (!h) return;
      var lvl = +h.tagName.charAt(1);
      nodes = [h];
      for (var n = h.nextElementSibling; n; n = n.nextElementSibling) {
        if (/^H[1-4]$/.test(n.tagName) && +n.tagName.charAt(1) <= lvl) break;
        nodes.push(n);
      }
    }
    var pane = el('div', 'tab-pane fade');
    pane.id = 'm-care';
    pane.setAttribute('role', 'tabpanel');
    var inner = el('div', 'description-inner m-care-inner');
    var wrap = el('div', sec && sec.closest('.jj-wrap') ? 'jj-wrap' : '');
    inner.appendChild(wrap);
    pane.appendChild(inner);
    nodes.forEach(function (x) { wrap.appendChild(x); });
    desc.parentNode.insertBefore(pane, desc.nextSibling);
    var li = el('li', 'shp-tab', '<a href="#m-care" class="shp-tab-link" role="tab" data-toggle="tab">Starostlivosť</a>');
    li.setAttribute('role', 'none');
    var first = tabs.querySelector('li');
    tabs.insertBefore(li, first ? first.nextSibling : null);
  }

  /* ---------- v0.7.6: záložka „Dodatočné parametre“ (z pravého stĺpca popisu) ---------- */
  function paramsTab() {
    var desc = document.getElementById('description');
    var tabs = document.getElementById('p-detail-tabs');
    if (!desc || !tabs || document.getElementById('m-params')) return;
    var ext = desc.querySelector('.extended-description');
    if (!ext || !ext.querySelector('.detail-parameters tr')) return;
    var pane = el('div', 'tab-pane fade');
    pane.id = 'm-params';
    pane.setAttribute('role', 'tabpanel');
    var inner = el('div', 'description-inner m-params-inner');
    inner.appendChild(ext);
    pane.appendChild(inner);
    var care = document.getElementById('m-care');
    var after = care || desc;
    after.parentNode.insertBefore(pane, after.nextSibling);
    var li = el('li', 'shp-tab', '<a href="#m-params" class="shp-tab-link" role="tab" data-toggle="tab">Dodatočné parametre</a>');
    li.setAttribute('role', 'none');
    var ref = tabs.querySelector('a[href="#m-care"]');
    ref = ref ? ref.parentNode : tabs.querySelector('li');
    tabs.insertBefore(li, ref ? ref.nextSibling : null);
  }

  /* ---------- v0.5: všetky záložky na detaile (Shoptet skrýva „Značka“ do menu) ---------- */
  function tabsFix() {
    var vis = document.getElementById('p-detail-tabs');
    var hid = document.querySelector('.shp-tabs-row .hidden-links');
    if (!vis || !hid) return;
    while (hid.firstElementChild) vis.appendChild(hid.firstElementChild);
  }
  var tabsTimer;
  window.addEventListener('resize', function () { clearTimeout(tabsTimer); tabsTimer = setTimeout(tabsFix, 400); });
  window.addEventListener('load', function () { setTimeout(tabsFix, 300); });

  /* ---------- v0.5: obrázky podkategórií (v Shoptete sú len biele zástupné obrázky) ---------- */
  function subcatImages() {
    var links = document.querySelectorAll('.subcategories li a');
    Array.prototype.forEach.call(links, function (a) {
      var img = a.querySelector('.image img');
      if (!img || !/banner-biela/.test((img.getAttribute('src') || '') + ' ' + (img.getAttribute('data-src') || ''))) return;
      var key = 'm2sc:' + a.getAttribute('href');
      var set = function (u) {
        img.removeAttribute('srcset');
        img.removeAttribute('data-src');
        img.src = u;
        a.classList.add('m-sc-photo');
      };
      var c = null;
      try { c = localStorage.getItem(key); } catch (e) {}
      if (c) { set(c); return; }
      if (!window.fetch || !window.DOMParser) return;
      fetch(a.href, { credentials: 'same-origin' }).then(function (r) { return r.text(); }).then(function (t) {
        var d = new DOMParser().parseFromString(t, 'text/html');
        var p = d.querySelector('#products .product img') || d.querySelector('.products-page .product img');
        if (!p) return;
        var u = p.getAttribute('data-src') || p.getAttribute('src');
        if (!u || /^data:/.test(u)) return;
        try { localStorage.setItem(key, u); } catch (e) {}
        set(u);
      }).catch(function () {});
    });
  }

  /* ---------- v1.0: pôvodná cena v kartách – Shoptet ju vo výpise neposiela, berie sa z detailu
     (len akciové karty, až keď sú blízko obrazovky, čítanie HTML sa zastaví hneď za cenou, cache 12 h) ---------- */
  var oldQ = [], oldRun = 0, oldIO = null, oldSeen = window.WeakSet ? new WeakSet() : null, oldBusy = {};
  function oldNum(s) { return parseFloat(String(s).replace(/[^\d,.]/g, '').replace(',', '.')); }
  function oldFetch(url) {
    return fetch(url, { credentials: 'same-origin' }).then(function (r) {
      if (!r.body || !window.TextDecoder) return r.text();
      var rd = r.body.getReader(), dec = new TextDecoder(), buf = '';
      function pump() {
        return rd.read().then(function (x) {
          if (x.done) return buf;
          buf += dec.decode(x.value, { stream: true });
          var w = buf.indexOf('p-final-price-wrapper');
          if (w > -1 && buf.length - w > 2500) { rd.cancel(); return buf; }
          return pump();
        });
      }
      return pump();
    }).then(function (t) {
      var m = t.match(/class="price-standard"[^>]*>\s*<span[^>]*>([^<]+)</);
      return m ? m[1].replace(/\s+/g, ' ').trim() : '';
    });
  }
  function oldSet(url, v) {
    if (!v) return;
    Array.prototype.forEach.call(document.querySelectorAll('.products-block .product .p'), function (p) {
      var a = p.querySelector('a.name') || p.querySelector('a.image');
      if (!a || a.getAttribute('href') !== url || p.querySelector('.m-price-old')) return;
      var fin = p.querySelector('.price-final'), pr = p.querySelector('.prices');
      if (!fin || !pr || !(oldNum(v) > oldNum(fin.textContent))) return;
      var s = el('span', 'm-price-old');
      s.textContent = v;
      pr.insertBefore(s, pr.firstChild);
    });
  }
  function oldNext() {
    while (oldRun < 3 && oldQ.length) {
      (function (job) {
        oldRun++;
        oldFetch(job.url).then(function (v) {
          try { localStorage.setItem('m2old:' + job.url, JSON.stringify({ v: v, t: Date.now() })); } catch (e) {}
          oldSet(job.url, v);
        }).catch(function () {}).then(function () { oldRun--; delete oldBusy[job.url]; oldNext(); });
      })(oldQ.shift());
    }
  }
  function oldQueue(p) {
    var a = p.querySelector('a.name') || p.querySelector('a.image');
    if (!a || !window.fetch) return;
    var url = a.getAttribute('href'), c = null;
    try { c = JSON.parse(localStorage.getItem('m2old:' + url) || 'null'); } catch (e) {}
    if (c && Date.now() - c.t < 432e5) { oldSet(url, c.v); return; }
    if (oldBusy[url]) return;
    oldBusy[url] = 1;
    oldQ.push({ url: url });
    oldNext();
  }
  function cardOldPrice() {
    var cards = document.querySelectorAll('.products-block .product .p');
    if (!cards.length || !oldSeen) return;
    if (!oldIO && window.IntersectionObserver) {
      oldIO = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { oldIO.unobserve(e.target); oldQueue(e.target); } });
      }, { rootMargin: '400px 0px' });
    }
    Array.prototype.forEach.call(cards, function (p) {
      if (oldSeen.has(p) || !p.querySelector('.prices')) return;
      oldSeen.add(p);
      if (!p.querySelector('.flag-action, .flag-discount') || p.querySelector('.m-price-old')) return;
      if (oldIO) oldIO.observe(p); else oldQueue(p);
    });
  }

  /* ---------- v1.0.2: farby vo filtri ako guľôčky (názov ostáva v title) ---------- */
  var COLORS = {
    'bezova': '#d8c3a0', 'biela': '#ffffff', 'cierna': '#111111', 'modra': '#3a6fd8', 'zelena': '#4f9a5c', 'hneda': '#7a4f2a',
    'ruzova': '#f2a7c3', 'strieborna': 'linear-gradient(135deg, #f4f4f4, #a9a9a9)', 'tyrkysova': '#26b3b0', 'cervena': '#d7262e',
    'koralova': '#f47a63', 'zlata': 'linear-gradient(135deg, #f6dc8a, #b8892b)', 'mentolova': '#a6e3c9', 'bordova': '#81003b',
    'oranzova': '#f28c28', 'seda': '#9b9b9b', 'zlta': '#f5d33a', 'fialova': '#8a5bc4', 'svetlomodra': '#8fc3f2', 'tmavomodra': '#1f3a73',
    'olivova': '#7d8b3a', 'kremova': '#f6efd9', 'transparentna': 'linear-gradient(135deg, #ffffff 45%, #dfe7ec 55%)',
    'vzorovana': 'conic-gradient(#d7262e, #f5d33a, #4f9a5c, #3a6fd8, #8a5bc4, #d7262e)',
    'viacfarebna': 'conic-gradient(#d7262e, #f5d33a, #4f9a5c, #3a6fd8, #8a5bc4, #d7262e)'
  };
  function colorKey(s) {
    return String(s).toLowerCase().normalize('NFD').replace(/[^a-z]/g, '');
  }
  function colorDots() {
    Array.prototype.forEach.call(document.querySelectorAll('#filters .filter-section-parametric'), function (sec) {
      var h = sec.querySelector('h4 span') || sec.querySelector('h4');
      if (!h || !/^farb/i.test(h.textContent.trim())) return;
      sec.classList.add('m-colors');
      Array.prototype.forEach.call(sec.querySelectorAll('input[type=checkbox]'), function (inp) {
        var lab = sec.querySelector('label[for="' + inp.id.replace(/"/g, '\\"') + '"]');
        if (!lab || lab.getAttribute('data-m2c')) return;
        var name = inp.value || lab.textContent;
        var c = COLORS[colorKey(name)];
        lab.setAttribute('data-m2c', '1');
        var cnt = lab.querySelector('.filter-count');
        lab.setAttribute('data-tip', name);
        lab.setAttribute('aria-label', name + (cnt ? ' (' + cnt.textContent.trim() + ')' : ''));
        if (c) lab.style.setProperty('--c', c);
      });
    });
  }

  ready(function () {
    document.documentElement.classList.add('m2');
    headerLogo();
    homepage();
    homepage2();
    category();
    filtersBtn();
    filtersFigma();
    listTotal();
    subcatImages();
    mergeFlags();
    sortDrop();
    page404();
    menuImagesInit();
    brandMenu();
    sliderLabels();
    subcatCounts();
    window.addEventListener('load', subcatImages);
    pdp();
    newsletter();
    footer();
    cardOldPrice();
    colorDots();
    document.documentElement.classList.add('m2-ready');
  });
})();

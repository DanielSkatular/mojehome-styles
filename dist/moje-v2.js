/* MOJE WEB 2.0 (v0.7.1) — loader + doplnky DOM pre Shoptet šablónu 11
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
    /* počas parsovania hlavičky blokujúco (Shoptet potom meria menu a záložky už s našimi štýlmi) */
    if (document.readyState === 'loading') {
      document.write('<link id="m2-css" rel="stylesheet" href="' + BASE + 'moje-v2.css">');
    }
    if (!document.getElementById('m2-css')) {
      var link = document.createElement('link');
      link.id = 'm2-css';
      link.rel = 'stylesheet';
      link.href = BASE + 'moje-v2.css';
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
      m2Timer = setTimeout(function () { filtersFigma(); listTotal(); filtersBtn(); mergeFlags(); subcatImages(); }, 60);
    }).observe(document.documentElement, { childList: true, subtree: true });
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
    if (flags.length) {
      head.appendChild(el('div', 'm-pdp-flags', Array.prototype.map.call(flags, function (f) { return '<span>' + txt(f) + '</span>'; }).join('')));
    }
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
    tabsFix();
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
    window.addEventListener('load', subcatImages);
    pdp();
    newsletter();
    footer();
  });
})();

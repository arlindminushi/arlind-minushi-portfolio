/* Arlind Minushi — Portfolio
   Vanilla port of the Claude Design (.dc.html) reactive component.
   No framework: reveals, capability accordion, companies list, sticky nav,
   scroll progress, hero parallax, hero corners and the trailing-dot cursor. */
(function () {
  'use strict';
  var rootEl = document.getElementById('root') || document.body;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* Generic [style-hover] handler — applies the declarations on hover and
     restores prior inline values on leave (replaces the design tool's style-hover). */
  function parseStyle(s) {
    var o = {};
    (s || '').split(';').forEach(function (d) {
      d = d.trim(); if (!d) return;
      var i = d.indexOf(':'); if (i < 0) return;
      o[d.slice(0, i).trim()] = d.slice(i + 1).trim();
    });
    return o;
  }
  function bindHovers(scope) {
    (scope || document).querySelectorAll('[style-hover]').forEach(function (el) {
      if (el.__h) return; el.__h = 1;
      var hov = parseStyle(el.getAttribute('style-hover'));
      el.addEventListener('mouseenter', function () {
        el.__p = {};
        for (var k in hov) { el.__p[k] = el.style.getPropertyValue(k); el.style.setProperty(k, hov[k]); }
      });
      el.addEventListener('mouseleave', function () {
        if (!el.__p) return;
        for (var k in el.__p) { if (el.__p[k]) el.style.setProperty(k, el.__p[k]); else el.style.removeProperty(k); }
        el.__p = null;
      });
    });
  }

  /* Companies & clients — data + interactive list (hover reveals tag, click opens panel). */
  var companies = [
    { name: 'Genpact', tag: 'Principal Consultant · Tech Lead', period: '2025 — NOW', logo: 'uploads/genpactlogo.jpg', blurb: 'Principal Consultant & Tech Lead. I lead a 16-person engineering team and help steer the Kosovo data-engineering practice — delivery, hiring, and technical direction across enterprise engagements.' },
    { name: 'Xponentl Data', tag: 'Data products · platform engineering', period: '2025 — NOW', logo: 'uploads/xponentl.png', blurb: 'Data-products and platform engineering — building and modernizing enterprise data platforms and the workflows that run on top of them.' },
    { name: 'A global biotech', tag: 'Healthcare · data platform', period: '2025', logo: null, blurb: 'Enterprise data-platform engineering — onboarding and lifecycle tooling for data products in a regulated healthcare setting. Client and specifics kept confidential.' },
    { name: 'A global information & media company', tag: 'Enterprise engagement', period: '—', logo: null, blurb: 'Enterprise engagement — data and application work within a large-scale, highly regulated information environment.' },
    { name: 'A major energy company', tag: 'Enterprise engagement', period: '—', logo: null, blurb: 'Enterprise engagement — application and data work supporting large-scale operations.' },
    { name: 'Interex', tag: 'Client engagement', period: '—', logo: 'uploads/InterEx_logo.png', blurb: 'Client engagement — full-stack and data delivery for client-facing digital products.' },
    { name: 'Origin3 Agency', tag: 'Client engagement', period: '—', logo: 'uploads/origin3.webp', blurb: 'Client engagement — web and product development across a range of client work.' },
    { name: 'Kubit', tag: 'Software & data engineering', period: '2022 — 2025', logo: 'uploads/kubitlogo.png', blurb: 'Software & data engineering — built data-driven web and mobile apps end-to-end, including a React Native app shipped to both app stores.' },
    { name: 'Cacttus', tag: 'Data engineering', period: '2020 — 2022', logo: 'uploads/cacttus.png', blurb: 'Data engineering — data modelling, pipelines, and reporting workflows for analytics and operational use cases.' }
  ];

  (function buildCompanies() {
    var host = document.getElementById('companies-list');
    if (!host) return;
    companies.forEach(function (c, i) {
      var idx = (i + 1 < 10 ? '0' : '') + (i + 1);
      var row = document.createElement('div');
      row.setAttribute('style', "display:flex;align-items:center;gap:18px;justify-content:space-between;padding:clamp(14px,2vw,26px) clamp(4px,1.4vw,18px);border-bottom:1px solid var(--line);cursor:pointer;color:var(--ink2);transition:color .35s,background .35s,padding .35s;");
      row.setAttribute('style-hover', "color:var(--ink);background:var(--paper2);padding-left:clamp(12px,3vw,40px);");
      row.innerHTML =
        "<div style=\"display:flex;align-items:baseline;gap:clamp(12px,2vw,28px);min-width:0;\">" +
          "<span style=\"font-family:'JetBrains Mono';font-size:clamp(11px,1.2vw,14px);color:var(--accent);flex:none;\">" + idx + "</span>" +
          "<span style=\"font-size:clamp(26px,5vw,66px);font-weight:600;letter-spacing:-.025em;line-height:1;\">" + esc(c.name) + "</span>" +
          "<span style=\"font-size:clamp(15px,1.6vw,24px);align-self:center;opacity:.45;\">→</span>" +
        "</div>" +
        "<div style=\"font-family:'JetBrains Mono';font-size:clamp(10px,1.1vw,13px);text-align:right;flex:none;line-height:1.7;\">" +
          "<span class=\"c-tag\" style=\"display:block;color:var(--accent);visibility:hidden;\">" + esc(c.tag) + "</span>" +
          "<span style=\"display:block;color:var(--muted);\">" + esc(c.period) + "</span>" +
        "</div>";

      var panel = document.createElement('div');
      panel.setAttribute('style', "display:none;flex-wrap:wrap;gap:clamp(20px,3vw,44px);align-items:center;padding:clamp(24px,3.5vh,44px) clamp(6px,1.4vw,18px);background:var(--paper2);border-bottom:1px solid var(--line);");
      var ph = '';
      if (c.logo) {
        ph += "<div style=\"width:clamp(124px,16vw,184px);height:clamp(84px,10vw,116px);background:#fff;border:1px solid var(--line);border-radius:8px;display:flex;align-items:center;justify-content:center;padding:16px;flex:none;\">" +
              "<img src=\"" + c.logo + "\" alt=\"" + esc(c.name) + "\" style=\"max-width:100%;max-height:100%;object-fit:contain;display:block;\"></div>";
      }
      ph += "<div style=\"flex:1;min-width:240px;\">" +
              "<div style=\"font-family:'JetBrains Mono';font-size:11px;letter-spacing:.16em;color:var(--accent);margin-bottom:12px;\">" + esc(c.tag) + "</div>" +
              "<p style=\"margin:0;font-size:clamp(15px,1.5vw,18px);line-height:1.6;color:var(--ink2);font-weight:300;max-width:660px;\">" + esc(c.blurb) + "</p>" +
            "</div>";
      panel.innerHTML = ph;

      var tagEl = row.querySelector('.c-tag');
      row.addEventListener('mouseenter', function () { tagEl.style.visibility = 'visible'; });
      row.addEventListener('mouseleave', function () { tagEl.style.visibility = 'hidden'; });
      row.addEventListener('click', function () {
        var open = panel.style.display !== 'none';
        if (open) { panel.style.display = 'none'; }
        else { panel.style.display = 'flex'; panel.style.animation = 'panelOpen .55s cubic-bezier(.16,1,.3,1) both'; }
      });
      host.appendChild(row);
      host.appendChild(panel);
    });
  })();

  bindHovers(document);

  /* Scroll reveals (repeating, both directions). */
  var revEls = [], revObs;
  function revealEl(el) {
    if (el.hasAttribute('data-line')) el.style.transform = 'scaleX(1)';
    else if (el.hasAttribute('data-vline')) el.style.transform = 'scaleY(1)';
    else if (el.hasAttribute('data-dot')) el.style.transform = 'scale(1)';
    else { el.style.opacity = '1'; el.style.transform = 'none'; }
  }
  function hideEl(el) {
    if (el.hasAttribute('data-line')) el.style.transform = 'scaleX(0)';
    else if (el.hasAttribute('data-vline')) el.style.transform = 'scaleY(0)';
    else if (el.hasAttribute('data-dot')) el.style.transform = 'scale(0)';
    else { el.style.opacity = '0'; el.style.transform = 'translateY(34px)'; }
  }
  function isSpecial(el) {
    return el.hasAttribute('data-line') || el.hasAttribute('data-vline') || el.hasAttribute('data-dot');
  }
  if (!reduce && 'IntersectionObserver' in window) {
    revEls = [].slice.call(rootEl.querySelectorAll('[data-reveal],[data-line],[data-vline],[data-dot]'));
    revEls.forEach(function (el) {
      if (!isSpecial(el)) {
        var base = el.style.transition;
        el.style.transition = (base ? base + ',' : '') + 'opacity .5s ease-out,transform .5s ease-out';
      }
      hideEl(el);
    });
    requestAnimationFrame(function () {
      var vh = window.innerHeight || 800;
      revEls.forEach(function (el) { var r = el.getBoundingClientRect(); if (r.top < vh * 0.88 && r.bottom > 0) revealEl(el); });
    });
    revObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var el = e.target;
        if (e.isIntersecting) {
          var d = parseInt(el.getAttribute('data-reveal-delay') || '0', 10);
          el.style.transitionDelay = (d / 1000) + 's';
          revealEl(el);
        } else { el.style.transitionDelay = '0s'; hideEl(el); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revEls.forEach(function (el) { revObs.observe(el); });
    // Safety for throttled environments — reveal whatever is in view after a beat.
    setTimeout(function () {
      var vh = window.innerHeight || 800;
      revEls.forEach(function (el) { var r = el.getBoundingClientRect(); if (r.top < vh && r.bottom > 0) revealEl(el); });
    }, 1400);
  }

  /* Expandable capability cards (accessible native buttons). */
  [].slice.call(rootEl.querySelectorAll('[data-cap]')).forEach(function (btn) {
    var detail = btn.querySelector('[data-cap-detail]');
    var chev = btn.querySelector('[data-cap-chev]');
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      if (!detail) return;
      if (open) { detail.style.maxHeight = '0'; detail.style.opacity = '0'; if (chev) chev.style.transform = 'rotate(0deg)'; }
      else { detail.style.maxHeight = detail.scrollHeight + 'px'; detail.style.opacity = '1'; if (chev) chev.style.transform = 'rotate(45deg)'; }
    });
  });

  /* Combined scroll handler: hero parallax + progress bar + sticky nav + reveal self-heal. */
  var heroWrap = document.getElementById('herowrap');
  var bar = document.getElementById('progressbar');
  var nav = document.getElementById('nav');
  function onScroll() {
    var y = window.scrollY || window.pageYOffset || 0;
    if (heroWrap) heroWrap.style.transform = 'translateY(' + Math.min(y * 0.08, 60) + 'px)';
    if (bar) {
      var h = document.documentElement;
      var max = (h.scrollHeight - h.clientHeight) || 1;
      bar.style.transform = 'scaleX(' + Math.min(1, Math.max(0, y / max)) + ')';
    }
    if (nav) {
      var show = y > (window.innerHeight || 800) * 0.55;
      nav.style.transform = show ? 'translateY(0)' : 'translateY(-110%)';
      nav.style.opacity = show ? '1' : '0';
      nav.style.pointerEvents = show ? 'auto' : 'none';
    }
    if (revEls.length) {
      var vh2 = window.innerHeight || 800;
      for (var i = 0; i < revEls.length; i++) {
        var el = revEls[i]; var r = el.getBoundingClientRect();
        if (r.top < vh2 * 0.85 && r.bottom > vh2 * 0.15) revealEl(el);
      }
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  requestAnimationFrame(onScroll);

  /* Hero corner anchors: hide on small screens, drop the center tech strip earlier. */
  function applyHeroCorners() {
    var w = window.innerWidth || 1200;
    [].slice.call(rootEl.querySelectorAll('[data-hero-corner]')).forEach(function (el) {
      el.style.display = w < 680 ? 'none' : (el.getAttribute('data-show') || 'block');
    });
    var strip = rootEl.querySelector('[data-hero-strip]');
    if (strip) strip.style.display = w < 1024 ? 'none' : 'flex';
  }
  applyHeroCorners();
  window.addEventListener('resize', applyHeroCorners, { passive: true });

  /* Trailing-dot cursor (pointer devices only). */
  if (!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches)) {
    var N = 7, trail = [];
    for (var i = 0; i < N; i++) {
      var sz = Math.max(4, 13 - i * 1.4);
      var d = document.createElement('div');
      d.style.cssText = 'position:fixed;top:0;left:0;width:' + sz + 'px;height:' + sz + 'px;border-radius:50%;background:var(--accent);pointer-events:none;z-index:99998;opacity:' + (0.6 - i * 0.07).toFixed(2) + ';transform:translate(-50%,-50%);will-change:transform;';
      document.body.appendChild(d);
      trail.push({ el: d, x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }
    var mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    window.addEventListener('mousemove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
    (function loop() {
      var px = mouse.x, py = mouse.y;
      for (var j = 0; j < trail.length; j++) {
        var t = trail[j];
        t.x += (px - t.x) * 0.35; t.y += (py - t.y) * 0.35;
        t.el.style.transform = 'translate(' + t.x + 'px,' + t.y + 'px) translate(-50%,-50%)';
        px = t.x; py = t.y;
      }
      requestAnimationFrame(loop);
    })();
  }
})();

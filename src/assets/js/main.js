/* =====================================================================
   IL PAESAGGIO INTERIORE — interazioni
   Vanilla JS, nessuna dipendenza esterna. Rispetta prefers-reduced-motion.
   ===================================================================== */
(function () {
  'use strict';

  document.documentElement.classList.add('motion-ready');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Anno nel footer ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Footer: colonne ampie, menu espandibili sotto i 900px ---------- */
  var footerMenus = document.querySelectorAll('.footer__menu');
  var footerMobile = window.matchMedia('(max-width: 900px)');
  function syncFooterMenus() {
    footerMenus.forEach(function (menu) {
      menu.open = !footerMobile.matches;
    });
  }
  if (footerMenus.length) {
    syncFooterMenus();
    footerMobile.addEventListener('change', syncFooterMenus);
  }

  /* ---------- Preloader ---------- */
  var preloader = document.getElementById('preloader');
  var preloaderStartedAt = performance.now();
  var PRELOADER_MIN_MS = 250;
  var PRELOADER_MAX_MS = 2500;
  function hidePreloader() {
    if (preloader) preloader.classList.add('done');
  }
  if (!preloader || reduceMotion) {
    hidePreloader();
  } else {
    window.addEventListener('load', function () {
      var elapsed = performance.now() - preloaderStartedAt;
      setTimeout(hidePreloader, Math.max(0, PRELOADER_MIN_MS - elapsed));
    });
    // Rete di sicurezza: il contenuto non rimane mai bloccato.
    setTimeout(hidePreloader, PRELOADER_MAX_MS);
  }

  /* ---------- Header: stato "scrolled" ---------- */
  var header = document.getElementById('header');
  function onScrollHeader() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 40);
  }
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  /* ---------- Nav mobile ---------- */
  var toggle = document.getElementById('navToggle');
  var navList = document.getElementById('navList');
  var navMobile = window.matchMedia('(max-width: 1200px)');
  if (toggle && navList) {
    function setNavOpen(open, restoreFocus) {
      document.body.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Chiudi il menu' : 'Apri il menu');
      if (open && navMobile.matches) {
        var firstLink = navList.querySelector('a[href]');
        if (firstLink) firstLink.focus();
      } else if (restoreFocus) {
        toggle.focus();
      }
    }

    toggle.addEventListener('click', function () {
      var willOpen = !document.body.classList.contains('nav-open');
      setNavOpen(willOpen, !willOpen);
    });

    navList.addEventListener('click', function (e) {
      if (e.target.closest('a') && document.body.classList.contains('nav-open')) {
        setNavOpen(false, false);
      }
    });

    document.addEventListener('keydown', function (e) {
      if (!document.body.classList.contains('nav-open')) return;
      if (e.key === 'Escape') {
        setNavOpen(false, true);
        return;
      }
      if (e.key === 'Tab' && navMobile.matches) {
        var links = navList.querySelectorAll('a[href]');
        var firstLink = links[0];
        var lastControl = toggle;
        if (e.shiftKey && document.activeElement === firstLink) {
          e.preventDefault();
          lastControl.focus();
        } else if (!e.shiftKey && document.activeElement === lastControl) {
          e.preventDefault();
          firstLink.focus();
        }
      }
    });
  }

  /* ---------- Reveal on scroll (IntersectionObserver) ---------- */
  function isRevealable(c) { return c.classList && (c.classList.contains('reveal') || c.classList.contains('blur-in')); }
  var reveals = document.querySelectorAll('.reveal, .blur-in');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          // stagger tra fratelli animati (.reveal / .blur-in)
          var siblings = Array.prototype.filter.call(
            el.parentElement ? el.parentElement.children : [],
            isRevealable
          );
          var idx = siblings.indexOf(el);
          el.style.transitionDelay = (idx > 0 ? idx * 80 : 0) + 'ms';
          el.classList.add('is-visible');
          io.unobserve(el);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });

    // Rete di sicurezza: se l'IntersectionObserver non rivela nulla
    // (ambienti anomali/vecchi browser), rivela in base allo scroll.
    setTimeout(function () {
      if (document.querySelector('.is-visible')) return; // IO funziona: nessun intervento
      function inView() {
        reveals.forEach(function (el) {
          if (el.classList.contains('is-visible')) return;
          if (el.getBoundingClientRect().top < window.innerHeight * 0.9) el.classList.add('is-visible');
        });
      }
      inView();
      window.addEventListener('scroll', function () { window.requestAnimationFrame(inView); }, { passive: true });
    }, 1500);
  }

  /* ---------- Parallax colline: attiva solo quando visibile ---------- */
  var layers = document.querySelectorAll('.landscape__layer');
  var landscapeHero = document.querySelector('.hero');
  var landscapeFrameId = null;
  var landscapeInView = true;
  var landscapeTarget = window.scrollY;
  var landscapeCurrent = landscapeTarget;
  var landscapeElapsed = 0;
  var landscapeLastFrame = 0;
  var landscapeLastPaint = 0;

  function stopLandscapeLoop() {
    if (landscapeFrameId === null) return;
    cancelAnimationFrame(landscapeFrameId);
    landscapeFrameId = null;
    landscapeLastFrame = 0;
  }

  function landscapeLoop(now) {
    landscapeFrameId = null;
    if (document.hidden || !landscapeInView) return;

    if (!landscapeLastFrame) landscapeLastFrame = now;
    landscapeElapsed += Math.min(now - landscapeLastFrame, 50);
    landscapeLastFrame = now;

    var landscapeFrameInterval = window.innerWidth <= 1200 ? 33 : 0;
    if (!landscapeFrameInterval || now - landscapeLastPaint >= landscapeFrameInterval) {
      landscapeCurrent += (landscapeTarget - landscapeCurrent) * 0.08;
      var t = landscapeElapsed / 1000;
      for (var i = 0; i < layers.length; i++) {
        var depth = parseFloat(layers[i].getAttribute('data-depth')) || 0.2;
        var sway = Math.sin(t * 0.26 + i * 0.9) * (5 + i * 3);
        layers[i].style.transform = 'translate3d(' + sway.toFixed(2) + 'px,' + (landscapeCurrent * depth).toFixed(2) + 'px,0)';
      }
      landscapeLastPaint = now;
    }
    landscapeFrameId = requestAnimationFrame(landscapeLoop);
  }

  function startLandscapeLoop() {
    if (reduceMotion || !layers.length || document.hidden || !landscapeInView || landscapeFrameId !== null) return;
    landscapeLastFrame = 0;
    landscapeFrameId = requestAnimationFrame(landscapeLoop);
  }

  function syncPageVisibility() {
    document.documentElement.classList.toggle('page-hidden', document.hidden);
    if (document.hidden) stopLandscapeLoop();
    else startLandscapeLoop();
  }
  document.addEventListener('visibilitychange', syncPageVisibility);
  syncPageVisibility();

  if (!reduceMotion && layers.length) {
    window.addEventListener('scroll', function () { landscapeTarget = window.scrollY; }, { passive: true });
    if ('IntersectionObserver' in window && landscapeHero) {
      var landscapeObserver = new IntersectionObserver(function (entries) {
        landscapeInView = entries[0].isIntersecting;
        if (landscapeInView) startLandscapeLoop();
        else stopLandscapeLoop();
      }, { threshold: 0 });
      landscapeObserver.observe(landscapeHero);
    }
    startLandscapeLoop();
  }

  /* ---------- Animazione parole scroll-driven (stile David Whyte) ---------- */
  var wordEls = [];
  var wordBlocks = document.querySelectorAll('.js-words');
  function splitWords(node) {
    // avvolge ogni parola in <span class="word">, preservando elementi inline (es. <em>)
    Array.prototype.slice.call(node.childNodes).forEach(function (child) {
      if (child.nodeType === 3) { // testo
        var frag = document.createDocumentFragment();
        child.nodeValue.split(/(\s+)/).forEach(function (chunk) {
          if (chunk.trim() === '') { frag.appendChild(document.createTextNode(chunk)); return; }
          var span = document.createElement('span');
          span.className = 'word';
          span.textContent = chunk;
          frag.appendChild(span);
          wordEls.push(span);
        });
        node.replaceChild(frag, child);
      } else if (child.nodeType === 1) { // elemento inline
        splitWords(child);
      }
    });
  }

  if (!reduceMotion && wordBlocks.length) {
    wordBlocks.forEach(function (block) { splitWords(block); block.classList.add('is-ready'); });

    var wTicking = false;
    function updateWords() {
      var focal = window.innerHeight * 0.52;   // punto "a fuoco" verticale
      var range = window.innerHeight * 0.42;    // ampiezza della dissolvenza
      for (var i = 0; i < wordEls.length; i++) {
        var r = wordEls[i].getBoundingClientRect();
        var center = r.top + r.height / 2;
        var dist = Math.abs(center - focal);
        var o = 1 - Math.max(0, (dist - range * 0.15)) / range;
        wordEls[i].style.opacity = Math.max(0.16, Math.min(1, o)).toFixed(3);
      }
      wTicking = false;
    }
    window.addEventListener('scroll', function () {
      if (!wTicking) { window.requestAnimationFrame(updateWords); wTicking = true; }
    }, { passive: true });
    window.addEventListener('resize', function () {
      if (!wTicking) { window.requestAnimationFrame(updateWords); wTicking = true; }
    }, { passive: true });
    updateWords();
  }

  /* ---------- Contatti / prenotazione ---------- */
  // SEGNAPOSTO da sostituire con i dati reali della professionista:
  var WHATSAPP_NUMBER = (document.body && document.body.getAttribute('data-whatsapp')) || '393298335497'; // dal pannello (site.json)
  var WHATSAPP_MSG = (document.body && document.body.getAttribute('data-whatsapp-msg')) || 'Salve, vorrei informazioni per un primo colloquio.';
  var WHATSAPP_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2.1-.4 0-.5l-.9-2.1c-.2-.5-.4-.4-.6-.5h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s1 2.5 1.1 2.7c.1.2 1.9 2.9 4.6 4 .6.3 1.1.5 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.5-.4z"/><path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.1-1.3c1.4.8 3.1 1.2 4.9 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3C4.4 15.1 4 13.6 4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8z"/></svg>';
  var bookingHref = document.getElementById('prenota') ? '#prenota' : 'index.html#prenota';

  /* ---------- Mobile: barra "Prenota" fissa in fondo (decisione dedicata al phone) ---------- */
  (function () {
    if (document.querySelector('.mobile-cta')) return;
    var bar = document.createElement('div');
    bar.className = 'mobile-cta';
    var primary = document.createElement('a');
    primary.className = 'btn btn--amber mobile-cta__primary';
    primary.href = bookingHref;
    primary.textContent = 'Primo contatto';
    var whatsapp = document.createElement('a');
    whatsapp.className = 'mobile-cta__whatsapp';
    whatsapp.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(WHATSAPP_MSG);
    whatsapp.target = '_blank';
    whatsapp.rel = 'noopener';
    whatsapp.setAttribute('aria-label', 'Scrivici su WhatsApp');
    whatsapp.innerHTML = WHATSAPP_ICON;
    bar.appendChild(primary);
    bar.appendChild(whatsapp);
    document.body.appendChild(bar);
    document.body.classList.add('has-mobile-cta');
  })();

  /* ---------- WhatsApp flottante (tutte le pagine) ---------- */
  (function () {
    if (document.querySelector('.whatsapp-float')) return;
    var a = document.createElement('a');
    a.className = 'whatsapp-float';
    a.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(WHATSAPP_MSG);
    a.target = '_blank';
    a.rel = 'noopener';
    a.setAttribute('aria-label', 'Scrivici su WhatsApp');
    a.innerHTML = WHATSAPP_ICON;
    document.body.appendChild(a);
  })();

  /* ---------- Validazione form (demo front-end) ---------- */
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');
  if (form) {
    function markInvalidFields() {
      var invalidFields = form.querySelectorAll(':invalid');
      invalidFields.forEach(function (field) {
        field.setAttribute('aria-invalid', 'true');
      });
      return invalidFields[0];
    }

    function clearFieldError(e) {
      if (e.target.checkValidity()) e.target.removeAttribute('aria-invalid');
    }

    form.addEventListener('input', clearFieldError);
    form.addEventListener('change', clearFieldError);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // validazione nativa + messaggio accessibile
      if (!form.checkValidity()) {
        var firstInvalid = markInvalidFields();
        if (firstInvalid) firstInvalid.focus();
        if (note) { note.textContent = 'Controlla i campi obbligatori evidenziati.'; note.style.color = '#A0442C'; }
        return;
      }
      // Invio a Netlify Forms via AJAX (mantiene la conferma inline, niente reload).
      var submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn) { submitBtn.disabled = true; }
      if (note) { note.textContent = 'Invio in corso…'; note.style.color = ''; }
      var payload = new URLSearchParams(new FormData(form)).toString();
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: payload
      }).then(function (res) {
        if (!res.ok) { throw new Error('network'); }
        if (note) { note.textContent = 'Grazie, messaggio inviato. Ti risponderò personalmente entro 48 ore.'; note.style.color = ''; }
        form.reset();
      }).catch(function () {
        if (note) { note.textContent = 'Invio non riuscito. Riprova, oppure scrivimi su WhatsApp.'; note.style.color = '#A0442C'; }
      }).then(function () {
        if (submitBtn) { submitBtn.disabled = false; }
      });
    });
  }
})();

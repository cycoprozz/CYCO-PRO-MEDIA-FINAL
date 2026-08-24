/* CYCO PRO MEDIA — interactions: menu overlay, lightbox, video, booking */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var body = document.body;

  var ICONS = {
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>',
    prev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>'
  };

  /* ---------- Fullscreen menu overlay ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var overlay = document.getElementById('menu-overlay');
  var closeBtn = overlay && overlay.querySelector('.menu-close');
  var firstLink = overlay && overlay.querySelector('.menu-overlay__links a');

  function openMenu() {
    body.classList.add('menu-open');
    if (overlay) overlay.setAttribute('aria-hidden', 'false');
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
    if (firstLink) firstLink.focus();
  }

  function closeMenu() {
    body.classList.remove('menu-open');
    if (overlay) overlay.setAttribute('aria-hidden', 'true');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    if (toggle) toggle.focus();
  }

  if (toggle && overlay) {
    toggle.addEventListener('click', function () {
      if (body.classList.contains('menu-open')) closeMenu();
      else openMenu();
    });
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    overlay.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }

  /* ---------- Lightbox ---------- */
  var photos = Array.prototype.slice.call(document.querySelectorAll('.photo-grid img'));
  var lightbox = null;
  var lbImg = null;
  var lbCaption = null;
  var lbIndex = 0;
  var lbLastFocus = null;

  function showLightbox(i) {
    var n = photos.length;
    if (!n) return;
    lbIndex = ((i % n) + n) % n;
    lbImg.src = photos[lbIndex].currentSrc || photos[lbIndex].src;
    lbImg.alt = photos[lbIndex].alt || '';
    lbCaption.textContent = photos[lbIndex].alt || '';
    lbLastFocus = document.activeElement;
    body.classList.add('no-scroll');
    lightbox.classList.add('is-open');
    lightbox.querySelector('.lb-close').focus();
  }

  function hideLightbox() {
    body.classList.remove('no-scroll');
    lightbox.classList.remove('is-open');
    if (lbLastFocus && lbLastFocus.focus) lbLastFocus.focus();
  }

  function lightboxStep(dir) {
    if (!lightbox.classList.contains('is-open')) return;
    showLightbox(lbIndex + dir);
  }

  if (photos.length) {
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Photo viewer');
    lightbox.innerHTML =
      '<button class="lb-btn lb-close" type="button" aria-label="Close">' + ICONS.x + '</button>' +
      '<button class="lb-btn lb-prev" type="button" aria-label="Previous photo">' + ICONS.prev + '</button>' +
      '<img class="lb-img" alt="" />' +
      '<button class="lb-btn lb-next" type="button" aria-label="Next photo">' + ICONS.next + '</button>' +
      '<p class="lb-caption"></p>';
    document.body.appendChild(lightbox);

    lbImg = lightbox.querySelector('.lb-img');
    lbCaption = lightbox.querySelector('.lb-caption');

    lightbox.querySelector('.lb-close').addEventListener('click', hideLightbox);
    lightbox.querySelector('.lb-prev').addEventListener('click', function () { lightboxStep(-1); });
    lightbox.querySelector('.lb-next').addEventListener('click', function () { lightboxStep(1); });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) hideLightbox();
    });

    photos.forEach(function (img, i) {
      img.addEventListener('click', function () { showLightbox(i); });
    });
  }

  /* ---------- Video click-to-play ---------- */
  document.querySelectorAll('.photo-media video').forEach(function (video) {
    var wrap = video.parentElement;
    var muteBtn = wrap && wrap.querySelector('.photo-mute');
    video.addEventListener('click', function () {
      if (video.paused) video.play();
      else video.pause();
    });
    if (muteBtn) {
      muteBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        video.muted = !video.muted;
        muteBtn.classList.toggle('is-muted', video.muted);
        muteBtn.setAttribute('aria-pressed', String(video.muted));
      });
    }
  });

  /* ---------- Keyboard: ESC / arrows ---------- */
  document.addEventListener('keydown', function (e) {
    if (lightbox && lightbox.classList.contains('is-open')) {
      if (e.key === 'Escape') { e.preventDefault(); hideLightbox(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); lightboxStep(-1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); lightboxStep(1); }
      return;
    }
    if (overlay && body.classList.contains('menu-open') && e.key === 'Escape') {
      e.preventDefault();
      closeMenu();
    }
  });

  /* ---------- Reveal on scroll ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add('is-in');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal, [data-reveal]').forEach(function (el) {
    io.observe(el);
  });

  /* ---------- Booking form (package-aware) ---------- */
  var PACKAGES = {
    'Photography': ['Starter — $200', 'Business — $500', 'Custom — $1,500+'],
    'Videography': ['Event Reel — from $500', 'Commercial Video — from $1,500', 'Custom Production — quote'],
    'Web Development': ['Landing Page — $750', 'Business Site — $1,500+', 'Maintenance — $200/mo'],
    'Content Creation': ['Content Retainer — from $600/mo', 'One-off Campaign — quote']
  };
  var svcSelect = document.getElementById('bk-service');
  var pkgSelect = document.getElementById('bk-package');
  var bookingForm = document.getElementById('booking-form');
  var bookingNote = document.getElementById('booking-note');

  function fillPackages(service, selectPkg) {
    if (!pkgSelect) return;
    var list = PACKAGES[service] || [];
    pkgSelect.innerHTML = '<option value="" disabled' + (selectPkg ? '' : ' selected') + '>Choose a package…</option>';
    list.forEach(function (p) {
      var o = document.createElement('option');
      o.textContent = p;
      if (selectPkg && p === selectPkg) o.selected = true;
      pkgSelect.appendChild(o);
    });
    pkgSelect.disabled = list.length === 0;
  }

  if (svcSelect && pkgSelect) {
    svcSelect.addEventListener('change', function () { fillPackages(svcSelect.value); });
  }

  // Pricing-card buttons: prefill form and scroll
  document.querySelectorAll('.btn[data-package]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var service = btn.getAttribute('data-service');
      var pkg = btn.getAttribute('data-package');
      if (svcSelect && pkgSelect && service) {
        svcSelect.value = service;
        fillPackages(service, pkg);
      }
      var booking = document.getElementById('booking');
      if (booking) {
        e.preventDefault();
        booking.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
        booking.classList.add('booking--flash');
        setTimeout(function () { booking.classList.remove('booking--flash'); }, 1200);
      }
    });
  });

  // Submit: build mailto
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var get = function (id) { return (document.getElementById(id) || {}).value || ''; };
      var service = get('bk-service');
      var pkg = get('bk-package');
      var name = get('bk-name');
      var email = get('bk-email');
      var date = get('bk-date');
      var budget = get('bk-budget');
      var message = get('bk-message');
      if (!service || !pkg || !name || !email) {
        if (bookingNote) bookingNote.textContent = 'Please fill in service, package, name, and email.';
        return;
      }
      var subject = 'Booking — ' + service + ' / ' + pkg + ' — ' + name;
      var lines = [
        'Hi Joffre,', '',
        "I'd like to book the following:", '',
        'Service: ' + service,
        'Package: ' + pkg,
        'Name: ' + name,
        'Email: ' + email,
        date ? 'Preferred date: ' + date : '',
        budget ? 'Budget range: ' + budget : '',
        message ? '' : '', message ? 'Details: ' + message : '',
        '', 'Thanks!'
      ].filter(function (l, i, a) { return !(l === '' && a[i - 1] === ''); });
      var href = 'mailto:joffre@cycopromedia.com?subject=' +
        encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
      window.location.href = href;
      if (bookingNote) bookingNote.textContent = 'Opening your email app with the details pre-filled…';
    });
  }

  /* ---------- Footer year ---------- */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = String(new Date().getFullYear());
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();

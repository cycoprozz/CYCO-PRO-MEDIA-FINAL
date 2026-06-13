/* CYCO PRO MEDIA — motion engine */
(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  /* ---------- Preloader ---------- */
  const pre = document.getElementById('preloader');
  const preCount = document.getElementById('pre-count');
  function finishLoad() {
    document.body.classList.add('is-loaded');
    if (pre) pre.classList.add('is-done');
    document.body.classList.remove('is-locked');
  }
  if (pre && preCount && !reduced) {
    document.body.classList.add('is-locked');
    let n = 0;
    const tick = setInterval(() => {
      n = Math.min(100, n + Math.ceil(Math.random() * 7));
      preCount.textContent = String(n);
      if (n >= 100) {
        clearInterval(tick);
        setTimeout(finishLoad, 350);
      }
    }, 28);
  } else {
    finishLoad();
  }

  /* ---------- Atlanta clock ---------- */
  const clock = document.getElementById('clock');
  if (clock) {
    const fmt = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false, timeZone: 'America/New_York'
    });
    const update = () => { clock.textContent = 'ATL — ' + fmt.format(new Date()); };
    update();
    setInterval(update, 1000);
  }

  /* ---------- Fullscreen menu ---------- */
  const menuBtn = document.getElementById('menu-btn');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      const open = document.body.classList.toggle('menu-open');
      menuBtn.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('is-locked', open);
    });
    document.querySelectorAll('.nav-overlay a[href^="#"]').forEach((a) => {
      a.addEventListener('click', () => {
        document.body.classList.remove('menu-open', 'is-locked');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
        document.body.classList.remove('menu-open', 'is-locked');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Custom cursor (desktop only) ---------- */
  if (finePointer && !reduced) {
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (dot && ring) {
      let mx = -100, my = -100, rx = -100, ry = -100;
      window.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });
      (function loop() {
        rx += (mx - rx) * 0.16;
        ry += (my - ry) * 0.16;
        dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
        ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
        requestAnimationFrame(loop);
      })();
      document.querySelectorAll('a, button, .pillar, .port-card').forEach((el) => {
        el.addEventListener('mouseenter', () => ring.classList.add('is-active'));
        el.addEventListener('mouseleave', () => ring.classList.remove('is-active'));
      });
    }
  }

  /* ---------- Magnetic elements ---------- */
  if (finePointer && !reduced) {
    document.querySelectorAll('[data-magnetic]').forEach((el) => {
      const strength = 0.35;
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1)';
        el.style.transform = '';
        setTimeout(() => { el.style.transition = ''; }, 500);
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add('is-in');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal, .about__media').forEach((el) => io.observe(el));

  /* ---------- Dark-section cursor inversion ---------- */
  const darkIO = new IntersectionObserver((entries) => {
    let onDark = false;
    entries.forEach((en) => { if (en.isIntersecting) onDark = true; });
    document.body.classList.toggle('on-dark', onDark);
  }, { threshold: 0.5 });
  document.querySelectorAll('.section--dark').forEach((el) => darkIO.observe(el));

  /* ---------- Manifesto: scroll-driven word lighting ---------- */
  const manifesto = document.querySelector('.manifesto');
  const manifestoText = document.querySelector('.manifesto__text');
  if (manifesto && manifestoText) {
    const words = manifestoText.textContent.trim().split(/\s+/);
    manifestoText.innerHTML = words.map((w) => `<span class="w">${w}</span>`).join(' ');
    const spans = manifestoText.querySelectorAll('.w');
    if (reduced) {
      spans.forEach((s) => s.classList.add('lit'));
    } else {
      let ticking = false;
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const r = manifesto.getBoundingClientRect();
          const total = r.height - window.innerHeight;
          const progress = Math.min(1, Math.max(0, -r.top / total));
          const lit = Math.floor(progress * spans.length * 1.15);
          spans.forEach((s, i) => s.classList.toggle('lit', i < lit));
          ticking = false;
        });
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  }

  /* ---------- Pillars: floating image follows cursor ---------- */
  const floatImg = document.getElementById('float-img');
  if (floatImg && finePointer && !reduced) {
    const imgEl = floatImg.querySelector('img');
    let fx = 0, fy = 0, tx = 0, ty = 0, visible = false;
    window.addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; }, { passive: true });
    (function followLoop() {
      fx += (tx - fx) * 0.1;
      fy += (ty - fy) * 0.1;
      if (visible) floatImg.style.left = fx + 'px', floatImg.style.top = fy + 'px';
      requestAnimationFrame(followLoop);
    })();
    document.querySelectorAll('.pillar').forEach((p) => {
      p.addEventListener('mouseenter', () => {
        imgEl.src = p.dataset.img;
        visible = true;
        floatImg.classList.add('is-on');
      });
      p.addEventListener('mouseleave', () => {
        visible = false;
        floatImg.classList.remove('is-on');
      });
    });
  }
  /* tap toggle for touch */
  document.querySelectorAll('.pillar').forEach((p) => {
    p.addEventListener('click', () => p.classList.toggle('is-open'));
  });

  /* ---------- Portfolio slideshows ---------- */
  const SHUFFLE = new Set(['editorial', 'event', 'brand', 'art']);
  const WEB_LABELS = [
    'Theo Jones · Beauty & Wellness',
    'Ambassador Global Chauffeur · Luxury Transportation',
    'Self-Building Game',
    'Tesla Arcade Creator',
    'Spaceship Game'
  ];
  function imgPath(prefix, i) {
    return 'images/portfolio/' + prefix + '/' + prefix + '-' + i + '.jpg';
  }

  document.querySelectorAll('[data-slideshow]').forEach((card) => {
    const prefix = card.getAttribute('data-slideshow');
    const count = parseInt(card.getAttribute('data-count'), 10);
    const img = card.querySelector('.slide-img');
    const dotsWrap = card.querySelector('.slide-dots');
    const prevBtn = card.querySelector('.slide-btn.prev');
    const nextBtn = card.querySelector('.slide-btn.next');
    const webVisit = card.querySelector('.web-visit');
    let projectUrls = [];
    try { projectUrls = JSON.parse(card.getAttribute('data-project-urls') || '[]'); } catch (e) {}
    if (!img || !count) return;

    let images = [];
    for (let i = 1; i <= count; i++) images.push(imgPath(prefix, i));

    if (SHUFFLE.has(prefix) && !reduced) {
      for (let r = 0; r < 5; r++) {
        for (let s = images.length - 1; s > 0; s--) {
          const j = Math.floor(Math.random() * (s + 1));
          [images[s], images[j]] = [images[j], images[s]];
        }
      }
    }
    let current = 0;
    img.src = images[0];

    // dots
    const dots = [];
    if (dotsWrap) {
      for (let d = 0; d < count; d++) {
        const dot = document.createElement('button');
        dot.className = 'slide-dot' + (d === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Image ' + (d + 1));
        dot.addEventListener('click', (function (idx) { return function () { go(idx); }; })(d));
        dotsWrap.appendChild(dot);
        dots.push(dot);
      }
    }

    function go(idx) {
      current = (idx + count) % count;
      img.style.opacity = '0';
      setTimeout(() => { img.src = images[current]; img.style.opacity = '1'; }, 150);
      dots.forEach((dd, di) => dd.classList.toggle('active', di === current));
      if (prefix === 'web-projects') {
        const lbl = document.getElementById('web-projects-label');
        if (lbl) lbl.textContent = WEB_LABELS[current] || '';
      }
    }

    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); go(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); go(current + 1); });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(current - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(current + 1); }
    });

    // web-projects: click image opens live site
    if (prefix === 'web-projects' && projectUrls.length) {
      img.style.cursor = 'pointer';
      img.addEventListener('click', () => {
        const url = projectUrls[current];
        if (url) window.open(url, '_blank', 'noopener');
      });
    }

    // auto-advance, pause on hover/hidden
    let timer = setInterval(() => { if (!document.hidden) go(current + 1); }, 4000);
    card.addEventListener('mouseenter', () => clearInterval(timer));
    card.addEventListener('mouseleave', () => {
      clearInterval(timer);
      timer = setInterval(() => { if (!document.hidden) go(current + 1); }, 4000);
    });
  });

  /* ---------- Video players ---------- */
  document.querySelectorAll('[data-video-toggle]').forEach((media) => {
    const video = media.querySelector('video');
    const overlay = media.querySelector('.vid-overlay');
    const mute = media.querySelector('.vid-mute');
    if (!video) return;

    function showOverlay(show) {
      if (!overlay) return;
      overlay.style.opacity = show ? '1' : '0';
      overlay.style.pointerEvents = show ? 'auto' : 'none';
    }
    function toggle() {
      if (video.paused) { video.play(); showOverlay(false); }
      else { video.pause(); showOverlay(true); }
    }
    if (overlay) overlay.addEventListener('click', (e) => { e.stopPropagation(); toggle(); });
    video.addEventListener('click', toggle);
    video.addEventListener('ended', () => showOverlay(true));
    if (mute) mute.addEventListener('click', (e) => {
      e.stopPropagation();
      video.muted = !video.muted;
      mute.textContent = video.muted ? '🔇' : '🔊';
    });
  });

  /* ---------- Commercial video slideshow ---------- */
  const commVideo = document.querySelector('[data-video-slideshow="comm"]');
  if (commVideo) {
    const vCount = parseInt(commVideo.getAttribute('data-video-count'), 10);
    const base = 'images/portfolio/commercial/comm-';
    let vCur = 0;
    const wrap = commVideo.closest('.port-card__media');
    function swap(dir) {
      vCur = (vCur + dir + vCount) % vCount;
      const wasPlaying = !commVideo.paused;
      commVideo.src = base + (vCur + 1) + '.mp4';
      commVideo.load();
      if (wasPlaying) commVideo.play();
    }
    const vp = wrap && wrap.querySelector('.vid-prev');
    const vn = wrap && wrap.querySelector('.vid-next');
    if (vp) vp.addEventListener('click', (e) => { e.stopPropagation(); swap(-1); });
    if (vn) vn.addEventListener('click', (e) => { e.stopPropagation(); swap(1); });
  }

  /* ---------- Ecosystem canvas (orbital graphic) ---------- */
  const canvas = document.getElementById('eco-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const DPR = Math.min(2, window.devicePixelRatio || 1);
    const PAPER = '#F0F0F5', ACCENT = '#00F0FF', DIM = 'rgba(216,216,232,0.22)';
    const nodes = [
      { label: 'MEDIA', sub: 'Photo / Video', angle: -Math.PI / 2, speed: 0.0016 },
      { label: 'WEB', sub: 'Design / Dev', angle: Math.PI / 6, speed: 0.0013 },
      { label: 'CONTENT', sub: 'Strategy / Social', angle: (5 * Math.PI) / 6, speed: 0.0019 }
    ];
    let W, H, CX, CY, R, hovered = -1, mouseX = -1, mouseY = -1;

    function resize() {
      const w = canvas.parentElement.clientWidth;
      const h = Math.min(560, Math.max(380, w * 0.62));
      canvas.width = w * DPR; canvas.height = h * DPR;
      canvas.style.height = h + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      W = w; H = h; CX = w / 2; CY = h / 2;
      R = Math.min(w, h) * 0.32;
    }
    resize();
    window.addEventListener('resize', resize);

    canvas.addEventListener('mousemove', (e) => {
      const r = canvas.getBoundingClientRect();
      mouseX = e.clientX - r.left; mouseY = e.clientY - r.top;
    });
    canvas.addEventListener('mouseleave', () => { mouseX = mouseY = -1; });
    canvas.addEventListener('click', () => {
      if (hovered >= 0) {
        const targets = ['#work', '#web', '#services'];
        const el = document.querySelector(targets[hovered]);
        if (el) el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
      }
    });

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // orbit ring
      ctx.beginPath();
      ctx.arc(CX, CY, R, 0, Math.PI * 2);
      ctx.strokeStyle = DIM;
      ctx.lineWidth = 1;
      ctx.stroke();

      // node positions
      const pos = nodes.map((n) => ({
        x: CX + Math.cos(n.angle) * R,
        y: CY + Math.sin(n.angle) * R * 0.78
      }));

      // hover detection
      hovered = -1;
      pos.forEach((p, i) => {
        if (mouseX >= 0 && Math.hypot(mouseX - p.x, mouseY - p.y) < 46) hovered = i;
      });
      canvas.style.cursor = hovered >= 0 ? 'pointer' : 'default';

      // connecting lines
      pos.forEach((p) => {
        ctx.beginPath();
        ctx.moveTo(CX, CY);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = DIM;
        ctx.stroke();
      });

      // core
      const pulse = reduced ? 0 : Math.sin(Date.now() * 0.002) * 3;
      ctx.beginPath();
      ctx.arc(CX, CY, 34 + pulse, 0, Math.PI * 2);
      ctx.fillStyle = ACCENT;
      ctx.fill();
      ctx.fillStyle = '#0A0A0F';
      ctx.font = '700 11px "JetBrains Mono", monospace';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('CYCO', CX, CY);

      // nodes
      pos.forEach((p, i) => {
        const hot = i === hovered;
        ctx.beginPath();
        ctx.arc(p.x, p.y, hot ? 30 : 22, 0, Math.PI * 2);
        ctx.fillStyle = hot ? PAPER : '#0A0A0F';
        ctx.fill();
        ctx.strokeStyle = hot ? ACCENT : DIM;
        ctx.lineWidth = hot ? 2 : 1;
        ctx.stroke();
        ctx.fillStyle = hot ? '#0A0A0F' : PAPER;
        ctx.font = '600 10px "JetBrains Mono", monospace';
        ctx.fillText(nodes[i].label, p.x, p.y);
        if (hot) {
          ctx.fillStyle = 'rgba(224,224,234,0.65)';
          ctx.font = '400 10px "JetBrains Mono", monospace';
          ctx.fillText(nodes[i].sub, p.x, p.y + 46);
        }
        if (!reduced && hovered !== i) nodes[i].angle += nodes[i].speed;
      });

      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ---------- Booking form (package-aware) ---------- */
  const PACKAGES = {
    'Photography': ['Starter — $200', 'Business — $500', 'Custom — $1,500+'],
    'Videography': ['Event Reel — from $500', 'Commercial Video — from $1,500', 'Custom Production — quote'],
    'Web Development': ['Landing Page — $750', 'Business Site — $1,500+', 'Maintenance — $200/mo'],
    'Content Creation': ['Content Retainer — from $600/mo', 'One-off Campaign — quote']
  };
  const svcSelect = document.getElementById('bk-service');
  const pkgSelect = document.getElementById('bk-package');
  const bookingForm = document.getElementById('booking-form');
  const bookingNote = document.getElementById('booking-note');

  function fillPackages(service, selectPkg) {
    if (!pkgSelect) return;
    const list = PACKAGES[service] || [];
    pkgSelect.innerHTML = '<option value="" disabled' + (selectPkg ? '' : ' selected') + '>Choose a package…</option>';
    list.forEach((p) => {
      const o = document.createElement('option');
      o.textContent = p;
      if (selectPkg && p === selectPkg) o.selected = true;
      pkgSelect.appendChild(o);
    });
    pkgSelect.disabled = list.length === 0;
  }

  if (svcSelect && pkgSelect) {
    svcSelect.addEventListener('change', () => fillPackages(svcSelect.value));
  }

  // Pricing-card buttons → prefill form + scroll
  document.querySelectorAll('.btn[data-package]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const service = btn.getAttribute('data-service');
      const pkg = btn.getAttribute('data-package');
      if (svcSelect && pkgSelect) {
        svcSelect.value = service;
        fillPackages(service, pkg);
      }
      // let the #booking anchor scroll happen; flash the form
      const booking = document.getElementById('booking');
      if (booking) {
        e.preventDefault();
        booking.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
        booking.classList.add('booking--flash');
        setTimeout(() => booking.classList.remove('booking--flash'), 1200);
      }
    });
  });

  // Submit → build mailto
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const get = (id) => (document.getElementById(id) || {}).value || '';
      const service = get('bk-service');
      const pkg = get('bk-package');
      const name = get('bk-name');
      const email = get('bk-email');
      const date = get('bk-date');
      const budget = get('bk-budget');
      const message = get('bk-message');
      if (!service || !pkg || !name || !email) {
        if (bookingNote) bookingNote.textContent = 'Please fill in service, package, name, and email.';
        return;
      }
      const subject = 'Booking — ' + service + ' / ' + pkg + ' — ' + name;
      const lines = [
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
      ].filter((l, i, a) => !(l === '' && a[i - 1] === ''));
      const href = 'mailto:joffre@cycopromedia.com?subject=' +
        encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
      window.location.href = href;
      if (bookingNote) bookingNote.textContent = 'Opening your email app with the details pre-filled…';
    });
  }

  /* ---------- Footer year ---------- */
  const yr = document.getElementById('year');
  if (yr) yr.textContent = String(new Date().getFullYear());
})();

// ============================================================
// AMBASSADOR LIMOUSINE — MAIN JAVASCRIPT
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // === HEADER SCROLL BEHAVIOR ===
  const topBar     = document.getElementById('topBar');
  const siteHeader = document.getElementById('siteHeader');
  let lastScrollY  = 0;
  let ticking      = false;

  function handleScroll() {
    const scrollY = window.scrollY;

    if (siteHeader) {
      if (scrollY > 60) {
        siteHeader.classList.add('is-scrolled');
        if (topBar) topBar.classList.add('is-hidden');
      } else {
        siteHeader.classList.remove('is-scrolled');
        if (topBar) topBar.classList.remove('is-hidden');
      }
    }

    // Parallax hero
    const heroBg = document.querySelector('.hero__bg');
    if (heroBg && scrollY < window.innerHeight) {
      heroBg.style.transform = `translateY(${scrollY * 0.28}px)`;
    }

    lastScrollY = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(handleScroll);
      ticking = true;
    }
  }, { passive: true });

  // Init header top
  if (topBar && siteHeader) {
    siteHeader.style.top = topBar.offsetHeight + 'px';
  }


  // === MOBILE NAV ===
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('is-open');
      mobileNav.classList.toggle('is-open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      hamburger.setAttribute('aria-expanded', String(isOpen));
      hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });
  }

  // Mobile accordion
  document.querySelectorAll('[data-mobile-toggle]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const item     = btn.closest('.mobile-nav__item');
      const isOpen   = item.classList.contains('is-open');
      // Collapse all siblings
      item.closest('.mobile-nav__list')
          .querySelectorAll('.mobile-nav__item.is-open')
          .forEach(el => el.classList.remove('is-open'));
      if (!isOpen) item.classList.add('is-open');
    });
  });


  // === SCROLL ANIMATIONS (Intersection Observer) ===
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));


  // === REVIEWS CAROUSEL ===
  const track = document.querySelector('.reviews-track');
  const dots  = document.querySelectorAll('.reviews-dot');

  if (track) {
    let current  = 0;
    let autoPlay = null;

    function getVisible() {
      if (window.innerWidth < 640)  return 1;
      if (window.innerWidth < 1024) return 2;
      return 4;
    }

    function goTo(idx) {
      const cards   = track.querySelectorAll('.review-card');
      const visible = getVisible();
      const max     = Math.max(0, cards.length - visible);
      current       = Math.min(Math.max(0, idx), max);

      const card    = cards[0];
      const gap     = 24; // 1.5rem in px
      const width   = card.offsetWidth + gap;
      track.style.transform = `translateX(-${current * width}px)`;

      dots.forEach((d, i) => d.classList.toggle('is-active', i === current));
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(autoPlay);
        goTo(i);
        startAuto();
      });
    });

    function startAuto() {
      autoPlay = setInterval(() => {
        const cards   = track.querySelectorAll('.review-card');
        const visible = getVisible();
        const max     = cards.length - visible;
        goTo(current >= max ? 0 : current + 1);
      }, 5500);
    }

    const carousel = track.closest('.reviews-carousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', () => clearInterval(autoPlay));
      carousel.addEventListener('mouseleave', startAuto);
    }

    // Touch swipe
    let touchX = 0;
    track.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend',   e => {
      const diff = touchX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        clearInterval(autoPlay);
        goTo(diff > 0 ? current + 1 : current - 1);
        startAuto();
      }
    });

    goTo(0);
    startAuto();

    window.addEventListener('resize', () => goTo(current), { passive: true });
  }


  // === FAQ ACCORDION ===
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const isOpen = item.classList.contains('is-open');
      document.querySelectorAll('.faq-item.is-open').forEach(el => el.classList.remove('is-open'));
      if (!isOpen) item.classList.add('is-open');
    });
  });


  // === ACTIVE NAV LINK ===
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__list > li > a').forEach(link => {
    const href = (link.getAttribute('href') || '').split('/').pop();
    if (href === path) link.closest('li')?.classList.add('is-active');
  });


  // === CONTACT FORM ===
  document.querySelectorAll('form[data-validate]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;

      form.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = '#c0392b';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      if (valid) {
        const btn = form.querySelector('[type="submit"]');
        if (btn) { btn.textContent = 'Message Sent! ✓'; btn.disabled = true; }
        form.querySelector('.form-success')?.classList.add('is-shown');
        form.reset();
      }
    });
  });


  // === FLEET TABS (thumbnails) ===
  document.querySelectorAll('.fleet-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumb.closest('.fleet-gallery-thumbs')?.querySelectorAll('.fleet-thumb')
           .forEach(t => t.classList.remove('is-active'));
      thumb.classList.add('is-active');
    });
  });

  // === DRIVER ORIENTATION TABS ===
  const orientTabs   = document.querySelectorAll('.orient-tab');
  const orientPanels = document.querySelectorAll('.orient-panel');
  orientTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      orientTabs.forEach(t => t.classList.remove('is-active'));
      orientPanels.forEach(p => p.classList.remove('is-active'));
      tab.classList.add('is-active');
      document.getElementById('tab-' + target)?.classList.add('is-active');
    });
  });

  // === QUIZ INTERACTIONS ===
  document.querySelectorAll('.quiz-card').forEach(card => {
    card.querySelectorAll('.quiz-option').forEach(opt => {
      opt.addEventListener('click', () => {
        if (card.classList.contains('is-answered')) return;
        card.classList.add('is-answered');
        card.querySelectorAll('.quiz-option').forEach(o => o.classList.add('is-revealed'));
        if (opt.classList.contains('quiz-option--correct')) {
          opt.classList.add('is-selected-correct');
        } else {
          opt.classList.add('is-selected-wrong');
        }
      });
    });
  });

});

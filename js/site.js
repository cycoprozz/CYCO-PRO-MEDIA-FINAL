/* CYCLOPRO MEDIA — site interactions */

(function () {
  'use strict';

  /* ----- Mobile nav toggle ----- */
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  if (header && toggle) {
    toggle.addEventListener('click', () => {
      const open = header.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close nav when a link is tapped
    header.querySelectorAll('.nav-list a').forEach((a) => {
      a.addEventListener('click', () => {
        header.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ----- Add shadow / border on scroll ----- */
  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ----- Active page indicator (matches link pathname to current) ----- */
  const here = window.location.pathname.replace(/\/$/, '');
  document.querySelectorAll('.nav-list a').forEach((a) => {
    const href = a.getAttribute('href').replace(/\/$/, '');
    if (href === here || (href === '' && here === '')) {
      a.setAttribute('aria-current', 'page');
    }
  });

  /* ----- Portfolio filter ----- */
  const filterBar = document.querySelector('[data-portfolio-filters]');
  const grid = document.querySelector('[data-portfolio-grid]');
  if (filterBar && grid) {
    filterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-filter]');
      if (!btn) return;

      filterBar.querySelectorAll('button[data-filter]').forEach((b) => {
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });

      const filter = btn.dataset.filter;
      grid.querySelectorAll('figure').forEach((fig) => {
        const cats = (fig.dataset.cats || '').split(/\s+/);
        const show = filter === 'all' || cats.includes(filter);
        fig.style.display = show ? '' : 'none';
      });
    });
  }

  /* ----- Lazy-reveal animation (using IntersectionObserver) ----- */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
  }

  /* ----- Contact form (front-end only) ----- */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = document.querySelector('[data-form-status]');
      if (status) {
        status.textContent =
          'Thank you. Your message has been prepared. Cyclopro Media will follow up at the email you provided.';
        status.hidden = false;
      }
      form.reset();
    });
  }

  /* ----- Footer year ----- */
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();

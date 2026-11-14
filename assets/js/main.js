/* ==========================================================================
   RESUME LINK
   Paste the resume URL between the quotes below, e.g.
     const RESUME_URL = 'https://drive.google.com/file/d/XXXX/view';
   or, if you add the PDF to this repo:
     const RESUME_URL = 'assets/Radha-Bahl-Resume.pdf';
   While it is empty, every "Resume" button shows a "coming soon" message.
   ========================================================================== */
const RESUME_URL = 'assets/Resume%20-%20Radha%20Bahl.pdf';

/* ART PORTFOLIO LINK: paste it between the quotes the same way. */
const ART_PORTFOLIO_URL = 'https://drive.google.com/file/d/1njoylkXGmesdodmuA5iHL0-pFbS2gBB8/view';

(function () {
  'use strict';

  /* ---------- Resume buttons ---------- */
  const toast = document.querySelector('[data-toast]');
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2800);
  }

  function wireLink(selector, url, comingSoon) {
    document.querySelectorAll(selector).forEach((link) => {
      if (url) {
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      } else {
        link.addEventListener('click', (event) => {
          event.preventDefault();
          showToast(comingSoon);
        });
      }
    });
  }

  wireLink('[data-resume]', RESUME_URL, 'Resume coming soon — check back shortly.');
  wireLink('[data-art-portfolio]', ART_PORTFOLIO_URL, 'Art portfolio coming soon — check back shortly.');

  /* ---------- Art portfolio viewer ---------- */
  // Opens the Drive PDF inside an on-page viewer. The link still works on its
  // own (new tab) if the viewer can't be used, or with Cmd/Ctrl-click.
  const viewer = document.querySelector('[data-viewer]');
  const driveId = (ART_PORTFOLIO_URL.match(/\/d\/([\w-]+)/) || [])[1];

  if (viewer && driveId && typeof viewer.showModal === 'function') {
    const body = viewer.querySelector('.viewer__body');
    viewer.querySelector('[data-viewer-open]').href = ART_PORTFOLIO_URL;

    const openViewer = () => {
      if (!body.querySelector('iframe')) {
        const frame = document.createElement('iframe');
        frame.src = `https://drive.google.com/file/d/${driveId}/preview`;
        frame.title = 'Art Portfolio';
        frame.allow = 'autoplay; fullscreen';
        frame.addEventListener('load', () => body.classList.add('is-loaded'));
        body.appendChild(frame);
      }
      viewer.showModal();
      document.documentElement.classList.add('has-viewer');
    };

    viewer.addEventListener('close', () => document.documentElement.classList.remove('has-viewer'));
    viewer.querySelector('[data-viewer-close]').addEventListener('click', () => viewer.close());
    viewer.addEventListener('click', (event) => {
      if (event.target === viewer) viewer.close(); // backdrop click
    });

    document.querySelectorAll('[data-art-portfolio]').forEach((link) => {
      link.addEventListener('click', (event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey) return;
        event.preventDefault();
        openViewer();
      });
    });
  }

  /* ---------- Documentary player ---------- */
  // The YouTube player loads only when someone presses play. YouTube refuses
  // embeds from a page opened straight from disk (Error 153), so in that case
  // the film opens on YouTube instead.
  document.querySelectorAll('[data-video]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.dataset.video;
      if (location.protocol === 'file:') {
        window.open(`https://www.youtube.com/watch?v=${id}`, '_blank', 'noopener');
        return;
      }
      const player = document.createElement('iframe');
      player.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&playsinline=1`;
      player.title = button.getAttribute('aria-label');
      player.allow =
        'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      player.referrerPolicy = 'strict-origin-when-cross-origin';
      player.allowFullscreen = true;
      button.replaceWith(player);
    });
  });

  /* ---------- Mobile navigation ---------- */
  const toggle = document.querySelector('[data-nav-toggle]');
  const menu = document.querySelector('[data-nav-menu]');

  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
  }

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });

    menu.addEventListener('click', (event) => {
      if (event.target.closest('a')) setMenu(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setMenu(false);
    });
  }

  /* ---------- Header shadow on scroll ---------- */
  const header = document.querySelector('[data-header]');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Reveal on scroll + active nav link ---------- */
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

    const navLinks = new Map(
      [...document.querySelectorAll('.nav__menu a[href^="#"]:not(.btn)')].map((a) => [
        a.getAttribute('href').slice(1),
        a,
      ])
    );
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = navLinks.get(entry.target.id);
          if (link) link.classList.toggle('is-active', entry.isIntersecting);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    navLinks.forEach((_, id) => {
      const section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Footer year ---------- */
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();

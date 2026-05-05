/**
 * PARTIALS.JS — Injects shared nav, footer, cursor, page transition
 * Include this BEFORE main.js on every page.
 */

// ── GEOMETRIC LOGO MARK SVG ──────────────────────────────────────────────────
// Angular N-style geometric mark in brand teal (#00d97e)
const logoMarkSVG = `
<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <!-- Left vertical stroke -->
  <polygon points="4,28 4,4 9,4 9,21" fill="#00d97e"/>
  <!-- Diagonal bridge -->
  <polygon points="9,21 9,4 23,28 18,28" fill="#00c870"/>
  <!-- Right vertical stroke -->
  <polygon points="23,4 28,4 28,28 23,28 23,11" fill="#00d97e"/>
</svg>
`;

// Smaller version for footer
const logoMarkSmallSVG = `
<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <polygon points="3.5,24.5 3.5,3.5 8,3.5 8,18.5" fill="#00d97e"/>
  <polygon points="8,18.5 8,3.5 20,24.5 15.5,24.5" fill="#00c870"/>
  <polygon points="20,3.5 24.5,3.5 24.5,24.5 20,24.5 20,9.5" fill="#00d97e"/>
</svg>
`;

// ── NAV ──────────────────────────────────────────────────────────────────────
const navHTML = `
<nav class="nav" id="mainNav" aria-label="Main navigation">
  <div class="nav__inner">

    <a href="index.html" class="nav__logo" aria-label="Shiva Ram — Home">
      <span class="nav__logo-mark">${logoMarkSVG}</span>
      <span class="nav__logo-name">Shiva Ram</span>
    </a>

    <ul class="nav__links" role="list">
      <li><a href="index.html"   class="nav__link" data-page="work">Work</a></li>
      <li><a href="about.html"   class="nav__link" data-page="about">About</a></li>
      <li><a href="contact.html" class="nav__link" data-page="contact">Contact</a></li>
    </ul>

    <a href="contact.html" class="btn-nav">Get in touch</a>

    <button
      class="nav__menu-btn"
      aria-label="Toggle menu"
      aria-expanded="false"
      aria-controls="mobileDrawer"
    >
      <span></span><span></span><span></span>
    </button>
  </div>

  <!-- Mobile drawer -->
  <div class="nav__drawer" id="mobileDrawer" aria-hidden="true" role="dialog" aria-label="Mobile navigation">
    <a href="index.html"   class="nav__link">Work</a>
    <a href="about.html"   class="nav__link">About</a>
    <a href="contact.html" class="nav__link">Contact</a>
    <a href="contact.html" class="btn-nav">Get in touch</a>
  </div>
</nav>
`;

// ── FOOTER ────────────────────────────────────────────────────────────────────
const footerHTML = `
<footer class="footer">
  <div class="container">
    <div class="footer__inner">

      <!-- Brand -->
      <div class="footer__brand">
        <a href="index.html" class="footer__logo">
          <span class="footer__logo-mark">${logoMarkSmallSVG}</span>
          <span class="footer__logo-name">Shiva Ram</span>
        </a>
        <p class="footer__tagline">
          Product designer from Hyderabad — building end-to-end digital experiences that make people's lives measurably better.
        </p>
        <div class="footer__social" style="margin-top: 20px;">
          <a href="https://linkedin.com/in/shivaramprasaduiuxdesigner" target="_blank" rel="noopener" class="footer__social-link" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
          <a href="https://shivaramuiuxdesigner-ai.github.io/Portfolio" target="_blank" rel="noopener" class="footer__social-link" aria-label="Portfolio">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
            </svg>
          </a>
          <a href="mailto:shivaram.uiux.designer@gmail.com" class="footer__social-link" aria-label="Email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Navigation -->
      <div>
        <p class="footer__nav-title">Navigation</p>
        <ul class="footer__nav-links">
          <li><a href="index.html"   class="footer__nav-link">Work</a></li>
          <li><a href="about.html"   class="footer__nav-link">About</a></li>
          <li><a href="contact.html" class="footer__nav-link">Contact</a></li>
        </ul>
      </div>

      <!-- Projects -->
      <div>
        <p class="footer__nav-title">Projects</p>
        <ul class="footer__nav-links">
          <li><a href="project-flowfund.html"    class="footer__nav-link">FlowFund</a></li>
          <li><a href="project-brainstrata.html"     class="footer__nav-link">Brainstrata</a></li>
          <li><a href="project-habittracker.html" class="footer__nav-link">Habit Tracker</a></li>
          <li><a href="project-humains.html"      class="footer__nav-link">HumAIns</a></li>
        </ul>
      </div>

    </div>

    <div class="footer__bottom">
      <p class="footer__copy">© 2026 Neelakantam Shiva Ram Prasad. All rights reserved.</p>
      <div class="footer__status">
        <span class="footer__status-dot"></span>
        Available for freelance work
      </div>
    </div>
  </div>
</footer>
`;

// ── CURSOR & OVERLAY ──────────────────────────────────────────────────────────
const globalHTML = `
<div class="cursor" aria-hidden="true"></div>
<div class="cursor-follower" aria-hidden="true"></div>
<div class="cursor-project-label" aria-hidden="true">View Project ↗</div>
<div class="page-transition" aria-hidden="true"></div>
`;

// ── INJECT ────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Inject nav
  const navPlaceholder = document.getElementById('nav-placeholder');
  if (navPlaceholder) navPlaceholder.outerHTML = navHTML;

  // Inject footer
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) footerPlaceholder.outerHTML = footerHTML;

  // Inject cursor + overlay (after nav/footer so z-index is correct)
  document.body.insertAdjacentHTML('beforeend', globalHTML);

  // ── Mobile nav: init HERE (guaranteed DOM exists) ──
  // main.js will NOT re-init this — single source of truth
  const menuBtn = document.querySelector('.nav__menu-btn');
  const drawer  = document.querySelector('.nav__drawer');

  if (menuBtn && drawer) {
    const openDrawer = () => {
      menuBtn.classList.add('open');
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      menuBtn.setAttribute('aria-expanded', 'true');  // fixed: was never updated
      document.body.style.overflow = 'hidden';
    };
    const closeDrawer = () => {
      menuBtn.classList.remove('open');
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    menuBtn.addEventListener('click', () => {
      const isOpen = menuBtn.classList.contains('open');
      isOpen ? closeDrawer() : openDrawer();
    });

    // Close on any drawer link click
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuBtn.classList.contains('open')) closeDrawer();
    });
  }
});

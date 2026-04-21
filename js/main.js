/**
 * MAIN.JS — Shiva Ram Portfolio
 * Global scripts: cursor, nav, transitions, reveal
 */

/* ────────────────────────────────────────────
   CUSTOM CURSOR
   ──────────────────────────────────────────── */
const cursor         = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower) {
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;
  let raf;

  const lerp = (a, b, t) => a + (b - a) * t;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  function animateCursor() {
    followerX = lerp(followerX, mouseX, 0.1);
    followerY = lerp(followerY, mouseY, 0.1);
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top  = followerY + 'px';
    raf = requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover states
  const addCursorState = (selector, cursorClass, followerClass) => {
    document.querySelectorAll(selector).forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add(cursorClass);
        cursorFollower.classList.add(followerClass || cursorClass);
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove(cursorClass);
        cursorFollower.classList.remove(followerClass || cursorClass);
      });
    });
  };

  addCursorState('a, button, .btn, .btn-nav, [role="button"]', 'cursor--link', 'cursor--hover');
  addCursorState('.project-card, .next-project-card', 'cursor--link', 'cursor--project');

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorFollower.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorFollower.style.opacity = '1';
  });
}


/* ────────────────────────────────────────────
   CURSOR-FOLLOW "VIEW PROJECT" LABEL
   ──────────────────────────────────────────── */
const viewLabel = document.querySelector('.cursor-project-label');
if (viewLabel) {
  const cards = document.querySelectorAll('.project-card, .next-project-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => viewLabel.classList.add('visible'));
    card.addEventListener('mouseleave', () => viewLabel.classList.remove('visible'));
    card.addEventListener('mousemove', (e) => {
      viewLabel.style.left = e.clientX + 'px';
      viewLabel.style.top  = (e.clientY - 20) + 'px';
    });
  });
}


/* ────────────────────────────────────────────
   NAVIGATION
   ──────────────────────────────────────────── */
(function initNav() {
  const nav     = document.querySelector('.nav');
  const menuBtn = document.querySelector('.nav__menu-btn');
  const drawer  = document.querySelector('.nav__drawer');

  if (!nav) return;

  // Scroll state
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile drawer
  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', () => {
      const open = menuBtn.classList.toggle('open');
      drawer.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close on link click
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuBtn.classList.remove('open');
        drawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Active link highlight
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes(currentPath)) {
      link.classList.add('active');
    }
  });
})();


/* ────────────────────────────────────────────
   PAGE TRANSITIONS
   ──────────────────────────────────────────── */
(function initTransitions() {
  const overlay = document.querySelector('.page-transition');
  if (!overlay) return;

  // Enter (page loads)
  overlay.classList.add('entering');
  setTimeout(() => overlay.classList.remove('entering'), 700);

  // Exit (navigate away)
  document.querySelectorAll('a[href]:not([href^="#"]):not([href^="mailto"]):not([href^="tel"]):not([target])').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('http')) return;
      e.preventDefault();
      overlay.classList.add('leaving');
      setTimeout(() => { window.location.href = href; }, 550);
    });
  });
})();


/* ────────────────────────────────────────────
   SCROLL REVEAL (Intersection Observer)
   ──────────────────────────────────────────── */
(function initReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(el => observer.observe(el));
})();


/* ────────────────────────────────────────────
   SMOOTH PARALLAX (hero images)
   ──────────────────────────────────────────── */
(function initParallax() {
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (!parallaxEls.length) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      parallaxEls.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.3;
        el.style.transform = `translateY(${scrollY * speed}px)`;
      });
      ticking = false;
    });
    ticking = true;
  }, { passive: true });
})();


/* ────────────────────────────────────────────
   COUNT-UP ANIMATION (stats)
   ──────────────────────────────────────────── */
function countUp(el, target, duration = 1200, prefix = '', suffix = '') {
  const start = performance.now();
  const from  = 0;

  function update(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease     = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current  = Math.round(from + (target - from) * ease);
    el.textContent = prefix + current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

(function initCountUp() {
  const statEls = document.querySelectorAll('[data-count]');
  if (!statEls.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseFloat(el.dataset.count);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        countUp(el, target, 1400, prefix, suffix);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statEls.forEach(el => observer.observe(el));
})();


/* ────────────────────────────────────────────
   3D CARD TILT
   ──────────────────────────────────────────── */
(function initTilt() {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    const maxTilt = parseFloat(card.dataset.tiltMax) || 8;

    card.addEventListener('mousemove', (e) => {
      const rect    = card.getBoundingClientRect();
      const cx      = rect.left + rect.width  / 2;
      const cy      = rect.top  + rect.height / 2;
      const dx      = (e.clientX - cx) / (rect.width  / 2);
      const dy      = (e.clientY - cy) / (rect.height / 2);
      const rotX    = -dy * maxTilt;
      const rotY    =  dx * maxTilt;
      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.01)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s linear';
    });
  });
})();

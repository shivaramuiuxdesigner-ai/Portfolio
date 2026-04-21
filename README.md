# Shiva Ram — Portfolio Website

Production-ready portfolio site. Dark editorial aesthetic.
Syne (headings) + DM Sans (body) · #0a0a0a background · #00d97e accent.

---

## File Structure

```
portfolio/
├── index.html                   ← Home page (Work / Gallery)
├── about.html                   ← About page
├── contact.html                 ← Contact page with form
├── project-flowfund.html        ← FlowFund case study
├── project-onawave.html         ← OnaWave Clinician Dashboard case study
├── project-habittracker.html    ← Habit Tracker case study
├── project-voltds.html          ← Volt DS case study
│
├── css/
│   ├── tokens.css               ← Design tokens (colors, spacing, type)
│   ├── base.css                 ← Reset, cursor, reveal animations, noise
│   ├── nav.css                  ← Navigation + mobile drawer
│   ├── components.css           ← Buttons, tags, footer
│   ├── home.css                 ← Hero, project gallery, project cards
│   ├── about.css                ← About page sections
│   ├── project.css              ← Project detail layout
│   └── contact.css              ← Contact form + sidebar
│
├── js/
│   ├── partials.js              ← Injects shared nav + footer into every page
│   ├── main.js                  ← Cursor, scroll reveal, parallax, tilt, count-up
│   └── contact.js               ← Contact form validation + submission
│
├── assets/
│   ├── images/                  ← Replace SVG placeholders with your real images
│   │   ├── hero-mockup-left.svg     ← Home hero: left background mockup
│   │   ├── hero-mockup-right.svg    ← Home hero: right background mockup
│   │   ├── about-portrait.svg       ← About page hero portrait (you)
│   │   ├── about-closing-portrait.svg ← About closing section portrait
│   │   ├── hero-flowfund.svg        ← FlowFund project hero (1440×900)
│   │   ├── hero-onawave.svg         ← OnaWave project hero (1440×900)
│   │   ├── hero-habittracker.svg    ← Habit Tracker project hero (1440×900)
│   │   ├── hero-voltds.svg          ← Volt DS project hero (1440×900)
│   │   ├── thumb-flowfund.svg       ← FlowFund home gallery card (800×600)
│   │   ├── thumb-onawave.svg        ← OnaWave home gallery card (800×600)
│   │   ├── thumb-habittracker.svg   ← Habit Tracker home gallery card (800×600)
│   │   └── thumb-voltds.svg         ← Volt DS home gallery card (800×600)
│   │
│   └── resume.pdf               ← Drop your resume PDF here
│
├── pages/                       ← (copies of root pages, ignore)
└── generate-placeholders.js     ← Run with Node to regenerate placeholder SVGs
```

---

## How to Run

No build step needed. Just open `index.html` in a browser.

For best results, serve with a local server:
```bash
# Option A – Python
python3 -m http.server 3000

# Option B – Node (npx)
npx serve .

# Option C – VS Code Live Server extension
```

Then open http://localhost:3000

---

## Replacing Images

All image placeholders are in `assets/images/`. Replace each `.svg` with a real image at the same filename (`.png` or `.jpg`).

**Step:** For each placeholder, export your image from Figma at the recommended size, save it as e.g. `thumb-flowfund.png`, then update the `src` in the HTML:

```html
<!-- Before -->
<img src="assets/images/thumb-flowfund.svg" ...>

<!-- After -->
<img src="assets/images/thumb-flowfund.png" ...>
```

### Recommended export sizes

| File | Size | Notes |
|------|------|-------|
| `hero-mockup-left/right` | 800×1200px | Portrait orientation, dark bg |
| `about-portrait` | 1440×900px | Your photo, face visible upper 60% |
| `about-closing-portrait` | 1440×900px | Dramatic angle, editorial |
| `hero-*.png` | 1440×900px | Project heroes, landscape |
| `thumb-*.png` | 800×600px | Gallery card thumbnails |
| Project screen images | 390×844px (9:16) | iPhone screenshots |

---

## Adding More Project Screens

In each project HTML, find the `screens-grid` section and replace the `.img-placeholder` divs with real `<img>` tags:

```html
<!-- Replace this -->
<div class="screen-item reveal">
  <div class="img-placeholder" ...>...</div>
</div>

<!-- With this -->
<div class="screen-item reveal">
  <img src="assets/images/flowfund-screen-1.png" alt="FlowFund home screen" loading="lazy">
</div>
```

---

## Adding a New Project

1. Duplicate `project-flowfund.html` → rename to `project-myproject.html`
2. Update all text content, meta bar, phases, stats
3. Replace image placeholders
4. Add a card to `index.html` in the `.gallery` section
5. Update "Next Project" links in the adjacent projects so the chain stays connected:
   - FlowFund → OnaWave → Habit Tracker → Volt DS → FlowFund

---

## Customisation

### Colors
Edit `css/tokens.css`:
```css
--color-accent: #00d97e;       /* Change to your accent */
--color-bg:     #0a0a0a;       /* Page background */
```

### Fonts
The Google Fonts import is in the `<head>` of each HTML file. Syne + DM Sans are loaded there.
Font variables are in `tokens.css`:
```css
--font-display: 'Syne', sans-serif;
--font-body:    'DM Sans', sans-serif;
```

### Contact Form
Currently shows a success message after 1.6s (simulated). To connect a real form backend:
1. Use [Formspree](https://formspree.io), [Netlify Forms](https://www.netlify.com/products/forms/), or [EmailJS](https://www.emailjs.com/)
2. Replace the `setTimeout` block in `js/contact.js` with a real `fetch()` POST

---

## Resume PDF

Place your resume at `assets/resume.pdf`. It's referenced in:
- Home hero "Download Resume" button
- Contact sidebar "Download Resume" button

---

## Deployment

Works on any static host:
- **Vercel** – drag & drop the folder, or `vercel deploy`
- **Netlify** – drag & drop at app.netlify.com
- **GitHub Pages** – push to a repo, enable Pages in settings
- **Any web server** – upload the folder via FTP/SFTP

---

Built by Shiva Ram · shivaram.uiux.designer@gmail.com

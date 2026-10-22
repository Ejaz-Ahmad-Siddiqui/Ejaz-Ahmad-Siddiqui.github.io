# Ejaz Ahmad · Portfolio
 
Personal portfolio of Ejaz Ahmad, Senior Software Engineer working on design systems and developer tooling with React, Next.js, TypeScript and Node.js.
 
**Live site:** [ejaz-ahmad-siddiqui.github.io](https://ejaz-ahmad-siddiqui.github.io/)
 
## About
 
I build the parts of a frontend that other developers build on: component libraries, project tooling, and the patterns that keep several apps consistent. I've been writing software professionally since 2019, across banking platforms, CRMs, ERP systems and education products.
 
The full list of projects, experience and stack is on the [live site](https://ejaz-ahmad-siddiqui.github.io/).
 
## What's in this repo
 
- **Single-page site** with no build step: plain HTML, CSS and JavaScript files
- **Light and dark themes** that follow the visitor's system preference, with a toggle that remembers their choice
- **Project detail views** with filters by organization
- **Contact form** powered by [Formspree](https://formspree.io/)
- **Downloadable resume** in `assets/Ejaz-Ahmad-Resume.pdf`
- Responsive layout, keyboard navigation and reduced-motion support
## Structure
 
```
.
├── index.html              # Page markup (plus a tiny inline theme script to avoid a flash)
├── css/                    # Styles, loaded in this order
│   ├── tokens.css          # Color tokens for dark and light themes
│   ├── base.css            # Reset, typography, layout helpers
│   ├── header.css          # Sticky header, nav, mobile menu
│   ├── buttons.css
│   ├── hero.css
│   ├── about.css
│   ├── experience.css      # Timeline
│   ├── work.css            # Project cards, filters, decorative visuals
│   ├── panel.css           # Project detail dialog
│   ├── stack.css
│   ├── writing.css
│   ├── contact.css         # Channels and contact form
│   ├── footer.css
│   └── utilities.css       # Reveal animation, reduced motion, print
├── js/
│   ├── theme.js            # Theme toggle
│   ├── nav.js              # Mobile menu and active-section highlight
│   ├── reveal.js           # Reveal-on-scroll
│   ├── projects.js         # Work filters and project detail panel
│   ├── contact.js          # Copy email and Formspree form
│   └── footer.js           # Current year
└── assets/
    ├── favicon.svg
    ├── ejaz-ahmad-dark.jpg # Portrait (dark theme)
    ├── ejaz-ahmad-light.jpg# Portrait (light theme)
    ├── og-image.png        # Social preview image
    └── Ejaz-Ahmad-Resume.pdf
```

CSS order matters: later files can override earlier ones, so keep the `<link>` order in `index.html` when adding files.
 
## Run locally
 
No install needed. Open `index.html` in a browser, or serve the folder to test the contact form:
 
```bash
npx serve .
```
 
## Deployment
 
Deployed with GitHub Pages from the `main` branch. Any push to `main` updates the live site.
 
## Contact
 
- **Email:** [iamejaazahmad@gmail.com](mailto:iamejaazahmad@gmail.com)
- **LinkedIn:** [linkedin.com/in/ejaz-ahmad-siddiqui](https://www.linkedin.com/in/ejaz-ahmad-siddiqui/)
- **GitHub:** [github.com/Ejaz-Ahmad-Siddiqui](https://github.com/Ejaz-Ahmad-Siddiqui)
 






# Wellview Family Clinic

A responsive one-page marketing site for a healthcare clinic, built with plain HTML, CSS, and vanilla JavaScript — no framework, no build step, no dependencies.

**Live site:** https://joeyw1.github.io/Claude-course-/

## Features

- Sticky navbar with smooth-scroll links and a mobile hamburger menu
- Hero section with a gradient banner, call-to-action buttons, and trust indicators
- Services and patient testimonials sections with a responsive card grid
- Appointment enquiry form with client-side validation and inline error messages (no `alert()`s)
- Scroll-triggered fade-in animations via `IntersectionObserver`
- Fully responsive, mobile-first layout
- Zero external asset dependencies — icons and avatars are inline SVG/CSS, only the Inter Google Font is loaded remotely

## Project structure

```
index.html   All markup: navbar, hero, services, testimonials, enquiry form, footer
style.css    All styling, organized in commented sections (variables, navbar, hero, ...)
script.js    All behavior: mobile nav toggle, fade-in observer, form handling, footer year
```

## Running locally

No build or install step required.

- Open `index.html` directly in a browser, **or**
- Serve the folder to test relative paths: `python -m http.server`

There is no test suite or linter configured.

## Deployment

The site is deployed automatically to GitHub Pages via GitHub Actions (`.github/workflows/deploy-pages.yml`) on every push to `main`.

## Enquiry form

The form validates Full Name, Email, and Phone as required fields; Preferred Date and Message are optional. On successful submission it currently logs the collected data to the browser console — the spot to wire up a real backend endpoint is marked with a `// TODO` comment in `script.js`.

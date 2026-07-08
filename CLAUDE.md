# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A static one-page healthcare/clinic marketing site ("Wellview Family Clinic") built with plain HTML, CSS, and vanilla JS — no framework, no build step, no package manager. Three files:

- `index.html` — all markup, in section order: sticky navbar → Hero (`#home`) → Services (`#services`) → Testimonials (`#testimonials`) → Enquiry Form (`#enquiry`) → Footer.
- `style.css` — all styling, organized in commented blocks (Reset, Variables, Base, Navbar, Hero, Services, Testimonials, Enquiry Form, Footer, Fade-in, Responsive).
- `script.js` — all behavior, wrapped in a single `DOMContentLoaded` listener, organized in commented blocks (mobile nav toggle, scroll fade-in, enquiry form handling, footer year).

## Running / testing

No build or install step. Open `index.html` directly in a browser, or serve the folder to test relative paths (`python -m http.server`). There is no test suite or linter configured.

## Architecture notes

- **Theming**: colors, radii, shadows, and font stack are all defined once as CSS custom properties in `style.css`'s `:root` block. Change the palette there rather than hardcoding colors elsewhere.
- **Fade-in-on-scroll**: any element given the `.fade-in` class starts hidden (`opacity: 0`, translated) and is revealed by a single `IntersectionObserver` in `script.js` that adds `.is-visible` and unobserves once triggered. Add the class to new sections/cards to get the effect for free — no JS changes needed.
- **Mobile nav**: `#navToggle` is a hamburger button that toggles `.is-open` on `#navMenu` and flips `aria-expanded`; the CSS shows/hides and slides the panel purely via that class (see the `@media (max-width: 860px)` block). Clicking any nav link closes the menu.
- **Enquiry form validation**: `script.js` validates Full Name, Email, and Phone as required (regex checks for email/phone format); Preferred Date and Message are optional. Errors are written into per-field `<span class="field-error">` elements (paired via `aria-describedby`) rather than using `alert()` or native browser validation — keep that pattern for any new fields. On success it currently only `console.log`s the collected `formData` object; the exact spot to wire up a real backend call is marked with a `// TODO` comment above that log line in `script.js`.
- **No images**: all icons/avatars are inline SVG or CSS (colored-circle initials for testimonial avatars), so the site has zero external asset dependencies beyond the Google Fonts (Inter) `<link>` in `index.html`'s `<head>`.

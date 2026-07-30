# Mobile Footer, Contacts, and Internal Spacing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the mobile page index, add accessible mobile footer accordions and understated contact details, and normalize vertical spacing on every internal page.

**Architecture:** Keep the site dependency-free and progressively enhanced. Native `details` elements provide mobile footer disclosure without JavaScript; shared CSS classes and spacing tokens control responsive behavior across all static pages.

**Tech Stack:** Static HTML5, shared CSS custom properties, vanilla JavaScript, Node.js built-in test runner.

## Global Constraints

- Do not alter the home page section rhythm.
- Keep the desktop footer visually equivalent to the current column layout.
- Use visible non-clickable placeholders for unavailable contact data.
- Preserve every current public link destination.
- Use `700px` as the mobile breakpoint.

---

### Task 1: Remove the mobile page index

**Files:**
- Modify: `assets/css/styles.css`
- Test: `tests/site-review.test.cjs`

**Interfaces:**
- Consumes: `.page-index` already present in `percorso-modalita.html`.
- Produces: a desktop-only local index hidden below `700px`.

- [ ] Add a test requiring `.page-index { display: none; }` inside the `max-width: 700px` media query.
- [ ] Run `node --test tests/site-review.test.cjs` and confirm the new assertion fails.
- [ ] Add the minimal responsive CSS rule.
- [ ] Run the test suite and confirm it passes.

### Task 2: Convert footer navigation to native disclosures

**Files:**
- Modify: every public `.html` file containing `.footer__grid`
- Modify: `assets/css/styles.css`
- Test: `tests/site-review.test.cjs`

**Interfaces:**
- Consumes: the existing “Esplora” and “Ambiti” link lists.
- Produces: `.footer__menu`, `.footer__menu-title`, and `.footer__menu-content` structures based on `details` and `summary`.

- [ ] Add tests requiring two footer disclosure groups on every public page and unchanged link destinations.
- [ ] Run the test suite and confirm the assertions fail against the current footer markup.
- [ ] Replace the two navigation columns with native disclosure elements on all pages.
- [ ] Add desktop styles that render them as ordinary columns and mobile styles that render bordered expandable rows with 44 px summaries and a rotating indicator.
- [ ] Run the test suite and confirm it passes.

### Task 3: Add understated placeholder contacts below the home form

**Files:**
- Modify: `index.html`
- Modify: `assets/css/styles.css`
- Test: `tests/site-review.test.cjs`

**Interfaces:**
- Consumes: the existing `#contactForm`.
- Produces: `.contact-details` immediately after the form with four non-clickable items.

- [ ] Add a test requiring the contact strip after `</form>` with email, telephone, Caltanissetta address, and online availability placeholders.
- [ ] Run the suite and confirm the new test fails.
- [ ] Add semantic contact markup with an accessible heading and no fake `mailto:` or `tel:` destinations.
- [ ] Style it as a light bordered strip using existing typography and color tokens.
- [ ] Run the suite and confirm it passes.

### Task 4: Normalize internal-page vertical rhythm

**Files:**
- Modify: internal public `.html` files
- Modify: `assets/css/styles.css`
- Test: `tests/site-review.test.cjs`

**Interfaces:**
- Consumes: internal page `<main>` elements and the existing section classes.
- Produces: `.internal-page`, `.section-rhythm`, and `.section-rhythm--compact` hooks driven by shared spacing tokens.

- [ ] Add tests requiring `internal-page` on every non-home public `<main>` and shared responsive rhythm declarations.
- [ ] Run the suite and confirm the assertions fail.
- [ ] Add the shared page and section hooks without changing home markup.
- [ ] Normalize only conflicting internal section paddings, preserving final CTA separation.
- [ ] Run all tests and confirm they pass.

### Task 5: Responsive and accessibility verification

**Files:**
- Verify: all modified HTML, CSS, and JavaScript files

**Interfaces:**
- Consumes: completed tasks 1–4.
- Produces: verified desktop/mobile rendering and regression evidence.

- [ ] Run `node --test tests/site-review.test.cjs`.
- [ ] Run `node --check assets/js/main.js`.
- [ ] Render the home, an internal content page, and `percorso-modalita.html` at desktop and mobile sizes in light and dark themes.
- [ ] Confirm disclosure focus states, no footer overlap with the persistent mobile bar, no horizontal overflow, and consistent section rhythm.

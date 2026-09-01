---
name: interface-craft
description: "Rauno Freiberg's interface craftsmanship guidelines for world-class web UI/UX. Covers input focus, form UX, 16px iOS input zoom prevention, @media (hover: hover) touch isolation, box-shadow focus rings, fluid typography clamp(), tabular-nums, 200ms motion limit, pointer-events none on overlays, selection state styling, and accessibility details."
---

# Interface Craftsmanship Guidelines (Rauno Freiberg's Manifesto)

This skill provides a definitive checklist and engineering standards for micro-interactions, typography, touch resilience, motion performance, and accessibility across modern web interfaces.

---

## 1. Interactivity & Form UX
- **Input Labels:** Clicking `<label for="id">` must always focus the target input.
- **Form Wrapping:** All form inputs must reside inside a `<form>` so pressing `Enter` submits naturally.
- **Semantic Input Types:** Use exact `type` (`email`, `tel`, `text`, `password`, `search`).
- **Spellcheck & Autocomplete:** Set `spellcheck="false"` on names, codes, emails. Preserve correct `autocomplete` values.
- **HTML Form Validation:** Utilize native `required` attribute.
- **Prefix & Suffix Icons:** Position absolutely inside the input container with `pointer-events: none` so clicking the icon focuses the input.
- **Prevent Double Submissions:** Buttons must disable or enter a loading state upon submit to prevent duplicate network/WhatsApp dispatches.
- **User Select:** Apply `user-select: none` (`select-none`) on interactive buttons, tabs, chips, and icons.
- **Pointer Events:** Decorative elements (gradients, glow effects, spotlights) must have `pointer-events: none` to never intercept clicks.
- **Click Targets:** Interactive list elements must not have dead zones between them; increase hit area using `padding` rather than margins.

---

## 2. Typography & Numbers
- **Font Smoothing:** Apply `-webkit-font-smoothing: antialiased` and `text-rendering: optimizeLegibility`.
- **Prevent Layout Shifts on Hover:** Font weight must never shift on hover/focus (shifts cause layout reflow).
- **Weight Floor:** Avoid font weights below 400. Headings look best between 500 and 700.
- **Fluid Type:** Use CSS `clamp()` for headings (e.g. `font-size: clamp(2rem, 4vw + 1rem, 3.5rem)`).
- **Tabular Numbers:** Apply `font-variant-numeric: tabular-nums` to prices, codes, counters, and timers so numbers don't jump width during updates.
- **iOS Landscape Resizing:** Set `-webkit-text-size-adjust: 100%` on `html` and `body`.

---

## 3. Motion & Animation
- **200ms Rule:** Interactive transitions must stay ≤ 200ms for instantaneous, responsive tactile feedback.
- **Proportional Motion:** Dialog and modal scale starts at ~0.96 → 1.0 (never 0 → 1). Button active scale is 0.97–0.99 (never 0.8).
- **Frequent Action Minimalism:** Avoid heavy animations on frequent actions (context menus, dropdown toggles).
- **Loop Pause:** Looping animations pause or throttle when off-screen to conserve CPU/GPU.
- **Smooth Scroll:** Apply `scroll-behavior: smooth` with adequate `scroll-padding-top` for sticky headers.

---

## 4. Touch & Mobile Devices
- **Prevent Sticky Hover on Touch:** Wrap hover-only effects inside `@media (hover: hover) { ... }` so mobile taps don't get stuck in hover states.
- **16px iOS Zoom Prevention:** All inputs, textareas, and selects must have `font-size: 16px` (or `text-base`) on mobile to prevent iOS Safari from zooming in on focus.
- **Autoplay Video Attributes:** Always include `muted` and `playsinline` on `<video autoplay>` tags for iOS.
- **Tap Highlight:** Reset `-webkit-tap-highlight-color: transparent` and provide clean native CSS active states.

---

## 5. Performance & Rendering
- **Gradients vs Blur:** Avoid heavy stacked `backdrop-filter` blurs; use radial gradients and GPU composition with `transform: translateZ(0)` when needed.
- **Selection Gradient Fix:** When text has gradient fills, reset `background-clip` and text-fill on `::selection` so selected text is legible.

---

## 6. Accessibility & Details
- **Focus Rings with Box Shadow:** Use `box-shadow: 0 0 0 2px #fff` for focus rings instead of `outline` so the ring follows `border-radius` cleanly across all browsers.
- **Accessible Icon Buttons:** Icon-only buttons must have an explicit `aria-label` or `title`.
- **Keyboard Traps & Escape:** Modals must close on `Escape` key and maintain accessible focus.
- **Semantic Images:** Always render real `<img>` elements with descriptive `alt` attributes for screen readers and right-click copying.
- **SVG Favicon:** Support dark/light mode in SVG favicon with `@media (prefers-color-scheme: dark)`.

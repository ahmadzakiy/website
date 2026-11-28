# 001 — Make reduced-motion CSS override interactive movement

- **Status**: IMPLEMENTED 2026-11-19; reduced-mode browser emulation unavailable
- **Commit**: `40e3814` plus the uncommitted redesign present when this plan was written
- **Severity**: MEDIUM
- **Category**: Accessibility
- **Estimated scope**: One file; replace one media-query block, approximately 40 lines
- **Repository**: `/Users/mekari/Desktop/project/website`

## Problem

Implementation note: the following snapshots describe the earlier card design. The current fix in `portfolio.css` covers the remaining button, theme and arrow selectors; removed artwork selectors were not reintroduced. Gentle color/opacity feedback remains. See `assets/responsive-audit-2026-11-19.md` for current verification and its limits. Do not execute the historical target block below against the current source.

The live portfolio uses CSS transitions and the shared curve `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`. The intended reduced-motion override in `/Users/mekari/Desktop/project/website/src/app/portfolio.css:1356` loses the cascade in two places.

Current code, verbatim:

```css
@media (prefers-reduced-motion: reduce) {
  .portfolio :where(.button, .theme-toggle, .project-visual, .razzil-composer, .work-card-arrow, .text-link svg, .notes-preview-links svg) {
    transition: none;
  }

  .portfolio :where(.button, .theme-toggle):active {
    transform: none;
  }

  .work-card-link:hover .project-visual, .work-card-link:active .project-visual {
    transform: none;
  }

  .work-card-link:hover .razzil-composer {
    transform: rotate(-4deg);
  }

}
```

- At `portfolio.css:260` and `:701`, `.text-link svg` and `.notes-preview-links svg` have specificity `(0,1,1)`. Their `transform 180ms var(--ease-out)` beats the reduced-motion transition selector's `(0,1,0)` because `:where()` adds no specificity. The hover translation at `:1000` also remains enabled.
- At `portfolio.css:264`, `.button:active:not(:focus-visible)` and its theme counterpart have specificity `(0,3,0)`, beating the reduced-motion reset's `(0,2,0)`.
- At `portfolio.css:357`, `.work-card-link:active:not(:focus-visible) .project-visual` has specificity `(0,4,0)`, beating the reset's `(0,3,0)`.

The result is animated arrows and instantaneous press scaling despite the user's reduced-motion preference.

## Target

Replace only the existing reduced-motion block with the following. Match the original selectors so source order resolves the overrides. Do not add `!important` or a global transition reset.

```css
@media (prefers-reduced-motion: reduce) {
  .button,
  .theme-toggle,
  .project-visual,
  .razzil-composer,
  .work-card-arrow,
  .text-link svg,
  .notes-preview-links svg {
    transition: none;
  }

  .button:active:not(:focus-visible),
  .theme-toggle:active:not(:focus-visible),
  .work-card-link:active:not(:focus-visible) .project-visual,
  .work-card-link:hover .project-visual,
  .text-link:hover svg,
  .notes-preview-links a:hover svg,
  .work-card-link:hover .work-card-arrow {
    transform: none;
  }

  .work-card-link:hover .razzil-composer {
    transform: rotate(-4deg);
  }

  .portfolio :where(.button, .theme-toggle, .work-card-link):active {
    opacity: 0.65;
  }
}
```

The composer keeps its existing static `rotate(-4deg)` baseline. Pressed controls retain immediate opacity feedback, matching the portfolio's existing `opacity: 0.65` link feedback. Keyboard interactions remain immediate. Normal-motion curves, timings, artwork, and layout remain as authored.

## Repo conventions to follow

- Styles live in `/Users/mekari/Desktop/project/website/src/app/portfolio.css` and are imported by `src/app/layout.tsx`.
- The curve token at `portfolio.css:10` is `cubic-bezier(0.23, 1, 0.32, 1)`; normal timings are 140ms, 180ms, and 220ms. This plan adds no new motion timing.
- Existing pointer-only hover rules are inside `(hover: hover) and (pointer: fine)` at `portfolio.css:985`; keep that gate.
- Existing static opacity press feedback at `portfolio.css:268` is the exemplar for reduced-motion press feedback.
- Prefix every shell command with `rtk`. Use pnpm. Do not commit, push, stage, reset, or install dependencies.

## Steps

1. Confirm the current media query and normal selectors match the snippets and locations above. The commit stamp alone is insufficient: the redesign is uncommitted. An isolated executor must receive that working-tree source, not just a checkout of `40e3814`.
2. Replace the reduced-motion block in `src/app/portfolio.css` with the exact target block.
3. Inspect the diff and confirm the other media queries and ordinary hover/press rules are untouched.
4. Complete the verification below. Report failures rather than expanding the scope.

## Boundaries

- Edit only `src/app/portfolio.css`.
- Do not change markup, spacing, colors, artwork, normal-motion timing, or theme behavior.
- Do not touch Lenis, health-page scrambling, or the other audit findings.
- Do not remove the composer's static rotation or apply a page-wide animation reset.
- Do not add dependencies, tests that mirror CSS declarations, or a new test runner.
- If the source no longer matches the snapshots, stop and report the drift.

## Verification

### Mechanical

From `/Users/mekari/Desktop/project/website`:

```sh
rtk node -e 'const fs = require("node:fs"); require("postcss").parse(fs.readFileSync("src/app/portfolio.css", "utf8"));'
rtk git diff --check
```

Both commands must exit zero. The project's Biome file filter currently excludes CSS, so a Biome success is not CSS validation. This is a CSS-only change; no JS/TS test run is required. The package currently has no `test` script.

### Feel check

Use the existing dev server at `http://localhost:9000/`. If it is not running, start it with `rtk pnpm dev` after resolving any environment-specific package-manager restrictions.

1. In browser DevTools Rendering, emulate `prefers-reduced-motion: reduce`.
2. Hover the hero's **Get in touch** link, **All work**, and each notebook-category link. The arrow transform must remain `none` before, during, and after hover, with no animated translation.
3. Press and hold the primary CTA and theme control. Neither scales. Immediate opacity feedback remains visible.
4. Hover and press both project cards. The artwork and circular arrow stay fixed; the Razzil composer retains its original static angle. There must be no snap to a pressed scale.
5. In DevTools Computed, confirm the affected SVGs have no transform transition and the pressed targets resolve to `transform: none`.
6. Disable reduced-motion emulation. Ordinary 140ms button feedback, 180ms arrows, 220ms artwork feedback, and Razzil hover movement must work as before.
7. Use the Animations panel at 10% playback where available to inspect the ordinary transitions; reduced mode must produce no positional animation to slow down.
8. Use Tab/Enter/Space to verify keyboard activation stays immediate. Check a narrow viewport and a physical touch device if available; no hover movement should latch after tapping.

**Done when:** reduced mode suppresses every affected positional change while retaining feedback, and ordinary mode remains visually unchanged.

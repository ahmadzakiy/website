# Responsive audit — 2026-11-19

## Result

No content overflow was found at normal text size on the six public routes. The shared-header defect found at 200% text was subsequently fixed after the owner's request. The original finding below is retained as historical evidence.

The requested thumbnail swap is complete in `src/data/projects.ts`: Mekari Pixel now uses `razzil-abstract.jpg`, and Razzil uses `pixel-abstract.jpg`. Both the homepage and Work page were checked in the browser.

## Coverage

| Surface | Viewports | Result |
| --- | --- | --- |
| Home `/` | 320, 375, 640, 641, 768, 900, 901, 1024, 1440, 2560px wide | No overflowing visible content; work grid switches from one to two columns after 900px. |
| Work `/projects` | 320, 768, 1440px wide | No overflowing visible content. |
| Notes `/notes` | 320, 768, 1440px wide | Loading state and the completed 48-item collection checked; no overflow. |
| Contact `/links` | 320, 768, 1440px wide | Email and supporting content fit. |
| Design systems `/figma` | 320, 768, 1440px wide | Headings, panel and action fit. |
| Health `/health` | 320, 768, 1440px wide | Build information and status cards fit. |
| Shared header and Work cards, 200% root font | 320, 641, 768, 1024, 1440px wide, using the development harness | Cards fit; header fails at 641 and 768px. |
| Shared compact navigation | 320px portrait; 600 × 320 landscape | All three links fit; Escape closes and restores toggle focus; Enter opens; selecting Work navigates and closes. |
| Home dark mode | 375 × 667 | No overflow; visual check completed. |

The normal route checks used element bounds and scroll/client widths, including child elements, so global `overflow-x: hidden` did not conceal overflow from the audit. Full-page screenshots were captured at 320, 768 and 1440px for each route. Representative screenshots were visually inspected, including every route at 320px and the homepage at tablet and desktop sizes.

## Original finding

**Header controls leave the viewport at 200% text.** `src/app/portfolio.css:817` switches to compact navigation only below a fixed 640px viewport width. Above that breakpoint, enlarged brand text, navigation padding and controls require more room than is available. At both 641px and 768px with a 32px root font, the theme control ends at approximately x=929px; Contact also extends to x=793px. The theme action is unreachable from the visible header.

Recommended fix: size the header's collapse breakpoint in font-relative units, or collapse based on available header space. Separate this from unrelated page layout breakpoints; keep ordinary desktop spacing unchanged. Recheck 640/641, 768, 1024 and 200% text after changing it.

Evidence: `/tmp/website-responsive-2026-11-19/navbar-200-overflow.jpg`.

## Fix and follow-up checks

The header now establishes a named inline-size container. Its compact layout uses `@container site-header (max-width: 40rem)`, so the threshold follows the computed root font size. Page layout breakpoints remain separate. A media query with `rem` units alone would use the initial font size and would not respond to the harness's root-font override.

At 200% root font size, the header and cards have no overflowing visible children at 320, 640, 641, 768, 1024, 1280, 1281 and 1440px. Compact navigation applies through 1280px and returns to the full header at 1281px. At 768px, the theme control ends at x=731px, and all three open navigation links fit between x=42 and x=726px. Escape closes the menu and restores toggle focus. Screenshot: `/tmp/website-responsive-fixed-2026-11-19/navbar-768-text200.jpg`.

All six routes were rechecked at 320, 768 and 1440px with normal text and no overflowing visible content found. The Notes follow-up inspected its loading layout; the earlier audit above also verified all 48 loaded items.

The five animation findings were addressed in the same follow-up: reduced-motion CSS now matches the original selectors and suppresses arrow and press movement; buttons retain color/opacity feedback; Lenis mounts only after confirming no reduced-motion preference and listens for changes; Health renders a static heading; press feedback uses 160ms and release uses 100ms. The existing Lenis adapter's unmount cleanup was inspected and destroys its instance.

Scoped Biome, TypeScript, PostCSS parsing, and `git diff --check` passed. A scoped test attempt again confirmed that no `test` script exists. Normal-mode Lenis activation and the static Health heading were observed in the browser. The browser tools do not expose reduced-motion emulation, so reduced-mode behavior and live OS preference changes were verified in source only, not exercised end to end. A production build was not run.

Implementation references: [MDN container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries) and [MDN matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia). The Modern Web Guidance CLI was attempted but unavailable due to registry DNS resolution; the offline retry had no cached package. No dependency was added.

## Limits and verification

- Browser viewport testing, not physical-device testing. Safari and Firefox were not exercised.
- 200% is the root-font override in the development harness, not browser zoom. It tests the shared header, footer and cards; it does not establish 200% text compliance for all page bodies.
- The previously reported five animation findings are implemented; reduced-mode browser emulation remains a verification limitation as described above.
- Thumbnail data passed scoped Biome. The scoped test attempt returned `ERR_PNPM_NO_SCRIPT`; no test suite is claimed as passing.
- Theme was restored to system and the viewport override was reset.
- Screenshots: `/tmp/website-responsive-2026-11-19/`; final work preview: `final-work.jpg`.

Review reference: [Vercel Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md), especially content handling, focus visibility, and layout guidance.

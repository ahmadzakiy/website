# Work cards — break-ui report

## Scope and implementation

The homepage and `/projects` now share an editorial work-list layout: a square abstract thumbnail beside a title and category. Each item is still a native external link. Four original thumbnails were generated using the built-in image_gen tool and exported as local 512 × 512 JPEG assets, approximately 64 KB combined. The exact prompts and original paths are in [work-thumbnails.md](work-thumbnails.md).

The stress harness renders the same `ProjectShowcase` component through its `items` prop; it does not edit card markup or CSS between datasets. The new editorial design was completed before testing. All six findings below were subsequently fixed after the owner's `fix all` instruction. The original findings are retained as historical evidence; their line references describe the pre-fix snapshot.

Development URL: `http://localhost:9000/dev/work-cards?data=worst`

The server route rejects non-development requests with `notFound()` at `src/app/dev/work-cards/page.tsx:6`. This guard was reviewed in source; a production build was not run.

## Surface map

| Field | Source | Type | Limit found | Optional? |
| --- | --- | --- | --- | --- |
| React key | `Project.id`, `src/data/projects.ts:2` | string | No length or uniqueness validator found; curated values | Required |
| Title | `Project.title`, rendered at `src/components/project-showcase.tsx:25` | string | No limit found; empty strings accepted by the type | Required property |
| Category | `Project.category`, rendered at `project-showcase.tsx:26` | string | No limit found; empty strings accepted | Required property |
| Destination | `Project.href`, rendered at `project-showcase.tsx:11` | string | No URL validator or length limit found; curated URLs | Required |
| Decorative thumbnail | `Project.thumbnail`, rendered at `project-showcase.tsx:20` | string | No nonempty-string or load-error validation found | Required property |
| Collection length | `ProjectShowcase.items`, `project-showcase.tsx:4` | readonly Project array | No cap; default is four curated items | Prop optional; defaults to real data |
| Screen-reader suffix | `project-showcase.tsx:28` | fixed string | Fixed copy: “Opens in a new tab” | Always present |

`description` remains in the project data but is not rendered by this card layout. Dates, numeric counts, status badges, user roles, asynchronous APIs, and independent menu actions are not card fields, so their catalog cases do not apply. There is no backend or form accepting these values in this feature; string limits are not mismatched with a database schema.

The shared navbar was also observed while testing the full-page text-size environment. Its three fixed labels come from `src/components/navbar.tsx:8`. Its overflow is listed separately from card defects below.

## What broke — original audit

| # | Severity | Field | Worst-case value or environment | What happens | Fix location and recommendation |
| --- | --- | --- | --- | --- | --- |
| 1 | Broken | Title and category | `Benachrichtigungseinstellungen`; a real-shaped URL used as a saved project title; 320px; root text size 200% | Unbreakable text exceeds its column and is clipped by the page boundary. At 320px/200%, even normal demo card content overflows: measured copy scroll widths were 138px and 141px inside 126px columns. At ordinary desktop width the URL title also overflows. | `src/app/portfolio.css:329` and `:336`: allow emergency wrapping with `overflow-wrap: anywhere`; retain normal word boundaries otherwise. Recheck both title and metadata at 200%. |
| 2 | Broken — shared chrome | Navigation labels | 320px viewport with root font size 200% | The fixed header's avatar, navigation, gaps, and theme control no longer fit one row. Contact and the theme action are beyond the visible right edge. This predates the card revamp. | `src/app/portfolio.css:71`, `:109`, and `:800`: adapt the header when its content no longer fits; keep every navigation and theme action reachable. This is outside the card component. |
| 3 | Ugly | Thumbnail | A 404 image URL and an empty string | Browser broken-image UI or an empty image slot replaces the intended artwork. Empty source also triggers Next Image development warnings. The component itself does not crash. | `src/components/project-showcase.tsx:15`: provide an intentional local fallback for absent or failed thumbnails and validate curated empty strings. |
| 4 | Ugly | Thumbnail alignment | The long Pixel project title with expanded metadata at 320px | Text wraps, but `align-items: center` leaves the small thumbnail floating midway beside a tall text block. | `src/app/portfolio.css:310`: top-align at narrow card widths or when using expanded text, retaining the intended centered editorial alignment for compact rows if desired. |
| 5 | Fragile | Title | Empty string | The heading has no content. The link is named only by its generic category and the new-tab suffix, so it no longer identifies the project. | `src/components/project-showcase.tsx:25`, `src/data/projects.ts:3`: reject empty curated titles or render a useful destination-based fallback. |
| 6 | Fragile | Collection | Zero items | The grid renders no content or explanation. There is no crash, but the region provides no empty-state feedback. | `src/components/project-showcase.tsx:5`: choose between an explicit empty message and hiding the homepage section. |

All six observations are based on source plus live browser inspection. They are not failures in the current four-project dataset at ordinary text size, except that the shared navbar/text-scale issue affects its real labels. The missing-media and missing-title cases are intentionally supplied by the development harness.

## Design choices adopted by the fixes

- **Long titles:** recommend wrapping in full, including emergency breaks for URLs and compound words. Titles identify projects; truncation would hide that information.
- **Narrow multiline rows:** recommend top alignment at narrow card widths, while retaining centered alignment for ordinary desktop rows to preserve the reference's rhythm.
- **Missing media:** recommend a neutral local abstract fallback instead of a browser broken-image icon. The images are decorative, so an accessible text label is already supplied by the title.
- **Empty collection:** render an explicit “No projects to show yet.” message at the shared component boundary.
- **Shared header:** collapse links into a native button-controlled disclosure below 640px; keep the avatar and theme control reachable. Escape closes the disclosure and restores focus; an outside pointer interaction also closes it.

## What held up

- Default data remained readable at the actual 1120px container and at 320px with ordinary text size. The site keeps its 1120px content maximum at a 2560px viewport.
- `minmax(0, 1fr)` and `min-width: 0` prevent the grid tracks themselves from stretching; the remaining overflow is text inside those tracks.
- Full-card links remain generous click targets even for the one-character title `J`; there is no tiny title-only hit target.
- CJK, Vietnamese diacritics, Arabic, and the `👩🏽‍💻` emoji render without missing graphemes or vertical clipping in the inspected rows.
- Literal `<b>`, `&amp;`, and markdown markers stay literal; no HTML is executed or silently interpreted.
- 4000 × 200 and 200 × 4000 SVG fixtures retain a square crop without distorting the central circle. Missing thumbnails retain the square layout allocation even though their error presentation needs a decision.
- Dark mode preserves readable text and distinct artwork. The RTL wrapper mirrors media and text columns correctly. This exercises the card, not a claim that the entire English-only site is localized.
- One item renders normally. The large fixture renders all 1,000 unique keyed rows, including both endpoints. There was no render crash; frame-rate, memory, and scrolling throughput were not benchmarked. The production list is currently four curated projects, so no virtualization recommendation is made from this artificial capacity check alone.
- Dataset selection persists in the URL and survives reload. Switching is immediate. The root font-size override is cleaned up when leaving the harness.

## Coverage and evidence

Datasets: Demo data (4), Worst case (9 mixed rows), Empty (0), One (1), and 1,000 rows. The 1,000-row state is a capacity exercise, not a claim about a realistic personal portfolio size.

Environments inspected:

- 1235 × 793 viewport, actual card-grid width 1120px: Demo and Worst case.
- 320 × 793 viewport: Demo and Worst case.
- 2560 × 1440 viewport, grid still capped at 1120px: Demo and Worst case.
- 320px with the root font size raised to 200%: Demo; this is the skill's permitted alternative to browser zoom. It is not a browser-zoom measurement.
- Dark mode plus RTL card wrapper: Demo and Worst case.
- Empty, One, and 1,000 rows at the ordinary desktop viewport.

Screenshots are stored in `/tmp/website-editorial-cards/`, including `home-normal.jpg`, `demo-320.jpg`, `worst-320.jpg`, `demo-320-large-text.jpg`, `demo-2560.jpg`, `worst-2560.jpg`, `demo-dark-rtl.jpg`, `worst-dark-rtl.jpg`, `empty.jpg`, `one.jpg`, and `1000-viewport.jpg`.

No physical touch device was available. The link actions are always visible; no card action depends on hover.

## Mechanical checks

- Scoped Biome check passed.
- TypeScript `--noEmit --incremental false` passed.
- CSS was parsed successfully with the installed PostCSS during the stylesheet cleanup.
- `git diff --check` passed.
- The follow-up scoped test attempt used the cached pnpm executable and returned `ERR_PNPM_NO_SCRIPT`: this package has no `test` script. No test suite is claimed as passing.

## Fixes and re-verification

| Finding | Implemented fix | Verified result |
| --- | --- | --- |
| 1 — Text overflow | `overflow-wrap: anywhere` on `.work-card-copy` in `src/app/portfolio.css` | Zero overflowing copy blocks in Demo and Worst case at 320px, including 200% root font size; desktop checks also pass. |
| 2 — Unreachable header actions | Compact disclosure navigation in `src/components/navbar.tsx` and responsive CSS | At 320px/200%, avatar, menu, theme control and all three expanded links remain inside the viewport. Escape returns focus to the toggle; keyboard tabbing reaches Contact; outside clicks dismiss the disclosure. |
| 3 — Missing thumbnail | Small client image boundary in `src/components/work-thumbnail.tsx`; empty or failed sources use a bundled abstract | All nine Worst case images resolve, including the intentional 404 and empty source, with no broken-image icon. |
| 4 — Floating thumbnail | Top alignment below a 26rem card-container width | Thumbnail and copy share the top edge in narrow multiline rows; ordinary desktop rows retain centered alignment. |
| 5 — Empty title | Destination hostname fallback in `src/components/project-showcase.tsx`, then “Untitled project” if unavailable | The blank fixture title is identified as `example.org`; no empty headings remain. Empty categories are omitted. |
| 6 — Empty collection | Explicit empty-state paragraph in `src/components/project-showcase.tsx` | Empty dataset displays “No projects to show yet.” |

All five toggle positions were rechecked after the fixes: Demo (4), Worst case (9), Empty (0), One (1), and 1,000 rows. The 1,000-row check confirmed both endpoints and no overflowing card-copy blocks; it is not a frame-rate benchmark. Demo and Worst case were also checked in dark mode with an RTL card wrapper. The initial audit covered 2560px; the follow-up viewport override could not be independently confirmed on the intended tab, so that width is not claimed as a post-fix verification. Reload preserves Worst case selection. The normal homepage was inspected again to confirm the original four-card presentation remains intact.

Post-fix screenshots are in `/tmp/website-break-ui-fixed/`, including `home-desktop.jpg`, `worst-320.jpg`, `menu-320-large-text.jpg`, `worst-320-large-text.jpg`, `demo-320-large-text.jpg`, and `demo-dark-rtl.jpg`. Files labelled `2560` are excluded as width evidence for the reason above. The theme was restored to system mode and the temporary viewport override was reset.

Scoped Biome, TypeScript, PostCSS parsing, and `git diff --check` passed after the source changes. No production build was run. The dev-only fixtures and toggle remain available at the development URL above for future regressions.

# 002 — Use native scrolling when reduced motion is requested

- **Status**: IMPLEMENTED 2026-11-19; reduced-mode browser emulation unavailable
- **Commit**: `40e3814` plus the uncommitted redesign present when this plan was written
- **Severity**: MEDIUM
- **Category**: Accessibility
- **Estimated scope**: Two files; one small client component and a root-layout substitution
- **Repository**: `/Users/mekari/Desktop/project/website`

## Problem

Implementation note: `src/components/smooth-scroll.tsx` now owns preference handling, and the root layout mounts it in place of the direct adapter. The installed adapter's destroy-on-unmount behavior was confirmed in source. See `assets/responsive-audit-2026-11-19.md` for current verification and its limits.

`/Users/mekari/Desktop/project/website/src/app/layout.tsx:2` imports Lenis directly:

```tsx
import { ReactLenis } from "lenis/react"
```

At `layout.tsx:58`, the root always mounts it:

```tsx
        <ReactLenis root />
        <ThemeProvider defaultTheme="system" storageKey="website-theme">
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
```

The installed Lenis 1.3.8 React adapter defaults `autoRaf = true` at `node_modules/lenis/dist/lenis-react.mjs:56`. Core Lenis defaults `smoothWheel = true` at `node_modules/lenis/dist/lenis.mjs:395` and intercepts wheel input to animate scrolling at lines 618–653. Neither this integration nor that installed path checks `prefers-reduced-motion`. CSS cannot disable this JavaScript scrolling.

This is an accessibility finding. No dropped frames were measured or claimed.

## Target

Before the preference is known, and whenever reduced motion is requested, leave scrolling native. Enable the existing Lenis behavior only after the client confirms `no-preference`. React to preference changes without reloading and clean up the media-query listener. Do not animate between scrolling modes or change the scroll position.

Create `/Users/mekari/Desktop/project/website/src/components/smooth-scroll.tsx` with this complete implementation:

```tsx
"use client"

import { ReactLenis } from "lenis/react"
import { useEffect, useState } from "react"

export default function SmoothScroll() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updatePreference = () => {
      setEnabled(!preference.matches)
    }

    updatePreference()
    preference.addEventListener("change", updatePreference)

    return () => preference.removeEventListener("change", updatePreference)
  }, [])

  return enabled ? <ReactLenis root /> : null
}
```

In `/Users/mekari/Desktop/project/website/src/app/layout.tsx`, remove the direct `ReactLenis` import, import the new component:

```tsx
import SmoothScroll from "@/components/smooth-scroll"
```

Replace only the Lenis element with:

```tsx
        <SmoothScroll />
        <ThemeProvider defaultTheme="system" storageKey="website-theme">
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
```

The initial false state makes server output and the initial client render agree. Unmounting the React adapter lets its existing cleanup destroy the Lenis instance; do not call `lenis.stop()`, which can prevent scrolling instead of restoring native scrolling. Do not add a parallel animation-frame loop.

## Repo conventions to follow

- This is Next.js 15.5.12 App Router with React 19, TypeScript strict mode, Lenis 1.3.8, Motion 12, and pnpm. No new package is needed.
- `src/components/theme-provider.tsx` is the existing exemplar for browser-only work inside an effect and a stable initial server/client state. Keep the root layout a Server Component.
- `src/app/layout.tsx:59` owns the existing theme provider and site shell. Their nesting stays as shown in the target.
- Component filenames use kebab-case and internal imports use `@/` aliases.
- `src/app/portfolio.css` owns CSS motion; this plan does not edit it or add a separate duration/easing. Normal Lenis options remain unchanged.
- Prefix every shell command with `rtk`. Use pnpm. No commit, push, staging, reset, or dependency installation is authorized.

## Steps

1. Confirm the root-layout import and element match the current-code snippets. The redesign is uncommitted; an isolated executor must receive the working-tree source rather than relying on `40e3814` alone.
2. Add `src/components/smooth-scroll.tsx` exactly as shown.
3. Substitute the import and element in `src/app/layout.tsx`. Do not add `"use client"` to the layout.
4. Verify the installed React adapter destroys its Lenis instance when the component unmounts. If that behavior has changed since the audited version, stop and report before inventing cleanup.
5. Complete the mechanical and browser checks below, including changing the emulated preference while already scrolled.

## Boundaries

- Edit only the root-layout import/element and the new `smooth-scroll.tsx` component.
- Do not change fonts, metadata, theme-provider logic, navigation, content, CSS, touch-scroll options, or the regular Lenis timing.
- Do not add a new context, generic preference hook, second requestAnimationFrame loop, dependencies, or test runner.
- Do not force scroll position, change history, modify `overflow`, or call Lenis `stop()` to implement the preference.
- Preserve native keyboard and touch scrolling. No transition or spring is needed for the mode switch.
- If the snapshots or installed cleanup behavior differ, stop and report drift.

## Verification

### Mechanical

From `/Users/mekari/Desktop/project/website`:

```sh
rtk pnpm exec biome check src/app/layout.tsx src/components/smooth-scroll.tsx
rtk pnpm exec tsc --noEmit --incremental false
rtk git diff --check
```

Expect zero errors. The repository currently has no `test` script, so report that limitation rather than inventing a passing test suite or adding a runner. If the local workflow still requires the scoped attempt after JS/TS edits, run it once and report the missing script:

```sh
rtk pnpm test -- src/components/smooth-scroll.tsx
```

Corepack previously could not download this repository's pinned pnpm 10.0.0 because of cache/network restrictions. Resolve that environment prerequisite using the available package-manager setup without changing `package.json` or the lockfile; do not misreport a command that never ran as successful.

### Feel check

Use the existing dev server at `http://localhost:9000/`, or start it with `rtk pnpm dev` if necessary.

1. Emulate `prefers-reduced-motion: reduce` before a fresh page load. Confirm wheel/trackpad scrolling stays native, content is immediately scrollable, and the document is not marked as Lenis smooth-scrolling.
2. With reduced motion off, reload and confirm the existing smooth wheel behavior still works. Do not tune its feel in this task.
3. Scroll halfway down the page. Turn reduced motion on without reloading. The adapter must unmount, smoothing must end, and native scrolling must continue without a jump or a frozen page.
4. Turn reduced motion off again. Smoothing may resume from the current position. Toggle the preference repeatedly and verify there is no accumulating duplicate instance, listener, or scroll response.
5. Navigate Home → Work → Notes → Contact and back. Preference handling must remain consistent under the shared root layout.
6. Test PageDown, ArrowDown, the skip link, and the **Explore my work** anchor. They must still reach their targets with reduced motion enabled.
7. Check browser console output on a fresh load for hydration warnings caused by this change.
8. On a real phone if available, verify native touch scrolling is not intercepted or locked. In DevTools at slow playback, confirm this preference switch adds no transition of its own; mode switching should be immediate.

**Done when:** reduced motion always gets native scrolling, live preference changes work without reload or position jumps, and ordinary scrolling preserves its existing behavior.

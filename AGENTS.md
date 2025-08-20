# Ahmad Zakiy's Personal Website - AI Agent Instructions

## Project Overview

This is a Next.js 15 personal portfolio/blog site with a unique component architecture, built with modern web technologies and strict code quality standards.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **React**: React 19 
- **TypeScript**: Strict mode enabled
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Animation**: Motion (framer-motion v12) for scroll-based animations
- **Linting**: Biome with Ultracite rules (strict accessibility & code quality)
- **Package Manager**: pnpm
- **Development Port**: 9000

## Project Structure

```
src/
├── app/                     # Next.js App Router pages
│   ├── globals.css         # Global styles and Tailwind config
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Homepage
│   ├── figma/              # Figma integration page
│   ├── links/              # Links page
│   ├── notes/              # Notes/blog page
│   └── projects/           # Projects showcase
├── components/             # Core reusable components
│   ├── navbar.tsx          # Animated navbar with scroll effects
│   ├── theme-provider.tsx  # Theme management
│   ├── scramble-text.tsx   # Custom text animation
│   └── ...
├── fancy/components/       # Experimental/creative components
│   ├── background/         # Animated backgrounds
│   ├── blocks/            # Layout blocks
│   └── text/              # Text animations
├── hooks/                  # Custom React hooks
├── lib/                   # Utilities
└── data/                  # Static data files
```

## Key Architecture Patterns

### Theme System
- Custom ThemeProvider with localStorage persistence using "website-theme" key
- Manual theme resolution in components that need theme-aware logic
- CSS custom properties in `globals.css` with `.dark` class overrides
- Always check `mounted` state before applying theme-dependent logic to prevent hydration mismatches

### Animation System
- Use `motion` from "motion/react" (not framer-motion)
- **Lenis Integration**: Use `useLenis()` hook with `useMotionValue()` for scroll-based animations
- Pattern: Create `scrollY = useMotionValue(0)` and update it via Lenis `scroll` event listener
- Custom scramble text effects with configurable speed/iterations

### Component Organization
- Core components in `/components` for reusable UI elements
- Experimental components in `/fancy/components` organized by type
- All client components explicitly marked with "use client"
- Use `cn()` utility from `@/lib/utils` for className merging

### Styling Approach
- Tailwind CSS v4 with custom design tokens in `globals.css`
- No separate Tailwind config file - using @import pattern
- Custom CSS properties for theme-aware styling
- Responsive design with mobile-first approach

## Development Commands

```bash
pnpm dev          # Start development server on port 9000
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run Biome linter with auto-fix
pnpm format       # Format code with Biome
```

## Font Configuration

Three fonts configured in `layout.tsx`:
- `Inter` (sans): Primary UI font
- `Instrument_Serif` (serif): Decorative text
- `Geist_Mono` (mono): Code/monospace (set as body default)

## Coding Standards & Rules

This project follows Ultracite rules for strict accessibility and code quality:

### Accessibility (a11y)
- Don't use `accessKey` attribute on any HTML element.
- Don't set `aria-hidden="true"` on focusable elements.
- Don't add ARIA roles, states, and properties to elements that don't support them.
- Don't use distracting elements like `<marquee>` or `<blink>`.
- Only use the `scope` prop on `<th>` elements.
- Don't assign non-interactive ARIA roles to interactive HTML elements.
- Make sure label elements have text content and are associated with an input.
- Don't assign interactive ARIA roles to non-interactive HTML elements.
- Don't assign `tabIndex` to non-interactive HTML elements.
- Don't use positive integers for `tabIndex` property.
- Don't include "image", "picture", or "photo" in img `alt` prop.
- Don't use explicit role property that's the same as the implicit/default role.
- Make static elements with click handlers use a valid role attribute.
- Always include a `title` element for SVG elements.
- Give all elements requiring alt text meaningful information for screen readers.
- Make sure anchors have content that's accessible to screen readers.
- Assign `tabIndex` to non-interactive HTML elements with `aria-activedescendant`.
- Include all required ARIA attributes for elements with ARIA roles.
- Make sure ARIA properties are valid for the element's supported roles.
- Always include a `type` attribute for button elements.
- Make elements with interactive roles and handlers focusable.
- Give heading elements content that's accessible to screen readers (not hidden with `aria-hidden`).
- Always include a `lang` attribute on the html element.
- Always include a `title` attribute for iframe elements.
- Accompany `onClick` with at least one of: `onKeyUp`, `onKeyDown`, or `onKeyPress`.
- Accompany `onMouseOver`/`onMouseOut` with `onFocus`/`onBlur`.
- Include caption tracks for audio and video elements.
- Use semantic elements instead of role attributes in JSX.
- Make sure all anchors are valid and navigable.
- Ensure all ARIA properties (`aria-*`) are valid.
- Use valid, non-abstract ARIA roles for elements with ARIA roles.
- Use valid ARIA state and property values.
- Use valid values for the `autocomplete` attribute on input elements.
- Use correct ISO language/country codes for the `lang` attribute.

### Code Complexity and Quality
- Don't use consecutive spaces in regular expression literals.
- Don't use the `arguments` object.
- Don't use primitive type aliases or misleading types.
- Don't use the comma operator.
- Don't use empty type parameters in type aliases and interfaces.
- Don't write functions that exceed a given Cognitive Complexity score.
- Don't nest describe() blocks too deeply in test files.
- Don't use unnecessary boolean casts.
- Don't use unnecessary callbacks with flatMap.
- Use for...of statements instead of Array.forEach.
- Don't create classes that only have static members (like a static namespace).
- Don't use this and super in static contexts.
- Don't use unnecessary catch clauses.
- Don't use unnecessary constructors.
- Don't use unnecessary continue statements.
- Don't export empty modules that don't change anything.
- Don't use unnecessary escape sequences in regular expression literals.
- Don't use unnecessary fragments.
- Don't use unnecessary labels.
- Don't use unnecessary nested block statements.
- Don't rename imports, exports, and destructured assignments to the same name.
- Don't use unnecessary string or template literal concatenation.
- Don't use String.raw in template literals when there are no escape sequences.
- Don't use useless case statements in switch statements.
- Don't use ternary operators when simpler alternatives exist.
- Don't use useless `this` aliasing.
- Don't use any or unknown as type constraints.
- Don't initialize variables to undefined.
- Don't use the void operators (they're not familiar).
- Use arrow functions instead of function expressions.
- Use Date.now() to get milliseconds since the Unix Epoch.
- Use .flatMap() instead of map().flat() when possible.
- Use literal property access instead of computed property access.
- Don't use parseInt() or Number.parseInt() when binary, octal, or hexadecimal literals work.
- Use concise optional chaining instead of chained logical expressions.
- Use regular expression literals instead of the RegExp constructor when possible.
- Don't use number literal object member names that aren't base 10 or use underscore separators.
- Remove redundant terms from logical expressions.
- Use while loops instead of for loops when you don't need initializer and update expressions.

### React and JSX Best Practices
- Don't pass children as props.
- Don't use the return value of React.render.
- Make sure all dependencies are correctly specified in React hooks.
- Make sure all React hooks are called from the top level of component functions.
- Don't forget key props in iterators and collection literals.
- Don't destructure props inside JSX components in Solid projects.
- Don't define React components inside other components.
- Don't use event handlers on non-interactive elements.
- Don't assign to React component props.
- Don't use dangerous JSX props.
- Don't use both `children` and `dangerouslySetInnerHTML` props on the same element.

### TypeScript Best Practices
- Don't use TypeScript enums.
- Don't export imported variables.
- Don't add type annotations to variables, parameters, and class properties that are initialized with literal expressions.
- Don't use TypeScript namespaces.
- Don't use non-null assertions with the `!` postfix operator.
- Don't use parameter properties in class constructors.
- Use `as const` instead of literal types and type annotations.
- Use either `T[]` or `Array<T>` consistently.
- Use `export type` for types.
- Use `import type` for types.
- Make sure all enum members are literal values.
- Don't use TypeScript const enum.
- Don't declare empty interfaces.
- Don't let variables evolve into any type through reassignments.
- Don't use the any type.
- Don't misuse the non-null assertion operator (!) in TypeScript files.
- Don't use implicit any type on variable declarations.
- Don't merge interfaces and classes unsafely.
- Don't use overload signatures that aren't next to each other.
- Use the namespace keyword instead of the module keyword to declare TypeScript namespaces.

### Next.js Specific Rules
- Don't use `<img>` elements in Next.js projects.
- Don't use `<head>` elements in Next.js projects.
- Don't import next/document outside of pages/_document.jsx in Next.js projects.
- Don't use the next/head module in pages/_document.js on Next.js projects.

## Important Notes for AI Agents

### When Writing Code
1. **Always use TypeScript** with strict type checking
2. **Follow the component patterns** established in the codebase
3. **Use proper accessibility attributes** for all interactive elements
4. **Implement proper error boundaries** for React components
5. **Use the established animation patterns** with Motion and Lenis
6. **Follow the theme system** architecture for consistent styling
7. **Use semantic HTML** elements wherever possible
8. **Test responsive behavior** across different screen sizes

### File Naming Conventions
- Components: `kebab-case.tsx` (e.g., `scramble-text.tsx`)
- Hooks: `use-kebab-case.ts` (e.g., `use-debounced-dimensions.ts`)
- Data files: `kebab-case.ts` (e.g., `notes.ts`)
- Pages: Follow Next.js App Router conventions

### Import Patterns
- Use `@/` alias for src directory imports
- Import types with `import type` syntax
- Group imports: external packages, internal modules, types
- Use named imports where possible

### Performance Considerations
- Use `useCallback` and `useMemo` appropriately for expensive operations
- Implement proper loading states for async operations
- Use Next.js Image component for optimized images
- Consider code splitting for large components

### Testing Approach
- Focus on accessibility testing
- Test component behavior, not implementation details
- Ensure proper error handling in edge cases
- Validate responsive behavior

Remember: This project prioritizes accessibility, performance, and maintainability. Every piece of code should be written with these principles in mind.

export interface LinkItem {
  href: string
  title: string
}

export interface NotesData {
  articles: LinkItem[]
  websites: LinkItem[]
  tools: LinkItem[]
}

export const notesData: NotesData = {
  articles: [
    {
      href: "https://about.google/company-info/philosophy/",
      title: "Ten things we know to be true",
    },
    {
      href: "https://a16z.com/why-software-is-eating-the-world/",
      title: "Why Software Is Eating the World",
    },
    {
      href: "https://web.dev/articles/howbrowserswork",
      title: "How Browsers Work",
    },
    {
      href: "https://oreilly.com/library/view/what-is-the/9781492072973/ch01.html",
      title: "What Is the Modern Web Platform?",
    },
    {
      href: "https://3perf.com/talks/web-perf-101/",
      title: "Web Performance 101",
    },
    {
      href: "https://ethereum.org/en/web3/",
      title: "Introduction to Web3",
    },
    {
      href: "https://react.dev/learn/thinking-in-react",
      title: "Thinking in React",
    },
    {
      href: "https://daneden.me/blog/2020/anatomy-of-a-typed-react-component",
      title: "Anatomy of a Typed React Component",
    },
    {
      href: "https://ui.dev/why-react-query",
      title: "Why React Query",
    },
    {
      href: "https://bradfrost.com/blog/post/css-architecture-for-design-systems/",
      title: "CSS Architecture for Design Systems",
    },
    {
      href: "https://adamwathan.me/css-utility-classes-and-separation-of-concerns/",
      title: "CSS Utility Classes and Separation of Concerns",
    },
    {
      href: "https://www.nngroup.com/articles/ten-usability-heuristics/",
      title: "Ten Usability Heuristics for User Interface Design",
    },
    {
      href: "https://www.canva.com/learn/design-elements-principles/",
      title: "Design Elements and Principles",
    },
    {
      href: "https://spotify.design/article/the-paradox-of-design-systems",
      title: "The Paradox of Design Systems",
    },
    {
      href: "https://overreacted.io/the-elements-of-ui-engineering/",
      title: "The Elements of UI Engineering",
    },
    {
      href: "https://svelte.dev/blog/frameworks-without-the-framework",
      title: "Frameworks without the Framework",
    },

    {
      href: "https://www.jantakacs.com/the-story-of-figma-living-long-enough-as-a-hero-to-become-a-villain",
      title: "The Story of Figma",
    },
    {
      href: "https://dev.to/emmabostian/ux-engineering-3hem",
      title: "UX Engineering",
    },
    {
      href: "https://leerob.com/product-engineers",
      title: "Product Engineers",
    },
    {
      href: "https://leerob.com/ai",
      title: "AI and the Future of Development",
    },
    {
      href: "https://substack.com/home/post/p-164288010",
      title: "The Prompt Engineering Playbook for Programmers",
    },
    {
      href: "https://tobiasahlin.com/blog/meaningful-motion-w-action-driven-animation/",
      title: "Meaningful Motion with Action-Driven Animation",
    },
    {
      href: "https://pudding.cool/2018/02/waveforms/",
      title: "Waveforms - Interactive Visualization",
    },
    {
      href: "https://cognition.ai/blog/dont-build-multi-agents",
      title: "Don't Build Multi-Agents",
    },
  ],
  websites: [
    {
      href: "https://nissan-global.com/EN/HERITAGE_COLLECTION/skyline.html",
      title: "Nissan Heritage Collection - Skyline",
    },
    {
      href: "https://sony.com/en/SonyInfo/design/gallery/",
      title: "Sony Design Gallery",
    },
    {
      href: "https://casio.com/intl/watches/casio/standard/vintage/",
      title: "Casio Vintage Watches",
    },
    {
      href: "https://lawsofux.com/",
      title: "Laws of UX",
    },
    {
      href: "https://javascriptpatterns.vercel.app/patterns/design-patterns/introduction",
      title: "JavaScript Patterns - Design Patterns",
    },
  ],
  tools: [
    {
      href: "https://excalidraw.com/",
      title: "Excalidraw - Virtual whiteboard",
    },
    {
      href: "https://www.tldraw.com",
      title: "tldraw - Infinite canvas",
    },
    {
      href: "https://jsoncrack.com/editor",
      title: "JSON Crack - JSON visualizer",
    },
    {
      href: "https://transform.tools/",
      title: "Transform Tools - Code converters",
    },
    {
      href: "https://layout.bradwoods.io/",
      title: "Layout - CSS Grid generator",
    },
    {
      href: "https://designsystems.surf/design-systems",
      title: "Design Systems Gallery",
    },
    {
      href: "https://carbondesignsystem.com/",
      title: "Carbon Design System",
    },
    {
      href: "https://polaris-react.shopify.com/",
      title: "Shopify Polaris",
    },
  ],
}

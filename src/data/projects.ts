export type Project = {
  id: string
  title: string
  category: string
  description: string
  href: string
  thumbnail: string
}

export const projects: Project[] = [
  {
    id: "pixel",
    thumbnail: "/images/work/razzil-abstract.jpg",
    title: "Mekari Pixel",
    category: "Design systems · Developer tooling",
    description:
      "Components, tokens, and documentation for Mekari products. Building MCP tooling so AI agents can work with Pixel.",
    href: "https://docs.mekari.design/",
  },
  {
    id: "bun",
    thumbnail: "/images/work/bun-abstract.jpg",
    title: "zakiy.dev",
    category: "Personal website · AI agent",
    description:
      "A conversational home on the web. Meet Bun, my AI agent, and ask about my work, ideas, and the things I build.",
    href: "https://zakiy.dev/",
  },
  {
    id: "dota",
    thumbnail: "/images/work/dota-abstract.jpg",
    title: "Dota Wrapped",
    category: "Gaming · Data visualization",
    description: "Your year in Dota 2. The wins, the throws, and everything you probably forgot.",
    href: "https://dota-wrapped.zakiy.dev/",
  },
  {
    id: "razzil",
    thumbnail: "/images/work/pixel-abstract.jpg",
    title: "Razzil",
    category: "AI · Product design",
    description:
      "Different models. One clear workspace for writing, thinking, and figuring things out.",
    href: "https://razzil.zakiy.dev/",
  },
]

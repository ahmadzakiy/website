import { type Project, projects } from "@/data/projects"

const panorama = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="4000" height="200"><rect width="4000" height="200" fill="#4e79a7"/><circle cx="2000" cy="100" r="90" fill="#eecb84"/></svg>')}`
const portrait = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="4000"><rect width="200" height="4000" fill="#b8a1c9"/><circle cx="100" cy="2000" r="90" fill="#f4d0b0"/></svg>')}`

const base: Project = {
  id: "fixture",
  title: "Project",
  category: "Design systems",
  description: "A realistic fixture for a project archive.",
  href: "https://example.org/projects/fixture",
  thumbnail: "/images/work/pixel-abstract.jpg",
}

const worst: Project[] = [
  {
    ...base,
    id: "long-title",
    title:
      "Mekari Pixel Design System — Components, Documentation, and Model Context Protocol Tooling for Product Teams",
    category: "Design systems · Developer experience · AI agent integrations",
  },
  {
    ...base,
    id: "compound-and-404",
    title: "Benachrichtigungseinstellungen",
    category: "Internationalisierung und Konfiguration der Benachrichtigungseinstellungen",
    thumbnail: "/images/work/unavailable-thumbnail.jpg",
  },
  { ...base, id: "short-title", title: "J", category: "", thumbnail: panorama },
  {
    ...base,
    id: "vietnamese",
    title: "Đặng Thị Ngọc Hân — Hệ thống thiết kế",
    category: "Thiết kế giao diện · Công cụ phát triển",
    thumbnail: portrait,
  },
  {
    ...base,
    id: "cjk",
    title: "设计系统与智能代理工具",
    category: "组件、文档与模型上下文协议",
    thumbnail: "/images/work/dota-abstract.jpg",
  },
  {
    ...base,
    id: "arabic",
    title: "نور الهدى عبد الرحمن — نظام التصميم",
    category: "أنظمة التصميم · أدوات المطورين",
    thumbnail: "/images/work/razzil-abstract.jpg",
  },
  {
    ...base,
    id: "emoji-and-literals",
    title: "👩🏽‍💻 Developer tools & <b>literal markup</b>",
    category: "R&D &amp; docs · **not markdown**",
    thumbnail: "",
  },
  { ...base, id: "missing-title", title: "" },
  {
    ...base,
    id: "url-title",
    title:
      "https://example.com/workspaces/acme/projects/q3-launch/docs/9f8e7d6c5b4a?tab=comments&filter=unresolved",
    category: "A project saved from a shared URL",
    thumbnail: "/images/work/bun-abstract.jpg",
  },
]

const archive = Array.from(
  { length: 1000 },
  (_, index): Project => ({
    ...base,
    id: `archive-${index + 1}`,
    title: `Component pattern study ${index + 1}`,
    category: "Design systems · Archive",
    href: `https://example.org/archive/${index + 1}`,
    thumbnail: projects[index % projects.length]?.thumbnail ?? base.thumbnail,
  }),
)

export const datasets = {
  demo: { label: "Demo data", items: projects },
  worst: { label: "Worst case", items: worst },
  empty: { label: "Empty", items: [] },
  one: { label: "One", items: [base] },
  large: { label: "1,000 rows", items: archive },
} satisfies Record<string, { label: string; items: readonly Project[] }>

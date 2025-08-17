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
      title: "Ten Things We Know to be True",
    },
  ],
  websites: [
    {
      href: "https://lawsofux.com/",
      title: "Laws of UX",
    },
  ],
  tools: [
    {
      href: "https://v0.dev/",
      title: "v0",
    },
  ],
}

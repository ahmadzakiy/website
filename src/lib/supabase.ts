import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable")
}

if (!supabaseAnonKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface Note {
  id: number
  href: string
  title: string
  category_id: number
  created_at: string
}

export interface Category {
  id: number
  name: string
  created_at: string
}

export interface NoteWithCategory extends Note {
  categories: Category
}

export async function getAllNotesGroupedByCategory() {
  const { data, error } = await supabase
    .from("notes")
    .select(`
      id,
      href,
      title,
      category_id,
      created_at,
      categories (
        id,
        name
      )
    `)
    .order("created_at", { ascending: true })

  if (error) {
    throw new Error(`Error fetching notes: ${error.message}`)
  }

  // Group by category and include id for unique keys
  const grouped = (data || []).reduce(
    (acc, note) => {
      const categories = note.categories as
        | { id: number; name: string }
        | { id: number; name: string }[]
      const category = Array.isArray(categories) ? categories[0] : categories
      const categoryName = category?.name as "articles" | "websites" | "tools"
      if (categoryName && acc[categoryName]) {
        acc[categoryName].push({
          id: note.id,
          href: note.href,
          title: note.title,
        })
      }
      return acc
    },
    {
      articles: [] as Array<{ id: number; href: string; title: string }>,
      websites: [] as Array<{ id: number; href: string; title: string }>,
      tools: [] as Array<{ id: number; href: string; title: string }>,
    }
  )

  // Remove duplicates based on href within each category
  const deduplicated = {
    articles: removeDuplicatesByHref(grouped.articles),
    websites: removeDuplicatesByHref(grouped.websites),
    tools: removeDuplicatesByHref(grouped.tools),
  }

  return deduplicated
}

// Helper function to remove duplicates by href, keeping the first occurrence
function removeDuplicatesByHref<T extends { href: string }>(items: T[]): T[] {
  const seen = new Set<string>()
  return items.filter((item) => {
    if (seen.has(item.href)) {
      return false
    }
    seen.add(item.href)
    return true
  })
}

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
export type Note = {
  id: number
  href: string
  title: string
  category_id: number
  created_at: string
}

export type Category = {
  id: number
  name: string
  created_at: string
}

export interface NoteWithCategory extends Note {
  categories: Category
}

export async function getAllNotesGroupedByCategory() {
  // biome-ignore lint: Debug logging for database operations
  console.log("Fetching notes from Supabase...")
  // First, fetch categories from Supabase
  const { data: categoriesData, error: categoriesError } = await supabase
    .from("categories")
    .select("id, name")

  if (categoriesError) {
    throw new Error(`Error fetching categories: ${categoriesError.message}`)
  }

  // Create mapping from category ID to name
  const categoryIdToName: Record<number, string> = {}
  if (categoriesData) {
    for (const category of categoriesData) {
      categoryIdToName[category.id] = category.name
    }
  }

  // Second, fetch notes from Supabase
  const { data, error } = await supabase
    .from("notes")
    .select(`
      id,
      href,
      title,
      category_id,
      created_at
    `)
    .order("id", { ascending: true })

  if (error) {
    throw new Error(`Error fetching notes: ${error.message}`)
  }

  // Group by category using category_id
  const grouped = (data || []).reduce(
    (acc, note) => {
      const categoryName = categoryIdToName[note.category_id]

      if (categoryName) {
        if (!acc[categoryName]) {
          acc[categoryName] = []
        }
        acc[categoryName].push({
          id: note.id,
          href: note.href,
          title: note.title,
        })
      }
      return acc
    },
    {} as Record<string, Array<{ id: number; href: string; title: string }>>,
  )

  // Group notes by category and return dynamic result based on actual categories
  const result: Record<string, Array<{ id: number; href: string; title: string }>> = {}

  // Initialize all categories from the database
  if (categoriesData) {
    for (const category of categoriesData) {
      result[category.name] = grouped[category.name] || []
    }
  }

  // Ensure we always have the expected categories for the UI, even if they're empty
  return {
    articles: result.articles || [],
    websites: result.websites || [],
    tools: result.tools || [],
  }
}

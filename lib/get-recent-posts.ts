import { supabase } from "@/lib/supabase";

export type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string | null;
  category: string;
  created_at: string;
  author_name: string;
};

export async function getRecentPosts() {
  try {
    const { data: posts, error } = await supabase
      .from("posts")
      .select("id, title, slug, excerpt, cover_image, category, created_at, author_name")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(3); // Pega apenas os 3 últimos

    if (error) {
      console.error("Erro ao buscar posts recentes:", error.message);
      return [];
    }

    return posts as Post[];
  } catch (err) {
    console.error("Erro inesperado (Recent Posts):", err);
    return [];
  }
}
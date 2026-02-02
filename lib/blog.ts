import { createClient } from "@supabase/supabase-js";

// Inicializa o cliente Supabase apenas para este arquivo se necessário, 
// ou reutiliza o que você já tem em lib/supabase.ts
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author_name: string;
  category: string;
  created_at: string;
};

// Busca todos os posts publicados
export async function getAllPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar posts:", error);
    return [];
  }
  return data as Post[];
}

// Busca um post específico pelo Slug
export async function getPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Erro ao buscar post:", error);
    return null;
  }
  return data as Post;
}
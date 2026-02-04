import { supabase } from "@/lib/supabase";

export type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
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
    console.error("Erro ao buscar posts (lista):", error.message);
    return [];
  }
  
  // Filtragem de segurança: Remove posts sem slug para não quebrar o site
  return (data as Post[]).filter(post => post.slug && post.slug !== 'undefined');
}

// Busca um post específico pelo Slug
export async function getPostBySlug(slug: string) {
  // Proteção: Se o slug for inválido, nem tenta buscar
  if (!slug || slug === 'undefined' || slug === 'null') {
    return null;
  }

  const cleanSlug = decodeURIComponent(slug);

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", cleanSlug)
    .eq("published", true)
    .single();

  if (error) {
    // Código PGRST116 significa "Nenhum resultado encontrado" (não é erro de sistema)
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error(`Erro ao buscar post (slug: ${cleanSlug}):`, error.message);
    return null;
  }
  
  return data as Post;
}
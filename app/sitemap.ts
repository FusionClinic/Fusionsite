import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase"; // <--- Ajustado para o seu arquivo real

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.fusionclinic.com.br";

  // 1. Definição das Rotas Estáticas (Institucionais)
  const staticRoutes = [
    "",
    "/sobre",
    "/planos",
    "/espacos",
    "/blog",
    "/seja-anfitriao",
    "/contato",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // 2. Busca Dinâmica: Posts do Blog
  const { data: posts } = await supabase
    .from("posts")
    .select("slug, updated_at")
    .eq("published", true);

  const blogRoutes =
    posts?.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at || new Date()),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })) || [];

  // 3. Busca Dinâmica: Salas/Consultórios
  const { data: rooms } = await supabase
    .from("rooms")
    .select("id, updated_at");

  const roomRoutes =
    rooms?.map((room) => ({
      url: `${baseUrl}/espacos/${room.id}`,
      lastModified: new Date(room.updated_at || new Date()),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })) || [];

  // 4. Retorna tudo combinado
  return [...staticRoutes, ...blogRoutes, ...roomRoutes];
}
import { supabase } from "@/lib/supabase";

export interface FeaturedRoom {
  id: string;
  name: string;
  description: string;
  neighborhood: string;
  images: string[] | string;
  price_per_hour: number | null;
  price_per_shift: number | null;
  specialties: string[] | string | null;
  rating?: number;
}

// Helper para limpar JSON (igual ao que você já usa)
const safeParseJSON = (data: any) => {
  if (Array.isArray(data)) return data;
  if (typeof data === "string") {
    try {
      return JSON.parse(data);
    } catch (e) {
      return [];
    }
  }
  return [];
};

export async function getFeaturedRooms() {
  // Busca todas as salas
  const { data: rooms, error } = await supabase
    .from("rooms")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !rooms) {
    console.error("Erro ao buscar salas destaque:", error);
    return [];
  }

  // Lógica: Agrupar por especialidade principal e pegar a primeira de cada
  const featuredRooms: FeaturedRoom[] = [];
  const addedSpecialties = new Set<string>();

  for (const room of rooms) {
    // Pega a lista de especialidades da sala
    const specs = safeParseJSON(room.specialties);
    
    if (specs && specs.length > 0) {
      // Considera a primeira especialidade da lista como a "Principal"
      // Normaliza para minúsculo para evitar duplicatas (Ex: "Psicologia" e "psicologia")
      const mainSpecialty = String(specs[0]).trim().toLowerCase();

      // Se ainda não mostramos uma sala dessa especialidade, adiciona agora
      if (!addedSpecialties.has(mainSpecialty)) {
        addedSpecialties.add(mainSpecialty);
        featuredRooms.push(room as FeaturedRoom);
      }
    }
  }

  // Limita a 4 para não quebrar o layout da home, mas garante variedade
  return featuredRooms.slice(0, 4);
}
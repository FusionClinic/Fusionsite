import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SpacesFilter } from "@/components/spaces-filter";
import { MapPin, Wifi, Star, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Mostruário de Consultórios | Fusion Clinic",
  description:
    "Escolha seu consultório ideal. Filtre por especialidade, localização e modalidade.",
};

// ... (Mantenha interfaces e safeParseJSON iguais ao anterior) ...
interface Room {
  id: string;
  name: string;
  description: string;
  neighborhood: string;
  images: string[] | string;
  price_per_hour: number | null;
  price_per_shift: number | null;
  amenities: string[] | string | null;
  specialties: string[] | string | null;
  modalities: string[] | string;
  rating?: number;
}

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

async function getSpaces(searchParams: { [key: string]: string | undefined }) {
  let query = supabase
    .from("rooms")
    .select("*")
    .order("created_at", { ascending: false });

  if (searchParams.specialty && searchParams.specialty !== "all") {
    query = query.ilike("specialties", `%${searchParams.specialty}%`);
  }
  if (searchParams.modality && searchParams.modality !== "all") {
    query = query.ilike("modalities", `%${searchParams.modality}%`);
  }
  if (searchParams.neighborhood && searchParams.neighborhood !== "all") {
    query = query.eq("neighborhood", searchParams.neighborhood);
  }

  const { data, error } = await query;
  if (error) return [];
  return data as Room[];
}

const formatPrice = (val: number | null) => {
  if (!val) return null;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(val);
};

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function SpacesPage(props: Props) {
  const searchParams = await props.searchParams;
  const spaces = await getSpaces(searchParams);

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="bg-background py-12 border-b border-border/40">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Nossos Espaços
          </h1>
          <p className="text-muted-foreground">
            Encontre o ambiente perfeito para atender seus pacientes.
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SpacesFilter />

          {spaces.length === 0 ? (
            <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed border-border">
              <h3 className="text-lg font-semibold mb-2">
                Nenhum consultório encontrado.
              </h3>
              <Button asChild>
                <Link href="/espacos">Limpar Filtros</Link>
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {spaces.map((space) => {
                const images = safeParseJSON(space.images);
                const coverImage =
                  images.length > 0 ? images[0] : "/placeholder.jpg";
                const mainPrice = space.price_per_hour || space.price_per_shift;
                const priceLabel = space.price_per_hour ? "/h" : "/turno";

                return (
                  // Link envolve todo o card para melhor UX
                  <Link
                    href={`/espacos/${space.id}`}
                    key={space.id}
                    className="group block h-full"
                  >
                    <Card className="h-full border-0 shadow-none bg-transparent hover:bg-transparent">
                      {/* Imagem com Aspecto de Foto (Arredondada) */}
                      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted mb-3">
                        <Image
                          src={coverImage}
                          alt={space.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-white/90 text-black backdrop-blur shadow-sm hover:bg-white">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                            {space.rating || "5.0"}
                          </Badge>
                        </div>
                      </div>

                      <CardContent className="p-0 space-y-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-lg text-foreground truncate pr-2 group-hover:text-primary transition-colors">
                            {space.name}
                          </h3>
                          {/* Preço Compacto */}
                          <div className="text-right whitespace-nowrap">
                            <span className="font-bold text-foreground">
                              {formatPrice(mainPrice)}
                            </span>
                            <span className="text-muted-foreground font-normal text-sm">
                              {priceLabel}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center text-muted-foreground text-sm">
                          <MapPin className="w-3.5 h-3.5 mr-1" />
                          {space.neighborhood}
                        </div>

                        <div className="pt-1 flex gap-2">
                          {safeParseJSON(space.modalities).includes(
                            "hourly",
                          ) && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
                              Hora
                            </span>
                          )}
                          {safeParseJSON(space.modalities).includes(
                            "shift",
                          ) && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
                              Turno
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}

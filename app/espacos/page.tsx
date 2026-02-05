import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { SpacesFilter } from "@/components/spaces-filter";
import { MapPin, Wifi, Wind, Coffee, ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Mostruário de Consultórios | Fusion Clinic",
  description:
    "Escolha seu consultório ideal. Filtre por especialidade e localização.",
};

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

// Função Helper para buscar dentro de arrays (Case Insensitive)
const checkIncludes = (data: any, searchTerm: string) => {
  const array = safeParseJSON(data);
  const term = searchTerm.toLowerCase();
  return array.some((item: string) => item.toLowerCase().includes(term));
};

async function getSpaces(searchParams: { [key: string]: string | undefined }) {
  let query = supabase
    .from("rooms")
    .select("*")
    .order("created_at", { ascending: false });

  if (searchParams.neighborhood && searchParams.neighborhood !== "all") {
    query = query.eq("neighborhood", searchParams.neighborhood);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Erro ao buscar espaços:", error);
    return [];
  }

  let filteredData = data as Room[];

  if (searchParams.specialty && searchParams.specialty !== "all") {
    filteredData = filteredData.filter((room) =>
      checkIncludes(room.specialties, searchParams.specialty!),
    );
  }

  if (searchParams.modality && searchParams.modality !== "all") {
    filteredData = filteredData.filter((room) =>
      checkIncludes(room.modalities, searchParams.modality!),
    );
  }

  return filteredData;
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

// PREÇO DO PACOTE PROMOCIONAL (Referência)
const PROMO_PACKAGE_HOURLY_RATE = 32;

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
            Encontre o ambiente perfeito para atender seus pacientes com
            liberdade.
          </p>
        </div>
      </section>

      <section className="py-8 bg-muted/5">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SpacesFilter />

          {spaces.length === 0 ? (
            <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed border-border">
              <h3 className="text-lg font-semibold mb-2">
                Nenhum consultório encontrado com esses filtros.
              </h3>
              <p className="text-muted-foreground mb-6">
                Tente alterar a especialidade ou modalidade para ver mais
                opções.
              </p>
              <Button asChild>
                <Link href="/espacos">Ver Todos</Link>
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {spaces.map((space) => {
                const images = safeParseJSON(space.images);
                const coverImage =
                  images.length > 0 ? images[0] : "/placeholder.jpg";

                // Pega a primeira especialidade para a etiqueta
                const spaceSpecialties = safeParseJSON(space.specialties);
                const mainSpecialty =
                  spaceSpecialties.length > 0
                    ? spaceSpecialties[0]
                    : "Multidisciplinar";

                // --- LÓGICA DE PRECIFICAÇÃO ESTRATÉGICA (Cereja do Bolo 🍒) ---
                let displayPrice = 0;
                let priceLabel = "";
                let isPromo = false;

                // Se a sala tem preço por hora e ele é maior que o preço do pacote (32),
                // mostramos o preço do pacote para atrair o clique.
                if (
                  space.price_per_hour &&
                  space.price_per_hour > PROMO_PACKAGE_HOURLY_RATE
                ) {
                  displayPrice = PROMO_PACKAGE_HOURLY_RATE;
                  priceLabel = "/h";
                  isPromo = true;
                } else {
                  // Caso contrário (ou se for só turno), mostra o preço normal
                  displayPrice =
                    space.price_per_hour || space.price_per_shift || 0;
                  priceLabel = space.price_per_hour ? "/h" : "/turno";
                }

                return (
                  <Link
                    href={`/espacos/${space.id}`}
                    key={space.id}
                    className="group block h-full"
                  >
                    <Card className="h-full border border-border/60 shadow-sm bg-card hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col overflow-hidden rounded-2xl relative">
                      {/* Container da Imagem */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                        <Image
                          src={coverImage}
                          alt={space.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* TAG DE ESPECIALIDADE */}
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-black/70 text-white backdrop-blur-md border-0 font-medium px-3 py-1">
                            {mainSpecialty}
                          </Badge>
                        </div>

                        {/* TAG "OPORTUNIDADE" SE FOR PREÇO DE PACOTE */}
                        {isPromo && (
                          <div className="absolute top-3 right-3 animate-pulse">
                            <Badge className="bg-amber-500 hover:bg-amber-600 text-white border-0 font-bold px-2 py-1 shadow-lg flex items-center gap-1">
                              <Sparkles className="w-3 h-3 fill-current" />
                              Oportunidade
                            </Badge>
                          </div>
                        )}

                        {/* TAG DE BAIRRO */}
                        <div className="absolute bottom-3 left-3">
                          <div className="flex items-center gap-1 text-[10px] font-bold bg-white/90 text-black px-2 py-1 rounded-full shadow-sm">
                            <MapPin className="w-3 h-3 text-primary" />
                            {space.neighborhood}
                          </div>
                        </div>
                      </div>

                      <CardContent className="p-5 flex-1 space-y-3">
                        <div>
                          <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
                            {space.name}
                          </h3>
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                            {space.description ||
                              "Ambiente preparado para atendimentos de alto padrão."}
                          </p>
                        </div>

                        {/* Ícones de Infraestrutura */}
                        <div className="flex items-center gap-4 py-2 border-t border-border/50 border-b">
                          <div
                            className="flex items-center gap-1.5 text-muted-foreground"
                            title="Wi-Fi Incluso"
                          >
                            <Wifi className="w-4 h-4" />
                            <span className="text-[10px] uppercase font-semibold">
                              Wi-Fi
                            </span>
                          </div>
                          <div
                            className="flex items-center gap-1.5 text-muted-foreground"
                            title="Climatizado"
                          >
                            <Wind className="w-4 h-4" />
                            <span className="text-[10px] uppercase font-semibold">
                              Ar
                            </span>
                          </div>
                          <div
                            className="flex items-center gap-1.5 text-muted-foreground"
                            title="Recepção"
                          >
                            <Coffee className="w-4 h-4" />
                            <span className="text-[10px] uppercase font-semibold">
                              Copa
                            </span>
                          </div>
                        </div>
                      </CardContent>

                      <CardFooter className="p-5 pt-0 mt-auto flex items-center justify-between gap-2">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                            {isPromo ? "Planos a partir de" : "Valor"}
                          </span>
                          <div className="flex items-baseline gap-1">
                            <span
                              className={`font-extrabold text-foreground ${isPromo ? "text-amber-600 text-2xl" : "text-xl"}`}
                            >
                              {formatPrice(displayPrice)}
                            </span>
                            <span className="text-xs text-muted-foreground font-medium">
                              {priceLabel}
                            </span>
                          </div>
                        </div>

                        <Button
                          size="sm"
                          className={`rounded-xl font-bold transition-colors ${isPromo ? "bg-amber-100 text-amber-700 hover:bg-amber-200" : "bg-primary/10 text-primary hover:bg-primary hover:text-white"}`}
                        >
                          Ver Sala <ArrowRight className="ml-1 w-3 h-3" />
                        </Button>
                      </CardFooter>
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

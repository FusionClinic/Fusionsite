import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Wifi,
  CheckCircle2,
  Star,
  ShieldCheck,
  Clock,
  ArrowRight,
  Check,
  ChevronRight,
  Home,
  Crown,
  Sparkles,
  TrendingDown,
  ExternalLink,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// --- Tipagem e Helpers ---
interface Room {
  id: string;
  name: string;
  description: string;
  neighborhood: string;
  address: string;
  images: string[] | string;
  price_per_hour: number | null;
  price_per_shift: number | null;
  amenities: string[] | string | null;
  specialties: string[] | string | null;
  modalities: string[] | string;
  rating?: number;
  size?: number; // m²
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

const formatMoney = (val: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    val,
  );

// --- Fetch de Dados ---
async function getRoom(id: string) {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return data as Room;
}

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const room = await getRoom(params.id);
  if (!room) return { title: "Sala não encontrada | Fusion Clinic" };

  return {
    title: `${room.name} | Aluguel de Consultório em ${room.neighborhood}`,
    description: `Alugue este consultório por hora em ${room.neighborhood}, Natal. Ideal para ${safeParseJSON(room.specialties).join(", ")}. Estrutura completa e sem burocracia.`,
    openGraph: {
      images: safeParseJSON(room.images)[0] || "/placeholder.jpg",
    },
  };
}

// --- Componente Principal ---
export default async function RoomDetailsPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const room = await getRoom(params.id);

  if (!room) return notFound();

  // Tratamento de dados
  const images = safeParseJSON(room.images);
  const amenities = safeParseJSON(room.amenities);
  const specialties = safeParseJSON(room.specialties);
  const displayImages = images.length > 0 ? images : ["/placeholder.jpg"];
  const mainPrice = room.price_per_hour || room.price_per_shift || 0;

  // --- ESTRATÉGIA DE PRECIFICAÇÃO ---
  const PACKAGE_PRICE = 320; // Valor fixo do pacote
  const PACKAGE_SAVINGS = 130; // Valor da economia
  const PACKAGE_HOURLY_RATE = 32; // Valor por hora no pacote

  // NÚMERO DO WHATSAPP
  const WHATSAPP_NUMBER = "5511911199054";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: room.name,
    image: displayImages,
    description: room.description,
    sku: room.id,
    brand: {
      "@type": "Brand",
      name: "Fusion Clinic",
    },
    offers: {
      "@type": "Offer",
      url: `https://fusionclinic.com.br/espacos/${room.id}`,
      priceCurrency: "BRL",
      price: mainPrice,
      priceValidUntil: "2026-12-31",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: room.rating || "5",
      reviewCount: "12",
    },
  };

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      {/* Breadcrumbs */}
      <div className="bg-muted/30 border-b border-border/40">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-3">
          <nav className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 opacity-50" />
            <Link
              href="/espacos"
              className="hover:text-primary transition-colors"
            >
              Consultórios
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 opacity-50" />
            <span className="text-foreground font-medium truncate max-w-[200px]">
              {room.name}
            </span>
          </nav>
        </div>
      </div>

      {/* 1. Galeria de Fotos - AJUSTADA PARA QUADRADO/VERTICAL */}
      <section className="bg-muted/10 pt-6 pb-8">
        <div className="mx-auto max-w-7xl px-0 lg:px-8">
          <Carousel className="w-full relative group">
            <CarouselContent>
              {displayImages.map((img: string, index: number) => (
                <CarouselItem
                  key={index}
                  className="basis-full md:basis-1/2 lg:basis-2/3 pl-4"
                >
                  <div className="relative aspect-square md:aspect-[4/3] overflow-hidden rounded-xl md:rounded-3xl border border-border/50 shadow-sm bg-muted">
                    <Image
                      src={img}
                      alt={`${room.name} - Foto ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 33vw"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity">
              <CarouselPrevious className="left-12 h-10 w-10 border-primary/20 hover:bg-primary hover:text-white" />
              <CarouselNext className="right-12 h-10 w-10 border-primary/20 hover:bg-primary hover:text-white" />
            </div>
          </Carousel>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 lg:px-8 py-8 grid lg:grid-cols-[1.5fr_1fr] gap-12 items-start">
        {/* === COLUNA DA ESQUERDA === */}
        <div className="space-y-8">
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1 text-sm"
              >
                <MapPin className="w-3 h-3 mr-1" />
                {room.neighborhood}
              </Badge>
              {specialties.map((s: string) => (
                <Badge key={s} variant="outline" className="capitalize">
                  {s}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              {room.name}
            </h1>

            <p className="text-muted-foreground text-lg mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              {room.address || "Endereço sob consulta em Natal - RN"}
            </p>

            <Separator />

            {/* Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6">
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  Tamanho
                </span>
                <p className="font-bold text-lg">
                  {room.size ? `${room.size}m²` : "Padrão"}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  Avaliação
                </span>
                <div className="flex items-center gap-1 font-bold text-lg">
                  {room.rating || 5.0}
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  Internet
                </span>
                <p className="font-bold text-lg text-green-600">Liberada</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  Incluso
                </span>
                <p className="font-bold text-lg">Limpeza</p>
              </div>
            </div>

            <Separator />
          </div>

          <div className="prose prose-stone dark:prose-invert max-w-none">
            <h3 className="text-xl font-bold mb-3 text-foreground">
              Sobre este espaço
            </h3>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-base">
              {room.description}
            </p>
          </div>

          {/* Amenities */}
          <div className="bg-muted/30 p-6 rounded-2xl border border-border/50">
            <h3 className="text-xl font-bold mb-6 text-foreground">
              Comodidades Inclusas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
              {amenities.map((item: string) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="mt-1">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <span className="capitalize text-foreground/80 font-medium">
                    {item}
                  </span>
                </div>
              ))}
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Wifi className="w-5 h-5 text-primary" />
                </div>
                <span className="text-foreground/80 font-medium">
                  Wi-Fi Corporativo
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <span className="text-foreground/80 font-medium">
                  Segurança Monitorada
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* === COLUNA DA DIREITA: BOOKING (NOVO CTA DE PACOTE) === */}
        <div className="relative h-full">
          <div className="sticky top-24">
            <Card className="border-0 shadow-2xl overflow-hidden ring-1 ring-border/50">
              <div className="bg-muted p-4 text-center border-b border-border/50">
                <p className="text-sm font-bold text-muted-foreground flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4" />
                  Reserve online ou via WhatsApp
                </p>
              </div>

              <CardContent className="p-6 space-y-4">
                {/* 1. OPÇÃO PACOTE (DESTACADA E FIXA) */}
                <div className="relative group cursor-pointer transition-all hover:scale-[1.02]">
                  {/* Borda Gradient Dourada */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-xl opacity-75 blur-[2px] group-hover:opacity-100 transition duration-200"></div>

                  <div className="relative bg-background p-4 rounded-xl border border-amber-200 dark:border-amber-900/50">
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg shadow-sm flex items-center gap-1">
                      <Crown className="w-3 h-3 fill-current" />
                      MAIS VENDIDO
                    </div>

                    <div className="mb-2">
                      <span className="text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Pacote Flex 10h
                      </span>
                    </div>

                    <div className="flex items-end justify-between mb-1">
                      <div>
                        <span className="block text-3xl font-extrabold text-foreground tracking-tight">
                          {formatMoney(PACKAGE_PRICE)}
                        </span>
                        <span className="text-xs text-muted-foreground font-medium">
                          Válido por 30 dias
                        </span>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-700 dark:bg-green-900/30 hover:bg-green-100 border-0 mb-1"
                        >
                          Economize {formatMoney(PACKAGE_SAVINGS)}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-900/10 px-2 py-1 rounded w-fit mb-4">
                      <TrendingDown className="w-3 h-3" />
                      Sai a {formatMoney(PACKAGE_HOURLY_RATE)}/hora
                    </div>

                    <Separator className="my-3 bg-amber-100 dark:bg-amber-900/30" />

                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white border-0 font-bold shadow-md shadow-orange-500/20 h-10 text-base"
                      asChild
                    >
                      <Link
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Tenho interesse no *Pacote de 10 Horas* (R$ 320) para a sala ${room.name}. Como funciona?`}
                        target="_blank"
                      >
                        Quero este Pacote
                        <ArrowRight className="ml-1 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* 2. OPÇÕES CLICÁVEIS AGORA */}
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-bold text-muted-foreground uppercase text-center mb-2">
                    Ou pague avulso
                  </p>

                  {room.price_per_hour && (
                    <Link
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Tenho interesse na *Hora Avulsa* para a sala ${room.name}. Qual a disponibilidade?`}
                      target="_blank"
                      className="group flex justify-between items-center p-3 rounded-lg border border-border hover:bg-muted/50 hover:border-primary/30 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium group-hover:text-primary transition-colors">
                          Hora Avulsa
                        </span>
                        <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <span className="font-bold">
                        {formatMoney(room.price_per_hour)}
                      </span>
                    </Link>
                  )}

                  {room.price_per_shift && (
                    <Link
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Tenho interesse no *Turno de 4h* para a sala ${room.name}. Qual a disponibilidade?`}
                      target="_blank"
                      className="group flex justify-between items-center p-3 rounded-lg border border-border hover:bg-muted/50 hover:border-primary/30 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium group-hover:text-primary transition-colors">
                          Turno (4h)
                        </span>
                        <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-right leading-none">
                        <span className="font-bold block">
                          {formatMoney(room.price_per_shift)}
                        </span>
                        <span className="text-[10px] text-green-600 font-bold">
                          -20% OFF
                        </span>
                      </div>
                    </Link>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-border/50 text-center">
                  <p className="text-xs text-muted-foreground mb-3">
                    Prefere personalizar?
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-primary/20 hover:bg-primary/5 hover:text-primary"
                    asChild
                  >
                    <Link
                      href={`https://wa.me/${WHATSAPP_NUMBER}`}
                      className="font-bold"
                      target="_blank"
                    >
                      Falar com Consultor
                    </Link>
                  </Button>
                </div>

                {/* Garantias */}
                <div className="bg-muted/30 p-4 rounded-xl space-y-2 mt-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Check className="w-3 h-3 text-green-500" />
                    Sem fiador ou burocracia
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Check className="w-3 h-3 text-green-500" />
                    Sala climatizada e pronta
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mobile Floating CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-xl border-t border-border/50 lg:hidden z-50 pb-8">
        <div className="flex gap-4 items-center max-w-md mx-auto">
          <div className="flex-1">
            <span className="text-[10px] text-muted-foreground block uppercase font-bold tracking-wider">
              Pacote Flex 10 horas
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-extrabold text-xl text-amber-600">
                {formatMoney(PACKAGE_PRICE)}
              </span>
              <span className="text-[10px] text-muted-foreground line-through decoration-red-500">
                {formatMoney(PACKAGE_PRICE + PACKAGE_SAVINGS)}
              </span>
            </div>
          </div>
          <Button
            className="flex-[1.5] h-12 rounded-xl font-bold shadow-lg bg-gradient-to-r from-amber-600 to-orange-600 text-white"
            asChild
          >
            <Link
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá, tenho interesse no pacote de 10h (R$ 320) da sala ${room.name}`}
            >
              Garantir Pacote
            </Link>
          </Button>
        </div>
      </div>

      <Footer />
    </main>
  );
}

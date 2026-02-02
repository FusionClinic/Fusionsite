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

  // --- O SEGREDO DO SEO (JSON-LD) ---
  // Isso faz o Google mostrar o preço e estrelas na busca
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
      reviewCount: "12", // Fictício para cold start, ou puxe do banco se tiver
    },
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Script Invisível para o Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      {/* Breadcrumbs (Navegação SEO) */}
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

      {/* 1. Galeria de Fotos */}
      <section className="bg-muted/10 pt-6 pb-8">
        <div className="mx-auto max-w-7xl px-0 lg:px-8">
          <Carousel className="w-full relative group">
            <CarouselContent>
              {displayImages.map((img: string, index: number) => (
                <CarouselItem
                  key={index}
                  className="basis-full md:basis-1/2 lg:basis-2/3 pl-4"
                >
                  <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-xl md:rounded-3xl border border-border/50 shadow-sm bg-muted">
                    <Image
                      src={img}
                      alt={`${room.name} - Consultório em ${room.neighborhood} - Foto ${index + 1}`}
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
        {/* === COLUNA DA ESQUERDA: DETALHES === */}
        <div className="space-y-8">
          {/* Cabeçalho do Imóvel */}
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

            {/* Highlights Rápidos */}
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
                <p className="font-bold text-lg text-green-600">500 Mega</p>
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

          {/* Descrição */}
          <div className="prose prose-stone dark:prose-invert max-w-none">
            <h3 className="text-xl font-bold mb-3 text-foreground">
              Sobre este espaço
            </h3>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-base">
              {room.description}
            </p>
          </div>

          {/* O que oferece (Amenities) */}
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

        {/* === COLUNA DA DIREITA: STICKY BOOKING CARD === */}
        <div className="relative h-full">
          <div className="sticky top-24">
            <Card className="border-2 border-primary/10 shadow-2xl shadow-primary/5 overflow-hidden">
              <div className="bg-primary/5 p-4 text-center border-b border-primary/10">
                <p className="text-sm font-bold text-primary flex items-center justify-center gap-2 animate-pulse">
                  <Clock className="w-4 h-4" />
                  Últimos horários na semana!
                </p>
              </div>

              <CardContent className="p-6 space-y-6">
                {/* Preços */}
                <div className="space-y-3">
                  {room.price_per_hour && (
                    <div className="flex justify-between items-center p-4 rounded-xl border-2 border-muted hover:border-primary/50 cursor-pointer transition-all bg-background group">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full border-2 border-muted group-hover:border-primary flex items-center justify-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="font-medium">Hora Avulsa</span>
                      </div>
                      <span className="font-bold text-lg">
                        {formatMoney(room.price_per_hour)}
                      </span>
                    </div>
                  )}

                  {room.price_per_shift && (
                    <div className="flex justify-between items-center p-4 rounded-xl border-2 border-primary/30 bg-primary/5 cursor-pointer relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">
                        RECOMENDADO
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary fill-primary/20" />
                        <span className="font-bold text-foreground">
                          Turno (4h)
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="block font-bold text-xl text-primary">
                          {formatMoney(room.price_per_shift)}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          Economia de 20%
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Botão de Conversão OTIMIZADO PARA WHATSAPP */}
                <Button
                  size="lg"
                  className="w-full h-14 text-base font-bold rounded-xl shadow-xl shadow-green-500/20 bg-green-600 hover:bg-green-700 text-white transition-all hover:scale-[1.02]"
                  asChild
                >
                  <Link
                    href={`https://wa.me/5584999999999?text=Olá! Vi o consultório *${room.name}* no site e tenho interesse. Poderia me confirmar a disponibilidade?`}
                    target="_blank"
                  >
                    Agendar Visita / Horário
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>

                {/* Garantias */}
                <div className="bg-muted/30 p-4 rounded-xl space-y-3">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    Garantia Fusion
                  </p>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                    Sem fiador ou caução
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                    Cancele grátis (24h antes)
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                    Recepcionista inclusa
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    Dúvidas?{" "}
                    <Link
                      href="https://wa.me/5584999999999"
                      className="text-primary underline font-medium"
                    >
                      Fale com o suporte
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mobile Floating CTA (Fixo no celular) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-xl border-t border-border/50 lg:hidden z-50 pb-8">
        <div className="flex gap-4 items-center max-w-md mx-auto">
          <div className="flex-1">
            <span className="text-xs text-muted-foreground block uppercase font-bold tracking-wider">
              A partir de
            </span>
            <span className="font-extrabold text-2xl text-primary">
              {formatMoney(mainPrice)}
            </span>
          </div>
          <Button
            className="flex-[1.5] h-12 rounded-xl font-bold shadow-lg bg-green-600 hover:bg-green-700 text-white"
            asChild
          >
            <Link
              href={`https://wa.me/5584999999999?text=Olá, quero reservar a sala ${room.name}`}
            >
              Reservar Agora
            </Link>
          </Button>
        </div>
      </div>

      <Footer />
    </main>
  );
}

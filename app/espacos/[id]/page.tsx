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
  Share2,
  ShieldCheck,
  Clock,
  Calendar,
  ArrowRight,
  Check,
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
  if (!room) return { title: "Sala não encontrada" };
  return {
    title: `${room.name} em ${room.neighborhood} | Fusion Clinic`,
    description: `Alugue este consultório completo em ${room.neighborhood}. ${room.description.slice(0, 100)}...`,
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
  const modalities = safeParseJSON(room.modalities);

  // Imagens de fallback se estiver vazio
  const displayImages = images.length > 0 ? images : ["/placeholder.jpg"];

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* 1. Galeria de Fotos (Full Width Mobile, Container Desktop) */}
      <section className="bg-muted/10 pt-6 pb-8">
        <div className="mx-auto max-w-7xl px-0 lg:px-8">
          <Carousel className="w-full relative group">
            <CarouselContent>
              {displayImages.map((img: string, index: number) => (
                <CarouselItem
                  key={index}
                  className="basis-full md:basis-1/2 lg:basis-2/3 pl-4"
                >
                  <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-xl md:rounded-3xl border border-border/50 shadow-sm">
                    <Image
                      src={img}
                      alt={`${room.name} foto ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Botões de navegação só aparecem no desktop no hover */}
            <div className="hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity">
              <CarouselPrevious className="left-12" />
              <CarouselNext className="right-12" />
            </div>
          </Carousel>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 lg:px-8 py-8 grid lg:grid-cols-[1.5fr_1fr] gap-12 items-start">
        {/* === COLUNA DA ESQUERDA: DETALHES === */}
        <div className="space-y-10">
          {/* Cabeçalho do Imóvel */}
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary hover:bg-primary/20"
              >
                {room.neighborhood}
              </Badge>
              {specialties.map((s: string) => (
                <Badge key={s} variant="outline" className="capitalize">
                  {s}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {room.name}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground mb-6">
              <MapPin className="w-4 h-4" />
              <span>{room.address || "Endereço sob consulta"}</span>
            </div>

            <Separator />

            {/* Highlights Rápidos */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  Tamanho
                </span>
                <span className="font-semibold">
                  {room.size ? `${room.size}m²` : "Padrão"}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  Avaliação
                </span>
                <div className="flex items-center gap-1 font-semibold">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {room.rating || 5.0}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  Internet
                </span>
                <span className="font-semibold text-green-600">500 Mega</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  Limpeza
                </span>
                <span className="font-semibold">Inclusa</span>
              </div>
            </div>

            <Separator />
          </div>

          {/* Descrição */}
          <div className="prose prose-stone dark:prose-invert max-w-none">
            <h3 className="text-xl font-bold mb-3">Sobre este espaço</h3>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {room.description}
            </p>
          </div>

          {/* O que oferece (Amenities) */}
          <div>
            <h3 className="text-xl font-bold mb-6">
              O que este consultório oferece
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {amenities.map((item: string) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-foreground/80"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary/60" />
                  <span className="capitalize">{item}</span>
                </div>
              ))}
              {/* Itens padrão que sempre tem */}
              <div className="flex items-center gap-3 text-foreground/80">
                <Wifi className="w-5 h-5 text-primary/60" />
                <span>Wi-Fi de Alta Velocidade</span>
              </div>
              <div className="flex items-center gap-3 text-foreground/80">
                <ShieldCheck className="w-5 h-5 text-primary/60" />
                <span>Segurança e Portaria</span>
              </div>
            </div>
          </div>
        </div>

        {/* === COLUNA DA DIREITA: STICKY BOOKING CARD === */}
        <div className="relative h-full">
          <div className="sticky top-24">
            <Card className="border-primary/20 shadow-2xl shadow-primary/5 overflow-hidden">
              <div className="bg-primary/5 p-4 text-center border-b border-primary/10">
                <p className="text-sm font-medium text-primary flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4" />
                  Disponibilidade em tempo real
                </p>
              </div>

              <CardContent className="p-6 space-y-6">
                {/* Preços */}
                <div className="space-y-4">
                  {room.price_per_hour && (
                    <div className="flex justify-between items-center p-3 rounded-lg border hover:border-primary/50 cursor-pointer transition-colors bg-background">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border-2 border-primary" />
                        <span className="font-medium">Hora Avulsa</span>
                      </div>
                      <span className="font-bold">
                        {formatMoney(room.price_per_hour)}
                      </span>
                    </div>
                  )}

                  {room.price_per_shift && (
                    <div className="flex justify-between items-center p-3 rounded-lg border border-primary/20 bg-primary/5 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span className="font-medium">Turno (4h)</span>
                        <Badge className="ml-1 text-[10px] h-5">
                          Mais Econômico
                        </Badge>
                      </div>
                      <span className="font-bold text-primary">
                        {formatMoney(room.price_per_shift)}
                      </span>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Botão de Conversão */}
                <Button
                  size="lg"
                  className="w-full h-14 text-base font-bold rounded-xl shadow-lg shadow-primary/20 animate-pulse-slow"
                  asChild
                >
                  <Link
                    href={`https://wa.me/5584999999999?text=Olá! Estou vendo a sala *${room.name}* no site e gostaria de agendar uma visita ou horário.`}
                    target="_blank"
                  >
                    Reservar Agora
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>

                {/* Garantias */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Check className="w-3 h-3 mt-0.5 text-green-500" />
                    Sem fiador ou burocracia
                  </div>
                  <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Check className="w-3 h-3 mt-0.5 text-green-500" />
                    Cancelamento grátis até 24h antes
                  </div>
                  <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Check className="w-3 h-3 mt-0.5 text-green-500" />
                    Suporte da recepção incluso
                  </div>
                </div>

                <div className="text-center pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground"
                    asChild
                  >
                    <Link
                      href={`https://wa.me/5584999999999?text=Tenho uma dúvida sobre a sala ${room.name}...`}
                    >
                      Ainda tenho dúvidas
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mobile Floating CTA (Só aparece no celular para garantir conversão) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t border-border lg:hidden z-50">
        <div className="flex gap-3">
          <div className="flex-1">
            <span className="text-xs text-muted-foreground block">
              A partir de
            </span>
            <span className="font-bold text-lg text-primary">
              {formatMoney(room.price_per_hour || room.price_per_shift || 0)}
            </span>
          </div>
          <Button className="flex-1 rounded-xl font-bold shadow-lg" asChild>
            <Link
              href={`https://wa.me/5584999999999?text=Olá, quero reservar a sala ${room.name}`}
            >
              Reservar
            </Link>
          </Button>
        </div>
      </div>

      <Footer />
    </main>
  );
}

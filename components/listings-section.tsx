"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image"; // CRÍTICO: Importando componente de imagem otimizado
import {
  Eye,
  MapPin,
  Clock,
  Wifi,
  Star,
  Car,
  Coffee,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion-wrapper";

// DADOS ATUALIZADOS PARA O MERCADO DE NATAL - RN
const listings = [
  {
    id: 1,
    title: "Consultório Odonto Premium",
    description:
      "Cadeira Gnatus, Raio-X e autoclave inclusos. Pronto para atender.",
    fullDescription:
      "Consultório odontológico de alto padrão no coração do Tirol. Equipado com cadeira de última geração, fotopolimerizador, ultrassom e profi. A esterilização é centralizada e inclusa no valor.",
    image:
      "https://images.unsplash.com/photo-1629909615184-74f495363b67?w=800&h=600&fit=crop&q=80",
    priceHour: "R$ 55", // Levemente mais caro por ser odonto
    priceShift: "R$ 180",
    location: "Tirol, Natal",
    rating: 5.0,
    reviews: 42,
    amenities: ["Raio-X", "Autoclave", "Recepção", "Estacionamento"],
  },
  {
    id: 2,
    title: "Sala de Psicologia / Terapia",
    description:
      "Isolamento acústico total, poltronas reclináveis e vista mar.",
    fullDescription:
      "Espaço projetado para acolhimento. Possui isolamento acústico certificado, iluminação dimerizável e decoração neutra. Ideal para psicólogos, psicanalistas e terapeutas ocupacionais.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&q=80",
    priceHour: "R$ 45",
    priceShift: "R$ 140",
    location: "Petrópolis, Natal",
    rating: 4.9,
    reviews: 89,
    amenities: ["Isolamento Acústico", "Wi-Fi 5G", "Copa", "Vista Mar"],
  },
  {
    id: 3,
    title: "Consultório Médico Geral",
    description:
      "Maca elétrica, negatoscópio e banheiro privativo para o paciente.",
    fullDescription:
      "Perfeito para Clínicos, Nutricionistas e Dermatologistas. Maca com regulagem elétrica, balança antropométrica digital e área de exame separada da mesa de atendimento.",
    image:
      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop&q=80",
    priceHour: "R$ 45",
    priceShift: "R$ 140",
    location: "Lagoa Nova, Natal",
    rating: 4.8,
    reviews: 156,
    amenities: ["Maca Elétrica", "Recepção", "Acessibilidade", "Café"],
  },
  {
    id: 4,
    title: "Sala de Estética Facial",
    description:
      "Iluminação profissional (Ring Light), mocho e carrinho auxiliar.",
    fullDescription:
      "Sala otimizada para Harmonização Facial e Botox. Pia com acionamento por pedal, lixo infectante recolhido diariamente e cadeira específica para procedimentos faciais.",
    image:
      "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=800&h=600&fit=crop&q=80",
    priceHour: "R$ 50",
    priceShift: "R$ 160",
    location: "Candelária, Natal",
    rating: 5.0,
    reviews: 28,
    amenities: ["Iluminação LED", "Pia Clínica", "Expurgo", "Wi-Fi"],
  },
];

type Listing = (typeof listings)[number];

export function ListingsSection() {
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleQuickView = (listing: Listing) => {
    setSelectedListing(listing);
    setSheetOpen(true);
  };

  return (
    <section id="consultorios" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <FadeInUp>
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="mb-4 rounded-full border-primary/20 bg-primary/5 px-4 py-1.5"
            >
              <span className="text-sm font-medium text-primary flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Unidades em Natal - RN
              </span>
            </Badge>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              Escolha Seu Espaço{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Fusion Clinic
              </span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Estruturas prontas para atender no Tirol, Petrópolis e Lagoa Nova.
            </p>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {listings.map((listing) => (
            <StaggerItem key={listing.id}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="h-full"
              >
                <Card className="group relative h-full overflow-hidden border-0 bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all rounded-2xl">
                  {/* Container da Imagem Otimizado */}
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <Image
                      src={listing.image || "/placeholder.svg"}
                      alt={`Aluguel de ${listing.title} em ${listing.location}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                    {/* Quick View Button */}
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ scale: 1.1 }}
                      className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-card/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all shadow-lg z-10"
                      onClick={() => handleQuickView(listing)}
                      aria-label="Ver detalhes rápidos"
                    >
                      <Eye className="h-4 w-4 text-foreground" />
                    </motion.button>

                    {/* Rating Badge */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-2 py-1 border border-white/10">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium text-white">
                        {listing.rating}
                      </span>
                    </div>
                  </div>

                  <CardContent className="p-5 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-1">
                        {listing.title}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                        <MapPin className="h-3 w-3 text-primary" />
                        <span>{listing.location}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 min-h-[40px]">
                        {listing.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                      <div>
                        <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                          {listing.priceHour}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {" "}
                          /hora
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-foreground">
                          {listing.priceShift}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {" "}
                          /turno
                        </span>
                      </div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outline"
                        onClick={() => handleQuickView(listing)}
                        className="w-full rounded-xl border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-all bg-primary/5"
                      >
                        Ver Detalhes
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeInUp delay={0.4}>
          <div className="mt-12 text-center">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                asChild
                className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-xl shadow-primary/25 h-12 px-8 cursor-pointer"
              >
                <a href="/espacos">
                  <span className="relative z-10">
                    Ver Todos os Consultórios
                  </span>
                </a>
              </Button>
            </motion.div>
          </div>
        </FadeInUp>
      </div>

      {/* Quick View Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-full max-w-lg overflow-y-auto bg-background/95 backdrop-blur-xl border-l border-border/50">
          {selectedListing && (
            <>
              <SheetHeader className="text-left space-y-2">
                <SheetTitle className="text-2xl font-bold text-balance">
                  {selectedListing.title}
                </SheetTitle>
                <SheetDescription className="flex items-center gap-1 text-primary font-medium">
                  <MapPin className="h-4 w-4" />
                  {selectedListing.location}
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                <div className="relative h-64 overflow-hidden rounded-2xl border border-border/50 shadow-sm">
                  <Image
                    src={selectedListing.image || "/placeholder.svg"}
                    alt={selectedListing.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-background/90 backdrop-blur-sm px-3 py-1.5 shadow-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold">
                      {selectedListing.rating}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({selectedListing.reviews} avaliações)
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    Sobre o espaço
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedListing.fullDescription}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-foreground mb-3">
                    O que oferece
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedListing.amenities.map((amenity) => (
                      <Badge
                        key={amenity}
                        variant="secondary"
                        className="rounded-lg px-3 py-1 bg-muted hover:bg-muted-foreground/10"
                      >
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-5 rounded-2xl bg-primary/5 border border-primary/10">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">
                      Hora Avulsa
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {selectedListing.priceHour}
                    </p>
                  </div>
                  <div className="h-10 w-px bg-primary/20" />
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">
                      Turno (4h)
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {selectedListing.priceShift}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    className="w-full h-12 rounded-xl text-base font-bold shadow-lg shadow-primary/20"
                    asChild
                  >
                    <a
                      href={`https://wa.me/5584999999999?text=Olá! Gostaria de agendar o espaço *${selectedListing.title}* em ${selectedListing.location}.`}
                      target="_blank"
                    >
                      Agendar Visita
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full rounded-xl"
                    onClick={() => setSheetOpen(false)}
                  >
                    Continuar Explorando
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </section>
  );
}

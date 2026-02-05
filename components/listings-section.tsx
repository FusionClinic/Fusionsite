"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Star,
  ArrowRight,
  LayoutGrid,
  Eye,
  Brain,
  Apple,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FeaturedRoom } from "@/lib/get-featured-rooms";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion-wrapper";

// Helper para parsear imagens
const getImageSrc = (images: string | string[]) => {
  if (Array.isArray(images) && images.length > 0) return images[0];
  if (typeof images === "string") {
    try {
      const parsed = JSON.parse(images);
      return Array.isArray(parsed) && parsed.length > 0
        ? parsed[0]
        : "/placeholder.jpg";
    } catch {
      return "/placeholder.jpg";
    }
  }
  return "/placeholder.jpg";
};

// Helper para pegar a especialidade principal
const getMainSpecialty = (specialties: string | string[] | null) => {
  if (Array.isArray(specialties) && specialties.length > 0)
    return specialties[0];
  if (typeof specialties === "string") {
    try {
      const parsed = JSON.parse(specialties);
      return Array.isArray(parsed) && parsed.length > 0
        ? parsed[0]
        : "Consultório";
    } catch {
      return "Consultório";
    }
  }
  return "Consultório";
};

interface ListingsSectionProps {
  rooms?: FeaturedRoom[];
}

const categories = [
  {
    id: "psi",
    label: "Psicologia & Mente",
    icon: Brain,
    href: "/espacos?cat=psi",
  },
  {
    id: "nutri",
    label: "Nutrição & Bem-estar",
    icon: Apple,
    href: "/espacos?cat=nutri",
  },
  {
    id: "estetica",
    label: "Estética Avançada",
    icon: Sparkles,
    href: "/espacos?cat=estetica",
  },
  {
    id: "geral",
    label: "Saúde Integrada",
    icon: Stethoscope,
    href: "/espacos",
  },
];

export function ListingsSection({ rooms = [] }: ListingsSectionProps) {
  if (!rooms || rooms.length === 0) return null;

  return (
    <section id="consultorios" className="py-24 bg-background relative">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <FadeInUp>
          <div className="text-center mb-12">
            <Badge
              variant="outline"
              className="mb-4 rounded-full border-orange-500/20 bg-orange-500/5 px-4 py-1.5"
            >
              <span className="text-sm font-medium text-orange-700 dark:text-orange-400 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Unidades Premium em Natal
              </span>
            </Badge>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              O Espaço Perfeito para <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-orange-700 via-orange-600 to-amber-600 bg-clip-text text-transparent">
                Sua Especialidade
              </span>
            </h2>
          </div>
        </FadeInUp>

        {/* Filtros Visuais de Nicho */}
        <FadeInUp delay={0.1}>
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((cat) => (
              <Link key={cat.id} href={cat.href}>
                <div className="group flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-card hover:border-orange-500/50 hover:bg-orange-50 dark:hover:bg-orange-950/20 transition-all cursor-pointer shadow-sm hover:shadow-md">
                  <cat.icon className="w-4 h-4 text-muted-foreground group-hover:text-orange-600 transition-colors" />
                  <span className="text-sm font-medium text-foreground group-hover:text-orange-700 dark:group-hover:text-orange-400 transition-colors">
                    {cat.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </FadeInUp>

        <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {rooms.map((room) => {
            const coverImage = getImageSrc(room.images);
            const mainSpecialty = getMainSpecialty(room.specialties);
            const price = room.price_per_hour
              ? `R$ ${room.price_per_hour}`
              : room.price_per_shift
                ? `R$ ${room.price_per_shift}`
                : "Sob Consulta";
            const priceLabel = room.price_per_hour ? "/hora" : "/turno";

            return (
              <StaggerItem key={room.id}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="h-full"
                >
                  <Card className="group relative h-full flex flex-col overflow-hidden border border-border/60 bg-card shadow-lg hover:shadow-xl hover:shadow-orange-500/10 transition-all rounded-[24px]">
                    {/* Imagem */}
                    <div className="relative h-56 overflow-hidden bg-muted">
                      <Image
                        src={coverImage}
                        alt={`Consultório de ${mainSpecialty} em ${room.neighborhood} - Fusion Clinic`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

                      {/* Tag de Especialidade - Agora com design premium */}
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white/95 backdrop-blur-md text-orange-950 hover:bg-white shadow-lg font-bold border-0 px-3 py-1">
                          {mainSpecialty}
                        </Badge>
                      </div>

                      {/* Rating Badge */}
                      <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-black/40 backdrop-blur-md px-2.5 py-1 border border-white/20">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-white">
                          5.0
                        </span>
                      </div>

                      {/* Preço sobre a imagem para impacto */}
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="text-xs font-medium text-white/80 uppercase tracking-wider mb-0.5">
                          A partir de
                        </p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold">{price}</span>
                          <span className="text-sm font-medium text-white/70">
                            {priceLabel}
                          </span>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-5 flex flex-col flex-1 gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-orange-600 dark:text-orange-400 mb-2 uppercase tracking-wide">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{room.neighborhood}</span>
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-1 group-hover:text-orange-700 transition-colors">
                          {room.name}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                          {room.description}
                        </p>
                      </div>

                      {/* BOTOES DE AÇÃO */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <Button
                          className="w-full rounded-xl font-bold shadow-md bg-orange-600 hover:bg-orange-700 text-white border-0"
                          asChild
                        >
                          <Link href={`/espacos/${room.id}`}>Ver Sala</Link>
                        </Button>

                        <Button
                          variant="outline"
                          className="w-full rounded-xl border-border hover:border-orange-500/30 text-muted-foreground hover:text-orange-700 bg-transparent"
                          asChild
                        >
                          <Link href={`/espacos?specialty=${mainSpecialty}`}>
                            Similares
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <FadeInUp delay={0.4}>
          <div className="mt-16 text-center">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                asChild
                className="relative overflow-hidden rounded-full bg-foreground text-background hover:bg-foreground/90 h-14 px-10 text-base font-bold shadow-2xl"
              >
                <Link href="/espacos">
                  <span className="relative z-10 flex items-center gap-2">
                    Explorar Todas as Salas
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </Button>
            </motion.div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}

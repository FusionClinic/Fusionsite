"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, ArrowRight, LayoutGrid, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FeaturedRoom } from "@/lib/get-featured-rooms";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion-wrapper";

// Helper para parsear imagens (caso venha string do banco)
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

export function ListingsSection({ rooms = [] }: ListingsSectionProps) {
  if (!rooms || rooms.length === 0) return null;

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
              Veja algumas das nossas opções prontas para atender.
            </p>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                  <Card className="group relative h-full flex flex-col overflow-hidden border-0 bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all rounded-2xl">
                    {/* Imagem */}
                    <div className="relative h-48 overflow-hidden bg-muted">
                      <Image
                        src={coverImage}
                        alt={room.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                      {/* Tag de Especialidade */}
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-white/90 text-black hover:bg-white shadow-sm font-semibold">
                          {mainSpecialty}
                        </Badge>
                      </div>

                      {/* Rating Badge */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-2 py-1 border border-white/10">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium text-white">
                          5.0
                        </span>
                      </div>
                    </div>

                    <CardContent className="p-5 flex flex-col flex-1 gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-1">
                          {room.name}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                          <MapPin className="h-3 w-3 text-primary" />
                          <span>{room.neighborhood}</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 min-h-[40px]">
                          {room.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-border/50">
                        <div className="flex items-baseline gap-1 mb-4">
                          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                            {price}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {priceLabel}
                          </span>
                        </div>

                        {/* BOTOES DE AÇÃO */}
                        <div className="space-y-2">
                          {/* Botão 1: Ver Detalhes (Sala específica) */}
                          <Button
                            className="w-full rounded-xl font-bold shadow-sm"
                            asChild
                          >
                            <Link href={`/espacos/${room.id}`}>
                              <Eye className="w-4 h-4 mr-2" />
                              Ver Detalhes
                            </Link>
                          </Button>

                          {/* Botão 2: Ver Categoria (Filtro) */}
                          <Button
                            variant="outline"
                            className="w-full rounded-xl border-primary/20 text-muted-foreground hover:text-primary hover:border-primary transition-colors text-xs"
                            asChild
                          >
                            <Link href={`/espacos?specialty=${mainSpecialty}`}>
                              <LayoutGrid className="w-3 h-3 mr-2" />
                              Outras de {mainSpecialty}
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <FadeInUp delay={0.4}>
          <div className="mt-12 text-center">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                asChild
                className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-xl shadow-primary/25 h-12 px-8 cursor-pointer"
              >
                <Link href="/espacos">
                  <span className="relative z-10">
                    Ver Todos os Consultórios
                    <ArrowRight className="w-4 h-4 ml-2 inline-block" />
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

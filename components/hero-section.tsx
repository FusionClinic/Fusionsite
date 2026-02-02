"use client";

import { motion } from "framer-motion";
import { Search, Star, MapPin, Clock, ArrowRight } from "lucide-react";
import { FadeInUp } from "@/components/motion-wrapper";
import Link from "next/link";

const floatingStats = [
  { icon: Star, value: "4.9", label: "Avaliação", delay: 0.8 },
  { icon: MapPin, value: "Natal", label: "RN", delay: 1.0 },
  { icon: Clock, value: "24h", label: "Acesso", delay: 1.2 },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-background flex items-center">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-20 w-full">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="space-y-8">
            <FadeInUp>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-4">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                Consultórios em Natal - Lagoa Nova
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance leading-[1.1]">
                Aluguel de{" "}
                <span className="text-primary">Consultórios em Natal</span> por
                Hora ou Turno
              </h1>
            </FadeInUp>

            <FadeInUp delay={0.1}>
              <div className="flex flex-col gap-6 w-full max-w-xl py-4">
                <Link href="/espacos" className="w-full group">
                  <div className="flex items-center w-full px-6 py-4 bg-background border-2 border-primary/20 hover:border-primary rounded-full shadow-xl transition-all">
                    <div className="flex-1 text-left">
                      <p className="text-sm text-muted-foreground font-medium">
                        O que você precisa?
                      </p>
                      <p className="text-lg font-bold text-foreground">
                        Encontrar minha sala ideal
                      </p>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Search className="w-5 h-5" />
                    </div>
                  </div>
                </Link>

                <div className="flex flex-wrap gap-3 ml-2">
                  <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg border border-border/50">
                    <Clock className="w-4 h-4 text-primary" /> Por Hora
                  </span>
                  <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg border border-border/50">
                    <Clock className="w-4 h-4 text-primary" /> Banco de Horas
                  </span>
                  <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg border border-border/50">
                    <Star className="w-4 h-4 text-primary" /> Planos Mensais
                  </span>
                </div>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                Infraestrutura completa para médicos, psicólogos e profissionais
                de saúde. Sem custos fixos e com flexibilidade total para sua
                agenda em Natal-RN.
              </p>
            </FadeInUp>
          </div>

          <div className="relative hidden lg:block">
            <FadeInUp delay={0.3}>
              <div className="relative aspect-square">
                <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-primary/20 p-1">
                  <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-card shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=800&fit=crop&q=85"
                      alt="Consultório médico moderno da Fusion Clinic em Natal"
                      className="h-full w-full object-cover"
                      loading="eager"
                    />
                  </div>
                </div>

                {floatingStats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`absolute rounded-2xl border border-white/20 bg-white/90 backdrop-blur-md p-4 shadow-xl ${
                      index === 0
                        ? "-left-6 bottom-32"
                        : index === 1
                          ? "-right-6 top-20"
                          : "right-10 -bottom-6"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                        <stat.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-foreground">
                          {stat.value}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeInUp>
          </div>
        </div>
      </div>
    </section>
  );
}

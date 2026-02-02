"use client";

import { motion } from "framer-motion";
import { Search, Star, MapPin, Clock, ArrowRight } from "lucide-react";
import { FadeInUp } from "@/components/motion-wrapper";
import Link from "next/link";

const floatingStats = [
  { icon: Star, value: "4.9", label: "Excelência", delay: 0.8 },
  { icon: MapPin, value: "Natal", label: "Bem localizado", delay: 1.0 },
  { icon: Clock, value: "24h", label: "Acesso total", delay: 1.2 },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-background flex items-center">
      {/* Background Animado */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-primary/20 to-primary/5 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute left-1/4 bottom-0 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-primary/15 to-transparent blur-3xl"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-20 w-full">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Conteúdo da Esquerda */}
          <div className="space-y-8">
            <FadeInUp>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-4">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                Disponível em Natal - RN
              </div>

              {/* H1 OTIMIZADO PARA SEO */}
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance leading-[1.1]">
                Aluguel de <span className="text-primary">Consultórios</span>{" "}
                com Flexibilidade Total
              </h1>
            </FadeInUp>

            {/* --- CTA DE BUSCA FUNCIONAL (UX CORRIGIDA) --- */}
            <FadeInUp delay={0.1}>
              <div className="flex flex-col gap-6 w-full max-w-xl py-4">
                {/* Botão que parece busca, mas é um link de ação */}
                <Link href="/espacos" className="w-full group">
                  <motion.div
                    initial={{ scale: 0.98, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center w-full px-6 py-4 bg-background/80 backdrop-blur-md border-2 border-primary/20 hover:border-primary rounded-full shadow-xl shadow-primary/5 transition-all cursor-pointer"
                  >
                    <div className="flex-1 text-left">
                      <p className="text-sm text-muted-foreground font-medium">
                        O que você precisa?
                      </p>
                      <p className="text-lg font-bold text-foreground leading-none">
                        Encontrar sala ideal agora
                      </p>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Search className="w-5 h-5" />
                    </div>
                  </motion.div>
                </Link>

                {/* Taglines de Valor */}
                <div className="flex flex-wrap gap-3 ml-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg border border-border/50">
                    <Clock className="w-4 h-4 text-primary" />
                    Por Hora
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg border border-border/50">
                    <Clock className="w-4 h-4 text-primary" />
                    Por Turno
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg border border-border/50">
                    <Star className="w-4 h-4 text-primary" />
                    Mensal Fixo
                  </div>
                </div>

                {/* Link Secundário */}
                <div className="mt-2 ml-2">
                  <Link
                    href="/planos"
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group w-fit"
                  >
                    Ver tabela de preços e planos
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </FadeInUp>

            {/* Texto Descritivo */}
            <FadeInUp delay={0.2}>
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                A infraestrutura completa para médicos, psicólogos e dentistas
                em Natal. Zero burocracia, pague apenas pelo tempo que usar.
              </p>
            </FadeInUp>
          </div>

          {/* Conteúdo da Direita (Foto) */}
          <div className="relative hidden lg:block">
            <FadeInUp delay={0.3}>
              <div className="relative aspect-square">
                {/* Main Image Container */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                  className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-1"
                >
                  <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-card/50 backdrop-blur-sm shadow-2xl">
                    {/* Usando img padrão para garantir compatibilidade se o user não tiver Image configurado perfeitamente ainda, 
                        mas com loading="eager" para LCP */}
                    <img
                      src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=800&fit=crop&q=85"
                      alt="Consultório médico moderno em Natal para locação"
                      className="h-full w-full object-cover"
                      width={800}
                      height={800}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    {/* Badge flutuante na imagem */}
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <p className="font-bold text-lg">Pronto para atender</p>
                      <p className="text-white/80 text-sm">
                        Estrutura completa inclusa
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Stats Cards */}
                {floatingStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: stat.delay }}
                    className={`absolute rounded-2xl border border-white/20 bg-white/90 dark:bg-black/80 backdrop-blur-md p-4 shadow-xl ${
                      index === 0
                        ? "-left-6 bottom-32"
                        : index === 1
                          ? "-right-6 top-20"
                          : "right-10 -bottom-6"
                    }`}
                  >
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3,
                      }}
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
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </FadeInUp>
          </div>
        </div>
      </div>
    </section>
  );
}

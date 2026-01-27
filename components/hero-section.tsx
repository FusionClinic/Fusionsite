"use client";

import { motion } from "framer-motion";
import { Search, Star, MapPin, Clock } from "lucide-react";
import { FadeInUp } from "@/components/motion-wrapper";
import Link from "next/link";

const floatingStats = [
  { icon: Star, value: "4.9", label: "Avaliação média", delay: 0.8 },
  { icon: MapPin, value: "+500", label: "Consultórios", delay: 1.0 },
  { icon: Clock, value: "24h", label: "Acesso", delay: 1.2 },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-background">
      {/* Background Animado */}
      <div className="absolute inset-0 -z-10">
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

      <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Conteúdo da Esquerda */}
          <div className="space-y-8">
            <FadeInUp>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance leading-[1.1]">
                <span className="text-primary">CONECTAMOS</span>{" "}
                <span className="text-foreground">PROFISSIONAIS DA SAÚDE</span>
              </h1>
            </FadeInUp>

            {/* --- VITRINE INTERATIVA (MOVIDA PARA CIMA) --- */}
            <FadeInUp delay={0.1}>
              <div className="flex flex-col gap-6 w-full max-w-xl py-4">
                {/* 1. A Falsa Barra de Pesquisa */}
                <motion.div
                  initial={{ scale: 0.98, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center w-full px-6 py-4 bg-background/80 backdrop-blur-md border-2 border-primary rounded-full shadow-xl shadow-primary/5"
                >
                  <div className="flex-1 text-left text-lg font-bold truncate text-black leading-none">
                    {/* TEXTO EM PRETO */}À consultórios mobiliados
                  </div>
                  <div className="text-primary pl-4">
                    <Search className="w-6 h-6" />
                  </div>
                </motion.div>

                {/* 2. As Opções com Tooltip */}
                <div className="flex flex-wrap gap-3 ml-2">
                  {/* Opção: HORA */}
                  <div className="relative group">
                    <button className="px-6 py-2.5 rounded-full border-2 border-primary bg-background text-primary font-bold hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                      Hora
                    </button>
                    {/* Tooltip Card */}
                    <div className="absolute bottom-[130%] left-0 w-64 p-4 bg-foreground text-background text-sm rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:-translate-y-2 z-20 pointer-events-none">
                      <p className="leading-relaxed">
                        Ideal para você que está buscando liberdade. Perfeito
                        para quem quer ter um consultório sem pagar muito por
                        ele.
                      </p>
                      <div className="absolute top-full left-8 border-8 border-transparent border-t-foreground"></div>
                    </div>
                  </div>

                  {/* Opção: TURNO */}
                  <div className="relative group">
                    <button className="px-6 py-2.5 rounded-full border-2 border-primary bg-background text-primary font-bold hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                      Turno
                    </button>
                    <div className="absolute bottom-[130%] left-1/2 -translate-x-1/2 w-64 p-4 bg-foreground text-background text-sm rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:-translate-y-2 z-20 pointer-events-none text-center">
                      <p className="leading-relaxed">
                        Ideal para você que gosta de previsibilidade de agenda,
                        mas não abre mão de ter controle do seu orçamento.
                      </p>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-foreground"></div>
                    </div>
                  </div>

                  {/* Opção: FIXO */}
                  <div className="relative group">
                    <button className="px-6 py-2.5 rounded-full border-2 border-primary bg-background text-primary font-bold hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                      Fixo
                    </button>
                    <div className="absolute bottom-[130%] left-0 w-64 p-4 bg-foreground text-background text-sm rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:-translate-y-2 z-20 pointer-events-none">
                      <p className="leading-relaxed">
                        Ideal para você que gosta de exclusividade. É dedicado à
                        jornada de consultório e possui demanda significativa.
                      </p>
                      <div className="absolute top-full left-8 border-8 border-transparent border-t-foreground"></div>
                    </div>
                  </div>
                </div>

                {/* Link para Planos */}
                <div className="mt-2 ml-4">
                  <Link
                    href="/planos"
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                  >
                    Ver todos os planos e detalhes{" "}
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </FadeInUp>

            {/* Texto Descritivo (MOVIDO PARA BAIXO) */}
            <FadeInUp delay={0.2}>
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                Encontre o espaço ideal para atender seus pacientes. Alugue por
                hora, turno ou período fixo com total flexibilidade.
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
                    <img
                      src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=600&fit=crop&q=80"
                      alt="Consultório moderno e equipado"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>
                </motion.div>

                {/* Floating Stats Cards */}
                {floatingStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: stat.delay }}
                    className={`absolute rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl p-4 shadow-xl ${
                      index === 0
                        ? "-left-6 bottom-32"
                        : index === 1
                          ? "-right-6 top-20"
                          : "left-1/2 -bottom-4 -translate-x-1/2"
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
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10">
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

                {/* Review Bubble */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                  className="absolute -left-2 top-16 max-w-[200px] rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl p-3 shadow-lg"
                >
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="flex items-start gap-2">
                      <img
                        src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=40&h=40&fit=crop&q=80"
                        alt="Dra. Ana"
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-xs font-medium text-foreground">
                          Dra. Ana Silva
                        </p>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-3 w-3 fill-primary text-primary"
                            />
                          ))}
                        </div>
                        <p className="mt-1 text-[10px] text-muted-foreground leading-relaxed">
                          {'"Excelente estrutura!"'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </div>
    </section>
  );
}

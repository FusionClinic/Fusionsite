"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Star,
  MapPin,
  Clock,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { FadeInUp } from "@/components/motion-wrapper";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/tracking";

const floatingStats = [
  { icon: Star, value: "5.0", label: "Excelência", delay: 0.8 },
  { icon: MapPin, value: "Natal", label: "Bem Localizado", delay: 1.0 },
  { icon: ShieldCheck, value: "100%", label: "Seguro", delay: 1.2 },
];

export function HeroSection() {
  const handlePrimaryClick = () => {
    trackEvent("CTA_Clicked", { location: "Hero", type: "Ver Salas" });
  };

  const handleSecondaryClick = () => {
    trackEvent("CTA_Clicked", { location: "Hero", type: "WhatsApp" });
  };

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-background flex items-center pt-20 lg:pt-0">
      {/* Background Decorativo Premium - Ajustado para remover tons de azul e focar no quente */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        <div className="absolute -left-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-orange-500/5 blur-[100px]" />
        <div className="absolute right-[0%] bottom-[0%] h-[400px] w-[400px] rounded-full bg-primary/5 blur-[80px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-20 w-full">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Coluna de Texto (Copywriting Persuasivo) */}
          <div className="space-y-8 text-center lg:text-left">
            <FadeInUp>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-6 shadow-sm hover:bg-primary/10 transition-colors cursor-default">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(var(--primary),0.5)]"></span>
                Disponível agora em Natal-RN
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-balance leading-[1.15]">
                Seu Consultório de <br className="hidden lg:block" />
                {/* CORREÇÃO AQUI: Gradiente apenas em tons de laranja/âmbar */}
                <span className="bg-gradient-to-r from-orange-700 via-primary to-amber-500 bg-clip-text text-transparent font-extrabold">
                  Alto Padrão
                </span>{" "}
                <span className="relative whitespace-nowrap">
                  <span className="relative z-10">Sem Custos Fixos</span>
                  <span className="absolute bottom-1 left-0 right-0 h-3 bg-primary/20 -rotate-1 -z-10 rounded-full"></span>
                </span>
              </h1>
            </FadeInUp>

            <FadeInUp delay={0.1}>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                A estrutura completa para nutricionistas, psicólogos,
                esteticista e profissionais de saúde em geral que querem
                <strong className="text-foreground font-semibold">
                  {" "}
                  lucrar mais{" "}
                </strong>
                e se preocupar menos. Comece a atender hoje mesmo sem
                burocracia.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg mx-auto lg:mx-0 pt-2">
                {/* CTA Primário - Foco em Ação */}
                <Button
                  asChild
                  size="lg"
                  className="h-14 px-8 text-base font-bold rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  onClick={handlePrimaryClick}
                >
                  <Link href="/espacos">
                    Ver Salas Disponíveis
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>

                {/* CTA Secundário - Quebra de Objeção/Dúvida */}
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 text-base font-semibold rounded-full border-2 border-primary/10 bg-background hover:bg-primary/5 hover:border-primary text-foreground transition-all"
                  onClick={handleSecondaryClick}
                >
                  <Link href="https://wa.me/5511919119054" target="_blank">
                    <MessageCircle className="mr-2 w-5 h-5 text-green-600" />
                    Falar no WhatsApp
                  </Link>
                </Button>
              </div>

              {/* Micro-copy de Segurança */}
              <div className="mt-6 flex flex-wrap justify-center lg:justify-start items-center gap-x-6 gap-y-2 text-sm text-muted-foreground font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-500" /> Sem fiador
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-500" /> Sem
                  fidelidade
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-500" /> Reserva
                  100% online
                </span>
              </div>
            </FadeInUp>
          </div>

          {/* Coluna Visual (Imagem + Prova Social) */}
          <div className="relative hidden lg:block perspective-1000">
            <FadeInUp delay={0.3}>
              <div className="relative aspect-square max-w-[600px] mx-auto transform rotate-y-[-5deg] hover:rotate-y-0 transition-transform duration-700 ease-out">
                {/* Efeito de Glow atrás da imagem - Ajustado para laranja */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-orange-500/30 blur-[60px] rounded-full opacity-60 animate-pulse" />

                <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-white/50 to-white/10 p-2 shadow-2xl backdrop-blur-sm border border-white/20 dark:border-white/10">
                  <div className="relative h-full w-full overflow-hidden rounded-[32px] bg-card shadow-inner">
                    <Image
                      src="/herofusion.png"
                      alt="Consultório médico moderno da Fusion Clinic em Natal"
                      fill
                      priority
                      className="object-cover scale-105 hover:scale-100 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    {/* Gradiente sutil sobre a imagem para destacar textos se necessário */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Cards Flutuantes de Autoridade */}
                {floatingStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20, x: -20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    transition={{ delay: stat.delay, duration: 0.5 }}
                    className={`absolute p-4 rounded-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md shadow-xl border border-white/20 flex items-center gap-3 transform hover:scale-110 transition-transform duration-300 cursor-default
                      ${index === 0 ? "-top-6 -right-6" : ""}
                      ${index === 1 ? "top-1/2 -left-12" : ""}
                      ${index === 2 ? "-bottom-8 right-12" : ""}
                    `}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                        {stat.label}
                      </p>
                      <p className="text-lg font-bold text-foreground leading-none">
                        {stat.value}
                      </p>
                    </div>
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

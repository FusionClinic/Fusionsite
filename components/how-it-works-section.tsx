"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Search,
  CreditCard,
  CheckCircle,
  Bell,
  Home,
  Calendar,
  User,
  MapPin,
  Star,
  Brain,
  Sparkles,
} from "lucide-react";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion-wrapper";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Escolha sua sala ideal",
    description:
      "Filtre por Psicologia, Nutrição ou Estética. Veja fotos reais, localização e equipamentos disponíveis.",
  },
  {
    number: "02",
    icon: Calendar,
    title: "Reserve em segundos",
    description:
      "Sem ligar para ninguém. Selecione o horário na agenda online e pague via PIX ou Cartão.",
  },
  {
    number: "03",
    icon: CheckCircle,
    title: "Atenda com excelência",
    description:
      "Receba seu check-in. Chegue, ofereça um café ao seu paciente e foque na consulta.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Effects - Terracota Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-orange-600 blur-[120px]"
      />

      <div className="mx-auto max-w-7xl px-4 lg:px-8 relative">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* LADO ESQUERDO: Texto e Passos */}
          <div className="space-y-10 order-2 lg:order-1">
            <FadeInUp>
              <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl text-balance leading-tight">
                Simples como pedir <br />
                <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                  um carro por aplicativo.
                </span>
              </h2>
              <p className="mt-4 text-gray-400 text-lg max-w-lg">
                Esqueça contratos de papel e chaves físicas. Na Fusion, sua
                carreira flui digitalmente.
              </p>
            </FadeInUp>

            <StaggerContainer className="space-y-6">
              {steps.map((step, index) => (
                <StaggerItem key={step.number}>
                  <motion.div
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.3 }}
                    className="flex gap-5 p-4 -ml-4 rounded-2xl hover:bg-white/5 transition-colors group"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
                        <step.icon className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <FadeInUp delay={0.4}>
              <Button
                size="lg"
                className="rounded-full bg-white text-black hover:bg-gray-100 font-bold px-8 h-12"
              >
                Começar Agora
              </Button>
            </FadeInUp>
          </div>

          {/* LADO DIREITO: Celular Interativo (Mockup App) */}
          <FadeInUp className="order-1 lg:order-2">
            <div className="relative flex justify-center lg:justify-end">
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                {/* O DISPOSITIVO (Moldura do Celular) */}
                <div className="relative w-[300px] h-[620px] bg-[#1a1a1a] rounded-[3rem] p-3 shadow-2xl border-[6px] border-[#2a2a2a] ring-1 ring-white/5">
                  {/* TELA DO APP (Conteúdo) */}
                  <div className="relative w-full h-full bg-slate-50 rounded-[2.5rem] overflow-hidden flex flex-col">
                    {/* 1. Header do App */}
                    <div className="pt-12 pb-4 px-5 bg-white shadow-sm z-10">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs border border-orange-200">
                            DR
                          </div>
                          <div>
                            <p className="text-[10px] text-muted-foreground leading-none font-medium mb-0.5">
                              Bem-vindo(a),
                            </p>
                            <p className="text-sm font-bold text-foreground">
                              Dra. Glauce
                            </p>
                          </div>
                        </div>
                        <Bell className="w-5 h-5 text-gray-400" />
                      </div>

                      {/* Chips de Filtro */}
                      <div className="flex gap-2 overflow-x-hidden">
                        <div className="bg-orange-600 text-white px-3 py-1.5 rounded-full text-[10px] font-semibold shadow-md shadow-orange-500/20 flex items-center gap-1">
                          <Brain className="w-3 h-3" /> Psicologia
                        </div>
                        <div className="bg-white border border-slate-200 text-slate-500 px-3 py-1.5 rounded-full text-[10px] font-medium flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> nutrição
                        </div>
                      </div>
                    </div>

                    {/* 2. Conteúdo com Scroll */}
                    <div className="flex-1 p-5 overflow-hidden relative bg-slate-50">
                      <div className="flex justify-between items-end mb-3">
                        <p className="text-sm font-bold text-slate-800">
                          Disponíveis Hoje
                        </p>
                      </div>

                      {/* CARD DA SALA PRINCIPAL */}
                      <div className="bg-white rounded-2xl p-3 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-slate-100 mb-4 transform transition-all hover:scale-[1.02]">
                        <div className="relative h-36 w-full rounded-xl overflow-hidden mb-3">
                          <Image
                            src="/S3.jpg"
                            alt="Sala Terapia"
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span className="text-[10px] font-bold text-slate-800">
                              5.0
                            </span>
                          </div>
                          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur px-2 py-1 rounded-md">
                            <span className="text-[10px] font-bold text-white">
                              Sala Terapia 01
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between px-1">
                          <div>
                            <div className="flex items-center gap-1 text-[10px] text-slate-500 mb-1">
                              <MapPin className="w-3 h-3 text-orange-500" />
                              <span>Lagoa Nova</span>
                            </div>
                            <p className="text-sm font-bold text-slate-900">
                              R$ 45,00
                              <span className="text-[10px] font-normal text-slate-400">
                                /h
                              </span>
                            </p>
                          </div>
                          <Button
                            size="sm"
                            className="h-8 text-[10px] rounded-lg px-4 bg-orange-600 hover:bg-orange-700"
                          >
                            Reservar
                          </Button>
                        </div>
                      </div>

                      {/* CARD FANTASMA (Para dar ideia de scroll) */}
                      <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 opacity-50 blur-[1px]">
                        <div className="h-24 w-full bg-slate-200 rounded-xl mb-3" />
                        <div className="flex justify-between">
                          <div className="h-8 w-20 bg-slate-200 rounded-lg" />
                          <div className="h-8 w-16 bg-slate-200 rounded-lg" />
                        </div>
                      </div>
                    </div>

                    {/* 3. Menu Inferior */}
                    <div className="h-16 bg-white border-t border-slate-100 flex justify-around items-center px-6 pb-2">
                      <div className="flex flex-col items-center gap-1 text-orange-600">
                        <Home className="w-5 h-5" />
                        <span className="text-[9px] font-bold">Início</span>
                      </div>
                      <div className="flex flex-col items-center gap-1 text-slate-300">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col items-center gap-1 text-slate-300">
                        <User className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Barra Home do iPhone */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[35%] h-1.5 bg-black/20 rounded-full z-30"></div>
                  </div>
                </div>

                {/* Glow atrás do celular */}
                <div className="absolute -inset-10 bg-gradient-to-tr from-orange-500/20 to-amber-500/20 rounded-full blur-3xl -z-10 animate-pulse" />
              </motion.div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Search,
  CreditCard,
  CheckCircle,
  Bell,
  Menu,
  Home,
  Calendar,
  User,
  MapPin,
  Star,
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
    title: "Escolha a sala e o horário na nossa plataforma.",
    description:
      "Navegue por centenas de opções, filtre por localização, especialidade e preço.",
  },
  {
    number: "02",
    icon: CreditCard,
    title: "Faça a reserva e o pagamento seguro em segundos.",
    description:
      "Processo 100% digital com pagamento via PIX, cartão ou boleto.",
  },
  {
    number: "03",
    icon: CheckCircle,
    title: "Pronto! Chegue e atenda seu paciente.",
    description:
      "Receba as instruções de acesso e comece a atender imediatamente.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-[#0f0f0f] relative overflow-hidden">
      {/* Background Effects */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-primary blur-[120px]"
      />

      <div className="mx-auto max-w-7xl px-4 lg:px-8 relative">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* LADO ESQUERDO: Celular Interativo (Mockup App) */}
          <FadeInUp>
            <div className="relative flex justify-center lg:justify-start">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                {/* O DISPOSITIVO (Moldura do Celular) */}
                <div className="relative w-[300px] h-[600px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl border-4 border-[#3a3a3a] ring-1 ring-white/10">
                  {/* Notch / Câmera */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-xl z-20"></div>

                  {/* TELA DO APP (Conteúdo) */}
                  <div className="relative w-full h-full bg-slate-50 rounded-[2.5rem] overflow-hidden flex flex-col">
                    {/* 1. Header do App */}
                    <div className="pt-10 pb-4 px-4 bg-white shadow-sm z-10">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-[10px] border border-primary/20">
                            DR
                          </div>
                          <div>
                            <p className="text-[10px] text-muted-foreground leading-none font-medium">
                              Olá,
                            </p>
                            <p className="text-xs font-bold text-foreground">
                              Dr. Vinícius
                            </p>
                          </div>
                        </div>
                        <Bell className="w-4 h-4 text-muted-foreground" />
                      </div>

                      {/* Barra de Busca */}
                      <div className="bg-slate-100 rounded-lg h-9 flex items-center px-3 gap-2 border border-slate-200">
                        <Search className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-[10px] text-muted-foreground font-medium">
                          Buscar consultório...
                        </span>
                      </div>
                    </div>

                    {/* 2. Conteúdo com Scroll */}
                    <div className="flex-1 p-4 overflow-hidden relative bg-slate-50/50">
                      {/* Filtros */}
                      <div className="flex gap-2 mb-4 overflow-hidden">
                        <span className="bg-primary text-white px-2.5 py-1 rounded-full text-[9px] font-semibold shadow-sm shadow-primary/20">
                          Todos
                        </span>
                        <span className="bg-white border border-slate-200 text-muted-foreground px-2.5 py-1 rounded-full text-[9px] font-medium">
                          Psicologia
                        </span>
                        <span className="bg-white border border-slate-200 text-muted-foreground px-2.5 py-1 rounded-full text-[9px] font-medium">
                          Estética
                        </span>
                      </div>

                      <div className="flex justify-between items-end mb-2">
                        <p className="text-xs font-bold text-foreground">
                          Destaques
                        </p>
                        <span className="text-[9px] text-primary font-medium">
                          Ver mapa
                        </span>
                      </div>

                      {/* CARD DA SALA PRINCIPAL */}
                      <div className="bg-white rounded-xl p-2.5 shadow-md border border-slate-100 mb-3 transform transition-all hover:scale-[1.02]">
                        <div className="relative h-32 w-full rounded-lg overflow-hidden mb-2.5">
                          <Image
                            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600"
                            alt="Sala"
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2 right-2 bg-white/95 backdrop-blur px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow-sm">
                            <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                            <span className="text-[9px] font-bold">5.0</span>
                          </div>
                        </div>

                        <div className="mb-2">
                          <h4 className="text-xs font-bold text-foreground">
                            Consultório Premium
                          </h4>
                          <div className="flex items-center gap-1 text-[9px] text-muted-foreground mt-0.5">
                            <MapPin className="w-2.5 h-2.5 text-primary" />
                            <span>Lagoa Nova, Natal</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50">
                          <div>
                            <p className="text-sm font-bold text-primary">
                              R$ 35,00
                              <span className="text-[9px] font-normal text-muted-foreground">
                                /h
                              </span>
                            </p>
                          </div>
                          <Button
                            size="sm"
                            className="h-7 text-[10px] rounded-md px-3 bg-primary hover:bg-primary/90"
                          >
                            Reservar
                          </Button>
                        </div>
                      </div>

                      {/* Segundo Card (Sugestão) */}
                      <div className="bg-white rounded-xl p-2.5 shadow-sm border border-slate-100 opacity-60">
                        <div className="relative h-16 w-full rounded-lg overflow-hidden mb-2 bg-slate-200"></div>
                        <div className="h-2.5 w-2/3 bg-slate-200 rounded mb-1.5"></div>
                        <div className="h-2 w-1/2 bg-slate-100 rounded"></div>
                      </div>
                    </div>

                    {/* 3. Menu Inferior */}
                    <div className="h-14 bg-white border-t border-slate-100 flex justify-around items-center px-4">
                      <div className="flex flex-col items-center gap-0.5 text-primary">
                        <Home className="w-4 h-4" />
                        <span className="text-[8px] font-bold">Início</span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5 text-muted-foreground/60">
                        <Calendar className="w-4 h-4" />
                        <span className="text-[8px] font-medium">Agenda</span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5 text-muted-foreground/60">
                        <User className="w-4 h-4" />
                        <span className="text-[8px] font-medium">Perfil</span>
                      </div>
                    </div>

                    {/* Barra Home do iPhone */}
                    <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[35%] h-1 bg-gray-300 rounded-full z-30"></div>
                  </div>
                </div>

                {/* Decorative Elements (Glow atrás do celular) */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-6 -right-6 w-32 h-32 bg-primary/30 rounded-full blur-2xl -z-10"
                />
                <motion.div
                  animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-6 -left-6 w-40 h-40 bg-primary/20 rounded-full blur-2xl -z-10"
                />
              </motion.div>
            </div>
          </FadeInUp>

          {/* LADO DIREITO: Passos e Texto */}
          <div className="space-y-8">
            <FadeInUp>
              <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl text-balance leading-tight">
                Como Funciona a <br />
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Fusion Clinic?
                </span>
              </h2>
            </FadeInUp>

            <StaggerContainer className="space-y-4">
              {steps.map((step, index) => (
                <StaggerItem key={step.number}>
                  <motion.div
                    whileHover={{ x: 8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="flex gap-4 p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors group"
                  >
                    <div className="flex-shrink-0">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/30 group-hover:from-primary group-hover:to-primary/80 transition-all"
                      >
                        <step.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                      </motion.div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-primary">
                          {step.number}
                        </span>
                        <h3 className="text-base font-semibold text-white">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <FadeInUp delay={0.4}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground h-14 text-base font-semibold shadow-xl shadow-primary/25"
                >
                  <span className="relative z-10">
                    Isso é ECONOMIA! Isso é FUSION CLINIC!!
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                </Button>
              </motion.div>
            </FadeInUp>
          </div>
        </div>
      </div>
    </section>
  );
}

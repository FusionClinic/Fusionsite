"use client";

import { motion } from "framer-motion";
import {
  Check,
  Zap,
  Star,
  Crown,
  ArrowRight,
  TrendingUp,
  CalendarClock,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion-wrapper";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const pricingPlans = [
  {
    id: "avulso",
    name: "Hora Avulsa",
    tag: "Liberdade Total",
    tagIcon: Zap,
    description:
      "Ideal para quem está começando. Pague apenas quando tiver paciente agendado.",
    price: "R$ 45",
    period: "/hora",
    popular: false,
    highlightText: null,
    savings: null,
    features: [
      "Agende e pague na hora",
      "Liberdade total de agenda",
      "Wi-Fi e recepção inclusos",
      "Sem mensalidade",
    ],
    cta: "Agendar Agora",
    ctaLink: "/espacos",
  },
  {
    id: "plano10",
    name: "Pacote 10h",
    tag: "Recomendado",
    tagIcon: Star,
    description:
      "Para quem já tem pacientes recorrentes e quer aumentar a margem de lucro.",
    price: "R$ 320",
    period: "/mês",
    popular: true, // Destaque visual
    highlightText: "Sai a R$ 32/hora",
    savings: "Economize R$ 130,00", // Ancoragem de preço
    features: [
      "Validade de 30 dias",
      "Use em qualquer horário",
      "Prioridade na agenda",
      "Pagamento facilitado",
      "Desconto de ~30%",
    ],
    cta: "Comprar Pacote",
    ctaLink:
      "https://wa.me/5511919119054?text=Olá! Quero saber mais sobre o Plano de 10h da Fusion.",
  },
  {
    id: "turno",
    name: "Turno Fixo",
    tag: "Melhor Custo",
    tagIcon: CalendarClock,
    description:
      "4h semanais em dia fixo. Tenha sua 'manhã' ou 'tarde' garantida.",
    price: "R$ 400",
    period: "/mês",
    popular: false,
    highlightText: "Sai a R$ 25/hora",
    savings: "Economize R$ 320,00", // Ancoragem agressiva
    features: [
      "Seu horário sempre garantido",
      "Total de 16 horas mensais",
      "O menor valor por hora",
      "Nome na porta (opcional)",
      "Previsibilidade total",
    ],
    cta: "Garantir Turno",
    ctaLink:
      "https://wa.me/5511919119054?text=Olá! Tenho interesse em fixar um Turno semanal.",
  },
  {
    id: "exclusiva",
    name: "Sala Exclusiva",
    tag: "Personalizado",
    tagIcon: Crown,
    description:
      "Seu consultório próprio 24h, sem fiador e sem burocracia de imobiliária.",
    price: "Sob Consulta",
    period: "",
    popular: false,
    highlightText: "Últimas unidades",
    savings: null,
    features: [
      "Chave na mão (Uso exclusivo)",
      "Sua logo na porta",
      "Decoração personalizada",
      "Acesso 24h/7 dias",
      "Endereço Fiscal incluso",
    ],
    cta: "Consultar",
    ctaLink:
      "https://wa.me/5511919119054?text=Tenho interesse em uma Sala Exclusiva mensal.",
  },
];

export function PricingSection() {
  return (
    <section
      id="planos"
      className="relative py-16 md:py-24 overflow-hidden bg-muted/30"
    >
      {/* Background Decorativo */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute -right-40 -top-40 h-80 w-80 rounded-full border border-orange-500/10 opacity-50 pointer-events-none"
      />

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <FadeInUp>
          <div className="text-center mb-10 md:mb-16">
            <Badge
              variant="outline"
              className="mb-4 rounded-full border-orange-500/20 bg-orange-500/5 px-4 py-1.5"
            >
              <span className="text-sm font-medium text-orange-600 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Tabela Vigente 2026
              </span>
            </Badge>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
              Planos que colocam dinheiro <br className="hidden md:block" />
              <span className="text-primary">no seu bolso</span>
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Pare de pagar aluguel caro mesmo quando não está atendendo.
              Escolha a liberdade da Fusion.
            </p>
          </div>
        </FadeInUp>

        {/* --- VERSÃO DESKTOP (GRID PADRÃO) --- */}
        <div className="hidden md:block">
          <StaggerContainer className="grid gap-8 grid-cols-2 lg:grid-cols-4 items-start">
            {pricingPlans.map((plan) => (
              <StaggerItem key={plan.id}>
                <PricingCard plan={plan} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* --- VERSÃO MOBILE (CAROUSEL SNAP) --- */}
        <div className="md:hidden">
          <Carousel
            opts={{
              align: "center",
              loop: false,
            }}
            className="w-full pb-8"
          >
            <CarouselContent className="-ml-4 pt-6 pb-4">
              {pricingPlans.map((plan) => (
                <CarouselItem key={plan.id} className="pl-4 basis-[85%]">
                  <div className="h-full px-1">
                    <PricingCard plan={plan} isMobile />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="text-center animate-pulse">
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
              ← Deslize para comparar →
            </span>
          </div>
        </div>

        <div className="mt-12 text-center hidden md:block">
          <p className="text-sm text-muted-foreground">
            Dúvidas sobre qual o melhor plano para você?{" "}
            <a
              href="https://wa.me/5511919119054"
              className="text-primary font-bold hover:underline underline-offset-4"
            >
              Falar com consultor agora
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

// COMPONENTE DO CARD ISOLADO PARA REUSO
function PricingCard({
  plan,
  isMobile = false,
}: {
  plan: any;
  isMobile?: boolean;
}) {
  return (
    <motion.div
      whileHover={!isMobile ? { y: -8 } : {}}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="h-full"
    >
      <Card
        className={`relative h-full flex flex-col overflow-visible border transition-all duration-300 ${
          plan.popular
            ? "bg-card border-orange-500/30 ring-2 ring-orange-500/20 shadow-2xl shadow-orange-500/10 z-10 rounded-3xl"
            : "bg-card/60 backdrop-blur-sm hover:bg-card/80 border-border/50 shadow-lg hover:shadow-xl rounded-2xl"
        } ${isMobile && plan.popular ? "scale-[1.02]" : ""}`}
      >
        {plan.popular && (
          <div className="absolute -top-4 left-0 right-0 flex justify-center z-20">
            <div className="bg-gradient-to-r from-orange-600 to-amber-500 px-4 py-1.5 text-xs font-bold text-white rounded-full shadow-lg flex items-center gap-1.5 uppercase tracking-wide">
              <Sparkles className="w-3 h-3 fill-current" />
              Mais Vendido
            </div>
          </div>
        )}

        <CardHeader
          className={`pb-4 ${plan.popular ? "pt-8" : "pt-6"} px-5 md:px-6`}
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                plan.popular
                  ? "bg-orange-100 text-orange-600 dark:bg-orange-900/40"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <plan.tagIcon className="h-5 w-5" />
            </div>
            <span
              className={`text-[10px] font-bold tracking-widest uppercase ${
                plan.popular ? "text-orange-600" : "text-muted-foreground"
              }`}
            >
              {plan.tag}
            </span>
          </div>

          <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed min-h-[40px]">
            {plan.description}
          </p>

          {/* BLOCO DE PREÇO */}
          <div className="mt-6 p-4 rounded-2xl bg-muted/30 border border-border/50 relative overflow-hidden group-hover:border-primary/20 transition-colors">
            {plan.savings && (
              <div className="absolute top-0 right-0 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                {plan.savings}
              </div>
            )}

            {plan.highlightText && (
              <div className="mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                  {plan.highlightText}
                </span>
              </div>
            )}

            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-foreground">
                {plan.price}
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                {plan.period}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col px-5 md:px-6 pb-6 md:pb-8">
          <ul className="space-y-3 mb-8 flex-1">
            {plan.features.map((feature: string) => (
              <li key={feature} className="flex items-start gap-3">
                <div
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full mt-0.5 ${
                    plan.popular
                      ? "bg-orange-500 text-white"
                      : "bg-primary/20 text-primary"
                  }`}
                >
                  <Check className="h-2.5 w-2.5" />
                </div>
                <span className="text-xs text-foreground/80 font-medium leading-tight">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          <motion.div
            whileHover={!isMobile ? { scale: 1.02 } : {}}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              asChild
              className={`w-full h-11 rounded-xl font-bold text-sm shadow-md transition-all ${
                plan.popular
                  ? "bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-orange-500/25 hover:shadow-orange-500/40"
                  : "bg-background text-foreground border-2 border-muted hover:border-primary/30 hover:bg-muted/30"
              }`}
            >
              <a
                href={plan.ctaLink}
                target={plan.ctaLink.startsWith("http") ? "_blank" : "_self"}
              >
                {plan.cta}
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

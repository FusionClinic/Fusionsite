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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion-wrapper";

const pricingPlans = [
  {
    id: "avulso",
    name: "Hora Avulsa",
    tag: "Flexibilidade",
    tagIcon: Zap,
    description:
      "Pague apenas quando tiver paciente. Sem custos fixos mensais.",
    price: "R$ 45",
    period: "/hora",
    popular: false,
    highlightText: null,
    features: [
      "Agende e pague na hora",
      "Liberdade total de agenda",
      "Estrutura completa inclusa",
      "Wi-Fi e recepção",
      "Ideal para recém-formados",
    ],
    cta: "Agendar Hora",
    ctaLink: "/espacos",
  },
  {
    id: "plano10",
    name: "Pacote 10h",
    tag: "Mais Vendido",
    tagIcon: Star,
    description: "Para quem está começando a ter volume de pacientes.",
    price: "R$ 320",
    period: "/mês",
    popular: true,
    highlightText: "Sai a R$ 32/hora",
    features: [
      "Validade de 30 dias",
      "Use em qualquer horário",
      "Desconto de 30% vs Avulso",
      "Prioridade na agenda",
      "Pagamento mensal simplificado",
      "Sem fidelidade",
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
    description: "4 horas semanais em dia fixo. Total de 16h no mês.",
    price: "R$ 400",
    period: "/mês",
    popular: false,
    highlightText: "Sai a R$ 25/hora",
    features: [
      "Seu horário garantido sempre",
      "4h por semana (ex: toda Terça à tarde)",
      "Total de 16 horas mensais",
      "O menor valor por hora",
      "Nome na porta (opcional)",
      "Previsibilidade total",
    ],
    cta: "Garantir Meu Turno",
    ctaLink:
      "https://wa.me/5511919119054?text=Olá! Tenho interesse em fixar um Turno semanal.",
  },
  {
    id: "exclusiva",
    name: "Sala Exclusiva",
    tag: "Personalizado",
    tagIcon: Crown,
    description:
      "Seu consultório próprio, 24h por dia, sem burocracia de imobiliária.",
    price: "Sob Consulta",
    period: "",
    popular: false,
    highlightText: "Últimas unidades",
    features: [
      "Uso exclusivo (chave na mão)",
      "Sua logo na porta",
      "Decoração personalizada",
      "Acesso 24h, 7 dias por semana",
      "Endereço fiscal e comercial",
      "Gestão predial inclusa",
    ],
    cta: "Falar com Consultor",
    ctaLink:
      "https://wa.me/5511919119054?text=Tenho interesse em uma Sala Exclusiva mensal.",
  },
];

export function PricingSection() {
  return (
    <section id="planos" className="relative py-24 overflow-hidden bg-muted/30">
      {/* Background Decorativo */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute -right-40 -top-40 h-80 w-80 rounded-full border border-primary/10 opacity-50 pointer-events-none"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        className="absolute -left-20 -bottom-20 h-60 w-60 rounded-full border border-primary/10 opacity-30 pointer-events-none"
      />

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <FadeInUp>
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="mb-4 rounded-full border-primary/20 bg-primary/5 px-4 py-1.5"
            >
              <span className="text-sm font-medium text-primary flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Tabela Vigente 2026
              </span>
            </Badge>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
              Planos que crescem com <br className="hidden md:block" />
              <span className="text-primary">sua carreira</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Do avulso ao consultório próprio. Comece pagando pouco e evolua
              conforme sua agenda lota.
            </p>
          </div>
        </FadeInUp>

        {/* Ajuste no grid para comportar 4 colunas em telas grandes */}
        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-start">
          {pricingPlans.map((plan) => (
            <StaggerItem key={plan.id}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="h-full"
              >
                <Card
                  className={`relative h-full flex flex-col overflow-visible border-0 shadow-xl rounded-3xl transition-all ${
                    plan.popular
                      ? "bg-card ring-2 ring-primary shadow-primary/20 scale-105 z-10"
                      : "bg-card/60 backdrop-blur-sm hover:bg-card/80"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                      <div className="bg-gradient-to-r from-primary to-primary/90 px-4 py-1.5 text-xs font-bold text-primary-foreground rounded-full shadow-lg flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        Melhor Custo-Benefício
                      </div>
                    </div>
                  )}

                  <CardHeader className="pb-4 pt-8 px-5">
                    <div className="flex items-center gap-2 mb-4">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                          plan.popular
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <plan.tagIcon className="h-5 w-5" />
                      </div>
                      <span
                        className={`text-xs font-bold tracking-wide uppercase ${plan.popular ? "text-primary" : "text-muted-foreground"}`}
                      >
                        {plan.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-foreground">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed min-h-[40px]">
                      {plan.description}
                    </p>

                    <div className="mt-6 p-3 rounded-2xl bg-muted/50 border border-border/50">
                      {plan.highlightText && (
                        <div className="mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-sm">
                            {plan.highlightText}
                          </span>
                        </div>
                      )}
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-extrabold text-foreground">
                          {plan.price}
                        </span>
                        <span className="text-xs font-medium text-muted-foreground">
                          {plan.period}
                        </span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col px-5 pb-8">
                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <div
                            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full mt-0.5 ${
                              plan.popular
                                ? "bg-primary text-primary-foreground"
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
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        asChild
                        className={`w-full h-10 rounded-xl font-bold text-sm shadow-lg ${
                          plan.popular
                            ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-primary/25"
                            : "bg-white dark:bg-zinc-800 text-foreground border-2 border-muted hover:border-primary/50"
                        }`}
                      >
                        <a
                          href={plan.ctaLink}
                          target={
                            plan.ctaLink.startsWith("http") ? "_blank" : "_self"
                          }
                        >
                          {plan.cta}
                          <ArrowRight className="ml-2 w-3 h-3" />
                        </a>
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Link para ver tabela completa */}
        <div className="mt-12 text-center">
          <a
            href="/planos"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
          >
            Ver comparativo detalhado
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

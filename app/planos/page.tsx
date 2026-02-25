"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Zap,
  Calendar,
  Crown,
  Clock,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  CalendarClock,
  Info,
  CalendarDays,
  Shuffle,
  Lightbulb,
  Sparkles,
  Loader2,
  RefreshCcw,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// DADOS OTIMIZADOS PARA VENDAS (Tabela 2026)
const plans = [
  {
    name: "Hora Avulsa",
    description:
      "Liberdade total. Pague apenas quando tiver paciente agendado.",
    price: "R$ 45",
    period: "/hora",
    icon: Zap,
    popular: false,
    features: [
      "Zero custo fixo mensal",
      "Liberdade total de agenda",
      "Estrutura completa inclusa",
      "Ideal para recém-formados",
    ],
    cta: "Agendar 1ª Hora",
    color: "bg-blue-500",
    badge: null,
  },
  {
    name: "Pacote 10h",
    description: "Atende semanalmente? Pare de perder dinheiro no avulso.",
    price: "R$ 320",
    period: "/mês",
    oldPrice: "R$ 450",
    savings: "Economize R$ 130/mês",
    priceDetail: "Sai a R$ 32/hora",
    icon: Clock,
    popular: true,
    features: [
      "Pacote de 10 horas mensais",
      "Prioridade na agenda",
      "Créditos válidos por 30 dias",
      "Perfil em destaque no site",
    ],
    cta: "Quero Economizar",
    color: "bg-primary",
    badge: "Mais Vendido",
  },
  {
    name: "Turno Fixo",
    description:
      "4h por semana em dia e horário fixo (ex: Toda Terça à tarde).",
    price: "R$ 400",
    period: "/mês",
    oldPrice: null,
    savings: "Menor valor por hora",
    priceDetail: "Apenas R$ 25/hora",
    icon: CalendarClock,
    popular: false,
    features: [
      "Total de 16 horas mensais",
      "Sua sala garantida sempre",
      "Previsibilidade total",
      "Nome na porta (opcional)",
    ],
    cta: "Garantir Turno",
    color: "bg-purple-500",
    badge: "Melhor Custo",
  },
  {
    name: "Diária (10h)",
    description:
      "Concentra todos os pacientes em um dia só? A sala é sua o dia todo.",
    price: "R$ 300",
    period: "/dia (08h às 18h)",
    oldPrice: "R$ 450",
    savings: "Economia de R$ 150/dia",
    priceDetail: "Sai a R$ 30/hora",
    icon: Calendar,
    popular: false,
    features: [
      "Uso exclusivo no dia",
      "Chave na mão das 08h às 18h",
      "Recepcionista dedicada",
      "Ideal para quem vem do interior",
    ],
    cta: "Cotar Data",
    color: "bg-orange-500",
    badge: null,
  },
  {
    name: "Sala Exclusiva",
    description:
      "Seu consultório próprio, chave na mão, sem a dor de cabeça de obra e fiador.",
    price: "Sob Consulta",
    period: "/mês",
    icon: Crown,
    popular: false,
    features: [
      "Uso exclusivo 24h/7 dias",
      "Sua logo na porta",
      "Endereço Fiscal e Comercial",
      "Móveis e Decor inclusos",
    ],
    cta: "Ver Salas Vagas",
    color: "bg-slate-800",
    scarcity: "Últimas unidades em Tirol",
    badge: "Premium",
  },
];

const faqs = [
  {
    question: "Qual a diferença entre Turno Fixo e Pacote de 10h?",
    answer:
      "No Turno Fixo, você tem um compromisso semanal (ex: toda quarta das 14h às 18h). A sala é sua naquele horário, ninguém mais usa. Já no Pacote de 10h, você tem um saldo de horas para agendar livremente conforme a demanda dos pacientes, em dias e horários variados.",
  },
  {
    question: "O Turno Fixo garante a mesma sala?",
    answer:
      "Sim! Ao contratar um Turno Fixo, você escolhe sua sala preferida e ela fica bloqueada para você naquele horário específico todas as semanas.",
  },
  {
    question: "Como funciona a Diária de 10h?",
    answer:
      "A Diária é perfeita para quem mora fora ou concentra agenda. Você paga um valor único (R$ 300) e pode usar a sala das 08:00 às 18:00. Se você atendesse as mesmas 10 horas no avulso, pagaria R$ 450.",
  },
  {
    question: "Preciso de fiador para a Sala Exclusiva?",
    answer:
      "Não! A Fusion Clinic elimina a burocracia das imobiliárias. Fazemos uma análise de cadastro simples e rápida. Você foca no seu paciente, nós cuidamos da estrutura.",
  },
];

// OPÇÕES SEPARADAS POR TIPO DE AGENDA
const FLEXIBLE_PLANS = [
  { name: "Hora Avulsa", hours: 1, price: 45 },
  { name: "Pacote 10h", hours: 10, price: 320 },
  { name: "Pacote 20h", hours: 20, price: 580 },
];

const FIXED_PLANS = [
  ...FLEXIBLE_PLANS,
  { name: "Diária (10h seguidas)", hours: 10, price: 300 },
  { name: "Turno Fixo (16h)", hours: 16, price: 397.99 },
  { name: "Dois Turnos Fixos (32h)", hours: 32, price: 640 },
];

// COMPONENTE: SIMULADOR DE ECONOMIA WIZARD
function SavingsSimulator() {
  const [step, setStep] = useState(0);
  const [hoursPerMonth, setHoursPerMonth] = useState<number | "">("");
  const [agendaType, setAgendaType] = useState<"flexible" | "fixed" | null>(
    null,
  );

  const handleStart = () => setStep(1);

  const handleAgendaSelect = (type: "flexible" | "fixed") => {
    setAgendaType(type);
    setStep(2);
  };

  const handleCalculate = () => {
    if (!hoursPerMonth || hoursPerMonth <= 0) return;
    setStep(3);
    setTimeout(() => {
      setStep(4);
    }, 1800);
  };

  const handleReset = () => {
    setStep(0);
    setHoursPerMonth("");
    setAgendaType(null);
  };

  const bestPlan = useMemo(() => {
    const target = Number(hoursPerMonth) || 0;
    if (target <= 0)
      return {
        cost: 0,
        planName: "Nenhum",
        savings: 0,
        avulsoCost: 0,
        isUpsell: false,
        extraHours: 0,
      };

    const avulsoCost = target * 45;
    const maxSearchHours = target + 40;

    const activePlans =
      agendaType === "flexible" ? FLEXIBLE_PLANS : FIXED_PLANS;

    const dp = Array(maxSearchHours + 1).fill(Infinity);
    const planChoice = Array(maxSearchHours + 1).fill(null);
    const prevHour = Array(maxSearchHours + 1).fill(0);

    dp[0] = 0;

    for (let i = 0; i <= maxSearchHours; i++) {
      if (dp[i] === Infinity) continue;
      for (const plan of activePlans) {
        const nextHour = i + plan.hours;
        if (nextHour <= maxSearchHours && dp[i] + plan.price < dp[nextHour]) {
          dp[nextHour] = dp[i] + plan.price;
          planChoice[nextHour] = plan;
          prevHour[nextHour] = i;
        }
      }
    }

    let minCost = Infinity;
    let bestHour = target;
    for (let i = target; i <= maxSearchHours; i++) {
      if (dp[i] < minCost) {
        minCost = dp[i];
        bestHour = i;
      }
    }

    let curr = bestHour;
    const planCounts: Record<string, number> = {};
    while (curr > 0) {
      const p = planChoice[curr];
      if (!p) break;
      planCounts[p.name] = (planCounts[p.name] || 0) + 1;
      curr = prevHour[curr];
    }

    let planNames = Object.entries(planCounts).map(([name, count]) =>
      count > 1 ? `${count}x ${name}` : name,
    );

    let finalCost = minCost;
    let finalPlanName = planNames.join(" + ") || "Hora Avulsa";
    let isUpsell = false;
    let extraHours = 0;

    // LÓGICA DE UPSELL ESTRATÉGICO: Entre 5 e 7 horas
    if (target >= 5 && target <= 7) {
      finalCost = 320;
      finalPlanName = "Pacote 10h";
      isUpsell = true;
      extraHours = 10 - target;
    }

    const savings = avulsoCost - finalCost;

    return {
      cost: finalCost,
      planName: finalPlanName,
      savings: savings > 0 ? savings : 0,
      avulsoCost,
      isUpsell,
      extraHours,
    };
  }, [hoursPerMonth, agendaType]);

  const yearlySavings = bestPlan.savings * 12;

  // Variantes tipadas com Variants
  const fadeVariants: Variants = {
    initial: { opacity: 0, y: 10, scale: 0.98 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.98,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  return (
    <div className="mx-auto max-w-2xl bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-6 md:p-10 border border-primary/20 shadow-xl overflow-hidden relative min-h-[420px] flex flex-col justify-center">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step-0"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="text-center relative z-10 flex flex-col items-center"
          >
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 shadow-inner">
              <Sparkles className="w-8 h-8" />
            </div>
            <Badge className="mb-4 bg-primary text-primary-foreground shadow-md px-3 py-1 text-xs uppercase tracking-widest">
              Ferramenta Exclusiva
            </Badge>
            <h3 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight text-balance">
              Pare de deixar dinheiro na mesa
            </h3>
            <p className="text-muted-foreground mb-8 text-base md:text-lg max-w-md mx-auto">
              Nossa inteligência artificial analisa seu volume de pacientes e
              cruza nossos planos para encontrar a{" "}
              <strong>combinação exata mais lucrativa</strong> para você.
            </p>
            <Button
              size="lg"
              onClick={handleStart}
              className="rounded-full px-8 h-14 text-base font-bold shadow-lg shadow-primary/25 hover:scale-105 transition-transform"
            >
              Descobrir minha estratégia <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step-1"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative z-10 w-full"
          >
            <div className="text-center mb-8">
              <span className="text-sm font-bold text-primary uppercase tracking-wider mb-2 block">
                Passo 1 de 2
              </span>
              <h3 className="text-2xl font-bold">
                Como você organiza sua agenda?
              </h3>
              <p className="text-muted-foreground text-sm mt-2">
                Isso define quais planos estarão disponíveis na análise.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => handleAgendaSelect("flexible")}
                className="group flex flex-col items-center text-center p-6 rounded-2xl border-2 border-border bg-background hover:border-primary hover:bg-primary/5 transition-all shadow-sm hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-full bg-muted group-hover:bg-primary/20 flex items-center justify-center mb-4 transition-colors">
                  <Shuffle className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h4 className="font-bold text-lg mb-2">Dias Variados</h4>
                <p className="text-sm text-muted-foreground leading-snug">
                  Atendo 1h hoje, 2h amanhã... Preciso de total flexibilidade na
                  semana.
                </p>
              </button>

              <button
                onClick={() => handleAgendaSelect("fixed")}
                className="group flex flex-col items-center text-center p-6 rounded-2xl border-2 border-border bg-background hover:border-primary hover:bg-primary/5 transition-all shadow-sm hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-full bg-muted group-hover:bg-primary/20 flex items-center justify-center mb-4 transition-colors">
                  <CalendarDays className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h4 className="font-bold text-lg mb-2">Agenda Concentrada</h4>
                <p className="text-sm text-muted-foreground leading-snug">
                  Consigo juntar meus pacientes no mesmo dia ou turno garantido.
                </p>
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step-2"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative z-10 w-full flex flex-col items-center text-center"
          >
            <span className="text-sm font-bold text-primary uppercase tracking-wider mb-2 block">
              Passo 2 de 2
            </span>
            <h3 className="text-2xl font-bold mb-8">
              Quantas horas você atende por mês?
            </h3>

            <div className="w-full max-w-sm space-y-6">
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="300"
                  value={hoursPerMonth}
                  onChange={(e) =>
                    setHoursPerMonth(
                      e.target.value ? Number(e.target.value) : "",
                    )
                  }
                  autoFocus
                  className="flex h-20 w-full text-center rounded-2xl border-2 border-primary/30 bg-background px-4 py-2 text-4xl font-black text-primary ring-offset-background placeholder:text-muted-foreground/30 focus-visible:outline-none focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/20 transition-all shadow-inner"
                  placeholder="0"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">
                  horas
                </span>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {[6, 10, 16, 20, 32].map((h) => (
                  <Button
                    key={h}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setHoursPerMonth(h);
                    }}
                    className="rounded-full h-8 px-4 text-xs font-medium border-border hover:border-primary hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {h}h
                  </Button>
                ))}
              </div>

              <Button
                size="lg"
                onClick={handleCalculate}
                disabled={!hoursPerMonth}
                className="w-full h-14 rounded-xl text-base font-bold shadow-lg mt-4"
              >
                Cruzar Dados e Ver Resultado{" "}
                <TrendingUp className="ml-2 w-5 h-5" />
              </Button>

              <button
                onClick={() => setStep(1)}
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                ← Voltar e mudar perfil da agenda
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step-3"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative z-10 w-full flex flex-col items-center justify-center text-center py-10"
          >
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-6" />
            <h3 className="text-2xl font-bold mb-2">
              Analisando sua agenda...
            </h3>
            <p className="text-muted-foreground">
              Cruzando seu perfil com nossas{" "}
              {agendaType === "fixed"
                ? "modalidades de turno"
                : "modalidades flexíveis"}{" "}
              para encontrar o menor custo.
            </p>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step-4"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative z-10 w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <Badge className="bg-primary/20 text-primary hover:bg-primary/30 mb-2 border-0 shadow-none">
                  Resultado Concluído
                </Badge>
                <h3 className="text-2xl font-bold">Sua Estratégia Vencedora</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleReset}
                title="Refazer simulação"
                className="rounded-full hover:bg-primary/10 hover:text-primary"
              >
                <RefreshCcw className="w-5 h-5" />
              </Button>
            </div>

            <div className="bg-background rounded-2xl p-6 shadow-sm border border-border/50">
              <div className="space-y-5">
                {bestPlan.isUpsell && bestPlan.avulsoCost < bestPlan.cost ? (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">
                      Custo das {hoursPerMonth}h no avulso:
                    </span>
                    <span className="text-lg text-muted-foreground font-medium">
                      R${" "}
                      {bestPlan.avulsoCost.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                ) : (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">
                      Custo de {hoursPerMonth}h pagando Avulso:
                    </span>
                    <span className="text-lg line-through decoration-red-500 text-muted-foreground font-medium">
                      R${" "}
                      {bestPlan.avulsoCost.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                )}

                <div
                  className={`p-5 rounded-xl border-2 ${bestPlan.isUpsell ? "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800" : "bg-primary/5 border-primary/20"}`}
                >
                  <div
                    className={`text-xs font-bold uppercase tracking-wider mb-2 ${bestPlan.isUpsell ? "text-blue-600 dark:text-blue-400" : "text-primary"}`}
                  >
                    Combinação Ideal
                  </div>
                  <div className="text-2xl font-bold leading-tight mb-4 text-foreground">
                    {bestPlan.planName}
                  </div>
                  <div className="flex justify-between items-end pt-4 border-t border-border/50">
                    <span className="text-sm font-medium text-muted-foreground">
                      Valor mensal otimizado:
                    </span>
                    <span
                      className={`text-4xl font-extrabold tracking-tight ${bestPlan.isUpsell ? "text-blue-600 dark:text-blue-400" : "text-primary"}`}
                    >
                      R${" "}
                      {bestPlan.cost.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  {bestPlan.isUpsell ? (
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-5 rounded-xl text-center space-y-2">
                      <div className="flex items-center justify-center gap-1.5 text-sm font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wide mb-1">
                        <Lightbulb className="w-4 h-4" />
                        Visão de Negócio
                      </div>
                      <p className="text-lg font-bold text-blue-700 dark:text-blue-400 leading-tight">
                        Ganhe {bestPlan.extraHours}{" "}
                        {bestPlan.extraHours === 1
                          ? "hora livre"
                          : "horas livres"}{" "}
                        para crescer!
                      </p>
                      <p className="text-sm font-medium text-blue-800/80 dark:text-blue-300 mt-2 leading-relaxed">
                        Ao invés de pagar avulso, garanta o{" "}
                        <strong>Pacote 10h</strong>. Use o tempo excedente para
                        gravar vídeos, parcerias e captar mais pacientes.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-green-100 dark:bg-green-900/30 p-5 rounded-xl text-center space-y-1">
                      <div className="flex items-center justify-center gap-1.5 text-sm font-bold text-green-800 dark:text-green-300 uppercase tracking-wide mb-1">
                        <TrendingUp className="w-4 h-4" />
                        Sua Economia Anual
                      </div>
                      <p className="text-4xl font-black text-green-600 dark:text-green-400 my-2">
                        R${" "}
                        {yearlySavings.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </p>
                      <p className="text-sm font-medium text-green-700/80 dark:text-green-500">
                        Isso é lucro retido direto no seu bolso, sem mágica.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <Button
                asChild
                className="rounded-full h-12 px-8 font-bold text-base shadow-lg hover:scale-105 transition-transform w-full sm:w-auto"
              >
                <a href="https://wa.me/5511919119054" target="_blank">
                  Garantir esse valor agora{" "}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="relative py-20 lg:py-24 overflow-hidden bg-muted/30">
        <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background px-4 py-1.5 text-sm font-medium text-primary shadow-sm mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Tabela vigente 2026
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
              Planos feitos para o seu <br className="hidden md:block" />
              <span className="text-primary">momento de carreira</span>.
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Do recém-formado ao especialista com agenda cheia. Pague apenas
              pelo que usar, com zero surpresas.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 px-4">
        <SavingsSimulator />
      </section>

      <section className="py-16 relative z-10">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-start">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <Card
                  className={`h-full flex flex-col relative overflow-visible transition-all duration-300 hover:shadow-2xl ${
                    plan.popular
                      ? "border-primary shadow-lg ring-2 ring-primary/20 scale-105 z-20 bg-card"
                      : "border-border/50 hover:border-primary/30 bg-card/50"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                      <Badge className="bg-primary hover:bg-primary text-primary-foreground px-4 py-1 shadow-lg">
                        {plan.badge}
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="pb-4 pt-6">
                    {!plan.popular && plan.badge && (
                      <Badge
                        variant="secondary"
                        className="w-fit mb-2 text-[10px] uppercase tracking-wider font-bold"
                      >
                        {plan.badge}
                      </Badge>
                    )}

                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`p-2 rounded-lg ${plan.popular ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}
                      >
                        <plan.icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold leading-tight">
                        {plan.name}
                      </h3>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed min-h-[40px]">
                      {plan.description}
                    </p>
                  </CardHeader>

                  <CardContent className="flex-grow pt-0">
                    <div className="mb-6 p-3 bg-muted/40 rounded-xl border border-border/50 relative group-hover:bg-primary/5 transition-colors">
                      {plan.savings && (
                        <div className="absolute -top-2.5 right-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-200">
                          {plan.savings}
                        </div>
                      )}

                      {plan.oldPrice && (
                        <span className="text-xs text-muted-foreground line-through decoration-red-400 block mb-1">
                          De {plan.oldPrice}
                        </span>
                      )}

                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-foreground">
                          {plan.price}
                        </span>
                        <span className="text-xs text-muted-foreground font-medium">
                          {plan.period}
                        </span>
                      </div>

                      {plan.priceDetail && (
                        <div className="mt-2 flex items-center gap-1.5">
                          <TrendingUp className="w-3 h-3 text-green-600" />
                          <p className="text-xs font-bold text-green-700 dark:text-green-400">
                            {plan.priceDetail}
                          </p>
                        </div>
                      )}
                    </div>

                    {plan.scarcity && (
                      <div className="mb-4 flex items-center gap-2 text-xs font-medium text-amber-700 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400 p-2 rounded-lg border border-amber-200/50">
                        <AlertCircle className="w-3 h-3" />
                        {plan.scarcity}
                      </div>
                    )}

                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-xs text-foreground/80 leading-snug">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter className="pt-4 mt-auto">
                    <Button
                      className={`w-full h-11 text-sm font-semibold rounded-xl group shadow-sm ${
                        plan.popular
                          ? "bg-primary text-primary-foreground shadow-primary/25 hover:bg-primary/90"
                          : "bg-background text-foreground border-2 border-muted hover:border-primary/50 hover:bg-muted/30"
                      }`}
                      asChild
                    >
                      <a
                        href={`https://wa.me/5584999999999?text=Olá! Tenho interesse no *${plan.name}*. Quero saber mais detalhes.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        {plan.cta}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background border-t border-border/40">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold">Dúvidas Frequentes</h2>
            <p className="text-muted-foreground text-sm mt-2">
              Transparência total em todas as modalidades.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-border/40"
              >
                <AccordionTrigger className="text-left text-base font-medium py-4 hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-sm pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-16 border-t border-border/50 bg-muted/10">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Sua carreira não pode esperar
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Não deixe para depois a estrutura que seus pacientes merecem hoje.
            Agende uma visita e conheça nosso padrão de qualidade.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="rounded-xl px-8 shadow-xl shadow-primary/20 h-12 text-base"
              asChild
            >
              <a href="https://wa.me/5511919119054" target="_blank">
                Falar com Consultor no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

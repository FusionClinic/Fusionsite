"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
import { Slider } from "@/components/ui/slider";
import {
  Check,
  Zap,
  Calendar,
  Crown,
  Clock,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// DADOS OTIMIZADOS PARA VENDAS (Baseado em R$ 45/h)
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
    name: "Plano 10h",
    description: "Atende semanalmente? Pare de perder dinheiro no avulso.",
    price: "R$ 320",
    period: "/mês",
    // ANCORAGEM: 10h x R$45 = R$450
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
    badge: "Melhor Custo-Benefício",
  },
  {
    name: "Turnos / Diárias",
    description:
      "Concentra pacientes em um dia só? Garanta sua sala fixa naquele dia.",
    price: "R$ 300",
    period: "/diária (10h)",
    // ANCORAGEM: 10h x R$45 = R$450
    oldPrice: "R$ 450",
    savings: "Economia de R$ 150/dia",
    priceDetail: "Apenas R$ 30/hora",
    icon: Calendar,
    popular: false,
    features: [
      "Garantia da MESMA sala sempre",
      "Sua rotina organizada",
      "Recepcionista dedicada",
      "Desconto em turnos fixos",
    ],
    cta: "Cotar Disponibilidade",
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
      "Uso exclusivo do espaço",
      "Sua logo na porta",
      "Endereço Fiscal e Comercial",
      "Móveis e Decor inclusos",
    ],
    cta: "Ver Salas Vagas",
    color: "bg-slate-800",
    // GATILHO DE ESCASSEZ
    scarcity: "Últimas unidades em Tirol",
    badge: "Premium",
  },
];

const faqs = [
  {
    question: "Como funciona o pacote de 10h?",
    answer:
      "Você contrata um crédito de 10 horas para usar durante o mês. É como um plano de celular: você tem a liberdade de agendar essas horas quando quiser, garantindo um valor por hora muito mais baixo (R$ 32/h) do que o avulso (R$ 45/h).",
  },
  {
    question: "As horas acumulam para o próximo mês?",
    answer:
      "Os pacotes são mensais para garantir a disponibilidade da agenda para todos os profissionais. As horas devem ser utilizadas dentro do mês vigente.",
  },
  {
    question: "O que está incluso na Diária?",
    answer:
      "A Diária contempla o uso da sala durante todo o horário comercial (ex: 08h às 18h) por um valor fixo de R$ 300. Ideal para quem concentra todos os atendimentos em um único dia da semana.",
  },
  {
    question: "Preciso de fiador para a Sala Exclusiva?",
    answer:
      "Não! A Fusion Clinic elimina a burocracia das imobiliárias. Fazemos uma análise de cadastro simples e rápida. Você foca no seu paciente, nós cuidamos da estrutura.",
  },
];

// COMPONENTE: SIMULADOR DE ECONOMIA
function SavingsSimulator() {
  const [hoursPerWeek, setHoursPerWeek] = useState(5);

  // Cálculos Baseados na nova hora avulsa de R$ 45
  const hoursPerMonth = hoursPerWeek * 4;
  const costAvulso = hoursPerMonth * 45;

  // Lógica Simplificada: Sempre compara com o Plano 10h ou Múltiplos dele
  // Se atender mais de 10h, sugerimos múltiplos pacotes ou Turnos, mas para simplificar o calculo visual:
  // Vamos assumir que a pessoa compraria Pacotes de 10h (R$ 320) + Horas Avulsas (R$ 45) para o excedente

  const packsNeeded = Math.floor(hoursPerMonth / 10);
  const remainingHours = hoursPerMonth % 10;

  // Custo Otimizado: (Qtde Pacotes * 320) + (Horas Restantes * 45)
  // Se a pessoa atende menos de 10h no mês, o comparativo é direto com o pacote mínimo para mostrar quanto ela perderia não assinando, ou se vale a pena avulso.

  let recommendedPlan = "Plano 10h";
  let totalPlanCost = 0;

  if (hoursPerMonth <= 10) {
    // Se atende pouco, compara o custo avulso com o custo do plano fixo (R$ 320)
    // Às vezes o plano sai mais barato que o avulso se for > 7 horas (7 * 45 = 315)
    totalPlanCost = 320;
  } else {
    totalPlanCost = packsNeeded * 320 + remainingHours * 45;
    if (packsNeeded > 1) recommendedPlan = `${packsNeeded}x Planos 10h`;
  }

  // Se o custo do plano for maior que o avulso (ex: 2h por semana = 8h mês = R$ 360 avulso vs R$ 320 plano), o plano compensa.
  // Se for 1h por semana = 4h mês = R$ 180 avulso. Plano não compensa.
  // Ajuste visual para não mostrar "Economia Negativa"

  let monthlySavings = costAvulso - totalPlanCost;
  if (monthlySavings < 0) monthlySavings = 0; // Não mostra negativo

  const yearlySavings = monthlySavings * 12;

  return (
    <div className="mx-auto max-w-4xl bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-8 border border-primary/20 shadow-xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="grid md:grid-cols-2 gap-10 items-center relative z-10">
        <div>
          <Badge className="mb-4 bg-primary text-primary-foreground">
            Calculadora de Lucro
          </Badge>
          <h3 className="text-2xl font-bold mb-4">
            Pare de deixar dinheiro na mesa
          </h3>
          <p className="text-muted-foreground mb-8">
            Arraste para ver quanto você economiza migrando do avulso para
            nossos planos.
          </p>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="font-medium">Horas Semanais:</span>
              <span className="text-2xl font-bold text-primary">
                {hoursPerWeek}h / semana
              </span>
            </div>
            <Slider
              defaultValue={[5]}
              max={40}
              min={2} // Começa em 2h para fazer sentido o calculo
              step={1}
              onValueChange={(val) => setHoursPerWeek(val[0])}
              className="py-4"
            />
            <p className="text-sm text-muted-foreground">
              Total mensal estimado: <strong>{hoursPerMonth} horas</strong>
            </p>
          </div>
        </div>

        <div className="bg-background rounded-2xl p-6 shadow-sm border border-border/50">
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Custo no Avulso (R$ 45/h):</span>
              <span className="line-through decoration-red-500">
                R$ {costAvulso}
              </span>
            </div>
            <div className="flex justify-between items-center font-bold text-lg">
              <span>Com {recommendedPlan}:</span>
              <span className="text-primary">R$ {totalPlanCost}</span>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-xl text-center space-y-1">
                <p className="text-sm font-medium text-green-800 dark:text-green-300">
                  Sua Economia Anual
                </p>
                <p className="text-3xl font-extrabold text-green-600 dark:text-green-400">
                  R$ {yearlySavings.toLocaleString("pt-BR")}
                </p>
                <p className="text-xs text-green-700 dark:text-green-500">
                  Dinheiro que sobra no seu bolso.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section com Prova Social */}
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

      {/* Simulador (Hook de Conversão) */}
      <section className="py-10 px-4">
        <SavingsSimulator />
      </section>

      {/* Cards de Preço */}
      <section className="py-16 relative z-10">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
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
                    {/* ÁREA DE PREÇO COM ANCORAGEM */}
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
                        <span className="text-3xl font-bold text-foreground">
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

                    {/* ESCASSEZ PARA SALA EXCLUSIVA */}
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

      {/* FAQ */}
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

      {/* CTA Final */}
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
              <a href="https://wa.me/5584999999999" target="_blank">
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

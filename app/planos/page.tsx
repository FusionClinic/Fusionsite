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
  X,
  Zap,
  Calendar,
  Crown,
  Clock,
  Star,
  ArrowRight,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// DADOS OTIMIZADOS PARA VENDAS (Baseado no PDF)
const plans = [
  {
    name: "Hora Avulsa",
    description:
      "Medo de custos fixos? Pague apenas quando tiver paciente agendado.",
    price: "R$ 40",
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
    description:
      "Para quem atende pelo menos 1x na semana. Pare de perder dinheiro no avulso.",
    price: "R$ 320",
    period: "/mês",
    // ANCORAGEM: 10h x R$40 = R$400
    oldPrice: "R$ 400",
    savings: "Economize R$ 80/mês",
    priceDetail: "Sai a R$ 32/hora",
    icon: Clock,
    popular: true,
    features: [
      "Pacote de 10 horas mensais",
      "Prioridade na agenda",
      "Créditos válidos por 30 dias",
      "Divulgação no nosso site",
    ],
    cta: "Quero Economizar",
    color: "bg-primary",
    badge: "Mais Vendido",
  },
  {
    name: "Plano 20h",
    description:
      "Sua agenda lotou? Aumente sua margem de lucro reduzindo drasticamente seu custo.",
    price: "R$ 580",
    period: "/mês",
    // ANCORAGEM: 20h x R$40 = R$800
    oldPrice: "R$ 800",
    savings: "Economia de R$ 220/mês",
    priceDetail: "Apenas R$ 29/hora",
    icon: Star,
    popular: false,
    features: [
      "Menor custo por hora do mercado",
      "Armário rotativo incluso",
      "Gestão de correspondência",
      "Perfil Gold no site",
    ],
    cta: "Migrar para o 20h",
    color: "bg-purple-500",
    badge: "Maior Lucro",
  },
  {
    name: "Turnos / Diárias",
    description:
      "Concentra pacientes em um dia só? Garanta sua sala fixa naquele dia.",
    price: "R$ 300",
    period: "/diária (10h)",
    priceDetail: "R$ 30/hora",
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
      "Uso exclusivo 24h/7 dias",
      "Sua logo na porta",
      "Endereço Fiscal e Comercial",
      "Móveis e Decor inclusos",
    ],
    cta: "Ver Salas Vagas",
    color: "bg-slate-800",
    // GATILHO DE ESCASSEZ
    scarcity: "Últimas 2 unidades em Lagoa Nova",
    badge: "Premium",
  },
];

const faqs = [
  {
    question: "Como funcionam os pacotes de horas?",
    answer:
      "Você contrata um crédito de horas (10h ou 20h) para usar durante o mês. É como um plano de celular: você tem a liberdade de agendar essas horas quando quiser, garantindo um valor por hora muito mais baixo que o avulso.",
  },
  {
    question: "As horas acumulam para o próximo mês?",
    answer:
      "Os pacotes são mensais para garantir a disponibilidade da agenda. As horas devem ser utilizadas dentro do mês vigente, incentivando você a manter sua constância de atendimentos.",
  },
  {
    question: "O que está incluso na Diária?",
    answer:
      "A Diária contempla 10 horas consecutivas de uso da sala (ex: 08h às 18h) por um valor fixo de R$ 300. Ideal para quem concentra todos os atendimentos em um único dia da semana.",
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

  // Cálculos
  const hoursPerMonth = hoursPerWeek * 4;
  const costAvulso = hoursPerMonth * 40;

  let recommendedPlan = "Plano 10h";
  let planCost = 320;
  let hoursIncluded = 10;

  if (hoursPerMonth > 15) {
    recommendedPlan = "Plano 20h";
    planCost = 580;
    hoursIncluded = 20;
  }

  // Custo do plano + horas excedentes (se houver) no valor avulso
  const extraHours = Math.max(0, hoursPerMonth - hoursIncluded);
  const totalPlanCost = planCost + extraHours * 40;

  const monthlySavings = costAvulso - totalPlanCost;
  const yearlySavings = monthlySavings * 12;

  return (
    <div className="mx-auto max-w-4xl bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-8 border border-primary/20 shadow-xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="grid md:grid-cols-2 gap-10 items-center relative z-10">
        <div>
          <Badge className="mb-4 bg-primary text-primary-foreground">
            Calculadora de Lucro
          </Badge>
          <h3 className="text-2xl font-bold mb-4">Quanto você gasta hoje?</h3>
          <p className="text-muted-foreground mb-8">
            Arraste para selecionar quantas horas você atende por semana (em
            média).
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
              min={1}
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
              <span>Custo no Avulso:</span>
              <span className="line-throughdecoration-red-500">
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
              Mais de 150 consultórios ativos esperando por você
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
              O plano inteligente para quem <br className="hidden md:block" />
              <span className="text-primary">sabe até onde quer chegar</span>.
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Comece no avulso, lucre com os pacotes e conquiste sua sala
              exclusiva. Acompanhamos cada fase da sua jornada financeira.
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-start">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${index >= 3 ? "lg:col-span-1 xl:col-span-1" : ""}`}
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
                        <span className="text-xs text-muted-foreground line-through decoration-red-400">
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

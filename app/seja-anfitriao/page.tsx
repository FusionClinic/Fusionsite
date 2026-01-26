"use client"

import React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FadeInUp, StaggerContainer, StaggerItem, AnimatedCard } from "@/components/motion-wrapper"
import {
  DollarSign,
  Shield,
  CalendarClock,
  Camera,
  Settings,
  UserCheck,
  Wallet,
  ArrowRight,
  Check,
  ChevronDown,
} from "lucide-react"

// Revenue Calculator Component
function RevenueCalculator() {
  const [hourlyRate, setHourlyRate] = useState(80)
  const [hoursPerWeek, setHoursPerWeek] = useState(20)
  const monthlyRevenue = hourlyRate * hoursPerWeek * 4

  return (
    <section id="calculadora" className="py-20 lg:py-28 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <FadeInUp>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">
              Quanto você pode ganhar?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simule seus ganhos mensais baseado no preço da hora e disponibilidade do seu espaço.
            </p>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <Card className="max-w-2xl mx-auto bg-background/80 backdrop-blur-sm border-border/50 shadow-xl">
            <CardContent className="p-6 lg:p-10">
              <div className="space-y-10">
                {/* Hourly Rate Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-foreground">
                      Preço médio da sua hora
                    </label>
                    <span className="text-lg font-bold text-primary">
                      R$ {hourlyRate}
                    </span>
                  </div>
                  <Slider
                    value={[hourlyRate]}
                    onValueChange={(value) => setHourlyRate(value[0])}
                    min={30}
                    max={200}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>R$ 30</span>
                    <span>R$ 200</span>
                  </div>
                </div>

                {/* Hours Per Week Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-foreground">
                      Horas disponíveis por semana
                    </label>
                    <span className="text-lg font-bold text-primary">
                      {hoursPerWeek}h
                    </span>
                  </div>
                  <Slider
                    value={[hoursPerWeek]}
                    onValueChange={(value) => setHoursPerWeek(value[0])}
                    min={5}
                    max={60}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>5h</span>
                    <span>60h</span>
                  </div>
                </div>

                {/* Result Card */}
                <motion.div
                  key={monthlyRevenue}
                  initial={{ scale: 0.95, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 text-center border border-primary/20"
                >
                  <p className="text-sm text-muted-foreground mb-2">
                    Renda Mensal Estimada
                  </p>
                  <p className="text-4xl lg:text-5xl font-bold text-primary">
                    R$ {monthlyRevenue.toLocaleString("pt-BR")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-3">
                    *Estimativa baseada em 4 semanas por mês
                  </p>
                </motion.div>

                <Button
                  size="lg"
                  className="w-full rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25"
                >
                  Cadastrar Meu Consultório
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </FadeInUp>
      </div>
    </section>
  )
}

// Timeline Step Component
function TimelineStep({
  number,
  title,
  description,
  icon: Icon,
  isLast,
}: {
  number: number
  title: string
  description: string
  icon: React.ElementType
  isLast?: boolean
}) {
  return (
    <div className="relative flex gap-6">
      {/* Line */}
      {!isLast && (
        <div className="absolute left-6 top-14 bottom-0 w-px bg-gradient-to-b from-primary/50 to-border" />
      )}

      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25"
      >
        <Icon className="h-5 w-5" />
      </motion.div>

      {/* Content */}
      <div className="pb-10">
        <span className="text-xs font-medium text-primary uppercase tracking-wider">
          Passo {number}
        </span>
        <h3 className="text-lg font-semibold text-foreground mt-1">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  )
}

// Animated Counter Component
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const increment = target / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          setCount(target)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [isInView, target])

  return (
    <span ref={ref}>
      {count.toLocaleString("pt-BR")}
      {suffix}
    </span>
  )
}

export default function SejaAnfitriaoPage() {
  const timelineSteps = [
    {
      icon: Camera,
      title: "Cadastre seu espaço com fotos",
      description: "Tire fotos do seu consultório e envie para nós. Quanto melhor as imagens, mais rápido você recebe reservas.",
    },
    {
      icon: Settings,
      title: "Defina sua disponibilidade e preço",
      description: "Você tem controle total. Escolha os horários disponíveis e defina o valor da hora como preferir.",
    },
    {
      icon: UserCheck,
      title: "Receba profissionais verificados",
      description: "Todos os profissionais passam por verificação. Trabalhamos apenas com pessoas de confiança.",
    },
    {
      icon: Wallet,
      title: "Receba o pagamento garantido",
      description: "O dinheiro cai direto na sua conta bancária. Sem complicação, sem atrasos.",
    },
  ]

  const benefits = [
    {
      icon: DollarSign,
      title: "Pagamento Garantido",
      description: "A Fusion cuida de toda a cobrança. Você recebe, nós corremos atrás.",
    },
    {
      icon: Shield,
      title: "Segurança Jurídica",
      description: "Contratos digitais inclusos. Proteção para você e para o profissional.",
    },
    {
      icon: CalendarClock,
      title: "Gestão Zero",
      description: "Nós cuidamos do agendamento, confirmações e lembretes. Você só disponibiliza o espaço.",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-1/4 -right-1/4 h-[600px] w-[600px] rounded-full bg-primary blur-[150px]"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.03, 0.08, 0.03],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-1/4 -left-1/4 h-[500px] w-[500px] rounded-full bg-primary/50 blur-[150px]"
          />
        </div>

        <div className="mx-auto max-w-7xl px-4 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Text */}
            <FadeInUp>
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                  <DollarSign className="h-4 w-4" />
                  Renda passiva garantida
                </div>
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight text-balance">
                  Transforme sua sala ociosa em uma{" "}
                  <span className="text-primary">nova fonte de renda</span>.
                </h1>
                <p className="text-lg text-muted-foreground max-w-lg">
                  Sem custos de adesão. Segurança total. Você define as regras.
                  Cadastre seu consultório e comece a lucrar com horários vagos.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      size="lg"
                      className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25 px-8"
                      onClick={() => {
                        document.getElementById("calculadora")?.scrollIntoView({ behavior: "smooth" })
                      }}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Simular Ganhos
                        <ChevronDown className="h-4 w-4" />
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                    </Button>
                  </motion.div>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-xl bg-transparent"
                  >
                    Cadastrar Consultório
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </FadeInUp>

            {/* Right - Image */}
            <FadeInUp delay={0.2}>
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative rounded-3xl overflow-hidden shadow-2xl"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop"
                    alt="Médico analisando ganhos no tablet"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                </motion.div>

                {/* Floating Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="absolute -bottom-6 -left-6 lg:-left-10"
                >
                  <Card className="bg-background/90 backdrop-blur-xl border-border/50 shadow-xl">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
                          <DollarSign className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Ganhos este mês</p>
                          <p className="text-lg font-bold text-foreground">
                            R$ <AnimatedCounter target={4850} />
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Revenue Calculator */}
      <RevenueCalculator />

      {/* How It Works Timeline */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">
                Como funciona para anfitriões
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Cadastrar seu espaço é simples e rápido. Em poucos passos você já começa a receber reservas.
              </p>
            </div>
          </FadeInUp>

          <div className="max-w-2xl mx-auto">
            <StaggerContainer>
              {timelineSteps.map((step, index) => (
                <StaggerItem key={step.title}>
                  <TimelineStep
                    number={index + 1}
                    icon={step.icon}
                    title={step.title}
                    description={step.description}
                    isLast={index === timelineSteps.length - 1}
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">
                Por que ser anfitrião Fusion?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Resolvemos as maiores dores de quem aluga espaços de saúde.
              </p>
            </div>
          </FadeInUp>

          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <AnimatedCard key={benefit.title}>
                <Card className="h-full bg-background/80 backdrop-blur-sm border-border/50 hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
                      <benefit.icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedCard>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10" />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary blur-[200px]"
        />

        <div className="mx-auto max-w-7xl px-4 lg:px-8 relative">
          <FadeInUp>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
                Pronto para lucrar com seu espaço?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Junte-se a dezenas de clínicas que já aumentaram sua receita com a Fusion.
              </p>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="lg"
                  className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25 px-10 py-6 text-lg"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Começar Agora
                    <ArrowRight className="h-5 w-5" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                </Button>
              </motion.div>
              <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Sem custos de adesão
                </span>
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Cancelamento flexível
                </span>
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Suporte dedicado
                </span>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      <Footer />
    </main>
  )
}

"use client"

import { motion } from "framer-motion"
import { Check, Zap, Star, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion-wrapper"

const pricingPlans = [
  {
    id: "hora",
    name: "Por Hora",
    tag: "Flexibilidade Máxima",
    tagIcon: Zap,
    description: "Ideal para quem está começando ou tem agenda variável",
    price: "R$35",
    period: "/hora",
    popular: false,
    features: [
      "Acesso a qualquer consultório disponível",
      "Agendamento com até 24h de antecedência",
      "Cancelamento gratuito até 2h antes",
      "Wi-Fi e recepção inclusos",
      "Suporte via WhatsApp",
    ],
    cta: "Simular Hora",
  },
  {
    id: "turno",
    name: "Por Turno",
    tag: "Mais Popular",
    tagIcon: Star,
    description: "Perfeito para profissionais com dias fixos de atendimento",
    price: "R$120",
    period: "/turno",
    popular: true,
    features: [
      "Tudo do plano Por Hora",
      "Turnos de 4h (manhã, tarde ou noite)",
      "Economia de até 30% vs hora avulsa",
      "Prioridade na escolha de sala",
      "Desconto em turnos recorrentes",
      "Sala de espera exclusiva",
    ],
    cta: "Ver Turnos",
  },
  {
    id: "fixo",
    name: "Fixo/Mensal",
    tag: "Sua sala exclusiva",
    tagIcon: Crown,
    description: "Para quem busca um espaço fixo com sua identidade",
    price: "R$1.500",
    period: "/mês",
    popular: false,
    features: [
      "Tudo dos planos anteriores",
      "Sala exclusiva no endereço",
      "Personalização do ambiente",
      "Acesso 24h, 7 dias por semana",
      "Placa com seu nome na porta",
      "Secretária compartilhada",
      "Economia de até 50%",
    ],
    cta: "Cotar Fixo",
  },
]

export function PricingSection() {
  return (
    <section id="precos" className="relative py-24 overflow-hidden bg-muted/30">
      {/* Background */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute -right-40 -top-40 h-80 w-80 rounded-full border border-primary/10 opacity-50"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        className="absolute -left-20 -bottom-20 h-60 w-60 rounded-full border border-primary/10 opacity-30"
      />

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <FadeInUp>
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 rounded-full border-primary/20 bg-primary/5 px-4 py-1.5">
              <span className="text-sm font-medium text-primary">Preços transparentes</span>
            </Badge>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
              Liberdade para pagar como quiser
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Escolha o modelo que melhor se adapta à sua rotina. Sem surpresas, sem taxas escondidas.
            </p>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <StaggerItem key={plan.id}>
              <motion.div
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="h-full"
              >
                <Card
                  className={`relative h-full overflow-hidden border-0 bg-card/80 backdrop-blur-sm shadow-xl rounded-3xl ${
                    plan.popular
                      ? "ring-2 ring-primary shadow-primary/20"
                      : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-primary to-primary/80 px-4 py-1 text-xs font-semibold text-primary-foreground rounded-bl-2xl">
                      Recomendado
                    </div>
                  )}

                  <div className={`absolute inset-0 bg-gradient-to-br ${
                    plan.popular 
                      ? "from-primary/10 via-primary/5 to-transparent" 
                      : "from-muted/50 to-transparent"
                  }`} />

                  <CardHeader className="relative pb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                        plan.popular 
                          ? "bg-gradient-to-br from-primary to-primary/80" 
                          : "bg-primary/10"
                      }`}>
                        <plan.tagIcon className={`h-4 w-4 ${plan.popular ? "text-primary-foreground" : "text-primary"}`} />
                      </div>
                      <span className={`text-xs font-medium ${plan.popular ? "text-primary" : "text-muted-foreground"}`}>
                        {plan.tag}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>

                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-sm text-muted-foreground">{plan.period}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="relative pt-0">
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full mt-0.5 ${
                            plan.popular ? "bg-primary/20" : "bg-muted"
                          }`}>
                            <Check className={`h-3 w-3 ${plan.popular ? "text-primary" : "text-muted-foreground"}`} />
                          </div>
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button
                        className={`relative w-full h-12 overflow-hidden rounded-xl font-semibold ${
                          plan.popular
                            ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25"
                            : "bg-foreground text-background hover:bg-foreground/90"
                        }`}
                      >
                        <span className="relative z-10">{plan.cta}</span>
                        {plan.popular && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.5 }}
                          />
                        )}
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

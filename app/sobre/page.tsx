"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FadeInUp, StaggerContainer, StaggerItem, AnimatedCard } from "@/components/motion-wrapper"
import {
  Eye,
  Lightbulb,
  Users,
  Linkedin,
  ArrowRight,
  MapPin,
  Clock,
  Building2,
} from "lucide-react"

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

export default function SobrePage() {
  const values = [
    {
      icon: Eye,
      title: "Transparência",
      description: "Preços claros, sem taxas escondidas. Você sempre sabe exatamente o que está pagando.",
    },
    {
      icon: Lightbulb,
      title: "Inovação",
      description: "Tecnologia de ponta para simplificar o acesso a espaços de saúde de qualidade.",
    },
    {
      icon: Users,
      title: "Comunidade",
      description: "Construímos pontes entre profissionais e espaços, fortalecendo o ecossistema de saúde.",
    },
  ]

  const stats = [
    { value: 120, suffix: "+", label: "Salas Disponíveis", icon: Building2 },
    { value: 50, suffix: "+", label: "Cidades Atendidas", icon: MapPin },
    { value: 1000, suffix: "+", label: "Horas Reservadas", icon: Clock },
  ]

  const team = [
    {
      name: "Ana Carolina Silva",
      role: "CEO & Co-Fundadora",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
      linkedin: "#",
    },
    {
      name: "Rafael Mendes",
      role: "CTO & Co-Fundador",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      linkedin: "#",
    },
    {
      name: "Juliana Santos",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face",
      linkedin: "#",
    },
    {
      name: "Pedro Oliveira",
      role: "Head of Growth",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      linkedin: "#",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section - Storytelling */}
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
                  Nossa Missão
                </div>
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight text-balance">
                  Revolucionando o{" "}
                  <span className="text-primary">acesso à saúde</span> no Brasil.
                </h1>
                <div className="space-y-4 text-lg text-muted-foreground">
                  <p>
                    A Fusion Clinic nasceu de uma frustração real: profissionais de saúde
                    talentosos enfrentando barreiras enormes para começar ou expandir suas
                    práticas. Aluguéis caros, contratos inflexíveis e infraestrutura inadequada.
                  </p>
                  <p>
                    Nossa solução? Conectar quem tem espaço ocioso com quem precisa de um lugar
                    para atender. Simples assim. Sem burocracia, sem amarras, sem desperdício.
                  </p>
                </div>
              </div>
            </FadeInUp>

            {/* Right - Image Collage */}
            <FadeInUp delay={0.2}>
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="space-y-4">
                    <div className="rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&h=300&fit=crop"
                        alt="Consultório moderno"
                        width={400}
                        height={300}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=200&fit=crop"
                        alt="Equipe de saúde"
                        width={400}
                        height={200}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=200&fit=crop"
                        alt="Atendimento médico"
                        width={400}
                        height={200}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=400&h=300&fit=crop"
                        alt="Sala de espera"
                        width={400}
                        height={300}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-16 bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 text-primary mb-4"
                  >
                    <stat.icon className="h-8 w-8" />
                  </motion.div>
                  <p className="text-5xl lg:text-6xl font-bold text-white mb-2">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">
                Nossos Valores
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                O que guia cada decisão que tomamos na Fusion.
              </p>
            </div>
          </FadeInUp>

          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {values.map((value) => (
              <AnimatedCard key={value.title}>
                <Card className="h-full bg-background/80 backdrop-blur-sm border-border/50 hover:shadow-xl transition-shadow text-center">
                  <CardContent className="p-8">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6 mx-auto">
                      <value.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedCard>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">
                Quem faz a Fusion acontecer
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Uma equipe apaixonada por transformar a saúde no Brasil.
              </p>
            </div>
          </FadeInUp>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <StaggerItem key={member.name}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="text-center group"
                >
                  <div className="relative mb-4 mx-auto w-32 h-32">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative w-full h-full rounded-full overflow-hidden border-4 border-background shadow-xl"
                    >
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                    <motion.a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#0077B5] text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label={`LinkedIn de ${member.name}`}
                    >
                      <Linkedin className="h-4 w-4" />
                    </motion.a>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {member.role}
                  </p>
                </motion.div>
              </StaggerItem>
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
                Quer fazer parte dessa revolução?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Estamos sempre em busca de pessoas talentosas que compartilham nossa visão.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="lg"
                    className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25 px-8"
                    asChild
                  >
                    <Link href="#carreiras">
                      <span className="relative z-10 flex items-center gap-2">
                        Ver Vagas
                        <ArrowRight className="h-4 w-4" />
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                    </Link>
                  </Button>
                </motion.div>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-xl bg-transparent"
                  asChild
                >
                  <Link href="#contato">
                    Fale Conosco
                  </Link>
                </Button>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      <Footer />
    </main>
  )
}

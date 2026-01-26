"use client"

import React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { MessageCircle, Sparkles, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FadeInUp } from "@/components/motion-wrapper"

const benefits = [
  "Análise gratuita do seu perfil profissional",
  "Recomendação personalizada de plano",
  "Tour virtual pelos consultórios",
  "Desconto exclusivo na primeira reserva",
]

const specialties = [
  "Odontologia",
  "Psicologia",
  "Medicina Geral",
  "Dermatologia",
  "Estética",
  "Nutrição",
  "Fisioterapia",
  "Fonoaudiologia",
  "Outro",
]

export function LeadGenSection() {
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    specialty: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatWhatsApp(e.target.value)
    setFormData({ ...formData, whatsapp: formatted })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    // Reset form or show success message
  }

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-muted/30 to-background" />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-1/4 top-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-primary/10 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left Content */}
          <FadeInUp>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Consultoria Gratuita</span>
              </div>

              <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance leading-tight">
                Não sabe qual plano é o ideal?
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Converse com nossos consultores para entender se o plano Hora, Turno ou Fixo traz mais ROI para sua carreira.
              </p>

              <ul className="space-y-3">
                {benefits.map((benefit) => (
                  <motion.li
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </FadeInUp>

          {/* Right Form */}
          <FadeInUp delay={0.2}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="relative overflow-hidden border-0 bg-card/80 backdrop-blur-xl shadow-2xl shadow-black/10 rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
                <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />
                
                <CardHeader className="relative pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80">
                      <MessageCircle className="h-5 w-5 text-primary-foreground" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">
                    Receba uma consultoria grátis
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Preencha seus dados e entraremos em contato em até 24h
                  </p>
                </CardHeader>

                <CardContent className="relative pt-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Nome completo
                      </Label>
                      <Input
                        id="name"
                        placeholder="Dr(a). João Silva"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="h-12 rounded-xl border-border/50 bg-background/50 focus:border-primary focus:ring-primary/20"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="whatsapp" className="text-sm font-medium">
                        WhatsApp
                      </Label>
                      <Input
                        id="whatsapp"
                        placeholder="(11) 99999-9999"
                        value={formData.whatsapp}
                        onChange={handleWhatsAppChange}
                        className="h-12 rounded-xl border-border/50 bg-background/50 focus:border-primary focus:ring-primary/20"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="specialty" className="text-sm font-medium">
                        Qual sua especialidade?
                      </Label>
                      <Select
                        value={formData.specialty}
                        onValueChange={(value) => setFormData({ ...formData, specialty: value })}
                      >
                        <SelectTrigger className="h-12 w-full rounded-xl border-border/50 bg-background/50 focus:border-primary focus:ring-primary/20">
                          <SelectValue placeholder="Selecione sua especialidade" />
                        </SelectTrigger>
                        <SelectContent>
                          {specialties.map((specialty) => (
                            <SelectItem key={specialty} value={specialty.toLowerCase()}>
                              {specialty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="relative w-full h-13 overflow-hidden rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold shadow-lg shadow-primary/25"
                      >
                        <motion.div
                          animate={isSubmitting ? {} : { scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80"
                        />
                        <span className="relative z-10">
                          {isSubmitting ? "Enviando..." : "Quero falar com um especialista"}
                        </span>
                        {!isSubmitting && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          />
                        )}
                      </Button>
                    </motion.div>

                    <p className="text-center text-xs text-muted-foreground">
                      Seus dados estão seguros conosco. Sem spam, prometemos.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </FadeInUp>
        </div>
      </div>
    </section>
  )
}

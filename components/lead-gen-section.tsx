"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FadeInUp } from "@/components/motion-wrapper";
import { trackEvent } from "@/lib/tracking"; // Importando o rastreador sênior

const benefits = [
  "Análise gratuita do seu perfil profissional",
  "Recomendação personalizada de plano (Hora ou Turno)",
  "Tour virtual pelos consultórios em Lagoa Nova",
  "Desconto exclusivo na primeira reserva",
];

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
];

export function LeadGenSection() {
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    specialty: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7)
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatWhatsApp(e.target.value);
    setFormData({ ...formData, whatsapp: formatted });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Rastreamento Sênior: Enviando o Lead para o CAPI e Pixel
    await trackEvent("Lead", {
      content_name: "Consultoria Gratuita Fusion Clinic",
      content_category: formData.specialty,
      value: 0.0,
      currency: "BRL",
    });

    // 2. Simulação de Integração (Pode ser substituído por envio para CRM ou Email)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Opcional: Redirecionar para o WhatsApp após o cadastro
    const msg = encodeURIComponent(
      `Olá! Sou o(a) ${formData.name} e acabei de solicitar uma consultoria de plano para a especialidade de ${formData.specialty}.`,
    );
    window.open(`https://wa.me/5511919119054?text=${msg}`, "_blank");
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Decorativo */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-muted/30 to-background" />

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Lado Esquerdo: Texto de Autoridade */}
          <FadeInUp>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Consultoria Estratégica
                </span>
              </div>

              <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance leading-tight">
                Qual o melhor modelo de sala para o seu momento?
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Nossos especialistas em Natal ajudam você a calcular qual plano
                (Hora, Turno ou Fixo) traz o maior retorno financeiro para sua
                agenda.
              </p>

              <ul className="space-y-3">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInUp>

          {/* Lado Direito: Formulário de Alta Conversão */}
          <FadeInUp delay={0.2}>
            <Card className="relative overflow-hidden border-0 bg-card/80 backdrop-blur-xl shadow-2xl rounded-3xl">
              <CardHeader className="relative pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80">
                    <MessageCircle className="h-5 w-5 text-primary-foreground" />
                  </div>
                </div>
                <CardTitle className="text-xl font-bold">
                  Falar com Especialista
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Entraremos em contato via WhatsApp em até 24h
                </p>
              </CardHeader>

              <CardContent className="relative pt-4">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 space-y-4"
                  >
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mb-2">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <h3 className="text-xl font-bold">Solicitação Enviada!</h3>
                    <p className="text-muted-foreground">
                      Estamos preparando sua análise de perfil. Redirecionando
                      para o WhatsApp...
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo</Label>
                      <Input
                        id="name"
                        placeholder="Dr(a). Nome Sobrenome"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="h-12 rounded-xl"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="whatsapp">WhatsApp</Label>
                      <Input
                        id="whatsapp"
                        placeholder="(84) 99999-9999"
                        value={formData.whatsapp}
                        onChange={handleWhatsAppChange}
                        className="h-12 rounded-xl"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="specialty">Sua Especialidade</Label>
                      <Select
                        value={formData.specialty}
                        onValueChange={(v) =>
                          setFormData({ ...formData, specialty: v })
                        }
                      >
                        <SelectTrigger className="h-12 rounded-xl">
                          <SelectValue placeholder="Selecione sua área" />
                        </SelectTrigger>
                        <SelectContent>
                          {specialties.map((s) => (
                            <SelectItem key={s} value={s.toLowerCase()}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/25"
                    >
                      {isSubmitting
                        ? "Processando..."
                        : "Receber Consultoria Grátis"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}

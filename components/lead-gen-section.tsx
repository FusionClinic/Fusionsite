"use client";

import React, { useState, useEffect } from "react"; // Adicionei useEffect
import { motion } from "framer-motion";
import {
  MessageCircle,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"; // AlertCircle para erro
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
import { trackEvent } from "@/lib/tracking";
import { submitLead } from "@/app/actions"; // IMPORTANTE: Importar a Server Action

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

// Estado inicial do formulário
const initialState = {
  success: false,
  message: "",
  errors: {},
};

export function LeadGenSection() {
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    specialty: "",
  });

  // Estado local para controle de UI (loading/sucesso)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverState, setServerState] = useState(initialState);

  // Formatação de WhatsApp
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

  // Handler de envio modificado
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setServerState(initialState); // Reseta erros anteriores

    // 1. Prepara FormData para enviar ao Server Action
    const dataToSend = new FormData();
    dataToSend.append("name", formData.name);
    dataToSend.append("whatsapp", formData.whatsapp);
    dataToSend.append("specialty", formData.specialty);

    // 2. Chama a Server Action
    const result = await submitLead(null, dataToSend);
    setServerState(result as any);
    setIsSubmitting(false);

    // 3. Se sucesso, rastreia e redireciona
    if (result.success) {
      await trackEvent("Lead", {
        content_name: "Consultoria Gratuita Fusion Clinic",
        content_category: formData.specialty,
        value: 0.0,
        currency: "BRL",
      });

      // Redirecionamento para WhatsApp (Opcional, mas recomendado para conversão)
      setTimeout(() => {
        const msg = encodeURIComponent(
          `Olá! Sou o(a) ${formData.name} e acabei de solicitar uma consultoria de plano para a especialidade de ${formData.specialty}.`,
        );
        window.open(`https://wa.me/5511919119054?text=${msg}`, "_blank");
      }, 2000);
    }
  };

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-muted/30 to-background" />

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Lado Esquerdo (Texto) - Mantido igual */}
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

          {/* Lado Direito (Formulário Atualizado) */}
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
                {serverState.success ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 space-y-4"
                  >
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mb-2">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <h3 className="text-xl font-bold text-green-700">
                      Solicitação Enviada!
                    </h3>
                    <p className="text-muted-foreground">
                      Seus dados foram salvos com segurança. Estamos te
                      redirecionando para o WhatsApp...
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Mensagem de Erro Geral */}
                    {!serverState.success && serverState.message && (
                      <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {serverState.message}
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo</Label>
                      <Input
                        id="name"
                        name="name" // Importante para o FormData
                        placeholder="Dr(a). Nome Sobrenome"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="h-12 rounded-xl"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="whatsapp">WhatsApp</Label>
                      <Input
                        id="whatsapp"
                        name="whatsapp" // Importante para o FormData
                        placeholder="(84) 99999-9999"
                        value={formData.whatsapp}
                        onChange={handleWhatsAppChange}
                        className="h-12 rounded-xl"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="specialty">Sua Especialidade</Label>
                      <Select
                        name="specialty" // Importante: Select do Shadcn precisa de tratamento ou input hidden se usar FormData puro, mas aqui estamos controlando o value
                        value={formData.specialty}
                        onValueChange={(v) =>
                          setFormData({ ...formData, specialty: v })
                        }
                        disabled={isSubmitting}
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
                      {/* Input hidden para garantir que o FormData pegue o valor do Select se falhar */}
                      <input
                        type="hidden"
                        name="specialty"
                        value={formData.specialty}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 animate-spin" />{" "}
                          Processando...
                        </span>
                      ) : (
                        "Receber Consultoria Grátis"
                      )}
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

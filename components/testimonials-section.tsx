"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion-wrapper";

const testimonials = [
  {
    id: 1,
    name: "Dra. Mariana Silva",
    role: "Psicóloga",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80",
    rating: 5,
    review:
      "Atendo meus pacientes no Tirol e a estrutura é impecável. O isolamento acústico das salas de psicologia da Fusion faz toda a diferença para minha prática.",
  },
  {
    id: 2,
    name: "Dr. Carlos Mendes",
    role: "Dentista",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80",
    rating: 5,
    review:
      "A sala odontológica já vem com autoclave e raio-x, o que me economizou um investimento gigante. Recomendo para quem está começando em Natal.",
  },
  {
    id: 3,
    name: "Dra. Ana Beatriz Costa",
    role: "Nutricionista",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80",
    rating: 5,
    review:
      "Localização perfeita em Petrópolis. Meus pacientes adoram a facilidade de estacionamento e a recepção. Zero dor de cabeça com boletos de aluguel.",
  },
];

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        className="absolute -right-20 top-1/4 h-40 w-40 rounded-full border border-primary/10"
      />

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <FadeInUp>
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="mb-4 rounded-full border-primary/20 bg-primary/5 px-4 py-1.5"
            >
              <span className="text-sm font-medium text-primary">
                +300 profissionais em Natal
              </span>
            </Badge>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              O Que Profissionais Acham Da{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Fusion
              </span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Veja o que médicos e terapeutas de Natal estão falando sobre nossa
              estrutura.
            </p>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.id}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="h-full"
              >
                <Card className="relative h-full overflow-hidden border-0 bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all rounded-2xl group">
                  <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Quote className="h-12 w-12 text-primary" />
                  </div>
                  <CardContent className="p-6 space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="relative h-12 w-12"
                        >
                          <Image
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="rounded-full object-cover ring-2 ring-primary/20"
                            sizes="48px"
                          />
                          <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-card z-10" />
                        </motion.div>
                        <div>
                          <p className="font-semibold text-foreground">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                      <GoogleIcon />
                    </div>

                    <div className="flex gap-0.5">
                      {Array.from({ length: testimonial.rating }).map(
                        (_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          </motion.div>
                        ),
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                      {`"${testimonial.review}"`}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

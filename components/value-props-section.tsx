"use client";

import {
  ShieldCheck,
  Wifi,
  Coffee,
  CalendarCheck,
  Armchair,
  Key,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: ShieldCheck,
    title: "Sem Burocracia",
    description: "Esqueça fiador ou contratos longos. Comece hoje.",
  },
  {
    icon: Wifi,
    title: "Internet Dedicada",
    description: "Link redundante de alta velocidade para telemedicina.",
  },
  {
    icon: Coffee,
    title: "Copa & Amenities",
    description: "Café e água em ambiente de descompressão.",
  },
  {
    icon: Armchair,
    title: "Mobiliário Premium",
    description: "Poltronas ergonômicas e decoração de alto padrão.",
  },
  {
    icon: CalendarCheck,
    title: "Gestão Online",
    description: "Reserve horários e pagamentos pelo sistema.",
  },
  {
    icon: Key,
    title: "Acesso Inteligente",
    description: "Entrada via QR Code ou Biometria 24h.",
  },
];

export function ValuePropsSection() {
  return (
    <section className="py-12 md:py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
          <Badge
            variant="outline"
            className="mb-3 border-primary/20 text-primary bg-primary/5 px-3 py-1 uppercase tracking-widest text-[10px] font-bold"
          >
            Infraestrutura
          </Badge>
          <h2 className="text-2xl md:text-5xl font-bold tracking-tight text-foreground mb-3">
            Tudo para atender com{" "}
            <span className="text-primary">excelência.</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg leading-relaxed max-w-xl mx-auto">
            Cuidamos da operação para você focar apenas no paciente.
          </p>
        </div>

        {/* GRID RESPONSIVO:
          - Mobile: grid-cols-2 (Duas colunas, compacto)
          - Desktop: md:grid-cols-3 (Três colunas, espaçado)
        */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border border-border/40 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:bg-card hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              {/* Padding Reduzido (p-4) no mobile para ficar compacto */}
              <CardContent className="p-4 md:p-8 flex flex-col items-start h-full">
                <div className="mb-3 md:mb-6 inline-flex h-8 w-8 md:h-12 md:w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors">
                  <feature.icon className="h-4 w-4 md:h-6 md:w-6" />
                </div>

                <h3 className="text-sm md:text-xl font-bold text-foreground mb-1 md:mb-3 leading-tight">
                  {feature.title}
                </h3>

                <p className="text-xs md:text-base text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

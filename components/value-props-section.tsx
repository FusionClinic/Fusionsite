"use client";

import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion-wrapper";
import {
  Wallet,
  Clock,
  MapPin,
  Shield,
  Armchair,
  FileCheck,
} from "lucide-react";

const features = [
  {
    icon: Wallet,
    title: "Zero Custo Fixo",
    description:
      "Esqueça aluguel, condomínio, IPTU, energia e internet. Pague apenas pelo tempo que usar.",
    color: "text-green-600",
    bgColor: "bg-green-600/10",
  },
  {
    icon: FileCheck,
    title: "Sem Burocracia",
    description:
      "Contratação 100% digital. Sem fiador, sem caução e sem contratos de fidelidade abusivos.",
    color: "text-blue-600",
    bgColor: "bg-blue-600/10",
  },
  {
    icon: Clock,
    title: "Flexibilidade Total",
    description:
      "Agende por hora ou garanta turnos fixos. Sua agenda se adapta à sua demanda real.",
    color: "text-orange-600",
    bgColor: "bg-orange-600/10",
  },
  {
    icon: Armchair,
    title: "Alto Padrão Pronto",
    description:
      "Consultórios mobiliados e decorados, com recepção e climatização. É só chegar e atender.",
    color: "text-purple-600",
    bgColor: "bg-purple-600/10",
  },
  {
    icon: MapPin,
    title: "Localização Premium",
    description:
      "Em Lagoa Nova, o coração médico de Natal. Fácil acesso para você e seus pacientes.",
    color: "text-red-600",
    bgColor: "bg-red-600/10",
  },
  {
    icon: Shield,
    title: "Segurança Total",
    description:
      "Ambiente monitorado 24h, controle de acesso e total privacidade para seus atendimentos.",
    color: "text-teal-600",
    bgColor: "bg-teal-600/10",
  },
];

export function ValuePropsSection() {
  return (
    <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
      {/* Elementos de fundo sutis para dar profundidade */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-soft-light" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-soft-light" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <FadeInUp className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl leading-tight">
            Tudo o que você precisa para atender com{" "}
            <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              excelência
            </span>
            .
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Eliminamos as barreiras do consultório tradicional para você focar
            no que realmente importa: seus pacientes.
          </p>
        </FadeInUp>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {features.map((feature) => (
            <StaggerItem key={feature.title} className="h-full">
              <div className="group relative h-full p-8 rounded-3xl bg-card border border-border/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgb(var(--primary),0.15)] dark:hover:shadow-[0_8px_30px_rgb(var(--primary),0.1)] transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                {/* Efeito de brilho no hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div
                  className={`relative inline-flex p-4 rounded-2xl ${feature.bgColor} ${feature.color} ring-1 ring-inset ring-black/5 dark:ring-white/10 mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="h-7 w-7" strokeWidth={1.5} />
                </div>

                <h3 className="relative text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="relative text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

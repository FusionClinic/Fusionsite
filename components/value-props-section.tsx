"use client";

import { motion } from "framer-motion";
import { DollarSign, Calendar, Building, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion-wrapper";

const valueProps = [
  {
    icon: DollarSign,
    title: "Economia Inteligente",
    description:
      "Pague apenas pelo tempo que usar. Sem custos fixos, sem desperdício. Ideal para quem está começando ou expandindo.",
  },
  {
    icon: Calendar,
    title: "Flexibilidade Total",
    description:
      "Agende por hora, turno ou período fixo. Adapte sua agenda às suas necessidades e atenda quando quiser.",
  },
  {
    icon: Building,
    title: "Estrutura Premium",
    description:
      "Recepção, Wi-Fi de alta velocidade, limpeza e manutenção inclusos. Chegue e atenda com tranquilidade.",
  },
  {
    icon: Users,
    title: "Comunidade Fusion",
    description:
      "Faça parte de uma rede de profissionais da saúde. Networking, indicações e oportunidades de crescimento.",
  },
];

export function ValuePropsSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <FadeInUp>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
              Chega De Custos Fixos E Contratos De Longo Prazo!
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              A Fusion Clinic oferece a solução perfeita para profissionais da
              saúde que buscam liberdade e economia.
            </p>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {valueProps.map((prop) => (
            <StaggerItem key={prop.title}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Card className="relative h-full overflow-hidden border-0 bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow rounded-2xl group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardContent className="relative pt-6">
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                      className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 mb-4 group-hover:from-primary group-hover:to-primary/80 transition-all"
                    >
                      <prop.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {prop.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {prop.description}
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

"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Users, Trophy, Building2 } from "lucide-react";

const stats = [
  {
    id: 1,
    label: "Profissionais",
    value: "+350",
    icon: Users,
    description: " de saúde Ativos",
  },
  {
    id: 2,
    label: "Horas Realizadas",
    value: "+2,5k",
    icon: Building2,
    description: "Atendimentos em 2025",
  },
  {
    id: 3,
    label: "Economia Gerada",
    value: "60%",
    icon: Trophy,
    description: "Vs. Aluguel Convencional",
  },
  {
    id: 4,
    label: "Ambiente Seguro",
    value: "100%",
    icon: ShieldCheck,
    description: "Monitorado 24h",
  },
];

export function AuthorityBanner() {
  return (
    // MUDANÇA AQUI: Gradiente escuro e rico, texto claro
    <section className="w-full bg-gradient-to-r from-orange-700 via-orange-600 to-amber-600 py-10 lg:py-12 shadow-xl shadow-orange-900/20 relative overflow-hidden">
      {/* Efeito de brilho sutil no fundo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-400/20 to-transparent opacity-50 mix-blend-overlay pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center sm:items-start sm:text-left group"
            >
              {/* Ícone com fundo dourado sutil */}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-amber-200 backdrop-blur-sm border border-white/20 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                <stat.icon className="h-6 w-6 drop-shadow-sm" />
              </div>
              <div className="space-y-1 text-white">
                <h3 className="text-4xl font-extrabold tracking-tight leading-none drop-shadow-sm">
                  {stat.value}
                </h3>
                <p className="text-sm font-bold text-amber-200 uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="text-xs text-orange-100/80 font-medium">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

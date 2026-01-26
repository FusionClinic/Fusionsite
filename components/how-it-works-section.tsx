"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Search, CreditCard, CheckCircle } from "lucide-react"
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion-wrapper"

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Escolha a sala e o horário na nossa plataforma.",
    description: "Navegue por centenas de opções, filtre por localização, especialidade e preço.",
  },
  {
    number: "02",
    icon: CreditCard,
    title: "Faça a reserva e o pagamento seguro em segundos.",
    description: "Processo 100% digital com pagamento via PIX, cartão ou boleto.",
  },
  {
    number: "03",
    icon: CheckCircle,
    title: "Pronto! Chegue e atenda seu paciente.",
    description: "Receba as instruções de acesso e comece a atender imediatamente.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-[#0f0f0f] relative overflow-hidden">
      {/* Background Effects */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-primary blur-[120px]"
      />

      <div className="mx-auto max-w-7xl px-4 lg:px-8 relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: Phone Mockup */}
          <FadeInUp>
            <div className="relative flex justify-center lg:justify-start">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                {/* Phone Frame */}
                <div className="relative w-64 h-[520px] bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-[3rem] p-2 shadow-2xl border border-[#3a3a3a]">
                  <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                  <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                    {/* Phone Screen Content */}
                    <div className="h-full bg-gradient-to-b from-primary/10 to-white p-4">
                      <div className="space-y-3">
                        <motion.div
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="h-8 bg-primary/20 rounded-xl"
                        />
                        <div className="h-32 bg-muted rounded-xl overflow-hidden">
                          <img
                            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=200&h=150&fit=crop&q=80"
                            alt="Consultório"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="h-24 bg-muted rounded-xl p-3">
                          <div className="h-3 w-3/4 bg-gray-200 rounded mb-2" />
                          <div className="h-3 w-1/2 bg-gray-200 rounded mb-2" />
                          <div className="h-3 w-2/3 bg-gray-200 rounded" />
                        </div>
                        <div className="h-24 bg-muted rounded-xl p-3">
                          <div className="h-3 w-2/3 bg-gray-200 rounded mb-2" />
                          <div className="h-3 w-3/4 bg-gray-200 rounded mb-2" />
                          <div className="h-3 w-1/2 bg-gray-200 rounded" />
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="h-12 bg-gradient-to-r from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg shadow-primary/30"
                        >
                          <span className="text-white text-sm font-medium">Reservar Agora</span>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  {/* Notch */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#0f0f0f] rounded-full" />
                </div>

                {/* Decorative Elements */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-6 -right-6 w-32 h-32 bg-primary/30 rounded-full blur-2xl"
                />
                <motion.div
                  animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-6 -left-6 w-40 h-40 bg-primary/20 rounded-full blur-2xl"
                />
              </motion.div>
            </div>
          </FadeInUp>

          {/* Right: Steps */}
          <div className="space-y-8">
            <FadeInUp>
              <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl text-balance leading-tight">
                Nossa Solução Foi Pensada Para Você{" "}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Profissional Da Saúde.
                </span>
              </h2>
            </FadeInUp>

            <StaggerContainer className="space-y-4">
              {steps.map((step, index) => (
                <StaggerItem key={step.number}>
                  <motion.div
                    whileHover={{ x: 8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="flex gap-4 p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors group"
                  >
                    <div className="flex-shrink-0">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/30 group-hover:from-primary group-hover:to-primary/80 transition-all"
                      >
                        <step.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                      </motion.div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-primary">{step.number}</span>
                        <h3 className="text-base font-semibold text-white">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <FadeInUp delay={0.4}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground h-14 text-base font-semibold shadow-xl shadow-primary/25"
                >
                  <span className="relative z-10">Isso é ECONOMIA! Isso é FUSION CLINIC!!</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                </Button>
              </motion.div>
            </FadeInUp>
          </div>
        </div>
      </div>
    </section>
  )
}

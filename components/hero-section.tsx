"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Star, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeInUp } from "@/components/motion-wrapper"

const filterOptions = [
  { id: "hora", label: "Hora" },
  { id: "turno", label: "Turno" },
  { id: "fixo", label: "Fixo" },
]

const floatingStats = [
  { icon: Star, value: "4.9", label: "Avaliação média", delay: 0.8 },
  { icon: MapPin, value: "+500", label: "Consultórios", delay: 1.0 },
  { icon: Clock, value: "24h", label: "Acesso", delay: 1.2 },
]

export function HeroSection() {
  const [activeFilter, setActiveFilter] = useState("hora")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-background">
      {/* Animated Gradient Mesh Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-primary/20 to-primary/5 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute left-1/4 bottom-0 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-primary/15 to-transparent blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-0 top-1/3 h-[400px] w-[400px] rounded-full bg-gradient-to-r from-primary/10 to-transparent blur-3xl"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left Content */}
          <div className="space-y-8">
            <FadeInUp>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance leading-[1.1]">
                CONECTAMOS PROFISSIONAIS DA SAÚDE À{" "}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  consultórios mobiliados.
                </span>
              </h1>
            </FadeInUp>

            <FadeInUp delay={0.1}>
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                Encontre o espaço ideal para atender seus pacientes. Alugue por hora, turno ou período fixo com total flexibilidade.
              </p>
            </FadeInUp>

            {/* Search Bar */}
            <FadeInUp delay={0.2}>
              <div className="space-y-4">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
                    <Search className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar consultórios mobiliados..."
                    className="h-14 w-full rounded-2xl border border-border bg-card/80 backdrop-blur-sm pl-14 pr-4 text-base text-foreground shadow-lg shadow-black/5 placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                  />
                </div>

                {/* Filter Toggles */}
                <div className="flex flex-wrap items-center gap-2">
                  {filterOptions.map((option) => (
                    <motion.button
                      key={option.id}
                      onClick={() => setActiveFilter(option.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                        activeFilter === option.id
                          ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25"
                          : "bg-muted/80 text-muted-foreground hover:bg-muted backdrop-blur-sm"
                      }`}
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-xl shadow-primary/25 h-13 px-8 text-base font-semibold sm:w-auto"
                  >
                    <span className="relative z-10">Buscar Consultórios</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </Button>
                </motion.div>
              </div>
            </FadeInUp>
          </div>

          {/* Right Visual */}
          <div className="relative hidden lg:block">
            <FadeInUp delay={0.3}>
              <div className="relative aspect-square">
                {/* Main Image Container with Glassmorphism */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-1"
                >
                  <div className="relative h-full w-full overflow-hidden rounded-[22px] bg-card/50 backdrop-blur-sm shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=600&fit=crop&q=80"
                      alt="Consultório moderno e equipado"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>
                </motion.div>

                {/* Floating Stats Cards */}
                {floatingStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: stat.delay }}
                    className={`absolute rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl p-4 shadow-xl ${
                      index === 0 ? "-left-6 bottom-32" : index === 1 ? "-right-6 top-20" : "left-1/2 -bottom-4 -translate-x-1/2"
                    }`}
                  >
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10">
                          <stat.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-lg font-bold text-foreground">{stat.value}</p>
                          <p className="text-xs text-muted-foreground">{stat.label}</p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}

                {/* Review Bubble */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                  className="absolute -left-2 top-16 max-w-[200px] rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl p-3 shadow-lg"
                >
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="flex items-start gap-2">
                      <img
                        src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=40&h=40&fit=crop&q=80"
                        alt="Dra. Ana"
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-xs font-medium text-foreground">Dra. Ana Silva</p>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                          ))}
                        </div>
                        <p className="mt-1 text-[10px] text-muted-foreground leading-relaxed">
                          {"\"Excelente estrutura!\""}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ArrowRight, Sparkles } from "lucide-react"
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion-wrapper"

const faqs = [
  {
    question: "Como funciona o sistema de reservas?",
    answer: "É simples! Você escolhe o consultório, seleciona o horário disponível, realiza o pagamento online e pronto. Você receberá todas as instruções de acesso por e-mail e WhatsApp.",
  },
  {
    question: "Posso cancelar uma reserva?",
    answer: "Sim! Cancelamentos com até 24 horas de antecedência são reembolsados integralmente. Para cancelamentos com menos de 24 horas, aplicamos uma taxa de 50%.",
  },
  {
    question: "Os consultórios possuem equipamentos?",
    answer: "Sim! Cada consultório é equipado de acordo com a especialidade. Consultórios odontológicos têm cadeira completa, salas médicas têm maca e equipamentos básicos, e salas de psicologia têm mobiliário adequado.",
  },
  {
    question: "Como me torno um anfitrião?",
    answer: "Se você possui um consultório ocioso, pode cadastrá-lo na nossa plataforma. Faremos uma avaliação do espaço e, se aprovado, você começa a receber reservas e gerar renda extra.",
  },
]

const blogPosts = [
  {
    category: "Gestão",
    title: "5 Dicas para Organizar sua Agenda de Atendimentos",
    excerpt: "Aprenda estratégias práticas para otimizar seu tempo e atender mais pacientes.",
  },
  {
    category: "Finanças",
    title: "Como Reduzir Custos sem Perder Qualidade no Atendimento",
    excerpt: "Descubra como a economia compartilhada está revolucionando a área da saúde.",
  },
  {
    category: "Marketing",
    title: "Instagram para Profissionais da Saúde: Guia Completo",
    excerpt: "Construa sua presença digital e atraia novos pacientes de forma ética.",
  },
]

export function FaqBlogSection() {
  return (
    <section id="blog" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* FAQ Column */}
          <div className="space-y-8">
            <FadeInUp>
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-4">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Dúvidas frequentes</span>
                </div>
                <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                  Perguntas Frequentes
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Tire suas dúvidas sobre a Fusion Clinic.
                </p>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.1}>
              <Accordion type="single" collapsible className="w-full space-y-3">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border border-border/50 rounded-2xl px-4 bg-card/50 backdrop-blur-sm data-[state=open]:bg-card data-[state=open]:shadow-md transition-all"
                  >
                    <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-4 [&[data-state=open]>svg]:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  className="rounded-xl border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                >
                  Mais Perguntas
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </FadeInUp>
          </div>

          {/* Blog Column */}
          <div className="space-y-8">
            <FadeInUp>
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-4">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Blog</span>
                </div>
                <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                  Leia E Compartilhe Insights
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Conteúdo exclusivo para profissionais da saúde.
                </p>
              </div>
            </FadeInUp>

            <StaggerContainer className="space-y-4">
              {blogPosts.map((post) => (
                <StaggerItem key={post.title}>
                  <motion.article
                    whileHover={{ x: 8, scale: 1.01 }}
                    transition={{ duration: 0.3 }}
                    className="group p-5 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:shadow-lg hover:border-primary/20 transition-all cursor-pointer"
                  >
                    <span className="inline-block text-xs font-semibold text-primary uppercase tracking-wide bg-primary/10 px-2 py-1 rounded-md">
                      {post.category}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Ler mais <ArrowRight className="h-4 w-4" />
                    </div>
                  </motion.article>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <FadeInUp delay={0.3}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                  Acessar Blog
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </FadeInUp>
          </div>
        </div>
      </div>
    </section>
  )
}

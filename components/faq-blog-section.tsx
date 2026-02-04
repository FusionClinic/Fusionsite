"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, HelpCircle, ChevronRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Post } from "@/lib/get-recent-posts";

// FAQ Estático (Perguntas Frequentes não mudam toda hora)
const faqs = [
  {
    question: "Preciso pagar taxa de condomínio ou luz?",
    answer:
      "Não. O valor da hora ou do turno já inclui todas as despesas: água, luz, internet, limpeza, recepcionista e IPTU. Você só paga pelo uso.",
  },
  {
    question: "Como funciona o agendamento de salas?",
    answer:
      "É 100% online. Após o cadastro aprovado, você acessa nosso sistema, vê a disponibilidade em tempo real e reserva o horário que precisa.",
  },
  {
    question: "O contrato tem fidelidade?",
    answer:
      "Temos planos flexíveis. No modelo 'Pay-per-use' (por hora), não há fidelidade. Nos planos mensais de turnos fixos, o contrato é renovável a cada 6 meses.",
  },
  {
    question: "Posso usar o endereço para divulgar meu trabalho?",
    answer:
      "Sim! Ao se tornar um membro Fusion (mesmo no plano por hora), você pode utilizar nosso endereço comercial em seus cartões de visita e Google Meu Negócio.",
  },
];

interface FaqBlogSectionProps {
  posts?: Post[];
}

export function FaqBlogSection({ posts = [] }: FaqBlogSectionProps) {
  return (
    <section className="py-24 bg-muted/30" id="faq">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* COLUNA DA ESQUERDA: FAQ */}
          <div>
            <div className="mb-10">
              <Badge
                variant="outline"
                className="mb-4 bg-background text-primary border-primary/20"
              >
                <HelpCircle className="w-3 h-3 mr-1" /> Dúvidas Comuns
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Perguntas Frequentes
              </h2>
              <p className="text-muted-foreground">
                Tudo o que você precisa saber sobre o funcionamento da Fusion
                Clinic.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-border/50"
                >
                  <AccordionTrigger className="text-left font-semibold hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-8">
              <p className="text-sm text-muted-foreground mb-4">
                Ainda tem dúvidas?
              </p>
              <Button variant="outline" asChild className="rounded-xl">
                <Link href="https://wa.me/5584999999999">
                  Falar com Consultor
                </Link>
              </Button>
            </div>
          </div>

          {/* COLUNA DA DIREITA: BLOG (Dinâmico) */}
          <div className="relative">
            {/* Se não tiver posts, mostra um card genérico ou esconde */}
            {posts.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <Badge
                      variant="outline"
                      className="mb-4 bg-background text-primary border-primary/20"
                    >
                      Blog
                    </Badge>
                    <h2 className="text-3xl font-bold tracking-tight">
                      Leia e Compartilhe Insights
                    </h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="hidden sm:flex"
                  >
                    <Link href="/blog" className="gap-2 text-primary">
                      Ver tudo <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>

                <div className="space-y-6">
                  {posts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="block group"
                    >
                      <Card className="flex flex-col sm:flex-row overflow-hidden border-border/50 bg-background hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                        {/* Imagem Pequena */}
                        <div className="relative h-48 sm:h-auto sm:w-48 shrink-0 overflow-hidden">
                          <Image
                            src={post.cover_image || "/placeholder.jpg"}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>

                        {/* Conteúdo */}
                        <div className="p-5 flex flex-col justify-center flex-1">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                            <Badge
                              variant="secondary"
                              className="text-[10px] h-5 px-2"
                            >
                              {post.category}
                            </Badge>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(post.created_at).toLocaleDateString(
                                "pt-BR",
                              )}
                            </span>
                          </div>
                          <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                            {post.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                            {post.excerpt}
                          </p>
                          <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                            Ler artigo <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>

                <div className="mt-8 text-center sm:hidden">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/blog">Ver todos os artigos</Link>
                  </Button>
                </div>
              </>
            ) : (
              // Fallback se não tiver posts (opcional)
              <div className="h-full flex items-center justify-center border-2 border-dashed rounded-3xl border-muted p-10 text-center">
                <div className="max-w-xs">
                  <h3 className="text-lg font-bold mb-2">Blog em breve</h3>
                  <p className="text-muted-foreground text-sm">
                    Estamos preparando conteúdos incríveis para impulsionar sua
                    carreira.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

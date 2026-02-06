import Link from "next/link";
import { Header } from "@/components/header"; //
import { Footer } from "@/components/footer"; //
import { Button } from "@/components/ui/button"; //
import { FadeInUp } from "@/components/motion-wrapper"; //
import { FileQuestion, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="text-center space-y-8 max-w-lg mx-auto">
          <FadeInUp>
            <div className="relative inline-block">
              {/* Efeito de Glow atrás do ícone */}
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
              <div className="relative bg-card border border-border p-6 rounded-3xl shadow-2xl">
                <FileQuestion className="w-16 h-16 text-primary" />
              </div>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              404
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold text-muted-foreground mt-2">
              Página não encontrada
            </h2>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <p className="text-muted-foreground leading-relaxed">
              Ops! Parece que a página que você está procurando não existe ou
              mudou de endereço. Não se preocupe, nossos consultórios continuam
              no mesmo lugar.
            </p>
          </FadeInUp>

          <FadeInUp delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                asChild
                size="lg"
                className="rounded-xl font-bold shadow-lg shadow-primary/20"
              >
                <Link href="/">
                  <Home className="mr-2 w-4 h-4" />
                  Voltar para o Início
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-xl"
              >
                <Link href="/espacos">Ver Salas Disponíveis</Link>
              </Button>
            </div>
          </FadeInUp>
        </div>
      </div>

      <Footer />
    </main>
  );
}

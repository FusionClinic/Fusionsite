import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { Calendar, User, ChevronLeft, ArrowRight, Share2 } from "lucide-react";

// Gera os caminhos estáticos para performance máxima (SSG)
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Gera metadados de SEO para cada post
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | Blog Fusion Clinic`,
    description: post.excerpt,
    openGraph: {
      images: [post.cover_image],
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <article className="relative">
        {/* Header do Artigo */}
        <div className="w-full h-[50vh] relative">
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

          <div className="absolute bottom-0 left-0 w-full p-4 pb-12">
            <div className="mx-auto max-w-4xl">
              <Link
                href="/blog"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Voltar para o Blog
              </Link>
              <div className="flex gap-2 mb-4">
                <Badge className="bg-primary text-primary-foreground">
                  {post.category}
                </Badge>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center border border-border">
                    <User className="w-4 h-4" />
                  </div>
                  {post.author_name}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.created_at).toLocaleDateString("pt-BR")}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-12 grid lg:grid-cols-[1fr_350px] gap-12">
          {/* Conteúdo Principal */}
          <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
            {/* Renderiza HTML que vem do banco */}
            <div dangerouslySetInnerHTML={{ __html: post.content }} />

            {/* CTA no meio/final do texto */}
            <div className="my-12 p-8 bg-muted/30 rounded-3xl border border-primary/20 text-center">
              <h3 className="text-2xl font-bold mb-2">
                Gostou deste conteúdo?
              </h3>
              <p className="mb-6 text-muted-foreground">
                Aplique essas dicas na prática. Venha conhecer o espaço ideal
                para o seu atendimento.
              </p>
              <Button
                size="lg"
                className="rounded-xl font-bold shadow-lg shadow-primary/25"
                asChild
              >
                <Link href="/planos">
                  Ver Planos Disponíveis <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Sidebar (Sticky) - Conversão e Retenção */}
          <aside className="space-y-8">
            <div className="sticky top-24 space-y-8">
              {/* Card de Autoridade/Venda */}
              <div className="p-6 rounded-2xl border border-border bg-card shadow-lg">
                <h4 className="font-bold text-lg mb-2">
                  Sobre a Fusion Clinic
                </h4>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  Somos a maior rede de consultórios compartilhados de Natal.
                  Focados em oferecer infraestrutura premium para você focar no
                  paciente.
                </p>
                <div className="space-y-3">
                  <Button className="w-full rounded-xl" asChild>
                    <Link href="/seja-anfitriao">Seja Anfitrião</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full rounded-xl"
                    asChild
                  >
                    <Link href="https://wa.me/5584999999999">
                      Falar no WhatsApp
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Compartilhar */}
              <div className="p-6 rounded-2xl bg-muted/20 border border-border/50">
                <h4 className="font-bold text-sm mb-4 flex items-center gap-2">
                  <Share2 className="w-4 h-4" /> Compartilhar Artigo
                </h4>
                <div className="flex gap-2">
                  {/* Botões sociais simulados */}
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-lg hover:text-[#25D366] hover:border-[#25D366]"
                  >
                    <span className="sr-only">WhatsApp</span>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </article>

      <Footer />
    </main>
  );
}

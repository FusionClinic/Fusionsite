import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getPostBySlug, getAllPosts } from "@/lib/blog"; // Adicionado getAllPosts
import { Calendar, User, ChevronLeft, ArrowRight } from "lucide-react";

// Placeholder global
const PLACEHOLDER_IMAGE = "/placeholder.jpg";

// Configuração de ISR (Atualiza o cache a cada 1 hora)
export const revalidate = 3600;

// Otimização de SEO: Gera páginas estáticas no build
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Correção para Next.js 15+: params é uma Promise
type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  // AWAIT OBRIGATÓRIO AQUI
  const { slug } = await params;

  const post = await getPostBySlug(decodeURIComponent(slug));
  if (!post) return { title: "Post não encontrado" };

  return {
    title: `${post.title} | Blog Fusion Clinic`,
    description: post.excerpt,
  };
}

export default async function BlogPost({ params }: Props) {
  // AWAIT OBRIGATÓRIO AQUI TAMBÉM
  const { slug } = await params;

  const slugRecebido = decodeURIComponent(slug);

  // --- ÁREA DE DEBUG (Pode remover em produção se quiser) ---
  console.log("------------------------------------------------");
  console.log("🔎 TENTANDO ABRIR POST:");
  console.log("👉 Slug recebido (após await):", slugRecebido);

  const post = await getPostBySlug(slugRecebido);

  if (!post) {
    console.log("❌ ERRO: Post não encontrado no banco.");
    notFound();
  }

  console.log("✅ SUCESSO: Post encontrado:", post.title);
  console.log("------------------------------------------------");

  // Define a imagem segura
  const coverImage =
    post.cover_image && post.cover_image.trim() !== ""
      ? post.cover_image
      : PLACEHOLDER_IMAGE;

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <article className="relative">
        {/* Header do Artigo */}
        <div className="w-full h-[50vh] relative">
          <Image
            src={coverImage}
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

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="sticky top-24 space-y-8">
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
            </div>
          </aside>
        </div>
      </article>

      <Footer />
    </main>
  );
}

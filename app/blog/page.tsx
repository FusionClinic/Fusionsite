import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getAllPosts, Post } from "@/lib/blog";
import { Calendar, ArrowRight, ImageOff } from "lucide-react";

const PLACEHOLDER_IMAGE = "/placeholder.jpg";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getAllPosts();
  const safePosts = posts || [];

  // Pega o primeiro post válido como destaque
  const featuredPost = safePosts[0];
  // O restante vai para o grid
  const regularPosts = safePosts.slice(1);

  const PostImage = ({
    post,
    className,
  }: {
    post: Post;
    className: string;
  }) => {
    const src =
      post.cover_image && post.cover_image.trim() !== ""
        ? post.cover_image
        : PLACEHOLDER_IMAGE;

    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {!src.startsWith("http") && src === PLACEHOLDER_IMAGE && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/20 text-muted-foreground">
            <ImageOff className="w-8 h-8 opacity-50" />
          </div>
        )}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="relative py-20 bg-muted/30 border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <Badge variant="outline" className="mb-4 bg-background px-4 py-1.5">
            Central de Conteúdo
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Blog Fusion Clinic
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Dicas de carreira, gestão de consultório e tendências do mercado de
            saúde.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-16">
        {featuredPost && featuredPost.slug && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-primary rounded-full" />
              Destaque da Semana
            </h2>
            <Link href={`/blog/${featuredPost.slug}`} className="group">
              <div className="grid md:grid-cols-2 gap-8 items-center bg-card border border-border/50 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300">
                <PostImage
                  post={featuredPost}
                  className="h-64 md:h-96 w-full"
                />

                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <Badge className="bg-primary text-primary-foreground text-xs px-3 py-1">
                      {featuredPost.category}
                    </Badge>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(featuredPost.created_at)}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h3>
                  <p className="text-muted-foreground text-lg mb-8 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <Button className="w-fit rounded-xl gap-2 group-hover:bg-primary group-hover:text-primary-foreground">
                    Ler Artigo Completo
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Link>
          </div>
        )}

        <div>
          <h2 className="text-2xl font-bold mb-8">Recentes</h2>
          {regularPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => {
                // Se não tiver slug, não gera link (evita o erro)
                if (!post.slug) return null;

                return (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group h-full"
                  >
                    <Card className="h-full flex flex-col border-border/50 bg-card overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <PostImage post={post} className="h-48 w-full" />

                      <div className="absolute top-3 right-3 z-10">
                        <Badge className="bg-background/80 backdrop-blur text-foreground hover:bg-background">
                          {post.category}
                        </Badge>
                      </div>

                      <CardHeader className="pt-6">
                        <div className="text-xs text-muted-foreground mb-2 flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          {formatDate(post.created_at)}
                        </div>
                        <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {post.excerpt}
                        </p>
                      </CardContent>
                      <CardFooter className="pb-6 pt-0">
                        <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                          Ler mais <ArrowRight className="w-4 h-4" />
                        </span>
                      </CardFooter>
                    </Card>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-muted/20 rounded-3xl border border-dashed border-border">
              <p className="text-muted-foreground">Nenhum artigo encontrado.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}

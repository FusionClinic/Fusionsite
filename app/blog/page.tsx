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
import { getAllPosts } from "@/lib/blog";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";

// Função auxiliar para formatar data
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const revalidate = 60; // Revalida o cache a cada 60 segundos (ISR)

export default async function BlogPage() {
  const posts = await getAllPosts();
  const featuredPost = posts[0]; // O primeiro é o destaque
  const regularPosts = posts.slice(1); // O resto vai pro grid

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero do Blog */}
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
        {/* Post em Destaque (Featured) */}
        {featuredPost && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-primary rounded-full" />
              Destaque da Semana
            </h2>
            <Link href={`/blog/${featuredPost.slug}`} className="group">
              <div className="grid md:grid-cols-2 gap-8 items-center bg-card border border-border/50 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300">
                <div className="relative h-64 md:h-96 w-full overflow-hidden">
                  <Image
                    src={featuredPost.cover_image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-primary-foreground text-sm px-3 py-1">
                      {featuredPost.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(featuredPost.created_at)}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {featuredPost.author_name}
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

        {/* Grid de Posts Recentes */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Recentes</h2>
          {regularPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group h-full"
                >
                  <Card className="h-full flex flex-col border-border/50 bg-card overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={post.cover_image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <Badge className="absolute top-3 right-3 bg-background/80 backdrop-blur text-foreground hover:bg-background">
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
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-muted/20 rounded-3xl border border-dashed border-border">
              <p className="text-muted-foreground">
                Em breve mais artigos incríveis aqui.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menu,
  Apple,
  Brain,
  Sparkles,
  Heart,
  DollarSign,
  FileText,
  ChevronDown,
  ChevronRight,
  LayoutGrid,
  Home,
  CreditCard,
} from "lucide-react";

const specialties = [
  {
    title: "Nutrição",
    description: "Espaços ideais para atendimento nutricional e dietético",
    href: "/espacos?specialty=nutricao",
    icon: Apple,
  },
  {
    title: "Psicologia",
    description: "Salas com isolamento acústico e ambiente acolhedor",
    href: "/espacos?specialty=psicologia",
    icon: Brain,
  },
  {
    title: "Estética",
    description: "Espaços para procedimentos estéticos e dermatológicos",
    href: "/espacos?specialty=estetica",
    icon: Sparkles,
  },
  {
    title: "Médicos",
    description: "Consultórios completos para consultas gerais",
    href: "/espacos?specialty=medicina",
    icon: Heart,
  },
];

const navItems = [
  { label: "Início", href: "/", icon: Home },
  { label: "Espaços", href: "/espacos", icon: LayoutGrid },
  { label: "Planos e Preços", href: "/planos", icon: CreditCard },
  { label: "Seja Anfitrião", href: "/seja-anfitriao", icon: DollarSign },
  { label: "Blog", href: "/blog", icon: FileText },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 animate-in fade-in slide-in-from-top-2 duration-500">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link href="/" className="relative flex items-center shrink-0">
          <div className="relative h-16 w-56 md:h-20 md:w-72">
            <Image
              src="/logo1.png"
              alt="Fusion Clinic Logo"
              fill
              className="object-contain object-left"
              priority
              sizes="(max-width: 768px) 200px, 300px"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-6">
          {/* Menu Dropdown com POPOVER */}
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <button className="group flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors outline-none data-[state=open]:text-foreground">
                Especialidades
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${popoverOpen ? "rotate-180" : ""}`}
                />
              </button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[600px] p-4"
              align="start"
              sideOffset={8}
            >
              <div className="grid grid-cols-2 gap-4">
                {specialties.map((specialty) => (
                  <Link
                    key={specialty.title}
                    href={specialty.href}
                    onClick={() => setPopoverOpen(false)}
                    className="group flex items-start gap-4 rounded-xl p-3 transition-colors hover:bg-muted"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <specialty.icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none text-foreground group-hover:text-primary transition-colors">
                        {specialty.title}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {specialty.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-4 border-t pt-4">
                <Link
                  href="/espacos"
                  onClick={() => setPopoverOpen(false)}
                  className="flex items-center justify-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  Ver todas as opções <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </PopoverContent>
          </Popover>

          {/* Links Simples */}
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-foreground ${
                  isActive
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTAs (BOTÃO PADRÃO FUSION) */}
        <div className="hidden lg:flex lg:items-center lg:gap-3">
          <div className="hover:scale-105 active:scale-95 transition-transform">
            <Button
              asChild
              className="rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
            >
              <a
                href="https://wa.me/5584999999999?text=Olá! Quero saber como ser Fusion."
                target="_blank"
                rel="noopener noreferrer"
              >
                Quero ser Fusion
              </a>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="rounded-xl">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full max-w-sm bg-background/95 backdrop-blur-xl"
          >
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>
            <div className="mt-6 flex flex-col gap-2">
              <div className="px-2 pb-2">
                <p className="text-xs font-medium uppercase text-muted-foreground mb-4">
                  Especialidades
                </p>
                <div className="grid gap-2">
                  {specialties.map((specialty) => (
                    <Link
                      key={specialty.title}
                      href={specialty.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-accent"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <specialty.icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium">
                        {specialty.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="my-2 h-px bg-border" />

              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-accent"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              ))}

              <div className="mt-6 flex flex-col gap-3">
                <Button
                  asChild
                  className="w-full rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-bold h-12 shadow-lg shadow-primary/25"
                >
                  <a
                    href="https://wa.me/5511919119054?text=Olá! Quero saber como ser Fusion."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Quero ser Fusion
                  </a>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}

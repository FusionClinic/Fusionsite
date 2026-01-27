"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menu,
  Stethoscope,
  Brain,
  Sparkles,
  Heart,
  DollarSign,
  FileText,
  ChevronRight,
  LayoutGrid,
  Home,
  CreditCard,
} from "lucide-react";

const specialties = [
  {
    title: "Odontologia",
    description: "Consultórios equipados com cadeira e instrumentos",
    href: "/espacos?specialty=odontologia",
    icon: Stethoscope,
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
  // ADICIONADO: Link explícito para Início
  { label: "Início", href: "/", icon: Home },
  { label: "Espaços", href: "/espacos", icon: LayoutGrid },
  // ADICIONADO: Página dedicada de Planos
  { label: "Planos e Preços", href: "/planos", icon: CreditCard },
  { label: "Seja Anfitrião", href: "/seja-anfitriao", icon: DollarSign },
  { label: "Blog", href: "/blog", icon: FileText },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 3 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25"
          >
            <span className="text-lg font-bold text-primary-foreground">F</span>
          </motion.div>
          <span className="text-xl font-bold text-foreground">
            Fusion Clinic
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-accent/50 data-[state=open]:bg-accent/50">
                  Especialidades
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[500px] gap-2 p-4 lg:grid-cols-2">
                    {specialties.map((specialty) => (
                      <NavigationMenuLink key={specialty.title} asChild>
                        <Link
                          href={specialty.href}
                          className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-accent"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                            <specialty.icon className="h-5 w-5" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-foreground">
                              {specialty.title}
                            </p>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {specialty.description}
                            </p>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {navItems.map((item) => (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex lg:items-center lg:gap-3">
          <Button variant="ghost" className="rounded-xl">
            Fazer Login
          </Button>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25 transition-shadow hover:shadow-xl hover:shadow-primary/30">
              <span className="relative z-10">Cadastre-se</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
            </Button>
          </motion.div>
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
              <p className="px-2 text-xs font-medium uppercase text-muted-foreground">
                Especialidades
              </p>
              {specialties.map((specialty) => (
                <Link
                  key={specialty.title}
                  href={specialty.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-accent"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <specialty.icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">{specialty.title}</span>
                  <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                </Link>
              ))}

              <div className="my-4 h-px bg-border" />

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
                  variant="outline"
                  className="w-full rounded-xl bg-transparent"
                >
                  Fazer Login
                </Button>
                <Button className="w-full rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                  Cadastre-se
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </motion.header>
  );
}

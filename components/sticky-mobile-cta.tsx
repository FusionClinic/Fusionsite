"use client";

import { motion } from "framer-motion";
import { Calendar, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StickyMobileCTA() {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
    >
      <div className="border-t border-border/40 bg-background/95 backdrop-blur-xl px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] pb-safe-area">
        <div className="flex items-center gap-3">
          {/* Botão Principal - Agenda */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1"
          >
            <Button
              asChild
              className="relative w-full h-12 overflow-hidden rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold shadow-lg shadow-primary/25"
            >
              <a
                href="https://wa.me/5584999999999?text=Olá! Estou no site e quero agendar uma visita."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Calendar className="mr-2 h-4 w-4" />
                <span className="relative z-10">Agendar Visita</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </a>
            </Button>
          </motion.div>

          {/* Botão Secundário - WhatsApp Ícone */}
          <motion.a
            href="https://wa.me/5584999999999?text=Olá! Tenho uma dúvida sobre os consultórios."
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#25D366] text-white shadow-lg hover:bg-[#20bd5a] transition-colors"
          >
            <MessageCircle className="h-6 w-6" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

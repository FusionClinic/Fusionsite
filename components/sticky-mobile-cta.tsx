"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StickyMobileCTA() {
  const whatsappNumber = "5511919119054";
  const message = encodeURIComponent(
    "Olá! Estou no site da Fusion Clinic e gostaria de verificar a disponibilidade de salas para hoje.",
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 lg:hidden">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          size="icon"
          className="h-14 w-14 rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20ba5a]"
          onClick={() => window.open(whatsappUrl, "_blank")}
        >
          <MessageCircle className="h-7 w-7" />
          <span className="sr-only">Falar no WhatsApp</span>
        </Button>
      </motion.div>
    </div>
  );
}

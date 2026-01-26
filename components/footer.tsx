"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Instagram, Facebook, Linkedin, Youtube, MessageCircle } from "lucide-react"
import { FadeInUp } from "@/components/motion-wrapper"

const footerLinks = {
  empresa: [
    { label: "Sobre Nós", href: "/sobre" },
    { label: "Como Funciona", href: "#como-funciona" },
    { label: "Carreiras", href: "#carreiras" },
    { label: "Imprensa", href: "#imprensa" },
  ],
  recursos: [
    { label: "Blog", href: "#blog" },
    { label: "Central de Ajuda", href: "#ajuda" },
    { label: "Comunidade", href: "#comunidade" },
    { label: "Seja Anfitrião", href: "/seja-anfitriao" },
  ],
  legal: [
    { label: "Termos de Uso", href: "#termos" },
    { label: "Política de Privacidade", href: "#privacidade" },
    { label: "Cookies", href: "#cookies" },
  ],
}

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
]

export function Footer() {
  return (
    <>
      <footer className="bg-[#0f0f0f] text-gray-300 relative overflow-hidden">
        {/* Background Effect */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-primary blur-[150px]"
        />

        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-16 relative">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
            {/* Brand Column */}
            <FadeInUp>
              <div className="lg:col-span-2 space-y-5">
                <Link href="/" className="flex items-center gap-2.5 group">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 3 }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25"
                  >
                    <span className="text-lg font-bold text-primary-foreground">F</span>
                  </motion.div>
                  <span className="text-xl font-bold text-white">Fusion Clinic</span>
                </Link>
                <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
                  Conectamos profissionais da saúde a consultórios mobiliados com flexibilidade e economia.
                </p>
                <div className="flex gap-2">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-gray-400 hover:bg-primary hover:text-white transition-colors border border-white/5"
                      aria-label={social.label}
                    >
                      <social.icon className="h-4 w-4" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </FadeInUp>

            {/* Links Columns */}
            <FadeInUp delay={0.1}>
              <div>
                <h3 className="text-sm font-semibold text-white mb-5">Empresa</h3>
                <ul className="space-y-3">
                  {footerLinks.empresa.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-400 hover:text-primary transition-colors inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <div>
                <h3 className="text-sm font-semibold text-white mb-5">Recursos</h3>
                <ul className="space-y-3">
                  {footerLinks.recursos.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-400 hover:text-primary transition-colors inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.3}>
              <div>
                <h3 className="text-sm font-semibold text-white mb-5">Legal</h3>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-400 hover:text-primary transition-colors inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInUp>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-500">
                {`© ${new Date().getFullYear()} Fusion Clinic. Todos os direitos reservados.`}
              </p>
              <p className="text-sm text-gray-500">
                Feito com carinho para profissionais da saúde.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button - Desktop only (Mobile has sticky CTA) */}
      <motion.a
        href="https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre os consultórios."
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 hidden lg:flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30"
        aria-label="Fale conosco pelo WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.a>
    </>
  )
}

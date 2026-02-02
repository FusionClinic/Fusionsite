import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// URL base do seu site (substitua pelo domínio real quando tiver)
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://www.fusionclinic.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Fusion Clinic | Aluguel de Consultórios em Natal - RN",
    template: "%s | Fusion Clinic Natal",
  },
  description:
    "Consultórios mobiliados para profissionais de saúde em Natal (Tirol, Petrópolis, Lagoa Nova). Alugue por hora ou turno. Sem custos fixos, estrutura completa.",
  keywords: [
    "aluguel consultório natal",
    "sala psicólogo natal rn",
    "consultório odontológico por hora",
    "coworking saúde natal",
    "sala para médicos tirol",
    "consultório lagoa nova",
    "sublocação consultório",
  ],
  openGraph: {
    title: "Fusion Clinic | Consultórios Inteligentes em Natal",
    description:
      "A revolução do seu atendimento. Alugue consultórios premium por hora ou turno em Natal-RN.",
    type: "website",
    locale: "pt_BR",
    siteName: "Fusion Clinic",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  generator: "Next.js",
};

export const viewport: Viewport = {
  themeColor: "#FF6B6B", // Ajuste para a cor exata da sua marca se necessário
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Acessibilidade: permite zoom
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://www.fusionclinic.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Fusion Clinic | Aluguel de Consultórios em Natal - RN",
    template: "%s | Fusion Clinic",
  },
  description:
    "Aluguel de consultórios por hora, turno ou mensal em Natal. Salas prontas para médicos, psicólogos e dentistas no Tirol, Petrópolis e Lagoa Nova.",
  keywords: [
    "aluguel consultório natal",
    "consultório por hora natal",
    "sala para médicos natal",
    "coworking saúde natal",
    "sublocação consultório natal",
    "clínica compartilhada natal",
  ],
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "Fusion Clinic | Consultórios Inteligentes em Natal",
    description:
      "Sua clínica em Natal com flexibilidade total. Alugue por hora ou turno.",
    url: BASE_URL,
    siteName: "Fusion Clinic",
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#FF6B6B",
  width: "device-width",
  initialScale: 1,
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

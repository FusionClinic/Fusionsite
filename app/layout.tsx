import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Fusion Clinic | Aluguel de Consultórios por Hora, Turno ou Período Fixo',
  description: 'Conectamos profissionais da saúde a consultórios mobiliados. Alugue consultórios médicos, odontológicos e salas para psicólogos por hora, turno ou período fixo. Sem custos fixos, sem contratos longos.',
  keywords: 'aluguel consultório, consultório por hora, coworking médico, sala para psicólogo, consultório odontológico, espaço saúde',
  openGraph: {
    title: 'Fusion Clinic | Consultórios Flexíveis para Profissionais da Saúde',
    description: 'Alugue consultórios mobiliados por hora, turno ou período fixo. Estrutura premium, flexibilidade total.',
    type: 'website',
    locale: 'pt_BR',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: '#FF6B6B',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

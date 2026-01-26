"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, MapPin, Clock, Wifi, Coffee, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion-wrapper"

const listings = [
  {
    id: 1,
    title: "Consultórios Odontológicos",
    description: "Equipamentos completos, cadeira odontológica de última geração e ambiente esterilizado.",
    fullDescription: "Nossos consultórios odontológicos são equipados com cadeiras de última geração, equipamento de raio-x, autoclave e todo instrumental necessário. Ambiente climatizado e esterilizado seguindo todos os protocolos de biossegurança.",
    image: "https://images.unsplash.com/photo-1629909615184-74f495363b67?w=400&h=300&fit=crop&q=80",
    priceHour: "R$50",
    priceShift: "R$140",
    location: "Paulista, São Paulo",
    rating: 4.9,
    reviews: 124,
    amenities: ["Wi-Fi", "Ar condicionado", "Recepção", "Estacionamento"],
  },
  {
    id: 2,
    title: "Salas para Psicólogos",
    description: "Ambiente acolhedor, isolamento acústico e decoração que transmite tranquilidade.",
    fullDescription: "Salas especialmente projetadas para atendimento psicológico, com isolamento acústico total, iluminação suave e decoração que proporciona acolhimento. Sofás confortáveis e ambiente climatizado.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop&q=80",
    priceHour: "R$35",
    priceShift: "R$100",
    location: "Jardins, São Paulo",
    rating: 4.8,
    reviews: 89,
    amenities: ["Wi-Fi", "Ar condicionado", "Isolamento acústico", "Copa"],
  },
  {
    id: 3,
    title: "Consultórios Médicos",
    description: "Maca, balança, esfigmomanômetro e todo equipamento básico para consultas gerais.",
    fullDescription: "Consultórios médicos completos com maca regulável, balança digital, esfigmomanômetro, otoscópio e demais equipamentos para consultas. Ambiente limpo e organizado com todo suporte necessário.",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&h=300&fit=crop&q=80",
    priceHour: "R$45",
    priceShift: "R$130",
    location: "Vila Mariana, São Paulo",
    rating: 4.9,
    reviews: 156,
    amenities: ["Wi-Fi", "Ar condicionado", "Recepção", "Café"],
  },
  {
    id: 4,
    title: "Salas de Procedimentos",
    description: "Estrutura para pequenos procedimentos estéticos e dermatológicos.",
    fullDescription: "Salas equipadas para procedimentos estéticos e dermatológicos de pequeno porte. Maca com regulagem, iluminação profissional, pia cirúrgica e carrinho auxiliar inclusos.",
    image: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=400&h=300&fit=crop&q=80",
    priceHour: "R$60",
    priceShift: "R$170",
    location: "Moema, São Paulo",
    rating: 5.0,
    reviews: 78,
    amenities: ["Wi-Fi", "Ar condicionado", "Pia cirúrgica", "Esterilização"],
  },
]

type Listing = typeof listings[number]

export function ListingsSection() {
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  const handleQuickView = (listing: Listing) => {
    setSelectedListing(listing)
    setSheetOpen(true)
  }

  return (
    <section id="especialidades" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <FadeInUp>
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 rounded-full border-primary/20 bg-primary/5 px-4 py-1.5">
              <span className="text-sm font-medium text-primary">Espaços disponíveis</span>
            </Badge>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              Escolha Seu Espaço{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                FusionClinic
              </span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Temos opções para todas as especialidades. Encontre o consultório perfeito para você.
            </p>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {listings.map((listing) => (
            <StaggerItem key={listing.id}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="h-full"
              >
                <Card className="group relative h-full overflow-hidden border-0 bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all rounded-2xl">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={listing.image || "/placeholder.svg"}
                      alt={listing.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Quick View Button */}
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ scale: 1.1 }}
                      className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-card/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                      onClick={() => handleQuickView(listing)}
                    >
                      <Eye className="h-4 w-4 text-foreground" />
                    </motion.button>

                    {/* Rating Badge */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-card/90 backdrop-blur-sm px-2 py-1">
                      <Star className="h-3 w-3 fill-primary text-primary" />
                      <span className="text-xs font-medium text-foreground">{listing.rating}</span>
                    </div>
                  </div>

                  <CardContent className="p-5 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {listing.title}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                        <MapPin className="h-3 w-3" />
                        <span>{listing.location}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {listing.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                      <div>
                        <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                          {listing.priceHour}
                        </span>
                        <span className="text-xs text-muted-foreground"> /hora</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-foreground">{listing.priceShift}</span>
                        <span className="text-xs text-muted-foreground"> /turno</span>
                      </div>
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        variant="outline"
                        onClick={() => handleQuickView(listing)}
                        className="w-full rounded-xl border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all bg-transparent"
                      >
                        Ver Detalhes
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeInUp delay={0.4}>
          <div className="mt-12 text-center">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-xl shadow-primary/25 h-12 px-8"
              >
                <span className="relative z-10">Ver Todos os Espaços</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </Button>
            </motion.div>
          </div>
        </FadeInUp>
      </div>

      {/* Quick View Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-full max-w-lg overflow-y-auto bg-background/95 backdrop-blur-xl">
          {selectedListing && (
            <>
              <SheetHeader className="text-left">
                <SheetTitle className="text-xl font-bold">{selectedListing.title}</SheetTitle>
                <SheetDescription className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {selectedListing.location}
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                <div className="relative h-56 overflow-hidden rounded-2xl">
                  <img
                    src={selectedListing.image || "/placeholder.svg"}
                    alt={selectedListing.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-card/90 backdrop-blur-sm px-3 py-1.5">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="text-sm font-medium">{selectedListing.rating}</span>
                    <span className="text-xs text-muted-foreground">({selectedListing.reviews} reviews)</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Sobre o espaço</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedListing.fullDescription}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3">Comodidades</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedListing.amenities.map((amenity) => (
                      <Badge key={amenity} variant="secondary" className="rounded-lg">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/50">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Por hora</p>
                    <p className="text-2xl font-bold text-primary">{selectedListing.priceHour}</p>
                  </div>
                  <div className="h-12 w-px bg-border" />
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1">Por turno</p>
                    <p className="text-2xl font-bold text-foreground">{selectedListing.priceShift}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 rounded-xl bg-transparent"
                    onClick={() => setSheetOpen(false)}
                  >
                    Fechar
                  </Button>
                  <Button className="flex-1 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                    Reservar Agora
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </section>
  )
}

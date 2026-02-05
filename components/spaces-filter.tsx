"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X, Filter } from "lucide-react";

const specialties = [
  "Odontologia",
  "Psicologia",
  "Medicina",
  "Estética",
  "Dermatologia",
  "Nutrição",
  "Fisioterapia",
  "Fonoaudiologia",
];

const modalities = [
  { value: "hourly", label: "Por Hora" },
  { value: "shift", label: "Por Turno" },
  { value: "fixed", label: "Período Fixo" },
];

const neighborhoods = [
  "Lagoa Nova",
  "Tirol",
  "Petrópolis",
  "Candelária",
  "Ponta Negra",
];

export function SpacesFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/espacos?${params.toString()}`);
  };

  const hasFilters = searchParams.toString().length > 0;

  return (
    <div className="w-full bg-card/50 backdrop-blur-sm border border-border/50 p-4 rounded-2xl shadow-sm mb-8">
      <div className="flex flex-col gap-4">
        {/* Linha de Título Mobile */}
        <div className="flex md:hidden items-center gap-2 text-sm font-medium text-muted-foreground">
          <Filter className="w-4 h-4" />
          Filtros
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center">
          {/* Label Desktop */}
          <div className="hidden lg:flex items-center gap-2 text-sm font-medium text-muted-foreground min-w-fit">
            <Filter className="w-4 h-4" />
            Filtrar:
          </div>

          {/* Especialidade (Área de Atuação) */}
          <Select
            value={searchParams.get("specialty") || ""}
            onValueChange={(val) => updateFilter("specialty", val)}
          >
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Especialidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Áreas</SelectItem>
              {specialties.map((s) => (
                <SelectItem key={s} value={s.toLowerCase()}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Modalidade */}
          <Select
            value={searchParams.get("modality") || ""}
            onValueChange={(val) => updateFilter("modality", val)}
          >
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Modalidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Qualquer Modalidade</SelectItem>
              {modalities.map((m) => (
                <SelectItem key={m.value} value={m.value}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Localização */}
          <Select
            value={searchParams.get("neighborhood") || ""}
            onValueChange={(val) => updateFilter("neighborhood", val)}
          >
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Bairro" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Bairros</SelectItem>
              {neighborhoods.map((n) => (
                <SelectItem key={n} value={n}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Botão Limpar (Só aparece se tiver filtros) */}
        {hasFilters && (
          <div className="flex justify-end pt-2 border-t border-border/40 md:border-0 md:pt-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/espacos")}
              className="text-muted-foreground hover:text-destructive h-8 px-2"
            >
              <X className="w-3.5 h-3.5 mr-1.5" />
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

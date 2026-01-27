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
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground min-w-fit">
          <Filter className="w-4 h-4" />
          Filtrar por:
        </div>

        <Select
          value={searchParams.get("specialty") || ""}
          onValueChange={(val) => updateFilter("specialty", val)}
        >
          <SelectTrigger className="w-full md:w-[200px] bg-background">
            <SelectValue placeholder="Especialidade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {specialties.map((s) => (
              <SelectItem key={s} value={s.toLowerCase()}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={searchParams.get("modality") || ""}
          onValueChange={(val) => updateFilter("modality", val)}
        >
          <SelectTrigger className="w-full md:w-[180px] bg-background">
            <SelectValue placeholder="Modalidade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {modalities.map((m) => (
              <SelectItem key={m.value} value={m.value}>
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={searchParams.get("neighborhood") || ""}
          onValueChange={(val) => updateFilter("neighborhood", val)}
        >
          <SelectTrigger className="w-full md:w-[180px] bg-background">
            <SelectValue placeholder="Localização" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {neighborhoods.map((n) => (
              <SelectItem key={n} value={n}>
                {n}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/espacos")}
            className="ml-auto text-muted-foreground hover:text-destructive"
          >
            <X className="w-4 h-4 mr-2" />
            Limpar Filtros
          </Button>
        )}
      </div>
    </div>
  );
}

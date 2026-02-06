"use server";

import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

// 1. Schema de validação (Segurança contra dados lixo)
const schema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  whatsapp: z.string().min(10, "WhatsApp inválido"),
  specialty: z.string().min(2, "Selecione uma especialidade"),
});

export async function submitLead(prevState: any, formData: FormData) {
  // 2. Extrair dados do FormData
  const rawData = {
    name: formData.get("name"),
    whatsapp: formData.get("whatsapp"),
    specialty: formData.get("specialty"),
  };

  // 3. Validar dados
  const validated = schema.safeParse(rawData);

  if (!validated.success) {
    return {
      success: false,
      message: "Dados inválidos. Verifique os campos.",
      errors: validated.error.flatten().fieldErrors,
    };
  }

  // 4. Conectar ao Supabase (Usando variáveis de ambiente padrão)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  try {
    // 5. Salvar no banco
    const { error } = await supabase.from("leads").insert({
      name: validated.data.name,
      whatsapp: validated.data.whatsapp,
      specialty: validated.data.specialty,
    });

    if (error) throw error;

    return { success: true, message: "Solicitação recebida com sucesso!" };
  } catch (error) {
    console.error("Erro ao salvar lead:", error);
    return {
      success: false,
      message: "Erro ao salvar. Tente novamente mais tarde.",
    };
  }
}
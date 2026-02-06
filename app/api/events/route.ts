import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // 1. Receber os dados enviados pelo front-end
    const body = await request.json();
    const { eventName, eventData } = body;

    // 2. Log no terminal do servidor (Isso ajuda você a ver que o tracking funciona)
    console.log(`📡 [TRACKING] Evento: ${eventName}`, eventData);

    // TODO: Futuramente, aqui entra o código do Facebook CAPI / Google Conversions
    
    // 3. Retorna sucesso para o navegador não reclamar
    return NextResponse.json({ success: true, message: "Evento registrado" });
  } catch (error) {
    console.error("Erro no tracking:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
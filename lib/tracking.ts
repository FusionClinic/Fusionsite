// lib/tracking.ts
export const trackEvent = async (eventName: string, eventData: any = {}) => {
  // 1. Rastreamento no Client-side (Standard Pixel/GTM se houver)
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", eventName, eventData);
  }

  // 2. Rastreamento Server-side (CAPI Bridge)
  try {
    await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName,
        eventData,
        userData: {
          // Aqui podemos capturar dados do navegador de forma anônima
          sourceUrl: window.location.href,
          userAgent: navigator.userAgent,
        },
      }),
    });
  } catch (error) {
    console.error("Tracking Error:", error);
  }
};
/* ============================================================
   Your Best Look · Quiz high-end · configuración
   Todo lo editable vive aquí: checkout, videos por intro, social proof.
   ============================================================ */
window.YBL = {
  // Checkout de Hotmart. Al botón se le agregan los UTM de la visita + sck=quizHE_<estilo>_<intro>
  HOTMART_URL: "https://pay.hotmart.com/Y108122830M",

  PRICE: "$80 USD",
  PRICE_BEFORE: "$691 USD",
  GUARANTEE_DAYS: 7,

  // Pixel de Meta. Vacío = no se dispara nada (recomendado mientras sea prueba interna).
  // Para producción: "2261263981474725"
  PIXEL_ID: "2261263981474725",

  // VSL por intro. Cada intro (1 general, 1A–1D) puede tener su propio video.
  // Si una intro no tiene URL todavía, usa el de la general.
  // reveal = segundo en que aparece la barra fija de compra.
  VSL: {
    "1":  { url: "https://player.vimeo.com/video/1245707054?badge=0&autopause=0&title=0&byline=0&portrait=0&dnt=1", reveal: 350 },
    "1A": { url: "", reveal: 342 },
    "1B": { url: "", reveal: 340 },
    "1C": { url: "", reveal: 341 },
    "1D": { url: "", reveal: 338 }
  },
  VSL_POSTER: "assets/w/luzma.webp",

  // Social proof (cámbialo por los números reales antes de pautar)
  PROOF_WOMEN: 12480,
  PROOF_RATING: "4.9",
  PROOF_REVIEWS: 1316
};

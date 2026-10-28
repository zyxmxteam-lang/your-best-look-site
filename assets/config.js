/* ============================================================
   Your Best Look: configuración (lo único que hay que editar)
   ============================================================ */
window.YBL = {
  // Link del checkout de Hotmart (pay.hotmart.com/…)
  HOTMART_URL: "https://pay.hotmart.com/Y108122830M",

  // URL del VSL. Acepta:
  //  - Archivo directo .mp4 o .m3u8 (Bunny, Cloudflare Stream, S3…): detecta exactamente
  //    cuándo se llega al minuto de la oferta.
  //  - Embed de Vimeo (https://player.vimeo.com/video/ID): detecta el segundo exacto con su API.
  //  - Embed de YouTube (https://www.youtube.com/embed/ID): el botón aparece por tiempo desde el play.
  // Vacío = muestra un placeholder de "Video próximamente".
  VIDEO_URL: "https://player.vimeo.com/video/1240063100?badge=0&autopause=0&app_id=58479",
  // Portada del video antes de darle play (VSL Luzma V5 Bold, 6:25)
  VIDEO_POSTER: "https://i.vimeocdn.com/video/2218288031-8af60f4f9aa782734e05bd6ea64a5b7d304849e23bd68245b5d238b19fccd2e0-d_720x1280?region=us",

  // Segundo del video en el que aparece el botón de compra en la landing de ads.
  // En el guion, la oferta empieza en 5:50 (350 s).
  REVEAL_AT: 350,

  PRICE: "$80 USD",
  // Precio anterior que aparece tachado (vacío = no se muestra)
  PRICE_BEFORE: "$89 USD",
  GUARANTEE_DAYS: 7
};

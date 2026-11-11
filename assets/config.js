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
  VIDEO_URL: "https://player.vimeo.com/video/1245707054?badge=0&autopause=0&app_id=58479&title=0&byline=0&portrait=0&loop=1&dnt=1",
  // Portada del video antes de darle play (VSL LUZMA OFF, 6:22)
  VIDEO_POSTER: "https://i.vimeocdn.com/video/2224912230-84b02c1195dae2d28d66b0c0c60c7b01d8e6175d8708c679937eba9ea123b0c5-d_720x1280?region=us",

  // Segundo del video en el que aparece el botón de compra en la landing de ads.
  // En el guion, la oferta empieza en 5:50 (350 s).
  REVEAL_AT: 350,

  PRICE: "$80 USD",
  // Precio anterior que aparece tachado (vacío = no se muestra)
  PRICE_BEFORE: "$89 USD",
  GUARANTEE_DAYS: 7
};

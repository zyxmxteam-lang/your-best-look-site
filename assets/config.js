/* ============================================================
   Your Best Look: configuración (lo único que hay que editar)
   ============================================================ */
window.YBL = {
  // Link del checkout de Hotmart (pay.hotmart.com/…)
  HOTMART_URL: "https://pay.hotmart.com/XXXXXXXXX",

  // URL del VSL. Acepta:
  //  - Archivo directo .mp4 o .m3u8 (Bunny, Cloudflare Stream, S3…): detecta exactamente
  //    cuándo se llega al minuto de la oferta.
  //  - Embed de YouTube o Vimeo (https://www.youtube.com/embed/ID o https://player.vimeo.com/video/ID):
  //    el botón aparece por tiempo, contando desde que se da play.
  // Vacío = muestra un placeholder de "Video próximamente".
  VIDEO_URL: "",

  // Segundo del video en el que aparece el botón de compra en la landing de ads.
  // En el guion, la oferta empieza en 5:50 (350 s).
  REVEAL_AT: 350,

  PRICE: "$80 USD",
  // Precio anterior que aparece tachado (vacío = no se muestra)
  PRICE_BEFORE: "$89 USD",
  GUARANTEE_DAYS: 7
};

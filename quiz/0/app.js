/* ==========================================================
   Your Best Look · Quiz high-end · v2
   Método: tipo de rostro (rasgos + estructura) + líneas → 1 de 7 estilos
           prueba fucsia/naranja + ojos + cabello + contraste → estación
   Conversión: "¿qué frase te describe?" (y el anuncio de origen) decide
               la intro del VSL (1, 1A, 1B, 1C, 1D).
   ========================================================== */
(function () {
  "use strict";
  var C = window.YBL || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var W = "assets/w/", CO = "assets/c/", V = "assets/v/";
  var params = new URLSearchParams(location.search);
  var fmt = function (n) { return Number(n).toLocaleString("en-US"); };
  var ARROW = '<span class="btn__a">→</span>';
  function btn(t, cls, attrs) { return '<button type="button" class="btn ' + (cls || "btn--block") + '" ' + (attrs || "") + '><span class="btn__t">' + t + "</span>" + ARROW + "</button>"; }

  /* ---------------- Método ---------------- */
  var SIZES = ["Petit", "Chico", "Mediano", "Grande", "Extra grande"];
  var DOT = [0.16, 0.3, 0.48, 0.7, 1];
  var STYLES = {
    dulce: { name: "La dulce", img: "br65", q: "¿Represento esa dulzura?",
      d: "Rasgos finos y delicados. Tu belleza está en el detalle: lo pequeño, lo fino y lo suave te hacen brillar. Inocente, nunca boba.",
      si: ["Estampados diminutos: lunares pequeñitos, florecitas, rayas finas.", "Aretes de broquel o gotitas, cadenas delgadas.", "Telas ligeras y suaves: seda, algodón fino, punto delgado."],
      no: ["Estampados grandes que se comen tu rostro.", "Joyería voluminosa o piezas pesadas.", "Telas muy rígidas o con mucho cuerpo."] },
    fresca: { name: "La fresca", img: "br05", q: "¿Me veo cómoda?",
      d: "Relajada y natural. Te ves mejor cuando nada se ve forzado: lo sencillo, práctico y luminoso es lo tuyo. Cómoda nunca significa descuidada.",
      si: ["Estampados pequeños y casuales: cuadritos, rayas, flores chicas.", "Accesorios ligeros con un toque de personalidad.", "Texturas naturales: lino, algodón, mezclilla ligera."],
      no: ["Piezas maxi que te cargan.", "Looks demasiado rígidos para el día a día.", "Telas pesadas o muy brillantes."] },
    original: { name: "La original", img: "br07", q: "¿Me veo divertida?",
      d: "Versátil, con movimiento y asimetrías. Lo inesperado te sienta: mezclas, cortes con gracia y detalles creativos. Original, nunca ridícula.",
      si: ["Estampados medianos con movimiento: ondas, flores, paisley.", "Aretes medianos con forma: asimétricos, orgánicos.", "Cortes con movimiento: drapeados, asimetrías."],
      no: ["Looks demasiado serios o rígidos.", "Geometrías muy duras.", "Juntar demasiadas ideas en un solo look."] },
    elegante: { name: "La elegante", img: "br67", q: "¿Reflejo esa elegancia?",
      d: "Clásica y minimalista. Pocas piezas, muy bien elegidas: líneas limpias, buena tela y cero ruido. Elegancia no es rigidez; formal no es anticuada.",
      si: ["Estampados medianos y ordenados: rayas, cuadros, geométricos sutiles.", "Aretes medianos de líneas limpias, collares sencillos.", "Cortes estructurados: sacos, solapas, pantalón recto."],
      no: ["Estampados recargados o muy románticos.", "Exceso de accesorios a la vez.", "Volantes y holanes por todos lados."] },
    femenina: { name: "La femenina", img: "br69", q: "¿Qué tan bien la represento?",
      d: "Extremadamente femenina e incluso sexy, pero nunca sobrecargada. La única que puede con lo grande y lo extra grande sin verse disfrazada.",
      si: ["Estampados grandes y curvos: flores grandes, ondas, animal print suave.", "Aretes y collares con presencia y formas redondeadas.", "Telas con caída: seda, crepé, punto que acompañe tus curvas."],
      no: ["Estampados diminutos que se pierden.", "Cortes muy rectos y masculinos.", "Ponerte todo lo grande al mismo tiempo."] },
    chic: { name: "La chic", img: "br06", q: "¿Me veo nice?",
      d: "Distinguida y vanguardista. Tomas lo más chic de la moda sin verte falsa ni disfrazada. De la moda, solo lo que habla de ti.",
      si: ["Estampados grandes y gráficos: geométricos, rayas anchas, bloques de color.", "Accesorios con presencia y líneas definidas.", "Prendas con estructura: sacos, abrigos, cortes arquitectónicos."],
      no: ["Estampados pequeños y tímidos.", "Looks demasiado románticos o aniñados.", "Seguir cada tendencia al pie de la letra."] },
    sofisticada: { name: "La sofisticada", img: "br66", q: "¿Estoy expresando mi glamour?",
      d: "Tu elegancia, refinamiento y sofisticación se hacen evidentes. Presencia no es intimidación: no necesitas imponer, solo brillar.",
      si: ["Estampados XL o bloques de color sólidos.", "Pocas piezas y muy buenas: un collar o unos aretes protagonistas.", "Telas con cuerpo: lana, gabardina, satín grueso."],
      no: ["Accesorios pequeños que desaparecen.", "Estampados menudos y recargados.", "Mezclar demasiadas piezas protagonistas."] }
  };
  var SEASONS = {
    invierno: { name: "Invierno", k: "Fría · intensa", sw: ["#0b1d4f", "#c4004f", "#ffffff", "#4b2aa8", "#111111"], metal: "plata" },
    verano: { name: "Verano", k: "Fría · suave", sw: ["#8fa3bf", "#c98da5", "#a7a3b8", "#5e7186", "#e8dfe8"], metal: "plata" },
    otono: { name: "Otoño", k: "Cálida · intensa", sw: ["#b5651d", "#6b7a2a", "#c99a3b", "#8b3a1e", "#4a3424"], metal: "oro" },
    primavera: { name: "Primavera", k: "Cálida · suave", sw: ["#ff8a6b", "#9ccc4a", "#f5c36b", "#f29e7c", "#fff1d6"], metal: "oro" }
  };
  var EYES = {
    dark:  { name: "Café oscuro o negros", img: "eye-dark", hint: "Tus ojos oscuros le suman intensidad y profundidad a tu colorido." },
    miel:  { name: "Café claro o miel", img: "eye-honey", hint: "Tus ojos miel tienen destellos dorados: una pista de calidez." },
    verde: { name: "Verdes o avellana", img: "eye-green", hint: "El verde avellana suele acompañar coloridos cálidos y luminosos." },
    azul:  { name: "Azules o grises", img: "eye-blue", hint: "Tus ojos claros suelen brillar con colores fríos y suaves." }
  };
  var HAIR = [["Negro o castaño oscuro", "oscuro", "hair-dark"], ["Castaño claro", "castano", "hair-brown"], ["Rubio", "rubio", "hair-blonde"], ["Pelirrojo o cobrizo", "cobrizo", "hair-red"]];
  var JEWEL = ["jw-petit", "jw-petit", "jw-mediano", "jw-xl", "jw-xl"];
  var PRINT = ["pr-petit", "pr-chico", "pr-mediano", "pr-grande", "pr-xl"];

  /* ---------------- Intros del VSL ---------------- */
  var INTROS = {
    "1":  { label: "Intro general", file: "VSL_B1_Intro_General", q: "Si llegaste hasta aquí… es porque de verdad quieres entender cómo funciona la metodología de Your Best Look… para convertirte en tu propia asesora de imagen." },
    "1A": { label: "Intro A · Clóset lleno", file: "VSL_B1A_Intro_ClosetLleno", q: "Si en el quiz me dijiste que tienes el clóset lleno… y aun así, cada mañana, no sabes qué ponerte… quiero que escuches esto con atención. No te falta ropa. Nunca te faltó." },
    "1B": { label: "Intro B · Copio looks", file: "VSL_B1B_Intro_CopioLooks", q: "Si en el quiz me dijiste que guardas looks de Instagram y de Pinterest… que en ti nunca se ven igual… déjame quitarte un peso de encima. No es tu cuerpo. Y no es tu edad." },
    "1C": { label: "Intro C · Gasto mucho", file: "VSL_B1C_Intro_GastoMucho", q: "Si en el quiz me dijiste que cada temporada gastas más de lo que quisieras… y aun así no te ves como te gustaría… te tengo una buena noticia. El problema nunca fue cuánto gastas." },
    "1D": { label: "Intro D · No me reconozco", file: "VSL_B1D_Intro_NoMeReconozco", q: "Si en el quiz me dijiste que últimamente te ves al espejo… y ya no te reconoces… quiero decirte algo, con todo mi cariño. No te perdiste. Cambió tu etapa." }
  };
  var DOLOR_TO_INTRO = { lleno: "1A", copia: "1B", gasto: "1C", espejo: "1D", todo: "1" };
  var AD_TO_INTRO = { A1: "1B", A2: "1B", A3: "1B", B1: "1", B2: "1A", B3: "1C", C1: "1D", C2: "1D", C3: "1D" };

  /* ---------------- Testimonios (ilustrativos para la prueba) ---------------- */
  var REVIEWS = [
    { img: W + "rv1.webp", n: "Mónica R.", a: 52, c: "CDMX", s: "La elegante", r: 5, t: "Con la misma ropa cambié aretes y escotes. Mi hija me preguntó qué me había hecho." },
    { img: CO + "w4.webp", n: "Carmen V.", a: 61, c: "Madrid", s: "La sofisticada", r: 5, t: "Pensé que a mi edad ya no había nada que hacer. Hoy uso piezas con presencia y me reconozco otra vez." },
    { img: W + "rv2.webp", n: "Laura G.", a: 58, c: "Guadalajara", s: "La dulce", r: 5, t: "Soy petit y usaba collares enormes. Me puse una cadena fina y por primera vez salí bien en las fotos." },
    { img: CO + "w12.webp", n: "Patricia L.", a: 49, c: "Monterrey", s: "La chic", r: 5, t: "Hoy compro la mitad y me veo el doble. Mis compañeras me preguntan dónde compro." },
    { img: W + "rv5.webp", n: "Rosa M.", a: 64, c: "Bogotá", s: "La elegante", r: 4.5, t: "La prueba del fucsia y el naranja me voló la cabeza. Soy invierno y llevaba veinte años vistiéndome de beige." },
    { img: CO + "w16.webp", n: "Adriana T.", a: 55, c: "Lima", s: "La original", r: 5, t: "Ya no le pregunto a nadie si algo me queda. Lo sé frente a mi espejo, en dos minutos." },
    { img: CO + "w17.webp", n: "Elena S.", a: 57, c: "Buenos Aires", s: "La femenina", r: 5, t: "Dejé de copiar a mis amigas. Ellas se visten para su rostro; yo, por fin, para el mío." },
    { img: CO + "w15.webp", n: "Silvia P.", a: 53, c: "Querétaro", s: "La elegante", r: 4.5, t: "Depuré mi clóset con el cuaderno y descubrí tres looks increíbles que tenía colgados sin estrenar." },
    { img: CO + "w13.webp", n: "Beatriz O.", a: 60, c: "Santiago", s: "La chic", r: 5, t: "Ni app ni suscripción. Lo aprendí una vez y se quedó conmigo. Ojalá lo hubiera sabido hace veinte años." },
    { img: W + "rv3.webp", n: "Teresa A.", a: 63, c: "Sevilla", s: "La sofisticada", r: 5, t: "Mi esposo lo notó antes de que yo dijera nada. Solo cambié el tamaño de mis aretes y mis estampados." },
    { img: CO + "w9.webp", n: "Lucía H.", a: 51, c: "Puebla", s: "La elegante", r: 4.5, t: "Siempre sentí que algo no cuadraba. Era la escala: todo lo que compraba era demasiado pequeño para mi rostro." },
    { img: CO + "w3.webp", n: "Marta F.", a: 59, c: "Miami", s: "La sofisticada", r: 5, t: "Volví a salir al frente de las fotos. Así de simple, y así de importante para mí." },
    { img: W + "rv6.webp", n: "Gabriela N.", a: 47, c: "Mérida", s: "La femenina", r: 5, t: "Las curvas de mi rostro piden cuellos en V y aretes redondos. Nunca nadie me lo había explicado." },
    { img: CO + "w18.webp", n: "Irene C.", a: 56, c: "Barcelona", s: "La chic", r: 4.5, t: "Funciona igual con ropa de oferta que con marcas. Hoy me preguntan en qué boutique compro." }
  ];
  function stars(r) { return "★★★★★".slice(0, Math.floor(r)) + (r % 1 ? "½" : ""); }
  function tmHTML(r) {
    return '<article class="tm"><div class="tm__h"><img src="' + r.img + '" alt="" loading="lazy"><div><b>' + r.n + "</b><small>" + r.a + " años · " + r.c + "</small></div></div>" +
      '<div class="tm__r"><span class="stars">' + stars(r.r) + "</span>" + String(r.r).replace(".", ",") + "</div><p>“" + r.t + '”</p><span class="tm__s">' + r.s + "</span></article>";
  }
  function marquee(list, rev, dur) {
    var h = list.map(tmHTML).join("");
    return '<div class="marquee' + (rev ? " marquee--rev" : "") + '" style="--dur:' + (dur || 70) + 's"><div class="marquee__track">' + h + h + "</div></div>";
  }
  function miniTM(k, offset) {
    var list = REVIEWS.slice(offset % REVIEWS.length).concat(REVIEWS.slice(0, offset % REVIEWS.length)).slice(0, 7);
    return '<div class="mini-tm"><p class="mini-tm__k">' + (k || "Mujeres como tú que ya lo descubrieron") + "</p>" + marquee(list, false, 55) + "</div>";
  }

  /* ---------------- Streaming de rostros ---------------- */
  var WALL = ["s-w2", "s-br03", "s-w4", "s-br65", "s-w12", "s-w3", "s-br67", "s-w15", "s-w5", "s-br07", "s-w16", "s-w9", "s-br66", "s-w13", "s-w17", "s-br04", "s-w6", "s-w18", "s-br69", "s-w8", "s-w14", "s-br05", "s-w19", "s-br06", "s-w10", "s-br27", "s-w1", "s-br01"];
  function wallHTML(cols) {
    cols = cols || 5; var h = '<div class="wall__grid">';
    for (var c = 0; c < cols; c++) {
      var col = []; for (var k = 0; k < 6; k++) col.push(WALL[(c * 5 + k * 3) % WALL.length]);
      var imgs = col.map(function (n) { return '<img src="' + W + n + '.webp" alt="" loading="lazy" decoding="async">'; }).join("");
      h += '<div class="wall__col" style="animation-delay:-' + (c * 9) + 's">' + imgs + imgs + "</div>";
    }
    return h + '</div><div class="wall__veil"></div>';
  }

  /* ---------------- Pasos ---------------- */
  var SECTIONS = ["Tu historia", "Tu rostro", "Tus colores", "Tu estilo"];
  var STEPS = [
    { id: "edad", type: "age", sec: 0, q: 'Para empezar, <span class="pk">¿en qué etapa de tu vida estás?</span>', sub: "Cada etapa tiene su propia forma de lucir espectacular. Vamos a descubrir la tuya.",
      o: [["Menos de 45", "35", "br08"], ["45 a 54", "45", "br03"], ["55 a 64", "55", "br07"], ["65 o más", "65", "br04"]] },
    { id: "proof", type: "proof", sec: null },
    { id: "nombre", type: "name", sec: 0, q: '¿Cómo te <span class="pk">llamas?</span>', sub: "Luzma arma tu lectura de estilo con tu nombre." },
    { id: "dolor", type: "pain", sec: 0, route: true,
      o: [["Tengo el clóset lleno… y aun así no sé qué ponerme", "lleno", "br40"],
          ["Copio looks de Instagram o Pinterest y en mí no se ven igual", "copia", "br42"],
          ["Gasto mucho en ropa y no me veo como quisiera", "gasto", "br43"],
          ["Últimamente me veo al espejo y ya no me reconozco", "espejo", "br44"],
          ["Un poco de todo", "todo", ""]] },
    { id: "mirror", type: "mirror", sec: null },
    { id: "metas", type: "multi", sec: 0, q: '¿Qué te encantaría sentir <span class="pk">cuando te veas al espejo?</span>', sub: "Elige todas las que quieras.",
      o: [["Volver a sentirme bonita", "bonita"], ["Vestirme en 5 minutos y salir segura", "rapido"], ["Dejar de gastar en ropa que no uso", "ahorro"],
          ["Descubrir los colores que me iluminan", "color"], ["Verme elegante y segura", "pro"], ["Que mi imagen diga quién soy", "yo"]] },
    { id: "secreto", type: "secret", sec: null },
    { id: "rasgos", type: "single", sec: 1, dots: true, q: 'Frente al espejo, con el cabello recogido: <span class="pk">tus rasgos se ven…</span>', sub: "Ojos, nariz y boca. Fíjate en el tamaño, no en si te gustan.",
      o: [["Muy finos y delicados", "1", "Como de muñequita"], ["Pequeños y armoniosos", "2", "Nada llama la atención por grande"], ["Medianos", "3", "Ni grandes ni pequeños"],
          ["Grandes y expresivos", "4", "Ojos, boca o nariz con presencia"], ["Muy grandes y marcados", "5", "Se notan desde lejos"]] },
    { id: "huesos", type: "single", sec: 1, dots: true, q: 'Ahora tu estructura: <span class="pk">muñeca, hombros y mandíbula</span> son…', sub: "Tu estructura no cambia aunque cambie tu peso.",
      o: [["Muy finos", "1"], ["Delgados", "2"], ["Medianos", "3"], ["Anchos y firmes", "4"], ["Muy anchos y fuertes", "5"]] },
    { id: "tallas", type: "sizes", sec: null },
    { id: "lineas", type: "photo", sec: 1, q: '¿Cuál de estos rostros <span class="pk">se parece más al tuyo?</span>', sub: "Fíjate en tu mandíbula, tus pómulos y tus cejas. Todas tenemos rectas y curvas, pero una predomina.",
      o: [["Líneas rectas", "r", "face-rectas", "Mandíbula marcada, pómulos angulares", "rectas"], ["Líneas curvas", "c", "face-curvas", "Mejillas suaves, rostro redondeado", "curvas"]], plain: ["Una mezcla, no estoy segura", "m"] },
    { id: "hombros", type: "photo", sec: 1, q: 'Y tus hombros, vistos de frente, <span class="pk">se parecen más a…</span>',
      o: [["Rectos y marcados", "r", "cl-rectas", "Las prendas con estructura te quedan", ""], ["Redondeados y suaves", "c", "cl-curvas", "Las telas con caída te favorecen", ""]], plain: ["No sé", "m"] },
    { id: "fase1", type: "phase", n: 1, from: 0, to: 38, label: "Leyendo la personalidad de tu rostro…",
      checks: ["Midiendo la escala de tus rasgos", "Detectando líneas rectas y curvas", "Calculando la talla de tus aretes y estampados", "Cruzando tu lectura con los 7 estilos"] },
    { id: "ojos", type: "eyes", sec: 2, q: '¿De qué color son <span class="pk">tus ojos?</span>', sub: "Acércate a la luz natural. Tus ojos son la primera pista de los colores que te iluminan." },
    { id: "cabello", type: "hair", sec: 2, q: '¿Cuál es tu color de cabello <span class="pk">natural?</span>', sub: "El de nacimiento, sin tinte. Si ya tienes canas, elige el que tenías antes." },
    { id: "temp", type: "single", sec: 2, swatch: true, q: 'La prueba de Luzma: pon algo fucsia y algo naranja junto a tu cara. <span class="pk">¿Con cuál te ves con más luz?</span>',
      sub: "Si no tienes nada a la mano, elige el metal que mejor te queda.",
      o: [["Con el fucsia", "f", "fucsia"], ["Con el naranja", "w", "naranja"], ["Me ilumina más la plata", "f", "plata"], ["Me ilumina más el oro", "w", "oro"]] },
    { id: "contraste", type: "single", sec: 2, q: 'Tu piel, tus ojos y tu cabello natural, <span class="pk">juntos se ven…</span>',
      o: [["De alto contraste", "i", "Mucha diferencia entre tu piel y tu cabello u ojos"], ["Suaves y armoniosos", "s", "Tonos claros o medios que se funden entre sí"]] },
    { id: "fase2", type: "phase", n: 2, from: 38, to: 72, label: "Buscando los colores que te iluminan…",
      checks: ["Leyendo el tono de tus ojos", "Comparando fucsia contra naranja", "Midiendo tu contraste natural", "Eligiendo tu metal: plata u oro"] },
    { id: "algo", type: "single", sec: 3, q: 'Te arreglas, te ves al espejo… ¿y aun así sientes que <span class="pk">«algo no cuadra»?</span>',
      o: [["Sí, muchas veces", "mucho"], ["A veces", "aveces"], ["Casi nunca", "nunca"]] },
    { id: "deseo", type: "single", sec: 3, q: 'Cuando entras a un lugar, <span class="pk">¿qué te encantaría que pensaran de ti?</span>',
      o: [["«Qué linda y cercana»", "dulce"], ["«Qué natural y relajada»", "fresca"], ["«Qué creativa y divertida»", "original"], ["«Qué elegante y segura»", "elegante"],
          ["«Qué femenina y atractiva»", "femenina"], ["«Qué moderna, siempre impecable»", "chic"], ["«Qué imponente y sofisticada»", "sofisticada"]] },
    { id: "lista", type: "single", sec: 3, q: 'Última: ¿qué tan lista estás para <span class="pk">verte como tu mejor versión?</span>',
      o: [["¡Lista! Ya quiero verme como yo", "ya"], ["Con ganas, pero me da miedo equivocarme otra vez", "miedo"], ["Primero quiero entender bien de qué se trata", "ver"]] },
    { id: "fase3", type: "phase", n: 3, from: 72, to: 100, label: "Armando tu plan personalizado…", pop: true,
      checks: ["Uniendo tu tipo de rostro y tu estación", "Eligiendo tus aretes, cuellos y estampados", "Preparando el mensaje de Luzma para ti", "Tu plan está casi listo"] }
  ];

  var MIRROR = {
    lleno:  { v: "br41", k: "El secreto que nadie te dijo", t: 'No te falta ropa. <span class="pk">Te falta tu instructivo.</span>', p: "Y está escrito en tu rostro. En 2 minutos vas a descubrir qué de todo lo que ya tienes te hace lucir increíble." },
    copia:  { v: "br64", k: "Déjame quitarte un peso de encima", t: 'No es tu cuerpo. Ni tu edad. <span class="pk">Es que copias otro rostro.</span>', p: "Esos looks se diseñaron para otra cara. Vamos a descubrir los que fueron hechos para la tuya." },
    gasto:  { v: "br58", k: "Te tengo una buena noticia", t: 'El problema nunca fue cuánto gastas. <span class="pk">Es qué eliges.</span>', p: "Cuando sabes qué le corresponde a tu rostro, una blusa sencilla luce como de boutique." },
    espejo: { v: "br62", k: "Con todo cariño", t: 'No te perdiste. <span class="pk">Cambió tu etapa.</span>', p: "Y tu rostro ya sabe cómo vestir a la mujer que eres hoy. Vamos a descubrirlo juntas." },
    todo:   { v: "br53", k: "Es más común de lo que crees", t: 'Tu rostro ya sabe <span class="pk">qué ponerte.</span>', p: "Las mujeres que mejor se ven no empiezan por la prenda, ni por la marca, ni por el precio. Empiezan por su rostro." }
  };
  var DESIRE = { bonita: "volver a sentirte bonita", rapido: "vestirte en 5 minutos y salir segura", ahorro: "lucir increíble sin gastar de más",
    color: "descubrir los colores que te iluminan", pro: "verte elegante y segura", yo: "que tu imagen diga quién eres" };
  var PAINS = {
    lleno: "tienes el clóset lleno y aun así no sabes qué ponerte. No te falta ropa: te faltaba saber qué de todo eso le corresponde a tu rostro.",
    copia: "copias looks que en ti no se ven igual. No era tu cuerpo ni tu edad: estabas copiando soluciones diseñadas para otro rostro.",
    gasto: "gastas mucho y no te ves como quisieras. La moda no es precio, ni marca: es saber resaltarte. Por eso tu método funciona igual en fast fashion que en boutique.",
    espejo: "últimamente no te reconoces en el espejo. No te perdiste: cambió tu etapa, y tu rostro ya sabe cómo vestir a la mujer que eres hoy.",
    todo: "te pasa un poco de todo. Todo tiene la misma raíz: nadie te había enseñado a leer tu rostro."
  };
  var LISTA = {
    ya: "Estás lista. Lo único que te falta es el método para confirmarlo frente a tu espejo.",
    miedo: "Es normal tener miedo de equivocarte otra vez. Por eso tienes 7 días de garantía: si sientes que no es para ti, Luzma te devuelve tu dinero.",
    ver: "Mira el mensaje que Luzma grabó para ti: en unos minutos te explica exactamente de qué se trata."
  };

  /* ---------------- Estado ---------------- */
  var ans = {}, i = 0, hist = [], started = false, R = null, timers = [];
  var stage = $("#stage"), bars = $("#bars"), back = $("#back");
  function clearTimers() { timers.forEach(function (t) { clearTimeout(t); clearInterval(t); }); timers = []; }
  function later(fn, ms) { var t = setTimeout(fn, ms); timers.push(t); return t; }
  function nm() { return ans.nombre ? ans.nombre.v : ""; }
  function low(n) { return n.replace("La ", "la "); }
  function desire() { var m = ans.metas && ans.metas.vs[0]; return DESIRE[m] || "lucir tu mejor versión"; }

  /* ---------------- Pixel (opcional) ---------------- */
  if (C.PIXEL_ID) {
    !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    fbq("init", C.PIXEL_ID); fbq("track", "PageView");
  }
  function track(ev, data, custom) { if (typeof window.fbq === "function") window.fbq(custom ? "trackCustom" : "track", ev, data || {}); }

  /* ---------------- Videos perezosos ---------------- */
  var vio = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      var v = e.target;
      if (e.isIntersecting) { if (v.dataset.src && !v.src) v.src = v.dataset.src; var p = v.play(); if (p && p.catch) p.catch(function () {}); }
      else if (!v.paused) v.pause();
    });
  }, { threshold: .25 }) : null;
  function lazyVideos(root) { $$("video[data-src]", root).forEach(function (v) { if (vio) vio.observe(v); else { v.src = v.dataset.src; v.play(); } }); }
  function vid(name, extra) { return '<video data-src="' + V + name + '.mp4" poster="' + V + name + '.jpg" muted loop playsinline preload="none"' + (extra || "") + "></video>"; }

  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: .12 }) : null;
  function observe(root) { $$(".ros", root).forEach(function (el) { io ? io.observe(el) : el.classList.add("in"); }); lazyVideos(root); }

  /* ---------------- Landing ---------------- */
  function fillCommon(root) {
    $$("[data-proof-women]", root).forEach(function (el) { el.textContent = fmt(C.PROOF_WOMEN || 12480); });
    $$("[data-proof-rating]", root).forEach(function (el) { el.textContent = C.PROOF_RATING || "4.9"; });
    $$("[data-price]", root).forEach(function (el) { el.textContent = C.PRICE; });
    $$("[data-price-before]", root).forEach(function (el) { el.textContent = el.closest(".sticky") ? C.PRICE_BEFORE.replace(" USD", "") : C.PRICE_BEFORE; });
  }
  fillCommon(document);
  $$("[data-wall]").forEach(function (el) { el.innerHTML = wallHTML(5); });
  $$("[data-tms]").forEach(function (el) { el.innerHTML = marquee(REVIEWS.slice(0, 7), false, 75) + marquee(REVIEWS.slice(7), true, 85); });
  var BA = [["ad1", "Líneas curvas", "La femenina"], ["ad2", "Líneas rectas", "La elegante"], ["ad3", "Rasgos petit", "La dulce"], ["ad4", "Rasgos grandes", "La sofisticada"]];
  function baHTML() { var h = BA.map(function (b) { return '<figure class="ba"><img src="' + W + b[0] + '.webp" alt="" loading="lazy"><figcaption>' + b[1] + ' · <span>' + b[2] + "</span></figcaption></figure>"; }).join(""); return h + h; }
  $$("[data-ba]").forEach(function (el) { el.innerHTML = baHTML(); });

  // Pie legal (landing y resultado)
  var LEGAL = '<div class="legal"><p class="legal__c">© 2026 Your Best Look by Luzma. All rights reserved.</p>' +
    '<p class="legal__d">This site is not a part of the Facebook™ website or Meta Platforms, Inc. Additionally, this site is NOT endorsed by Facebook™ or Meta in any way. FACEBOOK™ and INSTAGRAM™ are trademarks of Meta Platforms, Inc.</p>' +
    '<p class="legal__z">This funnel was designed by <a href="https://zyx.mx/" target="_blank" rel="noopener">ZYX Agency</a></p></div>';
  $$("[data-legal]").forEach(function (el) { el.outerHTML = LEGAL; });
  observe(document);
  window.addEventListener("scroll", function () { document.documentElement.classList.toggle("scrolled", window.scrollY > 40); }, { passive: true });

  var KW = [["TU <b>ROSTRO</b>", "ya sabe qué ponerte"], ["NO ES LA <b>ROPA</b>", "es tu rostro"], ["NI LA <b>MARCA</b>", "ni el precio"], ["NI TU <b>EDAD</b>", "ni tu cuerpo"], ["ES TU <b>ESTILO</b>", "uno de 7"]];
  var kwI = 0, kin = $(".kinetic");
  if (kin) setInterval(function () {
    if ($("#landing").hidden) return;
    kin.classList.add("swap");
    setTimeout(function () { kwI = (kwI + 1) % KW.length; $("#kw").innerHTML = KW[kwI][0]; $("#ks").textContent = KW[kwI][1]; kin.classList.remove("swap"); }, 260);
  }, 2000);

  /* ---------------- Barra de progreso ---------------- */
  bars.innerHTML = SECTIONS.map(function (n) { return '<span class="seg"><i></i><em>' + n + "</em></span>"; }).join("");
  function curSec() { for (var j = i; j >= 0; j--) if (STEPS[j].sec !== null && STEPS[j].sec !== undefined) return STEPS[j].sec; return 0; }
  function updateBars() {
    var cur = curSec();
    $$(".seg", bars).forEach(function (seg, k) {
      var ids = STEPS.filter(function (x) { return x.sec === k; });
      var done = ids.filter(function (x) { return STEPS.indexOf(x) < i; }).length;
      var pct = k < cur ? 100 : k > cur ? 0 : Math.max(6, Math.round(done / ids.length * 100));
      if (STEPS[i].type === "phase" && k === cur) pct = 100;
      seg.querySelector("i").style.width = pct + "%";
      seg.classList.toggle("on", k === cur);
    });
    var qs = STEPS.filter(function (x) { return x.sec !== null && x.sec !== undefined; });
    var pos = qs.filter(function (x) { return STEPS.indexOf(x) <= i; }).length;
    $("#stepcount").textContent = STEPS[i].sec === null || STEPS[i].sec === undefined ? "" : pos + "/" + qs.length;
    $("#secname").textContent = SECTIONS[cur];
  }

  /* ---------------- Helpers de UI ---------------- */
  function dotsHTML(on) { var h = '<span class="dots" aria-hidden="true">'; for (var k = 0; k < 5; k++) h += '<i style="--s:' + DOT[k] + '"' + (k === on ? ' class="on"' : "") + "></i>"; return h + "</span>"; }
  function sizesHTML(on) { return '<div class="sizes">' + SIZES.map(function (n, k) { return '<span class="' + (k === on ? "on" : "") + '"><i style="--s:' + DOT[k] + '"></i>' + n + "</span>"; }).join("") + "</div>"; }
  function lineIcon(v) {
    if (v === "r") return '<svg class="ico" viewBox="0 0 48 48" aria-hidden="true"><path d="M8 40 L24 8 L40 40 Z"/></svg>';
    return '<svg class="ico" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="16"/></svg>';
  }
  function swatch(v) {
    var c = { fucsia: "#d6247f", naranja: "#ef7d22", plata: "linear-gradient(135deg,#f4f4f6,#a9adb5,#e9eaee)", oro: "linear-gradient(135deg,#f6e3a1,#c9962e,#f3d67b)" }[v];
    return '<span class="sw" style="background:' + c + '" aria-hidden="true"></span>';
  }
  function corners() { return '<span class="mcard__c tl"></span><span class="mcard__c tr"></span><span class="mcard__c bl"></span><span class="mcard__c br"></span>'; }
  function mcard(media, extra, cls) { return '<figure class="mcard ' + (cls || "") + '">' + media + '<span class="scanl"></span>' + corners() + (extra || "") + "</figure>"; }
  // Trazos HUD sobre los rostros (estilo escáner de los ads)
  function faceHUD(kind) {
    if (kind === "rectas") return '<svg class="hudsvg" viewBox="0 0 100 125" preserveAspectRatio="none"><path class="ln" d="M33 17 L67 17 L71 41 L50 59 L29 41 Z"/><path class="dash" d="M50 8 V80 M24 36 H76"/><circle cx="33" cy="17" r="1.3"/><circle cx="67" cy="17" r="1.3"/><circle cx="71" cy="41" r="1.3"/><circle cx="29" cy="41" r="1.3"/><circle cx="50" cy="59" r="1.3"/></svg>';
    if (kind === "curvas") return '<svg class="hudsvg" viewBox="0 0 100 125" preserveAspectRatio="none"><ellipse class="ln" cx="50" cy="42" rx="22" ry="29"/><path class="dash" d="M50 8 V80 M24 40 H76"/><circle cx="28" cy="42" r="1.3"/><circle cx="72" cy="42" r="1.3"/><circle cx="50" cy="71" r="1.3"/><circle cx="50" cy="13" r="1.3"/></svg>';
    return "";
  }
  function head(s, sub) { return '<p class="q__k">' + SECTIONS[s.sec] + '</p><h2 class="h">' + s.q + "</h2>" + (sub ? '<p class="sub">' + sub + "</p>" : ""); }

  /* ---------------- Render ---------------- */
  function render() {
    clearTimers();
    var s = STEPS[i], h = "", n = nm();
    back.hidden = hist.length === 0 || s.type === "phase";
    updateBars();
    var sel = function (k) { return ans[s.id] && ans[s.id].k === k ? " is-sel" : ""; };

    if (s.type === "age") {
      h = head(s, s.sub) + '<div class="pics">' + s.o.map(function (o, k) {
        return '<button class="pic opt-pick' + sel(k) + '" data-k="' + k + '" style="--i:' + k + '"><img src="' + W + o[2] + '.webp" alt=""><span class="pic__l"><b>' + o[0] + '</b><span>→</span></span></button>';
      }).join("") + "</div>";

    } else if (s.type === "proof") {
      h = '<div class="proof"><div class="wall">' + wallHTML(4) + '</div><div class="proof__body"><p class="q__k" style="justify-content:center">Estás en buenas manos</p>' +
        '<p class="proof__n" data-count="' + (C.PROOF_WOMEN || 12480) + '">0</p>' +
        '<h2 class="h h--md">mujeres ya lucen su mejor versión gracias a su rostro, con el método de <span class="pk">Your Best Look by Luzma.</span></h2>' +
        '<p class="proof__r"><span class="stars">★★★★★</span>' + (C.PROOF_RATING || "4.9") + " de calificación · Sin app · Sin suscripción</p>" +
        btn("Continuar", "btn--block go-next") + "</div>" + miniTM("Lo que dicen mujeres en tu etapa", 0) + "</div>";

    } else if (s.type === "name") {
      h = head(s, s.sub) + '<form class="name"><input id="qz-name" type="text" autocomplete="given-name" maxlength="30" placeholder="Escribe tu nombre" value="' + (n || "") + '">' +
        '<button class="btn btn--block" type="submit"><span class="btn__t">Continuar</span>' + ARROW + '</button></form><button class="skip" type="button">Prefiero no decirlo</button>';

    } else if (s.type === "pain") {
      h = '<p class="q__k">' + SECTIONS[s.sec] + '</p><h2 class="h">' + (n ? n + ", ¿qué" : "¿Qué") + ' frase te describe <span class="pk">mejor hoy?</span></h2><p class="sub">Elige la que más te suene. Al final, Luzma te habla directo a ti.</p><div class="pics pics--wide">' + s.o.map(function (o, k) {
        return '<button class="pic opt-pick' + (o[2] ? "" : " pic--plain") + sel(k) + '" data-k="' + k + '" style="--i:' + k + '">' + (o[2] ? '<img src="' + W + o[2] + '.webp" alt="">' : "") + '<span class="pic__l"><b>' + o[0] + "</b></span></button>";
      }).join("") + "</div>";

    } else if (s.type === "mirror") {
      var m = MIRROR[ans.dolor ? ans.dolor.v : "todo"];
      h = '<div class="info">' + mcard(vid(m.v)) + '<p class="q__k">' + m.k + '</p><h2 class="h h--md">' + (n ? n + ", " + m.t.charAt(0).toLowerCase() + m.t.slice(1) : m.t) + '</h2><p class="sub">' + m.p + "</p>" +
        btn("Descubrir mi estilo", "btn--block go-next") + miniTM(null, 2) + "</div>";

    } else if (s.type === "secret") {
      h = '<div class="info">' + mcard(vid("br25")) +
        '<p class="chunk" style="font-size:21px;margin:0 0 12px">MISMA MUJER. <b>SU MEJOR VERSIÓN.</b></p><h2 class="h h--md">Nadie empieza por la prenda, ni por la marca, ni por el precio. <span class="pk">Todas empiezan por su rostro.</span></h2>' +
        '<p class="desire">' + (n ? n + ", este" : "Este") + " es el secreto para <b>" + desire() + "</b>.</p>" +
        '<div class="lzm"><img src="' + W + 'luzma-av.webp" alt="Luzma"><div><b>Luzma</b><small>Diseñadora de imagen · 30+ años · Milán y Nueva York</small></div></div>' +
        btn("Descubrir mi estilo ideal", "btn--block go-next") + miniTM(null, 5) + "</div>";

    } else if (s.type === "sizes") {
      h = '<div class="info"><p class="q__k">El secreto que nadie te dijo</p><h2 class="h h--md">Así como tienes talla de ropa, <span class="pk">tu rostro también tiene talla.</span></h2>' +
        '<p class="tiles__k">Tus aretes</p><div class="tiles">' + [["jw-petit", "Petit"], ["jw-mediano", "Mediano"], ["jw-xl", "Extra grande"]].map(function (t, k) { return '<div class="tile" style="--i:' + k + '"><img src="' + CO + t[0] + '.webp" alt=""><span>' + t[1] + "</span></div>"; }).join("") + "</div>" +
        '<p class="tiles__k">Tus estampados</p><div class="tiles">' + [["pr-petit", "Petit"], ["pr-mediano", "Mediano"], ["pr-xl", "Extra grande"]].map(function (t, k) { return '<div class="tile" style="--i:' + (k + 3) + '"><img src="' + CO + t[0] + '.webp" alt=""><span>' + t[1] + "</span></div>"; }).join("") + "</div>" +
        '<p class="sub" style="margin-top:18px">Esa talla no la decide tu peso ni tu edad: la decide tu rostro. Por eso lo que a otra le queda increíble, en ti no luce igual… hasta hoy.</p>' +
        '<p class="desire">' + (n ? n + ", en" : "En") + " un momento vas a saber <b>cuál es la tuya</b>.</p>" +
        btn("Descubrir mi talla", "btn--block go-next") + miniTM(null, 8) + "</div>";

    } else if (s.type === "photo") {
      h = head(s, s.sub) + '<div class="pics">' + s.o.map(function (o, k) {
        return '<button class="pic pic--photo opt-pick' + sel(k) + '" data-k="' + k + '" style="--i:' + k + '"><img src="' + CO + o[2] + '.webp" alt="">' + faceHUD(o[4]) + (o[4] ? '<span class="pic__hud">' + (o[4] === "rectas" ? "Líneas · rectas" : "Líneas · curvas") + "</span>" : "") +
          '<span class="pic__l"><span class="pic__txt"><b>' + o[0] + "</b><small>" + o[3] + "</small></span></span></button>";
      }).join("") + '</div><div class="opts plain-opt"><button type="button" class="opt opt-plain' + (ans[s.id] && ans[s.id].k === 9 ? " is-sel" : "") + '" data-k="9"><span><b>' + s.plain[0] + '</b></span><span class="opt__radio"></span></button></div>';

    } else if (s.type === "eyes") {
      h = head(s, s.sub) + '<div class="pics">' + Object.keys(EYES).map(function (key, k) {
        var e = EYES[key];
        return '<button class="pic eye opt-pick' + (ans.ojos && ans.ojos.v === key ? " is-sel" : "") + '" data-k="' + k + '" style="--i:' + k + '"><img src="' + CO + e.img + '.webp" alt="Ojos ' + e.name.toLowerCase() + '"><span class="eye__ring"></span><span class="pic__l"><b>' + e.name + "</b><span>→</span></span></button>";
      }).join("") + "</div>";

    } else if (s.type === "hair") {
      h = head(s, s.sub) + '<div class="pics">' + HAIR.map(function (o, k) {
        return '<button class="pic opt-pick' + sel(k) + '" data-k="' + k + '" style="--i:' + k + '"><img src="' + CO + o[2] + '.webp" alt=""><span class="pic__l"><b>' + o[0] + "</b><span>→</span></span></button>";
      }).join("") + '</div><div class="opts plain-opt"><button type="button" class="opt opt-plain' + sel(9) + '" data-k="9"><span><b>Prefiero no decirlo</b></span><span class="opt__radio"></span></button></div>';

    } else if (s.type === "single" || s.type === "multi") {
      var multi = s.type === "multi", sub = s.sub;
      if (s.id === "metas" && n) sub = "Mucho gusto, " + n + ". " + s.sub;
      if (s.id === "rasgos" && n) sub = n + ", fíjate en el tamaño de ojos, nariz y boca, no en si te gustan.";
      h = head(s, sub) + '<div class="opts">' + s.o.map(function (o, k) {
        var ico = s.dots ? dotsHTML(k) : s.swatch ? swatch(o[2]) : "";
        var small = !s.swatch && o[2] ? "<small>" + o[2] + "</small>" : "";
        var on = multi ? (ans[s.id] && ans[s.id].ks.indexOf(k) > -1) : (ans[s.id] && ans[s.id].k === k);
        return '<button type="button" class="opt' + (on ? " is-sel" : "") + '" data-k="' + k + '" style="--i:' + k + '">' + ico + "<span><b>" + o[0] + "</b>" + small + '</span><span class="' + (multi ? "opt__check" : "opt__radio") + '"></span></button>';
      }).join("") + "</div>" +
        (multi ? '<div class="go">' + btn("Continuar", "btn--block go-next", ans[s.id] && ans[s.id].ks.length ? "" : "disabled") + "</div>" : "");

    } else if (s.type === "phase") {
      return phase(s);
    }
    paint(h);
    if (s.type === "proof") countUp($(".proof__n", stage));
    prefetch();
  }

  function paint(h) {
    stage.classList.remove("in");
    stage.innerHTML = h;
    void stage.offsetWidth;
    stage.classList.add("in");
    window.scrollTo(0, 0);
    lazyVideos(stage);
    track("QuizStep", { step: i + 1, question: STEPS[i].id }, true);
    var inp = $("#qz-name", stage); if (inp && window.innerWidth > 700) inp.focus();
  }
  // precarga las imágenes del siguiente paso para que cada pantalla aparezca al instante
  var PREF = { edad: [], dolor: ["br40", "br42", "br43", "br44"].map(function (x) { return W + x + ".webp"; }),
    lineas: [CO + "face-rectas.webp", CO + "face-curvas.webp"], hombros: [CO + "cl-rectas.webp", CO + "cl-curvas.webp"],
    ojos: Object.keys(EYES).map(function (k) { return CO + EYES[k].img + ".webp"; }), cabello: HAIR.map(function (h) { return CO + h[2] + ".webp"; }),
    tallas: ["jw-petit", "jw-mediano", "jw-xl", "pr-petit", "pr-mediano", "pr-xl"].map(function (x) { return CO + x + ".webp"; }), secreto: [V + "br25.jpg", W + "luzma-av.webp"] };
  function prefetch() { for (var k = i + 1; k <= i + 2 && k < STEPS.length; k++) (PREF[STEPS[k].id] || []).forEach(function (u) { var im = new Image(); im.src = u; }); }
  function countUp(el) {
    if (!el) return; var to = +el.getAttribute("data-count"), t0 = performance.now(), d = 1500;
    (function f(t) { var p = Math.min(1, (t - t0) / d); el.textContent = fmt(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(f); })(t0);
  }

  /* ---------------- Simulador de análisis ---------------- */
  function phase(s) {
    R = result();
    var S = STYLES[R.id], E = SEASONS[R.est], media, huds;
    if (s.n === 1) {
      media = vid(R.linea === "rectas" ? "br09" : "br12", " autoplay");
      huds = [["l", 20, "Rasgos · " + R.talla], ["r", 44, "Líneas · " + R.linea], ["l", 66, "Aretes · talla " + R.talla]];
    } else if (s.n === 2) {
      media = '<img src="' + CO + EYES[ans.ojos ? ans.ojos.v : "dark"].img + '.webp" alt="">';
      huds = [["r", 20, "Iris · " + (ans.ojos ? EYES[ans.ojos.v].name.split(" ")[0] : "")], ["l", 46, "Temperatura · " + E.k.split(" · ")[0]], ["r", 70, "Metal · " + E.metal]];
    } else {
      media = '<img src="' + W + S.img + '.webp" alt="">';
      huds = [["l", 18, "Tipo · " + R.talla], ["r", 42, "Estación · " + E.name], ["l", 66, "Estilo · " + S.name.replace("La ", "")]];
    }
    var hudH = huds.map(function (x) { return '<span class="hud hud--' + x[0] + '" style="top:' + x[1] + '%">' + x[2] + "</span>"; }).join("");
    paint('<div class="phase"><div class="phase__vis">' + mcard(media, hudH, s.n === 3 ? "mcard--tall" : "") + '<div class="ring" style="--p:' + s.from + '"><b>' + s.from + '%</b></div></div>' +
      '<h2 class="h h--md phase__h">' + (nm() && s.n === 3 ? nm() + ", estoy armando tu plan personalizado…" : s.label) + "</h2>" +
      '<ul class="checks">' + s.checks.map(function (c) { return "<li><i></i>" + c + "</li>"; }).join("") + "</ul>" +
      '<div class="tick-rv"></div><div class="reveal-box" hidden></div></div>');

    var ring = $(".ring", stage), num = $("b", ring), lis = $$(".checks li", stage), hs = $$(".hud", stage);
    var total = 5200, p = s.from, span = s.to - s.from, paused = false, popped = false;
    var rvBox = $(".tick-rv", stage), rI = (s.n - 1) * 4;
    function showRv() { rvBox.innerHTML = tmHTML(REVIEWS[rI++ % REVIEWS.length]); }
    showRv(); timers.push(setInterval(showRv, 2600));
    var t = setInterval(function () {
      if (paused) return;
      p++; ring.style.setProperty("--p", p); num.textContent = p + "%";
      var prog = (p - s.from) / span;
      lis.forEach(function (li, k) { var a = k / lis.length, b = (k + 1) / lis.length; li.className = prog >= b ? "ok" : prog >= a ? "run" : ""; });
      hs.forEach(function (hh, k) { if (prog > (k + 1) / (hs.length + 1)) hh.classList.add("on"); });
      if (s.pop && !popped && prog >= .5) { popped = true; paused = true; askPop(function () { paused = false; }); }
      if (p >= s.to) { clearInterval(t); lis.forEach(function (li) { li.className = "ok"; }); later(function () { reveal(s); }, 350); }
    }, total / span);
    timers.push(t);
  }

  function askPop(done) {
    var el = document.createElement("div");
    el.className = "pop";
    el.innerHTML = '<div class="pop__card"><p class="q__k">Para afinar tu plan</p><h3 class="h">¿Tienes prendas en tu clóset que compraste y <span class="pk">casi nunca usas?</span></h3>' +
      '<div class="pop__row">' + btn("Sí, varias", "btn--sm", 'data-v="si"') + btn("No mucho", "btn--sm btn--ghost", 'data-v="no"') + "</div></div>";
    document.body.appendChild(el);
    el.addEventListener("click", function (e) {
      var b = e.target.closest("[data-v]"); if (!b) return;
      ans.sinusar = { v: b.getAttribute("data-v") };
      track("QuizAnswer", { question: "sinusar", answer: ans.sinusar.v }, true);
      el.remove(); done();
    });
  }

  function reveal(s) {
    var S = STYLES[R.id], E = SEASONS[R.est], box = $(".reveal-box", stage), h2 = $(".phase__h", stage), n = nm(), h;
    clearTimers();
    $(".checks", stage).hidden = true; $(".tick-rv", stage).hidden = true;
    if (s.n === 1) {
      h2.innerHTML = (n ? n + ", tu" : "Tu") + ' tipo de rostro <span class="pk">está definido</span>';
      h = sizesHTML(R.tallaN - 1) + '<p class="sub">Tipo <b>' + R.talla + "</b> con líneas <b>" + R.linea + "</b>. Ya tienes la mitad de tu instructivo. Ahora viene el secreto de tus colores.</p>";
    } else if (s.n === 2) {
      h2.innerHTML = (n ? n + ", encontramos" : "Encontramos") + ' <span class="pk">los colores que te iluminan</span>';
      h = '<div class="sw5">' + E.sw.map(function (c, k) { return '<i style="background:' + c + ";animation-delay:" + k * 80 + 'ms"></i>'; }).join("") + '</div><p class="sub">Tu estación es <b>' + E.name + "</b>. Cuando la usas, la gente no sabe qué te hiciste… pero te dice: <b>¡qué bien te ves!</b> Falta lo más importante: tu estilo.</p>";
    } else {
      h2.innerHTML = "¡Listo" + (n ? ", " + n : "") + '! <span class="pk">Tu rostro tiene la personalidad de</span>';
      h = '<p class="big-style">' + S.name + '</p><p class="sub">«Nadie tiene nada que corregir y sí mucho que expresar.» <b>— Luzma</b></p>';
    }
    box.innerHTML = h + btn(s.n === 3 ? "Ver mi plan personalizado" : "Continuar", "btn--block go-next");
    box.hidden = false;
  }

  /* ---------------- Interacción ---------------- */
  stage.addEventListener("click", function (e) {
    var s = STEPS[i];
    if (e.target.closest(".go-next")) {
      if (s.type === "multi") track("QuizAnswer", { question: s.id, answer: ans[s.id].vs.join(",") }, true);
      return next();
    }
    if (e.target.closest(".skip")) { delete ans.nombre; return next(); }
    var b = e.target.closest(".opt, .opt-pick"); if (!b) return;
    var k = +b.getAttribute("data-k");
    if (s.type === "multi") {
      var a = ans[s.id] || { ks: [], vs: [] }, at = a.ks.indexOf(k);
      if (at > -1) { a.ks.splice(at, 1); a.vs.splice(at, 1); } else { a.ks.push(k); a.vs.push(s.o[k][1]); }
      ans[s.id] = a; b.classList.toggle("is-sel", at === -1);
      $(".go-next", stage).disabled = !a.ks.length;
      return;
    }
    if (s.type === "eyes") { var key = Object.keys(EYES)[k]; ans.ojos = { k: k, v: key, label: EYES[key].name }; }
    else if (s.type === "hair") ans.cabello = k === 9 ? { k: 9, v: "nd", label: "Prefiero no decirlo" } : { k: k, v: HAIR[k][1], label: HAIR[k][0] };
    else if (s.type === "photo") ans[s.id] = k === 9 ? { k: 9, v: s.plain[1], label: s.plain[0] } : { k: k, v: s.o[k][1], label: s.o[k][0] };
    else ans[s.id] = { k: k, v: s.o[k][1], label: s.o[k][0] };
    $$(".opt, .opt-pick", stage).forEach(function (x) { x.classList.toggle("is-sel", x === b); });
    track("QuizAnswer", { question: s.id, answer: ans[s.id].v }, true);
    if (s.route) track("QuizRoute", { intro: routeIntro().id }, true);
    later(next, 360);
  });
  stage.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = (($("#qz-name", stage).value || "").trim().split(/\s+/)[0] || "").replace(/[^\p{L}'-]/gu, "");
    if (v) ans.nombre = { v: v.charAt(0).toUpperCase() + v.slice(1).toLowerCase() }; else delete ans.nombre;
    next();
  });
  back.addEventListener("click", function () { if (!$("#result").hidden) return; if (hist.length) { i = hist.pop(); render(); } });
  function next() {
    hist.push(i); i++;
    if (i >= STEPS.length) return show(R || result());
    stage.classList.add("out");
    later(function () { stage.classList.remove("out"); render(); }, 200);
  }

  /* ---------------- Cálculo ---------------- */
  var DESEO_TALLA = { dulce: 1, fresca: 2, original: 3, elegante: 3, femenina: 4, chic: 4, sofisticada: 5 };
  function result() {
    var g = function (id, d) { return ans[id] ? ans[id].v : d; };
    // 1) Talla del rostro: rasgos pesan doble, estructura una vez (1 = petit … 5 = extra grande)
    var deseo = g("deseo", "");
    var sc = (+g("rasgos", 3) * 2 + +g("huesos", 3)) / 3, talla = Math.round(sc);
    // Si cae justo entre dos tallas, decide hacia dónde se inclina por cómo quiere que la vean
    if (sc !== Math.floor(sc) && DESEO_TALLA[deseo]) {
      var lo = Math.floor(sc), hi = Math.ceil(sc);
      if (DESEO_TALLA[deseo] <= lo) talla = lo; else if (DESEO_TALLA[deseo] >= hi) talla = hi;
    }
    // 2) Líneas: el rostro pesa doble, los hombros desempatan; si sigue empatado, decide el deseo
    var lv = { r: 1, c: -1, m: 0 };
    var linea = lv[g("lineas", "m")] * 2 + lv[g("hombros", "m")];
    if (linea === 0) linea = /femenina|original|dulce/.test(deseo) ? -1 : 1;
    var curva = linea < 0, id;
    // 3) Matriz del método: talla × líneas → 7 estilos
    if (talla <= 2) id = curva ? "dulce" : "fresca";
    else if (talla === 3) id = curva ? "original" : "elegante";
    else if (talla === 4) id = curva ? "femenina" : "chic";
    else id = curva ? "femenina" : "sofisticada";
    // Estación: la prueba fucsia/naranja manda; ojos, cabello y contraste afinan
    var eye = g("ojos", ""), hair = g("cabello", "");
    var temp = (g("temp", "f") === "f" ? 2 : -2) + (eye === "azul" ? 1 : eye === "miel" || eye === "verde" ? -1 : 0) + (hair === "cobrizo" ? -1 : 0);
    var inten = (g("contraste", "i") === "i" ? 2 : -2) + (eye === "dark" ? 1 : eye === "azul" ? -1 : 0) + (hair === "oscuro" ? 1 : hair === "rubio" ? -1 : 0);
    var est = temp > 0 ? (inten > 0 ? "invierno" : "verano") : (inten > 0 ? "otono" : "primavera");
    return { id: id, talla: SIZES[talla - 1], tallaN: talla, linea: curva ? "curvas" : "rectas", est: est, segundo: deseo && deseo !== id ? deseo : null };
  }

  // ¿Qué intro del VSL ve? 1) ?intro=  2) respuesta de la pregunta-ruta  3) anuncio de origen  4) general
  function routeIntro() {
    var forced = (params.get("intro") || "").toUpperCase();
    if (INTROS[forced]) return { id: forced, why: "Forzada por URL (?intro=" + forced + ")" };
    var d = ans.dolor ? ans.dolor.v : null;
    if (d && d !== "todo") return { id: DOLOR_TO_INTRO[d], why: "Respondió: «" + ans.dolor.label + "»" };
    var src = [params.get("utm_content"), params.get("utm_term"), params.get("ad"), params.get("utm_campaign")].join(" ").toUpperCase();
    var m = src.match(/\b([ABC][123])\b|_([ABC][123])_|AD([ABC][123])|([ABC])\s?([123])/);
    var ad = m ? (m[1] || m[2] || m[3] || (m[4] + m[5])) : "";
    if (ad && AD_TO_INTRO[ad]) return { id: AD_TO_INTRO[ad], why: (d ? "«Un poco de todo» + " : "") + "anuncio " + ad };
    return { id: "1", why: d ? "Respondió «Un poco de todo», sin anuncio identificado" : "Sin respuesta de ruta" };
  }
  function vslFor(id) { var VS = C.VSL || {}; var v = VS[id] && VS[id].url ? VS[id] : VS["1"] || {}; return { url: v.url || "", reveal: (VS[id] && VS[id].reveal) || v.reveal || 350, own: !!(VS[id] && VS[id].url) }; }

  /* ---------------- Resultado ---------------- */
  var SHIELD = '<svg viewBox="0 0 24 24"><path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/></svg>';
  var LOCK = '<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></svg>';
  var EYEOFF = '<svg viewBox="0 0 24 24"><path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z"/><circle cx="12" cy="12" r="2.5"/></svg>';
  var BOLT = '<svg viewBox="0 0 24 24"><path d="M13 3L5 14h6l-1 7 8-11h-6z"/></svg>';

  function show(r) {
    clearTimers();
    var S = STYLES[r.id], E = SEASONS[r.est], n = nm(), route = routeIntro(), I = INTROS[route.id], VV = vslFor(route.id);
    var eye = ans.ojos ? EYES[ans.ojos.v] : null;
    var dolor = ans.dolor ? ans.dolor.v : "todo";
    try { localStorage.setItem("ybl_quiz_he", JSON.stringify({ estilo: r.id, estacion: r.est, intro: route.id, t: Date.now() })); } catch (e) {}
    track("Lead", { content_name: "Quiz YBL HE · " + S.name, content_category: "quiz", value: 0, currency: "USD" });
    track("ViewContent", { content_name: "Your Best Look", content_category: "quiz", content_ids: ["YBL"], content_type: "product", value: parseFloat(String(C.PRICE || "").replace(/[^\d.]/g, "")) || 80, currency: "USD", quiz: "0", estilo: r.id, intro: route.id });
    track("QuizResult", { estilo: r.id, estacion: r.est, tipo: r.talla, intro: route.id, dolor: dolor, edad: ans.edad && ans.edad.v, lista: ans.lista && ans.lista.v }, true);

    var qs = location.search.replace(/^\?/, "").replace(/(^|&)(intro|debug|preview)=[^&]*/g, "").replace(/^&/, "");
    var url = (C.HOTMART_URL || "#") + "?" + (qs ? qs + "&" : "") + "sck=quizHE_" + r.id + "_" + route.id;
    var btnTxt = "Quiero vestir como " + low(S.name);
    var folio = "N.º " + String(Date.now()).slice(-6);
    var fecha = new Date().toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" });
    var hudR = '<span class="hud hud--l on" style="top:20%">Tipo · ' + r.talla + '</span><span class="hud hud--r on" style="top:44%">Líneas · ' + r.linea + '</span><span class="hud hud--l on" style="top:68%">' + E.name + "</span>";

    var html =
      // 1. VSL arriba
      '<section class="rs rs--narrow vsl vsl--top" id="vsl"><span class="vsl__badge"><i></i> Mensaje de Luzma para ti</span>' +
      '<h2 class="h h--md">En base a lo que respondiste, este es <span class="pk">tu plan personalizado de estilo</span></h2>' +
      '<p class="sub">Basado en el método Your Best Look de Luzma.</p>' +
      '<p class="vsl__quote"><span class="tw" id="tw"></span></p><p class="vsl__who">— Luzma · ' + I.label + "</p>" +
      '<div class="player" id="player"><button class="player__poster" type="button" aria-label="Reproducir el video de Luzma"><img src="' + (C.VSL_POSTER || W + "luzma.webp") + '" alt=""><span class="player__play"><svg width="28" height="32" viewBox="0 0 26 30"><path d="M0 0l26 15L0 30z" fill="#fff"/></svg></span>' +
      '<span class="player__cap"><span class="chunk">' + (n ? n.toUpperCase() + ", " : "") + "<b>DALE PLAY</b></span><small>Tu clase privada · " + S.name + "</small></span></button></div>" +
      '<p class="fine">Activa el sonido · Al final Luzma te dice cómo seguir</p></section>' +

      // 2. Su estilo
      '<header class="rh"><div class="wall">' + wallHTML(5) + '</div><div class="rh__in">' +
      '<div class="rh__meta reveal" style="--d:0"><span>Lectura ' + folio + "</span><span>" + fecha + "</span></div>" +
      '<p class="rh__eres reveal" style="--d:1">' + (n ? n + ", tu" : "Tu") + " rostro tiene la personalidad de</p>" +
      '<h1 class="rh__style reveal" style="--d:2">' + S.name + "</h1>" +
      '<div class="rh__card reveal" style="--d:3">' + mcard('<img src="' + W + S.img + '.webp" alt="">', hudR, "mcard--tall") + "</div>" +
      '<div class="tags reveal" style="--d:4"><span class="tag">Tipo de rostro: <b>' + r.talla + '</b></span><span class="tag">Líneas: <b>' + r.linea + '</b></span><span class="tag">Estación: <b>' + E.name + "</b></span></div>" +
      '<p class="rh__plan reveal" style="--d:5">Este es el primer paso de tu plan personalizado para <b>' + desire() + "</b>.</p>" +
      '<a class="cue reveal" style="--d:6" href="#lectura">Ver mi lectura completa</a></div></header>' +

      // 3. Lo que tu rostro dice
      '<section class="rs" id="lectura"><p class="kicker">Tu lectura</p><h2 class="h h--md">Esto es lo que <span class="pk">tu rostro ya dice</span></h2><div class="grid4">' +
      '<div class="card ros"><p class="card__k">Tipo de rostro</p><div class="mini-sizes">' + DOT.map(function (d, k) { return '<i style="--s:' + d + '"' + (k === r.tallaN - 1 ? ' class="on"' : "") + "></i>"; }).join("") + '</div><p class="card__v">' + r.talla + '</p><p class="card__s">Decide el tamaño de tus aretes, collares y estampados.</p></div>' +
      '<div class="card ros"><p class="card__k">Líneas</p>' + lineIcon(r.linea === "rectas" ? "r" : "c") + '<p class="card__v" style="margin-top:8px">' + r.linea.charAt(0).toUpperCase() + r.linea.slice(1) + '</p><p class="card__s">Deciden tus cuellos, solapas y armazones.</p></div>' +
      '<div class="card ros"><p class="card__k">Estación</p><div class="mini-sw">' + E.sw.map(function (c) { return '<i style="background:' + c + '"></i>'; }).join("") + '</div><p class="card__v">' + E.name + '</p><p class="card__s">' + E.k + " · tu metal: " + E.metal + ".</p></div>" +
      (eye ? '<div class="card card--img ros"><img src="' + CO + eye.img + '.webp" alt=""><div class="card__in"><p class="card__k">Tus ojos</p><p class="card__s">' + eye.hint + "</p></div></div>"
           : '<div class="card ros"><p class="card__k">Tu metal</p><p class="card__v">' + E.metal + "</p></div>") +
      "</div></section>" +

      // 4. Tu instructivo
      '<section class="rs"><p class="kicker">Tu instructivo · ' + S.name + '</p><h2 class="h h--md">Lo que te hace <span class="pk">brillar</span> y lo que te apaga</h2>' +
      '<div class="grid3" style="margin-bottom:12px">' +
      '<div class="card card--img ros"><img src="' + CO + JEWEL[r.tallaN - 1] + '.webp" alt="" loading="lazy"><div class="card__in"><p class="card__k">Tus aretes</p><p class="card__s">Talla ' + r.talla.toLowerCase() + ".</p></div></div>" +
      '<div class="card card--img ros"><img src="' + CO + PRINT[r.tallaN - 1] + '.webp" alt="" loading="lazy"><div class="card__in"><p class="card__k">Tus estampados</p><p class="card__s">Escala ' + r.talla.toLowerCase() + ".</p></div></div>" +
      '<div class="card card--img ros"><img src="' + CO + (r.linea === "rectas" ? "cl-rectas" : "cl-curvas") + '.webp" alt="" loading="lazy"><div class="card__in"><p class="card__k">Tus prendas</p><p class="card__s">' + (r.linea === "rectas" ? "Con estructura." : "Con caída.") + "</p></div></div></div>" +
      '<div class="card ros" style="margin-bottom:12px"><p class="card__k">' + S.name + '</p><p style="margin:0;font:700 18px/1.5 var(--sans);color:var(--ink)">' + S.d + "</p>" +
      (r.segundo ? '<p class="card__s" style="margin-top:10px">Y por cómo te gustaría que te vieran, también hay un lado de <b>' + low(STYLES[r.segundo].name) + "</b> que quiere salir.</p>" : "") + "</div>" +
      '<div class="grid2 grid2--stack"><div class="card ros"><p class="card__k" style="color:var(--pink)">Te hace brillar</p><ul class="lst lst--si">' + S.si.map(function (x) { return "<li>" + x + "</li>"; }).join("") + '</ul></div>' +
      '<div class="card ros"><p class="card__k">Te apaga</p><ul class="lst lst--no">' + S.no.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul></div></div>" +
      '<div class="card ros" style="margin-top:12px"><p class="card__k">Lo que me dijiste</p><p class="card__s" style="font-size:16px">' + (n ? n + ", me" : "Me") + " dijiste que " + PAINS[dolor] + " " +
      (ans.sinusar && ans.sinusar.v === "si" ? "Y esas prendas que casi no usas no son un error tuyo: con tu instructivo vas a saber cuáles rescatar. " : "") + LISTA[ans.lista ? ans.lista.v : "ya"] + "</p></div></section>" +

      // 5. Lo que vas a aprender
      '<section class="rs"><p class="kicker">Dentro de Your Best Look</p><h2 class="h h--md">Lo que vas a descubrir <span class="pk">frente a tu espejo</span></h2><div class="grid2 grid2--stack">' +
      [["Tus líneas", "Rectas o curvas: qué cuellos, solapas y armazones te favorecen."], ["Tus tamaños", "La talla de tus aretes, collares y estampados."], ["El secreto del estampado", "Cuál te ilumina y cuál se come tu rostro."],
       ["Saturación y texturas", "Cuántos elementos aguanta tu imagen antes de que la ropa te gane."], ["La magia del color", "Tu estación con la prueba que haces en casa."], ["El arte de elegirte", "Depura tu clóset y sácale provecho a lo que ya tienes."]]
        .map(function (m, k) { return '<div class="card mod ros"><span class="mod__n">0' + (k + 1) + "</span><div><h3>" + m[0] + "</h3><p>" + m[1] + "</p></div></div>"; }).join("") + "</div></section>" +

      // 6. Oferta
      '<section class="rs rs--narrow" id="oferta"><div class="offer ros"><div class="offer__head"><p class="kicker">Tu siguiente paso</p>' +
      '<h2 class="h">' + (n ? n + ", esto" : "Esto") + ' es tu primera lectura. <span class="pk">Tu instructivo completo está en Your Best Look.</span></h2>' +
      '<p class="sub">La metodología definitiva de Luzma para vestir a ' + low(S.name) + " que ya eres, y " + desire() + ".</p></div>" +
      '<ul class="stack">' +
      "<li><span>Lectura de rostro y tu estilo<small>Lo que harías en una asesoría personal</small></span><em>$300</em></li>" +
      "<li><span>Tu estación de color<small>Con la prueba fucsia y naranja, en casa</small></span><em>$150</em></li>" +
      "<li><span>Estampados, texturas y proporciones<small>Los capítulos que cierran tu instructivo</small></span><em>$97</em></li>" +
      "<li><span>Depuración de clóset<small>Aprovecha lo que ya tienes</small></span><em>$97</em></li>" +
      "<li><span>Cuaderno de trabajo por módulo<small>Tu instructivo, siempre a la mano</small></span><em>$47</em></li>" +
      "<li><span>Acceso de por vida<small>Sin suscripción, sin app, sin caducidad</small></span><em>Incluido</em></li></ul>" +
      '<div class="price"><p class="price__k">Valor total</p><p class="price__was">' + C.PRICE_BEFORE + '</p><p class="price__k" style="color:var(--pink)">Tu acceso hoy · pago único</p><p class="price__now">' + C.PRICE.replace(" USD", "") + '<small> USD</small></p><p class="price__note">Un solo pago · Acceso inmediato y de por vida</p></div>' +
      '<div class="offer__cta"><a class="btn btn--xl" data-checkout href="' + url + '"><span class="btn__t">' + btnTxt + "</span>" + ARROW + "</a>" +
      '<div class="trustb"><div>' + LOCK + '<span>Pago seguro<small>Encriptado SSL 256-bit</small></span></div><div>' + SHIELD + '<span>Checkout Hotmart<small>Plataforma verificada</small></span></div>' +
      "<div>" + EYEOFF + '<span>Datos confidenciales<small>Nunca se comparten</small></span></div><div>' + BOLT + '<span>Acceso inmediato<small>Directo a tu correo</small></span></div></div>' +
      '<p class="hotmart">🔒 Pago 100% seguro procesado por <b>hotmart</b> · Tarjeta de crédito o débito</p>' +
      '<div class="guar"><span class="guar__seal">' + (C.GUARANTEE_DAYS || 7) + '<small>DÍAS</small></span><p><b>Garantía total de ' + (C.GUARANTEE_DAYS || 7) + ' días.</b> Si sientes que no es para ti, Luzma te devuelve tu dinero y listo. El riesgo es suyo.</p></div></div></div></section>' +

      // 7. Testimonios
      '<section class="rs"><div class="rating"><p class="rating__num">' + (C.PROOF_RATING || "4.9") + '</p><p class="stars" style="font-size:22px">★★★★★</p><p class="rating__sub">Lo que dicen las mujeres que ya aprendieron a leer su rostro</p></div>' +
      '<div class="tms">' + marquee(REVIEWS.slice(0, 7), false, 75) + marquee(REVIEWS.slice(7), true, 85) + "</div></section>" +

      // 8. Antes / después
      '<section class="rs"><p class="kicker" style="text-align:center">Misma mujer · misma cara</p><h2 class="h h--md">Tu rostro <span class="sf">protagonista.</span></h2>' +
      '<div class="marquee" style="--dur:46s"><div class="marquee__track">' + baHTML() + '</div></div><p class="fine">Imágenes ilustrativas del método.</p></section>' +

      // 9. FAQ
      '<section class="rs rs--narrow faq"><h2 class="h h--md">Preguntas <span class="pk">frecuentes</span></h2>' +
      "<details><summary>¿Tengo que comprar ropa nueva?</summary><p>No. Empiezas por depurar tu clóset y sacarle provecho a lo que ya tienes. Lo que compres después, lo compras correcto, en fast fashion o en boutique.</p></details>" +
      "<details><summary>¿Funciona en mi etapa?</summary><p>Tu estructura no tiene edad. Tus líneas y tu escala siguen ahí, y lo que te favorece hoy te va a seguir favoreciendo.</p></details>" +
      "<details><summary>¿Cómo lo tomo?</summary><p>Son tutoriales en video, paso a paso, que ves a tu ritmo desde tu casa. Cada módulo trae su cuaderno de trabajo y tienes acceso de por vida.</p></details>" +
      "<details><summary>¿Es una suscripción o una app?</summary><p>Ninguna de las dos. Es un solo pago de " + C.PRICE + ". Se aprende una vez y se queda contigo para siempre.</p></details>" +
      "<details><summary>¿Y si no es para mí?</summary><p>Tienes " + (C.GUARANTEE_DAYS || 7) + " días de garantía total. Si sientes que no es para ti, te devuelven tu dinero.</p></details>" +
      '<div class="again"><a class="btn btn--block" data-checkout href="' + url + '"><span class="btn__t">' + btnTxt + "</span>" + ARROW + "</a></div>" +
      '<div class="again"><button class="btn btn--sm btn--ghost" id="r-again" type="button"><span class="btn__t">Volver a hacer el quiz</span></button></div></section>' +

      '<footer class="foot"><p class="foot__method"><b>La metodología definitiva Your Best Look de Luzma.</b> Diseñadora de imagen con más de 30 años de experiencia, formada en Milán y Nueva York con los más grandes de la industria de la moda. Te revela su método para lucir tu mejor versión a través de aprender a vestir tu tipo de rostro.</p>' + LEGAL + "</footer>";

    var res = $("#result");
    res.innerHTML = html;
    $("#quiz").hidden = true; $("#landing").hidden = true; res.hidden = false;
    document.body.className = "is-result";
    back.hidden = true; $("#stepcount").textContent = "";
    window.scrollTo(0, 0);
    observe(res);
    $$("[data-checkout]").forEach(function (a) { a.setAttribute("href", url); a.addEventListener("click", function () { track("InitiateCheckout", { content_name: "Your Best Look", value: 80, currency: "USD", estilo: r.id, intro: route.id }); }); });
    typewriter($("#tw"), I.q);
    setupPlayer(VV);
    $("#r-again").addEventListener("click", restart);
    $(".cue", res).addEventListener("click", function (e) { e.preventDefault(); $("#lectura").scrollIntoView({ behavior: "smooth" }); });
    if (io) { var oi = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { showSticky(); oi.disconnect(); } }, { threshold: .25 }); oi.observe($("#oferta")); }
    debug(route, VV, r);
  }

  function typewriter(el, txt) {
    if (!el) return; var k = 0, go2 = false;
    function go() { if (go2) return; go2 = true; var t = setInterval(function () { k += 2; el.textContent = "«" + txt.slice(0, k) + (k >= txt.length ? "»" : ""); if (k >= txt.length) { clearInterval(t); el.classList.remove("tw"); } }, 26); }
    if (io) { var o = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { go(); o.disconnect(); } }, { threshold: .6 }); o.observe(el.parentNode); } else go();
  }
  function showSticky() { var s = $("#sticky"); if (s.hidden) { s.hidden = false; fillCommon(s); $$("a", s).forEach(function (a) { a.href = $("#result [data-checkout]").href; }); } }

  function setupPlayer(VV) {
    var box = $("#player"); if (!box) return;
    // Al terminar, se quita el reproductor de Vimeo (sin perfil ni videos sugeridos) y vuelve la portada con el play.
    var posterHTML = box.__poster || (box.__poster = box.innerHTML);
    var backToPoster = function () { box.innerHTML = posterHTML; setupPlayer(VV); };
    $(".player__poster", box).addEventListener("click", function () {
      track("VSLPlay", {}, true);
      if (!VV.url) { box.innerHTML = '<p style="position:absolute;inset:0;display:grid;place-items:center;color:var(--mut)">Video próximamente</p>'; return; }
      if (/\.(mp4|m3u8)(\?|$)/.test(VV.url)) {
        box.innerHTML = '<video src="' + VV.url + '" controls autoplay playsinline></video>';
        var v = $("video", box); v.addEventListener("timeupdate", function () { if (v.currentTime >= VV.reveal) showSticky(); }); v.addEventListener("ended", backToPoster);
        return;
      }
      box.innerHTML = '<iframe src="' + VV.url + (VV.url.indexOf("?") > -1 ? "&" : "?") + 'autoplay=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="Your Best Look · Luzma"></iframe>';
      if (/vimeo/.test(VV.url)) {
        var sc = document.createElement("script"); sc.src = "https://player.vimeo.com/api/player.js";
        sc.onload = function () { try { var p = new window.Vimeo.Player($("iframe", box)); p.on("timeupdate", function (d) { if (d.seconds >= VV.reveal) showSticky(); if (d.duration && d.seconds >= d.duration - 0.4) backToPoster(); }); p.on("ended", backToPoster); } catch (e) {} };
        if (window.Vimeo && window.Vimeo.Player) sc.onload(); else document.head.appendChild(sc);
      } else later(showSticky, VV.reveal * 1000);
    });
  }

  function debug(route, VV, r) {
    if (params.get("debug") !== "1") return;
    var d = $("#debug"); d.hidden = false;
    d.innerHTML = "<b>Intro VSL:</b> " + route.id + " · " + INTROS[route.id].label + "<br><b>Motivo:</b> " + route.why + "<br><b>Audio:</b> " + INTROS[route.id].file +
      "<br><b>Video:</b> " + (VV.own ? "propio de la intro" : "usa el general (falta URL de " + route.id + ")") + " · CTA a los " + VV.reveal + "s<br><b>Estilo:</b> " + r.id + " · <b>Estación:</b> " + r.est;
  }
  function restart() { ans = {}; i = 0; hist = []; R = null; $("#result").hidden = true; $("#sticky").hidden = true; $("#debug").hidden = true; start(); }
  function start() {
    if (!started) { started = true; track("QuizStart", {}, true); }
    $("#landing").hidden = true; $("#quiz").hidden = false;
    document.body.className = "is-quiz";
    $$("#landing video").forEach(function (v) { v.pause(); });
    render();
  }
  $$("[data-start]").forEach(function (b) { b.addEventListener("click", start); });

  // Atajos de revisión: ?preview=elegante&intro=1A  ·  ?step=tallas
  if (params.get("preview") && STYLES[params.get("preview")]) {
    ans = { nombre: { v: "María" }, dolor: { v: "todo", label: "Un poco de todo" }, edad: { v: "55", label: "55 a 64" }, ojos: { v: "miel" }, lista: { v: "miedo" }, metas: { ks: [0], vs: ["bonita"] }, sinusar: { v: "si" } };
    var pv = params.get("preview");
    show({ id: pv, talla: "Mediano", tallaN: 3, linea: /femenina|original|dulce/.test(pv) ? "curvas" : "rectas", est: "otono", segundo: null });
  } else if (params.get("step")) {
    var si = STEPS.findIndex(function (x) { return x.id === params.get("step"); });
    if (si > -1) { ans = { nombre: { v: "María" }, dolor: { v: "espejo", label: "" }, metas: { ks: [0], vs: ["bonita"] }, ojos: { v: "miel" } }; start(); hist = [0]; i = si; render(); }
  }
})();

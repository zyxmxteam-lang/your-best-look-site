/* Quiz "¿Qué personalidad tiene tu rostro?" · método de Luzma
   Tipo de rostro (rasgos + estructura, de petit a extra grande) + líneas (rectas / curvas)
   → la personalidad de tu rostro, uno de los 7 estilos.
   Prueba fucsia / naranja + contraste → estación de color. */
(function () {
  var C = window.YBL || {};

  // ---------- Datos del método ----------
  var SIZES = ["Petit", "Chico", "Mediano", "Grande", "Extra grande"];
  var DOT = [0.16, 0.3, 0.48, 0.7, 1];

  var STYLES = {
    dulce: {
      name: "La dulce", tipo: "Petit", q: "¿Represento esa dulzura?", c: "#c47a9f",
      d: "Rasgos finos y delicados. Tu belleza está en el detalle: lo pequeño, lo fino y lo suave te hacen brillar.",
      care: "Pero cuidado: inocente, nunca boba.",
      si: ["Estampados diminutos: lunares pequeñitos, florecitas, rayas finas.", "Aretes de broquel o gotitas, cadenas delgadas.", "Telas ligeras y suaves: seda, algodón fino, punto delgado."],
      no: ["Estampados grandes que se comen tu rostro.", "Joyería voluminosa o piezas pesadas.", "Telas muy rígidas o con mucho cuerpo."]
    },
    fresca: {
      name: "La fresca", tipo: "Chico", q: "¿Me veo cómoda?", c: "#4f6b4a",
      d: "Relajada y natural. Te ves mejor cuando nada se ve forzado: lo sencillo, práctico y luminoso es lo tuyo.",
      care: "Pero cuidado: cómoda no significa descuidada.",
      si: ["Estampados pequeños y casuales: cuadritos, rayas, flores chicas.", "Accesorios ligeros con un toque de personalidad.", "Texturas naturales: lino, algodón, mezclilla ligera."],
      no: ["Piezas maxi que te cargan.", "Looks demasiado rígidos o de gala para el día a día.", "Telas pesadas o muy brillantes."]
    },
    original: {
      name: "La original", tipo: "Mediano curvo", q: "¿Me veo divertida?", c: "#c27a2e",
      d: "Versátil, con movimiento y asimetrías. Lo inesperado te sienta: mezclas, cortes con gracia y detalles creativos.",
      care: "Original, nunca ridícula.",
      si: ["Estampados medianos con movimiento: ondas, flores, paisley.", "Aretes medianos con forma: asimétricos, orgánicos.", "Cortes con movimiento: drapeados, asimetrías, volantes medidos."],
      no: ["Looks demasiado serios o rígidos.", "Geometrías muy duras.", "Juntar demasiadas ideas en un solo look."]
    },
    elegante: {
      name: "La elegante", tipo: "Mediano recto", q: "¿Reflejo esa elegancia?", c: "#6b4a8a",
      d: "Clásica y minimalista. Pocas piezas, muy bien elegidas: líneas limpias, buena tela y cero ruido.",
      care: "Elegancia no es rigidez; formal no es anticuada.",
      si: ["Estampados medianos y ordenados: rayas, cuadros, geométricos sutiles.", "Aretes medianos de líneas limpias, collares sencillos.", "Cortes estructurados: sacos, solapas, pantalón de línea recta."],
      no: ["Estampados recargados o muy románticos.", "Exceso de accesorios a la vez.", "Volantes y holanes por todos lados."]
    },
    femenina: {
      name: "La femenina", tipo: "Grande curvo", q: "¿Qué tan bien la represento?", c: "#a85d84",
      d: "Extremadamente femenina e incluso sexy. Pero nunca sobrecargada.",
      care: "La única que puede con lo grande y lo extra grande, sin parecer arbolito de Navidad fuera de temporada.",
      si: ["Estampados grandes y curvos: flores grandes, ondas, animal print suave.", "Aretes y collares con presencia y formas redondeadas.", "Telas con caída: seda, crepé, punto que acompañe tus curvas."],
      no: ["Estampados diminutos que se pierden.", "Cortes muy rectos y masculinos.", "Ponerte todo lo grande al mismo tiempo."]
    },
    chic: {
      name: "La chic", tipo: "Grande recto", q: "¿Me veo nice?", c: "#9a7440",
      d: "Distinguida y vanguardista. Tomas lo más chic de la moda, sin verte falsa ni disfrazada.",
      care: "Toma de la moda solo lo que habla de ti.",
      si: ["Estampados grandes y gráficos: geométricos, rayas anchas, bloques de color.", "Accesorios con presencia y líneas definidas.", "Prendas con estructura: sacos, abrigos, cortes arquitectónicos."],
      no: ["Estampados pequeños y tímidos.", "Looks demasiado románticos o aniñados.", "Seguir cada tendencia al pie de la letra."]
    },
    sofisticada: {
      name: "La sofisticada", tipo: "Extra grande recto", q: "¿Estoy expresando mi glamour?", c: "#3a3a3a",
      d: "Su enorme elegancia, refinamiento y sofisticación se hace evidente.",
      care: "Pero cuidado: no requieres intimidar. Presencia no es intimidación.",
      si: ["Estampados XL o bloques de color sólidos.", "Pocas piezas y muy buenas: un collar, unos aretes protagonistas.", "Telas con cuerpo y estructura: lana, gabardina, satín grueso."],
      no: ["Accesorios pequeños que desaparecen.", "Estampados menudos y recargados.", "Mezclar demasiadas piezas protagonistas."]
    }
  };

  var SEASONS = {
    invierno: { name: "Invierno", k: "Fría · intensa", d: "Contrastes fuertes, como la noche oscura sobre la nieve. Colores puros y plateados.", sw: ["#0b1d4f", "#c4004f", "#ffffff", "#4b2aa8", "#111111"], metal: "plata" },
    verano: { name: "Verano", k: "Fría · suave", d: "Cabello cenizo, contraste suave. Imagina los colores vistos a través de la lluvia.", sw: ["#8fa3bf", "#c98da5", "#a7a3b8", "#5e7186", "#e8dfe8"], metal: "plata" },
    otono: { name: "Otoño", k: "Cálida · intensa", d: "Destellos cobrizos y dorados. Ocres, terracotas y verde olivo, como las hojas de un árbol canadiense durante esa estación.", sw: ["#b5651d", "#6b7a2a", "#c99a3b", "#8b3a1e", "#4a3424"], metal: "oro" },
    primavera: { name: "Primavera", k: "Cálida · suave", d: "Un colorido fresco, cálido y luminoso que evoca el despertar de la naturaleza. Corales delicados, verdes frescos y tonos durazno aportan luz y armonía.", sw: ["#ff8a6b", "#9ccc4a", "#f5c36b", "#f29e7c", "#fff1d6"], metal: "oro" }
  };

  var SECTIONS = ["Tu rostro", "Tus colores", "Tu estilo"];

  // Pasos: single / multi / info / phase. sec = sección de la barra (null = sin barra)
  var STEPS = [
    { id: "edad", type: "single", sec: 0, q: "Para empezar, ¿cuántos años tienes?", sub: "Así ajustamos tu resultado a tu etapa.",
      o: [["25 a 34", "25"], ["35 a 44", "35"], ["45 a 54", "45"], ["55 a 64", "55"], ["65 o más", "65"]] },
    { id: "nombre", type: "name", sec: 0, q: "¿Cómo te llamas?", sub: "Para armar tu resultado a tu nombre." },
    { id: "metas", type: "multi", sec: 0, q: "¿Qué te gustaría lograr con tu imagen?", sub: "Elige todas las que quieras.",
      o: [["Volver a sentirme bonita", "bonita"], ["Vestirme en 5 minutos sin dudar", "rapido"], ["Dejar de gastar en ropa que no uso", "ahorro"],
        ["Descubrir mis mejores colores", "color"], ["Verme profesional y segura", "pro"], ["Que mi imagen diga quién soy", "yo"]] },
    { id: "imagina", type: "info", sec: null, k: "Imagina", t: "Abrir tu clóset, estirar la mano y que lo que salga vaya perfecto contigo.",
      p: "Sin adivinar y sin compras que se quedan colgadas con etiqueta. Todo empieza por saber qué personalidad tiene tu rostro.", btn: "Descubrirlo" },
    { id: "rasgos", type: "single", sec: 0, dots: true, q: "Frente al espejo, con el cabello recogido: tus rasgos (ojos, nariz, boca) se ven…", sub: "Fíjate en el tamaño, no en si te gustan.",
      o: [["Muy finos y delicados", "1", "Como de muñequita"], ["Pequeños y armoniosos", "2", "Nada llama la atención por grande"], ["Medianos", "3", "Ni grandes ni pequeños"],
        ["Grandes y expresivos", "4", "Ojos, boca o nariz con presencia"], ["Muy grandes y marcados", "5", "Se notan desde lejos"]] },
    { id: "huesos", type: "single", sec: 0, dots: true, q: "Ahora tu estructura: tu muñeca, tus hombros y tu mandíbula son…", sub: "Tu estructura no cambia aunque cambie tu peso.",
      o: [["Muy finos", "1"], ["Delgados", "2"], ["Medianos", "3"], ["Anchos y firmes", "4"], ["Muy anchos y fuertes", "5"]] },
    { id: "tallas", type: "info", sec: null, sizes: true, k: "Lo que nadie te había dicho", t: "Así como tienes talla de ropa, también tienes otras tallas.",
      p: "En estampados, aretes, collares, solapas y hasta corte de cabello. Esa talla no la decide tu estatura, ni tu peso, ni tu edad. La decide tu rostro.", btn: "Seguir" },
    { id: "lineas", type: "single", sec: 0, lines: true, q: "¿Qué predomina en tu rostro?", sub: "En la naturaleza solo hay dos: rectas y curvas. Todas tenemos ambas, pero una predomina.",
      o: [["Rectas", "r", "Mandíbula marcada, pómulos y cejas angulares"], ["Curvas", "c", "Mejillas suaves, rostro redondeado, labios llenos"], ["Una mezcla, no estoy segura", "m", "Lo afinamos con la siguiente pregunta"]] },
    { id: "hombros", type: "single", sec: 0, lines: true, q: "Y tus hombros, vistos de frente, son…",
      o: [["Rectos y marcados", "r"], ["Redondeados y suaves", "c"], ["No sé", "m"]] },
    { id: "fase1", type: "phase", from: 0, to: 40, label: "Leyendo la personalidad de tu rostro…", done: "rostro" },
    { id: "temp", type: "single", sec: 1, swatch: true, q: "La prueba de Luzma: pon algo fucsia y algo naranja junto a tu cara, sin maquillaje. ¿Con cuál te ves con más luz?",
      sub: "Si no tienes nada a la mano, elige el metal que mejor te queda.",
      o: [["Con el fucsia", "f", "fucsia"], ["Con el naranja", "w", "naranja"], ["No lo tengo a la mano: me ilumina más la plata", "f", "plata"], ["No lo tengo a la mano: me ilumina más el oro", "w", "oro"]] },
    { id: "contraste", type: "single", sec: 1, q: "Tu colorido natural (piel, ojos y cabello de nacimiento, no el del tinte) es…",
      o: [["De alto contraste", "i", "Cabello oscuro, ojos intensos o mucha diferencia con tu piel"], ["Suave", "s", "Tonos claros o medios que se funden entre sí"]] },
    { id: "fase2", type: "phase", from: 40, to: 75, label: "Buscando tu estación de color…", done: "color" },
    { id: "dolor", type: "multi", sec: 2, q: "¿Qué te pasa frente al clóset?", sub: "Elige todas las que te suenen.",
      o: [["Tengo el clóset lleno y la sensación de «no tengo qué ponerme».", "lleno"], ["Me pruebo varias cosas y termino con lo de siempre.", "siempre"],
        ["Lo que se ve increíble en otras, en mí no luce igual.", "copia"], ["Hay colores que me apagan o me hacen ver cansada.", "color"],
        ["Mi cuerpo cambió y ya nada me queda como antes.", "cuerpo"], ["Compro en oferta y casi nunca lo uso.", "oferta"]] },
    { id: "algo", type: "single", sec: 2, q: "¿Te ha pasado que te arreglas, te ves al espejo y aun así sientes que «algo no cuadra»?",
      o: [["Sí, muchas veces", "mucho"], ["A veces", "aveces"], ["Casi nunca", "nunca"]] },
    { id: "deseo", type: "single", sec: 2, q: "Cuando entras a un lugar, ¿qué te encantaría que pensaran de ti?",
      o: [["«Qué linda y cercana»", "dulce"], ["«Qué natural y relajada»", "fresca"], ["«Qué creativa y divertida»", "original"], ["«Qué elegante y segura»", "elegante"],
        ["«Qué femenina y atractiva»", "femenina"], ["«Qué moderna, siempre impecable»", "chic"], ["«Qué imponente y sofisticada»", "sofisticada"]] },
    { id: "lista", type: "single", sec: 2, q: "Última: ¿qué tan lista estás para dejar de adivinar frente al clóset?",
      o: [["¡Lista! Ya quiero verme como yo", "ya"], ["Con ganas, pero me da miedo equivocarme otra vez", "miedo"], ["Primero quiero entender bien de qué se trata", "ver"]] },
    { id: "fase3", type: "phase", from: 75, to: 100, label: "Armando tu perfil completo…", done: "perfil" }
  ];

  var PAINS = {
    lleno: "Tu clóset no está vacío: está lleno de prendas que no van con el tipo de tu rostro ni con tu estación. Cuando lo sabes, cada prenda empieza a combinar con las demás.",
    siempre: "Terminas con lo de siempre porque es lo único que sabes que te funciona. Con tu instructivo vas a saber por qué te funciona y a encontrar muchas más opciones.",
    copia: "Una copia nunca superará al original: lo que le queda a otra está pensado para la personalidad de su rostro, no del tuyo. Por eso en ti no luce igual.",
    color: "Ese color que te apaga probablemente no es de tu estación. No tienes que renunciar a él: aprenderás a usarlo lejos de tu cara.",
    cuerpo: "Tu cuerpo cambió, pero tu construcción natural no. El tipo de tu rostro y tus líneas siguen ahí, y desde ahí se vuelve a armar todo.",
    oferta: "La oferta es barata solo si la usas. Cuando conoces tu estilo y tu estación, dejas de comprar lo que se queda colgado con etiqueta."
  };
  var METAS = { bonita: "volver a sentirte bonita", rapido: "vestirte en 5 minutos sin dudar", ahorro: "dejar de gastar en ropa que no usas",
    color: "descubrir tus mejores colores", pro: "verte profesional y segura", yo: "que tu imagen diga quién eres" };
  var EDADES = { "25": "Empezar a esta edad te ahorra años de compras equivocadas.", "35": "Es el momento perfecto para dejar de adivinar y tener tu instructivo para siempre.",
    "45": "Tu estructura no tiene edad: lo que te favorece hoy te va a seguir favoreciendo.", "55": "Tu estructura no tiene edad: nunca es tarde para verte como tú.",
    "65": "Verte bien no tiene edad, y tu rostro sigue sabiendo qué ponerte." };
  var LISTA = {
    ya: "Estás lista. Lo único que te falta es el método para confirmarlo frente a tu espejo.",
    miedo: "Es normal tener miedo de equivocarte otra vez. Por eso tienes 7 días de garantía: si sientes que no es para ti, pides tu reembolso completo.",
    ver: "Antes de decidir, mira la clase de Luzma: en 6 minutos te explica de qué se trata."
  };

  // ---------- Estado y utilidades ----------
  var ans = {}, i = 0, hist = [], started = false, R = null;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var app = $("#quiz"), stage = $("#stage"), bars = $("#bars"), back = $("#back");

  function track(ev, data, custom) {
    if (typeof window.fbq !== "function") return;
    window.fbq(custom ? "trackCustom" : "track", ev, data || {});
  }
  function low(n) { return n.replace("La ", "la "); }
  function nm(after) { var n = ans.nombre && ans.nombre.v; return n ? n + (after || ", ") : ""; }
  function cap(t) { return t.charAt(0).toUpperCase() + t.slice(1); }
  function dotsHTML(on) {
    var h = '<span class="qz-dots" aria-hidden="true">';
    for (var k = 0; k < 5; k++) h += '<i style="--s:' + DOT[k] + '"' + (k === on ? ' class="on"' : "") + "></i>";
    return h + "</span>";
  }
  function sizesHTML(on) {
    return SIZES.map(function (n, k) { return '<span class="' + (k === on ? "on" : "") + '"><i style="--s:' + DOT[k] + '"></i>' + n + "</span>"; }).join("");
  }
  function lineIcon(v) {
    if (v === "r") return '<svg class="qz-ico" viewBox="0 0 48 48" aria-hidden="true"><path d="M8 40 L24 8 L40 40 Z"/></svg>';
    if (v === "c") return '<svg class="qz-ico" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="16"/></svg>';
    return '<svg class="qz-ico" viewBox="0 0 48 48" aria-hidden="true"><path d="M8 38 L24 10 L32 24"/><path d="M30 26 a10 10 0 1 0 0.1 0"/></svg>';
  }
  function swatch(v) {
    var c = { fucsia: "#d6247f", naranja: "#ef7d22", plata: "linear-gradient(135deg,#f4f4f6,#a9adb5,#e9eaee)", oro: "linear-gradient(135deg,#f6e3a1,#c9962e,#f3d67b)" }[v];
    return '<span class="qz-sw" style="background:' + c + '" aria-hidden="true"></span>';
  }

  // Barra en 3 secciones: cada una se llena según las preguntas contestadas de esa sección
  function updateBars() {
    var s = STEPS[i], cur = s.sec;
    if (cur === null || cur === undefined) { for (var j = i; j >= 0; j--) if (STEPS[j].sec !== null && STEPS[j].sec !== undefined) { cur = STEPS[j].sec; break; } }
    bars.querySelectorAll(".qz-seg").forEach(function (seg, k) {
      var ids = STEPS.filter(function (x) { return x.sec === k; });
      var done = ids.filter(function (x) { return STEPS.indexOf(x) < i || (STEPS.indexOf(x) === i && s.type === "phase"); }).length;
      var pct = k < cur ? 100 : k > cur ? 0 : Math.round(done / ids.length * 100);
      seg.querySelector("i").style.width = pct + "%";
      seg.classList.toggle("on", k === cur);
    });
  }

  // ---------- Pantallas ----------
  function render() {
    var s = STEPS[i];
    back.hidden = hist.length === 0 || s.type === "phase";
    updateBars();
    var h = "";
    if (s.type === "single" || s.type === "multi") {
      var multi = s.type === "multi";
      var sub = s.sub;
      if (s.id === "metas") sub = (ans.nombre ? "Mucho gusto, " + ans.nombre.v + ". " : "") + (ans.edad ? "Ajustamos tu resultado a tus " + ans.edad.label.replace(" o más", " y más") + " años. " : "") + s.sub;
      if (s.id === "rasgos" && ans.nombre) sub = ans.nombre.v + ", fíjate en el tamaño, no en si te gustan.";
      if (s.id === "dolor" && ans.nombre) sub = "Sé honesta, " + ans.nombre.v + ": nadie más lo va a ver. Elige todas las que te suenen.";
      h = '<div class="qz-card"><p class="qz-step">' + SECTIONS[s.sec] + "</p><h2>" + s.q + "</h2>" + (sub ? '<p class="qz-help">' + sub + "</p>" : "") +
        '<div class="qz-opts" role="' + (multi ? "group" : "radiogroup") + '">' + s.o.map(function (o, k) {
          var ico = s.dots ? dotsHTML(k) : s.lines ? lineIcon(o[1]) : s.swatch ? swatch(o[2]) : multi ? '<span class="qz-check" aria-hidden="true"></span>' : "";
          var small = s.swatch ? "" : o[2] ? "<small>" + o[2] + "</small>" : "";
          var sel = multi ? (ans[s.id] && ans[s.id].ks.indexOf(k) > -1) : (ans[s.id] && ans[s.id].k === k);
          return '<button type="button" role="' + (multi ? "checkbox" : "radio") + '" aria-checked="' + !!sel + '" class="qz-opt' + (sel ? " is-sel" : "") + '" data-k="' + k + '">' + ico + "<span><b>" + o[0] + "</b>" + small + "</span></button>";
        }).join("") + "</div>" +
        (multi ? '<button class="btn btn--block qz-go" type="button"' + (ans[s.id] && ans[s.id].ks.length ? "" : " disabled") + '>Continuar <i class="btn__arrow">→</i></button>' : "") + "</div>";
    } else if (s.type === "name") {
      var val = ans.nombre ? ans.nombre.v : "";
      h = '<div class="qz-card"><p class="qz-step">' + SECTIONS[s.sec] + "</p><h2>" + s.q + '</h2><p class="qz-help">' + s.sub + "</p>" +
        '<form class="qz-name"><input id="qz-name" name="nombre" type="text" autocomplete="given-name" maxlength="30" placeholder="Tu nombre" value="' + val.replace(/"/g, "") + '">' +
        '<button class="btn btn--block qz-go" type="submit">Continuar <i class="btn__arrow">→</i></button></form><button class="qz-skip qz-go" type="button">Prefiero no decirlo</button></div>';
    } else if (s.type === "info") {
      h = '<div class="qz-card qz-info"><p class="kicker">' + s.k + "</p><h2>" + s.t + "</h2>" +
        (s.sizes ? '<div class="qz-sizes" aria-hidden="true">' + sizesHTML(-1) + "</div>" : "") +
        "<p>" + s.p + '</p><button class="btn qz-go" type="button">' + s.btn + ' <i class="btn__arrow">→</i></button></div>';
    } else if (s.type === "phase") {
      return phase(s);
    }
    paint(h);
  }

  function paint(h) {
    stage.innerHTML = h;
    stage.classList.remove("qz-in"); void stage.offsetWidth; stage.classList.add("qz-in");
    window.scrollTo({ top: 0, behavior: "smooth" });
    track("QuizStep", { step: i + 1, question: STEPS[i].id }, true);
  }

  // Pantalla de análisis: el porcentaje sube y al final adelanta una parte del resultado
  function phase(s) {
    R = result();
    paint('<div class="qz-card qz-phase"><div class="qz-ring" style="--p:' + s.from + '"><b>' + s.from + '%</b></div><h2>' + s.label + '</h2><div class="qz-reveal" hidden></div></div>');
    var ring = $(".qz-ring", stage), num = $("b", ring), p = s.from;
    var t = setInterval(function () {
      p++; ring.style.setProperty("--p", p); num.textContent = p + "%";
      if (p >= s.to) { clearInterval(t); reveal(s); }
    }, 2400 / (s.to - s.from));
  }
  function reveal(s) {
    var S = STYLES[R.id], E = SEASONS[R.est], box = $(".qz-reveal", stage), h2 = $("h2", stage), h;
    if (s.done === "rostro") {
      h2.textContent = nm() ? nm() + "tu tipo de rostro está definido" : "Tu tipo de rostro está definido";
      h = '<div class="qz-sizes qz-sizes--res">' + sizesHTML(R.tallaN - 1) + '</div><p>Tipo <b>' + R.talla + "</b> con líneas <b>" + R.linea + "</b>. Ya tenemos la mitad de tu instructivo. Ahora, tus colores.</p>";
    } else if (s.done === "color") {
      h2.textContent = nm() ? nm() + "tus colores están definidos" : "Tus colores están definidos";
      h = '<div class="qz-sw5 qz-sw5--mini">' + E.sw.map(function (c) { return '<i style="background:' + c + '"></i>'; }).join("") + "</div><p>Cuando integras los colores de tu estación, la gente no sabrá qué te hiciste, pero te dirá: <b>¡Qué bien te ves!</b> Falta lo más importante: tu estilo.</p>";
    } else {
      h2.textContent = "¡Listo" + (ans.nombre ? ", " + ans.nombre.v : "") + "! Tu rostro tiene personalidad";
      h = '<p class="qz-big">' + S.name + '</p><blockquote>«Nadie tiene nada que corregir y sí mucho que expresar.»<cite>Luzma</cite></blockquote>';
    }
    box.innerHTML = h + '<button class="btn qz-go" type="button">' + (s.done === "perfil" ? "Ver mi resultado" : "Continuar") + ' <i class="btn__arrow">→</i></button>';
    box.hidden = false;
  }

  // ---------- Interacción ----------
  stage.addEventListener("click", function (e) {
    var s = STEPS[i];
    if (e.target.closest(".qz-go")) { if (s.type === "name") { if (e.target.closest(".qz-skip")) saveName(e); return; } if (s.type === "multi") track("QuizAnswer", { question: s.id, answer: ans[s.id].vs.join(",") }, true); return next(); }
    var b = e.target.closest(".qz-opt"); if (!b) return;
    var k = +b.getAttribute("data-k");
    if (s.type === "multi") {
      var a = ans[s.id] || { ks: [], vs: [] }, at = a.ks.indexOf(k);
      if (at > -1) { a.ks.splice(at, 1); a.vs.splice(at, 1); } else { a.ks.push(k); a.vs.push(s.o[k][1]); }
      ans[s.id] = a;
      b.classList.toggle("is-sel", at === -1); b.setAttribute("aria-checked", at === -1);
      $(".qz-go", stage).disabled = !a.ks.length;
      return;
    }
    ans[s.id] = { k: k, v: s.o[k][1], label: s.o[k][0] };
    stage.querySelectorAll(".qz-opt").forEach(function (x) { x.classList.toggle("is-sel", x === b); });
    track("QuizAnswer", { question: s.id, answer: s.o[k][1] }, true);
    setTimeout(next, 280);
  });
  stage.addEventListener("submit", function (e) { e.preventDefault(); saveName(e); });
  function saveName(e) {
    var v = e.target.closest && e.target.closest(".qz-skip") ? "" : ($("#qz-name", stage).value || "").trim().split(/\s+/)[0] || "";
    v = v.replace(/[<>"&]/g, "");
    if (v) ans.nombre = { v: cap(v.toLowerCase()) }; else delete ans.nombre;
    next();
  }
  back.addEventListener("click", function () { if (hist.length) { i = hist.pop(); render(); } });

  function next() {
    hist.push(i); i++;
    if (i >= STEPS.length) return show(R || result());
    render();
  }

  // ---------- Cálculo ----------
  function result() {
    var g = function (id, d) { return ans[id] ? ans[id].v : d; };
    var talla = Math.round((+g("rasgos", 3) * 2 + +g("huesos", 3)) / 3);     // 1–5, los rasgos pesan doble
    var lv = { r: 1, c: -1, m: 0 };
    var linea = lv[g("lineas", "m")] * 2 + lv[g("hombros", "m")];
    var deseo = g("deseo", "");
    if (linea === 0) linea = /femenina|original|dulce/.test(deseo) ? -1 : 1;   // empate: lo decide la personalidad
    var curva = linea < 0, id;
    if (talla <= 1) id = "dulce";
    else if (talla === 2) id = "fresca";
    else if (talla === 3) id = curva ? "original" : "elegante";
    else if (talla === 4) id = curva ? "femenina" : "chic";
    else id = curva ? "femenina" : "sofisticada";
    var fria = g("temp", "f") === "f", intensa = g("contraste", "i") === "i";
    var est = fria ? (intensa ? "invierno" : "verano") : (intensa ? "otono" : "primavera");
    return { id: id, talla: SIZES[talla - 1], tallaN: talla, linea: curva ? "curvas" : "rectas", est: est, segundo: deseo && deseo !== id ? deseo : null };
  }

  function show(r) {
    var S = STYLES[r.id], E = SEASONS[r.est];
    var metas = (ans.metas ? ans.metas.vs : ["yo"]).map(function (m) { return METAS[m]; });
    var dolor = ans.dolor ? ans.dolor.vs[0] : "lleno";
    try { localStorage.setItem("ybl_quiz", JSON.stringify({ estilo: r.id, estacion: r.est, t: Date.now() })); } catch (e) {}
    track("Lead", { content_name: "Quiz YBL · " + S.name, content_category: "quiz", value: 0, currency: "USD" });
    track("QuizResult", { estilo: r.id, estacion: r.est, tipo: r.talla, edad: ans.edad && ans.edad.v, dolor: dolor, lista: ans.lista && ans.lista.v }, true);

    $("#r-style").textContent = S.name;
    $("#r-eres").textContent = (ans.nombre ? ans.nombre.v + ", tu" : "Tu") + " rostro tiene la personalidad de";
    $("#r-offer-h").firstChild.textContent = (ans.nombre ? ans.nombre.v + ", esto" : "Esto") + " es tu primera lectura. ";
    var algo = ans.algo && ans.algo.v !== "nunca" ? "Esa sensación de que «algo no cuadra» tiene explicación: tu ropa no está hablando el idioma de tu rostro. " : "";
    $("#r-algo").textContent = algo;
    $("#r-q").textContent = S.q;
    $("#r-tag").innerHTML = "Tipo de rostro: <b>" + r.talla + "</b> · Líneas: <b>" + r.linea + "</b> · Estación: <b>" + E.name + "</b>";
    $("#r-desc").textContent = S.d + " " + S.care;
    $("#r-card").style.setProperty("--c", S.c);
    $("#r-size").innerHTML = sizesHTML(r.tallaN - 1);
    $("#r-si").innerHTML = S.si.map(function (x) { return "<li>" + x + "</li>"; }).join("");
    $("#r-no").innerHTML = S.no.map(function (x) { return "<li>" + x + "</li>"; }).join("");
    $("#r-est").textContent = E.name;
    $("#r-estk").textContent = E.k;
    $("#r-estd").textContent = E.d + " Tu metal: " + E.metal + ".";
    $("#r-sw").innerHTML = E.sw.map(function (c) { return '<i style="background:' + c + '"></i>'; }).join("");
    $("#r-pain").textContent = PAINS[dolor];
    $("#r-age").textContent = ans.edad ? EDADES[ans.edad.v] : "";
    $("#r-meta").textContent = metas.length > 1 ? metas.slice(0, -1).join(", ") + " y " + metas[metas.length - 1] : metas[0];
    $("#r-lista").textContent = LISTA[ans.lista ? ans.lista.v : "ya"];
    var sg = $("#r-second");
    if (r.segundo) { sg.hidden = false; $("b", sg).textContent = low(STYLES[r.segundo].name); }

    // Botones a Hotmart: se conservan los UTM de la visita y se marca el estilo como origen (sck)
    var qs = window.location.search.replace(/^\?/, "");
    var url = (C.HOTMART_URL || "#") + "?" + (qs ? qs + "&" : "") + "sck=quiz_" + r.id;
    document.querySelectorAll("[data-checkout]").forEach(function (a) { a.setAttribute("href", url); });
    $("#r-btn").textContent = "Quiero aprender a vestir como " + low(S.name);

    var share = "Descubrí que mi rostro tiene personalidad de " + low(S.name) + " y soy " + E.name + ". Haz el quiz de Luzma, es gratis y dura 2 minutos: " + location.origin + location.pathname;
    $("#r-share").setAttribute("href", "https://wa.me/?text=" + encodeURIComponent(share));

    app.hidden = true;
    $("#resultado").hidden = false;
    document.body.classList.add("qz-done");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ---------- Inicio ----------
  bars.innerHTML = SECTIONS.map(function (n) { return '<span class="qz-seg"><i></i><em>' + n + "</em></span>"; }).join("");
  document.querySelectorAll("[data-start]").forEach(function (b) {
    b.addEventListener("click", function () {
      if (!started) { started = true; track("QuizStart", { page: "quiz" }, true); }
      $("#intro").hidden = true;
      app.hidden = false;
      document.body.classList.add("qz-on");
      render();
    });
  });
  $("#r-again").addEventListener("click", function () {
    ans = {}; i = 0; hist = []; R = null;
    $("#resultado").hidden = true; document.body.classList.remove("qz-done");
    $("#r-second").hidden = true;
    app.hidden = false; render();
  });
})();

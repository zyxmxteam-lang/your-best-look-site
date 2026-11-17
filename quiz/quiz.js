/* Quiz "¿Cuál de los 7 estilos eres?" · método de Luzma
   Talla de rostro (rasgos + estructura) + líneas (rectas / curvas) → 1 de los 7 estilos.
   Prueba fucsia / naranja + contraste → estación de color. */
(function () {
  var C = window.YBL || {};

  // ---------- Datos del método ----------
  var SIZES = ["Petit", "Chico", "Mediano", "Grande", "Extra grande"];

  var STYLES = {
    dulce: {
      name: "La dulce", talla: "Petit", q: "¿Represento esa dulzura?", c: "#c47a9f",
      d: "Rasgos finos y delicados. Tu belleza está en el detalle: lo pequeño, lo fino y lo suave te hacen brillar.",
      care: "Pero cuidado: inocente, nunca boba.",
      si: ["Estampados diminutos: lunares pequeñitos, florecitas, rayas finas.", "Aretes de broquel o gotitas, cadenas delgadas.", "Telas ligeras y suaves: seda, algodón fino, punto delgado."],
      no: ["Estampados grandes que se comen tu rostro.", "Joyería voluminosa o piezas pesadas.", "Telas muy rígidas o con mucho cuerpo."]
    },
    fresca: {
      name: "La fresca", talla: "Chico", q: "¿Me veo cómoda?", c: "#4f6b4a",
      d: "Relajada y natural. Te ves mejor cuando nada se ve forzado: lo sencillo, práctico y luminoso es lo tuyo.",
      care: "Pero cuidado: cómoda no significa descuidada.",
      si: ["Estampados pequeños y casuales: cuadritos, rayas, flores chicas.", "Accesorios ligeros con un toque de personalidad.", "Texturas naturales: lino, algodón, mezclilla ligera."],
      no: ["Piezas maxi que te cargan.", "Looks demasiado rígidos o de gala para el día a día.", "Telas pesadas o muy brillantes."]
    },
    original: {
      name: "La original", talla: "Mediano curvo", q: "¿Me veo divertida?", c: "#c27a2e",
      d: "Versátil, con movimiento y asimetrías. Lo inesperado te sienta: mezclas, cortes con gracia y detalles creativos.",
      care: "Original, nunca ridícula.",
      si: ["Estampados medianos con movimiento: ondas, flores, paisley.", "Aretes medianos con forma: asimétricos, orgánicos.", "Cortes con movimiento: drapeados, asimetrías, volantes medidos."],
      no: ["Looks demasiado serios o rígidos.", "Geometrías muy duras.", "Juntar demasiadas ideas en un solo look."]
    },
    elegante: {
      name: "La elegante", talla: "Mediano recto", q: "¿Reflejo esa elegancia?", c: "#6b4a8a",
      d: "Clásica y minimalista. Pocas piezas, muy bien elegidas: líneas limpias, buena tela y cero ruido.",
      care: "Elegancia no es rigidez; formal no es anticuada.",
      si: ["Estampados medianos y ordenados: rayas, cuadros, geométricos sutiles.", "Aretes medianos de líneas limpias, collares sencillos.", "Cortes estructurados: sacos, solapas, pantalón de línea recta."],
      no: ["Estampados recargados o muy románticos.", "Exceso de accesorios a la vez.", "Volantes y holanes por todos lados."]
    },
    femenina: {
      name: "La femenina", talla: "Grande curvo", q: "¿Qué tan bien la represento?", c: "#a85d84",
      d: "Extremadamente femenina e incluso sexy. Pero nunca sobrecargada.",
      care: "La única que puede con lo grande y lo extra grande, sin parecer arbolito de Navidad fuera de temporada.",
      si: ["Estampados grandes y curvos: flores grandes, ondas, animal print suave.", "Aretes y collares con presencia y formas redondeadas.", "Telas con caída: seda, crepé, punto que acompañe tus curvas."],
      no: ["Estampados diminutos que se pierden.", "Cortes muy rectos y masculinos.", "Ponerte todo lo grande al mismo tiempo."]
    },
    chic: {
      name: "La chic", talla: "Grande recto", q: "¿Me veo nice?", c: "#9a7440",
      d: "Distinguida y vanguardista. Tomas lo más chic de la moda, sin verte falsa ni disfrazada.",
      care: "Toma de la moda solo lo que habla de ti.",
      si: ["Estampados grandes y gráficos: geométricos, rayas anchas, bloques de color.", "Accesorios con presencia y líneas definidas.", "Prendas con estructura: sacos, abrigos, cortes arquitectónicos."],
      no: ["Estampados pequeños y tímidos.", "Looks demasiado románticos o aniñados.", "Seguir cada tendencia al pie de la letra."]
    },
    sofisticada: {
      name: "La sofisticada", talla: "Extra grande recto", q: "¿Estoy expresando mi glamour?", c: "#3a3a3a",
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

  // Cada pregunta: id, título, ayuda, opciones [texto, valor, detalle?]
  var STEPS = [
    { id: "edad", t: "Para empezar, ¿cuántos años tienes?", h: "Así ajustamos tu resultado a tu etapa.", o: [["25 a 34", "25"], ["35 a 44", "35"], ["45 a 54", "45"], ["55 a 64", "55"], ["65 o más", "65"]] },
    { id: "dolor", t: "¿Qué es lo que más te pasa frente al clóset?", h: "Elige la que más te suene.", o: [
      ["Tengo el clóset lleno y la sensación de «no tengo qué ponerme».", "lleno"],
      ["Me pruebo varias cosas y termino con lo de siempre.", "siempre"],
      ["Lo que se ve increíble en otras, en mí no luce igual.", "copia"],
      ["Hay colores que me apagan o me hacen ver cansada.", "color"],
      ["Mi cuerpo cambió y ya nada me queda como antes.", "cuerpo"],
      ["Compro en oferta y casi nunca lo uso.", "oferta"]] },
    { insight: 1 },
    { id: "rasgos", t: "Frente al espejo, con el cabello recogido: tus rasgos (ojos, nariz, boca) se ven…", h: "Fíjate en el tamaño, no en si te gustan.", dots: true, o: [
      ["Muy finos y delicados", "1", "Como de muñequita"],
      ["Pequeños y armoniosos", "2", "Nada llama la atención por grande"],
      ["Medianos", "3", "Ni grandes ni pequeños"],
      ["Grandes y expresivos", "4", "Ojos, boca o nariz con presencia"],
      ["Muy grandes y marcados", "5", "Se notan desde lejos"]] },
    { id: "huesos", t: "Ahora tu estructura: tu muñeca, tus hombros y tu mandíbula son…", h: "La estructura no cambia aunque cambie tu peso.", dots: true, o: [
      ["Muy finos", "1"], ["Delgados", "2"], ["Medianos", "3"], ["Anchos y firmes", "4"], ["Muy anchos y fuertes", "5"]] },
    { insight: 2 },
    { id: "lineas", t: "¿Qué predomina en tu rostro?", h: "En la naturaleza solo hay dos: rectas y curvas. Todas tenemos ambas, pero una predomina.", lines: true, o: [
      ["Rectas", "r", "Mandíbula marcada, pómulos y cejas angulares"],
      ["Curvas", "c", "Mejillas suaves, rostro redondeado, labios llenos"],
      ["Una mezcla, no estoy segura", "m", "Lo afinamos con la siguiente pregunta"]] },
    { id: "hombros", t: "Y tus hombros, vistos de frente, son…", lines: true, o: [
      ["Rectos y marcados", "r"], ["Redondeados y suaves", "c"], ["No sé", "m"]] },
    { id: "deseo", t: "Cuando entras a un lugar, ¿qué te encantaría que pensaran de ti?", h: "Tu personalidad también cuenta.", o: [
      ["«Qué linda y cercana»", "dulce"], ["«Qué natural y relajada»", "fresca"], ["«Qué creativa y divertida»", "original"],
      ["«Qué elegante y segura»", "elegante"], ["«Qué femenina y atractiva»", "femenina"], ["«Qué moderna, siempre impecable»", "chic"],
      ["«Qué imponente y sofisticada»", "sofisticada"]] },
    { id: "temp", t: "La prueba de Luzma: pon algo fucsia y algo naranja junto a tu cara, sin maquillaje. ¿Con cuál te ves con más luz?", h: "Si no tienes nada a la mano, elige el metal que mejor te queda.", swatch: true, o: [
      ["Con el fucsia", "f", "fucsia"], ["Con el naranja", "w", "naranja"],
      ["No lo tengo a la mano: me ilumina más la plata", "f", "plata"], ["No lo tengo a la mano: me ilumina más el oro", "w", "oro"]] },
    { id: "contraste", t: "Tu colorido natural (piel, ojos y cabello de nacimiento, no el del tinte) es…", o: [
      ["De alto contraste", "i", "Cabello oscuro, ojos intensos o mucha diferencia con tu piel"],
      ["Suave", "s", "Tonos claros o medios que se funden entre sí"]] },
    { insight: 3 },
    { id: "meta", t: "Última: ¿qué te gustaría lograr con tu imagen?", o: [
      ["Volver a sentirme bonita", "bonita"], ["Vestirme en 5 minutos sin dudar", "rapido"], ["Dejar de gastar en ropa que no uso", "ahorro"],
      ["Verme profesional y segura", "pro"], ["Que mi imagen diga quién soy", "yo"]] }
  ];

  var INSIGHTS = {
    1: { k: "Hermosa, el problema no eres tú", t: "Es que nadie te dio tu instructivo.", p: "En más de 30 años como asesora de imagen, Luzma descubrió lo mismo en todas: nadie tiene nada que corregir y sí mucho que expresar." },
    2: { k: "Lo que nadie te había dicho", t: "Así como tienes talla de ropa, también tienes otras tallas.", p: "En estampados, aretes, collares, solapas y hasta corte de cabello. Esa talla no la decide tu estatura, ni tu peso, ni tu edad. La decide tu rostro.", dots: true },
    3: { k: "Somos parte de la naturaleza", t: "Y tú tienes una estación.", p: "Cuando integras los colores de tu propia estación, la gente no sabrá qué te hiciste, pero la inspirarás a decir: ¡Qué bien te ves!" }
  };

  var PAINS = {
    lleno: "Tu clóset no está vacío: está lleno de prendas que no son de tu talla de rostro ni de tu estación. Cuando lo sabes, cada prenda empieza a combinar con las demás.",
    siempre: "Terminas con lo de siempre porque es lo único que sabes que te funciona. Con tu instructivo vas a saber por qué te funciona y a encontrar muchas más opciones.",
    copia: "Una copia nunca superará al original: lo que le queda a otra está pensado para su talla de rostro, no para la tuya. Por eso en ti no luce igual.",
    color: "Ese color que te apaga probablemente no es de tu estación. No tienes que renunciar a él: aprenderás a usarlo lejos de tu cara.",
    cuerpo: "Tu cuerpo cambió, pero tu construcción natural no. Tu talla de rostro y tus líneas siguen ahí, y desde ahí se vuelve a armar todo.",
    oferta: "La oferta es barata solo si la usas. Cuando conoces tu estilo, tu talla y tu estación, dejas de comprar lo que se queda colgado con etiqueta."
  };

  var METAS = {
    bonita: "volver a sentirte bonita", rapido: "vestirte en 5 minutos sin dudar", ahorro: "dejar de gastar en ropa que no usas",
    pro: "verte profesional y segura", yo: "que tu imagen diga quién eres"
  };

  var EDADES = {
    "25": "Empezar a esta edad te ahorra años de compras equivocadas.",
    "35": "Es el momento perfecto para dejar de adivinar y tener tu instructivo para siempre.",
    "45": "Tu estructura no tiene edad: lo que te favorece hoy te va a seguir favoreciendo.",
    "55": "Tu estructura no tiene edad: nunca es tarde para verte como tú.",
    "65": "Verte bien no tiene edad, y tu rostro sigue sabiendo qué ponerte."
  };

  // ---------- Estado ----------
  var ans = {}, i = 0, started = false;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var app = $("#quiz"), stage = $("#stage"), bar = $("#bar"), back = $("#back");

  function track(ev, data, custom) {
    if (typeof window.fbq !== "function") return;
    window.fbq(custom ? "trackCustom" : "track", ev, data || {});
  }

  function questions() { return STEPS.filter(function (s) { return !s.insight; }).length; }
  function qIndex() { var n = 0; for (var k = 0; k <= i && k < STEPS.length; k++) if (!STEPS[k].insight) n++; return n; }

  function dots(n, on) {
    var h = '<span class="qz-dots" aria-hidden="true">';
    for (var k = 1; k <= 5; k++) h += '<i style="--s:' + [0.16, 0.3, 0.48, 0.7, 1][k - 1] + '"' + (k === on ? ' class="on"' : "") + "></i>";
    return h + "</span>";
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

  function render() {
    var s = STEPS[i];
    back.hidden = i === 0;
    bar.style.width = Math.round((qIndex() - (s.insight ? 0 : 1)) / questions() * 100) + "%";
    var h;
    if (s.insight) {
      var I = INSIGHTS[s.insight];
      h = '<div class="qz-card qz-insight"><p class="kicker">' + I.k + '</p><h2>' + I.t + "</h2>" +
        (I.dots ? '<div class="qz-sizes" aria-hidden="true">' + SIZES.map(function (n, k) { return '<span><i style="--s:' + [0.16, 0.3, 0.48, 0.7, 1][k] + '"></i>' + n + "</span>"; }).join("") + "</div>" : "") +
        "<p>" + I.p + '</p><button class="btn qz-next" type="button">Seguir <i class="btn__arrow">→</i></button></div>';
    } else {
      var grid = s.o.length > 4 && !s.dots ? " qz-opts--grid" : "";
      h = '<div class="qz-card"><p class="qz-step">Pregunta ' + qIndex() + " de " + questions() + "</p><h2>" + s.t + "</h2>" + (s.h ? '<p class="qz-help">' + s.h + "</p>" : "") +
        '<div class="qz-opts' + grid + '" role="radiogroup">' + s.o.map(function (o, k) {
          var ico = s.dots ? dots(5, k + 1) : s.lines ? lineIcon(o[1]) : s.swatch ? swatch(o[2]) : "";
          var sub = s.swatch ? "" : o[2] ? "<small>" + o[2] + "</small>" : "";
          var sel = ans[s.id] && ans[s.id].k === k ? " is-sel" : "";
          return '<button type="button" role="radio" class="qz-opt' + sel + '" data-k="' + k + '">' + ico + "<span><b>" + o[0] + "</b>" + sub + "</span></button>";
        }).join("") + "</div></div>";
    }
    stage.innerHTML = h;
    stage.classList.remove("qz-in"); void stage.offsetWidth; stage.classList.add("qz-in");
    var first = stage.querySelector(".qz-opt, .qz-next"); if (first && started) first.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  stage.addEventListener("click", function (e) {
    var s = STEPS[i];
    if (e.target.closest(".qz-next")) return go(1);
    var b = e.target.closest(".qz-opt"); if (!b) return;
    var k = +b.getAttribute("data-k");
    ans[s.id] = { k: k, v: s.o[k][1], label: s.o[k][0] };
    b.classList.add("is-sel");
    track("QuizStep", { step: qIndex(), question: s.id, answer: s.o[k][1] }, true);
    setTimeout(function () { go(1); }, 260);
  });
  back.addEventListener("click", function () { if (i > 0) { i--; render(); } });

  function go(d) {
    i += d;
    if (i >= STEPS.length) return analyze();
    render();
  }

  // ---------- Cálculo ----------
  function result() {
    var talla = Math.round((+ans.rasgos.v * 2 + +ans.huesos.v) / 3);           // 1–5, los rasgos pesan doble
    var lv = { r: 1, c: -1, m: 0 };
    var linea = lv[ans.lineas.v] * 2 + lv[ans.hombros.v];
    var deseo = ans.deseo.v;
    if (linea === 0) linea = /femenina|original|dulce/.test(deseo) ? -1 : 1;  // empate: lo decide la personalidad
    var curva = linea < 0, id;
    if (talla <= 1) id = "dulce";
    else if (talla === 2) id = "fresca";
    else if (talla === 3) id = curva ? "original" : "elegante";
    else if (talla === 4) id = curva ? "femenina" : "chic";
    else id = curva ? "femenina" : "sofisticada";
    var fria = ans.temp.v === "f", intensa = ans.contraste.v === "i";
    var est = fria ? (intensa ? "invierno" : "verano") : (intensa ? "otono" : "primavera");
    return { id: id, talla: SIZES[talla - 1], tallaN: talla, linea: curva ? "curvas" : "rectas", est: est, segundo: deseo !== id ? deseo : null };
  }

  function analyze() {
    bar.style.width = "100%";
    back.hidden = true;
    var steps = ["Midiendo tu talla de rostro", "Leyendo tus líneas", "Cruzando con los 7 estilos", "Buscando tu estación de color"];
    stage.innerHTML = '<div class="qz-card qz-load"><p class="kicker">Un momento</p><h2>Preparando tu resultado…</h2><ol>' + steps.map(function (t) { return "<li>" + t + "</li>"; }).join("") + "</ol></div>";
    var li = stage.querySelectorAll("li"), n = 0;
    var t = setInterval(function () {
      if (n < li.length) li[n++].classList.add("ok");
      else { clearInterval(t); show(result()); }
    }, 650);
  }

  function show(r) {
    var S = STYLES[r.id], E = SEASONS[r.est], meta = METAS[ans.meta.v], pain = PAINS[ans.dolor.v];
    try { localStorage.setItem("ybl_quiz", JSON.stringify({ estilo: r.id, estacion: r.est, t: Date.now() })); } catch (e) {}
    track("Lead", { content_name: "Quiz YBL · " + S.name, content_category: "quiz", value: 0, currency: "USD" });
    track("QuizResult", { estilo: r.id, estacion: r.est, talla: r.talla, edad: ans.edad.v, dolor: ans.dolor.v, meta: ans.meta.v }, true);

    $("#r-style").textContent = S.name;
    $("#r-q").textContent = S.q;
    $("#r-tag").innerHTML = "Talla de rostro: <b>" + r.talla + "</b> · Líneas: <b>" + r.linea + "</b> · Estación: <b>" + E.name + "</b>";
    $("#r-desc").textContent = S.d + " " + S.care;
    $("#r-card").style.setProperty("--c", S.c);
    $("#r-size").innerHTML = SIZES.map(function (n, k) { return '<span class="' + (k === r.tallaN - 1 ? "on" : "") + '"><i style="--s:' + [0.16, 0.3, 0.48, 0.7, 1][k] + '"></i>' + n + "</span>"; }).join("");
    $("#r-si").innerHTML = S.si.map(function (x) { return "<li>" + x + "</li>"; }).join("");
    $("#r-no").innerHTML = S.no.map(function (x) { return "<li>" + x + "</li>"; }).join("");
    $("#r-est").textContent = E.name;
    $("#r-estk").textContent = E.k;
    $("#r-estd").textContent = E.d + " Tu metal: " + E.metal + ".";
    $("#r-sw").innerHTML = E.sw.map(function (c) { return '<i style="background:' + c + '"></i>'; }).join("");
    $("#r-pain").textContent = pain;
    $("#r-age").textContent = EDADES[ans.edad.v];
    $("#r-meta").textContent = meta;
    var sg = $("#r-second");
    if (r.segundo) { sg.hidden = false; sg.querySelector("b").textContent = STYLES[r.segundo].name.replace("La ", "la "); }

    // Botones a Hotmart: se conservan los UTM de la visita y se marca el estilo como origen (sck)
    var qs = window.location.search.replace(/^\?/, "");
    var url = (C.HOTMART_URL || "#") + "?" + (qs ? qs + "&" : "") + "sck=quiz_" + r.id;
    document.querySelectorAll("[data-checkout]").forEach(function (a) { a.setAttribute("href", url); });

    // Compartir con una amiga por WhatsApp
    var share = "Hice el quiz de Luzma y salí " + S.name + " de " + E.name + ". ¿Tú cuál eres? " + location.origin + location.pathname;
    $("#r-share").setAttribute("href", "https://wa.me/?text=" + encodeURIComponent(share));

    app.hidden = true;
    var res = $("#resultado");
    res.hidden = false;
    document.body.classList.add("qz-done");
    res.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // ---------- Inicio ----------
  document.querySelectorAll("[data-start]").forEach(function (b) {
    b.addEventListener("click", function () {
      if (!started) { started = true; track("QuizStart", { page: "quiz" }, true); }
      $("#intro").hidden = true;
      app.hidden = false;
      render();
    });
  });
  $("#r-again") && $("#r-again").addEventListener("click", function () {
    ans = {}; i = 0;
    $("#resultado").hidden = true; document.body.classList.remove("qz-done");
    app.hidden = false; render();
  });
})();

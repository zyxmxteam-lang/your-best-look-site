/* Your Best Look · Edición Nº 01: interacción y movimiento de la revista */
(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var desk = window.matchMedia("(min-width: 1000px)");
  function track(ev, data) { if (typeof window.fbq === "function") window.fbq("trackCustom", ev, data || {}); }

  // ---------- La cabecera ocupa el ancho exacto (como una revista) ----------
  var mh = document.querySelector(".cover .masthead");
  function fitMasthead() {
    if (!mh) return;
    mh.style.fontSize = "";
    if (!desk.matches) return;
    var avail = mh.clientWidth - parseFloat(getComputedStyle(mh).paddingLeft) * 2;
    var inner = document.createElement("span");
    inner.style.cssText = "display:inline-block;white-space:nowrap";
    inner.innerHTML = mh.innerHTML;
    mh.innerHTML = "";
    mh.appendChild(inner);
    var fs = parseFloat(getComputedStyle(mh).fontSize);
    mh.style.fontSize = (fs * avail / inner.scrollWidth) + "px";
    mh.innerHTML = inner.innerHTML;
  }

  // ---------- Folio: número de página y tono ----------
  var folio = document.querySelector("[data-folio-bar]"), folioN = document.querySelector("[data-folio]");
  if ("IntersectionObserver" in window && folio) {
    var pio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        if (folioN) folioN.textContent = e.target.getAttribute("data-page");
        folio.classList.toggle("is-dark", e.target.getAttribute("data-tone") === "dark");
      });
    }, { rootMargin: "-46px 0px -92% 0px" });
    document.querySelectorAll("[data-page]").forEach(function (s) { pio.observe(s); });
  }

  // ---------- El test ----------
  var boxes = document.querySelectorAll(".quiz__list input"), qn = document.querySelector("[data-quiz-n]"), qm = document.querySelector("[data-quiz-msg]");
  var msgs = ["Marca las que te suenen.", "Ya te pasó. Y no eres la única.", "Ya te pasó. Y no eres la única.", "Hay un patrón: no es la ropa, es que te falta tu instructivo.", "Hay un patrón: no es la ropa, es que te falta tu instructivo.", "Hermosa, esta masterclass está hecha para ti.", "Hermosa, esta masterclass está hecha para ti.", "Hermosa, esta masterclass está hecha para ti."];
  var quizSent = false;
  boxes.forEach(function (b) {
    b.addEventListener("change", function () {
      var n = document.querySelectorAll(".quiz__list input:checked").length;
      if (qn) qn.textContent = n;
      if (qm) qm.textContent = msgs[n];
      if (window.gsap && qn) gsap.fromTo(qn, { scale: 1.25 }, { scale: 1, duration: .5, ease: "back.out(3)" });
      if (n >= 3 && !quizSent) { quizSent = true; track("QuizEngaged", { checked: n }); }
    });
  });

  // ---------- La prueba del color ----------
  var stage = document.querySelector(".drape__stage"), dmsg = document.querySelector(".drape__msg");
  document.querySelectorAll("[data-drape]").forEach(function (b) {
    b.style.setProperty("--sw", b.getAttribute("data-drape"));
    b.addEventListener("click", function () {
      document.querySelectorAll("[data-drape]").forEach(function (x) { x.classList.remove("is-on"); x.setAttribute("aria-pressed", "false"); });
      b.classList.add("is-on");
      b.setAttribute("aria-pressed", "true");
      if (stage) stage.style.setProperty("--drape", b.getAttribute("data-drape"));
      if (dmsg) dmsg.textContent = b.getAttribute("data-msg");
      track("ColorTest", { color: b.textContent });
    });
  });

  // ---------- Contadores ----------
  function count(el) {
    var end = Number(el.getAttribute("data-count"));
    if (reduce || !window.gsap) { el.textContent = end; return; }
    var o = { v: 0 };
    gsap.to(o, { v: end, duration: 1.6, ease: "power2.out", onUpdate: function () { el.textContent = Math.round(o.v); } });
  }

  // ---------- Sin GSAP o con movimiento reducido: todo visible ----------
  function noMotion() {
    root.classList.add("no-gsap");
    document.querySelectorAll("[data-count]").forEach(function (el) { el.textContent = el.getAttribute("data-count"); });
  }

  function motion() {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    root.classList.add("gsap-ready");
    var E = "expo.out";

    // Portada: la cabecera sube letra por letra, Luzma entra, la hoja cae
    var chars = new SplitText(".cover .mh", { type: "chars", mask: "chars" }).chars;
    var tl = gsap.timeline({ defaults: { ease: E } });
    tl.from(chars, { yPercent: 105, duration: 1.1, stagger: .03 })
      .from(".cover__star", { y: 80, opacity: 0, duration: 1.5 }, .25)
      .from(".cover__top > *", { opacity: 0, y: -10, duration: .8, stagger: .08 }, .2)
      .from(".cover__copy > *", { opacity: 0, y: 26, duration: 1, stagger: .09 }, .55)
      .from(".cover__buy", { opacity: 0, y: 20, duration: .9 }, .85)
      .from(".tear", { opacity: 0, y: 90, duration: 1.1 }, .35)
      .from(".cover__line", { opacity: 0, x: function (i) { return i ? -30 : 30; }, duration: 1, stagger: .15 }, 1);

    // Al bajar: Luzma sube un poco más lento que la cabecera
    gsap.to(".cover__star", { yPercent: -7, ease: "none", scrollTrigger: { trigger: ".cover", start: "top top", end: "bottom top", scrub: true } });
    gsap.to(".cover .masthead", { yPercent: 30, opacity: .35, ease: "none", scrollTrigger: { trigger: ".cover", start: "top top", end: "bottom top", scrub: true } });

    // Entradas escalonadas
    ScrollTrigger.batch("[data-r]", {
      start: "top 88%", once: true,
      onEnter: function (b) { gsap.to(b, { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: .08, overwrite: true }); }
    });

    // Titulares por líneas, como si se imprimieran
    document.querySelectorAll("[data-split]").forEach(function (h) {
      var s = new SplitText(h, { type: "lines", mask: "lines", linesClass: "split-line-inner" });
      gsap.from(s.lines, { yPercent: 110, duration: 1.2, ease: E, stagger: .1, scrollTrigger: { trigger: h, start: "top 86%", once: true } });
    });

    // Los tachones de "al revés" se dibujan con el scroll
    document.querySelectorAll(".rules p span").forEach(function (s) {
      gsap.fromTo(s, { "--strike": 0 }, { "--strike": 1, ease: "none", scrollTrigger: { trigger: s, start: "top 78%", end: "top 48%", scrub: .6 } });
    });
    gsap.from(".rules p", { opacity: 0, x: -40, duration: 1, ease: "power3.out", stagger: .12, scrollTrigger: { trigger: ".rules", start: "top 80%", once: true } });

    // Mitos tachados
    document.querySelectorAll(".myth h3 span").forEach(function (s) {
      gsap.fromTo(s, { "--strike-w": "0%" }, { "--strike-w": "100%", duration: 1, ease: "power2.inOut", scrollTrigger: { trigger: s, start: "top 80%", once: true } });
    });

    // 80%: contador y deriva
    var n80 = document.querySelector(".eighty__n");
    if (n80) {
      ScrollTrigger.create({ trigger: n80, start: "top 80%", once: true, onEnter: function () { n80.querySelectorAll("[data-count]").forEach(count); } });
      gsap.fromTo(n80, { xPercent: -6 }, { xPercent: 4, ease: "none", scrollTrigger: { trigger: ".eighty", start: "top bottom", end: "bottom top", scrub: true } });
    }
    document.querySelectorAll(".creds [data-count]").forEach(function (el) {
      ScrollTrigger.create({ trigger: el, start: "top 85%", once: true, onEnter: function () { count(el); } });
    });

    // Talla de estampado: los lunares crecen de petit a extra grande
    gsap.fromTo(".dots__row i", { "--grow": 0 }, { "--grow": 1, ease: "back.out(1.6)", duration: 1.1, stagger: .12, scrollTrigger: { trigger: ".dots", start: "top 80%", once: true } });

    // Muestras de color que se llenan
    gsap.fromTo(".season__chip i", { "--fill": 0 }, { "--fill": 1, duration: .9, ease: "power3.out", stagger: { each: .05 }, scrollTrigger: { trigger: ".seasons", start: "top 82%", once: true } });

    // Vitruvio se dibuja
    document.querySelectorAll("[data-draw] > *").forEach(function (p) {
      var len = p.getTotalLength ? p.getTotalLength() : 1000;
      gsap.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: ".vitruvio", start: "top 85%", end: "center 45%", scrub: .8 } });
    });

    // Entrevista: el disco crece detrás de Luzma
    gsap.from(".interview__disc", { scale: .4, opacity: 0, duration: 1.4, ease: E, scrollTrigger: { trigger: ".interview", start: "top 70%", once: true } });
    gsap.from(".interview__star img", { y: 80, opacity: 0, duration: 1.4, ease: E, scrollTrigger: { trigger: ".interview", start: "top 65%", once: true } });

    // Contraportada: la palabra "Original" se desliza
    gsap.fromTo(".masthead--back", { xPercent: 12 }, { xPercent: -12, ease: "none", scrollTrigger: { trigger: ".back", start: "top bottom", end: "bottom top", scrub: true } });

    // Red de seguridad: si algo quedó oculto en pantalla, se muestra
    setTimeout(function () {
      document.querySelectorAll("[data-r]").forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && getComputedStyle(el).opacity === "0") gsap.to(el, { opacity: 1, y: 0, duration: .6 });
      });
    }, 3000);
  }

  function start() {
    fitMasthead();
    if (reduce || !window.gsap || !window.ScrollTrigger || !window.SplitText) { noMotion(); return; }
    try { motion(); } catch (e) { root.classList.remove("gsap-ready"); noMotion(); }
  }
  // Las fuentes cambian el ancho de la cabecera: esperamos a que carguen.
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(start); else window.addEventListener("load", start);
  var rt;
  window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(function () { if (!document.querySelector(".cover .masthead .mh div")) fitMasthead(); if (window.ScrollTrigger) ScrollTrigger.refresh(); }, 200); });
})();

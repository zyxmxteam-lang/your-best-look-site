/* Your Best Look: movimiento de la página (solo transform/opacity/clip-path) */
(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.classList.add("js");

  // ---------- Entradas escalonadas ----------
  var items = document.querySelectorAll("[data-r], .look");
  function countUp(el) {
    var end = Number(el.getAttribute("data-count")), t0 = null;
    if (reduce) return;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / 1400, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    el.textContent = "0";
    requestAnimationFrame(step);
  }
  var painCount = document.querySelector("[data-pain-count]");
  function show(el) {
    el.classList.add("in");
    el.querySelectorAll("[data-count]").forEach(countUp);
    if (el.hasAttribute("data-count")) countUp(el);
    if (painCount && el.parentNode.classList.contains("pain__list")) {
      painCount.textContent = document.querySelectorAll(".pain__list li.in").length;
    }
  }
  if (!("IntersectionObserver" in window) || reduce) {
    items.forEach(show);
  } else {
    var io = new IntersectionObserver(function (entries) {
      var batch = entries.filter(function (e) { return e.isIntersecting; });
      batch.forEach(function (e, i) {
        e.target.style.setProperty("--rd", Math.min(i * 0.08, 0.48) + "s");
        show(e.target);
        io.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
    // Red de seguridad: nada se queda invisible.
    setTimeout(function () {
      document.querySelectorAll("[data-r]:not(.in)").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) show(el);
      });
    }, 2500);
  }

  // ---------- Espejo del hero: los looks de Luzma ----------
  var glass = document.querySelector(".mirror__glass");
  if (glass) {
    var imgs = glass.querySelectorAll("img");
    var labels = ["Rosa y floral", "Turquesa", "Lunares", "Rojo total", "Morado obispo", "Estampado"];
    var n = document.querySelector(".mirror__n"), label = document.querySelector(".mirror__label");
    var i = 0, visible = true;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }).observe(glass);
    }
    if (!reduce) setInterval(function () {
      if (!visible || document.hidden) return;
      var prev = imgs[i];
      i = (i + 1) % imgs.length;
      imgs.forEach(function (im) { im.classList.remove("was-on"); });
      prev.classList.remove("is-on");
      prev.classList.add("was-on");
      imgs[i].classList.add("is-on");
      if (n) n.textContent = ("0" + (i + 1)).slice(-2);
      if (label) label.textContent = labels[i] || "";
    }, 2800);
  }

  // ---------- Prueba del color ----------
  var stage = document.querySelector(".drape__stage"), msg = document.querySelector(".drape__msg");
  document.querySelectorAll("[data-drape]").forEach(function (b) {
    b.style.setProperty("--sw", b.getAttribute("data-drape"));
    b.addEventListener("click", function () {
      document.querySelectorAll("[data-drape]").forEach(function (x) { x.classList.remove("is-on"); x.setAttribute("aria-pressed", "false"); });
      b.classList.add("is-on");
      b.setAttribute("aria-pressed", "true");
      if (stage) stage.style.setProperty("--drape", b.getAttribute("data-drape"));
      if (msg) msg.textContent = b.getAttribute("data-msg");
      if (typeof window.fbq === "function") window.fbq("trackCustom", "ColorTest", { color: b.textContent });
    });
  });

  // ---------- Galería: arrastrar con el mouse ----------
  var rail = document.querySelector(".lookbook__rail");
  if (rail) {
    var down = false, x0 = 0, s0 = 0;
    rail.addEventListener("pointerdown", function (e) { if (e.pointerType !== "mouse") return; down = true; x0 = e.clientX; s0 = rail.scrollLeft; rail.style.scrollSnapType = "none"; });
    window.addEventListener("pointerup", function () { if (!down) return; down = false; rail.style.scrollSnapType = ""; });
    rail.addEventListener("pointermove", function (e) { if (down) { e.preventDefault(); rail.scrollLeft = s0 - (e.clientX - x0); } });
    rail.addEventListener("dragstart", function (e) { e.preventDefault(); });
  }

  // ---------- Progreso + parallax ----------
  var bar = document.querySelector(".progress i");
  var par = reduce ? [] : Array.prototype.slice.call(document.querySelectorAll("[data-par]"));
  var ticking = false;
  function frame() {
    ticking = false;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.transform = "scaleX(" + (max > 0 ? window.scrollY / max : 0) + ")";
    par.forEach(function (el) {
      var r = el.parentNode.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      var mid = r.top + r.height / 2 - window.innerHeight / 2;
      el.style.transform = "translate3d(0," + (mid * Number(el.getAttribute("data-par"))).toFixed(1) + "px,0)";
    });
  }
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
  frame();
})();

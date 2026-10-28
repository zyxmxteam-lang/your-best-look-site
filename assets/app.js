(function () {
  var C = window.YBL || {};

  // ---------- Meta Pixel (el código base está en el <head>) ----------
  var page = document.body.hasAttribute("data-gated") ? "clase" : "ventas";
  var value = parseFloat(String(C.PRICE || "").replace(/[^\d.]/g, "")) || 0;
  var product = { content_name: "Your Best Look", content_category: page, value: value, currency: "USD" };
  function track(ev, data, custom) {
    if (typeof window.fbq !== "function") return;
    window.fbq(custom ? "trackCustom" : "track", ev, data || {});
  }
  track("ViewContent", product);
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("[data-checkout]");
    if (a) track("InitiateCheckout", product);
  });

  // Hasta dónde bajan en la página (50 % y 90 %), una vez por visita.
  var depths = [50, 90];
  window.addEventListener("scroll", function () {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var pct = max > 0 ? (window.scrollY / max) * 100 : 100;
    while (depths.length && pct >= depths[0]) track("ScrollDepth", { percent: depths.shift(), page: page }, true);
  }, { passive: true });

  // Todos los botones de compra apuntan a Hotmart; se conservan los UTM de la visita.
  var qs = window.location.search.replace(/^\?/, "");
  document.querySelectorAll("[data-checkout]").forEach(function (a) {
    var url = C.HOTMART_URL || "#";
    if (qs && url.indexOf("http") === 0) url += (url.indexOf("?") > -1 ? "&" : "?") + qs;
    a.setAttribute("href", url);
  });
  document.querySelectorAll("[data-price]").forEach(function (el) { el.textContent = C.PRICE; });
  document.querySelectorAll("[data-price-before]").forEach(function (el) {
    if (!C.PRICE_BEFORE) { (el.closest(".was") || el).style.display = "none"; return; }
    // En los espacios cortos (botón y barra) solo va el número, sin "USD".
    el.textContent = el.textContent.indexOf("USD") > -1 ? C.PRICE_BEFORE : C.PRICE_BEFORE.replace(/\s*USD$/, "");
  });
  document.querySelectorAll("[data-guarantee]").forEach(function (el) { el.textContent = C.GUARANTEE_DAYS; });

  // ---------- Video ----------
  var box = document.querySelector("[data-video]");
  var gated = document.body.hasAttribute("data-gated");
  var revealAt = Number(C.REVEAL_AT) || 0;
  var KEY = "ybl_revealed";

  function reveal() {
    if (!document.body.classList.contains("is-revealed")) track("OfferShown", product, true);
    document.body.classList.add("is-revealed");
    try { localStorage.setItem(KEY, "1"); } catch (e) {}
  }
  if (gated) {
    try { if (localStorage.getItem(KEY) === "1") reveal(); } catch (e) {}
  }

  if (box) {
    var src = (C.VIDEO_URL || "").trim();
    if (!src) {
      box.innerHTML =
        '<div class="video-ph"><span class="video-ph__play" aria-hidden="true"></span>' +
        "<p>La clase de Luzma está por estrenarse</p><small>Vuelve muy pronto</small></div>";
      // Solo en modo prueba (?preview=1) se muestra el botón para revelar la oferta.
      if (gated && /[?&]preview=1/.test(window.location.search)) {
        var b = document.createElement("button");
        b.className = "link-btn";
        b.type = "button";
        b.textContent = "Vista previa: mostrar botón";
        b.onclick = reveal;
        box.appendChild(b);
      }
    } else if (/\.(mp4|m3u8|webm)(\?|$)/i.test(src)) {
      var v = document.createElement("video");
      v.src = src;
      v.controls = true;
      v.playsInline = true;
      v.preload = "metadata";
      box.appendChild(v);
      var played = false, marks = [25, 50, 75, 95];
      v.addEventListener("play", function () {
        if (!played) { played = true; track("VideoPlay", { page: page }, true); }
      });
      v.addEventListener("timeupdate", function () {
        if (!v.duration) return;
        var pct = (v.currentTime / v.duration) * 100;
        while (marks.length && pct >= marks[0]) track("VideoProgress", { percent: marks.shift(), page: page }, true);
      });
      if (gated) {
        v.addEventListener("timeupdate", function () { if (v.currentTime >= revealAt) reveal(); });
        v.addEventListener("ended", reveal);
      }
    } else {
      // YouTube / Vimeo: portada con play; al tocarla carga el reproductor con sonido.
      var vimeo = /vimeo\.com/.test(src);
      var cover = document.createElement("button");
      cover.type = "button";
      cover.className = "video-ph video-ph--cover";
      cover.innerHTML = '<span class="video-ph__play" aria-hidden="true"></span><p>Ver la clase</p>';
      if (C.VIDEO_POSTER) {
        cover.style.background = "linear-gradient(180deg,rgba(20,10,18,0) 45%,rgba(20,10,18,.8)),url('" + C.VIDEO_POSTER + "') center 30%/cover";
      }
      cover.onclick = function () {
        track("VideoPlay", { page: page }, true);
        var f = document.createElement("iframe");
        f.src = src + (src.indexOf("?") > -1 ? "&" : "?") + "autoplay=1&playsinline=1&rel=0";
        f.allow = "autoplay; fullscreen; picture-in-picture; encrypted-media";
        f.allowFullscreen = true;
        f.title = "La clase de Luzma";
        box.innerHTML = "";
        box.appendChild(f);
        if (vimeo) watchVimeo(f);
        else if (gated) setTimeout(reveal, revealAt * 1000);
      };
      box.appendChild(cover);
    }
    // Modo prueba (?preview=1): botón para ver la oferta sin esperar al minuto del video.
    if (src && gated && /[?&]preview=1/.test(window.location.search)) {
      var pb = document.createElement("button");
      pb.className = "link-btn";
      pb.type = "button";
      pb.textContent = "Vista previa: mostrar botón";
      pb.onclick = reveal;
      box.parentNode.insertBefore(pb, box.nextSibling);
    }
  }

  // Con la API de Vimeo sabemos el segundo exacto: el botón aparece en REVEAL_AT o al terminar.
  function watchVimeo(f) {
    function hook() {
      var p = new window.Vimeo.Player(f), marks = [25, 50, 75, 95];
      p.on("timeupdate", function (d) {
        while (marks.length && d.percent * 100 >= marks[0]) track("VideoProgress", { percent: marks.shift(), page: page }, true);
        if (gated && d.seconds >= revealAt) reveal();
      });
      p.on("ended", function () { if (gated) reveal(); });
    }
    if (window.Vimeo && window.Vimeo.Player) return hook();
    var sc = document.createElement("script");
    sc.src = "https://player.vimeo.com/api/player.js";
    sc.onload = hook;
    sc.onerror = function () { if (gated) setTimeout(reveal, revealAt * 1000); };
    document.head.appendChild(sc);
  }

  // ---------- Barra fija en móvil (página de ventas) ----------
  var sticky = document.querySelector(".sticky-cta");
  var hero = document.querySelector("[data-hero-cta]");
  if (sticky && hero && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      sticky.classList.toggle("is-on", !entries[0].isIntersecting && entries[0].boundingClientRect.top < 0);
    }).observe(hero);
  }
})();

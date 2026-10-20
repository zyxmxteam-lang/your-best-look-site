(function () {
  var C = window.YBL || {};

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
      if (gated) {
        v.addEventListener("timeupdate", function () { if (v.currentTime >= revealAt) reveal(); });
        v.addEventListener("ended", reveal);
      }
    } else {
      // YouTube / Vimeo: mostramos una portada y el botón aparece por tiempo desde el play.
      var cover = document.createElement("button");
      cover.type = "button";
      cover.className = "video-ph video-ph--cover";
      cover.innerHTML = '<span class="video-ph__play" aria-hidden="true"></span><p>Ver el video</p>';
      cover.onclick = function () {
        var f = document.createElement("iframe");
        f.src = src + (src.indexOf("?") > -1 ? "&" : "?") + "autoplay=1&playsinline=1&rel=0";
        f.allow = "autoplay; fullscreen; picture-in-picture";
        f.allowFullscreen = true;
        box.innerHTML = "";
        box.appendChild(f);
        if (gated) setTimeout(reveal, revealAt * 1000);
      };
      box.appendChild(cover);
    }
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

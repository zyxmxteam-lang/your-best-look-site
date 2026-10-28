/* Your Best Look: el clóset ilustrado que va pasando la ropa (fondo decorativo) */
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var NS = "http://www.w3.org/2000/svg";

  // Telas: patrones y colores de la marca (lunares, rayas, cuadros, flores)
  var DEFS =
    '<pattern id="p-dots" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="#3a1e38"/><circle cx="8" cy="8" r="3" fill="#f3dfe8"/></pattern>' +
    '<pattern id="p-dots2" width="22" height="22" patternUnits="userSpaceOnUse"><rect width="22" height="22" fill="#f6ece4"/><circle cx="5" cy="5" r="4.5" fill="#2a1628"/><circle cx="16" cy="16" r="4.5" fill="#2a1628"/></pattern>' +
    '<pattern id="p-stripe" width="12" height="12" patternUnits="userSpaceOnUse"><rect width="12" height="12" fill="#c27bb2"/><rect width="4" height="12" fill="#efc2df"/></pattern>' +
    '<pattern id="p-stripe2" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><rect width="14" height="14" fill="#f4e9e1"/><rect width="5" height="14" fill="#109ca3"/></pattern>' +
    '<pattern id="p-check" width="20" height="20" patternUnits="userSpaceOnUse"><rect width="20" height="20" fill="#5c6a3a"/><rect width="20" height="6" fill="#7f8e52" opacity=".8"/><rect width="6" height="20" fill="#7f8e52" opacity=".8"/><rect x="9" width="1.5" height="20" fill="#e9c46a" opacity=".7"/></pattern>' +
    '<pattern id="p-flor" width="34" height="34" patternUnits="userSpaceOnUse"><rect width="34" height="34" fill="#e7a1c4"/><g fill="#fbe3ef"><circle cx="9" cy="6" r="3.5"/><circle cx="13" cy="10" r="3.5"/><circle cx="9" cy="14" r="3.5"/><circle cx="5" cy="10" r="3.5"/></g><circle cx="9" cy="10" r="2.4" fill="#c4004f"/><g fill="#f07a2a"><circle cx="25" cy="22" r="3"/><circle cx="29" cy="26" r="3"/><circle cx="25" cy="30" r="3"/><circle cx="21" cy="26" r="3"/></g><circle cx="25" cy="26" r="2" fill="#fff4d6"/><path d="M14 26 q4 -5 8 -1" stroke="#6b7a2a" stroke-width="1.6" fill="none"/></pattern>' +
    '<pattern id="p-leaf" width="30" height="30" patternUnits="userSpaceOnUse"><rect width="30" height="30" fill="#109ca3"/><path d="M4 22 Q10 6 24 4 Q20 18 4 22Z" fill="#7fd1c9" opacity=".8"/><path d="M4 22 L24 4" stroke="#0b6f73" stroke-width="1"/></pattern>' +
    '<linearGradient id="g-shade" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".34"/><stop offset=".22" stop-color="#000" stop-opacity="0"/><stop offset=".78" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".34"/></linearGradient>' +
    '<linearGradient id="g-top" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".25"/><stop offset=".25" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".12"/></linearGradient>';

  // Prendas (viewBox 200 de ancho; el gancho cuelga del punto 100,0)
  var G = {
    vestido: { h: 330, d: "M74 48 C86 60 114 60 126 48 L146 58 L140 112 C150 170 172 250 182 322 L18 322 C28 250 50 170 60 112 L54 58 Z", x: '<path d="M60 112 C86 121 114 121 140 112"/>' },
    blazer: { h: 250, d: "M70 48 L100 132 L130 48 L168 62 L178 236 L150 238 L148 140 L146 244 L54 244 L52 140 L50 238 L22 236 L32 62 Z", x: '<path d="M100 132 V244"/><path d="M70 48 L84 108 L100 132 L116 108 L130 48"/><circle cx="108" cy="168" r="3.4"/><circle cx="108" cy="198" r="3.4"/>' },
    blusa: { h: 220, d: "M72 48 C84 62 116 62 128 48 L170 72 L162 156 L144 150 L144 214 L56 214 L56 150 L38 156 L30 72 Z", x: '<path d="M100 60 V214" stroke-dasharray="2 12"/>' },
    abrigo: { h: 340, d: "M72 48 L100 120 L128 48 L170 64 L180 252 L156 254 L152 150 L162 334 L38 334 L48 150 L44 254 L20 252 L30 64 Z", x: '<path d="M100 120 V334"/><path d="M47 196 H153" stroke-width="7" opacity=".55"/>' },
    kimono: { h: 300, d: "M74 48 L100 140 L126 48 L196 74 L196 162 L150 162 L150 292 L50 292 L50 162 L4 162 L4 74 Z", x: '<path d="M74 48 L100 140 L126 48"/><path d="M100 140 V292"/>' },
    sueter: { h: 220, d: "M82 40 H118 V54 L166 70 L184 196 L160 200 L150 112 L150 212 L50 212 L50 112 L40 200 L16 196 L34 70 L82 54 Z", x: '<path d="M50 200 H150" stroke-dasharray="3 4"/><path d="M82 54 H118"/>' },
    falda: { h: 240, clip: true, d: "M62 58 H138 L176 232 C130 241 70 241 24 232 Z", x: '<path d="M62 70 H138"/><path d="M84 70 L72 232 M116 70 L128 232" opacity=".5"/>' },
    slip: { h: 300, d: "M76 54 L84 46 L92 70 C98 75 102 75 108 70 L116 46 L124 54 L128 110 C142 180 160 250 168 292 L32 292 C40 250 58 180 72 110 Z", x: "" }
  };
  var FILL = ["url(#p-dots)", "#d6247c", "url(#p-check)", "#e9c46a", "url(#p-flor)", "#f4e9e1", "url(#p-stripe)", "#109ca3", "#3a1e38", "url(#p-dots2)", "#f07a2a", "url(#p-leaf)", "#9fb6d1", "#c0392b", "url(#p-stripe2)", "#c27bb2"];
  var ORDER = ["vestido", "blazer", "kimono", "blusa", "abrigo", "falda", "sueter", "slip", "blazer", "vestido", "blusa", "kimono", "abrigo", "falda", "slip", "sueter"];

  function defs() {
    if (document.getElementById("ybl-closet-defs")) return;
    var s = document.createElementNS(NS, "svg");
    s.setAttribute("id", "ybl-closet-defs");
    s.setAttribute("width", "0");
    s.setAttribute("height", "0");
    s.setAttribute("aria-hidden", "true");
    s.style.position = "absolute";
    s.innerHTML = "<defs>" + DEFS + "</defs>";
    document.body.insertBefore(s, document.body.firstChild);
  }

  function garment(kind, fill, i) {
    var g = G[kind], h = g.h + 6;
    var hanger = g.clip
      ? '<path class="hk" d="M100 4 C100 -4 112 -4 112 5 C112 13 100 13 100 22 V36"/><path class="hb" d="M40 40 H160"/><rect class="hc" x="56" y="38" width="12" height="24" rx="2"/><rect class="hc" x="132" y="38" width="12" height="24" rx="2"/>'
      : '<path class="hk" d="M100 4 C100 -4 112 -4 112 5 C112 13 100 13 100 22 V30"/><path class="hb" d="M100 30 L40 54 H160 Z"/>';
    var el = document.createElement("div");
    el.className = "g";
    el.style.setProperty("--gh", h);
    el.style.setProperty("--dl", (-(i * 0.73) % 5).toFixed(2) + "s");
    el.innerHTML =
      '<svg viewBox="0 -6 200 ' + h + '" aria-hidden="true">' + hanger +
      '<path d="' + g.d + '" fill="' + fill + '"/>' +
      '<path d="' + g.d + '" fill="url(#g-shade)"/>' +
      '<path d="' + g.d + '" fill="url(#g-top)"/>' +
      '<g class="gx">' + g.x + "</g></svg>";
    return el;
  }

  function build(box) {
    var n = Number(box.getAttribute("data-count")) || 12;
    var offset = Number(box.getAttribute("data-offset")) || 0;
    var track = document.createElement("div");
    track.className = "rail__track";
    var items = [];
    for (var i = 0; i < n; i++) {
      var k = (i + offset) % ORDER.length;
      items.push(garment(ORDER[k], FILL[(k * 5 + offset) % FILL.length], i));
    }
    // Se duplica la fila para que el loop no tenga costura.
    items.forEach(function (el) { track.appendChild(el); });
    items.forEach(function (el, i) { var c = el.cloneNode(true); c.setAttribute("aria-hidden", "true"); track.appendChild(c); });
    box.appendChild(track);
    if (reduce) track.style.animation = "none";
  }

  defs();
  document.querySelectorAll("[data-closet]").forEach(build);

  // Si la pestaña no está visible o el clóset salió de pantalla, se pausa.
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { e.target.classList.toggle("is-paused", !e.isIntersecting); });
    });
    document.querySelectorAll("[data-closet]").forEach(function (b) { io.observe(b); });
  }
})();

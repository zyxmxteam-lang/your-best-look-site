/* Serie 2: variables de scroll y mouse para las capas de arte.
   --sy = scroll en px; [data-par="k"] se desplaza según su posición en pantalla; --mx/--my = mouse (-.5 a .5). */
(function () {
  var r = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var els = [].slice.call(document.querySelectorAll("[data-par]"));
  var busy = false;
  function frame() {
    busy = false;
    r.style.setProperty("--sy", Math.round(window.scrollY));
    if (reduce) return;
    var h = window.innerHeight;
    els.forEach(function (e) {
      var b = e.getBoundingClientRect();
      if (b.bottom < -200 || b.top > h + 200) return;
      var k = parseFloat(e.getAttribute("data-par")) || 0.1;
      e.style.translate = "0 " + ((b.top + b.height / 2 - h / 2) * -k).toFixed(1) + "px";
    });
  }
  window.addEventListener("scroll", function () { if (!busy) { busy = true; requestAnimationFrame(frame); } }, { passive: true });
  window.addEventListener("resize", frame);
  frame();
  if (reduce || !window.matchMedia("(pointer:fine)").matches) return;
  window.addEventListener("pointermove", function (e) {
    r.style.setProperty("--mx", (e.clientX / window.innerWidth - 0.5).toFixed(3));
    r.style.setProperty("--my", (e.clientY / window.innerHeight - 0.5).toFixed(3));
  }, { passive: true });
})();

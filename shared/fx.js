/* Entradas al hacer scroll (todas las propuestas). Sin JS todo se ve. */
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
  document.documentElement.classList.add("js");
  var io = new IntersectionObserver(function (es) {
    var n = 0;
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.style.setProperty("--rd", Math.min(n++ * 0.07, 0.42) + "s");
      e.target.classList.add("in");
      io.unobserve(e.target);
    });
  }, { rootMargin: "0px 0px -6% 0px", threshold: 0.08 });
  document.querySelectorAll("[data-r]").forEach(function (el) { io.observe(el); });
  setTimeout(function () { document.querySelectorAll("[data-r]:not(.in)").forEach(function (el) { if (el.getBoundingClientRect().top < innerHeight) el.classList.add("in"); }); }, 2000);
})();

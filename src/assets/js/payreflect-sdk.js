(() => {
  document.addEventListener("DOMContentLoaded", () => {
    window.postMessage({ name: "allcontentloaded" }, "*");
  });
})(window);

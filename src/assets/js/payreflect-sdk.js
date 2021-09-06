((window) => {
  window.addEventListener("DOMContentLoaded", () => {
    window.postMessage({ name: "allcontentloaded" }, "*");
  });
})(window);

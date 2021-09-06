((window) => {
  window.addEventListener("DOMContentLoaded", () => {
    window.top.postMessage({ name: "allcontentloaded" }, "*");
  });
})(window);

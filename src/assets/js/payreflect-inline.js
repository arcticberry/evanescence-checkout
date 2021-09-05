((window) => {
  const CHECKOUT_URL = "http://checkout.payreflect.com/?";

  /**
   * Accepts a keypair map of attributes and adds them to element
   * @param {Object} attributes
   * @param {HTMLElement} element
   */
  function attachAttributesToElement(attributes, element) {
    Object.entries(attributes).forEach(([key, val]) => {
      element.setAttribute(key, val);
    });
  }

  /**
   * Creates and mounts a DOM node to host views.
   */
  function loadIframe() {
    let frameElement = document.createElement("iframe");

    attachAttributesToElement(
      {
        allowTransparency: "true",
        width: "100%",
        height: "100%",
        name: "payreflect-checkout",
        id: "payreflect-checkout",
        src: CHECKOUT_URL,
      },
      frameElement
    );

    console.log(frameElement, document.body);
    if (document.body) {
      document.body.appendChild(frameElement);
    }
  }

  /**
   * Rolls the ball into motion.
   */
  window.initializePayreflectInline = function () {
    loadIframe();
  };
})(window);

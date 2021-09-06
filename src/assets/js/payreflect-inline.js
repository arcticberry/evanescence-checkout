((window) => {
  const CHECKOUT_URL = "http://checkout.payreflect.com/?";
  let loadingStatus = "idle";
  let showSpinner = function () {
    const spinnerContainer = document.createElement("div");
    attachAttributesToElement(
      {
        class: "spinner-container",
        id: "payreflect-checkout-spinner-container",
      },
      spinnerContainer
    );

    const spinner = document.createElement("div");
    attachAttributesToElement(
      {
        class: "spinner",
      },
      spinner
    );

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    attachAttributesToElement(
      {
        height: "40px",
        width: "40px",
        viewBox: "0 0 60 60",
        class: "svg-spinner",
      },
      svg
    );

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.style.fill = "#00B4D8";
    path.style.fillRule = "evenodd";
    path.setAttribute(
      "d",
      "M59.972 26a37.616 37.616 0 0 0-.71-3.455 30.092 30.092 0 0 0-1.446-4.26 30.682 30.682 0 0 0-4.809-7.849 29.483 29.483 0 0 0-7.594-6.389A29.733 29.733 0 0 0 36.292.551C34.63.216 32.956.015 31.255.002a39.08 39.08 0 0 0-3.964.16 30.369 30.369 0 0 0-9.898 2.747 30.882 30.882 0 0 0-7.34 4.848A30.286 30.286 0 0 0 4.4 14.495C2.7 17.28 1.427 20.32.73 23.509c-.562 2.545-.83 5.17-.696 7.782.12 2.532.509 5.063 1.272 7.488a30.823 30.823 0 0 0 1.782 4.5 30.367 30.367 0 0 0 2.464 4.112 30.149 30.149 0 0 0 6.67 6.764 29.967 29.967 0 0 0 18.779 5.827 29.845 29.845 0 0 0 9.724-1.942 29.06 29.06 0 0 0 8.237-4.862c1.232-1.045 2.33-2.224 3.362-3.47 1.045-1.259 1.982-2.585 2.76-4.018a29.445 29.445 0 0 0 1.714-3.817c.24-.643.469-1.286.656-1.956.2-.71.348-1.446.482-2.17.201-1.138.281-2.317.174-3.469-.093.51-.174 1.005-.294 1.5a14.602 14.602 0 0 1-.55 1.688c-.428 1.165-.964 2.29-1.473 3.416a36.09 36.09 0 0 1-2.25 4.125 28.98 28.98 0 0 1-1.353 1.996c-.482.643-1.031 1.259-1.58 1.862a23.257 23.257 0 0 1-3.617 3.268 26.913 26.913 0 0 1-4.3 2.585c-3.026 1.473-6.335 2.357-9.683 2.652a27.72 27.72 0 0 1-10.22-1.018 27.424 27.424 0 0 1-8.72-4.393 27.441 27.441 0 0 1-6.455-6.939c-1.808-2.719-3.054-5.786-3.737-8.987a26.897 26.897 0 0 1-.402-2.532c-.08-.723-.147-1.46-.174-2.196a26.23 26.23 0 0 1 .281-4.581c.496-3.295 1.568-6.47 3.228-9.363a26.813 26.813 0 0 1 5.64-6.885 26.563 26.563 0 0 1 7.607-4.701 25.887 25.887 0 0 1 5.01-1.46 24.97 24.97 0 0 1 2.611-.362c.429-.04.844-.04 1.273-.08.174 0 .348.013.522.013 2.906-.053 5.826.322 8.599 1.192a25.15 25.15 0 0 1 8.237 4.42 25.798 25.798 0 0 1 6.295 7.475 27.988 27.988 0 0 1 2.934 7.795c.134.63.24 1.26.348 1.889a2.11 2.11 0 0 0 .91 1.433c1.045.696 2.505.228 3.014-.897.174-.389.228-.804.161-1.193z"
    );

    svg.appendChild(path);
    spinner.appendChild(svg);
    spinnerContainer.appendChild(spinner);

    document.body.appendChild(spinnerContainer);

    const pageStyle = document.createElement("style");
    if (pageStyle) {
      pageStyle.appendChild(
        document.createTextNode(
          ".spinner-container{height:100%;width:100%;position:fixed;top:0;left:0;background-color:rgba(225,225,225,.95); z-index:9999999}.svg-spinner{-webkit-animation:spin 500ms infinite linear;animation:spin 500ms infinite linear}.spinner{margin-top:-20px; margin-left:-20px; position:fixed; top:50%; left:50%;}@-webkit-keyframes spin {from { -webkit-transform: rotate(0deg);}to { -webkit-transform: rotate(360deg); }}@keyframes spin{from {transform:rotate(0deg);}to {transform:rotate(360deg);}}"
        )
      );
      document.getElementsByTagName("head")[0].appendChild(pageStyle);
    }
  };
  let shouldShowSpinner = true;
  let iframeAlreadyShown = false;

  let showIframe = function () {
    const frame = document.getElementById("payreflect-checkout");

    iframeAlreadyShown = true;
    // modalframesource.setAttribute('width', '100%');
    // modalframesource.setAttribute('height', '100%');
    document.body.style.overflow = "hidden";
    frame.style.opacity = "1";
    frame.style.pointerEvents = "";
    frame.style.zIndex = "2147483647";
  };

  let messageHandlers = {};

  messageHandlers.allcontentloaded = function () {
    loadingStatus = "loaded";
    if (!shouldShowSpinner) {
      const $spinnerContainer = document.getElementById(
        "payreflect-checkout-spinner-container"
      );
      document.body.removeChild($spinnerContainer);
      showIframe();
    }
  };

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
   * Turns a map to a delimited query string
   * @param {Object} queryParams
   */
  function generateQueryString(queryParams) {
    return Object.entries(queryParams).reduce((acc, [key, val], idx) => {
      const prefix = idx === 0 ? "" : "&";
      return `${acc}${prefix}${key}=${encodeURIComponent(val)}`;
    }, "");
  }

  /**
   * Attaches necessary event listeners
   */
  function attachEventListeners() {
    window.addEventListener("message", (message) => {
      if (message) {
        messageHandlers[message.data.name](message);
      }
    });
  }

  /**
   * Creates and mounts a DOM node to host views.
   */
  function loadIframe() {
    let frameElement = document.createElement("iframe");

    attachAttributesToElement(
      {
        style:
          "position:fixed;top:0;left:0;z-index:-1;border:none;opacity:0;pointer-events:none;width:100%;height:100%;",
        allowTransparency: "true",
        width: "100%",
        height: "100%",
        name: "payreflect-checkout",
        id: "payreflect-checkout",
        src: CHECKOUT_URL,
      },
      frameElement
    );

    if (document.body) {
      document.body.appendChild(frameElement);
    }

    if (loadingStatus === "loaded") {
      alert("This guy is loaded!");
    } else {
      showSpinner();
      shouldShowSpinner = false;
    }
  }

  /**
   * Passes a config object in url encoded form
   * @param {Object} config
   */
  function passConfigToFrame(config) {
    config.initUrl = window.location.href;

    const frame = document.getElementById("payreflect-checkout");

    frame.src = frame.src + generateQueryString(config);
  }

  attachEventListeners();

  /**
   * Rolls the ball into motion.
   * @param {Object} config
   * @returns {void}
   */
  window.initializePayreflectInline = function (config) {
    loadIframe();
    passConfigToFrame(config);
  };
})(window);

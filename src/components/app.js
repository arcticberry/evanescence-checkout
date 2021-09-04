import { useEffect } from "preact/hooks";
import { Router } from "preact-router";

// Code-splitting is automated for `routes` directory
import Popup from "../routes/popup";

const App = () => {
  useEffect(() => {
    document.body.classList.remove("app-loading");
  }, []);

  return (
    <div id="app">
      <Router>
        <Popup path="/" />
      </Router>
    </div>
  );
};

export default App;

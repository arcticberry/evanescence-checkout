import { useEffect } from "preact/hooks";
import { Router } from "preact-router";

// Code-splitting is automated for `routes` directory
import Home from "../routes/home";
import Popup from "../routes/popup";
import Profile from "../routes/profile";

const App = () => {
  useEffect(() => {
    document.body.classList.remove("app-loading");
  }, []);

  return (
    <div id="app">
      <Router>
        <Home path="/" />
        <Popup path="/popup" />
        <Profile path="/profile/" user="me" />
        <Profile path="/profile/:user" />
      </Router>
    </div>
  );
};

export default App;

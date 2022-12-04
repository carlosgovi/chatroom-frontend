import "./router";
import "./pages/inicio";
import "./pages/chat";
import { state } from "./state";

(function () {
  state.init();
  const root = document.querySelector(".root");
})();

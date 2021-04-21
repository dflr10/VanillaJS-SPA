import api from "./helpers/wp-api.js";
import { App } from "./App.js";

document.addEventListener("DOMContentLoaded", () => {
  App();
});
window.addEventListener("hashchange", () => {
  api.page = 1;
  App();
});

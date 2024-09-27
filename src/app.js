import "./css/style.css";

console.log("Hello! This is from the app.js file");

import router from "./js/router";

await router(window.location.pathname);

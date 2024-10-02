import "./css/style.css";

console.log("Hello! This is from the app.js file");

import router from "./js/router";

await router(window.location.pathname);

import { setLogoutListener } from "./js/ui/global/logout";

const logoutButton = document.getElementById("logout");

// logoutButton.addEventListener("click", setLogoutListener);
document.getElementById("logout")?.addEventListener("click", setLogoutListener);
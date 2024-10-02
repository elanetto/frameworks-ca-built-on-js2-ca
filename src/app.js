import "./css/style.css";

console.log("Hello! This is from the app.js file");

import router from "./js/router";

await router(window.location.pathname);

import { setLogoutListener } from "./js/ui/global/logout";

const logoutButton = document.getElementById("logout");

if (localStorage.getItem("accessToken") === true) {
    logoutButton.style.display = "none";
} else {
    logoutButton.addEventListener("click", setLogoutListener);
}

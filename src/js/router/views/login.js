import { onLogin } from "../../ui/auth/login";

// console log test:
console.log("JS-login page under router/views/login.js loaded");

const form = document.forms.login;

form.addEventListener("submit", onLogin);

import { onCreatePost } from "../../ui/post/create";
import { authGuard } from "../../utilities/authGuard";

//test
console.log("Hello, Webpack! This is from the postCreate.js file");

authGuard();

const form = document.forms.createPost;

form.addEventListener("submit", onCreatePost);

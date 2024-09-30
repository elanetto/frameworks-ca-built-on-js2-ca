import { onCreatePost } from "../../ui/post/create";
import { authGuard } from "../../utilities/authGuard";
// import { createPost } from "../../api/post/create.js";
// import {onRegister} from "../../ui/auth/register.js";

authGuard();
//
// const form = document.forms.createPost;

const form = document.getElementById('create-form');

form.addEventListener("submit", onCreatePost);
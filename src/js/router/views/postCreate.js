import { onCreatePost } from "../../ui/post/create";
import { authGuard } from "../../utilities/authGuard";

authGuard();

const form = document.getElementById('create-form');

form.addEventListener("submit", onCreatePost);
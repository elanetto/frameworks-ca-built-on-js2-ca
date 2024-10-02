import { authGuard } from "../../utilities/authGuard";
import { readPosts } from "../../api/post/read";

authGuard();
readPosts(); // Call the readPosts function to fetch the posts from the API

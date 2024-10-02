import { API_SOCIAL_POSTS } from "../constants";

export async function deletePost(id) {
    try {
        const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
          method: 'DELETE',
          headers: {
            "Authorization": "Bearer " + `${localStorage.getItem('accessToken')}`
            }
        });
    
        if (response.ok) {
            window.location.href = "/";
        } else {
          console.error('Error deleting post:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting post:', error);
    }
}

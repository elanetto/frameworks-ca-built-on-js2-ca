import { authGuard } from "../../utilities/authGuard";
import { readPostsByUser  } from "../../api/post/read";

authGuard();

async function renderProfile() {
  const username = localStorage.getItem('userName');
  try {
    const response = await readPostsByUser (username);
    console.log(response);

    const postsContainer = document.getElementById('posts-container');
    if (!postsContainer) {
      const container = document.createElement('div');
      container.id = 'posts-container';
      document.body.appendChild(container);
      postsContainer = container;
    }

    response.data.forEach((post) => {
      const postElement = document.createElement('div');
      postElement.classList.add('post'); // Add a class to the post element
      const imageUrl = post.media && post.media.url ? post.media.url : '';
      const imageAlt = post.media && post.media.alt ? post.media.alt : '';
      postElement.innerHTML = `
        <div class="post" style="border: 1px solid #ccc; padding: 10px; margin-bottom: 20px;">
            <h2>${post.title}</h2>
            ${imageUrl ? `<img class="post-image" src="${imageUrl}" alt="${imageAlt}" style="width: 200px;">` : ''}
            <p>${post.body}</p>
            <p>Author: ${post.author.name}</p>
        </div>
        `;
      postElement.addEventListener('click', () => {
        localStorage.setItem('selectedPostId', post.id);
        window.location.href = "../post/";
      });
      postsContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error(error);
  }
}

renderProfile();
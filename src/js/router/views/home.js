import { authGuard } from "../../utilities/authGuard";
authGuard();

import { readPosts } from "../../api/post/read";

async function renderPosts() {
  try {
    const response = await readPosts();
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
      const imageUrl = post.media && post.media.url ? post.media.url : '';
      const imageAlt = post.media && post.media.alt ? post.media.alt : '';
      postElement.innerHTML = `
        <h2>${post.title}</h2>
        ${imageUrl ? `<img class="post-image" src="${imageUrl}" alt="${imageAlt}" style="width: 200px;">` : ''}
        <p>${post.body}</p>
        <p>Author: ${post.author.name}</p>
      `;
      postElement.addEventListener('click', () => {
        localStorage.setItem('selectedPostId', post.id);
        window.location.href = "../post/index.html";
      });
      postsContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error(error);
  }
}

renderPosts();

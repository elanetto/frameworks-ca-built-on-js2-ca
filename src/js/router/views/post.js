import { readPost } from "../../api/post/read";
import { deletePost } from '../../api/post/delete';
import { setLogoutListener } from '../../ui/global/logout';

document.addEventListener('DOMContentLoaded', () => {
    setLogoutListener();
});

async function renderPost() {
    const postID = localStorage.getItem('selectedPostId');
    console.log('Post ID:', postID);

    try {
        console.log('Fetching post with ID:', postID);
        const post = await readPost();
        console.log('Fetched post:', post); 

        if (!post) {
            console.error('No post data found');
            return;
        }

        const postContainer = document.getElementById('post-container');

        const loggedInUserName = localStorage.getItem('userName');
        if (loggedInUserName === post.author.name) {
            const editButton = document.createElement('button');
            editButton.id = 'edit-button';
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => {
                window.location.href = `/post/edit/?postID=${post.id}`;
            });

            const deleteButton = document.createElement('button');
            deleteButton.id = 'delete-button';
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', async () => {
                if (confirm("Are you sure you want to delete this post?")) {
                    deletePost(post.id);
                }
            });

            const buttonContainer = document.createElement('div');
            buttonContainer.id = 'button-container';
            buttonContainer.appendChild(editButton);
            buttonContainer.appendChild(deleteButton);

            postContainer.appendChild(buttonContainer);
        }

        const dateTagContainer = document.createElement('div');
        dateTagContainer.id = 'date-tag-container';
        
        const dateUpdated = document.createElement('p');
        dateUpdated.id = 'date-updated';
        dateUpdated.textContent = `Last updated: ${new Date(post.updated).toLocaleDateString()}`;
        
        const tags = document.createElement('p');
        tags.id = 'tags';
        tags.textContent = `Tags: ${post.tags.join(', ')}`;
        
        dateTagContainer.appendChild(dateUpdated);
        dateTagContainer.appendChild(tags);
        
        postContainer.appendChild(dateTagContainer);
        
        const postImage = document.createElement('img');
        postImage.id = 'post-image';
        if (post.media) {
            postImage.src = post.media.url;
            postImage.alt = post.media.alt;
        } else {
            postImage.src = '';
            postImage.alt = '';
        }
        postImage.style.width = '500px';
        
        const title = document.createElement('h1');
        title.id = 'post-title';
        title.textContent = post.title;
        
        const body = document.createElement('p');
        body.id = 'post-body';
        body.textContent = post.body;
        
        postContainer.appendChild(postImage);
        postContainer.appendChild(title);
        postContainer.appendChild(body);
        
        const authorContainer = document.createElement('div');
        authorContainer.id = 'author-container';
        
        const authorAvatar = document.createElement('img');
        authorAvatar.id = 'author-avatar';
        authorAvatar.src = post.author.avatar.url;
        authorAvatar.alt = post.author.avatar.alt;
        authorAvatar.style.width = '50px';
        authorAvatar.style.height = '50px';
        authorAvatar.style.borderRadius = '50%';
        
        const authorName = document.createElement('p');
        authorName.id = 'author-name';
        authorName.textContent = `Author: ${post.author.name}`;
        
        authorContainer.appendChild(authorAvatar);
        authorContainer.appendChild(authorName);
        
        postContainer.appendChild(authorContainer);
    } catch (error) {
        console.error('Error fetching post:', error.message);
        const errorMsg = document.createElement('div');
        errorMsg.textContent = error.message;
        document.body.appendChild(errorMsg);
    }
}

renderPost();
// import { createPost } from "../../api/post/create";

// my code:

import { API_SOCIAL_POSTS } from "../../api/constants";

export async function onCreatePost(event) {

    document.addEventListener('DOMContentLoaded', () => {

        console.log('Create Post page loaded');

        // Get username from localStorage
        const username = localStorage.getItem("username");
        document.getElementById('welcome-username').innerHTML = "&nbsp;" + (username ? JSON.parse(username) : "Guest");
        const cleanedUsername = username.replace(/"/g, '').trim();
    
        // Image preview handling
        const blogImageInput = document.getElementById('blog-image-input');
        const testImageBtn = document.getElementById('test-blog-image-btn');
        const blogImagePreview = document.getElementById('blog-image-preview');
    
        // Set the image preview to the default image
        testImageBtn.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation(); // Add this line
            const newImageUrl = blogImageInput.value.trim();
            if (newImageUrl) {
                try {
                    const url = new URL(newImageUrl);
                    blogImagePreview.src = url.href;
                    console.log('You successfully changed the image');
                } catch (error) {
                    console.log('Invalid URL: ', error);
                }
            } else {
                console.log('No URL provided');
            }
        });
    
        // Retrieve and clean up the token
        let token = localStorage.getItem("access_token");
        
        // Create a new blog post
        if (token) {
            token = token.replace(/"/g, '').trim();
            console.log("Cleaned access token: " + token);
            
            document.getElementById('submit-post-btn').addEventListener('click', function(event) {
                event.preventDefault(); // Prevent default form submission
    
                const titleInput = document.getElementById('blog-title').value;
                const imageInput = document.getElementById('blog-image-input').value;
                const bodyInput = document.getElementById('blog-content').value;
                const tagInput = document.getElementById('blog-tag').value;
    
                if (!tagInput) {
                    alert('Choose a category for your blog post.');
                    return;
                }
    
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", "Bearer " + token);
    
                const raw = JSON.stringify({
                    "title": titleInput,
                    "body": bodyInput,
                    "tags": [tagInput],
                    "media": {
                        "url": imageInput
                    }
                });
    
                const requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow"
                };
    
                const apiLink = API_SOCIAL_POSTS + '/' + cleanedUsername + '/';
    
                // Make the API request
                fetch(apiLink, requestOptions)
                    .then((response) => {
                        if (response.ok) {
                            return response.json(); // Handle JSON response
                        } else {
                            throw new Error('Network response was not ok');
                        }
                    })
                    .then((result) => {
                        console.log(result);
    
                        // Save necessary data to localStorage
                        const postId = result.data.id; // Assuming result.data contains the new post ID
                        localStorage.setItem('selectedPostId', postId); // Set the ID for the next page
                        localStorage.setItem('title', titleInput);
                        localStorage.setItem('body', bodyInput);
                        localStorage.setItem('tags', tagInput);
                        localStorage.setItem('blog_image', imageInput);
    
                        // Redirect to the read.html page
                        window.location.href = 'read.html';
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        alert('An error occurred. Please try again.');
                    });
            });
        } else {
            alert('You must be logged in to create a blog post.');
        }
    });


}



// test code:
// /**
// * Handles the create post form submission event.
// *
// * This function prevents the default form submission behavior, collects the input values
// * for title, body, tags, and media, and sends them to the `createPost` function.
// * If the post is created successfully, the user is redirected to the homepage.
// *
// * @async
// * @param {Event} event - The form submission event.
// * @returns {Promise<void>} A promise that resolves when the post creation process completes.
// */
// export async function onCreatePost(event) {
//     event.preventDefault();
 
//     const title = document.getElementById('title').value;
//     const body = document.getElementById('body').value;
//     const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());
//     const media = document.getElementById('media').value;
 
//     const postData = {
//         title,
//         body,
//         tags,
//         media,
//     };
 
//     try {
//         await createPost(postData);
//     } catch (error) {
//         console.error('Error during post creation:', error);
//         alert('Failed to create the post. Please try again.');
//     }
// }
 
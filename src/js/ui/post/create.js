import { createPost } from "../../api/post/create.js";

const username = localStorage.getItem("username");

// post creation
export async function onCreatePost(event) {
  event.preventDefault();

  // Gather the form input values
  const titleInput = event.target.title;
  const bodyInput = event.target.body;
  const mediaInput = event.target.media;
  const altInput = event.target.alt;
  const tagInput = event.target.tag;
  const imageInput = event.target.image; 

  // Check if inputs exist
  if (!titleInput || !mediaInput || !tagInput) {
    alert("Please fill in all required fields.");
    return;
  }

  // ? means optional. The others are required:
  const title = titleInput.value; 
  const body = bodyInput ? bodyInput.value : ""; 
  const media = {
    url: mediaInput.value, 
    alt: altInput ? altInput.value : "", 
  };
  const tags = [tagInput.value]; 

  try {
    // Call createPost with the gathered details
    const result = await createPost({ title, body, media, tags });

    console.log("Result:", result);

    if (result.ok) {
      console.log("Result data:", result.data); 
      console.log("Result data id:", result.data.data.id); 

      if (result.data && result.data.data && result.data.data.id) {
        const postId = result.data.data.id; 

        console.log("Post ID:", postId); 

        // Save the post id in local storage
        localStorage.setItem('selectedPostId', postId);
        localStorage.setItem('title', titleInput.value);
        localStorage.setItem('body', bodyInput.value);
        localStorage.setItem('tags', tagInput.value);
        localStorage.setItem('blog_image', imageInput.value);

        alert("Post created successfully!");
        console.log("Post ID from API code from UI:", postId);

        // Redirect to the post details page
        window.location.href = "./index.html";

      } else {
        console.error("Error: result.data or result.data.id is undefined");
      }
    } else {
      alert("Registration failed. " + (result.errors[0].message || "Check your input and try again."));
    }
  } catch (error) {
    alert("Error occurred while creating the post. Please try again.");
    console.error(error);
  }
}

// Add event listener to form submission
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('create-form');
  if (form) {
    form.addEventListener('submit', onCreatePost);
  }
});
           


// import { createPost } from "../../api/post/create.js"; 

// const username = localStorage.getItem("username");

// // post creation
// export async function onCreatePost(event) {
//     event.preventDefault();

//     // Gather the form input values
//     const titleInput = event.target.title;
//     const bodyInput = event.target.body;
//     const mediaInput = event.target.media;
//     const altInput = event.target.alt;
//     const tagInput = event.target.tag;

//     // Check if inputs exist
//     if (!titleInput || !mediaInput || !tagInput) {
//         alert("Please fill in all required fields.");
//         return;
//     }

//     const title = titleInput.value;   // Required
//     const body = bodyInput ? bodyInput.value : ""; // Optional
//     const media = {
//         url: mediaInput.value,        // Media URL from the form
//         alt: altInput ? altInput.value : "",    // Optional alt text from the form
//     };
//     const tags = [tagInput.value];     // Assuming a tag input in your form

//     try {
//         // Call createPost with the gathered details
//         const { data, ok } = await createPost({ title, body, media, tags });

//         if (ok) {
//             alert("Post created successfully!");

//             // Save the post id in local storage
//             const postId = result.data.id;
//             localStorage.setItem("postId from UI", postId);
//             localStorage.setItem("Test", "Test! hoho! Test from UI create.js");
//             console.log("Post ID from API code from UI:", postId);
//             console.log(result);

//             // Redirect to the post details page
//             // window.location.href = `../post/index.html/?postId=${postId}`; <-- wrong path
            
//             // window.location.href = "./index.html";

//         } else {
//             alert("Registration failed. " + (data.errors[0].message || "Check your input and try again."));
//         }
//     } catch (error) {
//         alert("Error occurred while creating the post. Please try again.");
//         console.error(error);
//     }
// }

// // Add event listener to form submission
// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.getElementById('create-form'); // Make sure this ID matches your HTML
//     if (form) {
//         form.addEventListener('submit', onCreatePost);
//     }
// });
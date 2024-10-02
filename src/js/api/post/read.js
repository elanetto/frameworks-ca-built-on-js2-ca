import { API_SOCIAL_POSTS, API_SOCIAL_PROFILES } from "../constants";
import { headers } from "../headers";

// const headers = headers();

// Read one post from ID:

const postId = localStorage.getItem('selectedPostId');

export async function readPost() {
  if (!postId) {
    console.error("Error: Post ID not found");
    return;
  }

  const requestOptions = {
    method: "GET",
    headers: headers(), // Call the headers function to get the actual Headers object
  };

  console.log('Request Options:', requestOptions);

  const headersObject = Object.fromEntries(requestOptions.headers.entries());
  console.log('Headers:', headersObject);

  try {
    const response = await fetch(`${API_SOCIAL_POSTS}/${postId}?_author=true`, requestOptions);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }

    const result = await response.json();
    return result.data;
  } 
  catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
}


export async function readPosts(limit = 12, page = 1,) {
    // const headers = headers();
  
    const requestOptions = {
      method: "GET",
      headers: headers(), // Call the headers function to get the actual Headers object
    };

    console.log('Request Options:', requestOptions);

    const headersObject = Object.fromEntries(requestOptions.headers.entries());
    console.log('Headers:', headersObject);

    try {
      const response = await fetch(API_SOCIAL_POSTS+`?limit=${limit}&page=${page}&_author=true`, requestOptions);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.statusText}`);
      }
  
      const result = await response.json();
      return result; 
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  }


export async function readPostsByUser(username, limit = 12, page = 1, tag) {
//   const headers = headers();

  let queryParams = `?limit=${limit}&page=${page}&_author=true`;

  if (tag) {
    queryParams += `&tag=${encodeURIComponent(tag)}`;
  }

  const requestOptions = {
    method: "GET",
    headers: headers(), // Call the headers function to get the actual Headers object
  };

  console.log('Request Options:', requestOptions);

  const headersObject = Object.fromEntries(requestOptions.headers.entries());
  console.log('Headers:', headersObject);

  try {
    const apiUrl = `${API_SOCIAL_PROFILES}/${encodeURIComponent(username)}/posts${queryParams}`;

    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      throw new Error(`Failed to fetch posts for user ${username}: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching posts by user:", error);
    throw error;
  }
}
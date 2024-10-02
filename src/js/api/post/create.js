import { API_SOCIAL_POSTS, API_KEY } from "../../api/constants.js"; // Import your constants

// Function to create a post via the API
export async function createPost({ title, body, media, tags }) {
    try {
        // Retrieve the access token from session storage
        const accessToken = localStorage.getItem('accessToken');

        console.log("Access Token:", accessToken);
        console.log("API Key:", API_KEY);

        if (!accessToken) {
            throw new Error("Access token not found in local storage.");
        }

        // Create the headers object
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'X-Noroff-API-Key': API_KEY,
            },
            body: JSON.stringify({ title, body, tags, media }) // Include all necessary fields
        };

        console.log("Sending POST request to:", API_SOCIAL_POSTS);
        console.log("Request Options:", options);

        // Send the request
        const response = await fetch(API_SOCIAL_POSTS, options);
        const data = await response.json();
        console.log("Response Data from API:", data);

        if (!response.ok) {
            throw new Error(data.errors ? data.errors[0].message : "An error occurred");
        }

        return { data, ok: response.ok };


    } catch (error) {
        console.error('Error in createPost:', error);
        throw error;
    }

    
}
import { API_AUTH_LOGIN, API_KEY } from '../constants';

// test
console.log("JS-login page under api/auth/login.js loaded");

export async function login({ email, password }) {
    try {
        const response = await fetch(API_AUTH_LOGIN, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Noroff-API-Key": API_KEY,
            },
            body: JSON.stringify({ email, password }),
        });
    
        if (!response.ok) {
            throw new Error("Login failed. Please check your credentials.");
        }
    
        const data = await response.json();
        
        if (data?.data?.accessToken) {
            localStorage.setItem('accessToken', data.data.accessToken);
            localStorage.setItem('userName', data.data.name);
        }

        return data;
    } catch (error) {
        console.error("Error during API login:", error);
        return { error: error.message };
    }
}
import { API_AUTH_LOGIN } from '../constants';

export async function login({ email, password }) {
    try {
        const response = await fetch(API_AUTH_LOGIN, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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
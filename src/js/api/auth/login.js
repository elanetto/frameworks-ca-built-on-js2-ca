export async function login({ email, password }) {
    try {
        const response = await fetch(API_AUTH_LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (data.success) {
            const authToken = data.data.accessToken;
            localStorage.setItem('authToken', authToken);
            console.log('User logged in successfully!');
        } else {
            throw new Error('Invalid username or password');
        }
    }
    catch (error) {
        throw error;
    }
}

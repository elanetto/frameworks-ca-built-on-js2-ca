export async function login({ email, password }) {
    try {
        const response = await fetch(API_AUTH_LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (data.success) {
            console.log('User logged in successfully!');
            return data.data;
        } else {
            throw new Error('Invalid username or password');
        }
    }
    catch (error) {
        throw error;
    }
}

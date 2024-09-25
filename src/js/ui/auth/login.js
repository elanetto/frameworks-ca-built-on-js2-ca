import { API_AUTH_LOGIN } from "../../api/constants";

export async function onLogin(event) {
    event.preventDefault();

    const email = document.forms.login.email.value;
    const password = document.forms.login.password.value;

    fetch(API_AUTH_LOGIN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Login response:', data); // Add this line to log the response
        if (data.data) {
            alert("User logged in successfully!");
            localStorage.setItem('authToken', data.data.accessToken);
            // window.location.href = '/dashboard';
        } else {
            console.log(data)
            throw new Error('Invalid username or password');
        }
    })
    .catch(error => {
        console.error(error);
    });
}

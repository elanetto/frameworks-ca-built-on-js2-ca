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
        if (data.data) {
            alert("User logged in successfully!");
            localStorage.setItem('authToken', data.data.accessToken);
            localStorage.setItem('username', data.data.name);
            // window.location.href = '/dashboard';
        } else {
            throw new Error('Invalid username or password');
        }
    })
    .catch(error => {
        console.error(error);
    });
}

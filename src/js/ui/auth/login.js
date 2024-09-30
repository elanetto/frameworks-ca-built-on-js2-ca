import { login } from '../../api/auth/login.js';

// test
console.log("JS-login page under ui/auth/login.js loaded");

export async function onLogin(event) {
  event.preventDefault(); 
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const result = await login({ email, password });

    if (result.error) {
      alert("Login failed: " + result.error);
    } else {
      window.location.href = "/";
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('An unexpected error occurred. Please try again later.');
  }
}

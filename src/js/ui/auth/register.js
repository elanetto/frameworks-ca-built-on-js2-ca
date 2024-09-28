import { API_AUTH_REGISTER } from '../../api/constants';

export async function onRegister(event) {
    event.preventDefault();
  
    const form = document.forms.register;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
  
    const userData = {
      name,
      email,
      password
    };
  
    try {
      const response = await fetch(API_AUTH_REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
  
      const result = await response.json();
  
      if (result.success) {
        alert('Registration successful!');
        window.location.href = '/login';
      } else {
        alert('Registration unsuccessful: ' + result.errors[0].message);
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  }
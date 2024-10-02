export function onLogout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName');
    window.location.href = '/auth/login/';
}

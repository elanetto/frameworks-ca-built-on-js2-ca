export function setLogoutListener() {
    alert("Successfully logged out!");
    localStorage.clear();

    window.location.href = "/auth/login/";
}

export function authGuard() {
  // fixed name from token to accessToken
  if (!localStorage.accessToken) {
    alert("You must be logged in to view this page");
    window.location.href = "/auth/login/";
  }
}

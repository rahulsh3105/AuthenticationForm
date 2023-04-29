const user = JSON.parse(localStorage.getItem("user"));
const logoutButton = document.getElementById("logout-button");

if (!user || !user.accessToken) {
    window.location.href = "./index.html";
}

const profileName = document.getElementById("profile-name");
const passwordElement = document.getElementById("password");
const profileEmail = document.getElementById("profile-email");

profileName.textContent = `${user.firstName}`;
profileEmail.textContent = user.email;
passwordElement.textContent = `${(user.password)}`;

// Add a click event listener to the button
logoutButton.addEventListener("click", handleLogout);

function handleLogout() {
    // Remove the user state from the local storage
    localStorage.removeItem("user");
    // Redirect the user to the signup page
    window.location.href = "./index.html";
}


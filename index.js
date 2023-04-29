const signupForm = document.getElementById("signup-form");
const passwordMismatchAlert = document.getElementById("password-mismatch-alert");
const emptyFieldAlert = document.getElementById("empty-field-alert");
const signupSuccessAlert = document.getElementById("signup-success-alert");
const passwordFormatAlert = document.getElementById("password-format-alert");

signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const firstName = document.getElementById("first-name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const cnfPassword = document.getElementById("cnfpassword").value;

    // Validate form fields
    if (firstName === "" || email === "" || password === "" || cnfPassword === "") {
        emptyFieldAlert.classList.remove("d-none"); // Show empty field alert
        passwordMismatchAlert.classList.add("d-none"); // Hide password mismatch alert
        passwordFormatAlert.classList.add("d-none"); // Hide password format alert
        signupSuccessAlert.classList.add("d-none"); // Hide signup success alert
    } else if (password !== cnfPassword) {
        passwordMismatchAlert.classList.remove("d-none"); // Show password mismatch alert
        emptyFieldAlert.classList.add("d-none"); // Hide empty field alert
        passwordFormatAlert.classList.add("d-none"); // Hide password format alert
        signupSuccessAlert.classList.add("d-none"); // Hide signup success alert
    } else if (!password.match(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)) {
        passwordFormatAlert.classList.remove("d-none"); // Show password format alert
        emptyFieldAlert.classList.add("d-none"); // Hide empty field alert
        passwordMismatchAlert.classList.add("d-none"); // Hide password mismatch alert
        signupSuccessAlert.classList.add("d-none"); // Hide signup success alert
    } else {
        const accessToken = generateAccessToken();
        const user = {
            firstName,
            email,
            password,
            cnfPassword,
            accessToken,
        };
        localStorage.setItem("user", JSON.stringify(user));
        signupForm.reset(); // Reset form fields
        signupSuccessAlert.classList.remove("d-none"); // Show signup success alert
        emptyFieldAlert.classList.add("d-none"); // Hide empty field alert
        passwordMismatchAlert.classList.add("d-none"); // Hide password mismatch alert
        passwordFormatAlert.classList.add("d-none"); // Hide password format alert
        window.location.href = "./profile.html";
    }
});

function generateAccessToken() {
    const accessToken = Array.from(
        crypto.getRandomValues(new Uint8Array(16)),
        (byte) => byte.toString(16).padStart(2, "0")
    ).join("");

    return accessToken;
}

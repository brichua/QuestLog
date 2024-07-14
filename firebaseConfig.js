function showLoginForm() {
    window.location.href = "/login.html";
}

function showSignupForm() {
    window.location.href = "/register.html";
}

async function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        console.log("Login successful");
        window.location.href = "/main.html";
    } catch (error) {
        console.error("Error logging in:", error);
    }
}

// Function to handle signup
async function signup() {
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        await db.collection("users").doc(firebase.auth().currentUser.uid).set({
            email: email,
        });
        window.location.href = "/main.html";
    } catch (error) {
        console.error("Error signing up:", error);
    }
}
const firebaseConfig = {
            apiKey: "AIzaSyAssGJV_xIYqPdlPT9pm8wL8j1-7tnZ7iU",
            authDomain: "productivity-website-a402d.firebaseapp.com",
            databaseURL: "https://productivity-website-a402d-default-rtdb.firebaseio.com",
            projectId: "productivity-website-a402d",
            storageBucket: "productivity-website-a402d.appspot.com",
            messagingSenderId: "709306651298",
            appId: "1:709306651298:web:12beca13495f69b73a7dfb",
            measurementId: "G-8WPDXW1QS0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const db = firebase.firestore();

// Function to show login form
function showLoginForm() {
    document.getElementById("login-form").style.display = "block";
    document.getElementById("signup-form").style.display = "none";
}

// Function to show signup form
function showSignupForm() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "block";
}

// Function to handle login
async function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        console.log("Login successful");
        window.location.href = "/main.html";
    } catch (error) {
        console.error("Error logging in:", error);
        // Handle login error
    }
}

// Function to handle signup
async function signup() {
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        // Add user data to Firestore
        await db.collection("users").doc(firebase.auth().currentUser.uid).set({
            name: name,
            email: email,
        });
        // Redirect to your dashboard or other page
        window.location.href = "/main.html";
    } catch (error) {
        console.error("Error signing up:", error);
        // Handle signup error
    }
}

// Initial setup - show login form by default
showLoginForm();
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
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

async function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const rememberMe = document.getElementById("remember-me").checked;

    const persistence = rememberMe ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION;

    try {
        await firebase.auth().setPersistence(persistence);
        await firebase.auth().signInWithEmailAndPassword(email, password);
        console.log("Login successful");
        window.location.href = "main.html";
    } catch (error) {
        console.error("Error logging in:", error);
        alert(error);
    }
}

async function signup() {
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        await db.collection("Users").doc(firebase.auth().currentUser.uid).set({
            email: email,
        });
        window.location.href = "main.html";
    } catch (error) {
        console.error("Error signing up:", error);
        alert(error)
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
            console.log("User is signed in:", user);
            const userId = user.uid;
            const username = user.email;

            const userUsernameElement = document.getElementById("username");
            if (userUsernameElement) {
                userUsernameElement.textContent = username;
            } else {
                console.error("Element with ID 'username' not found.");
            }
        } else {
            console.log("No user is signed in");
            window.location.href = "login.html";
        }
    });
});
function logOutUser() {
  auth.signOut().then(() => {
    console.log('User signed out successfully');
    window.location.href = 'login.html';
  }).catch((error) => {
    console.error('Error signing out:', error);
  });
}
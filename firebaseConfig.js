import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

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
        window.location.href = "create-user.html";
    } catch (error) {
        console.error("Error signing up:", error);
        alert(error)
    }
}

async function logOutUser() {
    try {
        await firebase.auth().signOut();
        console.log('User signed out successfully');
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Error signing out:', error);
    }
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    displayUserInformation();
  } else {
    window.location.href = "login.html";
  }
});

async function displayUserInformation(){
    const docRef = doc(db, "Users", firebase.auth().currentUser.uid);
    const docSnap = getDoc(docRef);
    var data = docSnap.data();

    var username = data.username;
    var skill1 = data.skill1;
    var skill2 = data.skill2;


    document.getElementById('username').innerText = username;

    skillBox1 = document.getElementById('skillBox1');
    if(skill1 != null){
        skillBox1.innerText = skill1;
        skillBox1.className = "skillBox";
    }else{
        skillBox1.innerText = "‎";
        skillBox1.className = "skillBoxEmpty";
    }
    skillBox2 = document.getElementById('skillBox2');
    if(skill2 != null){
        skillBox2.innerText = skill2;
        skillBox2.className = "skillBox";
    }else{
        skillBox2.innerText = "‎";
        skillBox2.className = "skillBoxEmpty";
    }
}

function toggleAddToDoPopup() {
    var popup = document.getElementById("AddToDoPopup");
    popup.classList.toggle("active");
}

function toggleViewToDoPopup() {
    var popup = document.getElementById("ViewToDoPopup");
    popup.classList.toggle("active");
}

function taskCompleteToggle() {
    var checkbox = document.getElementById("taskCheckbox");
    checkbox.innerText = "check_box";
}

var difficulty = 0;

function star1Toggle(){
    var star = document.getElementById("skillStar1");
    if(star.className == "material-symbols-outlined black"){
        star.className = "material-symbols-outlined black-filled";
        difficulty++;
    }else if(star.className == "material-symbols-outlined black-filled"){
        star.className = "material-symbols-outlined black";
        difficulty--;
    }
}

function star2Toggle(){
    var star = document.getElementById("skillStar2");
    if(star.className == "material-symbols-outlined black"){
        star.className = "material-symbols-outlined black-filled";
        difficulty++;
    }else if(star.className == "material-symbols-outlined black-filled"){
        star.className = "material-symbols-outlined black";
        difficulty--;
    }
}

function star3Toggle(){
    var star = document.getElementById("skillStar3");
    if(star.className == "material-symbols-outlined black"){
        star.className = "material-symbols-outlined black-filled";
        difficulty++;
    }else if(star.className == "material-symbols-outlined black-filled"){
        star.className = "material-symbols-outlined black";
        difficulty--;
    }
}
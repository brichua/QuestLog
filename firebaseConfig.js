
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

var taskName;
var taskDifficulty = 0;
var taskType;
var taskSkill;
var taskCurrencyReward;
var xpReward;
var skillxpReward;
var taskCompletion;
var taskCompleteNumber = -1;

var taskDisplayType = "all";

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
    var username = await db.collection("Users").doc(firebase.auth().currentUser.uid).get().then(doc => doc.get('username'));
    var icon = await db.collection("Users").doc(firebase.auth().currentUser.uid).get().then(doc => doc.get('icon'));
    var level = await db.collection("Users").doc(firebase.auth().currentUser.uid).get().then(doc => doc.get('level'));
    var levelXP = await db.collection("Users").doc(firebase.auth().currentUser.uid).get().then(doc => doc.get('levelXP'));
    var levelXPMax = await db.collection("Users").doc(firebase.auth().currentUser.uid).get().then(doc => doc.get('levelXPMax'));
    var currency = await db.collection("Users").doc(firebase.auth().currentUser.uid).get().then(doc => doc.get('currency'));

    var levelDisplayText = "Level: " + level + " (" + levelXP + "/" + levelXPMax + ")";

    document.getElementById('username').innerText = username;
    document.getElementById("userImage").src = icon;
    document.getElementById('levelDisplay').innerText = levelDisplayText;
    document.getElementById('currencyDisplay').innerText = currency;

    displayTaskPopup();
    displayTasks();
    displaySkills();
    displayGoodHabits();
    displayBadHabits();
    displayLatestAchievement();
    displayActiveQuests();
    displayLatestGuildPosts();
}

async function displayTasks(){
    var tasks = await db.collection("Users").doc(firebase.auth().currentUser.uid).get().then(doc => doc.get('tasks'));
    for(var i = 0; i < tasks.length; i++){
        var task = "task" + i.toString();
        try{
            document.getElementById(task).remove();
        }catch{
            
        }
    }
    
    if(taskDisplayType == "all"){
        document.getElementById("taskHeader").innerText = "All Tasks";
    for(var i = 0; i < tasks.length; i++){
        var div = document.createElement("div");
        var taskClass = "task" + i.toString();
        div.id = taskClass;
        div.className = "nextTo tasks";
        document.getElementById("taskWidget").appendChild(div);

        var starGroup = document.createElement("div");
        starGroup.className = "nextTo star";
        var starGroupString = "starGroup" + i.toString();
        starGroup.id = starGroupString;
        document.getElementById(taskClass).appendChild(starGroup);
        if(tasks[i].difficulty == 1){
            var star1 = document.createElement("span");
            star1.className = "material-symbols-outlined fill";
            star1.innerText="kid_star"
            document.getElementById(starGroupString).appendChild(star1);
            var star2 = document.createElement("span");
            star2.className = "material-symbols-outlined";
            star2.innerText="kid_star"
            document.getElementById(starGroupString).appendChild(star2);
            var star3 = document.createElement("span");
            star3.className = "material-symbols-outlined";
            star3.innerText="kid_star"
            document.getElementById(starGroupString).appendChild(star3);
        }else if(tasks[i].difficulty == 2){
            var star1 = document.createElement("span");
            star1.className = "material-symbols-outlined fill";
            star1.innerText="kid_star"
            document.getElementById(starGroupString).appendChild(star1);
            var star2 = document.createElement("span");
            star2.className = "material-symbols-outlined fill";
            star2.innerText="kid_star"
            document.getElementById(starGroupString).appendChild(star2);
            var star3 = document.createElement("span");
            star3.className = "material-symbols-outlined";
            star3.innerText="kid_star"
            document.getElementById(starGroupString).appendChild(star3);
        }else if(tasks[i].difficulty == 3){
            var star1 = document.createElement("span");
            star1.className = "material-symbols-outlined fill";
            star1.innerText="kid_star"
            document.getElementById(starGroupString).appendChild(star1);
            var star2 = document.createElement("span");
            star2.className = "material-symbols-outlined fill";
            star2.innerText="kid_star"
            document.getElementById(starGroupString).appendChild(star2);
            var star3 = document.createElement("span");
            star3.className = "material-symbols-outlined fill";
            star3.innerText="kid_star"
            document.getElementById(starGroupString).appendChild(star3);
        }

        var p = document.createElement("p");
        p.innerText = "‎ ‎ ‎ ‎";
        document.getElementById(taskClass).appendChild(p);

        var toggleButton = document.createElement("button");
        toggleButton.className = "material-symbols-outlined changeToDoButton";
        var taskNumber = "task" + i.toString() + "Checkbox";
        if(tasks[i].completed == true){
        toggleButton.innerText = "check_box";
        }else{
            toggleButton.innerText = "check_box_outline_blank";
        }
        toggleButton.id = taskNumber;
        taskCompleteNumber = i;
        toggleButton.onclick = "taskCompleteToggle(taskCompleteNumber)";
        document.getElementById(taskClass).appendChild(toggleButton);

        
        p.innerText = "‎ ‎";
        document.getElementById(taskClass).appendChild(p);

        var taskButton = document.createElement("button");
        taskButton.className = "transparentTextButton";
        var taskNumber = "task" + i.toString() + "Name";
        taskButton.id = taskNumber;
        taskButton.onclick = "taskDisplay()";
        taskButton.innerText = tasks[i].name;
        document.getElementById(taskClass).appendChild(taskButton);

        var skillBox = document.createElement("div");
        skillBox.className = "skillBox";
        skillBox.innerText = tasks[i].skill;
        document.getElementById(taskClass).appendChild(skillBox);
    }
    }else if(taskDisplayType == "daily"){
        document.getElementById("taskHeader").innerText = "Daily Tasks";
    for(var i = 0; i < tasks.length; i++){
        if(tasks[i].type == "daily"){
        var div = document.createElement("div");
        var taskClass = "task" + i.toString();
        div.id = taskClass;
        div.className = "nextTo tasks";
        document.getElementById("taskWidget").appendChild(div);

        var starGroup = document.createElement("div");
        starGroup.className = "nextTo star";
        var starGroupString = "starGroup" + i.toString();
        starGroup.id = starGroupString;
        document.getElementById(taskClass).appendChild(starGroup);
        if(tasks[i].difficulty == 1){
            var star1 = document.createElement("span");
            star1.className = "material-symbols-outlined fill";
            star1.innerText="kid_star"
            document.getElementById(starGroupString).appendChild(star1);
            var star2 = document.createElement("span");
            star2.className = "material-symbols-outlined";
            star2.innerText="kid_star"
            document.getElementById(starGroupString).appendChild(star2);
            var star3 = document.createElement("span");
            star3.className = "material-symbols-outlined";
            star3.innerText="kid_star"
            document.getElementById(starGroupString).appendChild(star3);
        }else if(tasks[i].difficulty == 2){
            var star1 = document.createElement("span");
            star1.className = "material-symbols-outlined fill";
            star1.innerText="kid_star"
            document.getElementById(starGroupString).appendChild(star1);
            var star2 = document.createElement("span");
            star2.className = "material-symbols-outlined fill";
            star2.innerText="kid_star"
            document.getElementById(starGroupString).appendChild(star2);
            var star3 = document.createElement("span");
            star3.className = "material-symbols-outlined";
            star3.innerText="kid_star"
            document.getElementById(starGroupString).appendChild(star3);
        }else if(tasks[i].difficulty == 3){
            var star1 = document.createElement("span");
            star1.className = "material-symbols-outlined fill";
            star1.innerText="kid_star"
            document.getElementById(starGroupString).appendChild(star1);
            var star2 = document.createElement("span");
            star2.className = "material-symbols-outlined fill";
            star2.innerText="kid_star"
            document.getElementById(starGroupString).appendChild(star2);
            var star3 = document.createElement("span");
            star3.className = "material-symbols-outlined fill";
            star3.innerText="kid_star"
            document.getElementById(starGroupString).appendChild(star3);
        }

        var p = document.createElement("p");
        p.innerText = "‎ ‎ ‎ ‎";
        document.getElementById(taskClass).appendChild(p);

        var toggleButton = document.createElement("button");
        toggleButton.className = "material-symbols-outlined changeToDoButton";
        var taskNumber = "task" + i.toString() + "Checkbox";
        if(tasks[i].completed == true){
        toggleButton.innerText = "check_box";
        }else{
            toggleButton.innerText = "check_box_outline_blank";
        }
        toggleButton.id = taskNumber;
        taskCompleteNumber = i;
        toggleButton.onclick = "taskCompleteToggle(taskCompleteNumber)";
        document.getElementById(taskClass).appendChild(toggleButton);

        
        p.innerText = "‎ ‎";
        document.getElementById(taskClass).appendChild(p);

        var taskButton = document.createElement("button");
        taskButton.className = "transparentTextButton";
        var taskNumber = "task" + i.toString() + "Name";
        taskButton.id = taskNumber;
        taskButton.onclick = "taskDisplay()";
        taskButton.innerText = tasks[i].name;
        document.getElementById(taskClass).appendChild(taskButton);

        var skillBox = document.createElement("div");
        skillBox.className = "skillBox";
        skillBox.innerText = tasks[i].skill;
        document.getElementById(taskClass).appendChild(skillBox);
    }
    }
    }else if(taskDisplayType == "weekly"){
        for(var i = 0; i < tasks.length; i++){
            document.getElementById("taskHeader").innerText = "Weekly Tasks";
            if(tasks[i].type == "weekly"){
            var div = document.createElement("div");
            var taskClass = "task" + i.toString();
            div.id = taskClass;
            div.className = "nextTo tasks";
            document.getElementById("taskWidget").appendChild(div);
    
            var starGroup = document.createElement("div");
            starGroup.className = "nextTo star";
            var starGroupString = "starGroup" + i.toString();
            starGroup.id = starGroupString;
            document.getElementById(taskClass).appendChild(starGroup);
            if(tasks[i].difficulty == 1){
                var star1 = document.createElement("span");
                star1.className = "material-symbols-outlined fill";
                star1.innerText="kid_star"
                document.getElementById(starGroupString).appendChild(star1);
                var star2 = document.createElement("span");
                star2.className = "material-symbols-outlined";
                star2.innerText="kid_star"
                document.getElementById(starGroupString).appendChild(star2);
                var star3 = document.createElement("span");
                star3.className = "material-symbols-outlined";
                star3.innerText="kid_star"
                document.getElementById(starGroupString).appendChild(star3);
            }else if(tasks[i].difficulty == 2){
                var star1 = document.createElement("span");
                star1.className = "material-symbols-outlined fill";
                star1.innerText="kid_star"
                document.getElementById(starGroupString).appendChild(star1);
                var star2 = document.createElement("span");
                star2.className = "material-symbols-outlined fill";
                star2.innerText="kid_star"
                document.getElementById(starGroupString).appendChild(star2);
                var star3 = document.createElement("span");
                star3.className = "material-symbols-outlined";
                star3.innerText="kid_star"
                document.getElementById(starGroupString).appendChild(star3);
            }else if(tasks[i].difficulty == 3){
                var star1 = document.createElement("span");
                star1.className = "material-symbols-outlined fill";
                star1.innerText="kid_star"
                document.getElementById(starGroupString).appendChild(star1);
                var star2 = document.createElement("span");
                star2.className = "material-symbols-outlined fill";
                star2.innerText="kid_star"
                document.getElementById(starGroupString).appendChild(star2);
                var star3 = document.createElement("span");
                star3.className = "material-symbols-outlined fill";
                star3.innerText="kid_star"
                document.getElementById(starGroupString).appendChild(star3);
            }
    
            var p = document.createElement("p");
            p.innerText = "‎ ‎ ‎ ‎";
            document.getElementById(taskClass).appendChild(p);
    
            var toggleButton = document.createElement("button");
            toggleButton.className = "material-symbols-outlined changeToDoButton";
            var taskNumber = "task" + i.toString() + "Checkbox";
            if(tasks[i].completed == true){
            toggleButton.innerText = "check_box";
            }else{
                toggleButton.innerText = "check_box_outline_blank";
            }
            toggleButton.id = taskNumber;
            toggleButton.onclick = "taskCompleteToggle()";
            document.getElementById(taskClass).appendChild(toggleButton);
    
            
            p.innerText = "‎ ‎";
            document.getElementById(taskClass).appendChild(p);
    
            var taskButton = document.createElement("button");
            taskButton.className = "transparentTextButton";
            var taskNumber = "task" + i.toString() + "Name";
            taskButton.id = taskNumber;
            taskCompleteNumber = i;
            toggleButton.onclick = "taskCompleteToggle(taskCompleteNumber)";
            taskButton.innerText = tasks[i].name;
            document.getElementById(taskClass).appendChild(taskButton);
    
            var skillBox = document.createElement("div");
            skillBox.className = "skillBox";
            skillBox.innerText = tasks[i].skill;
            document.getElementById(taskClass).appendChild(skillBox);
        }
    }
    }else if(taskDisplayType == "monthly"){
        document.getElementById("taskHeader").innerText = "Monthly Tasks";
        for(var i = 0; i < tasks.length; i++){
            if(tasks[i].type == "weekly"){
            var div = document.createElement("div");
            var taskClass = "task" + i.toString();
            div.id = taskClass;
            div.className = "nextTo tasks";
            document.getElementById("taskWidget").appendChild(div);
    
            var starGroup = document.createElement("div");
            starGroup.className = "nextTo star";
            var starGroupString = "starGroup" + i.toString();
            starGroup.id = starGroupString;
            document.getElementById(taskClass).appendChild(starGroup);
            if(tasks[i].difficulty == 1){
                var star1 = document.createElement("span");
                star1.className = "material-symbols-outlined fill";
                star1.innerText="kid_star"
                document.getElementById(starGroupString).appendChild(star1);
                var star2 = document.createElement("span");
                star2.className = "material-symbols-outlined";
                star2.innerText="kid_star"
                document.getElementById(starGroupString).appendChild(star2);
                var star3 = document.createElement("span");
                star3.className = "material-symbols-outlined";
                star3.innerText="kid_star"
                document.getElementById(starGroupString).appendChild(star3);
            }else if(tasks[i].difficulty == 2){
                var star1 = document.createElement("span");
                star1.className = "material-symbols-outlined fill";
                star1.innerText="kid_star"
                document.getElementById(starGroupString).appendChild(star1);
                var star2 = document.createElement("span");
                star2.className = "material-symbols-outlined fill";
                star2.innerText="kid_star"
                document.getElementById(starGroupString).appendChild(star2);
                var star3 = document.createElement("span");
                star3.className = "material-symbols-outlined";
                star3.innerText="kid_star"
                document.getElementById(starGroupString).appendChild(star3);
            }else if(tasks[i].difficulty == 3){
                var star1 = document.createElement("span");
                star1.className = "material-symbols-outlined fill";
                star1.innerText="kid_star"
                document.getElementById(starGroupString).appendChild(star1);
                var star2 = document.createElement("span");
                star2.className = "material-symbols-outlined fill";
                star2.innerText="kid_star"
                document.getElementById(starGroupString).appendChild(star2);
                var star3 = document.createElement("span");
                star3.className = "material-symbols-outlined fill";
                star3.innerText="kid_star"
                document.getElementById(starGroupString).appendChild(star3);
            }
    
            var p = document.createElement("p");
            p.innerText = "‎ ‎ ‎ ‎";
            document.getElementById(taskClass).appendChild(p);
    
            var toggleButton = document.createElement("button");
            toggleButton.className = "material-symbols-outlined changeToDoButton";
            var taskNumber = "task" + i.toString() + "Checkbox";
            if(tasks[i].completed == true){
            toggleButton.innerText = "check_box";
            }else{
                toggleButton.innerText = "check_box_outline_blank";
            }
            toggleButton.id = taskNumber;
            toggleButton.onclick = "taskCompleteToggle()";
            document.getElementById(taskClass).appendChild(toggleButton);
    
            
            p.innerText = "‎ ‎";
            document.getElementById(taskClass).appendChild(p);
    
            var taskButton = document.createElement("button");
            taskButton.className = "transparentTextButton";
            var taskNumber = "task" + i.toString() + "Name";
            taskButton.id = taskNumber;
            taskCompleteNumber = i;
            toggleButton.onclick = "taskCompleteToggle(taskCompleteNumber)";
            taskButton.innerText = tasks[i].name;
            document.getElementById(taskClass).appendChild(taskButton);
    
            var skillBox = document.createElement("div");
            skillBox.className = "skillBox";
            skillBox.innerText = tasks[i].skill;
            document.getElementById(taskClass).appendChild(skillBox);
        }
    }
    }
}

async function taskCompleteToggle(i){
    var tasks = await db.collection("Users").doc(firebase.auth().currentUser.uid).get().then(doc => doc.get('tasks'));
    if(tasks[i].completed == true){
        tasks[i].completed = false;
    }else{
        tasks[i].completed = true;
    }

}

async function displayLatestGuildPosts(){
    var guilds = await db.collection("Users").doc(firebase.auth().currentUser.uid).get().then(doc => doc.get('guilds'));
}

async function displayLatestAchievement(){
    var quests = await db.collection("Users").doc(firebase.auth().currentUser.uid).get().then(doc => doc.get('quests'));
    for(i = 1; i < quests.length + 1; i++){
        if(quests[quests.length - i].completed == true){
            document.getElementById("achievementName").innerText = quests[quests.length - i].name;
            document.getElementById("achievementDesc").innerText = quests[quests.length - i].description;
        }
    }
}

async function displayActiveQuests(){
    var quests = await db.collection("Users").doc(firebase.auth().currentUser.uid).get().then(doc => doc.get('quests'));
    if(quests.length % 2 == 0){
        var count = 1;
    }else{
        var count = 0;
    }
    for(i = 1; i < quests.length + 1; i++){
        if(quests[quests.length - i].completed == false){
            if(count % 2 == 0){
                var div = document.createElement("div");
                divID = "quest" + i;
                div.id = divID;
                div.className = "quest";
                document.getElementById("activeQuests").appendChild(div);

                var strong = document.createElement("strong");
                strong.innerText = quests[quests.length - i].name;
                document.getElementById(divID).appendChild(strong);
                var desc = document.createElement("div");
                desc.innerText = quests[quests.length - i].description;
                document.getElementById(divID).appendChild(desc);
            }else{
                var div = document.createElement("div");
                divID = "quest" + i;
                div.id = divID;
                div.className = "quest2";
                document.getElementById("activeQuests").appendChild(div);

                var strong = document.createElement("strong");
                strong.innerText = quests[quests.length - i].name;
                document.getElementById(divID).appendChild(strong);
                var desc = document.createElement("div");
                desc.innerText = quests[quests.length - i].description;
                document.getElementById(divID).appendChild(desc);
            }
            count++;
        }
    }
}

async function displaySkills(){
    var skills = await db.collection("Users").doc(firebase.auth().currentUser.uid).get().then(doc => doc.get('skills'));
    count = 3;
    for(var i = 0; i < skills.length; i++){
        var skill = "titleBar" + i.toString();
        try{
            document.getElementById(skill).remove();
        }catch{
            
        }
    }
    for(var i = 0; i < skills.length; i++){
        if(count == 3){
            var div = document.createElement("div");
            var divId = "titleBar" + i;
            div.id = divId;
            div.className = "title-bar";
            document.getElementById("playerInfoWidgetContent").appendChild(div);
            count = 0;
        }
        var titleBar = document.createElement("div");
        titleBar.className = "horizontalBar";
        var titleBarString = "horizontalBar" + i.toString();
        titleBar.id = titleBarString;
        document.getElementById(divId).appendChild(titleBar);
        
        var skillLevelDiv = document.createElement("div");
        skillLevelDiv.className = "skill-level horizontal";
        var skillLevelDivString = "skillLevelDiv" + i.toString();
        skillLevelDiv.id = skillLevelDivString;
        document.getElementById(titleBarString).appendChild(skillLevelDiv);
        
        var skillLevel = document.createElement("strong");
        skillLevel.innerText = skills[i].level;
        document.getElementById(skillLevelDivString).appendChild(skillLevel);

        var skillDisplay = document.createElement("strong");
        skillDisplay.className = "textPosition horizontal"
        var skillString = "‎ ‎ ‎ ‎" + skills[i].name + " (" + skills[i].xp + "/" + skills[i].xpMax + ")";
        skillDisplay.innerText = skillString;
        document.getElementById(titleBarString).appendChild(skillDisplay);
    
        count++;
    }
}

async function displayGoodHabits(){
    var habits = await db.collection("Users").doc(firebase.auth().currentUser.uid).get().then(doc => doc.get('goodHabits'));
    for(var i = 0; i < habits.length; i++){
        var skill = "goodHabit" + i.toString();
        try{
            document.getElementById(skill).remove();
        }catch{
            
        }
    }
    for(var i = 0; i < habits.length; i++){
        var habit = document.createElement("div");
        habit.className = "horizontalBar2";
        var habitString = "goodHabit" + i.toString();
        habit.id = habitString;
        document.getElementById("goodHabits").appendChild(habit);

        var habitIcon = document.createElement("button");
        habitIcon.innerText = "add"
        habitIcon.className = "material-symbols-outlined colored horizontal";
        document.getElementById(habitString).appendChild(habitIcon);

        var habitText = document.createElement("strong");
        habitText.className = "horizontal";
        habitText.innerText = habits[i];
        document.getElementById(habitString).appendChild(habitText);
    }
}

async function displayBadHabits(){
    var habits = await db.collection("Users").doc(firebase.auth().currentUser.uid).get().then(doc => doc.get('badHabits'));
    for(var i = 0; i < habits.length; i++){
        var skill = "badHabit" + i.toString();
        try{
            document.getElementById(skill).remove();
        }catch{
            
        }
    }
    for(var i = 0; i < habits.length; i++){
        var habit = document.createElement("div");
        habit.className = "horizontalBar2";
        var habitString = "badHabit" + i.toString();
        habit.id = habitString;
        document.getElementById("badHabits").appendChild(habit);

        var habitIcon = document.createElement("button");
        habitIcon.innerText = "remove"
        habitIcon.className = "material-symbols-outlined colored horizontal";
        document.getElementById(habitString).appendChild(habitIcon);

        var habitText = document.createElement("strong");
        habitText.className = "horizontal";
        habitText.innerText = habits[i];
        document.getElementById(habitString).appendChild(habitText);
    }
}

async function displayTaskPopup(){
    var skills = await db.collection("Users").doc(firebase.auth().currentUser.uid).get().then(doc => doc.get('skills'));

    document.getElementById('newTaskName').value = "";
    
    skillBox1 = document.getElementById('skillBox1');
    if(skills[0] != null){
        skillBox1.innerText = skills[0].name;
        skillBox1.className = "skillBox";
    }else{
        skillBox1.innerText = "‎";
        skillBox1.className = "skillBoxEmpty";
    }

    skillBox2 = document.getElementById('skillBox2');
    if(skills[1] != null){
        skillBox2.innerText = skills[1].name;
        skillBox2.className = "skillBox";
    }else{
        skillBox2.innerText = "‎";
        skillBox2.className = "skillBoxEmpty";
    }

    skillBox3 = document.getElementById('skillBox3');
    if(skills[2] != null){
        skillBox3.innerText = skills[2].name;
        skillBox3.className = "skillBox";
    }else{
        skillBox3.innerText = "‎";
        skillBox3.className = "skillBoxEmpty";
    }

    skillBox4 = document.getElementById('skillBox4');
    if(skills[3] != null){
        skillBox4.innerText = skills[3].name;
        skillBox4.className = "skillBox";
    }else{
        skillBox4.innerText = "‎";
        skillBox4.className = "skillBoxEmpty";
    }

    skillBox5 = document.getElementById('skillBox5');
    if(skills[4] != null){
        skillBox5.innerText = skills[4].name;
        skillBox5.className = "skillBox";
    }else{
        skillBox5.innerText = "‎";
        skillBox5.className = "skillBoxEmpty";
    }

    skillBox6 = document.getElementById('skillBox6');
    if(skills[5] != null){
        skillBox6.innerT5ext = skills[5].name;
        skillBox6.className = "skillBox";
    }else{
        skillBox6.innerText = "‎";
        skillBox6.className = "skillBoxEmpty";
    }

    var typeBox1 = document.getElementById("dailyTaskButton");
    var typeBox2 = document.getElementById("weeklyTaskButton");
    var typeBox3 = document.getElementById("monthlyTaskButton");
    typeBox1.className = "skillBox";
    typeBox2.className = "skillBox";
    typeBox3.className = "skillBox";
}

function toggleAddToDoPopup() {
    var popup = document.getElementById("AddToDoPopup");
    popup.classList.toggle("active");
    var successMessage = document.getElementById("successMessage").innerText = "";

}

function toggleViewToDoPopup() {
    var popup = document.getElementById("ViewToDoPopup");
    popup.classList.toggle("active");
}

function taskCompleteToggle() {
    var checkbox = document.getElementById("taskCheckbox");
    checkbox.innerText = "check_box";
}

function star1Toggle(){
    var star1 = document.getElementById("skillStar1");
    var star2 = document.getElementById("skillStar2");
    var star3 = document.getElementById("skillStar3");
    star1.className = "material-symbols-outlined black-filled";
    star2.className = "material-symbols-outlined black";
    star3.className = "material-symbols-outlined black";
    taskDifficulty = 1;
    xpReward = 5;
    taskCurrencyReward = 50;
    skillxpReward = 2;
}

function star2Toggle(){
    var star1 = document.getElementById("skillStar1");
    var star2 = document.getElementById("skillStar2");
    var star3 = document.getElementById("skillStar3")
    var star3 = document.getElementById("skillStar3");
    star1.className = "material-symbols-outlined black-filled";
    star2.className = "material-symbols-outlined black-filled";
    star3.className = "material-symbols-outlined black";
    taskDifficulty = 2;
    xpReward = 10;
    taskCurrencyReward = 100;
    skillxpReward = 5;
}

function star3Toggle(){
    var star1 = document.getElementById("skillStar1");
    var star2 = document.getElementById("skillStar2");
    var star3 = document.getElementById("skillStar3");
    var star3 = document.getElementById("skillStar3");
    star1.className = "material-symbols-outlined black-filled";
    star2.className = "material-symbols-outlined black-filled";
    star3.className = "material-symbols-outlined black-filled";
    taskDifficulty = 3;
    xpReward = 20;
    taskCurrencyReward = 150;
    skillxpReward = 10;
}

function typeToggle1(){
    var typeBox1 = document.getElementById("dailyTaskButton");
    var typeBox2 = document.getElementById("weeklyTaskButton");
    var typeBox3 = document.getElementById("monthlyTaskButton");
    typeBox1.className = "skillBoxChosen";
    typeBox2.className = "skillBox";
    typeBox3.className = "skillBox";
    taskType = "daily";
}

function typeToggle2(){
    var typeBox1 = document.getElementById("dailyTaskButton");
    var typeBox2 = document.getElementById("weeklyTaskButton");
    var typeBox3 = document.getElementById("monthlyTaskButton");
    typeBox1.className = "skillBox";
    typeBox2.className = "skillBoxChosen";
    typeBox3.className = "skillBox";
    taskType = "weekly";
}

function typeToggle3(){
    var typeBox1 = document.getElementById("dailyTaskButton");
    var typeBox2 = document.getElementById("weeklyTaskButton");
    var typeBox3 = document.getElementById("monthlyTaskButton");
    typeBox1.className = "skillBox";
    typeBox2.className = "skillBox";
    typeBox3.className = "skillBoxChosen";
    taskType = "monthly";
}

function skill1Toggle(){
    var skillBox1 = document.getElementById("skillBox1");
    var skillBox2 = document.getElementById("skillBox2");
    var skillBox3 = document.getElementById("skillBox3");
    var skillBox4 = document.getElementById("skillBox4");
    var skillBox5 = document.getElementById("skillBox5");
    var skillBox6 = document.getElementById("skillBox6");
    if(skillBox1.className == "skillBox"){
        skillBox1.className = "skillBoxChosen";
        if(skillBox2.className == "skillBoxChosen"){
            skillBox2.className = "skillBox";
        }
        if(skillBox3.className == "skillBoxChosen"){
            skillBox3.className = "skillBox";
        }
        if(skillBox4.className == "skillBoxChosen"){
            skillBox4.className = "skillBox";
        }
        if(skillBox5.className == "skillBoxChosen"){
            skillBox5.className = "skillBox";
        }
        if(skillBox6.className == "skillBoxChosen"){
            skillBox6.className = "skillBox";
        }
        taskSkill = skillBox1.innerText;
    }
}

function skill2Toggle(){
    var skillBox1 = document.getElementById("skillBox1");
    var skillBox2 = document.getElementById("skillBox2");
    var skillBox3 = document.getElementById("skillBox3");
    var skillBox4 = document.getElementById("skillBox4");
    var skillBox5 = document.getElementById("skillBox5");
    var skillBox6 = document.getElementById("skillBox6");
    if(skillBox2.className == "skillBox"){
        skillBox2.className = "skillBoxChosen";
        if(skillBox1.className == "skillBoxChosen"){
            skillBox1.className = "skillBox";
        }
        if(skillBox3.className == "skillBoxChosen"){
            skillBox3.className = "skillBox";
        }
        if(skillBox4.className == "skillBoxChosen"){
            skillBox4.className = "skillBox";
        }
        if(skillBox5.className == "skillBoxChosen"){
            skillBox5.className = "skillBox";
        }
        if(skillBox6.className == "skillBoxChosen"){
            skillBox6.className = "skillBox";
        }
        taskSkill = skillBox2.innerText;
    }
}

function skill3Toggle(){
    var skillBox1 = document.getElementById("skillBox1");
    var skillBox2 = document.getElementById("skillBox2");
    var skillBox3 = document.getElementById("skillBox3");
    var skillBox4 = document.getElementById("skillBox4");
    var skillBox5 = document.getElementById("skillBox5");
    var skillBox6 = document.getElementById("skillBox6");
    if(skillBox3.className == "skillBox"){
        skillBox3.className = "skillBoxChosen";
        if(skillBox2.className == "skillBoxChosen"){
            skillBox2.className = "skillBox";
        }
        if(skillBox1.className == "skillBoxChosen"){
            skillBox1.className = "skillBox";
        }
        if(skillBox4.className == "skillBoxChosen"){
            skillBox4.className = "skillBox";
        }
        if(skillBox5.className == "skillBoxChosen"){
            skillBox5.className = "skillBox";
        }
        if(skillBox6.className == "skillBoxChosen"){
            skillBox6.className = "skillBox";
        }
        taskSkill = skillBox3.innerText;
    }
}

function skill4Toggle(){
    var skillBox1 = document.getElementById("skillBox1");
    var skillBox2 = document.getElementById("skillBox2");
    var skillBox3 = document.getElementById("skillBox3");
    var skillBox4 = document.getElementById("skillBox4");
    var skillBox5 = document.getElementById("skillBox5");
    var skillBox6 = document.getElementById("skillBox6");
    if(skillBox4.className == "skillBox"){
        skillBox4.className = "skillBoxChosen";
        if(skillBox2.className == "skillBoxChosen"){
            skillBox2.className = "skillBox";
        }
        if(skillBox3.className == "skillBoxChosen"){
            skillBox3.className = "skillBox";
        }
        if(skillBox1.className == "skillBoxChosen"){
            skillBox1.className = "skillBox";
        }
        if(skillBox5.className == "skillBoxChosen"){
            skillBox5.className = "skillBox";
        }
        if(skillBox6.className == "skillBoxChosen"){
            skillBox6.className = "skillBox";
        }
        taskSkill = skillBox4.innerText;
    }
}

function skill5Toggle(){
    var skillBox1 = document.getElementById("skillBox1");
    var skillBox2 = document.getElementById("skillBox2");
    var skillBox3 = document.getElementById("skillBox3");
    var skillBox4 = document.getElementById("skillBox4");
    var skillBox5 = document.getElementById("skillBox5");
    var skillBox6 = document.getElementById("skillBox6");
    if(skillBox5.className == "skillBox"){
        skillBox5.className = "skillBoxChosen";
        if(skillBox2.className == "skillBoxChosen"){
            skillBox2.className = "skillBox";
        }
        if(skillBox3.className == "skillBoxChosen"){
            skillBox3.className = "skillBox";
        }
        if(skillBox4.className == "skillBoxChosen"){
            skillBox4.className = "skillBox";
        }
        if(skillBox1.className == "skillBoxChosen"){
            skillBox1.className = "skillBox";
        }
        if(skillBox6.className == "skillBoxChosen"){
            skillBox6.className = "skillBox";
        }
        taskSkill = skillBox5.innerText;
    }
}

function skill6Toggle(){
    var skillBox1 = document.getElementById("skillBox1");
    var skillBox2 = document.getElementById("skillBox2");
    var skillBox3 = document.getElementById("skillBox3");
    var skillBox4 = document.getElementById("skillBox4");
    var skillBox5 = document.getElementById("skillBox5");
    var skillBox6 = document.getElementById("skillBox6");
    if(skillBox6.className == "skillBox"){
        skillBox6.className = "skillBoxChosen";
        if(skillBox2.className == "skillBoxChosen"){
            skillBox2.className = "skillBox";
        }
        if(skillBox3.className == "skillBoxChosen"){
            skillBox3.className = "skillBox";
        }
        if(skillBox4.className == "skillBoxChosen"){
            skillBox4.className = "skillBox";
        }
        if(skillBox5.className == "skillBoxChosen"){
            skillBox5.className = "skillBox";
        }
        if(skillBox1.className == "skillBoxChosen"){
            skillBox1.className = "skillBox";
        }
        taskSkill = skill6;
    }
}

function changeToDoLeft(){
    if(taskDisplayType == "all"){
        taskDisplayType = "monthly";
        displayTasks();
    }else if(taskDisplayType == "monthly"){
        taskDisplayType = "weekly";
        displayTasks();
    }else if(taskDisplayType == "weekly"){
        taskDisplayType = "daily";
        displayTasks();
    }else if(taskDisplayType == "daily"){
        taskDisplayType = "all";
        displayTasks();
    }
}

function changeToDoRight(){
    if(taskDisplayType == "all"){
        taskDisplayType = "daily";
        displayTasks();
    }else if(taskDisplayType == "daily"){
        taskDisplayType = "weekly";
        displayTasks();
    }else if(taskDisplayType == "weekly"){
        taskDisplayType = "monthly";
        displayTasks();
    }else if(taskDisplayType == "monthly"){
        taskDisplayType = "all";
        displayTasks();
    }
}

async function addTask(){
    var taskName = document.getElementById("newTaskName").value;
    var successMessage = document.getElementById("successMessage").innerText = "Created New Task";
    const task = {name: taskName, type: taskType, difficulty: taskDifficulty,
        xpReward: xpReward, currencyReward: taskCurrencyReward, skillxpReward: skillxpReward, skill: taskSkill, completed: false}
    try{
    var tasksTemp = await db.collection("Users").doc(firebase.auth().currentUser.uid).get().then(doc => doc.get('tasks'));
    tasksTemp.push(task);
        await db.collection("Users").doc(firebase.auth().currentUser.uid).update({
        tasks: tasksTemp,
        });
    }catch(error){
        console.error("Error creating task:", error);
    }
    displayUserInformation();
}
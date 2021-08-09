/*Get to other main webpages
 * To be changed if link changes
 */
function statistics() {
    window.location.href = "./statistics.php";
}
function routine() {
    window.location.href = "./routine.php";
}

let dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function textDay(day) {
    for (let i = 0; i < dayArray.length; i++) {
        if (day === i) {
            return dayArray[i];
        }
    }
}

let monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function textMonth(month) {
    for (let i = 0; i < monthArray.length; i++) {
        if (month === i) {
            return monthArray[i];
        }
    }
}

function wholeDate(date) {
    if (date < 10) {
        date = "0" + date;
    }
    return date;
}

function wholeMonth(month) {
    if (month < 10) {
        month = "0" + month;
    }
    return month;
}

function doublehours(num) {
    if (num < 10) {
        num = "0" + num; //oooo can add string to number in javascript I didnt know that
    }
    return num;
}

function doubleminutes(num) {
    if (num < 10) {
        num = "0" + num;
    }
    return num;
}

function checkTime(i) {
    if(i<10){
        i = "0" + i;
    }
    return i;
} 

/*For time to be dynamic*/
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);

    document.getElementById("currentTime").innerHTML = h + ":" + m + ":" + s;
    t = setTimeout(function() {
        startTime()
    }, 500);
}

/*Onload can only appear once!!!!!!*/
window.onload = function getHeading() {
    let today = new Date(); //creating object to use Date method
    let date = wholeDate(today.getDate()) + "-" + wholeMonth(today.getMonth() + 1) + "-" + today.getFullYear();
    let currentDate = document.getElementById("currentDate");
    currentDate.setAttribute("value", date);

    startTime();

    let user = username; //obtained from php in main_schedule.php line 61
    let welcome = "Welcome, " + user + "!";
    let currentUser = document.getElementById("currentUser");
    currentUser.setAttribute("value", welcome);

    let day = textDay(today.getDay()) + ", " + wholeDate(today.getDate()) + " " + textMonth(today.getMonth()) + "'s Schedule";
    let currentSchedule = document.getElementById("currentSchedule");
    currentSchedule.setAttribute("value", day);

    printSchedule(generateSchedule());
}

/*For when the 4 icons are clicked*/
/*start button*/
function clickPlay() {
    //TODO: The clicking done can submit a form to collect the necessary info --> Need to discuss in greater detail
    var url = "../countdownTimer.php";
    let myRef = window.open(url, 'mywin', 'left=20, top=20, width=750, height=700, toolbar=1, resizable=0');
    myRef.focus();
}

// function clickEdit() {
//     //TODO: Only editing name or anything else? Bc I think it is possible to edit anything? Just delete and insert? And can automatically generate schedule
//     var url = "../copy_add_daily_task.php"; //to redirect
//     let myRef = window.open(url, 'mywin', 'left=20, top=20, width=700, height=300, toolbar=1, resizable=0');
//     myRef.focus();
// }
/*delete button*/
function clickDelete() {
    console.log("I come to clickDelete()");
    var url = "../deleting_daily_task.php"; //opens popup to confirm deletion page
    let myRef = window.open(url, 'mywin', 'left=20, top=20, width=700, height=500, toolbar=1, resizable=0');
    myRef.focus();
}
    
function generate() {
    console.log("generate is called");
    console.log(emptyCollection[0]);
    console.log(occupiedCollection[0]);
    var scheduleArr = Scheduling.generateSchedule(emptyCollection[0], occupiedCollection[0], nonFixedCollection[0][0], nonFixedCollection[0][1]); 

    console.log(scheduleArr);
    return scheduleArr;
};
   
/*When generate schedule button is pressed*/
/*printSchedule function is to create the html and css on the
 * window that will appear on the main schedule
 * MUST SPLIT INTO FIXED AND NON-FIXED TASK CREATION: BOTH FIXED AND NON-FIXED BUTTON
 */
function printSchedule(scheduleArr) {
    console.log("printSchedule is called");
    /*To refresh schedule when generate button is clicked*/
    var block = document.getElementById("schedule");
    var blockRefresh = document.createElement("div");
    blockRefresh.id = "schedule";
    blockRefresh.innerHTML="";
    block.replaceWith(blockRefresh)
    for (let i=0; i < scheduleArr.length; i++) {
         console.log("Schedule is printed"); //debugging: function is accessed
     let block = document.getElementById("schedule");
     let maindivision = document.createElement("div"); //will contain both timedivision and namedivision
     maindivision.classList.add("maindiv"); 
     maindivision.style.float="left";
     maindivision.style.display="inline-block";
     block.appendChild(maindivision); //append a new main division
     let timedivision = document.createElement("div"); //creating the new division to contain item in schedule
     timedivision.classList.add("container1"); //classname of each item 
     maindivision.appendChild(timedivision); //appending timedivision to maindivision
// //can continue adding css for division
// /*Below will be what is appended to division: Time and itemName*/
// /*Time*/
    let itemTime = document.createElement("input");
    itemTime.classList.add("time"); //time with class name time
    itemTime.setAttribute("readonly", "readonly"); //set to readonly
    itemTime.value = scheduleArr[i].getStartTime().toString() + " - " + scheduleArr[i].getEndTime().toString();
    itemTime.style.fontFamily = "'Signika Negative', sans-serif";
    itemTime.style.fontSize = "large";
    itemTime.style.position = "relative";
    itemTime.style.zIndex = "3";
    itemTime.style.backgroundColor = "#96d6ed";
    itemTime.style.float="left";
    itemTime.style.border="none";
    itemTime.style.marginTop = "20px";
    itemTime.style.marginLeft = "15px";
    //can continue adding css for the time
    timedivision.appendChild(itemTime); //adding the time part of the item
//     /*itemName*/
    let namedivision = document.createElement("div"); //creating the new division to contain item in schedule
    namedivision.classList.add("container2"); //classname of each item 
    namedivision.style.borderColor = "black";
    namedivision.style.position="relative";
    namedivision.style.display="inline-block";
    maindivision.appendChild(namedivision); //appending namedivision to maindivision
    let itemName = document.createElement("button");
    itemName.classList.add("itemName"); //class: itemName
    itemName.innerHTML = scheduleArr[i].getTaskName();
    if (scheduleArr[i].getType() != 3) {
        itemName.addEventListener('click',function() {
            tempFixed(scheduleArr[i]);
        });
    }
    itemName.style.fontFamily = "'Signika Negative', sans-serif";
    itemName.style.fontSize = "large";
    itemName.style.position = "absolute";
    itemName.style.zIndex = "3";
    itemName.style.cursor="pointer";
    itemName.style.border = "none";
    itemName.style.backgroundColor="#96d6ed";
    itemName.style.width = "200px";
    itemName.style.textAlign="center";             
    itemName.style.marginLeft= "200px";
    itemName.style.marginTop="7px";
    //can continue adding css for itemName
    namedivision.appendChild(itemName); //adding the name part of the item
    } 
} 



/*To add fixed task select icons*/
function tempFixed(object) { //only reschedule, edit and delete
    // var currentNode = document.getElementById("iconActions");
    // var newNode = document.createElement("div");
    // newNode.id = "iconActions";
    // newNode.innerHTML = 
    // '<button class="btn" onclick="clickPlay()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-play-circle fa-2x" aria-hidden="true"></i></button>' +
    // // '<button class="btn" onclick="clickReschedule()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-calendar fa-2x" aria-hidden="true"></i></button>' +
    // '<button class="btn" onclick="clickEdit()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i></button>'+
    // '<button class="btn" onclick="clickDelete()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-trash-o fa-2x" aria-hidden="true"></i></button>' ;
    // //Replacing current iconsActions node w new iconActions node
    // currentNode.replaceWith(newNode);
    console.log("I come to tempFixed");
    localStorage.setItem("startTimeHour", object.getStartTimeHours()); //to save the taskName in local storage so that when edit is clicked can link
    localStorage.setItem("startTimeMin", object.getStartTimeMins()); //to save the taskName in local storage so that when edit is clicked can link
    localStorage.setItem("endTimeHour", object.getEndTimeHours());
    localStorage.setItem("endTimeMin", object.getEndTimeMins());
    localStorage.setItem("taskname", object.getTaskName());

    var currentPlay = document.getElementById("play");
    var newPlay = document.createElement("div");
    newPlay.id = "play";
    newPlay.innerHTML = '<button class="btn" onclick="clickPlay()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-play-circle fa-2x" aria-hidden="true"></i></button>';
    newPlay.style.marginTop = "480px";
    newPlay.style.marginLeft = "100px";
    currentPlay.replaceWith(newPlay);

    var currentEdit = document.getElementById("edit");
    var newEdit = document.createElement("div");
    newEdit.id = "edit";
    newEdit.innerHTML = '<button class="btn" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i></button>';
    newEdit.style.marginTop = "-32px";
    newEdit.style.marginLeft = "145px";
    currentEdit.replaceWith(newEdit);

    var currentDelete = document.getElementById("delete");
    var newDelete = document.createElement("div");
    newDelete.id = "delete";
    newDelete.innerHTML = '<button class="btn" onclick="clickDelete()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-trash-o fa-2x" aria-hidden="true"></i></button>';
    newDelete.style.marginTop = "-32px";
    newDelete.style.marginLeft = "195px";
    currentDelete.replaceWith(newDelete);
}

/*Open popup and close*/
function OpenPopupWindow() {   
    var url = "../add_daily_task.php"; 
    let myRef = window.open(url, 'mywin', 'left=20, top=20, width=770, height=700, toolbar=1, resizable=0');
    myRef.focus();
}
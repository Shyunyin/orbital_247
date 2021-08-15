/*Get to other main webpages
 * To be changed if link changes
 */
function schedule() {
    window.location.href = "./main_schedule.php";
}
function statistics() {
    window.location.href = "./statistics.php";
}

/*edit button for wake up time*/
function clickEditWakeup() {
    var url = "http://localhost/orbital_247/wakeup.php"; //needs to be changed
    let myRef = window.open(url, 'mywin', 'left=20, top=20, width=700, height=700, toolbar=1, resizable=0');
    myRef.focus();
}

/*edit button for productive time*/
function clickEditProductive() {
    var url = "http://localhost/orbital_247/inputProductivity.php"; //needs to be changed
    let myRef = window.open(url, 'mywin', 'left=20, top=20, width=1900, height=700, toolbar=1, resizable=0');
    myRef.focus();
}

function OpenPopupWindow() {   
    var url = "http://localhost/orbital_247/add_routine_task.php"; 
    let myRef = window.open(url, 'mywin', 'left=20, top=20, width=2000, height=800, toolbar=1, resizable=0');
    myRef.focus();
}

function convertjs(i) {
    if (i > 12) {
        return (i - 12);
    } else {
        return i;
    }
}

//printword() to print am or pm 
function printwordjs(i) {
    if (i >= 12) {
        return "PM";
    } else {
        return "AM";
    }
}

//printval() to print zero in front of single digit numbers

function checkDay(i) {
    var arr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return arr[i];
}

function checkCat(i) {
    var arr = ['Work', 'Exercise', 'Miscellaneous', 'Meal Times'];
    return arr[i];
}

function printvaljs(i){
    if (i < 10) {
        return "0" + i;
    } else {
        return i;
    }
}

function checkDate(i) {
    if ((i % 10 == 2) && (i != 12)) {
        return i + "nd";
    } else if ((i % 10 == 3) && (i != 13)) {
        return i + "rd";
    } else if ((i % 10 == 1) && (i != 11)) {
        return i + "st";
    } else {
        return i + "th";
    }
}

/*redirect(x) takes in the task name and outputs a pop out window with the input fields updated when the edit button is created*/
function redirect(routineObject) {
    localStorage.setItem("startTime", routineObject.startTime);
    localStorage.setItem("endTime", routineObject.endTime);
    localStorage.setItem("taskname", routineObject.getTaskName());
    // localStorage.setItem("startTimeHour", routineObject.startTime.getHours());
    // localStorage.setItem("startTimeMin", routineObject.startTime.getMins());
    // localStorage.setItem("endTimeHour", routineObject.endTime.getHours());
    // localStorage.setItem("endTimeMin", routineObject.endTime.getMins());

    var currentEdit = document.getElementById("edit");
    var newEdit = document.createElement("div");
    newEdit.id = "edit";
    newEdit.innerHTML = '<button class="btn" type="submit" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i></button>';
    newEdit.style.position = "relative";
    newEdit.style.zIndex = "999";
    newEdit.style.marginTop = "-27px";
    newEdit.style.marginLeft = "0px";
    currentEdit.replaceWith(newEdit);

    var currentDelete = document.getElementById("delete");
    var newDelete = document.createElement("div");
    newDelete.id = "delete";
    newDelete.innerHTML = '<button class="btn" onclick="clickDelete()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-trash-o fa-2x" aria-hidden="true"></i></button>';
    newDelete.style.position = "relative";
    newDelete.style.marginTop = "-37px";
    newDelete.style.marginLeft = "70px";
    currentDelete.replaceWith(newDelete);
    
    let mainForm = document.getElementById("actions");

    //task Name
    var taskName = document.createElement("input");
    taskName.type = "hidden";
    taskName.value = routineObject.getTaskName();
    taskName.name = "taskName";
    mainForm.appendChild(taskName);

    //taskCategory
    var taskCategory = document.createElement("input");
    taskCategory.type = "hidden";
    taskCategory.value = routineObject.getTaskCategory();
    taskCategory.name = "taskCategory";
    mainForm.appendChild(taskCategory);

    //startTime
    var startTime = document.createElement("input");
    startTime.type = "hidden";
    startTime.value = printvaljs(startTimeHour) + ":" + printvaljs(startTimeMin);
    startTime.name = "startTime";
    mainForm.appendChild(startTime);

    //endTime
    var endTime = document.createElement("input");
    endTime.type = "hidden";
    endTime.value = printvaljs(endTimeHour) + ":" + printvaljs(endTimeMin);
    endTime.name = "endTime";
    mainForm.appendChild(endTime);

    //frequency
    var freq = document.createElement("input");
    freq.type = "hidden";
    freq.value = routineObject.getFreq();
    freq.name = "freq";
    mainForm.appendChild(freq);

    //taskDay
    var startDate = document.createElement("input");
    startDate.type = "hidden";
    startDate.value = routineObject.getStartDate();
    startDate.name = "startDate";
    mainForm.appendChild(startDate);

    mainForm.submit();
}


function printRoutineList(printArr) { 
    console.log("I come to createRoutineList function");
    console.log(printArr);

    // var count = 0; //for spaces between tasks
    //to form the statement to be printed

    for (let i = 0; i < printArr.length; i++) {
        var statement;
        var startTimeHour = printArr[i].startTime.getHours();
        var startTimeMin = printArr[i].startTime.getMins();
        var endTimeHour = printArr[i].endTime.getHours();
        var endTimeMin = printArr[i].endTime.getMins();

        if (printArr[i].getFreq() == 0) {
            statement = "Daily: " + "[" + printvaljs(convertjs(startTimeHour)) + ":" + printvaljs(startTimeMin) + printwordjs(startTimeHour) + " - " + 
            printvaljs(convertjs(endTimeHour)) + ":" + printvaljs(endTimeMin) + printwordjs(endTimeHour) + "] " + printArr[i].taskName;
        } else if (printArr[i].getFreq() == 1) {
            statement = "Weekly " + ": [" + printvaljs(convertjs(startTimeHour)) + ":" + printvaljs(startTimeMin) + printwordjs(startTimeHour) + " - " + 
            printvaljs(convertjs(endTimeHour)) + ":" + printvaljs(endTimeMin) + printwordjs(endTimeHour) + "] " + printArr[i].taskName;
        } else if (printArr[i].getFreq() == 2) {
            statement = "Bieekly: " + ": [" + printvaljs(convertjs(startTimeHour)) + ":" + printvaljs(startTimeMin) + printwordjs(startTimeHour) + " - " + 
            printvaljs(convertjs(endTimeHour)) + ":" + printvaljs(endTimeMin) + printwordjs(endTimeHour) + "] " + printArr[i].taskName;
        } else if (printArr[i].getFreq() == 3) {
            statement = "Monthly"+ ": [" + printvaljs(startTimeHour) + ":" + printvaljs(startTimeMin) + printwordjs(startTimeHour) + " - " + 
            printvaljs(convertjs(endTimeHour)) + ":" + printvaljs(endTimeMin) + printwordjs(endTimeHour) + "] " + printArr[i].taskName;
        }
            console.log(statement); //debugging
            console.log(printArr[i].taskName);

            let append = document.createElement("input");
            append.type = "button";
            append.value = statement;
            append.addEventListener('click', function() {
                redirect(printArr[i]);
            }); 

            // append.setAttribute("onclick", "redirect(name)"); //x is the variable that contains the taskname
            append.classList.add("task");
            append.style.fontFamily = "'Signika Negative', sans-serif";
            append.style.fontSize = "large";
            append.style.position = "relative";
            append.style.zIndex = "99";
            append.style.color = "black";
            append.style.backgroundColor = "#96d6ed";
            append.style.border = "none";
            append.style.width = "900px";
            append.style.marginLeft = "15px";
            append.style.height = "25px";
            append.style.cursor="pointer";
            //calculation to ensure that tasks printed on top of each other
            // let top = i * 30;
            // let topText = top + "px";
            append.style.marginTop = "10px";
            append.style.textAlign = "left";
            let ele = document.getElementById("box");
            ele.appendChild(append);
    }   
}

window.onload = function() {
    printRoutineList(generateRoutineList());
}

function clickDelete() {
    console.log("I come to clickDelete()");
    var url = "../deleting_routine_task.php"; //opens popup to confirm deletion page
    let myRef = window.open(url, 'mywin', 'left=20, top=20, width=700, height=500, toolbar=1, resizable=0');
    myRef.focus();
}

/*To add fixed task select icons*/
// function tempFixed() { 
//     var currentNode = document.getElementById("iconActions");
//     var newNode = document.createElement("div");
//     newNode.id = "iconActions";
//     newNode.innerHTML = 
//     '<button class="btn" onclick="clickEdit()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i></button>' +
//     '<button class="btn" onclick="clickDelete()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-trash-o fa-2x" aria-hidden="true"></i></button>' ;
//     //Replacing current iconsActions node w new iconActions node
//     currentNode.replaceWith(newNode);
// }

// function createRoutineList(printArr) { 
//     console.log("I come to createRoutineList function");

//     var count = 0; //for spaces between tasks
//     //to form the statement to be printed

//     for (let i = 0; i < printArr.length; i++) {
//         var statement;
//         if (printArr[i].getFreq() == 0) {
//             statement = "Daily: " + printvaljs(convertjs(printArr[i].getStartTimeHours())) + ":" + printvaljs(printArr[i].getStartTimeMins()) + printwordjs(printArr[i].getStartTimeHours()) + " - " + 
//             printvaljs(convertjs(printArr[i].getEndTimeHours())) + ":" + printvaljs(printArr[i].getEndTimeMins()) + printwordjs(printArr[i].getEndTimeHours()) + " " + printArr[i].getTaskName() + " " + "(" + checkCat(printArr[i].getTaskCategory()) + ")";
//         } else if (printArr[i].getFreq() == 1) {
//             statement = "Weekly: " + checkDay(printArr[i].getDay()) + " " + printvaljs(convertjs(printArr[i].getStartTimeHours())) + ":" + printvaljs(printArr[i].getStartTimeMins()) + printwordjs(printArr[i].getStartTimeHours()) + " - " + 
//             printvaljs(convertjs(printArr[i].getEndTimeHours())) + ":" + printvaljs(printArr[i].getEndTimeMins()) + printwordjs(printArr[i].getEndTimeHours()) + " " + printArr[i].getTaskName() + " " + "(" + checkCat(printArr[i].getTaskCategory()) + ")";
//         } else if (printArr[i].getFreq() == 2) {
//             statement = "Bieekly: " + checkDay(printArr[i].getDay()) + " " + printvaljs(convertjs(printArr[i].getStartTimeHours())) + ":" + printvaljs(printArr[i].getStartTimeMins()) + printwordjs(printArr[i].getStartTimeHours()) + " - " + 
//             printvaljs(convertjs(printArr[i].getEndTimeHours())) + ":" + printvaljs(printArr[i].getEndTimeMins()) + printwordjs(printArr[i].getEndTimeHours()) + " " + printArr[i].getTaskName() + " " + "(" + checkCat(printArr[i].getTaskCategory()) + ")";
//         } else if (printArr[i].getFreq() == 3) {
//             statement = "Monthly, date: " + printArr[i].getDate() + " " + printvaljs(convertjs(printArr[i].getStartTimeHours())) + ":" + printvaljs(printArr[i].getStartTimeMins()) + printwordjs(printArr[i].getStartTimeHours()) + " - " + 
//             printvaljs(convertjs(printArr[i].getEndTimeHours())) + ":" + printvaljs(printArr[i].getEndTimeMins()) + printwordjs(printArr[i].getEndTimeHours()) + " " + printArr[i].getTaskName() + " " + "(" + checkCat(printArr[i].getTaskCategory()) + ")";
//         }
//             console.log(statement); //debugging

//             let append = document.createElement("input");
//             append.type = "button";
//             append.value = statement;
//             // append.setAttribute("readonly", "readonly");
//             append.addEventListener('click', function() {
//                 redirect(startHour, startMin, printArr[i]);
//             }); 

//             // append.setAttribute("onclick", "redirect(name)"); //x is the variable that contains the taskname
//             append.classList.add("task");
//             append.style.fontFamily = "'Signika Negative', sans-serif";
//             append.style.fontSize = "large";
//             append.style.position = "absolute";
//             append.style.zIndex = "2";
//             append.style.color = "black";
//             append.style.backgroundColor = "#96d6ed";
//             append.style.border = "none";
//             append.style.marginLeft = "15px";
//             append.style.height = "25px";
//             append.style.cursor="pointer";
//             //calculation to ensure that tasks printed on top of each other
//             let top = count * 30;
//             let topText = top + "px";
//             append.style.marginTop = topText;
//             let ele = document.getElementById("tasklist");
//             ele.appendChild(append);
//             count = count + 1;
//     }
// }               
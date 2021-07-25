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
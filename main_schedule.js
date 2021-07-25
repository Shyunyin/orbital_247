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

/*Must get input array of task names in the day, same as for add_daily_task page*/
//tasks = ["Test1", "Test2", "Test3"]; //find a way to get the tasks. [only one time tasks]

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

    //Window.initialise();
    //initialise();
//     /*For post-it stick tasks*/
//     for (let i = 0; i < tasks.length; i++) {
//         let append = document.createElement("input");
//         append.setAttribute("type", "button");
//         append.setAttribute("value", tasks[i]);
//         append.setAttribute("readonly", "readonly");
//         append.setAttribute("onclick", "redirect()")
//         append.classList.add("task");
//         append.style.fontFamily = "'Signika Negative', sans-serif";
//         append.style.fontSize = "large";
//         append.style.position = "absolute";
//         append.style.zIndex = "2";
//         append.style.color = "white";
//         append.style.backgroundColor = "#1e5353";
//         append.style.border = "none";
//         append.style.marginLeft = "15px";
//         append.style.height = "20px";
//         append.style.cursor="pointer";
//         //calculation to ensure that tasks printed on top of each other
//         let top = i * 30;
//         let topText = top + "px";
//         append.style.marginTop = topText;
//         let ele = document.getElementById("postitContent");
//         ele.appendChild(append);
//     }
// }



/*For when the 4 icons are clicked*/
/*start button*/
function clickPlay() {
    //TODO: The clicking done can submit a form to collect the necessary info --> Need to discuss in greater detail
    var url = "http://localhost/orbital_247/countdownTimer.php";
    let myRef = window.open(url, 'mywin', 'left=20, top=20, width=750, height=700, toolbar=1, resizable=0');
    myRef.focus();
}
/*reschedule button*/
// function clickReschedule() {
//     //TODO: Can submit a form with all the necessary info as well, how to obtain the task info? Minimally need userid and start time and end time --> They can choose when to reschedule it to? What will we do if there is a clash? And we will reschedule it to the same time of chose date? or ask for the timing? Regardless of whether it is a routine task or not, we will add it as a fixed task. And can automatically generate schedule
//     var url = "http://127.0.0.1:5501/rescheduleIcon.html";
//     let myRef = window.open(url, 'mywin', 'left=20, top=20, width=700, height=300, toolbar=1, resizable=0');
//     myRef.focus();
// }
/*edit button*/
// function clickEdit() {
//     //TODO: Only editing name or anything else? Bc I think it is possible to edit anything? Just delete and insert? And can automatically generate schedule
//     var url = "http://localhost/orbital_247/copy_add_daily_task.php"; //to redirect
//     let myRef = window.open(url, 'mywin', 'left=20, top=20, width=700, height=300, toolbar=1, resizable=0');
//     myRef.focus();
// }
/*delete button*/
function clickDelete() {
    //TODO: Just submit a form if its true to delete from php. Then regenerate schedule
    var x = confirm("Are you sure you want to delete this task?");
    if (x) 
        return true;
    else 
        return false; //to link to javascript when deleting tasks can check for this boolean function
}

/*Trial array just to check if printing on schedule is working*/
// var arr = ["08:00-09:00", "Wake up + Breakfast", "09:00-10:00", "Do homework", "10:00-11:00", "Prepare lunch", ];
//"09:00-10:00", "Do homework" "11:00-12:00", "early lunch"

/*Trial code to print, for 12 July use the printSchedule(arr) function below*/
// function printSchedule() {
//        /*To refresh schedule when generate button is clicked*/
//        var block = document.getElementById("schedule");
//        var blockRefresh = document.createElement("div");
//        blockRefresh.id = "schedule";
//        blockRefresh.innerHTML="";
//        block.replaceWith(blockRefresh)
//             /*Start printing of schedule*/
//             console.log("Schedule is printed"); //debugging: function is accessed
//             for (let i = 0; i < arr.length; i++) {    
//                 let schedule = document.getElementById("schedule");
//                 let maindivision = document.createElement("div"); //will contain both timedivision and namedivision
//                 maindivision.classList.add("maindiv"); 
//                 maindivision.style.float="left";
//                 maindivision.style.display="inline-block";
//                 schedule.appendChild(maindivision); //append a new main division
//                 let timedivision = document.createElement("div"); //creating the new division to contain item in schedule
//                 timedivision.classList.add("container1"); //classname of each item 
//                 maindivision.appendChild(timedivision); //appending timedivision to maindivision
//                 //can continue adding css for division
//                 /*Below will be what is appended to division: Time and itemName*/
//                 /*Time*/
//                 if (i % 2 === 0) { //even number for time
//                     let itemTime = document.createElement("input");
//                     itemTime.classList.add("time"); //time with class name time
//                     itemTime.setAttribute("readonly", "readonly"); //set to readonly
//                     itemTime.value = arr[i];
//                     itemTime.style.fontFamily = "'Signika Negative', sans-serif";
//                     itemTime.style.fontSize = "large";
//                     itemTime.style.position = "relative";
//                     itemTime.style.zIndex = "3";
//                     itemTime.style.backgroundColor = "#96d6ed";
//                     itemTime.style.border="none";
//                     itemTime.style.marginTop = "10px";
//                     itemTime.style.marginLeft = "10px";
//                     //can continue adding css for the time
//                     timedivision.appendChild(itemTime); //adding the time part of the item
//                 } else { //odd number for name
//                     /*itemName*/
//                     let namedivision = document.createElement("div"); //creating the new division to contain item in schedule
//                     namedivision.classList.add("container2"); //classname of each item 
//                     namedivision.style.borderColor = "black";
//                     namedivision.style.position="relative";
//                     namedivision.style.display="inline-block";
//                     maindivision.appendChild(namedivision); //appending namedivision to maindivision
//                     let itemName = document.createElement("button");
//                     itemName.classList.add("itemName"); //class: itemName
//                     itemName.innerHTML = arr[i];
//                     itemName.addEventListener('click', tempFixed);
//                     itemName.style.fontFamily = "'Signika Negative', sans-serif";
//                     itemName.style.fontSize = "large";
//                     itemName.style.position = "absolute";
//                     itemName.style.zIndex = "3";
//                     itemName.style.cursor="pointer";
//                     itemName.style.border = "none";
//                     itemName.style.backgroundColor="#96d6ed";
//                     itemName.style.width = "200px";       
//                     itemName.style.textAlign="center";             
//                     itemName.style.marginLeft= "200px";
//                     itemName.style.marginTop="-40px";
//                     namedivision.appendChild(itemName); //adding the name part of the item
//                 }
//             } 
//     } 
    
    function generate() {
        console.log("generate is called");
        // console.log(Window.emptyCollection[0]);
        // console.log(Window.occupiedCollection[0]);
        console.log(emptyCollection[0]);
        console.log(occupiedCollection[0]);
        var scheduleArr = Scheduling.generateSchedule(emptyCollection[0], occupiedCollection[0], nonFixedCollection[0][0], nonFixedCollection[0][1]); 
        //var scheduleArr = Scheduling.generateSchedule(Window.emptyCollection[0], Window.occupiedCollection[0], Window.nonFixedCollection[0][0], Window.nonFixedCollection[0][1]); //Testing with only today's schedule

        //console.log(Window.occupiedCollection[0]);
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
    itemName.addEventListener('click', function() {
        //tempFixed passes 3 paramenters: startHour, startMin, and scheduleArr[i] when task is clicked
        tempFixed(parseInt(scheduleArr[i].getStartTime().toString().substr(0,2)), parseInt(scheduleArr[i].getStartTime().toString().substr(3,4)), scheduleArr[i]);
    },false);
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

// /*actions(): function that creates icons onclick of class name "division"
//  * when any division/item is clicked, th icons will appear. For the following
//  * Fixed Routine Task: none MAKE SURE THAT IT IS A CONTAINER
//  * Fixed (one-time) Task: 2.Reschedule 3.Edit 4.Delete
//  * Non-fixed (one-time) Task: 1.Play 2.Reschedule 3.Edit 4.Delete
//  *  QUESTION: WILL THIS BE FOR ALL THE ITEMS?
//  */ 


  /*For detecting click outside of specified elements*/
//   var specifiedElement = document.getElementById("schedule");
//   document.addEventListener('click', function(event) {
//       var isClickInside = specifiedElement.contains(event.target);

//       if (!isClickInside) {
//           //if click was outside the specifiedELement
//           var currentNode = document.getElementById("iconActions");
//           var newNode = document.createElement("div");
//           newNode.id = "iconActions";
//           newNode.innerHTML="";
//           //Replacing current iconsActions node w new iconActions node
//           currentNode.replaceWith(newNode);
//       }
//   }
//   document.onclick = function(event){
//     var hasParent = false;
//     var fixed = document.getElementById("fixed").onclick = tempFixed();
//     var nonFixed = document.getElementById("nonFixed").onclick = tempNonFixed();
//       for(var node = event.target; node != document.body; node = node.parentNode)
//       {
//         if(node.id == 'schedule'){
//           hasParent = true;
//           break;
//         }
//       }
//     if(hasParent) {
//         alert('inside');
//         fixed = tempFixed();
//         nonFixed = tempNonFixed();
//     }
//     else
//       alert('outside');
//       var currentNode = document.getElementById("iconActions");
//       var newNode = document.createElement("div");
//       newNode.id = "iconActions";
//       newNode.innerHTML="";
//       //Replacing current iconsActions node w new iconActions node
//       currentNode.replaceWith(newNode);
//   } 
function printvaljs(i){
    if (i < 10) {
        return "0" + i;
    } else {
        return i;
    }
}

/*To add fixed task select icons*/
function tempFixed(startHour, startMin, windowObject) { //only reschedule, edit and delete
    var currentNode = document.getElementById("iconActions");
    var newNode = document.createElement("div");
    newNode.id = "iconActions";
    newNode.innerHTML = 
    '<button class="btn" onclick="clickPlay()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-play-circle fa-2x" aria-hidden="true"></i></button>' +
    // '<button class="btn" onclick="clickReschedule()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-calendar fa-2x" aria-hidden="true"></i></button>' +
    '<button class="btn" type="submit" name="edit" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i></button>';
    // '<button class="btn" onclick="clickDelete()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-trash-o fa-2x" aria-hidden="true"></i></button>' ;
    //Replacing current iconsActions node w new iconActions node
    currentNode.replaceWith(newNode);

    var mainForm = document.getElementById("actions");

    /*start appending to form with id = "actions" to retrieve from PHP in copy_add_daily_task*/
    //task Name
    var taskName = document.createElement("input");
    taskName.type = "hidden";
    taskName.value = windowObject.getTaskName();
    taskName.name = "taskName";
    mainForm.appendChild(taskName);

    //taskCategory
    var taskCategory = document.createElement("input");
    taskCategory.type = "hidden";
    taskCategory.value = windowObject.getType();
    taskCategory.name = "taskCategory";
    mainForm.appendChild(taskCategory);

    //startTime
    var startTime = document.createElement("input");
    startTime.type = "hidden";
    startTime.value = printvaljs(windowObject.getStartTimeHours()) + ":" + printvaljs(windowObject.getStartTimeMins());
    startTime.name = "startTime";
    mainForm.appendChild(startTime);

    //endTime
    var endTime = document.createElement("input");
    endTime.type = "hidden";
    endTime.value = printvaljs(windowObject.getEndTimeHours()) + ":" + printvaljs(windowObject.getEndTimeMins());
    endTime.name = "endTime";
    mainForm.appendChild(endTime);

    var dateInput = document.createElement("input");
    dateInput.type = "hidden";
    dateInput.value = printvaljs(windowObject.getYear()) + "-" + printvaljs(windowObject.getMonth()) + "-" + printvaljs(windowObject.getDate());
    dateInput.name = "dateInput";
    mainForm.appendChild(dateInput);
    
    //task category
    // var taskCategory = document.createElement("input");
    // taskCategory.type = "hidden";
    // taskCategory.value = windowObject.getTaskName();
    // taskCategory.name = "taskCategory";
    // mainForm.appendChild(taskCategory);
    // catFunction(taskCategory);//call function for change in colour of button
    
}

/*To add non-fixed task select icons*/
// function tempNonFixed() { //all 4 actions
//     var currentNode = document.getElementById("iconActions");
//     var newNode = document.createElement("div");
//     //Add ID and content
//     newNode.id = "iconActions";
//     newNode.innerHTML = 
//     '<button class="btn" onclick="clickPlay()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-play-circle fa-2x" aria-hidden="true"></i></button>' +
//     // '<button class="btn" onclick="clickReschedule()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-calendar fa-2x" aria-hidden="true"></i></button>' +
//     '<button class="btn" onclick="clickEdit()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i></button>' +
//     // '<button class="btn" onclick="clickDelete()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-trash-o fa-2x" aria-hidden="true"></i></button>' ;
//     //Replacing current iconsActions node w new iconActions node
//     currentNode.replaceWith(newNode);
// }

/*To add postit task select icons*/
// function postitActions(taskName) { //only edit and delete
//     //parameter taskName is to reference to which task got clicked in the javascript
//     var currentNode = document.getElementById("iconActions");
//     var newNode = document.createElement("div");
//     //Add ID and content
//     newNode.id = "iconActions";
//     newNode.innerHTML = 
//     '<button class="btn" onclick="clickEdit()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i></button>' +
//     '<button class="btn" onclick="clickDelete()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-trash-o fa-2x" aria-hidden="true"></i></button>' ;
//     //Replacing current iconsActions node w new iconActions node
//     currentNode.replaceWith(newNode);
// }

/*Open popup and close*/
function OpenPopupWindow() {   
    var url = "../add_daily_task.php"; 
    let myRef = window.open(url, 'mywin', 'left=20, top=20, width=770, height=700, toolbar=1, resizable=0');
    myRef.focus();
    // console.log('window opened!');
    myRef.onunload = function(){
  // DOM unloaded, so the window is likely closed.
    clearPostit();
    //printSchedule(generateSchedule());
    // Retrieve_Doc_WithID();
    // console.log('window closed!');
    }
}

// var onceOnly = true;
// function changeStatus() {
//     if (onceOnly) {
//         onceOnly = false;
//         Window.initialise(); //Strictly for testing purposes only
//     }
// }

/*UNCOMMENT WHEN LINKING TO JAVASCRIPT*/
// document.getElementsByClassName("division").onclick = function actions() {
//     //QUESTION HOW DO I CHECK IF IT IS A FIXED ONE TIME TASK OR A NON-FIXED ONE TIME TASK: ooo is it window type
//     //must double check all the inputs cause its not very accurate
   
//     if (task.type == 1) { //fixed task
//         createReschedule();
//         createEdit();
//         createDelete();
//     } else if (task.type == 2) {
//         createPlay();
//         createReschedule();
//         createEdit();
//         createDelete();
//     }
// }

//just to stand in for the window
// class storeTask {
//     constructor(
//         timeItem,
//         taskName
//     ) {
//         this.timeItem = timeItem;
//         this.taskName = taskName;
//     }
// }

// const task1 = new storeTask(
//     "22:30", //cannot just key as a number 22:30
//     "item1"
// )

// const task2 = new storeTask(
//     "12:30",
//     "item2"
// )

// const task3 = new storeTask(
//     "20:59",
//     "item3"
// )



// /*algorithm: where generation of schedule for algorithm is ran*/
// function algorithm() {
//     //link to algorithm which will output an array of the order of tasks which contains an array of objects that contains taskname and time
//     //algorithm carried out and array is created
//     var arrayOfTasks = [task1, task2, task3]; //man-made 
//     printSchedule(arrayOfTasks); //arrayOfTasks will contain the list of task objects in order
//     // clearPostit(); //to clear the list of items in post it

// document.getElementById("generateSchedule").addEventListener("click", algorithm);
// document.getElementById("generateSchedule").addEventListener("click", clearPostit);

/*--------------------------Appendix---------------------------------*/
/*create functions are for the icons*/
// function createPlay() {
//     let ele = document.getElementById("iconActions");
//     let btn1 = document.createElement("button");
//     btn1.setAttribute("class", "btn"); //id = "btn1"
//     btn1.setAttribute("onclick", "clickPlay()");
//     btn1.style.position="relative";
//     btn1.style.zIndex="5";
//     btn1.style.backgroundColor="#ECEDEA";
//     btn1.style.borderRadius="5px";
//     btn1.onmouseover = function() {
//         this.style.backgroundColor = "#C4C4C4";
//     }
//     btn1.onmouseout = function() {
//         this.style.backgroundColor = "#ECEDEA";
//     }
//     let play = document.createElement("i");
//     play.setAttribute("class", "fa fa-play-circle fa-2x");
//     play.setAttribute("aria-hidden", "true");
//     btn1.appendChild(play);
//     ele.appendChild(btn1);
// }

// function createReschedule() {
//     let ele = document.getElementById("iconActions");
//     let btn2 = document.createElement("button");
//     btn2.setAttribute("class", "btn"); //id = "btn2"
//     btn2.style.position="relative";
//     btn2.style.zIndex="5";
//     btn2.style.backgroundColor="#ECEDEA";
//     btn2.style.borderRadius="5px";
//     btn2.style.marginLeft="5px";
//     btn2.onmouseover = function() {
//         this.style.backgroundColor = "#C4C4C4";
//     }
//     btn2.onmouseout = function() {
//         this.style.backgroundColor = "#ECEDEA";
//     }
//     let reschedule = document.createElement("i");
//     reschedule.setAttribute("class","fa fa-calendar fa-2x");
//     reschedule.setAttribute("aria-hidden", "true");
//     btn2.appendChild(reschedule);
//     ele.appendChild(btn2);
// }

// function createEdit() {
//     let ele = document.getElementById("iconActions");
//     let btn3 = document.createElement("button");
//     btn3.setAttribute("class", "btn"); //id = "btn3"
//     btn3.style.position="relative";
//     btn3.style.zIndex="5";
//     btn3.style.backgroundColor="#ECEDEA";
//     btn3.style.borderRadius="5px";
//     btn3.style.marginLeft="5px";
//     btn3.onmouseover = function() {
//         this.style.backgroundColor = "#C4C4C4";
//     }
//     btn3.onmouseout = function() {
//         this.style.backgroundColor = "#ECEDEA";
//     }
//     let edit = document.createElement("i");
//     edit.setAttribute("class", "fa fa-pencil-square-o fa-2x");
//     edit.setAttribute("aria-hidden", "true");
//     btn3.appendChild(edit);
//     ele.appendChild(btn3);
// }

// function createDelete() {
//     let ele = document.getElementById("iconActions");
//     let btn4 = document.createElement("button");
//     btn4.setAttribute("class", "btn"); //id = "btn4"
//     btn4.style.position="relative";
//     btn4.style.zIndex="5";
//     btn4.style.backgroundColor="#ECEDEA";
//     btn4.style.borderRadius="5px";
//     btn4.style.marginLeft="5px";
//     btn4.onmouseover = function() {
//         this.style.backgroundColor = "#C4C4C4";
//     }
//     btn4.onmouseout = function() {
//         this.style.backgroundColor = "#ECEDEA";
//     }
//     let deletetask = document.createElement("i");
//     deletetask.setAttribute("class","fa fa-trash-o fa-2x");
//     deletetask.setAttribute("aria-hidden", "true");
//     btn4.appendChild(deletetask);
//     ele.appendChild(btn4);
// }

/*To remove the current icons under actions*/
// function removeCurrentIcons() {
//     var elem = document.getElementById("iconActions");
//     elem.remove();
//     // var ele = document.createElement("div");
//     // ele.setAttribute("id", "iconActions");
//     // var main = document.getElementById("actions");
//     // main.appendChild(ele);
// }

// function addBackDivision() {
//     var ele = document.createElement("div");
//     ele.setAttribute("id", "iconActions");
//     var main = document.getElementById("actions");
//     main.appendChild(ele);
// }
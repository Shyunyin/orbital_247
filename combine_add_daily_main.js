/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */

//initialise();

function myFunction() {
    document.getElementById("followUpTask").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.followUpBtn')) {
      var dropdowns = document.getElementsByClassName("followUp-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

/*CSS purpose: For selection of buttons to only happen once*/
let catNum = 0;
  function catFunction(button_switch){
    if (button_switch === 0) {
      document.getElementById("work").style.backgroundColor="white";
      document.getElementById("exercise").style.backgroundColor="#e3aba1";
      document.getElementById("misc").style.backgroundColor="#e3aba1";
    } else if (button_switch === 1) {
      document.getElementById("work").style.backgroundColor="#e3aba1";
      document.getElementById("exercise").style.backgroundColor="white";
      document.getElementById("misc").style.backgroundColor="#e3aba1";
    } else if (button_switch === 2) {
      document.getElementById("work").style.backgroundColor="#e3aba1";
      document.getElementById("exercise").style.backgroundColor="#e3aba1";
      document.getElementById("misc").style.backgroundColor="white";
    } else {
      document.getElementById("work").style.backgroundColor="#e3aba1";
      document.getElementById("exercise").style.backgroundColor="#e3aba1";
      document.getElementById("misc").style.backgroundColor="#e3aba1";
    }
    catNum = button_switch; //to cause category to follow the array number
  }

  let numOfSessions = 0; /*To use as multiplier for the hours calculated*/

/*CSS purpose: For selection of number of sessions to only 1*/
  function sessionsFunction(click_switch){
    if (click_switch === 1) {
      document.querySelector("body input#onesession").style.backgroundColor="white";
      document.querySelector("body input#twosessions").style.backgroundColor="#e3aba1";
      document.querySelector("body input#threesessions").style.backgroundColor="#e3aba1";
      numOfSessions = 1;
    } else if (click_switch === 2) {
      document.querySelector("body input#onesession").style.backgroundColor="#e3aba1";
      document.querySelector("body input#twosessions").style.backgroundColor="white";
      document.querySelector("body input#threesessions").style.backgroundColor="#e3aba1";
      numOfSessions = 2;
    } else if (click_switch === 3) {
      document.querySelector("body input#onesession").style.backgroundColor="#e3aba1";
      document.querySelector("body input#twosessions").style.backgroundColor="#e3aba1";
      document.querySelector("body input#threesessions").style.backgroundColor="white";
      numOfSessions = 3;
    } else {
      document.querySelector("body input#onesession").style.backgroundColor="#e3aba1";
      document.querySelector("body input#twosessions").style.backgroundColor="#e3aba1";
      document.querySelector("body input#threesessions").style.backgroundColor="#e3aba1";
    }
  }

  /*Calculation for number of hours min left -> Convert to MINUTES for calculation*/  
   var totalRemaining = 720; /*Arbitrary value, must link to formular for breaks and stuff in algorithm [IN MINUTES]*/ 

  function displayDuration(text) { /*This function works*/
    document.getElementById("counterOutput").innerHTML = text;
  }

  function initial() { /*This function is not working, nothing is printed. Function is defined*/
    let hours = (totalRemaining / 60);
    let minutes = totalRemaining - (hours * 60);
    let text = "Hour: " + hours + " " + "Minute: " + minutes;
    displayDuration(text); /*initial display*/
  }

  /*This function is to trigger the initial function when an option is selected*/
  // var checkTime = document.getElementById("timeTask");
  // var checkDuration = document.getElementById("durationTask");

  // function check() {
  //   if (checkTime.checked) {
  //     initial();
  //   }
  //   if (checkDuration.checked) {
  //     initial();
  //   }
  // }

  /*To calculate remaining hours and minute*/ /*FUNCTION IS NOT WORKING NOOOOO*/
  function calculationDuration() {
      let enterHour = parseInt((document.getElementById("hour").value)*numOfSessions); /*Number of hours entered*/
      let enterMin = parseInt((document.getElementById("minute").value)*numOfSessions); /*Number of minutes entered*/
      let totalToDeduct = enterMin + (enterHour*60); /*convert hour to minute*/
      let hoursLeft = Math.trunc((totalRemaining - totalToDeduct) / 60); /*Final number for hours*/ 
      let minutesLeft = (totalRemaining - totalToDeduct - (hoursLeft * 60)); /*Final number for minutes*/
      var text = "Hour: " + hoursLeft + " " + "Minute: " + minutesLeft;
      displayDuration(text);
  }

  /*Even though html input is in 12 hours format, it is saved as 24 hours format, use substr to extract*/
  /*Calculate everything in minutes first then split*/


  function calculationTime() {
    let start = document.getElementById("startTime").value
    let startHour = parseInt(start.substr(0,2));
    let startMin = parseInt(start.substr(3,4));
    let end = document.getElementById("endTime").value
    let endHour = parseInt(end.substr(0,2));
    let endMin = parseInt(end.substr(3,4));

    var totalToMinus;
    var finalHour;
    var finalMin;
    var text;

    if (startHour > endHour) { // for tasks that span across 2 days
      totalToMinus = ((24 - startHour) + endHour) * 60;
    } else {
      totalToMinus = (endHour - startHour) * 60; //contains minutes that needs to be deducted from totalRemaining
    }
    if (endMin < startMin) {
      totalToMinus = totalToMinus - (endMin - startMin); //in minutes (minus a negative to add)
    } else {
      totalToMinus = totalToMinus + (endMin - startMin);
    }
    finalHour = Math.trunc((totalRemaining - totalToMinus) / 60);
    finalMin = (totalRemaining - totalToMinus) - (finalHour * 60); 
    text = "Hour: " + finalHour + " " + "Minute: " + finalMin;
    
    displayDuration(text);
  }


/* To create a dynamic dropdown list: import from database*/
// let taskList = ["Test1", "Test2", "Test3"]; //this will be imported from where all tasks in the day are stored

// window.onload = function createDropdown() { //ensure that dropdown list loads once page is loaded up
//   for (let i=0; i < taskList.length; i++) {
//     let option = document.createElement("option");
//     option.value = taskList[i]; //add a value attribute
//     option.text = taskList[i];  
//     option.classList.add(taskList[i]); //add a class attribute
//     document.getElementById("dropdownList").append(option); //appending options to the select
//   }
// }

/*closeMe(): when submit button is pressed, window will be closed*/
// function closeMe() {
//   try {
//     window.close();
//   } catch (e) { console.log(e) }
//   try {
//     self.close();
//   } catch (e) { console.log(e) }
// }
//TEMPORARILY DISABLED STILL WANTED!!! ADD BACK TO ID DONE

/*Functions fired when done button is clicked*/
// function frontEndSubmit(){
//   window.alert("Daily task has been successfully saved! Please press the X button to close the window!");
// }

// var submit = document.getElementById("done");


/*Integrating with javascript. Adding to Non fixed Task and Fixed Task*/
var onceOnly = true; //For testing only
function check() {
  // For testing only. The initialise function is just supposed to be called once upon registering a user
  if (onceOnly) {
    onceOnly = false;
    Window.initialise(); //Strictly for testing purposes only
  }
  console.log("I enter the check() function");
  var cat = document.getElementsByName("select");
  let time = document.getElementById("dateInput").value;
  let year = parseInt(time.substr(0, 4));
  let month = parseInt(time.substr(5, 7)) - 1;
  let date = parseInt(time.substr(8, 10));
  //var time = new Date();
  let start = document.getElementById("startTime").value;
  let end = document.getElementById("endTime").value;

  let startTime = new Time( //create new time object for start time in Window and individual mode objects
    parseInt(start.substr(0, 2)),
    parseInt(start.substr(3, 4))
  );

  let endTime = new Time( //create new time object for end time in Window and individual mode objects
    parseInt(end.substr(0, 2)),
    parseInt(end.substr(3, 4))
  );

  let hourDuration = parseInt(document.getElementById("hour").value); //get number
  let minDuration = parseInt(document.getElementById("minute").value); //get number
  if (document.getElementById("durationTask").checked == true) {
    var Task = new NonFixedTask(
      document.getElementById("taskName").value,
      catNum, //category number
      year,
      month,
      date,
      //time.getMonth(), //month from 0-11
      //time.getDate(),
      numOfSessions, //number for number of sessions
      [hourDuration, minDuration], //not very sure about format!! currently both variables are numbers
      null // For testing purposes
      //document.getElementById("dropdownList").value //gives a string, will be empty if it is not a follow up task
    )
    Task.addTask();
  }  else {
    console.log("I come to add_daily_task.js");
    var Task = new FixedTask (
      document.getElementById("taskName").value,
      catNum, //category number
      year,
      month,
      date,
      //time.getFullYear(), //full year
      //time.getMonth(), //month from 0-11
      //time.getDate(),
      startTime,
      endTime
    )
    Task.scheduleTask();
  }
}

// function addContent(i) {
//   const followUp = document.getElementById("followUp");
//   if (i === 0) {
//     followUp.removeAttribute("hidden");
//   } 
//   if (i === 1) {
//     followUp.setAttribute("hidden");
//     followUp.removeAttribute("hidden");
//   }
// }

function showOptions(value, btn) {
  if (value=="timeOptions"){
    document.getElementById("timeOptions").style.display = "block";
    document.getElementById("durationOptions").style.display = "none";
    // document.getElementsByClassName("durationOption").style.display = "none";
    // document.getElementById("hour").style.display = "none";
    // document.getElementById("minute").style.display = "none";
    // document.getElementById("sessions").style.display = "none";
    // document.getElementsByClassName("numSessions").style.display = "none";
    // document.getElementById("doneDurationBtn").style.display = "none";
    
  } else if (value=="durationOptions"){
    document.getElementById("durationOptions").style.display = "block";
    document.getElementById("timeOptions").style.display = "none";
    // document.getElementsByClassName("startTime").style.display = "none";
    // document.getElementsByClassName("endTime").style.display = "none";
    // document.getElementById("startTime").style.display = "none";
    // document.getElementById("endTime").style.display = "none";
    // document.getElementById("doneTimeBtn").style.display = "none";

  }
}

function showList(value, btn) {
  if (value=='A'){
    document.getElementById("A").style.display = "block";
    document.getElementById("B").style.display = "none";
  }
  else if (value=='B'){
    document.getElementById("B").style.display = "block";
    document.getElementById("A").style.display = "none";
  }
}


/*Get to other main webpages
 * To be changed if link changes
 */
function statistics() {
    window.location.href = "http://127.0.0.1:5501/statistics.html";
}
function routine() {
    window.location.href = "http://127.0.0.1:5501/routine.html";
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

    let user = "Preshi & Shyun" //need to obtain from javascript login page to save their username!
    let welcome = "Welcome, " + user;
    let currentUser = document.getElementById("currentUser");
    currentUser.setAttribute("value", welcome);

    let day = textDay(today.getDay()) + ", " + wholeDate(today.getDate()) + " " + textMonth(today.getMonth()) + "'s Schedule";
    let currentSchedule = document.getElementById("currentSchedule");
    currentSchedule.setAttribute("value", day);

    //Window.initialise();
    //initialise();
    Retrieve_Doc_WithID(); //to call the function to read all the daily tasks to list in post-it
} 
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
    var url = "http://127.0.0.1:5501/countdownTimer.html";
    let myRef = window.open(url, 'mywin', 'left=20, top=20, width=750, height=700, toolbar=1, resizable=0');
    myRef.focus();
}
/*reschedule button*/
function clickReschedule() {
    var url = "http://127.0.0.1:5501/rescheduleIcon.html";
    let myRef = window.open(url, 'mywin', 'left=20, top=20, width=700, height=300, toolbar=1, resizable=0');
    myRef.focus();

}
/*edit button*/
function clickEdit() {
    var url = "http://127.0.0.1:5501/EditIcon.html";
    let myRef = window.open(url, 'mywin', 'left=20, top=20, width=700, height=300, toolbar=1, resizable=0');
    myRef.focus();
}
/*delete button*/
function clickDelete() {
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
        console.log(Window.emptyCollection[0]);
        console.log(Window.occupiedCollection[0]);
        var scheduleArr = Scheduling.generateSchedule(Window.emptyCollection[0], Window.occupiedCollection[0], Window.nonFixedCollection[0][0], Window.nonFixedCollection[0][1]); //Testing with only today's schedule

        console.log(Window.occupiedCollection[0]);
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
    itemTime.value = scheduleArr[i].getStartTimeHours() + ":" + scheduleArr[i].getStartTimeMins() + "-" + scheduleArr[i].getEndTimeHours() + ":" + scheduleArr[i].getEndTimeMins();
    itemTime.style.fontFamily = "'Signika Negative', sans-serif";
    itemTime.style.fontSize = "large";
    itemTime.style.position = "relative";
    itemTime.style.zIndex = "3";
    itemTime.style.backgroundColor = "#96d6ed";
    itemTime.style.float="left";
    itemTime.style.border="none";
    itemTime.style.marginTop = "10px";
    itemTime.style.marginLeft = "10px";
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
    itemName.style.marginTop="-40px";
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

/*To add fixed task select icons*/
function tempFixed() { //only reschedule, edit and delete
    var currentNode = document.getElementById("iconActions");
    var newNode = document.createElement("div");
    newNode.id = "iconActions";
    newNode.innerHTML = 
    '<button class="btn" onclick="clickPlay()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-play-circle fa-2x" aria-hidden="true"></i></button>' +
    '<button class="btn" onclick="clickReschedule()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-calendar fa-2x" aria-hidden="true"></i></button>' +
    '<button class="btn" onclick="clickEdit()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i></button>' +
    '<button class="btn" onclick="clickDelete()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-trash-o fa-2x" aria-hidden="true"></i></button>' ;
    //Replacing current iconsActions node w new iconActions node
    currentNode.replaceWith(newNode);
}

/*To add non-fixed task select icons*/
function tempNonFixed() { //all 4 actions
    var currentNode = document.getElementById("iconActions");
    var newNode = document.createElement("div");
    //Add ID and content
    newNode.id = "iconActions";
    newNode.innerHTML = 
    '<button class="btn" onclick="clickPlay()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-play-circle fa-2x" aria-hidden="true"></i></button>' +
    '<button class="btn" onclick="clickReschedule()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-calendar fa-2x" aria-hidden="true"></i></button>' +
    '<button class="btn" onclick="clickEdit()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i></button>' +
    '<button class="btn" onclick="clickDelete()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-trash-o fa-2x" aria-hidden="true"></i></button>' ;
    //Replacing current iconsActions node w new iconActions node
    currentNode.replaceWith(newNode);
}

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
    var url = "http://127.0.0.1:5501/add_daily_task.html"; 
    let myRef = window.open(url, 'mywin', 'left=20, top=20, width=770, height=700, toolbar=1, resizable=0');
    myRef.focus();
    // console.log('window opened!');
    myRef.onunload = function(){
  // DOM unloaded, so the window is likely closed.
    clearPostit();
    Retrieve_Doc_WithID();
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
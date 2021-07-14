/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */

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


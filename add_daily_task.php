<?php
    session_start();
    include "./includes/add_daily_task.inc.php";
    // include "../includes/insertWindow_helper.inc.php";
?>

<!DOCTYPE html>
<html>

  <head>
    <title>Add daily task</title>
    <!--<script type = "text/javascript" type="module" src="main_schedule.js"></script>-->
    <script type = "text/javascript" type="module" src="add_daily_task.js"></script>
    <!--<script type = "text/javascript" type="module" src="combine_add_daily_main.js"></script>-->
    <script type = "text/javascript" type="module" src="Time.js"></script>
    <script type = "text/javascript" type="module" src="OneTimeTasks_Final.js"></script>
    <script type = "text/javascript" type="module" src="Window.js"></script>
    <!--<script type = "text/javascript" type="module" src="main_schedule.js"></script>-->
    <!--<script type = "text/javascript" type="module" src="initialise.js"></script>-->
    <!--<script type = "text/javascript" type="module" src="CombinedTime_Final.js"></script>-->
    <link rel="stylesheet" href="add_daily_task.css" />
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Signika+Negative:wght@600&display=swap" rel="stylesheet">
    <!--To allow for resizing according to screens-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  
  <body style="background-color: #f6f7f1; margin: 50px; border: 5px; border-color: #C4C4C4;">
  <form action="includes/add_daily_task.inc.php" method="POST" id="bigForm">
  <!--<form onsubmit="return addTask();" action="add_daily_task.php" id="bigForm">-->
    <!-- Parent-child relationship for inline-->
    <fieldset id="myFieldset">
      <div id="title">
        <li><h3>Add a task:</h3></li>
        <!-- INPUT for taskName-->
        <li>
            <input type="text" id="taskName" name="taskName" size="70" oninput="Update(this.value, 'name')"><br>
        </li>
      </div>
  
      <!-- Parent-child relationship for inline-->
      <div id="categories">
        <li><h3>Category:</h3></li>
        <!-- Buttons for categories-->
        <li>
            <input type="button" id="work" onclick="catFunction(0); Update(0,'work');" value="Work"></button>
            <input type="button" id="exercise" onclick="catFunction(1); Update(1,'exercise');" value="Exercise"></button>
            <input type="button" id="misc" onclick="catFunction(2); Update(2,'misc');" value="Miscellaneous"></button>
        </li>
      </div>
      
      <!--For INPUT DROPDOWN date-->
      <!--Find a shorter way for numerical drop downs and how to link to javascript-->
      <div id="date">
        <li><h3>Date:</h3></li>
        <li><input id="dateInput" type="date" name="taskDate" oninput="Update(this.value,'datein')"></li>
      </div>
  
      <!-- Checkboxes for either TIME task or DURATION task-->
      <!-- Make checkboxes either or, have the same name to be in the same group, have diff values to make distinct--> 
      <nav>
        <element id="selectTime">
          <input type="radio" id="timeTask" name="select" value="time" checked="checked" onchange="showOptions('timeOptions', this);reinitialise()"> 
          <label for="timeTask" style="font-size:large;font-family:Signika Negative, sans-serif;">Time</label><br>
        </element>
        <element id="or">
          <h3>OR</h3>
        </element>
        <element id="selectDuration">
          <input type="radio" id="durationTask" name="select" value="duration" onchange="showOptions('durationOptions', this);reinitialise()">
          <label for="durationTask" style="font-size:large;font-family:Signika Negative, sans-serif;">Duration (per session)</label><br>
        </element>
      </nav>
  
      <!--Time options-->
      <div id="timeOptions">
        <div class="startTime">
          <h3>Start time:</h3>
          <input type="time" id="startTime" name="startTime" oninput="Update(this.value, 'start')">
        </div>
        <div class="endTime">
        <h3>End time:</h3>
          <input type="time" id="endTime" name="endTime" oninput="Update(this.value, 'end')">
        </div>
        <input type="button" id="doneTimeBtn" value="Done!" onclick="calculationTime()">
      </div>
  
      <!--Duration options-->
      <div id = "durationOptions" style="display: none">
        <!--<form class="durationOption">-->
        <div class="durationOption">
          <input type="number" id="hour" name="hour" min="0" max="3" oninput="Update(this.value, 'hour')"> <!--I set max to 3 hours for health?-->
          <label for="hour">hr</label>
          <input type="number" id="minute" name="minute" min="0" max="59" oninput="Update(this.value, 'min')">
          <label for="minute">min</label>
        <!-- Number of sessions -->
          <div id="sessions">
            <h3>Number of Sessions:</h3>
          </div>
          <!--<form class="numSessions">-->
            <input type="button" id="onesession" onclick="sessionsFunction(1); Update(1,'one');" value="x1"></button>
            <input type="button" id="twosessions" onclick="sessionsFunction(2);Update(2,'two');" value="x2"></button>
            <input type="button" id="threesessions" onclick="sessionsFunction(3);Update(3,'three');" value="x3"></button>
        <!--</form>-->
        </div>
        <input type="button" id="doneDurationBtn" value="Done!" onclick="calculationDuration()">
      </div>
    
  
      <!-- Create box for counter with CALCULATIONS of time left that can be planned-->
      <!-- QUESTION: idk how to include javascript element into html isit ${}?-->
      <div id="counter">
        <p>Remaining</p>
        <p id="counterOutput"></p>
      </div>
  
  
      <!-- For follow up task-->
      <div class="followTask">
        <br>
          <li><h3>Is this task followed by another task?</h3></li>
          <li><input type="radio" id="yes" name="check" value="A" onchange="showList('A', this); return false;" onclick="RetrieveWithID()">
            <label class="yes" for="yes">Yes</label></li>
          <li><input type="radio" id="no" name="check" checked="checked" value="B" onchange="showList('B', this); return false;">
            <label class="no" for="no">No</label><br></li>
        </br>
  
        <!--Code for dropdown menu linked to javascript, database of other tasknames-->
        <div id="A" style="display:none">
          <!--Container to contain the dynamically added elements-->
          <div>
            <select id="dropdownList" oninput="Update(this.value, 'followname')">
              <option value="" selected disabled hidden>Select a task</option>
            </select>
          </div>
          <h4 id="sequence">(Selected task will be scheduled after the created task)</h4>
        </div>
      
        <div id="B" style="display:none">
      </div>

  
      <!--Buttons for DELETE, ADD, DONE-->
      <div class="btn-group-actions">
        <li><input type="button" id="delete" value="Delete task" onclick="DeleteTask()"></li>
        <!-- <li><button id="add" >Add another task</button></li> -->
        <!--<li><input type="button" id="done" value="Submit" onclick="frontEndSubmit();check()"></li>-->
        <li><button type="submit" id="done" name="done">Submit</button></li>
        <!--<li><input type="button" id="done" value="Submit" onclick="Window.testFunction();frontEndSubmit();"></li>-->
      </div>

    </fieldset>
  </form>
    <script>
        var ele = document.getElementById("bigForm");
        // var ele1= "document.getElementById("bigForm")";
        // var anotherEle = document.createElement("input");
        // anotherEle.type = "hidden";
        // anotherEle.value = ele1;
        // anotherEle.name = "anotherEle";
        // ele.appendChild(anotherEle);
        //------------------Defining of variables------------------//

        /*For referencing later on*/
        let NameOfTask = document.getElementById("taskName"); 
        //category number can get from cat_num in the other javascript file
        let Start = document.getElementById("startTime");
        // let StartArr = [parseInt(Start.value.substr(0, 2)), parseInt(Start.value.substr(3, 4))]; //main array for start time
        let End = document.getElementById("endTime"); 
        // let EndArr = [parseInt(End.value.substr(0, 2)), parseInt(End.value.substr(3, 4))]; //main array for end time
        let DateInput = document.getElementById("dateInput");
        let FollowUpTask = document.getElementById("dropdownList"); //value to get taskname
        let Sequence = document.getElementById("sequence"); //value to get sequence
        let Hour = document.getElementById("hour");
        let Minute = document.getElementById("minute");
        //numSessions can be gotten from numOfSessions in the other javascript file
        
        let nameOfTask = NameOfTask.value;
        let categoryNum = catNum; //variable from other file
        let start = Start.value;
        let startArr = [parseInt(start.substr(0, 2)), parseInt(start.substr(3, 4))];
        let end = End.value;
        let endArr = [parseInt(end.substr(0, 2)), parseInt(end.substr(3, 4))];
        let dateInput = DateInput.value;
        let followUpTask = FollowUpTask.value;
        let sequence = Sequence.value;
        let hour = Hour.value;
        let minute = Minute.value;
        let numSessions = numOfSessions; //variable from other file
        // let nameOfTask, categoryNum, start, startArr, end, endArr, dateInput, followUpTask, sequence, hour, minute;
        var dateNumber = 0;
 
        function Update(val, type) {
          //var ele = document.getElementById("bigForm");
          if (type=='name') {
            nameOfTask=val;
          } else if (type=='datein'){
            dateInput=val;
            
            var jsYear = document.createElement("input");
            jsYear.type = "hidden";
            jsYear.value = dateInput.substring(0, 4);
            jsYear.name = "jsYear";
            ele.appendChild(jsYear);

            var jsMonth = document.createElement("input");
            jsMonth.type = "hidden";
            jsMonth.value = dateInput.substring(5, 7);
            jsMonth.name = "jsMonth";
            ele.appendChild(jsMonth);

            var jsDate = document.createElement("input");
            jsDate.type = "hidden";
            jsDate.value = dateInput.substring(8, 10);
            jsDate.name = "jsDate";
            ele.appendChild(jsDate);
            //insert formula to get number after dateInput is changed
          } else if (type=='start'){
            start=val;
            startArr = [parseInt(start.substr(0, 2)), parseInt(start.substr(3, 4))];

            var jsStartHour = document.createElement("input");
            jsStartHour.type = "hidden";
            jsStartHour.value = startArr[0];
            jsStartHour.name = "jsStartHour";
            ele.appendChild(jsStartHour);

            var jsStartMin = document.createElement("input");
            jsStartMin.type = "hidden";
            jsStartMin.value = startArr[1];
            jsStartMin.name = "jsStartMin";
            ele.appendChild(jsStartMin);

          } else if (type=='end'){
            end=val;
            endArr = [parseInt(end.substr(0, 2)), parseInt(end.substr(3, 4))];

            var jsEndHour = document.createElement("input");
            jsEndHour.type = "hidden";
            jsEndHour.value = endArr[0];
            jsEndHour.name = "jsEndHour";
            ele.appendChild(jsEndHour);

            var jsEndMin = document.createElement("input");
            jsEndMin.type = "hidden";
            jsEndMin.value = endArr[1];
            jsEndMin.name = "jsEndMin";
            ele.appendChild(jsEndMin);

          } else if (type=='followname'){
            followUpTask=val;

            var jsFollowUp = document.createElement("input");
            jsFollowUp.type = "hidden";
            jsFollowUp.value = followUpTask;
            jsFollowUp.name = "jsFollowUp";
            ele.appendChild(jsFollowUp);

          } else if (type=='followseq'){
            sequence=val;
            
            // Still need this?

          } else if (type=='hour'){
            hour=val;

            var jsHour = document.createElement("input");
            jsHour.type = "hidden";
            jsHour.value = hour;
            jsHour.name = "jsHour";
            ele.appendChild(jsHour);

          } else if (type=='min'){
            minute=val;

            var jsMin = document.createElement("input");
            jsMin.type = "hidden";
            jsMin.value = minute;
            jsMin.name = "jsMin";
            ele.appendChild(jsMin);

          } else if (type=='work'){
            categoryNum=val;

            var jsCat = document.createElement("input");
            jsCat.type = "hidden";
            jsCat.value = categoryNum;
            jsCat.name = "jsCat";
            ele.appendChild(jsCat);

          } else if (type=='exercise'){
            categoryNum=val;

            var jsCat = document.createElement("input");
            jsCat.type = "hidden";
            jsCat.value = categoryNum;
            jsCat.name = "jsCat";
            ele.appendChild(jsCat);

          } else if (type=='misc'){
            categoryNum=val;

            var jsCat = document.createElement("input");
            jsCat.type = "hidden";
            jsCat.value = categoryNum;
            jsCat.name = "jsCat";
            ele.appendChild(jsCat);

          } else if (type=='one'){
            numSessions=val;

            var jsNum = document.createElement("input");
            jsNum.type = "hidden";
            jsNum.value = numSessions;
            jsNum.name = "jsNum";
            ele.appendChild(jsNum);

          } else if (type=='two'){
            numSessions=val;

            var jsNum = document.createElement("input");
            jsNum.type = "hidden";
            jsNum.value = numSessions;
            jsNum.name = "jsNum";
            ele.appendChild(jsNum);

          } else if (type=='three'){
            numSessions=val;

            var jsNum = document.createElement("input");
            jsNum.type = "hidden";
            jsNum.value = numSessions;
            jsNum.name = "jsNum";
            ele.appendChild(jsNum);

          }
        }

        /*function check(): to get document category*/
        function checked() {
         if (document.getElementById("durationTask").checked == true) {
            return "Non-fixed";
          } else { //if the duration radio button is not clicked
            return "Fixed";
          }
        }
        var typeCheck = checked();

        //--------------------- Writing relevant functions ------------------//

        //--------------------- Retrieving relavant information from database ------------------//

        /*Function to get current date in format*/
        function frontEndSubmit() { 
          //Add_Doc_WithID();
          //console.log("Task has been added");
          alert("Daily task has been successfully saved! Please press the X button to close the window!");
          var myFieldset = document.getElementById("myFieldset");
          myFieldset.disabled = true;
          //update_totalRemaining_toDB(); //to update database
        }

        function formatDate() {
          var today = new Date();
          year = today.getFullYear();
          month = '' + (today.getMonth() + 1);
          day = '' + today.getDate();
          if (month.length < 2)
            month = '0' + month;
          if (day.length < 2) 
            day = '0' + day;

          return [year, month, day].join('-');
        }
        
        /*Create an option in the dropdown list*/
        function createDropdown(name) { //ensure that dropdown list loads once page is loaded up
          namespace = name.replace(/ /g,"_");
          let option = document.createElement("option");
          option.value = name; //add a value attribute
          option.text = name;  
          option.classList.add(namespace); //add a class attribute the class of the taskname is just task underscore
          document.getElementById("dropdownList").append(option); //appending options to the select
        }

        /*Retrieving remaining time after calculations: 24*60min - 8*60min for sleep - (min time for routine tasks)*/
        /*Do by retrieving from database?*/
        // var totalRemaining = 720; /*Arbitrary value, must link to formular for breaks and stuff in algorithm [IN MINUTES]*/ 
        /*1) Maybe can get an array of total minutes in a loop for the 7 days so that it will be easier?*/
        /*2) Also need to find a way to update the arrays*/
        var totalRemainingArr = [720, 720, 720, 720, 720, 720, 720]; 

        /*SetupCounter() updates database with the remaining counter timings for a collection of 7 days*/
        
        // function SetupCounter() { 
        //   for (let i = 0; i < totalRemainingArr.length; i++) {
        //     cloudDB.collection("allArrays").doc("counter").collection(i.toString()).doc(i.toString()).update(
        //     {
        //       totalTime : Number(totalRemainingArr[i])
        //     }).then(function() {
        //       console.log("Counter array is created");
        //       console.log(totalRemainingArr[i]);
        //     }).catch(function(error){
        //       console.log("Error filling up counter");
        //     });
        //   } 
        // }
    
        // window.onload = function get_DateNumber() {
        //   cloudDB.collection("allArrays").doc("counter").collection(dateNumber.toString()).doc(dateNumber.toString())
        //   .get()
        //   .then((doc) => {
        //     if (doc.exists) {
        //       var totalRemaining = doc.data().totalTime;
        //       console.log("Document data exists", totalRemaining);
        //       initial(totalRemaining);
        //     } else {
        //       console.log("No such document!");
        //     }
        //   }).catch((error) => {
        //     console.log("Error getting document", error);
        //   })
        
        // }


  /*displayDuration(): to display out font-end counter timing*/      
  function displayDuration(text) { /*This function works*/
    document.getElementById("counterOutput").innerHTML = text;
  }

  var totalRemaining; // so that totalRemaining wont be undefined for calculationDuration and calculationTime

  function initial(x) { /*Loads when webpage is loaded*/
    // console.log("initial() is called"); //debug
    totalRemaining = x;
    let hours = (x / 60);
    let minutes = x- (hours * 60);
    let text = "Hour: " + hours + " " + "Minute: " + minutes;
    displayDuration(text); /*initial display*/  
  }

  /*reinitialise(): called whenever there is a changed in radio button being clicked*/
  function reinitialise() {
    initial(totalRemaining);
  }

  var finalDBMin; //used to get final minutes left to update the database after add daily task is submitted

/*To calculate remaining hours and minute*/ /*FUNCTION IS NOT WORKING NOOOOO*/
function calculationDuration() {
    let enterHour = parseInt((document.getElementById("hour").value)*numOfSessions); /*Number of hours entered*/
    let enterMin = parseInt((document.getElementById("minute").value)*numOfSessions); /*Number of minutes entered*/
    let totalToDeduct = enterMin + (enterHour*60); /*convert hour to minute*/
    let hoursLeft = Math.trunc((totalRemaining - totalToDeduct) / 60); /*Final number for hours*/ 
    let minutesLeft = (totalRemaining - totalToDeduct - (hoursLeft * 60)); /*Final number for minutes*/
    var text = "Hour: " + hoursLeft + " " + "Minute: " + minutesLeft;
    displayDuration(text);

    finalDBMin=totalRemaining - totalToDeduct;
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

  finalDBMin = totalRemaining - totalToMinus;
}

// function scheduleTask() {
//     console.log("I come to addTask() function");
//     let newWin = new Window(nameOfTask, parseInt(dateInput.substr(0, 4)), parseInt(dateInput.substr(5, 7)) - 1, parseInt(dateInput.substr(8, 10)), new Time(startArr[0], startArr[1]), new Time(endArr[0], endArr[1]), 1);

//     insertWindowHelper(newWin);
//     //ele.submit();
// }

// function update_totalRemaining_toDB() {
//   cloudDB.collection("allArrays").doc("counter").collection(dateNumber.toString()).doc(dateNumber.toString()).update(
//     {
//       totalTime : Number(finalDBMin)
//     }).then(function() {
//         console.log("New minutes left is updated");
//     }).catch(function(error){
//         console.log("Error updating final minutes");
//     });
//   } 
    </script>
   </body>
</html>
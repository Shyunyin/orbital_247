<?php
  session_start();
?>
<!DOCTYPE html>
<html>
  <head>
    <title>Edit daily task</title>
    <script type = "text/javascript" type="module" src="add_daily_task.js"></script>
    <script type = "text/javascript" type="module" src="OneTimeTasks_Final.js"></script>
  <!--
    <script type = "module">
      import {OneTimeTask} from './OneTimeTasks/OneTimeTask.js';
      import {NonFixedTask} from './OneTimeTasks/NonFixedTask.js';
      import {FixedTask} from './OneTimeTasks/FixedTask.js';
    </script>
  -->
    <!-- <link rel="stylesheet" href="add_daily_task.css" /> -->
    <link rel="stylesheet" href="copy_add_daily_task.css?v=<?php echo time();?>">

    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Signika+Negative:wght@600&display=swap" rel="stylesheet">
    <!--To allow for resizing according to screens-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  
  <body style="background-color: #f6f7f1; margin: 50px; border: 5px; border-color: #C4C4C4;">
  <form action="includes/add_daily_task.inc.php" method="POST" id="bigForm">
    <!--Importing Firebase and Cloud Firestore libraries-->
    <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-firestore.js"></script>

    <!-- Parent-child relationship for inline-->
    <fieldset id="myFieldset">
      <div id="title">
        <li><h3>Add a task:</h3></li>
      <!-- INPUT for taskName-->
      <li><form>
          <input type="text" id="taskName" name="taskName" size="70"><br>
      </form></li>
      </div>
  
      <!-- Parent-child relationship for inline-->
      <div id="categories">
          <li><h3>Category:</h3></li>
      <!-- Buttons for categories-->
      <li><div class="btn-group-category">
          <input type="button" id="work" onclick="catFunction(0);" value="Work"></button>
          <input type="button" id="exercise" onclick="catFunction(1);" value="Exercise"></button>
          <input type="button" id="misc" onclick="catFunction(2);" value="Miscellaneous"></button>
      </div></li>
    </div>
      
      <!--For INPUT DROPDOWN date-->
      <!--Find a shorter way for numerical drop downs and how to link to javascript-->
      <div id="date">
        <li><h3>Date:</h3></li>
        <li><input id="dateInput" type="date" style="background-color: #96d6ed"></li>
      </div>

      <element id="selectTime">     
        <h3>Time:</h3>
      </element> 
  
      <!--Time options-->
      <div id="timeOptions">
        <div class="startTime">
          <h3>Start time:</h3>
          <input type="time" id="startTime" name="startTime">
        </div>
        <div class="endTime">
        <h3>End time:</h3>
          <input type="time" id="endTime" name="endTime">
        </div>
        <input type="button" id="doneTimeBtn" value="Done!" onclick="calculationTime()">
      </div>
      
      <!-- Create box for counter with CALCULATIONS of time left that can be planned-->
      <!-- QUESTION: idk how to include javascript element into html isit ${}?-->
      <div id="counter">
        <p>Remaining</p>
        <p id="counterOutput"></p>
</div>  
 

    <!--Buttons for DELETE, ADD, DONE-->
    <div class="btn-group-actions">
      <li><input type="button" id="delete" value="Delete task" onclick="DeleteTask()"></li>
      <!-- <li><button id="add" >Add another task</button></li> -->
      <li><input type="button" id="done" value="Submit" onclick="frontEndSubmit()"></li>
    </div>
  </fieldset>
</form>

    <script>
        //------------------Using retrieving function to fill up inputs------------------//
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
        
        var nameoftask; //global variable

        window.onload = function () {
          //getting the nameoftask from local storage
        nameoftask = localStorage.getItem("taskname");
        // console.log(nameoftask + " is gotten from local storage!") //used for debugging to check if local storage works
        Retrieve_Database_Info(nameoftask); //debugging: working
        }        

        var taskPlusName, categoryNum, startArr, endArr, startTime, endTime, dateInput, followTask, followSequence, hour, minute, numSessions;
        
    
        function Retrieve_Database_Info(nameoftask){ //pass in the taskname to retrieve the info to fill up the form
          //retrieving values from php database from taskname and id
          <?php

          ?>
            // console.log("Retrieve data to fill up form");
            console.log(nameoftask + " is in retrieve database info!")

              /*For the setting of values to fill in the fields*/
              document.getElementById("taskName").value = taskPlusName; 
              document.getElementById("startTime").value = startTime;
              document.getElementById("endTime").value = endTime; 
              document.getElementById("dateInput").value = dateInput;
              var option = document.createElement("option"); //For dropdown list
              option.classList.add("selectedTask");
              option.value=followTask;
              option.setAttribute("selected", "selected");
              var dropdown = document.getElementById("dropdownList");
              dropdown.appendChild(option); 
              var ele = document.createElement("option"); //For sequence
              ele.classList.add("seq");
              ele.value=followSequence;
              ele.setAttribute("selected", "selected");
              var parent = document.getElementById("sequence");
              parent.prepend(ele);
              document.getElementById("hour").value = hour;
              document.getElementById("minute").value = minute;
              console.log(taskPlusName +", " +categoryNum+", "+startTime+", "+endTime+", "+dateInput+", "+followTask+", "+followSequence+", "+hour+", "+minute+", "+numSessions);
        } 

    </script>
   </body>
</html>
<?php
  session_start();
  $serverName = "localhost";
  $dBUsername = "root";
  $dBPassword = "";
  $dBName = "orbital247";
  $conn = mysqli_connect($serverName, $dBUsername, $dBPassword, $dBName);
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

<form action="" method="POST" id="hidden">
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

        window.onload = function () {
        var startHour = localStorage.getItem("startTimeHour"); //global js variable to store the task name
        var startMin = localStorage.getItem("startTimeMin"); //global js variable to store the task name
        /*Transferring of javascript variable to php*/
        var main = document.getElementById("hidden");

        var hourPhp = document.createElement("input");
        hourPhp.type = "hidden";
        hourPhp.value = startHour;
        hourPhp.name = "hourPhp";
        main.appendChild(hourPhp);

        var minPhp = document.createElement("input");
        minPhp.type = "hidden";
        minPhp.value = startMin;
        minPhp.name = "minPhp";
        main.appendChild(minPhp);

        document.getElementById("hidden").submit(); //to submit the form to retrieve previous data
        // console.log(nameoftask + " is gotten from local storage!") //used for debugging to check if local storage works
        Retrieve_Database_Info(); //debugging: working
        }        

        var taskName, taskCategory, taskYear, taskMonth, taskDate, startTimeHour, startTimeMin, endTimeHour, endTimeMin; //global variables for inputting into html
      
        function printvaljs(i){
          if (i < 10) {
              return "0" + i;
          } else {
              return i;
          }
      }
    
        function Retrieve_Database_Info(){ //pass in the taskname to retrieve the info to fill up the form
          //retrieving values from php database from taskname and id
          <?php
            $userid = $_SESSION['userid'];
            $hourPhp = $_POST['hourPhp'];
            $minPhp = $_POST['minPhp'];
            $query = "SELECT * FROM fixedtaskwindow WHERE userid=$userid AND startTimeHour=$hourPhp AND startTimeMin=$minPhp;";
            $result = mysqli_query($conn,$query);
            if(!$result) {
              echo "Could not run query:" . mysqli_error($conn);
              exit();
            } else {
              foreach($result as $row) {
                $taskName = $row["taskName"];
                $taskCategory = $row["taskCategory"];
                $taskYear = $row["taskYear"];
                $taskMonth = $row["taskMonth"];
                $taskDate = $row["taskDate"];
                $startTimeHour = $row["StartTimeHour"];
                $startTimeMin = $row["StartTimeMin"];
                $endTimeHour = $row["endTimeHour"];
                $endTimeMin = $row["endTimeMin"];
                echo "taskName = '$taskName';";
                echo "taskCategory = $taskCategory;";
                echo "taskYear = $taskYear;";
                echo "taskMonth = $taskMonth;";
                echo "taskDate = $taskDate;";
                echo "startTimeHour = $startTimeHour;";
                echo "startTimeMin = $startTimeMin;";
                echo "endTimeHour = $endTimeHour;";
                echo "endTimeMin = $endTimeMin;";
              }
            }
            //$row = mysqli_fetch_row($result);          
          ?>
            // console.log("Retrieve data to fill up form");
            console.log(nameoftask + " is in retrieve database info!");

              /*For the setting of values to fill in the fields*/
              document.getElementById("taskName").value = taskName; 
              catFunction(taskCategory);//call function for change in colour of button
              document.getElementById("startTime").value = printvaljs(startTimeHour) + ":" + printvaljs(startTimeMin);
              document.getElementById("endTime").value = printvaljs(endTimeHour) + ":" + printvaljs(endTimeMin);
              document.getElementById("dateInput").value = printvaljs(taskYear) + "-" + printvaljs(taskMonth) + "-" + printvaljs(taskDate);
              console.log(taskName);
        } 

    </script>
   </body>
</html>
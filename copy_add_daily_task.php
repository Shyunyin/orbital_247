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

  <form action="includes/editing_daily_task.inc.php" method="POST" id="bigForm">
  <script>
    var mainForm = document.getElementById("bigForm");
    var oldStartHour, oldStartMin;
  <!--Retrieving previous fields from form = "actions" in main_schedule.php-->
  <?php
    if (isset($_POST['edit'])) { //when edit button is clicked, create variables that can possibly direct input in html
      $taskName = $_POST['taskName'];
      $taskCategory = $_POST['taskCategory'];
      // echo "catFunction($taskCategory);"; //to run catFunction to make selected button white first
      $startTime = $_POST['startTime'];
      $startTimeHour = substr($startTime, 0, 2);
      $startTimeMin = substr($startTime, 3, 5);

      echo "oldStartHour = '$startTimeHour';";
      echo "oldStartMin = '$startTimeMin';";

      $endTime = $_POST['endTime'];
      $dateInput = $_POST['dateInput'];
    } 
  ?>
     var oldHour = document.createElement('input');
      oldHour.type = 'hidden';
      oldHour.value = oldStartHour;
      oldHour.name = 'oldStartHour';
      mainForm.appendChild(oldHour);

      var oldMin = document.createElement('input');
      oldMin.type = 'hidden';
      oldMin.value = oldStartMin;
      oldMin.name = 'oldStartMin';
      mainForm.appendChild(oldMin);
  </script>
  
  <body style="background-color: #f6f7f1; margin: 50px; border: 5px; border-color: #C4C4C4;"> <!--onload="remainingTime();"-->
    <!--Importing Firebase and Cloud Firestore libraries-->
    <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-firestore.js"></script>

    <!-- Parent-child relationship for inline-->
    <fieldset id="myFieldset">
      <div id="title">
        <li><h3>Edit the task:</h3></li>
      <!-- INPUT for taskName-->
      <li><form>
          <input type="text" id="taskName" name="taskName" size="70" value="<?php echo "$taskName";?>" oninput="Update(this.value, 'name')"><br>
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
        <li><input id="dateInput" type="date" style="background-color: #96d6ed" value="<?php echo $dateInput;?>" oninput="Update(this.value,'datein')"></li>
      </div>

      <element id="selectTime">     
        <h3>Time:</h3>
      </element> 
  
      <!--Time options-->
      <div id="timeOptions">
        <div class="startTime">
          <h3>Start time:</h3>
          <input type="time" id="startTime" name="startTime" value="<?php echo $startTime;?>" oninput="Update(this.value, 'start')">
        </div>
        <div class="endTime">
        <h3>End time:</h3>
          <input type="time" id="endTime" name="endTime" value="<?php echo $endTime;?>" oninput="Update(this.value, 'end')">
        </div>
        <input type="button" id="doneTimeBtn" value="Done!" onclick="updateRemainingTime()">
      </div>
      
      <!-- Create box for counter with CALCULATIONS of time left that can be planned-->
      <!-- QUESTION: idk how to include javascript element into html isit ${}?-->
      <div id="counter">
        <p>Estimated remaining time</p>
        <p id="counterOutput"></p>
      </div>
 

    <!--Buttons for DELETE, ADD, DONE-->
    <div class="btn-group-actions">
      <li><input type="submit" id="delete" name="delete" value="Delete task"></li>
      <!-- <li><button id="add" >Add another task</button></li> -->
      <li><input type="submit" id="done" name="done" value="Submit"></li>
    </div>
  </fieldset>
</form>
<!-- 
<form action="" method="POST" id="hidden">
</form> -->

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
        
        let nameOfTask = NameOfTask.value;
        let categoryNum = catNum; //variable from other file
        let start = Start.value;
        let startArr = [parseInt(start.substr(0, 2)), parseInt(start.substr(3, 4))];
        let end = End.value;
        let endArr = [parseInt(end.substr(0, 2)), parseInt(end.substr(3, 4))];
        let dateInput = DateInput.value;
        // let nameOfTask, categoryNum, start, startArr, end, endArr, dateInput, followUpTask, sequence, hour, minute;
        var dateNumber = 0;
        var jsRemainingDuration = 0;
 
        function Update(val, type) {
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
            //document.appendChild(jsStartHour);

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
          }
        }
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

        function remainingTime() {
          let text;
          let currArr = [];
          let name, year, month, date, startTimeHour, startTimeMin, endTimeHour, endTimeMin, type, newWin;
          let totalDuration;

          <?php
          //Writing out remaining time program
          $userid = $_SESSION["userid"];
          date_default_timezone_set('Singapore');
          $currYear = date("Y");
          $currMonth = date("m") - 1;
          $currDate = date("d");

          $sql = "SELECT * FROM remainingtime WHERE  userid = $userid AND currYear = $currYear AND currMonth = $currMonth AND currDate = $currDate;";

          $user = 'root'; 
          $pass = '';
          $db='orbital247';
          $conn = mysqli_connect('localhost', $user, $pass, $db);

          $results = mysqli_query($conn, $sql);
          $resultCheck = mysqli_num_rows($results);

          // If the remaining time exists
          if ($resultCheck > 0) {
            echo 'console.log("I come to else block");';
            foreach($results as $result) {
              $totalMin = $result["remainder"];
              //echo "totalDuration = '$totalMin';";
            }
            echo "jsRemainingDuration = '$totalMin';";
            // echo 'let jsRemainingDuration = document.createElement("input");';
            // echo 'jsRemainingDuration.type = "hidden";';
            // echo "jsRemainingDuration.value = '$totalMin';";
            // echo 'jsRemainingDuration.name = "jsRemainingDuration";';
            // echo 'ele.appendChild(jsRemainingDuration);';

            $hours = ($totalMin - ($totalMin % 60)) / 60;
            $mins = $totalMin - ($hours * 60);
            echo "text = 'Hour: ' + '$hours' + '   ' + '         Minute: ' + '$mins';";
            echo 'displayDuration(text);';
          }

          // If the remaining time does not exist
          if ($resultCheck == 0) {
              echo 'console.log("I come to if block");';
              echo 'totalDuration = 0;';
          // STEP 1: Obtain all the fixed tasks for the day
              $type = 1; //Type for fixed tasks is always 1
              $fullDate = $currYear."-".($currMonth + 1)."-".$currDate;
              $timestamp = strtotime($fullDate);
              $dayNum = date('w', $timestamp);

              echo "console.log('DayNum is ' + '$dayNum');";
              $dailySql = "SELECT * FROM routinetask WHERE userid = $userid AND freq = 0;";

              $weeklySql = "SELECT * FROM routinetask WHERE userid = $userid AND freq = 1 AND taskDay = $dayNum;";

              $biweeklySql = "SELECT * FROM routinetask WHERE userid = $userid AND freq = 2 AND taskDay = $dayNum AND week = 0;";

              $monthlySql = "SELECT * FROM routinetask WHERE userid = $userid AND freq = 3 AND taskDate = $taskDate;";

              $routineChecks = [$dailySql, $weeklySql, $biweeklySql, $monthlySql];

              $user = 'root'; 
              $pass = '';
              $db='orbital247';
              $conn = mysqli_connect('localhost', $user, $pass, $db);

              foreach($routineChecks as $check) {
                $result = mysqli_query($conn, $check);
            
                if ($result) {
                    //echo 'console.log("this is correct");';
                    $resultCheck = mysqli_num_rows($result);
                    $data = array();
                    if ($resultCheck > 0) {
                        //echo 'console.log("I have at least 1 result");';
                        while ($row = mysqli_fetch_assoc($result)) {
                            $data[] = $row;   
                        }   
                    }
                    foreach($data as $single) {
                        $name = $single['taskName'];
                        echo "name = '$name';";
                        echo "year = $currYear;";
                        echo "month = $currMonth;";
                        echo "date = $currDate;";
                        $startTimeHour = $single['startTimeHour'];
                        echo "startTimeHour = parseInt($startTimeHour);";
                        $startTimeMin = $single['startTimeMin'];
                        echo "startTimeMin = parseInt($startTimeMin);";
                        $endTimeHour = $single['endTimeHour'];
                        echo "endTimeHour = parseInt($endTimeHour);";
                        $endTimeMin = $single['endTimeMin'];
                        echo "endTimeMin = parseInt($endTimeMin);";
                        $type = $single['taskCategory'];
                        echo "type = parseInt($type);";
                        
                        echo 'newWin = new Window(name, year, month, date, new Time(startTimeHour, startTimeMin), new Time(endTimeHour, endTimeMin), type);';

                        echo 'currArr.push(newWin);';
                    }

                }
            }
          }
          ?>
          
          // If a record of the remaining time alr exists, we won't enter this block
          if (totalDuration == 0) {
            for (let i = 0; i < currArr.length; i++) {
              let duration = Time.duration(currArr[i].getStartTime(), currArr[i].getEndTime());
              let breakDuration = Break.calculateBreak(currArr[i].getStartTime(), currArr[i].getEndTime());
              totalDuration += (duration[0] * 60) + duration[1];
              totalDuration += breakDuration;
            }

            let remainingDuration = Math.max(0, (960 - totalDuration));

            let remainingHours = (remainingDuration - (remainingDuration % 60)) / 60;

            let remainingMins = remainingDuration % 60;

            jsRemainingDuration = remainingDuration;
            // let jsRemainingDuration = document.createElement("input");
            // jsRemainingDuration.type = "hidden";
            // jsRemainingDuration.value = remainingDuration;
            // jsRemainingDuration.name = "jsRemainingDuration";
            // ele.appendChild(jsRemainingDuration);
            //document.appendChild(jsRemainingDuration);

            text = "Hour: " + remainingHours + "         Minute: " + remainingMins;

            displayDuration(text);
          }
      }

      function updateRemainingTime() {
        // let startHour = ele.getElementsByName("jsStartHour").value;
        // let startMin = ele.getElementsBysName("jsStartMin").value;
        // let endHour = ele.getElementsBysName("jsEndHour").value;
        // let endMin = ele.getElementsBysName("jsEndMin").value;

        let startHour = startArr[0];
        let startMin = startArr[1];
        let endHour = endArr[0];
        let endMin = endArr[1];

        let durOfTask = Time.duration(new Time(startHour, startMin), new Time(endHour, endMin));
        let breakDuration = Break.calculateBreak(new Time(startHour, startMin), new Time(endHour, endMin));

        console.log("i come to updateRemainingTime");

        let currRemainingTime = jsRemainingDuration;

        currRemainingTime -= ((durOfTask[0] * 60) + durOfTask[1]);
        currRemainingTime -= breakDuration;

        currRemainingTime = Math.max(0, currRemainingTime);

        let currRemainingHours = (currRemainingTime - (currRemainingTime % 60)) / 60;
        let currRemainingMins = (currRemainingTime % 60);

        let text = "Hour: " + currRemainingHours + "         Minute: " + currRemainingMins;
        displayDuration(text);

        let finalRemainingMins = document.createElement("input");
        finalRemainingMins.type = "hidden";
        finalRemainingMins.value = currRemainingTime;
        finalRemainingMins.name = "finalRemainingMins";
        ele.appendChild(finalRemainingMins);

        //ele.getByElementName("jsRemainingDuration").value = currRemainingTime;
      }

        // window.onload = function () {
        // var startHour = localStorage.getItem("startTimeHour"); //global js variable to store the task name
        // var startMin = localStorage.getItem("startTimeMin"); //global js variable to store the task name
        // /*Transferring of javascript variable to php*/
        // var main = document.getElementById("hidden");

        // var hourPhp = document.createElement("input");
        // hourPhp.type = "hidden";
        // hourPhp.value = startHour;
        // hourPhp.name = "hourPhp";
        // main.appendChild(hourPhp);

        // var minPhp = document.createElement("input");
        // minPhp.type = "hidden";
        // minPhp.value = startMin;
        // minPhp.name = "minPhp";
        // main.appendChild(minPhp);

        // document.getElementById("hidden").submit(); //to submit the form to retrieve previous data
        // // console.log(nameoftask + " is gotten from local storage!") //used for debugging to check if local storage works
        // Retrieve_Database_Info(); //debugging: working
        // }        

        // var taskName, taskCategory, taskYear, taskMonth, taskDate, startTimeHour, startTimeMin, endTimeHour, endTimeMin; //global variables for inputting into html
      
      //   function printvaljs(i){
      //     if (i < 10) {
      //         return "0" + i;
      //     } else {
      //         return i;
      //     }
      // }
    
      //   function Retrieve_Database_Info(){ //pass in the taskname to retrieve the info to fill up the form
      //     //retrieving values from php database from taskname and id
           <?php
      //       $userid = $_SESSION['userid'];
      //       $hourPhp = $_POST['hourPhp'];
      //       $minPhp = $_POST['minPhp'];
      //       $query = "SELECT * FROM fixedtaskwindow WHERE userid=$userid AND startTimeHour=$hourPhp AND startTimeMin=$minPhp;";
      //       $result = mysqli_query($conn,$query);
      //       if(!$result) {
      //         echo "Could not run query:" . mysqli_error($conn);
      //       exit();
      //       }
      //       $row = mysqli_fetch_row($result);
      //       $taskName = $row[1];
      //       $taskCategory = $row[2];
      //       $taskYear = $row[3];
      //       $taskMonth = $row[4];
      //       $taskDate = $row[5];
      //       $startTimeHour = $row[6];
      //       $startTimeMin = $row[7];
      //       $endTimeHour = $row[8];
      //       $endTimeMin = $row[9];
      //       echo 'taskName = $taskName;';
      //       echo 'taskCategory = $taskCategory;';
      //       echo 'taskYear = $taskYear;';
      //       echo 'taskMonth = $taskMonth;';
      //       echo 'taskDate = $taskDate;';
      //       echo 'startTimeHour = $startTimeHour;';
      //       echo 'startTimeMin = $startTimeMin;';
      //       echo 'endTimeHour = $endTimeHour;';
      //       echo 'endTimeMin = $endTimeMin;';          
             ?>
      //       // console.log("Retrieve data to fill up form");
      //       console.log(nameoftask + " is in retrieve database info!");

      //         /*For the setting of values to fill in the fields*/
      //         document.getElementById("taskName").value = taskName; 
      //         document.getElementById("startTime").value = printvaljs(startTimeHour) + ":" + printvaljs(startTimeMin);
      //         document.getElementById("endTime").value = printvaljs(endTimeHour) + ":" + printvaljs(endTimeMin);
      //         document.getElementById("dateInput").value = printvaljs(taskYear) + "-" + printvaljs(taskMonth) + "-" + printvaljs(taskDate);
      //         console.log(taskName);
      //   } 

    </script>
   </body>
</html>
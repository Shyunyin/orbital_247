<?php
    session_start();
    include "../includes/add_daily_task.inc.php";
    //include "../includes/insertWindow_helper.inc.php";
?>

<!DOCTYPE html>
<html>

  <head>
    <title>Add daily task</title>
    <script type = "text/javascript" type="module" src="add_daily_task.js"></script>
    <script type = "text/javascript" type="module" src="OneTimeTasks_Final.js"></script>
    <script type = "text/javascript" type="module" src="Window.js"></script>
    <script type = "text/javascript" type="module" src="CombinedTime_Final.js"></script>

    <link rel="stylesheet" href="add_daily_task.css" />
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Signika+Negative:wght@600&display=swap" rel="stylesheet">
    <!--To allow for resizing according to screens-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  
  <body style="background-color: #f6f7f1; margin: 50px; border: 5px; border-color: #C4C4C4;" onload="remainingTime();">
  <form action="includes/add_daily_task.inc.php" method="POST" id="bigForm">
    <!-- <script> var totalMinsLeft = 0; </script> -->
    <input type="hidden" id="totalMinsLeft" name="totalMinsLeft" value=0>
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
  
      <!-- Time label -->
      <label for="timeTask" style="font-size:large;font-family:Signika Negative, sans-serif;">Time: </label><br>
  
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
        <div class="warning">
          <h3 id="warning"></h3>
        </div>
        <input type="button" id="doneTimeBtn" value="Done!" onclick="updateRemainingTime()">
      </div>
    
      <!-- Create box for counter with CALCULATIONS of time left that can be planned-->
      <!-- QUESTION: idk how to include javascript element into html isit ${}?-->
      <div id="counter">
        <p id="estimatedTitle"></p>
        <p id="counterOutput"></p>
      </div>

      <!--Buttons for DELETE, ADD, DONE-->
      <div class="btn-group-actions">
        <li><input type="button" id="delete" value="Delete task" onclick="DeleteTask()"></li>
        <li><button type="submit" id="done" name="done">Submit</button></li>
      </div>

    </fieldset>
  </form>

  <script>
      var ele = document.getElementById("bigForm");

      //------------------Defining of variables------------------//

      /*For referencing later on*/
      let NameOfTask = document.getElementById("taskName"); 
      //category number can get from cat_num in the other javascript file
      let Start = document.getElementById("startTime");
      let End = document.getElementById("endTime"); 
      let DateInput = document.getElementById("dateInput");
      
      let nameOfTask = NameOfTask.value;
      let categoryNum = catNum; //variable from other file
      let start = Start.value;
      let startArr = [parseInt(start.substr(0, 2)), parseInt(start.substr(3, 4))];
      let end = End.value;
      let endArr = [parseInt(end.substr(0, 2)), parseInt(end.substr(3, 4))];
      let dateInput = DateInput.value;

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

      /*displayDuration(): to display out font-end counter timing*/      
      function displayDuration(text) { /*This function works*/
        console.log("displayDuration is called");
        document.getElementById("counterOutput").innerHTML = text;
        document.getElementById("estimatedTitle").innerHTML = "Estimated remaining time";
        if (document.getElementById("totalMinsLeft").value >= 0) {
          document.getElementById("counterOutput").style.color = "black";
          document.getElementById("estimatedTitle").style.color = "black";
        } else {
          document.getElementById("counterOutput").style.color = "red";
          document.getElementById("estimatedTitle").style.color = "red";
        }
      }

      function remainingTime() {
        let text;
        let currArr = [];
        let name, cat, year, month, date, startTimeHour, startTimeMin, endTimeHour, endTimeMin, completed, newWin;
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
          }
          echo "jsRemainingDuration = '$totalMin';";

          $hours = ($totalMin - ($totalMin % 60)) / 60;
          $mins = $totalMin - ($hours * 60);
          echo "text = 'Hours: ' + '$hours' + '&nbsp &nbsp &nbsp &nbsp' + ' Minutes: ' + '$mins';";
          echo 'displayDuration(text);';
        }

        // If the remaining time does not exist
        if ($resultCheck == 0) {
            echo 'console.log("I come to if block");';
            echo 'totalDuration = 0;';

          // STEP 1: Obtain all the fixed tasks for the day
            //$type = 1; //Type for fixed tasks is always 1
            //$timestamp = strtotime($fullDate);
            //$dayNum = date('w', $timestamp);
            //echo "console.log('DayNum is ' + '$dayNum');";

            $currSql = "SELECT * FROM fixedtaskwindow WHERE userid = $userid AND taskYear = $currYear AND taskMonth = $currMonth AND taskDate = $currDate;";

            $currResult = mysqli_query($conn, $currSql);
                        
            if ($currResult) {
                //echo 'console.log("this is correct");';
                $resultCheck = mysqli_num_rows($currResult);
                $data = array();
                if ($resultCheck > 0) {
                    echo 'console.log("I have at least 1 result");';
                    while ($row = mysqli_fetch_assoc($currResult)) {
                        $data[] = $row;   
                    }   
                }
                foreach($data as $single) {
                    $name = $single['taskName'];
                    echo "name = '$name';";
                    $cat = $single['taskCategory'];
                    echo "cat = parseInt($cat);";
                    $year = $single['taskYear'];
                    echo "year = parseInt($year);";
                    $month = $single['taskMonth'];
                    echo "month = parseInt($month);";
                    $date = $single['taskDate'];
                    echo "date = parseInt($date);";
                    $startTimeHour = $single['startTimeHour'];
                    echo "startTimeHour = parseInt($startTimeHour);";
                    $startTimeMin = $single['startTimeMin'];
                    echo "startTimeMin = parseInt($startTimeMin);";
                    $endTimeHour = $single['endTimeHour'];
                    echo "endTimeHour = parseInt($endTimeHour);";
                    $endTimeMin = $single['endTimeMin'];
                    echo "endTimeMin = parseInt($endTimeMin);";
                    $completed = $single['completed'];
                    echo "completed = '$completed';"; //TODO: Not sure if booleans can be printed like this
                    
                    echo 'newWin = new Window(name, cat, year, month, date, new Time(startTimeHour, startTimeMin), new Time(endTimeHour, endTimeMin), completed);';

                    echo 'currArr.push(newWin);';
                }
            }
            
            if ((int)$currDate < 10) {
              $currDate = (string) ("0" . ((string)$currDate));
            }
            if ((int)($currMonth + 1) < 10) {
              $currMonth = (string) ("0" . ((string)($currMonth + 1)));
            } else {
              $currMonth = (string) ($currMonth + 1);
            }

            $fullDate = $currYear."-".($currMonth)."-".$currDate;

            $dailySql = "SELECT * FROM routinetask WHERE userid = $userid AND startDate = '$fullDate' AND freq = 0;";

            $weeklySql = "SELECT * FROM routinetask WHERE userid = $userid AND startDate = '$fullDate' AND freq = 1;";

            $biweeklySql = "SELECT * FROM routinetask WHERE userid = $userid AND startDate = '$fullDate' AND freq = 2;";

            $monthlySql = "SELECT * FROM routinetask WHERE userid = $userid AND startDate = '$fullDate' AND freq = 3;";

            $routineChecks = [$dailySql, $weeklySql, $biweeklySql, $monthlySql];

            $user = 'root'; 
            $pass = '';
            $db='orbital247';
            $conn = mysqli_connect('localhost', $user, $pass, $db);

            foreach($routineChecks as $check) {
              $result = mysqli_query($conn, $check);
          
              if ($result) {
                  $resultCheck = mysqli_num_rows($result);
                  $data = array();
                  if ($resultCheck > 0) {
                      while ($row = mysqli_fetch_assoc($result)) {
                          $data[] = $row;   
                      }   
                  }
                  foreach($data as $single) {
                      $name = $single['taskName'];
                      echo "name = '$name';";
                      $cat = $single['taskCategory'];
                      echo "cat = parseInt($cat);";
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
                      $endTimeMin = $single['completed'];
                      echo "endTimeMin = parseInt($endTimeMin);";
                      
                      echo 'newWin = new Window(name, cat, year, month, date, new Time(startTimeHour, startTimeMin), new Time(endTimeHour, endTimeMin), false);';

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

          let remainingDuration = 960 - totalDuration;

          document.getElementById("totalMinsLeft").value = remainingDuration;

          let remainingHours = (remainingDuration - (remainingDuration % 60)) / 60;

          let remainingMins = remainingDuration % 60;

          jsRemainingDuration = remainingDuration;

          text = "Hours: " + remainingHours + '&nbsp &nbsp &nbsp &nbsp' + " Minutes: " + remainingMins;

          displayDuration(text);
        }
      }

      function updateRemainingTime() {
        let startHour = startArr[0];
        let startMin = startArr[1];
        let endHour = endArr[0];
        let endMin = endArr[1];

        let sleepEndHour = -1;
        let sleepEndMin = -1;

        <?php
          $sleepSql = "SELECT * FROM infowakeup WHERE id=$userid;";

          $sleepResult = mysqli_query($conn, $sleepSql);
                        
            if ($sleepResult) {
                //echo 'console.log("this is correct");';
                $resultCheck = mysqli_num_rows($sleepResult);
                $data = array();
                if ($resultCheck > 0) {
                    echo 'console.log("I have at least 1 result in sleep block");';
                    while ($row = mysqli_fetch_assoc($sleepResult)) {
                        $data[] = $row;   
                    }   
                }
                foreach($data as $single) {
                    $hour = $single['hour'];
                    echo "sleepEndHour = parseInt($hour);";
                    $min = $single['minute'];
                    echo "sleepEndMin = parseInt($min);";
                }
            }
        ?>
        let sleepEnd = new Time(sleepEndHour, sleepEndMin);
        let sleepStart = Time.findStartTime(sleepEnd, [8, 0]);
        let taskWindow = new Window("task", 0, new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Time(startHour, startMin), new Time(endHour, endMin), false);

        console.log(new Time(startHour, startMin));
        console.log(new Time(endHour, endMin));

        if (((startHour * 60) + startMin) == ((endHour * 60) + endMin)) {
          document.getElementById("warning").innerHTML = "Start and end times are the same. Please choose another start/end time.";
        } else if (((startHour * 60) + startMin) > ((endHour * 60) + endMin)) {
          document.getElementById("warning").innerHTML = "Please choose an end time that is later than the start time.";
        } else if (taskWindow.duringSleep(sleepStart, sleepEnd)) {
          document.getElementById("warning").innerHTML = "Are you sure you want to schedule a task during your sleep time?";
        } else if (taskWindow.isPast()) {
          document.getElementById("warning").innerHTML = "The selected time has already passed! Please re-select the timing.";
        } else {
          document.getElementById("warning").innerHTML = null;
          
          let durOfTask = Time.duration(new Time(startHour, startMin), new Time(endHour, endMin));
          let breakDuration = Break.calculateBreak(new Time(startHour, startMin), new Time(endHour, endMin));

          console.log("i come to updateRemainingTime");

          let currRemainingTime = jsRemainingDuration;

          currRemainingTime -= ((durOfTask[0] * 60) + durOfTask[1]);
          currRemainingTime -= breakDuration;

          document.getElementById("totalMinsLeft").value = currRemainingTime;

          let currRemainingHours = (currRemainingTime - (currRemainingTime % 60)) / 60;
          let currRemainingMins = (currRemainingTime % 60);

          let text = "Hours: " + currRemainingHours + '&nbsp &nbsp &nbsp &nbsp' + " Minutes: " + currRemainingMins;
          
          displayDuration(text);

          let finalRemainingMins = document.createElement("input");
          finalRemainingMins.type = "hidden";
          finalRemainingMins.value = currRemainingTime;
          finalRemainingMins.name = "finalRemainingMins";
          ele.appendChild(finalRemainingMins);

          
        }

      }
    </script>
   </body>
</html>
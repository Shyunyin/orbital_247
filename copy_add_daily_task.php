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
    <link rel="stylesheet" href="copy_add_daily_task.css?v=<?php echo time();?>">

    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Signika+Negative:wght@600&display=swap" rel="stylesheet">

    <!--To allow for resizing according to screens-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  
  <script>
    /*To read in previous values to be outputted AND to submit completed status*/
    var completeStatus;
    <?php
      if (isset($_POST['edit'])) {
        $taskName = $_POST['taskName'];
        $dateInput = $_POST['startDate'];
        $startTime = $_POST['startTime'];
        $endTime = $_POST['endTime'];
        $taskCat = $_POST['taskCat'];
      }

      $sql = "SELECT completed FROM fixedtaskwindow WHERE userid = $userid AND taskName = $taskName"; //Obtain all the routine task for the user

      $result = mysqli_query($conn, $sql);
      while($row = mysql_fetch_array($results)){
        $completeStatus = (int) $row['completed'];
        echo "completeStatus = $completeStatus;";
    }
    ?>

    var form = document.getElementById("bigForm");
    var ele = document.createElement("input");
    ele.type = "hidden";
    ele.value = completeStatus;
    ele.name = "completed"; //retrieve from PHP as 'completed'
    form.appendChild(ele);

  </script>
  
  <body style="background-color: #f6f7f1; margin: 50px; border: 5px; border-color: #C4C4C4;">
    <form action="../includes/editing_daily_task.inc.php" method="POST" id="bigForm">
      <!-- Parent-child relationship for inline-->
      <fieldset id="myFieldset">
      <div id="title">
      <li><h3>Do fill in all fields even if they are already displayed!</h3></li>
        <li><h3>Add a task:</h3></li>
        <!-- INPUT for taskName-->
        <li><form>
          <input type="text" id="taskName" name="taskName" size="70" value="<?php echo "$taskName";?>"><br>
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
          <li><input id="dateInput" type="date"  value="<?php echo $dateInput;?>" style="background-color: #96d6ed"></li>
        </div>

        <element id="selectTime">     
          <h3>Time:</h3>
        </element> 
    
        <!--Time options-->
        <div id="timeOptions">
          <div class="startTime">
            <h3>Start time:</h3>
            <input type="time" id="startTime" value="<?php echo $startTime;?>" name="startTime">
          </div>
          <div class="endTime">
          <h3>End time:</h3>
            <input type="time" id="endTime" value="<?php echo $endTime;?>" name="endTime">
          </div>
          <input type="button" id="doneTimeBtn" value="Done!" onclick="calculationTime()">
        </div>
        
        <!-- Create box for counter with CALCULATIONS of time left that can be planned-->
        <div id="counter">
          <p>Remaining</p>
          <p id="counterOutput"></p>
        </div>  
  
        <!--Buttons for DELETE, ADD, DONE-->
        <div class="btn-group-actions">
          <!-- <li><input type="button" id="delete" value="Delete task" onclick="DeleteTask()"></li> -->
          <li><input type="button" id="done" value="Submit" onclick="frontEndSubmit()"></li>
        </div>

      </fieldset>
    </form>

    <script>
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
      }        

      var taskName, taskCategory, taskYear, taskMonth, taskDate, startTimeHour, startTimeMin, endTimeHour, endTimeMin; //global variables for inputting into html
      
      function printvaljs(i){
        if (i < 10) {
            return "0" + i;
        } else {
            return i;
        }
      }
      
    </script>
   </body>
</html>
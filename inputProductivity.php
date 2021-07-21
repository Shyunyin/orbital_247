<?php
    session_start();
?>
<!DOCTYPE HTML>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<script type="text/javascript" type="module" src="./countdownTimer.js"></script>
<script type="text/javascript" type="module" src="./link.js"></script>
<script type="text/javascript" type="module" src="Routine_Final.js"></script>

<!--Importing Firebase and Cloud Firestore libraries-->
<script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-firestore.js"></script>
<link href="https://fonts.googleapis.com/css2?family=Signika+Negative:wght@600&display=swap" rel="stylesheet">
<style>
    body{
    font-family: "Signika Negative", sans-serif;
    background-color: #f6f7f1;
    color: #1e5353;
    text-align: center;
    margin-top: 300px;
    }
    .btn-group {
        position: center;
        margin-left: 300px;
    }
    .btn-group .button {
    font-family: "Signika Negative", sans-serif;
    background-color: #96d6ed; /* Green */
    border: 2px solid black;
    color: black;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    float: left;
    }

    .btn-group .button:not(:last-child) {
    border-right: none; /* Prevent double borders */
    }

    .btn-group .button:hover {
    background-color: #A5E4FB;
    }
    #done {
    font-family: "Signika Negative", sans-serif;
    font-size: large;
    border: 2px solid black;
    border-radius: 5px;
    background-color: #e3aba1;
    margin-top: 50px;
    }
    #done:hover {
        background-color: #FEDCCE;
    }
</style>
</head>

<body>
  <!--Get wake up time from php to display on buttons-->
  <?php
        $serverName = "localhost";
        $dBUsername = "root";
        $dBPassword = "";
        $dBName = "orbital247";
        $conn = mysqli_connect($serverName, $dBUsername, $dBPassword, $dBName);

        $userid = (int) $_SESSION['userid'];
        $sql = "SELECT * FROM infowakeup WHERE id=$userid;";
        $result = mysqli_query($conn,$sql);
        if(!$result) {
          echo "Could not run query:" . mysqli_error();
          exit();
        }
        $row = mysqli_fetch_row($result);
        $startHour = $row[0];
        $startMin = $row[1];

        //creating 2nd, 3rd and 4th start productivity time
        $secondHour = calculate($startHour + 4);
        $thirdHour = calculate($secondHour + 4);
        $fourthHour = calculate($thirdHour + 4);
        $lastHour = calculate($fourthHour + 4);

        //calculate() checks if an Hour is more than 24 and ensures that the output uses the 24-hour format
        function calculate($x){
          if ($x > 23) {
            return ($x - 24);
          }
            return $x;
          }

        // echo "0" .$secondHour;
        // echo ($startHour. ":" .$startMin. "-" .$secondHour. ":" .$startMin);

        function printval($var){
          if ($var < 10) {
            echo "0" .$var;
          } else {
            echo $var;
          }
        }
        // echo (" Hour:" .$startHour. "and Minute:" .$startMin); //debugging: works
    ?>

    <h2>Select the timeslot(s) which you think you&nbsp;</h2>
    <h2> are the most productive at:</h2>
    <form action="" method="POST">
      <div class="btn-group">
          <button type="submit" id="num1" class="button" name="first" onclick="time(1)"><?php printval($startHour); echo (":"); printval($startMin); echo (" - "); printval($secondHour); echo (":"); printval($startMin);?></button>
          <button type="submit" id="num2" class="button" name="second" onclick="time(2)"><?php printval($secondHour); echo (":"); printval($startMin); echo (" - "); printval($thirdHour); echo (":"); printval($startMin);?></button>
          <button type="submit" id="num3" class="button" name="third" onclick="time(3)"><?php printval($thirdHour); echo (":"); printval($startMin); echo (" - "); printval($fourthHour); echo (":"); printval($startMin);?></button>
          <button type="submit" id="num4" class="button" name="fourth" onclick="time(4)"><?php printval($fourthHour); echo (":"); printval($startMin); echo (" - "); printval($lastHour); echo (":"); printval($startMin);?></button>
        </div>
        <button type="submit" name="done" id="done">Next</button>
    </form>

    <script>
        function time(num){
        if (num === 1) {
          document.getElementById("num1").style.backgroundColor="white";
          document.getElementById("num2").style.backgroundColor="#96d6ed";
          document.getElementById("num3").style.backgroundColor="#96d6ed";
          document.getElementById("num4").style.backgroundColor="#96d6ed";
        } else if (num === 2) {
          document.getElementById("num1").style.backgroundColor="#96d6ed";
          document.getElementById("num2").style.backgroundColor="white";
          document.getElementById("num3").style.backgroundColor="#96d6ed";
          document.getElementById("num4").style.backgroundColor="#96d6ed";
        } else if (num=== 3) {
          document.getElementById("num1").style.backgroundColor="#96d6ed";
          document.getElementById("num2").style.backgroundColor="#96d6ed";
          document.getElementById("num3").style.backgroundColor="white";
          document.getElementById("num4").style.backgroundColor="#96d6ed";
        } else if (num=== 4) {
          document.getElementById("num1").style.backgroundColor="#96d6ed";
          document.getElementById("num2").style.backgroundColor="#96d6ed";
          document.getElementById("num3").style.backgroundColor="#96d6ed";
          document.getElementById("num4").style.backgroundColor="white";
        } else {
          document.getElementById("num1").style.backgroundColor="#96d6ed";
          document.getElementById("num2").style.backgroundColor="#96d6ed";
          document.getElementById("num3").style.backgroundColor="#96d6ed";
          document.getElementById("num4").style.backgroundColor="#96d6ed";
        }
      }
    </script>

    <?php
      // $userid = (int) $_SESSION['userid'];

      // //check if done button is clicked
      // if (isset($_POST['done'])) {
      //   if (isset($_POST['first'])) {
      //     $starttimehour = $startHour;
      //     $starttimemin = $startMin;
      //     $endtimehour = $secondHour;
      //     $endtimemin = $startMin; 
      //   }
      //   if (isset($_POST['second'])) {
      //     $starttimehour = $secondHour;
      //     $starttimemin = $startMin;
      //     $endtimehour = $thirdHour;
      //     $endtimemin = $startMin; 
      //   }
      //   if (isset($_POST['third'])) {
      //     $starttimehour = $thirdHour;
      //     $starttimemin = $startMin;
      //     $endtimehour = $fourthHour;
      //     $endtimemin = $startMin; 
      //   }
      //   if (isset($_POST['fourth'])) {
      //     $starttimehour = $fourthHour;
      //     $starttimemin = $startMin;
      //     $endtimehour = $lastHour;
      //     $endtimemin = $startMin; 
      //   }

      //   $sql = "INSERT INTO infoproductive(startTimeHour, startTimeMin, endTimeHour, endTimeMin, id) 
      //   VALUES ($starttimehour, $starttimemin, $endtimehour, $endtimemin, $userid);";

      //   mysqli_query($conn, $sql);

      //   echo ("Let's head to the main schedule!");
      //   header("location: ../main_schedule.php");
      //   exit();

      // } else {
        // echo "Please fill up your productivity times!";
        // header("location: ../inputProductivity.php?error=noneselected");
        // exit();
      // }
    ?>
 
</body>
</html>

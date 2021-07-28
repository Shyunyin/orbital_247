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
            margin-left: 430px;
        }
        .btn-group .button {
        font-family: "Signika Negative", sans-serif;
        background-color: #96d6ed;
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
        margin-left: -180px;
        }
        #done:hover {
            background-color: #FEDCCE;
        }
    </style>
  </head>

  <script>
      function popupFunction() {
          window.alert("Please click on the button that displays the window of time where you are the most productive!");
      }    
  </script>

  <body onload="popupFunction();">
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

      function printval($var){
        if ($var < 10) {
          echo "0" .$var;
        } else {
          echo $var;
        }
      }
      $userid = (int) $_SESSION['userid'];
    ?>

    <script>
      //to get variables from php
      <?php
        echo "var firstHour = $startHour;";
        echo "var allMin = $startMin;";
        echo "var secondHour = $secondHour;";
        echo "var thirdHour = $thirdHour;";
        echo "var fourthHour = $fourthHour;";
        echo "var lastHour = $lastHour;";
      ?>
      function time(num){
        var main = document.getElementById("mainForm");
        if (num === 1) {
          document.getElementById("num1").style.backgroundColor="white";
          document.getElementById("num2").style.backgroundColor="#96d6ed";
          document.getElementById("num3").style.backgroundColor="#96d6ed";
          document.getElementById("num4").style.backgroundColor="#96d6ed";

          var startHour = document.createElement("input");
          startHour.type = "hidden";
          startHour.value = firstHour;
          startHour.name = "startHour";
          main.appendChild(startHour);

          var endHour = document.createElement("input");
          endHour.type = "hidden";
          endHour.value = secondHour;
          endHour.name = "endHour";
          main.appendChild(endHour);

          var minute = document.createElement("input");
          minute.type = "hidden";
          minute.value = allMin;
          minute.name = "allMin";
          main.appendChild(minute);
        } 
          else if (num === 2) {
          document.getElementById("num1").style.backgroundColor="#96d6ed";
          document.getElementById("num2").style.backgroundColor="white";
          document.getElementById("num3").style.backgroundColor="#96d6ed";
          document.getElementById("num4").style.backgroundColor="#96d6ed";

          var startHour = document.createElement("input");
          startHour.type = "hidden";
          startHour.value = secondHour;
          startHour.name = "startHour";
          main.appendChild(startHour);

          var endHour = document.createElement("input");
          endHour.type = "hidden";
          endHour.value = thirdHour;
          endHour.name = "endHour";
          main.appendChild(endHour);

          var minute = document.createElement("input");
          minute.type = "hidden";
          minute.value = allMin;
          minute.name = "allMin";
          main.appendChild(minute);

        } else if (num=== 3) {
          document.getElementById("num1").style.backgroundColor="#96d6ed";
          document.getElementById("num2").style.backgroundColor="#96d6ed";
          document.getElementById("num3").style.backgroundColor="white";
          document.getElementById("num4").style.backgroundColor="#96d6ed";

          var startHour = document.createElement("input");
          startHour.type = "hidden";
          startHour.value = thirdHour;
          startHour.name = "startHour";
          main.appendChild(startHour);

          var endHour = document.createElement("input");
          endHour.type = "hidden";
          endHour.value = fourthHour;
          endHour.name = "endHour";
          main.appendChild(endHour);

          var minute = document.createElement("input");
          minute.type = "hidden";
          minute.value = allMin;
          minute.name = "allMin";
          main.appendChild(minute);

        } else if (num=== 4) {
          document.getElementById("num1").style.backgroundColor="#96d6ed";
          document.getElementById("num2").style.backgroundColor="#96d6ed";
          document.getElementById("num3").style.backgroundColor="#96d6ed";
          document.getElementById("num4").style.backgroundColor="white";
          
          var startHour = document.createElement("input");
          startHour.type = "hidden";
          startHour.value = fourthHour;
          startHour.name = "startHour";
          main.appendChild(startHour);

          var endHour = document.createElement("input");
          endHour.type = "hidden";
          endHour.value = lastHour;
          endHour.name = "endHour";
          main.appendChild(endHour);

          var minute = document.createElement("input");
          minute.type = "hidden";
          minute.value = allMin;
          minute.name = "allMin";
          main.appendChild(minute);

        } else {
          document.getElementById("num1").style.backgroundColor="#96d6ed";
          document.getElementById("num2").style.backgroundColor="#96d6ed";
          document.getElementById("num3").style.backgroundColor="#96d6ed";
          document.getElementById("num4").style.backgroundColor="#96d6ed";
        }
      }
    </script>

    <h2>Select the timeslot(s) which you think you&nbsp;</h2>
    <h2> are the most productive at:</h2>
    
    <form id="mainForm" action="includes/inputProductivity.inc.php" method="POST">
      <div class="btn-group">
          <input type="button" id="num1" class="button" name="first" value="<?php printval($startHour); echo (":"); printval($startMin); echo (" - "); printval($secondHour); echo (":"); printval($startMin);?>" onclick="time(1);">
          <input type="button" id="num2" class="button" name="second" value="<?php printval($secondHour); echo (":"); printval($startMin); echo (" - "); printval($thirdHour); echo (":"); printval($startMin);?>" onclick="time(2);">
          <input type="button" id="num3" class="button" name="third" value="<?php printval($thirdHour); echo (":"); printval($startMin); echo (" - "); printval($fourthHour); echo (":"); printval($startMin);?>" onclick="time(3);">
          <input type="button" id="num4" class="button" name="fourth" value="<?php printval($fourthHour); echo (":"); printval($startMin); echo (" - "); printval($lastHour); echo (":"); printval($startMin);?>" onclick="time(4);">
        </div>
        <button type="submit" name="done" id="done">Next</button>
    </form>

  </body>
</html>

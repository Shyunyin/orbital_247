<?php
    session_start();
    $serverName = "localhost";
    $dBUsername = "root";
    $dBPassword = "";
    $dBName = "orbital247";
    $conn = mysqli_connect($serverName, $dBUsername, $dBPassword, $dBName);

    $userid = (int) $_SESSION['userid'];
  
      // //check if done button is clicked
    if (isset($_POST['done'])) {
        echo "done button has been clicked"; 
        $starttimehour = $_POST['startHour'];
        $starttimemin = $_POST['allMin'];
        $endtimehour = $_POST['endHour'];
        $endtimemin = $_POST['allMin']; 

        echo $starttimehour; //debugging
        echo $endtimehour; //debugging

        $sql = "INSERT INTO infoproductive(startTimeHour, startTimeMin, endTimeHour, endTimeMin, id) 
        VALUES ($starttimehour, $starttimemin, $endtimehour, $endtimemin, $userid);";
        mysqli_query($conn, $sql);

        echo ("We will move onto adding more information now!");
        header("location: ../main_schedule.php");
        exit();
  } 
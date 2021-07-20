<?php

if (isset($_POST["submit"])) {
    $taskname = $_POST["taskName"];
    
    $serverName = "localhost";
    $dBUsername = "root";
    $dBPassword = "";
    $dBName = "orbital247";
    $conn = mysqli_connect($serverName, $dBUsername, $dBPassword, $dBName);
    // require_once "functions.inc.php";
    $sql = "INSERT INTO routinetask(taskName, taskCategory, startTimeHour, startTimeMin, endTimeHour, endTimeMin, freq, taskDay, week, taskDate, userid) VALUES ('$taskName', 1, 1, 1, 1, 1, 1, 1, 1, 1, -1);";
    mysqli_query($conn, $sql);
}


// $taskcat = $_POST[""];
// $starttime = $_POST["startTime"];
// $endtime = $_POST["endTime"];
// //for frequency weekly dropdown for which day
// if (isset($_POST["weeklydropdown"])) {
//     $day = echo $_POST["weeklydropdown"];
// } 
// //for frequency biweekly dropdown
// if (isset($_POST["biweeklydropdown"])) {
//     $day = echo $_POST["biweeklydropdown"];
// }


// $week = $_POST["chooseWeeks"];
// $date = $_POST["date"];

// if (empty($username) || empty($pwd)) 
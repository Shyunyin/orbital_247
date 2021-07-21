<?php

// if (isset($_POST["taskName"])) {
//     $tasknameNew = $_POST["taskName"];
// }
if (isset($_POST["submitTask"])) {
    // $taskname = "testName";
    // echo $taskname;
    $serverName = "localhost";
    $dBUsername = "root";
    $dBPassword = "";
    $dBName = "orbital247";
    $conn = mysqli_connect($serverName, $dBUsername, $dBPassword, $dBName);
    // $tasknameNew = mysqli_real_escape_string($conn, $_POST['taskName']);
    $sql = "INSERT INTO routinetask(taskName, taskCategory, startTimeHour, startTimeMin, endTimeHour, endTimeMin, freq, taskDay, week, taskDate, userid) VALUES ('".$_POST["taskName"]."', 1, 1, 1, 1, 1, 1, 1, 1, 1, -1);";
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
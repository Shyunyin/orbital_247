<?php
    session_start();
    //require "../main_schedule.php";
?>
<?php

    $taskName = $_POST['currName'];
    $taskCat = (int) $_POST['currCat'];
    $taskYear = (int) $_POST['currYear'];
    $taskMonth = (int) $_POST['currMonth']; // For javascript, months span from 0 - 11
    $taskDate = (int) $_POST['currDate'];
    $startHour = (int) $_POST['currStartHour'];
    $startMin = (int) $_POST['currStartMin'];
    $endHour = (int) $_POST['currEndHour'];
    $endMin = (int) $_POST['currEndMin']; 
    //$type = (int) $_POST['currCat']; //Type for fixed tasks is always 1
    //$userid = $_SESSION['userid'];
    $type = $taskCat;
    //$userid = -1;
    $userid = $_SESSION["userid"];

    $user = 'root'; 
    $pass = '';
    $db='orbital247';
    $conn = mysqli_connect('localhost', $user, $pass, $db);

    $sql = "INSERT INTO fixedtaskwindow(taskName, taskCategory, taskYear, taskMonth, taskDate, startTimeHour, startTimeMin, endTimeHour, endTimeMin, taskType, userid) VALUES ('$taskName', $taskCat, $taskYear, $taskMonth, $taskDate, $startHour, $startMin, $endHour, $endMin, $type, $userid);";

    mysqli_query($conn, $sql);

    //echo ("Task $taskName has been added! Press x to close this pop up:)");
    header("location: ../main_schedule.php");
?>

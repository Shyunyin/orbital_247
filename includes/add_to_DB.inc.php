<?php
    session_start();
    //if (isset($_POST["submit"]))
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
    $type = 1;
    $userid = -1;

    $user = 'root'; 
    $pass = '';
    $db='orbital247';
    $conn = mysqli_connect('localhost', $user, $pass, $db);

    $sql = "INSERT INTO fixedtaskwindow(taskName, taskCategory, taskYear, taskMonth, taskDate, startTimeHour, startTimeMin, endTimeHour, endTimeMin, taskType, userid) VALUES ('$taskName', $taskCat, $taskYear, $taskMonth, $taskDate, $startHour, $startMin, $endHour, $endMin, $type, $userid);";

    mysqli_query($conn, $sql);
?>
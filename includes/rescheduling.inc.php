<?php
    session_start();

    $userid = (int) $_SESSION["userid"];
    $startHour = (int) $_POST[""];
    $startMin = (int) $_POST[""];
    $endHour = (int) $_POST[""];
    $endMin = (int) $_POST[""];

    // Existing task is first deleted. (If any)
    $deleteSql = "DELETE FROM fixedtaskwindow WHERE userid = $userid AND startTimeHour = $startHour AND startTimeMin = $startMin AND endTimeHour = $endHour AND endTimeMin = $endMin";

    $user = 'root'; 
    $pass = '';
    $db='orbital247';
    $conn = mysqli_connect('localhost', $user, $pass, $db);

    mysqli_query($conn, $deleteSql);

    $newTask = $_POST[""]; //TODO: Retrieve from form or from database? Retrieve from form is better
    $newCat = (int) $_POST[""];
    $newYear = (int) $_POST[""];
    $newMonth = (int) $_POST[""];
    $newDate = (int) $_POST[""];

    //TODO: Are we going to allow them to change timing?
    $newStartHour = (int) $_POST[""];
    $newStartMin = (int) $_POST[""];
    $newEndHour = (int) $_POST[""];
    $newEndMin = (int) $_POST[""];

    $newType = (int) $_POST[""];

    // New task is inserted into the database
    $insertSql = "INSERT INTO fixedtaskwindow(taskName, taskCategory, taskYear, taskMonth, taskDate, startTimeHour, startTimeMin, endTimeHour, endTimeMin, taskType, userid) VALUES ('$newTask', $newCat, $newYear, $newMonth, $newDate, $newStartHour, $newStartMin, $newEndHour, $newEndMin, $newType, $userid);";

    mysqli_query($conn, $insertSql);

    //TODO: Not sure if this is correct, but basically to trigger the regeneration of the schedule
    header("location: ../includes/scheduling.php");
?>
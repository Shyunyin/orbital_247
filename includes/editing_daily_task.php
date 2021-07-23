<?php
    session_start();

    //Minimally need these details
    $oldStartHour = (int) $_POST[""];
    $oldStartMin = (int) $_POST[""];
    $oldEndHour = (int) $_POST[""];
    $oldEndMin = (int) $_POST[""];

    $newTask = $_POST[""];
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
    $userid = (int) $_SESSION["userid"];

    $sql = "UPDATE fixedtaskwindow SET taskName = '$newTask', taskCategory = $newCat, taskYear = $newYear, taskMonth = $newMonth, taskDate = $newDate, startTimeHour = $newStartHour, startTimeMin = $newStartMin, endTimeHour = $newEndHour, endTimeMin = $newEndMin, taskType = $newType, userid = $userid WHERE userid = $userid AND startTimeHour = $oldStartHour AND startTimeMin = $oldStartMin AND endTimeHour = $oldEndHour;";

    $user = 'root'; 
    $pass = '';
    $db='orbital247';
    $conn = mysqli_connect('localhost', $user, $pass, $db);

    mysqli_query($conn, $deleteSql);

    //TODO: Not sure if this is correct, but basically to trigger the regeneration of the schedule
    header("location: ../includes/scheduling.php");
?>
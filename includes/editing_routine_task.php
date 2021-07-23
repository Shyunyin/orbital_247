<?php
    session_start();

    //Minimally need these details
    $oldStartHour = (int) $_POST[""];
    $oldStartMin = (int) $_POST[""];
    $oldEndHour = (int) $_POST[""];
    $oldEndMin = (int) $_POST[""];

    $newTask = $_POST[""];
    $newCat = (int) $_POST[""];
    $newStartHour = (int) $_POST[""];
    $newStartMin = (int) $_POST[""];
    $newEndHour = (int) $_POST[""];
    $newFreq = (int) $_POST[""];
    $newEndMin = (int) $_POST[""];
    $newTaskDay = (int) $_POST[""];
    $newWeek = (int) $_POST[""];
    $newTaskDate = (int) $_POST[""];
    $userid = (int) $_SESSION["userid"];

    $sql = "UPDATE routinetask SET taskName = '$newTask', taskCategory = $newCat, startTimeHour = $newStartHour, startTimeMin = $newStartMin, endTimeHour = $newEndHour, endTimeMin = $newEndMin, freq = $newFreq, taskDay = $newTaskDay, week = $newWeek, taskDate = $newTaskDate, userid = $userid WHERE userid = $userid AND startTimeHour = $oldStartHour AND startTimeMin = $oldStartMin AND endTimeHour = $oldEndHour;";

    $user = 'root'; 
    $pass = '';
    $db='orbital247';
    $conn = mysqli_connect('localhost', $user, $pass, $db);

    mysqli_query($conn, $sql);

    //TODO: Not sure if this is correct, but basically to trigger the regeneration of the schedule
    header("location: ../includes/scheduling.php");

    //TODO: But it should be directed to different pages after that so I am not sure if it should go to the same scheduling page
?>
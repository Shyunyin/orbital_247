<?php
    session_start();

    $user = 'root'; 
    $pass = '';
    $db='orbital247';
    $conn = mysqli_connect('localhost', $user, $pass, $db);


    //Minimally need these details
    $oldStartHour = (int) $_POST["oldStartHour"];
    $oldStartMin = (int) $_POST["oldStartMin"];

    $newTask = $_POST["taskName"];
    $newCat = (int) $_POST["jsCat"];
    $newYear = (int) $_POST["jsYear"];
    $newMonth = (int) $_POST["jsMonth"];
    $newDate = (int) $_POST["jsDate"];

    //TODO: Are we going to allow them to change timing?
    $newStartHour = (int) $_POST["jsStartHour"];
    $newStartMin = (int) $_POST["jsStartMin"];
    $newEndHour = (int) $_POST["jsEndHour"];
    $newEndMin = (int) $_POST["jsEndMin"];
    $newFreq = (int) $_POST['jsFreq'];

    $newType = (int) $_POST["jsCat"];
    $userid = (int) $_SESSION["userid"];

    if (isset($_POST['done'])) {
        $updateSql = "UPDATE routinetask SET taskName = '$newTask', taskCategory = $newCat, startTimeHour = $newStartHour, startTimeMin = $newStartMin, endTimeHour = $newEndHour, endTimeMin = $newEndMin, freq = $newFreq, userid = $userid WHERE userid = $userid AND startTimeHour = $oldStartHour AND startTimeMin = $oldStartMin";
        mysqli_query($conn, $updateSql);
        header("location: ../main_schedule.php");
        exit();
    }

    //TODO: Not sure if this is correct, but basically to trigger the regeneration of the schedule
    // header("location: ../includes/scheduling.php");
?>
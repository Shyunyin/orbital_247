<?php
    session_start();

    $user = 'root'; 
    $pass = '';
    $db='orbital247';
    $conn = mysqli_connect('localhost', $user, $pass, $db);


    //Minimally need these details
    $oldStartHour = (int) $_POST["oldStartHour"];
    $oldStartMin = (int) $_POST["oldStartMin"];
    // $oldEndHour = (int) $_POST[""];
    // $oldEndMin = (int) $_POST[""];

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

    $newType = (int) $_POST["jsCat"];
    $userid = (int) $_SESSION["userid"];

    if (isset($_POST['done'])) {
        $updateSql = "UPDATE fixedtaskwindow SET taskName = '$newTask', taskCategory = $newCat, taskYear = $newYear, taskMonth = $newMonth, taskDate = $newDate, startTimeHour = $newStartHour, startTimeMin = $newStartMin, endTimeHour = $newEndHour, endTimeMin = $newEndMin, taskType = $newType, userid = $userid WHERE userid = $userid AND startTimeHour = $oldStartHour AND startTimeMin = $oldStartMin";
        mysqli_query($conn, $updateSql);
        header("location: ../main_schedule.php");
        exit();
    } else if (isset($_POST['delete'])) {
        $deleteSql = "DELETE FROM fixedtaskwindow WHERE userid = $userid AND startTimeHour = $oldStartHour AND startTimeMin = $oldStartMin";
        mysqli_query($conn, $deleteSql);
        header("location: ../main_schedule.php");
        exit();
    }

    //TODO: Not sure if this is correct, but basically to trigger the regeneration of the schedule
    header("location: ../includes/scheduling.php");
?>
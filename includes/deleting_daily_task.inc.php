<?php
    session_start();

    $userid = (int) $_SESSION["userid"];
    $startHour = (int) $_POST[""];
    $startMin = (int) $_POST[""];
    $endHour = (int) $_POST[""];
    $endMin = (int) $_POST[""];

    $deleteSql = "DELETE FROM fixedtaskwindow WHERE userid = $userid AND startTimeHour = $startHour AND startTimeMin = $startMin AND endTimeHour = $endHour AND endTimeMin = $endMin";

    //$additionalDuration = 'Time.duration(new Time('$startHour', '$startMin'), new Time('$endHour', '$endMin'))'
    $user = 'root'; 
    $pass = '';
    $db='orbital247';
    $conn = mysqli_connect('localhost', $user, $pass, $db);

    mysqli_query($conn, $deleteSql);

    //TODO: Not sure if this is correct, but basically to trigger the regeneration of the schedule
    header("location: ../includes/scheduling.php");
?>
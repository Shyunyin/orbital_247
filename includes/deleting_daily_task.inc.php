<?php
    session_start();

    $userid = (int) $_SESSION["userid"];
    $startHour = (int) $_POST["startTimeHour"];
    $startMin = (int) $_POST["startTimeMin"];

    $user = 'root'; 
    $pass = '';
    $db='orbital247';
    $conn = mysqli_connect('localhost', $user, $pass, $db);

    mysqli_query($conn, $deleteSql);
    
    if (isset($_POST['delete'])) {
        $deleteSql = "DELETE FROM fixedtaskwindow WHERE userid = $userid AND startTimeHour = $startHour AND startTimeMin = $startMin";
        mysqli_query($conn, $deleteSql);
        header("location: ../main_schedule.php");
        exit();
    }

?>
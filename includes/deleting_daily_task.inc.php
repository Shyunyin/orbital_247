<?php
    session_start();

    $userid = (int) $_SESSION["userid"];
    $startHour = (int) $_POST["startTimeHour"];
    $startMin = (int) $_POST["startTimeMin"];

    $user = 'root'; 
    $pass = '';
    $db='orbital247';
    $conn = mysqli_connect('localhost', $user, $pass, $db);
    
    if (isset($_POST['delete'])) {
        $deleteSql = "DELETE FROM fixedtaskwindow WHERE userid = $userid AND startTimeHour = $startHour AND startTimeMin = $startMin";
        mysqli_query($conn, $deleteSql);
        echo "Task has been successfully deleted. Press X to close this window.";
        exit();
    } else if (isset($_POST['close'])) {
        echo "Task not deleted. Press X to close this window.";
    }

?>
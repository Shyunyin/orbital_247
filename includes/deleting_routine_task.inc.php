<?php
    session_start();

    $userid = (int) $_SESSION["userid"];
    $taskName = $_POST["taskName"];

    $user = 'root'; 
    $pass = '';
    $db='orbital247';
    $conn = mysqli_connect('localhost', $user, $pass, $db);
    
    if (isset($_POST['delete'])) {
        $deleteSql = "DELETE FROM routinetask WHERE userid = $userid AND taskName = $taskName";
        mysqli_query($conn, $deleteSql);
        echo "Task has been successfully deleted. Press X to close this window.";
        exit();
    } else if (isset($_POST['close'])) {
        echo "Task not deleted. Press X to close this window.";
    }

?>
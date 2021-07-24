<?php
    session_start();

    $taskName = $_POST['taskName'];
    $cat = (int) $_POST['jsCat'];
    $startHour = (int) $_POST['jsStartHour'];
    $startMin = (int) $_POST['jsStartMin'];
    $endHour = (int) $_POST['jsEndHour'];
    $endMin = (int) $_POST['jsEndMin'];
    $freq = (int) $_POST['jsFreq'];
    $userid = (int) $_SESSION["userid"];

    if ($freq == 1) {
        $taskDay = (int) $_POST['jsDay'];
    } else if ($freq == 2) {
        $taskDay = (int) $_POST['jsDay'];
        $week = (int) $_POST['jsWeek'];
    } else if ($freq == 3) {
        $taskDate = (int) $_POST['jsDate'];
    }

// For testing purposes
    // echo "taskName in php is: " . $taskName . "<br>";
    // echo "cat in php is: " . $cat . "<br>";
    // echo "startHour in php is: " . $startHour . "<br>";
    // echo "startMin in php is: " . $startMin . "<br>";
    // echo "endHour in php is: " . $endHour . "<br>";
    // echo "endMin in php is: " . $endMin . "<br>";
    // echo "freq in php is: " . $freq . "<br>";
    // echo "taskDay in php is: " . $taskDay . "<br>";
    // echo "week in php is: " . $week . "<br>";
    // echo "taskDate in php is: " . $taskDate . "<br>";
    //echo gettype($startHour) . "<br>";
    //echo "startHour in php is: " . $startHour . "<br>";
    //echo "taskName in php is: " . $taskName . "<br>";

    if (isset($_POST['done']) || isset($_POST['add'])) {
        $serverName = "localhost";
        $dBUsername = "root";
        $dBPassword = "";
        $dBName = "orbital247";
        $conn = mysqli_connect($serverName, $dBUsername, $dBPassword, $dBName);

        //$sql = "INSERT INTO routinetask(taskName, taskCategory, startTimeHour, startTimeMin, endTimeHour, endTimeMin, freq, taskDay, week, taskDate, userid) VALUES ('$taskName', 1, $startHour, $startMin, $endHour, $endMin, $freq, '$taskDay', '$week', '$taskDate', -1);";

        if ($freq == 1) {
            //echo ("I enter the weekly freq block");

            $sql = "INSERT INTO routinetask(taskName, taskCategory, startTimeHour, startTimeMin, endTimeHour, endTimeMin, freq, taskDay, userid) VALUES ('$taskName', $cat, $startHour, $startMin, $endHour, $endMin, $freq, $taskDay, $userid);";

            mysqli_query($conn, $sql);
        } else if ($freq == 2) {
            //echo ("I enter the biweekly freq block");

            $sql = "INSERT INTO routinetask(taskName, taskCategory, startTimeHour, startTimeMin, endTimeHour, endTimeMin, freq, taskDay, week, userid) VALUES ('$taskName', $cat, $startHour, $startMin, $endHour, $endMin, $freq, $taskDay, $week, $userid);";

            mysqli_query($conn, $sql);
        } else if ($freq == 3) {
            //echo ("I enter the monthly freq block");

            $sql = "INSERT INTO routinetask(taskName, taskCategory, startTimeHour, startTimeMin, endTimeHour, endTimeMin, freq, taskDate, userid) VALUES ('$taskName', $cat, $startHour, $startMin, $endHour, $endMin, $freq, $taskDate, $userid);";

            mysqli_query($conn, $sql);
        } else {
            //echo ("I enter the daily freq block");

            $sql = "INSERT INTO routinetask(taskName, taskCategory, startTimeHour, startTimeMin, endTimeHour, endTimeMin, freq, userid) VALUES ('$taskName', $cat, $startHour, $startMin, $endHour, $endMin, $freq, $userid);";

            mysqli_query($conn, $sql);
        }
    }

    //only access the wakeup page if routine page is empty
    $data = "SELECT * FROM routinetask WHERE id=$userid"; 
    $result = mysqli_query($conn,$data);
        if(!$result) {
            echo " No routine tasks added yet:" . mysqli_error($conn);
            if (isset($_POST['done'])) {
                echo ("We will move onto adding more information now!");
                header("location: ../wakeup.php");
                exit();
            } else if (isset($_POST['add'])) {
                header("location: ../add_routine_task.php");
                exit();
                //echo ("Need to continue adding other tasks");
            }
        } else { //if user has already set up before
    
            if (isset($_POST['done'])) {
                echo ("Done adding task! Press the x to close the page");
            } else if (isset($_POST['add'])) {
                header("location: ../add_routine_task.php");
                exit();
                //echo ("Need to continue adding other tasks");
            }
        }

    //echo("I sucessfully exit");
?>

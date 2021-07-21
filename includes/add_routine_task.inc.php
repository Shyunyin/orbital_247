<?php
    $taskName = $_POST['taskName'];
    $cat = (int) $_POST['jsCat'];
    $startHour = (int) $_POST['jsStartHour'];
    $startMin = (int) $_POST['jsStartMin'];
    $endHour = (int) $_POST['jsEndHour'];
    $endMin = (int) $_POST['jsEndMin'];
    $freq = (int) $_POST['jsFreq'];

    if ($freq == 1) {
        $taskDay = (int) $_POST['jsDay'];
    } else if ($freq == 2) {
        $taskDay = (int) $_POST['jsDay'];
        $week = (int) $_POST['jsWeek'];
    } else if ($freq == 3) {
        $taskDate = (int) $_POST['jsDate'];
    }


    echo "taskName in php is: " . $taskName . "<br>";
    echo "cat in php is: " . $cat . "<br>";
    echo "startHour in php is: " . $startHour . "<br>";
    echo "startMin in php is: " . $startMin . "<br>";
    echo "endHour in php is: " . $endHour . "<br>";
    echo "endMin in php is: " . $endMin . "<br>";
    echo "freq in php is: " . $freq . "<br>";
    echo "taskDay in php is: " . $taskDay . "<br>";
    echo "week in php is: " . $week . "<br>";
    echo "taskDate in php is: " . $taskDate . "<br>";
    //echo gettype($startHour) . "<br>";
    //echo "startHour in php is: " . $startHour . "<br>";
    //echo "taskName in php is: " . $taskName . "<br>";

    if (isset($_POST['done-submit'])) {
        $serverName = "localhost";
        $dBUsername = "root";
        $dBPassword = "";
        $dBName = "orbital247";
        $conn = mysqli_connect($serverName, $dBUsername, $dBPassword, $dBName);

        //$sql = "INSERT INTO routinetask(taskName, taskCategory, startTimeHour, startTimeMin, endTimeHour, endTimeMin, freq, taskDay, week, taskDate, userid) VALUES ('$taskName', 1, $startHour, $startMin, $endHour, $endMin, $freq, '$taskDay', '$week', '$taskDate', -1);";

        if ($freq == 1) {
            echo ("I enter the weekly freq block");

            $sql = "INSERT INTO routinetask(taskName, taskCategory, startTimeHour, startTimeMin, endTimeHour, endTimeMin, freq, taskDay, userid) VALUES ('$taskName', 1, $startHour, $startMin, $endHour, $endMin, $freq, $taskDay, -1);";

            mysqli_query($conn, $sql);
        } else if ($freq == 2) {
            echo ("I enter the biweekly freq block");

            $sql = "INSERT INTO routinetask(taskName, taskCategory, startTimeHour, startTimeMin, endTimeHour, endTimeMin, freq, taskDay, week, userid) VALUES ('$taskName', 1, $startHour, $startMin, $endHour, $endMin, $freq, $taskDay, $week, -1);";

            mysqli_query($conn, $sql);
        } else if ($freq == 3) {
            echo ("I enter the monthly freq block");

            $sql = "INSERT INTO routinetask(taskName, taskCategory, startTimeHour, startTimeMin, endTimeHour, endTimeMin, freq, taskDate, userid) VALUES ('$taskName', 1, $startHour, $startMin, $endHour, $endMin, $freq, $taskDate, -1);";

            mysqli_query($conn, $sql);
        } else {
            echo ("I enter the daily freq block");

            $sql = "INSERT INTO routinetask(taskName, taskCategory, startTimeHour, startTimeMin, endTimeHour, endTimeMin, freq, userid) VALUES ('$taskName', 1, $startHour, $startMin, $endHour, $endMin, $freq, -1);";

            mysqli_query($conn, $sql);
        }
    }

    echo("I sucessfully exit");
?>
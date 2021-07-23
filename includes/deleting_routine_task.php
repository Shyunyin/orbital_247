<?php
    session_start();

    $userid = (int) $_SESSION["userid"];
    $startHour = (int) $_POST[""];
    $startMin = (int) $_POST[""];
    $endHour = (int) $_POST[""];
    $endMin = (int) $_POST[""];
    $freq = (int) $_POST[""];
    $taskDay = (int) $_POST[""];
    $week = (int) $_POST[""];
    $taskDate = (int) $_POST[""];

    $deleteSql = "DELETE FROM fixedtaskwindow WHERE userid = $userid AND startTimeHour = $startHour AND startTimeMin = $startMin AND endTimeHour = $endHour AND endTimeMin = $endMin AND freq = $freq AND taskDay = $taskDay AND week = $week AND taskDate = $taskDate;";

    $user = 'root'; 
    $pass = '';
    $db='orbital247';
    $conn = mysqli_connect('localhost', $user, $pass, $db);

    mysqli_query($conn, $deleteSql);

    //TODO: Not sure if this is correct, but basically to trigger the regeneration of the schedule
    header("location: ../includes/scheduling.php");
?>

<?php
//Writing out remaining time program
    session_start();

    $sql = "SELECT remainder FROM remainingtime WHERE userid = AND currYear = AND currMonth = AND currDate = ;";

    $user = 'root'; 
    $pass = '';
    $db='orbital247';
    $conn = mysqli_connect('localhost', $user, $pass, $db);
    $result = mysqli_query($conn, $sql);

    $userid = $_SESSION["userid"];
    $currYear = $_POST[""];
    $currMonth = $_POST[""];
    $currDate = $_POST[""];

    // currently the remaining time is not stored
    if (!$result) {
        $insertSql = "INSERT INTO remainingtime(userid, currYear, currMonth, currDate, remainder) VALUES ($userid, $currYear, $currMonth, $currDate, 960);";

        //TODO: Display 16 hours and 0 mins
    } else {
        $hours = $result % 60;
        $mins = $result - ($hours * 60);

        //TODO: Display this hours and mins
    }

?>
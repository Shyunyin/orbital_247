<?php
session_start();

//Declaring of variables
$hour = (int) $_POST['jsHour'];
$min = (int) $_POST['jsMin'];
$userid = (int) $_SESSION['userid'];

$serverName = "localhost";
$dBUsername = "root";
$dBPassword = "";
$dBName = "orbital247";
$conn = mysqli_connect($serverName, $dBUsername, $dBPassword, $dBName);

//Link to the database
if (isset($_POST['next'])) {
    $sql = "INSERT INTO infowakeup(hour, minute, id) VALUES ($hour, $min, $userid);";

    mysqli_query($conn, $sql);

    echo ("Let's move on to add our productivity timing!");
    header("location: ../inputProductivity.php");
    exit();
} else {
    header("location: ../wakeup.php?error=errorwithfillingin");
    exit();
}
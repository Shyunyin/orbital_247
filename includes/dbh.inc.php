<?php
//file to connect to the database

$serverName = "localhost";
$dBUsername = "root";
$dBPassword = "";
$dBName = "orbital247";

$conn = mysqli_connect($serverName, $dBUsername, $dBPassword, $dBName);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

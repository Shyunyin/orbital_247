<?php
$user = 'root'; //no users for now
$pass = ''; //dont need for now
$db='schedulerdb'; 

$db = new mysqli('localhost', $user, $pass, $db) or die("Unable to connect");

echo"Great work!";
?>
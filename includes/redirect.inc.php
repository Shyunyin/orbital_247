<?php
    session_start();
    //require "../main_schedule.php";
?>
<?php
    $user = 'root'; 
    $pass = '';
    $db='orbital247';
    $conn = mysqli_connect('localhost', $user, $pass, $db);

    $duration = (int) $_POST['currDuration'];
    $currYear = (int) $_POST['redirectYear'];
    $currMonth = (int) $_POST['redirectMonth'];
    $currDate = (int) $_POST['redirectDate'];
    $userid = $_SESSION["userid"];

    echo "console.log($currYear);";
    echo "console.log($currMonth);";
    echo "console.log($currDate);";


    $selectSql = "SELECT * FROM remainingtime WHERE  userid = $userid AND currYear = $currYear AND currMonth = $currMonth AND currDate = $currDate;";

    $currResult = mysqli_query($conn, $selectSql);

    echo 'console.log("I come till here");';
    echo "console.log($duration);";

    if ($currResult) {
        echo 'console.log("this is correct");';
        $resultCheck = mysqli_num_rows($currResult);
        $data = array();
        if ($resultCheck > 0) {
            echo 'console.log("I have at least 1 result");';
            while ($row = mysqli_fetch_assoc($currResult)) {
                $data[] = $row;   
            }   
        }
        foreach($data as $single) {
            //$currYear = (int) $single["currYear"];
            //$currMonth = (int) $single["currMonth"];
            //$currDate = (int) $single["currDate"];
            $remainder = (int) $single["remainder"];

            //echo "console.log($remainder);";

            $remainder = $remainder + $duration;

            //echo "console.log($remainder);";

            $updateSql = "UPDATE remainingtime SET remainder=$remainder WHERE currYear=$currYear AND currMonth=$currMonth AND currDate=$currDate AND userid=$userid;"; 

            mysqli_query($conn, $updateSql);
        }
    }

    header("location:../add_daily_task.php");
?>
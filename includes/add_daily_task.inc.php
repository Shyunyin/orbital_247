<?php
    $user = 'root'; 
    $pass = '';
    $db='orbital247';
    $conn = mysqli_connect('localhost', $user, $pass, $db);

    //STEP 1: Retrieve all the fixed window tasks for the day
    $sql = "SELECT * FROM fixedtaskwindow where ;"; //incomplete
    $result = mysqli_query($conn, $sql);
    $resultCheck = mysqli_num_rows($result);
    $data = array();
    echo "let finalArr = [];";
    echo "let boolResult;";

    if ($resultCheck > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $data[] = $row;   
        }   
    }
    foreach($data as $single) {
        $taskName = $single['taskName'];
        echo "let taskName = '$taskName';";
        $taskCat = $single['taskCategory'];
        echo "let taskCat = '$taskCat';";
        $year = $single['taskYear'];
        echo "let year = '$year';";
        $month = $single['taskMonth'];
        echo "let month = '$month';";
        $date = $single['taskDate'];
        echo "let date = '$date';";
        $startTimeHour = $single['startTimeHour'];
        echo "let startTimeHour = '$startTimeHour';";
        $startTimeMin = $single['startTimeMin'];
        echo "let startTimeMin = '$startTimeMin';";
        $endTimeHour = $single['endTimeHour'];
        echo "let endTimeHour = '$endTimeHour';";
        $endTimeMin = $single['endTimeMin'];
        echo "let endTimeMin = '$endTimeMin';";
        $type = $single['type'];
        echo "let type = '$type';";
        
        echo "let newWin = new Window(taskName, taskCat, year, month, date, new Time(startTimeHour, startTimeMin), new Time(endTimeHour, endTimeMin), type);";

        echo "finalArr.push(newWin);";
    }

    echo "boolResult = newWin.insertWindow(finalArr);";

    /*
    //The year, month and date variable can be replaced with this single variable:
    //taskDate datetime NOT NULL (input will be in the format of yyyy-mm-dd or yyyy-mm-dd hh:mm:ss)
    //When retrieving, since it will be a string, can just splice the string to get the various values

    //Creating the emptyWindows table
    CREATE TABLE emptywindow (
        id int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
        windowName varchar(256) NOT NULL,
        taskYear int(11) NOT NULL,
        taskMonth int(11) NOT NULL,
        taskDate int(11) NOT NULL,
        startTimeHour int(11) NOT NULL, 
        startTimeMin int(11) NOT NULL,
        endTimeHour int(11) NOT NULL,
        endTimeMin int(11) NOT NULL,
        type int(11) NOT NULL,
        userid int(11) NOT NULL
    );

    //Creating the fixedTasks table
    CREATE TABLE fixedtaskwindow (
        id int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
        taskName varchar(256) NOT NULL,
        taskCategory int(11) NOT NULL,
        taskYear int(11) NOT NULL,
        taskMonth int(11) NOT NULL,
        taskDate int(11) NOT NULL,
        startTimeHour int(11) NOT NULL,
        startTimeMin int(11) NOT NULL,
        endTimeHour int(11) NOT NULL,
        endTimeMin int(11) NOT NULL,
        type int(11) NOT NULL,
        userid int(11) NOT NULL
    );

    //Creating the nonFixedTasks table
    CREATE TABLE nonfixedtasks (
        id int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
        taskName varchar(256) NOT NULL,
        taskCategory int(5) NOT NULL,
        year int NOT NULL,
        month int NOT NULL,
        date int NOT NULL,
        numOfSessions int(3) NOT NULL,
        durrOfSessHours int() NOT NULL, // What are the limits?
        durrOfSessMins int(59) NOT NULL,
        taskAfterIt varchar(256) NOT NULL,
        userid int(11) NOT NULL
    );

    //Creating the nonFixedTasksPriority table
    CREATE TABLE nonFixedTasksPriority (
        userId int PRIMARY KEY AUTO_INCREMENT NOT NULL,
        userName varchar(256) NOT NULL,
        taskName varchar(256) NOT NULL,
        taskCategory int(5) NOT NULL,
        year int NOT NULL,
        month int NOT NULL,
        date int NOT NULL,
        numOfSessions int(3) NOT NULL,
        durrOfSessHours int() NOT NULL, // What are the limits?
        durrOfSessMins int(59) NOT NULL,
        taskAfterIt varchar(256) NOT NULL
    );
    */

    function retrieveFixedTasks($year, $month, $date) {
        
    }
?>
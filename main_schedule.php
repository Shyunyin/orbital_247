<?php
    session_start();
?>
<!DOCTYPE html>
<html>

<head>
    <title>Main Schedule Page</title>
    <!-- <link rel="stylesheet" href="main_schedule.css" /> -->
    <link rel="stylesheet" href="main_schedule.css?v=<?php echo time();?>"> 
    <script type="text/javascript" type="module" src="main_schedule.js"></script>
    <script type="text/javascript" type="module" src="Scheduling.js"></script>
    <!-- Preshita added the following 3 lines bc they might be needed -->
    <script type="text/javascript" type="module" src="Window.js"></script>
    <script type="text/javascript" type="module" src="Routine_Final.js"></script>
    <script type="text/javascript" type="module" src="CombinedTime_Final.js"></script>
    <!-- <script type = "text/javascript" type="module" src="initialise.js"></script> -->
    <!--<script type="text/javascript" type="module" src="combine_add_daily_main.js"></script>-->

    <!--Importing script for icons -->
    <!-- <script src="https://kit.fontawesome.com/yourcode.js" crossorigin="anonymous"></script> -->
<!--
    <script type="module">
        import {Scheduling} from "./Scheduling.js";
    </script>
-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Signika+Negative:wght@600&display=swap" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>
    <!-- Main division for the background-->
    <div id="background">
        <div class="btn-group">
            <button class="button">Schedule</button>
            <button class="button" onclick="statistics()">Statistics</button>
            <button class="button" onclick="routine()">Routine</button>
        </div>
        <div class="main"></div>
    </div>
    <!--<form action="../includes/main_schedule.inc.php" method="POST" id="scheduleForm">-->
    <script>
    //PHP to get username from mysqli and let it be a javascript variable
        <?php
        $serverName = "localhost";
        $dBUsername = "root";
        $dBPassword = "";
        $dBName = "orbital247";
        $conn = mysqli_connect($serverName, $dBUsername, $dBPassword, $dBName);

        $userid = $_SESSION['userid'];
        $sql = "SELECT * FROM users WHERE usersId=$userid;";
        $result = mysqli_query($conn,$sql);
        $row = mysqli_fetch_row($result);
        $username = $row[1];
        echo "var username = '$username';";
        ?>
        console.log(username);
    </script>

    <div class = logout>
        <?php
            if (isset($_SESSION["useruid"])) {
                echo "<li><a href='includes/logout.inc.php'>Log out</a></li>";
            }
        ?>
    </div>

    <!--Heading content using javascript-->
    <div id="heading">
        <input type="text" id="currentDate" readonly="readonly" onfocus="this.blur()">
        <div id="currentTime"></div><!-- <input type="text" id="currentTime" readonly="readonly" onfocus="this.blur()"> -->
        <input type="text" id="currentUser" readonly="readonly" onfocus="this.blur()">
        <input type="text" id="currentSchedule" readonly="readonly" onfocus="this.blur()">
    </div>

    <!--Just a stand in rectangle for the progress bar-->
    <!-- <div id="progress">
        <input type="text" id="progressBar" readonly="readonly" value="Progress Bar" onfocus="this.blur()">
    </div> -->

    <!--Stand in for schedule-->
    <div id="schedule" name="schedule">
    </div>

    <!--For array of tasks-->
    <!-- <div id="postit">
        <input type="text" id="title" readonly="readonly" value="Tasks not included in schedule yet">
        <br>
        <div id="postitContent">
        </div>
    </div> -->

    <!--For the instructions on how to perform actions on tasks-->
    <div id="instruction">
        <!--For the background box-->
    </div>
    <div class="instruction">
        <h3>Click on any task to</h3>
        <h3>start, reschedule,</h3>
        <h3> edit or delete a task</h3>
    </div>

    <form action="copy_add_daily_task.php" method="POST" id="actions"> <!-- Form is to be submitted using edit button -->
        <h3>Actions:</h3>
        <div id="iconActions">
        </div>
    </form>

    <!--Add task pop-out-->
    <!-- <a href="http://localhost/orbital_247/add_daily_task.php" onclick="OpenPopupWindow(this);"><button id="addTask">+</button></a> -->
    <input type="button" id="addTask" value="+" onclick="OpenPopupWindow();">
    <!--onclick="window.location.href='./add_daily_task.php'"-->

    <!--Link to pop up for add daily task page-->
    <!--<button id="generateSchedule" name="generateSchedule" onclick="clearPostit();printSchedule(generate());">Generate Schedule now!</button>-->

    <!-- <button id="generateSchedule" name="generateSchedule" onclick="printSchedule(generateSchedule());">Generate Schedule now!</button> -->

    <!--Buttons to go to previous and next-->
    <!--Probably must create previous button using javascript as it only appears if schedule day != current day-->
    <button type="button" id="nextDay" name="nextDay"></button>
    <div id="textNextDay">Go to Next day's schedule</div>
    </form>
    <script>
        //--------------------- Writing relevant functions ------------------//
        //--------------------- Retrieving post-it stick tasks from database ------------------//
        /*Function to get current date in format*/
        function formatDate() {
          var today = new Date();
          year = today.getFullYear();
          month = '' + (today.getMonth() + 1);
          day = '' + today.getDate();
          if (month.length < 2)
            month = '0' + month;
          if (day.length < 2) 
            day = '0' + day;

          return [year, month, day].join('-');
        }

        var count = 0;

        /*redirect(x) takes in the task name and outputs a pop out window with the input fields updated when the edit button is created*/
        function redirect(x) {
            localStorage.setItem("taskname", x);
            var url = "http://127.0.0.1:5501/copy_add_daily_task.html";
            let myRef = window.open(url, 'mywin', 'left=20, top=20, width=770, height=700, toolbar=1, resizable=0');
            myRef.focus();
        }

        // /*clearPostit function is to remove the tasks printed on the post it 
        function clearPostit() {
            var currentNode = document.getElementById("postitContent");
            var newNode = document.createElement("div");
            newNode.id = "postitContent";
            newNode.innerHTML = "";
            currentNode.replaceWith(newNode);
            count = 0; //reset count whenever post it is cleared
        }
     
        // /*createPostIt(): Create an option in the post-it stick*/
        function createPostIt(name) { 
            let append = document.createElement("input");
            append.setAttribute("type", "button");
            append.setAttribute("value", name);
            append.setAttribute("readonly", "readonly");
            append.addEventListener('click', function(){
                redirect(name);
            }); 
            // append.setAttribute("onclick", "redirect(name)"); //x is the variable that contains the taskname
            append.classList.add("task");
            append.style.fontFamily = "'Signika Negative', sans-serif";
            append.style.fontSize = "large";
            append.style.position = "absolute";
            append.style.zIndex = "2";
            append.style.color = "white";
            append.style.backgroundColor = "#1e5353";
            append.style.border = "none";
            append.style.marginLeft = "15px";
            append.style.height = "25px";
            append.style.cursor="pointer";
            //calculation to ensure that tasks printed on top of each other
            let top = count * 30;
            let topText = top + "px";
            append.style.marginTop = topText;
            let ele = document.getElementById("postitContent");
            ele.appendChild(append);
            count += 1; //to increase the top margin for each input
        }
    </script>
    <script>
            function generateSchedule() {
                console.log("generateSchedule is called");
                let currArr = [];
                let name, year, month, date, startTimeHour, startTimeMin, endTimeHour, endTimeMin, type, newWin;
                    // STEP 1: Obtain all the fixed tasks for the day
                    <?php
                        //TODO: We need to obtain the year, month and date from the html page that directs us here. So update these variables here accordingly later.
                        date_default_timezone_set('Singapore');
                        $taskYear = date("Y");
                        $taskMonth = date("m") - 1; // For javascript, months span from 0 - 11. This is already accounted for in the main schedule page.
                        //$taskDate = (int) $_POST['jsDate'];
                        $taskDate = date("d"); //Just for testing!!
                        $type = 1; //Type for fixed tasks is always 1
                        //$userid = -1;
                        $userid = $_SESSION["userid"];


                        $sql = "SELECT * FROM fixedtaskwindow WHERE userid = $userid AND taskYear = $taskYear AND taskMonth = $taskMonth AND taskDate = $taskDate;";

                        $fullDate = $taskYear."-".($taskMonth + 1)."-".$taskDate;
                        $timestamp = strtotime($fullDate);
                        $dayNum = date('w', $timestamp);

                        $dailySql = "SELECT * FROM routinetask WHERE userid = $userid AND freq = 0;";

                        $weeklySql = "SELECT * FROM routinetask WHERE userid = $userid AND freq = 1 AND taskDay = $dayNum;";

                        $biweeklySql = "SELECT * FROM routinetask WHERE userid = $userid AND freq = 2 AND taskDay = $dayNum AND week = 0;";

                        $monthlySql = "SELECT * FROM routinetask WHERE userid = $userid AND freq = 3 AND taskDate = $taskDate;";

                        $routineChecks = [$dailySql, $weeklySql, $biweeklySql, $monthlySql];

                        $user = 'root'; 
                        $pass = '';
                        $db='orbital247';
                        $conn = mysqli_connect('localhost', $user, $pass, $db);
                        $result = mysqli_query($conn, $sql);
                        
                        if ($result) {
                            //echo 'console.log("this is correct");';
                            $resultCheck = mysqli_num_rows($result);
                            $data = array();
                            if ($resultCheck > 0) {
                                //echo 'console.log("I have at least 1 result");';
                                while ($row = mysqli_fetch_assoc($result)) {
                                    $data[] = $row;   
                                }   
                            }
                            foreach($data as $single) {
                                $name = $single['taskName'];
                                echo "name = '$name';";
                                $year = $single['taskYear'];
                                echo "year = parseInt($year);";
                                $month = $single['taskMonth'];
                                echo "month = parseInt($month);";
                                $date = $single['taskDate'];
                                echo "date = parseInt($date);";
                                $startTimeHour = $single['startTimeHour'];
                                echo "startTimeHour = parseInt($startTimeHour);";
                                $startTimeMin = $single['startTimeMin'];
                                echo "startTimeMin = parseInt($startTimeMin);";
                                $endTimeHour = $single['endTimeHour'];
                                echo "endTimeHour = parseInt($endTimeHour);";
                                $endTimeMin = $single['endTimeMin'];
                                echo "endTimeMin = parseInt($endTimeMin);";
                                $type = $single['taskType'];
                                echo "type = parseInt($type);";
                                
                                echo 'newWin = new Window(name, year, month, date, new Time(startTimeHour, startTimeMin), new Time(endTimeHour, endTimeMin), type);';
    
                                echo 'currArr.push(newWin);';
                            }
                        }
                        echo 'console.log(currArr);';

                        foreach($routineChecks as $check) {
                            $result = mysqli_query($conn, $check);
                        
                            if ($result) {
                                //echo 'console.log("this is correct");';
                                $resultCheck = mysqli_num_rows($result);
                                $data = array();
                                if ($resultCheck > 0) {
                                    //echo 'console.log("I have at least 1 result");';
                                    while ($row = mysqli_fetch_assoc($result)) {
                                        $data[] = $row;   
                                    }   
                                }
                                foreach($data as $single) {
                                    $name = $single['taskName'];
                                    echo "name = '$name';";
                                    // echo "year = $taskYear;";
                                    // echo "month = $taskMonth;";
                                    // echo "date = $taskDate;";
                                    echo "year = $taskYear;";
                                    echo "month = $taskMonth;";
                                    echo "date = $taskDate;";
                                    $startTimeHour = $single['startTimeHour'];
                                    echo "startTimeHour = parseInt($startTimeHour);";
                                    $startTimeMin = $single['startTimeMin'];
                                    echo "startTimeMin = parseInt($startTimeMin);";
                                    $endTimeHour = $single['endTimeHour'];
                                    echo "endTimeHour = parseInt($endTimeHour);";
                                    $endTimeMin = $single['endTimeMin'];
                                    echo "endTimeMin = parseInt($endTimeMin);";
                                    $type = $single['taskCategory'];
                                    echo "type = parseInt($type);";
                                    
                                    echo 'newWin = new Window(name, year, month, date, new Time(startTimeHour, startTimeMin), new Time(endTimeHour, endTimeMin), type);';
        
                                    echo 'currArr.push(newWin);';
                                }
                            }
                        }
                        echo "year = '$taskYear';";
                        echo "month = '$taskMonth';";
                        echo "date = '$taskDate';";
                        //echo'console.log(currArr);' ;
                    ?>

                    console.log(currArr);
                    // STEP 2: Sort out the fixed tasks in chronological order
                    let sortedArr = [];
                    for (let i = 0; i < currArr.length; i++) {
                        let innerIndex = 0
                        for (let j = 0; j < sortedArr.length; j++) {
                            if (!(currArr[i]).isCompletelyAfter(sortedArr[j])) {
                                //innerIndex = j;
                                j = sortedArr.length
                            } else {
                                innerIndex++;
                            }
                        }
                        sortedArr.splice(innerIndex, 0, currArr[i]);
                    }
                    console.log(sortedArr); //For testing

                    //STEP 3: Inserting breaks
                    var totalBreakMins = 0;
                    let breakArr = [];
                    let startTaskStartTime, lastTaskEndTime;
                    //TODO: No breaks to be scheduled directly after meals! So check for the taskCat, do this after you have decided the cat system.
                    for (let i = 0; i < sortedArr.length; i++) {
                        startTaskStartTime = sortedArr[i].getStartTime();
                        // If there are back to back tasks
                        if (i < sortedArr.length - 1 && (sortedArr[i].getEndTime()).equals(sortedArr[i + 1].getStartTime())) {
                            //let startIndex = i;
                            let endIndex = i;
                            while (endIndex < sortedArr.length - 1 && (sortedArr[endIndex].getEndTime()).equals((sortedArr[endIndex + 1]).getStartTime())) {
                                endIndex++;
                                i++;
                            }
                            lastTaskEndTime = sortedArr[endIndex].getEndTime();
                        } else {
                            lastTaskEndTime = sortedArr[i].getEndTime();
                        }
                        //let currBreakMins = Break.calculateBreak(sortedArr[i].getStartTime(), sortedArr[i].getEndTime());

                        let currBreakMins = Break.calculateBreak(startTaskStartTime, lastTaskEndTime);

                        totalBreakMins += currBreakMins;

                        let toBeScheduled = Math.min(totalBreakMins, 30);

                        //let endOfBreak = Time.findEndTime(sortedArr[i].getEndTime(), [0, toBeScheduled]);
                        let endOfBreak = Time.findEndTime(lastTaskEndTime, [0, toBeScheduled]);

                        // This check is to be done for all tasks except the last one
                        if (!endOfBreak.equals(lastTaskEndTime) && i < sortedArr.length - 1) {
                            // If the break does end before the next fixed task
                            if (((endOfBreak.getHours() * 60) + endOfBreak.getMins()) <= ((sortedArr[i + 1].getStartTime().getHours() * 60) + sortedArr[i + 1].getStartTime().getMins())) {
                                //let newBreakWin = new Window("Break", parseInt(year), parseInt(month), parseInt(date), sortedArr[i].getEndTime(), endOfBreak, -1); //TODO: Breaks can just be type -1?

                                let newBreakWin = new Window("---- BREAK TIME ----", parseInt(year), parseInt(month), parseInt(date), lastTaskEndTime, endOfBreak, -1); //TODO: Breaks can just be type -1?

                                breakArr.push(newBreakWin);

                                totalBreakMins -= toBeScheduled;
                            // If the tasks are NOT back to back
                            } else {
                            //} else if (((sortedArr[i].getEndTime().getHours() * 60) + sortedArr[i].getEndTime().getMins()) != ((sortedArr[i + 1].getStartTime().getHours() * 60) + sortedArr[i + 1].getStartTime().getMins())) {

                                //let newBreakWin = new Window("Break", parseInt(year), parseInt(month), parseInt(date), sortedArr[i].getEndTime(), sortedArr[i + 1].getStartTime(), -1); //TODO: Breaks can just be type -1?

                                let newBreakWin = new Window("---- BREAK TIME ----", parseInt(year), parseInt(month), parseInt(date), lastTaskEndTime, sortedArr[i + 1].getStartTime(), -1); //TODO: Breaks can just be type -1?

                                breakArr.push(newBreakWin);

                                //let actualBreakMins = Time.duration(sortedArr[i].getEndTime(), sortedArr[i + 1].getStartTime());
                                let actualBreakMins = Time.duration(lastTaskEndTime, sortedArr[i + 1].getStartTime());

                                totalBreakMins -= actualBreakMins;
                            // If the tasks are back to back
                            // } else if (((sortedArr[i].getEndTime().getHours() * 60) + sortedArr[i].getEndTime().getMins()) == ((sortedArr[i + 1].getStartTime().getHours() * 60) + sortedArr[i + 1].getStartTime().getMins())) {

                            }
                        } else if (i == sortedArr.length - 1 && sortedArr[i].getEndTime() != endOfBreak) {
                            // Just schedule the break for the last task
                            let newBreakWin = new Window("---- BREAK TIME ----", parseInt(year), parseInt(month), parseInt(date), sortedArr[i].getEndTime(), endOfBreak, -1); //TODO: Breaks can just be type -1?

                            breakArr.push(newBreakWin);

                            totalBreakMins -= toBeScheduled;
                        }
                    }

                    //STEP 4: Insert the breaks into the final array so that it can be printed. 
                    for (let i = 0; i < breakArr.length; i++) {
                        for (let j = 0; j < sortedArr.length; j++) {
                            if ((breakArr[i].getStartTime()).equals(sortedArr[j].getEndTime())) {
                                sortedArr.splice(j + 1, 0, breakArr[i]);
                                j = sortedArr.length;
                            }
                        }
                    }

                    //STEP 5: Return the final array to be printed
                    return sortedArr;
            }
    </script>

</body>
</html>
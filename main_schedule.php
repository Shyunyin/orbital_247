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

    <script>
        // let ele = document.getElementById("scheduleForm");

        // let jsYear = document.createElement("input");
        // jsYear.type = "hidden";
        // jsYear.value = new Date().getFullYear();
        // jsYear.name = "jsYear";
        // ele.appendChild(jsYear);

        // let jsMonth = document.createElement("input");
        // jsMonth.type = "hidden";
        // jsMonth.value = new Date().getMonth();
        // jsMonth.name = "jsMonth";
        // ele.appendChild(jsMonth);

        // let jsDate = document.createElement("input");
        // jsDate.type = "hidden";
        // jsDate.value = new Date().getDate();
        // jsDate.name = "jsDate";
        // ele.appendChild(jsDate);
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

    <!--For the instructions on how to perform actions on tasks-->
    <div id="instruction">
        <!--For the background box-->
    </div>
    <div class="instruction">
        <h3>Click on any task to</h3>
        <h3>start, reschedule,</h3>
        <h3> edit or delete a task</h3>
    </div>

    <div class="actions"> 
        <h3>Actions:</h3>
        <div id="iconActions">
        </div>
    </div>

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
    </script>
    <script>
        // function printSchedule(scheduleArr) {
        //         console.log("printSchedule is called");
        //         /*To refresh schedule when generate button is clicked*/
        //         var block = document.getElementById("schedule");
        //         var blockRefresh = document.createElement("div");
        //         blockRefresh.id = "schedule";
        //         blockRefresh.innerHTML="";
        //         block.replaceWith(blockRefresh)
        //         for (let i=0; i < scheduleArr.length; i++) {
        //             console.log("Schedule is printed"); //debugging: function is accessed
        //         let block = document.getElementById("schedule");
        //         let maindivision = document.createElement("div"); //will contain both timedivision and namedivision
        //         maindivision.classList.add("maindiv"); 
        //         maindivision.style.float="left";
        //         maindivision.style.display="inline-block";
        //         block.appendChild(maindivision); //append a new main division
        //         let timedivision = document.createElement("div"); //creating the new division to contain item in schedule
        //         timedivision.classList.add("container1"); //classname of each item 
        //         maindivision.appendChild(timedivision); //appending timedivision to maindivision
        //     // //can continue adding css for division
        //     // /*Below will be what is appended to division: Time and itemName*/
        //     // /*Time*/
        //         let itemTime = document.createElement("input");
        //         itemTime.classList.add("time"); //time with class name time
        //         itemTime.setAttribute("readonly", "readonly"); //set to readonly
        //         itemTime.value = scheduleArr[i].getStartTime().toString() + " - " + scheduleArr[i].getEndTime().toString();
        //         //itemTime.value = scheduleArr[i].getStartTimeHours() + ":" + scheduleArr[i].getStartTimeMins() + "-" + scheduleArr[i].getEndTimeHours() + ":" + scheduleArr[i].getEndTimeMins();
        //         itemTime.style.fontFamily = "'Signika Negative', sans-serif";
        //         itemTime.style.fontSize = "large";
        //         itemTime.style.position = "relative";
        //         itemTime.style.zIndex = "3";
        //         itemTime.style.backgroundColor = "#96d6ed";
        //         itemTime.style.float="left";
        //         itemTime.style.border="none";
        //         itemTime.style.marginTop = "20px";
        //         itemTime.style.marginLeft = "15px";
        //         //can continue adding css for the time
        //         timedivision.appendChild(itemTime); //adding the time part of the item
        //     //     /*itemName*/
        //         let namedivision = document.createElement("div"); //creating the new division to contain item in schedule
        //         namedivision.classList.add("container2"); //classname of each item 
        //         namedivision.style.borderColor = "black";
        //         namedivision.style.position="relative";
        //         namedivision.style.display="inline-block";
        //         maindivision.appendChild(namedivision); //appending namedivision to maindivision
        //         let itemName = document.createElement("button");
        //         itemName.classList.add("itemName"); //class: itemName
        //         itemName.innerHTML = scheduleArr[i].getTaskName();
        //         itemName.style.fontFamily = "'Signika Negative', sans-serif";
        //         itemName.style.fontSize = "large";
        //         itemName.style.position = "absolute";
        //         itemName.style.zIndex = "3";
        //         itemName.style.cursor="pointer";
        //         itemName.style.border = "none";
        //         itemName.style.backgroundColor="#96d6ed";
        //         itemName.style.width = "200px";
        //         itemName.style.textAlign="center";             
        //         itemName.style.marginLeft= "200px";
        //         itemName.style.marginTop="7px";
        //         //can continue adding css for itemName
        //         namedivision.appendChild(itemName); //adding the name part of the item
        //         } 
        //     } 
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
<?php
    session_start();
    $serverName = "localhost";
    $dBUsername = "root";
    $dBPassword = "";
    $dBName = "orbital247";
    $conn = mysqli_connect($serverName, $dBUsername, $dBPassword, $dBName);
    $userid = (int) $_SESSION['userid'];
?>
<!DOCTYPE html>
<html>
<head>
    <title>Routine Page</title>
    <link rel="stylesheet" href="routine.css?v=<?php echo time();?>">
    <script type = "text/javascript" type="module" src="routine.js"></script>
    <script type = "text/javascript" type="module" src="Routine_Final.js"></script>
    <script type = "text/javascript" type="module" src="CombinedTime_Final.js"></script>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Signika+Negative:wght@600&display=swap" rel="stylesheet">
    <!-- For the icons --> 
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>
    <!--Main division for the background-->
    <div id="background">
        <div class="btn-group">
            <button class="button" onclick="schedule()">Schedule</button>
            <button class="button" onclick="statistics()">Statistics</button>
            <button class="button">Routine</button>
        </div>
        <div class="main"></div>
    </div>     

    <div id="routine">
        <h2> List of routine tasks: </h2>
        <div id="box"></div> 
        <div id="tasklist">
        </div> <!-- To be edited using function in routine.js after retrieving array, currently in routine.js --> 
        <input type="button" id="addTask" value="+" onclick="OpenPopupWindow();">
    </div>
    <div id="instruction">
        <!--For the background box-->
    </div>
    <div class="instruction">
        <h3>Click on a task to</h3>
        <h3>edit or delete it!</h3>
    </div>

    <form action = "copy_add_routine_task.php" method="POST" id="actions">
    <div id="iconActions">    
        <h3>Actions:</h3>
    </div>
    </form>

    <?php 
        //extract wakeup time
        $sql = "SELECT * FROM infowakeup WHERE id=$userid;";
        $result = mysqli_query($conn,$sql);
        if(!$result) {
        echo "Could not run query:" . mysqli_error($conn);
        exit();
        }
        $row = mysqli_fetch_row($result);
        $startHour = $row[0];
        $startMin = $row[1];

        //convert() to convert to 12hr format
        function convert($x) {
            if ($x > 12) {
                return ($x - 12);
            } else {
                return $x;
            }
        }
        
        //printword() to print am or pm 
        function printword($x) {
            if ($x >= 12) {
                echo "PM";
            } else if ($x == 24) { //special case of midnight
                echo "AM";
            } else {
                echo "AM";
            }
        }
        
        //printval() to print zero in front of single digit numbers
        function printval($var){
            if ($var < 10) {
            echo "0" .$var;
            } else {
            echo $var;
            }
        }
    ?>
    <div id="wakeup">
        <h2>Wake up time</h2>
        <input type="text" readonly="readonly" id="displayWakeup" value="<?php printval(convert($startHour)); echo (" : "); printval($startMin); echo (" "); printword($startHour);?>"> <!--To be retrieved from database-->
        <button class="btn" onclick="clickEditWakeup()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i></button>
    </div>

    <?php
        $query = "SELECT * FROM infoproductive WHERE id=$userid;";
        $result = mysqli_query($conn,$query);
        if(!$result) {
            echo "Could not run query:" . mysqli_error();
            exit();
        }
        $row = mysqli_fetch_row($result);
        $productiveStartHour = $row[0];
        $productiveStartMin = $row[1];
        $productiveEndHour = $row[2];
        $productiveEndMin = $row[3];
    ?> 

    <div id="productive">
        <h2>Productive time period</h2>
        <input type="text" readonly="readonly" id="displayProductive" value="<?php printval(convert($productiveStartHour)); echo (" : "); printval($productiveStartMin); echo (" "); printword($productiveStartHour);
        echo(" - "); printval(convert($productiveEndHour)); echo (" : "); printval($productiveEndMin); echo (" "); printword($productiveEndHour);?>"><!--To be retrieved from database-->
        <button class="btn" onclick="clickEditProductive()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i></button>
    </div>    

    <script>
        /*redirect(x) takes in the task name and outputs a pop out window with the input fields updated when the edit button is created*/
        function redirect(startHour, startMin, routineObject) {
            var currentNode = document.getElementById("iconActions");
            var newNode = document.createElement("div");
            newNode.id = "iconActions";
            newNode.innerHTML = 
            '<button class="btn" onclick="clickPlay()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-play-circle fa-2x" aria-hidden="true"></i></button>' +
            // '<button class="btn" onclick="clickReschedule()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-calendar fa-2x" aria-hidden="true"></i></button>' +
            '<button class="btn" type="submit" name="edit" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i></button>';
            // '<button class="btn" onclick="clickDelete()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-trash-o fa-2x" aria-hidden="true"></i></button>' ;
            //Replacing current iconsActions node w new iconActions node
            currentNode.replaceWith(newNode);
            
            var mainForm = document.getElementById("actions");

            //task Name
            var taskName = document.createElement("input");
            taskName.type = "hidden";
            taskName.value = routineObject.getTaskName();
            taskName.name = "taskName";
            mainForm.appendChild(taskName);

            //taskCategory
            var taskCategory = document.createElement("input");
            taskCategory.type = "hidden";
            taskCategory.value = routineObject.getTaskCategory();
            taskCategory.name = "taskCategory";
            mainForm.appendChild(taskCategory);

            //startTime
            var startTime = document.createElement("input");
            startTime.type = "hidden";
            startTime.value = printvaljs(routineObject.getStartTimeHours()) + ":" + printvaljs(routineObject.getStartTimeMins());
            startTime.name = "startTime";
            mainForm.appendChild(startTime);

            //endTime
            var endTime = document.createElement("input");
            endTime.type = "hidden";
            endTime.value = printvaljs(routineObject.getEndTimeHours()) + ":" + printvaljs(routineObject.getEndTimeMins());
            endTime.name = "endTime";
            mainForm.appendChild(endTime);

            //frequency
            var freq = document.createElement("input");
            freq.type = "hidden";
            freq.value = routineObject.getFreq();
            freq.name = "freq";
            mainForm.appendChild(freq);

            //taskDay
            var taskDay = document.createElement("input");
            taskDay.type = "hidden";
            taskDay.value = routineObject.getDay();
            taskDay.name = "taskDay";
            mainForm.appendChild(taskDay);

            //taskWeek
            var taskWeek = document.createElement("input");
            taskWeek.type = "hidden";
            taskWeek.value = routineObject.getWeek();
            taskWeek.name = "taskWeek";
            mainForm.appendChild(taskWeek);

            //taskDate 
            var taskDate  = document.createElement("input");
            taskDate .type = "hidden";
            taskDate .value = routineObject.getDate();
            taskDate .name = "taskDate ";
            mainForm.appendChild(taskDate);
        }

        function convertjs(i) {
            if (i > 12) {
                return (i - 12);
            } else {
                return i;
            }
        }

        //printword() to print am or pm 
        function printwordjs(i) {
            if (i >= 12) {
                return "PM";
            } else if (i == 24) { //special case of midnight
                return "AM";
            } else {
                return "AM";
            }
        }
        //printval() to print zero in front of single digit numbers
        function printvaljs(i){
                    if (i < 10) {
                        return "0" + i;
                    } else {
                        return i;
                    }
                }
        
        function checkDay(i) {
            var arr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            return arr[i];
        }

        function checkCat(i) {
            var arr = ['Work', 'Exercise', 'Miscellaneous', 'Meal Times'];
            return arr[i];
        }
        var taskName, taskCategory, startHour, startMin, endHour, endMin, freq, taskDay, taskWeek, taskDate, indentCount;

        function createRoutineList(printArr) { 
            console.log("I come to createRoutineList function");

            var count = 0; //for spaces between tasks
            //to form the statement to be printed

            for (let i = 0; i < printArr.length; i++) {
                var statement;
                if (printArr[i].getFreq() == 0) {
                    statement = "Daily: " + printvaljs(convertjs(printArr[i].getStartTimeHours())) + ":" + printvaljs(printArr[i].getStartTimeMins()) + printwordjs(printArr[i].getStartTimeHours()) + " - " + 
                    printvaljs(convertjs(printArr[i].getEndTimeHours())) + ":" + printvaljs(printArr[i].getEndTimeMins()) + printwordjs(printArr[i].getEndTimeHours()) + " " + printArr[i].getTaskName() + " " + "(" + checkCat(printArr[i].getTaskCategory()) + ")";
                } else if (printArr[i].getFreq() == 1) {
                    statement = "Weekly: " + checkDay(printArr[i].getDay()) + " " + printvaljs(convertjs(printArr[i].getStartTimeHours())) + ":" + printvaljs(printArr[i].getStartTimeMins()) + printwordjs(printArr[i].getStartTimeHours()) + " - " + 
                    printvaljs(convertjs(printArr[i].getEndTimeHours())) + ":" + printvaljs(printArr[i].getEndTimeMins()) + printwordjs(printArr[i].getEndTimeHours()) + " " + printArr[i].getTaskName() + " " + "(" + checkCat(printArr[i].getTaskCategory()) + ")";
                } else if (printArr[i].getFreq() == 2) {
                    statement = "Bieekly: " + checkDay(printArr[i].getDay()) + " " + printvaljs(convertjs(printArr[i].getStartTimeHours())) + ":" + printvaljs(printArr[i].getStartTimeMins()) + printwordjs(printArr[i].getStartTimeHours()) + " - " + 
                    printvaljs(convertjs(printArr[i].getEndTimeHours())) + ":" + printvaljs(printArr[i].getEndTimeMins()) + printwordjs(printArr[i].getEndTimeHours()) + " " + printArr[i].getTaskName() + " " + "(" + checkCat(printArr[i].getTaskCategory()) + ")";
                } else if (printArr[i].getFreq() == 3) {
                    statement = "Monthly, date: " + printArr[i].getDate() + " " + printvaljs(convertjs(printArr[i].getStartTimeHours())) + ":" + printvaljs(printArr[i].getStartTimeMins()) + printwordjs(printArr[i].getStartTimeHours()) + " - " + 
                    printvaljs(convertjs(printArr[i].getEndTimeHours())) + ":" + printvaljs(printArr[i].getEndTimeMins()) + printwordjs(printArr[i].getEndTimeHours()) + " " + printArr[i].getTaskName() + " " + "(" + checkCat(printArr[i].getTaskCategory()) + ")";
                }
                    console.log(statement); //debugging

                    let append = document.createElement("input");
                    append.setAttribute("type", "button");
                    append.setAttribute("value", statement);
                    // append.setAttribute("readonly", "readonly");
                    append.addEventListener('click', function() {
                        redirect(startHour, startMin, printArr[i]);
                    }); 

                    // append.setAttribute("onclick", "redirect(name)"); //x is the variable that contains the taskname
                    append.classList.add("task");
                    append.style.fontFamily = "'Signika Negative', sans-serif";
                    append.style.fontSize = "large";
                    append.style.position = "absolute";
                    append.style.zIndex = "2";
                    append.style.color = "blac";
                    append.style.backgroundColor = "#96d6ed";
                    append.style.border = "none";
                    append.style.marginLeft = "15px";
                    append.style.height = "25px";
                    append.style.cursor="pointer";
                    //calculation to ensure that tasks printed on top of each other
                    let top = count * 30;
                    let topText = top + "px";
                    append.style.marginTop = topText;
                    let ele = document.getElementById("tasklist");
                    ele.appendChild(append);
            }
        }
        
        window.onload = function() {
            var printArr[]; //array to store 
            <?php
                //retrieving data for display in routine task box
                $data = "SELECT * FROM routinetask WHERE id=$userid"; 
                $result = mysqli_query($conn, $data);
                if(!$result) {
                    echo "Could not run query:" . mysqli_error($conn);
                    exit();
                } else {
                    $resultCheck = mysqli_num_rows($result);
                    $dataArr = array();
                    if ($resultCheck > 0) {
                        //echo "console.log("I have at least 1 result")"
                        while ($row = mysqli_fetch_assoc($result)) { //for every row in the list of rows, print to routine task list
                            $dataArr[] = $row;
                        }
                    }
                        $arrLength = count($dataArr);
                        $indentCount = 0; //this number will increase when it enters the loop to indicate that an indentation or spacing has to be made

                        foreach ($dataArr as $row) {
                            $taskName = $row['taskName'];
                            echo "taskName = '$taskName';";
                            $taskCategory = $row['taskCategory'];
                            echo "taskCategory = parseInt($taskCategory);";
                            $startHour = $row['startTimeHour'];
                            echo "startHour = parseInt($startHour);";
                            $startMin = $row['startTimeMin'];
                            echo "startMin = parseInt($startMin);";
                            $endHour = $row['endTimeHour'];
                            echo "endHour = parseInt($endHour);"; 
                            $endMin = $row['endTimeMin']; 
                            echo "endMin = parseInt($endMin);";
                            $freq = $row['freq'];
                            echo "freq = parseInt($freq);";
                            $taskDay = $row['taskDay'];
                            echo "taskDay = parseInt($taskDay);";
                            $taskWeek = $row['week'];
                            echo "taskWeek = parseInt($taskWeek);";
                            $taskDate = $row['taskDate'];
                            echo "taskDate = parseInt($taskDate);";

                            if ($freq == 0) {
                                echo "new routine = DailyTask(taskName, taskCategory, new Time(startHour, startMin), new Time(endHour, endMin));";
                            } else if ($freq == 1) {
                                echo "new routine = WeeklyTask(taskName, taskCategory, new Time(startHour, startMin), new Time(endHour, endMin), taskDay);";
                            } else if ($freq == 2) {
                                echo "new routine = BiweeklyTask(taskName, taskCategory, new Time(startHour, startMin), new Time(endHour, endMin), taskDay, taskWeek);";
                            } else if ($freq == 3) {
                                echo "new routine = MonthlyTask(taskName, taskCategory, new Time(startHour, startMin), new Time(endHour, endMin), taskDate);";
                            }

                            echo "printArr.push(routine)";
                        }                             

                        echo "createRoutineList(printArr);"; //to send array as parameter to createRoutineList to print
                    }
            ?>
        }
        
        // /*createRoutinelist(): Create an option in the routine task list stick*/
        
    
    </script>
</body>
</html>
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
        <script type = "text/javascript" type="module" src="RoutineWindow.js"></script>
        <script type = "text/javascript" type="module" src="Window.js"></script>
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
            <div id="box">
                <!-- <div id="tasklist">  -->
                 <!--</div> To be edited using function in routine.js after retrieving array, currently in routine.js --> 
            </div> 
            <input type="button" id="addTask" value="+" onclick="OpenPopupWindow();">
        </div>

        <div id="instruction">
            <!--For the background box-->
        </div>
        <div class="instruction">
            <h3>Click on a task to</h3>
            <h3>edit or delete it!</h3>
            <h3>Actions:</h3>
        </div>
        <form action = "copy_add_routine_task.php" method="POST" id="action">
            <div id="actions">
                <div id="iconActions">    
                </div>
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
            echo(" - "); printval(convert($productiveEndHour)); echo (" : "); printval($productiveEndMin); echo (" "); printword($productiveEndHour);?>"> <!--To be retrieved from database-->
            <button class="btn" onclick="clickEditProductive()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i></button>
        </div>    

        <script>
            function tempFixed() { //only reschedule, edit and delete
                var currentNode = document.getElementById("iconActions");
                var newNode = document.createElement("div");
                newNode.id = "iconActions";
                newNode.innerHTML = 
                '<button class="btn" onclick="clickPlay()" style="cursor=pointer;background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-play-circle fa-2x" aria-hidden="true"></i></button>' +
                // '<button class="btn" onclick="clickReschedule()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-calendar fa-2x" aria-hidden="true"></i></button>' +
                '<button class="btn" type="submit" name="edit" style="cursor=pointer;background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i></button>';
                // '<button class="btn" onclick="clickDelete()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-trash-o fa-2x" aria-hidden="true"></i></button>' ;
                //Replacing current iconsActions node w new iconActions node
                currentNode.replaceWith(newNode);
            }

            /*redirect(x) takes in the task name and outputs a pop out window with the input fields updated when the edit button is created*/
            function redirect(routineObject) {
                var startTimeHour = routineObject.startTime.getHours();
                var startTimeMin = routineObject.startTime.getMins();
                var endTimeHour = routineObject.endTime.getHours();
                var endTimeMin = routineObject.endTime.getMins();

                var currentNode = document.getElementById("iconActions");
                var newNode = document.createElement("div");
                newNode.id = "iconActions";
                newNode.innerHTML = 
                '<button class="btn" onclick="clickPlay()" style="cursor:pointer;background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-play-circle fa-2x" aria-hidden="true"></i></button>' +
                // '<button class="btn" onclick="clickReschedule()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-calendar fa-2x" aria-hidden="true"></i></button>' +
                '<button class="btn" type="submit" name="edit" style="cursor:pointer;background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i></button>';
                // '<button class="btn" onclick="clickDelete()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-trash-o fa-2x" aria-hidden="true"></i></button>' ;
                //Replacing current iconsActions node w new iconActions node
                currentNode.replaceWith(newNode);
                
                let mainForm = document.getElementById("actions");

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
                startTime.value = printvaljs(startTimeHour) + ":" + printvaljs(startTimeMin);
                startTime.name = "startTime";
                mainForm.appendChild(startTime);

                //endTime
                var endTime = document.createElement("input");
                endTime.type = "hidden";
                endTime.value = printvaljs(endTimeHour) + ":" + printvaljs(endTimeMin);
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
                taskDay.value = routineObject.getTaskDay();
                taskDay.name = "taskDay";
                mainForm.appendChild(taskDay);

                //taskWeek
                var taskWeek = document.createElement("input");
                taskWeek.type = "hidden";
                taskWeek.value = routineObject.getTaskWeek();
                taskWeek.name = "taskWeek";
                mainForm.appendChild(taskWeek);

                //taskDate 
                var taskDate  = document.createElement("input");
                taskDate .type = "hidden";
                taskDate .value = routineObject.getTaskDate();
                taskDate .name = "taskDate ";
                mainForm.appendChild(taskDate);
            }


             function generateRoutineList() { 
                let printArr =[]; //array to store 
                let taskName, taskCategory, startTimeHour, startTimeMin, endTimeHour, endTimeMin, freq;
                let taskDay = -1;
                let taskWeek = -1;
                let taskDate = -1;    
                    <?php
                        $user = 'root'; 
                        $pass = '';
                        $db='orbital247';
                        $conn = mysqli_connect('localhost', $user, $pass, $db);
                        $userid = $_SESSION["userid"];
           
                        $sql = "SELECT * FROM routinetask WHERE userid = $userid"; //Obtain all the routine task for the user

                        $result = mysqli_query($conn, $sql);

                        if ($result) {
                            $resultCheck = mysqli_num_rows($result);
                            $data = array();
                            if ($resultCheck > 0) {
                                while ($row = mysqli_fetch_assoc($result)) {
                                    $data[] = $row;   
                                }   
                            }
                            foreach($data as $row) {
                                $name = $row['taskName'];
                                echo "taskName = '$name';";
                                $cat = $row['taskCategory'];
                                echo "taskCategory = $cat;";
                                $startTimeHour = $row['startTimeHour'];
                                echo "startTimeHour = parseInt($startTimeHour);";
                                $startTimeMin = $row['startTimeMin'];
                                echo "startTimeMin = parseInt($startTimeMin);";
                                $endTimeHour = $row['endTimeHour'];
                                echo "endTimeHour = parseInt($endTimeHour);";
                                $endTimeMin = $row['endTimeMin'];
                                echo "endTimeMin = parseInt($endTimeMin);";
                                $freq = $row['freq'];
                                echo "freq = $freq;";
                                if ($freq == 0) { //daily
                                    echo 'routineWin = new RoutineWindow(taskName, taskCategory, new Time(startTimeHour, startTimeMin), new Time(endTimeHour, endTimeMin), freq, -1, -1, -1);';
                                    echo 'printArr.push(routineWin);';
                                } else if ($freq == 1) { //weekly
                                    $taskDay = $row['taskDay'];
                                    echo "taskDay = $taskDay;";
                                    echo 'routineWin = new RoutineWindow(taskName, taskCategory, new Time(startTimeHour, startTimeMin), new Time(endTimeHour, endTimeMin), freq, taskDay, -1, -1);';
                                    echo 'printArr.push(routineWin);';
                                } else if ($freq == 2) { //biweekly
                                    $taskDay = $row['taskDay'];
                                    echo "taskDay = $taskDay;";
                                    $taskWeek = $row['week'];
                                    echo "taskWeek = $taskWeek;";
                                    echo 'routineWin = new RoutineWindow(taskName, taskCategory, new Time(startTimeHour, startTimeMin), new Time(endTimeHour, endTimeMin), freq, taskDay, taskWeek, -1);';
                                    echo 'printArr.push(routineWin);';
                                } else { //monthly
                                    $taskDate = $row['taskDate'];
                                    echo "taskDate = $taskDate;";
                                    echo 'routineWin = new RoutineWindow(taskName, taskCategory, new Time(startTimeHour, startTimeMin), new Time(endTimeHour, endTimeMin), freq, -1, -1, taskDate);';
                                    echo 'printArr.push(routineWin);';
                                }
                            }
                        }
                    ?>
                    return printArr;
                }
        </script>
    </body>
</html>
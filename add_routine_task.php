<?php
    session_start();
    echo session_id();
    //include "../includes/dbh.inc.php";
    // include "../includes/functions.inc.php";
?>
<!DOCTYPE html>
<html>
<head>
    <title>Add routine task</title>
    <script type="text/javascript" type="module" src="add_routine_task.js"></script>
    <!--<script type="text/javascript" type="module" src="Routine_Final.js"></script>-->
    <script type="text/javascript" type="module" src="Window.js"></script>
    <link rel="stylesheet" href="add_routine_task.css" />
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Signika+Negative:wght@600&display=swap" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body style="background-color: #f6f7f1; margin: 50px; border: 5px; border-color: #C4C4C4;">
    <!-- <form action="../includes/add_routine_task_inc.php" method="POST"> -->
    <!-- Parent-child relationship for inline-->
    <form action="includes/add_routine_task.inc.php" method="POST">
    <div id="title">
        <li>
            <h3>Add a routine task:</h3>
        </li>
        <!-- INPUT for taskName-->
        <li>
            <form action="includes/add_routine_task.inc.php" method="POST">
                <input type="text" id="taskName" name="taskName" size="70" oninput="Update(this.value,'name')"><br>
            </form>
        </li>
    </div>

    <div id="categories">
        <li>
            <h3>Category:</h3>
        </li>
        <!-- Buttons for categories-->
        <li>
            <form class="btn-group-category">
                <input type="button" id="work" onclick="catFunction(0);Update(0,'category');" value="Work">
                <input type="button" id="exercise" onclick="catFunction(1);Update(1,'category');" value="Exercise">
                <input type="button" id="misc" onclick="catFunction(2);Update(2,'category');" value="Miscellaneous">
                <input type="button" id="meal" onclick="catFunction(3);Update(3,'category');" value="Meal Times">
            </form>
        </li>
    </div>
    
    <!-- For frequency-->
    <div class="frequency">
        <h3>Recurring frequency: </h3>
        <div class="ul">
            <li>
                <!--<input type="radio" id="daily" name="choose" value="daily">-->
                <input type="radio" id="daily" name="choose" value="daily" onchange="ShowHideDiv();">
                <label for="daily">Daily</label>
            </li>
            <li>
                <!--<input type="radio" id="weekly" name="choose" value="weekly" onchange="showList('weekly', this);">-->
                <input type="radio" id="weekly" name="choose" value="weekly" onchange="ShowHideDiv();">
                <label for="weekly">Weekly</label>
            </li>
            <li>
                <!--<input type="radio" id="biweekly" name="choose" value="biweekly" onchange="showList('biweekly', this);">-->
                <input type="radio" id="biweekly" name="choose" value="biweekly" onchange="ShowHideDiv();">
                <label for="biweekly">Biweekly</label>
            </li>
            <script>
                function ShowHideDiv() {
                    var instruction = document.getElementById("instruction");
                    weeklydropdown.style.display = "none";
                    biweeklydropdown.style.display = "none";
                    instruction.style.display = "none";

                    if (weekly.checked) {
                        showList('weekly', this);
                    } else if (biweekly.checked) {
                        showList('biweekly', this);
                    } else if (monthly.checked) {
                        instruction.style.display = "block";
                        showList('monthly', this);
                    }
                }
            </script>
            <li>
                <input type="radio" id="monthly" name="choose" value="monthly" onchange="ShowHideDiv();">
                <label for="monthly">Monthly</label>
                <h5 id="instruction" class="instruction" style="display: none;">Please key in a number from 1-31</h5>
            </li>
        </div>
        <!--For the dropdown lists-->
        <!--Use javascript to replace??-->
        <div class="dropdown">
            <li>
            <!-- <form action="" method="POST"> -->
                <select id="weeklydropdown" name="weeklydropdown" oninput="Update(this.value,'weekly')" style="display: none;">
                    <option value="" selected disabled hidden>Choose a day</option>
                    <option value="1">Monday</option>
                    <option value="2">Tuesday</option>
                    <option value="3">Wednesday</option>
                    <option value="4">Thursday</option>
                    <option value="5">Friday</option>
                    <option value="6">Saturday</option>
                    <option value="0">Sunday</option>
                </select>
            <!-- </form> -->
            </li>
            <li>
            <!-- <form action="" method="POST">     -->
                <select id="biweeklydropdown" name="biweeklydropdown" oninput="Update(this.value,'biweekly')" style="display: none;">
                    <!--Can replace w javascript??-->
                    <option value="" selected disabled hidden>Choose a day</option>
                    <option value="1">Monday</option>
                    <option value="2">Tuesday</option>
                    <option value="3">Wednesday</option>
                    <option value="4">Thursday</option>
                    <option value="5">Friday</option>
                    <option value="6">Saturday</option>
                    <option value="0">Sunday</option>
                </select>
            <!-- </form> -->
            <!-- <form action="" method="POST"> -->
                <select id="chooseWeeks" name="chooseWeeks" oninput="Update(this.value,'biweeklychoose')" style="display: none;">
                    <option value="" selected disabled hidden>Current/Next</option>
                    <option value="0">Current Week</option>
                    <option value="1">Next Week</option>
                </select>
            <!-- </form> -->
            </li>
            <li>
                <input type="number" id="date" name="date" min="1" max="31" oninput="Update(this.value,'date')" style="display: none;">
                <!--<h5 id="instruction" class="instruction" style="display: none;">Please key in a number from 1-31</h5>-->
            </li>
        </div>
    </div>

    <!--Time options-->
    <div id="timeOptions">
        <li>
            <div class="startTime">
                <h3>Start time:</h3>
                <input type="time" id="startTime" name="startTime" oninput="Update(this.value, 'start')">
            </div>
        </li>
        <li>
            <div class="endTime">
                <h3>End time:</h3>
                <input type="time" id="endTime" name="endTime" oninput="Update(this.value, 'end')">
            </div>
        </li>
    </div>

          <!--Buttons for ADD, DONE-->
    <div class="btn-group-actions">
        <!--<button id="add" onclick="Add(); newWindow();">Submit and Add another routine task</button>-->
        <!-- $taskName = "test"; -->
        <button id="add" onclick="Add();">Submit and Add another routine task</button>
        <form action="includes/add_routine_task.inc.php" method="POST">
            <button type ="submit" name="submitTask" id="done" onclick="Done();">Submit and Done adding ALL routine tasks</button>
        </form>
        <!-- wakeupSchedule(); --> 
    </div>

</form>

    <form method="POST" style="display:none" id="hidden">
    </form>


    <script>
        let NameOfTask = document.getElementById("taskName").value; //main taskName input
        //category number can get from category_num in the other javascript file
        let Start = document.getElementById("startTime");
        let StartArr = [parseInt(Start.value.substr(0, 2)), parseInt(Start.value.substr(3, 4))]; //main array for start time
        let End = document.getElementById("endTime"); 
        let EndArr = [parseInt(End.value.substr(0, 2)), parseInt(End.value.substr(3, 4))]; //main array for end time
        let Freq = 0;
        /*checkRadioValue() function returns the freq number:
         * Daily: 0, weekly: 1, biweekly: 2, monthly: 3
        */
        function checkRadioValue() { 
            console.log("i come here to checkRadioValue()")
            var radio = document.getElementsByName("choose");
            for(var i = 0; i <radio.length; i++) {
                //check which radio is checked
                if(radio[i].checked){ 
                    return i;
                }
            }
        }
        let freq_num = checkRadioValue();
        //for now freq_num and taskCategory has no update function so they are saved as it is first
       
        let SpecificFreqTwo = "null"; //referencing only for biweekly 
        let SpecificFreq;
        /*getFreq(): returns the ID of the frequency to retried*/
        function getFreq(freq_num) {
            if (freq_num === 1) {
                SpecificFreq = document.getElementById("weeklydropdown");
            } else if (freq_num === 2) {
                SpecificFreq = document.getElementById("biweeklydropdown");
                SpecificFreqTwo = document.getElementById("chooseWeeks");
            } else if (freq_num === 3) {
                SpecificFreq = document.getElementById("date");
            }
        }

        //TODO: To be confirmed with Shyun Yin
        let nameOfTask, start, startArr, end, endArr, cat_num, startHour, startMin, endHour, endMin;
        //let freq = 0
        let date = null;
        let day = null;
        let week = null;
        cat_num = category_num; //retrieve from add_routine_task.js
        function Update(val, type) {
            if(type=='name') {
                nameOfTask=val;
            } else if(type=='start') {
                start=val;
                startArr = [parseInt(start.substr(0, 2)), parseInt(start.substr(3, 4))];
                startHour = startArr[0];
                startMin = startArr[1];
            } else if(type=='end') {
                end=val;
                endArr = [parseInt(end.substr(0, 2)), parseInt(end.substr(3, 4))];
                endHour = endArr[0];
                endMin = endArr[1];
            } else if(type=='weekly') {
                day = val;
                freq_num = 1;
                //freq = 1;
            } else if (type=='biweekly') {
                day = val;
                freq_num = 2;
                //freq = 2;
            } else if (type=='biweeklychoose') {
                week = val;
            } else if (type=='date') {
                date = val;
                freq_num = 3;
                //freq = 3;
            } else if (type=='category') {
                cat_num = val;
            }
            
            var name = document.createElement("input");
            name.type = "text"
            name.innerHTML = nameOfTask;
            name.name = "name";
            var ele = document.getElementById("hidden");
            ele.appendChild(name); 

            var category = document.createElement("input");
            category.type = "text"
            category.innerHTML = cat_num;
            category.name = "cat_num";
            var ele = document.getElementById("hidden");
            ele.appendChild(category); 
        }

        function Done() {
            <?php
            // if (isset($_POST["submit"])) {
                // $taskCategory = $_POST["cat_num"];
            // if (isset($_POST["taskName"])) {
                // $taskName = $_POST["taskName"];
                // echo "$taskCategory";
                // $sql = "INSERT INTO routinetask(taskName, taskCategory, startTimeHour, startTimeMin, endTimeHour, endTimeMin, freq, taskDay, week, taskDate, userid) VALUES ('$taskName', 1, 1, 1, 1, 1, 1, 1, 1, 1, -1);";
                // $serverName = "localhost";
                // $dBUsername = "root";
            //     $dBPassword = "";
            //     $dBName = "orbital247";

            //     $conn = mysqli_connect($serverName, $dBUsername, $dBPassword, $dBName);

            //     mysqli_query($conn, $sql);
            // }
             
            // } 
            // else {
                // header("location: ../login.php");
                // exit();
            // }
                // $taskName = $_POST["taskName"];
                // echo($taskName);
                
                //$taskName = "document.write(nameOfTask);";
                /*
                $taskCategory = "document.write(cat_num);";
                $startTimeHour = (int) "document.write(startHour);";
                $startTimeMin = (int) "document.write(startMin);";
                $endTimeHour = (int) "document.write(endHour);";
                $endTimeMin = (int) "document.write(endMin);";
                $freq = (int) "document.write(0);";
                //$freq = (int) "document.write(freq_num);";
                $day = (int) "document.write(day);";
                $week = (int) "document.write(week);";
                $date = (int) "document.write(date);";
                $user = (int) "document.write(-1);";
                */
                //$sql = "INSERT INTO routinetask(taskName, taskCategory, startTimeHour, startTimeMin, endTimeHour, endTimeMin, freq, taskDay, week, taskDate, userid) VALUES ($taskName, '$taskCategory', $startTimeHour, $startTimeMin, $endTimeHour, $endTimeMin, $freq, $day, $week, $date, $user);";

              

                // if (mysqli_query($conn, $sql)) {
                //     echo "Record added!";
                // }
                // } else {
                //     echo "Record cannot be added!";
                //     //echo "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
                // }
                //echo ($taskName);
                // echo ($startTimeHour);
                // echo ($startTimeMin);
                // echo ($endTimeHour);
                // echo ($endTimeMin);
                // echo ($freq);
                // echo ($day);
                // echo ($week);
                // echo ($date);
                // echo ($user);
                //echo "'TaskCategory' Is data type - ".gettype($taskCategory);
            ?>   
            console.log("Name of task: " + nameOfTask);
            console.log("cat_num: " + cat_num);
            console.log("start hour:" + startHour);
            console.log("start min:" + startMin);
            console.log("end hour: "+ endHour);
            console.log("end min: " + endMin);
            console.log("freq: " + freq_num);
            console.log("day: " + day);
            console.log("week: " + week);
            console.log("date: " + date);
        }
    </script>

</body>
</html>
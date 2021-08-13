<?php
    session_start();
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Add routine task</title>
        <script type="text/javascript" type="module" src="copy_add_routine_task.js"></script>
        <script type="text/javascript" type="module" src="Window.js"></script>

        <link rel="stylesheet" href="add_routine_task.css?v=<?php echo time();?>">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Signika+Negative:wght@600&display=swap" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>

    <!--Retrieve data of selected task-->
    <?php
    $userid = $_SESSION['userid'];
        if (isset($_POST['edit'])) {
            $taskName = $_POST['taskName'];
            $taskCategory = $_POST['taskCategory'];
            echo "catFunction($taskCategory)"; //to run catFunction to make selected button white first
            $startTime = $_POST['startTime'];
            $endTime = $_POST['endTime'];
            $freq = $_POST['freq'];
            $taskDay = $_POST['taskDay'];
            $taskWeek = $_POST['taskWeek'];
            $taskDate = $_POST['taskDate']; 
        }
    ?>

    <body style="background-color: #f6f7f1; margin: 50px; border: 5px; border-color: #C4C4C4;">
        <!-- Parent-child relationship for inline-->
        <form action="includes/add_routine_task.inc.php" method="POST" id="bigForm">
            <div id="title">
                <li>
                <h3>Do fill in all fields even if they are already displayed!</h3>
                    <h3>Add a routine task:</h3>
                </li>
                <!-- INPUT for taskName-->
                <li>
                    <input type="text" id="taskName" name="taskName" size="70" oninput="Update(this.value,'name')" value="<?php echo "$taskName";?>"><br>
                </li>
            </div>

            <!--include cat buttons!!-->
            <div id="categories">
                <li>
                    <h3>Category:</h3>
                </li>
                <!-- Buttons for categories-->
                <li>
                    <input type="button" id="work" onclick="catFunction(0);Update(0,'category');" value="Work">
                    <input type="button" id="exercise" onclick="catFunction(1);Update(1,'category');" value="Exercise">
                    <input type="button" id="misc" onclick="catFunction(2);Update(2,'category');" value="Miscellaneous">
                    <input type="button" id="meal" onclick="catFunction(3);Update(3,'category');" value="Meal Times">
                </li>
            </div>
        
            <!-- For frequency-->
            <div class="frequency">
                <h3>Recurring frequency: </h3>
                <div class="ul">
                    <li>
                        <input type="radio" id="daily" name="choose" value="daily" onchange="ShowHideDiv();" oninput="Update(0,'daily')">
                        <label for="daily">Daily</label>
                    </li>
                    <li>
                        <input type="radio" id="weekly" name="choose" value="weekly" onchange="ShowHideDiv();">
                        <label for="weekly">Weekly</label>
                    </li>
                    <li>
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
                <div class="dropdown">
                    <li>
                        <select id="weeklydropdown" name="weeklydropdown" oninput="Update(this.value,'weekly')" style="display: none;" value="<?php echo $taskDay;?>">
                            <option value="1">Monday</option>
                            <option value="2">Tuesday</option>
                            <option value="3">Wednesday</option>
                            <option value="4">Thursday</option>
                            <option value="5">Friday</option>
                            <option value="6">Saturday</option>
                            <option value="0">Sunday</option>
                        </select>
                    </li>
                    <li>
                        <select id="biweeklydropdown" name="biweeklydropdown" oninput="Update(this.value,'biweekly')" style="display: none;" value="<?php echo $taskDay;?>">
                            <option value="1">Monday</option>
                            <option value="2">Tuesday</option>
                            <option value="3">Wednesday</option>
                            <option value="4">Thursday</option>
                            <option value="5">Friday</option>
                            <option value="6">Saturday</option>
                            <option value="0">Sunday</option>
                        </select>
        
                        <select id="chooseWeeks" name="chooseWeeks" oninput="Update(this.value,'biweeklychoose')" style="display: none;" value="<?php echo $taskWeek;?>">
                            <option value="0">Current Week</option>
                            <option value="1">Next Week</option>
                        </select>
                    </li>
                    <li>
                        <input type="number" id="date" name="date" min="1" max="31" oninput="Update(this.value,'date')" style="display: none;" value="<?php echo $taskDate;?>">
                    </li>
                </div>
            </div>

            <!--Time options-->
            <div id="timeOptions">
                <li>
                    <div class="startTime">
                        <h3>Start time:</h3>
                        <input type="time" id="startTime" name="startTime" oninput="Update(this.value, 'start')" value="<?php echo "$startTime";?>">
                    </div>
                </li>
                <li>
                    <div class="endTime">
                        <h3>End time:</h3>
                        <input type="time" id="endTime" name="endTime" oninput="Update(this.value, 'end')" value="<?php echo "$endTime";?>">
                    </div>
                </li>
            </div>

            <!--Buttons for ADD, DONE-->
            <div class="btn-group-actions">
                <button type="submit" name="add" id="add">Delete this routine task</button>
                <button type="submit" name="done" id="done">Done</button>
            </div>
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

            let nameOfTask, start, startArr, end, endArr, cat_num, startHour, startMin, endHour, endMin;
            //let freq = 0
            let date = null;
            let day = null;
            let week = null;
            cat_num = category_num; //retrieve from add_routine_task.js
            function Update(val, type) {
                var ele = document.getElementById("bigForm");
                if(type=='name') {
                    nameOfTask=val;
                } else if(type=='start') {
                    start=val;
                    startArr = [parseInt(start.substr(0, 2)), parseInt(start.substr(3, 4))];
                    startHour = startArr[0];
                    startMin = startArr[1];

                    var jsStartHour = document.createElement("input");
                    jsStartHour.type = "hidden";
                    jsStartHour.value = startHour;
                    jsStartHour.name = "jsStartHour";
                    ele.appendChild(jsStartHour);

                    var jsStartMin = document.createElement("input");
                    jsStartMin.type = "hidden";
                    jsStartMin.value = startMin;
                    jsStartMin.name = "jsStartMin";
                    ele.appendChild(jsStartMin);

                } else if(type=='end') {
                    end=val;
                    endArr = [parseInt(end.substr(0, 2)), parseInt(end.substr(3, 4))];
                    endHour = endArr[0];
                    endMin = endArr[1];

                    var jsEndHour = document.createElement("input");
                    jsEndHour.type = "hidden";
                    jsEndHour.value = endHour;
                    jsEndHour.name = "jsEndHour";
                    ele.appendChild(jsEndHour);

                    var jsEndMin = document.createElement("input");
                    jsEndMin.type = "hidden";
                    jsEndMin.value = endMin;
                    jsEndMin.name = "jsEndMin";
                    ele.appendChild(jsEndMin);
                } else if (type=='daily') {
                    freq_num = 0;
                    var jsFreq = document.createElement("input");
                    jsFreq.type = "hidden";
                    jsFreq.value = freq_num;
                    jsFreq.name = "jsFreq";
                    ele.appendChild(jsFreq);

                } else if(type=='weekly') {
                    day = val;
                    freq_num = 1;
                    var jsDay = document.createElement("input");
                    jsDay.type = "hidden";
                    jsDay.value = day;
                    jsDay.name = "jsDay";
                    ele.appendChild(jsDay);

                    var jsFreq = document.createElement("input");
                    jsFreq.type = "hidden";
                    jsFreq.value = freq_num;
                    jsFreq.name = "jsFreq";
                    ele.appendChild(jsFreq);

                } else if (type=='biweekly') {
                    day = val;
                    freq_num = 2;
                    var jsDay = document.createElement("input");
                    jsDay.type = "hidden";
                    jsDay.value = day;
                    jsDay.name = "jsDay";
                    ele.appendChild(jsDay);

                    var jsFreq = document.createElement("input");
                    jsFreq.type = "hidden";
                    jsFreq.value = freq_num;
                    jsFreq.name = "jsFreq";
                    ele.appendChild(jsFreq);

                } else if (type=='biweeklychoose') {
                    week = val;
                    var jsWeek = document.createElement("input");
                    jsWeek.type = "hidden";
                    jsWeek.value = week;
                    jsWeek.name = "jsWeek";
                    ele.appendChild(jsWeek);

                } else if (type=='date') {
                    date = val;
                    freq_num = 3;
                    var jsDate = document.createElement("input");
                    jsDate.type = "hidden";
                    jsDate.value = date;
                    jsDate.name = "jsDate";
                    ele.appendChild(jsDate);

                    var jsFreq = document.createElement("input");
                    jsFreq.type = "hidden";
                    jsFreq.value = freq_num;
                    jsFreq.name = "jsFreq";
                    ele.appendChild(jsFreq);

                } else if (type=='category') {
                    cat_num = val;
                    var jsCat = document.createElement("input");
                    jsCat.type = "hidden";
                    jsCat.value = cat_num;
                    jsCat.name = "jsCat";
                    ele.appendChild(jsCat);
                }
            }
        </script>

        <!-- The below script will be loaded when the page loads and fill in the input fields by retrieving from php-->
        <script>
            window.onload = function() {
                var startHour = localStorage.getItem("startTimeHour");
                var startMin = localStorage.getItem("startTimeMin");

                var main = document.getElementById("bigForm");

                var hourPhp = document.createElement("input");
                hourPhp.type = "hidden";
                hourPhp.value = startHour;
                hourPhp.name = "hourPhp";
                main.appendChild(hourPhp);

                var minPhp = document.createElement("input");
                minPhp.type = "hidden";
                minPhp.value = startMin;
                minPhp.name = "minPhp";
                main.appendChild(minPhp);

                document.getElementById("hidden").submit(); //to submit the form to retrieve previous data

                Retrieve_Database_Info(); //debugging: working
            }

            var taskName, taskCategory, startTimeHour, startTimeMin, endTimeHour, endTimeMin, freq, taskDay, taskWeek, taskDate;

            function Retrieve_Database_Info() {
                // console.log("Retrieve data to fill up form");
                console.log(taskName + " is in retrieve database info!");

                /*For the setting of values to fill in the fields*/
                document.getElementById("taskName").value = taskName; 
                catFunction(taskCategory);//call function for change in colour of button
                //Logic to settle which radio button is clicked
                if (freq == 1) {
                    document.querySelector("#daily").checked = true;
                } else if (freq == 2) {
                    document.querySelector("#weekly").checked = true;
                    document.getElementById("weeklydropdown").selectedIndex = taskDay;
                } else if (freq == 3) {
                    document.querySelector("#biweekly").checked = true;          
                    document.getElementById("biweeklydropdown").selectedIndex = taskDay;
                    document.getElementById("chooseWeeks").selectedIndex = taskWeek;
                } else if (freq == 4) {
                    document.querySelector("#monthly").checked = true;
                    document.getElementById("date").value = taskDate;
                }
                ShowHideDiv(); //function to run to display the hidden dropdown
                document.getElementById("startTime").value = printvaljs(startTimeHour) + ":" + printvaljs(startTimeMin);
                document.getElementById("endTime").value = printvaljs(endTimeHour) + ":" + printvaljs(endTimeMin);
                console.log(taskName); //debugging
            }
        </script>
    </body>
</html>
<?php
    session_start();
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Add routine task</title>
        <script type="text/javascript" type="module" src="add_routine_task.js"></script>
        <script type="text/javascript" type="module" src="Window.js"></script>
        <link rel="stylesheet" href="add_routine_task.css" />
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Signika+Negative:wght@600&display=swap" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>

    <script>
        function popupFunction() {
            window.alert("Please input your routine tasks such as exercise times, meal times, daily, weekly, biweekly or monthly events!");
        }    
    </script>

    <body style="background-color: #f6f7f1; margin: 50px; border: 5px; border-color: #C4C4C4;" onload="popupFunction()">
    <!-- Parent-child relationship for inline-->
        <form action="includes/add_routine_task.inc.php" method="POST" id="bigForm">
            <div id="title">
                <li>
                    <h3>Add a routine task:</h3>
                </li>
                <!-- INPUT for taskName-->
                <li>
                    <input type="text" id="taskName" name="taskName" size="70" oninput="Update(this.value,'name')"><br>
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
                    </li>
                    <li>
                        <select id="biweeklydropdown" name="biweeklydropdown" oninput="Update(this.value,'biweekly')" style="display: none;">
                            <option value="" selected disabled hidden>Choose a day</option>
                            <option value="1">Monday</option>
                            <option value="2">Tuesday</option>
                            <option value="3">Wednesday</option>
                            <option value="4">Thursday</option>
                            <option value="5">Friday</option>
                            <option value="6">Saturday</option>
                            <option value="0">Sunday</option>
                        </select>
        
                        <select id="chooseWeeks" name="chooseWeeks" oninput="Update(this.value,'biweeklychoose')" style="display: none;">
                            <option value="" selected disabled hidden>Current/Next</option>
                            <option value="0">Current Week</option>
                            <option value="1">Next Week</option>
                        </select>
                    </li>
                    <li>
                        <input type="number" id="date" name="date" min="1" max="31" oninput="Update(this.value,'date')" style="display: none;">

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
                <button type="submit" name="add" id="add">Submit and Add another routine task</button>
                
                <button type="submit" name="done" id="done">Submit and Done adding ALL routine tasks</button>
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

            //TODO: To be confirmed with Shyun Yin
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
    </body>
</html>
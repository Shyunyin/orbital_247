<?php
    session_start();
?>
<!DOCTYPE html>
<html>

<head>
    <title>Add routine task</title>
    <script type="text/javascript" type="module" src="add_routine_task.js"></script>
    <script type="text/javascript" type="module" src="Routine_Final.js"></script>
    <script type="text/javascript" type="module" src="Window.js"></script>
    <!--<script type="text/javascript" type="module" src="combined.js"></script>-->
    <!---
    <script type="text/javascript" type="module" src="RoutineTasks.js"></script>
    <script type="text/javascript" type="module" src="DailyTask.js"></script>
    <script type="text/javascript" type="module" src="WeeklyTask.js"></script>
    <script type="text/javascript" type="module" src="BiweeklyTask.js"></script>
    <script type="text/javascript" type="module" src="MonthlyTask.js"></script>
    -->
    <!--<script type="text/javascript" type="module" src="Time.js"></script>-->
    <!--
    <script type="module">
        import {DailyTask} from './RoutineTasks/DailyTask.js';
        import {WeeklyTask} from './RoutineTasks/WeeklyTask.js';
        import {BiweeklyTask} from './RoutineTasks/BiweeklyTask.js';
        import {MonthlyTask} from './RoutineTasks/MonthlyTask.js';
    </script>
    -->
    <link rel="stylesheet" href="add_routine_task.css" />
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Signika+Negative:wght@600&display=swap" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body style="background-color: #f6f7f1; margin: 50px; border: 5px; border-color: #C4C4C4;">
    <!--Importing Firebase and Cloud Firestore libraries-->
    <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-firestore.js"></script>

    <!-- Parent-child relationship for inline-->
    <div id="title">
        <li>
            <h3>Add a routine task:</h3>
        </li>
        <!-- INPUT for taskName-->
        <li>
            <form>
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
                <input type="button" id="work" onclick="catFunction(0)" value="Work"></button>
                <input type="button" id="exercise" onclick="catFunction(1)" value="Exercise"></button>
                <input type="button" id="misc" onclick="catFunction(2)" value="Miscellaneous"></button>
                <input type="button" id="meal" onclick="catFunction(3)" value="Meal Times"></button>
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
                <select id="weeklydropdown" name="weeklydropdown" oninput="Update(this.value,'weekly')" style="display: none;">
                    <option value="" selected disabled hidden>Choose a day</option>
                    <option value="0">Monday</option>
                    <option value="1">Tuesday</option>
                    <option value="2">Wednesday</option>
                    <option value="3">Thursday</option>
                    <option value="4">Friday</option>
                    <option value="5">Saturday</option>
                    <option value="6">Sunday</option>
                </select>
            </li>
            <li>
                <select id="biweeklydropdown" name="biweeklydropdown" oninput="Update(this.value,'biweekly')" style="display: none;">
                    <!--Can replace w javascript??-->
                    <option value="" selected disabled hidden>Choose a day</option>
                    <option value="0">Monday</option>
                    <option value="1">Tuesday</option>
                    <option value="2">Wednesday</option>
                    <option value="3">Thursday</option>
                    <option value="4">Friday</option>
                    <option value="5">Saturday</option>
                    <option value="6">Sunday</option>
                </select>
                <select id="chooseWeeks" name="chooseWeeks" oninput="Update(this.value,'biweeklychoose')" style="display: none;">
                    <option value="" selected disabled hidden>Current/Next</option>
                    <option value="0">Current Week</option>
                    <option value="1">Next Week</option>
                </select>
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
                <input type="time" id="startTime" oninput="Update(this.value, 'start')">
            </div>
        </li>
        <li>
            <div class="endTime">
                <h3>End time:</h3>
                <input type="time" id="endTime" oninput="Update(this.value, 'end')">
            </div>
        </li>
    </div>

    <!--Buttons for ADD, DONE-->
    <div class="btn-group-actions">
        <!--<button id="add" onclick="Add(); newWindow();">Submit and Add another routine task</button>-->
        <button id="add" onclick="Add();">Submit and Add another routine task</button>
        <button id="done" onclick="mainSchedule(); Done();">Submit and Done adding ALL routine tasks</button>
    </div>

    <script>
        //------------------Defining of variables------------------//

       /*For referencing later on*/
       //let NameOfTask = document.getElementById("taskName").value; //main taskName input
        //category number can get from category_num in the other javascript file
        //let Start = document.getElementById("startTime");
        //let StartArr = [parseInt(Start.value.substr(0, 2)), parseInt(Start.value.substr(3, 4))]; //main array for start time
        //let End = document.getElementById("endTime"); 
        //let EndArr = [parseInt(End.value.substr(0, 2)), parseInt(End.value.substr(3, 4))]; //main array for end time
        //let Freq = 0;
        /*checkRadioValue() function returns the freq number:
         * Daily: 0, weekly: 1, biweekly: 2, monthly: 3
        */

        // function checkRadioValue() { 
        //     console.log("i come here to checkRadioValue()")
        //     var radio = document.getElementsByName("choose");
        //     for(var i = 0; i < radio.length; i++) {
        //         //check which radio is checked
        //         if(radio[i].checked){ 
        //             return i;
        //         }
        //     }
        // }
        // let freq_num = checkRadioValue();
        //for now freq_num and taskCategory has no update function so they are saved as it is first
       
        // let SpecificFreqTwo = "null"; //referencing only for biweekly 
        // let SpecificFreq;
        /*getFreq(): returns the ID of the frequency to retried*/
        // function getFreq(freq_num) {
        //     if (freq_num === 1) {
        //         SpecificFreq = document.getElementById("weeklydropdown");
        //     } else if (freq_num === 2) {
        //         SpecificFreq = document.getElementById("biweeklydropdown");
        //         SpecificFreqTwo = document.getElementById("chooseWeeks");
        //     } else if (freq_num === 3) {
        //         SpecificFreq = document.getElementById("date");
        //     }
        // }
    
        //TODO: To be confirmed with Shyun Yin
        let nameOfTask, start, startArr, end, endArr;
        let date = null;
        let day = null;
        let week = null;
        let freq_num = 0;

        function Update(val, type) {
            if(type=='name') {
                nameOfTask=val;
            } else if(type=='start') {
                start=val;
                startArr = [parseInt(start.substr(0, 2)), parseInt(start.substr(3, 4))];
            } else if(type=='end') {
                end=val;
                endArr = [parseInt(end.substr(0, 2)), parseInt(end.substr(3, 4))];
            } else if(type=='weekly') {
                day = val;
                freq_num = 1;
            } else if (type=='biweekly') {
                day = val;
                freq_num = 2;
            } else if (type=='biweeklychoose') {
                week = val;
            } else if (type=='date') {
                date = val;
                freq_num = 3;
            }
        }

        //--------------- Configuration --------------------------//
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
        apiKey: "AIzaSyBtFGTnYwEU5OgIa4SpKvMaGAa1ofEjs3U",
        authDomain: "orbital-24-7.firebaseapp.com",
        databaseURL: "https://orbital-24-7-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "orbital-24-7",
        storageBucket: "orbital-24-7.appspot.com",
        messagingSenderId: "459091456870",
        appId: "1:459091456870:web:21134477e94d50e25ecea7",
        measurementId: "G-WQMCMBMFCK"
        };

        firebase.initializeApp(firebaseConfig);
        let cloudDB = firebase.firestore();

        //--------------------- Writing relevant functions ------------------//

        // Add document with custom ID

        function Add_Doc_WithID() {
            console.log("i come here");
            //TODO: Using sniggy as a dummy user for now
            cloudDB.collection("Users").doc("sniggy").collection("Tasks").doc(nameOfTask).set(
            //cloudDB.collection("RoutineTasks").doc("name").set(
                {
                    taskName : String(nameOfTask),
                    taskCategory : Number(0),
                    startTime : Array(Number(startArr[0]), Number(startArr[1])),
                    endTime : Array(Number(endArr[0]), Number(endArr[1])),
                    freq: Number(freq_num),
                    date: date,
                    day: day,
                    week: week,
                }
            ).then(function(){
                console.log("Routine task '" + nameOfTask + "' added.");
            })
            .catch(function(error) {
                console.error("Error adding routine task: ", Error);
            });
        }

        //------------------------Button Events----------------------------//
        function Add() { //linked the onclick to the HTML document itself
            displayRadioValue();
            Add_Doc_WithID();
        }

        function Done() {
            Add_Doc_WithID();
        }

    </script>

</body>

</html>
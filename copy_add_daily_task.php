<!DOCTYPE html>
<html>
  <head>
    <title>Edit daily task</title>
    <script type = "text/javascript" type="module" src="add_daily_task.js"></script>
    <script type = "text/javascript" type="module" src="OneTimeTasks_Final.js"></script>
  <!--
    <script type = "module">
      import {OneTimeTask} from './OneTimeTasks/OneTimeTask.js';
      import {NonFixedTask} from './OneTimeTasks/NonFixedTask.js';
      import {FixedTask} from './OneTimeTasks/FixedTask.js';
    </script>
  -->
    <link rel="stylesheet" href="add_daily_task.css" />
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Signika+Negative:wght@600&display=swap" rel="stylesheet">
    <!--To allow for resizing according to screens-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  
  <body style="background-color: #f6f7f1; margin: 50px; border: 5px; border-color: #C4C4C4;">
    <!--Importing Firebase and Cloud Firestore libraries-->
    <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-firestore.js"></script>

    <!-- Parent-child relationship for inline-->
    <fieldset id="myFieldset">
      <div id="title">
        <li><h3>Add a task:</h3></li>
      <!-- INPUT for taskName-->
      <li><form>
          <input type="text" id="taskName" name="taskName" size="70"><br>
      </form></li>
      </div>
  
      <!-- Parent-child relationship for inline-->
      <div id="categories">
          <li><h3>Category:</h3></li>
      <!-- Buttons for categories-->
      <li><div class="btn-group-category">
          <input type="button" id="work" onclick="catFunction(0);" value="Work"></button>
          <input type="button" id="exercise" onclick="catFunction(1);" value="Exercise"></button>
          <input type="button" id="misc" onclick="catFunction(2);" value="Miscellaneous"></button>
      </div></li>
    </div>
      
      <!--For INPUT DROPDOWN date-->
      <!--Find a shorter way for numerical drop downs and how to link to javascript-->
      <div id="date">
        <li><h3>Date:</h3></li>
        <li><input id="dateInput" type="date" style="background-color: #96d6ed"></li>
      </div>
  
      <!-- Checkboxes for either TIME task or DURATION task-->
      <!-- Make checkboxes either or, have the same name to be in the same group, have diff values to make distinct--> 
      <nav>
        <element id="selectTime">
          <input type="radio" id="timeTask" name="select" value="time" checked="checked" onclick="initial()" onchange="showOptions('timeOptions', this);"> 
          <label for="timeTask" style="font-size:large;font-family:Signika Negative, sans-serif;">Time</label><br>
        </element>
        <element id="or">
          <h3>OR</h3>
        </element>
        <element id="selectDuration">
          <input type="radio" id="durationTask" name="select" value="duration" onclick="initial()" onchange="showOptions('durationOptions', this);">
          <label for="durationTask" style="font-size:large;font-family:Signika Negative, sans-serif;">Duration (per session)</label><br>
        </element>
      </nav>
  
      <!--Time options-->
      <div id="timeOptions">
        <div class="startTime">
          <h3>Start time:</h3>
          <input type="time" id="startTime" name="startTime">
        </div>
        <div class="endTime">
        <h3>End time:</h3>
          <input type="time" id="endTime" name="endTime">
        </div>
        <input type="button" id="doneTimeBtn" value="Done!" onclick="calculationTime()">
      </div>
      
  
      <!--Duration options-->
      <div id = "durationOptions" style="display: none">
        <form class="durationOption">
          <input type="number" id="hour" name="hour" min="0" max="3"> <!--I set max to 3 hours for health?-->
          <label for="hour">hr</label>
          <input type="number" id="minute" name="minute" min="0" max="59">
          <label for="minute">min</label>
        <!-- Number of sessions -->
          <div id="sessions">
            <h3>Number of Sessions:</h3>
          </div>
          <form class="numSessions">
            <input type="button" id="onesession" onclick="sessionsFunction(1);" value="x1"></button>
            <input type="button" id="twosessions" onclick="sessionsFunction(2);" value="x2"></button>
            <input type="button" id="threesessions" onclick="sessionsFunction(3);" value="x3"></button>
          </form>
          <button type="button" id="doneDurationBtn" onclick="calculationDuration()">Done!</button>
      </div>
    
  
      
      <!-- Create box for counter with CALCULATIONS of time left that can be planned-->
      <!-- QUESTION: idk how to include javascript element into html isit ${}?-->
      <div id="counter">
        <p>Remaining</p>
        <p id="counterOutput"></p>
      </div>
  
  
      <!-- For follow up task-->
      <div class="followTask">
        <br>
          <li><h3>Does this task follow another task?</h3></li>
          <li><input type="radio" id="yes" name="check" value="A" onchange="showList('A', this); return false;" onclick="RetrieveDropdownWithID()">
            <label class="yes" for="yes">Yes</label></li>
          <li><input type="radio" id="no" name="check" checked="checked" value="B" onchange="showList('B', this); return false;">
            <label class="no" for="no">No</label><br></li>
        </br>
  
        <!--Code for dropdown menu linked to javascript, database of other tasknames-->
    <div id="A" style="display:none">
        <!--Container to contain the dynamically added elements-->
      <div>
        <select id="dropdownList" oninput="Update(this.value, 'followname')">
          <option value="" selected disabled hidden>Select a task</option>
        </select>
      </div>
      <h4 id="sequence">(Selected task will be scheduled after the created task)</h4>
    </div>
  
    <div id="B" style="display:none">
    </div>

    
 

    <!--Buttons for DELETE, ADD, DONE-->
    <div class="btn-group-actions">
      <li><input type="button" id="delete" value="Delete task" onclick="DeleteTask()"></li>
      <!-- <li><button id="add" >Add another task</button></li> -->
      <li><input type="button" id="done" value="Submit" onclick="frontEndSubmit()"></li>
    </div>
  </fieldset>

    <script>
        //------------------Using retrieving function to fill up inputs------------------//
        /*function check(): to get document category*/
        function check() {
         if (document.getElementById("durationTask").checked == true) {
            return "Non-fixed";
          } else { //if the duration radio button is not clicked
            return "Fixed";
          }
        }
        var typeCheck = check();
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
        //--------------------- Retrieving relavant information from database ------------------//
        /*Function to get current date in format*/
        function frontEndSubmit() { 
          Add_Doc_WithID();
          // console.log("Task has been added");
          alert("Daily task has been successfully saved! Please press the X button to close the window!");
          var myFieldset = document.getElementById("myFieldset");
          myFieldset.disabled = true;
        }

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
        
        /*Create an option in the dropdown list*/
        function createDropdown(name) { //ensure that dropdown list loads once page is loaded up
          namespace = name.replace(/ /g,"_");
          let option = document.createElement("option");
          option.value = name; //add a value attribute
          option.text = name;  
          option.classList.add(namespace); //add a class attribute the class of the taskname is just task underscore
          document.getElementById("dropdownList").append(option); //appending options to the select
        }
         
        /*Use where() to get the documents of the current date in order to retrieve the taskNames of these documents*/
        function RetrieveDropdownWithID() { //get taskNames with dates considered also
          var todayDate = formatDate(); //getting current date
          console.log(formatDate());
          var taskList;
            console.log("I come here too");
            cloudDB.collection('OneTimeTasks').where("date", "==", todayDate)
            .get()
            .then((snapshot) => {
              snapshot.forEach((doc) => {
                createDropdown(doc.data().taskName);
              });
            })
            .catch((error) => {
            console.log("Error getting documents: ", error);
          });
        }

        var nameoftask; //global variable

        window.onload = function () {
          //getting the nameoftask from local storage
        nameoftask = localStorage.getItem("taskname");
        // console.log(nameoftask + " is gotten from local storage!") //used for debugging to check if local storage works
        Retrieve_Database_Info(nameoftask); //debugging: working
        }        

        var taskPlusName, categoryNum, startArr, endArr, startTime, endTime, dateInput, followTask, followSequence, hour, minute, numSessions;
        
    
        function Retrieve_Database_Info(nameoftask){ //pass in the taskname to retrieve the info to fill up the form
            // console.log("Retrieve data to fill up form");
            console.log(nameoftask + " is in retrieve database info!")
            var docRef = cloudDB.collection('OneTimeTasks').doc(nameoftask);
            docRef.get()
            .then((doc) => {
                if (doc.exists) {
                    console.log("Document data retrieved"); //debugging: each variable working as well
                    taskPlusName = doc.data().taskName;
                    categoryNum = doc.data().taskCategory;
                    startArr = doc.data().startTime;
                    endArr = doc.data().endTime;
                    startTime = startArr[0] + ":" + startArr[1];
                    endTime = endArr[0] + ":" + endArr[1];
                    // console.log(startArr); //debugging
                    // console.log(endArr); //debugging
                    // console.log(startTime); //debugging
                    // console.log(endTime); //debugging
                    dateInput = doc.data().date;
                    followTask = doc.data().followTask;
                    followSequence = doc.data().sequenceLabel;
                    hour = doc.data().durationHour;
                    minute = doc.data().durationMinute;
                    numSessions = doc.data().numSessions;

                    /*For the setting of values to fill in the fields*/
                    document.getElementById("taskName").value = taskPlusName; 
                    document.getElementById("startTime").value = startTime;
                    document.getElementById("endTime").value = endTime; 
                    document.getElementById("dateInput").value = dateInput;
                    var option = document.createElement("option"); //For dropdown list
                    option.classList.add("selectedTask");
                    option.value=followTask;
                    option.setAttribute("selected", "selected");
                    var dropdown = document.getElementById("dropdownList");
                    dropdown.appendChild(option); 
                    var ele = document.createElement("option"); //For sequence
                    ele.classList.add("seq");
                    ele.value=followSequence;
                    ele.setAttribute("selected", "selected");
                    var parent = document.getElementById("sequence");
                    parent.prepend(ele);
                    document.getElementById("hour").value = hour;
                    document.getElementById("minute").value = minute;
                    console.log(taskPlusName +", " +categoryNum+", "+startTime+", "+endTime+", "+dateInput+", "+followTask+", "+followSequence+", "+hour+", "+minute+", "+numSessions);
                } else {
                    console.log("No such document!");
                }
              }).catch((error) => {
                console.log("Error getting document", error);
            });
          }


        //--------------------- Updating data to database using update------------------//
         //--------------------- Deleting data from database ------------------//
         function DeleteTask(){ //only can test when edit function is out
           cloudDB.collection("OneTimeTasks").doc(nameOfTask).delete()
           .then(function(){
             console.log("Document deleted with ID", nameOfTask);
           })
           .catch(function(error){
             console.error("Error deleting document", error);
           });
         }
       
        //------------------------Button Events----------------------------//
        // document.getElementById("done").addEventListener('click', Add_Doc_WithID);
    </script>
   </body>
</html>
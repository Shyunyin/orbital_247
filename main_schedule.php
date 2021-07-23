<?php
    session_start();
?>
<!DOCTYPE html>
<html>

<head>
    <title>Main Schedule Page</title>
    <link rel="stylesheet" href="main_schedule.css?v=<?php echo time(); ?>">
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
    <div id="schedule">
    </div>

    <!--For array of tasks-->
    <div id="postit">
        <input type="text" id="title" readonly="readonly" value="Tasks not included in schedule yet">
        <br>
        <div id="postitContent">
        </div>
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
    <button type="button" id="addTask" name="addTask">+</button>
    <input type="button" id="addTask" value="+" onclick="OpenPopupWindow()">

    <!--Link to pop up for add daily task page-->
    <button id="generateSchedule" name="generateSchedule" onclick="clearPostit();printSchedule(generate());">Generate Schedule now!</button>

    <!--Buttons to go to previous and next-->
    <!--Probably must create previous button using javascript as it only appears if schedule day != current day-->
    <button type="button" id="nextDay" name="nextDay"></button>
    <div id="textNextDay">Go to Next day's schedule</div>

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

</body>
</html>
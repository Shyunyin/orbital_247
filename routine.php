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
        <div id="tasklist"></div> <!-- To be edited using function in routine.js after retrieving array, currently in routine.js --> 
    </div>
    <div id="instruction">
        <!--For the background box-->
    </div>
    <div class="instruction">
        <h3>Click on a task to</h3>
        <h3>edit or delete it!</h3>
    </div>

    <div id="iconActions">    
        <h3>Actions:</h3>
    </div>

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

    <?php
        //get current date, month and year to retrieve tasks
        // $today = date("Y-m-d");
        // echo $today;
        // $todaysDate = 
        // $todaysMonth = 
        // $todaysYear = 

        //retrieving data
        $data = "SELECT * FROM routinetask WHERE id=$userid"; 
        $result = mysqli_query($conn,$data);
        if(!$result) {
            echo "Could not run query:" . mysqli_error($conn);
            exit();
        }
        $row = mysqli_fetch_row($result);
        $taskName = $row[1];
    ?>
    <script>
        /*redirect(x) takes in the task name and outputs a pop out window with the input fields updated when the edit button is created*/
        function redirect(x) {
            localStorage.setItem("taskname", x);
            var url = "../copy_add_daily_task.php";
            let myRef = window.open(url, 'mywin', 'left=20, top=20, width=770, height=700, toolbar=1, resizable=0');
            myRef.focus();
        }
        // /*createRoutinelist(): Create an option in the routine task list stick*/
        function createRoutineList(name) { 
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
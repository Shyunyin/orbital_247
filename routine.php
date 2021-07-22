<?php
    session_start();
?>
<!DOCTYPE html>
<html>
<head>
    <title>Routine Page</title>
    <link rel="stylesheet" href="routine.css" />
    <script type = "text/javascript" type="module" src="routine.js"></script>
    <!--Importing Firebase and Cloud Firestore libraries-->
    <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-firestore.js"></script>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Signika+Negative:wght@600&display=swap" rel="stylesheet">
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
        <h3> List of routine tasks: </h3>
        <div id="box"></div> 
        <div id="tasklist"></div> <!-- To be edited using function in routine.js after retrieving array, currently in routine.js --> 
    </div>
    <div id="instruction">
        <!--For the background box-->
    </div>
    <div class="instruction">
        <h3>Click on a task to</h3>
        <h3>edit or delete it</h3>
    </div>

    <div id="iconActions">
    </div>

    <div id="wakeup">
        <h3>Wake up time</h3>
        <div id="displayWakeup"></div> <!--To be retrieved from database-->
        <button class="btn" onclick="clickEdit()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i></button>
    </div>

    <div id="productive">
        <h3>Productive time period</h3>
        <div id="displayProductive"></div> <!--To be retrieved from database-->
        <button class="btn" onclick="clickEdit()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i></button>
    </div>    

</body>
</html>
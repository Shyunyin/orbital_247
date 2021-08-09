<?php
    session_start();
?>

<!DOCTYPE html>
<html>
    <!--Collect data from what is selected in main_schedule.js-->
    <!-- Delete task if confirmed-->
    <style>
        #main{
            margin-top: 200px;
            display: inline-block;
        }
        #yes{
            background-color: #e3aba1;
            border-width: 2px;
            border-color: black;
            border-radius: 5px;
            height: 30px;
            width: 80px;
            font-family: "Signika Negative", sans-serif;
            margin-left: -130px;
            font-size: 18px;
            position: absolute;
            z-index: 10;
        }
        #yes:hover {
            background-color: #FEDCCE;
        }
        #no {
            background-color: #e3aba1;
            border-width: 2px;
            border-color: black;
            border-radius: 5px;
            height: 30px;
            width: 80px;
            font-family: "Signika Negative", sans-serif;
            position: absolute;
            z-index: 10;
            margin-left: 60px;
            font-size: 18px;
            /* margin-top: ; */
     
        }
        #no:hover {
            background-color: #FEDCCE;
        }

        #buttons {
            height: 20px;
            width: 100px;
            display: inline-block;
        }
    </style>
    <head>
        <title>Delete page</title>
        <link href="https://fonts.googleapis.com/css2?family=Signika+Negative:wght@600&display=swap" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>

    <body style="text-align: center; background-color: #f6f7f1; font-family: Signika Negative, sans-serif;">
        <div id="main">
            <h2>Are you sure you want to delete this task?</h2> 
            <div id="buttons">
                <form action="includes/deleting_daily_task.inc.php" method="POST" id="mainForm">
                    <input type="submit" name="delete" value="Yes" id="yes">
                    <input type="submit" value="No" id="no" name="close">
                </form>
            </div>
        </div>
    </body>

    <script>
        var startTimeHour = localStorage.getItem("startTimeHour");
        var startTimeMin = localStorage.getItem("startTimeMin");
        console.log(startTimeHour); //debugging
        console.log(startTimeMin); //debugging

        let mainForm = document.getElementById("mainForm");

        var input1 = document.createElement("input");
        input1.type = "hidden";
        input1.value = startTimeHour;
        input1.name = "startTimeHour";
        mainForm.appendChild(input1);

        var input2 = document.createElement("input");
        input2.type = "hidden";
        input2.value = startTimeMin;
        input2.name = "startTimeMin";
        mainForm.appendChild(input2);

        function close() {
            window.close();
        }
    </script>
</html>

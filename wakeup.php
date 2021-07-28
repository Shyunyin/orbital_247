<?php
    session_start();
?>

<!DOCTYPE HTML>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script type="text/javascript" type="module" src="./countdownTimer.js"></script>
        <script type="text/javascript" type="module" src="./link.js"></script>
        <script type="text/javascript" type="module" src="CombinedTime_Final.js"></script>
        <script type="text/javascript" type="module" src="Routine_Final.js"></script>

        <link href="https://fonts.googleapis.com/css2?family=Signika+Negative:wght@600&display=swap" rel="stylesheet">
        <style>
        body{
        font-family: "Signika Negative", sans-serif;
        background-color: #f6f7f1;
        color: #1e5353;
        text-align: center;
        margin-top: 300px;
        }
        #wakeupTime {
            width: 150px;
            height: 50px;
            background-color: #96d6ed;
            border-color: black;
            border-width: 2px;
            border-radius: 5px;
            font-family: "Signika Negative", sans-serif;
            font-size: large;
            text-align: center;
            margin-top: 15px;
        }
        #next {
            font-family: "Signika Negative", sans-serif;
            font-size: large;
            background-color: #e3aba1;
            border-color: black;
            border-width: 2px;
            border-radius: 5px;
            margin-top: 50px;
            margin-left: 50px;
        }
        #next:hover {
            background-color: #FEDCCE;
        }
        #vertical {
            justify-content: center;
        }
        </style>
    </head>

    <script>
        function popupFunction() {
            window.alert("Please input your wake up time:)");
        }    
    </script>

    <body onload="popupFunction();">
        <h2>Please input the time which you usally wake up &nbsp;</h2>
        <h2> at/ at which your day starts:</h2>
        <form action ="includes/wakeup.inc.php" method="POST" id="vertical">
            <input type="time" id="wakeupTime" name="wakeupTime" oninput="Update(this.value, 'time')">
            <button type="submit" id="next" name="next">Next</button> 
        </form>
    
        <script>
            //------------------Defining of variables------------------//
            let Wakeup = document.getElementById("wakeupTime");

            let wakeup = Wakeup.value;
            let hour, min, wakeupArr;

            function Update(val, type){
            var ele = document.getElementById("vertical"); //link to main form
                if(type=='time'){
                    wakeup=val;
                    wakeupArr=[parseInt(wakeup.substr(0, 2)), parseInt(wakeup.substr(3, 4))];
                    hour = wakeupArr[0];
                    min = wakeupArr[1];
                    //Shift variable to html

                    var jsHour = document.createElement("input");
                    jsHour.type = "hidden";
                    jsHour.value = hour;
                    jsHour.name = "jsHour";
                    ele.appendChild(jsHour);

                    var jsMin = document.createElement("input");
                    jsMin.type = "hidden";
                    jsMin.value = min;
                    jsMin.name = "jsMin";
                    ele.appendChild(jsMin);
                }
            }
        </script>
    </body>
</html>

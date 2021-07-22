<?php
    session_start();
?>
<!DOCTYPE HTML>
<html>
    <form action="../includes/add_daily_task.inc.php" method="POST" id="big"></form>
    <body>
        <script type = "text/javascript" type="module" src="Window.js"></script>
        <script type = "text/javascript" type="module" src="Time.js"></script>
        <script>
            function insertWindowHelper(currWindow) {
                console.log("I come to insertWindowHelper");
                let currEle = document.getElementById("big");

                let currName = document.createElement("input");
                currName.type = "hidden";
                currName.value = currWindow.getTaskName();
                currName.name = "currName";
                currEle.appendChild(currName);

                let currYear = document.createElement("input");
                currYear.type = "hidden";
                currYear.value = currWindow.getYear();
                currYear.name = "currYear";
                currEle.appendChild(currYear);

                let currMonth = document.createElement("input");
                currMonth.type = "hidden";
                currMonth.value = currWindow.getMonth();
                currMonth.name = "currMonth";
                currEle.appendChild(currMonth);

                let currDate = document.createElement("input");
                currDate.type = "hidden";
                currDate.value = currWindow.getDate();
                currDate.name = "currDate";
                currEle.appendChild(currDate);

                let currStartHour = document.createElement("input");
                currStartHour.type = "hidden";
                currStartHour.value = currWindow.getStartTimeHours();
                currStartHour.name = "currStartHour";
                currEle.appendChild(currStartHour);

                let currStartMin = document.createElement("input");
                currStartMin.type = "hidden";
                currStartMin.value = currWindow.getStartTimeMins();
                currStartMin.name = "currStartMin";
                currEle.appendChild(currStartMin);

                let currEndHour = document.createElement("input");
                currEndHour.type = "hidden";
                currEndHour.value = currWindow.getEndTimeHours();
                currEndHour.name = "currEndHour";
                currEle.appendChild(currEndHour);

                let currEndMin = document.createElement("input");
                currEndMin.type = "hidden";
                currEndMin.value = currWindow.getEndTimeMins();
                currEndMin.name = "currEndMin";
                currEle.appendChild(currEndMin);

                let currType = document.createElement("input");
                currType.type = "hidden";
                currType.value = currWindow.type; //Maybe create a method for this?
                currType.name = "currType";
                currEle.appendChild(currType);

                //currEle.submit();
            }
        </script>
    </body>
</html>
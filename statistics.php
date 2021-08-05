<?php
    session_start();
?>
<!DOCTYPE html>
    <head>
        <title>Statistics Page</title>
        <link rel="stylesheet" href="statistics.css?v=<?php echo time();?>"> 
        <script type = "text/javascript" type="module" src="statistics.js"></script>
        <script type="text/javascript" type="module" src="CombinedTime_Final.js"></script>
        <script type = "text/javascript" type="module" src="Window.js"></script>
        <script src="https://cdn.anychart.com/releases/8.0.1/js/anychart-core.min.js"></script>
        <script src="https://cdn.anychart.com/releases/8.0.1/js/anychart-pie.min.js"></script>

        <!-- <script src="https://cdn.anychart.com/releases/8.10.0/js/anychart-base.min.js?hcode=a0c21fc77e1449cc86299c5faa067dc4"></script>
        <script src="https://cdn.anychart.com/releases/8.10.0/js/anychart-exports.min.js?hcode=a0c21fc77e1449cc86299c5faa067dc4"></script>
        <script src="https://cdn.anychart.com/releases/8.10.0/js/anychart-ui.min.js?hcode=a0c21fc77e1449cc86299c5faa067dc4"></script> -->

        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Signika+Negative:wght@600&display=swap" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>

    <body>
        <!--Main division for the background-->
        <div id="background">
            <div class="btn-group">
                <button class="button" onclick="schedule()">Schedule</button>
                <button class="button">Statistics</button>
                <button class="button" onclick="routine()">Routine</button>
            </div>
            <div class="main"></div>
        </div>

    
        <div id="box"></div> 

            <!-- <div id="work"> 
                <h2>Total time spent on Work today:</h2>
            </div>

            <div id="exercise">
                <h2>Total time spent on Exercising today:</h2>
            </div>

            <div id="misc">
                <h2>Total time spent on Miscellaneous today:</h2>
            </div>

            <div id="prodpercent">
                <h2>Percentage of work tasks done during your selected productivity period today:</h2>
            </div>

            <div id="sleepDuration">
                <h2>Your estimated sleep duration for today: </h2>
            </div> -->

            <!-- Newly added for pie chart -->
            <div id="container"></div>

        <script>
        var test = 25;
        var total = 85;
        anychart.onDocumentReady(function() {

            // set the data
            var data = [
                {x: "Work", value: test, percent: 76},
                {x: "Exercise", value: 30, percent: 75},
                {x: "Miscelleneous", value: 30, percent: 45},
            ];

            // create the chart
            var chart = anychart.pie();

            // set the chart title
            chart.title("Today's Breakdown");
            chart.title().fontFamily("Signika Negative");
            chart.title().fontSize(23);
            chart.title().fontWeight(700);
            chart.title().fontColor("black");
            chart.title().fontDecoration("underline");
            chart.title().padding("0px");

            // add the data
            chart.data(data);

            // set legend position
            //chart.legend().position("right");
            // set items layout
            //chart.legend().itemsLayout("vertical");

            // to remove the white box that was initally the chart's background
            chart.background().enabled(false);
            //chart.outline(true);
            // chart.normal().outline().enabled(true);
            // chart.normal().outline().width("5%");
            // chart.hovered().outline().width("10%");
            // chart.selected().outline().width("3");
            // chart.selected().outline().fill("#455a64");
            // chart.selected().outline().stroke(null);
            // chart.selected().outline().offset(2);

            chart.labels().format("{%x}");
            chart.labels().fontFamily("Signika Negative");
            chart.labels().fontSize(16);
            chart.labels().fontWeight(900);
            chart.labels().fontColor("black");
            chart.labels().position("center");

            chart.legend().enabled(false);
            chart.legend().fontFamily("Signika Negative");
            chart.legend().fontSize(20);
            chart.legend().fontColor("black");

            chart.radius("40%");

            chart.palette(["#e3aba1", "white", "#93c9cc"]); // Should be in the order of the data input
            //anychart.color.darken("#e3aba1", 0.2);

            chart.tooltip().useHtml(true);

            //chart.tooltip().displayMode("double");

            //chart.tooltip().title();
            //title.fontDecoration("underline");
            chart.tooltip().title().fontFamily("Signika Negative");
            chart.tooltip().title().fontSize(17);
            chart.tooltip().title().fontWeight(400);

            chart.tooltip().fontFamily("Signika Negative");
            chart.tooltip().fontSize(15);
            chart.tooltip().fontWeight(50);

            //chart.tooltip().format("Hours spent: {%value}\nSales volume: <b>${%value}</b>");
            chart.tooltip().format("Number of hours spent: {%value}<br><i>{%percent}% of the day was spent on '{%x}'</i>");

            // display the chart in the container
            chart.container('container');
            chart.draw();

        });

        window.onload = function() {
            var workDuration = 0; 
            var exerciseDuration=0;
            var miscDuration=0;
            var mealDuration=0;

            let currArr = [];
            let name, year, month, date, startTimeHour, startTimeMin, endTimeHour, endTimeMin, type, newWin, prodStart, prodEnd, prodPeriod; 
            let totalWork = 0;
            let totalTime = 0;
            let percentage = 0;
            let totalSleep = 480;
            // STEP 1: Obtain all the fixed tasks for the day
            <?php
                //TODO: We need to obtain the year, month and date from the html page that directs us here. So update these variables here accordingly later.
                date_default_timezone_set('Singapore');
                $taskYear = date("Y");
                $taskMonth = date("m") - 1; // For javascript, months span from 0 - 11. This is already accounted for in the main schedule page.
                $taskDate = date("d"); //Just for testing!!
                $type = 1; //Type for fixed tasks is always 1
                $userid = $_SESSION["userid"];


                $sql = "SELECT * FROM fixedtaskwindow WHERE userid = $userid AND taskYear = $taskYear AND taskMonth = $taskMonth AND taskDate = $taskDate;";

                $fullDate = $taskYear."-".($taskMonth + 1)."-".$taskDate;
                $timestamp = strtotime($fullDate);
                $dayNum = date('w', $timestamp);

                $dailySql = "SELECT * FROM routinetask WHERE userid = $userid AND freq = 0;";

                $weeklySql = "SELECT * FROM routinetask WHERE userid = $userid AND freq = 1 AND taskDay = $dayNum;";

                $biweeklySql = "SELECT * FROM routinetask WHERE userid = $userid AND freq = 2 AND taskDay = $dayNum AND week = 0;";

                $monthlySql = "SELECT * FROM routinetask WHERE userid = $userid AND freq = 3 AND taskDate = $taskDate;";

                $routineChecks = [$dailySql, $weeklySql, $biweeklySql, $monthlySql];

                $user = 'root'; 
                $pass = '';
                $db='orbital247';
                $conn = mysqli_connect('localhost', $user, $pass, $db);
                $result = mysqli_query($conn, $sql);
                
                if ($result) {
                    $resultCheck = mysqli_num_rows($result);
                    $data = array();
                    if ($resultCheck > 0) {
                        while ($row = mysqli_fetch_assoc($result)) {
                            $data[] = $row;   
                        }   
                    }
                    foreach($data as $single) {
                        $name = $single['taskName'];
                        echo "name = '$name';";
                        $year = $single['taskYear'];
                        echo "year = parseInt($year);";
                        $month = $single['taskMonth'];
                        echo "month = parseInt($month);";
                        $date = $single['taskDate'];
                        echo "date = parseInt($date);";
                        $startTimeHour = $single['startTimeHour'];
                        echo "startTimeHour = parseInt($startTimeHour);";
                        $startTimeMin = $single['startTimeMin'];
                        echo "startTimeMin = parseInt($startTimeMin);";
                        $endTimeHour = $single['endTimeHour'];
                        echo "endTimeHour = parseInt($endTimeHour);";
                        $endTimeMin = $single['endTimeMin'];
                        echo "endTimeMin = parseInt($endTimeMin);";
                        $type = $single['taskType'];
                        echo "type = parseInt($type);";
                        
                        echo 'newWin = new Window(name, year, month, date, new Time(startTimeHour, startTimeMin), new Time(endTimeHour, endTimeMin), type);';

                        echo 'currArr.push(newWin);';
                    }
                }
                echo 'console.log(currArr);';

                foreach($routineChecks as $check) {
                    $result = mysqli_query($conn, $check);
                
                    if ($result) {
                        $resultCheck = mysqli_num_rows($result);
                        $data = array();
                        if ($resultCheck > 0) {
                            while ($row = mysqli_fetch_assoc($result)) {
                                $data[] = $row;   
                            }   
                        }
                        foreach($data as $single) {
                            $name = $single['taskName'];
                            echo "name = '$name';";
                            echo "year = $taskYear;";
                            echo "month = $taskMonth;";
                            echo "date = $taskDate;";
                            $startTimeHour = $single['startTimeHour'];
                            echo "startTimeHour = parseInt($startTimeHour);";
                            $startTimeMin = $single['startTimeMin'];
                            echo "startTimeMin = parseInt($startTimeMin);";
                            $endTimeHour = $single['endTimeHour'];
                            echo "endTimeHour = parseInt($endTimeHour);";
                            $endTimeMin = $single['endTimeMin'];
                            echo "endTimeMin = parseInt($endTimeMin);";
                            $type = $single['taskCategory'];
                            echo "type = parseInt($type);";
                            
                            echo 'newWin = new Window(name, year, month, date, new Time(startTimeHour, startTimeMin), new Time(endTimeHour, endTimeMin), type);';

                            echo 'currArr.push(newWin);';
                        }
                    }
                }
                        
                $prodSql = "SELECT * FROM infoproductive WHERE id = $userid";
                $wakeUpSql = "SELECT * FROM infowakeup WHERE id = $userid";
                $currResult = mysqli_query($conn, $prodSql);
                $currResult2 = mysqli_query($conn, $wakeUpSql);
                if ($currResult) {
                    $resultCheck = mysqli_num_rows($currResult);
                    $currData = array();
                    if ($resultCheck > 0) {
                        while ($row = mysqli_fetch_assoc($currResult)) {
                            $currData[] = $row;   
                        }   
                    }
                    foreach($currData as $singleData) {
                        $startHour = $singleData['startTimeHour'];
                        $startMin = $singleData['startTimeMin'];
                        $endHour = $singleData['endTimeHour'];
                        $endMin = $singleData['endTimeMin'];
                        echo "prodStart = new Time($startHour, $startMin);";
                        echo "prodEnd = new Time($endHour, $endMin);";
                    }
                }
                
                if ($currResult2) {
                    $resultCheck2 = mysqli_num_rows($currResult2);
                    $currData2 = array();
                    if ($resultCheck2 > 0) {
                        while ($row2 = mysqli_fetch_assoc($currResult2)) {
                            $currData2[] = $row2;   
                        }   
                    }
                    foreach($currData2 as $singleData2) {
                        $wakeHour = $singleData2['hour'];
                        $wakeMin = $singleData2['minute'];
                        echo "let sleepEnd = new Time($wakeHour, $wakeMin);";
                        echo "let sleepStart = Time.findStartTime(sleepEnd, [8, 0]);";
                    }
                }
                ?>

                console.log("sleepStart " + sleepStart);
                console.log(currArr);

                prodPeriod = new Window("productive", new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), prodStart, prodEnd, -1);

                let sleepPeriod = new Window("sleep", new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), sleepStart, sleepEnd, -1);

                for (let i = 0; i < currArr.length; i++) {
                    let currType = currArr[i].type;
                    let duration = Time.duration(currArr[i].getStartTime(), currArr[i].getEndTime());
                    console.log("duration"+duration);
                    if (currType == 0) {
                        workDuration += (duration[0]*60) + (duration[1]);
                    } else if (currType == 1) {
                        exerciseDuration += (duration[0]*60) + (duration[1]);
                    } else if (currType == 2) {
                        miscDuration += (duration[0]*60) + (duration[1]);
                    } 

                    if (currArr[i].isCompletelyDuring(prodPeriod) || currArr[i].partiallyOverlaps(prodPeriod) || prodPeriod.partiallyOverlaps(prodPeriod)) {
                        let currDuration = Time.duration(currArr[i].getStartTime(), currArr[i].getEndTime());

                        totalTime += (currDuration[0] * 60) + currDuration[1];

                        if (currArr.type == 0) {
                            totalWork += (currDuration[0] * 60) + currDuration[1];
                        }
                    }

                    if (currArr[i].isCompletelyDuring(sleepPeriod) || currArr[i].partiallyOverlaps(sleepPeriod) || prodPeriod.partiallyOverlaps(sleepPeriod)) {
                        let currDuration = Time.duration(currArr[i].getStartTime(), currArr[i].getEndTime());
                        
                        totalSleep -= (currDuration[0] * 60) + currDuration[1]; //estimated sleep duration
                    }
                }  
                console.log("work duration:"+workDuration);
                console.log("exer duration:"+exerciseDuration);
                console.log("misc duration:"+miscDuration);


                workDuration = [((workDuration - (workDuration % 60)) / 60), (workDuration % 60)];
                let workmain = document.getElementById("work");
                let workele = document.createElement("input");
                workele.type = "text";
                workele.setAttribute("readonly", "readonly");
                var line = "Hours: " + workDuration[0] + " " + "Minutes: " + workDuration[1];
                workele.value = line;
                workele.classList.add("work");
                workele.style.position="absolute";
                workele.style.zIndex="20";
                workele.style.fontFamily = "Signika Negative";
                workele.style.fontSize = "18px";
                workele.style.textAlign = "center";
                workele.style.backgroundColor = "#FDFD96";
                workele.style.color = "#1e5353";
                workele.style.border = "black";
                workele.style.borderRadius = "5px";
                workele.style.marginLeft= "400px";
                workele.style.marginTop= "-45px";
                workmain.appendChild(workele);

                exerciseDuration = [((exerciseDuration - (exerciseDuration % 60)) / 60), (exerciseDuration % 60)]; 
                let exercisemain = document.getElementById("exercise");
                let exerciseele = document.createElement("input");
                exerciseele.type = "text";
                exerciseele.setAttribute("readonly", "readonly");
                var line = "Hour: " + exerciseDuration[0] + " " + "Minute: " + exerciseDuration[1];
                exerciseele.value = line;
                exerciseele.classList.add("exercise");
                exerciseele.style.position="absolute";
                exerciseele.style.zIndex="20";
                exerciseele.style.fontFamily = "Signika Negative";
                exerciseele.style.fontSize = "18px";
                exerciseele.style.textAlign = "center";
                exerciseele.style.backgroundColor = "#FDFD96";
                exerciseele.style.color = "#1e5353";
                exerciseele.style.border = "black";
                exerciseele.style.borderRadius = "5px";
                exerciseele.style.marginLeft= "400px";
                exerciseele.style.marginTop= "-45px";
                exercisemain.appendChild(exerciseele);

                miscDuration = [((miscDuration - (miscDuration % 60)) / 60), (miscDuration % 60)]; 
                let miscmain = document.getElementById("misc");
                let miscele = document.createElement("input");
                miscele.type = "text";
                miscele.setAttribute("readonly", "readonly");
                var line = "Hour: " + miscDuration [0] + " " + "Minute: " + miscDuration[1];
                miscele.value = line;
                miscele.classList.add("misc");
                miscele.style.position="absolute";
                miscele.style.zIndex="20";
                miscele.style.fontFamily = "Signika Negative";
                miscele.style.fontSize = "18px";
                miscele.style.textAlign = "center";
                miscele.style.backgroundColor = "#FDFD96";
                miscele.style.color = "#1e5353";
                miscele.style.borderRadius = "5px";
                miscele.style.border = "black";
                miscele.style.marginTop= "-45px";
                miscele.style.marginLeft= "450px";
                miscmain.appendChild(miscele);

                if (totalTime != 0) {
                    percentage = ((totalWork / totalTime) * 100); //percentage of work tasks during selected productive period
                }   
                console.log("percentage " + percentage);

                let percentmain = document.getElementById("prodpercent");
                let prodPercent = document.createElement("input");
                prodPercent.type = "text";
                prodPercent.setAttribute("readonly", "readonly");
                var line = percentage + "%";
                prodPercent.value = line;
                prodPercent.classList.add("prodpercent");
                prodPercent.style.position="absolute";
                prodPercent.style.zIndex="20";
                prodPercent.style.fontFamily = "Signika Negative";
                prodPercent.style.fontSize = "18px";
                prodPercent.style.textAlign = "center";
                prodPercent.style.backgroundColor = "#FDFD96";
                prodPercent.style.color = "#1e5353";
                prodPercent.style.borderRadius = "5px";
                prodPercent.style.border = "black";
                prodPercent.style.marginTop= "-45px";
                prodPercent.style.marginLeft= "100px";
                percentmain.appendChild(prodPercent);

                //To be added in the for loop for the workduration, exercise duration and misc duration thing
                console.log("totalSleep " + totalSleep);

                totalSleep = [((totalSleep - (totalSleep % 60)) / 60), (totalSleep % 60)]; 
                let sleepmain = document.getElementById("sleepDuration");
                let sleep = document.createElement("input");
                sleep.type = "text";
                sleep.setAttribute("readonly", "readonly");
                var line = "Hour: " + totalSleep [0] + " " + "Minute: " + totalSleep[1];
                sleep.value = line;
                sleep.classList.add("sleepDuration");
                sleep.style.position="absolute";
                sleep.style.zIndex="20";
                sleep.style.fontFamily = "Signika Negative";
                sleep.style.fontSize = "18px";
                sleep.style.textAlign = "center";
                sleep.style.backgroundColor = "#FDFD96";
                sleep.style.color = "#1e5353";
                sleep.style.borderRadius = "5px";
                sleep.style.border = "black";
                sleep.style.marginTop= "-45px";
                sleep.style.marginLeft= "450px";
                sleepmain.appendChild(sleep);
        }  
        </script>
    </body>
</html>
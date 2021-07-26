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
            <button class="button">Statistics</button>
            <button class="button" onclick="routine()">Routine</button>
        </div>
        <div class="main"></div>
    </div>

   
    <div id="box"></div> 
    

        <div id="work"> 
            <h2>Total time spent on Work:</h2>
        </div>

        <div id="exercise">
            <h2>Total time spent on Exercising:</h2>
        </div>

        <div id="misc">
            <h2>Total time spent on Miscellaneous:</h2>
        </div>

    <script>
    window.onload = function() {
        var workDuration = 0; 
        var exerciseDuration=0;
        var miscDuration=0;
        var mealDuration=0;
                console.log("generateSchedule is called");
                let currArr = [];
                let name, year, month, date, startTimeHour, startTimeMin, endTimeHour, endTimeMin, type, newWin, prodStart, prodEnd, prodPeriod, totalWork, totalTime;
                let totalSleep = 540;
                // STEP 1: Obtain all the fixed tasks for the day
                    <?php
                        //TODO: We need to obtain the year, month and date from the html page that directs us here. So update these variables here accordingly later.
                        date_default_timezone_set('Singapore');
                        $taskYear = date("Y");
                        $taskMonth = date("m") - 1; // For javascript, months span from 0 - 11. This is already accounted for in the main schedule page.
                        //$taskDate = (int) $_POST['jsDate'];
                        $taskDate = date("d"); //Just for testing!!
                        $type = 1; //Type for fixed tasks is always 1
                        //$userid = -1;
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
                            //echo 'console.log("this is correct");';
                            $resultCheck = mysqli_num_rows($result);
                            $data = array();
                            if ($resultCheck > 0) {
                                //echo 'console.log("I have at least 1 result");';
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
                                //echo 'console.log("this is correct");';
                                $resultCheck = mysqli_num_rows($result);
                                $data = array();
                                if ($resultCheck > 0) {
                                    //echo 'console.log("I have at least 1 result");';
                                    while ($row = mysqli_fetch_assoc($result)) {
                                        $data[] = $row;   
                                    }   
                                }
                                foreach($data as $single) {
                                    $name = $single['taskName'];
                                    echo "name = '$name';";
                                    // echo "year = $taskYear;";
                                    // echo "month = $taskMonth;";
                                    // echo "date = $taskDate;";
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
                $currResult = my_sqli($conn, $prodSql);
                $currResult2 = my_sqli($conn, $wakeUpSql);
                if ($currResult) {
                    //echo 'console.log("this is correct");';
                    $resultCheck = mysqli_num_rows($currResult);
                    $currData = array();
                    if ($resultCheck > 0) {
                        //echo 'console.log("I have at least 1 result");';
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
                        echo "prodEnd = new Time($endHour, $endHour)";
                    }
                }
                
                if ($currResult2) {
                    //echo 'console.log("this is correct");';
                    $resultCheck = mysqli_num_rows($currResult2);
                    $currData = array();
                    if ($resultCheck > 0) {
                        //echo 'console.log("I have at least 1 result");';
                        while ($row = mysqli_fetch_assoc($currResult2)) {
                            $currData[] = $row;   
                        }   
                    }
                    foreach($currData as $singleData) {
                        $wakeHour = $singleData['hour'];
                        $wakeMin = $singleData['min'];
                        echo "let sleepEnd = new Time($wakeHour, $wakeMin);";
                        echo "let sleepStart = Time.findStartTime(sleepEnd, [8, 0])";
                    }
                }
                ?>
                console.log("prodstart" + prodStart);
                console.log(currArr);

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
                }  
                console.log("work duration:"+workDuration);
                console.log("exer duration:"+exerciseDuration);
                console.log("misc duration:"+miscDuration);
                // console.log("meal duration:"+mealDuration);

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
                workele.style.marginLeft= "370px";
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
                exerciseele.style.marginLeft= "370px";
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
                miscele.style.marginLeft= "370px";
                miscmain.appendChild(miscele);

                prodPeriod = new Window("productive", Date.now().getFullYear(), Date.now().getMonth(), Date.now().getDate(), prodStart, prodEnd, -1);

                //To be added in the for loop for the workduration, exercise duration and misc duration thing
                if (currArr[i].isCompletelyDuring(prodPeriod) || currArr[i].partiallyOverlaps(prodPeriod) || prodPeriod.partiallyOverlaps(prodPeriod)) {
                    let currDuration = Time.duration(currArr[i].getStartTime(), currArr[i].getEndTime());
                    totalTime += (currDuration[0] * 60) + currDuration[1];

                if (currArr.type == 0) {
                    totalWork += (currDuration[0] * 60) + currDuration[1];
                }
            let percentage = ((totalWork / totalTime) * 100); //percentage of work tasks during selected productive period
            console.log("percentage" + percentage);

            let sleepPeriod = new Window("sleep", Date.now().getFullYear(), Date.now().getMonth(), Date.now().getDate(), sleepStart, sleepEnd, -1);

            //To be added in the for loop for the workduration, exercise duration and misc duration thing
            if (currArr[i].isCompletelyDuring(sleepPeriod) || currArr[i].partiallyOverlaps(sleepPeriod) || prodPeriod.partiallyOverlaps(sleepPeriod)) {
                let currDuration = Time.duration(currArr[i].getStartTime(), currArr[i].getEndTime());
                
                totalSleep -= (currDuration[0] * 60) + currDuration[1]; //estimated sleep duration
            }
            console.log("totalSleep" + totalSleep);
            }
        }
        // let prodStart, prodEnd, prodPeriod, totalWork, totalTime;
            // let totalSleep = 540;

                // $prodSql = "SELECT * FROM infoproductive WHERE userid = $id;";
                // $wakeUpSql = "SELECT * FROM infowakeup WHERE userid = $id;";
                // $currResult = my_sqli($conn, $prodSql);
                // $currResult2 = my_sqli($conn, $wakeUpSql);
                // if ($currResult) {
                //     //echo 'console.log("this is correct");';
                //     $resultCheck = mysqli_num_rows($result);
                //     $currData = array();
                //     if ($resultCheck > 0) {
                //         //echo 'console.log("I have at least 1 result");';
                //         while ($row = mysqli_fetch_assoc($result)) {
                //             $currData[] = $row;   
                //         }   
                //     }
                //     foreach($currData as $singleData) {
                //         $startHour = $singleData['startTimeHour'];
                //         $startMin = $singleData['startTimeMin'];
                //         $endHour = $singleData['endTimeHour'];
                //         $endMin = $singleData['endTimeMin'];
                //         echo 'let prodStart = new Time($startHour, $startMin);';
                //         echo 'let prodEnd = new Time($endHour, $endHour)';
                //     }
                // }
                
                // if ($currResult2) {
                //     //echo 'console.log("this is correct");';
                //     $resultCheck = mysqli_num_rows($result);
                //     $currData = array();
                //     if ($resultCheck > 0) {
                //         //echo 'console.log("I have at least 1 result");';
                //         while ($row = mysqli_fetch_assoc($result)) {
                //             $currData[] = $row;   
                //         }   
                //     }
                //     foreach($currData as $singleData) {
                //         $wakeHour = $singleData['hour'];
                //         $wakeMin = $singleData['min'];
                //         echo 'let wakeStart = new Time($wakeHour, $wakeMin);';
                //         echo 'let wakeEnd = Time.findEndTime(wakeStart, [16, 0])';
                //     }
                // }
          
    </script>
</body>
</html>
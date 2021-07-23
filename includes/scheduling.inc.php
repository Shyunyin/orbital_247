<?php
    session_start();
?>
<!DOCTYPE HTML>
<html>
    <body>
        <script type = "text/javascript" type="module" src="../Window.js"></script>
        <script type = "text/javascript" type="module" src="../CombinedTime_Final.js"></script>
        <script>
            function generateSchedule() {
                console.log("generateSchedule is called");
                let currArr = [];
                    let name, year, month, date, startTimeHour, startTimeMin, endTimeHour, endTimeMin, type, newWin;
                    // STEP 1: Obtain all the fixed tasks for the day
                    <?php
                        //TODO: We need to obtain the year, month and date from the html page that directs us here. So update these variables here accordingly later.
                        $taskYear = (int) $_POST['jsYear'];
                        $taskMonth = (int) $_POST['jsMonth']; // For javascript, months span from 0 - 11. This is already accounted for in the main schedule page.
                        //$taskDate = (int) $_POST['jsDate'];
                        $taskDate = 24; //Just for testing!!
                        $type = 1; //Type for fixed tasks is always 1
                        $userid = -1;


                        $sql = "SELECT * FROM fixedtaskwindow WHERE userid = $userid AND taskYear = $taskYear AND taskMonth = $taskMonth AND taskDate = $taskDate;";

                        $fullDate = $taskYear."-".($taskMonth + 1)."-".$taskDate;
                        $timestamp = strtotime($fullDate);
                        $dayNum = date('w', $timestamp);

                        $dailySql = "SELECT * FROM routinetask WHERE userid = $userid AND freq = 0;";

                        $weeklySql = "SELECT * FROM routinetask WHERE userid = $userid AND freq = 1 AND taskDay = $dayNum;";

                        $biweeklySql = "SELECT * FROM routinetask WHERE userid = $userid AND freq = 2 AND taskDay = $dayNum AND taskWeek = 0;";

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
                        echo "year = '$taskYear';";
                        echo "month = '$taskMonth';";
                        echo "date = '$taskDate';";
                        //echo'console.log(currArr);' ;
                    ?>

                    console.log(currArr);
                    // STEP 2: Sort out the fixed tasks in chronological order
                    let sortedArr = [];
                    for (let i = 0; i < currArr.length; i++) {
                        let innerIndex = 0
                        for (let j = 0; j < sortedArr.length; j++) {
                            if (!(currArr[i]).isCompletelyAfter(sortedArr[j])) {
                                //innerIndex = j;
                                j = sortedArr.length
                            } else {
                                innerIndex++;
                            }
                        }
                        sortedArr.splice(innerIndex, 0, currArr[i]);
                    }
                    console.log(sortedArr); //For testing

                    //STEP 3: Inserting breaks
                    var totalBreakMins = 0;
                    let breakArr = [];
                    let startTaskStartTime, lastTaskEndTime;
                    //TODO: No breaks to be scheduled directly after meals! So check for the taskCat, do this after you have decided the cat system.
                    for (let i = 0; i < sortedArr.length; i++) {
                        startTaskStartTime = sortedArr[i].getStartTime();
                        // If there are back to back tasks
                        if (i < sortedArr.length - 1 && (sortedArr[i].getEndTime()).equals(sortedArr[i + 1].getStartTime())) {
                            //let startIndex = i;
                            let endIndex = i;
                            while (endIndex < sortedArr.length && (sortedArr[endIndex].getEndTime()).equals((sortedArr[endIndex + 1]).getStartTime())) {
                                endIndex++;
                                i++;
                            }
                            lastTaskEndTime = sortedArr[endIndex].getEndTime();
                        } else {
                            lastTaskEndTime = sortedArr[i].getEndTime();
                        }
                        //let currBreakMins = Break.calculateBreak(sortedArr[i].getStartTime(), sortedArr[i].getEndTime());

                        let currBreakMins = Break.calculateBreak(startTaskStartTime, lastTaskEndTime);

                        totalBreakMins += currBreakMins;

                        let toBeScheduled = Math.min(totalBreakMins, 30);

                        //let endOfBreak = Time.findEndTime(sortedArr[i].getEndTime(), [0, toBeScheduled]);
                        let endOfBreak = Time.findEndTime(lastTaskEndTime, [0, toBeScheduled]);

                        // This check is to be done for all tasks except the last one
                        if (i < sortedArr.length - 1) {
                            // If the break does end before the next fixed task
                            if (((endOfBreak.getHours() * 60) + endOfBreak.getMins()) <= ((sortedArr[i + 1].getStartTime().getHours() * 60) + sortedArr[i + 1].getStartTime().getMins())) {
                                //let newBreakWin = new Window("Break", parseInt(year), parseInt(month), parseInt(date), sortedArr[i].getEndTime(), endOfBreak, -1); //TODO: Breaks can just be type -1?

                                let newBreakWin = new Window("Break", parseInt(year), parseInt(month), parseInt(date), lastTaskEndTime, endOfBreak, -1); //TODO: Breaks can just be type -1?

                                breakArr.push(newBreakWin);

                                totalBreakMins -= toBeScheduled;
                            // If the tasks are NOT back to back
                            } else {
                            //} else if (((sortedArr[i].getEndTime().getHours() * 60) + sortedArr[i].getEndTime().getMins()) != ((sortedArr[i + 1].getStartTime().getHours() * 60) + sortedArr[i + 1].getStartTime().getMins())) {

                                //let newBreakWin = new Window("Break", parseInt(year), parseInt(month), parseInt(date), sortedArr[i].getEndTime(), sortedArr[i + 1].getStartTime(), -1); //TODO: Breaks can just be type -1?

                                let newBreakWin = new Window("Break", parseInt(year), parseInt(month), parseInt(date), lastTaskEndTime, sortedArr[i + 1].getStartTime(), -1); //TODO: Breaks can just be type -1?

                                breakArr.push(newBreakWin);

                                //let actualBreakMins = Time.duration(sortedArr[i].getEndTime(), sortedArr[i + 1].getStartTime());
                                let actualBreakMins = Time.duration(lastTaskEndTime, sortedArr[i + 1].getStartTime());

                                totalBreakMins -= actualBreakMins;
                            // If the tasks are back to back
                            // } else if (((sortedArr[i].getEndTime().getHours() * 60) + sortedArr[i].getEndTime().getMins()) == ((sortedArr[i + 1].getStartTime().getHours() * 60) + sortedArr[i + 1].getStartTime().getMins())) {

                            }
                        } else if (i == sortedArr.length - 1) {
                            // Just schedule the break for the last task
                            let newBreakWin = new Window("Last Break", parseInt(year), parseInt(month), parseInt(date), sortedArr[i].getEndTime(), endOfBreak, -1); //TODO: Breaks can just be type -1?

                            breakArr.push(newBreakWin);

                            totalBreakMins -= toBeScheduled;
                        }
                    }

                    //STEP 4: Insert the breaks into the final array so that it can be printed. 
                    for (let i = 0; i < breakArr.length; i++) {
                        for (let j = 0; j < sortedArr.length; j++) {
                            if ((breakArr[i].getStartTime()).equals(sortedArr[j].getEndTime())) {
                                sortedArr.splice(j + 1, 0, breakArr[i]);
                                j = sortedArr.length;
                            }
                        }
                    }

                    //STEP 5: Return the final array to be printed
                    return sortedArr;
            }

            generateSchedule();
            
        </script>
    </body>
</html>
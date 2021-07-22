<?php
    session_start();
?>
<!DOCTYPE HTML>
<html>
    <body>
        <script type = "text/javascript" type="module" src="../Time.js"></script>
        <script>
            console.log("I come here too");
            // var plsWork;
            // console.log(plsWork);
            /*
            var plsWork;
            //var plsWorkNum;
            console.log(plsWork);
            console.log("I come here too");
            */
            class Window {
                /**
                 * Constructor to create window objects
                 * @param {String} taskName Name of the task ('null' for empty windows)
                 * @param {Number} year Year of the window
                 * @param {Number} month Month of the window (0-11, Jan-Dec)
                 * @param {Number} date Date of the window
                 * @param {Time} startTime Time at which the window starts
                 * @param {Time} endTime Time at which the window ends
                 * @param {Number} type 0 - Empty, 1 - A fixed task/Break, 2 - A non-fixed task, 3 - A non-fixed priority task
                 */
                constructor(taskName, year, month, date, startTime, endTime, type) {
                    this.taskName = taskName;
                    this.year = year;
                    this.month = month;
                    this.date = date;
                    this.startTime = startTime;
                    this.endTime = endTime;
                    this.type = type;
                }

                /**
                 * To retrieve the name of the task corresponding to the window
                 * @returns {String} The name of the task corresponding to the window ('null' for empty windows)
                 */
                getTaskName() {
                    return this.taskName;
                }

                /**
                 * To retrieve the year of a window 
                 * @returns {Number} The year of a window (Format: Full year)
                 */
                getYear() {
                    return this.year;
                }

                /**
                 * To retrieve the month of a window 
                 * @returns {Number} The month of a window (0-11, Jan-Dec)
                 */
                getMonth() {
                    return this.month;
                }

                /**
                 * To retrieve the date of a window 
                 * @returns {Number} The date of a window (1-31)
                 */
                getDate() {
                    return this.date;
                }

                /**
                 * To retrieve the start time of a window 
                 * @returns {Time} The start time of a window
                 */
                getStartTime() {
                    return this.startTime;
                }

                /**
                 * To retrieve the end time of a window 
                 * @returns {Time} The end time of a window
                 */
                getEndTime() {
                    return this.endTime;
                }

                /**
                 * To retrieve the start time of a window in milliseconds
                 * @returns {Number} The start time of a window in milliseconds
                 */
                getStartTimeInMs() {
                    let currWindowStart = new Date(this.year, this.month, this.date, this.startTime.getHours(), this.startTime.getMins());
                    return currWindowStart.getTime();
                }

                /**
                 * To retrieve the end time of a window in milliseconds
                 * @returns {Number} The end time of a window in milliseconds
                 */
                getEndTimeInMs() {
                    let currWindowEnd = new Date(this.year, this.month, this.date, this.endTime.getHours(), this.endTime.getMins());
                    return currWindowEnd.getTime()
                }

                /**
                 * To retrieve the hours of the start time of a window
                 * @returns {Number} The hours of the start time of a window (in 24h format)
                 */
                getStartTimeHours() {
                    return this.startTime.getHours();
                }

                /**
                 * To retrieve the minutes of the start time of a window
                 * @returns {Number} The minutes of the start time of a window
                 */
                getStartTimeMins() {
                    return this.startTime.getMins();
                }

                /**
                 * To retrieve the hours of the end time of a window
                 * @returns {Number} The hours of the end time of a window (in 24h format)
                 */
                getEndTimeHours() {
                    return this.endTime.getHours();
                }

                /**
                 * To retrieve the minutes of the end time of a window
                 * @returns {Number} The minutes of the end time of a window
                 */
                getEndTimeMins() {
                    return this.endTime.getMins();
                }

                /**
                 * To update the start time of an existing window to a new time
                 * @param {Time} newStartTime The new time to which the start time of the existing window is to be changed to
                 */
                changeStartTime(newStartTime) {
                    this.startTime = newStartTime;
                }

                /**
                 * To update the end time of an existing window to a new time
                 * @param {Time} newStartTime The new time to which the end time of the existing window is to be changed to
                 */
                changeEndTime(newEndTime) {
                    this.endTime = newEndTime;
                }

                /**
                 * To check if 2 windows are exactly the same
                 * @param {Window} window 
                 * @returns {Boolean} True if they are the same window, false if otherwise
                 */
                equals(window) {
                    return (this.getStartTimeInMs() == window.getStartTimeInMs() && this.getEndTimeInMs() == window.getEndTimeInMs());
                }

                /**
                 * Checks if a window has already passed in time
                 * @returns {Boolean} True if the window has already passed, false if otherwise
                 */
                isPast() {
                    let now = new Date();
                    return this.getEndTimeInMs() < now.getTime();
                }

                /**
                 * Checks if a given window starts after 'window'
                 * @param {Window} window The window to be compared with
                 * @returns {Boolean} True if given window starts after 'window', false if otherwise
                 */
                startsAfter(window) {
                    return this.getStartTimeInMs() > window.getStartTimeInMs();
                }

                /**
                 * Checks if a given window end after 'window'
                 * @param {Window} window The window to be compared with
                 * @returns {Boolean} True if given window ends after 'window', false if otherwise
                 */
                endsAfter(window) {
                    return this.getEndTimeInMs() > window.getEndTimeInMs();
                }

                /**
                 * Checks if a given window only starts after 'window' ends
                 * @param {Window} window The window to be compared with
                 * @returns {Boolean} True if a given window starts after 'window' ends, false otherwise
                 */
                isCompletelyAfter(window) {
                    return this.getStartTimeInMs() >= window.getEndTimeInMs();
                }

                /**
                 * Checks if a given window partially overlaps with 'window'
                 * @param {Window} window The window to be compared with
                 * @returns {Boolean} True if given window partially overlaps with 'window', false if otherwise
                 */
                //IMPORTANT NOTE: window1.isCompletelyDuring(window2) may eval to true but window1.partiallyOverlaps(window2) may eval to false (bc we only consider partially overlapping cases)
                partiallyOverlaps(window) {
                    // If the start time of a given window is before the start time of 'window' and the end time of a given window is before the end time of 'window' but after the start time of 'window'
                    if (window.startsAfter(this) && window.getStartTimeInMs() < this.getEndTimeInMs() && window.endsAfter(this)) {
                        return true;
                    // If the start time of a given window is after the start time of 'window' but before the end time of 'window' and the end time of a given window is after the end time of 'window'
                    } else if (this.startsAfter(window) && this.getStartTimeInMs() < window.getEndTimeInMs() && this.endsAfter(window)) {
                        return true;
                    } else if (this.getStartTimeInMs() == window.getStartTimeInMs() && (this.endsAfter(window) || window.endsAfter(this))) {
                        return true;
                    } else if ((this.startsAfter(window) || window.startsAfter(this)) && this.getEndTimeInMs() == window.getEndTimeInMs()) {
                        return true;
                    } else {
                        return false;
                    }
                }

                /**
                 * Checks if a given window occurs completely during 'window'
                 * @param {Window} window 
                 * @returns {Boolean} True if a given window occurs completely during 'window', false if otherwise
                 */
                //IMPORTANT NOTE: Only denotes a one way relationship (e.g. window1.isCompletelyDuring(window2) may eval to true and window2.isCompletelyDuring(window1) may eval to false)
                isCompletelyDuring(window) {
                    // If a given window starts after 'window' and ends before 'window'
                    return this.startsAfter(window) && window.endsAfter(this);
                }

                /**
                 * Checks if a window falls during a user's sleeping hours so as to warn users against scheduling tasks at those timings
                 * @returns {Boolean} True if window falls during user's sleeping hours, false if otherwise
                 */
                duringSleep() {
                    let sleepStartTime = new Time(RoutineInfo.getSleepTimeHours(), Info.getSleepTimeMins())
                    let sleepEndTime = new Time(RoutineInfo.getWakeUpTimeHours(), Info.getWakeUpTimeMins());

                    if (sleepEndTime.getHours() > sleepStartTime.getHours()) {
                        let sleepWindow = new Window(this.year, this.month, this.date, sleepStartTime, sleepEndTime);
                        return this.partiallyOverlaps(sleepWindow) || this.isCompletelyDuring(sleepWindow);
                    } else {
                        let sleepWindow1 = new Window(this.year, this.month, this.date, sleepStartTime, new Time(23, 59));
                        let sleepWindow2 = new Window(this.year, this.month, this.date, new Time(0,0), sleepEndTime);
                        return this.partiallyOverlaps(sleepWindow1) || this.isCompletelyDuring(sleepWindow1) || this.partiallyOverlaps(sleepWindow2) || this.isCompletelyDuring(sleepWindow2);
                    }
                }

                /**
                 * Checks if a given window is falls during user's productive slot
                 * @returns True if a given window is falls during user's productive slot, false if otherwise
                 */
                duringProductivePeriod() {
                    let productiveStartTime = new Time(RoutineInfo.getProductiveSlotHours(), RoutineInfo.getProductiveSlotMins())
                    let productiveEndTime = Time.findEndTime(productiveStartTime, [4, 0]);

                    let productiveWindow = new Window(this.year, this.month, this.date, productiveStartTime, productiveEndTime);

                    return this.partiallyOverlaps(productiveWindow) || this.isCompletelyDuring(productiveWindow);
                }

                /**
                 * To insert a window into the correct array in chronological order
                 * @returns Errors if there are any clashes in the start and end timings of a given window with existing windows in the array
                 */
                
                insertWindow() {
                    console.log("insertWindow is called");
                }
            }

            <?php
                // // Important point: Cannot do normal php echoing inside, only to assign stuff to js variables
                //     $random = "hello";
                //     echo ("plsWork = '$random';");
                echo('console.log("I come to the php block");');
                $user = 'root'; 
                $pass = '';
                $db='orbital247';
                $conn = mysqli_connect('localhost', $user, $pass, $db);

                // STEP 1: Retrieving all the relvant info for fixed tasks (and non-fixed tasks)
                $taskName = $_POST['taskName'];
                $taskCat = (int) $_POST['jsCat'];
                $taskYear = (int) $_POST['jsYear'];
                $taskMonth = (int) $_POST['jsMonth'] - 1; // For javascript, months span from 0 - 11
                $taskDate = (int) $_POST['jsDate'];
                $startHour = (int) $_POST['jsStartHour'];
                $startMin = (int) $_POST['jsStartMin'];
                $endHour = (int) $_POST['jsEndHour'];
                $endMin = (int) $_POST['jsEndMin']; 
                $type = 1; //Type for fixed tasks is always 1
                $userid = -1;
                //$userid = (int) $_SESSION["userid"];
                $taskHour = (int) $_POST['jsHour'];
                $taskMin = (int) $_POST['jsMin'];
                $numOfSessions = (int) $_POST['jsNum'];

                echo "let name = '$taskName';";
                echo "let cat = '$taskCat';";
                echo "let year = '$taskYear';";
                echo "let month = '$taskMonth';";
                echo "let date = '$taskDate';";
                echo "let startHour = '$startHour';";
                echo "let startMin = '$startMin';";
                echo "let endHour = '$endHour';";
                echo "let endMin = '$endMin';";
                echo "let taskHour = $taskHour;";
                echo "let taskMin = $taskMin;";
                echo "let numOfSessions = $numOfSessions;";
                if ($numOfSessions == 0) {
                    echo 'let newWin = new Window(name, cat, year, month, date, startHour, startMin, endHour, endMin, 1);';

                    echo 'newWin.insertWindow();';
                } else { 
                    echo 'let newWin = new Window(name, cat, year, month, date, numOfSessions, taskHour, taskMin, 2);';
                }
                //echo('console.log("I made it to the end");');
                // // For testing purposes
                // echo "taskName in php is: " . $taskName . "<br>";
                // echo "cat in php is: " . $taskCat . "<br>";
                // echo "startHour in php is: " . $startHour . "<br>";
                // echo "startMin in php is: " . $startMin . "<br>";
                // echo "endHour in php is: " . $endHour . "<br>";
                // echo "endMin in php is: " . $endMin . "<br>";
                // echo "taskYear in php is: " . $taskYear . "<br>";
                // echo "taskMonth in php is: " . $taskMonth . "<br>";
                // echo "taskDate in php is: " . $taskDate . "<br>";
                // echo "type in php is: " . $type . "<br>";
                // echo "taskHour in php is: " . $taskHour . "<br>";
                // echo "taskMin in php is: " . $taskMin . "<br>";
                // echo "numOfSessions in php is: " . $numOfSessions . "<br>";
                // echo "plsWork = '$taskName';";
                // echo "plsWorkNum = '$taskCat';";
                //echo "userid in php is: " . $userid . "<br>";
                //echo gettype($startHour) . "<br>";
                //echo "startHour in php is: " . $startHour . "<br>";
                

                // STEP 2: Retrieve all the fixed window tasks for the day and returning a javascript array
                //$sql = "SELECT * FROM fixedtaskwindow WHERE userid = $userid AND taskYear = $taskYear AND taskMonth = $taskMonth AND taskDate = $taskDate;";
                // $result = mysqli_query($conn, $sql);
                // $resultCheck = mysqli_num_rows($result);
                // $data = array();
                // echo "let finalArr = [];";
                // echo "let boolResult;";

                // if ($resultCheck > 0) {
                //     while ($row = mysqli_fetch_assoc($result)) {
                //         $data[] = $row;   
                //     }   
                // }
                // foreach($data as $single) {
                //     $taskName = $single['taskName'];
                //     echo "let taskName = '$taskName';";
                //     $taskCat = $single['taskCategory'];
                //     echo "let taskCat = '$taskCat';";
                //     $year = $single['taskYear'];
                //     echo "let year = '$year';";
                //     $month = $single['taskMonth'];
                //     echo "let month = '$month';";
                //     $date = $single['taskDate'];
                //     echo "let date = '$date';";
                //     $startTimeHour = $single['startTimeHour'];
                //     echo "let startTimeHour = '$startTimeHour';";
                //     $startTimeMin = $single['startTimeMin'];
                //     echo "let startTimeMin = '$startTimeMin';";
                //     $endTimeHour = $single['endTimeHour'];
                //     echo "let endTimeHour = '$endTimeHour';";
                //     $endTimeMin = $single['endTimeMin'];
                //     echo "let endTimeMin = '$endTimeMin';";
                //     $type = $single['type'];
                //     echo "let type = '$type';";
                    
                //     echo "let newWin = new Window(taskName, taskCat, year, month, date, new Time(startTimeHour, startTimeMin), new Time(endTimeHour, endTimeMin), type);";

                //     echo "finalArr.push(newWin);";
                // }

                // echo "boolResult = newWin.insertWindow(finalArr);";

                /*
                //The year, month and date variable can be replaced with this single variable:
                //taskDate datetime NOT NULL (input will be in the format of yyyy-mm-dd or yyyy-mm-dd hh:mm:ss)
                //When retrieving, since it will be a string, can just splice the string to get the various values

                //Creating the emptyWindows table
                CREATE TABLE emptywindow (
                    id int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
                    windowName varchar(256) NOT NULL,
                    taskYear int(11) NOT NULL,
                    taskMonth int(11) NOT NULL,
                    taskDate int(11) NOT NULL,
                    startTimeHour int(11) NOT NULL, 
                    startTimeMin int(11) NOT NULL,
                    endTimeHour int(11) NOT NULL,
                    endTimeMin int(11) NOT NULL,
                    type int(11) NOT NULL,
                    userid int(11) NOT NULL
                );

                //Creating the fixedTasks table
                CREATE TABLE fixedtaskwindow (
                    id int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
                    taskName varchar(256) NOT NULL,
                    taskCategory int(11) NOT NULL,
                    taskYear int(11) NOT NULL,
                    taskMonth int(11) NOT NULL,
                    taskDate int(11) NOT NULL,
                    startTimeHour int(11) NOT NULL,
                    startTimeMin int(11) NOT NULL,
                    endTimeHour int(11) NOT NULL,
                    endTimeMin int(11) NOT NULL,
                    type int(11) NOT NULL,
                    userid int(11) NOT NULL
                );

                //Creating the nonFixedTasks table
                CREATE TABLE nonfixedtasks (
                    id int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
                    taskName varchar(256) NOT NULL,
                    taskCategory int(5) NOT NULL,
                    year int NOT NULL,
                    month int NOT NULL,
                    date int NOT NULL,
                    numOfSessions int(3) NOT NULL,
                    durrOfSessHours int() NOT NULL, // What are the limits?
                    durrOfSessMins int(59) NOT NULL,
                    taskAfterIt varchar(256) NOT NULL,
                    userid int(11) NOT NULL
                );

                //Creating the nonFixedTasksPriority table
                CREATE TABLE nonFixedTasksPriority (
                    userId int PRIMARY KEY AUTO_INCREMENT NOT NULL,
                    userName varchar(256) NOT NULL,
                    taskName varchar(256) NOT NULL,
                    taskCategory int(5) NOT NULL,
                    year int NOT NULL,
                    month int NOT NULL,
                    date int NOT NULL,
                    numOfSessions int(3) NOT NULL,
                    durrOfSessHours int() NOT NULL, // What are the limits?
                    durrOfSessMins int(59) NOT NULL,
                    taskAfterIt varchar(256) NOT NULL
                );
                */
            ?>
            //console.log(plsWork);
            //console.log(plsWorkNum);
        </script>
    </body>
</html>
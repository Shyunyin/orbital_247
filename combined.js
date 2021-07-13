class Time {
    /**
     * Constructor to create Time objects
     * @param {Number} hours     Hours of the time object (0-23)
     * @param {Number} mins      Minutes of the time object (0-59)
     */
    constructor(hours, mins) {
        this.hours = hours;
        this.mins = mins;
    }

    /**
     * Calculates the number of days in a particular month
     * @param {Number} month The month for which the number of days is requires (0-11, Jan-Dec)
     * @param {Number} year  The respective year (Format: yyyy)
     * @returns {Number}     The number of days in the respective month
     */
    static daysInMonth(month, year) {
        let x = new Date(year, month + 1, 0);
        return d.getDate();
    }

    /**
     * Calculates the duration of a task in hours and minutes
     * @param {Time} startTime Time at which the task starts
     * @param {Time} endTime   Time at which the task ends
     * @returns {Number} An array, where the first element represents the hours and 
     *                   second element represents the minutes
     */
     static duration(startTime, endTime) {
        let elapsed = (endTime.getHours() * 60) + (endTime.getMins()) - (startTime.getHours() * 60) - (startTime.getMins()); 
        if (elapsed < 0) {
            let firstHalf = Time.duration(startTime, new Time(23, 59));
            let secondHalf = Time.duration(new Time(0, 0), endTime);
            if (firstHalf[1] + secondHalf[1] + 1 > 60) {
                let newMins = (firstHalf[1] + secondHalf[1] + 1) % 60;
                let newHours = firstHalf[0] + secondHalf[0] + 1;
                return [newHours, newMins];
            } else {
                let newMins = firstHalf[1] + secondHalf[1];
                let newHours = firstHalf[0] + secondHalf[0];
                return [newHours, newMins];
            }
            //return new Error('Start time is after end time!')
        }
        let elapsedHours = Math.floor(elapsed / 60);
        let elapsedMins = elapsed - (elapsedHours * 60);
        return [elapsedHours, elapsedMins];
    }

    /**
     * To retrieve the number of hours for a given time
     * @returns {Number} The number of hours for a given time
     */
    getHours() {
        return this.hours;
    }

    /**
     * To retrieve the number of minutes for a given time
     * @returns {Number} The number of hours for a given time
     */
    getMins() {
        return this.mins;
    }

    /**
     * Checks if a given time is exactly the same at 'time'
     * @param {Time} time 
     * @returns {Boolean} True if the 2 timings are exactly the same, false if otherwise
     */
    equals(time) {
        return (this.hours == time.getHours() && this.mins == time.getMins());
    }

    /**
     * 
     * @param {Time} endTime 
     * @param {Number} duration Format: [hours, mins]
     */
    static findStartTime(endTime, duration) {
        let durHours = duration[0]
        let durMins = duration[1]
        let newHours;
        let newMins;
        if (endTime.getMins() < durMins) {
            durMins -= endTime.getMins();
            newHours = (24 + endTime.getHours() - 1 - durHours) % 24;
            newMins = 60 - durMins; //TODO: Must change everything to 60
        } else {
            newHours = (24 + endTime.getHours() - durHours) % 24;
            newMins = endTime.getMins() - durMins;
        }
        return new Time(newHours, newMins);
    }

    /**
     * 
     * @param {Time} endTime 
     * @param {Number} duration Format: [hours, mins]
     */
     static findEndTime(startTime, duration) {
        let durHours = duration[0]
        let durMins = duration[1]
        let newHours;
        let newMins;
        if (startTime.getMins() + durMins > 60) {
            durMins -= (60 - startTime.getMins());
            newHours = (startTime.getHours() + 1 + durHours) % 24;
            newMins = durMins; //TODO: Must change everything to 60
        } else {
            newHours = (startTime.getHours() + durHours) % 24;
            newMins = startTime.getMins() + durMins;
        }
        return new Time(newHours, newMins);
    }

}

Time.prototype.timeRegistered = Math.round(Date.now()/10000) * 10000; //To the nearest minute (Need to double check calculation)

class RoutineInfo {
    /**
     * Constructor to record user's wake-up time and productive slot information
     * @param {Time} wakeUpTime The time at which user usually wakes up at
     * @param {Time} productiveSlot Start time of productivity slot (Slot's duration will always be at 4 hours)
     */
    constructor(wakeUpTime, productiveSlot) {
        RoutineInfo.wakeUpTime = wakeUpTime;
        RoutineInfo.productiveSlot = productiveSlot;
        // Estimating sleep time (Assuming sleep time to be for 8 hours)
        RoutineInfo.sleepTime = new Time((RoutineInfo.wakeUpTime.getHours() + 16) % 24, RoutineInfo.wakeUpTime.getMins());
        //Updating the database
        cloudDB.collection("Users").doc(userName).collection("Routine Info").doc("Routine Info").set(
            {
                wakeUpTimeStart: RoutineInfo.wakeUpTime,
                wakeUpTimeEnd: RoutineInfo.sleepTime,
                productiveSlotStart: RoutineInfo.productiveSlot,
                productiveSlotEnd: Time.findEndTime(RoutineInfo.productiveSlot, [4, 0]),
            }
        ).then(function(){
            console.log("Routine info for for user '" + userName + "' has been created.");
        })
        .catch(function(error) {
            console.error("Error adding routine info doc for user '" + userName + "'' : ", error);
        });

    }

    /**
     * To retrieve the wake-up time of a user
     * @returns {Time} The wake-up time of a user
     */
    static getWakeUpTime() {
        return RoutineInfo.wakeUpTime;
    }

    /**
     * To retrieve the hours of the wake-up time of a user
     * @returns {Number} The hours of the wake-up time of a user
     */
    static getWakeUpTimeHours() {
        return RoutineInfo.wakeUpTime.getHours();
    }

    /**
     * To retrieve the minutes of the wake-up time of a user
     * @returns {Number} The minutes of the wake-up time of a user
     */
    static getWakeUpTimeMins() {
        return RoutineInfo.wakeUpTime.getMins();
    }

    /**
     * To retrieve the estimated sleep time of a user
     * @returns {Time} The sleep time of a user
     */
    static getSleepTime() {
        return RoutineInfo.sleepTime;
    }

    /**
     * To retrieve the hours of the estimated sleep time of a user
     * @returns {Number} The hours of the estimated sleep time of a user
     */
    static getSleepTimeHours() {
        return RoutineInfo.sleepTime.getHours();
    }

    /**
     * To retrieve the minutes of the estimated sleep time of a user
     * @returns {Number} The minutes of the estimated sleep time of a user
     */
    static getSleepTimeMins() {
        return RoutineInfo.sleepTime.getMins();
    }

    /**
     * To retrieve the start time of a user's productivity slot
     * @returns {Time} The start time of a user's productivity slot
     */
    static getProductiveSlot() {
        return RoutineInfo.productiveSlot;
    }

    /**
     * To retrieve the hours of the start time of a user's productivity slot
     * @returns {Time} The hours of the start time of a user's productivity slot
     */
     static getProductiveSlotHours() {
        return RoutineInfo.productiveSlot.getHours();
    }

    /**
     * To retrieve the minutes of the start time of a user's productivity slot
     * @returns {Time} The minutes of the start time of a user's productivity slot
     */
     static getProductiveSlotMins() {
        return RoutineInfo.productiveSlot.getMins();
    }
}

class Window {
    /**
     * Constructor to create window objects
     * @param {String} taskName Name of the task ('null' for empty windows)
     * @param {Number} year Year of the window
     * @param {Number} month Month of the window (0-11, Jan-Dec)
     * @param {Number} date Date of the window
     * @param {Time} startTime Time at which the window starts
     * @param {Time} endTime Time at which the window ends
     * @param {Number} type 0 - Empty, 1 - A fixed task, 2 - A non-fixed task, 3 - A non-fixed priority task
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
     * To update the accumulated duration of an existing window to a new duration
     * @param {Number} newDuration The new accumulated duration in hours and minutes (Format: [hours, mins])
     */
    /*
    changeAccumulateDuration(newDuration) {
        this.accumulatedDuration = newDuration;
    }
    */
    /**
     * To update the group number fo an existing window to a new number
     * @param {Number} newGroup The new group number (based on Window.prototype.group)
     */
    /*
    changeGroup(newGroup) {
        this.group = newGroup;
    }
    */
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

    /*
    Add_Window_WithID() {
        formattedDate = (this.date).toString() + "/" + (this.month).toString() + "/" + (this.year).toString();
        // Procedure for adding empty widows to the database
        if (this.type == 0) {
            cloudDB.collection("Users").doc("sniggy").collection("formattedDate").doc("Empty Windows").collection("Empty Windows").doc(startTime ).set(
            //cloudDB.collection(Users).doc(#username).collection(formattedDate).doc("Empty Windows").collection("Empty Windows").doc(#startTimeOfWindow).set(
                {
                    taskName : null,
                    year : Number(this.year),
                    month : Number(this.month),
                    date : Number(this.date),
                    taskCategory : Number(0),
                    startTime : Array(Number(this.startTime[0]), Number(this.startTime[1])),
                    endTime : Array(Number(this.endTime[0]), Number(this.endTime[1])),
                    type : Number(0),
                }
            ).then(function(){
                console.log("Empty window for user '" + username + "' at " + this.startTime + " has been added."); //TODO: Need to define username
            })
            .catch(function(error) {
                console.error("Error adding empty window for user '" + username + "' : ", error);
            });
        // Procedure for adding fixed tasks to the database
        } else {
            cloudDB.collection("Users").doc("sniggy").collection("formattedDate").doc("Tasks").collection("Tasks").doc(this.taskName).set(
            //cloudDB.collection(Users).doc(#username).collection(formattedDate).doc("Tasks").collection("Tasks").doc(this.taskName).set(
                {
                    taskName : null,
                    year : Number(this.year),
                    month : Number(this.month),
                    date : Number(this.date),
                    taskCategory : Number(0),
                    startTime : Array(Number(this.startTime[0]), Number(this.startTime[1])),
                    endTime : Array(Number(this.endTime[0]), Number(this.endTime[1])),
                    type : Number(1),
                }
            ).then(function(){
                console.log("Fixed task for user '" + "' at " + this.startTime + " has been added.");
                //console.log("Fixed task for user '" + username + "' at " + this.startTime + " has been added."); //TODO: Need to define username
            })
            .catch(function(error) {
                console.error("Error adding fixed task for user '" + "' : ", error);
                //console.error("Error adding fixed task for user '" + username + "' : ", error);
            });
        } 
    }
    */

    /**
     * To insert a window into the correct array in chronological order
     * @returns Errors if there are any clashes in the start and end timings of a given window with existing windows in the array
     */
    insertWindow() {
        // To locate the array that represents that day of the given window. Array in position 0 of 'collection' arrays will represent the current day, while every slot to the right will represent each subsequent day
        console.log("I come to the insert window function")
        let now = new Date();
        let currDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        let expectedDate = new Date(this.year, this.month, this.date);
        let index = (expectedDate - currDate)/86400000;

        if (index < 0) {
            return new Error('Invalid index.')
        }

        if (this.type == 0) { // To insert empty windows
            let currArr = Window.prototype.emptyCollection[index];
            newIndex = 0;
            // Doing checks to ensure that task does not clash with any existing empty windows.
            while (newIndex < currArr.length && this.isCompletelyAfter(currArr[newIndex])) {
                newIndex++;
            }
            if (newIndex == currArr.length) {
                currArr.push(this);
            }
            if (this.getEndTimeInMs() < currArr[index].getStartTimeInMs()) {
                currArr.splice(index, 0, this);
                // Updating the database as well
                //this.Add_Window_WithID();
            } else {
                return new Error("Cannot schedule empty window as it clashes with an existing empty window. Please adjust the start and end times of other windows accordingly.");
            }
        } else { // To insert tasks for the current day and furture days
            let currArr = Window.prototype.fixedFutureArr; // For tasks to be schedule beyond 7 days from now
            if (this.type == 1 && index < 8) { 
                currArr = Window.prototype.occupiedCollection[index];
            }
            // Doing checks to ensure that task does not clash with any existing fixed, future tasks.
            let newIndex = 0;
            while (newIndex < currArr.length && this.isCompletelyAfter(currArr[newIndex])) {
                newIndex++;
            }
            // If all currently scheduled tasks take place before the current to-be scheduled task starts
            if (newIndex == currArr.length) {
                currArr.push(this);
            }
            if (this.getEndTimeInMs() < currArr[index].getStartTimeInMs()) {
                currArr.splice(newIndex, 0, this);
                // Updating the database as well
                //this.Add_Window_WithID()

                let removedBreak = new Window(this.year, this.month, this.date, this.startTime, this.endTime, 0);
                return removedBreak.removeWindow();
            } else {
                return new Error("Cannot schedule task as it clashes with an existing task");
            }
        }
    }
    /*
    Remove_Window_WithID() {
        formattedDate = (this.date).toString() + "/" + (this.month).toString() + "/" + (this.year).toString();
        // Procedure for removing of windows from the database
        if (this.type == 0) {
            cloudDB.collection("Users").doc("sniggy").collection(formattedDate).doc("Empty Windows").collection("Empty Windows").doc(startTime).delete()
            //cloudDB.collection(Users).doc(#username).collection(formattedDate).doc("Empty Windows").collection("Empty Windows").doc(#startTimeOfWindow).delete()
            .then(function(){
                console.log("Empty window for user '" + "' at " + this.startTime + " has been removed.");
                //console.log("Empty window for user '" + username + "' at " + this.startTime + " has been removed."); //TODO: Need to define username
            })
            .catch(function(error) {
                console.error("Error removing empty window for user '" + "' : ", error);
                //console.error("Error removing empty window for user '" + username + "' : ", error);
            });
        // Procedure for removing fixed tasks from the database
        } else {
            cloudDB.collection("Users").doc("sniggy").collection("formattedDate").doc("Tasks").collection("Tasks").doc(this.taskName).set()
            //cloudDB.collection(Users).doc(#username).collection(formattedDate).doc("Tasks").collection("Tasks").doc(this.taskName).set()
            .then(function(){
                console.log("Fixed task for user '" + "' at " + this.startTime + " has been removed.");
                //console.log("Fixed task for user '" + username + "' at " + this.startTime + " has been removed."); //TODO: Need to define username
            })
            .catch(function(error) {
                console.error("Error removing fixed task for user '" + "' : ", error);
                //console.error("Error removing fixed task for user '" + username + "' : ", error);
            });
        } 
    }
    */

    /**
     * To remove a window from the correct array
     * @returns Errors if there are no such existing windows to be removed
     */
    removeWindow() {
        // To locate the array that represents that day of the given window. Array in position 0 of 'collection' arrays will represent the current day, while every slot to the right will represent each subsequent day
        let currDate = new Date().getDate();
        currDate = new Date(this.year, this.month, currDate);
        let expectedDate = new Date(this.year, this.month, this.date);
        let index = (expectedDate - currDate)/86400000;

        if (index < 0) {
            return new Error('Invalid index.')
        }

        if (this.type == 0) {
            let currArr = Window.prototype.emptyCollection[index];
            let startIndex = 0;
            //While start time of given window is after the end time of the current window
            while (startIndex < currArr.length && this.isCompletelyAfter(currArr[startIndex])) {
                startIndex++;
            }
            let endIndex = startIndex;
            while (endIndex < currArr.length && this.getEndTimeInMs() > currArr[endIndex].getStartTimeInMs()) {
                endIndex++;
            }
        
            //Removing the empty window correctly by adjusting the start and end times of the previous and subsequent windows if necessary.
            let i;
            for (i = startIndex; i <= endIndex; i++) {
                let newWindow1 = null;
                let newWindow2 = null;
                if (this.startsAfter(currArr[i])) {
                    newWindow1 = new Window(currArr[i].getYear(), currArr[i].getMonth(), currArr[i].getDate(), currArr[i].getStartTime(),  this.startTime, 0); 
                    currArr[i].changeStartTime = this.startTime;
                }
                if (currArr[i].getEndTimeInMs() > this.getEndTimeInMs()) {
                    newWindow2 = new Window(currArr[i].getYear(), currArr[i].getMonth(), currArr[i].getDate(), this.endTime, currArr[i].getEndTime(), 0);
                    currArr[i].changeEndTime = this.endTime;
                }

                //Updating the database and the respective arrays
                currArr.splice(i, 1);
                //(currArr[i]).Remove_Window_WithID();

                if (newWindow1 != null) {
                    newWindow1.insertWindow();
                    //newWindow1.Add_Window_WithID();
                }
                if (newWindow2 != null) {
                    newWindow2.insertWindow();
                    //newWindow2.Add_Window_WithID();
                }
            }
        } else {
            let currArr = Window.prototype.fixedFutureArr;
            if (this.type == 1 && index < 8) {
                currArr = Window.prototype.occupiedCollection[index];
            }
            //Check if the task to be removed exists. Once task is identified, it is removed.
            let i;
            for (i = 0; i < currArr.length; i++) {
                if (this.equals(currArr[i])) {
                    currArr.splice(i, 1);
                    //(currArr[i]).Remove_Window_WithID();

                    let newWindow = new Window(this.year, this.month, this.date, this.startTime, this.endTime, 0);
                    //newWindow.Add_Window_WithID();
                    return newWindow.insertWindow(); //Inserting back the empty window corresponding to the window of the deleted task
                }
            }
            return new Error('No such task to be removed!');
        }
    }

    /**
     * Updating the arrays with every passing day by removing the array containing windows of the previous day and adding an array with windows for a day that is 7 days from now 
     */
    static newDay() {
        Window.prototype.occupiedCollection.splice(0, 1);
        Window.prototype.occupiedCollection.push(Window.prototype.occupiedArr);
        let now = new Date();
        // Calculating the date of the newly added array
        let currDate = now.getDate();
        let currMonth = now.getMonth();
        let currYear = now.getYear();
        if (currDate + 7 > Time.daysInMonth(currMonth, currYear)) {
            currDate = currDate + 7 - Time.daysInMonth(currMonth, currYear);
            currMonth++;
            if (currMonth > 11) {
                currMonth = 0;
                currYear++;
            }
        }
        let newlyAddedDate = [new Date(currYear, currMonth, currDate, 0, 0).getTime(), new Date(currYear, currMonth, currDate, 23, 59).getTime()];
        let index = 0;
        let currArr = Window.prototype.fixedFutureArr;
        // Identifying fixed tasks that were scheduled long time ago and are to take place in the current week. These tasks are then added to the relevant array and removed from the fixedFutureArr.
        while (newlyAddedDate[0] <= currArr[index].getStartTimeInMs && newlyAddedDate[1] >= currArr[index].getEndTimeInMs) {
            Window.prototype.occupiedCollection[7].push(currArr[index]);
            currArr.splice(index, 1);
        }
        
        // Updating the empty windows in a similar manner
        Window.prototype.emptyCollection.splice(0, 1);
        Window.prototype.emptyCollection.push(Window.prototype.emptyArr);
        Window.prototype.nonFixedCollection.splice(0, 1);
        Window.prototype.emptyCollection.push([Window.prototype.nonFixedArr , Window.prototype.nonFixedPriorityArr]);
    }

    /**
     * To be called when users first register
     */
    static initialise() {
        let currTime = new Date();
        let startTime = new Time(RoutineInfo.getWakeUpTimeHours(), RoutineInfo.getWakeUpTimeMins());
        let endTime = new Time(RoutineInfo.getSleepTime.getHours(), RoutineInfo.getSleepTime.getMins());
        // Creating window arrays for the first week
        var i;
        for (i = 0; i < 8; i++) {
            Window.prototype.emptyCollection.push(Window.prototype.emptyArr);
            Window.prototype.occupiedCollection.push(Window.prototype.occupiedArr);
            Window.prototype.nonFixedCollection.push(Window.prototype.nonFixedArr , [Window.prototype.nonFixedPriorityArr]);

            let newWindow = new Window(currTime.getFullYear(), currTime.getMonth(), currTime.getDate(), startTime, endTime, 0);
            Window.prototype.emptyCollection[i].push(newWindow);
        }
    }
}

Window.prototype.occupiedCollection = []; // Contains 7 'Window.prototype.occupiedArr' 
Window.prototype.occupiedArr = []; // Represents a single day's fixed tasks
Window.prototype.fixedFutureArr = []; // Represents fixed tasks that are scheduled for > 7 days from now
Window.prototype.emptyCollection = []; // Contains 7 'Window.prototype.emptyArr'
Window.prototype.emptyArr = []; // Represents a single day's empty windows
Window.prototype.nonFixedCollection = []; // Contains 7 'Window.prototype.nonFixedFutureArr'
Window.prototype.nonFixedArr = []; // Represents a single day's non-fixed tasks
Window.prototype.nonFixedPriorityArr = [] // Represents a single day's non-fixed tasks connected to fixed tasks
Window.prototype.nonFixedFutureArr = []; // Represents non-fixed tasks that are scheduled for > 7 days from now
Window.prototype.group = 0; //Tracks the number of groups (non-fixed, connected tasks) for the day. Reset at the end of every day.
Window.prototype.nonFixedFutureArr = []; // Represents a single day's non-fixed tasks
Window.prototype.nonFixedFutureArr = []; // Represents non-fixed tasks that are scheduled for > 7 days from now
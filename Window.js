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
    constructor(taskName, taskCat, year, month, date, startTime, endTime, completed) {
        this.taskName = taskName;
        this.taskCat = taskCat;
        this.year = year;
        this.month = month;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.completed = completed;
    }

    /**
     * To retrieve the name of the task corresponding to the window
     * @returns {String} The name of the task corresponding to the window ('null' for empty windows)
     */
    getTaskName() {
        return this.taskName;
    }

    getTaskCat() {
        return this.taskCar;
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

    getCompletedStatus() {
        return this.completed;
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
    duringSleep(sleepStartTime, sleepEndTime) {
        //let sleepStartTime = new Time(RoutineInfo.getSleepTimeHours(), Info.getSleepTimeMins())
        //let sleepEndTime = new Time(RoutineInfo.getWakeUpTimeHours(), Info.getWakeUpTimeMins());
        if (sleepStartTime.getHours() + 8 == sleepEndTime.getHours()) {
            let sleepWindow = new Window("Sleep", 2, this.year, this.month, this.date, sleepStartTime, sleepEndTime, false);
            return this.partiallyOverlaps(sleepWindow) || this.isCompletelyDuring(sleepWindow);
        } else {
            let sleepWindow1 = new Window("Sleep", 2, this.year, this.month, this.date, sleepStartTime, new Time(23, 59), false);
            let sleepWindow2 = new Window("Sleep", 2, this.year, this.month, this.date, new Time(0,0), sleepEndTime, false);

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

    static arr = [];

    static getFromDatabase(currCollection, index) {
        console.log("getFromDatebase is called");
        Window.arr = [];
        cloudDB.collection("allArrays").doc(currCollection.toString()).collection(index.toString())
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
            let task = new Window (
                doc.data().taskName,
                doc.data().year,
                doc.data().month,
                doc.data().date,
                doc.data().startTime,
                doc.data().endTime,
                doc.data().type
            )
            console.log("the task I got is " + task);
            Window.arr.push(task);
            })
        });
        //return Window.arr;
    }

    Add_Window_WithID(dayIndex) {
        // Procedure for adding empty widows to the database
        if (this.type == 0) {
            cloudDB.collection("allArrays").doc("emptyCollection").collection(dayIndex.toString()).doc(this.startTime.toString()).set(
            //cloudDB.collection(Users).doc(#username).collection(formattedDate).doc("Empty Windows").collection("Empty Windows").doc(#startTimeOfWindow).set(
                {
                    taskName : null,
                    year : Number(this.year),
                    month : Number(this.month),
                    date : Number(this.date),
                    taskCategory : Number(0),
                    startTime : Array(Number(this.startTime.getHours()), Number(this.startTime.getMins())),
                    endTime : Array(Number(this.endTime.getHours()), Number(this.endTime.getMins())),
                    type : Number(0),
                }
            ).then(function(){
                console.log("Empty window for user '" + "' at " + " has been added.");
                //let start = this.startTime[0].toString() + this.startTime[1].toString();
                //console.log("Empty window for user '" + username + "' at " + start + " has been added."); //TODO: Need to define username
            })
            .catch(function(error) {
                console.error("Error adding fixed task for user '" + "' : ", error);
                //console.error("Error adding empty window for user '" + username + "' : ", error);
            });
        // Procedure for adding fixed tasks to the database
        } else {
            cloudDB.collection("allArrays").doc("occupiedCollection").collection(dayIndex.toString()).doc(this.startTime.toString()).set(
            //cloudDB.collection(Users).doc(#username).collection(formattedDate).doc("Tasks").collection("Tasks").doc(this.taskName).set(
                {
                    taskName : this.taskName,
                    year : Number(this.year),
                    month : Number(this.month),
                    date : Number(this.date),
                    taskCategory : Number(0),
                    startTime : Array(Number(this.startTime.getHours()), Number(this.startTime.getMins())),
                    endTime : Array(Number(this.endTime.getHours()), Number(this.endTime.getMins())),
                    type : Number(1),
                }
            ).then(function(){
                //let start = this.startTime[0].toString() + this.startTime[1].toString();
                console.log("Fixed task for user '" + "' at " + " has been added.");
                //console.log("Fixed task for user '" + "' at " + start + " has been added.");
                //console.log("Fixed task for user '" + username + "' at " + this.startTime + " has been added."); //TODO: Need to define username
            })
            .catch(function(error) {
                console.error("Error adding fixed task for user '" + "' : ", error);
                //console.error("Error adding fixed task for user '" + username + "' : ", error);
            });
        } 
    }

    /**
     * To insert a window into the correct array in chronological order
     * @returns Errors if there are any clashes in the start and end timings of a given window with existing windows in the array
     */
    insertWindow() {
        // To locate the array that represents that day of the given window. Array in position 0 of 'collection' arrays will represent the current day, while every slot to the right will represent each subsequent day
        console.log("insertWindow is called")
        let now = new Date();
        let currDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        let expectedDate = new Date(this.year, this.month, this.date);
        let index = (expectedDate - currDate)/86400000;

        if (index < 0) {
            console.error('Invalid index.');
        }

        if (this.type == 0) { // To insert empty windows
            //getFromDatabase("emptyCollection", index);
            //let currArr = Window.arr;
            //let currArr = Window.getFromDatabase("emptyCollection", index);
            //let currArr = Window.emptyCollection[index];
            let currArr = emptyCollection[index];
            
            let newIndex = 0;
            // Doing checks to ensure that task does not clash with any existing empty windows.
            while (newIndex < currArr.length && this.isCompletelyAfter(currArr[newIndex])) {
                newIndex++;
            }
            if (newIndex == currArr.length) {
                currArr.push(this);
                console.log(currArr); //For testing
                this.Add_Window_WithID(index);
            } else if ((currArr[newIndex]).isCompletelyAfter(this)) {
                currArr.splice(newIndex, 0, this);
                console.log(currArr);
                // Updating the database as well
                this.Add_Window_WithID(index);
            } else {
                console.error("Cannot schedule empty window as it clashes with an existing empty window. Please adjust the start and end times of other windows accordingly.");
            }
        } else { // To insert tasks for the current day and furture days
            //console.log(Window.occupiedCollection);
            let currArr = fixedFutureArr;
            //let currArr = Window.fixedFutureArr; // For tasks to be schedule beyond 7 days from now
            //TODO: Must insert the formattedDate, which will be the collection name
            //let currArr = Window.getFromDatabase("fixedFutureArr", index);

            if (this.type == 1 && index < 7) { 
                console.log("I change curr arr");
                console.log(index);
                //currArr = localStorage.getItem("Window.occupiedCollection");
                //currArr = Window.occupiedCollection[index];
                currArr = occupiedCollection[index];
                //Window.getFromDatabase("occupiedCollection", index);
                //currArr = Window.arr;
                //console.log(currArr);
            }
            // Doing checks to ensure that task does not clash with any existing fixed, future tasks.
            let newIndex = 0;
            while (newIndex < currArr.length && this.isCompletelyAfter(currArr[newIndex])) {
                newIndex++;
            }
            // If all currently scheduled tasks take place before the current to-be scheduled task starts
            if (newIndex == currArr.length) {
                currArr.push(this);
                console.log(currArr); //For testing
                console.log("I come to the insert window function 3");
                this.Add_Window_WithID(index);
            } else if ((currArr[newIndex]).isCompletelyAfter(this)) {
                currArr.splice(newIndex, 0, this);
                console.log(currArr); //For testing
                console.log("I come to the insert window function 4");
                // Updating the database as well
                this.Add_Window_WithID(index);
            } else {
                console.error("Cannot schedule task as it clashes with an existing task!");
                window.alert("Cannot schedule task as it clashes with an existing task!");
            }
            //console.log(Window.occupiedCollection[0]);
            let removedBreak = new Window("Empty", this.year, this.month, this.date, this.startTime, this.endTime, 0);
            return removedBreak.removeWindow();
        }
    }
    
    Remove_Window_WithID(dayIndex) {
        // Procedure for removing of windows from the database
        if (this.type == 0) {
            cloudDB.collection("allArrays").doc("emptyCollection").collection(dayIndex.toString()).doc(this.startTime.toString()).delete()
            //cloudDB.collection(Users).doc(#username).collection(formattedDate).doc("Empty Windows").collection("Empty Windows").doc(#startTimeOfWindow).delete()
            .then(function(){
                console.log("Empty window for user '" + "' at " + " has been removed.");
                //console.log("Empty window for user '" + username + "' at " + this.startTime + " has been removed."); //TODO: Need to define username
            })
            .catch(function(error) {
                console.error("Error removing empty window for user '" + "' : ", error);
                //console.error("Error removing empty window for user '" + username + "' : ", error);
            });
        // Procedure for removing fixed tasks from the database
        } else {
            cloudDB.collection("allArrays").doc("occupiedCollection").collection(dayIndex.toString()).doc(this.startTime.toString()).delete()
            //cloudDB.collection(Users).doc(#username).collection(formattedDate).doc("Tasks").collection("Tasks").doc(this.taskName).set()
            .then(function(){
                console.log("Fixed task for user '" + "' at " + " has been removed.");
                //console.log("Fixed task for user '" + username + "' at " + this.startTime + " has been removed."); //TODO: Need to define username
            })
            .catch(function(error) {
                console.error("Error removing fixed task for user '" + "' : ", error);
                //console.error("Error removing fixed task for user '" + username + "' : ", error);
            });
        } 
    }
    

    /**
     * To remove a window from the correct array
     * @returns Errors if there are no such existing windows to be removed
     */
    removeWindow() {
        console.log("removeWindow is called");
        // To locate the array that represents that day of the given window. Array in position 0 of 'collection' arrays will represent the current day, while every slot to the right will represent each subsequent day
        let currDate = new Date().getDate();
        currDate = new Date(this.year, this.month, currDate);
        let expectedDate = new Date(this.year, this.month, this.date);
        let index = (expectedDate - currDate)/86400000;

        if (index < 0) {
            return new Error('Invalid index.')
        }
        if (this.type == 0) {
            //let currArr = Window.emptyCollection[index];
            let currArr = emptyCollection[index];
            //let currArr = Window.getFromDatabase("emptyCollection", index);
            console.log("index " + index);
            let startIndex = 0;
            //While start time of given window is after the end time of the current window
            while (startIndex < currArr.length && this.isCompletelyAfter(currArr[startIndex])) {
                startIndex++;
            }
            let endIndex = startIndex;
            while (endIndex < currArr.length && this.getEndTimeInMs() > currArr[endIndex].getEndTimeInMs()) {
                endIndex++;
            }
            console.log(currArr);
            //Removing the empty window correctly by adjusting the start and end times of the previous and subsequent windows if necessary.
            let windowsToAdd = []
            for (let i = startIndex; i <= endIndex; i++) {
                let newWindow1 = null;
                let newWindow2 = null;
                if (this.startsAfter(currArr[i])) {
                    newWindow1 = new Window("Empty", currArr[i].getYear(), currArr[i].getMonth(), currArr[i].getDate(), currArr[i].getStartTime(),  this.startTime, 0); 
                    //currArr[i].changeStartTime = this.startTime;
                    //TODO: Standardise the names of all empty windows to null?
                }
                if (currArr[i].getEndTimeInMs() > this.getEndTimeInMs()) {
                    newWindow2 = new Window("Empty", currArr[i].getYear(), currArr[i].getMonth(), currArr[i].getDate(), this.endTime, currArr[i].getEndTime(), 0);
                    //currArr[i].changeEndTime = this.endTime;
                }

                //Updating the database and the respective arrays
                (currArr[i]).Remove_Window_WithID(index);

                if (newWindow1 != null) {
                    windowsToAdd.push(newWindow1);
                    //newWindow1.Add_Window_WithID(index);
                }
                if (newWindow2 != null) {
                    windowsToAdd.push(newWindow2);
                    //newWindow2.Add_Window_WithID(index);
                }
            }
            currArr.splice(startIndex, endIndex - startIndex + 1);
            for (let j = 0; j < windowsToAdd.length; j ++) {
                windowsToAdd[j].insertWindow();
            }
            console.log("Empty windows successfully updated");
            console.log(currArr);
        } else {
            let currArr = Window.fixedFutureArr;
            //TODO: Must insert the formattedDate, which will be the collection name
            //let currArr = Window.getFromDatabase("fixedFutureArr", index);
            if (this.type == 1 && index < 8) {
                //currArr = Window.occupiedCollection[index];
                currArr = occupiedCollection[index];
                //currArr = Window.getFromDatabase("occupiedCollection", index);
            }
            //Check if the task to be removed exists. Once task is identified, it is removed.
            for (let i = 0; i < currArr.length; i++) {
                if (this.equals(currArr[i])) {
                    currArr.splice(i, 1);
                    console.log("Window successfully removed")
                    (currArr[i]).Remove_Window_WithID(index);

                    let newWindow = new Window("Empty", this.year, this.month, this.date, this.startTime, this.endTime, 0);
                    //newWindow.Add_Window_WithID();
                    return newWindow.insertWindow(); //Inserting back the empty window corresponding to the window of the deleted task
                }
            }
            console.error("No such task to be removed!");
            //return new Error('No such task to be removed!');
        }
    }

    /**
     * Updating the arrays with every passing day by removing the array containing windows of the previous day and adding an array with windows for a day that is 7 days from now 
     */
    static newDay() {
        //STEP 1: Updating the collection arrays by removing Day 0 and shifting up all other days
        let collectionArr = ["emptyCollection", "occupiedCollection", "nonFixedCollection"]
        //TODO: how to check if a doc exists? Bc it may not?
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < collectionArr.length; j++) {
                if (i == 6) {
                    cloudDB.collection("allArrays").doc(collectionArr[j]).collection("6").delete();
                } else {
                    cloudDB.collection("allArrays").doc(collectionArr[j]).collection(i.toString()).delete();
                    cloudDB.collection("allArrays").doc(collectionArr[j]).collection((i + 1).toString())
                        .get()
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                cloudDB.collection("allArrays").doc(collectionArr[j]).collection(i.toString()).set(doc);
                            })
                        });
                }
            }
        }

        // Calculating the date of the newly added array
        let currDate = now.getDate();
        let currMonth = now.getMonth();
        let currYear = now.getYear();
        if (currDate + 6 > Time.daysInMonth(currMonth, currYear)) {
            currDate = currDate + 6 - Time.daysInMonth(currMonth, currYear);
            currMonth++;
            if (currMonth > 11) {
                currMonth = 0;
                currYear++;
            }
        }
        let formattedDate = currDate.toString() + "/" + currMonth.toString() + "/" + currYear.toString();
        //TODO: Don't need to insert window again for fixed tasks right?
        //STEP 2: Transferring fixed and nonfixed tasks from future arrays
        cloudDB.collection("allArrays").doc("fixedFutureArr").collection(formattedDate)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    cloudDB.collection("allArrays").doc("occupiedCollection").collection("6").set(doc);
                })
            });
        cloudDB.collection("allArrays").doc("fixedFutureArr").collection(formattedDate).delete();

        cloudDB.collection("allArrays").doc("nonFixedFutureArr").collection(formattedDate)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.addTask();
                })
            });
        cloudDB.collection("allArrays").doc("nonFixedFutureArr").collection(formattedDate).delete();

        //STEP 3: Incomplete bc no RoutinInfo yet. Creating the empty windows for the new day 6. 
        if (startTime.getHours() > endTime.getHours()) {
            let newWindow1 = new Window("Empty", currTime.getFullYear(), currTime.getMonth(), currTime.getDate(), new Time(0, 0), endTime, 0);
            let newWindow2 = new Window("Empty", currTime.getFullYear(), currTime.getMonth(), currTime.getDate(), startTime, new Time(23, 59), 0);

            newWindow1.insertWindow();
            newWindow2.insertWindow();
        } else {
            let newWindow = new Window("Empty", currTime.getFullYear(), currTime.getMonth(), currTime.getDate(), startTime, endTime, 0);

            newWindow.insertWindow();
        }
        
        /*
        Window.occupiedCollection.splice(0, 1);
        Window.occupiedCollection.push([]);
        let now = new Date();
        // Calculating the date of the newly added array
        let currDate = now.getDate();
        let currMonth = now.getMonth();
        let currYear = now.getYear();
        if (currDate + 6 > Time.daysInMonth(currMonth, currYear)) {
            currDate = currDate + 6 - Time.daysInMonth(currMonth, currYear);
            currMonth++;
            if (currMonth > 11) {
                currMonth = 0;
                currYear++;
            }
        }
        let newlyAddedDate = [new Date(currYear, currMonth, currDate, 0, 0).getTime(), new Date(currYear, currMonth, currDate, 23, 59).getTime()];
        let index = 0;
        let currArr = Window.fixedFutureArr;
        // Identifying fixed tasks that were scheduled long time ago and are to take place in the current week. These tasks are then added to the relevant array and removed from the fixedFutureArr.
        while (newlyAddedDate[0] <= currArr[index].getStartTimeInMs() && newlyAddedDate[1] >= currArr[index].getEndTimeInMs()) {
            //Window.occupiedCollection[7].push(currArr.splice(index, 1)[0]);
            currArr[index].scheduleTask();
            index ++;
        }
        currArr.splice(0, index);
        index = 0;

        currArr = Window.nonFixedFutureArr;
        Window.nonFixedCollection.splice(0, 1);
        Window.emptyCollection.push([[] , []]);
        while (newlyAddedDate[0] <= currArr[index].getStartTimeInMs() && newlyAddedDate[1] >= currArr[index].getEndTimeInMs()) {
            //TODO: How to add the non-fixed tasks into the right array?
            if (currArr[index])
            Window.occupiedCollection[7].push(currArr.splice(index, 1)[0]);
            index ++;
        }

        
        // Updating the empty windows in a similar manner
        Window.prototype.emptyCollection.splice(0, 1);
        if (startTime.getHours() > endTime.getHours()) {
            let newWindow1 = new Window("Empty", currTime.getFullYear(), currTime.getMonth(), currTime.getDate(), new Time(0, 0), endTime, 0);
            let newWindow2 = new Window("Empty", currTime.getFullYear(), currTime.getMonth(), currTime.getDate(), startTime, new Time(23, 59), 0);

            Window.emptyCollection[i].push(newWindow1);
            Window.emptyCollection[i].push(newWindow2);
        } else {
            let newWindow = new Window("Empty", currTime.getFullYear(), currTime.getMonth(), currTime.getDate(), startTime, endTime, 0);

            Window.emptyCollection[i].push(newWindow);
        }
        */
    }

    // static emptyCollection = [];
    // static occupiedCollection = [];
    // static nonFixedCollection = [];
    // static fixedFutureArr = [];
    // static nonFixedFutureArr = [];

    /**
     * To be called when users first register
     */
    static initialise() {
        console.log("Initialise funtion is called");

        /*
        // DATABASE VERSION (Probably don't need the version below for the final product)
        let currTime = new Date();
        // For testing purposes
        let startTime = new Time(8, 0); //to be replaced with actual routineinfo data
        let endTime = new Time(0, 0); //to be replaced with actual routineinfo data

        cloudDB.collection("allArrays").doc("emptyCollection");
        cloudDB.collection("allArrays").doc("occupiedCollection");
        cloudDB.collection("allArrays").doc("nonFixedCollection");
        cloudDB.collection("allArrays").doc("fixedFutureArr");
        cloudDB.collection("allArrays").doc("nonFixedFutureArr");

        if (startTime.getHours() > endTime.getHours()) {
            let newWindow1 = new Window("Empty", currTime.getFullYear(), currTime.getMonth(), currTime.getDate(), new Time(0, 0), endTime, 0);
            let newWindow2 = new Window("Empty", currTime.getFullYear(), currTime.getMonth(), currTime.getDate(), startTime, new Time(23, 59), 0);

            newWindow1.insertWindow();
            newWindow2.insertWindow();
        } else {
            let newWindow = new Window("Empty", currTime.getFullYear(), currTime.getMonth(), currTime.getDate(), startTime, endTime, 0);

            newWindow.insertWindow();
        }
        */

        let currTime = new Date();
        // For testing purposes
        let startTime = new Time(8, 0);
        let endTime = new Time(0, 0);
        //let startTime = new Time(RoutineInfo.getWakeUpTimeHours(), RoutineInfo.getWakeUpTimeMins());
        //let endTime = new Time(RoutineInfo.getSleepTime.getHours(), RoutineInfo.getSleepTime.getMins());
        // Creating window arrays for the first week
        for (let i = 0; i < 7; i++) {
            //Window.emptyCollection.push([]);
            //Window.occupiedCollection.push([]);
            emptyCollection.push([]);
            occupiedCollection.push([]);
            //let occupiedArr = localStorage.getItem("Window.occupiedCollection");
            //console.log("occupiedArr is " + occupiedArr);
            // occupiedArr.push([]);
            console.log("i have pushed");
            //Window.nonFixedCollection.push([[], []]); //0 is priority array, 1 is the normal array
            nonFixedCollection.push([[], []]);
    
            if (startTime.getHours() > endTime.getHours()) {
                let newWindow1 = new Window("Empty", currTime.getFullYear(), currTime.getMonth(), currTime.getDate(), new Time(0, 0), endTime, 0);
                let newWindow2 = new Window("Empty", currTime.getFullYear(), currTime.getMonth(), currTime.getDate(), startTime, new Time(23, 59), 0);
    
                //Window.emptyCollection[i].push(newWindow1);
                //Window.emptyCollection[i].push(newWindow2);
                emptyCollection[i].push(newWindow1);
                emptyCollection[i].push(newWindow2);
            } else {
                let newWindow = new Window("Empty", currTime.getFullYear(), currTime.getMonth(), currTime.getDate(), startTime, endTime, 0);
    
                //Window.emptyCollection[i].push(newWindow);
                emptyCollection[i].push(newWindow);
            }
        }
        //For tracing purposes
        /*
        console.log("occupiedCollection is now " + Window.occupiedCollection);
        console.log("emptyCollection is now " + Window.emptyCollection);
        console.log("nonFixedCollection is now " + Window.nonFixedCollection);
        console.log("fixedFutureArr is now " + Window.fixedFutureArr);
        */
        for (let j = 0; j < occupiedCollection.length; j ++) {
            console.log(occupiedCollection[j]);
            console.log("occupiedCollection at index " + j + " is " + occupiedCollection[j]);
        }
        /*
        for (let j = 0; j < Window.occupiedCollection.length; j ++) {
            console.log(Window.occupiedCollection[j]);
            console.log("occupiedCollection at index " + j + " is " + Window.occupiedCollection[j]);
        }
        */
        /*
        for (let j = 0; j < Window.emptyCollection.length; j ++) {
            console.log("emptyCollection at index " + j + " is " + Window.emptyCollection[j]);
        }
        for (let j = 0; j < Window.nonFixedCollection.length; j ++) {
            console.log("nonFixedCollection at index " + j + " is " + Window.nonFixedCollection[j]);
        }
        for (let j = 0; j < Window.fixedFutureArr.length; j ++) {
            console.log("fixedFuture at index " + j + " is " + Window.fixedFutureArr[j]);
        }
        */
    }
    
    static testFunction() {
        let newTask = [new Window("Empty", 2036, 6, 16, new Time(8, 0), new Time(23, 59), 0)];
        console.log("i come to testFunction")
        //let x = [1, 2];
        //let newTask = 1;
        //emptyCollection.push(newTask);
        //console.log(x);
        localStorage.setItem("newnewtest", JSON.stringify(newTask));
    }
}
//var emptyCollection = [];
var occupiedCollection = [];
var nonFixedCollection = [];
var fixedFutureArr = [];
var nonFixedFutureArr = [];

//localStorage.setItem("test", JSON.stringify(Window.emptyCollection));


// TEMPORARY ARRAYS TO CHECK IF WINDOW FUNCTIONS ARE WORKING AS THEY SHOULD
//Window.occupiedCollection = []; // Contains 7 'Window.prototype.occupiedArr' 
//Window.fixedFutureArr = []; // Represents fixed tasks that are scheduled for > 7 days from now
//Window.emptyCollection = []; // Contains 7 'Window.prototype.emptyArr'
//Window.nonFixedCollection = []; // Contains 7 'Window.prototype.nonFixedFutureArr'
//Window.nonFixedFutureArr = []; // Represents non-fixed tasks that are scheduled for > 7 days from now
//Window.prototype.group = 0; //Tracks the number of groups (non-fixed, connected tasks) for the day. Reset at the end of every day.
/*
for (let i = 0; i < 7; i ++) {
    Window.occupiedCollection.push([]);
    Window.emptyCollection.push([]);
    Window.nonFixedCollection.push([[], []]);
}
*/
//localStorage.setItem("Window.occupiedCollection", JSON.stringify(Window.occupiedCollection));
//console.log("At the bottom " + localStorage.getItem("Window.occupiedCollection"));

/*
ACTUAL ARRAYS:

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
*/
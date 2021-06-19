//In this class, we will be creating window objects which represent windows of time during which a particular task is to be done, a break is to be taken, etc. Empty windows are periods of time where nothing is schedule (no tasks or breaks)
/*
Additional questions:
1. What if the starting time of a window is in the past but the ending time is in the future?
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
     * @param {Number} type 0 - Empty, 1 - Task within 7 days, 2 - Fixed tasks for the future
     * @param {String} taskAfterThis Name of the task that is to follow after this
     * @param {Number} accumulatedDuration The total duration of the connected tasks
     */
    constructor(taskName, year, month, date, startTime, endTime, type, taskAfterThis, accumulatedDuration) {
        this.taskName = taskName;
        this.year = year;
        this.month = month;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.type = type;
        this.taskAfterThis = taskAfterThis;
        this.accumulatedDuration = accumulatedDuration;
        if (taskAfterThis == null) {
            this.group = -1;
        } else {
            this.group = Window.prototype.group;
        }
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
    changeAccumulateDuration(newDuration) {
        this.accumulatedDuration = newDuration;
    }

    /**
     * To update the group number fo an existing window to a new number
     * @param {Number} newGroup The new group number (based on Window.prototype.group)
     */
    changeGroup(newGroup) {
        this.group = newGroup;
    }

    /**
     * To check if 2 windows are exactly the same
     * @param {Window} window 
     * @returns {Boolean} True if they are the same window, false if otherwise
     */
    equals(window) {
        return (this.getStartTimeInMs() == window.getStartTimeInMs && this.getEndTimeInMs == window.getEndTimeInMs());

        /* 
        Alternative implementation (seems more lengthy and unecessary)

        let currWindowStart = new Date(this.year, this.month, this.date, this.startTime.getHours(), this.startTime.getMins());
        let otherWindowStart = new Date(otherWindowStart.getYear(), otherWindowStart.getMonth(), otherWindowStart.getDate(), otherWindowStart.getStartTime().getHours(), otherWindowStart.getStartTime().getMins());

        let currWindowEnd = new Date(this.year, this.month, this.date, this.endTime.getHours(), this.endTime.getMins());
        let otherWindowEnd = new Date(otherWindowEnd.getYear(), otherWindowEnd.getMonth(), otherWindowEnd.getDate(), otherWindowEnd.getEndTime().getHours(), otherWindowEnd.getEndTime().getMins());

        return (currWindowStart.getTime() == otherWindowStart.getTime()) && (currWindowEnd.getTime() == otherWindowEnd.getTime());
        */
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
        return this.getStartTimeInMs() > window.getEndTimeInMs();
    }

    /**
     * Checks if a given window partially overlaps with 'window'
     * @param {Window} window The window to be compared with
     * @returns {Boolean} True if given window partially overlaps with 'window', false if otherwise
     */
    partiallyOverlaps(window) {
        // If the start time of a given window is before the start time of 'window' and the end time of a given window is before the end time of 'window' but after the start time of 'window'
        if (this.getStartTimeInMs() < window.getStartTimeInMs() && window.getStartTimeInMs() < this.getEndTimeInMs() && this.getEndTimeInMs() < window.getEndTimeInMs()) {
            return true;
        // If the start time of a given window is after the start time of 'window' but before the end time of 'window' and the end time of a given window is after the end time of 'window'
        } else if (this.startsAfter(window) && this.getStartTimeInMs() < window.getEndTimeInMs() && this.endsAfter(window)) {
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
    isCompletelyDuring(window) {
        // If a given window starts after 'window' and ends before 'window'
        return this.startsAfter(window) && window.endsAfter(this);
    }

    /**
     * To insert a window into the correct array in chronological order
     * @returns Errors if there are any clashes in the start and end timings of a given window with existing windows in the array
     */
    insertWindow() {
        // To locate the array that represents that day of the given window. Array in position 0 of 'collection' arrays will represent the current day, while every slot to the right will represent each subsequent day
        let now = new Date();
        currDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
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
            } else {
                return new Error("Cannot schedule empty window as it clashes with an existing empty window. Please adjust the start and end times of other windows accordingly.");
            }
        } else { // To insert tasks for the current day and furture days
            let currArr = Window.prototype.fixedFutureArr; // For tasks to be schedule beyong 7 days from now
            if (type == 1 && index < 8) { 
                currArr = Window.prototype.occupiedCollection[index];
            } else {
                //TODO: This is for type 2: non-fixed tasks. Need to figure how to do this for non-fixed tasks.
            }
            // Doing checks to ensure that task does not clash with any existing fixed, future tasks.
            let newIndex = 0;
            while (newIndex < currArr.length && this.isCompletelyAfter(currArr[newIndex])) {
                newIndex++;
            }
            if (newIndex == currArr.length) {
                currArr.push(this);
            }
            if (this.getEndTimeInMs() < currArr[index].getStartTimeInMs()) {
                currArr.splice(newIndex, 0, this);
                let removedBreak = new Window(this.year, this.month, this.date, this.startTime, this.endTime, 0);
                return removedBreak.removeWindow();
            } else {
                return new Error("Cannot schedule task as it clashes with an existing task");
            }
        }
    }

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
                    newWindow1 = new Window(currArr[i].getYear(), currArr[i].getMonth(), currArr[i].getDate(), currArr[i].getStartTime(),  newEndTime, 0); //calc newEndTime
                    currArr[i].changeStartTime = this.startTime;
                }
                if (currArr[i].getEndTimeInMs() > this.getEndTimeInMs()) {
                    newWindow2 = new Window(currArr[i].getYear(), currArr[i].getMonth(), currArr[i].getDate(), newStartTime, currArr[i].getEndTime(), 0); //calc newStartTime
                    currArr[i].changeEndTime = this.endTime;
                }

                currArr.splice(i, 1);
                if (newWindow1 != null) {
                    newWindow1.insertWindow();
                }
                if (newWindow2 != null) {
                    newWindow2.insertWindow();
                }
            }
        } else {
            let currArr = Window.prototype.fixedFutureArr;
            if (this.type == 1 && index < 8) {
                currArr = Window.prototype.occupiedCollection[index];
            } else {
                //TODO: This is for type 2: non-fixed tasks. Need to figure how to do this for non-fixed tasks.
            }
            //Check if the task to be removed exists. Once task is identified, it is removed.
            let i;
            for (i = 0; i < currArr.length; i++) {
                if (this.equals(currArr[i])) {
                    currArr.splice(i, 1);
                    let newWindow = new Window(this.year, this.month, this.date, this.startTime, this.endTime, 0);
                    return newWindow.insertWindow(); //Inserting back the empty window corresponding to the window of the deleted task
                }
            }
            return new Error('No such task to be removed!');
        }
    }

    /**
     * Checks if a window falls during a user's sleeping hours so as to warn users against scheduling tasks at those timings
     * @returns {Boolean} True if window falls during user's sleeping hours, false if otherwise
     */
    duringSleep() {
        let sleepStartTime = new Time(Info.getSleepTimeHours(), Info.getSleepTimeMins())
        let sleepEndTime = new Time(Info.getWakeUpTimeHours(), Info.getWakeUpTimeMins());

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
        Window.prototype.emptyoCollection.splice(0, 1);
        Window.prototype.emptyCollection.push(Window.prototype.emptyArr);
        //TODO: Update for non-fixed arrays as well
    }

    /**
     * To be called when users first register
     */
    static initialise() {
        let currTime = new Date();
        let startTime = new Time(Info.getWakeUpTime.getHours(), Info.getWakeUpTime.getMins());
        let endTime = new Time(Info.getSleepTime.getHours(), Info.getSleepTime.getMins());
        // Creating window arrays for the first week
        var i;
        for (i = 0; i < 8; i++) {
            Window.prototype.emptyCollection.push(Window.prototype.emptyArr);
            Window.prototype.occupiedCollection.push(Window.prototype.occupiedArr);
            Window.prototype.nonFixedCollection.push(Window.prototype.nonFixedArr);

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
Window.prototype.nonFixedPriorityArr = [] // Represents a single day's non-fixed tasks connected to fixed tasks //TODO: Need to do proper set-up
Window.prototype.nonFixedFutureArr = []; // Represents non-fixed tasks that are scheduled for > 7 days from now
Window.prototype.group = 0; //Tracks the number of groups (non-fixed, connected tasks) for the day. Reset at the end of every day.
Window.prototype.nonFixedFutureArr = []; // Represents a single day's non-fixed tasks
Window.prototype.nonFixedFutureArr = []; // Represents non-fixed tasks that are scheduled for > 7 days from now


export default Window; //to export to other js files (e.g add_routine_task.js)

// what is the starting time of a window is in the past but the ending time is in the future
class Window {
    /**
     * Constructor to create window objects
     * @param {Number} year Year of the window
     * @param {Number} month Month of the window
     * @param {Number} date Date of the window
     * @param {Time} startTime Time at which the window starts
     * @param {Time} endTime Time at which the window ends
     * @param {Number} type 0 - Empty, 1 - Task within 7 days, 2 - Fixed tasks for the future, 3 - Non-Fixed tasks for the future
     */
    constructor(year, month, date, startTime, endTime, type) {
        this.year = year;
        this.month = month;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.type = type;
    }

    /**
     * To retrieve the year of a window 
     * @returns The year of a window 
     */
    getYear() {
        return this.year;
    }

    /**
     * To retrieve the month of a window 
     * @returns The month of a window 
     */
    getMonth() {
        return this.month;
    }

    /**
     * To retrieve the date of a window 
     * @returns The date of a window 
     */
    getDate() {
        return this.date;
    }

    /**
     * To retrieve the start time of a window 
     * @returns The start time of a window (Format: [hours, mins])
     */
    getStartTime() {
        return this.startTime;
    }

    /**
     * To retrieve the end time of a window 
     * @returns The end time of a window (Format: [hours, mins])
     */
    getEndTime() {
        return this.endTime;
    }

    /**
     * To retrieve the start time of a window in milliseconds
     * @returns The start time of a window in milliseconds
     */
    getStartTimeInMs() {
        let currWindowStart = new Date(this.year, this.month, this.date, this.startTime.getHours(), this.startTime.getMins());
        return currWindowStart.getTime();
    }

    /**
     * To retrieve the end time of a window in milliseconds
     * @returns The end time of a window in milliseconds
     */
    getEndTimeInMs() {
        let currWindowEnd = new Date(this.year, this.month, this.date, this.endTime.getHours(), this.endTime.getMins());
        return currWindowEnd.getTime()
    }

    /**
     * To retrieve the hours of the start time of a window
     * @returns The hours of the start time of a window (in 24h format)
     */
    getStartTimeHours() {
        return this.startTime.getHours();
    }

    /**
     * To retrieve the minutes of the start time of a window
     * @returns The minutes of the start time of a window (in 24h format)
     */
    getStartTimeMins() {
        return this.startTime.getMins();
    }

    /**
     * To retrieve the hours of the end time of a window
     * @returns The hours of the end time of a window (in 24h format)
     */
    getEndTimeHours() {
        return this.endTime.getHours();
    }

    /**
     * To retrieve the minutes of the end time of a window
     * @returns The minutes of the end time of a window (in 24h format)
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
     * @returns True if they are the same window, false if otherwise
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
     * Checks if a window has already passed
     * @returns True if the window has already passed, false if otherwise
     */
    isPast() {
        let now = new Date();
        return this.getStartTimeInMs() < now.getTime();
    }

    /**
     * Check if a given window starts after 'window'
     * @param {Window} window 
     * @returns True if given window starts after 'window', false if otherwise
     */
    startsAfter(window) {
        return this.getStartTimeInMs() > window.getStartTimeInMs();
    }

    /**
     * Check if a given window end after 'window'
     * @param {Window} window 
     * @returns True if given window ends after 'window', false if otherwise
     */
    endsAfter(window) {
        return this.getEndTimeInMs() > window.getEndTimeInMs();
    }

    /**
     * Check if a given window partially overlaps with 'window'
     * @param {Window} window 
     * @returns True if given window partially overlaps with 'window', false if otherwise
     */
    partiallyOverlaps(window) {
        // If the start time of a given window is before the start time of 'window' and the end time //of a given window is before the end time of 'window' but after the start time of 'window'
        if (this.getStartTimeInMs() < window.getStartTimeInMs() && window.getStartTimeInMs() < this.getEndTimeInMs() && this.getEndTimeInMs() < window.getEndTimeInMs()) {
            return true;
        // If the start time of a given window is after the start time of 'window' but before the end time of 'window' and the end time of a given window is after the end time of 'window'
        } else if (this.getStartTimeInMs() > window.getStartTimeInMs() && this.getStartTimeInMs() < window.getEndTimeInMs() && this.getEndTimeInMs() > window.getEndTimeInMs()) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Check if a given window occurs completely during 'window'
     * @param {Window} window 
     * @returns True if a given window occurs completely during 'window', false if otherwise
     */
    isCompletelyDuring(window) {
        return this.startsAfter(window) && window.endsAfter(this);
    }

    /**
     * To insert a window into the correct array in chronological order
     * @returns Errors if there are any clashes in the start and end timings of a given window with existing windows
     */
    insertWindow() {
        let currDate = new Date().getDate();
        currDate = new Date(this.year, this.month, currDate);
        let expectedDate = new Date(this.year, this.month, this.date);
        let index = (expectedDate - currDate)/86400000;

        if (index > 6) {
            return new Error('Tasks can only be inserted in the schedule for the next 6 days.');
            //what if you want to schdule beyond that? what do you do?
        } else if (index < 0) {
            return new Error('Invalid index.')
        }

        if (this.type == 0) {
            let currArr = Window.prototype.emptyCollection[index];
            newIndex = 0;
            while (newIndex < currArr.length && this.getStartTimeInMs() > currArr[newIndex].getEndTimeInMs()) {
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
        } else {
            if (type == 1) {
                let currArr = Window.prototype.occupiedCollection[index];
            } else if (type == 2) {
                let currArr = Window.prototype.fixedFutureArr;
            }
            let newIndex = 0;
            while (newIndex < currArr.length && this.getStartTimeInMs() > currArr[newIndex].getEndTimeInMs()) {
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
        let currDate = new Date().getDate();
        currDate = new Date(this.year, this.month, currDate);
        let expectedDate = new Date(this.year, this.month, this.date);
        let index = (expectedDate - currDate)/86400000;
        if (index > 6) {
            return new Error('Tasks can only be removed from the schedule for the next 6 days.');
            //what if you want to remove beyond that? what do you do?
        } else if (index < 0) {
            return new Error('Invalid index.')
        }

        if (this.type == 1) {
            let currArr = Window.prototype.occupiedCollection[index];
            let i;
            for (i = 0; i < currArr.length; i++) {
                if (this.equals(currArr[i])) {
                    currArr.splice(i, 1);
                    return;
                }
            }
            return new Error('No such task to be removed!');
        } else{
            let currArr = Window.prototype.emptyCollection[index];
            let startIndex = 0;
            // while start time of given window is after the end time of the current window
            while (startIndex < currArr.length && this.getStartTimeInMs() > currArr[startIndex].getEndTimeInMs()) {
                startIndex++;
            }
            let endIndex = startIndex;
            while (endIndex < currArr.length && this.getEndTimeInMs() > currArr[endIndex].getStartTimeInMs()) {
                endIndex++;
            }
        
            var i;
            for (i = startIndex; i <= endIndex; i++) {
                if (this.getStartTimeInMs() > curr[i].getStartTimeInMs() && currArr[i].getEndTimeInMs() > this.getEndTimeInMs()) {
                    let newWindow1 = new Window(currArr[i].getYear(), currArr[i].getMonth(), currArr[i].getDate(), currArr[i].getStartTime(),  newEndTime, 0); //calc newEndTime
                    currArr[i].changeStartTime = this.startTime;

                    let newWindow2 = new Window(currArr[i].getYear(), currArr[i].getMonth(), currArr[i].getDate(), newStartTime, currArr[i].getEndTime(), 0); //calc newStartTime
                    currArr[i].changeEndTime = this.endTime;

                    currArr.splice(i, 1);
                    newWindow1.insertWindow();
                    newWindow2.insertWindow();

                } else if (this.getStartTimeInMs() > curr[i].getStartTimeInMs()) {
                    let newWindow1 = new Window(currArr[i].getYear(), currArr[i].getMonth(), currArr[i].getDate(), currArr[i].getStartTime(),  newEndTime, 0); //calc newEndTime
                    currArr[i].changeStartTime = this.startTime;

                    currArr.splice(i, 1);
                    newWindow1.insertWindow();
                } else if (currArr[i].getEndTimeInMs() > this.getEndTimeInMs()) {
                    let newWindow2 = new Window(currArr[i].getYear(), currArr[i].getMonth(), currArr[i].getDate(), newStartTime, currArr[i].getEndTime(), 0); //calc newStartTime
                    currArr[i].changeEndTime = this.endTime;

                    currArr.splice(i, 1);
                    newWindow2.insertWindow();
                } else {
                    currArr.splice(i, 1);
                }
            }
        }
        
    }

    /**
     * Checks if a window falls during a user's sleeping hours so as to warn users against scheduling tasks at those timings
     * @returns True if window falls during user's sleeping hours, false if otherwise
     */
    duringSleep() {
        let sleepStartTime = new Time(Info.getSleepTimeHours, Info.getSleepTimeMins)
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
        Window.prototype.emptyoCollection.splice(0, 1);
        Window.prototype.emptyCollection.push(Window.prototype.emptyArr);
        //write program to update from the future array list
        Window.prototype.occupiedCollection.push(Window.prototype.occupiedArr);
    }

    /**
     * To be called when users first register
     */
    static initialise() {
        let currTime = new Date();
        let startTime = new Time(Info.getWakeUpTime.getHours(), Info.getWakeUpTime.getMins());
        let endTime = new Time(Info.getSleepTime.getHours(), Info.getSleepTime.getMins());
        var i;
        for (i = 0; i < 7; i++) {
            Window.prototype.emptyCollection.push(Window.prototype.emptyArr);
            Window.prototype.occupiedCollection.push(Window.prototype.occupiedArr);
            Window.prototype.nonFixedCollection.push(Window.prototype.nonFixedArr);

            let newWindow = new Window(currTime.getFullYear(), currTime.getMonth(), currTime.getDate(), startTime, endTime, 0);
            Window.prototype.emptyCollection[i].push(newWindow);
        }
    }

}
Window.prototype.occupiedCollection = [];
Window.prototype.occupiedArr = [];
Window.prototype.emptyCollection = [];
Window.prototype.emptyArr = [];
Window.prototype.fixedFutureArr = [];
Window.prototype.nonFixedFutureArr = [];
Window.prototype.nonFixedCollection = [];
Window.prototype.nonFixedFutureArr = [];
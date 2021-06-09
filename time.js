// Time objects can be organised in a tree? --> Seems/Feels super complex
// Testing yet to be done


/**
 * Class to create time objects to keep track of when tasks are scheduled and what times are
 * free
 */
class Time {
    /**
     * Constructor to create Time objects
     * @param {Number} year     Year of the time object (Format: yyyy)
     * @param {Number} month    Month of the time object (1-12, Jan-Dec)
     * @param {Number} date     Date of the time object (1-28/29/30/31)
     * @param {Number} hour     Hour of the time object (0-23)
     * @param {Number} min      Minute of the time object (0-59)
     */
    constructor(year, month, date, hour, min) {
        this.date = new Date(year, month, date, hour, min);
        this.task = null; // To indicate that initially there is no task scheduled at this      timing
    }

    /**
     * Calculates the number of days in a particular month
     * @param {Number} month The month for which the number of days is requires (1-12)
     * @param {Number} year  The respective year (Format: yyyy)
     * @returns              The number of days in the respective month
     */
    static daysInMonth(month, year) {
        let x = new Date(year, month + 1, 0);
        return d.getDate();
    }

    /**
     * Calculates the duration of a task in hours and minutes
     * @param {Time} startTime Time at which the task starts
     * @param {Time} endTime   Time at which the task ends
     * @returns                An array, where the first element represents the hours and 
     *                         second element represents the minutes
     */
     static duration(startTime, endTime) {
        let elapsed = endTime.date.getTime() - startTime.date.getTime(); 
        let elapsedMins = Math.floor(elapsed / 60000);
        let elapsedHours = Math.floor(elapsedMins / 60);
        elapsedMins = elapsedMins - (elapsedHours * 60);
        return [elapsedHours, elapsedMins];
    }
    getYear() {
        return this.date.getYear();
    }

    getMonth() {
        return this.date.getMonth();
    }

    getDate() {
        return this.date.getDate();
    }

    getHours() {
        return this.date.getHours();
    }

    getMins() {
        return this.date.getMinutes();
    }

    getTime() {
        return this.date.getTime(); // Returns in milliseconds
    }

    /**
     * Checks if a given Time object has already been passed
     */
    isPast() {
        this.date.getTime() < new Date().getTime();
    }

    /**
     * Checks if there is a task scheduled for a given Time object
     * @returns Return true if there is no task scheduled for the given Time object and false 
     *          if otherwise
     */
    isSlotFree() {
        let index = (this.date.getTime() - Time.prototype.timeRegistered) / 60000;
        if (Time.prototype.allTimeObjects[index].task == null) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * To schedule a task at a given Time object
     * @param {RoutineTask} task 
     */
    scheduleTask(task) {
        let index = (this.date.getTime() - Time.prototype.timeRegistered) / 60000;
        Time.prototype.allTimeObjects[index].task = task;
    }

    /**
     * To remove a scheduled task and free the Time object
     */
    removeTask() {
        let index = (this.date.getTime() - Time.prototype.timeRegistered) / 60000;
        Time.prototype.allTimeObjects[index].task = null;
    }

    /**
     * To initialise Time objects for every minute from the time a user registers for an account to 99 years later
     */
    static initialise() {
        let y;
        let m;
        let d;
        let h;
        let min;
        for (y = new Date().getFullYear; y < new Date().getFullYear + 100; y++) {
            for (m = 0; m < 12; m++) {
                for (d = 1; d <= Time.daysInMonth(m, y); d++) {
                    for (h = 0; h < 24; h++) {
                        for (min = 0; min < 60; min++) {
                            let currTime = new Time(y, m, d, h, min)
                            if (currTime.date.getTime() > Time.prototype.timeRegistered) {
                                Time.prototype.allTimeObjects.push(currTime);
                            }
                        }
                    }
                }
            }
        }
    }

}

Time.prototype.allTimeObjects = [];

Time.prototype.timeRegistered = Math.round(Date.now()/10000) * 10000; //To the nearest minute (Need to double check calculation)

// Testing
/*
let testTime = new Time(0, 1, 1, 1, 1, 0)
let testTime2 = new Time(0, 1, 1, 1, 1, 0)
let testTime3 = new Date(0, 1, 1, 1, 1, 0);
let testTime4 = new Date(0, 1, 1, 1, 1, 0);

testTime2.freeSlot()
testTime2.scheduleTask()
testTime2.freeSlot()
testTime2.removeTask()
testTime2.freeSlot()
*/
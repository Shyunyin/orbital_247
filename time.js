//Class to create time objects to keep track of when tasks are scheduled and what times are free
class Time {
    /**
     * Constructor to create Time objects
     * @param {Number} hours     Hour of the time object (0-23)
     * @param {Number} mins      Minute of the time object (0-59)
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
     static durationOfTask(startTime, endTime) {
        let elapsed = (this.endTime.hours * 60) + (this.endTime.mins) - (this.startTime.hours * 60) - (this.startTime.mins); 
        if (elapsed < 0) {
            return new Error('Start time is after end time!')
        }
        let elapsedHours = Math.floor(elapsedMins / 60);
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

}

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
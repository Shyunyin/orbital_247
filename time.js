//Class to create time objects to keep track of when tasks are scheduled and what times are free
//export class Time {
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
        if (startTime.getMins() + durMins >= 60) {
            durMins -= (60 - startTime.getMins());
            newHours = (startTime.getHours() + 1 + durHours) % 24;
            newMins = durMins; //TODO: Must change everything to 60
        } else {
            newHours = (startTime.getHours() + durHours) % 24;
            newMins = startTime.getMins() + durMins;
        }
        return new Time(newHours, newMins);
    }

    toString() {
        let hours = this.getHours();
        let mins = this.getMins();
        if (hours < 10) {
            hours = "0" + hours.toString()
        }
        if (mins < 10) {
            mins = "0" + mins.toString()
        }
        return hours.toString() + ":" + mins.toString();
    }

    toTwelveHourString() {
        let hours = this.getHours();
        let mins = this.getMins();

        if (mins < 10) {
            mins = "0" + mins.toString()
        }

        if (hours > 12) {
            hours = hours % 12;
            if (hours < 10) {
                hours = "0" + hours.toString()
            }
            return hours.toString() + ":" + mins.toString() + "PM";
        } else if (hours == 12) {
            return hours.toString() + ":" + mins.toString() + "PM";
        } else {
            if (hours < 10) {
                hours = "0" + hours.toString()
            }
            return hours.toString() + ":" + mins.toString() + "AM";
        }
    }
}
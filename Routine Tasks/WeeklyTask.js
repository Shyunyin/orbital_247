// Weekly tasks will be created from this class
class WeeklyTask extends RoutineTask {
    /**
     * Constructor to create weekly tasks
     * @param {String} taskName     Name of the task
     * @param {Number} taskCategory Category of task (0-2; To be chosen from category 
     *                              array below)
     * @param {Date} startTime      Time at which the task starts
     * @param {Date} endTime        Time at which the task ends
     * @param {Number} day          The day of the week on which the task occurs 
     *                              (0-6, Sun-Sat)
     */
    constructor(taskName, taskCategory, startTime, endTime, day) {
        super(taskName, taskCategory, startTime, endTime, RoutineTime.freq(1));
        this.day = day;
        this.duration = duration(this.startTime, this.endTime);
    }

    /**
     * Returns first date of a month at which the task takes place
     * @param {Number} year    The current year (Format: yyyy)
     * @param {Number} month    The current month (1-12, Jan-Dec)
     * @param {Number} day      The day of the week on which the task occurs 
     *                          (0-6, Sun-Sat)
     * @returns                 The first date of a month at which the task takes place
     */
    static startingDate(year, month, day) {
        var i;
        for (i = 1; i < 8; i ++) {
            if (new Date(year, month, i).getDay() == day) {
                return i;
            }
        }
    }

    /**
     * To add a weekly task to the user's schedule
     */
    addTask() { 
        for (y = new Date().getFullYear(); y < new Date().getFullYear() + 100; y++) {
            for (m = 0; m < 12; m++) {
                for (d = WeeklyTask.startingDate(y, m, this.day); d <= RoutineTask.daysInMonth(m, y); d += 7) {
                    for (h = 0; h < this.duration[0]; h++) {
                        for (min = 0; min < this.duration[1]; min++) {
                            let currTime = new Time(y, m, d, h, min, 0);
                            // Only scheduling tasks for the present and the future
                            if (!currTime.isPast()) {
                                currTime.scheduleTask();
                            } else {
                                throw new Error('This time is occupied by another task.');
                            }
                        }

                    }
                }                
            }
        }
    }

}
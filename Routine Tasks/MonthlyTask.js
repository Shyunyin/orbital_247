// Monthly tasks will be created from this class
class MonthlyTask extends RoutineTask {
    /**
     * Constructor to create monthly tasks
     * @param {String} taskName     Name of task
     * @param {String} taskCategory Category of task (0-2; To be chosen from category 
     *                              array below)
     * @param {Time} startTime      Time at which the task starts
     * @param {Time} endTime        Time at which the task ends
     * @param {Number} date         The date on which the task occurs 
     *                              (1-28/29/30/31)
     */
    constructor(taskName, taskCategory, startTime, endTime, date) {
        super(taskName, taskCategory, startTime, endTime, RoutineTask.freq(3));
        this.date = date;
        //this.duration = Time.duration(this.startTime, this.endTime);
    }

    /**
     * To add a monthly task to the user's schedule
     */
    addTask() {
        for (y = new Date().getFullYear(); y < new Date().getFullYear() + 100; y++) {
            for (m = 0; m < 12; m++) {
                for (h = this.startTime.getHours(); h <= this.endTime.getHours(); h++) {
                    for (min = this.startTime.getMins(); min <= this.endTime.getMins(); min++) {
                        let currTime = new Time(y, m, this.date, h, min, 0);
                        // To ensure that 29, 30 and 31 is not scheduled for all months 
                        if (!currTime.isPast() && (this.date <= Time.daysInMonth(m, y))) {
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
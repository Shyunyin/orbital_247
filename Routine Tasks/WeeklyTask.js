// Weekly tasks will be created from this class
class WeeklyTask extends RoutineTask {
    /**
     * Constructor to create weekly tasks
     * @param {String} taskName     Name of the task
     * @param {Number} taskCategory Category of task (0-2; To be chosen from category 
     *                              array below)
     * @param {Time} startTime      Time at which the task starts
     * @param {Time} endTime        Time at which the task ends
     * @param {Number} day          The day of the week on which the task occurs 
     *                              (0-6, Sun-Sat)
     */
    constructor(taskName, taskCategory, startTime, endTime, day) {
        super(taskName, taskCategory, startTime, endTime, RoutineTime.freq(1));
        this.day = day;
        //this.duration = Time.duration(this.startTime, this.endTime);
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
    scheduleTask() { 
        for (y = new Date().getFullYear(); y < new Date().getFullYear() + 100; y++) {
            for (m = 0; m < 12; m++) {
                for (d = WeeklyTask.startingDate(y, m, this.day); d <= Time.daysInMonth(m, y); d += 7) {
                    let newTask = new Window(y, m, d, this.startTime, this.endTime, 1);
                    if (newTask.duringSleep()) {
                        window.alert("Do you really want to schedule tasks during your sleep time? :(")
                        //if yes, continue. if yes, return
                    }
                    // Only scheduling tasks for the present and the future
                    if (!newTime.isPast()) {
                        newTask.insertWindow();
                    }
                }                
            }
        }
    }

}
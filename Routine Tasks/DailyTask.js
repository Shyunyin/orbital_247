// Daily tasks will be created from this class
class DailyTask extends RoutineTask {
    /**
     * Constructor to create daily tasks
     * @param {String} taskName     Name of task
     * @param {Number} taskCategory Category of task (0-2; To be chosen from category 
     *                              array below)
     * @param {Time} startTime      Time at which the task starts
     * @param {Time} endTime        Time at which the task ends
     */
    constructor(taskName, taskCategory, startTime, endTime) {
        super(taskName, taskCategory, startTime, endTime, RoutineTime.freq(0));
        //this.duration = Time.duration(this.startTime, this.endTime);
    }
    
    /**
     * To add a daily task to the user's schedule
     */
    scheduleTask() { 
        for (y = new Date().getFullYear(); y < new Date().getFullYear() + 100; y++) {
            for (m = 0; m < 12; m++) {
                for (d = 1; d <= Time.daysInMonth(m, y); d++) {
                    let newTask = new Window(y, m, d, this.startTime, this.endTime, 1);
                    if (!newTask.isPast()) {
                        newTask.insertWindow();
                    }
                }                
            }
        }
    }

}
// Daily tasks will be created from this class
class DailyTask extends RoutineTask {
    /**
     * Constructor to create daily tasks
     * @param {String} taskName     Name of task
     * @param {Number} taskCategory Category of task (0-2; To be chosen from category 
     *                              array below)
     * @param {Date} startTime      Time at which the task starts
     * @param {Date} endTime        Time at which the task ends
     */
    constructor(taskName, taskCategory, startTime, endTime) {
        super(taskName, taskCategory, startTime, endTime, RoutineTime.freq(0));
        this.duration = duration(this.startTime, this.endTime);
    }
    
    /**
     * To add a daily task to the user's schedule
     */
    addTask() { 
        for (y = new Date().getFullYear(); y < new Date().getFullYear() + 100; y++) {
            for (m = 0; m < 12; m++) {
                for (d = 1; d <= RoutineTask.daysInMonth(m, y); d++) {
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
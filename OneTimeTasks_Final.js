// import window and time class

// Contains the following classes: OneTimeTask, FixedTask and NonFixedTask 
// IMPORTANT: Need to relook at NonfixedTask class and update it accordingly

class OneTimeTask {
    constructor(taskName, taskCategory, year, month, date) {
        this.taskName = taskName;
        this.taskCategory = taskCategory;
        this.year = year;
        this.month = month;
        this.date = date;
    }
}

OneTimeTask.prototype.cats = ['Work', 'Exercise', 'Miscellaneous', 'Meal', 'Fully Work', 'Partially Work'];

class FixedTask extends OneTimeTask {
    /**
     * Creates fixed tasks for a day
     * @param {String} taskName Name of the task
     * @param {Number} taskCategory Category of task (0-5; To be chosen from category 
     *                              array in OneTimeTask class)
     * @param {Number} year Year for which the task is schedueled
     * @param {Number} month Month for which the task is schedueled
     * @param {Number} date Date for which the task is schedueled
     * @param {Time} startTime The time at which the task is to start
     * @param {Time} endTime The time at which the task is to end
     */
    constructor(taskName, taskCategory, year, month, date, startTime, endTime) {
        super(taskName, taskCategory, year, month, date);
        this.startTime = startTime;
        this.endTime = endTime;
    }

    /**
     * To add a fixed task to the user's schedule
     */
    scheduleTask() {
        //TODO: Pop up window if it is during sleep
        let newTask = new Window(this.taskName, this.year, this.month, this.date, this.startTime, this.endTime, 1);
        if (!newTask.isPast()) {
            console.log(this.startTime);
            newTask.insertWindow();
        }
    }

    deleteTask() {
        let newTask = new Window("Blank", this.year, this.month, this.date, this.startTime, this.endTime, 1); // Assuming we don't have the name of the task
        if (!newTask.isPast()) {
            newTask.removeWindow();
        }
    }

}
// Class for one time tasks to be created
class OneTimeTask {
    constructor(taskName, taskCategory, year, month, date) {
        this.taskName = taskName;
        this.taskCategory = taskCategory;
        this.year = year;
        this.month = month;
        this.date = date;
    }
}

OneTimeTask.prototype.cats = ['Work', 'Exercise', 'Miscellaneous'];
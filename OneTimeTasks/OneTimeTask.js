// Class for one time tasks to be created
import {Window} from '../Window.js';
import {Time} from '../Time.js';
export class OneTimeTask {
    constructor(taskName, taskCategory, year, month, date) {
        this.taskName = taskName;
        this.taskCategory = taskCategory;
        this.year = year;
        this.month = month;
        this.date = date;
    }
}

OneTimeTask.prototype.cats = ['Work', 'Exercise', 'Miscellaneous', 'Meal', 'Fully Work', 'Partially Work'];

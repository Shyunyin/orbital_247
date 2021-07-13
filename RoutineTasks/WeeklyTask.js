import {RoutineTask} from './RoutineTask.js';
import { Window } from "./Window.js";
import {Time} from '../time.js';

// Weekly tasks will be created from this class
export class WeeklyTask extends RoutineTask {
    /**
     * Constructor to create weekly tasks
     * @param {String} taskName     Name of the task
     * @param {Number} taskCategory Category of task (0-2; To be chosen from category 
     *                              array in RoutineTask class)
     * @param {Time} startTime      Time at which the task starts
     * @param {Time} endTime        Time at which the task ends
     * @param {Number} day          The day of the week on which the task occurs 
     *                              (0-6, Sun-Sat)
     */
    constructor(taskName, taskCategory, startTime, endTime, day) {
        super(taskName, taskCategory, startTime, endTime, 1);
        this.day = day;
    }

    /**
     * Returns first date of a month at which the task takes place
     * @param {Number} year    The current year (Format: yyyy)
     * @param {Number} month    The current month (0-11, Jan-Dec)
     * @param {Number} day      The day of the week on which the task occurs 
     *                          (0-6, Sun-Sat)
     * @returns {Number}         The first date of a month at which the task takes place
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
                    let newTask = new Window(this,taskName, y, m, d, this.startTime, this.endTime, 1, null, null);
                    if (newTask.duringSleep()) {
                        //TODO: window.alert("Do you really want to schedule tasks during your sleep time?"); Basically if yes, continue. If no, return.
                    }
                    // Only scheduling tasks for the present and the future
                    if (!newTime.isPast()) {
                        newTask.insertWindow();
                    }
                }                
            }
        }
    }

    deleteTask() {
        for (y = new Date().getFullYear(); y < new Date().getFullYear() + 100; y++) {
            for (m = 0; m < 12; m++) {
                for (d = WeeklyTask.startingDate(y, m, this.day); d <= Time.daysInMonth(m, y); d += 7) {
                    let newTask = new Window(this,taskName, y, m, d, this.startTime, this.endTime, 1, null, null);
                    // Only deleting tasks from the present and the future
                    if (!newTime.isPast()) {
                        newTask.removeWindow();
                    }
                }                
            }
        }
    }

}



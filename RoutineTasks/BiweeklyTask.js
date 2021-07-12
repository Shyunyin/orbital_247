import {RoutineTask} from './RoutineTask.js';
import { Window } from "./Window.js";
import {Time} from '../Time.js';

// Biweekly tasks will be created from this class
export class BiweeklyTask extends RoutineTask {
    /**
     * Constructor to create biweekly tasks
     * @param {String} taskName     Name of task
     * @param {Number} taskCategory Category of task (0-2; To be chosen from category 
     *                              array in RoutineTask class)
     * @param {Time} startTime      Time at which the task starts
     * @param {Time} endTime        Time at which the task ends
     * @param {Number} day          The day of the week on which the task occurs 
     *                              (0-6, Sun-Sat)
     * @param {Number} startWeek    The week in which the task starts (0 - Current week, 1 - 
     *                              Next week)
     */
    constructor(taskName, taskCategory, startTime, endTime, day, startWeek) {
        super(taskName, taskCategory, startTime, endTime, 2);
        this.day = day;
        this.startWeek = startWeek; 
    }

    /**
     * Calculate the first date of the current month on which this task takes place based on last date it took place in the previous month
     * @param {Number} year             The current year (Format: yyyy)
     * @param {Number} month            The current month (0-11, Jan-Dec)
     * @param {Number} day              The day of the week on which the task occurs 
     *                                  (0-6, Sun-Sat)
     * @param {Number} previousDate     The date at which the task was last scheduled in the 
     *                                  previous month
     * @returns {Number}                The first date of the current month on which this task 
     *                                  takes place
     */
    static startingDate(year, month, day, previousDate) {
        var i;
        for (i = 1; i < 8; i ++) {
            if (new Date(year, month, i).getDay() == day) {
                break;
            }
        }
        if ((i - previousDate) < -17) {
            return i + 7;
        } else {
            return i;
        }
    }

    /**
     * Calculates the date on which this task is to be first scheduled
     * @returns {Number} The date that is 14 days before the actual date that this task is to be first 
     *          scheduled
     */
    previousDate() {
        let day = this.day
        let startWeek = this.start_week
        let currDay = new Date().getDay()
        let currDate = new Date().getDate()
        let currMonth = new Date().getMonth()
        let currYear = new Date().getYear()
        let actualStartDate = 0

        if (startWeek == 0 && day < currDay) {
            let daysPassed = currDay - day
            actualStartDate = currDate - daysPassed
        } else if (startWeek == 0) {
            let daysToWait = day - currDay
            actualStartDate = currDate + daysToWait
        } else {
            let daysToWait = 7 + (day - currDay)
            actualStartDate = currDate + daysToWait
        }
 
        while (actualStartDate > 0) {
            actualStartDate -= 14
        }
        if (currMonth == 0) {
            return RoutineTask.daysInMonth(12, currYear - 1) + actualStartDate
        } else {
            return RoutineTask.daysInMonth(currMonth - 1, currYear) + actualStartDate
        }
    }

    /**
     * To add a biweekly task to the user's schedule
     */
    scheduleTask() { 
        let previousDate = this.previousDate();
        for (y = new Date().getFullYear(); y < new Date().getFullYear() + 100; y++) {
            for (m = 0; m < 12; m++) {
                for (d = BiweeklyTask.startingDate(y, m, this.day, previousDate); d <= Time.daysInMonth(m, y); d += 14) {
                    let newTask = new Window(this.taskName, y, m, d, this.startTime, this.endTime, 1, null, null);
                    if (newTask.duringSleep()) {
                        //TODO: window.alert("Do you really want to schedule tasks during your sleep time?"); Basically if yes, continue. If no, return.
                    }
                    // Only scheduling tasks for the present and the future
                    if (!newTask.isPast()) {
                        newTask.insertWindow();
                        previousDate = d
                    }
                }
            }                
        }
    }

    deleteTask() {
        let previousDate = this.previousDate();
        for (y = new Date().getFullYear(); y < new Date().getFullYear() + 100; y++) {
            for (m = 0; m < 12; m++) {
                for (d = BiweeklyTask.startingDate(y, m, this.day, previousDate); d <= Time.daysInMonth(m, y); d += 14) {
                    let newTask = new Window(this.taskName, y, m, d, this.startTime, this.endTime, 1, null, null);
                    // Only deleting tasks from the present and the future
                    if (!newTask.isPast()) {
                        newTask.removeWindow();
                        previousDate = d
                    }
                }
            }                
        }
    }
}

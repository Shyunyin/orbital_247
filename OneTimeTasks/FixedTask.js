//Class to create fixed tasks
/*
Additional questions/comments:
1. We can have a checkbox to choose if it for today or another day? / by default the numbers are already there
2. Time option before asking number of sessions
*/ 

import { OneTimeTask } from "./OneTimeTask.js";
import { Window } from "../Window.js";
import {Time} from '../Time.js';

export class FixedTask extends OneTimeTask {
    /**
     * Creates fixed tasks for a day
     * @param {String} taskName Name of the task
     * @param {Number} taskCategory Category of task (0-2; To be chosen from category 
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
        let newTask = new Window(this.year, this.month, this.date, this.startTime, this.endTime, 1, null, null);
        if (!newTask.isPast()) {
            newTask.insertWindow();
        }
    }

    deleteTask() {
        let newTask = new Window(this.year, this.month, this.date, this.startTime, this.endTime, 1, null, null);
        if (!newTask.isPast()) {
            newTask.removeWindow();
        }
    }

}





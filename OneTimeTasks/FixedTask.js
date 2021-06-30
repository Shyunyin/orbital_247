//Class to create fixed tasks
/*
Additional questions/comments:
1. We can have a checkbox to choose if it for today or another day? / by default the numbers are already there
2. Time option before asking number of sessions
*/ 

import { OneTimeTask } from "./OneTimeTask.js";

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

/*Initialising firebase*/
var firebaseConfig = {
    apiKey: "AIzaSyBtFGTnYwEU5OgIa4SpKvMaGAa1ofEjs3U",
    authDomain: "orbital-24-7.firebaseapp.com",
    projectId: "orbital-24-7",
    storageBucket: "orbital-24-7.appspot.com",
    messagingSenderId: "459091456870",
    appId: "1:459091456870:web:21134477e94d50e25ecea7",
    measurementId: "G-WQMCMBMFCK"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var firestore = firebase.firestore();



import {RoutineTask} from './RoutineTask.js';
// Monthly tasks will be created from this class
export class MonthlyTask extends RoutineTask {
    /**
     * Constructor to create monthly tasks
     * @param {String} taskName     Name of task
     * @param {Number} taskCategory Category of task (0-2; To be chosen from category 
     *                              array in RoutineTask class)
     * @param {Time} startTime      Time at which the task starts
     * @param {Time} endTime        Time at which the task ends
     * @param {Number} date         The date on which the task occurs 
     *                              (1-31)
     */
    constructor(taskName, taskCategory, startTime, endTime, date) {
        super(taskName, taskCategory, startTime, endTime, 3);
        this.date = date;
    }

    /**
     * To add a monthly task to the user's schedule
     */
    scheduleTask() {
        for (y = new Date().getFullYear(); y < new Date().getFullYear() + 100; y++) {
            for (m = 0; m < 12; m++) {
                if (this.date <= Time.daysInMonth(m, y)) {
                    let newTask = new Window(this.taskName, y, m, d, this.startTime, this.endTime, 1, null, null);
                    if (newTask.duringSleep()) {
                        //TODO: window.alert("Do you really want to schedule tasks during your sleep time?"); Basically if yes, continue. If no, return.
                    }
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
                if (this.date <= Time.daysInMonth(m, y)) {
                    let newTask = new Window(this.taskName, y, m, d, this.startTime, this.endTime, 1, null, null);
                    if (!newTime.isPast()) {
                        newTask.removeWindow();
                    }
                }              
            }
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
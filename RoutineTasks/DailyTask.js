import {RoutineTask} from './RoutineTask.js';
// Daily tasks will be created from this class
export class DailyTask extends RoutineTask {
    /**
     * Constructor to create daily tasks
     * @param {String} taskName     Name of task
     * @param {Number} taskCategory Category of task (0-2; To be chosen from category 
     *                              array in RoutineTask class)
     * @param {Time} startTime      Time at which the task starts
     * @param {Time} endTime        Time at which the task ends
     */
    constructor(taskName, taskCategory, startTime, endTime) {
        super(taskName, taskCategory, startTime, endTime, 0);
    }
    
    /**
     * To add a daily task to the user's schedule
     */
    scheduleTask() { 
        for (y = new Date().getFullYear(); y < new Date().getFullYear() + 100; y++) {
            for (m = 0; m < 12; m++) {
                for (d = 1; d <= Time.daysInMonth(m, y); d++) {
                    let newTask = new Window(this.taskName, y, m, d, this.startTime, this.endTime, 1, null, null);
                    if (newTask.duringSleep()) {
                        //TODO: window.alert("Do you really want to schedule tasks during your sleep time?"); Basically if yes, continue. If no, return.
                    }
                    if (!newTask.isPast()) {
                        newTask.insertWindow();
                    }
                }                
            }
        }
    }

    deleteTask() {
        for (y = new Date().getFullYear(); y < new Date().getFullYear() + 100; y++) {
            for (m = 0; m < 12; m++) {
                for (d = 1; d <= Time.daysInMonth(m, y); d++) {
                    let newTask = new Window(this.taskName, y, m, d, this.startTime, this.endTime, 1, null, null);
                    if (!newTask.isPast()) {
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
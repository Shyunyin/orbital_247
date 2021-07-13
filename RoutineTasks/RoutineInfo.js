// Class to contain the user's wake-up time, (estimated) sleep time and productivity time
import {Time} from '../Time.js';


//Importing relevant firebase libraries
src="https://www.gstatic.com/firebasejs/8.6.3/firebase-app.js"
src="https://www.gstatic.com/firebasejs/8.6.3/firebase-auth.js"
src="https://www.gstatic.com/firebasejs/8.6.3/firebase-analytics.js"
src="https://www.gstatic.com/firebasejs/8.6.8/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyBtFGTnYwEU5OgIa4SpKvMaGAa1ofEjs3U",
    authDomain: "orbital-24-7.firebaseapp.com",
    databaseURL: "https://orbital-24-7-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "orbital-24-7",
    storageBucket: "orbital-24-7.appspot.com",
    messagingSenderId: "459091456870",
    appId: "1:459091456870:web:21134477e94d50e25ecea7",
    measurementId: "G-WQMCMBMFCK"
    };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let cloudDB = firebase.firestore(); //TODO: Should be changed to the specific user's as well
export class RoutineInfo {
    /**
     * Constructor to record user's wake-up time and productive slot information
     * @param {Time} wakeUpTime The time at which user usually wakes up at
     * @param {Time} productiveSlot Start time of productivity slot (Slot's duration will always be at 4 hours)
     */
    constructor(wakeUpTime, productiveSlot) {
        RoutineInfo.wakeUpTime = wakeUpTime;
        RoutineInfo.productiveSlot = productiveSlot;
        // Estimating sleep time (Assuming sleep time to be for 8 hours)
        RoutineInfo.sleepTime = new Time((RoutineInfo.wakeUpTime.getHours() + 16) % 24, RoutineInfo.wakeUpTime.getMins());
        //Updating the database
        cloudDB.collection("Users").doc(userName).collection("Routine Info").doc("Routine Info").set(
            {
                wakeUpTimeStart: RoutineInfo.wakeUpTime,
                wakeUpTimeEnd: RoutineInfo.sleepTime,
                productiveSlotStart: RoutineInfo.productiveSlot,
                productiveSlotEnd: Time.findEndTime(RoutineInfo.productiveSlot, [4, 0]),
            }
        ).then(function(){
            console.log("Routine info for for user '" + userName + "' has been created.");
        })
        .catch(function(error) {
            console.error("Error adding routine info doc for user '" + userName + "'' : ", error);
        });

    }

    /**
     * To retrieve the wake-up time of a user
     * @returns {Time} The wake-up time of a user
     */
    static getWakeUpTime() {
        return RoutineInfo.wakeUpTime;
    }

    /**
     * To retrieve the hours of the wake-up time of a user
     * @returns {Number} The hours of the wake-up time of a user
     */
    static getWakeUpTimeHours() {
        return RoutineInfo.wakeUpTime.getHours();
    }

    /**
     * To retrieve the minutes of the wake-up time of a user
     * @returns {Number} The minutes of the wake-up time of a user
     */
    static getWakeUpTimeMins() {
        return RoutineInfo.wakeUpTime.getMins();
    }

    /**
     * To retrieve the estimated sleep time of a user
     * @returns {Time} The sleep time of a user
     */
    static getSleepTime() {
        return RoutineInfo.sleepTime;
    }

    /**
     * To retrieve the hours of the estimated sleep time of a user
     * @returns {Number} The hours of the estimated sleep time of a user
     */
    static getSleepTimeHours() {
        return RoutineInfo.sleepTime.getHours();
    }

    /**
     * To retrieve the minutes of the estimated sleep time of a user
     * @returns {Number} The minutes of the estimated sleep time of a user
     */
    static getSleepTimeMins() {
        return RoutineInfo.sleepTime.getMins();
    }

    /**
     * To retrieve the start time of a user's productivity slot
     * @returns {Time} The start time of a user's productivity slot
     */
    static getProductiveSlot() {
        return RoutineInfo.productiveSlot;
    }

    /**
     * To retrieve the hours of the start time of a user's productivity slot
     * @returns {Time} The hours of the start time of a user's productivity slot
     */
     static getProductiveSlotHours() {
        return RoutineInfo.productiveSlot.getHours();
    }

    /**
     * To retrieve the minutes of the start time of a user's productivity slot
     * @returns {Time} The minutes of the start time of a user's productivity slot
     */
     static getProductiveSlotMins() {
        return RoutineInfo.productiveSlot.getMins();
    }
}


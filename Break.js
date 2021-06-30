class Break {
    /**
     * Calculates 
     * @param {Time} startTime 
     * @param {Time} endTime 
     * @returns 
     */
    static calculateBreak(startTime, endTime) {
        duration = Time.duration(startTime, endTime);
        if (duration.getHours() >= 1) {
            let totalMins = (duration.getHours() * 60) + duration.getMins();
            let breakMins = totalMins / 6;
            let remainder = breakMins % 5
            if (remainder < 2.5) {
                breakMins = breakMins - remainder;
            } else {
                breakMins = breakMins - remainder + 5;
            }
            return breakMins;
        } else {
            return 0;
        }
    }

    static calculateBreakFromDuration(duration) {
        if (duration.getHours() >= 1) {
            let totalMins = (duration.getHours() * 60) + duration.getMins();
            let breakMins = totalMins / 6;
            let remainder = breakMins % 5
            if (remainder < 2.5) {
                breakMins = breakMins - remainder;
            } else {
                breakMins = breakMins - remainder + 5;
            }
            return breakMins;
        } else {
            return 0;
        }
    }

    static accumulateWorkTime(startTime, endTime) {
        duration = Time.duration(startTime, endTime);
        Break.prototype.accumulatedWorkTime += (duration.getHours() * 60) + duration.getMins();
    }
    
    static clearAccumulatedWorkTime() {
        Break.prototype.accumulatedWorkTime = 0;
    }
}

Break.prototype.accumulatedWorkTime;
Break.prototype.accumulatedBreakTime; //To be just in minutes

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
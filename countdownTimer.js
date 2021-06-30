class countdownTimer {
    static startTimer(indexOfTask, duration) { // duration format: [hours, mins], indexOfTask: index of the task in fixedTaskArr
        var now = new Date();
        setInterval(
            function() {
                var durationInMs = (duration[0] * 60 * 60 * 1000) + (duration[1] * 60 * 1000);
                var timeleft = durationInMs;
            
                // Calculating the hours, minutes and seconds left
                var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
            
                // Display the message when countdown is over
                if (timeleft < 0) {
                    clearInterval(myfunc);
                    //TODO: Temporary. Will be a different response based on user's course of action.
                    countdownTimer[indexOfTask] = [new Time(now.getHours(), now.getMinutes()), Math.trunc((durationInMs / 1000) / 60)];
                    window.alert("Time's up!");
                } 
                if (countdownTimer.prototype.stopped) {
                    clearInterval(myfunc);
                    let timeTaken = durationInMs - timeleft;
                    let newMins = Math.trunc((timeTaken / 1000) / 60);
                    countdownTimer[indexOfTask] = [new Time(now.getHours(), now.getMinutes()), newMins];
                    countdownTimer.prototype.stopped = false;
                }
            }, 1000);
    }

    static stopTime() {
        countdownTimer.prototype.stopped = true;
    }
}

countdownTimer.prototype.stopped = false;
countdownTimer.prototype.counterArr = []; 

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
class countdownTimer {
    static startTimer(indexOfTask, duration) { // duration format: [hours, mins], indexOfTask: index of the task in fixedTaskArr
        var now = new Date();
        setInterval(
            function() {
                var durationInMs = (duration[0] * 60 * 60 * 1000) + (duration[1] * 60 * 1000);
                var timeleft = durationInMs;
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


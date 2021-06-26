class countdownTimer {
    static startTimer(duration) { // duration format: [hours, mins]
        setInterval(
            function() {
                var timeleft = (duration[0] * 60 * 60 * 1000) + (duration[1] * 60 * 1000);
            
                // Calculating the hours, minutes and seconds left
                var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
            
                // Display the message when countdown is over
                if (timeleft < 0) {
                    clearInterval(myfunc);
                    window.alert("Time's up!");
                }
            }, 1000);
    }
}
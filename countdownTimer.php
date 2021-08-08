<!DOCTYPE HTML>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script type="text/javascript" type="module" src="countdownTimer.js"></script>
    <script type="text/javascript" type="module" src="CombinedTime_Final.js"></script>
    <!-- <script type="text/javascript" type="module" src="Time.js"></script> -->
    <link href="https://fonts.googleapis.com/css2?family=Signika+Negative:wght@600&display=swap" rel="stylesheet">
    <style>
      p {
        display: inline;
        font-family: "Signika Negative", sans-serif;
        font-size: 40px;
        margin-top: 0px;
      }
      body {
        background-color: #f6f7f1;
      }
      #stop {
        font-family: "Signika Negative", sans-serif;
        font-size: large;
        border-color: black;
        border-width: 2px;
        border-radius: 5px;
        width: 70px;
        height: 30px;
        background-color: #e3aba1;
      }
      #stop:hover {
        background-color: #FEDCCE;
      }
      #pause {
        font-family: "Signika Negative", sans-serif;
        font-size: large;
        border-color: black;
        border-width: 2px;
        border-radius: 5px;
        width: 150px;
        height: 30px;
        background-color: #e3aba1;
      }
      #pause:hover {
        background-color: #FEDCCE;
      }
      #reschedule {
        font-family: "Signika Negative", sans-serif;
        font-size: large;
        border-color: black;
        border-width: 2px;
        border-radius: 5px;
        width: 150px;
        height: 30px;
        background-color: #e3aba1;
      }
      #reschedule:hover {
        background-color: #FEDCCE;
      }
      /*Temporary*/
      #taskName {
        font-family: "Signika Negative", sans-serif;
        font-size: large;
        background-color: #96d6ed;
        border-radius: 5px;
        text-align: center;
      }
      .taskName {
        font-family: "Signika Negative", sans-serif;
        font-size: large;
      }
    </style>
  </head>

  <audio src="../timer_3_beeps.mp3" id="end_audio"></audio> 
  <audio src="../timer.mp3" id="countdown_audio"></audio> 

  <body>
      <!--Temporary to be replaced by javascript, just put in place for milestone submission-->
      <div class="taskName">
        <h3>Task in progress:</h3>
        <h3 id="taskName"></h3>
      </div>

      <p id="days"></p>
      <p id="hours"></p>
      <p id="mins"></p>
      <p id="secs"></p>
      <h2 id="end"></h2>

      <!-- <button type="button" id="stop" onclick="endMe()">Stop</button> -->
      <button type="button" id="pause" onclick="pause()">Pause</button>
      <button type="button" id="reschedule" onclick="completed()">Completed Task</button>

      <script>
        /*Setting up start and end time*/
        var startTimeHour = localStorage.getItem("startTimeHour");
        var startTimeMin = localStorage.getItem("startTimeMin");
        var endTimeHour = localStorage.getItem("endTimeHour");
        var endTimeMin = localStorage.getItem("endTimeMin");
        var taskName = localStorage.getItem("taskname");
        console.log("Taskname:" + taskName);

        var ele = document.createElement("input");
        ele.type = "text";    
        ele.value = taskName;
        ele.style.border = "none";
        ele.style.backgroundColor = "#96d6ed";
        ele.style.color = "black";
        ele.style.position = "relative";
        ele.style.zIndex = "10";
        ele.style.fontFamily = "Signika Negative";
        ele.style.fontSize = "25px";
        ele.style.textAlign = "center";
        ele.id = "name";
        var main = document.getElementById("taskName");
        main.appendChild(ele);

        //var startTimeHour = parseInt(startTime.substr(0,2));
        console.log("Start time Hour: " + startTimeHour);
        //var startTimeMin = parseInt(startTime.substr(3,5));
        console.log("Start time Min: " + startTimeMin);
        //var endTimeHour = parseInt(endTime.substr(0,2));
        console.log("End time Hour: " + endTimeHour);

        //var endTimeMin = parseInt(endTime.substr(3,5));
        console.log("End time Min: " + endTimeMin);

      
        var startTiming = new Time(startTimeHour, startTimeMin);
        var endTiming = new Time(endTimeHour, endTimeMin);  

        var duration = Time.duration(startTiming, endTiming);
        console.log(duration);
        console.log("Start time: " + startTiming);
        console.log("End time: " + endTiming);

        // Creating the countdown timer
        //var countdown = (duration[0]*3600000) + (duration[1]*60000);
        var countdown = 10000;
        var current_time = Date.parse(new Date());
        var deadline = new Date(current_time + countdown);

        function time_remaining(endtime){
          let t = Date.parse(endtime) - Date.parse(new Date());
          let seconds = Math.floor( (t/1000) % 60 );
          let minutes = Math.floor( (t/1000/60) % 60 );
          let hours = Math.floor( (t/(1000*60*60)) % 24 );
          return {'total':t, 'days':days, 'hours':hours, 'minutes':minutes, 'seconds':seconds};
        }

        var timeinterval;
        //var endAudio = new Audio('audio/beep.mp3'); 
        //var endAudio = new Audio('https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3');
        //var endAudio = new Audio("../timer_3_beeps.mp3");

        function run_clock(endtime){

          function update_clock(){
            let t = time_remaining(endtime);
            document.getElementById("hours").innerHTML = t.hours + "h " 
            document.getElementById("mins").innerHTML = t.minutes + "m " 
            document.getElementById("secs").innerHTML = t.seconds + "s "
  
            if (t.total <= 5000 && t.total > 0) {
              document.getElementById("countdown_audio").play();
            }
            if(t.total <= 0) { 
                clearInterval(timeinterval); 
                document.getElementById("end_audio").play();
                document.getElementById("reschedule").innerHTML = "Cancel and exit";
                document.getElementById("pause").innerHTML = "Completed Task";
            }
          }
          update_clock(); // run function once at first to avoid delay
          timeinterval = setInterval(update_clock,1000);
        }
        run_clock(deadline);

        var paused = false; // is the clock paused?
        var time_left; // time left on the clock when paused

        function pause_clock(){
          if(!paused) {
            paused = true;
            clearInterval(timeinterval); // stop the clock
            time_left = time_remaining(deadline).total; // preserve remaining time
          }
        }

        function resume_clock() {
          if(paused){
            paused = false;

            // update the deadline to preserve the amount of time remaining
            deadline = new Date(Date.parse(new Date()) + time_left);

            // start the clock
            run_clock(deadline);
          }
        }

        /*closeMe(): when End button is pressed, window will be closed*/
        function endMe() {
          try {
            window.close();
          } catch (e) { console.log(e) }
          try {
            self.close();
          } catch (e) { console.log(e) }
        }

        function completed() {
          if (document.getElementById("reschedule").innerHTML == "Completed Task") {
            // Need to update the database
          } else { // Cancel and exit
            endMe();
          }
        }

        function pause() {
          if (document.getElementById("pause").innerHTML == "Pause") {
            document.getElementById("pause").innerHTML = "Resume";
            document.getElementById("reschedule").innerHTML = "Cancel and exit";
            document.getElementById("countdown_audio").pause();
            pause_clock();
          } else if (document.getElementById("pause").innerHTML == "Resume"){
            document.getElementById("pause").innerHTML = "Pause";
            document.getElementById("reschedule").innerHTML = "Completed Task";
            resume_clock();
          } else { // Completed Task so update database

          }
        }
      </script>
  </body>
</html>

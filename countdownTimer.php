<!DOCTYPE HTML>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script type="text/javascript" type="module" src="countdownTimer.js"></script>
    <script type="text/javascript" type="module" src="CombinedTime_Final.js"></script>
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

      <button type="button" id="stop" onclick="endMe()">Stop</button>

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
        // The data/time we want to countdown to
        var countDownDate = Date.now() + (duration[0]*3600000) + (duration[1]*60000) + 2000;

        // Run myfunc every second
        var myfunc = setInterval(function() {

        var now = new Date().getTime();
        var timeleft = countDownDate - now;
          
        // Calculating the days, hours, minutes and seconds left
        var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
        var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
            
        // Result is output to the specific element 
        //TODO: Might need to change all of this according to what we intend to display
        document.getElementById("hours").innerHTML = hours + "h " 
        document.getElementById("mins").innerHTML = minutes + "m " 
        document.getElementById("secs").innerHTML = seconds + "s " 
            
        // Display the message when countdown is over
        if (timeleft < 0) {
            clearInterval(myfunc);
            document.getElementById("hours").innerHTML = "" 
            document.getElementById("mins").innerHTML = ""
            document.getElementById("secs").innerHTML = ""
            //TODO: Might need to change all of this according to what we intend to display
            document.getElementById("end").innerHTML = "TIME UP!!";
        }
        }, 1000);

        /*closeMe(): when End button is pressed, window will be closed*/
        function endMe() {
          try {
            window.close();
          } catch (e) { console.log(e) }
          try {
            self.close();
          } catch (e) { console.log(e) }
        }
      </script>
  </body>
</html>

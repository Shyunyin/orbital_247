<!DOCTYPE HTML>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<script type="text/javascript" type="module" src="countdownTimer.js"></script>
<!--Importing Firebase and Cloud Firestore libraries-->
<script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-firestore.js"></script>
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
      <h3 id="taskName">Test1</h3>
    </div>

    <p id="days"></p>
    <p id="hours"></p>
    <p id="mins"></p>
    <p id="secs"></p>
    <h2 id="end"></h2>
    <button type="button" id="stop" onclick="endMe()">Stop</button>
    <script>
    // The data/time we want to countdown to
    var countDownDate = new Date("Jul 28, 2021 13:04:00").getTime();

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
    </script>
</body>
</html>

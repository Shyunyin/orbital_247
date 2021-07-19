<?php
    session_start();
?>
<!DOCTYPE HTML>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<script type="text/javascript" type="module" src="./countdownTimer.js"></script>
<script type="text/javascript" type="module" src="./link.js"></script>
<script type="text/javascript" type="module" src="CombinedTime_Final.js"></script>
<script type="text/javascript" type="module" src="Routine_Final.js"></script>
<!--Importing Firebase and Cloud Firestore libraries-->
<script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-firestore.js"></script>
<link href="https://fonts.googleapis.com/css2?family=Signika+Negative:wght@600&display=swap" rel="stylesheet">
<style>
body{
  font-family: "Signika Negative", sans-serif;
  background-color: #f6f7f1;
  color: #1e5353;
  text-align: center;
  margin-top: 300px;
}
#wakeupTime {
    width: 150px;
    height: 50px;
    background-color: #96d6ed;
    border-color: black;
    border-width: 2px;
    border-radius: 5px;
    font-family: "Signika Negative", sans-serif;
    font-size: large;
    text-align: center;
    margin-top: 15px;
}
#next {
    font-family: "Signika Negative", sans-serif;
    font-size: large;
    background-color: #e3aba1;
    border-color: black;
    border-width: 2px;
    border-radius: 5px;
    margin-top: 50px;
    margin-left: 50px;
}
#next:hover {
    background-color: #FEDCCE;
}
.vertical {
    justify-content: center;
}
</style>
</head>

<body>
    <h2>Please input the time which you usally wake up &nbsp;</h2>
    <h2> at/ at which your day starts:</h2>
    <div class="vertical">
        <input type="time" id="wakeupTime" oninput="Update(this.value, 'time')">
        <button type="button" id="next" onclick="nextPage()">Next</button> 
    </div>
   
    <script>
         //------------------Defining of variables------------------//
         let Wakeup = document.getElementById("wakeupTime");

         let wakeup = Wakeup.value;
         let wakeupArr = [parseInt(wakeup.substr(0, 2)), parseInt(wakeup.substr(3, 4))];
        function Update(val, type){
            if(type=='time'){
                wakeup=val;
                console.log(wakeup) //debugging
                wakeupArr=[parseInt(wakeup.substr(0, 2)), parseInt(wakeup.substr(3, 4))];
                console.log(wakeupArr) //debugging
            }
        }
         //--------------- Configuration --------------------------//
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

        if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
        }else {
          firebase.app(); // if already initialized, use that one
        }
        let cloudDB = firebase.firestore();


        function link_To_Database() {
                cloudDB.collection("User Info").document("Wakeup Time").update({
                    wakeupTime: Array(Number(wakeupArr[0]), Number(wakeupArr[1]))
                }).then(function(){
                    console.log(wakeupArr);
                    console.log("Wake up time written ");
                }).catch(function(error){
                    console.error("Error adding wakeup time");
                });
        }

        function nextPage() {
            if (document.getElementById("wakeupTime").value === "") { //if not filled
                window.alert("Please input your wake up time!");
            } else { //if time is filled up
                link_To_Database();
            }
                // /*Storing as a function*/
                // let wakeTime = new Time( //create new time object for end time in Window and individual mode objects
                // parseInt(wakeup.substr(0, 2)),
                // parseInt(wakeup.substr(3, 4)),
                // window.location.href = "http://127.0.0.1:5501/inputProductivity.html"; //change to productivity page
        }
    </script>
</body>
</html>
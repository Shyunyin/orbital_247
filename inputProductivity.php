<?php
    session_start();
?>

<!DOCTYPE HTML>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<script type="text/javascript" type="module" src="./countdownTimer.js"></script>
<script type="text/javascript" type="module" src="./link.js"></script>
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
    .btn-group {
        position: center;
        margin-left: 230px;
    }
    .btn-group .button {
    font-family: "Signika Negative", sans-serif;
    background-color: #96d6ed; /* Green */
    border: 2px solid black;
    color: black;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    float: left;
    }

    .btn-group .button:not(:last-child) {
    border-right: none; /* Prevent double borders */
    }

    .btn-group .button:hover {
    background-color: #A5E4FB;
    }
    #done {
    font-family: "Signika Negative", sans-serif;
    font-size: large;
    border: 2px solid black;
    border-radius: 5px;
    background-color: #e3aba1;
    margin-top: 50px;
    }
    #done:hover {
        background-color: #FEDCCE;
    }
</style>
</head>

<body>
    <h2>Select the timeslot(s) which you think you&nbsp;</h2>
    <h2> are the most productive at:</h2>
    <div class="btn-group">
        <button id="num1" class="button" onclick="time(1)"></button>
        <button id="num2" class="button" onclick="time(2)"></button>
        <button id="num3" class="button" onclick="time(3)"></button>
        <button id="num4" class="button" onclick="time(4)"></button>
      </div>
      <button id="done" onclick="nextPage()">Let's go to input our routine tasks!</button>
   
    <script>
        var check = 0;
    function time(num){
    if (num === 1) {
      document.getElementById("num1").style.backgroundColor="white";
      document.getElementById("num2").style.backgroundColor="#96d6ed";
      document.getElementById("num3").style.backgroundColor="#96d6ed";
      document.getElementById("num4").style.backgroundColor="#96d6ed";
    } else if (num === 2) {
      document.getElementById("num1").style.backgroundColor="#96d6ed";
      document.getElementById("num2").style.backgroundColor="white";
      document.getElementById("num3").style.backgroundColor="#96d6ed";
      document.getElementById("num4").style.backgroundColor="#96d6ed";
    } else if (num=== 3) {
      document.getElementById("num1").style.backgroundColor="#96d6ed";
      document.getElementById("num2").style.backgroundColor="#96d6ed";
      document.getElementById("num3").style.backgroundColor="white";
      document.getElementById("num4").style.backgroundColor="#96d6ed";
    } else if (num=== 4) {
      document.getElementById("num1").style.backgroundColor="#96d6ed";
      document.getElementById("num2").style.backgroundColor="#96d6ed";
      document.getElementById("num3").style.backgroundColor="#96d6ed";
      document.getElementById("num4").style.backgroundColor="white";
    } else {
      document.getElementById("num1").style.backgroundColor="#96d6ed";
      document.getElementById("num2").style.backgroundColor="#96d6ed";
      document.getElementById("num3").style.backgroundColor="#96d6ed";
      document.getElementById("num4").style.backgroundColor="#96d6ed";
    }
    check = num;
}


    function nextPage() {
        if (check === 0) {
            window.alert("Please select your estimated most productive time first!")
        } else {
            window.location.href = "http://127.0.0.1:5501/main_schedule.html"; //change to productivity page
        }
    }
    
  

    /*importing array from I forgot where... to create buttons. UNCOMMENT WHEN WE GET THE ARRAY*/ 
    // function nameButtons(){
    //   var time = [obj1, obj2, obj3, obj4];
    //   var btn1 = document.getElementById("num1");
    //   var btn2 = document.getElementById("num2");
    //   var btn3 = document.getElementById("num3");
    //   var btn4 = document.getElementById("num4");
    //   btn1.innerHTML = obj1.startHour() + ":" + obj1.startMinute() + "-" + obj1.endHour() + ":" + obj1.endMinute();
    //   btn2.innerHTML = obj2.startHour() + ":" + obj2.startMinute() + "-" + obj2.endHour() + ":" + obj2.endMinute();
    //   btn3.innerHTML = obj3.startHour() + ":" + obj3.startMinute() + "-" + obj3.endHour() + ":" + obj3.endMinute();
    //   btn4.innerHTML = obj4.startHour() + ":" + obj4.startMinute() + "-" + obj4.endHour() + ":" + obj4.endMinute();
    // }

    </script>
</body>
</html>
<!DOCTYPE HTML>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<!--Importing Firebase and Cloud Firestore libraries-->
<script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-firestore.js"></script>
<link href="https://fonts.googleapis.com/css2?family=Signika+Negative:wght@600&display=swap" rel="stylesheet">
<style>
    body{
    font-family: "Signika Negative", sans-serif;
    background-color: #f6f7f1;
    color: #1e5353;
    text-align: left;
    }
    #cat{
    font-family: "Signika Negative", sans-serif;
    font-size: 20px;
    margin-bottom: 20px;
}
    /*Code for category buttons, can try to shorten if possible!*/
#work {
  font-family: "Signika Negative", sans-serif;
  margin-left: 30px;
  background-color: #FDFD96;
  font-weight: bold;
  font-size: medium;
  padding: 8px;
  border-radius: 5px; /*make button rounded*/
  border-width: 2px;
  border-color: black;
}
#exercise {
  font-family: "Signika Negative", sans-serif;
  margin-left: 30px;
  background-color: #FDFD96;
  font-weight: bold;
  font-size: medium;
  padding: 8px;
  border-radius: 5px; /*make button rounded*/
  border-width: 2px;
  border-color: black;
}
#misc {
  font-family: "Signika Negative", sans-serif;
  margin-left: 30px;
  background-color: #FDFD96;
  font-weight: bold;
  font-size: medium;
  padding: 8px;
  border-radius: 5px; /*make button rounded*/
  border-width: 2px;
  border-color: black;
}
#work:hover {
  background-color: #ffffed;
  transition-duration: 0.3s;
}
#exercise:hover {
  background-color: #ffffed;
  transition-duration: 0.3s;
}
#misc:hover {
  background-color: #ffffed;
  transition-duration: 0.3s;
} 
#newName{
  background-color: #96d6ed;
  border-radius: 5px;
  border: 2px solid black;
  width: 500px;
  height: 25px;
  /* margin-left: 80px; */
}  

#taskName{
    font-family: "Signika Negative", sans-serif;
    font-size: 20px;
    margin-top: 30px;
    margin-bottom: 20px;
}
#btn{
    font-family: "Signika Negative", sans-serif;
    font-size: large;
    background-color: #e3aba1;
    height: 30px;
    width: 150px;
    text-align: center;
    border: black;
    border: 2px solid black;
    border-radius: 5px;
    margin-left: 20px;
}
#btn:hover{
    background-color: #FEDCCE;
    cursor: pointer;
}
  
</style>
<title>Edit</title>
</head>

<body>
    <h2>Edit my task</h2>
    <div id="cat"></div>
    <form class="btn-group-category">
        <input type="button" id="work" onclick="catFunction(0)" value="Work"></button>
        <input type="button" id="exercise" onclick="catFunction(1)" value="Exercise"></button>
        <input type="button" id="misc" onclick="catFunction(2)" value="Miscellaneous"></button>
    </form>
    <div id="taskName"></div>
    <input type="text" id="newName">
    <input type="button"  id="btn" value="Done!" onclick="closeMe()">


   <script>
       //after extracting taskname from the selection
    //    document.getElementById("taskName").innerHTML = window.taskName
    document.getElementById("cat").innerHTML = "Category:"
    document.getElementById("taskName").innerHTML = "Task Name:"
    function catFunction(button_switch){
    if (button_switch === 0) {
      document.getElementById("work").style.backgroundColor="white";
      document.getElementById("exercise").style.backgroundColor="#FDFD96";
      document.getElementById("misc").style.backgroundColor="#FDFD96";
    } else if (button_switch === 1) {
      document.getElementById("work").style.backgroundColor="#FDFD96";
      document.getElementById("exercise").style.backgroundColor="white";
      document.getElementById("misc").style.backgroundColor="#FDFD96";
    } else if (button_switch === 2) {
      document.getElementById("work").style.backgroundColor="#FDFD96";
      document.getElementById("exercise").style.backgroundColor="#FDFD96";
      document.getElementById("misc").style.backgroundColor="white";
    } else {
      document.getElementById("work").style.backgroundColor="#FDFD96";
      document.getElementById("exercise").style.backgroundColor="#FDFD96";
      document.getElementById("misc").style.backgroundColor="#FDFD96";
    }
  }


    function closeMe() {
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

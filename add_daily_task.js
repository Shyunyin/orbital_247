/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */

function myFunction() {
  document.getElementById("followUpTask").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
if (!event.target.matches('.followUpBtn')) {
  var dropdowns = document.getElementsByClassName("followUp-content");
  var i;
  for (i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.classList.contains('show')) {
      openDropdown.classList.remove('show');
    }
  }
}
}

/*CSS purpose: For selection of buttons to only happen once*/
let catNum = 0;
function catFunction(button_switch){
if (button_switch === 0) {
  document.getElementById("work").style.backgroundColor="white";
  document.getElementById("exercise").style.backgroundColor="#e3aba1";
  document.getElementById("misc").style.backgroundColor="#e3aba1";
} else if (button_switch === 1) {
  document.getElementById("work").style.backgroundColor="#e3aba1";
  document.getElementById("exercise").style.backgroundColor="white";
  document.getElementById("misc").style.backgroundColor="#e3aba1";
} else if (button_switch === 2) {
  document.getElementById("work").style.backgroundColor="#e3aba1";
  document.getElementById("exercise").style.backgroundColor="#e3aba1";
  document.getElementById("misc").style.backgroundColor="white";
} else {
  document.getElementById("work").style.backgroundColor="#e3aba1";
  document.getElementById("exercise").style.backgroundColor="#e3aba1";
  document.getElementById("misc").style.backgroundColor="#e3aba1";
}
catNum = button_switch; //to cause category to follow the array number
}

/*Integrating with javascript. Adding to Non fixed Task and Fixed Task*/
var onceOnly = true; //For testing only
function check() {
// For testing only. The initialise function is just supposed to be called once upon registering a user
if (onceOnly) {
  onceOnly = false;
  Window.initialise(); //Strictly for testing purposes only
}
console.log("I enter the check() function");
//var cat = document.getElementsByName("select");
let time = document.getElementById("dateInput").value;
let year = parseInt(time.substr(0, 4));
let month = parseInt(time.substr(5, 7)) - 1;
let date = parseInt(time.substr(8, 10));

let start = document.getElementById("startTime").value;
let end = document.getElementById("endTime").value;

let startTime = new Time( //create new time object for start time in Window and individual mode objects
  parseInt(start.substr(0, 2)),
  parseInt(start.substr(3, 4))
);

let endTime = new Time( //create new time object for end time in Window and individual mode objects
  parseInt(end.substr(0, 2)),
  parseInt(end.substr(3, 4))
);

var Task = new FixedTask (
  document.getElementById("taskName").value,
  catNum, //category number
  year,
  month,
  date,
  //time.getFullYear(), //full year
  //time.getMonth(), //month from 0-11
  //time.getDate(),
  startTime,
  endTime
)
Task.scheduleTask();
}

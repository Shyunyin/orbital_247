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

function displayDuration(text) { /*This function works*/
  document.getElementById("counterOutput").innerHTML = text;
}

//TODO: Check if this is being used, remove otherwise
/*Integrating with javascript. Adding to Non fixed Task and Fixed Task*/
function check() {
  var cat = document.getElementsByName("select");
  var time = new Date();
  let start = document.getElementById("startTime").value
  let end = document.getElementById("endTime").value

  let startTime = new Time( //create new time object for start time in Window and individual mode objects
  parseInt(start.substr(0, 2)),
  parseInt(start.substr(3, 4))
  )

  let endTime = new Time( //create new time object for end time in Window and individual mode objects
  parseInt(end.substr(0, 2)),
  parseInt(end.substr(3, 4))
  )

  if (checkTime.checked) {
    var Task = new FixedTask (
      document.getElementById("taskName").value,
      catNum, //category number
      time.getFullYear(), //full year
      time.getMonth(), //month from 0-11
      time.getDate(),
      startTime,
      endTime
    )
    Task.scheduleTask();
  }
}
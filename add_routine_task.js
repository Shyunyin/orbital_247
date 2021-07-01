/*Array for category with the following index
 * 0: work, 1: exercise, 2: misc, 3: meal
 */
var category_num;

function catFunction(button_switch) {
  if (button_switch === 0) {
    document.querySelector("body div#categories li:last-child input#work").style.backgroundColor = "white";
    document.querySelector("body div#categories li:last-child input#exercise").style.backgroundColor = "#e3aba1";
    document.querySelector("body div#categories li:last-child input#misc").style.backgroundColor = "#e3aba1";
    document.querySelector("body div#categories li:last-child input#meal").style.backgroundColor = "#e3aba1";
  } else if (button_switch === 1) {
    document.querySelector("body div#categories li:last-child input#work").style.backgroundColor = "#e3aba1";
    document.querySelector("body div#categories li:last-child input#exercise").style.backgroundColor = "white";
    document.querySelector("body div#categories li:last-child input#misc").style.backgroundColor = "#e3aba1";
    document.querySelector("body div#categories li:last-child input#meal").style.backgroundColor = "#e3aba1";
  } else if (button_switch === 2) {
    document.querySelector("body div#categories li:last-child input#work").style.backgroundColor = "#e3aba1";
    document.querySelector("body div#categories li:last-child input#exercise").style.backgroundColor = "#e3aba1";
    document.querySelector("body div#categories li:last-child input#misc").style.backgroundColor = "white";
    document.querySelector("body div#categories li:last-child input#meal").style.backgroundColor = "#e3aba1";
  } else if (button_switch === 3) {
    document.querySelector("body div#categories li:last-child input#work").style.backgroundColor = "#e3aba1";
    document.querySelector("body div#categories li:last-child input#exercise").style.backgroundColor = "#e3aba1";
    document.querySelector("body div#categories li:last-child input#misc").style.backgroundColor = "#e3aba1";
    document.querySelector("body div#categories li:last-child input#meal").style.backgroundColor = "white";
  } else {
    document.querySelector("body div#categories li:last-child input#work").style.backgroundColor = "#e3aba1";
    document.querySelector("body div#categories li:last-child input#exercise").style.backgroundColor = "#e3aba1";
    document.querySelector("body div#categories li:last-child input#misc").style.backgroundColor = "#e3aba1";
    document.querySelector("body div#categories li:last-child input#meal").style.backgroundColor = "#e3aba1";
  }
  category_num = button_switch;
}


/*Linking to javascript objects as it is confirmed fixed task*/
// var now = new Date();

// let start = document.getElementById("startTime").value
// let end = document.getElementById("endTime").value

// let startTime = new Time( //create new time object for start time in Window and individual mode objects
//   parseInt(start.substr(0, 2)),
//   parseInt(start.substr(3, 4))
// )

// let endTime = new Time( //create new time object for end time in Window and individual mode objects
//   parseInt(end.substr(0, 2)),
//   parseInt(end.substr(3, 4))
// )

/* Linking to window class by creating routine task object
 * Year, month, date? 
 */
// let routineTask = new Window(
//   document.getElementById("taskName").innerText,
//   now.getFullYear,
//   now.getMonth,
//   now.getDate,
//   startTime,
//   endTime,
//   1
// );

/*Function to get the mode to create the object required and to link to the confirmed mode*/
function displayRadioValue() {
  var ele = document.getElementsByName("choose");

  for (let i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      var mode = ele[i].value;
    }
  }

  if (mode === "daily") {
    let saveTask = new DailyTask( //question: dont know if should save as same taskname "saveTask" throughout
      document.getElementById("taskName").innerText,
      category_num,
      startTime,
      endTime,
    )
    
  } else if (mode === "weekly") {
    let saveTask = new WeeklyTask(
      document.getElementById("taskName").innerText,
      category_num,
      startTime,
      endTime,
      parseInt(document.getElementById("weeklydropdown").value)
    )

  } else if (mode === "biweekly") {
    let saveTask = new BiweeklyTask(
      document.getElementById("taskName").innerText,
      category_num,
      startTime,
      endTime,
      parseInt(document.getElementById("biweeklydropdown").value),
      parseInt(document.getElementById("chooseWeeks").value)
    )

  } else { //mode === "monthly"   
    let saveTask = new MonthlyTask(
      document.getElementById("taskName").innerText,
      category_num,
      startTime,
      endTime,
      parseInt(document.getElementById("date").value)
    )
  }
  scheduleTask(); //to schedule the task
}

/*For the navigation of pages*/
function newWindow() {
  window.alert("Current routine task saved!");
  window.location.href = "http://127.0.0.1:5501/add_routine_task.html";
}

function mainSchedule() {
  window.alert("Let's input more details to set-up!");
  window.location.href = "http://127.0.0.1:5501/WakeUpTime/wakeup.html";
}

/*For instructions pop-up*/
// window.onload = function() {
//   window.alert("For a start, please input your routine tasks such as exercise times, meal times, daily, weekly, biweekly or monthly events!");
// }




class RoutineTask {
  /**
   * Constructor to create routine/recurring tasks
   * @param {String} taskName      Name of task
   * @param {Number} taskCategory  Category of task (0-3; To be chosen from category 
   *                               array below)
   * @param {Time} startTime       Time at which the task starts
   * @param {Time} endTime         Time at which the task ends
   * @param {Number} freq          Frequency of the recurring task
   */
  constructor(taskName, taskCategory, startTime, endTime, freq) {
      if (new.target === RoutineTask) {
          throw new Error('Abstract class "RoutineTask" cannot be instantiated directly.');
      }
      this.taskName = taskName
      this.taskCategory = RoutineTask.prototype.cats[taskCategory];
      this.startTime = startTime;
      this.endTime = endTime;
      this.freq = RoutineTask.prototype.freq[freq];
  }

  /**
   * Selecting the frequency of the task
   * @param {Number} index 0 - Daily, 1 - Weekly, 2 - Biweekly, 3 - Monthly 
   * @returns {String} Updates the frequence of the task accordingly
   */
  static freq(index) {
      if (index < 0 || index > 3) {
          throw new Error('Invalid index')
      } else {
          return RoutineTask.prototype.freq[index];
      }
  }
}

RoutineTask.prototype.freq = ['Daily', 'Weekly', 'Biweekly', 'Monthly'];

RoutineTask.prototype.cats = ['Work', 'Exercise', 'Miscellaneous', 'Meal Times'];

class DailyTask extends RoutineTask {
  /**
   * Constructor to create daily tasks
   * @param {String} taskName     Name of task
   * @param {Number} taskCategory Category of task (0-2; To be chosen from category 
   *                              array in RoutineTask class)
   * @param {Time} startTime      Time at which the task starts
   * @param {Time} endTime        Time at which the task ends
   */
  constructor(taskName, taskCategory, startTime, endTime) {
      super(taskName, taskCategory, startTime, endTime, 0);
  }
  
  /**
   * To add a daily task to the user's schedule
   */
  scheduleTask() { 
    var y, m, d;
      for (y = new Date().getFullYear(); y < new Date().getFullYear() + 100; y++) {
          for (m = 0; m < 12; m++) {
              for (d = 1; d <= Time.daysInMonth(m, y); d++) {
                  let newTask = new Window(this.taskName, y, m, d, this.startTime, this.endTime, 1, null, null);
                  if (newTask.duringSleep()) {
                      //TODO: window.alert("Do you really want to schedule tasks during your sleep time?"); Basically if yes, continue. If no, return.
                  }
                  if (!newTask.isPast()) {
                      newTask.insertWindow();
                  }
              }                
          }
      }
  }

  deleteTask() {
    var y, m, d;
      for (y = new Date().getFullYear(); y < new Date().getFullYear() + 100; y++) {
          for (m = 0; m < 12; m++) {
              for (d = 1; d <= Time.daysInMonth(m, y); d++) {
                  let newTask = new Window(this.taskName, y, m, d, this.startTime, this.endTime, 1, null, null);
                  if (!newTask.isPast()) {
                      newTask.removeWindow();
                  }
              }                
          }
      }
  }
}

class WeeklyTask extends RoutineTask {
  /**
   * Constructor to create weekly tasks
   * @param {String} taskName     Name of the task
   * @param {Number} taskCategory Category of task (0-2; To be chosen from category 
   *                              array in RoutineTask class)
   * @param {Time} startTime      Time at which the task starts
   * @param {Time} endTime        Time at which the task ends
   * @param {Number} day          The day of the week on which the task occurs 
   *                              (0-6, Sun-Sat)
   */
  constructor(taskName, taskCategory, startTime, endTime, day) {
      super(taskName, taskCategory, startTime, endTime, 1);
      this.day = day;
  }

  /**
   * Returns first date of a month at which the task takes place
   * @param {Number} year    The current year (Format: yyyy)
   * @param {Number} month    The current month (0-11, Jan-Dec)
   * @param {Number} day      The day of the week on which the task occurs 
   *                          (0-6, Sun-Sat)
   * @returns {Number}         The first date of a month at which the task takes place
   */
  static startingDate(year, month, day) {
      var i;
      for (i = 1; i < 8; i ++) {
          if (new Date(year, month, i).getDay() == day) {
              return i;
          }
      }
  }

  /**
   * To add a weekly task to the user's schedule
   */
  scheduleTask() { 
      var y, m, d;
      for (y = new Date().getFullYear(); y < new Date().getFullYear() + 100; y++) {
          for (m = 0; m < 12; m++) {
              for (d = WeeklyTask.startingDate(y, m, this.day); d <= Time.daysInMonth(m, y); d += 7) {
                  let newTask = new Window(this,taskName, y, m, d, this.startTime, this.endTime, 1, null, null);
                  if (newTask.duringSleep()) {
                      //TODO: window.alert("Do you really want to schedule tasks during your sleep time?"); Basically if yes, continue. If no, return.
                  }
                  // Only scheduling tasks for the present and the future
                  if (!newTime.isPast()) {
                      newTask.insertWindow();
                  }
              }                
          }
      }
  }

  deleteTask() {
      var y, m, d;
      for (y = new Date().getFullYear(); y < new Date().getFullYear() + 100; y++) {
          for (m = 0; m < 12; m++) {
              for (d = WeeklyTask.startingDate(y, m, this.day); d <= Time.daysInMonth(m, y); d += 7) {
                  let newTask = new Window(this,taskName, y, m, d, this.startTime, this.endTime, 1, null, null);
                  // Only deleting tasks from the present and the future
                  if (!newTime.isPast()) {
                      newTask.removeWindow();
                  }
              }                
          }
      }
  }

}

class BiweeklyTask extends RoutineTask {
  /**
   * Constructor to create biweekly tasks
   * @param {String} taskName     Name of task
   * @param {Number} taskCategory Category of task (0-2; To be chosen from category 
   *                              array in RoutineTask class)
   * @param {Time} startTime      Time at which the task starts
   * @param {Time} endTime        Time at which the task ends
   * @param {Number} day          The day of the week on which the task occurs 
   *                              (0-6, Sun-Sat)
   * @param {Number} startWeek    The week in which the task starts (0 - Current week, 1 - 
   *                              Next week)
   */
  constructor(taskName, taskCategory, startTime, endTime, day, startWeek) {
      super(taskName, taskCategory, startTime, endTime, 2);
      this.day = day;
      this.startWeek = startWeek; 
  }

  /**
   * Calculate the first date of the current month on which this task takes place based on last date it took place in the previous month
   * @param {Number} year             The current year (Format: yyyy)
   * @param {Number} month            The current month (0-11, Jan-Dec)
   * @param {Number} day              The day of the week on which the task occurs 
   *                                  (0-6, Sun-Sat)
   * @param {Number} previousDate     The date at which the task was last scheduled in the 
   *                                  previous month
   * @returns {Number}                The first date of the current month on which this task 
   *                                  takes place
   */
  static startingDate(year, month, day, previousDate) {
      var i;
      for (i = 1; i < 8; i ++) {
          if (new Date(year, month, i).getDay() == day) {
              break;
          }
      }
      if ((i - previousDate) < -17) {
          return i + 7;
      } else {
          return i;
      }
  }

  /**
   * Calculates the date on which this task is to be first scheduled
   * @returns {Number} The date that is 14 days before the actual date that this task is to be first 
   *          scheduled
   */
  previousDate() {
      let day = this.day
      let startWeek = this.start_week
      let currDay = new Date().getDay()
      let currDate = new Date().getDate()
      let currMonth = new Date().getMonth()
      let currYear = new Date().getYear()
      let actualStartDate = 0

      if (startWeek == 0 && day < currDay) {
          let daysPassed = currDay - day
          actualStartDate = currDate - daysPassed
      } else if (startWeek == 0) {
          let daysToWait = day - currDay
          actualStartDate = currDate + daysToWait
      } else {
          let daysToWait = 7 + (day - currDay)
          actualStartDate = currDate + daysToWait
      }

      while (actualStartDate > 0) {
          actualStartDate -= 14
      }
      if (currMonth == 0) {
          return RoutineTask.daysInMonth(12, currYear - 1) + actualStartDate
      } else {
          return RoutineTask.daysInMonth(currMonth - 1, currYear) + actualStartDate
      }
  }

  /**
   * To add a biweekly task to the user's schedule
   */
  scheduleTask() { 
    var y, m, d;
      let previousDate = this.previousDate();
      for (y = new Date().getFullYear(); y < new Date().getFullYear() + 100; y++) {
          for (m = 0; m < 12; m++) {
              for (d = BiweeklyTask.startingDate(y, m, this.day, previousDate); d <= Time.daysInMonth(m, y); d += 14) {
                  let newTask = new Window(this.taskName, y, m, d, this.startTime, this.endTime, 1, null, null);
                  if (newTask.duringSleep()) {
                      //TODO: window.alert("Do you really want to schedule tasks during your sleep time?"); Basically if yes, continue. If no, return.
                  }
                  // Only scheduling tasks for the present and the future
                  if (!newTask.isPast()) {
                      newTask.insertWindow();
                      previousDate = d
                  }
              }
          }                
      }
  }

  deleteTask() {
    var y, m, d;
      let previousDate = this.previousDate();
      for (y = new Date().getFullYear(); y < new Date().getFullYear() + 100; y++) {
          for (m = 0; m < 12; m++) {
              for (d = BiweeklyTask.startingDate(y, m, this.day, previousDate); d <= Time.daysInMonth(m, y); d += 14) {
                  let newTask = new Window(this.taskName, y, m, d, this.startTime, this.endTime, 1, null, null);
                  // Only deleting tasks from the present and the future
                  if (!newTask.isPast()) {
                      newTask.removeWindow();
                      previousDate = d
                  }
              }
          }                
      }
  }
}

class MonthlyTask extends RoutineTask {
  /**
   * Constructor to create monthly tasks
   * @param {String} taskName     Name of task
   * @param {Number} taskCategory Category of task (0-2; To be chosen from category 
   *                              array in RoutineTask class)
   * @param {Time} startTime      Time at which the task starts
   * @param {Time} endTime        Time at which the task ends
   * @param {Number} date         The date on which the task occurs 
   *                              (1-31)
   */
  constructor(taskName, taskCategory, startTime, endTime, date) {
      super(taskName, taskCategory, startTime, endTime, 3);
      this.date = date;
  }

  /**
   * To add a monthly task to the user's schedule
   */
  scheduleTask() {
    var y, m, d;
      for (y = new Date().getFullYear(); y < new Date().getFullYear() + 100; y++) {
          for (m = 0; m < 12; m++) {
              if (this.date <= Time.daysInMonth(m, y)) {
                  let newTask = new Window(this.taskName, y, m, d, this.startTime, this.endTime, 1, null, null);
                  if (newTask.duringSleep()) {
                      //TODO: window.alert("Do you really want to schedule tasks during your sleep time?"); Basically if yes, continue. If no, return.
                  }
                  if (!newTime.isPast()) {
                      newTask.insertWindow();
                  }
              }              
          }
      }
  }

  deleteTask() {
    var y, m, d;
      for (y = new Date().getFullYear(); y < new Date().getFullYear() + 100; y++) {
          for (m = 0; m < 12; m++) {
              if (this.date <= Time.daysInMonth(m, y)) {
                  let newTask = new Window(this.taskName, y, m, d, this.startTime, this.endTime, 1, null, null);
                  if (!newTime.isPast()) {
                      newTask.removeWindow();
                  }
              }              
          }
      }
  }
}



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
    var saveTask = new DailyTask( //question: dont know if should save as same taskname "saveTask" throughout
      document.getElementById("taskName").value,
      category_num,
      startTime,
      endTime,
    )
    
  } else if (mode === "weekly") {
    console.log("Weekly is triggered");
    var saveTask = new WeeklyTask(
      document.getElementById("taskName").value,
      category_num,
      startTime,
      endTime,
      parseInt(document.getElementById("weeklydropdown").value)
    )
    console.log(saveTask);
  } else if (mode === "biweekly") {
    var saveTask = new BiweeklyTask(
      document.getElementById("taskName").value,
      category_num,
      startTime,
      endTime,
      parseInt(document.getElementById("biweeklydropdown").value),
      parseInt(document.getElementById("chooseWeeks").value)
    )

  } else { //mode === "monthly"   
    var saveTask = new MonthlyTask(
      document.getElementById("taskName").value,
      category_num,
      startTime,
      endTime,
      parseInt(document.getElementById("date").value)
    )
  }
  saveTask.scheduleTask(); //to schedule the task
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

function showList(value, btn) {
  if (value=="weekly"){
    document.getElementById("weeklydropdown").style.display="block";
    document.getElementById("biweeklydropdown").style.display="none";
    document.getElementById("chooseWeeks").style.display="none";
    document.getElementById("date").style.display="none";
    // document.getElementsByClassName("instruction").style.display="none";
  } else if (value=="biweekly"){
    document.getElementById("weeklydropdown").style.display="none";
    document.getElementById("biweeklydropdown").style.display="block";
    document.getElementById("chooseWeeks").style.display="block";
    document.getElementById("date").style.display="none";
    // document.getElementsByClassName("instruction").style.display="none";
  } else if (value=="monthly"){
    document.getElementById("weeklydropdown").style.display="none";
    document.getElementById("biweeklydropdown").style.display="none";
    document.getElementById("chooseWeeks").style.display="none";
    document.getElementById("date").style.display="block";
    document.getElementById("instruction").style.display="inline-block";
    // document.getElementsByClassName("instruction").style.display="inline-block";
  }
}

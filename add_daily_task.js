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
  function catFunction(button_switch){
    if (button_switch === 1) {
      document.querySelector("body div#categories li:last-child input#work").style.backgroundColor="white";
      document.querySelector("body div#categories li:last-child input#exercise").style.backgroundColor="#e3aba1";
      document.querySelector("body div#categories li:last-child input#misc").style.backgroundColor="#e3aba1";
    } else if (button_switch === 2) {
      document.querySelector("body div#categories li:last-child input#work").style.backgroundColor="#e3aba1";
      document.querySelector("body div#categories li:last-child input#exercise").style.backgroundColor="white";
      document.querySelector("body div#categories li:last-child input#misc").style.backgroundColor="#e3aba1";
    } else if (button_switch === 3) {
      document.querySelector("body div#categories li:last-child input#work").style.backgroundColor="#e3aba1";
      document.querySelector("body div#categories li:last-child input#exercise").style.backgroundColor="#e3aba1";
      document.querySelector("body div#categories li:last-child input#misc").style.backgroundColor="white";
    } else {
      document.querySelector("body div#categories li:last-child input#work").style.backgroundColor="#e3aba1";
      document.querySelector("body div#categories li:last-child input#exercise").style.backgroundColor="#e3aba1";
      document.querySelector("body div#categories li:last-child input#misc").style.backgroundColor="#e3aba1";
    }
  }

/*CSS purpose: For selection of number of sessions to only 1*/
  function sessionsFunction(click_switch){
    if (click_switch === 1) {
      document.querySelector("body div#sessions li:last-child input#onesession").style.backgroundColor="white";
      document.querySelector("body div#sessions li:last-child input#twosessions").style.backgroundColor="#e3aba1";
      document.querySelector("body div#sessions li:last-child input#threesessions").style.backgroundColor="#e3aba1";
    } else if (click_switch === 2) {
      document.querySelector("body div#sessions li:last-child input#onesession").style.backgroundColor="#e3aba1";
      document.querySelector("body div#sessions li:last-child input#twosessions").style.backgroundColor="white";
      document.querySelector("body div#sessions li:last-child input#threesessions").style.backgroundColor="#e3aba1";
    } else if (click_switch === 3) {
      document.querySelector("body div#sessions li:last-child input#onesession").style.backgroundColor="#e3aba1";
      document.querySelector("body div#sessions li:last-child input#twosessions").style.backgroundColor="#e3aba1";
      document.querySelector("body div#sessions li:last-child input#threesessions").style.backgroundColor="white";
    } else {
      document.querySelector("body div#sessions li:last-child input#onesession").style.backgroundColor="#e3aba1";
      document.querySelector("body div#sessions li:last-child input#twosessions").style.backgroundColor="#e3aba1";
      document.querySelector("body div#sessions li:last-child input#threesessions").style.backgroundColor="#e3aba1";
    }
  }

  /*Calculation for number of hours min left -> Convert to MINUTES for calculation*/
  let totalRemaining = 720; /*Arbitrary value, must link to formular for breaks and stuff in algorithm [IN MINUTES]*/ 



  /*To calculate remaining hours and minute*/ 
  function calculationDuration(check) {
    if (check === true) { /*only do something if it is true*/
      let enterHour = document.querySelector("body form.durationOption input#hour"); /*Number of hours entered*/
      let enterMin = document.querySelector("body form.durationOption input#minute"); /*Number of minutes entered*/
      let totalToDeduct = enterMin + (enterHour*60); /*convert hour to minute*/
      let hoursLeft = Math.trunc((totalRemaining - totalToDeduct) / 60); /*Final number for hours*/ 
      let minutesLeft = (totalRemaining - totalToDeduct - (hoursLeft * 60)); /*Final number for minutes*/
  
      const newer = document.createElement("h3");
      newer.text = "newer";
      document.getElementsByClassName("counter").appendChild(newer).innerHTML = "Hour: " + hoursLeft + " " + "Minute: " + minutesLeft;
    }
  }

 


  function calculationTime() {

  }


/*For appending to the dropdownlist*/
// function appendDropDown {
//   let newVariable = document.getElementById("taskName").innerHTML; /*to get task name*/
//   let placeholder = document.createElement("option");
// }

var taskList = ["Cook dinner for family"]; /*global scope*/

/*Need to get value from php? To append tasks to taskList*/
// function addToList() { /*when done button or add another task button is pressed*/
//   let newVariable = document.getElementById("taskName").innerHTML; /*to get task name*/
//   taskList.push(newVariable); /*Add to array to be output as options*/
// }

document.getElementById("generate").onclick = function() {
  var taskList = ["Cook dinner for family", "blah"];
  var select = document.createElement("select"); /*creating the select element to create dropdown*/
  select.name = "tasks";
  select.id = "tasks";

  for (const task of taskList) /*for loop for every element in taskList*/
  {
      var op = document.createElement("option");
      /*appending to option to create the task*/
      op.value = task;
      op.text = task.charAt(0).toUpperCase() + task.slice(1); /*to capitalise first letter*/
      select.option.add(op).innerHTML;
  }
  /*creating a label for the dropdowns*/
  var label = document.createElement("label");
  label.innerHTML = "Follow up tasks";
  label.htmlFor = "tasks"; /*specifies which form the label is bound to*/

  document.getElementById("container").appendChild(label).appendChild(select);
}

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

  let numOfSessions = 1; /*To use as multiplier for the hours calculated*/

/*CSS purpose: For selection of number of sessions to only 1*/
  function sessionsFunction(click_switch){
    if (click_switch === 1) {
      document.querySelector("body input#onesession").style.backgroundColor="white";
      document.querySelector("body input#twosessions").style.backgroundColor="#e3aba1";
      document.querySelector("body input#threesessions").style.backgroundColor="#e3aba1";
      numOfSessions = 1;
    } else if (click_switch === 2) {
      document.querySelector("body input#onesession").style.backgroundColor="#e3aba1";
      document.querySelector("body input#twosessions").style.backgroundColor="white";
      document.querySelector("body input#threesessions").style.backgroundColor="#e3aba1";
      numOfSessions = 2;
    } else if (click_switch === 3) {
      document.querySelector("body input#onesession").style.backgroundColor="#e3aba1";
      document.querySelector("body input#twosessions").style.backgroundColor="#e3aba1";
      document.querySelector("body input#threesessions").style.backgroundColor="white";
      numOfSessions = 3;
    } else {
      document.querySelector("body input#onesession").style.backgroundColor="#e3aba1";
      document.querySelector("body input#twosessions").style.backgroundColor="#e3aba1";
      document.querySelector("body input#threesessions").style.backgroundColor="#e3aba1";
    }
  }

  /*Calculation for number of hours min left -> Convert to MINUTES for calculation*/
  let totalRemaining = 720; /*Arbitrary value, must link to formular for breaks and stuff in algorithm [IN MINUTES]*/ 



  /*To calculate remaining hours and minute*/ /*FUNCTION IS WORKING YAYYY*/
  function calculationDuration() {
      let enterHour = parseInt((document.getElementById("hour").value)*numOfSessions); /*Number of hours entered*/
      let enterMin = parseInt((document.getElementById("minute").value)*numOfSessions); /*Number of minutes entered*/
      let totalToDeduct = enterMin + (enterHour*60); /*convert hour to minute*/
      let hoursLeft = Math.trunc((totalRemaining - totalToDeduct) / 60); /*Final number for hours*/ 
      let minutesLeft = (totalRemaining - totalToDeduct - (hoursLeft * 60)); /*Final number for minutes*/
      const text = "Hour: " + hoursLeft + " " + "Minute: " + minutesLeft;
      return text;
  }



  const count = document.getElementById("counterOutput");
  document.getElementById("doneDurationBtn").addEventListener("click", (event) => {
    // count.innerText = calculationDuration;
    console.log(event);
  });

  


  function calculationTime() {

  }


/*Logic for only allowing either checkboxes to be checked*/
//if both false is okay, but if one of them is true then cannot
const timeBox = document.getElementById("timeTask")
const durationBox = document.getElementById("durationTask")

function onlyOne(num) {
  if (num === 1) {
    timeBox.setAttribute('checked', 'checked')
    durationBox.checked = false;
  } else if (num === 2) {
    durationBox.setAttribute('checked', 'checked')
    timeBox.checked = false;
  }
  }
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

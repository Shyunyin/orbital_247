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
  let totalRemaining = 8; /*Arbitrary value, must link to formular for breaks and stuff in algorithm [IN MINUTES]*/ 

  durationHour(hour) {
    return hour;
  }
  
  durationMinute(x) {
    return x;
  }

  /*To calculate remaining hours and minute*/ 
  function calculationDuration() {
    let enterHour = document.querySelector("body form.durationOption input#hour"); /*Number of hours entered*/
    let enterMin = document.querySelector("body form.durationOption input#minute");
    let totalToDeduct = enterMin + (enterHour*60); /*convert hour to minute*/
    let hoursLeft = document.querySelector("body div.counter element.numHours").innerHTML;
    let minutesLeft = document.querySelector("body div.counter element.numMinutes").innerHTML;
    hoursLeft = Math.trunc(totalToDeduct / 60);
    minutesLeft = totalToDeduct - (hoursLeft * 60);
    durationHour(hoursleft)
    durationMinute(minutesLeft)
  }

  function calculationTime() {

  }
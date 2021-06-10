function catFunction(button_switch){
    if (button_switch === 1) {
      document.querySelector("body div#categories li:last-child input#work").style.backgroundColor="white";
      document.querySelector("body div#categories li:last-child input#exercise").style.backgroundColor="#e3aba1";
      document.querySelector("body div#categories li:last-child input#misc").style.backgroundColor="#e3aba1";
      document.querySelector("body div#categories li:last-child input#meal").style.backgroundColor="#e3aba1";
    } else if (button_switch === 2) {
      document.querySelector("body div#categories li:last-child input#work").style.backgroundColor="#e3aba1";
      document.querySelector("body div#categories li:last-child input#exercise").style.backgroundColor="white";
      document.querySelector("body div#categories li:last-child input#misc").style.backgroundColor="#e3aba1";
      document.querySelector("body div#categories li:last-child input#meal").style.backgroundColor="#e3aba1";
    } else if (button_switch === 3) {
      document.querySelector("body div#categories li:last-child input#work").style.backgroundColor="#e3aba1";
      document.querySelector("body div#categories li:last-child input#exercise").style.backgroundColor="#e3aba1";
      document.querySelector("body div#categories li:last-child input#misc").style.backgroundColor="white";
      document.querySelector("body div#categories li:last-child input#meal").style.backgroundColor="#e3aba1";
    } else if (button_switch === 4) {
        document.querySelector("body div#categories li:last-child input#work").style.backgroundColor="#e3aba1";
        document.querySelector("body div#categories li:last-child input#exercise").style.backgroundColor="#e3aba1";
        document.querySelector("body div#categories li:last-child input#misc").style.backgroundColor="#e3aba1";
        document.querySelector("body div#categories li:last-child input#meal").style.backgroundColor="white";
      } else {
      document.querySelector("body div#categories li:last-child input#work").style.backgroundColor="#e3aba1";
      document.querySelector("body div#categories li:last-child input#exercise").style.backgroundColor="#e3aba1";
      document.querySelector("body div#categories li:last-child input#misc").style.backgroundColor="#e3aba1";
      document.querySelector("body div#categories li:last-child input#meal").style.backgroundColor="#e3aba1";
    }
  }

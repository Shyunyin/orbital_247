/*This file serves to link the html of wakeup.html and inputProductivity.html in order to get the class RoutineInfo*/

var ID = "";
function giveID(num) {
    if (num === 1) {
        ID = "num1";
    } else if (num === 2) {
        ID = "num2";
    } else if (num === 3) {
        ID = "num3";
    } else { //num === 4
        ID = "num4";
    }
}

function getClass() {
    let wakeup = document.getElementById("wakeupTime").value

    let wakeupTime = new Time( //create new time object for start time in Window and individual mode objects
      parseInt(wakeup.substr(0, 2)),
      parseInt(wakeup.substr(3, 4))
    )

    /*Adding event listeners to check which button is clicked to return ID*/
    document.getElementById("num1").addEventListener('click', giveID(1));
    document.getElementById("num2").addEventListener('click', giveID(2));
    document.getElementById("num3").addEventListener('click', giveID(3));
    document.getElementById("num4").addEventListener('click', giveID(4));

    let productive = document.getElementById(ID).value;
    let productiveTime = new Time (
        parseInt(wakeup.substr(0, 2)),
        parseInt(wakeup.substr(3, 2)) //number damn weird but should be correct cause i tried it out in the console
    )

    const settings = new RoutineInfo(
        wakeupTime,
        productiveTime
    );
}



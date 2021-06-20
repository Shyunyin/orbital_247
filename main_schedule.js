/*Get to other main webpages
 * To be changed if link changes
 */
function statistics() {
    window.location.href = "http://127.0.0.1:5501/statistics.html";
}
function routine() {
    window.location.href = "http://127.0.0.1:5501/routine.html";
}

let dayArray = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
function textDay(day) {
    for (let i = 0; i < dayArray.length; i++) {
        if (day === i) {
            return dayArray[i];
        }
    }
}

let monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function textMonth(month) {
    for (let i = 0; i < monthArray.length; i++) {
        if (month === i) {
            return monthArray[i];
        }
    }
}

window.onload  = function getHeading() {
    let today = new Date(); //creating object to use Date method
    let date = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
    let currentDate = document.getElementById("currentDate");
    currentDate.setAttribute("value", date);

    let time = today.getHours() + ":" + today.getMinutes();
    let currentTime = document.getElementById("currentTime");
    currentTime.setAttribute("value", time);

    let user = "Preshi & Shyun" //need to obtain from javascript login page to save their username!
    let welcome = "Welcome, " + user;
    let currentUser = document.getElementById("currentUser");
    currentUser.setAttribute("value", welcome);

    let day = textDay(today.getDay()) + ", " + today.getDate() + " " + textMonth(today.getMonth()) + "'s Schedule";
    let currentScehdule = document.getElementById("currentScehdule");
    currentSchedule.setAttribute("value", day);
}


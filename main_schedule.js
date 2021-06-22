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

/*For popup*/
function popup(mylink, windowname) {
    if (! window.focus)return true;
    var href;
    if (typeof(mylink) == "string") href=mylink;
    else href=mylink.href;
    window.open(href, windowname, 'width=400, height=200, scrollbars=yes');
    return false;
}


/*Must get input array of task names in the day, same as for add_daily_task page*/
tasks = ["test1blahblah", "test2yadeyadeyade", "test3ldkmglkf"]; //find a way to get the tasks
window.onload = function postit() {
    for (let i = 0; i < tasks.length; i++) {
        let append = document.createElement("input");
        append.type="text"
        append.readonly="readonly";
        append.classList.add("task");
        append.value=tasks[i]; //print out task
        append.style.fontFamily="'Signika Negative', sans-serif";
        append.style.fontSize="large";
        append.style.position="absolute";
        append.style.zIndex="2";
        append.style.color="white";
        append.style.backgroundColor="#1e5353";
        append.style.border="none";
        append.style.marginLeft="15px";
        append.style.height="20px";
        //calculation to ensure that tasks printed on top of each other
        let top = i*30;
        let topText = top + "px";
        append.style.marginTop=topText;
        let ele = document.getElementById("postit");
        ele.appendChild(append);
    }
}

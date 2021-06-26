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

/*Must get input array of task names in the day, same as for add_daily_task page*/
tasks = ["test1blahblah", "test2yadeyadeyade", "test3ldkmglkf"]; //find a way to get the tasks. [only one time tasks]

function doublehours(num) {
    if (num < 10) {
        num = "0" + num; //oooo can add string to number in javascript I didnt know that
    }
    return num;
}

function doubleminutes(num) {
    if (num < 10) {
        num = "0" + num;
    }
    return num;
}

/*Onload can only appear once!!!!!!*/
window.onload = function getHeading() {
    let today = new Date(); //creating object to use Date method
    let date = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
    let currentDate = document.getElementById("currentDate");
    currentDate.setAttribute("value", date);

    let time = doublehours(today.getHours()) + ":" + doubleminutes(today.getMinutes());
    let currentTime = document.getElementById("currentTime");
    currentTime.setAttribute("value", time);

    let user = "Preshi & Shyun" //need to obtain from javascript login page to save their username!
    let welcome = "Welcome, " + user;
    let currentUser = document.getElementById("currentUser");
    currentUser.setAttribute("value", welcome);

    let day = textDay(today.getDay()) + ", " + today.getDate() + " " + textMonth(today.getMonth()) + "'s Schedule";
    let currentSchedule = document.getElementById("currentSchedule");
    currentSchedule.setAttribute("value", day);

    /*For post-it stick tasks*/
    for (let i = 0; i < tasks.length; i++) {
        let append = document.createElement("input");
        append.type = "text";
        append.setAttribute("readonly", "readonly");
        append.setAttribute("onfocus", "this.blur()")
        append.classList.add("task");
        append.value = tasks[i]; //print out task
        append.style.fontFamily = "'Signika Negative', sans-serif";
        append.style.fontSize = "large";
        append.style.position = "absolute";
        append.style.zIndex = "2";
        append.style.color = "white";
        append.style.backgroundColor = "#1e5353";
        append.style.border = "none";
        append.style.marginLeft = "15px";
        append.style.height = "20px";
        //calculation to ensure that tasks printed on top of each other
        let top = i * 30;
        let topText = top + "px";
        append.style.marginTop = topText;
        let ele = document.getElementById("postit");
        ele.appendChild(append);
    }
}

/*For popup*/
function OpenPopupWindow() {
    var url = "http://127.0.0.1:5501/add_daily_task.html";
    let myRef = window.open(url, 'mywin', 'left=20, top=20, width=750, height=700, toolbar=1, resizable=0');
    myRef.focus();
}

/*When generate schedule button is pressed*/

/*PROBLEMATIC FUNCTIONNNN*/
/*printSchedule function is to create the html and css on the
 * window that will appear on the main schedule*/
function printSchedule(arr) {
    for (let i=0; i < arr.length; i++) {
        let block = document.getElementById("schedule");
        let division = document.createElement("div"); //creating the new division to contain item in schedule
        division.classList.add("division"); //classname of each item 
        division.style.borderColor = "black";
        //can continue adding css for division
        block.appendChild(division); //adding the new division with classname "division" to schedule
        /*Below will be what is appended to division: Time and taskname*/
        /*Time*/
        let time = document.createElement("input");
        time.classList.add("time"); //time with class name time
        time.setAttribute("readonly", "readonly"); //set to readonly
        time.value = arr[i].timeItem; //need to see how objects in arr are stored to extract the time *TO BE FILLED*
        time.style.fontFamily = "'Signika Negative', sans-serif";
        time.style.fontSize = "large";
        time.style.position = "absolute";
        time.style.zIndex = "3";
        //can continue adding css for the time
        division.appendChild(time); //adding the time part of the item
        /*TaskName*/
        let taskName = document.createElement("input");
        taskName.classList.add("taskName"); //class: taskName
        taskName.setAttribute("readonly", "readonly"); //set to readonly
        taskName.value = arr[i].taskName; //need to see how objects in arr are stored to extract the time *TO BE FILLED*
        taskName.style.fontFamily = "'Signika Negative', sans-serif";
        taskName.style.fontSize = "large";
        taskName.style.position = "absolute";
        taskName.style.zIndex = "3";
        taskName.style.marginTop = 20; //TO BE CHANGED IF NOT SUITABLE
        taskName.style.marginLeft = 30; //TO BE CHANGED IF NOT SUITABLE
        //can continue adding css for taskname
        division.appendChild(taskName);
    } 
} 

// /*actions(): function that creates icons onclick of class name "division"
//  * when any division/item is clicked, the 4 icons will appear. For the following
//  * Fixed Routine Task: none
//  * Fixed (one-time) Task: 2.Reschedule 3.Edit 4.Delete
//  * Non-fixed (one-time) Task: 1.Play 2.Reschedule 3.Edit 4.Delete
//  *  QUESTION: WILL THIS BE FOR ALL THE ITEMS?
//  */ 
document.getElementsByClassName("division").onclick = function actions() {
}

//just to stand in for the window
class storeTask {
    constructor(
        timeItem,
        taskName
    ) {
        this.timeItem = timeItem;
        this.taskName = taskName;
    }
}

const task1 = new storeTask(
    "22:30", //cannot just key as a number 22:30
    "item1"
)

const task2 = new storeTask(
    "12:30",
    task2
)

const task3 = new storeTask(
    "20:59",
    task3
)

/*clearPostit function is to remove the tasks printed on the post it 
 * after the schedule has been generated*/ /*FKING WORKS ON CONSOLE BUT NOT HERE ARGHHHHHHH*/
document.getElementById("generateSchedule").onclick() = function clearPostit() {
    // var ele = document.getElementById("postit");
    var child = Array.from(document.getElementsByClassName("task"));
    for (let i = 0; i < child.length; i++) {
        child[i].remove();
    }
}

// /*algorithm: where generation of schedule for algorithm is ran*/
function algorithm() {
    //link to algorithm which will output an array of the order of tasks which contains an array of objects that contains taskname and time
    //algorithm carried out and array is created
    var arrayOfTasks = [task1, task2, task3]; //man-made 
    printSchedule(arrayOfTasks); //arrayOfTasks will contain the list of task objects in order
    // clearPostit(); //to clear the list of items in post it
}

// document.getElementById("generateSchedule").addEventListener("click", algorithm);
// document.getElementById("generateSchedule").addEventListener("click", clearPostit);


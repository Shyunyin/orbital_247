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
tasks = ["Test1", "Test2", "Test3"]; //find a way to get the tasks. [only one time tasks]

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

function checkTime(i) {
    if(i<10){
        i = "0" + i;
    }
    return i;
} 

/*For time to be dynamic*/
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);

    document.getElementById("currentTime").innerHTML = h + ":" + m + ":" + s;
    t = setTimeout(function() {
        startTime()
    }, 500);
}

/*Onload can only appear once!!!!!!*/
window.onload = function getHeading() {
    let today = new Date(); //creating object to use Date method
    let date = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
    let currentDate = document.getElementById("currentDate");
    currentDate.setAttribute("value", date);

    startTime();

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
        append.setAttribute("type", "button");
        append.setAttribute("value", tasks[i]);
        append.setAttribute("readonly", "readonly");
        append.setAttribute("onclick", "redirect()")
        append.classList.add("task");
        append.style.fontFamily = "'Signika Negative', sans-serif";
        append.style.fontSize = "large";
        append.style.position = "absolute";
        append.style.zIndex = "2";
        append.style.color = "white";
        append.style.backgroundColor = "#1e5353";
        append.style.border = "none";
        append.style.marginLeft = "15px";
        append.style.height = "20px";
        append.style.cursor="pointer";
        //calculation to ensure that tasks printed on top of each other
        let top = i * 30;
        let topText = top + "px";
        append.style.marginTop = topText;
        let ele = document.getElementById("postitContent");
        ele.appendChild(append);
    }
}

/*For popup*/
function OpenPopupWindow() {
    var url = "http://127.0.0.1:5501/add_daily_task.html";
    let myRef = window.open(url, 'mywin', 'left=20, top=20, width=750, height=700, toolbar=1, resizable=0');
    myRef.focus();
}

/*For when the 4 icons are clicked*/
/*start button*/
function clickPlay() {
    var url = "http://127.0.0.1:5501/countdownTimer.html";
    let myRef = window.open(url, 'mywin', 'left=20, top=20, width=750, height=700, toolbar=1, resizable=0');
    myRef.focus();
}
/*reschedule button*/
function clickReschedule() {
    var url = "http://127.0.0.1:5501/rescheduleIcon.html";
    let myRef = window.open(url, 'mywin', 'left=20, top=20, width=700, height=300, toolbar=1, resizable=0');
    myRef.focus();
}
/*edit button*/
function clickEdit() {
    var url = "http://127.0.0.1:5501/EditIcon.html";
    let myRef = window.open(url, 'mywin', 'left=20, top=20, width=700, height=300, toolbar=1, resizable=0');
    myRef.focus();
}
/*delete button*/
function clickDelete() {
    var x = confirm("Are you sure you want to delete this task?");
    if (x) 
        return true;
    else 
        return false; //to link to javascript when deleting tasks can check for this boolean function
}

/*When generate schedule button is pressed*/
/*printSchedule function is to create the html and css on the
 * window that will appear on the main schedule
 * MUST SPLIT INTO FIXED AND NON-FIXED TASK CREATION: BOTH FIXED AND NON-FIXED BUTTON
 */
// function printSchedule(arr) {
//     for (let i=0; i < arr.length; i++) {
//         let block = document.getElementById("schedule");
//         let division = document.createElement("div"); //creating the new division to contain item in schedule
//         division.classList.add("container"); //classname of each item 
//         division.style.borderColor = "black";
//         //can continue adding css for division
//         block.appendChild(division); //adding the new division with classname "division" to schedule
//         /*Below will be what is appended to division: Time and itemName*/
//         /*Time*/
//         let itemTime = document.createElement("input");
//         itemTime.classList.add("time"); //time with class name time
//         itemTime.setAttribute("readonly", "readonly"); //set to readonly
//         itemTime.value = arr[i].timeItem; //need to see how objects in arr are stored to extract the time *TO BE FILLED*
//         itemTime.style.fontFamily = "'Signika Negative', sans-serif";
//         itemTime.style.fontSize = "large";
//         itemTime.style.position = "absolute";
//         itemTime.style.zIndex = "3";
//         //can continue adding css for the time
//         division.appendChild(time); //adding the time part of the item
//         /*itemName*/
//         let itemName = document.createElement("input");
//         itemName.classList.add("itemName"); //class: itemName
//         itemName.setAttribute("readonly", "readonly"); //set to readonly
//         itemName.value = arr[i].itemName; //need to see how objects in arr are stored to extract the time *TO BE FILLED*
//         itemName.style.fontFamily = "'Signika Negative', sans-serif";
//         itemName.style.fontSize = "large";
//         itemName.style.position = "absolute";
//         itemName.style.zIndex = "3";
//         itemName.style.marginTop = 20; //TO BE CHANGED IF NOT SUITABLE
//         itemName.style.marginLeft = 30; //TO BE CHANGED IF NOT SUITABLE
//         //can continue adding css for itemName
//         division.appendChild(itemName);
//     } 
// } 

// /*actions(): function that creates icons onclick of class name "division"
//  * when any division/item is clicked, th icons will appear. For the following
//  * Fixed Routine Task: none MAKE SURE THAT IT IS A CONTAINER
//  * Fixed (one-time) Task: 2.Reschedule 3.Edit 4.Delete
//  * Non-fixed (one-time) Task: 1.Play 2.Reschedule 3.Edit 4.Delete
//  *  QUESTION: WILL THIS BE FOR ALL THE ITEMS?
//  */ 


  /*For detecting click outside of specified elements*/
//   var specifiedElement = document.getElementById("schedule");
//   document.addEventListener('click', function(event) {
//       var isClickInside = specifiedElement.contains(event.target);

//       if (!isClickInside) {
//           //if click was outside the specifiedELement
//           var currentNode = document.getElementById("iconActions");
//           var newNode = document.createElement("div");
//           newNode.id = "iconActions";
//           newNode.innerHTML="";
//           //Replacing current iconsActions node w new iconActions node
//           currentNode.replaceWith(newNode);
//       }
//   }
//   document.onclick = function(event){
//     var hasParent = false;
//     var fixed = document.getElementById("fixed").onclick = tempFixed();
//     var nonFixed = document.getElementById("nonFixed").onclick = tempNonFixed();
//       for(var node = event.target; node != document.body; node = node.parentNode)
//       {
//         if(node.id == 'schedule'){
//           hasParent = true;
//           break;
//         }
//       }
//     if(hasParent) {
//         alert('inside');
//         fixed = tempFixed();
//         nonFixed = tempNonFixed();
//     }
//     else
//       alert('outside');
//       var currentNode = document.getElementById("iconActions");
//       var newNode = document.createElement("div");
//       newNode.id = "iconActions";
//       newNode.innerHTML="";
//       //Replacing current iconsActions node w new iconActions node
//       currentNode.replaceWith(newNode);
//   } 

/*To add fixed task select icons*/
function tempFixed() { //only reschedule, edit and delete
    var currentNode = document.getElementById("iconActions");
    var newNode = document.createElement("div");
    newNode.id = "iconActions";
    newNode.innerHTML = 
    '<button class="btn" onclick="clickPlay()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-play-circle fa-2x" aria-hidden="true"></i></button>' +
    '<button class="btn" onclick="clickReschedule()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-calendar fa-2x" aria-hidden="true"></i></button>' +
    '<button class="btn" onclick="clickEdit()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i></button>' +
    '<button class="btn" onclick="clickDelete()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-trash-o fa-2x" aria-hidden="true"></i></button>' ;
    //Replacing current iconsActions node w new iconActions node
    currentNode.replaceWith(newNode);
}

/*To add non-fixed task select icons*/
function tempNonFixed() { //all 4 actions
    var currentNode = document.getElementById("iconActions");
    var newNode = document.createElement("div");
    //Add ID and content
    newNode.id = "iconActions";
    newNode.innerHTML = 
    '<button class="btn" onclick="clickPlay()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-play-circle fa-2x" aria-hidden="true"></i></button>' +
    '<button class="btn" onclick="clickReschedule()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-calendar fa-2x" aria-hidden="true"></i></button>' +
    '<button class="btn" onclick="clickEdit()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i></button>' +
    '<button class="btn" onclick="clickDelete()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-trash-o fa-2x" aria-hidden="true"></i></button>' ;
    //Replacing current iconsActions node w new iconActions node
    currentNode.replaceWith(newNode);
}

/*To add postit task select icons*/
function postitActions(taskName) { //only edit and delete
    //parameter taskName is to reference to which task got clicked in the javascript
    var currentNode = document.getElementById("iconActions");
    var newNode = document.createElement("div");
    //Add ID and content
    newNode.id = "iconActions";
    newNode.innerHTML = 
    '<button class="btn" onclick="clickEdit()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i></button>' +
    '<button class="btn" onclick="clickDelete()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-trash-o fa-2x" aria-hidden="true"></i></button>' ;
    //Replacing current iconsActions node w new iconActions node
    currentNode.replaceWith(newNode);
}

/*clearPostit function is to remove the tasks printed on the post it 
 * after the schedule has been generated*/ /*FKING WORKS ON CONSOLE BUT NOT HERE ARGHHHHHHH*/
 function clearPostit() {
    var currentNode = document.getElementById("postitContent");
    var newNode = document.createElement("div");
    newNode.id = "postitContent";
    newNode.innerHTML = "";
    currentNode.replaceWith(newNode);
}

/*UNCOMMENT WHEN LINKING TO JAVASCRIPT*/
// document.getElementsByClassName("division").onclick = function actions() {
//     //QUESTION HOW DO I CHECK IF IT IS A FIXED ONE TIME TASK OR A NON-FIXED ONE TIME TASK: ooo is it window type
//     //must double check all the inputs cause its not very accurate
   
//     if (task.type == 1) { //fixed task
//         createReschedule();
//         createEdit();
//         createDelete();
//     } else if (task.type == 2) {
//         createPlay();
//         createReschedule();
//         createEdit();
//         createDelete();
//     }
// }

//just to stand in for the window
// class storeTask {
//     constructor(
//         timeItem,
//         taskName
//     ) {
//         this.timeItem = timeItem;
//         this.taskName = taskName;
//     }
// }

// const task1 = new storeTask(
//     "22:30", //cannot just key as a number 22:30
//     "item1"
// )

// const task2 = new storeTask(
//     "12:30",
//     "item2"
// )

// const task3 = new storeTask(
//     "20:59",
//     "item3"
// )



// /*algorithm: where generation of schedule for algorithm is ran*/
// function algorithm() {
//     //link to algorithm which will output an array of the order of tasks which contains an array of objects that contains taskname and time
//     //algorithm carried out and array is created
//     var arrayOfTasks = [task1, task2, task3]; //man-made 
//     printSchedule(arrayOfTasks); //arrayOfTasks will contain the list of task objects in order
//     // clearPostit(); //to clear the list of items in post it

// document.getElementById("generateSchedule").addEventListener("click", algorithm);
// document.getElementById("generateSchedule").addEventListener("click", clearPostit);

/*Initialising firebase*/
var firebaseConfig = {
    apiKey: "AIzaSyBtFGTnYwEU5OgIa4SpKvMaGAa1ofEjs3U",
    authDomain: "orbital-24-7.firebaseapp.com",
    projectId: "orbital-24-7",
    storageBucket: "orbital-24-7.appspot.com",
    messagingSenderId: "459091456870",
    appId: "1:459091456870:web:21134477e94d50e25ecea7",
    measurementId: "G-WQMCMBMFCK"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var firestore = firebase.firestore();

/*--------------------------Appendix---------------------------------*/
/*create functions are for the icons*/
// function createPlay() {
//     let ele = document.getElementById("iconActions");
//     let btn1 = document.createElement("button");
//     btn1.setAttribute("class", "btn"); //id = "btn1"
//     btn1.setAttribute("onclick", "clickPlay()");
//     btn1.style.position="relative";
//     btn1.style.zIndex="5";
//     btn1.style.backgroundColor="#ECEDEA";
//     btn1.style.borderRadius="5px";
//     btn1.onmouseover = function() {
//         this.style.backgroundColor = "#C4C4C4";
//     }
//     btn1.onmouseout = function() {
//         this.style.backgroundColor = "#ECEDEA";
//     }
//     let play = document.createElement("i");
//     play.setAttribute("class", "fa fa-play-circle fa-2x");
//     play.setAttribute("aria-hidden", "true");
//     btn1.appendChild(play);
//     ele.appendChild(btn1);
// }

// function createReschedule() {
//     let ele = document.getElementById("iconActions");
//     let btn2 = document.createElement("button");
//     btn2.setAttribute("class", "btn"); //id = "btn2"
//     btn2.style.position="relative";
//     btn2.style.zIndex="5";
//     btn2.style.backgroundColor="#ECEDEA";
//     btn2.style.borderRadius="5px";
//     btn2.style.marginLeft="5px";
//     btn2.onmouseover = function() {
//         this.style.backgroundColor = "#C4C4C4";
//     }
//     btn2.onmouseout = function() {
//         this.style.backgroundColor = "#ECEDEA";
//     }
//     let reschedule = document.createElement("i");
//     reschedule.setAttribute("class","fa fa-calendar fa-2x");
//     reschedule.setAttribute("aria-hidden", "true");
//     btn2.appendChild(reschedule);
//     ele.appendChild(btn2);
// }

// function createEdit() {
//     let ele = document.getElementById("iconActions");
//     let btn3 = document.createElement("button");
//     btn3.setAttribute("class", "btn"); //id = "btn3"
//     btn3.style.position="relative";
//     btn3.style.zIndex="5";
//     btn3.style.backgroundColor="#ECEDEA";
//     btn3.style.borderRadius="5px";
//     btn3.style.marginLeft="5px";
//     btn3.onmouseover = function() {
//         this.style.backgroundColor = "#C4C4C4";
//     }
//     btn3.onmouseout = function() {
//         this.style.backgroundColor = "#ECEDEA";
//     }
//     let edit = document.createElement("i");
//     edit.setAttribute("class", "fa fa-pencil-square-o fa-2x");
//     edit.setAttribute("aria-hidden", "true");
//     btn3.appendChild(edit);
//     ele.appendChild(btn3);
// }

// function createDelete() {
//     let ele = document.getElementById("iconActions");
//     let btn4 = document.createElement("button");
//     btn4.setAttribute("class", "btn"); //id = "btn4"
//     btn4.style.position="relative";
//     btn4.style.zIndex="5";
//     btn4.style.backgroundColor="#ECEDEA";
//     btn4.style.borderRadius="5px";
//     btn4.style.marginLeft="5px";
//     btn4.onmouseover = function() {
//         this.style.backgroundColor = "#C4C4C4";
//     }
//     btn4.onmouseout = function() {
//         this.style.backgroundColor = "#ECEDEA";
//     }
//     let deletetask = document.createElement("i");
//     deletetask.setAttribute("class","fa fa-trash-o fa-2x");
//     deletetask.setAttribute("aria-hidden", "true");
//     btn4.appendChild(deletetask);
//     ele.appendChild(btn4);
// }

/*To remove the current icons under actions*/
// function removeCurrentIcons() {
//     var elem = document.getElementById("iconActions");
//     elem.remove();
//     // var ele = document.createElement("div");
//     // ele.setAttribute("id", "iconActions");
//     // var main = document.getElementById("actions");
//     // main.appendChild(ele);
// }

// function addBackDivision() {
//     var ele = document.createElement("div");
//     ele.setAttribute("id", "iconActions");
//     var main = document.getElementById("actions");
//     main.appendChild(ele);
// }
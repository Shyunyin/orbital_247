/*Get to other main webpages
 * To be changed if link changes
 */
function schedule() {
    window.location.href = "./main_schedule.php";
}
function statistics() {
    window.location.href = "./statistics.php";
}

/*edit button for wake up time*/
function clickEditWakeup() {
    var url = "http://localhost/orbital_247/wakeup.php"; //needs to be changed
    let myRef = window.open(url, 'mywin', 'left=20, top=20, width=700, height=700, toolbar=1, resizable=0');
    myRef.focus();
}

/*edit button for productive time*/
function clickEditProductive() {
    var url = "http://localhost/orbital_247/inputProductivity.php"; //needs to be changed
    let myRef = window.open(url, 'mywin', 'left=20, top=20, width=1900, height=700, toolbar=1, resizable=0');
    myRef.focus();
}

function OpenPopupWindow() {   
    var url = "http://localhost/orbital_247/add_routine_task.php"; 
    let myRef = window.open(url, 'mywin', 'left=20, top=20, width=770, height=700, toolbar=1, resizable=0');
    myRef.focus();
}

/*To add fixed task select icons*/
// function tempFixed() { 
//     var currentNode = document.getElementById("iconActions");
//     var newNode = document.createElement("div");
//     newNode.id = "iconActions";
//     newNode.innerHTML = 
//     '<button class="btn" onclick="clickEdit()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i></button>' +
//     '<button class="btn" onclick="clickDelete()" style="background-color=#ECEDEA;border-radius=5px;border-width=2px;"><i class="fa fa-trash-o fa-2x" aria-hidden="true"></i></button>' ;
//     //Replacing current iconsActions node w new iconActions node
//     currentNode.replaceWith(newNode);
// }


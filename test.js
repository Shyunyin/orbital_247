function createPlay() {
    let ele = document.getElementById("actions");
    let btn = document.createElement("button");
    btn.classList.add("btn");
    let play = document.createElement("i");
    play.setAttribute("class", "fa fa-play-circle fa-2x");
    play.setAttribute("aria-hidden", "true");
    btn.appendChild(play);
    ele.appendChild(btn);
}
function createReschedule() {
    let ele = document.getElementById("actions");
    let btn = document.createElement("button");
    btn.classList.add("btn");
    let reschedule = document.createElement("i");
    reschedule.setAttribute("class","fa fa-calendar fa-2x");
    reschedule.setAttribute("aria-hidden", "true");
    btn.appendChild(reschedule);
    ele.appendChild(btn);
}
function createEdit() {
    let ele = document.getElementById("actions");
    let btn = document.createElement("button");
    btn.classList.add("btn");
    let edit = document.createElement("i");
    edit.setAttribute("class","fa fa-pencil-square-o fa-2x");
    edit.setAttribute("aria-hidden", "true");
    btn.appendChild(edit);
    ele.appendChild(btn);
}
function createDelete() {
    let ele = document.getElementById("actions");
    let btn = document.createElement("button");
    btn.classList.add("btn");
    let deletetask = document.createElement("i");
    deletetask.setAttribute("class","fa fa-trash-o fa-2x");
    deletetask.setAttribute("aria-hidden", "true");
    btn.appendChild(deletetask);
    ele.appendChild(btn);
}

window.onload = function load() {
    createPlay();
    createReschedule();
    createEdit();
    createDelete();
}

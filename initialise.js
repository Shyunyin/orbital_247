
// function initialise() {
//     console.log("Initialise funtion is called");
//     let currTime = new Date();
//     // For testing purposes
//     let startTime = new Time(8, 0);
//     let endTime = new Time(0, 0);
//     //let startTime = new Time(RoutineInfo.getWakeUpTimeHours(), RoutineInfo.getWakeUpTimeMins());
//     //let endTime = new Time(RoutineInfo.getSleepTime.getHours(), RoutineInfo.getSleepTime.getMins());
//     // Creating window arrays for the first week
//     for (let i = 0; i < 7; i++) {
//         Window.emptyCollection.push([]);
//         Window.occupiedCollection.push([]);
//         console.log("i have pushed");
//         Window.nonFixedCollection.push([[], []]); //0 is priority array, 1 is the normal array

//         if (startTime.getHours() > endTime.getHours()) {
//             let newWindow1 = new Window("Empty", currTime.getFullYear(), currTime.getMonth(), currTime.getDate(), new Time(0, 0), endTime, 0);
//             let newWindow2 = new Window("Empty", currTime.getFullYear(), currTime.getMonth(), currTime.getDate(), startTime, new Time(23, 59), 0);

//             Window.emptyCollection[i].push(newWindow1);
//             Window.emptyCollection[i].push(newWindow2);
//         } else {
//             let newWindow = new Window("Empty", currTime.getFullYear(), currTime.getMonth(), currTime.getDate(), startTime, endTime, 0);

//             Window.emptyCollection[i].push(newWindow);
//         }
//     }
//     //For tracing purposes
//     /*
//     console.log("occupiedCollection is now " + Window.occupiedCollection);
//     console.log("emptyCollection is now " + Window.emptyCollection);
//     console.log("nonFixedCollection is now " + Window.nonFixedCollection);
//     console.log("fixedFutureArr is now " + Window.fixedFutureArr);
//     for (let j = 0; j < Window.occupiedCollection.length; j ++) {
//         console.log("occupiedCollection at index " + j + " is " + Window.occupiedCollection[j]);
//     }
//     for (let j = 0; j < Window.emptyCollection.length; j ++) {
//         console.log("emptyCollection at index " + j + " is " + Window.emptyCollection[j]);
//     }
//     for (let j = 0; j < Window.nonFixedCollection.length; j ++) {
//         console.log("nonFixedCollection at index " + j + " is " + Window.nonFixedCollection[j]);
//     }
//     for (let j = 0; j < Window.fixedFutureArr.length; j ++) {
//         console.log("fixedFuture at index " + j + " is " + Window.fixedFutureArr[j]);
//     }
//     */
// }

// TEMPORARY ARRAYS TO CHECK IF WINDOW FUNCTIONS ARE WORKING AS THEY SHOULD
    // Window.occupiedCollection = []; // Contains 7 'Window.prototype.occupiedArr' 
    // Window.fixedFutureArr = []; // Represents fixed tasks that are scheduled for > 7 days from now
    // Window.emptyCollection = []; // Contains 7 'Window.prototype.emptyArr'
    // Window.nonFixedCollection = []; // Contains 7 'Window.prototype.nonFixedFutureArr'
    // Window.nonFixedFutureArr = []; // Represents non-fixed tasks that are scheduled for > 7 days from now
    // //Window.prototype.group = 0; //Tracks the number of groups (non-fixed, connected tasks) for the day. Reset at the end of every day.
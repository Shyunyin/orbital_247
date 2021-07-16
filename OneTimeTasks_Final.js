// import window and time class

// Contains the following classes: OneTimeTask, FixedTask and NonFixedTask 
// IMPORTANT: Need to relook at NonfixedTask class and update it accordingly

class OneTimeTask {
    constructor(taskName, taskCategory, year, month, date) {
        this.taskName = taskName;
        this.taskCategory = taskCategory;
        this.year = year;
        this.month = month;
        this.date = date;
    }
}

OneTimeTask.prototype.cats = ['Work', 'Exercise', 'Miscellaneous', 'Meal', 'Fully Work', 'Partially Work'];

class FixedTask extends OneTimeTask {
    /**
     * Creates fixed tasks for a day
     * @param {String} taskName Name of the task
     * @param {Number} taskCategory Category of task (0-5; To be chosen from category 
     *                              array in OneTimeTask class)
     * @param {Number} year Year for which the task is schedueled
     * @param {Number} month Month for which the task is schedueled
     * @param {Number} date Date for which the task is schedueled
     * @param {Time} startTime The time at which the task is to start
     * @param {Time} endTime The time at which the task is to end
     */
    constructor(taskName, taskCategory, year, month, date, startTime, endTime) {
        super(taskName, taskCategory, year, month, date);
        this.startTime = startTime;
        this.endTime = endTime;
    }

    /**
     * To add a fixed task to the user's schedule
     */
    scheduleTask() {
        //TODO: Pop up window if it is during sleep
        let newTask = new Window(this.taskName, this.year, this.month, this.date, this.startTime, this.endTime, 1);
        if (!newTask.isPast()) {
            console.log(this.startTime);
            newTask.insertWindow();
        }
    }

    deleteTask() {
        let newTask = new Window("Blank", this.year, this.month, this.date, this.startTime, this.endTime, 1); // Assuming we don't have the name of the task
        if (!newTask.isPast()) {
            newTask.removeWindow();
        }
    }

}

//TODO: IMPORTANT - Decide if your accumualted duration is supposed to include the duration of the current session itself. If so, k * session_duration is okay. If not (k - 1) * session_duration
class NonFixedTask extends OneTimeTask {
    /**
     * Constructor to create non-fixed tasks
     * @param {String} taskName Name of the task
     * @param {Number} taskCategory Category of task (0-5; To be chosen from category 
     *                              array in OneTimeTask class)
     * @param {Number} year
     * @param {Number} month Month of the current year for which the task is scheduled
     * @param {Number} date Date of the current year for which the task is scheduled
     * @param {Number} numOfSess Number of sessions
     * @param {Number} durOfSess Duration of each session (Format: [Hours, Minutes])
     * @param {String} taskAfterIt Name of the task that is to be scheduled sometime after it
     */
    constructor(taskName, taskCategory, year, month, date, numOfSess, durOfSess, accumulatedDuration, taskAfterIt = null) {
        super(taskName, taskCategory, year, month, date);
        this.numOfSess = numOfSess;
        this.durOfSess = durOfSess;
        this.accumulatedDuration = accumulatedDuration; //TODO: When creating this object, pass in the durOfSess as the argument for this variable
        this.taskAfterIt = taskAfterIt; //Set to be an optional parameter
    }

    getTaskAfterIt() {
        return this.taskAfterIt;
    }

    getIndivDuration() {
        return this.durOfSess;
    }
    
    changeDuration(duration) {
        this.durOfSess = duration;
    }

    changeAccumulateDuration(accumulatedDuration) {
        this.accumulatedDuration = accumulatedDuration;
    }

    getTaskCategory() {
        return this.taskCategory;
    }

    getAccumulatedDuration() {
        return this.accumulatedDuration;
    }

    addTask() {
        console.log("addTask function is called");
        let now = new Date();
        let currDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        let expectedDate = new Date(this.year, this.month, this.date);
        let index = (expectedDate - currDate)/86400000;

        if (index < 0) {
            return new Error('Invalid index.')
        } else if (index < 7) {
        // If it is a connected task
            if (this.taskAfterIt != null) {
                // If the connected task is to be scheduled within the next 7 days
                //if (index < 7) {
                let currArr = Window.nonFixedCollection[index][0]; //IMPORTANT: I think this part can be simplified by retrieving the info from the database
                for (let i = 0; i < currArr.length; i++) {
                    // If the task which is supposed to be after the current task has been located in the only non-fixed tasks connected to fixed tasks tasks array
                    if (currArr[i].getTaskName() == this.taskAfterIt) {
                        // If the located task has no tasks to be done after it
                        if (currArr[i].getTaskAfterIt() == null) {
                            // Updating the category of the connected non-fixed tasks
                            let newCategory = this.taskCategory;
                            // If the categories don't match
                            if (currArr[i].getTaskCategory() != this.taskCategory) {
                                // As long as either one of tasks are work related
                                if (currArr[i].getTaskCategory() == 0 || this.taskCategory == 0) {
                                    // The new category will be "partially work"
                                    newCategory = 5;
                                }
                            }
                            // If the categories match and they are both work
                            if (currArr[i].getTaskCategory() == 0 && this.taskCategory == 0) {
                                // It will be fully work
                                newCategory = 4;
                            }

                            // Finding the total duration of all the connected non-fixed tasks in the format of [hours, mins]
                            let accumHours = currArr[i].getAccumulatedDuration()[0] + (this.numOfSess * this.durOfSess[0]);
                            let accumMins = currArr[i].getAccumulatedDuration()[1] + (this.numOfSess * this.durOfSess[1]);
                            if (accumMins > 60) {
                                accumHours += (accumMins - (accumMins % 60)) / 60;
                                accumMins = accumMins % 60;
                            }
                            let maxAccumulatedDuration = [accumHours, accumMins];

                            // Pop off the original task as it has to be shifted to a new position along with the new connected tasks
                            let origTask = currArr.splice(i, 1);
                            let pos = 0;
                            while (pos < currArr.length && (currArr[pos].getAccumulatedDuration()[0] * 60 + currArr[pos].getAccumulatedDuration()[1]) < (maxAccumulatedDuration[0] * 60 + maxAccumulatedDuration[1])) {
                                pos++;
                            }
                            // Insert back the original task in the right place
                            currArr[pos] = origTask;

                            // Insert all sessions of this connected task (Works for any number of sessions)
                            for (let k = 1; k <= this.durOfSess; k++) {
                                //let currHours = currArr[i].getAccumulatedDuration()[0] + ((k - 1) * this.durOfSess[0]);
                                //let currMins = currArr[i].getAccumulatedDuration()[1] + ((k - 1)  * this.durOfSess[1]);
                                let currHours = origTask.getAccumulatedDuration()[0] + (k * this.durOfSess[0]);
                                let currMins = origTask.getAccumulatedDuration()[1] + (k  * this.durOfSess[1]);
                                if (currMins > 60) {
                                    currMins = currMins % 60;
                                    currHours += 1;
                                }
                                let newTask = new NonFixedTask(this.taskName, newCategory, this.year, this.month, this.date, 1, this.durOfSess, [currHours, currMins], this.taskAfterIt);

                                currArr[pos + (this.numOfSess - k)] = newTask;
                            }
                            return;
                        // If the located task has tasks to be done after it
                        } else {
                            let newTaskNameAfterIt = currArr[i].getTaskAfterIt();
                            let latestTask = i; //Might be able to simplify the process of finding the task using the database (but again, not sure)
                            while (latestTask > 0 && currArr[latestTask].getTaskAfterIt() == currArr[latestTask - 1].getTaskAfterIt()) {
                                latestTask--;
                            }
                            let newCategory = this.taskCategory;
                            if (currArr[latestTask].getTaskCategory() != this.taskCategory) {
                                // Same logic as above
                                if (currArr[latestTask].getTaskCategory() == 0 || this.taskCategory == 0) {
                                    newCategory = 5; // Partially work category
                                }
                            }
                            if (currArr[latestTask].getTaskCategory() == 0 && this.taskCategory == 0) {
                                newCategory = 4; // Fully work category
                            }

                            // Finding the total duration of all the connected non-fixed tasks
                            let accumHours = currArr[latestTask].getAccumulatedDuration()[0] + (this.numOfSess * this.durOfSess[0]);
                            let accumMins = currArr[latestTask].getAccumulatedDuration()[1] + (this.numOfSess * this.durOfSess[1]);
                            if (accumMins > 60) {
                                accumHours += (accumMins - (accumMins % 60)) / 60;
                                accumMins = accumMins % 60;
                            }
                            let maxAccumulatedDuration = [accumHours, accumMins];

                            let connectedTasksEndIndex = latestTask;
                            while (connectedTasksEndIndex < currArr.length - 1 && currArr[connectedTasksEndIndex].getTaskAfterIt() == currArr[connectedTasksEndIndex + 1].getTaskAfterIt()) {
                                connectedTasksEndIndex++;
                            }
                            // Pop off the original task as it has to be shifted to a new position along with the new connected tasks
                            let origTasks = currArr.splice(latestTask, connectedTasksEndIndex - latestTask + 1);
                            let pos = 0;
                            while (pos < currArr.length && (currArr[pos].getAccumulatedDuration()[0] * 60 + currArr[pos].getAccumulatedDuration()[1]) < (maxAccumulatedDuration[0] * 60 + maxAccumulatedDuration[1])) {
                                pos++;
                            }
                            // Insert back the original task in the right place
                            currArr.splice(pos, 0, origTasks);
                            let origTask = currArr[pos];
                            // Insert all sessions of this connected task (Works for any number of sessions)
                            for (let k = 1; k <= this.durOfSess; k++) {
                                let currHours = origTask.getAccumulatedDuration()[0] + (k * this.durOfSess[0]);
                                let currMins = origTask.getAccumulatedDuration()[1] + (k  * this.durOfSess[1]);
                                if (currMins > 60) {
                                    currMins = currMins % 60;
                                    currHours += 1;
                                }
                                let newTask = new NonFixedTask(this.taskName, newCategory, this.year, this.month, this.date, 1, this.durOfSess, [currHours, currMins], newTaskNameAfterIt);
                                //let newTask = new NonFixedTask(this.taskName, newCategory, this.month, this.date, 1, this.durOfSess, newTaskNameAfterIt, [currArr[i].getAccumulatedDuration[0] + ((k - 1) * this.durOfSess[0]), currArr[i].getAccumulatedDuration[1] + ((k - 1)  * this.durOfSess[1])]);

                                currArr[pos + (this.numOfSess - k)] = newTask;
                            }
                            return;
                        }
                    }
                }
                // Check task which is supposed to be after the current task has been located in the only non-fixed tasks connected to fixed tasks tasks array
                currArr = Window.nonFixedCollection[index][1]; //IMPORTANT: Index 1 is the priority array
                for (let j = 0; j < currArr.length; j++) {
                    // If the task which is supposed to be after the current task has been located in the only non-fixed tasks connected to fixed tasks tasks array
                    if (currArr[j].getTaskName() == this.taskAfterIt) {
                        // If the located task has no tasks to be done after it
                        if (currArr[j].getTaskAfterIt() == null) {
                            // Updating the category of the connected non-fixed tasks
                            let newCategory = this.taskCategory;
                            if (currArr[j].getTaskCategory() != this.taskCategory) {
                                // Same logic as above
                                if (currArr[j].getTaskCategory() == 0 || this.taskCategory == 0) {
                                    newCategory = 5; // Partially work
                                }
                            }
                            if (currArr[j].getTaskCategory() == 0 && this.taskCategory == 0) {
                                newCategory = 4; // Fully work
                            }

                            let origTask = currArr[j];
                            // Insert all sessions of this connected task (Works for any number of sessions)
                            for (let k = 1; k <= this.durOfSess; k++) {
                                let currHours = origTask.getAccumulatedDuration()[0] + (k * this.durOfSess[0]);
                                let currMins = origTask.getAccumulatedDuration()[1] + (k  * this.durOfSess[1]);
                                if (currMins > 60) {
                                    currMins = currMins % 60;
                                    currHours += 1;
                                }
                                let newTask = new NonFixedTask(this.taskName, newCategory, this.year, this.month, this.date, 1, this.durOfSess, [currHours, currMins], this.taskAfterIt);
                                //let newTask = new NonFixedTask(this.taskName, newCategory, this.month, this.date, 1, this.durOfSess, this.taskAfterIt, [currArr[i].getAccumulatedDuration[0] + ((k - 1) * this.durOfSess[0]), currArr[i].getAccumulatedDuration[1] + ((k - 1)  * this.durOfSess[1])]);

                                currArr[j + (this.numOfSess - k)] = newTask;
                            }
                            return;
                        // If the located task has tasks to be done after it
                        } else {
                            let newTaskNameAfterIt = currArr[j].getTaskAfterIt();
                            let latestTask = j;
                            while (latestTask > 0 && currArr[latestTask].getTaskAfterIt() == currArr[latestTask - 1].getTaskAfterIt()) {
                                latestTask--;
                            }
                            let newCategory = this.taskCategory;
                            if (currArr[latestTask].getTaskCategory() != this.taskCategory) {
                                // Same logic as above
                                if (currArr[latestTask].getTaskCategory() == 0 || this.taskCategory == 0) {
                                    newCategory = 5; // Partially work
                                }
                            }
                            if (currArr[latestTask].getTaskCategory() == 0 && this.taskCategory == 0) {
                                newCategory = 4; // Fully work
                            }

                            let origTask = currArr[latestTask];
                            // Insert all sessions of this connected task (Works for any number of sessions)
                            for (let k = 1; k <= this.durOfSess; k++) {
                                let currHours = origTask.getAccumulatedDuration()[0] + (k * this.durOfSess[0]);
                                let currMins = origTask.getAccumulatedDuration()[1] + (k  * this.durOfSess[1]);
                                if (currMins > 60) {
                                    currMins = currMins % 60;
                                    currHours += 1;
                                }
                                let newTask = new NonFixedTask(this.taskName, newCategory, this.year, this.month, this.date, 1, this.durOfSess, [currHours, currMins], newTaskNameAfterIt);
                                //let newTask = new NonFixedTask(this.taskName, newCategory, this.month, this.date, 1, this.durOfSess, newTaskNameAfterIt, [currArr[i].getAccumulatedDuration[0] + ((k - 1) * this.durOfSess[0]), currArr[i].getAccumulatedDuration[1] + ((k - 1)  * this.durOfSess[1])]);

                                currArr[latestTask + (this.numOfSess - k)] = newTask;
                            }
                            return;
                        }
                    }
                }
            // If the non-fixed task is not connected to anything
            // TODO: IMPORTANT: For this else block, do we split up the sessions? Check the scheduling algo first for this. But as of now, it has not been split up yet. And if we are split up, what will be the names of the sessions (but I think should be able to follow the same behaviour as above, just that database it might be an issue. But for this we can also make it such that we can add a number behind the name string for the doc name itself, but each task doc will the taskName field from which we will retrieve the actual task name? Dk if this will be a problem for task deletion tho)
            } else {
                console.log("I come here is as I am a disconnected non-fixed task.")
                let currArr = Window.nonFixedCollection[index][0];
                // Finding the total duration of all the connected non-fixed tasks in the format of [hours, mins]
                let accumHours = (this.numOfSess * this.durOfSess[0]);
                let accumMins = (this.numOfSess * this.durOfSess[1]);
                if (accumMins > 60) {
                    accumHours += (accumMins - (accumMins % 60)) / 60;
                    accumMins = accumMins % 60;
                }
                let maxAccumulatedDuration = [accumHours, accumMins];
                console.log("The accumulated duration is " + maxAccumulatedDuration);
                // Pop off the original task as it has to be shifted to a new position along with the new connected tasks
                let pos = 0;
                
                while (pos < currArr.length && currArr[pos].getAccumulatedDuration() < maxAccumulatedDuration) { //TODO: Problem - Can't do such direct comparison if duration is in [hours, mins] format. Can we have the accumulated duration in mins or is there a need for hours and mins? (Comparison formula yet to be written)
                    pos++;
                }
                
                console.log("pos is " + pos);
                // Insert all sessions of this connected task (Works for any number of sessions)
                for (let k = 1; k <= this.numOfSess; k++) {
                    console.log("I come to the for loop");
                    //let currHours = currArr[i].getAccumulatedDuration()[0] + ((k - 1) * this.durOfSess[0]);
                    //let currMins = currArr[i].getAccumulatedDuration()[1] + ((k - 1)  * this.durOfSess[1]);
                    let currHours = (k * this.durOfSess[0]);
                    let currMins = (k * this.durOfSess[1]);
                    if (currMins > 60) {
                        currMins = currMins % 60;
                        currHours += 1;
                    }
                    let newTask = new NonFixedTask(this.taskName, this.taskCategory, this.year, this.month, this.date, 1, this.durOfSess, [currHours, currMins], this.taskAfterIt);

                    currArr[pos + (this.numOfSess - k)] = newTask;
                }
                console.log("Task '" + this.taskName + "' added to task list.")
                for (let i = 0; i < Window.nonFixedCollection.length; i++) {
                    console.log("Normal array at index " + i + " of nonFixedCollection is " + Window.nonFixedCollection[i][0]);
                    console.log("Priority array at index " + i + " of nonFixedCollection is " + Window.nonFixedCollection[i][1]);
                }
                console.log(Window.nonFixedCollection[0][0][pos - 1]);
                console.log(Window.nonFixedCollection[0][0][pos]);
                console.log(Window.nonFixedCollection[0][0][pos + 1]);
                console.log(Window.nonFixedCollection[0][0][pos + 2]);
                console.log(Window.nonFixedCollection[0][0][pos + 3]);
                return;
            }
        // If the index >= 7 (to be added in the future
        // IMPORTANT: If there is > 1 session, we will not split them up like we did above. Instead, when the day is right, we will just call the addTask() function on this task again and let the splitting be done then
        } else {
            let currArr = Window.nonFixedFutureArr;
            let g = 0;
            let currTaskTime = new Date(this.year, this.month, this.date, 0).getTime();
            while (g < currArr.length && currTaskTime > new Date(currArr[g].getYear(), currArr[g].getMonth(), currArr[g].getDate(), 0).getTime()) {
                g++;
            }
            currArr[g] = this;
            return;
        }
    }

/*

                    // If the task which is supposed to be after the current task has been located in the only non-fixed tasks connected to fixed tasks tasks array
                    } else {
                        currArr = Window.prototype.nonFixedCollection[index][1];

                    }
                        // If the connected task has no tasks before it yet
                        if (currArr[i].getGroup == -1) {
                            currArr[i].changeGroup(NonFixedTask.prototype.group);
                            this.changeGroup(NonFixedTask.prototype.group);
                            NonFixedTask.prototype.group++;

                            totalDuration = [currArr[i].getAccumulatedDuration()[0] + this.accumulatedDuration[0], currArr[i].getAccumulatedDuration()[1] + this.accumulatedDuration[1]];
                            this.changeAccumulateDuration(totalDuration);
                            
                            let newIndex = i;
                            while (newIndex > 0 && currArr[i].getAccumulatedDuration() > currArr[newIndex - 1].getAccumulatedDuration()) {
                                if (currArr[newIndex - 1].getGroup == -1) {
                                    newIndex--;
                                } else {
                                    let pointer = newIndex - 1;
                                    while (currArr[pointer].getGroup == currArr[pointer - 1].getGroup) {
                                        pointer--;
                                    }
                                    if (currArr[newIndex].getAccumulatedDuration() > currArr[pointer].getAccumulatedDuration()) {
                                        newIndex = pointer;
                                    }
                                }
                            }
                            currArr.splice(newIndex, 0, this);

                            newIndex++;
                            let j;
                            for (j = 0; j < currArr.length; j++) {
                                if (j != newIndex && currArr[j].getGroup == this.group) {
                                    extract = currArr.splice(j, 1);
                                    currArr.splice(newIndex, 0, extract);
                                    newIndex++;
                                }
                            }
                        // If the connected task already has tasks before it
                        } else {
                            this.changeGroup(currArr[i].getGroup);
                            let pointer = i;
                            while (i > 0 && currArr[pointer - 1].getGroup == currArr[i].getGroup) {
                                pointer--;
                            }
                            totalDuration = [currArr[pointer].getAccumulatedDuration()[0] + this.accumulatedDuration[0], currArr[pointer].getAccumulatedDuration()[1] + this.accumulatedDuration[1]];
                            this.changeAccumulateDuration(totalDuration);
                            
                            let newIndex = i;
                            while (newIndex > 0 && currArr[i].getAccumulatedDuration() > currArr[newIndex - 1].getAccumulatedDuration()) {
                                if (currArr[newIndex - 1].getGroup == -1) {
                                    newIndex--;
                                } else {
                                    let newPointer = newIndex - 1;
                                    while (currArr[newPointer].getGroup == currArr[newPointer - 1].getGroup) {
                                        newPointer--;
                                    }
                                    if (currArr[newIndex].getAccumulatedDuration() > currArr[newPointer].getAccumulatedDuration()) {
                                        newIndex = newPointer;
                                    }
                                }
                            }
                            currArr.splice(newIndex, 0, this);

                            newIndex++;
                            let j;
                            for (j = 0; j < currArr.length; j++) {
                                if (j != newIndex && currArr[j].getGroup == this.group) {
                                    let extract = currArr.splice(j, 1);
                                    currArr.splice(newIndex, 0, extract);
                                    newIndex++;
                                }
                            }
                        }
                        return;
                    }
                }
                //TODO: If non-fixed task is connected to a fixed task
                // Not immediately scheduled in case user adds more fixed tasks 
                let currArr = Window.prototype.nonFixedCollection[index][1]; //TODO: Need to do the set-up for this array
                for (i = 0; i < currArr.length; i++) {
                    // If the current task is connected to a non-fixed task in this array
                    if (currArr[i].getTaskName == this.taskAfterIt) {
                        // If the connected task has no tasks before it yet
                        if (currArr[i].getGroup == -1) {
                            currArr[i].changeGroup(NonFixedTask.prototype.group);
                            this.changeGroup(NonFixedTask.prototype.group);
                            NonFixedTask.prototype.group++;

                            totalDuration = [currArr[i].getAccumulatedDuration()[0] + this.accumulatedDuration[0], currArr[i].getAccumulatedDuration()[1] + this.accumulatedDuration[1]];
                            this.changeAccumulateDuration(totalDuration);
                            
                            let newIndex = i;
                            while (newIndex > 0 && currArr[i].getAccumulatedDuration() > currArr[newIndex - 1].getAccumulatedDuration()) {
                                if (currArr[newIndex - 1].getGroup == -1) {
                                    newIndex--;
                                } else {
                                    let pointer = newIndex - 1;
                                    while (currArr[pointer].getGroup == currArr[pointer - 1].getGroup) {
                                        pointer--;
                                    }
                                    if (currArr[newIndex].getAccumulatedDuration() > currArr[pointer].getAccumulatedDuration()) {
                                        newIndex = pointer;
                                    }
                                }
                            }
                            currArr.splice(newIndex, 0, this);

                            newIndex++;
                            let j;
                            for (j = 0; j < currArr.length; j++) {
                                if (j != newIndex && currArr[j].getGroup == this.group) {
                                    extract = currArr.splice(j, 1);
                                    currArr.splice(newIndex, 0, extract);
                                    newIndex++;
                                }
                            }
                        // If the connected task already has tasks before it
                        //TODO: Need to update the taskAfterIt name accordingly (must be that of the fixed task)
                        } else {
                            this.changeGroup(currArr[i].getGroup);
                            let pointer = i;
                            while (i > 0 && currArr[pointer - 1].getGroup == currArr[i].getGroup) {
                                pointer--;
                            }
                            totalDuration = [currArr[pointer].getAccumulatedDuration()[0] + this.accumulatedDuration[0], currArr[pointer].getAccumulatedDuration()[1] + this.accumulatedDuration[1]];
                            this.changeAccumulateDuration(totalDuration);
                            
                            let newIndex = i;
                            while (newIndex > 0 && currArr[i].getAccumulatedDuration() > currArr[newIndex - 1].getAccumulatedDuration()) {
                                if (currArr[newIndex - 1].getGroup == -1) {
                                    newIndex--;
                                } else {
                                    let newPointer = newIndex - 1;
                                    while (currArr[newPointer].getGroup == currArr[newPointer - 1].getGroup) {
                                        newPointer--;
                                    }
                                    if (currArr[newIndex].getAccumulatedDuration() > currArr[newPointer].getAccumulatedDuration()) {
                                        newIndex = newPointer;
                                    }
                                }
                            }
                            currArr.splice(newIndex, 0, this);

                            newIndex++;
                            let j;
                            for (j = 0; j < currArr.length; j++) {
                                if (j != newIndex && currArr[j].getGroup == this.group) {
                                    let extract = currArr.splice(j, 1);
                                    currArr.splice(newIndex, 0, extract);
                                    newIndex++;
                                }
                            }
                        }
                        return;
                    // If the current task is connect to a fixed task (just order according to duration)
                    } else if (i == currArr.length - 1) {
                        let newIndex = 0;
                        while (currArr[newIndex].getAccumulatedDuration() < this.accumulatedDuration) {
                            if (currArr[newIndex].getGroup() != -1) {
                                while (currArr[newIndex].getGroup() == currArr[newIndex + 1].getGroup()) {
                                    newIndex++;
                                }
                            } else {
                                newIndex++;
                            }
                        }
                        currArr.splice(newIndex, 0, this);
                    }
                }
                

                
            // If it is not connected to any task
            } else {
                let taskTime = new Date(this.year, this.month, this.date, 0).getTime();
                let i;
                for(i = 0; i < Window.prototype.nonFixedFutureArr.length; i++) {
                    let currTask = Window.prototype.nonFixedFutureArr[i]
                    let currTaskTime = new Date(currTask.getYear(), currTask.getMonth(), currTask.getDate(), 0);
                    if (taskTime < currTask) {
                        Window.prototype.nonFixedFutureArr.splice(i, 0, this).getTime();
                    }
                }
            }
        } else {
            let newIndex = 0;
            let currArr = Window.prototype.nonFixedCollection[index];
            while (currArr[newIndex].getAccumulatedDuration < this.getAccumulatedDuration) {
                if (currArr[newIndex].getGroup != -1) {
                    while (currArr[newIndex].getGroup == currArr[newIndex + 1].getGroup) {
                        newIndex++;
                    }
                } else {
                    newIndex++;
                }
            }
        }
    }

*/

    deleteTask() {
        //TODO
    }

    /**
     * To retrieve the name of the task
     * @returns {String} The name of the task
     */
    getTaskName() {
        return this.taskName;
    }

    getAccumulatedDuration() {
        return this.accumulatedDuration;
    }

    /*
    getGroup() {
        return this.group;
    }
    */
    /**
     * To update the accumulated duration of an existing window to a new duration
     * @param {Number} newDuration The new accumulated duration in hours and minutes (Format: [hours, mins])
     */
     changeAccumulateDuration(newDuration) {
        this.accumulatedDuration = newDuration;
    }

    /**
     * To update the group number fo an existing window to a new number
     * @param {Number} newGroup The new group number (based on Window.prototype.group)
     */
    /*
    changeGroup(newGroup) {
        this.group = newGroup;
    }
    */
}

//NonFixedTask.prototype.group = 0;
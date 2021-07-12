import { OneTimeTask } from "./OneTimeTask.js";
import { Window } from "../Window.js";
import {Time} from '../Time.js';
// Class for non-fixed tasks to be created
export class NonFixedTask extends OneTimeTask {
    /**
     * Constructor to create non-fixed tasks
     * @param {String} taskName Name of the task
     * @param {Number} taskCategory Category of task (0-2; To be chosen from category 
     *                              array in OneTimeTask class)
     * @param {Number} month Month of the current year for which the task is scheduled
     * @param {Number} date Date of the current year for which the task is scheduled
     * @param {Number} numOfSess Number of sessions
     * @param {Number} durOfSess Duration of each session (Format: [Hours, Minutes])
     * @param {String} taskAfterIt Name of the task that is to be scheduled sometime before it
     */
    constructor(taskName, taskCategory, month, date, numOfSess, durOfSess, taskAfterIt, accumulatedDuration) {
        super(taskName, taskCategory, new Date().getFullYear(), month, date);
        this.numOfSess = numOfSess;
        this.durOfSess = durOfSess;
        this.taskAfterIt = taskAfterIt;
        this.accumulatedDuration = accumulatedDuration; //TODO: When creating this object, pass in the durOfSess as the argument for this variable
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

    addTask() {
        let now = new Date();
        let currDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        let expectedDate = new Date(this.year, this.month, this.date);
        let index = (expectedDate - currDate)/86400000;

        if (index < 0) {
            return new Error('Invalid index.')
        }

        // If it is a connected task
        if (this.taskAfterIt != null) {
            // If the connected task is to be scheduled within the next 7 days
            if (index < 8) {
                let currArr = Window.prototype.nonFixedCollection[index][0];
                let i;
                for (i = 0; i < currArr.length; i++) {
                    // If the task which is supposed to be after the current task has been located in the only non-fixed tasks connected to fixed tasks tasks array
                    if (currArr[i].getTaskName() == this.taskAfterIt) {
                        // If the located task has no tasks to be done after it
                        if (currArr[i].getTaskAfterIt() == null) {
                            // Updating the category of the connected non-fixed tasks
                            let newCategory = this.taskCategory;
                            //TODO: Need to create category
                            if (currArr[i].getTaskCategory() != this.taskCategory) {
                                if (currArr[i].getTaskCategory() == 0 || this.taskCategory == 0) {
                                    newCategory = 5;
                                }
                            }
                            if (currArr[i].getTaskCategory() == 0 && this.taskCategory == 0) {
                                newCategory = 4;
                            }

                            // Finding the total duration of all the connected non-fixed tasks
                            let maxAccumulateDuration = [currArr[i].getAccumulatedDuration[0] + this.numOfSess * this.durOfSess[0], currArr[i].getAccumulatedDuration[1] + this.numOfSess * this.durOfSess[1]]

                            // Pop off the original task as it has to be shifted to a new position along with the new connected tasks
                            let origTask = currArr.splice(i, 1);
                            let pos = 0;
                            while (pos < currArr.length && currArr[pos].getAccumulatedDuration() < maxAccumulateDuration) {
                                pos++;
                            }
                            // Insert back the original task in the right place
                            currArr.splice(pos, 0, origTask);

                            // Insert all sessions of this connected task (Works for any number of sessions)
                            let k;
                            for (k = 1; k <= this.durOfSess; k++) {
                                let newTask = new NonFixedTask(this.taskName, newCategory, this.month, this.date, 1, this.durOfSess, this.taskAfterIt, [currArr[i].getAccumulatedDuration[0] + ((k - 1) * this.durOfSess[0]), currArr[i].getAccumulatedDuration[1] + ((k - 1)  * this.durOfSess[1])]);

                                currArr.splice(pos, 0, newTask);
                            }
                            return;
                        // If the located task has tasks to be done after it
                        } else {
                            let newTaskNameAfterIt = currArr[i].getTaskAfterIt();
                            let latestTask = i;
                            while (latestTask > 0 && currArr[latestTask].getTaskAfterIt() == currArr[latestTask - 1].getTaskAfterIt()) {
                                latestTask--;
                            }
                            let newCategory = this.taskCategory;
                            //TODO: Need to create category
                            if (currArr[latestTask].getTaskCategory() != this.taskCategory) {
                                if (currArr[latestTask].getTaskCategory() == 0 || this.taskCategory == 0) {
                                    newCategory = 5;
                                }
                            }
                            if (currArr[latestTask].getTaskCategory() == 0 && this.taskCategory == 0) {
                                newCategory = 4;
                            }

                            // Finding the total duration of all the connected non-fixed tasks
                            let maxAccumulateDuration = [currArr[latestTask].getAccumulatedDuration[0] + this.numOfSess * this.durOfSess[0], currArr[latestTask].getAccumulatedDuration[1] + this.numOfSess * this.durOfSess[1]]

                            let connectedTasksEndIndex = j;
                            while (currArr[connectedTasksEndIndex].getTaskAfterIt() == currArr[connectedTasksEndIndex + 1].getTaskAfterIt()) {
                                connectedTasksEndIndex++;
                            }
                            // Pop off the original task as it has to be shifted to a new position along with the new connected tasks
                            let origTasks = currArr.splice(j, connectedTasksEndIndex - j + 1);
                            let pos = 0;
                            while (currArr[pos].getAccumulatedDuration() < maxAccumulateDuration) {
                                pos++;
                            }
                            // Insert back the original task in the right place
                            currArr.splice(pos, 0, origTasks);

                            // Insert all sessions of this connected task (Works for any number of sessions)
                            let k;
                            for (k = 1; k <= this.durOfSess; k++) {
                                let newTask = new NonFixedTask(this.taskName, newCategory, this.month, this.date, 1, this.durOfSess, newTaskNameAfterIt, [currArr[i].getAccumulatedDuration[0] + ((k - 1) * this.durOfSess[0]), currArr[i].getAccumulatedDuration[1] + ((k - 1)  * this.durOfSess[1])]);

                                currArr.splice(pos, 0, newTask);
                            }
                            return;
                        }
                    }
                }
                // Check task which is supposed to be after the current task has been located in the only non-fixed tasks connected to fixed tasks tasks array
                currArr = Window.prototype.nonFixedCollection[index][1];
                let j;
                for (j = 0; j < currArr.length; j++) {
                    // If the task which is supposed to be after the current task has been located in the only non-fixed tasks connected to fixed tasks tasks array
                    if (currArr[j].getTaskName() == this.taskAfterIt) {
                        // If the located task has no tasks to be done after it
                        if (currArr[j].getTaskAfterIt() == null) {
                            // Updating the category of the connected non-fixed tasks
                            let newCategory = this.taskCategory;
                            //TODO: Need to create category
                            if (currArr[j].getTaskCategory() != this.taskCategory) {
                                if (currArr[j].getTaskCategory() == 0 || this.taskCategory == 0) {
                                    newCategory = 5;
                                }
                            }
                            if (currArr[j].getTaskCategory() == 0 && this.taskCategory == 0) {
                                newCategory = 4;
                            }

                            // Insert all sessions of this connected task (Works for any number of sessions)
                            let k;
                            for (k = 1; k <= this.durOfSess; k++) {
                                let newTask = new NonFixedTask(this.taskName, newCategory, this.month, this.date, 1, this.durOfSess, this.taskAfterIt, [currArr[i].getAccumulatedDuration[0] + ((k - 1) * this.durOfSess[0]), currArr[i].getAccumulatedDuration[1] + ((k - 1)  * this.durOfSess[1])]);

                                currArr.splice(j, 0, newTask);
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
                            //TODO: Need to create category
                            if (currArr[latestTask].getTaskCategory() != this.taskCategory) {
                                if (currArr[latestTask].getTaskCategory() == 0 || this.taskCategory == 0) {
                                    newCategory = 5;
                                }
                            }
                            if (currArr[latestTask].getTaskCategory() == 0 && this.taskCategory == 0) {
                                newCategory = 4;
                            }

                            // Insert all sessions of this connected task (Works for any number of sessions)
                            let k;
                            for (k = 1; k <= this.durOfSess; k++) {
                                let newTask = new NonFixedTask(this.taskName, newCategory, this.month, this.date, 1, this.durOfSess, newTaskNameAfterIt, [currArr[i].getAccumulatedDuration[0] + ((k - 1) * this.durOfSess[0]), currArr[i].getAccumulatedDuration[1] + ((k - 1)  * this.durOfSess[1])]);

                                currArr.splice(latestTask, 0, newTask);
                            }
                            return;
                        }
                    }
                }
            // If the index >= 8 (to be added in the future)
            } else {
                //TODO: Need to do proper set up once the relevant date is in the 7 day runway
                let currArr = Window.prototype.nonFixedFutureArr;
                let g = 0;
                //TODO: May need to create getYear, getMonth, getDate
                let currTaskTime = new Date(this.year, this.month, this.date, 0).getTime();
                while (g < currArr.length && currTaskTime > new Date(currArr[g].getYear(), currArr[g].getMonth(), currArr[g].getDate(), 0).getTime()) {
                    g++;
                }
                currArr.splice(g, 0, this);
            }
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

    getGroup() {
        return this.group;
    }

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
    changeGroup(newGroup) {
        this.group = newGroup;
    }
}

NonFixedTask.prototype.group = 0;


// Class for non-fixed tasks to be created
class NonFixedTask extends OneTimeTask {
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
    constructor(taskName, taskCategory, month, date, numOfSess, durOfSess, taskAfterIt) {
        super(taskName, taskCategory, new Date().getFullYear(), month, date);
        this.numOfSess = numOfSess;
        this.durOfSess = durOfSess;
        this.taskAfterIt = taskAfterIt;
        this.accumulatedDuration = [this.numOfSess * this.durOfSess[0], this.numOfSess * this.durOfSess[1]]; // assuming 0 is hours and 1 is mins //TODO: How to add it as separate tasks if > 1 session
        this.group = -1;
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
                let currArr = Window.prototype.nonFixedCollection[index];
                let i;
                for (i = 0; i < currArr.length; i++) {
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
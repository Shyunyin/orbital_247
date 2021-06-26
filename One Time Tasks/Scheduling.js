// Dont need to do the group thing if you can just copy and past the name of the task that you are following (meaning all the tasks in the same group will have the same 'taskAfterIt')

// Don't add breaks after the last activity for the day (and before sleeping)

//TODO: Need to consider the following case: Lets say both task A and task B individually dont require breaks. So they somehow got scheduled back to back and now they required a break due to the accumulated time. Or even if task B alr has a break, it now needs to be extended bc of task A. Solution that can be implemented: for the else block for the break calculating methods, consider if there are tasks immediately before and after this task. Then get the accumulated time and edit the break accordingly. To think about: How do you edit the breaks accordingly? What if the break cannot be extended? In this case, where will the carried over break be added?

// Reminder: Don't splice empty windows. They are are automatically removed by the insert and remove functions.

//TODO: Need to extend the initial window set up end timing according to the duration by which the tasks inserted by users exceed
class Scheduling {
    static generateSchedule(emptyWindowArr, fixedWindowArr, nonFixedWindowArr, nonFixedWindowPriorityArr) {
        this.emptyWindowArr = emptyWindowArr;
        this.fixedWindowArr = fixedWindowArr;
        this.nonFixedWindowArr = nonFixedWindowArr;
        this.nonFixedWindowPriorityArr = nonFixedWindowPriorityArr;

        //PART 1: SETTING UP BREAKS FOR FIXED TASKS
        let k;
        for (k = 0; k < this.fixedWindowArr.length; k++) {
            // Curr fixed task for which the break is to be added
            let currWindow = this.fixedWindowArr[k];
            // Curr fixed task start and end time
            let currStartTime = currWindow.getStartTime();
            let currEndTime = currWindow.getEndTime();
            // Calculating the break duration for the curr fixed task
            let currBreakDuration = Time.calculateBreak(currStartTime, currEndTime);
            // Adding the break duration to the accumulated break time
            Break.accumulatedBreakTime += currBreakDuration; 

            let a;
            for (a = 0; a < this.emptyWindowArr.length; a++) {
                // Checking if there is a break immediately after this fixed task
                if (currEndTime.equals(this.emptyWindowArr[a].getStartTime())) {
                    // If the accumulated break time is > 30 mins, we can only allocate a max of 30 mins break at any one time
                    if (Break.accumulatedBreakTime > 30) {
                        // If accumulated break time is >= 30 mins but the empty window is < than the 30 mins
                        if (Time.duration(this.emptyWindowArr[a].getStartTime(), this.emptyWindowArr[a].getEndTime()) < 30) {
                            // Create a break for whatever time there is 
                            let newBreak = new Window("Break", currWindow.getYear(), currWindow.getMonth(), currWindow.getDate(), this.emptyWindowArr[a].getStartTime(), this.emptyWindowArr[a].getEndTime(), 1);
                        
                            newBreak.insertWindow();
    
                            // Remove the allocated break time from the accumulated break time
                            Break.prototype.accumulatedBreakTime -= Time.duration(this.emptyWindowArr[a].getStartTime(), this.emptyWindowArr[a].getEndTime());
                        
                        // If accumulated break time is >= 30 mins but the empty window is < than the 30 mins
                        } else {
                            // Just schedule a 30 mins break. Since it is posssible that the time available in the curr empty window > 30 mins, find the time at the end of the 30 mins break (this applies to empty windows >= 30 mins)
                            let endTime = Time.findEndTime(this.emptyWindowArr[a].getStartTime(), [0, 30]);
                            let newBreak = new Window("Break", currWindow.getYear(), currWindow.getMonth(), currWindow.getDate(), this.emptyWindowArr[a].getStartTime(), endTime, 1);

                            newBreak.insertWindow();
                            
                            // Remove the allocated break time from the accumulated break time
                            Break.prototype.accumulatedBreakTime -= 30;
                        }
                    // If accumulated break time is <= 30 mins but the empty window is < than the accumualted break time
                    } else if (Time.duration(this.emptyWindowArr[a].getStartTime(), this.emptyWindowArr[a].getEndTime()) < Break.accumulatedBreakTime) {
                        // Just assign the whole window to be a break window
                        let newBreak = new Window("Break", currWindow.getYear(), currWindow.getMonth(), currWindow.getDate(), this.emptyWindowArr[a].getStartTime(), this.emptyWindowArr[a].getEndTime(), 1);
                        
                        newBreak.insertWindow();
                        
                        // Remove the allocated break time from the accumulated break time
                        Break.prototype.accumulatedBreakTime -= Time.duration(this.emptyWindowArr[a].getStartTime(), this.emptyWindowArr[a].getEndTime());
                    // If accumulated break time is <= 30 mins and empty window >= accumulated break time
                    } else {
                        // Since it is posssible that the duration available in the curr empty window > accumulated break duratoin, find the time at the end of accumulated the break 
                        let endTime = Time.findEndTime(this.emptyWindowArr[a].getStartTime(), [0, Break.prototype.accumulatedBreakTime]);

                        let newBreak = new Window("Break", currWindow.getYear(), currWindow.getMonth(), currWindow.getDate(), this.emptyWindowArr[a].getStartTime(), endTime, 1);

                        newBreak.insertWindow();
                        Break.prototype.accumulatedBreakTime = 0; // Since all of the accumulated break time has been allocated, this can now be updated to 0
                    }
                }
            }
        }

        // PART 2: SCHEDULING THE NON-FIXED TASKS CONNECTED TO FIXED TASKS
        let currArr = this.nonFixedWindowPriorityArr;
        // For every non-fixed task connected to a fixed task
        while (currArr.length != 0) {
            let currFixedTaskIndex = 0;
            // Finding the position of the fixed task
            while (this.fixedWindowArr[index].getTaskName() != currArr[0].getTaskAfterIt()) {
                currFixedTaskIndex++;
            }
            // Obtaining the start time of the fixed task in ms 
            let currFixedTaskStartTimeinMs = this.fixedWindowArr[currFixedTaskIndex].getStartTimeinMs;

            let currEmptyWinIndex = 0;
            // Finding the empty window right before this task
            while (this.emptyWindowArr[currEmptyWinIndex].getEndTimeInMs() < currFixedTaskStartTimeinMs) {
                currEmptyWinIndex++;
            }
            currEmptyWinIndex--; // Adjusting the index to the right index (because you would have incremented 1 after the right empty window)

            let firstTaskIndex = i;
            let lastTaskIndex = firstTask;
            // Finding the range of non-fixed tasks connected to the fixed task
            while (currArr[lastTaskIndex].getTaskAfterIt() == currArr[lastTaskIndex + 1].getTaskAfterIt()) {
                lastTaskIndex++;
            }
            
            let currTaskIndex = lastTaskIndex;
            // For every connected non-fixed task
            // If there are still non-fixed tasks that are connected to fixed tasks to be scheduled
            while (currTaskIndex >= firstTaskIndex && endIndex >= 0) {
                // Re-locate the empty window right before the fixed task
                while (currEmptyWinIndex >= 0 && this.nonFixedWindowPriorityArr[currTaskIndex].getEndTimeInMs() < this.fixedWindowArr[currFixedTaskIndex].getStartTimeInMs()) {
                    currEmptyWinIndex++;
                }
                while (currEmptyWinIndex >= 0 && this.nonFixedWindowPriorityArr[currTaskIndex].getEndTimeInMs() > this.fixedWindowArr[currFixedTaskIndex].getStartTimeInMs()) {
                    currEmptyWinIndex--;
                }
                if (currEmptyWinIndex < 0) {
                    window.alert("The duration before this specific fixed task is insufficient to schedule all the relevant connected fixed task")
                    currArr.splice(firstTaskIndex, lastTaskIndex - firstTaskIndex + 1);
                    break; // To quit this inner while-loop and continue on with the bigger while loop outside
                }
                // Obtain the curr non-fixed task to be scheduled
                let currTaskWindow = this.nonFixedWindowPriorityArr[currTaskIndex];

                // Obtaining the curr empty window
                let currEmptyWindow = this.emptyWindowArr[currEmptyWinIndex];
                // Start and end time of the curr empty window
                let currEmptyStartTime = currEmptyWindow.getStartTime();
                let currEmptyEndTime = currEmptyWindow.getEndTime();
                let currEmptyWindowDuration = Time.duration(currEmptyStartTime, currEmptyEndTime);

                // Calculating the duration of the curr non-fixed task window
                let currWorkDuration = Time.duration(currTaskWindow.getStartTime(), currTaskWindow.getEndTime());

                // Adding the break duration to the accumulated break time variable
                Break.prototype.accumulatedBreakTime += Break.calculateBreakFromDuration(currWorkDuration);

                // Ensuring that a maximum of only 30 mins is allocated to this break
                let breakDuration = Break.prototype.accumulatedBreakTime
                if (breakDuration > 30) {
                    breakDuration = 30
                }

                // If the duration of the curr work window + its break > duration of the empty window 
                if ((currWorkDuration[0] * 60) + currWorkDuration[1] + (breakDuration[0] * 60) + breakDuration[1] > (currEmptyWindowDuration[0] * 60) + currEmptyWindowDuration[1]) {
                    // 5/6 of the empty window would be for work, 1/6 for break. Do the necessary round ups. Update the task duration for this non-fixed task and the accumulated break time variable.
                    //TODO: Need to convert all durations to the [hours, mins] format
                    let workDuration = (((currEmptyWindowDuration[0] * 60) + currEmptyWindowDuration[1]) / 6) * 5;
                    let remainder = workDuration % 5;
                    if (workDuration % 5 < 2.5) {
                        workDuration = workDuration - remainder;
                    } else {
                        workDuration = workDuration - remainder + 5;
                    }
                    //Calculating the new break duration
                    breakDuration = currEmptyWindowDuration - workDuration;
                    let startTimeBreak = Time.findStartTime(currEmptyEndTime, [0, breakDuration]);

                    // Scheduling the task and break
                    let newBreak = new Window("Break", currTaskWindow.getYear(), currTaskWindow.getMonth(), currTaskWindow.getDate(), startTimeBreak, currEmptyEndTime, 1);
                    let newTask = new Window(currTaskWindow.getTaskName(), currTaskWindow.getYear(), currTaskWindow.getMonth(), currTaskWindow.getDate(), currEmptyStartTime, startTimeBreak, 1);

                    newTask.insertWindow();
                    newBreak.insertWindow();

                    // Updating the work duration and accumulated break duration accordingly for the current task. Also updating the accumulated durations for all connected tasks.
                    let newDuration = [0, 0]
                    if (currWorkDuration[1] - workDuration[1] < 0) {
                        let newMins = 60 - (workDuration[1] - currWorkDuration[1]);
                        let newHours = currWorkDuration[0] - workDuration[0] - 1;
                        newDuration = [newHours, newMins];
                    } else {
                        newDuration = [currWorkDuration[0] - workDuration[0], currWorkDuration[1] - workDuration[1]]
                    }

                    currTaskWindow.changeDuration(newDuration);

                    let pos = currTaskIndex;
                    let currTaskAfterIt = this.nonFixedWindowPriorityArr[currTaskIndex].getTaskAfterIt();
                    while (pos < this.nonFixedWindowPriorityArr.length && this.nonFixedWindowPriorityArr[pos].getTaskAfterIt() == currTaskAfterIt) {
                        let currAccumulatedDuration = this.nonFixedWindowPriorityArr[pos].getAccumulatedDuration();
                        if (currAccumulatedDuration[1] - workDuration[1] < 0) {
                            let newMins = 60 - (workDuration[1] - currAccumulatedDuration[1]);
                            let newHours = currAccumulatedDuration[0] - workDuration[0] - 1;
                            newDuration = [newHours, newMins];
                        } else {
                            newDuration = [currAccumulatedDuration[0] - workDuration[0], currAccumulatedDuration[1] - workDuration[1]]
                        }
                        this.nonFixedWindowPriorityArr[pos].changeAccumulatedDuration(newDuration);
                        pos++;
                    }
                    
                    // Updating the accumulated break time
                    Break.prototype.accumulatedBreakTime -= breakDuration;

                // If the duration of the curr work window + its break <= duration of the empty window 
                } else {
                    // Finding the start time of the break
                    let startTimeBreak = Time.findStartTime(currEmptyEndTime, [0, breakDuration]);
                    // Finding the start time of the task
                    let startTimeTask = Time.findStartTime(startTimeBreak, currWorkDuration);

                    // Schedule the task and break
                    let newBreak = new Window("Break", currTaskWindow.getYear(), currTaskWindow.getMonth(), currTaskWindow.getDate(), startTimeBreak, currEmptyEndTime, 1);
                    let newTask = new Window(currTaskWindow.getTaskName(), currTaskWindow.getYear(), currTaskWindow.getMonth(), currTaskWindow.getDate(), startTimeTask, startTimeBreak, 1);

                    newTask.insertWindow();
                    newBreak.insertWindow();

                    // Update the curr non-fixed task index
                    currTaskIndex--;
                    // Update accumulated break duration
                    Break.prototype.accumulatedBreakTime -= breakDuration;
                }
            }
            // Removing all scheduled, connected non-fixed tasks from the priority array
            currArr.splice(firstTaskIndex, lastTaskIndex - firstTaskIndex + 1)
        }


        //PART 3: SCHEDULING ALL NON-FIXED TASKS
        // While there are still empty windows and non-fixed tasks to be scheduled
        while (this.emptyWindowArr.length != 0 && this.nonFixedWindowArr.length != 0) {
            // Choosing the first task by default
            let currTaskIndex = 0;
            let chosenTask = this.nonFixedWindowArr[currTaskIndex];

            // Starting with the first empty window available
            let currEmpty = this.emptyWindowArr[0];
            // Calculating the duration of the first empty window
            let currEmptyDuration = Time.duration(currEmpty.getStartTime(), currEmpty.getEndTime());

            // While the currently chosen task + its required break is > the duration of the current empty window
            while ((chosenTask.getAccumulatedDuration()[0] * 60) + chosenTask.getAccumulatedDuration()[1]+ Break.calculateBreakFromDuration(taskDuration) > (currEmptyDuration[0] * 60) + currEmptyDuration[1]) {
                // Traverse through all the connected non-fixed tasks and choose the next non-fixed task that is not connected to the currently chosen taks
                while (currTaskIndex < this.nonFixedWindowArr.length && this.nonFixedWindowArr[currTaskIndex].getTaskAfterIt() == this.nonFixedWindowArr[currTaskIndex + 1].getTaskAfterIt()) {
                    currTaskIndex++
                }
            }

            // If all tasks + break combinations can't be fit into the curr empty window 
            if (currTaskIndex >= this.nonFixedWindowArr.length) {
                let taskIndex = 0;
                // If the curr empty window falls during the productivity period
                if (currEmpty.duringProductivePeriod()) {
                    // Check if the curr task type if "Fully work"/"Work". If you can't find that, try to find a "Partially work" type. Otherwise any type is okay. Do this in one traversal.
                    chosenTask = this.nonFixedWindowArr[taskIndex];
                    // If curr task is classified as "Partially work"
                    if (chosenTask.getType() == "Partially work") {
                        // Try to find tasks that are either "Fully work" or "Work"
                        while (this.nonFixedWindowArr[taskIndex].getType() != "Fully work" || this.nonFixedWindowArr[taskIndex].getType() != "Work") {
                            while (taskIndex < this.nonFixedWindowArr.length && this.nonFixedWindowArr[taskIndex].getTaskAfterIt() == this.nonFixedWindowArr[taskIndex + 1].getTaskAfterIt()) {
                                taskIndex++;
                            }
                        }
                        // If no tasks calssified as either "Fully work"  or "Work" can be found
                        if (taskIndex >= this.nonFixedWindowArr.length) {
                            taskIndex = 0;
                        }
                    // If the curr task is neither "Partially work", "Fully work" or "Work"
                    } else if (this.nonFixedWindowArr[taskIndex].getType() != "Partially work" || this.nonFixedWindowArr[taskIndex].getType() != "Fully work" || this.nonFixedWindowArr[taskIndex].getType() != "Work") {
                        // While the curr task is not classified as "Fully work" or "Work", keep traversing through all the relevant connected non-work tasks (To find a "Fully work" or "Work" task)
                        while (this.nonFixedWindowArr[taskIndex].getType() != "Fully work" || chosenTask.getType() != "Work") {
                            while (this.nonFixedWindowArr[taskIndex].getTaskAfterIt() == this.nonFixedWindowArr[taskIndex + 1].getTaskAfterIt()) {
                                taskIndex++;
                            }
                        }
                        if (taskIndex >= this.nonFixedWindowArr.length) {
                            taskIndex = 0;
                        }
                        // While the curr task is not classified as "Partially work", keep traversing through all the relevant connected non-work tasks (To find a "Partially work" task given that "Fully work" and "Work" tasks can't be found)
                        while (chosenTask.getType() != "Partially work") {
                            while (this.nonFixedWindowArr[taskIndex].getTaskAfterIt() == this.nonFixedWindowArr[taskIndex + 1].getTaskAfterIt()) {
                                taskIndex++;
                            }
                        }
                        if (taskIndex >= this.nonFixedWindowArr.length) {
                            taskIndex = 0;
                        }
                    }
                    currTaskIndex = taskIndex;
                    chosenTask = this.nonFixedWindowArr[taskIndex];
                // If the curr empty window falls during the non-productivity period
                } else {
                    // If the current tasks are classified as "Parially work", "Work" or "Fully work", try to find a task that does not belong in any of these categories
                    if (this.nonFixedWindowArr[taskIndex].getType() == "Partially work" || this.nonFixedWindowArr[taskIndex].getType() == "Fully work" || this.nonFixedWindowArr[taskIndex].getType() == "Work") {
                        while (this.nonFixedWindowArr[taskIndex].getType() == "Partially work" || this.nonFixedWindowArr[taskIndex].getType() == "Fully work" || this.nonFixedWindowArr[taskIndex].getType() == "Work") {
                            // Keep traversing through all the connected tasks
                            while (this.nonFixedWindowArr[taskIndex].getTaskAfterIt() == this.nonFixedWindowArr[taskIndex + 1].getTaskAfterIt()) {
                                taskIndex++;
                            }
                        }
                        if (taskIndex >= this.nonFixedWindowArr.length) {
                            taskIndex = 0;
                        }
                        // If unable to find a purely non-work related task, try to find a "Partially work" task instead
                        while (this.nonFixedWindowArr[taskIndex].getType() == "Fully work" || this.nonFixedWindowArr[taskIndex].getType() == "Work") {
                            while (this.nonFixedWindowArr[taskIndex].getTaskAfterIt() == this.nonFixedWindowArr[taskIndex + 1].getTaskAfterIt()) {
                                taskIndex++;
                            }
                        }
                        if (taskIndex >= this.nonFixedWindowArr.length) {
                            taskIndex = 0;
                        }
                    }
                    currTaskIndex = taskIndex;
                    chosenTask = this.nonFixedWindowArr[taskIndex];
                }
            // If there is at least a pair of task + break that can fit
            //TODO: I think can be simplified
            } else {
                let taskIndex = index;
                // If the curr empty window falls during the productivity period
                if (this.emptyWindowArr[0].duringProductivePeriod()) {
                    chosenTask = this.nonFixedWindowArr[taskIndex];
                    //If the curr task is only "Partially work" (exact same logic as before)
                    if (chosenTask.getType() == "Partially work") {
                        taskIndex = 0; //It is okay to break up tasks bc we really want a work task for productive period
                        // Search for a task classified as "Fully work" or "work"
                        while (this.nonFixedWindowArr[taskIndex].getType() != "Fully work" || this.nonFixedWindowArr[taskIndex].getType() != "Work") {
                            // Traverse through all the relevant connected non-fixed tasks
                            while (this.nonFixedWindowArr[taskIndex].getTaskAfterIt() == this.nonFixedWindowArr[taskIndex + 1].getTaskAfterIt()) {
                                taskIndex++;
                            }
                        }
                        if (taskIndex >= this.nonFixedWindowArr.length) {
                            taskIndex = index;
                        }
                    // If curr task is in none of the work categories
                    } else if (this.nonFixedWindowArr[taskIndex].getType() != "Partially work" || this.nonFixedWindowArr[taskIndex].getType() != "Fully work" || this.nonFixedWindowArr[taskIndex].getType() != "Work") {
                        taskIndex = 0;
                        // Try to find for a task that is "Partially work" or "Work" first
                        while (this.nonFixedWindowArr[taskIndex].getType() != "Fully work" || chosenTask.getType() != "Work") {
                            while (this.nonFixedWindowArr[taskIndex].getTaskAfterIt() == this.nonFixedWindowArr[taskIndex + 1].getTaskAfterIt()) {
                                taskIndex++;
                            }
                        }
                        if (taskIndex >= this.nonFixedWindowArr.length) {
                            taskIndex = 0;
                        }
                        // Try to find a task that is at least "Partially work"
                        while (chosenTask.getType() != "Partially work") {
                            while (this.nonFixedWindowArr[taskIndex].getTaskAfterIt() == this.nonFixedWindowArr[taskIndex + 1].getTaskAfterIt()) {
                                taskIndex++;
                            }
                            taskIndex++;
                        }
                        if (taskIndex >= this.nonFixedWindowArr.length) {
                            taskIndex = index;
                        }
                    }
                // If non-productive period
                } else {
                    // If the task is in one of the work categories, traverse till you can find a non-work related one 
                    if (this.nonFixedWindowArr[taskIndex].getType() == "Partially work" || this.nonFixedWindowArr[taskIndex].getType() == "Fully work" || this.nonFixedWindowArr[taskIndex].getType() == "Work") {
                        while (this.nonFixedWindowArr[taskIndex].getType() == "Partially work" || this.nonFixedWindowArr[taskIndex].getType() == "Fully work" || this.nonFixedWindowArr[taskIndex].getType() == "Work") {
                            while (this.nonFixedWindowArr[taskIndex].getTaskAfterIt() == this.nonFixedWindowArr[taskIndex + 1].getTaskAfterIt()) {
                                taskIndex++;
                            }
                        }
                        if (taskIndex >= this.nonFixedWindowArr.length) {
                            taskIndex = index;
                        }
                        // If that's not possible, try to find a task that is just "Partially work"
                        while (this.nonFixedWindowArr[taskIndex].getType() == "Fully work" || this.nonFixedWindowArr[taskIndex].getType() == "Work") {
                            while (this.nonFixedWindowArr[taskIndex].getTaskAfterIt() == this.nonFixedWindowArr[taskIndex + 1].getTaskAfterIt()) {
                                taskIndex++;
                            }
                        }
                        if (taskIndex >= this.nonFixedWindowArr.length) {
                            taskIndex = index;
                        }
                    }
                }
                currTaskIndex = taskIndex;
                chosenTask = this.nonFixedWindowArr[taskIndex];
            }
            //let chosenTaskAccumulatedDuration = chosenTask.getAccumulatedDuration();
            let startIndex = currTaskIndex;
            let endIndex = currTaskIndex;
            // Finding all the connected non-fixed tasks
            while (this.nonFixedWindowArr[startIndex].getTaskAfterIt() == this.nonFixedWindowArr[startIndex + 1].getTaskAfterIt()) {
                endIndex++;
            }

            // Scheduling all the connected non-fixed tasks
            let h;
            for (h = startIndex; h <= endIndex; h++) {
                let currEmptyWindowDuration = Time.duration(this.emptyWindowArr[0].getStartTime(), this.emptyWindowArr[0].getEndTime());
                let chosenTaskIndivDuration = this.nonFixedWindowArr[h].getIndivDuration();
                Break.prototype.accumulatedBreakTime += Break.calculateBreakFromDuration(chosenTaskIndivDuration);
                let breakDuration = Break.prototype.accumulatedBreakTime;
                if (breakDuration > 30) {
                    breakDuration = 30;
                }

                // Check if the duration of the chosen task + break <= duration of empty window (if connected task, just check for the very first task). If <=, schedule the task and break. Pop off the task. 
                if ((chosenTaskIndivDuration[0] * 60) + chosenTaskIndivDuration[1] + breakDuration  <= (currEmptyWindowDuration[0] * 60) + currEmptyWindowDuration[1]) {
                    // Find the end time of the task
                    let taskEndTime = Time.findEndTime(this.emptyWindowArr[0].getStartTime(), chosenTaskIndivDuration);
                    // Find the end time of the break
                    let breakEndTime = Time.findEndTime(taskEndTime, breakDuration);

                    // Schedule the task and break
                    let newTask = new Window(this.nonFixedWindowArr[h].getTaskName(), this.nonFixedWindowArr[h].getTaskName().getYear(), this.nonFixedWindowArr[h].getMonth(), this.nonFixedWindowArr[h].getDate(), this.emptyWindowArr[0].getStartTime(), taskEndTime, 1);
                    let newBreak = new Window("Break", this.nonFixedWindowArr[h].getYear(), this.nonFixedWindowArr[h].getMonth(), this.nonFixedWindowArr[h].getDate(), taskEndTime, breakEndTime, 1);

                    newTask.insertWindow();
                    newBreak.insertWindow();
                    // Update the accumulated break duration accordingly
                    Break.prototype.accumulatedBreakTime -= breakDuration;

                // chosenTaskAccumulatedDuration + breakDuration  > currEmptyDuration
                } else {
                    // 5/6 of the empty window would be for work, 1/6 for break. Do the necessary round ups. Update the task duration for this non-fixed task and the accumulated break time variable.
                    let workDuration = ((currEmptyWindowDuration[0] * 60) + currEmptyWindowDuration[1] / 6) * 5;
                    let remainder = workDuration % 5;
                    if (workDuration % 5 < 2.5) {
                        workDuration = workDuration - remainder;
                    } else {
                        workDuration = workDuration - remainder + 5;
                    }
                    breakDuration = currEmptyWindowDuration - workDuration;
                    let taskEndTime = Time.findEndTime(this.emptyWindowArr[0].getStartTime(), workDuration);

                    // Scheduling the task and break
                    let newTask = new Window(this.nonFixedWindowArr[h].getTaskName(), this.nonFixedWindowArr[h].getYear(), this.nonFixedWindowArr[h].getMonth(), this.nonFixedWindowArr[h].getDate(), this.emptyWindowArr[0].getStartTime(), taskEndTime, 1);
                    let newBreak = new Window("Break", this.nonFixedWindowArr[h].getYear(), this.nonFixedWindowArr[h].getMonth(), this.nonFixedWindowArr[h].getDate(), taskEndTime, this.emptyWindowArr[0].getEndTime(), 1);

                    newTask.insertWindow();
                    newBreak.insertWindow();

                    // Updating the work duration and accumulated break duration accordingly
                    let newDuration = [0, 0]
                    if (currEmptyWindowDuration[1] - workDuration[1] < 0) {
                        let newMins = 60 - (workDuration[1] - currEmptyWindowDuration[1]);
                        let newHours = currEmptyWindowDuration[0] - workDuration[0] - 1;
                        newDuration = [newHours, newMins];
                    } else {
                        newDuration = [currEmptyWindowDuration[0] - workDuration[0], currEmptyWindowDuration[1] - workDuration[1]]
                    }

                    this.nonFixedWindowArr[h].changeDuration(newDuration);

                    let pos = h;
                    let currTaskAfterIt = this.nonFixedWindowArr[h].getTaskAfterIt();
                    while (pos < this.nonFixedWindowArr.length && this.nonFixedWindowArr[pos].getTaskAfterIt() == currTaskAfterIt) {
                        let currAccumulatedDuration = this.nonFixedWindowArr[pos].getAccumulatedDuration();
                        if (currAccumulatedDuration[1] - workDuration[1] < 0) {
                            let newMins = 60 - (workDuration[1] - currAccumulatedDuration[1]);
                            let newHours = currAccumulatedDuration[0] - workDuration[0] - 1;
                            newDuration = [newHours, newMins];
                        } else {
                            newDuration = [currAccumulatedDuration[0] - workDuration[0], currAccumulatedDuration[1] - workDuration[1]]
                        }
                        this.nonFixedWindowArr[pos].changeAccumulatedDuration(newDuration);
                        pos++;
                    }

                    Break.prototype.accumulatedBreakTime -= breakDuration;

                    if (h == endIndex) {
                        this.nonFixedWindowArr.splice(h, endIndex - startIndex + 1);
                        h++;
                    }
                }
            }
            this.nonFixedWindowArr.splice(startIndex, endIndex - startIndex + 1);
        }
        // Returning the final schedule as the output
        return this.fixedWindowArr;
    }
}

//PREVIOUS PART 2 WORKING FOR REFERENCE JIC
/*
                // Start time of the current empty window in ms
                let windowStartTimeInMs = currWindow.getStartTimeinMs();
                // Calculating the start time of the non-fixed task to be scheduled
                let currStartTime = Time.findStartTime(currEndTime, currArr[currTask].getAccumulatedDuration() + Break.calculateBreakFromDuration(currArr[currTask].getAccumulatedDuration())); //TODO: Create the findStartTime and Break.calculateBreakFromDuration methods

                let currStartTimeInMs = new Date(currWindow.getYear(), currArr[currTask].getMonth(), currArr[currTask].getDate(), currStartTime[0], currStartTime[1]); // Assuming startTime = [hours, mins]
                if (currStartTimeInMs < windowStartTimeInMs) {
                    let maxDuration = Time.duration(currWindow.getStartTime(), currEndTime);
                    let taskEndTime = Time.findEndTime(currWindow.getStartTime(), maxDuration - Break.calculateBreakFromDuration(maxDuration));

                    let newTask = new Window(currArr[currTask].getTaskName(), currWindow.getYear(), currArr[currTask].getMonth(), currArr[currTask].getDate(), currWindow.getStartTime(), taskEndTime, 1);

                    let newBreak = new Window("Break", currWindow.getYear(), currArr[currTask].getMonth(), currArr[currTask].getDate(), taskEndTime, currEndTime, 1);

                    newTask.insertWindow();
                    newBreak.insertWindow();

                    currTask.changeAccumulatedDuration(currTask.getAccumulatedDuration - maxDuration);
                    endIndex--;
                } else {
                    let taskEndTime = Time.findEndTime(currWindow.getStartTime(), currArr[currTask].getAccumulatedDuration()); // cannot be accumulated duration here, maybe a param to maintain the individual duration too? //TODO: Update this accordingly

                    let newTask = new Window(currArr[currTask].getTaskName(), currWindow.getYear(), currArr[currTask].getMonth(), currArr[currTask].getDate(), currWindow.getStartTime(), taskEndTime, 1);

                    let newBreak = new Window("Break", currWindow.getYear(), currArr[currTask].getMonth(), currArr[currTask].getDate(), taskEndTime, currEndTime, 1); //based on the old constructor for Window

                    newTask.insertWindow();
                    newBreak.insertWindow();

                    currArr.splice(currTask, 1);
                    currTask--;
                    currEndTime = startTime;
                }
*/
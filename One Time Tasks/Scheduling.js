// Dont need to do the group thing if you can just copy and past the name of the task that you are following (meaning all the tasks in the same group will have the same 'taskAfterIt')

// Don't add breaks after the last activity for the day (and before sleeping)

// Need to consider the following case: Lets say both task A and task B individually dont require breaks. So they somehow got scheduled back to back and now they required a break due to the accumulated time. Or even if task B alr has a break, it now needs to be extended bc of task A. Solution that can be implemented: for the else block for the break calculating methods, consider if there are tasks immediately before and after this task. Then get the accumulated time and edit the break accordingly. To think about: How do you edit the breaks accordingly? What if the break cannot be extended? In this case, where will the carried over break be added?

// Reminder: Don't splice empty windows. They are are automatically removed by the insert and remove functions.
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
            Break.accumulatedBreakTime += currBreakDuration; //TODO: Update according to the format of the durations

            let a;
            for (a = 0; a < this.emptyWindowArr.length; a++) {
                // Checking if there is a break immediately after this fixed task
                if (currEndTime.equals(this.emptyWindowArr[a].getStartTime())) {
                    // If the accumulated break time is > 30 mins, we can only allocate a max of 30 mins break at any one time
                    if (Break.accumulatedBreakTime > 30) { //TODO: Update according to the format of the durations
                        // If the curr empty window itself is < 30 mins
                        if (Time.duration(this.emptyWindowArr[a].getStartTime(), this.emptyWindowArr[a].getEndTime()) < 30) {
                            let newBreak = new Window("Break", currWindow.getYear(), currWindow.getMonth(), currWindow.getDate(), this.emptyWindowArr[a].getStartTime(), this.emptyWindowArr[a].getEndTime(), 1);
                        
                            newBreak.insertWindow();
    
                            Break.prototype.accumulatedBreakTime -= Time.duration(this.emptyWindowArr[a].getStartTime(), this.emptyWindowArr[a].getEndTime());
                        // Just schedule a 30 mins break
                        } else {
                            // TODO: Update the duration format accordingly. Create the findEndTime method
                            let endTime = Time.findEndTime(this.emptyWindowArr[a].getStartTime(), 30);
                            let newBreak = new Window("Break", currWindow.getYear(), currWindow.getMonth(), currWindow.getDate(), this.emptyWindowArr[a].getStartTime(), endTime, 1);

                            newBreak.insertWindow();

                            Break.prototype.accumulatedBreakTime -= 30;
                        }
                    // If accumulated break time is <= 30 mins but the empty window is < than the accumualted break time
                    } else if (Time.duration(this.emptyWindowArr[a].getStartTime(), this.emptyWindowArr[a].getEndTime()) < Break.accumulatedBreakTime) {
                        let newBreak = new Window("Break", currWindow.getYear(), currWindow.getMonth(), currWindow.getDate(), this.emptyWindowArr[a].getStartTime(), this.emptyWindowArr[a].getEndTime(), 1);
                        
                        newBreak.insertWindow();

                        Break.prototype.accumulatedBreakTime -= Time.duration(this.emptyWindowArr[a].getStartTime(), this.emptyWindowArr[a].getEndTime());
                    // If accumulated break time is <= 30 mins and empty window >= accumulated break time
                    } else {
                        // TODO: Update the duration format accordingly. Create the findEndTime method
                        let endTime = Time.findEndTime(this.emptyWindowArr[a].getStartTime(), Break.prototype.accumulatedBreakTime);

                        let newBreak = new Window("Break", currWindow.getYear(), currWindow.getMonth(), currWindow.getDate(), this.emptyWindowArr[a].getStartTime(), endTime, 1);

                        newBreak.insertWindow();

                        Break.prototype.accumulatedBreakTime = 0;
                    }
                }
            }
        }

        // PART 2: SCHEDULING THE NON-FIXED TASKS CONNECTED TO FIXED TASKS
        let currArr = this.nonFixedWindowPriorityArr;
        // For every non-fixed task connected to a fixed task
        while (currArr.length != 0) {
            let index = 0;
            // Finding the position of the fixed task
            while (this.fixedWindowArr[index].getTaskName() != currArr[0].getTaskName()) {
                index++;
            }
            // Start time of the fixed task 
            let startTime = this.fixedWindowArr[index].getStartTimeinMs;
            let endIndex = 0;
            // Finding the empty window right before this task (strictly < than or can be = to ??)
            while (this.emptyWindowArr[endIndex].getEndTimeInMs() < startTime) {
                endIndex++;
            }
            let startIndex = endIndex;

            // Duration of the current empty window
            let durOfCurrWindow = Time.duration(this.emptyWindowArr[startIndex].getStartTime(), this.emptyWindowArr[startIndex].getEndTime());
            // Finding the range of empty windows needs to schedule the connected non-fixed tasks
            while (startIndex > 0 && durOfCurrWindow < currArr[0].getAccumulatedDuration() + Break.calculateBreakFromDuration(currArr[i].getAccumulatedDuration())) {
                durOfCurrWindow = durOfCurrWindow + Time.duration(this.emptyWindowArr[startIndex - 1].getStartTime(), this.emptyWindowArr[startIndex - 1].getEndTime())
                startIndex--;
            }

            let firstTask = i;
            let lastTask = firstTask;
            // Finding the range of non-fixed tasks connected to the fixed task
            //TODO: Create the getTaskAfterIt method. Must make sure that the 'getTaskAfterIt' is updated accordingly
            while (currArr[lastTask].getTaskAfterIt() == currArr[lastTask + 1].getTaskAfterIt()) {
                lastTask++;
            }
            
            let currTask = lastTask;
            // For every connected non-fixed task
                //for (currTask = lastTask; currTask >= firstTask; currTask--) {
            //TODO: May not be able to just track using the indices as we will add and remove the empty windows, instead might need to track using the start time of the current window
            while (currTask >= firstTask && endIndex >= startIndex) {
                // Curr empty window
                let currEmptyWindow = this.emptyWindowArr[endIndex];
                let currTaskWindow = this.nonFixedWindowPriorityArr[currTask];
                // Start and end time of the curr empty window
                let currEmptyStartTime = currWindow.getStartTime();
                let currEmptyEndTime = currWindow.getEndTime();
                let currEmptyWindowDuration = Time.duration(currEmptyWindow.getStartTime(), currEmptyWindow.getEndTime());
                // Calculating the duration of the curr work window
                let currWorkDuration = Time.duration(currTaskWindow.getStartTime(), currTaskWindow.getEndTime());
                // Adding the break duration to the accumulated break time variable
                Break.prototype.accumulatedBreakTime += Time.calculateBreakFromDuration(currWorkDuration);
                // If the duration of the curr work window + its break > duration of the empty window 
                if (currWorkDuration + Break.prototype.accumulatedBreakTime > currEmptyWindowDuration) {
                    // 5/6 of the empty window would be for work, 1/6 for break. Do the necessary round ups. Update the task duration for this non-fixed task and the accumulated break time variable.
                    let workDuration = (currEmptyWindowDuration / 6) * 5;
                    let remainder = workDuration % 5;
                    if (workDuration % 5 < 2.5) {
                        workDuration = workDuration - remainder;
                    } else {
                        workDuration = workDuration - remainder + 5;
                    }
                    let breakDuration = currEmptyWindowDuration - workDuration;
                    let startTimeBreak = Time.findStartTime(currEmptyEndTime, breakDuration);

                    // Scheduling the task and break
                    let newBreak = new Window("Break", currTaskWindow.getYear(), currTaskWindow.getMonth(), currTaskWindow.getDate(), startTimeBreak, currEmptyEndTime, 1);
                    let newTask = new Window(currTaskWindow.getTaskName(), currTaskWindow.getYear(), currTaskWindow.getMonth(), currTaskWindow.getDate(), currEmptyStartTime, startTimeBreak, 1);

                    newTask.insertWindow();
                    newBreak.insertWindow();

                    // Updating the work duration and accumulated break duration accordingly
                    //TODO: Create the changeDuration method and pass in the correct argument
                    currTaskWindow.changeDuration(currWorkDuration - workDuration);
                    Break.prototype.accumulatedBreakTime -= breakDuration;
                    // Decrease the end index for empty windows by 1
                    endIndex--;

                // If the duration of the curr work window + its break <= duration of the empty window 
                } else {
                    let startTimeBreak = Time.findStartTime(currEmptyEndTime, Break.prototype.accumulatedBreakTime);
                    let startTimeTask = Time.findStartTime(startTimeBreak, workDuration);
                    // Schedule the task and break
                    let newBreak = new Window("Break", currTaskWindow.getYear(), currTaskWindow.getMonth(), currTaskWindow.getDate(), startTimeBreak, currEmptyEndTime, 1);
                    let newTask = new Window(currTaskWindow.getTaskName(), currTaskWindow.getYear(), currTaskWindow.getMonth(), currTaskWindow.getDate(), startTimeTask, startTimeBreak, 1);

                    newTask.insertWindow();
                    newBreak.insertWindow();

                    // Pop out the task from the array, decrease the end index for tasks by 1 and update the break time variable to 0
                    this.nonFixedWindowPriorityArr.splice(currTask, 1);
                    currTask--;
                    if (startTimeTask.equals(currEmptyStartTime)) {
                        endIndex--;
                    }
                    Break.prototype.accumulatedBreakTime = 0;
                }
            }
        }


        //PART 3: SCHEDULING ALL NON-FIXED TASKS
        //TODO: Change the for loop into a while loop
        while (this.emptyWindowArr.length != 0 && this.nonFixedWindowArr.length != 0) {
            let index = 0;
            let chosenTask = this.nonFixedWindowArr[index];
            let currEmpty = this.emptyWindowArr[0];
            let currEmptyDuration = Time.duration(currEmpty.getStartTime(), currEmpty.getEndTime());

            while (chosenTask.getAccumulatedDuration() + Break.calculateBreakFromDuration(taskDuration) > currEmptyDuration) {
                while (index < this.nonFixedWindowArr.length && chosenTask.getTaskAfterIt() == this.nonFixedWindowArr[index + 1].getTaskAfterIt()) {
                    index++;
                    chosenTask = this.nonFixedWindowArr[index];
                }
                index++; //Bc the last connected task won't have a name for the 'getTaskAfterIt' field
            }

            // If all tasks + break combinations can't be fit into the curr window 
            if (index >= this.nonFixedWindowArr.length) {
                let taskIndex = 0;
                // If the curr empty window falls during the productivity period
                //TODO: Create the duringProductivePeriod() method
                if (this.emptyWindowArr[0].duringProductivePeriod()) {
                    // Check if the curr task type if "Fully work"/"Work". If you can't find that, try to find a "Partially work" type. Otherwise any type is okay. Do this in one traversal.
                    //chosenTask = this.nonFixedWindowArr[taskIndex];
                    if (chosenTask.getType() == "Partially work") {
                        while (this.nonFixedWindowArr[taskIndex].getType() != "Fully work" || this.nonFixedWindowArr[taskIndex].getType() != "Work") {
                            while (this.nonFixedWindowArr[taskIndex].getTaskAfterIt() == this.nonFixedWindowArr[taskIndex + 1].getTaskAfterIt()) {
                                taskIndex++;
                            }
                            taskIndex++;
                        }
                        if (taskIndex >= this.nonFixedWindowArr.length) {
                            taskIndex = 0;
                        }
                    } else if (this.nonFixedWindowArr[taskIndex].getType() != "Partially work" || this.nonFixedWindowArr[taskIndex].getType() != "Fully work" || this.nonFixedWindowArr[taskIndex].getType() != "Work") {
                        while (this.nonFixedWindowArr[taskIndex].getType() != "Fully work" || chosenTask.getType() != "Work") {
                            while (this.nonFixedWindowArr[taskIndex].getTaskAfterIt() == this.nonFixedWindowArr[taskIndex + 1].getTaskAfterIt()) {
                                taskIndex++;
                            }
                            taskIndex++;
                        }
                        if (taskIndex >= this.nonFixedWindowArr.length) {
                            taskIndex = 0;
                        }
                        while (chosenTask.getType() != "Partially work") {
                            while (this.nonFixedWindowArr[taskIndex].getTaskAfterIt() == this.nonFixedWindowArr[taskIndex + 1].getTaskAfterIt()) {
                                taskIndex++;
                            }
                            taskIndex++;
                        }
                        if (taskIndex >= this.nonFixedWindowArr.length) {
                            taskIndex = 0;
                        }
                    }
                // If non-productive period
                } else {
                    if (this.nonFixedWindowArr[taskIndex].getType() == "Partially work" || this.nonFixedWindowArr[taskIndex].getType() == "Fully work" || this.nonFixedWindowArr[taskIndex].getType() == "Work") {
                        while (this.nonFixedWindowArr[taskIndex].getType() == "Partially work" || this.nonFixedWindowArr[taskIndex].getType() == "Fully work" || this.nonFixedWindowArr[taskIndex].getType() == "Work") {
                            while (this.nonFixedWindowArr[taskIndex].getTaskAfterIt() == this.nonFixedWindowArr[taskIndex + 1].getTaskAfterIt()) {
                                taskIndex++;
                            }
                            taskIndex++;
                        }
                        if (taskIndex >= this.nonFixedWindowArr.length) {
                            taskIndex = 0;
                        }
                        while (this.nonFixedWindowArr[taskIndex].getType() == "Fully work" || this.nonFixedWindowArr[taskIndex].getType() == "Work") {
                            while (this.nonFixedWindowArr[taskIndex].getTaskAfterIt() == this.nonFixedWindowArr[taskIndex + 1].getTaskAfterIt()) {
                                taskIndex++;
                            }
                            taskIndex++;
                        }
                        if (taskIndex >= this.nonFixedWindowArr.length) {
                            taskIndex = 0;
                        }
                    }
                }
            // If there is at least a pair of task + break that can fit
            //TODO: I think can be simplified
            } else {
                let taskIndex = index;
                // If the curr empty window falls during the productivity period
                //TODO: Create the duringProductivePeriod() method
                if (this.emptyWindowArr[0].duringProductivePeriod()) {
                    // Check if the curr task type if "Fully work"/"Work". If you can't find that, try to find a "Partially work" type. Otherwise any type is okay. Do this in one traversal.
                    //chosenTask = this.nonFixedWindowArr[taskIndex];
                    if (chosenTask.getType() == "Partially work") {
                        while (this.nonFixedWindowArr[taskIndex].getType() != "Fully work" || this.nonFixedWindowArr[taskIndex].getType() != "Work") {
                            while (this.nonFixedWindowArr[taskIndex].getTaskAfterIt() == this.nonFixedWindowArr[taskIndex + 1].getTaskAfterIt()) {
                                taskIndex++;
                            }
                            taskIndex++;
                        }
                        if (taskIndex >= this.nonFixedWindowArr.length) {
                            taskIndex = index;
                        }
                    } else if (this.nonFixedWindowArr[taskIndex].getType() != "Partially work" || this.nonFixedWindowArr[taskIndex].getType() != "Fully work" || this.nonFixedWindowArr[taskIndex].getType() != "Work") {
                        while (this.nonFixedWindowArr[taskIndex].getType() != "Fully work" || chosenTask.getType() != "Work") {
                            while (this.nonFixedWindowArr[taskIndex].getTaskAfterIt() == this.nonFixedWindowArr[taskIndex + 1].getTaskAfterIt()) {
                                taskIndex++;
                            }
                            taskIndex++;
                        }
                        if (taskIndex >= this.nonFixedWindowArr.length) {
                            taskIndex = index;
                        }
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
                    if (this.nonFixedWindowArr[taskIndex].getType() == "Partially work" || this.nonFixedWindowArr[taskIndex].getType() == "Fully work" || this.nonFixedWindowArr[taskIndex].getType() == "Work") {
                        while (this.nonFixedWindowArr[taskIndex].getType() == "Partially work" || this.nonFixedWindowArr[taskIndex].getType() == "Fully work" || this.nonFixedWindowArr[taskIndex].getType() == "Work") {
                            while (this.nonFixedWindowArr[taskIndex].getTaskAfterIt() == this.nonFixedWindowArr[taskIndex + 1].getTaskAfterIt()) {
                                taskIndex++;
                            }
                            taskIndex++;
                        }
                        if (taskIndex >= this.nonFixedWindowArr.length) {
                            taskIndex = index;
                        }
                        while (this.nonFixedWindowArr[taskIndex].getType() == "Fully work" || this.nonFixedWindowArr[taskIndex].getType() == "Work") {
                            while (this.nonFixedWindowArr[taskIndex].getTaskAfterIt() == this.nonFixedWindowArr[taskIndex + 1].getTaskAfterIt()) {
                                taskIndex++;
                            }
                            taskIndex++;
                        }
                        if (taskIndex >= this.nonFixedWindowArr.length) {
                            taskIndex = index;
                        }
                    }
                }
            }
            chosenTask = this.nonFixedWindowArr[taskIndex];
            //let chosenTaskAccumulatedDuration = chosenTask.getAccumulatedDuration();
            let startIndex = taskIndex;
            let endIndex = startIndex;
            while (this.nonFixedWindowArr[startIndex].getTaskAfterIt() == this.nonFixedWindowArr[startIndex + 1].getTaskAfterIt()) {
                endIndex++;
            }
            let h;
            for (h = startIndex; h <= endIndex; h++) {
            //TODO: Create the method getIndivDuration
                let currEmptyWindowDuration = Time.duration(this.emptyWindowArr[0].getStartTime(), this.emptyWindowArr[0].getEndTime());
                let chosenTaskIndivDuration = this.nonFixedWindowArr[h].getIndivDuration();
                Break.prototype.accumulatedBreakTime += Break.calculateBreakFromDuration(chosenTaskIndivDuration);
                let breakDuration = Break.prototype.accumulatedBreakTime;
                if (breakDuration > 30) {
                    breakDuration = 30;
                }

                // Check if the duration of the chosen task + break <= duration of empty window (if connected task, just check for the very first task). If <=, schedule the task and break. Pop off the task. 
                if (chosenTaskIndivDuration + breakDuration  <= currEmptyWindowDuration) {
                    //TODO: Create the methods findEndTime and getIndivDuration
                    let taskEndTime = Time.findEndTime(this.emptyWindowArr[0].getStartTime(), chosenTaskIndivDuration);
                    let breakEndTime = Time.findEndTime(taskEndTime, breakDuration);

                    let newTask = new Window(this.nonFixedWindowArr[h].getTaskName(), this.nonFixedWindowArr[h].getTaskName().getYear(), this.nonFixedWindowArr[h].getMonth(), this.nonFixedWindowArr[h].getDate(), this.emptyWindowArr[0].getStartTime(), taskEndTime, 1);
                    let newBreak = new Window("Break", this.nonFixedWindowArr[h].getYear(), this.nonFixedWindowArr[h].getMonth(), this.nonFixedWindowArr[h].getDate(), taskEndTime, breakEndTime, 1);

                    newTask.insertWindow();
                    newBreak.insertWindow();

                    if (h == endIndex) {
                        this.nonFixedWindowArr.splice(h, endIndex - startIndex + 1);
                        h++;
                    } else {
                        h++;
                    }
                    Break.prototype.accumulatedBreakTime -= breakDuration;

                // chosenTaskAccumulatedDuration + breakDuration  > currEmptyDuration
                } else {
                    // 5/6 of the empty window would be for work, 1/6 for break. Do the necessary round ups. Update the task duration for this non-fixed task and the accumulated break time variable.
                    let workDuration = (currEmptyWindowDuration / 6) * 5;
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
                    //TODO: Create the changeDuration method and pass in the correct argument
                    this.nonFixedWindowArr[h].changeDuration(currWorkDuration - workDuration);
                    Break.prototype.accumulatedBreakTime -= breakDuration;

                    if (h == endIndex) {
                        this.nonFixedWindowArr.splice(h, endIndex - startIndex + 1);
                        h++;
                    }
                }
            }
        }
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
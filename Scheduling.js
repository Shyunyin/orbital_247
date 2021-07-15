// Dont need to do the group thing if you can just copy and past the name of the task that you are following (meaning all the tasks in the same group will have the same 'taskAfterIt')

// Don't add breaks after the last activity for the day (and before sleeping)

//TODO: Need to consider the following case: Lets say both task A and task B individually dont require breaks. So they somehow got scheduled back to back and now they required a break due to the accumulated time. Or even if task B alr has a break, it now needs to be extended bc of task A. Solution that can be implemented: for the else block for the break calculating methods, consider if there are tasks immediately before and after this task. Then get the accumulated time and edit the break accordingly. To think about: How do you edit the breaks accordingly? What if the break cannot be extended? In this case, where will the carried over break be added?

// Reminder: Don't splice empty windows. They are are automatically removed by the insert and remove functions.

//TODO: Need to extend the initial window set up end timing according to the duration by which the tasks inserted by users exceed
/*
import {Window} from './Window.js';
import {Break} from './Break.js';
import {Time} from '../time.js';
*/
//export class Scheduling {
class Scheduling {
    static generateSchedule(emptyWindowArr, fixedWindowArr, nonFixedWindowArr, nonFixedWindowPriorityArr) {
        this.emptyWindowArr = emptyWindowArr;
        this.fixedWindowArr = fixedWindowArr;
        this.nonFixedWindowArr = nonFixedWindowArr;
        this.nonFixedWindowPriorityArr = nonFixedWindowPriorityArr;

        //PART 1: SETTING UP BREAKS FOR FIXED TASKS
        for (let k = 0; k < this.fixedWindowArr.length; k++) {
            // Curr fixed task for which the break is to be added
            let currWindow = this.fixedWindowArr[k];
            // Curr fixed task start and end time
            let currStartTime = currWindow.getStartTime();
            let currEndTime = currWindow.getEndTime();
            // Calculating the break duration for the curr fixed task
            let currBreakDuration = Break.calculateBreak(currStartTime, currEndTime);
            // Adding the break duration to the accumulated break time
            //TODO: Probably need to put it in an array of 7 days?
            Break.accumulatedBreakTime += currBreakDuration; 

            for (let a = 0; a < this.emptyWindowArr.length; a++) {
                // Checking if there is a empty window immediately after this fixed task
                if (currEndTime.equals(this.emptyWindowArr[a].getStartTime())) {
                    // If the accumulated break time is > 30 mins, we can only allocate a max of 30 mins break at any one time
                    if (Break.accumulatedBreakTime > 30) {
                        // If accumulated break time is > 30 mins but the empty window is < than the 30 mins
                        if (Time.duration(this.emptyWindowArr[a].getStartTime(), this.emptyWindowArr[a].getEndTime()) < 30) {
                            // Create a break for whatever time there is 
                            let newBreak = new Window("Break", currWindow.getYear(), currWindow.getMonth(), currWindow.getDate(), this.emptyWindowArr[a].getStartTime(), this.emptyWindowArr[a].getEndTime(), 1);
                        
                            newBreak.insertWindow();
    
                            // Remove the allocated break time from the accumulated break time
                            Break.accumulatedBreakTime -= Time.duration(this.emptyWindowArr[a].getStartTime(), this.emptyWindowArr[a].getEndTime());
                        
                        // If accumulated break time is > 30 mins and the empty window is >= than the 30 mins
                        } else {
                            // Just schedule a 30 mins break. Since it is posssible that the time available in the curr empty window > 30 mins, find the time at the end of the 30 mins break (this applies to empty windows >= 30 mins)
                            let endTime = Time.findEndTime(this.emptyWindowArr[a].getStartTime(), [0, 30]);
                            let newBreak = new Window("Break", currWindow.getYear(), currWindow.getMonth(), currWindow.getDate(), this.emptyWindowArr[a].getStartTime(), endTime, 1);

                            newBreak.insertWindow();
                            
                            // Remove the allocated break time from the accumulated break time
                            Break.accumulatedBreakTime -= 30;
                        }
                    // If accumulated break time is <= 30 mins but the empty window is < than the accumualted break time
                    } else if (Time.duration(this.emptyWindowArr[a].getStartTime(), this.emptyWindowArr[a].getEndTime()) < Break.accumulatedBreakTime) {
                        // Just assign the whole window to be a break window
                        let newBreak = new Window("Break", currWindow.getYear(), currWindow.getMonth(), currWindow.getDate(), this.emptyWindowArr[a].getStartTime(), this.emptyWindowArr[a].getEndTime(), 1);
                        
                        newBreak.insertWindow();
                        
                        // Remove the allocated break time from the accumulated break time
                        Break.accumulatedBreakTime -= Time.duration(this.emptyWindowArr[a].getStartTime(), this.emptyWindowArr[a].getEndTime());

                    // If accumulated break time is <= 30 mins and empty window >= accumulated break time
                    } else {
                        // Since it is posssible that the duration available in the curr empty window > accumulated break duration, find the time at the end of accumulated the break 
                        let endTime = Time.findEndTime(this.emptyWindowArr[a].getStartTime(), [0, Break.accumulatedBreakTime]);

                        let newBreak = new Window("Break", currWindow.getYear(), currWindow.getMonth(), currWindow.getDate(), this.emptyWindowArr[a].getStartTime(), endTime, 1);

                        newBreak.insertWindow();

                        Break.accumulatedBreakTime = 0; // Since all of the accumulated break time has been allocated, this can now be updated to 0
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
            while (currFixedTaskIndex < this.fixedWindowArr.length && this.fixedWindowArr[currFixedTaskIndex].getTaskName() != currArr[0].getTaskAfterIt()) {
                currFixedTaskIndex++;
            }
            // Obtaining the start time of the fixed task in ms 
            let currFixedTaskStartTimeinMs = this.fixedWindowArr[currFixedTaskIndex].getStartTimeinMs();

            let currEmptyWinIndex = 0;
            // Finding the empty window right before this task
            while (currEmptyWinIndex < this.emptyWindowArr.length && this.emptyWindowArr[currEmptyWinIndex].getEndTimeInMs() < currFixedTaskStartTimeinMs) {
                currEmptyWinIndex++;
            }
            currEmptyWinIndex--; // Adjusting the index to the right index (because you would have incremented 1 after the right empty window)

            // Setting lastEmptyWinIndex to represent the position of the empty window closest to the fixed task
            let lastEmptyWinIndex = currEmptyWinIndex;

            let firstTaskIndex = 0;
            let lastTaskIndex = firstTask;
            // Finding the range of non-fixed tasks connected to the fixed task
            while (lastTaskIndex < currArr.length - 1 && currArr[lastTaskIndex].getTaskAfterIt() == currArr[lastTaskIndex + 1].getTaskAfterIt()) {
                lastTaskIndex++;
            }

            let count = lastTaskIndex - firstTaskIndex; // No +1 because the firstTaskIndex will be 0

            while (count > 0) { //REASONING: If the connected tasks can be fit in, we want to go from the back (scheduling the last task in the last window bc it may not fully occupy the start window). If they can't fit, however, we want to start scheduling from the start (the first task in the first window bc these tasks need to be done before any of the subsequent tasks can be done). So this results in opposing directions of flow, which can't be determined yet. So we use count instead, to just keep track of the number of tasks to be scheduled which will work in both cases.
                
                //STEP 1: We need to figure out if all the connected non-fixed tasks + their estimated break times can fit the time available before the fixed task.
                
                // Finding the duration of the empty window closest to the fixed task
                let emptyAccumDuration = Time.duration(this.emptyWindowArr[currEmptyWinIndex].getStartTime(), this.emptyWindowArr[currEmptyWinIndex].getEndTime());

                // The total accumulated duration of the connected non-fixed tasks + their break time
                let expectedDuration = ((currTaskIndex.getAccumulatedDuration()[0] * 60) + currTaskIndex.getAccumulatedDuration()[1]);
                expectedDuration = expectedDuration + Break.calculateBreakFromDuration(expectedDuration);

                // Checking if there are sufficient empty windows before the fixed task window to fit in all the connected non-fixed tasks
                while(currEmptyWinIndex >= 0 && expectedDuration > (emptyAccumDuration[0] * 60) + emptyAccumDuration[1]) {
                    // If insufficient, traverse back to the previous empty window
                    currEmptyWinIndex --;

                    // Finding the duration of the previous empty window
                    let additionalDuration = Time.duration(this.emptyWindowArr[currEmptyWinIndex].getStartTime(), this.emptyWindowArr[currEmptyWinIndex].getEndTime());
                    let newHours = additionalDuration[0] + emptyAccumDuration[0];
                    let newMins = additionalDuration[1] + emptyAccumDuration[1];
                    if (additionalDuration[1] + emptyAccumDuration[1] > 60) {
                        newHours += (newMins - (newMins % 60)) / 60;
                        newMins = newMins % 60; 
                    }

                    // Finding the new accumulated available time
                    emptyAccumDuration = [newHours, newMins];
                }

               // If there aren't sufficient windows
                if (currEmptyWinIndex < 0 && currTaskIndex.getAccumulatedDuration() > emptyAccumDuration) {
                    console.log("The available free time before this specific fixed task is insufficient to schedule all the relevant connected non-fixed tasks.")
                    
                    //Strategy: We still schedule as many tasks as we can, starting from the first task, starting with the earliest window

                    let currTaskPos = 0;
                    let currEmptyWinPos = 0;

                    while (currEmptyWinPos <= lastEmptyWinIndex) {
                        // Obtain the curr non-fixed task to be scheduled
                        let currTask = this.nonFixedWindowPriorityArr[currTaskPos];

                        // Obtaining the curr empty window
                        let currEmptyWin = this.emptyWindowArr[currEmptyWinPos];
                        // Start and end time of the curr empty window
                        let currEmptyStartTime = currEmptyWin.getStartTime();
                        let currEmptyEndTime = currEmptyWin.getEndTime();
                        let currEmptyWindowDuration = Time.duration(currEmptyStartTime, currEmptyEndTime);

                        // Calculating the duration of the curr non-fixed task window
                        let currWorkDuration = currTask.getIndivDuration();
                        // Adding the break duration to the accumulated break time variable
                        Break.accumulatedBreakTime += Break.calculateBreakFromDuration(currWorkDuration);

                        // Ensuring that a maximum of only 30 mins is allocated to this break
                        let breakDuration = Break.accumulatedBreakTime
                        if (breakDuration > 30) {
                            breakDuration = 30
                        }

                        // If the duration of the curr work window + its break > duration of the empty window 
                        if ((currWorkDuration[0] * 60) + currWorkDuration[1] + breakDuration > (currEmptyWindowDuration[0] * 60) + currEmptyWindowDuration[1]) {
                            // 5/6 of the empty window would be for work, 1/6 for break. Do the necessary round ups. Update the task duration for this non-fixed task and the accumulated break time variable.
                            let workDuration = (((currEmptyWindowDuration[0] * 60) + currEmptyWindowDuration[1]) / 6) * 5; //Reminder: This is in mins
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
                            let newBreak = new Window("Break", currEmptyWin.getYear(), currEmptyWin.getMonth(), currEmptyWin.getDate(), startTimeBreak, currEmptyEndTime, 1);
                            let newTask = new Window(currTask.getTaskName(), currTask.getYear(), currTask.getMonth(), currTask.getDate(), currEmptyStartTime, startTimeBreak, 1);

                            newTask.insertWindow();
                            newBreak.insertWindow();

                            // Updating the indiv work duration, the accumulated duration and accumulated break duration accordingly for the current task.
                            let expectedWorkInMins = (currWorkDuration[0] * 60) + currWorkDuration[1];
                            let newDurInMins = expectedWorkInMins - workDuration;
                            let newDuration = [(newDurInMins - (newDurInMins % 60)) / 60, newDurInMins % 60];
                            currTask.changeDuration(newDuration);

                            let accumDurInMins = (currTask.getAccumulatedDuration()[0] * 60) + currTask.getAccumulatedDuration()[1];
                            let newAccumDurInMins = accumDurInMins - workDuration;
                            let newAccumDuration = [(newAccumDurInMins - (newAccumDurInMins % 60)) / 60, newAccumDurInMins % 60];
                            currTask.changeAccumulatedDuration(newAccumDuration);

                            // Updating the accumulated break time
                            Break.accumulatedBreakTime -= breakDuration;

                            // Updating for the while loop by moving on to the next empty window
                            currEmptyWinPos ++;

                        // If the duration of the curr work window + its break <= duration of the empty window
                        } else {
                            let startTimeBreak = Time.findEndTime(currEmptyStartTime, currWorkDuration);
                            let endTimeBreak = Time.findEndTime(startTimeBreak, [0, breakDuration]);

                            // Scheduling the task and break
                            let newTask = new Window(currTask.getTaskName(), currTask.getYear(), currTask.getMonth(), currTask.getDate(), currEmptyStartTime, startTimeBreak, 1);
                            let newBreak = new Window("Break", currEmptyWin.getYear(), currEmptyWin.getMonth(), currEmptyWin.getDate(), startTimeBreak, endTimeBreak, 1);

                            newTask.insertWindow();
                            newBreak.insertWindow();

                            // Updating the accumulated break time
                            Break.accumulatedBreakTime -= breakDuration;

                            // Updating for the bigger while loops by moving on to the next task
                            currTaskPos ++;
                            count --;
                        }
                    }
                    // The max num of connected non-fixed tasks that can be scheduled have been scheduled. Thus, we just remove all the connected non-fixed tasks (even if they haven't been schedule). 
                    count = 0;
                    currArr.splice(firstTaskIndex, lastTaskIndex - firstTaskIndex + 1);

                // All the connected non-fixed tasks can be scheduled before the fixed task
                } else {
                    // Strategy: Start scheduling from the last window, the last task and work our way forward

                    let currTaskPos = lastTaskIndex;
                    let currEmptyWinPos = lastEmptyWinIndex;

                    while (currTaskPos >= 0) {
                        // Obtain the curr non-fixed task to be scheduled
                        let currTask = this.nonFixedWindowPriorityArr[currTaskPos];

                        // Obtaining the curr empty window
                        let currEmptyWin = this.emptyWindowArr[currEmptyWinPos];
                        // Start and end time of the curr empty window
                        let currEmptyStartTime = currEmptyWin.getStartTime();
                        let currEmptyEndTime = currEmptyWin.getEndTime();
                        let currEmptyWindowDuration = Time.duration(currEmptyStartTime, currEmptyEndTime);

                        // Calculating the duration of the curr non-fixed task window
                        let currWorkDuration = currTask.getIndivDuration();
                        // Adding the break duration to the accumulated break time variable
                        Break.accumulatedBreakTime += Break.calculateBreakFromDuration(currWorkDuration);

                        // Ensuring that a maximum of only 30 mins is allocated to this break
                        let breakDuration = Break.accumulatedBreakTime
                        if (breakDuration > 30) {
                            breakDuration = 30
                        }

                        // If the duration of the curr work window + its break > duration of the empty window 
                        if ((currWorkDuration[0] * 60) + currWorkDuration[1] + breakDuration > (currEmptyWindowDuration[0] * 60) + currEmptyWindowDuration[1]) {
                            // 5/6 of the empty window would be for work, 1/6 for break. Do the necessary round ups. Update the task duration for this non-fixed task and the accumulated break time variable.
                            let workDuration = (((currEmptyWindowDuration[0] * 60) + currEmptyWindowDuration[1]) / 6) * 5; //Reminder: This is in mins
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
                            let newBreak = new Window("Break", currEmptyWin.getYear(), currEmptyWin.getMonth(), currEmptyWin.getDate(), startTimeBreak, currEmptyEndTime, 1);
                            let newTask = new Window(currTask.getTaskName(), currTask.getYear(), currTask.getMonth(), currTask.getDate(), currEmptyStartTime, startTimeBreak, 1);

                            newTask.insertWindow();
                            newBreak.insertWindow();

                            // Updating the indiv work duration, the accumulated duration and accumulated break duration accordingly for the current task.
                            let expectedWorkInMins = (currWorkDuration[0] * 60) + currWorkDuration[1];
                            let newDurInMins = expectedWorkInMins - workDuration;
                            let newDuration = [(newDurInMins - (newDurInMins % 60)) / 60, newDurInMins % 60];
                            currTask.changeDuration(newDuration);

                            let accumDurInMins = (currTask.getAccumulatedDuration()[0] * 60) + currTask.getAccumulatedDuration()[1];
                            let newAccumDurInMins = accumDurInMins - workDuration;
                            let newAccumDuration = [(newAccumDurInMins - (newAccumDurInMins % 60)) / 60, newAccumDurInMins % 60];
                            currTask.changeAccumulatedDuration(newAccumDuration);

                            // Updating the accumulated break time
                            Break.accumulatedBreakTime -= breakDuration;

                            // Updating for the while loop by moving on to the next empty window
                            currEmptyWinPos --;

                        // If the duration of the curr work window + its break <= duration of the empty window 
                        } else {
                            let startTimeBreak = Time.findStartTime(currEmptyEndTime, [0, breakDuration]);
                            let startWorkTime = Time.findEndTime(startTimeBreak, currWorkDuration);

                            // Scheduling the task and break
                            let newTask = new Window(currTask.getTaskName(), currTask.getYear(), currTask.getMonth(), currTask.getDate(), startWorkTime, startTimeBreak, 1);
                            let newBreak = new Window("Break", currEmptyWin.getYear(), currEmptyWin.getMonth(), currEmptyWin.getDate(), startTimeBreak, currEmptyEndTime, 1);

                            newTask.insertWindow();
                            newBreak.insertWindow();

                            // Updating the accumulated break time
                            Break.accumulatedBreakTime -= breakDuration;

                            // Updating for the bigger while loops by moving on to the next task
                            currTaskPos --;
                            count --;
                        }
                    }
                    // All the connected non-fixed tasks should have been scheduled 
                    currArr.splice(firstTaskIndex, lastTaskIndex - firstTaskIndex + 1);

                }
            }
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
            while (currTaskIndex < this.nonFixedWindowArr && ((this.nonFixedWindowArr[currTaskIndex].getAccumulatedDuration()[0] * 60) + this.nonFixedWindowArr[currTaskIndex].getAccumulatedDuration()[1] + Break.calculateBreakFromDuration(this.nonFixedWindowArr[currTaskIndex].getAccumulatedDuration()) > (currEmptyDuration[0] * 60) + currEmptyDuration[1])) {
                // Traverse through all the connected non-fixed tasks and choose the next non-fixed task that is not connected to the currently chosen taks
                while (currTaskIndex < this.nonFixedWindowArr.length - 1 && this.nonFixedWindowArr[currTaskIndex].getTaskAfterIt() == this.nonFixedWindowArr[currTaskIndex + 1].getTaskAfterIt()) {
                    currTaskIndex++
                }
                currTaskIndex++; // To adjust to the right index (to the task that is not connected instead of stopping at the last connected task)
                if (currTaskIndex >= this.nonFixedWindowArr.length) {
                    currTaskIndex = 0;
                    break; //TODO: Check: It only quits the both while loop right
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
                    if (chosenTask.getTaskCategory() == 5) {
                        // Try to find tasks that are either "Fully work" or "Work"
                        while (taskIndex < this.nonFixedWindowArr.length && this.nonFixedWindowArr[taskIndex].getTaskCategory() != 4 || this.nonFixedWindowArr[taskIndex].getTaskCategory() != 0) {
                            while (taskIndex < this.nonFixedWindowArr.length - 1 && this.nonFixedWindowArr[taskIndex].getTaskAfterIt() == this.nonFixedWindowArr[taskIndex + 1].getTaskAfterIt()) {
                                taskIndex++;
                            }
                            taskIndex++; // To adjust to the right index (to the task that is not connected instead of stopping at the last connected task)
                            if (taskIndex >= this.nonFixedWindowArr.length) {
                                taskIndex = 0;
                                break; //TODO: Check: It only quits the both while loop right
                            }
                        }
                        // If no tasks calssified as either "Fully work"  or "Work" can be found
                        if (taskIndex >= this.nonFixedWindowArr.length) {
                            taskIndex = 0;
                        }
                    // If the curr task is neither "Partially work", "Fully work" or "Work"
                    } else if (this.nonFixedWindowArr[taskIndex].getTaskCategory() != 5 || this.nonFixedWindowArr[taskIndex].getTaskCategory() != 4 || this.nonFixedWindowArr[taskIndex].getTaskCategory() != 0) {
                        // While the curr task is not classified as "Fully work" or "Work", keep traversing through all the relevant connected non-work tasks (To find a "Fully work" or "Work" task)
                        while (taskIndex < this.nonFixedWindowArr.length && this.nonFixedWindowArr[taskIndex].getTaskCategory() != 4 || this.nonFixedWindowArr[taskIndex].getTaskCategory() != 0) {
                            while (taskIndex < this.nonFixedWindowArr.length - 1 && this.nonFixedWindowArr[taskIndex].getTaskAfterIt() == this.nonFixedWindowArr[taskIndex + 1].getTaskAfterIt()) {
                                taskIndex++;
                            }
                            taskIndex++; // To adjust to the right index (to the task that is not connected instead of stopping at the last connected task)
                            if (taskIndex >= this.nonFixedWindowArr.length) {
                                taskIndex = 0;
                                break; //TODO: Check: It only quits the both while loop right
                            }
                        }
                        if (taskIndex >= this.nonFixedWindowArr.length) {
                            taskIndex = 0;
                        }

                        chosenTask = this.nonFixedWindowArr[taskIndex];
                        // If the curr task is not classified as "Work" or "Fully Work", keep traversing through all the relevant connected non-work tasks (To find a "Partially work" task given that "Fully work" and "Work" tasks can't be found)
                        if (chosenTask.getTaskCategory() != 4 || chosenTask.getTaskCategory() != 0) {
                            while (taskIndex < this.nonFixedWindowArr.length && this.nonFixedWindowArr[taskIndex].getTaskCategory() != 5) {
                                while (taskIndex < this.nonFixedWindowArr.length - 1 && this.nonFixedWindowArr[taskIndex].getTaskAfterIt() == this.nonFixedWindowArr[taskIndex + 1].getTaskAfterIt()) {
                                    taskIndex++;
                                }
                                taskIndex++; // To adjust to the right index (to the task that is not connected instead of stopping at the last connected task)
                                if (taskIndex >= this.nonFixedWindowArr.length) {
                                    taskIndex = 0;
                                    break; //TODO: Check: It only quits the both while loop right
                                }
                            }
                            if (taskIndex >= this.nonFixedWindowArr.length) {
                                taskIndex = 0;
                            }
                        }
                    }
                    currTaskIndex = taskIndex;
                    chosenTask = this.nonFixedWindowArr[taskIndex];
                // If the curr empty window falls during the non-productivity period
                } else {
                    // If the current tasks are classified as "Parially work", "Work" or "Fully work", try to find a task that does not belong in any of these categories
                    if (this.nonFixedWindowArr[taskIndex].getTaskCategory() == 5 || this.nonFixedWindowArr[taskIndex].getTaskCategory() == 4 || this.nonFixedWindowArr[taskIndex].getTaskCategory() == 0) {
                        while (taskIndex < this.nonFixedWindowArr.length && this.nonFixedWindowArr[taskIndex].getTaskCategory() == 5 || this.nonFixedWindowArr[taskIndex].getTaskCategory() == 4 || this.nonFixedWindowArr[taskIndex].getTaskCategory() == 0) {
                            // Keep traversing through all the connected tasks
                            while (taskIndex < this.nonFixedWindowArr.length - 1 && this.nonFixedWindowArr[taskIndex].getTaskAfterIt() == this.nonFixedWindowArr[taskIndex + 1].getTaskAfterIt()) {
                                taskIndex++;
                            }
                            taskIndex++; // To adjust to the right index (to the task that is not connected instead of stopping at the last connected task)
                            if (taskIndex >= this.nonFixedWindowArr.length) {
                                taskIndex = 0;
                                break; //TODO: Check: It only quits the both while loop right
                            }
                        }
                        if (taskIndex >= this.nonFixedWindowArr.length) {
                            taskIndex = 0;
                        }
                        // If unable to find a purely non-work related task, try to find a "Partially work" task instead
                        while (taskIndex < this.nonFixedWindowArr.length && this.nonFixedWindowArr[taskIndex].getTaskCategory() == 4 || this.nonFixedWindowArr[taskIndex].getTaskCategory() == 0) {
                            while (taskIndex < this.nonFixedWindowArr.length - 1 && this.nonFixedWindowArr[taskIndex].getTaskAfterIt() == this.nonFixedWindowArr[taskIndex + 1].getTaskAfterIt()) {
                                taskIndex++;
                            }
                            taskIndex++; // To adjust to the right index (to the task that is not connected instead of stopping at the last connected task)
                            if (taskIndex >= this.nonFixedWindowArr.length) {
                                taskIndex = 0;
                                break; //TODO: Check: It only quits the both while loop right
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
                let taskIndex = currTaskIndex;
                // If the curr empty window falls during the productivity period
                if (this.emptyWindowArr[0].duringProductivePeriod()) {
                    chosenTask = this.nonFixedWindowArr[taskIndex];
                    //If the curr task is only "Partially work" (exact same logic as before)
                    if (chosenTask.getTaskCategory() == 5) {
                        taskIndex = 0; //It is okay to break up tasks bc we really want a work task for productive period
                        // Search for a task classified as "Fully work" or "work"
                        while (taskIndex < this.nonFixedWindowArr.length && (this.nonFixedWindowArr[taskIndex].getTaskCategory() != 4 || this.nonFixedWindowArr[taskIndex].getTaskCategory() != 0)) {
                            // Traverse through all the relevant connected non-fixed tasks
                            while (taskIndex < this.nonFixedWindowArr.length - 1 && this.nonFixedWindowArr[taskIndex].getTaskAfterIt() == this.nonFixedWindowArr[taskIndex + 1].getTaskAfterIt()) {
                                taskIndex++;
                            }
                            taskIndex++; // To adjust to the right index (to the task that is not connected instead of stopping at the last connected task)
                            if (taskIndex >= this.nonFixedWindowArr.length) {
                                taskIndex = currTaskIndex;
                                break; //TODO: Check: It only quits the both while loop right
                            }
                        }
                        if (taskIndex >= this.nonFixedWindowArr.length) {
                            taskIndex = currTaskIndex;
                        }
                    // If curr task is in none of the work categories
                    } else if (this.nonFixedWindowArr[taskIndex].getTaskCategory() != 5 || this.nonFixedWindowArr[taskIndex].getTaskCategory() != 4 || this.nonFixedWindowArr[taskIndex].getTaskCategory() != 0) {
                        taskIndex = 0;
                        // Try to find for a task that is "Fully work" or "Work" first
                        while (taskIndex < this.nonFixedWindowArr.length && this.nonFixedWindowArr[taskIndex].getTaskCategory() != 4 || chosenTask.getTaskCategory() != 0) {
                            while (taskIndex < this.nonFixedWindowArr.length - 1 && this.nonFixedWindowArr[taskIndex].getTaskAfterIt() == this.nonFixedWindowArr[taskIndex + 1].getTaskAfterIt()) {
                                taskIndex++;
                            }
                            taskIndex++; // To adjust to the right index (to the task that is not connected instead of stopping at the last connected task)
                            if (taskIndex >= this.nonFixedWindowArr.length) {
                                taskIndex = currTaskIndex;
                                break; //TODO: Check: It only quits the both while loop right
                            }
                        }
                        if (taskIndex >= this.nonFixedWindowArr.length) {
                            taskIndex = currTaskIndex;
                        }
                        // Try to find a task that is at least "Partially work"
                        while (taskIndex < this.nonFixedWindowArr.length && chosenTask.getTaskCategory() != 5) {
                            taskIndex = 0;
                            while (taskIndex < this.nonFixedWindowArr.length - 1 && this.nonFixedWindowArr[taskIndex].getTaskAfterIt() == this.nonFixedWindowArr[taskIndex + 1].getTaskAfterIt()) {
                                taskIndex++;
                            }
                            taskIndex++; // To adjust to the right index (to the task that is not connected instead of stopping at the last connected task)
                            if (taskIndex >= this.nonFixedWindowArr.length) {
                                taskIndex = currTaskIndex;
                                break; //TODO: Check: It only quits the both while loop right
                            }
                        }
                        if (taskIndex >= this.nonFixedWindowArr.length) {
                            taskIndex = currTaskIndex;
                        }
                    }
                // If non-productive period
                } else {
                    // If the task is in one of the work categories, traverse till you can find a non-work related one 
                    if (this.nonFixedWindowArr[taskIndex].getTaskCategory() == 5 || this.nonFixedWindowArr[taskIndex].getTaskCategory() == 4 || this.nonFixedWindowArr[taskIndex].getTaskCategory() == 0) {
                        while (taskIndex < this.nonFixedWindowArr.length && this.nonFixedWindowArr[taskIndex].getTaskCategory() == 5 || this.nonFixedWindowArr[taskIndex].getTaskCategory() == 4 || this.nonFixedWindowArr[taskIndex].getTaskCategory() == 0) {
                            while (taskIndex < this.nonFixedWindowArr.length - 1 && this.nonFixedWindowArr[taskIndex].getTaskAfterIt() == this.nonFixedWindowArr[taskIndex + 1].getTaskAfterIt()) {
                                taskIndex++;
                            }
                            taskIndex++; // To adjust to the right index (to the task that is not connected instead of stopping at the last connected task)
                            if (taskIndex >= this.nonFixedWindowArr.length) {
                                taskIndex = currTaskIndex;
                                break; //TODO: Check: It only quits the both while loop right
                            }
                        }
                        if (taskIndex >= this.nonFixedWindowArr.length) {
                            taskIndex = currTaskIndex;
                        }
                        // If that's not possible, try to find a task that is just "Partially work"
                        while (taskIndex < this.nonFixedWindowArr.length && this.nonFixedWindowArr[taskIndex].getTaskCategory() == 4 || this.nonFixedWindowArr[taskIndex].getTaskCategory() == 0) {
                            while (taskIndex < this.nonFixedWindowArr.length - 1 && this.nonFixedWindowArr[taskIndex].getTaskAfterIt() == this.nonFixedWindowArr[taskIndex + 1].getTaskAfterIt()) {
                                taskIndex++;
                            }
                            taskIndex++; // To adjust to the right index (to the task that is not connected instead of stopping at the last connected task)
                            if (taskIndex >= this.nonFixedWindowArr.length) {
                                taskIndex = currTaskIndex;
                                break; //TODO: Check: It only quits the both while loop right
                            }
                        }
                        if (taskIndex >= this.nonFixedWindowArr.length) {
                            taskIndex = currTaskIndex;
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
            while (endIndex < this.nonFixedWindowArr.length - 1 && this.nonFixedWindowArr[startIndex].getTaskAfterIt() == this.nonFixedWindowArr[startIndex + 1].getTaskAfterIt()) {
                endIndex++;
            }

            // Scheduling all the connected non-fixed tasks
            for (let h = startIndex; h <= endIndex; h++) {
                let currEmptyWindowDuration = Time.duration(this.emptyWindowArr[0].getStartTime(), this.emptyWindowArr[0].getEndTime());
                let chosenTaskIndivDuration = this.nonFixedWindowArr[h].getIndivDuration();

                Break.accumulatedBreakTime += Break.calculateBreakFromDuration(chosenTaskIndivDuration);
                let breakDuration = Break.accumulatedBreakTime;
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
                    Break.accumulatedBreakTime -= breakDuration;

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

                    // Updating the indiv work duration, the accumulated duration and accumulated break duration accordingly for the current task.
                    let expectedWorkInMins = (chosenTaskIndivDuration[0] * 60) + chosenTaskIndivDuration[1];
                    let newDurInMins = expectedWorkInMins - workDuration;
                    let newDuration = [(newDurInMins - (newDurInMins % 60)) / 60, newDurInMins % 60];
                    this.nonFixedWindowArr[h].changeDuration(newDuration);

                    let accumDurInMins = (this.nonFixedWindowArr[h].getAccumulatedDuration()[0] * 60) + this.nonFixedWindowArr[h].getAccumulatedDuration()[1];
                    let newAccumDurInMins = accumDurInMins - workDuration;
                    let newAccumDuration = [(newAccumDurInMins - (newAccumDurInMins % 60)) / 60, newAccumDurInMins % 60];
                    this.nonFixedWindowArr[h].changeAccumulatedDuration(newAccumDuration);

                    // Updating the accumulated break time
                    Break.accumulatedBreakTime -= breakDuration;

                    // Updating for the while loop by moving on to the next empty window
                    /*
                    if (h == endIndex) {
                        this.nonFixedWindowArr.splice(h, endIndex - startIndex + 1);
                    }
                    */
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
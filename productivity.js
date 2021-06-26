class ProductivityStatistics {

    /**
     * Display of the total number of hours user spent on completing tasks for the day (accumulated based on the data retrieved from timers)
     * 
     * Percentage of the scheduled tasks that are completed each day: The average over a week will be presented for a more accurate representation.
     
    // Formula = (ProductivityStatistics.prototype.numOfTasksDone / ProductivityStatistics.prototype.numOfScheduledTasks) * 100%
     * 
    
    Breakdown of the number of hours spent under each category (weekly) (percentage of the week that was spent for each category)

    The time period that the user is most productive: The user's productivity period will be updated if it differs from what was indicated during the set-up. Longer tasks will be scheduled during this updated productive period instead. 

    work productivity = output / input
                 = number of work hours completed / total number of hours scheduled
    * we are only going to measure work productivity, will be measured over a week for every 4-hour block
     */

    // Main idea: All these calculations will be done after the schedule has been generated
    totalHoursSpent() {
        let i;
        let totalHours = 0; //in mins
        for (i = 0; i < counterArr.length; i++) {
            totalHours += counterArr[i] //assuming the durations recorded in mins
        }
        let newHours = Math.trunc(totalHours / 60);
        let newMins = totalHours - (newHours * 60);
        return [newHours, newMins];
    }
    
    //TODO: If a user finishes their tasks earlier than they are meant to, then it should not be recorded as less productive! As long as user clicks completed button, it should just be taken as productive. If the user exceeds (?) --> how will the timer extend?
    categoryBreakdown(finalisedTaskArr) {
        let workMins = 0;
        let miscellaneousMins = 0;
        let exerciseMins = 0;

        let i;
        //TODO: Need to use counter timing here right?
        for(i = 0; i < finalisedTaskArr.length; i++) {
            //TODO: Check if getTaskCategory exists. If not create it. 
            duration = Time.duration(finalisedTaskArr[i].getStartTime(), finalisedTaskArr[i].getEndTime());
            if (finalisedTaskArr[i].getTaskCategory() == "Work" || finalisedTaskArr[i].getTaskCategory() == "Partially Work" || finalisedTaskArr[i].getTaskCategory() == "Fully Work") {
                workMins += (duration[0] * 60) + duration[1];
            } else if (finalisedTaskArr[i].getTaskCategory() == "Miscellaneous") {
                miscellaneousMins += (duration[0] * 60) + duration[1];
            } else if (finalisedTaskArr[i].getTaskCategory() == "Exercise") {
                exerciseMins += (duration[0] * 60) + duration[1];
            }

        }
        /*
        let workPortion = ((ProductivityStatistics.prototype.workHours / ProductivityStatistics.prototype.totalHours) * 100);
        let miscellaneousPortion = ((ProductivityStatistics.prototype.miscellaneousHours / ProductivityStatistics.prototype.totalHour) * 100);
        let exercisePortion = ((ProductivityStatistics.prototype.exerciseHours / ProductivityStatistics.prototype.totalHours) * 100);
        */
    }

    productivityCalculation() {
        //TODO: We are going to give users the productivity slot options
        //INCOMPLETE
        let window = n
    }

}

ProductivityStatistics.prototype.workHours;
ProductivityStatistics.prototype.miscellaneousHours;
ProductivityStatistics.prototype.exerciseHours;
ProductivityStatistics.prototype.totalHours;
ProductivityStatistics.prototype.categoryAvg = []; //Format: [[work, misc, exer], ...]
ProductivityStatistics.prototype.productiveSlot1;
ProductivityStatistics.prototype.productiveSlot2;
ProductivityStatistics.prototype.productiveSlot3;
ProductivityStatistics.prototype.productiveSlot4;
// To increase every time a task is added
// Reset at the end of every day
// Change accordingly if user deletes and reschedules tasks
ProductivityStatistics.prototype.numOfScheduledTasks;

// Tracks the number of tasks done for the day (to increase if the counter completes)
// Change accordingly if user deletes and reschedules tasks
ProductivityStatistics.prototype.numOfTasksDone;

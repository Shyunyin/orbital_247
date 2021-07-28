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
        let totalMins = 0; //in mins
        for (i = 0; i < counterArr.length; i++) {
            totalMins += counterArr[i] //assuming the durations recorded in mins
        }
        ProductivityStatistics.prototype.totalMinsForWeek += totalMins;
        let newHours = Math.trunc(totalMins / 60);
        let newMins = totalMins - (newHours * 60);
        return [newHours, newMins];
    }

    percentageCompletionOfTasks() {
        if (dayCount == 7) {
            function roundToTwo(num) {
                return +(Math.round(num + "e+2")  + "e-2");
            }
            return roundToTwo(ProductivityStatistics.prototype.percentageCompletion / 7); 
        }
            ProductivityStatistics.prototype.percentageCompletion += ProductivityStatistics.prototype.numOfTasksDone / ProductivityStatistics.prototype.numOfScheduledTasks; 
    }

    //TODO: If a user finishes their tasks earlier than they are meant to, then it should not be recorded as less productive! As long as user clicks completed button, it should just be taken as productive. If the user exceeds (?) --> how will the timer extend?
    categoryBreakdown(finalisedTaskArr) {
        let workMins = 0;
        let miscellaneousMins = 0;
        let exerciseMins = 0;

        if (dayCount == 7) {
            let workPortion = ((workMins / ProductivityStatistics.prototype.totalMinsForWeek) * 100);
            let miscellaneousPortion = ((miscellaneousMins / ProductivityStatistics.prototype.totalMinsForWeek) * 100);
            let exercisePortion = ((exerciseMins / ProductivityStatistics.prototype.totalMinsForWeek) * 100);
            return [workPortion, miscellaneousPortion, exercisePortion];
        }
        let i;
        //TODO: Need to use counter timing here right?
        for(i = 0; i < counterArr.length; i++) {
            //TODO: Check if getTaskCategory exists. If not create it. 
            if (finalisedTaskArr[i].getTaskCategory() == "Work" || finalisedTaskArr[i].getTaskCategory() == "Partially Work" || finalisedTaskArr[i].getTaskCategory() == "Fully Work") {
                workMins += counterArr[i]; //TODO: what is the format of the durations stored in counterArr
            } else if (finalisedTaskArr[i].getTaskCategory() == "Miscellaneous") {
                miscellaneousMins += counterArr[i];
            } else if (finalisedTaskArr[i].getTaskCategory() == "Exercise") {
                exerciseMins += counterArr[i];
            }

        }
    }

    productivityCalculation(fixedTaskArr, counterArr) {
        //TODO: We are going to give users the productivity slot options
        if (dayCount == 6) {
            maxPos = 0;
            let i;
            for (i = 1; i < ProductivityStatistics.prototype.prodSlots; i++) {
                if (ProductivityStatistics.prototype.prodSlots[i][1] > ProductivityStatistics.prototype.prodSlots[max][1]) {
                    max = i;
                }
            }
            return ProductivityStatistics.prototype.prodSlots[i];
        }

        let j;
        for (j = 0; j < fixedTaskArr.length; j++) {
            // Need to also include partially work?
            if (fixedTaskArr[j].getTaskCategory() == "Work" || fixedTaskArr[j].getTaskCategory() == "Fully Work" || fixedTaskArr[j].getTaskCategory() == "Partially work") {
                //PART 1: Adding in the counter durations
                let startingTime = counterArr[j][0];
                let startingSlot = 0;
                while (ProductivityStatistics.prototype.prodSlots[startingSlot][0].getEndTime().getHours() < startingTime[0] || (ProductivityStatistics.prototype.prodSlots[startingSlot][0].getEndTime().getHours() == startingTime[0] && ProductivityStatistics.prototype.prodSlots[startingSlot][0].getEndTime().getMins() < startingTime[1])) {
                    startingSlot++;
                }

                let timeLeftInSlot = Time.duration(startingTime, ProductivityStatistics.prototype.prodSlots[startingSlot].getEndTime());
                let timeLeftInSlotInMins = (timeLeftInSlot[0] * 60) + timeLeftInSlot[1];
                let timeTaken = counterArr[j][1];
                if (timeTaken <= timeLeftInSlot) {
                    ProductivityStatistics.prototype.prodSlots[j][2] += timeLeftInSlot
                }
                while (timeLeftInSlot < timeTaken) {
                    //ProductivityStatistics.prototype.prodSlots[j][1] += //Scheduled Time
                    ProductivityStatistics.prototype.prodSlots[j][2] += timeLeftInSlot //Counter Time
                    timeTaken -= timeLeftInSlot
                    startingSlot++;
                    timeLeftInSlot = Time.duration(startingTime, ProductivityStatistics.prototype.prodSlots[startingSlot][0].getEndTime()); 
                }

                //PART 2: Adding in the scheduled durations
                startingSlot = 0;
                while (startingSlot < ProductivityStatistics.prototype.prodSlots.length && !fixedTaskArr[startingSlot].isCompletelyDuring(ProductivityStatistics.prototype.prodSlots[j][0])) {
                    startingSlot++;
                }

                if (startingSlot == ProductivityStatistics.prototype.prodSlots.length) {
                    startingSlot = 0;
                    while (startingSlot < ProductivityStatistics.prototype.prodSlots.length && !fixedTaskArr[startingSlot].partiallyOverlaps(ProductivityStatistics.prototype.prodSlots[j][0])) {
                        startingSlot++;
                    }
                    let timeScheduled = Time.duration(finalisedTaskArr[j].getStartTime(), finalisedTaskArr[j].getEndTime())
                    let timeScheduledInMins = (timeScheduled[0] * 60) + timeScheduled[1];
                    timeLeftInSlot = Time.duration(finalisedTaskArr[j].getStartTime(), ProductivityStatistics.prototype.prodSlots[startingSlot][0].getEndTime());
                    timeLeftInSlotInMins = (timeLeftInSlot[0] * 60) + timeLeftInSlot[1];
                    
                    while (timeLeftInSlot < timeScheduledInMins) {
                        ProductivityStatistics.prototype.prodSlots[j][1] += timeLeftInSlot //Scheduled Time
                        timeScheduledInMins -= timeLeftInSlot
                        startingSlot++;
                        timeLeftInSlot = Time.duration(startingTime, ProductivityStatistics.prototype.prodSlots[startingSlot][0].getEndTime()); 
                    }
                } else {
                    let timeScheduled = Time.duration(finalisedTaskArr[j].getStartTime(), finalisedTaskArr[j].getEndTime())
                    let timeScheduledInMins = (timeScheduled[0] * 60) + timeScheduled[1];
                    ProductivityStatistics.prototype.prodSlots[j][1] += timeScheduledInMins;
                }
            }
        }
        
    }
}
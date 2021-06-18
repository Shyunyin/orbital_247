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


}

// To increase every time a task is added
// Reset at the end of every day
// Change accordingly if user deletes and reschedules tasks
ProductivityStatistics.prototype.numOfScheduledTasks;

// Tracks the number of tasks done for the day (to increase if the counter completes)
// Change accordingly if user deletes and reschedules tasks
ProductivityStatistics.prototype.numOfTasksDone;

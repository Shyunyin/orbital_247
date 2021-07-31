class RoutineWindow {
    /**
     * Constructor to create routine/recurring tasks to be printed in the Routine Main page
     * @param {String} taskName      Name of task
     * @param {Number} taskCategory  Category of task (0-3; To be chosen from category 
     *                               array below)
     * @param {Time} startTime       Time at which the task starts
     * @param {Time} endTime         Time at which the task ends
     * @param {Number} freq          Frequency of the recurring task
     * @param {Number} taskDay       Day of the recurring task (0 - 6: Sunday - Saturday)
     * @param {Number} taskWeek      Week of the recurring task (0: Current Week, 1: Next Week)
     * @param {Number} taskDate      Date of the recurring task (0-30 or 31)
     */
        constructor(taskName, taskCategory, startTime, endTime, freq, taskDay, taskWeek, taskDate) {
            this.taskName = taskName;
            this.taskCategory = taskCategory;
            this.startTime = startTime;
            this.endTime = endTime;
            this.freq = freq;
            this.taskDay = taskDay;
            this.taskWeek = taskWeek;
            this.taskDate = taskDate;
        }

         /**
         * To retrieve the task name of a routine task
         * @returns {Number} The task name a routine task
         */
        getTaskName() {
            return this.taskName;
        }

         /**
         * To retrieve the task category of a routine task
         * @returns {Number} The task category of a routine task
         */
        getTaskCategory() {
            return this.taskCategory;
        }

        /**
         * To retrieve the hours of the start time of a routine task
         * @returns {Number} The minutes of the start time of a routine task
         */
        getStartTimeHours() {
            return this.startTime.getHours();
        }
    
        /**
         * To retrieve the minutes of the start time of a routine task
         * @returns {Number} The minutes of the start time of a routine task
         */
        getStartTimeMins() {
            return this.startTime.getMins();
        }
    
        /**
         * To retrieve the hours of the end time of a routine task
         * @returns {Number} The hours of the end time of a routine task(in 24h format)
         */
        getEndTimeHours() {
            return this.endTime.getHours();
        }
    
        /**
         * To retrieve the minutes of the end time of a routine task
         * @returns {Number} The minutes of the end time of a routine task
         */
        getEndTimeMins() {
            return this.endTime.getMins();
        }

        /**
         * To retrieve the day of the routine task
         * @returns {Number} The day of the routine task
         */
        getTaskDay() {
            return this.taskDay;
        }

        /**
         * To retrieve the day of the routine task
         * @returns {Number} The day of the routine task
         */
         getTaskWeek() {
            return this.taskWeek;
        }

        /**
         * To retrieve the day of the routine task
         * @returns {Number} The day of the routine task
         */
         getTaskDate() {
            return this.taskDate;
        }
}    

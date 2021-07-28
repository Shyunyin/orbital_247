// import time class, window class
// Contains the following classes: RoutineInfo, RoutineTask, DailyTask, WeeklyTask, BiweeklyTask, MonthlyTask

class RoutineInfo {
    /**
     * Constructor to record user's wake-up time and productive slot information
     * @param {Time} wakeUpTime The time at which user usually wakes up at
     * @param {Time} productiveSlot Start time of productivity slot (Slot's duration will always be at 4 hours)
     */
    constructor(wakeUpTime, productiveSlot) {
        RoutineInfo.wakeUpTime = wakeUpTime;
        RoutineInfo.productiveSlot = productiveSlot;
        // Estimating sleep time (Assuming sleep time to be for 8 hours)
        RoutineInfo.sleepTime = new Time((RoutineInfo.wakeUpTime.getHours() + 16) % 24, RoutineInfo.wakeUpTime.getMins());
    }

    /**
     * To retrieve the wake-up time of a user
     * @returns {Time} The wake-up time of a user
     */
    static getWakeUpTime() {
        return RoutineInfo.wakeUpTime;
    }

    /**
     * To retrieve the hours of the wake-up time of a user
     * @returns {Number} The hours of the wake-up time of a user
     */
    static getWakeUpTimeHours() {
        return RoutineInfo.wakeUpTime.getHours();
    }

    /**
     * To retrieve the minutes of the wake-up time of a user
     * @returns {Number} The minutes of the wake-up time of a user
     */
    static getWakeUpTimeMins() {
        return RoutineInfo.wakeUpTime.getMins();
    }

    /**
     * To retrieve the estimated sleep time of a user
     * @returns {Time} The sleep time of a user
     */
    static getSleepTime() {
        return RoutineInfo.sleepTime;
    }

    /**
     * To retrieve the hours of the estimated sleep time of a user
     * @returns {Number} The hours of the estimated sleep time of a user
     */
    static getSleepTimeHours() {
        return RoutineInfo.sleepTime.getHours();
    }

    /**
     * To retrieve the minutes of the estimated sleep time of a user
     * @returns {Number} The minutes of the estimated sleep time of a user
     */
    static getSleepTimeMins() {
        return RoutineInfo.sleepTime.getMins();
    }

    /**
     * To retrieve the start time of a user's productivity slot
     * @returns {Time} The start time of a user's productivity slot
     */
    static getProductiveSlot() {
        return RoutineInfo.productiveSlot;
    }

    /**
     * To retrieve the hours of the start time of a user's productivity slot
     * @returns {Time} The hours of the start time of a user's productivity slot
     */
     static getProductiveSlotHours() {
        return RoutineInfo.productiveSlot.getHours();
    }

    /**
     * To retrieve the minutes of the start time of a user's productivity slot
     * @returns {Time} The minutes of the start time of a user's productivity slot
     */
     static getProductiveSlotMins() {
        return RoutineInfo.productiveSlot.getMins();
    }
}


class RoutineTask {
    /**
     * Constructor to create routine/recurring tasks
     * @param {String} taskName      Name of task
     * @param {Number} taskCategory  Category of task (0-3; To be chosen from category 
     *                               array below)
     * @param {Time} startTime       Time at which the task starts
     * @param {Time} endTime         Time at which the task ends
     * @param {Number} freq          Frequency of the recurring task
     */
    constructor(taskName, taskCategory, startTime, endTime, freq) {
        if (new.target === RoutineTask) {
            throw new Error('Abstract class "RoutineTask" cannot be instantiated directly.');
        }
        this.taskName = taskName
        this.taskCategory = RoutineTask.prototype.cats[taskCategory];
        this.startTime = startTime;
        this.endTime = endTime;
        this.freq = RoutineTask.prototype.freq[freq];
    }

    /**
     * Selecting the frequency of the task
     * @param {Number} index 0 - Daily, 1 - Weekly, 2 - Biweekly, 3 - Monthly 
     * @returns {String} Updates the frequence of the task accordingly
     */
    static freq(index) {
        if (index < 0 || index > 3) {
            throw new Error('Invalid index')
        } else {
            return RoutineTask.prototype.freq[index];
        }
    }

    getTaskName() {
        return this.taskName;
    }

    getTaskCategory() {
        return this.taskCategory;
    }

    getStartTimeHours() {
        return this.startTime.getHours();
    }

    getStartTimeMins() {
        return this.startTime.getMins();
    }

    getEndTimeHours() {
        return this.endTime.getHours();
    }

    getEndTimeMins() {
        return this.endTime.getMins();
    }

    getFreq() {
        return this.freq;
    }
}

RoutineTask.prototype.freq = ['Daily', 'Weekly', 'Biweekly', 'Monthly'];

RoutineTask.prototype.cats = ['Work', 'Exercise', 'Miscellaneous', 'Meal Times'];


class DailyTask extends RoutineTask {
    /**
     * Constructor to create daily tasks
     * @param {String} taskName     Name of task
     * @param {Number} taskCategory Category of task (0-2; To be chosen from category 
     *                              array in RoutineTask class)
     * @param {Time} startTime      Time at which the task starts
     * @param {Time} endTime        Time at which the task ends
     */
    constructor(taskName, taskCategory, startTime, endTime) {
        super(taskName, taskCategory, startTime, endTime, 0);
    }
    
    /**
     * To add a daily task to the user's schedule
     */
    scheduleTask() { 
        for (let y = new Date().getFullYear(); y < new Date().getFullYear() + 100; y++) {
            for (let m = 0; m < 12; m++) {
                for (let d = 1; d <= Time.daysInMonth(m, y); d++) {
                    let newTask = new Window(this.taskName, y, m, d, this.startTime, this.endTime, 1);
                    if (newTask.duringSleep()) {
                        //TODO: window.alert("Do you really want to schedule tasks during your sleep time?"); Basically if yes, continue. If no, return.
                    }
                    if (!newTask.isPast()) {
                        newTask.insertWindow();
                    }
                }                
            }
        }
    }

    deleteTask() {
        for (let y = new Date().getFullYear(); y < new Date().getFullYear() + 100; y++) {
            for (let m = 0; m < 12; m++) {
                for (let d = 1; d <= Time.daysInMonth(m, y); d++) {
                    let newTask = new Window(this.taskName, y, m, d, this.startTime, this.endTime, 1);
                    if (!newTask.isPast()) {
                        newTask.removeWindow();
                    }
                }                
            }
        }
    }
}


class WeeklyTask extends RoutineTask {
    /**
     * Constructor to create weekly tasks
     * @param {String} taskName     Name of the task
     * @param {Number} taskCategory Category of task (0-2; To be chosen from category 
     *                              array in RoutineTask class)
     * @param {Time} startTime      Time at which the task starts
     * @param {Time} endTime        Time at which the task ends
     * @param {Number} day          The day of the week on which the task occurs 
     *                              (0-6, Sun-Sat)
     */
    constructor(taskName, taskCategory, startTime, endTime, day) {
        super(taskName, taskCategory, startTime, endTime, 1);
        this.day = day;
    }

    getDay() {
        return this.day;
    }

    /**
     * Returns first date of a month at which the task takes place
     * @param {Number} year    The current year (Format: yyyy)
     * @param {Number} month    The current month (0-11, Jan-Dec)
     * @param {Number} day      The day of the week on which the task occurs 
     *                          (0-6, Sun-Sat)
     * @returns {Number}         The first date of a month at which the task takes place
     */
    static startingDate(year, month, day) {
        var i;
        for (i = 1; i < 8; i ++) {
            if (new Date(year, month, i).getDay() == day) {
                return i;
            }
        }
    }

    /**
     * To add a weekly task to the user's schedule
     */
    scheduleTask() { 
        for (let y = new Date().getFullYear(); y < new Date().getFullYear() + 100; y++) {
            for (let m = 0; m < 12; m++) {
                for (let d = WeeklyTask.startingDate(y, m, this.day); d <= Time.daysInMonth(m, y); d += 7) {
                    let newTask = new Window(this,taskName, y, m, d, this.startTime, this.endTime, 1);
                    if (newTask.duringSleep()) {
                        //TODO: window.alert("Do you really want to schedule tasks during your sleep time?"); Basically if yes, continue. If no, return.
                    }
                    // Only scheduling tasks for the present and the future
                    if (!newTime.isPast()) {
                        newTask.insertWindow();
                    }
                }                
            }
        }
    }

    deleteTask() {
        for (let y = new Date().getFullYear(); y < new Date().getFullYear() + 100; y++) {
            for (let m = 0; m < 12; m++) {
                for (let d = WeeklyTask.startingDate(y, m, this.day); d <= Time.daysInMonth(m, y); d += 7) {
                    let newTask = new Window(this,taskName, y, m, d, this.startTime, this.endTime, 1);
                    // Only deleting tasks from the present and the future
                    if (!newTime.isPast()) {
                        newTask.removeWindow();
                    }
                }                
            }
        }
    }

}

class BiweeklyTask extends RoutineTask {
    /**
     * Constructor to create biweekly tasks
     * @param {String} taskName     Name of task
     * @param {Number} taskCategory Category of task (0-2; To be chosen from category 
     *                              array in RoutineTask class)
     * @param {Time} startTime      Time at which the task starts
     * @param {Time} endTime        Time at which the task ends
     * @param {Number} day          The day of the week on which the task occurs 
     *                              (0-6, Sun-Sat)
     * @param {Number} startWeek    The week in which the task starts (0 - Current week, 1 - 
     *                              Next week)
     */
    constructor(taskName, taskCategory, startTime, endTime, day, startWeek) {
        super(taskName, taskCategory, startTime, endTime, 2);
        this.day = day;
        this.startWeek = startWeek; 
    }

    getDay() {
        return this.day;
    }

    getWeek() {
        return this.startWeek;
    }

    /**
     * Calculate the first date of the current month on which this task takes place based on last date it took place in the previous month
     * @param {Number} year             The current year (Format: yyyy)
     * @param {Number} month            The current month (0-11, Jan-Dec)
     * @param {Number} day              The day of the week on which the task occurs 
     *                                  (0-6, Sun-Sat)
     * @param {Number} previousDate     The date at which the task was last scheduled in the 
     *                                  previous month
     * @returns {Number}                The first date of the current month on which this task 
     *                                  takes place
     */
    static startingDate(year, month, day, previousDate) {
        var i;
        for (i = 1; i < 8; i ++) {
            if (new Date(year, month, i).getDay() == day) {
                break;
            }
        }
        if ((i - previousDate) < -17) {
            return i + 7;
        } else {
            return i;
        }
    }

    /**
     * Calculates the date on which this task is to be first scheduled
     * @returns {Number} The date that is 14 days before the actual date that this task is to be first 
     *          scheduled
     */
    previousDate() {
        let day = this.day
        let startWeek = this.start_week
        let currDay = new Date().getDay()
        let currDate = new Date().getDate()
        let currMonth = new Date().getMonth()
        let currYear = new Date().getYear()
        let actualStartDate = 0

        if (startWeek == 0 && day < currDay) {
            let daysPassed = currDay - day
            actualStartDate = currDate - daysPassed
        } else if (startWeek == 0) {
            let daysToWait = day - currDay
            actualStartDate = currDate + daysToWait
        } else {
            let daysToWait = 7 + (day - currDay)
            actualStartDate = currDate + daysToWait
        }
 
        while (actualStartDate > 0) {
            actualStartDate -= 14
        }
        if (currMonth == 0) {
            return RoutineTask.daysInMonth(12, currYear - 1) + actualStartDate
        } else {
            return RoutineTask.daysInMonth(currMonth - 1, currYear) + actualStartDate
        }
    }

    /**
     * To add a biweekly task to the user's schedule
     */
    scheduleTask() { 
        let previousDate = this.previousDate();
        for (let y = new Date().getFullYear(); y < new Date().getFullYear() + 100; y++) {
            for (let m = 0; m < 12; m++) {
                for (let d = BiweeklyTask.startingDate(y, m, this.day, previousDate); d <= Time.daysInMonth(m, y); d += 14) {
                    let newTask = new Window(this.taskName, y, m, d, this.startTime, this.endTime, 1);
                    if (newTask.duringSleep()) {
                        //TODO: window.alert("Do you really want to schedule tasks during your sleep time?"); Basically if yes, continue. If no, return.
                    }
                    // Only scheduling tasks for the present and the future
                    if (!newTask.isPast()) {
                        newTask.insertWindow();
                        previousDate = d
                    }
                }
            }                
        }
    }

    deleteTask() {
        let previousDate = this.previousDate();
        for (let y = new Date().getFullYear(); y < new Date().getFullYear() + 100; y++) {
            for (let m = 0; m < 12; m++) {
                for (let d = BiweeklyTask.startingDate(y, m, this.day, previousDate); d <= Time.daysInMonth(m, y); d += 14) {
                    let newTask = new Window(this.taskName, y, m, d, this.startTime, this.endTime, 1);
                    // Only deleting tasks from the present and the future
                    if (!newTask.isPast()) {
                        newTask.removeWindow();
                        previousDate = d
                    }
                }
            }                
        }
    }
}


class MonthlyTask extends RoutineTask {
    /**
     * Constructor to create monthly tasks
     * @param {String} taskName     Name of task
     * @param {Number} taskCategory Category of task (0-2; To be chosen from category 
     *                              array in RoutineTask class)
     * @param {Time} startTime      Time at which the task starts
     * @param {Time} endTime        Time at which the task ends
     * @param {Number} date         The date on which the task occurs 
     *                              (1-31)
     */
    constructor(taskName, taskCategory, startTime, endTime, date) {
        super(taskName, taskCategory, startTime, endTime, 3);
        this.date = date;
    }

    getDate() {
        return this.date;
    }

    /**
     * To add a monthly task to the user's schedule
     */
    scheduleTask() {
        for (let y = new Date().getFullYear(); y < new Date().getFullYear() + 100; y++) {
            for (let m = 0; m < 12; m++) {
                if (this.date <= Time.daysInMonth(m, y)) {
                    let newTask = new Window(this.taskName, y, m, d, this.startTime, this.endTime, 1);
                    if (newTask.duringSleep()) {
                        //TODO: window.alert("Do you really want to schedule tasks during your sleep time?"); Basically if yes, continue. If no, return.
                    }
                    if (!newTime.isPast()) {
                        newTask.insertWindow();
                    }
                }              
            }
        }
    }

    deleteTask() {
        for (let y = new Date().getFullYear(); y < new Date().getFullYear() + 100; y++) {
            for (let m = 0; m < 12; m++) {
                if (this.date <= Time.daysInMonth(m, y)) {
                    let newTask = new Window(this.taskName, y, m, d, this.startTime, this.endTime, 1);
                    if (!newTime.isPast()) {
                        newTask.removeWindow();
                    }
                }              
            }
        }
    }
}

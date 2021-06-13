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
     * @param {String} taskBeforeIt Name of the task that is to be scheduled sometime before it
     */
    constructor(taskName, taskCategory, month, date, numOfSess, durOfSess, taskBeforeIt) {
        super(taskName, taskCategory, new Date().getFullYear(), month, date);
        this.numOfSess = numOfSess;
        this.durOfSess = durOfSess;
        this.taskBeforeIt = taskBeforeIt;
    }

    addTask() {
        //TODO: Haven't decided what is the best way to store these tasks (Probably only after algorithm is confirmed)
    }

    /**
     * To retrieve the name of the task
     * @returns {String} The name of the task
     */
    getTaskName() {
        return this.taskName;
    }
}
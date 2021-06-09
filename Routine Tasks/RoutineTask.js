// Remember to add getter and setter methods where necessary
// Testing yet to be done
// Shouldn't start from months that have already passed (current default is set to jan)
// Can this be a child class of a bigger (abstract) 'Task' class?

// Class for routine/recurring tasks to be created
class RoutineTask {
    /**
     * Constructor to create routine/recurring tasks
     * @param {String} taskName      Name of task
     * @param {Number} taskCategory  Category of task (0-2; To be chosen from category 
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
        this.taskCategory = taskCategory
        this.startTime = startTime;
        this.endTime = endTime;
        this.freq = freq;
    }

    /**
     * Selecting the frequency of the task
     * @param {Number} index 0 - Daily, 1 - Weekly, 2 - Biweekly, 3 - Monthly 
     * @returns              Updates the frequence of the task accordingly
     */
    static freq(index) {
        if (index < 0 || index > 3) {
            throw new Error('Invalid index')
        } else {
            return RoutineTask.prototype.freq[index];
        }
    }
}

RoutineTask.prototype.freq = ['Daily', 'Weekly', 'Biweekly', 'Monthly'];

RoutineTask.prototype.cats = ['Work', 'Exercise', 'Miscellaneous'];
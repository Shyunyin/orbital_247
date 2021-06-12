class NonFixedTask extends OneTimeTask {
    constructor(taskName, taskCategory, date, month, numOfSess, durOfSess, taskBeforeIt) {
        super(taskName, taskCategory, taskBeforeIt);
        this.date = date;
        this.month = month;
        this.numOfSess = numOfSess;
        this.durOfSess = durOfSess;
    }

    addTask() {
        
    }
}
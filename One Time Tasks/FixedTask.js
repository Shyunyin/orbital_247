// We can have a checkbox to choose if it for today or another day? / by default the numbers are already there
// Time option before asking number of sessions 

class FixedTask extends OneTimeTask {
    constructor(taskName, taskCategory, startTime, endTime, taskBeforeIt) {
        super(taskName, taskCategory, taskBeforeIt);
        this.startTime = startTime; //Time objects
        this.endTime = endTime;
    }

    scheduleTask() {
        //pop up window if it is during sleep
        let now = new Date();
        let newTask = new Window(now.getFullYear(), now.getMonth(), now.getDate(), this.startTime, this.endTime, 1);
        newTask.insertWindow();
    }


}
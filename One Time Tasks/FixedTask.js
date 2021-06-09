// We can have a checkbox to choose if it for today or another day? / by default the numbers are already there
// Time option before asking number of sessions 

class FixedTask extends OneTimeTask {
    constructor(taskName, taskCategory, startTime, endTime, taskBeforeIt) {
        super(taskName, taskCategory, taskBeforeIt);
        this.startTime = startTime; //Time objects
        this.endTime = endTime;
        //this.duration = Time.duration(startTime, endTime);
    }

    addTask() {
        //ensure it is not during sleep time
        //ensure it is not during other fixed time tasks
        //adjust windows accordingly (windows are empty pockets of time excluding breaks)
        //instead of string for window type, just 0 or 1?
        let taskWindow = new Window(this.startTime, this.endTime, "task");
        if (!taskWindow.duringSleep()) {
            let disruptedWindow = null;
            let index = 0;
            while (Window.prototype.arr[index].getEndTime().getTime() < taskWindow.getStartTime().getTime()) {
                index++;
            }
            //scenario 2 and 4
            if (Window.prototype.arr[index].getStartTime().getTime() <= taskWindow.getStartTime().getTime()) {
                //scenario 4
                if (Window.prototype.arr[index + 1].getStartTime().getTime() <= taskWindow.getEndTime().getTime()) {
                    if (Window.prototype.arr[index].type == null && Window.prototype.arr[index + 1].type == null) {
                        let currYear = this.startTime.getYear();
                        let currMonth = this.startTime.getMonth();
                        let currDate = this.startTime.getDate();

                        //incomplete, change the ending time for first slot
                        Window.prototype.arr[index].changeEndTime(new Time(currYear, currMonth, currDate, ))
                        // change the starting timing for the next slot
                        // insert the curr task window
                    } else {
                        //throw error, unable to schedule bc it clashes with another fixed task
                    }
                }
            // scenario 1 and 3
            } else {
                if (Window.prototype.arr[index].getEndTime().getTime() <= taskWindow.getEndTime().getTime()) {
                    //scenario 3
                    // check if 2nd window is free. If free, change starting time. If not, trigger error. insert the curr task window
                } else {
                    //scenario 1
                    // no problem. insert the curr task window
                }
            }

        }
        
    }


}
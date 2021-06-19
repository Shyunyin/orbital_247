// Dont need to do the group thing if you can just copy and past the name of the task that you are following (meaning all the tasks in the same group will have the same 'taskAfterIt')
class Scheduling {
    static generateSchedule(emptyWindowArr, fixedWindowArr, nonFixedWindowArr, nonFixedWindowPriorityArr) {
        //TODO: Setting up of breaks for fixed tasks
        this.emptyWindowArr = emptyWindowArr;
        this.fixedWindowArr = fixedWindowArr;
        this.nonFixedWindowArr = nonFixedWindowArr;
        this.nonFixedWindowPriorityArr = nonFixedWindowPriorityArr;

        let k;
        //TODO: Need to redo this. A break might not be added after every fixed task and what if you need to carry over the break time?
        for (k = 0; k < this.fixedWindowArr.length; k++) {
            let currWindow = this.fixedWindowArr[k];
            let breakDuration = Time.calculateBreak(currWindow.getStartTime(), currWindow.getEndTime());
            let endTime = Time.findEndTime(currWindow.getEndTime, breakDuration);
            //TODO: Create the findEndTime method

            let newBreak = new Window("Break", currWindow.getYear(), currWindow.getMonth(), currWindow.getDate(), currWindow.getEndTime, endTime, 1);
            newBreak.insertWindow();
        }
        // Settling non-fixed tasks connected to first tasks first
        let i;
        let currArr = this.nonFixedWindowPriorityArr;
        for (i = 0; i < currArr.length; i++) {
            let index = 0;
            while (this.fixedWindowArr[index].getTaskName() != currArr[i].getTaskName()) {
                index++;
            }
            // Start time of the fixed task that is connected to the current non-fixed task
            let startTime = this.fixedWindowArr[index].getStartTimeinMs;
            let endIndex = 0;
            // Finding the empty window right before this task (strictly < than or can be = to ??)
            while (this.emptyWindowArr[endIndex].getEndTimeInMs() < startTime) {
                endIndex++;
            }
            let startIndex = endIndex;

            let durOfCurrWindow = Time.duration(this.emptyWindowArr[startIndex].getStartTime(), this.emptyWindowArr[startIndex].getEndTime());
            // Finding the range of empty windows needs to schedule the connected non-fixed tasks
            while (startIndex > 0 && durOfCurrWindow < currArr[i].getAccumulatedDuration() + Break.calculateBreakFromDuration(currArr[i].getAccumulatedDuration())) {
                durOfCurrWindow = durOfCurrWindow + Time.duration(this.emptyWindowArr[startIndex - 1].getStartTime(), this.emptyWindowArr[startIndex - 1].getEndTime())
                startIndex--;
            }

            let firstTask = i;
            let lastTask = firstTask;
            //TODO: Create the getTaskAfterIt method
            // Finding the range of non-fixed tasks connected to the fixed task
            while (currArr[lastTask].getTaskAfterIt() == currArr[lastTask + 1].getTaskAfterIt()) {
                lastTask++;
            }
            
            let currTask = lastTask;
            // For every connected non-fixed task
                //for (currTask = lastTask; currTask >= firstTask; currTask--) {
            while (currTask >= firstTask && endIndex >= startIndex) {
                let currWindow = this.emptyWindowArr[endIndex];
                let currEndTime = currWindow.getEndTime();
                let windowStartTimeInMs = currWindow.getStartTimeinMs();
                let currStartTime = Time.findStartTime(currEndTime, currArr[currTask].getAccumulatedDuration() + Break.calculateBreakFromDuration(currArr[currTask].getAccumulatedDuration())); //TODO: Create the findStartTime and Break.calculateBreakFromDuration methods

                let currStartTimeInMs = new Date(currWindow.getYear(), currArr[currTask].getMonth(), currArr[currTask].getDate(), currStartTime[0], currStartTime[1]); // Assuming startTime = [hours, mins]
                if (currStartTimeInMs < windowStartTimeInMs) {
                    let maxDuration = Time.duration(currWindow.getStartTime(), currEndTime);
                    let taskEndTime = Time.findEndTime(currWindow.getStartTime(), maxDuration - Break.calculateBreakFromDuration(maxDuration));

                    let newTask = new Window(currArr[currTask].getTaskName(), currWindow.getYear(), currArr[currTask].getMonth(), currArr[currTask].getDate(), currWindow.getStartTime(), taskEndTime, 1);

                    let newBreak = new Window("Break", currWindow.getYear(), currArr[currTask].getMonth(), currArr[currTask].getDate(), taskEndTime, currEndTime, 1);

                    newTask.insertWindow();
                    newBreak.insertWindow();

                    currTask.changeAccumulatedDuration(currTask.getAccumulatedDuration - maxDuration);
                    endIndex--;
                } else {
                    let taskEndTime = Time.findEndTime(currWindow.getStartTime(), currArr[currTask].getAccumulatedDuration()); // cannot be accumulated duration here, maybe a param to maintain the individual duration too? //TODO: Update this accordingly

                    let newTask = new Window(currArr[currTask].getTaskName(), currWindow.getYear(), currArr[currTask].getMonth(), currArr[currTask].getDate(), currWindow.getStartTime(), taskEndTime, 1);

                    let newBreak = new Window("Break", currWindow.getYear(), currArr[currTask].getMonth(), currArr[currTask].getDate(), taskEndTime, currEndTime, 1); //based on the old constructor for Window

                    newTask.insertWindow();
                    newBreak.insertWindow();

                    currArr.splice(currTask, 1);
                    currTask--;
                    currEndTime = startTime;
                }
            }
        }
    }
}
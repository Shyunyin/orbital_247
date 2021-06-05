// remember to add getter and setter methods where necessary
// time is collected in 24 hours
// how do we code to record a task that occupies for specific duration? --> naive idea: create /// a date object for every second, but this occupies way too much memory
// need to determine the formats of the start_time and end_time
// secs and millisecs not rly needed actually
class Task {
    task_name;
    task_category;
    duration;
    
    /*
    constructor(task_name, task_category, duration) {
        if (new.target === Task) {
            throw new TypeError('Abstract class "Task" cannot be instantiated directly.');
        }
        this.task_name = task_name
        this.task_category = task_category
        this.duration = duration
    */
}

//I don't think a child class can be an abstract class as well
class RoutineTask extends Task {
    freq;
    start_time;
    end_time;

    constructor(start_time, end_time, freq) {
        if (new.target === RoutineTask) {
            throw new Error('Abstract class "RoutineTask" cannot be instantiated directly.');
        }
        this.start_time = start_time;
        this.end_time = end_time;
        this.freq = freq;
    }
}

class DailyTask extends RoutineTask {
    constructor(start_time, end_time) {
        super(start_time, end_time, "daily");
    }
    
    addTask(){
        var i;
        for (y = 0; y < Number.MAX_SAFE_INTEGER; y++) {
            for (m = 0; m < 12; m++) {
                // for feb
                if (m == 1) {
                    // need to create function to check if it is a leap year for feb
                    for (d = 0; d < 29; d++) {
                        let date = new Date(y, m, d, this.start_time.prototype.getHours(), this.start_time.prototype.getMins(), this.start_time.prototype.getSecs(), ms)
                    }
                // for apr, jun, sep, nov
                } else if (m == 3 || 5 || 8 || 10) {
                    for (d = 0; d < 31; d++) {
                        let date = new Date(y, m, d, hours, mins, secs, ms)
                    }
                // for jan, mar, may, jul, aug, oct, dec
                } else {
                    for (d = 0; d < 32; d++) {
                        let date = new Date(y, m, d, hours, mins, secs, ms)
                    }
                }
                
            }
        }
    }
    //for loop to add this task to each day --> unsure how to do a javascript for loop
}

class WeeklyTask extends RoutineTask {
    day;
    constructor(start_time, end_time, day) {
        super(start_time, end_time, "weekly");
        this.day = day;
    }
}

class BiweeklyTask extends RoutineTask {
    day;
    start_week;
    constructor(start_time, end_time, day, start_week) {
        super(start_time, end_time, "biweekly");
        this.day = day;
        this.start_week = start_week;
    }
}

class MonthlyTask extends RoutineTask {
    date;
    constructor(start_time, end_time, date) {
        super(start_time, end_time, "monthly");
        this.date = date;
    }
}

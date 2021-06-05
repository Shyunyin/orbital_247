//import Date

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

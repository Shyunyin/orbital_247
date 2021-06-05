
class Task {
    task_name;
    task_category;

    /*
    constructor(task_name, task_category) {
        this.task_name = task_name
        this.task_category = task_category
    }
    */

}

class RoutineTask extends Task {
    freq;
    start_time;
    end_time;

    constructor(start_time, end_time) {
        if (this.constructor === Task) {
            throw new TypeError('Abstract class "RoutineTask" cannot be instantiated directly.');
        }
        if (this.freq === undefined) {
            throw new TypeError('Classes extending the "RoutineTask" abstract class');
        } 
        this.start_time = start_time
        this.end_time = end_time
    }

    /*
    constructor(start_time, end_time) {
        this.freq = freq
        this.start_time = start_time
        this.end_time = end_time
    }
    */
}

class DailyTask extends RoutineTask {
    constructor() {
        super();
    }

    get freq() {
        return "Daily";
    }
}

class WeeklyTask extends RoutineTask {
    constructor() {
        super();
    }

    get freq() {
        return "Weekly";
    }
}

class BiweeklyTask extends RoutineTask {
    constructor() {
        super();
    }

    get freq() {
        return "Biweekly";
    }
}

class MonthlyTask extends RoutineTask {
    constructor() {
        super();
    }

    get freq() {
        return "Monthly";
    }
}

const newTask = new DailyTask();
newTask;
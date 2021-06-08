// remember to add getter and setter methods where necessary
// time is collected in 24 hours
// how do we code to record a task that occupies for specific duration? --> naive idea: create /// a date object for every second, but this occupies way too much memory
// need to determine the formats of the start_time and end_time
// secs and millisecs not rly needed actually
// we should be able to prevent users from scheduling 2 tasks at the same time

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
function daysInMonth(month, year) {
    let x = new Date(year, month, 0);
    return x.getDate();
}

class Task {
    //task_name;
    //task_category;
    //duration;
    
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
    constructor(start_time, end_time, freq) {
        if (new.target === RoutineTask) {
            throw new Error('Abstract class "RoutineTask" cannot be instantiated directly.');
        }
        this.start_time = start_time;
        this.end_time = end_time;
        this.freq = freq;
    }

    static freq(index) {
        if (index < 0 || index > 3) {
            throw new Error('Invalid index')
        } else {
            return RoutineTask.prototype.freq[index];
        }
    }
}

RoutineTask.prototype.freq = ['Daily', 'Weekly', 'Biweekly', 'Monthly'];

class DailyTask extends RoutineTask {

    constructor(start_time, end_time) {
        super(start_time, end_time, RoutineTime.freq(0));
    }
    
    addTask() { 
        for (y = new Date().getFullYear(); y < new Date().getFullYear() + 100; y++) {
            for (m = 1; m < 13; m++) {
                for (d = 1; d <= daysInMonth(m, y); d++) {
                    let elapsed = this.end_time.getTime() - this.start_time.getTime() // in milliseconds
                    let elapsedMins = Math.floor(elapsed / 60000)
                    let elapsedHours = Math.floor(elapsedMins / 60)
                    elapsedMins = elapsedMins - (elapsedHours * 60)

                    for (h = 0; h < elapsedHours; h ++) {
                        for (min = 0; min < elapsedMins; min ++) {
                            let currTime = new Time(y, m, d, h, min, 0);
                            // Only scheduling tasks for the present and the future
                            if (!currTime.isPast()) {
                                currTime.scheduleTask();
                            }
                        }

                    }
                }                
            }
        }
    }

}

class WeeklyTask extends RoutineTask {
    //day;
    constructor(start_time, end_time, day) {
        super(start_time, end_time, RoutineTime.freq(1));
        this.day = day; //is this a number? assuming number for now
    }

    static startingDate(year, month, day) {
        var i;
        for (i = 1; i < 8; i ++) {
            if (new Date(year, month, i).getDay() == day) {
                return i;
            }
        }
    }

    addTask() { 
        for (y = new Date().getFullYear(); y < new Date().getFullYear() + 100; y++) {
            for (m = 1; m < 13; m++) {
                for (d = WeeklyTask.startingDate(y, m, this.day); d <= daysInMonth(m, y); d += 7) {
                    let elapsed = this.end_time.getTime() - this.start_time.getTime() // in milliseconds
                    let elapsedMins = Math.floor(elapsed / 60000)
                    let elapsedHours = Math.floor(elapsedMins / 60)
                    elapsedMins = elapsedMins - (elapsedHours * 60)

                    for (h = 0; h < elapsedHours; h ++) {
                        for (min = 0; min < elapsedMins; min ++) {
                            let currTime = new Time(y, m, d, h, min, 0);
                            // Only scheduling tasks for the present and the future
                            if (!currTime.isPast()) {
                                currTime.scheduleTask();
                            }
                        }

                    }
                }                
            }
        }
    }

}

class BiweeklyTask extends RoutineTask {
    constructor(start_time, end_time, day, start_week) {
        super(start_time, end_time, RoutineTask.freq(2));
        this.start_week = start_week;
        this.day = day;
        // 0 means start this week, 1 means start the following week
    }

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
            return daysInMonth(12, currYear - 1) + actualStartDate
        } else {
            return daysInMonth(currMonth - 1, currYear) + actualStartDate
        }
    }

    addTask() { 
        let previousDate = this.previousDate();
        for (y = new Date().getFullYear(); y < new Date().getFullYear() + 100; y++) {
            for (m = 1; m < 13; m++) {
                for (d = BiweeklyTask.startingDate(y, m, this.day, previousDate); d <= daysInMonth(m, y); d += 14) {
                    let elapsed = this.end_time.getTime() - this.start_time.getTime() // in milliseconds
                    let elapsedMins = Math.floor(elapsed / 60000)
                    let elapsedHours = Math.floor(elapsedMins / 60)
                    elapsedMins = elapsedMins - (elapsedHours * 60)

                    for (h = 0; h < elapsedHours; h ++) {
                        for (min = 0; min < elapsedMins; min ++) {
                            let currTime = new Time(y, m, d, h, min, 0);
                            // Only scheduling tasks for the present and the future
                            if (!currTime.isPast()) {
                                currTime.scheduleTask();
                                previousDate = d
                            }
                        }

                    }
                }                
            }
        }
    }
}

class MonthlyTask extends RoutineTask {
    //date;
    constructor(start_time, end_time, date) {
        super(start_time, end_time, RoutineTask.freq(3));
        this.date = date;
    }

    addTask() {
        for (y = 0; y < 100; y++) {
            for (m = 1; m < 13; m++) {
                let elapsed = this.end_time.getTime() - this.start_time.getTime() // in milliseconds
                let elapsedMins = Math.floor(elapsed / 60)
                let elapsedHours = Math.floor(elapsedMins / 60)
                elapsedMins = elapsedMins - (elapsedHours * 60)

                for (h = 0; h < elapsedHours; h ++) {
                    for (min = 0; min < elapsedMins; min ++) {
                        let currTime = new Time(y, m, this.date, h, min, 0);
                        // To ensure that 29, 30 and 31 is not scheduled for all months 
                        if (!currTime.isPast() && (this.date <= daysInMonth(m ,y))) {
                            currTime.scheduleTask();
                        }
                    }

                }               
            }
        }
    }
}

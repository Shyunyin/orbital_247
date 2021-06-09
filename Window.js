// A window can be task + break
class Window {
    constructor(startTime, endTime, type) {
        this.startTime = startTime; // all Time objects so year month and date alr included
        this.endTime = endTime;
        this.type = type;
    }

    insertWindow() {
        index = 0;
        while (index < Window.prototype.arr.length && this.startTime.getTime() > Window.prototype.arr[index].startTime.getTime()) {
            index++;
        }
        Window.prototype.arr.splice(index, 0, this);
    }

    getStartTime() {
        return this.startTime;
    }

    getEndTime() {
        return this.startTime;
    }

    changeStartTime(newStartTime) {
        this.startTime = newStartTime;
    }

    changeEndTime(newEndTime) {
        this.EndTime = newEndTime;
    }

    getYear() {
        return this.startTime.getYear();
    }

    getMonth() {
        return this.startTime.getMonth();
    }

    getDate() {
        return this.startTime.getDate();
    }

    duringSleep() {
        let currYear = this.getYear();
        let currMonth = this.getMonth();
        let currDate = this.getDate();

        let sleepStartTime = new Time(currYear, currMonth, currDate, Info.getSleepTimeHours, Info.getSleepTimeMins).getTime();

        let sleepEndTime = new Time(currYear, currMonth, currDate + 1, Info.getWakeUpTimeHours(), Info.getWakeUpTimeMins()).getTime();

        if (this.startTime.getTime() >= sleepStartTime && 
            this.startTime.getTime() <= sleepStartTime) {
                return true;
        }

        if (this.endTime.getTime() >= sleepStartTime && 
        this.endTime.getTime() <= sleepStartTime) {
            return true;
        }

        return false;
    }

    static initialise() {
        let startTime = new Time(this.year, this.month, this.date, 
            Info.getWakeUpTime.getHours(), Info.getWakeUpTime.getMins());
        let endTime = new Time(this.year, this.month, this.date, 
            Info.getSleepTime.getHours(), 59 - Info.getSleepTime.getMins());
        let wholeDay = new Window(startTime, endTime)
        Window.prototype.arr.push(wholeDay);
    }

}

Window.prototype.arr = [];

//Window.prototype.sleep = new Window()
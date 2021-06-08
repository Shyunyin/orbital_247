class Time {
    constructor(y, m, d, h, min) {
        this.date = new Date(y, m, d, h, min, 0);
    }

    isPast() {
        this.date.getTime() < new Date().getTime()
    }

    isSlotFree() {
        var i;
        for(i = 0; i < Time.prototype.freeTimes.length; i ++) {
            if (this.date.getTime() == Time.prototype.freeTimes[i].date.getTime()) {
                return true;
            }
        }
        return false;
    }

    scheduleTask() {
        var i;
        for(i = 0; i < Time.prototype.freeTimes.length; i ++) {
            if (this.date.getTime() == Time.prototype.freeTimes[i].date.getTime()) {
                Time.prototype.freeTimes.splice(i, 1)
                return;
            }
        }
    }

    removeTask() {
        Time.prototype.freeTimes.push(this)
    }

    static initialise() {
        var y;
        var m;
        var d;
        var h;
        var min;
        for (y = 0; y < 100; y++) {
            for (m = 1; m < 13; m++) {
                for (d = 1; d <= daysInMonth(m, y); d++) {
                    for (h = 0; h < 24; h ++) {
                        for (min = 0; min < 60; min++) {
                            // diff between let and var?
                            let newTime = new Time(y, m, d, h, min, 0);
                            Time.prototype.freeTimes.push(newTime);
                        }
                    }
                }
            }
        }
    }

}

Time.prototype.freeTimes = [];

function daysInMonth(month, year) {
    let x = new Date(year, month, 0);
    return d.getDate();
}

// Instantiating all timings as free slots upon registration

// Testing
/*
let testTime = new Time(0, 1, 1, 1, 1, 0)
let testTime2 = new Time(0, 1, 1, 1, 1, 0)
let testTime3 = new Date(0, 1, 1, 1, 1, 0);
let testTime4 = new Date(0, 1, 1, 1, 1, 0);

testTime2.freeSlot()
testTime2.scheduleTask()
testTime2.freeSlot()
testTime2.removeTask()
testTime2.freeSlot()
*/
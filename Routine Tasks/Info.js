class Info {
    constructor(wakeUpTime, productiveSlot) {
        this.wakeUpTime = wakeUpTime; // maybe an array [Hours, Mins]
        this.productiveSlot = productiveSlot;
        this.sleepTime = [(this.wakeUpTime[0] + 16) % 24, this.wakeUpTime[1]]
    }

    static getWakeUpTime() {
        return this.wakeUpTime;
    }

    static getWakeUpTimeHours() {
        return this.wakeUpTime[0];
    }

    static getWakeUpTimeMins() {
        return this.wakeUpTime[1];
    }

    static getSleepTime() {
        return this.sleepTime;
    }

    static getSleepTimeHours() {
        return this.sleepTime[0];
    }

    static getSleepTimeMins() {
        return this.sleepTime[1];
    }

    static getProductiveSlot() {
        return this.productiveSlot;
    }
}
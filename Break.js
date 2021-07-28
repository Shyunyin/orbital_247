class Break {
    /**
     * Calculates 
     * @param {Time} startTime 
     * @param {Time} endTime 
     * @returns 
     */
    static calculateBreak(startTime, endTime) {
        duration = Time.duration(startTime, endTime);
        if (duration.getHours() >= 1) {
            let totalMins = (duration.getHours() * 60) + duration.getMins();
            let breakMins = totalMins / 6;
            let remainder = breakMins % 5
            if (remainder < 2.5) {
                breakMins = breakMins - remainder;
            } else {
                breakMins = breakMins - remainder + 5;
            }
            return breakMins;
        } else {
            return 0;
        }
    }

    static calculateBreakFromDuration(duration) {
        if (duration.getHours() >= 1) {
            let totalMins = (duration.getHours() * 60) + duration.getMins();
            let breakMins = totalMins / 6;
            let remainder = breakMins % 5
            if (remainder < 2.5) {
                breakMins = breakMins - remainder;
            } else {
                breakMins = breakMins - remainder + 5;
            }
            return breakMins;
        } else {
            return 0;
        }
    }
}



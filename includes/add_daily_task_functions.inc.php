<?php
    /*
    //The year, month and date variable can be replaced with this single variable:
    //taskDate datetime NOT NULL (input will be in the format of yyyy-mm-dd or yyyy-mm-dd hh:mm:ss)
    //When retrieving, since it will be a string, can just splice the string to get the various values

    //Creating the emptyWindows table
    CREATE TABLE emptyWindows (
        userId int PRIMARY KEY AUTO_INCREMENT NOT NULL,
        userName varchar(256) NOT NULL,
        windowName varchar(256) NOT NULL,
        year int NOT NULL,
        month int NOT NULL,
        date int NOT NULL,
        startTimeHours int(23) NOT NULL, 
        startTimeMins int(59) NOT NULL,
        endTimeHours int(23) NOT NULL,
        endTimeMins int(59) NOT NULL
    );

    //Creating the fixedTasks table
    CREATE TABLE fixedTasks (
        userId int PRIMARY KEY AUTO_INCREMENT NOT NULL,
        userName varchar(256) NOT NULL,
        taskName varchar(256) NOT NULL,
        year int NOT NULL,
        month int NOT NULL,
        date int NOT NULL,
        startTimeHours int(23) NOT NULL,
        startTimeMins int(59) NOT NULL,
        endTimeHours int(23) NOT NULL,
        endTimeMins int(59) NOT NULL
    );

    //Creating the nonFixedTasks table
    CREATE TABLE nonFixedTasks (
        userId int PRIMARY KEY AUTO_INCREMENT NOT NULL,
        userName varchar(256) NOT NULL,
        taskName varchar(256) NOT NULL,
        taskCategory int(5) NOT NULL,
        year int NOT NULL,
        month int NOT NULL,
        date int NOT NULL,
        numOfSessions int(3) NOT NULL,
        durrOfSessHours int() NOT NULL, // What are the limits?
        durrOfSessMins int(59) NOT NULL,
        taskAfterIt varchar(256) NOT NULL
    );

    //Creating the nonFixedTasksPriority table
    CREATE TABLE nonFixedTasksPriority (
        userId int PRIMARY KEY AUTO_INCREMENT NOT NULL,
        userName varchar(256) NOT NULL,
        taskName varchar(256) NOT NULL,
        taskCategory int(5) NOT NULL,
        year int NOT NULL,
        month int NOT NULL,
        date int NOT NULL,
        numOfSessions int(3) NOT NULL,
        durrOfSessHours int() NOT NULL, // What are the limits?
        durrOfSessMins int(59) NOT NULL,
        taskAfterIt varchar(256) NOT NULL
    );
    */

    function retrieveFixedTasks($year, $month, $date) {
        
    }
?>
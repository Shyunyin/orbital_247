// Class for one time tasks to be created
export class OneTimeTask {
    constructor(taskName, taskCategory, year, month, date) {
        this.taskName = taskName;
        this.taskCategory = taskCategory;
        this.year = year;
        this.month = month;
        this.date = date;
    }
}

OneTimeTask.prototype.cats = ['Work', 'Exercise', 'Miscellaneous', 'Meal', 'Fully Work', 'Partially Work'];

/*Initialising firebase*/
var firebaseConfig = {
    apiKey: "AIzaSyBtFGTnYwEU5OgIa4SpKvMaGAa1ofEjs3U",
    authDomain: "orbital-24-7.firebaseapp.com",
    projectId: "orbital-24-7",
    storageBucket: "orbital-24-7.appspot.com",
    messagingSenderId: "459091456870",
    appId: "1:459091456870:web:21134477e94d50e25ecea7",
    measurementId: "G-WQMCMBMFCK"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var firestore = firebase.firestore();
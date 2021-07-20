<!DOCTYPE html>
<head>
    <title>Statistics Page</title>
    <link rel="stylesheet" href="statistics.css" />
    <script type = "text/javascript" type="module" src="statistics.js"></script>
    <!--Importing Firebase and Cloud Firestore libraries-->
    <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-firestore.js"></script>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Signika+Negative:wght@600&display=swap" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>
    <!--Main division for the background-->
    <div id="background">
        <div class="btn-group">
            <button class="button" onclick="schedule()">Schedule</button>
            <button class="button">Statistics</button>
            <button class="button" onclick="routine()">Routine</button>
        </div>
        <div class="main"></div>
    </div>
</body>
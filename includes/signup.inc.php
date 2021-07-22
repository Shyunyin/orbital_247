<?php
    //echo ("It works!");
    if (isset($_POST['submit'])) {
        //echo "<p>It works!</p>";

        $name = $_POST["username"];
        $email = $_POST["email"];
        $pwd = $_POST["pwd"];
        $pwdRepeat = $_POST["cfm_pwd"];

        require_once 'dbh.inc.php';
        require_once 'functions.inc.php';

        /*----------------------------Errorhandling----------------------------*/

        //error handling for empty fields
        if (emptyInputSignup($name, $email, $pwd, $pwdRepeat) == true) {
            header("location: ../local_sign_up.php?error=emptyinput");
            exit();
        }

        //error handling for invalid id
        if (invalidUid($username) == true) {
            header("location: ../local_sign_up.php?error=invaliduid");
            exit();
        }

        //error handling for invalid email
        if (invalidEmail($email) == true) {
            header("location: ../local_sign_up.php?error=invalidemail"); 
            exit();
        }

        //error handling for unmatched passwords
        if (pwdMatch($pwd, $pwdRepeat) == true) {
            header("location: ../local_sign_up.php?error=passwordsdontmatch"); 
            exit();
        }

        //if username already exists
        if (uidExists($conn, $username, $email) == true) {
            header("location: ../local_sign_up.php?error=usernametaken"); 
            exit();
        }

        createUser($conn, $name, $email, $pwd);

    } else {
        //echo "<p>Sign up not successful</p>";
        header("location: ../local_sign_up.php"); //sends user back to sign up page if user did not sign in correctly
        exit();
    }
?>
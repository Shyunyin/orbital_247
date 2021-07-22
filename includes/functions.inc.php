<?php
require_once 'dbh.inc.php';

function emptyInputSignup($name, $email, $pwd, $pwdRepeat) {
    $result; //return true or false
    if (empty($name) || empty($email) || empty($pwd) || empty($pwdRepeat)) { //inbuilt php data
        $result = true; //indicates error
    } else {
        $result = false;
    }
    return $result;
}

function invalidUid($username) {
    $result; //return true or false
    if (!preg_match("/^[a-zA-Z0-9]*$/", $username)) {
        $result = true;
    }
    else {
        $result = false;
    }
    return $result;
}

function invalidEmail($email) {
    $result; //return true or false
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { //inbuilt php data
        $result = true; //indicates error
    } else {
        $result = false;
    }
    return $result;
}

function pwdMatch($pwd, $pwdRepeat) {
    $result; //return true or false
    if ($pwd !== $pwdRepeat) { 
        $result = true; //indicates error
    } else {
        $result = false;
    }
    return $result;
}

function uidExists($conn, $username, $email) {
    $sql = "SELECT * FROM users WHERE usersUid = ? OR usersEmail = ?;";
    $stmt = mysqli_stmt_init($conn); //prepared statement
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        header("location: ../local_sign_up.php?error=stmtfailed"); 
        exit();
    } 

    mysqli_stmt_bind_param($stmt, "ss", $username, $email);
    mysqli_stmt_execute($stmt);

    $resultData = mysqli_stmt_get_result($stmt);

    if ($row = mysqli_fetch_assoc($resultData)) {
        return $row;
    } else {
        $result = false;
        return $result;
    }

    mysqli_stmt_close($stmt);
}

/*
function uidExists($conn, $username, $email) {
    $sql = "SELECT * FROM users WHERE usersUid = ?;";
    $stmt = mysqli_stmt_init($conn); //prepared statement
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        header("location: ../local_sign_up.php?error=stmtfailed"); 
        exit();
    } else {
        mysqli_stmt_bind_param($stmt, "s", $username);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_store_result($stmt);
        $resultCheck = my_sqli_stmt_num_rows($stmt);
        if ($resultCheck > 0) {
            return true;
        } else {
            return false;
        }
    }
}
*/

function createUser($conn, $name, $email, $pwd) {
    $sql = "INSERT INTO users (usersUid, usersEmail, usersPwd) VALUES (?, ?, ?);";
    $stmt = mysqli_stmt_init($conn); //prepared statement
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        header("location: ../local_sign_up.php?error=stmtfailed"); 
        exit();
    } else { 
        $hashedPwd = password_hash($pwd, PASSWORD_DEFAULT);

        mysqli_stmt_bind_param($stmt, "sss", $name, $email, $hashedPwd);
        mysqli_stmt_execute($stmt);
        //to check if user exists and link everything to userid
        $uidExists = uidExists($conn, $username, $email);
        if ($uidExists === false) {
            header("location: ../login.php?error=wronglogin");
            exit();
        }
        //to start the session after signing in
        session_start();
        //create super global session variable
        $_SESSION["userid"] = $uidExists["usersId"];
        $_SESSION["useruid"] = $uidExists["usersUid"];
        mysqli_stmt_close($stmt);
        // echo($_SESSION["userid"]);
        header("location: ../add_routine_task.php"); //go to first page
        exit();
        // header("location: ../login.php");
        //header("location: ../local_sign_up.php?error=none"); 
        // exit();
    }
}

function emptyInputLogin($username, $pwd) {
    $result; //return true or false
    if (empty($username) || empty($pwd)) { //inbuilt php data
        $result = true; //indicates error
    } else {
        $result = false;
    }
    return $result;
}

function loginUser($conn, $username, $pwd) {
    $uidExists = uidExists($conn, $username, $username);

    if ($uidExists === false) {
        header("location: ../login.php?error=wronglogin");
        exit();
    }

    $pwdHashed = $uidExists["usersPwd"];
    $checkPwd = password_verify($pwd, $pwdHashed);

    if ($checkPwd === false) {
        header("location: ../login.php?error=wronglogin");
        exit();
    }
    else if ($checkPwd === true) {
        session_start();
        //create super global session variable
        $_SESSION["userid"] = $uidExists["usersId"];
        $_SESSION["useruid"] = $uidExists["usersUid"];
        header("location: ../main_schedule.php"); //go to first page
        exit();

        // echo($_SESSION["userid"]);
   
    }
}

?>

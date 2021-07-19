<?php

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

function createUser($conn, $name, $email, $pwd) {
    $sql = "INSERT INTO users (usersUid, usersEmail, usersPwd) VALUES (?, ?, ?);";
    $stmt = mysqli_stmt_init($conn); //prepared statement
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        header("location: ../local_sign_up.php?error=stmtfailed"); 
        exit();
    } 

    $hashedPwd = password_hash($pwd, PASSWORD_DEFAULT);

    mysqli_stmt_bind_param($stmt, "sss", $username, $email, $hashedPwd);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    header("location: ../local_sign_up.php?error=none"); 
    exit();
}

?>
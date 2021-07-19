<?php
    if ( isset( $_POST['submit'] ) ) {
        echo("I am successfully submitted");
        //exit; // added to stop execution if more code is below it
    }
    else{
        echo "It is not set.";
    }
?>
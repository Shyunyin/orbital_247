<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>Local Sign Up</title>

		<style>
			@import url("https://fonts.googleapis.com/css2?family=Signika+Negative&display=swap");

			.body {
				position: fixed;
				overflow-y: scroll;
				width: 100%;
				top: -20px;
				right: -40px;
				width: auto;
				height: auto;
				background-color: black;
			}

			.head {
				position: absolute;
				top: calc(50% - 35px);
				left: calc(50% -255px);
			}
			/* This is for the big 24/7 symbol at the top left hand corner. */
			.header div {
                position: absolute;
                top: calc(35% - 50px);
                left: calc(51% - 50px);
				color: black;
				font-family: "Signika Negative", sans-serif;
				font-size: 50px;
				font-weight: 200;
			}

            .subheader div {
                position: absolute;
                top: calc(44% - 50px);
                left: calc(47% - 50px);
				color: black;
				font-family: "Signika Negative", sans-serif;
				font-size: 20px;
				font-weight: 200;
			}

			.login {
				position: absolute;
				top: calc(50% - 75px);
				left: calc(45% - 50px);
				height: 150px;
				width: 350px;
				padding: 10px;
			}

			/* for the username box. */
			.login input[type="text"] {
				width: 250px;
				height: 30px;
				background: #96d6ed;
				border: 1px solid rgba(255, 255, 255, 0.6);
				border-radius: 2px;
				color: black;
				font-family: "Signika Negative", sans-serif;
				font-size: 16px;
				font-weight: 400;
				padding: 4px;
				margin-top: 10px;
			}

			/* For the password box. */
			.login input[type="password"] {
				width: 250px;
				height: 30px;
				background: #96d6ed;
				border: 1px solid rgba(255, 255, 255, 0.6);
				border-radius: 2px;
				color: black;
				font-family: "Signika Negative", sans-serif;
				font-size: 16px;
				font-weight: 400;
				padding: 4px;
				margin-top: 10px;
			}

			.login input[type="confirm_password"] {
				width: 250px;
				height: 30px;
				background: #96d6ed;
				border: 1px solid rgba(255, 255, 255, 0.6);
				border-radius: 2px;
				color: black;
				font-family: "Signika Negative", sans-serif;
				font-size: 16px;
				font-weight: 400;
				padding: 4px;
				margin-top: 10px;
			}

			/* For the login button. */
			.login input[type="button"] {
				position: absolute;
				left: calc(35% - 50px);
				width: 130px;
				height: 30px;
				background: #e3aba1;
				border: 1px black;
				cursor: pointer;
				border-radius: 2px;
				color: black;
				font-family: "Signika Negative", sans-serif;
				font-size: 16px;
				font-weight: 400;
				padding: 6px;
				margin-top: 25px;
			}

			.login input[type="button"]:hover {
				opacity: 0.8;
			}

			.login input[type="button"]:active {
				opacity: 0.6;
			}

            /* A boarder to created to "highlight" the selected field. */
			.login input[type="text"]:focus {
				outline: none;
				border: 1px solid rgba(255, 255, 255, 0.9);
			}

			.login input[type="email"]:focus {
				outline: none;
				border: 1px solid rgba(255, 255, 255, 0.9);
			}

			.login input[type="password"]:focus {
				outline: none;
				border: 1px solid rgba(255, 255, 255, 0.9);
			}

			.login input[type="button"]:focus {
				outline: none;
			}

			.member {
				position: absolute;
				top: calc(85% - 50px);
				left: calc(49% - 50px);
				font-family: "Signika Negative", sans-serif;
			}

			/* For the word 'username' and 'password' in the username and password boxes. */
			::-webkit-input-placeholder {
				color: rgba(50, 50, 50, 0.3);
			}

			::-moz-input-placeholder {
				color: rgba(255, 255, 255, 0.6);
			}

			#confirm {
				font-family: 'Signika Negative', sans-serif;
				background-color: #e3aba1; 
				border-radius: 5px; 
				margin-top: 20px;
				margin-left: 90px;
			}
		</style>
	</head>

	<body style="background-color: #f7f6f1" oncontextmenu="return false">

		<div class="body"></div>
		<div class="grad"></div>
		<div class="header">
			<div>24/7</div> <br>
		</div>
        <div class="subheader">
            <div>Create your account now!</div> <br>
        </div>

		
 		<div class="login">
			<form action="includes/signup.inc.php" method="POST">
				<input type="text" name="username" id="name" placeholder="Username" >
				<br />
				<input type="text" placeholder="Email" name="email" id="email_id"><br />
				<input type="password" placeholder="Password" name="pwd" id="pwd"><br />
				<input type="password" placeholder="Confirm Password" name="cfm_pwd">
				<br />
				<button type="submit" id="confirm" name="submit">Confirm</button>
			</form>
		</div>

		<!-- Error handling -->
		<?php
			if (isset($_GET["error"])) {
				if ($_GET["error"] == "emptyinput") {
					echo "<p>Fill in all fields!</p>";
				}
				else if ($_GET["error"] == "invaliduid") {
					echo "<p>Fill in all fields!</p>";
				}
				else if ($_GET["error"] == "invalidemail") {
					echo "<p>Fill in a valid email address!</p>";
				}
				else if ($_GET["error"] == "passwordsdontmatch") {
					echo "<p>Passwords don't match!</p>";
				}
				else if ($_GET["error"] == "stmtfailed") {
					echo "<p>Something went wrong, try again!</p>";
				}
				else if ($_GET["error"] == "usernametaken") {
					echo "<p>Username already taken!</p>";
				}
			}
		?>
		<footer class="footer">
			<a class="member" href="http://localhost/login.php">Already have an account?</a>
		</footer>
	</body>
</html>

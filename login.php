<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>Login</title>
		<style>
			@import url("https://fonts.googleapis.com/css2?family=Signika+Negative&display=swap");

			/* css for body of the login page */
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

			/* css for head of the login page */
			.head {
				position: absolute;
				top: calc(50% - 35px);
				left: calc(50% -255px);
			}
			/* This is for the big 24/7 symbol at the top left hand corner. */
			.header div {
				position: absolute;
				top: calc(30% - 75px);
				left: calc(51% - 50px);
				color: black;
				font-family: "Signika Negative", sans-serif;
				font-size: 50px;
				font-weight: 200;
			}

			/* css for login section */
			.login {
				position: absolute;
				top: calc(50% - 75px);
				left: calc(45% - 50px);
				height: 150px;
				width: 350px;
				padding: 10px;
			}

			/* For the username box. */
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

			/* For the login button. */
			.login input[type="button"] {
				width: 260px;
				height: 35px;
				background: #e3aba1;
				border: 1px black;
				cursor: pointer;
				border-radius: 2px;
				color: black;
				font-family: "Signika Negative", sans-serif;
				font-size: 16px;
				font-weight: 400;
				padding: 6px;
				margin-top: 10px;
			}

			/* css for when hovering over login button. */
			.login input[type="button"]:hover {
				opacity: 0.8;
			}

			/* css for when hovering over google login button. */
			.login input[type="google_button"]:hover {
				opacity: 0.8;
			}

			/* css for when typing into email field. */
			.login input[type="button"]:active {
				opacity: 0.6;
			}

			/* css for when typing into password field. */
			.login input[type="google_button"]:active {
				opacity: 0.6;
			}

			/* css for when email field is selected. */
			.login input[type="text"]:focus {
				outline: none;
				border: 1px solid rgba(255, 255, 255, 0.9);
			}
			
			/* css for when password field is selected */
			.login input[type="password"]:focus {
				outline: none;
				border: 1px solid rgba(255, 255, 255, 0.9);
			}

			/* css for when log in button is selected */
			.login input[type="button"]:focus {
				outline: none;
			}

			/* css for when "Sign in with Google" button is selected */
			.login input[type="google_button"]:focus {
				outline: none;
			}

			/* I think this can be removed. */
			.btn span.icon {
				background: url(https://images.app.goo.gl/6YGurJvGD7Rvz4Rr9) no-repeat;
				position: absolute;
				top: calc(67% - 50px);
				left: calc(50.5% - 50px);
				width: 10px;
				height: 40px;
			}

			/* css for 'Forgot password' field. */
			.forgotten {
				position: absolute;
				top: calc(67% - 50px);
				left: calc(50.5% - 50px);
				font-family: "Signika Negative", sans-serif;
			}

			/* css for 'Don't have an account' field. */
			.create {
				position: absolute;
				top: calc(71% - 50px);
				left: calc(49.3% - 50px);
				font-family: "Signika Negative", sans-serif;
			}

			/* css for 'or' text between google and 24/7 login. */
			.or {
				position: absolute;
				top: calc(18% - 50px);
				left: calc(43% - 50px);
				font-family: "Signika Negative", sans-serif;
			}

			/* css for placeholder text (e.g. 'Email' in the email field). Supports safari and google chrome. */
			::-webkit-input-placeholder {
				color: rgba(50, 50, 50, 0.3);
			}

			/* css for placeholder text (e.g. 'Email' in the email field). Supports mozilla
			firefox. */
			::-moz-input-placeholder {
				color: rgba(255, 255, 255, 0.6);
			}

			#loginbtn {
				background-color: #e3aba1; 
				border-radius: 5px; 
				margin-top: 20px;
				margin-left: 90px;
			}
		</style>
	</head>

	<!-- The body of the html page. -->
	<body style="background-color: #f7f6f1" oncontextmenu="return false">
		<div class="body"></div> <!-- not needed (i think)-->
		<div class="grad"></div> <!-- not needed (i think)-->
		<!-- for 24/7 logo -->
		<div class="header">
			<div>24/7</div>
		</div>
		<br />

		<div class="login">
			<div class="or">---- or ----</div>
			<!-- need to change type and name to email but need to update css accordingly-->
			<form action="includes/login.inc.php" method="POST">
				<input type="text" placeholder="Username/Email" name="uid" id="email_id"/><br />
				<input type="password" placeholder="Password" name="pwd" id="pwd"/><br />
				<button type="submit" name="submit" id="loginbtn">Log In</button>
			</form>	
		</div>
		<!-- Error handling -->
		<?php
			if (isset($_GET["error"])) {
				if ($_GET["error"] == "emptyinput") {
					echo "<p>Fill in all fields!</p>";
				}
				else if ($_GET["error"] == "wronglogin") {
					echo "<p>Incorrect login info!</p>";
				}
			}
		?>
		<footer class="footer">
			<a class="create" href="../local_sign_up.php"
				>Don't have an account?</a
			>
			<a class="forgotten" href="../forgot_password.php">Forgot password?</a>
		</footer>
	</body>
</html>
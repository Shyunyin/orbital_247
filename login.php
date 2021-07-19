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
					<button type="submit" name="submit">Log In</button>
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
				<a class="create" href="http://127.0.0.1:5501/local_sign_up.html"
					>Don't have an account?</a
				>
				<a class="forgotten" href="http://127.0.0.1:5501/forgot_password.html">Forgot password?</a>
			</footer>
		</form>

		

		<!-- <script language="javascript">
			function check(form) {
				//if (form.userid.value == "hello" && form.pwd.value == "world") {
                    return (login());
					window.location.href = "http://127.0.0.1:5501/add_routine_task.html"; //change to productivity page
					window.alert("Welcome! For a start, please input your routine tasks such as exercise times, meal times, daily, weekly, biweekly or monthly events!");
					//TODO: Need to figure out a way to go into the user's database as well
					//window.open("https://example.com");
				//} else {
				//	alert("Incorrect username or password! Please try again");
				//}
			}
		</script> -->

        <!-- The core Firebase JS SDK is always required and must be listed first -->
        <!-- <script src="https://www.gstatic.com/firebasejs/8.6.3/firebase-app.js"></script> -->


        <!-- TODO: Add SDKs for Firebase products that you want to use
            https://firebase.google.com/docs/web/setup#available-libraries -->
        <!-- <script src="https://www.gstatic.com/firebasejs/8.6.3/firebase-auth.js"></script> -->
        <!-- <script src="https://www.gstatic.com/firebasejs/8.6.3/firebase-analytics.js"></script> -->
		<!--Importing Firebase and Cloud Firestore libraries-->
		<!-- <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-firestore.js"></script> -->

        <!-- <script> -->
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        // var firebaseConfig = {
        //     apiKey: "AIzaSyBtFGTnYwEU5OgIa4SpKvMaGAa1ofEjs3U",
        //     authDomain: "orbital-24-7.firebaseapp.com",
        //     projectId: "orbital-24-7",
        //     storageBucket: "orbital-24-7.appspot.com",
        //     messagingSenderId: "459091456870",
        //     appId: "1:459091456870:web:21134477e94d50e25ecea7",
        //     measurementId: "G-WQMCMBMFCK"
        // };
        // // Initialize Firebase
        // firebase.initializeApp(firebaseConfig);
        // firebase.analytics();
        

        //     function login() {
        //         //Must use web v8
        //         var userEmail = document.getElementById("email_id").value;
        //         var userPassword = document.getElementById("pwd").value;
                
        //         firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
        //             .then((userCredential) => {
        //                 // Signed in
        //                 var user = userCredential.user;
        //                 window.alert("Welcome " + userEmail + ". " + "For a start, please input your routine tasks such as exercise times, meal times, daily, weekly, biweekly or monthly events!");
		// 				window.location.href = "http://127.0.0.1:5501/add_routine_task.html"; //change to productivity page
        //             })
        //             .catch((error) => {
        //                 var errorCode = error.code;
        //                 var errorMessage = error.message;
        //                 window.alert("Error: " + errorMessage);
        //             });
        //     }

			
		// 	var provider = new firebase.auth.GoogleAuthProvider();
        //     //Google authentication
        //     function google_sign_in() {
		// 		//window.alert("i am clicked")
        //         firebase.auth()
        //             .signInWithPopup(provider)
        //             .then(result=>{
		// 				console.log(result)
        //                 //firebase.auth.OAuthCredential = T7dI67VIadLbD8mzBzUkTkpG;
        //                 //var credential = result.credential;

        //                 // This gives you a Google Access Token. You can use it to access the Google API.
        //                 //var token = credential.accessToken;
        //                 // The signed-in user info.
        //                 //var user = result.user;
        //                 // ...
		// 				//return ("http://127.0.0.1:5502/afterlogin.html");
		// 				window.alert("Welcome!" + "For a start, please input your routine tasks such as exercise times, meal times, daily, weekly, biweekly or monthly events!");
		// 				window.location.href = "http://127.0.0.1:5501/add_routine_task.html"; //change to productivity page
				
        //             }).catch(error=>{
		// 				console.log(error)
        //                 // Handle Errors here.
        //                 var errorCode = error.code;
        //                 var errorMessage = error.message;
        //                 // The email of the user's account used.
        //                 var email = error.email;
        //                 // The firebase.auth.AuthCredential type that was used.
        //                 var credential = error.credential;
		// 				window.alert("Error: " + errorMessage)
        //                 // ...
        //             });
        //     }
        // </script>

	</body>
</html>


		<!-- <style type="text/css">
			@import url("https://fonts.googleapis.com/css2?family=Signika+Negative&display=swap");

			#customBtn {
				position: absolute;
				top: calc(37% - 50px);
				left: calc(45.5% - 50px);
				width: 250px;
				height: 30px;
				border: 1px black;
				cursor: pointer;
				border-radius: 2px;
				color: black;
				font-family: "Signika Negative", sans-serif;
				font-size: 16px;
				font-weight: 400;
				padding: 6px;
				margin-top: 10px;
				display: inline-block;
				background: #e3aba1; /* colour of google button */
				white-space: nowrap;
			}
			#customBtn:hover {
				cursor: pointer;
			}
			span.label {
				font-family: "Signika Negative", sans-serif;
				color: black;
				font-family: "Signika Negative", sans-serif;
				font-size: 16px;
				font-weight: 400;
			}
			span.buttonText {
				position: absolute;
				top: calc(15%);
				left: calc(47% - 50px);
				padding: 6px;
				font-size: 16px;
				font-weight: 400;
				font-family: "Signika Negative", sans-serif;
			}
			.google_icon {
				position: absolute;
				top: calc(15%);
				left: calc(25% - 50px);
			}
		</style> -->
		<!-- <body> -->
		<!-- In the callback, you would hide the gSignInWrapper element on a
    successful sign in -->
		<!-- <div id="gSignInWrapper"> -->
			<!-- <div id="customBtn" class="customGPlusSignIn" onclick=google_sign_in()> -->
				<!-- <div class="google_icon"> -->
					<!-- <img
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
						height="29px"
						width="29px"
					/> -->
				<!-- </div> -->
				<!--data-onsuccess="onSignIn"-->
				<!-- <span class="buttonText">Log in with Google</span> -->
			<!-- </div> -->
		<!-- </div> -->
		<!-- <div id="name"></div> -->
		<!-- <script>
			//startApp();
		</script> -->
	<!-- </body> --> -->



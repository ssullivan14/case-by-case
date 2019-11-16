<?php

session_start();

// Initializing Variables
$username = "";
$email = "";

$errors = array();

// Connect to DB
$db = mysqli_connect('local', 'root', '', 'security') or die('Could Not Connect to Database');

// Register Users
$username = mysqli_real_escape_string($db, $POST['username']);
$email =  mysqli_real_escape_string($db, $POST['email']);
$password_1 = mysqli_real_escape_string($db, $POST['password_1']);
$password_2 =  mysqli_real_escape_string($db, $POST['password_2']);

// Form Validation
if (empty($username)) {array_push($errors, "Field is Required")};
if (empty($email)) {array_push($errors, "Field is Required")};
if (empty($password_1)) {array_push($errors, "Field is Required")};
if ($password_1 != $password_2){array_push($errors, "Passwords must Match")};

// Check DB for exsisting Username
$user_check_query = "SELECT * FROM user WHERE username = '$username' or email = '$email' LIMIT 1 ";

$result = mysqli_query($db, $user_check_query);
$user = mysqli_fetch_assoc($result)

if($user) {

  if($user['username'] === $username){array_push($errors, "Username already exists")};
  if($user['email'] === $username){array_push($errors, "Email id already has a registered username")};
}

// Register User if no error
if (count($errors)== 0) {
  $password = md5($password_1); // This will encrypt the passwords
  $query = " INSERT INTO user (username, email, password) VALUE ('$username', '$email', '$password')";

  mysqli_query($db, $query);

  $_SESSION['username'] = $username;
  $_SESSION['success'] = "You are now logged in";

  header('location: index.php');
}

















































?>
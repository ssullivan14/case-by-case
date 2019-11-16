<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Registration</title>
</head>
<body>
  
  <div class="container">

    <div class="header">
    
      <h2>Log In</h2>

    </div>

    <form action="login.php" method="post">

      <div>
      
        <label for="username">Username :</label>
        <input type="text" name="username">
      
      </div>


      <div>
      
        <label for="password">Password :</label>
        <input type="text" name="password_1">
      
      </div>

      <button type="submit" name="log_user" required>Submit</button>
    
      <p>Not Registered? : <a href= "registration.php" required><b>Sign up </b></a></p>
    
    </form>
  
  </div>

</body>
</html>
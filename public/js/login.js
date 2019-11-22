$(document).ready(function() {
  // Getting references to our form and inputs
  var loginButton = $(".btn-login");
  var userInput = $("input#user-input");
  var passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginButton.on("click", function(event) {
    console.log('help!')
    event.preventDefault();
    var userData = {
      username: userInput.val().trim(),
      password: passwordInput.val().trim()
    };

    console.log(userData);

    if (!userData.username || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.username, userData.password);
    userInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(username, password) {
    console.log('trying to login')
    $.post("/api/login", {
      username: username,
      password: password
    }).then(function(data) {
      window.location.replace(data);
      // If there's an error, log the error
    }).catch(function(err) {
      console.log(err);
    });
  }

});

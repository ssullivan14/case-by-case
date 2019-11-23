var db = require("../models");
var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/home");
    } else {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    }
  });

  // Load signup page
  app.get("/signup", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/home");
    } else {
      res.sendFile(path.join(__dirname, "../public/signup.html"));
    }
  });

  // Load contact page
  app.get("/contact", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/contact.html"));
  });

   // Load members home page
   app.get("/home", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  }); 

  app.get("/search", function(req, res) {  
    console.log(req.query);
    
    db.Person_missing.findAll({
      where: {
        City_Of_Last_Contact: req.query.City_Of_Last_Contact,
        State_Of_Last_Contact: req.query.State_Of_Last_Contact
      }
    }).then(function(dbPerson_missing) {
        console.log(dbPerson_missing);
    });
  });

  app.get("/hbs", function(req, res) {
    res.render('namus');
  });

  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

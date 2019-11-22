// Requiring our models and passport as we've configured it
var db = require("../models");

//
module.exports = function(app) {
    app.get("/api/missingperson", function(req, res) {
        db.namusdata.findAll({
            where: {
                State_Of_Last_Contact: req.body.data.State_Of_Last_Contact,
                Date_Of_Last_Contact: {
                   $between: [req.body.data.start_date, req.body.data.end_date],
               }
            }
        }).then(function(dbPerson_missing) {
          res.json(dbPerson_missing);
        });
    });
}
$(document).ready(function(){
    // GET request to determine which user is logged in
    $.get("/api/user_data").then(function(data) {
        console.log(data);
        
        if (data.username) {
            $(".member-name").text(data.username);
        } else {
            // For testing
            $(".member-name").text("Default");
        }
      });

    // Load date picker to search form
    var date_input=$('input[name="date"]'); //our date input has the name "date"
    var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
    var options={
        format: 'mm/dd/yyyy',
        container: container,
        todayHighlight: true,
        autoclose: true,
      };
      date_input.datepicker(options);

      // On submit click
      $("#submit").on("click", function (event) {
        event.preventDefault()

        city = ($("#location").val().split(","))[0];
        state = ($("#location").val().split(","))[1].trim();

        var criteria = {
            City_Of_Last_Contact: city,
            State_Of_Last_Contact: state,
            start_date: $("#start-date").val(),
            end_date: $("#end-date").val()
        }

        console.log(criteria);

        $.get("/search", criteria).then(function (data) {
            // console.log(data);
        });
        
    });
});
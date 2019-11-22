$(document).ready(function () {
    // GET request to determine which user is logged in
    $.get("/api/user_data").then(function (data) {
        console.log(data);

        if (data.username) {
            $(".member-name").text(data.username);
        } else {
            // For testing
            $(".member-name").text("Default");
        }
    });

    // Load date picker to search form
    var date_input = $('input[name="date"]'); //our date input has the name "date"
    var container = $('.bootstrap-iso form').length > 0 ? $('.bootstrap-iso form').parent() : "body";
    var options = {
        format: 'mm/dd/yyyy',
        container: container,
        todayHighlight: true,
        autoclose: true,
    };
    date_input.datepicker(options);

    $("#submit").on("click", function (event) {
        event.preventDefault()
        console.log("submit has been hit");
        var data = {
            State_Of_Last_Contact: $("#location").val(),
            start_date: $("#start-date").val(),
            end_date: $("#end-date").val()
        }
        // console.log(data);
        $.get("/api/missingpersons", data).then(function (data) {
            console.log(data);
        });
        
    })

});
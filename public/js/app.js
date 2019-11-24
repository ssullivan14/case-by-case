// var moment = require("moment");

function capCrime(crimestr){
    return crimestr.charAt(0).toUpperCase() + crimestr.slice(1);
};

function formatCrime(crime) {
    var city = $("select[name='location'").val();
    if(city = "Ashland"){
        crimeFormat = userCrime.toUpperCase();
        return crimeFormat;
    } else if(city = "Collier"){
        crimeFormat = userCrime.toUpperCase();
        return crimeFormat;
    } else if(city = "Contra Costa"){
        crimeFormat = userCrime.toUpperCase();
        return crimeFormat;
    } else if(city = "Indianapolis"){
        crimeFormat = userCrime.toUpperCase();
        return crimeFormat;
    } else if(city = "Kansas"){
        crimeFormat = capCrime(userCrime);
        return crimeFormat;
    } else if(city = "Memphis"){
        crimeFormat = capCrime(userCrime);
        return crimeFormat;
    } else if(city = "Santa Fe"){
        crimeFormat = userCrime.toUpperCase();
        return crimeFormat;
    } else if(city = "Salt Lake"){
        crimeFormat = userCrime.toUpperCase();
        return crimeFormat
    };
};

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

  // SOCRATA SEARCH
      jQuery.ajaxPrefilter(function(options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });

    $("#subBtn").click(function(){
        $('#cardSearchResults').empty();
        event.preventDefault();
        var userStart = $("#start-date").val();
        var userEnd = $("#end-date").val();
        var searchType = $("#crimeType").val();
        var userCrime = $("#crimeType").val().split(' ').join('+');
        var urlCity;
        var url = $("#location").val();
        console.log(url);

        if(searchType == "Missing Person") {
            // NAMUS SEARCH
            city = ($("#location").val().split(","))[0];
            state = ($("#location").val().split(","))[1].trim();

            var criteria = {
                City_Of_Last_Contact: city,
                State_Of_Last_Contact: state,
                start_date: $("#start-date").val(),
                end_date: $("#end-date").val()
            }

            console.log(criteria);

            $.ajax({
                "url": "/api/namus_data",
                "method": "GET",
                "data": criteria
            }).then(function(response){
                console.log(response);
                    //console.log(response[0]);
                    //console.log("First Name: " + response[0].First_Name)
                  for (i in response) {
                    
                      console.log("First Name: " + response[i].First_Name);
                      console.log("Last Name: " + response[i].Last_Name);
                      console.log("Gender: " + response[i].Gender);
                      console.log("Ethnicity: " + response[i].Race_Ethnicity);
                      console.log("State of Last Contact: " + response[i].State_Of_Last_Contact);
                      console.log("County of Last Contact: " + response[i].County_Of_Last_Contact);
                      console.log("Age When Missing: " + response[i].Computed_Missing_Min_Age);
                      console.log("Current Age: " + response[i].Current_Age_From);
                      console.log("Picture: " + response[i].img);

                      var cardFirstName = response[i].First_Name;
                      var cardLastName = response[i].Last_Name;
                      var cardGender = response[i].Gender;
                      var cardEthnicity = response[i].Race_Ethnicity;
                      var cardLastContact = response[i].State_Of_Last_Contact;
                      var cardAreaLastContact = response[i].County_Of_Last_Contact;
                      var cardAgeMissing = response[i].Computed_Missing_Min_Age;
                      var cardCurrentAge = response[i].Current_Age_From;
                      var cardPicture = response[i].img;

                      missingPersonCard = `
                                <div class="card">
                                <h6 class="card-header mb-3">
                                   ${cardFirstName} ${cardLastName}
                                    <button class="btn btn-light float-right ext-btn"><i class="fas fa-external-link-alt"></i></button>
                                </h6>
                                <div class="row no-gutters">
                                    <div class="col-md-2">
                                        <img src="${cardPicture}" class="card-img">
                                    </div>
                                    <div class="col-md-10">
                                        <div class="card-body">
                                            <p class="card-text"><strong>Date of Last Contact: </strong> ${cardLastContact}</p>
                                            <p class="card-text"><strong>Area of Last Contact: </strong> ${cardAreaLastContact}, ${cardLastContact}</p>
                                            <p class="card-text"><strong>Current Age:</strong> ${cardCurrentAge}</p>
                                            <p class="card-text"><strong>Race/Ethnicity:</strong> ${cardEthnicity}</p>
                                            <p class="card-text float-right"><small class="text-muted">Last updated {{Modified_Date_Time}}</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    `
                    $('#cardSearchResults').append(missingPersonCard);

                     }
            });        
        } else {
            // SOCRATA SEARCH
            switch (url) {

                case "Ashland, VA": 
                    urlCity = "https://moto.data.socrata.com/resource/r4fp-j8h5.json";
                    break;

                case "Collier County, FL":
                    urlCity = "https://moto.data.socrata.com/resource/a6t8-qi8u.json";
                    break;

                case "Contra Costa County, CA":
                    urlCity = "https://moto.data.socrata.com/resource/vsr6-kf7i.json";
                    break;
                
                case "Indianapolis, IN": 
                    urlCity = "https://moto.data.socrata.com/resource/n3wc-t646.json";
                    console.log(urlCity)
                    break;

                case "Kansas City, MO":
                    urlCity = "https://moto.data.socrata.com/resource/6vhr-dqzs.json";
                    break;

                case "Memphis, TN":
                    urlCity = "https://moto.data.socrata.com/resource/m8mc-h4hu.json";
                    break;

                case "Santa Fe, NM":
                    urlCity = "https://moto.data.socrata.com/resource/sf3a-evcx.json";
                    break;

                case "Salt Lake City, UT":
                    urlCity = "https://moto.data.socrata.com/resource/qbr3-v7gz.json";
                    break;


            };

            var startDate = moment.utc(userStart, 'MM/DD/YYYY', true).format('YYYY-MM-DDTHH:mm:ss')
            var endDate = moment.utc(userEnd, 'MM/DD/YYYY', true).format('YYYY-MM-DDTHH:mm:ss')
            console.log(startDate)
            var crimeFormat = userCrime.toUpperCase()
            console.log(crimeFormat)
            var params = "?$where=(incident_datetime+between+'"+startDate+"'+and+'"+endDate+"')+AND+(incident_type_primary+like+'%25"+crimeFormat+"%25')";
            console.log(urlCity + params)
            $.ajax({
                "url": urlCity + params,
                "method": "GET",
            }).then(function(response) {
                console.log(response.length)
                console.log(response)
            });
        }
    });
}); 


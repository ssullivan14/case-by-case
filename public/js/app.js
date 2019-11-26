// FUNCTIONS
function noResults() {
    display = `<p class="lead text-center">No search results. Please try another query.</p>`
    $("#map").hide();
    $("#tableSearchResults").hide();
    $("#unidentifiedTable").hide();
    $('#cardSearchResults').append(display);
}

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
    } else if(city = "Chicago"){
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

// VARIABLES
var locations = [];
var zoomOption;
var centerOption = {};

// Hide elements on load
$("#map").hide();
$("#tableSearchResults").hide();
$("#backSearch").hide();
$("#unidentifiedTable").hide();

// GET request to determine which user is logged in
$.get("/api/user_data").then(function(data) {
    console.log(data);
    
    if (data.username) {
        $(".member-name").text(data.username);
        $("#username").val(data.username);
    } else {
        // For testing
        $(".member-name").text("Default");
    }
});

$(document).ready(function(){
    initMap();

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
        $('#searchdiv').hide();
        $("#map").show();
        $("#backSearch").show();
        
        
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
                console.log(response.length);

                if (response.length == 0) {
                    noResults();
                } else {
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
                        console.log("Link: " + response[i].Link);
                        console.log("Latitude: " + response[i].Latitude);
                        console.log("Longitude: " + response[i].Longitude);
                        
                        
                        var namusLatitude =  response[i].Latitude;
                        var namusLongitude =  response[i].Longitude; 
                        var namusLocation = `{lat: ${namusLatitude}, lng: ${namusLongitude}}`;
                        var locationTest = namusLatitude + namusLongitude;
                        console.log("Location Test: " + locationTest);
                        console.log("NamusLocation: " + namusLocation);     
                        var cardFirstName = response[i].First_Name;
                        var cardLastName = response[i].Last_Name;
                        var cardGender = response[i].Gender;
                        var cardEthnicity = response[i].Race_Ethnicity;
                        var cardLastContact = response[i].State_Of_Last_Contact;
                        var cardAreaLastContact = response[i].County_Of_Last_Contact;
                        var cardAgeMissing = response[i].Computed_Missing_Min_Age;
                        var cardCurrentAge = response[i].Current_Age_From;
                        var cardPicture = response[i].img;
                        var cardDateLastContact = response[i].Date_Of_Last_Contact;
                        var LastModified = response[i].Modified_Date_Time;
                        var cardLastModified = moment(LastModified).format('MM/DD/YYYY, h:mm:ss a');
                        var cardLink = response[i].Link;

                        missingPersonCard = `
                            <div class="card text-white bg-dark">
                                <div class="d-flex align-items-center">
                                    <h5 class="highlight card-header mx-auto w-100">
                                    ${cardFirstName} ${cardLastName}
                                        <a href="${cardLink}" target="_blank" class="btn float-right ext-btn"><i class="fas fa-external-link-alt"></i></a>
                                    </h5>
                                </div>
                                <div class="row no-gutters">
                                    <div class="col-md-2">
                                        <img src="${cardPicture}" class="card-img">
                                    </div>
                                    <div class="col-md-10">
                                        <div class="card-body">
                                            <p class="card-text"><strong>Area of Last Contact: </strong> ${cardAreaLastContact}, ${cardLastContact}<br>
                                            <strong>Date of Last Contact: </strong> ${cardDateLastContact}</p>    
                                            <p class="card-text"><strong>Age at Time of Disappearance:</strong> ${cardAgeMissing}<br>
                                            <strong>Current Age:</strong> ${cardCurrentAge}</p>
                                            <p class="card-text"><strong>Race/Ethnicity:</strong> ${cardEthnicity}</p>
                                            <p class="card-text"><strong>Gender:</strong> ${cardGender}</p>
                                            <p class="card-text float-right"><small class="text-muted">Last updated ${cardLastModified}</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br>
                        `
                        // pushing data to location aray and converting to object
                        var temp = {};                                
                        temp['lat'] = parseFloat(namusLatitude);
                        temp["lng"] = parseFloat(namusLongitude);
                        locations.push(temp);

                        // re-creating map centered / zoomed on location[0]
                        console.log(locations);
                        zoomOption = 10;
                        centerOption = locations[0];
                        initMap();

                        $('#cardSearchResults').append(missingPersonCard);

                    }
                }
            });        
        } else if  (searchType == "unidentified persons") {
            // Unidentified persons SOCRATA search
            $("#unidentifiedTable").show();

            var startDate = moment.utc(userStart, 'MM/DD/YYYY', true).format('YYYY-MM-DDTHH:mm:ss');
            var endDate = moment.utc(userEnd, 'MM/DD/YYYY', true).format('YYYY-MM-DDTHH:mm:ss');
            var params = "?$where=(date_found+between+'"+startDate+"'+and+'"+endDate+"')";

            switch (url) {

                case "Chicago, IL": 
                    urlCity = "https://datacatalog.cookcountyil.gov/resource/y8dh-5w5c.json";
                    break;

                default: // Any other city
                    noResults();
                    break;
            }

            $.ajax({
                "url": urlCity + params,
                "method": "GET",
            }).then(function(response) {
                console.log(response.length);
                console.log(response);

                if (response.length == 0) {
                    noResults();
                } else {
                    for (i in response) {
                        googleMapsAddress = encodeURIComponent(response[i].location_found);
                        
                        $.ajax({
                            "url": "https://maps.googleapis.com/maps/api/geocode/json?address=" + googleMapsAddress + "&key=AIzaSyAe3Pmw1qeIzHwcGHhDi9IARA6czt6uRDY",
                            "method": "GET",
                        }).then(function(mapsResponse) {
                            lat = mapsResponse.results[0].geometry.location.lat;
                            lng = mapsResponse.results[0].geometry.location.lng;

                            // pushing data to location aray and converting to object                                
                            var temp = {};
                            temp['lat'] = parseFloat(lat);
                            temp["lng"] = parseFloat(lng);
                            locations.push(temp);

                            // re-creating map centered / zoomed on location[0]
                            console.log(locations);
                            zoomOption = 10;
                            centerOption = locations[0];
                            initMap();
                        });

                        try {
                            uniPersImage = response[i].image_1.url;
                        } catch {
                            uniPersImage = null;
                        }

                        incidentTime = moment(response[i].date_found).format('MM/DD/YYYY');

                        if (uniPersImage === null) {
                            incidentTableRow = `
                            <tr>
                            <th class="highlight" scope="row">${response[i].case_number}</th>
                            <td>${incidentTime}</td>
                            <td>${response[i].description}</td>
                            <td>${response[i].location_found}</td>
                            <td>${response[i].location_details}</td>
                            <td></td>
                            </tr>
                            `
                        } else {
                            incidentTableRow = `
                            <tr>
                            <th class="highlight" scope="row">${response[i].case_number}</th>
                            <td>${incidentTime}</td>
                            <td>${response[i].description}</td>
                            <td>${response[i].location_found}</td>
                            <td>${response[i].location_details}</td>
                            <td><a href="${response[i].image_1.url}" target="_blank" class="btn float-right ext-btn"><i class="fas fa-external-link-alt"></i></a></td>
                            </tr>
                            `
                        }

                        $('#unidentifiedData').append(incidentTableRow);
                    }
                }
            });
        } else {
            // Other SOCRATA SEARCH
            switch (url) {

                case "Chicago, IL": 
                    urlCity = "https://moto.data.socrata.com/resource/xpmh-vvkq.json";
                    break;

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

                default: // Any other city
                    noResults();
                    break;
            };
            
            $("#tableSearchResults").show();
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

                if (response.length == 0) {
                    noResults();
                } else {
                    for (i in response) {
                        console.log("Case Number: " + response[i].case_number);
                        console.log("Incident Date/Time: " + response[i].incident_datetime);
                        console.log("Incident Day of Week: " + response[i].day_of_week);
                        console.log("Incident Type: " + response[i].parent_incident_type);
                        console.log("Incident Description: " + response[i].incident_description);
                        console.log("Address: " + response[i].address_1);
                        console.log("Location: " + response[i].city + ", " + response[i].state + " " + response[i].zip);
                        console.log("Geo latitude: " + response[i].latitude);
                        console.log("Geo longitude: " + response[i].longitude)

                        var socrataLatitude =  response[i].latitude;
                        var socrataLongitude =  response[i].longitude; 
                        console.log("Geo Locations: " + socrataLatitude + socrataLongitude);
                        
                        incidentTime = moment(response[i].incident_datetime).format('MM/DD/YYYY, h:mm a');

                        incidentTableRow = `
                        <tr>
                        <th class="highlight" scope="row">${response[i].case_number}</th>
                        <td>${incidentTime}</td>
                        <td>${response[i].day_of_week}</td>
                        <td>${response[i].incident_description}</td>
                        <td>${response[i].address_1}</td>
                        <td>${response[i].city}, ${response[i].state} ${response[i].zip}</td>
                        </tr>
                        `

                        // pushing data to location aray and converting to object
                        var temp = {};                                
                        temp['lat'] = parseFloat(socrataLatitude);
                        temp["lng"] = parseFloat(socrataLongitude);
                        locations.push(temp);

                        // re-creating map centered / zoomed on location[0]
                        console.log(locations);
                        zoomOption = 10;
                        centerOption = locations[0];
                        initMap();

                        $('#socrataData').append(incidentTableRow);
                    }
                }
            });
        }   
    });
}); 


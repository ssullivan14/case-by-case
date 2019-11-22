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
      jQuery.ajaxPrefilter(function(options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });
    var userStart = "2018-01-10";
    var userEnd = "2019-01-10";
    var userCrime = "Larceny"
    var urlCity;
    switch (url) {

        case "indianapolis": 
            urlCity = "https://moto.data.socrata.com/resource/n3wc-t646.json";
            break;

        case "ashland": 
            urlCity = "https://moto.data.socrata.com/resource/r4fp-j8h5.json";
            break;

        case "memphis":
            urlCity = "https://moto.data.socrata.com/resource/m8mc-h4hu.json";
            break;

        case "contraCosta":
            urlCity = "https://moto.data.socrata.com/resource/vsr6-kf7i.json";
            break;

        case "collier":
            urlCity = "https://moto.data.socrata.com/resource/a6t8-qi8u.json";
            break;

        case "santafe":
            urlCity = "https://moto.data.socrata.com/resource/sf3a-evcx.json";
            break;

        case "saltLakeCity":
            urlCity = "https://moto.data.socrata.com/resource/qbr3-v7gz.json";
            break;

        case "kansasCity":
            urlCity = "https://moto.data.socrata.com/resource/6vhr-dqzs.json";
            break;
    };

    var startDate = userStart + "T00:00:00"
    var endDate = userEnd + "T23:59:59"
    var crimeFormat = userCrime.toUpperCase()
    console.log(crimeFormat)
    var params = "?$where=(incident_datetime+between+'"+startDate+"'+and+'"+endDate+"')+AND+(incident_type_primary+like+'%25"+crimeFormat+"%25')";
    
    $.ajax({
        "url": urlCity[0].indianapolis + params,
        "method": "GET",
    }).then(function(response) {
        console.log(response.length)
        console.log(response)
    });



 
});
var today = new Date();
var entry = {};
// var airportLookup = require('airport-lookup');

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://localhost:3000/api/airports",
  "method": "GET",
  "headers": {
    "access-control-allow-origin": "http://localhost:3000",
    "cache-control": "no-cache",
    "postman-token": "94148ba0-0fd8-1594-0f45-84c5b8559169"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

var run = {
    getDate: function() {
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10) {
            dd = '0' + dd
        }
        if(mm<10) {
            mm = '0' + mm;
        }
        console.log('Today is', today);
        today = yyyy + '-' + mm + '-' + dd;
        // today = mm + '/' + dd + '/' + (yyyy % 2000);   //old format, doesnt match the date picker format
        $('#todays-date').text(today);
    },
    // inputsValid: function(){
    //   console.log('Verifying Input...');
    //   var inputsAreValid = true; //innocent until proven guilty
    //   entry.report_date = $('#report_date-modal').val();
    //   entry.completion_time = $('#completion_time-modal').val();
    //   entry.queries_failed = $('#queries_failed-modal').val();
    //   entry.success = $('#success-modal').prop('checked');
    //   entry.comments = $('#comments-modal').val();
    //
    //   console.log('validing this entry: ',entry);
    //   // check date
    //   if(entry.report_date == '' || entry.report_date > today){
    //     $('#report_date-modal').css('border-color', 'red');
    //     inputsAreValid = false;
    //   }
    //   else {
    //     $('#report_date-modal').css('border-color', '');
    //   }
    //
    //   // check completion time
    //   if(entry.completion_time == ''){
    //     $('#completion_time-modal').css('border-color', 'red');
    //     inputsAreValid = false;
    //   }
    //   else {
    //     $('#completion_time-modal').css('border-color', '');
    //   }
    //
    //   // check queries failed
    //   //replace 83 with jame's variable he added later
    //   if(entry.queries_failed == '' || entry.queries_failed < 0 || entry.queries_failed > 83){
    //     $('#queries_failed-modal').css('border-color', 'red');
    //     inputsAreValid = false;
    //   }
    //   else {
    //     $('#queries_failed-modal').css('border-color', '');
    //   }
    //
    //   // check comments
    //   if(entry.comments.length > 250){
    //     $('#comments-modal').css('border-color', 'red');
    //     inputsAreValid = false;
    //   }
    //   else {
    //     $('#comments-modal').css('border-color', '');
    //   }
    //
    //   return inputsAreValid;
    // },
    getInput: function() {
        console.log('Getting Input...');
        entry.flight_code = $('#flight_code_input').val();
        entry.departure_airport_code = $('#departure_airport_code_input').val();
        entry.arrival_airport_code = $('#arrival_airport_code_input').val();
        entry.departure_date = $('#departure_date_input').val();
        entry.departure_time = $('#departure_time_input').val();
        entry.departure_city = $('#departure_city_input').val();
        // entry.departure_country = $('#departure_country_input').val();
        entry.arrival_time = $('#arrival_time_input').val();
        entry.arrival_date = $('#arrival_date_input').val();
        entry.arrival_city = $('#arrival_city_input').val();
        // entry.arrival_country = $('arrival_country_input').val();
        console.log('Input:', entry);
    },

    getDepartureCodeInput: function() {
      entry.departure_airport_code = $('#departure_airport_code_input').val();
      airportToFind = entry.departure_airport_code;
      console.log(airportToFind);
    },

    populateCityFields: function (entry) {
      console.log(city_name);
      $('#departure_city_input').val(city_name);
    },


    post: function(ent) {
        console.log('Posting:', ent);
        $.ajax("http://localhost:3000/api/flights", {
            async: false,
            method: 'POST',
            data: ent,
            function(data, status) {
                console.log('Posted: ' + data + '\nStatus: ' + status);
            }
        });
    },

    getDepatureCodeApi: function (ent) {
      console.log('Getting:', ent);
      $.ajax("http://localhost:3000/api/airports", {
          async: false,
          method: 'GET',
          data: ent,
          function(data, status) {
              console.log('Got: ' + data + '\nStatus: ' + status);
          }
      });
    }
};

$(document).ready(function() {
    run.getDate();

    $('.header').load("header.html");
    // CSS
    // $(this).css('color', 'red');
});

$('#submit_departure_code').on('click', function() {
      run.getDepartureCodeInput();
      run.getDepatureCodeApi();
      run.populateCityFields();
      // run.getDepatureCodeApi(entry);
      //console.log(entry);

});

// $('#submit_departure_code').on('click', function() {
//       run.getDepartureCodeInput();
//       run.getDepatureCodeApi(airportToFind);
//       // run.getDepatureCodeApi(entry);
//       //console.log(entry);
//
// });


// Generate today's date in date field
$('#todays-date-form').on('click', function() {
    $('#departure_date_input').val(today);
});

// Use depature date for arrival date
$('#use-date-again').on('click', function() {
  entry.departure_date = $('#departure_date_input').val();
  var dateReversed = '2017-05-15';
    $('#arrival_date_input').val(entry.departure_date);
});

$('#submit_flight_form').on('click', function() {
    // var inputsAreValid = run.inputsValid();
    // console.log('inputsAreValid:', inputsAreValid);
      run.getInput();
      run.post(entry);

      //$('#exampleModal').modal('hide');  //close the modal window

      // location.reload();

      // renderReportHistory();  //"dynamically" re-renders all of the reports (including the newly added one) after the submit button has been clicked.
});

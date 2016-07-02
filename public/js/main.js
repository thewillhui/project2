$(document).ready(function() {

  //==========================
  //    Admin view/edit all posts
  //==========================
  $('#allPosts a').on('click', function(event) {
    console.log('event')
    event.preventDefault();
    $.ajax({
      method: "GET",
      url: $(this).attr('href') //gets the link based on the link generated in the viewPosts jade file
    }).done(function(blog) { //takes the data from the link above
      $('#editPost').empty(); //empties the div before appending
      $('#editPost').append(blog);
    })
  });




  //==========================
  //      Transport page
  //==========================
  //script for the transport page to get the schedule and append to the schedule div
  $('#ferry a, #bus a').on('click', function(event) {
    console.log('event');
    event.preventDefault();
    $.ajax({
      method: "GET",
      url: $(this).attr('href') //gets the link based on the link generated in the transport jade file
    }).done(function(transportArr) { //takes the data from the link above
      $('#schedule').empty(); //empties the div before appending
      $('#schedule').append(transportArr); //appends the corresponding schedule from the array
    // });

    // $.ajax({ //function for calculating time remaining for next ferry/bus
    //   method: "GET",
    //   url: '/calendar', //gets the HK public holiday data from the ics
    //   dataType: 'json'
    // }).done(function(data) {
    //   console.log(data);
      //list of arrays of time in string format with p tags
      var $fromOriginTime = $('.weekday.origin');
      var $fromDestTime = $('.weekday.destination');
      var $fromOriginTimePh = $('.weekend.origin');
      var $fromDestTimePh = $('.weekend.destination');

      var dayOfWeek = moment().day(); //gets todays day of the week as an integer
      var timeNow = moment().format('HHmm');

      var showCountdown = function($array) {
        var $times = $array.find('p');
        var lastElem = $times[$times.length - 1];
        var lastElemStr = $(lastElem).text();
        var lastElemInt = parseInt(lastElemStr);

        var originTime = calTime($fromOriginTime);
        var destTime = calTime($fromDestTime);
        var originTimePh = calTime($fromOriginTimePh);
        var destTimePh = calTime($fromDestTimePh);


        if (dayOfWeek == 6 && lastElemInt > 0 && timeNow > lastElemInt) {
          //check if the day of the week is saturday and if the last element of the schedule is after midnight. the currrent time also must be greater than the last element of the schedule. this determines if the current time is late friday night (sat morning technically) and still running on the weekday timetable. if the time is after the last element then should return the countdown from the weekend timetable
          $('#countdownO').text(' ' + originTimePh + ' mins');
          $('#countdownD').text(' ' + destTimePh + ' mins');

        } else if (dayOfWeek == 1 && lastElemInt > 0 && timeNow > lastElemInt) {
          //similar to above but checks if it's sunday and if it should switch to weekday
          $('#countdownO').text(' ' + originTime + ' mins');
          $('#countdownD').text(' ' + destTime + ' mins');
        } else {

          $('#countdownO').text(' ' + originTime + ' mins');
          $('#countdownD').text(' ' + destTime + ' mins');
        }
      };
      showCountdown($fromOriginTime);
      showCountdown($fromDestTime);
      showCountdown($fromOriginTimePh);
      showCountdown($fromDestTimePh);
      // console.log(calTime($fromOriginTime));
      // console.log(calTime($fromDestTime));
      // console.log(calTime($fromOriginTimePh));
      // console.log(calTime($fromDestTimePh));
    });
  })

  var calTime = function($array) {
    // function
    var startOfDay = moment().startOf('day').unix(); //set to 12:00 am today in unix format (seconds since 1/1/1970)
    var newStartOfDay = null;
    var timeNow = moment().unix(); //current time in unix format
    var dateChanged = false; //flag to check if the date has changed due to 24hr time and a timetable that runs from 6am to 6am instead of 12am to 12am
    var $times = $array.find('p'); //gets the array from the page and finds all elements with a p tag
    var nextTransportInSeconds = 0;

    $times.each(function(index, elem) {
      var currTimeStr = $(elem).text() //the text inside the p tag is the time as a string
      var currTimeInt = parseInt(currTimeStr); //we need to convert the string into integers

      var prevIndex = index - 1 < 0 ? 0 : index - 1; //index starts at 0 for the first item in the array. we need to compare the current index value with the previous so we set a variable here
      var prevTime = parseInt($times.eq(prevIndex).text()) //again the value of the previous index is a string so we parse it into an integer so we can manipulate it later

      if (!dateChanged && prevTime > currTimeInt) { //if the date hasnt changed(i.e. before midnight) AND the previous time is greater than the current time it means that we need to change the date as its after midnight
        dateChanged = true;
        newStartOfDay = moment(startOfDay).endOf("day").add(1, "seconds").unix(); //the new day has started and it starts at midnight
      }

      if (dateChanged) {
        var currTimeInSeconds = moment(currTimeStr, "HHmm").unix() - startOfDay; //if the date has changed calculate the current time by taking the currTimeStr and parsing it into unix format and subtracting the time value from the time at the start of the day
        var nextTransport = newStartOfDay + currTimeInSeconds; //if after midnight the next transport variable is defined by calculating the time at midnight (which is newStartOfDay) and the current time in seconds
      } else {
        var nextTransport = moment(currTimeStr, "HHmm").unix();
      }

      if (nextTransport > timeNow) { //if the next transport time is greater than the current time
        nextTransportInSeconds = nextTransport - timeNow; //then the time for the next transport to arrive is calculated by taking the nextTransport variable as previously defined (depending if its before or after midnight) and subtracting the current time
        return false; //break out of the .each loop
      }
    });
    var countdownMins = nextTransportInSeconds / 60;

    return countdownMins.toFixed(0);

  }
});

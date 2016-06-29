$(document).ready(function() {
//script for the transport page to get the schedule and append to the schedule div
  $('#ferry a, #bus a').on('click', function(event) {
    console.log('event');
    event.preventDefault();
    $.ajax({
      method: "GET",
      url: $(this).attr('href') //gets the link based on the link generated in the transport jade file
    }).done(function(transportArr) {
      $('#schedule').empty(); //empties the div before appending
      $('#schedule').append(transportArr); //appends the corresponding schedule from the array
    });
    $.ajax({
      method: "GET",
      url: '/calendar',
      dataType: 'json'
    }).done(function(data){
      console.log(data)

    })


  });



});

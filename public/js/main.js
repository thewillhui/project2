$(document).ready(function() {
//script for the transport page to get the schedule and append to the schedule div
  $('#ferry a, #bus a').on('click', function(event) {
    console.log('event');
    event.preventDefault();
    $.ajax({
      method: "GET",
      url: $(this).attr('href')
    }).done(function(transportArr) {
      console.log(transportArr);
      $('#schedule').empty(); //empties the div before appending
      $('#schedule').append(transportArr);
    });
  });
});

const Transport = require('../models/Transport');

//function to get data from database

exports.getTransport = (req, res) => {

  Transport.find({}, function(err, transportArr){

    console.log(transportArr);
    res.render('transport', {
      title: 'Transport Information',
      transportArr: transportArr
    });

    // http://domain//transport/abc28763cbc

  });

};


exports.getSchedule = (req, res) => {

  // get id of the schedule
  var id = req.params.id;

  console.log(id);

  Transport.findById(id, function(err, schedule){
    res.json(schedule);

    /*
    res.render('schedule', {
      title: 'Schedule Information',
      schedule: schedule
    });
    */
  });

};



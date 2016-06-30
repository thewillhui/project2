const Transport = require('../models/Transport');

//function to get data from database

exports.getTransport = (req, res) => {

  Transport.find({}, function(err, transportArr) {

    res.render('transport', {
      title: 'Transport Information',
      transportArr: transportArr
    });

  });

};


exports.getSchedule = (req, res) => {

  // get id of the schedule
  var id = req.params.id;

  Transport.findById(id, function(err, scheduleArr) {

    res.render('schedule', {
      scheduleArr: scheduleArr
    });


  });

};

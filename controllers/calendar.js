const ical = require('ical');

exports.getCal = (req, res) => {

  ical.fromURL('http://www.1823.gov.hk/common/ical/en.ics', {}, function(err, data){

      res.json(data);
  });
}
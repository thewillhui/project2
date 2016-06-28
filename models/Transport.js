const mongoose = require('mongoose');

const TransportSchema = new mongoose.Schema({

  transport: {
    mode: { type: String, default: '', required: true }, //bus or ferry
    number: { type: String, default: '' }, //bus number
    origin: { type: String, default: '' },
    destination: { type: String, default: '', required: true },
    fare: {
      resident: String,
      visitor: String
    },
    schedule: {
      fromOrigin: { weekdays: Array },
      fromDestination: { weekendsAndPh: Array }
    }
  }
});

const Transport = mongoose.model('Transport', TransportSchema);

module.exports = Transport;


var ferryCentral = new Transport {
    mode: 'ferry', //bus or ferry
    number: null, //bus number
    origin: 'Park Island',
    destination: 'Central',
    fare: {
      resident: '21.40',
      visitor: '27'
    },
    schedule: {
      fromOrigin: {
        weekdays:
        ['0630', '0700', '0715', '0730', '0745', '0800', '0815', '0830', '0845', '0900', '0915', '0930', '1000', '1100', '1200', '1300', '1400', '1500', '1600', '1700', '1730', '1800', '1830', '1900', '1930', '2000', '2030', '2100', '2200', '2300', '0000', '0100', '0200', '0300', '0400', '0500', '0600'],
        weekendsAndPh:
        ['0700', '0800', '0900', '1000', '1100', '1200', '1300', '1400', '1500', '1600', '1700', '1800', '1900', '2000', '2100', '2200', '2300', '0000', '0100', '0200', '0300', '0400', '0500', '0600']
      },
      fromDestination: {
        weekdays:
        ['0700', '0715', '0730', '0745', '0800', '0815', '0830', '0845', '0900', '0915', '0930', '0945', '1000', '1030', '1130', '1230', '1330', '1430', '1530', '1630', '1730', '1800', '1830', '1900', '1930', '2000', '2030', '2100', '2130', '2230', '2330', '0030', '0130', '0230', '0330', '0430', '0530', '0630'],
        weekendsAndPh:
        ['0730', '0830', '0930', '1030', '1130', '1230', '1330', '1430', '1530', '1630', '1730', '1830', '1930', '2030', '2130', '2230', '2330', '0030', '0130', '0230', '0330', '0430', '0530', '0630']
      }
    }

    ferryCentral.save()
    console.log(ferryCentral)

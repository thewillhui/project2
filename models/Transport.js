const mongoose = require('mongoose');

const TransportSchema = new mongoose.Schema({

  transport: {
    mode: {type: String, default:'', required: true},       //bus or ferry
    number: { type: String, default: '' }, //bus number
    origin: { type: String, default: ''},
    destination: { type: String, default: '', required: true},
    fare: { resident: Number, visitor: Number },
    schedule: { weekdays: Array, weekends: Array, publicHolidays: Array}
  }
});

const Transport = mongoose.model('Transport', TransportSchema);

module.exports = Transport;

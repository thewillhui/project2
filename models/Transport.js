const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema({

  transport: {
    mode: {type: String, default:''},       //bus or ferry
    number: { type: String, default: '' }, //bus number
    origin: { type: String, default: ''}
    destination: { type: String, default: '' },
    fare: { resident: Number, visitor: Number },
    schedule: { weekdays: Array, weekends: Array, publicHolidays: Array}
  }
});

const Transport = mongoose.model('Transport', TransportSchema);

module.exports = Transport;

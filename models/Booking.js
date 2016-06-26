const mongoose = require('mongoose');


const BookingSchema = new mongoose.Schema({
  bookingId: {type: String, unique: true}
  customer: { type:Schema.ObjectId, ref: 'User'},
  bookingName: {type: String, required: true},
  facility: { type: Schema.ObjectId, ref: 'Facility' },
  time: {type: String, required: true},
  date: {type: Date, required: true},
  numOfGuests: {type: Number, required: true}

  }
});

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;

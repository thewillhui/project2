const mongoose = require('mongoose');


const FacilitySchema = new mongoose.Schema({

  facility: {
    clubhouse: {
      name: { type: String, required: true },
      facilities: {
        facilityName: { type: String, required: true, unique: true },
        bookableTimes: Array,
        exclusionDates: Date,
        exclusionTimes: Array,
        capacity: Number,
        customer: { type: Schema.ObjectId, ref: 'User' },
      }

    },

  }
});

const Facility = mongoose.model('Facility', FacilitySchema);

module.exports = Facility;

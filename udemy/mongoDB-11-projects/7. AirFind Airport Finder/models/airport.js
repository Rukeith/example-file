const mongoose = require('mongoose');

State = require('./state');

// Airport Schema
const airportSchema = mongoose.Schema({
  loc: {
    type: {
      type: String
    },
    coordinates:{
      type: Array
    }
  },
  name: {
    type: String
  },
  code:{
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Airport = module.exports = mongoose.model('Airport', airportSchema);

// Get Airports
module.exports.getAirports = (callback, limit) => {
  Airport.find(callback);
}

module.exports.getAirportsByState = (stateCode, callback, limit) => {
  State.findOne({code: stateCode}, (err, state) => {
    Airport.find({
      loc: {
        $geoWithin:{
          $geometry: state.loc
        }
      }
    },
  {
    name: 1,
    type: 1,
    code: 1,
    _id:0
  }, callback).limit().sort([['name', 'ascending']]);
  });
}

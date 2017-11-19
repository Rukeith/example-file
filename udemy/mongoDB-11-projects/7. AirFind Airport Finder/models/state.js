const mongoose = require('mongoose');

// State Schema
const stateSchema = mongoose.Schema({
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

const State = module.exports = mongoose.model('State', stateSchema);

// Get States
module.exports.getStates = (callback, limit) => {
  State.find(callback);
}

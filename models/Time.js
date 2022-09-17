const mongoose = require('mongoose') // Use mongoose to manage data

// Create new mongoose db schema to blueprint a Time document
//  - For information on a relational mongoose schema see: https://vegibit.com/mongoose-relationships-tutorial/)
//  - For information on the schema for this app see /about/model.drawio
const TimeSchema = new mongoose.Schema({
  
  // TODO: Enable user reference after creating user model
  // Store data of user who set the time
  // userID: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User'
  // },
  
  // Id of track where time was set (references Track document)
  //  - Track document provides access to a related Game document
  trackId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Track',
    required: true
  },

  // Vehicle used to set time (not required, set to equal performance if not provided)
  vehicle: {
    type: String,
    default: 'Equal Performance'
  },

  // Time set by user
  time: {
    type: Number,
    required: true
  },

  // Date/time Time was submitted
  submittedAt: {
    type: Date,
    default: Date.now // Auto generate current date/time at time of submission
  }
})

// Create Time model from TimeSchema and export
module.exports = mongoose.model('Time', TimeSchema)

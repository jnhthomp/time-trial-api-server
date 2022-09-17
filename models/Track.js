const mongoose = require('mongoose') // Use mongoose to manage data

// Create new mongoose db schema to blueprint a Track document
//  - For information on a relational mongoose schema see: https://vegibit.com/mongoose-relationships-tutorial/)
//  - For information on the schema for this app see /about/model.drawio
const TrackSchema = new mongoose.Schema({
  
  // Name of track
  name: {
    type: String, // expect string value for this property
    required: true, // this property must be included to submit
  },

  // Id of game track belongs to
  //   - Provides access to Game document and associated data
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true
  }
})

// Create Track model from TrackSchema and export
module.exports = mongoose.model('Track', TrackSchema)

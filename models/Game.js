const mongoose = require('mongoose') // Use mongoose to manage data

// Create new mongoose db schema to blueprint a Game document
//  - For information on a relational mongoose schema see: https://vegibit.com/mongoose-relationships-tutorial/)
//  - For information on the schema for this app see /about/model.drawio
const GameSchema = new mongoose.Schema({
  
  // Name of game
  name: {
    type: String, // expect string value for this property
    required: true, // this property must be included to submit
  }
  
})

// Create Game model from GameSchema and export
module.exports = mongoose.model('Game', GameSchema)

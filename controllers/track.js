const Track = require('../models/Track') // Import track model for data processing methods

module.exports = {

  // Retrieve a list of tracks and render an html response
  getTracks: async (req, res) => {
    try {
      // Retrieve list of tracks from database
      const trackList = await Track.find({ gameId: req.params.gameId }).populate('gameId');
      // Render ejs passing in the list to be rendered, and the id and name of the associated game
      res.render('track.ejs', { tracks: trackList, gameId: req.params.gameId, gameName: trackList[0].gameId.name })
    } catch (error) {// Handle errors for above request
      console.log(error) // Log error to the console
    }
  },

  // Submit new track to database and re-render track list
  createTrack: async (req, res) => {
    try {
      await Track.create({ name: req.body.trackName, gameId: req.body.gameId }) // Create a new track using request body data with model
      console.log(`${req.body.trackName} has been added to tracklist for gameId: ${req.body.gameId}`) // log successful submission to console
      res.redirect(`/track/${req.body.gameId}`) // reload page to display tracks list (included added track)
    } catch (err) { // Handle errors from above request
      console.log(err) // Log error to the console
    }
  }
}
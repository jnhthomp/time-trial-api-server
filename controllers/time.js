const Time = require('../models/Time') // Import time model for data processing methods

module.exports = {

  // Retrieve a list of times and render an html response with times listed
  getTimes: async (req, res) => {
    try {
      // Retrieve list of times from database matching current track
      const timeList = await Time.find({ trackId: req.params.trackId }).populate({
        path: 'trackId',
        populate: {path: 'gameId'}
      });
      
      // Render ejs, passing in the list of times to render and track/game details
      // TODO: Get values before adding them to the object so they aren't extracted within to clean up code a little
      // TODO: BUG - If timeList is empty array (new track) then no values are loaded as arguments causing an issue
      res.render('time.ejs', { 
        times: timeList, 
        gameName: timeList[0].trackId.gameId.name, 
        trackId: req.params.trackId, 
        trackName: timeList[0].trackId.name,
        })
    } catch (err) { // Handle errors from above request
      console.log(err) // Log errors to the console
    }
  },

  // Submit new track to database and re-render track list
  createTime: async (req, res) => {
    try {
      // TODO: Add time validation/conversion methods before attempting to save to db
      await Time.create({ time: +req.body.time, trackId: req.body.trackId }) // Create a new time using request body data with model
      // TODO: See if there is a response from the create above to capture/log id of created document
      // TODO: Add associated game to log
      console.log(`New time submitted to db:\nTrack:${req.body.trackId}\nTime:${+req.body.time}`) // log successful submission to console
      res.redirect(req.get('referer')); // Reload page (should be a list of times for a given track)
    } catch (err) { // Handle errors from above request
      console.log(err) // Log error to the console
    }
  }

  // TODO: Add updateTime
  // TODO: Add deleteTime
}
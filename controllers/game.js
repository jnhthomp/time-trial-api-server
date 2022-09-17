const Game = require('../models/Game') // Import game model for data processing methods 

module.exports = {

  // Retrieve a list of games and render an html response with games listed
  getGames: async (req, res) => {
    try {
      // Retrieve list of games from database
      const gameList = await Game.find();
      // Render ejs, passing in the list to be rendered
      res.render('game.ejs', {games: gameList})
    } catch (err) {
      console.log(err)
      // TODO: Implement logging that logs error messages to the database (see: https://gabrieleromanato.name/nodejs-how-to-log-errors-to-mongodb)
      // TODO: Implement 404 page that outputs the error to the user
      // res.render('404.ejs')
    }
  },

  // Submit new game to database and re-render games list
  createGame: async (req, res) => {
    try {
      await Game.create({ name: req.body.gameName}) // Create a new game using request body data with model
      console.log(`${req.body.gameName} has been added to Games table`) // log successful submission to console
      res.redirect('/game') // reload page to display games list (including added game)
    } catch (err) { // Handle errors from above request
      console.log(err) // Log error to the console
    }
  },

  // Serve a page that provides a form to update game details
  updateGameForm: async (req, res) => {
    try {
      // Retrieve current values for the game to be edited
      const game = await Game.findOne({_id: req.params.gameId})
      // Render form with game data inserted
      res.render('updateGame.ejs', {game: game})
    } catch(err){ // Hande errors from above request
      console.log(err) // Log error to the console
    }
  },

  // Receive updated game details and attempt to submit to db 
  updateGame: async (req, res) => {
    try {
      console.log(req.body)
      // Search for game with mathcing id new game details
      await Game.findOneAndUpdate({ _id: req.body.gameId }, {
        // New values for game object
        name: req.body.gameName
      })
      console.log(`Game:${req.gameId} updated`)
      // Direct client to game directory to see list of games (including updated game)
      res.redirect('/game')
    } catch (err) { // Handle errors from above request
      console.log(err) // Log error to the console
    }
  }

  // // Delete game document from database
  //! Do not implement until the following have happened:
  //!   1. Test proper finding and deletion of ALL associated tracks and times for a given game
  //!   2. Implement user login
  //!   3. Implement route protections and permissions so only admin can delete games
  // deleteGame: async (req, res) => {
  //   // Log the id of the document to be deleted
  //   console.log(`Deleting Game: ${req.body.gameId} and all associated tracks and times`)
  //   try {
  //     // get list of tracks associated with current game
  //     const trackList = Track.find({gameId: req.body.gameId})
  //     // Create an array of objects to pass into model as search argument
  //     const trackIdList = trackList.map((track) => track.id)
  //     // Get a list of times associated with all tracks in above array
  //     const timeList = Time.find({
  //       trackId: { $in: trackIdList }
  //     })
  //
  //     //Delete times associated with above tracks
  //     await Time.deleteMany({trackId: { $in: trackIdList }})
  //     // Delete tracks associate with above game
  //     await Track.deleteMany({gameId: req.body.gameId})
  //     await Game.findOneAndDelete({_id: req.body.gameId})
  //     // get list of times associated with
  //     console.log('Deleted game and associated tracks and times') // Log successful deletion
  //     res.json('Deleted It') // Send a success json response
  //   } catch (err) { // Handle errors from above request
  //     console.log(err) // Log error to the console
  //   }
  // }
}   
const express = require('express') // express package for generating router object
const router = express.Router() // Initialize router object
const gameController = require('../controllers/game') // import game controller object

//* Routes
// @desc    render page outputting all games in database
// @route   GET /game
router.get('/', gameController.getGames)

// @desc    submit new game data to the database
// @route   POST /game/createGame
// @body    {
//            name: [String]
//          }
router.post('/createGame', gameController.createGame)

// @desc    render form used to update game details
// @route   GET /game/updateGame/:gameId
router.get('/updateGame/:gameId', gameController.updateGameForm)

// @desc    submit details to update a game entry
//          TODO: Update this route to use a put request instead of a post request
// @route   PUT /game/updateGame
// @body    {
//            name: [String]
//          }
router.post('/updateGame', gameController.updateGame)

// @desc    submit details for a game that should be deleted from the database
//          !READ BEFORE IMPLEMENTING:
//           1. Controller should get all tracks associated with this game AND all times associated with this track to also be deleted along with this game
//           2. Should be implemented behind an admin only account to prevent accidental deletion
//              - Do not implement until Users can be created, login, and given permissions
// @route   DELETE /game/deleteGame
// router.delete('/deleteGame', gameController.deleteGame)

// export created router object
module.exports = router
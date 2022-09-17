const express = require('express') // express package for generating router object
const router = express.Router() // Initialize router object
const trackController = require('../controllers/track') // import track controller object

//* Routes
// @desc    render page outputting all tracks in database for a given game
// @route   GET /track/:gameId
router.get('/:gameId', trackController.getTracks)

// @desc    Submit new track data to the database
// @route   POST /track/createTrack
// @body    {
//            name: [String]
//            gameId: [String] // reference to a Game model document
// }
router.post('/createTrack', trackController.createTrack)

// export created router
module.exports = router
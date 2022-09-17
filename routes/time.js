const express = require('express') // express package for generating router object
const router = express.Router() // Initialize router object
const timeController = require('../controllers/time') // import time controller object

//* Routes
// @desc    render a page displaying a list of times for a given track
// @route   GET /time/:trackId
router.get('/:trackId', timeController.getTimes)

// @desc    Submit a new time to the database
// @route   POST /time/createTime
// @body    {
//            time: [Number]    // Can be float
//            trackId: [String] // reference to a Track model document
//            user: [String]    // reference to a User model document
//          }
router.post('/createTime', timeController.createTime)

// TODO: Add /updateTime route
// TODO: Add /deleteTime route

// export created router
module.exports = router
const express = require('express') // express package for generating router object
const router = express.Router() // Initialize express router object
const homeController = require('../controllers/home') // import homeController object

//* Routes
// @desc    render homepage
//          !For now leads to Game but will later hold login form
// @route   GET /
router.get('/', homeController.getIndex)

// export created router
module.exports = router
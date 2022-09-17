//* Imports
// Express import and initialization
const express = require('express')
const app = express()
const morgan = require('morgan') // package to log request details to the console
// DB connection method
const connectDB = require('./config/database')
// Import routers
const homeRoutes = require('./routes/home')
const gameRoutes = require('./routes/game')
const trackRoutes = require('./routes/track')
const timeRoutes = require('./routes/time')

require('dotenv').config({ path: './config/.env' }) // add .env file support and access to values within

//* Initialize Server
// Connec to to db
connectDB() // Connect to db

// Middlewear
// Log request details to console while in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.set('view engine', 'ejs') // Set view engine for application to ejs
app.use(express.static('public')) // Public file available by default
app.use(express.urlencoded({ extended: true })) // Allows express to parse objects in the request body (if false then just strings)
app.use(express.json()) // Allows express to parse json in request body

//* Routers - Direct requests to the appropriate routers
app.use('/', homeRoutes)
app.use('/game', gameRoutes)
app.use('/track', trackRoutes)
app.use('/time', timeRoutes)

// Start server 
app.listen(process.env.PORT, () => { // Start app on port specified in .env
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`) // Log mode and port on server start
})


/**
 * *Tools
 */
// +Convert seconds (stored as double in database) to a timestamp like string
// useful for returning data in an expected format or convert for ejs display sake
// convertSecToTimeString(95.123) => '1:35.123'
function convertSecToTimeString(secAsNum){
  let seconds = (secAsNum % 60).toFixed(3);
  seconds = seconds.indexOf('.') === 1 ? '0' + seconds : seconds
  const minutes = Math.floor(secAsNum / 60);
  const timeStr = `${minutes}:${seconds}`
  return timeStr
}

// +Convert seconds timestamp (displayed as string) to a number for storage in database
// Storing time as a single number of seconds in the database makes it easier to sort results when retrieving
// convertTimeStringToNum('1:23.456') => 83.456
function convertTimeStringToNum(timeAsStr){
  const timeArr = timeAsStr.split(':');
  const minutes = +timeArr[0];
  let seconds = +timeArr[1];

  seconds += (minutes * 60)

  return seconds
}
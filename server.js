/**
 * *Imports
 */
const { response } = require('express');
const express = require('express');
const app = express();
const Mongo = require('mongodb').MongoClient;
require('dotenv').config();

/**
 * *DB Initialization/Connection
 *  Be sure that db is included in each request as it will be the game name
 *  collection will refer to the track that you want data about
 */
let client, db,
    dbConnectionStr = process.env.DB_STRING
    // dbName = '' // This project will use multiple different tables (one for each game); will need passed in as part of request

// Connect to MongoDB
Mongo.connect(dbConnectionStr, { useUnifiedTopology: true })
  .then(c => {
    console.log('Connected to database')
    client = c // Only store the client object here so we can pass db name in whenever needed
    // db = client.db(dbname) // Since we haven't assigned db we will have to pass it in whenever db would be called
  })

/**
 * *Middleware
 *  Add any methods you would like to run before each request here
 *  Then add to app.use
 */
// +Output all requests to server console for easier debugging
const requestLogger = (req, res, nxt) => { 
  console.log('Method:', req.method)
  console.log('Path:', req.path)
  console.log('Body:', req.body)
  console.log('_____')
  nxt()
}

app.set('view engine', 'ejs');
app.use(express.static('public')) // Files in public folder don't need routes created
app.use(express.urlencoded({ extended: true })) // https://stackoverflow.com/a/51844327/9059589 - Allows incoming data to be strings, arrays, or objects with nested objects
app.use(express.json()) // Parses incoming json requests (such as in a head) and adds them to req.body to be accessed
app.use(requestLogger) // Log request data to console //!Must be after urlencoded() && json() to output body content for objects

/**
 * *Routes
 *  '!' indicates level of importance
 *  '*' for complete routes
 *  '?' for notes about the above route
 **  - /api => return list of all games, each containing their own tracks, who each have leaderboards
 **  - /api/:game GET => Return list of all tracks for that game (if it exists)
 *! - /api/:game POST => Create a new game db
 *      ?Will likely need a track/time object in order to create
 *!!- /api/:game/:trackName GET => Return data for that track such as trackname, image, and laptimes
 *      ?Starting with just laptimes... Consider creating entry with id: 'about' or something to access a document containing track data
 **  - /api/:game/:trackName POST => Add a time to a tracks leaderboard (Include object with driverInitials and time in req.body)
 */
// +Return list of all games (all databases available to client connection)
app.get('/', async (req, res) => {
  // Fetch/store all databases available to this client 
  const dbs = await client.db().admin().listDatabases()

  // Log found databases
  console.log(`${dbs.databases.length} databse(s)/game(s) found`)
  console.log(dbs.databases)

  // Build path for ejs page to create links for users selecting games
  let path = '/api/'
  res.render('path_select.ejs', { info: dbs.databases, type: 'Game', path });
  res.end()
})

// Duplicate route for root and api root will help keep main app and api side to be seperate in the future as this will be phased to only return json
app.get('/api', async (req, res) => {
  // Fetch/store all databases available to this client 
  const dbs = await client.db().admin().listDatabases()

  // Log found databases
  console.log(`${dbs.databases.length} databse(s)/game(s) found`)
  console.log(dbs.databases)

  // Build path for ejs page to create links for users selecting games
  let path = '/api/'
  res.render('path_select.ejs', { info: dbs.databases, type: 'Game', path });
  res.end()
})

// +Return a list of tracks for a given game
app.get('/api/:gameName', async (req, res) => {
  const tracks = await client.db(req.params.gameName).collections()

  let renamedTracks = tracks.map((t) => {
    // Map through array of tracks
    console.log(t.collectionName)
    // Add a name property to display for ejs template (renaming keeps ejs template consistent)
    return {...t, name: t.collectionName}
  })

  // Path variable to be displayed in ejs
  // Helps build path to view data on the given game
  let path = `/api/${req.params.gameName}/`

  res.render('path_select.ejs', { info: renamedTracks, type: 'Track', path })
  res.end()
});


// +Return a list of times for a given game+track
app.get('/api/:gameName/:trackName', async (req, res) => { 
  // Return for all times for a given game+track and sort descending by time (fastest first)
  const data = await client.db(req.params.gameName).collection(req.params.trackName).find().sort({time: 1}).limit(Number.MAX_SAFE_INTEGER).toArray()
  // Convert seconds from number to string for viewing
  data.map((el) => { el.time = convertSecToTimeString(el.time) }) // 83.456 => '1:23.456'

  // Log/render found data from search
  console.log(`${data.length} leaderboard records found for ${req.params.gameName} at ${req.params.trackName}`)
  console.log(data)
  res.render('track_leaderboard.ejs', {info: data, game: req.params.gameName, track: req.params.trackName})
})

// +Add a new time to the leaderboard for a given track/
app.post('/api/:gameName/:trackName', async (req, res) => { 
  // Convert time from '1:23.456' string format to seconds as a number format // =>(83.456)
  const seconds = convertTimeStringToNum(req.body.time) // '1:23.456' => 83.456
  // Add 
  const result = await client.db(req.params.gameName).collection(req.params.trackName).insertOne({driverInitial: req.body.driverInitial, time: seconds})

  console.log(`New time submitted to ${req.params.gameName} - ${req.params.trackName} leaderboard with id:${result.insertedId}}`)
  // Redirect to view track leaderboard after submission
  res.redirect(req.path)
})

/**
 * *Tools
 */
// +Convert seconds (stored as double in database) to a timestamp like string
// useful for returning data in an expected format or convert for ejs display sake
// convertSecToTimeString(95.123) => '1:35.123'
function convertSecToTimeString(secAsNum){
  const seconds = (secAsNum % 60).toFixed(3);
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

app.listen(process.env.PORT, () => { 
  console.log(`Server running on port ${process.env.PORT}`)
})
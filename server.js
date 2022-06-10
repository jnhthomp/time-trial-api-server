/**
 * *Imports
 */
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
app.use(requestLogger) // Log request data to console
app.use(express.static('public')) // Files in public folder don't need routes created
app.use(express.urlencoded({ extended: true })) // https://stackoverflow.com/a/51844327/9059589 - Allows incoming data to be strings, arrays, or objects with nested objects
app.use(express.json()) // Parses incoming json requests (such as in a head) and adds them to req.body to be accessed

/**
 * *Routes
 *  '!' indicates level of importance
 * 
 *! - /api => return list of all games, each containing their own tracks, who each have leaderboards
 *! - /api/:game GET => Return list of all tracks for that game (if it exists)
 *  - /api/:game POST => Create a new game db
 *!!- /api/:game/:trackName GET => Return data for that track such as trackname, image, and laptimes
 *!!- /api/:game/:trackName PUT => Add a time to a tracks leaderboard (Include object with driverInitials and time in req.body)
 */
// +Return list of all games (all databases available to client connection)
app.get('/', (req, res) => { 
  client.db().admin().listDatabases()
    .then((dbs) => { 
      console.log(dbs.databases);
      let path = `/api/`
      res.render('path_select.ejs', { info: dbs.databases, type: 'Game', path })
    })
})

app.get('/api', (req, res) => { 
  client.db().admin().listDatabases()
    .then((dbs) => { 
      console.log(dbs.databases)
      let path = `/api/`
      res.render('path_select.ejs', { info: dbs.databases, type: 'Game', path })
    })
})

// +Return a list of tracks for a given game
app.get('/api/:gameName', (req, res) => { 
  client.db(req.params.gameName).collections()
    .then((tracks) => { 
      tracks.map((t) => { 
        console.log(t.collectionName)
        return t.name = t.collectionName
      })
      
      let path = `/api/${req.params.gameName}/`
      res.render('path_select.ejs', { info: tracks, type: 'Track', path})
      res.end()
    });
})

app.listen(process.env.PORT, () => { 
  console.log(`Server running on port ${process.env.PORT}`)
})
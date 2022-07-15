# Time Trial Database/Server/API 🎮
<a href="https://jtdev.netlify.app/" target="_blank" rel="noreferrer"> <img src="https://drive.google.com/uc?id=19ZZ2aDajCwqqMiawXZRcjEKScT1z5657" alt="JTDEV" width="100%" height="auto"/> </a> 
This application was created to act as a server/API to interact with a MongoDB database. It is meant to allow me and my friends to add racing games, tracks, and times so that we can compare times across games more easily. This application will have a front end interface but will also allow interaction with a discord bot I have also built. This way we can update our times simply by sending a message in our discord server.

<!-- Application gif -->
<!-- <a href="https://jtdev.netlify.app/" target="_blank" rel="noreferrer"> <img src="" alt="JTDEV" width="100%" height="auto" /> </a>  -->

## How It's Made:
**Tech used:** <!--JavaSCript =>--><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <!-- Node.js =>--><a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a><!-- MongoDB =>--><a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="MongoDB" width="40" height="40"/> </a><!-- Postman =>--><a href="https://postman.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="40" height="40"/> </a><!-- Express =>--><a href="http://expressjs.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="Express JS" width="40" height="40"/> </a> 

This is an Express based application server that connects with a MongoDB instance serve up relevant data using ejs files to dynamically generate the displayed content. By utilizing a versatile database such as MongoDB I can more easily make quick changes as needed.

### Available Endpoints
- `/api`
  - `GET`: Return a list of available games to choose from. Each game is a database and will contain tracks as collections within
- `/api/:gameName`
  - `GET`: Return a list of available tracks for a chosen game. Each track is a collection of documents (one for each time submitted)
- `/api/:gameName/:trackName`
  - `GET`: Return a list of all documents for this game/track (db/collection). Each document is a time that has been submitted for this track
  - `POST`: Submit a new time to the given database/collection using the following json format
    ```json
    {
      "driverInitial": "TST",
      "time": "59:59.999"
    }
    ```
- `/api/newGame`
  - `GET`: Return a form that will submit to this routes post method to create a new game + track + time. Helpful for submitting times to games and tracks that do not exist
  - `POST`: Submit a json object of the following format to create a new database AND collection AND document entry. Only use when the game does not exist yet
    ```json
    {
      "game": "test_game",
      "track": "test_track",
      "driverInitial": "TST",
      "car": "equal",
      "time": "1:22.858"
    }
    ```

### How to install/use
1. Create MongoDB account/database
    - Use connect button to get connection string and make note
2. Create .env file to store connection string and port to use on dev environment
    - See `.env-example` and replace `<USERNAME>` and `<PASSWORD>` with your db specific username and password (NOT MongoDB account username and password)
3. Install npm dependencies
    - ```bash
      $npm install
      ```
4. To run in dev environment with nodemon:
    - ```bash
      $npm run dev
      ```

## Optimizations
- Extract submit data to a reusable method

- Add Username/password validation

- Consider allowing a flag to keep time as numbers and don't convert to string when returning

- Add flag to remove slower duplicate driver times when displaying leaderboard but still storing all times
    Consider the following leadboard array:
    ```js
    [ {driverInitial: 'TMP', time: 90.000}, 
      {driverInitial: 'TRZ', time: 91.000},
      {driverInitial: 'TMP', time: 92.000}]
    ```
    When querying a user may only be interested in the fastest time by each driver 
    Therefore, we will need to filter the results before returning
    Sometimes they may want all times though
    Allow a flag that allows for both but only returns one or the other by default

- Validate user entered data server side before accepting submission
  - Force lowercase db and track names
  - Force uppercase initials

- Add timestamp field when adding a new time so we can know when a record was set
  - Could allow some cool visualizations on the back and forth between records

- Add form to root route where you can select a game from dropdown, a track from dropdown, and submit timing data

- Create general function to check if submitted time is in seconds or string form. This will allow either format to be used when submitting a time without breaking anything
  - Check for existence of ':'
  - If it exists is a string and must be converted before being submitted to database
  - If it does not exist then does not need converted before submission

- Create seperate routes for API (data only) and ejs routes
  - Update links in discord bot to match these non routes (embed object should link to ejs route but data should come from api route)
  - Make sure links in ejs file link to ejs route and not api route

- Add React frontend: https://www.youtube.com/watch?v=xwovj4-eM3Y (Do in new git branch)
  - ~~Remove EJS endpoints from server (comment out for now)~~
  - ~~Within project create new react app with below script~~
    - `$npx create-react-app client`
  - ~~Remove `client/.git` and `client/.gitignore`~~
  - ~~Ensure all npm dependencies are installed for server and client~~
    - `npm install && cd client && npm install`
  - ~~Ensure that port is set to an environment variable || 5000~~
    - ~~Change to output port number when server starts~~
    - Do not set port to 3000 as react will likely run on that and cause issues when running server and client concurrently
    - May have to add PORT 5000 as an env variable in heroku
  - ~~Add proxy to react client~~
    - in `client/package.json` add new item:
        - ```json
          {
            ... (json above)
            "proxy" : "http://localhost:5000"
          }
          ```
  - ~~Add a simple fetch request to react to ensure that the connection between client and server works~~
    - `fetch('/api')` Should be able to use this because of the proxy line that was added to `package.json` previously
  - ~~Install `CORS`~~
    - `npm install cors`
  - ~~Import cors to `server.js`~~
    - ```js
      // Near top with other app.use methods
      var cors = require('cors');
      app.use(cors());
      ```
  - ~~Make react pages available ~~
    - Change: `app.use(express.static('public')) // Files in public folder don't need routes created`
    - To: `app.use(express.static('client/build'))`
  - ~~set server root route (`'/'` to `/client/build/index.html`)~~
  - Set routes not defined to go to this root route
    - ```js
      app.get('*', (req, res) => {
        res.sendFile('/client/build/index.html')
      })
      ```
  - ~~Build react app~~
    - `$cd client && npm run build`
  - ~~Test locally by starting express server and react server~~
    - `$npm run start`
    - (in new tab) `$cd client && npm run start`
  - ~~Add script to `package.json`~~
    - `"heroku-postbuild":"cd client && npm install && npm run build"`
  - ~~Make sure that client node_modules are included in `.gitignore`~~
  - Build sweet react app that fetches games on initial page load
    - Allow each loaded game to contain a button that will make a fetch request for that games tracks
    - Same idea for the tracks where they get a button to load times for a track
    - When showing a track display leaderboard
    - Add form (as modal?) to allow user to submit a new time from anywhere
  - Push app to heroku (set PORT 5000 env var if needed but probably not)

## Lessons Learned
- Creating Node server applications
- Interacting with MongoDB via CRUD actions
- Using developer tools such as Nodemon
- Dynamically rendering data server side with ejs files

## Resources: 
- https://fullstackopen.com/en/part3/node_js_and_express#the-visual-studio-code-rest-client
- https://zellwk.com/blog/crud-express-mongodb/
- https://www.youtube.com/watch?v=ayNI9Q84v8g

## Other Examples:
Take a look at other examples from my <a href="https://jtdev.netlify.app/">portfolio</a> using the lessons learned from these classes:


**Blog Site W/ Categories and Authentification:** https://github.com/jnhthomp/alpha-blog2

**Stock Based Social Network:** https://github.com/jnhthomp/finance-tracker

**Restaurant Web-Based Ordering System:** https://github.com/jnhthomp/practice-food-order-app
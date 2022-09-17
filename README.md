# Time Trial Database/Server/API 2.0 🎮
<a href="https://jtdev.netlify.app/" target="_blank" rel="noreferrer"> <img src="https://drive.google.com/uc?id=19ZZ2aDajCwqqMiawXZRcjEKScT1z5657" alt="JTDEV" width="100%" height="auto"/> </a> 
This application was created to act as a server/API to interact with a MongoDB database. It is meant to allow me and my friends to add racing games, tracks, and times so that we can compare times across games more easily. The 2.0 version has some new features such as an MVC architecture, a relational MongoDB database using mongoose. For users there will now be a way for them to login to the application in order to record times and have those times associated with that users account. This opens the doors to many exciting features such as being able to more easily explore and compare times for a user or compare across multiple users.

<!-- Application gif -->
<!-- <a href="https://jtdev.netlify.app/" target="_blank" rel="noreferrer"> <img src="https://drive.google.com/uc?id=1nQ9bFzzWO1Iuq6pjtcWAZR-Y5H_3rIxw" alt="JTDEV" width="100%" height="auto" /> </a>  -->

## How It's Made:
**Tech used:** <!--JavaSCript =>--><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <!-- Node.js =>--><a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a><!-- MongoDB =>--><a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="MongoDB" width="40" height="40"/> </a><!-- Postman =>--><a href="https://postman.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="40" height="40"/> </a><!-- Express =>--><a href="http://expressjs.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="Express JS" width="40" height="40"/> </a> 

This is an Express based application server with a React front-end (see version 1.0 for React, 2.0 currently uses ejs but will be updated to react after MVP is complete) that connects with a MongoDB instance serve up relevant data. By using a flexible database such as mongoose db allowed for much easier prototyping and learning about the best way to structure my database and allows me to experiment with changes to that structure more easily.

### Available Endpoints
2.0 API coming soon. See 1.0 release for previous API details.
<!-- - `/api`
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
    ``` -->

### How to install/use
1. Create MongoDB account/database
    - Use connect button to get connection string and make note
2. Create .env file to store connection string and port to use on dev environment
    - See `.env-example` and replace `<USERNAME>` and `<PASSWORD>`  and `<DATABASE_NAME>`with your db specific username and password (NOT MongoDB account username and password)
3. Install server npm dependencies
    - ```bash
      $npm install
      ```
<!-- 4. Install client npm dependencies and build react project
    - ```bash
      $cd client && npm install && npm run build
      ``` -->
4. To run server in dev environment with nodemon:
    - ```bash
      $npm run dev
      ```

<!-- To make changes to react project
1. Start server
    - ```bash
      #from project root
      $npm run start
      ```
2. Start react project
    - ```bash
      $cd client && npm run start
      ```
3. Navigate to `http://localhost:3000` in your browser (default react starting port - see logs of previous command to check for other port if not running here)
4. Make any changes to react that you want
5. Confirm build version works properly
    - ```bash
      #from projRoot/client
      $npm run build
      ```
6. Switch to server cli, `ctrl + c` to stop and restart server with below command
    - ```bash
      #from projRoot/
      $npm run start
      ``` -->

## Optimizations
Optimizations will be discovered as 2.0 is created as has some time to be tested

## Lessons Learned
- Creating Node server applications utilizing MVC architecture
- Interacting with MongoDB via CRUD actions
- Utilizing a schema with mongoose to create a relational MongoDB intance
<!-- - Connecting React applications with a backend -->
- Deploying a backend and front-end application within the same project
- Using developer tools such as Nodemon, morgan, and cross-env
- Dynamically rendering data server side with ejs files

## Resources: 
- REST Client API testing: https://fullstackopen.com/en/part3/node_js_and_express#the-visual-studio-code-rest-client
- MongoDB w/ Express: https://zellwk.com/blog/crud-express-mongodb/ & https://www.youtube.com/watch?v=ayNI9Q84v8g
<!-- - Adding React To Express and Deploying to Heroku: https://www.youtube.com/watch?v=xwovj4-eM3Y&list=LL&index=1&t=831s -->
- Relational MongoDB: https://vegibit.com/mongoose-relationships-tutorial/

## Other Examples:
Take a look at other examples from my <a href="https://jtdev.netlify.app/">portfolio</a>

**Blog Site W/ Categories and Authentification:** https://github.com/jnhthomp/alpha-blog2

**Stock Based Social Network:** https://github.com/jnhthomp/finance-tracker

**Restaurant Web-Based Ordering System:** https://github.com/jnhthomp/practice-food-order-app
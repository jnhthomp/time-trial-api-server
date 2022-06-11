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
  - GET: Return a list of available games to choose from. Each game is a database and will contain tracks as collections within

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

- Write JSON returns for proper API and quick integration to discord bot

- Validate user entered data server side before accepting submission

- Routes still needed
  - Create new game/track
    Will be done by submitting lapdata obj to a non-existent/new database/table combo

- Set root route as homepage form where you can select a game from dropdown, a track from dropdown, and submit timing data

- Create general function to check if submitted time is in seconds or string form. This will allow either format to be used when submitting a time without breaking anything
  - Check for existence of ':'
  - If it exists is a string and must be converted before being submitted to database
  - If it does not exist then does not need converted before submission

- Add forms to all page allowing a new type of leaderboard post from that page
  - If game select page then form will need to know: game=> track=> time data
  - If track select page then form will need to know: track=> time data
  - If on a track already then only time data is needed

- Fix bug in Tools `convertSecToTimeString()`
  - If given seconds after removing minutes value if there are less than 10 seconds remaing the format is incorrect
  - Currently looks like this: `convertSecToTimeString(66) => 1:6.000`
  - Should look like this: `convertSecToTimeString(66) => 1:06.000`
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
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
Finish adding routes and include endpoint tests for all
Add Username/password validation

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
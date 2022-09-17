const mongoose = require('mongoose') // Use mongoose to connect to db

// Database connection method
const connectDB = async () => {
  try {
    // Connect to mongo db using connection string from .env
    const conn = await mongoose.connect(process.env.DB_STRING)
    // Log db connetion success
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) { // Handle errors for db connection
    console.error(err) // log error
    process.exit(1) // shut down server on error (prevent server hanging)
  }
}

// export connection method
module.exports = connectDB

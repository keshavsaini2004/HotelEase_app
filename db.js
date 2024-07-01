const mongoose = require('mongoose');



// Define the Mongodb connnection in URL
const mongoURL = 'mongodb://localhost:27017/hotels'

// setup mongodb connections
mongoose.connect(mongoURL, {
useNewUrlParser: true,
 useUnifiedTopology: true ,
})

//get the default connection 
//Mongoose maintains a default connection object representing the Mongodb connection 

const db = mongoose.connection;

//define event listeners for database connection
db.on('error', (err) =>{ 
    console.log('MongoDB connection error:',err);
});
db.on('connected', () =>{ 
    console.log('Connected to MongoDB Server');
});
db.on('disconnected', () =>{ 
    console.log('MongoDB disconnected');
});

// export the database connection

module.exports = db;




const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/database');
const { corsOptions } = require('./config/cors');

// Connect DB
connectDB(process.env.MONGO_URL);

// process.on('uncaughtException', (error, origin) => {
//     console.log('----- Uncaught exception -----')
//     console.log(error)
//     console.log('----- Exception origin -----')
//     console.log(origin)
// })

// process.on('unhandledRejection', (reason, promise) => {
//     console.log('----- Unhandled Rejection at -----')
//     console.log(promise)
//     console.log('----- Reason -----')
//     console.log(reason)
// })

// Middlewares
app.use(express.json());
app.use(cors(corsOptions));

// Routes
const comicsRouter = require('./routes/comics')
app.use('/comics', comicsRouter)

// Serving
app.listen(5000, () => {
    console.log('server is running')
})

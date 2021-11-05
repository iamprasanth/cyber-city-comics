const mongoose = require('mongoose');

const connectDB = async (dbUrl) => {
    try {
        const connnection = await mongoose.connect(dbUrl, {
            // These options are added to avoid deprecation warnings
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Database connected : ${connnection.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

module.exports = connectDB;
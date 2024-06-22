// Require and configure dotenv (if not already done in your main server file)
require('dotenv').config();

const mongoose = require('mongoose');
const uri = process.env.ATLAS_URI || ""; // Retrieve MongoDB URI from environment variables

console.log("Connecting to MongoDB:", uri); // Log the URI being used for connection

const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('MongoDB Connected!!!');
    } catch (error) {
        console.error('MongoDB Connection Error:', error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;

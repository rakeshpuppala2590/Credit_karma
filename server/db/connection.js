// Require and configure dotenv to load environment variables
require('dotenv').config();

const mongoose = require('mongoose');

// Retrieve MongoDB connection URI from environment variables
const uri = process.env.ATLAS_URI;

// Connect to MongoDB using Mongoose
const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected!!!');
    } catch (error) {
        console.error('MongoDB Connection Error:', error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;

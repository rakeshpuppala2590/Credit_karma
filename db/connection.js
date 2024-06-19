const uri = process.env.ATLAS_URI || "";

console.log

const mongoose = require('mongoose');

const db = uri
console.log(db)

const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log('MongoDB Connected!!!');
    } catch (error) {
        console.log(error);

        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;
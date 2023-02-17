const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// Setting parameters
const connectionParameters = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

// Connecting to the database
let database;
mongoose.set('strictQuery', true);
if (process.env.ENVIRONMENT == 'dev') {
    database = mongoose
        .connect(process.env.MONGODB_URI_DEV, connectionParameters)
        .then(() => {
            console.log(`Connected to database`);
        })
        .catch((error) => {
            console.log(error);
        });
} else if (process.env.ENVIRONMENT == 'prod') {
    database = mongoose
        .connect(process.env.MONGODB_URI_PROD, connectionParameters)
        .then(() => {
            console.log(`Connected to database`);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = database;

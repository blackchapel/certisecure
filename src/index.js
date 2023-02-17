// Importing modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');
const database = require('./configs/database.config');
const dotenv = require('dotenv').config();

// Importing routes
const authRoutes = require('./routers/auth.router');

// Initializing an express app
const app = express();

// Server Port
const PORT = process.env.PORT;

// Formatting incoming data and allowing cross origin requests
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging incoming requests
app.use(morgan('dev'));

// APIs
app.use('/api/auth', authRoutes);

// Test API
app.get('/api', (req, res) => {
    res.status(200).json({
        name: `${process.env.APP_NAME}`,
        apiVersion: JSON.parse(fs.readFileSync('./package.json').toString())
            .version
    });
});

// Listening on the port
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

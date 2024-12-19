require('dotenv').config(); // Import dotenv

const express = require('express'); // Import express
const mongoose = require('mongoose'); // Import mongoose
const workoutsRoutes = require('./routes/workouts'); // Import the workouts router

// Initialize an express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON from the request body
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use('/api/workouts', workoutsRoutes);

// Connect to the database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Start listening after successful connection
        app.listen(process.env.PORT, () => {
            console.log('Connected to DB & listening on port', process.env.PORT);
        });
    })
    .catch((err) => {
        console.error('Error connecting to DB:', err);
    });

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');

//express app
const app = express();

//middleware
app.use(express.json());

//connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

//routes
// app.get('/', (req, res) => {
//     res.json({ message: 'Welcome to the MERN Stack Assessment!' });
// });

app.use('/api/workouts', workoutRoutes);

//listen for requests
app.listen(process.env.PORT || 4000, () => {
    console.log(`listening on port ${process.env.PORT || 4000}`);
});

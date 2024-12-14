const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const analyzeRoutes = require('./routes/analyzeRoute');
const userRoutes = require('./routes/userRoutes');
const { errorMiddleware } = require('./middlewares/errorMiddleware');

const app = express();

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


//basic route for testing
app.get('/', (req, res) => {
    res.status(200).json({ message: "Hello world!" });
});

//routes
// app.use('/api/analyze', analyzeRoutes);
app.use('/api/users', userRoutes);


//error handling middleware
app.use(errorMiddleware);

module.exports = app;
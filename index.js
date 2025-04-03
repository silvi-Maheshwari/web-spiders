const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskrouter = require('./controllers/taskController');
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();

// const taskrouter = require('./routes/taskRoutes');

const app = express();

app.use(express.json());
app.use(cors());
app.use("/tasks", taskrouter);
app.use((err, req, res, next) => {
    console.error('Error:', err.message || err);
    
    if (err.isJoi) {
        return res.status(400).json({ errors: err.details.map((detail) => detail.message) });
    }

    res.status(500).json({ error: err.message || 'Internal Server Error' });
});

// const MONGO_URI = 'mongodb+srv://maheshwarisilvi98:silvi123@cluster0.jftpm.mongodb.net/books?retryWrites=true&w=majority';

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.error( error);
    
    }
};


connectDb().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});

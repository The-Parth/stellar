// External modules
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

// Middleware
import authenticateUser from './Authentication.js';
import connectDB from './db.js'; // Import the MongoDB connection

// Routes
import user from './routes/user.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authenticateUser);

app.use('/user', user);


const startServer = async () => {
    try {
        // Connect to MongoDB
        await connectDB();

        // Start the Express server
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to start server", error);
    }
};



app.get('/', (req, res) => {
    res.send('Hello World!');
});

startServer();
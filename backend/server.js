import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import connectToMongoDB from './db/connectToMongoDB.js';
import User from './models/user.model.js';

const app = express();
const PORT = process.env.PORT || 5002;

dotenv.config();

app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Hello World')
// })

app.get('/', async (req, res) => {
    try {
        const users = await User.find()
        if (users) {
            res.status(200).send(users)
        } else {
            res.send('No user found')
        }
    } catch (error) {
        res.status(500).send({
            error: error.message,
            message: 'could not fetch users'
        })
    }
})

app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Application server is running on ${PORT}`)
})
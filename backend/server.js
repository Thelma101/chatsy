import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import connectToMongoDB from './db/connectToMongoDB.js';

const app = express();
const PORT = process.env.PORT || 5002;

dotenv.config();

app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Hello World')
// })

app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Application server is running on ${PORT}`)
})
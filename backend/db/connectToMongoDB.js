import mongoose from 'mongoose';

// const connectToMongoDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI);
//         console.log("Connected to MongoDB");
//     } catch (error) {
//         console.log(`Error connecting to MongoDB: ${error.message}`)

//     }
// }

console.log('Attempting to connect to MongoDB with URI:', process.env.MONGODB_URI);

const connectToMongoDB = () => {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log('Hurray! Connected to MongoDB');
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB:');
            console.error('1. Check if MongoDB is running.');
            console.error('2. Verify the MONGODB_URI in your .env file.');
            console.error('3. Ensure the database name and credentials are correct.');
            console.error('Full error details:', err.message);
        });
}

export default connectToMongoDB;
const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/Minor-Project-Data'; // MongoDB connection URI

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if connection fails
  }
};

// Export the connectDB function using CommonJS syntax
module.exports = connectDB;

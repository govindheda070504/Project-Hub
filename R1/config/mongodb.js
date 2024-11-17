// config/mongodb.js

const mongoose = require('mongoose');


const MONGODB_URI = 'mongodb://localhost:27017/Minor-Project-Data';

const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectMongoDB;

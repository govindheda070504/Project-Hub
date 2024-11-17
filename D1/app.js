const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', userRoutes);

const PORT = 7777; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

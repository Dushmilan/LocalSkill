const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');


dotenv.config();
const app = express();



// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/user', userRoutes);

// MongoDB connection
require('./Database/Mongodb/db');

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
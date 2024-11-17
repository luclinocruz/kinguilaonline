// src/app.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const dotenv = require('dotenv');
const db = require('../models'); // Sequelize models

// Load environment variables
dotenv.config();

// Middleware to parse JSON
app.use(express.json());

// Test database connection
db.sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected...');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

// Sync database models
db.sequelize
  .sync({ force: false }) // Ensure this is false unless you need to reset your DB
  .then(() => {
    console.log('Database models synchronized...');
  })
  .catch((err) => {
    console.error('Error synchronizing database models:', err);
  });

// Routes
const authRoutes = require('../routes/authRoutes');
const transactionRoutes = require('../routes/transactionRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

// Basic test route
app.get('/', (req, res) => {
  res.send('Kinguila Online API is running');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

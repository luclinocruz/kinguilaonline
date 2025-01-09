// src/app.js
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const db = require('../models'); // Sequelize models
const cors = require('cors'); // Middleware for cross-origin requests
const helmet = require('helmet'); // Security middleware
const { swaggerUi, swaggerSpec } = require('./config/swagger');

// Load environment variables
dotenv.config();


// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
console.log('Swagger documentation available at /api-docs');

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

// Import Routes
const contactRoutes = require('../routes/contactRoutes');
const authRoutes = require('../routes/authRoutes');
const transactionRoutes = require('../routes/transactionRoutes');
const currencyRoutes = require('../routes/currencyRoutes');


// Register Routes
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/currencies', currencyRoutes);

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
app.use(helmet());


// Basic test route
app.get('/', (req, res) => {
  res.status(200).send('Kinguila Online API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!',
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

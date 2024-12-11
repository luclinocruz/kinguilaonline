// src/app.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const dotenv = require('dotenv');
const db = require('../models'); // Sequelize models
const cors = require('cors'); // Middleware for cross-origin requests
const helmet = require('helmet'); // Security middleware
const { swaggerUi, swaggerSpec } = require('./config/swagger');

// Load environment variables
dotenv.config();

// Configurar rota da documentação
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
console.log('Swagger documentation available at /api-docs');


// Middleware to parse JSON
app.use(express.json());

// Middleware for security
app.use(helmet());

// Enable CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:4200', // Permitir apenas o frontend, // Restrict origin to your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Permitir envio de cookies
}));

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
const currencyRoutes = require('../routes/currencyRoutes');

app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/transactions', transactionRoutes); // Transaction routes
app.use('/api/currencies', currencyRoutes); // Currency-related routes

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
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

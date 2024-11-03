// src/app.js
const authRoutes = require('../routes/authRoutes');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const sequelize = require('../config/database'); // Import Sequelize instance


const verifyToken = require('../middleware/authMiddleware'); // Import middleware


//protected route
app.get('/api/auth/profile', verifyToken, (req, res) => {
  res.json({ message: 'Profile data', user: req.user });
});

// Load environment variables from .env file
const dotenv = require('dotenv');
dotenv.config();

// Middleware to parse JSON - place it here
app.use(express.json());

// Import the authRoutes file and mount it
app.use('/api/auth', authRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Kinguila Online server is running');
});

// Test route
app.post('/test', (req, res) => {
  res.json({ message: 'Test route working' });
});


// inportando e montando transactionroutes
const transactionRoutes = require('../routes/transactionRoutes');
app.use('/api/transactions', transactionRoutes);


// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Sync database models
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database tables created or updated');
  })
  .catch(err => console.error('Error syncing database:', err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

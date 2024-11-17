// routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/TransactionController');
const verifyToken = require('../middleware/authMiddleware'); // Middleware to protect routes

// Define necessary routes
router.post('/initiate', verifyToken, TransactionController.initiateTransaction); // Initiate a transaction
router.put('/approve/:transactionId', verifyToken, TransactionController.approveTransaction); // Approve a transaction
router.post('/cancel', verifyToken, TransactionController.cancelTransaction); // Cancel a transaction
router.get('/sellers', verifyToken, TransactionController.listSellers); // List available sellers for a currency
router.post('/exchange', verifyToken, TransactionController.exchangeCurrency); // Exchange between currencies

// Export the router
module.exports = router;

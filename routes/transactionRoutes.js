// routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/TransactionController');
const verifyToken = require('../middleware/authMiddleware'); // Protect routes

router.post('/buy', verifyToken, TransactionController.buyCurrency);
router.post('/sell', verifyToken, TransactionController.sellCurrency);
router.post('/exchange', verifyToken, TransactionController.exchangeCurrency);
router.get('/sellers', verifyToken, TransactionController.listSellers);
module.exports = router;
router.post('/initiate', verifyToken, TransactionController.initiateTransaction);
router.put('/approve/:transactionId', verifyToken, TransactionController.approveTransaction);

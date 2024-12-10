
// routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/TransactionController');
const verifyToken = require('../middleware/authMiddleware'); // Middleware to protect routes

console.log(TransactionController); // Verifique no terminal se as funções são exibidas corretamente

// Define necessary routes


/**
 * @swagger
 * /api/transactions/initiate:
 *   post:
 *     summary: Inicia uma nova transação
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               buyerId:
 *                 type: integer
 *               sellerId:
 *                 type: integer
 *               currencyId:
 *                 type: integer
 *               amount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Transação iniciada.
 */
router.post('/initiate', verifyToken, TransactionController.initiateTransaction); // Initiate a transaction
router.put('/approve/:transactionId', verifyToken, TransactionController.approveTransaction); // Approve a transaction
router.post('/cancel', verifyToken, TransactionController.cancelTransaction); // Cancel a transaction
router.get('/sellers', verifyToken, TransactionController.listSellers); // List available sellers for a currency
router.post('/exchange', verifyToken, TransactionController.exchangeCurrency); // Exchange between currencies

/**
 * @swagger
 * /api/transactions/history:
 *   get:
 *     summary: Lista o histórico de transações de um usuário
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Histórico retornado.
 */
router.get('/history', verifyToken, TransactionController.getTransactionHistory);


// Export the router
module.exports = router;

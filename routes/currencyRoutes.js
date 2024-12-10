// routes/currencyRoutes.js
const express = require('express');
const router = express.Router();
const CurrencyController = require('../controllers/CurrencyController');
const verifyToken = require('../middleware/authMiddleware'); // Middleware to protect routes

// Currency management routes
router.post('/add', verifyToken, CurrencyController.addCurrency); // Add a new currency
router.put('/update/:id', verifyToken, CurrencyController.updateCurrency); // Update a currency
router.delete('/delete/:id', verifyToken, CurrencyController.deleteCurrency); // Delete a currency
router.get('/list', verifyToken, CurrencyController.listCurrencies); // List all currencies
// routes/currencyRoutes.js
router.get('/search', verifyToken, CurrencyController.searchCurrencies); // Buscar moedas
router.get('/sort', verifyToken, CurrencyController.sortCurrencies); // Ordenar vendedores por critérios

module.exports = router;

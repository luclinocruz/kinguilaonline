// routes/currencyRoutes.js
const express = require('express');
const router = express.Router();
const CurrencyController = require('../controllers/CurrencyController');
const verifyToken = require('../middleware/authMiddleware'); // Middleware to protect routes

// Adicionar nova moeda (somente admin)
router.post('/add', verifyToken, CurrencyController.addCurrency);

// Listar todas as moedas
router.get('/list', CurrencyController.listCurrencies);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Currencies
 *   description: Rotas para gerenciamento de moedas.
 */

const express = require('express');
const router = express.Router();
const CurrencyController = require('../controllers/CurrencyController');
const verifyToken = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/currencies/add:
 *   post:
 *     summary: Adiciona uma nova moeda
 *     tags: [Currencies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               code:
 *                 type: string
 *               rate:
 *                 type: number
 *               symbol:
 *                 type: string
 *     responses:
 *       201:
 *         description: Moeda adicionada com sucesso.
 */
router.post('/add', verifyToken, CurrencyController.addCurrency);

/**
 * @swagger
 * /api/currencies/update/{id}:
 *   put:
 *     summary: Atualiza uma moeda existente
 *     tags: [Currencies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               rate:
 *                 type: number
 *     responses:
 *       200:
 *         description: Moeda atualizada com sucesso.
 */
router.put('/update/:id', verifyToken, CurrencyController.updateCurrency);

/**
 * @swagger
 * /api/currencies/delete/{id}:
 *   delete:
 *     summary: Remove uma moeda existente
 *     tags: [Currencies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Moeda removida com sucesso.
 */
router.delete('/delete/:id', verifyToken, CurrencyController.deleteCurrency);

/**
 * @swagger
 * /api/currencies/list:
 *   get:
 *     summary: Lista todas as moedas disponíveis
 *     tags: [Currencies]
 *     responses:
 *       200:
 *         description: Lista de moedas retornada.
 */
router.get('/list', verifyToken, CurrencyController.listCurrencies);

/**
 * @swagger
 * /api/currencies/search:
 *   get:
 *     summary: Busca moedas específicas
 *     tags: [Currencies]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Resultados da busca retornados.
 */
router.get('/search', verifyToken, CurrencyController.searchCurrencies);

/**
 * @swagger
 * /api/currencies/sort:
 *   get:
 *     summary: Ordena as moedas por critérios
 *     tags: [Currencies]
 *     responses:
 *       200:
 *         description: Lista de moedas ordenada.
 */
router.get('/sort', verifyToken, CurrencyController.sortCurrencies);

module.exports = router;

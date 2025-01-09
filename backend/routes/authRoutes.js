/**
 * @swagger
 * tags:
 *   name: Luclino Cruz
 *   description: Rotas para autenticação e gerenciamento de tokens.
 */

const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController'); // Certifique-se de que este caminho está correto.
const verifyToken = require('../middleware/authMiddleware'); // Middleware para verificar tokens.


console.log(AuthController); // Debug para verificar o que está sendo importado

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso.
 *       400:
 *         description: Dados inválidos.
 */
router.post('/register', AuthController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Faz login e retorna um token de autenticação
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido.
 *       401:
 *         description: Credenciais inválidas.
 */
router.post('/login', AuthController.login);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Renova o token de acesso
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Token renovado com sucesso.
 *       401:
 *         description: Token inválido ou expirado.
 */
router.post('/refresh', AuthController.refreshToken);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Faz logout do usuário
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout bem-sucedido.
 */
router.post('/logout', verifyToken, AuthController.logout);

/**
 * @swagger
 * /api/auth/revoke-token:
 *   post:
 *     summary: Revoga o token atual
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token revogado com sucesso.
 *       401:
 *         description: Token inválido.
 */
router.post('/revoke-token', verifyToken, AuthController.validateAndRevokeToken);

module.exports = router;

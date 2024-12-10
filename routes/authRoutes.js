// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController')
const verifyToken = require('../middleware/authMiddleware')

// Route for user registration
router.post('/register', UserController.register);
// Route for user login
router.post('/login', UserController.login);

router.post('/refresh', AuthController.refreshToken); // Rota para refresh de token
router.post('/logout', verifyToken, AuthController.logout);

module.exports = router;

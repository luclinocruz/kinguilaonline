// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');
const verifyToken = require('../middleware/authMiddleware');

// Route for user registration
router.post('/register', UserController.register);

// Route for user login
router.post('/login', UserController.login);

// Route to refresh access token
router.post('/refresh', AuthController.refreshToken);

// Route to logout user (invalidate token)
router.post('/logout', verifyToken, AuthController.logoutUser);

// Protected route to check token revocation
router.post('/revoke-token', verifyToken, AuthController.validateAndRevokeToken);

module.exports = router;

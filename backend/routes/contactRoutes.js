const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/ContactController');

// Rota para envio de mensagens de contato
router.post('/', ContactController.sendMessage);

module.exports = router;

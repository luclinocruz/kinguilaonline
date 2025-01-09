const { ContactMessage } = require('../models');

const ContactController = {
  async sendMessage(req, res) {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    try {
      await ContactMessage.create({ name, email, message });
      return res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
    } catch (error) {
      console.error('Erro ao salvar mensagem de contato:', error);
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  },
};

module.exports = ContactController;

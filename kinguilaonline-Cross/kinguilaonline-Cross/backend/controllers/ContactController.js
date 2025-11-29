const { ContactMessage } = require('../models');

exports.saveMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Input validation
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const contactMessage = await ContactMessage.create({ name, email, message });
        res.status(201).json({ message: 'Message sent successfully.', data: contactMessage });
    } catch (error) {
        console.error('Error saving contact message:', error);
        res.status(500).json({ message: 'Error saving contact message', error });
    }
};

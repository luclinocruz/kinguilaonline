// controllers/CurrencyController.js
const { Currency } = require('../models');

/**
 * Adiciona uma nova moeda ao sistema.
 */
exports.addCurrency = async (req, res) => {
  const { name, code, rate, symbol, maxAmount } = req.body;

  try {
    // Verificar permissões
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Apenas administradores podem adicionar moedas.' });
    }

    const newCurrency = await Currency.create({
      name,
      code,
      rate,
      symbol,
      maxAmount,
      availableAmount: maxAmount, // Inicialmente disponível
    });

    res.status(201).json({
      message: 'Moeda adicionada com sucesso!',
      currency: newCurrency,
    });
  } catch (error) {
    console.error('Erro ao adicionar moeda:', error);
    res.status(500).json({ message: 'Erro ao adicionar moeda.', error });
  }
};

/**
 * Lista todas as moedas disponíveis no sistema.
 */
exports.listCurrencies = async (req, res) => {
  try {
    const currencies = await Currency.findAll();
    res.status(200).json({ currencies });
  } catch (error) {
    console.error('Erro ao listar moedas:', error);
    res.status(500).json({ message: 'Erro ao listar moedas.', error });
  }
};

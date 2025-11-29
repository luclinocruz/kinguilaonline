// controllers/CurrencyController.js
const { Currency } = require('../models');

/**
 * Busca moedas disponíveis com base nos critérios fornecidos.
 */
exports.searchCurrencies = async (req, res) => {
    const { name, code, minRate, maxRate } = req.query;
  
    try {
      const filters = {};
      if (name) filters.name = { [Op.iLike]: `%${name}%` };
      if (code) filters.code = { [Op.iLike]: `%${code}%` };
      if (minRate) filters.rate = { [Op.gte]: parseFloat(minRate) };
      if (maxRate) filters.rate = { [Op.lte]: parseFloat(maxRate) };
  
      const currencies = await Currency.findAll({ where: filters });
  
      res.status(200).json({ currencies });
    } catch (error) {
      console.error('Erro ao buscar moedas:', error);
      res.status(500).json({ message: 'Erro ao buscar moedas.', error });
    }
  };
  
  /**
   * Ordena os vendedores de moedas com base em critérios específicos.
   */
  exports.sortCurrencies = async (req, res) => {
    const { sortBy } = req.query; // Exemplo: "rate", "maxAmount"
  
    try {
      const currencies = await Currency.findAll({
        include: [{ model: User, attributes: ['username', 'rating'] }],
        order: [[sortBy || 'rate', 'ASC']], // Ordena pelo critério ou por taxa como padrão
      });
  
      res.status(200).json({ currencies });
    } catch (error) {
      console.error('Erro ao ordenar moedas:', error);
      res.status(500).json({ message: 'Erro ao ordenar moedas.', error });
    }
  };


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
 * Update a currency's details.
 */
exports.updateCurrency = async (req, res) => {
    const { id } = req.params;
    const { name, code, rate, symbol, maxAmount } = req.body;
  
    try {
      const currency = await Currency.findByPk(id);
      if (!currency) {
        return res.status(404).json({ message: 'Currency not found' });
      }
  
      await currency.update({ name, code, rate, symbol, maxAmount });
      res.status(200).json({ message: 'Currency updated successfully', currency });
    } catch (error) {
      console.error('Error updating currency:', error);
      res.status(500).json({ message: 'Error updating currency', error });
    }
  };
  
  /**
   * Delete a currency.
   */
  exports.deleteCurrency = async (req, res) => {
    const { id } = req.params;
  
    try {
      const currency = await Currency.findByPk(id);
      if (!currency) {
        return res.status(404).json({ message: 'Currency not found' });
      }
  
      await currency.destroy();
      res.status(200).json({ message: 'Currency deleted successfully' });
    } catch (error) {
      console.error('Error deleting currency:', error);
      res.status(500).json({ message: 'Error deleting currency', error });
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

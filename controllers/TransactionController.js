// controllers/TransactionController.js
const Transaction = require('../models/Transaction');
const Currency = require('../models/Currency');

// Buy Currency
exports.buyCurrency = async (req, res) => {
  const { currencyId, amount } = req.body;
  const userId = req.user.userId;

  try {
    const transaction = await Transaction.create({
      type: 'buy',
      amount,
      currencyId,
      userId,
      status: 'pending',
    });
    res.status(201).json({ message: 'Transaction created', transaction });
  } catch (error) {
    res.status(500).json({ message: 'Error processing transaction', error });
  }
};

// Sell Currency
exports.sellCurrency = async (req, res) => {
  const { currencyId, amount } = req.body;
  const userId = req.user.userId;

  try {
    const transaction = await Transaction.create({
      type: 'sell',
      amount,
      currencyId,
      userId,
      status: 'pending',
    });
    res.status(201).json({ message: 'Transaction created', transaction });
  } catch (error) {
    res.status(500).json({ message: 'Error processing transaction', error });
  }
};
// Exchange Currency
exports.exchangeCurrency = async (req, res) => {
  const { fromCurrencyId, toCurrencyId, amount } = req.body;
  const userId = req.user.userId;

  try {
    // Fetch the currencies from the database
    const fromCurrency = await Currency.findByPk(fromCurrencyId);
    const toCurrency = await Currency.findByPk(toCurrencyId);

    if (!fromCurrency || !toCurrency) {
      return res.status(404).json({ message: 'One or both currencies not found' });
    }

    // Calculate exchange amount based on currency rates
    const exchangedAmount = (amount / fromCurrency.rate) * toCurrency.rate;

    // Create an exchange transaction
    const transaction = await Transaction.create({
      type: 'exchange',
      amount,
      currencyId: fromCurrencyId,
      userId,
      status: 'pending',
    });

    res.status(201).json({
      message: 'Exchange transaction created',
      transaction,
      exchangedAmount,
      toCurrency: toCurrency.symbol,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error processing exchange', error });
  }
};

//listar vendedores
exports.listSellers = async (req, res) => {
  const { currencyCode } = req.query;

  try {
    const sellers = await Currency.findAll({
      where: { code: currencyCode },
      include: [
        { model: User, attributes: ['username', 'rating'] }
      ]
    });

    res.status(200).json(sellers);
  } catch (error) {
    res.status(500).json({ message: 'Error listing sellers', error });
  }
};

//iniciar transação
exports.initiateTransaction = async (req, res) => {
  const { sellerId, currencyId, amount } = req.body;
  const buyerId = req.user.userId;

  try {
    const seller = await Currency.findOne({ where: { id: currencyId, userId: sellerId } });
    if (!seller || amount > seller.maxAmount) {
      return res.status(400).json({ message: 'Invalid transaction or amount exceeds seller limit' });
    }

    const transaction = await Transaction.create({
      type: 'buy',
      amount,
      currencyId,
      userId: buyerId,
      status: 'pending',
    });

    res.status(201).json({ message: 'Transaction initiated', transaction });
  } catch (error) {
    res.status(500).json({ message: 'Error initiating transaction', error });
  }
};

//aprovar transação e passar ao pagamento
exports.approveTransaction = async (req, res) => {
  const { transactionId } = req.params;

  try {
    const transaction = await Transaction.findByPk(transactionId);
    if (!transaction || transaction.status !== 'pending') {
      return res.status(404).json({ message: 'Transaction not found or already approved' });
    }

    // Mark as approved and set the appropriate amounts with fees included
    transaction.status = 'approved';
    await transaction.save();

    res.status(200).json({ message: 'Transaction approved', transaction });
  } catch (error) {
    res.status(500).json({ message: 'Error approving transaction', error });
  }
};

// controllers/TransactionController.js
const { Transaction, Currency, User } = require('../models');
const { Op } = require('sequelize'); // Sequelize operators for complex queries

// Utility to calculate platform fee, actually 1%
const calculateFee = (amount, feePercentage = 1) => {
  return (amount * feePercentage) / 100;
};
/**
 * Processes an exchange between two currencies.
 */
const exchangeCurrency = async (req, res) => {
  const { fromCurrencyId, toCurrencyId, amount } = req.body;
  const userId = req.user.userId;

  try {
    const fromCurrency = await Currency.findByPk(fromCurrencyId);
    const toCurrency = await Currency.findByPk(toCurrencyId);

    if (!fromCurrency || !toCurrency) {
      return res.status(404).json({ message: 'One or both currencies not found' });
    }

    const exchangedAmount = (amount / fromCurrency.rate) * toCurrency.rate;

    const transaction = await Transaction.create({
      type: 'exchange',
      amount,
      currencyId: fromCurrencyId,
      userId,
      status: 'pending',
    });

    res.status(201).json({
      message: 'Exchange transaction created successfully',
      transaction,
      exchangedAmount,
      toCurrency: toCurrency.symbol,
    });
  } catch (error) {
    console.error('Error processing exchange:', error);
    res.status(500).json({ message: 'Error processing exchange', error });
  }
};

/**
 * Initiates a transaction between a buyer and seller.
 */
const initiateTransaction = async (req, res) => {
  const { buyerId, sellerId, currencyId, amount } = req.body;

  try {
    const sellerCurrency = await Currency.findOne({
      where: { id: currencyId, userId: sellerId },
    });

    if (!sellerCurrency || sellerCurrency.availableAmount < amount) {
      return res.status(400).json({ message: 'Seller has insufficient funds or invalid currency' });
    }

    const platformFee = calculateFee(amount);

    const transaction = await Transaction.create({
      type: 'buy',
      amount,
      currencyId,
      buyerId,
      sellerId,
      status: 'pending',
      platformFee,
    });

    res.status(201).json({
      message: 'Transaction initiated successfully',
      transaction,
    });
  } catch (error) {
    console.error('Error initiating transaction:', error);
    res.status(500).json({ message: 'Error initiating transaction', error });
  }
};

/**
 * Approves a transaction by either buyer or seller.
 */
const approveTransaction = async (req, res) => {
  const { transactionId, role } = req.body; // role = 'buyer' or 'seller'
  const userId = req.user.userId;

  try {
    const transaction = await Transaction.findByPk(transactionId);
    if (!transaction || transaction.status !== 'pending') {
      return res.status(404).json({ message: 'Transaction not found or not eligible for approval' });
    }

    if (role === 'buyer' && transaction.buyerId === userId) {
      transaction.buyerConfirmed = true;
    } else if (role === 'seller' && transaction.sellerId === userId) {
      transaction.sellerConfirmed = true;
    } else {
      return res.status(403).json({ message: 'Unauthorized action' });
    }

    await transaction.save();

    if (transaction.buyerConfirmed && transaction.sellerConfirmed) {
      return finalizeTransaction(transaction, res);
    }

    res.status(200).json({
      message: `${role} confirmation received`,
      transaction,
    });
  } catch (error) {
    console.error('Error approving transaction:', error);
    res.status(500).json({ message: 'Error approving transaction', error });
  }
};

/**
 * Finalizes the transaction by transferring funds between buyer and seller.
 */
const finalizeTransaction = async (transaction, res) => {
  try {
    const sellerCurrency = await Currency.findByPk(transaction.currencyId);
    sellerCurrency.availableAmount -= transaction.amount;
    await sellerCurrency.save();

    const platformFee = calculateFee(transaction.amount);
    const sellerReceives = transaction.amount - platformFee;

    transaction.status = 'completed';
    transaction.completedAt = new Date();
    transaction.platformFee = platformFee;
    await transaction.save();

    res.status(200).json({
      message: 'Transaction completed successfully',
      transaction,
      sellerReceives,
    });
  } catch (error) {
    console.error('Error finalizing transaction:', error);
    res.status(500).json({ message: 'Error finalizing transaction', error });
  }
};

/**
 * Cancels a transaction and refunds the amounts, if applicable.
 */
const cancelTransaction = async (req, res) => {
  const { transactionId } = req.body;

  try {
    const transaction = await Transaction.findByPk(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    transaction.status = 'cancelled';
    transaction.cancelledAt = new Date();
    await transaction.save();

    res.status(200).json({
      message: 'Transaction cancelled successfully',
      transaction,
    });
  } catch (error) {
    console.error('Error cancelling transaction:', error);
    res.status(500).json({ message: 'Error cancelling transaction', error });
  }
};

/**
 * Lists sellers and their available currencies.
 */
const listSellers = async (req, res) => {
  const { currencyCode } = req.query;

  try {
    const sellers = await Currency.findAll({
      where: { code: currencyCode },
      include: [
        {
          model: User,
          attributes: ['username', 'rating'],
        },
      ],
    });

    res.status(200).json({ sellers });
  } catch (error) {
    console.error('Error listing sellers:', error);
    res.status(500).json({ message: 'Error listing sellers', error });
  }
};

/**
 * Fetches transaction history for a user.
 */
const getTransactionHistory = async (req, res) => {
  const userId = req.user.userId;

  try {
    const transactions = await Transaction.findAll({
      where: {
        [Op.or]: [{ buyerId: userId }, { sellerId: userId }],
      },
      include: [
        { model: Currency },
        { model: User, as: 'Buyer', attributes: ['username'] },
        { model: User, as: 'Seller', attributes: ['username'] },
      ],
    });

    res.status(200).json({ transactions });
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    res.status(500).json({ message: 'Error fetching transaction history.', error });
  }
};

module.exports = {
  initiateTransaction,
  approveTransaction,
  cancelTransaction,
  listSellers,
  exchangeCurrency,
  getTransactionHistory,
};

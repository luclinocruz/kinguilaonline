// models/Transaction.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Currency = require('./Currency');

//definição de tipos de transaçãokkko
const Transaction = sequelize.define('Transaction', {
  type: {
    type: DataTypes.ENUM('buy', 'sell', 'exchange'),
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  currencyId: {
    type: DataTypes.INTEGER,
    references: {
      model: Currency,
      key: 'id',
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'failed'),
    defaultValue: 'pending',
  },
});

User.hasMany(Transaction);
Transaction.belongsTo(User);
Currency.hasMany(Transaction);
Transaction.belongsTo(Currency);

module.exports = Transaction;

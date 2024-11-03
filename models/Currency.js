// models/Currency.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Currency = sequelize.define('Currency', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  
  rate: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 1.0,
    comment: 'Exchange rate defined by the seller'
  },
  maxAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
    comment: 'Maximum amount the seller has available'
  },
  symbol: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

User.hasMany(Currency, { foreignKey: 'userId' });
Currency.belongsTo(User, { foreignKey: 'userId' });
module.exports = Currency;

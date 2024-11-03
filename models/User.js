// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  balance: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
  },
  refundAccount: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Account for refund transactions'
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 5.0,
    comment: 'User rating for transaction reliability'
  },
});

module.exports = User;

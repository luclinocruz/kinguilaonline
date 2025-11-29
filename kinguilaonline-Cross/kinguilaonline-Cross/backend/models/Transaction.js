// models/Transaction.js
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    'Transaction',
    {
      type: {
        type: DataTypes.ENUM('buy', 'sell', 'exchange'),
        allowNull: false,
        validate: {
          isIn: [['buy', 'sell', 'exchange']],
        },
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0.01,
        },
      },
      status: {
        type: DataTypes.ENUM('pending', 'completed', 'cancelled', 'failed'),
        defaultValue: 'pending',
      },
      initiatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      completedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      cancelledAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.User, { as: 'Buyer', foreignKey: 'buyerId' });
    Transaction.belongsTo(models.User, { as: 'Seller', foreignKey: 'sellerId' });
    Transaction.belongsTo(models.Currency, { foreignKey: 'currencyId' });
  };

  return Transaction;
};

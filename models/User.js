// models/User.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
        comment: 'Account for refund transactions',
      },
      rating: {
        type: DataTypes.FLOAT,
        defaultValue: 5.0,
        comment: 'User rating for transaction reliability',
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Transaction, { as: 'BuyerTransactions', foreignKey: 'buyerId' });
    User.hasMany(models.Transaction, { as: 'SellerTransactions', foreignKey: 'sellerId' });
    User.hasMany(models.Currency, { foreignKey: 'userId' });
  };

  return User;
};

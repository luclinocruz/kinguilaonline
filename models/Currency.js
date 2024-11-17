// models/Currency.js
module.exports = (sequelize, DataTypes) => {
  const Currency = sequelize.define(
    'Currency',
    {
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
        validate: {
          min: 0.01, // Prevent zero or negative rates
        },
        comment: 'Exchange rate defined by the seller',
      },
      maxAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0, // No negative amounts
        },
        comment: 'Maximum amount the seller has available',
      },
      availableAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0, // Prevent negative availability
        },
        comment: 'Amount available for transactions',
      },
      symbol: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      paranoid: true, // Enables soft deletes
    }
  );

  Currency.associate = (models) => {
    Currency.hasMany(models.Transaction, { foreignKey: 'currencyId' });
    Currency.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Currency;
};

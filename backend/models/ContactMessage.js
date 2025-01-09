module.exports = (sequelize, DataTypes) => {
  const ContactMessage = sequelize.define('ContactMessage', {
      name: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      email: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      message: {
          type: DataTypes.TEXT,
          allowNull: false,
      },
  }, {
      timestamps: true,
  });

  return ContactMessage;
};

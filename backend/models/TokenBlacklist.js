const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

//models/TokenBlacklist.js
module.exports = (sequelize,dataTypes) => {
    const TokenBlacklist = sequelize.define(
        'TokenBlacklist',
        {
            token: {
                type: DataTypes.TEXT,
                allowNull: false,
                unique: true,
                comment: 'JWT refresh or access token to blacklist',
            },
        },
        {
            timestamps:true,
            paranoid: true,
        }
    );
    return TokenBlacklist;
};
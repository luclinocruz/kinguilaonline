// config/config.js
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'kinguila',
    password: process.env.DB_PASSWORD || 'online',
    database: process.env.DB_NAME || 'kinguila_db',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USER || 'kinguila',
    password: process.env.DB_PASSWORD || 'online',
    database: process.env.DB_NAME || 'kinguila_db',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
  }
};

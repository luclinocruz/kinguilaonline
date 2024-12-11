// controllers/AuthController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');

/**
 * Logout user by invalidating the refresh token.
 */
exports.logoutUser = async (req, res) => {
    try {
      const { refreshToken } = req.body;
  
      if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
      }
  
      // Add the token to the blacklist
      await TokenBlacklist.create({ token: refreshToken });
  
      res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
      console.error('Error logging out user:', error);
      res.status(500).json({ message: 'Error logging out user', error });
    }
  };
  
  /**
   * Middleware to validate and revoke token.
   */
  exports.validateAndRevokeToken = async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
  
      if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
      }
  
      const token = authHeader.split(' ')[1];
  
      // Check if the token is in the blacklist
      const isBlacklisted = await TokenBlacklist.findOne({ where: { token } });
  
      if (isBlacklisted) {
        return res.status(401).json({ message: 'Token has been revoked' });
      }
  
      // Verify token
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Invalid or expired token' });
        }
  
        req.user = decoded;
        next();
      });
    } catch (error) {
      console.error('Error validating token:', error);
      res.status(500).json({ message: 'Error validating token', error });
    }
  };

// Gerar novo access token
const generateAccessToken = (user) => {
  return jwt.sign(
    { userId: user.id, username: user.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' } // Expira em 15 minutos
  );
};

// Gerar refresh token
const generateRefreshToken = (user) => {
  return jwt.sign(
    { userId: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' } // Expira em 7 dias
  );
};

/**
 * Rota para refresh de token.
 */
exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token is required' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findByPk(decoded.userId);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    // Gerar novo access token
    const accessToken = generateAccessToken(user);

    res.status(200).json({ accessToken });
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(403).json({ message: 'Invalid or expired refresh token' });
  }
};

/**
 * Rota para logout.
 */
exports.logout = async (req, res) => {
  const { userId } = req.user;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Invalidar o refresh token
    user.refreshToken = null;
    await user.save();

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ message: 'Error logging out', error });
  }
};

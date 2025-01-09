const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, TokenBlacklist } = require('../models');

// Helper function to generate a token
const generateToken = (user, secret, expiresIn) => {
    return jwt.sign({ userId: user.id, email: user.email }, secret, { expiresIn });
};

/**
 * Register a new user
 */
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists with this email.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully.', data: { id: newUser.id, email: newUser.email } });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user', error });
    }
};

/**
 * User login
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const accessToken = generateToken(user, process.env.JWT_SECRET, '15m');
        const refreshToken = generateToken(user, process.env.JWT_REFRESH_SECRET, '7d');

        res.status(200).json({ message: 'Login successful.', tokens: { accessToken, refreshToken } });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Error logging in user', error });
    }
};

/**
 * Refresh access token
 */
const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({ message: 'Refresh token is required.' });
        }

        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid or expired refresh token.' });
            }

            const accessToken = generateToken({ id: decoded.userId, email: decoded.email }, process.env.JWT_SECRET, '15m');
            res.status(200).json({ message: 'Token refreshed successfully.', accessToken });
        });
    } catch (error) {
        console.error('Error refreshing token:', error);
        res.status(500).json({ message: 'Error refreshing token', error });
    }
};

/**
 * Logout user
 */
const logout = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ message: 'Token is required to logout.' });
        }

        await TokenBlacklist.create({ token });
        res.status(200).json({ message: 'Logout successful.' });
    } catch (error) {
        console.error('Error logging out user:', error);
        res.status(500).json({ message: 'Error logging out user', error });
    }
};

/**
 * Validate and revoke token
 */
const validateAndRevokeToken = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ message: 'Token is required.' });
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid or expired token.' });
            }

            await TokenBlacklist.create({ token });
            res.status(200).json({ message: 'Token revoked successfully.' });
        });
    } catch (error) {
        console.error('Error revoking token:', error);
        res.status(500).json({ message: 'Error revoking token', error });
    }
};

// Export individually
module.exports = {
    register,
    login,
    refreshToken,
    logout,
    validateAndRevokeToken,
};

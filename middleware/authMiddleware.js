const jwt = require('jsonwebtoken');
const { verifyToken } = require('../config/jwt');

const authMiddleware = (req, res, next) => {
  if (req.url.includes('signin') || req.url.includes('register')) {
    return next();
  }

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization required' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;

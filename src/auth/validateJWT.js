// src/auth/validateJWT.js
const jwt = require('jsonwebtoken');

require('dotenv/config');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

module.exports = async (req, res, next) => {
   const token = req.headers.authorization;
   if (!token) return res.status(401).json({ message: 'Token not found' });

   try {
    const user = jwt.verify(token, secret);

    req.user = user;
    next();
   } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
   }
};
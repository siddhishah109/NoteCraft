// authenticateUser.js
const jwt = require('jsonwebtoken');
const db = require('../../db.config.js');
const User = db.user;
const colors = require('colors');

exports.authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({ where: { id: decodedToken.id } });

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        req.user = user; 
        next();
    } catch (error) {
        console.error(error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Unauthorized: Token expired' });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};

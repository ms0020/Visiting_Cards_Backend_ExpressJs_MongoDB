const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, mobile: user.mobile },
        process.env.JWT_SECRET,
        { expiresIn: '10h' }
    );
};

exports.verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new Error('Token has expired');
        } else if (error.name === 'JsonWebTokenError') {
            throw new Error('Invalid token');
        } else {
            throw new Error('Token verification failed');
        }
    }
};
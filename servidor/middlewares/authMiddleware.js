const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Bearer token
        const decoded = jwt.verify(token, 'your_secret_key');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }
};

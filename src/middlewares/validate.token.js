const { validateToken } = require('../services/jwt');
const userServices = require('../services/user.service');

const testToken = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }

    const userId = validateToken(token) || -1;
    const { statusCode, message } = await userServices.getById(userId);

    if (statusCode === 404) {
        return res.status(401).json({ message: 'Expired or invalid token' });
    }

    req.user = message;
    
    next();
};

module.exports = testToken;
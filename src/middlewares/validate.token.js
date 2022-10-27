const { validateToken } = require('../services/jwt');
const userServices = require('../services/user.service');

const testToken = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }

    const userId = await validateToken(token);
    const { statusCode, message } = await userServices.getById(userId);

    if (statusCode !== 200) {
        return res.status(statusCode).json(message);
    }

    next();
};

module.exports = testToken;
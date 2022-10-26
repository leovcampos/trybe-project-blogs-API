const logService = require('../services/login.service');

const login = async (req, res) => {
    const { email, password } = req.body;
    const { statusCode, message } = await logService.loginUser(email, password);

    return res.status(statusCode).json(message);
};

module.exports = {
    login,
};

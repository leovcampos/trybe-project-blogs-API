const userServices = require('../services/user.service');

const newUser = async (req, res) => {
    const { statusCode, message } = await userServices.newUser(req.body);

    res.status(statusCode).json(message);
};

module.exports = {
    newUser,
};

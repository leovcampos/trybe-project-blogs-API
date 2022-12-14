const userServices = require('../services/user.service');

const newUser = async (req, res) => {
    const { statusCode, message } = await userServices.newUser(req.body);

    res.status(statusCode).json(message);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const { statusCode, message } = await userServices.getById(Number(id));

    res.status(statusCode).json(message);
};

const getAll = async (req, res) => {
    const { statusCode, message } = await userServices.getAll();

    res.status(statusCode).json(message);
};

const deleteUser = async (req, res) => {
    const { id } = req.user;
    const { statusCode, message } = await userServices.deleteUser(id);

    res.status(statusCode).json(message);
};

module.exports = {
    newUser,
    getById,
    getAll,
    deleteUser,
};

const categoryServices = require('../services/category.service');

const newCategory = async (req, res) => {
    const { name } = req.body;
    const { statusCode, message } = await categoryServices.newCategory(name);

    res.status(statusCode).json(message);
};

module.exports = {
    newCategory,
};
